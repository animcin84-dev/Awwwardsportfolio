# Phase 0 Audit — Evidence in Motion

Date: 2026-08-29  
Scope: repository, documentation, production build, rendered desktop/mobile experience, current public evidence, and independent critique.  
Decision gate: **Phase 0 only. No Phase 1 design implementation has been applied.**

## Executive verdict

The portfolio contains a strong, credible editorial core: the liquid-metal arrival, a clear `MEMORY → ACTION → EVIDENCE` proposition, an excellent one-viewport Selected Systems decision point, distinct project evidence, direct case-study routes, and an intentional contact ending.

The recent Project Universe iteration is the dominant regression. It replaces project-led evidence with a 25–30 viewport spatial camera journey, makes decorative geometry more important than real work, introduces a large homepage bundle and a persistent renderer, removes visitor control from embedded case studies, restores a forced loader delay, and directly contradicts the governing documentation.

The correct Phase 1 decision is to **retire the persistent Universe and restore a direct project-first homepage flow**. Do not attempt to rescue the Universe with better geometry, shaders, camera paths, or particles.

The strongest future signature remains a content-aware JARVIS entry in which `CONTEXT → MEMORY → TOOLS → ACTION → RECEIPT` becomes the actual case hero. That work belongs to Phases 3–4, after the architecture is clean and stable.

## Recovery baseline

- The workspace is **not recognized as a Git repository**. No commit hash, branch, status, or reliable diff is available.
- No destructive Git operation was attempted.
- Treat every existing source, document, and asset as user-owned until a proper repository baseline is restored.
- The locked dependency set was installed to permit production validation. This created local `node_modules` and build output only; no source implementation was intentionally changed in Phase 0.
- Production build: **PASS**.
- TypeScript: **PASS** after Next generated its route types.
- Source verifier: **137/137 PASS**, but the verifier is materially stale and cannot be treated as a release gate.
- Browser QA performed at 1440×900 and 390×844, including homepage, Selected Work, Universe, Method, direct JARVIS, JARVIS entry/Back, and reduced motion.
- Desktop/mobile sampled horizontal overflow: **0px**.
- Live homepage console: **not clean**.

## Current score

These are strict internal quality estimates, not award predictions.

| Category | Score | Current reality |
|---|---:|---|
| Design | 7.2 | Strong hero, typography, palette, project instruments, and case-study foundations; the Universe breaks the editorial hierarchy. |
| Usability | 5.8 | Fast path is excellent; primary CTA leads into a 25–30 viewport controlled journey with hidden navigation. |
| Creativity | 6.5 | Evidence in Motion is ownable; stars, sparkles, orbital geometry, torus forms, and camera travel are generic AI-portfolio language. |
| Content | 7.3 | The work is specific and mostly honest; evidence strength is uneven and no shared explicit proof/limitation receipt exists yet. |
| Animations / transitions | 6.1 | Technically ambitious, but the dominant motion communicates travel and spectacle rather than reveal, route, resolve, or receipt. |
| Accessibility | 6.4 | Strong form, tab, focus, reduced-motion, and forced-color foundations; forced busy state, tiny labels, iframe control, and no-JS busy state remain risks. |
| WPO / performance | 4.5 | Homepage is 449KB first-load JS, mounts R3F/Three, eagerly loads JARVIS in an iframe, and forces loader dwell. |
| Responsive design | 6.7 | Existing editorial mobile compositions are strong; the mobile Universe remains 25 viewports with 4–5px functional/status text. |
| Semantics / SEO | 7.4 | Strong headings, direct links, source receipts, schema, and case routes; skip target, canonical configuration, sitemap/robots, and production verification are incomplete. |
| Markup / metadata | 6.7 | Good root metadata and assets; localhost canonical, generic case social metadata, and stale verifier contracts remain. |

Weighted Awwwards-style content score using the current 40/30/20/10 Design/Usability/Creativity/Content weighting: **6.65/10**. A current Awwwards result page exposes that weighting and a separate Developer Award technical rubric: [Awwwards scoring example](https://www.awwwards.com/sites/self-aware).

## Rendered reality

### Desktop 1440×900

- Homepage height: **40,389px** (~44.9 viewports).
- Project Universe height: **27,000px** (30 viewports).
- Universe share of the homepage: approximately **67%** of the total scroll length.
- Canvas count after settling: **1** on the parent homepage.
- Iframe elements in DOM: **3**; JARVIS is eagerly sourced before entering the Universe.
- Selected Systems fits in one viewport and presents all three projects and proof types clearly.
- The Universe render gives visual priority to giant abstract geometry, orbital paths, stars, sparkles, and a courier object. Project UI becomes background texture.
- Method regains the stronger paper/editorial visual system immediately after the Universe.

### Mobile 390×844

- Homepage height: **33,077px** (~39.2 viewports).
- Project Universe height: **21,100px** (25 viewports).
- Mobile Universe HUD: **4px**.
- Landmark and open-case labels: **5px**.
- The Selected Systems route remains clear, differentiated, touchable, and complete inside the 844px scene.
- The Universe hides normal navigation while active and makes the outer page own the reading speed of the embedded case.
- Reduced motion correctly removes the canvas and exposes a static project list, but that good fallback is conceptually stronger than the primary experience.

### Loader and navigation

- A cached mobile reload took approximately **2.7s end-to-end** before the preloader node detached in the sampled browser run.
- Source enforces `MIN_VISIBLE_MS = 1500` and `REPEAT_WAIT_MS = 1800`, plus a 360ms exit.
- Work → JARVIS reached the case in ~968ms with a generic signal-gate overlay.
- Browser Back restored near the originating Work position in the sampled run, but Universe-specific progress is written to session storage and never read.
- The transition screenshot is route theatre: it repeats a generic JARVIS signal card rather than morphing the actual project interface into the case hero.

### Production output

- Homepage route JS: **334KB**.
- Homepage first-load JS: **449KB**.
- Case-study first-load JS: **118KB**.
- Documentation still cites approximately **67.5KB route / 170KB first-load JS**, so the written performance record is stale.

## Verified repository contradictions

| Topic | Governing documentation | Shipped code / rendered behavior | Verdict |
|---|---|---|---|
| 3D architecture | `BRIEF.md`, `WORLD_BIBLE.md`, and `EXPERIENCE_SPINE.md` forbid Three.js/spatial camera worlds. | `ScrollEvidenceTunnel`, `UniverseScene`, R3F, Drei, Three.js, and scroll-rig ship on the homepage. | Direct contradiction. |
| Project flow | `USER_FLOW.md` and the governing idea require project-first discovery. | Hero and skip link bypass Selected Work and target `#project-universe`. | Primary-path regression. |
| Loader | Design debt, README, and Gates say ready content is not held. | `MIN_VISIBLE_MS=1500`, `REPEAT_WAIT_MS=1800`, and `Promise.all([ready, minimumVisible])` enforce the hold. | Regression and stale docs. |
| Retired prototype | Gates claims the docs and shipped site exclude the retired 3D prototype. | README and Third-Party Notices were later changed to celebrate the Universe. | Documentation split-brain. |
| Project content | Verifier reports three flagship homepage articles and source receipts. | Those articles are inside `{false && <>…</>}` and do not render. | False-positive source test. |
| Performance | Progress notes cite ~170KB first-load JS and no homepage canvas/iframes. | Current production output is 449KB first-load JS with a canvas and iframe portal system. | Stale evidence. |
| Scroll restoration | Universe writes `daniyal:universe-progress`. | No production code reads the value. | Incomplete feature. |
| Content truth | Universe says “Three real systems.” | HELIX is explicitly a local interaction prototype, not a public production system. | Proof boundary weakened. |

## Top problems

### P0 / P1 — Signature experience contradicts the concept

`app/page.tsx` mounts `ScrollEvidenceTunnel` at line 123 and disables the richer JARVIS/HELIX/QADAM chapters behind `{false &&}` at line 125. The most memorable moment is therefore a spatial camera journey, not a project operating and returning evidence.

### P1 — Universe fails the originality test

`UniverseScene.tsx` imports and uses `Float`, `Stars`, `Sparkles`, multiple abstract solids, Catmull–Rom camera routes, and continuous `useFrame` animation. These are well-executed familiar tropes, but they are not specific to Daniyal, operational AI, or evidence.

### P1 — Scroll fatigue and loss of visitor control

The Universe is 3000svh desktop and 2500svh mobile. Its own UI labels the experience `SLOW CINEMATIC ROUTE`. It disables pointer interaction on full-page case iframes, removes them from tab order, and maps outer scroll to inner document scroll. Evidence is shown but cannot be inspected at the visitor's pace.

### P1 — Homepage performance regression

The homepage bundle more than doubled relative to the written baseline. The parent mounts a persistent R3F/Three scene; the eager hidden JARVIS iframe mounts its own case route and bounded SilkWaves canvas. `ScrollEvidenceTunnel` also owns a long-running `requestAnimationFrame` coordinator.

### P1 — Forced loader regression

The opening deliberately blocks already-ready content. The main element starts server-rendered with `aria-busy="true"`; the noscript rule hides the visual overlay but does not clear that busy state.

### P1 — Verifier protects the wrong architecture

The 137 checks explicitly require Three/R3F, `3000svh`, the spatial Universe, and the 1500/1800ms loader holds. They also count dead source as shipped functionality. Passing the verifier currently proves conformance to the regression.

### P1 — Console is not clean

Observed homepage warnings/errors include:

- repeated `THREE.Clock` deprecation warnings;
- GSAP missing-target warnings for the dormant recovery handoff under reduced motion;
- `MutationObserver.observe` receiving a non-Node value during homepage lifecycle transitions.

Direct JARVIS showed no warning/error in the sampled run.

### P2 — Evidence strength is visually flattened

QADAM has reproducible evaluation metrics and published limitations. JARVIS has public architecture/source evidence but no comparable benchmark. HELIX is an interaction proof. Current shared “metrics” styling can make structural counts (`03/03`, `04/04`, `02`, `01`) look equivalent to measured outcomes. The proof type must remain visually explicit.

### P2 — Case studies share too much opening grammar

Content differs, but the first two to three viewports reuse the same hero structure and editorial sequence. Later phases should keep the shared evidence system while making each opening project-specific: operation/receipts, failure/recovery, and claim/source/evaluation.

### P2 — Production launch configuration remains open

- `NEXT_PUBLIC_SITE_URL` is unset in the audited build, producing localhost canonical/social URLs.
- No sitemap or robots route exists.
- Contact delivery is robust and honest in code, but no production webhook/durable store is configured or verified.
- Case-specific social imagery is not authored.
- Real-device Core Web Vitals remain unmeasured.

## What to keep

- Liquid-metal hero film, poster, chrome wordmark, and concise identity.
- `MEMORY → ACTION → EVIDENCE` proposition and restrained cobalt signal role.
- Carbon/paper/silver/cobalt visual system.
- One-viewport Selected Systems composition and direct case links.
- `material-signal.webp` and the short surface-opening interstitial.
- Static `/work/jarvis`, `/work/helix`, and `/work/qadam` routes.
- `app/work/projects.ts` as the central content model.
- JARVIS architecture/source inspector and source receipts.
- HELIX recovery interaction and explicit local-prototype boundary.
- QADAM product footage, reproducible evaluation, source receipts, and visible latency limitation.
- Method, Active Field, human operating belief, and deliberate contact ending.
- Native links/buttons, keyboard tabs/accordions, focus states, reduced motion, forced-colors support, and accessible form feedback.
- Contact validation and fail-closed delivery adapter.
- Route source bounding-rectangle logic, project metadata, and native Back restoration behavior as inputs to the later JARVIS transition.
- Bounded `SilkWaves` only if its JARVIS-specific value survives later visual QA; it does not justify the homepage Three/R3F stack.

## What to remove or retire

- Mounted `ScrollEvidenceTunnel` homepage experience.
- `UniverseScene`, stars, sparkles, floating geometry, orbit systems, generic camera flight, and courier.
- 3000/2500svh Universe corridor.
- Noninteractive full-page iframe portals and programmatic case scrolling.
- Universe atlas, masks, cinema mode, write-only progress state, and implementation-jargon chrome.
- Universe hero/skip/navigation copy.
- Global route gate in its current generic form; preserve only isolated source-rect/state logic for Phase 3.
- Forced loader minimum and repeat waits.
- Verifier assertions requiring the Universe or loader hold.
- `{false &&}` production archive after useful content is safely migrated or confirmed on standalone cases.
- R3F/Three/scroll-rig dependencies after the final import audit.
- About orbit treatment; retain `THINK / BUILD / PROVE` as human editorial content.
- Stale Universe CSS, duplicate prototype CSS, and third-party notices after the architecture is frozen.

## Public proof audit

- JARVIS is a public repository with documented architecture, memory, permission, event, tool, and database structures. It currently shows no meaningful external adoption signal; use reproducibility and exact source links, not popularity theatre: [JARVIS source](https://github.com/animcin84-dev/jarvis-fable-5).
- QADAM is a public repository with a reproducible test/evaluation workflow, 120 backend tests, 22 frontend tests, 20 labelled queries, 0.9231 micro-recall, 1.0 high-priority citation coverage, and an explicit boundary excluding HTTP/queue/PostgreSQL/network latency. It also publishes material limitations: [QADAM source and methodology](https://github.com/animcin84-dev/qadam-ai-techvision-2026).
- HELIX has no equivalent public production evidence in the audited materials. Keep it explicitly positioned as a local interaction proof.
- No client, testimonial, customer, production-usage, award, or adoption claim should be added without new verified owner evidence.

## Current reference principles

Research supports the proposed direction rather than a new visual style:

- Heavy transitions become a usability cost when users repeatedly move between work and case studies; the best systems reduce friction and preserve continuity: [Lorenzo Dossi on frictionless case-study transitions](https://tympanus.net/codrops/2025/01/10/developer-spotlight-lorenzo-dossi/).
- Strong portfolio motion uses a repeatable motif tied to the creator's identity, not an arbitrary collection of effects: [Stefan Vitasović portfolio case study](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/).
- Smooth, memorable transitions can be built from position, opacity, and masks when those primitives serve the content: [Gianluca Gradogna portfolio case study](https://tympanus.net/codrops/2025/01/30/case-study-gianluca-gradogna-portfolio-25/).
- Current high-quality practice increasingly emphasizes clarity, performance, and intentional tool choice rather than treating visual complexity as the objective: [Lesse Studio case study](https://tympanus.net/codrops/2026/06/05/the-making-of-the-new-lesse-studio-website-clarity-performance-and-intentionality/).

The implication is clear: the signature should be the project-specific JARVIS operating transition, not a permanent generic world.

## Exact Phase 1 plan

### 1. Establish a manual recovery point

- Record source inventory, build output, bundle output, and Phase 0 measurements in this audit.
- Do not assume Git rollback exists.
- Avoid broad rewrites; make small, reviewable architecture edits.

### 2. Restore the direct project-first homepage spine

- Remove the `ScrollEvidenceTunnel` import and mount from `app/page.tsx`.
- Point the skip link and hero CTA to `#work` and rename the action to `View selected systems` or equivalent.
- Route Selected Systems directly into a short material handoff and then Method.
- Preserve all substantive project storytelling through the existing standalone case routes; do not re-create case pages inside iframes.
- Remove Universe from navigation and current-state grouping.
- Reconcile chapter numbering to Arrival → Thesis → Selected Systems → Method → Field → About → Contact.

### 3. Remove forced opening delay

- Delete arbitrary minimum/repeat waits.
- Release immediately when critical font/identity/poster resources are ready.
- Keep a real bounded safety timeout, atomic screen-reader lifecycle, and a short visual exit.
- Ensure `aria-busy`, overflow, and pointer state are always restored on success, cancellation, error, route change, and no-JS operation.

### 4. Suspend generic route theatre

- Unmount the current global signal-gate transition until the project-specific system exists.
- Preserve the useful source rectangle, route destination, reduced-motion, and scroll-origin logic in an isolated module for Phase 3.
- Let project links use predictable Next navigation during Phase 1.

### 5. Remove Universe runtime and dependencies

- Remove Universe-specific CSS only; do not broadly rewrite `globals.css` yet.
- Remove scroll-rig global CSS/imports.
- Remove `three`, `@react-three/fiber`, `@react-three/drei`, `@14islands/r3f-scroll-rig`, and `@types/three` after confirming no remaining production import.
- Remove obsolete Universe-only preview assets when no reference remains.
- Keep bounded JARVIS SilkWaves isolated and lazy only if it remains justified.

### 6. Rewrite the verifier around shipped behavior

- Fail if Universe markup, dependencies, CSS, or forced loader waits return.
- Fail if production content is hidden behind `{false &&}`.
- Verify the real homepage order, direct case routes, evidence boundaries, reduced-motion behavior, and no-JS main state.
- Add a homepage first-load JS budget and fail on material regression.
- Stop counting raw dead source as rendered functionality.

### 7. Reconcile documentation

- Make `BRIEF.md`, `WORLD_BIBLE.md`, `EXPERIENCE_SPINE.md`, `README.md`, `GATES.md`, `USER_FLOW.md`, `DESIGN_DEBT_REGISTER.md`, `DESIGN_LOOP_PROGRESS.md`, `THIRD_PARTY_NOTICES.md`, and `SOURCE_EVIDENCE_REGISTER.md` describe the same shipped architecture.
- Remove stale performance figures and reopened-but-marked-resolved loader claims.
- Record remaining launch blockers without inventing closure.

### 8. Phase 1 quality gate

- Typecheck.
- Rewritten verifier.
- Warning-free production build.
- Homepage bundle comparison.
- Browser QA at 1920×1080, 1440×900, 1280×720, 390×844, 393×852, small Android, and narrow landscape.
- Direct URLs, refresh, Back, Forward, rapid click, resize, and orientation behavior.
- Keyboard, focus, reduced motion, forced colors, no-WebGL, and JavaScript-disabled state.
- 200% zoom, text enlargement, overflow, and console checks.
- Confirm no major regression before beginning Phase 2.

## Phase 0 stop point

Phase 1 has not been implemented. The next authorized action is the architecture reconciliation above. The JARVIS shared transition must not begin until the homepage is direct, stable, truthful, lighter, and visually revalidated.
