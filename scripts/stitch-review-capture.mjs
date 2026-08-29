import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [manifestPath, outputPath] = process.argv.slice(2);

if (!manifestPath || !outputPath) {
  throw new Error("Usage: node scripts/stitch-review-capture.mjs <manifest.json> <output.png>");
}

const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const maxScroll = manifest.pageHeight - manifest.viewport.height;
const segments = manifest.segments
  .filter((segment) => segment.y <= maxScroll)
  .sort((a, b) => a.y - b.y)
  .filter((segment, index, entries) => index === 0 || segment.y !== entries[index - 1].y);

if (segments.at(-1)?.y !== maxScroll) {
  throw new Error(`Capture does not include the final scroll position ${maxScroll}.`);
}

const firstMetadata = await sharp(segments[0].file).metadata();
const captureWidth = firstMetadata.width;
const captureHeight = firstMetadata.height;
if (!captureWidth || !captureHeight) {
  throw new Error("Could not read viewport capture dimensions.");
}

// The in-app browser may downsample screenshots slightly while preserving the
// CSS viewport. Map document coordinates into the encoded pixel grid.
const scaleY = captureHeight / manifest.viewport.height;
const outputHeight = Math.round(manifest.pageHeight * scaleY);
const composites = [];
for (let index = 0; index < segments.length; index += 1) {
  const segment = segments[index];
  const nextY = segments[index + 1]?.y ?? manifest.pageHeight;
  const outputTop = Math.round(segment.y * scaleY);
  const sliceHeight = Math.round(nextY * scaleY) - outputTop;
  const input = await sharp(segment.file)
    .extract({ left: 0, top: 0, width: captureWidth, height: sliceHeight })
    .png()
    .toBuffer();
  composites.push({ input, left: 0, top: outputTop });
}

await sharp({
  create: {
    width: captureWidth,
    height: outputHeight,
    channels: 3,
    background: "#08090b",
  },
})
  .composite(composites)
  .png({ compressionLevel: 8 })
  .toFile(path.resolve(outputPath));

console.log(`stitched ${segments.length} settled slices into ${outputPath}`);
