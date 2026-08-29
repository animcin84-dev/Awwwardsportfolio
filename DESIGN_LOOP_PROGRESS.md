# Design loop progress

## Target

Create a portfolio that can credibly compete for Awwwards recognition by pairing a memorable authored spatial system with unusually clear project communication, strong motion craft, and responsible performance/accessibility behavior.

## Pieces

| Piece | Status | Evidence | Next decision |
| --- | --- | --- | --- |
| Opening and spatial world | Built, browser-verified | `review-captures/01-arrival-desktop.png`, `review-captures/08-arrival-mobile.png` | Independent critique |
| Thesis and project waypoints | Built, browser-verified | `review-captures/02-thesis-desktop.png` through `05-qadam-desktop.png` | Independent critique |
| Field notes and navigation | Built, browser-verified | `review-captures/06-field-desktop.png`, `review-captures/09-field-mobile.png` | Independent critique |
| Contact peak and final formation | Built, browser-verified | `review-captures/07-contact-desktop.png`, `review-captures/10-contact-mobile.png` | Independent critique |

## Review rounds

### Round 20 — real product proof and fast case-study routing

- Ran a capture-first audit of the production promise → proof → action path. The persistent Work route stopped at a full-viewport editorial opener, and QADAM's strongest visual remained a portfolio-authored reconstruction despite a genuine release artifact being publicly available.
- Inspected the JARVIS and QADAM repositories in the in-app browser. JARVIS contains documented architecture but no non-placeholder visual release assets; QADAM contains a 1.01MB deterministic fallback walkthrough in its public release package.
- Imported the exact QADAM release file as `public/evidence/qadam-fallback-demo.mp4` and presented it as a provenance-linked 48-second 1920×1080 product walkthrough. Playback is visitor-initiated and non-looping, so the hero remains the only continuous media scene.
- Changed the hero shortcut, keyboard skip link, and primary Work action to land directly at JARVIS. Natural scrolling still retains the Selected Systems opener and transition, but reviewers now have a one-action route to credible proof.
- Production browser evidence: the Work action lands at `#jarvis` with JARVIS visible; the QADAM video reaches readyState 4 and plays from the local asset; 1440×900, 390×844, and 720×450 captures show no horizontal overflow; warning/error console remains empty.
- Fresh critics found two valid blockers: the mobile menu's Work destination still pointed to the editorial preamble, and the QADAM walkthrough auto-played/looped despite the hero owning continuous media. Mobile now distinguishes `Selected` from `Work`, with Work landing at JARVIS; QADAM is visitor-initiated, paused at 0, and non-looping. Brief/system rechecks lost the required in-app browser, so no PASS is fabricated. Craft chose ours over the live Lusion mechanism bar; its remaining clipped deep-link arrival was removed with a paper anchor spacer.
- Production evidence: verifier passes **104/104**, typecheck passes, and the warning-free build reports **67.5KB route JS / 170KB first-load JS**. Final browser QA confirms mobile Work → `#jarvis`, QADAM `paused=true`, `currentTime=0`, `loop=false`, clean desktop/mobile direct arrivals, zero overflow, and no warning/error logs.

### Round 19 — legible first-viewport proposition

- Re-audited the full 20,509px production journey at its major chapter landings and compared the opening directly with the current live Lusion render. The visual identity was memorable, but the one-line proposition lost contrast over the moving chrome texture, especially on mobile.
- Rebuilt the line as one restrained proof plate with a semantic MEMORY → ACTION → EVIDENCE route. The plate is CSS/DOM only, keeps the chrome wordmark as the single dominant element, and creates a direct eye path into Selected Work.
- Explicitly inspected the liquid-metal border skill, then rejected it because its WebGL renderer conflicts with the shipped no-WebGL decision. No dependency, canvas, or animation loop was added.
- Production geometry: desktop plate 760×60px below the 993px wordmark; mobile plate 337.6×112px below the 359px wordmark; narrow landscape has no header/CTA collision; all tested views have zero horizontal overflow.
- Reduced-motion proof: poster-only hero, no video `src`, fully visible proof plate, no transform, and an accessible route name. Browser warning/error console is empty.
- Source gates pass **103/103**, typecheck passes, and the warning-free production build remains **67.5KB route JS / 170KB first-load JS**. Three fresh critics were attempted but hit the environment usage ceiling, so Round 19 remains awaiting independent acceptance.

### Round 18 — recovery-to-evidence pressure release

- Compared the rendered journey with the live reference at matched viewports and extracted mechanisms rather than surface styling: one focal event, rapid reading order, scene-changing scroll, pressure/release cadence, evidence as payoff, quiet chrome, and mobile recomposition.
- Inserted a full-viewport paper handoff between HELIX and QADAM. Its scroll-owned word sequence distinguishes operational recovery from grounded proof without adding an eleventh navigation waypoint.
- Decoupled visual theme scenes from semantic chapter state and added a viewport-centre fallback so rapid scrollbar jumps cannot leave global navigation stranded on Hero.
- Fresh critics found two concrete defects: HELIX exceeded the documented display cap and its recovery control did not reliably activate through synthetic Enter/Space input. The title now caps at 11rem and the button has explicit non-repeating keyboard activation in addition to native semantics.
- Fresh-origin production evidence: HELIX computes to 172.8px / 124.416px at 1440×900, Enter moves fault → recovering → verified at 390×844, QADAM lands below the fixed header with zero horizontal overflow, reduced motion exposes all nine handoff words, and the console is empty.
- Source gates pass **101/101**, typecheck passes, and the warning-free production build reports **67.5KB route JS / 170KB first-load JS**. Craft recheck returned **PASS**; brief/system rechecks were unavailable after the required browser disconnected, so independent acceptance remains partial.

### Round 5 — contrast and interaction semantics

- Measured the rendered palette instead of judging contrast from token names; deepened the signature cobalt and lifted essential micro-copy to AA-readable combinations.
- Rebuilt Capabilities as a semantically complete, keyboard-roving accordion without changing its visual silhouette.
- Consolidated HELIX feedback into one atomic status with a truthful busy lifecycle.
- Removed the mobile navigation trigger from Contact after a 390×844 browser capture proved it overlapped the primary CTA.
- Production evidence: Next.js build passes, source verifier passes 68/68, desktop and 390×844 interaction states render cleanly, and the browser console is empty.
- Independent verdicts: **FAIL / FAIL / FAIL**. Brief found a profile link instead of a true conversation action; system found full-bleed blue violating the documented sequence; craft found too many competing type levels inside JARVIS.

### Round 6 — critic-directed rebuild

- Replaced the profile CTA with a prefilled public GitHub project-inquiry thread, preserving an honest destination without inventing contact data.
- Returned Method and Contact to the documented paper sequence; cobalt is now restricted to route/state moments and the single primary contact action.
- Reduced the JARVIS console headline and receipt metric so the project name owns the viewport and proof remains supporting information.
- Reverified desktop JARVIS, Method, Contact, the full CTA frame, and the 390×844 finale in production. No runtime warnings/errors and no horizontal overflow.
- Independent brief/system/craft verdicts: **FAIL / FAIL / FAIL**. Brief rejected the public GitHub issue as a credible client conversation; system rejected the standalone Capabilities chapter between Method and Field; craft found a mobile HELIX caption collision.

### Round 7 — sequence, conversion, and mobile craft

- Folded the full accessible Capabilities accordion into the light Operating Method chapter and removed its separate navigation state, restoring the authored Method → Active Field handoff and ten-chapter wayfinding.
- Replaced the public GitHub issue with an in-site private project-brief form: labelled fields, native validation, honeypot, request validation, rate limiting, atomic success/error feedback, and a private ignored inbox.
- Verified the contact flow end-to-end in production; the server stored the message and the UI returned a stable success state. The synthetic QA message was removed after verification.
- Rebuilt the mobile HELIX footer as a dedicated 78px plate and moved the recovery-state badge away from the proof hierarchy. Fault and verified states now render without clipping at 390×844.
- Production evidence: typecheck passes, source verifier passes 73/73, Next.js production build is clean, browser console has no warnings/errors, and mobile/desktop pages show no horizontal overflow.
- Independent brief/system/craft verdicts: **FAIL* / FAIL / FAIL**. The brief critic misread the required pre-rendered film as forbidden real-time 3D; system found oversized editorial signal blue in the manifesto; craft found the chapter navigator competing with project/contact content.

### Round 8 — colour discipline and navigation safe-area

- Returned the manifesto’s final oversized line to ink so signal blue remains a state, route, focus, and action colour.
- Made the desktop chapter rail exit during the hero, all three flagship project plates, and Contact, preserving it only where it aids long-form wayfinding.
- Relocated mobile chapter navigation into the persistent header safe-area. The 44px closed control has a measured 12.2px gap to `Let's talk`, 111.4px to the brand, and expands intentionally into the complete ten-link navigation grid.
- Reverified Contact and HELIX at 1440×900 and 390×844: no rail/content collision, no horizontal overflow, and no browser warnings/errors.
- Clarified the review brief: real-time 3D/WebGL remains forbidden; the owner-supplied pre-rendered liquid-metal film is a required identity asset.
- Production evidence: source verifier passes 75/75 and the clean Next.js production build serves on port 3216.
- Independent brief/system/craft verdicts: **FAIL / PASS / FAIL**. Brief requested client/adoption/testimonial evidence that has not been supplied; system passed; craft found collapsed rail link boxes extending past their disclosure.

### Round 9 — independent proof and rail disclosure

- Reframed Selected Work as `INDEPENDENT R&D / 2024—2026` and explicitly states the evidence boundary: public source and measured evidence where available, interaction proof where it is not.
- Audited public repositories for awards, clients, adoption, testimonials, and competition placement. None are publicly substantiated, so no social proof was invented.
- Rebuilt the desktop rail’s collapsed state from fixed 24px/label/8px columns to a single 8px waypoint. Full number/label columns appear only on hover/focus.
- Production geometry at 1440px: rail disclosure `1371.6–1415.6`, links `1379.4–1407.8`, every tested hitbox contained, and no horizontal overflow.
- Production evidence: typecheck passes, verifier passes 77/77, clean Next.js build, and fresh render on port 3219 has no console warnings/errors.
- Independent brief/system/craft verdicts: **PASS / PASS / PASS**. Brief found no blocker and noted only the long-form distance to the footer form, mitigated by the persistent `Let's talk` CTA; system found no brief/token/sequence violation; craft found no material rendered defect.
- Motion performance closeout sampled desktop top/mid/footer and 390×844 top/mid: zero offscreen-running CSS animations, hero video active only in its opening scene, and no canvas/WebGL work.
- Three bounded production reloads remained exactly stable at 848 DOM elements, 4 images, 1 video, 0 canvas, and 0 iframe; the console remained empty. Browser heap/frame counters were unavailable, so this is not presented as proof against every possible long-session leak.

### Round 10 — launch identity and production handoff

- Generated an original 1200×630 social card, Twitter card, favicon, Apple icon, and 192/512 manifest icons from the owner-supplied hero poster, wordmark, and D mark.
- Added manifest, structured Person metadata, canonical-origin configuration through `NEXT_PUBLIC_SITE_URL`/Vercel environment values, dark arrival theme colour, and complete Open Graph/Twitter descriptions.
- Added long-lived rules for the poster, fallback film, identity marks, and manifest icons; added nosniff, frame-deny, strict referrer, and camera/microphone/geolocation policies.
- Replaced stale README, brief, experience spine, world bible, gates, user flow, provenance, and third-party notes that still described the retired astronaut/WebGL prototype.
- Browser QA: metadata routes return correct content types; raw server HTML contains semantic content and noscript final-state CSS; reduced motion attaches no video source and hides no reveal content; 390×844 and 720×450 show zero overflow; console remains empty.
- Production evidence: typecheck passes, verifier passes 82/82, and the warning-free Next.js build exposes static manifest/icon/social routes alongside the dynamic contact endpoint.

### Round 11 — durable private inquiry contract

- Added an environment-driven delivery adapter: verified HTTPS webhook, persistent Node filesystem, or explicit fail-closed unavailable mode. Known ephemeral platforms no longer return false success without a durable destination.
- Added 8-second provider timeout, 12KB request cap, bounded rate-limit cleanup, Retry-After/no-store responses, delivery reference IDs, and server-side field-specific validation.
- Rebuilt client recovery with validation on blur and submit, inline `aria-describedby` errors, `aria-invalid`, an always-visible 2,000-character count, atomic alert/status output, a 12-second network timeout, and preserved field context after failure.
- Mobile visual QA found and fixed invalid-field focus under the fixed header; the corrected focused field sits at y=408 while the header ends at y=78, with zero horizontal overflow.
- API proof: invalid request `422` with three field errors; successful local delivery `200` with matching `DB-…` reference and stored UUID; immediate repeat `429` with `Retry-After: 15`; unavailable delivery `503`, `no-store`, and explicit unsent recovery copy.
- Production evidence: typecheck passes, verifier passes 85/85, warning-free build, 65.6KB route JS / 168KB first-load JS, and empty browser console.

### Round 12 — responsive identity media

- Profiled the production mobile arrival at 390×844 and found that missing `sizes` metadata made Next.js choose `w=3840` for the hero wordmark and the 55px About mark.
- Added rendered-width contracts to the hero, About orbit, persistent brand, and preloader marks, plus a source verifier that prevents their removal.
- Production mobile selection now resolves to `w=640` for the 356px hero wordmark, `w=64` for the 55px orbit mark, and `w=48` for the compact navigation mark.
- Optimized response weight fell from 222.6KB to 33.3KB for the mobile wordmark and from 97.2KB to 1.1KB for the orbit mark. Desktop at 1440×900 selects `w=1080` and `w=96` rather than full-size sources.
- The hero film remains the owner-supplied 8-second 1280×720 identity scene (3.07MB source) with poster-only reduced-motion/save-data delivery. Codec tooling is not bundled in this workspace, so a smaller mobile transcode is not fabricated or claimed.
- Production evidence: typecheck passes, verifier passes 86/86, warning-free build, and responsive candidates were measured in the in-app browser against a fresh production server.

### Round 13 — evidence-first cinematic rebuild

- Compared the current production render against live Lusion at the same viewport and extracted mechanisms rather than surface styling: one focal event per viewport, scene-changing scroll, pressure/release cadence, evidence as payoff, quiet chrome, and a truly recomposed mobile flow. These mechanisms are recorded in `bar.md`.
- Generated one original, non-3D raster transition that opens black liquid chrome into a pale evidence field with a cobalt seam. The optimized `public/material-signal.webp` is provenance-recorded and cached as a long-lived authored asset.
- Replaced static JARVIS architecture decoration with a four-state source-backed inspector and static QADAM paperwork with a three-state evidence inspector. Both use semantic tabs, click activation, roving focus, Arrow/Home/End keyboard activation, visible focus, and truthful non-metric claims.
- Strengthened the narrative spine: a clearer hero thesis, a distinct visual surface-to-evidence handoff, a human operating belief in About, and a full-frame contact epilogue with one decisive action.
- Production browser evidence at 1440×900 and 390×844 confirms the focal asset, responsive 2×2 inspector layout, mobile `MENU` label, interactive state changes, epilogue composition, and zero horizontal overflow. Keyboard testing proves ArrowRight changes JARVIS from Tools to Events and QADAM from Source to Guard while moving focus.
- Production evidence: verifier passes **89/89**, typecheck passes, and the warning-free build reports **67.1KB route JS / 170KB first-load JS**.
- Fresh post-build brief/system/craft agents were dispatched as required, but all three hit the environment usage ceiling. Their absence is recorded as **recheck unavailable**, not converted into a PASS.

### Round 14 — touch-safe Active Field

- Ran a fresh full-path heuristic review after the flagship proof chapters. The highest-severity implementation gap was Active Field: each repository anchor also controlled its preview on hover/focus, so touch users could not explore a scene without navigating away.
- Split recognition from commitment. Four project signals are now semantic tabs with click, Arrow, Home, and End activation; a single destination CTA updates to the selected public build and retains the real repository URL.
- Reauthored the responsive composition rather than shrinking desktop. At 390×844 the four signals form a 2×2 deck (297px total) before the 430px visual and 78px destination action; desktop retains a sticky 668px stage and four editorial rows.
- Browser proof: selecting Ustaz changes the desktop panel and CTA to `animcin84-dev/Ustaz-AI`; pressing End selects Bayan Sulu Kids and updates both focus and destination; mobile selection changes to the Kids scene with no horizontal overflow.
- Motion proof at hero, Active Field, and finale: 0 offscreen-running CSS animations, 891 stable elements, 4 images, 1 video, 0 canvas, 0 iframe, and an empty warning/error console. The hero film plays only at the opening and is paused in Field/finale.
- Reduced-motion proof: `data-motion=reduced`, no hero video source, 0 hidden reveal nodes, working Consent OS selection, correct repository CTA, and no overflow.
- Production evidence: verifier passes **90/90**, typecheck passes, and the warning-free build reports **67.3KB route JS / 170KB first-load JS**.

### Round 15 — navigation landing and target geometry

- Tested all ten hash destinations at 390×844 after a visual capture suggested fixed-header overlap. The hypothesis was rejected: every section heading begins below the header safe area, with measured heading tops from 119px upward against an 80px header bottom.
- Audited every non-inline mobile link, button, summary, input, textarea, and focus destination. The closed menu's nominal 44px shell produced only 42px of content width after borders, while the visible name/email inputs measured 23px high.
- Compensated the menu shell to 46px with an explicit 44px summary minimum and gave all visible contact controls a 44px floor. Production now measures the closed summary at 44.4×44px, every expanded menu link at 44px, name/email at 44px, and brief at 118px.
- Replaced the decorative `Scroll to enter` reference pattern with a purposeful `View selected systems` shortcut. Mobile browser proof shows it lands `#work` with the headline at y=266 and header ending at y=74; selecting Method closes the disclosure and lands its heading at y=109.
- Production evidence: verifier passes **92/92**, typecheck passes, the warning-free build remains **67.3KB route JS / 170KB first-load JS**, and the interaction console is empty.

### Round 16 — persistent orientation

- Audited the ten-chapter navigation against orientation and current-location semantics. The chapter rail and closed mobile label tracked state, but primary desktop links and the exact mobile destinations did not expose the same state.
- Added grouped desktop semantics: Work remains current through Work, JARVIS, HELIX, QADAM, and Field; Method and About activate only in their chapters; Contact marks the existing `Let's talk` action current.
- Added exact mobile semantics: one link receives `aria-current=location`; the native summary announces `Current section: …`; the current tile combines weight, surface inversion, and a bordered cobalt dot so the state does not depend on colour alone.
- Production proof: QADAM and Field both activate Work with a persistent underline and weight 650; Method/About activate themselves; Contact uses the cobalt action plus two-pixel inset ring on the light theme. Mobile QADAM is the sole current tile, and choosing Field closes the disclosure while updating hash, summary label, and exact current link.
- Production evidence: verifier passes **94/94**, typecheck passes, the warning-free build remains **67.3KB route JS / 170KB first-load JS**, and browser warnings/errors remain zero.

### Round 17 — first-reveal latency

- Profiled the production opening instead of judging the loader aesthetically. On the baseline production run, the critical hero image was already complete at the initial sample, but `main` remained busy for about 749ms and the overlay stayed mounted for about 1,514ms.
- Removed the forced 720ms minimum visibility while preserving the real font/image/video readiness race, the poster shortcut, the 2.8-second hard timeout, atomic status announcement, scroll lock, and timer/RAF cleanup.
- Shortened only the exit choreography to a 320ms opacity reveal with a 360ms DOM cleanup. The loader still remains available when resources genuinely take time; ready content is no longer held for theatre.
- Production browser proof: mobile 390×844 removes the overlay in 396ms and desktop 1440×900 in 376ms from the immediate post-navigation sample; both report a complete hero, released `aria-busy`, and zero horizontal overflow. Scrolling to Work correctly updates the grouped current state and reports zero offscreen-running CSS animations.
- Production evidence: verifier passes **95/95**, typecheck passes, and the warning-free build remains **67.3KB route JS / 170KB first-load JS**.

### Round 1

All three fresh-context critics returned **NOT GOOD ENOUGH**. The shared blocking themes were:

- the final D was cropped and not legible as the promised signature;
- the close pointed to GitHub instead of framing a conversation;
- flagship projects asserted capability without enough visible system evidence;
- particle density compromised Field Notes and small labels;
- the mobile waypoint rail overflowed instead of collapsing to the current section.

### Round 2 rebuild

- Rebuilt the final formation as a fully framed D and reduced its contrast behind the closing type.
- Changed the peak action to “Start a conversation,” retaining the truthful GitHub destination.
- Added compact execution/grounding evidence modules to JARVIS, HELIX, and QADAM.
- Added chapter-specific particle opacity, protected copy planes, and an opaque Field Notes list.
- Replaced the mobile horizontal rail with a contained active-waypoint index control.
- Reworked mobile Field Notes spacing, type scale, header compositing, and reading order.

### Round 2 review

System and craft were close to passing, but the brief critic held the release because the mobile D still collided with copy and a HELIX deep-link capture lost persistent navigation. The rebuild continued.

### Final round

- Added a precise tubular D guide beneath the resolving particle formation.
- Reframed the mobile D inside the safe area and lowered decorative particle contrast.
- Forced persistent navigation visible on all non-arrival deep links.
- Reverified HELIX and both contact breakpoints in fresh in-app browser tabs.
- Brief critic: **GOOD ENOUGH**, no release blockers.
- System critic: **GOOD ENOUGH**, no release blockers.
- Craft critic: **GOOD ENOUGH**, no release blockers.

Design loop status: **round 9 implementation accepted — PASS / PASS / PASS; rounds 10–11 launch QA passed**. The broader award goal remains active because verified third-party proof, a configured production contact destination, final canonical hosting, and real-device field performance still require owner/deployment input.

### Round 21 — HELIX recovery anatomy

- Scoped the design-debt audit to the HELIX → QADAM corridor and captured the fault, verified, handoff, and responsive states. The key issue was structural rather than decorative: HELIX ended after one interaction while the other flagship stories continued into architecture or measured evidence.
- Added a four-beat, explicitly local recovery model: isolate the fault, preserve completed state, assign the constrained retry, and close on a returned receipt. The final light receipt plate creates a second pressure/release beat before the existing QADAM handoff.
- Desktop uses one sticky thesis, a bounded progress meter, and restrained scroll-linked beat resolution. At 390×844 the same content becomes a sharp static sequence with single-column ledgers; no pinning or blur is required to read it.
- Accessibility closeout keeps native list/definition semantics, preserves the existing keyboard-operable prototype and atomic status, renders all final states for reduced motion, and keeps the public-production boundary in visible copy.
- Production evidence: `npm run verify` passes **105/105**, typecheck passes, the warning-free build reports **67.6KB route JS / 170KB first-load JS**, desktop/mobile report no horizontal overflow, reduced motion returns poster media and complete HELIX states, and the browser console is empty.
- This round records production self-QA only. No independent critic verdict is fabricated.

### Round 22 — HELIX responsive pacing and hash lifecycle

- Measured the real 390×844 production chapter before editing: HELIX recovery anatomy was 3,978px high, each technical ledger was 259px, the full document was 25,368px, and horizontal overflow remained zero.
- Reauthored the phone ledgers as three-column technical plates and tightened only supporting spacing. The chapter is now 3,246px high and each ledger 113px; all twelve data points remain visible, reducing the chapter by 732px without cutting the case-study argument.
- Registered the meter and four beat scrub timelines through GSAP matchMedia at `min-width: 641px`. Mobile production reports `null` inline styles for every beat and meter, while desktop production reports the expected authored start states.
- Replaced the HELIX footer's premature Experiments jump with a direct recovery-model route. Clicking lands the mobile section at y=78 below a y=74 header.
- Found and fixed a broader lifecycle defect: on a full desktop reload, the preloader could restore the page to the hero after initial hash alignment. MotionSystem now realigns the active hash on `portfolio:ready`; fresh production loads land at y=91 desktop and y=78 mobile with zero overflow.
- Performance/accessibility proof: top, HELIX, and Contact each report zero offscreen-running CSS animations and zero canvases; reduced motion ships the hero poster, exposes all four beats and the full meter, preserves the hash landing, and has an empty warning/error console.
- Production evidence: verifier passes **108/108**, typecheck passes, and the warning-free build reports **67.7KB route JS / 170KB first-load JS**. This remains production self-QA, not an invented independent verdict.

### Round 23 — instant identity and genuinely compact mobile proof

- Ran a fresh matched-reference review at 1440×900 and 390×844. Craft selected our rendered portfolio over the live Lusion mechanism bar, but the brief critic failed the opening because the chrome signature did not expose a readable name or role; the system critic independently failed the mobile HELIX anatomy because its four beats still behaved like near-full-screen posters.
- Rebuilt the hero hierarchy as visible identity → role → material signature → proposition → action. `Daniyal Bauyrzhan` is now the single semantic H1 and `Independent AI systems builder` is visible directly above it; the decorative chrome wordmark remains the focal authored asset without carrying the accessibility or comprehension burden.
- Production first-viewport proof at 390×844: the readable name measures 275×32px, the role sits directly above it, the 338×112px proposition plate and 185×44px case-study action remain in the same viewport, and horizontal overflow is zero. Reduced motion exposes every identity layer, attaches no hero video source, and preserves zero overflow.
- Reauthored the mobile recovery anatomy as one continuous technical ledger. At 390×844 it falls from 3,246px to 1,757px; the intro is 310px and the four beats are 293–321px each, so multiple complete decisions fit in one viewport while all twelve proof fields and the receipt boundary remain visible.
- Motion ownership remains breakpoint-correct: all four mobile beats and the meter expose `style=null`, while desktop retains the expected ScrollTrigger inline states. Fresh deep links land below fixed chrome at 78px mobile and 91px desktop; reduced motion shows all beats and the full meter; browser console and horizontal overflow remain empty.
- Fresh independent rechecks: brief **GOOD ENOUGH**, system **GOOD ENOUGH**, craft **ours wins**. Production gates pass: verifier **109/109**, typecheck exit 0, and the warning-free build reports **67.8KB route JS / 170KB first-load JS**.

### Round 24 — mobile chrome that yields to the story

- Captured settled full-page production journeys at 1430px and 380px, then audited every scene against the live Lusion mechanism bar. All three fresh critics converged on one remaining mobile craft gap: the fixed header and chapter disclosure repeatedly bisected oversized typography and proof while reading downward.
- Rebuilt the mobile chrome as one scroll-aware state machine. It remains visible at the top, yields only after deliberate downward travel, returns after a short upward gesture, and stays pinned while the disclosure is open or focus is inside navigation. Desktop remains fixed; reduced-motion sessions always keep navigation visible.
- Production browser proof at 390×844 confirms the complete contract: top positions 12px / 23px, hidden positions −112px / −100px after downward intent, full recall after a 24px upward gesture, open-menu persistence, and reduced-motion persistence after a 1,400px jump. Desktop remains visible at y=15,000; horizontal overflow and console warnings/errors remain zero.
- Matched evidence lives in `review-captures/round24/`: `13-mobile-chrome-before.png`, `14-mobile-chrome-after-hidden.png`, `15-mobile-chrome-after-recall.png`, plus stitched desktop/mobile journeys and manifests. The reusable stitch helper is `scripts/stitch-review-capture.mjs`.
- Fresh independent rechecks returned brief **GOOD ENOUGH**, system **GOOD ENOUGH**, and craft **ours wins**. Production gates pass: verifier **110/110**, typecheck exit 0, and the warning-free build reports **68.1KB route JS / 171KB first-load JS**.

### Round 25 — a jury-speed visual proof route

- Rechecked the current production render against the live Lusion bar and the official Awwwards weighting, where design and usability carry most of the site score. The long-form portfolio had direct global navigation, but Selected Work still asked a visitor to enter JARVIS before the three evidence types became comparable.
- Added a direct three-project route inside the existing 100svh Work opener. JARVIS, HELIX, and QADAM now expose their proof boundary and case-study destination before the long scroll: public source, interaction proof, and public evaluation.
- The first two craft reviews rejected a text-only index because evidence remained subordinate to labels. The accepted rebuild turns each shortcut into a truthful mini evidence plate using already-present case-study data: JARVIS `03 / 03` operation trace, HELIX `04 / 04` recovery path, and QADAM `0.9231` with `142 tests · 20 labelled queries`.
- Desktop production keeps the complete scene at 1440×900: the evidence band is 197.6px high and ends at 852.2px. Mobile is independently recomposed into three 104px rows with 74×68px instruments; the entire Work chapter is exactly 844px high, the route ends at 795.6px, and horizontal overflow is zero.
- Browser interaction proof confirms a visible cobalt keyboard focus outline, QADAM shortcut → `#qadam` with the target at 0px and mobile chrome yielded, and reduced motion with a complete visible route, always-visible chrome, poster-only hero, and no video source. The warning/error console remains empty.
- Slow-network media policy now treats any Network Information API tier below `4g` like save-data: the complete poster remains and the 3.07MB hero film is not attached.
- Final fresh-context critics: brief **GOOD ENOUGH**, system **GOOD ENOUGH**, craft **ours wins**. Production gates pass: verifier **112/112**, typecheck/build pass, and the warning-free build reports **68.2KB route JS / 171KB first-load JS**.

### Round 26 — claim-to-source receipts

- Audited every visible JARVIS and QADAM public-source claim against the current public repositories. JARVIS confirms the documented voice/text → semantic context → tools → SSE route plus explicit permission and destructive-command boundaries. QADAM confirms 120 backend tests, 22 frontend tests, 20 labelled queries, 0.9231 clause-family micro-recall, 1.0 high-priority citation coverage, the ≥0.90 hit@5 threshold, and the stated latency exclusions.
- Added `SOURCE_EVIDENCE_REGISTER.md` as the maintained claim ledger: exact primary link, confidence, portfolio treatment, rejected overclaims, verification date, and an update rule.
- Added four exact source receipts beside each source-backed case study. JARVIS links architecture, context engine, permission boundary, and SSE route. QADAM links its machine-readable evaluation result, fixtures, backend suite, and deterministic release artifact. The receipts remain subordinate to the case-study thesis and do not create another long chapter.
- Production browser proof: desktop receipts render as one four-column evidence band; 390×844 recomposes them into a 2×2 grid with four 171.6×122px cards and zero horizontal overflow. Keyboard focus visibly inverts the active card; warning/error logs are empty.
- Accepted review evidence: `review-captures/round26/01-source-receipts-desktop.png`, `03-qadam-source-receipts-desktop.png`, `05-source-receipts-mobile-grid.png`, and `07-qadam-source-receipts-mobile-grid.png`.
- Fresh independent critics returned brief **GOOD ENOUGH**, system **GOOD ENOUGH**, and craft **ours wins**. Production gates pass: verifier **113/113**, typecheck/build pass, and the warning-free build remains **68.2KB route JS / 171KB first-load JS**.

### Round 27 — responsive hero art direction

- Audited the supplied hero master before changing runtime policy: `background.mp4` is 1280×720, 3,069,023 bytes; the new portrait derivative is 404×720, H.264, no audio, fast-start, 516,789 bytes (about 83% smaller) with SSIM **0.989838** against the exact center crop.
- Added an explicit 640px source policy. Phones select `background-mobile.mp4`; desktop keeps the landscape master. `NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL` provides an owner-controlled override, while the existing poster, fallback, reduced-motion, save-data, slow-connection, and offscreen pause contracts remain intact.
- Fresh production browser proof: 390×844 selects `http://localhost:3232/background-mobile.mp4` with `readyState=4`, playing video, `data-hero-media-variant=mobile`; 1440×900 selects `background.mp4` with `readyState=4`, playing video, variant `desktop`. After leaving the hero, the film pauses; reduced motion removes the source and renders the poster. Both breakpoints report no positive horizontal overflow and the console is empty.
- Accepted captures: `review-captures/round27/01-mobile-art-directed-hero.png` and `02-desktop-master-hero.png`.
- Fresh independent critics: brief **GOOD ENOUGH**, system **GOOD ENOUGH**, craft **OURS WINS**. Production gates pass: verifier **114/114**, typecheck, and warning-free build (**68.3KB route JS / 171KB first-load JS**).

### Round 28 — bounded hero depth response

- The hero now has a small pointer-depth layer that separates identity and the evidence plate by a few pixels from the liquid-metal film. It uses CSS `translate` so GSAP remains the sole owner of `transform`, and the effect is disabled for coarse pointers or reduced motion.
- Pointer state resets on hero leave, window blur, and hidden-tab transitions; the verifier now guards the bounded CSS variables and reset lifecycle. Production browser proof measured desktop identity `-2.40px` / plate `+1.92px` at the pointer edge, both returning to `0px` after leave. Reduced motion keeps the poster and no video source; the mobile portrait source and zero positive overflow remain intact. Runtime warnings/errors stayed at zero.
- Production gates pass: verifier **115/115**, typecheck, and warning-free build (**68.4KB route JS / 171KB first-load JS**). This round is an implementation/runtime acceptance note; no new independent visual critic verdict is fabricated because the change is interaction-only and the existing Round 27 captures remain the visual baseline.

### Round 29 — logo-led identity and visible cursor

- Removed the duplicate `Daniyal Bauyrzhan` text from the opening. The supplied chrome wordmark is now the only visual name lockup and the single semantic H1 via `alt="Daniyal Bauyrzhan"`; the role line remains above it for immediate context.
- Increased the custom cursor core to 16px with a high-contrast ring so it remains visibly trackable on carbon and paper scenes. Native cursor suppression now begins only after the custom cursor has actually activated (`data-cursor-active`), preventing an invisible-cursor gap during first entry. The cursor still expands into the blue action target over interactive elements and keeps touch/reduced-motion fallbacks.

### Round 30 — directional physics, current visual system preserved

- Applied only the interaction mechanics from the supplied directional-cursor reference: velocity smoothing, dynamic pursuit gap, spring/damping follow, stable direction vectors, and eased angular reversals.
- Kept the current liquid-metal/editorial appearance and interaction labels; the physics layer adds a short directional signal trail and controlled stretch without importing the reference arena or artwork.
- Production gates pass: verifier **117/117**, typecheck, warning-free build (**69KB route JS / 172KB first-load JS**), fresh reload, and zero browser console warnings/errors. A paint-containment audit removed `contain: paint` from the zero-size cursor root, eliminating the clipping condition that made an active cursor invisible. The final fail-safe deliberately preserves the OS pointer at all times; the directional signal is additive, not a condition for pointer visibility.

### Round 31 — exact owner-supplied directional cursor

- Replaced the handmade cursor implementation with the supplied directional cursor asset, its 32px visual treatment, and its state layer: default/link pointer, text I-beam, action label, drag label, and click ripple.
- Copied the supplied directional motion constants unchanged and migrated existing portfolio interactions to its documented `action`, `text`, and `drag` API.
- This intentionally supersedes the previous additive native-pointer fallback because the owner requested exact visual parity with the supplied cursor system.

### Round 32 — action-to-recovery cinematic handoff

- A fresh 1440×900 reference/localhost comparison confirmed that the hero and typographic hierarchy already clear the bar, but JARVIS handed directly from a dense proof chapter into an even denser HELIX scene with no pressure release.
- Added one authored sticky handoff between the case studies. The scene moves from `ACTION` to `RECOVERY` while the question “What stays visible when the next step fails?” resolves and a single signal route fills toward `OWNED FAILURE`.
- Desktop owns one scroll-scrubbed GSAP timeline; mobile is independently composed as a complete static `ACTION → RECOVERY` statement, and reduced motion removes the 170svh scrub distance while rendering the final state immediately.

### Round 33 — owner-supplied cursor parity and owned 404 recovery

- Corrected the Round 31 integration after an archive-to-worktree hash audit proved that only the supplied PNG was exact: the local engine had been performance-retuned, the supplied React wrapper and CSS were absent, and a local wrapper disabled the cursor under reduced motion. The engine, React wrapper source, CSS, and PNG now match the owner-supplied ZIP exactly; only the wrapper filename is unique because TypeScript resolves the archive's same-basename `.ts` / `.tsx` pair ambiguously.
- Mounted the supplied component exactly once in the root layout, as required by `INTEGRATION.md`, so every route receives the same default, action, text, drag, ripple, directional-gap, spring, turn, and click behavior. Production DOM proof shows one 32×32 layer at z-index 999999, `RETURN ↖` and `INSPECT` action labels, the supplied I-beam on text fields, and a click ripple; the asset endpoint returns the exact 93,956-byte PNG.
- Closed the Awwwards unfinished-edge disqualifier: a missing route no longer falls through to the default Next.js error screen. The authored `NO RESULT.` route uses the existing d-mark and material signal, an explicit request/result/recovery ledger, semantic recovery navigation, route-specific metadata, and true HTTP 404 status.
- Desktop 1440×900 and mobile 390×844 production renders each fit in one viewport with no positive horizontal overflow. Mobile actions measure 344×58px, the decorative ledger yields, the H1 remains inside the viewport, the exact cursor state works on the 404, and console warnings/errors are empty.
- Production gates pass: verifier **123/123**, typecheck, and warning-free build. This is a source-parity and edge-state QA round; no independent Awwwards win claim is made.

### Round 34 — proof-specific, shareable case studies

- Closed the homepage-only design risk with three statically generated project routes: `/work/jarvis`, `/work/helix`, and `/work/qadam`. The long homepage narrative remains intact; its one-viewport Selected Work instruments now provide the fast path into each shareable study.
- Built one consistent editorial route system without flattening the projects into template copies. JARVIS reuses its keyboard-operable architecture inspector, HELIX carries the recoverable failure prototype, and QADAM carries the evidence inspector and public evaluation ledger.
- Structured every route as overview → thesis → challenge/decision/result → inspectable proof → four owned moves → evidence ledger → receipts/boundary → reflection → next case. All claims remain controlled by `SOURCE_EVIDENCE_REGISTER.md`: JARVIS's portfolio console is disclosed as authored visualization, HELIX remains a local prototype, and QADAM's latency exclusion stays visible.
- Production proof at 1440×900 and 390×844: each route has one H1, one exact cursor runtime, route-specific metadata, zero positive overflow, ≥44px mobile chrome targets, and an empty warning/error console. QADAM's mobile hero is exactly 844px high; its interactive tabs are 44px. HELIX's recovery action is 314×48px.
- Fixed direct hash alignment under the persistent case chrome: mobile proof headings now land at 81.8px below a 65.6px header. Mobile chrome exposes brand, Work, and Next; Work returns to `/#work` with one cursor instance and no overflow.
- Production gates pass: verifier **129/129**, typecheck, and warning-free build. Each case-study route adds only **3.06KB route JS / 114KB first-load JS**.

### Round 35 — route-scoped loading and inclusive navigation

- Profiled the real production homepage at the opening, midpoint, and finale plus a 390×844 top/mid baseline. Every sample reported **0 offscreen-running CSS animations**, no canvas/WebGL work, and the hero film paused as soon as it left the viewport.
- Found a measurable route-priority leak: the root layout preloaded the 75,238-byte homepage poster on every case study and the 404. Resource hints now render from `HeroVideo`, so the homepage keeps its high-priority poster while `/work/*` and missing routes no longer request or prioritize that asset.
- Ran a WCAG structure audit across the homepage, a case study, and 404. All have one main, one H1, named navigation, labelled controls, complete image alt contracts, no duplicate IDs, no heading-level jumps, and no unnamed controls. Added focusable skip destinations to every page type and expanded the desktop primary navigation from 17px text boxes to measured **44px** hit areas without changing the visual hierarchy.
- Three bounded client-route cycles remained stable: every case returned to **254 elements / 2 images / 0 video / 1 exact cursor**, and every revisited homepage returned to **1,126 elements / 5 images / 2 videos / 1 exact cursor**. No cursor, label, I-beam, ripple, canvas, image, or video nodes accumulated.
- Fresh production checks confirm homepage-only poster preload, no poster preload on case/404, one exact owner-supplied cursor per route, and empty warning/error consoles. The in-app browser did not expose Performance/heap counters and its viewport override stopped applying after the production restart, so real-device Web Vitals and a post-change mobile capture remain explicit launch evidence rather than invented results.
- Production gates pass: verifier **132/132**, typecheck, and warning-free build. Homepage remains **63.9KB route JS / 172KB first-load JS**; case studies remain **3.06KB / 114KB**.

### Round 36 — deliberate preloader arrival beat

- Addressed the reported instant exit: when critical assets were already cached, the readiness promise could resolve on the first frame and bypass the preloader's intended cinematic beat.
- Added a bounded minimum visible interval of **1,500ms** for normal first visits and **1,800ms** for repeat visits. The existing `2,800ms` slow-load ceiling, pointer/keyboard skip after `320ms`, and reduced-motion `180ms` path remain intact; the exit still uses the existing `360ms` fade.
- The finish path now waits for both critical readiness and the minimum-visible promise, while racing the hard timeout. All timers remain tracked and cleared on cleanup, so the longer beat cannot create a route or unmount leak.
- Production gates pass: verifier **132/132**, typecheck, and warning-free build. Live browser remeasurement was unavailable in this turn because the in-app browser reached its usage limit; timing is source-proven and compiled, with a fresh visual timing capture still an explicit follow-up gate.

### Round 38 — signal-gate route choreography

- The case-study interiors were already distinct, but entering them still used an un-authored route swap. Added one shared client transition layer at the root that intercepts only same-origin pathname changes, stages the destination name, and resolves on the new pathname.
- The transition is intentionally CSS-owned: a carbon field, grid, route label, and cobalt progress line. Same-page anchors, external links, modifier clicks, and reduced-motion preferences are left alone; the existing GSAP/Lenis owner is unchanged.
- Reduced-motion navigation bypasses the staging delay and routes immediately; normal motion gets the full 170ms gate and 520ms reveal/exit choreography.
- Playwright production smoke confirms the normal click path stages `JARVIS / CASE` before the pathname changes to `/work/jarvis`, then resolves the exit phase. A 390×844 HELIX capture preserves the mobile chrome and signal plate; the reduced-motion path routes without the staging delay.
- Production gates pass: verifier **132/132**, typecheck, build, and static case-route generation. No independent award verdict is claimed.

### Round 39 — clean route-gate handoff

- Visual inspection of the gate exposed one genuine transient collision: the owner-supplied cursor label rendered above the transition because it sits at a higher z-index.
- Added a route-state-only suppression rule for the cursor visual, label, I-beam, and ripple. The cursor source files are unchanged and the enhancement returns automatically after the pathname resolves.
- Clean capture: [round38-route-gate-composition-clean.png](review-captures/round38-route-gate-composition-clean.png). Playwright confirms the suppression state, mobile overflow safety, and normal/reduced-motion navigation behavior. Verifier **132/132**, typecheck, and build pass.

### Round 40 — case-study chapter wayfinding

- Heuristic review of the full JARVIS route (8,660px) found a meaningful orientation gap after the hero: the chapters were visually distinct but had no persistent way to recognize or revisit the current section.
- Added a desktop-only `CaseStudyRail` that reuses the portfolio's existing rail language, tracks Thesis → Brief → Proof → Route → Ledger → Receipts → Reflection from viewport position, and exposes keyboard-accessible hash links.
- The rail intentionally stays hidden over the hero and below 900px so the signal instrument, mobile chrome, and reading width remain untouched. Existing case `scroll-margin-top` values keep jumps clear of the fixed header.
- Fresh production captures confirm the rail appears in the Proof chapter with the correct active label and lands the Ledger jump beneath the chrome; mobile computes `display: none` with no positive overflow. Verifier **132/132**, typecheck, and warning-free build pass.

### Round 41 — project-origin route reveal

- Audited all three supplied ZIPs and pasted Codrops articles. Their transition, reveal, and pacing techniques are treated as references; the portfolio keeps its own content, visual language, and non-WebGL implementation boundary.
- Upgraded the shared route gate so a click from a selected-work proof row captures that visual's bounds, then expands the signal card from the source position into the destination route. The adaptation uses existing CSS transforms, opacity, and the current `material-signal.webp` surface—no new package or external image set.
- Normal navigation preserves same-page anchors, external links, modifier clicks, and keyboard behavior. Reduced-motion users route immediately with the transition visuals hidden.
- Production captures: [round43-origin-transition-entry.png](review-captures/round43-origin-transition-entry.png), [round43-origin-transition-mid.png](review-captures/round43-origin-transition-mid.png), [round43-origin-transition-desktop.png](review-captures/round43-origin-transition-desktop.png), and [round43-origin-transition-mobile.png](review-captures/round43-origin-transition-mobile.png).
- Validation: desktop/mobile/reduced-motion route checks, `npm run verify` (**132/132**), `npm run typecheck`, and warning-free `npm run build`.

### Round 42 — scroll-led operating system and spatial proof

- The JARVIS operating-stack tabs now demonstrate themselves: scroll progress advances Input → Context → Tools → Events, changes the panel and route receipt, and exposes a visible progress line. Hover, focus, click, or keyboard interaction pauses automation so the visitor keeps control.
- The requested Meshh SilkWaves command was attempted first. Its CLI requires Tailwind and a shadcn alias configuration that this vanilla-CSS project intentionally does not have, so the supplied shader was adapted into a self-contained raw-WebGL React component instead of migrating the styling stack. It fills only the evidence instrument, clamps DPR, pauses in hidden tabs, renders a still under reduced motion, and deletes its program and buffer on unmount.
- Added one authored Signal Tunnel between the surface transition and JARVIS. It translates the three ZIPs into the portfolio's own language: curve-like spatial sequencing, depth-driven project plates, staggered mask shutters, and clickable case-study cards. The content remains Daniyal's JARVIS / HELIX / QADAM evidence—not the demos' stock imagery.
- Mobile keeps three core project plates and a protected reading field; desktop carries six system/project plates. Reduced-motion collapses the long scrub into one complete static viewport.
- Production proof: [mobile tunnel](review-captures/round48-signal-tunnel-mobile-final.png), [automatic operating stack](review-captures/round48-operating-stack-final.png). Browser checks found one bounded canvas, no console errors, no positive horizontal overflow, and automatic states `01 Input → 02 Context → 03 Tools → 04 Events`.
- Validation: `npm run verify` (**133/133**), `npm run typecheck`, and warning-free `npm run build`.

### Round 43 — full-screen evidence world and automatic product tour

- Replaced the simultaneous six-card tunnel with one 720svh, native-scroll project world. JARVIS, HELIX, and QADAM now approach from depth, expand into a full case frame, hold readable project logic, close through staggered shutters, and leave cleanly before the next case.
- The curved SVG route, perspective approach, DOM-to-fullscreen expansion, shutter mask, and editorial project interiors adapt the supplied Curve Gallery, 3D tunnel, Scroll Transition, and Codrops content-transition principles without copying their stock content or adding another renderer.
- Added one reusable `useScrollAutoSequence` conductor. Safe local controls now demonstrate themselves from scroll: JARVIS tabs, HELIX fault/recovery/verified, QADAM finding/source/guard, capability accordion, Field Lab selector, and muted QADAM footage. Manual input temporarily pauses automation; links, navigation, and contact submission remain user-owned.
- Homepage header `Work` now targets `#work` on `/`; Method, About, and Contact remain same-page anchors. Case-study headers continue to return to `/#work`.
- Browser evidence: desktop entry plus full JARVIS/HELIX/QADAM/exit frames, 390×844 mobile entry and project frame, exact automatic state changes, muted video autoplay in view, reduced-motion static flow, and a same-path `#work` navigation result with no positive overflow.
- Validation: verifier **135/135**, typecheck, and production build pass.

### Round 44 — one spatial project universe with real case-study interiors

- Replaced the sequential 720svh project plates with one persistent Three.js universe. JARVIS, HELIX, and QADAM are now widely separated architectural landmarks—not literal planets—inside a shared fogged field; a damped Catmull–Rom camera and target path crosses the distance on native, reversible scroll.
- Each arrival expands from the landmark into the actual same-origin `/work/jarvis`, `/work/helix`, or `/work/qadam` page. Outer scroll reads through that page, then closes it and returns to the world before flying to the next landmark. A normal `Open interactive case` link preserves full manual use.
- Integrated all applicable reference systems: five original route families and focus scaling from Curve Gallery; wrapped multi-speed evidence fragments plus fullscreen portal logic from the infinite-scroll/Flip demo; and all four Scroll Transition mask families—horizontal blinds, responsive random cells, vertical blinds, and column cells.
- The supplied article principles now appear as one coherent system: true spatial depth, DOM-to-viewport portals, editorial case-study interiors, scroll-owned reversible transitions, and the bounded SilkWaves shader in the JARVIS case hero. Demo stock/Midjourney imagery was intentionally excluded so the portfolio remains Daniyal-specific and avoids importing unrelated visual identity.
- Removed the duplicate homepage pass through the old JARVIS/HELIX/QADAM chapters after the universe. The final field exit now continues directly into Method; the standalone case routes remain intact and Selected Work still links to them.
- Changed frame protection from `DENY` to `SAMEORIGIN` plus `frame-ancestors 'self'`, allowing only the portfolio to embed its own case pages. Embedded chrome, route gate, and duplicate cursor are suppressed; HELIX/QADAM load only on approach.
- Browser proof at desktop and 390×844 confirms the universe entry, all three embedded route headings, scroll-mapped case interiors, reverse QADAM → HELIX flight, Method exit, and no positive mobile overflow.

### Round 45 — scroll-rig universe and full-viewport project worlds

- Rebuilt the universe renderer on the directly installed `@14islands/r3f-scroll-rig`, React Three Fiber, and Drei stack. One `GlobalCanvas` owns the scene and a real `ScrollScene` tracks the DOM/WebGL proof proxy; the existing Lenis instance remains the only smooth-scroll owner.
- Adapted Lusion's MIT WebGL-Scroll-Sync velocity decay to the scene treatment and the MIT threejs-scroll-scene waypoint model to the reversible camera. The journey is now 3000svh on desktop / 2500svh on mobile, with lower wheel gain and heavier damping.
- Replaced frame-like landmarks with three project-specific silhouettes: JARVIS is a deforming memory core surrounded by live proof/media panels, HELIX is a mechanical recovery knot and ownership chain, and QADAM is a crystalline evidence archive with layered documents and source panels. A small operator probe gives the camera route human scale without copying Lusion's astronaut scene.
- Project arrivals now use a circular object-origin match cut into the real same-origin case page at full viewport size. Minimal glass HUD/progress/action controls float above the page; the previous inset browser-window frame is removed.
- Browser QA at 1280×720 and 390×844 confirms one canvas, all three full-screen pages, deferred iframe loading, reverse QADAM → HELIX travel, exit into Method, no positive mobile overflow, direct `/work/jarvis`, Browser Back, and a no-canvas reduced-motion fallback. Production build and typecheck pass.

### Round 46 — evidence atlas and route-first portfolio

- Removed the 3000svh Three.js universe from the homepage runtime and replaced it with one repository-specific signature: a 14-project rotating scroll atlas. The left-hand narrative follows the active project, the right-hand visual plates rotate through depth, and every visual opens a local project page rather than GitHub.
- Added independent `/work`, `/method`, `/about`, and `/contact` chapters and converted the desktop rail/mobile disclosure into real page navigation. The three flagship case studies remain intact; the eleven additional public repositories now receive honest editorial portrait routes with public source linked only as a receipt.
- Adapted all four owner-supplied ZIP references into the existing art direction: rotating project atlas, native-scroll infinite artwork canvas with MEMORY/ACTION/EVIDENCE, three-act operating-method text choreography, and a drag/keyboard/scroll project slider.
- Rebuilt capability storytelling as an automatic theatre, About as an operating console, and Contact as a compact split layout plus authored epilogue. Hero media now paints from the stable poster, defers film attachment, uses metadata preload, and fades in only when playback begins.
- Added `AWWWARDS_ROADMAP.md` with a candid award-readiness audit and remaining launch gates. TypeScript passes; desktop visual checks cover the hero, atlas, infinite canvas, method, capability theatre, slider, About, Contact, route pages, and local project portraits. Production build and final route smoke remain the closing gates for this round.

### Round 47 — motion-performance and duplicate-content correction

- Removed the second project carousel because it repeated the repository atlas and kept a marquee running far outside the viewport. Replaced it with a distinct six-stage Operation Trace that explains frame → restore → constrain → execute → verify → return without presenting simulated telemetry as production evidence.
- Unified state changes around one transform/opacity easing family. Atlas, capability theatre, operation trace, infinite canvas titles, and method text now change through bounded crossfades and short spatial continuity instead of large blur layers.
- Halved atlas scrub ownership from 28 to 14 triggers, reduced infinite-canvas per-frame work from eighteen image tweens to one shared-plane transform, replaced fixed backdrop-filter surfaces with opaque equivalents, and allowed the exact cursor RAF to sleep when its unchanged physics state settles.
- Local production browser sampling at 1280×720 reports 1,150 DOM elements, 23 images, one video, zero canvas, and zero iframe. After settling, the actual Web Animations API reports zero running and zero offscreen-running CSS animations at top, mid-page, and footer; the earlier always-running `fieldMarquee` is gone. Heap and rAF frame timing were unavailable in the browser sandbox, so no FPS number is fabricated.
- Desktop hero and Operation Trace captures pass visual inspection. At 390×844 there is no horizontal overflow; mobile review also exposed and fixed a retained desktop `translateX(-50%)` on the responsive header. The final production rebuild reports clean console output on desktop, mobile, and `?motion=reduce`; every reduced-motion evidence word and method scene is visible, no hero video source attaches, and no animation remains running. Verifier 138/138, typecheck, and production build pass.
