import { StyleSheet, View } from 'react-native';

import { Confirmacao } from '../components/agendar/confirmacao';
import { DadosCliente } from '../components/agendar/dados-cliente';
import { DataHorario } from '../components/agendar/data-horario';
import { PassosHeader } from '../components/agendar/passos-header';
import { Revisao } from '../components/agendar/revisao';
import { TipoAtendimento } from '../components/agendar/tipo-atendimento';
import { Screen } from '../components/layout/screen';
import { useAgendamento } from '../hooks/use-agendamento';
import { navegarPara } from '../navigation/navegar';

// Tela de agendamento: quatro etapas (tipo → data e horário → dados → revisão) e a confirmação.
export function AgendarScreen({ navigation }) {
  const agendamento = useAgendamento();

  // Navegação centralizada (src/navigation/navegar.js): tabs e telas do stack.
  function irPara(rota) {
    navegarPara(navigation, rota);
  }

  function voltarAoInicio() {
    agendamento.reiniciar();
    navigation.navigate('Inicio');
  }

  function renderPasso() {
    switch (agendamento.passo) {
      case 1:
        return (
          <TipoAtendimento
            servicos={agendamento.servicos}
            selecionadoId={agendamento.servicoId}
            onSelecionar={agendamento.selecionarServico}
            onOrcamento={() => irPara('Orcamento')}
            onContinuar={agendamento.avancar}
          />
        );
      case 2:
        return (
          <DataHorario
            ano={agendamento.ano}
            mes={agendamento.mes}
            dias={agendamento.dias}
            horarios={agendamento.horarios}
            dataFormatada={agendamento.dataFormatada}
            onSelecionarDia={agendamento.selecionarDia}
            onSelecionarHorario={agendamento.selecionarHorario}
            onMesAnterior={agendamento.irMesAnterior}
            onProximoMes={agendamento.irProximoMes}
            podeContinuar={agendamento.podeAvancar}
            onVoltar={agendamento.voltar}
            onContinuar={agendamento.avancar}
          />
        );
      case 3:
        return (
          <DadosCliente
            dados={agendamento.dados}
            onAlterar={agendamento.atualizarDados}
            podeRevisar={agendamento.podeAvancar}
            onVoltar={agendamento.voltar}
            onRevisar={agendamento.avancar}
          />
        );
      case 4:
        return (
          <Revisao
            servicoNome={agendamento.servico ? agendamento.servico.nome : ''}
            linhas={agendamento.resumo}
            aviso={agendamento.avisoConfirmacao}
            onEditar={agendamento.voltar}
            onConfirmar={agendamento.confirmar}
          />
        );
      default:
        return (
          <Confirmacao
            conteudo={agendamento.enviado}
            codigo={agendamento.codigo}
            linhas={agendamento.resumo}
            onAcompanhar={() => irPara('MeuEspaco')}
            onVoltarInicio={voltarAoInicio}
          />
        );
    }
  }

  return (
    <View style={styles.flex}>
      {/* key no passo: remonta a rolagem e volta ao topo a cada etapa, como no protótipo. */}
      <Screen key={agendamento.passo} withBottomNav>
        {agendamento.concluido ? null : (
          <PassosHeader
            titulo={agendamento.tituloPasso}
            passo={agendamento.passo}
            total={agendamento.totalPassos}
          />
        )}
        {renderPasso()}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
