import { StyleSheet, View } from 'react-native';

import { Fonts, Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';
import { SessaoCard } from './sessao-card';

// Aba "Sessões": próximas sessões, retorno das ações e regras do estúdio.
export function AbaSessoes({ sessoes, mensagem, regras, onReagendar, onCancelar }) {
  const { colors } = useTheme();

  return (
    <View>
      {sessoes.length === 0 ? (
        <AppText color="textMuted" style={styles.vazio}>
          Nenhuma sessão marcada.
        </AppText>
      ) : (
        <View style={styles.lista}>
          {sessoes.map((sessao) => (
            <SessaoCard
              key={sessao.id}
              sessao={sessao}
              onReagendar={onReagendar}
              onCancelar={onCancelar}
            />
          ))}
        </View>
      )}

      {mensagem ? (
        <View style={[styles.mensagem, { borderColor: colors.text }]}>
          <AppText variant="caption" color="text">
            {mensagem}
          </AppText>
        </View>
      ) : null}

      <View style={[styles.regras, { borderColor: colors.borderStrong }]}>
        <AppText variant="caption">
          <AppText variant="caption" color="text" style={styles.regrasTitulo}>
            Regras do estúdio.{' '}
          </AppText>
          {regras}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  lista: {
    gap: 12,
  },
  mensagem: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  regras: {
    marginTop: Spacing.md,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
  },
  regrasTitulo: {
    fontFamily: Fonts.sansBold,
  },
});
