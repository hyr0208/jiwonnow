import { Bookmark } from "lucide-react";

import { Link } from "react-router-dom";
import {  ArrowRight } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="min-h-screen py-8 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            즐겨찾기
          </h1>
          <p className="text-base text-gray-600">
            저장한 공고를 확인하세요
          </p>
        </div>

        {/* Empty State */}
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Bookmark className="w-14 h-14 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            저장한 공고가 없습니다
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            관심있는 공고의 저장 버튼을 눌러 즐겨찾기에 추가해 보세요
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-primary border font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-105"
          >
            공고 둘러보기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
