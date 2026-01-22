import { Link } from "react-router-dom";
import { ArrowRight, Target, Zap, Shield, TrendingUp } from "lucide-react";
import { mockProjects } from "../data/mockProjects";
import ProjectCard from "../components/ProjectCard";

export default function HomePage() {
  const openProjects = mockProjects
    .filter((p) => p.status === "open")
    .slice(0, 3);

  const features = [
    {
      icon: Target,
      title: "맞춤 추천",
      description: "내 사업 정보에 맞는 지원사업만 골라서 보여드려요",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "실시간 업데이트",
      description: "매일 새로운 공고를 자동으로 수집하고 알려드려요",
      color: "bg-purple-500",
    },
    {
      icon: Shield,
      title: "검증된 정보",
      description: "공공데이터포털 공식 API를 통해 정확한 정보만 제공해요",
      color: "bg-green-500",
    },
    {
      icon: TrendingUp,
      title: "성공률 향상",
      description: "조건에 맞는 사업에 집중해서 신청 성공률을 높여요",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            현재 {openProjects.length}개 공고 접수중
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            내 사업에 딱 맞는
            <br />
            <span className="text-gradient">정부지원사업</span>을 찾아보세요
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            복잡한 정부지원사업, 이제 지원나우에서 간편하게!
            <br />
            사업자 정보만 입력하면 맞춤 공고를 추천해 드려요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl gradient-primary text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              무료로 추천받기
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-gray-700 font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-200"
            >
              전체 공고 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 지원나우인가요?
            </h2>
            <p className="text-lg text-gray-600">
              더 쉽고, 더 빠르게 정부지원사업을 찾아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                지금 신청 가능한 공고
              </h2>
              <p className="text-gray-600">놓치기 전에 확인하세요!</p>
            </div>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
              전체보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <Link
            to="/projects"
            className="sm:hidden flex items-center justify-center gap-2 mt-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            전체 공고 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl gradient-primary p-10 md:p-16 text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                무료로 내 사업에 맞는 정부지원사업을 확인하고,
                <br />
                성공적인 사업 성장을 이루어 보세요.
              </p>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-blue-600 font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                내 프로필 입력하기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 지원나우. 정부지원사업 맞춤 추천 서비스</p>
          <p className="mt-2">
            본 서비스는 공공데이터포털의 정보를 활용하며, 공고 내용의 정확성은
            해당 기관에서 확인하시기 바랍니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
