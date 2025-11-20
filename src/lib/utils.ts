import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Preset } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Preset에서 light 모드 기준으로 Primary, Secondary, Accent 컬러를 추출합니다.
 * @param preset Preset 객체
 * @returns { primary, secondary, accent } 컬러 문자열 (hex, rgb, hsl 등)
 */
export function getPresetColorPreview(preset: Preset): {
  primary: string;
  secondary: string;
  accent: string;
} {
  const lightColors = preset.tokens?.modes?.light?.colors;

  // Primary: primary → primary-foreground → background → foreground → fallback
  const primary =
    lightColors?.primary ??
    lightColors?.["primary-foreground"] ??
    lightColors?.background ??
    lightColors?.foreground ??
    "#000000";

  // Secondary: secondary → secondary-foreground → muted → fallback
  const secondary =
    lightColors?.secondary ??
    lightColors?.["secondary-foreground"] ??
    lightColors?.muted ??
    "#808080";

  // Accent: accent → accent-foreground → primary → fallback
  const accent =
    lightColors?.accent ??
    lightColors?.["accent-foreground"] ??
    lightColors?.primary ??
    "#6366f1";

  return { primary, secondary, accent };
}
