import React from 'react';

export interface TitularCardProps {
  title: string;
  subtitle?: string;
  isCompact?: boolean;
}

export const TitularCard: React.FC<TitularCardProps> = ({
  title,
  subtitle,
  isCompact = false,
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: isCompact ? '18px 26px' : '22px 30px',
        boxShadow: '0 16px 42px rgba(7, 32, 44, 0.18)',
        border: '1.5px solid rgba(0, 173, 195, 0.28)',
        borderTop: '6px solid #00ADC3', // Accent stripe
        maxWidth: isCompact ? '560px' : '660px',
        fontFamily: "'Museo', 'Museo Sans', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <div
        style={{
          fontSize: '36px',
          fontWeight: 900,
          color: '#07202C',
          lineHeight: 1.22,
          fontFamily: "'Museo', sans-serif",
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#007C8D',
            fontFamily: "'Museo Sans', sans-serif",
            lineHeight: 1.25,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
