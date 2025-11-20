import { Tokens, WorkingDraft } from "./types";

export const DEFAULT_TOKENS: Tokens = {
  modes: {
    light: {
      colors: {
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
      },
    },
    dark: {
      colors: {
        primary: "#8b90fe",
        "primary-foreground": "#1a1a1a",
        secondary: "#3c3f52",
        "secondary-foreground": "#e8eaf6",
        accent: "#b8e6b8",
        "accent-foreground": "#2d3d2d",
        background: "#262626",
        foreground: "#f7f7f7",
        card: "#2b2b2b",
        "card-foreground": "#f5f5f5",
        popover: "#2b2b2b",
        "popover-foreground": "#f5f5f5",
        muted: "#4a4a4a",
        "muted-foreground": "#bebebe",
        destructive: "#ef4444",
        "destructive-foreground": "#161616",
        border: "#424242",
        input: "#303030",
        ring: "#a5abff",
        "chart-1": "#8088f0",
        "chart-2": "#d69e0a",
        "chart-3": "#0eae75",
        "chart-4": "#db3e8d",
        "chart-5": "#09a3c1",
        sidebar: "#2b2b2b",
        "sidebar-foreground": "#f5f5f5",
        "sidebar-primary": "#8b90fe",
        "sidebar-primary-foreground": "#1a1a1a",
        "sidebar-accent": "#383a4a",
        "sidebar-accent-foreground": "#e3e5f1",
        "sidebar-border": "#3e3e3e",
        "sidebar-ring": "#a5abff",
      },
    },
  },
  shared: {
    typography: {
      "font-sans": "'Noto Sans KR', system-ui, sans-serif",
      "font-serif": "'Noto Serif KR', Georgia, serif",
      "font-mono": "ui-monospace, SFMono-Regular, Menlo, monospace",
      "tracking-normal": "0em",
    },
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
  },
};

export const createInitialWorkingDraft = (): WorkingDraft => ({
  sourcePresetId: null,
  tokens: DEFAULT_TOKENS,
  ui: {
    previewMode: "light",
    sidebarTab: "Colors",
    previewTab: "Components",
    expandedGroups: {}, // 기본값: 모든 그룹이 펼쳐진 상태 (undefined일 때 true로 처리)
  },
  dirty: false,
});

/**
 * DEFAULT_TOKENS를 기준으로 완전히 새로운 workingDraft를 생성합니다.
 * "Create New" 액션에서 사용됩니다.
 * structuredClone을 사용하여 깊은 복사를 수행합니다.
 */
export const createEmptyWorkingDraft = (): WorkingDraft => ({
  sourcePresetId: null,
  tokens: structuredClone(DEFAULT_TOKENS), // 깊은 복사
  ui: {
    previewMode: "light",
    sidebarTab: "Colors",
    previewTab: "Components",
    expandedGroups: {},
  },
  dirty: false,
});
