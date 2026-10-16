---
title: LLM 6 - Instruction Fine-Tuning and PEFT
date: 2026-10-16 18:00:00
categories: COMS6998E LLM-Based Generative AI
tags:
  - Instruction Fine-Tuning
  - Multi-task Learning
  - PEFT
  - LoRA
  - Prompt Tuning
  - QLoRA
mathjax: true
cover: "/images/columbia-low-memorial-library.jpg"
excerpt: "A practical and mathematical guide to instruction fine-tuning, multi-task learning, catastrophic forgetting, PEFT, LoRA, soft prompts, and QLoRA."
lesson_number: 6
lesson_level: 1
study_time: 110
---

Welcome back. In [LLM 5](/blog/2026/10/09/LLM-5-Pretraining-Scaling-and-Domain-Models/) we followed a model through pretraining: objectives, precision, memory, distributed systems, scaling laws, and domain data. Pretraining explains how a model acquires broad language ability. It does not explain why the same model should answer a support request in a particular format, summarize a dialogue around the customer's next action, or follow an unfamiliar instruction without several demonstrations in the prompt.

That is the problem of **adaptation**. We start with a pretrained model that already knows a great deal, and we ask a narrower question: how can we change its behavior without rebuilding its knowledge from the beginning?

This blog develops the answer in three layers:

1. **Instruction fine-tuning:** turn tasks into input-output examples and optimize the model to follow them.
2. **Multi-task instruction tuning:** mix many tasks so that the model learns the general pattern of following instructions rather than memorizing one interface.
3. **Parameter-efficient fine-tuning (PEFT):** freeze most of the model and train a small, task-specific component such as LoRA matrices or soft prompts.

The important idea is not that one method always wins. Full fine-tuning, LoRA, prompt tuning, and QLoRA purchase different combinations of quality, memory, storage, speed, and flexibility. By the end, we should be able to choose among them for a real project rather than choosing the method with the most familiar name.

## 1. When Prompting Stops Being Enough

### Prompting, In-Context Learning, and Fine-Tuning

Suppose a pretrained language model must classify a product review. With zero-shot prompting, we describe the task and provide the review. With one-shot or few-shot prompting, we place several labeled demonstrations in the context before the new review. Nothing inside the model changes; only the token sequence supplied at inference time changes.

That makes in-context learning attractive:

- there is no training run;
- examples can be replaced instantly;
- one model can serve many tasks;
- the behavior is easy to prototype.

But demonstrations are not free. They consume context length on every request, increase input latency and cost, and may still fail to teach a smaller model a difficult behavior. They can also make production prompts long and fragile: a formatting change, an unfortunate example order, or a distracting document can alter the output.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm6-fine-tuning/llm6-slide-006.webp" alt="Few-shot examples filling the context window and the motivation to fine-tune instead" loading="lazy" decoding="async"><figcaption>Few-shot examples can help, but they occupy the context on every request and may not be enough for a smaller model. Course slide 6.</figcaption></figure>

Fine-tuning moves the examples from the runtime prompt into a training dataset. Instead of reminding the model how to behave on every request, we adjust parameters so that the desired behavior becomes more likely by default.

> **A clean distinction:** prompting changes the current context; retrieval changes the evidence in that context; fine-tuning changes the model's conditional behavior. None of the three automatically replaces the others.

### What Fine-Tuning Actually Changes

Let the pretrained parameters be $\theta_0$. For an instruction $x$ and desired response $y=(y_1,\ldots,y_T)$, supervised fine-tuning minimizes the negative log-likelihood of the target tokens:

$$
\mathcal L_{\rm SFT}(\theta)=-\sum_{t=1}^{T}\log p_{\theta}(y_t\mid x,y_{1:t-1}).
$$

In a decoder-only model, the instruction and answer may be concatenated into one sequence. We usually mask the loss on the instruction tokens and optimize only the answer positions. If $m_t\in\{0,1\}$ indicates whether token $t$ belongs to the target answer, then

$$
\mathcal L_{\rm mask}(\theta)=-\frac{1}{\sum_t m_t}\sum_t m_t\log p_{\theta}(z_t\mid z_{1:t-1}).
$$

This detail matters. Without an answer mask, the model spends part of its objective reproducing the prompt rather than learning the requested completion. Encoder-decoder models express the separation more directly: the instruction goes to the encoder, while the decoder is trained against the response.

Full fine-tuning starts from $\theta_0$ and allows every selected parameter to move. The result is not a new model trained from nothing. It is a nearby point in parameter space shaped by the adaptation dataset, learning rate, optimizer, number of updates, and regularization.

### Decide Whether Fine-Tuning Is the Right Lever

Fine-tuning is useful when failure is systematic and behavioral. Examples include:

- the model repeatedly violates an output schema;
- it does not follow the organization's terminology or response style;
- a smaller model needs stronger task behavior than prompting alone provides;
- demonstrations consume too much context;
- latency requires a short inference prompt;
- the task has enough representative examples to support training and evaluation.

Fine-tuning is a poor substitute for frequently changing facts. If the answer depends on today's inventory, current policy, or a private document revised every week, retrieval is usually the more direct mechanism. Fine-tuning can teach the model **how to use** retrieved evidence, but it should not be treated as a reliable database update.

Before training, write one sentence that names the intended change: “Given a support dialogue, produce a concise summary containing the issue, action already taken, and unresolved next step.” A statement such as “make the model better” cannot determine the dataset, metric, or stopping rule.

## 2. Build an Instruction Dataset

### From Raw Records to Prompt-Completion Pairs

Instruction fine-tuning requires examples with a consistent semantic contract. A record usually contains three pieces:

- an **instruction** describing the operation;
- an optional **input** containing the instance or context;
- a **target response** representing acceptable behavior.

A sentiment record could be rendered as:

```text
Instruction: Classify the review as positive or negative.
Review: The battery lasts all day, but the camera is disappointing.
Response: negative
```

The same underlying record can have several natural-language templates. Template diversity prevents the model from associating a task with one exact phrase, but diversity must preserve meaning. “Give the sentiment,” “Is this review positive or negative?” and “Choose one label” are useful variations only if they share the same label policy.

The completion format must also be deliberate. If some examples answer `positive`, some answer `Positive.`, and others provide a paragraph, the model is being trained on several interfaces at once. That may be intentional for a conversational model; it is usually harmful for a strict classifier.

### Split Before Templates Can Leak

The dataset should be divided into training, validation, and test subsets before near-duplicate records or template variants can cross the boundary.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-017.webp" alt="Prepared instruction dataset divided into training validation and test splits" loading="lazy" decoding="async"><figcaption>Training changes the model, validation guides development choices, and the test set remains untouched until the final evaluation. Course slide 17.</figcaption></figure>

These splits have different jobs:

- **Training set:** supplies gradients.
- **Validation set:** selects checkpoints, learning rates, ranks, prompt formats, and stopping time.
- **Test set:** estimates final performance after those choices are fixed.

If two dialogues from the same customer incident appear in different splits, the test result may measure memorization rather than generalization. Group-aware splitting by conversation, document, user, product, or time is often safer than randomly splitting individual rows. For a system intended to handle future requests, a chronological split can reveal distribution shift that a random split hides.

> **Data leakage is not repaired by a stronger model.** Once evaluation examples influence training or model selection, the reported score no longer answers the intended question.

### Quality Matters More Than Formatting Volume

Instruction datasets fail in quiet ways. A large file can still contain contradictory labels, truncated answers, unresolved placeholders, copied boilerplate, private information, unsafe advice, or outputs that never state the evidence used. Before training, inspect examples from every source and task.

A practical audit checks:

1. **Correctness:** is the target actually a good answer?
2. **Coverage:** do examples represent normal, rare, difficult, and refusal cases?
3. **Consistency:** are formatting and label policies stable?
4. **Independence:** are evaluation groups separated from training groups?
5. **Provenance:** are the data licensed and permitted for this use?
6. **Privacy:** have secrets and personal identifiers been removed or handled lawfully?
7. **Length:** do long examples survive tokenization without silently losing the target?

Duplicating an easy pattern a thousand times does not create a thousand units of new information. In many adaptation settings, a smaller carefully reviewed dataset beats a much larger noisy one because every target token directly pushes the model's behavior.

### Tokenization and Padding Are Part of the Dataset

The model never sees raw strings. It sees token IDs, attention masks, and labels. That means a correct text file can still become a broken training batch.

Verify at least one decoded batch before training:

- special tokens appear where expected;
- instruction and response boundaries are preserved;
- padding positions are ignored by the loss;
- response tokens are not accidentally masked;
- truncation keeps the information required for the target;
- the maximum sequence length matches the memory budget.

For decoder-only batching, padding labels are commonly assigned an ignore index such as $-100$, while attention masks prevent the model from attending to padding tokens. The exact implementation varies, but the principle is stable: padded or non-target positions should not contribute unintended gradients.

## 3. Single-Task Fine-Tuning and Forgetting

### Why a Narrow Task Can Improve Quickly

A pretrained model already contains language representations, facts, and useful computation patterns. Single-task fine-tuning does not need to relearn language; it only needs to reshape the output distribution around a particular task. With a few thousand high-quality examples, summarization style, classification boundaries, or structured output can improve sharply.

This is transfer learning. The adaptation dataset is small relative to pretraining because it supplies direction rather than a foundation. The pretrained model knows what a reservation and a credit card are; the new dataset teaches which details belong in a support summary.

However, a high task score is not enough. We should compare the fine-tuned model with the original model on:

- the target task;
- nearby tasks that matter to the product;
- general capabilities that must be preserved;
- safety and refusal cases;
- out-of-domain examples;
- latency and memory under the actual serving configuration.

### Catastrophic Forgetting

When optimization repeatedly rewards one narrow behavior, performance on other behaviors may decline. This is called **catastrophic forgetting**. The word “catastrophic” describes the mechanism's possible severity, not a guarantee that every fine-tuning run destroys the model.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm6-fine-tuning/llm6-slide-026.webp" alt="A fine-tuned sentiment model incorrectly answering a general factual question as a sentiment label" loading="lazy" decoding="async"><figcaption>A model optimized too narrowly may force unrelated inputs into the fine-tuned task's output pattern. Course slide 26.</figcaption></figure>

Forgetting becomes more likely when the dataset is narrow, the learning rate is aggressive, training continues too long, or all weights are allowed to drift. Imagine fine-tuning only on outputs `positive` and `negative`. The model may become excellent at review classification yet start treating ordinary questions as requests for a sentiment label.

The effect can be measured. Create a **retention suite** before training: a small set of capabilities that the adapted model must keep. Evaluate it at every checkpoint beside the target metric. The correct checkpoint may be the one that gives up a fraction of target performance in exchange for much stronger retention.

### When Forgetting Is Acceptable

Sometimes the model will serve only one controlled task. If a classifier is never exposed to general questions, losing open-ended generation may not matter. A smaller deployment model can benefit from becoming specialized.

The decision should still be explicit. Accepting forgetting is different from failing to measure it. Ask:

- Will users send inputs outside the narrow task?
- Is the model a shared foundation for several products?
- Could a future task reuse this checkpoint?
- Does specialization damage safety behavior?
- Can routing guarantee that only valid requests reach the model?

If broad capability must remain, common defenses include lower learning rates, fewer epochs, mixing general examples into training, multi-task fine-tuning, regularization toward the initial weights, replay data, or PEFT methods that leave the base weights frozen.

## 4. Multi-Task Instruction Tuning

### Learn the Pattern of Following Instructions

Single-task training teaches one mapping. Multi-task instruction tuning presents many tasks in a shared natural-language format: summarize this text, classify this review, translate this sentence, extract the locations, answer this question, or generate code.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-031.webp" alt="A pretrained model instruction-tuned on many tasks with many examples per task" loading="lazy" decoding="async"><figcaption>Multi-task instruction tuning combines many tasks and many examples of each task so the model can learn a reusable instruction-following interface. Course slide 31.</figcaption></figure>

The goal is larger than average training accuracy. By observing instructions paired with successful completions, the model can learn a transferable relationship between natural-language task descriptions and output behavior. Evaluation on **held-out task families** asks the strongest question: can the model follow a task type it did not encounter during tuning?

This is the central idea behind FLAN. The original FLAN work instruction-tuned a large pretrained model over many verbalized NLP tasks and evaluated zero-shot transfer to unseen task types. Later FLAN scaling work expanded the task collection, model families, and reasoning data. The result is not that task boundaries disappear; it is that instruction tuning can make a pretrained model substantially more usable through a common interface.

### Balance the Task Mixture

If task $k$ has dataset $D_k$, a multi-task objective can be written as

$$
\mathcal{L}(\theta)=\sum_{k=1}^{K}\lambda_k\,\mathbb{E}_{(x,y)\sim D_k}\left[\mathcal{L}_k(\theta;x,y)\right].
$$

where $\lambda_k$ controls how often or how strongly task $k$ contributes. If examples are sampled in direct proportion to dataset size, one huge dataset can dominate the gradient. If every task is sampled equally, tiny noisy tasks may be overrepresented.

Common compromises cap the contribution of very large datasets, use temperature-based sampling, group related tasks, or assign weights according to product importance. The correct mixture is empirical. It depends on dataset quality, task conflict, model capacity, and the evaluation distribution.

Balance also exists inside a task. A sentiment dataset with 95% positive examples can produce high accuracy while failing on negative reviews. A support dataset dominated by resolved cases may not teach escalation behavior. Task weights cannot repair missing cases; the data itself must represent them.

### FLAN-T5 as a Starting Checkpoint

T5 is an encoder-decoder model that casts tasks into text-to-text form. FLAN-T5 begins from T5 and adds broad instruction tuning, so it is already accustomed to responding to natural-language task descriptions.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-035.webp" alt="FLAN-T5 instruction mixture containing task collections for general NLP reasoning and natural instructions" loading="lazy" decoding="async"><figcaption>FLAN-T5 mixes broad task collections rather than learning one narrow mapping. The counts shown describe the collections used in the presented setup. Course slide 35.</figcaption></figure>

This creates an important adaptation strategy: when a project needs one additional task, start from an instruction-tuned checkpoint rather than from the raw pretrained checkpoint. The FLAN Collection study found that instruction-tuned checkpoints can converge faster and higher on later downstream tasks. Prior instruction tuning has already shaped the interface; the new fine-tuning run refines it.

That does not remove the need for validation. A broadly instruction-tuned model may carry response conventions that conflict with a strict task. It can also produce fluent but unsupported text. The starting checkpoint changes the prior, not the acceptance criteria.

### Template Diversity Without Task Ambiguity

Multiple templates help the model separate a task's meaning from one wording. A summarization dataset might use “Summarize the dialogue,” “What happened in this conversation?” and “Write the main points in two sentences.” These templates are not equivalent if the last one imposes a length requirement. Metadata should record which template produced each example so that failures can be traced.

For held-out-task evaluation, be strict about leakage. If “sentiment classification” is held out but a nearly identical polarity task remains in the training mixture, the result is not genuine transfer to an unseen task family. Task taxonomies and source provenance matter as much as row-level splits.

## 5. Case Study: Dialogue Summarization

### Define the Information Contract

Consider a customer-support dialogue. The customer wants to return a purchase, the agent asks when it was bought, and the customer answers. A useful summary should preserve the intent and the information needed for the next action. It should not merely compress the dialogue word by word.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm6-fine-tuning/llm6-slide-038.webp" alt="Customer support dialogue where the model must identify actions needed from the conversation" loading="lazy" decoding="async"><figcaption>Dialogue summarization is an information-selection problem: preserve the issue and action-relevant details, not every utterance. Course slide 38.</figcaption></figure>

Before creating examples, write a schema in plain language:

- What is the customer's request?
- What facts constrain the response?
- What action has the agent taken?
- What remains unresolved?
- Which details must never be invented?

If annotators disagree about whether a date, name, or payment detail belongs in the summary, the model receives contradictory supervision. Resolve the policy before scaling annotation.

### Establish the Baseline Before Training

Run the starting model on a frozen evaluation set. A baseline may already be readable but miss domain-critical details. For example, it might say that a customer has a reservation while omitting the hotel, card requirement, or agent action. Fine-tuning is valuable when it consistently closes a defined gap, not merely when the new output sounds different.

Record more than one aggregate score. Store representative examples, failure labels, output lengths, unsupported claims, omissions, and formatting violations. When the final metric changes, these records explain why.

A strong evaluation combines:

- **lexical overlap metrics** such as ROUGE for regression tracking;
- **semantic or factual checks** for whether essential details are preserved;
- **format checks** for required fields and length;
- **human review** for usefulness, clarity, and hallucination;
- **slice analysis** for long dialogues, multiple intents, escalations, and rare products.

ROUGE can reward wording overlap without proving factual correctness. It is useful evidence, not the definition of a good summary.

### Train, Compare, and Inspect

During training, monitor the target loss and validation metrics. A falling training loss with worsening validation performance signals overfitting. A flat validation curve may mean the learning rate is wrong, the model already saturates the task, labels are noisy, or the metric ignores the desired change.

Compare checkpoints against the same baseline examples. Ask whether the adapted model now includes the missing action-relevant detail, whether it has begun copying irrelevant utterances, and whether it invents plausible resolutions. Fine-tuning can strengthen both good and bad annotation habits.

The final test set is evaluated once the model, prompt template, decoding policy, and checkpoint are fixed. If we inspect the test set repeatedly and tune against it, it has silently become another validation set.

### Production Evaluation Is a Different Split

Offline success does not guarantee deployment success. Live conversations may be longer, noisier, multilingual, or contain product names absent from training. Agents may use shorthand. Customers may change topics halfway through. A monitoring plan should therefore track input shift, output failures, user corrections, and escalation rates after launch.

The production loop is not “collect everything and retrain.” New examples need review, deduplication, privacy handling, versioning, and a new evaluation gate. Otherwise the model may learn from its own earlier errors or from feedback that encodes a temporary workaround.

## 6. Why Full Fine-Tuning Is Expensive

### Trainable Parameters Are Only One Part of Memory

If a model has $P$ parameters, storing its weights is only the beginning. Training may also require gradients, optimizer states, forward activations, temporary buffers, and possibly higher-precision master weights. With Adam-style optimization and mixed precision, a rough implementation-dependent budget can reach many times the size of the model weights.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-046.webp" alt="Full fine-tuning memory stack including trainable weights optimizer states gradients activations and temporary memory" loading="lazy" decoding="async"><figcaption>Full fine-tuning stores much more than the visible model weights. Activations and sequence length can dominate some workloads. Course slide 46.</figcaption></figure>

The exact multiplier is not universal. It depends on optimizer, precision, checkpointing, sequence length, batch size, sharding, attention implementation, and whether states are offloaded. A useful accounting identity is

$$
M_{\text{train}}
\approx
M_{\text{weights}}
+M_{\text{gradients}}
+M_{\text{optimizer}}
+M_{\text{activations}}
+M_{\text{temporary}}.
$$

Freezing weights removes their gradients and optimizer states, but forward activations may still be needed to propagate gradients into trainable components. “Only 1% of parameters are trainable” therefore does not imply “training uses 1% of the memory.” It does, however, remove several large terms.

### One Full Checkpoint per Task Does Not Scale Gracefully

Suppose a team maintains question answering, summarization, code generation, and classification variants of a 10 GB base checkpoint. Full fine-tuning can require a separate 10 GB model for every task, plus optimizer checkpoints during training. Backups, model registries, deployment images, and rollback versions multiply the storage cost.

PEFT changes the unit of specialization. Instead of copying the entire model, the team stores a small adapter for each task and shares one base model. This makes experimentation and distribution easier, especially when many users or products need related behaviors.

Storage savings are not automatically serving savings. Serving several adapters may require adapter routing, batching decisions, caching, and careful compatibility with the base-model version. An adapter trained for one revision of a model should not be assumed to work on another.

### Full Fine-Tuning Still Has a Place

Full fine-tuning offers maximum freedom to change the model. It can be appropriate when:

- the target distribution differs substantially from the base model;
- enough high-quality data and compute are available;
- the task needs capacity beyond a small update subspace;
- only one specialized checkpoint will be deployed;
- controlled experiments show a meaningful advantage over PEFT.

The decision should come from an ablation. Train at least one credible PEFT baseline before assuming that every parameter must move. Conversely, do not assume that a tiny adapter must match full fine-tuning on every task simply because it often does.

## 7. Parameter-Efficient Fine-Tuning

### The PEFT Principle

Parameter-efficient fine-tuning keeps most pretrained parameters frozen and optimizes a much smaller set $\phi$:

$$
\theta_0\ \text{fixed},
\qquad
\phi^{*}=\arg\min_{\phi}\mathcal{L}(\theta_0,\phi).
$$

The frozen base preserves a common foundation. Each task stores only $\phi^*$, which may be a set of low-rank matrices, adapter layers, selected bias terms, trainable token embeddings, or soft prompt vectors.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-065.webp" alt="One shared language model connected to small PEFT weights for question answering summarization and generation" loading="lazy" decoding="async"><figcaption>One base model can support several task adapters measured in megabytes rather than several complete checkpoints measured in gigabytes. Course slide 65.</figcaption></figure>

PEFT can reduce trainable parameters, optimizer memory, checkpoint size, and transfer time. Keeping the original weights frozen can also reduce forgetting, although the adapter can still steer outputs away from broad behavior.

### Three Families of PEFT

It helps to classify methods by where the trainable capacity lives.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-073.webp" alt="PEFT taxonomy with selective methods LoRA adapters soft prompts and prompt tuning" loading="lazy" decoding="async"><figcaption>PEFT methods can select existing parameters, reparameterize an update, or add new trainable components. Course slide 73.</figcaption></figure>

**Selective methods** update a subset of existing parameters, such as biases or particular layers. They are simple but may need careful selection.

**Reparameterization methods** express a large update using a compact structure. LoRA represents a weight update through low-rank matrices.

**Additive methods** introduce trainable components while keeping the original network fixed. Examples include adapter layers and learned soft prompts.

These families are not mutually exclusive. Quantization can be combined with LoRA; adapters can coexist with other trainable modules; different tasks can use different adapters on the same base.

### PEFT Trade-Offs

PEFT is a design space, not a guarantee. Compare methods along several axes:

- **Parameter efficiency:** how many values are trained and stored?
- **Memory efficiency:** which gradients, states, and activations remain?
- **Training speed:** does the method reduce computation or only optimizer state?
- **Model quality:** does the restricted update have enough capacity?
- **Inference cost:** can updates be merged, or do added modules increase latency?
- **Operational flexibility:** can adapters be swapped, composed, versioned, and rolled back safely?

LoRA often adds no inference latency after its update is merged into the base weight, but merging gives up some hot-swapping convenience and requires a new merged artifact. Traditional bottleneck adapters remain separate modules and can add inference operations. Soft prompts consume a small number of input positions on every request.

### Adapter Governance

Small files are easy to distribute, which makes governance more important rather than less important. Record the base model name and exact revision, tokenizer revision, target modules, rank, scaling factor, task schema, data version, and evaluation report with every adapter.

An adapter is executable model behavior. It can introduce unsafe outputs, memorized data, or incompatible assumptions even though the base model is unchanged. Loading an adapter should require the same provenance and evaluation discipline as loading a complete checkpoint.

## 8. LoRA: Learning a Low-Rank Update

### The Low-Rank Hypothesis

Consider a pretrained linear transformation with weight

$$
W_0\in\mathbb{R}^{d\times k}.
$$

Full fine-tuning learns an unrestricted update $\Delta W$ with $dk$ degrees of freedom. LoRA assumes that the useful adaptation can be represented in a much lower-dimensional subspace:

$$
W'=W_0+\Delta W,
\qquad
\Delta W=BA,
$$

where

$$
B\in\mathbb{R}^{d\times r},
\qquad
A\in\mathbb{R}^{r\times k},
\qquad
r\ll\min(d,k).
$$

The number of trainable parameters changes from $dk$ to

$$
r(d+k).
$$

The base matrix $W_0$ is frozen. Gradients update only $A$ and $B$. A common scaled form is

$$
h=W_0x+\frac{\alpha}{r}BAx,
$$

where $\alpha$ controls the adapter's contribution. Implementations often initialize one factor to zero so that $\Delta W=0$ at the beginning and the adapted model initially behaves exactly like the base model.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-086.webp" alt="LoRA freezes the original self-attention weight learns two low-rank matrices and adds their product for inference" loading="lazy" decoding="async"><figcaption>LoRA trains the factors of a compact update. At inference, the product can remain separate or be added to the original weight. Course slide 86.</figcaption></figure>

### A Concrete Parameter Count

Take a Transformer projection $W_0\in\mathbb{R}^{512\times64}$. Full fine-tuning updates

$$
512\times64=32{,}768
$$

parameters for this matrix. With rank $r=8$, LoRA trains

$$
A\in\mathbb{R}^{8\times64}
\quad\text{and}\quad
B\in\mathbb{R}^{512\times8},
$$

for a total of

$$
8\times64+512\times8
=512+4{,}096
=4{,}608.
$$

That is about an $85.9\%$ reduction for this matrix:

$$
1-\frac{4{,}608}{32{,}768}\approx0.859.
$$

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-087.webp" alt="LoRA parameter count example for a 512 by 64 Transformer matrix and rank eight factors" loading="lazy" decoding="async"><figcaption>The saving depends on both the original matrix shape and the chosen rank. Course slide 87.</figcaption></figure>

The percentage for an entire model also depends on which modules receive LoRA. Updating query and value projections only is smaller than adapting every attention projection and feed-forward layer.

### Where to Insert LoRA

Attention contains learned projections for queries, keys, values, and outputs; Transformer blocks also contain large feed-forward matrices. LoRA can target any compatible linear layer. Early work commonly targeted attention projections, but there is no universal best list.

Choose target modules through controlled experiments:

- begin with query and value projections as a lightweight baseline;
- add key and output projections if capacity is insufficient;
- consider feed-forward matrices for tasks requiring larger behavioral change;
- inspect trainable parameter counts after configuration;
- confirm module names against the exact model architecture.

A configuration that silently matches no modules can produce a training run with almost nothing trainable. A configuration copied from another architecture can target the wrong layers. Always print the trainable modules and parameter percentage before the first update.

An illustrative Hugging Face PEFT configuration is:

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"],
    bias="none",
)

model = get_peft_model(base_model, config)
model.print_trainable_parameters()
```

Module names such as `q_proj` and `v_proj` are architecture-specific. Inspect the model rather than assuming the names.

### Rank, Scaling, and Dropout

Rank $r$ controls the dimension of the update subspace. A larger rank provides more capacity but increases parameters, optimizer state, and checkpoint size. Performance often improves and then plateaus; the useful rank depends on task complexity, dataset size, target modules, and base model.

The scaling $\alpha/r$ changes the magnitude of the LoRA branch relative to the frozen branch. Rank and scaling should not be interpreted independently. LoRA dropout regularizes the adapter input during training and can help on small datasets, but excessive dropout can underfit.

Hyperparameters should be selected on validation performance and retention, not training loss alone. A high-rank adapter that memorizes a small dataset is not more capable in the way the product needs.

### Merge, Swap, or Combine

For a single deployment task, compute $W_{\text{merged}}=W_0+BA$ once and serve the merged matrix. This removes the extra LoRA branch from the forward pass. Keep the original adapter artifact so the model can be reproduced or unmerged safely.

For many tasks, keep the base model loaded and select an adapter per request or per batch. This saves memory and supports fast specialization, but batching requests with different adapters can complicate throughput. Weighted combinations of adapters are possible, yet interference should be evaluated rather than assumed away.

## 9. Evaluating LoRA Honestly

### Compare with More Than the Base Model

A meaningful experiment includes at least three systems:

1. the unchanged base model with the same inference prompt;
2. a LoRA-adapted model;
3. full fine-tuning when the budget permits a fair reference.

Keep the data split, decoding policy, number of updates, and metric implementation consistent. If one method receives a much larger hyperparameter search, the comparison measures search budget as well as method quality.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-091.webp" alt="Illustrative ROUGE scores for base FLAN-T5 full fine-tuning and LoRA fine-tuning on dialogue summarization" loading="lazy" decoding="async"><figcaption>In this illustrative dialogue-summarization run, LoRA captures most of the gain of full fine-tuning while training far fewer parameters. These numbers are not a universal guarantee. Course slide 91.</figcaption></figure>

In the shown experiment, the base FLAN-T5 model has ROUGE-1 near $0.233$, full fine-tuning reaches roughly $0.422$, and LoRA reaches roughly $0.408$. The result demonstrates a possibility: a restricted update can recover most of the target improvement. It does not prove that LoRA is always within the same margin on another dataset or model.

### Select Rank with a Validation Curve

Rank selection is a capacity decision. Train several ranks under the same protocol and plot target quality, retention, memory, and time. In the illustrated table, validation loss and generation metrics improve at low ranks and then largely plateau.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-092.webp" alt="Validation loss and text generation metrics across LoRA ranks with a performance plateau" loading="lazy" decoding="async"><figcaption>A larger rank does not automatically deliver a useful improvement. The plateau and the best rank are dataset-dependent. Course slide 92.</figcaption></figure>

Choose the smallest rank inside an acceptable quality region when storage or serving flexibility matters. Choose a larger rank only when the validation gain is repeatable and valuable enough to justify it. One run is noisy, so compare seeds when differences are small.

### Evaluate Behavior, Not Just Overlap

For generation tasks, automatic metrics can miss the failures users care about. Add task-specific checks:

- factual consistency with the input;
- required-field coverage;
- hallucination and unsafe completion rates;
- schema validity;
- calibrated refusal on unsupported requests;
- performance by length, language, topic, and rare case;
- retention on broad tasks.

The adapter's small size does not make its failures small. A LoRA checkpoint can systematically insert the wrong disclaimer, omit an escalation, or learn a biased label policy. Error analysis should trace failures back to examples, templates, slices, and adapter settings.

### Reproducibility Checklist

Save the base-model revision, tokenizer, adapter configuration, seed, dataset hash, split logic, template version, optimizer, scheduler, batch construction, gradient accumulation, precision, number of updates, selected checkpoint, and decoding configuration. Report trainable and total parameter counts.

Without this record, a 50 MB adapter is only a mysterious delta. With it, the adapter is a reproducible experiment.

## 10. Soft Prompt Tuning

### Soft Prompts Are Not Prompt Engineering

Prompt engineering writes discrete tokens that people can read. Prompt tuning learns continuous vectors by backpropagation while the language model remains frozen. If the token embeddings for input $x$ are $E(x)\in\mathbb{R}^{n\times d}$, prompt tuning prepends a trainable matrix

$$
P\in\mathbb{R}^{m\times d}
$$

and feeds

$$
[P;E(x)]
$$

to the frozen model. Only the $md$ entries of $P$ are optimized.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm6-fine-tuning/llm6-slide-095.webp" alt="Trainable soft prompt vectors prepended to ordinary token embeddings" loading="lazy" decoding="async"><figcaption>A soft prompt is a learned sequence of embedding-sized vectors, often tens of virtual tokens, prepended to every input. Course slide 95.</figcaption></figure>

The virtual tokens need not correspond to real vocabulary items. Their job is to steer hidden states, not form a readable sentence. This is why converting each learned vector to its nearest word embedding usually produces an awkward or misleading interpretation.

### One Frozen Model, Many Learned Prompts

Each task can store a small prompt matrix while sharing the same frozen model. Switching tasks means switching soft prompts. Compared with textual few-shot examples, a learned prompt can encode task behavior in fewer positions and avoids hand-writing demonstrations for every request.

The cost is that soft prompts still occupy input positions and require training. They are tied to a particular base model and embedding dimension. They also offer less adaptation capacity than methods that modify transformations throughout the network.

Prompt tuning differs from prefix tuning and P-tuning. All are soft-prompt methods, but they place or parameterize learned values differently. Prompt tuning simply prepends trainable embeddings to the input; prefix tuning often injects learned prefix key/value states across layers; P-tuning may use a prompt encoder. Treating the names as interchangeable hides important implementation differences.

### Scale Changes the Comparison

The original prompt-tuning study found that prompt tuning becomes more competitive with full model tuning as model size grows. That empirical trend is important but conditional. It was measured on particular T5 model sizes, tasks, prompt lengths, and training setups.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm6-fine-tuning/llm6-slide-102.webp" alt="SuperGLUE score versus model size for full fine-tuning multi-task fine-tuning prompt tuning and prompt engineering" loading="lazy" decoding="async"><figcaption>Prompt tuning closed much of the gap to full fine-tuning at larger model scales in the reported T5 experiments. Course slide 102, based on Lester et al.</figcaption></figure>

The lesson is not “soft prompts always match full fine-tuning.” It is that a sufficiently capable frozen model can expose useful behavior through a very small learned interface. For a smaller model or a sharply different task, LoRA or full fine-tuning may provide needed capacity.

### Interpretability Is Limited

Soft prompts live in a continuous embedding space. Their nearest vocabulary tokens may appear related, unrelated, or unstable across training runs. Even when nearest neighbors form a semantic cluster, that does not prove the model interprets the prompt as a phrase composed of those words.

Use behavioral tests to understand a soft prompt: perturb or remove virtual tokens, compare outputs across examples, test domain transfer, and inspect failures. A two-dimensional embedding plot can illustrate geometry, but it is not a faithful explanation of a high-dimensional learned control signal.

## 11. QLoRA and a Practical Decision Guide

### Quantization Plus LoRA

LoRA reduces the number of trainable parameters, but the frozen base weights still occupy memory. QLoRA combines LoRA with a quantized frozen base model. Gradients flow through the quantized model into the LoRA adapters; the base weights remain frozen.

The QLoRA method introduced three memory-oriented ideas:

- **4-bit NormalFloat (NF4)** for normally distributed pretrained weights;
- **double quantization** to compress quantization constants;
- **paged optimizers** to manage memory spikes.

Conceptually,

$$
W'\approx Q_4(W_0)+\frac{\alpha}{r}BA,
$$

where $Q_4(W_0)$ is the frozen 4-bit representation used in computation and $A,B$ remain trainable at a suitable compute precision. QLoRA does not mean that we train arbitrary 4-bit base weights directly. The low-rank adapters absorb the learned update.

Quantization can introduce error, and memory savings do not guarantee faster training on every device. Kernel support, dequantization, sequence length, optimizer state, and activation memory still matter. Evaluate QLoRA against an unquantized LoRA baseline when quality is sensitive.

### Choose the Smallest Intervention That Works

Use this progression:

1. **Prompting:** test whether the base model already performs the task.
2. **Retrieval plus prompting:** add changing or private evidence when the limitation is knowledge access.
3. **Soft prompt tuning:** learn a tiny task interface for a capable frozen model.
4. **LoRA:** add more adaptation capacity while preserving a shared base.
5. **QLoRA:** use LoRA when the frozen base itself does not fit comfortably in memory.
6. **Full fine-tuning:** allow unrestricted updates when experiments show that PEFT capacity is insufficient and the budget is justified.

This is not a rigid ladder. Privacy constraints, architecture support, latency, hardware, licensing, and operational complexity can change the order. The principle is to spend parameters and compute on a measured limitation.

### End-to-End Fine-Tuning Workflow

A reliable project can be organized into twelve checks:

1. Define the desired behavioral change and non-negotiable retention capabilities.
2. Establish the base-model prompting and retrieval baseline.
3. Audit data provenance, privacy, correctness, coverage, and duplicates.
4. Split by the unit that can leak: user, document, conversation, product, or time.
5. Version prompt templates and output schemas.
6. Decode and inspect tokenized batches, masks, truncation, and labels.
7. Start with a credible PEFT baseline and print trainable parameters.
8. Monitor validation quality, retention, memory, throughput, and failure slices.
9. Compare ranks or methods under the same evaluation and search budget.
10. Freeze the test set until model and decoding choices are final.
11. Package the exact base revision, adapter, tokenizer, configuration, and report.
12. Monitor production drift and route reviewed failures into the next dataset version.

> **The central engineering lesson:** fine-tuning is not a command that makes a model “know the task.” It is a controlled experiment connecting a behavior specification, a data distribution, an optimization method, and an evaluation contract.

### Final Takeaways

Instruction fine-tuning converts tasks into prompt-completion supervision. Single-task tuning can produce rapid gains but may narrow the model too far. Multi-task instruction tuning uses diverse task descriptions to build a more general instruction-following interface. FLAN and FLAN-T5 demonstrate why the diversity and balance of the instruction mixture matter.

Full fine-tuning provides maximum adaptation capacity but carries large training and storage costs. PEFT keeps a shared frozen base and trains compact task-specific parameters. LoRA learns low-rank weight updates; soft prompt tuning learns virtual input embeddings; QLoRA combines a quantized frozen base with LoRA adapters.

No method removes the need for clean splits, careful labels, retention tests, error analysis, and deployment monitoring. The best adapter is not the one with the largest rank or the smallest file. It is the smallest reproducible intervention that satisfies the complete evaluation contract.

### References

- Wei et al., [Finetuned Language Models Are Zero-Shot Learners](https://arxiv.org/abs/2109.01652).
- Chung et al., [Scaling Instruction-Finetuned Language Models](https://arxiv.org/abs/2210.11416).
- Longpre et al., [The Flan Collection: Designing Data and Methods for Effective Instruction Tuning](https://arxiv.org/abs/2301.13688).
- Hu et al., [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685).
- Lester et al., [The Power of Scale for Parameter-Efficient Prompt Tuning](https://arxiv.org/abs/2104.08691).
- Dettmers et al., [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314).
- Hugging Face, [PEFT documentation](https://huggingface.co/docs/peft/index) and [LoRA conceptual guide](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora).
