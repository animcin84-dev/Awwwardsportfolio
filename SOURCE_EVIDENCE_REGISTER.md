# Source Evidence Register

Verified 2026-08-28 against the public repositories on their `main` branches. This register controls which portfolio claims may be presented as public-source evidence. A visual reconstruction is never treated as production proof.

## JARVIS

| Claim | Confidence | Primary source | Portfolio treatment |
| --- | --- | --- | --- |
| Voice/text enters an orchestration route that resolves a model, builds semantic context, exposes tools, and emits SSE state | High | [Architecture overview](https://github.com/animcin84-dev/jarvis-fable-5#architecture-overview) | Public architecture |
| Persistent semantic memory uses PostgreSQL and pgvector | High | [Context engine](https://github.com/animcin84-dev/jarvis-fable-5/blob/main/lib/memory/context-engine.ts) and repository README tech stack | Public implementation |
| Tool execution has explicit permission levels | High | [Permission boundary](https://github.com/animcin84-dev/jarvis-fable-5/blob/main/lib/execution/permissions.ts) | Public implementation |
| Runtime progress is exposed through server-sent events | High | [Event route](https://github.com/animcin84-dev/jarvis-fable-5/blob/main/app/api/jarvis/events/route.ts) | Public implementation |
| Dangerous remote commands use an approval queue and destructive-command guard | High | [Repository security notes](https://github.com/animcin84-dev/jarvis-fable-5#remote-phone-access) | Documented source claim |
| The portfolio console is the production JARVIS UI | Rejected | No source | The console is labelled as an authored working-interface visualization, not product footage |

## QADAM

| Claim | Confidence | Primary source | Portfolio treatment |
| --- | --- | --- | --- |
| Clause-family micro-recall is 0.9231 across three reproducible demo contracts | High | [Machine-readable evaluation report](https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/docs/evaluation-results.json) | Public evaluation metric |
| High-priority citation coverage is 1.0 | High | [Machine-readable evaluation report](https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/docs/evaluation-results.json) | Public evaluation metric |
| Retrieval hit@5 threshold is at least 0.90 across 20 labelled queries | High | [Quality methodology](https://github.com/animcin84-dev/qadam-ai-techvision-2026#проверка-качества) and [evaluation fixtures](https://github.com/animcin84-dev/qadam-ai-techvision-2026/tree/main/evaluation) | Public evaluation metric |
| Current suite contains 120 backend and 22 frontend tests | High | [Quality methodology](https://github.com/animcin84-dev/qadam-ai-techvision-2026#проверка-качества) | Public repository count; update if the repository changes |
| The fallback walkthrough is a shipped release artifact | High | [Release video](https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/release/QADAM_AI_fallback_demo.mp4) | Public product footage with fallback limitation visible |
| Published latency represents end-to-end production latency | Rejected | The evaluation explicitly excludes HTTP, queue, PostgreSQL, and network time | Boundary remains visible beside the metrics |

## Maintenance rule

Before changing a public metric, verify the linked primary artifact, record the verification date, and update the adjacent portfolio copy in the same change. If a link disappears or a source contradicts the claim, downgrade it to a prototype claim or remove it.
