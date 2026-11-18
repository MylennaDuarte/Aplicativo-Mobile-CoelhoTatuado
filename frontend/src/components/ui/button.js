import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Fonts, Radius, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';

// Botão do app.
// variant: "primary" (bloco claro), "secondary" (contorno sobre imagem),
// "outline" (contorno discreto em fundo escuro) ou "pill" (cápsula pequena sobre imagem).
// size: "md" (padrão, 52px) ou "sm" (40px, texto menor), para os botões de bloco.
// trailing: elemento à direita do texto (ex.: seta).
export function Button({
  title,
  variant = 'primary',
  size = 'md',
  trailing,
  loading = false,
  disabled,
  style,
  ...rest
}) {
  const { colors } = useTheme();
  const inativo = disabled || loading;
  const compacto = size === 'sm' && variant !== 'pill';

  const container = {
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.lineOnImage },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.borderStrong },
    pill: { backgroundColor: colors.overlay, borderWidth: 1, borderColor: colors.lineOnImage },
  }[variant];

  const corTexto = variant === 'primary' ? colors.onPrimary : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inativo, busy: loading }}
      disabled={inativo}
      style={({ pressed }) => [
        styles.base,
        variant === 'pill' ? styles.pill : compacto ? styles.blockSm : styles.block,
        container,
        pressed && styles.pressed,
        inativo && styles.disabled,
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={corTexto} />
      ) : (
        <>
          <Text
            style={[
              styles.texto,
              styles[`texto_${variant}`],
              compacto && styles.textoSm,
              { color: corTexto },
            ]}>
            {title}
          </Text>
          {trailing}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  block: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: Radius.sm,
  },
  blockSm: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: Radius.sm,
  },
  pill: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.4,
  },
  texto: {
    textTransform: 'uppercase',
  },
  texto_primary: {
    fontFamily: Fonts.sansBold,
    fontSize: 13,
    letterSpacing: tracking(0.14, 13),
  },
  texto_secondary: {
    fontFamily: Fonts.sansSemiBold,
    fontSize: 13,
    letterSpacing: tracking(0.1, 13),
  },
  texto_outline: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    letterSpacing: tracking(0.1, 13),
  },
  texto_pill: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    letterSpacing: tracking(0.18, 11),
  },
  // Sobrepõe o tamanho do texto nos botões de bloco com size="sm".
  textoSm: {
    fontSize: 11,
    letterSpacing: tracking(0.14, 11),
  },
});
