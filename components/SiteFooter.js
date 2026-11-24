
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const explore = [
  ["About SavvySphere", "/about"],
  ["Our services", "/services"],
  ["Find a property", "/find-a-property"],
  ["How it works", "/how-it-works"],
  ["Insights", "/insights"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-main">

        {/* BRAND */}
        <Reveal className="footer-brand" variant="left" amount={0.08}>
          <Link
            href="/"
            className="footer-logo-link"
            aria-label="SavvySphere — Home"
          >
            <Image
              src="/images/savvysphere-logo-color.png"
              alt="SavvySphere"
              width={1260}
              height={215}
              className="footer-logo-image"
              sizes="(max-width: 600px) 190px, 235px"
            />
          </Link>

          <p>
            A fresh perspective on property.
            <br />
            Thoughtful guidance for what comes next.
          </p>

          <span className="footer-brand-caption">
            PROPERTY CONSULTANCY
          </span>
        </Reveal>

        {/* EXPLORE */}
        <Reveal className="footer-column" delay={0.08} amount={0.08}>
          <span>EXPLORE</span>

          {explore.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </Reveal>

        {/* CONTACT */}
        <Reveal className="footer-column" delay={0.16} amount={0.08}>
          <span>CONNECT</span>

          <Link href="/contact" className="footer-contact-link">
            Contact SavvySphere
            <ArrowUpRight size={14} />
          </Link>

          <p>Business contact details to be confirmed.</p>
          <p>Social links to be supplied.</p>
        </Reveal>

        {/* INFORMATION */}
        <Reveal className="footer-column footer-legal" delay={0.24} amount={0.08}>
          <span>INFORMATION</span>

          <Link href="/privacy">
            Privacy notice
          </Link>

          <Link href="/terms">
            Terms &amp; conditions
          </Link>

          <p>
            Legal copy requires client approval
            before publication.
          </p>
        </Reveal>
      </div>

      {/* FOOTER BOTTOM */}
      <Reveal className="footer-bottom" delay={0.12} amount={0.08}>
        <span>
          © {new Date().getFullYear()} SAVVYSPHERE.
          ALL RIGHTS RESERVED.
        </span>

        <span>
          PROPERTY GUIDANCE, THOUGHTFULLY CONSIDERED.
        </span>

        <Link href="/#top" className="footer-back-top">
          BACK TO TOP
          <ArrowUp size={14} />
        </Link>
      </Reveal>
    </footer>
  );
}
