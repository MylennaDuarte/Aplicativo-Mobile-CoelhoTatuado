import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNav } from '../components/layout/bottom-nav';
import { AgendarScreen } from '../screens/agendar-screen';
import { GaleriaScreen } from '../screens/galeria-screen';
import { InicioScreen } from '../screens/inicio-screen';
import { MeuEspacoScreen } from '../screens/meu-espaco-screen';
import { NovidadesScreen } from '../screens/novidades-screen';

const Tab = createBottomTabNavigator();

// Tabs do app, com a barra inferior do protótipo no lugar da tabBar padrão.
// Os nomes das telas são os de NAV_ITEMS (bottom-nav.js): é por eles que a barra navega.
export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Galeria" component={GaleriaScreen} />
      <Tab.Screen name="Agendar" component={AgendarScreen} />
      <Tab.Screen name="Novidades" component={NovidadesScreen} />
      <Tab.Screen name="MeuEspaco" component={MeuEspacoScreen} />
    </Tab.Navigator>
  );
}
