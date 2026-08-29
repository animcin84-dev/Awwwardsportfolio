"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect, preload } from "react-dom";
import { externalOrigin, HERO_POSTER_URL, HERO_VIDEO_FALLBACK, HERO_VIDEO_MOBILE_URL, HERO_VIDEO_URL } from "../lib/media";

type NavigatorWithConnection = Navigator & {
  connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
};

export function HeroVideo({ id = "hero-video" }: { id?: string }) {
  const resourceOrigins = Array.from(new Set([
    externalOrigin(HERO_VIDEO_URL),
    externalOrigin(HERO_VIDEO_MOBILE_URL),
    externalOrigin(HERO_POSTER_URL),
  ].filter(Boolean))) as string[];
  resourceOrigins.forEach((origin) => preconnect(origin, { crossOrigin: "anonymous" }));
  preload(HERO_POSTER_URL, { as: "image", fetchPriority: "high" });

  const videoRef = useRef<HTMLVideoElement>(null);
  const idleRef = useRef<number | null>(null);
  const inViewRef = useRef(true);
  const [src, setSrc] = useState(HERO_VIDEO_URL);
  const [failedOver, setFailedOver] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const forcedReduced = new URLSearchParams(window.location.search).get("motion") === "reduce";
    const connection = (navigator as NavigatorWithConnection).connection;
    const mediaAllowed = () => {
      const slowConnection = Boolean(connection?.effectiveType && connection.effectiveType !== "4g");
      return !forcedReduced && !query.matches && !connection?.saveData && !slowConnection;
    };
    const syncSourcePolicy = () => {
      const allowed = mediaAllowed();
      const preferredSource = mobileQuery.matches ? HERO_VIDEO_MOBILE_URL : HERO_VIDEO_URL;
      if (idleRef.current !== null) {
        window.clearTimeout(idleRef.current);
        idleRef.current = null;
      }
      setEnabled(false);
      if (allowed) {
        setFailedOver(false);
        setSrc(preferredSource);
        const enable = () => { idleRef.current = null; setEnabled(true); };
        idleRef.current = window.setTimeout(enable, 260);
      }
      document.documentElement.dataset.heroMedia = allowed ? "video" : "poster";
      document.documentElement.dataset.heroMediaVariant = allowed ? (mobileQuery.matches ? "mobile" : "desktop") : "poster";
      if (!allowed && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
        delete document.documentElement.dataset.videoReady;
      }
    };
    const sync = () => {
      const video = videoRef.current;
      if (!video) return;
      if (!mediaAllowed() || document.hidden || !inViewRef.current || !video.currentSrc) video.pause();
      else video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry?.isIntersecting ?? false;
      sync();
    }, { rootMargin: "180px 0px" });
    const observed = videoRef.current?.closest(".chapter-arrival") ?? videoRef.current;
    if (observed) observer.observe(observed);
    syncSourcePolicy();
    sync();
    query.addEventListener("change", syncSourcePolicy);
    mobileQuery.addEventListener("change", syncSourcePolicy);
    connection?.addEventListener("change", syncSourcePolicy);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", syncSourcePolicy);
      mobileQuery.removeEventListener("change", syncSourcePolicy);
      connection?.removeEventListener("change", syncSourcePolicy);
      document.removeEventListener("visibilitychange", sync);
      delete document.documentElement.dataset.heroMedia;
      delete document.documentElement.dataset.heroMediaVariant;
      if (idleRef.current !== null) {
        window.clearTimeout(idleRef.current);
      }
    };
  }, []);

  return (
    <video
      id={id}
      ref={videoRef}
      className="hero-video"
      src={enabled ? src : undefined}
      poster={HERO_POSTER_URL}
      autoPlay={false}
      muted
      loop
      playsInline
      preload={enabled ? "metadata" : "none"}
      data-media-state={enabled ? "video" : "poster"}
      disablePictureInPicture
      aria-hidden="true"
      onCanPlay={() => {
        const video = videoRef.current;
        if (!video) return;
        if (
          video.dataset.mediaState !== "video"
          || document.documentElement.dataset.motion === "reduced"
          || window.matchMedia("(prefers-reduced-motion: reduce)").matches
          || document.hidden
          || !inViewRef.current
        ) {
          video.pause();
          return;
        }
        video.play().catch(() => undefined);
      }}
      onPlaying={() => {
        document.documentElement.dataset.videoReady = "true";
        delete document.documentElement.dataset.videoBuffering;
      }}
      onWaiting={() => {
        document.documentElement.dataset.videoBuffering = "true";
      }}
      onError={() => {
        if (!failedOver && src !== HERO_VIDEO_FALLBACK) {
          setFailedOver(true);
          setSrc(HERO_VIDEO_FALLBACK);
          return;
        }
        document.documentElement.dataset.videoFailed = "true";
        delete document.documentElement.dataset.videoReady;
      }}
    />
  );
}
