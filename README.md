# 지원나우 (JiwonNow)

정부지원사업 맞춤 추천 서비스

🔗 **서비스 URL**: [jiwonnow.yyyerin.co.kr](https://jiwonnow.yyyerin.co.kr)

## 📋 프로젝트 소개

지원나우는 사업자 정보를 입력하면 맞춤 정부지원사업을 추천해주는 웹 애플리케이션입니다. 복잡한 정부지원사업 정보를 쉽고 빠르게 찾을 수 있도록 도와줍니다.

## ✨ 주요 기능

- **🔐 구글 로그인**: 간편한 소셜 로그인으로 빠른 시작
- **🎯 맞춤 추천**: 지역 + 업종 기반 개인화된 지원사업 추천
- **🔍 실시간 검색**: 사업명, 키워드로 빠른 검색
- **📂 카테고리 필터**: 자금지원, 기술지원, 인력지원 등 카테고리별 필터링
- **📊 상태별 필터**: 접수중/접수예정/마감 상태별 필터링
- **📌 즐겨찾기**: 관심있는 공고 저장 및 관리 (로그인 필요)
- **📤 공유하기**: Web Share API를 통한 공고 공유
- **📄 상세 정보**: 각 지원사업의 상세 정보 및 공식 사이트 바로가기

## 🛠️ 기술 스택

### Frontend

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 5.4.21
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.12.0
- **Icons**: Lucide React
- **Date**: Day.js

### Backend & Database

- **Authentication**: Firebase Auth (Google 로그인)
- **Database**: Firebase Firestore
- **API**: 공공데이터포털 기업마당 API

### DevOps

- **CI/CD**: Jenkins
- **Container**: Docker
- **Web Server**: Nginx

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# 공공데이터포털 API 키
VITE_API_KEY=your_api_key_here

# Firebase 설정
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 설치

```bash
# 의존성 설치
yarn install
```

### 개발 서버 실행

```bash
# 개발 모드
yarn dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
yarn build
```

## 📁 프로젝트 구조

```
jiwonnow/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── FilterBar.tsx    # 필터 바
│   │   ├── LoginRequestModal.tsx # 로그인 유도 모달
│   │   ├── MobileHeader.tsx # 모바일 헤더
│   │   ├── Pagination.tsx   # 페이지네이션
│   │   ├── ProfileForm.tsx  # 프로필 입력 폼
│   │   ├── ProjectCard.tsx  # 프로젝트 카드
│   │   └── Sidebar.tsx      # 사이드바
│   ├── contexts/            # React Context
│   │   └── AuthContext.tsx  # 인증 상태 관리
│   ├── hooks/               # 커스텀 훅
│   │   └── useProjects.ts   # 프로젝트 데이터 훅
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── HomePage.tsx     # 홈 페이지
│   │   ├── ProjectDetailPage.tsx # 공고 상세 페이지
│   │   ├── ProfilePage.tsx  # 프로필 & 맞춤 추천 페이지
│   │   └── BookmarksPage.tsx # 즐겨찾기 페이지
│   ├── services/            # API 서비스
│   │   ├── api.ts           # Axios 인스턴스
│   │   ├── bookmarkService.ts # 즐겨찾기 서비스
│   │   ├── firebase.ts      # Firebase 설정
│   │   ├── projectApi.ts    # 공고 API
│   │   └── userService.ts   # 사용자 프로필 서비스
│   ├── types/               # TypeScript 타입 정의
│   │   └── index.ts
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── main.tsx             # 엔트리 포인트
│   └── index.css            # 글로벌 스타일
├── public/                  # 정적 파일
├── Dockerfile               # Docker 설정
├── Jenkinsfile              # Jenkins CI/CD 파이프라인
├── nginx.conf               # Nginx 설정
├── package.json
├── tailwind.config.js       # Tailwind CSS 설정
├── vite.config.ts           # Vite 설정
└── tsconfig.json            # TypeScript 설정
```

## 🎨 주요 페이지

| 경로            | 페이지    | 설명                         |
| --------------- | --------- | ---------------------------- |
| `/`             | 홈        | 전체 공고 목록, 검색, 필터링 |
| `/projects/:id` | 공고 상세 | 개별 공고 상세 정보          |
| `/profile`      | 내 프로필 | 사업자 정보 입력 & 맞춤 추천 |
| `/bookmarks`    | 즐겨찾기  | 저장한 공고 목록             |

## 🔧 개발 가이드

### 브랜치 전략

- `main`: 프로덕션 배포용 브랜치
- `develop`: 개발 브랜치

### 배포

`develop` 브랜치에 푸시하면 Jenkins가 자동으로 빌드 및 배포를 수행합니다.

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여

이슈 및 개선사항은 언제든지 환영합니다!
