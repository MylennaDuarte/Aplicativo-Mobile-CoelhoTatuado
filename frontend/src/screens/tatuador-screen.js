import { StyleSheet, View } from 'react-native';
import { Capa } from '../components/layout/capa';
import { Screen } from '../components/layout/screen';
import { DestaquesTatuador } from '../components/tatuador/destaques-tatuador';
import { Especialidades } from '../components/tatuador/especialidades';
import { RedesSociais } from '../components/tatuador/redes-sociais';
import { Trajetoria } from '../components/tatuador/trajetoria';
import { Button } from '../components/ui/button';
import { AppText } from '../components/ui/text';
import { Spacing } from '../constants/theme';
import { useTatuador } from '../hooks/use-tatuador';
import { navegarPara } from '../navigation/navegar';

const ALTURA_CAPA = 440;
export function TatuadorScreen({ navigation }) {
  const { tatuador, destaques, abrirRede } = useTatuador();

  return (
    <View style={styles.flex}>
      <Screen padded={false} safeTop={false}>
        <Capa
          altura={ALTURA_CAPA}
          imagem={tatuador.imagemUrl}
          eyebrow={tatuador.papel}
          titulo={tatuador.nome}
          tamanhoTitulo={72}>
          <Especialidades itens={tatuador.especialidades} />
        </Capa>

        <View style={styles.conteudo}>
          <AppText style={styles.bio}>{tatuador.bio}</AppText>
          <RedesSociais redes={tatuador.redes} onAbrir={abrirRede} />
          <Trajetoria itens={tatuador.trajetoria} />
          <DestaquesTatuador
            trabalhos={destaques}
            onAbrir={(trabalho) => navegarPara(navigation, 'Trabalho', { id: trabalho.id })}
            onVerGaleria={() => navegarPara(navigation, 'Galeria')}
          />
          <Button
            title={tatuador.chamada}
            onPress={() => navegarPara(navigation, 'Orcamento')}
            style={styles.botao}
          />
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  conteudo: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  bio: {
    fontSize: 15,
    lineHeight: 24,
  },
  botao: {
    marginTop: 24,
  },
});
