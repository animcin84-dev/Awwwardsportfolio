import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Route Not Found | Daniyal Bauyrzhan",
  description: "This operation returned no route. Recover to Daniyal Bauyrzhan's portfolio or selected work.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="not-found-page" id="not-found-main">
      <a className="skip-link" href="#not-found-title">Skip to recovery</a>
      <div className="not-found-signal" aria-hidden="true" />

      <header className="not-found-header">
        <Link href="/" className="not-found-brand" aria-label="Daniyal portfolio home" data-cursor="action" data-label="HOME ↖">
          <Image src="/d-mark.webp" width={42} height={42} sizes="42px" alt="" priority />
          <span>Daniyal</span>
        </Link>
        <p><span>404</span> SYSTEM ROUTE / UNRESOLVED</p>
      </header>

      <section className="not-found-stage" aria-labelledby="not-found-title">
        <p className="not-found-kicker">LOST OPERATION / NO TARGET RETURNED</p>
        <h1 id="not-found-title" tabIndex={-1}><span>NO</span><span>RESULT.</span></h1>
        <div className="not-found-copy">
          <p>This route returned no evidence. The system still knows the way back.</p>
          <nav aria-label="Recovery routes">
            <Link href="/" data-cursor="action" data-label="RETURN ↖"><span>Return to index</span><b aria-hidden="true">↖</b></Link>
            <Link href="/#work" data-cursor="action" data-label="WORK ↓"><span>Inspect selected work</span><b aria-hidden="true">↓</b></Link>
          </nav>
        </div>
      </section>

      <aside className="not-found-ledger" aria-label="Route recovery status">
        <div><span>01 / REQUEST</span><strong>Unknown route</strong></div>
        <div><span>02 / RESULT</span><strong>No target</strong></div>
        <div><span>03 / RECOVERY</span><strong>Owned path</strong></div>
      </aside>

      <footer className="not-found-footer">
        <span>ERRORS SHOULD END WITH A NEXT MOVE.</span>
        <strong>ALMATY / 2026</strong>
      </footer>
    </main>
  );
}
