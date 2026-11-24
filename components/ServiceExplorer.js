"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

const serviceConcepts = [
  {
    number: "01",
    title: "Housing advisory",
    description: "A considered space to explore housing questions, priorities and possible next steps.",
    detail: "Explore the question before choosing the direction.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=88",
    alt: "Contemporary residential architecture framed by a landscaped garden"
  },
  {
    number: "02",
    title: "Property guidance",
    description: "Clearer thinking around the options and decisions involved in a property journey.",
    detail: "Make space for better-informed decisions.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=88",
    alt: "Warm, carefully composed contemporary residential interior"
  },
  {
    number: "03",
    title: "Strategic support",
    description: "Thoughtful support to help bring structure and perspective to the process.",
    detail: "Keep the people and priorities behind the decision in focus.",
    image: "/images/family-next-chapter.webp",
    alt: "A family sharing a joyful moment at home, reflecting the people behind every property decision"
  }
];

export default function ServiceExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 110, damping: 18, mass: .45 });
  const rotateY = useSpring(rawRotateY, { stiffness: 110, damping: 18, mass: .45 });
  const active = serviceConcepts[activeIndex];

  function handlePointerMove(event) {
    if (reduceMotion || !stageRef.current || event.pointerType !== "mouse") return;
    const bounds = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    rawRotateX.set(y * -5);
    rawRotateY.set(x * 6);
  }

  function resetTilt() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <div className="service-explorer service-explorer-enhanced">
      <div className="service-options" role="group" aria-label="Concept service areas">
        <div className="service-options-heading"><span>EXPLORE A SERVICE AREA</span><span>0{activeIndex + 1} / 03</span></div>
        {serviceConcepts.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.button
              className={`service-option ${isActive ? "is-active" : ""}`}
              type="button"
              key={service.number}
              aria-pressed={isActive}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              whileHover={reduceMotion ? undefined : { x: 5 }}
              transition={{ duration: .28 }}
            >
              <span className="service-option-number">{service.number}</span>
              <span className="service-option-copy">
                <strong>{service.title}</strong>
                <small>{service.description}</small>
              </span>
              <span className="service-option-icon"><ArrowUpRight size={20} strokeWidth={1.5} /></span>
              <motion.span className="service-option-progress" initial={false} animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }} />
            </motion.button>
          );
        })}
        <p className="concept-disclaimer">Concept service areas only. Final services require client confirmation.</p>
      </div>

      <div className="service-stage-wrap">
        <motion.div
          ref={stageRef}
          className="service-stage service-stage-enhanced"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          style={{ rotateX, rotateY, transformPerspective: 1100 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className="service-stage-image"
              key={active.number}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.08, clipPath: "inset(0 0 0 12%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
              exit={{ opacity: 0, scale: .98, clipPath: "inset(0 12% 0 0)" }}
              transition={{ duration: reduceMotion ? 0 : .75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={active.image} alt={active.alt} fill sizes="(max-width: 760px) 100vw, 52vw" />
              <div className="service-stage-shade" />
              <div className="service-stage-caption">
                <span>CONCEPT FOCUS / {active.number}</span>
                <p>{active.detail}</p>
              </div>
              <div className="service-stage-corner"><MoveUpRight size={19} /></div>
            </motion.div>
          </AnimatePresence>
          <div className="service-stage-orbit" aria-hidden="true"><span /><span /><span /></div>
        </motion.div>
        <div className="service-stage-foot">
          <span>THE SAVVYSPHERE PERSPECTIVE</span>
          <span>0{activeIndex + 1} / 03</span>
        </div>
      </div>
    </div>
  );
}
