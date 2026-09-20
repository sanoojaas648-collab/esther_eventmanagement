import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoldText from "./FoldText";

const testimonials = [
  { quote: "Lumière transformed our wedding into an ethereal dream. Every detail was beyond our imagination — from the cascading florals to the candlelit reception.", name: "Alexandra & James Thornton", role: "Wedding Clients, London", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80" },
  { quote: "Our annual gala has never looked more spectacular. The team brought an unmatched level of sophistication that elevated our brand beyond expectations.", name: "Richard Whitmore", role: "CEO, Whitmore Capital", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { quote: "The destination wedding in Positano was absolutely flawless. Every vendor, every moment, every detail was perfected. They made the impossible feel effortless.", name: "Isabella & Marco Romano", role: "Destination Wedding, Amalfi Coast", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#060503" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #D1A451, transparent)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <span className="section-label">Voices of Excellence</span>
          <div className="divider-gold w-14 mx-auto my-3" />
          <div className="mt-4">
            <FoldText text="Client Stories" splitBy="word" hinge="top" trigger="scroll"
              duration={0.6} stagger={0.12} ease="power3.out"
              fontSize="clamp(2.2rem, 4.5vw, 3.4rem)" fontWeight={300} color="#FFFFFF"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} />
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="card-glass p-8 lg:p-12 relative"
            >
              <div className="absolute top-4 left-6 font-cormorant text-7xl leading-none select-none"
                style={{ color: "rgba(212,175,55,0.2)" }}>"</div>
              <div className="relative z-10">
                <p className="font-cormorant text-xl lg:text-2xl font-light leading-relaxed italic text-center mb-8"
                  style={{ color: "#CFCFCF" }}>
                  {testimonials[current].quote}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img src={testimonials[current].img} alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ border: "1px solid rgba(212,175,55,0.3)" }} />
                  <div>
                    <div className="font-cormorant text-lg font-light text-white">{testimonials[current].name}</div>
                    <div className="font-poppins text-[11px] tracking-widest" style={{ color: "#D1A451" }}>{testimonials[current].role}</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t border-r" style={{ borderColor: "rgba(212,175,55,0.25)" }} />
              <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b border-l" style={{ borderColor: "rgba(212,175,55,0.25)" }} />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2.5 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}>
                <div className="rounded-full transition-all duration-300"
                  style={{ width: i === current ? "22px" : "6px", height: "6px",
                    background: i === current ? "#D1A451" : "rgba(212,175,55,0.25)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
