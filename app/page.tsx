import type { Metadata } from "next";
import { AntaresExperienceV2 } from "./components/AntaresExperienceV2";

export const metadata: Metadata = {
  title: "ANTARES — FTC Robotics · Almaty",
  description: "ANTARES is a competition robotics team from Almaty, Kazakhstan. Explore the team’s engineering, international missions, awards and evolving robot systems.",
  openGraph: {
    title: "ANTARES — Engineering a Red Supergiant",
    description: "Competition robotics from Almaty: engineering, missions, awards and the people behind the machine.",
    type: "website",
  },
};

export default function Home() {
  return <AntaresExperienceV2 />;
}
