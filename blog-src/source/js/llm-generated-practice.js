(() => {
  "use strict";

  const DATA_URL = "/blog/data/llm-generated-practice.json?v=20261114-generated-v1";
  const ARTICLE_SELECTOR = ".article-content.markdown-body";
  let bankPromise = null;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const normalize = (value) =>
    String(value ?? "")
      .toLowerCase()
      .replace(/[\s\u00a0]+/g, " ")
      .replace(/[–—]/g, "-")
      .trim();

  const articleSlug = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    return decodeURIComponent(parts.at(-1) || "");
  };

  const loadBank = () => {
    if (!bankPromise) {
      bankPromise = fetch(DATA_URL, { credentials: "same-origin" }).then((response) => {
        if (!response.ok) throw new Error(`Practice bank request failed: ${response.status}`);
        return response.json();
      });
    }
    return bankPromise;
  };

  const headingFor = (content, title) => {
    const wanted = normalize(title);
    return [...content.querySelectorAll(":scope > h2")].find((heading) => {
      const actual = normalize(heading.textContent);
      return actual === wanted || actual.endsWith(wanted) || wanted.endsWith(actual);
    });
  };

  const nextH2 = (heading) => {
    let node = heading?.nextElementSibling;
    while (node && node.tagName !== "H2") node = node.nextElementSibling;
    return node;
  };

  const checkpointAnchor = (content, bank) => {
    if (bank.before) return headingFor(content, bank.before);
    const headings = [...content.querySelectorAll(":scope > h2")];
    const last = headings.at(-1);
    if (!last) return null;
    let node = last.nextElementSibling;
    while (node) {
      if (/references|参考资料|完整课件/i.test(node.textContent || "") && /H[23]/.test(node.tagName)) {
        return node;
      }
      node = node.nextElementSibling;
    }
    return null;
  };

  const renderQuestion = (question, id, index) => {
    const multiple = question.type === "multiple";
    const inputType = multiple ? "checkbox" : "radio";
    const difficultyClass = question.difficulty === "挑战" ? "is-hard" : "is-medium";
    return `
      <article class="llm-generated-question ${difficultyClass}" data-generated-question="${escapeHtml(id)}" data-answers="${escapeHtml(question.answers.join(","))}">
        <div class="llm-generated-question__meta">
          <span>Practice ${index + 1}</span>
          <span>${escapeHtml(multiple ? "多选" : "单选")}</span>
          <span>${escapeHtml(question.difficulty)}</span>
        </div>
        <p class="llm-generated-question__prompt"><strong>${index + 1}.</strong> ${escapeHtml(question.prompt)}</p>
        <fieldset class="llm-generated-question__options">
          <legend class="sr-only">${escapeHtml(question.prompt)}</legend>
          ${question.options
            .map(
              (option, optionIndex) => `
                <label>
                  <input type="${inputType}" name="${escapeHtml(id)}" value="${"ABCD"[optionIndex]}">
                  <span class="llm-generated-question__letter">${"ABCD"[optionIndex]}</span>
                  <span>${escapeHtml(option)}</span>
                </label>`,
            )
            .join("")}
        </fieldset>
        <div class="llm-generated-question__actions">
          <button type="button" class="llm-generated-question__check">检查答案</button>
          <button type="button" class="llm-generated-question__reset">重做</button>
        </div>
        <div class="llm-generated-question__result" aria-live="polite" hidden></div>
        <div class="llm-generated-question__explanation" hidden><strong>解析：</strong>${escapeHtml(question.explanation)}</div>
      </article>`;
  };

  const renderBank = (article, bank, slug, bankIndex, notice) => {
    const details = document.createElement("details");
    details.className = "llm-generated-practice";
    details.dataset.generatedBank = `${slug}-${bankIndex + 1}`;
    details.innerHTML = `
      <summary>
        <span class="llm-generated-practice__badge">Generated Practice</span>
        <span class="llm-generated-practice__title">${escapeHtml(bank.label)}</span>
        <span class="llm-generated-practice__count">${bank.questions.length} 题</span>
      </summary>
      <div class="llm-generated-practice__body">
        <div class="llm-generated-practice__notice">
          <strong>${escapeHtml(notice)}</strong>
          <span>这些题目依据本节内容生成，用于补充练习；不会冒充课程真实 Quiz。</span>
        </div>
        ${bank.questions
          .map((q, index) => renderQuestion(q, `${slug}-${bankIndex + 1}-${index + 1}`, index))
          .join("")}
      </div>`;
    return details;
  };

  const hydrate = async () => {
    const content = document.querySelector(ARTICLE_SELECTOR);
    if (!content) return;
    const slug = articleSlug();
    if (!slug) return;
    try {
      const data = await loadBank();
      const article = data.articles?.[slug];
      if (!article) return;
      if (content.dataset.generatedPracticeVersion === data.version) return;
      content.querySelectorAll(":scope > .llm-generated-practice").forEach((node) => node.remove());

      article.banks.forEach((bank, bankIndex) => {
        const block = renderBank(article, bank, slug, bankIndex, data.notice);
        if (bank.target === "__checkpoint__") {
          const anchor = checkpointAnchor(content, bank);
          if (anchor) content.insertBefore(block, anchor);
          else content.append(block);
          return;
        }
        const heading = headingFor(content, bank.target);
        if (!heading) {
          console.warn("Generated practice heading not found", slug, bank.target);
          return;
        }
        const anchor = nextH2(heading);
        if (anchor) content.insertBefore(block, anchor);
        else content.append(block);
      });
      content.dataset.generatedPracticeVersion = data.version;
    } catch (error) {
      console.error("Unable to hydrate generated practice bank", error);
    }
  };

  document.addEventListener("click", (event) => {
    const check = event.target.closest(".llm-generated-question__check");
    const reset = event.target.closest(".llm-generated-question__reset");
    if (!check && !reset) return;
    const card = event.target.closest(".llm-generated-question");
    if (!card) return;
    const result = card.querySelector(".llm-generated-question__result");
    const explanation = card.querySelector(".llm-generated-question__explanation");
    if (reset) {
      card.querySelectorAll("input").forEach((input) => {
        input.checked = false;
      });
      card.classList.remove("is-correct", "is-wrong");
      result.hidden = true;
      explanation.hidden = true;
      return;
    }
    const selected = [...card.querySelectorAll("input:checked")].map((input) => input.value).sort();
    if (!selected.length) {
      result.hidden = false;
      result.className = "llm-generated-question__result is-warning";
      result.textContent = "请先选择答案。";
      return;
    }
    const answers = String(card.dataset.answers || "").split(",").filter(Boolean).sort();
    const correct = selected.join(",") === answers.join(",");
    card.classList.toggle("is-correct", correct);
    card.classList.toggle("is-wrong", !correct);
    result.hidden = false;
    result.className = `llm-generated-question__result ${correct ? "is-correct" : "is-wrong"}`;
    result.textContent = correct ? "回答正确。" : `回答不正确。正确答案：${answers.join("、")}`;
    explanation.hidden = false;
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hydrate, { once: true });
  else hydrate();
  document.addEventListener("pjax:complete", hydrate);
  window.addEventListener("popstate", () => setTimeout(hydrate, 0));
  window.__llmGeneratedPractice = { hydrate };
})();
