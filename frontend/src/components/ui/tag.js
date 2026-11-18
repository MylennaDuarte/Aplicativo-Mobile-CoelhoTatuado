import { StyleSheet, View } from 'react-native';

import { Radius } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './text';

// Etiqueta pequena em caixa alta: tags de novidades e status de sessões e orçamentos.
// tone: "solid" (fundo claro), "overlay" (translúcida sobre imagem),
// "outline" (contorno claro) ou "muted" (contorno discreto, texto cinza).
// forte: texto em negrito (tags de destaque).
export function Tag({ label, tone = 'outline', forte = false, style }) {
  const { colors } = useTheme();

  const aparencia = {
    solid: { fundo: colors.primary, borda: colors.primary, cor: 'onPrimary' },
    overlay: { fundo: colors.overlay, borda: colors.lineOnImage, cor: 'text' },
    outline: { fundo: 'transparent', borda: colors.text, cor: 'text' },
    muted: { fundo: 'transparent', borda: colors.borderStrong, cor: 'textMuted' },
  }[tone];

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: aparencia.fundo, borderColor: aparencia.borda },
        style,
      ]}>
      <AppText variant={forte ? 'labelStrong' : 'label'} color={aparencia.cor}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: Radius.xs,
  },
});
