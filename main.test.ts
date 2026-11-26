import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LINE } from "./main.ts";

test("entry is exactly one funny line of at most 139 characters", () => {
  assert.equal(LINE.split("\n").length, 1, "must be exactly one line");
  assert.ok(LINE.length >= 1 && LINE.length <= 139, `length ${LINE.length} must be 1..139`);
  assert.equal(LINE, LINE.trim(), "no leading/trailing whitespace");
  assert.match(LINE, /^fix:/, "must read like a commit message");
  assert.match(LINE, /linter/i, "agent-voice beat: apologises to the linter");
  assert.match(LINE, /confidence is up/i, "punchline must land at the end");
  console.log(`LINE (${LINE.length} chars): ${LINE}`);
});

test("program writes the same line to /output/entry.txt", () => {
  const written = readFileSync("/output/entry.txt", "utf8");
  assert.equal(written, LINE, "entry.txt must hold exactly the line, no trailing newline");
  assert.ok(written.length <= 139, `entry.txt is ${written.length} chars`);
});
