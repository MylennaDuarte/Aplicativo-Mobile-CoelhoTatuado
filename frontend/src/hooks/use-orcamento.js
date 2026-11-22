import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { ORCAMENTO_MOCK } from '../data/orcamento.mock';
import { api } from '../services/api/client';
import { lerIdentidade, salvarIdentidade } from '../services/identidade';

const DADOS_INICIAIS = {
  estilo: null,
  regiao: null,
  largura: '',
  altura: '',
  ideia: '',
  preferenciaData: '',
  nome: '',
  whatsapp: '',
  observacoes: '',
};


function dadosIniciais(prefill) {
  const dados = { ...DADOS_INICIAIS };
  if (!prefill) return dados;

  const { estilos, regioes } = ORCAMENTO_MOCK;
  if (prefill.estilo) dados.estilo = estilos.includes(prefill.estilo) ? prefill.estilo : estilos[0];
  if (prefill.regiao && regioes.includes(prefill.regiao)) dados.regiao = prefill.regiao;
  if (prefill.ideia) dados.ideia = prefill.ideia;
  return dados;
}


function referenciasVazias() {
  return Array(ORCAMENTO_MOCK.totalReferencias).fill(null);
}

export function useOrcamento(prefill) {
  const [dados, setDados] = useState(() => dadosIniciais(prefill));
  const [referencias, setReferencias] = useState(referenciasVazias);
  const [enviando, setEnviando] = useState(false);

  const [enviado, setEnviado] = useState(null);

  // Nome e WhatsApp salvos no celular (último agendamento/orçamento) já vêm preenchidos.
  useEffect(() => {
    lerIdentidade().then((salva) => {
      if (!salva) return;
      setDados((atual) => ({
        ...atual,
        nome: atual.nome || salva.nome || '',
        whatsapp: atual.whatsapp || salva.whatsapp || '',
      }));
    });
  }, []);

  const valido = Boolean(
    dados.estilo && dados.regiao && dados.ideia.trim() && dados.nome.trim() && dados.whatsapp.trim()
  );
  const tamanho = dados.largura && dados.altura ? `${dados.largura}×${dados.altura} cm` : '';

  function atualizar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  
  async function escolherReferencia(indice) {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Sem acesso às fotos', 'Libere o acesso à galeria nas configurações.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (resultado.canceled) return;

    const { uri } = resultado.assets[0];
    setReferencias((atual) => atual.map((foto, i) => (i === indice ? { uri } : foto)));
  }

  function removerReferencia(indice) {
    setReferencias((atual) => atual.map((foto, i) => (i === indice ? null : foto)));
  }

  async function enviar() {
    if (!valido || enviando) return;

    const payload = {
      estilo: dados.estilo,
      localCorpo: dados.regiao,
      tamanhoCm: tamanho,
      ideia: dados.ideia.trim(),
      nome: dados.nome.trim(),
      whatsapp: dados.whatsapp.trim(),
      preferenciaData: dados.preferenciaData.trim(),
      observacoes: dados.observacoes.trim(),
    };

    try {
      setEnviando(true);
      const resposta = await api.post('/orcamentos', payload);
      salvarIdentidade({ nome: payload.nome, whatsapp: payload.whatsapp });
      setEnviado({ codigo: resposta?.codigo ?? '' });
    } catch (err) {
      Alert.alert(
        'Erro ao enviar',
        err.message || 'Não foi possível conectar com o servidor. Verifique se o back-end está rodando.'
      );
    } finally {
      setEnviando(false);
    }
  }

  function reiniciar() {
    setDados({ ...DADOS_INICIAIS, nome: dados.nome, whatsapp: dados.whatsapp });
    setReferencias(referenciasVazias());
    setEnviado(null);
  }

  return {
    textos: ORCAMENTO_MOCK,
    estilos: ORCAMENTO_MOCK.estilos,
    regioes: ORCAMENTO_MOCK.regioes,
    prazo: ORCAMENTO_MOCK.prazo,
    dados,
    atualizar,
    referencias,
    escolherReferencia,
    removerReferencia,
    valido,
    enviando,
    enviado,
    enviar,
    reiniciar,
    resumo: {
      titulo: `${dados.estilo ?? ''} · ${dados.regiao ?? ''}`,
      detalhe: `${dados.largura || '?'}×${dados.altura || '?'} cm · ${dados.preferenciaData || 'data flexível'}`,
    },
  };
}
