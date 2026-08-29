# Gates — Awwwards-quality portfolio acceptance

OWNS: `app/**`, `public/**`, `scripts/**`, `package.json`, `README.md`, `BRIEF.md`, `design-system.md`, and the current design-loop/debt records.

“Awwwards quality” is a craft acceptance bar. These gates never assert an award, client, or recognition that has not been independently verified.

- [x] G0 — Art direction and implementation match the current non-3D brief.
  - Evidence: `BRIEF.md`, `EXPERIENCE_SPINE.md`, `WORLD_BIBLE.md`, and `README.md` all describe the shipped liquid-metal/editorial system and explicitly exclude the retired 3D prototype.

- [x] G1 — TypeScript application has no type errors.
  - Check: `npm run typecheck`
  - Expected: exit 0.

- [x] G2 — Structural, content, accessibility, motion, and launch-source contracts pass.
  - Check: `npm run verify`
  - Current evidence: `portfolio source verification passed (117 checks)`.

- [x] G3 — Optimized Next.js production build completes without warnings.
  - Check: `npm run build`
  - Current evidence: 68.4KB route JS, 171KB first-load JS, static identity/manifest/social routes, dynamic contact endpoint.

- [x] G4 — Desktop, mobile, narrow-landscape/text-scale equivalent, and reduced-motion renders preserve hierarchy.
  - Current evidence: 1440×900, 390×844, and 720×450 browser checks show zero horizontal overflow; the first viewport exposes the semantic chrome-wordmark H1, independent role, proposition, and action without duplicate plain-text identity; the hero selects an art-directed 404×720 portrait source on phones and the 1280×720 master on desktop; fine-pointer desktop identity/plate drift stays within a few pixels and resets after leave, while coarse and reduced-motion contexts remain centered; reduced motion renders the complete poster without a video source; Selected Work exposes three direct visual proof routes inside one viewport—its desktop evidence band ends at 852.2px and the complete 844px mobile chapter ends its route at 795.6px; HELIX keeps its desktop sticky/scrubbed hierarchy while mobile uses a 1,757px static ledger with 293–321px beats and no desktop timeline state; fresh desktop/mobile recovery hashes survive the preloader and land below fixed chrome; the QADAM release walkthrough reflows into a single-column mobile proof scene; MENU and expanded destinations meet the 44px project floor; grouped desktop and exact mobile current states remain visible and semantic. At 390×844 the mobile chrome yields completely after downward intent, returns after 24px of upward travel, stays pinned while open, and remains fixed under reduced motion; desktop remains visible at y=15,000.

- [x] G5 — Static and progressive fallbacks remain complete.
  - Current evidence: reduced-motion reports poster media, no attached video source, no hidden reveal nodes, and a complete focusable route; save-data and reported connection tiers below `4g` also retain the complete poster instead of attaching either hero film; the portrait phone source is 516,789 bytes and has no audio; the ready hero has no forced minimum loader hold and exits through a 320ms reveal while the real-resource timeout remains; the Active Field selector and synchronized repository destination remain functional; raw server HTML contains the H1, project content, contact form, and noscript final-state CSS.

- [x] G6 — Launch identity and sharing routes are authored and valid.
  - Current evidence: manifest returns `application/manifest+json`; OG returns `image/jpeg` at 1200×630; favicon returns `image/png`; metadata includes theme, icon, Apple icon, schema, OG, and Twitter image.

- [x] G7 — Baseline security and caching are present.
  - Current evidence: production responses include `nosniff`, `DENY` framing, strict referrer policy, and disabled camera/microphone/geolocation; hero fallbacks, wordmark, mark, and manifest icons receive long-lived cache rules.

- [x] G7a — Responsive identity media does not ship full-size candidates into compact slots.
  - Current evidence: at 390×844 the production browser selects a 33.3KB `w=640` hero wordmark and 1.1KB `w=64` About mark; at 1440×900 it selects `w=1080` and `w=96`.

- [x] G8 — The current implementation has a complete fresh independent design-loop verdict.
  - Current evidence: Round 27 rechecked the responsive hero art direction after Round 26 connected JARVIS and QADAM claims to eight exact public source artifacts. Desktop/mobile captures preserve hierarchy and scanability; fresh-context critics returned brief **GOOD ENOUGH**, system **GOOD ENOUGH**, and craft **ours wins**. Earlier unavailable reviews remain historical and are not relabelled.

- [ ] G9 — Public submission evidence is complete.
  - Requires: final canonical domain, a configured and verified private webhook or persistent volume, real-device performance field data, and any genuine client/adoption/testimonial proof the owner chooses to provide.
