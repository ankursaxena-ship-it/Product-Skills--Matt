import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { colors } from "../styles";

const phases = [
  {
    num: "1. Schedule",
    desc: "Select warehouse locations, preferred dates, and pool eligible POs.",
    active: true,
  },
  {
    num: "2. Edit",
    desc: "Lock in bounded scheduling to guarantee PO availability.",
    active: false,
  },
  {
    num: "3. Prepare",
    desc: "Map specific FSNs exactly to your Scheduled Quantities to reach Dispatch Ready.",
    active: false,
  },
  {
    num: "4. Dispatch",
    desc: "Assign valid 16-digit invoices to matched FSNs and dispatch to the network.",
    active: false,
  },
];

export const Scene5_ASNJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 12 } });
  const lineGrow = interpolate(frame - 30, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cardWidth = 310;
  const gap = 60;
  const totalWidth = phases.length * cardWidth + (phases.length - 1) * gap;
  const startX = (1920 - totalWidth) / 2;

  return (
    <AbsoluteFill
      style={{
        background: colors.lightGray,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* "You Are Here" badge */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: startX - 10,
          opacity: spring({ frame: frame - 15, fps, config: { damping: 12 } }),
        }}
      >
        <div
          style={{
            background: colors.teal,
            color: colors.white,
            padding: "10px 18px",
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          You Are<br />Here
        </div>
        <div style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: `12px solid ${colors.teal}`, margin: "0 auto" }} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: colors.navy,
          marginTop: 80,
          marginBottom: 80,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
          marginLeft: 120,
        }}
      >
        The 4-Phase ASN Journey
      </div>

      {/* Timeline connector line */}
      <svg width="1920" height="20" style={{ position: "absolute", top: 370 }}>
        <line
          x1={startX + cardWidth / 2}
          y1={10}
          x2={interpolate(lineGrow, [0, 1], [startX + cardWidth / 2, startX + totalWidth - cardWidth / 2])}
          y2={10}
          stroke={colors.navy}
          strokeWidth="4"
          opacity="0.3"
        />
      </svg>

      {/* Phase cards */}
      <div style={{ display: "flex", gap, marginTop: 40 }}>
        {phases.map((phase, i) => {
          const cardProgress = spring({ frame: frame - 25 - i * 15, fps, config: { damping: 12 } });
          const isActive = phase.active;
          const borderColor = isActive ? colors.teal : colors.navy;

          return (
            <div
              key={i}
              style={{
                width: cardWidth,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: cardProgress,
                transform: `translateY(${interpolate(cardProgress, [0, 1], [40, 0])}px)`,
              }}
            >
              {/* Circle node */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: `5px solid ${borderColor}`,
                  background: isActive ? colors.teal : colors.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 0,
                  position: "relative",
                  boxShadow: isActive ? `0 0 30px ${colors.teal}40` : "none",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: colors.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Icon placeholder */}
                  <svg width="30" height="30" viewBox="0 0 30 30">
                    {i === 0 && <rect x="5" y="5" width="20" height="20" rx="3" fill="none" stroke={colors.teal} strokeWidth="2" />}
                    {i === 1 && <rect x="8" y="5" width="14" height="20" rx="3" fill="none" stroke={colors.navy} strokeWidth="2" />}
                    {i === 2 && (
                      <>
                        <line x1="5" y1="8" x2="5" y2="22" stroke={colors.navy} strokeWidth="3" />
                        <line x1="10" y1="5" x2="10" y2="25" stroke={colors.navy} strokeWidth="2" />
                        <line x1="15" y1="10" x2="15" y2="20" stroke={colors.navy} strokeWidth="3" />
                        <line x1="20" y1="7" x2="20" y2="23" stroke={colors.navy} strokeWidth="2" />
                        <line x1="25" y1="12" x2="25" y2="18" stroke={colors.navy} strokeWidth="3" />
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <rect x="3" y="10" width="18" height="14" rx="2" fill="none" stroke={colors.navy} strokeWidth="2" />
                        <circle cx="10" cy="22" r="3" fill="none" stroke={colors.navy} strokeWidth="2" />
                        <circle cx="22" cy="22" r="3" fill="none" stroke={colors.navy} strokeWidth="2" />
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* Phase card body */}
              <div
                style={{
                  background: colors.white,
                  borderRadius: 14,
                  border: `2px solid ${borderColor}20`,
                  padding: "25px 20px",
                  textAlign: "center",
                  marginTop: 20,
                  width: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: isActive ? colors.teal : colors.navy,
                    marginBottom: 12,
                  }}
                >
                  {phase.num}
                </div>
                <div style={{ fontSize: 16, color: colors.gray, lineHeight: 1.5 }}>
                  {phase.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
