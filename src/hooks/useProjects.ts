import { useQuery } from "@tanstack/react-query";
import { fetchProjects, CATEGORY_CODES } from "../services/projectApi";
import type { Project } from "../types";

interface UseProjectsOptions {
  category?: keyof typeof CATEGORY_CODES;
  hashtags?: string;
  searchCnt?: number;
}

export function useProjects(options?: UseProjectsOptions) {
  return useQuery<Project[], Error>({
    queryKey: ["projects", options],
    queryFn: () =>
      fetchProjects({
        searchCnt: options?.searchCnt || 100,
        searchLclasId: options?.category
          ? CATEGORY_CODES[options.category]
          : undefined,
        hashtags: options?.hashtags,
      }),
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    retry: 2,
  });
}

// 검색 및 필터링을 위한 훅
export function useFilteredProjects(
  projects: Project[] | undefined,
  filters: {
    keyword?: string;
    category?: string;
    status?: string;
  },
) {
  if (!projects) return [];

  return projects.filter((project) => {
    // 키워드 검색
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const matchesKeyword =
        project.title.toLowerCase().includes(keyword) ||
        project.description.toLowerCase().includes(keyword) ||
        project.organization.toLowerCase().includes(keyword) ||
        project.tags.some((tag) => tag.toLowerCase().includes(keyword));
      if (!matchesKeyword) return false;
    }

    // 카테고리 필터
    if (filters.category && filters.category !== "전체") {
      if (project.supportType !== filters.category) return false;
    }

    // 상태 필터
    if (filters.status && filters.status !== "all") {
      if (project.status !== filters.status) return false;
    }

    return true;
  });
}
