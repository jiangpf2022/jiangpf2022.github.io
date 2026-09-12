(function () {
  "use strict";

  const managerKey = "__articleTocToggle";
  const previousManager = window[managerKey];

  if (previousManager && typeof previousManager.destroy === "function") {
    previousManager.destroy();
  }

  const registrations = [];

  const removeDuplicateNumber = (link) => {
    const number = link.querySelector(".nav-number")?.textContent.trim();
    const text = link.querySelector(".nav-text");

    if (!number || !text) return;

    const label = text.textContent.trim();
    if (label.startsWith(`${number} `)) {
      text.textContent = label.slice(number.length).trimStart();
    }
  };

  const setExpanded = (item, child, button, expanded) => {
    item.classList.toggle("toc-section-expanded", expanded);
    button.setAttribute("aria-expanded", String(expanded));
    child.setAttribute("aria-hidden", String(!expanded));

    const sectionName = button.dataset.sectionName || "section";
    button.setAttribute(
      "aria-label",
      `${expanded ? "Collapse" : "Expand"} ${sectionName}`,
    );
    button.title = `${expanded ? "Collapse" : "Expand"} ${sectionName}`;
  };

  const initialize = () => {
    const majorSections = document.querySelectorAll(
      ".post-toc > .nav > .nav-item",
    );

    majorSections.forEach((item, index) => {
      const link = Array.from(item.children).find((child) =>
        child.matches("a.nav-link"),
      );
      const child = Array.from(item.children).find((element) =>
        element.matches("ol.nav-child"),
      );

      if (!link || !child) return;

      removeDuplicateNumber(link);

      const sectionName =
        link.querySelector(".nav-text")?.textContent.trim() || `section ${index + 1}`;
      const childId = `toc-section-${index + 1}`;
      const button = document.createElement("button");

      child.id = childId;
      item.classList.add("toc-section-enhanced");
      button.type = "button";
      button.className = "toc-section-toggle";
      button.dataset.sectionName = sectionName;
      button.setAttribute("aria-controls", childId);
      link.insertAdjacentElement("afterend", button);
      setExpanded(item, child, button, false);

      const handleToggle = () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        setExpanded(item, child, button, !expanded);
      };
      const handleMajorSectionNavigation = () => {
        setExpanded(item, child, button, true);
      };

      button.addEventListener("click", handleToggle);
      link.addEventListener("click", handleMajorSectionNavigation);
      registrations.push({
        item,
        child,
        link,
        button,
        handleToggle,
        handleMajorSectionNavigation,
      });
    });
  };

  initialize();

  window[managerKey] = {
    destroy() {
      registrations.forEach((registration) => {
        registration.button.removeEventListener("click", registration.handleToggle);
        registration.link.removeEventListener(
          "click",
          registration.handleMajorSectionNavigation,
        );
        registration.button.remove();
        registration.item.classList.remove(
          "toc-section-enhanced",
          "toc-section-expanded",
        );
        registration.child.removeAttribute("id");
        registration.child.removeAttribute("aria-hidden");
      });
      registrations.length = 0;
    },
  };
})();
