# SavvySphere motion system

This implementation treats motion as part of the user journey, not as a layer of repeated fade-ins.

## Shared reusable primitives

- `Reveal` — reusable entrance presets: up, left, right, fade, mask, maskLeft, blur, scale and rotate.
- `ImageReveal` — reusable image-mask reveal with direction and image scale choreography.
- `WordReveal` — staggered word entrance for short editorial phrases.
- `CursorGlow` — restrained cursor-responsive light field, disabled on small screens and for reduced-motion users.
- `PageHero` — shared parallax image, title reveal, cursor light and light sweep for interior pages.
- `RouteTransition` — short opacity-only page transition; avoids transforms on the application shell so fixed navigation and sticky scroll scenes continue to work.
- `PageCTA` — reusable closing moment with slow orbital background detail.

## Signature experience by route

| Route | Signature interaction |
|---|---|
| Home | Scroll-controlled architectural elevation. Windows illuminate in stages as the visitor moves through the story; scrolling upward reverses the sequence. |
| About | Scroll-responsive orbital principles with selectable nodes and changing explanatory content. |
| Services | Interactive service selector, animated image transitions and subtle pointer-based 3D tilt. |
| Find a Property | Animated architectural blueprint with selectable hotspots for location, space and timing, followed by a three-step animated property-brief wizard. |
| How It Works | Long-form sticky scroll sequence. Four process chapters, images and progress indicators change with scroll position. |
| Insights | Staggered editorial cards, hover lift/image movement and article reading progress. |
| Contact | Animated orbit/signal motif alongside the enquiry experience. |
| Privacy / Terms | Shared cinematic page hero, light sweep, parallax and route transition, while keeping legal content readable. |

## Performance and accessibility

- Uses the existing Framer Motion dependency; no unnecessary Three.js/WebGL payload is introduced.
- Scroll scenes use Framer Motion `useScroll` and update chapter state only when a threshold changes.
- Motion is disabled or reduced when `prefers-reduced-motion` is active.
- Cursor-follow effects are hidden on small screens and are decorative only.
- Interactive hotspots and selectors are real buttons with labels and pressed states.
- The visual effects use SVG and CSS rather than large frame sequences or heavy video backgrounds.

## HorizonX translation

The work takes inspiration from the motion-led storytelling, perspective shifts, interactive component thinking and scroll-based architectural walkthroughs represented in HorizonX's Altura Coastal Residences and Alder & Stone examples. It does not copy their layouts or assets. SavvySphere retains its own aubergine/lavender palette, property-consultancy content and customer-focused tone.

Reference examples:
- https://horizonx.so/explore/altura-coastal-residences
- https://horizonx.so/explore/alder-stone
