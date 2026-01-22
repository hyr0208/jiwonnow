// 사용자 프로필 타입
export interface UserProfile {
  id?: string;
  region: string; // 시/도
  industry: string; // 업종
  businessType: "individual" | "corporation" | "pre-startup"; // 사업자형태
  revenueRange?: string; // 매출 구간
  foundedYear?: number; // 설립연도
  employeeCount?: number; // 직원 수
}

// 정부지원사업(공고) 타입
export interface Project {
  id: string;
  title: string; // 제목
  organization: string; // 주관부처
  supportType: string; // 지원형태
  applicationStartDate: string; // 접수시작일
  applicationEndDate: string; // 접수마감일
  region: string; // 지역
  targetAudience: string; // 지원대상
  supportContent: string; // 지원내용
  applicationMethod: string; // 신청방법
  detailUrl: string; // 상세링크
  status: "upcoming" | "open" | "closed"; // 공고상태
  tags: string[]; // 태그
  createdAt: string;
  updatedAt: string;
}

// 공고 태그 타입
export interface ProjectTag {
  id: string;
  name: string;
  category: "industry" | "target" | "region" | "type";
}

// 즐겨찾기 타입
export interface Bookmark {
  id: string;
  userId: string;
  projectId: string;
  createdAt: string;
}

// 필터 옵션 타입
export interface FilterOptions {
  keyword?: string;
  region?: string;
  status?: "all" | "upcoming" | "open" | "closed";
  supportType?: string;
  industry?: string;
}

// 지역 목록
export const REGIONS = [
  "전체",
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

// 업종 목록
export const INDUSTRIES = [
  "전체",
  "제조업",
  "정보통신업",
  "도소매업",
  "음식숙박업",
  "건설업",
  "운수업",
  "금융보험업",
  "부동산업",
  "전문과학기술서비스업",
  "교육서비스업",
  "보건사회복지업",
  "예술스포츠여가업",
  "기타서비스업",
];

// 사업자형태 목록
export const BUSINESS_TYPES = [
  { value: "pre-startup", label: "예비창업자" },
  { value: "individual", label: "개인사업자" },
  { value: "corporation", label: "법인사업자" },
];

// 매출 구간 목록
export const REVENUE_RANGES = [
  "선택안함",
  "1억 미만",
  "1억 ~ 5억",
  "5억 ~ 10억",
  "10억 ~ 50억",
  "50억 ~ 100억",
  "100억 이상",
];

// 지원형태 목록
export const SUPPORT_TYPES = [
  "전체",
  "자금지원",
  "기술지원",
  "인력지원",
  "수출지원",
  "내수판로지원",
  "창업지원",
  "경영지원",
  "기타",
];
