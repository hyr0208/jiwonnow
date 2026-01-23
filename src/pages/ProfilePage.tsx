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
      // 2. (추후) 업종/태그 매칭
      const recommended = projects.filter((project) => {
        // 지역 필터: '전체' 또는 사용자 지역과 일치
        const regionMatch =
          project.region === "전체" ||
          project.region.includes(profile.region) ||
          profile.region.includes(project.region);

        return regionMatch;
      });
      setRecommendedProjects(recommended);
    }
  }, [showRecommendations, profile, projects]);

  const handleSubmit = async (newProfile: UserProfile) => {
    if (!user) return;

    setIsSaving(true);
    try {
      await updateUserProfile(user.uid, newProfile);
      setProfile(newProfile);
      setShowRecommendations(true);
      // 스크롤을 아래로 이동
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
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
