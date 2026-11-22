import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { SectionHeader } from '../layout/section-header';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';

// Seção "Trabalhos recentes": lista horizontal de cards.
export function TrabalhosRecentes({ trabalhos, onVerGaleria, onAbrir }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Trabalhos recentes"
        action={{ label: 'Ver galeria', onPress: onVerGaleria }}
        style={styles.cabecalho}
      />
      <FlatList
        horizontal
        data={trabalhos}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={item.titulo}
            onPress={() => onAbrir && onAbrir(item)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.surfaceElevated },
              pressed && styles.pressed,
            ]}>
            <ImagePlaceholder uri={item.imagemUrl} style={StyleSheet.absoluteFill} />
            <LinearGradient
              colors={['transparent', 'rgba(10,10,10,0.85)']}
              locations={[0.5, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.legenda}>
              <AppText variant="label">{item.estilo}</AppText>
              <AppText variant="bodyStrong">{item.titulo}</AppText>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.xl,
  },
  cabecalho: {
    paddingHorizontal: Spacing.lg,
    marginBottom: 14,
  },
  lista: {
    paddingHorizontal: Spacing.lg,
  },
  separador: {
    width: 10,
  },
  card: {
    width: 200,
    height: 260,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.85,
  },
  legenda: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 2,
  },
});
