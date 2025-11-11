// Google Fonts 목록 정의
export interface FontOption {
  name: string;
  value: string;
  category: "sans-serif" | "serif" | "monospace";
  weights?: number[];
}

export const GOOGLE_FONTS: FontOption[] = [
  // Sans-serif
  {
    name: "Inter",
    value: "Inter, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 600, 700],
  },
  {
    name: "Roboto",
    value: "Roboto, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 700],
  },
  {
    name: "Open Sans",
    value: "'Open Sans', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 600, 700],
  },
  {
    name: "Poppins",
    value: "Poppins, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 600, 700],
  },
  {
    name: "Lato",
    value: "Lato, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 700],
  },
  {
    name: "Montserrat",
    value: "Montserrat, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 600, 700],
  },
  {
    name: "Nunito",
    value: "Nunito, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 600, 700],
  },
  {
    name: "Raleway",
    value: "Raleway, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 600, 700],
  },
  {
    name: "Work Sans",
    value: "'Work Sans', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 600],
  },
  {
    name: "DM Sans",
    value: "'DM Sans', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 700],
  },
  {
    name: "Pretendard",
    value: "Pretendard, system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 600, 700],
  },
  {
    name: "Noto Sans KR",
    value: "'Noto Sans KR', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 700],
  },
  {
    name: "IBM Plex Sans KR",
    value: "'IBM Plex Sans KR', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 600, 700],
  },
  {
    name: "Nanum Gothic",
    value: "'Nanum Gothic', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 700, 800],
  },
  {
    name: "Gowun Dodum",
    value: "'Gowun Dodum', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400],
  },
  {
    name: "Black Han Sans",
    value: "'Black Han Sans', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400],
  },
  {
    name: "Gothic A1",
    value: "'Gothic A1', system-ui, sans-serif",
    category: "sans-serif",
    weights: [400, 500, 700, 900],
  },

  // Serif
  {
    name: "Merriweather",
    value: "Merriweather, Georgia, serif",
    category: "serif",
    weights: [400, 700],
  },
  {
    name: "Playfair Display",
    value: "'Playfair Display', Georgia, serif",
    category: "serif",
    weights: [400, 600, 700],
  },
  {
    name: "Lora",
    value: "Lora, Georgia, serif",
    category: "serif",
    weights: [400, 600, 700],
  },
  {
    name: "PT Serif",
    value: "'PT Serif', Georgia, serif",
    category: "serif",
    weights: [400, 700],
  },
  {
    name: "Crimson Text",
    value: "'Crimson Text', Georgia, serif",
    category: "serif",
    weights: [400, 600],
  },
  {
    name: "Georgia",
    value: "Georgia, 'Times New Roman', serif",
    category: "serif",
  },
  {
    name: "Noto Serif KR",
    value: "'Noto Serif KR', Georgia, serif",
    category: "serif",
    weights: [400, 600, 700],
  },
  {
    name: "Nanum Myeongjo",
    value: "'Nanum Myeongjo', Georgia, serif",
    category: "serif",
    weights: [400, 700, 800],
  },
  {
    name: "Gowun Batang",
    value: "'Gowun Batang', Georgia, serif",
    category: "serif",
    weights: [400, 700],
  },
  {
    name: "Nanum Brush Script",
    value: "'Nanum Brush Script', Georgia, serif",
    category: "serif",
    weights: [400],
  },
  {
    name: "Sunflower",
    value: "Sunflower, Georgia, serif",
    category: "serif",
    weights: [300, 500, 700],
  },

  // Monospace
  {
    name: "Fira Code",
    value: "'Fira Code', monospace",
    category: "monospace",
    weights: [400, 500, 600],
  },
  {
    name: "JetBrains Mono",
    value: "'JetBrains Mono', monospace",
    category: "monospace",
    weights: [400, 500, 600],
  },
  {
    name: "Source Code Pro",
    value: "'Source Code Pro', monospace",
    category: "monospace",
    weights: [400, 600],
  },
  {
    name: "Roboto Mono",
    value: "'Roboto Mono', monospace",
    category: "monospace",
    weights: [400, 500],
  },
  {
    name: "IBM Plex Mono",
    value: "'IBM Plex Mono', monospace",
    category: "monospace",
    weights: [400, 600],
  },
  {
    name: "Menlo",
    value: "Menlo, ui-monospace, monospace",
    category: "monospace",
  },
];

// 카테고리별 폰트 필터 (한국어 폰트 우선 정렬)
export const getFontsByCategory = (
  category: "sans-serif" | "serif" | "monospace"
) => {
  const filtered = GOOGLE_FONTS.filter((font) => font.category === category);

  // 한국어 폰트 목록
  const koreanFonts = [
    "Noto Sans KR",
    "Noto Serif KR",
    "IBM Plex Sans KR",
    "Nanum Gothic",
    "Nanum Myeongjo",
    "Gowun Dodum",
    "Gowun Batang",
    "Black Han Sans",
    "Gothic A1",
    "Nanum Brush Script",
    "Sunflower",
  ];

  // 한국어 폰트와 영문 폰트 분리
  const korean = filtered.filter((font) => koreanFonts.includes(font.name));
  const others = filtered.filter((font) => !koreanFonts.includes(font.name));

  // 한국어 폰트를 먼저 배치
  return [...korean, ...others];
};

// 로드된 폰트 추적
const loadedFonts = new Set<string>();

/**
 * Google Fonts API를 사용하여 폰트를 동적으로 로드
 */
export const loadGoogleFont = (
  fontName: string,
  weights: number[] = [400, 500, 600, 700]
) => {
  // 이미 로드된 폰트는 스킵
  if (loadedFonts.has(fontName)) {
    return;
  }

  // 시스템 폰트는 로드 불필요
  const systemFonts = ["Georgia", "Menlo"];
  if (systemFonts.includes(fontName)) {
    loadedFonts.add(fontName);
    return;
  }

  // Pretendard는 별도 CDN 사용 (Google Fonts에 없음)
  if (fontName === "Pretendard") {
    const existingLink = document.querySelector('link[href*="pretendard"]');
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css";
      link.setAttribute("data-font", "Pretendard");
      document.head.appendChild(link);
    }
    loadedFonts.add(fontName);
    return;
  }

  // Google Fonts URL 생성
  const weightsParam = weights.join(";");
  const fontFamily = fontName.replace(/\s+/g, "+");
  const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weightsParam}&display=swap`;

  // 기존 link 태그 확인
  const existingLink = document.querySelector(`link[href*="${fontFamily}"]`);
  if (existingLink) {
    loadedFonts.add(fontName);
    return;
  }

  // 새 link 태그 생성
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.setAttribute("data-font", fontName);

  document.head.appendChild(link);
  loadedFonts.add(fontName);

  console.log(`✅ Loaded Google Font: ${fontName}`);
};

/**
 * font-family 값에서 폰트 이름 추출
 */
export const extractFontName = (fontValue: string): string => {
  // "Inter, system-ui, sans-serif" -> "Inter"
  // "'Open Sans', system-ui, sans-serif" -> "Open Sans"
  const firstFont = fontValue.split(",")[0].trim();
  return firstFont.replace(/['"]/g, "");
};

/**
 * 폰트 이름으로 FontOption 찾기
 */
export const findFontOption = (fontName: string): FontOption | undefined => {
  return GOOGLE_FONTS.find(
    (font) => font.name.toLowerCase() === fontName.toLowerCase()
  );
};

/**
 * font-family 값으로 폰트 로드
 */
export const loadFontFromValue = (fontValue: string) => {
  const fontName = extractFontName(fontValue);
  const fontOption = findFontOption(fontName);

  if (fontOption && fontOption.weights) {
    loadGoogleFont(fontName, fontOption.weights);
  }
};
