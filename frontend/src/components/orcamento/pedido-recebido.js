import { StyleSheet, View } from 'react-native';

import { Radius } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { Tag } from '../ui/tag';
import { AppText } from '../ui/text';

export function PedidoRecebido({ textos, codigo, resumo, onAcompanhar }) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.centro}>
        {/* Selo com o coelho da marca */}
        <View style={[styles.selo, { borderColor: colors.text }]}>
          <ImagePlaceholder label="" style={StyleSheet.absoluteFill} />
          <AppText variant="brand">CT</AppText>
        </View>
        <AppText variant="heading" style={styles.titulo}>
          {textos.titulo}
        </AppText>
        <AppText color="textMuted" style={styles.descricao}>
          {textos.descricao}
        </AppText>
      </View>

      <Card style={styles.resumo}>
        <View style={styles.resumoTopo}>
          <View style={styles.resumoTextos}>
            {codigo ? (
              <AppText variant="label" color="textDim">
                {codigo}
              </AppText>
            ) : null}
            <AppText variant="cardTitle">{resumo.titulo}</AppText>
          </View>
          <Tag label={textos.status} tone="muted" />
        </View>
        <AppText variant="small" style={styles.resumoDetalhe}>
          {resumo.detalhe}
        </AppText>
      </Card>

      <Button title="Acompanhar status" onPress={onAcompanhar} style={styles.botao} />
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
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
    overflow: 'hidden',
  },
  titulo: {
    fontSize: 44,
    lineHeight: 44,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  descricao: {
    textAlign: 'center',
    maxWidth: 300,
  },
  resumo: {
    marginTop: 28,
  },
  resumoTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  resumoTextos: {
    flex: 1,
  },
  resumoDetalhe: {
    marginTop: 6,
  },
  botao: {
    marginTop: 20,
  },
});
