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

// Iniciais dos dias da semana, de domingo a sábado.
export const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Completa com zero à esquerda (7 → "07").
export function doisDigitos(numero) {
  return String(numero).padStart(2, '0');
}

// Chave "AAAA-MM" usada para indexar a disponibilidade por mês.
export function chaveMes(ano, mes) {
  return `${ano}-${doisDigitos(mes + 1)}`;
}

export function totalDiasDoMes(ano, mes) {
  return new Date(ano, mes + 1, 0).getDate();
}

// Dia da semana (0 = domingo) em que o mês começa.
export function primeiroDiaDaSemana(ano, mes) {
  return new Date(ano, mes, 1).getDay();
}

export function mesAnterior({ ano, mes }) {
  return mes === 0 ? { ano: ano - 1, mes: 11 } : { ano, mes: mes - 1 };
}

export function proximoMes({ ano, mes }) {
  return mes === 11 ? { ano: ano + 1, mes: 0 } : { ano, mes: mes + 1 };
}

// Ex.: formatarDataCurta(2026, 10, 14) → "14/11/2026"
export function formatarDataCurta(ano, mes, dia) {
  return `${doisDigitos(dia)}/${doisDigitos(mes + 1)}/${ano}`;
}
