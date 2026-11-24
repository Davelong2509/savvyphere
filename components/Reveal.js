"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * One reliable observer for both page-load and scroll entrances.
 * A section that is ALREADY in the viewport is animated immediately on mount.
 * A section further down is revealed when it actually enters the viewport.
 * 'once' defaults to true so visible content never disappears on scroll-back.
 */
const easing = [0.22, 1, 0.36, 1];
const variants = {
  up:    { opacity: 0, y: 76 },
  down:  { opacity: 0, y: -76 },
  left:  { opacity: 0, x: -96 },
  right: { opacity: 0, x: 96 },
  fade:  { opacity: 0 },
  blur:  { opacity: 0, y: 38, filter: "blur(12px)" },
  scale: { opacity: 0, y: 28, scale: 0.945 },
  rotate:{ opacity: 0, y: 45, rotateX: 8 },
  mask:  { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  maskLeft: { clipPath: "inset(0 100% 0 0)", opacity: 0 }
};
function finish(variant) {
  switch (variant) {
    case "left": case "right": return { opacity: 1, x: 0 };
    case "down": case "up": return { opacity: 1, y: 0 };
    case "blur": return { opacity: 1, y: 0, filter: "blur(0px)" };
    case "scale": return { opacity: 1, y: 0, scale: 1 };
    case "rotate": return { opacity: 1, y: 0, rotateX: 0 };
    case "mask": case "maskLeft": return { opacity: 1, clipPath: "inset(0 0 0 0)" };
    default: return { opacity: 1 };
  }
}
const elements = {
  div: motion.div, section: motion.section, article: motion.article,
  header: motion.header, aside: motion.aside, footer: motion.footer,
  figure: motion.figure, li: motion.li
};

function useArrival(once = true, rootMargin = "0px 0px -9% 0px") {
  const nodeRef = useRef(null);
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Check first, rather than waiting for the first IntersectionObserver callback.
    // This specifically handles the first section on a page refresh and route navigation.
    function nearViewport() {
      const rect = node.getBoundingClientRect();
      return rect.bottom > -1 && rect.top < window.innerHeight * 0.92;
    }

    if (nearViewport()) setHasArrived(true);

    if (!('IntersectionObserver' in window)) {
      setHasArrived(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasArrived(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setHasArrived(false);
        }
      },
      { threshold: 0, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return [nodeRef, hasArrived];
}

export function Reveal({
  as = "div", children, className = "", variant = "up",
  delay = 0, duration = 0.92, once = true,
  amount, viewportMargin = "0px 0px -9% 0px", style,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const [ref, arrived] = useArrival(once, viewportMargin);
  const Element = elements[as] || motion.div;
  const from = variants[variant] || variants.up;
  const scene = as === "section";
  const to = finish(variant);
  const initialState = reduceMotion ? to : from;

  return (
    <Element
      ref={ref}
      className={className}
      style={style}
      data-scroll-reveal={arrived || reduceMotion ? "visible" : "waiting"}
      data-scroll-direction={variant}
      {...(scene ? { "data-motion-scene": "true" } : {})}
      initial={initialState}
      animate={arrived || reduceMotion ? to : initialState}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: easing
      }}
      {...rest}
    >
      {children}
    </Element>
  );
}

/** Use for NEW sections and to preserve semantic section elements. */
export function ScrollSection({ as = "section", variant = "up", ...props }) {
  return <Reveal as={as} variant={variant} {...props} />;
}

/** Keeps the existing ImageReveal API, with the same reliable scroll observer. */
export function ImageReveal({
  src, alt, className = "", priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
  direction = "up", duration = 1.15, amount,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const [ref, arrived] = useArrival(true, "0px 0px -7% 0px");
  const mask = {
    up: "inset(0 0 100% 0)",
    down: "inset(100% 0 0 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)"
  }[direction] || "inset(0 0 100% 0)";
  const visible = arrived || reduceMotion;

  return (
    <motion.div
      ref={ref}
      className={`image-reveal ${className}`}
      data-scroll-reveal={visible ? "visible" : "waiting"}
      initial={reduceMotion ? false : { clipPath: mask }}
      animate={{ clipPath: visible ? "inset(0 0 0 0)" : mask }}
      transition={{ duration: reduceMotion ? 0 : duration, ease: [0.76, 0, 0.24, 1] }}
      {...rest}
    >
      <motion.div
        className="image-reveal-inner"
        initial={reduceMotion ? false : { scale: 1.12, y: 18 }}
        animate={{ scale: visible ? 1 : 1.12, y: visible ? 0 : 18 }}
        transition={{ duration: reduceMotion ? 0 : duration + 0.22, ease: easing }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} />
      </motion.div>
      <motion.span
        className="image-reveal-flash"
        aria-hidden="true"
        initial={{ x: "-125%", opacity: 0 }}
        animate={visible && !reduceMotion ? { x: "125%", opacity: [0, 0.25, 0] } : { x: "-125%", opacity: 0 }}
        transition={{ duration: 0.95, delay: 0.2, ease: easing }}
      />
    </motion.div>
  );
}

export function WordReveal({ text, className = "", delay = 0.055 }) {
  const reduceMotion = useReducedMotion();
  const [ref, arrived] = useArrival(true);
  const words = text.split(" ");
  return (
    <span ref={ref} className={`word-reveal ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span className="word-reveal-mask" aria-hidden="true" key={`${word}-${i}`}>
          <motion.span
            initial={reduceMotion ? false : { y: "115%", opacity: 0 }}
            animate={{ y: arrived || reduceMotion ? "0%" : "115%", opacity: arrived || reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : i * delay, ease: easing }}
          >{word}</motion.span>
        </span>
      ))}
    </span>
  );
}
