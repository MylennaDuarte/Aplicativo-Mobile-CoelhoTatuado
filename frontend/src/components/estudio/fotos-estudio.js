import { StyleSheet, View } from 'react-native';
import { Radius } from '../../constants/theme';
import { ImagePlaceholder } from '../ui/image-placeholder';

export function FotosEstudio({ fotos }) {
  return (
    <View style={styles.linha}>
      {fotos.map((rotulo) => (
        <ImagePlaceholder key={rotulo} label={rotulo} style={styles.foto} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  foto: {
    flex: 1,
    aspectRatio: 4 / 3,
    borderRadius: Radius.sm,
  },
});
