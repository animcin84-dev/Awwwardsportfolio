import { rm } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const resolved = resolve(projectRoot, ".next-dev");

if (basename(resolved) !== ".next-dev" || dirname(resolved) !== resolve(projectRoot)) {
  throw new Error(`Refusing to remove unexpected path: ${resolved}`);
}

await rm(resolved, { recursive: true, force: true });
console.log(`Cleared generated development cache: ${resolved}`);
