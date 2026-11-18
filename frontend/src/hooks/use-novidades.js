import { NOVIDADES_MOCK } from '../data/novidades.mock';

// Conteúdo da tela de novidades.
// Quando houver backend, troque o mock por api.get('/novidades') com useEffect + useState.
export function useNovidades() {
  return { novidades: NOVIDADES_MOCK.itens, carregando: false };
}
