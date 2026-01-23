import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchProjects, CATEGORY_CODES } from "../services/projectApi";
import type { Project } from "../types";

interface UseProjectsOptions {
  category?: keyof typeof CATEGORY_CODES;
  hashtags?: string;
  pageSize?: number;
}

// 기본 프로젝트 조회 훅
export function useProjects(options?: UseProjectsOptions) {
  return useQuery<Project[], Error>({
    queryKey: ["projects", options],
    queryFn: () =>
      fetchProjects({
        searchCnt: options?.pageSize || 20,
        searchLclasId: options?.category
          ? CATEGORY_CODES[options.category]
          : undefined,
        hashtags: options?.hashtags,
      }),
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    retry: 2,
  });
}

// 무한 스크롤/페이징을 위한 훅
export function usePaginatedProjects(options?: UseProjectsOptions) {
  const pageSize = options?.pageSize || 20;

  return useInfiniteQuery<Project[], Error>({
    queryKey: ["projects-paginated", options],
    queryFn: ({ pageParam = 1 }) =>
      fetchProjects({
        searchCnt: pageSize,
        pageIndex: pageParam as number,
        searchLclasId: options?.category
          ? CATEGORY_CODES[options.category]
          : undefined,
        hashtags: options?.hashtags,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지에 데이터가 pageSize보다 적으면 더 이상 페이지 없음
      if (lastPage.length < pageSize) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

// 검색 및 필터링을 위한 함수
export function filterProjects(
  projects: Project[] | undefined,
  filters: {
    keyword?: string;
    category?: string;
    status?: string;
  },
): Project[] {
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

// 기존 훅 유지 (호환성)
export function useFilteredProjects(
  projects: Project[] | undefined,
  filters: {
    keyword?: string;
    category?: string;
    status?: string;
  },
) {
  return filterProjects(projects, filters);
}
