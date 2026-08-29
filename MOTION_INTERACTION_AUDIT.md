# Motion and interaction pass

## Locked premise

The rendered composition is the source of truth. This pass preserves the current visual design, typography, color, content, section order, layout, imagery, and responsive compositions. Every change must disappear from a static resting-state comparison.

## Motion concept

This portfolio is about inspectable AI systems, and it should feel controlled and consequential because every movement resolves from signal to evidence rather than decorating the page.

Motion register: cinematic, technical, restrained. The physical analogue is a precision instrument moving through owned states: soft pursuit while exploring, decisive alignment when a result resolves, and pressure/release between dense proof chapters.

Motion tokens stay within the existing family:

- UI response: 180–420ms, `power3.out` / existing `--ease-out`
- Element reveal: 750–1000ms, `power4.out`
- Scroll scrub: 0.8–1.2 seconds of smoothing, linear progress with eased inner phases
- Pointer depth: 1–4px translation and under 2 degrees rotation
- Mobile and touch: no pointer depth, no large scrubbed transforms, no added pinning
- Reduced motion: complete static states, native scrolling, no cursor follower or parallax

## Section opportunity map

| Existing section | Current entrance | Current exit / connection | Motion-only decision |
| --- | --- | --- | --- |
| Hero | Asset-aware preloader, cinematic media/type intro | Media and lockup scale while the page cuts to paper | Add a controlled deconstruction: the existing identity, wordmark, and proof plate retire at different depths so the Thesis inherits the reading focus. No layout overlap or new graphic. |
| Operating thesis | Word-mask reveal and supporting one-time reveal | Static paper boundary into Selected systems | Keep the body mostly still. Let the existing words carry the scene; no extra parallax on readable text. |
| Selected systems | Word reveal plus three interactive proof routes | Existing material image begins immediately below | Preserve the route composition. Add shallow pointer depth to each existing route preview only; retain the existing hover fill and arrow treatment. |
| Material transition | Existing media parallax | Hard hand-off to JARVIS paper | Choreograph the existing label, headline, and counter as one scrubbed reveal while keeping the current media and static frame unchanged. |
| JARVIS | Scrubbed project plate and title drift | Evidence ledger ends above the recovery scene | Keep project structure static and legible. Existing architecture tabs and source receipts already provide interaction density. |
| ACTION to RECOVERY | Dedicated desktop sticky/scrub sequence; complete mobile/reduced composition | Resolves directly into HELIX | Preserve as the primary signature hand-off. Only verify timing, chrome quieting, and cleanup. |
| HELIX | Scrubbed project plate, recovery prototype, four owned decisions | Ends in paper proof hand-off | Preserve the long-form storytelling. It already has distinct depth and should not receive another competing effect. |
| Proof hand-off | Sticky word-by-word blur resolution | Resolves into QADAM evidence | Preserve as the second cinematic hand-off. Verify readable final state and reduced-motion parity. |
| QADAM | Scrubbed plate/title plus interactive evidence inspector and video proof | Long evidence chapter opens into Method paper | Keep motion evidence-led and quiet; no decorative exit added. |
| Method | Alternating kinetic type, scrubbed verdict and route | Paper ends abruptly at Active Field black | Create a typographic hand-off using only the existing capability heading and Active Field heading. The outgoing proof compresses while the incoming words resolve; no new section or wrapper. |
| Active Field | Existing heading reveal, clipped preview entry, interactive tabs | Direct black-to-paper About boundary | Keep the exit mostly static as a pressure-release beat. Pointer focus stays on the existing lab controls. |
| About | Heading reveal, orbit rotation/node parallax, ledger reveal | Existing ticker bridges into Contact | Preserve the quieter human passage. No parallax on the large readable statement. |
| Contact / finale | Moving signal band, form states, epilogue wordmark parallax | Complete still end state | Preserve as the final wow moment. Add restrained magnetic response to the existing CTAs and keep keyboard/focus behavior unchanged. |

## Strong motion moments

1. Hero deconstruction into the Operating thesis.
2. Selected systems through the existing material surface reveal.
3. Existing ACTION to RECOVERY signature hand-off.
4. Existing Recovery to Evidence proof hand-off.
5. Existing form to final invitation resolution.

## Signature hand-off specification

- Name: ACTION to RECOVERY
- Trigger: desktop scroll through the existing hand-off section
- Phases: ACTION retires → RECOVERY resolves → question and owned-failure route become legible
- Input: normal native-compatible vertical scroll through Lenis/ScrollTrigger
- Fallback: the complete RECOVERY state is present without the scrub
- Mobile: compact static hand-off with no added scroll distance
- Reduced motion: complete final state, native scroll, no blur or translation
- First three seconds: the existing Hero remains the only load-time focal scene

## Performance and accessibility guardrails

- One GSAP ticker remains the only smooth-scroll owner.
- No WebGL or additional animation dependency is introduced.
- Custom cursor work suspends while hidden and when settled, then resumes on pointer intent.
- Pointer effects run only on fine pointers and never replace keyboard focus feedback.
- New scroll choreography is desktop-only where large motion is involved.
- All listeners, RAF work, tweens, and triggers are reverted or removed on teardown.
