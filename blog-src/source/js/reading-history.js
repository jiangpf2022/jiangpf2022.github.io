(function () {
  "use strict";

  const existing = window.__blogReadingHistory;
  if (existing && typeof existing.refreshPage === "function") {
    existing.refreshPage();
    return;
  }

  const config = window.blogReaderConfig || {};
  const DEVELOPER_USER_ID = "ef797a53-7193-4d0e-b566-5c8f3d33f9fd";
  const modelingOneEnglishPath = "/blog/2026/09/14/Mathematical-Modeling-01-From-Reality-to-a-Model/";
  const modelingOneChinesePath = "/blog/2026/09/14/Mathematical-Modeling-01-From-Reality-to-a-Model-zh/";
  const modelingOneEnglishChapters = [
    "What-a-model-must-answer",
    "From-purpose-to-state",
    "Translate-words-into-structure",
    "Make-assumptions-visible",
    "Build-a-baseline-then-extend-it",
    "Validate-the-entire-reasoning-chain",
    "Put-the-cycle-together-the-dining-hall",
    "Reason-before-computing",
    "Competition-problems-and-evidence",
    "Tools-for-reproducible-teamwork",
    "Read-reproduce-generalize",
    "Transfer-the-method-to-a-new-problem",
  ];
  const COURSE_CATALOG = [
    {
      slug: "mathematical-modeling",
      name: "Mathematical Modeling",
      categoryPath: "/blog/categories/Mathematical-Modeling/",
    },
    {
      slug: "deep-learning",
      name: "COMS4776W Neural Networks & Deep Learning",
      categoryPath: "/blog/categories/COMS4776W-Neural-Networks-Deep-Learning/",
    },
    {
      slug: "llm-generative-ai",
      name: "COMS6998E LLM-Based Generative AI",
      categoryPath: "/blog/categories/COMS6998E-LLM-Based-Generative-AI/",
    },
    {
      slug: "robotic",
      name: "COMS4773W Computational Aspects of Robotics",
      categoryPath: "/blog/categories/COMS4773W-Computational-Aspects-of-Robotics/",
    },
    {
      slug: "databases",
      name: "COMS W4111 Introduction to Databases",
      categoryPath: "/blog/categories/COMS-W4111-Introduction-to-Databases/",
    },
  ];
  const state = {
    client: null,
    session: null,
    previewAsReader: sessionStorage.getItem("blog-developer-regular-preview") === "true",
    history: [],
    article: null,
    progress: 0,
    experience: {
      total: 0,
      today: 0,
      level: 1,
      current: 0,
      required: 100,
      percentage: 0,
      loaded: false,
    },
    learning: {
      chapters: [],
      completion: 0,
      mastery: 0,
      loaded: false,
    },
    plan: {
      inPlan: false,
      loaded: false,
      saving: false,
      error: "",
      element: null,
    },
    saving: false,
    learningSaving: false,
    learningNeedsSave: false,
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
    learningError: "",
  };

  const incrementedPaths = new Set();
  let saveTimer = 0;
  let learningSaveTimer = 0;
  let scrollFrame = 0;
  let triggerDrag = null;
  let suppressTriggerClick = false;

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
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const localDateKey = (value = new Date()) => {
    const date = value instanceof Date ? value : new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const levelFromExperience = (value, todayValue = 0) => {
    const total = Math.max(0, Number(value) || 0);
    const today = Math.max(0, Number(todayValue) || 0);
    let level = 1;
    let current = total;
    while (current >= level * 100) {
      current -= level * 100;
      level += 1;
    }
    const required = level * 100;
    return {
      total: Math.round(total * 100) / 100,
      today: Math.round(today * 100) / 100,
      level,
      current: Math.round(current * 100) / 100,
      required,
      percentage: Math.max(0, Math.min(100, (current / required) * 100)),
      loaded: true,
    };
  };

  const formatExperience = (value) => {
    const number = Math.round((Number(value) || 0) * 10) / 10;
    return Number.isInteger(number) ? String(number) : number.toFixed(1);
  };

  const decayedMastery = (chapterProgress, at = new Date(), fallbackDate = null) => {
    const entries = Object.values(chapterProgress || {}).filter(
      (chapter) => chapter && typeof chapter === "object" && chapter.completed,
    );
    if (!entries.length) return 0;
    let weightedMastery = 0;
    let totalWeight = 0;
    entries.forEach((chapter) => {
      const weight = Math.max(1, Number(chapter.weight) || 1);
      const baseMastery = Math.max(0, Math.min(100, Number(chapter.mastery) || 0));
      const reviewedAt = chapter.reviewed_at || fallbackDate;
      const reviewedTime = reviewedAt ? new Date(reviewedAt).getTime() : at.getTime();
      const elapsedDays = Math.max(0, (at.getTime() - reviewedTime) / 86400000);
      const retained = baseMastery * Math.exp(-elapsedDays / 7);
      weightedMastery += retained * weight;
      totalWeight += weight;
    });
    return totalWeight ? Math.round(weightedMastery / totalWeight) : 0;
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

  const courseForPage = () => {
    const categoryPaths = new Set(
      Array.from(
        document.querySelectorAll('.article-meta-info .article-categories a[href*="/blog/categories/"]'),
      ).map((link) => {
        try {
          return new URL(link.href, window.location.origin).pathname;
        } catch (_error) {
          return "";
        }
      }),
    );
    return COURSE_CATALOG.find((course) => categoryPaths.has(course.categoryPath)) || null;
  };

  const root = document.createElement("div");
  root.id = "blog-reader-root";
  root.innerHTML = `
    <button class="blog-reader-trigger" type="button" aria-label="Open reading history" aria-haspopup="dialog" aria-expanded="false">
      <span class="blog-reader-trigger-ring" aria-hidden="true"></span>
      <span class="blog-reader-trigger-icon" aria-hidden="true"><i class="fa-regular fa-clock-rotate-left"></i></span>
      <span class="blog-reader-trigger-status" aria-hidden="true"></span>
      <span class="blog-reader-trigger-level" aria-hidden="true">LV 1</span>
    </button>
    <div class="blog-reader-backdrop" hidden></div>
    <aside class="blog-reader-panel" role="dialog" aria-modal="true" aria-labelledby="blog-reader-title" aria-hidden="true">
      <header class="blog-reader-panel-header">
        <div>
          <p class="blog-reader-eyebrow">PERSONAL LIBRARY</p>
          <h2 id="blog-reader-title">Reading History</h2>
        </div>
        <button class="blog-reader-close" type="button" aria-label="Close reading history"><i class="fa-regular fa-xmark"></i></button>
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

  const setTriggerPosition = (clientY, persist = false) => {
    const halfHeight = Math.max(24, trigger.offsetHeight / 2);
    const safeTop = Math.max(halfHeight + 12, Math.min(window.innerHeight - halfHeight - 12, clientY));
    trigger.classList.add("has-custom-position");
    trigger.style.setProperty("--reader-trigger-y", `${safeTop}px`);
    if (persist) {
      localStorage.setItem("blog-reader-trigger-y", String(safeTop / Math.max(1, window.innerHeight)));
    }
  };

  const restoreTriggerPosition = () => {
    const ratio = Number(localStorage.getItem("blog-reader-trigger-y"));
    if (Number.isFinite(ratio) && ratio > 0 && ratio < 1) {
      setTriggerPosition(ratio * window.innerHeight, false);
    }
  };

  const broadcastState = () => {
    document.dispatchEvent(
      new CustomEvent("blog-reader:state", {
        detail: {
          configured: state.configured,
          signedIn: Boolean(state.session),
          developer: state.session?.user?.id === DEVELOPER_USER_ID,
          regularPreview: state.previewAsReader,
          syncEnabled: state.syncEnabled,
        },
      }),
    );
  };

  const profile = () => {
    const user = state.session?.user;
    const metadata = user?.user_metadata || {};
    return {
      name: metadata.user_name || metadata.preferred_username || metadata.name || "GitHub User",
      avatar: safeAvatar(metadata.avatar_url),
    };
  };

  const isDeveloper = () => state.session?.user?.id === DEVELOPER_USER_ID;

  const toggleRegularPreview = () => {
    if (!isDeveloper()) return;
    state.previewAsReader = !state.previewAsReader;
    sessionStorage.setItem("blog-developer-regular-preview", String(state.previewAsReader));
    renderPanel();
    broadcastState();
  };

  const renderTrigger = () => {
    const icon = trigger.querySelector(".blog-reader-trigger-icon");
    const status = trigger.querySelector(".blog-reader-trigger-status");
    const level = trigger.querySelector(".blog-reader-trigger-level");
    trigger.style.setProperty("--reader-progress", `${Math.round(state.progress * 360)}deg`);
    trigger.classList.toggle("is-signed-in", Boolean(state.session));
    trigger.classList.toggle("is-unconfigured", !state.configured);
    trigger.classList.toggle("is-saving", state.saving || state.learningSaving || state.plan.saving);
    level.textContent = `LV ${state.experience.level}`;
    level.hidden = !state.session;

    const userProfile = profile();
    if (state.session && userProfile.avatar) {
      icon.innerHTML = `<img src="${escapeHtml(userProfile.avatar)}" alt="">`;
    } else {
      icon.innerHTML = '<i class="fa-regular fa-clock-rotate-left"></i>';
    }

    status.title = !state.configured
      ? "Sign-in service is not connected"
      : state.session
        ? state.saving || state.learningSaving || state.plan.saving
          ? "Syncing"
          : "Reading history synced"
        : "Not signed in";
    renderSidebarLevel();
  };

  const renderSidebarLevel = () => {
    document.querySelectorAll(".home-sidebar-container .sidebar-content .avatar").forEach((avatar) => {
      avatar.classList.add("has-reader-level");
      let badge = avatar.querySelector(".blog-reader-sidebar-level");
      if (!state.session) {
        badge?.remove();
        return;
      }
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "blog-reader-sidebar-level";
        avatar.appendChild(badge);
      }
      badge.textContent = `LV ${state.experience.level}`;
      badge.title = `${formatExperience(state.experience.total)} total EXP`;
    });
  };

  const loadExperience = async () => {
    if (!state.client || !state.session) {
      state.experience = levelFromExperience(0);
      state.experience.loaded = false;
      renderTrigger();
      return state.experience;
    }
    const userId = state.session.user.id;
    const { data, error } = await state.client
      .from("learning_mastery_history")
      .select("earned_exp,event_date")
      .limit(5000);
    if (state.session?.user?.id !== userId) return state.experience;
    if (!error) {
      const total = (data || []).reduce((sum, item) => sum + Math.max(0, Number(item.earned_exp) || 0), 0);
      const today = (data || [])
        .filter((item) => item.event_date === localDateKey())
        .reduce((sum, item) => sum + Math.max(0, Number(item.earned_exp) || 0), 0);
      state.experience = levelFromExperience(total, today);
    } else {
      state.experience = levelFromExperience(0);
      state.experience.loaded = false;
    }
    renderTrigger();
    if (state.panelOpen) renderPanel();
    document.dispatchEvent(new CustomEvent("blog-reader:experience", { detail: state.experience }));
    return state.experience;
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
          <h3>No reading history yet</h3>
          <p>Articles appear here after you start reading them.</p>
        </div>
      `;
    }

    return `
      <div class="blog-reader-history-heading">
        <h3>Recently Read</h3>
        <span>${state.history.length} article${state.history.length === 1 ? "" : "s"}</span>
      </div>
      <ol class="blog-reader-history-list">
        ${state.history
          .map((item) => {
            const progress = Math.max(0, Math.min(100, Number(item.progress) || 0));
            const completion = Math.max(0, Math.min(100, Number(item.completion) || 0));
            const storedMastery = Math.max(0, Math.min(100, Number(item.mastery) || 0));
            const mastery = Object.keys(item.chapter_progress || {}).length
              ? decayedMastery(item.chapter_progress, new Date(), item.last_read_at)
              : storedMastery;
            return `
              <li class="blog-reader-history-item">
                <a href="${escapeHtml(normalizePath(item.post_path))}" data-reader-history-link data-reader-progress="${progress}">
                  <span class="blog-reader-history-title">${escapeHtml(item.post_title || item.post_path)}</span>
                  <span class="blog-reader-history-meta">
                    <span>${escapeHtml(formatDate(item.last_read_at))}</span>
                    <span>Reading position ${progress}%</span>
                  </span>
                  ${item.course_slug ? `<span class="blog-reader-history-metrics">
                    <span class="blog-reader-history-metric">
                      <span><b>Completion</b><strong>${completion}%</strong></span>
                      <span class="blog-reader-history-progress" aria-label="Chapter completion ${completion}%"><span style="width:${completion}%"></span></span>
                    </span>
                    <span class="blog-reader-history-metric is-mastery">
                      <span><b>Current Mastery</b><strong>${mastery}%</strong></span>
                      <span class="blog-reader-history-progress" aria-label="Weighted mastery of completed chapters ${mastery}%"><span style="width:${mastery}%"></span></span>
                    </span>
                  </span>` : ""}
                </a>
                <button type="button" data-reader-delete="${escapeHtml(item.id)}" aria-label="Delete reading history for ${escapeHtml(item.post_title || "this article")}">
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
          <h3>Account service is being configured</h3>
          <p>The blog remains available. GitHub sign-in and cross-device sync will become available once the connection is complete.</p>
        </div>
      `;
      return;
    }

    if (!state.session) {
      panelBody.innerHTML = `
        <section class="blog-reader-signin">
          <div class="blog-reader-orbit" aria-hidden="true"><i class="fa-brands fa-github"></i></div>
          <h3>Save your reading progress</h3>
          <p>Existing members can sign in with GitHub to sync recent articles, chapter completion, and mastery across devices. New accounts are currently added by the administrator only.</p>
          <button class="blog-reader-primary" type="button" data-reader-action="signin">
            <i class="fa-brands fa-github"></i><span>Continue with GitHub</span>
          </button>
          <p class="blog-reader-privacy-note">Signing in allows this site to save article titles, URLs, reading progress, chapter completion, and mastery. Your repository contents are never read. <a href="/blog/privacy/">Privacy notice</a></p>
          ${state.error ? `<p class="blog-reader-error">${escapeHtml(state.error)}</p>` : ""}
        </section>
      `;
      return;
    }

    const userProfile = profile();
    const experience = state.experience;
    panelBody.innerHTML = `
      <section class="blog-reader-account">
        <div class="blog-reader-profile">
          ${userProfile.avatar ? `<img src="${escapeHtml(userProfile.avatar)}" alt="">` : '<span><i class="fa-brands fa-github"></i></span>'}
          <div><p>Signed in with GitHub</p><h3>${escapeHtml(userProfile.name)}</h3><span class="blog-reader-profile-level">LV ${experience.level}</span>${isDeveloper() ? '<span class="blog-reader-developer-badge">DEVELOPER</span>' : ""}</div>
        </div>
        <button class="blog-reader-secondary" type="button" data-reader-action="signout">Sign Out</button>
      </section>
      ${isDeveloper() ? `<section class="blog-reader-preview-control" aria-label="Developer view switch">
        <div><strong>${state.previewAsReader ? "Regular-user preview" : "Developer view"}</strong><small>${state.previewAsReader ? "Draft lessons appear locked, just as they do for other readers." : "You can read lessons awaiting your review."}</small></div>
        <button type="button" data-reader-action="toggle-preview">${state.previewAsReader ? "Return to Developer View" : "Switch to Regular User View"}</button>
      </section>` : ""}
      <section class="blog-reader-level-card" aria-label="Learning level and experience">
        <div><span><i class="fa-solid fa-bolt" aria-hidden="true"></i> LEVEL ${experience.level}</span><strong>${formatExperience(experience.current)} <small>/ ${experience.required} EXP</small></strong></div>
        <div class="blog-reader-level-progress"><i style="width:${experience.percentage}%"></i></div>
        <p>+${formatExperience(experience.today)} EXP today <b>·</b> ${formatExperience(experience.total)} total EXP <b>·</b> Next level requires ${experience.required} EXP</p>
      </section>
      <label class="blog-reader-sync-toggle">
        <span><strong>Sync Reading Progress</strong><small>When disabled, this device will not upload new activity.</small></span>
        <input type="checkbox" data-reader-action="toggle-sync" ${state.syncEnabled ? "checked" : ""}>
        <span class="blog-reader-switch" aria-hidden="true"></span>
      </label>
      ${state.error ? `<p class="blog-reader-error">${escapeHtml(state.error)}</p>` : ""}
      ${renderHistory()}
      <div class="blog-reader-data-actions">
        <button type="button" data-reader-action="clear" ${state.history.length ? "" : "disabled"}>Clear All Reading History</button>
        <p>Your records are visible only to this account. You can pause syncing or delete them at any time. <a href="/blog/privacy/">Privacy notice</a></p>
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
    if (content.querySelector('[data-modeling-protected="true"]') && content.dataset.modelingLoaded !== "true") {
      return null;
    }
    const title =
      document.querySelector("h1.article-title-cover")?.textContent.trim() ||
      document.querySelector(".article-title h1")?.textContent.trim() ||
      document.title.replace(/\s+-\s+Gavin0576's Blog$/, "");
    const isChineseTranslation = window.location.pathname === modelingOneChinesePath;
    const path = isChineseTranslation ? modelingOneEnglishPath : window.location.pathname;
    return {
      content,
      path,
      title: isChineseTranslation ? "1 - From Reality to a Model" : title,
      url: window.location.origin + path,
      course: courseForPage(),
    };
  };

  const renderPlanControl = () => {
    const element = state.plan.element;
    if (!element || !state.article?.course) return;
    const signedIn = Boolean(state.session);
    const canEdit = signedIn && state.syncEnabled && !state.plan.saving;
    let label = "Sign in to Add to Plan";
    let icon = "fa-brands fa-github";
    let action = "signin";
    if (signedIn) {
      action = "toggle";
      icon = state.plan.inPlan ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
      label = state.plan.saving
        ? "Syncing…"
        : state.plan.inPlan
          ? "Course Added"
          : "Add Course";
    }
    element.classList.toggle("is-active", state.plan.inPlan);
    element.innerHTML = `
      <div>
        <span class="blog-reader-plan-kicker">${escapeHtml(state.article.course.name.toUpperCase())} PLAN</span>
        <strong>${state.plan.inPlan ? `The complete ${escapeHtml(state.article.course.name)} course is in My Learning` : `Add the complete ${escapeHtml(state.article.course.name)} course to My Learning?`}</strong>
        <small>${state.plan.inPlan ? "Every current and future article in this course is included; this article's checkpoints contribute to the course." : "All articles in this course will appear together, including articles added later."}</small>
      </div>
      <button type="button" data-reader-plan-action="${action}" ${signedIn && !canEdit ? "disabled" : ""}>
        <i class="${icon}" aria-hidden="true"></i><span>${label}</span>
      </button>
      ${state.plan.error ? `<p class="blog-reader-plan-error">${escapeHtml(state.plan.error)}</p>` : ""}
    `;
  };

  const buildPlanControl = () => {
    document.querySelectorAll(".blog-reader-plan-control").forEach((element) => element.remove());
    state.plan = { inPlan: false, loaded: false, saving: false, error: "", element: null };
    if (!state.article?.course) return;
    const element = document.createElement("section");
    element.className = "blog-reader-plan-control";
    element.setAttribute("aria-label", "Course study plan");
    state.article.content.insertBefore(element, state.article.content.firstChild);
    state.plan.element = element;
    renderPlanControl();
  };

  const setCoursePlan = async (course, inPlan) => {
    if (!state.client || !state.session || !state.syncEnabled || !course) {
      return { error: new Error("Sign in and enable sync first") };
    }
    if (state.article?.course?.slug === course.slug) {
      state.plan.saving = true;
      state.plan.error = "";
      renderPlanControl();
      renderTrigger();
    }
    const result = await state.client.rpc("set_course_plan", {
      p_course_slug: course.slug,
      p_in_plan: inPlan,
    });
    if (state.article?.course?.slug === course.slug) {
      state.plan.saving = false;
      if (result.error) {
        state.plan.error = "The study plan could not be synced right now.";
      } else {
        state.plan.inPlan = inPlan;
        state.plan.loaded = true;
        state.plan.error = "";
        if (inPlan) await loadLearningProgress();
        else buildChapterCheckpoints();
      }
      renderPlanControl();
      renderTrigger();
    }
    broadcastState();
    return result;
  };

  const calculateProgress = () => {
    if (!state.article) return 0;
    const rect = state.article.content.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const readable = Math.max(1, state.article.content.scrollHeight - window.innerHeight * 0.65);
    return Math.max(0, Math.min(1, (window.scrollY - top + window.innerHeight * 0.35) / readable));
  };

  const calculateChapterWeight = (heading, nextHeading) => {
    let textLength = 0;
    let imageCount = 0;
    let node = heading.nextElementSibling;
    while (node && node !== nextHeading) {
      if (!node.classList?.contains("blog-reader-chapter-checkpoint")) {
        textLength += (node.textContent || "").replace(/\s+/g, "").length;
        imageCount += node.querySelectorAll?.("img").length || 0;
      }
      node = node.nextElementSibling;
    }
    return Math.max(1, textLength + imageCount * 250);
  };

  const calculateLearningSummary = () => {
    const chapters = state.learning.chapters;
    if (!chapters.length) {
      state.learning.completion = 0;
      state.learning.mastery = 0;
      return;
    }
    const completed = chapters.filter((chapter) => chapter.completed);
    state.learning.completion = Math.round((completed.length / chapters.length) * 100);
    const totalWeight = completed.reduce((sum, chapter) => sum + chapter.weight, 0);
    state.learning.mastery = totalWeight
      ? Math.round(
          completed.reduce((sum, chapter) => sum + chapter.mastery * chapter.weight, 0) /
            totalWeight,
        )
      : 0;
  };

  const checkpointStatus = () => {
    if (!state.configured) return "Account service is not connected";
    if (!state.session) return "Sign in to save across devices";
    if (!state.syncEnabled) return "Sync paused";
    if (state.learningSaving) return "Syncing…";
    if (state.learningError) return state.learningError;
    return state.learning.loaded ? "Synced" : "Loading progress…";
  };

  const refreshChapterCheckpoint = (chapter) => {
    const element = chapter.element;
    if (!element) return;
    const checkbox = element.querySelector('[data-reader-chapter-action="completed"]');
    const range = element.querySelector('[data-reader-chapter-action="mastery"]');
    const output = element.querySelector("output");
    const retention = element.querySelector("[data-reader-current-retention]");
    const reviewButton = element.querySelector('[data-reader-chapter-action="review"]');
    const status = element.querySelector(".blog-reader-chapter-status");
    const canEdit = Boolean(state.configured && state.session && state.syncEnabled);
    checkbox.checked = chapter.completed;
    checkbox.disabled = !canEdit;
    range.value = String(chapter.mastery);
    range.disabled = !canEdit || !chapter.completed;
    output.value = `${chapter.mastery}%`;
    output.textContent = `${chapter.mastery}%`;
    const currentRetention = chapter.completed
      ? decayedMastery(
          {
            [chapter.key]: {
              completed: true,
              mastery: chapter.mastery,
              weight: chapter.weight,
              reviewed_at: chapter.reviewedAt,
            },
          },
          new Date(),
        )
      : 0;
    retention.textContent = `${currentRetention}%`;
    reviewButton.disabled = !canEdit || !chapter.completed;
    element.classList.toggle("is-completed", chapter.completed);
    element.classList.toggle("is-disabled", !canEdit);
    element.style.setProperty("--mastery", `${chapter.mastery}%`);
    status.textContent = checkpointStatus();
  };

  const refreshAllChapterCheckpoints = () => {
    state.learning.chapters.forEach(refreshChapterCheckpoint);
  };

  const buildChapterCheckpoints = () => {
    document.querySelectorAll(".blog-reader-chapter-checkpoint").forEach((element) => element.remove());
    state.learning = { chapters: [], completion: 0, mastery: 0, loaded: false };
    if (!state.article?.course || !state.plan.inPlan) return;

    const directChildren = Array.from(state.article.content.children);
    let headings = directChildren.filter((element) => element.tagName === "H2");
    if (!headings.length) headings = directChildren.filter((element) => element.tagName === "H3");
    const usedKeys = new Set();

    state.learning.chapters = headings.map((heading, index) => {
      const nextHeading = headings[index + 1] || null;
      const baseKey = window.location.pathname === modelingOneChinesePath
        ? (modelingOneEnglishChapters[index] || "chapter-" + (index + 1))
        : (heading.id || "chapter-" + (index + 1));
      let key = baseKey;
      let duplicate = 2;
      while (usedKeys.has(key)) key = `${baseKey}-${duplicate++}`;
      usedKeys.add(key);

      const chapter = {
        key,
        title: heading.textContent.trim() || `Chapter ${index + 1}`,
        order: index + 1,
        weight: calculateChapterWeight(heading, nextHeading),
        completed: false,
        mastery: 50,
        reviewedAt: null,
        element: document.createElement("section"),
      };
      chapter.element.className = "blog-reader-chapter-checkpoint";
      chapter.element.dataset.readerChapterKey = key;
      chapter.element.setAttribute("aria-label", `Learning checkpoint for ${chapter.title}`);
      chapter.element.innerHTML = `
        <div class="blog-reader-checkpoint-heading">
          <span class="blog-reader-checkpoint-kicker"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> LEARNING CHECKPOINT</span>
          <span class="blog-reader-chapter-status" aria-live="polite"></span>
        </div>
        <div class="blog-reader-checkpoint-controls">
          <label class="blog-reader-chapter-check">
            <input type="checkbox" data-reader-chapter-action="completed">
            <span class="blog-reader-checkmark" aria-hidden="true"><i class="fa-regular fa-check"></i></span>
            <span><strong>Complete Chapter</strong><small>${escapeHtml(chapter.title)}</small></span>
          </label>
          <div class="blog-reader-mastery">
            <span><strong>Mastery</strong><output>50%</output></span>
            <input type="range" min="0" max="100" step="5" value="50" data-reader-chapter-action="mastery" aria-label="Mastery for ${escapeHtml(chapter.title)}">
            <div class="blog-reader-mastery-memory">
              <span>Current Retention <b data-reader-current-retention>0%</b></span>
              <button type="button" data-reader-chapter-action="review"><i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Review Today</button>
            </div>
          </div>
        </div>
      `;
      if (nextHeading) {
        state.article.content.insertBefore(chapter.element, nextHeading);
      } else {
        state.article.content.appendChild(chapter.element);
      }
      refreshChapterCheckpoint(chapter);
      return chapter;
    });
    calculateLearningSummary();
  };

  const learningPayload = () =>
    Object.fromEntries(
      state.learning.chapters.map((chapter) => [
        chapter.key,
        {
          completed: chapter.completed,
          mastery: chapter.mastery,
          title: chapter.title,
          order: chapter.order,
          weight: chapter.weight,
          reviewed_at: chapter.reviewedAt,
        },
      ]),
    );

  const loadLearningProgress = async () => {
    if (!state.client || !state.session || !state.article?.course) return;
    const articlePath = state.article.path;
    const courseSlug = state.article.course.slug;
    const [progressResult, planResult] = await Promise.all([
      state.client
        .from(config.table || "reading_history")
        .select("chapter_progress,last_read_at")
        .eq("post_path", articlePath)
        .maybeSingle(),
      state.client
        .from("course_plans")
        .select("course_slug")
        .eq("course_slug", courseSlug)
        .maybeSingle(),
    ]);
    if (!state.article || state.article.path !== articlePath || state.article.course?.slug !== courseSlug) return;
    const { data, error } = progressResult;
    const { data: coursePlan, error: coursePlanError } = planResult;
    if (error || coursePlanError) {
      state.learningError = "Chapter progress could not be loaded";
    } else {
      const saved = data?.chapter_progress || {};
      state.plan.inPlan = Boolean(coursePlan);
      state.plan.loaded = true;
      renderPlanControl();
      buildChapterCheckpoints();
      state.learning.chapters.forEach((chapter) => {
        const entry = saved[chapter.key];
        if (!entry || typeof entry !== "object") return;
        chapter.completed = Boolean(entry.completed);
        chapter.mastery = Math.max(0, Math.min(100, Number(entry.mastery) || 0));
        chapter.weight = Math.max(1, Number(entry.weight) || chapter.weight);
        chapter.reviewedAt = entry.reviewed_at || (chapter.completed ? data?.last_read_at : null);
      });
      state.learningError = "";
      state.learning.loaded = true;
      calculateLearningSummary();
    }
    refreshAllChapterCheckpoints();
  };

  const saveLearningProgress = async () => {
    if (
      !state.client ||
      !state.session ||
      !state.article?.course ||
      !state.syncEnabled ||
      state.learningSaving
    ) {
      return;
    }
    const articlePath = state.article.path;
    state.learningNeedsSave = false;
    state.learningSaving = true;
    state.learningError = "";
    refreshAllChapterCheckpoints();
    renderTrigger();
    const { error } = await state.client.rpc("save_learning_progress", {
      p_post_path: articlePath,
      p_post_title: state.article.title,
      p_post_url: state.article.url,
      p_course_slug: state.article.course.slug,
      p_chapter_progress: learningPayload(),
      p_completion: state.learning.completion,
      p_mastery: state.learning.mastery,
      p_event_date: localDateKey(),
    });
    state.learningSaving = false;
    if (!state.article || state.article.path !== articlePath) {
      renderTrigger();
      return;
    }
    if (error) {
      state.learningError = "Chapter progress could not be synced";
    } else {
      state.learningError = "";
      state.learning.loaded = true;
      await loadExperience();
    }
    refreshAllChapterCheckpoints();
    renderTrigger();
    if (state.panelOpen) loadHistory();
    if (state.learningNeedsSave) scheduleLearningSave();
  };

  const scheduleLearningSave = () => {
    state.learningNeedsSave = true;
    window.clearTimeout(learningSaveTimer);
    learningSaveTimer = window.setTimeout(() => {
      learningSaveTimer = 0;
      saveLearningProgress();
    }, 450);
  };

  const loadHistory = async () => {
    if (!state.client || !state.session || state.loadingHistory) return;
    state.loadingHistory = true;
    renderPanel();
    const { data, error } = await state.client
      .from(config.table || "reading_history")
      .select("id,post_path,post_title,progress,completed,completion,mastery,course_slug,chapter_progress,last_read_at,read_count")
      .order("last_read_at", { ascending: false })
      .limit(50);
    state.loadingHistory = false;
    if (error) {
      state.error = "Reading history could not be loaded. Please try again later.";
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
      state.error = "Reading progress could not be synced right now.";
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
    window.clearTimeout(learningSaveTimer);
    state.learningNeedsSave = false;
    state.article = currentArticle();
    state.progress = calculateProgress();
    state.learningError = "";
    buildPlanControl();
    buildChapterCheckpoints();
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
    if (state.session && state.article) {
      if (state.article.course) loadLearningProgress();
      if (state.syncEnabled) {
        const shouldIncrement = !incrementedPaths.has(state.article.path);
        incrementedPaths.add(state.article.path);
        window.setTimeout(() => saveProgress(shouldIncrement), 900);
      }
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
      state.error = "GitHub sign-in could not be started. Please try again later.";
      renderPanel();
    }
  };

  const signOut = async () => {
    await state.client.auth.signOut();
    state.session = null;
    state.history = [];
    state.experience = levelFromExperience(0);
    state.experience.loaded = false;
    state.error = "";
    state.learningError = "";
    renderTrigger();
    refreshPage();
    renderPanel();
  };

  const clearHistory = async () => {
    if (!window.confirm("Delete all reading history for this account? This action cannot be undone.")) return;
    const { error } = await state.client
      .from(config.table || "reading_history")
      .delete()
      .eq("user_id", state.session.user.id);
    if (error) {
      state.error = "Delete failed. Please try again later.";
    } else {
      state.history = [];
      state.error = "";
      await loadExperience();
    }
    renderPanel();
  };

  const deleteHistoryItem = async (id) => {
    const { error } = await state.client
      .from(config.table || "reading_history")
      .delete()
      .eq("id", id);
    if (error) {
      state.error = "Delete failed. Please try again later.";
    } else {
      state.history = state.history.filter((item) => item.id !== id);
      state.error = "";
      await loadExperience();
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
            await loadExperience();
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
          broadcastState();
        }, 0);
      },
    );

    const callbackUrl = new URL(window.location.href);
    const authCode = callbackUrl.searchParams.get("code");
    if (authCode) {
      const { error: exchangeError } = await state.client.auth.exchangeCodeForSession(authCode);
      if (exchangeError) {
        state.error = "The GitHub sign-in callback expired. Please sign in again.";
      }
      ["code", "error", "error_code", "error_description"].forEach((key) =>
        callbackUrl.searchParams.delete(key),
      );
      window.history.replaceState({}, "", `${callbackUrl.pathname}${callbackUrl.search}${callbackUrl.hash}`);
    }

    const { data, error } = await state.client.auth.getSession();
    if (error) state.error = "Your sign-in status could not be loaded. Please refresh and try again.";
    state.session = data?.session || null;
    renderTrigger();
    if (state.session) await loadExperience();
    refreshPage();
    broadcastState();
    window.__blogReadingHistory.authSubscription = subscription;
  };

  trigger.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    const rect = trigger.getBoundingClientRect();
    triggerDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      grabOffsetY: event.clientY - (rect.top + rect.height / 2),
      lastCenterY: rect.top + rect.height / 2,
      moved: false,
    };
    try {
      trigger.setPointerCapture?.(event.pointerId);
    } catch (_error) {
      // Document-level listeners below keep dragging functional without pointer capture.
    }
    trigger.classList.add("is-dragging");
    document.documentElement.classList.add("blog-reader-trigger-dragging");
  });
  const moveTrigger = (event) => {
    if (!triggerDrag || triggerDrag.pointerId !== event.pointerId) return;
    const distance = Math.hypot(
      event.clientX - triggerDrag.startX,
      event.clientY - triggerDrag.startY,
    );
    if (distance < 5 && !triggerDrag.moved) return;
    triggerDrag.moved = true;
    triggerDrag.lastCenterY = event.clientY - triggerDrag.grabOffsetY;
    event.preventDefault();
    setTriggerPosition(triggerDrag.lastCenterY, false);
  };
  const finishTriggerDrag = (event) => {
    if (!triggerDrag || triggerDrag.pointerId !== event.pointerId) return;
    const wasMoved = triggerDrag.moved;
    if (wasMoved) {
      setTriggerPosition(triggerDrag.lastCenterY, true);
      suppressTriggerClick = true;
      window.setTimeout(() => {
        suppressTriggerClick = false;
      }, 250);
    }
    try {
      if (trigger.hasPointerCapture?.(event.pointerId)) {
        trigger.releasePointerCapture(event.pointerId);
      }
    } catch (_error) {
      // The pointer may already have been released by the browser.
    }
    trigger.classList.remove("is-dragging");
    document.documentElement.classList.remove("blog-reader-trigger-dragging");
    triggerDrag = null;
  };
  document.addEventListener("pointermove", moveTrigger, { passive: false });
  document.addEventListener("pointerup", finishTriggerDrag);
  document.addEventListener("pointercancel", finishTriggerDrag);
  trigger.addEventListener("click", (event) => {
    if (suppressTriggerClick) {
      event.preventDefault();
      return;
    }
    setPanelOpen(true);
  });
  closeButton.addEventListener("click", () => setPanelOpen(false));
  backdrop.addEventListener("click", () => setPanelOpen(false));
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      handleScroll();
      restoreTriggerPosition();
    },
    { passive: true },
  );
  document.addEventListener("swup:contentReplaced", refreshPage);
  document.addEventListener("swup:pageView", refreshPage);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.panelOpen) setPanelOpen(false);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveProgress(false);
      if (state.learningNeedsSave || learningSaveTimer) {
        window.clearTimeout(learningSaveTimer);
        learningSaveTimer = 0;
        saveLearningProgress();
      }
    }
  });

  document.addEventListener("input", (event) => {
    const action = event.target.dataset.readerChapterAction;
    if (action !== "mastery") return;
    const checkpoint = event.target.closest("[data-reader-chapter-key]");
    const chapter = state.learning.chapters.find(
      (item) => item.key === checkpoint?.dataset.readerChapterKey,
    );
    if (!chapter || event.target.disabled) return;
    chapter.mastery = Math.max(0, Math.min(100, Number(event.target.value) || 0));
    chapter.reviewedAt = new Date().toISOString();
    calculateLearningSummary();
    refreshChapterCheckpoint(chapter);
    scheduleLearningSave();
  });

  document.addEventListener("change", (event) => {
    const action = event.target.dataset.readerChapterAction;
    if (!action) return;
    const checkpoint = event.target.closest("[data-reader-chapter-key]");
    const chapter = state.learning.chapters.find(
      (item) => item.key === checkpoint?.dataset.readerChapterKey,
    );
    if (!chapter || event.target.disabled) return;
    if (action === "completed") {
      chapter.completed = event.target.checked;
      if (chapter.completed) chapter.reviewedAt = new Date().toISOString();
    }
    if (action === "mastery") {
      chapter.mastery = Math.max(0, Math.min(100, Number(event.target.value) || 0));
      chapter.reviewedAt = new Date().toISOString();
    }
    calculateLearningSummary();
    refreshChapterCheckpoint(chapter);
    scheduleLearningSave();
  });

  document.addEventListener("click", (event) => {
    const planAction = event.target.closest("[data-reader-plan-action]")?.dataset.readerPlanAction;
    if (planAction === "signin") setPanelOpen(true);
    if (planAction === "toggle" && state.article && !state.plan.saving) {
      setCoursePlan(state.article.course, !state.plan.inPlan);
    }

    const reviewButton = event.target.closest('[data-reader-chapter-action="review"]');
    if (!reviewButton || reviewButton.disabled) return;
    const checkpoint = reviewButton.closest("[data-reader-chapter-key]");
    const chapter = state.learning.chapters.find(
      (item) => item.key === checkpoint?.dataset.readerChapterKey,
    );
    if (!chapter || !chapter.completed) return;
    chapter.reviewedAt = new Date().toISOString();
    calculateLearningSummary();
    refreshChapterCheckpoint(chapter);
    scheduleLearningSave();
  });

  panelBody.addEventListener("click", (event) => {
    const action = event.target.closest("[data-reader-action]")?.dataset.readerAction;
    const deleteId = event.target.closest("[data-reader-delete]")?.dataset.readerDelete;
    if (action === "signin") signIn();
    if (action === "signout") signOut();
    if (action === "clear") clearHistory();
    if (action === "toggle-preview") toggleRegularPreview();
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
    else {
      refreshAllChapterCheckpoints();
      renderPlanControl();
    }
    renderPanel();
    broadcastState();
  });

  window.__blogReadingHistory = {
    refreshPage,
    signIn,
    setCoursePlan,
    getClient: () => state.client,
    getSession: () => state.session,
    isDeveloper,
    isRegularPreview: () => state.previewAsReader,
    toggleRegularPreview,
    getSyncEnabled: () => state.syncEnabled,
    localDateKey,
    decayedMastery,
    levelFromExperience,
    loadExperience,
    getExperience: () => ({ ...state.experience }),
    authSubscription: null,
  };

  restoreTriggerPosition();
  renderTrigger();
  initializeAuth();
})();
