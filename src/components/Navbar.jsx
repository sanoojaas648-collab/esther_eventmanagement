import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Home", "About", "Team", "Services", "Gallery", "Events", "Pricing", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50); 
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass" : "bg-transparent"}`}
    >
      <div className="nav-inner w-full px-6 lg:px-14 flex items-center justify-between h-24">
        {/* Logo */}
        <div className="nav-brand flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
          <div className="nav-mark w-12 h-12 border border-gold flex items-center justify-center">
            <span className="text-gold font-cormorant font-bold text-2xl">EM</span>
          </div>
          <div>
            <span className="nav-brand-name block font-cormorant text-lg font-semibold tracking-widest text-gold">
              ESTHER MEDIA EVENTS
            </span>
            <span className="nav-tagline block font-poppins text-[0.56rem] uppercase tracking-[0.62em] text-white/70">
              We Plan. You Celebrate.
            </span>
          </div>
        </div>

        <div className="nav-right hidden lg:flex items-center">
          {/* Desktop Links */}
          <ul className="nav-links flex items-center gap-11">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className={`relative font-poppins text-xs tracking-widest uppercase transition-colors duration-300 group py-1 ${link === "Home" ? "text-gold" : "text-[#F1F1F1] hover:text-gold"}`}
                >
                  {link}
                  <span className={`absolute -bottom-4 left-0 h-px bg-gold transition-all duration-300 ${link === "Home" ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="nav-cta btn-outline text-xs"
          >
            Book Your Event
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gold/10"
          >
            <ul className="py-6 px-6 flex flex-col gap-4">
              {links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-poppins text-xs tracking-widest uppercase text-[#CFCFCF] hover:text-gold transition-colors duration-300"
                  >
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="btn-gold px-6 py-3 text-xs w-full mt-2"
                >
                  Book Your Event
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
