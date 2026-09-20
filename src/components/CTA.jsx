import { motion } from "framer-motion";
import FoldText from "./FoldText";

const whyUs = [
  { icon: "◇", title: "Decade of Excellence", desc: "Over 10 years crafting world-class events across 4 continents." },
  { icon: "◈", title: "Bespoke Approach", desc: "Every event is one-of-a-kind, uniquely designed for you." },
  { icon: "◉", title: "Elite Network", desc: "Access to the world's finest vendors, venues, and entertainers." },
  { icon: "◆", title: "Flawless Execution", desc: "Our dedicated team ensures every detail is perfected." },
];

export default function CTA() { 
  return (
    <>
      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#060503" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <span className="section-label">Our Distinction</span>
            <div className="divider-gold w-14 mx-auto my-3" />
            <div className="mt-4">
              <FoldText text="Why Choose ESTHEr" splitBy="word" hinge="top" trigger="scroll"
                duration={0.6} stagger={0.1} ease="power3.out"
                fontSize="clamp(2.2rem, 4.5vw, 3.4rem)" fontWeight={300} color="#FFFFFF"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="text-center"
              >
                <div className="text-2xl mb-3" style={{ color: "#D1A451" }}>{item.icon}</div>
                <div className="w-px h-10 mx-auto mb-3" style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.3), transparent)" }} />
                <h3 className="font-cormorant text-xl font-light text-white mb-2">{item.title}</h3>
                <p className="font-poppins text-[#CFCFCF]/60 text-xs leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80"
            alt="Luxury Event" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 100%)" }} />
          {/* Gold grain */}
          <div className="absolute inset-0 opacity-10"
            style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(212,175,55,0.04) 3px, rgba(212,175,55,0.04) 4px)" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="section-label">Begin Your Story</span>
            <div className="divider-gold w-14 mx-auto my-4" />
            <div className="mt-5 mb-4">
              <FoldText text="Let's Create Your" splitBy="word" hinge="top" trigger="scroll"
                duration={0.6} stagger={0.1} ease="power3.out"
                fontSize="clamp(2rem, 5vw, 3.8rem)" fontWeight={300} color="#FFFFFF"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em", lineHeight: 1 }} />
              <br />
              <FoldText text="Dream Event" splitBy="char" hinge="top" trigger="scroll"
                duration={0.6} stagger={0.04} ease="power3.out"
                fontSize="clamp(2rem, 5vw, 3.8rem)" fontWeight={300} color="#D1A451"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em", fontStyle: "italic", lineHeight: 1 }} />
            </div>

            <p className="font-poppins text-[#CFCFCF]/70 text-sm font-light max-w-xl mx-auto mb-8" style={{ lineHeight: 1.7 }}>
              Every extraordinary celebration begins with a conversation. Tell us your vision, and we will craft an experience that transcends imagination.
            </p>

            <div className="grid md:grid-cols-3 gap-3 mb-6 max-w-xl mx-auto">
              {["Your Name", "Email Address", "Event Type"].map(ph => (
                <input key={ph} type="text" placeholder={ph}
                  className="font-poppins text-xs px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors duration-300"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.18)" }}
                  onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.18)"}
                />
              ))}
            </div>

            <button className="btn-gold px-10 py-4 text-xs gold-glow">Begin Your Journey</button>
            <p className="font-poppins text-[#CFCFCF]/35 text-[11px] mt-4 tracking-widest">
              info@ESTHErmediaevents.com · www.ESTHErmediaevents.com
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
