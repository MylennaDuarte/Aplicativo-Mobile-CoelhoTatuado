import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { AppText } from '../ui/text';
import { HistoricoItem } from './historico-item';

// Aba "Histórico": trabalhos já feitos e atalho para o guia de cuidados.
export function AbaHistorico({ historico, cuidados, onAbrirCuidados }) {
  const { colors } = useTheme();

  return (
    <View>
      {historico.length === 0 ? (
        <AppText color="textMuted" style={styles.vazio}>
          Nenhuma sessão realizada ainda.
        </AppText>
      ) : (
        <View>
          {historico.map((item) => (
            <HistoricoItem key={item.id} item={item} />
          ))}
        </View>
      )}
      <View style={[styles.cuidados, { borderColor: colors.border }]}>
        <View style={styles.cuidadosTextos}>
          <AppText variant="label" color="textDim">
            {cuidados.rotulo}
          </AppText>
          <AppText variant="bodyStrong" style={styles.cuidadosTitulo}>
            {cuidados.titulo}
          </AppText>
        </View>
        <Button title="Abrir" variant="outline" size="sm" onPress={onAbrirCuidados} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  cuidados: {
    marginTop: 18,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  cuidadosTextos: {
    flex: 1,
  },
  cuidadosTitulo: {
    marginTop: 2,
  },
});
