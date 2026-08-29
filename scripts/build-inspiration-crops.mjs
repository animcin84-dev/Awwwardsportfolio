import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const capture = path.join(root, "articles", "2026-08-26-ui-inspiration-capture");
const items = ["lusion", "dogstudio", "makemepulse", "cuberto", "locomotive"];

for (const item of items) {
  const input = path.join(capture, `${item}-full.png`);
  const meta = await sharp(input).metadata();
  if (!meta.width || !meta.height) throw new Error(`Missing dimensions for ${item}`);

  const firstEnd = Math.max(1, Math.floor(meta.height * 0.34));
  const secondEnd = Math.max(firstEnd + 1, Math.floor(meta.height * 0.78));
  const regions = [
    ["hero", 0, firstEnd],
    ["middle", firstEnd, secondEnd],
    ["footer", secondEnd, meta.height],
  ];

  for (const [label, top, end] of regions) {
    await sharp(input)
      .extract({ left: 0, top, width: meta.width, height: end - top })
      .png({ compressionLevel: 9 })
      .toFile(path.join(capture, "sections", `${item}-${label}.png`));
  }

  console.log(`${item}: ${meta.width}x${meta.height}; 0-${firstEnd}, ${firstEnd}-${secondEnd}, ${secondEnd}-${meta.height}`);
}

console.log("inspiration crop build passed");
