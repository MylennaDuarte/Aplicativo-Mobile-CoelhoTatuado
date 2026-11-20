import { StyleSheet, View } from 'react-native';

import { Biosseguranca } from '../components/estudio/biosseguranca';
import { FatosEstudio } from '../components/estudio/fatos-estudio';
import { FotosEstudio } from '../components/estudio/fotos-estudio';
import { Capa } from '../components/layout/capa';
import { Screen } from '../components/layout/screen';
import { Button } from '../components/ui/button';
import { AppText } from '../components/ui/text';
import { Spacing } from '../constants/theme';
import { useEstudio } from '../hooks/use-estudio';
import { navegarPara } from '../navigation/navegar';

const ALTURA_CAPA = 360;
export function EstudioScreen({ navigation }) {
  const { estudio } = useEstudio();

  return (
    <View style={styles.flex}>
      <Screen padded={false} safeTop={false}>
        <Capa altura={ALTURA_CAPA} eyebrow={estudio.eyebrow} titulo={estudio.titulo} />

        <View style={styles.conteudo}>
          <AppText style={styles.apresentacao}>{estudio.apresentacao}</AppText>
          <FatosEstudio fatos={estudio.fatos} />

          {estudio.secoes.map((secao) => (
            <View key={secao.titulo}>
              <AppText variant="title" style={styles.secaoTitulo}>
                {secao.titulo}
              </AppText>
              <AppText color="textSecondary" style={styles.secaoTexto}>
                {secao.texto}
              </AppText>
            </View>
          ))}

          <FotosEstudio fotos={estudio.fotos} />
          <Biosseguranca
            titulo={estudio.biosseguranca.titulo}
            itens={estudio.biosseguranca.itens}
          />
          <Button
            title={estudio.chamada}
            onPress={() => navegarPara(navigation, 'Agendar')}
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
    padding: Spacing.lg,
  },
  apresentacao: {
    fontSize: 16,
    lineHeight: 26,
  },
  secaoTitulo: {
    marginBottom: 10,
  },
  secaoTexto: {
    marginBottom: 20,
  },
  botao: {
    marginTop: 24,
  },
});
