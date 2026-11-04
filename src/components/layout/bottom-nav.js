import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Radius } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Icon } from '../ui/icon';
import { AppText } from '../ui/text';

// Itens da barra. `route` é o nome da tela no Tab.Navigator (src/navigation/tab-navigator.js).
export const NAV_ITEMS = [
  { route: 'Inicio', label: 'Início', icon: 'inicio' },
  { route: 'Galeria', label: 'Galeria', icon: 'galeria' },
  { route: 'Agendar', label: 'Agendar', icon: 'agendar', destaque: true },
  { route: 'Novidades', label: 'Novidades', icon: 'novidades' },
  { route: 'MeuEspaco', label: 'Meu Espaço', icon: 'meuEspaco' },
];

// Barra de navegação inferior do protótipo, usada como `tabBar` do Tab.Navigator.
// Recebe `state` e `navigation` do React Navigation. Fica posicionada de forma
// absoluta no rodapé; as telas reservam o espaço com <Screen withBottomNav>.
// Itens cuja tela ainda não foi registrada no navigator não fazem nada ao toque.
export function BottomNav({ state, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const rotaAtiva = state.routes[state.index].name;
  const existe = (route) => state.routes.some((r) => r.name === route);

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: 'rgba(10,10,10,0.92)',
          borderTopColor: colors.border,
          paddingBottom: 10 + insets.bottom,
        },
      ]}>
      {NAV_ITEMS.map((item) => {
        const selecionado = item.route === rotaAtiva;
        const cor = selecionado ? colors.text : colors.textDim;

        return (
          <Pressable
            key={item.route}
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionado }}
            accessibilityLabel={item.label}
            onPress={() => {
              if (existe(item.route)) navigation.navigate(item.route);
            }}
            style={styles.item}>
            {item.destaque ? (
              <View style={[styles.anel, { backgroundColor: colors.background }]}>
                <View style={[styles.destaque, { backgroundColor: colors.primary }]}>
                  <Icon name={item.icon} size={22} color={colors.onPrimary} strokeWidth={1.8} />
                </View>
              </View>
            ) : (
              <Icon name={item.icon} size={22} color={cor} />
            )}
            <AppText
              variant="navLabel"
              style={[{ color: cor }, selecionado && styles.labelAtivo]}
              numberOfLines={1}>
              {item.label}
            </AppText>
            {selecionado && !item.destaque ? (
              <View style={[styles.marcador, { backgroundColor: colors.text }]} />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 8,
    paddingHorizontal: 6,
    borderTopWidth: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
  },
  anel: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
  },
  destaque: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelAtivo: {
    fontFamily: Fonts.sansBold,
  },
  marcador: {
    position: 'absolute',
    top: -8,
    width: 16,
    height: 2,
  },
});
