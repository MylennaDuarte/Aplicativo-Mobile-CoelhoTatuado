import { StyleSheet, View } from 'react-native';

import { Diferenciais } from '../components/inicio/diferenciais';
import { Hero } from '../components/inicio/hero';
import { NovidadeDestaque } from '../components/inicio/novidade-destaque';
import { TatuadorCard } from '../components/inicio/tatuador-card';
import { TrabalhosRecentes } from '../components/inicio/trabalhos-recentes';
import { Screen } from '../components/layout/screen';
import { AppText } from '../components/ui/text';
import { Spacing, tracking } from '../constants/theme';
import { useInicio } from '../hooks/use-inicio';
import { navegarPara } from '../navigation/navegar';

export function InicioScreen({ navigation }) {
  const { dados } = useInicio();

  // Navegação centralizada (src/navigation/navegar.js): tabs e telas do stack.
  function irPara(rota, params) {
    navegarPara(navigation, rota, params);
  }

  return (
    <View style={styles.flex}>
      <Screen padded={false} safeTop={false} withBottomNav>
        <Hero
          conteudo={dados.hero}
          onAgendar={() => irPara('Agendar')}
          onOrcamento={() => irPara('Orcamento')}
          onEstudio={() => irPara('Estudio')}
        />
        <TrabalhosRecentes
          trabalhos={dados.trabalhosRecentes}
          onVerGaleria={() => irPara('Galeria')}
          onAbrir={(trabalho) => irPara('Trabalho', { id: trabalho.id })}
        />
        <NovidadeDestaque novidade={dados.novidade} onVerNovidades={() => irPara('Novidades')} />
        <Diferenciais itens={dados.diferenciais} />
        <TatuadorCard tatuador={dados.tatuador} onPress={() => irPara('Tatuador')} />
        <AppText variant="label" color="textFaint" style={styles.rodape}>
          {dados.rodape}
        </AppText>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  rodape: {
    textAlign: 'center',
    letterSpacing: tracking(0.3, 10),
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 10,
  },
});
