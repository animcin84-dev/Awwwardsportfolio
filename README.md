# Daniyal Portfolio v4 — Evidence in Motion

A cinematic Next.js portfolio for Daniyal Bauyrzhan. The experience combines owner-supplied liquid-metal identity media, editorial project chapters, truthful implementation evidence, a bounded SilkWaves shader field, and scroll choreography. It takes pacing and interaction principles from premium studio work without copying another site’s assets, identity, layout, claims, or source.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production gates:

```bash
npm run verify
npm run typecheck
npm run build
npm run start
```

## Launch assets

Regenerate the authored Open Graph card, Twitter card, favicon, Apple icon, and manifest icons from the supplied liquid-metal assets:

```bash
npm run prepare:launch
```

Set `NEXT_PUBLIC_SITE_URL` to the final canonical origin before deployment. The site intentionally omits a fabricated production URL when this variable is absent.

## Hero media

The primary local film is `public/background.mp4`; phones select the art-directed 404×720 `public/background-mobile.mp4` (516,789 bytes, no audio) instead of downloading the 3,069,023-byte landscape master. `public/hero-bg.mp4` remains the error fallback and `public/hero-poster.webp` the complete static frame. CDN/object-store URLs can be configured through `.env`:

```env
NEXT_PUBLIC_HERO_VIDEO_URL=
NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL=
NEXT_PUBLIC_HERO_POSTER_URL=
NEXT_PUBLIC_SITE_URL=
```

Reduced-motion and reduced-data sessions receive the complete poster composition without downloading the motion source.

## Current experience architecture

- The supplied liquid-metal wordmark is the semantic H1 and resolves into the MEMORY → ACTION → EVIDENCE thesis over a stable poster-first hero film.
- `/work`, `/method`, `/about`, and `/contact` are independent top-level routes. The compact desktop rail and mobile disclosure navigate real pages, not homepage anchors.
- A 14-project rotating repository atlas replaces the old 3000svh WebGL universe. Every visual opens a local `/work/...` portrait; GitHub remains an external proof receipt.
- JARVIS, HELIX, and QADAM retain their deep, shareable, proof-specific case studies. Eleven additional public repositories receive honest editorial portrait routes generated from `app/work/catalog.ts`.
- The supplied interaction references were adapted into four native portfolio systems: rotating project atlas, infinite artwork canvas, operating-method text choreography, and a drag/keyboard/scroll project slider.
- The infinite canvas retains the supplied open-access artwork set while the centered MEMORY, ACTION, and EVIDENCE states transition from scroll.
- Capability copy advances automatically and remains manually selectable; Active Field supports scroll progression, pointer drag, buttons, keyboard arrows, Home, and End.
- One Lenis instance owns homepage smooth scrolling and is synchronized with GSAP ScrollTrigger. The removed universe no longer mounts Three.js, React Three Fiber, iframes, or a second render loop on the homepage.
- SilkWaves remains a bounded raw-WebGL layer inside the JARVIS case-study hero only.
- Hero video source attachment is deferred, metadata-only preload replaces aggressive auto preload, playback pauses offscreen, and poster mode is enforced for reduced motion, save-data, or sub-4g connection reports.
- Phones receive the 404×720, 516,789-byte hero derivative; desktop keeps the 1280×720 master.
- About is an operating console; Contact is a compact split invitation plus a deliberate epilogue instead of a full-screen form block.
- The private contact route validates requests, rate-limits abuse, delivers to a configured HTTPS webhook or persistent Node inbox, and fails closed on known ephemeral hosts.

## Private contact delivery

Local and persistent Node hosts default to `.contact-inbox/messages.ndjson`. For serverless production, configure a private HTTPS webhook:

```env
CONTACT_DELIVERY_MODE=webhook
CONTACT_WEBHOOK_URL=https://your-private-endpoint.example/contact
CONTACT_WEBHOOK_BEARER_TOKEN=
```

Known ephemeral serverless platforms return an honest unavailable state when no webhook is configured; the UI preserves the visitor’s text and offers retry instead of reporting a false success. `CONTACT_STORAGE_DIR` may point file mode at a mounted persistent volume.

## Main files

- `app/page.tsx` — semantic portfolio sequence and truthful case-study content
- `app/globals.css` — carbon/paper design system, responsive layouts, and interaction states
- `app/components/MotionSystem.tsx` — the single Lenis + GSAP + ScrollTrigger choreography owner
- `app/components/RotatingProjectAtlas.tsx` — 14-project scroll-rotation signature and local project destinations
- `app/components/InfiniteEvidenceCanvas.tsx` — native-scroll artwork field and MEMORY/ACTION/EVIDENCE states
- `app/components/MethodTextMotion.tsx` — three-act operating-method word choreography
- `app/components/Navigation.tsx` — route-first desktop rail and mobile page disclosure
- `app/components/HeroVideo.tsx` — progressive video/poster lifecycle
- `app/components/Preloader.tsx` — bounded critical-resource gate and immediate ready-content release
- `app/components/ContactForm.tsx` — private project-brief UI
- `app/components/ProjectInspection.tsx` — keyboard-operable JARVIS architecture and QADAM evidence inspection scenes
- `app/work/[slug]/page.tsx` — the shared, proof-specific case-study route system
- `app/work/projects.ts` — the maintained case-study narrative and evidence boundaries
- `app/components/QadamDemoVideo.tsx` — user-controlled, non-looping real product walkthrough
- `app/components/OperationTrace.tsx` — six-state, keyboard-operable model of an observable AI operation
- `app/components/AboutSystem.tsx` — reusable operator console
- `app/work/catalog.ts` — fourteen-repository discovery data and honest evidence boundaries
- `app/api/contact/route.ts` — validated private inbox endpoint
- `app/manifest.ts` — launch identity metadata
- `scripts/generate-launch-assets.mjs` — deterministic social and icon asset generation
- `scripts/verify-portfolio.mjs` — source-level portfolio contract checks
- `scripts/stitch-review-capture.mjs` — settled long-page review capture stitcher
- `SOURCE_EVIDENCE_REGISTER.md` — verified claim-to-primary-source ledger and maintenance rule
- `DESIGN_LOOP_STATUS.md` — independent brief/system/craft review history
- `DESIGN_DEBT_REGISTER.md` — resolved and open evidence-backed debt

## Honest launch limitations

- No client name, testimonial, adoption figure, or award claim is shown without verified owner evidence.
- Before public deployment, configure and verify the private webhook or a persistent Node volume.
- Final launch performance still requires real-device field measurements on representative iOS and Android hardware.

See `public/HERO_ASSET_PROVENANCE.md` and `THIRD_PARTY_NOTICES.md` for asset and reference provenance.
