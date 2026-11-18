import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/screen';
import { ScreenHeader } from '../components/layout/screen-header';
import { NovidadeCard } from '../components/novidades/novidade-card';
import { Spacing } from '../constants/theme';
import { useNovidades } from '../hooks/use-novidades';

// Tela de novidades: cards com agenda, promoções e projetos do estúdio.
export function NovidadesScreen({ navigation }) {
  const { novidades } = useNovidades();

  // Navega só se a tela já estiver registrada no navigator (mesma regra da BottomNav).
  function irPara(rota) {
    if (navigation.getState().routeNames.includes(rota)) navigation.navigate(rota);
  }

  return (
    <View style={styles.flex}>
      <Screen withBottomNav>
        <ScreenHeader eyebrow="Do estúdio" title="Novidades" style={styles.cabecalho} />
        <View style={styles.lista}>
          {novidades.map((novidade) => (
            <NovidadeCard
              key={novidade.id}
              novidade={novidade}
              onAcao={(item) => irPara(item.acao.rota)}
            />
          ))}
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cabecalho: {
    marginBottom: Spacing.lg,
  },
  lista: {
    gap: 14,
  },
});
