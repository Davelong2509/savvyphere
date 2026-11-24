"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export default function ArticleReadingProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  return (
    <div className="article-reading-progress" aria-hidden="true">
      <motion.span style={{ scaleX: reduceMotion ? 0 : scrollYProgress }} />
    </div>
  );
}
