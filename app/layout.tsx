import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import DirectionalCursorExact from "./components/DirectionalCursorExactComponent";
import { RouteTransition } from "./components/RouteTransition";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  || "http://localhost:3000";
const metadataBase = (() => {
  try { return new URL(configuredSiteUrl); } catch { return new URL("http://localhost:3000"); }
})();
const publicProfileUrl = metadataBase.hostname === "localhost" ? undefined : metadataBase.href;

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniyal Bauyrzhan",
  jobTitle: "AI Systems Builder",
  description: "Independent builder of AI systems, products, and interactions.",
  sameAs: ["https://github.com/animcin84-dev"],
  address: { "@type": "PostalAddress", addressLocality: "Almaty", addressCountry: "KZ" },
  ...(publicProfileUrl ? { url: publicProfileUrl } : {}),
};

export const metadata: Metadata = {
  metadataBase,
  alternates: { canonical: "/" },
  title: "Daniyal Bauyrzhan | AI Systems Builder",
  description: "Daniyal Bauyrzhan builds AI systems that remember context, use tools, take action, and verify results.",
  applicationName: "Daniyal Portfolio",
  category: "portfolio",
  keywords: ["AI systems", "agent systems", "product engineering", "interaction design", "Almaty"],
  authors: [{ name: "Daniyal Bauyrzhan", url: "https://github.com/animcin84-dev" }],
  creator: "Daniyal Bauyrzhan",
  publisher: "Daniyal Bauyrzhan",
  formatDetection: { email: false, address: false, telephone: false },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Daniyal Bauyrzhan | AI Systems Builder",
    description: "AI systems that remember context, take action, and prove what happened.",
    type: "website",
    siteName: "Daniyal Bauyrzhan",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniyal Bauyrzhan | AI Systems Builder",
    description: "AI systems that remember context, take action, and prove what happened.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c") }} />
        <noscript><style>{`#site-preloader{display:none!important}[data-motion-nav],[data-reveal],.motion-word,[data-project-visual]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style></noscript>
      </head>
      <body className={GeistSans.className} suppressHydrationWarning>
        {children}
        <RouteTransition />
        <DirectionalCursorExact cursorImage="/directional-cursor-reference.png" />
      </body>
    </html>
  );
}
