(function () {
  "use strict";

  if (window.__modelingCallouts?.refresh) {
    window.__modelingCallouts.refresh();
    return;
  }

  const modelingPost = /^\/blog\/2026\/09\/(?:14|15)\/Mathematical-Modeling-\d{2}-/;
  const refresh = () => {
    if (!modelingPost.test(window.location.pathname)) return;
    const isChinese = /-zh\/$/.test(window.location.pathname);
    const content = document.querySelector(".article-content.markdown-body");
    if (!content || content.querySelector('[data-modeling-protected="true"]')) return;

    content.querySelectorAll("p").forEach((paragraph) => {
      if (paragraph.closest(".mm-key-box, .mm-question-box, blockquote, figure")) return;
      const question = Array.from(paragraph.querySelectorAll("strong")).find((strong) => {
        const text = strong.textContent.trim();
        return text.length >= (isChinese ? 4 : 12) && /[?？]$/.test(text);
      });
      if (!question) return;
      const box = document.createElement("aside");
      box.className = "mm-question-box";
      box.setAttribute("aria-label", isChinese ? "值得先想的问题" : "Question to think about");
      const label = document.createElement("span");
      label.className = "mm-callout-label";
      label.textContent = isChinese ? "先想一想" : "Pause and think";
      paragraph.replaceWith(box);
      box.append(label, paragraph);
    });
  };

  document.addEventListener("modeling:article-loaded", refresh);
  document.addEventListener("swup:contentReplaced", refresh);
  document.addEventListener("swup:pageView", refresh);
  window.__modelingCallouts = { refresh };
  refresh();
})();
