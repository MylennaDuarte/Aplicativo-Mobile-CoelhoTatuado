import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@coelhotatuado/identidade';

export async function lerIdentidade() {
  try {
    const salvo = await AsyncStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : null;
  } catch (err) {
    console.log('Aviso: não foi possível ler a identidade salva:', err.message);
    return null;
  }
}

export async function salvarIdentidade({ nome = '', whatsapp }) {
  try {
    await AsyncStorage.setItem(CHAVE, JSON.stringify({ nome, whatsapp }));
  } catch (err) {
    console.log('Aviso: não foi possível salvar a identidade:', err.message);
  }
}

export async function esquecerIdentidade() {
  try {
    await AsyncStorage.removeItem(CHAVE);
  } catch (err) {
    console.log('Aviso: não foi possível apagar a identidade:', err.message);
  }
}
