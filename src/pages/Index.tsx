import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { LogIn, Check } from "lucide-react";
import LoginModal from "@/components/index/LoginModal";
import HeroSlider from "@/components/index/HeroSlider";
import heroImg1 from "@/assets/hotel-hero-1.jpg";
import heroImg2 from "@/assets/hotel-hero-2.jpg";
import heroImg3 from "@/assets/hotel-hero-3.jpg";

const slides = [heroImg1, heroImg2, heroImg3];

export default function Index() {
  const [liveTime, setLiveTime] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleLogin = useCallback((password: string) => {
    if (password === "1234") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setShowLoginModal(false);
      return true;
    }
    return false;
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              🏨
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

          <div className="hidden lg:flex items-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Local Time :</span>
              <span className="text-md font-mono font-bold text-slate-700">{liveTime}</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Server Status :</span>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-sm font-bold text-green-700">Active</span>
            </div>
          </div>

          <button
            onClick={handleAdminBtn}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 group shadow-sm ${
              isAdmin
                ? "bg-green-600 border-2 border-green-600 text-white hover:bg-green-700"
                : "border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>{isAdmin ? "ADMIN ACTIVE" : "STAFF LOGIN"}</span>
            {isAdmin ? (
              <Check className="h-4 w-4" />
            ) : (
              <LogIn className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
      </header>

      {/* ===== HERO SLIDER ===== */}
      <HeroSlider slides={slides} currentSlide={currentSlide} />

      {/* ===== BUILDING CARDS ===== */}
      <section className="relative z-10 -mt-[120px] px-5 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Building A */}
          <div className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-12 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)]">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 mx-auto mb-5 flex items-center justify-center text-3xl font-bold text-white">
              A
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">ABSH</h3>
            <p className="text-slate-500 mb-6">Building A • 104 Rooms</p>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 mb-6 space-y-2">
              <div className="flex justify-between">
                <span>Total Floors</span>
                <span className="font-semibold text-slate-900">9 Floors</span>
              </div>
              <div className="flex justify-between">
                <span>Rooms/Floor</span>
                <span className="font-semibold text-slate-900">8 Rooms</span>
              </div>
            </div>
            <Link
              to="/building-a"
              className="inline-block bg-violet-600 text-white rounded-xl px-6 py-2.5 font-semibold text-sm hover:bg-violet-700 transition-colors no-underline"
            >
              View Floor Plan →
            </Link>
          </div>

          {/* Building B */}
          <div className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-12 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)]">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mx-auto mb-5 flex items-center justify-center text-3xl font-bold text-white">
              B
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">ABSC</h3>
            <p className="text-slate-500 mb-6">Building B • 40 Rooms</p>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 mb-6 space-y-2">
              <div className="flex justify-between">
                <span>Total Floors</span>
                <span className="font-semibold text-slate-900">4 Floors</span>
              </div>
              <div className="flex justify-between">
                <span>Rooms/Floor</span>
                <span className="font-semibold text-slate-900">10 Rooms</span>
              </div>
            </div>
            <Link
              to="/building-b"
              className="inline-block bg-violet-600 text-white rounded-xl px-6 py-2.5 font-semibold text-sm hover:bg-violet-700 transition-colors no-underline"
            >
              View Floor Plan →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 text-center text-sm text-slate-500 border-t border-slate-200">
        © Andaman Beach Suites Hotel
      </footer>

      {showLoginModal && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}
