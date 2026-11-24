import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import { ArrowUpRight } from "lucide-react";
import ServiceExplorer from "@/components/ServiceExplorer";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Our Services",
  description: "Explore SavvySphere's proposed property consultancy service areas."
};

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="OUR SERVICES"
        title={<>The right guidance for<br /><em>what comes next.</em></>}
        description="Explore the proposed areas of support and the thinking behind a more considered property journey."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88"
        imageAlt="Contemporary residential architecture"
        number="02"
      />

      <div id="page-content">
        <Reveal as="section" className="services-intro section-shell" amount={0.08} variant="left" duration={1.05}>
          <Reveal>
            <span className="eyebrow-text">A STARTING POINT</span>
            <h2>Support shaped around <em>your priorities.</em></h2>
            <p>The service areas below are creative concepts for the website, not a confirmed list of SavvySphere offerings. Their names, scope and eligibility must be agreed with the client before publication.</p>
          </Reveal>
        </Reveal>

        <Reveal as="section" className="services-explorer-section section-shell" amount={0.08} variant="right" duration={1.05}>
          <ServiceExplorer />
        </Reveal>

        <Reveal as="section" className="service-principles section-shell" amount={0.08} variant="left" duration={1.05}>
          {[
            ["01", "Understand the brief", "Begin with the circumstances, questions and priorities behind the property decision."],
            ["02", "Explore the options", "Create space to understand what may be possible and what information is still needed."],
            ["03", "Agree the next step", "Move forward with a clearer view of the questions to resolve and the actions to take."]
          ].map(([number, title, text]) => (
            <Reveal className="service-principle" key={number} delay={Number(number) * 0.06}>
              <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={19} />
            </Reveal>
          ))}
        </Reveal>

        <Reveal as="section" className="service-confirmation section-shell" amount={0.08} variant="up" duration={1.05}>
          <p><strong>Client confirmation required:</strong> final service names, deliverables, fees, geographical coverage and any regulated or specialist activities must be confirmed before this page is treated as live commercial information.</p>
        </Reveal>
      </div>

      <PageCTA title={<>Not sure where to begin? <em>Let&apos;s talk.</em></>} description="A first conversation can help establish what kind of support may be appropriate." />
      <SiteFooter />
    </main>
  );
}