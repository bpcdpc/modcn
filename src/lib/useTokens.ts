/**
 * useTokens.ts
 * 
 * M2: Token 편집을 위한 React hooks
 * 
 * Purpose:
 * - 컴포넌트에서 토큰 값을 읽고 수정
 * - mode별 색상 처리
 * - 자동 dirty 상태 업데이트 + sessionStorage 저장
 * 
 * Usage:
 * const { setToken } = useTokens();
 * setToken('colors', 'primary', '#ff0000', 'light');
 */

import { useCallback } from "react";
import { useDraftStore } from "@/store/useDraftStore";
import { saveDraft } from "./storage";
import { PreviewMode } from "./types";

export function useTokens() {
  const { workingDraft, setWorkingDraft, previewMode, setDirty } =
    useDraftStore();

  /**
   * 토큰 값 설정
   * @param category - 'colors' | 'typography' | 'others'
   * @param key - 토큰 키
   * @param value - 새 값
   * @param mode - (colors only) 'light' | 'dark'
   */
  const setToken = useCallback(
    (
      category: "colors" | "typography" | "others",
      key: string,
      value: any,
      mode?: PreviewMode
    ) => {
      const newDraft = { ...workingDraft };

      if (category === "colors") {
        const targetMode = mode || previewMode;
        newDraft.modes[targetMode].colors = {
          ...newDraft.modes[targetMode].colors,
          [key]: value,
        };
      } else {
        // typography or others
        newDraft.shared[category] = {
          ...newDraft.shared[category],
          [key]: value,
        };
      }

      setWorkingDraft(newDraft);
      setDirty(true);

      // debounced save (300ms)
      setTimeout(() => {
        saveDraft(newDraft);
      }, 300);
    },
    [workingDraft, previewMode, setWorkingDraft, setDirty]
  );

  /**
   * 현재 preview mode 반환
   */
  const getCurrentMode = useCallback(() => {
    return previewMode;
  }, [previewMode]);

  /**
   * 현재 mode의 색상 토큰 반환
   */
  const getColors = useCallback(
    (mode?: PreviewMode) => {
      const targetMode = mode || previewMode;
      return workingDraft.modes[targetMode].colors;
    },
    [workingDraft, previewMode]
  );

  /**
   * Typography 토큰 반환
   */
  const getTypography = useCallback(() => {
    return workingDraft.shared.typography;
  }, [workingDraft]);

  /**
   * Others 토큰 반환
   */
  const getOthers = useCallback(() => {
    return workingDraft.shared.others;
  }, [workingDraft]);

  return {
    setToken,
    getCurrentMode,
    getColors,
    getTypography,
    getOthers,
  };
}

