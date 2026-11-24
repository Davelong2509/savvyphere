# SavvySphere — Multi-page Property Consultancy Website

A responsive Next.js App Router website with distinct routes, shared navigation and footer, editorial content pages, and restrained motion design.

## Routes

- `/` — Home
- `/about` — About SavvySphere
- `/services` — Our Services
- `/find-a-property` — Proposed property brief journey (no live search)
- `/how-it-works` — Four-stage approach
- `/insights` — Editorial index
- `/insights/[slug]` — Individual insight articles
- `/contact` — Contact page and enquiry form preview
- `/privacy` — Legal copy placeholder
- `/terms` — Legal copy placeholder

## Run locally

Requirements: Node.js 20 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm start
```

## Technology

- Next.js App Router
- React
- JavaScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Content and functionality notes

- Service categories are conceptual pending client confirmation.
- The Find a Property page is a proposed enquiry journey, not a live listing search.
- No fictional listings, client testimonials, credentials, contact details or service claims have been added.
- Insight pages contain editorial drafts awaiting approval.
- Contact and property brief forms are front-end previews only. They do not transmit or store data.
- Privacy and Terms pages are structural placeholders and require client-approved legal copy.
- Architectural imagery is paired with two locally stored, AI-generated illustrative family lifestyle photographs in `public/images/family-home-story.webp` and `public/images/family-next-chapter.webp`. They are visual storytelling assets, not real SavvySphere clients, testimonials or property listings. Replace them with client-approved photography if required before launch.
- The sitemap and page architecture are based on the previously proposed SavvySphere sitemap; the final business model and services still require client confirmation.

## Brand palette

- Deep Aubergine: `#432449`
- Muted Purple: `#745681`
- Soft Lavender: `#EAE2EE`
- Warm Ivory: `#F8F7F4`
- Deep Charcoal: `#26242A`


## Motion system

The project includes reusable motion primitives and page-specific interactions: scroll-controlled architectural lighting on Home, an orbital principles scene on About, a pointer-responsive service explorer, interactive property blueprint and three-step brief wizard, sticky scroll-driven process story, animated editorial cards and reading progress, and an animated contact signal. Interior page heroes share parallax, light-sweep and cursor-light behaviour. Motion respects reduced-motion preferences.

See `MOTION-SYSTEM.md` for the component map, interaction details and performance/accessibility notes.


## Storytelling and reusable motion updates

- `components/PeopleFirstStory.jsx` is a reusable editorial section for people-first property storytelling.
- The homepage introduces a family-and-home story between the architectural lighting experience and services.
- `WhoWeHelpSection` includes a family-led editorial strip before the audience cards.
- About, Find a Property, the Service Explorer and the four-stage process now include family lifestyle imagery to balance the architectural photography.
- `components/Reveal.js` now supports reusable `Reveal` wrappers with `as="section"` and directional `up`, `left`, `right`, `fade`, `mask`, `blur`, `scale` and `rotate` variants.
- `components/SectionReveal.jsx` delegates to the shared Reveal primitive so components use one consistent scroll-triggered animation system.
- Major sections across the site reveal on scroll; page heroes animate on load, while the process story, FAQ, testimonials, footer and interactive sections have additional entrance motion.
- All reveal effects respect the user's reduced-motion preference. Scroll reveals run once by default and use a low visibility threshold so tall sections are not left hidden.
