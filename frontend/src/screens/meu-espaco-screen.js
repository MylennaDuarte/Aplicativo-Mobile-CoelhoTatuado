import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/screen';
import { ScreenHeader } from '../components/layout/screen-header';
import { AbaHistorico } from '../components/meu-espaco/aba-historico';
import { AbaOrcamentos } from '../components/meu-espaco/aba-orcamentos';
import { AbaSessoes } from '../components/meu-espaco/aba-sessoes';
import { Abas } from '../components/meu-espaco/abas';
import { Identificacao } from '../components/meu-espaco/identificacao';
import { AppText } from '../components/ui/text';
import { TextLink } from '../components/ui/text-link';
import { useMeuEspaco } from '../hooks/use-meu-espaco';
import { navegarPara } from '../navigation/navegar';

export function MeuEspacoScreen({ navigation }) {
  const meuEspaco = useMeuEspaco();

  function irPara(rota) {
    navegarPara(navigation, rota);
  }

  function renderAba() {
    switch (meuEspaco.aba) {
      case 'orcamentos':
        return (
          <AbaOrcamentos
            orcamentos={meuEspaco.orcamentos}
            etapas={meuEspaco.etapasOrcamento}
            onReservar={() => irPara('Agendar')}
            onNovoOrcamento={() => irPara('Orcamento')}
          />
        );
      case 'historico':
        return (
          <AbaHistorico
            historico={meuEspaco.historico}
            cuidados={meuEspaco.cuidados}
            onAbrirCuidados={() => irPara('Novidades')}
          />
        );
      default:
        return (
          <AbaSessoes
            sessoes={meuEspaco.sessoes}
            mensagem={meuEspaco.mensagem}
            regras={meuEspaco.regras}
            onReagendar={meuEspaco.reagendar}
            onCancelar={meuEspaco.cancelar}
          />
        );
    }
  }

  return (
    <View style={styles.flex}>
      <Screen withBottomNav>
        <ScreenHeader
          eyebrow={`Olá, ${meuEspaco.cliente.nome}`}
          title="Meu Espaço"
          trailing={
            meuEspaco.identificado ? <TextLink label="Trocar" onPress={meuEspaco.sair} /> : null
          }
          style={styles.cabecalho}
        />
        {meuEspaco.identificado ? (
          <>
            <Abas abas={meuEspaco.abas} ativa={meuEspaco.aba} onSelecionar={meuEspaco.trocarAba} />
            {meuEspaco.erro ? (
              <AppText variant="caption" color="danger" style={styles.erro}>
                {meuEspaco.erro}
              </AppText>
            ) : null}
            {renderAba()}
          </>
        ) : (
          <Identificacao onIdentificar={meuEspaco.identificar} />
        )}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cabecalho: {
    marginBottom: 18,
  },
  erro: {
    marginBottom: 12,
  },
});
