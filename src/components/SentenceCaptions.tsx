import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SentenceCaption } from '../captions';
import { THEME } from '../brand/ambienteTheme';

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

  // Subtitles elevate to 220px during LowerThird entrance & active duration (F250 to F460 in AMB26-02)
  // and descend cleanly to 48px at F461 when the lower third animation completely exits
  const isLowerThirdActive = frame >= 250 && frame <= 460;
  const bottomPos = isLowerThirdActive ? '220px' : '48px';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomPos,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        backgroundColor: THEME.captions.scrim, // Scrim calibrado a 0.55
        backdropFilter: `blur(${THEME.captions.blur})`,
        padding: '14px 34px',
        borderRadius: '16px',
        border: THEME.captions.border,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
        maxWidth: '1380px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        pointerEvents: 'none',
        fontFamily: THEME.fonts.body,
        transition: 'bottom 0.25s ease',
      }}
    >
      <span
        style={{
          fontSize: THEME.captions.fontSize,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          textAlign: 'center',
          fontFamily: THEME.fonts.body,
          textWrap: 'balance',
          whiteSpace: 'normal',
        }}
      >
        {activeCaption.formattedText || activeCaption.text}
      </span>
    </div>
  );
};
