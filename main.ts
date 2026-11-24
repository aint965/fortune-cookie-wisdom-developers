import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "The estimate you offer in the meeting is the apology your future self will write.";

const MAX_CHARS = 120;
const OUTPUT_PATH = "/output/entry.txt";

// Validate the line against the competition gate before writing anything:
// 1-120 characters, valid UTF-8, and not only white space. A bad line must
// fail loudly here instead of producing an invalid entry that the sealed
// scorer would refuse. Count code points, not UTF-16 code units, so a
// character outside the BMP counts once, as the gate counts it.
const chars = [...LINE];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  console.error(
    `Invalid entry: ${chars.length} characters, expected 1-${MAX_CHARS}.`,
  );
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("Invalid entry: the line is only white space.");
  process.exit(1);
}
try {
  new TextDecoder("utf-8", { fatal: true }).decode(
    new TextEncoder().encode(LINE),
  );
} catch {
  console.error("Invalid entry: the line is not valid UTF-8.");
  process.exit(1);
}

// The write itself stays deterministic: the same bytes on every run, no
// trailing newline added, no timestamp. mkdirSync with recursive:true
// creates /output only if it is missing and never deletes anything.
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");
