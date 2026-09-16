(function () {
  "use strict";

  const englishPath = "/blog/2026/09/14/Mathematical-Modeling-01-From-Reality-to-a-Model/";
  const chinesePath = "/blog/2026/09/14/Mathematical-Modeling-01-From-Reality-to-a-Model-zh/";
  const restoreKey = "modeling-1-language-position";

  const articlePosition = () => {
    const article = document.querySelector(".article-content.markdown-body");
    if (!article) return 0;
    const top = window.scrollY + article.getBoundingClientRect().top;
    return Math.max(0, Math.min(1, (window.scrollY - top) / Math.max(1, article.scrollHeight)));
  };

  const restorePosition = () => {
    const raw = sessionStorage.getItem(restoreKey);
    if (!raw) return;
    let saved;
    try {
      saved = JSON.parse(raw);
    } catch (_error) {
      sessionStorage.removeItem(restoreKey);
      return;
    }
    if (saved.path !== window.location.pathname) return;
    sessionStorage.removeItem(restoreKey);
    const article = document.querySelector(".article-content.markdown-body");
    if (!article) return;
    const position = Math.max(0, Math.min(1, Number(saved.position) || 0));
    const scrollToPosition = () => {
      const top = window.scrollY + article.getBoundingClientRect().top;
      window.scrollTo({ top: Math.max(0, top + position * article.scrollHeight), behavior: "instant" });
    };
    scrollToPosition();
    window.setTimeout(scrollToPosition, 450);
  };

  const refresh = () => {
    document.querySelector(".mm-language-tool")?.remove();
    const current = window.location.pathname;
    if (current !== englishPath && current !== chinesePath) return;
    const list = document.querySelector(".hidden-tools-list");
    if (!list) return;
    const item = document.createElement("li");
    item.className = "right-bottom-tools mm-language-tool flex justify-center items-center";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mm-language-button";
    const isEnglish = current === englishPath;
    const target = isEnglish ? chinesePath : englishPath;
    button.textContent = isEnglish ? "中文" : "EN";
    button.title = isEnglish ? "Switch to Chinese / 切换到中文" : "Switch to English / 切换到英文";
    button.setAttribute("aria-label", button.title);
    button.addEventListener("click", () => {
      sessionStorage.setItem(restoreKey, JSON.stringify({ path: target, position: articlePosition() }));
      window.location.assign(target);
    });
    item.appendChild(button);
    const modeToggle = list.querySelector(".tool-dark-light-toggle");
    if (modeToggle) modeToggle.insertAdjacentElement("afterend", item);
    else list.prepend(item);
  };

  document.addEventListener("DOMContentLoaded", refresh);
  window.addEventListener("load", restorePosition);
  document.addEventListener("swup:contentReplaced", refresh);
  document.addEventListener("swup:pageView", refresh);
  if (document.readyState !== "loading") refresh();
})();
