(function () {
  "use strict";

  const COURSE_CATEGORY_PATHS = new Set([
    "/blog/categories/Deep-Learning/",
    "/blog/categories/LLM-Generative-AI/",
    "/blog/categories/Computational-Aspects-of-Robotics/",
  ]);

  const pdfPathForArticle = () => {
    const match = window.location.pathname.match(/^\/blog\/\d{4}\/\d{2}\/\d{2}\/([^/]+)\/?$/);
    return match ? `/blog/pdfs/${encodeURIComponent(decodeURIComponent(match[1]))}.pdf` : "";
  };

  const isCourseArticle = () =>
    Array.from(document.querySelectorAll('.article-meta-info .article-categories a[href*="/blog/categories/"]'))
      .some((link) => {
        try {
          return COURSE_CATEGORY_PATHS.has(new URL(link.href, window.location.origin).pathname);
        } catch (_error) {
          return false;
        }
      });

  const refresh = () => {
    document.querySelectorAll(".course-pdf-toolbar").forEach((element) => element.remove());
    const pdfPath = pdfPathForArticle();
    const articleHeader = document.querySelector(".article-content-container > .article-header");
    if (!pdfPath || !articleHeader || !isCourseArticle()) return;

    const toolbar = document.createElement("section");
    toolbar.className = "course-pdf-toolbar";
    toolbar.setAttribute("aria-label", "PDF study handout");
    toolbar.innerHTML = `
      <div class="course-pdf-toolbar-copy">
        <i class="fa-regular fa-file-pdf" aria-hidden="true"></i>
        <span><strong>Review handout</strong><small>Clean A4 notes with formulas and essential figures</small></span>
      </div>
      <a class="course-pdf-download" href="${pdfPath}" download>
        <i class="fa-regular fa-download" aria-hidden="true"></i><span>Export PDF</span>
      </a>`;
    articleHeader.insertAdjacentElement("afterend", toolbar);
  };

  document.addEventListener("DOMContentLoaded", refresh);
  document.addEventListener("swup:contentReplaced", refresh);
  document.addEventListener("swup:page:view", refresh);
  window.addEventListener("popstate", () => window.setTimeout(refresh, 0));
  window.__coursePdfExportRefresh = refresh;
})();
