import { StyleSheet, View } from 'react-native';
import { Radius, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Icon } from '../ui/icon';
import { AppText } from '../ui/text';

export function Biosseguranca({ titulo, itens }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.caixa, { borderColor: colors.text, backgroundColor: colors.surface }]}>
      <View style={[styles.legenda, { backgroundColor: colors.background }]}>
        <AppText variant="brand" style={styles.legendaTexto}>
          {titulo}
        </AppText>
      </View>
      <View style={styles.lista}>
        {itens.map((item) => (
          <View key={item} style={styles.item}>
            <View style={[styles.marca, { borderColor: colors.text }]}>
              <Icon name="check" size={12} strokeWidth={2} />
            </View>
            <AppText variant="small" color="text" style={styles.texto}>
              {item}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  legenda: {
    position: 'absolute',
    top: -10,
    left: 14,
    paddingHorizontal: 8,
  },
  legendaTexto: {
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: tracking(0.14, 18),
  },
  lista: {
    gap: 10,
    marginTop: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  marca: {
    width: 18,
    height: 18,
    marginTop: 1,
    borderWidth: 1,
    borderRadius: Radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    flex: 1,
  },
});
