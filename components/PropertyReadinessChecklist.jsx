"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import SectionReveal from "./SectionReveal";

const defaultGroups = [
  {
    id: "priorities",
    number: "01",
    title: "Your priorities",
    description: "Think about the kind of place and everyday life you are looking for.",
    items: [
      "I have identified my preferred areas.",
      "I know which property types I am considering.",
      "I have separated essential features from preferences."
    ]
  },
  {
    id: "budget",
    number: "02",
    title: "Your budget",
    description: "Consider the wider costs, not just the headline property price.",
    items: [
      "I have an indicative budget in mind.",
      "I have considered additional moving and purchase costs.",
      "I know which financial questions need professional advice."
    ]
  },
  {
    id: "timing",
    number: "03",
    title: "Your timing",
    description: "Consider your preferred timeframe and how flexible it may be.",
    items: [
      "I have a preferred timeframe.",
      "I understand any commitments that may affect my move.",
      "I know where I may be flexible."
    ]
  },
  {
    id: "questions",
    number: "04",
    title: "Your questions",
    description: "Make a note of anything you need to understand before making a decision.",
    items: [
      "I have listed my main questions.",
      "I know which details need checking by a qualified professional.",
      "I have identified the next step I want to take."
    ]
  }
];

export default function PropertyReadinessChecklist({
  groups = defaultGroups,
  title = <>A little preparation can make <em>a big difference.</em></>,
  description = "Use this checklist to organise your thoughts before starting a property conversation."
}) {
  const [checked, setChecked] = useState({});
  const reduceMotion = useReducedMotion();

  const allItems = useMemo(() => groups.flatMap((group) => group.items.map((item) => `${group.id}:${item}`)), [groups]);
  const completed = allItems.filter((item) => checked[item]).length;
  const progress = allItems.length ? Math.round((completed / allItems.length) * 100) : 0;

  function toggleItem(key) {
    setChecked((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <section className="ssx-section ssx-readiness">
      <div className="ssx-container">
        <div className="ssx-readiness-heading">
          <SectionReveal>
            <span className="ssx-eyebrow">YOUR PROPERTY BRIEF / PREPARATION</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </SectionReveal>

          <SectionReveal className="ssx-readiness-progress" variant="scale">
            <div className="ssx-progress-top"><span>YOUR PROGRESS</span><strong>{progress}%</strong></div>
            <div className="ssx-progress-track"><motion.span animate={{ width: `${progress}%` }} transition={{ duration: reduceMotion ? 0 : 0.45 }} /></div>
            <div className="ssx-progress-bottom"><span>{completed} of {allItems.length} considered</span><button type="button" onClick={() => setChecked({})}><RotateCcw size={12} /> Reset</button></div>
          </SectionReveal>
        </div>

        <div className="ssx-readiness-grid">
          {groups.map((group, index) => (
            <SectionReveal className="ssx-readiness-card" key={group.id} delay={index * 0.07}>
              <div className="ssx-readiness-card-head">
                <span>{group.number}</span>
                <h3>{group.title}</h3>
              </div>
              <p>{group.description}</p>
              <div className="ssx-readiness-items">
                {group.items.map((item) => {
                  const key = `${group.id}:${item}`;
                  return (
                    <label className={`ssx-check-item ${checked[key] ? "is-checked" : ""}`} key={key}>
                      <input type="checkbox" checked={!!checked[key]} onChange={() => toggleItem(key)} />
                      <span className="ssx-check-box"><Check size={12} /></span>
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </SectionReveal>
          ))}
        </div>

        <p className="ssx-content-note">A planning prompt only, not legal, mortgage, financial, survey or valuation advice. Your checklist stays in this page session and is not saved or submitted.</p>
      </div>
    </section>
  );
}
