import { motion } from "framer-motion";
import FoldText from "./FoldText";

const plans = [
  { tier: "Classic", price: "$5,000", desc: "Refined elegance for intimate celebrations", features: ["Up to 100 guests","Event coordination","Venue styling","Floral arrangements","Day-of management","Vendor coordination"], highlighted: false, cta: "Begin Journey" },
  { tier: "Premium", price: "$15,000", desc: "The pinnacle of sophisticated event design", features: ["Up to 300 guests","Full event design","Premium florals & décor","Lighting design","Entertainment curation","Dedicated event team","Photography direction","Post-event wrap"], highlighted: true, cta: "Most Popular" },
  { tier: "Royal", price: "Bespoke", desc: "An unparalleled experience without limits", features: ["Unlimited guests","Complete luxury experience","Celebrity entertainment","International venues","Private jet coordination","Bespoke floral design","Live performance curation","Media & press management"], highlighted: false, cta: "Inquire Now" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20" style={{ background: "#000000" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="section-label">Investment</span>
          <div className="divider-gold w-14 mx-auto my-3" />
          <div className="mt-4">
            <FoldText text="Luxury Packages" splitBy="word" hinge="top" trigger="scroll"
              duration={0.6} stagger={0.1} ease="power3.out"
              fontSize="clamp(2.2rem, 4.5vw, 3.4rem)" fontWeight={300} color="#FFFFFF"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(212,175,55,0.08)" }}>
          {plans.map((plan, i) => (
            <motion.div key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative flex flex-col"
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="gold-shimmer font-montserrat text-[10px] text-black px-4 py-1.5 font-bold tracking-widest uppercase">Featured</span>
                </div>
              )}
              <div className="flex flex-col flex-1 p-7"
                style={{
                  background: plan.highlighted ? "linear-gradient(160deg, #0e0b05 0%, #181207 100%)" : "#080604",
                  border: plan.highlighted ? "1px solid rgba(212,175,55,0.45)" : "none",
                  boxShadow: plan.highlighted ? "0 0 50px rgba(212,175,55,0.1), inset 0 1px 0 rgba(212,175,55,0.2)" : "none",
                }}>
                <div className="mb-6">
                  <div className="section-label mb-1.5">{plan.tier}</div>
                  <div className="font-cormorant text-4xl font-light text-white mt-2">{plan.price}</div>
                  {plan.price !== "Bespoke" && <span className="font-poppins text-[11px] text-[#CFCFCF]/50">starting from</span>}
                  <p className="font-poppins text-[#CFCFCF]/60 text-xs mt-2 font-light">{plan.desc}</p>
                </div>
                <div className="divider-gold mb-5" />
                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: "#D1A451" }}>◇</span>
                      <span className="font-poppins text-xs text-[#CFCFCF]/65 font-light">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={plan.highlighted ? "btn-gold w-full py-3.5 text-xs" : "btn-outline w-full py-3.5 text-xs"}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
