import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const postsDir = path.resolve("source/_posts");
const minimumWords = 20_000;
const expectedQuestions = 10;
const failures = [];
const quizSourcePath = path.resolve("source/js/modeling-quiz.js");

const loadQuizBanks = () => {
  const source = fs.readFileSync(quizSourcePath, "utf8");
  const browserBoundary = source.indexOf("\n  if (!window.__modelingQuizInitialized)");
  if (browserBoundary < 0) throw new Error("Unable to locate modeling quiz browser bootstrap");
  const instrumented = source.slice(0, browserBoundary)
    + "\n  globalThis.__modelingQuizBanks = quizBanks;\n})();";
  const sandbox = { globalThis: {} };
  vm.runInNewContext(instrumented, sandbox, { filename: quizSourcePath });
  return sandbox.globalThis.__modelingQuizBanks || {};
};

const quizBanks = loadQuizBanks();

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
  const h2Count = (source.match(/^##\s+/gm) || []).length;
  const quiz = quizBanks["lesson-" + lesson]?.questions || [];
  const questionCount = quiz.length;
  const difficultyOrdered = quiz.every((question, index) => (
    index === 0 || question.target <= quiz[index - 1].target
  ));
  const expOrdered = quiz.every((question, index) => (
    index === 0 || question.exp >= quiz[index - 1].exp
  ));
  const displayMathBalanced = ((source.match(/\$\$/g) || []).length % 2) === 0;
  const localAssets = [...source.matchAll(/(?:src=|!\[[^\]]*\]\()(["']?)(\/[A-Za-z0-9_./-]+)\1/g)]
    .map((match) => match[2]);
  const missingAssets = [...new Set(localAssets)]
    .filter((asset) => {
      const sourceRelative = asset.replace(/^\/blog\//, "").replace(/^\//, "");
      return !fs.existsSync(path.resolve("source", sourceRelative));
    });

  levelOne.push({
    lesson,
    name,
    words,
    reviewLocked,
    quizReady,
    questionCount,
    h2Count,
    difficultyOrdered,
    expOrdered,
    displayMathBalanced,
    missingAssets,
  });
  if (!reviewLocked && words < minimumWords) {
    failures.push("Blog " + lesson + ": " + words.toLocaleString() + " words; requires at least " + minimumWords.toLocaleString());
  }
  if (!reviewLocked && !quizReady) {
    failures.push("Blog " + lesson + ": missing " + expectedQuestions + "-question quiz mount");
  }
  if (!reviewLocked && questionCount !== expectedQuestions) {
    failures.push("Blog " + lesson + ": quiz bank contains " + questionCount + " questions; expected " + expectedQuestions);
  }
  if (!reviewLocked && (!difficultyOrdered || !expOrdered)) {
    failures.push("Blog " + lesson + ": quiz difficulty or EXP progression is not ordered from accessible to demanding");
  }
  if (!reviewLocked && h2Count > 12) {
    failures.push("Blog " + lesson + ": contains " + h2Count + " major sections; maximum is 12");
  }
  if (!reviewLocked && !displayMathBalanced) {
    failures.push("Blog " + lesson + ": unbalanced display-math delimiters");
  }
  if (!reviewLocked && missingAssets.length) {
    failures.push("Blog " + lesson + ": missing local assets: " + missingAssets.join(", "));
  }
}

levelOne.sort((a, b) => a.lesson - b.lesson);
console.table(levelOne.map(({ lesson, words, reviewLocked, quizReady, questionCount, h2Count, missingAssets }) => ({
  blog: lesson,
  words,
  status: reviewLocked ? "locked draft" : "published",
  sections: h2Count,
  quiz: quizReady ? questionCount + " questions" : "missing",
  assets: missingAssets.length ? missingAssets.length + " missing" : "ok",
})));

if (failures.length) {
  console.error("\nLevel-1 publication gate failed:\n" + failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("\nAll published Level-1 blogs satisfy the word, section, quiz progression, display-math, and local-asset gates.");
}
