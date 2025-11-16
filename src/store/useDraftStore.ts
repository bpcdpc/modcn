import { create } from "zustand";
import { WorkingDraft, SidebarTab, PreviewTab, LayoutStyle } from "@/lib/types";
import { createInitialWorkingDraft } from "@/lib/defaults";
import {
  saveWorkingDraft,
  loadWorkingDraft,
  applyPresetToWorkingDraft,
  loadPreset,
  savePreset,
  createPresetFromWorkingDraft,
  saveWorkingDraftToExistingPreset,
  createPresetId,
} from "@/lib/storage";

// 디바운스 저장을 위한 타임아웃 ID
let saveTimeoutId: ReturnType<typeof setTimeout> | null = null;

// 모듈 로드 시점에 동기적으로 초기 workingDraft 로드
// 이렇게 하면 첫 렌더링부터 올바른 값으로 시작
const getInitialWorkingDraft = (): WorkingDraft => {
  const loaded = loadWorkingDraft();
  if (loaded) {
    return loaded;
  }
  // 저장된 데이터가 없으면 기본값 생성 및 저장
  const initial = createInitialWorkingDraft();
  saveWorkingDraft(initial);
  return initial;
};

// 모듈 로드 시점에 초기값 계산 (동기적)
const initialDraft = getInitialWorkingDraft();

interface DraftStore {
  // Data
  workingDraft: WorkingDraft;
  isReady: boolean; // 초기 렌더링 완료 여부

  // UI State (workingDraft.ui에 포함되지 않는 전역 UI 상태)
  sidebarTab: SidebarTab;
  previewTab: PreviewTab;
  layoutStyle: LayoutStyle;
  sidebarOpen: boolean;

  // Actions
  setWorkingDraft: (draft: WorkingDraft) => void;
  updateTokens: (tokens: WorkingDraft["tokens"]) => void;
  setPreviewMode: (mode: WorkingDraft["ui"]["previewMode"]) => void;
  setSidebarTab: (tab: SidebarTab) => void;
  setPreviewTab: (tab: PreviewTab) => void;
  setExpandedGroups: (expanded: Record<string, boolean>) => void;
  setLayoutStyle: (style: LayoutStyle) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  applyPreset: (presetId: string) => void;
  saveAsNewPreset: (name: string) => void;
  saveToCurrentPreset: () => void;
  markAsReady: () => void;
}

// 디바운스 저장 함수
const debouncedSave = (draft: WorkingDraft) => {
  if (saveTimeoutId) {
    clearTimeout(saveTimeoutId);
  }
  saveTimeoutId = setTimeout(() => {
    saveWorkingDraft(draft);
    saveTimeoutId = null;
  }, 500);
};

export const useDraftStore = create<DraftStore>((set, get) => ({
  // Initial state - 동기적으로 로드된 데이터 사용
  workingDraft: initialDraft,
  isReady: false, // 초기 렌더링 완료 전까지 false
  sidebarTab: initialDraft.ui.sidebarTab || "Colors",
  previewTab: initialDraft.ui.previewTab || "Components",
  layoutStyle: "Brand",
  sidebarOpen: false,

  // Actions
  setWorkingDraft: (draft) => {
    set((state) => {
      const prev = state.workingDraft;
      const tokensChanged =
        JSON.stringify(prev.tokens) !== JSON.stringify(draft.tokens);
      const sourcePresetIdChanged =
        prev.sourcePresetId !== draft.sourcePresetId;

      return {
        workingDraft: {
          ...draft,
          dirty: tokensChanged || sourcePresetIdChanged ? true : prev.dirty,
        },
      };
    });
    const { workingDraft } = get();
    debouncedSave(workingDraft);
  },

  updateTokens: (tokens) => {
    set((state) => {
      const prev = state.workingDraft;
      const tokensChanged =
        JSON.stringify(prev.tokens) !== JSON.stringify(tokens);

      return {
        workingDraft: {
          ...prev,
          tokens,
          dirty: tokensChanged ? true : prev.dirty,
        },
      };
    });
    const { workingDraft } = get();
    debouncedSave(workingDraft);
  },

  setPreviewMode: (mode) => {
    set((state) => {
      const prev = state.workingDraft;
      return {
        workingDraft: {
          ...prev,
          ui: {
            ...prev.ui,
            previewMode: mode,
          },
        },
      };
    });
  },

  setSidebarTab: (tab) => {
    set((state) => {
      const prev = state.workingDraft;
      return {
        workingDraft: {
          ...prev,
          ui: {
            ...prev.ui,
            sidebarTab: tab,
          },
        },
        sidebarTab: tab,
      };
    });
  },

  setPreviewTab: (tab) => {
    set((state) => {
      const prev = state.workingDraft;
      return {
        workingDraft: {
          ...prev,
          ui: {
            ...prev.ui,
            previewTab: tab,
          },
        },
        previewTab: tab,
      };
    });
  },

  setExpandedGroups: (expanded) => {
    set((state) => {
      const prev = state.workingDraft;
      return {
        workingDraft: {
          ...prev,
          ui: {
            ...prev.ui,
            expandedGroups: expanded,
          },
        },
      };
    });
  },

  setLayoutStyle: (style) => set({ layoutStyle: style }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  applyPreset: (presetId) => {
    const preset = loadPreset(presetId);
    if (preset) {
      const { workingDraft } = get();
      const updatedDraft = applyPresetToWorkingDraft(preset, workingDraft);
      set({ workingDraft: updatedDraft });
      debouncedSave(updatedDraft);
    }
  },

  saveAsNewPreset: (name) => {
    const { workingDraft } = get();

    // 1) 새 preset ID 생성
    const presetId = createPresetId();

    // 2) WorkingDraft → Preset (첫 버전 포함)
    const preset = createPresetFromWorkingDraft(workingDraft, presetId, name);

    // 3) localStorage에 preset 저장
    savePreset(preset);

    // 4) WorkingDraft 업데이트: sourcePresetId 설정 + dirty=false
    const updatedDraft: WorkingDraft = {
      ...workingDraft,
      sourcePresetId: presetId,
      dirty: false,
    };

    set({ workingDraft: updatedDraft });

    // 5) WorkingDraft도 저장 (즉시 반영)
    saveWorkingDraft(updatedDraft);
  },

  saveToCurrentPreset: () => {
    const { workingDraft } = get();

    // 현재 preset에 연결되지 않은 경우 아무 것도 하지 않음 (추후 UX 개선 가능)
    if (!workingDraft.sourcePresetId) {
      return;
    }

    const preset = loadPreset(workingDraft.sourcePresetId);
    if (!preset) {
      return;
    }

    // 1) 기존 preset에 새 버전 추가
    const updatedPreset = saveWorkingDraftToExistingPreset(
      workingDraft,
      preset
    );

    // 2) preset 저장
    savePreset(updatedPreset);

    // 3) WorkingDraft dirty=false (저장 완료)
    const updatedDraft: WorkingDraft = {
      ...workingDraft,
      dirty: false,
    };

    set({ workingDraft: updatedDraft });
    saveWorkingDraft(updatedDraft);
  },

  markAsReady: () => {
    set({ isReady: true });
  },
}));
