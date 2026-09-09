import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface FormulaTitularCardProps {
  partA: string;
  partB: string;
  revealFramePartB: number; // relative frame from block start
}

export const FormulaTitularCard: React.FC<FormulaTitularCardProps> = ({
  partA,
  partB,
  revealFramePartB,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part A spring
  const sprA = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Part B spring (triggers at revealFramePartB)
  const frameB = Math.max(0, frame - revealFramePartB);
  const sprB = spring({
    frame: frameB,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const showPartB = frame >= revealFramePartB;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '22px 32px',
        boxShadow: '0 16px 42px rgba(7, 32, 44, 0.18)',
        border: '1.5px solid rgba(0, 173, 195, 0.28)',
        borderTop: '6px solid #00ADC3',
        fontFamily: "'Museo', 'Museo Sans', sans-serif",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div
        style={{
          fontSize: '42px',
          fontWeight: 900,
          color: '#07202C',
          fontFamily: "'Museo', sans-serif",
          transform: `scale(${interpolate(sprA, [0, 1], [0.94, 1])})`,
        }}
      >
        {partA}
      </div>

      {showPartB && (
        <div
          style={{
            fontSize: '42px',
            fontWeight: 900,
            color: '#00ADC3',
            fontFamily: "'Museo', sans-serif",
            opacity: interpolate(sprB, [0, 1], [0, 1]),
            transform: `scale(${interpolate(sprB, [0, 1], [0.94, 1])})`,
          }}
        >
          {partB}
        </div>
      )}
    </div>
  );
};
