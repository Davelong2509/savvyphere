import EditorialCard from "@/components/EditorialCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { insights } from "@/content/insights";
import { FAQSection, NewsletterSection } from "@/components";

export const metadata = {
  title: "Insights",
  description: "Ideas and perspectives on property decisions, housing and the next step."
};

export default function InsightsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="IDEAS & INSIGHTS"
        title={<>Perspectives worth<br /><em>sharing.</em></>}
        description="Thoughtful ideas to help you consider housing, property and the decisions ahead."
        image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=88"
        imageAlt="Refined contemporary interior"
        number="05"
      />

      <div id="page-content">
        <Reveal as="section" className="insights-intro section-shell" amount={0.08} variant="left" duration={1.05}>
          <Reveal>
            <span className="eyebrow-text">THE JOURNAL</span>
            <h2>Useful context. <em>Fresh perspective.</em></h2>
            <p>Explore draft editorial themes created for the SavvySphere website. These articles are awaiting client review and approval before publication.</p>
          </Reveal>
        </Reveal>

        <Reveal as="section" className="insights-page-grid section-shell" amount={0.08} variant="right" duration={1.05}>
          {insights.map((article, index) => (
            <EditorialCard article={article} index={index} key={article.slug} />
          ))}
        </Reveal>
      </div>

      <PageCTA title={<>Have a question of your own? <em>Let&apos;s talk.</em></>} description="We would be glad to hear what you are thinking about." />
      <NewsletterSection />
      <FAQSection />
      
       
      <SiteFooter />
    </main>
  );
}