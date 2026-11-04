import { StyleSheet, View } from 'react-native';

import { Spacing } from '../../constants/theme';
import { AppText } from '../ui/text';
import { TextLink } from '../ui/text-link';

// Título de seção com link opcional à direita (ex.: "Ver galeria").
// action: { label, onPress }
export function SectionHeader({ title, action, style }) {
  return (
    <View style={[styles.row, style]}>
      <AppText variant="title">{title}</AppText>
      {action ? <TextLink label={action.label} onPress={action.onPress} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
});
