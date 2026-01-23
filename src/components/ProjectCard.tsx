import dayjs from "dayjs";
import { type Project } from "../types";
import { Calendar, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}
export default function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "미정";

    // dayjs로 파싱 시도 (다양한 형식 자동 처리)
    const date = dayjs(dateString);

    if (!date.isValid()) return dateString;

    return date.format("YYYY년 M월 D일");
  };

  const getStatusTypeLabel = () => {
    return `${project.supportType}${project.status === "open" ? "접수중" : project.status === "upcoming" ? "접수예정" : "마감"}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white ${
              project.status === "open"
                ? "bg-green-500"
                : project.status === "upcoming"
                  ? "bg-orange-500"
                  : "bg-gray-400"
            }`}
          >
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
          {(project.tags || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Date & Link */}
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              {formatDate(project.applicationStartDate)} ~{" "}
              {formatDate(project.applicationEndDate)}
            </span>
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="self-end inline-flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            상세보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
