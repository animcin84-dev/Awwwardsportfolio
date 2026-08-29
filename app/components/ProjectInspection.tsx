"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ScrollDemoStatus, useScrollAutoSequence } from "./useScrollAutoSequence";

const jarvisSteps = [
  { label: "Input", mechanism: "Voice / text", headline: "Intent enters one operating loop.", detail: "The request is normalized before any memory lookup or tool decision is made.", route: ["REQUEST", "NORMALIZED", "READY"] },
  { label: "Context", mechanism: "pgvector memory", headline: "Relevant context returns with the request.", detail: "PostgreSQL and pgvector keep semantic memory inside the same inspectable operating layer.", route: ["QUERY", "MEMORY", "ATTACHED"] },
  { label: "Tools", mechanism: "Permission gated", headline: "Action waits behind a deliberate boundary.", detail: "MCP resolves the available tool while approval and destructive-command guards constrain execution.", route: ["RESOLVE", "APPROVE", "EXECUTE"] },
  { label: "Events", mechanism: "SSE evidence", headline: "Completion returns as observable state.", detail: "A live event stream exposes progress and finishes with evidence instead of a confident sentence.", route: ["STATE", "RESULT", "RECEIPT"] },
] as const;

const qadamStates = [
  { label: "Finding", eyebrow: "RISK REVIEW / LIVE", title: "Clause 12.4", body: "Unsupported liability transfer detected. The finding stays provisional until source evidence is attached.", badge: "RISK FLAGGED", signal: "DETERMINISTIC CHECK" },
  { label: "Source", eyebrow: "SOURCE MAP / EVIDENCE 03", title: "Clause → citation", body: "The review points back to the supporting contract passage instead of asking the reader to trust a generated summary.", badge: "SOURCE LINKED", signal: "CITATION COVERAGE" },
  { label: "Guard", eyebrow: "PRIVACY PASS / BEFORE RETRIEVAL", title: "PII masked", body: "Sensitive data is removed before retrieval so the evidence path remains useful without exposing private context.", badge: "GUARD APPLIED", signal: "PRIVATE BY DEFAULT" },
] as const;

function focusTab(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, activate: (index: number) => void) {
  let next = index;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + count) % count;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = count - 1;
  else return;
  event.preventDefault();
  activate(next);
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
}

export function JarvisArchitectureInspector() {
  const [active, setActive] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  const baseId = useId();
  const inspectorRef = useRef<HTMLDivElement>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const step = jarvisSteps[active];

  const pauseForManualInspection = () => {
    pausedRef.current = true;
    setAutoPaused(true);
    if (pauseTimerRef.current !== null) window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      setAutoPaused(false);
      if (inspectorRef.current) inspectorRef.current.dataset.autoPaused = "false";
    }, 2400);
    if (inspectorRef.current) inspectorRef.current.dataset.autoPaused = "true";
  };

  useEffect(() => {
    const inspector = inspectorRef.current;
    if (!inspector) return;

    const setPaused = (next: boolean) => {
      pausedRef.current = next;
      setAutoPaused(next);
      inspector.dataset.autoPaused = next ? "true" : "false";
    };
    let frame = 0;
    const updateFromScroll = () => {
      frame = 0;
      if (pausedRef.current) return;
      const rect = inspector.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = Math.max(1, rect.height + viewport * 0.54);
      const progress = Math.max(0, Math.min(0.999, (viewport * 0.78 - rect.top) / travel));
      const next = Math.min(jarvisSteps.length - 1, Math.floor(progress * jarvisSteps.length));
      setActive((current) => current === next ? current : next);
      inspector.style.setProperty("--architecture-progress", String(progress));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateFromScroll); };
    const onPointerEnter = () => setPaused(true);
    const onPointerLeave = () => { if (pauseTimerRef.current === null) setPaused(false); };
    const onFocusIn = () => setPaused(true);
    const onFocusOut = (event: FocusEvent) => {
      if (!inspector.contains(event.relatedTarget as Node | null)) setPaused(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    inspector.addEventListener("pointerenter", onPointerEnter);
    inspector.addEventListener("pointerleave", onPointerLeave);
    inspector.addEventListener("focusin", onFocusIn);
    inspector.addEventListener("focusout", onFocusOut);
    updateFromScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      inspector.removeEventListener("pointerenter", onPointerEnter);
      inspector.removeEventListener("pointerleave", onPointerLeave);
      inspector.removeEventListener("focusin", onFocusIn);
      inspector.removeEventListener("focusout", onFocusOut);
      if (frame) window.cancelAnimationFrame(frame);
      if (pauseTimerRef.current !== null) window.clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const progressStyle = { "--architecture-progress": String((active + 1) / jarvisSteps.length) } as CSSProperties;

  return (
    <div className="architecture-inspector" ref={inspectorRef} style={progressStyle} data-auto-paused={autoPaused ? "true" : "false"}>
      <div className="architecture-field" aria-hidden="true"><div className="architecture-field-glow" /></div>
      <div className="architecture-auto-bar" aria-hidden="true"><i /></div>
      <div className="architecture-auto-status" aria-live="polite">{autoPaused ? "MANUAL HOLD / INSPECTING" : "SCROLL TO TRACE / AUTO"}</div>
      <div className="architecture-tabs" role="tablist" aria-label="Inspect the JARVIS operating path">
        {jarvisSteps.map((item, index) => <button key={item.label} id={`${baseId}-tab-${index}`} role="tab" type="button" aria-selected={active === index} aria-controls={`${baseId}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => { setActive(index); pauseForManualInspection(); }} onKeyDown={(event) => focusTab(event, index, jarvisSteps.length, (next) => { setActive(next); pauseForManualInspection(); })} data-cursor="action" data-label="INSPECT"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><small>{item.mechanism}</small></button>)}
      </div>
      <div className="architecture-panel" id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} tabIndex={0}>
        <div><span>INSPECTING / {String(active + 1).padStart(2, "0")}</span><strong>{step.headline}</strong><p>{step.detail}</p></div>
        <div className="architecture-route" aria-hidden="true">{step.route.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i><b>{item}</b>{index < step.route.length - 1 && <em>→</em>}</span>)}</div>
        <small>PUBLIC ARCHITECTURE / SOURCE-BACKED</small>
      </div>
    </div>
  );
}

export function QadamEvidenceInspector() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const auto = useScrollAutoSequence<HTMLDivElement>({ count: qadamStates.length, onStep: setActive });
  const state = qadamStates[active];

  return (
    <div className={`document-stack qadam-inspector is-${active}`} ref={auto.ref} data-scroll-demo="qadam-evidence">
      <ScrollDemoStatus progress={auto.progress} paused={auto.paused} label="EVIDENCE TOUR" />
      <div className="qadam-inspector-tabs" role="tablist" aria-label="Inspect the QADAM evidence path">
        {qadamStates.map((item, index) => <button key={item.label} id={`${baseId}-tab-${index}`} role="tab" type="button" aria-selected={active === index} aria-controls={`${baseId}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => { setActive(index); auto.pauseForManualInput(); }} onKeyDown={(event) => focusTab(event, index, qadamStates.length, (next) => { setActive(next); auto.pauseForManualInput(); })} data-cursor="action" data-label="INSPECT"><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</button>)}
      </div>
      <div className="document-sheet sheet-back" aria-hidden="true"><span>CONTRACT / 021</span></div>
      <div className="document-sheet sheet-mid" aria-hidden="true"><span>RETRIEVAL / SOURCE MAP</span></div>
      <div className="document-sheet sheet-front" id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} tabIndex={0}>
        <span>{state.eyebrow}</span><strong>{state.title}</strong><p>{state.body}</p><i /><i /><i /><em>{state.badge} ↗</em>
      </div>
      <div className="risk-signal">{state.signal}<br /><b>{active === 0 ? "EVIDENCE REQUIRED" : active === 1 ? "EVIDENCE ATTACHED" : "BEFORE RETRIEVAL"}</b></div>
    </div>
  );
}
