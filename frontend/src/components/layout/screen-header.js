import { StyleSheet, View } from 'react-native';

import { AppText } from '../ui/text';

// Cabeçalho das telas internas: eyebrow pequeno + título grande (Galeria, Agendar, Novidades...).
// trailing: elemento alinhado à direita, na base do título (ex.: contador de etapas).
export function ScreenHeader({ eyebrow, title, trailing, style }) {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.textos}>
        {eyebrow ? (
          <AppText variant="eyebrow" color="textMuted">
            {eyebrow}
          </AppText>
        ) : null}
        <AppText variant="heading" style={styles.titulo}>
          {title}
        </AppText>
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    marginTop: 6,
  },
});
