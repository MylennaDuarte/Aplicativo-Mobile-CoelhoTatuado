import { StyleSheet, View } from 'react-native';

import { Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';

// Lista "rótulo · valor" da solicitação, usada na revisão e na confirmação.
// linhas: [{ rotulo, valor }]
export function ResumoLinhas({ linhas }) {
  const { colors } = useTheme();

  return (
    <View>
      {linhas.map((linha) => (
        <View key={linha.rotulo} style={[styles.linha, { borderBottomColor: colors.divider }]}>
          <AppText variant="small">{linha.rotulo}</AppText>
          <AppText variant="smallBold" style={styles.valor}>
            {linha.valor}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingVertical: 13,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
  },
  valor: {
    flex: 1,
    textAlign: 'right',
  },
});
