import { Image, StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/use-theme';
import { AppText } from './text';

export function ImagePlaceholder({ label = 'Imagem', uri, style }) {
  const { colors } = useTheme();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.base, style]}
        resizeMode="cover"
      />
    );
  }

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
