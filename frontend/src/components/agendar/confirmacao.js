import { Pressable, StyleSheet, View } from 'react-native';
import { Radius, Spacing, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Icon } from '../ui/icon';
import { AppText } from '../ui/text';
import { ResumoLinhas } from './resumo-linhas';

export function Confirmacao({ conteudo, codigo, linhas, onWhatsApp, onAcompanhar, onVoltarInicio }) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.topo}>
        <View style={[styles.selo, { borderColor: colors.text }]}>
          <View style={[styles.anelTracejado, { borderColor: colors.borderStrong }]} />
          <Icon name="check" size={40} strokeWidth={2.2} />
        </View>
        <AppText variant="heading" style={styles.titulo}>
          {conteudo.titulo}
        </AppText>
        <AppText color="textMuted" style={styles.descricao}>
          {conteudo.descricao}
        </AppText>
      </View>

      <Card semPadding style={styles.card}>
        <View style={[styles.carimbo, { borderColor: colors.borderStrong }]}>
          <AppText variant="brand" color="borderStrong" style={styles.carimboTexto}>
            {conteudo.status}
          </AppText>
        </View>
        <View style={[styles.codigo, { borderBottomColor: colors.divider }]}>
          <AppText variant="label">Código</AppText>
          <AppText variant="title" style={styles.codigoTexto}>
            {codigo}
          </AppText>
        </View>
        <ResumoLinhas linhas={linhas} />
      </Card>

      <Button title="Enviar pelo WhatsApp" onPress={onWhatsApp} style={styles.botao} />
      <Button
        title="Acompanhar em Meu Espaço"
        variant="outline"
        onPress={onAcompanhar}
        style={styles.botaoSecundario}
      />
      <Pressable
        accessibilityRole="button"
        onPress={onVoltarInicio}
        style={({ pressed }) => [styles.voltar, pressed && styles.pressed]}>
        <AppText variant="link">Voltar ao início</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topo: {
    alignItems: 'center',
    paddingTop: 30,
  },
  selo: {
    width: 96,
    height: 96,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anelTracejado: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  titulo: {
    marginTop: 24,
    marginBottom: Spacing.sm,
    fontSize: 44,
    lineHeight: 44,
    textAlign: 'center',
  },
  descricao: {
    maxWidth: 300,
    textAlign: 'center',
  },
  card: {
    marginTop: Spacing.xl,
  },
  carimbo: {
    position: 'absolute',
    top: 14,
    right: -14,
    zIndex: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: Radius.xs,
    transform: [{ rotate: '12deg' }],
  },
  carimboTexto: {
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: tracking(0.2, 18),
  },
  codigo: {
    paddingTop: 18,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
  },
  codigoTexto: {
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: tracking(0.08, 32),
  },
  botao: {
    marginTop: Spacing.lg,
  },
  botaoSecundario: {
    marginTop: 10,
  },
  voltar: {
    marginTop: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
