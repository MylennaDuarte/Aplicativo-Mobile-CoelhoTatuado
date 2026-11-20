import { StyleSheet, View } from 'react-native';
import { Radius } from '../../constants/theme';
import { Tag } from '../ui/tag';

export function Especialidades({ itens }) {
  return (
    <View style={styles.linha}>
      {itens.map((item) => (
        <Tag key={item} label={item} tone="overlay" style={styles.pilula} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  pilula: {
    borderRadius: Radius.full,
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
});
