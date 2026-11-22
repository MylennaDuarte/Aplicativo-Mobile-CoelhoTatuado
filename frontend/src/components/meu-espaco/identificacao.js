import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AppText } from '../ui/text';

const MINIMO_DIGITOS = 10;

export function Identificacao({ onIdentificar }) {
  const { colors } = useTheme();
  const [whatsapp, setWhatsapp] = useState('');
  const valido = whatsapp.replace(/\D/g, '').length >= MINIMO_DIGITOS;

  return (
    <View style={[styles.caixa, { borderColor: colors.borderStrong, backgroundColor: colors.surface }]}>
      <AppText variant="subtitle">Suas sessões e orçamentos</AppText>
      <AppText variant="small" color="textMuted" style={styles.texto}>
        Informe o WhatsApp usado no agendamento ou no orçamento. Ele fica salvo só neste celular.
      </AppText>
      <Input
        label="WhatsApp"
        placeholder="(00) 00000-0000"
        value={whatsapp}
        onChangeText={setWhatsapp}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />
      <Button
        title="Ver meu espaço"
        onPress={() => onIdentificar(whatsapp)}
        disabled={!valido}
        style={styles.botao}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  texto: {
    marginTop: 6,
    marginBottom: 14,
  },
  botao: {
    marginTop: 14,
  },
});
