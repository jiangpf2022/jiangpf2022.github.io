import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceDir = path.resolve("source/_posts");
const backupDir = process.argv[2];
const lessonName = /^Mathematical-Modeling-(0[2-9]|1[0-8])-[A-Za-z0-9-]+\.md$/;

if (!backupDir || process.env.MODELING_DB_ROWS_VERIFIED !== "17") {
  throw new Error("Pass the private backup directory and verify all 17 Supabase rows first.");
}

const files = (await readdir(sourceDir)).filter((name) => lessonName.test(name)).sort();
if (files.length !== 17) throw new Error(`Expected 17 review drafts, found ${files.length}.`);

const originals = [];
for (const name of files) {
  const current = await readFile(path.join(sourceDir, name));
  const backup = await readFile(path.join(backupDir, name));
  if (!current.equals(backup)) throw new Error(`Private backup differs from ${name}.`);
  const text = current.toString("utf8");
  const frontmatter = text.match(/^---\n[\s\S]*?\n---\n/);
  if (!frontmatter) throw new Error(`Missing frontmatter in ${name}.`);
  originals.push({ name, frontmatter: frontmatter[0] });
}

const lockedBody = `\n## Lesson awaiting review\n\n<div class="mm-protected-article" data-modeling-protected="true">\n  <div class="mm-lock-symbol" aria-hidden="true"><i class="fa-solid fa-lock"></i></div>\n  <p class="mm-lock-eyebrow">AUTHOR REVIEW IN PROGRESS</p>\n  <h3>This lesson is locked for now</h3>\n  <p>The author is reviewing this lesson before publication. Please wait for it to unlock.</p>\n</div>\n`;

for (const { name, frontmatter } of originals) {
  await writeFile(path.join(sourceDir, name), frontmatter + lockedBody, "utf8");
}

console.log(`Locked ${originals.length} public routes; complete drafts remain in ${backupDir}.`);
