import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";

const NAVY = "#1B2A4A";
const BLUE = "#3B82F6";
const DARK = "#111827";
const GRAY = "#6B7280";
const LIGHT_BG = "#EBF0F7";

interface Row {
  label: string;
  legacy: string;
  fki: string;
  fkiBold?: boolean;
}

const rows: Row[] = [
  {
    label: "Access Protocol:",
    legacy: "FKi Flow",
    fki: "Mandatory FKi 2.0 Suite Login",
  },
  {
    label: "PO Nomenclature:",
    legacy: "FFB, FGSWN identifiers",
    fki: "Unified FLS format",
  },
  {
    label: "Quantity Tolerance:",
    legacy: "Dummy or 1-Qty scheduling permitted",
    fki: "Strict Nominal Quantity Scheduling elimination; exact pending PO Qty matching required",
    fkiBold: true,
  },
  {
    label: "Invoice Formatting:",
    legacy: "Variable ID lengths",
    fki: "Strict 16-Digit OCR format (no exceptions)",
  },
];

/* Blue checkmark SVG */
const Check: React.FC<{ progress: number }> = ({ progress }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    style={{
      opacity: progress,
      transform: `scale(${interpolate(progress, [0, 1], [0.3, 1])})`,
      flexShrink: 0,
    }}
  >
    <polyline
      points="7,17 14,25 27,10"
      fill="none"
      stroke={BLUE}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="40"
      strokeDashoffset={interpolate(progress, [0, 1], [40, 0])}
    />
  </svg>
);

export const Scene4_RulesOfEngagement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame - 5, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(175deg, ${LIGHT_BG} 0%, #D4DFEE 100%)`,
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        padding: "55px 90px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 54,
          fontWeight: 800,
          color: DARK,
          fontStyle: "italic",
          marginBottom: 45,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`,
        }}
      >
        The New Operational Rules of Engagement
      </div>

      {/* Table container */}
      <div
        style={{
          background: "white",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 8px 48px rgba(0,0,0,0.07)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Column headers */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: 1,
              padding: "26px 44px",
              fontSize: 26,
              fontWeight: 600,
              color: GRAY,
              background: "#F8F9FB",
              borderBottom: "2px solid #E5E7EB",
            }}
          >
            Legacy Paradigm
          </div>
          <div
            style={{
              flex: 1,
              padding: "26px 44px",
              fontSize: 26,
              fontWeight: 700,
              color: NAVY,
              borderBottom: "2px solid #E5E7EB",
            }}
          >
            FKi 2.0 Requirements
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const rowIn = spring({ frame: frame - 18 - i * 10, fps, config: { damping: 13 } });
          const checkIn = spring({ frame: frame - 32 - i * 10, fps, config: { damping: 9, stiffness: 90 } });
          const isLast = i === rows.length - 1;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flex: 1,
                borderBottom: isLast ? "none" : "1px solid #F0F0F0",
                opacity: rowIn,
                transform: `translateX(${interpolate(rowIn, [0, 1], [50, 0])}px)`,
              }}
            >
              {/* Legacy column */}
              <div
                style={{
                  flex: 1,
                  padding: "22px 44px",
                  background: "#F8F9FB",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 700, color: DARK, marginBottom: 5 }}>
                  {row.label}
                </div>
                <div style={{ fontSize: 16.5, color: GRAY, lineHeight: 1.4 }}>
                  {row.legacy}
                </div>
              </div>

              {/* FKi 2.0 column */}
              <div
                style={{
                  flex: 1,
                  padding: "22px 44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: DARK, marginBottom: 5 }}>
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontSize: 16.5,
                      color: DARK,
                      fontWeight: row.fkiBold ? 700 : 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {row.fki}
                  </div>
                </div>
                <Check progress={checkIn} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
