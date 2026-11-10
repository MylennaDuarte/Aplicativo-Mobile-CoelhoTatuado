import { Pressable, StyleSheet, Text } from 'react-native';

import { Fonts, Radius, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';

// Cápsula de seleção (filtros da galeria, estilos e regiões do orçamento).
// ativo: preenchida em claro; inativa: só o contorno.
export function Chip({ label, ativo = false, style, ...rest }) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: ativo }}
      style={({ pressed }) => [
        styles.base,
        {
          borderColor: ativo ? colors.text : colors.borderStrong,
          backgroundColor: ativo ? colors.primary : 'transparent',
        },
        pressed && styles.pressed,
        style,
      ]}
      {...rest}>
      <Text style={[styles.texto, { color: ativo ? colors.onPrimary : colors.textSecondary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  texto: {
    fontFamily: Fonts.sansSemiBold,
    fontSize: 12,
    letterSpacing: tracking(0.06, 12),
  },
});
