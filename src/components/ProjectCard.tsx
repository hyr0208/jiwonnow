import { type Project } from "../types";
import { Calendar, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "open":
        return (
          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">
            접수중
          </span>
        );
      case "upcoming":
        return (
          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">
            접수예정
          </span>
        );
      case "closed":
        return (
          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-500">
            마감
          </span>
        );
    }
  };

  const getSupportTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      자금지원: "bg-blue-500",
      기술지원: "bg-purple-500",
      인력지원: "bg-orange-500",
      수출지원: "bg-green-500",
      창업지원: "bg-pink-500",
    };
    const bgColor = colors[type] || "bg-gray-500";

    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${bgColor}`}
      >
        {type}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusTypeLabel = () => {
    return `${project.supportType}${project.status === "open" ? "접수중" : project.status === "upcoming" ? "접수예정" : "마감"}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white bg-purple-500">
            {getStatusTypeLabel()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
          {project.title}
        </h3>

        {/* Organization */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{project.organization}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {project.region} 지역 {project.supportType} 지원사업
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Date & Link */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              {formatDate(project.applicationStartDate)} ~{" "}
              {formatDate(project.applicationEndDate)}
            </span>
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            상세보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
