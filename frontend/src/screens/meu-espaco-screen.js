import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/screen';
import { ScreenHeader } from '../components/layout/screen-header';
import { AbaHistorico } from '../components/meu-espaco/aba-historico';
import { AbaOrcamentos } from '../components/meu-espaco/aba-orcamentos';
import { AbaSessoes } from '../components/meu-espaco/aba-sessoes';
import { Abas } from '../components/meu-espaco/abas';
import { useMeuEspaco } from '../hooks/use-meu-espaco';
import { navegarPara } from '../navigation/navegar';

// Tela Meu Espaço: sessões marcadas, orçamentos e histórico do cliente, em abas.
export function MeuEspacoScreen({ navigation }) {
  const meuEspaco = useMeuEspaco();

  // Navegação centralizada (src/navigation/navegar.js): tabs e telas do stack.
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
          style={styles.cabecalho}
        />
        <Abas abas={meuEspaco.abas} ativa={meuEspaco.aba} onSelecionar={meuEspaco.trocarAba} />
        {renderAba()}
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
});
