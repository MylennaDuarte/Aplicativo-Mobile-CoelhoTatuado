import { Pressable, StyleSheet, View } from 'react-native';

import { Radius } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';

// Espaços para fotos de referência do projeto. Tocar marca/desmarca o espaço;
// a escolha de imagens de verdade virá com o backend de uploads
export function Referencias({ marcadas, onAlternar }) {
  const { colors } = useTheme();

  return (
    <View>
      <AppText variant="label" style={styles.rotulo}>
        Referências
      </AppText>
      <View style={styles.grade}>
        {marcadas.map((marcada, indice) => (
          <Pressable
            key={indice}
            accessibilityRole="button"
            accessibilityState={{ selected: marcada }}
            accessibilityLabel={`Referência ${indice + 1}`}
            onPress={() => onAlternar(indice)}
            style={({ pressed }) => [
              styles.espaco,
              {
                borderColor: marcada ? colors.textMuted : colors.borderStrong,
                backgroundColor: colors.surface,
              },
              pressed && styles.pressed,
            ]}>
            {marcada ? (
              <ImagePlaceholder label="Ref." style={StyleSheet.absoluteFill} />
            ) : (
              <AppText variant="subtitle" color="textDim">
                +
              </AppText>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rotulo: {
    marginBottom: 8,
  },
  grade: {
    flexDirection: 'row',
    gap: 8,
  },
  espaco: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.75,
  },
});
