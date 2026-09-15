---
title: Mathematical Modeling 5 - Results and Validation
date: 2026-09-14 20:00:12
categories: Mathematical Modeling
tags:
  - Validation
  - Sensitivity Analysis
  - Technical Writing
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
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

## Guided workshop: validation as an experiment

Suppose a model predicts daily bicycle demand and an optimization model uses those predictions to reposition bicycles overnight. A low forecast error does not automatically imply a useful repositioning policy. Validation must follow the complete chain from prediction to decision.

### Establish three baselines

Use a seasonal-naive demand forecast, a do-nothing repositioning policy, and a simple rule that moves bicycles toward stations with yesterday's shortage. The proposed pipeline must be compared with all three. This separates the contribution of forecasting from the contribution of optimization.

Evaluate on days not used to fit preprocessing, features, parameters, or hyperparameters. For temporal data, use rolling origins. Report MAE for demand, shortage trips for operations, and cost or driving distance for implementation. A forecast can improve MAE while worsening shortage if its errors occur at strategically important stations.

### Verify before validating

Construct a two-station problem that can be solved by hand. Check inventory conservation:

$$
I_{i,t+1}=I_{i,t}+\text{returns}_{it}-\text{rentals}_{it}
+\text{moved-in}_{it}-\text{moved-out}_{it}.
$$

Sum over stations. Internal repositioning should cancel. If total inventory changes without loss or repair, the implementation is wrong regardless of its attractive plots.

### Propagate uncertainty with Monte Carlo simulation

Fit or justify distributions for demand residuals, travel time, and unavailable bicycles. For replication $r$:

1. draw one coherent scenario $\xi^{(r)}$;
2. run the fixed policy without retuning it using future information;
3. record shortage, operating cost, and service rate;
4. repeat with controlled random seeds.

Estimate $\hat\mu=N^{-1}\sum_r Y_r$ and its Monte Carlo standard error $s/\sqrt N$. More simulations reduce numerical uncertainty in the estimate; they do not repair an incorrect scenario distribution. Plot the running mean and interval against $N$ to justify the simulation budget.

Preserve correlation. Drawing station demands independently may eliminate city-wide peaks. Use residual blocks, copulas, multivariate models, or common scenario multipliers when dependence matters.

### Design stress tests, not only random tests

Random scenarios represent frequent uncertainty; stress scenarios examine consequential boundaries. Test a transit disruption, major event, heavy rain, and simultaneous vehicle failure. Report the threshold at which the recommendation changes. “The model works in 95% of sampled days” is incomplete unless the other 5% are understood.

### Present a validation matrix

For each claim, list evidence and acceptance rule:

| Claim | Evidence | Example acceptance rule |
|---|---|---|
| forecasts are useful | rolling holdout vs seasonal naive | lower MAE in at least 8 of 10 folds |
| solution is feasible | independent constraint audit | maximum violation $<10^{-7}$ |
| decision improves service | paired scenario comparison | lower shortage in at least 80% of scenarios |
| conclusion is stable | sensitivity and stress tests | selected policy unchanged over stated range |

Define rules before examining the final results when possible. Otherwise it is easy to move the goalposts.

### Practice

Write one sentence that your model is intended to support. Decompose it into implementation, mechanism, empirical, comparative, and decision evidence. For each, specify a dataset or synthetic test, a metric, a baseline, and a failure threshold. This document becomes the validation plan and later the structure of the results section.
