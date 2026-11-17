import { useEffect, useMemo, useState } from 'react';

import { GALERIA_MOCK } from '../data/galeria.mock';
import { api } from '../services/api/client';

const FILTRO_TODOS = 'Todos';

export function useGaleria() {
  const [filtro, setFiltro] = useState(FILTRO_TODOS);
  const [listaTrabalhos, setListaTrabalhos] = useState(GALERIA_MOCK.trabalhos);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarTrabalhos() {
      try {
        setCarregando(true);
        const dados = await api.get('/trabalhos');
        if (Array.isArray(dados) && dados.length > 0) {
          setListaTrabalhos(dados);
        }
      } catch (err) {
        console.log('Aviso: usando dados locais na galeria:', err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarTrabalhos();
  }, []);

  const trabalhos = useMemo(
    () =>
      filtro === FILTRO_TODOS
        ? listaTrabalhos
        : listaTrabalhos.filter((trabalho) => trabalho.estilo === filtro),
    [filtro, listaTrabalhos]
  );

  return {
    filtros: GALERIA_MOCK.filtros,
    filtro,
    selecionarFiltro: setFiltro,
    trabalhos,
    total: trabalhos.length,
    carregando,
  };
}
