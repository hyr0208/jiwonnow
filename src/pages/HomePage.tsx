import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useProjects, useFilteredProjects } from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("keyword") || "";
  const selectedCategory = searchParams.get("category") || "전체";

  // API에서 데이터 가져오기
  const { data: projects, isLoading, error } = useProjects();

  // 필터링
  const filteredProjects = useFilteredProjects(projects, {
    keyword: searchKeyword,
    category: selectedCategory,
  });

  const openProjects = filteredProjects.filter((p) => p.status === "open");

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
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory === "전체"
              ? "전체 공고"
              : `${selectedCategory} 접수중`}
          </h2>
          <p className="text-sm text-gray-500">
            {openProjects.length}개의 지원사업
          </p>
        </div>

        {/* Projects List - Vertical Layout */}
        <div className="space-y-4 mb-12">
          {openProjects.length > 0 ? (
            openProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>

        {/* See All Button */}
        <div className="text-center mb-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            전체 공고 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            왜 지원나우인가요?
          </h2>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              맞춤 추천
            </h3>
            <p className="text-sm text-gray-600">
              내 사업 정보에 맞는 지원사업만 골라서 보여드려요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
