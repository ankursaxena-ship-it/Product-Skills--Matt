import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";

const NAVY = "#1B2A4A";
const TEAL = "#0EA47A";
const DARK = "#111827";
const GRAY = "#6B7280";

/* Items around each ring */
const leftItems = [
  { label: "Bounded\nScheduling", sub: "(Guaranteed Capacity)", angle: -90 },
  { label: "Exact FSN\nMapping", sub: "(Zero Quantity Variance)", angle: -200 },
  { label: "16-Digit OCR\nValidation", sub: "(Automated Intake)", angle: -310 },
];

const rightItems = [
  { label: "Elimination of\nDebit Notes", sub: "(PDN/QDN eradicated)", angle: -70 },
  { label: "Instant 3-Way\nMatching", sub: "(System automation)", angle: -320 },
  { label: "Faster Payment TAT", sub: "(Accelerated capital flow)", angle: -200 },
];

const CX = 960; // center x of the whole composition
const CY = 530;
const RING_OFFSET = 210; // each ring center is offset by this from CX
const RING_R = 200;
const ITEM_R = 280; // radius at which labels sit

export const Scene3_ProcurementLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const leftLabelIn = spring({ frame: frame - 14, fps, config: { damping: 14 } });
  const rightLabelIn = spring({ frame: frame - 20, fps, config: { damping: 14 } });

  const ringDraw = interpolate(frame - 22, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circumference = 2 * Math.PI * RING_R;

  const centerIn = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 60 } });

  return (
    <AbsoluteFill style={{ background: "#FFFFFF", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Browser bar */}
      <div
        style={{
          height: 38,
          background: "#F2F4F7",
          display: "flex",
          alignItems: "center",
          paddingLeft: 18,
          gap: 7,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: NAVY, opacity: 0.7 }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: NAVY, opacity: 0.5 }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: NAVY, opacity: 0.3 }} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: DARK,
          textAlign: "center",
          marginTop: 35,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`,
        }}
      >
        The Defect-Free Procurement Loop
      </div>

      {/* Section labels */}
      <div style={{ display: "flex", justifyContent: "center", gap: 340, marginTop: 16 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: NAVY, opacity: leftLabelIn }}>
          Operational Discipline
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: TEAL, opacity: rightLabelIn }}>
          Financial Velocity
        </div>
      </div>

      {/* SVG rings */}
      <svg
        width={1920}
        height={700}
        viewBox={`0 0 1920 700`}
        style={{ position: "absolute", top: 200 }}
      >
        <defs>
          <filter id="centerShadow">
            <feDropShadow dx="0" dy="5" stdDeviation="12" floodColor="#00000015" />
          </filter>
        </defs>

        {/* Left ring – navy with subtle inner ring */}
        <circle
          cx={CX - RING_OFFSET}
          cy={CY - 200}
          r={RING_R}
          fill="none"
          stroke={NAVY}
          strokeWidth="32"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ringDraw)}
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle
          cx={CX - RING_OFFSET}
          cy={CY - 200}
          r={RING_R}
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeDasharray="8 18"
          opacity={ringDraw * 0.3}
        />

        {/* Right ring – teal */}
        <circle
          cx={CX + RING_OFFSET}
          cy={CY - 200}
          r={RING_R}
          fill="none"
          stroke={TEAL}
          strokeWidth="32"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ringDraw)}
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle
          cx={CX + RING_OFFSET}
          cy={CY - 200}
          r={RING_R}
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeDasharray="8 18"
          opacity={ringDraw * 0.3}
        />

        {/* Center circle – white with shadow */}
        <circle
          cx={CX}
          cy={CY - 200}
          r={115}
          fill="white"
          filter="url(#centerShadow)"
          opacity={centerIn}
        />
        <circle
          cx={CX}
          cy={CY - 200}
          r={115}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1.5"
          opacity={centerIn}
        />
      </svg>

      {/* Center quote text */}
      <div
        style={{
          position: "absolute",
          left: CX - 105,
          top: CY - 200 + 200 - 65,
          width: 210,
          textAlign: "center",
          fontSize: 16.5,
          fontWeight: 600,
          color: DARK,
          lineHeight: 1.55,
          opacity: centerIn,
          transform: `scale(${interpolate(centerIn, [0, 1], [0.85, 1])})`,
        }}
      >
        Strict UI compliance isn't just an operational requirement—it is the mechanism that protects and accelerates your revenue.
      </div>

      {/* Left ring labels */}
      {leftItems.map((item, i) => {
        const itemIn = spring({ frame: frame - 60 - i * 9, fps, config: { damping: 12 } });
        const rad = (item.angle * Math.PI) / 180;
        const ix = CX - RING_OFFSET + Math.cos(rad) * ITEM_R;
        const iy = CY - 200 + 200 + Math.sin(rad) * ITEM_R;

        return (
          <div
            key={`l${i}`}
            style={{
              position: "absolute",
              left: ix - 80,
              top: iy - 25,
              width: 160,
              textAlign: "center",
              opacity: itemIn,
              transform: `scale(${interpolate(itemIn, [0, 1], [0.6, 1])})`,
            }}
          >
            {/* Small icon badge */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "#F2F4F7",
                border: `2.5px solid ${NAVY}`,
                margin: "0 auto 6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <rect x="3" y="3" width="14" height="14" rx="2" fill="none" stroke={NAVY} strokeWidth="1.8" />
                <line x1="7" y1="8" x2="13" y2="8" stroke={NAVY} strokeWidth="1.2" />
                <line x1="7" y1="12" x2="11" y2="12" stroke={NAVY} strokeWidth="1.2" />
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, whiteSpace: "pre-line", lineHeight: 1.2 }}>
              {`${i + 1}. ${item.label}`}
            </div>
            <div style={{ fontSize: 12.5, color: GRAY, marginTop: 2 }}>{item.sub}</div>
          </div>
        );
      })}

      {/* Right ring labels */}
      {rightItems.map((item, i) => {
        const itemIn = spring({ frame: frame - 65 - i * 9, fps, config: { damping: 12 } });
        const rad = (item.angle * Math.PI) / 180;
        const ix = CX + RING_OFFSET + Math.cos(rad) * ITEM_R;
        const iy = CY - 200 + 200 + Math.sin(rad) * ITEM_R;

        return (
          <div
            key={`r${i}`}
            style={{
              position: "absolute",
              left: ix - 80,
              top: iy - 25,
              width: 160,
              textAlign: "center",
              opacity: itemIn,
              transform: `scale(${interpolate(itemIn, [0, 1], [0.6, 1])})`,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "#E6F9F3",
                border: `2.5px solid ${TEAL}`,
                margin: "0 auto 6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="7" fill="none" stroke={TEAL} strokeWidth="1.8" />
                <polyline points="7,10 9,13 14,7" fill="none" stroke={TEAL} strokeWidth="1.5" />
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: TEAL, whiteSpace: "pre-line", lineHeight: 1.2 }}>
              {`${i + 1}. ${item.label}`}
            </div>
            <div style={{ fontSize: 12.5, color: GRAY, marginTop: 2 }}>{item.sub}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
