import { Pressable, StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { agrupar } from '../../utils/array';
import { DIAS_SEMANA, MESES } from '../../utils/calendar';
import { Card } from '../ui/card';
import { Icon } from '../ui/icon';
import { AppText } from '../ui/text';

const DIAS_POR_SEMANA = 7;

// Calendário mensal do agendamento. `dias` vem do hook (useAgendamento), já em semanas
// completas, com as flags de cada dia: vazio, indisponivel, reservado, selecionado.
export function Calendario({ ano, mes, dias, onSelecionarDia, onMesAnterior, onProximoMes }) {
  const { colors } = useTheme();
  const semanas = agrupar(dias, DIAS_POR_SEMANA);

  return (
    <Card>
      <View style={styles.cabecalho}>
        <BotaoMes icone="chevronLeft" rotulo="Mês anterior" onPress={onMesAnterior} />
        <AppText variant="cardTitle">{`${MESES[mes]} ${ano}`}</AppText>
        <BotaoMes icone="chevronRight" rotulo="Próximo mês" onPress={onProximoMes} />
      </View>

      <View style={styles.semana}>
        {DIAS_SEMANA.map((inicial, indice) => (
          <AppText key={indice} variant="label" color="textDim" style={styles.diaSemana}>
            {inicial}
          </AppText>
        ))}
      </View>

      <View style={styles.grade}>
        {semanas.map((semana, indice) => (
          <View key={indice} style={styles.semana}>
            {semana.map((dia) =>
              dia.vazio ? (
                <View key={dia.chave} style={styles.celula} />
              ) : (
                <Pressable
                  key={dia.chave}
                  disabled={dia.indisponivel}
                  accessibilityRole="button"
                  accessibilityLabel={`Dia ${dia.numero}`}
                  accessibilityState={{ selected: dia.selecionado, disabled: dia.indisponivel }}
                  onPress={() => onSelecionarDia(dia.numero)}
                  style={[
                    styles.celula,
                    styles.dia,
                    {
                      borderColor: dia.selecionado
                        ? colors.text
                        : dia.indisponivel
                          ? 'transparent'
                          : colors.borderStrong,
                      backgroundColor: dia.selecionado
                        ? colors.primary
                        : dia.indisponivel
                          ? colors.surfaceElevated
                          : 'transparent',
                    },
                  ]}>
                  <AppText
                    variant="smallBold"
                    color={
                      dia.selecionado ? 'onPrimary' : dia.indisponivel ? 'borderStrong' : 'text'
                    }
                    style={dia.reservado && styles.riscado}>
                    {dia.numero}
                  </AppText>
                  {dia.reservado ? (
                    <View style={[styles.ponto, { backgroundColor: colors.borderStrong }]} />
                  ) : null}
                </Pressable>
              )
            )}
          </View>
        ))}
      </View>

      <View style={styles.legenda}>
        <ItemLegenda
          texto="Disponível"
          estilo={{ borderWidth: 1, borderColor: colors.textFaint }}
        />
        <ItemLegenda texto="Indisponível" estilo={{ backgroundColor: colors.divider }} />
        <ItemLegenda texto="Selecionado" estilo={{ backgroundColor: colors.primary }} />
      </View>
    </Card>
  );
}

function BotaoMes({ icone, rotulo, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.botaoMes,
        { borderColor: colors.border },
        pressed && styles.pressed,
      ]}>
      <Icon name={icone} size={18} />
    </Pressable>
  );
}

function ItemLegenda({ texto, estilo }) {
  return (
    <View style={styles.itemLegenda}>
      <View style={[styles.amostra, estilo]} />
      <AppText variant="caption" style={styles.textoLegenda}>
        {texto}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  botaoMes: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  semana: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  diaSemana: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 6,
  },
  grade: {
    gap: Spacing.xs,
  },
  celula: {
    flex: 1,
    aspectRatio: 1,
  },
  dia: {
    borderWidth: 1,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riscado: {
    textDecorationLine: 'line-through',
  },
  ponto: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: Radius.full,
  },
  legenda: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
  },
  itemLegenda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  amostra: {
    width: 8,
    height: 8,
    borderRadius: Radius.xs,
  },
  textoLegenda: {
    fontSize: 10,
    lineHeight: 13,
  },
});
