import React from 'react';
import { Composition } from 'remotion';
import { EpisodeEEF002 } from './EpisodeEEF002';
import DATA from './data';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master preview with video */}
      <Composition
        id="EpisodeEEF002"
        component={EpisodeEEF002}
        durationInFrames={DATA.meta.durationInFrames}
        fps={DATA.meta.fps}
        width={1920}
        height={1080}
        defaultProps={{
          includeMasterVideo: true,
        }}
      />

      {/* Alpha overlay for editing in Premiere */}
      <Composition
        id="EpisodeEEF002-Overlay"
        component={EpisodeEEF002}
        durationInFrames={DATA.meta.durationInFrames}
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
