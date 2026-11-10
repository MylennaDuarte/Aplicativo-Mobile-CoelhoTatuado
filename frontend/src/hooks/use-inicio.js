import { INICIO_MOCK } from '../data/inicio.mock';

// Conteúdo da tela de início.
// Quando houver backend, troque o mock por api.get('/inicio') com useEffect + useState.
export function useInicio() {
  return { dados: INICIO_MOCK, carregando: false };
}
