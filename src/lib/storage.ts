import { WorkingDraft } from "./types";

const STORAGE_KEY = "modcn-draft";

export const saveDraft = (draft: WorkingDraft): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    console.log("Draft saved to sessionStorage");
  } catch (error) {
    console.error("Failed to save draft:", error);
  }
};

export const loadDraft = (): WorkingDraft | null => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load draft:", error);
  }
  return null;
};

export const exportDraft = (draft: WorkingDraft): void => {
  console.log("Exporting draft:", draft);
  alert("Export functionality - Draft logged to console");
};
