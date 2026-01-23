import { bizinfoApi } from "./api";
import type { Project } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

// 기업마당 API 응답 타입 (실제 응답 구조에 맞게 수정)
interface BizinfoItem {
  pblancId: string; // 공고ID
  pblancNm?: string; // 공고명
  bizSbjtName?: string; // 사업명 (대체 필드)
  jrsdInsttNm?: string; // 소관기관명
  rprsInsttNm?: string; // 대표기관명 (대체 필드)
  bsnsSumryCn?: string; // 사업요약내용
  bizSbjtOutln?: string; // 사업개요 (대체 필드)
  reqstBeginEndDe?: string; // 신청기간
  pbancRcptBgngDt?: string; // 접수시작일
  pbancRcptEndDt?: string; // 접수종료일
  pblancUrl?: string; // 상세URL
  detailPageUrl?: string; // 상세페이지URL (대체 필드)
  hashtags?: string; // 해시태그
  areaNm?: string; // 지역명
  bsnsMclasNm?: string; // 사업분류명
  sportScopClassNm?: string; // 지원분야 (대체 필드)
  totCnt?: string; // 총 건수
}

interface BizinfoResponse {
  jsonArray?: BizinfoItem[];
  jsonList?: BizinfoItem[];
  totalCnt?: string;
  rss?: {
    channel?: {
      item?: BizinfoItem[];
    };
  };
}

// 알려진 지역 목록
const KNOWN_REGIONS = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
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

// jrsdInsttNm이 지역인지 확인
const isRegion = (value: string | undefined): boolean => {
  if (!value) return false;
  return KNOWN_REGIONS.some((region) => value.includes(region));
};

// API 응답을 Project 타입으로 변환
const transformToProject = (item: BizinfoItem, index: number): Project => {
  // 필드 우선순위로 값 추출
  const title = item.pblancNm || item.bizSbjtName || "제목 없음";

  // jrsdInsttNm이 지역명인 경우만 지역으로 사용
  let region = "전국";
  let organization = "미정";

  if (isRegion(item.jrsdInsttNm)) {
    region = item.jrsdInsttNm!;
    organization = item.rprsInsttNm || "미정";
  } else {
    region = item.areaNm || "전국";
    organization = item.jrsdInsttNm || item.rprsInsttNm || "미정";
  }

  const description = item.bsnsSumryCn || item.bizSbjtOutln || "";
  const detailUrl =
    item.pblancUrl || item.detailPageUrl || "https://www.bizinfo.go.kr";

  // 신청기간 파싱
  let startDate = "";
  let endDate = "";

  if (item.reqstBeginEndDe) {
    const [s, e] = item.reqstBeginEndDe.split("~").map((d) => d.trim());
    startDate = s || "";
    endDate = e || "";
  } else {
    startDate = item.pbancRcptBgngDt || "";
    endDate = item.pbancRcptEndDt || "";
  }

  // 상태 결정
  const now = new Date();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  let status: Project["status"] = "open";
  if (start && now < start) {
    status = "upcoming";
  } else if (end && now > end) {
    status = "closed";
  }

  // 해시태그를 배열로 변환
  const tags = item.hashtags
    ? item.hashtags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  // 지원형태 추출
  const supportType = item.sportScopClassNm || item.bsnsMclasNm || "기타";

  return {
    id: item.pblancId || String(index + 1),
    title,
    description,
    organization,
    supportType,
    applicationStartDate: startDate,
    applicationEndDate: endDate,
    region,
    targetAudience: "중소기업, 소상공인",
    supportContent: description,
    applicationMethod: "온라인 신청",
    detailUrl,
    status,
    tags,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };
};

// 지원사업 목록 조회
export const fetchProjects = async (params?: {
  searchCnt?: number;
  pageIndex?: number;
  searchLclasId?: string;
  hashtags?: string;
}): Promise<Project[]> => {
  try {
    const response = await bizinfoApi.get<BizinfoResponse>("/bizinfoApi.do", {
      params: {
        crtfcKey: API_KEY,
        dataType: "json",
        pageUnit: params?.searchCnt || 100,
        pageIndex: params?.pageIndex || 1,
        searchLclasId: params?.searchLclasId,
        hashtags: params?.hashtags,
      },
    });

    console.log("API Response:", response.data);

    // 응답에서 데이터 추출 (여러 형식 지원)
    const items =
      response.data.jsonArray ||
      response.data.jsonList ||
      response.data.rss?.channel?.item ||
      [];

    return items.map((item, index) => transformToProject(item, index));
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 분야별 코드
export const CATEGORY_CODES = {
  금융: "01",
  기술: "02",
  인력: "03",
  수출: "04",
  창업: "05",
  내수: "06",
  경영: "07",
} as const;
