import { StyleSheet, View } from 'react-native';

import { Radius, Spacing, tracking } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { Tag } from '../ui/tag';
import { AppText } from '../ui/text';

// Card de uma novidade: imagem com tag e data, título, descrição e botão de ação.
export function NovidadeCard({ novidade, onAcao }) {
  const { colors } = useTheme();

  return (
    <Card semPadding>
      <View style={{ height: novidade.alturaImagem }}>
        <ImagePlaceholder style={StyleSheet.absoluteFill} />
        <Tag
          label={novidade.tag}
          tone={novidade.destaque ? 'solid' : 'overlay'}
          forte
          style={styles.tag}
        />
        <View style={[styles.data, { backgroundColor: colors.overlay }]}>
          <AppText variant="caption" color="textSecondary" style={styles.dataTexto}>
            {novidade.data}
          </AppText>
        </View>
      </View>
      <View style={styles.corpo}>
        <AppText variant="subtitle">{novidade.titulo}</AppText>
        <AppText variant="small" style={styles.descricao}>
          {novidade.descricao}
        </AppText>
        <Button
          title={novidade.acao.rotulo}
          variant="outline"
          size="sm"
          onPress={() => onAcao(novidade)}
          style={styles.acao}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  tag: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  data: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: Radius.xs,
  },
  dataTexto: {
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: tracking(0.14, 10),
  },
  corpo: {
    padding: Spacing.md,
  },
  descricao: {
    marginTop: 6,
    marginBottom: 14,
  },
  acao: {
    alignSelf: 'flex-start',
  },
});
