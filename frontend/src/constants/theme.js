// Tokens de design do app, extraídos do protótipo (Claude Design).
// A marca é estritamente preto e branco: o app roda sempre no tema escuro.
// A paleta clara existe só como reserva e espelha as mesmas chaves.

export const Colors = {
  dark: {
    background: '#0A0A0A',
    surface: '#0F0F0F',
    surfaceElevated: '#141414',
    border: '#2A2A2A',
    borderStrong: '#3A3A3A',
    // Divisórias internas de cards e listas (mais discretas que border).
    divider: '#1C1C1C',
    text: '#F2F0EB',
    textSecondary: '#C9C7C1',
    textMuted: '#9A9A9A',
    textDim: '#6B6B6B',
    textFaint: '#4A4A4A',
    primary: '#F2F0EB',
    onPrimary: '#0A0A0A',
    accent: '#F2F0EB',
    success: '#3DD68C',
    danger: '#FF4D5E',
    // Fundo translúcido para botões sobre imagem.
    overlay: 'rgba(10,10,10,0.5)',
    // Linhas/bordas translúcidas sobre imagem.
    lineOnImage: 'rgba(255,255,255,0.35)',
  },
  light: {
    background: '#F2F0EB',
    surface: '#FFFFFF',
    surfaceElevated: '#EAE8E3',
    border: '#D9D7D2',
    borderStrong: '#C4C2BD',
    divider: '#E4E2DD',
    text: '#0A0A0A',
    textSecondary: '#3A3A3A',
    textMuted: '#6B6B6B',
    textDim: '#9A9A9A',
    textFaint: '#C4C2BD',
    primary: '#0A0A0A',
    onPrimary: '#F2F0EB',
    accent: '#0A0A0A',
    success: '#1E8E5A',
    danger: '#D7263D',
    overlay: 'rgba(242,240,235,0.5)',
    lineOnImage: 'rgba(0,0,0,0.35)',
  },
};

// Famílias de fonte carregadas em src/constants/fonts.js.
// Com fontes customizadas, o peso é escolhido pela família (não use fontWeight).
export const Fonts = {
  // Bebas Neue: títulos e números.
  display: 'BebasNeue_400Regular',
  // Manrope: texto corrido.
  sans: 'Manrope_400Regular',
  sansMedium: 'Manrope_500Medium',
  sansSemiBold: 'Manrope_600SemiBold',
  sansBold: 'Manrope_700Bold',
};

// Converte letter-spacing em "em" (como no CSS do protótipo) para pixels.
export function tracking(em, fontSize) {
  return Math.round(em * fontSize * 100) / 100;
}

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 34,
};

export const Radius = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 12,
  full: 999,
};

// Altura da barra de navegação inferior (sem a safe area).
export const BottomNavHeight = 76;

// Largura máxima do conteúdo (relevante no web/tablet).
export const MaxContentWidth = 800;
