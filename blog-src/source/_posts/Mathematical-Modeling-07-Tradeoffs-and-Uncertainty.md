---
title: Mathematical Modeling 7 - Trade-offs and Uncertainty
date: 2026-09-14 20:00:10
categories: Mathematical Modeling
tags:
  - Multiobjective Optimization
  - Robust Optimization
  - Decision Analysis
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "How to expose competing objectives, construct Pareto solutions, and make plans that remain feasible when inputs are uncertain."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **making defensible decisions when objectives conflict and the future is not known exactly**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **A factory values profit, emissions, and employment simultaneously.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

Real decisions rarely have one objective and perfectly known inputs. Profit competes with risk, service with cost, and nominal efficiency with resilience.

## Start with separate objectives

Let $f_1(x),\ldots,f_K(x)$ measure the competing goals. Before combining them, solve each single-objective problem. These anchor solutions reveal scale and conflict: how much service is sacrificed by the cheapest plan, and how much cost is required by the best service plan?

A solution $x$ is Pareto efficient if no feasible alternative improves one objective without worsening another. The Pareto frontier is therefore a map of defensible trade-offs, not a single automatic answer.

## Weighted sums

The common scalarization

$$
\min_x \sum_{k=1}^K w_k\tilde f_k(x),\qquad w_k\ge0,\quad\sum_k w_k=1
$$

requires normalized objectives $\tilde f_k$. Without normalization, units decide the result. Weights encode preferences; they are not empirical facts.

Weighted sums can miss non-convex parts of a Pareto frontier. They are still useful for convex models and for sensitivity sweeps over multiple weight vectors.

## Goal and epsilon-constraint methods

Goal programming penalizes deviations from targets:

$$
\min \sum_k \left(w_k^-d_k^-+w_k^+d_k^+\right),qquad
f_k(x)+d_k^- - d_k^+=g_k.
$$

The $\epsilon$-constraint method optimizes one objective while bounding the others:

$$
\min f_1(x)\quad\text{s.t.}\quad f_k(x)\le\epsilon_k, k=2,\ldots,K.
$$

This is often easier to explain: “minimize cost while keeping failure probability below 2%” is more interpretable than a mysterious cost-risk weight.

## Represent uncertainty explicitly

Distinguish:

- **known parameters:** directly supplied or accurately measured;
- **estimated parameters:** accompanied by sampling error;
- **scenario uncertainty:** a finite set of plausible futures;
- **bounded uncertainty:** values lie in an uncertainty set;
- **stochastic uncertainty:** a probability distribution is credible.

Do not call a parameter “uncertain” and then optimize only at its mean.

## Robust optimization

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/optimization-robust-counterpart.webp" alt="The robust resource-consumption optimization exercise from the course" loading="lazy">
  <figcaption>The course’s robust-optimization exercise. The uncertainty set is not decoration: its geometry determines the protective term that appears in the counterpart.</figcaption>
</figure>

Suppose a linear constraint must hold for every uncertain coefficient $a\in\mathcal U$:

$$
a^Tx\le b\qquad\forall a\in\mathcal U.
$$

The robust counterpart protects feasibility over the chosen uncertainty set. Wider sets increase protection but can make the plan conservative. The uncertainty set must be calibrated from data, engineering bounds, or clearly stated scenarios.

Robustness is not the same as adding an arbitrary safety factor. It specifies exactly which values vary together and which constraints must survive.

## Stochastic and scenario models

When probabilities are meaningful, minimize expected cost plus a risk measure:

$$
\min_x\; \mathbb E[C(x,\xi)]+\lambda\operatorname{Risk}(C(x,\xi)).
$$

For two-stage decisions, $x$ is chosen before the scenario is known and recourse $y_s$ is chosen afterward. Scenario probabilities must not leak future knowledge into the first-stage decision.

## Communicate the decision

Show at least three points: a low-cost extreme, a balanced compromise, and a high-protection extreme. For each, report objective values and binding constraints. Then stress-test all candidates under the same scenarios.

The recommended plan should come with a policy: which parameter is monitored, what threshold triggers reconsideration, and which alternative becomes preferable. A trade-off plot plus a trigger rule is more actionable than one “optimal” number.

## Guided workshop: choose under competing objectives

Suppose a city must choose an electricity portfolio. Technology $i$ has annual cost $c_i$, expected emissions $e_i$, reliable capacity $r_i$, and uncertain output $a_{is}$ in scenario $s$. The decision $x_i$ is installed capacity. Cost, emissions, and reliability cannot be collapsed until their units and trade-offs are understood.

### Build the feasible set first

Write physical and policy constraints before preferences:

$$
0\le x_i\le \bar x_i,
\qquad
\sum_i r_ix_i\ge D^{\text{peak}},
\qquad
\sum_i a_{is}x_i\ge D_s-L_s \quad \forall s.
$$

Here $L_s$ is allowed shortage or recourse. A plan outside this set is not a “less preferred” plan; it is infeasible. Separating feasibility from preference prevents a weighted objective from silently buying violations that should be impossible.

### Construct a Pareto frontier

First minimize cost alone and emissions alone. These anchor solutions reveal scale and conflict. Next use the epsilon-constraint method:

$$
\min_x C(x)
\quad\text{subject to}\quad E(x)\le\varepsilon.
$$

Sweep $\varepsilon$ across a meaningful range. Remove dominated points: solution A dominates B if A is no worse in every objective and strictly better in at least one. A weighted sum can miss non-convex parts of a frontier, while epsilon constraints can expose them.

Select a compromise only after showing the frontier. A knee point is where a small further improvement in one objective requires a large sacrifice in another, but “knee” must be supported by a curvature rule or stakeholder reasoning rather than visual preference alone.

### Model decisions before and after uncertainty

Installed capacity is chosen before scenario $s$ is observed; dispatch and shortage are chosen afterward. This produces a two-stage stochastic program:

$$
\min_x C^{\text{build}}(x)+\sum_s p_sQ(x,s),
$$

where $Q(x,s)$ is the optimal recourse cost in scenario $s$. A perfect-information benchmark allows $x$ to depend on $s$ and is unrealistically optimistic. The difference between perfect-information and here-and-now objectives measures the value of knowing the future.

### Include risk, not only expectation

Two portfolios can have the same expected cost but very different tails. Conditional Value at Risk at level $\alpha$ summarizes the mean loss in the worst $1-\alpha$ fraction of cases. For loss $Z$,

$$
\operatorname{CVaR}_\alpha(Z)=
\min_\eta\left[\eta+\frac{1}{1-\alpha}\mathbb E(Z-\eta)_+\right].
$$

Explain $\eta$ as a loss threshold and $(Z-\eta)_+$ as excess loss. Increasing the CVaR weight purchases protection at an expected-cost premium. Plot both quantities.

### Strategic uncertainty and game theory

Some uncertainty comes from another decision maker rather than nature. If two firms choose prices, or defenders allocate resources against an adaptive attacker, scenarios with fixed probabilities may be inappropriate. A payoff matrix can reveal dominant strategies, best responses, and Nash equilibria. In a zero-sum finite game, mixed strategies solve a linear program. State whose incentives are modeled; “opponent chooses the worst scenario” is a robust model, not automatically a behavioral theory.

### Practice

Create five candidate portfolios and calculate cost, emissions, and worst-scenario shortage. Identify dominated alternatives. Then formulate the continuous portfolio model, generate an epsilon-constraint frontier, and select three representative solutions. For each, report expected cost, CVaR, maximum shortage, active constraints, and the parameter range over which it remains preferable.

## Course example: three goals in production

<div class="mm-gallery">
  <figure>
    <img src="/blog/images/mathematical-modeling/optimization-two-product-data.webp" alt="Resource and profit table for the two-product planning example" loading="lazy">
    <figcaption>The base two-product data: raw-material use, equipment time, profit, and available capacity.</figcaption>
  </figure>
  <figure>
    <img src="/blog/images/mathematical-modeling/optimization-three-goals.webp" alt="Three goals added to the production-planning example" loading="lazy">
    <figcaption>The three soft goals: balance the two products, use equipment fully, and reach at least 560,000 yuan profit.</figcaption>
  </figure>
</div>

| | Product I | Product II | Available |
|---|---:|---:|---:|
| material (kg) | 2 | 1 | 11 |
| machine time (h) | 1 | 2 | 10 |
| profit (10,000 yuan) | 8 | 10 | — |

The feasible set is $2x_1+x_2\le11$, $x_1+2x_2\le10$, $x\ge0$. The course adds three aspirations: keep product I from exceeding II, use the machine fully, and earn at least 560,000 yuan. Turning all three into hard constraints can make the model infeasible, so goal programming introduces deviations:

$$x_1-x_2+d_1^- -d_1^+=0,$$
$$x_1+2x_2+d_2^- -d_2^+=10,$$
$$8x_1+10x_2+d_3^- -d_3^+=56.$$

Penalize $d_1^+$ for excess I, $d_2^-$ for unused equipment, and $d_3^-$ for profit shortfall. Normalize units. With priorities, minimize profit shortfall first, fix it, then improve utilization and balance. This is more transparent than one unexplained weighted sum.

## Pareto and robustness reasoning

A plan dominates another if it is no worse in every objective and better in one. Generate a frontier by maximizing profit while limiting imbalance and requiring utilization across a range of thresholds. Present knee points and the marginal price of fairness.

If material availability is $11+u$, $u\in[-\Gamma,0]$, a simple robust counterpart uses $2x_1+x_2\le11-\Gamma$. More general budgeted sets restrict how many coefficients become adverse together. Calibrate the robustness budget from data. Then compare nominal and robust plans by expected profit, worst loss, violation frequency, and price of robustness.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **making defensible decisions when objectives conflict and the future is not known exactly**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Production with three goals

**Here is the problem.** A factory values profit, emissions, and employment simultaneously. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Normalize objectives, explore a Pareto frontier, and compare weighted, goal, and epsilon-constraint formulations. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The frontier shows the price of improvement and exposes weights that imply unreasonable trade-offs. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Emergency supply

**Here is the problem.** Demand is uncertain and shortages are much more costly than surplus. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Separate first-stage capacity from recourse allocation and compare expected, worst-case, and risk-aware objectives. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The best robust plan buys protection deliberately rather than pretending the forecast is exact. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Reservoir operation

**Here is the problem.** Water must serve cities, farms, and environmental flow across dry and wet scenarios. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Model scenario-dependent releases with common pre-observation decisions and evaluate reliability and regret. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A policy is preferable to one static schedule when information arrives over time. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Model uncertainty

**Here is the problem.** Several plausible parameter distributions fit the available data. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Run decisions across models, inspect rank reversals, and identify assumptions that control the recommendation. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Uncertainty analysis should reveal which new measurement would be most valuable. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: separate objectives

Let us slow down at **separate objectives**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats separate objectives as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: making defensible decisions when objectives conflict and the future is not known exactly. Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use separate objectives to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: normalization

Let us slow down at **normalization**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats normalization as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: making defensible decisions when objectives conflict and the future is not known exactly. Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use normalization to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: Pareto dominance

Let us slow down at **Pareto dominance**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats Pareto dominance as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: making defensible decisions when objectives conflict and the future is not known exactly. Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use Pareto dominance to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: scenario design

Let us slow down at **scenario design**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats scenario design as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: making defensible decisions when objectives conflict and the future is not known exactly. Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use scenario design to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: robust counterpart

Let us slow down at **robust counterpart**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats robust counterpart as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: making defensible decisions when objectives conflict and the future is not known exactly. Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use robust counterpart to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: decision communication

Let us slow down at **decision communication**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats decision communication as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: making defensible decisions when objectives conflict and the future is not known exactly. Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use decision communication to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Production with three goals

Let us revisit **Production with three goals**, but this time you are doing the talking. The situation is still this: A factory values profit, emissions, and employment simultaneously. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Normalize objectives, explore a Pareto frontier, and compare weighted, goal, and epsilon-constraint formulations. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The frontier shows the price of improvement and exposes weights that imply unreasonable trade-offs. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Production with three goals in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Emergency supply

Let us revisit **Emergency supply**, but this time you are doing the talking. The situation is still this: Demand is uncertain and shortages are much more costly than surplus. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Separate first-stage capacity from recourse allocation and compare expected, worst-case, and risk-aware objectives. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The best robust plan buys protection deliberately rather than pretending the forecast is exact. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Emergency supply in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Reservoir operation

Let us revisit **Reservoir operation**, but this time you are doing the talking. The situation is still this: Water must serve cities, farms, and environmental flow across dry and wet scenarios. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Model scenario-dependent releases with common pre-observation decisions and evaluate reliability and regret. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A policy is preferable to one static schedule when information arrives over time. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Reservoir operation in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Model uncertainty

Let us revisit **Model uncertainty**, but this time you are doing the talking. The situation is still this: Several plausible parameter distributions fit the available data. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Run decisions across models, inspect rank reversals, and identify assumptions that control the recommendation. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Uncertainty analysis should reveal which new measurement would be most valuable. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Model uncertainty in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect separate objectives to normalization

Draw two boxes labeled **separate objectives** and **normalization**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from separate objectives to normalization; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind making defensible decisions when objectives conflict and the future is not known exactly to remain auditable.

### Board exercise 2: connect normalization to Pareto dominance

Draw two boxes labeled **normalization** and **Pareto dominance**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from normalization to Pareto dominance; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind making defensible decisions when objectives conflict and the future is not known exactly to remain auditable.

### Board exercise 3: connect Pareto dominance to scenario design

Draw two boxes labeled **Pareto dominance** and **scenario design**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from Pareto dominance to scenario design; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind making defensible decisions when objectives conflict and the future is not known exactly to remain auditable.

### Board exercise 4: connect scenario design to robust counterpart

Draw two boxes labeled **scenario design** and **robust counterpart**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from scenario design to robust counterpart; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind making defensible decisions when objectives conflict and the future is not known exactly to remain auditable.

### Board exercise 5: connect robust counterpart to decision communication

Draw two boxes labeled **robust counterpart** and **decision communication**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from robust counterpart to decision communication; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind making defensible decisions when objectives conflict and the future is not known exactly to remain auditable.

### Board exercise 6: connect decision communication to separate objectives

Draw two boxes labeled **decision communication** and **separate objectives**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from decision communication to separate objectives; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind making defensible decisions when objectives conflict and the future is not known exactly to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a decision memo with the Pareto frontier, at least three representative policies, scenario performance, sensitivity to weights, and a recommendation tied to explicit preferences. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute trade-off lab

Plot the feasible polygon, solve profit-only production, construct deviations for all three goals, and generate eight Pareto points. Simulate uncertain material supply and compare nominal, expected-value, and robust decisions. Finish with a recommendation that states which stakeholder preference makes each plan appropriate.
