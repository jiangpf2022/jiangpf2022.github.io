---
title: LLM 3 - Decoding, Prompting, and Applications
date: 2026-09-25 18:00:00
categories: COMS6998E LLM-Based Generative AI
tags:
  - Decoding
  - Prompt Engineering
  - In-Context Learning
  - Reasoning
  - LLM Applications
mathjax: true
cover: "/images/columbia-low-memorial-library.jpg"
excerpt: "How an LLM turns next-token probabilities into text, how prompts and demonstrations steer its behavior, and how reasoning patterns, tools, retrieval, and validation turn a model into a dependable application."
lesson_number: 3
lesson_level: 1
study_time: 80
---

Welcome back. In [LLM 2](/blog/2026/09/18/LLM-2-Attention-and-Transformers/) we opened the Transformer and followed information through embeddings, attention, feed-forward blocks, BERT, and GPT. Today we begin at the point where that architecture has already produced a vector of scores for the next token. A surprisingly large part of an LLM application's behavior is determined by what happens next: how those scores become a token, how a prompt supplies the task, how examples change the model's local behavior, and how an external program checks and uses the answer.

This is the bridge from **language model** to **language-model system**. We will first study decoding precisely enough to explain greedy search, beam search, sampling, temperature, and hallucination. Then we will build prompts as structured interfaces rather than clever sentences, examine in-context learning and reasoning patterns, and finish with tools, post-processing, LangChain, and LlamaIndex. The aim is not to memorize a bag of prompting tricks. It is to understand which component is responsible for which behavior, so that when an application fails you know where to look.

## From Representations to Generated Text

### Reusing a Pretrained Model

A pretrained Transformer is useful because its internal representations can be reused. An encoder such as BERT can supply a contextual vector for every token or a sequence-level representation. A downstream system may freeze those vectors and train a small classifier on top, or fine-tune part or all of the pretrained network. The same encoder can therefore support sentence classification, question answering, named-entity recognition, or token tagging with different output heads.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/bert-downstream.jpg" alt="BERT adapted to four downstream task formats" loading="lazy" decoding="async"><figcaption>A pretrained encoder can feed sentence-pair, single-sentence, span-prediction, and token-level heads. Course slide 2.</figcaption></figure>

A decoder-only model exposes a different interface. Given a prefix $X=(x_1,\ldots,x_M)$, it defines a distribution over an output sequence $Y=(y_1,\ldots,y_J)$ by the chain rule:

<div class="llm-math-display">
$$
P(Y\mid X)=\prod_{j=1}^{J}P\!\left(y_j\mid X,y_1,\ldots,y_{j-1}\right).
$$
</div>

The model never emits a whole paragraph in one operation. At step $j$, it produces logits $z\in\mathbb R^{|V|}$ over the vocabulary, converts them to probabilities, chooses or samples one token, appends that token to the prefix, and repeats. Generation stops when it produces an end token or reaches a limit. This apparently small choice—*how do we turn a probability distribution into one token?*—is the decoding problem.

### Probability Is Not Truth

Suppose the vocabulary at one step contains only three continuations with probabilities $0.60$, $0.25$, and $0.15$. The probabilities express the model's learned distribution under this context. They do not certify that the first continuation is factually correct. A token can be linguistically plausible yet false; an incorrect token with nonzero probability can be sampled; and a confident model can still be wrong because its training data or internal representation is incomplete.

This gives us a clean definition of hallucination at the system level: the model generates content that is unsupported, incorrect, or inconsistent with the available evidence. Decoding can make low-probability continuations more or less likely, but decoding cannot turn a probability model into a truth oracle. Factual applications need grounding, retrieval, tools, constraints, or verification in addition to a good decoder.

## Deterministic Decoding

### Greedy Search

The simplest decoder chooses the most likely token at every step:

$$
\hat y_j=\arg\max_{v\in V}P(v\mid X,\hat y_{<j}).
$$

This is **greedy decoding**. It is fast, deterministic when ties are resolved consistently, and often appropriate when variability is undesirable. But it optimizes each local decision, not the probability of the complete sequence. A slightly less probable first token may open a path whose later tokens are collectively much more probable. Once greedy search chooses the first branch, it never returns to compare the alternative.

The ideal maximum-a-posteriori sequence would be

$$
\hat Y_{\text{MAP}}=\arg\max_Y P(Y\mid X),
$$

but enumerating every possible sequence is impossible: with vocabulary size $|V|$ and output length $J$, there are roughly $|V|^J$ candidates. We therefore use approximate search.

### Beam Search

Beam search keeps the best $B$ partial hypotheses rather than only one. At each step it expands every surviving hypothesis with candidate next tokens, adds the new log probability to the accumulated score, and retains the best $B$ new prefixes. With $B=1$, beam search becomes greedy search; a larger beam explores more branches but consumes more time and memory.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/beam-search.jpg" alt="Beam search preserving several partial hypotheses over three decoding steps" loading="lazy" decoding="async"><figcaption>Beam search delays commitment by preserving several high-scoring partial sequences. Course slide 15.</figcaption></figure>

We score in log space because products of many probabilities become numerically tiny:

$$
\log P(Y\mid X)=\sum_{j=1}^{J}\log P(y_j\mid X,y_{<j}).
$$

Every log probability is non-positive, so a raw sum often favors short outputs: extending a sequence adds another negative term. Systems therefore use an end-token policy and often a length-adjusted score such as

$$
s(Y)=\frac{1}{J^{\alpha}}\sum_{j=1}^{J}\log P(y_j\mid X,y_{<j}),
$$

where $\alpha$ controls the length preference. This expression is representative rather than universal; libraries implement several penalties and normalizations. The important point is that the scoring rule is part of the model's observed behavior. An apparently “bad model” may actually be a beam or length-setting problem.

### Why the Highest-Probability Answer Is Not Always Best

Mode-seeking is useful for tasks with a narrow expected answer, but natural language often has many valid continuations. The global mode can be bland, repetitive, or generic because safe phrases collect probability mass across many contexts. Increasing the beam can even worsen open-ended text by searching more thoroughly for that generic mode. Diverse beam search deliberately discourages beams from collapsing onto nearly identical candidates; stochastic beam variants introduce randomness while retaining search structure.

For translation or constrained generation, beam search remains useful because fidelity matters and the output space is comparatively focused. For storytelling or brainstorming, sampling is usually a better match. “Best decoder” is therefore not a model-wide property. It depends on whether the task rewards reproducibility, coverage, creativity, factuality, or exact constraint satisfaction.

## Sampling and Distribution Control

### Ancestral Sampling

Instead of taking an argmax, **ancestral sampling** draws

$$
y_j\sim P(\cdot\mid X,y_{<j})
$$

at every step. Sampling respects the model's distribution and can produce diverse outputs from the same prompt. It also exposes the long tail: a modern vocabulary may contain tens of thousands of tokens, and many receive tiny but nonzero probability. Over a long sequence, repeatedly allowing the entire tail creates opportunities for incoherent or unsuitable choices.

Truncated sampling removes part of that tail and renormalizes the remaining probabilities:

- **Top-$k$ sampling** keeps exactly the $k$ highest-probability tokens.
- **Top-$p$ or nucleus sampling** keeps the smallest set whose cumulative probability is at least $p$.
- **Epsilon sampling** keeps tokens whose individual probability is at least a threshold $\varepsilon$.

Top-$k$ has a fixed candidate count even when the distribution changes shape. Top-$p$ adapts: a sharp distribution may need only a few tokens, while a flat distribution may retain many. Epsilon sampling uses an absolute probability floor. None is automatically safest; each changes what can be generated, and combinations can be used.

### Temperature

Temperature transforms logits before softmax:

<div class="llm-math-display">
$$
p_i(T)=\frac{\exp(z_i/T)}{\sum_{v\in V}\exp(z_v/T)},\qquad T>0.
$$
</div>

For $T<1$, logit differences are magnified and the distribution becomes sharper. For $T>1$, differences shrink and the distribution becomes flatter. As $T\to0^+$, sampling approaches greedy selection. Temperature changes relative probabilities; top-$k$ and top-$p$ decide which tokens remain eligible. They are related controls, not synonyms.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/temperature.jpg" alt="Token probability distributions under low, unit, and high temperature" loading="lazy" decoding="async"><figcaption>Lower temperature concentrates mass on leading tokens; higher temperature spreads it across more alternatives. Course slide 23.</figcaption></figure>

A practical policy follows from the task. For extraction, classification, or code that must satisfy a schema, use low randomness and validate the output. For ideation, use moderate sampling and ask for several candidates. If factuality matters, do not rely on temperature alone: retrieve evidence and verify claims.

### Contrastive Decoding

Contrastive decoding compares two models: an **expert** that represents the desired distribution and a weaker **amateur** that helps expose generic or locally tempting continuations. A candidate can be rewarded for high expert likelihood and penalized when it is also too likely under the amateur. A schematic score is

$$
s(v)=\log P_{\text{expert}}(v\mid c)-\lambda\log P_{\text{amateur}}(v\mid c),
$$

subject to a plausibility filter so that the method does not choose bizarre tokens merely because the smaller model dislikes them. Exact formulations vary. The central idea is comparative: prefer text that the stronger model supports beyond what a weaker model already explains.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/contrastive-decoding.jpg" alt="Expert and amateur model probabilities compared during contrastive decoding" loading="lazy" decoding="async"><figcaption>Contrastive decoding favors plausible continuations that receive stronger support from the expert than from the amateur. Course slide 25.</figcaption></figure>

## Prompts as Model Interfaces

### What a Prompt Actually Contains

A prompt is the information presented to a model to specify the current task. Good prompts often contain several distinct components:

1. **Instruction:** what operation the model should perform.
2. **Input data:** the document, question, table, or record to process.
3. **Context:** background facts and definitions needed for the task.
4. **Examples:** demonstrations of desired input–output behavior.
5. **Role or persona:** the perspective or expertise relevant to the response.
6. **Output contract:** format, tone, length, fields, and constraints.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/prompt-building-blocks.jpg" alt="Four core prompt components: instruction, context, input data, and output indicator" loading="lazy" decoding="async"><figcaption>Instruction, context, input data, and an output indicator form a useful minimum prompt structure. Course slide 51.</figcaption></figure>

Not every prompt needs all six. A simple rewrite may need only text, audience, and tone. A legal-document extractor may need definitions, the document, a JSON schema, and a rule for missing values. The principle is to make hidden assumptions visible. “Summarize this” leaves audience, purpose, length, and treatment of uncertainty unspecified; the model must guess.

Prompting is also distinct from fine-tuning. A prompt changes the context for this inference call. Fine-tuning updates parameters across calls. Retrieval adds external information. Decoding chooses from the resulting token distribution. Keeping these mechanisms separate makes debugging much easier.

### System, User, and Assistant Messages

Chat APIs typically organize a conversation into roles. The **system** message establishes application-level behavior and constraints. The **user** message contains the current request and data. Previous **assistant** messages can demonstrate style or preserve conversational history. Internally, the interface serializes these messages into a token sequence using special boundary markers; the model still receives tokens, not abstract chat bubbles.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/chat-serialization.jpg" alt="System, user, and assistant messages serialized with special header and end tokens" loading="lazy" decoding="async"><figcaption>A chat interface ultimately serializes role-tagged messages into the token sequence consumed by the model. Course slide 37.</figcaption></figure>

Role separation is useful for application design, but it is not a perfect security boundary. Untrusted text inside a document may contain instructions that compete with the intended task. A robust system labels data as data, limits available tools, validates arguments, and enforces authorization outside the model.

### Templates and Answer Prediction

A prompt template separates stable instructions from variables:

```text
Task: Classify the support ticket.
Allowed labels: billing, access, bug, other.
Ticket: {{ticket_text}}
Return JSON: {"label": "...", "reason": "..."}
```

Templates improve consistency and make prompts testable. They also reveal which values require escaping or delimiting. **Answer prediction** begins the output with a structure the model should continue—for example, `{"label":`—which can reduce formatting drift, though it does not replace parsing or schema validation.

## Building and Evaluating Prompts

### An Iterative Engineering Loop

Prompt engineering is an experimental loop, not a one-time wording contest. First define the goal and acceptance criteria. Write a baseline prompt. Test it on representative cases, including difficult and adversarial ones. Inspect failures. Change one relevant element, then test again on the same evaluation set. Record the prompt version, model, decoding settings, and results.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/prompt-engineering-cycle.jpg" alt="Iterative prompt engineering cycle from goal to initial prompt, test, analysis, and refinement" loading="lazy" decoding="async"><figcaption>Prompt work becomes engineering when revisions are driven by repeatable tests and failure analysis. Course slide 54.</figcaption></figure>

“Good” is task-specific. For extraction, measure field accuracy and invalid JSON. For summarization, check coverage, attribution, length, and unsupported claims. For code, run tests. For customer communication, review tone and policy compliance. A polished answer to one hand-selected example is not evidence of reliability.

### Context and Constraint Design

Use direct language and place essential information where it is easy to associate with the task. Delimit long input documents. Specify what to do when evidence is absent. Ask for a format that the program can validate. Replace vague constraints such as “be concise” with operational ones such as “use at most five bullets, one sentence each.” If the task has a rubric, include it.

A useful pattern is:

```text
Goal
Context and definitions
Input data between explicit delimiters
Required steps or decision rules
Output schema
Failure behavior and constraints
```

The order is not sacred. What matters is that the model can distinguish instructions from data and that the application can judge the result. Long prompts are not automatically better: irrelevant detail competes for attention, consumes context, and can introduce conflicting cues.

### The Interview Pattern

Sometimes the user has not supplied enough information for a responsible answer. The **interview pattern** explicitly asks the model to collect missing requirements before solving:

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/interview-pattern.jpg" alt="Interview pattern in which the model asks follow-up questions before proposing a solution" loading="lazy" decoding="async"><figcaption>The model gathers missing constraints before committing to a solution. Course slide 77.</figcaption></figure>

For example: “Ask one question at a time about the audience, budget, deadline, and required output. When enough information is available, summarize the requirements and propose a plan.” This is valuable when missing constraints would change the answer. It is unnecessary when the task is already precise or when delay is costly. The deeper lesson is that uncertainty about the **problem definition** should be resolved before optimizing the response.

## In-Context Learning

### Zero-, One-, Few-, and Many-Shot Prompts

**In-context learning** (ICL) means eliciting task behavior through examples placed in the prompt, without updating the model's weights. A zero-shot prompt provides instructions but no demonstration. One-shot gives one example. Few-shot gives a small set. Many-shot uses a much larger set, made possible by long context windows.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/icl-summary.jpg" alt="Zero-shot, one-shot, few-shot, and many-shot sentiment prompts shown at increasing context length" loading="lazy" decoding="async"><figcaption>Demonstrations define the local task through examples; they occupy context but do not update parameters. Course slide 57.</figcaption></figure>

Examples can teach label names, output format, edge-case policy, and the kind of reasoning expected. If you want `positive`, `neutral`, and `negative` rather than free prose, demonstrations make that contract concrete. But a demonstration is also data. A wrong label, inconsistent format, or misleading example can steer the model in the wrong direction.

### More Examples Are Not Automatically Better

Many-shot studies show that longer contexts can continue to improve performance on some difficult tasks, especially when the examples are diverse and informative. Yet repeating the same example mostly adds tokens, not new evidence. Distinct demonstrations tend to be more valuable because they cover more of the task's variation.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/many-shot-icl.jpg" alt="Many-shot in-context learning gains at different numbers of distinct examples" loading="lazy" decoding="async"><figcaption>Performance can continue to improve in the many-shot regime, but the useful number of examples varies by task. Course slide 66.</figcaption></figure>

Too many examples can also hurt. Irrelevant or contradictory demonstrations add noise; a long prompt may obscure the current query; and compute cost grows with context length. The correct question is not “How many examples can fit?” but “Which examples most clearly define the behavior needed for this input?” Retrieval can help select demonstrations similar to the current case.

### Ordering, Balance, and Coverage

ICL can be surprisingly sensitive to presentation. The order of examples may change the answer. An imbalanced prompt may bias the model toward the majority label. Omitting a label entirely can make it harder for the model to emit that label, even if the instruction lists it. Abstract or deliberately flipped labels reveal another influence: the model enters the prompt with prior associations from pretraining, and the demonstrations must overcome them.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/icl-sensitivity.jpg" alt="Experiments showing sensitivity to example ordering, label balance, and label coverage" loading="lazy" decoding="async"><figcaption>Example order, label balance, and label coverage can materially change in-context performance. Course slides 70–72.</figcaption></figure>

Therefore build an ICL set as carefully as a small training set: verify labels, cover important classes and edge cases, avoid accidental shortcuts, and test multiple orders. Keep an untouched evaluation set. If performance changes drastically under harmless reordering, the prompt is not yet robust.

## Reasoning Patterns

### Chain-of-Thought Prompting

Some tasks benefit when the model produces intermediate steps before an answer. Few-shot **chain-of-thought** (CoT) prompting includes demonstrations with worked reasoning; zero-shot CoT uses a cue such as “work through the problem step by step.” The additional tokens can help the model decompose arithmetic, symbolic, or multi-hop tasks that are difficult to solve in one jump.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/cot-comparison.jpg" alt="Arithmetic word problem answered incorrectly without reasoning and correctly with intermediate steps" loading="lazy" decoding="async"><figcaption>Intermediate reasoning can expose the quantities and operations that connect a word problem to its answer. Course slide 81.</figcaption></figure>

CoT is not a proof of correctness. A model can write a fluent but invalid derivation, or reach the right answer through a mistaken argument. In production, prefer checkable intermediate artifacts: equations that a symbolic tool can verify, citations that can be opened, code that can be tested, or a structured plan whose constraints can be evaluated.

### Automatic Chain-of-Thought

Hand-authoring diverse reasoning demonstrations is expensive. **Auto-CoT** groups questions into clusters, selects representative questions, and uses a model to generate candidate rationales for those representatives. The resulting demonstrations are then used for other questions. Clustering aims to cover different reasoning patterns rather than selecting near-duplicates.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/auto-cot.jpg" alt="Auto-CoT pipeline clustering questions, selecting demonstrations, and generating rationales" loading="lazy" decoding="async"><figcaption>Auto-CoT seeks diverse demonstrations by clustering questions before generating rationales. Course slide 86.</figcaption></figure>

Automatically generated rationales must still be filtered. A confident error becomes a reusable bad example. Correct final answers, valid intermediate steps, and coverage should all be checked before the demonstrations enter a prompt library.

### Tree of Thoughts

A single chain commits to one continuation at every reasoning step. **Tree of Thoughts** (ToT) keeps multiple candidate states, evaluates them, and explores promising branches. A problem is represented by states, possible next “thoughts,” a search policy, and an evaluator. Breadth-first search, depth-first search, or a beam-like policy can traverse the tree.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/tree-of-thoughts.jpg" alt="Tree of Thoughts branching search over intermediate reasoning states" loading="lazy" decoding="async"><figcaption>Tree search preserves alternative plans instead of committing to one reasoning path immediately. Course slide 90.</figcaption></figure>

ToT can help with planning, puzzles, or tasks where early choices are reversible and can be scored. It costs more model calls and depends heavily on the evaluator. If the evaluator cannot recognize progress, additional branches merely multiply plausible mistakes. “Multiple experts deliberate” is a related prompting pattern: generate independent proposals, compare them, revise, and aggregate. Independence and a clear selection rule matter more than theatrically assigning expert names.

## ReAct, Tools, and Reliable Workflows

### Interleaving Reasoning and Action

**ReAct** interleaves reasoning with actions in an external environment. The model may decide that it needs evidence, issue a search or database action, receive an observation, and continue. This closes a loop that ordinary prompting leaves open:

$$
\text{state}\rightarrow\text{thought}\rightarrow\text{action}\rightarrow\text{observation}\rightarrow\text{updated state}.
$$

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/react.jpg" alt="ReAct trace alternating thoughts, search actions, and observations" loading="lazy" decoding="async"><figcaption>A ReAct trace uses observations from tools to revise the next action rather than relying only on model memory. Course slide 95.</figcaption></figure>

Tools are valuable because some operations should not be approximated in language. A calculator should multiply $237\times56$ and return $13{,}272$. A database should supply the current account status. A search or retrieval system should provide evidence that can be cited. The model's role is to decide when and how to call the tool, then explain the result—not to imitate the tool from memory.

Function calling gives the model a schema for available actions and asks it to return a function name plus arguments. The application must validate the arguments, enforce authorization, execute the function, and decide what result is safe to return. Never let generated arguments bypass normal security rules. Tool availability expands capability and risk at the same time.

### Post-Processing Is Part of the System

An answer may be used as-is, formatted for display, reduced to selected fields, or mapped to an application action. Each path needs post-processing. Markdown and code require safe rendering. Classification needs an allowed-label check. Regression needs numeric parsing and range validation. Entity extraction needs a schema and a policy for missing values. A function call needs type checks, permissions, retries, and error handling.

Suppose the model should emit

```json
{"priority":"high","team":"billing"}
```

The program should parse JSON, reject extra or missing fields, verify that both values belong to allowed sets, and ask for a repair or route to review if validation fails. A prompt that requests JSON improves the probability of valid output; a parser determines whether the output is actually valid.

This is also where factual checks belong. Retrieval can attach source passages; a verifier can require every claim to be supported; business rules can refuse impossible values. Reliability emerges from the composition of model, decoder, tools, validators, and fallback behavior.

## Common Application Patterns

### Writing, Translation, and Revision

Drafting an email is a useful small example because the user usually knows the facts but wants help with expression. A strong request supplies the recipient, purpose, required details, relationship, tone, and desired length. The model can then produce a draft that the user reviews. It should not invent a meeting time, promise, or policy. The boundary is clear: the model transforms supplied intent into language; the user remains responsible for factual and interpersonal commitments.

Translation has a similar structure but a different evaluation problem. The prompt should identify source and target languages, audience, domain, terminology rules, and whether the goal is literal fidelity or natural localization. Names, code, citations, and product terms may need to remain unchanged. For important text, back-translation is not enough to establish correctness; use a fluent reviewer or a domain glossary, and compare meaning at the sentence and document levels.

Proofreading should be separated from rewriting. “Correct grammar and punctuation without changing meaning or voice” asks for conservative edits. “Rewrite for a nontechnical executive audience” authorizes structural change. Asking the model to return both the revision and a compact edit log makes changes reviewable. That is especially important when a stylistic improvement could silently alter a numerical qualification or legal claim.

### Code and Document Work

Code generation works best when the prompt behaves like a compact specification: state the language and version, function signature, data types, edge cases, performance constraints, forbidden dependencies, and tests. Generated code must be executed in an appropriate sandbox and checked with tests and static analysis. A plausible code block is a hypothesis about an implementation, not evidence that the implementation works.

For summarization, first decide what the summary is for. An executive summary, study guide, meeting recap, and evidence table are different outputs. Specify the audience, target length, required topics, and whether claims must cite locations in the source. Long documents may need chunking followed by synthesis, but naive chunk summaries can lose relationships across sections. A hierarchical pipeline should preserve document metadata and let the final synthesizer access the evidence behind each intermediate claim.

Meeting support illustrates the full lifecycle. Before a meeting, an LLM can turn source documents into an agenda and unresolved questions. During or after it, a transcript can be transformed into decisions, action items, owners, and deadlines. Each action item should be traceable to transcript evidence and confirmed by a person; speech recognition errors or casual suggestions should not become official commitments automatically.

### Extraction and Structured Actions

Entity extraction turns prose into records: people, organizations, dates, amounts, relationships, or domain-specific fields. Define the schema, give examples of ambiguous cases, preserve source spans when possible, and distinguish *missing* from *not applicable*. A useful output includes both the normalized value and the exact text supporting it. That makes later review much easier than accepting an unexplained field.

Function calling goes one step further: the structured output selects an operation. A travel assistant might call `search_flights`; a support system might call `lookup_order`; a research tool might call `search_documents`. The model proposes a call, but the host program decides whether it is valid and authorized. Read-only search may run automatically, while purchases, messages, deletions, or account changes should require stronger checks and often explicit confirmation.

Across all these applications, the recurring pattern is the same: place the model where semantic flexibility is valuable, and surround it with deterministic components where correctness is testable. Let the model draft, classify, map language to a schema, or choose among safe tools. Let ordinary software enforce types, permissions, arithmetic, persistence, and irreversible actions.

## Application Frameworks

### LangChain as Orchestration

Frameworks such as LangChain package recurring application patterns. A **prompt template** fills variables into a reusable instruction. An **output parser** converts model text into a typed structure. **Memory** stores conversation state outside the model and inserts relevant history into later prompts. The model itself remains stateless between independent API calls unless the application resends state.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm3-lecture-3/memory.jpg" alt="Conversation history passed back into a stateless language model" loading="lazy" decoding="async"><figcaption>Apparent conversational memory is usually external state selected and passed into a new model call. Course slide 111.</figcaption></figure>

A **chain** connects components. A simple sequential chain feeds one model output into the next step. A more general sequential chain can combine several named inputs and outputs. A router chooses among specialized chains according to the request. These abstractions are convenient, but they do not remove the need to inspect every boundary: What exact text enters the next prompt? Can a malformed output propagate? Where are errors handled? How is latency measured?

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm3-lecture-3/chains.jpg" alt="Simple, sequential, and router chain structures for LLM applications" loading="lazy" decoding="async"><figcaption>Chains compose model calls and program steps; routers select a path based on the request. Course slide 112.</figcaption></figure>

### LlamaIndex and Retrieval-Centered Systems

LlamaIndex focuses on connecting private or domain-specific data to LLM applications. Data connectors ingest documents or records. Parsers split and annotate them. Index structures—often vector indexes, but also lists, trees, or graphs—organize retrievable units. A query engine retrieves relevant context, optionally performs multi-step querying, and synthesizes a response. A chat engine adds conversational state around that retrieval process.

This is the basic retrieval-augmented generation (**RAG**) pipeline:

$$
\text{query}\rightarrow\text{retrieve evidence}\rightarrow\text{construct context}\rightarrow\text{generate}\rightarrow\text{cite and validate}.
$$

Retrieval changes the evidence available to the model; it does not guarantee that the answer uses that evidence correctly. Evaluate retrieval recall separately from answer faithfulness. A missing document is a retrieval problem; a claim contradicting a retrieved passage is a generation or validation problem. Separating those stages prevents vague “the RAG failed” diagnoses.

## Putting the Whole System Together

We can now describe an LLM application without hiding any essential step:

1. **Define the task and acceptance criteria.** Decide what counts as a correct, safe, and useful answer.
2. **Construct context.** Gather user input, instructions, demonstrations, conversation state, and retrieved evidence.
3. **Call the model.** Choose an appropriate model and serialize role-tagged messages or a completion prompt.
4. **Decode.** Select greedy, beam, or sampled generation and set temperature and truncation controls for the task.
5. **Use tools when needed.** Delegate search, calculation, databases, and actions to systems that can perform them directly.
6. **Parse and validate.** Enforce schemas, permissions, factual support, and business rules outside the model.
7. **Evaluate and iterate.** Record failures, revise the responsible component, and retest on a stable evaluation set.

The key is causal clarity. If outputs are repetitive, inspect decoding and prompt diversity. If labels drift, inspect demonstrations, balance, and schema validation. If facts are stale, add retrieval or tools. If arithmetic is inconsistent, use a calculator. If a multi-step plan fails too early, consider branching search or explicit checkpoints. If the answer format breaks downstream code, strengthen the output contract and parser rather than merely asking the model to “be more careful.”

This lesson began with a vector of next-token scores and ended with a complete application loop. Decoding determines how we move through the model's distribution. Prompts and demonstrations define the local task. Reasoning patterns organize difficult inference. Tools bring in capabilities and current evidence. Frameworks help compose the pieces. Validation decides whether the result is allowed to leave the system. In the next stage, these pieces become the foundation for retrieval, agents, and larger generative-AI workflows.
