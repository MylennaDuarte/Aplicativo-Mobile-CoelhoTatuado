import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Card } from '../ui/card';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';
import { AcoesPasso } from './acoes-passo';
import { ResumoLinhas } from './resumo-linhas';

// Etapa 4: revisão da solicitação antes de enviar.
export function Revisao({ servicoNome, linhas, aviso, onEditar, onConfirmar }) {
  const { colors } = useTheme();

  return (
    <View>
      <Card semPadding>
        <View style={[styles.cabecalho, { borderBottomColor: colors.border }]}>
          {/* Mascote do estúdio virá do logo vetorial; até lá, placeholder. */}
          <ImagePlaceholder
            label=""
            style={[styles.mascote, { borderColor: colors.borderStrong }]}
          />
          <View>
            <AppText variant="label">Solicitação</AppText>
            <AppText variant="subtitle">{servicoNome}</AppText>
          </View>
        </View>
        <ResumoLinhas linhas={linhas} />
      </Card>

      <View style={[styles.aviso, { borderColor: colors.border }]}>
        <AppText variant="caption">{aviso}</AppText>
      </View>

      <AcoesPasso
        onVoltar={onEditar}
        rotuloVoltar="Editar"
        onAvancar={onConfirmar}
        rotuloAvancar="Confirmar solicitação"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 18,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
  },
  mascote: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  aviso: {
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
});
