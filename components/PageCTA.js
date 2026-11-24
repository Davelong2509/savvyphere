"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function PageCTA({
  eyebrow = "LET'S START A CONVERSATION",
  title = "A clearer way forward starts here.",
  description = "Tell us a little about what you are looking for.",
  buttonText = "Contact SavvySphere",
  href = "/contact",
  dark = false
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`page-cta ${dark ? "page-cta--dark" : ""}`}>
      <motion.div className="page-cta-orbit" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} />
      <motion.div className="page-cta-glow" aria-hidden="true" animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [.32, .52, .32] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <Reveal className="page-cta-content" variant="blur">
        <span className="page-cta-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className="button button-light page-cta-button" href={href}>
          {buttonText} <ArrowUpRight size={17} />
          <span className="button-sheen" aria-hidden="true" />
        </Link>
      </Reveal>
      <span className="page-cta-index">SAVVYSPHERE / NEXT CHAPTER</span>
    </section>
  );
}
