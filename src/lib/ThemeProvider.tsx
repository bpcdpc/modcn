/**
 * ThemeProvider.tsx
 *
 * M2: 실시간 토큰 → CSS Variables 주입
 *
 * Purpose:
 * - Zustand workingDraft 구독
 * - 토큰 변경 시 CSS custom properties 자동 업데이트
 * - debounce 150ms로 성능 최적화
 *
 * Usage:
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */

import { useEffect, useRef } from "react";
import { useDraftStore } from "@/store/useDraftStore";
import { useShallow } from "zustand/react/shallow";
import { generateCSSVars } from "./cssVarEmitter";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { workingDraft, previewMode } = useDraftStore(
    useShallow((state) => ({
      workingDraft: state.workingDraft,
      previewMode: state.previewMode,
    }))
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const styleElRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    // 스타일 엘리먼트 초기화 (한 번만)
    if (!styleElRef.current) {
      let el = document.getElementById("modcn-theme") as HTMLStyleElement;
      if (!el) {
        el = document.createElement("style");
        el.id = "modcn-theme";
        document.head.appendChild(el);
      }
      styleElRef.current = el;
    }

    // debounce: 150ms 내 연속 변경은 마지막 한 번만 적용
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const cssString = generateCSSVars(workingDraft, previewMode);
      if (styleElRef.current) {
        styleElRef.current.textContent = cssString;
      }
    }, 150);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [workingDraft, previewMode]);

  return <>{children}</>;
}
