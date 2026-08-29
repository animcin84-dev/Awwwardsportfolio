"use client";

import { useEffect, useState, type CSSProperties } from "react";

const chapters = [
  ["case-thesis", "Thesis"],
  ["case-brief", "Brief"],
  ["case-proof", "Proof"],
  ["case-route", "Route"],
  ["case-metrics", "Ledger"],
  ["case-receipts", "Receipts"],
  ["case-reflection", "Reflection"],
] as const;

export function CaseStudyRail() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const targets = chapters
      .map(([id]) => document.getElementById(id))
      .filter((target): target is HTMLElement => Boolean(target));
    if (!targets.length) return;

    const sync = () => {
      const center = innerHeight * 0.5;
      const hero = document.querySelector<HTMLElement>(".case-hero");
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.top <= center && heroRect.bottom >= center) {
          setActive("");
          return;
        }
      }
      const current = targets.find((target) => {
        const rect = target.getBoundingClientRect();
        return rect.top <= center && rect.bottom >= center;
      }) || [...targets].reverse().find((target) => target.getBoundingClientRect().top <= center) || targets[0];
      setActive(current.id);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };

    sync();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = Math.max(0, chapters.findIndex(([id]) => id === active));

  return (
    <nav className={`case-rail${active ? "" : " is-hidden"}`} aria-label="Case study chapters">
      <span className="case-rail-current"><small>CHAPTER</small><strong>{chapters[activeIndex]?.[1] || "Thesis"}</strong></span>
      <div className="case-rail-links" style={{ "--case-rail-progress": activeIndex / Math.max(1, chapters.length - 1) } as CSSProperties}>
        {chapters.map(([id, label], index) => (
          <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? "location" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span><em>{label}</em><i aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}
