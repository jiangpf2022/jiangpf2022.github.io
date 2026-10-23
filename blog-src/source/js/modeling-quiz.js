(() => {
  "use strict";

  const QUIZ_PREFIX = "modeling-01-q";
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MAX_EXP = 42;
  const LOCAL_KEY = "modeling-01-quiz-practice-v1";

  const questions = [
    {
      target: 90,
      exp: 1,
      answer: ["B"],
      en: {
        question: "A client says, \"Build the best model for our campus bus system.\" What should you do first?",
        options: [
          "Choose the most advanced algorithm you know.",
          "Clarify the decision, the outcome that matters, and what success means.",
          "Download every available dataset before asking questions.",
          "Draw a polished dashboard for the final report.",
        ],
        explanation: "A model begins with a purpose. Until the decision and success criterion are clear, neither data nor algorithms have a well-defined job.",
      },
      zh: {
        question: "委托方说：\"请为校园班车建立最好的模型。\"第一步应该做什么？",
        options: ["选择自己会的最高级算法。", "明确要做的决策、真正关心的结果，以及什么叫成功。", "先下载所有能找到的数据。", "先为最终报告画一张精美看板。"],
        explanation: "模型首先要有目的。在决策和成功标准还没说清时，数据和算法都还没有明确的任务。",
      },
    },
    {
      target: 82,
      exp: 1,
      answer: ["B"],
      en: {
        question: "What does a system boundary specify?",
        options: ["Every fact that exists in the real world.", "Which objects, time scales, and interactions are included or deliberately excluded.", "Only the final numerical answer.", "The programming language used to solve the model."],
        explanation: "A boundary makes the smaller modeled world explicit. It tells readers what the model covers and where its claims should stop.",
      },
      zh: {
        question: "系统边界要说明什么？",
        options: ["现实世界中的每一个事实。", "哪些对象、时间尺度和相互作用被纳入，哪些被有意排除。", "只说明最后的数值答案。", "说明用什么编程语言求解。"],
        explanation: "边界把我们为推理而搭建的“小世界”说清楚，也告诉读者模型结论应当在哪里停下。",
      },
    },
    {
      target: 74,
      exp: 2,
      multiple: true,
      answer: ["A", "B", "C"],
      en: {
        question: "Which properties make an assumption useful in a modeling report? Select all that apply.",
        options: ["It is stated explicitly.", "It can be challenged by evidence or sensitivity analysis.", "It preserves the mechanism needed for the current decision.", "It must be permanently true in every possible setting."],
        explanation: "Assumptions are controlled approximations, not eternal truths. Good ones are visible, testable, and appropriate to the purpose of the model.",
      },
      zh: {
        question: "一条假设要在建模报告中真正有用，应具备哪些特征？请选出所有正确项。",
        options: ["被明确写出。", "能被证据或灵敏度分析挑战。", "保留当前决策所需的核心机制。", "必须在任何场景中永远为真。"],
        explanation: "假设是受控的近似，不是永恒真理。好假设应当看得见、能检验，并且与模型的目的相匹配。",
      },
    },
    {
      target: 65,
      exp: 2,
      answer: ["B"],
      en: {
        question: "Why construct a simple baseline before adding a more elaborate model?",
        options: ["A baseline guarantees the final answer is correct.", "It provides a hand-checkable comparison and reveals which added complexity actually changes the decision.", "It removes the need for validation.", "It always produces a larger objective value."],
        explanation: "A baseline anchors interpretation. Complexity earns its place only when it improves evidence, prediction, feasibility, or the decision itself.",
      },
      zh: {
        question: "为什么在加入更复杂的模型前，要先建立一个简单基线？",
        options: ["基线能保证最终答案正确。", "它提供一个可手算核对的比较对象，并帮我们看出新增复杂性是否真正改变了决策。", "它可以取代验证。", "它一定会得到更大的目标值。"],
        explanation: "基线为结果解读提供锚点。只有当复杂性改善了证据、预测、可行性或决策时，它才值得被加入。",
      },
    },
    {
      target: 56,
      exp: 3,
      multiple: true,
      answer: ["A", "B", "C", "E"],
      en: {
        question: "Which pairs correctly match a validation level with its question? Select all that apply.",
        options: ["Implementation — does the code reproduce a hand-computed case?", "Internal — do units, conservation rules, and logical constraints agree?", "Empirical — do predictions agree with observations not used to fit the model?", "Decision — is every variable measured in meters?", "Comparative — does the proposed method improve on a meaningful baseline under the same conditions?"],
        explanation: "Validation is layered. Code, internal logic, observations, baselines, and the final decision each require a different kind of check; units alone do not validate a decision.",
      },
      zh: {
        question: "下列哪些“验证层次—检查问题”的搭配是正确的？请选出所有正确项。",
        options: ["实现验证——代码能否复现一个手算案例？", "内部验证——单位、守恒规律和逻辑约束是否一致？", "经验验证——预测是否与没有用于拟合的观测一致？", "决策验证——是否所有变量都用米作单位？", "比较验证——在相同条件下，新方法是否优于有意义的基线？"],
        explanation: "验证有多个层次。代码、内部逻辑、观测证据、基线比较与最终决策各需要不同的检查；单位正确并不等于决策有效。",
      },
    },
    {
      target: 46,
      exp: 4,
      answer: ["B"],
      en: {
        question: "In the thermal-box threshold model, the estimated vial capacity is proportional to the cold reservoir heat capacity. If that heat capacity is halved while all temperatures and vial properties stay fixed, what happens to the unrounded capacity estimate?",
        options: ["It doubles.", "It halves.", "It is unchanged.", "It becomes zero regardless of the initial temperature."],
        explanation: "The closed-form threshold estimate is linear in the reservoir heat capacity. This is a structural sensitivity result, not a numerical coincidence.",
      },
      zh: {
        question: "在保温箱的阈值模型中，估计的样本管容量与低温储能体的热容成正比。如果热容减半，其他温度与样本管性质都不变，未取整的容量估计会怎样变化？",
        options: ["变为两倍。", "变为一半。", "保持不变。", "无论初始温度如何都变为零。"],
        explanation: "阈值的闭式估计对储能体热容是线性的。这是由模型结构得到的灵敏度结论，不是数值巧合。",
      },
    },
    {
      target: 36,
      exp: 5,
      multiple: true,
      answer: ["A", "B", "D"],
      en: {
        question: "A ski-resort owner considers slowing the lift because this can increase the ratio between admitted guests and instantaneous trail occupancy. Which conclusions are defensible? Select all that apply.",
        options: ["Under that narrow occupancy metric, a slower uphill cycle can appear beneficial.", "Lift queues, customer satisfaction, safety, return visits, and profit may change the preferred speed.", "Therefore the slowest physically possible lift is always globally optimal.", "The answer depends on the objective and boundary, not on speed alone."],
        explanation: "The example exposes objective design. A narrow capacity ratio can reward a slow lift, while a broader business model introduces queues, behavior, safety, and long-run demand.",
      },
      zh: {
        question: "某滑雪场老板考虑降低缆车速度，因为这可能提高“允许入场人数与雪道瞬时人数之比”。哪些结论站得住？请选出所有正确项。",
        options: ["在这一狭窄的占用指标下，上山周期更慢可能显得更有利。", "排队、顾客满意度、安全、复购与利润都可能改变最佳速度。", "因此，物理上能达到的最慢速度一定是全局最优。", "答案取决于目标和边界，而不是单独取决于速度。"],
        explanation: "这个例子提醒我们审视目标函数。狭窄的容量比值会奖励慢缆车，但更完整的经营模型还包含排队、行为、安全和长期需求。",
      },
    },
    {
      target: 27,
      exp: 6,
      answer: ["C"],
      en: {
        question: "A commuter normally meets a car at 6:00 p.m. One day they arrive early, walk toward home, meet the car en route, and reach home 10 minutes earlier than usual. Assuming the car follows its normal route and speed, how long did the commuter walk before 6:00 p.m.?",
        options: ["5 minutes", "10 minutes", "25 minutes", "50 minutes"],
        explanation: "Arriving home 10 minutes early means the car saved 5 minutes outward and 5 minutes returning. It therefore met the commuter at 5:55 p.m.; if the commuter began at 5:30 p.m., the walk lasted 25 minutes.",
      },
      zh: {
        question: "通勤者平时晚上 6:00 与开车来接的人会合。某天他早到后步行往家走，途中遇到车，最后比平时早 10 分钟到家。假设汽车的常规路线和速度不变，通勤者在 6:00 之前步行了多久？",
        options: ["5 分钟", "10 分钟", "25 分钟", "50 分钟"],
        explanation: "早 10 分钟到家，意味着车往外少开 5 分钟，回程也少开 5 分钟。因此会合时刻是 5:55；若通勤者 5:30 开始走，他共步行 25 分钟。",
      },
    },
    {
      target: 18,
      exp: 8,
      multiple: true,
      answer: ["A", "B", "C"],
      en: {
        question: "Which elements belong in a defensible validation plan for the library study-room proposal? Select all that apply.",
        options: ["Compare the current and proposed schedules on the same historical days.", "Report both turn-aways and unused room-hours.", "Stress-test the recommendation under higher exam-week arrivals.", "Evaluate the proposal only on the one day on which it performs best."],
        explanation: "Fair comparison requires shared conditions, complementary metrics, and stress scenarios. Selecting only a favorable day is evidence cherry-picking.",
      },
      zh: {
        question: "图书馆自习室方案的可辩护验证计划应包含哪些内容？请选出所有正确项。",
        options: ["在相同的历史日期上比较现行方案与新方案。", "同时报告被拒人数与空置房间小时数。", "在考试周到客量更高的情景下做压力测试。", "只用方案表现最好的那一天评估。"],
        explanation: "公平比较需要相同条件、互补指标和压力情景。只挑最好的一天，是在选择性地展示证据。",
      },
    },
    {
      target: 10,
      exp: 10,
      multiple: true,
      answer: ["A", "C", "D", "E"],
      en: {
        question: "A dining hall must choose next week's staffing under a hard labor budget. Demand is uncertain, long waits may cause students to leave, and extending hours may change when students arrive. Which components belong in a coherent modeling architecture? Select all that apply.",
        options: ["Forecast demand using only information available when the staffing decision is made.", "Optimize only for mean demand, then present the result as valid for every week.", "Start with a transparent capacity baseline, then add a queue or simulation only where the baseline fails.", "Test high-demand and behavior-response scenarios and report sensitivity of the recommendation.", "Compare policies under the same conditions and monitor actual behavior after deployment.", "Select the most sophisticated algorithm before defining the objective."],
        explanation: "A coherent architecture respects decision-time information, preserves a checkable baseline, represents congestion and behavioral feedback when necessary, and validates policies fairly under uncertainty. Complexity and a point forecast alone cannot supply those guarantees.",
      },
      zh: {
        question: "食堂必须在严格的人工预算下决定下周排班。需求存在不确定性，等待过长会让学生离开，而延长营业时间又可能改变学生到达的时刻。下列哪些部件应进入一套连贯的建模架构？请选出所有正确项。",
        options: ["只用做排班决策当时已经可获得的信息预测需求。", "只对平均需求优化，然后宣称该结果对每一周都有效。", "先建立透明的容量基线，只在基线失效的环节加入排队模型或仿真。", "测试高需求与行为反应情景，并报告建议的灵敏度。", "在相同条件下比较政策，并在实施后监测真实行为。", "在定义目标之前，先选最复杂的算法。"],
        explanation: "连贯的架构要尊重决策时点的信息边界，保留可核对的基线，在必要时表达拥堵与行为反馈，并在不确定性下公平验证政策。单靠复杂算法或点预测无法做到这些。",
      },
    },
  ];

  const copy = {
    en: {
      intro: "10 questions · single and multiple choice · 42 EXP available",
      solved: "Solved",
      accuracy: "First-attempt accuracy",
      earned: "EXP earned",
      target: "Target solve rate",
      single: "Select one answer",
      multiple: "Select all that apply",
      check: "Check answer",
      choose: "Choose an answer before checking.",
      chooseMany: "Choose one or more answers before checking.",
      incorrect: "Not quite. Review the explanation, change your selection, and try again.",
      saving: "Correct — saving your result…",
      practice: (exp) => `Correct. Sign in with GitHub to save progress and earn up to ${exp} EXP.`,
      full: (exp) => `Correct on the first attempt — +${exp} EXP!`,
      partial: (exp) => `Correct after a retry — +${exp} EXP.`,
      already: "Correct. This question has already awarded EXP.",
      syncError: "Your answer was checked, but progress could not be synced. Please try again.",
      explanation: "Explanation",
      completed: "Solved",
    },
    zh: {
      intro: "10 道题 · 单选与多选 · 共 42 EXP",
      solved: "已解答",
      accuracy: "首次作答准确率",
      earned: "已获得 EXP",
      target: "目标答对率",
      single: "请选择一个答案",
      multiple: "请选出所有正确项",
      check: "检查答案",
      choose: "请先选择一个答案。",
      chooseMany: "请先选择一个或多个答案。",
      incorrect: "还差一点。读读解析，调整选项后再试一次。",
      saving: "回答正确——正在保存…",
      practice: (exp) => `回答正确。使用 GitHub 登录后可保存进度并获得最多 ${exp} EXP。`,
      full: (exp) => `首次作答正确——+${exp} EXP！`,
      partial: (exp) => `再次尝试后答对——+${exp} EXP。`,
      already: "回答正确。该题已经记录过 EXP。",
      syncError: "答案已检查，但进度未能同步，请稍后重试。",
      explanation: "解析",
      completed: "已解答",
    },
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const arraysMatch = (left, right) =>
    left.length === right.length && left.every((value, index) => value === right[index]);

  const questionId = (index) => `${QUIZ_PREFIX}${index + 1}`;

  const readLocal = () => {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}"); }
    catch (_error) { return {}; }
  };

  const writeLocal = (value) => {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(value)); }
    catch (_error) { /* Practice still works when storage is unavailable. */ }
  };

  const renderStats = (root) => {
    const entries = root.__modelingQuizEntries || {};
    const attempted = Object.values(entries).filter((entry) => Number(entry.attempt_count) > 0);
    const solved = Object.values(entries).filter((entry) => entry.solved).length;
    const firstCorrect = attempted.filter((entry) => entry.first_attempt_correct).length;
    const accuracy = attempted.length ? Math.round((100 * firstCorrect) / attempted.length) : 0;
    const earned = Object.values(entries).reduce((sum, entry) => sum + (Number(entry.earned_exp) || 0), 0);
    root.querySelector('[data-stat="solved"]').textContent = `${solved}/10`;
    root.querySelector('[data-stat="accuracy"]').textContent = attempted.length ? `${accuracy}% (${firstCorrect}/${attempted.length})` : "—";
    root.querySelector('[data-stat="earned"]').textContent = `${earned}/${MAX_EXP}`;
  };

  const applyEntry = (root, id, entry) => {
    root.__modelingQuizEntries[id] = entry;
    const card = root.querySelector(`[data-quiz-id="${id}"]`);
    if (!card || !entry?.solved) return;
    card.classList.add("is-solved");
    card.querySelectorAll("input, button").forEach((control) => { control.disabled = true; });
    const badge = card.querySelector(".modeling-quiz-card__status");
    if (badge) badge.textContent = copy[root.dataset.locale].completed;
  };

  const loadProgress = async (root) => {
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    root.__modelingQuizEntries = {};
    const ids = questions.map((_question, index) => questionId(index));
    if (!session || !client) {
      const stored = readLocal();
      ids.forEach((id) => { if (stored[id]) applyEntry(root, id, stored[id]); });
      renderStats(root);
      return;
    }

    const [attemptResult, completionResult] = await Promise.all([
      client.from("quiz_attempts").select("quiz_id,attempt_count,first_attempt_correct,solved").in("quiz_id", ids),
      client.from("quiz_completions").select("quiz_id,earned_exp").in("quiz_id", ids),
    ]);
    if (attemptResult.error) {
      const stored = readLocal();
      ids.forEach((id) => { if (stored[id]) applyEntry(root, id, stored[id]); });
      renderStats(root);
      return;
    }
    const expById = new Map((completionResult.data || []).map((row) => [row.quiz_id, Number(row.earned_exp) || 0]));
    (attemptResult.data || []).forEach((row) => applyEntry(root, row.quiz_id, { ...row, earned_exp: expById.get(row.quiz_id) || 0 }));
    renderStats(root);
  };

  const setResult = (card, kind, message) => {
    const output = card.querySelector(".modeling-quiz-card__result");
    output.className = `modeling-quiz-card__result is-${kind}`;
    output.textContent = message;
  };

  const saveFallbackAttempt = async (root, card, definition, selected, client, api) => {
    const id = card.dataset.quizId;
    const labels = copy[root.dataset.locale];
    const correct = arraysMatch(selected, [...definition.answer].sort());
    const stored = readLocal();
    const previous = stored[id] || { attempt_count: 0, solved: false, earned_exp: 0 };
    if (!previous.solved) {
      previous.attempt_count += 1;
      if (previous.attempt_count === 1) previous.first_attempt_correct = correct;
      previous.solved = correct;
    }
    if (!correct) {
      stored[id] = previous;
      writeLocal(stored);
      applyEntry(root, id, previous);
      renderStats(root);
      setResult(card, "incorrect", labels.incorrect);
      return;
    }

    const available = previous.attempt_count === 1 ? definition.exp : Math.ceil(definition.exp / 2);
    const results = await Promise.all(Array.from({ length: available }, (_value, index) =>
      client.rpc("complete_quiz_question", { p_quiz_id: `${id}-xp${index + 1}` })));
    const awarded = results.reduce((sum, result) => {
      if (result.error) return sum;
      const row = Array.isArray(result.data) ? result.data[0] : result.data;
      return sum + (row?.awarded ? 1 : 0);
    }, 0);
    previous.earned_exp = Math.max(Number(previous.earned_exp) || 0, available);
    stored[id] = previous;
    writeLocal(stored);
    applyEntry(root, id, previous);
    renderStats(root);
    setResult(card, "correct", awarded
      ? (previous.first_attempt_correct ? labels.full(awarded) : labels.partial(awarded))
      : labels.already);
    await api.loadExperience?.();
  };

  const checkAnswer = async (button) => {
    const card = button.closest(".modeling-quiz-card");
    const root = button.closest(".modeling-quiz");
    const index = Number(card.dataset.questionIndex);
    const definition = questions[index];
    const locale = root.dataset.locale;
    const labels = copy[locale];
    const selected = [...card.querySelectorAll("input:checked")].map((input) => input.value).sort();
    if (!selected.length) {
      setResult(card, "error", definition.multiple ? labels.chooseMany : labels.choose);
      return;
    }

    const id = questionId(index);
    const explanation = card.querySelector(".modeling-quiz-card__explanation");
    explanation.hidden = false;
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();

    if (!session || !client) {
      const correct = arraysMatch(selected, [...definition.answer].sort());
      const stored = readLocal();
      const previous = stored[id] || { attempt_count: 0, solved: false, earned_exp: 0 };
      if (!previous.solved) {
        previous.attempt_count += 1;
        if (previous.attempt_count === 1) previous.first_attempt_correct = correct;
        previous.solved = correct;
      }
      stored[id] = previous;
      writeLocal(stored);
      applyEntry(root, id, previous);
      renderStats(root);
      setResult(card, correct ? "correct" : "incorrect", correct ? labels.practice(definition.exp) : labels.incorrect);
      return;
    }

    button.disabled = true;
    setResult(card, "checking", labels.saving);
    const { data, error } = await client.rpc("submit_modeling_quiz_answer", {
      p_quiz_id: id,
      p_selected_answers: selected,
    });
    if (error) {
      button.disabled = false;
      await saveFallbackAttempt(root, card, definition, selected, client, api);
      return;
    }
    const outcome = Array.isArray(data) ? data[0] : data;
    const entry = {
      attempt_count: Number(outcome.attempt_count) || 0,
      first_attempt_correct: Boolean(outcome.first_attempt_correct),
      solved: Boolean(outcome.solved),
      earned_exp: (Number(root.__modelingQuizEntries[id]?.earned_exp) || 0) + (outcome.awarded ? Number(outcome.earned_exp) || 0 : 0),
    };
    applyEntry(root, id, entry);
    renderStats(root);
    if (!outcome.answer_correct) {
      button.disabled = false;
      setResult(card, "incorrect", labels.incorrect);
      return;
    }
    setResult(card, "correct", outcome.awarded
      ? (outcome.first_attempt_correct ? labels.full(outcome.earned_exp) : labels.partial(outcome.earned_exp))
      : labels.already);
    await api.loadExperience?.();
  };

  const renderQuiz = (root) => {
    if (root.dataset.quizReady === "true") return;
    root.dataset.quizReady = "true";
    const locale = root.dataset.locale === "zh" ? "zh" : "en";
    root.dataset.locale = locale;
    const labels = copy[locale];
    root.__modelingQuizEntries = {};
    root.innerHTML = `
      <div class="modeling-quiz__header">
        <p>${escapeHtml(labels.intro)}</p>
        <div class="modeling-quiz__stats" aria-live="polite">
          <span><b data-stat="solved">0/10</b>${escapeHtml(labels.solved)}</span>
          <span><b data-stat="accuracy">—</b>${escapeHtml(labels.accuracy)}</span>
          <span><b data-stat="earned">0/${MAX_EXP}</b>${escapeHtml(labels.earned)}</span>
        </div>
      </div>
      <div class="modeling-quiz__questions">
        ${questions.map((definition, index) => {
          const item = definition[locale];
          const inputType = definition.multiple ? "checkbox" : "radio";
          return `<article class="modeling-quiz-card" data-question-index="${index}" data-quiz-id="${questionId(index)}">
            <div class="modeling-quiz-card__meta">
              <span>Q${index + 1}</span>
              <span>${escapeHtml(labels.target)} ${definition.target}%</span>
              <span>${definition.exp} EXP</span>
              <span class="modeling-quiz-card__status"></span>
            </div>
            <h3>${escapeHtml(item.question)}</h3>
            <fieldset>
              <legend>${escapeHtml(definition.multiple ? labels.multiple : labels.single)}</legend>
              ${item.options.map((option, optionIndex) => {
                const letter = LETTERS[optionIndex];
                return `<label><input type="${inputType}" name="modeling-q${index + 1}-${locale}" value="${letter}"><i>${letter}</i><span>${escapeHtml(option)}</span></label>`;
              }).join("")}
            </fieldset>
            <div class="modeling-quiz-card__actions">
              <button type="button" class="modeling-quiz-card__check">${escapeHtml(labels.check)}</button>
              <span class="modeling-quiz-card__result" aria-live="polite"></span>
            </div>
            <div class="modeling-quiz-card__explanation" hidden><strong>${escapeHtml(labels.explanation)}.</strong> ${escapeHtml(item.explanation)}</div>
          </article>`;
        }).join("")}
      </div>`;
    loadProgress(root);
  };

  const hydrate = () => document.querySelectorAll('.modeling-quiz[data-modeling-quiz="lesson-1"]').forEach(renderQuiz);

  if (!window.__modelingQuizInitialized) {
    window.__modelingQuizInitialized = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".modeling-quiz-card__check");
      if (button) checkAnswer(button);
    });
    document.addEventListener("change", (event) => {
      const input = event.target.closest(".modeling-quiz-card input");
      if (!input) return;
      const card = input.closest(".modeling-quiz-card");
      if (card.classList.contains("is-solved")) return;
      card.querySelector(".modeling-quiz-card__explanation").hidden = true;
      setResult(card, "idle", "");
    });
    document.addEventListener("blog-reader:state", () => {
      document.querySelectorAll('.modeling-quiz[data-quiz-ready="true"]').forEach(loadProgress);
    });
  }

  hydrate();
})();
