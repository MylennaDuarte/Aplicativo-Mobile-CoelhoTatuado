import { useMemo, useState } from 'react';

import { GALERIA_MOCK } from '../data/galeria.mock';

const FILTRO_TODOS = 'Todos';

// Conteúdo da galeria com filtro por estilo.
// Quando houver backend, troque o mock por api.get('/trabalhos') com useEffect + useState.
export function useGaleria() {
  const [filtro, setFiltro] = useState(FILTRO_TODOS);

  const trabalhos = useMemo(
    () =>
      filtro === FILTRO_TODOS
        ? GALERIA_MOCK.trabalhos
        : GALERIA_MOCK.trabalhos.filter((trabalho) => trabalho.estilo === filtro),
    [filtro]
  );

  return {
    filtros: GALERIA_MOCK.filtros,
    filtro,
    selecionarFiltro: setFiltro,
    trabalhos,
    total: trabalhos.length,
    carregando: false,
  };
}
