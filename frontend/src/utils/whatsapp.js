export function linkWhatsApp(numero, mensagem = '') {
  const digitos = String(numero ?? '').replace(/\D/g, '');
  if (!digitos) return '';
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : '';
  return `https://wa.me/${digitos}${texto}`;
}

export function mensagemAgendamento({ codigo, servico, data, horario, nome, observacoes = '' }) {
  const linhas = [
    'Olá, Victor! Acabei de solicitar um horário pelo app Coelho Tatuado.',
    `Código: ${codigo}`,
    `Atendimento: ${servico}`,
    `Data: ${data} às ${horario}`,
    `Nome: ${nome}`,
  ];
  if (observacoes.trim()) linhas.push(`Observações: ${observacoes.trim()}`);
  return linhas.join('\n');
}
