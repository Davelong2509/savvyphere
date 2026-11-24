import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import { Reveal, ImageReveal } from "@/components/Reveal";
import OrbitPrinciples from "@/components/OrbitPrinciples";
import { FAQSection, NewsletterSection } from "@/components";

export const metadata = {
  title: "About SavvySphere",
  description: "Discover the thinking and principles behind SavvySphere's property consultancy experience."
};

const image = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88";

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="ABOUT SAVVYSPHERE"
        title={<>A different perspective.<br /><em>A more personal approach.</em></>}
        description="Property decisions are personal. The way we approach them should reflect that."
        image={image}
        imageAlt="Warm, considered contemporary residential interior"
        number="01"
      />

      <div id="page-content">
        <Reveal as="section" className="inner-split section-shell" amount={0.08} variant="right" duration={1.05}>
          <div className="inner-split-image">
            <ImageReveal src="/images/family-home-story.webp" alt="Parents, grandmother and child enjoying a playful moment together at home" direction="left" />
          </div>
          <Reveal className="inner-split-copy">
            <span className="eyebrow-text">THE THINKING BEHIND THE NAME</span>
            <h2>Property is more than <em>a transaction.</em></h2>
            <p>Every decision is connected to something larger: a change in circumstances, a new chapter, a practical need or a picture of what life could look like next.</p>
            <p>SavvySphere is being shaped as a property consultancy experience grounded in thoughtful conversations, clear communication and an understanding of individual priorities.</p>
            <p>Our role, services and areas of specialism will be described in full once the client discovery process has confirmed the business model.</p>
          </Reveal>
        </Reveal>

        <OrbitPrinciples />

        <Reveal as="section" className="about-note section-shell" amount={0.08} variant="left" duration={1.05}>
          <div className="about-note-mark">S.</div>
          <div>
            <span className="eyebrow-text">A NOTE ON OUR STORY</span>
            <p>This page is an editorial introduction to the brand direction. The founder story, company history, team biographies, credentials and confirmed service-area details will be added when supplied and approved by SavvySphere.</p>
          </div>
        </Reveal>
      </div>

      <FAQSection />

      <PageCTA title={<>Let's begin with <em>a conversation.</em></>} description="Tell us what you are considering and what a helpful next step might look like." />
     
     <NewsletterSection />  
     <SiteFooter />
    </main>
  );
}