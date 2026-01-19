// constants/theme.ts

import type { TrayMeta, ThemeColors } from "../types";


export const TRAY_META: Record<string, TrayMeta> = {
  info: { accent: "#3b82f6", status: "정보 안내" },
  success: { accent: "#22c55e", status: "완료 안내" },
  warning: { accent: "#f59e0b", status: "보안 주의" },
  error: { accent: "#ef4444", status: "보안 위험" },
};

export const THEME: Record<string, ThemeColors> = {
  dark: {
    bg: "#1a1c2b",
    panel: "#242740",
    header: "#2C2F4C",
    hover: "#2e3253",
    text: "rgba(255, 255, 255, 0.87)",
    muted: "#9CA3AF",
    border: "#2e3253",
    accent: "#818cf8",
  },
  light: {
    bg: "#ffffff",
    panel: "#ffffff",
    header: "#ffffff",
    hover: "#f3f4f6",
    text: "#213547",
    muted: "#4B5563",
    border: "#e5e7eb",
    accent: "#4f46e5",
  },
};