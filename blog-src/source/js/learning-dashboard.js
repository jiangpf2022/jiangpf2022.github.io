(function () {
  "use strict";

  const DAY_MS = 86400000;
  const HISTORY_DAYS = 13;
  const FORECAST_DAYS = 7;
  const COURSES = [
    { slug: "deep-learning", name: "COMS4776W Neural Networks & Deep Learning", icon: "fa-solid fa-network-wired" },
    { slug: "llm-generative-ai", name: "COMS6998E LLM-Based Generative AI", icon: "fa-solid fa-sparkles" },
    { slug: "robotic", name: "COMS4773W Computational Aspects of Robotics", icon: "fa-solid fa-robot" },
  ];
  let loading = false;
  let selectedCurve = "all";
  let activeCourseSlugs = new Set();
  let catalogPromise = null;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const reader = () => window.__blogReadingHistory;
  const courseBySlug = (slug) => COURSES.find((course) => course.slug === slug) || null;
  const courseByName = (name) => COURSES.find((course) => course.name === name) || null;

  const loadCourseCatalog = async () => {
    if (!catalogPromise) {
      catalogPromise = fetch("/blog/search.json", { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error("Course catalog could not be loaded");
          return response.json();
        })
        .then((posts) =>
          (Array.isArray(posts) ? posts : []).flatMap((post) => {
            const course = (post.categories || []).map(courseByName).find(Boolean);
            if (!course) return [];
            return [{
              course_slug: course.slug,
              post_path: safePostPath(post.url),
              post_title: post.title || safePostPath(post.url),
              post_url: `${window.location.origin}${safePostPath(post.url)}`,
            }];
          }),
        )
        .catch((error) => {
          catalogPromise = null;
          throw error;
        });
    }
    return catalogPromise;
  };

  const refreshScrollIndicator = () => {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scroll"));
      const percent = document.querySelector(".tool-scroll-to-top .percent");
      if (percent && !/^\d+$/.test(percent.textContent.trim())) {
        percent.textContent = "0";
        percent.style.visibility = "hidden";
      }
    });
  };

  const safePostPath = (value) => {
    try {
      const url = new URL(value, window.location.origin);
      if (url.origin === window.location.origin && /^\/blog\/\d{4}\/\d{2}\/\d{2}\//.test(url.pathname)) {
        return url.pathname;
      }
    } catch (_error) {
      // Fall through to the blog home.
    }
    return "/blog/";
  };

  const dateFromKey = (key) => {
    const [year, month, day] = String(key).split("-").map(Number);
    return new Date(year, month - 1, day, 23, 59, 59);
  };

  const addDays = (date, amount) => new Date(date.getTime() + amount * DAY_MS);
  const formatShortDate = (date) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);

  const formatAddedDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const snapshotForDate = (item, itemEvents, key, todayKey) => {
    const api = reader();
    const planKey = item.plan_added_at ? api.localDateKey(new Date(item.plan_added_at)) : todayKey;
    if (key < planKey) return null;
    if (key >= todayKey) return item;
    return itemEvents.filter((event) => event.event_date <= key).at(-1) || item;
  };

  const aggregateSeries = (items, events) => {
    const api = reader();
    const todayKey = api.localDateKey();
    const today = dateFromKey(todayKey);
    const start = addDays(today, -HISTORY_DAYS);
    const end = addDays(today, FORECAST_DAYS);
    const sortedEvents = [...events].sort((a, b) => a.event_date.localeCompare(b.event_date));
    const points = [];

    for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
      const key = api.localDateKey(cursor);
      const values = items
        .map((item) => {
          const itemEvents = sortedEvents.filter((event) => event.post_path === item.post_path);
          const snapshot = snapshotForDate(item, itemEvents, key, todayKey);
          return snapshot
            ? api.decayedMastery(snapshot.chapter_progress, cursor, snapshot.recorded_at || item.last_read_at)
            : null;
        })
        .filter((value) => value !== null);
      const mastery = values.length
        ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
        : 0;
      points.push({ date: new Date(cursor), key, mastery, forecast: key > todayKey });
    }
    return points;
  };

  const chartMarkup = (series, id, title) => {
    const width = 720;
    const height = 242;
    const left = 46;
    const right = 20;
    const top = 22;
    const bottom = 36;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const x = (position) => left + (position / Math.max(1, series.length - 1)) * plotWidth;
    const y = (value) => top + (1 - value / 100) * plotHeight;
    const todayIndex = Math.max(
      0,
      series.findIndex((point) => !point.forecast && point.key === reader().localDateKey()),
    );
    const history = series.slice(0, todayIndex + 1);
    const forecast = series.slice(todayIndex);
    const historyPoints = history.map((point, index) => `${x(index)},${y(point.mastery)}`).join(" ");
    const forecastPoints = forecast
      .map((point, index) => `${x(todayIndex + index)},${y(point.mastery)}`)
      .join(" ");
    const areaPoints = `${left},${top + plotHeight} ${historyPoints} ${x(todayIndex)},${top + plotHeight}`;
    const gradientId = `learning-curve-${id}`;
    const todayPoint = series[todayIndex] || series.at(-1);
    const warningY = y(50);

    return `
      <div class="blog-learning-chart-wrap">
        <svg class="blog-learning-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Mastery retention curve for ${escapeHtml(title)}">
          <defs>
            <linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stop-color="#6f8cff" stop-opacity="0.32"></stop>
              <stop offset="1" stop-color="#6f8cff" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <rect class="blog-learning-danger-zone" x="${left}" y="${warningY}" width="${plotWidth}" height="${top + plotHeight - warningY}" rx="4"></rect>
          <text class="blog-learning-axis-title" x="${left}" y="13">Mastery (%)</text>
          ${[0, 50, 100]
            .map(
              (tick) => `
                <line class="blog-learning-grid" x1="${left}" x2="${width - right}" y1="${y(tick)}" y2="${y(tick)}"></line>
                <text class="blog-learning-y-label" x="${left - 9}" y="${y(tick) + 4}" text-anchor="end">${tick}</text>
              `,
            )
            .join("")}
          <polygon points="${areaPoints}" fill="url(#${gradientId})"></polygon>
          <line class="blog-learning-warning-line" x1="${left}" x2="${width - right}" y1="${warningY}" y2="${warningY}"></line>
          <text class="blog-learning-warning-label" x="${width - right - 4}" y="${warningY - 6}" text-anchor="end">50% review threshold</text>
          <polyline class="blog-learning-curve-history" points="${historyPoints}"></polyline>
          ${forecast.length > 1 ? `<polyline class="blog-learning-curve-forecast" points="${forecastPoints}"></polyline>` : ""}
          <line class="blog-learning-today-line" x1="${x(todayIndex)}" x2="${x(todayIndex)}" y1="${top}" y2="${top + plotHeight}"></line>
          <circle class="blog-learning-today-point" cx="${x(todayIndex)}" cy="${y(todayPoint?.mastery || 0)}" r="5"><title>Today: ${todayPoint?.mastery || 0}%</title></circle>
          <text class="blog-learning-x-label" x="${left}" y="${height - 8}" text-anchor="start">${formatShortDate(series[0].date)}</text>
          <text class="blog-learning-x-label is-today" x="${x(todayIndex)}" y="${height - 8}" text-anchor="middle">Today</text>
          <text class="blog-learning-x-label" x="${width - right}" y="${height - 8}" text-anchor="end">${formatShortDate(series.at(-1).date)}</text>
        </svg>
      </div>
    `;
  };

  const average = (items, selector) =>
    items.length
      ? Math.round(items.reduce((sum, item) => sum + selector(item), 0) / items.length)
      : 0;

  const signedOutMarkup = () => `
    <section class="blog-learning-auth-card">
      <span class="blog-learning-auth-icon"><i class="fa-brands fa-github" aria-hidden="true"></i></span>
      <p class="blog-learning-eyebrow">PRIVATE STUDY SPACE</p>
      <h2>Sign in to view My Learning</h2>
      <p>Your course plans, chapter completion, and mastery curves are visible only to your GitHub account.</p>
      <button type="button" data-learning-action="signin"><i class="fa-brands fa-github" aria-hidden="true"></i> Continue with GitHub</button>
    </section>
  `;

  const loadingMarkup = () => `
    <div class="blog-learning-loading" aria-live="polite">
      <span></span><span></span><span></span><p>Loading your course plans…</p>
    </div>
  `;

  const coursePanelMarkup = (course, items, series) => {
    const completion = average(items, (item) => Number(item.completion) || 0);
    const mastery = average(items, (item) => item.currentMastery || 0);
    return `
      <div class="blog-learning-curve-panel ${selectedCurve === course.slug ? "is-active" : ""}" data-learning-curve-panel="${course.slug}" ${selectedCurve === course.slug ? "" : "hidden"}>
        <div class="blog-learning-curve-heading">
          <div><span>${escapeHtml(course.name)}</span><strong>${completion}% course progress</strong></div>
          <div><span>Current mastery</span><strong>${mastery}%</strong></div>
        </div>
        ${items.length ? chartMarkup(series, course.slug, course.name) : '<div class="blog-learning-curve-empty">Add a course article to begin this curve.</div>'}
      </div>
    `;
  };

  const articleMarkup = (item) => {
    const path = safePostPath(item.post_path);
    const completion = Math.max(0, Math.min(100, Number(item.completion) || 0));
    const needsReview = item.currentMastery < 50;
    return `
      <article class="blog-learning-article-card ${needsReview ? "is-mastery-warning" : ""}">
        <header>
          <div><span class="blog-learning-plan-date">Course added ${escapeHtml(formatAddedDate(item.plan_added_at))}</span><h4><a href="${escapeHtml(path)}">${escapeHtml(item.post_title || path)}</a></h4></div>
        </header>
        ${needsReview ? '<div class="blog-learning-mastery-alert"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i><span>Average mastery is below 50%. Review recommended.</span></div>' : ""}
        <div class="blog-learning-card-metrics">
          <div><span><b>Completion</b><strong>${completion}%</strong></span><div class="blog-learning-progress"><span style="width:${completion}%"></span></div></div>
          <div class="is-mastery"><span><b>Current Mastery</b><strong>${item.currentMastery}%</strong></span><div class="blog-learning-progress"><span style="width:${item.currentMastery}%"></span></div></div>
        </div>
        <footer><a href="${escapeHtml(path)}">Continue Learning <i class="fa-regular fa-arrow-right" aria-hidden="true"></i></a></footer>
      </article>
    `;
  };

  const courseSectionMarkup = (course, items) => {
    const completion = average(items, (item) => Number(item.completion) || 0);
    const mastery = average(items, (item) => item.currentMastery || 0);
    const warningCount = items.filter((item) => item.currentMastery < 50).length;
    return `
      <section class="blog-learning-course" data-course="${course.slug}">
        <header class="blog-learning-course-header">
          <div class="blog-learning-course-title"><span><i class="${course.icon}" aria-hidden="true"></i></span><div><p>COURSE PLAN</p><h3>${escapeHtml(course.name)}</h3></div></div>
          <div class="blog-learning-course-stats">
            <span><b>${completion}%</b> progress</span>
            <span><b>${mastery}%</b> mastery</span>
            <span><b>${items.length}</b> article${items.length === 1 ? "" : "s"}</span>
            ${warningCount ? `<span class="is-warning"><b>${warningCount}</b> need${warningCount === 1 ? "s" : ""} review</span>` : ""}
            <button type="button" data-learning-action="remove-course" data-learning-course="${course.slug}"><i class="fa-regular fa-bookmark-slash" aria-hidden="true"></i> Remove Course</button>
          </div>
        </header>
        ${items.length ? `<div class="blog-learning-article-list">${items.map(articleMarkup).join("")}</div>` : '<div class="blog-learning-course-empty">This course has no published articles yet. New articles will appear here automatically.</div>'}
      </section>
    `;
  };

  const reviewWarningMarkup = (items) => {
    const warnings = items.filter((item) => item.currentMastery < 50);
    if (!warnings.length) return "";
    return `
      <section class="blog-learning-review-warning" role="status">
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <div>
          <strong>${warnings.length} article${warnings.length === 1 ? "" : "s"} below the 50% mastery threshold</strong>
          <p>${warnings.map((item) => `<a href="${escapeHtml(safePostPath(item.post_path))}">${escapeHtml(item.post_title)}</a>`).join(" · ")}</p>
        </div>
      </section>
    `;
  };

  const activateCurve = (key) => {
    selectedCurve = key === "all" || activeCourseSlugs.has(key) ? key : "all";
    document.querySelectorAll("[data-learning-curve]").forEach((button) => {
      const active = button.dataset.learningCurve === selectedCurve;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-learning-curve-panel]").forEach((panel) => {
      const active = panel.dataset.learningCurvePanel === selectedCurve;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
  };

  const loadDashboard = async () => {
    const mount = document.querySelector("#blog-learning-dashboard");
    if (!mount || loading) return;
    const api = reader();
    if (!api || !api.getClient()) {
      mount.innerHTML = loadingMarkup();
      return;
    }
    const session = api.getSession();
    if (!session) {
      mount.innerHTML = signedOutMarkup();
      refreshScrollIndicator();
      return;
    }

    loading = true;
    mount.innerHTML = loadingMarkup();
    const client = api.getClient();
    let planResult;
    let historyResult;
    let catalog;
    try {
      [planResult, historyResult, catalog] = await Promise.all([
        client.from("course_plans").select("course_slug,enrolled_at").order("enrolled_at", { ascending: false }),
        client
          .from("reading_history")
          .select("post_path,post_title,post_url,course_slug,completion,mastery,chapter_progress,last_read_at")
          .limit(1000),
        loadCourseCatalog(),
      ]);
    } catch (_error) {
      planResult = { error: new Error("Course catalog unavailable") };
    }

    if (planResult?.error || historyResult?.error || !catalog) {
      mount.innerHTML = '<div class="blog-learning-error"><i class="fa-regular fa-cloud-exclamation"></i><h2>Your course plans could not be loaded</h2><p>Please refresh the page and try again.</p></div>';
      loading = false;
      refreshScrollIndicator();
      return;
    }

    const enrolledCourses = (planResult.data || [])
      .map((plan) => ({ ...courseBySlug(plan.course_slug), enrolled_at: plan.enrolled_at }))
      .filter((course) => course.slug);
    activeCourseSlugs = new Set(enrolledCourses.map((course) => course.slug));
    const enrolledAt = new Map(enrolledCourses.map((course) => [course.slug, course.enrolled_at]));
    const historyByPath = new Map((historyResult.data || []).map((item) => [safePostPath(item.post_path), item]));
    const courseItems = catalog
      .filter((post) => activeCourseSlugs.has(post.course_slug))
      .map((post) => ({
        completion: 0,
        mastery: 0,
        chapter_progress: {},
        last_read_at: null,
        ...(historyByPath.get(post.post_path) || {}),
        ...post,
        plan_added_at: enrolledAt.get(post.course_slug),
      }));
    let events = [];
    const paths = courseItems.map((item) => item.post_path);
    if (paths.length) {
      const { data, error } = await client
        .from("learning_mastery_history")
        .select("post_path,event_date,chapter_progress,completion,mastery,recorded_at")
        .in("post_path", paths)
        .order("event_date", { ascending: true });
      if (!error) events = data || [];
    }

    if (!mount.isConnected || api.getSession()?.user?.id !== session.user.id) {
      loading = false;
      loadDashboard();
      return;
    }

    const metadata = session.user.user_metadata || {};
    const displayName = metadata.user_name || metadata.preferred_username || metadata.name || "GitHub User";
    const avatar = typeof metadata.avatar_url === "string" && /^https:\/\/avatars\.githubusercontent\.com\//.test(metadata.avatar_url)
      ? metadata.avatar_url
      : "";
    const today = new Date();
    const enriched = courseItems.map((item) => ({
      ...item,
      currentMastery: api.decayedMastery(item.chapter_progress, today, item.last_read_at),
    }));
    const totalCompletion = average(enriched, (item) => Number(item.completion) || 0);
    const totalMastery = average(enriched, (item) => item.currentMastery || 0);
    const overallSeries = enriched.length ? aggregateSeries(enriched, events) : [];
    const courseGroups = Object.fromEntries(
      COURSES.map((course) => [course.slug, enriched.filter((item) => item.course_slug === course.slug)]),
    );

    mount.innerHTML = `
      <header class="blog-learning-hero">
        <div class="blog-learning-profile">
          ${avatar ? `<img src="${escapeHtml(avatar)}" alt="">` : '<span><i class="fa-brands fa-github" aria-hidden="true"></i></span>'}
          <div><p class="blog-learning-eyebrow">SEMESTER LEARNING ORBIT</p><h2>${escapeHtml(displayName)}'s Learning Space</h2></div>
        </div>
        <button type="button" class="blog-learning-account" data-learning-action="account"><i class="fa-regular fa-user-gear" aria-hidden="true"></i> Account & History</button>
      </header>
      <section class="blog-learning-summary" aria-label="Semester study plan overview">
        <article><span>Active Courses</span><strong>${enrolledCourses.length}</strong><small>/ ${COURSES.length}</small></article>
        <article><span>Course Articles</span><strong>${enriched.length}</strong><small>total</small></article>
        <article><span>Overall Completion</span><strong>${totalCompletion}</strong><small>%</small></article>
        <article><span>Current Mastery</span><strong>${totalMastery}</strong><small>%</small></article>
      </section>
      ${reviewWarningMarkup(enriched)}
      <section class="blog-learning-curve-lab">
        <header>
          <div><p class="blog-learning-eyebrow">RETENTION VIEW</p><h3>Forgetting Curves</h3></div>
          <div class="blog-learning-curve-tabs" role="group" aria-label="Choose a course retention curve">
            <button type="button" data-learning-curve="all">All Courses</button>
            ${enrolledCourses.map((course) => `<button type="button" data-learning-curve="${course.slug}">${escapeHtml(course.name)}</button>`).join("")}
          </div>
        </header>
        <div class="blog-learning-explainer"><i class="fa-regular fa-wave-sine" aria-hidden="true"></i><p>Mastery decays daily as <code>R(t) = R₀ · e<sup>−t/7</sup></code>. Solid lines show history; dotted lines forecast the next seven days.</p></div>
        <div class="blog-learning-curve-panel" data-learning-curve-panel="all">
          <div class="blog-learning-curve-heading"><div><span>Semester</span><strong>${totalCompletion}% overall progress</strong></div><div><span>Current mastery</span><strong>${totalMastery}%</strong></div></div>
          ${enriched.length ? chartMarkup(overallSeries, "all", "all courses") : '<div class="blog-learning-curve-empty">Add a course to begin your semester curve.</div>'}
        </div>
        ${enrolledCourses.map((course) => coursePanelMarkup(course, courseGroups[course.slug], aggregateSeries(courseGroups[course.slug], events))).join("")}
      </section>
      <div class="blog-learning-course-list">
        ${enrolledCourses.length ? enrolledCourses.map((course) => courseSectionMarkup(course, courseGroups[course.slug])).join("") : '<div class="blog-learning-course-empty is-standalone">No course plan yet. Open a course article and choose Add Course.</div>'}
      </div>
    `;
    loading = false;
    activateCurve(selectedCurve);
    refreshScrollIndicator();
  };

  document.addEventListener("click", async (event) => {
    const curveButton = event.target.closest("[data-learning-curve]");
    if (curveButton) {
      activateCurve(curveButton.dataset.learningCurve);
      return;
    }

    const button = event.target.closest("[data-learning-action]");
    if (!button) return;
    const api = reader();
    const action = button.dataset.learningAction;
    if (action === "signin") api?.signIn();
    if (action === "account") document.querySelector(".blog-reader-trigger")?.click();
    if (action === "remove-course" && api) {
      const course = courseBySlug(button.dataset.learningCourse);
      if (!course) return;
      button.disabled = true;
      const originalMarkup = button.innerHTML;
      button.innerHTML = '<i class="fa-regular fa-spinner-third fa-spin" aria-hidden="true"></i>';
      const result = await api.setCoursePlan(course, false);
      if (result.error) {
        button.disabled = false;
        button.innerHTML = originalMarkup;
      } else {
        loadDashboard();
      }
    }
  });

  document.addEventListener("blog-reader:state", loadDashboard);
  document.addEventListener("swup:contentReplaced", loadDashboard);
  document.addEventListener("swup:pageView", loadDashboard);
  loadDashboard();
})();
