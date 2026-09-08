import React from 'react';
import { THEME } from '../brand/ambienteTheme';

export interface AlertPillProps {
  text: string;
  iconType?: 'alert' | 'siren' | 'question';
}

export const AlertPill: React.FC<AlertPillProps> = ({
  text,
  iconType = 'alert',
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'siren':
        return (
          <span style={{ fontSize: '32px', lineHeight: 1 }}>🚨</span>
        );
      case 'question':
        return (
          <span style={{ fontSize: '32px', lineHeight: 1 }}>❓</span>
        );
      case 'alert':
      default:
        return (
          <span style={{ fontSize: '32px', lineHeight: 1 }}>⚠️</span>
        );
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
