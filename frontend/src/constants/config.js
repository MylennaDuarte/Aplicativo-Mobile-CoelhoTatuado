// Configurações gerais do app. Valores sensíveis a ambiente vêm de EXPO_PUBLIC_* (ver .env.example).

export const AppConfig = {
  nome: 'Coelho Tatuado',
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? '',
  // Número no formato internacional, somente dígitos (ex.: 5511999999999).
  whatsapp: process.env.EXPO_PUBLIC_WHATSAPP ?? '',
  instagram: process.env.EXPO_PUBLIC_INSTAGRAM ?? 'coelhotatuado',
};
