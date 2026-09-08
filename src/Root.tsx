import React from 'react';
import { Composition } from 'remotion';
import { EpisodeAMB2602 } from './EpisodeAMB2602';
import DATA from './data';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full episode with primer corte master video */}
      <Composition
        id="EpisodeAMB2602"
        component={EpisodeAMB2602}
        durationInFrames={DATA.meta.durationInFrames}
        fps={DATA.meta.fps}
        width={1920}
        height={1080}
        defaultProps={{
          includeMasterVideo: true,
        }}
      />

      {/* Full episode Alpha Overlay (Only Motion Graphics, Subtitles and SFX with transparent background) */}
      <Composition
        id="EpisodeAMB2602-Overlay"
        component={EpisodeAMB2602}
        durationInFrames={DATA.meta.durationInFrames}
        fps={DATA.meta.fps}
        width={1920}
        height={1080}
        defaultProps={{
          includeMasterVideo: false,
        }}
      />

      {/* 1-Minute Test Alpha Overlay (60 seconds = 1440 frames at 23.976 fps) */}
      <Composition
        id="EpisodeAMB2602-Overlay-1Min"
        component={EpisodeAMB2602}
        durationInFrames={1440}
        fps={DATA.meta.fps}
        width={1920}
        height={1080}
        defaultProps={{
          includeMasterVideo: false,
        }}
      />
    </>
  );
};
