import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../brand/ambienteTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface ConceptCardProps {
  title: string;
  equation: string;
  subtitle: string;
  isCompact?: boolean;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  equation,
  subtitle,
  isCompact = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const eqScale = interpolate(spr, [0, 1], [0.85, 1]);
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

      {/* Cabecera Limpia (blanca y luminosa) */}
      <div
        style={{
          padding: '24px 28px 12px',
          backgroundColor: THEME.surface,
        }}
      >
        <span
          style={{
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 800,
            color: THEME.accentDeep,
            fontFamily: THEME.fonts.body,
          }}
        >
          Concepto Clave
        </span>
        <div
          style={{
            fontSize: isCompact ? '32px' : '38px',
            fontWeight: 900,
            color: THEME.ink,
            marginTop: '4px',
            fontFamily: THEME.fonts.title,
            lineHeight: 1.22,
          }}
        >
          {title}
        </div>
      </div>

      {/* Cuerpo Principal con Énfasis Triple Oficial */}
      <div
        style={{
          padding: isCompact ? '16px 24px 24px' : '16px 28px 26px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: THEME.surface,
        }}
      >
        {/* Recuadro de Concepto Destacado */}
        <div
          style={{
            backgroundColor: THEME.emphasisBg, // 1. Resaltado amarillo pastel
            borderLeft: `6px solid ${THEME.accent}`, // 2. Filete verde de materia
            borderTop: '1px solid rgba(7, 32, 44, 0.08)',
            borderRight: '1px solid rgba(7, 32, 44, 0.08)',
            borderBottom: '1px solid rgba(7, 32, 44, 0.08)',
            borderRadius: '16px',
            padding: isCompact ? '16px 20px' : '18px 26px',
            textAlign: 'center',
            transform: `scale(${eqScale})`,
            boxShadow: '0 6px 18px rgba(255, 246, 196, 0.5)',
          }}
        >
          <div
            style={{
              fontSize: isCompact ? '36px' : '44px',
              fontWeight: 900,
              color: THEME.ink, // 3. Tinta oscura profunda
              fontFamily: THEME.fonts.title,
              borderBottom: `2px solid ${THEME.accent}`, // Subrayado de énfasis
              display: 'inline-block',
            }}
          >
            {equation}
          </div>
        </div>

        {/* Bajada / Explicación */}
        <div
          style={{
            fontSize: isCompact ? '26px' : '28px',
            lineHeight: 1.35,
            fontWeight: 600,
            color: THEME.accentDeep,
            fontFamily: THEME.fonts.body,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default ConceptCard;
