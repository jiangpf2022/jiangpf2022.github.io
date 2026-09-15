---
title: Mathematical Modeling 17 - Evaluation Models
date: 2026-09-14 19:59:02
categories: Mathematical Modeling
tags:
  - AHP
  - Entropy Weight
  - TOPSIS
  - CRITIC
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A complete beginner workflow for indicator design, AHP, entropy and CRITIC weights, TOPSIS ranking, interpretation, and robustness."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **building a transparent multi-indicator evaluation instead of hiding judgments inside one final score**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Rank cities using environmental, economic, and public-service indicators.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Rankings look objective even when normalization, weighting, and aggregation choices determine the order. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

An evaluation model converts several indicators into a ranking, score, or tier. Because every preprocessing and weighting choice can change the result, the goal is transparency and robustness—not artificial precision.

## Define the evaluation question

Specify objects, decision maker, time period, and meaning of “better.” A city can be better for affordability, environmental quality, business growth, or overall livability; these are different models.

Build a hierarchy from goal to dimensions to measurable indicators. Indicators should be relevant, available, comparable, interpretable, and not excessively redundant. Record whether each is benefit, cost, target, or interval type.

## Make indicators comparable

For a benefit indicator, min–max normalization is

$$
z_{ij}=\frac{x_{ij}-\min_i x_{ij}}{\max_i x_{ij}-\min_i x_{ij}}.
$$

For a cost indicator, reverse the numerator. For a target value $a$, define a score that decreases with $|x-a|$ using a meaningful tolerance. Treating a target indicator as “larger is better” changes the decision problem.

Check sensitivity to extreme values and alternative scaling. State whether weights apply to raw indicators or normalized scores.

## AHP: subjective weights made explicit

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/evaluation-ahp-hierarchy.svg" alt="AHP hierarchy from goal to criteria, weights, and alternatives" loading="lazy">
  <figcaption>AHP is useful when it exposes where judgments enter and checks whether pairwise comparisons are reasonably consistent.</figcaption>
</figure>

Analytic hierarchy process asks experts to compare criteria in pairs. Matrix $A=(a_{ij})$ satisfies $a_{ji}=1/a_{ij}$ and $a_{ii}=1$. The principal eigenvector, normalized to sum to one, estimates weights.

Perfect consistency would satisfy $a_{ik}=a_{ij}a_{jk}$. Measure inconsistency by

$$
CI=\frac{\lambda_{\max}-n}{n-1},\qquad CR=\frac{CI}{RI}.
$$

If $CR$ is too large, revisit judgments instead of merely adjusting numbers until the test passes. Report who supplied comparisons and how disagreements were aggregated.

## Entropy weights

Entropy weighting rewards indicators that vary more across objects. Given nonnegative normalized values, form proportions

$$
p_{ij}=\frac{z_{ij}}{\sum_i z_{ij}}.
$$

Then

$$
e_j=-\frac{1}{\ln m}\sum_i p_{ij}\ln p_{ij},\qquad
d_j=1-e_j,qquad w_j=\frac{d_j}{\sum_kd_k}.
$$

Use the convention $0\ln0=0$. An almost constant indicator receives little weight. But a noisy indicator can vary greatly and receive too much weight, so data quality still matters.

## CRITIC weights

CRITIC combines contrast and conflict. One common information measure is

$$
C_j=s_j\sum_k(1-r_{jk}),\qquad w_j=\frac{C_j}{\sum_kC_k},
$$

where $s_j$ is standard deviation and $r_{jk}$ is correlation. A variable gains weight when it differentiates objects and provides information not repeated by other indicators.

## TOPSIS ranking

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/evaluation-topsis.svg" alt="Alternatives located between positive and negative TOPSIS ideals" loading="lazy">
  <figcaption>TOPSIS rewards closeness to the positive ideal and distance from the negative ideal after direction, scale, and weights are established.</figcaption>
</figure>

Let $v_{ij}=w_jz_{ij}$. Define ideal points $v_j^+=\max_i v_{ij}$ and $v_j^-=\min_i v_{ij}$. Distances are

$$
D_i^+=\sqrt{\sum_j(v_{ij}-v_j^+)^2},\qquad
D_i^-=\sqrt{\sum_j(v_{ij}-v_j^-)^2}.
$$

The closeness score is

$$
C_i=\frac{D_i^-}{D_i^++D_i^-}.
$$

Larger $C_i$ indicates closeness to the positive ideal. TOPSIS is easy to compute but depends on normalization, distance metric, weights, and the set of alternatives.

## Combining subjective and objective evidence

AHP captures priorities; entropy or CRITIC captures data structure. Combine them only with a stated rule, such as $w=\alpha w^{AHP}+(1-\alpha)w^{data}$, and test several $\alpha$ values. The combination does not remove subjectivity—it exposes where it enters.

## Robustness and interpretation

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/evaluation-rank-sensitivity.svg" alt="Alternative scores crossing as evaluation weights change" loading="lazy">
  <figcaption>Crossing score lines show that the preferred alternative depends on stakeholder weights; report that dependence instead of hiding it.</figcaption>
</figure>

Recompute results under:

- different normalization methods;
- alternative weight systems;
- $\pm5\%$ or $\pm10\%$ weight perturbations;
- leave-one-indicator-out analysis;
- bootstrap samples;
- plausible missing-data choices.

If neighboring scores overlap across analyses, report tiers rather than a fragile exact order. Decompose each object's score by dimension so the recommendation explains strengths and weaknesses.

### Worked pattern

For a bridge, tunnel, and ferry decision, define benefit, construction cost, operating cost, capacity, environmental impact, and disruption. Use AHP for stakeholder priorities, data-driven weights as a comparison, TOPSIS for a transparent ranking, and scenario analysis for demand and cost uncertainty. The final result is a conditional recommendation with thresholds—not simply “alternative A ranks first.”

A transparent TOPSIS implementation can remain short:

```python
import numpy as np

# Z must already be oriented so larger means better.
V = Z / np.sqrt((Z ** 2).sum(axis=0))
V = V * weights
positive, negative = V.max(axis=0), V.min(axis=0)
d_pos = np.sqrt(((V - positive) ** 2).sum(axis=1))
d_neg = np.sqrt(((V - negative) ** 2).sum(axis=1))
score = d_neg / (d_pos + d_neg)
ranking = np.argsort(-score)
```

Keep the oriented matrix, weights, ideal points, distances, and final scores in the supporting material so the ranking can be audited.

## Guided workshop: create an evaluation system responsibly

Suppose five neighborhoods are prioritized for resilience investment using exposure, vulnerability, infrastructure condition, emergency access, project cost, and population served. A ranking is not discovered automatically by TOPSIS; it is constructed from a value model. The indicator hierarchy and direction are therefore as important as the final formula.

### Define the decision and stakeholders

State whether the output is a complete ranking, funding tiers, or identification of unacceptable risk. Identify who supplies preferences and who bears consequences. An indicator may be measurable but irrelevant, or relevant but double-counted through several correlated proxies.

Build a hierarchy whose branches correspond to distinct concepts. Check coverage, non-redundancy, direction, and data quality. Document benefit indicators, cost indicators, interval-preferred indicators, and thresholds. For a cost indicator $x$, a simple orientation is $z=(x_{\max}-x)/(x_{\max}-x_{\min})$, but this makes relative position depend on the candidate set. A policy threshold may deserve a piecewise value function instead.

### Use AHP with consistency

Pairwise judgments form matrix $A$ with $a_{ij}=1/a_{ji}$. Derive weights from the principal eigenvector or geometric means. The consistency ratio compares observed inconsistency with a random benchmark. A high ratio requires revisiting judgments, not mechanically editing numbers until the test passes. Show the pairwise matrix so priorities are auditable.

### Understand objective weights

Entropy weights increase when an indicator differentiates alternatives; CRITIC combines variability with low correlation. Neither measures ethical or policy importance. A wildly noisy indicator may receive high objective weight. Screen reliability before weighting, and compare subjective and data-driven schemes rather than pretending one is neutral.

### Compare aggregation models

Weighted sums allow full compensation: a very poor score on one criterion can be offset by others. TOPSIS rewards closeness to an ideal and distance from an anti-ideal but depends on normalization and distance. Grey relational analysis compares geometric similarity of sequences. Fuzzy evaluation represents graded membership when boundaries are linguistic. Data Envelopment Analysis compares relative efficiency of units using multiple inputs and outputs, but flexible weights and sensitivity to outliers require care.

Choose a model based on the meaning of preference, not popularity. If a safety threshold cannot be compensated by low cost, impose it as a constraint before ranking feasible alternatives.

### Analyze rank robustness

Sample weights from plausible ranges, repeat normalization choices, bootstrap data, and record rank acceptability: the fraction of runs in which each candidate occupies each rank. Plot score contribution by criterion and identify pairwise reversal thresholds. If first and second exchange under tiny perturbations, report a tied priority tier.

### Practice

Build the neighborhood hierarchy and data dictionary. Produce AHP, entropy, and CRITIC weights; combine them under several $\alpha$ values; compare weighted sum and TOPSIS; and run 10,000 plausible weight perturbations. Report rank acceptability and the exact assumptions needed for the leading recommendation. Add one non-compensable safety threshold and explain its effect.

## Evaluation models as a transparent pipeline

Begin with decision object, stakeholder, and use of the ranking. Build an indicator hierarchy without duplicate proxies. Specify source, unit, direction, target interval, missing rule, and whether compensation is permitted. A catastrophic safety criterion should be a threshold, not something that excellent aesthetics can cancel.

### Weighting formulas

AHP constructs pairwise matrix $A$, extracts priority vector $w$, and checks

$$CI=\frac{\lambda_{\max}-n}{n-1},\qquad CR=CI/RI.$$

An unacceptable $CR$ requires revisiting judgments, not merely normalizing them. Entropy weighting gives more weight to indicators with greater cross-candidate information, while CRITIC combines standard deviation with low correlation:

$$C_j=\sigma_j\sum_k(1-r_{jk}),\qquad w_j=C_j/\sum_kC_k.$$

Large variation may reflect noise, so objective weight is not synonymous with importance. PCA weights maximize explained variance, again a statistical property rather than stakeholder value.

### TOPSIS and alternatives

After direction and scale normalization, weighted vector $v_{ij}=w_jz_{ij}$ is compared with ideal and anti-ideal points:

$$D_i^+=\sqrt{\sum_j(v_{ij}-v_j^+)^2},\quad D_i^-=\sqrt{\sum_j(v_{ij}-v_j^-)^2},\quad C_i=\frac{D_i^-}{D_i^++D_i^-}.$$

Weighted sums measure compensatory utility; TOPSIS measures relative closeness; outranking methods can represent vetoes. Choose according to decision semantics, then test whether the winner depends on normalization, weights, aggregation, or candidate set.

## Three course-style cases

For city livability, combine infrastructure, environment, affordability, and accessibility but keep pollution or safety vetoes. For enterprise risk, combine financial ratios, governance, market exposure, and supply resilience; validate ranks against future distress. For ecological quality, integrate biodiversity, fragmentation, water, and human pressure while preserving spatial scale. In every case, translate the score back into actionable strengths and weaknesses.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **building a transparent multi-indicator evaluation instead of hiding judgments inside one final score**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Rankings look objective even when normalization, weighting, and aggregation choices determine the order.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: City sustainability

**Here is the problem.** Rank cities using environmental, economic, and public-service indicators. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Define direction and scale, compare AHP, entropy, and CRITIC weights, then test TOPSIS rank stability. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The final recommendation should include trade-off profiles, not only ordinal positions. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Supplier selection

**Here is the problem.** Choose a supplier using cost, reliability, quality, and carbon performance. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Separate hard eligibility from scored preferences and invite stakeholders to inspect weight implications. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A cheap supplier should not compensate for violating a non-negotiable safety threshold. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Enterprise health

**Here is the problem.** Evaluate firms when indicators are correlated and measured in different units. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Audit redundancy, compare objective weighting with PCA, and test sensitivity to normalization. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Objective weights describe variation in the dataset, not moral or strategic importance. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Ecological quality

**Here is the problem.** Combine water, habitat, biodiversity, and disturbance measures. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use scientifically justified thresholds and compare compensatory with non-compensatory aggregation. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A weighted average can hide a catastrophic value in one essential dimension. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: decision definition

Let us slow down at **decision definition**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats decision definition as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: building a transparent multi-indicator evaluation instead of hiding judgments inside one final score. Rankings look objective even when normalization, weighting, and aggregation choices determine the order. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use decision definition to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: indicator direction

Let us slow down at **indicator direction**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats indicator direction as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: building a transparent multi-indicator evaluation instead of hiding judgments inside one final score. Rankings look objective even when normalization, weighting, and aggregation choices determine the order. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use indicator direction to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: normalization

Let us slow down at **normalization**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats normalization as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: building a transparent multi-indicator evaluation instead of hiding judgments inside one final score. Rankings look objective even when normalization, weighting, and aggregation choices determine the order. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use normalization to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: weight elicitation

Let us slow down at **weight elicitation**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats weight elicitation as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: building a transparent multi-indicator evaluation instead of hiding judgments inside one final score. Rankings look objective even when normalization, weighting, and aggregation choices determine the order. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use weight elicitation to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: aggregation

Let us slow down at **aggregation**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats aggregation as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: building a transparent multi-indicator evaluation instead of hiding judgments inside one final score. Rankings look objective even when normalization, weighting, and aggregation choices determine the order. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use aggregation to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: rank robustness

Let us slow down at **rank robustness**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats rank robustness as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: building a transparent multi-indicator evaluation instead of hiding judgments inside one final score. Rankings look objective even when normalization, weighting, and aggregation choices determine the order. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use rank robustness to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back City sustainability

Let us revisit **City sustainability**, but this time you are doing the talking. The situation is still this: Rank cities using environmental, economic, and public-service indicators. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Define direction and scale, compare AHP, entropy, and CRITIC weights, then test TOPSIS rank stability. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The final recommendation should include trade-off profiles, not only ordinal positions. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain City sustainability in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Supplier selection

Let us revisit **Supplier selection**, but this time you are doing the talking. The situation is still this: Choose a supplier using cost, reliability, quality, and carbon performance. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Separate hard eligibility from scored preferences and invite stakeholders to inspect weight implications. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A cheap supplier should not compensate for violating a non-negotiable safety threshold. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Supplier selection in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Enterprise health

Let us revisit **Enterprise health**, but this time you are doing the talking. The situation is still this: Evaluate firms when indicators are correlated and measured in different units. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Audit redundancy, compare objective weighting with PCA, and test sensitivity to normalization. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Objective weights describe variation in the dataset, not moral or strategic importance. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Enterprise health in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Ecological quality

Let us revisit **Ecological quality**, but this time you are doing the talking. The situation is still this: Combine water, habitat, biodiversity, and disturbance measures. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use scientifically justified thresholds and compare compensatory with non-compensatory aggregation. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A weighted average can hide a catastrophic value in one essential dimension. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Ecological quality in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect decision definition to indicator direction

Draw two boxes labeled **decision definition** and **indicator direction**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from decision definition to indicator direction; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind building a transparent multi-indicator evaluation instead of hiding judgments inside one final score to remain auditable.

### Board exercise 2: connect indicator direction to normalization

Draw two boxes labeled **indicator direction** and **normalization**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from indicator direction to normalization; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind building a transparent multi-indicator evaluation instead of hiding judgments inside one final score to remain auditable.

### Board exercise 3: connect normalization to weight elicitation

Draw two boxes labeled **normalization** and **weight elicitation**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from normalization to weight elicitation; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind building a transparent multi-indicator evaluation instead of hiding judgments inside one final score to remain auditable.

### Board exercise 4: connect weight elicitation to aggregation

Draw two boxes labeled **weight elicitation** and **aggregation**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from weight elicitation to aggregation; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind building a transparent multi-indicator evaluation instead of hiding judgments inside one final score to remain auditable.

### Board exercise 5: connect aggregation to rank robustness

Draw two boxes labeled **aggregation** and **rank robustness**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from aggregation to rank robustness; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind building a transparent multi-indicator evaluation instead of hiding judgments inside one final score to remain auditable.

### Board exercise 6: connect rank robustness to decision definition

Draw two boxes labeled **rank robustness** and **decision definition**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from rank robustness to decision definition; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind building a transparent multi-indicator evaluation instead of hiding judgments inside one final score to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is an evaluation dashboard showing raw indicators, transformations, alternative weights, alternative aggregation rules, rank intervals, and the conditions under which the recommendation changes. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute evaluation lab

Construct the hierarchy and data dictionary, compute AHP/entropy/CRITIC weights, compare weighted sum and TOPSIS, and sample 10,000 plausible weight vectors. Plot rank acceptability and the 50% warning line for fragile candidates. End with the exact assumptions under which the leading recommendation holds.
