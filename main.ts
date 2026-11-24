import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "The estimate you offer in the meeting is the apology your future self will write.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
