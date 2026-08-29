"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

type ScrollAutoSequenceOptions = {
  count: number;
  onStep: (index: number) => void;
  holdMs?: number;
};

export function useScrollAutoSequence<T extends HTMLElement>({ count, onStep, holdMs = 2600 }: ScrollAutoSequenceOptions) {
  const ref = useRef<T>(null);
  const onStepRef = useRef(onStep);
  onStepRef.current = onStep;
  const pausedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const pauseForManualInput = useCallback(() => {
    pausedRef.current = true;
    setPaused(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      setPaused(false);
      timerRef.current = null;
    }, holdMs);
  }, [holdMs]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const element = ref.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).get("motion") === "reduce";
    if (!element || count < 2 || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pausedRef.current) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = Math.max(1, rect.height + viewport * 0.58);
      const nextProgress = Math.max(0, Math.min(0.999, (viewport * 0.8 - rect.top) / travel));
      const next = Math.min(count - 1, Math.floor(nextProgress * count));
      setProgress(nextProgress);
      onStepRef.current(next);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [count]);

  return { ref: ref as RefObject<T>, progress, paused, pauseForManualInput };
}

export function ScrollDemoStatus({ progress, paused, label = "SCROLL DEMO" }: { progress: number; paused: boolean; label?: string }) {
  return (
    <div className="scroll-demo-status" style={{ "--demo-progress": progress } as CSSProperties} aria-hidden="true">
      <span>{paused ? "MANUAL HOLD" : `${label} / AUTO`}</span><i><b /></i>
    </div>
  );
}
