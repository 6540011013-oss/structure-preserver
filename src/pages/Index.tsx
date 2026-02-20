import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroImg1 from "@/assets/hotel-hero-1.jpg";
import heroImg2 from "@/assets/hotel-hero-2.jpg";
import heroImg3 from "@/assets/hotel-hero-3.jpg";
import HeroSlider from "@/components/index/HeroSlider";
import BuildingCard from "@/components/index/BuildingCard";
import LoginModal from "@/components/index/LoginModal";
import SiteHeader from "@/components/index/SiteHeader";

const slides = [heroImg1, heroImg2, heroImg3];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liveTime, setLiveTime] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Slider
  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 3000);
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <SiteHeader liveTime={liveTime} isAdmin={isAdmin} onAdminClick={handleAdminBtn} />
      <HeroSlider slides={slides} currentSlide={currentSlide} />

      {/* Building Cards */}
      <section className="relative z-10 -mt-[120px] px-5 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <BuildingCard
            letter="A"
            code="ABSH"
            name="Building A"
            rooms="104 Rooms"
            floors="9 Floors"
            roomsPerFloor="8 Rooms"
            gradient="bg-gradient-to-br from-violet-600 to-purple-600"
            href="/building-a"
            btnColor="bg-violet-600 hover:bg-violet-700"
          />
          <BuildingCard
            letter="B"
            code="ABSC"
            name="Building B"
            rooms="40 Rooms"
            floors="4 Floors"
            roomsPerFloor="10 Rooms"
            gradient="bg-gradient-to-br from-pink-500 to-rose-500"
            href="/building-b"
            btnColor="bg-violet-600 hover:bg-violet-700"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-500 border-t border-slate-200">
        © Andaman Beach Suites Hotel
      </footer>

      {showLoginModal && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
