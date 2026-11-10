// Dados do agendamento, copiados do protótipo. Serviços e disponibilidade virão do backend.
export const AGENDAR_MOCK = {
  servicos: [
    {
      id: 'sessao',
      nome: 'Sessão de tatuagem',
      descricao: 'Projeto já orçado e aprovado. Duração conforme o tamanho da peça.',
      duracao: '3h – 8h',
    },
    {
      id: 'retoque',
      nome: 'Retoque',
      descricao: 'Gratuito em até 60 dias após a sessão, para trabalhos feitos no estúdio.',
      duracao: 'até 1h',
    },
    {
      id: 'cover',
      nome: 'Cover-up',
      descricao: 'Avaliação presencial da tatuagem antiga + proposta de cobertura em blackwork.',
      duracao: '45 min',
    },
  ],
  // Horários oferecidos em cada dia de atendimento.
  horarios: ['10:00', '13:00', '15:30', '18:00'],
  // Dias da semana sem atendimento (0 = domingo, 1 = segunda).
  diasFechados: [0, 1],
  // Dias já reservados, agrupados por mês ("AAAA-MM").
  diasIndisponiveis: {
    '2026-11': [5, 6, 12, 19, 20, 26],
    '2026-12': [3, 4, 10, 17, 18, 24, 25, 31],
  },
  // Horários já ocupados em dias ainda disponíveis (chave = dia do mês).
  horariosOcupados: {
    7: ['10:00'],
    11: ['13:00', '15:30'],
    14: ['18:00'],
    21: ['10:00', '13:00'],
    28: ['15:30'],
  },
  avisoConfirmacao:
    'O Victor confirma a reserva pelo WhatsApp em até 24h. Sinal de reserva combinado na confirmação. Reagendamentos com 48h de antecedência.',
  enviado: {
    titulo: 'Solicitação enviada',
    descricao: 'Reservamos seu horário. Você recebe a confirmação do Victor no WhatsApp.',
    status: 'Aguardando',
  },
};
