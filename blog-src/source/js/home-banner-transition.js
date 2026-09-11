(function () {
  "use strict";

  const managerKey = "__homeBannerTransition";
  const previousManager = window[managerKey];

  if (previousManager && typeof previousManager.destroy === "function") {
    previousManager.destroy();
  }

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let animationFrame = 0;
  let startFrame = 0;
  let started = false;
  let previousDarkMode = false;

  const clamp = (value, minimum, maximum) =>
    Math.min(Math.max(value, minimum), maximum);

  const getScrollProgress = () => {
    const transitionDistance = Math.max(window.innerHeight * 0.5, 1);
    return clamp(window.scrollY / transitionDistance, 0, 1);
  };

  const resolveThemeImageUrl = (imagePath) => {
    const siteRoot = window.config && window.config.root
      ? window.config.root
      : "/blog/";
    return `${siteRoot.replace(/\/?$/, "/")}${imagePath.replace(/^\/+/, "")}`;
  };

  const createBackgroundImage = (source) => {
    const image = document.createElement("img");
    image.src = resolveThemeImageUrl(source);
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    return image;
  };

  const ensureBackground = () => {
    const pageContainer = document.querySelector(".page-container");
    const isHomePage = Boolean(
      document.querySelector(".home-banner-container"),
    );
    let banner = document.querySelector(".home-banner-background");

    if (!banner && pageContainer && window.theme && window.theme.home_banner) {
      const images = window.theme.home_banner.image;
      banner = document.createElement("div");
      banner.className =
        "home-banner-background generated-blog-background transition-fade";
      banner.setAttribute("aria-hidden", "true");
      banner.append(
        createBackgroundImage(images.light),
        createBackgroundImage(images.dark),
      );
      pageContainer.prepend(banner);
    }

    if (pageContainer) {
      pageContainer.classList.toggle(
        "has-blog-page-background",
        !isHomePage && Boolean(banner),
      );
    }

    return { banner, isHomePage };
  };

  const keepHomeToolsVisible = (isHomePage) => {
    if (!isHomePage) return;

    const tools = document.querySelector(".right-side-tools-container");
    if (tools) tools.classList.remove("hide");
  };

  const updateBackground = (animateThemeChange) => {
    const { banner, isHomePage } = ensureBackground();

    if (!banner) return;

    keepHomeToolsVisible(isHomePage);
    const isDarkMode = root.classList.contains("dark");
    const scrollProgress = isHomePage ? getScrollProgress() : 0;
    const darkOpacity = isDarkMode
      ? 1 - scrollProgress
      : scrollProgress;
    const transitionDuration =
      animateThemeChange && !reducedMotion.matches ? "900ms" : "0ms";

    banner.style.setProperty(
      "--banner-tone-duration",
      transitionDuration,
    );
    banner.style.setProperty("--banner-dark-opacity", darkOpacity.toFixed(4));
  };

  const scheduleScrollUpdate = () => {
    if (animationFrame) return;

    animationFrame = window.requestAnimationFrame(() => {
      animationFrame = 0;
      updateBackground(false);
    });
  };

  const themeObserver = new MutationObserver(() => {
    const isDarkMode = root.classList.contains("dark");

    if (isDarkMode === previousDarkMode) return;

    previousDarkMode = isDarkMode;
    updateBackground(true);
  });

  const start = () => {
    if (started) return;

    started = true;
    previousDarkMode = root.classList.contains("dark");
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollUpdate, { passive: true });
    window.addEventListener("pageshow", scheduleScrollUpdate);
    updateBackground(false);
  };

  const scheduleStart = () => {
    startFrame = window.requestAnimationFrame(start);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleStart, { once: true });
  } else {
    start();
  }

  window[managerKey] = {
    destroy() {
      document.removeEventListener("DOMContentLoaded", scheduleStart);
      themeObserver.disconnect();
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", scheduleScrollUpdate);
      window.removeEventListener("pageshow", scheduleScrollUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (startFrame) {
        window.cancelAnimationFrame(startFrame);
      }
    },
  };
})();
