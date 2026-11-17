const FORMATO_DATA_PADRAO = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
};

// Formata uma data ISO (ex.: 2026-10-18) em pt-BR.
export function formatarData(iso, opcoes = FORMATO_DATA_PADRAO) {
  return new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(iso));
}

// Remove tudo que não é dígito (útil para telefones).
export function somenteDigitos(valor) {
  return valor.replace(/\D/g, '');
}
