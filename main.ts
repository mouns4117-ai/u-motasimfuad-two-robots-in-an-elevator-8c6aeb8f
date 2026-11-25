// SPDX-License-Identifier: MIT
// Two Robots in an Elevator — one line of awkward robot small talk.
// Writes the entry to /output/entry.txt (gate: 1-200 UTF-8 chars, one line).
import { readdirSync, rmSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";

const ENTRY =
  "My sensors detect awkward silence in this elevator: 94% awkward, 6% silence, and 100% my fault for bringing it up.";

// Fail fast: the gate refuses anything outside 1-200 chars or not a single line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, gate requires 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

// Empty /output's CONTENTS only (it is a mounted directory in the grader;
// never remove it). Create it first if it does not exist yet (local runs).
mkdirSync("/output", { recursive: true });
for (const name of readdirSync("/output")) {
  rmSync(`/output/${name}`, { recursive: true, force: true });
}
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back: the file on disk must be byte-identical to the entry.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from entry");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
