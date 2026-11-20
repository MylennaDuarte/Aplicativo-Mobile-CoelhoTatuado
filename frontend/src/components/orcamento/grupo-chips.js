import { StyleSheet, View } from 'react-native';

import { Chip } from '../ui/chip';
import { AppText } from '../ui/text';

// Grupo de opções em cápsulas (estilo, região do corpo). Uma única seleção por grupo.
export function GrupoChips({ rotulo, opcoes, selecionada, onSelecionar }) {
  return (
    <View>
      <AppText variant="label" style={styles.rotulo}>
        {rotulo}
      </AppText>
      <View style={styles.lista}>
        {opcoes.map((opcao) => (
          <Chip
            key={opcao}
            label={opcao}
            ativo={opcao === selecionada}
            onPress={() => onSelecionar(opcao)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rotulo: {
    marginBottom: 8,
  },
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
