import { useState } from "react";
import {
  type UserProfile,
  REGIONS,
  INDUSTRIES,
  BUSINESS_TYPES,
  REVENUE_RANGES,
} from "../types";
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  ChevronDown,
} from "lucide-react";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  initialData?: Partial<UserProfile>;
}

export default function ProfileForm({
  onSubmit,
  initialData,
}: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>({
    region: initialData?.region || "",
    industry: initialData?.industry || "",
    businessType: initialData?.businessType || ("pre-startup" as UserProfile["businessType"]),
    revenueRange: initialData?.revenueRange || "",
    foundedYear: initialData?.foundedYear || undefined,
    employeeCount: initialData?.employeeCount || undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Type */}
      <div>
        <label className="block text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          사업자 형태
        </label>
        <div className="grid grid-cols-3 gap-3">
          {BUSINESS_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() =>
                setProfile({
                  ...profile,
                  businessType: type.value as UserProfile["businessType"],
                })
              }
              className={`py-4 px-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                profile.businessType === type.value
                  ? "bg-blue-600 text-white shadow-lg border-2 border-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div>
        <label className="block text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          지역 (시/도)
        </label>
        <div className="relative">
          <select
            value={profile.region}
            onChange={(e) => setProfile({ ...profile, region: e.target.value })}
            className="w-full appearance-none pl-4 pr-12 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-gray-700"
            required
          >
            <option value="">지역을 선택하세요</option>
            {REGIONS.filter((r) => r !== "전체").map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Industry */}
      <div>
        <label className="block text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-green-600" />
          </div>
          업종
        </label>
        <div className="relative">
          <select
            value={profile.industry}
            onChange={(e) =>
              setProfile({ ...profile, industry: e.target.value })
            }
            className="w-full appearance-none pl-4 pr-12 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-gray-700"
            required
          >
            <option value="">업종을 선택하세요</option>
            {INDUSTRIES.filter((i) => i !== "전체").map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Founded Year */}
        <div>
          <label className="block text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-orange-600" />
            </div>
            설립연도
          </label>
          <div className="relative">
            <select
              value={profile.foundedYear || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  foundedYear: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="w-full appearance-none pl-4 pr-12 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-gray-700"
            >
              <option value="">선택 (선택사항)</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Employee Count */}
        <div>
          <label className="block text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-pink-600" />
            </div>
            직원 수
          </label>
          <input
            type="number"
            min="0"
            placeholder="직원 수 입력 (선택사항)"
            value={profile.employeeCount || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                employeeCount: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Revenue Range */}
      <div>
        <label className="block text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-yellow-600" />
          </div>
          연 매출 구간
        </label>
        <div className="relative">
          <select
            value={profile.revenueRange || ""}
            onChange={(e) =>
              setProfile({ ...profile, revenueRange: e.target.value })
            }
            className="w-full appearance-none pl-4 pr-12 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-gray-700"
          >
            <option value="">선택 (선택사항)</option>
            {REVENUE_RANGES.filter((r) => r !== "선택안함").map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-5 rounded-2xl gradient-primary border font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-[1.02]"
      >
        맞춤 공고 추천받기 ✨
      </button>
    </form>
  );
}
