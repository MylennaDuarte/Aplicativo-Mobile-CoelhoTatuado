const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
app.use(express.json());
app.use(cors());

const TRABALHOS = [
  { titulo: 'Batman que Ri', estilo: 'Dark art', regiao: 'Coxa', tamanho: '18 cm', sessao: '6h', altura: 240, descricao: 'Releitura em blackwork com whip shading.' },
  { titulo: 'Morte e a Donzela', estilo: 'Blackwork', regiao: 'Panturrilha', tamanho: '22 cm', sessao: '2 sessões', altura: 300, descricao: 'Composição clássica em pontilhismo e sombras.' },
  { titulo: 'Rosto fragmentado', estilo: 'Retrato', regiao: 'Antebraço', tamanho: '12 cm', sessao: '3h', altura: 220, descricao: 'Retrato em dark art com dispersão em pontos.' },
  { titulo: 'Olhar vazio', estilo: 'Retrato', regiao: 'Braço', tamanho: '10 cm', sessao: '2h30', altura: 260, descricao: 'Variação de retrato em preto chapado.' },
  { titulo: 'Véu', estilo: 'Pontilhismo', regiao: 'Panturrilha', tamanho: '20 cm', sessao: '5h', altura: 230, descricao: 'Estudo de tecido em pontilhismo fino.' },
  { titulo: 'Coroa', estilo: 'Dark art', regiao: 'Coxa', tamanho: '16 cm', sessao: '4h', altura: 280, descricao: 'Detalhe de coroa com cravos em blackwork.' },
];

async function iniciar() {
  const db = await open({ filename: './banco.db', driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, servicoId TEXT, servicoTitulo TEXT,
      data TEXT, horario TEXT, nome TEXT, whatsapp TEXT, instagram TEXT, observacoes TEXT
    );
    CREATE TABLE IF NOT EXISTS orcamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, estilo TEXT, localCorpo TEXT,
      tamanhoCm TEXT, ideia TEXT, nome TEXT, whatsapp TEXT
    );
    CREATE TABLE IF NOT EXISTS novidades (
      id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT, titulo TEXT, descricao TEXT, dataPublicacao TEXT
    );
    CREATE TABLE IF NOT EXISTS trabalhos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, estilo TEXT, regiao TEXT,
      tamanho TEXT, sessao TEXT, altura INTEGER, descricao TEXT, imagemUrl TEXT
    );
  `);

  const count = await db.get('SELECT COUNT(*) as total FROM trabalhos');
  if (count.total === 0) {
    for (const t of TRABALHOS) {
      await db.run(
        'INSERT INTO trabalhos (titulo, estilo, regiao, tamanho, sessao, altura, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [t.titulo, t.estilo, t.regiao, t.tamanho, t.sessao, t.altura, t.descricao]
      );
    }
  }

  app.get('/', (req, res) => res.json({ status: 'OK' }));

  app.get('/inicio', async (req, res) => {
    const recentes = await db.all('SELECT id, titulo, estilo, imagemUrl FROM trabalhos LIMIT 3');
    res.json({
      hero: { eyebrow: 'Blackwork · Dark art', titulo: 'Tinta preta,\ntraço sem medo.', descricao: 'Bem-vindo ao estúdio do Victor. Atendimento individual e projetos autorais.' },
      trabalhosRecentes: recentes.map((r) => ({ ...r, id: String(r.id) })),
      novidade: { tag: 'Novidade', titulo: 'Kit pós-tattoo em toda sessão', descricao: 'Creme, card de cuidados, adesivos e docinhos.' },
      diferenciais: [
        { numero: '01', titulo: 'Atendimento individual', descricao: 'Um cliente por vez, sem fila e sem pressa.' },
        { numero: '02', titulo: 'Projetos autorais', descricao: 'Desenho exclusivo, feito para o seu corpo.' },
        { numero: '03', titulo: 'Biossegurança', descricao: 'Material descartável e autoclave em todas as sessões.' },
        { numero: '04', titulo: 'Kit pós-tattoo', descricao: 'Creme, guia de cuidados e mimos a cada sessão.' },
      ],
      tatuador: { nome: 'Victor', papel: 'Tatuador & fundador' },
      rodape: 'Coelho Tatuado · desde 2019',
    });
  });

  app.get('/trabalhos', async (req, res) => {
    const lista = await db.all('SELECT * FROM trabalhos');
    res.json(lista.map((item) => ({ ...item, id: String(item.id) })));
  });

  app.get('/agendamentos', async (req, res) => {
    res.json(await db.all('SELECT * FROM agendamentos ORDER BY id DESC'));
  });

  app.post('/agendamentos', async (req, res) => {
    const { servicoId, servicoTitulo, data, horario, nome, whatsapp, instagram, observacoes } = req.body;
    const r = await db.run(
      'INSERT INTO agendamentos (servicoId, servicoTitulo, data, horario, nome, whatsapp, instagram, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [servicoId, servicoTitulo, data, horario, nome, whatsapp, instagram, observacoes]
    );
    const codigo = 'CT-' + String(r.lastID).padStart(4, '0');
    await db.run('UPDATE agendamentos SET codigo = ? WHERE id = ?', [codigo, r.lastID]);
    res.status(201).json({ id: r.lastID, codigo });
  });

  app.get('/orcamentos', async (req, res) => {
    res.json(await db.all('SELECT * FROM orcamentos ORDER BY id DESC'));
  });

  app.post('/orcamentos', async (req, res) => {
    const { estilo, localCorpo, tamanhoCm, ideia, nome, whatsapp } = req.body;
    const r = await db.run(
      'INSERT INTO orcamentos (estilo, localCorpo, tamanhoCm, ideia, nome, whatsapp) VALUES (?, ?, ?, ?, ?, ?)',
      [estilo, localCorpo, tamanhoCm, ideia, nome, whatsapp]
    );
    const codigo = 'ORC-' + String(r.lastID).padStart(4, '0');
    await db.run('UPDATE orcamentos SET codigo = ? WHERE id = ?', [codigo, r.lastID]);
    res.status(201).json({ id: r.lastID, codigo });
  });

  app.get('/novidades', async (req, res) => {
    res.json(await db.all('SELECT * FROM novidades ORDER BY id DESC'));
  });

  app.listen(3000, '0.0.0.0', () => console.log('Servidor rodando na porta 3000!'));
}

iniciar();
