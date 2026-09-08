import React from 'react';
import { Img, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export interface IntroCollageProps {
  title: string;
  subtitle: string;
  videoSrc: string;
  bgImageSrc: string;
  badgeIconSrc: string;
}

export const IntroCollage: React.FC<IntroCollageProps> = ({
  title,
  subtitle,
  videoSrc,
  bgImageSrc,
  badgeIconSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs staggered slightly for the 3 equal cards
  const sprCard1 = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const sprCard2 = spring({ frame: Math.max(0, frame - 3), fps, config: { damping: 14, stiffness: 100 } });
  const sprCard3 = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 14, stiffness: 100 } });

  const scale1 = interpolate(sprCard1, [0, 1], [0.92, 1]);
  const scale2 = interpolate(sprCard2, [0, 1], [0.92, 1]);
  const scale3 = interpolate(sprCard3, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '1160px',
        fontFamily: "'Museo', 'Museo Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 3 Equal-Sized Resources Side-by-Side */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          width: '100%',
          gap: '20px',
        }}
      >
        {/* Resource 1: Cielo con nubes (Equal Size: 360x300) */}
        <div
          style={{
            flex: 1,
            height: '300px',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#07202C',
            border: '3px solid #10BA1B',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
            position: 'relative',
            transform: `scale(${scale1})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Img
            src={staticFile(bgImageSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'rgba(7, 32, 44, 0.85)',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: "'Museo Sans', sans-serif",
              border: '1px solid rgba(16, 186, 27, 0.5)',
            }}
          >
            Fenómenos Climáticos
          </div>
        </div>

        {/* Resource 2: Alarma Meteorológica (Equal Size: 360x300) */}
        <div
          style={{
            flex: 1,
            height: '300px',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#07202C',
            border: '3px solid #10BA1B',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
            position: 'relative',
            transform: `scale(${scale2})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
          }}
        >
          <Img
            src={staticFile(badgeIconSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'rgba(7, 32, 44, 0.85)',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: "'Museo Sans', sans-serif",
              border: '1px solid rgba(16, 186, 27, 0.5)',
            }}
          >
            Alerta Meteorológica
          </div>
        </div>

        {/* Resource 3: Gotas golpeando ventana (Equal Size: 360x300) */}
        <div
          style={{
            flex: 1,
            height: '300px',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#07202C',
            border: '3px solid #10BA1B',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
            position: 'relative',
            transform: `scale(${scale3})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <OffthreadVideo
            src={staticFile(videoSrc)}
            volume={0}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'rgba(7, 32, 44, 0.85)',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: "'Museo Sans', sans-serif",
              border: '1px solid rgba(16, 186, 27, 0.5)',
            }}
          >
            Lluvias Intensas
          </div>
        </div>
      </div>

      {/* Bottom Title Card */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '18px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '3px solid #10BA1B',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#07202C',
              fontFamily: "'Museo', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#10BA1B',
              fontWeight: 600,
              marginTop: '3px',
              fontFamily: "'Museo Sans', sans-serif",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#07202C',
            color: '#FFFFFF',
            padding: '8px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #10BA1B',
            fontFamily: "'Museo Sans', sans-serif",
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10BA1B',
            }}
          />
          AMBIENTE
        </div>
      </div>
    </div>
  );
};
