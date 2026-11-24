import { ArrowUpRight, Compass, House, MoveRight, Users } from "lucide-react";
import Link from "next/link";
import SectionReveal from "./SectionReveal";
import { ImageReveal } from "@/components/Reveal";

const defaultAudiences = [
  {
    number: "01",
    icon: House,
    title: "People looking for a home",
    description: "Individuals and households exploring their next home and trying to make sense of the options available to them.",
    prompt: "A place that fits real life."
  },
  {
    number: "02",
    icon: Compass,
    title: "People planning a move",
    description: "Those weighing up a change, defining their priorities or working out what a property move could involve.",
    prompt: "A move with more direction."
  },
  {
    number: "03",
    icon: Users,
    title: "People who need clarity",
    description: "Anyone who would benefit from a clearer starting point, better questions and a more considered view of their property options.",
    prompt: "Confidence in the next step."
  }
];

export default function WhoWeHelpSection({
  audiences = defaultAudiences,
  title = <>Different circumstances.<br /><em>One thoughtful starting point.</em></>,
  description = "Property decisions are personal. The support should begin by understanding the person behind the enquiry.",
  contactHref = "/contact"
}) {
  return (
    <section className="ssx-section ssx-who">
      <div className="ssx-container">
        <div className="ssx-section-heading ssx-who-heading">
          <SectionReveal>
            <span className="ssx-eyebrow">WHO WE HELP / THE PEOPLE BEHIND THE PROPERTY</span>
            <h2>{title}</h2>
          </SectionReveal>
          <SectionReveal delay={0.12} className="ssx-heading-aside">
            <p>{description}</p>
            <Link className="ssx-text-link" href={contactHref}>
              Tell us what you need <ArrowUpRight size={16} />
            </Link>
          </SectionReveal>
        </div>

        <div className="ssx-who-story">
          <ImageReveal
            className="ssx-who-story-image"
            src="/images/family-next-chapter.webp"
            alt="A family enjoying a joyful moment together in a bright, welcoming home"
            direction="left"
            sizes="(max-width: 760px) 100vw, 52vw"
          />
          <SectionReveal className="ssx-who-story-copy" variant="right" delay={0.12}>
            <span className="ssx-eyebrow">THE LIFE BEHIND THE BRIEF</span>
            <h3>What matters most is rarely written on a floor plan.</h3>
            <p>It is the routines, relationships, milestones and everyday moments that make a place feel right. A property decision should leave room for the life you want to live.</p>
            <span className="ssx-who-story-signoff">PEOPLE FIRST. PROPERTY WITH PERSPECTIVE.</span>
          </SectionReveal>
        </div>

        <div className="ssx-who-grid">
          {audiences.map((audience, index) => {
            const Icon = audience.icon || House;
            return (
              <SectionReveal className="ssx-who-card" key={audience.number || audience.title} delay={index * 0.09}>
                <div className="ssx-who-card-top">
                  <span>{audience.number || String(index + 1).padStart(2, "0")}</span>
                  <Icon size={23} strokeWidth={1.25} />
                </div>
                <div className="ssx-who-card-bottom">
                  <h3>{audience.title}</h3>
                  <p>{audience.description}</p>
                  {audience.prompt && <span className="ssx-who-prompt">{audience.prompt}</span>}
                </div>
                <span className="ssx-who-card-line" aria-hidden="true" />
              </SectionReveal>
            );
          })}
        </div>
        <p className="ssx-content-note">Audience descriptions are broad positioning copy and should be refined against SavvySphere's confirmed client profile.</p>
      </div>
    </section>
  );
}
