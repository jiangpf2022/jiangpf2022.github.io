---
title: Mathematical Modeling 7 - Trade-offs and Uncertainty
date: 2026-09-14 20:00:10
categories: Mathematical Modeling
tags:
  - Multiobjective Optimization
  - Robust Optimization
  - Decision Analysis
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "How to expose competing objectives, construct Pareto solutions, and make plans that remain feasible when inputs are uncertain."
---

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

