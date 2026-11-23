import { doisDigitos } from './calendar';

const MESES_CURTOS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const LIMITE_TITULO = 48;

function partesDaData(iso) {
  const [ano, mes, dia] = String(iso).split('-').map(Number);
  return { ano, mes, dia };
}

export function hojeIso(data = new Date()) {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;
}

export function sessaoDeAgendamento(agendamento, duracao = 'a combinar') {
  const { mes, dia } = partesDaData(agendamento.data);
  return {
    id: String(agendamento.id ?? agendamento.codigo),
    codigo: agendamento.codigo,
    dia: doisDigitos(dia),
    mes: MESES_CURTOS[mes - 1] ?? '',
    tipo: agendamento.servicoTitulo || 'Atendimento',
    horario: agendamento.horario,
    duracao,
    status: 'Aguardando',
    pagamentoRotulo: 'Sinal',
    pagamento: 'A combinar na confirmação',
  };
}

export function itemDeHistorico(agendamento) {
  const { ano, mes, dia } = partesDaData(agendamento.data);
  const mesCurto = (MESES_CURTOS[mes - 1] ?? '').toLowerCase();
  return {
    id: String(agendamento.id ?? agendamento.codigo),
    data: `${doisDigitos(dia)} ${mesCurto} ${ano}`,
    titulo: agendamento.servicoTitulo || 'Atendimento',
    detalhe: `${agendamento.horario} · ${agendamento.codigo}`,
    valor: '—',
    status: 'Realizado',
  };
}

export function separarAgendamentos(agendamentos, hoje, duracaoDe = () => 'a combinar') {
  const ordenados = [...agendamentos].sort((a, b) =>
    `${a.data} ${a.horario}`.localeCompare(`${b.data} ${b.horario}`)
  );
  const futuros = ordenados.filter((item) => item.data >= hoje);
  const passados = ordenados.filter((item) => item.data < hoje).reverse();
  return {
    sessoes: futuros.map((item) => sessaoDeAgendamento(item, duracaoDe(item.servicoId))),
    historico: passados.map(itemDeHistorico),
  };
}

function resumirIdeia(ideia) {
  const texto = ideia.trim();
  if (texto.length <= LIMITE_TITULO) return texto;
  return `${texto.slice(0, LIMITE_TITULO - 1).trim()}…`;
}

export function cardDeOrcamento(orcamento) {
  const resumo = [orcamento.estilo, orcamento.localCorpo, orcamento.tamanhoCm]
    .filter(Boolean)
    .join(' · ');
  return {
    codigo: orcamento.codigo,
    titulo: orcamento.ideia ? resumirIdeia(orcamento.ideia) : orcamento.estilo || 'Orçamento',
    resumo,
    status: 'Em análise',
    valor: 'A combinar',
    etapa: 1,
    podeReservar: false,
    nota: '',
  };
}
