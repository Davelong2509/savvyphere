"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function EditorialCard({ article, index }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className="insight-page-card editorial-card"
      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .16 }}
      transition={{ duration: reduceMotion ? 0 : .75, delay: reduceMotion ? 0 : index * .08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -9 }}
    >
      <Link href={`/insights/${article.slug}`} className="insight-page-image editorial-card-image">
        <motion.div className="editorial-card-image-inner" whileHover={reduceMotion ? undefined : { scale: 1.055 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
          <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
        </motion.div>
        <span>0{index + 1}</span>
        <span className="editorial-card-open"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="insight-meta"><span>{article.category}</span><span>{article.status}</span></div>
      <h2><Link href={`/insights/${article.slug}`}>{article.title}</Link></h2>
      <p>{article.summary}</p>
      <Link className="text-link" href={`/insights/${article.slug}`}>Read draft article <ArrowUpRight size={17} /></Link>
    </motion.article>
  );
}
