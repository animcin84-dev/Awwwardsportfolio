import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HelixRecovery } from "../../components/HelixRecovery";
import { CaseHeroSignal } from "../../components/CaseHeroSignal";
import { CaseStudyRail } from "../../components/CaseStudyRail";
import { ProjectVisual } from "../../components/ProjectVisual";
import { JarvisArchitectureInspector, QadamEvidenceInspector } from "../../components/ProjectInspection";
import { SilkWaves } from "../../components/SilkWaves";
import { projects, type CaseStudyProject } from "../projects";
import { workBySlug, workCatalog, type WorkCatalogEntry } from "../catalog";

type CaseStudyPageProps = { params: Promise<{ slug: string }>; searchParams?: Promise<{ embed?: string }> };

export function generateStaticParams() {
  return workCatalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug as CaseStudyProject["slug"]];
  const catalogProject = workBySlug[slug];
  if (!project && !catalogProject) return {};
  if (!project) return {
    title: `${catalogProject.name} Project | Daniyal Bauyrzhan`,
    description: catalogProject.summary,
    alternates: { canonical: `/work/${catalogProject.slug}` },
  };
  return {
    title: `${project.name} Case Study | Daniyal Bauyrzhan`,
    description: `${project.summary} ${project.evidence}.`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.type}`,
      description: project.summary,
      type: "article",
    },
  };
}

function RepositoryCase({ project }: { project: WorkCatalogEntry }) {
  const currentIndex = workCatalog.findIndex((item) => item.slug === project.slug);
  const next = workCatalog[(currentIndex + 1) % workCatalog.length];
  return (
    <main className={`repository-case repository-case-${project.tone}`}>
      <a className="skip-link" href="#repository-case-title">Skip to project</a>
      <header className="case-chrome">
        <Link href="/" className="case-brand" aria-label="Daniyal portfolio home" data-cursor="action" data-label="HOME ↖"><Image src="/d-mark.webp" width={42} height={42} sizes="42px" alt="" priority /><span>Daniyal</span></Link>
        <nav aria-label="Project navigation"><Link href="/work">Project atlas</Link><Link href={`/work/${next.slug}`}>Next / {next.name}</Link></nav>
      </header>
      <article>
        <section className="repository-case-hero">
          <div className="repository-case-meta"><span>{project.index} / 14</span><span>{project.kind}</span><span>{project.year}</span></div>
          <h1 id="repository-case-title">{project.name}</h1>
          <div className="repository-case-visual"><ProjectVisual project={project} /></div>
          <div className="repository-case-intro"><p>{project.summary}</p><span>{project.stack}</span><a href="#repository-case-system">Read the system ↓</a></div>
        </section>
        <section className="repository-case-system" id="repository-case-system">
          <header><span>01 / OPERATING ROUTE</span><h2>{project.signal}</h2></header>
          <div className="repository-case-steps"><article><span>INPUT</span><strong>Find the signal.</strong><p>Start with the real constraint and the state the product can actually observe.</p></article><article><span>SYSTEM</span><strong>Own the move.</strong><p>Keep the useful action narrow, visible, and connected to a clear operating boundary.</p></article><article><span>PROOF</span><strong>Return a receipt.</strong><p>The claim stops at the public repository boundary; source is linked as evidence, not theatre.</p></article></div>
        </section>
        <section className="repository-case-receipt"><span>02 / PUBLIC RECEIPT</span><h2>Inspect the build,<br />then judge the claim.</h2><p>This project page is an editorial project portrait. Implementation details and the current build state live in the public repository.</p><a href={`https://github.com/animcin84-dev/${project.repo}`} target="_blank" rel="noreferrer">Open public source ↗<ExternalNote /></a></section>
        <Link className="case-next" href={`/work/${next.slug}`}><span>Next project / {next.index}</span><strong>{next.name}</strong><b aria-hidden="true">→</b></Link>
      </article>
    </main>
  );
}

function ExternalNote() {
  return <span className="sr-only">, opens in a new tab</span>;
}

function ProofSurface({ project }: { project: CaseStudyProject }) {
  if (project.slug === "helix") {
    return <div className="case-proof-interaction case-proof-helix"><HelixRecovery /></div>;
  }
  if (project.slug === "qadam") {
    return <div className="case-proof-interaction case-proof-qadam"><QadamEvidenceInspector /></div>;
  }
  return <div className="case-proof-interaction case-proof-jarvis"><JarvisArchitectureInspector /></div>;
}

export default async function CaseStudyPage({ params, searchParams }: CaseStudyPageProps) {
  const { slug } = await params;
  const embedded = (await searchParams)?.embed === "universe";
  const project = projects[slug as CaseStudyProject["slug"]];
  const catalogProject = workBySlug[slug];
  if (!project && !catalogProject) notFound();
  if (!project) return <RepositoryCase project={catalogProject} />;
  const next = projects[project.next];

  return (
    <main className={`case-study-page case-study-${project.slug}${embedded ? " is-universe-embed" : ""}`}>
      <a className="skip-link" href="#case-title">Skip to case study</a>
      <header className="case-chrome">
        <Link href="/" className="case-brand" aria-label="Daniyal portfolio home" data-cursor="action" data-label="HOME ↖">
          <Image src="/d-mark.webp" width={42} height={42} sizes="42px" alt="" priority />
          <span>Daniyal</span>
        </Link>
        <nav aria-label="Case study navigation">
          <Link href="/work" data-cursor="action" data-label="INDEX ↖">Work</Link>
          <Link href={`/work/${next.slug}`} data-cursor="action" data-label="NEXT →">Next / {next.name}</Link>
        </nav>
      </header>
      <CaseStudyRail />

      <article>
        <section className="case-hero" aria-labelledby="case-title">
          <div className="case-hero-grid" aria-hidden="true" />
          {project.slug === "jarvis" ? <div className="case-hero-silk" aria-hidden="true"><SilkWaves speed={0.2} scale={0.95} contrast={1.12} glow={0.54} color="#030407" tint="#405ae4" amplitude={0.036} density={1.08} grain={0.72} /></div> : null}
          <CaseHeroSignal project={project} />
          <div className="case-hero-meta">
            <span>{project.index}</span><span>{project.type}</span><span>{project.evidence}</span>
          </div>
          <h1 id="case-title" tabIndex={-1}>{project.name}</h1>
          <div className="case-hero-summary">
            <p>{project.summary}</p>
            <dl>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Period</dt><dd>{project.period}</dd></div>
              <div><dt>Proof</dt><dd>{project.evidence}</dd></div>
            </dl>
          </div>
          <a className="case-enter" href="#case-thesis" data-cursor="action" data-label="ENTER ↓"><span>Read the operation</span><b aria-hidden="true">↓</b></a>
        </section>

        <section className="case-thesis" id="case-thesis" data-case-section aria-labelledby="case-thesis-title">
          <div className="case-section-label"><span>01</span><span>Operating thesis</span></div>
          <h2 id="case-thesis-title">{project.thesis}</h2>
          <p>{project.boundary}</p>
        </section>

        <section className="case-brief" id="case-brief" data-case-section aria-label="Challenge, decision, and result">
          <article><span>01 / Challenge</span><h2>What had to change.</h2><p>{project.challenge}</p></article>
          <article><span>02 / Decision</span><h2>The system move.</h2><p>{project.decision}</p></article>
          <article><span>03 / Result</span><h2>What can be proved.</h2><p>{project.result}</p></article>
        </section>

        <section className="case-proof" id="case-proof" data-case-section aria-labelledby="case-proof-title">
          <header>
            <div className="case-section-label"><span>02</span><span>Interaction proof</span></div>
            <h2 id="case-proof-title">Inspect the mechanism,<br />not a beauty shot.</h2>
            <p>{project.evidence} / the proof surface preserves its boundary.</p>
          </header>
          <ProofSurface project={project} />
        </section>

        <section className="case-route" id="case-route" data-case-section aria-labelledby="case-route-title">
          <header>
            <div className="case-section-label"><span>03</span><span>System route</span></div>
            <h2 id="case-route-title">One operation.<br />Four owned moves.</h2>
          </header>
          <ol>
            {project.route.map((step) => (
              <li key={step.label}><span>{step.label}</span><strong>{step.title}</strong><p>{step.detail}</p><b aria-hidden="true">→</b></li>
            ))}
          </ol>
        </section>

        <section className="case-metrics" id="case-metrics" data-case-section aria-labelledby="case-metrics-title">
          <header>
            <div className="case-section-label"><span>04</span><span>Evidence ledger</span></div>
            <h2 id="case-metrics-title">The claim stops<br />where proof stops.</h2>
          </header>
          <div className="case-metric-grid">
            {project.metrics.map((metric) => <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><p>{metric.note}</p></article>)}
          </div>
        </section>

        <section className="case-receipts" id="case-receipts" data-case-section aria-labelledby="case-receipts-title">
          <header>
            <div className="case-section-label"><span>05</span><span>{project.slug === "helix" ? "Prototype boundary" : "Source receipts"}</span></div>
            <h2 id="case-receipts-title">Follow the evidence.</h2>
          </header>
          <div className="case-receipt-grid">
            {project.receipts.map((receipt) => receipt.href ? (
              <a key={receipt.label} href={receipt.href} target="_blank" rel="noreferrer" data-cursor="action" data-label="VERIFY ↗">
                <span>{receipt.label}</span><strong>{receipt.title}</strong><em>{receipt.detail}</em><b aria-hidden="true">↗</b><ExternalNote />
              </a>
            ) : (
              <article key={receipt.label}><span>{receipt.label}</span><strong>{receipt.title}</strong><em>{receipt.detail}</em><b aria-hidden="true">✓</b></article>
            ))}
          </div>
        </section>

        <section className="case-reflection" id="case-reflection" data-case-section aria-labelledby="case-reflection-title">
          <span>06 / Reflection</span>
          <h2 id="case-reflection-title">{project.reflection}</h2>
        </section>

        <Link className="case-next" href={`/work/${next.slug}`} data-cursor="action" data-label="NEXT →">
          <span>Next case / {next.index}</span><strong>{next.name}</strong><b aria-hidden="true">→</b>
        </Link>
      </article>

      <footer className="case-footer"><span>© 2026 Daniyal Bauyrzhan</span><Link href="/contact" data-cursor="action" data-label="TALK ↗">Start a conversation ↗</Link><span>Almaty · Working globally</span></footer>
    </main>
  );
}
