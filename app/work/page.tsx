import type { Metadata } from "next";
import { Navigation } from "../components/Navigation";
import { RotatingProjectAtlas } from "../components/RotatingProjectAtlas";

export const metadata: Metadata = { title: "Project Atlas | Daniyal Bauyrzhan", description: "Fourteen public builds across AI systems, products, education, cities, trust, and interaction." };

export default function WorkIndexPage() {
  return <main className="chapter-page chapter-work">
    <Navigation />
    <header className="chapter-hero chapter-hero-dark">
      <span>PAGE 02 / PROJECT ATLAS</span>
      <h1>Fourteen builds.<br /><i>One operating field.</i></h1>
      <p>Every image opens a local project page. Public source remains a receipt, never a substitute for the story.</p>
      <a href="#project-universe">Enter the atlas ↓</a>
    </header>
    <RotatingProjectAtlas />
  </main>;
}

