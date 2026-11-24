# SavvySphere: Scroll motion repair

This repair is based on the last delivered **savvysphere-multipage-family-story-motion.zip**.

## Why the previous version did not give consistent slide-ins
- `Reveal` used nested `whileInView` states. Some effects were very subtle (or were only applied to parts of a section).
- Initial entrance animations were not explicitly coordinated with sections already visible on page load.
- Section directions were largely upward fades rather than clear horizontal entrances.

## What changed
- `components/Reveal.js`: reusable IntersectionObserver-based `Reveal`, `ScrollSection`, `ImageReveal` and `WordReveal`.
- A mount-time viewport check plays animations for sections already visible after refresh or navigation, without waiting for the first scroll.
- Below-fold sections enter from alternating left/right directions and settle into place.
- One-shot reveals stay visible when users scroll backwards.
- Image masks reveal on the same observer system, with a controlled scale/lighting sweep.
- `data-motion-scene` and `data-scroll-reveal` attributes make the trigger state inspectable in browser Developer Tools.
- Reduced-motion is respected.
- The people-first photography, interactive illustrations and multi-page content have been retained.

## Browser test
1. `npm install` then `npm run dev`.
2. Open `/` with Developer Tools → Elements.
3. On refresh, check first section: `data-scroll-reveal="waiting"` changes to `visible`.
4. Scroll slowly; each `data-motion-scene="true"` section should change to `visible` as it enters the screen.
5. Repeat for `/about`, `/services`, `/find-a-property`, `/how-it-works`, `/insights`, `/contact`.
6. Test with Windows/OS reduced-motion **off** when previewing motion; when enabled, content intentionally appears without motion.

No new dependency required; uses the existing Framer Motion version.
