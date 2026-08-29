import Image from "next/image";

const principles = [
  ["01", "THINK", "Turn the real constraint into a product decision."],
  ["02", "BUILD", "Own the system from model route to human surface."],
  ["03", "PROVE", "Return evidence, recovery, and a legible result."],
] as const;

export function AboutSystem() {
  return (
    <div className="about-system about-system-v2" id="about-operating-loop">
      <div className="about-orbit about-orbit-v2" role="img" aria-label="Daniyal connects product thinking, engineering, and verification in one operating loop.">
        <div className="about-orbit-grid" aria-hidden="true" />
        <i className="about-orbit-ring ring-a" aria-hidden="true" /><i className="about-orbit-ring ring-b" aria-hidden="true" /><i className="about-orbit-ring ring-c" aria-hidden="true" />
        <div className="about-orbit-center"><Image src="/d-mark.webp" width={1254} height={1254} sizes="(max-width: 640px) 58px, 92px" alt="" /><span>ONE OWNER</span><small>PRODUCT → PROOF</small></div>
        <div className="about-orbit-node node-think"><span>01</span><strong>THINK</strong><small>Product logic</small></div>
        <div className="about-orbit-node node-build"><span>02</span><strong>BUILD</strong><small>System depth</small></div>
        <div className="about-orbit-node node-prove"><span>03</span><strong>PROVE</strong><small>Visible evidence</small></div>
        <div className="about-orbit-telemetry" aria-hidden="true"><span>43.2389° N</span><i /><span>76.8897° E</span></div>
      </div>
      <div className="about-command">
        <header><span>OPERATOR PROFILE / 2026</span><strong>One mind across the complete operation.</strong></header>
        <div className="about-principle-list">
          {principles.map(([index, title, copy]) => <article key={title}><span>{index}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i></article>)}
        </div>
        <div className="about-ledger">
          <div><span>BASE</span><strong>Almaty, Kazakhstan</strong><small>UTC+5 · working globally</small></div>
          <div><span>MODE</span><strong>Independent builder</strong><small>Direction through shipped system</small></div>
          <div><span>FOCUS</span><strong>Ambitious AI products</strong><small>Reliability and interaction together</small></div>
        </div>
      </div>
    </div>
  );
}
