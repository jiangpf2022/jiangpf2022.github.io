(function () {
  "use strict";

  const DAY_MS = 86400000;
  const HISTORY_DAYS = 13;
  const FORECAST_DAYS = 7;
  let loading = false;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const reader = () => window.__blogReadingHistory;

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

  const buildSeries = (item, itemEvents) => {
    const api = reader();
    const todayKey = api.localDateKey();
    const today = dateFromKey(todayKey);
    const earliest = addDays(today, -HISTORY_DAYS);
    const planDate = item.plan_added_at ? new Date(item.plan_added_at) : earliest;
    const start = planDate > earliest ? dateFromKey(api.localDateKey(planDate)) : earliest;
    const end = addDays(today, FORECAST_DAYS);
    const sortedEvents = [...itemEvents].sort((a, b) => a.event_date.localeCompare(b.event_date));
    const points = [];

    for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
      const key = api.localDateKey(cursor);
      const isTodayOrFuture = key >= todayKey;
      let snapshot = null;
      if (isTodayOrFuture) {
        snapshot = item;
      } else {
        snapshot = sortedEvents.filter((event) => event.event_date <= key).at(-1) || null;
      }
      const mastery = snapshot
        ? api.decayedMastery(snapshot.chapter_progress, cursor, snapshot.recorded_at || item.last_read_at)
        : 0;
      points.push({ date: new Date(cursor), key, mastery, forecast: key > todayKey });
    }
    return points;
  };

  const chartMarkup = (series, index, title) => {
    const width = 640;
    const height = 222;
    const left = 42;
    const right = 18;
    const top = 18;
    const bottom = 34;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const x = (position) => left + (position / Math.max(1, series.length - 1)) * plotWidth;
    const y = (value) => top + (1 - value / 100) * plotHeight;
    const todayIndex = Math.max(0, series.findIndex((point) => !point.forecast && point.key === reader().localDateKey()));
    const history = series.slice(0, todayIndex + 1);
    const forecast = series.slice(todayIndex);
    const historyPoints = history.map((point, position) => `${x(position)},${y(point.mastery)}`).join(" ");
    const forecastPoints = forecast
      .map((point, position) => `${x(todayIndex + position)},${y(point.mastery)}`)
      .join(" ");
    const areaPoints = `${left},${top + plotHeight} ${historyPoints} ${x(todayIndex)},${top + plotHeight}`;
    const gradientId = `learning-curve-${index}`;
    const todayPoint = series[todayIndex] || series.at(-1);

    return `
      <div class="blog-learning-chart-wrap">
        <svg class="blog-learning-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Mastery retention curve for ${escapeHtml(title)}">
          <defs>
            <linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stop-color="#6f8cff" stop-opacity="0.3"></stop>
              <stop offset="1" stop-color="#6f8cff" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <text class="blog-learning-axis-title" x="${left}" y="11">Mastery (%)</text>
          ${[0, 50, 100]
            .map(
              (tick) => `
                <line class="blog-learning-grid" x1="${left}" x2="${width - right}" y1="${y(tick)}" y2="${y(tick)}"></line>
                <text class="blog-learning-y-label" x="${left - 9}" y="${y(tick) + 4}" text-anchor="end">${tick}</text>
              `,
            )
            .join("")}
          <polygon points="${areaPoints}" fill="url(#${gradientId})"></polygon>
          <polyline class="blog-learning-curve-history" points="${historyPoints}"></polyline>
          ${forecast.length > 1 ? `<polyline class="blog-learning-curve-forecast" points="${forecastPoints}"></polyline>` : ""}
          <line class="blog-learning-today-line" x1="${x(todayIndex)}" x2="${x(todayIndex)}" y1="${top}" y2="${top + plotHeight}"></line>
          <circle class="blog-learning-today-point" cx="${x(todayIndex)}" cy="${y(todayPoint?.mastery || 0)}" r="5">
            <title>Today: ${todayPoint?.mastery || 0}%</title>
          </circle>
          <text class="blog-learning-x-label" x="${left}" y="${height - 8}" text-anchor="start">${formatShortDate(series[0].date)}</text>
          <text class="blog-learning-x-label is-today" x="${x(todayIndex)}" y="${height - 8}" text-anchor="middle">Today</text>
          <text class="blog-learning-x-label" x="${width - right}" y="${height - 8}" text-anchor="end">${formatShortDate(series.at(-1).date)}</text>
        </svg>
      </div>
    `;
  };

  const signedOutMarkup = () => `
    <section class="blog-learning-auth-card">
      <span class="blog-learning-auth-icon"><i class="fa-brands fa-github" aria-hidden="true"></i></span>
      <p class="blog-learning-eyebrow">PRIVATE STUDY SPACE</p>
      <h2>Sign in to view My Learning</h2>
      <p>Your study plans, chapter completion, and mastery curves are visible only to your GitHub account.</p>
      <button type="button" data-learning-action="signin"><i class="fa-brands fa-github" aria-hidden="true"></i> Continue with GitHub</button>
    </section>
  `;

  const loadingMarkup = () => `
    <div class="blog-learning-loading" aria-live="polite">
      <span></span><span></span><span></span><p>Loading your study plans…</p>
    </div>
  `;

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
    const { data: plans, error: plansError } = await client
      .from("reading_history")
      .select("post_path,post_title,post_url,completion,mastery,chapter_progress,plan_added_at,last_read_at")
      .eq("in_plan", true)
      .order("plan_added_at", { ascending: false });

    if (plansError) {
      mount.innerHTML = `
        <div class="blog-learning-error"><i class="fa-regular fa-cloud-exclamation"></i><h2>Your study plans could not be loaded</h2><p>Please refresh the page and try again.</p></div>
      `;
      loading = false;
      refreshScrollIndicator();
      return;
    }

    let events = [];
    const paths = (plans || []).map((item) => item.post_path);
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

    const user = session.user;
    const metadata = user.user_metadata || {};
    const displayName = metadata.user_name || metadata.preferred_username || metadata.name || "GitHub User";
    const avatar = typeof metadata.avatar_url === "string" && /^https:\/\/avatars\.githubusercontent\.com\//.test(metadata.avatar_url)
      ? metadata.avatar_url
      : "";
    const enriched = (plans || []).map((item) => {
      const series = buildSeries(item, events.filter((event) => event.post_path === item.post_path));
      const todayPoint = series.find((point) => point.key === api.localDateKey());
      return { ...item, series, currentMastery: todayPoint?.mastery || 0 };
    });
    const averageCompletion = enriched.length
      ? Math.round(enriched.reduce((sum, item) => sum + (Number(item.completion) || 0), 0) / enriched.length)
      : 0;
    const averageMastery = enriched.length
      ? Math.round(enriched.reduce((sum, item) => sum + item.currentMastery, 0) / enriched.length)
      : 0;

    mount.innerHTML = `
      <header class="blog-learning-hero">
        <div class="blog-learning-profile">
          ${avatar ? `<img src="${escapeHtml(avatar)}" alt="">` : '<span><i class="fa-brands fa-github" aria-hidden="true"></i></span>'}
          <div><p class="blog-learning-eyebrow">PERSONAL LEARNING ORBIT</p><h2>${escapeHtml(displayName)}'s Learning Space</h2></div>
        </div>
        <button type="button" class="blog-learning-account" data-learning-action="account"><i class="fa-regular fa-user-gear" aria-hidden="true"></i> Account & History</button>
      </header>
      <section class="blog-learning-summary" aria-label="Study plan overview">
        <article><span>Planned Articles</span><strong>${enriched.length}</strong><small>total</small></article>
        <article><span>Average Completion</span><strong>${averageCompletion}</strong><small>%</small></article>
        <article><span>Current Mastery</span><strong>${averageMastery}</strong><small>%</small></article>
      </section>
      <div class="blog-learning-explainer">
        <i class="fa-regular fa-wave-sine" aria-hidden="true"></i>
        <p>Current mastery decays daily as <code>R(t) = R₀ · e<sup>−t/7</sup></code>. Completing a chapter, updating its mastery, or selecting “Review Today” starts a new retention period. The dotted curve forecasts the next seven days.</p>
      </div>
      ${
        enriched.length
          ? `<div class="blog-learning-plan-list">${enriched
              .map((item, index) => {
                const path = safePostPath(item.post_path);
                const completion = Math.max(0, Math.min(100, Number(item.completion) || 0));
                return `
                  <article class="blog-learning-plan-card">
                    <header>
                      <div><span class="blog-learning-plan-date">Added ${escapeHtml(formatAddedDate(item.plan_added_at))}</span><h3><a href="${escapeHtml(path)}">${escapeHtml(item.post_title || path)}</a></h3></div>
                      <button type="button" data-learning-action="remove" data-learning-path="${escapeHtml(path)}" data-learning-title="${escapeHtml(item.post_title || path)}"><i class="fa-regular fa-bookmark-slash" aria-hidden="true"></i> Remove from Plan</button>
                    </header>
                    <div class="blog-learning-card-metrics">
                      <div><span><b>Completion</b><strong>${completion}%</strong></span><div class="blog-learning-progress"><span style="width:${completion}%"></span></div></div>
                      <div class="is-mastery"><span><b>Current Mastery</b><strong>${item.currentMastery}%</strong></span><div class="blog-learning-progress"><span style="width:${item.currentMastery}%"></span></div></div>
                    </div>
                    ${chartMarkup(item.series, index, item.post_title || path)}
                    <footer><span><i class="fa-regular fa-circle-info" aria-hidden="true"></i> Solid: history · Dotted: forecast</span><a href="${escapeHtml(path)}">Continue Learning <i class="fa-regular fa-arrow-right" aria-hidden="true"></i></a></footer>
                  </article>
                `;
              })
              .join("")}</div>`
          : `<section class="blog-learning-empty"><i class="fa-regular fa-books"></i><h2>Your study plan is empty</h2><p>Open any article and select “Add to Study Plan” to see it here.</p><a href="/blog/">Browse Articles</a></section>`
      }
    `;
    loading = false;
    refreshScrollIndicator();
  };

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-learning-action]");
    if (!button) return;
    const api = reader();
    const action = button.dataset.learningAction;
    if (action === "signin") api?.signIn();
    if (action === "account") document.querySelector(".blog-reader-trigger")?.click();
    if (action === "remove" && api) {
      button.disabled = true;
      button.textContent = "Removing…";
      const path = safePostPath(button.dataset.learningPath);
      const result = await api.setLearningPlan(
        {
          path,
          title: button.dataset.learningTitle || path,
          url: `${window.location.origin}${path}`,
        },
        false,
      );
      if (result.error) {
        button.disabled = false;
        button.textContent = "Could not remove — try again";
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
