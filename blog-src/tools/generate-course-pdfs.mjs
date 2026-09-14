import fs from "node:fs/promises";
import fsSync from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";
import puppeteer from "puppeteer-core";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const publicDirectory = path.join(projectDirectory, "public");
const outputDirectory = path.join(publicDirectory, "pdfs");
const renderDirectory = path.join(publicDirectory, ".course-pdf-render");
const courseCategories = new Set([
  "Deep Learning",
  "LLM Generative AI",
  "Computational Aspects of Robotics",
]);

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const chromeCandidates = [
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const chromeExecutable = chromeCandidates.find((candidate) => fsSync.existsSync(candidate));
if (!chromeExecutable) {
  throw new Error(
    `Chrome was not found. Set CHROME_PATH to a Chrome or Chromium executable. Checked: ${chromeCandidates.join(", ")}`,
  );
}

const catalog = JSON.parse(
  await fs.readFile(path.join(publicDirectory, "category-hub.json"), "utf8"),
);
const articles = catalog.filter((article) =>
  article.categories.some((category) => courseCategories.has(category)),
);

if (!articles.length) {
  throw new Error("No published course articles were found in category-hub.json.");
}

const stylesheet = `
  @page { size: A4; margin: 15mm 16mm 18mm; }
  * { box-sizing: border-box; }
  html { background: #fff; color: #171b25; font-size: 10.4pt; }
  body {
    background: #fff;
    color: #171b25;
    font-family: Georgia, "Times New Roman", "Noto Serif", serif;
    line-height: 1.46;
    margin: 0;
  }
  .pdf-document { margin: 0 auto; max-width: 180mm; }
  .pdf-header {
    border-bottom: 1.2px solid #17233a;
    margin-bottom: 9mm;
    padding: 1mm 0 4mm;
    text-align: center;
  }
  .pdf-header h1 {
    color: #21458f;
    font-size: 23pt;
    letter-spacing: -0.025em;
    line-height: 1.12;
    margin: 0 auto 2mm;
    max-width: 165mm;
  }
  .pdf-subtitle {
    color: #534dce;
    font-size: 13pt;
    margin: 0 0 2.5mm;
  }
  .pdf-meta { color: #384154; font-size: 9.3pt; margin: 0; }
  .pdf-content > p:first-child { font-size: 10.8pt; }
  h2, h3, h4 { break-after: avoid-page; page-break-after: avoid; }
  h2 {
    border-bottom: 1px solid #526ff0;
    color: #21458f;
    font-size: 17.5pt;
    line-height: 1.2;
    margin: 8mm 0 3mm;
    padding-bottom: 1mm;
  }
  h3 {
    color: #514fe1;
    font-size: 13.7pt;
    line-height: 1.24;
    margin: 5.5mm 0 2mm;
  }
  h4 { color: #2e477b; font-size: 11.5pt; margin: 4mm 0 1.5mm; }
  p { margin: 0 0 2.5mm; orphans: 3; widows: 3; }
  ul, ol { margin: 1.5mm 0 3mm; padding-left: 6.5mm; }
  li { margin: 0.8mm 0; }
  strong { color: #101827; }
  a { color: #21458f; text-decoration: none; }
  blockquote {
    background: #f5f7fc;
    border-left: 2.5px solid #657de2;
    color: #303a50;
    margin: 3mm 0;
    padding: 2.5mm 4mm;
  }
  code {
    background: #eef2f8;
    border-radius: 3px;
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 0.88em;
    padding: 0.1em 0.28em;
  }
  pre {
    background: #f4f6fa;
    border: 1px solid #d9e0ec;
    border-radius: 5px;
    break-inside: avoid-page;
    font-size: 8.8pt;
    line-height: 1.38;
    margin: 3mm 0;
    overflow: hidden;
    padding: 3mm;
    white-space: pre-wrap;
  }
  pre code { background: none; padding: 0; }
  table {
    border-collapse: collapse;
    break-inside: avoid-page;
    font-size: 9pt;
    margin: 3mm 0 4mm;
    width: 100%;
  }
  th, td { border: 0.7px solid #9aa5b6; padding: 1.6mm 2mm; vertical-align: top; }
  th { background: #edf2fb; color: #172c59; }
  img {
    break-inside: avoid-page;
    display: block;
    height: auto;
    margin: 3.5mm auto;
    max-height: 150mm;
    max-width: 78%;
    object-fit: contain;
  }
  figure, .llm1-figure, .robotics-figure, .llm1-figure-grid {
    break-inside: avoid-page;
    margin: 3.5mm auto;
    max-width: 100%;
  }
  figcaption { color: #5c6678; font-size: 8.5pt; text-align: center; }
  mjx-container { break-inside: avoid-page; color: #111827; max-width: 100%; }
  mjx-container[display="true"] { margin: 3mm 0 !important; overflow: visible !important; }
  mjx-container svg { max-width: 100%; }
  .headerlink { display: none; }
  hr { border: 0; border-top: 0.8px solid #cbd3df; margin: 5mm 0; }
  .note, .tabs, .folding-container {
    break-inside: avoid-page;
    border: 1px solid #d9e0ec;
    border-radius: 5px;
    margin: 3mm 0;
    padding: 2.5mm 3.5mm;
  }
  .copy-code, .code-lang, button, script, style, iframe, video, audio { display: none !important; }
`;

const buildDocument = async (article) => {
  const articlePublicPath = article.path.replace(/^\/blog\//, "");
  const sourceFile = path.join(publicDirectory, articlePublicPath, "index.html");
  const source = await fs.readFile(sourceFile, "utf8");
  const $ = load(source);
  const title = $(".article-title h1").first().text().trim() || article.title;
  const category = article.categories.find((name) => courseCategories.has(name)) || "Course Notes";
  const date = $(".article-date .desktop").first().text().trim();
  for (const image of $(".article-content img").toArray()) {
    const element = $(image);
    const source = element.attr("data-src") || element.attr("src") || "";
    if (source.startsWith("/blog/") || source.startsWith("/images/")) {
      const localPath = source.replace(/^\/blog\//, "").replace(/^\//, "");
      const extension = path.extname(localPath).toLowerCase();
      const mime = mimeTypes[extension] || "application/octet-stream";
      const data = await fs.readFile(path.join(publicDirectory, localPath));
      element.attr("src", `data:${mime};base64,${data.toString("base64")}`);
    } else {
      element.attr("src", source);
    }
    element.removeAttr("data-src lazyload loading decoding");
  }
  const content = $(".article-content").first().html();
  if (!content) throw new Error(`Article content was not found in ${sourceFile}`);

  const slug = article.path.split("/").filter(Boolean).at(-1);
  const renderFile = path.join(renderDirectory, `${slug}.html`);
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="data:,">
  <base href="http://127.0.0.1/__PORT__${escapeHtml(article.path)}">
  <title>${escapeHtml(title)} — Review Notes</title>
  <style>${stylesheet}</style>
</head>
<body>
  <main class="pdf-document">
    <header class="pdf-header">
      <h1>${escapeHtml(title)}</h1>
      <p class="pdf-subtitle">Lecture Summary &amp; Review Guide</p>
      <p class="pdf-meta">${escapeHtml(category)} &nbsp;—&nbsp; Gavin0576${date ? ` &nbsp;—&nbsp; ${escapeHtml(date)}` : ""}</p>
    </header>
    <article class="pdf-content">${content}</article>
  </main>
</body>
</html>`;
  await fs.writeFile(renderFile, html, "utf8");
  return { article, slug, title, renderFile };
};

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relativePath = pathname.startsWith("/blog/") ? pathname.slice(6) : pathname.slice(1);
    const target = path.resolve(publicDirectory, relativePath);
    if (target !== publicDirectory && !target.startsWith(`${publicDirectory}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const stat = await fs.stat(target);
    const file = stat.isDirectory() ? path.join(target, "index.html") : target;
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(file).toLowerCase()] || "application/octet-stream" });
    fsSync.createReadStream(file).pipe(response);
  } catch (error) {
    console.warn(`Static asset not found: ${request.url} (${error.message})`);
    response.writeHead(404).end("Not found");
  }
});

await fs.rm(outputDirectory, { recursive: true, force: true });
await fs.rm(renderDirectory, { recursive: true, force: true });
await fs.mkdir(outputDirectory, { recursive: true });
await fs.mkdir(renderDirectory, { recursive: true });
const documents = await Promise.all(articles.map(buildDocument));

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const port = typeof address === "object" && address ? address.port : 0;
const browser = await puppeteer.launch({
  executablePath: chromeExecutable,
  headless: true,
  args: ["--disable-dev-shm-usage", "--no-sandbox"],
});

try {
  const page = await browser.newPage();
  page.on("requestfailed", (request) => {
    console.warn(`Browser request failed: ${request.url()} (${request.failure()?.errorText || "unknown error"})`);
  });
  await page.setViewport({ width: 1280, height: 960, deviceScaleFactor: 1 });
  for (const document of documents) {
    console.log(`Rendering ${document.title}...`);
    const renderUrl = `http://127.0.0.1:${port}/blog/.course-pdf-render/${encodeURIComponent(document.slug)}.html`;
    const renderHtml = await fs.readFile(document.renderFile, "utf8");
    await fs.writeFile(document.renderFile, renderHtml.replace("__PORT__", String(port)), "utf8");
    await page.goto(renderUrl, { waitUntil: "load", timeout: 30000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images).map((image) =>
          image.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              }),
        ),
      );
    });
    const outputFile = path.join(outputDirectory, `${document.slug}.pdf`);
    await page.pdf({
      path: outputFile,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="box-sizing:border-box;color:#6b7280;font-family:Arial,sans-serif;font-size:8px;padding:0 16mm;text-align:right;width:100%"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
      margin: { top: "15mm", right: "16mm", bottom: "18mm", left: "16mm" },
      preferCSSPageSize: true,
    });
    const size = (await fs.stat(outputFile)).size;
    console.log(`Generated ${path.relative(projectDirectory, outputFile)} (${Math.round(size / 1024)} KB)`);
  }
} finally {
  await browser.close();
  server.close();
  await fs.rm(renderDirectory, { recursive: true, force: true });
}
