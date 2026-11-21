import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '../hooks/use-theme';
import { EstudioScreen } from '../screens/estudio-screen';
import { OrcamentoScreen } from '../screens/orcamento-screen';
import { TatuadorScreen } from '../screens/tatuador-screen';
import { TrabalhoScreen } from '../screens/trabalho-screen';
import { TabNavigator } from './tab-navigator';

const Stack = createNativeStackNavigator();

// Telas que começam com foto: o header fica transparente e só a seta de voltar aparece sobre ela.
const HEADER_SOBRE_FOTO = {
  title: '',
  headerTransparent: true,
  headerStyle: { backgroundColor: 'transparent' },
};
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
      <Stack.Screen name="Trabalho" component={TrabalhoScreen} options={HEADER_SOBRE_FOTO} />
      <Stack.Screen name="Estudio" component={EstudioScreen} options={HEADER_SOBRE_FOTO} />
      <Stack.Screen name="Tatuador" component={TatuadorScreen} options={HEADER_SOBRE_FOTO} />
      <Stack.Screen name="Orcamento" component={OrcamentoScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
