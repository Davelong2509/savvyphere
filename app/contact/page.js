import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import ContactSignal from "@/components/ContactSignal";

export const metadata = {
  title: "Contact SavvySphere",
  description: "Start a conversation with SavvySphere about your property questions."
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="CONTACT SAVVYSPHERE"
        title={<>Let's start with<br /><em>a conversation.</em></>}
        description="Tell us a little about what you are considering and the kind of guidance you are looking for."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88"
        imageAlt="Contemporary home architecture"
        number="06"
      />

      <div id="page-content">
        <Reveal as="section" className="contact-page-layout section-shell" amount={0.08} variant="right" duration={1.05}>
          <Reveal className="contact-page-copy">
            <span className="eyebrow-text">WE'D LIKE TO HEAR FROM YOU</span>
            <h2>Every good conversation begins with <em>a question.</em></h2>
            <p>Whether you are at the beginning of a property journey or considering your next step, use the form to outline what is on your mind.</p>
            <ContactSignal />
            <div className="contact-detail-placeholder">
              <span>EMAIL</span><p>Business email to be supplied by the client.</p>
              <span>TELEPHONE</span><p>Business telephone number to be supplied by the client.</p>
              <span>LOCATION & COVERAGE</span><p>UK service-area details to be confirmed.</p>
            </div>
          </Reveal>
          <Reveal variant="left">
            <ContactForm />
          </Reveal>
        </Reveal>
      </div>

      <SiteFooter />
    </main>
  );
}