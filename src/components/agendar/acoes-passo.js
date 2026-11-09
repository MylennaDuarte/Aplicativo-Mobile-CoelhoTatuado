import { StyleSheet, View } from 'react-native';

import { Spacing } from '../../constants/theme';
import { Button } from '../ui/button';

// Rodapé das etapas: botão de voltar (contorno) e ação principal (bloco claro).
export function AcoesPasso({
  onVoltar,
  rotuloVoltar = 'Voltar',
  onAvancar,
  rotuloAvancar = 'Continuar',
  avancarDesabilitado = false,
}) {
  return (
    <View style={styles.row}>
      <Button title={rotuloVoltar} variant="outline" onPress={onVoltar} />
      <Button
        title={rotuloAvancar}
        onPress={onAvancar}
        disabled={avancarDesabilitado}
        style={styles.principal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: Spacing.lg,
  },
  principal: {
    flex: 1,
  },
});
