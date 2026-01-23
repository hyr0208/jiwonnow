import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import ProjectCard from "../components/ProjectCard";
import { Bookmark, ArrowLeft, Loader2, LogIn } from "lucide-react";
import type { Project } from "../types";

interface BookmarkedProject extends Project {
  bookmarkedAt: any;
}

export default function BookmarksPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<BookmarkedProject[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      // 로그인 안 된 상태면 로딩 종료
      setIsLoadingData(false);
      return;
    }

    const fetchBookmarks = async () => {
      if (!user) return;

      try {
        const bookmarksRef = collection(db, "users", user.uid, "bookmarks");
        const q = query(bookmarksRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const fetchedBookmarks = snapshot.docs.map((doc) => ({
          ...(doc.data() as any),
          id: doc.id, // ID는 문서 ID 사용
          bookmarkedAt: doc.data().createdAt,
        })) as BookmarkedProject[];

        setBookmarks(fetchedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBookmarks();
  }, [user, loading]);

  if (loading) {
    return null; // Auth 로딩 중
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-10 px-4 flex flex-col items-center justify-center text-center">
        <Bookmark className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          로그인이 필요합니다
        </h2>
        <p className="text-gray-500 mb-6">
          즐겨찾기한 공고를 보려면 로그인이 필요해요.
        </p>
        <button
          onClick={async () => {
            try {
              await login();
            } catch (e) {
              console.error(e);
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
        >
          <LogIn className="w-5 h-5" />
          로그인하고 내 공고 보기
        </button>
      </div>
    );
  }

  if (isLoadingData) {
    return (
      <div className="min-h-screen pt-24 pb-10 px-4 flex justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mt-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-screen-2xl mx-auto pt-12 pb-10 px-4 md:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors flex gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> 뒤로가기
            </Link>
          </div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Bookmark className="w-8 h-8 text-blue-500 fill-current" />내
            즐겨찾기
            <span className="text-lg font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              {bookmarks.length}
            </span>
          </h1>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Bookmark className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              저장된 공고가 없어요
            </h3>
            <p className="text-gray-500 mb-6">
              관심 있는 공고를 저장해서 모아보세요!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              공고 보러가기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
