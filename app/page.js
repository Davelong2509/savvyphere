"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MoveDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageCTA from "@/components/PageCTA";
import ArchitecturalIllumination from "@/components/ArchitecturalIllumination";
import { Reveal, ImageReveal } from "@/components/Reveal";
import CursorGlow from "@/components/CursorGlow";
import { FAQSection, NewsletterSection, WhoWeHelpSection, WhySavvySphereSection } from "@/components";
import TestimonialsSection from "@/components/TestimonialsSection";
import PeopleFirstStory from "@/components/PeopleFirstStory";

const photos = {
  hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",
  intro: "/images/family-next-chapter.webp",
  service: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=88",
  galleryA: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=88",
  galleryB: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=88",
  galleryC: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=88"
};

function Eyebrow({ index, children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-index">{index}</span>
      <span className="eyebrow-rule" />
      <span>{children}</span>
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div
        className="hero-image-mask"
        initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: reduceMotion ? 0 : 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div className="hero-image-parallax" style={{ y: imageY }}>
          <Image src={photos.hero} alt="Contemporary residential architecture in a landscaped setting" fill priority sizes="100vw" />
        </motion.div>
      </motion.div>
      <div className="hero-overlay" />
      <CursorGlow className="home-hero-cursor-glow" />
      <div className="hero-content">
        <motion.div className="hero-kicker" initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .5, delay: reduceMotion ? 0 : .35 }}>
          <span className="hero-kicker-rule" />
          A DIFFERENT PERSPECTIVE ON PROPERTY
        </motion.div>
        <h1 className="hero-title">
          <span className="hero-title-line"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.9 }}>Finding the right</motion.span></span>
          <span className="hero-title-line"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.48, duration: reduceMotion ? 0 : 0.9 }}>place begins with</motion.span></span>
          <span className="hero-title-line"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.61, duration: reduceMotion ? 0 : 0.9 }}><em>the right guidance.</em></motion.span></span>
        </h1>
        <motion.p className="hero-description" initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .5, delay: reduceMotion ? 0 : .95 }}>
          Thoughtful property guidance. Informed decisions.
          <br />A better way forward.
        </motion.p>
        <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .5, delay: reduceMotion ? 0 : 1.1 }}>
          <Link className="button button-light" href="/services">Explore our services <ArrowUpRight size={18} /></Link>
          <Link className="text-link text-link-light" href="/contact">Speak with our team <ArrowUpRight size={17} /></Link>
        </motion.div>
      </div>
      <Link className="hero-scroll" href="#home-introduction"><MoveDown size={16} /> <span>SCROLL TO EXPLORE</span></Link>
      <span className="hero-index">01 — SAVVYSPHERE</span>
    </section>
  );
}


export default function Home() {
  return (
    <main>
      <SiteHeader overHero />
      <Hero />

      <Reveal as="section" className="about-section section-shell" id="home-introduction" amount={0.08} variant="left" duration={1.05}>
        <div className="about-visual">
          <ImageReveal className="about-image" src={photos.intro} alt="A family sharing a happy moment together in a welcoming home" />
          <div className="about-image-note"><span>THOUGHTFUL CHOICES</span><strong>Clearer next steps.</strong></div>
          <span className="about-image-index">A MORE CONSIDERED PERSPECTIVE / 01</span>
        </div>
        <Reveal className="about-copy" variant="left">
          <Eyebrow index="01">INTRODUCING SAVVYSPHERE</Eyebrow>
          <h2>Property is personal.<br /><em>Your guidance should be, too.</em></h2>
          <p>Every property decision carries a story. A new beginning, a changing priority, a vision for what comes next.</p>
          <p>SavvySphere is being shaped around a simple belief: better decisions start with thoughtful conversations, a fresh perspective and guidance that puts people first.</p>
          <Link className="text-link" href="/about">Discover SavvySphere <ArrowUpRight size={17} /></Link>
        </Reveal>
      </Reveal>

      <ArchitecturalIllumination />

      <PeopleFirstStory
        image="/images/family-home-story.webp"
        imageAlt="Parents and grandmother enjoying a playful moment with a child in their family living room"
        eyebrow="BEYOND THE ADDRESS / THE LIFE YOU ARE BUILDING"
        title={<>A home is more than a place. <em>It is where life happens.</em></>}
        description="A first set of keys. A little more room to grow. A fresh start in a place that feels right. Behind every property decision is a person, a family, a change or a plan for the future."
        supportingText="We believe the experience should begin by understanding that story — not simply looking at rooms, streets or floor plans."
        caption="THE MOMENTS THAT MAKE A HOUSE A HOME"
        ctaHref="/how-it-works"
        ctaLabel="Explore our approach"
        index="STORY"
      />

      <Reveal as="section" className="home-services section-shell" amount={0.06} variant="right" duration={1.05}>
        <div className="home-section-heading">
          <Reveal>
            <Eyebrow index="02">WHAT WE DO</Eyebrow>
            <h2>Guidance for <em>what comes next.</em></h2>
            <p>A considered starting point for exploring the support SavvySphere may offer.</p>
          </Reveal>
          <Link className="text-link" href="/services">Explore our services <ArrowUpRight size={17} /></Link>
        </div>
        <div className="home-service-feature">
          <ImageReveal src={photos.service} alt="Contemporary home exterior" />
          <Reveal variant="left" delay={0.18}>
            <span className="feature-kicker">A MORE PERSONAL PROPERTY JOURNEY</span>
            <h3>Start with a conversation.<br /><em>Find a clearer direction.</em></h3>
            <p>Explore the proposed service areas and see how a thoughtful, people-first approach could support your next decision.</p>
            <Link className="text-link" href="/services">View service areas <ArrowUpRight size={17} /></Link>
            <small>Concept service areas pending client confirmation.</small>
          </Reveal>
        </div>
      </Reveal>
     <WhySavvySphereSection  />
      <WhoWeHelpSection  />
     
      
      {/* <PropertyReadinessChecklist /> */}

      <TestimonialsSection />

      <Reveal as="section" className="home-approach section-shell" amount={0.08} variant="left" duration={1.05}>
        <Reveal>
          <Eyebrow index="03">THE SAVVYSPHERE APPROACH</Eyebrow>
          <h2>Clarity in <em>every step.</em></h2>
          <p>Good guidance should simplify, not complicate. Explore the proposed four-stage approach.</p>
          <Link className="text-link" href="/how-it-works">How it works <ArrowUpRight size={17} /></Link>
        </Reveal>
        <div className="home-steps">
          {[
            ["01", "Understand"],
            ["02", "Explore"],
            ["03", "Guide"],
            ["04", "Move forward"]
          ].map(([number, label]) => (
            <Reveal className="home-step" key={number}>
              <span>{number}</span><strong>{label}</strong><ArrowUpRight size={17} />
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="home-gallery section-shell" amount={0.08} variant="right" duration={1.05}>
        <div className="home-section-heading">
          <Reveal>
            <Eyebrow index="04">PROPERTY & PLACE</Eyebrow>
            <h2>Spaces shape the way <em>we live.</em></h2>
          </Reveal>
          <Reveal variant="right" delay={0.18}><p>Illustrative architectural photography exploring contemporary living and the possibilities of place.</p></Reveal>
        </div>
        <div className="home-gallery-grid">
          <ImageReveal src={photos.galleryA} alt="Contemporary living space" />
          <ImageReveal src={photos.galleryB} alt="Refined residential interior" />
          <ImageReveal src={photos.galleryC} alt="Warm contemporary home interior" />
        </div>
        <p className="gallery-disclaimer">Illustrative photography only. These images do not represent SavvySphere listings or managed properties.</p>
      </Reveal>

      <FAQSection />
 
      <PageCTA
        title={<>Your next property decision deserves a <em>smarter approach.</em></>}
        description="Let's start with a conversation about where you are and what comes next."
      />
      <NewsletterSection />
      <SiteFooter />
    </main>
  );
}