import { ArrowUpRight, Eye, MessageCircle, ScanSearch } from "lucide-react";
import Link from "next/link";
import SectionReveal from "./SectionReveal";

const defaultPrinciples = [
  {
    number: "01",
    icon: MessageCircle,
    title: "People before property",
    description: "Start by understanding the person, their circumstances and what a good outcome would mean to them."
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "Clarity over complexity",
    description: "Make room for the right questions, explain the next steps and keep the experience easy to follow."
  },
  {
    number: "03",
    icon: Eye,
    title: "A considered perspective",
    description: "Look beyond the immediate choice to the priorities and practical details that shape a property decision."
  }
];

export default function WhySavvySphereSection({
  principles = defaultPrinciples,
  title = <>A more considered way to <em>approach property.</em></>,
  description = "The SavvySphere experience is being built around thoughtful conversations, clear communication and an understanding of what matters to each person.",
  href = "/about"
}) {
  return (
    <section className="ssx-section ssx-why">
      <div className="ssx-why-backdrop" aria-hidden="true">
        <span className="ssx-why-ring ssx-why-ring-one" />
        <span className="ssx-why-ring ssx-why-ring-two" />
        <span className="ssx-why-glow" />
      </div>
      <div className="ssx-container ssx-why-layout">
        <SectionReveal className="ssx-why-intro">
          <span className="ssx-eyebrow ssx-eyebrow-light">THE SAVVYSPHERE DIFFERENCE</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link className="ssx-text-link ssx-text-link-light" href={href}>
            Discover our approach <ArrowUpRight size={16} />
          </Link>
          <span className="ssx-why-coordinate">A BETTER PERSPECTIVE / SS—01</span>
        </SectionReveal>

        <div className="ssx-why-principles">
          {principles.map((principle, index) => {
            const Icon = principle.icon || Eye;
            return (
              <SectionReveal className="ssx-why-principle" key={principle.number || principle.title} delay={index * 0.1}>
                <span className="ssx-why-number">{principle.number || `0${index + 1}`}</span>
                <div className="ssx-why-principle-icon"><Icon size={21} strokeWidth={1.3} /></div>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
                <ArrowUpRight className="ssx-why-arrow" size={18} />
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
