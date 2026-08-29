# Daniyal portfolio design system

## Visual thesis

An editorial operating manual wrapped in liquid chrome. The site feels precise, authored, and tactile without using 3D. Typography explains the systems; controlled material moments provide identity.

## Hero focal asset

The user-provided liquid-metal video and Daniyal chrome wordmark. Both have local poster/image fallbacks. The wordmark is the semantic H1 (with an accessible name) and the independent AI-systems role sits above it; no duplicate plain-text name competes with the authored logo. A single dark proof plate then keeps the proposition and MEMORY → ACTION → EVIDENCE loop legible across the film.

## Type hierarchy

- Display: `clamp(4.4rem, 11.5vw, 11rem)`, 0.78–0.88 line-height, tight tracking.
- Section title: `clamp(3.2rem, 8vw, 8rem)`, 0.86–0.94 line-height.
- Lead: `clamp(1.45rem, 2.8vw, 2.8rem)`, 1.05–1.16 line-height.
- Body: `clamp(1rem, 1.25vw, 1.2rem)`, 1.45–1.6 line-height.
- Label: 10–12px uppercase, 0.12–0.18em tracking.

## Colour system

- Carbon: `#08090b`
- Paper: `#f0f0ea`
- Ink: `#090a0d`
- Silver: `#d7d8db`
- Signal blue: `#405ae4`
- Muted text: contextual 55–68% opacity

Signal blue is reserved for system state, routes, focus, and one emphasis per composition.

## Section sequence

1. Chrome hero
2. Light manifesto
3. Dark selected work opener
4. Three full-scale project chapters; HELIX expands into a four-beat recovery anatomy before the paper recovery → evidence handoff into QADAM
5. Light operating method
6. Dark experiment index
7. Light about/contact close

## Motion narrative

Hero assembles from readable identity into material signature, proposition, and action. Manifesto lines open through masks. Projects enter as full editorial plates with directional crop reveals. HELIX turns one interaction into a scroll-owned fault → checkpoint → owner → receipt sequence; mobile compresses the same complete evidence into one continuous static ledger without scrubbed blur. Between HELIX and QADAM, a paper proposition resolves word by word as recovery becomes evidence. The method is a single measured horizontal route. Contact resolves to stillness.

The hero pointer layer is intentionally additive: on fine pointers, the readable identity and proof plate drift by only a few pixels against the film, while the media carries the larger response. Touch, reduced motion, hidden tabs, and window blur reset to the authored center state.

## Motion stack

GSAP + ScrollTrigger for hero, masks, project plates, and scrubbed narrative beats. Lenis is the only smooth-scroll owner. HELIX's four beat timelines are registered through GSAP matchMedia only above the phone breakpoint; mobile uses a static, compact technical ledger. IntersectionObserver runs one-time supporting reveals. Reduced motion disables Lenis and scrubbed movement and renders final states immediately.

## Navigation motion contract

Desktop chrome remains fixed and immediately available. On mobile, the header and chapter disclosure yield together after deliberate downward travel and return together on upward intent. The top of the page, an open disclosure, navigation focus, and reduced motion always pin the chrome visible. Navigation owns `top`; GSAP scene choreography owns transforms, so their state cannot overwrite one another.

## Realtime decision

No Three.js, WebGL scene, procedural 3D, or shader canvas. The only continuous media is the locally stored hero video, paused offscreen, on hidden tabs, and under reduced motion.

## Asset provenance

- `background.mp4`, its art-directed `background-mobile.mp4` derivative, `hero-poster.webp`, `daniyal-wordmark.webp`, and `d-mark.webp` are project-local user assets.
- Hero media is art-directed by breakpoint: desktop keeps the 1280×720 landscape master, while phones receive a centered 404×720 portrait derivative (no audio, fast-start). `NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL` can replace the local phone source without changing the fallback policy.
- Project visuals are truthful interface/data compositions authored in semantic HTML and CSS.
- `public/evidence/qadam-fallback-demo.mp4` is a 48-second 1920×1080 release artifact imported from Daniyal's public QADAM repository; it is presented as real product footage, not portfolio-authored interface reconstruction.
- No copied Lusion imagery, icons, logos, or copy.

## Case-study evidence hierarchy

1. Real public product footage or a reproducible artifact.
2. Source-backed architecture and measured evaluation.
3. Clearly labelled local interaction proof when no public implementation exists.

The primary Work route may bypass the editorial opener and land at the first case study. Natural scrolling still retains the opener as a pacing beat. Embedded product footage uses the same editorial frame language as the rest of the system, but must never be recoloured or redrawn to impersonate the real product.

Selected Work also acts as a jury-speed evidence index. Three direct routes use compact instruments derived from the corresponding case study—operation receipt, recovery path, and reproducible evaluation—so proof type is visually comparable before the visitor commits to a long chapter. Desktop uses a three-plate band; mobile uses three independently composed instrument rows within one viewport.

Source-backed case studies use a second, stricter receipt layer beside the detailed proof. Each card names the evidence role, the exact public artifact, and a short human-readable boundary. Desktop presents four receipts as one subordinate technical band; mobile uses a 2×2 grid. The shared numbering, rules, arrow affordance, and focus inversion make verification legible without turning the page into repository documentation. `SOURCE_EVIDENCE_REGISTER.md` controls which claims qualify.
