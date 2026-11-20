import { StyleSheet, View } from 'react-native';

import { Fonts, tracking } from '../../constants/theme';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AppText } from '../ui/text';
import { GrupoChips } from './grupo-chips';
import { Referencias } from './referencias';

// Formulário do orçamento: estilo, região, medidas, ideia, referências, data, contato e envio.
// Recebe o objeto do hook useOrcamento inteiro para não repassar campo a campo.
export function FormularioOrcamento({ orcamento }) {
  const {
    estilos,
    regioes,
    dados,
    atualizar,
    referencias,
    alternarReferencia,
    valido,
    enviando,
    enviar,
    prazo,
  } = orcamento;

  return (
    <View style={styles.campos}>
      <GrupoChips
        rotulo="Estilo"
        opcoes={estilos}
        selecionada={dados.estilo}
        onSelecionar={(valor) => atualizar('estilo', valor)}
      />
      <GrupoChips
        rotulo="Região do corpo"
        opcoes={regioes}
        selecionada={dados.regiao}
        onSelecionar={(valor) => atualizar('regiao', valor)}
      />

      <View style={styles.medidas}>
        <View style={styles.medida}>
          <Input
            label="Largura (cm)"
            placeholder="0"
            value={dados.largura}
            onChangeText={(valor) => atualizar('largura', valor)}
            keyboardType="number-pad"
            style={styles.numero}
          />
        </View>
        <View style={styles.medida}>
          <Input
            label="Altura (cm)"
            placeholder="0"
            value={dados.altura}
            onChangeText={(valor) => atualizar('altura', valor)}
            keyboardType="number-pad"
            style={styles.numero}
          />
        </View>
      </View>

      <Input
        label="Descreva a ideia"
        placeholder="Conte a história, elementos, sensação que quer passar..."
        value={dados.ideia}
        onChangeText={(valor) => atualizar('ideia', valor)}
        multiline
        numberOfLines={4}
      />

      <Referencias marcadas={referencias} onAlternar={alternarReferencia} />

      <Input
        label="Preferência de data"
        placeholder="Ex.: fins de semana de dezembro"
        value={dados.preferenciaData}
        onChangeText={(valor) => atualizar('preferenciaData', valor)}
      />
      <Input
        label="Seu WhatsApp"
        placeholder="(00) 00000-0000"
        value={dados.whatsapp}
        onChangeText={(valor) => atualizar('whatsapp', valor)}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />
      <Input
        label="Observações adicionais"
        placeholder="Cobertura de cicatriz, primeira tattoo, etc."
        value={dados.observacoes}
        onChangeText={(valor) => atualizar('observacoes', valor)}
        multiline
        numberOfLines={2}
        style={styles.observacoes}
      />

      <View style={styles.envio}>
        <Button title="Enviar solicitação" onPress={enviar} disabled={!valido} loading={enviando} />
        <AppText variant="caption" color="textDim" style={styles.prazo}>
          {prazo}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  campos: {
    gap: 20,
  },
  medidas: {
    flexDirection: 'row',
    gap: 10,
  },
  medida: {
    flex: 1,
  },
  // Medidas em Bebas Neue, como no protótipo.
  numero: {
    fontFamily: Fonts.display,
    fontSize: 18,
    letterSpacing: tracking(0.06, 18),
  },
  observacoes: {
    minHeight: 72,
  },
  envio: {
    marginTop: 2,
  },
  prazo: {
    textAlign: 'center',
    marginTop: 10,
  },
});
