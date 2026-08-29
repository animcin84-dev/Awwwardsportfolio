import Image from "next/image";
import { Capabilities } from "./components/Capabilities";
import { AboutSystem } from "./components/AboutSystem";
import { ContactForm } from "./components/ContactForm";
import { OperationTrace } from "./components/OperationTrace";
import { HeroPointer } from "./components/HeroPointer";
import { HeroVideo } from "./components/HeroVideo";
import { HelixRecovery } from "./components/HelixRecovery";
import { MotionSystem } from "./components/MotionSystem";
import { MotionWords } from "./components/MotionWords";
import { Navigation } from "./components/Navigation";
import { Preloader } from "./components/Preloader";
import { InfiniteEvidenceCanvas } from "./components/InfiniteEvidenceCanvas";
import { MethodTextMotion } from "./components/MethodTextMotion";
import { RotatingProjectAtlas } from "./components/RotatingProjectAtlas";
import { JarvisArchitectureInspector, QadamEvidenceInspector } from "./components/ProjectInspection";
import { QadamDemoVideo } from "./components/QadamDemoVideo";
import { RevealWatcher } from "./components/RevealWatcher";
import { ScrollProgress } from "./components/ScrollProgress";

function ExternalNote() {
  return <span className="sr-only">, opens in a new tab</span>;
}

const methodStatement = "Useful AI has to hold context, choose a safe move, and return evidence that the result is real.";
const proofHandoffStatement = "Recovery keeps the operation alive. Evidence makes it trustworthy.";
const proofHandoffWords = proofHandoffStatement.split(" ");

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="portfolio-page" id="top" aria-busy="true">
      <a className="skip-link" href="#project-universe">Skip to project atlas</a>
      <MotionSystem /><RevealWatcher /><Navigation /><ScrollProgress />

      <section className="hero-section" id="hero" data-nav-section data-nav-label="Index" data-theme="dark">
        <HeroPointer />
        <div className="hero-media" aria-hidden="true"><HeroVideo /><div className="hero-media-shade" /><div className="hero-media-grain" /></div>
        <div className="hero-frame" data-motion-intro>
          <p className="hero-coordinate">D.B / PORTFOLIO 2026</p>
          <p className="hero-side-label">AI SYSTEMS · PRODUCT · INTERACTION</p>
          <div className="hero-lockup">
            <div className="hero-identity-depth">
              <div className="hero-readable-identity">
                <p className="hero-role">Independent AI systems builder</p>
              </div>
            </div>
            <h1 className="hero-wordmark-heading">
              <Image
                className="hero-wordmark"
                src="/daniyal-wordmark.webp"
                width={2172}
                height={724}
                sizes="(max-width: 640px) 92vw, (max-width: 1316px) 76vw, 1000px"
                alt="Daniyal Bauyrzhan"
                priority
                data-preload-critical
              />
            </h1>
            <div className="hero-proof-depth">
              <div className="hero-proof-plate">
                <p className="hero-thesis">I build AI systems that remember, act, and prove the result.</p>
                <div className="hero-proof-route" aria-label="Core system loop: memory, action, evidence">
                  <span>Memory</span><i aria-hidden="true" /><span>Action</span><i aria-hidden="true" /><span>Evidence</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom"><span>D/01</span><span>Independent builder · Almaty</span><a href="#project-universe" data-cursor="action" data-label="VIEW ↘">Enter project atlas <b aria-hidden="true">↘</b></a></div>
        </div>
      </section>

      <section className="statement-section paper-section" id="statement" data-nav-section data-nav-label="Thesis" data-theme="light" aria-labelledby="statement-title">
        <div className="section-shell statement-shell">
          <h2 className="sr-only" id="statement-title">Operating thesis</h2>
          <div className="section-index" data-reveal><span>01</span><span>Operating thesis</span></div>
          <div className="statement-lines" aria-label="Intelligence becomes useful when it can remember, act, and verify.">
            <p className="manifesto-line" data-split="words" aria-label="Intelligence becomes useful"><MotionWords text="Intelligence becomes useful" /></p>
            <p className="manifesto-line is-offset" data-split="words" aria-label="when it can remember,"><MotionWords text="when it can remember," /></p>
            <p className="manifesto-line is-accent" data-split="words" aria-label="act, and verify."><MotionWords text="act, and verify." /></p>
          </div>
          <div className="statement-foot" data-reveal>
            <p>Not another interface wrapped around a model. I build the memory, tools, safeguards, and product surface as one legible system.</p>
            <div className="statement-route" aria-hidden="true"><span>INPUT</span><i /><span>MEMORY</span><i /><span>ACTION</span><i /><span>EVIDENCE</span></div>
          </div>
        </div>
      </section>

      <section className="work-intro dark-section" id="work" data-nav-section data-nav-label="Selected work" data-theme="dark">
        <div className="section-shell work-intro-shell">
          <div className="section-index" data-reveal><span>02</span><span>Selected systems</span></div>
          <h2 data-split="words" aria-label="Built from the inside out."><MotionWords text="Built from the inside out." /></h2>
          <div className="work-intro-copy" data-reveal><p>Independent systems, presented without client theatre: public source and measured evidence where they exist, an explicit interaction proof where they do not.</p><span>INDEPENDENT R&amp;D / 2024—2026</span></div>
          <nav className="work-proof-route" aria-label="Selected project shortcuts" data-reveal>
            <a href="/work/jarvis" data-cursor="action" data-label="CASE ↗">
              <span className="work-route-number">01</span>
              <span className="work-route-name">JARVIS</span>
              <span className="work-route-visual work-route-jarvis" aria-hidden="true"><small>Operation trace</small><strong>03 / 03</strong><em>Read context · Resolve tools · Write</em></span>
              <span className="work-route-proof"><small>Evidence type</small><strong>Public source</strong><em>Memory → tools → receipts</em></span>
              <b aria-hidden="true">↗</b>
            </a>
            <a href="/work/helix" data-cursor="action" data-label="CASE ↗">
              <span className="work-route-number">02</span>
              <span className="work-route-name">HELIX</span>
              <span className="work-route-visual work-route-helix" aria-hidden="true"><small>Recovery path</small><strong>04 / 04</strong><em>Isolate · Preserve · Own · Prove</em></span>
              <span className="work-route-proof"><small>Evidence type</small><strong>Interaction proof</strong><em>Fault → owner → receipt</em></span>
              <b aria-hidden="true">↗</b>
            </a>
            <a href="/work/qadam" data-cursor="action" data-label="CASE ↗">
              <span className="work-route-number">03</span>
              <span className="work-route-name">QADAM</span>
              <span className="work-route-visual work-route-qadam" aria-hidden="true"><small>Evaluation</small><strong>0.9231</strong><em>142 tests · 20 labelled queries</em></span>
              <span className="work-route-proof"><small>Evidence type</small><strong>Public evaluation</strong><em>Retrieval → flags → checks</em></span>
              <b aria-hidden="true">↗</b>
            </a>
          </nav>
        </div>
      </section>

      <section className="material-transition" id="material" aria-label="Transition into selected work" data-theme="dark">
        <div className="material-transition-media" aria-hidden="true" />
        <div className="material-transition-copy"><span>SURFACE / EVIDENCE</span><strong>The surface opens.<br />The system shows.</strong><i>01—03</i></div>
      </section>

      <RotatingProjectAtlas />
      <InfiniteEvidenceCanvas />

      {false && <>
      <article className="project project-jarvis" id="jarvis" tabIndex={-1} data-project data-nav-section data-nav-label="JARVIS" data-theme="light">
        <div className="project-sticky">
          <header className="project-head"><div className="project-number">01 / 03</div><div className="project-type">Personal AI operating system</div><div className="project-role">Product · Engineering · Interaction</div></header>
          <div className="project-title-row"><h2>JARVIS</h2><div className="project-summary"><p>Persistent memory, tools, voice, and computer control — designed as an inspectable operating layer.</p><div className="project-proofline"><span>Built result</span><strong>One persistent operating layer across memory, voice, and tools.</strong></div></div></div>
          <div className="project-visual project-visual-jarvis" data-project-visual>
            <div className="window-chrome"><span /><span /><span /><b>JARVIS / OPERATION CONSOLE</b><em>SOURCE-BACKED</em></div>
            <div className="jarvis-console" aria-hidden="true">
              <div className="console-request"><span>ACTIVE REQUEST / 021</span><strong>Turn the product brief into an owned launch checklist.</strong><p>Context restored from the previous planning session.</p><i>MEMORY ATTACHED</i></div>
              <div className="console-operations"><span>OPERATION TRACE</span><div><b>01</b><strong>Read context</strong><em>Complete</em></div><div><b>02</b><strong>Resolve tools</strong><em>Complete</em></div><div><b>03</b><strong>Write checklist</strong><em>Verified</em></div></div>
              <div className="console-receipt"><span>EXECUTION RECEIPT</span><strong>03 / 03</strong><p>Every action returned state and evidence.</p><div><i /><i /><i /></div></div>
            </div>
            <div className="visual-caption"><span>Working interface / 01</span><strong>The answer ends with a receipt.</strong></div>
          </div>
          <section className="jarvis-evidence" aria-labelledby="jarvis-proof-title">
            <div className="jarvis-evidence-lead"><span>PUBLIC BUILD / VERIFIED SOURCE</span><h3 id="jarvis-proof-title">A real operating stack, not a concept frame.</h3><p>The public codebase documents the route from voice or text through semantic memory, model resolution, tool execution, and a live event stream.</p><a href="https://github.com/animcin84-dev/jarvis-fable-5" target="_blank" rel="noreferrer" data-cursor="action" data-label="OPEN ↗">Inspect source ↗<ExternalNote /></a></div>
            <div className="jarvis-architecture-wrap"><div className="jarvis-architecture-silk" aria-hidden="true" /><JarvisArchitectureInspector /></div>
            <nav className="source-receipts source-receipts-dark" aria-label="JARVIS source receipts">
              <a href="https://github.com/animcin84-dev/jarvis-fable-5#architecture-overview" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>01 / FLOW</span><strong>Architecture map</strong><em>Input → context → tools → SSE</em><b aria-hidden="true">↗</b><ExternalNote /></a>
              <a href="https://github.com/animcin84-dev/jarvis-fable-5/blob/main/lib/memory/context-engine.ts" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>02 / MEMORY</span><strong>Context engine</strong><em>Semantic retrieval source</em><b aria-hidden="true">↗</b><ExternalNote /></a>
              <a href="https://github.com/animcin84-dev/jarvis-fable-5/blob/main/lib/execution/permissions.ts" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>03 / SAFETY</span><strong>Permission boundary</strong><em>Safe · confirm · deny</em><b aria-hidden="true">↗</b><ExternalNote /></a>
              <a href="https://github.com/animcin84-dev/jarvis-fable-5/blob/main/app/api/jarvis/events/route.ts" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>04 / EVENTS</span><strong>Observable state</strong><em>Server-sent event route</em><b aria-hidden="true">↗</b><ExternalNote /></a>
            </nav>
            <div className="repo-ledger"><div><span>ROLE</span><strong>Product, architecture, full-stack build</strong></div><div><span>SHIPPED SCOPE</span><strong>Next.js 15 · PostgreSQL · pgvector · MCP</strong></div><div><span>SAFETY</span><strong>Approval queue + destructive-command guard</strong></div><div><span>REPOSITORY</span><strong>Public source / documented architecture</strong></div></div>
          </section>
          <footer className="project-foot"><div><span>Constraint</span><strong>Context across tools</strong></div><div><span>Built proof</span><strong>Memory + MCP tool bus</strong></div><div><span>Evidence</span><strong>Receipt-backed actions</strong></div><a href="https://github.com/animcin84-dev/jarvis-fable-5" target="_blank" rel="noreferrer" data-cursor="action" data-label="OPEN ↗">Open repository ↗<ExternalNote /></a></footer>
        </div>
      </article>

      <section className="recovery-handoff dark-section" data-theme="dark" aria-labelledby="recovery-handoff-title">
        <div className="recovery-handoff-sticky">
          <div className="recovery-handoff-meta" aria-hidden="true">
            <span>CASE HANDOFF / 01 → 02</span><i /><span>EXECUTION → RECOVERY</span>
          </div>
          <div className="recovery-handoff-stage">
            <p className="recovery-handoff-kicker">THE OPERATION COMPLETED.</p>
            <div className="recovery-handoff-words" aria-hidden="true">
              <span className="recovery-handoff-word is-action">ACTION</span>
              <span className="recovery-handoff-word is-recovery">RECOVERY</span>
            </div>
            <h2 id="recovery-handoff-title">What stays visible when the next step fails?</h2>
            <div className="recovery-handoff-route" aria-hidden="true"><span>RESULT</span><i /><b>OWNED FAILURE</b></div>
          </div>
          <div className="recovery-handoff-foot"><span>THE HARD PART STARTS AFTER THE HAPPY PATH</span><strong>NEXT / HELIX</strong></div>
        </div>
      </section>

      <article className="project project-helix" id="helix" data-project data-nav-section data-nav-label="HELIX" data-theme="dark">
        <div className="project-sticky">
          <header className="project-head"><div className="project-number">02 / 03</div><div className="project-type">AI request operations</div><div className="project-role">System design · Engineering</div></header>
          <div className="project-title-row"><h2>HELIX</h2><div className="project-summary"><p>Planning, execution, observation, and recovery for multi-step AI work.</p><div className="project-proofline"><span>Interaction proof</span><strong>A local prototype makes failure ownership and recovery visible.</strong></div></div></div>
          <div className="project-visual project-visual-helix" data-project-visual>
            <HelixRecovery />
            <div className="visual-caption"><span>Recovery / 04</span><strong>Fail visibly. Recover deliberately.</strong></div>
          </div>
          <footer className="project-foot"><div><span>Constraint</span><strong>Multi-step failure</strong></div><div><span>Proof type</span><strong>Interaction prototype</strong></div><div><span>Recovery</span><strong>Inspectable paths</strong></div><a href="#helix-recovery-model" data-cursor="action" data-label="READ ↓">Read the recovery model ↓</a></footer>
        </div>

        <section className="helix-anatomy" id="helix-recovery-model" aria-labelledby="helix-anatomy-title">
          <div className="helix-anatomy-grid">
            <header className="helix-anatomy-head">
              <span>CASE NOTE / LOCAL PROTOTYPE</span>
              <h3 id="helix-anatomy-title">Retrying everything is not recovery.</h3>
              <p>HELIX tests a narrower idea: preserve verified work, isolate the fault, give the retry an owner, and close only when a receipt returns.</p>
              <div className="helix-anatomy-meter" aria-hidden="true"><i data-helix-meter /></div>
              <small>SCROLL / FOUR OWNED DECISIONS</small>
            </header>

            <div className="helix-anatomy-beats" role="list" aria-label="HELIX recovery model">
              <article className="helix-anatomy-beat is-fault" role="listitem" data-helix-beat>
                <div className="helix-beat-index"><span>01</span><em>FAULT ISOLATED</em></div>
                <h4>Observation stopped. The operation did not disappear.</h4>
                <p>The prototype keeps the failed boundary visible instead of turning a system timeout into a vague user error.</p>
                <dl><div><dt>Signal</dt><dd>Evidence timeout</dd></div><div><dt>Preserved</dt><dd>Plan + execution</dd></div><div><dt>Exit guard</dt><dd>No blind full replay</dd></div></dl>
              </article>
              <article className="helix-anatomy-beat" role="listitem" data-helix-beat>
                <div className="helix-beat-index"><span>02</span><em>STATE PRESERVED</em></div>
                <h4>Completed work becomes a checkpoint, not collateral damage.</h4>
                <p>The safe path begins from the last owned state. Earlier steps remain legible and untouched.</p>
                <dl><div><dt>Checkpoint</dt><dd>Step 02 / complete</dd></div><div><dt>Invariant</dt><dd>Inputs unchanged</dd></div><div><dt>Scope</dt><dd>Observation only</dd></div></dl>
              </article>
              <article className="helix-anatomy-beat is-signal" role="listitem" data-helix-beat>
                <div className="helix-beat-index"><span>03</span><em>RETRY OWNED</em></div>
                <h4>The next move names both its action and its owner.</h4>
                <p>Recovery is constrained to the missing observation and assigned to the worker that can resolve it.</p>
                <dl><div><dt>Owner</dt><dd>Observation worker</dd></div><div><dt>Action</dt><dd>Retry observation</dd></div><div><dt>Boundary</dt><dd>One missing step</dd></div></dl>
              </article>
              <article className="helix-anatomy-beat is-receipt" role="listitem" data-helix-beat>
                <div className="helix-beat-index"><span>04</span><em>RECEIPT RETURNED</em></div>
                <h4>Completion is a visible result, not a hopeful state.</h4>
                <p>The operation can close only after the missing evidence is attached. This is the prototype&apos;s proof boundary—not a public production claim.</p>
                <dl><div><dt>Result</dt><dd>Receipt stored</dd></div><div><dt>Repeated</dt><dd>No earlier work</dd></div><div><dt>Proof type</dt><dd>Local interaction</dd></div></dl>
              </article>
            </div>
          </div>
        </section>
      </article>

      <section className="proof-handoff paper-section" data-theme="light" aria-labelledby="proof-handoff-title">
        <div className="proof-handoff-sticky">
          <div className="proof-handoff-meta" aria-hidden="true"><span>FAILURE → RECOVERY</span><i /><span>CLAIM → SOURCE</span></div>
          <h2 id="proof-handoff-title" aria-label={proofHandoffStatement}>
            {proofHandoffWords.map((word, index) => <span key={`${word}-${index}`}><span className="proof-handoff-word" aria-hidden="true">{word}</span>{index < proofHandoffWords.length - 1 ? " " : null}</span>)}
          </h2>
          <div className="proof-handoff-foot"><span>RECOVERY IS NOT THE FINISH LINE</span><strong>NEXT / QADAM</strong></div>
        </div>
      </section>

      <article className="project project-qadam" id="qadam" data-project data-nav-section data-nav-label="QADAM" data-theme="dark">
        <div className="project-sticky">
          <header className="project-head"><div className="project-number">03 / 03</div><div className="project-type">Grounded document intelligence</div><div className="project-role">Product · RAG engineering</div></header>
          <div className="project-title-row"><h2>QADAM</h2><div className="project-summary"><p>Contract risk analysis built around sources, privacy, and deterministic checks.</p><div className="project-proofline"><span>Built result</span><strong>Every risk flag points back to evidence.</strong></div></div></div>
          <div className="project-visual project-visual-qadam" data-project-visual>
            <QadamEvidenceInspector />
            <div className="visual-caption"><span>Grounding / 03</span><strong>No source, no confident claim.</strong></div>
          </div>
          <footer className="project-foot"><div><span>Constraint</span><strong>Unsupported claims</strong></div><div><span>Built proof</span><strong>Source-linked flags</strong></div><div><span>Guard</span><strong>Private by default</strong></div><a href="https://github.com/animcin84-dev/qadam-ai-techvision-2026" target="_blank" rel="noreferrer" data-cursor="action" data-label="OPEN ↗">Open repository ↗<ExternalNote /></a></footer>
        </div>
        <section className="qadam-evaluation" aria-labelledby="qadam-evaluation-title">
          <div className="qadam-evaluation-head">
            <span>REPRODUCIBLE EVALUATION / PUBLIC REPOSITORY</span>
            <h3 id="qadam-evaluation-title">Trust was treated as a measurable system property.</h3>
            <p>Not a marketing claim: the repository ships labelled retrieval queries, deterministic demo contracts, automated tests, and an evaluation report with explicit boundaries.</p>
          </div>
          <div className="qadam-demo-anchor" id="qadam-demo" aria-hidden="true" />
          <figure className="qadam-demo" aria-labelledby="qadam-demo-title">
            <div className="qadam-demo-frame">
              <div className="qadam-demo-chrome" aria-hidden="true"><span /><span /><span /><b>QADAM / VERIFIED WALKTHROUGH</b><em>PUBLIC RELEASE ARTIFACT</em></div>
              <QadamDemoVideo />
            </div>
            <figcaption>
              <div><span>REAL PRODUCT FOOTAGE / 01</span><h4 id="qadam-demo-title">The proof now shows the product, not a portfolio reconstruction.</h4></div>
              <p>This deterministic fallback walkthrough is shipped in the public repository and exercises the same demo contract used by the reproducible evaluation path.</p>
              <a href="https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/release/QADAM_AI_fallback_demo.mp4" target="_blank" rel="noreferrer" data-cursor="action" data-label="OPEN ↗">Inspect release artifact ↗<ExternalNote /></a>
            </figcaption>
          </figure>
          <div className="qadam-metrics" aria-label="QADAM verified evaluation metrics">
            <div><span>CLAUSE FAMILY<br />MICRO-RECALL</span><strong>0.9231</strong><small>Across three reproducible demo contracts</small></div>
            <div><span>HIGH-PRIORITY<br />CITATION COVERAGE</span><strong>1.00</strong><small>Every high-priority finding linked to evidence</small></div>
            <div><span>RETRIEVAL<br />HIT@5</span><strong>≥0.90</strong><small>20 labelled legal retrieval queries</small></div>
          </div>
          <div className="qadam-verification">
            <div><span>120</span><strong>Backend tests</strong></div><div><span>22</span><strong>Frontend tests</strong></div><div><span>20</span><strong>Labelled queries</strong></div>
            <p>Evaluation boundary: the published latency baseline excludes HTTP, queue, PostgreSQL, and network time. The portfolio keeps that limitation visible.</p>
          </div>
          <nav className="source-receipts source-receipts-light" aria-label="QADAM source receipts">
            <a href="https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/docs/evaluation-results.json" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>01 / METRICS</span><strong>Evaluation result</strong><em>Machine-readable report</em><b aria-hidden="true">↗</b><ExternalNote /></a>
            <a href="https://github.com/animcin84-dev/qadam-ai-techvision-2026/tree/main/evaluation" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>02 / FIXTURES</span><strong>Labelled queries</strong><em>Retrieval evaluation set</em><b aria-hidden="true">↗</b><ExternalNote /></a>
            <a href="https://github.com/animcin84-dev/qadam-ai-techvision-2026/tree/main/apps/api/tests" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>03 / TESTS</span><strong>Backend suite</strong><em>Rules · privacy · grounding</em><b aria-hidden="true">↗</b><ExternalNote /></a>
            <a href="https://github.com/animcin84-dev/qadam-ai-techvision-2026/blob/main/release/QADAM_AI_fallback_demo.mp4" target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗"><span>04 / PRODUCT</span><strong>Release artifact</strong><em>Deterministic walkthrough</em><b aria-hidden="true">↗</b><ExternalNote /></a>
          </nav>
          <a className="qadam-evaluation-link" href="https://github.com/animcin84-dev/qadam-ai-techvision-2026#проверка-качества" target="_blank" rel="noreferrer" data-cursor="action" data-label="READ ↗">Read the verification methodology <b aria-hidden="true">↗</b><ExternalNote /></a>
        </section>
      </article>
      </>}

      <section className="method-section" id="method" data-nav-section data-nav-label="Method" data-theme="light" aria-labelledby="method-title">
        <div className="section-shell method-shell">
          <h2 className="sr-only" id="method-title">Operating method</h2>
          <div className="section-index" data-reveal><span>03</span><span>Operating method</span></div>
          <div className="method-lead" data-reveal><p>Every useful system has to cross three thresholds.</p><span>CONTEXT → CONSTRAINT → RECEIPT</span></div>
          <MethodTextMotion />
          <div className="method-capabilities" aria-labelledby="capabilities-title">
            <div className="method-capabilities-head" data-reveal><span>CAPABILITY SET / WITHIN METHOD</span><h3 id="capabilities-title">What I bring to the operation.</h3></div>
            <Capabilities />
          </div>
        </div>
      </section>

      <section className="experiments-section dark-section" id="experiments" data-nav-section data-nav-label="Protocol" data-theme="dark">
        <div className="section-shell experiments-shell">
          <div className="experiments-head"><div className="section-index" data-reveal><span>04</span><span>Operating protocol</span></div><h2 data-split="words" aria-label="One operation. Every state visible."><MotionWords text="One operation. Every state visible." /></h2></div>
          <OperationTrace />
        </div>
      </section>

      <section className="about-section paper-section" id="about" data-nav-section data-nav-label="About" data-theme="light" data-profile="operator-loop">
        <div className="section-shell about-shell">
          <div className="section-index" data-reveal><span>05</span><span>About Daniyal</span></div>
          <div className="about-heading">
            <h2 data-split="words" aria-label="I turn model capability into product behavior."><MotionWords text="I turn model capability into product behavior." /></h2>
            <p data-reveal>One owner across product logic, system architecture, interaction, and the evidence that proves the result.</p>
          </div>
          <AboutSystem />
          <div className="about-facts" data-reveal><span>ALMATY / KZ</span><span>OPEN TO COLLABORATION</span><span>REMOTE / GLOBAL</span><span>PRODUCT → PROOF</span></div>
          <p className="about-human-note" data-reveal>I care about the moment an ambitious model meets an actual person: the handoff, the uncertainty, and the proof that lets them trust the next move.</p>
        </div>
      </section>

      <section className="contact-section" id="contact" data-nav-section data-nav-label="Contact" data-theme="light">
        <div className="contact-signal" aria-hidden="true"><div className="contact-signal-track"><span>ALMATY / SYSTEMS / PRODUCT / INTERACTION / OPEN TO COLLABORATION /</span><span>ALMATY / SYSTEMS / PRODUCT / INTERACTION / OPEN TO COLLABORATION /</span></div></div>
        <div className="section-shell contact-shell">
          <div className="section-index"><span>06</span><span>Next system</span></div>
          <div className="contact-layout">
            <div className="contact-call">
              <div className="contact-intro"><p>Have an ambitious AI problem?</p><span><i aria-hidden="true" /> Available for selected collaborations</span></div>
              <h2 data-split="words" aria-label="BRING THE HARD PART."><MotionWords text="BRING THE HARD PART." /></h2>
              <div className="contact-principles" data-reveal><div><span>01</span><strong>Ambitious problem</strong></div><div><span>02</span><strong>Clear ownership</strong></div><div><span>03</span><strong>Shipped proof</strong></div></div>
            </div>
            <ContactForm />
          </div>
        </div>
        <div className="contact-epilogue" aria-labelledby="epilogue-title">
          <div className="contact-epilogue-mark" aria-hidden="true"><Image className="contact-epilogue-wordmark" src="/daniyal-wordmark.webp" width={2172} height={724} sizes="(max-width: 640px) 92vw, 1100px" alt="" /></div>
          <div className="contact-epilogue-copy">
            <span>ONE LAST SIGNAL / 2026</span>
            <h3 id="epilogue-title" data-split="words" aria-label="Build something worth proving."><MotionWords text="Build something worth proving." /></h3>
            <p>If it has memory, tools, risk, and real-world consequences, start with the part that is hardest to make trustworthy.</p>
            <a href="#contact-form" data-magnetic="0.09" data-cursor="action" data-label="TALK ↗">Start with the problem <b aria-hidden="true">↗</b></a>
          </div>
          <footer><span>© 2026 Daniyal Bauyrzhan</span><span>Almaty · Working globally</span><a href="#top">Back to top ↑</a></footer>
        </div>
      </section>
      </main>
    </>
  );
}
