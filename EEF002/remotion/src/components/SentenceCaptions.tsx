import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SentenceCaption } from '../captions';
import { MARKS } from '../data';

export interface SentenceCaptionsProps {
  captions: SentenceCaption[];
}

export const SentenceCaptions: React.FC<SentenceCaptionsProps> = ({ captions }) => {
  const frame = useCurrentFrame();

  // Find active sentence block
  const activeCaption = captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  if (!activeCaption) {
    return null;
  }

  // Elevación obligatoria de subtítulos entre F215 y F445 para no colisionar con la placa del profesor
  const lowerThirdIn = (MARKS as any).lowerThirdIn ?? 215;
  const lowerThirdOut = (MARKS as any).lowerThirdOut ?? 445;
  const isLowerThirdActive = frame >= lowerThirdIn && frame <= lowerThirdOut;
  const bottomPos = isLowerThirdActive ? '230px' : '48px';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomPos,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        backgroundColor: 'rgba(7, 32, 44, 0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '12px 30px',
        borderRadius: '16px',
        border: '1.2px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        maxWidth: '1280px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        pointerEvents: 'none',
        fontFamily: "'Museo Sans', 'Museo', system-ui, -apple-system, sans-serif",
        transition: 'bottom 0.25s ease',
      }}
    >
      <span
        style={{
          fontSize: '34px',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          textAlign: 'center',
          fontFamily: "'Museo Sans', 'Museo', sans-serif",
          textWrap: 'balance',
          whiteSpace: 'normal',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        {activeCaption.formattedText || activeCaption.text}
      </span>
    </div>
  );
};
