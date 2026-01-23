import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, AlertCircle, FileText } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { type FilterOptions } from "../types";
import ProjectCard from "../components/ProjectCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    keyword: "",
    region: "전체",
    status: "all",
    supportType: searchParams.get("category") || "전체",
  });

  // URL 파라미터 변경 감지하여 필터 업데이트
  useEffect(() => {
    const category = searchParams.get("category");
    setFilters((prev) => ({
      ...prev,
      supportType: category || "전체",
    }));
  }, [searchParams]);

  // API에서 데이터 가져오기
  const { data: projects, isLoading, error } = useProjects({ pageSize: 100 });

  // 필터링
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project) => {
      // 키워드 검색
      if (
        filters.keyword &&
        !project.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
        !project.organization
          .toLowerCase()
          .includes(filters.keyword.toLowerCase()) &&
        !project.tags.some((tag) =>
          tag.toLowerCase().includes(filters.keyword!.toLowerCase()),
        )
      ) {
        return false;
      }

      // 지역 필터
      if (filters.region && filters.region !== "전체") {
        // 전국은 모든 지역에 해당
        if (project.region === "전국") {
          // 전국은 통과
        } else {
          // 정확히 일치하거나 포함되어야 함
          const projectRegion = project.region?.toLowerCase() || "";
          const filterRegion = filters.region.toLowerCase();

          if (
            projectRegion !== filterRegion &&
            !projectRegion.includes(filterRegion) &&
            !filterRegion.includes(projectRegion)
          ) {
            return false;
          }
        }
      }

      // 상태 필터
      if (
        filters.status &&
        filters.status !== "all" &&
        project.status !== filters.status
      ) {
        return false;
      }

      // 지원형태 필터
      if (
        filters.supportType &&
        filters.supportType !== "전체" &&
        project.supportType !== filters.supportType
      ) {
        return false;
      }

      return true;
    });
  }, [projects, filters]);

  // 상태별 카운트
  const statusCounts = useMemo(() => {
    if (!projects) return { all: 0, open: 0, upcoming: 0, closed: 0 };
    return {
      all: projects.length,
      open: projects.filter((p) => p.status === "open").length,
      upcoming: projects.filter((p) => p.status === "upcoming").length,
      closed: projects.filter((p) => p.status === "closed").length,
    };
  }, [projects]);

  // 페이징 계산
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 필터 변경 시 첫 페이지로 리셋
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">지원사업 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            데이터를 불러올 수 없습니다
          </h2>
          <p className="text-gray-600 mb-4">잠시 후 다시 시도해주세요.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">정부지원사업</h1>
          <p className="text-sm text-gray-500">
            총{" "}
            <span className="font-semibold text-blue-600">
              {projects?.length || 0}개
            </span>
            의 지원사업
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "all", label: "전체", count: statusCounts.all },
            { key: "open", label: "접수중", count: statusCounts.open },
            {
              key: "upcoming",
              label: "접수예정",
              count: statusCounts.upcoming,
            },
            { key: "closed", label: "마감", count: statusCounts.closed },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                handleFilterChange({
                  ...filters,
                  status: tab.key as FilterOptions["status"],
                })
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.status === tab.key
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs ${filters.status === tab.key ? "text-blue-100" : "text-gray-400"}`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Result Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            {filteredProjects.length}개의 검색 결과
            {totalPages > 1 && ` (${currentPage}/${totalPages} 페이지)`}
          </p>
        </div>

        {/* Project List */}
        {paginatedProjects.length > 0 ? (
          <div className="space-y-4 mb-8">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              검색 결과가 없습니다
            </h3>
            <p className="text-sm text-gray-500">
              필터 조건을 변경하거나 다른 키워드로 검색해 보세요
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
