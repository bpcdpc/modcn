import { create } from "zustand";
import { WorkingDraft, SidebarTab, PreviewTab, LayoutStyle } from "@/lib/types";
import { createInitialWorkingDraft } from "@/lib/defaults";
import {
  saveWorkingDraft,
  loadWorkingDraft,
  applyPresetToWorkingDraft,
  loadPreset,
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
  setLayoutStyle: (style: LayoutStyle) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  applyPreset: (presetId: string) => void;
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
    const updatedDraft = { ...draft, dirty: true };
    set({ workingDraft: updatedDraft });
    debouncedSave(updatedDraft);
  },

  updateTokens: (tokens) => {
    const { workingDraft } = get();
    const updatedDraft: WorkingDraft = {
      ...workingDraft,
      tokens,
      dirty: true,
    };
    set({ workingDraft: updatedDraft });
    debouncedSave(updatedDraft);
  },

  setPreviewMode: (mode) => {
    const { workingDraft } = get();
    const updatedDraft: WorkingDraft = {
      ...workingDraft,
      ui: {
        ...workingDraft.ui,
        previewMode: mode,
      },
      dirty: true,
    };
    set({ workingDraft: updatedDraft });
    debouncedSave(updatedDraft);
  },

  setSidebarTab: (tab) => {
    const { workingDraft } = get();
    const updatedDraft: WorkingDraft = {
      ...workingDraft,
      ui: {
        ...workingDraft.ui,
        sidebarTab: tab,
      },
      dirty: true,
    };
    set({ workingDraft: updatedDraft, sidebarTab: tab });
    debouncedSave(updatedDraft);
  },
  setPreviewTab: (tab) => {
    const { workingDraft } = get();
    const updatedDraft: WorkingDraft = {
      ...workingDraft,
      ui: {
        ...workingDraft.ui,
        previewTab: tab,
      },
      dirty: true,
    };
    set({ workingDraft: updatedDraft, previewTab: tab });
    debouncedSave(updatedDraft);
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

  markAsReady: () => {
    set({ isReady: true });
  },
}));
