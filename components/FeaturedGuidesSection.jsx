import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import SectionReveal from "./SectionReveal";

export default function FeaturedGuidesSection({
  guides = [],
  title = <>A little more perspective <em>goes a long way.</em></>,
  description = "Explore practical reading and thoughtful perspectives for the decisions ahead.",
  allGuidesHref = "/insights"
}) {
  if (!guides.length) return null;

  return (
    <section className="ssx-section ssx-guides">
      <div className="ssx-container">
        <div className="ssx-section-heading">
          <SectionReveal>
            <span className="ssx-eyebrow">THE SAVVYSPHERE JOURNAL / GUIDES & PERSPECTIVES</span>
            <h2>{title}</h2>
          </SectionReveal>
          <SectionReveal className="ssx-heading-aside" delay={0.1}>
            <p>{description}</p>
            <Link className="ssx-text-link" href={allGuidesHref}>View all insights <ArrowUpRight size={16} /></Link>
          </SectionReveal>
        </div>

        <div className="ssx-guides-grid">
          {guides.slice(0, 3).map((guide, index) => (
            <SectionReveal className="ssx-guide-card" key={guide.slug || guide.id || guide.title} delay={index * 0.08}>
              <Link href={guide.href || `${allGuidesHref}/${guide.slug}`} className="ssx-guide-image">
                {guide.image ? (
                  <Image src={guide.image} alt={guide.imageAlt || guide.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
                ) : <div className="ssx-guide-image-fallback"><BookOpen size={32} /></div>}
                <span className="ssx-guide-arrow"><ArrowUpRight size={18} /></span>
              </Link>
              <div className="ssx-guide-meta">
                <span>{guide.category || "PROPERTY PERSPECTIVES"}</span>
                {guide.readTime && <span>{guide.readTime}</span>}
              </div>
              <h3><Link href={guide.href || `${allGuidesHref}/${guide.slug}`}>{guide.title}</Link></h3>
              {guide.summary && <p>{guide.summary}</p>}
              <Link className="ssx-text-link" href={guide.href || `${allGuidesHref}/${guide.slug}`}>Read perspective <ArrowUpRight size={15} /></Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
