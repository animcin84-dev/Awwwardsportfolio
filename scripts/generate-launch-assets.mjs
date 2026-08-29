import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(projectRoot, "public");
const appDir = path.join(projectRoot, "app");
const carbon = { r: 8, g: 9, b: 11, alpha: 1 };

const wordmark = await sharp(path.join(publicDir, "daniyal-wordmark.png"))
  .resize({ width: 760, withoutEnlargement: true })
  .png()
  .toBuffer();

const mark = await sharp(path.join(publicDir, "d-mark.png"))
  .resize({ width: 72, height: 72, fit: "contain" })
  .png()
  .toBuffer();

const shade = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#08090b" stop-opacity=".18"/>
        <stop offset=".52" stop-color="#08090b" stop-opacity=".46"/>
        <stop offset="1" stop-color="#08090b" stop-opacity=".82"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <text x="48" y="54" fill="#f8f8f5" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="2">D.B / PORTFOLIO 2026</text>
    <text x="48" y="584" fill="#f8f8f5" fill-opacity=".78" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">AI SYSTEMS · PRODUCT · INTERACTION</text>
    <text x="1152" y="584" fill="#f8f8f5" fill-opacity=".78" text-anchor="end" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">ALMATY / KZ</text>
  </svg>
`);

const ogPath = path.join(appDir, "opengraph-image.jpg");
await sharp(path.join(publicDir, "hero-poster.webp"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .grayscale()
  .modulate({ brightness: 0.62 })
  .composite([
    { input: shade, left: 0, top: 0 },
    { input: mark, left: 1080, top: 40 },
    { input: wordmark, left: 220, top: 196 },
  ])
  .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
  .toFile(ogPath);

await copyFile(ogPath, path.join(appDir, "twitter-image.jpg"));

async function writeIcon(size, destination) {
  const inner = Math.round(size * 0.78);
  const iconMark = await sharp(path.join(publicDir, "d-mark.png"))
    .resize({ width: inner, height: inner, fit: "contain" })
    .png()
    .toBuffer();

  await sharp({ create: { width: size, height: size, channels: 4, background: carbon } })
    .composite([{ input: iconMark, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(destination);
}

await writeIcon(512, path.join(appDir, "icon.png"));
await writeIcon(180, path.join(appDir, "apple-icon.png"));
await writeIcon(192, path.join(publicDir, "icon-192.png"));
await writeIcon(512, path.join(publicDir, "icon-512.png"));

console.log("Generated authored launch assets: Open Graph, Twitter, favicon, Apple icon, and manifest icons.");
