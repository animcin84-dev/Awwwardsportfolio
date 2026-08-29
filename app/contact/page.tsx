import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { Navigation } from "../components/Navigation";

export const metadata: Metadata = { title: "Start a System | Daniyal Bauyrzhan", description: "Bring the hard part: a private project brief for selected AI product collaborations." };

export default function ContactPage() {
  return <main className="chapter-page contact-page">
    <Navigation />
    <header className="chapter-hero chapter-contact-hero">
      <span>PAGE 05 / START A SYSTEM</span>
      <h1>Bring the<br /><i>hard part.</i></h1>
      <p>If the project has memory, tools, risk, and real-world consequences, begin with the constraint that is hardest to make trustworthy.</p>
    </header>
    <section className="chapter-contact"><div className="chapter-contact-status"><span><i /> AVAILABLE FOR SELECTED COLLABORATIONS</span><strong>ALMATY / UTC+5<br />WORKING GLOBALLY</strong><p>No public post. No account required. Your text stays in the form if delivery fails.</p></div><ContactForm /></section>
    <footer className="chapter-footer"><span>© 2026 Daniyal Bauyrzhan</span><Link href="/work">Explore project atlas →</Link><Link href="/">Index ↑</Link></footer>
  </main>;
}
