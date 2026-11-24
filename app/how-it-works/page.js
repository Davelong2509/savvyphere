import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import ScrollProcessStory from "@/components/ScrollProcessStory";
import { FAQSection, NewsletterSection } from "@/components";

export const metadata = {
  title: "How It Works",
  description: "Explore the proposed four-stage SavvySphere approach to property guidance."
};

export default function HowItWorksPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="HOW IT WORKS"
        title={<>A clearer journey.<br /><em>One step at a time.</em></>}
        description="A proposed four-stage approach designed to make important property decisions feel more considered."
        image="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2200&q=88"
        imageAlt="Architectural residential space with warm natural materials"
        number="04"
      />

      <div id="page-content">
        <Reveal as="section" className="process-intro section-shell" amount={0.08} variant="left" duration={1.05}>
          <Reveal>
            <span className="eyebrow-text">THE PROCESS</span>
            <h2>Good guidance should <em>simplify, not complicate.</em></h2>
            <p>The stages below describe the intended experience at a high level. The exact process, responsibilities and deliverables will be refined once SavvySphere confirms its services.</p>
          </Reveal>
        </Reveal>

        <ScrollProcessStory />

        <Reveal as="section" className="process-note section-shell" amount={0.08} variant="right" duration={1.05}>
          <span className="eyebrow-text">A PRACTICAL NOTE</span>
          <p>Property transactions may involve legal, financial, mortgage, surveying or other specialist advice. The final website must accurately describe SavvySphere&apos;s role and must not imply that it provides regulated professional advice unless this is confirmed and appropriately authorised.</p>
        </Reveal>
      </div>
     <FAQSection />
     
      <PageCTA title={<>Every journey starts somewhere. <em>Start here.</em></>} description="Tell us what you are considering and what you would like to understand." />
     <NewsletterSection />
      
      <SiteFooter />
    </main>
  );
}