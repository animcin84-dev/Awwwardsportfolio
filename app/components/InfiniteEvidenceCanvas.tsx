"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  { word: "MEMORY", note: "The system carries the right context forward." },
  { word: "ACTION", note: "The smallest safe move becomes observable." },
  { word: "EVIDENCE", note: "A receipt closes the loop." },
] as const;

const positions = [
  [-38, -24, -90, -8], [-12, -34, -160, 5], [18, -27, -60, -3], [39, -12, -190, 8],
  [-42, 8, -210, 5], [-17, 5, -70, -4], [14, 10, -250, 4], [38, 18, -100, -7],
  [-34, 34, -140, 7], [-5, 32, -220, -5], [24, 36, -80, 6], [44, 42, -180, -4],
  [-48, 60, -250, -6], [-20, 62, -110, 8], [9, 58, -180, -8], [35, 66, -55, 4],
  [-6, 83, -120, -4], [27, 86, -230, 7],
] as const;

export function InfiniteEvidenceCanvas() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).get("motion") === "reduce";
    if (!root || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const words = Array.from(root.querySelectorAll<HTMLElement>(".evidence-canvas-word"));
    const notes = Array.from(root.querySelectorAll<HTMLElement>(".evidence-canvas-note"));
    const ctx = gsap.context(() => {
      gsap.set(words.slice(1), { opacity: 0, yPercent: 62, scale: 0.96 });
      gsap.set(notes.slice(1), { opacity: 0, y: 14 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.72,
          invalidateOnRefresh: true,
          onToggle: (self) => gsap.set(".evidence-canvas-plane", { willChange: self.isActive ? "transform" : "auto" }),
        },
      });
      timeline.to(".evidence-canvas-plane", { yPercent: -43, xPercent: -7, rotationZ: -2.5, scale: 1.16, ease: "none", duration: 3 }, 0);
      [1, 2].forEach((index) => {
        const at = index;
        timeline.to(words[index - 1], { opacity: 0, yPercent: -52, scale: 0.97, duration: 0.3, ease: "power2.in" }, at - 0.12)
          .fromTo(words[index], { opacity: 0, yPercent: 62, scale: 0.96 }, { opacity: 1, yPercent: 0, scale: 1, duration: 0.38, ease: "power3.out" }, at - 0.01)
          .to(notes[index - 1], { opacity: 0, y: -10, duration: 0.24 }, at - 0.1)
          .fromTo(notes[index], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.34, ease: "power3.out" }, at);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="evidence-canvas" ref={rootRef} id="evidence-canvas" data-theme="dark" aria-labelledby="evidence-canvas-title">
      <div className="evidence-canvas-sticky">
        <div className="evidence-canvas-plane" aria-hidden="true">
          {positions.map(([x, y, z, rotation], index) => (
            <figure className="evidence-canvas-frame" key={index} style={{ "--canvas-x": `${x}vw`, "--canvas-y": `${y}vh`, "--canvas-z": `${z}px`, "--canvas-r": `${rotation}deg` } as CSSProperties}>
              <Image src={`/infinite-canvas/art-${String(index + 1).padStart(2, "0")}.jpg`} alt="" fill sizes="(max-width: 640px) 34vw, 18vw" loading={index < 6 ? "eager" : "lazy"} />
              <figcaption>{String(index + 1).padStart(2, "0")} / ARCHIVE</figcaption>
            </figure>
          ))}
        </div>
        <header className="evidence-canvas-overlay">
          <span className="evidence-canvas-kicker">INFINITE CANVAS / OPERATING STATES</span>
          <h2 id="evidence-canvas-title" className="sr-only">Memory, action, evidence</h2>
          <div className="evidence-canvas-words" aria-hidden="true">{chapters.map((chapter) => <strong className="evidence-canvas-word" key={chapter.word}>{chapter.word}</strong>)}</div>
          <div className="evidence-canvas-notes">{chapters.map((chapter) => <p className="evidence-canvas-note" key={chapter.word}>{chapter.note}</p>)}</div>
          <div className="evidence-canvas-route" aria-hidden="true"><span>01 MEMORY</span><i /><span>02 ACTION</span><i /><span>03 EVIDENCE</span></div>
        </header>
      </div>
    </section>
  );
}
