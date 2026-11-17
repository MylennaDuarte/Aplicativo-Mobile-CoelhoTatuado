import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';

// Seção "Por que o Coelho": grade 2×2 separada por linhas de 1px.
export function Diferenciais({ itens }) {
  const { colors } = useTheme();
  const linhas = [];
  for (let i = 0; i < itens.length; i += 2) linhas.push(itens.slice(i, i + 2));

  return (
    <View style={styles.container}>
      <AppText variant="title" style={styles.titulo}>
        Por que o Coelho
      </AppText>
      <View style={[styles.grade, { backgroundColor: colors.border, borderColor: colors.border }]}>
        {linhas.map((linha, i) => (
          <View key={i} style={styles.linha}>
            {linha.map((item) => (
              <View key={item.numero} style={[styles.celula, { backgroundColor: colors.surface }]}>
                <AppText variant="number">{item.numero}</AppText>
                <AppText variant="smallBold" style={styles.celulaTitulo}>
                  {item.titulo}
                </AppText>
                <AppText variant="caption">{item.descricao}</AppText>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  titulo: {
    marginBottom: Spacing.md,
  },
  grade: {
    gap: 1,
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  linha: {
    flexDirection: 'row',
    gap: 1,
  },
  celula: {
    flex: 1,
    minHeight: 96,
    paddingVertical: 18,
    paddingHorizontal: Spacing.md,
  },
  celulaTitulo: {
    marginTop: 6,
    marginBottom: 4,
  },
});
