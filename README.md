# modcn - Moderate shadcn UI System

modcn은 Tailwind v4 + Vite + React + shadcn/ui 기반의 디자인 시스템 관리 도구입니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **Vite 5** - 빌드 도구
- **Tailwind CSS v4** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **Zustand** - 상태 관리
- **TypeScript** - 타입 안정성

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 주요 기능

- **Light/Dark 모드 전환**: 실시간으로 테마 변경
- **토큰 편집**: 색상, 타이포그래피, 라운드, 간격, 그림자 등 실시간 조정
- **컴포넌트 프리뷰**: 버튼, 카드, 다이얼로그, 탭 등 실시간 미리보기
- **실시간 반영**: 토큰 변경 시 즉시 Preview에 반영 (CSS Variables 기반)

## 프로젝트 구조

```
src/
├── components/
│   ├── ui/           # shadcn/ui 컴포넌트
│   ├── Header.tsx    # 상단 헤더
│   ├── Sidebar.tsx   # 좌측 사이드바 (토큰 편집 UI)
│   ├── Preview.tsx   # 우측 프리뷰 (컴포넌트 쇼케이스)
│   └── Footer.tsx    # 하단 푸터
├── store/
│   └── useDraftStore.ts  # Zustand 스토어 (상태 관리)
├── lib/
│   ├── types.ts      # 타입 정의
│   ├── defaults.ts   # 기본 토큰 값
│   ├── storage.ts    # sessionStorage/localStorage 유틸
│   ├── utils.ts      # 유틸리티 함수
│   ├── fonts.ts      # 폰트 관리
│   ├── cssVarEmitter.ts  # Token → CSS Variables 변환
│   ├── ThemeProvider.tsx  # CSS 변수 실시간 주입
│   └── useTokens.ts  # 토큰 편집 훅
├── __tests__/
│   ├── setup.ts      # 테스트 환경 설정
│   └── performance/  # 성능 테스트
├── App.tsx
├── main.tsx
└── index.css
```

## 라이선스

MIT
