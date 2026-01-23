import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LoginRequestModal from "../components/LoginRequestModal";
import { useProjects } from "../hooks/useProjects"; // useProjects 훅 사용
import { useAuth } from "../contexts/AuthContext";
import { toggleBookmark, checkIsBookmarked } from "../services/bookmarkService";
import dayjs from "dayjs";
import "dayjs/locale/ko";
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
  Loader2,
} from "lucide-react";

dayjs.locale("ko");

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, login } = useAuth(); // AuthContext 사용

  // API에서 프로젝트 목록 가져오기
  const { data: projects, isLoading, error } = useProjects({ pageSize: 100 });

  // ID로 프로젝트 찾기
  const project = projects?.find((p) => p.id === id);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginConfirm = async () => {
    try {
      await login();
      setIsLoginModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  // 즐겨찾기 상태 확인
  useEffect(() => {
    const checkStatus = async () => {
      if (user && id) {
        const status = await checkIsBookmarked(user.uid, id);
        setIsBookmarked(status);
      } else {
        setIsBookmarked(false);
      }
    };
    checkStatus();
  }, [user, id]);

  const handleBookmark = async () => {
    if (!user) {
      // 로그인 안 되어 있으면 커스텀 모달 띄우기
      setIsLoginModalOpen(true);
      return;
    }

    if (!project || isBookmarkLoading) return;

    setIsBookmarkLoading(true);
    try {
      const newStatus = await toggleBookmark(user.uid, project);
      setIsBookmarked(newStatus);
    } catch (error) {
      console.error("즐겨찾기 처리 실패:", error);
      alert("즐겨찾기 처리에 실패했습니다.");
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: project?.title || "지원나우 - 정부지원사업",
      text: `${project?.title} - ${project?.organization}`,
      url: window.location.href,
    };

    try {
      // Web Share API 지원 시 네이티브 공유
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // 미지원 시 클립보드에 URL 복사
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 클립보드에 복사되었습니다!");
      }
    } catch (error) {
      // 사용자가 공유 취소한 경우 무시
      if ((error as Error).name !== "AbortError") {
        console.error("공유 실패:", error);
      }
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">공고 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 또는 프로젝트 없음
  if (error || !project) {
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
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
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
    if (!dateString) return "미정";

    // dayjs로 파싱 시도 (다양한 형식 자동 처리)
    const date = dayjs(dateString);

    if (!date.isValid()) return dateString;

    return date.format("YYYY년 M월 D일");
  };

  return (
    <div className="min-h-screen py-8 px-6 lg:px-12 bg-white">
      <LoginRequestModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onConfirm={handleLoginConfirm}
      />
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 font-semibold mb-6 transition-all hover:bg-white hover:shadow-md border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-10 border-b border-gray-100 bg-gradient-to-br from-blue-50/30 to-purple-50/30">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {getStatusBadge()}
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200">
                {project.supportType}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold md:font-black text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-700">
              <div className="flex items-center gap-2.5 bg-white/60 rounded-xl px-4 py-2.5 shadow-sm">
                <Building2 className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">{project.organization}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/60 rounded-xl px-4 py-2.5 shadow-sm">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span className="font-semibold">{project.region}</span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  접수기간
                </p>
                <p className="font-bold text-gray-900 text-base leading-relaxed">
                  {formatDate(project.applicationStartDate)}
                  <br />~ {formatDate(project.applicationEndDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  지원대상
                </p>
                <p className="font-bold text-gray-900 text-base">
                  {project.targetAudience}
                </p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Support Content */}
            {project.supportContent && (
              <section>
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  지원내용
                </h2>
                <div
                  className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 text-gray-800 leading-relaxed font-medium border border-blue-200 shadow-sm"
                  dangerouslySetInnerHTML={{ __html: project.supportContent }}
                />
              </section>
            )}

            {/* Application Method */}
            {project.applicationMethod && (
              <section>
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  신청방법
                </h2>
                <div
                  className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 leading-relaxed font-medium border border-purple-200 shadow-sm"
                  dangerouslySetInnerHTML={{
                    __html: project.applicationMethod,
                  }}
                />
              </section>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <section>
                <h2 className="text-xl font-black text-gray-900 mb-4">
                  관련 태그
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
                    >
                      <Tag className="w-4 h-4 text-gray-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 md:p-10 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={project.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 py-5 rounded-2xl bg-blue-500 text-white font-black text-lg shadow-xl hover:shadow-2xl hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 transform hover:scale-[1.02]"
              >
                <ExternalLink className="w-5 h-5" />
                공식 사이트에서 신청하기
              </a>
              <button
                onClick={handleBookmark}
                disabled={isBookmarkLoading}
                className={`sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-5 rounded-2xl border-2 font-bold transition-all duration-300 shadow-sm hover:shadow-md ${
                  isBookmarked
                    ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                } ${isBookmarkLoading ? "opacity-70 cursor-wait" : ""}`}
              >
                {isBookmarkLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Bookmark
                    className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                  />
                )}
                {isBookmarked ? "저장됨" : "저장"}
              </button>
              <button
                onClick={handleShare}
                className="sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-5 rounded-2xl border-2 border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
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
