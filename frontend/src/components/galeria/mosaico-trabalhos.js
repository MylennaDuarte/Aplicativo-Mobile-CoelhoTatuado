import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';

const COLUNAS = 2;
const ESPACO = Spacing.sm;

// Coloca cada trabalho na coluna mais baixa até ali, formando o mosaico do protótipo.
function distribuirEmColunas(trabalhos) {
  const colunas = Array.from({ length: COLUNAS }, () => ({ itens: [], altura: 0 }));
  trabalhos.forEach((trabalho) => {
    const alvo = colunas.reduce((menor, coluna) =>
      coluna.altura < menor.altura ? coluna : menor
    );
    alvo.itens.push(trabalho);
    alvo.altura += trabalho.altura + ESPACO;
  });
  return colunas.map((coluna) => coluna.itens);
}

// Mosaico da galeria: duas colunas de cards com alturas variadas.
// onAbrir(trabalho) abre o detalhe quando essa tela existir.
export function MosaicoTrabalhos({ trabalhos, onAbrir }) {
  const { colors } = useTheme();
  const colunas = distribuirEmColunas(trabalhos);

  return (
    <View style={styles.mosaico}>
      {colunas.map((itens, indice) => (
        <View key={indice} style={styles.coluna}>
          {itens.map((trabalho) => (
            <Pressable
              key={trabalho.id}
              accessibilityRole="button"
              accessibilityLabel={`${trabalho.titulo}, ${trabalho.estilo}`}
              onPress={() => onAbrir && onAbrir(trabalho)}
              style={({ pressed }) => [
                styles.card,
                { height: trabalho.altura, backgroundColor: colors.surfaceElevated },
                pressed && styles.pressed,
              ]}>
              <ImagePlaceholder
                label={trabalho.titulo}
                uri={trabalho.imagemUrl}
                style={StyleSheet.absoluteFill}
              />
              <LinearGradient colors={['transparent', 'rgba(10,10,10,0.9)']} style={styles.legenda}>
                <AppText variant="label" color="textSecondary">
                  {trabalho.estilo}
                </AppText>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mosaico: {
    flexDirection: 'row',
    gap: ESPACO,
    paddingHorizontal: Spacing.lg,
  },
  coluna: {
    flex: 1,
    gap: ESPACO,
  },
  card: {
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.85,
  },
  legenda: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 22,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
