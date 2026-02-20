import { LogIn, Check, Clock, Activity, Hotel } from "lucide-react";

interface SiteHeaderProps {
  liveTime: string;
  isAdmin: boolean;
  onAdminClick: () => void;
}

export default function SiteHeader({ liveTime, isAdmin, onAdminClick }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] shadow-lg">
      <div className="max-w-full mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
            <Hotel className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-white leading-none tracking-wide">
              ANDAMAN BEACH SUITES
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mt-0.5">
              Room Status System
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="hidden lg:flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-[11px] uppercase font-bold tracking-wider">Local Time</span>
            <span className="text-sm font-mono font-bold text-white">{liveTime}</span>
          </div>
          <div className="h-5 w-px bg-slate-600" />
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5" />
            <span className="text-[11px] uppercase font-bold tracking-wider">Server</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              <span className="text-xs font-bold text-emerald-400">Active</span>
            </div>
          </div>
        </div>

        {/* Admin Button */}
        <button
          onClick={onAdminClick}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all border-none cursor-pointer ${
            isAdmin
              ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
          }`}
        >
          {isAdmin ? <Check className="h-3.5 w-3.5" /> : <LogIn className="h-3.5 w-3.5" />}
          <span>{isAdmin ? "Admin Active" : "Staff Login"}</span>
        </button>
      </div>
    </header>
  );
}
