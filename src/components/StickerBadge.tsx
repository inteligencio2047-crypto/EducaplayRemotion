import React from 'react';
import { Img, staticFile } from 'remotion';
import { THEME } from '../brand/ambienteTheme';

export interface StickerBadgeProps {
  text: string;
  icon?: string;
}

export const StickerBadge: React.FC<StickerBadgeProps> = ({ text, icon }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: THEME.surface,
        color: THEME.ink,
        padding: '16px 28px',
        borderRadius: '20px',
        borderLeft: `6px solid ${THEME.accent}`,
        borderTop: THEME.border,
        borderRight: THEME.border,
        borderBottom: THEME.border,
        boxShadow: THEME.shadow,
        maxWidth: '760px',
        fontFamily: THEME.fonts.title,
      }}
    >
      {icon && (
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'rgba(16, 186, 27, 0.12)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile(icon)}
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      <span
        style={{
          fontSize: '32px',
          fontWeight: 800,
          lineHeight: 1.25,
          fontFamily: THEME.fonts.title,
          color: THEME.ink,
        }}
      >
        {text}
      </span>
    </div>
  );
};
