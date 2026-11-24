"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";

const emptyBrief = {
  location: "",
  type: "",
  budget: "",
  timing: "",
  notes: ""
};

const steps = ["Location", "Priorities", "Your brief"];

export default function PropertyBriefForm() {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState(emptyBrief);
  const [previewed, setPreviewed] = useState(false);
  const reduceMotion = useReducedMotion();

  function updateField(event) {
    const { name, value } = event.target;
    setBrief((current) => ({ ...current, [name]: value }));
    setPreviewed(false);
  }

  function nextStep() {
    if (step === 0 && !brief.location.trim()) return;
    setStep((current) => Math.min(2, current + 1));
  }

  function previousStep() {
    setStep((current) => Math.max(0, current - 1));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (step < 2) {
      nextStep();
      return;
    }
    setPreviewed(true);
  }

  return (
    <form className="enquiry-form property-brief-form property-brief-wizard" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>PROPERTY BRIEF / INTERACTIVE PREVIEW</span>
        <p>Start with what matters to you.</p>
      </div>

      <div className="brief-wizard-progress" aria-label={`Step ${step + 1} of 3`}>
        <div className="brief-wizard-progress-line"><motion.span animate={{ scaleX: (step + 1) / 3 }} transition={{ duration: reduceMotion ? 0 : .5, ease: [0.22, 1, 0.36, 1] }} /></div>
        <div className="brief-wizard-steps">
          {steps.map((label, index) => (
            <span key={label} className={index <= step ? "is-active" : ""}>
              <i>{index < step ? <Check size={10} /> : `0${index + 1}`}</i>{label}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="brief-wizard-panel"
          key={step}
          initial={reduceMotion ? false : { opacity: 0, x: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -18 }}
          transition={{ duration: reduceMotion ? 0 : .38, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <>
              <span className="brief-step-kicker">01 / WHERE ARE YOU LOOKING?</span>
              <label htmlFor="brief-location">Preferred area</label>
              <input id="brief-location" name="location" value={brief.location} onChange={updateField} placeholder="Town, city or postcode" required autoComplete="off" />
              <label htmlFor="brief-type">Property type</label>
              <select id="brief-type" name="type" value={brief.type} onChange={updateField}>
                <option value="">Select an option</option>
                <option>House</option>
                <option>Flat or apartment</option>
                <option>Not sure yet</option>
                <option>Other</option>
              </select>
            </>
          )}

          {step === 1 && (
            <>
              <span className="brief-step-kicker">02 / WHAT FEELS RIGHT?</span>
              <label htmlFor="brief-budget">Indicative budget</label>
              <input id="brief-budget" name="budget" value={brief.budget} onChange={updateField} placeholder="e.g. £250,000" />
              <label htmlFor="brief-timing">Timeframe</label>
              <select id="brief-timing" name="timing" value={brief.timing} onChange={updateField}>
                <option value="">Select timeframe</option>
                <option>As soon as possible</option>
                <option>Within 3 months</option>
                <option>3–6 months</option>
                <option>Just exploring</option>
              </select>
            </>
          )}

          {step === 2 && (
            <>
              <span className="brief-step-kicker">03 / ANYTHING ELSE?</span>
              <div className="brief-review-summary">
                <span>YOUR STARTING POINT</span>
                <strong>{brief.location || "Location not specified"}</strong>
                <small>{[brief.type, brief.budget, brief.timing].filter(Boolean).join(" · ") || "No additional preferences added"}</small>
              </div>
              <label htmlFor="brief-notes">Additional priorities or questions</label>
              <textarea id="brief-notes" name="notes" value={brief.notes} onChange={updateField} rows="4" placeholder="Share anything that would help describe what you have in mind..." />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="brief-wizard-actions">
        {step > 0 ? (
          <button className="brief-back-button" type="button" onClick={previousStep}><ArrowLeft size={15} /> Back</button>
        ) : <span className="brief-back-placeholder" />}
        {step < 2 ? (
          <button className="form-submit" type="button" onClick={nextStep} disabled={step === 0 && !brief.location.trim()}>Continue <ArrowRight size={17} /></button>
        ) : (
          <button className="form-submit" type="submit">Preview property brief <ArrowUpRight size={18} /></button>
        )}
      </div>

      <p className="form-privacy-note">Proposed enquiry experience only. This preview does not search live properties or send/store your information.</p>
      {previewed && (
        <motion.div className="form-status brief-preview-status" role="status" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Check size={16} />
          <span>Your brief preview is ready. No property search has been performed and no information has been sent.</span>
        </motion.div>
      )}
    </form>
  );
}
