import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Privacy Notice",
  description: "Privacy notice page placeholder for SavvySphere."
};

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="INFORMATION"
        title={<>Privacy <em>notice.</em></>}
        description="How personal information is handled should be clear, transparent and easy to understand."
        image="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2000&q=85"
        imageAlt="Contemporary residential interior"
        number="07"
        compact
      />
      <Reveal as="section" id="page-content" className="legal-page section-shell" amount={0.08} variant="left" duration={1.05}>
        <span className="eyebrow-text">CLIENT LEGAL COPY REQUIRED</span>
        <h2>Privacy information awaiting <em>approval.</em></h2>
        <p>This page is a structural placeholder only. It is not a complete privacy notice and must not be published as a substitute for SavvySphere's approved privacy information.</p>
        <p>Before launch, the client must supply and approve accurate information about the data controller, contact details, personal information collected, purposes and lawful bases, retention periods, recipients, processors, international transfers (where applicable), individual rights, complaint routes and any relevant cookie or analytics practices.</p>
        <p>The final notice should be reviewed against the company's actual operations and applicable UK data protection requirements by an appropriately qualified adviser.</p>
      </Reveal>
      <SiteFooter />
    </main>
  );
}