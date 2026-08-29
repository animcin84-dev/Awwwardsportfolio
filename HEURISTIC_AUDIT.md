# Portfolio heuristic and hierarchy audit

Reviewed: 2026-08-27
Scope: full portfolio narrative, with focused review of the post-case-study transition and Active Field chapter.

## Resolved findings

### H8 — Aesthetic and minimalist design · severity 3

The original Active Field used the same typographic row for four projects immediately after three highly authored flagship chapters. It was clean, but visually flattened the narrative at the point where the portfolio needed a second peak.

Resolution: one sticky dominant preview now carries the chapter. Each row changes a distinct 2D system signal; detail, repository status, and action remain in the list.

### H1 — Visibility of system status · severity 2

The previous hover treatment inverted a row but did not establish which project controlled any larger experience.

Resolution: the active row, signal number, project title, public-build badge, and preview scene update together. Pointer and keyboard focus use the same state owner.

### H6 — Recognition rather than recall · severity 2

Project domains and technical details were available only as compact row metadata, making comparison memory-heavy.

Resolution: every project retains persistent category, detail, and repository status while its scene turns the domain into a recognizable visual motif.

## Visual hierarchy verdict

- Entry point — pass. “Small bets. Real systems.” is the chapter promise; the large preview becomes the next dominant object.
- Eye flow — pass. Heading → preview → active project row → repository action forms one deliberate path.
- Weight — pass. The preview and heading are primary; row titles are secondary; technical metadata is tertiary.
- Emphasis — pass. Only one project is active at a time, and signal blue is reserved for system state and route information.

## Remaining validation

- Test the full page on low-power physical iOS and Android devices before public launch.
- Replace local runtime evidence with field Core Web Vitals after deployment.
