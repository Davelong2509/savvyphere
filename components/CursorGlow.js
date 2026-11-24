"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function CursorGlow({ className = "" }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawOpacity = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: .8 });
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: .8 });
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 24 });

  function handlePointerMove(event) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    rawX.set(event.clientX - bounds.left);
    rawY.set(event.clientY - bounds.top);
    rawOpacity.set(1);
  }

  function handlePointerLeave() {
    rawOpacity.set(0);
  }

  return (
    <div ref={ref} className={`cursor-glow-field ${className}`} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} aria-hidden="true">
      <motion.span className="cursor-glow-orb" style={{ x, y, opacity }} />
    </div>
  );
}
