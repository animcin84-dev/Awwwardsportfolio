"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ScrollDemoStatus, useScrollAutoSequence } from "./useScrollAutoSequence";

type RecoveryState = "fault" | "recovering" | "verified";

const stages = ["PLAN", "EXECUTE", "OBSERVE", "VERIFY"] as const;

export function HelixRecovery() {
  const [state, setState] = useState<RecoveryState>("fault");
  const timerRef = useRef<number | null>(null);
  const auto = useScrollAutoSequence<HTMLDivElement>({ count: 3, onStep: (index) => setState((["fault", "recovering", "verified"] as const)[index]) });

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const runRecovery = () => {
    if (state === "verified") {
      setState("fault");
      return;
    }
    if (state === "recovering") return;
    setState("recovering");
    timerRef.current = window.setTimeout(() => {
      setState("verified");
      timerRef.current = null;
    }, 900);
  };

  const runRecoveryFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key !== "Enter" && event.key !== " ") || event.repeat) return;
    event.preventDefault();
    auto.pauseForManualInput();
    runRecovery();
  };

  const currentStage = state === "fault" ? 2 : 3;
  const status = state === "fault" ? "Evidence timeout" : state === "recovering" ? "Recovery in progress" : "Operation verified";

  return (
    <div className={`helix-recovery is-${state}`} ref={auto.ref} data-scroll-demo="helix-recovery">
      <ScrollDemoStatus progress={auto.progress} paused={auto.paused} label="RECOVERY TOUR" />
      <div className="helix-grid" role="list" aria-label="Four-stage HELIX operation">
        {stages.map((stage, index) => {
          const complete = index < 2 || state === "verified";
          const active = index === currentStage;
          return (
            <div className={`helix-rail ${active ? "is-current" : ""} ${complete ? "is-complete" : ""}`} role="listitem" key={stage}>
              <span>0{index + 1}</span><strong>{stage}</strong><i />
              {active && <div className="helix-cursor">{state === "fault" ? "FAULT / 03" : state === "recovering" ? "RECOVERING" : "VERIFIED"}</div>}
            </div>
          );
        })}
      </div>

      <div className="helix-console" id="helix-operation-status" aria-busy={state === "recovering"}>
        <header><span>RUN / 0241</span><em className={`helix-state state-${state}`} role="status" aria-live="polite" aria-atomic="true">{status}</em></header>
        <div className="helix-console-copy">
          <span>{state === "verified" ? "RECOVERY RECEIPT" : "SYSTEM-OWNED INTERRUPTION"}</span>
          <h3>{state === "fault" ? "The operation stopped before it could prove completion." : state === "recovering" ? "Restoring the last owned checkpoint." : "Recovery finished with evidence attached."}</h3>
          <p>{state === "fault" ? "HELIX keeps the failed step, owner, and safe next move visible. The user is not blamed for a system timeout." : state === "recovering" ? "Replaying observation only. Completed planning and execution steps remain untouched." : "The verification step received the missing receipt. No earlier work was repeated."}</p>
        </div>
        <div className="helix-ledger">
          <div><span>OWNER</span><strong>Observation worker</strong></div>
          <div><span>CHECKPOINT</span><strong>Step 02 / complete</strong></div>
          <div><span>NEXT MOVE</span><strong>{state === "verified" ? "Receipt stored" : "Retry observation"}</strong></div>
        </div>
        <button type="button" onClick={() => { auto.pauseForManualInput(); runRecovery(); }} onKeyDown={runRecoveryFromKeyboard} disabled={state === "recovering"} aria-controls="helix-operation-status" aria-describedby="helix-proof-note">
          <span>{state === "fault" ? "Run safe recovery" : state === "recovering" ? "Recovering checkpoint…" : "Replay failure"}</span><b aria-hidden="true">{state === "verified" ? "↺" : "→"}</b>
        </button>
        <small id="helix-proof-note">SIMULATED RECOVERY PATH / LOCAL INTERACTION PROOF</small>
      </div>
    </div>
  );
}
