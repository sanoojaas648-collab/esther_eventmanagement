import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import FoldText from "./FoldText";

const services = [
  {
    icon: "◇", title: "Wedding Planning", tag: "Signature",
    desc: "Transforming your love story into an unforgettable ceremony. Every detail crafted with devotion.",
    features: ["Full-day coordination", "Vendor curation", "Bridal styling"],
  },
  {
    icon: "◈", title: "Corporate Events", tag: "Executive",
    desc: "Elevate your brand with impeccably produced corporate gatherings that leave lasting impressions.",
    features: ["Brand activation", "AV production", "Guest logistics"],
  },
  {
    icon: "◉", title: "Luxury Parties", tag: "Premier",
    desc: "Exclusive soirées where sophistication and celebration converge in breathtaking settings.",
    features: ["Bespoke theming", "Curated entertainment", "Statement florals"],
  },
  {
    icon: "◆", title: "Destination Weddings", tag: "Global",
    desc: "From Santorini sunsets to Maldivian shores — your dream wedding in the world's most magical locations.",
    features: ["Venue scouting", "Travel coordination", "On-site team"],
  },
  {
    icon: "◇", title: "Celebrity Events", tag: "Elite",
    desc: "Discreet, flawless, and spectacular. High-profile events managed with absolute precision.",
    features: ["Airtight privacy", "Security liaison", "Press management"],
  },
  {
    icon: "◈", title: "Private Events", tag: "Bespoke",
    desc: "Intimate gatherings executed with the same grandeur we bring to our largest productions.",
    features: ["Personal concierge", "Custom menus", "Intimate styling"],
  },
];

// left -> right -> straight(center), repeating. 0 = left, 1 = right, 2 = center
const SIDE = ["left", "right", "center"];

function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

// Build a smooth S-curve SVG path string through a set of {x,y} points (Catmull-Rom -> Bezier)
function buildSmoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/* ---------- Interactive card: tilt + magnetic glow + expandable details ---------- */
function ServiceNode({ service, index, side, rowHeight, isActive }) {
  const nodeRef = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-15% 0px -15% 0px" });
  const [open, setOpen] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springCfg = { stiffness: 220, damping: 18, mass: 0.4 };
  const rX = useSpring(rotateX, springCfg);
  const rY = useSpring(rotateY, springCfg);

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }, [rotateX, rotateY, glowX, glowY]);

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const alignClass =
    side === "left" ? "items-start text-left mr-auto" :
    side === "right" ? "items-end text-right ml-auto" :
    "items-center text-center mx-auto";

  const fromX = side === "left" ? -40 : side === "right" ? 40 : 0;
  const fromY = side === "center" ? 40 : 0;

  return (
    <div ref={nodeRef} className="relative flex" style={{ minHeight: rowHeight }}>
      <motion.div
        initial={{ opacity: 0, x: fromX, y: fromY }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative flex flex-col ${alignClass} w-full sm:w-[70%] md:w-[54%] gap-3 py-3`}
      >
        {/* node dot — pulses when this stop is the active one */}
        <motion.span
          animate={isActive ? { scale: [1, 1.35, 1] } : { scale: 1 }}
          transition={isActive ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          className="absolute -top-1 w-3.5 h-3.5 rounded-full z-10"
          style={{
            border: `2px solid ${isActive ? "#F4D999" : "#D1A451"}`,
            background: "#000",
            boxShadow: isActive ? "0 0 22px rgba(244,217,153,0.9)" : "0 0 14px rgba(212,175,55,0.55)",
            left: side === "left" ? 0 : side === "center" ? "50%" : "auto",
            right: side === "right" ? 0 : "auto",
            transform: side === "center" ? "translateX(-50%)" : "none",
          }}
        />

        {/* interactive card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onClick={() => setOpen(v => !v)}
          animate={{ scale: isActive ? 1.035 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            rotateX: rY, // swapped for natural tilt direction
            rotateY: rX,
            transformPerspective: 700,
            marginTop: "1.6rem",
            background: "linear-gradient(160deg, rgba(17,14,7,0.9), rgba(8,6,4,0.9))",
            border: `1px solid ${isActive ? "rgba(212,175,55,0.45)" : "rgba(212,175,55,0.14)"}`,
            boxShadow: isActive ? "0 8px 40px -8px rgba(212,175,55,0.25)" : "none",
          }}
          className="relative w-full rounded-sm p-5 cursor-pointer select-none overflow-hidden transition-shadow duration-300"
        >
          {/* magnetic cursor glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform([glowX, glowY], ([gx, gy]) =>
                `radial-gradient(180px circle at ${gx}% ${gy}%, rgba(212,175,55,0.14), transparent 70%)`),
            }}
          />

          <span className="font-montserrat text-[10px] tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.55)" }}>
            {String(index + 1).padStart(2, "0")} · {service.tag}
          </span>

          <div className="flex items-start justify-between gap-3 mt-3">
            <div className="text-2xl" style={{ color: "#D1A451" }}>{service.icon}</div>
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="font-montserrat text-lg leading-none"
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              +
            </motion.span>
          </div>

          <h3 className="font-cormorant text-2xl md:text-[1.7rem] font-light text-white mt-1 mb-2">{service.title}</h3>
          <p className="font-poppins text-[#CFCFCF]/60 text-xs leading-relaxed font-light">{service.desc}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className={`flex flex-wrap gap-1.5 mt-4 pt-4 ${side === "right" ? "justify-end" : side === "center" ? "justify-center" : "justify-start"}`}
                  style={{ borderTop: "1px solid rgba(212,175,55,0.12)" }}>
                  {service.features.map(f => (
                    <span key={f}
                      className="font-montserrat text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{ color: "#F4D999", border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!open && (
            <div className="mt-4 flex items-center gap-2" style={{ color: "#D1A451" }}>
              <span className="font-montserrat text-[10px] tracking-widest uppercase">Learn More</span>
              <span>→</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const pathElRef = useRef(null);
  const width = useContainerWidth(containerRef);

  const isMobile = width > 0 && width < 640;
  // tighter rows = services feel closer together
  const rowHeight = isMobile ? 200 : 230;
  const amplitude = isMobile ? 0.3 : 0.38;

  const points = useMemo(() => {
    if (!width) return [];
    const cx = width / 2;
    return services.map((_, i) => {
      const side = SIDE[i % 3];
      const x = side === "left" ? cx - width * amplitude
        : side === "right" ? cx + width * amplitude
        : cx;
      const y = i * rowHeight + rowHeight * 0.46;
      return { x, y };
    });
  }, [width, rowHeight, amplitude]);

  const pathD = useMemo(() => buildSmoothPath(points), [points]);
  const trackHeight = services.length * rowHeight;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });
  const clampedProgress = useTransform(smoothProgress, v => Math.min(Math.max(v, 0), 1));

  // traveling comet light along the road
  const cometX = useMotionValue(0);
  const cometY = useMotionValue(0);
  const cometOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsub = clampedProgress.on("change", (v) => {
      const el = pathElRef.current;
      if (!el) return;
      const total = el.getTotalLength();
      const pt = el.getPointAtLength(v * total);
      cometX.set(pt.x);
      cometY.set(pt.y);
      const idx = Math.round(v * (services.length - 1));
      setActiveIndex(prev => (prev !== idx ? idx : prev));
    });
    return unsub;
  }, [clampedProgress, cometX, cometY]);

  return (
    <section id="services" className="py-20 relative overflow-hidden" style={{ background: "#000000" }}>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D1A451, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="section-label">What We Offer</span>
          <div className="divider-gold w-14 mx-auto my-3" />
          <div className="mt-4">
            <FoldText
              text="Premium Services"
              splitBy="word"
              hinge="top"
              trigger="scroll"
              duration={0.6}
              stagger={0.1}
              ease="power3.out"
              fontSize="clamp(2.2rem, 4.5vw, 3.4rem)"
              fontWeight={300}
              color="#FFFFFF"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}
            />
          </div>
          <p className="font-poppins text-[#CFCFCF]/70 text-sm mt-3 max-w-md mx-auto font-light">
            A curated portfolio of luxury event experiences, each delivered with meticulous attention to detail.
          </p>
          <p className="font-montserrat text-[9px] tracking-widest uppercase mt-4" style={{ color: "rgba(212,175,55,0.4)" }}>
            Tap any stop to explore · scroll to travel the road
          </p>
        </motion.div>

        {/* Roadmap track */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          <div ref={trackRef} className="relative" style={{ minHeight: trackHeight || undefined }}>
            {width > 0 && (
              <svg
                className="absolute top-0 left-0 pointer-events-none"
                width={width}
                height={trackHeight}
                viewBox={`0 0 ${width} ${trackHeight}`}
                fill="none"
              >
                {/* faint base road */}
                <path d={pathD} stroke="rgba(212,175,55,0.10)" strokeWidth="2" />
                {/* glowing traveled road */}
                <motion.path
                  ref={pathElRef}
                  d={pathD}
                  stroke="#D1A451"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    pathLength: clampedProgress,
                    filter: "drop-shadow(0 0 6px rgba(212,175,55,0.75))",
                  }}
                />
                {/* traveling comet head */}
                <motion.circle r="5" fill="#F4D999" style={{ cx: cometX, cy: cometY, opacity: cometOpacity, filter: "drop-shadow(0 0 8px #F4D999)" }} />
                <motion.circle r="10" fill="rgba(244,217,153,0.18)" style={{ cx: cometX, cy: cometY, opacity: cometOpacity }} />
              </svg>
            )}

            <div className="relative">
              {services.map((s, i) => (
                <ServiceNode key={s.title} service={s} index={i} side={SIDE[i % 3]} rowHeight={rowHeight} isActive={i === activeIndex} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}