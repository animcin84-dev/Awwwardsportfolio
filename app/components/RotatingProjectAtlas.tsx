"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workCatalog } from "../work/catalog";
import { ProjectVisual } from "./ProjectVisual";

export function RotatingProjectAtlas() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const project = workCatalog[active];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-atlas-card]"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).get("motion") === "reduce";
    const observer = new IntersectionObserver((entries) => {
      const closest = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight * 0.48) - Math.abs(b.boundingClientRect.top - innerHeight * 0.48))[0];
      if (closest?.target instanceof HTMLElement) setActive(Number(closest.target.dataset.atlasCard || 0));
    }, { rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.3, 0.8] });
    cards.forEach((card) => observer.observe(card));
    if (reduced) return () => observer.disconnect();

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const poster = card.querySelector<HTMLElement>(".project-poster");
        const animated = poster ? [card, poster] : [card];
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 94%",
            end: "bottom 6%",
            scrub: 0.72,
            onToggle: (self) => gsap.set(animated, { willChange: self.isActive ? "transform, opacity" : "auto" }),
          },
        });
        timeline.fromTo(card,
          { rotationX: index % 2 ? -24 : 24, rotationY: index % 2 ? 6 : -6, z: -120, scale: 0.9, opacity: 0.32 },
          { rotationX: index % 2 ? 12 : -12, rotationY: index % 2 ? -3 : 3, z: 0, scale: 1, opacity: 1, ease: "none", duration: 1 },
          0,
        );
        if (poster) timeline.fromTo(poster, { yPercent: -3 }, { yPercent: 3, ease: "none", duration: 1 }, 0);
      });
    }, root);
    return () => { observer.disconnect(); ctx.revert(); };
  }, []);

  return (
    <section className="project-atlas" ref={rootRef} id="project-universe" data-nav-section data-nav-label="Project atlas" data-theme="dark" aria-labelledby="project-atlas-title">
      <div className="atlas-ambient" aria-hidden="true"><i /><i /><i /></div>
      <div className="atlas-grid">
        <aside className="atlas-index">
          <div className="section-index"><span>02.1</span><span>Repository atlas</span></div>
          <p className="atlas-kicker">14 PUBLIC BUILDS / ONE OPERATING FIELD</p>
          <div className="atlas-active" aria-live="polite" aria-atomic="true">
            <div className="atlas-active-swap" key={project.slug}>
              <span>{project.index} / {String(workCatalog.length).padStart(2, "0")}</span>
              <h2 id="project-atlas-title">{project.name}</h2>
              <p>{project.summary}</p>
              <div><span>{project.kind}</span><span>{project.stack}</span></div>
              <Link href={`/work/${project.slug}`} data-cursor="action" data-label="CASE →">Enter project <b aria-hidden="true">→</b></Link>
            </div>
          </div>
          <div className="atlas-progress" aria-hidden="true"><i style={{ transform: `scaleY(${(active + 1) / workCatalog.length})` }} /><span>{project.index}</span><em>{String(workCatalog.length).padStart(2, "0")}</em></div>
        </aside>
        <div className="atlas-gallery" aria-label="All public projects">
          {workCatalog.map((item, index) => (
            <Link
              className={`atlas-card${index === active ? " is-active" : ""}`}
              href={`/work/${item.slug}`}
              key={item.slug}
              data-atlas-card={index}
              data-cursor="action"
              data-label="OPEN →"
              aria-label={`${item.name}: ${item.kind}`}
            >
              <ProjectVisual project={item} />
              <span className="atlas-card-caption"><b>{item.index}</b><strong>{item.name}</strong><em>{item.kind}</em><i>LOCAL CASE →</i></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
