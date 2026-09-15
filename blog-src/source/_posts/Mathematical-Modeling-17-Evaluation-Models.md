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
