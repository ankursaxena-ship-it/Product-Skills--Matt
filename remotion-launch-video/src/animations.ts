import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useFadeIn = (delay = 0) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useSlideUp = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`,
  };
};

export const useSlideIn = (direction: "left" | "right", delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const offset = direction === "left" ? -100 : 100;
  return {
    opacity: progress,
    transform: `translateX(${interpolate(progress, [0, 1], [offset, 0])}px)`,
  };
};

export const useScale = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 80 } });
  return {
    opacity: progress,
    transform: `scale(${interpolate(progress, [0, 1], [0.5, 1])})`,
  };
};

export const useGlow = (delay = 0) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin((frame - delay) * 0.08) * 0.3 + 0.7;
  return frame > delay ? pulse : 0;
};

export const useLineGrow = (delay = 0) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delay, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
