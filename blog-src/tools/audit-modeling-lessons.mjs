import fs from 'node:fs';
import path from 'node:path';

const postsDir = path.resolve('source/_posts');
const privateDraftsDir = process.argv[2] ? path.resolve(process.argv[2]) : null;
const posts = fs.readdirSync(postsDir)
  .filter(name => /^Mathematical-Modeling-\d\d-.*\.md$/.test(name))
  .sort();

function readableWords(markdown) {
  const prose = markdown
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    .replace(/<div\b[\s\S]*?<\/div>/gi, '')
    .replace(/<figure\b[\s\S]*?<\/figure>/gi, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\$[^\n$]+\$/g, '')
    .replace(/<!--[^]*?-->/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6} .+$/gm, '');
  return (prose.match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? []).length;
}

console.log('Lesson | Readable prose | Without repeated expansion | Status');
let incomplete = 0;
for (const name of posts) {
  const lesson = name.match(/Modeling-(\d\d)-/)[1];
  const sourcePath = lesson === '01' ? path.join(postsDir, name) :
    privateDraftsDir ? path.join(privateDraftsDir, name) : null;
  if (!sourcePath || !fs.existsSync(sourcePath)) {
    incomplete++;
    console.log(`${lesson} | — | — | PRIVATE DRAFT REQUIRED`);
    continue;
  }
  const source = fs.readFileSync(sourcePath, 'utf8');
  const withoutTemplate = source.replace(
    /<!-- teaching-expansion:start -->[\s\S]*?<!-- teaching-expansion:end -->/g,
    ''
  );
  const readable = readableWords(source);
  const independent = readableWords(withoutTemplate);
  const status = independent >= 10_000 ? 'candidate for manual review' : 'NOT COMPLETE';
  if (independent < 10_000) incomplete++;
  console.log(`${lesson} | ${readable} | ${independent} | ${status}`);
}
console.log(`Incomplete lessons by non-template word count: ${incomplete}/${posts.length}`);
if (posts.length !== 18 || incomplete) process.exitCode = 1;
