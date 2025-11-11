import { WorkingDraft } from "./types";

export const defaultColors = {
  primary: "#6366f1",
  "primary-foreground": "#fafafa",
  secondary: "#e8eaf6",
  "secondary-foreground": "#3c3f52",
  accent: "#e1f5e1",
  "accent-foreground": "#2d4d2d",
  background: "#ffffff",
  foreground: "#262626",
  card: "#ffffff",
  "card-foreground": "#262626",
  popover: "#ffffff",
  "popover-foreground": "#262626",
  muted: "#f3f3f3",
  "muted-foreground": "#808080",
  destructive: "#ef4444",
  "destructive-foreground": "#fafafa",
  border: "#e5e5e5",
  input: "#ffffff",
  ring: "#8b90fe",
  "chart-1": "#6366f1",
  "chart-2": "#f59e0b",
  "chart-3": "#10b981",
  "chart-4": "#ec4899",
  "chart-5": "#06b6d4",
  sidebar: "#fafafa",
  "sidebar-foreground": "#333333",
  "sidebar-primary": "#7c7ff5",
  "sidebar-primary-foreground": "#fafafa",
  "sidebar-accent": "#eff0fd",
  "sidebar-accent-foreground": "#404152",
  "sidebar-border": "#ebebeb",
  "sidebar-ring": "#8b90fe",
};

export const defaultTypography = {
  "font-sans": "'Noto Sans KR', system-ui, sans-serif",
  "font-serif": "'Noto Serif KR', Georgia, serif",
  "font-mono": "ui-monospace, SFMono-Regular, Menlo, monospace",
  "tracking-normal": "0em",
};

export const defaultOthers = {
  radius: "0.5rem",
  spacing: "0.25rem",
  shadow: {
    "shadow-color": "#333333",
    "shadow-opacity": 0.2,
    "shadow-blur": "24px",
    "shadow-spread": "0px",
    "shadow-x": "0px",
    "shadow-y": "0px",
  },
};

export const defaultDraft: WorkingDraft = {
  colors: defaultColors,
  typography: defaultTypography,
  others: defaultOthers,
};
