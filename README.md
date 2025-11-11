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
- **프리셋 관리**: 다양한 디자인 프리셋 선택 및 생성
- **컬러 토큰 관리**: 디자인 시스템의 색상 팔레트 관리
- **컴포넌트 프리뷰**: 버튼, 카드, 다이얼로그, 탭 등 실시간 미리보기
- **저장/내보내기**: 작업 내용 저장 및 내보내기

## 프로젝트 구조

```
src/
├── components/
│   ├── ui/           # shadcn/ui 컴포넌트
│   ├── Header.tsx    # 상단 헤더
│   ├── Sidebar.tsx   # 좌측 사이드바
│   ├── Preview.tsx   # 우측 프리뷰
│   └── Footer.tsx    # 하단 푸터
├── store/
│   └── useDraftStore.ts  # Zustand 스토어
├── lib/
│   ├── types.ts      # 타입 정의
│   ├── defaults.ts   # 기본값
│   ├── storage.ts    # 저장소 유틸
│   └── utils.ts      # 유틸리티 함수
├── App.tsx
├── main.tsx
└── index.css
```

## 라이선스

MIT
