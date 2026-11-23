import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Linking } from 'react-native';

import { AppConfig } from '../constants/config';
import { AGENDAR_MOCK } from '../data/agendar.mock';
import { api } from '../services/api/client';
import { lerIdentidade, salvarIdentidade } from '../services/identidade';
import {
  chaveMes,
  doisDigitos,
  formatarDataCurta,
  mesAnterior,
  primeiroDiaDaSemana,
  proximoMes,
  totalDiasDoMes,
} from '../utils/calendar';
import { linkWhatsApp, mensagemAgendamento } from '../utils/whatsapp';

const TOTAL_PASSOS = 4;
const TITULOS_PASSOS = ['Tipo de atendimento', 'Data e horário', 'Seus dados', 'Revisão'];
const DIAS_POR_SEMANA = 7;
const DADOS_INICIAIS = { nome: '', whatsapp: '', instagram: '', observacoes: '' };

function mesDe(data) {
  return { ano: data.getFullYear(), mes: data.getMonth() };
}

function dataIsoDe(ano, mes, dia) {
  return `${ano}-${doisDigitos(mes + 1)}-${doisDigitos(dia)}`;
}

function dadosComIdentidade(identidade) {
  if (!identidade) return DADOS_INICIAIS;
  return { ...DADOS_INICIAIS, nome: identidade.nome ?? '', whatsapp: identidade.whatsapp ?? '' };
}

export function useAgendamento() {
  const [hoje] = useState(() => new Date());
  const [passo, setPasso] = useState(1);
  const [servicoId, setServicoId] = useState(null);
  const [mesVisivel, setMesVisivel] = useState(() => mesDe(hoje));
  const [dia, setDia] = useState(null);
  const [horario, setHorario] = useState(null);
  const [dados, setDados] = useState(DADOS_INICIAIS);
  const [identidade, setIdentidade] = useState(null);

  const [carregando, setCarregando] = useState(false);
  const [codigoOficial, setCodigoOficial] = useState(null);
  const [ocupados, setOcupados] = useState([]);

  const { servicos, horarios, diasFechados, diasIndisponiveis, horariosOcupados } = AGENDAR_MOCK;
  const servico = servicos.find((item) => item.id === servicoId) ?? null;

  useEffect(() => {
    lerIdentidade().then((salva) => {
      if (!salva) return;
      setIdentidade(salva);
      setDados((atual) => (atual.nome || atual.whatsapp ? atual : dadosComIdentidade(salva)));
    });
  }, []);

  const carregarOcupados = useCallback(async () => {
    try {
      const lista = await api.get('/agendamentos');
      if (Array.isArray(lista)) {
        setOcupados(lista.map((item) => ({ data: item.data, horario: item.horario })));
      }
    } catch (err) {
      console.log('Aviso: não foi possível buscar horários ocupados do servidor:', err.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarOcupados();
    }, [carregarOcupados])
  );

  const ocupadosPorDia = useMemo(() => {
    const { ano, mes } = mesVisivel;
    const resultado = {};
    const adicionar = (numero, lista) => {
      resultado[numero] = new Set([...(resultado[numero] ?? []), ...lista]);
    };
    Object.entries(horariosOcupados).forEach(([numero, lista]) => adicionar(Number(numero), lista));
    ocupados.forEach((item) => {
      const [anoItem, mesItem, diaItem] = String(item.data).split('-').map(Number);
      if (anoItem === ano && mesItem === mes + 1) adicionar(diaItem, [item.horario]);
    });
    return resultado;
  }, [mesVisivel, ocupados, horariosOcupados]);

  const dias = useMemo(() => {
    const { ano, mes } = mesVisivel;
    const reservados = diasIndisponiveis[chaveMes(ano, mes)] ?? [];
    const grade = [];

    for (let i = 0; i < primeiroDiaDaSemana(ano, mes); i++) {
      grade.push({ chave: `inicio-${i}`, vazio: true });
    }
    for (let numero = 1; numero <= totalDiasDoMes(ano, mes); numero++) {
      const data = new Date(ano, mes, numero);
      const passado = data <= hoje;
      const fechado = diasFechados.includes(data.getDay());
      const lotado = (ocupadosPorDia[numero]?.size ?? 0) >= horarios.length;
      const reservado = reservados.includes(numero) || lotado;
      grade.push({
        chave: String(numero),
        numero,
        indisponivel: passado || fechado || reservado,
        reservado: reservado && !passado,
        selecionado: numero === dia,
      });
    }
    while (grade.length % DIAS_POR_SEMANA !== 0) {
      grade.push({ chave: `fim-${grade.length}`, vazio: true });
    }
    return grade;
  }, [mesVisivel, dia, hoje, diasFechados, diasIndisponiveis, ocupadosPorDia, horarios]);

  const horariosDoDia = useMemo(() => {
    if (!dia) return [];
    const ocupadosDoDia = ocupadosPorDia[dia] ?? new Set();

    return horarios.map((item) => ({
      horario: item,
      ocupado: ocupadosDoDia.has(item),
      selecionado: item === horario,
    }));
  }, [dia, horario, horarios, ocupadosPorDia]);

  const dataFormatada = dia ? formatarDataCurta(mesVisivel.ano, mesVisivel.mes, dia) : '';
  const dadosValidos = dados.nome.trim() !== '' && dados.whatsapp.trim() !== '';
  const podeAvancar = [Boolean(servico), Boolean(horario), dadosValidos, true][passo - 1] ?? false;

  const resumo = [
    { rotulo: 'Data', valor: dataFormatada || '—' },
    { rotulo: 'Horário', valor: horario ?? '—' },
    { rotulo: 'Duração estimada', valor: servico ? servico.duracao : '—' },
    { rotulo: 'Nome', valor: dados.nome || '—' },
    { rotulo: 'WhatsApp', valor: dados.whatsapp || '—' },
    ...(dados.observacoes ? [{ rotulo: 'Observações', valor: dados.observacoes }] : []),
  ];

  const codigo = codigoOficial ?? `CT-${doisDigitos(dia ?? 0)}${doisDigitos(mesVisivel.mes + 1)}`;

  function selecionarDia(numero) {
    setDia(numero);
    setHorario(null);
  }

  function mudarMes(novoMes) {
    setMesVisivel(novoMes);
    setDia(null);
    setHorario(null);
  }

  function atualizarDados(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  function avancar() {
    setPasso((atual) => Math.min(TOTAL_PASSOS, atual + 1));
  }

  function voltar() {
    setPasso((atual) => Math.max(1, atual - 1));
  }

  async function confirmar() {
    if (carregando) return;

    const dataIso = dataIsoDe(mesVisivel.ano, mesVisivel.mes, dia);
    const payload = {
      servicoId: servico?.id ?? '',
      servicoTitulo: servico?.titulo ?? servico?.nome ?? '',
      data: dataIso,
      horario,
      nome: dados.nome.trim(),
      whatsapp: dados.whatsapp.trim(),
      instagram: dados.instagram.trim(),
      observacoes: dados.observacoes.trim(),
    };

    try {
      setCarregando(true);
      const resposta = await api.post('/agendamentos', payload);

      if (resposta?.codigo) {
        setCodigoOficial(resposta.codigo);
      }

      setOcupados((prev) => [...prev, { data: dataIso, horario }]);
      const salva = { nome: payload.nome, whatsapp: payload.whatsapp };
      setIdentidade(salva);
      salvarIdentidade(salva);
      setPasso(TOTAL_PASSOS + 1);
    } catch (err) {
      Alert.alert(
        'Erro ao agendar',
        err.message || 'Não foi possível conectar com o servidor. Verifique se o back-end está rodando.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function reiniciar() {
    setPasso(1);
    setServicoId(null);
    setMesVisivel(mesDe(hoje));
    setDia(null);
    setHorario(null);
    setDados(dadosComIdentidade(identidade));
    setCodigoOficial(null);
  }

  async function enviarPorWhatsApp() {
    const mensagem = mensagemAgendamento({
      codigo,
      servico: servico?.nome ?? 'Atendimento',
      data: dataFormatada,
      horario,
      nome: dados.nome.trim(),
      observacoes: dados.observacoes,
    });
    const url = linkWhatsApp(AppConfig.whatsapp, mensagem);

    if (!url) {
      Alert.alert('WhatsApp não configurado', 'Preencha EXPO_PUBLIC_WHATSAPP no .env do front-end.');
      return;
    }
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Não foi possível abrir o WhatsApp', 'Confira se o aplicativo está instalado.');
    }
  }

  return {
    passo,
    totalPassos: TOTAL_PASSOS,
    tituloPasso: TITULOS_PASSOS[passo - 1] ?? '',
    concluido: passo > TOTAL_PASSOS,
    podeAvancar,
    avancar,
    voltar,
    confirmar,
    reiniciar,
    servicos,
    servicoId,
    servico,
    selecionarServico: setServicoId,
    ano: mesVisivel.ano,
    mes: mesVisivel.mes,
    dias,
    dia,
    selecionarDia,
    irMesAnterior: () => mudarMes(mesAnterior(mesVisivel)),
    irProximoMes: () => mudarMes(proximoMes(mesVisivel)),
    horarios: horariosDoDia,
    horario,
    selecionarHorario: setHorario,
    dataFormatada,
    dados,
    atualizarDados,
    resumo,
    codigo,
    avisoConfirmacao: AGENDAR_MOCK.avisoConfirmacao,
    enviado: AGENDAR_MOCK.enviado,
    enviarPorWhatsApp,
    carregando,
  };
}
