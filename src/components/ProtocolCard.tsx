import React from 'react';
import { THEME } from '../brand/ambienteTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface ProtocolCardProps {
  title: string;
  source?: string;
  steps: { number: string; text: string; highlight?: boolean }[];
  isCompact?: boolean;
}

export const ProtocolCard: React.FC<ProtocolCardProps> = ({
  title,
  source,
  steps,
  isCompact = false,
}) => {
  return (
    <div
      style={{
        backgroundColor: THEME.surface,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: THEME.shadow,
        border: THEME.border,
        width: isCompact ? '560px' : '680px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: THEME.fonts.title,
        position: 'relative',
      }}
    >
      {/* Ceja Cromática Superior Cuatricolor Oficial de EducaPlay */}
      <RainbowEyebrow />

      {/* Attribution Badge */}
      {source && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(12, 43, 36, 0.90)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            zIndex: 10,
            border: '1px solid rgba(16, 186, 27, 0.4)',
            fontFamily: THEME.fonts.body,
            backdropFilter: 'blur(8px)',
          }}
        >
          Fuente: {source}
        </div>
      )}

      {/* Header Limpio */}
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
          Protocolo de Seguridad
        </span>
        <div
          style={{
            fontSize: '36px',
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

      {/* Steps List */}
      <div
        style={{
          padding: '12px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: THEME.surface,
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: step.highlight
                ? THEME.emphasisBg
                : 'rgba(7, 32, 44, 0.03)',
              borderLeft: step.highlight
                ? '6px solid #D9381E'
                : `4px solid ${THEME.accent}`,
              borderTop: '1px solid rgba(7, 32, 44, 0.08)',
              borderRight: '1px solid rgba(7, 32, 44, 0.08)',
              borderBottom: '1px solid rgba(7, 32, 44, 0.08)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step.highlight ? '#D9381E' : THEME.accent,
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: 800,
                flexShrink: 0,
                marginTop: '2px',
                fontFamily: THEME.fonts.title,
              }}
            >
              {step.number}
            </div>

            <div
              style={{
                fontSize: '26px', // Piso de 26px respetado
                fontWeight: 700,
                color: THEME.ink,
                lineHeight: 1.28,
                fontFamily: THEME.fonts.body,
              }}
            >
              {step.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolCard;
