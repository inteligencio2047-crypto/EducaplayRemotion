import React from 'react';
import { THEME } from '../brand/eefTheme';

export interface RainbowEyebrowProps {
  height?: string | number;
}

/**
 * Ceja Cromática Oficial de EducaPlay
 * Riel de 4 colores institucionales (Rojo/Coral, Amarillo/Oro, Cian/Celeste, Verde/Materia)
 * obligatorio en el borde superior de todas las tarjetas educativas y pastillas pedagógicas.
 */
export const RainbowEyebrow: React.FC<RainbowEyebrowProps> = ({
  height = THEME.eyebrowHeight,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height,
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 0,
      }}
    >
      {THEME.rainbowRail.map((color, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default RainbowEyebrow;
