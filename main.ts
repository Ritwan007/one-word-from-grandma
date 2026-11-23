import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One Word From Grandma — the single word grandma would text about AI.
//
// Chosen word: "computery" — the warm, slightly baffled word a real
// grandmother types when the grandkids show her the new computer thing.
// One word, 9 characters, no spaces, no punctuation tricks.
const WORD = "computery";

// Guard the gate before writing: exactly one word, 1-30 chars, no whitespace.
if (!/^\S{1,30}$/.test(WORD)) {
  throw new Error(`invalid entry word: ${JSON.stringify(WORD)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");

// Verify the write: read it back and confirm it is exactly the chosen
// word, so a truncated or newline-polluted output can never slip through.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== WORD) {
  throw new Error(`entry mismatch: wrote ${JSON.stringify(written)}, expected ${JSON.stringify(WORD)}`);
}
