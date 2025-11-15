/**
 * cssVarEmitter.ts
 *
 * M2: Token → CSS Variables 변환 유틸리티
 *
 * Purpose:
 * - WorkingDraft 토큰을 CSS custom properties로 변환
 * - mode별 color 토큰과 shared 토큰(typography, others) 처리
 *
 * Usage:
 * import { generateCSSVars } from '@/lib/cssVarEmitter';
 * const cssString = generateCSSVars(workingDraft, 'light');
 */

import { WorkingDraft, PreviewMode } from "./types";

/**
 * WorkingDraft 토큰을 CSS variables로 변환
 * @param draft - 현재 working draft
 * @param mode - 'light' 또는 'dark'
 * @returns CSS 문자열 (Preview 영역에만 적용, UI Shell 제외)
 *
 * IMPORTANT: .preview-canvas 클래스 스코프로 생성하여
 * UI Shell(Header/Sidebar/Footer)은 영향받지 않음
 */
export function generateCSSVars(
  draft: WorkingDraft,
  mode: PreviewMode
): string {
  const vars: string[] = [];

  // 1. Colors (mode-specific)
  const currentMode = draft.tokens.modes[mode];
  const colors = (currentMode?.colors as Record<string, string>) || {};
  for (const [key, value] of Object.entries(colors)) {
    vars.push(`  --color-${key}: ${value};`);
  }

  // 2. Typography (shared)
  const typography = (draft.tokens.shared.typography as Record<string, string>) || {};
  for (const [key, value] of Object.entries(typography)) {
    // font-sans → --font-sans
    // tracking-normal → --tracking-normal
    vars.push(`  --${key}: ${value};`);
  }

  // 3. Others (shared)
  const shared = draft.tokens.shared;

  // radius
  if (shared.radius !== undefined) {
    vars.push(`  --radius: ${shared.radius};`);
  }

  // spacing
  if (shared.spacing !== undefined) {
    vars.push(`  --spacing: ${shared.spacing};`);
  }

  // shadow (복합 속성)
  if (shared.shadow) {
    const s = shared.shadow as Record<string, any>;
    vars.push(`  --shadow-color: ${s["shadow-color"] || s.color || "#000"};`);
    vars.push(
      `  --shadow-opacity: ${s["shadow-opacity"] || s.opacity || "0.1"};`
    );
    vars.push(`  --shadow-blur: ${s["shadow-blur"] || s.blur || "16px"};`);
    vars.push(`  --shadow-spread: ${s["shadow-spread"] || s.spread || "0px"};`);
    vars.push(`  --shadow-x: ${s["shadow-x"] || s.x || "0px"};`);
    vars.push(`  --shadow-y: ${s["shadow-y"] || s.y || "8px"};`);
  }

  // Preview 영역에만 적용 (UI Shell 제외)
  const cssRules: string[] = [];

  // 1. CSS variables 선언 + Typography 직접 적용
  const canvasStyles = [...vars];
  if (typography["font-sans"]) {
    canvasStyles.push(`  font-family: var(--font-sans);`);
  }
  if (typography["tracking-normal"] !== undefined) {
    canvasStyles.push(`  letter-spacing: var(--tracking-normal);`);
  }

  cssRules.push(`.preview-canvas {\n${canvasStyles.join("\n")}\n}`);

  // 2. Radius 적용 (rounded-* 클래스 오버라이드)
  if (shared.radius) {
    cssRules.push(
      `.preview-canvas .rounded { border-radius: calc(var(--radius) * 0.5) !important; }`,
      `.preview-canvas .rounded-sm { border-radius: calc(var(--radius) * 0.5) !important; }`,
      `.preview-canvas .rounded-md { border-radius: var(--radius) !important; }`,
      `.preview-canvas .rounded-lg { border-radius: calc(var(--radius) * 1.5) !important; }`,
      `.preview-canvas .rounded-full { border-radius: 9999px !important; }`
    );
  }

  // 3. Spacing 적용 (gap, padding 등)
  if (shared.spacing) {
    cssRules.push(
      `.preview-canvas .space-y-1 > * + * { margin-top: var(--spacing) !important; }`,
      `.preview-canvas .space-y-2 > * + * { margin-top: calc(var(--spacing) * 2) !important; }`,
      `.preview-canvas .space-y-3 > * + * { margin-top: calc(var(--spacing) * 3) !important; }`,
      `.preview-canvas .gap-2 { gap: calc(var(--spacing) * 2) !important; }`,
      `.preview-canvas .gap-3 { gap: calc(var(--spacing) * 3) !important; }`
    );
  }

  // 4. Shadow 적용 (Card 등)
  if (shared.shadow) {
    const s = shared.shadow as Record<string, any>;
    const shadowColor = s["shadow-color"] || s.color || "#000000";
    const opacity = s["shadow-opacity"] || s.opacity || "0.1";

    // hex to rgba 간단 변환 (또는 그냥 hex + opacity 사용)
    cssRules.push(
      `.preview-canvas .shadow-sm { box-shadow: var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) ${shadowColor}${Math.round(
        parseFloat(String(opacity)) * 255
      )
        .toString(16)
        .padStart(2, "0")} !important; }`,
      `.preview-canvas .shadow-lg { box-shadow: var(--shadow-x) var(--shadow-y) calc(var(--shadow-blur) * 1.5) var(--shadow-spread) ${shadowColor}${Math.round(
        parseFloat(String(opacity)) * 255
      )
        .toString(16)
        .padStart(2, "0")} !important; }`
    );
  }

  return cssRules.join("\n\n");
}

/**
 * CSS variable 이름 생성 헬퍼
 * @param category - 'color' | 'font' | 'radius' | 'spacing' | 'shadow'
 * @param key - 토큰 키
 */
export function getCSSVarName(category: string, key: string): string {
  return `--${category}-${key}`;
}

/**
 * CSS variable 참조 문자열 생성
 * @param varName - CSS variable 이름 (예: 'color-primary')
 * @param fallback - fallback 값 (optional)
 */
export function getCSSVarRef(varName: string, fallback?: string): string {
  const fullName = varName.startsWith("--") ? varName : `--${varName}`;
  return fallback ? `var(${fullName}, ${fallback})` : `var(${fullName})`;
}
