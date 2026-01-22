import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../types";
import ProfileForm from "../components/ProfileForm";
import { User, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (profile: UserProfile) => {
    console.log("Profile submitted:", profile);
    setSubmitted(true);
    // 실제 구현에서는 프로필 저장 후 추천 결과 페이지로 이동
    setTimeout(() => {
      navigate("/projects");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-32 md:pb-10 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            맞춤 공고를 분석중이에요!
          </h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            내 프로필 입력
          </h1>
          <p className="text-gray-600">
            사업자 정보를 입력하면 맞춤 정부지원사업을 추천해 드려요
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <ProfileForm onSubmit={handleSubmit} />
        </div>

        {/* Info */}
        <p className="text-center text-sm text-gray-500 mt-6">
          입력하신 정보는 맞춤 추천을 위해서만 사용되며,
          <br />
          외부에 공유되지 않습니다.
        </p>
      </div>
    </div>
  );
}
