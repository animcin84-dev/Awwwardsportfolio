"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type PreviewKind = "jarvis" | "helix" | "qadam" | "index";
type PreviewState = { dx: number; dy: number; scaleX: number; scaleY: number; kind: PreviewKind };

const DEFAULT_PREVIEW: PreviewState = { dx: 0, dy: 0, scaleX: 0.35, scaleY: 0.3, kind: "index" };

function destinationLabel(pathname: string) {
  if (pathname.startsWith("/work/jarvis")) return "JARVIS / CASE";
  if (pathname.startsWith("/work/helix")) return "HELIX / CASE";
  if (pathname.startsWith("/work/qadam")) return "QADAM / CASE";
  if (pathname === "/") return "INDEX / HOME";
  return "ROUTE / OPEN";
}

function destinationKind(pathname: string): PreviewKind {
  if (pathname.startsWith("/work/jarvis")) return "jarvis";
  if (pathname.startsWith("/work/helix")) return "helix";
  if (pathname.startsWith("/work/qadam")) return "qadam";
  return "index";
}

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const clearTimer = useRef<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");
  const [label, setLabel] = useState("ROUTE / OPEN");
  const [preview, setPreview] = useState<PreviewState>(DEFAULT_PREVIEW);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setLabel(destinationLabel(pathname));
    setPhase("exit");
    document.documentElement.dataset.routeTransition = "exit";
    const timer = window.setTimeout(() => {
      delete document.documentElement.dataset.routeTransition;
      setPhase("idle");
    }, 520);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      event.preventDefault();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        router.push(`${url.pathname}${url.search}${url.hash}`);
        return;
      }
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
      setLabel(destinationLabel(url.pathname));
      const source = anchor.closest(".work-proof-route")?.querySelector<HTMLElement>(".work-route-visual");
      if (source) {
        const rect = source.getBoundingClientRect();
        const targetWidth = Math.min(window.innerWidth * 0.62, 720);
        const targetHeight = Math.min(window.innerHeight * 0.45, 420);
        setPreview({
          dx: rect.left + rect.width / 2 - window.innerWidth / 2,
          dy: rect.top + rect.height / 2 - window.innerHeight / 2,
          scaleX: Math.max(0.14, Math.min(0.8, rect.width / targetWidth)),
          scaleY: Math.max(0.12, Math.min(0.72, rect.height / targetHeight)),
          kind: destinationKind(url.pathname),
        });
      } else {
        setPreview({ ...DEFAULT_PREVIEW, kind: destinationKind(url.pathname) });
      }
      setPhase("enter");
      document.documentElement.dataset.routeTransition = "enter";
      clearTimer.current = window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, 170);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
    };
  }, [router]);

  return (
    <div className={`route-transition is-${phase}`} aria-hidden="true">
      <div className="route-transition-grid" />
      <div
        className={`route-transition-preview is-${preview.kind}`}
        style={{
          "--route-preview-dx": `${preview.dx}px`,
          "--route-preview-dy": `${preview.dy}px`,
          "--route-preview-scale-x": preview.scaleX,
          "--route-preview-scale-y": preview.scaleY,
        } as CSSProperties}
      >
        <span>SOURCE / SIGNAL</span><strong>{preview.kind.toUpperCase()}</strong><i>Context · action · proof</i>
      </div>
      <div className="route-transition-top"><span>PORTFOLIO / SIGNAL GATE</span><span>{label}</span></div>
      <div className="route-transition-stage">
        <span className="route-transition-index">OPENING / 01</span>
        <strong>{label.split(" /")[0]}</strong>
        <i>Context · action · proof</i>
      </div>
      <div className="route-transition-bottom"><span>THE SURFACE OPENS</span><b /></div>
    </div>
  );
}
