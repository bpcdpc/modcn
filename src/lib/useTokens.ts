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
import { PreviewMode } from "./types";

export function useTokens() {
  const { workingDraft, updateTokens } = useDraftStore();
  const previewMode = workingDraft.ui.previewMode;

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
      const targetMode = mode || previewMode;
      const currentMode = workingDraft.tokens.modes[targetMode];
      const colors = (currentMode?.colors as Record<string, string>) || {};

      if (category === "colors") {
        updateTokens({
          ...workingDraft.tokens,
          modes: {
            ...workingDraft.tokens.modes,
            [targetMode]: {
              ...currentMode,
              colors: {
                ...colors,
                [key]: value,
              },
            },
          },
        });
      } else if (category === "typography") {
        const typography = (workingDraft.tokens.shared.typography as Record<string, string>) || {};
        updateTokens({
          ...workingDraft.tokens,
          shared: {
            ...workingDraft.tokens.shared,
            typography: {
              ...typography,
              [key]: value,
            },
          },
        });
      } else {
        // others
        updateTokens({
          ...workingDraft.tokens,
          shared: {
            ...workingDraft.tokens.shared,
            [key]: value,
          },
        });
      }
    },
    [workingDraft, previewMode, updateTokens]
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
      const currentMode = workingDraft.tokens.modes[targetMode];
      return (currentMode?.colors as Record<string, string>) || {};
    },
    [workingDraft, previewMode]
  );

  /**
   * Typography 토큰 반환
   */
  const getTypography = useCallback(() => {
    return (workingDraft.tokens.shared.typography as Record<string, string>) || {};
  }, [workingDraft]);

  /**
   * Others 토큰 반환
   */
  const getOthers = useCallback(() => {
    // others는 shared에서 typography를 제외한 나머지
    const { typography, ...others } = workingDraft.tokens.shared;
    return others;
  }, [workingDraft]);

  return {
    setToken,
    getCurrentMode,
    getColors,
    getTypography,
    getOthers,
  };
}

