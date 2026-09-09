import React from 'react';
import {
  AbsoluteFill,
  getRemotionEnvironment,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import DATA, { MARKS, MotionBlock } from './data';
import { getFramingAtFrame } from './track';
import { SlotContainer } from './components/SlotContainer';
import { MediaCard } from './components/MediaCard';
import { TitularCard } from './components/TitularCard';
import { SentenceCaptions } from './components/SentenceCaptions';

export interface EpisodeEEF002Props {
  includeMasterVideo?: boolean;
}

export const EpisodeEEF002: React.FC<EpisodeEEF002Props> = ({
  includeMasterVideo = true,
}) => {
  const frame = useCurrentFrame();
  const currentFraming = getFramingAtFrame(frame);
  const isRendering = getRemotionEnvironment().isRendering;

  const outroFade = interpolate(
    frame,
    [MARKS.outroFadeStart, MARKS.totalFrames - 2],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const renderBlockContent = (block: MotionBlock) => {
    switch (block.kind) {
      case 'media_card':
        return (
          <MediaCard
            kind={block.isVideo ? 'video' : 'image'}
            src={block.src}
            title={block.title}
            caption={block.caption}
            isCompact={block.category === 'small_left'}
            isLarge={block.category === 'large_center'}
          />
        );
      case 'titular_card':
        return (
          <TitularCard
            title={block.title}
            subtitle={block.subtitle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill style={{ backgroundColor: includeMasterVideo ? '#000' : 'transparent' }}>
      {/* 1. Master Video layer */}
      {includeMasterVideo && (
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile('master.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      )}

      {/* 2. Motion Graphics Blocks Layer */}
      <AbsoluteFill>
        {DATA.blocks.map((block) => {
          const durationInFrames = block.to - block.from;
          return (
            <Sequence
              key={block.key}
              name={block.name}
              from={block.from}
              durationInFrames={durationInFrames}
            >
              <SlotContainer
                blockKey={block.key}
                category={block.category}
                anchorX={block.anchorX}
                framing={currentFraming}
                from={block.from}
                to={block.to}
                durationInFrames={durationInFrames}
              >
                {renderBlockContent(block)}
              </SlotContainer>
            </Sequence>
          );
        })}
      </AbsoluteFill>

      {/* 3. Subtitles Layer */}
      <SentenceCaptions captions={DATA.captions} />

      {/* 4. Outro Fade */}
      {includeMasterVideo && (
        <AbsoluteFill
          style={{
            backgroundColor: '#000',
            opacity: outroFade,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
