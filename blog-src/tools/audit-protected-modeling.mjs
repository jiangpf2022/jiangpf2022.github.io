import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const sourceDir = path.resolve("source/_posts");
const publicDir = path.resolve("public");
const draftsDir = process.argv[2] ? path.resolve(process.argv[2]) : null;
const lockScript = readFileSync(path.resolve("source/js/protected-modeling.js"), "utf8");
const lockList = lockScript.match(/const lockedLessons = new Set\(\[([^\]]*)\]\)/)?.[1];
if (!lockList) throw new Error("Could not read the current review-lock list.");
const lockedLessons = new Set(Array.from(lockList.matchAll(/"(\d{2})"/g), (match) => match[1]));
const names = readdirSync(sourceDir)
  .filter((name) => /^Mathematical-Modeling-(0[1-9]|1[0-8])-[A-Za-z0-9-]+\.md$/.test(name))
  .sort();
if (names.length !== 18) throw new Error(`Expected 18 lessons, found ${names.length}.`);

const failures = [];
for (const [index, name] of names.entries()) {
  const slug = name.slice(0, -3);
  const lesson = index + 1;
  const locked = lockedLessons.has(String(lesson).padStart(2, "0"));
  const markdown = readFileSync(path.join(sourceDir, name), "utf8");
  const htmlPath = path.join(publicDir, "2026/09/14", slug, "index.html");
  if (!existsSync(htmlPath)) {
    failures.push(`${name}: generated page missing`);
    continue;
  }
  const $ = load(readFileSync(htmlPath, "utf8"));
  const content = $(".article-content").first();
  const isLocked = content.find(".mm-protected-article").length === 1;
  if (lesson === 1 && (isLocked || !content.text().includes("Welcome—come in"))) {
    failures.push(`${name}: public first lesson missing its teaching introduction`);
  }
  if (locked && (!isLocked || !markdown.includes('data-modeling-protected="true"'))) {
    failures.push(`${name}: review lock missing`);
  }
  if (!locked && isLocked) failures.push(`${name}: reviewed lesson still appears locked`);
  if (locked && content.text().length > 1000) {
    failures.push(`${name}: private lesson prose appears in public HTML`);
  }
  if (locked && draftsDir) {
    const draftPath = path.join(draftsDir, name);
    if (!existsSync(draftPath)) failures.push(`${name}: private Markdown draft missing`);
    else if (!readFileSync(draftPath, "utf8").includes("Welcome—come in")) {
      failures.push(`${name}: private draft missing its teaching introduction`);
    }
  }
  for (const element of $("a[href],img[src],script[src],link[href]").toArray()) {
    const ref = $(element).attr("href") || $(element).attr("src");
    if (!ref || ref.startsWith("#") || ref.startsWith("data:")) continue;
    let url;
    try { url = new URL(ref, "https://jiangpf2022.github.io/blog/"); }
    catch { continue; }
    if (url.hostname !== "jiangpf2022.github.io" || !url.pathname.startsWith("/blog/")) continue;
    let file = decodeURIComponent(url.pathname.slice("/blog/".length));
    if (!file || file.endsWith("/")) file += "index.html";
    if (!path.extname(file)) file = path.join(file, "index.html");
    if (!existsSync(path.join(publicDir, file))) {
      failures.push(`${name}: broken internal reference ${url.pathname}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`18 routes verified: ${18 - lockedLessons.size} public, ${lockedLessons.size} locked, drafts preserved, internal assets linked.`);
}
