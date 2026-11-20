import { useState } from 'react';
import { Alert } from 'react-native';

import { ORCAMENTO_MOCK } from '../data/orcamento.mock';
import { api } from '../services/api/client';

const DADOS_INICIAIS = {
  estilo: null,
  regiao: null,
  largura: '',
  altura: '',
  ideia: '',
  preferenciaData: '',
  whatsapp: '',
  observacoes: '',
};

// Preenche o formulário com o que veio por parâmetro de rota
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
  return Array(ORCAMENTO_MOCK.totalReferencias).fill(false);
}

export function useOrcamento(prefill) {
  const [dados, setDados] = useState(() => dadosIniciais(prefill));
  const [referencias, setReferencias] = useState(referenciasVazias);
  const [enviando, setEnviando] = useState(false);
  // Depois do envio: { codigo } devolvido pelo servidor.
  const [enviado, setEnviado] = useState(null);

  const valido = Boolean(
    dados.estilo && dados.regiao && dados.ideia.trim() && dados.whatsapp.trim()
  );
  const tamanho = dados.largura && dados.altura ? `${dados.largura}×${dados.altura} cm` : '';

  function atualizar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  // Marca/desmarca um espaço de referência. O envio das fotos virá com o backend de uploads.
  function alternarReferencia(indice) {
    setReferencias((atual) => atual.map((marcada, i) => (i === indice ? !marcada : marcada)));
  }

  async function enviar() {
    if (!valido || enviando) return;

    // Campos com os nomes das colunas do backend.
    const payload = {
      estilo: dados.estilo,
      localCorpo: dados.regiao,
      tamanhoCm: tamanho,
      ideia: dados.ideia.trim(),
      whatsapp: dados.whatsapp.trim(),
      preferenciaData: dados.preferenciaData.trim(),
      observacoes: dados.observacoes.trim(),
    };

    try {
      setEnviando(true);
      const resposta = await api.post('/orcamentos', payload);
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
    setDados(DADOS_INICIAIS);
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
    alternarReferencia,
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
