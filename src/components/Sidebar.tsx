import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Home, Bookmark, User, Search, LogIn, LogOut } from "lucide-react";
import { SUPPORT_TYPES } from "../types";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("keyword") || "";
  const selectedCategory = searchParams.get("category") || "전체";

  const handleLogin = async () => {
    try {
      await login();
      console.log("Logged in!");
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("Logged out!");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("keyword", value);
    } else {
      params.delete("keyword");
    }
    navigate({ search: params.toString() });
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "전체") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    navigate({ search: params.toString() });
  };

  const navItems = [
    { path: "/", label: "홈", icon: Home },
    { path: "/bookmarks", label: "즐겨찾기", icon: Bookmark },
    { path: "/profile", label: "내 프로필", icon: User },
  ];

  const categories = ["전체", ...SUPPORT_TYPES.filter((t) => t !== "전체")];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="지원나우 로고"
            className="w-10 h-10 rounded-lg shadow-md"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">지원나우</span>
            <span className="text-xs text-gray-500">정부지원사업 추천</span>
          </div>
        </Link>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="사업명, 키워드로 검색..."
            value={searchKeyword}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-2">
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName}`
                }
                alt={user.displayName || "User"}
                className="w-8 h-8 rounded-full border border-gray-200"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {user.displayName}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {user.email}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>로그아웃</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200 hover:border-gray-300"
          >
            <LogIn className="w-5 h-5 text-gray-500" />
            <span>로그인</span>
          </button>
        )}
      </div>
    </aside>
  );
}
