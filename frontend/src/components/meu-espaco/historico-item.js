import { StyleSheet, View } from 'react-native';

import { Radius, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';

// Linha do histórico: foto do trabalho, data, título, detalhe, valor e situação.
export function HistoricoItem({ item }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.linha, { borderBottomColor: colors.divider }]}>
      <ImagePlaceholder label="" style={styles.foto} />
      <View style={styles.textos}>
        <AppText variant="label" color="textDim">
          {item.data}
        </AppText>
        <AppText variant="itemTitle" style={styles.titulo}>
          {item.titulo}
        </AppText>
        <AppText variant="caption" style={styles.detalhe}>
          {item.detalhe}
        </AppText>
      </View>
      <View style={styles.direita}>
        <AppText variant="brand" style={styles.valor}>
          {item.valor}
        </AppText>
        <AppText variant="label" color="textDim" style={styles.status}>
          {item.status}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  foto: {
    width: 64,
    height: 64,
    borderRadius: Radius.sm,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    marginTop: 2,
  },
  detalhe: {
    marginTop: 2,
  },
  direita: {
    alignItems: 'flex-end',
  },
  valor: {
    letterSpacing: tracking(0.04, 20),
  },
  status: {
    fontSize: 9,
    lineHeight: 12,
  },
});
