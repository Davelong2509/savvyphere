
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Pause,
  Play,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/content/testimonials";

const easing = [0.22, 1, 0.36, 1];

const previewStories = [
  {
    id: "experience",
    label: "THE EXPERIENCE",
    prompt: "A real client's words about how the first conversation felt.",
    guidance:
      "Invite feedback about feeling listened to, understood and welcomed.",
  },
  {
    id: "guidance",
    label: "THE GUIDANCE",
    prompt: "A real client's words about the guidance they received.",
    guidance:
      "Look for specific feedback about communication, clarity and support.",
  },
  {
    id: "outcome",
    label: "THE OUTCOME",
    prompt:
      "A real client's words about what working together helped them achieve.",
    guidance:
      "Only include outcomes the client has confirmed and agreed to share.",
  },
];

/* =========================================
   TESTIMONIAL ANIMATION VARIANTS
========================================= */

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction * 34,
    filter: "blur(7px)",
  }),

  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },

  exit: (direction) => ({
    opacity: 0,
    x: direction * -28,
    filter: "blur(5px)",
  }),
};

/* =========================================
   TESTIMONIAL NAVIGATION
========================================= */

function TestimonialControls({
  activeIndex,
  count,
  onPrevious,
  onNext,
  onSelect,
  onTogglePlay,
  isPlaying,
  progress,
}) {
  return (
    <div
      className="testimonial-controls"
      aria-label="Testimonial navigation"
    >
      <div
        className="testimonial-dots"
        role="group"
        aria-label="Choose a testimonial"
      >
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            className={
              activeIndex === index ? "is-active" : ""
            }
            onClick={() => onSelect(index)}
            aria-label={`Show testimonial ${index + 1} of ${count}`}
            aria-pressed={activeIndex === index}
          >
            <span
              className="testimonial-dot-fill"
              style={{
                transform: `scaleX(${
                  index === activeIndex
                    ? progress
                    : index < activeIndex
                      ? 1
                      : 0
                })`,
              }}
            />
          </button>
        ))}
      </div>

      <div className="testimonial-arrows">
        {/* Play / Pause */}

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={
            isPlaying
              ? "Pause automatic rotation"
              : "Play automatic rotation"
          }
          className="testimonial-play-toggle"
          disabled={count < 2}
        >
          {isPlaying ? (
            <Pause size={14} />
          ) : (
            <Play size={14} />
          )}
        </button>

        {/* Previous testimonial */}

        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous testimonial"
          disabled={count < 2}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Next testimonial */}

        <button
          type="button"
          onClick={onNext}
          aria-label="Next testimonial"
          disabled={count < 2}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* =========================================
   MAIN TESTIMONIAL SECTION
========================================= */

export default function TestimonialsSection({
  items = testimonials,
  interval = 4000,
}) {
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const elapsedRef = useRef(0);

  const isInView = useInView(sectionRef, {
    amount: "some",
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const hasTestimonials = items.length > 0;

  const slides = hasTestimonials
    ? items
    : previewStories;

  const count = slides.length;
  const currentIndex = activeIndex % count;
  const activeSlide = slides[currentIndex];

  const slideDuration = Math.max(
    1000,
    Number(interval) || 7000
  );

  const canAutoplay =
    isPlaying &&
    !isHovered &&
    !isFocused &&
    isInView &&
    isPageVisible &&
    count > 1;

  /* =========================================
     REDUCED MOTION PREFERENCE
  ========================================= */

  useEffect(() => {
    if (reduceMotion) {
      setIsPlaying(false);
    }
  }, [reduceMotion]);

  /* =========================================
     BROWSER TAB VISIBILITY
  ========================================= */

  useEffect(() => {
    function handleVisibility() {
      setIsPageVisible(!document.hidden);
    }

    handleVisibility();

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  /* =========================================
     RESET TIMER ON SLIDE CHANGE
  ========================================= */

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [activeIndex, count, slideDuration]);

  /* =========================================
     AUTOMATIC TESTIMONIAL TIMER
  ========================================= */

  useEffect(() => {
    if (!canAutoplay) return;

    let frame;
    let previousTime = performance.now();

    function tick(now) {
      const delta = now - previousTime;

      previousTime = now;

      elapsedRef.current += delta;

      const nextProgress = Math.min(
        elapsedRef.current / slideDuration,
        1
      );

      setProgress(nextProgress);

      if (nextProgress >= 1) {
        elapsedRef.current = 0;

        setDirection(1);
        setProgress(0);

        setActiveIndex(
          (previous) => (previous + 1) % count
        );

        return;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [
    canAutoplay,
    activeIndex,
    count,
    slideDuration,
  ]);

  /* =========================================
     MANUAL NAVIGATION
  ========================================= */

  function resetTimer() {
    elapsedRef.current = 0;
    setProgress(0);
  }

  function selectSlide(nextIndex) {
    resetTimer();

    setDirection(
      nextIndex >= currentIndex ? 1 : -1
    );

    setActiveIndex(nextIndex);
  }

  function moveSlide(step) {
    resetTimer();

    setDirection(step);

    setActiveIndex(
      (previous) =>
        (previous + step + count) % count
    );
  }

  function toggleAutoplay() {
    setIsPlaying((previous) => !previous);
  }

  /* =========================================
     SECTION MARKUP
  ========================================= */

  return (
    <section
      ref={sectionRef}
      className="testimonials-section"
      aria-labelledby="testimonials-title"
    >
      {/* Ambient background orbit */}

      <motion.div
        className="testimonials-ambient-orbit"
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : { rotate: 360 }
        }
        transition={{
          duration: 75,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
        <i />
      </motion.div>

      <div
        className="testimonials-grain"
        aria-hidden="true"
      />

      <div className="testimonials-layout">
        {/* LEFT SIDE — INTRODUCTION */}

        <Reveal
          className="testimonials-copy"
          variant="left"
        >
          <div className="testimonials-eyebrow">
            <span>04</span>
            <i />
            <span>THE HUMAN SIDE OF PROPERTY</span>
          </div>

          <p className="testimonials-overline">
            TRUST IS BUILT, NOT CLAIMED.
          </p>

          <h2 id="testimonials-title">
            The most meaningful stories come from{" "}
            <em>people.</em>
          </h2>

          <p className="testimonials-description">
            Property decisions are personal. When
            clients share their experiences, their
            words deserve to be presented with the
            same care and honesty as the guidance
            itself.
          </p>

          <Link
            className="testimonials-contact-link"
            href="/contact"
          >
            Start your own conversation
            <ArrowUpRight size={17} />
          </Link>

          <div className="testimonials-side-note">
            <span>SHARED WITH PERMISSION</span>
            <span>ALWAYS IN THEIR OWN WORDS</span>
          </div>
        </Reveal>

        {/* RIGHT SIDE — AUTOMATIC CAROUSEL */}

        <Reveal
          className="testimonials-stage"
          variant="right"
          delay={0.12}
          amount={0.08}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget
              )
            ) {
              setIsFocused(false);
            }
          }}
        >
          {/* Header and slide counter */}

          <div className="testimonials-stage-topline">
            <span>CLIENT PERSPECTIVES</span>

            <span>
              {String(currentIndex + 1).padStart(
                2,
                "0"
              )}
              {" / "}
              {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Main testimonial card */}

          <div
            className="testimonial-card-frame"
            aria-live={
              canAutoplay ? "off" : "polite"
            }
          >
            {/* Animated timer */}

            <div
              className="testimonial-timer-track"
              aria-hidden="true"
            >
              <div
                className="testimonial-timer-fill"
                style={{
                  transform: `scaleX(${progress})`,
                }}
              />
            </div>

            {/* Decorative card corners */}

            <div className="testimonial-card-corner testimonial-card-corner--top" />

            <div className="testimonial-card-corner testimonial-card-corner--bottom" />

            <AnimatePresence
              mode="wait"
              custom={direction}
              initial={false}
            >
              {hasTestimonials ? (
                /* REAL CLIENT TESTIMONIAL */

                <motion.figure
                  key={
                    activeSlide.id || currentIndex
                  }
                  className="testimonial-card testimonial-card--live"
                  custom={direction}
                  variants={slideVariants}
                  initial={
                    reduceMotion ? false : "enter"
                  }
                  animate="center"
                  exit={
                    reduceMotion ? undefined : "exit"
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease: easing,
                  }}
                >
                  <div className="testimonial-card-meta">
                    <span>
                      VERIFIED CLIENT EXPERIENCE
                    </span>

                    {activeSlide.category && (
                      <span>
                        {activeSlide.category}
                      </span>
                    )}
                  </div>

                  <Quote
                    className="testimonial-quote-icon"
                    size={43}
                    strokeWidth={1.1}
                    aria-hidden="true"
                  />

                  <blockquote>
                    {activeSlide.quote}
                  </blockquote>

                  <figcaption className="testimonial-attribution">
                    <span
                      className="testimonial-attribution-mark"
                      aria-hidden="true"
                    >
                      {(activeSlide.name || "S")
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </span>

                    <span>
                      <strong>
                        {activeSlide.name}
                      </strong>

                      {(activeSlide.role ||
                        activeSlide.location) && (
                        <small>
                          {[
                            activeSlide.role,
                            activeSlide.location,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </small>
                      )}
                    </span>
                  </figcaption>
                </motion.figure>
              ) : (
                /* PREVIEW — UNTIL TESTIMONIALS EXIST */

                <motion.div
                  key={activeSlide.id}
                  className="testimonial-card testimonial-card--preview"
                  custom={direction}
                  variants={slideVariants}
                  initial={
                    reduceMotion ? false : "enter"
                  }
                  animate="center"
                  exit={
                    reduceMotion ? undefined : "exit"
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease: easing,
                  }}
                >
                  <div className="testimonial-card-meta">
                    <span>
                      CLIENT STORY / PREVIEW
                    </span>

                    <span className="testimonial-awaiting">
                      AWAITING APPROVAL
                    </span>
                  </div>

                  <div className="testimonial-preview-body">
                    <span
                      className="testimonial-preview-quote"
                      aria-hidden="true"
                    >
                      “
                    </span>

                    <span className="testimonial-preview-label">
                      {activeSlide.label}
                    </span>

                    <h3>{activeSlide.prompt}</h3>

                    <p>{activeSlide.guidance}</p>
                  </div>

                  <div className="testimonial-preview-foot">
                    <span>CLIENT NAME / ROLE</span>

                    <span>
                      PERMISSION TO PUBLISH REQUIRED
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Caption and carousel navigation */}

          <div className="testimonial-stage-bottom">
            <div className="testimonial-stage-caption">
              <span>
                {hasTestimonials
                  ? "CLIENT FEEDBACK"
                  : "WHAT WE'LL FEATURE"}
              </span>

              <p>
                {hasTestimonials
                  ? "Genuine experiences, shared with permission."
                  : "Experience · Guidance · Outcome"}
              </p>
            </div>

            <TestimonialControls
              activeIndex={currentIndex}
              count={count}
              progress={progress}
              isPlaying={isPlaying}
              onTogglePlay={toggleAutoplay}
              onPrevious={() => moveSlide(-1)}
              onNext={() => moveSlide(1)}
              onSelect={selectSlide}
            />
          </div>
        </Reveal>
      </div>

      {/* Bottom editorial rule */}

      <div
        className="testimonials-bottom-rule"
        aria-hidden="true"
      >
        <span>
          SAVVYSPHERE / CLIENT EXPERIENCES
        </span>

        <span>REAL WORDS CARRY WEIGHT.</span>
      </div>
    </section>
  );
}
