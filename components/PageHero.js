
"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Plus } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  number = "01",
  compact = false
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 110]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.04, reduceMotion ? 1.04 : 1.15]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -38]
  );

  const entrance = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.85,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1]
    }
  });

  return (
    <section
      ref={ref}
      className={`page-hero ${compact ? "page-hero--compact" : ""}`}
    >
      {/* Background image */}
      <motion.div
        className="page-hero-image"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.15, delay: reduceMotion ? 0 : 0.08, ease: "easeOut" }}
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={image}
          alt={imageAlt || "SavvySphere architecture"}
          fill
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Image overlay */}
      <div className="page-hero-shade" />

      {/* Interactive lighting */}
      <CursorGlow className="page-hero-cursor-glow" />

      {/* Cinematic light sweep */}
      <motion.div
        className="page-hero-light-sweep"
        initial={
          reduceMotion
            ? false
            : { x: "-120%", opacity: 0 }
        }
        animate={
          reduceMotion
            ? { x: 0, opacity: 0 }
            : { x: "120%", opacity: [0, 0.4, 0] }
        }
        transition={{
          duration: reduceMotion ? 0 : 1.8,
          delay: reduceMotion ? 0 : 0.45,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />

      {/* Hero text — entrance animation, not scroll-dependent */}
      <motion.div
        className="page-hero-content"
        style={{ y: contentY }}
      >
        <motion.div
          className="page-hero-kicker"
          {...entrance(0.18)}
        >
          <span />
          {eyebrow}
        </motion.div>

        <motion.h1 {...entrance(0.32)}>
          {title}
        </motion.h1>

        {description && (
          <motion.p {...entrance(0.48)}>
            {description}
          </motion.p>
        )}
      </motion.div>

      {/* Decorative coordinates */}
      <motion.div
        className="page-hero-coordinate"
        initial={reduceMotion ? false : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          delay: reduceMotion ? 0 : 0.8
        }}
        aria-hidden="true"
      >
        <Plus size={12} />
        <span>PROPERTY / PERSPECTIVE / {number}</span>
      </motion.div>

      <span className="page-hero-index">
        {number} / SAVVYSPHERE
      </span>

      <a
        className="page-hero-scroll"
        href="#page-content"
        aria-label="Scroll to page content"
      >
        <span className="page-hero-scroll-line" />
        <span>EXPLORE THIS PAGE</span>
        <ArrowDown size={15} />
      </a>
    </section>
  );
}
