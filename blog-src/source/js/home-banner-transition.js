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

  const updateBackground = (animateThemeChange) => {
    const banner = document.querySelector(".home-banner-background");

    if (!banner) return;

    const isHomePage = Boolean(
      document.querySelector(".home-banner-container"),
    );
    const isDarkMode = root.classList.contains("dark");
    const scrollProgress = isHomePage ? getScrollProgress() : 0;
    const darkOpacity = isDarkMode
      ? 1 - scrollProgress
      : scrollProgress;
    const blurAmount = isHomePage ? scrollProgress * 15 : 15;
    const transitionDuration =
      animateThemeChange && !reducedMotion.matches ? "900ms" : "0ms";

    banner.style.setProperty(
      "--banner-tone-duration",
      transitionDuration,
    );
    banner.style.setProperty("--banner-dark-opacity", darkOpacity.toFixed(4));
    banner.style.setProperty("--banner-blur", `${blurAmount.toFixed(3)}px`);
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
