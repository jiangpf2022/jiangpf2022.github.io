#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const postPath = path.join(root, "source/_posts/Mathematical-Modeling-02-Visual-Evidence.md");
const post = fs.readFileSync(postPath, "utf8");
const figureCount = (post.match(/<figure\b/g) || []).length;
const awardCount = (post.match(/class="mm-visual-card mm-award-case"/g) || []).length;
const sourceCount = (post.match(/<strong>Source\.<\/strong>/g) || []).length;
const imagePaths = [...post.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
const awardPaths = imagePaths.filter((value) => value.includes("/visual-evidence/award/"));
const missing = awardPaths.filter((value) => !fs.existsSync(path.join(root, "source", value.replace(/^\/blog\//, ""))));
const ratio = figureCount ? awardCount / figureCount : 0;

console.table({
  figures: figureCount,
  awardPaperFigures: awardCount,
  attributedFigures: sourceCount,
  realPaperRatio: `${(ratio * 100).toFixed(1)}%`,
  missingAssets: missing.length,
});

const failures = [];
if (figureCount !== 100) failures.push(`expected 100 figures, found ${figureCount}`);
if (ratio < 0.8) failures.push(`real award-paper ratio ${(ratio * 100).toFixed(1)}% is below 80%`);
if (awardCount !== sourceCount) failures.push(`${awardCount} award figures but ${sourceCount} source labels`);
if (awardPaths.length !== awardCount) failures.push(`${awardCount} award cards but ${awardPaths.length} award image paths`);
if (missing.length) failures.push(`missing ${missing.length} award image assets`);

if (failures.length) {
  console.error("\nVisual Evidence audit failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log("\nVisual Evidence provenance audit passed.");
