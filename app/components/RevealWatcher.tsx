"use client";

import { useEffect } from "react";

/**
 * Adapted from the exported portfolio's RevealWatcher: one observer marks a
 * reveal the first time it enters the viewport; CSS owns the cheap animation.
 */
export function RevealWatcher() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.setAttribute("data-in", ""));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.setAttribute("data-in", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
