import { X, LogIn } from "lucide-react";

interface LoginRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LoginRequestModal({
  isOpen,
  onClose,
  onConfirm,
}: LoginRequestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl transform transition-all animate-in fade-in zoom-in-95 duration-200 p-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-6 h-6 text-blue-600" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          로그인이 필요해요
        </h3>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          이 기능을 사용하려면 로그인이 필요합니다.
          <br />
          로그인하고 더 많은 기능을 이용해보세요!
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors shadow-sm"
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
