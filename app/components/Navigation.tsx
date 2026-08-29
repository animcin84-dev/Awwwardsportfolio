"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type CSSProperties } from "react";

const routes = [
  { href: "/", label: "Index", short: "Home" },
  { href: "/work", label: "Project atlas", short: "Work" },
  { href: "/method", label: "Operating method", short: "Method" },
  { href: "/about", label: "Operator profile", short: "About" },
  { href: "/contact", label: "Start a system", short: "Contact" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const activeIndex = Math.max(0, routes.findIndex((route) => route.href === "/" ? pathname === "/" : pathname.startsWith(route.href)));
  const active = routes[activeIndex];

  useEffect(() => {
    const mobile = matchMedia("(max-width: 960px)");
    let lastY = scrollY;
    let frame = 0;
    const sync = () => {
      frame = 0;
      if (!mobile.matches || scrollY < 120) document.documentElement.dataset.mobileChrome = "visible";
      else document.documentElement.dataset.mobileChrome = scrollY > lastY + 4 ? "hidden" : "visible";
      lastY = scrollY;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); delete document.documentElement.dataset.mobileChrome; };
  }, []);

  return <>
    <header className="site-header site-header-v2" data-motion-nav>
      <Link className="site-brand" href="/" aria-label="Daniyal portfolio home" data-cursor="action" data-label="HOME ↖"><Image src="/d-mark.webp" width={44} height={44} sizes="44px" alt="" priority data-preload-critical /><span>Daniyal</span></Link>
      <nav className="header-links" aria-label="Primary navigation">
        {routes.slice(1, 4).map((route) => <Link key={route.href} href={route.href} aria-current={pathname.startsWith(route.href) ? "page" : undefined}><span>{route.short}</span><i>{route.label}</i></Link>)}
      </nav>
      <Link className="header-action" href="/contact" data-magnetic="0.11" data-cursor="action" data-label="TALK ↘" aria-current={pathname === "/contact" ? "page" : undefined}><span>Let&apos;s talk</span><b aria-hidden="true">↘</b></Link>
    </header>

    <nav className="section-rail route-rail" aria-label="Portfolio pages" data-motion-nav style={{ "--rail-progress": activeIndex / (routes.length - 1) } as CSSProperties}>
      <span className="section-rail-current"><small>PAGE {String(activeIndex + 1).padStart(2, "0")}</small><strong>{active.label}</strong></span>
      <div className="section-rail-links">
        {routes.map((route, index) => <Link key={route.href} href={route.href} aria-label={route.label} aria-current={index === activeIndex ? "page" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><em>{route.short}</em><i /></Link>)}
      </div>
    </nav>

    <nav className="mobile-nav" aria-label="Mobile navigation" data-motion-nav>
      <details><summary aria-label={`Open site pages. Current page: ${active.label}`}><span>{active.short}</span><b>Pages +</b></summary><div>{routes.map((route) => <Link href={route.href} key={route.href} aria-current={route.href === pathname ? "page" : undefined} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}><span>{route.short}</span><small>{route.label}</small></Link>)}</div></details>
    </nav>
  </>;
}
