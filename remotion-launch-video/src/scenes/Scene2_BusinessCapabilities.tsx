import React, { CSSProperties } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";

const NAVY = "#1B2A4A";
const TEAL = "#0EA47A";
const BLUE = "#3B82F6";
const ORANGE = "#F59E0B";
const DARK = "#111827";
const GRAY = "#6B7280";
const BG = "#F2F4F7";

/* ── icon components (matching the slide exactly) ── */

const TruckIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect x="4" y="16" width="30" height="22" rx="3" stroke={NAVY} strokeWidth="2.8" />
    <path d="M34 22H43L48 30V38H34V22Z" stroke={NAVY} strokeWidth="2.8" strokeLinejoin="round" />
    <circle cx="15" cy="40" r="4.5" stroke={NAVY} strokeWidth="2.5" />
    <circle cx="41" cy="40" r="4.5" stroke={NAVY} strokeWidth="2.5" />
    {/* Boxes on truck */}
    <rect x="8" y="20" width="10" height="8" rx="1.5" fill={NAVY} opacity="0.15" />
    <rect x="20" y="20" width="10" height="8" rx="1.5" fill={NAVY} opacity="0.1" />
    <rect x="12" y="12" width="8" height="6" rx="1.5" fill={NAVY} opacity="0.12" />
  </svg>
);

const ForwardIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <polygon points="8,14 24,26 8,38" fill={TEAL} />
    <polygon points="24,14 40,26 24,38" fill={TEAL} />
  </svg>
);

const ShieldIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <path
      d="M26 4L44 14V28C44 39 26 49 26 49C26 49 8 39 8 28V14L26 4Z"
      fill={ORANGE}
    />
    <polyline
      points="17,27 23,33 36,20"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── card data ── */
interface CardInfo {
  icon: React.FC;
  iconBorder: string;
  title: string;
  bullets: { text: string; highlight?: boolean; borderColor?: string }[];
}

const cards: CardInfo[] = [
  {
    icon: TruckIcon,
    iconBorder: NAVY,
    title: "Logistics & Freight\nOptimization",
    bullets: [
      { text: "Maximize capacity by pooling multiple POs into single shipments for Full Truckloads (FTL)." },
      { text: "Zero-overhead scheduling to drastically reduce distribution center congestion." },
    ],
  },
  {
    icon: ForwardIcon,
    iconBorder: NAVY,
    title: "Frictionless\nFinance",
    bullets: [
      { text: "Seamlessly handle multiple invoices against a single blanket PO." },
      {
        text: "Automated 3-way matching drives faster reconciliation and reduced Payment Turnaround Time.",
        highlight: true,
        borderColor: TEAL,
      },
    ],
  },
  {
    icon: ShieldIcon,
    iconBorder: NAVY,
    title: "Defect-Free\nProcurement",
    bullets: [
      { text: "Real-time tracking upstream." },
      {
        text: "Drastically reduces Price (PDN), Quality (QDN), and Short-Supply Debit Notes.",
        highlight: true,
        borderColor: ORANGE,
      },
    ],
  },
];

/* ── browser dots component ── */
const BrowserDots: React.FC = () => (
  <div style={{ display: "flex", gap: 7, padding: "14px 18px" }}>
    <div style={{ width: 11, height: 11, borderRadius: "50%", background: NAVY, opacity: 0.7 }} />
    <div style={{ width: 11, height: 11, borderRadius: "50%", background: NAVY, opacity: 0.5 }} />
    <div style={{ width: 11, height: 11, borderRadius: "50%", background: NAVY, opacity: 0.3 }} />
  </div>
);

/* ── main scene ── */
export const Scene2_BusinessCapabilities: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame - 5, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        padding: "55px 70px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section title */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: DARK,
          marginBottom: 45,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [35, 0])}px)`,
        }}
      >
        Upgrading Your Business Capabilities
      </div>

      {/* Three cards */}
      <div style={{ display: "flex", gap: 36, flex: 1 }}>
        {cards.map((card, i) => {
          const cardIn = spring({ frame: frame - 15 - i * 10, fps, config: { damping: 13 } });
          const Icon = card.icon;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: "white",
                borderRadius: 18,
                border: `3px solid ${NAVY}`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                opacity: cardIn,
                transform: `translateY(${interpolate(cardIn, [0, 1], [60, 0])}px)`,
                boxShadow: "0 4px 24px rgba(27,42,74,0.08)",
              }}
            >
              {/* Browser chrome bar */}
              <div style={{ borderBottom: `1.5px solid ${NAVY}20` }}>
                <BrowserDots />
              </div>

              {/* Card content */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "28px 28px 32px",
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: "50%",
                    border: `3px solid ${NAVY}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 22,
                  }}
                >
                  <Icon />
                </div>

                {/* Card title */}
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 700,
                    color: DARK,
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    lineHeight: 1.15,
                    marginBottom: 24,
                  }}
                >
                  {card.title}
                </div>

                {/* Bullet cards */}
                {card.bullets.map((bullet, j) => {
                  const bulletIn = spring({
                    frame: frame - 35 - i * 10 - j * 8,
                    fps,
                    config: { damping: 13 },
                  });
                  const bColor = bullet.highlight ? bullet.borderColor || NAVY : NAVY;
                  return (
                    <div
                      key={j}
                      style={{
                        border: `2px solid ${bColor}`,
                        borderRadius: 10,
                        padding: "15px 18px",
                        marginBottom: j < card.bullets.length - 1 ? 12 : 0,
                        width: "100%",
                        opacity: bulletIn,
                        transform: `translateY(${interpolate(bulletIn, [0, 1], [18, 0])}px)`,
                      }}
                    >
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span
                          style={{
                            color: BLUE,
                            fontWeight: 800,
                            fontSize: 18,
                            lineHeight: "22px",
                            flexShrink: 0,
                          }}
                        >
                          &gt;
                        </span>
                        <span style={{ fontSize: 16.5, color: DARK, lineHeight: 1.45 }}>
                          {bullet.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
