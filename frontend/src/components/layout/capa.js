import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';

export function Capa({
  altura,
  eyebrow,
  titulo,
  tamanhoTitulo = 56,
  degrade = true,
  uri,
  children,
  style,
}) {
  const { colors } = useTheme();
  const temRodape = Boolean(eyebrow || titulo || children);

  return (
    <View style={[styles.base, { height: altura }, style]}>
      <ImagePlaceholder label="" uri={uri} style={StyleSheet.absoluteFill} />
      {degrade ? (
        <LinearGradient
          colors={['rgba(10,10,10,0.4)', 'rgba(10,10,10,0)', colors.background]}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {temRodape ? (
        <View style={styles.rodape}>
          {eyebrow ? <AppText variant="eyebrow">{eyebrow}</AppText> : null}
          {titulo ? (
            <AppText
              variant="display"
              style={[
                styles.titulo,
                { fontSize: tamanhoTitulo, lineHeight: Math.round(tamanhoTitulo * 0.9) },
              ]}>
              {titulo}
            </AppText>
          ) : null}
          {children}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  rodape: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: Spacing.lg,
  },
  titulo: {
    marginTop: 6,
  },
});
