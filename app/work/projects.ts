export type CaseStudyProject = {
  slug: "jarvis" | "helix" | "qadam";
  index: string;
  name: string;
  type: string;
  role: string;
  period: string;
  evidence: string;
  summary: string;
  thesis: string;
  challenge: string;
  decision: string;
  result: string;
  boundary: string;
  route: Array<{ label: string; title: string; detail: string }>;
  metrics: Array<{ value: string; label: string; note: string }>;
  receipts: Array<{ label: string; title: string; detail: string; href?: string }>;
  reflection: string;
  next: "jarvis" | "helix" | "qadam";
};

export const projects: Record<CaseStudyProject["slug"], CaseStudyProject> = {
  jarvis: {
    slug: "jarvis",
    index: "01 / 03",
    name: "JARVIS",
    type: "Personal AI operating system",
    role: "Product · Architecture · Full-stack build",
    period: "Independent R&D / 2024—2026",
    evidence: "Public source",
    summary: "A persistent operating layer across memory, voice, tools, and computer control.",
    thesis: "An AI answer becomes useful only when context, permission, action, and evidence survive the handoff.",
    challenge: "Useful context was scattered between interfaces, sessions, and tools. A model could produce a plausible answer while losing the state required to act safely—or claim completion without showing what actually happened.",
    decision: "I designed the system as an inspectable operation rather than a chat response: restore semantic context, resolve a model and allowed tools, expose execution state, and close only when a receipt returns.",
    result: "The public codebase documents one route from voice or text through semantic memory, model resolution, permission-aware tools, and server-sent execution events.",
    boundary: "The portfolio console is an authored working-interface visualization. The architecture, memory, permission, and event claims link to public implementation evidence.",
    route: [
      { label: "01 / INPUT", title: "Restore context", detail: "Voice or text enters with semantic memory attached." },
      { label: "02 / BOUNDARY", title: "Resolve safe tools", detail: "Permission levels separate safe, confirm, and denied actions." },
      { label: "03 / EXECUTION", title: "Expose state", detail: "Server-sent events make the operation observable." },
      { label: "04 / RESULT", title: "Return evidence", detail: "The answer ends with state the user can inspect." },
    ],
    metrics: [
      { value: "03 / 03", label: "Operation trace", note: "Context · tools · verified result" },
      { value: "MCP", label: "Tool boundary", note: "Explicit execution permissions" },
      { value: "SSE", label: "Observable state", note: "Live operation events" },
    ],
    receipts: [
      { label: "01 / FLOW", title: "Architecture map", detail: "Input → context → tools → SSE", href: "https://github.com/animcin84-dev/jarvis-fable-5#architecture-overview" },
      { label: "02 / MEMORY", title: "Context engine", detail: "Semantic retrieval source", href: "https://github.com/animcin84-dev/jarvis-fable-5/blob/main/lib/memory/context-engine.ts" },
      { label: "03 / SAFETY", title: "Permission boundary", detail: "Safe · confirm · deny", href: "https://github.com/animcin84-dev/jarvis-fable-5/blob/main/lib/execution/permissions.ts" },
      { label: "04 / EVENTS", title: "Observable route", detail: "Server-sent operation state", href: "https://github.com/animcin84-dev/jarvis-fable-5/blob/main/app/api/jarvis/events/route.ts" },
    ],
    reflection: "The important design move was separating fluency from trust. Memory makes the system continuous; permissions make it bounded; receipts make its work legible.",
    next: "helix",
  },
  helix: {
    slug: "helix",
    index: "02 / 03",
    name: "HELIX",
    type: "AI request operations",
    role: "System design · Interaction engineering",
    period: "Independent interaction proof / 2026",
    evidence: "Local prototype",
    summary: "Planning, execution, observation, and recovery for multi-step AI work.",
    thesis: "Retrying everything is not recovery. Verified work should survive the failure that follows it.",
    challenge: "Multi-step AI work often collapses into one vague error state. The user cannot see which step failed, who owns the next move, what remains valid, or whether a retry will repeat completed work.",
    decision: "I prototyped recovery as four owned decisions: isolate the failed boundary, preserve completed work, assign the retry, and refuse to close until evidence returns.",
    result: "The interaction proof makes a timeout inspectable and lets a visitor replay only observation while planning and execution remain complete.",
    boundary: "HELIX is a local interaction prototype, not a public production system. Its value is the explicit recovery model and keyboard-operable proof, not an unsupported deployment claim.",
    route: [
      { label: "01 / ISOLATE", title: "Keep the fault visible", detail: "The operation remains present instead of disappearing into an error toast." },
      { label: "02 / PRESERVE", title: "Retain verified work", detail: "Planning and execution checkpoints stay complete." },
      { label: "03 / OWN", title: "Name the next move", detail: "Observation owns the retry; the user is not blamed." },
      { label: "04 / PROVE", title: "Wait for the receipt", detail: "Completion resolves only after missing evidence returns." },
    ],
    metrics: [
      { value: "04 / 04", label: "Owned decisions", note: "Isolate · preserve · own · prove" },
      { value: "02", label: "Preserved steps", note: "Planning and execution remain complete" },
      { value: "01", label: "Safe replay", note: "Observation only" },
    ],
    receipts: [
      { label: "01 / SIGNAL", title: "Evidence timeout", detail: "The failed boundary stays inspectable" },
      { label: "02 / CHECKPOINT", title: "Step 02 complete", detail: "Earlier verified work is preserved" },
      { label: "03 / OWNER", title: "Observation worker", detail: "Recovery has an explicit owner" },
      { label: "04 / EXIT", title: "Receipt stored", detail: "No hopeful completion state" },
    ],
    reflection: "The prototype changed the question from “How do we hide failure?” to “What must remain true after failure?” That creates a much stronger interaction contract.",
    next: "qadam",
  },
  qadam: {
    slug: "qadam",
    index: "03 / 03",
    name: "QADAM",
    type: "Grounded document intelligence",
    role: "Product · RAG engineering",
    period: "Independent R&D / 2026",
    evidence: "Public evaluation",
    summary: "Contract risk analysis built around sources, privacy, and deterministic checks.",
    thesis: "A risk flag is useful only when the system can show why the claim is supported.",
    challenge: "Contract analysis carries asymmetric risk: an unsupported confident statement is worse than a visible limitation. Retrieval quality, citation coverage, privacy, and deterministic rules all need evidence boundaries.",
    decision: "I treated trust as a measurable system property. Findings link back to clauses, sensitive data is masked, high-confidence language is blocked without support, and the repository ships labelled queries and reproducible evaluation fixtures.",
    result: "The public evaluation reports 0.9231 clause-family micro-recall, 1.0 high-priority citation coverage, and a hit@5 threshold of at least 0.90 across 20 labelled queries.",
    boundary: "Published latency excludes HTTP, queue, PostgreSQL, and network time. That limitation stays visible instead of being presented as end-to-end production latency.",
    route: [
      { label: "01 / RETRIEVE", title: "Find the clause", detail: "Labelled queries test whether relevant evidence appears in the top five." },
      { label: "02 / GROUND", title: "Attach the source", detail: "Every high-priority finding must point back to evidence." },
      { label: "03 / GUARD", title: "Block unsupported confidence", detail: "Deterministic rules constrain what reaches the user." },
      { label: "04 / VERIFY", title: "Measure the boundary", detail: "Fixtures, tests, and reports make quality reproducible." },
    ],
    metrics: [
      { value: "0.9231", label: "Clause-family recall", note: "Three reproducible demo contracts" },
      { value: "1.00", label: "Citation coverage", note: "High-priority findings" },
      { value: "≥0.90", label: "Retrieval hit@5", note: "20 labelled queries" },
    ],
    receipts: [
      { label: "01 / METRICS", title: "Evaluation result", detail: "Machine-readable report", href: "https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/docs/evaluation-results.json" },
      { label: "02 / FIXTURES", title: "Labelled queries", detail: "Retrieval evaluation set", href: "https://github.com/animcin84-dev/qadam-ai-techvision-2026/tree/main/evaluation" },
      { label: "03 / TESTS", title: "Backend suite", detail: "120 backend · 22 frontend", href: "https://github.com/animcin84-dev/qadam-ai-techvision-2026/tree/main/apps/api/tests" },
      { label: "04 / PRODUCT", title: "Release artifact", detail: "Deterministic walkthrough", href: "https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/release/QADAM_AI_fallback_demo.mp4" },
    ],
    reflection: "The strongest product choice was making uncertainty visible. Evaluation is not a badge after the build; it is part of the interface contract.",
    next: "jarvis",
  },
};

export const projectList = Object.values(projects);
