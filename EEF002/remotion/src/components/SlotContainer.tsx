import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Framing } from '../track';
import { ResourceCategory } from '../data';

export type AnchorX = 'left' | 'right' | 'center';

export interface SlotContainerProps {
  framing: Framing;
  anchorX?: AnchorX;
  category?: ResourceCategory;
  maxWidth?: number;
  maxHeight?: number;
  durationInFrames?: number;
  children: React.ReactNode;
}

export const SlotContainer: React.FC<SlotContainerProps> = ({
  framing,
  anchorX = 'right',
  category,
  maxWidth,
  maxHeight,
  durationInFrames = 100,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Smooth entrance spring
  const spr = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const scale = interpolate(spr, [0, 1], [0.92, 1]);

  // Fade In at start (12 frames) and Fade Out at end (12 frames)
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = fadeIn * fadeOut;

  // Determine effective anchor and sizing based on 3-category standard:
  // 1. small_left: Teacher centered -> Resource/Titular on LEFT (compact ~500px, left: 200px, top: 260px)
  // 2. medium_right: Teacher centered/left -> Resource on RIGHT (medium ~680px, right: 80px, top: 260px)
  // 3. large_center: Teacher OFF / Fullscreen -> Video/Resource CENTERED Vertically & Horizontally (large ~1480px)
  let effectiveAnchor: AnchorX = anchorX;
  if (category === 'small_left') effectiveAnchor = 'left';
  if (category === 'medium_right') effectiveAnchor = 'right';
  if (category === 'large_center' || framing === 'none') effectiveAnchor = 'center';

  let containerMaxWidth = maxWidth;
  if (!containerMaxWidth) {
    if (effectiveAnchor === 'left') containerMaxWidth = 520;
    else if (effectiveAnchor === 'right') containerMaxWidth = 680;
    else containerMaxWidth = 1480;
  }

  const containerMaxHeight = maxHeight || (effectiveAnchor === 'center' ? 880 : 640);

  // Posicionamiento calibrado:
  // - Para 'right': top: 260px para salvar la mosca institucional
  // - Para 'left': top: 260px (misma altura que la derecha) y left: 200px (a 200px del margen izquierdo)
  // - Para 'center' (Carga alta / docente fuera de cuadro): centrado perfecto vertical y horizontal
  let topPos = '260px';
  let leftPos = 'auto';
  let rightPos = 'auto';
  let transformStr = `scale(${scale})`;

  if (effectiveAnchor === 'center') {
    topPos = '50%';
    leftPos = '50%';
    transformStr = `translate(-50%, -50%) scale(${scale})`;
  } else if (effectiveAnchor === 'right') {
    topPos = '260px';
    rightPos = '80px';
  } else if (effectiveAnchor === 'left') {
    topPos = '260px';
    leftPos = '200px';
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: topPos,
        left: leftPos,
        right: rightPos,
        width: `${containerMaxWidth}px`,
        maxHeight: `${containerMaxHeight}px`,
        transform: transformStr,
        opacity,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: effectiveAnchor === 'center' ? 'center' : 'flex-start',
        pointerEvents: 'none',
        fontFamily: "'Museo Sans', 'Museo', system-ui, -apple-system, sans-serif",
      }}
    >
      {children}
    </div>
  );
};
