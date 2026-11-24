"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const processSteps = [
  {
    number: "01", title: "Understand", label: "Begin with the person, not the property.",
    detail: "We begin by listening, learning what matters and defining the right questions. A useful first step is to understand the circumstances behind the decision: what has changed, who the decision affects and what a good outcome might look like.",
    image: "/images/family-home-story.webp",
    alt: "A family sharing a playful moment together in their living room"
  },
  {
    number: "02", title: "Explore", label: "Make room for the possibilities.",
    detail: "With the priorities clearer, the next stage is to explore relevant options and identify the information that may be needed to assess them. The aim is to compare possibilities with context, not guesswork.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=88",
    alt: "Contemporary home exterior with considered landscaping"
  },
  {
    number: "03", title: "Guide", label: "Bring the important details into focus.",
    detail: "The aim is to bring structure to the questions, explain the next steps and help distinguish what is known from what still needs to be checked. Specialist legal or financial questions should be directed to appropriately qualified professionals.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=88",
    alt: "Bright contemporary living room"
  },
  {
    number: "04", title: "Move forward", label: "Take the next step with perspective.",
    detail: "A considered next step should reflect the priorities established at the beginning and the decisions that are ready to be made. The goal is a journey that feels clearer, more structured and more personal — with the people and everyday life behind the decision still in view.",
    image: "/images/family-next-chapter.webp",
    alt: "A family enjoying time together in a bright, welcoming home"
  }
];

export default function ScrollProcessStory() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(processSteps.length - 1, Math.floor(latest * processSteps.length));
    setActive((current) => current === next ? current : next);
  });

  return (
    <section className="process-scroll-story" ref={ref}>
      <div className="process-scroll-sticky">
        <motion.div
          className="process-scroll-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>THE SAVVYSPHERE METHOD</span>
          <span>SCROLL TO MOVE THROUGH THE PROCESS</span>
        </motion.div>
        <div className="process-scroll-layout">
          <motion.div
            className="process-scroll-nav"
            initial={reduceMotion ? false : { opacity: 0, x: -42 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="process-scroll-track"><motion.span style={{ scaleY: scrollYProgress }} /></div>
            {processSteps.map((step, index) => (
              <button key={step.number} type="button" onClick={() => setActive(index)} className={active === index ? "is-active" : ""} aria-pressed={active === index}>
                <span>{step.number}</span><strong>{step.title}</strong><ArrowUpRight size={16} />
              </button>
            ))}
            <div className="process-scroll-hint"><ArrowDown size={13} /> SCROLL TO CONTINUE</div>
          </motion.div>

          <motion.div
            className="process-scroll-feature"
            initial={reduceMotion ? false : { opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="process-scroll-image">
              <AnimatePresence mode="wait">
                <motion.div key={processSteps[active].number} className="process-scroll-image-layer" initial={reduceMotion ? false : { opacity: 0, scale: 1.08, clipPath: "inset(0 0 0 12%)" }} animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: reduceMotion ? 0 : .72, ease: [0.22, 1, 0.36, 1] }}>
                  <Image src={processSteps[active].image} alt={processSteps[active].alt} fill sizes="(max-width: 800px) 100vw, 55vw" />
                </motion.div>
              </AnimatePresence>
              <div className="process-image-index">{processSteps[active].number} / 04</div>
              <div className="process-image-caption">{processSteps[active].label}</div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div className="process-scroll-copy" key={processSteps[active].number} initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10 }} transition={{ duration: reduceMotion ? 0 : .48 }}>
                <span>STAGE {processSteps[active].number}</span>
                <h2>{processSteps[active].title}<i>.</i></h2>
                <p>{processSteps[active].detail}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="process-scroll-progress"><motion.span style={{ scaleX: scrollYProgress }} /></div>
      </div>
    </section>
  );
}
