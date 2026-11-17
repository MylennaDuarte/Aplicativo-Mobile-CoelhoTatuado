import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { useTheme } from '../../hooks/use-theme';

// Ícones de linha do app (mesmos traços do protótipo).
// Para adicionar um ícone, inclua o desenho em GLYPHS (viewBox 24×24).
const GLYPHS = {
  inicio: (
    <>
      <Path d="M4 11l8-7 8 7v9H4z" />
      <Path d="M10 20v-6h4v6" />
    </>
  ),
  galeria: (
    <>
      <Rect x={4} y={4} width={7} height={9} rx={1} />
      <Rect x={13} y={4} width={7} height={5} rx={1} />
      <Rect x={13} y={11} width={7} height={9} rx={1} />
      <Rect x={4} y={15} width={7} height={5} rx={1} />
    </>
  ),
  agendar: (
    <>
      <Path d="M4 20l3.5-1 10-10-2.5-2.5-10 10L4 20z" />
      <Path d="M13.5 7.5l2.5 2.5" />
      <Path d="M15 5l1.5-1.5a1.77 1.77 0 0 1 2.5 2.5L17.5 7.5" />
    </>
  ),
  novidades: (
    <>
      <Path d="M4 6h13v12a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z" />
      <Path d="M17 10h3v8a2 2 0 0 1-2 2" />
      <Path d="M7 10h7M7 14h7" />
    </>
  ),
  meuEspaco: (
    <>
      <Circle cx={12} cy={8.5} r={3.5} />
      <Path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  check: <Path d="M5 12.5l4.5 4.5L19 7.5" />,
  chevronLeft: <Path d="M14.5 6l-6 6 6 6" />,
  chevronRight: <Path d="M9.5 6l6 6-6 6" />,
};

export function Icon({ name, size = 22, color, strokeWidth = 1.6 }) {
  const { colors } = useTheme();

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? colors.text}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round">
      {GLYPHS[name]}
    </Svg>
  );
}
