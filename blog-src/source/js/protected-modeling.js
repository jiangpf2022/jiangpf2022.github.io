(function () {
  "use strict";

  if (window.__protectedModeling?.refresh) {
    window.__protectedModeling.refresh();
    return;
  }

  const protectedRoute = /^\/blog\/2026\/09\/(?:14|15)\/Mathematical-Modeling-(0[2-9]|1[0-9]|20)-[A-Za-z0-9-]+\/$/;
  // Remove a lesson number here only when its reviewed Markdown is published.
  const lockedLessons = new Set(["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]);
  const table = "protected_modeling_articles";
  const lockedViews = new WeakMap();
  let requestVersion = 0;
  let activeContent = null;

  const isProtected = (path) => {
    const match = protectedRoute.exec(path);
    return Boolean(match && lockedLessons.has(match[1]));
  };
  const reader = () => window.__blogReadingHistory;
  const canRead = () => Boolean(reader()?.isDeveloper?.() && !reader()?.isRegularPreview?.());

  const lockMarkup = `
    <h2>Lesson awaiting review</h2>
    <div class="mm-protected-article" data-modeling-protected="true">
      <div class="mm-lock-symbol" aria-hidden="true"><i class="fa-solid fa-lock"></i></div>
      <p class="mm-lock-eyebrow">AUTHOR REVIEW IN PROGRESS</p>
      <h3>This lesson is locked for now</h3>
      <p>The author is reviewing this lesson before publication. Please wait for it to unlock.</p>
    </div>`;

  const announceLoadError = (content) => {
    const message = content.querySelector(".mm-protected-article p:last-child");
    if (message) message.textContent = "This lesson could not be opened right now. Please try refreshing the page.";
  };

  const restoreLock = (content) => {
    const view = lockedViews.get(content);
    if (!view) return;
    content.innerHTML = view.content;
    delete content.dataset.modelingLoaded;
    document.body.classList.add("mm-locked-page");
    if (view.toc) view.toc.innerHTML = view.tocHtml;
    window.__articleTocToggle?.refresh?.();
    reader()?.refreshPage?.();
  };

  const decodeGzipBase64 = async (value) => {
    if (typeof DecompressionStream !== "function") {
      throw new Error("Gzip decompression is unavailable in this browser.");
    }
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).text();
  };

  const showDraft = async (content, path, version) => {
    const client = reader()?.getClient?.();
    if (!client) return;
    const { data, error } = await client
      .from(table)
      .select("content_html,toc_html")
      .eq("post_path", path)
      .single();
    if (version !== requestVersion || !canRead() || activeContent !== content) return;
    if (error || !data?.content_html) {
      if (path.startsWith("/blog/2026/09/15/")) {
        const message = content.querySelector(".mm-protected-article p:last-child");
        if (message) message.textContent = "The 20-lesson edition is being rewritten and will open after author review.";
      } else {
        announceLoadError(content);
      }
      return;
    }

    try {
      const html = await decodeGzipBase64(data.content_html);
      if (version !== requestVersion || !canRead() || activeContent !== content) return;
      content.innerHTML = html;
      content.dataset.modelingLoaded = "true";
      document.body.classList.remove("mm-locked-page");
      content.querySelectorAll("img[data-src]").forEach((image) => {
        image.src = image.dataset.src;
        image.loading = "lazy";
        image.removeAttribute("data-src");
      });
      const toc = lockedViews.get(content)?.toc;
      if (toc) toc.innerHTML = data.toc_html || "";
      window.__articleTocToggle?.refresh?.();
      reader()?.refreshPage?.();
      document.dispatchEvent(new CustomEvent("modeling:article-loaded", { detail: { path } }));
    } catch (_error) {
      restoreLock(content);
      announceLoadError(content);
    }
  };

  const decorateLinks = () => {
    document.querySelectorAll('a[href*="Mathematical-Modeling-"]').forEach((link) => {
      if (link.dataset.modelingLockDecorated || link.querySelector("img")) return;
      const path = new URL(link.href, window.location.origin).pathname;
      if (!isProtected(path) || !link.textContent.trim().startsWith("Mathematical Modeling ")) return;
      link.dataset.modelingLockDecorated = "true";
      link.classList.add("mm-locked-link");
      const badge = document.createElement("span");
      badge.className = "mm-lock-badge";
      badge.setAttribute("aria-label", "Awaiting author review");
      badge.title = "Awaiting author review";
      badge.innerHTML = '<i class="fa-solid fa-lock" aria-hidden="true"></i>';
      link.appendChild(badge);
    });
  };

  const refresh = () => {
    requestVersion += 1;
    decorateLinks();
    const path = window.location.pathname;
    const content = document.querySelector(".article-content.markdown-body");
    if (!isProtected(path) || !content) {
      activeContent = null;
      document.body.classList.remove("mm-locked-page");
      return;
    }
    activeContent = content;
    document.body.classList.toggle("mm-locked-page", content.dataset.modelingLoaded !== "true");
    if (!lockedViews.has(content)) {
      if (!content.querySelector('[data-modeling-protected="true"]')) {
        content.innerHTML = lockMarkup;
      }
      const toc = document.querySelector(".post-toc");
      lockedViews.set(content, { content: content.innerHTML, toc, tocHtml: toc?.innerHTML || "" });
    }
    if (!canRead()) {
      if (content.dataset.modelingLoaded === "true") restoreLock(content);
      return;
    }
    if (content.dataset.modelingLoaded !== "true") showDraft(content, path, requestVersion);
  };

  document.addEventListener("blog-reader:state", refresh);
  document.addEventListener("swup:contentReplaced", refresh);
  document.addEventListener("swup:pageView", refresh);
  const observer = new MutationObserver((changes) => {
    if (changes.some((change) => Array.from(change.addedNodes).some((node) => node.nodeType === 1))) {
      decorateLinks();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.__protectedModeling = { refresh };
  refresh();
})();
