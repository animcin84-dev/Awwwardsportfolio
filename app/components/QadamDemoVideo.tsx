"use client";

import { useEffect, useRef, useState } from "react";

export function QadamDemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.58) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: [0, 0.58, 1] });
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    observer.observe(video);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => { observer.disconnect(); video.removeEventListener("play", onPlay); video.removeEventListener("pause", onPause); video.pause(); };
  }, []);

  return (
    <div className="qadam-demo-video-wrap" data-scroll-demo="qadam-video">
      <span className={`qadam-demo-auto ${playing ? "is-playing" : ""}`} aria-hidden="true">{playing ? "SCROLL DEMO / PLAYING" : "SCROLL DEMO / READY"}</span>
      <video ref={videoRef} className="qadam-demo-video" controls muted playsInline preload="metadata" aria-label="QADAM deterministic contract analysis walkthrough">
        <source src="/evidence/qadam-fallback-demo.mp4" type="video/mp4" />
        Your browser does not support embedded video. The verified walkthrough is available in the public repository.
      </video>
    </div>
  );
}
