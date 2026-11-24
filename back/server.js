require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const crypto = require('crypto');

const ALGORITMO = 'aes-256-cbc';
const CHAVE = Buffer.from(process.env.CHAVE_SECRETA || 'coelho_tatuado_chave_secreta_32b');

function criptografar(texto) {
  if (!texto) return texto;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITMO, CHAVE, iv);
  let criptografado = cipher.update(String(texto), 'utf8', 'hex');
  criptografado += cipher.final('hex');
  return `${iv.toString('hex')}:${criptografado}`;
}

function descriptografar(textoCriptografado) {
  if (!textoCriptografado || !String(textoCriptografado).includes(':')) return textoCriptografado;
  try {
    const [ivHex, dadosHex] = String(textoCriptografado).split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITMO, CHAVE, iv);
    let descriptografado = decipher.update(dadosHex, 'hex', 'utf8');
    descriptografado += decipher.final('utf8');
    return descriptografado;
  } catch (erro) {
    return textoCriptografado;
  }
}

function somenteDigitos(valor) {
  return String(valor || '').replace(/\D/g, '');
}

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const TRABALHOS = [
  { titulo: 'Batman que Ri', estilo: 'Dark art', regiao: 'Coxa', tamanho: '18 cm', sessao: '6h', altura: 240, descricao: 'Releitura em blackwork com whip shading.', arquivo: 'batman.jpg' },
  { titulo: 'Morte e a Donzela', estilo: 'Blackwork', regiao: 'Panturrilha', tamanho: '22 cm', sessao: '2 sessões', altura: 300, descricao: 'Composição clássica em pontilhismo e sombras.', arquivo: 'morte.jpg' },
  { titulo: 'Rosto fragmentado', estilo: 'Retrato', regiao: 'Antebraço', tamanho: '12 cm', sessao: '3h', altura: 220, descricao: 'Retrato em dark art com dispersão em pontos.', arquivo: 'rosto.jpg' },
  { titulo: 'Olhar vazio', estilo: 'Retrato', regiao: 'Braço', tamanho: '10 cm', sessao: '2h30', altura: 260, descricao: 'Variação de retrato em preto chapado.', arquivo: 'aguia.JPG' },
  { titulo: 'Véu', estilo: 'Pontilhismo', regiao: 'Panturrilha', tamanho: '20 cm', sessao: '5h', altura: 230, descricao: 'Estudo de tecido em pontilhismo fino.', arquivo: 'sol.JPG' },
  { titulo: 'Coroa', estilo: 'Dark art', regiao: 'Coxa', tamanho: '16 cm', sessao: '4h', altura: 280, descricao: 'Detalhe de coroa com cravos em blackwork.', arquivo: 'flor.JPG' },
];

const NOVIDADES_INICIAIS = [
  {
    tag: 'Agenda',
    destaque: 1,
    dataPublicacao: '2026-11-22',
    titulo: 'Agenda de dezembro aberta',
    descricao: 'Últimos horários do ano. Sessões de sábado estão quase esgotadas.',
    imagemUrl: 'agenda.JPG',
    botaoTexto: 'Reservar horário',
    telaDestino: 'Agendar',
  },
  {
    tag: 'Novidade',
    destaque: 0,
    dataPublicacao: '2026-10-12',
    titulo: 'Kit pós-tattoo em toda sessão',
    descricao: '50g de creme, card com os cuidados, adesivos do Coelho e docinhos. Para a cicatrização e para a alegria.',
    imagemUrl: 'kit.JPG',
    botaoTexto: 'Ver cuidados',
    telaDestino: 'Estudio',
  },
  {
    tag: 'Promoção',
    destaque: 1,
    dataPublicacao: '2026-11-28',
    titulo: 'Flash day: Coelhos',
    descricao: 'Dez desenhos autorais do mascote, tamanho até 8 cm, valor fechado. Um por pessoa, ordem de chegada.',
    imagemUrl: 'flash.JPG',
    botaoTexto: 'Quero um flash',
    telaDestino: 'Orcamento',
  },
  {
    tag: 'Projeto',
    destaque: 0,
    dataPublicacao: '2026-09-15',
    titulo: 'Série Santos & Caveiras',
    descricao: 'Projeto autoral em andamento. Procuro quatro pessoas para peças grandes em costas e costela, com condições especiais.',
    imagemUrl: 'santos.JPG',
    botaoTexto: 'Participar',
    telaDestino: 'Orcamento',
  },
];

function montarUrlImagem(req, nomeArquivo) {
  if (!nomeArquivo) return null;
  if (nomeArquivo.startsWith('http')) return nomeArquivo;
  return `${req.protocol}://${req.get('host')}/uploads/${nomeArquivo}`;
}

async function adicionarColunaSeNaoExistir(db, tabela, coluna, tipo) {
  const colunas = await db.all(`PRAGMA table_info(${tabela})`);
  const existe = colunas.some((c) => c.name === coluna);
  if (!existe) {
    await db.exec(`ALTER TABLE ${tabela} ADD COLUMN ${coluna} ${tipo}`);
  }
}

async function iniciar() {
  const db = await open({ filename: './banco.db', driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, servicoId TEXT, servicoTitulo TEXT,
      data TEXT, horario TEXT, nome TEXT, whatsapp TEXT, instagram TEXT, observacoes TEXT
    );
    CREATE TABLE IF NOT EXISTS orcamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, estilo TEXT, localCorpo TEXT,
      tamanhoCm TEXT, ideia TEXT, preferenciaData TEXT, nome TEXT, whatsapp TEXT, observacoes TEXT
    );
    CREATE TABLE IF NOT EXISTS novidades (
      id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT, destaque INTEGER DEFAULT 0, titulo TEXT,
      descricao TEXT, dataPublicacao TEXT, imagemUrl TEXT, botaoTexto TEXT, telaDestino TEXT
    );
    CREATE TABLE IF NOT EXISTS trabalhos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, estilo TEXT, regiao TEXT,
      tamanho TEXT, sessao TEXT, altura INTEGER, descricao TEXT, imagemUrl TEXT
    );
  `);

  await adicionarColunaSeNaoExistir(db, 'orcamentos', 'preferenciaData', 'TEXT');
  await adicionarColunaSeNaoExistir(db, 'orcamentos', 'observacoes', 'TEXT');
  await adicionarColunaSeNaoExistir(db, 'novidades', 'destaque', 'INTEGER DEFAULT 0');
  await adicionarColunaSeNaoExistir(db, 'novidades', 'imagemUrl', 'TEXT');
  await adicionarColunaSeNaoExistir(db, 'novidades', 'botaoTexto', 'TEXT');
  await adicionarColunaSeNaoExistir(db, 'novidades', 'telaDestino', 'TEXT');

  const countTrabalhos = await db.get('SELECT COUNT(*) as total FROM trabalhos');
  if (countTrabalhos.total === 0) {
    for (const t of TRABALHOS) {
      await db.run(
        'INSERT INTO trabalhos (titulo, estilo, regiao, tamanho, sessao, altura, descricao, imagemUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [t.titulo, t.estilo, t.regiao, t.tamanho, t.sessao, t.altura, t.descricao, t.arquivo]
      );
    }
  } else {
    for (let i = 0; i < TRABALHOS.length; i++) {
      await db.run('UPDATE trabalhos SET imagemUrl = ? WHERE id = ?', [TRABALHOS[i].arquivo, i + 1]);
    }
  }

  const countNovidades = await db.get('SELECT COUNT(*) as total FROM novidades');
  if (countNovidades.total === 0) {
    for (const n of NOVIDADES_INICIAIS) {
      await db.run(
        'INSERT INTO novidades (tag, destaque, titulo, descricao, dataPublicacao, imagemUrl, botaoTexto, telaDestino) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [n.tag, n.destaque, n.titulo, n.descricao, n.dataPublicacao, n.imagemUrl, n.botaoTexto, n.telaDestino]
      );
    }
  } else {
    await db.run("UPDATE novidades SET imagemUrl = 'agenda.JPG' WHERE id = 1");
    await db.run("UPDATE novidades SET imagemUrl = 'kit.JPG' WHERE id = 2");
    await db.run("UPDATE novidades SET imagemUrl = 'flash.JPG' WHERE id = 3");
    await db.run("UPDATE novidades SET imagemUrl = 'santos.JPG' WHERE id = 4");
  }

  app.get('/', (req, res) => res.json({ status: 'OK' }));

  app.get('/inicio', async (req, res) => {
    const recentes = await db.all('SELECT id, titulo, estilo, imagemUrl FROM trabalhos LIMIT 3');
    const novidadeDestaque = await db.get(
      'SELECT * FROM novidades WHERE destaque = 1 ORDER BY id DESC LIMIT 1'
    );

    res.json({
      hero: {
        eyebrow: 'Blackwork · Dark art',
        titulo: 'Tinta preta,\ntraço sem medo.',
        descricao: 'Bem-vindo ao estúdio do Victor. Atendimento individual e projetos autorais.',
        imagemUrl: montarUrlImagem(req, 'batman.jpg'),
        logoUrl: montarUrlImagem(req, 'logo.JPG'),
      },
      trabalhosRecentes: recentes.map((r) => ({
        ...r,
        id: String(r.id),
        imagemUrl: montarUrlImagem(req, r.imagemUrl),
      })),
      novidade: novidadeDestaque
        ? {
            tag: novidadeDestaque.tag,
            titulo: novidadeDestaque.titulo,
            descricao: novidadeDestaque.descricao,
            imagemUrl: montarUrlImagem(req, novidadeDestaque.imagemUrl),
            acao: {
              rotulo: novidadeDestaque.botaoTexto || 'Ver mais',
              rota: novidadeDestaque.telaDestino || 'Novidades',
            },
          }
        : { tag: 'Novidade', titulo: 'Kit pós-tattoo em toda sessão', descricao: 'Creme, card de cuidados, adesivos e docinhos.' },
      diferenciais: [
        { numero: '01', titulo: 'Atendimento individual', descricao: 'Um cliente por vez, sem fila e sem pressa.' },
        { numero: '02', titulo: 'Projetos autorais', descricao: 'Desenho exclusivo, feito para o seu corpo.' },
        { numero: '03', titulo: 'Biossegurança', descricao: 'Material descartável e autoclave em todas as sessões.' },
        { numero: '04', titulo: 'Kit pós-tattoo', descricao: 'Creme, guia de cuidados e mimos a cada sessão.' },
      ],
      tatuador: {
        nome: 'Victor',
        papel: 'Tatuador & fundador',
        imagemUrl: montarUrlImagem(req, 'perfil.JPG'),
      },
      rodape: 'Coelho Tatuado · desde 2019',
    });
  });

  app.get('/trabalhos', async (req, res) => {
    const lista = await db.all('SELECT * FROM trabalhos');
    res.json(
      lista.map((item) => ({
        ...item,
        id: String(item.id),
        imagemUrl: montarUrlImagem(req, item.imagemUrl),
      }))
    );
  });

  app.get('/agendamentos', async (req, res) => {
    const whatsappFiltro = somenteDigitos(req.query.whatsapp);
    if (!whatsappFiltro) {
      return res.json([]);
    }

    const lista = await db.all('SELECT * FROM agendamentos ORDER BY id DESC');
    const listaFiltrada = lista
    .map((item) => ({
    ...item,
    nome: descriptografar(item.nome),
    whatsapp: descriptografar(item.whatsapp),
    instagram: descriptografar(item.instagram),
    }))
    .filter((item) => somenteDigitos(item.whatsapp) === whatsappFiltro);
    res.json(listaFiltrada);
    });
    app.post('/agendamentos', async (req, res) => {
    const { servicoId, servicoTitulo, data, horario, nome, whatsapp, instagram, observacoes } = req.body;
    const r = await db.run(
    'INSERT INTO agendamentos (servicoId, servicoTitulo, data, horario, nome, whatsapp, instagram, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
    servicoId,
    servicoTitulo,
    data,
    horario,
    criptografar(nome),
    criptografar(whatsapp),
    criptografar(instagram),
    observacoes,
    ]
    );
    const codigo = 'CT-' + String(r.lastID).padStart(4, '0');
    await db.run('UPDATE agendamentos SET codigo = ? WHERE id = ?', [codigo, r.lastID]);
    res.status(201).json({ id: r.lastID, codigo });
    });
    app.get('/orcamentos', async (req, res) => {
    const whatsappFiltro = somenteDigitos(req.query.whatsapp);
    if (!whatsappFiltro) {
    return res.json([]);
    }
    const lista = await db.all('SELECT * FROM orcamentos ORDER BY id DESC');
    const listaFiltrada = lista
    .map((item) => ({
    ...item,
    nome: descriptografar(item.nome),
    whatsapp: descriptografar(item.whatsapp),
    }))
    .filter((item) => somenteDigitos(item.whatsapp) === whatsappFiltro);
    res.json(listaFiltrada);
    });
    app.post('/orcamentos', async (req, res) => {
    const { estilo, localCorpo, tamanhoCm, ideia, preferenciaData, nome, whatsapp, observacoes } = req.body;
    const r = await db.run(
    'INSERT INTO orcamentos (estilo, localCorpo, tamanhoCm, ideia, preferenciaData, nome, whatsapp, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
    estilo,
    localCorpo,
    tamanhoCm,
    ideia,
    preferenciaData || '',
    criptografar(nome),
    criptografar(whatsapp),
    observacoes || '',
    ]
    );
    const codigo = 'ORC-' + String(r.lastID).padStart(4, '0');
    await db.run('UPDATE orcamentos SET codigo = ? WHERE id = ?', [codigo, r.lastID]);
    res.status(201).json({ id: r.lastID, codigo });
    });
    app.get('/novidades', async (req, res) => {
    const lista = await db.all('SELECT * FROM novidades ORDER BY destaque DESC, id DESC');
    res.json(
    lista.map((item) => ({
    id: String(item.id),
    tag: item.tag,
    destaque: Boolean(item.destaque),
    titulo: item.titulo,
    descricao: item.descricao,
    dataPublicacao: item.dataPublicacao,
    imagemUrl: montarUrlImagem(req, item.imagemUrl),
    botaoTexto: item.botaoTexto,
    telaDestino: item.telaDestino,
    acao: {
    rotulo: item.botaoTexto || 'Ver mais',
    rota: item.telaDestino || 'Inicio',
    },
    }))
    );
    });
    app.listen(3000, '0.0.0.0', () => console.log('Servidor rodando na porta 3000!'));
    }
    iniciar();