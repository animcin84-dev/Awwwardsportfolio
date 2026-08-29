"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MAX_WAIT_MS = 2800;
const EXIT_MS = 360;
const MIN_VISIBLE_MS = 1500;
const REPEAT_WAIT_MS = 1800;
const REDUCED_WAIT_MS = 180;
const MIN_SKIP_MS = 320;

function waitForCriticalImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return image.decode?.().catch(() => undefined) ?? Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
}

function waitForFirstVideoFrame() {
  const video = document.getElementById("hero-video") as HTMLVideoElement | null;
  if (
    !video
    || video.dataset.mediaState === "poster"
    || !video.getAttribute("src")
    || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
  ) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });
}

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    const main = document.querySelector("main");
    const previousBusy = main?.getAttribute("aria-busy");
    const previousOverflow = document.documentElement.style.overflow;
    main?.setAttribute("aria-busy", "true");
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.preloading = "true";

    let cancelled = false;
    let completed = false;
    let raf = 0;
    let target = 12;
    let displayedProgress = 0;
    const startedAt = performance.now();
    const timers = new Set<number>();
    const sleep = (duration: number) => new Promise<void>((resolve) => {
      const timer = window.setTimeout(() => { timers.delete(timer); resolve(); }, duration);
      timers.add(timer);
    });

    const tick = () => {
      if (cancelled) return;
      const next = progressRef.current + (target - progressRef.current) * 0.085;
      progressRef.current = next;
      const rounded = Math.min(99, Math.round(next));
      if (rounded !== displayedProgress) {
        displayedProgress = rounded;
        setProgress(rounded);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const fontTask = document.fonts?.ready?.then(() => undefined) ?? Promise.resolve();
    const imageTasks = Array.from(
      document.querySelectorAll<HTMLImageElement>("img[data-preload-critical]"),
    ).map(waitForCriticalImage);
    const tasks = [fontTask, ...imageTasks, waitForFirstVideoFrame()];

    tasks.forEach((task, index) => {
      task.finally(() => {
        target = Math.max(target, 35 + ((index + 1) / tasks.length) * 58);
      });
    });

    const ready = Promise.allSettled(tasks).then(() => undefined);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).get("motion") === "reduce";
    let repeatVisit = false;
    try { repeatVisit = sessionStorage.getItem("portfolio-seen") === "true"; } catch { /* storage is optional */ }
    const hardTimeout = sleep(reducedMotion ? REDUCED_WAIT_MS : repeatVisit ? REPEAT_WAIT_MS : MAX_WAIT_MS);
    const minimumVisible = sleep(reducedMotion ? REDUCED_WAIT_MS : MIN_VISIBLE_MS);

    const finish = () => {
      if (cancelled || completed) return;
      completed = true;
      removeEventListener("pointerdown", requestSkip);
      removeEventListener("keydown", requestSkip);
      cancelAnimationFrame(raf);
      target = 100;
      progressRef.current = 100;
      setProgress(100);
      try { sessionStorage.setItem("portfolio-seen", "true"); } catch { /* storage is optional */ }
      document.documentElement.dataset.preloading = "false";
      document.documentElement.dataset.portfolioReady = "true";
      main?.setAttribute("aria-busy", "false");
      document.documentElement.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent("portfolio:ready"));
      setLeaving(true);
      const hiddenTimer = window.setTimeout(() => { timers.delete(hiddenTimer); setHidden(true); }, EXIT_MS);
      timers.add(hiddenTimer);
    };
    const requestSkip = () => {
      const remaining = MIN_SKIP_MS - (performance.now() - startedAt);
      if (remaining <= 0) finish();
      else {
        const timer = window.setTimeout(() => { timers.delete(timer); finish(); }, remaining);
        timers.add(timer);
      }
    };
    addEventListener("pointerdown", requestSkip, { passive: true });
    addEventListener("keydown", requestSkip);
    Promise.race([Promise.all([ready, minimumVisible]), hardTimeout]).then(finish);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      removeEventListener("pointerdown", requestSkip);
      removeEventListener("keydown", requestSkip);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      if (previousBusy === null) main?.removeAttribute("aria-busy");
      else if (previousBusy !== undefined) main?.setAttribute("aria-busy", previousBusy);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  if (hidden) return null;

  return (
    <div id="site-preloader" className={`preloader ${leaving ? "is-leaving" : ""}`}>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {leaving ? "Portfolio ready" : "Loading portfolio"}
      </p>
      <div className="preloader-grid" aria-hidden="true" />
      <div className="preloader-brand" aria-hidden="true">
        <Image
          src="/d-mark.webp"
          width={1254}
          height={1254}
          sizes="38px"
          alt=""
          priority
          data-preload-critical
          className="preloader-mark"
        />
        <span>DANIYAL</span>
      </div>
      <div className="preloader-center" aria-hidden="true">
        <p className="preloader-kicker">PORTFOLIO · ALMATY / 2026</p>
        <div className="preloader-word">SIGNAL</div>
        <div className="preloader-scan" aria-hidden="true" />
      </div>
      <div className="preloader-bottom" aria-hidden="true">
        <div className="preloader-status">
          <span>TYPE</span><span>SYSTEM</span><span>INTERFACE</span>
        </div>
        <div className="preloader-progress">
          <span>{String(progress).padStart(3, "0")}</span><sup>%</sup>
        </div>
      </div>
    </div>
  );
}
