import { ScrollView, StyleSheet } from 'react-native';

import { Spacing } from '../../constants/theme';
import { Chip } from '../ui/chip';

// Filtros por estilo da galeria, em rolagem horizontal.
export function FiltrosGaleria({ filtros, ativo, onSelecionar }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.lista}>
      {filtros.map((filtro) => (
        <Chip
          key={filtro}
          label={filtro}
          ativo={filtro === ativo}
          onPress={() => onSelecionar(filtro)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 18,
    gap: Spacing.sm,
  },
});
