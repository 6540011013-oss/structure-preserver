import { useEffect, useRef, useState } from "react";
import heroImg1 from "@/assets/hotel-hero-1.jpg";
import heroImg2 from "@/assets/hotel-hero-2.jpg";
import heroImg3 from "@/assets/hotel-hero-3.jpg";

const slides = [heroImg1, heroImg2, heroImg3];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liveTime, setLiveTime] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

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
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  const handleLogin = () => {
    if (password === "1234") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setShowLoginModal(false);
      setPassword("");
    } else {
      alert("Incorrect passcode ❌");
    }
  };

  const handleAdminBtn = () => {
    if (isAdmin) {
      if (confirm("Log out of Admin?")) {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);
      }
    } else {
      setShowLoginModal(true);
      setTimeout(() => passwordRef.current?.focus(), 100);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "hsl(220 22% 96%)", minHeight: "100vh" }}>
      {/* ===== SITE HEADER ===== */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "hsla(222, 50%, 8%, 0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid hsla(40, 85%, 45%, 0.2)",
        padding: "12px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 20px hsla(222, 50%, 5%, 0.5)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Logo placeholder */}
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            background: "linear-gradient(135deg, hsl(38,85%,42%), hsl(44,90%,60%))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 900, color: "#fff",
            flexShrink: 0,
            boxShadow: "0 4px 16px hsla(40,85%,45%,0.4)"
          }}>A</div>
          <div style={{ borderLeft: "1.5px solid hsla(40,85%,45%,0.25)", paddingLeft: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "0.04em", fontFamily: "'Playfair Display', serif" }}>
              ANDAMAN BEACH SUITES HOTEL
            </div>
            <div style={{ fontSize: 10, color: "hsl(42,90%,68%)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginTop: 2 }}>
              Room Status System
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 10, color: "hsl(220 15% 55%)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Local Time</span>
            <span style={{ fontSize: 16, fontFamily: "monospace", fontWeight: 800, color: "hsl(42,90%,68%)", letterSpacing: "0.05em" }}>{liveTime}</span>
          </div>
          <div style={{ width: 1, height: 32, background: "hsla(40,85%,45%,0.2)" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 10, color: "hsl(220 15% 55%)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Server Status</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px rgba(34,197,94,0.6)", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: "#22c55e" }}>Active</span>
            </div>
          </div>
          <div style={{ width: 1, height: 32, background: "hsla(40,85%,45%,0.2)" }} />
          <button onClick={handleAdminBtn} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 20px", borderRadius: 8,
            border: isAdmin ? "1.5px solid #22c55e" : "1.5px solid hsl(42,90%,68%)",
            background: isAdmin ? "rgba(34,197,94,0.15)" : "transparent",
            color: isAdmin ? "#22c55e" : "hsl(42,90%,68%)",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.2s ease"
          }}>
            {isAdmin ? "✓ ADMIN ACTIVE" : "STAFF LOGIN →"}
          </button>
        </div>
      </header>

      {/* ===== HERO SLIDER ===== */}
      <section style={{ position: "relative", height: 520, overflow: "hidden", color: "#fff" }}>
        {/* Slider */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", width: `${slides.length * 100}%`, height: "100%",
          transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateX(-${(currentSlide * 100) / slides.length}%)`
        }}>
          {slides.map((src, i) => (
            <div key={i} style={{
              width: `${100 / slides.length}%`, height: "100%",
              backgroundImage: `url(${src})`,
              backgroundSize: "cover", backgroundPosition: "center",
              position: "relative", flexShrink: 0
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, hsla(222,50%,8%,0.55) 0%, hsla(222,50%,8%,0.75) 100%)" }} />
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 20px" }}>
          {/* Gold divider */}
          <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, hsl(38,85%,42%), hsl(44,90%,60%))", borderRadius: 2, marginBottom: 20 }} />
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.8rem)",
            fontWeight: 800, margin: "0 0 12px",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            letterSpacing: "0.02em"
          }}>Room Status System</h1>
          <p style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)", opacity: 0.85, margin: "0 0 20px", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
            Andaman Beach Suites Hotel — Internal Management
          </p>
          <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, hsl(44,90%,60%), hsl(38,85%,42%))", borderRadius: 2 }} />
        </div>

        {/* Slide dots */}
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{
              width: i === currentSlide ? 28 : 8, height: 8,
              borderRadius: 4, border: "none", cursor: "pointer",
              background: i === currentSlide ? "hsl(42,90%,60%)" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s ease", padding: 0
            }} />
          ))}
        </div>
      </section>

      {/* ===== BUILDING CARDS ===== */}
      <section style={{ marginTop: -80, padding: "0 24px 80px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 32 }}>
          {/* Building A */}
          <BuildingCard
            letter="A"
            code="ABSH"
            name="Building A"
            rooms="104 Rooms"
            floors="21 Floors"
            roomsPerFloor="8–12 Rooms"
            gradient="linear-gradient(135deg, hsl(255,60%,45%), hsl(280,65%,55%))"
            href="/building-a"
            accentColor="hsl(260,70%,65%)"
          />
          {/* Building B */}
          <BuildingCard
            letter="B"
            code="ABSC"
            name="Building B (Annex)"
            rooms="40 Rooms"
            floors="5 Floors"
            roomsPerFloor="7–10 Rooms"
            gradient="linear-gradient(135deg, hsl(340,70%,45%), hsl(15,80%,55%))"
            href="/building-b"
            accentColor="hsl(10,80%,65%)"
          />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        borderTop: "1px solid hsla(40,85%,45%,0.15)",
        background: "hsl(222 40% 10%)",
        padding: "28px 24px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, color: "hsl(42,90%,68%)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>
          Andaman Beach Suites Hotel
        </div>
        <div style={{ fontSize: 11, color: "hsl(220 15% 50%)", letterSpacing: "0.05em" }}>
          © {new Date().getFullYear()} — Internal Room Status System. All rights reserved.
        </div>
      </footer>

      {/* ===== LOGIN MODAL ===== */}
      {showLoginModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "hsla(222,50%,5%,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }} onClick={(e) => { if (e.target === e.currentTarget) setShowLoginModal(false); }}>
          <div style={{
            background: "hsl(222 40% 12%)", borderRadius: 20, padding: 36, width: 360, textAlign: "center",
            border: "1px solid hsla(40,85%,45%,0.2)",
            boxShadow: "0 30px 80px hsla(222,50%,5%,0.6)",
            animation: "popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "hsla(40,85%,45%,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24, border: "1px solid hsla(40,85%,45%,0.3)" }}>🔑</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 20, margin: "0 0 6px" }}>Staff Login</h2>
            <p style={{ color: "hsl(220 15% 55%)", fontSize: 13, margin: "0 0 24px" }}>Enter passcode to access admin features</p>
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••"
              style={{
                width: "100%", padding: "14px", fontSize: 20, textAlign: "center",
                letterSpacing: "0.3em", background: "hsl(222 40% 16%)",
                border: "1px solid hsla(40,85%,45%,0.3)", borderRadius: 10,
                color: "#fff", outline: "none", marginBottom: 16, boxSizing: "border-box"
              }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setShowLoginModal(false); setPassword(""); }} style={{
                flex: 1, padding: "12px", borderRadius: 10, border: "1px solid hsl(220 20% 30%)",
                background: "transparent", color: "hsl(220 15% 60%)", fontWeight: 700, cursor: "pointer", fontSize: 14
              }}>Cancel</button>
              <button onClick={handleLogin} style={{
                flex: 1, padding: "12px", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg, hsl(38,85%,42%), hsl(44,90%,60%))",
                color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 14,
                boxShadow: "0 4px 16px hsla(40,85%,45%,0.35)"
              }}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

function BuildingCard({ letter, code, name, rooms, floors, roomsPerFloor, gradient, href, accentColor }: {
  letter: string; code: string; name: string; rooms: string; floors: string;
  roomsPerFloor: string; gradient: string; href: string; accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "40px 32px",
          textAlign: "center",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.14)" : "0 8px 32px rgba(0,0,0,0.08)",
          border: hovered ? `1.5px solid ${accentColor}` : "1.5px solid hsl(220 20% 90%)",
          transition: "all 0.35s ease",
          transform: hovered ? "translateY(-8px)" : "none",
          cursor: "pointer"
        }}
      >
        {/* Icon */}
        <div style={{
          width: 72, height: 72, borderRadius: 18, background: gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          fontSize: 28, fontWeight: 900, color: "#fff",
          boxShadow: `0 8px 24px ${accentColor}55`,
          fontFamily: "'Playfair Display', serif",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)"
        }}>{letter}</div>

        {/* Gold divider */}
        <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, hsl(38,85%,42%), hsl(44,90%,60%))", borderRadius: 2, margin: "0 auto 14px" }} />

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: "hsl(222 40% 12%)", margin: "0 0 6px" }}>{code}</h3>
        <p style={{ fontSize: 13, color: "hsl(220 15% 55%)", margin: "0 0 20px", letterSpacing: "0.04em" }}>{name} • {rooms}</p>

        {/* Stats */}
        <div style={{ background: "hsl(220 20% 97%)", borderRadius: 12, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: "hsl(220 15% 50%)" }}>Total Floors</span>
            <span style={{ fontWeight: 800, color: "hsl(222 40% 12%)" }}>{floors}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "hsl(220 15% 50%)" }}>Rooms/Floor</span>
            <span style={{ fontWeight: 800, color: "hsl(222 40% 12%)" }}>{roomsPerFloor}</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "11px 28px", borderRadius: 10,
          background: hovered ? gradient : "transparent",
          color: hovered ? "#fff" : accentColor,
          border: `1.5px solid ${accentColor}`,
          fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
          transition: "all 0.25s ease"
        }}>
          View Floor Plan →
        </div>
      </div>
    </a>
  );
}
