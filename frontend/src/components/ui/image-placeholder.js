import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/use-theme';
import { urlDaImagem } from '../../utils/imagem';
import { AppText } from './text';

// Mostra a foto quando `uri` existe (caminho relativo do back ou URL completa);
// sem foto, fica o quadrado cinza com o rótulo.
export function ImagePlaceholder({ uri, label = 'Imagem', style }) {
  const { colors } = useTheme();
  const url = urlDaImagem(uri);

  return (
    <View style={[styles.base, { backgroundColor: colors.surfaceElevated }, style]}>
      {url ? (
        <Image
          source={{ uri: url }}
          contentFit="cover"
          transition={200}
          style={StyleSheet.absoluteFill}
        />
      ) : label ? (
        <AppText variant="label" color="textFaint">
          {label}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
