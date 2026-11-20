import { Pressable, StyleSheet, View } from 'react-native';
import { Radius } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';
import { TextLink } from '../ui/text-link';

export function DestaquesTatuador({ trabalhos, onAbrir, onVerGaleria }) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.cabecalho}>
        <AppText variant="title">Em destaque</AppText>
        <TextLink label="Galeria" onPress={onVerGaleria} />
      </View>
      <View style={styles.grade}>
        {trabalhos.map((trabalho) => (
          <Pressable
            key={trabalho.id}
            accessibilityRole="button"
            accessibilityLabel={trabalho.titulo}
            onPress={() => onAbrir(trabalho)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.surfaceElevated },
              pressed && styles.pressed,
            ]}>
            <ImagePlaceholder label={trabalho.titulo} style={StyleSheet.absoluteFill} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  grade: {
    flexDirection: 'row',
    gap: 6,
  },
  card: {
    flex: 1,
    aspectRatio: 3 / 4,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.85,
  },
});
