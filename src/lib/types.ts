export interface ColorModes {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface WorkingDraft {
  modes: {
    light: {
      colors: Record<string, string>;
    };
    dark: {
      colors: Record<string, string>;
    };
  };
  shared: {
    typography: Record<string, string>;
    others: Record<string, any>;
  };
}

export type PreviewMode = "light" | "dark";
export type SidebarTab = "Colors" | "Typography" | "Others";
export type PreviewTab = "Components" | "Layouts";
export type PresetName = "Default" | "Modern" | "Minimal";
export type LayoutStyle = "Brand" | "Commerce" | "Blog" | "Dashboard";
