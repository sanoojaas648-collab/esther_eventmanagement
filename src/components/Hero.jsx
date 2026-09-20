import { motion } from "framer-motion";
import Threads from "./Threads";
import img1 from "../assets/hero.jpeg";
import img2 from "../assets/hero-6.jpeg";
import img3 from "../assets/hero-2.jpeg";
import img4 from "../assets/about.jpg";
import img5 from "../assets/hero-3.jpeg";

const stats = [
  {
    num: "500+",
    label: "Events Delivered",
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="4" y="6" width="20" height="18" rx="2" />
        <path d="M4 11h20M9 4v4M19 4v4M9 16h2M13 16h2M17 16h2M9 20h2M13 20h2M17 20h2" />
      </svg>
    ),
  },
  {
    num: "150+",
    label: "Happy Clients",
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="11" cy="10" r="4" />
        <circle cx="20" cy="11" r="3" />
        <path d="M4 24c.35-4.65 3.1-7.2 7-7.2s6.65 2.55 7 7.2M18.5 17.2c3.15.2 5.05 2.45 5.5 6.3" />
      </svg>
    ),
  },
  {
    num: "10+",
    label: "Years of Excellence",
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="m14 3 3.2 7.1 7.7.85-5.75 5.2 1.6 7.6L14 19.9l-6.75 3.85 1.6-7.6-5.75-5.2 7.7-.85L14 3Z" />
      </svg>
    ),
  },
];

function CollageImage({ src, alt, delay, className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`relative overflow-hidden group ${className}`}
      style={{ border: "1px solid rgba(212,175,55,0.28)", ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover grayscale-[85%] contrast-[1.05] brightness-[0.95] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.15), transparent 55%)" }} />
    </motion.div>
  );
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-luxury relative w-full min-h-screen lg:min-h-[112vh] overflow-hidden bg-black"
    >
      {/* Threads fills the entire hero */}
      <div className="absolute inset-0 z-0">
        <Threads
          color={[0.820, 0.643, 0.318]}
          amplitude={2.1}
          distance={0}
          enableMouseInteraction={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Layered dark overlay — heavier on the left where the text sits */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 70% at 22% 50%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.3) 55%, transparent 78%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 pb-16 pt-28 sm:px-10 lg:px-14 lg:pb-14 lg:pt-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.08fr_1fr] gap-14 items-start">

          {/* Left — copy */}
          <div className="text-left lg:mt-10">
            <div className="flex items-center gap-4 mb-7">
              <span className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, #D1A451)" }} />
              <span className="font-montserrat text-[0.68rem] tracking-[0.42em] uppercase" style={{ color: "#D1A451" }}>
                Luxury Event Design
              </span>
            </div>

            <h1
              className="font-bodoni font-medium"
              style={{ fontSize: "clamp(3.1rem, 6.4vw, 5.4rem)", lineHeight: 1.14, letterSpacing: "-0.01em", color: "rgba(244,240,232,0.92)" }}
            >
              Curating Extraordinary<br />
              Moments.<br />
              Elevating Your Vision.<br />
              Bringing Dreams to Life.
            </h1>

            <p
              className="font-cormorant italic mt-7"
              style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", color: "#D1A451" }}
            >
              Luxury Event Design &amp; Modeling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <button onClick={() => scrollTo("contact")} className="btn-gold hero-button text-xs px-8 py-4">
                Begin Your Journey
              </button>
              <button onClick={() => scrollTo("services")} className="btn-outline hero-button text-xs px-8 py-4">
                Explore Services
              </button>
            </div>

            <div className="mt-14 max-w-md">
              <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, rgba(209,164,81,0.45), transparent)" }} />
              <div className="grid grid-cols-3 gap-6">
                {stats.map(({ num, label, icon }, index) => (
                  <div key={label} className="relative flex flex-col items-start gap-2">
                    {index > 0 && (
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-px h-14"
                        style={{ background: "linear-gradient(180deg, transparent, rgba(209,164,81,0.4), transparent)" }} />
                    )}
                    <div className="hero-stat-icon" style={{ width: 30, height: 30, flex: "0 0 30px" }}>
                      {icon}
                    </div>
                    <div className="font-cormorant text-2xl gold-text font-light leading-none">{num}</div>
                    <div className="font-poppins text-[0.6rem] text-white/60 tracking-[0.18em] uppercase leading-snug">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — staggered image collage, flush to the top */}
          <div className="relative hidden md:block mt-0">
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              <div className="flex flex-col gap-3 lg:gap-4">
                <CollageImage src={img1} alt="Runway production" delay={0.15} style={{ aspectRatio: "3/6.2" }} />
              </div>
              <div className="flex flex-col gap-3 lg:gap-4">
                <CollageImage src={img2} alt="Elegant banquet setting" delay={0.25} style={{ aspectRatio: "1/1.25" }} />
                <CollageImage src={img4} alt="Floral ceremony walkway" delay={0.4} style={{ aspectRatio: "3/4.6" }} />
              </div>
              <div className="flex flex-col gap-3 lg:gap-4 mt-8 lg:mt-12">
                <CollageImage src={img3} alt="Fashion editorial" delay={0.3} style={{ aspectRatio: "1/1.4" }} />
                <CollageImage src={img5} alt="Statement stage design" delay={0.5} style={{ aspectRatio: "1/1.7" }} />
              </div>
            </div>

            {/* floating ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-6 -right-2 lg:-right-4"
            >
              <motion.svg
                animate={{ rotate: [0, 8, 0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                viewBox="0 0 24 24" width="46" height="46"
                style={{ filter: "drop-shadow(0 0 10px rgba(209,164,81,0.5))" }}
              >
                <path d="M12 1 L23 12 L12 23 L1 12 Z" fill="rgba(212,175,55,0.85)" />
              </motion.svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}