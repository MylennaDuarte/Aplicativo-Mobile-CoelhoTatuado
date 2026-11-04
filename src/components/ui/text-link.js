import { Pressable, StyleSheet } from 'react-native';

import { Fonts, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './text';

// Link em caixa alta com linha embaixo, como "Ver galeria" e "Ver novidades".
// tone: "muted" (cinza com sublinhado discreto) ou "strong" (claro com sublinhado claro).
export function TextLink({ label, tone = 'muted', ...rest }) {
  const { colors } = useTheme();
  const forte = tone === 'strong';

  return (
    <Pressable
      accessibilityRole="link"
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        { borderBottomColor: forte ? colors.text : colors.borderStrong },
        pressed && styles.pressed,
      ]}
      {...rest}>
      <AppText
        variant="link"
        color={forte ? 'text' : 'textMuted'}
        style={forte ? styles.textoForte : undefined}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingBottom: 2,
    borderBottomWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  textoForte: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: tracking(0.14, 12),
  },
});
