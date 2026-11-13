---
title: LLM 8 - Evaluating Language Models
date: 2026-10-30 18:00:00
categories: COMS6998E LLM-Based Generative AI
tags:
  - LLM Evaluation
  - GLUE
  - SuperGLUE
  - ROUGE
  - BLEU
  - Reasoning Evaluation
  - TravelPlanner
  - LLMPerf
mathjax: true
cover: "/images/columbia-low-memorial-library.jpg"
excerpt: "A rigorous guide to benchmark suites, lexical metrics, reasoning evaluation, constraint-based agent tests, and production performance measurements for LLMs."
lesson_number: 8
lesson_level: 1
study_time: 120
---

Welcome back. [LLM 7](/blog/2026/10/23/LLM-7-Efficient-LLM-Serving/) ended with a fast serving system. Speed, however, does not tell us whether the answer is correct, faithful, fair, useful, or even produced under the same conditions as another system. Evaluation is the contract that turns “this model feels better” into a claim that another person can inspect.

The difficult part is not calculating one score. It is deciding **what success means**. A classifier, translator, reasoning model, travel-planning agent, and production API fail in different ways. Exact match can be too strict for open text and too loose for a plan with hidden constraint violations. Lexical overlap can reward copied words while missing a negation. An average benchmark score can hide a catastrophic failure on one high-risk slice. A throughput number can ignore time to first token.

This blog builds evaluation from four layers:

1. **capability suites** such as GLUE, SuperGLUE, MMLU, BIG-bench, and HELM;
2. **output metrics** such as ROUGE and BLEU;
3. **structured reasoning and agent evaluation** through ROSCOE and TravelPlanner;
4. **systems evaluation** through latency, throughput, load tests, and correctness checks.

The layers are complementary. A model can lead on MMLU yet be unusable under production latency. It can have high ROUGE yet reverse the meaning of the reference. It can satisfy most travel constraints individually while failing every itinerary as a whole.

## 1. Evaluation Is a Measurement Design

Before selecting a benchmark, write the decision that the evaluation will support. Are we choosing a base model? Approving a new fine-tuned checkpoint? Monitoring regressions? Comparing serving providers? Deciding whether an agent is safe enough to book travel? Different decisions require different evidence.

A useful evaluation specification names:

- the target users and task distribution;
- the allowed inputs, tools, and context;
- the required output contract;
- the qualities to measure;
- unacceptable failure modes;
- latency and cost constraints;
- the comparison baseline;
- the uncertainty or confidence interval around each result.

For an example-level score $s_i$, the sample mean is

$$
\bar{s}=\frac{1}{n}\sum_{i=1}^{n}s_i.
$$

But $\bar{s}$ alone does not reveal variation across domains, languages, prompt templates, or difficulty. Bootstrap resampling can estimate a confidence interval; paired resampling is preferable when two models are evaluated on the same examples because it preserves example-level correlation. If a claimed improvement is smaller than run-to-run and sample uncertainty, a larger decimal display does not make it real.

Contamination is another threat. If benchmark questions or near-duplicates appeared in training data, the score may measure recall rather than generalization. Benchmark saturation creates a related problem: when most strong systems are near the ceiling, small differences become unstable and no longer reveal which model is better on the actual deployment distribution.

> **A benchmark is not the target capability.** It is a finite instrument designed to probe that capability under a particular format, dataset, metric, and time period.

## 2. GLUE and SuperGLUE

### GLUE

GLUE, the General Language Understanding Evaluation benchmark, combined nine English natural-language understanding tasks behind one evaluation interface. It was intentionally architecture-agnostic: a model was judged by task behavior rather than by whether it used an RNN, Transformer, or another representation.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-004.webp" alt="GLUE benchmark task collection" loading="lazy" decoding="async"><figcaption>GLUE combines tasks that probe acceptability, sentiment, paraphrase, semantic similarity, and inference. Course slide 4.</figcaption></figure>

The tasks measure different things:

- **CoLA:** whether a sentence is grammatically acceptable; commonly scored with Matthews correlation because labels are imbalanced.
- **SST-2:** binary sentiment classification.
- **MRPC:** whether two sentences are paraphrases.
- **QQP:** whether two Quora questions are duplicates.
- **STS-B:** semantic similarity on a graded scale rather than a hard class.
- **MNLI:** entailment, contradiction, or neutrality across multiple genres.
- **QNLI:** a question-answering dataset recast as sentence-pair classification.
- **RTE:** textual entailment from several sources.
- **WNLI:** inference involving pronoun resolution, derived from Winograd-style examples.

These tasks do not share one natural metric. Accuracy is appropriate for some; F1 matters for imbalanced pair classification; Pearson and Spearman correlations measure graded similarity; Matthews correlation handles the CoLA label structure. A leaderboard aggregate is convenient, but it combines quantities with different meanings. Always retain the task-level vector.

GLUE was valuable partly because it became difficult. Once pretrained language models approached or exceeded the benchmark's human baselines, the suite stopped separating leading systems effectively. That did not prove general language understanding had been solved. It showed the instrument had reached its useful ceiling.

### SuperGLUE

SuperGLUE was designed as a harder successor with eight tasks emphasizing reasoning, coreference, word meaning, question answering, and inference.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-013.webp" alt="SuperGLUE task suite" loading="lazy" decoding="async"><figcaption>SuperGLUE raises the difficulty with multi-sentence reasoning, causal choice, coreference, and word-sense tasks. Course slide 13.</figcaption></figure>

- **BoolQ:** answer a yes/no question from a passage.
- **CB:** classify entailment, contradiction, or neutrality in a small commitment dataset.
- **COPA:** choose the more plausible cause or effect.
- **MultiRC:** identify multiple correct answers using a passage; evaluation must account for both individual choices and complete questions.
- **ReCoRD:** fill a missing entity using a passage and commonsense reasoning.
- **RTE:** textual entailment.
- **WiC:** decide whether a word has the same sense in two contexts.
- **WSC:** resolve a pronoun whose antecedent requires commonsense reasoning.

SuperGLUE illustrates why example format matters. COPA can be solved as a two-choice likelihood comparison; MultiRC is multi-label; ReCoRD uses entity candidates; CB is tiny enough that variance can be large. A single “SuperGLUE score” should never replace inspection of per-task behavior and prompt sensitivity.

## 3. Broader Benchmark Suites

### MMLU, BIG-bench, and BIG-bench Hard

MMLU evaluates multiple-choice knowledge and problem solving across 57 subjects, ranging from elementary mathematics to law, medicine, computer science, and humanities. It provides breadth, but multiple-choice success is not equivalent to reliable free-form reasoning. Option order, prompt wording, few-shot examples, and answer extraction can change the result.

BIG-bench collected more than 200 diverse tasks from a broad research collaboration. BIG-bench Hard selected 23 tasks on which earlier language models performed poorly and on which chain-of-thought prompting often helped. The subset is useful for difficult reasoning patterns, but selection on model difficulty means it represents a deliberately challenging slice, not natural production frequency.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-020.webp" alt="Comparison of MMLU BIG-bench and BIG-bench Hard" loading="lazy" decoding="async"><figcaption>MMLU emphasizes broad subjects; BIG-bench emphasizes task diversity; BBH isolates difficult reasoning tasks. Course slide 20.</figcaption></figure>

SWE-bench moves evaluation from short answers to repository-level software maintenance. A system receives a real issue and a codebase, must identify the relevant files, understand interactions across functions, propose an edit, and pass tests without breaking unrelated behavior. The hard part is therefore not merely recalling a programming fact or paying for a large model. It is sustained, multi-step reasoning over a changing external state: search, inspect, form a hypothesis, edit, run tests, interpret failure, and revise.

<details class="llm-quiz-practice" data-quiz-set="3"><summary><span class="llm-quiz-practice__label">Quiz 3 · Q3</span><span>Identify a real-world LLM challenge</span></summary><div class="llm-quiz-practice__body"><p><strong>Question.</strong> What is a common challenge in real-world applications such as SWE-bench?</p><div class="llm-quiz-answer"><strong>Answer.</strong> Performing complex reasoning. Repository-level tasks require the system to connect an issue to the right code, coordinate tools, maintain state across steps, and verify the repair with tests. Compute cost and model size matter operationally, but they are not the capability challenge singled out here.</div></div></details>

For any multiple-choice benchmark, specify the scoring procedure. Let $a_j$ be candidate answer $j$ with token sequence $(a_{j,1},\ldots,a_{j,m_j})$. One score is length-normalized conditional log-likelihood:

$$
S(a_j\mid x)=\frac{1}{m_j}\sum_{t=1}^{m_j}\log p(a_{j,t}\mid x,a_{j,<t}).
$$

Without length normalization, shorter options may be favored. With generated letter answers, parsing failures become part of the result. Neither method is automatically correct; the report must say which one was used.

### HELM

HELM—Holistic Evaluation of Language Models—argues that capability should be evaluated across **scenarios** and **metrics**, not compressed into accuracy alone. Its core evaluation covers 16 scenarios and seven broad metric families: accuracy, calibration, robustness, fairness, bias, toxicity, and efficiency.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-022.webp" alt="HELM scenarios and metric coverage" loading="lazy" decoding="async"><figcaption>HELM expands evaluation from one accuracy column to scenario–metric coverage with standardized reporting. Course slide 22.</figcaption></figure>

This matters because two models with the same accuracy may behave differently. One may be well-calibrated and robust to paraphrase but more toxic; another may be efficient but show a large demographic performance gap. A deployment decision must preserve these trade-offs rather than average them away.

Calibration asks whether stated confidence matches empirical correctness. If predictions assigned confidence near $0.8$ are correct only half the time, the model is overconfident. Expected calibration error partitions predictions into confidence bins $B_m$:

$$
\operatorname{ECE}=\sum_{m=1}^{M}\frac{|B_m|}{n}\left|\operatorname{acc}(B_m)-\operatorname{conf}(B_m)\right|.
$$

ECE depends on binning and should not be treated as a complete calibration description. Reliability plots and task slices provide the missing shape.

## 4. ROUGE and BLEU

### N-gram Overlap

An $n$-gram is a contiguous sequence of $n$ tokens. Unigrams contain one token, bigrams contain two, and so on. Overlap metrics compare the $n$-grams in a generated output with one or more human references.

ROUGE-$n$ recall, precision, and F1 can be written as

$$
R_n=\frac{M_n}{N_n^{ref}},\qquad
P_n=\frac{M_n}{N_n^{gen}},\qquad
F_{1,n}=\frac{2P_nR_n}{P_n+R_n},
$$

where $M_n$ is the clipped number of matching $n$-grams. Clipping prevents a candidate from receiving repeated credit for more occurrences than the reference contains.

For reference “It is cold outside” and candidate “It is very cold outside,” the reference has four unigrams and the candidate five. All four reference unigrams occur in the candidate, so

$$
R_1=\frac{4}{4}=1,\qquad
P_1=\frac{4}{5}=0.8,\qquad
F_{1,1}=\frac{2(1)(0.8)}{1+0.8}\approx0.889.
$$

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-026.webp" alt="ROUGE-1 recall precision and F1 example" loading="lazy" decoding="async"><figcaption>ROUGE-1 rewards unigram coverage; precision and recall expose different kinds of mismatch. Course slide 26.</figcaption></figure>

The reference bigrams are “It is,” “is cold,” and “cold outside.” The candidate bigrams are “It is,” “is very,” “very cold,” and “cold outside.” Two match, giving

$$
R_2=\frac{2}{3}\approx0.667,\qquad
P_2=\frac{2}{4}=0.5,\qquad
F_{1,2}\approx0.571.
$$

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-027.webp" alt="ROUGE-2 bigram overlap example" loading="lazy" decoding="async"><figcaption>ROUGE-2 is more sensitive to local word order than ROUGE-1. Course slide 27.</figcaption></figure>

### ROUGE-L and a Correct LCS Calculation

ROUGE-L uses the longest common subsequence (LCS): tokens must preserve order but need not be contiguous. For the same pair of sentences, the LCS is **“It is cold outside,” length 4**. Therefore

$$
R_{L}=\frac{4}{4}=1,\qquad
P_{L}=\frac{4}{5}=0.8,\qquad
F_{1,L}\approx0.889.
$$

This is worth calculating directly because a displayed classroom example can contain a counting typo. Evaluation code should be tested on hand-checkable cases before it is trusted on a leaderboard.

ROUGE can still be fooled. “cold cold cold cold” repeats a reference word but conveys almost none of the sentence. Clipping reduces its unigram precision to $1/4$, but “outside cold it is” contains all four words and can score perfectly on unigram precision despite broken order. ROUGE-2 and ROUGE-L penalize some ordering errors, yet none of these metrics proves factual equivalence or fluency.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-029.webp" alt="Repetition and word-order failure cases for overlap metrics" loading="lazy" decoding="async"><figcaption>Clipped counts fix unlimited repetition credit, but unigram overlap still cannot understand syntax or meaning. Course slide 29.</figcaption></figure>

### BLEU

BLEU was developed for corpus-level machine translation evaluation. It combines modified $n$-gram precisions using a geometric mean and applies a brevity penalty:

$$
\operatorname{BLEU}=BP\cdot\exp\left(\sum_{n=1}^{N}w_n\log p_n\right),
$$

where $p_n$ is clipped $n$-gram precision and typically $w_n=1/N$. If candidate length is $c$ and effective reference length is $r$,

$$
BP=\begin{cases}
1,&c>r,\\
\exp(1-r/c),&c\le r.
\end{cases}
$$

The brevity penalty prevents a short phrase containing a few highly precise words from winning by omitting most of the translation. BLEU is most stable over a corpus; sentence-level BLEU can become zero when one higher-order precision has no matches unless smoothing is used.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-030.webp" alt="BLEU scores for three candidate translations" loading="lazy" decoding="async"><figcaption>BLEU combines several n-gram precisions, so candidates with different omissions and phrase matches receive different scores. Course slide 30.</figcaption></figure>

Tokenization, casing, punctuation normalization, reference count, smoothing, and library version all change ROUGE and BLEU. Report the implementation, not just the metric name. Most importantly, use human or semantic/factual evaluation when meaning matters. High overlap is evidence of surface similarity, not proof of correctness.

## 5. Evaluating Reasoning

### Correct Answers Can Hide Bad Rationales

Chain-of-thought, tree search, and tool-using methods expose intermediate text. That text can help a model solve a task, but a correct final answer does not prove the written reasoning is faithful. A rationale can contain a factual error repaired later, invent an unsupported step, repeat itself, omit a necessary inference, or contradict the source while landing on the right choice.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-034.webp" alt="Taxonomy of errors in generated reasoning chains" loading="lazy" decoding="async"><figcaption>Reasoning evaluation must distinguish grammar, factuality, hallucination, redundancy, missing steps, coherence, and arithmetic errors. Course slide 34.</figcaption></figure>

ROSCOE organizes automatic reasoning-chain metrics into four families:

1. semantic alignment with the source or reference;
2. semantic similarity of complete chains or steps;
3. logical inference and contradiction;
4. language coherence and grammaticality.

Let source context be $S=(s_1,\ldots,s_T)$ and a generated hypothesis chain be $H=(h_1,\ldots,h_N)$. With sentence embeddings and cosine similarity, a normalized step-to-source alignment is

$$
\alpha_i=\frac{1+\max_{1\le j\le T}\cos(h_i,s_j)}{2}\in[0,1],
$$

and the reasoning alignment vector is

$$
r\text{-align}(H\rightarrow S)=(\alpha_1,\ldots,\alpha_N).
$$

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-038.webp" alt="Reasoning alignment vector between generated steps and source sentences" loading="lazy" decoding="async"><figcaption>Each generated step is compared with its most similar source sentence, creating a grounding profile across the chain. Course slide 38.</figcaption></figure>

The mean alignment can serve as a step-level faithfulness signal. Bidirectional coverage asks both whether hypothesis steps are grounded in the source and whether important source information appears in the hypothesis. Comparing with an optional gold reasoning chain can reveal redundancy or missing content.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-039.webp" alt="ROSCOE semantic alignment metrics" loading="lazy" decoding="async"><figcaption>ROSCOE derives separate signals for faithfulness, information coverage, hallucination, and redundancy. Course slide 39.</figcaption></figure>

Whole-chain embedding similarity measures broad semantic agreement but can hide one fatal step. Step-level repetition detects whether a new step paraphrases earlier reasoning. Natural-language-inference models estimate contradiction probabilities between steps or between a step and the source. Perplexity and grammatical acceptability measure fluency.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-041.webp" alt="Logical inference metrics for reasoning chains" loading="lazy" decoding="async"><figcaption>NLI-based scores probe contradictions within a chain and between the chain and its source. Course slide 41.</figcaption></figure>

These automatic metrics are diagnostic, not ground truth. Embedding similarity can confuse topical overlap with entailment. An NLI model carries its own domain errors. Perplexity rewards conventional language, not sound logic. Human review and task-specific executable checks remain essential for high-stakes reasoning.

## 6. TravelPlanner

### Why Planning Needs Constraint Evaluation

TravelPlanner evaluates an LLM agent on 1,225 natural-language trip requests with reference information and constraints. A request can specify cities, dates, duration, budget, room type, cuisine, transport preferences, and other requirements. The agent may use tools for city search, flights, distances, restaurants, attractions, and accommodation, store observations in a notebook, and construct an itinerary.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-044.webp" alt="TravelPlanner workflow from user query through tools and notebook to itinerary" loading="lazy" decoding="async"><figcaption>TravelPlanner evaluates a complete tool-assisted planning workflow rather than one isolated answer. Course slide 44.</figcaption></figure>

The benchmark checks **commonsense constraints**—reasonable routes, complete information, transport consistency, minimum stays, and conflict-free schedules—alongside **hard constraints** such as budget, room, cuisine, and transportation requirements. Difficulty grows as the itinerary and constraint set become more complex.

An answer may look fluent while naming a nonexistent flight, booking a seven-night-minimum apartment for three days, exceeding the budget, or scheduling dinner in a city the traveler has already left. These failures are not reliably measured by lexical similarity to one reference plan. They require explicit validators over structured itinerary fields.

### Micro and Macro Pass Rates

Let $P$ be the set of plans and $C_p$ the constraints for plan $p$. The micro pass rate is

$$
\operatorname{Micro}=\frac{\sum_{p\in P}\sum_{c\in C_p}\mathbf 1[\operatorname{pass}(c,p)]}{\sum_{p\in P}|C_p|}.
$$

It asks: what fraction of individual constraints were satisfied? The macro pass rate is

$$
\operatorname{Macro}=\frac{1}{|P|}\sum_{p\in P}\mathbf 1[\text{all constraints in }C_p\text{ pass}].
$$

It asks: what fraction of entire plans are completely valid?

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-049.webp" alt="Micro and macro constraint pass-rate definitions" loading="lazy" decoding="async"><figcaption>Micro scoring gives partial credit per constraint; macro scoring requires a complete plan to satisfy every applicable constraint. Course slide 49.</figcaption></figure>

The gap can be enormous. If each plan has ten independent constraints and a model passes each with probability $0.9$, expected micro performance is 90%, but the probability of a perfect plan is

$$
0.9^{10}\approx0.349.
$$

With 20 constraints it drops to about 12%. This explains why a respectable component score may coexist with almost no deployable outputs.

The presented TravelPlanner results show strong models achieving high delivery rates but extremely low final pass rates under the complete constraint set. GPT-4-Turbo reached only about $0.6\%$ final pass rate in the reported test configuration. This is a historical benchmark result under a particular model version and prompting setup, not a statement about every current GPT-4-family system.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-050.webp" alt="TravelPlanner model performance table" loading="lazy" decoding="async"><figcaption>High delivery and micro pass rates do not guarantee a plan that satisfies every hard and commonsense constraint. Course slide 50.</figcaption></figure>

Failure traces reveal tool loops, nonexistent transport, impossible accommodation, budget violations, and unsuccessful self-reflection. ReAct and Reflexion can help organize interaction, but prompting strategies do not automatically solve state tracking or constraint satisfaction.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-051.webp" alt="TravelPlanner failure examples for tool use direct generation and reflection" loading="lazy" decoding="async"><figcaption>Inspecting trajectories explains why an apparently complete itinerary fails the executable checks. Course slide 51.</figcaption></figure>

For a real planner, evaluation should add safety and business slices: inaccessible routes, visa constraints, timezone boundaries, cancellations, children, mobility needs, and stale inventories. The benchmark teaches a general lesson: agent evaluation should score **state transitions and constraints**, not only final prose.

## 7. Systems Metrics

Evaluation must also ask whether a correct model can serve users. The main inference metrics are:

- **requests per minute** or request throughput;
- **output tokens per second**;
- **time to first token (TTFT)**;
- **inter-token latency (ITL)**;
- **end-to-end latency**;
- **error and timeout rate**;
- **cost per successful request**.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-031.webp" alt="Latency throughput and cost metrics for LLM inference" loading="lazy" decoding="async"><figcaption>Interactive quality depends on startup delay and token cadence as well as aggregate throughput. Course slide 31.</figcaption></figure>

For output length $N$, a rough streaming latency model is

$$
T_{e2e}\approx T_{TTFT}+(N-1)\overline{T}_{ITL}.
$$

This hides queueing variability and changing batch composition, so record distributions. Median TTFT can look excellent while p99 reveals overloaded periods. Tokens per second must state whether it is per request or aggregated across concurrent requests. A server can have high aggregate throughput while each user sees slow token delivery.

Cost should be normalized by success. If a cheaper model requires repeated retries, tool corrections, or human repair, dollars per generated token understate the operational cost. Define a successful request through the task evaluator, then compute

$$
\text{cost per success}=\frac{\text{total measured serving cost}}{\text{number of accepted outputs}}.
$$

## 8. LLMPerf

LLMPerf is a tool for comparing LLM APIs with two complementary tests: a load test for performance and a correctness test for basic output behavior.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm8-evaluation/llm8-slide-052.webp" alt="LLMPerf load and correctness test overview" loading="lazy" decoding="async"><figcaption>LLMPerf separates performance under concurrent load from a simple answer-correctness check. Course slide 52.</figcaption></figure>

The load test sends concurrent requests and records ITL and generation throughput per request and across the workload. Its example prompt asks APIs to stream sampled lines from Shakespeare. A common tokenizer is used to count tokens consistently across providers. This improves comparability, but token counts from an external tokenizer may differ from a provider's internal billing or generation tokens. Report that limitation.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-053.webp" alt="LLMPerf concurrent load-test prompt and measurements" loading="lazy" decoding="async"><figcaption>The load test standardizes prompts and token counting while varying concurrency. Course slide 53.</figcaption></figure>

The correctness test converts randomized numbers written in words into digits. For example, “one hundred and twenty-three” should produce `123`. This is deliberately simple: it detects malformed or inconsistent responses while the load test runs. It does not establish general model correctness.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-054.webp" alt="LLMPerf number conversion correctness test" loading="lazy" decoding="async"><figcaption>A narrow deterministic task verifies that performance measurements are not obtained from unusable outputs. Course slide 54.</figcaption></figure>

Provider leaderboards must be interpreted as time-stamped experiments. Hardware, routing, quotas, model revisions, quantization, regions, and API policies change. A box plot of output tokens per second is more informative than one mean because it exposes variability, but it still applies only to the tested request distribution.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm8-evaluation/llm8-slide-055.webp" alt="LLM API output-throughput distributions" loading="lazy" decoding="async"><figcaption>Provider performance is a distribution and can change with model revision, region, concurrency, and measurement date. Course slide 55.</figcaption></figure>

When repeating such a benchmark, record timestamp, region, account tier, concurrency, prompt and output lengths, streaming mode, retry policy, timeout, tokenizer, model identifier, temperature, and rate-limit errors. Otherwise two runs cannot be compared responsibly.

## 9. Building an Evaluation Portfolio

No single benchmark can approve a language-model system. Build an evaluation portfolio in layers:

1. **Unit tests:** deterministic formatting, parsing, tool schemas, and hand-calculated metric cases.
2. **Capability tests:** relevant public benchmarks and internal task sets.
3. **Slice tests:** rare, difficult, safety-critical, multilingual, long-context, and adversarial cases.
4. **Reasoning diagnostics:** faithfulness, contradiction, missing steps, and executable intermediate checks.
5. **Agent tests:** tool selection, state tracking, constraint satisfaction, and recovery from tool failure.
6. **Human evaluation:** usefulness, clarity, factual support, and preference under a written rubric.
7. **Systems tests:** TTFT, ITL, throughput, errors, cost, and tail latency under realistic load.
8. **Production monitoring:** drift, corrections, escalations, feedback, and newly discovered failure clusters.

Use a frozen regression set for release gates and a separate development set for prompt and model iteration. Version the dataset, evaluator code, prompts, model, decoding configuration, and serving stack. When the evaluator itself is an LLM, validate it against human labels, measure agreement, randomize presentation order, and guard against prompt injection inside evaluated outputs.

Public benchmarks are useful for external comparison, but an internal acceptance test should mirror the actual decision distribution. A medical summarizer, code assistant, and travel planner should not share the same definition of correctness. Their high-cost errors are different.

> **The central evaluation lesson:** a score is meaningful only when its examples, metric, protocol, and decision are aligned. Good evaluation does not ask whether a model is “smart.” It asks whether a specified system succeeds on a specified distribution under specified constraints—and shows where it does not.

### References

- Wang et al., [GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding](https://arxiv.org/abs/1804.07461).
- Wang et al., [SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems](https://arxiv.org/abs/1905.00537).
- Hendrycks et al., [Measuring Massive Multitask Language Understanding](https://arxiv.org/abs/2009.03300).
- Liang et al., [Holistic Evaluation of Language Models](https://arxiv.org/abs/2211.09110).
- Golovneva et al., [ROSCOE: A Suite of Metrics for Scoring Step-by-Step Reasoning](https://arxiv.org/abs/2212.07919).
- Xie et al., [TravelPlanner: A Benchmark for Real-World Planning with Language Agents](https://arxiv.org/abs/2402.01622).
- Ray Project, [LLMPerf](https://github.com/ray-project/llmperf).
