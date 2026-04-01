import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const NAVY = "#1B2A4A";
const BLUE = "#3B82F6";
const LIGHT_BG = "#F2F4F7";
const DARK_TEXT = "#111827";
const GRAY_TEXT = "#6B7280";

export const Scene1_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered animations
  const titleIn = spring({ frame: frame - 8, fps, config: { damping: 14 } });
  const subIn = spring({ frame: frame - 22, fps, config: { damping: 14 } });
  const tabletIn = spring({ frame: frame - 36, fps, config: { damping: 11, stiffness: 70 } });
  const lineGrow = interpolate(frame - 55, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = [
    { label: "CREATION", x: 240 },
    { label: "VALIDATION", x: 540 },
    { label: "TRANSMISSION", x: 840 },
    { label: "ACKNOWLEDGMENT", x: 1140 },
  ];

  const glow = Math.sin(frame * 0.07) * 0.35 + 0.65;

  return (
    <AbsoluteFill style={{ background: LIGHT_BG, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Subtle cross-hatch grid */}
      <svg style={{ position: "absolute", inset: 0, width: 1920, height: 1080, opacity: 0.045 }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <React.Fragment key={`g${i}`}>
            <line x1={0} y1={i * 48} x2={1920} y2={i * 48} stroke={NAVY} strokeWidth="0.8" />
            <line x1={i * 48} y1={0} x2={i * 48} y2={1080} stroke={NAVY} strokeWidth="0.8" />
          </React.Fragment>
        ))}
        {/* Diagonal accent lines through center */}
        <line x1={600} y1={200} x2={1320} y2={700} stroke={NAVY} strokeWidth="0.6" opacity="0.5" />
        <line x1={1320} y1={200} x2={600} y2={700} stroke={NAVY} strokeWidth="0.6" opacity="0.5" />
        <line x1={700} y1={180} x2={1220} y2={720} stroke={NAVY} strokeWidth="0.6" opacity="0.3" />
        <line x1={1220} y1={180} x2={700} y2={720} stroke={NAVY} strokeWidth="0.6" opacity="0.3" />
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 110,
          width: "100%",
          textAlign: "center",
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [50, 0])}px)`,
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 900, color: DARK_TEXT, letterSpacing: -3, lineHeight: 1 }}>
          Mastering ASN Operations
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 230,
          width: "100%",
          textAlign: "center",
          opacity: subIn,
          transform: `translateY(${interpolate(subIn, [0, 1], [30, 0])}px)`,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 400, color: GRAY_TEXT, letterSpacing: -0.5 }}>
          The Complete Vendor Hub Lifecycle Guide
        </div>
      </div>

      {/* Tablet / Document Icon */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: "50%",
          transform: `translateX(-50%) scale(${interpolate(tabletIn, [0, 1], [0.4, 1])}) rotate(${interpolate(tabletIn, [0, 1], [-8, 0])}deg)`,
          opacity: tabletIn,
        }}
      >
        <svg width="180" height="210" viewBox="0 0 180 210">
          {/* Tablet body */}
          <rect x="18" y="8" width="144" height="194" rx="16" fill="#E8F0FE" stroke="#B4C6E0" strokeWidth="2.5" />
          <rect x="18" y="8" width="144" height="194" rx="16" fill="url(#tabletGrad)" />
          <defs>
            <linearGradient id="tabletGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0F6FF" />
              <stop offset="100%" stopColor="#D6E4F5" />
            </linearGradient>
          </defs>

          {/* ASN header text */}
          <text x="90" y="62" textAnchor="middle" fontSize="36" fontWeight="800" fontStyle="italic" fill={NAVY}>
            ASN
          </text>

          {/* Document lines */}
          <rect x="38" y="82" width="104" height="7" rx="3.5" fill={BLUE} opacity="0.18" />
          <rect x="38" y="98" width="80" height="7" rx="3.5" fill={BLUE} opacity="0.14" />
          <rect x="38" y="114" width="92" height="7" rx="3.5" fill={BLUE} opacity="0.18" />

          {/* Mini charts at bottom */}
          <rect x="38" y="136" width="42" height="28" rx="5" fill={BLUE} opacity="0.08" />
          <rect x="38" y="140" width="8" height="20" rx="2" fill={BLUE} opacity="0.3" transform="translate(4,0)" />
          <rect x="38" y="145" width="8" height="15" rx="2" fill={BLUE} opacity="0.25" transform="translate(16,0)" />
          <rect x="38" y="138" width="8" height="22" rx="2" fill={BLUE} opacity="0.35" transform="translate(28,0)" />

          <rect x="92" y="136" width="50" height="28" rx="5" fill={BLUE} opacity="0.08" />
          {/* Checkmark icon */}
          <circle cx="107" cy="150" r="8" fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.3" />
          <circle cx="127" cy="150" r="8" fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.3" />

          {/* Screen edge highlight */}
          <rect x="20" y="10" width="140" height="40" rx="14" fill="white" opacity="0.15" />
        </svg>
      </div>

      {/* Timeline */}
      <svg
        width="1380"
        height="90"
        viewBox="0 0 1380 90"
        style={{ position: "absolute", top: 680, left: 270 }}
      >
        {/* Connecting line */}
        <line
          x1={nodes[0].x}
          y1={30}
          x2={interpolate(lineGrow, [0, 1], [nodes[0].x, nodes[3].x])}
          y2={30}
          stroke={BLUE}
          strokeWidth="3.5"
        />

        {/* Nodes */}
        {nodes.map((node, i) => {
          const nodeIn = spring({
            frame: frame - 65 - i * 12,
            fps,
            config: { damping: 10 },
          });
          return (
            <g key={i} opacity={nodeIn}>
              {/* Outer glow */}
              <circle cx={node.x} cy={30} r={22} fill={BLUE} opacity={glow * 0.18} />
              {/* Mid ring */}
              <circle cx={node.x} cy={30} r={14} fill={BLUE} opacity={0.25} />
              {/* Core dot */}
              <circle cx={node.x} cy={30} r={8} fill={BLUE} stroke="white" strokeWidth="3" />
              {/* Label */}
              <text
                x={node.x}
                y={70}
                textAnchor="middle"
                fontSize="17"
                fontWeight="700"
                fill={DARK_TEXT}
                letterSpacing="2.5"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
