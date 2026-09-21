(function () {
  "use strict";

  const COURSES = [
    "Mathematical Modeling",
    "COMS4776W Neural Networks & Deep Learning",
    "COMS6998E LLM-Based Generative AI",
    "COMS W4111 Introduction to Databases",
    "EECS182 Deep Neural Networks",
    "MATH113 Introduction to Abstract Algebra",
    "CS182 Machine Learning",
    "Math113-Abstract Algebra",
  ];
  const PAGE_SIZE = 500;
  let bookmarks = [];
  let catalog = new Map();
  let groupBy = "date";
  let timeOrder = "newest";
  let search = "";
  let loadedUserId = null;
  let requestId = 0;

  const reader = () => window.__blogReadingHistory;
  const mount = () => document.querySelector("#blog-bookmarks-library");
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const safePostPath = (value) => {
    try {
      const url = new URL(value, location.origin);
      if (url.origin === location.origin && /^\/blog\/\d{4}\/\d{2}\/\d{2}\//.test(url.pathname)) return url.pathname;
    } catch (_error) { /* Invalid saved path. */ }
    return "/blog/";
  };
  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-US", {
      year: "numeric", month: "short", day: "numeric",
    }).format(date);
  };
  const courseFor = (item) => {
    const post = catalog.get(safePostPath(item.post_path));
    const categories = (post?.categories || []).filter((name) => name !== "Mathematical Modeling Draft Archive");
    return categories.find((name) => COURSES.includes(name)) || categories[0] || "Other Articles";
  };
  const fragment = (item) => item.content_html && window.DOMPurify
    ? `<div class="blog-bookmarks-fragment article-content markdown-body">${DOMPurify.sanitize(item.content_html, {
      ADD_TAGS: ["mjx-container"], ADD_ATTR: ["jax", "display"],
    })}</div>`
    : `<blockquote>${escapeHtml(item.quote_text)}</blockquote>`;

  const card = (item) => {
    const href = `${safePostPath(item.post_path)}?bookmark=${encodeURIComponent(item.id)}`;
    return `<article class="blog-bookmarks-card" data-bookmark-id="${escapeHtml(item.id)}">
      <div class="blog-bookmarks-card-meta"><span>${escapeHtml(courseFor(item))}</span><time datetime="${escapeHtml(item.created_at)}">${escapeHtml(formatDate(item.created_at))}</time></div>
      <h3>${escapeHtml(item.post_title)}</h3>
      ${item.chapter_title ? `<p class="blog-bookmarks-chapter">${escapeHtml(item.chapter_title)}</p>` : ""}
      <div class="blog-bookmarks-detail">${fragment(item)}</div>
      ${item.note_text ? `<div class="blog-bookmarks-note"><span><i class="fa-regular fa-pen-to-square" aria-hidden="true"></i> My note</span><p>${escapeHtml(item.note_text)}</p></div>` : ""}
      <div class="blog-bookmarks-actions">
        <button type="button" data-bookmark-edit="${escapeHtml(item.id)}">${item.note_text ? "Edit note" : "Add note"}</button>
        <a href="${escapeHtml(href)}">Open article <i class="fa-regular fa-arrow-up-right" aria-hidden="true"></i></a>
        <button type="button" class="blog-bookmarks-remove" data-bookmark-remove="${escapeHtml(item.id)}" aria-label="Remove bookmark from ${escapeHtml(item.post_title)}"><i class="fa-regular fa-trash-can" aria-hidden="true"></i></button>
      </div>
      <form class="blog-bookmarks-editor" data-bookmark-form="${escapeHtml(item.id)}" hidden>
        <label>My note<textarea maxlength="2000">${escapeHtml(item.note_text)}</textarea></label>
        <div><button type="submit">Save note</button><button type="button" data-bookmark-cancel>Cancel</button><span role="status"></span></div>
      </form>
      <div class="blog-bookmarks-confirm" hidden><span>Remove this bookmark?</span><button type="button" data-bookmark-confirm="${escapeHtml(item.id)}">Remove</button><button type="button" data-bookmark-keep>Keep</button><span role="status"></span></div>
    </article>`;
  };

  const renderResults = () => {
    const root = mount();
    if (!root) return;
    const api = reader();
    const available = bookmarks.filter((item) => !catalog.get(safePostPath(item.post_path))?.reviewLock
      || (api?.isDeveloper?.() && !api?.isRegularPreview?.()));
    const needle = search.trim().toLocaleLowerCase();
    const filtered = available.filter((item) => [item.post_title, item.chapter_title, item.quote_text, item.note_text, courseFor(item)]
      .some((value) => String(value || "").toLocaleLowerCase().includes(needle)));
    filtered.sort((a, b) => timeOrder === "oldest"
      ? new Date(a.created_at) - new Date(b.created_at)
      : new Date(b.created_at) - new Date(a.created_at));
    let cards;
    if (groupBy === "date") {
      cards = `<div class="blog-bookmarks-grid">${filtered.map(card).join("")}</div>`;
    } else {
      const groups = new Map();
      for (const item of filtered) {
        const label = groupBy === "course" ? courseFor(item) : item.post_title;
        if (!groups.has(label)) groups.set(label, []);
        groups.get(label).push(item);
      }
      cards = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([label, items]) =>
        `<section class="blog-bookmarks-group"><h2>${escapeHtml(label)} <span>${items.length}</span></h2><div class="blog-bookmarks-grid">${items.map(card).join("")}</div></section>`).join("");
    }
    root.querySelector("[data-bookmark-count]").textContent = `${filtered.length} of ${available.length} saved passage${available.length === 1 ? "" : "s"}`;
    root.querySelector("[data-bookmark-results]").innerHTML = filtered.length ? cards
      : `<div class="blog-bookmarks-empty">${available.length ? "No bookmarks match your search." : "No bookmarks yet. Open an article and use the bookmark button on the right."}</div>`;
  };

  const render = () => {
    const root = mount();
    if (!root) return;
    root.innerHTML = `<header class="blog-bookmarks-hero">
      <a href="/blog/learning/"><i class="fa-regular fa-arrow-left" aria-hidden="true"></i> My Learning</a>
      <p class="blog-bookmarks-eyebrow">PRIVATE STUDY SPACE</p><h1>My Bookmarks</h1>
      <p>Everything you saved, including your notes, images, and formulas. Only you can see this library.</p>
    </header>
    <div class="blog-bookmarks-toolbar">
      <label>Organize by<select data-bookmark-group><option value="date" ${groupBy === "date" ? "selected" : ""}>Date added</option><option value="article" ${groupBy === "article" ? "selected" : ""}>Article</option><option value="course" ${groupBy === "course" ? "selected" : ""}>Course</option></select></label>
      <label>Order<select data-bookmark-order><option value="newest" ${timeOrder === "newest" ? "selected" : ""}>Newest first</option><option value="oldest" ${timeOrder === "oldest" ? "selected" : ""}>Oldest first</option></select></label>
      <label class="blog-bookmarks-search">Search<input type="search" data-bookmark-search placeholder="Search passages or notes" value="${escapeHtml(search)}"></label>
    </div>
    <p class="blog-bookmarks-count" data-bookmark-count></p>
    <div data-bookmark-results></div>`;
    renderResults();
  };

  const load = async (force = false) => {
    const root = mount();
    if (!root) return;
    const request = ++requestId;
    const api = reader();
    if (!api?.getClient?.()) { root.innerHTML = '<div class="blog-bookmarks-empty">Loading your private library…</div>'; return; }
    const session = api.getSession();
    if (!session) {
      loadedUserId = null;
      bookmarks = [];
      root.innerHTML = '<div class="blog-bookmarks-auth"><i class="fa-brands fa-github" aria-hidden="true"></i><h1>My Bookmarks</h1><p>Sign in with GitHub to see your private saved passages and notes.</p><button type="button" data-bookmark-signin>Continue with GitHub</button></div>';
      return;
    }
    if (!force && loadedUserId === session.user.id) {
      return root.querySelector("[data-bookmark-results]") ? renderResults() : render();
    }
    root.innerHTML = '<div class="blog-bookmarks-empty">Loading your bookmarks…</div>';
    try {
      const response = await fetch("/blog/category-hub.json", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load the article catalog");
      catalog = new Map((await response.json()).map((post) => [safePostPath(post.path), post]));
      const rows = [];
      for (let start = 0; ; start += PAGE_SIZE) {
        const { data, error } = await api.getClient().from("article_bookmarks")
          .select("id,post_path,post_title,quote_text,chapter_title,content_html,note_text,created_at")
          .eq("user_id", session.user.id).order("created_at", { ascending: false })
          .range(start, start + PAGE_SIZE - 1);
        if (error) throw error;
        rows.push(...(data || []));
        if (!data || data.length < PAGE_SIZE) break;
      }
      if (request !== requestId || !root.isConnected || api.getSession()?.user?.id !== session.user.id) return;
      bookmarks = rows;
      loadedUserId = session.user.id;
      render();
    } catch (_error) {
      if (request === requestId && root.isConnected) root.innerHTML = '<div class="blog-bookmarks-empty">Your bookmarks could not be loaded. Please refresh and try again.</div>';
    }
  };

  document.addEventListener("change", (event) => {
    if (!event.target.closest("#blog-bookmarks-library")) return;
    if (event.target.matches("[data-bookmark-group]")) groupBy = event.target.value;
    else if (event.target.matches("[data-bookmark-order]")) timeOrder = event.target.value;
    else return;
    renderResults();
  });
  document.addEventListener("input", (event) => {
    if (!event.target.matches("#blog-bookmarks-library [data-bookmark-search]")) return;
    search = event.target.value;
    renderResults();
  });
  document.addEventListener("click", async (event) => {
    if (!event.target.closest("#blog-bookmarks-library")) return;
    if (event.target.closest("[data-bookmark-signin]")) return reader()?.signIn?.();
    const cardElement = event.target.closest("[data-bookmark-id]");
    if (!cardElement) return;
    const id = cardElement.dataset.bookmarkId;
    if (event.target.closest("[data-bookmark-edit]")) {
      const form = cardElement.querySelector("[data-bookmark-form]");
      form.hidden = false;
      form.querySelector("textarea").focus();
    }
    if (event.target.closest("[data-bookmark-cancel]")) cardElement.querySelector("[data-bookmark-form]").hidden = true;
    if (event.target.closest("[data-bookmark-remove]")) cardElement.querySelector(".blog-bookmarks-confirm").hidden = false;
    if (event.target.closest("[data-bookmark-keep]")) cardElement.querySelector(".blog-bookmarks-confirm").hidden = true;
    if (event.target.closest("[data-bookmark-confirm]")) {
      const api = reader();
      const session = api?.getSession?.();
      if (!session) return;
      const confirm = cardElement.querySelector(".blog-bookmarks-confirm");
      const button = confirm.querySelector("[data-bookmark-confirm]");
      button.disabled = true;
      let error;
      try {
        ({ error } = await api.getClient().from("article_bookmarks").delete()
          .eq("id", id).eq("user_id", session.user.id));
      } catch (_error) { error = _error; }
      if (error) {
        confirm.querySelector('[role="status"]').textContent = "Could not remove. Try again.";
        button.disabled = false;
      } else {
        bookmarks = bookmarks.filter((item) => item.id !== id);
        renderResults();
      }
    }
  });
  document.addEventListener("submit", async (event) => {
    const form = event.target.closest("#blog-bookmarks-library [data-bookmark-form]");
    if (!form) return;
    event.preventDefault();
    const api = reader();
    const session = api?.getSession?.();
    if (!session) return;
    const note = form.querySelector("textarea").value.trim();
    const id = form.dataset.bookmarkForm;
    const button = form.querySelector('[type="submit"]');
    const status = form.querySelector('[role="status"]');
    button.disabled = true;
    status.textContent = "Saving…";
    let data;
    let error;
    try {
      ({ data, error } = await api.getClient().from("article_bookmarks")
        .update({ note_text: note }).eq("id", id).eq("user_id", session.user.id).select("id"));
    } catch (_error) { error = _error; }
    button.disabled = false;
    if (error || !data?.length) { status.textContent = "Could not save. Please try again."; return; }
    const item = bookmarks.find((entry) => entry.id === id);
    if (item) item.note_text = note;
    renderResults();
  });

  document.addEventListener("blog-reader:state", () => load());
  document.addEventListener("blog-bookmarks:changed", () => load(true));
  document.addEventListener("swup:contentReplaced", () => load(true));
  document.addEventListener("swup:pageView", () => load(true));
  load();
})();
