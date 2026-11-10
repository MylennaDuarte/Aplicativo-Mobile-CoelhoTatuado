import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Card } from '../ui/card';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';
import { TextLink } from '../ui/text-link';

// Card da novidade em destaque (kit pós-tattoo).
export function NovidadeDestaque({ novidade, onVerNovidades }) {
  const { colors } = useTheme();

  return (
    <Card semPadding style={styles.card}>
      <ImagePlaceholder style={styles.imagem} />
      <View style={[styles.tag, { backgroundColor: colors.primary }]}>
        <AppText variant="labelStrong" color="onPrimary">
          {novidade.tag}
        </AppText>
      </View>
      <View style={styles.corpo}>
        <AppText variant="subtitle">{novidade.titulo}</AppText>
        <AppText variant="small" style={styles.descricao}>
          {novidade.descricao}
        </AppText>
        <TextLink label="Ver novidades" tone="strong" onPress={onVerNovidades} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    marginHorizontal: Spacing.lg,
    backgroundColor: 'transparent',
  },
  imagem: {
    height: 170,
  },
  tag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: Radius.xs,
  },
  corpo: {
    padding: Spacing.md,
  },
  descricao: {
    marginTop: 6,
    marginBottom: 12,
  },
});
