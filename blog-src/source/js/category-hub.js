(function () {
  "use strict";

  const DAY_MS = 86400000;
  const HISTORY_DAYS = 13;
  const FORECAST_DAYS = 7;
  const LEARNING_PAGE_SIZE = 6;
  const CATEGORIES = {
    "Mathematical-Modeling": {
      name: "Mathematical Modeling",
      eyebrow: "MODELING COURSE",
      course: { slug: "mathematical-modeling", name: "Mathematical Modeling" },
      icon: "fa-solid fa-chart-line",
      cover: "/blog/images/mathematical-modeling-nyc.webp",
      description: "A growing blog path from first models to optimization, differential equations, data, competition cases, and scientific writing. Published posts are open now; working drafts remain under author review.",
      topics: ["Guided Blogs", "Zero to Competition", "Models & Evidence"],
    },
    "COMS4776W-Neural-Networks-Deep-Learning": {
      name: "COMS4776W Neural Networks & Deep Learning",
      eyebrow: "COLUMBIA COURSE",
      course: { slug: "deep-learning", name: "COMS4776W Neural Networks & Deep Learning" },
      icon: "fa-solid fa-network-wired",
      cover: "/blog/images/columbia-neural-networks-deep-learning-cover.png",
      description: "Build neural networks from mathematical foundations to modern architectures. This course connects model design, optimization, representation learning, and the practical reasoning needed to understand why deep networks work.",
      topics: ["Foundations", "Optimization", "Neural Networks"],
    },
    "COMS6998E-LLM-Based-Generative-AI": {
      name: "COMS6998E LLM-Based Generative AI",
      eyebrow: "COLUMBIA COURSE",
      course: { slug: "llm-generative-ai", name: "COMS6998E LLM-Based Generative AI" },
      icon: "fa-solid fa-sparkles",
      cover: "/blog/images/columbia-low-memorial-library.jpg",
      description: "A systems-first path through generative AI: deep-learning fundamentals, large-model training, hardware efficiency, distributed optimization, evaluation, and the engineering choices behind production LLMs.",
      topics: ["LLM Systems", "Distributed Training", "Generative AI"],
    },
    "COMS-W4111-Introduction-to-Databases": {
      name: "COMS W4111 Introduction to Databases",
      eyebrow: "COLUMBIA COURSE",
      course: { slug: "databases", name: "COMS W4111 Introduction to Databases" },
      icon: "fa-solid fa-database",
      cover: "/blog/images/coms-w4111-introduction-to-databases.jpg",
      description: "A structured introduction to database systems, relational design, SQL, entity-relationship modeling, keys, relational algebra, joins, and the optimizer decisions that turn declarative questions into efficient execution plans.",
      topics: ["Relational Model", "Database Design", "SQL & Algebra"],
    },
    "Options-Trading-101": {
      name: "Options Trading 101",
      eyebrow: "DERIVATIVES COURSE",
      course: { slug: "options-trading-101", name: "Options Trading 101" },
      icon: "fa-solid fa-chart-candlestick",
      cover: "/blog/images/options-trading-101-cover.svg",
      description: "A practical introduction to how option markets work: two-sided quoting, fair value and edge, futures and option contracts, payoff engineering, put-call parity, volatility, Greeks, and dynamic hedging.",
      topics: ["Market Making", "Options Pricing", "Greeks & Hedging"],
    },
    "Paper-Reading": {
      name: "Paper Reading",
      eyebrow: "RESEARCH LIBRARY",
      icon: "fa-solid fa-file-magnifying-glass",
      cover: "/blog/images/2024-6-4-2.png",
      description: "Research-paper notes that reconstruct the problem, mathematical formulation, core method, and practical implications. Each entry is written as a reusable technical reading rather than a short paper summary.",
      topics: ["Computer Vision", "Geometry", "Research Notes"],
    },
    "ShanghaiTech-University": {
      name: "ShanghaiTech University",
      eyebrow: "COURSE ARCHIVE",
      icon: "fa-solid fa-graduation-cap",
      cover: "/blog/images/2024-11-12-1.jpeg",
      description: "A consolidated archive of course notes, exam reviews, derivations, and reference sheets from my undergraduate study, spanning mathematics, algorithms, artificial intelligence, and machine learning.",
      topics: ["Course Notes", "Exam Review", "Foundations"],
    },
    "EECS182-Deep-Neural-Networks": {
      name: "EECS182 Deep Neural Networks",
      eyebrow: "UC BERKELEY COURSE",
      icon: "fa-solid fa-brain-circuit",
      cover: "/blog/images/2025-4-21-1.png",
      description: "A reorganized deep-learning reference covering optimization, recurrent and sequence models, attention, Transformers, fine-tuning, representation learning, meta-learning, and modern generative models.",
      topics: ["Deep Learning", "Transformers", "Generative Models"],
    },
    "MATH113-Introduction-to-Abstract-Algebra": {
      name: "MATH113 Introduction to Abstract Algebra",
      eyebrow: "MATHEMATICS COURSE",
      icon: "fa-solid fa-function",
      cover: "/blog/images/2024-11-12-1.jpeg",
      description: "A proof-oriented course archive connecting modular arithmetic, groups, homomorphisms, quotient structures, group actions, rings, fields, ideals, and factorization.",
      topics: ["Group Theory", "Rings & Fields", "Proofs"],
    },
    "CS182-Machine-Learning": {
      name: "CS182 Machine Learning",
      eyebrow: "MACHINE LEARNING COURSE",
      icon: "fa-solid fa-chart-network",
      cover: "/blog/images/2024-6-4-8.png",
      description: "A comprehensive machine-learning reference spanning Bayesian decision theory, estimation, linear classifiers, SVMs, dimensionality reduction, clustering, neural networks, ensembles, and model assessment.",
      topics: ["Statistical Learning", "Classical ML", "Model Evaluation"],
    },
  };

  const MODELING_SYLLABUS = [
    [1, "From Reality to a Model", 1, "Turn a vague problem into a purpose, boundary, variables, assumptions, equations, a solution, validation, and an actionable conclusion."],
    [2, "AI as a Modeling Sparring Partner", 1, "Use AI to challenge assumptions, inspect ideas, and test a model while keeping judgment and evidence in human hands."],
    [3, "Visual Evidence", 1, "Choose charts, diagrams, colors, and layouts so that every figure supports a specific modeling claim."],
    [4, "Linear, Quadratic & Conic Optimization", 1, "Formulate and solve linear programs, quadratic programs, and second-order cone programs."],
    [5, "Advanced Convex Optimization", 3, "Explore more general convex formulations and the algorithms beyond the introductory models."],
    [6, "Multi-Objective & Robust Optimization", 1, "Balance competing goals and make decisions that remain useful under uncertainty."],
    [7, "Intelligent Optimization", 1, "Understand genetic algorithms, particle swarm optimization, and simulated annealing."],
    [8, "Pose Graph Optimization", 2, "Work through a complete pose-graph optimization case from problem formulation to interpretation."],
    [9, "Differential Equations 101", 1, "Build basic differential-equation models from rates of change and initial conditions."],
    [10, "Differential Equations II", 1, "Extend basic models and learn to compare their predictions with observations."],
    [11, "Advanced Differential Equations", 2, "Study more complex dynamics and the assumptions required to model them."],
    [12, "Competition ODE Cases", 3, "Analyze advanced differential-equation cases from mathematical-modeling competitions."],
    [13, "Time Series 101", 1, "Introduce time-indexed data, trends, seasonality, and forecasting baselines."],
    [14, "Advanced Time Series", 2, "Build and assess richer forecasts under changing patterns and uncertainty."],
    [15, "Data Preparation 101", 1, "Clean, organize, and document data before fitting a model."],
    [16, "Advanced Data Analysis", 2, "Extract and validate useful evidence from complex datasets."],
    [17, "Evaluation Models 101", 1, "Design indicators and combine them into a transparent, defensible evaluation."],
    [18, "Financial Market Volatility", 3, "Investigate a full modeling case on fluctuations in financial markets."],
    [19, "Writing the Abstract", 1, "Communicate the problem, method, evidence, results, and limitations concisely."],
    [20, "Writing the Main Text", 1, "Organize assumptions, derivations, results, and discussion into a readable report."],
    [21, "Competition Mindset & Preparation", 3, "Prepare a team workflow, make decisions under time pressure, and finish a coherent submission."],
  ];
  const MODELING_TYPES = [
    { id: "experience", label: "Experience", lessons: [1, 2, 21] },
    { id: "models", label: "Models", lessons: [4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 17] },
    { id: "writing", label: "Writing", lessons: [3, 19, 20] },
    { id: "cases", label: "Case Studies", lessons: [8, 12, 18] },
  ];

  let catalogPromise = null;
  let renderVersion = 0;
  const learningPages = new Map();
  let selectedModelingType = "experience";
  let renderedLearningPath = null;
  let learningSwipe = null;
  let suppressSwipeClickUntil = 0;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const reader = () => window.__blogReadingHistory;
  const availableToReader = (article) =>
    !article.reviewLock || (article.lessonNumber >= 2 && reader()?.isDeveloper?.() && !reader()?.isRegularPreview?.());
  const average = (items, selector) =>
    items.length ? Math.round(items.reduce((sum, item) => sum + selector(item), 0) / items.length) : 0;

  const pageConfig = () => {
    const match = window.location.pathname.match(/^\/blog\/categories\/([^/]+)\/?$/);
    return match ? CATEGORIES[decodeURIComponent(match[1])] || null : null;
  };

  const loadCatalog = () => {
    if (!catalogPromise) {
      catalogPromise = fetch("/blog/category-hub.json", { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error("Category catalog unavailable");
          return response.json();
        })
        .catch((error) => {
          catalogPromise = null;
          throw error;
        });
    }
    return catalogPromise;
  };

  const localDateKey = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const dateFromKey = (key) => {
    const [year, month, day] = String(key).split("-").map(Number);
    return new Date(year, month - 1, day, 23, 59, 59);
  };
  const addDays = (date, amount) => new Date(date.getTime() + amount * DAY_MS);
  const formatShortDate = (date) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  const formatArticleDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? ""
      : new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
  };

  const safePath = (value) => {
    try {
      const url = new URL(value, window.location.origin);
      return url.origin === window.location.origin && url.pathname.startsWith("/blog/") ? url.pathname : "/blog/";
    } catch (_error) {
      return "/blog/";
    }
  };

  const snapshotForDate = (item, events, key, todayKey) => {
    const api = reader();
    const enrolledKey = item.enrolled_at ? api.localDateKey(new Date(item.enrolled_at)) : todayKey;
    if (key < enrolledKey) return null;
    if (key >= todayKey) return item;
    return events.filter((event) => event.event_date <= key).at(-1) || item;
  };

  const aggregateSeries = (items, events) => {
    const api = reader();
    const todayKey = api?.localDateKey?.() || localDateKey();
    const today = dateFromKey(todayKey);
    const start = addDays(today, -HISTORY_DAYS);
    const end = addDays(today, FORECAST_DAYS);
    const sortedEvents = [...events].sort((a, b) => a.event_date.localeCompare(b.event_date));
    const points = [];

    for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
      const key = api?.localDateKey?.(cursor) || localDateKey(cursor);
      const values = items
        .map((item) => {
          const itemEvents = sortedEvents.filter((event) => event.post_path === item.post_path);
          const snapshot = snapshotForDate(item, itemEvents, key, todayKey);
          return snapshot
            ? api.decayedMastery(snapshot.chapter_progress, cursor, snapshot.recorded_at || item.last_read_at)
            : null;
        })
        .filter((value) => value !== null);
      points.push({
        date: new Date(cursor),
        key,
        mastery: values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0,
        forecast: key > todayKey,
      });
    }
    return points;
  };

  const chartMarkup = (series, name) => {
    const width = 720;
    const height = 244;
    const left = 46;
    const right = 20;
    const top = 22;
    const bottom = 36;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const x = (index) => left + (index / Math.max(1, series.length - 1)) * plotWidth;
    const y = (value) => top + (1 - value / 100) * plotHeight;
    const todayKey = reader()?.localDateKey?.() || localDateKey();
    const todayIndex = Math.max(0, series.findIndex((point) => point.key === todayKey));
    const history = series.slice(0, todayIndex + 1);
    const forecast = series.slice(todayIndex);
    const historyPoints = history.map((point, index) => `${x(index)},${y(point.mastery)}`).join(" ");
    const forecastPoints = forecast.map((point, index) => `${x(todayIndex + index)},${y(point.mastery)}`).join(" ");
    const areaPoints = `${left},${top + plotHeight} ${historyPoints} ${x(todayIndex)},${top + plotHeight}`;
    const warningY = y(50);
    const todayPoint = series[todayIndex] || series.at(-1);

    return `
      <div class="category-hub-chart-wrap">
        <svg class="category-hub-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Mastery retention curve for ${escapeHtml(name)}">
          <defs><linearGradient id="category-hub-curve-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6d8cff" stop-opacity=".36"></stop><stop offset="1" stop-color="#6d8cff" stop-opacity="0"></stop></linearGradient></defs>
          <rect class="category-hub-danger-zone" x="${left}" y="${warningY}" width="${plotWidth}" height="${top + plotHeight - warningY}" rx="4"></rect>
          <text class="category-hub-axis-title" x="${left}" y="13">Mastery (%)</text>
          ${[0, 50, 100].map((tick) => `<line class="category-hub-grid" x1="${left}" x2="${width - right}" y1="${y(tick)}" y2="${y(tick)}"></line><text class="category-hub-axis-label" x="${left - 9}" y="${y(tick) + 4}" text-anchor="end">${tick}</text>`).join("")}
          <polygon points="${areaPoints}" fill="url(#category-hub-curve-fill)"></polygon>
          <line class="category-hub-threshold" x1="${left}" x2="${width - right}" y1="${warningY}" y2="${warningY}"></line>
          <text class="category-hub-threshold-label" x="${width - right - 4}" y="${warningY - 6}" text-anchor="end">50% review threshold</text>
          <polyline class="category-hub-history-line" points="${historyPoints}"></polyline>
          ${forecast.length > 1 ? `<polyline class="category-hub-forecast-line" points="${forecastPoints}"></polyline>` : ""}
          <line class="category-hub-today-line" x1="${x(todayIndex)}" x2="${x(todayIndex)}" y1="${top}" y2="${top + plotHeight}"></line>
          <circle class="category-hub-today-point" cx="${x(todayIndex)}" cy="${y(todayPoint?.mastery || 0)}" r="5"></circle>
          <text class="category-hub-axis-label" x="${left}" y="${height - 8}">${formatShortDate(series[0].date)}</text>
          <text class="category-hub-axis-label is-today" x="${x(todayIndex)}" y="${height - 8}" text-anchor="middle">Today</text>
          <text class="category-hub-axis-label" x="${width - right}" y="${height - 8}" text-anchor="end">${formatShortDate(series.at(-1).date)}</text>
        </svg>
      </div>`;
  };

  const planButtonMarkup = (session, enrolled, saving = false) => {
    const label = !session ? "Sign in to Add Course" : enrolled ? "Remove Course" : "Add Entire Course";
    const icon = !session ? "fa-brands fa-github" : enrolled ? "fa-regular fa-bookmark-slash" : "fa-regular fa-bookmark";
    return `<button type="button" class="category-hub-plan-button ${enrolled ? "is-enrolled" : ""}" data-category-plan ${saving ? "disabled" : ""}><i class="${saving ? "fa-regular fa-spinner-third fa-spin" : icon}" aria-hidden="true"></i><span>${saving ? "Syncing…" : label}</span></button>`;
  };

  const heroMarkup = (config, articleCount, session, enrolled) => `
    <section class="category-hub-hero" style="--category-hub-cover:url('${escapeHtml(config.cover)}')">
      <div class="category-hub-hero-content">
        <p class="category-hub-eyebrow"><i class="${config.icon}" aria-hidden="true"></i> ${escapeHtml(config.eyebrow)}</p>
        <h1>${escapeHtml(config.name)}</h1>
        <p class="category-hub-description">${escapeHtml(config.description)}</p>
        <div class="category-hub-topics">${config.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}</div>
        ${config.course ? `<div class="category-hub-plan-row">${planButtonMarkup(session, enrolled)}<small>${enrolled ? "All current and future posts are included in My Learning." : "One choice adds every post in this course."}</small></div>` : ""}
      </div>
      <div class="category-hub-hero-count"><strong>${articleCount}</strong><span>${config.name === "Mathematical Modeling" ? `published<br>post${articleCount === 1 ? "" : "s"}` : `published<br>article${articleCount === 1 ? "" : "s"}`}</span></div>
    </section>`;

  const modelingSyllabusMarkup = (articles) => {
    const byNumber = new Map(articles.map((article) => [Number(article.lessonNumber), article]));
    const rows = [...MODELING_SYLLABUS];
    for (const article of articles) {
      const number = Number(article.lessonNumber);
      if (Number.isInteger(number) && number > 0 && !rows.some((row) => row[0] === number)) {
        rows.push([number, String(article.title || `Blog ${number}`).replace(/^Mathematical Modeling \d+\s*[-–:]\s*/, ""), Number(article.lessonLevel) || 1, article.excerpt || "Additional post in this growing course."]);
      }
    }
    rows.sort((a, b) => a[0] - b[0]);
    const publishedNumbers = rows.filter(([number]) => {
      const article = byNumber.get(number);
      return article && !article.reviewLock && safePath(article.path);
    }).map(([number]) => number);
    const readingNumbers = rows.filter(([number]) => {
      const article = byNumber.get(number);
      return article && safePath(article.path) && (!article.reviewLock || article.targetRelease);
    }).map(([number]) => number);
    const readingOrder = new Map(readingNumbers.map((number, index) => [number, index + 1]));
    const publishedCount = publishedNumbers.length;
    const developmentCount = rows.length - publishedCount;
    return `<section class="category-hub-syllabus" aria-labelledby="modeling-syllabus-heading">
      <div class="category-hub-section-heading"><div><p class="category-hub-eyebrow">PUBLISHING ROADMAP</p><h2 id="modeling-syllabus-heading">Update Plan</h2></div><span>${publishedCount} published · ${developmentCount} in development</span></div>
      <div class="category-hub-level-guide" aria-label="Blog level guide">
        <p><strong>Level 1 · From Zero</strong> For first-time contestants with no modeling background. Start with problem framing, basic models, data, validation, and clear writing, then practice completing a full submission. Preparation target: CUMCM provincial second or third prize, or MCM/ICM H award.</p>
        <p><strong>Level 2 · Competitive Practice</strong> For advancing contestants who already know all Level 1 material. Learn to choose and combine methods, test assumptions more rigorously, interpret results, and refine a model under competition time pressure. Preparation target: CUMCM provincial first prize or MCM/ICM M award.</p>
        <p><strong>Level 3 · Top-Award Preparation</strong> For teams aiming at the highest awards, with all Level 1 and Level 2 knowledge as prerequisites. Develop original approaches, handle difficult trade-offs and uncertainty, validate thoroughly, and present a convincing final paper. Preparation target: CUMCM national first or second prize, or MCM/ICM O or F award.</p>
        <small>Higher-level course content may be paid in the future. No payment is required for posts currently published.</small>
      </div>
      <div class="category-hub-syllabus-scroll" tabindex="0" aria-label="Update plan table; scroll horizontally on narrow screens">
      <table class="category-hub-syllabus-table">
        <thead><tr><th scope="col">No.</th><th scope="col">Topic &amp; Focus</th><th scope="col">Level</th><th scope="col">Status</th><th scope="col">Recommended Reading Order</th></tr></thead>
        <tbody>${rows.map(([number, title, level, focus]) => {
        const article = byNumber.get(number);
        const path = article ? safePath(article.path) : "";
        const published = Boolean(path && article && !article.reviewLock);
        const releaseDate = article?.targetRelease ? new Date(`${article.targetRelease}T00:00:00`) : null;
        const plannedStatus = releaseDate && !Number.isNaN(releaseDate.getTime())
          ? `Planned by ${releaseDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
          : null;
        return `<tr class="${published ? "is-published" : ""}"><th scope="row">${String(number).padStart(2, "0")}</th>
          <td><span class="category-hub-syllabus-topic">${path ? `<a href="${escapeHtml(path)}">${escapeHtml(title)}</a>` : escapeHtml(title)}</span><span class="category-hub-syllabus-focus">${escapeHtml(focus)}</span><details class="category-hub-syllabus-details"><summary>Focus</summary>${escapeHtml(focus)}</details></td>
          <td class="category-hub-syllabus-level">${level}</td>
          <td><span class="category-hub-syllabus-status">${published ? "Published" : plannedStatus ? `<i class="fa-solid fa-lock" aria-hidden="true"></i> ${escapeHtml(plannedStatus)}` : '<i class="fa-solid fa-lock" aria-hidden="true"></i> Locked · In Development'}</span>${published ? `<a class="category-hub-syllabus-open" href="${escapeHtml(path)}" aria-label="Open blog ${number}: ${escapeHtml(title)}">Open <i class="fa-regular fa-arrow-right" aria-hidden="true"></i></a>` : ""}</td>
          <td class="category-hub-syllabus-order">${readingOrder.get(number) || ""}</td></tr>`;
      }).join("")}</tbody>
      </table>
      </div>
    </section>`;
  };

  const modelingTypeFor = (article) => MODELING_TYPES.find((type) => type.lessons.includes(Number(article.lessonNumber)))?.id || "experience";
  const modelingTypeTabsMarkup = (articles) => `<nav class="category-hub-modeling-types" aria-label="Mathematical modeling article types">
    ${MODELING_TYPES.map((type) => `<button type="button" data-modeling-type="${type.id}" aria-pressed="${type.id === selectedModelingType}"><span>${type.label}</span><small>${articles.filter((article) => modelingTypeFor(article) === type.id).length}</small></button>`).join("")}
  </nav>`;
  const learningPageKey = (config) => config.name === "Mathematical Modeling" ? `${config.name}:${selectedModelingType}` : config.name;
  const learningViewArticles = (view) => view.config.name === "Mathematical Modeling"
    ? view.articles.filter((article) => modelingTypeFor(article) === selectedModelingType)
    : view.articles;

  const learningPageControlsMarkup = (page, totalPages) => {
    if (totalPages <= 1) return "";
    const pages = Array.from({ length: totalPages }, (_, index) => `<button type="button" data-learning-page="${index + 1}" ${page === index + 1 ? 'aria-current="page"' : ""} aria-label="Page ${index + 1}">${index + 1}</button>`).join("");
    return `<nav class="category-hub-page-controls" aria-label="Learning Path pages">
      <button type="button" data-learning-page="${page - 1}" ${page === 1 ? "disabled" : ""} aria-label="Previous page"><i class="fa-regular fa-arrow-left" aria-hidden="true"></i></button>
      <span class="category-hub-page-numbers">${pages}</span>
      <button type="button" data-learning-page="${page + 1}" ${page === totalPages ? "disabled" : ""} aria-label="Next page"><i class="fa-regular fa-arrow-right" aria-hidden="true"></i></button>
      <small>Swipe the cards to change pages</small>
    </nav>`;
  };

  const renderLearningPage = (page, scrollToPath = false) => {
    const view = renderedLearningPath;
    if (!view || pageConfig()?.name !== view.config.name) return;
    const visibleArticles = learningViewArticles(view);
    const totalPages = Math.max(1, Math.ceil(visibleArticles.length / LEARNING_PAGE_SIZE));
    const currentPage = Math.max(1, Math.min(totalPages, page));
    learningPages.set(learningPageKey(view.config), currentPage);
    const section = document.querySelector(".category-hub-curriculum");
    const grid = section?.querySelector(".category-hub-article-grid");
    if (!grid) return;
    grid.innerHTML = visibleArticles.slice((currentPage - 1) * LEARNING_PAGE_SIZE, currentPage * LEARNING_PAGE_SIZE)
      .map((article) => articleCardMarkup(article, view.config, view.enrolled)).join("");
    if (view.config.name === "Mathematical Modeling") {
      section.querySelectorAll("[data-modeling-type]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.modelingType === selectedModelingType));
      });
      const count = section.querySelector("[data-modeling-type-count]");
      const publishedCount = visibleArticles.filter((article) => !article.reviewLock).length;
      if (count) count.textContent = `${publishedCount} published · ${visibleArticles.length - publishedCount} in development`;
    }
    section.querySelector(".category-hub-page-controls")?.remove();
    grid.insertAdjacentHTML("afterend", learningPageControlsMarkup(currentPage, totalPages));
    if (scrollToPath) section.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  const metricMarkup = (label, value, suffix, icon, warning = false) => `
    <article class="category-hub-metric ${warning ? "is-warning" : ""}">
      <i class="${icon}" aria-hidden="true"></i><div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}<small>${escapeHtml(suffix)}</small></strong></div>
    </article>`;

  const courseOverviewMarkup = (items, enrolled, series) => {
    const completion = enrolled ? average(items, (item) => item.completion) : 0;
    const mastery = enrolled ? average(items, (item) => item.currentMastery) : 0;
    const completed = enrolled ? items.filter((item) => item.completion >= 100).length : 0;
    const warning = enrolled && mastery < 50;
    return `
      <section class="category-hub-overview">
        <div class="category-hub-section-heading"><div><p class="category-hub-eyebrow">COURSE ANALYTICS</p><h2>Your Progress</h2></div><span>${enrolled ? "Synced with My Learning" : "Add this course to start tracking"}</span></div>
        <div class="category-hub-metrics">
          ${metricMarkup("Completion", completion, "%", "fa-regular fa-chart-line-up")}
          ${metricMarkup("Current Mastery", mastery, "%", warning ? "fa-solid fa-triangle-exclamation" : "fa-regular fa-brain", warning)}
          ${metricMarkup("Blogs Completed", completed, ` / ${items.length}`, "fa-regular fa-circle-check")}
          ${metricMarkup("Needs Review", enrolled ? items.filter((item) => item.currentMastery < 50).length : 0, "", "fa-regular fa-bell", warning)}
        </div>
        <div class="category-hub-curve-card">
          <header><div><span>Retention Analysis</span><strong>${enrolled ? `${mastery}% mastery today` : "Course not yet in your plan"}</strong></div><p>Solid: history <b>·</b> Dotted: 7-day forecast</p></header>
          ${enrolled && series.length ? chartMarkup(series, "course") : '<div class="category-hub-empty-chart"><i class="fa-regular fa-chart-line" aria-hidden="true"></i><strong>Your retention curve will appear here</strong><span>Join the course and complete blog checkpoints to build the analysis.</span></div>'}
        </div>
      </section>`;
  };

  const readingOverviewMarkup = (items, session) => {
    const read = session ? items.filter((item) => item.read_count > 0).length : 0;
    const completed = session ? items.filter((item) => item.completed).length : 0;
    const coverage = items.length ? Math.round((read / items.length) * 100) : 0;
    const visits = session ? items.reduce((sum, item) => sum + (item.read_count || 0), 0) : 0;
    return `
      <section class="category-hub-overview is-reading">
        <div class="category-hub-section-heading"><div><p class="category-hub-eyebrow">READING ANALYTICS</p><h2>Your Activity</h2></div><span>${session ? "Private to your GitHub account" : "Sign in to sync reading activity"}</span></div>
        <div class="category-hub-metrics">
          ${metricMarkup("Articles Read", read, ` / ${items.length}`, "fa-regular fa-book-open-reader")}
          ${metricMarkup("Reading Coverage", coverage, "%", "fa-regular fa-chart-pie")}
          ${metricMarkup("Completed", completed, "", "fa-regular fa-circle-check")}
          ${metricMarkup("Total Visits", visits, "", "fa-regular fa-arrow-rotate-right")}
        </div>
        <div class="category-hub-coverage"><span><b>Library coverage</b><strong>${coverage}%</strong></span><div><i style="width:${coverage}%"></i></div></div>
      </section>`;
  };

  const articleCardMarkup = (article, config, enrolled) => {
    const unpublished = config.name === "Mathematical Modeling" && article.reviewLock;
    const locked = !availableToReader(article);
    const trackable = !locked && !unpublished;
    const completion = enrolled && trackable ? article.completion : 0;
    const mastery = enrolled && trackable ? article.currentMastery : 0;
    const needsReview = enrolled && trackable && mastery < 50;
    const targetRelease = article.targetRelease ? new Date(`${article.targetRelease}T00:00:00`) : null;
    const plannedStatus = targetRelease && !Number.isNaN(targetRelease.getTime())
      ? `Planned by ${targetRelease.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
      : null;
    const status = unpublished
      ? plannedStatus || (locked ? "Locked · In Development" : "Unpublished Preview")
      : locked ? "Awaiting Review" : !enrolled ? "Blog" : completion >= 100 ? "Completed" : completion > 0 ? "In Progress" : "Not Started";
    const cover = article.cover || config.cover;
    return `
      <article class="category-hub-article ${needsReview ? "is-warning" : ""} ${unpublished ? "is-unpublished" : ""} ${locked ? "is-review-locked" : ""}">
        <a class="category-hub-article-cover" href="${escapeHtml(safePath(article.path))}" style="--article-cover:url('${escapeHtml(cover)}')"><span>${unpublished ? '<i class="fa-solid fa-lock" aria-hidden="true"></i> ' : ""}${escapeHtml(status)}</span></a>
        <div class="category-hub-article-body">
          <p class="category-hub-article-date">${config.name === "Mathematical Modeling" && article.lessonNumber ? `Blog ${String(article.lessonNumber).padStart(2, "0")} · Level ${article.lessonLevel || 1}` : escapeHtml(formatArticleDate(article.date))}${trackable && article.studyTime ? ` · ${escapeHtml(article.studyTime)} min guided post` : ""}</p>
          <h3><a href="${escapeHtml(safePath(article.path))}">${escapeHtml(article.title)}</a></h3>
          <p>${escapeHtml(article.excerpt || "Open this article to explore the complete notes and references.")}</p>
          ${enrolled && trackable ? `<div class="category-hub-article-progress"><span><b>Progress ${completion}%</b><b class="${needsReview ? "is-warning" : ""}">Mastery ${mastery}%</b></span><div><i style="width:${completion}%"></i></div></div>` : ""}
          <a class="category-hub-open" href="${escapeHtml(safePath(article.path))}">${unpublished ? locked ? "View Locked Blog" : "Preview Unpublished Blog" : enrolled && completion > 0 ? "Continue Blog" : "Open Article"} <i class="fa-regular ${unpublished ? locked ? "fa-lock" : "fa-eye" : "fa-arrow-right"}" aria-hidden="true"></i></a>
        </div>
      </article>`;
  };

  const loadingMarkup = () => '<div class="category-hub-loading"><span></span><span></span><span></span><p>Building this category center…</p></div>';

  const renderHub = async () => {
    const config = pageConfig();
    const mount = document.querySelector(".category-container");
    if (!config || !mount) return;
    const version = ++renderVersion;
    mount.classList.add("category-hub-container");
    if (!mount.dataset.categoryHubReady) mount.innerHTML = loadingMarkup();

    let catalog;
    try {
      catalog = await loadCatalog();
    } catch (_error) {
      if (version === renderVersion) mount.innerHTML = '<div class="category-hub-error"><h2>Category data could not be loaded</h2><p>Please refresh the page and try again.</p></div>';
      return;
    }
    if (version !== renderVersion || !mount.isConnected) return;

    const articles = catalog
      .filter((article) => article.categories.includes(config.name))
      .sort((a, b) => config.name === "Mathematical Modeling"
        ? (a.lessonNumber || 999) - (b.lessonNumber || 999)
        : new Date(b.date) - new Date(a.date));
    const api = reader();
    if (!api || !api.getClient()) {
      window.setTimeout(renderHub, 180);
      return;
    }
    const client = api.getClient();
    const session = api.getSession();
    const paths = articles.map((article) => article.path);
    let history = [];
    let events = [];
    let enrolled = false;
    let enrolledAt = null;

    if (session && paths.length) {
      const historyResult = await client
        .from("reading_history")
        .select("post_path,completion,completed,chapter_progress,last_read_at,read_count")
        .in("post_path", paths);
      if (!historyResult.error) history = historyResult.data || [];
    }

    if (session && config.course) {
      const planResult = await client
        .from("course_plans")
        .select("course_slug,enrolled_at")
        .eq("course_slug", config.course.slug)
        .maybeSingle();
      enrolled = Boolean(planResult.data && !planResult.error);
      enrolledAt = planResult.data?.enrolled_at || null;
      if (enrolled && paths.length) {
        const eventResult = await client
          .from("learning_mastery_history")
          .select("post_path,event_date,chapter_progress,completion,mastery,recorded_at")
          .in("post_path", paths)
          .order("event_date", { ascending: true });
        if (!eventResult.error) events = eventResult.data || [];
      }
    }
    if (version !== renderVersion || !mount.isConnected) return;

    const historyByPath = new Map(history.map((item) => [safePath(item.post_path), item]));
    const enriched = articles.map((article) => {
      const saved = historyByPath.get(safePath(article.path)) || {};
      const chapterProgress = saved.chapter_progress || {};
      return {
        ...article,
        post_path: safePath(article.path),
        completion: Number(saved.completion) || 0,
        completed: Boolean(saved.completed),
        chapter_progress: chapterProgress,
        last_read_at: saved.last_read_at || null,
        read_count: Number(saved.read_count) || 0,
        enrolled_at: enrolledAt,
        currentMastery: enrolled ? api.decayedMastery(chapterProgress, new Date(), saved.last_read_at) : 0,
      };
    });
    const available = enriched.filter(availableToReader);
    const trackable = config.name === "Mathematical Modeling" ? available.filter((article) => !article.reviewLock) : available;
    const series = enrolled ? aggregateSeries(trackable, events) : [];
    const curriculumMarkup = `<section class="category-hub-curriculum">
      <div class="category-hub-section-heading"><div><p class="category-hub-eyebrow">${config.course ? "COURSE CONTENT" : "CATEGORY LIBRARY"}</p><h2>${config.name === "Mathematical Modeling" ? "Browse Posts" : config.course ? "Learning Path" : "All Articles"}</h2></div><span ${config.name === "Mathematical Modeling" ? 'data-modeling-type-count=""' : ""}>${config.name === "Mathematical Modeling" ? "" : `${enriched.length} published`}</span></div>
      ${config.name === "Mathematical Modeling" ? modelingTypeTabsMarkup(enriched) : ""}
      <div class="category-hub-article-grid">${!config.course ? enriched.map((article) => articleCardMarkup(article, config, false)).join("") : ""}</div>
    </section>`;

    mount.innerHTML = `
      ${heroMarkup(config, config.name === "Mathematical Modeling" ? enriched.filter((article) => !article.reviewLock).length : enriched.length, session, enrolled)}
      ${config.name === "Mathematical Modeling" ? curriculumMarkup : ""}
      ${config.name === "Mathematical Modeling" ? modelingSyllabusMarkup(enriched) : ""}
      ${config.course ? courseOverviewMarkup(trackable, enrolled, series) : readingOverviewMarkup(enriched, session)}
      ${config.name === "Mathematical Modeling" ? "" : curriculumMarkup}`;
    renderedLearningPath = config.course ? { config, articles: enriched, enrolled: Boolean(enrolled) } : null;
    if (config.course) renderLearningPage(learningPages.get(learningPageKey(config)) || 1);
    mount.dataset.categoryHubReady = "true";
    document.querySelector(".category-paginator")?.setAttribute("hidden", "");
    window.requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
  };

  document.addEventListener("click", async (event) => {
    const modelingTypeButton = event.target.closest("[data-modeling-type]");
    if (modelingTypeButton && pageConfig()?.name === "Mathematical Modeling") {
      const type = modelingTypeButton.dataset.modelingType;
      if (MODELING_TYPES.some((item) => item.id === type)) {
        selectedModelingType = type;
        renderLearningPage(1);
      }
      return;
    }
    const pageButton = event.target.closest("[data-learning-page]");
    if (pageButton) {
      renderLearningPage(Number(pageButton.dataset.learningPage), true);
      return;
    }
    const button = event.target.closest("[data-category-plan]");
    if (!button) return;
    const config = pageConfig();
    const api = reader();
    if (!config?.course || !api) return;
    if (!api.getSession()) {
      api.signIn();
      return;
    }
    button.disabled = true;
    button.innerHTML = '<i class="fa-regular fa-spinner-third fa-spin" aria-hidden="true"></i><span>Syncing…</span>';
    const enrolled = button.classList.contains("is-enrolled");
    const result = await api.setCoursePlan(config.course, !enrolled);
    if (result.error) {
      button.disabled = false;
      button.innerHTML = '<i class="fa-regular fa-triangle-exclamation" aria-hidden="true"></i><span>Try Again</span>';
      return;
    }
    renderHub();
  });

  document.addEventListener("click", (event) => {
    if (performance.now() < suppressSwipeClickUntil && event.target.closest(".category-hub-article-grid a")) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener("touchstart", (event) => {
    learningSwipe = null;
    if (!renderedLearningPath || event.touches.length !== 1 || !event.target.closest(".category-hub-curriculum .category-hub-article-grid")) return;
    learningSwipe = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    if (!learningSwipe || !event.changedTouches.length) return;
    const deltaX = event.changedTouches[0].clientX - learningSwipe.x;
    const deltaY = event.changedTouches[0].clientY - learningSwipe.y;
    learningSwipe = null;
    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    const config = pageConfig();
    if (!config?.course) return;
    const currentPage = learningPages.get(learningPageKey(config)) || 1;
    const totalPages = Math.ceil((renderedLearningPath ? learningViewArticles(renderedLearningPath).length : 0) / LEARNING_PAGE_SIZE);
    const nextPage = currentPage + (deltaX < 0 ? 1 : -1);
    if (nextPage < 1 || nextPage > totalPages) return;
    suppressSwipeClickUntil = performance.now() + 350;
    renderLearningPage(nextPage);
  }, { passive: true });

  document.addEventListener("blog-reader:state", renderHub);
  document.addEventListener("swup:contentReplaced", renderHub);
  document.addEventListener("swup:pageView", renderHub);
  renderHub();
})();
