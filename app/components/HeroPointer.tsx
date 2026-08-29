"use client";

import { useEffect } from "react";

export function HeroPointer() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero-section");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hero || !pointerQuery.matches || reducedQuery.matches) return;

    let raf = 0;
    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty("--mx", x.toFixed(4));
        hero.style.setProperty("--my", y.toFixed(4));
        hero.style.setProperty("--identity-x", `${(x * -5).toFixed(2)}px`);
        hero.style.setProperty("--identity-y", `${(y * -3).toFixed(2)}px`);
        hero.style.setProperty("--plate-x", `${(x * 4).toFixed(2)}px`);
        hero.style.setProperty("--plate-y", `${(y * 2).toFixed(2)}px`);
      });
    };
    const reset = () => {
      hero.style.setProperty("--mx", "0");
      hero.style.setProperty("--my", "0");
      hero.style.setProperty("--identity-x", "0px");
      hero.style.setProperty("--identity-y", "0px");
      hero.style.setProperty("--plate-x", "0px");
      hero.style.setProperty("--plate-y", "0px");
    };

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return null;
}
