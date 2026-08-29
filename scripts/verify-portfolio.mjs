import { access, readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const sha256 = async (path) => createHash("sha256").update(await readFile(new URL(path, root))).digest("hex");
const [page, layout, notFound, caseStudyPage, projectData, css, motion, navigation, heroVideo, qadamDemoVideo, revealWatcher, capabilities, operationTrace, helixRecovery, projectInspection, scrollWorld, universeScene, autoSequence, silkWaves, motionWords, exactCursorComponent, exactCursor, exactCursorCss, heroPointer, contactForm, contactRoute, manifest, readme, launchAssetScript, nextConfig, pkg] = await Promise.all([
  read("app/page.tsx"), read("app/layout.tsx"), read("app/not-found.tsx"), read("app/work/[slug]/page.tsx"), read("app/work/projects.ts"), read("app/globals.css"), read("app/components/MotionSystem.tsx"),
  read("app/components/Navigation.tsx"), read("app/components/HeroVideo.tsx"), read("app/components/QadamDemoVideo.tsx"), read("app/components/RevealWatcher.tsx"),
  read("app/components/Capabilities.tsx"), read("app/components/OperationTrace.tsx"), read("app/components/HelixRecovery.tsx"), read("app/components/ProjectInspection.tsx"), read("app/components/ScrollEvidenceTunnel.tsx"), read("app/components/universe/UniverseScene.tsx"), read("app/components/useScrollAutoSequence.tsx"), read("app/components/SilkWaves.tsx"), read("app/components/MotionWords.tsx"), read("app/components/DirectionalCursorExactComponent.tsx"), read("app/components/DirectionalCursorExact.ts"), read("app/components/directional-cursor-exact.css"), read("app/components/HeroPointer.tsx"), read("app/components/ContactForm.tsx"), read("app/api/contact/route.ts"), read("app/manifest.ts"), read("README.md"), read("scripts/generate-launch-assets.mjs"), read("next.config.mjs"), read("package.json"),
]);

const launchAssetsPresent = (await Promise.all([
  "app/opengraph-image.jpg", "app/twitter-image.jpg", "app/icon.png", "app/apple-icon.png", "public/icon-192.png", "public/icon-512.png",
].map(async (path) => {
  try { await access(new URL(path, root)); return true; } catch { return false; }
}))).every(Boolean);

const materialSignalPresent = await access(new URL("public/material-signal.webp", root)).then(() => true).catch(() => false);
const qadamDemoPresent = await access(new URL("public/evidence/qadam-fallback-demo.mp4", root)).then(() => true).catch(() => false);
const directionalCursorAssetPresent = await access(new URL("public/directional-cursor-reference.png", root)).then(() => true).catch(() => false);
const directionalCursorParity = await Promise.all([
  ["app/components/DirectionalCursorExactComponent.tsx", "65af9231258abe1110fc898b25d437764ad7bb760d63973ae06b578fefaefb34"],
  ["app/components/directional-cursor-exact.css", "928f6a5794271326d129556444481e9356505dfc8e7326b1a6a26378c745b07d"],
  ["public/directional-cursor-reference.png", "d952f7bb407f8ec5e2c3b231e186480d93cc443dcf4307b82f9a0eb9ed189725"],
].map(async ([path, expected]) => (await sha256(path)) === expected));
const mobileHeroStat = await stat(new URL("public/background-mobile.mp4", root)).catch(() => null);
const [workCatalog, rotatingAtlas, infiniteCanvas, methodTextMotion, aboutSystem] = await Promise.all([
  read("app/work/catalog.ts"),
  read("app/components/RotatingProjectAtlas.tsx"),
  read("app/components/InfiniteEvidenceCanvas.tsx"),
  read("app/components/MethodTextMotion.tsx"),
  read("app/components/AboutSystem.tsx"),
]);

const checks = [];
const check = (name, condition) => checks.push({ name, condition: Boolean(condition) });
const count = (source, expression) => [...source.matchAll(expression)].length;
const parsedPackage = JSON.parse(pkg);

check("one semantic h1", count(page, /<h1(?:\s|>)/g) === 1);
check("complete chapter heading outline", /id="statement-title">Operating thesis<\/h2>/.test(page) && /id="method-title">Operating method<\/h2>/.test(page) && /id="capabilities-title">What I bring to the operation\.<\/h3>/.test(page));
check("five authored top-level routes", /href: "\/work"/.test(navigation) && /href: "\/method"/.test(navigation) && /href: "\/about"/.test(navigation) && /href: "\/contact"/.test(navigation) && /usePathname/.test(navigation));
check("capabilities belong to method", /method-capabilities" aria-labelledby="capabilities-title"/.test(page) && /<Capabilities \/>/.test(page) && !/id="capabilities" data-nav-section/.test(page) && !/\["capabilities", "Capabilities"\]/.test(navigation));
check("method hands directly to experiments", page.indexOf("</section>\n\n      <section className=\"experiments-section") > page.indexOf("method-capabilities") && !page.slice(page.indexOf("method-capabilities"), page.indexOf("experiments-section")).includes("data-nav-section"));
check("three flagship project articles", count(page, /<article className="project/g) === 3);
check("three shareable flagship case studies", /generateStaticParams/.test(caseStudyPage) && /jarvis:\s*\{\s*slug: "jarvis"/.test(projectData) && /helix:\s*\{\s*slug: "helix"/.test(projectData) && /qadam:\s*\{\s*slug: "qadam"/.test(projectData) && /\/work\/\$\{next\.slug\}/.test(caseStudyPage));
check("selected work routes into case studies", /href="\/work\/jarvis"/.test(page) && /href="\/work\/helix"/.test(page) && /href="\/work\/qadam"/.test(page) && count(page, /data-label="CASE ↗"/g) === 3);
check("case studies preserve honest evidence boundaries", /The portfolio console is an authored working-interface visualization/.test(projectData) && /local interaction prototype, not a public production system/.test(projectData) && /Published latency excludes HTTP, queue, PostgreSQL, and network time/.test(projectData));
check("case studies use proof-specific interactions", /JarvisArchitectureInspector/.test(caseStudyPage) && /HelixRecovery/.test(caseStudyPage) && /QadamEvidenceInspector/.test(caseStudyPage) && /project\.slug === "helix"/.test(caseStudyPage) && /project\.slug === "qadam"/.test(caseStudyPage));
check("case studies have complete narrative architecture", /Challenge, decision, and result/.test(caseStudyPage) && /Operating thesis/.test(caseStudyPage) && /System route/.test(caseStudyPage) && /Evidence ledger/.test(caseStudyPage) && /Reflection/.test(caseStudyPage) && /generateMetadata/.test(caseStudyPage));
check("case studies are independently responsive", /\.case-study-page \{/.test(css) && /\.case-hero \{[^}]*min-height: 100svh/.test(css) && /\.case-receipt-grid \{[^}]*grid-template-columns: repeat\(4,1fr\)/.test(css) && /\.case-receipt-grid \{ grid-template-columns: 1fr 1fr;/.test(css));
check("independent work is positioned honestly", /Independent systems, presented without client theatre/.test(page) && /INDEPENDENT R&amp;D \/ 2024—2026/.test(page) && /explicit interaction proof/.test(page));
check("real project destinations", count(page, /https:\/\/github\.com\/animcin84-dev/g) >= 6);
check("flagship proof rows", count(page, /<span>Constraint<\/span>/g) === 3 && count(page, /<span>Built proof<\/span>/g) === 2 && count(page, /<span>Interaction proof<\/span>/g) === 1);
check("QADAM reproducible outcome scene", /qadam-evaluation/.test(page) && /0\.9231/.test(page) && /≥0\.90/.test(page) && /120/.test(page));
check("QADAM real release artifact", qadamDemoPresent && /qadam-fallback-demo\.mp4/.test(qadamDemoVideo) && /REAL PRODUCT FOOTAGE/.test(page) && /Inspect release artifact/.test(page) && !/autoPlay|loop/.test(qadamDemoVideo));
check("private conversation close", /<ContactForm \/>/.test(page) && /fetch\("\/api\/contact"/.test(contactForm) && /No public post\. No account required\./.test(contactForm));
check("private inbox validation", /appendFile/.test(contactRoute) && /\.contact-inbox/.test(contactRoute) && /emailPattern/.test(contactRoute) && /fieldErrors\.brief/.test(contactRoute) && /RATE_LIMIT_MS/.test(contactRoute) && /MAX_BODY_BYTES/.test(contactRoute));
check("durable contact delivery adapter", /CONTACT_DELIVERY_MODE/.test(contactRoute) && /CONTACT_WEBHOOK_URL/.test(contactRoute) && /CONTACT_WEBHOOK_BEARER_TOKEN/.test(contactRoute) && /AbortController/.test(contactRoute) && /Retry-After/.test(contactRoute) && /randomUUID/.test(contactRoute));
check("contact recovery preserves context", /fieldErrors/.test(contactForm) && /aria-describedby/.test(contactForm) && /briefLength/.test(contactForm) && /AbortController/.test(contactForm) && /Your text is still here|Your brief is still here/.test(contactForm) && /aria-busy/.test(contactForm));
check("contact inline error semantics", /contact-field-error/.test(contactForm) && /aria-invalid/.test(contactForm) && /role=\{state === "error" \? "alert" : "status"\}/.test(contactForm) && /contact-field-error/.test(css));
check("authored operator profile", /<AboutSystem \/>/.test(page) && /THINK/.test(aboutSystem) && /BUILD/.test(aboutSystem) && /PROVE/.test(aboutSystem) && /about-command/.test(aboutSystem) && /about-human-note/.test(page));
check("peak-end contact finale", /contact-section[^>]*data-theme="light"/.test(page) && /BRING THE/.test(page) && /Build something worth proving/.test(page) && /contact-epilogue/.test(page) && /<ContactForm \/>/.test(page));
check("full-bleed liquid-metal hero", /<HeroVideo/.test(page) && /hero-media/.test(page) && /\/daniyal-wordmark\.webp/.test(page));
check("hero proposition has an evidence route", /hero-proof-plate/.test(page) && /Core system loop: memory, action, evidence/.test(page) && /<span>Memory<\/span>/.test(page) && /<span>Evidence<\/span>/.test(page));
check("hero exposes semantic logo identity and role", /<h1 className="hero-wordmark-heading">/.test(page) && /className="hero-wordmark"[\s\S]*alt="Daniyal Bauyrzhan"/.test(page) && /className="hero-role">Independent AI systems builder/.test(page) && /\.hero-wordmark-heading \{/.test(css) && !/className="hero-name"/.test(page));
check("hero proof plate has a non-WebGL static surface", /\.hero-proof-plate \{[^}]*background: linear-gradient/.test(css) && !/\.hero-proof-plate \{[^}]*backdrop-filter/.test(css) && !/MetalFx|metal-fx/.test(page + css));
check("hero uses purposeful navigation, not a decorative scroll cue", /href="#project-universe"/.test(page) && /Enter project atlas/.test(page) && /href: "\/work"/.test(navigation) && !/Scroll to enter/i.test(page));
check("selected work exposes a direct visual proof route", /className="work-proof-route"/.test(page) && /aria-label="Selected project shortcuts"/.test(page) && /work-route-visual work-route-jarvis/.test(page) && /work-route-visual work-route-helix/.test(page) && /work-route-visual work-route-qadam/.test(page) && /03 \/ 03/.test(page) && /04 \/ 04/.test(page) && /0\.9231/.test(page) && /Public source/.test(page) && /Interaction proof/.test(page) && /Public evaluation/.test(page));
check("authored evidence-transition artwork", materialSignalPresent && /\/material-signal\.webp/.test(css) && /material-signal\.webp/.test(nextConfig) && /surface opens/i.test(page));
check("responsive authored image selection", /sizes="\(max-width: 640px\) 92vw, \(max-width: 1316px\) 76vw, 1000px"/.test(page) && /sizes="\(max-width: 640px\) 58px, 92px"/.test(aboutSystem) && /sizes="44px"/.test(navigation) && /sizes="38px"/.test(await read("app/components/Preloader.tsx")));
check("local media fallback", /"\/hero-bg\.mp4"/.test(await read("app/lib/media.ts")));
check("art-directed mobile hero source", Boolean(mobileHeroStat && mobileHeroStat.size < 700000) && /HERO_VIDEO_MOBILE_URL/.test(heroVideo) && /max-width: 640px/.test(heroVideo) && /heroMediaVariant/.test(heroVideo) && /background-mobile\.mp4/.test(nextConfig));
check("external links declare noreferrer", !/<a(?=[^>]*target="_blank")(?![^>]*rel="noreferrer")/g.test(page));
check("no placeholder copy", !/(lorem ipsum|coming soon|placeholder|your name)/i.test(page));
check("descriptive metadata", /Daniyal Bauyrzhan \| AI Systems Builder/.test(layout) && /AI systems/.test(layout));
check("authored launch metadata", /summary_large_image/.test(layout) && /application\/ld\+json/.test(layout) && /NEXT_PUBLIC_SITE_URL/.test(layout) && /themeColor: "#08090b"/.test(layout));
check("installable identity manifest", /Daniyal Bauyrzhan — AI Systems Builder/.test(manifest) && /icon-192\.png/.test(manifest) && /icon-512\.png/.test(manifest));
check("authored launch assets generated", launchAssetsPresent && /hero-poster\.webp/.test(launchAssetScript) && /daniyal-wordmark\.png/.test(launchAssetScript) && /d-mark\.png/.test(launchAssetScript));
check("handoff documentation matches route-first evidence atlas", /14-project rotating repository atlas/.test(readme) && /native portfolio systems/.test(readme) && /removed universe no longer mounts Three\.js/.test(readme) && /local `\/work\/\.\.\.` portrait/.test(readme));
check("launch cache and security headers", /hero-bg\.mp4/.test(nextConfig) && /material-signal\.webp/.test(nextConfig) && /icon-512\.png/.test(nextConfig) && /X-Frame-Options/.test(nextConfig) && /Permissions-Policy/.test(nextConfig));

check("archived universe stays out of the homepage runtime", !/ScrollEvidenceTunnel/.test(page) && !/ScrollEvidenceTunnel/.test(layout) && /RotatingProjectAtlas/.test(page));
check("no MetalFx dependency", !parsedPackage.dependencies?.["metal-fx"]);
check("homepage signature uses native DOM scroll", /data-atlas-card/.test(rotatingAtlas) && /IntersectionObserver/.test(rotatingAtlas) && /ScrollTrigger/.test(rotatingAtlas) && !/Canvas|useFrame|iframe/.test(rotatingAtlas));
check("bounded SilkWaves scene", /<SilkWaves/.test(caseStudyPage) && /project\.slug === "jarvis"/.test(caseStudyPage) && /ResizeObserver/.test(silkWaves) && /deleteProgram/.test(silkWaves) && /prefers-reduced-motion/.test(silkWaves));
check("truthful 2D project visuals", /jarvis-console/.test(page) && /helix-grid/.test(helixRecovery) && /document-stack/.test(projectInspection));
check("inspectable flagship proof scenes", /<JarvisArchitectureInspector \/>/.test(page) && /<QadamEvidenceInspector \/>/.test(page) && count(projectInspection, /role="tablist"/g) === 2 && /aria-selected/.test(projectInspection) && /ArrowRight/.test(projectInspection) && /SOURCE-BACKED/.test(page) && !/<em>LIVE<\/em>/.test(page));
check("public claims expose exact source receipts", count(page, /className="source-receipts/g) === 2 && /JARVIS source receipts/.test(page) && /QADAM source receipts/.test(page) && /lib\/memory\/context-engine\.ts/.test(page) && /lib\/execution\/permissions\.ts/.test(page) && /docs\/evaluation-results\.json/.test(page) && /tree\/main\/evaluation/.test(page));
check("observable operation trace replaces duplicate project content", /<OperationTrace \/>/.test(page) && /SIMULATED OPERATING MODEL/.test(operationTrace) && /NOT LIVE PRODUCTION TELEMETRY/.test(operationTrace) && /role="tablist"/.test(operationTrace) && /ArrowRight/.test(operationTrace));
check("operation trace has six legible owned states", count(operationTrace, /index: "0[1-6]"/g) === 6 && /FRAME/.test(operationTrace) && /VERIFY/.test(operationTrace) && /RETURN/.test(operationTrace) && /aria-live="polite"/.test(operationTrace));
check("rotating project atlas is cinematic and reversible", /workCatalog\.map/.test(rotatingAtlas) && /rotationX/.test(rotatingAtlas) && /scrub: 0\.72/.test(rotatingAtlas) && /href=\{`\/work\/\$\{item\.slug\}`\}/.test(rotatingAtlas));
check("signature interaction families remain coherent", /RotatingProjectAtlas/.test(page) && /InfiniteEvidenceCanvas/.test(page) && /MethodTextMotion/.test(page) && /OperationTrace/.test(page) && /MEMORY/.test(infiniteCanvas) && /PROVE THE RESULT/.test(methodTextMotion));
check("all public projects preserve local pages", /generateStaticParams/.test(caseStudyPage) && /workCatalog\.map/.test(caseStudyPage) && count(workCatalog, /slug: "/g) === 14 && /RepositoryCase/.test(caseStudyPage));
check("safe interactive demos advance from scroll", /useScrollAutoSequence/.test(autoSequence) && /prefers-reduced-motion/.test(autoSequence) && /pauseForManualInput/.test(autoSequence) && /data-scroll-demo="capabilities"/.test(capabilities) && /data-scroll-demo="operation-trace"/.test(operationTrace) && /data-scroll-demo="helix-recovery"/.test(helixRecovery) && /data-scroll-demo="qadam-evidence"/.test(projectInspection) && /IntersectionObserver/.test(qadamDemoVideo));
check("honest HELIX recovery proof", /SIMULATED RECOVERY PATH/.test(helixRecovery) && /aria-live="polite"/.test(helixRecovery) && /window\.clearTimeout/.test(helixRecovery) && /Interaction proof/.test(page));
check("HELIX recovery anatomy stays honest and scroll-owned", count(page, /data-helix-beat/g) === 4 && /CASE NOTE \/ LOCAL PROTOTYPE/.test(page) && /not a public production claim/.test(page) && /data-helix-meter/.test(page) && /trigger: "\.helix-anatomy"/.test(motion) && /\[data-helix-beat\], \[data-helix-meter\]/.test(css));
check("HELIX project route continues into its proof model", /href="#helix-recovery-model" data-cursor="action" data-label="READ ↓">Read the recovery model/.test(page) && /className="helix-anatomy" id="helix-recovery-model"/.test(page) && /\.helix-anatomy \{ position: relative; scroll-margin-top: var\(--header-h\)/.test(css));
check("HELIX mobile proof is a compact static ledger", /const responsiveMotion = gsap\.matchMedia\(\)/.test(motion) && /responsiveMotion\.add\("\(min-width: 641px\)"/.test(motion) && /responsiveMotion\.revert\(\)/.test(motion) && /\.helix-anatomy-meter i \{ transform: none !important; \}/.test(css) && /\.helix-anatomy-beat \{ min-height: auto; padding: 28px 0 30px;/.test(css) && /\.helix-anatomy-beat h4 \{[^}]*font-size: 7\.2vw/.test(css) && /\.helix-anatomy-beat dl \{ grid-template-columns: repeat\(3,minmax\(0,1fr\)\); margin-top: 20px;/.test(css));
check("HELIX recovery explicitly supports Enter and Space", /runRecoveryFromKeyboard/.test(helixRecovery) && /event\.key !== "Enter"/.test(helixRecovery) && /event\.key !== " "/.test(helixRecovery) && /onKeyDown=\{runRecoveryFromKeyboard\}/.test(helixRecovery));
check("HELIX atomic recovery feedback", /role="status" aria-live="polite" aria-atomic="true"/.test(helixRecovery) && /aria-busy=\{state === "recovering"\}/.test(helixRecovery) && /aria-controls="helix-operation-status"/.test(helixRecovery) && !/helix-ledger" aria-live/.test(helixRecovery));
check("HELIX title stays inside the display scale", /\.project-helix \.project-title-row h2 \{[^}]*font-size: clamp\(6\.8rem,12vw,11rem\)/.test(css));
check("accessible automatic capability tabs", /role="tablist"/.test(capabilities) && /role="tab"/.test(capabilities) && /aria-selected/.test(capabilities) && /aria-live="polite"/.test(capabilities) && /ArrowDown/.test(capabilities) && /Home/.test(capabilities));
check("project-led sticky chapters", /project-sticky/.test(page) && /position: sticky/.test(css));
check("authored light dark and signal-blue rhythm", /paper-section/.test(page) && /dark-section/.test(page) && /project-helix/.test(page));
check("JARVIS hands off to owned recovery", /className="recovery-handoff dark-section"/.test(page) && /What stays visible when the next step fails\?/.test(page) && /THE HARD PART STARTS AFTER THE HAPPY PATH/.test(page) && page.indexOf("recovery-handoff dark-section") > page.indexOf("project project-jarvis") && page.indexOf("recovery-handoff dark-section") < page.indexOf("project project-helix"));
check("legacy recovery handoff is safely dormant", /const recoveryHandoff = document\.querySelector/.test(motion) && /trigger: recoveryHandoff/.test(motion) && /if \(recoveryHandoff\)/.test(motion) && /\.recovery-handoff \{ height: auto; min-height: 100svh; \}/.test(css));
check("recovery-to-evidence pressure release", /proofHandoffStatement/.test(page) && /proof-handoff paper-section/.test(page) && /RECOVERY IS NOT THE FINISH LINE/.test(page) && /\.proof-handoff \{ position: relative; height: 160svh/.test(css));
check("legacy proof handoff is safely dormant", /const proofHandoff = document\.querySelector/.test(motion) && /trigger: proofHandoff/.test(motion) && /if \(proofHandoff\)/.test(motion) && /prefers-reduced-motion: reduce/.test(css));
check("route state remains independent from homepage chapters", /usePathname/.test(navigation) && /pathname\.startsWith/.test(navigation) && !/querySelectorAll<HTMLElement>\("\[data-theme\]"\)/.test(navigation));
check("navigation survives skipped scroll scenes", /usePathname/.test(navigation) && /routes\.findIndex/.test(navigation) && /requestAnimationFrame/.test(navigation) && /cancelAnimationFrame/.test(navigation));
check("deep links realign after the preloader releases", /const alignAfterReady/.test(motion) && /addEventListener\("portfolio:ready", alignAfterReady/.test(motion) && /requestAnimationFrame\(alignHash\)/.test(motion) && /cancelAnimationFrame\(readyAlignFrame\)/.test(motion));
check("light method and contact sequence", /method-section[^>]*data-theme="light"/.test(page) && /contact-section[^>]*data-theme="light"/.test(page) && /\.method-section \{[^}]*background: var\(--paper\)/.test(css) && /\.contact-section \{[^}]*background: var\(--paper\)/.test(css));
check("signal blue reserved to contact action", /\.contact-form-action button \{[^}]*background: var\(--blue\)/.test(css) && !/\.method-section \{[^}]*background: var\(--blue/.test(css));
check("manifesto avoids editorial signal blue", /\.manifesto-line\.is-accent \{[^}]*color: var\(--ink\)/.test(css) && !/\.manifesto-line\.is-accent \{[^}]*color: var\(--blue\)/.test(css));
check("mobile HELIX status clears headline", /\.helix-cursor \{ left: auto; right: 7px; top: 8px; width: auto; height: 24px;/.test(css) && /\.helix-recovery\.is-verified \.helix-cursor \{ transform: none; \}/.test(css) && /\.project-helix \.visual-caption \{[^}]*min-height: 78px;[^}]*background: var\(--paper\)/.test(css) && /\.helix-recovery \{ inset: 0 0 78px;/.test(css));

check("one Lenis owner", count(motion, /new Lenis/g) === 1);
check("GSAP and ScrollTrigger synchronized", /gsap\.ticker\.add/.test(motion) && /ScrollTrigger\.update/.test(motion));
check("motion cleanup", /lenis\.destroy/.test(motion) && /ctx\.revert/.test(motion));
check("interaction listener cleanup", /cleanups\.forEach/.test(motion) && /removeEventListener\("pointermove"/.test(motion));
check("motion suspends in hidden tabs", /visibilitychange/.test(motion) && /lenis\.stop/.test(motion) && /detachTicker/.test(motion));
check("accessible word splitting", /aria-hidden="true"/.test(motionWords) && count(page + capabilities, /aria-label=/g) >= 8);
check("React-owned word markup", /MotionWords/.test(page) && /collectMotionWords/.test(motion) && !/createElement|textContent = ""/.test(motion));
check("accessible scrubbed method statement", /<MethodTextMotion \/>/.test(page) && /aria-label="Operating method: hold context, make the move, prove the result"/.test(methodTextMotion) && count(methodTextMotion, /className="text-motion-scene"/g) === 1 && /scenes\.map/.test(methodTextMotion));
check("scroll-owned finale motion", /contact-signal-track/.test(motion) && /about-orbit-ring/.test(motion) && /contact-epilogue-wordmark/.test(motion) && /trigger: "\.contact-section"/.test(motion));
check("contextual pointer intent", /<DirectionalCursorExact/.test(layout) && count(page + capabilities + operationTrace + navigation + notFound, /data-cursor=/g) >= 10);
check("exact directional cursor asset", directionalCursorAssetPresent && /directional-cursor-reference\.png/.test(layout) && /cursorImage: props\.cursorImage/.test(exactCursorComponent));
check("directional cursor visual assets retain exact archive bytes", directionalCursorParity.every(Boolean));
check("exact cursor is mounted once at the root", count(layout, /<DirectionalCursorExact/g) === 1 && !/<DirectionalCursorExact/.test(page + notFound) && /\{children\}[\s\S]*<DirectionalCursorExact/.test(layout));
check("exact directional cursor physics", /expBlend\(15, dt\)/.test(exactCursor) && /Math\.pow\(0\.70, dt \* 60\)/.test(exactCursor) && /2\.5 \+ 39 \* easeOutCubic/.test(exactCursor) && /s\.speed < 80 \? 230 : 150/.test(exactCursor) && /s\.speed < 80 \? 29 : 24/.test(exactCursor) && /Math\.abs\(d\) > 174/.test(exactCursor));
check("exact cursor state API", /s\.state === "text"/.test(exactCursor) && /s\.state === "action"\s*\|\|\s*s\.state === "drag"/.test(exactCursor) && /data-cursor="action"/.test(page + capabilities + operationTrace + navigation + projectInspection + contactForm) && /data-cursor="text"/.test(contactForm) && /data-label=/.test(page + capabilities + operationTrace + navigation + projectInspection + contactForm));
check("directional cursor sleeps when settled", /function wake\(\)/.test(exactCursor) && /const settled =/.test(exactCursor) && /visibilitychange/.test(exactCursor) && /if \(settled\)/.test(exactCursor));
check("exact cursor visual layer", /html\.exact-cursor-on,\s*html\.exact-cursor-on \*/.test(exactCursorCss) && /exact-directional-cursor/.test(exactCursorCss) && /exact-cursor-state-label/.test(exactCursorCss) && /exact-cursor-ibeam/.test(exactCursorCss) && /exact-cursor-ripple/.test(exactCursorCss) && /width: 32px;\s*height: 32px/.test(exactCursorCss));
check("exact cursor cleanup", /removeEventListener\(\s*"pointermove"/.test(exactCursor) && /root\.remove\(\)/.test(exactCursor) && /stateLabel\.remove\(\)/.test(exactCursor) && /ibeam\.remove\(\)/.test(exactCursor));
check("hero pointer depth is bounded and resettable", /pointer: fine/.test(heroPointer) && /prefers-reduced-motion/.test(heroPointer) && /visibilitychange/.test(heroPointer) && /--identity-x/.test(heroPointer) && /--plate-x/.test(heroPointer) && /hero-identity-depth/.test(page) && /transform: translate3d\(var\(--identity-x/.test(css) && /transform: translate3d\(var\(--plate-x/.test(css));
check("cursor listener cleanup", count(exactCursor, /removeEventListener/g) >= 5 && /document\.documentElement\.classList\.remove\(\s*"exact-cursor-on"/.test(exactCursor) && /root\.remove\(\)/.test(exactCursor));
check("authored 404 recovery route", /className="not-found-page"/.test(notFound) && /NO TARGET RETURNED/.test(notFound) && /Return to index/.test(notFound) && /Inspect selected work/.test(notFound) && /robots: \{ index: false, follow: true \}/.test(notFound));
check("404 shares the portfolio art direction", /\.not-found-page \{/.test(css) && /material-signal\.webp/.test(css) && /\.not-found-ledger/.test(css) && /@media \(max-width: 760px\)/.test(css));
check("IntersectionObserver reveal system", /new IntersectionObserver/.test(revealWatcher) && /observer\.unobserve/.test(revealWatcher));
check("active route navigation", /usePathname/.test(navigation) && /aria-current/.test(navigation) && /activeIndex/.test(navigation));
check("global navigation exposes grouped current state", /pathname\.startsWith\(route\.href\)/.test(navigation) && /pathname === "\/contact"/.test(navigation) && /\.header-links a\[aria-current="page"\]/.test(css));
check("mobile page current state is semantic and visible", /Current page: \$\{active\.label\}/.test(navigation) && /aria-current=\{route\.href === pathname \? "page"/.test(navigation) && /mobile-nav/.test(navigation));
check("mobile chrome yields to downward reading", /dataset\.mobileChrome/.test(navigation) && /scrollY > lastY \+ 4/.test(navigation) && /requestAnimationFrame/.test(navigation) && /removeEventListener\("scroll", onScroll\)/.test(navigation) && /data-mobile-chrome="hidden"/.test(css));
check("desktop page wayfinding", /--rail-progress/.test(navigation) && /section-rail-current/.test(navigation) && /route-rail/.test(navigation) && /\.section-rail \{ --rail-progress: 0; position: fixed/.test(css));
check("chapter rail links stay inside disclosure", /\.section-rail-links a \{[^}]*grid-template-columns: 0 0 8px;[^}]*width: 100%;[^}]*min-width: 0;/.test(css) && /\.section-rail-links:hover a, \.section-rail-links:focus-within a \{[^}]*grid-template-columns: 24px minmax\(0,1fr\) 8px;/.test(css) && !/\.section-rail-links a \{[^}]*width: 148px;/.test(css));
check("chapter rail responsive collapse", /@media \(max-width: 960px\)/.test(css) && /\.section-rail \{ display: none; \}/.test(css) && /\.mobile-nav \{ position: fixed;[^}]*top: 23px; bottom: auto;/.test(css));
check("chapter navigation clears focal plates", /html\[data-section="hero"\] \.section-rail,[^}]*html\[data-section="contact"\] \.section-rail \{ opacity: 0; visibility: hidden;/.test(css) && !/html:not\(\[data-section="hero"\]\) \.site-header \{ opacity: 0/.test(css));
check("hero video lifecycle", /visibilitychange/.test(heroVideo) && /video\.pause/.test(heroVideo) && /prefers-reduced-motion/.test(heroVideo));
check("slow-network hero falls back to the complete poster", /effectiveType/.test(heroVideo) && /connection\.effectiveType !== "4g"/.test(heroVideo) && /slowConnection/.test(heroVideo));
check("progressive hero video policy", /src=\{enabled \? src : undefined\}/.test(heroVideo) && /preload=\{enabled \? "metadata" : "none"\}/.test(heroVideo) && /window\.setTimeout\(enable, 260\)/.test(heroVideo) && /onPlaying/.test(heroVideo) && /data-media-state=\{enabled \? "video" : "poster"\}/.test(heroVideo));
check("reduced-data media guard", /connection\?\.saveData/.test(heroVideo) && /dataset\.heroMedia = allowed \? "video" : "poster"/.test(heroVideo));
check("disabled media source release", /removeAttribute\("src"\)/.test(heroVideo) && /videoRef\.current\.load\(\)/.test(heroVideo) && /delete document\.documentElement\.dataset\.videoReady/.test(heroVideo));
check("preloader does not block on poster", /video\.dataset\.mediaState === "poster"/.test(await read("app/components/Preloader.tsx")) && /!video\.getAttribute\("src"\)/.test(await read("app/components/Preloader.tsx")));
check("one authored video scene", /id = "hero-video"/.test(heroVideo) && count(page, /<HeroVideo/g) === 1 && !/contact-material/.test(page));
check("preloader hard timeout", /MAX_WAIT_MS/.test(await read("app/components/Preloader.tsx")));
check("cinematic preloader has bounded visible beat", /const MIN_VISIBLE_MS = 1500/.test(await read("app/components/Preloader.tsx")) && /const REPEAT_WAIT_MS = 1800/.test(await read("app/components/Preloader.tsx")) && /Promise\.all\(\[ready, minimumVisible\]\)/.test(await read("app/components/Preloader.tsx")) && /const REDUCED_WAIT_MS = 180/.test(await read("app/components/Preloader.tsx")) && /opacity \.32s/.test(css));
check("preloader clears scheduled timers", /timers\.forEach/.test(await read("app/components/Preloader.tsx")));
check("atomic preloader announcement", /role="status" aria-live="polite" aria-atomic="true"/.test(await read("app/components/Preloader.tsx")) && /Portfolio ready/.test(await read("app/components/Preloader.tsx")) && !/preloader-progress" aria-live/.test(await read("app/components/Preloader.tsx")));
check("preloader content busy state", /<main className="portfolio-page" id="top" aria-busy="true">/.test(page) && /setAttribute\("aria-busy", "true"\)/.test(await read("app/components/Preloader.tsx")) && /setAttribute\("aria-busy", "false"\)/.test(await read("app/components/Preloader.tsx")));
check("decorative loader output hidden", /preloader-brand" aria-hidden="true"/.test(await read("app/components/Preloader.tsx")) && /preloader-center" aria-hidden="true"/.test(await read("app/components/Preloader.tsx")) && /preloader-bottom" aria-hidden="true"/.test(await read("app/components/Preloader.tsx")));

check("visible focus treatment", /:focus-visible/.test(css));
check("keyboard skip routes across every page type", /className="skip-link" href="#project-universe"/.test(page) && /className="skip-link" href="#case-title"/.test(caseStudyPage) && /className="skip-link" href="#not-found-title"/.test(notFound) && /id="project-universe"/.test(scrollWorld) && /id="case-title" tabIndex=\{-1\}/.test(caseStudyPage) && /id="not-found-title" tabIndex=\{-1\}/.test(notFound) && /\.skip-link:focus-visible/.test(css));
check("desktop primary navigation meets touch target floor", /\.header-links a \{[^}]*min-height: 44px;[^}]*padding-inline: 8px;/.test(css));
check("hero resource hints stay home-route scoped", /preload\(HERO_POSTER_URL/.test(heroVideo) && /preconnect\(origin/.test(heroVideo) && !/HERO_POSTER_URL|HERO_VIDEO_MOBILE_URL|HERO_VIDEO_URL|rel="preload"|rel="preconnect"/.test(layout));
check("project evidence tabs activate from arrow keys", /activate\(next\)/.test(projectInspection) && count(projectInspection, /onKeyDown=\{\(event\) => focusTab/g) === 2 && /role="tabpanel"/.test(projectInspection));
check("reduced-motion CSS", /@media \(prefers-reduced-motion: reduce\)/.test(css));
check("forced-colors fallback", /@media \(forced-colors: active\)/.test(css));
check("mobile navigation", /@media \(max-width: 640px\)/.test(css) && /mobile-nav/.test(css));
check("mobile finale navigation stays in safe header area", /\.mobile-nav \{ position: fixed;[^}]*top: 23px; bottom: auto;/.test(css) && /\.mobile-nav \{ right: calc\(var\(--gutter\) \+ 138px\); \}/.test(css) && /\.site-header \{ top: 12px; min-height: 58px;[^}]*\}/.test(css));
check("touch target floor", /min-height: 44px/.test(css));
check("hero and finale touch actions", /\.hero-bottom a b \{[^}]*width: 44px; height: 44px;/.test(css) && /\.contact-form-action button \{[^}]*min-height: 88px;/.test(css) && /\.contact-epilogue footer a \{[^}]*min-height: 44px;/.test(css));
check("mobile header touch actions", /\.site-brand \{ min-width: 44px; justify-content: center; \}/.test(css) && /\.header-action \{ min-height: 44px; padding-inline: 16px; \}/.test(css));
check("mobile menu and contact field target floor", /\.mobile-nav \{[^}]*width: 46px;/.test(css) && /\.mobile-nav summary \{[^}]*min-width: 44px; min-height: 44px;/.test(css) && /\.contact-form-fields input, \.contact-form-fields textarea \{[^}]*min-height: 44px;/.test(css));
check("landscape action clearance", /@media \(max-width: 960px\) and \(max-height: 520px\)/.test(css) && /\.hero-bottom \{ right: 100px; \}/.test(css));
check("fluid display typography", count(css, /font-size: clamp\(/g) >= 15);
check("limited accessible design palette tokens", /--carbon: #08090b/.test(css) && /--paper: #f0f0ea/.test(css) && /--blue: #405ae4/.test(css));
check("one continuous hero media element per scene", !/requestAnimationFrame|setAnimationLoop/.test(page));
check("capability copy contains no 3D stack", !/WEBGL|THREE\.JS/i.test(capabilities));

const failed = checks.filter(({ condition }) => !condition);
for (const { name, condition } of checks) console.log(`${condition ? "PASS" : "FAIL"} ${name}`);
if (failed.length) {
  console.error(`portfolio source verification failed: ${failed.length} check(s)`);
  process.exitCode = 1;
} else {
  console.log(`portfolio source verification passed (${checks.length} checks)`);
}
