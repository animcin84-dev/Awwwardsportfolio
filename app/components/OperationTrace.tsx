"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ScrollDemoStatus, useScrollAutoSequence } from "./useScrollAutoSequence";

const traceStages = [
  {
    index: "01",
    state: "FRAME",
    title: "Name the real constraint.",
    description: "Turn an ambitious request into a bounded operation with an owner, a success condition, and an explicit stop rule.",
    input: "Ambiguous product request",
    output: "Owned operating boundary",
    signal: "Scope locked",
  },
  {
    index: "02",
    state: "RESTORE",
    title: "Load only useful context.",
    description: "Recover intent, history, and relevant evidence without flooding the next decision with everything the system has ever seen.",
    input: "Intent + prior state",
    output: "Ranked working context",
    signal: "Context attached",
  },
  {
    index: "03",
    state: "CONSTRAIN",
    title: "Shrink the action space.",
    description: "Choose the smallest reversible move that can produce information or progress while keeping destructive paths behind approval.",
    input: "Possible tool routes",
    output: "One safe next action",
    signal: "Boundary checked",
  },
  {
    index: "04",
    state: "EXECUTE",
    title: "Make the move observable.",
    description: "Expose the active step, the responsible worker, and the state transition so execution never disappears behind a confident sentence.",
    input: "Approved operation",
    output: "Visible state change",
    signal: "Action recorded",
  },
  {
    index: "05",
    state: "VERIFY",
    title: "Compare claim with state.",
    description: "Read the result back, test the important boundary, and keep sources close enough that another person can inspect the conclusion.",
    input: "Returned system state",
    output: "Verified result",
    signal: "Evidence matched",
  },
  {
    index: "06",
    state: "RETURN",
    title: "Close with a recovery path.",
    description: "Return the result, its receipts, and the next safe move. If the operation failed, preserve completed work and name the retry owner.",
    input: "Result + evidence",
    output: "Receipt-backed handoff",
    signal: "Operation closed",
  },
] as const;

export function OperationTrace() {
  const [active, setActive] = useState(0);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const auto = useScrollAutoSequence<HTMLDivElement>({ count: traceStages.length, onStep: setActive });
  const selected = traceStages[active];

  const select = (index: number) => {
    setActive((index + traceStages.length) % traceStages.length);
    auto.pauseForManualInput();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? traceStages.length - 1
        : ["ArrowDown", "ArrowRight"].includes(event.key)
          ? (index + 1) % traceStages.length
          : (index - 1 + traceStages.length) % traceStages.length;
    select(next);
    triggers.current[next]?.focus();
  };

  return (
    <div className="operation-trace" ref={auto.ref} data-scroll-demo="operation-trace">
      <ScrollDemoStatus progress={auto.progress} paused={auto.paused} label="OPERATION TRACE" />
      <div className="operation-trace-shell">
        <section className="operation-trace-stage" aria-live="polite" aria-atomic="true">
          <header>
            <span>SIMULATED OPERATING MODEL</span>
            <strong>{selected.index} / {String(traceStages.length).padStart(2, "0")}</strong>
          </header>
          <div className="operation-trace-swap" key={selected.index}>
            <span className="operation-trace-state" aria-hidden="true">{selected.state}</span>
            <p className="operation-trace-status"><i aria-hidden="true" /> {selected.signal}</p>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <dl>
              <div><dt>Input</dt><dd>{selected.input}</dd></div>
              <div><dt>Returned state</dt><dd>{selected.output}</dd></div>
            </dl>
          </div>
          <footer aria-hidden="true">
            <span>REQUEST</span><i /><span>CONTEXT</span><i /><span>ACTION</span><i /><span>RECEIPT</span>
          </footer>
        </section>

        <nav className="operation-trace-steps" role="tablist" aria-label="Six stages of an observable AI operation">
          {traceStages.map((stage, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === active}
              tabIndex={index === active ? 0 : -1}
              className={index === active ? "is-active" : undefined}
              key={stage.index}
              ref={(node) => { triggers.current[index] = node; }}
              onClick={() => select(index)}
              onPointerEnter={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              data-cursor="action"
              data-label="TRACE"
            >
              <span>{stage.index}</span>
              <strong>{stage.state}</strong>
              <em>{stage.signal}</em>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </nav>
      </div>
      <p className="operation-trace-disclosure">INTERACTION MODEL / DESCRIBES THE BUILD METHOD — NOT LIVE PRODUCTION TELEMETRY</p>
    </div>
  );
}
