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
const BG = "#F2F4F7";

const phases = [
  {
    num: "1",
    name: "Schedule",
    desc: "Select warehouse locations, preferred dates, and pool eligible POs.",
    active: true,
    icon: "calendar",
  },
  {
    num: "2",
    name: "Edit",
    desc: "Lock in bounded scheduling to guarantee PO availability.",
    active: false,
    icon: "lock",
  },
  {
    num: "3",
    name: "Prepare",
    desc: "Map specific FSNs exactly to your Scheduled Quantities to reach Dispatch Ready.",
    active: false,
    icon: "barcode",
  },
  {
    num: "4",
    name: "Dispatch",
    desc: "Assign valid 16-digit invoices to matched FSNs and dispatch to the network.",
    active: false,
    icon: "truck",
  },
];

/* Small SVG icons for each phase */
const PhaseIcon: React.FC<{ icon: string; color: string }> = ({ icon, color }) => {
  const s = color;
  switch (icon) {
    case "calendar":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="6" width="20" height="18" rx="3" stroke={s} strokeWidth="2" />
          <line x1="4" y1="12" x2="24" y2="12" stroke={s} strokeWidth="1.5" />
          <line x1="10" y1="4" x2="10" y2="8" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="4" x2="18" y2="8" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <polyline points="10,18 13,21 19,15" fill="none" stroke={s} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="7" y="12" width="14" height="12" rx="3" stroke={s} strokeWidth="2" />
          <path d="M10 12V9C10 6.8 11.8 5 14 5C16.2 5 18 6.8 18 9V12" fill="none" stroke={s} strokeWidth="2" />
          <circle cx="14" cy="18" r="1.5" fill={s} />
        </svg>
      );
    case "barcode":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          {[4, 8, 12, 16, 20, 24].map((x, i) => (
            <line key={i} x1={x} y1={6} x2={x} y2={22} stroke={s} strokeWidth={i % 2 === 0 ? 2.5 : 1.5} />
          ))}
        </svg>
      );
    case "truck":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="9" width="16" height="12" rx="2" stroke={s} strokeWidth="1.8" />
          <path d="M19 13H23L26 17V21H19V13Z" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="9" cy="22" r="2.5" stroke={s} strokeWidth="1.5" />
          <circle cx="23" cy="22" r="2.5" stroke={s} strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
};

export const Scene5_ASNJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const badgeIn = spring({ frame: frame - 12, fps, config: { damping: 10, stiffness: 80 } });

  const CARD_W = 300;
  const GAP = 55;
  const TOTAL_W = phases.length * CARD_W + (phases.length - 1) * GAP;
  const START_X = (1920 - TOTAL_W) / 2;

  const lineGrow = interpolate(frame - 28, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const NODE_Y = 380;

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* "You Are Here" badge */}
      <div
        style={{
          position: "absolute",
          top: NODE_Y - 130,
          left: START_X + CARD_W / 2 - 38,
          opacity: badgeIn,
          transform: `translateY(${interpolate(badgeIn, [0, 1], [-15, 0])}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: TEAL,
            color: "white",
            padding: "9px 16px",
            borderRadius: 18,
            fontSize: 14,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          You Are<br />Here
        </div>
        {/* Triangle pointer */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderTop: `10px solid ${TEAL}`,
            margin: "0 auto",
          }}
        />
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 75,
          left: START_X + 120,
          fontSize: 50,
          fontWeight: 800,
          color: NAVY,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [25, 0])}px)`,
        }}
      >
        The 4-Phase ASN Journey
      </div>

      {/* Timeline connector line */}
      <svg width={1920} height={10} style={{ position: "absolute", top: NODE_Y + 45 }}>
        <line
          x1={START_X + CARD_W / 2}
          y1={5}
          x2={interpolate(lineGrow, [0, 1], [
            START_X + CARD_W / 2,
            START_X + TOTAL_W - CARD_W / 2,
          ])}
          y2={5}
          stroke={NAVY}
          strokeWidth="4"
          opacity="0.2"
        />
      </svg>

      {/* Phase cards */}
      {phases.map((phase, i) => {
        const cardIn = spring({
          frame: frame - 22 - i * 12,
          fps,
          config: { damping: 13 },
        });
        const isActive = phase.active;
        const accentColor = isActive ? TEAL : NAVY;
        const cx = START_X + i * (CARD_W + GAP) + CARD_W / 2;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - CARD_W / 2,
              top: NODE_Y - 55,
              width: CARD_W,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: cardIn,
              transform: `translateY(${interpolate(cardIn, [0, 1], [45, 0])}px)`,
            }}
          >
            {/* Circle node */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: `5px solid ${accentColor}`,
                background: isActive ? TEAL : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isActive
                  ? `0 0 0 8px ${TEAL}20, 0 0 30px ${TEAL}30`
                  : `0 2px 12px rgba(0,0,0,0.06)`,
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Inner white circle */}
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhaseIcon icon={phase.icon} color={accentColor} />
              </div>
            </div>

            {/* Card body */}
            <div
              style={{
                background: "white",
                borderRadius: 16,
                padding: "24px 22px",
                marginTop: 18,
                width: "100%",
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                border: `1.5px solid ${accentColor}15`,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: accentColor,
                  marginBottom: 10,
                }}
              >
                {phase.num}. {phase.name}
              </div>
              <div style={{ fontSize: 15.5, color: GRAY, lineHeight: 1.5 }}>
                {phase.desc}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
