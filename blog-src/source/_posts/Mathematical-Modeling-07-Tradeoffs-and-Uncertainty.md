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

## Forty-minute trade-off lab

Plot the feasible polygon, solve profit-only production, construct deviations for all three goals, and generate eight Pareto points. Simulate uncertain material supply and compare nominal, expected-value, and robust decisions. Finish with a recommendation that states which stakeholder preference makes each plan appropriate.
