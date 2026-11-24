"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const chapters = [
  { title: "A place is only the beginning.", text: "Every property journey starts with a question — and the right perspective can change what comes into view." },
  { title: "The first details come into focus.", text: "As priorities become clearer, the possibilities begin to take shape." },
  { title: "A little more light. A little more clarity.", text: "Good guidance helps illuminate the details that matter, one decision at a time." },
  { title: "The whole picture starts to emerge.", text: "A considered approach connects the small details to the bigger picture." },
  { title: "Now you can see the way forward.", text: "The aim is not simply to find a place. It is to make the next step feel more certain." }
];

const windows = Array.from({ length: 20 }, (_, index) => {
  const row = Math.floor(index / 5);
  const column = index % 5;
  return {
    id: index,
    x: 308 + column * 66,
    y: 205 + row * 77,
    stage: Math.min(4, Math.floor(index / 4) + 1)
  };
});

export default function ArchitecturalIllumination() {
  const sectionRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStage = latest < 0.16 ? 0 : latest < 0.36 ? 1 : latest < 0.56 ? 2 : latest < 0.78 ? 3 : 4;
    setActiveStage((current) => current === nextStage ? current : nextStage);
  });

  return (
    <section className="illumination-story" ref={sectionRef} aria-label="A scroll-driven architectural lighting story">
      <div className="illumination-sticky">
        <div className="illumination-atmosphere" aria-hidden="true" />
        <div className="illumination-topline">
          <span>THE SAVVYSPHERE PERSPECTIVE</span>
          <span>SCROLL TO REVEAL / 0{activeStage + 1}—05</span>
        </div>

        <div className="illumination-layout">
          <motion.div
            className="illumination-copy"
            initial={reduceMotion ? false : { opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0 : 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span className="illumination-eyebrow" layout>ONE DETAIL AT A TIME</motion.span>
            <motion.h2 key={chapters[activeStage].title} initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>
              {chapters[activeStage].title}
            </motion.h2>
            <motion.p key={chapters[activeStage].text} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.5 }}>
              {chapters[activeStage].text}
            </motion.p>
            <div className="illumination-stage-dots" aria-label={`Stage ${activeStage + 1} of 5`}>
              {chapters.map((chapter, index) => (
                <span key={chapter.title} className={index <= activeStage ? "is-lit" : ""} />
              ))}
            </div>
            <Link href="/how-it-works" className="illumination-link">Discover our approach <ArrowUpRight size={16} /></Link>
          </motion.div>

          <motion.div
            className="illumination-architecture"
            initial={reduceMotion ? false : { opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="architecture-caption"><span>FIG. 01</span><span>THE HUMAN SIDE OF PROPERTY</span></div>
            <svg viewBox="0 0 900 650" role="img" aria-label="Illustrated residential building with windows illuminating progressively as you scroll" className="architecture-svg">
              <defs>
                <linearGradient id="building-front" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#73577c" />
                  <stop offset="1" stopColor="#39253f" />
                </linearGradient>
                <linearGradient id="building-side" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#4d3555" />
                  <stop offset="1" stopColor="#241b2b" />
                </linearGradient>
                <radialGradient id="window-glow">
                  <stop offset="0" stopColor="#f5d99b" stopOpacity=".65" />
                  <stop offset="1" stopColor="#f5d99b" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ground-light" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8d7194" stopOpacity=".32" />
                  <stop offset="1" stopColor="#241b2b" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g className="architecture-stars" fill="#d9c6dd">
                <circle cx="120" cy="95" r="1.5" /><circle cx="220" cy="48" r="1" /><circle cx="740" cy="80" r="1.5" /><circle cx="810" cy="145" r="1" /><circle cx="680" cy="35" r="1" />
              </g>
              <path d="M0 535 L900 535 L900 650 L0 650Z" fill="url(#ground-light)" />
              <path d="M115 535 L115 380 L225 380 L225 535Z" fill="#33243a" opacity=".8" />
              <path d="M665 535 L665 325 L780 325 L780 535Z" fill="#302238" opacity=".8" />
              <path d="M170 535 L170 285 L280 285 L280 535Z" fill="#3a2942" opacity=".7" />

              <path d="M240 535 L240 142 L675 142 L675 535Z" fill="url(#building-front)" stroke="#a68dac" strokeOpacity=".55" strokeWidth="2" />
              <path d="M675 142 L755 196 L755 535 L675 535Z" fill="url(#building-side)" stroke="#94779c" strokeOpacity=".4" strokeWidth="2" />
              <path d="M240 142 L305 92 L742 92 L675 142Z" fill="#8a7191" stroke="#c1a9c8" strokeOpacity=".45" strokeWidth="2" />
              <path d="M305 92 L305 55 L742 55 L742 92" fill="none" stroke="#a98bb0" strokeOpacity=".55" strokeWidth="2" />
              <path d="M280 170 L280 510 M640 170 L640 510" stroke="#bba6c1" strokeOpacity=".25" strokeWidth="2" />
              <path d="M240 275 L675 275 M240 365 L675 365 M240 455 L675 455" stroke="#c7b1cb" strokeOpacity=".22" strokeWidth="2" />
              <path d="M675 275 L755 325 M675 365 L755 415 M675 455 L755 505" stroke="#b69abd" strokeOpacity=".18" strokeWidth="2" />

              {windows.map((window) => {
                const isLit = activeStage >= window.stage;
                return (
                  <g key={window.id}>
                    <motion.rect
                      x={window.x - 13}
                      y={window.y - 10}
                      width="60"
                      height="67"
                      rx="4"
                      fill="url(#window-glow)"
                      animate={{ opacity: isLit ? 0.95 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
                    />
                    <motion.rect
                      x={window.x}
                      y={window.y}
                      width="34"
                      height="48"
                      rx="2"
                      stroke="#c6b2cb"
                      strokeOpacity=".48"
                      strokeWidth="1.5"
                      animate={{ fill: isLit ? "#f3d69a" : "#2c2132", opacity: isLit ? 1 : 0.72, filter: isLit ? "drop-shadow(0 0 11px rgba(247, 213, 147, .7))" : "none" }}
                      transition={{ duration: reduceMotion ? 0 : 0.65, ease: "easeOut" }}
                    />
                    <path d={`M${window.x + 17} ${window.y} V${window.y + 48} M${window.x} ${window.y + 24} H${window.x + 34}`} stroke="#59445f" strokeOpacity={isLit ? .45 : .7} strokeWidth="1" />
                  </g>
                );
              })}

              <path d="M435 535 L435 470 Q435 430 475 430 Q515 430 515 470 L515 535Z" fill="#201926" stroke="#a78aaf" strokeOpacity=".55" strokeWidth="2" />
              <circle cx="493" cy="486" r="3" fill="#e6c98e" opacity={activeStage >= 3 ? 1 : 0.15} />
              <path d="M0 535 H900" stroke="#a98cb0" strokeOpacity=".45" strokeWidth="1" />
              <path d="M100 535 Q450 510 800 535" stroke="#d0b5d7" strokeOpacity=".12" strokeWidth="1" fill="none" />
              <motion.path d="M120 550 Q450 520 790 550" stroke="#d5b8dc" strokeWidth="1" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: activeStage >= 4 ? 1 : 0.08, opacity: activeStage >= 4 ? .8 : .15 }} transition={{ duration: .8 }} />
            </svg>
            <div className="architecture-footnote"><span>LIGHT CHANGES EVERYTHING</span><span>SCROLL ↘</span></div>
          </motion.div>
        </div>

        <div className="illumination-progress-track" aria-hidden="true">
          <motion.div style={{ scaleX: scrollYProgress }} />
        </div>
        <div className="illumination-scroll-cue"><ArrowDown size={13} /> KEEP SCROLLING TO BRING THE BUILDING TO LIFE</div>
      </div>
    </section>
  );
}
