export type PreviewMode = "light" | "dark";
export type SidebarTab = "Colors" | "Typography" | "Others";
export type PreviewTab = "Components" | "Layouts";
export type LayoutStyle = "Brand" | "Commerce" | "Blog" | "Dashboard";

export interface Tokens {
  modes: {
    light: Record<string, any>;
    dark: Record<string, any>;
  };
  shared: Record<string, any>; // 공통 토큰 (radius, spacing, shadow 등)
}

export interface WorkingDraftUI {
  previewMode: PreviewMode;
  sidebarTab: SidebarTab;
  previewTab: PreviewTab;
  expandedGroups: Record<string, boolean>; // 사이드바 토큰 그룹들의 접힘/펼침 상태
  // 필요한 경우 여기 ui 전용 필드 추가
}

export interface WorkingDraft {
  sourcePresetId: string | null; // 어떤 preset에서 파생되었는지 (없으면 null)
  tokens: Tokens; // 항상 light + dark + shared 를 모두 포함
  ui: WorkingDraftUI; // previewMode 포함
  dirty: boolean; // 저장 여부 표시
}

export interface VersionSnapshot {
  id: string; // 예: "v001", "v002" 또는 timestamp 기반 ID
  label: string; // 예: "v001" (사용자 입력 X, 코드에서 자동 생성)
  createdAt: string; // ISO string
  tokens: Tokens; // 스냅샷 시점의 전체 tokens (light/dark/shared)
}

export interface Preset {
  schemaVersion: "1.3";
  id: string; // preset id (p_001 등)
  name: string; // "Modern", "Minimal" 등
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  tokens: Tokens; // 현재 preset의 최신 tokens 상태
  versions: VersionSnapshot[]; // 과거 스냅샷들 (최신 포함 가능)
}
