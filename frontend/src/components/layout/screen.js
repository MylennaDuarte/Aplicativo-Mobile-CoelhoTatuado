import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNavHeight, MaxContentWidth, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';

// Base de toda tela: fundo, safe area, rolagem e espaço para a barra inferior.
// - title/subtitle: título grande no topo (telas sem header nativo)
// - scroll: envolve o conteúdo em ScrollView (desligue quando a tela já usa FlatList)
// - padded: padding horizontal padrão (desligue em telas com seções de borda a borda)
// - safeTop: aplica a safe area no topo (desligue quando a tela desenha sob a status bar)
// - withBottomNav: reserva espaço embaixo para a barra de navegação inferior
export function Screen({
  children,
  title,
  subtitle,
  scroll = true,
  padded = true,
  safeTop = true,
  withBottomNav = false,
  contentStyle,
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: safeTop ? insets.top + Spacing.md : 0,
    paddingBottom: insets.bottom + (withBottomNav ? BottomNavHeight : 0) + Spacing.lg,
    paddingLeft: insets.left + (padded ? Spacing.lg : 0),
    paddingRight: insets.right + (padded ? Spacing.lg : 0),
  };

  const header =
    title || subtitle ? (
      <View style={[styles.header, !padded && styles.headerPadded]}>
        {title ? <AppText variant="heading">{title}</AppText> : null}
        {subtitle ? <AppText color="textMuted">{subtitle}</AppText> : null}
      </View>
    ) : null;

  if (!scroll) {
    return (
      <View style={[styles.flex, { backgroundColor: colors.background }, padding, contentStyle]}>
        {header}
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.flex, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, padding, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {header}
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  headerPadded: {
    paddingHorizontal: Spacing.lg,
  },
});
