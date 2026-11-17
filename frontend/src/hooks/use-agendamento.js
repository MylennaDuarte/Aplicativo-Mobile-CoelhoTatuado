import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { AGENDAR_MOCK } from '../data/agendar.mock';
import { api } from '../services/api/client';
import {
  chaveMes,
  doisDigitos,
  formatarDataCurta,
  mesAnterior,
  primeiroDiaDaSemana,
  proximoMes,
  totalDiasDoMes,
} from '../utils/calendar';

const TOTAL_PASSOS = 4;
const TITULOS_PASSOS = ['Tipo de atendimento', 'Data e horário', 'Seus dados', 'Revisão'];
const DIAS_POR_SEMANA = 7;
const DADOS_INICIAIS = { nome: '', whatsapp: '', instagram: '', observacoes: '' };

function mesDe(data) {
  return { ano: data.getFullYear(), mes: data.getMonth() };
}

export function useAgendamento() {
  const [hoje] = useState(() => new Date());
  const [passo, setPasso] = useState(1);
  const [servicoId, setServicoId] = useState(null);
  const [mesVisivel, setMesVisivel] = useState(() => mesDe(hoje));
  const [dia, setDia] = useState(null);
  const [horario, setHorario] = useState(null);
  const [dados, setDados] = useState(DADOS_INICIAIS);

  const [carregando, setCarregando] = useState(false);
  const [codigoOficial, setCodigoOficial] = useState(null);
  const [agendamentosSalvos, setAgendamentosSalvos] = useState([]);

  const { servicos, horarios, diasFechados, diasIndisponiveis, horariosOcupados } = AGENDAR_MOCK;
  const servico = servicos.find((item) => item.id === servicoId) ?? null;

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const lista = await api.get('/agendamentos');
        setAgendamentosSalvos(lista);
      } catch (err) {
        console.log('Aviso: não foi possível buscar horários ocupados do servidor:', err.message);
      }
    }
    carregarAgendamentos();
  }, []);

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
      const reservado = reservados.includes(numero);
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
  }, [mesVisivel, dia, hoje, diasFechados, diasIndisponiveis]);

  const horariosDoDia = useMemo(() => {
    if (!dia) return [];

    const dataIsoSelecionada = `${mesVisivel.ano}-${doisDigitos(mesVisivel.mes + 1)}-${doisDigitos(dia)}`;
    const ocupadosMock = horariosOcupados[dia] ?? [];
    const ocupadosBanco = agendamentosSalvos
      .filter((item) => item.data === dataIsoSelecionada)
      .map((item) => item.horario);

    const todosOcupados = new Set([...ocupadosMock, ...ocupadosBanco]);

    return horarios.map((item) => ({
      horario: item,
      ocupado: todosOcupados.has(item),
      selecionado: item === horario,
    }));
  }, [dia, mesVisivel, horario, horarios, horariosOcupados, agendamentosSalvos]);

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

    const dataIso = `${mesVisivel.ano}-${doisDigitos(mesVisivel.mes + 1)}-${doisDigitos(dia)}`;

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

      setAgendamentosSalvos((prev) => [...prev, { ...payload, id: resposta?.id, codigo: resposta?.codigo }]);
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
    setDados(DADOS_INICIAIS);
    setCodigoOficial(null);
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
    carregando,
  };
}
