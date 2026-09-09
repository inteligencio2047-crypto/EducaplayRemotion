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
  // 1. small_left: Teacher centered -> Resource on LEFT (compact ~560px)
  // 2. medium_right: Teacher centered/left -> Resource on RIGHT (medium ~680px)
  // 3. large_center: Teacher OFF / Fullscreen -> Resource in CENTER (large ~1180px or Full)
  let effectiveAnchor: AnchorX = anchorX;
  if (category === 'small_left') effectiveAnchor = 'left';
  if (category === 'medium_right') effectiveAnchor = 'right';
  if (category === 'large_center' || framing === 'none') effectiveAnchor = 'center';

  let containerMaxWidth = maxWidth;
  if (!containerMaxWidth) {
    if (effectiveAnchor === 'left') containerMaxWidth = 580;
    else if (effectiveAnchor === 'right') containerMaxWidth = 680;
    else containerMaxWidth = 1180;
  }

  const containerMaxHeight = maxHeight || (effectiveAnchor === 'center' ? 700 : 640);

  // Top position calculation:
  // For 'right' anchor: push down to 260px to safely clear the top-right mosca logo
  // For 'left' anchor: align at 240px
  // For 'center': center vertically in upper-mid space
  let topPos = '240px';
  if (effectiveAnchor === 'center') {
    topPos = '130px';
  } else if (effectiveAnchor === 'right') {
    topPos = '260px';
  } else if (effectiveAnchor === 'left') {
    topPos = '240px';
  }

  let leftPos = 'auto';
  let rightPos = 'auto';
  let transformX = '0%';

  if (effectiveAnchor === 'right') {
    rightPos = '80px';
  } else if (effectiveAnchor === 'left') {
    leftPos = '80px';
  } else {
    leftPos = '50%';
    transformX = '-50%';
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
        transform: `translateX(${transformX}) scale(${scale})`,
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
