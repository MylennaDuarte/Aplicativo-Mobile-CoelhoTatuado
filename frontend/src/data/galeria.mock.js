// Trabalhos da galeria, copiados do protótipo. Sem imagens: as fotos virão do backend.
// `altura` é a altura do card no mosaico (no protótipo segue a proporção da foto).
export const GALERIA_MOCK = {
  filtros: ['Todos', 'Blackwork', 'Dark art', 'Retrato', 'Pontilhismo'],
  trabalhos: [
    {
      id: '1',
      titulo: 'Batman que Ri',
      estilo: 'Dark art',
      regiao: 'Coxa',
      tamanho: '18 cm',
      sessao: '6h',
      altura: 240,
      descricao:
        'Releitura em blackwork com whip shading e contraste fechado nos dentes e na coroa. Sessão única.',
    },
    {
      id: '2',
      titulo: 'Morte e a Donzela',
      estilo: 'Blackwork',
      regiao: 'Panturrilha',
      tamanho: '22 cm',
      sessao: '2 sessões',
      altura: 300,
      descricao:
        'Composição clássica em pontilhismo e sombras de agulha única. Tecido e cabelo trabalhados em camadas.',
    },
    {
      id: '3',
      titulo: 'Rosto fragmentado',
      estilo: 'Retrato',
      regiao: 'Antebraço',
      tamanho: '12 cm',
      sessao: '3h',
      altura: 220,
      descricao:
        'Retrato em dark art com bloco sólido e dispersão em pontos. Peça autoral, flash exclusivo.',
    },
    {
      id: '4',
      titulo: 'Olhar vazio',
      estilo: 'Retrato',
      regiao: 'Braço',
      tamanho: '10 cm',
      sessao: '2h30',
      altura: 260,
      descricao: 'Variação de retrato em preto chapado e textura seca.',
    },
    {
      id: '5',
      titulo: 'Véu',
      estilo: 'Pontilhismo',
      regiao: 'Panturrilha',
      tamanho: '20 cm',
      sessao: '5h',
      altura: 230,
      descricao: 'Estudo de tecido em pontilhismo fino.',
    },
    {
      id: '6',
      titulo: 'Coroa',
      estilo: 'Dark art',
      regiao: 'Coxa',
      tamanho: '16 cm',
      sessao: '4h',
      altura: 280,
      descricao: 'Detalhe de coroa com cravos em blackwork.',
    },
  ],
};
