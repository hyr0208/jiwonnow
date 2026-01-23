import { bizinfoApi } from "./api";
import type { Project } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

// 기업마당 API 응답 타입
interface BizinfoItem {
  pblancId: string; // 공고ID
  pblancNm: string; // 공고명
  jrsdInsttNm: string; // 소관기관명
  bsnsSumryCn: string; // 사업요약내용
  reqstBeginEndDe: string; // 신청기간
  pblancUrl: string; // 상세URL
  hashtags: string; // 해시태그
  areaNm?: string; // 지역명
  bsnsMclasNm?: string; // 사업분류명
}

interface BizinfoResponse {
  jsonList?: BizinfoItem[];
  rss?: {
    channel?: {
      item?: BizinfoItem[];
    };
  };
}

// API 응답을 Project 타입으로 변환
const transformToProject = (item: BizinfoItem, index: number): Project => {
  // 신청기간 파싱 (예: "2026-01-15 ~ 2026-02-28")
  const [startDate, endDate] = (item.reqstBeginEndDe || "")
    .split("~")
    .map((d) => d.trim());

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

  // 지원형태 추출 (해시태그에서)
  const supportTypes = [
    "자금지원",
    "기술지원",
    "인력지원",
    "수출지원",
    "창업지원",
    "경영지원",
  ];
  const supportType =
    tags.find((tag) => supportTypes.includes(tag)) ||
    item.bsnsMclasNm ||
    "기타";

  return {
    id: item.pblancId || String(index + 1),
    title: item.pblancNm || "제목 없음",
    description: item.bsnsSumryCn || "",
    organization: item.jrsdInsttNm || "미정",
    supportType,
    applicationStartDate: startDate || "",
    applicationEndDate: endDate || "",
    region: item.areaNm || "전국",
    targetAudience: "중소기업, 소상공인",
    supportContent: item.bsnsSumryCn || "",
    applicationMethod: "온라인 신청",
    detailUrl: item.pblancUrl || "https://www.bizinfo.go.kr",
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
        searchCnt: params?.searchCnt || 100,
        pageIndex: params?.pageIndex || 1,
        searchLclasId: params?.searchLclasId,
        hashtags: params?.hashtags,
      },
    });

    const items =
      response.data.jsonList || response.data.rss?.channel?.item || [];
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
