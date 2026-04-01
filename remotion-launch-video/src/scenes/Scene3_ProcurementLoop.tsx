import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { colors } from "../styles";

const leftItems = [
  { label: "1. Bounded\nScheduling", sub: "(Guaranteed Capacity)" },
  { label: "2. Exact FSN\nMapping", sub: "(Zero Quantity Variance)" },
  { label: "3. 16-Digit OCR\nValidation", sub: "(Automated Intake)" },
];

const rightItems = [
  { label: "1. Elimination of\nDebit Notes", sub: "(PDN/QDN eradicated)" },
  { label: "2. Instant 3-Way\nMatching", sub: "(System automation)" },
  { label: "3. Faster Payment TAT", sub: "(Accelerated capital flow)" },
];

export const Scene3_ProcurementLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 12 } });
  const leftLabelProgress = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const rightLabelProgress = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const ringProgress = interpolate(frame - 25, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const centerProgress = spring({ frame: frame - 50, fps, config: { damping: 10 } });

  const cx = 960;
  const cy = 540;
  const radius = 220;

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Browser bar */}
      <div style={{ height: 36, background: colors.lightGray, display: "flex", alignItems: "center", paddingLeft: 16, gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.navy }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.navy }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.navy }} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: colors.darkText,
          textAlign: "center",
          marginTop: 30,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        The Defect-Free Procurement Loop
      </div>

      {/* Section labels */}
      <div style={{ display: "flex", justifyContent: "center", gap: 350, marginTop: 15 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.navy,
            opacity: leftLabelProgress,
          }}
        >
          Operational Discipline
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.teal,
            opacity: rightLabelProgress,
          }}
        >
          Financial Velocity
        </div>
      </div>

      {/* Infinity loop / double ring */}
      <svg
        width="1920"
        height="700"
        viewBox="0 0 1920 700"
        style={{ position: "absolute", top: 200 }}
      >
        {/* Left arc - Operational Discipline (navy) */}
        <circle
          cx={cx - 200}
          cy={340}
          r={radius}
          fill="none"
          stroke={colors.navy}
          strokeWidth="28"
          strokeDasharray={2 * Math.PI * radius}
          strokeDashoffset={2 * Math.PI * radius * (1 - ringProgress)}
          strokeLinecap="round"
        />
        {/* Right arc - Financial Velocity (teal) */}
        <circle
          cx={cx + 200}
          cy={340}
          r={radius}
          fill="none"
          stroke={colors.teal}
          strokeWidth="28"
          strokeDasharray={2 * Math.PI * radius}
          strokeDashoffset={2 * Math.PI * radius * (1 - ringProgress)}
          strokeLinecap="round"
        />

        {/* Center circle */}
        <circle
          cx={cx}
          cy={340}
          r={120}
          fill={colors.white}
          stroke="#E0E0E0"
          strokeWidth="2"
          opacity={centerProgress}
          filter="url(#shadow)"
        />
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00000020" />
          </filter>
        </defs>
      </svg>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: 440,
          left: cx - 110,
          width: 220,
          textAlign: "center",
          fontSize: 18,
          fontWeight: 600,
          color: colors.darkText,
          lineHeight: 1.5,
          opacity: centerProgress,
          transform: `scale(${interpolate(centerProgress, [0, 1], [0.8, 1])})`,
        }}
      >
        Strict UI compliance isn't just an operational requirement—it is the mechanism that protects and accelerates your revenue.
      </div>

      {/* Left items */}
      {leftItems.map((item, i) => {
        const itemProgress = spring({ frame: frame - 55 - i * 10, fps, config: { damping: 12 } });
        const angles = [-60, -150, -240];
        const angle = (angles[i] * Math.PI) / 180;
        const ix = cx - 200 + Math.cos(angle) * (radius + 80);
        const iy = 540 + Math.sin(angle) * (radius + 80);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ix - 120,
              top: iy - 30,
              width: 160,
              textAlign: "center",
              opacity: itemProgress,
              transform: `scale(${interpolate(itemProgress, [0, 1], [0.7, 1])})`,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: colors.lightGray, border: `2px solid ${colors.navy}`, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 20, height: 20, background: colors.navy, borderRadius: 4, opacity: 0.5 }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.navy, whiteSpace: "pre-line", lineHeight: 1.2 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: colors.gray }}>{item.sub}</div>
          </div>
        );
      })}

      {/* Right items */}
      {rightItems.map((item, i) => {
        const itemProgress = spring({ frame: frame - 60 - i * 10, fps, config: { damping: 12 } });
        const angles = [-120, -30, 60];
        const angle = (angles[i] * Math.PI) / 180;
        const ix = cx + 200 + Math.cos(angle) * (radius + 80);
        const iy = 540 + Math.sin(angle) * (radius + 80);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ix - 80,
              top: iy - 30,
              width: 160,
              textAlign: "center",
              opacity: itemProgress,
              transform: `scale(${interpolate(itemProgress, [0, 1], [0.7, 1])})`,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E6F9F3", border: `2px solid ${colors.teal}`, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 20, height: 20, background: colors.teal, borderRadius: 4, opacity: 0.5 }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.teal, whiteSpace: "pre-line", lineHeight: 1.2 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: colors.gray }}>{item.sub}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
