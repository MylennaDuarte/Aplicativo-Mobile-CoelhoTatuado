// Funções puras de calendário usadas no agendamento. Meses começam em 0, como em Date.

export const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];


export const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function doisDigitos(numero) {
  return String(numero).padStart(2, '0');
}

export function chaveMes(ano, mes) {
  return `${ano}-${doisDigitos(mes + 1)}`;
}

export function totalDiasDoMes(ano, mes) {
  return new Date(ano, mes + 1, 0).getDate();
}

export function primeiroDiaDaSemana(ano, mes) {
  return new Date(ano, mes, 1).getDay();
}

export function mesAnterior({ ano, mes }) {
  return mes === 0 ? { ano: ano - 1, mes: 11 } : { ano, mes: mes - 1 };
}

export function proximoMes({ ano, mes }) {
  return mes === 11 ? { ano: ano + 1, mes: 0 } : { ano, mes: mes + 1 };
}

export function formatarDataCurta(ano, mes, dia) {
  return `${doisDigitos(dia)}/${doisDigitos(mes + 1)}/${ano}`;
}

export function formatarDataRelativa(iso, hoje = new Date()) {
  if (!iso) return '';
  const [ano, mes, dia] = String(iso).split('-').map(Number);
  const mesmoDia =
    ano === hoje.getFullYear() && mes === hoje.getMonth() + 1 && dia === hoje.getDate();
  if (mesmoDia) return 'Hoje';
  return `${doisDigitos(dia)} ${MESES[mes - 1].slice(0, 3).toLowerCase()}`;
}
