import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/use-theme';
import { AppText } from '../ui/text';

// Ficha técnica do trabalho: região, tamanho e sessão em três colunas separadas por linhas.
export function FichaTrabalho({ trabalho }) {
  const { colors } = useTheme();
  const itens = [
    { rotulo: 'Região', valor: trabalho.regiao },
    { rotulo: 'Tamanho', valor: trabalho.tamanho },
    { rotulo: 'Sessão', valor: trabalho.sessao },
  ];

  return (
    <View style={[styles.linha, { borderColor: colors.border }]}>
      {itens.map((item, indice) => (
        <View
          key={item.rotulo}
          style={[
            styles.celula,
            indice > 0 && styles.celulaInterna,
            indice < itens.length - 1 && { borderRightWidth: 1, borderRightColor: colors.border },
          ]}>
          <AppText variant="label" color="textDim">
            {item.rotulo}
          </AppText>
          <AppText variant="bodyStrong" style={styles.valor}>
            {item.valor || '—'}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  celula: {
    flex: 1,
    paddingVertical: 12,
  },
  celulaInterna: {
    paddingLeft: 12,
  },
  valor: {
    marginTop: 3,
  },
});
