import React from 'react';
import { Img, OffthreadVideo, staticFile } from 'remotion';
import { THEME } from '../brand/ambienteTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface MediaCardProps {
  kind: 'image' | 'video' | 'video_off';
  src: string;
  title?: string;
  caption?: string;
  source?: string;
  clipFrom?: number;
  isCompact?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  kind,
  src,
  title,
  caption,
  source,
  clipFrom = 0,
  isCompact = false,
}) => {
  const isOffScreen = kind === 'video_off';
  const widthPx = isOffScreen ? 940 : isCompact ? 580 : 700;
  const heightPx = isOffScreen ? 500 : isCompact ? 300 : 380;
  const isTransparentGraphic = src.endsWith('.png') || src.endsWith('.gif');
  const isVideo = src.endsWith('.mp4') || src.endsWith('.MP4') || src.endsWith('.webm');

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
        position: 'relative',
      }}
    >
      {/* Ceja Cromática Superior Cuatricolor Oficial de EducaPlay */}
      <RainbowEyebrow />

      {/* Video/Image Source Attribution Overlay */}
      {source && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(12, 43, 36, 0.90)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            zIndex: 10,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(16, 186, 27, 0.4)',
            fontFamily: THEME.fonts.body,
            letterSpacing: '0.04em',
          }}
        >
          Fuente: {source}
        </div>
      )}

      {/* Media Well Container */}
      <div
        style={{
          width: '100%',
          height: `${heightPx}px`,
          position: 'relative',
          backgroundColor: isTransparentGraphic ? '#F3F6F5' : '#07202C',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {kind === 'image' || !isVideo ? (
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: isTransparentGraphic ? 'contain' : 'cover',
              padding: isTransparentGraphic ? '18px' : '0px',
            }}
          />
        ) : (
          <OffthreadVideo
            src={staticFile(src)}
            startFrom={clipFrom * 24}
            volume={0}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </div>

      {/* Text Hierarchy Section */}
      {(title || caption) && (
        <div
          style={{
            padding: isCompact ? '20px 24px' : '24px 28px',
            backgroundColor: THEME.surface,
            color: THEME.ink,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {title && (
            <div
              style={{
                fontSize: isCompact ? '32px' : '38px',
                fontWeight: 900,
                color: THEME.ink,
                lineHeight: 1.22,
                fontFamily: THEME.fonts.title,
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </div>
          )}
          {caption && (
            <div
              style={{
                fontSize: isCompact ? '26px' : '28px',
                fontWeight: 600,
                color: THEME.accentDeep,
                lineHeight: 1.35,
                fontFamily: THEME.fonts.body,
              }}
            >
              {caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaCard;
