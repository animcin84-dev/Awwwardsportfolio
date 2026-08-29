export type WorkCatalogEntry = {
  slug: string;
  repo: string;
  name: string;
  index: string;
  kind: string;
  summary: string;
  signal: string;
  stack: string;
  year: string;
  tone: "cobalt" | "paper" | "acid" | "ember" | "violet" | "cyan";
};

export const workCatalog: WorkCatalogEntry[] = [
  { slug: "jarvis", repo: "jarvis-fable-5", name: "JARVIS", index: "01", kind: "Personal AI operating system", summary: "Persistent memory, tools, voice, and computer control in one inspectable operating layer.", signal: "Memory → tools → receipts", stack: "NEXT.JS · POSTGRES · MCP", year: "2026", tone: "cobalt" },
  { slug: "qadam", repo: "qadam-ai-techvision-2026", name: "QADAM", index: "02", kind: "Grounded document intelligence", summary: "Rental-contract risk analysis built around source grounding, privacy, and deterministic checks.", signal: "Clause → source → risk", stack: "RAG · EVALS · PRIVACY", year: "2026", tone: "paper" },
  { slug: "helix", repo: "Helix", name: "HELIX", index: "03", kind: "AI request operations", summary: "Planning, execution, observation, and recovery for multi-step AI work.", signal: "Fault → owner → recovery", stack: "AGENTS · EVENTS · RECOVERY", year: "2026", tone: "violet" },
  { slug: "aqylshahar", repo: "AqylShahar", name: "AQYLSHAHAR", index: "04", kind: "Urban intelligence", summary: "Local models, city maps, anomaly detection, and streaming signals for Almaty infrastructure.", signal: "City signal → local decision", stack: "MAPS · LOCAL LLM · STREAMS", year: "2026", tone: "cyan" },
  { slug: "consent-os", repo: "ContentOs", name: "CONSENT OS", index: "05", kind: "Privacy infrastructure", summary: "Consent audits, visible risk, data relationships, and decisions that remain observable.", signal: "Consent → risk → control", stack: "PRIVACY · GRAPH · AUDIT", year: "2026", tone: "acid" },
  { slug: "ustaz-ai", repo: "Ustaz-AI", name: "USTAZ AI", index: "06", kind: "Education ecosystem", summary: "A teacher workspace spanning vision, documents, lesson planning, and classroom tools.", signal: "See → understand → teach", stack: "VISION · DOCS · EDUCATION", year: "2026", tone: "paper" },
  { slug: "bayan-sulu-kids", repo: "bayan-sulu-kids", name: "BAYAN SULU KIDS", index: "07", kind: "Mobile learning", summary: "Speech, haptics, mini-games, and playful instruction for a branded learning experience.", signal: "Play → speak → learn", stack: "MOBILE · SPEECH · HAPTICS", year: "2026", tone: "ember" },
  { slug: "vtor-ai", repo: "vtor.ai", name: "VTOR.AI", index: "08", kind: "Circular-city service", summary: "AI material recognition, preparation guidance, acceptance points, and proof of drop-off.", signal: "Recognise → route → reward", stack: "VISION · MAPS · QR", year: "2026", tone: "acid" },
  { slug: "gargantua", repo: "gargantua-black-hole", name: "GARGANTUA", index: "09", kind: "Relativistic WebGL study", summary: "A physically motivated black-hole and accretion-disk experiment with adaptive performance.", signal: "Light → gravity → telemetry", stack: "WEBGL · GLSL · AUDIO", year: "2026", tone: "violet" },
  { slug: "tulki-rate", repo: "tulki-rate-", name: "TULKI RATE", index: "10", kind: "Trust infrastructure", summary: "Evidence-led reputation and course trust scores designed to make online learning claims legible.", signal: "Claim → proof → trust", stack: "REPUTATION · PROOF · SCORES", year: "2025", tone: "cobalt" },
  { slug: "website-jb", repo: "website-JB", name: "WEBSITE JB", index: "11", kind: "Web experiment", summary: "A public interface study from the repository archive, preserved as part of the build history.", signal: "Archive → surface → iteration", stack: "HTML · CSS · INTERACTION", year: "2025", tone: "paper" },
  { slug: "web-game-n", repo: "web-game-n", name: "WEB GAME N", index: "12", kind: "Interactive game study", summary: "A browser-play experiment exploring feedback, pacing, and responsive interaction.", signal: "Input → loop → feedback", stack: "WEB · GAME · MOTION", year: "2025", tone: "ember" },
  { slug: "ollama", repo: "ollama", name: "OLLAMA LAB", index: "13", kind: "Local model study", summary: "A repository study focused on local-model workflows and practical inference boundaries.", signal: "Local model → useful surface", stack: "LOCAL AI · INFERENCE", year: "2025", tone: "cyan" },
  { slug: "pyquest", repo: "PyQuest", name: "PYQUEST", index: "14", kind: "Python learning experiment", summary: "A compact public experiment connecting code, challenge design, and learning feedback.", signal: "Challenge → code → progress", stack: "PYTHON · LEARNING", year: "2025", tone: "acid" },
];

export const workBySlug = Object.fromEntries(workCatalog.map((project) => [project.slug, project])) as Record<string, WorkCatalogEntry>;

