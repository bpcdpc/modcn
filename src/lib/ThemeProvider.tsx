/**
 * ThemeProvider.tsx
 *
 * M2: 실시간 토큰 → CSS Variables 주입
 *
 * Purpose:
 * - Zustand workingDraft 구독
 * - 토큰 변경 시 CSS custom properties 자동 업데이트
 * - 초기 마운트는 즉시 반영 (깜빡임 최소화)
 * - 이후 변경은 150ms debounce
 *
 * Usage:
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */

import { useLayoutEffect, useRef } from "react";
import { useDraftStore } from "@/store/useDraftStore";
import { useShallow } from "zustand/react/shallow";
import { generateCSSVars } from "./cssVarEmitter";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { workingDraft } = useDraftStore(
    useShallow((state) => ({
      workingDraft: state.workingDraft,
    }))
  );

  const previewMode = workingDraft.ui.previewMode;
  const timeoutRef = useRef<number | null>(null);
  const styleElRef = useRef<HTMLStyleElement | null>(null);
  const isInitialMountRef = useRef(true);

  useLayoutEffect(() => {
    // 스타일 엘리먼트 준비
    if (!styleElRef.current) {
      let el = document.getElementById(
        "modcn-theme"
      ) as HTMLStyleElement | null;
      if (!el) {
        el = document.createElement("style");
        el.id = "modcn-theme";
        document.head.appendChild(el);
      }
      styleElRef.current = el;
    }

    if (!styleElRef.current) return;

    // ✅ 초기 마운트: debounce 없이 바로 반영 (깜빡임 최소화)
    if (isInitialMountRef.current) {
      const cssString = generateCSSVars(workingDraft, previewMode);
      styleElRef.current.textContent = cssString;
      isInitialMountRef.current = false;
      return;
    }

    // 이후 변경: debounce 150ms
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      const cssString = generateCSSVars(workingDraft, previewMode);
      if (styleElRef.current) {
        styleElRef.current.textContent = cssString;
      }
    }, 150);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [workingDraft, previewMode]);

  return <>{children}</>;
}
