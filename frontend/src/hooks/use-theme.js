import { Colors } from '../constants/theme';

// Tema atual. A marca é preto e branco, então o app ignora o esquema do sistema
// e usa sempre o escuro. Se um dia houver tema claro, troque aqui por useColorScheme().
export function useTheme() {
  const scheme = 'dark';

  return { scheme, colors: Colors[scheme], isDark: true };
}
