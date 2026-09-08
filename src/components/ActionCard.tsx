import React from 'react';
import { Img, staticFile } from 'remotion';
import { THEME } from '../brand/ambienteTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface ActionCardProps {
  title: string;
  items: string[];
  imageSrc?: string;
  isCompact?: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  items,
  imageSrc,
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

      {/* Optional Top Hero Image */}
      {imageSrc && (
        <div
          style={{
            width: '100%',
            height: isCompact ? '200px' : '240px',
            position: 'relative',
            backgroundColor: '#07202C',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Header Limpio */}
      <div
        style={{
          padding: '22px 28px 14px',
          borderBottom: '1.5px solid rgba(7, 32, 44, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: THEME.surface,
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: THEME.accent,
          }}
        />
        <div
          style={{
            margin: 0,
            fontSize: isCompact ? '32px' : '36px',
            fontWeight: 900,
            color: THEME.ink,
            letterSpacing: '-0.01em',
            fontFamily: THEME.fonts.title,
          }}
        >
          {title}
        </div>
      </div>

      {/* Action items */}
      <div
        style={{
          padding: isCompact ? '18px 22px' : '22px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          backgroundColor: THEME.surface,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '10px 14px',
              backgroundColor: 'rgba(7, 32, 44, 0.03)',
              borderRadius: '14px',
              border: '1px solid rgba(7, 32, 44, 0.08)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 186, 27, 0.15)',
                color: THEME.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div
              style={{
                fontSize: isCompact ? '26px' : '28px',
                fontWeight: 700,
                color: THEME.ink,
                lineHeight: 1.3,
                fontFamily: THEME.fonts.body,
              }}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionCard;
