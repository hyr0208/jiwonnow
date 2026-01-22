import { useState } from "react";
import {
  UserProfile,
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
    businessType: initialData?.businessType || "individual",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <Building2 className="inline w-4 h-4 mr-2" />
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
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                profile.businessType === type.value
                  ? "gradient-primary text-white shadow-lg"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <MapPin className="inline w-4 h-4 mr-2" />
          지역 (시/도)
        </label>
        <div className="relative">
          <select
            value={profile.region}
            onChange={(e) => setProfile({ ...profile, region: e.target.value })}
            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            required
          >
            <option value="">지역을 선택하세요</option>
            {REGIONS.filter((r) => r !== "전체").map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Building2 className="inline w-4 h-4 mr-2" />
          업종
        </label>
        <div className="relative">
          <select
            value={profile.industry}
            onChange={(e) =>
              setProfile({ ...profile, industry: e.target.value })
            }
            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            required
          >
            <option value="">업종을 선택하세요</option>
            {INDUSTRIES.filter((i) => i !== "전체").map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Founded Year */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-2" />
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
              className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            >
              <option value="">선택 (선택사항)</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Employee Count */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-2" />
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Revenue Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <DollarSign className="inline w-4 h-4 mr-2" />연 매출 구간
        </label>
        <div className="relative">
          <select
            value={profile.revenueRange || ""}
            onChange={(e) =>
              setProfile({ ...profile, revenueRange: e.target.value })
            }
            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          >
            <option value="">선택 (선택사항)</option>
            {REVENUE_RANGES.filter((r) => r !== "선택안함").map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl gradient-primary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      >
        맞춤 공고 추천받기
      </button>
    </form>
  );
}
