(function () {
  "use strict";

  const COURSE_CATEGORY_PATHS = new Set([
    "/blog/categories/COMS4776W-Neural-Networks-Deep-Learning/",
    "/blog/categories/COMS6998E-LLM-Based-Generative-AI/",
    "/blog/categories/COMS4773W-Computational-Aspects-of-Robotics/",
  ]);

  let titleBeforePrint = "";

  const isCourseArticle = () =>
    Array.from(document.querySelectorAll('.article-meta-info .article-categories a[href*="/blog/categories/"]'))
      .some((link) => {
        try {
          return COURSE_CATEGORY_PATHS.has(new URL(link.href, window.location.origin).pathname);
        } catch (_error) {
          return false;
        }
      });

  const loadArticleImages = async () => {
    const images = Array.from(document.querySelectorAll(".article-content img"));
    await Promise.all(images.map(async (image) => {
      const source = image.dataset.src;
      if (source) {
        image.src = source;
        image.removeAttribute("data-src");
        image.removeAttribute("lazyload");
        image.loading = "eager";
      }
      if (!image.complete || !image.naturalWidth) {
        await new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }
      if (typeof image.decode === "function") {
        await image.decode().catch(() => {});
      }
    }));
  };

  const refresh = () => {
    document.querySelectorAll(".course-pdf-toolbar").forEach((element) => element.remove());
    document.querySelectorAll(".course-print-header").forEach((element) => element.remove());
    const isArticlePath = /^\/blog\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/?$/.test(window.location.pathname);
    const articleContainer = document.querySelector(".article-content-container");
    const articleHeader = document.querySelector(".article-content-container > .article-header");
    if (!isArticlePath || !articleContainer || !articleHeader || !isCourseArticle()) return;

    const articleTitle = document.querySelector(".article-title h1")?.textContent?.trim() || "Course Notes";
    const courseName = Array.from(document.querySelectorAll('.article-meta-info .article-categories a[href*="/blog/categories/"]'))
      .find((link) => {
        try {
          return COURSE_CATEGORY_PATHS.has(new URL(link.href, window.location.origin).pathname);
        } catch (_error) {
          return false;
        }
      })?.textContent?.trim() || "Course Notes";
    const printHeader = document.createElement("header");
    printHeader.className = "course-print-header";
    printHeader.setAttribute("aria-hidden", "true");
    const printTitle = document.createElement("h1");
    printTitle.textContent = articleTitle;
    const printSubtitle = document.createElement("p");
    printSubtitle.className = "course-print-subtitle";
    printSubtitle.textContent = "Lecture Summary & Formula Quick-Reference Guide";
    const printMeta = document.createElement("p");
    printMeta.className = "course-print-meta";
    printMeta.textContent = `Course: ${courseName} - Gavin0576`;
    printHeader.append(printTitle, printSubtitle, printMeta);
    articleContainer.prepend(printHeader);

    const toolbar = document.createElement("section");
    toolbar.className = "course-pdf-toolbar";
    toolbar.setAttribute("aria-label", "Print study handout");
    toolbar.innerHTML = `
      <div class="course-pdf-toolbar-copy">
        <i class="fa-regular fa-file-pdf" aria-hidden="true"></i>
        <span><strong>Review handout</strong><small>Print the current article or save it as a clean A4 PDF</small></span>
      </div>
      <button class="course-pdf-download" type="button">
        <i class="fa-solid fa-print" aria-hidden="true"></i><span>Print / Save PDF</span>
      </button>`;
    toolbar.querySelector(".course-pdf-download").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const label = button.querySelector("span");
      button.disabled = true;
      if (label) label.textContent = "Preparing…";
      try {
        await loadArticleImages();
        await document.fonts?.ready;
        titleBeforePrint = document.title;
        const currentArticleTitle = document.querySelector(".article-title h1")?.textContent?.trim();
        if (currentArticleTitle) document.title = currentArticleTitle;
        document.body.classList.add("course-print-mode");
        document.body.classList.toggle(
          "course-print-robotics",
          window.location.pathname.includes("/Robotics-1-Rigid-Body-Transformations/"),
        );
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        window.print();
      } finally {
        button.disabled = false;
        if (label) label.textContent = "Print / Save PDF";
      }
    });
    articleHeader.insertAdjacentElement("afterend", toolbar);
  };

  window.addEventListener("afterprint", () => {
    document.body.classList.remove("course-print-mode", "course-print-robotics");
    if (titleBeforePrint) document.title = titleBeforePrint;
    titleBeforePrint = "";
  });

  document.addEventListener("DOMContentLoaded", refresh);
  document.addEventListener("swup:contentReplaced", refresh);
  document.addEventListener("swup:page:view", refresh);
  window.addEventListener("popstate", () => window.setTimeout(refresh, 0));
  window.__coursePdfExportRefresh = refresh;
})();
