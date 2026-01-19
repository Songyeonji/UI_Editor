# 디자인 미리보기 Playground

React + TypeScript + Tailwind CSS로 만든 UI 디자인 프리뷰 도구입니다.

## 🎨 기능

### 1. 트레이 알림
- Windows 스타일 알림 디자인
- 4가지 타입 (Info, Success, Warning, Error)
- 실시간 편집 및 미리보기

### 2. 레이아웃
- 앱 레이아웃 (Topbar + Sidebar + Content)
- Dark/Light 테마
- 사이드바 모드 (Flat, Folder, Mixed)

### 3. 콘텐츠
- 테이블 리스트 디자인
- 검색 필터
- 커스터마이즈 가능한 컬럼/행

### 4. 승인 양식
- 드롭다운/인풋 필드
- 동적 폼 빌더
- 100%/50% 너비 지원

## 🚀 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 📦 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **React Icons** - 아이콘

## 🌐 배포

### Vercel (추천)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# dist 폴더를 Netlify에 드래그 앤 드롭
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── editors/       # 편집기 컴포넌트
│   │   ├── ApprovalEditor.tsx
│   │   ├── ContentEditor.tsx
│   │   ├── LayoutEditor.tsx
│   │   └── TrayEditor.tsx
│   ├── preview/       # 미리보기 컴포넌트
│   │   ├── ApprovalPreview.tsx
│   │   ├── ContentPreview.tsx
│   │   ├── LayoutPreview.tsx
│   │   └── TrayPreview.tsx
│   └── ui/           # UI 컴포넌트
│       ├── Button.tsx
│       ├── ChipButton.tsx
│       ├── PageContainer.tsx
│       ├── SidebarTree.tsx
│       └── TrayIcon.tsx
├── constants/
│   └── theme.ts      # 테마 정의
├── types/
│   └── index.ts      # TypeScript 타입
├── utils/
│   └── helpers.ts    # 유틸리티 함수
├── App.tsx           # 메인 앱
├── main.tsx          # 엔트리 포인트
└── index.css         # 글로벌 스타일
```

## 🎯 사용법

1. 상단 탭에서 원하는 섹션 선택
2. 오른쪽 패널에서 속성 편집
3. 왼쪽 미리보기에서 실시간 확인

## 📝 라이선스

MIT

## 👨‍💻 개발자

Frontend Developer