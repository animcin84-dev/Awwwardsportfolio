import type { Metadata } from "next";
import { Capabilities } from "../components/Capabilities";
import { MethodTextMotion } from "../components/MethodTextMotion";
import { Navigation } from "../components/Navigation";

export const metadata: Metadata = { title: "Operating Method | Daniyal Bauyrzhan", description: "Hold context, make the safest useful move, and prove the result." };

export default function MethodPage() {
  return <main className="chapter-page chapter-paper">
    <Navigation />
    <header className="chapter-hero">
      <span>PAGE 03 / OPERATING METHOD</span>
      <h1>Useful intelligence<br /><i>closes the loop.</i></h1>
      <p>Context survives. Execution stays constrained. Evidence returns to the person who owns the result.</p>
      <a href="#method-motion">Read through motion ↓</a>
    </header>
    <section className="chapter-method" id="method-motion"><MethodTextMotion /></section>
    <section className="chapter-capabilities"><header><span>CAPABILITY SET / 04</span><h2>What I bring<br />to the operation.</h2></header><Capabilities /></section>
  </main>;
}

