"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [previewed, setPreviewed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setPreviewed(true);
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>01 / YOUR ENQUIRY</span>
        <p>Tell us a little about what you are looking for.</p>
      </div>

      <label htmlFor="enquiry-name">Your name</label>
      <input id="enquiry-name" name="name" type="text" autoComplete="name" placeholder="How should we address you?" required />

      <label htmlFor="enquiry-email">Email address</label>
      <input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />

      <label htmlFor="enquiry-message">How can we help?</label>
      <textarea id="enquiry-message" name="message" rows="3" placeholder="A little about the guidance you are looking for..." required />

      <button className="form-submit" type="submit">
        Preview enquiry <ArrowUpRight size={18} />
      </button>

      <p className="form-privacy-note">
        Prototype form only. No information is sent or stored. A verified contact destination must be connected before launch.
      </p>

      {previewed && (
        <p className="form-status" role="status">
          Form interaction confirmed. This is a preview only; no enquiry has been sent.
        </p>
      )}
    </form>
  );
}