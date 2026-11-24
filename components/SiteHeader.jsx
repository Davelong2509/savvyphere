"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Find a property", href: "/find-a-property" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Insights", href: "/insights" }
];

const menuVariants = {
  hidden: { opacity: 0, y: -14, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.055,
      delayChildren: 0.06
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function SiteHeader({ overHero = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 36);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href) =>
    pathname === href ||
    (href === "/insights" && pathname.startsWith("/insights/"));

  return (
    <>
      <motion.header
        className={`site-header ${
          overHero ? "site-header--over-hero" : "site-header--solid"
        } ${scrolled ? "is-scrolled" : ""}`}
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          delay: reduceMotion ? 0 : overHero ? 0.35 : 0.05,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {/* The artwork is taken from the supplied SavvySphere logo. */}
        <Link
          className="brand-wordmark brand-logo-link"
          href="/"
          aria-label="SavvySphere — Home"
          onClick={closeMenu}
        >
          <span className="ss-brand-logo" aria-hidden="true">
            <Image
              className="ss-brand-logo__color"
              src="/images/savvysphere-logo-color.png"
              alt=""
              width={1260}
              height={215}
              sizes="(max-width: 800px) 190px, 235px"
              priority
            />
            <Image
              className="ss-brand-logo__white"
              src="/images/savvysphere-logo-white.png"
              alt=""
              width={1260}
              height={215}
              sizes="(max-width: 800px) 190px, 235px"
              priority
            />
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={isActive(link.href) ? "is-active" : ""}
            >
              <span className="desktop-nav-index">0{index + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Let&apos;s talk <ArrowUpRight size={15} strokeWidth={1.8} />
        </Link>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={reduceMotion ? false : { rotate: -70, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { rotate: 70, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav-panel"
              aria-label="Mobile navigation"
              variants={reduceMotion ? undefined : menuVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              exit={reduceMotion ? undefined : "exit"}
            >
              {links.map((link, index) => (
                <motion.div
                  variants={reduceMotion ? undefined : itemVariants}
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={isActive(link.href) ? "is-active" : ""}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    <span>0{index + 1}</span>
                    {link.label}
                    <ArrowUpRight size={17} />
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={reduceMotion ? undefined : itemVariants}>
                <Link
                  className="mobile-nav-cta"
                  href="/contact"
                  onClick={closeMenu}
                >
                  Start a conversation <ArrowUpRight size={17} />
                </Link>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
    </>
  );
}
