export interface WorkingDraft {
  colors: Record<string, string>;
  typography: Record<string, string>;
  others: Record<string, any>;
}

export type PreviewMode = "light" | "dark";
export type SidebarTab = "Colors" | "Typography" | "Others";
export type PreviewTab = "Components" | "Layouts";
export type PresetName = "Default" | "Modern" | "Minimal";
