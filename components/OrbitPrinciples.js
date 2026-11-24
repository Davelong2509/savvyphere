"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const principles = [
  { number: "01", title: "Listen first", detail: "A good perspective starts by understanding the person behind the property decision.", angle: 0 },
  { number: "02", title: "Make it clearer", detail: "Bring the important details into focus, without adding unnecessary complexity.", angle: 120 },
  { number: "03", title: "Keep it personal", detail: "Let each journey reflect the priorities, circumstances and ambitions of the individual.", angle: 240 }
];

export default function OrbitPrinciples() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotation = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -35, reduceMotion ? 0 : 145]);

  return (
    <section className="orbit-principles section-shell" ref={ref}>
      <Reveal className="orbit-principles-copy" variant="left" amount={0.08}>
        <span className="eyebrow-text">THE PRINCIPLES IN MOTION</span>
        <h2>Three ideas.<br /><em>One clear perspective.</em></h2>
        <p>Explore the principles that shape the intended SavvySphere experience.</p>
        <div className="orbit-detail" aria-live="polite">
          <span>{principles[active].number} / 03</span>
          <h3>{principles[active].title}</h3>
          <p>{principles[active].detail}</p>
          <ArrowUpRight size={17} />
        </div>
      </Reveal>

      <Reveal className="orbit-visual" variant="right" delay={0.12} amount={0.08}>
        <div className="orbit-halo orbit-halo-one" />
        <div className="orbit-halo orbit-halo-two" />
        <motion.div className="orbit-ring orbit-ring-main" style={{ rotate: rotation }}>
          <span className="orbit-node orbit-node-one" />
          <span className="orbit-node orbit-node-two" />
          <span className="orbit-node orbit-node-three" />
        </motion.div>
        <div className="orbit-core"><span>S.</span><small>SAVVYSPHERE</small></div>
        {principles.map((principle, index) => (
          <button
            type="button"
            key={principle.number}
            className={`orbit-principle-button orbit-principle-button-${index + 1} ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span>{principle.number}</span>
            <strong>{principle.title}</strong>
          </button>
        ))}
        <span className="orbit-coordinate orbit-coordinate-top">A BETTER WAY FORWARD</span>
        <span className="orbit-coordinate orbit-coordinate-bottom">EST. ON UNDERSTANDING</span>
      </Reveal>
    </section>
  );
}
