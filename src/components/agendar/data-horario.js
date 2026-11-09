import { Pressable, StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { agrupar } from '../../utils/array';
import { AppText } from '../ui/text';
import { AcoesPasso } from './acoes-passo';
import { Calendario } from './calendario';

const HORARIOS_POR_LINHA = 3;

// Etapa 2: calendário e horários do dia escolhido.
export function DataHorario({
  ano,
  mes,
  dias,
  horarios,
  dataFormatada,
  onSelecionarDia,
  onSelecionarHorario,
  onMesAnterior,
  onProximoMes,
  podeContinuar,
  onVoltar,
  onContinuar,
}) {
  const { colors } = useTheme();
  const linhas = agrupar(horarios, HORARIOS_POR_LINHA);

  return (
    <View>
      <Calendario
        ano={ano}
        mes={mes}
        dias={dias}
        onSelecionarDia={onSelecionarDia}
        onMesAnterior={onMesAnterior}
        onProximoMes={onProximoMes}
      />

      {dataFormatada ? (
        <View>
          <AppText variant="eyebrow" color="textMuted" style={styles.titulo}>
            {`Horários · ${dataFormatada}`}
          </AppText>
          <View style={styles.horarios}>
            {linhas.map((linha, indice) => (
              <View key={indice} style={styles.linha}>
                {linha.map((item) => (
                  <Pressable
                    key={item.horario}
                    disabled={item.ocupado}
                    accessibilityRole="button"
                    accessibilityState={{ selected: item.selecionado, disabled: item.ocupado }}
                    onPress={() => onSelecionarHorario(item.horario)}
                    style={[
                      styles.horario,
                      {
                        borderColor: item.selecionado
                          ? colors.text
                          : item.ocupado
                            ? 'transparent'
                            : colors.borderStrong,
                        backgroundColor: item.selecionado
                          ? colors.primary
                          : item.ocupado
                            ? colors.surfaceElevated
                            : 'transparent',
                      },
                    ]}>
                    <AppText
                      variant="bodyStrong"
                      color={
                        item.selecionado ? 'onPrimary' : item.ocupado ? 'borderStrong' : 'text'
                      }
                      style={item.ocupado && styles.riscado}>
                      {item.horario}
                    </AppText>
                  </Pressable>
                ))}
                {Array.from({ length: HORARIOS_POR_LINHA - linha.length }, (_, vazio) => (
                  <View key={`vazio-${vazio}`} style={styles.horarioVazio} />
                ))}
              </View>
            ))}
          </View>
        </View>
      ) : null}

      <AcoesPasso
        onVoltar={onVoltar}
        onAvancar={onContinuar}
        avancarDesabilitado={!podeContinuar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    marginTop: 18,
  },
  horarios: {
    gap: Spacing.sm,
    marginTop: 10,
  },
  linha: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  horario: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horarioVazio: {
    flex: 1,
  },
  riscado: {
    textDecorationLine: 'line-through',
  },
});
