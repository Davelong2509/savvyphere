import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import PropertyBriefForm from "@/components/PropertyBriefForm";
import { Reveal, ImageReveal } from "@/components/Reveal";
import BlueprintExplorer from "@/components/BlueprintExplorer";
import { FAQSection, NewsletterSection } from "@/components";

export const metadata = {
  title: "Find a Property",
  description: "A proposed property brief journey for SavvySphere, pending confirmation of the company's search and introduction services."
};

export default function FindAPropertyPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="FIND A PROPERTY"
        title={<>Start with what<br /><em>matters to you.</em></>}
        description="A more considered starting point for describing the place, priorities and next step you have in mind."
        image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=88"
        imageAlt="Light-filled contemporary home interior"
        number="03"
      />

      <div id="page-content">
        <Reveal as="section" className="property-search-intro section-shell" amount={0.08} variant="left" duration={1.05}>
          <Reveal>
            <span className="eyebrow-text">A CLEARER STARTING POINT</span>
            <h2>Tell us what you are <em>looking for.</em></h2>
            <p>Use this proposed brief to organise your preferences and questions. It is not connected to a property database and does not search live listings.</p>
          </Reveal>
          <ImageReveal src="/images/family-home-story.webp" alt="A family enjoying an everyday moment together in a welcoming home" direction="right" />
        </Reveal>

        <Reveal as="section" className="property-blueprint-section section-shell" amount={0.08} variant="right" duration={1.05}>
          <Reveal className="property-blueprint-heading" variant="left">
            <span className="eyebrow-text">THE DETAILS THAT SHAPE THE SEARCH</span>
            <h2>Every brief has its own <em>blueprint.</em></h2>
            <p>Explore three considerations that can help bring a property brief into focus.</p>
          </Reveal>
          <BlueprintExplorer />
        </Reveal>

        <Reveal as="section" className="property-brief-section section-shell" amount={0.08} variant="left" duration={1.05}>
          <div className="property-brief-copy">
            <Reveal>
              <span className="eyebrow-text">YOUR PROPERTY BRIEF</span>
              <h2>A few details can bring <em>the picture into focus.</em></h2>
              <p>Consider the location, type of property, indicative budget and timing that feel relevant to your circumstances.</p>
              <p className="provisional-note">Important: whether SavvySphere offers property search, sourcing or introductions has not yet been confirmed. This page is included as a proposed journey in the website structure and must be approved or removed after client discovery.</p>
            </Reveal>
          </div>
          <Reveal variant="left">
            <PropertyBriefForm />
          </Reveal>
        </Reveal>

        <Reveal as="section" className="property-disclaimer section-shell" amount={0.08} variant="up" duration={1.05}>
          <p>No listings, availability, prices, property details or agency relationships are represented here. All imagery is illustrative.</p>
        </Reveal>
      </div>
      <FAQSection />  
     
      <PageCTA title={<>Have a question before you begin? <em>Talk to us.</em></>} description="Use the contact page to start a conversation with SavvySphere." />
      <NewsletterSection /> 
      <SiteFooter />
    </main>
  );
}