import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNav } from '../components/layout/bottom-nav';
import { AgendarScreen } from '../screens/agendar-screen';
import { GaleriaScreen } from '../screens/galeria-screen';
import { InicioScreen } from '../screens/inicio-screen';

const Tab = createBottomTabNavigator();

// Tabs do app, com a barra inferior do protótipo no lugar da tabBar padrão.
// Novidades e Meu Espaço ainda não existem: os itens da barra passam a navegar
// assim que as telas forem registradas aqui com o mesmo nome de NAV_ITEMS.
export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Galeria" component={GaleriaScreen} />
      <Tab.Screen name="Agendar" component={AgendarScreen} />
    </Tab.Navigator>
  );
}
