import { StyleSheet, View } from 'react-native';

import { Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tag } from '../ui/tag';
import { AppText } from '../ui/text';

// Aparência da etiqueta de status de um orçamento.
const TOM_POR_STATUS = { 'Em análise': 'muted', Respondido: 'outline', Aprovado: 'solid' };

// Card de um orçamento: código, título, status, fases, valor e ações.
// etapas: rótulos das fases; orcamento.etapa diz quantas já ocorreram.
export function OrcamentoCard({ orcamento, etapas, onReservar }) {
  const { colors } = useTheme();
  const respondido = orcamento.etapa >= 2;

  return (
    <Card>
      <View style={styles.topo}>
        <View style={styles.textos}>
          <AppText variant="label" color="textDim">
            {orcamento.codigo}
          </AppText>
          <AppText variant="itemTitle" style={styles.titulo}>
            {orcamento.titulo}
          </AppText>
          <AppText variant="caption" style={styles.resumo}>
            {orcamento.resumo}
          </AppText>
        </View>
        <Tag label={orcamento.status} tone={TOM_POR_STATUS[orcamento.status] ?? 'muted'} />
      </View>

      <View style={styles.etapas}>
        {etapas.map((rotulo, indice) => {
          const concluida = indice < orcamento.etapa;

          return (
            <View key={rotulo} style={styles.etapa}>
              <View
                style={[
                  styles.barra,
                  { backgroundColor: concluida ? colors.text : colors.border },
                ]}
              />
              <AppText
                variant="label"
                color={concluida ? 'text' : 'textFaint'}
                style={styles.etapaRotulo}>
                {rotulo}
              </AppText>
            </View>
          );
        })}
      </View>

      <View style={[styles.valor, { borderTopColor: colors.divider }]}>
        <AppText variant="caption">{respondido ? 'Valor proposto pelo Victor' : 'Valor'}</AppText>
        <AppText variant="subtitle" color={respondido ? 'text' : 'textFaint'}>
          {orcamento.valor}
        </AppText>
      </View>

      {orcamento.podeReservar ? (
        <Button
          title="Reservar sessão"
          size="sm"
          onPress={() => onReservar(orcamento)}
          style={styles.reservar}
        />
      ) : null}
      {orcamento.nota ? (
        <View style={[styles.nota, { borderLeftColor: colors.borderStrong }]}>
          <AppText variant="caption">{orcamento.nota}</AppText>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  topo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    marginTop: 2,
  },
  resumo: {
    marginTop: 2,
  },
  etapas: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 14,
    marginBottom: 12,
  },
  etapa: {
    flex: 1,
  },
  barra: {
    height: 2,
  },
  etapaRotulo: {
    marginTop: 5,
    fontSize: 9,
    lineHeight: 12,
  },
  valor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  reservar: {
    marginTop: 12,
  },
  nota: {
    marginTop: 12,
    paddingLeft: 10,
    borderLeftWidth: 1,
  },
});
