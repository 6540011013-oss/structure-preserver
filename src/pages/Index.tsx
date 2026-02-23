import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { LogIn, Check, UserCircle } from "lucide-react";
import LoginModal from "@/components/index/LoginModal";
import HeroSlider from "@/components/index/HeroSlider";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg1 from "@/assets/hotel-hero-1.jpg";
import heroImg2 from "@/assets/hotel-hero-2.jpg";
import heroImg3 from "@/assets/hotel-hero-3.jpg";

const slides = [heroImg1, heroImg2, heroImg3];

export default function Index() {
  const { t } = useLanguage();
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
      if (confirm(t("login.logoutConfirm"))) {
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
                {t("hotel.name")}
              </h1>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
                {t("hotel.subtitle")}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">{t("time.label")}</span>
              <span className="text-md font-mono font-bold text-slate-700">{liveTime}</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">{t("server.label")}</span>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-sm font-bold text-green-700">{t("server.active")}</span>
            </div>
          </div>

          <button
            onClick={handleAdminBtn}
            className={`flex items-center gap-2.5 pl-3 pr-5 py-2 rounded-full text-xs font-black tracking-wide transition-all duration-300 group shadow-sm ${
              isAdmin
                ? "bg-green-600 border-2 border-green-600 text-white hover:bg-green-700"
                : "border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {isAdmin ? (
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white group-hover:bg-white group-hover:text-slate-800 flex items-center justify-center transition-colors">
                <UserCircle className="h-5 w-5" />
              </div>
            )}
            <span>{isAdmin ? t("btn.adminActive") : t("btn.staffLogin")}</span>
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
            <h3 className="text-2xl font-bold mb-2 text-slate-800">{t("building.a.name")}</h3>
            <p className="text-slate-500 mb-6">{t("building.a.desc")}</p>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 mb-6 space-y-2">
              <div className="flex justify-between">
                <span>{t("label.totalFloors")}</span>
                <span className="font-semibold text-slate-900">{t("building.a.floors")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("label.roomsPerFloor")}</span>
                <span className="font-semibold text-slate-900">{t("building.a.roomsFloor")}</span>
              </div>
            </div>
            <Link
              to="/building-a"
              className="inline-block bg-violet-600 text-white rounded-xl px-6 py-2.5 font-semibold text-sm hover:bg-violet-700 transition-colors no-underline"
            >
              {t("btn.viewFloorPlan")}
            </Link>
          </div>

          {/* Building B */}
          <div className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-12 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)]">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mx-auto mb-5 flex items-center justify-center text-3xl font-bold text-white">
              B
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">{t("building.b.name")}</h3>
            <p className="text-slate-500 mb-6">{t("building.b.desc")}</p>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 mb-6 space-y-2">
              <div className="flex justify-between">
                <span>{t("label.totalFloors")}</span>
                <span className="font-semibold text-slate-900">{t("building.b.floors")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("label.roomsPerFloor")}</span>
                <span className="font-semibold text-slate-900">{t("building.b.roomsFloor")}</span>
              </div>
            </div>
            <Link
              to="/building-b"
              className="inline-block bg-violet-600 text-white rounded-xl px-6 py-2.5 font-semibold text-sm hover:bg-violet-700 transition-colors no-underline"
            >
              {t("btn.viewFloorPlan")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 text-center text-sm text-slate-500 border-t border-slate-200">
        {t("footer.copyright")}
      </footer>

      {showLoginModal && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}
