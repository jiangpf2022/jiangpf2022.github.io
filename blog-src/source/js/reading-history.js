(function () {
  "use strict";

  const existing = window.__blogReadingHistory;
  if (existing && typeof existing.refreshPage === "function") {
    existing.refreshPage();
    return;
  }

  const config = window.blogReaderConfig || {};
  const state = {
    client: null,
    session: null,
    history: [],
    article: null,
    progress: 0,
    saving: false,
    loadingHistory: false,
    panelOpen: false,
    configured: Boolean(
      config.supabaseUrl &&
        config.supabasePublishableKey &&
        window.supabase &&
        typeof window.supabase.createClient === "function",
    ),
    syncEnabled: localStorage.getItem("blog-reader-sync-enabled") !== "false",
    error: "",
  };

  const incrementedPaths = new Set();
  let saveTimer = 0;
  let scrollFrame = 0;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("zh-CN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const safeAvatar = (value) => {
    if (typeof value !== "string") return "";
    return /^https:\/\/(avatars\.githubusercontent\.com|github\.com)\//.test(value)
      ? value
      : "";
  };

  const normalizePath = (value) => {
    try {
      const url = new URL(value, window.location.origin);
      return url.origin === window.location.origin && url.pathname.startsWith("/blog/")
        ? url.pathname
        : "/blog/";
    } catch (_error) {
      return "/blog/";
    }
  };

  const root = document.createElement("div");
  root.id = "blog-reader-root";
  root.innerHTML = `
    <button class="blog-reader-trigger" type="button" aria-label="打开个人阅读记录" aria-haspopup="dialog" aria-expanded="false">
      <span class="blog-reader-trigger-ring" aria-hidden="true"></span>
      <span class="blog-reader-trigger-icon" aria-hidden="true"><i class="fa-regular fa-clock-rotate-left"></i></span>
      <span class="blog-reader-trigger-status" aria-hidden="true"></span>
    </button>
    <div class="blog-reader-backdrop" hidden></div>
    <aside class="blog-reader-panel" role="dialog" aria-modal="true" aria-labelledby="blog-reader-title" aria-hidden="true">
      <header class="blog-reader-panel-header">
        <div>
          <p class="blog-reader-eyebrow">PERSONAL LIBRARY</p>
          <h2 id="blog-reader-title">阅读记录</h2>
        </div>
        <button class="blog-reader-close" type="button" aria-label="关闭阅读记录"><i class="fa-regular fa-xmark"></i></button>
      </header>
      <div class="blog-reader-panel-body" aria-live="polite"></div>
    </aside>
  `;
  document.body.appendChild(root);

  const trigger = root.querySelector(".blog-reader-trigger");
  const backdrop = root.querySelector(".blog-reader-backdrop");
  const panel = root.querySelector(".blog-reader-panel");
  const panelBody = root.querySelector(".blog-reader-panel-body");
  const closeButton = root.querySelector(".blog-reader-close");

  const profile = () => {
    const user = state.session?.user;
    const metadata = user?.user_metadata || {};
    return {
      name: metadata.user_name || metadata.preferred_username || metadata.name || "GitHub User",
      avatar: safeAvatar(metadata.avatar_url),
    };
  };

  const renderTrigger = () => {
    const icon = trigger.querySelector(".blog-reader-trigger-icon");
    const status = trigger.querySelector(".blog-reader-trigger-status");
    trigger.style.setProperty("--reader-progress", `${Math.round(state.progress * 360)}deg`);
    trigger.classList.toggle("is-signed-in", Boolean(state.session));
    trigger.classList.toggle("is-unconfigured", !state.configured);
    trigger.classList.toggle("is-saving", state.saving);

    const userProfile = profile();
    if (state.session && userProfile.avatar) {
      icon.innerHTML = `<img src="${escapeHtml(userProfile.avatar)}" alt="">`;
    } else {
      icon.innerHTML = '<i class="fa-regular fa-clock-rotate-left"></i>';
    }

    status.title = !state.configured
      ? "登录服务尚未连接"
      : state.session
        ? state.saving
          ? "正在同步"
          : "阅读记录已同步"
        : "尚未登录";
  };

  const renderHistory = () => {
    if (!state.session) return "";
    if (state.loadingHistory) {
      return '<div class="blog-reader-loading"><span></span><span></span><span></span></div>';
    }
    if (!state.history.length) {
      return `
        <div class="blog-reader-empty">
          <i class="fa-regular fa-book-open-reader"></i>
          <h3>还没有阅读记录</h3>
          <p>打开一篇文章并开始阅读后，它会出现在这里。</p>
        </div>
      `;
    }

    return `
      <div class="blog-reader-history-heading">
        <h3>最近阅读</h3>
        <span>${state.history.length} 篇</span>
      </div>
      <ol class="blog-reader-history-list">
        ${state.history
          .map((item) => {
            const progress = Math.max(0, Math.min(100, Number(item.progress) || 0));
            const label = item.completed ? "已读完" : `${progress}%`;
            return `
              <li class="blog-reader-history-item">
                <a href="${escapeHtml(normalizePath(item.post_path))}" data-reader-history-link data-reader-progress="${progress}">
                  <span class="blog-reader-history-title">${escapeHtml(item.post_title || item.post_path)}</span>
                  <span class="blog-reader-history-meta">
                    <span>${escapeHtml(formatDate(item.last_read_at))}</span>
                    <span>${escapeHtml(label)}</span>
                  </span>
                  <span class="blog-reader-history-progress" aria-label="阅读进度 ${progress}%">
                    <span style="width:${progress}%"></span>
                  </span>
                </a>
                <button type="button" data-reader-delete="${escapeHtml(item.id)}" aria-label="删除 ${escapeHtml(item.post_title || "该文章")} 的阅读记录">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </li>
            `;
          })
          .join("")}
      </ol>
    `;
  };

  const renderPanel = () => {
    if (!state.configured) {
      panelBody.innerHTML = `
        <div class="blog-reader-empty blog-reader-unavailable">
          <i class="fa-regular fa-cloud-slash"></i>
          <h3>账户服务正在配置</h3>
          <p>博客仍可正常阅读；完成连接后即可使用 GitHub 登录和跨设备同步。</p>
        </div>
      `;
      return;
    }

    if (!state.session) {
      panelBody.innerHTML = `
        <section class="blog-reader-signin">
          <div class="blog-reader-orbit" aria-hidden="true"><i class="fa-brands fa-github"></i></div>
          <h3>保存你的阅读进度</h3>
          <p>使用 GitHub 登录后，最近阅读、文章进度和完成状态会在你的设备之间同步。</p>
          <button class="blog-reader-primary" type="button" data-reader-action="signin">
            <i class="fa-brands fa-github"></i><span>使用 GitHub 登录</span>
          </button>
          <p class="blog-reader-privacy-note">登录即表示同意保存文章标题、地址、阅读进度和最近阅读时间。不会读取你的仓库内容。<a href="/blog/privacy/">隐私说明</a></p>
          ${state.error ? `<p class="blog-reader-error">${escapeHtml(state.error)}</p>` : ""}
        </section>
      `;
      return;
    }

    const userProfile = profile();
    panelBody.innerHTML = `
      <section class="blog-reader-account">
        <div class="blog-reader-profile">
          ${userProfile.avatar ? `<img src="${escapeHtml(userProfile.avatar)}" alt="">` : '<span><i class="fa-brands fa-github"></i></span>'}
          <div><p>Signed in with GitHub</p><h3>${escapeHtml(userProfile.name)}</h3></div>
        </div>
        <button class="blog-reader-secondary" type="button" data-reader-action="signout">退出</button>
      </section>
      <label class="blog-reader-sync-toggle">
        <span><strong>同步阅读进度</strong><small>关闭后，这台设备不会上传新的记录。</small></span>
        <input type="checkbox" data-reader-action="toggle-sync" ${state.syncEnabled ? "checked" : ""}>
        <span class="blog-reader-switch" aria-hidden="true"></span>
      </label>
      ${state.error ? `<p class="blog-reader-error">${escapeHtml(state.error)}</p>` : ""}
      ${renderHistory()}
      <div class="blog-reader-data-actions">
        <button type="button" data-reader-action="clear" ${state.history.length ? "" : "disabled"}>清除全部阅读记录</button>
        <p>记录仅对当前账号可见，你可以随时暂停同步或删除。<a href="/blog/privacy/">隐私说明</a></p>
      </div>
    `;
  };

  const setPanelOpen = (open) => {
    state.panelOpen = open;
    trigger.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    panel.classList.toggle("is-open", open);
    backdrop.hidden = !open;
    backdrop.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("blog-reader-panel-open", open);
    if (open) {
      renderPanel();
      window.setTimeout(() => closeButton.focus(), 80);
      if (state.session) loadHistory();
    } else {
      trigger.focus();
    }
  };

  const currentArticle = () => {
    const content = document.querySelector(".article-content.markdown-body");
    if (!content || !/^\/blog\/\d{4}\/\d{2}\/\d{2}\//.test(window.location.pathname)) {
      return null;
    }
    const title =
      document.querySelector("h1.article-title-cover")?.textContent.trim() ||
      document.querySelector(".article-title h1")?.textContent.trim() ||
      document.title.replace(/\s+-\s+Gavin0576's Blog$/, "");
    return {
      content,
      path: window.location.pathname,
      title,
      url: `${window.location.origin}${window.location.pathname}`,
    };
  };

  const calculateProgress = () => {
    if (!state.article) return 0;
    const rect = state.article.content.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const readable = Math.max(1, state.article.content.scrollHeight - window.innerHeight * 0.65);
    return Math.max(0, Math.min(1, (window.scrollY - top + window.innerHeight * 0.35) / readable));
  };

  const loadHistory = async () => {
    if (!state.client || !state.session || state.loadingHistory) return;
    state.loadingHistory = true;
    renderPanel();
    const { data, error } = await state.client
      .from(config.table || "reading_history")
      .select("id,post_path,post_title,progress,completed,last_read_at,read_count")
      .order("last_read_at", { ascending: false })
      .limit(50);
    state.loadingHistory = false;
    if (error) {
      state.error = "暂时无法读取历史记录，请稍后重试。";
    } else {
      state.error = "";
      state.history = data || [];
    }
    if (state.panelOpen) renderPanel();
  };

  const saveProgress = async (incrementReadCount = false) => {
    if (!state.client || !state.session || !state.article || !state.syncEnabled || state.saving) return;
    state.saving = true;
    renderTrigger();
    const percentage = Math.max(1, Math.min(100, Math.round(state.progress * 100)));
    const { error } = await state.client.rpc("save_reading_progress", {
      p_post_path: state.article.path,
      p_post_title: state.article.title,
      p_post_url: state.article.url,
      p_progress: percentage,
      p_completed: percentage >= 90,
      p_increment_read_count: incrementReadCount,
    });
    state.saving = false;
    if (error) {
      state.error = "阅读进度暂时无法同步。";
    } else {
      state.error = "";
    }
    renderTrigger();
    if (state.panelOpen) loadHistory();
  };

  const scheduleSave = () => {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => saveProgress(false), 1200);
  };

  const handleScroll = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      const previous = state.progress;
      state.progress = calculateProgress();
      renderTrigger();
      if (Math.abs(state.progress - previous) >= 0.01) scheduleSave();
    });
  };

  const refreshPage = () => {
    window.clearTimeout(saveTimer);
    state.article = currentArticle();
    state.progress = calculateProgress();
    renderTrigger();
    const resumeRaw = sessionStorage.getItem("blog-reader-resume");
    if (state.article && resumeRaw) {
      try {
        const resume = JSON.parse(resumeRaw);
        if (normalizePath(resume.path) === state.article.path) {
          sessionStorage.removeItem("blog-reader-resume");
          const percentage = Math.max(0, Math.min(100, Number(resume.progress) || 0));
          window.setTimeout(() => {
            const rect = state.article.content.getBoundingClientRect();
            const top = window.scrollY + rect.top;
            const readable = Math.max(
              1,
              state.article.content.scrollHeight - window.innerHeight * 0.65,
            );
            window.scrollTo({
              top: Math.max(0, top + readable * (percentage / 100) - window.innerHeight * 0.35),
              behavior: "smooth",
            });
          }, 480);
        }
      } catch (_error) {
        sessionStorage.removeItem("blog-reader-resume");
      }
    }
    if (state.session && state.article && state.syncEnabled) {
      const shouldIncrement = !incrementedPaths.has(state.article.path);
      incrementedPaths.add(state.article.path);
      window.setTimeout(() => saveProgress(shouldIncrement), 900);
    }
  };

  const signIn = async () => {
    state.error = "";
    const returnPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    sessionStorage.setItem("blog-reader-return-path", returnPath);
    const redirectTo = `${window.location.origin}${normalizePath(config.redirectPath || "/blog/")}`;
    const { error } = await state.client.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo },
    });
    if (error) {
      state.error = "无法开始 GitHub 登录，请稍后重试。";
      renderPanel();
    }
  };

  const signOut = async () => {
    await state.client.auth.signOut();
    state.session = null;
    state.history = [];
    state.error = "";
    renderTrigger();
    renderPanel();
  };

  const clearHistory = async () => {
    if (!window.confirm("确定删除这个账号的全部阅读记录吗？此操作无法撤销。")) return;
    const { error } = await state.client
      .from(config.table || "reading_history")
      .delete()
      .eq("user_id", state.session.user.id);
    if (error) {
      state.error = "删除失败，请稍后重试。";
    } else {
      state.history = [];
      state.error = "";
    }
    renderPanel();
  };

  const deleteHistoryItem = async (id) => {
    const { error } = await state.client
      .from(config.table || "reading_history")
      .delete()
      .eq("id", id);
    if (error) {
      state.error = "删除失败，请稍后重试。";
    } else {
      state.history = state.history.filter((item) => item.id !== id);
      state.error = "";
    }
    renderPanel();
  };

  const initializeAuth = async () => {
    if (!state.configured) {
      renderTrigger();
      return;
    }
    state.client = window.supabase.createClient(
      config.supabaseUrl,
      config.supabasePublishableKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
          flowType: "pkce",
          storageKey: "jiangpf-blog-reader-auth",
        },
      },
    );

    const {
      data: { subscription },
    } = state.client.auth.onAuthStateChange(
      (_event, session) => {
        window.setTimeout(async () => {
          state.session = session;
          renderTrigger();
          if (session) {
            const returnPath = sessionStorage.getItem("blog-reader-return-path");
            if (returnPath && window.location.pathname === normalizePath(config.redirectPath || "/blog/")) {
              sessionStorage.removeItem("blog-reader-return-path");
              window.location.replace(normalizePath(returnPath));
              return;
            }
            refreshPage();
            if (state.panelOpen) loadHistory();
          } else if (state.panelOpen) {
            renderPanel();
          }
        }, 0);
      },
    );

    const callbackUrl = new URL(window.location.href);
    const authCode = callbackUrl.searchParams.get("code");
    if (authCode) {
      const { error: exchangeError } = await state.client.auth.exchangeCodeForSession(authCode);
      if (exchangeError) {
        state.error = "GitHub 登录回调已失效，请重新登录。";
      }
      ["code", "error", "error_code", "error_description"].forEach((key) =>
        callbackUrl.searchParams.delete(key),
      );
      window.history.replaceState({}, "", `${callbackUrl.pathname}${callbackUrl.search}${callbackUrl.hash}`);
    }

    const { data, error } = await state.client.auth.getSession();
    if (error) state.error = "登录状态读取失败，请刷新后重试。";
    state.session = data?.session || null;
    renderTrigger();
    refreshPage();
    window.__blogReadingHistory.authSubscription = subscription;
  };

  trigger.addEventListener("click", () => setPanelOpen(true));
  closeButton.addEventListener("click", () => setPanelOpen(false));
  backdrop.addEventListener("click", () => setPanelOpen(false));
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });
  document.addEventListener("swup:contentReplaced", refreshPage);
  document.addEventListener("swup:pageView", refreshPage);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.panelOpen) setPanelOpen(false);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveProgress(false);
  });

  panelBody.addEventListener("click", (event) => {
    const action = event.target.closest("[data-reader-action]")?.dataset.readerAction;
    const deleteId = event.target.closest("[data-reader-delete]")?.dataset.readerDelete;
    if (action === "signin") signIn();
    if (action === "signout") signOut();
    if (action === "clear") clearHistory();
    if (deleteId) deleteHistoryItem(deleteId);
    const historyLink = event.target.closest("[data-reader-history-link]");
    if (historyLink) {
      sessionStorage.setItem(
        "blog-reader-resume",
        JSON.stringify({
          path: historyLink.getAttribute("href"),
          progress: Number(historyLink.dataset.readerProgress) || 0,
        }),
      );
      setPanelOpen(false);
    }
  });

  panelBody.addEventListener("change", (event) => {
    if (event.target.dataset.readerAction !== "toggle-sync") return;
    state.syncEnabled = event.target.checked;
    localStorage.setItem("blog-reader-sync-enabled", String(state.syncEnabled));
    if (state.syncEnabled) refreshPage();
    renderPanel();
  });

  window.__blogReadingHistory = {
    refreshPage,
    authSubscription: null,
  };

  renderTrigger();
  initializeAuth();
})();
