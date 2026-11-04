import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { Colors } from './theme';

// Temas do React Navigation derivados dos tokens em theme.js,
// para que headers e fundos de navegação sigam as mesmas cores do app.
function criarTema(base, scheme) {
  const c = Colors[scheme];
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: c.accent,
      background: c.background,
      card: c.background,
      text: c.text,
      border: c.border,
      notification: c.accent,
    },
  };
}

export const NavigationThemes = {
  light: criarTema(DefaultTheme, 'light'),
  dark: criarTema(DarkTheme, 'dark'),
};
