import React from 'react';
import { THEME } from '../brand/ambienteTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface StepItem {
  keyword: string; // e.g. "AGUA", "GAS", "ELECTRICIDAD"
  description: string;
  icon?: 'water' | 'gas' | 'electricity' | 'check' | 'warning';
}

export interface StepBodyCardProps {
  items: StepItem[];
  footnote?: string;
  isCompact?: boolean;
}

export const StepBodyCard: React.FC<StepBodyCardProps> = ({
  items,
  footnote,
  isCompact = false,
}) => {
  const widthPx = isCompact ? 580 : 700;

  const renderIcon = (icon?: string) => {
    switch (icon) {
      case 'water':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={THEME.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        );
      case 'gas':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={THEME.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            <path d="M12 11a3 3 0 0 1 3 3c0 1.66-1.34 3-3 3s-3-1.34-3-3a3 3 0 0 1 3-3z" fill={THEME.accent} />
          </svg>
        );
      case 'electricity':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={THEME.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M13 7l-4 6h5l-2 5 5-7h-4l2-4z" fill={THEME.accent} stroke={THEME.accent} strokeWidth="1" />
          </svg>
        );
      default:
        return (
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 186, 27, 0.15)',
              color: THEME.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 800,
            }}
          >
            ✓
          </div>
        );
    }
  };

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

      {/* Items List */}
      <div
        style={{
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          backgroundColor: THEME.surface,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              {renderIcon(item.icon)}
            </div>
            <div
              style={{
                fontSize: isCompact ? '24px' : '26px',
                lineHeight: 1.3,
                fontFamily: THEME.fonts.body,
                color: THEME.ink,
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  fontFamily: THEME.fonts.body,
                  marginRight: '8px',
                }}
              >
                {item.keyword}
              </span>
              <span style={{ fontWeight: 600 }}>
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footnote / Aclaración al pie */}
      {footnote && (
        <div
          style={{
            borderTop: '1.5px solid rgba(7, 32, 44, 0.08)',
            padding: '14px 28px 18px',
            fontSize: isCompact ? '20px' : '22px',
            fontWeight: 600,
            color: 'rgba(7, 32, 44, 0.72)',
            fontFamily: THEME.fonts.body,
            lineHeight: 1.35,
          }}
        >
          {footnote}
        </div>
      )}
    </div>
  );
};

export default StepBodyCard;
