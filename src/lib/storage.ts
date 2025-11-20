import { WorkingDraft, Preset, PresetVersion } from "./types";

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
          draft.ui.previewTab = "Cards";
        }
        // 마이그레이션: layouts → cards
        if (draft.ui.previewTab === "Layouts") {
          draft.ui.previewTab = "Cards";
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
// createdAt 기준 오름차순 정렬 (가장 오래된 것부터)
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
  // createdAt 기준 내림차순 정렬 (가장 최신 것부터)
  return presets.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
};

// 버전 ID 생성
export const createVersionId = (index: number): string =>
  `v${String(index).padStart(3, "0")}`;

// Preset ID 생성 (간단 버전: timestamp 기반)
export const createPresetId = (): string => {
  // Example: "p_mbdn3k0s"
  return `p_${Date.now().toString(36)}`;
};

// 새 Preset 생성
export const createPresetFromWorkingDraft = (
  workingDraft: WorkingDraft,
  presetId: string,
  name: string
): Preset => {
  const now = new Date().toISOString();
  const initialTokens = workingDraft.tokens;

  const initialVersion: PresetVersion = {
    versionId: "v001",
    name: "v001", // later we can make this more human-readable
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

  const newVersion: PresetVersion = {
    versionId: newVersionId,
    name: newVersionId, // same as versionId for now
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

// Preset 이름 변경
export const renamePreset = (id: string, newName: string): void => {
  try {
    const preset = loadPreset(id);
    if (!preset) {
      return;
    }

    const now = new Date().toISOString();
    const updatedPreset: Preset = {
      ...preset,
      name: newName,
      updatedAt: now,
    };

    savePreset(updatedPreset);
  } catch (error) {
    console.error("Failed to rename preset:", error);
  }
};

// Preset 삭제
export const deletePreset = (id: string): void => {
  try {
    const key = buildPresetKey(id);
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to delete preset:", error);
  }
};

// Export 기능은 추후 구현 예정
// TODO: Export / ExportJob 기능 구현
