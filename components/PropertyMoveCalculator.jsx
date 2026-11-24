"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Calculator, Home, MoveRight } from "lucide-react";
// import "./PropertyMoveCalculator.css";

const MIN_PRICE = 100000;
const MAX_PRICE = 1500000;
const STEP = 10000;

const money = (value) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export default function PropertyMoveCalculator({
  image = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=85",
  contactHref = "/contact",
}) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [mode, setMode] = useState("buy");
  const [price, setPrice] = useState(350000);
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceDraft, setPriceDraft] = useState("350000");
  const [depositPercent, setDepositPercent] = useState(10);
  const [feeA, setFeeA] = useState(1.3);
  const [feeB, setFeeB] = useState(0.9);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [reducedMotion ? 0 : -35, reducedMotion ? 0 : 35]
  );

  const sliderProgress = ((price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const deposit = (price * depositPercent) / 100;
  const remaining = price - deposit;
  const firstFee = (price * feeA) / 100;
  const secondFee = (price * feeB) / 100;
  const difference = firstFee - secondFee;

  function changePrice(next) {
    const value = clamp(Number(next), MIN_PRICE, MAX_PRICE);
    setPrice(value);
    setPriceDraft(String(value));
  }

  function commitPrice() {
    changePrice(Number(priceDraft));
    setEditingPrice(false);
  }

  const entry = (direction = 1, delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, x: direction * 64, y: 16 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: reducedMotion ? 0 : 0.85,
      delay: reducedMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section className="ss-move" id="property-planner" ref={sectionRef}>
      <div className="ss-move__shell">
        <motion.div className="ss-move__heading" {...entry(-1)}>
          <p className="ss-move__eyebrow">THE NEXT CHAPTER / PROPERTY PLANNER</p>
          <h2>
            Your move, <em>in numbers.</em>
          </h2>
          <p>Explore a few useful figures before you make your next property decision.</p>
        </motion.div>

        <div className="ss-move__scene">
          <motion.div
            className="ss-move__photo"
            style={{ y: backgroundY }}
            aria-hidden="true"
          >
            <Image src={image} alt="" fill sizes="100vw" />
          </motion.div>
          <div className="ss-move__veil" aria-hidden="true" />

          <div className="ss-move__layout">
            <motion.div className="ss-move__calculator" {...entry(-1, 0.06)}>
              <div className="ss-move__card-head">
                <span><Calculator size={17} /> EXPLORE YOUR OPTIONS</span>
                <span>01 / 02</span>
              </div>

              <div className="ss-move__tabs" role="group" aria-label="Choose a calculation">
                <button
                  type="button"
                  className={mode === "buy" ? "is-active" : ""}
                  aria-pressed={mode === "buy"}
                  onClick={() => setMode("buy")}
                >
                  Buying
                </button>
                <button
                  type="button"
                  className={mode === "sell" ? "is-active" : ""}
                  aria-pressed={mode === "sell"}
                  onClick={() => setMode("sell")}
                >
                  Selling
                </button>
              </div>

              <div className="ss-move__price-head">
                <label htmlFor="ss-property-price">Your property {mode === "buy" ? "budget" : "value"}</label>
                <button
                  type="button"
                  className="ss-move__manual"
                  onClick={() => {
                    setPriceDraft(String(price));
                    setEditingPrice(!editingPrice);
                  }}
                >
                  {editingPrice ? "Cancel" : "Enter manually"}
                </button>
              </div>

              {editingPrice ? (
                <div className="ss-move__manual-row">
                  <span>£</span>
                  <input
                    aria-label="Enter property price in pounds"
                    type="number"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={STEP}
                    value={priceDraft}
                    onChange={(e) => setPriceDraft(e.target.value)}
                    onBlur={commitPrice}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitPrice();
                      if (e.key === "Escape") setEditingPrice(false);
                    }}
                  />
                </div>
              ) : (
                <strong className="ss-move__price">{money(price)}</strong>
              )}

              <input
                id="ss-property-price"
                className="ss-move__slider"
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={STEP}
                value={price}
                onChange={(e) => changePrice(e.target.value)}
                style={{ "--progress": `${sliderProgress}%` }}
              />
              <div className="ss-move__range-labels">
                <span>{money(MIN_PRICE)}</span>
                <span>{money(MAX_PRICE)}</span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mode}
                  className="ss-move__results"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: reducedMotion ? 0 : 0.24 }}
                  aria-live="polite"
                >
                  {mode === "buy" ? (
                    <>
                      <div className="ss-move__deposit">
                        <span>Deposit example</span>
                        <div className="ss-move__choices">
                          {[5, 10, 15, 20].map((percent) => (
                            <button
                              type="button"
                              key={percent}
                              aria-pressed={depositPercent === percent}
                              className={depositPercent === percent ? "is-active" : ""}
                              onClick={() => setDepositPercent(percent)}
                            >
                              {percent}%
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="ss-move__result-row">
                        <span>Illustrative deposit ({depositPercent}%)</span>
                        <strong>{money(deposit)}</strong>
                      </div>
                      <div className="ss-move__result-total">
                        <span>Property price remaining</span>
                        <strong>{money(remaining)}</strong>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ss-move__fee-row">
                        <label htmlFor="ss-fee-a">Fee example A (%)</label>
                        <input
                          id="ss-fee-a"
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={feeA}
                          onChange={(e) => setFeeA(clamp(Number(e.target.value), 0, 10))}
                        />
                        <strong>{money(firstFee)}</strong>
                      </div>
                      <div className="ss-move__fee-row">
                        <label htmlFor="ss-fee-b">Fee example B (%)</label>
                        <input
                          id="ss-fee-b"
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={feeB}
                          onChange={(e) => setFeeB(clamp(Number(e.target.value), 0, 10))}
                        />
                        <strong>{money(secondFee)}</strong>
                      </div>
                      <div className="ss-move__result-total">
                        <span>
                          {difference > 0
                            ? "Example B costs less by"
                            : difference < 0
                            ? "Example B costs more by"
                            : "Difference between examples"}
                        </span>
                        <strong>{money(Math.abs(difference))}</strong>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="ss-move__card-note">
                {mode === "buy"
                  ? "For illustration only. Excludes taxes, moving costs and lending eligibility."
                  : "Editable hypothetical fees, not actual agent quotations or SavvySphere pricing. VAT and other costs may apply."}
              </p>
            </motion.div>

            <motion.div className="ss-move__story" {...entry(1, 0.2)}>
              <span className="ss-move__story-eyebrow">
                <Home size={15} /> PLANNING WITH PERSPECTIVE
              </span>
              <h3>
                {mode === "buy" ? (
                  <>A clearer picture of <em>what comes next.</em></>
                ) : (
                  <>The right questions can <em>make a difference.</em></>
                )}
              </h3>
              <p>
                {mode === "buy"
                  ? "A property is more than a price. Explore your starting figures, then take the next step with the right information and guidance."
                  : "Understand how different fee scenarios affect the numbers. When you have actual quotes, compare them alongside the service and support included."}
              </p>
              <Link href={contactHref} className="ss-move__cta">
                Discuss your property plans <ArrowUpRight size={19} />
              </Link>
              <div className="ss-move__story-foot">
                <span>01 — UNDERSTAND</span>
                <MoveRight size={17} />
                <span>02 — MOVE FORWARD</span>
              </div>
            </motion.div>
          </div>
        </div>

        <p className="ss-move__disclaimer">
          This interactive tool is illustrative and not a mortgage quote, valuation,
          fee quotation or financial advice. Confirm actual costs and obtain
          professional advice where appropriate.
        </p>
      </div>
    </section>
  );
}
