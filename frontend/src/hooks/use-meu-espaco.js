import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { AGENDAR_MOCK } from '../data/agendar.mock';
import { MEU_ESPACO_MOCK } from '../data/meu-espaco.mock';
import { api } from '../services/api/client';
import { esquecerIdentidade, lerIdentidade, salvarIdentidade } from '../services/identidade';
import { somenteDigitos } from '../utils/format';
import { cardDeOrcamento, hojeIso, separarAgendamentos } from '../utils/meu-espaco';

const ABAS = [
  { id: 'sessoes', rotulo: 'Sessões' },
  { id: 'orcamentos', rotulo: 'Orçamentos' },
  { id: 'historico', rotulo: 'Histórico' },
];

function duracaoDoServico(servicoId) {
  const servico = AGENDAR_MOCK.servicos.find((item) => item.id === servicoId);
  return servico ? servico.duracao : 'a combinar';
}

function filtrarPorWhatsapp(lista, digitos) {
  if (!Array.isArray(lista)) return [];
  return lista.filter((item) => somenteDigitos(item.whatsapp ?? '') === digitos);
}

export function useMeuEspaco() {
  const [aba, setAba] = useState(ABAS[0].id);
  const [mensagem, setMensagem] = useState('');
  const [identidade, setIdentidade] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    const atual = await lerIdentidade();
    setIdentidade(atual);
    if (!atual) {
      setAgendamentos([]);
      setOrcamentos([]);
      setCarregando(false);
      return;
    }

    const digitos = somenteDigitos(atual.whatsapp);
    setCarregando(true);
    try {
      const [listaAgendamentos, listaOrcamentos] = await Promise.all([
        api.get(`/agendamentos?whatsapp=${digitos}`),
        api.get(`/orcamentos?whatsapp=${digitos}`),
      ]);
      setAgendamentos(filtrarPorWhatsapp(listaAgendamentos, digitos));
      setOrcamentos(filtrarPorWhatsapp(listaOrcamentos, digitos));
      setErro('');
    } catch (err) {
      console.log('Aviso: não foi possível carregar o Meu Espaço:', err.message);
      setErro('Não foi possível carregar seus dados. Confira se o servidor está no ar.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  function trocarAba(id) {
    setAba(id);
    setMensagem('');
  }

  async function identificar(whatsapp) {
    await salvarIdentidade({ whatsapp: whatsapp.trim() });
    await carregar();
  }

  async function sair() {
    await esquecerIdentidade();
    await carregar();
  }

  function reagendar(sessao) {
    setMensagem(
      `Pedido de reagendamento enviado para a sessão de ${sessao.dia}/${sessao.mes}. O Victor propõe uma nova data pelo WhatsApp.`
    );
  }

  function cancelar() {
    setMensagem(
      'Cancelamento solicitado. Como faltam mais de 48h, o sinal fica como crédito para uma nova data.'
    );
  }

  const { sessoes, historico } = separarAgendamentos(agendamentos, hojeIso(), duracaoDoServico);
  const nome =
    identidade?.nome || agendamentos[0]?.nome || orcamentos[0]?.nome || 'visitante';

  return {
    cliente: { nome },
    identificado: Boolean(identidade),
    identificar,
    sair,
    abas: ABAS,
    aba,
    trocarAba,
    sessoes,
    regras: MEU_ESPACO_MOCK.regras,
    mensagem,
    reagendar,
    cancelar,
    orcamentos: orcamentos.map(cardDeOrcamento),
    etapasOrcamento: MEU_ESPACO_MOCK.etapasOrcamento,
    historico,
    cuidados: MEU_ESPACO_MOCK.cuidados,
    carregando,
    erro,
  };
}
