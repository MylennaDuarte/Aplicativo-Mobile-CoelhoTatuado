import { useState } from 'react';

import { MEU_ESPACO_MOCK } from '../data/meu-espaco.mock';

const ABAS = [
  { id: 'sessoes', rotulo: 'Sessões' },
  { id: 'orcamentos', rotulo: 'Orçamentos' },
  { id: 'historico', rotulo: 'Histórico' },
];

// Estado da tela Meu Espaço: aba ativa e retorno das ações sobre as sessões.
// Quando houver backend, troque o mock por api.get('/meu-espaco') e as ações por api.post.
export function useMeuEspaco() {
  const [aba, setAba] = useState(ABAS[0].id);
  const [mensagem, setMensagem] = useState('');

  function trocarAba(id) {
    setAba(id);
    setMensagem('');
  }

  // Respostas simuladas; o texto definitivo virá do backend.
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

  return {
    cliente: MEU_ESPACO_MOCK.cliente,
    abas: ABAS,
    aba,
    trocarAba,
    sessoes: MEU_ESPACO_MOCK.sessoes,
    regras: MEU_ESPACO_MOCK.regras,
    mensagem,
    reagendar,
    cancelar,
    orcamentos: MEU_ESPACO_MOCK.orcamentos,
    etapasOrcamento: MEU_ESPACO_MOCK.etapasOrcamento,
    historico: MEU_ESPACO_MOCK.historico,
    cuidados: MEU_ESPACO_MOCK.cuidados,
    carregando: false,
  };
}
