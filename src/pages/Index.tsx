import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Users, BedDouble, TrendingUp, ArrowRight, Hotel, Clock, Activity, LogIn, Check, Lock, DoorOpen, CalendarCheck, AlertTriangle } from "lucide-react";
import LoginModal from "@/components/index/LoginModal";
import heroImg1 from "@/assets/hotel-hero-1.jpg";

export default function Index() {
  const [liveTime, setLiveTime] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleLogin = (password: string) => {
    if (password === "1234") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setShowLoginModal(false);
      return true;
    }
    return false;
  };

  const handleAdminBtn = () => {
    if (isAdmin) {
      if (confirm("Log out of Admin?")) {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans text-white">
      {/* ===== TOP NAV ===== */}
      <header className="sticky top-0 z-50 bg-[#1e293b]/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-full mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
              <Hotel className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none tracking-wide">ANDAMAN BEACH SUITES</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mt-0.5">Property Management System</p>
            </div>
          </div>

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
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">Online</span>
            </div>
          </div>

          <button
            onClick={handleAdminBtn}
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

      {/* ===== HERO BANNER ===== */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg1})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-[#0f172a]/50 to-[#0f172a]" />
        <div className="relative z-10 h-full flex items-center px-8">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-1">{dateStr}</p>
            <h2 className="text-2xl font-bold text-white">Welcome back, Team 👋</h2>
            <p className="text-slate-400 text-sm mt-1">Here's your property overview for today.</p>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="px-6 pb-12 -mt-4 relative z-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BedDouble, label: "Total Rooms", value: "144", sub: "Building A + B", color: "from-violet-500 to-purple-600" },
            { icon: Users, label: "Occupied", value: "87", sub: "60.4% occupancy", color: "from-emerald-500 to-teal-600" },
            { icon: DoorOpen, label: "Available", value: "42", sub: "Ready to check-in", color: "from-blue-500 to-cyan-600" },
            { icon: AlertTriangle, label: "Maintenance", value: "15", sub: "Under service", color: "from-amber-500 to-orange-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1e293b] rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">{stat.label}</p>
              <p className="text-[11px] text-slate-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Buildings Section */}
        <div className="mb-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <Building2 className="h-5 w-5 text-slate-400" />
            <h3 className="text-lg font-bold text-white">Buildings Overview</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Building A */}
            <Link to="/building-a" className="no-underline group">
              <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-600" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-violet-500/20">
                        A
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Building A — ABSH</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Ocean View • Main Building</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-white">104</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rooms</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-white">9</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Floors</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-emerald-400">68%</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Occupied</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Building B */}
            <Link to="/building-b" className="no-underline group">
              <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 overflow-hidden hover:border-rose-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-rose-500/20">
                        B
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Building B — ABSC</h4>
                        <p className="text-xs text-slate-400 mt-0.5">City View • Condo Wing</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-white">40</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rooms</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-white">4</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Floors</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-emerald-400">45%</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Occupied</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: CalendarCheck, label: "Today's Check-in", value: "12 guests", color: "text-blue-400" },
            { icon: DoorOpen, label: "Today's Check-out", value: "8 guests", color: "text-amber-400" },
            { icon: BedDouble, label: "Housekeeping", value: "6 pending", color: "text-violet-400" },
            { icon: AlertTriangle, label: "Alerts", value: "2 issues", color: "text-rose-400" },
          ].map((action) => (
            <div key={action.label} className="bg-[#1e293b]/60 rounded-xl p-4 border border-slate-700/30 flex items-center gap-3">
              <action.icon className={`h-5 w-5 ${action.color} flex-shrink-0`} />
              <div>
                <p className="text-xs font-semibold text-slate-300">{action.label}</p>
                <p className="text-[11px] text-slate-500">{action.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-700/30 text-center">
          <p className="text-xs text-slate-500">© Andaman Beach Suites Hotel — Room Status System v2.0</p>
        </footer>
      </div>

      {showLoginModal && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}
