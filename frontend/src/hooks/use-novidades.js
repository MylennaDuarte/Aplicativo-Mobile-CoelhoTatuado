import { useEffect, useState } from 'react';

import { NOVIDADES_MOCK } from '../data/novidades.mock';
import { api } from '../services/api/client';
import { formatarDataRelativa } from '../utils/calendar';

const ALTURA_COM_FOTO = 190;
const ALTURA_SEM_FOTO = 150;
const ACAO_PADRAO = { rotulo: 'Ver mais', rota: 'Inicio' };


function novidadeDoServidor(item) {
  return {
    id: String(item.id),
    tag: item.tag,
    destaque: Boolean(item.destaque),
    data: formatarDataRelativa(item.data ?? item.dataPublicacao),
    titulo: item.titulo,
    descricao: item.descricao,
    imagemUrl: item.imagemUrl,
    alturaImagem: item.imagemUrl ? ALTURA_COM_FOTO : ALTURA_SEM_FOTO,
    acao: item.acao && item.acao.rota ? item.acao : ACAO_PADRAO,
  };
}

export function useNovidades() {
  const [novidades, setNovidades] = useState(NOVIDADES_MOCK.itens);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarNovidades() {
      try {
        const lista = await api.get('/novidades');
        if (Array.isArray(lista) && lista.length > 0) {
          setNovidades(lista.map(novidadeDoServidor));
        }
      } catch (err) {
        console.log('Aviso: usando dados locais nas novidades:', err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarNovidades();
  }, []);

  return { novidades, carregando };
}
