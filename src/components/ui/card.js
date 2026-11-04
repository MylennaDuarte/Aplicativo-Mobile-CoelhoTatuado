import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';

// Caixa com fundo, borda e cantos arredondados.
// semPadding: remove o espaçamento interno (útil quando o conteúdo é uma imagem).
export function Card({ style, semPadding = false, ...rest }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: colors.surface, borderColor: colors.border },
        !semPadding && styles.padded,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padded: {
    padding: Spacing.md,
  },
});
