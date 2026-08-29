import type { CaseStudyProject } from "../work/projects";

export function CaseHeroSignal({ project }: { project: CaseStudyProject }) {
  const signalClass = `case-hero-signal case-hero-signal-${project.slug}`;

  return (
    <div className={signalClass} aria-hidden="true">
      <div className="case-hero-signal-chrome">
        <span />
        <span />
        <span />
        <b>{project.name} / SIGNAL</b>
        <em>{project.evidence}</em>
      </div>

      {project.slug === "jarvis" && (
        <div className="case-signal-console">
          <span>OPERATION TRACE</span>
          <strong>03 / 03</strong>
          <div className="case-signal-steps"><i /><i /><i /></div>
          <small>Context → tools → receipt</small>
        </div>
      )}

      {project.slug === "helix" && (
        <div className="case-signal-recovery">
          <span>RECOVERY PATH</span>
          <div className="case-signal-ring"><i /><b>04</b></div>
          <small>Isolate · preserve · own · prove</small>
        </div>
      )}

      {project.slug === "qadam" && (
        <div className="case-signal-evaluation">
          <span>EVALUATION</span>
          <strong>0.9231</strong>
          <div className="case-signal-bars"><i /><i /><i /><i /></div>
          <small>20 labelled queries / hit@5 ≥ 0.90</small>
        </div>
      )}
    </div>
  );
}
