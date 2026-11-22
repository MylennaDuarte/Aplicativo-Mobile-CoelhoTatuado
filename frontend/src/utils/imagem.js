import { AppConfig } from '../constants/config';


export function urlDaImagem(caminho) {
  if (!caminho) return null;
  if (/^https?:\/\//.test(caminho)) return caminho;
  if (!AppConfig.apiUrl) return null;
  return `${AppConfig.apiUrl}${caminho}`;
}
