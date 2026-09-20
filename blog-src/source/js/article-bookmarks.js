(function () {
  "use strict";
  if (window.__blogBookmarks) {
    window.__blogBookmarks.refreshPage();
    return;
  }

  const TABLE = "article_bookmarks";
  const MAX_HTML = 300000;
  const MAX_NOTE = 2000;
  const MAX_BLOCKS = 25;
  const ignored = ".blog-reader-plan-control, .blog-reader-chapter-checkpoint, .mm-protected-article, .mm-development-preview, script, style";
  const cleanOptions = { ADD_TAGS: ["mjx-container"], ADD_ATTR: ["jax", "display"] };
  let content = null;
  let control = null;
  let selecting = false;
  let startBlock = null;
  let endBlock = null;
  let selectedRange = null;
  let saving = false;
  let revealVersion = 0;
  let skipClick = false;

  const reader = () => window.__blogReadingHistory;
  const articlePath = () => /^\/blog\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/$/.test(location.pathname)
    ? location.pathname : null;
  const blocks = () => content ? Array.from(content.children).filter((element) => !element.matches(ignored)) : [];
  const blockFor = (node) => {
    let element = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
    while (element && element.parentElement !== content) element = element.parentElement;
    return element?.parentElement === content ? element : null;
  };
  const clearMarks = () => {
    content?.querySelectorAll(".blog-bookmark-selected, .blog-bookmark-revealed")
      .forEach((element) => element.classList.remove("blog-bookmark-selected", "blog-bookmark-revealed"));
    window.CSS?.highlights?.delete("saved-passage");
  };
  const selectedBlocks = () => {
    if (startBlock === null) return [];
    return blocks().slice(Math.min(startBlock, endBlock ?? startBlock), Math.max(startBlock, endBlock ?? startBlock) + 1);
  };
  const markSelection = () => {
    content?.querySelectorAll(".blog-bookmark-selected").forEach((element) => element.classList.remove("blog-bookmark-selected"));
    selectedBlocks().forEach((element) => element.classList.add("blog-bookmark-selected"));
  };
  const describe = (elements) => elements.map((element) => {
    const text = element.textContent?.trim() || "";
    const images = Array.from(element.querySelectorAll("img"))
      .map((image) => `[Image: ${image.alt?.trim() || "image"}]`);
    const formulas = element.querySelectorAll("mjx-container").length;
    return [text, ...images, ...(!text && formulas ? [`[${formulas} formula${formulas === 1 ? "" : "s"}]`] : [])]
      .filter(Boolean).join(" ");
  }).filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

  const renderControl = (message = "") => {
    if (!control) return;
    const trigger = control.querySelector("[data-bookmark-toggle]");
    const panel = control.querySelector("[data-bookmark-panel]");
    const toast = control.querySelector("[data-bookmark-toast]");
    trigger.setAttribute("aria-expanded", String(selecting));
    trigger.title = selecting ? "Close bookmark tool" : "Bookmark a passage";
    panel.hidden = !selecting;
    toast.hidden = selecting || !message;
    toast.textContent = !selecting ? message : "";
    control.querySelector("[data-bookmark-save]").disabled = saving || startBlock === null;
    control.querySelector("[data-bookmark-preview]").textContent = startBlock === null
      ? "" : describe(selectedBlocks()).slice(0, 280) || "Image or formula";
    const count = selectedBlocks().length;
    control.querySelector("[data-bookmark-status]").textContent = message || (startBlock === null
      ? "Click the first content block, then the last. Or drag-select text. Images and formulas can be selected by clicking them."
      : endBlock === null ? "Start chosen. Click the last block, or save this block."
        : `${count} content block${count === 1 ? "" : "s"} selected. Add a note if you like, then save.`);
  };
  const choose = (first, last = null) => {
    startBlock = first;
    endBlock = last;
    selectedRange = null;
    markSelection();
    renderControl();
  };
  const captureTextSelection = () => {
    const selection = getSelection();
    if (!selecting || !content || !selection?.rangeCount || selection.isCollapsed) return false;
    const range = selection.getRangeAt(0);
    if (!content.contains(range.startContainer) || !content.contains(range.endContainer)) return false;
    const all = blocks();
    const first = all.indexOf(blockFor(range.startContainer));
    const last = all.indexOf(blockFor(range.endContainer));
    if (first < 0 || last < 0) return false;
    choose(first, last);
    selectedRange = range.cloneRange();
    return true;
  };

  const fragmentHtml = (elements) => {
    if (!window.DOMPurify) return null;
    const copies = selectedRange ? [selectedRange.cloneContents()] : elements.map((element) => element.cloneNode(true));
    return copies.map((copy) => {
      const wrapper = document.createElement("div");
      wrapper.append(copy);
      wrapper.querySelectorAll(".blog-reader-chapter-checkpoint, script, style").forEach((item) => item.remove());
      wrapper.querySelectorAll(".blog-bookmark-selected, .blog-bookmark-revealed")
        .forEach((item) => item.classList.remove("blog-bookmark-selected", "blog-bookmark-revealed"));
      wrapper.querySelectorAll("img").forEach((image) => {
        const source = image.dataset.src || image.getAttribute("src");
        if (source) image.setAttribute("src", new URL(source, location.href).href);
        image.removeAttribute("srcset");
        image.removeAttribute("data-src");
        image.removeAttribute("lazyload");
        image.removeAttribute("loading");
      });
      wrapper.querySelectorAll("a[href]").forEach((link) => {
        link.setAttribute("href", new URL(link.getAttribute("href"), location.href).href);
      });
      return DOMPurify.sanitize(wrapper.innerHTML, cleanOptions);
    }).join("");
  };

  const saveSelection = async () => {
    const api = reader();
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    if (saving || !session || !client || !content || startBlock === null || !articlePath()) return;
    if (!api.getSyncEnabled?.()) return renderControl("Turn on Sync Reading Progress in Reading History to save passages.");
    const all = blocks();
    const first = Math.min(startBlock, endBlock ?? startBlock);
    const last = Math.max(startBlock, endBlock ?? startBlock);
    const elements = all.slice(first, last + 1);
    if (!elements.length || elements.length > MAX_BLOCKS) return renderControl(`Choose at most ${MAX_BLOCKS} content blocks per bookmark.`);
    const html = fragmentHtml(elements);
    if (!html) return renderControl("The safe content renderer is unavailable. Please reload and try again.");
    if (html.length > MAX_HTML) return renderControl("This passage contains too many large formulas. Choose a shorter range.");
    const note = control.querySelector("[data-bookmark-note]").value.trim();
    if (note.length > MAX_NOTE) return renderControl(`Keep your note under ${MAX_NOTE} characters.`);
    const heading = all.slice(0, first + 1).filter((item) => /^H[234]$/.test(item.tagName)).at(-1);
    let before = all.slice(0, first).reduce((sum, element) => sum + (element.textContent?.length || 0), 0);
    let after = before + elements.reduce((sum, element) => sum + (element.textContent?.length || 0), 0);
    if (selectedRange) {
      let cursor = 0;
      for (const node of textNodes(content)) {
        if (node === selectedRange.startContainer) before = cursor + selectedRange.startOffset;
        if (node === selectedRange.endContainer) after = cursor + selectedRange.endOffset;
        cursor += node.textContent.length;
      }
    }
    if (after === before) {
      before = 1000000 + first * 1000;
      after = 1000001 + last * 1000;
    }
    const title = document.querySelector("h1.article-title-cover")?.textContent.trim()
      || document.querySelector(".article-title h1")?.textContent.trim() || document.title;
    saving = true;
    renderControl("Saving your passage…");
    let error;
    try {
      ({ error } = await client.from(TABLE).insert({
        user_id: session.user.id,
        post_path: articlePath(),
        post_title: title.slice(0, 300),
        quote_text: (selectedRange?.toString().trim() || describe(elements) || "Saved article content").slice(0, 5000),
        chapter_title: (heading?.textContent || "").trim().slice(0, 200),
        start_offset: before,
        end_offset: Math.max(before + 1, after),
        start_block: first,
        end_block: last,
        content_html: html,
        note_text: note,
      }));
    } catch (_error) {
      error = _error;
    }
    saving = false;
    if (!control) return;
    if (error) return renderControl(error.code === "23505" ? "This range is already saved." : "Could not save. Please try again.");
    selecting = false;
    startBlock = null;
    endBlock = null;
    selectedRange = null;
    clearMarks();
    getSelection()?.removeAllRanges();
    control.querySelector("[data-bookmark-note]").value = "";
    renderControl("Saved. Open My Learning → Saved Passages to revisit it.");
    document.dispatchEvent(new Event("blog-bookmarks:changed"));
  };

  // Old text-only bookmarks still use character offsets. New bookmarks use content-block positions.
  const textNodes = (root) => {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest(`${ignored}, .mjx-assistive-mml, button, textarea, input`) || !node.textContent
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  };
  const rangeAt = (root, start, end) => {
    const range = document.createRange();
    let cursor = 0;
    let started = false;
    for (const node of textNodes(root)) {
      const next = cursor + node.textContent.length;
      if (!started && start < next) { range.setStart(node, start - cursor); started = true; }
      if (started && end <= next) { range.setEnd(node, end - cursor); return range; }
      cursor = next;
    }
    return null;
  };
  const revealSavedPassage = async () => {
    const id = new URLSearchParams(location.search).get("bookmark");
    if (!content || !id || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(id)) return;
    const version = ++revealVersion;
    const api = reader();
    if (!api?.getSession?.() || !api?.getClient?.()) return;
    const { data, error } = await api.getClient().from(TABLE)
      .select("post_path,quote_text,chapter_title,start_offset,end_offset,start_block,end_block")
      .eq("id", id).maybeSingle();
    if (version !== revealVersion || error || !data || data.post_path !== articlePath() || !content) return;
    clearMarks();
    if (Number.isInteger(data.start_block) && Number.isInteger(data.end_block)) {
      const selected = blocks().slice(data.start_block, data.end_block + 1);
      const expected = data.quote_text.replace(/\s+/g, " ").trim().slice(0, 80);
      if (!selected.length || (expected && !describe(selected).includes(expected))) {
        Array.from(content.querySelectorAll("h2, h3, h4"))
          .find((item) => item.textContent.trim() === data.chapter_title)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        return renderControl("The article changed; your saved copy is still in My Learning.");
      }
      selected.forEach((element) => element.classList.add("blog-bookmark-revealed"));
      selected[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
      renderControl(selected.length ? "This is the section you saved in My Learning." : "The article changed; your saved copy is still in My Learning.");
      return;
    }
    const fullText = textNodes(content).map((node) => node.textContent).join("");
    let { start_offset: start, end_offset: end } = data;
    if (fullText.slice(start, end).trim() !== data.quote_text) {
      const match = fullText.indexOf(data.quote_text);
      if (match < 0) {
        Array.from(content.querySelectorAll("h2, h3, h4"))
          .find((item) => item.textContent.trim() === data.chapter_title)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        return renderControl("The article changed; your saved text is still in My Learning.");
      }
      start = match;
      end = match + data.quote_text.length;
    }
    const range = rangeAt(content, start, end);
    if (!range) return;
    const element = range.startContainer.parentElement?.closest("p, li, blockquote, figure, h2, h3, h4");
    element?.classList.add("blog-bookmark-revealed");
    if (window.CSS?.highlights && window.Highlight) CSS.highlights.set("saved-passage", new Highlight(range));
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    renderControl("This is the passage you saved in My Learning.");
  };
  const refreshPage = () => {
    revealVersion += 1;
    clearMarks();
    control?.remove();
    control = null;
    content = null;
    selecting = false;
    startBlock = null;
    endBlock = null;
    selectedRange = null;
    const article = document.querySelector(".article-content.markdown-body");
    if (!articlePath() || !article || article.querySelector(".mm-protected-article, .mm-development-preview")) return;
    content = article;
    control = document.createElement("div");
    control.className = "blog-bookmark-control";
    control.innerHTML = `<button type="button" class="blog-bookmark-trigger" data-bookmark-toggle aria-label="Bookmark a passage" aria-expanded="false" title="Bookmark a passage"><i class="fa-regular fa-bookmark" aria-hidden="true"></i></button>
      <span class="blog-bookmark-toast" data-bookmark-toast role="status" hidden></span>
      <div class="blog-bookmark-panel" data-bookmark-panel hidden>
        <strong>Save a passage</strong>
        <p data-bookmark-status role="status"></p>
        <div class="blog-bookmark-preview" data-bookmark-preview></div>
        <label for="blog-bookmark-note">Your note <span>(optional)</span></label>
        <textarea id="blog-bookmark-note" data-bookmark-note maxlength="${MAX_NOTE}" rows="3" placeholder="Why do you want to remember this?"></textarea>
        <div class="blog-bookmark-actions"><button type="button" data-bookmark-cancel>Cancel</button><button type="button" data-bookmark-save>Save to My Learning</button></div>
      </div>`;
    document.body.appendChild(control);
    renderControl();
    if (new URLSearchParams(location.search).has("bookmark")) setTimeout(revealSavedPassage, 350);
  };

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-bookmark-toggle]");
    if (toggle && control?.contains(toggle)) {
      if (!reader()?.getClient?.()) return renderControl("The account service is unavailable. Try again later.");
      if (!reader()?.getSession?.()) return reader()?.signIn?.();
      selecting = !selecting;
      if (selecting) captureTextSelection();
      else { startBlock = null; endBlock = null; selectedRange = null; markSelection(); }
      renderControl();
      return;
    }
    if (event.target.closest("[data-bookmark-save]") && control?.contains(event.target)) return void saveSelection();
    if (event.target.closest("[data-bookmark-cancel]") && control?.contains(event.target)) {
      selecting = false; startBlock = null; endBlock = null; selectedRange = null; markSelection(); renderControl(); return;
    }
    if (!selecting || !content || !content.contains(event.target)) return;
    if (event.target.closest("button, input, textarea, select, .blog-reader-chapter-checkpoint")) return;
    const element = blockFor(event.target);
    const index = blocks().indexOf(element);
    if (index < 0 || element.matches(ignored)) return;
    event.preventDefault();
    if (skipClick) { skipClick = false; return; }
    if (startBlock === null || endBlock !== null) choose(index);
    else choose(startBlock, index);
  });
  document.addEventListener("mouseup", (event) => {
    if (selecting && content?.contains(event.target) && captureTextSelection()) {
      skipClick = true;
      setTimeout(() => { skipClick = false; }, 0);
    }
  });
  document.addEventListener("touchend", (event) => {
    if (selecting && content?.contains(event.target)) setTimeout(captureTextSelection, 50);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !selecting) return;
    selecting = false; startBlock = null; endBlock = null; selectedRange = null; markSelection(); renderControl();
  });
  document.addEventListener("blog-reader:state", refreshPage);
  document.addEventListener("modeling:article-loaded", refreshPage);
  document.addEventListener("swup:contentReplaced", refreshPage);
  document.addEventListener("swup:pageView", refreshPage);
  window.__blogBookmarks = { refreshPage };
  refreshPage();
})();
