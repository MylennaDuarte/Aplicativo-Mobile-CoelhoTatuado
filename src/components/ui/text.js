import { StyleSheet, Text } from 'react-native';

import { Fonts, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';

// Cor padrão de cada variante quando a prop `color` não é informada.
const COR_PADRAO = {
  eyebrow: 'textSecondary',
  caption: 'textMuted',
  small: 'textMuted',
  label: 'textMuted',
  labelStrong: 'textMuted',
  link: 'textMuted',
  number: 'textFaint',
};

// Texto do app. `variant` escolhe fonte, tamanho e espaçamento (ver styles abaixo);
// `color` é uma chave de Colors (ex.: "textMuted").
export function AppText({ style, variant = 'body', color, ...rest }) {
  const { colors } = useTheme();
  const cor = color ?? COR_PADRAO[variant] ?? 'text';

  return <Text style={[{ color: colors[cor] }, styles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  // Bebas Neue
  display: { fontFamily: Fonts.display, fontSize: 62, lineHeight: 58, letterSpacing: tracking(0.01, 62) },
  heading: { fontFamily: Fonts.display, fontSize: 48, lineHeight: 48, letterSpacing: tracking(0.02, 48) },
  title: { fontFamily: Fonts.display, fontSize: 30, lineHeight: 30, letterSpacing: tracking(0.04, 30) },
  subtitle: { fontFamily: Fonts.display, fontSize: 26, lineHeight: 26, letterSpacing: tracking(0.03, 26) },
  cardTitle: { fontFamily: Fonts.display, fontSize: 24, lineHeight: 26, letterSpacing: tracking(0.04, 24) },
  brand: { fontFamily: Fonts.display, fontSize: 20, lineHeight: 20, letterSpacing: tracking(0.12, 20) },
  number: { fontFamily: Fonts.display, fontSize: 28, lineHeight: 28 },
  // Manrope
  body: { fontFamily: Fonts.sans, fontSize: 14, lineHeight: 22 },
  bodyStrong: { fontFamily: Fonts.sansSemiBold, fontSize: 14, lineHeight: 20 },
  itemTitle: { fontFamily: Fonts.sansBold, fontSize: 15, lineHeight: 20 },
  small: { fontFamily: Fonts.sans, fontSize: 13, lineHeight: 19 },
  smallBold: { fontFamily: Fonts.sansBold, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: Fonts.sans, fontSize: 12, lineHeight: 17 },
  eyebrow: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: tracking(0.32, 11),
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: tracking(0.2, 10),
    textTransform: 'uppercase',
  },
  labelStrong: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: tracking(0.2, 10),
    textTransform: 'uppercase',
  },
  link: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: tracking(0.2, 11),
    textTransform: 'uppercase',
  },
  navLabel: {
    fontFamily: Fonts.sansMedium,
    fontSize: 9.5,
    lineHeight: 12,
    letterSpacing: tracking(0.14, 9.5),
    textTransform: 'uppercase',
  },
});
