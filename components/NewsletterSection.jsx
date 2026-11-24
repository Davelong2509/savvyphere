"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "./SectionReveal";

export default function NewsletterSection({
  onSubscribe,
  title = <>A more considered view of <em>what's next.</em></>,
  description = "Receive occasional property perspectives, useful reading and SavvySphere updates.",
  insightsHref = "/insights"
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const reduceMotion = useReducedMotion();

  async function handleSubmit(event) {
    event.preventDefault();
    if (typeof onSubscribe !== "function" || !email.trim()) return;

    setStatus("loading");
    try {
      await onSubscribe(email.trim());
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="ssx-section ssx-newsletter">
      <div className="ssx-newsletter-orbit" aria-hidden="true">
        <motion.span animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 48, repeat: Infinity, ease: "linear" }} />
        <motion.span animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} />
        <i />
      </div>
      <div className="ssx-container ssx-newsletter-layout">
        <SectionReveal className="ssx-newsletter-copy">
          <span className="ssx-eyebrow ssx-eyebrow-light">STAY IN THE PICTURE / SAVVYSPHERE NOTES</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </SectionReveal>

        <SectionReveal className="ssx-newsletter-action" delay={0.12}>
          {typeof onSubscribe === "function" ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="ssx-newsletter-email">YOUR EMAIL ADDRESS</label>
              <div className="ssx-newsletter-input-wrap">
                <Mail size={17} />
                <input
                  id="ssx-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Joining..." : "Subscribe"} <ArrowUpRight size={17} />
                </button>
              </div>
              <p className="ssx-newsletter-privacy">Only connect this form after the mailing-list provider, consent wording and privacy details have been approved.</p>
              {status === "success" && <p className="ssx-newsletter-status" role="status"><CheckCircle2 size={15} /> Thank you. Your subscription was received.</p>}
              {status === "error" && <p className="ssx-newsletter-status is-error" role="alert">We couldn't complete your subscription. Please try again.</p>}
            </form>
          ) : (
            <div className="ssx-newsletter-placeholder">
              <span>THE JOURNAL IS OPEN</span>
              <p>Explore the latest perspectives while the newsletter subscription is being prepared.</p>
              <Link href={insightsHref}>Explore insights <ArrowUpRight size={16} /></Link>
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
