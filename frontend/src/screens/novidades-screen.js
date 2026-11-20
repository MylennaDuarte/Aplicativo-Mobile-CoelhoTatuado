import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/screen';
import { ScreenHeader } from '../components/layout/screen-header';
import { NovidadeCard } from '../components/novidades/novidade-card';
import { Spacing } from '../constants/theme';
import { useNovidades } from '../hooks/use-novidades';
import { navegarPara } from '../navigation/navegar';

// Tela de novidades: cards com agenda, promoções e projetos do estúdio.
export function NovidadesScreen({ navigation }) {
  const { novidades } = useNovidades();

  // Navegação centralizada (src/navigation/navegar.js); `params` pré-preenche o orçamento.
  function irPara(rota, params) {
    navegarPara(navigation, rota, params);
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
              onAcao={(item) => irPara(item.acao.rota, item.acao.params)}
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
