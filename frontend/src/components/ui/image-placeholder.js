import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/use-theme';
import { AppText } from './text';

// Ocupa o lugar de uma imagem que virá do backend.
// Quando a API existir, troque por <Image source={{ uri }} /> no mesmo lugar.
export function ImagePlaceholder({ label = 'Imagem', style }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.base, { backgroundColor: colors.surfaceElevated }, style]}>
      {label ? (
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
