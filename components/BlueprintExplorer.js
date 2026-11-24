"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Crosshair } from "lucide-react";

const points = [
  { id: "location", number: "01", title: "Location", detail: "The surrounding area, everyday journeys and the places that matter to your routine.", x: "24%", y: "32%" },
  { id: "space", number: "02", title: "Space & layout", detail: "How rooms, proportions and practical details could support the way you want to live.", x: "68%", y: "42%" },
  { id: "timing", number: "03", title: "Timing", detail: "The timeframe, flexibility and decisions that may shape your next move.", x: "51%", y: "76%" }
];

export default function BlueprintExplorer() {
  const [active, setActive] = useState("location");
  const reduceMotion = useReducedMotion();
  const selected = points.find((point) => point.id === active);

  return (
    <section className="blueprint-explorer" aria-label="Interactive property brief blueprint">
      <div className="blueprint-topline"><span>THE PROPERTY BRIEF / 01</span><span>SELECT A POINT OF INTEREST</span></div>
      <div className="blueprint-layout">
        <div className="blueprint-drawing">
          <div className="blueprint-grid" />
          <svg viewBox="0 0 760 520" className="blueprint-svg" role="img" aria-label="Abstract architectural floor plan drawing">
            <defs>
              <pattern id="blueprint-grid-small" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="#b9a8c6" strokeOpacity=".12" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="760" height="520" fill="url(#blueprint-grid-small)" />
            <motion.path d="M90 70 H650 V445 H90 Z M90 70 V445 M650 70 V445" fill="none" stroke="#e8d9ed" strokeWidth="5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 1.8, ease: "easeInOut" }} />
            <motion.path d="M90 285 H350 V70 M350 285 V445 M350 285 H650 M470 285 V445 M470 70 V195 H650" fill="none" stroke="#c9b4d1" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 1.4, delay: .25, ease: "easeInOut" }} />
            <path d="M90 165 H145 M145 165 V70 M350 195 H420 M420 195 V285 M470 365 H540 M540 365 V445" fill="none" stroke="#d7c6de" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M110 92 H330 V265 H110 Z M370 92 H630 V175 H370 Z M370 305 H450 V425 H370 Z M490 305 H630 V425 H490 Z" fill="#8b7195" fillOpacity=".12" stroke="#a68caf" strokeOpacity=".55" strokeWidth="1" />
            <path d="M110 265 Q150 265 150 225 M330 195 Q330 235 290 235 M470 195 Q510 195 510 235 M450 365 Q450 325 490 325" fill="none" stroke="#bfa9c9" strokeWidth="1.5" />
            <g fill="#e8d9ed" fontSize="11" letterSpacing="2">
              <text x="180" y="180">LIVING</text><text x="475" y="145">BEDROOM</text><text x="390" y="380">STUDY</text><text x="530" y="380">KITCHEN</text>
            </g>
            <g fill="none" stroke="#e7d5ed" strokeOpacity=".4" strokeWidth="1">
              <path d="M65 70 H45 V445 H65 M675 70 H695 V445 H675" />
              <path d="M90 45 V25 H650 V45 M90 470 V490 H650 V470" />
            </g>
            <g fill="#d6c5dd" fontSize="9" letterSpacing="2"><text x="350" y="18" textAnchor="middle">CONCEPTUAL FLOOR PLAN / NOT TO SCALE</text></g>
          </svg>

          {points.map((point) => (
            <button
              type="button"
              key={point.id}
              className={`blueprint-hotspot ${active === point.id ? "is-active" : ""}`}
              style={{ left: point.x, top: point.y }}
              onClick={() => setActive(point.id)}
              aria-label={`Explore ${point.title}`}
              aria-pressed={active === point.id}
            >
              <span className="blueprint-hotspot-pulse" />
              <Crosshair size={15} />
              <small>{point.number}</small>
            </button>
          ))}
          <span className="blueprint-scale">N / 01 — 03</span>
        </div>

        <div className="blueprint-detail-panel" aria-live="polite">
          <span className="eyebrow-text">A BRIEF IS MORE THAN A SEARCH</span>
          <AnimatePresence mode="wait">
            <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduceMotion ? 0 : .45 }}>
              <span className="blueprint-detail-number">{selected.number} / 03</span>
              <h3>{selected.title}</h3>
              <p>{selected.detail}</p>
            </motion.div>
          </AnimatePresence>
          <div className="blueprint-selectors">
            {points.map((point) => (
              <button key={point.id} type="button" className={active === point.id ? "is-active" : ""} onClick={() => setActive(point.id)}>
                <span>{point.number}</span>{point.title}<ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="blueprint-footline"><span>ILLUSTRATIVE INTERACTION / NOT A PROPERTY PLAN</span><span>MOVE THROUGH THE DETAILS ↗</span></div>
    </section>
  );
}
