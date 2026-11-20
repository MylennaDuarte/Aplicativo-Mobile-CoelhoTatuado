import { StyleSheet, View } from 'react-native';
import { Radius } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';

export function Trajetoria({ itens }) {
  const { colors } = useTheme();

  return (
    <View>
      <AppText variant="title" style={styles.titulo}>
        Trajetória
      </AppText>
      <View style={[styles.linha, { borderLeftColor: colors.border }]}>
        {itens.map((item) => (
          <View key={item.ano}>
            <View style={[styles.marcador, { backgroundColor: colors.text }]} />
            <AppText variant="brand" color="textMuted">
              {item.ano}
            </AppText>
            <AppText>{item.texto}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    marginBottom: 14,
  },
  linha: {
    borderLeftWidth: 1,
    paddingLeft: 22,
    gap: 18,
    marginBottom: 28,
  },
  marcador: {
    position: 'absolute',
    left: -26,
    top: 5,
    width: 7,
    height: 7,
    borderRadius: Radius.full,
  },
});
