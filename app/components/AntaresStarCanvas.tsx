"use client";

import dynamic from "next/dynamic";

const AntaresStarScene = dynamic(
  () => import("./AntaresStarScene").then((module) => module.AntaresStarScene),
  { ssr: false, loading: () => null },
);

export function AntaresStarCanvas() {
  return <AntaresStarScene />;
}
