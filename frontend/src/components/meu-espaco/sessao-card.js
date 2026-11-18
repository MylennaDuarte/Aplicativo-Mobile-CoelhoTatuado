import { Pressable, StyleSheet, View } from 'react-native';

import { Fonts, Spacing, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Card } from '../ui/card';
import { Tag } from '../ui/tag';
import { AppText } from '../ui/text';

// Aparência da etiqueta de status de uma sessão.
const TOM_POR_STATUS = { Confirmado: 'outline', Aguardando: 'muted' };

// Card de uma sessão marcada: data em destaque, tipo, status, pagamento e ações.
export function SessaoCard({ sessao, onReagendar, onCancelar }) {
  const { colors } = useTheme();
  const confirmada = sessao.status === 'Confirmado';

  return (
    <Card semPadding style={confirmada && { borderColor: colors.text }}>
      <View style={styles.topo}>
        <View style={[styles.data, { backgroundColor: colors.primary }]}>
          <AppText variant="heading" color="onPrimary" style={styles.dia}>
            {sessao.dia}
          </AppText>
          <AppText variant="labelStrong" color="onPrimary">
            {sessao.mes}
          </AppText>
        </View>
        <View style={styles.corpo}>
          <View style={styles.linhaTitulo}>
            <AppText variant="itemTitle" style={styles.tipo}>
              {sessao.tipo}
            </AppText>
            <Tag label={sessao.status} tone={TOM_POR_STATUS[sessao.status] ?? 'muted'} />
          </View>
          <AppText variant="caption" style={styles.horario}>
            {`${sessao.horario} · ${sessao.duracao}`}
          </AppText>
          <View style={styles.pagamento}>
            <AppText variant="caption">{sessao.pagamentoRotulo}</AppText>
            <AppText variant="caption" color="text" style={styles.valorPagamento}>
              {sessao.pagamento}
            </AppText>
          </View>
        </View>
      </View>

      <View style={[styles.acoes, { borderTopColor: colors.divider }]}>
        <AcaoSessao rotulo="Reagendar" forte divisoria onPress={() => onReagendar(sessao)} />
        <AcaoSessao rotulo="Cancelar" onPress={() => onCancelar(sessao)} />
      </View>
    </Card>
  );
}

// Botão do rodapé do card (Reagendar / Cancelar).
function AcaoSessao({ rotulo, forte = false, divisoria = false, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.acao,
        divisoria && [styles.acaoDivisoria, { borderRightColor: colors.divider }],
        pressed && { backgroundColor: colors.surfaceElevated },
      ]}>
      <AppText
        variant="link"
        color={forte ? 'text' : 'textMuted'}
        style={[styles.acaoTexto, forte && styles.acaoTextoForte]}>
        {rotulo}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topo: {
    flexDirection: 'row',
  },
  data: {
    width: 84,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  dia: {
    fontSize: 40,
    lineHeight: 38,
  },
  corpo: {
    flex: 1,
    padding: 14,
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  tipo: {
    flex: 1,
  },
  horario: {
    marginTop: 4,
  },
  pagamento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  valorPagamento: {
    fontFamily: Fonts.sansSemiBold,
  },
  acoes: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  acao: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acaoDivisoria: {
    borderRightWidth: 1,
  },
  acaoTexto: {
    letterSpacing: tracking(0.12, 11),
  },
  acaoTextoForte: {
    fontFamily: Fonts.sansSemiBold,
  },
});
