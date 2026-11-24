"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal, Reveal } from "@/components/Reveal";

export default function PeopleFirstStory({
  image = "/images/family-home-story.webp",
  imageAlt = "A family sharing a relaxed moment together at home",
  eyebrow = "BEYOND THE ADDRESS",
  title = <>A home is more than a place. <em>It is where life happens.</em></>,
  description = "A first set of keys. A little more room to grow. A fresh start in a place that feels right. Behind every property decision is a person, a family, a change or a plan for the future.",
  supportingText = "We believe the experience should begin by understanding that story — not simply looking at rooms, streets or floor plans.",
  caption = "THE MOMENTS THAT MAKE A HOUSE A HOME",
  ctaHref = "/how-it-works",
  ctaLabel = "Explore our approach",
  reverse = false,
  index = "01"
}) {
  return (
    <section className={`people-first-story ${reverse ? "people-first-story--reverse" : ""}`}>
      <div className="people-first-story-inner section-shell">
        <Reveal
          className="people-first-story-visual"
          variant={reverse ? "right" : "left"}
          amount={0.08}
        >
          <ImageReveal
            className="people-first-story-image"
            src={image}
            alt={imageAlt}
            direction={reverse ? "right" : "left"}
            sizes="(max-width: 760px) 100vw, 54vw"
          />
          <span className="people-first-story-caption">{caption}</span>
          <span className="people-first-story-index">SAVVYSPHERE / {index}</span>
        </Reveal>

        <Reveal
          className="people-first-story-copy"
          variant={reverse ? "left" : "right"}
          delay={0.12}
          amount={0.08}
        >
          <span className="eyebrow-text">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          {supportingText && <p>{supportingText}</p>}
          {ctaHref && (
            <Link className="text-link" href={ctaHref}>
              {ctaLabel} <ArrowUpRight size={17} />
            </Link>
          )}
          <span className="people-first-story-mark" aria-hidden="true">S.</span>
        </Reveal>
      </div>
    </section>
  );
}
