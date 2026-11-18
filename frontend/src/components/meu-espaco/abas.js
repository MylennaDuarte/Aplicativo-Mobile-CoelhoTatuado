import { Pressable, StyleSheet, View } from 'react-native';

import { Fonts, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';

// Abas do Meu Espaço (Sessões, Orçamentos, Histórico), com linha embaixo da ativa.
export function Abas({ abas, ativa, onSelecionar }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      {abas.map((aba) => {
        const selecionada = aba.id === ativa;

        return (
          <Pressable
            key={aba.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionada }}
            onPress={() => onSelecionar(aba.id)}
            style={[styles.aba, { borderBottomColor: selecionada ? colors.text : 'transparent' }]}>
            <AppText variant="link" color={selecionada ? 'text' : 'textDim'} style={styles.rotulo}>
              {aba.rotulo}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 18,
  },
  aba: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  rotulo: {
    fontFamily: Fonts.sansSemiBold,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: tracking(0.14, 12),
  },
});
