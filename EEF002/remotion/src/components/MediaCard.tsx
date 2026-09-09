import React from 'react';
import { getRemotionEnvironment, Html5Video, Img, OffthreadVideo, staticFile } from 'remotion';

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
  const widthPx = isLarge ? 1140 : isCompact ? 560 : 660;
  const heightPx = isLarge ? 480 : isCompact ? 300 : 360;

  const isTransparentGraphic = src.endsWith('.png') || src.endsWith('.gif');
  const isRendering = getRemotionEnvironment().isRendering;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 18px 45px rgba(7, 32, 44, 0.2)',
        border: '1.5px solid rgba(0, 173, 195, 0.28)',
        borderTop: '6px solid #00ADC3', // Accent stripe characteristico del motor de episodios
        width: `${widthPx}px`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Museo', 'Museo Sans', system-ui, -apple-system, sans-serif",
        position: 'relative',
      }}
    >
      {/* Etiqueta de fuente o atribución */}
      {source && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            backgroundColor: 'rgba(7, 32, 44, 0.92)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '10px',
            fontSize: '20px',
            fontWeight: 700,
            zIndex: 10,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0, 173, 195, 0.5)',
            fontFamily: "'Museo Sans', sans-serif",
          }}
        >
          Fuente: {source}
        </div>
      )}

      {/* Contenedor de Media */}
      <div
        style={{
          width: '100%',
          height: `${heightPx}px`,
          position: 'relative',
          backgroundColor: isTransparentGraphic ? '#F4FBFD' : '#07202C',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: (title || caption) ? '1.5px solid rgba(0, 173, 195, 0.2)' : 'none',
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
                  padding: isTransparentGraphic ? '18px' : '0px',
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

      {/* Pie de texto didáctico */}
      {(title || caption) && (
        <div
          style={{
            padding: isCompact ? '16px 22px' : '20px 26px',
            background: '#FFFFFF',
            color: '#07202C',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {title && (
            <div
              style={{
                fontSize: isCompact ? '34px' : '36px',
                fontWeight: 900,
                color: '#07202C',
                lineHeight: 1.22,
                fontFamily: "'Museo', sans-serif",
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </div>
          )}
          {caption && (
            <div
              style={{
                fontSize: isCompact ? '28px' : '30px',
                fontWeight: 700,
                color: '#007C8D',
                lineHeight: 1.3,
                fontFamily: "'Museo Sans', sans-serif",
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
