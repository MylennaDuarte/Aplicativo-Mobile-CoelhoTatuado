import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNav } from '../components/layout/bottom-nav';
import { InicioScreen } from '../screens/inicio-screen';

const Tab = createBottomTabNavigator();

// Tabs do app, com a barra inferior do protótipo no lugar da tabBar padrão.
// Só a tela de início existe por enquanto. Os outros itens da barra passam a
// navegar assim que as telas forem registradas aqui com o mesmo nome.
export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={InicioScreen} />
    </Tab.Navigator>
  );
}
