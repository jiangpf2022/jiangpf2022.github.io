import fs from "node:fs";
import path from "node:path";

const postsDir = path.resolve("source/_posts");
const minimumWords = 20_000;
const expectedQuestions = 10;
const failures = [];

const stripMarkdown = (source) => source
  .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "")
  .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
  // Remove actual HTML tags, but never treat mathematical comparisons such as
  // `f(x) < f(p)` as the beginning of a tag and swallow the following prose.
  .replace(/<\/?(?:div|span|p|strong|em|small|figure|figcaption|img|a|br|table|thead|tbody|tr|th|td|ol|ul|li|section|aside|details|summary)\b[^>]*>/gi, " ")
  .replace(/\x60\x60\x60[\s\S]*?\x60\x60\x60/g, " ")
  .replace(/\$\$[\s\S]*?\$\$/g, " ")
  .replace(/\$[^$\n]+\$/g, " ")
  .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
  .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  .replace(/[#>*_\x60|~-]/g, " ");

const englishWordCount = (source) =>
  (stripMarkdown(source).match(/[A-Za-z]+(?:[’'][A-Za-z]+)*/g) || []).length;

const posts = fs.readdirSync(postsDir)
  .filter((name) => /^Mathematical-Modeling-\d\d-.*\.md$/.test(name))
  .filter((name) => !name.endsWith("-zh.md"));

const levelOne = [];
for (const name of posts) {
  const source = fs.readFileSync(path.join(postsDir, name), "utf8");
  if (!/^categories:\s*Mathematical Modeling$/m.test(source)) continue;
  if (!/^lesson_level:\s*1$/m.test(source)) continue;
  const lesson = Number(/^lesson_number:\s*(\d+)$/m.exec(source)?.[1]);
  const reviewLocked = /^review_lock:\s*true$/m.test(source);
  const words = englishWordCount(source);
  const quizKey = 'data-modeling-quiz="lesson-' + lesson + '"';
  const quizReady = source.includes(quizKey);
  levelOne.push({ lesson, name, words, reviewLocked, quizReady });
  if (!reviewLocked && words < minimumWords) {
    failures.push("Blog " + lesson + ": " + words.toLocaleString() + " words; requires at least " + minimumWords.toLocaleString());
  }
  if (!reviewLocked && !quizReady) {
    failures.push("Blog " + lesson + ": missing " + expectedQuestions + "-question quiz mount");
  }
}

levelOne.sort((a, b) => a.lesson - b.lesson);
console.table(levelOne.map(({ lesson, words, reviewLocked, quizReady }) => ({
  blog: lesson,
  words,
  status: reviewLocked ? "locked draft" : "published",
  quiz: quizReady ? expectedQuestions + " questions" : "missing",
})));

if (failures.length) {
  console.error("\nLevel-1 publication gate failed:\n" + failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("\nAll published Level-1 blogs contain at least " + minimumWords.toLocaleString() + " English prose words and a " + expectedQuestions + "-question quiz.");
}
