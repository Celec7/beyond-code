#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED = ["## When not to use", "## Inputs and authorization", "## Method"];
const CLOSINGS = ["## Validate and report", "## Stopping and persistence"];
const ALLOWED_ENTRIES = new Set(["SKILL.md", "references", "templates", "scripts", "agents"]);
const WORD_BUDGET = 520;

const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const CN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

export function englishNumber(n) {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10), o = n % 10;
  return o ? TENS[t] + "-" + ONES[o] : TENS[t];
}
export function chineseNumber(n) {
  if (n < 10) return CN[n];
  const t = Math.floor(n / 10), o = n % 10;
  const head = t === 1 ? "十" : CN[t] + "十";
  return o ? head + CN[o] : head;
}

function markdownFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...markdownFiles(p));
    else if (entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function linkTargets(text) {
  const out = [];
  const re = /\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(text))) out.push(m[1].trim().replace(/^<|>$/g, ""));
  return out;
}

function isRelativeLink(target) {
  if (/^(https?:|mailto:|#|\/)/.test(target)) return false;
  if (target.indexOf("<") >= 0 || target.indexOf(">") >= 0 || target.indexOf("*") >= 0) return false;
  return true;
}

function checkLinks(root, target, err) {
  if (!existsSync(target)) return;
  const files = statSync(target).isDirectory() ? markdownFiles(target) : [target];
  for (const file of files) {
    for (const t of linkTargets(readFileSync(file, "utf8"))) {
      if (!isRelativeLink(t)) continue;
      const clean = t.split("#")[0];
      if (!clean) continue;
      if (!existsSync(resolve(dirname(file), clean))) {
        err("LINK_BROKEN", file, "link target not found: " + t, "Fix the path or remove the link.");
      }
    }
  }
}

function checkSkill(root, name, err, warn) {
  const dir = join(root, "skills", name);
  const file = join(dir, "SKILL.md");
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");

  let fmEnd = -1;
  if (lines[0] === "---") fmEnd = lines.indexOf("---", 1);
  if (fmEnd < 1) err("FRONTMATTER_MISSING", file, "missing YAML frontmatter block", "Start with ---, name, description, ---.");
  const fm = fmEnd > 0 ? lines.slice(1, fmEnd) : [];
  const field = (key) => {
    const l = fm.find((x) => x.startsWith(key + ":"));
    return l ? l.slice(key.length + 1).trim() : "";
  };
  const fmName = field("name");
  const desc = field("description");
  const userOnly = fm.some((l) => l.trim() === "disable-model-invocation: true");

  if (!fmName) err("NAME_MISSING", file, "frontmatter name is missing", "Add name: <kebab-case-name>.");
  else {
    if (fmName !== name) err("NAME_MISMATCH", file, "name " + fmName + " must match the directory " + name, "Set name: " + name + ".");
    if (!/^[a-z0-9-]+$/.test(fmName)) err("NAME_INVALID", file, "name " + fmName + " has invalid characters", "Use lowercase letters, digits, and hyphens.");
  }
  if (!desc) err("DESCRIPTION_MISSING", file, "frontmatter description is missing", "Add the triggering conditions.");
  else if (!/^Use (when|for)\b/.test(desc)) warn("DESCRIPTION_TRIGGER", file, "description should start with Use when or Use for: " + desc.slice(0, 60), "Start with the triggering conditions.");

  const lineIndexOf = (h) => lines.findIndex((l) => l.trim() === h);
  let prev = -1;
  for (const h of REQUIRED) {
    const i = lineIndexOf(h);
    if (i < 0) { err("SECTION_MISSING", file, "missing required section " + h, "Add a " + h + " section."); continue; }
    if (i < prev) err("SECTION_ORDER", file, h + " must come after the previous required section", "Reorder the sections.");
    prev = i;
  }
  const closing = CLOSINGS.map((c) => [c, lineIndexOf(c)]).filter((pair) => pair[1] >= 0);
  if (!closing.length) err("SECTION_MISSING", file, "missing closing section: " + CLOSINGS.join(" or "), "End with a closing section.");
  else if (Math.min(...closing.map((pair) => pair[1])) < prev) err("SECTION_ORDER", file, "the closing section must come last", "Move it to the end.");

  if (lines.some((l) => l.trim() === "## When to use")) err("WHEN_TO_USE_PRESENT", file, "a When to use section duplicates the description", "Move the triggers into the frontmatter description.");
  if (text.indexOf("\u2014") >= 0) err("EM_DASH", file, "em dash is not allowed", "Rewrite with a colon, comma, or parentheses.");
  for (const legacy of [".agents/notes", ".agents/work"]) {
    if (text.indexOf(legacy) >= 0) err("LEGACY_PATH", file, "legacy path " + legacy, "Use docs/agents/... instead.");
  }

  const words = text.split(/\s+/).filter(Boolean).length;
  if (words > WORD_BUDGET && !existsSync(join(dir, "references"))) {
    warn("WORD_BUDGET", file, words + " words with no references/ directory", "Move detail to references/.");
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!ALLOWED_ENTRIES.has(entry.name)) {
      err("SKILL_DIR_ENTRY", join(dir, entry.name), "unexpected entry " + entry.name + " in a skill directory", "Allowed: SKILL.md, references/, templates/, scripts/, agents/.");
    }
  }
  const agentsDir = join(dir, "agents");
  if (existsSync(agentsDir)) {
    for (const entry of readdirSync(agentsDir)) {
      if (entry !== "openai.yaml") err("SKILL_DIR_ENTRY", join(agentsDir, entry), "unexpected entry " + entry + " under agents/", "Only openai.yaml belongs there.");
    }
  }
  const hasOpenai = existsSync(join(agentsDir, "openai.yaml"));
  if (userOnly && !hasOpenai) err("USER_ONLY_MISMATCH", file, "disable-model-invocation requires agents/openai.yaml", "Add agents/openai.yaml.");
  if (!userOnly && hasOpenai) err("USER_ONLY_MISMATCH", file, "agents/openai.yaml requires disable-model-invocation: true", "Add the flag or remove the file.");

  const allText = markdownFiles(dir).map((f) => readFileSync(f, "utf8")).join("\n");
  for (const sub of ["references", "templates"]) {
    const subDir = join(dir, sub);
    if (!existsSync(subDir)) continue;
    for (const entry of readdirSync(subDir)) {
      const relPath = sub + "/" + entry;
      if (allText.indexOf(relPath) < 0) {
        warn("RESOURCE_UNLINKED", join(subDir, entry), "resource " + relPath + " is not referenced from the skill Markdown", "Link it from SKILL.md or a reference.");
      }
    }
  }

  checkLinks(root, dir, err);
}

function checkReadmes(root, names, err) {
  const expect = new Set(names);
  const n = names.length;
  const specs = [["README.md", false], ["README_zh-CN.md", true]];
  for (const spec of specs) {
    const readme = spec[0], zh = spec[1];
    const file = join(root, readme);
    if (!existsSync(file)) { err("README_MISSING", file, readme + " not found", "Add it."); continue; }
    const text = readFileSync(file, "utf8");
    const found = new Set();
    const re = /\]\(skills\/([a-z0-9-]+)\/SKILL\.md\)/g;
    let m;
    while ((m = re.exec(text))) found.add(m[1]);
    for (const x of expect) if (!found.has(x)) err("README_MISSING_SKILL", file, readme + " has no catalog row for " + x, "Add a row linking skills/" + x + "/SKILL.md.");
    for (const x of found) if (!expect.has(x)) err("README_UNKNOWN_SKILL", file, readme + " lists unknown skill " + x, "Remove the row or add the skill.");
    const token = zh ? chineseNumber(n) + "个独立技能" : englishNumber(n) + " independent skills";
    if (text.indexOf(token) < 0) err("README_COUNT", file, readme + " must state " + token, "Update the skill count to " + n + ".");
  }
}

export function checkRoot(root) {
  const errors = [];
  const warnings = [];
  const rel = (p) => relative(root, p) || p;
  const err = (code, file, message, fix) => errors.push({ code, file: rel(file), message, fix });
  const warn = (code, file, message, fix) => warnings.push({ code, file: rel(file), message, fix });

  const skillsDir = join(root, "skills");
  if (!existsSync(skillsDir)) { err("SKILLS_DIR_MISSING", skillsDir, "skills/ directory not found", "Create skills/<name>/SKILL.md."); return { errors, warnings }; }

  const names = [];
  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) { err("SKILLS_DIR_ENTRY", join(skillsDir, entry.name), "unexpected entry " + entry.name + " under skills/", "Move it into a skill directory or remove it."); continue; }
    if (!existsSync(join(skillsDir, entry.name, "SKILL.md"))) { err("SKILL_MISSING", join(skillsDir, entry.name), "skills/" + entry.name + "/ has no SKILL.md", "Add skills/" + entry.name + "/SKILL.md."); continue; }
    names.push(entry.name);
  }
  names.sort();

  for (const name of names) checkSkill(root, name, err, warn);
  checkLinks(root, join(root, "docs"), err);
  checkLinks(root, join(root, "README.md"), err);
  checkLinks(root, join(root, "README_zh-CN.md"), err);
  checkReadmes(root, names, err);
  return { errors, warnings };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const root = resolve(process.argv[2] || ".");
  const result = checkRoot(root);
  for (const w of result.warnings) console.warn("warning " + w.code + ": " + w.file + ": " + w.message + "\n  fix: " + w.fix);
  for (const e of result.errors) console.error("error " + e.code + ": " + e.file + ": " + e.message + "\n  fix: " + e.fix);
  const summary = result.errors.length + " error(s), " + result.warnings.length + " warning(s)";
  if (result.errors.length) { console.error("FAIL: " + summary); process.exitCode = 1; }
  else console.log("OK: " + summary);
}
