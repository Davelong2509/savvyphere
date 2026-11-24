import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageCTA from "@/components/PageCTA";
import ArticleReadingProgress from "@/components/ArticleReadingProgress";
import { ImageReveal, Reveal } from "@/components/Reveal";
import { insights } from "@/content/insights";

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.summary } : {};
}

export default async function InsightArticlePage({ params }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <main>
      <SiteHeader />
      <ArticleReadingProgress />
      <article className="article-page">
        <div className="article-topline">
          <Link href="/insights"><ArrowLeft size={16} /> BACK TO INSIGHTS</Link>
          <span>{article.status}</span>
        </div>
        <header className="article-header">
          <Reveal>
            <span className="eyebrow-text">{article.category}</span>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
          </Reveal>
        </header>
        <ImageReveal className="article-cover" src={article.image} alt={article.imageAlt} priority direction="left" sizes="100vw" />
        <div className="article-body">
          <p className="article-intro">{article.intro}</p>
          {article.sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * .035}>
              <section>
                <span className="article-section-number">0{index + 1}</span>
                <div>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              </section>
            </Reveal>
          ))}
          <p className="article-editorial-note">Editorial draft for SavvySphere review. This content is general information and is not legal, financial or mortgage advice.</p>
          <Link className="text-link" href="/insights">Explore more perspectives <ArrowUpRight size={17} /></Link>
        </div>
      </article>
      <PageCTA title={<>Continue the conversation. <em>We're listening.</em></>} description="Tell us what you are considering and what you would like to understand." />
      <SiteFooter />
    </main>
  );
}