import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ANTARES — FTC Robotics",
    short_name: "ANTARES",
    description: "Engineering, missions and competition history from ANTARES FTC in Almaty, Kazakhstan.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
