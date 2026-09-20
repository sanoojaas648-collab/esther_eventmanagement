import { motion } from "framer-motion";
import ParticleText from "./ParticleText";

const quickLinks = ["About", "Services", "Events", "Gallery", "Pricing", "Contact"];
const socialLinks = [
  { name: "Instagram", icon: "◈" },
  { name: "Facebook", icon: "◇" },
  { name: "Twitter", icon: "◉" },
  { name: "LinkedIn", icon: "◆" },
  { name: "Pinterest", icon: "◈" },
];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Gold Divider */}
      <div className="divider-gold" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-gold flex items-center justify-center">
                <span className="text-gold font-cormorant font-bold text-xs">EM</span>
              </div>
              <span className="font-cormorant text-sm font-semibold tracking-widest text-white">ESTHER MEDIA EVENTS</span>
            </div>
            <p className="font-poppins text-[#CFCFCF] text-sm leading-relaxed font-light mb-6">
              ESTHER MEDIA EVENTS Pvt Ltd — Kerala-based production house crafting extraordinary celebrations since 2014.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <button
                  key={s.name}
                  className="w-8 h-8 border border-gold/20 flex items-center justify-center text-gold/50 hover:border-gold/60 hover:text-gold transition-all duration-300"
                  aria-label={s.name}
                >
                  <span className="text-xs">{s.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cormorant text-lg text-white font-light tracking-widest mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-poppins text-sm text-[#CFCFCF] hover:text-gold transition-colors duration-300 tracking-wider group flex items-center gap-2"
                  >
                    <span className="w-4 h-px bg-gold/30 group-hover:w-6 group-hover:bg-gold transition-all duration-300" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-cormorant text-lg text-white font-light tracking-widest mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              {["Wedding Planning", "Corporate Events", "Luxury Parties", "Destination Weddings", "Celebrity Events", "Private Events"].map((s) => (
                <li key={s}>
                  <span className="font-poppins text-sm text-[#CFCFCF] hover:text-gold transition-colors duration-300 cursor-pointer tracking-wider">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cormorant text-lg text-white font-light tracking-widest mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "Address", value: "Ester Bulding xyz " },
                { label: "Phone", value: "+91 0123456789" },
                { label: "Email", value: "info@ESTHErmediaevents.com" },
                { label: "Website", value: "www.ESTHErmediaevents.com" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-montserrat text-xs text-gold/60 tracking-widest uppercase mb-1">{item.label}</div>
                  <div className="font-poppins text-sm text-[#CFCFCF] font-light">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        {/* Particle brand mark — gathers into shape on hover */}
        <div className="mb-8 -mt-2">
          <ParticleText
            text="ESTHER MEDIA EVENTS"
            particleSize={2}
            density={3}
            color="#8a6421"
            highlightColor="#FFE9B0"
            scatter={140}
            gatherDuration={1400}
            stagger={380}
            pointerRepel={35}
            repelRadius={110}
            idleDrift={0.5}
            trigger="hover"
            fontSize="clamp(2.2rem, 7vw, 5.5rem)"
            fontWeight={500}
            fontFamily="'Cormorant Garamond', serif"
            glow
            style={{ height: "clamp(120px, 18vw, 220px)", minHeight: "120px" }}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-xs text-[#CFCFCF]/40 tracking-widest">
            © 2024 ESTHER MEDIA EVENTS Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <button key={item} className="font-poppins text-xs text-[#CFCFCF]/40 hover:text-gold/60 transition-colors duration-300 tracking-widest">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}