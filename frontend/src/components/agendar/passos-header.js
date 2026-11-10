import { StyleSheet, View } from 'react-native';

import { Spacing, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { ScreenHeader } from '../layout/screen-header';
import { AppText } from '../ui/text';

// Cabeçalho das etapas do agendamento: título da etapa, contador "1 / 4" e barra de progresso.
export function PassosHeader({ titulo, passo, total }) {
  const { colors } = useTheme();

  return (
    <View>
      <ScreenHeader
        eyebrow="Reserva de sessão"
        title={titulo}
        trailing={
          <AppText variant="brand" color="textDim" style={styles.contador}>
            {`${passo} / ${total}`}
          </AppText>
        }
      />
      <View style={styles.progresso}>
        {Array.from({ length: total }, (_, indice) => (
          <View
            key={indice}
            style={[
              styles.segmento,
              { backgroundColor: indice < passo ? colors.text : colors.border },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contador: {
    letterSpacing: tracking(0.1, 20),
    marginBottom: 4,
  },
  progresso: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.md,
    marginBottom: 24,
  },
  segmento: {
    flex: 1,
    height: 2,
  },
});
