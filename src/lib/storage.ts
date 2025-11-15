import { WorkingDraft, Preset, VersionSnapshot } from "./types";

const WORKING_DRAFT_KEY = "workingDraft";

// WorkingDraft 저장/로드 (localStorage 사용 - 브라우저를 닫아도 유지)
export const saveWorkingDraft = (draft: WorkingDraft): void => {
  try {
    localStorage.setItem(WORKING_DRAFT_KEY, JSON.stringify(draft));
  } catch (error) {
    console.error("Failed to save workingDraft:", error);
  }
};

export const loadWorkingDraft = (): WorkingDraft | null => {
  try {
    const stored = localStorage.getItem(WORKING_DRAFT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // 기본 스키마 검증 (간단한 체크)
      if (
        parsed &&
        typeof parsed === "object" &&
        parsed.tokens &&
        parsed.ui &&
        typeof parsed.dirty === "boolean"
      ) {
        // 기존 데이터 호환성: sidebarTab, previewTab, expandedGroups가 없으면 기본값 설정
        const draft = parsed as WorkingDraft;
        if (!draft.ui.sidebarTab) {
          draft.ui.sidebarTab = "Colors";
        }
        if (!draft.ui.previewTab) {
          draft.ui.previewTab = "Components";
        }
        if (!draft.ui.expandedGroups) {
          draft.ui.expandedGroups = {};
        }
        return draft;
      }
    }
  } catch (error) {
    console.error("Failed to load workingDraft:", error);
  }
  return null;
};

// Preset 키 생성
export const buildPresetKey = (id: string): string => `modcn:preset:${id}`;

// Preset 저장/로드
export const savePreset = (preset: Preset): void => {
  try {
    const key = buildPresetKey(preset.id);
    localStorage.setItem(key, JSON.stringify(preset));
  } catch (error) {
    console.error("Failed to save preset:", error);
  }
};

export const loadPreset = (id: string): Preset | null => {
  try {
    const key = buildPresetKey(id);
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as Preset;
    }
  } catch (error) {
    console.error("Failed to load preset:", error);
  }
  return null;
};

// 모든 Preset 목록 가져오기 (localStorage에서 modcn:preset: 접두사로 시작하는 키 찾기)
export const listPresets = (): Preset[] => {
  const presets: Preset[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("modcn:preset:")) {
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const preset = JSON.parse(stored) as Preset;
            presets.push(preset);
          } catch (e) {
            console.error(`Failed to parse preset at key ${key}:`, e);
          }
        }
      }
    }
  } catch (error) {
    console.error("Failed to list presets:", error);
  }
  return presets;
};

// 버전 ID 생성
export const createVersionId = (index: number): string =>
  `v${String(index).padStart(3, "0")}`;

// 새 Preset 생성
export const createPresetFromWorkingDraft = (
  workingDraft: WorkingDraft,
  presetId: string,
  name: string
): Preset => {
  const now = new Date().toISOString();
  const initialTokens = workingDraft.tokens;

  const initialVersion: VersionSnapshot = {
    id: "v001",
    label: "v001",
    createdAt: now,
    tokens: initialTokens,
  };

  return {
    schemaVersion: "1.3",
    id: presetId,
    name,
    createdAt: now,
    updatedAt: now,
    tokens: initialTokens,
    versions: [initialVersion],
  };
};

// 기존 Preset에 저장 (버전 추가)
export const saveWorkingDraftToExistingPreset = (
  workingDraft: WorkingDraft,
  preset: Preset
): Preset => {
  const now = new Date().toISOString();
  const nextIndex = preset.versions.length + 1;
  const newVersionId = createVersionId(nextIndex);

  const newVersion: VersionSnapshot = {
    id: newVersionId,
    label: newVersionId,
    createdAt: now,
    tokens: workingDraft.tokens,
  };

  const updatedPreset: Preset = {
    ...preset,
    tokens: workingDraft.tokens,
    updatedAt: now,
    versions: [...preset.versions, newVersion],
  };

  return updatedPreset;
};

// Preset을 WorkingDraft에 적용
export const applyPresetToWorkingDraft = (
  preset: Preset,
  prevDraft: WorkingDraft
): WorkingDraft => ({
  ...prevDraft,
  sourcePresetId: preset.id,
  tokens: preset.tokens,
  ui: {
    ...prevDraft.ui,
    // previewMode는 유지
  },
  dirty: false,
});

// Export 기능은 추후 구현 예정
// TODO: Export / ExportJob 기능 구현
