import { StyleSheet, View } from 'react-native';
import { Radius, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { agrupar } from '../../utils/array';
import { AppText } from '../ui/text';


export function FatosEstudio({ fatos }) {
  const { colors } = useTheme();

  return (
    <View style={styles.grade}>
      {agrupar(fatos, 2).map((linha, indice) => (
        <View key={indice} style={styles.linha}>
          {linha.map((fato) => (
            <View key={fato.rotulo} style={[styles.fato, { borderColor: colors.border }]}>
              <AppText variant="number" color="text" style={styles.numero}>
                {fato.numero}
              </AppText>
              <AppText variant="label" style={styles.rotulo}>
                {fato.rotulo}
              </AppText>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grade: {
    gap: 10,
    marginVertical: 24,
  },
  linha: {
    flexDirection: 'row',
    gap: 10,
  },
  fato: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: 14,
  },
  numero: {
    fontSize: 34,
    lineHeight: 34,
  },
  rotulo: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: tracking(0.14, 11),
  },
});
