import { StyleSheet, View } from 'react-native';

import { FiltrosGaleria } from '../components/galeria/filtros-galeria';
import { MosaicoTrabalhos } from '../components/galeria/mosaico-trabalhos';
import { Screen } from '../components/layout/screen';
import { ScreenHeader } from '../components/layout/screen-header';
import { AppText } from '../components/ui/text';
import { Spacing } from '../constants/theme';
import { useGaleria } from '../hooks/use-galeria';
import { navegarPara } from '../navigation/navegar';

// Tela da galeria: portfólio em mosaico com filtro por estilo.
// Tocar em um trabalho abre a tela "Trabalho" (detalhe), registrada no root-navigator.
export function GaleriaScreen({ navigation }) {
  const { filtros, filtro, selecionarFiltro, trabalhos, total } = useGaleria();
  const contagem = `${total} ${total === 1 ? 'trabalho' : 'trabalhos'} · toque para ampliar`;

  function abrirTrabalho(trabalho) {
    navegarPara(navigation, 'Trabalho', { id: trabalho.id });
  }

  return (
    <View style={styles.flex}>
      <Screen padded={false} withBottomNav>
        <ScreenHeader eyebrow="Portfólio" title="Galeria" style={styles.cabecalho} />
        <FiltrosGaleria filtros={filtros} ativo={filtro} onSelecionar={selecionarFiltro} />
        <MosaicoTrabalhos trabalhos={trabalhos} onAbrir={abrirTrabalho} />
        <AppText variant="caption" color="textDim" style={styles.rodape}>
          {contagem}
        </AppText>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cabecalho: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  rodape: {
    textAlign: 'center',
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
});
