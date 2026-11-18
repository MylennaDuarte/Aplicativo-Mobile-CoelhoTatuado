// Novidades do estúdio, copiadas do protótipo. Sem imagens: as fotos virão do backend.
// `acao.rota` é o nome da tela aberta pelo botão; ela só abre se já estiver registrada.
export const NOVIDADES_MOCK = {
  itens: [
    {
      id: 'n1',
      tag: 'Agenda',
      destaque: true,
      data: 'Hoje',
      titulo: 'Agenda de dezembro aberta',
      descricao: 'Últimos horários do ano. Sessões de sábado estão quase esgotadas.',
      alturaImagem: 150,
      acao: { rotulo: 'Reservar horário', rota: 'Agendar' },
    },
    {
      id: 'n2',
      tag: 'Novidade',
      destaque: false,
      data: '12 out',
      titulo: 'Kit pós-tattoo em toda sessão',
      descricao:
        '50g de creme, card com os cuidados, adesivos do Coelho e docinhos. Para a cicatrização e para a alegria.',
      alturaImagem: 190,
      acao: { rotulo: 'Ver cuidados', rota: 'Estudio' },
    },
    {
      id: 'n3',
      tag: 'Promoção',
      destaque: true,
      data: '28 nov',
      titulo: 'Flash day: Coelhos',
      descricao:
        'Dez desenhos autorais do mascote, tamanho até 8 cm, valor fechado. Um por pessoa, ordem de chegada.',
      alturaImagem: 150,
      acao: { rotulo: 'Quero um flash', rota: 'Orcamento' },
    },
    {
      id: 'n4',
      tag: 'Projeto',
      destaque: false,
      data: 'set',
      titulo: 'Série Santos & Caveiras',
      descricao:
        'Projeto autoral em andamento. Procuro quatro pessoas para peças grandes em costas e costela, com condições especiais.',
      alturaImagem: 150,
      acao: { rotulo: 'Participar', rota: 'Orcamento' },
    },
  ],
};
