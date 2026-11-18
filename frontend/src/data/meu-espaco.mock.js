// Dados da tela Meu Espaço, copiados do protótipo. Virão do backend.
// Sem login: o nome do cliente virá do agendamento ou do orçamento feito no app.
export const MEU_ESPACO_MOCK = {
  cliente: { nome: 'visitante' },
  sessoes: [
    {
      id: 's1',
      dia: '26',
      mes: 'Nov',
      tipo: 'Sessão de tatuagem',
      horario: '15:30',
      duracao: '4h',
      status: 'Confirmado',
      pagamentoRotulo: 'Sinal pago',
      pagamento: 'R$ 200 de R$ 850',
    },
  ],
  regras:
    'Reagendamento gratuito até 48h antes. Cancelamentos com menos de 48h perdem o sinal. Atrasos acima de 30 min podem reduzir a sessão.',
  // Fases de um orçamento; `etapa` em cada orçamento diz quantas já ocorreram.
  etapasOrcamento: ['Enviado', 'Respondido', 'Aprovado'],
  orcamentos: [
    {
      codigo: 'ORC-0231',
      titulo: 'Santa com caveira',
      resumo: 'Blackwork · Costela · 25×15 cm',
      status: 'Respondido',
      valor: 'R$ 1.800',
      etapa: 2,
      podeReservar: true,
      nota: 'Victor: "Sugiro duas sessões de 4h. O valor inclui o desenho autoral e o retoque."',
    },
    {
      codigo: 'ORC-0198',
      titulo: 'Retrato dark',
      resumo: 'Retrato · Antebraço · 12×9 cm',
      status: 'Aprovado',
      valor: 'R$ 850',
      etapa: 3,
      podeReservar: false,
      nota: '',
    },
  ],
  historico: [
    {
      id: 'h1',
      data: '14 ago 2026',
      titulo: 'Retrato dark',
      detalhe: 'Antebraço · 3h',
      valor: 'R$ 850',
      status: 'Concluído',
    },
    {
      id: 'h2',
      data: '02 set 2026',
      titulo: 'Retoque',
      detalhe: 'Antebraço · 40 min',
      valor: 'Cortesia',
      status: 'Concluído',
    },
    {
      id: 'h3',
      data: '21 mar 2025',
      titulo: 'Morte e a Donzela',
      detalhe: 'Panturrilha · 2 sessões',
      valor: 'R$ 1.600',
      status: 'Concluído',
    },
  ],
  cuidados: { rotulo: 'Cuidados pós-tattoo', titulo: 'Guia de cicatrização' },
};
