import { Alert } from 'react-native';

import { NAV_ITEMS } from '../components/layout/bottom-nav';

// Nomes das telas que ficam nas tabs (Inicio, Galeria, Agendar, Novidades, MeuEspaco).
const ROTAS_DAS_TABS = NAV_ITEMS.map((item) => item.route);

// Procura a rota no navigator atual e nos navigators acima dele (tabs → stack).
function rotaExiste(navigation, rota) {
  let atual = navigation;
  while (atual) {
    if (atual.getState().routeNames.includes(rota)) return true;
    atual = atual.getParent();
  }
  return false;
}

export function navegarPara(navigation, rota, params) {
  if (rotaExiste(navigation, rota)) {
    navigation.navigate(rota, params);
    return;
  }
  if (ROTAS_DAS_TABS.includes(rota) && rotaExiste(navigation, 'Tabs')) {
    navigation.navigate('Tabs', { screen: rota, params });
    return;
  }
  Alert.alert('Em breve', `A tela "${rota}" ainda está em desenvolvimento.`);
}
