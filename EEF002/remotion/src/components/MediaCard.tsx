import React from 'react';
import { getRemotionEnvironment, Html5Video, Img, OffthreadVideo, staticFile } from 'remotion';
import { THEME } from '../brand/eefTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface MediaCardProps {
  kind: 'image' | 'video';
  src: string;
  title?: string;
  caption?: string;
  source?: string;
  clipFrom?: number;
  isCompact?: boolean;
  isLarge?: boolean;
}

/**
 * Tarjeta de Recurso Didáctico Oficial EducaPlay (MediaCard)
 * Con Ceja Cromática Superior Cuatricolor, contenedor de media calibrado,
 * badge de atribución y sección tipográfica institucional Museo / Museo Sans.
 */
export const MediaCard: React.FC<MediaCardProps> = ({
  kind,
  src,
  title,
  caption,
  source,
  clipFrom = 0,
  isCompact = false,
  isLarge = false,
}) => {
  const widthPx = isLarge ? 1140 : isCompact ? 560 : 680;
  const heightPx = isLarge ? 480 : isCompact ? 300 : 380;

  const isTransparentGraphic = src.endsWith('.png') || src.endsWith('.gif');
  const isRendering = getRemotionEnvironment().isRendering;

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
      {/* 1. Ceja Cromática Superior Cuatricolor Oficial de EducaPlay */}
      <RainbowEyebrow />

      {/* 2. Etiqueta de fuente o atribución */}
      {source && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(7, 32, 44, 0.90)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            zIndex: 10,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0, 173, 195, 0.4)',
            fontFamily: THEME.fonts.body,
            letterSpacing: '0.04em',
          }}
        >
          Fuente: {source}
        </div>
      )}

      {/* 3. Contenedor de Media */}
      <div
        style={{
          width: '100%',
          height: `${heightPx}px`,
          position: 'relative',
          backgroundColor: isTransparentGraphic ? '#F4FBFD' : '#07202C',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: (title || caption) ? '1.5px solid rgba(7, 32, 44, 0.08)' : 'none',
        }}
      >
        {(() => {
          let safeSrc = src;
          if (src && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('/static')) {
            try {
              safeSrc = staticFile(src);
            } catch {
              safeSrc = src;
            }
          }

          if (kind === 'image') {
            return (
              <Img
                src={safeSrc}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: isTransparentGraphic ? 'contain' : 'cover',
                  padding: isTransparentGraphic ? '20px' : '0px',
                }}
              />
            );
          } else if (isRendering) {
            return (
              <OffthreadVideo
                src={safeSrc}
                startFrom={clipFrom * 25}
                volume={0}
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            );
          } else {
            return (
              <Html5Video
                src={safeSrc}
                startFrom={clipFrom * 25}
                volume={0}
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            );
          }
        })()}
      </div>

      {/* 4. Pie de texto pedagógico */}
      {(title || caption) && (
        <div
          style={{
            padding: isCompact ? '18px 24px' : '22px 28px',
            backgroundColor: THEME.surface,
            color: THEME.ink,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {title && (
            <div
              style={{
                fontSize: isCompact ? '32px' : '36px',
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
                fontSize: isCompact ? '24px' : '26px',
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
