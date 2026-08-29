"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = [
  { index: "01", title: "HOLD CONTEXT", fragments: ["PRESERVE INTENT", "HISTORY", "CONSTRAINTS", "OWNERSHIP", "ACROSS THE COMPLETE", "OPERATION"] },
  { index: "02", title: "MAKE THE MOVE", fragments: ["GIVE THE SYSTEM", "THE SMALLEST SAFE", "ACTION SPACE", "KEEP EXECUTION", "OBSERVABLE", "AND OWNED"] },
  { index: "03", title: "PROVE THE RESULT", fragments: ["RETURN STATE", "SOURCES", "RECEIPTS", "RECOVERY PATHS", "NOT JUST", "A CONFIDENT SENTENCE"] },
] as const;

export function MethodTextMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).get("motion") === "reduce";
    if (!root || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".text-motion-scene"));
    const ctx = gsap.context(() => {
      gsap.set(panels.slice(1), { opacity: 0, pointerEvents: "none" });
      panels.forEach((panel, index) => {
        const fragments = panel.querySelectorAll<HTMLElement>(".text-motion-fragment");
        const title = panel.querySelector<HTMLElement>(".text-motion-title");
        if (index > 0) gsap.set([title, ...fragments], { opacity: 0, y: 24, scale: 0.98 });
      });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.7 } });
      panels.forEach((panel, index) => {
        const fragments = Array.from(panel.querySelectorAll<HTMLElement>(".text-motion-fragment"));
        const title = panel.querySelector<HTMLElement>(".text-motion-title");
        const start = index;
        if (index > 0) timeline.to(panel, { opacity: 1, pointerEvents: "auto", duration: 0.05 }, start)
          .fromTo(title, { opacity: 0, y: 30, scale: 0.975 }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "power3.out" }, start)
          .fromTo(fragments, { opacity: 0, y: (fragmentIndex) => fragmentIndex % 2 ? 38 : -38, x: (fragmentIndex) => fragmentIndex % 2 ? 24 : -24 }, { opacity: 1, x: 0, y: 0, stagger: 0.03, duration: 0.38, ease: "power3.out" }, start + 0.04);
        timeline.to(fragments, { x: (fragmentIndex) => fragmentIndex % 2 ? -18 : 18, y: (fragmentIndex) => fragmentIndex < 3 ? -14 : 14, duration: 0.68, ease: "none" }, start + 0.2);
        if (index < panels.length - 1) timeline.to([title, ...fragments], { opacity: 0, y: -20, scale: 0.985, stagger: 0.012, duration: 0.28, ease: "power2.in" }, start + 0.72).to(panel, { opacity: 0, duration: 0.02 }, start + 0.99);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="text-motion" ref={rootRef} aria-label="Operating method: hold context, make the move, prove the result">
      <div className="text-motion-sticky">
        <div className="text-motion-grid" aria-hidden="true" />
        {scenes.map((scene) => (
          <article className="text-motion-scene" key={scene.index}>
            <span className="text-motion-index">{scene.index} / 03</span>
            <h3 className="text-motion-title">{scene.title}</h3>
            <div className="text-motion-fragments" aria-hidden="true">
              {scene.fragments.map((fragment, index) => <span className={`text-motion-fragment fragment-${index + 1}`} key={fragment}>{fragment}</span>)}
            </div>
            <p className="sr-only">{scene.fragments.join(" ")}.</p>
          </article>
        ))}
        <footer><span>CONTEXT</span><i /><span>CONSTRAINT</span><i /><span>RECEIPT</span></footer>
      </div>
    </div>
  );
}
