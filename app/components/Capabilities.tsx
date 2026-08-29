"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ScrollDemoStatus, useScrollAutoSequence } from "./useScrollAutoSequence";

const items = [
  { index: "01", title: "AI SYSTEMS", verb: "ORCHESTRATE", description: "Agent architecture, memory, retrieval, tool calling, model routing, voice, computer use, and verification.", stack: "AGENTS / RAG / MCP / MEMORY / EVALS" },
  { index: "02", title: "PRODUCT ENGINEERING", verb: "SHIP", description: "Complete products across interface, backend, data, and deployment with AI-native workflows.", stack: "NEXT.JS / TYPESCRIPT / PYTHON / POSTGRES / DOCKER" },
  { index: "03", title: "INTERACTION", verb: "CLARIFY", description: "Motion-led interfaces, editorial systems, tactile feedback, and scroll narratives that explain the product.", stack: "GSAP / INTERACTION DESIGN / DESIGN SYSTEMS" },
  { index: "04", title: "PRODUCT / STARTUPS", verb: "FOCUS", description: "Problem selection, MVPs, reliability, validation, and turning technical capability into useful products.", stack: "RESEARCH / MVP / VALIDATION / BUSINESS" },
] as const;

export function Capabilities() {
  const [active, setActive] = useState(0);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const auto = useScrollAutoSequence<HTMLDivElement>({ count: items.length, onStep: setActive });
  const selected = items[active];
  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const key = event.key;
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const next = key === "Home" ? 0 : key === "End" ? items.length - 1 : key === "ArrowDown" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
    setActive(next); auto.pauseForManualInput(); triggers.current[next]?.focus();
  };

  return (
    <div className="capability-theatre" ref={auto.ref} data-scroll-demo="capabilities">
      <ScrollDemoStatus progress={auto.progress} paused={auto.paused} label="CAPABILITY SEQUENCE" />
      <section className="capability-stage" aria-live="polite" aria-atomic="true">
        <div className="capability-stage-swap" key={selected.index}>
          <span>{selected.index} / 04</span>
          <strong className="capability-stage-verb" aria-hidden="true">{selected.verb}</strong>
          <h4>{selected.title}</h4>
          <p>{selected.description}</p>
          <small>{selected.stack}</small>
        </div>
        <i aria-hidden="true" style={{ transform: `scaleX(${(active + 1) / items.length})` }} />
      </section>
      <div className="capability-tabs" role="tablist" aria-label="Capabilities">
        {items.map((item, index) => (
          <button
            key={item.title}
            ref={(node) => { triggers.current[index] = node; }}
            role="tab"
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            className={index === active ? "is-active" : undefined}
            type="button"
            onClick={() => { setActive(index); auto.pauseForManualInput(); }}
            onPointerEnter={() => setActive(index)}
            onKeyDown={(event) => moveFocus(event, index)}
            data-cursor="action"
            data-label="VIEW"
          >
            <span>{item.index}</span><strong>{item.title}</strong><em>{item.verb}</em><i aria-hidden="true">→</i>
          </button>
        ))}
      </div>
    </div>
  );
}
