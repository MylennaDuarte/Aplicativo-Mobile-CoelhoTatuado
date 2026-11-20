import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/screen';
import { ScreenHeader } from '../components/layout/screen-header';
import { FormularioOrcamento } from '../components/orcamento/formulario-orcamento';
import { PedidoRecebido } from '../components/orcamento/pedido-recebido';
import { AppText } from '../components/ui/text';
import { Spacing } from '../constants/theme';
import { useOrcamento } from '../hooks/use-orcamento';
import { navegarPara } from '../navigation/navegar';

export function OrcamentoScreen({ navigation, route }) {
  const orcamento = useOrcamento(route.params);
  const { textos } = orcamento;

  return (
    <View style={styles.flex}>
      {}
      <Screen
        key={orcamento.enviado ? 'recebido' : 'formulario'}
        safeTop={false}
        contentStyle={styles.conteudo}>
        {orcamento.enviado ? (
          <PedidoRecebido
            textos={textos.recebido}
            codigo={orcamento.enviado.codigo}
            resumo={orcamento.resumo}
            onAcompanhar={() => navegarPara(navigation, 'MeuEspaco')}
          />
        ) : (
          <>
            <ScreenHeader eyebrow={textos.eyebrow} title={textos.titulo} />
            <AppText variant="small" style={styles.introducao}>
              {textos.introducao}
            </AppText>
            <FormularioOrcamento orcamento={orcamento} />
          </>
        )}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  conteudo: {
    paddingTop: Spacing.sm,
  },
  introducao: {
    marginTop: 8,
    marginBottom: 22,
  },
});
