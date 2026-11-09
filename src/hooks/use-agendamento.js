import { useMemo, useState } from 'react';

import { AGENDAR_MOCK } from '../data/agendar.mock';
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

// Estado e regras do fluxo de agendamento: etapas, calendário, horários e dados do cliente.
// Serviços e disponibilidade vêm do mock; quando houver backend, troque por api.get/api.post aqui.
export function useAgendamento() {
  const [hoje] = useState(() => new Date());
  const [passo, setPasso] = useState(1);
  const [servicoId, setServicoId] = useState(null);
  const [mesVisivel, setMesVisivel] = useState(() => mesDe(hoje));
  const [dia, setDia] = useState(null);
  const [horario, setHorario] = useState(null);
  const [dados, setDados] = useState(DADOS_INICIAIS);

  const { servicos, horarios, diasFechados, diasIndisponiveis, horariosOcupados } = AGENDAR_MOCK;
  const servico = servicos.find((item) => item.id === servicoId) ?? null;

  // Grade do mês visível em semanas completas: células vazias antes do dia 1 e depois do último.
  // Dias passados, dias fechados e dias já reservados ficam indisponíveis.
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
    const ocupados = dia ? (horariosOcupados[dia] ?? []) : [];
    return horarios.map((item) => ({
      horario: item,
      ocupado: ocupados.includes(item),
      selecionado: item === horario,
    }));
  }, [dia, horario, horarios, horariosOcupados]);

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

  // Código provisório da solicitação (dia + mês); o definitivo virá do backend.
  const codigo = `CT-${doisDigitos(dia ?? 0)}${doisDigitos(mesVisivel.mes + 1)}`;

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

  function confirmar() {
    // Quando houver backend: api.post('/agendamentos', { servicoId, data, horario, ...dados }).
    setPasso(TOTAL_PASSOS + 1);
  }

  function reiniciar() {
    setPasso(1);
    setServicoId(null);
    setMesVisivel(mesDe(hoje));
    setDia(null);
    setHorario(null);
    setDados(DADOS_INICIAIS);
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
    // etapa 1
    servicos,
    servicoId,
    servico,
    selecionarServico: setServicoId,
    // etapa 2
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
    // etapa 3
    dados,
    atualizarDados,
    // revisão e confirmação
    resumo,
    codigo,
    avisoConfirmacao: AGENDAR_MOCK.avisoConfirmacao,
    enviado: AGENDAR_MOCK.enviado,
    carregando: false,
  };
}
