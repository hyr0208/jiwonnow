# 지원나우 (JiwonNow)

정부지원사업 맞춤 추천 서비스

## 📋 프로젝트 소개

지원나우는 사업자 정보를 입력하면 맞춤 정부지원사업을 추천해주는 웹 애플리케이션입니다. 복잡한 정부지원사업 정보를 쉽고 빠르게 찾을 수 있도록 도와줍니다.

## ✨ 주요 기능

- **맞춤 추천**: 사업자 정보에 맞는 지원사업만 골라서 추천
- **실시간 검색**: 사업명, 키워드로 빠른 검색
- **카테고리 필터**: 자금지원, 기술지원, 인력지원 등 카테고리별 필터링
- **상세 정보**: 각 지원사업의 상세 정보 및 신청 방법 확인
- **즐겨찾기**: 관심있는 공고 저장 및 관리
- **프로필 관리**: 사업자 정보 입력 및 관리

## 🛠️ 기술 스택

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 5.4.21
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.12.0
- **Icons**: Lucide React 0.562.0

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
# 개발 모드
npm run dev
# 또는
yarn dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build
# 또는
yarn build
```

### 미리보기

```bash
# 빌드된 앱 미리보기
npm run preview
# 또는
yarn preview
```

## 📁 프로젝트 구조

```
jiwonnow/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── FilterBar.tsx    # 필터 바
│   │   ├── MobileHeader.tsx # 모바일 헤더
│   │   ├── ProfileForm.tsx  # 프로필 입력 폼
│   │   ├── ProjectCard.tsx  # 프로젝트 카드
│   │   └── Sidebar.tsx      # 사이드바
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── HomePage.tsx     # 홈 페이지
│   │   ├── ProjectsPage.tsx # 공고 목록 페이지
│   │   ├── ProjectDetailPage.tsx # 공고 상세 페이지
│   │   ├── ProfilePage.tsx  # 프로필 페이지
│   │   └── BookmarksPage.tsx # 즐겨찾기 페이지
│   ├── data/                # 데이터
│   │   └── mockProjects.ts  # 목업 프로젝트 데이터
│   ├── types/               # TypeScript 타입 정의
│   │   └── index.ts
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── main.tsx             # 엔트리 포인트
│   └── index.css            # 글로벌 스타일
├── public/                  # 정적 파일
├── package.json
├── tailwind.config.js      # Tailwind CSS 설정
├── postcss.config.js        # PostCSS 설정
├── vite.config.ts           # Vite 설정
└── tsconfig.json            # TypeScript 설정
```

## 🎨 주요 페이지

- **홈 (`/`)**: 전체 공고 목록 및 검색
- **공고 목록 (`/projects`)**: 필터링된 공고 목록
- **공고 상세 (`/projects/:id`)**: 개별 공고 상세 정보
- **프로필 (`/profile`)**: 사업자 정보 입력
- **즐겨찾기 (`/bookmarks`)**: 저장한 공고 목록

## 🔧 개발 가이드

### 브랜치 전략

- `main`: 프로덕션 배포용 브랜치
- `develop`: 개발 브랜치

### 코드 스타일

- ESLint를 사용한 코드 린팅
- TypeScript를 사용한 타입 안정성
- Tailwind CSS를 사용한 스타일링

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여

이슈 및 개선사항은 언제든지 환영합니다!
