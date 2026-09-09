/**
 * Tema oficial para Educación Económica y Financiera (EducaPlay Secundaria)
 * Basado estrictamente en ARQUITECTURA_MARCA_EDUCAPLAY.md y estándares WCAG AAA.
 */
export const THEME = {
  ink: '#07202C',         // Tinta oscura profunda (>15:1 sobre blanco)
  accent: '#00ADC3',      // Acento cian oficial de la materia
  accentDeep: '#006876',  // Cian profundo para kickers y tags (WCAG AAA > 7:1)
  emphasisBg: '#FFF6C4',  // Fondo amarillo pastel para ÉNFASIS TRIPLE oficial
  surface: '#FFFFFF',     // Superficie blanca luminosa (alfa >= 0.94)

  // Bordes y sombras institucionales unificadas
  border: '1.5px solid rgba(7, 32, 44, 0.09)',
  shadow: '0 20px 48px rgba(7, 32, 44, 0.16), 0 4px 12px rgba(7, 32, 44, 0.05)',
  eyebrowHeight: '6px',

  // Ceja Cromática Oficial de Marca EducaPlay (Riel Arcoíris de 4 colores)
  rainbowRail: ['#D43453', '#F0BA46', '#60B6D3', '#5DAA46'] as const,
  rainbowGradient: 'linear-gradient(to right, #D43453 0%, #D43453 25%, #F0BA46 25%, #F0BA46 50%, #60B6D3 50%, #60B6D3 75%, #5DAA46 75%, #5DAA46 100%)',

  // Banda de subtítulos con scrim esmerilado calibrado (frosted glass)
  captions: {
    scrim: 'rgba(7, 32, 44, 0.55)',
    border: '1.2px solid rgba(255, 255, 255, 0.18)',
    blur: '12px',
    fontSize: '34px',
  },

  // Tipografías oficiales
  fonts: {
    title: "'Museo', system-ui, -apple-system, sans-serif",
    body: "'Museo Sans', system-ui, -apple-system, sans-serif",
  },
} as const;

export default THEME;
