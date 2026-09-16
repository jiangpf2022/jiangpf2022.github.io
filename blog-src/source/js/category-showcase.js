(function () {
  "use strict";

  const CATEGORIES = {
    "Mathematical-Modeling": {
      name: "Mathematical Modeling",
      label: "MODELING STUDIO",
      icon: "fa-solid fa-chart-line",
      cover: "/blog/images/mathematical-modeling-nyc.webp",
      description: "A growing, zero-to-competition path from the first model through visual evidence, optimization, dynamical systems, forecasting, data analysis, case studies, and scientific writing. New posts open after author review.",
    },
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
    "EECS182-Deep-Neural-Networks": {
      name: "EECS182 Deep Neural Networks",
      label: "UC BERKELEY COURSE",
      icon: "fa-solid fa-brain-circuit",
      cover: "/blog/images/2025-4-21-1.png",
      description: "A structured path through optimization, sequence models, attention, Transformers, representation learning, and generative models.",
    },
    "MATH113-Introduction-to-Abstract-Algebra": {
      name: "MATH113 Introduction to Abstract Algebra",
      label: "MATHEMATICS COURSE",
      icon: "fa-solid fa-function",
      cover: "/blog/images/2024-11-12-1.jpeg",
      description: "Groups, homomorphisms, quotient structures, group actions, rings, fields, ideals, and the proofs connecting them.",
    },
    "CS182-Machine-Learning": {
      name: "CS182 Machine Learning",
      label: "MACHINE LEARNING",
      icon: "fa-solid fa-chart-network",
      cover: "/blog/images/2024-6-4-8.png",
      description: "Core machine-learning foundations from Bayesian decisions and SVMs to dimensionality reduction, clustering, ensembles, and evaluation.",
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
    const progressFill = section.querySelector("[data-category-progress]");
    const cards = [...viewport.querySelectorAll(".home-category-card")];
    const count = items.length;
    let dragging = false;
    let moved = false;
    let pointerId = null;
    let startX = 0;
    let startScroll = 0;
    let frame = 0;
    let jumpFrame = 0;
    let autoplayTimer = 0;
    let progressFrame = 0;
    let motionFrame = 0;
    let hovering = false;
    let keyboardPaused = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

    const jumpBy = (distance) => {
      window.cancelAnimationFrame(jumpFrame);
      viewport.classList.add("is-loop-jump");
      viewport.scrollLeft += distance;
      if (dragging) startScroll += distance;
      jumpFrame = window.requestAnimationFrame(() => viewport.classList.remove("is-loop-jump"));
    };

    const keepLooping = () => {
      const value = metrics();
      if (!value) return;
      if (viewport.scrollLeft < value.middleStart - 2) jumpBy(value.setWidth);
      else if (viewport.scrollLeft >= value.lastStart - 2) jumpBy(-value.setWidth);
    };

    const cardStep = () => {
      const cardWidth = cards[count]?.getBoundingClientRect().width || viewport.clientWidth;
      const gap = parseFloat(getComputedStyle(viewport).columnGap) || 0;
      return cardWidth + gap;
    };

    const setProgress = (value) => {
      progressFill?.style.setProperty("--category-autoplay-progress", Math.max(0, Math.min(1, value)));
    };

    const stopAutoplay = () => {
      window.clearTimeout(autoplayTimer);
      window.cancelAnimationFrame(progressFrame);
      autoplayTimer = 0;
      progressFrame = 0;
      section.classList.add("is-autoplay-paused");
    };

    const cancelMotion = () => {
      window.cancelAnimationFrame(motionFrame);
      motionFrame = 0;
      viewport.classList.remove("is-auto-moving");
      section.classList.remove("is-autoplay-advancing");
    };

    const animateBy = (distance, duration = 1050, onComplete = () => {}) => {
      cancelMotion();
      if (reducedMotion.matches) {
        viewport.scrollLeft += distance;
        keepLooping();
        onComplete();
        return;
      }
      viewport.classList.add("is-auto-moving");
      section.classList.add("is-autoplay-advancing");
      let startedAt = 0;
      let previousEased = 0;
      const step = (now) => {
        if (!startedAt) startedAt = now;
        const elapsed = Math.min(1, (now - startedAt) / duration);
        const eased = elapsed < 0.5
          ? 4 * elapsed * elapsed * elapsed
          : 1 - Math.pow(-2 * elapsed + 2, 3) / 2;
        viewport.scrollLeft += distance * (eased - previousEased);
        keepLooping();
        previousEased = eased;
        if (elapsed < 1) {
          motionFrame = window.requestAnimationFrame(step);
          return;
        }
        motionFrame = 0;
        viewport.classList.remove("is-auto-moving");
        section.classList.remove("is-autoplay-advancing");
        onComplete();
      };
      motionFrame = window.requestAnimationFrame(step);
    };

    const scheduleAutoplay = (delay = 5200) => {
      stopAutoplay();
      setProgress(0);
      if (reducedMotion.matches || !viewport.isConnected) return;
      section.classList.remove("is-autoplay-paused");
      const startedAt = performance.now();
      const updateProgress = (now) => {
        setProgress((now - startedAt) / delay);
        if (now - startedAt < delay) progressFrame = window.requestAnimationFrame(updateProgress);
      };
      progressFrame = window.requestAnimationFrame(updateProgress);
      autoplayTimer = window.setTimeout(() => {
        if (!document.hidden && !hovering && !keyboardPaused && !dragging) {
          setProgress(1);
          animateBy(cardStep(), 1050, () => scheduleAutoplay());
          return;
        }
        scheduleAutoplay();
      }, delay);
    };

    viewport.addEventListener("scroll", () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(keepLooping);
    }, { passive: true });

    viewport.addEventListener("wheel", (event) => {
      stopAutoplay();
      cancelMotion();
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        viewport.scrollBy({ left: event.deltaY, behavior: "auto" });
      }
      scheduleAutoplay(6500);
    }, { passive: false });

    viewport.addEventListener("pointerdown", (event) => {
      stopAutoplay();
      cancelMotion();
      keyboardPaused = false;
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
      keepLooping();
    });

    const finishDrag = (event) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId);
      pointerId = null;
      keepLooping();
      scheduleAutoplay(6500);
    };
    viewport.addEventListener("pointerup", finishDrag);
    viewport.addEventListener("pointercancel", finishDrag);
    viewport.addEventListener("touchend", () => scheduleAutoplay(6500), { passive: true });
    viewport.addEventListener("click", (event) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }, true);

    section.querySelectorAll("[data-category-direction]").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = Number(button.dataset.categoryDirection) || 1;
        stopAutoplay();
        animateBy(direction * cardStep(), 900, () => scheduleAutoplay(6500));
      });
    });

    section.addEventListener("mouseenter", () => {
      hovering = true;
      stopAutoplay();
    });
    section.addEventListener("mouseleave", () => {
      hovering = false;
      scheduleAutoplay();
    });
    section.addEventListener("keydown", () => {
      keyboardPaused = true;
      stopAutoplay();
    });
    section.addEventListener("focusout", (event) => {
      if (event.relatedTarget && section.contains(event.relatedTarget)) return;
      keyboardPaused = false;
      scheduleAutoplay(2500);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoplay();
      else scheduleAutoplay();
    });
    reducedMotion.addEventListener?.("change", () => scheduleAutoplay());

    const observer = new ResizeObserver(centerLoop);
    observer.observe(viewport);
    window.requestAnimationFrame(centerLoop);
    scheduleAutoplay();
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
      <div class="home-category-showcase__rail">
        <div class="home-category-showcase__viewport" data-category-viewport tabindex="0" aria-label="Latest categories. Swipe or use the arrow buttons to browse.">${cards}</div>
        <div class="home-category-showcase__autoplay" aria-hidden="true">
          <span><i></i> AUTO</span>
          <span class="home-category-showcase__progress"><i data-category-progress></i></span>
          <small>NEXT</small>
        </div>
      </div>
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
