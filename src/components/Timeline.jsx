import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FoldText from "./FoldText";


const steps = [
  { num: "01", title: "Planning", desc: "We begin with an intimate consultation to understand your vision, preferences, and aspirations.", detail: "Initial consultation · Vision board · Budget framework" },
  { num: "02", title: "Design", desc: "Our creative team transforms your vision into an exquisite design concept — from florals to lighting.", detail: "Concept design · Vendor curation · Theme development" },
  { num: "03", title: "Execution", desc: "On your day, our dedicated team orchestrates every element with military precision.", detail: "On-site coordination · Vendor management · Real-time oversight" },
  { num: "04", title: "Celebration", desc: "You celebrate. We handle everything else. Your only responsibility is to create memories.", detail: "Experience delivery · Guest experience · Memory preservation" },
];

// Layout constants used to precisely align the SVG connector path with the cards
const CARD_H = 118;    // fixed card height (px)
const GAP = 76;         // gap between cards (px)
const ROW_H = CARD_H + GAP;
const CARD_W = 420;     // fixed card width (px) - keep JS + CSS in sync
const CX = CARD_W / 2;  // center x of the connector viewBox
const OFF_RIGHT = 85;   // rightward bow amplitude
const OFF_LEFT = 120;   // leftward bow amplitude (a touch wider, matching the reference)

// Builds a smooth single-hook "S" connector linking the bottom of one card
// to the top of the next, alternating left/right. Control points are spread
// across the full half-segment (not just near the midpoint) so the curve
// arcs cleanly in one motion with no self-crossing loop or kink.
// Returns an ARRAY — one path string per gap — so each segment can be
// revealed independently, in sync with the card it leads into, instead of
// the whole connector drawing itself in one shot up front.
function buildConnectorSegments(steps) {
  const segments = [];
  for (let i = 0; i < steps.length - 1; i++) {
    const y0 = i * ROW_H + CARD_H;
    const y1 = (i + 1) * ROW_H;
    const yMid = (y0 + y1) / 2;
    const dir = i % 2 === 0 ? 1 : -1; // alternate bow direction
    const off = dir > 0 ? OFF_RIGHT : OFF_LEFT;
    const x1 = CX + dir * off;
    const halfDy = (y1 - y0) / 2;
    const c1y = y0 + halfDy * 0.65;
    const c2y = yMid - halfDy * 0.35;
    const c3y = yMid + halfDy * 0.35;
    const c4y = y1 - halfDy * 0.65;
    let d = `M ${CX} ${y0} C ${CX} ${c1y} ${x1} ${c2y} ${x1} ${yMid} `;
    d += `C ${x1} ${c3y} ${CX} ${c4y} ${CX} ${y1}`;
    segments.push(d);
  }
  return segments;
}

// One timeline card: iris scroll reveal, rotating gold-foil border,
// and a diagonal glaze sweep across the surface.
function TimelineCard({ step, index, labelRight, cardRef, cardInView }) {
  // Separate, re-triggering visibility check (once: false) used only to gate the
  // infinite-repeat animations below — without this they'd keep animating forever
  // in the background even after the user scrolls far past this card.
  const stillVisible = useInView(cardRef, { margin: "200px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{ height: `${CARD_H}px` }}
    >
      {/* Node marker: simple glowing gold dot where the connector meets the card */}
      <div className="hidden sm:flex items-center justify-center absolute left-1/2 -translate-x-1/2 -top-1 z-30">
        <motion.span
          className="absolute rounded-full"
          style={{ width: "22px", height: "22px", border: "1px solid rgba(212,175,55,0.5)" }}
          animate={cardInView && stillVisible ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.3 + 0.6, ease: "easeOut" }}
        />
        <motion.div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#D1A451", boxShadow: "0 0 10px #D1A451" }}
          initial={{ scale: 0 }}
          animate={cardInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        />
      </div>

      {/* Iris/petal wipe reveal wrapper - cards stay straight and aligned, no tilt */}
      <motion.div
        className="h-full"
        initial={{ clipPath: "circle(0% at 50% 0%)", opacity: 0, y: 30 }}
        animate={cardInView ? { clipPath: "circle(140% at 50% 0%)", opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* Rotating gold-foil border ring */}
        <div className="relative h-full rounded-2xl p-[1.5px] overflow-hidden">
          {stillVisible && (
            <motion.div
              className="absolute inset-[-40%]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, #D1A451 25deg, #FFE9B0 45deg, transparent 90deg, transparent 360deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Card surface */}
          <div className="relative h-full rounded-2xl px-5 py-4 flex items-center gap-4 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(18,18,18,0.96), rgba(8,8,8,0.96))",
              boxShadow: "0 6px 26px rgba(0,0,0,0.5), 0 0 24px rgba(212,175,55,0.08), inset 0 0 30px rgba(212,175,55,0.03)"
            }}>

            {/* Glazing light sweep */}
            {stillVisible && (
              <motion.div
                className="absolute inset-y-0 w-1/3 pointer-events-none"
                style={{
                  background: "linear-gradient(115deg, transparent, rgba(255,233,176,0.16), transparent)",
                  mixBlendMode: "screen",
                }}
                initial={{ x: "-120%" }}
                animate={cardInView ? { x: "260%" } : {}}
                transition={{ duration: 1.6, delay: 0.9 + index * 0.15, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.5 }}
              />
            )}
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative z-10"
              style={{ border: "1px solid rgba(212,175,55,0.5)", background: "#000",
                boxShadow: "0 0 10px rgba(212,175,55,0.25)" }}>
              <span className="font-cormorant text-lg" style={{ color: "#D1A451" }}>{step.num}</span>
            </div>
            <div className="min-w-0 relative z-10">
              <h3 className="font-cormorant text-xl font-light text-white leading-tight">{step.title}</h3>
              <p className="font-poppins text-[10px] tracking-widest mt-1" style={{ color: "rgba(212,175,55,0.55)" }}>
                {step.detail}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#D1A451" }} />
                <span className="font-poppins text-[10px] text-[#CFCFCF]/50">Active</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Outside label with a dashed connector stub to the card, matching the reference diagram */}
      <motion.div
        className="hidden lg:flex items-center absolute top-1/2 -translate-y-1/2"
        style={
          labelRight
            ? { left: "100%", flexDirection: "row" }
            : { right: "100%", flexDirection: "row-reverse" }
        }
        initial={{ opacity: 0, x: labelRight ? -12 : 12 }}
        animate={cardInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <svg width="34" height="2" className="shrink-0">
          <line x1="0" y1="1" x2="34" y2="1" stroke="#D1A451" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
        </svg>
        <div className="w-44" style={{ textAlign: labelRight ? "left" : "right" }}>
          <span className="font-montserrat text-[11px] tracking-widest font-semibold block"
            style={{ color: "#D1A451" }}>{step.num}•&nbsp;{step.title}</span>
          <span className="font-poppins text-[10px] text-[#CFCFCF]/50 mt-1 leading-snug block">{step.desc}</span>
        </div>
      </motion.div>

      {/* Mobile / tablet description below card */}
      <div className="lg:hidden mt-2 pl-1 absolute top-full left-0 w-full">
        <span className="font-montserrat text-[10px] tracking-widest font-semibold" style={{ color: "#D1A451" }}>
          {step.num}•&nbsp;{step.title}
        </span>
        <p className="font-poppins text-[10px] text-[#CFCFCF]/50 mt-1 leading-snug">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  // Re-triggering check used only to pause the ambient sparkle loop once the
  // whole timeline has scrolled out of view, instead of animating forever.
  const sectionVisible = useInView(ref, { margin: "200px" });

  // One stable ref + one "has this card appeared" check per step. steps.length
  // is fixed, so calling useInView per index here (instead of inside each card)
  // is what lets the connector segments react to each card's own reveal.
  const cardRefs = useMemo(() => steps.map(() => ({ current: null })), []);
  const cardInViews = [
    useInView(cardRefs[0], { once: true, margin: "-100px", amount: 0.5 }),
    useInView(cardRefs[1], { once: true, margin: "-100px", amount: 0.5 }),
    useInView(cardRefs[2], { once: true, margin: "-100px", amount: 0.5 }),
    useInView(cardRefs[3], { once: true, margin: "-100px", amount: 0.5 }),
  ];

  const connectorSegments = useMemo(() => buildConnectorSegments(steps), []);
  const totalHeight = (steps.length - 1) * ROW_H + CARD_H;
  // Full path (all segments joined) purely for the traveling-spark <mpath> to
  // follow — the sparks still run the whole route once it's fully drawn.
  const fullPath = connectorSegments.join(" ");
  const allSegmentsIn = cardInViews.slice(1).every(Boolean);

  return ( 
    <section className="py-20 relative overflow-hidden" style={{ background: "#000000" }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D1A451, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="section-label">Our Process</span>
          <div className="divider-gold w-14 mx-auto my-3" />
          <div className="mt-4">
            <FoldText text="The Experience" splitBy="word" hinge="top" trigger="scroll"
              duration={0.6} stagger={0.1} ease="power3.out"
              fontSize="clamp(2.2rem, 4.5vw, 3.4rem)" fontWeight={300} color="#FFFFFF"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} />
          </div>
        </motion.div>

        <div ref={ref} className="relative mx-auto" style={{ width: `${CARD_W}px`, maxWidth: "100%" }}>
          {/* Flow-chart style connector path (elbow/S-curve bends, like a circuit trace) */}
          <svg
            className="absolute left-0 top-0 pointer-events-none hidden sm:block"
            style={{ width: `${CARD_W}px`, height: `${totalHeight}px` }}
            viewBox={`0 0 ${CARD_W} ${totalHeight}`}
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* faint base path (full route, always dimly visible as a guide) */}
            <path id="timelinePath" d={fullPath} fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="2" />

            {/* Each glowing gold segment draws in only once the card it leads
                into has actually appeared — the path arrives WITH the card,
                not all at once ahead of time. */}
            {connectorSegments.map((segment, i) => (
              <motion.path
                key={i}
                d={segment}
                fill="none"
                stroke="#D1A451"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={cardInViews[i + 1] ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
              />
            ))}

            {/* Traveling sparks that run along the full connector once every segment has drawn in */}
            {allSegmentsIn && (
              <>
                <circle r="3.2" fill="#FFE9B0" filter="url(#glow)">
                  <animateMotion dur="3.4s" begin="0.4s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#timelinePath" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" dur="3.4s" begin="0.4s" repeatCount="indefinite" />
                </circle>
                <circle r="2" fill="#D1A451" filter="url(#glow)">
                  <animateMotion dur="3.4s" begin="1.9s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#timelinePath" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" dur="3.4s" begin="1.9s" repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>

          {/* Ambient sparkle particles scattered around the flow for extra shimmer */}
          {allSegmentsIn && sectionVisible && (
            <div className="absolute inset-0 pointer-events-none hidden sm:block" aria-hidden="true">
              {[
                { top: 10, left: 30 }, { top: 22, left: 78 }, { top: 34, left: 12 },
                { top: 46, left: 88 }, { top: 58, left: 20 }, { top: 68, left: 82 },
                { top: 78, left: 15 }, { top: 88, left: 70 }, { top: 96, left: 40 },
                { top: 50, left: 50 },
              ].map((p, s) => (
                <motion.span
                  key={s}
                  className="absolute rounded-full"
                  style={{
                    top: `${p.top}%`, left: `${p.left}%`,
                    width: s % 3 === 0 ? "3px" : "2px", height: s % 3 === 0 ? "3px" : "2px",
                    background: "#F3D08A",
                    boxShadow: "0 0 6px rgba(243,208,138,0.9)",
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 0.3] }}
                  transition={{
                    duration: 2.2 + (s % 4) * 0.5,
                    repeat: Infinity,
                    repeatDelay: 1 + (s % 5) * 0.4,
                    delay: s * 0.35,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          <div className="flex flex-col" style={{ gap: `${GAP}px` }}>
            {steps.map((step, i) => (
              <TimelineCard
                key={step.num}
                step={step}
                index={i}
                labelRight={i % 2 !== 0}
                cardRef={cardRefs[i]}
                cardInView={cardInViews[i]}
              />
            ))}
          </div>

          {/* End node — a fully bloomed flower marking the finale */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mt-10">
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full"
              style={{ border: "1px solid #D1A451", background: "#000", boxShadow: "0 0 16px rgba(212,175,55,0.4)" }}>
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid rgba(212,175,55,0.4)" }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              />
              <span style={{ color: "#D1A451" }} className="font-cormorant text-2xl">✦</span>
            </div>
            <span className="font-cormorant text-white text-sm mt-3">Unforgettable Celebration</span>
            <span className="font-poppins text-[10px] tracking-widest text-[#CFCFCF]/40 mt-0.5">Delivered Flawlessly</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}