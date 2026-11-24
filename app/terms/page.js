import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions page placeholder for SavvySphere."
};

export default function TermsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="INFORMATION"
        title={<>Terms &amp; <em>conditions.</em></>}
        description="Clear expectations are an important part of a trustworthy customer experience."
        image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85"
        imageAlt="Warm contemporary residential interior"
        number="08"
        compact
      />
      <Reveal as="section" id="page-content" className="legal-page section-shell" amount={0.08} variant="left" duration={1.05}>
        <span className="eyebrow-text">CLIENT LEGAL COPY REQUIRED</span>
        <h2>Terms awaiting <em>client approval.</em></h2>
        <p>This page is a structural placeholder only. It does not create contractual terms and must not be published as a substitute for SavvySphere&apos;s approved terms and conditions.</p>
        <p>The final copy should accurately describe the company&apos;s legal identity, services, scope and limitations, customer responsibilities, fees (where applicable), cancellation and complaints processes, intellectual property, liability provisions, governing law and contact details.</p>
        <p>All terms must reflect the actual business model and should be reviewed by an appropriately qualified legal adviser before publication.</p>
      </Reveal>
      <SiteFooter />
    </main>
  );
}