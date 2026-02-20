interface HeroSliderProps {
  slides: string[];
  currentSlide: number;
}

export default function HeroSlider({ slides, currentSlide }: HeroSliderProps) {
  return (
    <section className="relative text-white text-center overflow-hidden min-h-[450px] flex flex-col justify-center items-center py-[100px] pb-[180px]">
      {/* Slider Track */}
      <div
        className="absolute inset-0 z-0 flex h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
        }}
      >
        {slides.map((src, i) => (
          <div
            key={i}
            className="relative w-full h-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${src})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <h1 className="relative z-[1] text-[clamp(1.9rem,5vw,3.5rem)] font-extrabold mb-2.5 drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
        Room Status System
      </h1>
      <p className="relative z-[1] text-[clamp(1rem,2vw,1.2rem)] opacity-90">
        Internal Room Management System
      </p>
    </section>
  );
}
