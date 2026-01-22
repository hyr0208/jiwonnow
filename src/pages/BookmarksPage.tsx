import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">즐겨찾기</h1>
          <p className="text-gray-600">저장한 공고를 확인하세요</p>
        </div>

        {/* Empty State */}
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            저장한 공고가 없습니다
          </h2>
          <p className="text-gray-500 mb-6">
            관심있는 공고의 저장 버튼을 눌러 즐겨찾기에 추가해 보세요
          </p>
        </div>
      </div>
    </div>
  );
}
