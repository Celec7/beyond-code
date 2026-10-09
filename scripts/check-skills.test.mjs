import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { checkRoot, englishNumber, chineseNumber } from "./check-skills.mjs";

function skillFile(name, opts) {
  opts = opts || {};
  const desc = opts.description || "Use when testing the checker.";
  const extra = opts.extra || "";
  const body = opts.body || "Do the thing.";
  const sections = opts.sections || ["## When not to use", "## Inputs and authorization", "## Method"];
  const closing = opts.closing || "## Validate and report";
  const bodies = {
    "## When not to use": "- Nothing.",
    "## Inputs and authorization": "- **Required:** a scope.",
    "## Method": body
  };
  const content = ["---", "name: " + name, "description: " + desc, extra + "---", "", "# " + name, "", "Guidance, not a script.", ""];
  for (const s of sections) content.push(s, "", bodies[s], "");
  content.push(closing, "", "- Report the result.", "");
  return content.join("\n");
}

function readmeFile(names, zh) {
  const n = names.length;
  const head = zh ? chineseNumber(n) + "个独立技能" : englishNumber(n) + " independent skills";
  const rows = names.map((x) => "- [" + x + "](skills/" + x + "/SKILL.md)").join("\n");
  return "# Test\n\n" + head + "\n\n" + rows + "\n";
}

function suite(files) {
  const root = mkdtempSync(join(tmpdir(), "check-skills-"));
  for (const rel of Object.keys(files)) {
    const p = join(root, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, files[rel]);
  }
  return root;
}

function baseFiles(mutate) {
  mutate = mutate || {};
  const names = ["alpha", "beta"];
  const files = {};
  files["skills/alpha/SKILL.md"] = skillFile("alpha", mutate.alpha);
  files["skills/beta/SKILL.md"] = skillFile("beta", mutate.beta);
  files["README.md"] = readmeFile(names, false);
  files["README_zh-CN.md"] = readmeFile(names, true);
  return files;
}

const codes = (result, kind) => result[kind].map((x) => x.code);

test("numbers", () => {
  assert.equal(englishNumber(18), "eighteen");
  assert.equal(chineseNumber(18), "十八");
});

test("a valid suite has no errors", () => {
  assert.deepEqual(checkRoot(suite(baseFiles())).errors, []);
});

test("name mismatch", () => {
  const files = baseFiles();
  files["skills/alpha/SKILL.md"] = skillFile("gamma", {});
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("NAME_MISMATCH"));
});

test("missing required section", () => {
  const files = baseFiles({ alpha: { sections: ["## When not to use", "## Inputs and authorization"] } });
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("SECTION_MISSING"));
});

test("when to use is rejected", () => {
  const files = baseFiles({ alpha: { body: "## When to use\n\n- x" } });
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("WHEN_TO_USE_PRESENT"));
});

test("em dash is rejected", () => {
  const files = baseFiles({ alpha: { body: "An em dash \u2014 here." } });
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("EM_DASH"));
});

test("broken link is rejected", () => {
  const files = baseFiles({ alpha: { body: "[missing](missing-file.md)" } });
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("LINK_BROKEN"));
});

test("unexpected skill directory entry is rejected", () => {
  const files = baseFiles();
  files["skills/alpha/notes.txt"] = "stray";
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("SKILL_DIR_ENTRY"));
});

test("user-only metadata must match", () => {
  const files = baseFiles({ alpha: { extra: "disable-model-invocation: true\n" } });
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("USER_ONLY_MISMATCH"));
  const files2 = baseFiles();
  files2["skills/alpha/agents/openai.yaml"] = "policy:\n  allow_implicit_invocation: false\n";
  assert.ok(codes(checkRoot(suite(files2)), "errors").includes("USER_ONLY_MISMATCH"));
});

test("readme must list every skill", () => {
  const files = baseFiles();
  files["README.md"] = readmeFile(["alpha"], false);
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("README_MISSING_SKILL"));
});

test("readme count must match", () => {
  const files = baseFiles();
  files["README.md"] = readmeFile(["alpha", "beta"], false).replace("two independent skills", "three independent skills");
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("README_COUNT"));
});

test("legacy dot-directory paths are rejected", () => {
  const files = baseFiles({ alpha: { body: "See .agents/notes/x.md." } });
  assert.ok(codes(checkRoot(suite(files)), "errors").includes("LEGACY_PATH"));
});

test("description without Use when is a warning only", () => {
  const files = baseFiles({ alpha: { description: "Clean up the file." } });
  const r = checkRoot(suite(files));
  assert.deepEqual(r.errors, []);
  assert.ok(codes(r, "warnings").includes("DESCRIPTION_TRIGGER"));
});

test("word budget without references is a warning only", () => {
  const files = baseFiles({ alpha: { body: Array(600).fill("word").join(" ") } });
  const r = checkRoot(suite(files));
  assert.deepEqual(r.errors, []);
  assert.ok(codes(r, "warnings").includes("WORD_BUDGET"));
});

test("unlinked resource is a warning only", () => {
  const files = baseFiles();
  files["skills/alpha/references/orphan.md"] = "# Orphan\n";
  const r = checkRoot(suite(files));
  assert.ok(codes(r, "warnings").includes("RESOURCE_UNLINKED"));
});
