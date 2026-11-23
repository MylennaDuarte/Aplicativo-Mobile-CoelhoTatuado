import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { Radius } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';

export function Referencias({ referencias, onEscolher, onRemover }) {
  const { colors } = useTheme();

  return (
    <View>
      <AppText variant="label" style={styles.rotulo}>
        Referências
      </AppText>
      <View style={styles.grade}>
        {referencias.map((foto, indice) => (
          <View key={indice} style={styles.espaco}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${foto ? 'Trocar' : 'Adicionar'} referência ${indice + 1}`}
              onPress={() => onEscolher(indice)}
              style={({ pressed }) => [
                styles.area,
                {
                  borderColor: foto ? colors.textMuted : colors.borderStrong,
                  backgroundColor: colors.surface,
                },
                pressed && styles.pressed,
              ]}>
              {foto ? (
                <Image source={{ uri: foto.uri }} contentFit="cover" style={StyleSheet.absoluteFill} />
              ) : (
                <AppText variant="subtitle" color="textDim">
                  +
                </AppText>
              )}
            </Pressable>
            {foto ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remover referência ${indice + 1}`}
                hitSlop={8}
                onPress={() => onRemover(indice)}
                style={[
                  styles.remover,
                  { backgroundColor: colors.background, borderColor: colors.borderStrong },
                ]}>
                <AppText variant="smallBold" style={styles.removerTexto}>
                  ×
                </AppText>
              </Pressable>
            ) : null}
          </View>
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
  },
  area: {
    flex: 1,
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
  remover: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removerTexto: {
    lineHeight: 16,
  },
});
