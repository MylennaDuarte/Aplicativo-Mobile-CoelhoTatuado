import { Pressable, StyleSheet, View } from 'react-native';

import { Radius, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';
import { OrcamentoCard } from './orcamento-card';

// Aba "Orçamentos": pedidos enviados e atalho para um novo orçamento.
export function AbaOrcamentos({ orcamentos, etapas, onReservar, onNovoOrcamento }) {
  const { colors } = useTheme();

  return (
    <View>
      {orcamentos.length === 0 ? (
        <AppText color="textMuted" style={styles.vazio}>
          Nenhum orçamento enviado.
        </AppText>
      ) : (
        <View style={styles.lista}>
          {orcamentos.map((orcamento) => (
            <OrcamentoCard
              key={orcamento.codigo}
              orcamento={orcamento}
              etapas={etapas}
              onReservar={onReservar}
            />
          ))}
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={onNovoOrcamento}
        style={({ pressed }) => [
          styles.novo,
          { borderColor: pressed ? colors.textMuted : colors.borderStrong },
        ]}>
        <AppText variant="link" color="text" style={styles.novoTexto}>
          + Novo orçamento
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  lista: {
    gap: 12,
  },
  novo: {
    marginTop: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
  },
  novoTexto: {
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: tracking(0.12, 12),
  },
});
