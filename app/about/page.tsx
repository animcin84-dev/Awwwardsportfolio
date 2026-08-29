import type { Metadata } from "next";
import { AboutSystem } from "../components/AboutSystem";
import { Navigation } from "../components/Navigation";

export const metadata: Metadata = { title: "About Daniyal | AI Systems Builder", description: "Independent AI systems builder in Almaty, working across product logic, engineering, interaction, and evidence." };

export default function AboutPage() {
  return <main className="chapter-page chapter-paper">
    <Navigation />
    <header className="chapter-hero">
      <span>PAGE 04 / OPERATOR PROFILE</span>
      <h1>One owner from<br /><i>product to proof.</i></h1>
      <p>I work where ambitious model capability meets an actual person: the handoff, the uncertainty, and the proof that makes the next move trustworthy.</p>
      <a href="#about-system">Inspect the operating loop ↓</a>
    </header>
    <section className="chapter-about" id="about-system"><AboutSystem /><p className="chapter-about-note">Building independently in Almaty, collaborating globally, and looking for difficult product problems that need both systems depth and a clear human surface.</p></section>
  </main>;
}

