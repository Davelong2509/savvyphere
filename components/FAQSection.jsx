"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import SectionReveal from "./SectionReveal";
import defaultFaqItems from "./data/faq";

export default function FAQSection({
  items = defaultFaqItems,
  title = <>A few things worth <em>knowing.</em></>,
  description = "Straightforward answers to help you understand the SavvySphere experience.",
  contactHref = "/contact",
  id = "frequently-asked-questions"
}) {
  const [activeCategory, setActiveCategory] = useState("All questions");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(items?.[0]?.id || null);
  const listId = useId();
  const reduceMotion = useReducedMotion();

  const categories = useMemo(
    () => ["All questions", ...new Set(items.map((item) => item.category).filter(Boolean))],
    [items]
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatch = activeCategory === "All questions" || item.category === activeCategory;
      const searchMatch =
        !query ||
        `${item.question} ${item.answer} ${item.category || ""}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [items, activeCategory, search]);

  return (
    <section className="ssx-section ssx-faq" id={id}>
      <div className="ssx-faq-orbit" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="ssx-container ssx-faq-layout">
        <SectionReveal className="ssx-faq-intro">
          <span className="ssx-eyebrow">GOOD TO KNOW / FAQ</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link className="ssx-text-link" href={contactHref}>
            Still have a question? <ArrowUpRight size={16} />
          </Link>
          <div className="ssx-faq-index" aria-hidden="true">S / 01</div>
        </SectionReveal>

        <SectionReveal className="ssx-faq-content" variant="right" delay={0.1} amount={0.08}>
          <div className="ssx-faq-tools">
            <label className="ssx-faq-search">
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setOpenId(null);
                }}
                placeholder="Search your question..."
                aria-label="Search frequently asked questions"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </label>

            <div className="ssx-faq-categories" role="group" aria-label="Filter questions by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "is-active" : ""}
                  aria-pressed={activeCategory === category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenId(null);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="ssx-faq-list">
            {filteredItems.length ? filteredItems.map((item, index) => {
              const isOpen = openId === item.id;
              const panelId = `${listId}-${item.id}`;

              return (
                <div className={`ssx-faq-item ${isOpen ? "is-open" : ""}`} key={item.id}>
                  <button
                    type="button"
                    className="ssx-faq-question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span className="ssx-faq-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="ssx-faq-question-copy">
                      <small>{item.category}</small>
                      <strong>{item.question}</strong>
                    </span>
                    <motion.span
                      className="ssx-faq-toggle"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.28 }}
                    >
                      <span />
                      <span />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        className="ssx-faq-answer-wrap"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="ssx-faq-answer">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }) : (
              <div className="ssx-faq-empty" role="status">
                <span>NO MATCHES FOUND</span>
                <p>Try another phrase or choose a different topic.</p>
                <button type="button" onClick={() => { setSearch(""); setActiveCategory("All questions"); }}>
                  Reset filters
                </button>
              </div>
            )}
          </div>

          <div className="ssx-faq-foot">
            <span>{filteredItems.length} {filteredItems.length === 1 ? "ANSWER" : "ANSWERS"}</span>
            <span>CAN'T FIND WHAT YOU NEED?</span>
            <Link href={contactHref}>ASK SAVVYSPHERE <ArrowUpRight size={13} /></Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
