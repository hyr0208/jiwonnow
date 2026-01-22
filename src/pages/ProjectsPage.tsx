import { useState, useMemo } from "react";
import { mockProjects } from "../data/mockProjects";
import { type FilterOptions } from "../types";
import ProjectCard from "../components/ProjectCard";
import FilterBar from "../components/FilterBar";
import { FileText } from "lucide-react";

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    keyword: "",
    region: "전체",
    status: "all",
    supportType: "전체",
  });

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Keyword filter
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

      // Region filter
      if (
        filters.region &&
        filters.region !== "전체" &&
        project.region !== filters.region &&
        project.region !== "전국"
      ) {
        return false;
      }

      // Status filter
      if (
        filters.status &&
        filters.status !== "all" &&
        project.status !== filters.status
      ) {
        return false;
      }

      // Support type filter
      if (
        filters.supportType &&
        filters.supportType !== "전체" &&
        project.supportType !== filters.supportType
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const statusCounts = useMemo(() => {
    return {
      all: mockProjects.length,
      open: mockProjects.filter((p) => p.status === "open").length,
      upcoming: mockProjects.filter((p) => p.status === "upcoming").length,
      closed: mockProjects.filter((p) => p.status === "closed").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">전체 공고</h1>
          <p className="text-sm text-gray-500">
            총{" "}
            <span className="font-semibold text-primary-600">
              {mockProjects.length}개
            </span>
            의 정부지원사업
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
                setFilters({
                  ...filters,
                  status: tab.key as FilterOptions["status"],
                })
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.status === tab.key
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs ${
                  filters.status === tab.key
                    ? "text-primary-100"
                    : "text-gray-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {/* Project List */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
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
      </div>
    </div>
  );
}
