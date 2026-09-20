import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import FoldText from "./FoldText";
import aboutImage from "../assets/about.jpg"; 

const stats = [
  { num: "500+", label: "Events Curated" },
  { num: "10+", label: "Years of Excellence" },
  { num: "150+", label: "Corporate Clients" },
  { num: "98%", label: "Client Satisfaction" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-20 relative overflow-hidden" style={{ background: "#060503" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #D1A451, transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center" ref={ref}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={aboutImage} alt="Luxury Event" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
              {/* Gold film grain overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.03) 2px, rgba(212,175,55,0.03) 4px)" }} />
            </div>
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t border-l opacity-50"
              style={{ borderColor: "#D1A451" }} />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b border-r opacity-50"
              style={{ borderColor: "#D1A451" }} />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 top-1/2 -translate-y-1/2 card-glass p-5 text-center hidden lg:block"
            >
              <div className="font-cormorant text-3xl gold-text font-light">10+</div>
              <div className="font-poppins text-[10px] text-[#CFCFCF] tracking-widest uppercase mt-1">Years of<br/>Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          >
            <span className="section-label">About ESTHEr</span>
            <div className="divider-gold w-14 my-3" />

            <div className="mt-4 mb-4">
              <FoldText
                text="Where Vision Meets"
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
              <br />
              <FoldText
                text="Perfection"
                splitBy="char"
                hinge="top"
                trigger="scroll"
                duration={0.55}
                stagger={0.04}
                ease="power3.out"
                fontSize="clamp(2rem, 3.5vw, 2.8rem)"
                fontWeight={300}
                color="#D1A451"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em", fontStyle: "italic", lineHeight: 1.1 }}
              />
            </div>

            <p className="font-poppins text-[#CFCFCF] text-sm leading-relaxed mb-4 font-light">
              For over a decade, ESTHER MEDIA EVENTS has transformed ordinary moments into extraordinary memories. We are purveyors of bespoke celebrations — every detail meticulously curated, every experience flawlessly executed.
            </p>
            <p className="font-poppins text-[#CFCFCF] text-sm leading-relaxed mb-6 font-light">
              Our philosophy is simple: excellence is not an option, it is our standard. From intimate gatherings to grand galas, we bring your vision to life with unparalleled artistry and precision.
            </p>

            <div className="divider-gold mb-6" />

            <div className="grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <div className="font-cormorant text-3xl gold-text font-light">{s.num}</div>
                  <div className="font-poppins text-[10px] text-[#CFCFCF]/60 tracking-[0.3em] uppercase mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="btn-outline px-7 py-3 text-xs mt-8"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              Discover Our Story
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
