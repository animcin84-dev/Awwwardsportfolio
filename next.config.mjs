/** @type {import('next').NextConfig} */
const longLivedAssets = [
  "/hero-poster.webp",
  "/hero-bg.mp4",
  "/background-mobile.mp4",
  "/material-signal.webp",
  "/evidence/qadam-fallback-demo.mp4",
  "/daniyal-wordmark.webp",
  "/d-mark.webp",
  "/icon-192.png",
  "/icon-512.png",
];

const nextConfig = {
  // Keep HMR manifests isolated from production builds. Running `next build`
  // while the preview is open must never invalidate the development client.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/background.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800" },
        ],
      },
      ...longLivedAssets.map((source) => ({
        source,
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, s-maxage=31536000, stale-while-revalidate=604800" },
        ],
      })),
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
