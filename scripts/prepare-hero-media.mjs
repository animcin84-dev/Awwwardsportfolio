import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const input = process.argv[2];
const widthArg = process.argv.find((arg) => arg.startsWith("--width="));
const width = Number(widthArg?.split("=")[1] || 1920);

if (!input) {
  console.error("Usage: npm run prepare:hero -- <input-video> [--width=1920]");
  process.exit(1);
}
if (!Number.isFinite(width) || width < 640 || width > 3840) {
  console.error("--width must be between 640 and 3840");
  process.exit(1);
}

const root = process.cwd();
const publicDir = resolve(root, "public");
const output = resolve(publicDir, "hero-bg.mp4");
const mobileOutput = resolve(publicDir, "background-mobile.mp4");
const poster = resolve(publicDir, "hero-poster.webp");
mkdirSync(publicDir, { recursive: true });

function run(args) {
  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.error?.code === "ENOENT") {
    console.error("ffmpeg was not found. Install ffmpeg and run this command again.");
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}

const scale = `scale='min(${width},iw)':-2`;

console.log(`Preparing hero video at max width ${width}px…`);
run([
  "-y", "-i", resolve(input), "-map_metadata", "-1", "-an",
  "-vf", scale,
  "-c:v", "libx264", "-preset", "slow", "-crf", "18",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  output,
]);

console.log("Preparing art-directed mobile hero…");
run([
  "-y", "-i", resolve(input), "-map_metadata", "-1", "-an",
  "-vf", "crop=trunc(ih*9/16/2)*2:ih:(iw-ow)/2:(ih-oh)/2,scale=404:720",
  "-c:v", "libx264", "-preset", "slow", "-crf", "25",
  "-profile:v", "high", "-level", "3.1",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  mobileOutput,
]);

console.log("Creating LCP poster…");
run([
  "-y", "-ss", "0.12", "-i", resolve(input), "-frames:v", "1",
  "-vf", scale, "-c:v", "libwebp", "-quality", "84", poster,
]);

console.log("Done:");
console.log(`  ${output}`);
console.log(`  ${mobileOutput}`);
console.log(`  ${poster}`);
