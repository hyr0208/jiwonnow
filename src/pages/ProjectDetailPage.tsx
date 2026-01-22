import { useParams, Link, useNavigate } from "react-router-dom";
import { mockProjects } from "../data/mockProjects";
import {
  ArrowLeft,
  Calendar,
  Building2,
  MapPin,
  Tag,
  ExternalLink,
  Users,
  FileText,
  Bookmark,
  Share2,
} from "lucide-react";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-10 px-4">
        <div className="max-w-3xl mx-auto text-center py-20">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            공고를 찾을 수 없습니다
          </h2>
          <p className="text-gray-500 mb-6">
            요청하신 공고가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            공고 목록으로
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (project.status) {
      case "open":
        return (
          <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-green-100 text-green-700">
            접수중
          </span>
        );
      case "upcoming":
        return (
          <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
            접수예정
          </span>
        );
      case "closed":
        return (
          <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-gray-100 text-gray-500">
            마감
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-32 md:pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {getStatusBadge()}
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-600">
                {project.supportType}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>{project.organization}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{project.region}</span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">접수기간</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(project.applicationStartDate)}
                  <br />~ {formatDate(project.applicationEndDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">지원대상</p>
                <p className="font-semibold text-gray-900">
                  {project.targetAudience}
                </p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Support Content */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                지원내용
              </h2>
              <div className="p-4 rounded-xl bg-blue-50 text-gray-700 leading-relaxed">
                {project.supportContent}
              </div>
            </section>

            {/* Application Method */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                신청방법
              </h2>
              <div className="p-4 rounded-xl bg-purple-50 text-gray-700 leading-relaxed">
                {project.applicationMethod}
              </div>
            </section>

            {/* Tags */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                관련 태그
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-700"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Actions */}
          <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={project.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-xl gradient-primary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                공식 사이트에서 신청하기
              </a>
              <button className="sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                <Bookmark className="w-5 h-5" />
                저장
              </button>
              <button className="sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
                공유
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
