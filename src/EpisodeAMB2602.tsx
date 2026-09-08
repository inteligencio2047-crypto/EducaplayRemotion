import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import DATA, { MotionBlock } from './data';
import { getFramingAtFrame } from './track';
import { SlotContainer } from './components/SlotContainer';
import { MediaCard } from './components/MediaCard';
import { ConceptCard } from './components/ConceptCard';
import { ActionCard } from './components/ActionCard';
import { StickerBadge } from './components/StickerBadge';
import { TitularCard } from './components/TitularCard';
import { StepHeaderCard } from './components/StepHeaderCard';
import { StepBodyCard } from './components/StepBodyCard';
import { AlertPill } from './components/AlertPill';
import { SentenceCaptions } from './components/SentenceCaptions';

export interface EpisodeAMB2602Props {
  includeMasterVideo?: boolean;
}

export const EpisodeAMB2602: React.FC<EpisodeAMB2602Props> = ({
  includeMasterVideo = true,
}) => {
  const frame = useCurrentFrame();
  const currentFraming = getFramingAtFrame(frame);

  // Smooth outro fade out to prevent abrupt ending at 3:06
  const outroFade = interpolate(frame, [4420, 4458], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const renderBlockContent = (block: MotionBlock, durationInFrames: number) => {
    switch (block.kind) {
      case 'titular_card':
        return (
          <TitularCard
            title={block.title}
            kicker={block.kicker}
            subtitle={block.subtitle}
            showAccentRule={block.showAccentRule ?? true}
          />
        );

      case 'step_header':
        return (
          <StepHeaderCard
            stepNumber={block.stepNumber}
            stepLabel={block.stepLabel}
            title={block.title}
            isCompact={block.category === 'small_left'}
          />
        );

      case 'step_body':
        return (
          <StepBodyCard
            items={block.items}
            footnote={block.footnote}
            isCompact={block.category === 'small_left'}
          />
        );

      case 'alert_pill':
        return <AlertPill text={block.text} iconType={block.iconType} />;

      case 'image_card':
        return (
          <MediaCard
            kind="image"
            src={block.src}
            title={block.title}
            caption={block.caption}
            source={block.source}
            isCompact={block.category === 'small_left'}
          />
        );

      case 'video_card':
        return (
          <MediaCard
            kind="video"
            src={block.src}
            title={block.title}
            caption={block.caption}
            source={block.source}
            clipFrom={block.clipFrom}
            isCompact={block.category === 'small_left'}
          />
        );

      case 'concept_card':
        return (
          <ConceptCard
            title={block.title}
            equation={block.equation}
            subtitle={block.subtitle}
            isCompact={block.category === 'small_left'}
          />
        );

      case 'action_card':
        return (
          <ActionCard
            title={block.title}
            imageSrc={block.imageSrc}
            items={block.items}
            isCompact={block.category === 'small_left'}
          />
        );

      case 'sticker_badge':
        return <StickerBadge text={block.text} icon={block.icon} />;

      default:
        return null;
    }
  };

  return (
    <AbsoluteFill style={{ backgroundColor: includeMasterVideo ? '#07202C' : 'transparent' }}>
      {/* 1. Base Video Master Track */}
      {includeMasterVideo && (
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile(DATA.meta.videoMaster)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      )}

      {/* 2. Motion Graphics Blocks with Integrated Entry & Exit SFX */}
      {DATA.blocks.map((block) => {
        const durationInFrames = block.to - block.from;
        return (
          <Sequence
            key={block.key}
            from={block.from}
            durationInFrames={durationInFrames}
          >
            {/* Entry Whoosh SFX */}
            <Audio
              src={staticFile('audio/whoosh_in.wav')}
              volume={0.25}
              startFrom={0}
            />

            {/* Exit Whoosh SFX (triggered 10 frames before block completion) */}
            {durationInFrames > 15 && (
              <Sequence from={durationInFrames - 10} durationInFrames={10}>
                <Audio
                  src={staticFile('audio/whoosh_out.wav')}
                  volume={0.20}
                  startFrom={0}
                />
              </Sequence>
            )}

            {/* Visual Block Container */}
            <SlotContainer
              framing={currentFraming}
              anchorX={block.anchorX}
              category={block.category}
              durationInFrames={durationInFrames}
            >
              {renderBlockContent(block, durationInFrames)}
            </SlotContainer>
          </Sequence>
        );
      })}

      {/* 3. Captions Layer */}
      <SentenceCaptions captions={DATA.captions} />

      {/* 4. Smooth Outro Fade-Out */}
      {includeMasterVideo && outroFade > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#07202C',
            opacity: outroFade,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
