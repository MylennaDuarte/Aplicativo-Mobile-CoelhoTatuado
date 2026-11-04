import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '../hooks/use-theme';
import { TabNavigator } from './tab-navigator';

const Stack = createNativeStackNavigator();

// Pilha principal. As tabs ficam na base; telas de detalhe ou modais
// entram aqui como <Stack.Screen> e abrem por cima das tabs.
export function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
