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

// Tela de início. As ações (agendar, orçamento, galeria...) ganham
// navigation.navigate quando as respectivas telas forem criadas.
export function InicioScreen() {
  const { dados } = useInicio();

  return (
    <View style={styles.flex}>
      <Screen padded={false} safeTop={false} withBottomNav>
        <Hero conteudo={dados.hero} />
        <TrabalhosRecentes trabalhos={dados.trabalhosRecentes} />
        <NovidadeDestaque novidade={dados.novidade} />
        <Diferenciais itens={dados.diferenciais} />
        <TatuadorCard tatuador={dados.tatuador} />
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
