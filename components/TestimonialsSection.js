"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Quote
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/content/testimonials";

const previewStories = [
  {
    id: "experience",
    label: "THE EXPERIENCE",
    prompt: "A real client's words about how the first conversation felt.",
    guidance: "Invite feedback about feeling listened to, understood and welcomed."
  },
  {
    id: "guidance",
    label: "THE GUIDANCE",
    prompt: "A real client's words about the guidance they received.",
    guidance: "Look for specific feedback about communication, clarity and support."
  },
  {
    id: "outcome",
    label: "THE OUTCOME",
    prompt: "A real client's words about what working together helped them achieve.",
    guidance: "Only include outcomes the client has confirmed and agreed to share."
  }
];

function TestimonialControls({ activeIndex, count, onPrevious, onNext, onSelect }) {
  return (
    <div className="testimonial-controls" aria-label="Testimonial navigation">
      <div className="testimonial-dots" role="group" aria-label="Choose a testimonial">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            className={activeIndex === index ? "is-active" : ""}
            onClick={() => onSelect(index)}
            aria-label={`Show ${index + 1} of ${count}`}
            aria-pressed={activeIndex === index}
          />
        ))}
      </div>
      <div className="testimonial-arrows">
        <button type="button" onClick={onPrevious} aria-label="Previous testimonial">
          <ArrowLeft size={17} />
        </button>
        <button type="button" onClick={onNext} aria-label="Next testimonial">
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ items = testimonials }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const hasTestimonials = items.length > 0;
  const slides = hasTestimonials ? items : previewStories;
  const activeSlide = slides[Math.min(activeIndex, slides.length - 1)];

  function selectSlide(nextIndex) {
    setDirection(nextIndex >= activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  }

  function moveSlide(step) {
    const nextIndex = (activeIndex + step + slides.length) % slides.length;
    setDirection(step);
    setActiveIndex(nextIndex);
  }

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <motion.div
        className="testimonials-ambient-orbit"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      >
        <span />
        <i />
      </motion.div>
      <div className="testimonials-grain" aria-hidden="true" />

      <div className="testimonials-layout">
        <Reveal className="testimonials-copy" variant="left">
          <div className="testimonials-eyebrow">
            <span>04</span>
            <i />
            <span>THE HUMAN SIDE OF PROPERTY</span>
          </div>
          <p className="testimonials-overline">TRUST IS BUILT, NOT CLAIMED.</p>
          <h2 id="testimonials-title">
            The most meaningful stories come from <em>people.</em>
          </h2>
          <p className="testimonials-description">
            Property decisions are personal. When clients share their experiences,
            their words deserve to be presented with the same care and honesty as
            the guidance itself.
          </p>
          <Link className="testimonials-contact-link" href="/contact">
            Start your own conversation <ArrowUpRight size={17} />
          </Link>
          <div className="testimonials-side-note">
            <span>SHARED WITH PERMISSION</span>
            <span>ALWAYS IN THEIR OWN WORDS</span>
          </div>
        </Reveal>

        <Reveal className="testimonials-stage" variant="right" delay={0.12} amount={0.08}>
          <div className="testimonials-stage-topline">
            <span>CLIENT PERSPECTIVES</span>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          </div>

          <div className="testimonial-card-frame">
            <div className="testimonial-card-corner testimonial-card-corner--top" />
            <div className="testimonial-card-corner testimonial-card-corner--bottom" />

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              {hasTestimonials ? (
                <motion.figure
                  key={activeSlide.id || activeIndex}
                  className="testimonial-card testimonial-card--live"
                  custom={direction}
                  initial={reduceMotion ? false : { opacity: 0, x: direction * 34, filter: "blur(7px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: direction * -28, filter: "blur(5px)" }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="testimonial-card-meta">
                    <span>VERIFIED CLIENT EXPERIENCE</span>
                    {activeSlide.category && <span>{activeSlide.category}</span>}
                  </div>
                  <Quote className="testimonial-quote-icon" size={43} strokeWidth={1.1} aria-hidden="true" />
                  <blockquote>{activeSlide.quote}</blockquote>
                  <figcaption className="testimonial-attribution">
                    <span className="testimonial-attribution-mark" aria-hidden="true">
                      {(activeSlide.name || "S").trim().charAt(0).toUpperCase()}
                    </span>
                    <span>
                      <strong>{activeSlide.name}</strong>
                      {(activeSlide.role || activeSlide.location) && (
                        <small>{[activeSlide.role, activeSlide.location].filter(Boolean).join(" · ")}</small>
                      )}
                    </span>
                  </figcaption>
                </motion.figure>
              ) : (
                <motion.div
                  key={activeSlide.id}
                  className="testimonial-card testimonial-card--preview"
                  custom={direction}
                  initial={reduceMotion ? false : { opacity: 0, x: direction * 34, filter: "blur(7px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: direction * -28, filter: "blur(5px)" }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  <div className="testimonial-card-meta">
                    <span>CLIENT STORY / PREVIEW</span>
                    <span className="testimonial-awaiting">AWAITING APPROVAL</span>
                  </div>
                  <div className="testimonial-preview-body">
                    <span className="testimonial-preview-quote" aria-hidden="true">“</span>
                    <span className="testimonial-preview-label">{activeSlide.label}</span>
                    <h3>{activeSlide.prompt}</h3>
                    <p>{activeSlide.guidance}</p>
                  </div>
                  <div className="testimonial-preview-foot">
                    <span>CLIENT NAME / ROLE</span>
                    <span>PERMISSION TO PUBLISH REQUIRED</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="testimonial-stage-bottom">
            <div className="testimonial-stage-caption">
              <span>{hasTestimonials ? "CLIENT FEEDBACK" : "WHAT WE'LL FEATURE"}</span>
              <p>
                {hasTestimonials
                  ? "Genuine experiences, shared with permission."
                  : "Experience · Guidance · Outcome"}
              </p>
            </div>
            <TestimonialControls
              activeIndex={activeIndex}
              count={slides.length}
              onPrevious={() => moveSlide(-1)}
              onNext={() => moveSlide(1)}
              onSelect={selectSlide}
            />
          </div>
        </Reveal>
      </div>

      <div className="testimonials-bottom-rule" aria-hidden="true">
        <span>SAVVYSPHERE / CLIENT EXPERIENCES</span>
        <span>REAL WORDS CARRY WEIGHT.</span>
      </div>
    </section>
  );
}
