import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { Scene1_Title } from "./scenes/Scene1_Title";
import { Scene2_BusinessCapabilities } from "./scenes/Scene2_BusinessCapabilities";
import { Scene3_ProcurementLoop } from "./scenes/Scene3_ProcurementLoop";
import { Scene4_RulesOfEngagement } from "./scenes/Scene4_RulesOfEngagement";
import { Scene5_ASNJourney } from "./scenes/Scene5_ASNJourney";

/*
 * Demo-style pacing:
 * - Each scene gets ~7 seconds (210 frames at 30fps) so a viewer can absorb
 *   the content the way a founder would pause on each slide.
 * - 20-frame crossfade between scenes for smooth transitions.
 * - Total: ~33 seconds
 */
const SCENE_FRAMES = 210;
const XFADE = 20;
const STEP = SCENE_FRAMES - XFADE; // effective step between scene starts

const scenes = [
  Scene1_Title,
  Scene2_BusinessCapabilities,
  Scene3_ProcurementLoop,
  Scene4_RulesOfEngagement,
  Scene5_ASNJourney,
];

const SceneWrapper: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, XFADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - XFADE, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
};

export const ASNLaunchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F2F4F7" }}>
      {scenes.map((Component, i) => (
        <Sequence key={i} from={i * STEP} durationInFrames={SCENE_FRAMES}>
          <SceneWrapper durationInFrames={SCENE_FRAMES}>
            <Component />
          </SceneWrapper>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
