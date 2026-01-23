import { useState, useEffect } from "react";
import { type UserProfile, type Project } from "../types";
import ProfileForm from "../components/ProfileForm";
import ProjectCard from "../components/ProjectCard";
import { User, Sparkles, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { useProjects } from "../hooks/useProjects";

export default function ProfilePage() {
  const { user, login, loading: authLoading } = useAuth();
  const { data: projects } = useProjects({ pageSize: 100 });

  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // 프로필 데이터 로드
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        setIsLoadingProfile(true);
        try {
          const userProfile = await getUserProfile(user.uid);
          if (userProfile) {
            setProfile(userProfile);
          }
        } catch (error) {
          console.error("Failed to load profile", error);
        } finally {
          setIsLoadingProfile(false);
        }
      }
    };

    if (!authLoading) {
      loadProfile();
    }
  }, [user, authLoading]);

  // 추천 로직 수행
  useEffect(() => {
    if (showRecommendations && profile && projects) {
      // 1. 지역 매칭 (필수)
      // 2. 업종 매칭 (선택)
      const recommended = projects.filter((project) => {
        // 지역 필터: '전체' 또는 사용자 지역과 일치
        const regionMatch =
          project.region === "전체" ||
          project.region.includes(profile.region) ||
          profile.region.includes(project.region);

        if (!regionMatch) return false;

        // 업종 필터: 선택한 업종과 관련성 체크
        if (profile.industry && profile.industry !== "전체") {
          const content = `${project.title} ${project.tags.join(" ")} ${project.description} ${project.targetAudience} ${project.supportContent}`;

          // 1. 공통 키워드 체크 (변별력을 위해 제외 - 업종 연관성 집중)
          // const commonKeywords = ["중소기업", "소상공인", "전체", "공통", "모든", "스타트업"];
          // if (commonKeywords.some((k) => content.includes(k))) return true;

          // 2. 업종별 키워드 확장 매핑
          let keywords = [profile.industry.replace("업", "")]; // 기본 키워드 (예: 제조, 건설)

          switch (profile.industry) {
            case "정보통신업":
              keywords.push(
                "IT",
                "SW",
                "소프트웨어",
                "ICT",
                "플랫폼",
                "앱",
                "데이터",
                "인공지능",
                "AI",
                "디지털",
              );
              break;
            case "도소매업":
              keywords.push(
                "도매",
                "소매",
                "유통",
                "물류",
                "무역",
                "상점",
                "마켓",
                "커머스",
                "스토어",
              );
              break;
            case "음식숙박업":
              keywords.push(
                "음식",
                "식당",
                "숙박",
                "외식",
                "푸드",
                "관광",
                "여행",
                "호텔",
              );
              break;
            case "전문과학기술서비스업":
              keywords.push(
                "연구",
                "R&D",
                "과학",
                "기술",
                "특허",
                "지식재산",
                "컨설팅",
              );
              break;
            case "예술스포츠여가업":
              keywords.push(
                "예술",
                "스포츠",
                "콘텐츠",
                "문화",
                "체육",
                "공연",
                "전시",
              );
              break;
            case "보건사회복지업":
              keywords.push("보건", "의료", "복지", "돌봄", "헬스케어", "실버");
              break;
            case "교육서비스업":
              keywords.push("교육", "학원", "에듀테크", "강의", "훈련");
              break;
            case "건설업":
              keywords.push("건축", "토목", "시공", "인테리어");
              break;
          }

          // 업종 키워드 중 하나라도 포함되면 추천
          return keywords.some((k) => content.includes(k));
        }

        return true;
      });
      setRecommendedProjects(recommended);
    }
  }, [showRecommendations, profile, projects]);

  const handleSubmit = async (newProfile: UserProfile) => {
    if (!user) return;

    setIsSaving(true);
    setRecommendedProjects([]); // 결과 초기화 (깜빡임 효과 및 재계산 시각화)
    setShowRecommendations(false); // 잠시 숨김

    try {
      await updateUserProfile(user.uid, newProfile);
      setProfile(newProfile);
      // 약간의 지연 후 결과 표시 (사용자가 "분석 중"임을 느끼도록)
      setTimeout(() => {
        setShowRecommendations(true);
        // 스크롤 이동
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 800);
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("프로필 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen pt-24 flex justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-10 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
          <User className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          로그인이 필요합니다
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          로그인하고 내 사업자 정보를 입력하면
          <br />딱 맞는 정부지원사업을 추천해 드려요!
        </p>
        <button
          onClick={() => login()}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
        >
          <LogIn className="w-5 h-5" />
          3초 만에 로그인하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 lg:px-12 bg-gray-50/50">
      <div className="max-w-3xl mx-auto pt-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            내 맞춤 설정
          </h1>
          <p className="text-gray-600">
            정보를 입력하면{" "}
            <span className="text-blue-600 font-bold">{user.displayName}</span>
            님에게 딱 맞는 공고를 찾아드려요
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 mb-10 relative overflow-hidden">
          {isSaving && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
              <p className="font-bold text-gray-700">분석 중입니다...</p>
            </div>
          )}
          <ProfileForm onSubmit={handleSubmit} initialData={profile || {}} />
        </div>

        {/* Recommendation Results */}
        {showRecommendations && (
          <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-current" />
              <h2 className="text-2xl font-bold text-gray-900">
                맞춤 추천 결과{" "}
                <span className="text-blue-600">
                  {recommendedProjects.length}
                </span>
                건
              </h2>
            </div>

            {recommendedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500">
                  해당 조건에 맞는 공고를 찾지 못했어요 😢
                  <br />
                  지역이나 조건을 변경해보세요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
