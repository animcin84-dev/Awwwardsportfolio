"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

function collectMotionWords(element: HTMLElement) {
  return Array.from(element.querySelectorAll<HTMLElement>(".motion-word"));
}

export function MotionSystem() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).get("motion") === "reduce";
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    const splitGroups = Array.from(document.querySelectorAll<HTMLElement>("[data-split='words']")).map((element) => ({ element, words: collectMotionWords(element) }));
    const alignHash = () => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "auto", block: "start" });
    if (reduced) {
      gsap.set("[data-motion-nav], [data-motion-intro] > *, .motion-word, [data-project-visual], [data-scrub-line], [data-helix-meter], [data-helix-beat], [data-world-project], .signal-world-intro, .signal-world-exit", { clearProps: "all", opacity: 1, x: 0, y: 0, z: 0, xPercent: 0, yPercent: 0, scale: 1, scaleX: 1, filter: "none", clipPath: "inset(0% 0% 0% 0%)" });
      const recoveryAction = document.querySelector(".recovery-handoff-word.is-action");
      const recoveryResult = document.querySelectorAll(".recovery-handoff-word.is-recovery, .recovery-handoff h2, .recovery-handoff-route i");
      if (recoveryAction) gsap.set(recoveryAction, { opacity: 0, xPercent: 0, filter: "none" });
      if (recoveryResult.length) gsap.set(recoveryResult, { opacity: 1, xPercent: 0, y: 0, scaleX: 1, filter: "none" });
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => element.setAttribute("data-in", ""));
      const timer = window.setTimeout(alignHash, 0); return () => window.clearTimeout(timer);
    }

    const lenis = new Lenis({ lerp: 0.105, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1, syncTouch: false, anchors: true });
    const onScroll = () => ScrollTrigger.update(); const tick = (time: number) => lenis.raf(time * 1000);
    let tickerAttached = false;
    const attachTicker = () => { if (!tickerAttached) { gsap.ticker.add(tick); tickerAttached = true; } };
    const detachTicker = () => { if (tickerAttached) { gsap.ticker.remove(tick); tickerAttached = false; } };
    const syncVisibility = () => {
      document.documentElement.dataset.motionActive = document.hidden ? "false" : "true";
      if (document.hidden) { lenis.stop(); detachTicker(); }
      else { lenis.start(); attachTicker(); ScrollTrigger.update(); }
    };
    lenis.on("scroll", onScroll); gsap.ticker.lagSmoothing(0); syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    const cleanups: Array<() => void> = [];
    const responsiveMotion = gsap.matchMedia();
    cleanups.push(() => responsiveMotion.revert());
    let readyAlignFrame = 0;
    const alignAfterReady = () => {
      window.cancelAnimationFrame(readyAlignFrame);
      readyAlignFrame = window.requestAnimationFrame(alignHash);
    };
    if (document.documentElement.dataset.portfolioReady === "true") alignAfterReady();
    else {
      addEventListener("portfolio:ready", alignAfterReady, { once: true });
      cleanups.push(() => removeEventListener("portfolio:ready", alignAfterReady));
    }
    cleanups.push(() => window.cancelAnimationFrame(readyAlignFrame));
    const ctx = gsap.context(() => {
      gsap.set("[data-motion-nav]", { opacity: 0, y: -16 }); gsap.set(".hero-media", { opacity: 0, scale: 1.045 }); gsap.set(".hero-readable-identity", { opacity: 0, y: 18 }); gsap.set(".hero-wordmark", { opacity: 0, yPercent: 14, scale: 0.9 }); gsap.set(".hero-proof-plate, .hero-coordinate, .hero-side-label, .hero-bottom", { opacity: 0, y: 18 });
      const playIntro = () => gsap.timeline({ defaults: { ease: "power4.out" } }).to(".hero-media", { opacity: 1, scale: 1, duration: 1.25 }, 0).to("[data-motion-nav]", { opacity: 1, y: 0, duration: 0.82, stagger: 0.05 }, 0.12).to(".hero-readable-identity", { opacity: 1, y: 0, duration: 0.86, ease: "expo.out" }, 0.24).to(".hero-wordmark", { opacity: 1, yPercent: 0, scale: 1, duration: 1.12, ease: "expo.out" }, 0.34).to(".hero-proof-plate, .hero-coordinate, .hero-side-label, .hero-bottom", { opacity: 1, y: 0, duration: 0.72, stagger: 0.055 }, 0.68);
      if (document.documentElement.dataset.portfolioReady === "true") playIntro(); else { addEventListener("portfolio:ready", playIntro, { once: true }); cleanups.push(() => removeEventListener("portfolio:ready", playIntro)); }
      gsap.timeline({ scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.78 } })
        .to(".hero-media", { scale: 1.1, opacity: 0.3, ease: "none", duration: 1 }, 0)
        .to(".hero-lockup", { yPercent: -14, scale: 0.93, ease: "none", duration: 1 }, 0);
      gsap.fromTo(".material-transition-media", { yPercent: -5, scale: 1.08 }, { yPercent: 5, scale: 1.16, ease: "none", scrollTrigger: { trigger: ".material-transition", start: "top bottom", end: "bottom top", scrub: 1.1 } });
      const signalWorld = document.querySelector<HTMLElement>(".signal-world");
      if (signalWorld) {
        const projects = gsap.utils.toArray<HTMLElement>("[data-world-project]");
        const shutters = gsap.utils.toArray<HTMLElement>(".signal-world-shutter i");
        const current = signalWorld.querySelector<HTMLElement>("[data-world-current]");
        const clearWorldCinema = () => { if (document.documentElement.dataset.cinema === "world") delete document.documentElement.dataset.cinema; };
        gsap.set(projects, { opacity: 0, scale: 0.24, z: -980, rotationX: 4, rotationY: -5, filter: "blur(10px)" });
        gsap.set(".signal-world-project-shell", { clipPath: "inset(18% 29% 18% 29% round 2px)" });
        gsap.set(".signal-world-exit", { opacity: 0, y: 34, filter: "blur(8px)" });
        const worldTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: signalWorld,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.05,
            invalidateOnRefresh: true,
            onToggle: (self) => { if (self.isActive) document.documentElement.dataset.cinema = "world"; else clearWorldCinema(); },
            onUpdate: (self) => {
              signalWorld.style.setProperty("--world-progress", self.progress.toFixed(4));
              signalWorld.style.setProperty("--world-velocity", Math.min(1, Math.abs(self.getVelocity()) / 2400).toFixed(3));
              if (!current) return;
              if (self.progress < 0.105) current.textContent = "ENTRY";
              else if (self.progress > 0.91) current.textContent = "EXIT";
              else current.textContent = projects[Math.min(projects.length - 1, Math.floor((self.progress - 0.105) / 0.27))]?.dataset.worldLabel || "CASE";
            },
          },
        });
        worldTimeline
          .to(".signal-world-intro", { opacity: 0, scale: 1.16, z: 260, filter: "blur(9px)", duration: 0.72, ease: "none" }, 0.2)
          .to(".signal-world-grid", { rotation: 10, scale: 1.78, opacity: 0.38, duration: 10.4, ease: "none" }, 0)
          .to(".signal-world-route", { xPercent: -8, scale: 1.08, duration: 10.4, ease: "none" }, 0);

        projects.forEach((project, index) => {
          const shell = project.querySelector<HTMLElement>(".signal-world-project-shell");
          const content = project.querySelectorAll<HTMLElement>(".signal-world-project-title > *, .signal-world-project-copy > *, .signal-world-project header > *, .signal-world-project footer > *");
          const start = 0.78 + index * 3.05;
          worldTimeline
            .fromTo(project, { opacity: 0, scale: 0.24, z: -980, rotationX: 4, rotationY: index % 2 ? 5 : -5, filter: "blur(10px)" }, { opacity: 1, scale: 0.72, z: -130, rotationX: 0, rotationY: 0, filter: "blur(0px)", duration: 0.62, ease: "none" }, start)
            .to(project, { scale: 1, z: 0, duration: 0.5, ease: "none" }, start + 0.62)
            .to(shell, { clipPath: "inset(0% 0% 0% 0% round 2px)", duration: 0.52, ease: "none" }, start + 0.56)
            .fromTo(content, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.46, stagger: 0.025, ease: "power3.out" }, start + 0.86)
            .to(project, { opacity: 1, duration: 0.72 }, start + 1.28)
            .fromTo(shutters, { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.2, stagger: 0.012, ease: "power3.in" }, start + 2.08)
            .to(project, { opacity: 0, scale: 1.38, z: 440, rotationX: -3, filter: "blur(9px)", duration: 0.5, ease: "none" }, start + 2.08)
            .to(shutters, { scaleY: 0, transformOrigin: "bottom", duration: 0.22, stagger: 0.01, ease: "power3.out" }, start + 2.32);
        });
        worldTimeline.fromTo(".signal-world-exit", { opacity: 0, y: 34, scale: 0.92, filter: "blur(8px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.72, ease: "none" }, 9.92).to(".signal-world-exit", { opacity: 1, duration: 0.5, ease: "none" }, 10.66);
        cleanups.push(() => clearWorldCinema());
      }
      responsiveMotion.add("(min-width: 961px)", () => {
        gsap.timeline({ scrollTrigger: { trigger: ".hero-section", start: "45% top", end: "bottom top", scrub: 0.9, invalidateOnRefresh: true } })
          .to(".hero-readable-identity, .hero-coordinate, .hero-side-label", { opacity: 0, y: -14, duration: 0.32, ease: "none" }, 0)
          .to(".hero-wordmark", { yPercent: -10, scaleY: 0.84, opacity: 0.08, duration: 0.68, ease: "none" }, 0.12)
          .to(".hero-proof-plate", { y: () => window.innerHeight * 0.4, scaleX: 0.7, opacity: 0, duration: 0.55, ease: "none" }, 0.2)
          .to(".hero-bottom", { y: 12, opacity: 0, duration: 0.25, ease: "none" }, 0.42);

        gsap.timeline({ scrollTrigger: { trigger: ".experiments-section", start: "top bottom", end: "top 38%", scrub: 0.9 } })
          .fromTo(".method-capabilities", { scale: 1, opacity: 1 }, { scale: 0.985, opacity: 0.42, transformOrigin: "center bottom", duration: 1, ease: "none" }, 0)
          .fromTo(".experiments-head", { y: 42, clipPath: "inset(0% 0% 72% 0%)" }, { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.82, ease: "none" }, 0.18);
      });
      responsiveMotion.add("(min-width: 641px)", () => {
        gsap.timeline({ scrollTrigger: { trigger: ".material-transition", start: "top 88%", end: "top 24%", scrub: 0.9 } })
          .fromTo(".material-transition-copy strong", { yPercent: 18, clipPath: "inset(0% 0% 100% 0%)" }, { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.72, ease: "none" }, 0)
          .fromTo(".material-transition-copy span, .material-transition-copy i", { y: 14, opacity: 0.16 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.08, ease: "none" }, 0.34);
      });
      splitGroups.forEach(({ element, words }) => { gsap.set(words, { yPercent: 112, opacity: 0 }); gsap.to(words, { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.035, ease: "power4.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } }); });
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((project) => {
        const visual = project.querySelector<HTMLElement>("[data-project-visual]"); const title = project.querySelector<HTMLElement>(".project-title-row h2");
        if (visual) gsap.fromTo(visual, { clipPath: "inset(12% 7% 12% 7% round 28px)", scale: 0.94 }, { clipPath: "inset(0% 0% 0% 0% round 20px)", scale: 1, ease: "none", scrollTrigger: { trigger: project, start: "top 78%", end: "top 22%", scrub: 1 } });
        if (title) gsap.fromTo(title, { xPercent: -3 }, { xPercent: 3, ease: "none", scrollTrigger: { trigger: project, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      });
      const recoveryHandoff = document.querySelector<HTMLElement>(".recovery-handoff");
      if (recoveryHandoff) {
        const clearRecoveryCinema = () => { if (document.documentElement.dataset.cinema === "recovery") delete document.documentElement.dataset.cinema; };
        const recoveryCinemaTrigger = ScrollTrigger.create({ trigger: recoveryHandoff, start: "top 38%", end: "bottom 62%", onToggle: (self) => { if (self.isActive) document.documentElement.dataset.cinema = "recovery"; else clearRecoveryCinema(); } });
        cleanups.push(() => { recoveryCinemaTrigger.kill(); clearRecoveryCinema(); });
        responsiveMotion.add("(min-width: 641px)", () => {
          gsap.timeline({ scrollTrigger: { trigger: recoveryHandoff, start: "top top", end: "bottom bottom", scrub: 1 } })
            .fromTo(".recovery-handoff-word.is-action", { xPercent: 0, opacity: 1, filter: "blur(0px)" }, { xPercent: -10, opacity: 0, filter: "blur(7px)", duration: 0.3, ease: "none" }, 0)
            .fromTo(".recovery-handoff-kicker", { opacity: 1, y: 0 }, { opacity: 0, y: -14, duration: 0.22, ease: "none" }, 0)
            .fromTo(".recovery-handoff-word.is-recovery", { xPercent: 10, opacity: 0, filter: "blur(7px)" }, { xPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "none" }, 0.36)
            .fromTo(".recovery-handoff h2", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.32, ease: "none" }, 0.46)
            .fromTo(".recovery-handoff-route i", { scaleX: 0 }, { scaleX: 1, duration: 0.34, ease: "none" }, 0.5);
        });
      }
      const helixVisual = document.querySelector<HTMLElement>(".project-visual-helix");
      if (helixVisual) {
        gsap.fromTo(".helix-rail", { yPercent: 12 }, { yPercent: -6, stagger: 0.06, ease: "none", scrollTrigger: { trigger: helixVisual, start: "top bottom", end: "bottom top", scrub: 1 } });
        responsiveMotion.add("(min-width: 641px)", () => {
          gsap.fromTo("[data-helix-meter]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".helix-anatomy", start: "top 72%", end: "bottom bottom", scrub: 1 } });
          gsap.utils.toArray<HTMLElement>("[data-helix-beat]").forEach((beat) => gsap.fromTo(beat, { opacity: 0.24, y: 42, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", ease: "none", scrollTrigger: { trigger: beat, start: "top 88%", end: "top 46%", scrub: 0.9 } }));
        });
      }
      const proofHandoff = document.querySelector<HTMLElement>(".proof-handoff");
      if (proofHandoff) {
        gsap.timeline({ scrollTrigger: { trigger: proofHandoff, start: "top top", end: "bottom bottom", scrub: 1 } })
          .fromTo(".proof-handoff-word", { opacity: 0.18, y: "0.08em", filter: "blur(4px)" }, { opacity: 1, y: "0em", filter: "blur(0px)", stagger: 0.075, ease: "none" }, 0)
          .fromTo(".proof-handoff-meta i", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)
          .fromTo(".proof-handoff-foot", { opacity: 0.28 }, { opacity: 1, ease: "none" }, 0.42);
      }
      const aboutNodes = gsap.utils.toArray<HTMLElement>(".about-orbit-node");
      const aboutTimeline = gsap.timeline({ scrollTrigger: { trigger: ".about-system", start: "top bottom", end: "bottom top", scrub: 0.9 } });
      aboutTimeline
        .fromTo(".about-orbit-ring.ring-a", { rotation: -16 }, { rotation: 22, ease: "none", duration: 1 }, 0)
        .fromTo(".about-orbit-ring.ring-b", { rotation: 18 }, { rotation: -28, ease: "none", duration: 1 }, 0);
      aboutNodes.forEach((node, index) => aboutTimeline.fromTo(node, { yPercent: index % 2 ? 9 : -8 }, { yPercent: index % 2 ? -7 : 6, ease: "none", duration: 1 }, 0));
      gsap.fromTo(".contact-signal-track", { xPercent: 0 }, { xPercent: -26, ease: "none", scrollTrigger: { trigger: ".contact-section", start: "top bottom", end: "bottom top", scrub: 1.1 } });
      gsap.fromTo(".contact-epilogue-wordmark", { yPercent: -8, scale: 1.08, opacity: 0.06 }, { yPercent: 8, scale: 0.94, opacity: 0.16, ease: "none", scrollTrigger: { trigger: ".contact-epilogue", start: "top bottom", end: "bottom top", scrub: 1.2 } });
      if (!matchMedia("(pointer: coarse)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((magnetic) => {
          const strength = Number(magnetic.dataset.magnetic || 0.16);
          const xTo = gsap.quickTo(magnetic, "x", { duration: 0.42, ease: "power3.out" }); const yTo = gsap.quickTo(magnetic, "y", { duration: 0.42, ease: "power3.out" });
          const move = (event: PointerEvent) => { const rect = magnetic.getBoundingClientRect(); xTo((event.clientX - rect.left - rect.width / 2) * strength); yTo((event.clientY - rect.top - rect.height / 2) * strength); }; const leave = () => { xTo(0); yTo(0); };
          magnetic.addEventListener("pointermove", move, { passive: true }); magnetic.addEventListener("pointerleave", leave); magnetic.addEventListener("pointercancel", leave);
          cleanups.push(() => { magnetic.removeEventListener("pointermove", move); magnetic.removeEventListener("pointerleave", leave); magnetic.removeEventListener("pointercancel", leave); });
        });

        gsap.utils.toArray<HTMLElement>(".work-proof-route a").forEach((route) => {
          const visual = route.querySelector<HTMLElement>(".work-route-visual");
          if (!visual) return;
          gsap.set(visual, { transformPerspective: 700, transformOrigin: "center" });
          const xTo = gsap.quickTo(visual, "x", { duration: 0.48, ease: "power3.out" }); const yTo = gsap.quickTo(visual, "y", { duration: 0.48, ease: "power3.out" });
          const rxTo = gsap.quickTo(visual, "rotationX", { duration: 0.58, ease: "power3.out" }); const ryTo = gsap.quickTo(visual, "rotationY", { duration: 0.58, ease: "power3.out" });
          const move = (event: PointerEvent) => { const rect = route.getBoundingClientRect(); const nx = (event.clientX - rect.left) / rect.width - 0.5; const ny = (event.clientY - rect.top) / rect.height - 0.5; xTo(nx * 4); yTo(ny * 3); rxTo(ny * -2); ryTo(nx * 2); };
          const leave = () => { xTo(0); yTo(0); rxTo(0); ryTo(0); };
          route.addEventListener("pointermove", move, { passive: true }); route.addEventListener("pointerleave", leave); route.addEventListener("pointercancel", leave);
          cleanups.push(() => { route.removeEventListener("pointermove", move); route.removeEventListener("pointerleave", leave); route.removeEventListener("pointercancel", leave); });
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh(); addEventListener("load", refresh, { once: true }); void document.fonts?.ready?.then(refresh); const hashTimer = window.setTimeout(alignHash, 0);
    return () => { clearTimeout(hashTimer); removeEventListener("load", refresh); document.removeEventListener("visibilitychange", syncVisibility); cleanups.forEach((cleanup) => cleanup()); lenis.off("scroll", onScroll); detachTicker(); lenis.destroy(); ctx.revert(); ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
  }, []);
  return null;
}
