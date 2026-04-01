import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { colors } from "../styles";

interface Row {
  label: string;
  legacy: string;
  fki: string;
  fkiBold?: boolean;
}

const rows: Row[] = [
  { label: "Access Protocol:", legacy: "FKi Flow", fki: "Mandatory FKi 2.0 Suite Login" },
  { label: "PO Nomenclature:", legacy: "FFB, FGSWN identifiers", fki: "Unified FLS format" },
  {
    label: "Quantity Tolerance:",
    legacy: "Dummy or 1-Qty scheduling permitted",
    fki: "Strict Nominal Quantity Scheduling elimination; exact pending PO Qty matching required",
    fkiBold: true,
  },
  { label: "Invoice Formatting:", legacy: "Variable ID lengths", fki: "Strict 16-Digit OCR format (no exceptions)" },
];

export const Scene4_RulesOfEngagement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #EBF0F7 0%, #D8E3EF 100%)`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: "60px 100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: colors.darkText,
          marginBottom: 50,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        The New Operational Rules of Engagement
      </div>

      {/* Table container */}
      <div
        style={{
          background: colors.white,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          flex: 1,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", borderBottom: "2px solid #E0E0E0" }}>
          <div
            style={{
              flex: 1,
              padding: "28px 40px",
              fontSize: 28,
              fontWeight: 700,
              color: colors.gray,
              background: colors.lightGray,
            }}
          >
            Legacy Paradigm
          </div>
          <div
            style={{
              flex: 1,
              padding: "28px 40px",
              fontSize: 28,
              fontWeight: 700,
              color: colors.navy,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            FKi 2.0 Requirements
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const rowProgress = spring({ frame: frame - 20 - i * 12, fps, config: { damping: 12 } });
          const checkProgress = spring({ frame: frame - 35 - i * 12, fps, config: { damping: 10, stiffness: 100 } });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                borderBottom: i < rows.length - 1 ? "1px solid #E8E8E8" : "none",
                opacity: rowProgress,
                transform: `translateX(${interpolate(rowProgress, [0, 1], [40, 0])}px)`,
              }}
            >
              {/* Legacy */}
              <div style={{ flex: 1, padding: "24px 40px", background: colors.lightGray }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: colors.darkText, marginBottom: 6 }}>
                  {row.label}
                </div>
                <div style={{ fontSize: 17, color: colors.gray }}>{row.legacy}</div>
              </div>

              {/* FKi 2.0 */}
              <div style={{ flex: 1, padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: colors.darkText, marginBottom: 6 }}>
                    {row.label}
                  </div>
                  <div style={{ fontSize: 17, color: colors.darkText, fontWeight: row.fkiBold ? 700 : 400 }}>
                    {row.fki}
                  </div>
                </div>

                {/* Checkmark */}
                <div
                  style={{
                    opacity: checkProgress,
                    transform: `scale(${interpolate(checkProgress, [0, 1], [0, 1])})`,
                    marginLeft: 20,
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <polyline
                      points="8,18 15,26 28,10"
                      fill="none"
                      stroke={colors.blue}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
