import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.argv[2] || "");
if (!target || !fs.existsSync(target)) throw new Error("Manifest path is required");

const manifest = JSON.parse(fs.readFileSync(target, "utf8"));
const seen = {
  title: new Set(),
  sourceUrl: new Set(),
  imageUrl: new Set(),
};
const duplicates = [];

for (const item of manifest.items || []) {
  for (const [field, value] of [["title", item.title], ["sourceUrl", item.sourceUrl], ["imageUrl", item.imageUrl]]) {
    const normalized = String(value || "").trim().toLowerCase().replace(/\/$/, "");
    if (!normalized) continue;
    if (seen[field].has(normalized)) duplicates.push(`${field}:${normalized}`);
    seen[field].add(normalized);
  }
}

if (manifest.itemCount !== 5 || manifest.items?.length !== 5) {
  throw new Error(`Expected exactly 5 items, found ${manifest.items?.length || 0}`);
}
if (duplicates.length) throw new Error(`Duplicates found: ${duplicates.join(", ")}`);

console.log("duplicateCount: 0");
