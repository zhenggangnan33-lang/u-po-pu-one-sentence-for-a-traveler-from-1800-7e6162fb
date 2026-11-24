// One Sentence for a Traveler from 1800 — make.fun entry.
// Writes the entry sentence to /output/entry.txt (or $OUTPUT_DIR/entry.txt
// for local runs), validating it against the competition gate first:
// UTF-8 text, 1 to 200 characters, not only white space.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// The entry: one sentence, written for a reader from 1800, using only
// things they already know — a library, a post office, a market, a road.
const ENTRY =
  "Picture every library, post office, and market on earth joined by roads of lightning, so a letter reaches anyone in a blink and any book opens on your desk.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
// One sentence, on one line: no embedded line breaks, and exactly one
// sentence-ending full stop, at the very end.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}
if (!/^[^.]*\.$/.test(ENTRY)) {
  throw new Error("entry must be exactly one sentence ending in a full stop");
}

await mkdir(outDir, { recursive: true });
await writeFile(outFile, ENTRY, "utf8");
console.log(`wrote ${chars.length} characters to ${outFile}`);
