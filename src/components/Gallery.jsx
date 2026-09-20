import { useState } from "react";
import { motion } from "framer-motion";
import FoldText from "./FoldText";
import TargetCursor from "./TargetCursor";

const events = [
  { id:1, title:"The Sapphire Gala", cat:"Corporate", img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80", tall: true },
  { id:2, title:"Ivory Wedding", cat:"Wedding", img:"https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80" },
  { id:3, title:"Midnight Soirée", cat:"Private", img:"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80" },
  { id:4, title:"Santorini Destination", cat:"Destination", img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80" },
  { id:5, title:"Royal Celebration", cat:"Luxury Party", img:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80" },
  { id:6, title:"Executive Summit", cat:"Corporate", img:"https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80" },
];

function EventCard({ event, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay }}
      className={`cursor-target relative overflow-hidden cursor-pointer group ${event.tall ? "row-span-2" : ""}`}
      style={{ minHeight: event.tall ? "420px" : "200px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={event.img} alt={event.title} loading="lazy"
        className="w-full h-full object-cover"
        style={{ transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.65s ease" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.22) 0%, rgba(0,0,0,0.5) 100%)", opacity: hovered ? 1 : 0 }} />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div style={{ transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "transform 0.35s ease", opacity: hovered ? 1 : 0.75 }}>
          <span className="section-label text-[10px]">{event.cat}</span>
          <h3 className="font-cormorant text-xl font-light text-white mt-0.5">{event.title}</h3>
        </div>
        <button className="btn-gold px-5 py-2 text-[10px] mt-3 self-start"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease" }}>
          View Details
        </button>
      </div>

      <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r transition-opacity duration-300"
        style={{ borderColor: "#D1A451", opacity: hovered ? 1 : 0 }} />
    </motion.div>
  );
}

export default function Gallery() {
  const [cursorActive, setCursorActive] = useState(false);

  return (
    <section
      id="events"
      className="py-20"
      style={{ background: "#060503" }}
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => setCursorActive(false)}
    >
      {/* Custom cursor is mounted (and default cursor hidden) only while the
          pointer is inside this section — everywhere else on the site keeps the normal cursor. */}
      {cursorActive && (
        <TargetCursor targetSelector=".cursor-target" cursorColor="#D1A451" spinDuration={2.4} />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="section-label">Our Portfolio</span>
          <div className="divider-gold w-14 mx-auto my-3" />
          <div className="mt-4">
            <FoldText text="Featured Events" splitBy="word" hinge="top" trigger="scroll"
              duration={0.6} stagger={0.1} ease="power3.out"
              fontSize="clamp(2.2rem, 4.5vw, 3.4rem)" fontWeight={300} color="#FFFFFF"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} />
          </div>
          <p className="font-poppins text-[#CFCFCF]/70 text-sm mt-3 max-w-md mx-auto font-light">
            A glimpse into the extraordinary worlds we create.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[200px]">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
