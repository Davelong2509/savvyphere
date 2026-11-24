
"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  const duration = reduceMotion ? 0 : 2.5;
  const ease = [0.22, 1, 0.36, 1];

  useEffect(() => {
    let timer;
    let finished = false;

    const start = performance.now();

    const finish = () => {
      if (finished) return;

      finished = true;

      const elapsed = performance.now() - start;
      const minimum = reduceMotion ? 0 : 2500;

      timer = setTimeout(() => {
        setVisible(false);
      }, Math.max(0, minimum - elapsed));
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, {
        once: true,
      });
    }

    // Prevent slow assets from blocking the website.
    const fallback = setTimeout(finish, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      window.removeEventListener("load", finish);
    };
  }, [reduceMotion]);

  // Prevent scrolling during the loading experience.
  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="savvysphere-preloader"
          className="savvy-preloader"
          role="status"
          aria-label="Loading SavvySphere"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="savvy-preloader-content">

            {/* Fully animated SVG brand logo */}
            <div className="savvy-preloader-logo">
              <AnimatedLogo />
            </div>

            {/* Brand tagline */}
            <motion.div
              className="savvy-preloader-tagline"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: reduceMotion ? 0 : 1.7,
                duration: reduceMotion ? 0 : 0.6,
                ease,
              }}
            >
              A DIFFERENT PERSPECTIVE ON PROPERTY
            </motion.div>

            {/* Loading progress indicator */}
            <motion.div
              className="savvy-preloader-track"
              aria-hidden="true"
              initial={{
                opacity: reduceMotion ? 1 : 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
              }}
            >
              <motion.div
                className="savvy-preloader-progress"
                initial={{
                  scaleX: reduceMotion ? 1 : 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            </motion.div>
          </div>

          {/* Bottom loading caption */}
          <motion.span
            className="savvy-preloader-caption"
            initial={{
              opacity: reduceMotion ? 1 : 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: reduceMotion ? 0 : 0.8,
              duration: reduceMotion ? 0 : 0.6,
            }}
          >
            PREPARING YOUR EXPERIENCE
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
