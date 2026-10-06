(() => {
  "use strict";

  const QUIZ_PREFIX = "comse6998-quiz1-q";
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const quizDefinitions = {
    1: {
      question: "A linear regression model between sales of a product (Y) and advertising budget (X) reports R² = 0.6 and TSS = 0.9. Select all statements that are true.",
      options: [
        "The amount of variability inherent in the sales data before regression is 0.45.",
        "The proportion of variability in Y explained by X is 0.54.",
        "The amount of variability explained by the regression is 0.36.",
        "The amount of variability in sales not explained by the model is 0.36.",
      ],
      answer: ["D"],
    },
    2: {
      question: "Choose the correct order of the machine-learning lifecycle steps: Model training, Monitoring, Model deployment, Retraining, Data preprocessing.",
      options: [
        "Data preprocessing → Model training → Model deployment → Monitoring → Retraining",
        "Model training → Data preprocessing → Monitoring → Model deployment → Retraining",
        "Data preprocessing → Model deployment → Model training → Retraining → Monitoring",
        "Monitoring → Data preprocessing → Model training → Retraining → Model deployment",
      ],
      answer: ["A"],
    },
    3: {
      question: "A contamination test has TP = 100, FP = 300, FN = 250, and TN = 350 across 1,000 water samples. Which bundle correctly gives: correctly classified samples; P(contaminated | predicted negative); precision; and F₁ score?",
      figure: "/blog/images/llm-quiz-1/q03-confusion-matrix.png",
      figureAlt: "Confusion matrix for the drinking-water contamination test",
      options: [
        "450; 41.67%; 25%; 0.27",
        "450; 25%; 41.67%; 0.33",
        "550; 41.67%; 28.57%; 0.27",
        "700; 58.33%; 75%; 0.73",
      ],
      answer: ["A"],
    },
    4: {
      question: "Study the cloud-training benchmark table and select every observation conformant with the data.",
      figure: "/blog/images/llm-quiz-1/q04-cloud-training-cost.png",
      figureAlt: "Training time and cost across GPU and cloud configurations",
      multiple: true,
      options: [
        "Training using K80 and V100 GPUs is costlier on AWS EC2 than on GCP.",
        "Training using K80 and V100 GPUs is less costly on AWS EC2 than on GCP.",
        "Wall-clock time differs across cloud platforms for the same GPU configuration.",
        "For training time below 25 seconds, K80 on GCP is the most cost-effective option.",
      ],
      answer: ["A", "C"],
    },
    5: {
      question: "Select all statements that are true about bias and variance in machine learning.",
      multiple: true,
      options: [
        "Training a complex model with a large amount of representative data should help reduce variance.",
        "When variance is high, increasing model capacity alone will reduce variance.",
        "When a model has high bias, training with more data necessarily lowers it.",
        "Bias is error caused by overly simplistic assumptions in the model.",
      ],
      answer: ["A", "D"],
    },
    6: {
      question: "With 1 < K < P, choose the increasing-training-time order for synchronous SGD variants over the same number of epochs.",
      options: [
        "K-batch sync → K-sync → Fully-sync",
        "K-sync → K-batch sync → Fully-sync",
        "Fully-sync → K-sync → K-batch sync",
        "K-batch sync → Fully-sync → K-sync",
      ],
      answer: ["A"],
    },
    7: {
      question: "With 1 < K < P, choose the increasing-training-time order for asynchronous SGD variants over the same number of epochs.",
      options: [
        "Async → K-batch async → K-async",
        "K-batch async → Async → K-async",
        "K-async → K-batch async → Async",
        "Async → K-async → K-batch async",
      ],
      answer: ["A"],
    },
    8: {
      question: "For the five boundary-case statements in the explanation below, choose the correct True/False sequence in order.",
      options: [
        "True, True, False, True, False",
        "False, True, False, False, True",
        "False, False, True, True, True",
        "False, False, False, True, False",
      ],
      answer: ["D"],
    },
    9: {
      question: "The server starts at W₁₀₀. Six arriving gradients were computed at versions 98, 99, 97, 100, 102, and 101 and are applied one by one. Which answer gives the six staleness values followed by max, min, and mean?",
      figure: "/blog/images/llm-quiz-1/q09-asynchronous-sgd.png",
      figureAlt: "Asynchronous SGD with four workers and a parameter server",
      options: [
        "2, 2, 5, 3, 2, 4; max 5, min 2, mean 3",
        "2, 1, 5, 3, 2, 4; max 5, min 1, mean 2.83",
        "2, 2, 3, 3, 2, 4; max 4, min 2, mean 2.67",
        "2, 3, 5, 4, 4, 5; max 5, min 2, mean 3.83",
      ],
      answer: ["A"],
    },
    10: {
      question: "A synchronous data-parallel experiment uses 131,072 images. Which bundle correctly reports the 256-GPU and 1,024-GPU throughput and the two scaling-efficiency claims?",
      figure: "/blog/images/llm-quiz-1/q10-scaling-efficiency.png",
      figureAlt: "Per-iteration time and scaling efficiency across GPU counts",
      options: [
        "44,281.08 and 159,843.90 images/s; above 85% through 256 GPUs: False; below 75% at 1,024 GPUs: True",
        "44,281.08 and 159,843.90 images/s; above 85% through 256 GPUs: True; below 75% at 1,024 GPUs: False",
        "2.96 and 0.82 images/s; above 85% through 256 GPUs: False; below 75% at 1,024 GPUs: True",
        "42,281.08 and 156,843.90 images/s; above 85% through 256 GPUs: True; below 75% at 1,024 GPUs: True",
      ],
      answer: ["A"],
    },
    11: {
      question: "A distributed setup alternates between a single-reducer parameter server and ring all-reduce. Select every correct communication-cost statement.",
      multiple: true,
      options: [
        "Average communication cost is proportional to N(P−1)(1+1/P).",
        "Communication becomes practically independent of the number of learners for very large P.",
        "Using ring all-reduce every round can scale better than alternating with a parameter server.",
        "Aggregate communication cost remains linear in P even though ring all-reduce is used on alternate rounds.",
      ],
      answer: ["A", "C", "D"],
    },
    12: {
      question: "The four large-minibatch ResNet curves A–D correspond to 8, 64, 128, and 256 servers. Choose the correct mapping.",
      figure: "/blog/images/llm-quiz-1/q12-large-minibatch.png",
      figureAlt: "Large-minibatch distributed training curves A through D",
      options: [
        "A = 8, B = 128, C = 64, D = 256",
        "A = 8, B = 64, C = 128, D = 256",
        "A = 256, B = 128, C = 64, D = 8",
        "A = 64, B = 8, C = 256, D = 128",
      ],
      answer: ["A"],
    },
    13: {
      question: "Select all statements that are true about sequence-to-sequence models without attention.",
      multiple: true,
      options: [
        "Both the encoder and decoder maintain hidden states.",
        "The context passed from encoder to decoder is the encoder's last hidden state.",
        "The decoder gives different scores to different encoder hidden states.",
        "The context vector is a bottleneck because it is computationally expensive to compute.",
      ],
      answer: ["A", "B"],
    },
    14: {
      question: "Which statements about Transformers are true? Select all that apply.",
      multiple: true,
      options: [
        "Transformers consist of a single encoder and decoder network.",
        "Residual connections are applied around attention layers and help gradient flow.",
        "Unlike RNNs, Transformers can process all input positions in parallel within a layer during training.",
        "Different encoder layers normally share their weights.",
      ],
      answer: ["B", "C"],
    },
    15: {
      question: "In self-attention, how are neighboring word values used to compute the context for a given word?",
      options: [
        "Select the lowest neighboring value.",
        "Take a simple average of neighboring values.",
        "Take a learned weighted sum of the value vectors.",
        "Select the highest neighboring value.",
      ],
      answer: ["C"],
    },
    16: {
      question: "Select all statements that are true about attention mechanisms in the original encoder–decoder Transformer.",
      multiple: true,
      options: [
        "Both self-attention and encoder–decoder attention are used in the decoder.",
        "Encoder–decoder attention is used only in the decoder.",
        "Self-attention is used only in the encoder.",
        "Both self-attention and encoder–decoder attention are used in the encoder.",
      ],
      answer: ["A", "B"],
    },
    17: {
      question: "BERT uses both self-attention layers and encoder–decoder attention. True or False?",
      options: ["True", "False"],
      answer: ["B"],
    },
    18: {
      question: "OpenAI GPT uses masked self-attention layers and no encoder–decoder attention. True or False?",
      options: ["True", "False"],
      answer: ["A"],
    },
    19: {
      question: "ELMo combines jointly trained left-to-right and right-to-left LSTMs to generate contextualized embeddings. True or False?",
      options: ["True", "False"],
      answer: ["A"],
    },
    20: {
      question: "Why is positional encoding necessary in Transformer architectures?",
      options: [
        "Attention weights are not normalized.",
        "Tokens vary in embedding dimension.",
        "Token order is otherwise lost.",
        "Transformers do not use activation functions.",
      ],
      answer: ["C"],
    },
    21: {
      question: "Layer normalization computes normalization statistics over which dimension?",
      options: [
        "Across all tokens in the batch",
        "Over the components of a single token embedding",
        "Across the full dataset",
        "Over the vocabulary space",
      ],
      answer: ["B"],
    },
    22: {
      question: "What is a primary architectural benefit of mixture-of-experts (MoE) over dense feed-forward layers?",
      options: [
        "Sparse activation reduces computation relative to activating every expert.",
        "MoE cannot be used with attention mechanisms.",
        "Every expert is activated for every input.",
        "MoE has lower expressive capacity.",
      ],
      answer: ["A"],
    },
    23: {
      question: "In an MoE Transformer layer, how are experts typically selected during inference?",
      options: [
        "By applying batch normalization",
        "By uniform random choice",
        "By a learned router mechanism",
        "By sorting parameters by magnitude",
      ],
      answer: ["C"],
    },
    24: {
      question: "How are token and position embeddings normally combined at a Transformer input?",
      options: [
        "Concatenation only",
        "Multiplication",
        "Element-wise addition",
        "Subtraction",
      ],
      answer: ["C"],
    },
    25: {
      question: "Where is layer normalization applied in a standard pre-norm Transformer block?",
      options: [
        "It is replaced entirely by dropout.",
        "Only after the final output layer",
        "Before every attention and feed-forward sublayer",
        "Between token and position embedding addition",
      ],
      answer: ["C"],
    },
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const getQuestionNumber = (card) => {
    const label = card.querySelector(".llm-quiz-practice__label")?.textContent || "";
    return Number(label.match(/Q\s*(\d+)/i)?.[1] || 0);
  };

  const selectedValues = (card) =>
    [...card.querySelectorAll(".llm-quiz-option input:checked")]
      .map((input) => input.value)
      .sort();

  const arraysMatch = (left, right) =>
    left.length === right.length && left.every((value, index) => value === right[index]);

  const setResult = (card, kind, message) => {
    const result = card.querySelector(".llm-quiz-result");
    if (!result) return;
    result.className = `llm-quiz-result is-${kind}`;
    result.textContent = message;
  };

  const markCompleted = (card) => {
    card.classList.add("is-completed");
    let badge = card.querySelector(".llm-quiz-completed-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "llm-quiz-completed-badge";
      badge.textContent = "Completed · +1 EXP";
      card.querySelector("summary")?.appendChild(badge);
    }
  };

  const rewardCorrectAnswer = async (card) => {
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    if (!session || !client) {
      setResult(card, "correct", "Correct. Sign in with GitHub to earn 1 EXP for your first correct solve.");
      return;
    }

    const button = card.querySelector(".llm-quiz-check");
    if (button) button.disabled = true;
    setResult(card, "checking", "Correct — saving your result…");
    const { data, error } = await client.rpc("complete_quiz_question", {
      p_quiz_id: card.dataset.quizId,
    });
    if (error) {
      if (button) button.disabled = false;
      setResult(card, "error", "Correct, but EXP could not be synced. Please try again in a moment.");
      return;
    }

    const outcome = Array.isArray(data) ? data[0] : data;
    markCompleted(card);
    setResult(
      card,
      "correct",
      outcome?.awarded ? "Correct — first correct solve, +1 EXP!" : "Correct — this question has already awarded its EXP.",
    );
    await api.loadExperience?.();
  };

  const checkAnswer = async (card) => {
    const definition = quizDefinitions[getQuestionNumber(card)];
    if (!definition) return;
    const selected = selectedValues(card);
    if (!selected.length) {
      setResult(card, "error", definition.multiple ? "Select one or more answers first." : "Select an answer first.");
      return;
    }

    const answer = [...definition.answer].sort();
    const explanation = card.querySelector(".llm-quiz-answer");
    explanation?.removeAttribute("hidden");
    if (!arraysMatch(selected, answer)) {
      card.classList.remove("is-correct");
      card.classList.add("is-incorrect");
      setResult(card, "incorrect", "Not quite. Read the explanation, adjust your choice, and try again.");
      return;
    }

    card.classList.remove("is-incorrect");
    card.classList.add("is-correct");
    await rewardCorrectAnswer(card);
  };

  const renderCard = (card) => {
    if (card.dataset.quizReady === "true") return;
    const number = getQuestionNumber(card);
    const definition = quizDefinitions[number];
    const body = card.querySelector(".llm-quiz-practice__body");
    const question = body?.querySelector(":scope > p");
    const explanation = body?.querySelector(".llm-quiz-answer");
    if (!definition || !body || !question || !explanation) return;

    card.dataset.quizReady = "true";
    card.dataset.quizId = `${QUIZ_PREFIX}${number}`;
    question.innerHTML = `<strong>Question.</strong> ${escapeHtml(definition.question)}`;
    explanation.hidden = true;
    const answerTitle = explanation.querySelector("strong");
    if (answerTitle) answerTitle.textContent = "Explanation.";

    if (definition.figure) {
      const figure = document.createElement("figure");
      figure.className = "llm-quiz-figure";
      figure.innerHTML = `<img src="${escapeHtml(definition.figure)}" alt="${escapeHtml(definition.figureAlt || "Quiz reference figure")}" loading="lazy">`;
      question.insertAdjacentElement("afterend", figure);
    }

    const fieldset = document.createElement("fieldset");
    fieldset.className = "llm-quiz-options";
    const inputType = definition.multiple ? "checkbox" : "radio";
    fieldset.innerHTML = `
      <legend>${definition.multiple ? "Select all that apply" : "Select one answer"}</legend>
      ${definition.options
        .map((option, index) => {
          const letter = LETTERS[index];
          return `<label class="llm-quiz-option"><input type="${inputType}" name="quiz-${number}" value="${letter}"><span class="llm-quiz-option__letter">${letter}</span><span>${escapeHtml(option)}</span></label>`;
        })
        .join("")}
    `;

    const actions = document.createElement("div");
    actions.className = "llm-quiz-actions";
    actions.innerHTML = '<button class="llm-quiz-check" type="button">Check answer</button><span class="llm-quiz-result" aria-live="polite"></span>';
    explanation.insertAdjacentElement("beforebegin", fieldset);
    explanation.insertAdjacentElement("beforebegin", actions);
  };

  const loadCompletedQuestions = async () => {
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    const cards = [...document.querySelectorAll('.llm-quiz-practice[data-quiz-id]')];
    if (!session || !client || !cards.length) return;
    const ids = cards.map((card) => card.dataset.quizId);
    const { data, error } = await client.from("quiz_completions").select("quiz_id").in("quiz_id", ids);
    if (error) return;
    const completed = new Set((data || []).map((row) => row.quiz_id));
    cards.forEach((card) => {
      if (completed.has(card.dataset.quizId)) markCompleted(card);
    });
  };

  const hydrate = () => {
    document.querySelectorAll(".llm-quiz-practice").forEach(renderCard);
    loadCompletedQuestions();
  };

  if (!window.__llmQuizPracticeInitialized) {
    window.__llmQuizPracticeInitialized = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".llm-quiz-check");
      if (!button) return;
      const card = button.closest(".llm-quiz-practice");
      if (card) checkAnswer(card);
    });
    document.addEventListener("change", (event) => {
      const input = event.target.closest(".llm-quiz-option input");
      if (!input) return;
      const card = input.closest(".llm-quiz-practice");
      if (!card || card.classList.contains("is-correct")) return;
      card.classList.remove("is-incorrect");
      const explanation = card.querySelector(".llm-quiz-answer");
      if (explanation) explanation.hidden = true;
      setResult(card, "idle", "");
    });
    document.addEventListener("blog-reader:state", (event) => {
      if (event.detail?.signedIn) loadCompletedQuestions();
    });
  }

  window.__llmQuizPractice = { hydrate };
  hydrate();
})();
