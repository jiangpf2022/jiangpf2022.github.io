(function () {
  "use strict";

  const CATEGORIES = {
    "COMS4773W-Computational-Aspects-of-Robotics": {
      name: "COMS4773W Computational Aspects of Robotics",
      label: "ROBOTICS",
      icon: "fa-solid fa-robot",
      cover: "/blog/images/robotics-1/rigid-body-transformations-cover.webp",
      description: "Robot geometry, coordinate frames, kinematics, planning, and control from a computational perspective.",
    },
    "COMS6998E-LLM-Based-Generative-AI": {
      name: "COMS6998E LLM-Based Generative AI",
      label: "GENERATIVE AI",
      icon: "fa-solid fa-sparkles",
      cover: "/blog/images/columbia-low-memorial-library.jpg",
      description: "Deep-learning foundations, large-model training, distributed systems, evaluation, and practical LLM engineering.",
    },
    "COMS4776W-Neural-Networks-Deep-Learning": {
      name: "COMS4776W Neural Networks & Deep Learning",
      label: "DEEP LEARNING",
      icon: "fa-solid fa-network-wired",
      cover: "/blog/images/columbia-neural-networks-deep-learning-cover.png",
      description: "Mathematical foundations, optimization, representation learning, and the architecture of modern neural networks.",
    },
    "Paper-Reading": {
      name: "Paper Reading",
      label: "RESEARCH LIBRARY",
      icon: "fa-solid fa-file-magnifying-glass",
      cover: "/blog/images/2024-6-4-2.png",
      description: "Structured readings of research problems, mathematical formulations, core methods, and practical implications.",
    },
    "ShanghaiTech-University": {
      name: "ShanghaiTech University",
      label: "COURSE ARCHIVE",
      icon: "fa-solid fa-graduation-cap",
      cover: "/blog/images/2024-11-12-1.jpeg",
      description: "Course notes, exam reviews, derivations, and reference sheets from mathematics, algorithms, AI, and ML.",
    },
  };

  const fallbackOrder = Object.keys(CATEGORIES);
  let catalogPromise = null;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const loadCatalog = () => {
    if (!catalogPromise) {
      catalogPromise = fetch("/blog/category-hub.json", { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error("Category catalog unavailable");
          return response.json();
        })
        .catch(() => []);
    }
    return catalogPromise;
  };

  const categorySlug = (href) => {
    try {
      const pathname = new URL(href, window.location.origin).pathname;
      const match = pathname.match(/^\/blog\/categories\/([^/]+)\/?$/);
      return match ? decodeURIComponent(match[1]) : "";
    } catch (_error) {
      return "";
    }
  };

  const categoryStats = (catalog) => {
    const stats = new Map(fallbackOrder.map((slug) => [slug, { count: 0, latest: 0 }]));
    catalog.forEach((post) => {
      const timestamp = Date.parse(post.date || post.updated || "") || 0;
      (post.categories || []).forEach((name) => {
        const entry = Object.entries(CATEGORIES).find(([, config]) => config.name === name);
        if (!entry) return;
        const [slug] = entry;
        const current = stats.get(slug);
        current.count += 1;
        current.latest = Math.max(current.latest, timestamp);
      });
    });
    return stats;
  };

  const formatUpdated = (timestamp) => {
    if (!timestamp) return "Course collection";
    return `Updated ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(timestamp))}`;
  };

  const cardMarkup = (item, duplicate = false) => `
    <article class="home-category-card"${duplicate ? ' aria-hidden="true"' : ""}>
      <a href="/blog/categories/${escapeHtml(item.slug)}/" style="--category-cover:url('${escapeHtml(item.cover)}')"${duplicate ? ' tabindex="-1"' : ""}>
        <span class="home-category-card__shade"></span>
        <span class="home-category-card__content">
          <span class="home-category-card__label"><i class="${escapeHtml(item.icon)}" aria-hidden="true"></i>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.name)}</strong>
          <span class="home-category-card__description">${escapeHtml(item.description)}</span>
          <span class="home-category-card__meta"><span>${escapeHtml(formatUpdated(item.latest))}</span><span>${item.count || 0} article${item.count === 1 ? "" : "s"}</span></span>
        </span>
      </a>
    </article>`;

  const bindInfiniteCarousel = (section, items) => {
    const viewport = section.querySelector("[data-category-viewport]");
    const cards = [...viewport.querySelectorAll(".home-category-card")];
    const count = items.length;
    let dragging = false;
    let moved = false;
    let pointerId = null;
    let startX = 0;
    let startScroll = 0;
    let frame = 0;

    const metrics = () => {
      if (cards.length < count * 3) return null;
      const firstStart = cards[0].offsetLeft;
      const middleStart = cards[count].offsetLeft;
      const lastStart = cards[count * 2].offsetLeft;
      return { setWidth: middleStart - firstStart, middleStart, lastStart };
    };

    const centerLoop = () => {
      const value = metrics();
      if (!value) return;
      viewport.scrollLeft = value.middleStart;
    };

    const keepLooping = () => {
      const value = metrics();
      if (!value || dragging) return;
      if (viewport.scrollLeft < value.middleStart - 2) viewport.scrollLeft += value.setWidth;
      else if (viewport.scrollLeft >= value.lastStart - 2) viewport.scrollLeft -= value.setWidth;
    };

    viewport.addEventListener("scroll", () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(keepLooping);
    }, { passive: true });

    viewport.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      viewport.scrollBy({ left: event.deltaY, behavior: "auto" });
    }, { passive: false });

    viewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      dragging = true;
      moved = false;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScroll = viewport.scrollLeft;
      viewport.setPointerCapture(pointerId);
      viewport.classList.add("is-dragging");
    });

    viewport.addEventListener("pointermove", (event) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 5) moved = true;
      viewport.scrollLeft = startScroll - delta;
    });

    const finishDrag = (event) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId);
      pointerId = null;
      keepLooping();
    };
    viewport.addEventListener("pointerup", finishDrag);
    viewport.addEventListener("pointercancel", finishDrag);
    viewport.addEventListener("click", (event) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }, true);

    section.querySelectorAll("[data-category-direction]").forEach((button) => {
      button.addEventListener("click", () => {
        const cardWidth = cards[count]?.getBoundingClientRect().width || viewport.clientWidth;
        const gap = parseFloat(getComputedStyle(viewport).columnGap) || 0;
        const direction = Number(button.dataset.categoryDirection) || 1;
        viewport.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
      });
    });

    const observer = new ResizeObserver(centerLoop);
    observer.observe(viewport);
    window.requestAnimationFrame(centerLoop);
  };

  const renderHomeShowcase = async () => {
    const list = document.querySelector(".home-content-container > .home-article-list");
    if (!list || document.querySelector(".home-category-showcase")) return;
    const catalog = await loadCatalog();
    if (!list.isConnected || document.querySelector(".home-category-showcase")) return;
    const stats = categoryStats(catalog);
    const items = fallbackOrder
      .map((slug, fallbackIndex) => ({ slug, fallbackIndex, ...CATEGORIES[slug], ...stats.get(slug) }))
      .sort((a, b) => b.latest - a.latest || a.fallbackIndex - b.fallbackIndex)
      .slice(0, 5);
    const cards = [0, 1, 2]
      .map((setIndex) => items.map((item) => cardMarkup(item, setIndex !== 1)).join(""))
      .join("");
    const section = document.createElement("section");
    section.className = "home-category-showcase";
    section.setAttribute("aria-labelledby", "home-category-showcase-title");
    section.innerHTML = `
      <header class="home-category-showcase__header">
        <div><span>LEARNING COLLECTIONS</span><h2 id="home-category-showcase-title">Explore Categories</h2><p>Browse the latest course notes and research collections before diving into individual articles.</p></div>
        <div class="home-category-showcase__controls" aria-label="Category carousel controls">
          <button type="button" data-category-direction="-1" aria-label="Previous category"><i class="fa-regular fa-arrow-left" aria-hidden="true"></i></button>
          <button type="button" data-category-direction="1" aria-label="Next category"><i class="fa-regular fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </header>
      <div class="home-category-showcase__viewport" data-category-viewport tabindex="0" aria-label="Latest categories. Swipe or use the arrow buttons to browse.">${cards}</div>
      <footer><span><i class="fa-regular fa-hand-pointer" aria-hidden="true"></i> Drag or swipe to explore</span><a href="/blog/categories/">View all categories <i class="fa-regular fa-arrow-right" aria-hidden="true"></i></a></footer>`;
    list.before(section);
    bindInfiniteCarousel(section, items);
  };

  const enhanceCategoryIndex = () => {
    const container = document.querySelector(".category-list-container");
    if (!container) return;
    container.querySelectorAll(".all-category-list-item").forEach((item) => {
      const link = item.querySelector(".all-category-list-link");
      const config = CATEGORIES[categorySlug(link?.href)];
      if (!link || !config || link.querySelector(".category-card-copy")) return;
      link.textContent = "";
      link.insertAdjacentHTML("beforeend", `
        <span class="category-card-copy">
          <span class="category-card-label"><i class="${escapeHtml(config.icon)}" aria-hidden="true"></i>${escapeHtml(config.label)}</span>
          <strong>${escapeHtml(config.name)}</strong>
          <span class="category-card-description">${escapeHtml(config.description)}</span>
        </span>`);
    });
  };

  const render = () => {
    enhanceCategoryIndex();
    renderHomeShowcase();
  };

  document.addEventListener("swup:contentReplaced", render);
  document.addEventListener("swup:pageView", render);
  render();
})();
