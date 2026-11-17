// Divide uma lista em grupos de `tamanho` itens (ex.: dias do mês em semanas de 7).
export function agrupar(lista, tamanho) {
  const grupos = [];
  for (let i = 0; i < lista.length; i += tamanho) grupos.push(lista.slice(i, i + tamanho));
  return grupos;
}
