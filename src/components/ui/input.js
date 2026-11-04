import { StyleSheet, TextInput, View } from 'react-native';

import { Fonts, Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './text';

// Campo de texto com rótulo e mensagem de erro opcionais.
export function Input({ label, erro, style, multiline, ...rest }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label ? <AppText variant="label">{label}</AppText> : null}
      <TextInput
        placeholderTextColor={colors.textSecondary}
        multiline={multiline}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderColor: erro ? colors.danger : colors.border,
          },
          multiline && styles.multiline,
          style,
        ]}
        {...rest}
      />
      {erro ? (
        <AppText variant="caption" color="danger">
          {erro}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  input: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
