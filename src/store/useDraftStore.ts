import { create } from "zustand";
import {
  WorkingDraft,
  PreviewMode,
  SidebarTab,
  PreviewTab,
  PresetName,
  LayoutStyle,
} from "@/lib/types";
import { defaultDraft } from "@/lib/defaults";
import { saveDraft, loadDraft } from "@/lib/storage";

interface DraftStore {
  // Data
  workingDraft: WorkingDraft;
  dirty: boolean;

  // UI State
  previewMode: PreviewMode;
  sidebarTab: SidebarTab;
  previewTab: PreviewTab;
  layoutStyle: LayoutStyle;
  currentPreset: PresetName;

  // Actions
  setWorkingDraft: (draft: WorkingDraft) => void;
  setDirty: (dirty: boolean) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setSidebarTab: (tab: SidebarTab) => void;
  setPreviewTab: (tab: PreviewTab) => void;
  setLayoutStyle: (style: LayoutStyle) => void;
  setCurrentPreset: (preset: PresetName) => void;
  save: () => void;
  load: () => void;
}

export const useDraftStore = create<DraftStore>((set, get) => ({
  // Initial state
  workingDraft: defaultDraft,
  dirty: false,
  previewMode: "light",
  sidebarTab: "Colors",
  previewTab: "Components",
  layoutStyle: "Brand",
  currentPreset: "Default",

  // Actions
  setWorkingDraft: (draft) => set({ workingDraft: draft, dirty: true }),
  setDirty: (dirty) => set({ dirty }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  setPreviewTab: (tab) => set({ previewTab: tab }),
  setLayoutStyle: (style) => set({ layoutStyle: style }),
  setCurrentPreset: (preset) => set({ currentPreset: preset }),

  save: () => {
    const { workingDraft } = get();
    saveDraft(workingDraft);
    set({ dirty: false });
  },

  load: () => {
    const draft = loadDraft();
    if (draft) {
      set({ workingDraft: draft, dirty: false });
    }
  },
}));
