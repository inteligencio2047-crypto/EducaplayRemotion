import React from 'react';
import { THEME } from '../brand/eefTheme';

export interface AlertPillProps {
  text: string;
  icon?: string;
  iconType?: 'alert' | 'siren' | 'question' | 'custom';
}

/**
 * Pastilla de Alerta Flotante Oficial EducaPlay (AlertPill)
 * Cápsula blanca redondeada con sombra flotante y tipografía Museo 900.
 */
export const AlertPill: React.FC<AlertPillProps> = ({
  text,
  icon,
  iconType = 'alert',
}) => {
  const renderIcon = () => {
    if (icon) {
      return <span style={{ fontSize: '32px', lineHeight: 1 }}>{icon}</span>;
    }
    switch (iconType) {
      case 'siren':
        return <span style={{ fontSize: '32px', lineHeight: 1 }}>🚨</span>;
      case 'question':
        return <span style={{ fontSize: '32px', lineHeight: 1 }}>❓</span>;
      case 'alert':
      default:
        return <span style={{ fontSize: '32px', lineHeight: 1 }}>⚠️</span>;
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: THEME.surface,
        color: THEME.ink,
        padding: '14px 28px',
        borderRadius: '20px',
        border: THEME.border,
        boxShadow: THEME.shadow,
        fontFamily: THEME.fonts.title,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {renderIcon()}
      </div>

      <span
        style={{
          fontSize: '30px',
          fontWeight: 900,
          color: THEME.ink,
          fontFamily: THEME.fonts.title,
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default AlertPill;
