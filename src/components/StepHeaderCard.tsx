import React from 'react';
import { THEME } from '../brand/ambienteTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface StepHeaderCardProps {
  stepNumber: string; // e.g. "02", "06"
  stepLabel?: string; // e.g. "PASO"
  title: string;
  isCompact?: boolean;
}

/**
 * Tarjeta de Cabecera de Paso (como en las referencias AMB26-01: Paso 02, Paso 06)
 */
export const StepHeaderCard: React.FC<StepHeaderCardProps> = ({
  stepNumber,
  stepLabel = 'PASO',
  title,
  isCompact = false,
}) => {
  const widthPx = isCompact ? 580 : 700;

  return (
    <div
      style={{
        backgroundColor: THEME.surface,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: THEME.shadow,
        border: THEME.border,
        width: `${widthPx}px`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: THEME.fonts.title,
      }}
    >
      {/* Ceja Cromática Superior Cuatricolor Oficial de EducaPlay */}
      <RainbowEyebrow />

      <div
        style={{
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          backgroundColor: THEME.surface,
        }}
      >
        {/* Número de Paso Gigante */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 900,
            color: THEME.accentDeep,
            fontFamily: THEME.fonts.title,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            flexShrink: 0,
          }}
        >
          {stepNumber}
        </div>

        {/* Divisor Vertical */}
        <div
          style={{
            width: '2px',
            height: '52px',
            backgroundColor: 'rgba(7, 32, 44, 0.12)',
            flexShrink: 0,
          }}
        />

        {/* Etiqueta PASO y Título */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              fontWeight: 800,
              color: THEME.accentDeep,
              fontFamily: THEME.fonts.body,
            }}
          >
            {stepLabel}
          </span>
          <div
            style={{
              fontSize: isCompact ? '30px' : '36px',
              fontWeight: 900,
              color: THEME.ink,
              lineHeight: 1.2,
              fontFamily: THEME.fonts.title,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepHeaderCard;
