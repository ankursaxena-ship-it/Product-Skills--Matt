import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../styles";

export const Scene1_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const subtitleProgress = spring({ frame: frame - 25, fps, config: { damping: 12 } });
  const tabletProgress = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 80 } });
  const lineGrow = interpolate(frame - 60, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const nodeDelays = [70, 85, 100, 115];
  const nodeLabels = ["CREATION", "VALIDATION", "TRANSMISSION", "ACKNOWLEDGMENT"];
  const nodePositions = [260, 560, 860, 1160];

  const glowPulse = Math.sin(frame * 0.06) * 0.4 + 0.6;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.lightGray} 0%, #E2EAF2 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Grid background */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.08 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="1920" y2={i * 60} stroke={colors.navy} strokeWidth="1" />
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="1080" stroke={colors.navy} strokeWidth="1" />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          fontSize: 90,
          fontWeight: 800,
          color: colors.darkText,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
          marginBottom: 10,
          letterSpacing: -2,
        }}
      >
        Mastering ASN Operations
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 44,
          color: colors.gray,
          fontWeight: 400,
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [30, 0])}px)`,
          marginBottom: 60,
        }}
      >
        The Complete Vendor Hub Lifecycle Guide
      </div>

      {/* Tablet icon */}
      <div
        style={{
          opacity: tabletProgress,
          transform: `scale(${interpolate(tabletProgress, [0, 1], [0.5, 1])})`,
          marginBottom: 50,
        }}
      >
        <svg width="140" height="160" viewBox="0 0 140 160">
          <rect x="15" y="5" width="110" height="150" rx="12" fill={colors.lightBlue} stroke={colors.blue} strokeWidth="3" />
          <text x="70" y="50" textAnchor="middle" fontSize="28" fontWeight="bold" fill={colors.navy}>ASN</text>
          <rect x="30" y="65" width="80" height="6" rx="3" fill={colors.blue} opacity="0.3" />
          <rect x="30" y="80" width="60" height="6" rx="3" fill={colors.blue} opacity="0.3" />
          <rect x="30" y="95" width="70" height="6" rx="3" fill={colors.blue} opacity="0.3" />
          <rect x="30" y="115" width="35" height="20" rx="4" fill={colors.blue} opacity="0.2" />
          <rect x="75" y="115" width="35" height="20" rx="4" fill={colors.teal} opacity="0.2" />
        </svg>
      </div>

      {/* Timeline */}
      <svg width="1420" height="80" style={{ position: "relative" }}>
        {/* Line */}
        <line
          x1="260"
          y1="30"
          x2={interpolate(lineGrow, [0, 1], [260, 1160])}
          y2="30"
          stroke={colors.blue}
          strokeWidth="3"
        />

        {/* Nodes */}
        {nodePositions.map((x, i) => {
          const nodeProgress = spring({ frame: frame - nodeDelays[i], fps, config: { damping: 10 } });
          return (
            <g key={i} opacity={nodeProgress}>
              {/* Glow */}
              <circle cx={x} cy={30} r={18} fill={colors.blue} opacity={glowPulse * 0.3} />
              {/* Node */}
              <circle cx={x} cy={30} r={10} fill={colors.blue} stroke={colors.white} strokeWidth="3" />
              {/* Label */}
              <text
                x={x}
                y={65}
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill={colors.darkText}
                letterSpacing="2"
              >
                {nodeLabels[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
