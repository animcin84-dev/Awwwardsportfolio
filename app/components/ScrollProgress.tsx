"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const thumbRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (thumbRef.current) thumbRef.current.style.transform = `translateY(${progress * 789}%)`;
      if (trackRef.current) trackRef.current.style.setProperty("--scroll-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={trackRef} className="scroll-progress" aria-hidden="true">
      <span ref={thumbRef} />
    </div>
  );
}
