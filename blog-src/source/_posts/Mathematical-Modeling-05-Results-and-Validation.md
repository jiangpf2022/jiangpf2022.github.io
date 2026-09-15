---
title: Mathematical Modeling 5 - Results and Validation
date: 2026-09-14 20:00:12
categories: Mathematical Modeling
tags:
  - Validation
  - Sensitivity Analysis
  - Technical Writing
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "A practical framework for reporting results, testing models, analyzing sensitivity, and writing conclusions that follow from evidence."
---

A solver returning `success=True` proves only that the solver stopped under its criteria. It does not prove that the model represents reality, the data pipeline is correct, or the recommendation is stable.

## Report results at three levels

Separate outputs into:

1. **mathematical:** parameter estimates, objective values, residuals, convergence;
2. **domain:** quantities with units, feasible schedules, predicted cases, ranked alternatives;
3. **decision:** what should be done, when, and under which conditions.

Every table and figure should be discussed. Do not repeat all values in prose; identify the dominant pattern, anomaly, or trade-off.

## Verification before validation

Verification asks whether the implementation matches the intended mathematics. Use:

- unit tests on small known cases;
- independent recomputation of constraints and objective values;
- dimension and unit checks;
- conservation residuals;
- extreme cases where behavior is obvious;
- repeated runs for stochastic algorithms.

For an optimization solution $x^*$, explicitly compute constraint violation:

$$
v=\max\left\{\max_i(Ax^*-b)_i,\ \max_j|A_{eq}x^*-b_{eq}|_j,\ 0\right\}.
$$

Feasibility tolerance should be stated, not assumed.

## Validate against evidence

Choose tests appropriate to the task:

- regression: residual structure and out-of-sample error;
- forecasting: rolling-origin evaluation and prediction interval coverage;
- classification: confusion matrix and threshold-sensitive metrics;
- clustering: stability and domain interpretability;
- simulation: calibration and distributional comparison;
- optimization: baselines, bounds, and realized scenario performance.

Data leakage is especially dangerous. A scaler, feature selector, or imputer fitted using test data makes the evaluation optimistic.

## Sensitivity is a decision map

One-at-a-time sensitivity varies parameter $\theta_i$ while holding others fixed. A normalized local measure is

$$
S_i=\frac{\Delta y/y}{\Delta\theta_i/\theta_i}.
$$

For nonlinear or interacting models, use scenario grids, Monte Carlo sampling, or global methods. Report when the recommended decision changes, not only how an intermediate output changes.

Uncertainty analysis asks “what outputs follow from uncertain inputs?” Sensitivity analysis asks “which uncertain inputs matter most?” They answer different questions and are strongest together.

## Compare models fairly

Use the same train/test split, objective definition, constraints, and evaluation metric. Include a simple baseline. A complex model that improves training fit but not held-out performance should not be presented as progress.

When multiple criteria matter, show the trade-off rather than hiding it in one weighted score. A Pareto frontier often communicates more than declaring one arbitrary weight vector optimal.

## Write limitations precisely

Useful limitations identify a mechanism and consequence:

> The demand model assumes the historical weekly cycle persists; a structural schedule change would bias the forecast and could make the staffing plan infeasible.

“The model is somewhat idealized” says nothing. Follow each important limitation with a monitoring rule, mitigation, or extension.

## Reproducibility package

The final supporting material should include source code, a data dictionary, preprocessing rules, random seeds, environment information, and a one-command execution path. Keep exploratory notebooks, but extract the final pipeline so that outputs can be regenerated from raw data.

The conclusion should contain no new method. It should answer the original questions, state the strongest quantitative evidence, describe the valid operating range, and end with the decision—not with a generic claim that the model is useful.

