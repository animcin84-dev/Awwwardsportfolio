export const HERO_VIDEO_URL =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() || "/background.mp4";

export const HERO_VIDEO_MOBILE_URL =
  process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL?.trim()
  || (process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() ? HERO_VIDEO_URL : "/background-mobile.mp4");

export const HERO_POSTER_URL =
  process.env.NEXT_PUBLIC_HERO_POSTER_URL?.trim() || "/hero-poster.webp";

export const HERO_VIDEO_FALLBACK =
  "/hero-bg.mp4";

export function externalOrigin(value: string | undefined) {
  if (!value || value.startsWith("/")) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}
