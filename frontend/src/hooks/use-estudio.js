import { ESTUDIO_MOCK } from '../data/estudio.mock';

// Conteúdo institucional da tela "O Estúdio".
// Hoje vem do mock, quando o backend tiver um endpoint para isso, troque aqui.
export function useEstudio() {
  return { estudio: ESTUDIO_MOCK, carregando: false };
}
