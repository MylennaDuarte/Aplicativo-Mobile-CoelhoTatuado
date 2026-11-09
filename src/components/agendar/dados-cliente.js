import { StyleSheet, View } from 'react-native';

import { Input } from '../ui/input';
import { AcoesPasso } from './acoes-passo';

// Etapa 3: dados de contato do cliente. Nome e WhatsApp são obrigatórios.
export function DadosCliente({ dados, onAlterar, podeRevisar, onVoltar, onRevisar }) {
  return (
    <View>
      <View style={styles.campos}>
        <Input
          label="Nome completo"
          placeholder="Como devemos te chamar"
          value={dados.nome}
          onChangeText={(valor) => onAlterar('nome', valor)}
          autoCapitalize="words"
          textContentType="name"
        />
        <Input
          label="WhatsApp"
          placeholder="(00) 00000-0000"
          value={dados.whatsapp}
          onChangeText={(valor) => onAlterar('whatsapp', valor)}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
        <Input
          label="Instagram (opcional)"
          placeholder="@"
          value={dados.instagram}
          onChangeText={(valor) => onAlterar('instagram', valor)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="Observações"
          placeholder="Alergias, medicamentos, referência do projeto, melhor horário para contato..."
          value={dados.observacoes}
          onChangeText={(valor) => onAlterar('observacoes', valor)}
          multiline
          numberOfLines={4}
        />
      </View>

      <AcoesPasso
        onVoltar={onVoltar}
        onAvancar={onRevisar}
        rotuloAvancar="Revisar"
        avancarDesabilitado={!podeRevisar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  campos: {
    gap: 14,
  },
});
