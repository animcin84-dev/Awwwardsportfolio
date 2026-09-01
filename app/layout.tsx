import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  || "http://localhost:3000";
const metadataBase = (() => {
  try { return new URL(configuredSiteUrl); } catch { return new URL("http://localhost:3000"); }
})();

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ANTARES FTC",
  description: "Competition robotics team from Almaty, Kazakhstan.",
  sameAs: ["https://www.instagram.com/antares_ftc/"],
  address: { "@type": "PostalAddress", addressLocality: "Almaty", addressCountry: "KZ" },
};

export const metadata: Metadata = {
  metadataBase,
  alternates: { canonical: "/" },
  title: "ANTARES — FTC Robotics · Almaty",
  description: "ANTARES is a competition robotics team from Almaty, Kazakhstan — engineering robots, competing internationally and documenting every iteration.",
  applicationName: "ANTARES FTC",
  category: "robotics",
  keywords: ["ANTARES", "FTC", "FIRST Tech Challenge", "robotics", "Almaty", "Kazakhstan", "engineering"],
  creator: "ANTARES FTC",
  publisher: "ANTARES FTC",
  robots: { index: true, follow: true },
  openGraph: {
    title: "ANTARES — Engineering a Red Supergiant",
    description: "Robotics, engineering, missions and awards from Almaty, Kazakhstan.",
    type: "website",
    siteName: "ANTARES FTC",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANTARES — FTC Robotics",
    description: "Engineering a Red Supergiant — competition robotics from Almaty.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
      </head>
      <body className={GeistSans.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
