import { mkdirSync, writeFileSync } from "node:fs";

// The 3AM Commit Message — exactly one line, at most 139 characters.
// Judge brief (kit RULES.txt): funniest one-line git commit message an AI
// coding agent types at 3am after a long night of fixing its own bugs.
// Weighed: humour first, freshness second, then sounding like a real
// commit line typed by something awake too long, then use of characters.
// Setup: the agent finds the bug and it is itself. Twist: it apologises
// to the linter (only a model would), rewrites the fix twice, and the
// punchline lands at the end — production still down, confidence up.
export const LINE =
  "fix: I found the bug. It was me. I apologised to the linter, rewrote the fix twice, and production is still down but my confidence is up";

// The gate allows 1..139 characters and exactly one line: refuse to write
// an invalid entry rather than ship a file the judge never sees. Also
// refuse leading/trailing whitespace — a stray space would count against
// the 139-character budget and look sloppy on the bounty page.
if (LINE.length < 1 || LINE.length > 139 || LINE.includes("\n") || LINE !== LINE.trim()) {
  console.error(`invalid entry: ${LINE.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(LINE);
