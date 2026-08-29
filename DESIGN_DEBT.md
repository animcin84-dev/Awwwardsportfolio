# Design Debt Register

| Priority | Debt | Category | Current evidence | Resolution |
| --- | --- | --- | --- | --- |
| Critical | Every major section repeats dark grid, outline, tiny label, and circular ornament treatments | Visual / structural | Hero, KineticField, project cards, case media, principle, and portrait share the same grammar | Replace the repeated section stack with one persistent world and distinct camera compositions |
| Critical | The about portrait is explicitly labeled a substitute | Credibility | `PORTRAIT / SYSTEM SUBSTITUTE` is visible content | Remove the fake portrait surface; use honest personal copy and real links without simulating a photograph |
| High | Nine numbered sections and multiple progress counters add sequence theater | Content / hierarchy | `01-09`, `02 / 09`, edition rails, and scroll instructions compete with the work | Replace with named waypoints and one real progress map |
| High | Hero copy is mostly asset-based and very small relative to the stage | Accessibility / hierarchy | The wordmark image has an alt name but the thesis is a low-contrast micro label | Lead with a real H1 and keep the mark as identity, not primary content |
| High | Multiple infinite loops continue throughout the page | Performance | ticker, nodes, grids, orbits, crosshair, marquees, and video can animate together | Keep one visible world loop, pause it when hidden, and remove offscreen loops |
| Moderate | Motion tokens are implicit and inconsistent | Documentation / implementation | CSS timings and GSAP eases are scattered | Centralize durations/eases and document ownership |
| Moderate | Repeated uppercase microcopy weakens the personal voice | UX writing | labels dominate paragraphs and calls to action | Use sentence case for arguments and reserve uppercase for compact system metadata |
| Moderate | Mobile collapses desktop layouts but does not recompose the spatial story | Responsive | cards become overlays and several visual elements disappear | Author mobile camera endpoints and copy safe zones for every waypoint |
