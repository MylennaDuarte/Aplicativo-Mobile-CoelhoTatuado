import { Pressable, StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';

// Card do tatuador que leva para a tela do perfil dele.
export function TatuadorCard({ tatuador, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${tatuador.papel}: ${tatuador.nome}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: pressed ? colors.textFaint : colors.border },
      ]}>
      <ImagePlaceholder uri={tatuador.imagemUrl} label="" style={styles.foto} />
      <View style={styles.textos}>
        <AppText variant="label">{tatuador.papel}</AppText>
        <AppText variant="cardTitle">{tatuador.nome}</AppText>
      </View>
      <AppText color="textMuted" style={styles.seta}>
        →
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  foto: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  seta: {
    fontSize: 18,
    lineHeight: 22,
  },
});
