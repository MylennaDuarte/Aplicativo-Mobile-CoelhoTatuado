// Textos da tela de início, copiados do protótipo. Sem imagens: fotos virão do backend.
// Campos imagemUrl/fotoUrl são opcionais; sem valor, a tela mostra um placeholder.
export const INICIO_MOCK = {
  hero: {
    eyebrow: 'Blackwork · Dark art',
    titulo: 'Tinta preta,\ntraço sem medo.',
    descricao:
      'Bem-vindo ao estúdio do Victor. Um espaço de atendimento individual, projetos autorais e cuidado em cada sessão.',
  },
  trabalhosRecentes: [
    { id: '1', titulo: 'Batman que Ri', estilo: 'Dark art' },
    { id: '2', titulo: 'Morte e a Donzela', estilo: 'Blackwork' },
    { id: '3', titulo: 'Rosto fragmentado', estilo: 'Retrato' },
  ],
  novidade: {
    tag: 'Novidade',
    titulo: 'Kit pós-tattoo em toda sessão',
    descricao:
      'Creme, card de cuidados, adesivos e docinhos. Sua tatuagem cicatriza bem e você sai com um mimo.',
  },
  diferenciais: [
    { numero: '01', titulo: 'Atendimento individual', descricao: 'Um cliente por vez, sem fila e sem pressa.' },
    { numero: '02', titulo: 'Projetos autorais', descricao: 'Desenho exclusivo, feito para o seu corpo.' },
    { numero: '03', titulo: 'Biossegurança', descricao: 'Material descartável e autoclave em todas as sessões.' },
    { numero: '04', titulo: 'Kit pós-tattoo', descricao: 'Creme, guia de cuidados e mimos a cada sessão.' },
  ],
  tatuador: {
    nome: 'Victor',
    papel: 'Tatuador & fundador',
  },
  rodape: 'Coelho Tatuado · desde 2019',
};
