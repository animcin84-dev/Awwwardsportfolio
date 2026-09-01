"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AntaresStarCanvas } from "./AntaresStarCanvas";
import styles from "../antares.module.css";

const awards = [
  { date:"DEC 2023", city:"ALMATY", event:"TECH CUP", award:"CONTROL AWARD · II", season:"CENTERSTAGE" },
  { date:"JAN 2024", city:"DEPOK", event:"NUSANTARA REGIONAL", award:"THINK AWARD · WINNER", season:"CENTERSTAGE" },
  { date:"JAN 2024", city:"DEPOK", event:"NUSANTARA REGIONAL", award:"FINALIST ALLIANCE · CAPTAIN", season:"CENTERSTAGE" },
  { date:"JAN 2024", city:"DEPOK", event:"NUSANTARA REGIONAL", award:"CONTROL AWARD · III", season:"CENTERSTAGE" },
  { date:"JAN 2024", city:"ALMATY", event:"TAMOS FIRST", award:"CONTROL AWARD · WINNER", season:"CENTERSTAGE" },
  { date:"FEB 2024", city:"ALMATY", event:"CENTRAL ASIA", award:"THINK AWARD · III", season:"CENTERSTAGE" },
  { date:"FEB 2024", city:"ALMATY", event:"CENTRAL ASIA", award:"PROMOTE AWARD · III", season:"CENTERSTAGE" },
  { date:"NOV 2024", city:"ALMATY", event:"REGIONAL", award:"THINK AWARD · II", season:"INTO THE DEEP" },
  { date:"DEC 2025", city:"BISHKEK", event:"FIRST REGIONAL", award:"REACH AWARD · WINNER", season:"DECODE" },
  { date:"JAN 2026", city:"ALMATY", event:"DARYN QUALIFIER", award:"SUSTAIN AWARD · III", season:"DECODE" },
  { date:"JUN 2026", city:"LEPSI", event:"OFF-SEASON", award:"JUDGES’ CHOICE", season:"DECODE" },
] as const;

const systems = [
  { key:"MECHANICAL", index:"01", title:"Structure is performance.", body:"Chassis, manipulators, motion and every physical revision between prototype and field-ready machine.", signal:"LOAD / MOTION / GEOMETRY", nodes:["CHASSIS","DRIVE","MANIPULATOR","REVISION"] },
  { key:"CONTROL", index:"02", title:"Precision under pressure.", body:"Sensors, control loops, driver feedback and autonomous behavior become one legible operating system.", signal:"SENSE / DECIDE / ACT", nodes:["SENSORS","FEEDBACK","AUTONOMOUS","DRIVER"] },
  { key:"SOFTWARE", index:"03", title:"Code leaves a trace.", body:"Vision, autonomous routines and telemetry are shown as engineering evidence, not as decorative code screenshots.", signal:"VISION / STATE / TELEMETRY", nodes:["VISION","STATE","ROUTINE","TRACE"] },
  { key:"ITERATION", index:"04", title:"Failure becomes geometry.", body:"Every bad run, broken part and slow mechanism is converted into a clearer next revision and documented decision.", signal:"TEST / FAIL / LEARN / REBUILD", nodes:["TEST","FAULT","EVIDENCE","REVISION"] },
] as const;

const seasons = [
  ["23/24","CENTERSTAGE","19—14—0","Seven recorded distinctions. International finalist run in Indonesia."],
  ["24/25","INTO THE DEEP","06—13—0","A difficult season that still earned Think Award II at Almaty Regional."],
  ["25/26","DECODE","12—13—0","Reach, Sustain and Judges’ Choice continued the team’s technical/community record."],
  ["26/27","BIOBUZZ","NEXT","Open chapter. No invented result appears before the machine competes."],
] as const;

function SectionIndex({ n, children }: { n:string; children:React.ReactNode }) {
  return <div className={styles.sectionIndex} data-antares-reveal><span>{n}</span><span>{children}</span></div>;
}

function StaticStar() {
  return <div className={styles.starStage} aria-hidden="true"><div className={styles.starHalo}/><div className={styles.starDisc}/><div className={styles.starRim}/><div className={styles.orbitA}/><div className={styles.orbitB}/></div>;
}

export function AntaresExperienceV2() {
  const root = useRef<HTMLDivElement>(null);
  const [activeSystem, setActiveSystem] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-antares-intro]", { yPercent:110, opacity:0, duration:1.15, stagger:.07, ease:"power4.out", delay:.12 });
      gsap.utils.toArray<HTMLElement>("[data-antares-reveal]").forEach((el) => {
        gsap.from(el,{ y:54, opacity:0, duration:.9, ease:"power3.out", scrollTrigger:{ trigger:el, start:"top 88%", once:true } });
      });
      gsap.fromTo("[data-route-line]",{scaleX:0},{scaleX:1,ease:"none",scrollTrigger:{trigger:"[data-mission]",start:"top 70%",end:"center 45%",scrub:1}});
      gsap.utils.toArray<HTMLElement>("[data-award-row]").forEach((row,index)=>gsap.from(row,{opacity:0,x:index%2?26:-26,duration:.65,scrollTrigger:{trigger:row,start:"top 93%",once:true}}));
      gsap.to("[data-webgl-stage]",{yPercent:16,scale:1.12,ease:"none",scrollTrigger:{trigger:"[data-hero]",start:"top top",end:"bottom top",scrub:1}});
    },root);
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      setScrollPct(Math.min(100, Math.max(0, scrollY / max * 100)));
    };
    update();
    addEventListener("scroll",update,{passive:true});
    return () => { removeEventListener("scroll",update); ctx.revert(); };
  },[]);

  const active = systems[activeSystem];

  return <div ref={root} className={styles.site}>
    <div aria-hidden="true" style={{position:"fixed",left:0,top:0,height:2,width:`${scrollPct}%`,background:"#ff4a21",zIndex:120,pointerEvents:"none"}}/>
    <header className={styles.nav}>
      <a href="#top" className={styles.brand} aria-label="ANTARES home"><span className={styles.brandMark}>✦</span><strong>ANTARES</strong></a>
      <nav aria-label="Primary"><a href="#mission">MISSION</a><a href="#engineering">ENGINEERING</a><a href="#record">RECORD</a><a href="#team">TEAM</a></nav>
      <a className={styles.navSignal} href="https://www.instagram.com/antares_ftc/" target="_blank" rel="noreferrer">SIGNAL ↗</a>
    </header>

    <main id="top">
      <section className={styles.hero} data-hero>
        <div data-webgl-stage aria-hidden="true" style={{position:"absolute",inset:"2% -12% -8% 30%",zIndex:-1,opacity:.92}}><AntaresStarCanvas/></div>
        <div className={styles.heroGrid} aria-hidden="true"/>
        <div className={styles.heroTopline}><span data-antares-intro>ALMATY · KAZAKHSTAN</span><span data-antares-intro>FTC · EST. 2023</span><span data-antares-intro>43.2380°N / 76.9455°E</span></div>
        <div className={styles.heroLockup}>
          <p data-antares-intro>ENGINEERING A RED SUPERGIANT</p>
          <h1 aria-label="ANTARES"><span data-antares-intro>ANT</span><span data-antares-intro>ARES</span></h1>
          <div className={styles.heroStatement} data-antares-intro><span>ROBOTS BUILT</span><span>UNDER PRESSURE.</span></div>
        </div>
        <div className={styles.heroBottom}>
          <div data-antares-intro><small>SIGNAL</small><strong>MISSION ACTIVE</strong></div>
          <p data-antares-intro>Competition robotics from Almaty. The machine, engineering record and human system behind every field result.</p>
          <a href="#mission" data-antares-intro>ENTER MISSION <b>↓</b></a>
        </div>
      </section>

      <section className={styles.manifesto}>
        <SectionIndex n="00">IDENTITY / THESIS</SectionIndex>
        <p className={styles.manifestoText} data-antares-reveal>We don’t build robots to look futuristic. <em>We build systems that survive reality.</em></p>
        <div className={styles.manifestoFoot} data-antares-reveal><span>HEAT</span><i/><span>PRESSURE</span><i/><span>PRECISION</span><i/><span>ITERATION</span></div>
      </section>

      <section className={styles.mission} id="mission" data-mission>
        <SectionIndex n="01">FLAGSHIP MISSION / INTERNATIONAL</SectionIndex>
        <div className={styles.missionHeading}><p data-antares-reveal>JAN · 05—07 · 2024</p><h2 data-antares-reveal>ALMATY<br/><span>→</span> DEPOK.</h2><div className={styles.missionRank} data-antares-reveal><small>QUALIFICATION</small><strong>02<sup>/15</sup></strong></div></div>
        <div className={styles.routeTrack} aria-hidden="true"><i data-route-line/><span className={styles.routeStart}>ALA</span><span className={styles.routeEnd}>CGK</span></div>
        <div className={styles.missionOutcome}><div data-antares-reveal><small>OUTCOME 01</small><strong>THINK AWARD</strong><span>WINNER</span></div><div data-antares-reveal><small>OUTCOME 02</small><strong>FINALIST ALLIANCE</strong><span>CAPTAIN</span></div><div data-antares-reveal><small>OUTCOME 03</small><strong>CONTROL AWARD</strong><span>III PLACE</span></div></div>
        <p className={styles.missionCopy} data-antares-reveal>Fifteen teams. Qualification rank two. Alliance captain. A final. Three distinctions. The trip works as a compressed proof of engineering, documentation, strategy and communication.</p>
        <a href="https://ftc-events.firstinspires.org/2023/team/24935" target="_blank" rel="noreferrer" data-antares-reveal style={{display:"inline-block",marginTop:28,fontSize:10,letterSpacing:".16em",borderBottom:"1px solid #ff4a21",paddingBottom:6}}>VERIFY IN FIRST EVENT WEB ↗</a>
      </section>

      <section className={styles.engineering} id="engineering">
        <SectionIndex n="02">ENGINEERING / ANATOMY</SectionIndex>
        <div className={styles.engineeringLead}><h2 data-antares-reveal>THE ROBOT IS<br/>NOT ONE THING.</h2><p data-antares-reveal>It is a temporary agreement between structure, code, control and iteration. Select a layer to inspect the engineering language. Real subsystem specs replace this copy as soon as current CAD and documentation arrive.</p></div>

        <div data-antares-reveal style={{display:"grid",gridTemplateColumns:"minmax(260px,.75fr) 2fr",border:"1px solid #aaa198",minHeight:580,marginBottom:"8vw"}} className="antares-anatomy">
          <div style={{borderRight:"1px solid #aaa198",display:"flex",flexDirection:"column"}}>
            {systems.map((item,i)=><button key={item.key} onClick={()=>setActiveSystem(i)} aria-pressed={activeSystem===i} style={{appearance:"none",border:0,borderBottom:"1px solid #aaa198",background:activeSystem===i?"#ff4a21":"transparent",color:activeSystem===i?"#080604":"#0a0a0a",padding:"21px 20px",textAlign:"left",display:"grid",gridTemplateColumns:"45px 1fr",cursor:"pointer",font:"inherit"}}><span style={{fontSize:10}}>{item.index}</span><strong style={{letterSpacing:".08em",fontSize:12}}>{item.key}</strong></button>)}
            <div style={{padding:20,marginTop:"auto",font:"10px/1.6 monospace",color:"#777"}}>ANATOMY MODE<br/>SOURCE / TEAM CAD<br/>STATUS / AWAITING MODEL</div>
          </div>
          <div style={{position:"relative",padding:"clamp(28px,5vw,76px)",overflow:"hidden",background:"radial-gradient(circle at 80% 30%,rgba(255,74,33,.11),transparent 38%)"}}>
            <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,0,0,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.055) 1px,transparent 1px)",backgroundSize:"38px 38px"}}/>
            <div style={{position:"relative",zIndex:2,maxWidth:760}}>
              <small style={{fontSize:10,letterSpacing:".15em",color:"#777"}}>{active.index} / {active.signal}</small>
              <h3 style={{fontSize:"clamp(45px,7vw,112px)",lineHeight:.84,letterSpacing:"-.065em",margin:"45px 0 35px"}}>{active.title}</h3>
              <p style={{fontSize:"clamp(16px,2vw,25px)",lineHeight:1.35,maxWidth:640,color:"#514c47"}}>{active.body}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",marginTop:60,borderTop:"1px solid #aaa198"}}>{active.nodes.map((node,i)=><div key={node} style={{padding:"16px 8px",borderRight:i<3?"1px solid #aaa198":"none"}}><span style={{fontSize:9,color:"#8a837c"}}>0{i+1}</span><strong style={{display:"block",fontSize:10,marginTop:8,letterSpacing:".08em"}}>{node}</strong></div>)}</div>
            </div>
          </div>
        </div>

        <div className={styles.robotPlaceholder} data-antares-reveal><div className={styles.robotGlyph} aria-hidden="true"><span/><span/><span/><i/><i/><b/></div><div><small>ROBOT EXPLORER / PRODUCTION SLOT</small><strong>REAL CAD<br/>BECOMES THE HERO.</strong><p>The final experience will load the team’s own optimized GLB, expose named mechanisms, and support an exploded view. No stock or AI-fabricated robot stands in for ANTARES.</p></div><span className={styles.robotCoord}>R3F / GLTFJSX / GLB<br/>MOBILE LOD + STATIC FALLBACK</span></div>
      </section>

      <section className={styles.record} id="record">
        <SectionIndex n="03">COMPETITIVE RECORD / SOURCE-BACKED</SectionIndex>
        <div className={styles.recordHeadline} data-antares-reveal><span>11</span><h2>RECORDED<br/>DISTINCTIONS.</h2><p>Historical placements currently found under FTC 24935. ANTARES 24924 directly links to the supplied Instagram, so the identity relationship remains visibly unresolved until the team confirms it.</p></div>
        <div className={styles.awardList}>{awards.map((a,index)=><div className={styles.awardRow} data-award-row key={`${a.event}-${a.award}-${index}`}><span>{String(index+1).padStart(2,"0")}</span><span>{a.date}</span><span>{a.city}</span><strong>{a.event}</strong><b>{a.award}</b></div>)}</div>
        <div data-antares-reveal style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"center",paddingTop:22,fontSize:10,letterSpacing:".13em",color:"#918a81"}}><span>FTC 24935 · HISTORICAL RECORD</span><a style={{color:"#ff7650"}} href="https://ftc-events.firstinspires.org/2023/team/24935" target="_blank" rel="noreferrer">SOURCE ↗</a></div>
      </section>

      <section className={styles.seasons}><SectionIndex n="04">MISSION ARCHIVE / SEASONS</SectionIndex><div className={styles.seasonList}>{seasons.map(([year,game,record,detail])=><article key={year} data-antares-reveal><span>{year}</span><h3>{game}</h3><strong>{record}</strong><p>{detail}</p><b>↗</b></article>)}</div></section>

      <section className={styles.team} id="team"><SectionIndex n="05">TEAM / HUMAN SYSTEM</SectionIndex><div className={styles.teamIntro}><h2 data-antares-reveal>THE MACHINE<br/>HAS MANY AUTHORS.</h2><p data-antares-reveal>The final roster, mentors and portraits are intentionally not invented. When supplied, every person gets a large editorial portrait, role, specialty and concrete contribution — never a generic avatar grid.</p></div><div className={styles.teamSlots}>{["MECHANICAL","SOFTWARE","CAD","DRIVE","OUTREACH","MENTORS"].map((role,i)=><div key={role} data-antares-reveal><span>{String(i+1).padStart(2,"0")}</span><strong>{role}</strong><small>ROSTER DATA REQUIRED</small></div>)}</div></section>

      <section className={styles.impact}><div className={styles.impactCopy} data-antares-reveal><span>06 / IMPACT</span><h2>ENGINEERING<br/>SHOULD TRAVEL.</h2><p>Workshops, outreach, school programs and community reach become a measurable chapter after the team supplies evidence. No fabricated counters. The same rule that governs engineering governs the website: prove the claim.</p></div><div className={styles.impactOrbit} aria-hidden="true"><i/><i/><i/><span>ALMATY</span><span>STEM</span><span>FIRST</span></div></section>

      <section className={styles.final}><StaticStar/><div className={styles.finalGrid} aria-hidden="true"/><p data-antares-reveal>NEXT SIGNAL / ANTARES</p><h2 data-antares-reveal>BUILD<br/>THE NEXT<br/><em>MISSION.</em></h2><div className={styles.finalLinks} data-antares-reveal><a href="https://www.instagram.com/antares_ftc/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href="https://ftc-events.firstinspires.org/" target="_blank" rel="noreferrer">FIRST ↗</a></div><footer><span>ANTARES · ALMATY · KAZAKHSTAN</span><span>FTC / 2023—2026</span><a href="#top">BACK TO ORBIT ↑</a></footer></section>
    </main>
  </div>;
}
