import type { WorkCatalogEntry } from "../work/catalog";
import type { CSSProperties } from "react";

export function ProjectVisual({ project, compact = false }: { project: WorkCatalogEntry; compact?: boolean }) {
  return (
    <div className={`project-poster poster-${project.tone}${compact ? " is-compact" : ""}`} aria-hidden="true">
      <div className="project-poster-grid" />
      <div className="project-poster-orbit"><i /><i /><i /></div>
      <div className="project-poster-signal">
        {Array.from({ length: 9 }, (_, index) => <i key={index} style={{ "--signal-index": index } as CSSProperties} />)}
      </div>
      <div className="project-poster-coordinates"><span>{project.index} / 14</span><span>{project.year}</span></div>
      <strong>{project.name}</strong>
      <div className="project-poster-proof"><span>ACTIVE BUILD</span><em>{project.signal}</em></div>
    </div>
  );
}
