import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FontAssets } from './src/constants/fonts';
import { NavigationThemes } from './src/constants/navigation-theme';
import { useTheme } from './src/hooks/use-theme';
import { RootNavigator } from './src/navigation/root-navigator';

SplashScreen.preventAutoHideAsync();

// Entrada do app: carrega as fontes da marca, segura a splash até elas ficarem
// prontas e monta a navegação dentro do NavigationContainer.
export default function App() {
  const { scheme } = useTheme();
  const [fontesProntas, erroFontes] = useFonts(FontAssets);

  useEffect(() => {
    if (fontesProntas || erroFontes) SplashScreen.hideAsync();
  }, [fontesProntas, erroFontes]);

  if (!fontesProntas && !erroFontes) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={NavigationThemes[scheme]}>
        <RootNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
