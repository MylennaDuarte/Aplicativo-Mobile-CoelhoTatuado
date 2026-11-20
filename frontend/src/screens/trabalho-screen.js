import { StyleSheet, View } from 'react-native';

import { Capa } from '../components/layout/capa';
import { Screen } from '../components/layout/screen';
import { FichaTrabalho } from '../components/trabalho/ficha-trabalho';
import { Button } from '../components/ui/button';
import { AppText } from '../components/ui/text';
import { AppConfig } from '../constants/config';
import { Spacing, tracking } from '../constants/theme';
import { useTrabalho } from '../hooks/use-trabalho';
import { navegarPara } from '../navigation/navegar';

const ALTURA_CAPA = 480;


export function TrabalhoScreen({ navigation, route }) {
  const { trabalho } = useTrabalho(route.params?.id);

  // "Quero algo parecido": abre o orçamento já com estilo, região e ideia preenchidos.
  function pedirParecido() {
    navegarPara(navigation, 'Orcamento', {
      estilo: trabalho.estilo,
      regiao: trabalho.regiao,
      ideia: `Algo na linha de "${trabalho.titulo}", adaptado para mim.`,
    });
  }

  if (!trabalho) {
    return (
      <Screen>
        <AppText color="textMuted" style={styles.vazio}>
          Trabalho não encontrado.
        </AppText>
      </Screen>
    );
  }

  return (
    <View style={styles.flex}>
      <Screen padded={false} safeTop={false}>
        <View>
          <Capa altura={ALTURA_CAPA} degrade={false} />
          <AppText variant="label" color="textSecondary" style={styles.arroba}>
            @{AppConfig.instagram}
          </AppText>
        </View>

        <View style={styles.conteudo}>
          <AppText variant="label">{trabalho.estilo}</AppText>
          <AppText variant="heading" style={styles.titulo}>
            {trabalho.titulo}
          </AppText>
          <AppText color="textSecondary" style={styles.descricao}>
            {trabalho.descricao}
          </AppText>
          <FichaTrabalho trabalho={trabalho} />
          <Button title="Quero algo parecido" onPress={pedirParecido} style={styles.botao} />
          <AppText variant="caption" color="textDim" style={styles.ajuda}>
            Abre o orçamento com estilo e região preenchidos
          </AppText>
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  // Arroba na vertical, na borda direita da foto, como no protótipo.
  arroba: {
    position: 'absolute',
    top: 96,
    right: -44,
    transform: [{ rotate: '90deg' }],
    letterSpacing: tracking(0.3, 10),
  },
  conteudo: {
    padding: Spacing.lg,
  },
  titulo: {
    fontSize: 40,
    lineHeight: 40,
    marginTop: 4,
    marginBottom: 12,
  },
  descricao: {
    marginBottom: 18,
  },
  botao: {
    marginTop: 20,
  },
  ajuda: {
    textAlign: 'center',
    marginTop: 10,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
  },
});
