"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MoveUpRight } from "lucide-react";

export default function ContactSignal() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="contact-signal" aria-hidden="true">
      <div className="contact-signal-grid" />
      <motion.div className="contact-signal-orbit contact-signal-orbit-one" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
        <span className="contact-signal-dot" />
      </motion.div>
      <motion.div className="contact-signal-orbit contact-signal-orbit-two" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 48, repeat: Infinity, ease: "linear" }}>
        <span className="contact-signal-dot contact-signal-dot-two" />
      </motion.div>
      <motion.div className="contact-signal-core" initial={{ scale: .7, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .9, ease: [0.22, 1, 0.36, 1] }}>
        <span>S.</span>
      </motion.div>
      <motion.div className="contact-signal-pulse" animate={reduceMotion ? undefined : { scale: [1, 1.65], opacity: [.38, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }} />
      <div className="contact-signal-label"><MoveUpRight size={13} /> OPEN CHANNEL / SAVVYSPHERE</div>
    </div>
  );
}
