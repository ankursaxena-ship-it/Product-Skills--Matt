import { CSSProperties } from "react";

export const colors = {
  navy: "#1B2A4A",
  darkNavy: "#0F1B33",
  teal: "#00B894",
  green: "#10AC84",
  blue: "#2E86DE",
  lightBlue: "#E8F4FD",
  orange: "#F0932B",
  white: "#FFFFFF",
  lightGray: "#F0F2F5",
  gray: "#6C757D",
  darkText: "#1A1A2E",
};

export const fullScreen: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export const gradientBg: CSSProperties = {
  ...fullScreen,
  background: `linear-gradient(135deg, ${colors.lightGray} 0%, ${colors.lightBlue} 100%)`,
};
