import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface MultiItem {
  text: string;
  revealFrame: number; // relative frame from block start
}

export interface MultiTitularCardProps {
  items: MultiItem[];
}

export const MultiTitularCard: React.FC<MultiTitularCardProps> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start',
        fontFamily: "'Museo', 'Museo Sans', sans-serif",
      }}
    >
      {items.map((item, idx) => {
        const isVisible = frame >= item.revealFrame;
        if (!isVisible) return null;

        const relFrame = frame - item.revealFrame;
        const spr = spring({
          frame: relFrame,
          fps,
          config: { damping: 14, stiffness: 95 },
        });

        const scale = interpolate(spr, [0, 1], [0.9, 1]);
        const opacity = interpolate(spr, [0, 1], [0, 1]);

        return (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px 28px',
              boxShadow: '0 14px 36px rgba(7, 32, 44, 0.18)',
              border: '1.5px solid rgba(0, 173, 195, 0.28)',
              borderLeft: '5px solid #00ADC3',
              transform: `scale(${scale})`,
              opacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: '#07202C',
                fontFamily: "'Museo', sans-serif",
                letterSpacing: '-0.01em',
              }}
            >
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
