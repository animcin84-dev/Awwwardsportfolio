"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../antares.module.css";

const awards = [
  ["DEC 2023", "ALMATY", "TECH CUP", "CONTROL AWARD · II"],
  ["JAN 2024", "DEPOK", "NUSANTARA REGIONAL", "THINK AWARD · WINNER"],
  ["JAN 2024", "DEPOK", "NUSANTARA REGIONAL", "FINALIST ALLIANCE · CAPTAIN"],
  ["JAN 2024", "DEPOK", "NUSANTARA REGIONAL", "CONTROL AWARD · III"],
  ["JAN 2024", "ALMATY", "TAMOS FIRST", "CONTROL AWARD · WINNER"],
  ["FEB 2024", "ALMATY", "CENTRAL ASIA", "THINK AWARD · III"],
  ["FEB 2024", "ALMATY", "CENTRAL ASIA", "PROMOTE AWARD · III"],
  ["NOV 2024", "ALMATY", "REGIONAL", "THINK AWARD · II"],
  ["DEC 2025", "BISHKEK", "FIRST REGIONAL", "REACH AWARD · WINNER"],
  ["JAN 2026", "ALMATY", "DARYN QUALIFIER", "SUSTAIN AWARD · III"],
  ["JUN 2026", "LEPSI", "OFF-SEASON", "JUDGES’ CHOICE"],
] as const;

const systems = [
  ["01", "MECHANICS", "Structure is performance.", "Chassis, motion, manipulators and every iteration between prototype and field-ready machine."],
  ["02", "CONTROL", "Precision under pressure.", "Sensors, control loops, driver feedback and autonomous decisions become one readable operating system."],
  ["03", "SOFTWARE", "Code leaves a trace.", "Autonomous routines, vision and telemetry are presented as engineering evidence — not decorative code blocks."],
  ["04", "ITERATION", "Failure becomes geometry.", "Every broken part and imperfect run is material for the next revision. The portfolio makes that progression visible."],
] as const;

const seasons = [
  { year: "23/24", game: "CENTERSTAGE", record: "19—14—0", detail: "The breakout season. Seven distinctions and an international finalist run in Indonesia." },
  { year: "24/25", game: "INTO THE DEEP", record: "06—13—0", detail: "A harder season, but engineering quality still earned Think Award II at Almaty Regional." },
  { year: "25/26", game: "DECODE", record: "12—13—0", detail: "Reach, Sustain and Judges’ Choice marked another chapter of technical and community growth." },
  { year: "26/27", game: "BIOBUZZ", record: "NEXT", detail: "The next machine is not documented yet. This chapter stays intentionally open until evidence arrives." },
] as const;

function StarCore() {
  return (
    <div className={styles.starStage} aria-hidden="true">
      <div className={styles.starHalo} />
      <div className={styles.starDisc} />
      <div className={styles.starRim} />
      <div className={styles.orbitA} />
      <div className={styles.orbitB} />
      <div className={styles.reticle}><i/><i/><i/><i/></div>
    </div>
  );
}

export function AntaresExperience() {
  const root = useRef<HTMLDivElement>(null);
  const awardCount = useMemo(() => awards.length.toString().padStart(2, "0"), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-antares-intro]", {
        yPercent: 115,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.08,
      });

      gsap.utils.toArray<HTMLElement>("[data-antares-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 64,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      gsap.to("[data-star]", {
        scale: 1.42,
        rotate: 12,
        yPercent: 13,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.fromTo("[data-route-line]", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-mission]", start: "top 72%", end: "center 45%", scrub: 1 },
      });

      gsap.utils.toArray<HTMLElement>("[data-award-row]").forEach((row, index) => {
        gsap.from(row, {
          xPercent: index % 2 ? 5 : -5,
          opacity: 0,
          duration: 0.7,
          scrollTrigger: { trigger: row, start: "top 91%", once: true },
        });
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-system-card]");
      cards.forEach((card) => {
        const bar = card.querySelector<HTMLElement>("[data-system-bar]");
        if (!bar) return;
        gsap.fromTo(bar, { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top 80%", end: "bottom 55%", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={styles.site}>
      <header className={styles.nav}>
        <a href="#top" className={styles.brand} aria-label="ANTARES home"><span className={styles.brandMark}>✦</span><strong>ANTARES</strong></a>
        <nav aria-label="Primary navigation">
          <a href="#mission">MISSION</a>
          <a href="#engineering">ENGINEERING</a>
          <a href="#record">RECORD</a>
          <a href="#team">TEAM</a>
        </nav>
        <a className={styles.navSignal} href="https://www.instagram.com/antares_ftc/" target="_blank" rel="noreferrer">SIGNAL ↗</a>
      </header>

      <main id="top">
        <section className={styles.hero} data-hero>
          <div data-star><StarCore /></div>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroTopline}>
            <span data-antares-intro>ALMATY · KAZAKHSTAN</span>
            <span data-antares-intro>FTC · EST. 2023</span>
            <span data-antares-intro>43.2380°N / 76.9455°E</span>
          </div>
          <div className={styles.heroLockup}>
            <p data-antares-intro>ENGINEERING A RED SUPERGIANT</p>
            <h1 aria-label="ANTARES"><span data-antares-intro>ANT</span><span data-antares-intro>ARES</span></h1>
            <div className={styles.heroStatement} data-antares-intro>
              <span>ROBOTS BUILT</span><span>UNDER PRESSURE.</span>
            </div>
          </div>
          <div className={styles.heroBottom}>
            <div data-antares-intro><small>STATUS</small><strong>MISSION ACTIVE</strong></div>
            <p data-antares-intro>A competition robotics team from Almaty documenting the machine, the people, and the engineering behind every result.</p>
            <a href="#mission" data-antares-intro>ENTER MISSION <b>↓</b></a>
          </div>
        </section>

        <section className={styles.manifesto}>
          <div className={styles.sectionIndex} data-antares-reveal><span>00</span><span>IDENTITY / THESIS</span></div>
          <p className={styles.manifestoText} data-antares-reveal>
            We don’t build robots to look futuristic. <em>We build systems that survive reality.</em>
          </p>
          <div className={styles.manifestoFoot} data-antares-reveal>
            <span>HEAT</span><i/> <span>PRESSURE</span><i/> <span>PRECISION</span><i/> <span>ITERATION</span>
          </div>
        </section>

        <section className={styles.mission} id="mission" data-mission>
          <div className={styles.sectionIndex} data-antares-reveal><span>01</span><span>FLAGSHIP MISSION / INTERNATIONAL</span></div>
          <div className={styles.missionHeading}>
            <p data-antares-reveal>JAN · 05—07 · 2024</p>
            <h2 data-antares-reveal>ALMATY<br/><span>→</span> DEPOK.</h2>
            <div className={styles.missionRank} data-antares-reveal><small>QUALIFICATION</small><strong>02<sup>/15</sup></strong></div>
          </div>
          <div className={styles.routeTrack} aria-hidden="true"><i data-route-line/><span className={styles.routeStart}>ALA</span><span className={styles.routeEnd}>CGK</span></div>
          <div className={styles.missionOutcome}>
            <div data-antares-reveal><small>OUTCOME 01</small><strong>THINK AWARD</strong><span>WINNER</span></div>
            <div data-antares-reveal><small>OUTCOME 02</small><strong>FINALIST ALLIANCE</strong><span>CAPTAIN</span></div>
            <div data-antares-reveal><small>OUTCOME 03</small><strong>CONTROL AWARD</strong><span>III PLACE</span></div>
          </div>
          <p className={styles.missionCopy} data-antares-reveal>One trip became a compressed proof of the whole system: preparation, engineering documentation, robot performance, alliance leadership and the ability to explain why the machine works.</p>
        </section>

        <section className={styles.engineering} id="engineering">
          <div className={styles.sectionIndex} data-antares-reveal><span>02</span><span>ENGINEERING / SYSTEMS</span></div>
          <div className={styles.engineeringLead}>
            <h2 data-antares-reveal>THE ROBOT IS<br/>NOT ONE THING.</h2>
            <p data-antares-reveal>It is a temporary agreement between structure, code, control and iteration. This portfolio is designed to expose those layers as soon as ANTARES supplies the current CAD and robot media.</p>
          </div>
          <div className={styles.systemGrid}>
            {systems.map(([n, name, title, copy]) => (
              <article key={name} className={styles.systemCard} data-system-card>
                <div className={styles.systemBar} data-system-bar/>
                <span>{n}</span><small>{name}</small><h3>{title}</h3><p>{copy}</p>
                <b aria-hidden="true">↗</b>
              </article>
            ))}
          </div>
          <div className={styles.robotPlaceholder} data-antares-reveal>
            <div className={styles.robotGlyph} aria-hidden="true"><span/><span/><span/><i/><i/><b/></div>
            <div><small>ROBOT EXPLORER / MEDIA SLOT</small><strong>REAL CAD<br/>GOES HERE.</strong><p>No fake robot is used. Drop the team’s GLB/STEP export into the production pipeline and this becomes the interactive exploded assembly.</p></div>
            <span className={styles.robotCoord}>X 24935 / Y 24924<br/>IDENTITY LINK: VERIFY</span>
          </div>
        </section>

        <section className={styles.record} id="record">
          <div className={styles.sectionIndex} data-antares-reveal><span>03</span><span>COMPETITIVE RECORD / VERIFIED SOURCES</span></div>
          <div className={styles.recordHeadline} data-antares-reveal><span>{awardCount}</span><h2>RECORDED<br/>DISTINCTIONS.</h2><p>Historical results currently found under ANTARES FTC 24935. The site intentionally keeps the 24924↔24935 relationship flagged until the team confirms it.</p></div>
          <div className={styles.awardList}>
            {awards.map(([date, city, event, award], index) => (
              <div className={styles.awardRow} data-award-row key={`${event}-${award}-${index}`}>
                <span>{String(index + 1).padStart(2,"0")}</span><span>{date}</span><span>{city}</span><strong>{event}</strong><b>{award}</b>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.seasons}>
          <div className={styles.sectionIndex} data-antares-reveal><span>04</span><span>MISSION ARCHIVE / SEASONS</span></div>
          <div className={styles.seasonList}>
            {seasons.map((season) => (
              <article key={season.year} data-antares-reveal>
                <span>{season.year}</span><h3>{season.game}</h3><strong>{season.record}</strong><p>{season.detail}</p><b>↗</b>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.team} id="team">
          <div className={styles.sectionIndex} data-antares-reveal><span>05</span><span>TEAM / HUMAN SYSTEM</span></div>
          <div className={styles.teamIntro}>
            <h2 data-antares-reveal>THE MACHINE<br/>HAS MANY AUTHORS.</h2>
            <p data-antares-reveal>The final roster, mentor list and portraits are deliberately not invented. When supplied, each member gets a large editorial portrait, role, specialty and personal contribution — not a generic avatar card.</p>
          </div>
          <div className={styles.teamSlots} aria-label="Future team roster slots">
            {["MECHANICAL", "SOFTWARE", "CAD", "DRIVE", "OUTREACH", "MENTORS"].map((role, i) => <div key={role} data-antares-reveal><span>{String(i+1).padStart(2,"0")}</span><strong>{role}</strong><small>ROSTER DATA REQUIRED</small></div>)}
          </div>
        </section>

        <section className={styles.impact}>
          <div className={styles.impactCopy} data-antares-reveal>
            <span>06 / IMPACT</span><h2>ENGINEERING<br/>SHOULD TRAVEL.</h2><p>Workshops, outreach, school programs and community metrics will appear here only when the team supplies evidence. No fabricated reach counters. No vanity numbers.</p>
          </div>
          <div className={styles.impactOrbit} aria-hidden="true"><i/><i/><i/><span>ALMATY</span><span>STEM</span><span>FIRST</span></div>
        </section>

        <section className={styles.final}>
          <StarCore />
          <div className={styles.finalGrid} aria-hidden="true" />
          <p data-antares-reveal>NEXT SIGNAL / ANTARES</p>
          <h2 data-antares-reveal>BUILD<br/>THE NEXT<br/><em>MISSION.</em></h2>
          <div className={styles.finalLinks} data-antares-reveal>
            <a href="https://www.instagram.com/antares_ftc/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
            <a href="https://ftc-events.firstinspires.org/" target="_blank" rel="noreferrer">FIRST ↗</a>
          </div>
          <footer><span>ANTARES · ALMATY · KAZAKHSTAN</span><span>FTC / 2023—2026</span><a href="#top">BACK TO ORBIT ↑</a></footer>
        </section>
      </main>
    </div>
  );
}
