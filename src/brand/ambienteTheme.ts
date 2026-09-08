/**
 * Tema oficial para Educación Ambiental Integral (EducaPlay Secundaria)
 * Cumple estrictamente con las normas WCAG AAA y el nuevo sistema de diseño.
 */
export const THEME = {
  // Paleta cromática
  ink: '#0C2B24',         // Tinta oscura profunda de Ambiente (>15:1 sobre blanco)
  accent: '#10BA1B',      // Acento verde oficial (SÓLO ceja cromática, filetes e indicadores)
  accentDeep: '#06590D',  // Verde oscuro para texto/etiquetas legibles (8.6:1 WCAG AAA)
  emphasisBg: '#FFF6C4',  // Fondo amarillo pastel para ÉNFASIS TRIPLE oficial
  surface: '#FFFFFF',     // Superficie blanca luminosa (alfa >= 0.94)

  // Bordes y sombras institucionales
  border: '1.5px solid rgba(7, 32, 44, 0.09)',
  shadow: '0 20px 48px rgba(7, 32, 44, 0.16), 0 4px 12px rgba(7, 32, 44, 0.05)',
  eyebrowHeight: '6px',

  // Ceja Cromática Oficial de Marca EducaPlay (Riel Arcoíris de 4 colores)
  rainbowRail: ['#D43453', '#F0BA46', '#60B6D3', '#5DAA46'] as const,
  rainbowGradient: 'linear-gradient(to right, #D43453 0%, #D43453 25%, #F0BA46 25%, #F0BA46 50%, #60B6D3 50%, #60B6D3 75%, #5DAA46 75%, #5DAA46 100%)',

  // Banda de subtítulos con scrim calibrado
  captions: {
    scrim: 'rgba(7, 32, 44, 0.55)', // Transparente para dejar ver el set con ratio >= 4.5:1
    border: '1px solid rgba(255, 255, 255, 0.16)',
    blur: '10px',
    fontSize: '36px',
  },

  // Tipografías oficiales
  fonts: {
    title: "'Museo', system-ui, -apple-system, sans-serif",
    body: "'Museo Sans', system-ui, -apple-system, sans-serif",
  },
} as const;

export default THEME;
