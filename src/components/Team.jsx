import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import FoldText from "./FoldText";
import CircularGallery from "./CircularGallery";

const team = [
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    text: "Aria Sharma — Founder & Creative Director",
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
    text: "Rohan Verma — Head of Event Production",
  },
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    text: "Meera Nair — Lead Media Producer",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    text: "Kabir Anand — Client Relations Director",
  },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // `bend` is an absolute world-unit curvature, so the same value that looks
  // right on a wide desktop viewport becomes a wildly exaggerated diagonal
  // arc on a narrow mobile one (the viewport width it's curving against is
  // much smaller). Flatten the curve and give cards more breathing room on
  // mobile so they show cleanly one at a time instead of skewed/overlapping.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="team" className="py-20 relative overflow-hidden" style={{ background: "#080604" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #D1A451, transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-10"
        >
          <span className="section-label">Our People</span>
          <div className="divider-gold w-14 my-3" />
          <FoldText
            text="Meet Our Team"
            splitBy="word"
            hinge="top"
            trigger="scroll"
            duration={0.55}
            stagger={0.07}
            ease="power3.out"
            fontSize="clamp(2rem, 3.5vw, 2.8rem)"
            fontWeight={300}
            color="#FFFFFF"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em", lineHeight: 1.1 }}
          />
          <p className="font-poppins text-[#CFCFCF] text-sm leading-relaxed font-light max-w-md mt-4">
            The artisans, producers, and directors behind every extraordinary celebration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          style={{ height: isMobile ? "440px" : "560px", position: "relative" }}
        >
          <CircularGallery
            items={team}
            bend={isMobile ? 0 : 3}
            textColor="#D1A451"
            borderRadius={0.06}
            scrollEase={0.02}
            cardScale={isMobile ? 1 : 0.85}
            gap={isMobile ? 1.4 : 2.6}
            fontUrl="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500&display=swap"
            font="500 26px 'Cormorant Garamond'"
          />
        </motion.div>
      </div>
    </section>
  );
}