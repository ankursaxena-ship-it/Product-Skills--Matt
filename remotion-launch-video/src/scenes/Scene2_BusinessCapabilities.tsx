import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { colors } from "../styles";

interface CardData {
  icon: string;
  iconColor: string;
  title: string;
  bullets: string[];
  highlightIndex?: number;
  highlightColor?: string;
}

const cards: CardData[] = [
  {
    icon: "truck",
    iconColor: colors.navy,
    title: "Logistics & Freight\nOptimization",
    bullets: [
      "Maximize capacity by pooling multiple POs into single shipments for Full Truckloads (FTL).",
      "Zero-overhead scheduling to drastically reduce distribution center congestion.",
    ],
  },
  {
    icon: "forward",
    iconColor: colors.teal,
    title: "Frictionless\nFinance",
    bullets: [
      "Seamlessly handle multiple invoices against a single blanket PO.",
      "Automated 3-way matching drives faster reconciliation and reduced Payment Turnaround Time.",
    ],
    highlightIndex: 1,
    highlightColor: colors.teal,
  },
  {
    icon: "shield",
    iconColor: colors.orange,
    title: "Defect-Free\nProcurement",
    bullets: [
      "Real-time tracking upstream.",
      "Drastically reduces Price (PDN), Quality (QDN), and Short-Supply Debit Notes.",
    ],
    highlightIndex: 1,
    highlightColor: colors.orange,
  },
];

const TruckIcon: React.FC = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <rect x="5" y="15" width="28" height="22" rx="3" fill="none" stroke={colors.navy} strokeWidth="2.5" />
    <path d="M33 22 H42 L47 30 V37 H33 Z" fill="none" stroke={colors.navy} strokeWidth="2.5" />
    <circle cx="15" cy="40" r="4" fill="none" stroke={colors.navy} strokeWidth="2.5" />
    <circle cx="40" cy="40" r="4" fill="none" stroke={colors.navy} strokeWidth="2.5" />
    <rect x="10" y="20" width="8" height="3" rx="1" fill={colors.navy} opacity="0.3" />
    <rect x="10" y="26" width="12" height="3" rx="1" fill={colors.navy} opacity="0.3" />
  </svg>
);

const ForwardIcon: React.FC = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <polygon points="10,12 28,25 10,38" fill={colors.teal} />
    <polygon points="24,12 42,25 24,38" fill={colors.teal} />
  </svg>
);

const ShieldIcon: React.FC = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <path d="M25 5 L42 14 V28 C42 38 25 47 25 47 C25 47 8 38 8 28 V14 Z" fill={colors.orange} />
    <polyline points="17,26 23,32 35,20" fill="none" stroke={colors.white} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icons: Record<string, React.FC> = { truck: TruckIcon, forward: ForwardIcon, shield: ShieldIcon };

export const Scene2_BusinessCapabilities: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.lightGray} 0%, #E8EDF3 100%)`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: "60px 80px",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          color: colors.darkText,
          marginBottom: 50,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        Upgrading Your Business Capabilities
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "stretch" }}>
        {cards.map((card, i) => {
          const cardProgress = spring({ frame: frame - 20 - i * 12, fps, config: { damping: 12 } });
          const IconComponent = icons[card.icon];

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: colors.white,
                borderRadius: 16,
                border: `2.5px solid ${colors.navy}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px 30px",
                opacity: cardProgress,
                transform: `translateY(${interpolate(cardProgress, [0, 1], [50, 0])}px)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Browser dots */}
              <div style={{ position: "absolute", top: 12, left: 16, display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.navy }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.navy }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.navy }} />
              </div>

              {/* Icon circle */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: `3px solid ${colors.navy}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <IconComponent />
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: colors.darkText,
                  textAlign: "center",
                  marginBottom: 25,
                  whiteSpace: "pre-line",
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </div>

              {/* Bullets */}
              {card.bullets.map((bullet, j) => {
                const bulletProgress = spring({
                  frame: frame - 40 - i * 12 - j * 10,
                  fps,
                  config: { damping: 12 },
                });
                const isHighlight = card.highlightIndex === j;

                return (
                  <div
                    key={j}
                    style={{
                      border: `2px solid ${isHighlight ? card.highlightColor || colors.navy : colors.navy}`,
                      borderRadius: 10,
                      padding: "14px 18px",
                      marginBottom: 12,
                      width: "100%",
                      opacity: bulletProgress,
                      transform: `translateY(${interpolate(bulletProgress, [0, 1], [20, 0])}px)`,
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: colors.blue, fontWeight: 700, fontSize: 18 }}>&gt;</span>
                      <span style={{ fontSize: 17, color: colors.darkText, lineHeight: 1.4 }}>{bullet}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
