---
title: LLM 9 - RLHF, PPO, and GRPO
date: 2026-11-06 18:00:00
categories: COMS6998E LLM-Based Generative AI
tags:
  - RLHF
  - Human Feedback
  - Reward Modeling
  - PPO
  - Reward Hacking
  - Constitutional AI
  - RLAIF
  - DeepSeekMath
  - GRPO
mathjax: true
cover: "/images/columbia-low-memorial-library.jpg"
excerpt: "A complete guide to alignment with human feedback: preference data, reward models, PPO, reward hacking, Constitutional AI, DeepSeekMath, and the full GRPO derivation."
lesson_number: 9
lesson_level: 1
study_time: 180
---

Welcome back. [LLM 8](/blog/2026/10/30/LLM-8-Evaluating-LLMs/) asked how we can tell whether a language model is correct, useful, safe, and efficient. This blog takes the next step: once evaluation reveals a behavioral gap, how can training move the model toward the behavior people actually want?

The central difficulty is that next-token prediction does not directly encode **helpfulness, honesty, or harmlessness**. Pretraining teaches a model what text is likely. Supervised fine-tuning teaches it to imitate selected responses. Neither objective automatically expresses the full ordering humans have in mind: one answer may be more relevant, safer, clearer, or more faithful than another even when both are plausible continuations.

Reinforcement learning from human feedback (RLHF) turns those comparisons into a training signal. We will build the pipeline without skipping the uncomfortable parts: where preference labels come from, how rankings become pairwise examples, what a reward model learns, why PPO needs a value model and a reference model, how clipping works, how reward hacking appears, and why a KL penalty is necessary. We will then replace expensive human comparisons with constitutional feedback and finish with DeepSeekMath's Group Relative Policy Optimization (GRPO), which removes the value model and compares several answers to the same question.

This page preserves the complete 130-slide lecture. Repeated animation builds are consolidated into their final diagrams and explained step by step; the original slide deck and a slide-by-slide archive remain available at the end.

## 1. Alignment After Fine-Tuning

### From project lifecycle to behavioral goals

A generative-AI project usually passes through four broad phases: define the scope, select a model, adapt and align it, and integrate it into an application. Prompt engineering, supervised fine-tuning, evaluation, and alignment with human feedback all sit inside the adaptation phase. They are related, but they solve different problems.

Prompt engineering changes the context without changing model weights. Supervised fine-tuning changes the weights so that desirable responses become more likely. Evaluation measures whether the resulting system meets a specification. Human-feedback alignment adds a preference objective when “good” cannot be captured by one reference string.

The fine-tuning goals in the lecture are deliberately broader than memorizing prompt–response pairs:

- understand prompts more reliably;
- complete tasks more accurately;
- produce more natural language;
- behave in ways that are helpful, honest, and harmless.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-007.webp" alt="Generative AI project lifecycle with prompt engineering fine-tuning evaluation and alignment" loading="lazy" decoding="async"><figcaption>Prompt engineering, fine-tuning, evaluation, and human-feedback alignment are complementary parts of model adaptation. Course slide 7.</figcaption></figure>

### Why likelihood is not enough

A model can produce toxic language, respond aggressively, or provide dangerous instructions because the pretraining objective rewards statistical continuation, not intent. The HHH framework asks three separate questions:

- **Helpful:** does the response address the user's legitimate need?
- **Honest:** does it avoid confident falsehoods and communicate uncertainty?
- **Harmless:** does it avoid creating unjustified risk?

These goals can conflict. A maximally literal answer to a harmful request may be “helpful” in a narrow sense and unacceptable overall. A refusal may be harmless yet unhelpful if it does not explain what safe assistance remains available. Alignment is therefore an ordering problem, not a binary filter.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-009.webp" alt="Examples of helpful honest and harmless model behavior" loading="lazy" decoding="async"><figcaption>Three failures illustrate why alignment must evaluate more than grammatical fluency. Course slide 9.</figcaption></figure>

Evidence from human-feedback summarization already showed the value of this distinction. In the cited study, human preference for model summaries improved with scale when the model was trained from human feedback. The key comparison was not token-level similarity to one reference. People directly judged which summary was better.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-011.webp" alt="Human preference for summaries produced by models of different sizes and training methods" loading="lazy" decoding="async"><figcaption>Human-feedback training can improve preference beyond supervised imitation or pretraining alone. Course slide 11; adapted from Stiennon et al. (2020).</figcaption></figure>

The RLHF pipeline begins with an instruction-tuned model and ends with a human-aligned model. Between them is reinforcement learning driven by feedback. The target is not “agree with every user.” It is to maximize useful and relevant behavior while reducing harm, misinformation, and dangerous assistance under a written alignment policy.

## 2. Reinforcement Learning for Language

### Agent, environment, action, and reward

Reinforcement learning describes an agent interacting with an environment. At time $t$, the agent observes a state $s_t$, chooses an action $a_t$, receives reward $r_t$, and transitions to a new state $s_{t+1}$. A policy $\pi_\theta(a_t\mid s_t)$ assigns probabilities to actions. The objective is to maximize expected accumulated reward.

For a discounted horizon,

$$
G_t=\sum_{k=0}^{T-t}\gamma^k r_{t+k},
$$

where $\gamma\in[0,1]$ controls how strongly later rewards matter. In an episodic task, the reward may arrive mainly at the end.

Tic-tac-toe makes the vocabulary concrete. The board is the state, a legal square is an action, a complete game is a rollout, and win/loss/draw outcomes produce rewards. The policy learns which move is preferable in each board position. The environment enforces legal transitions and returns the next board.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-020.webp" alt="Tic tac toe reinforcement learning loop with policy state action reward and rollout" loading="lazy" decoding="async"><figcaption>The final animation state of the tic-tac-toe example: state enters the policy, an action changes the environment, and the resulting reward closes the loop. Course slides 14–20.</figcaption></figure>

### Mapping the loop to an LLM

For language generation, the mapping is almost literal:

- **agent/policy:** the instruction-tuned LLM;
- **state:** the prompt plus all tokens generated so far;
- **action:** the next token selected from the vocabulary;
- **environment:** the evolving text context and termination rule;
- **trajectory/rollout:** a complete generated response;
- **reward:** a score assigned to the response, often by a learned reward model.

At step $t$, the state is

$$
s_t=(x,y_{<t}),
$$

where $x$ is the prompt and $y_{<t}$ is the partial completion. The action is token $y_t$, sampled from

$$
y_t\sim\pi_\theta(\cdot\mid x,y_{<t}).
$$

After an end token or length limit, the trajectory $y=(y_1,\ldots,y_T)$ receives a score. Unlike a board game, the environment does not usually reveal a natural reward after each word. That delayed and imperfect supervision is one reason language-model RL is difficult.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-030.webp" alt="Language model reinforcement learning loop with context token actions reward model and rollout" loading="lazy" decoding="async"><figcaption>An LLM is the policy, its context is the state, vocabulary items are actions, and a reward model scores the completed rollout. Course slides 21–30.</figcaption></figure>

The objective sounds simple—generate aligned text—but the reward is not available yet. We first need a dataset that teaches a model what people prefer.

## 3. Human Feedback and Reward Models

### Building a preference dataset

Start with a prompt dataset representative of the deployment task. For every prompt $x$, sample several completions from the instruction-tuned model. Diversity matters: if every completion is nearly identical, labelers cannot teach the reward model much about the boundary between weak and strong behavior.

Human labelers then rank the candidate responses under a specific criterion such as helpfulness. The criterion must be written down before annotation begins. “Choose the best response” is not enough when labelers disagree about whether safety, concision, factuality, tone, or instruction following has priority.

The lecture's example begins with “My house is too hot.” A useful response suggesting air conditioning is ranked above a dismissive “There is nothing you can do,” while “It is not too hot” ignores the user's report. The point is not the household advice; it is that ranking expresses a relative judgment among answers to the same prompt.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-033.webp" alt="Human labelers rank three completions for a prompt about a hot house" loading="lazy" decoding="async"><figcaption>Several labelers rank the same model completions under an explicit helpfulness criterion. Course slide 33.</figcaption></figure>

The annotation instructions in the lecture require labelers to:

1. rank responses from best to worst for the supplied prompt;
2. base the decision on correctness, relevance, informativeness, and usefulness;
3. treat nonsensical, irrelevant, or factually incorrect answers as low quality;
4. prefer concise, direct answers while recognizing that longer answers may be better when extra detail is necessary.

These instructions are part of the model. If the rubric changes, the meaning of the reward changes.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-034.webp" alt="Sample instructions for human preference labelers" loading="lazy" decoding="async"><figcaption>A preference dataset is only interpretable together with the rubric used to create it. Course slide 34.</figcaption></figure>

### From rankings to pairs

Suppose the responses are ranked $y_1\succ y_2\succ y_3$. This ranking can be expanded into pairwise examples:

$$
(y_1,y_2),\qquad (y_1,y_3),\qquad (y_2,y_3).
$$

For each pair, one response is labeled chosen ($y_w$) and the other rejected ($y_l$). Pairwise conversion makes the learning problem consistent even when prompts have different numbers of candidates.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-035.webp" alt="Conversion of a ranked response list into pairwise reward model training examples" loading="lazy" decoding="async"><figcaption>A ranking becomes multiple chosen-versus-rejected comparisons for reward-model training. Course slide 35.</figcaption></figure>

The first lecture checkpoint asks for the role of human labelers in RLHF. They do not identify weights or write every completion from scratch. Their core role is to **score or rank prompt completions so that these comparisons can train the reward model**. The correct choice is **D**.

### Training the reward model

A reward model $r_\phi(x,y)$ receives a prompt and completion and returns a scalar. A common Bradley–Terry preference model defines

$$
P_\phi(y_w\succ y_l\mid x)
=\sigma\!\left(r_\phi(x,y_w)-r_\phi(x,y_l)\right),
$$

where $\sigma(z)=1/(1+e^{-z})$. The pairwise loss is

$$
\mathcal L_{RM}(\phi)
=-\mathbb E_{(x,y_w,y_l)}
\left[\log\sigma\!\left(r_\phi(x,y_w)-r_\phi(x,y_l)\right)\right].
$$

Only the score difference matters. Adding the same constant to every reward does not change the preference probability. This is why raw reward values should not be interpreted as universal moral units; they are learned coordinates for comparisons on the training distribution.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-039.webp" alt="Pairwise reward model loss for a preferred and rejected completion" loading="lazy" decoding="async"><figcaption>The reward model learns to assign a larger scalar to the preferred completion. Course slides 37–39.</figcaption></figure>

After training, the reward model can score new prompt–completion pairs. The lecture visualizes it as a binary preference classifier: logits are converted to probabilities, and the preferred-class score becomes a reward signal. In practice, calibration, distribution shift, annotation noise, prompt leakage, and adversarial responses all matter. The reward model is a learned proxy for the rubric, not a perfect oracle.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-043.webp" alt="A trained reward model assigns scores and preference probabilities to new completions" loading="lazy" decoding="async"><figcaption>The trained reward model supplies a scalar signal for model-generated text. Course slides 40–43.</figcaption></figure>

## 4. PPO for RLHF

### The rollout–update cycle

RLHF now has three main learned components: an instruction-tuned policy, a reward model, and a value model used by PPO. A fourth model—a frozen reference policy—will later constrain drift.

For each iteration:

1. sample prompts from the prompt dataset;
2. generate completions with the current policy;
3. score the completions with the reward model;
4. estimate returns and advantages;
5. update the policy while limiting how far it moves;
6. replace the old policy with the updated policy and repeat.

The lecture's running example begins with “A dog is …”. Early completions receive rewards such as $0.24$, $0.51$, $0.68$, and $1.79$. After many iterations the policy discovers higher-scoring language. These numbers illustrate the feedback loop; they are not comparable across unrelated reward models.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-050.webp" alt="RLHF loop with prompt dataset instruction model reward model and PPO" loading="lazy" decoding="async"><figcaption>The reward model evaluates rollouts and PPO updates the policy. Course slides 44–50.</figcaption></figure>

PPO alternates between two phases. Phase 1 creates completions and collects experience. Phase 2 updates the model using those fixed trajectories. This separation makes the probability ratio meaningful: the numerator comes from the updated policy and the denominator from the policy that generated the data.

### Value prediction and value loss

Let $V_\psi(s_t)$ predict future return from state $s_t$. A simple Monte Carlo target is

$$
\widehat G_t=\sum_{t'=t}^{T}\gamma^{t'-t}r_{t'}.
$$

The value loss is

$$
\mathcal L^{VF}(\psi)
=\frac12\,\mathbb E_t\left[
\left(V_\psi(s_t)-\widehat G_t\right)^2
\right].
$$

If the estimated future reward is $1.23$ and the observed terminal reward is $1.87$, the prediction error is $-0.64$ and the squared-error contribution is $\tfrac12(0.64)^2$. The value model supplies a baseline: actions should be reinforced not merely when their outcome is positive, but when it is better than expected from the current state.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-057.webp" alt="Value loss compares predicted future reward with observed return" loading="lazy" decoding="async"><figcaption>The value function learns to predict the return; its residual helps determine whether a sampled action was better or worse than expected. Course slides 55–57.</figcaption></figure>

PPO implementations often use generalized advantage estimation (GAE),

$$
\delta_t=r_t+\gamma V_\psi(s_{t+1})-V_\psi(s_t),
$$

$$
\widehat A_t^{GAE(\gamma,\lambda)}
=\sum_{l=0}^{T-t-1}(\gamma\lambda)^l\delta_{t+l}.
$$

$\lambda$ trades variance against bias. The value network reduces variance, but for an LLM it is another model-sized component that consumes memory.

### Probability ratios and clipping

Let $\pi_{old}$ be the policy that generated a token and $\pi_\theta$ the policy being updated. Their probability ratio is

$$
\rho_t(\theta)=
\frac{\pi_\theta(a_t\mid s_t)}{\pi_{old}(a_t\mid s_t)}.
$$

$\rho_t>1$ means the updated policy makes that token more likely; $\rho_t<1$ means it makes the token less likely. Multiplying by advantage gives the desired direction:

- $\widehat A_t>0$: increase the sampled token's probability;
- $\widehat A_t<0$: decrease it;
- a large $|\widehat A_t|$: apply a stronger update;
- $\rho_t$ far from $1$: the new policy has already moved substantially.

The clipped PPO surrogate is

$$
J_{clip}(\theta)=\mathbb E_t\left[
\min\left(
\rho_t(\theta)\widehat A_t,
\operatorname{clip}(\rho_t(\theta),1-\epsilon,1+\epsilon)\widehat A_t
\right)
\right].
$$

Training maximizes $J_{clip}$, or equivalently minimizes $-J_{clip}$. The minimum chooses the more conservative term. For a positive advantage, ratios above $1+\epsilon$ stop receiving additional benefit. For a negative advantage, ratios below $1-\epsilon$ stop receiving additional benefit. The interval $[1-\epsilon,1+\epsilon]$ acts as a trust region; the lecture uses a typical value near $\epsilon=0.2$.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-068.webp" alt="PPO clipped policy objective and trust region" loading="lazy" decoding="async"><figcaption>Clipping prevents one batch of noisy advantage estimates from causing an arbitrarily large policy step. Course slides 59–68.</figcaption></figure>

### Entropy and the complete objective

If the policy becomes too certain too quickly, it may collapse onto a narrow set of responses. Entropy measures distributional spread:

$$
H\!\left(\pi_\theta(\cdot\mid s_t)\right)
=-\sum_a \pi_\theta(a\mid s_t)
\log \pi_\theta(a\mid s_t).
$$

A low-entropy policy concentrates probability on a few tokens; a high-entropy policy retains more alternatives. When training minimizes a loss, an entropy term can be written

$$
\mathcal L^{ENT}=-H(\pi_\theta),
$$

so minimizing it encourages exploration. Too much entropy, however, produces random or unfocused language. The coefficient must be tuned against task reward and stability.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-070.webp" alt="Low entropy and high entropy language model completions" loading="lazy" decoding="async"><figcaption>Entropy distinguishes a narrow token distribution from a more diverse one; neither extreme is automatically desirable. Course slides 69–70.</figcaption></figure>

One loss convention in the lecture is

$$
\mathcal L^{PPO}
=\mathcal L^{POLICY}
+c_1\mathcal L^{VF}
+c_2\mathcal L^{ENT}.
$$

The policy term improves reward, the value term trains the return baseline, and the entropy term controls diversity. After the update, the new model generates another set of trajectories and the two-phase cycle repeats.

The second lecture checkpoint asks what RLHF can improve. It can reduce toxicity and misinformation; it does not inherently make inference faster, enlarge the network with “preference parameters,” or guarantee interpretability. The supported choice is **A**.

## 5. Reward Hacking and KL Control

### When the proxy becomes the target

Reward hacking occurs when the policy discovers a way to increase the learned reward without improving the intended behavior. The reward model is finite, trained on a limited distribution, and easier to optimize than the underlying human preference. Once the policy searches aggressively against it, small reward-model errors can become dominant.

The lecture's toxicity example begins with “This product is …”. A clearly toxic completion receives $-1.8$. PPO then finds “okay but not the best” at $0.3$, an exaggerated “the most awesome, most incredible thing ever” at $2.1$, and finally a vacuous “Beautiful love and world peace all around” at $3.7$. The reward rises while relevance and truthfulness deteriorate. The model has learned the reward model's shortcut.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-082.webp" alt="Reward hacking trajectory in which generic positive language earns increasing toxicity reward" loading="lazy" decoding="async"><figcaption>A proxy trained to dislike toxicity can be exploited by irrelevant, excessively positive text. Course slides 79–82.</figcaption></figure>

This is an instance of Goodhart's law: once a measure becomes a target, pressure on the measure can break its relationship with the real goal.

### A frozen reference policy

To prevent uncontrolled drift, RLHF keeps a frozen reference model $\pi_{ref}$, usually initialized from the same instruction-tuned checkpoint. The updated policy is penalized for moving too far from it. A sequence-level objective can be written

$$
J(\theta)=\mathbb E_{x\sim D,\,y\sim\pi_\theta}
\left[
r_\phi(x,y)
-\beta D_{KL}\!\left(pi_\theta(\cdot\mid x)\,\|\,\pi_{ref}(\cdot\mid x)\right)
\right].
$$

At token level, many implementations shape the reward with

$$
r_t^{total}=r_t^{task}
-\beta\left(
\log\pi_\theta(a_t\mid s_t)-
\log\pi_{ref}(a_t\mid s_t)
\right).
$$

The coefficient $\beta$ controls the trade-off. If it is too small, the model can exploit the reward model and forget useful language behavior. If it is too large, the policy barely moves and alignment gains disappear.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-091.webp" alt="RLHF architecture with reference model reward model PPO and KL divergence penalty" loading="lazy" decoding="async"><figcaption>The reference policy supplies a shift penalty; the lecture also shows parameter-efficient adapters so that the trainable update need not duplicate every weight. Course slides 83–91.</figcaption></figure>

The reference model is frozen. The policy may be updated through all parameters or a parameter-efficient adapter. PEFT reduces trainable memory, but PPO still needs activations, optimizer state, the reward model, and often a value model. Memory efficiency is one motivation for GRPO later in the blog.

### Evaluate after alignment

Alignment training must be followed by evaluation. The lecture compares toxicity scores on a summarization dataset before and after RLHF, with the illustrated score falling from $0.14$ to $0.09$. The number is meaningful only under the evaluator and data slice used, but the experimental pattern is correct: preserve a held-out evaluation set, measure the target behavior, and check for regressions elsewhere.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-094.webp" alt="Toxicity evaluation before and after human feedback alignment" loading="lazy" decoding="async"><figcaption>The aligned model is evaluated on held-out summaries with the same toxicity evaluator. Course slides 92–94.</figcaption></figure>

The TRL workflow summarizes the production loop as **rollout, evaluation, optimization**. A policy generates responses, a reward model evaluates them, and PPO optimizes log probabilities under reward and KL constraints. Parameter-efficient training can make a 20B-scale RLHF experiment possible on a 24 GB consumer GPU in the cited Hugging Face example, but hardware feasibility does not remove the statistical and safety problems above.

## 6. Scaling Feedback and Constitutional AI

### The cost of human labels

Classical RLHF can require tens of thousands of preference labels. Human annotation is expensive, slow, and inconsistent across cultures and rubrics. It is also hard to expose annotators to every adversarial request the deployed model may encounter.

Constitutional AI replaces part of that repeated supervision with a written set of principles and model self-critique. The constitution does not eliminate human values; people still choose the principles. It changes how those values are scaled across prompts.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-097.webp" alt="Human preference labels compared with model self supervision under a constitution" loading="lazy" decoding="async"><figcaption>Constitutional AI trades repeated human comparisons for scalable feedback guided by explicit rules. Course slides 96–97.</figcaption></figure>

Example principles in the lecture ask the model to choose a response that is most helpful, honest, and harmless; least harmful to humanity; attentive to legality, ethics, racism, sexism, toxicity, and danger; and similar in spirit to peaceful and ethical exemplars. A constitution should be auditable: each principle needs a rationale, priority, and process for resolving conflicts.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-101.webp" alt="Example constitutional AI principles for helpful honest and harmless behavior" loading="lazy" decoding="async"><figcaption>Written principles make the source of a critique explicit, although the principles themselves still require governance. Course slide 101.</figcaption></figure>

### Supervised self-critique and revision

The supervised stage is:

1. use red-team prompts to elicit problematic responses;
2. ask the model to critique its response under a selected constitutional principle;
3. ask it to revise the response;
4. fine-tune on the revised, safer responses.

In the lecture's Wi-Fi example, an initial helpful model gives instructions for hacking a neighbor's network. A critique identifies illegality, privacy violation, and harm. The revision refuses the request while explaining the problem and offering safe alternatives. The training target is the revised response, not the unsafe draft.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-106.webp" alt="Constitutional AI example with harmful answer critique and revised refusal" loading="lazy" decoding="async"><figcaption>The supervised stage transforms a red-team response through principle-based critique and revision. Course slides 102–107.</figcaption></figure>

### RLAIF

The reinforcement-learning stage uses AI feedback (RLAIF):

1. generate multiple responses to red-team prompts;
2. ask a model which response better follows the constitution;
3. train a reward model on those preferences;
4. optimize the policy with RL;
5. obtain a constitutional model.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-111.webp" alt="Constitutional AI supervised learning and reinforcement learning from AI feedback pipeline" loading="lazy" decoding="async"><figcaption>The complete pipeline combines supervised critique/revision with a preference model and reinforcement learning from AI feedback. Course slides 108–111.</figcaption></figure>

RLAIF scales cheaply, but it can amplify blind spots shared by the feedback model and policy. Human audits, red teaming, disagreement analysis, and high-risk escalation remain necessary. The constitution is a specification, not a proof of safety.

## 7. DeepSeekMath

### Data before algorithm

DeepSeekMath combines a large mathematical corpus, supervised examples, and reinforcement learning. The lecture highlights three stages:

1. **Pretraining:** 120B mathematical tokens, starting from DeepSeek-Coder-Base-v1.5 7B.
2. **SFT:** 776K examples spanning chain-of-thought, program-of-thought, and tool-integrated reasoning.
3. **GRPO:** roughly 144K questions, a subset of the SFT data, used for reinforcement learning.

The data pipeline starts with mathematical seed pages, trains a fastText classifier, recalls math-related Common Crawl pages, discovers related domains, annotates additional URLs with a language model, and iterates. Two findings emphasized in the lecture are that prior code training can improve mathematical reasoning and that arXiv papers were surprisingly ineffective as the primary reasoning corpus.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-114.webp" alt="DeepSeekMath data collection and three stage training pipeline" loading="lazy" decoding="async"><figcaption>DeepSeekMath combines scalable web-data collection with pretraining, SFT, and GRPO. Course slide 114.</figcaption></figure>

### Reported results

The 7B RL model reported:

- GSM8K: $88.2\%$;
- MATH with chain-of-thought: $51.7\%$;
- MATH with tool-integrated reasoning: $58.8\%$;
- improvement over SFT: $+5.3$ points on GSM8K and $+4.9$ on MATH;
- Chinese CMATH improvement from $84.6\%$ to $88.8\%$;
- self-consistency with 64 samples: $60.9\%$ on MATH.

These are historical paper results under the paper's models, datasets, prompting, and evaluation protocol. They should not be read as timeless rankings. Their importance here is causal: reinforcement learning improves the probability of producing correct solutions from the model's existing distribution.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-115.webp" alt="DeepSeekMath benchmark performance on GSM8K MATH and CMATH" loading="lazy" decoding="async"><figcaption>The reported 7B results motivate a closer look at how GRPO obtains RL gains without PPO's value model. Course slide 115.</figcaption></figure>

## 8. GRPO Derivation

### Why remove the value model?

PPO for language models commonly keeps four models in memory:

- policy model;
- frozen reference model;
- reward model;
- value or critic model.

The value model can be approximately as large as the policy, producing substantial memory and optimizer overhead. GAE also requires token-level temporal-difference estimates even though language rewards often arrive after the entire answer. KL shaping at every token further complicates the advantage calculation.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-116.webp" alt="Four model PPO architecture and its memory bottleneck" loading="lazy" decoding="async"><figcaption>PPO needs policy, reference, reward, and value models; GRPO is designed to remove the critic. Course slide 116.</figcaption></figure>

GRPO replaces the learned value baseline with a **group-relative baseline**. For one question $q$, sample $G$ responses

$$
o_1,\ldots,o_G\sim\pi_{old}(\cdot\mid q)
$$

and compute rewards $r_1,\ldots,r_G$. Normalize them within the group:

$$
\widehat A_i=
\frac{r_i-\operatorname{mean}(r_1,\ldots,r_G)}
{\operatorname{std}(r_1,\ldots,r_G)+\varepsilon_{num}}.
$$

The baseline now comes from other answers to the same question. No critic is needed. This can save roughly 25–50% of model memory relative to a four-model PPO setup, depending on optimizer state, sharding, and implementation.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-118.webp" alt="PPO and GRPO architectures compared" loading="lazy" decoding="async"><figcaption>GRPO samples a response group, scores each response, and computes advantages relative to the group rather than a value network. Course slide 118.</figcaption></figure>

Consider the lecture's question “What is $2+3$?” and five answers $[5,7,5,4,5]$. With binary rewards $[1,0,1,0,1]$,

$$
\mu=0.6,\qquad
\sigma=\sqrt{\frac{3(1-0.6)^2+2(0-0.6)^2}{5}}
\approx0.49.
$$

Thus a correct answer has

$$
\widehat A_{correct}=\frac{1-0.6}{0.49}\approx0.82,
$$

while an incorrect answer has

$$
\widehat A_{wrong}=\frac{0-0.6}{0.49}\approx-1.22.
$$

The same raw reward has different meaning in a different group. A reward of $0.6$ is strong if the other answers average $0.2$ and weak if they average $0.9$.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-119.webp" alt="Numerical example of group normalized advantages for five arithmetic answers" loading="lazy" decoding="async"><figcaption>Correct responses receive positive relative advantage and incorrect responses negative advantage. Course slide 119.</figcaption></figure>

### The GRPO objective

For response $o_i=(o_{i,1},\ldots,o_{i,|o_i|})$, define the token ratio

$$
\rho_{i,t}(\theta)=
\frac{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}
{\pi_{old}(o_{i,t}\mid q,o_{i,<t})}.
$$

A compact GRPO objective is

$$
\begin{aligned}
J_{GRPO}(\theta)=\mathbb E\Bigg[
\frac1G\sum_{i=1}^{G}\frac1{|o_i|}\sum_{t=1}^{|o_i|}
\Big(&\min\{\rho_{i,t}\widehat A_i,
\operatorname{clip}(\rho_{i,t},1-\epsilon,1+\epsilon)\widehat A_i\}\\
&-\beta D_{KL}(\pi_\theta\|\pi_{ref})\Big)
\Bigg].
\end{aligned}
$$

The outer average treats the $G$ sampled outputs symmetrically. The inner average prevents long responses from dominating solely because they contain more tokens. PPO-style clipping keeps the policy step bounded. KL regularization is included directly in the objective rather than modifying the task reward used to compute advantages.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-120.webp" alt="Full group relative policy optimization objective" loading="lazy" decoding="async"><figcaption>GRPO combines group-relative advantages, token-level probability ratios, clipping, and direct KL regularization. Course slide 120.</figcaption></figure>

### Probability times advantage

The core policy-gradient term is the product of probability change and advantage. Four cases provide a useful sign check:

1. **positive advantage, high probability:** the output is good and already likely; reinforce it, but clipping may limit the update;
2. **positive advantage, low probability:** the output is good but rare; increase its probability strongly;
3. **negative advantage, high probability:** a poor output is too common; reduce its probability;
4. **negative advantage, low probability:** the poor output is already rare; clipping prevents an unnecessary extreme step.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-121.webp" alt="Four sign cases for probability multiplied by advantage" loading="lazy" decoding="async"><figcaption>Before trusting an implementation, verify that each probability–advantage case moves the policy in the expected direction. Course slide 121.</figcaption></figure>

Clipping does not say that ratios outside the interval are impossible. It says the surrogate objective stops rewarding further movement beyond the trusted range. For $\widehat A>0$, a ratio greater than $1+\epsilon$ is clipped downward; for $\widehat A<0$, a ratio below $1-\epsilon$ is clipped upward inside the conservative term.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-122.webp" alt="Probability ratio clipping cases in GRPO" loading="lazy" decoding="async"><figcaption>The sign of the advantage determines which side of the ratio interval is dangerous. Course slide 122.</figcaption></figure>

### Outcome and process supervision

Outcome supervision assigns one reward to a complete response. Every token shares the same group-relative advantage:

$$
\widehat A_{i,t}^{OS}=
\frac{r_i-\operatorname{mean}(r)}{\operatorname{std}(r)}.
$$

Process supervision assigns rewards to intermediate reasoning steps. A token's advantage can accumulate normalized rewards from future steps:

$$
\widehat A_{i,t}^{PS}=
\sum_{j:\operatorname{index}(j)\ge t}
\widetilde r_i^{\operatorname{index}(j)}.
$$

The resulting signal can identify where reasoning goes wrong instead of treating every token in a failed solution as equally bad. In the reported experiment, GRPO with process supervision outperformed GRPO with outcome supervision.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-123.webp" alt="Outcome supervision and process supervision advantage formulas" loading="lazy" decoding="async"><figcaption>Process supervision supplies step-level credit assignment and gave the stronger reported result. Course slide 123.</figcaption></figure>

### Iterative GRPO

One exploration stage samples a batch, generates $G=64$ outputs per question, computes rewards and group-relative advantages, and performs one policy update ($\mu=1$). The lecture uses clipping $\epsilon$, KL coefficient $\beta=0.04$, and a reward-model replay buffer containing 10% historical data. At each outer iteration, the reference model is reset to the current policy and the reward model is updated as the policy's output distribution changes.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-124.webp" alt="Iterative GRPO algorithm and hyperparameters" loading="lazy" decoding="async"><figcaption>Iterative GRPO co-evolves policy and reward models instead of treating the original preference model as permanently valid. Course slide 124.</figcaption></figure>

## 9. Results and Interpretation

### SFT, RFT, and GRPO as weighted likelihood gradients

The lecture unifies several methods through

$$
\nabla_\theta J_A(\theta)=
\mathbb E\left[
\frac1{|o|}\sum_t GC_A\cdot
\nabla_\theta\log\pi_\theta(o_t\mid q,o_{<t})
\right].
$$

The difference is the gradient coefficient $GC_A$ and how training data are obtained:

- **SFT:** offline human-selected data; coefficient $1$ for every target token;
- **rejection-sampling fine-tuning (RFT):** offline sampled data filtered by a rule; coefficient $1$ for accepted answers and $0$ for rejected answers;
- **GRPO:** online samples; a model- or rule-based reward; continuous positive and negative coefficients from relative advantage.

SFT imitates. RFT keeps or discards. GRPO ranks degrees of quality and can explicitly push probability away from weak outputs.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-125.webp" alt="Unified gradient view of SFT rejection sampling fine tuning and GRPO" loading="lazy" decoding="async"><figcaption>SFT, RFT, and GRPO can be compared as different weights on log-probability gradients. Course slide 125.</figcaption></figure>

### Experimental hierarchy

On the reported GSM8K and MATH experiments, the hierarchy is

$$
\text{GRPO+PS} > \text{GRPO+OS} > \text{Online RFT} > \text{RFT}.
$$

Online methods improve more strongly over time than offline rejection sampling. Continuous advantage coefficients outperform binary keep/discard coefficients, and process supervision supplies better credit assignment than one outcome reward. All methods improve on the SFT baseline, but the RL variants improve more.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-126.webp" alt="RFT online RFT GRPO outcome supervision and GRPO process supervision results" loading="lazy" decoding="async"><figcaption>GRPO with process supervision gives the strongest curves in the reported comparison. Course slide 126.</figcaption></figure>

Two iterative rounds provide additional gains with diminishing returns. The lecture reports approximately

$$
\text{GSM8K}: 83\%\rightarrow87\%\rightarrow89\%,
$$

$$
\text{MATH}: 47\%\rightarrow51\%\rightarrow52\%.
$$

The reward model must evolve with the policy. Otherwise it is asked to score a distribution increasingly different from the one on which it was trained.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-127.webp" alt="Two iterative GRPO rounds on GSM8K and MATH" loading="lazy" decoding="async"><figcaption>The second iteration remains beneficial, but the marginal gain is smaller. Course slide 127.</figcaption></figure>

### Maj@K versus Pass@K

The reported curves make an important distinction. **Pass@K** asks whether at least one of $K$ samples is correct; it estimates the boundary of what the model can produce under sampling. **Maj@K** asks whether the majority or self-consistent aggregate is correct; it measures how much probability mass lies on correct solutions.

RL increased Maj@64 on MATH from roughly $55\%$ to $61\%$, while Pass@K changed little. This suggests that the SFT model already had many correct solutions somewhere in its support. RL redistributed probability toward them, making correct reasoning more reliable, rather than creating an entirely new ceiling of solvable problems.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-128.webp" alt="Maj at K and Pass at K curves before and after reinforcement learning" loading="lazy" decoding="async"><figcaption>RL improves the robustness of sampled outputs more clearly than the maximum capability revealed by Pass@K. Course slide 128.</figcaption></figure>

### Efficiency and future directions

The lecture's DeepSeekMath configuration uses policy learning rate $10^{-6}$, reward-model learning rate $2\times10^{-5}$, KL coefficient $\beta=0.04$, group size $G=64$, roughly 144K questions, and one policy update per exploration stage. Removing the value model reduces the architecture from four model roles to three: policy, reward, and reference.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm9-rlhf-grpo/slide-129.webp" alt="GRPO hyperparameters training efficiency and memory comparison with PPO" loading="lazy" decoding="async"><figcaption>GRPO's efficiency comes from removing the critic, not from eliminating the reward or reference model. Course slide 129.</figcaption></figure>

The final directions are:

1. **better data:** out-of-distribution prompts and tree-search sampling;
2. **more robust algorithms:** noisy-reward handling and weak-to-strong learning;
3. **better reward models:** generalization, uncertainty, and process supervision.

DeepSeek-R1 later demonstrated emergent reasoning with GRPO-style training without an initial SFT stage, and variants such as DAPO and Dr. GRPO continue to refine optimization for reasoning models. The durable lesson is not that one optimizer solves alignment. It is that preference data, reward quality, regularization, credit assignment, sampling, and evaluation form one coupled system.

> **The complete pipeline:** collect comparisons, train a reward proxy, optimize the policy conservatively, audit proxy failures, keep a reference constraint, update the evaluator as the policy changes, and verify behavior on held-out tasks. RLHF is not one loss function; it is a feedback system whose weakest component can dominate the result.

## 10. Complete Lecture Archive

Every slide is retained below. The main text consolidates repeated animation builds—for example slides 14–20, 21–30, 37–43, 44–50, 59–68, 75–78, 83–91, and 102–111—into their final state and explains the intermediate additions in order.

| Slides | Covered above |
| --- | --- |
| 1–12 | Agenda, project lifecycle, model failures, HHH, human-feedback motivation, RLHF overview |
| 13–30 | RL loop, tic-tac-toe, LLM state/action/reward mapping |
| 31–43 | prompt sampling, annotation rubric, pairwise data, reward model training and inference |
| 44–78 | RL updates, PPO rollout, value loss, clipped policy loss, entropy, full objective, checkpoints |
| 79–95 | reward hacking, frozen reference model, KL penalty, PEFT, evaluation, TRL workflow |
| 96–111 | scaling feedback, constitutional principles, critique/revision, RLAIF |
| 112–130 | DeepSeekMath data and results, PPO limitations, GRPO derivation, supervision, experiments, future work |

<p><a class="article-download-button" href="/blog/files/coms6998e-llm-9-rlhf-grpo.pdf" download>Download the original Lecture 9 PDF</a></p>

<details class="llm9-slide-archive">
<summary>Open the complete 130-slide archive</summary>
<div id="llm9-complete-slide-grid" class="llm9-complete-slide-grid"></div>
</details>

<script>
(function () {
  var grid = document.getElementById('llm9-complete-slide-grid');
  if (!grid || grid.dataset.ready === 'true') return;
  grid.dataset.ready = 'true';
  for (var i = 1; i <= 130; i += 1) {
    var n = String(i).padStart(3, '0');
    var figure = document.createElement('figure');
    var img = document.createElement('img');
    var caption = document.createElement('figcaption');
    img.src = '/blog/images/llm9-rlhf-grpo/slide-' + n + '.webp';
    img.alt = 'COMS6998E Lecture 9 slide ' + i;
    img.loading = 'lazy';
    img.decoding = 'async';
    caption.textContent = 'Slide ' + i;
    figure.appendChild(img);
    figure.appendChild(caption);
    grid.appendChild(figure);
  }
}());
</script>

<style>
.article-download-button{display:inline-flex;align-items:center;gap:.5rem;padding:.72rem 1rem;border-radius:999px;background:linear-gradient(135deg,#1c6fd1,#6b5dd3);color:#fff!important;text-decoration:none!important;font-weight:700;box-shadow:0 10px 28px rgba(28,111,209,.22)}
.llm9-slide-archive{margin:1.5rem 0;border:1px solid rgba(85,125,175,.3);border-radius:18px;background:rgba(245,250,255,.8);overflow:hidden}
.llm9-slide-archive>summary{cursor:pointer;padding:1rem 1.2rem;font-weight:750;color:#174f83}
.llm9-complete-slide-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;padding:0 1rem 1rem}
.llm9-complete-slide-grid figure{margin:0;padding:.55rem;border-radius:12px;background:#fff;box-shadow:0 6px 20px rgba(34,61,94,.1)}
.llm9-complete-slide-grid img{display:block;width:100%;height:auto;border-radius:8px}
.llm9-complete-slide-grid figcaption{margin-top:.35rem;text-align:center;font-size:.78rem;color:#65758a}
@media(max-width:720px){.llm9-complete-slide-grid{grid-template-columns:1fr}}
[data-theme='dark'] .llm9-slide-archive,.dark .llm9-slide-archive{background:rgba(17,30,48,.86)}
[data-theme='dark'] .llm9-complete-slide-grid figure,.dark .llm9-complete-slide-grid figure{background:#162238}
</style>

### References

- Stiennon et al., [Learning to Summarize with Human Feedback](https://arxiv.org/abs/2009.01325).
- Ouyang et al., [Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155).
- Bai et al., [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073).
- Schulman et al., [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347).
- Shao et al., [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300).
- Hugging Face, [Fine-tuning 20B LLMs with RLHF on a 24GB Consumer GPU](https://huggingface.co/blog/trl-peft).
