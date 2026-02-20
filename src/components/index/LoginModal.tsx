import { useRef, useState, useEffect } from "react";
import { Lock } from "lucide-react";

interface LoginModalProps {
  onLogin: (password: string) => boolean;
  onClose: () => void;
}

export default function LoginModal({ onLogin, onClose }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!onLogin(password)) {
      alert("Incorrect password ❌");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-[360px] text-center animate-[popIn_0.25s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {/* Icon */}
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
          <Lock className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Staff Login</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">Please enter passcode to access</p>

        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="••••"
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mb-5 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-center text-lg tracking-widest transition-all"
        />

        <div className="flex gap-3">
          <button
            onClick={() => { onClose(); setPassword(""); }}
            className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-3 rounded-xl hover:bg-slate-50 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
