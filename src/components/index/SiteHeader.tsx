import { LogIn, Check } from "lucide-react";

interface SiteHeaderProps {
  liveTime: string;
  isAdmin: boolean;
  onAdminClick: () => void;
}

export default function SiteHeader({ liveTime, isAdmin, onAdminClick }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-2xl font-black text-white shadow-lg">
            A
          </div>
          <div className="hidden sm:block border-l-2 border-slate-300 pl-4 py-1">
            <h1 className="text-lg font-extrabold text-slate-800 tracking-tight leading-none">
              ANDAMAN BEACH SUITES HOTEL
            </h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
              Room Status System
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="hidden lg:flex items-center gap-8 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Local Time :</span>
            <span className="text-md font-mono font-bold text-slate-700">{liveTime}</span>
          </div>
          <div className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Server Status :</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-sm font-bold text-green-700">Active</span>
            </div>
          </div>
        </div>

        {/* Admin Button */}
        <button
          onClick={onAdminClick}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 shadow-sm ${
            isAdmin
              ? "bg-green-600 border-2 border-green-600 text-white hover:bg-green-700"
              : "border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>{isAdmin ? "ADMIN ACTIVE" : "STAFF LOGIN"}</span>
          {isAdmin ? <Check className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
