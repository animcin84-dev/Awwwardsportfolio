"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState, type CSSProperties, type MutableRefObject } from "react";
import { GlobalCanvas, ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import type { RootState } from "@react-three/fiber";
import * as THREE from "three";
import { SyncedRigPreview, UniverseScene } from "./universe/UniverseScene";

const worlds = [
  { slug: "jarvis", number: "01", name: "JARVIS", chapter: "MEMORY / ACTION", proof: "PUBLIC SOURCE", thesis: "Context survives the handoff.", originX: "24%", originY: "57%", start: 0.13, end: 0.355, entry: "MEMORY CORE" },
  { slug: "helix", number: "02", name: "HELIX", chapter: "FAILURE / RECOVERY", proof: "INTERACTION PROOF", thesis: "Failure keeps an owner.", originX: "72%", originY: "44%", start: 0.445, end: 0.68, entry: "RECOVERY APERTURE" },
  { slug: "qadam", number: "03", name: "QADAM", chapter: "CLAIM / SOURCE", proof: "EVALUATED BUILD", thesis: "Every claim returns to evidence.", originX: "31%", originY: "38%", start: 0.765, end: 0.96, entry: "EVIDENCE ARCHIVE" },
] as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => { const x = clamp(value); return x * x * (3 - 2 * x); };
const segment = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
const transitionPulse = (value: number, start: number, end: number) => {
  const local = segment(value, start, end);
  return local < 0.5 ? smooth(local * 2) : smooth((1 - local) * 2);
};

// Reversible camera stops adapted from threejs-scroll-scene's waypoint model.
function flightProgress(progress: number) {
  if (progress <= 0.13) return segment(progress, 0, 0.13) * 0.28;
  if (progress <= 0.355) return 0.28;
  if (progress <= 0.445) return 0.28 + segment(progress, 0.355, 0.445) * 0.27;
  if (progress <= 0.68) return 0.55;
  if (progress <= 0.765) return 0.55 + segment(progress, 0.68, 0.765) * 0.27;
  if (progress <= 0.96) return 0.82;
  return 0.82 + segment(progress, 0.96, 1) * 0.18;
}

function MaskField() {
  return (
    <div className="universe-masks" aria-hidden="true">
      <div className="universe-mask mask-horizontal">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ "--cell-delay": (i % 2 ? i : 29 - i) / 58 } as CSSProperties} />)}</div>
      <div className="universe-mask mask-random">{Array.from({ length: 60 }, (_, i) => <i key={i} style={{ "--cell-delay": ((i * 37) % 59) / 90 } as CSSProperties} />)}</div>
      <div className="universe-mask mask-vertical">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ "--cell-delay": Math.abs(5.5 - i) / 16 } as CSSProperties} />)}</div>
      <div className="universe-mask mask-columns">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ "--cell-delay": ((i % 8) + Math.floor(i / 8) * 0.7) / 13 } as CSSProperties} />)}</div>
    </div>
  );
}

export function ScrollEvidenceTunnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const rigProxyRef = useRef<HTMLDivElement>(null);
  const iframeRefs = useRef<Array<HTMLIFrameElement | null>>([]);
  const rawProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);
  const motionProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [webglEnabled, setWebglEnabled] = useState(true);
  const motion = { progress: motionProgressRef, velocity: velocityRef, pointer: pointerRef };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduced";
    if (reduced) {
      section.dataset.static = "true";
      setWebglEnabled(false);
      return;
    }

    const chapterLabel = section.querySelector<HTMLElement>("[data-universe-current]");
    const statusLabel = section.querySelector<HTMLElement>("[data-universe-status]");
    const stateLabel = section.querySelector<HTMLElement>("[data-universe-state]");
    const intro = section.querySelector<HTMLElement>(".universe-intro");
    const exit = section.querySelector<HTMLElement>(".universe-exit");
    const atlas = section.querySelector<HTMLElement>(".universe-atlas");
    const rigPreview = section.querySelector<HTMLElement>(".universe-rig-preview");
    const cases = Array.from(section.querySelectorAll<HTMLElement>(".universe-case"));
    const atlasItems = Array.from(section.querySelectorAll<HTMLElement>(".universe-atlas-project"));
    const landmarkCopies = Array.from(section.querySelectorAll<HTMLElement>(".landmark-copy"));
    let previousScroll = scrollY;
    let strength = 0;
    let lastTime = performance.now();
    let frame = 0;
    let activeIndex = -2;
    let visible = true;

    const syncScroll = () => {
      const range = Math.max(1, section.offsetHeight - innerHeight);
      rawProgressRef.current = clamp((scrollY - section.offsetTop) / range);
      const rect = section.getBoundingClientRect();
      const isCinema = rect.top <= 1 && rect.bottom >= innerHeight - 1;
      if (isCinema) document.documentElement.dataset.cinema = "universe";
      else if (document.documentElement.dataset.cinema === "universe") delete document.documentElement.dataset.cinema;
    };
    const onPointer = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / innerWidth - 0.5) * 2;
      pointerRef.current.y = (event.clientY / innerHeight - 0.5) * 2;
    };
    const onVisibility = () => {
      const rect = section.getBoundingClientRect();
      visible = !document.hidden && rect.bottom > -innerHeight && rect.top < innerHeight * 2;
    };

    const updateCases = (progress: number) => {
      let nextIndex = -1;
      worlds.forEach((world, index) => { if (progress >= world.start - 0.018 && progress <= world.end + 0.018) nextIndex = index; });
      if (nextIndex !== activeIndex) {
        activeIndex = nextIndex;
        cases.forEach((caseElement, index) => { caseElement.dataset.active = index === activeIndex ? "true" : "false"; });
        atlasItems.forEach((item, index) => item.toggleAttribute("data-active", index === activeIndex));
        if (activeIndex >= 0) {
          const iframe = iframeRefs.current[activeIndex];
          const deferredSource = iframe?.dataset.src;
          if (iframe && deferredSource && !iframe.getAttribute("src")) iframe.setAttribute("src", deferredSource);
        }
      }
      let experienceState = "universe";
      worlds.forEach((world, index) => {
        if (index !== activeIndex) return;
        const local = segment(progress, world.start, world.end);
        const open = Math.min(smooth(local / 0.085), smooth((1 - local) / 0.085));
        cases[index]?.style.setProperty("--case-open", open.toFixed(4));
        cases[index]?.style.setProperty("--case-local", local.toFixed(4));
        if (local < 0.085) experienceState = "entering-project";
        else if (local > 0.915) experienceState = "leaving-project";
        else experienceState = "project";
        const iframeWindow = iframeRefs.current[index]?.contentWindow;
        if (iframeWindow) {
          try {
            const documentHeight = iframeWindow.document.documentElement.scrollHeight;
            const maximum = Math.max(0, documentHeight - iframeWindow.innerHeight);
            iframeWindow.scrollTo(0, maximum * smooth(segment(local, 0.085, 0.915)));
          } catch { /* the full-screen portal remains useful without same-origin access */ }
        }
      });
      section.dataset.experienceState = experienceState;
      if (stateLabel) stateLabel.textContent = experienceState.replaceAll("-", " / ").toUpperCase();
    };

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      if (!visible) return;
      renderedProgressRef.current += (rawProgressRef.current - renderedProgressRef.current) * (1 - Math.exp(-dt * 5.35));
      const scrollDelta = scrollY - previousScroll;
      previousScroll = scrollY;
      // Lusion WebGL-Scroll-Sync velocity-strength decay, adapted to drive the scene treatment.
      const targetStrength = (Math.abs(scrollDelta) * 10) / Math.max(1, innerHeight);
      strength *= Math.exp(-dt * 9);
      strength += Math.min(targetStrength, 4);
      velocityRef.current = Math.min(1, strength);
      const progress = renderedProgressRef.current;
      motionProgressRef.current = flightProgress(progress);
      section.style.setProperty("--universe-progress", progress.toFixed(4));
      section.style.setProperty("--universe-velocity", velocityRef.current.toFixed(4));
      section.style.setProperty("--mask-horizontal", transitionPulse(progress, 0.1, 0.135).toFixed(4));
      section.style.setProperty("--mask-random", transitionPulse(progress, 0.35, 0.395).toFixed(4));
      section.style.setProperty("--mask-vertical", transitionPulse(progress, 0.675, 0.72).toFixed(4));
      section.style.setProperty("--mask-columns", transitionPulse(progress, 0.955, 0.995).toFixed(4));
      if (intro) intro.style.opacity = String(1 - smooth(segment(progress, 0.02, 0.105)));
      if (rigPreview) rigPreview.style.opacity = String(1 - smooth(segment(progress, 0.025, 0.115)));
      if (exit) exit.style.opacity = String(smooth(segment(progress, 0.965, 0.994)));
      if (atlas) atlas.style.opacity = String(activeIndex >= 0 ? 0.08 : 0.9);
      landmarkCopies.forEach((copy, index) => {
        const focus = 1 - clamp(Math.abs(progress - (worlds[index].start - 0.032)) / 0.082);
        copy.style.opacity = smooth(focus).toFixed(4);
        copy.style.transform = `translateY(${(1 - smooth(focus)) * 12}px)`;
      });
      if (chapterLabel) chapterLabel.textContent = activeIndex >= 0 ? worlds[activeIndex].name : progress > 0.96 ? "RETURN" : "UNIVERSE";
      if (statusLabel) statusLabel.textContent = activeIndex >= 0 ? "FULLSCREEN / CASE" : progress > 0.96 ? "WORLD / COMPLETE" : "CAMERA / IN TRANSIT";
      updateCases(progress);
    };

    syncScroll();
    addEventListener("scroll", syncScroll, { passive: true });
    addEventListener("resize", syncScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", syncScroll);
      removeEventListener("resize", syncScroll);
      removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      if (document.documentElement.dataset.cinema === "universe") delete document.documentElement.dataset.cinema;
    };
  }, []);

  const rememberUniverse = () => {
    try { sessionStorage.setItem("daniyal:universe-progress", String(renderedProgressRef.current)); } catch { /* optional continuity enhancement */ }
  };

  return (
    <section ref={sectionRef} className="project-universe dark-section" id="project-universe" data-theme="dark" data-nav-section data-nav-label="Project universe" data-experience-state="universe" aria-labelledby="project-universe-title">
      <div className="project-universe-sticky">
        {webglEnabled && (
          <GlobalCanvas
            className="project-universe-canvas"
            camera={{ position: [0, 13, 38], fov: 46, near: 0.08, far: 560 }}
            scaleMultiplier={0.01}
            dpr={[1, 1.55]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            onError={() => { sectionRef.current?.setAttribute("data-static", "true"); setWebglEnabled(false); }}
            onCreated={({ gl }: RootState) => {
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.04;
            }}
          >
            {(globalChildren) => (
              <Suspense fallback={null}>
                {globalChildren}
                <UniverseScene motion={motion} />
              </Suspense>
            )}
          </GlobalCanvas>
        )}
        <header className="universe-chrome universe-chrome-top"><span>05 / PROJECT UNIVERSE</span><strong data-universe-status>CAMERA / IN TRANSIT</strong><span>R3F SCROLL-RIG / REVERSIBLE</span></header>
        <div className="universe-intro">
          <span>THE WORK IS ONE PLACE</span><h2 id="project-universe-title">Enter the<br />evidence universe.</h2>
          <p>The interface breaks into depth. Three real systems exist far apart in one spatial field; the camera crosses that distance and enters each full case study.</p>
          <div><i /><strong>SLOW CINEMATIC ROUTE</strong><b aria-hidden="true">↓</b></div>
        </div>
        <div ref={rigProxyRef} className="universe-rig-preview" aria-hidden="true"><span>DOM ↔ WEBGL / LOCKED</span><strong>ONE CANVAS.<br />NO DRIFT.</strong><i /></div>
        {webglEnabled && (
          <UseCanvas>
            <ScrollScene track={rigProxyRef as MutableRefObject<HTMLElement>} inViewportMargin="80%" hideOffscreen>
              {(props) => <SyncedRigPreview {...props} />}
            </ScrollScene>
          </UseCanvas>
        )}
        <aside className="universe-atlas" aria-label="Project index and positions in the evidence universe">
          <span>PROJECT INDEX / CAMERA STOPS</span>
          <div className="universe-atlas-plane">
            {worlds.map((world, index) => <div key={world.slug} className={`universe-atlas-project atlas-${index + 1}`}><i /><span>{world.number}</span><strong>{world.name}</strong></div>)}
            <svg viewBox="0 0 280 160" preserveAspectRatio="none" aria-hidden="true"><path d="M24 112 C74 22 116 132 160 70 S230 24 262 46" /></svg>
          </div>
        </aside>
        <div className="universe-landmark-copy" aria-hidden="true">
          {worlds.map((world, index) => <div key={world.slug} className={`landmark-copy landmark-copy-${index + 1}`}><span>{world.number} / {world.chapter}</span><strong>{world.name}</strong><em>{world.thesis}</em><small>{world.entry}</small></div>)}
        </div>
        <div className="universe-cases">
          {worlds.map((world, index) => (
            <article className={`universe-case universe-case-${world.slug}`} data-active="false" key={world.slug} style={{ "--origin-x": world.originX, "--origin-y": world.originY, "--case-open": 0, "--case-local": 0 } as CSSProperties} aria-label={`${world.name} case study inside the project universe`}>
              <iframe ref={(element) => { iframeRefs.current[index] = element; }} src={index === 0 ? `/work/${world.slug}?embed=universe` : undefined} data-src={index === 0 ? undefined : `/work/${world.slug}?embed=universe`} title={`${world.name} full case study`} loading={index === 0 ? "eager" : "lazy"} tabIndex={-1} />
              <div className="universe-case-hud"><span>{world.number} / {world.chapter}</span><strong>{world.name}</strong><em>{world.proof}</em></div>
              <div className="universe-case-progress" aria-hidden="true"><i /></div>
              <Link href={`/work/${world.slug}`} onClick={rememberUniverse} className="universe-case-open" data-cursor="action" data-label="OPEN ↗"><span>OPEN INTERACTIVE CASE</span><b aria-hidden="true">↗</b></Link>
            </article>
          ))}
        </div>
        <MaskField />
        <div className="universe-exit">
          <span>03 / 03 · FIELD TRAVERSED</span><h3>The worlds become<br />the interface again.</h3>
          <p>Project signals collapse into the original grid, reconnecting the spatial journey with the operating method behind the work.</p>
          <a href="#method" data-cursor="action" data-label="CONTINUE ↓">Continue into method <b aria-hidden="true">↓</b></a>
        </div>
        <footer className="universe-chrome universe-chrome-bottom"><span data-universe-state>UNIVERSE</span><div className="universe-progress" aria-hidden="true"><i /></div><strong><span data-universe-current>UNIVERSE</span> / 03</strong></footer>
      </div>
      <div className="universe-static-cases">
        <header><span>PROJECT UNIVERSE / REDUCED MOTION</span><h2>Three systems.<br />Three evidence worlds.</h2></header>
        {worlds.map((world) => <article key={world.slug}><span>{world.number} / {world.chapter}</span><h3>{world.name}</h3><p>{world.thesis}</p><Link href={`/work/${world.slug}`}>Open full case ↗</Link></article>)}
      </div>
    </section>
  );
}
