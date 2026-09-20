(function () {
  "use strict";

  if (window.__blogBookmarks) {
    window.__blogBookmarks.refreshPage();
    return;
  }

  const TABLE = "article_bookmarks";
  const MAX_QUOTE = 5000;
  const ignored = ".blog-bookmark-control, .blog-reader-plan-control, .blog-reader-chapter-checkpoint, .mm-protected-article, .mm-development-preview, .mjx-assistive-mml, script, style, button, textarea, input";
  let content = null;
  let control = null;
  let selecting = false;
  let selected = null;
  let saving = false;
  let revealedElement = null;
  let revealVersion = 0;

  const reader = () => window.__blogReadingHistory;
  const articlePath = () => /^\/blog\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/$/.test(window.location.pathname)
    ? window.location.pathname : null;

  const textNodes = (root) => {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest(ignored) || !node.textContent
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  };

  const selectedPassage = () => {
    const selection = window.getSelection();
    if (!content || !selection || selection.isCollapsed || !selection.rangeCount) return null;
    const range = selection.getRangeAt(0);
    if (!content.contains(range.startContainer) || !content.contains(range.endContainer)) return null;
    const nodes = textNodes(content);
    let start = null;
    let end = null;
    let offset = 0;
    let quote = "";
    for (const node of nodes) {
      const length = node.textContent.length;
      if (range.intersectsNode(node)) {
        const from = node === range.startContainer ? range.startOffset : 0;
        const to = node === range.endContainer ? range.endOffset : length;
        if (to > from) {
          if (start === null) start = offset + from;
          end = offset + to;
          quote += node.textContent.slice(from, to);
        }
      }
      offset += length;
    }
    if (start === null || end === null || !quote.trim()) return null;
    const precedingHeading = Array.from(content.querySelectorAll("h2, h3, h4"))
      .filter((heading) => heading.compareDocumentPosition(range.startContainer) & Node.DOCUMENT_POSITION_FOLLOWING)
      .at(-1);
    return {
      quote_text: quote.trim(),
      chapter_title: (precedingHeading?.textContent || "").trim().slice(0, 200),
      start_offset: start,
      end_offset: end,
    };
  };

  const renderControl = (message = "") => {
    if (!control) return;
    const button = control.querySelector("button");
    const hint = control.querySelector(".blog-bookmark-hint");
    const signedIn = Boolean(reader()?.getSession?.());
    button.disabled = saving;
    button.setAttribute("aria-pressed", String(selecting));
    button.innerHTML = `<i class="${selecting && selected ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}" aria-hidden="true"></i><span>${saving ? "Saving…" : selecting && selected ? "Save Selection" : selecting ? "Cancel Selection" : "Bookmark Passage"}</span>`;
    control.classList.toggle("is-selecting", selecting);
    hint.textContent = message || (selecting
      ? selected ? `Selected ${selected.quote_text.length} characters. Click Save Selection.` : "Drag across the text you want to save, then use this button again. Esc cancels."
      : signedIn ? "Save a passage to revisit it in My Learning." : "Sign in with GitHub to sync saved passages across devices.");
  };

  const saveSelection = async () => {
    const api = reader();
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    if (!session || !client || !selected || !articlePath()) return;
    if (!api.getSyncEnabled?.()) {
      renderControl("Turn on Sync Reading Progress in Reading History to save passages.");
      return;
    }
    if (selected.quote_text.length > MAX_QUOTE) {
      renderControl("This selection is too long. Please choose a passage under 5,000 characters.");
      return;
    }
    saving = true;
    renderControl();
    const path = articlePath();
    const title = document.querySelector("h1.article-title-cover")?.textContent.trim()
      || document.querySelector(".article-title h1")?.textContent.trim()
      || document.title;
    const { error } = await client.from(TABLE).insert({
      user_id: session.user.id,
      post_path: path,
      post_title: title.slice(0, 300),
      ...selected,
    });
    saving = false;
    if (error) {
      renderControl(error.code === "23505" ? "This passage is already saved." : "Could not save this passage. Please try again.");
      return;
    }
    selecting = false;
    selected = null;
    window.getSelection()?.removeAllRanges();
    renderControl("Saved. Find this passage in My Learning → Saved Passages.");
    document.dispatchEvent(new Event("blog-bookmarks:changed"));
  };

  const rangeAt = (root, start, end) => {
    const nodes = textNodes(root);
    const range = document.createRange();
    let cursor = 0;
    let started = false;
    for (const node of nodes) {
      const next = cursor + node.textContent.length;
      if (!started && start < next) {
        range.setStart(node, start - cursor);
        started = true;
      }
      if (started && end <= next) {
        range.setEnd(node, end - cursor);
        return range;
      }
      cursor = next;
    }
    return null;
  };

  const revealSavedPassage = async () => {
    const id = new URLSearchParams(window.location.search).get("bookmark");
    if (!content || !id || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(id)) return;
    const version = ++revealVersion;
    const api = reader();
    if (!api?.getSession?.() || !api?.getClient?.()) return;
    const { data, error } = await api.getClient().from(TABLE)
      .select("post_path,quote_text,chapter_title,start_offset,end_offset")
      .eq("id", id).maybeSingle();
    if (version !== revealVersion || error || !data || data.post_path !== articlePath() || !content) return;
    const nodes = textNodes(content);
    const fullText = nodes.map((node) => node.textContent).join("");
    let start = data.start_offset;
    let end = data.end_offset;
    if (fullText.slice(start, end).trim() !== data.quote_text) {
      let match = fullText.indexOf(data.quote_text);
      if (match >= 0) {
        let next = fullText.indexOf(data.quote_text, match + 1);
        while (next >= 0) {
          if (Math.abs(next - start) < Math.abs(match - start)) match = next;
          next = fullText.indexOf(data.quote_text, next + 1);
        }
      }
      if (match >= 0) {
        start = match;
        end = match + data.quote_text.length;
      } else {
        const heading = Array.from(content.querySelectorAll("h2, h3, h4"))
          .find((item) => item.textContent.trim() === data.chapter_title);
        heading?.scrollIntoView({ behavior: "smooth", block: "center" });
        renderControl("The article changed, so this saved passage could not be highlighted. Its text is still in My Learning.");
        return;
      }
    }
    const range = rangeAt(content, start, end);
    if (!range) return;
    revealedElement?.classList.remove("blog-bookmark-revealed");
    revealedElement = range.startContainer.parentElement?.closest("p, li, blockquote, figure, h2, h3, h4");
    revealedElement?.classList.add("blog-bookmark-revealed");
    if (window.CSS?.highlights && window.Highlight) {
      CSS.highlights.set("saved-passage", new Highlight(range));
    }
    range.startContainer.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    renderControl("This is the passage you saved in My Learning.");
  };

  const refreshPage = () => {
    revealVersion += 1;
    revealedElement?.classList.remove("blog-bookmark-revealed");
    revealedElement = null;
    window.CSS?.highlights?.delete("saved-passage");
    control?.remove();
    control = null;
    content = null;
    selecting = false;
    selected = null;
    const path = articlePath();
    const article = document.querySelector(".article-content.markdown-body");
    if (!path || !article || article.querySelector(".mm-protected-article, .mm-development-preview")) return;
    content = article;
    control = document.createElement("div");
    control.className = "blog-bookmark-control";
    control.innerHTML = `<button type="button" aria-pressed="false"></button><span class="blog-bookmark-hint" role="status"></span>`;
    const plan = content.querySelector(":scope > .blog-reader-plan-control");
    if (plan) plan.insertAdjacentElement("afterend", control);
    else content.insertBefore(control, content.firstChild);
    renderControl();
    if (new URLSearchParams(window.location.search).has("bookmark")) {
      window.setTimeout(revealSavedPassage, 350);
    }
  };

  document.addEventListener("click", (event) => {
    if (!control || !event.target.closest(".blog-bookmark-control button")) return;
    if (!reader()?.getClient?.()) {
      renderControl("The account service is unavailable right now. Please try again later.");
      return;
    }
    if (!reader()?.getSession?.()) {
      reader()?.signIn?.();
      return;
    }
    if (saving) return;
    if (!selecting) {
      selecting = true;
      selected = selectedPassage();
      renderControl();
    } else if (selected) {
      saveSelection();
    } else {
      selecting = false;
      renderControl();
    }
  });
  document.addEventListener("selectionchange", () => {
    if (!selecting || !content) return;
    const passage = selectedPassage();
    if (passage) {
      selected = passage;
      renderControl();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !selecting) return;
    selecting = false;
    selected = null;
    renderControl();
  });
  document.addEventListener("blog-reader:state", refreshPage);
  document.addEventListener("modeling:article-loaded", refreshPage);
  document.addEventListener("swup:contentReplaced", refreshPage);
  document.addEventListener("swup:pageView", refreshPage);

  window.__blogBookmarks = { refreshPage };
  refreshPage();
})();
