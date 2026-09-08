import React from 'react';
import { THEME } from '../brand/ambienteTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface TitularCardProps {
  title: string;
  kicker?: string;
  subtitle?: string;
  showAccentRule?: boolean;
}

export const TitularCard: React.FC<TitularCardProps> = ({
  title,
  kicker,
  subtitle,
  showAccentRule = true,
}) => {
  return (
    <div
      style={{
        backgroundColor: THEME.surface,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: THEME.shadow,
        border: THEME.border,
        maxWidth: '680px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: THEME.fonts.title,
      }}
    >
      {/* Ceja Cromática Superior Cuatricolor Oficial de EducaPlay */}
      <RainbowEyebrow />

      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {kicker && (
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
            {kicker}
          </span>
        )}

        <div
          style={{
            fontSize: '36px',
            fontWeight: 900,
            color: THEME.ink,
            lineHeight: 1.22,
            fontFamily: THEME.fonts.title,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>

        {showAccentRule && (
          <div
            style={{
              width: '84px',
              height: '4px',
              backgroundColor: THEME.accent,
              borderRadius: '2px',
              marginTop: '4px',
              marginBottom: subtitle ? '6px' : '0px',
            }}
          />
        )}

        {subtitle && (
          <div
            style={{
              fontSize: '26px',
              fontWeight: 600,
              color: THEME.accentDeep,
              fontFamily: THEME.fonts.body,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitularCard;
