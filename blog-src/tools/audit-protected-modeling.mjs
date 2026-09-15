import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const sourceDir = path.resolve("source/_posts");
const publicDir = path.resolve("public");
const failures = [];
const names = readdirSync(sourceDir).filter((name) =>
  /^Mathematical-Modeling-(0[1-9]|1[0-9]|20)-[A-Za-z0-9-]+\.md$/.test(name)
);

const current = new Map();
const archives = new Map();
for (const name of names) {
  const markdown = readFileSync(path.join(sourceDir, name), "utf8");
  const match = /^date:\s*(2026-09-(?:14|15))/m.exec(markdown);
  const lesson = /^Mathematical-Modeling-(\d{2})-/.exec(name)?.[1];
  if (!match || !lesson) continue;
  if (markdown.includes("categories: Mathematical Modeling Draft Archive")) archives.set(lesson, { name, markdown });
  else if (markdown.includes("categories: Mathematical Modeling")) {
    if (current.has(lesson)) failures.push(`duplicate current lesson ${lesson}`);
    current.set(lesson, { name, markdown });
  }
}

if (current.size !== 20) failures.push(`expected 20 current lessons, found ${current.size}`);
if (archives.size !== 16) failures.push(`expected 16 legacy private URLs, found ${archives.size}`);

const checkPage = (name, markdown, date, shouldLock) => {
  const htmlPath = path.join(publicDir, "2026/09", date, name.slice(0, -3), "index.html");
  if (!existsSync(htmlPath)) {
    failures.push(`${name}: generated page missing`);
    return;
  }
  const $ = load(readFileSync(htmlPath, "utf8"));
  const content = $(".article-content").first();
  const isLocked = content.find(".mm-protected-article").length === 1;
  if (shouldLock !== isLocked) failures.push(`${name}: wrong public/review state`);
  if (shouldLock && (content.text().length > 1000 || !markdown.includes('data-modeling-protected="true"'))) {
    failures.push(`${name}: private prose leaked or review-lock marker missing`);
  }
  if (!shouldLock && (!content.text().includes("Welcome—come in") || !content.find(".mm-key-box").length)) {
    failures.push(`${name}: first lesson missing its introduction or bright modeling-contract callout`);
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
    if (!existsSync(path.join(publicDir, file))) failures.push(`${name}: broken internal reference ${url.pathname}`);
  }
};

for (let number = 1; number <= 20; number++) {
  const no = String(number).padStart(2, "0");
  const post = current.get(no);
  if (!post) { failures.push(`missing current lesson ${no}`); continue; }
  if (number > 1 && !post.markdown.includes(`lesson_level: `)) failures.push(`${post.name}: missing level`);
  checkPage(post.name, post.markdown, number <= 2 ? "14" : "15", number > 1);
}
for (let number = 3; number <= 18; number++) {
  const post = archives.get(String(number).padStart(2, "0"));
  if (post) checkPage(post.name, post.markdown, "14", true);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("20 current routes checked (1 open, 19 review-locked); 16 legacy URLs preserved; internal links and assets resolved.");
}
