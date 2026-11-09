import { Pressable, StyleSheet, View } from 'react-native';

import { Fonts, Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { AppText } from '../ui/text';

// Etapa 1: escolha do tipo de atendimento (sessão, retoque, cover-up).
export function TipoAtendimento({
  servicos,
  selecionadoId,
  onSelecionar,
  onOrcamento,
  onContinuar,
}) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.lista}>
        {servicos.map((servico) => {
          const ativo = servico.id === selecionadoId;

          return (
            <Pressable
              key={servico.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: ativo }}
              onPress={() => onSelecionar(servico.id)}
              style={[
                styles.opcao,
                {
                  backgroundColor: ativo ? colors.surfaceElevated : colors.surface,
                  borderColor: ativo ? colors.text : colors.border,
                },
              ]}>
              <View style={[styles.radio, { borderColor: colors.textMuted }]}>
                {ativo ? (
                  <View style={[styles.radioMarcado, { backgroundColor: colors.text }]} />
                ) : null}
              </View>
              <View style={styles.textos}>
                <AppText variant="itemTitle">{servico.nome}</AppText>
                <AppText variant="caption" style={styles.descricao}>
                  {servico.descricao}
                </AppText>
              </View>
              <AppText variant="caption">{servico.duracao}</AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.dica, { borderColor: colors.borderStrong }]}>
        <AppText variant="caption">
          Ainda não tem um projeto definido?{' '}
          <AppText variant="caption" color="text" style={styles.link} onPress={onOrcamento}>
            Solicite um orçamento
          </AppText>{' '}
          antes de reservar a sessão.
        </AppText>
      </View>

      <Button
        title="Continuar"
        disabled={!selecionadoId}
        onPress={onContinuar}
        style={styles.botao}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    gap: 10,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingVertical: 18,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioMarcado: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
  },
  textos: {
    flex: 1,
  },
  descricao: {
    marginTop: 3,
  },
  dica: {
    marginTop: Spacing.lg,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
  },
  link: {
    fontFamily: Fonts.sansSemiBold,
    textDecorationLine: 'underline',
  },
  botao: {
    marginTop: Spacing.lg,
  },
});
