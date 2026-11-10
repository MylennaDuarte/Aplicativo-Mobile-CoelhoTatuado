import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { Button } from '../ui/button';
import { ImagePlaceholder } from '../ui/image-placeholder';
import { AppText } from '../ui/text';

// Capa da tela de início: marca, botão "O estúdio", chamada e ações principais.
export function Hero({ conteudo, onAgendar, onOrcamento, onEstudio }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Foto de capa virá do backend; até lá, placeholder. */}
      <ImagePlaceholder label="" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={['rgba(10,10,10,0.55)', 'rgba(10,10,10,0)', 'rgba(10,10,10,0.2)', colors.background]}
        locations={[0, 0.3, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.topo, { top: insets.top + 14 }]}>
        <View style={styles.marca}>
          {/* Substituir pelo logo vetorial do Coelho. */}
          <View style={[styles.logo, { borderColor: colors.lineOnImage }]}>
            <AppText variant="brand" style={styles.logoTexto}>
              CT
            </AppText>
          </View>
          <AppText variant="brand">{'Coelho\nTatuado'}</AppText>
        </View>
        <Button title="O estúdio" variant="pill" onPress={onEstudio} />
      </View>

      <View style={styles.rodape}>
        <View style={styles.eyebrow}>
          <View style={[styles.linha, { backgroundColor: colors.textSecondary }]} />
          <AppText variant="eyebrow">{conteudo.eyebrow}</AppText>
        </View>
        <AppText variant="display">{conteudo.titulo}</AppText>
        <AppText color="textSecondary" style={styles.descricao}>
          {conteudo.descricao}
        </AppText>
        <View style={styles.acoes}>
          <Button
            title="Agendar tatuagem"
            onPress={onAgendar}
            style={styles.acaoPrincipal}
            trailing={
              <AppText style={{ color: colors.onPrimary, fontSize: 16, lineHeight: 18 }}>→</AppText>
            }
          />
          <Button title="Orçamento" variant="secondary" onPress={onOrcamento} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 520,
    overflow: 'hidden',
  },
  topo: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    borderWidth: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTexto: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 1,
  },
  rodape: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: 24,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  linha: {
    width: 28,
    height: 1,
  },
  descricao: {
    marginTop: 14,
    marginBottom: 20,
    maxWidth: 320,
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
  },
  acaoPrincipal: {
    flex: 1,
  },
});
