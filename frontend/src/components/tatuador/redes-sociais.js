import { StyleSheet, View } from 'react-native';
import { Button } from '../ui/button';

export function RedesSociais({ redes, onAbrir }) {
  return (
    <View style={styles.linha}>
      {redes.map((rede) => (
        <Button
          key={rede.id}
          title={rede.rotulo}
          variant="outline"
          size="sm"
          onPress={() => onAbrir(rede.id)}
          style={styles.botao}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 26,
  },
  botao: {
    flex: 1,
    height: 46,
    paddingHorizontal: 8,
  },
});
