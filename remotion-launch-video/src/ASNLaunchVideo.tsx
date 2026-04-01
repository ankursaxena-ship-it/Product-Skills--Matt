import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { Scene1_Title } from "./scenes/Scene1_Title";
import { Scene2_BusinessCapabilities } from "./scenes/Scene2_BusinessCapabilities";
import { Scene3_ProcurementLoop } from "./scenes/Scene3_ProcurementLoop";
import { Scene4_RulesOfEngagement } from "./scenes/Scene4_RulesOfEngagement";
import { Scene5_ASNJourney } from "./scenes/Scene5_ASNJourney";

const SCENE_DURATION = 180; // 6 seconds per scene at 30fps
const TRANSITION = 15; // 0.5s crossfade

interface TransitionWrapperProps {
  children: React.ReactNode;
  startFrame: number;
  duration: number;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  startFrame,
  duration,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const fadeIn = interpolate(relativeFrame, [0, TRANSITION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    relativeFrame,
    [duration - TRANSITION, duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};

export const ASNLaunchVideo: React.FC = () => {
  const scenes = [
    { component: Scene1_Title, from: 0 },
    { component: Scene2_BusinessCapabilities, from: SCENE_DURATION - TRANSITION },
    { component: Scene3_ProcurementLoop, from: (SCENE_DURATION - TRANSITION) * 2 },
    { component: Scene4_RulesOfEngagement, from: (SCENE_DURATION - TRANSITION) * 3 },
    { component: Scene5_ASNJourney, from: (SCENE_DURATION - TRANSITION) * 4 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#F0F2F5" }}>
      {scenes.map(({ component: Component, from }, i) => (
        <Sequence key={i} from={from} durationInFrames={SCENE_DURATION}>
          <TransitionWrapper startFrame={from} duration={SCENE_DURATION}>
            <Component />
          </TransitionWrapper>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
