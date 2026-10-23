---
title: 6 - Multi-Objective & Robust Optimization
date: 2026-09-15 18:00:16
permalink: 2026/09/15/Mathematical-Modeling-06-Multi-Objective-and-Robust-Optimization/
categories: Mathematical Modeling
tags:
  - Multi-Objective Optimization
  - Robust Optimization
  - Decision Analysis
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 160
lesson_number: 6
lesson_level: 1
review_lock: false
excerpt: "Construct Pareto frontiers, expose stakeholder trade-offs, and derive decisions that remain feasible under uncertain inputs."
---

Today begins with a disagreement. One teammate wants the cheapest plan, another wants the safest plan, and the client insists that service quality cannot fall. Nobody is necessarily wrong. The modeling mistake would be to hide that disagreement inside one unexplained score.

This blog develops two related ideas. **Multi-objective optimization** makes conflicting goals visible instead of pretending they are one. **Robust optimization** asks whether a chosen decision survives reasonable errors in the data. Our real competition case comes from 2024 MCM Problem A, where Outstanding papers modeled how environmentally responsive sex ratios alter sea-lamprey populations and surrounding ecosystems. It is a natural multi-objective problem: suppress an invasive population, preserve ecosystem stability, and avoid an intervention so aggressive that it creates a new failure.

<div class="mm-key-box"><span class="mm-callout-label">Two promises, two tests</span><p>A multi-objective model promises that the trade-off has been exposed. A robust model promises that feasibility or performance survives a declared uncertainty set. Neither promise is fulfilled by adding the words “comprehensive” or “robust” to a weighted score.</p></div>

## 1. Why One Objective Is Often Dishonest

Suppose a city chooses bus frequency $x$. Annual cost $C(x)$ decreases when buses are removed, passenger waiting $W(x)$ decreases when buses are added, and emissions $E(x)$ depend on both fleet use and congestion. There is no physically meaningful unit in which dollars, minutes, and tonnes can simply be added.

Write the vector objective

$$\min_{x\in X}F(x)=\big(C(x),W(x),E(x)\big).$$

$X$ contains hard rules such as fleet size, driver hours, and minimum coverage. The optimizer no longer returns “the” smallest vector because vectors are only partially ordered. A plan can be cheaper but slower. The result we need is a set of efficient compromises, followed by a transparent decision rule.

Separate hard constraints from soft objectives. If every district must receive at least one bus per hour, that is usually a constraint, not another weighted preference. Turning a legal or safety minimum into a small penalty permits the optimizer to violate it whenever another term pays enough.

## 2. Pareto Dominance and the Efficient Frontier

For minimization, decision $x$ dominates $y$ if

$$f_i(x)\le f_i(y)\quad\forall i,$$

and at least one inequality is strict. A feasible point is Pareto efficient if no other feasible point dominates it.

Consider four plans with (cost, average wait):

$$A=(10,14),\quad B=(12,9),\quad C=(15,7),\quad D=(14,12).$$

$B$ dominates $D$: it is cheaper and faster. None of $A,B,C$ dominates another, so they form the discrete Pareto set. Removing $D$ is a mathematical conclusion; choosing among $A,B,C$ is a value judgment.

For a smooth continuous frontier $w=h(c)$, the slope $-h'(c)$ is the local exchange rate: how many minutes of waiting can be reduced by accepting one more unit of cost. A “knee” is a region where small improvement in one objective suddenly requires a large sacrifice in another. Knee points are useful candidates, not automatic answers.

<div class="mm-question-box"><span class="mm-callout-label">Stop and compare</span><p>If Plan P costs 2% more than Plan Q but cuts worst-district waiting by 30%, which plan is better? You cannot answer until you know whether equity is a hard requirement, whose waiting is measured, and how much budget flexibility exists. Write those missing facts before choosing weights.</p></div>

## 3. Weighted Sums and Their Limits

Normalize objectives before weighting. A common formulation is

$$\min_{x\in X}\sum_{i=1}^m w_i\frac{f_i(x)-f_i^{\min}}{f_i^{\max}-f_i^{\min}},
\qquad w_i\ge0,\ \sum_iw_i=1.$$

Without normalization, the objective with the largest numerical scale controls the result. Weights then express relative importance on the chosen normalized ranges; they are not discovered by the solver.

For convex feasible objective sets, varying positive weights can recover supported Pareto points. For a nonconvex frontier, some efficient points lie in concave regions and cannot minimize any weighted sum. This is why a sweep over weights is not always a complete frontier.

Weights should be tested, not merely announced. Draw a weight simplex or vary one weight across a grid. Record when the chosen plan changes. If $w_C=0.49$ selects one plan and $w_C=0.51$ selects a completely different one, report the decision boundary instead of presenting one set of weights as objective truth.

## 4. Epsilon Constraints, Goal Programming, and Minimax Regret

The epsilon-constraint method selects one primary objective and turns the rest into bounds:

$$\min_x f_1(x)\quad\text{s.t.}\quad x\in X,\ f_j(x)\le\varepsilon_j, j=2,\ldots,m.$$

Sweeping $\varepsilon_j$ can recover non-supported efficient points. It also matches stakeholder language: “minimize cost while keeping average wait below eight minutes and emissions below the current level.”

Goal programming introduces positive and negative deviations from targets $g_i$:

$$f_i(x)+d_i^- -d_i^+=g_i,\qquad d_i^\pm\ge0.$$

The objective penalizes only the deviations that matter. For a maximum emissions cap, $d_i^+$ is undesirable while performing better than the cap need not be rewarded. Lexicographic goal programming optimizes priority levels sequentially so a tiny improvement in a lower-priority goal cannot purchase a large violation of a higher-priority one.

Under scenarios $s$, regret compares a decision with the scenario-specific best:

$$R_s(x)=f_s(x)-\min_{y\in X}f_s(y).$$

Minimax regret solves $\min_x\max_sR_s(x)$. It does not seek the best average outcome; it seeks the decision whose worst hindsight disappointment is smallest.

## 5. What Exactly Is Uncertain?

Do not use “uncertainty” as one undifferentiated word. At least four forms matter:

- **measurement error:** observed input differs from the true quantity;
- **parameter uncertainty:** a fitted coefficient is estimated from finite data;
- **process variability:** arrivals, weather, or demand genuinely vary;
- **structural uncertainty:** the equations omit a mechanism or use the wrong causal form.

Robust optimization handles declared parameter sets well. It cannot repair a missing mechanism. If the bus model ignores passengers abandoning long queues, widening a demand interval does not correct the structure.

An interval $a_i\in[\bar a_i-\rho_i,\bar a_i+\rho_i]$ creates a box uncertainty set. An ellipsoid $a=\bar a+Pu$, $\|u\|_2\le\rho$, captures correlated directions. A finite scenario set is appropriate when the uncertainty is naturally described by named futures. The set must be large enough to include plausible errors but not so large that it represents physically impossible combinations.

## 6. Deriving Robust Counterparts

Consider uncertain resource usage

$$a^Tx\le b\quad\forall a\in\mathcal U.$$

For a box $a_i\in[\bar a_i-\rho_i,\bar a_i+\rho_i]$ and $x\ge0$, the worst case independently raises every coefficient:

$$\sum_i(\bar a_i+\rho_i)x_i\le b.$$

For signed $x$, introduce $t_i\ge|x_i|$ through $-t_i\le x_i\le t_i$, giving

$$\bar a^Tx+\sum_i\rho_i t_i\le b.$$

The robust counterpart remains linear.

For ellipsoidal uncertainty $a=\bar a+Pu$, $\|u\|_2\le\rho$,

$$\max_{\|u\|\le\rho}(\bar a+Pu)^Tx
=\bar a^Tx+\rho\|P^Tx\|_2.$$

So the robust constraint is

$$\bar a^Tx+\rho\|P^Tx\|_2\le b,$$

an SOCP. The price of protection is visible: larger $\rho$ shrinks the feasible set.

Budgeted uncertainty avoids assuming every coefficient reaches its worst value simultaneously. With normalized deviations $z_i\in[0,1]$ and $\sum_i z_i\le\Gamma$, the parameter $\Gamma$ controls how many coefficients may be adverse together. Plot objective value and constraint violations across $\Gamma$ rather than hiding the protection choice.

## 7. Robust Is Not the Same as Stochastic

Stochastic optimization requires probability distributions and optimizes expectations, chance constraints, or risk measures. Robust optimization requires an uncertainty set and protects against every member. Distributionally robust optimization protects against every distribution in an ambiguity set.

A chance constraint

$$\Pr(a(\xi)^Tx\le b)\ge1-\epsilon$$

permits violation with probability at most $\epsilon$. It can be less conservative than worst-case robustness, but only if the probabilistic model is credible. Scenario testing after optimization is not the same as embedding the probability statement in the optimization.

Use robustness when feasibility failure is costly and only ranges are defensible. Use stochastic models when repeated outcomes and probability estimates are meaningful. Use both when appropriate: optimize expected service while robustly protecting a safety constraint.

## 8. Outstanding-Paper Case: 2024 MCM Lamprey Ecology

The 2024 MCM Problem A concerns a population whose larval sex ratio can respond to food availability. Outstanding papers in COMAP's results archive analyze stage dynamics and ecological effects. Recast the decision as an intervention intensity $u_t$ over time. A simplified state model is

$$x_{t+1}=F(x_t,u_t,\theta),$$

where $x_t$ contains lamprey stages and ecosystem indicators, and $\theta$ contains survival, fecundity, food response, and interaction coefficients.

A policy may minimize three outcomes:

$$
J_1=\sum_t N_t^{\text{lamprey}},\qquad
J_2=\sum_t u_t^2,\qquad
J_3=\sum_t\|e_t-e^{\text{target}}\|_2^2.
$$

$J_1$ rewards control, $J_2$ limits intervention burden, and $J_3$ protects ecosystem balance. Instead of selecting weights immediately, generate a frontier between control and ecological deviation while imposing an intervention budget as a hard constraint.

Food-response uncertainty matters. Let the female-share response be

$$s(R;k,R_0)=s_{\min}+\frac{s_{\max}-s_{\min}}{1+e^{-k(R-R_0)}}.$$

The slope $k$ and midpoint $R_0$ may be poorly known. Define plausible ranges or a jointly plausible ellipse, then require population safety thresholds for all selected parameter scenarios. A nominal policy may exploit a precise response threshold that disappears when $R_0$ shifts. A robust policy intervenes earlier or more gradually.

Validation should compare four objects: the no-action baseline, the nominal optimum, a robust compromise, and a deliberately adverse parameter scenario. Report population reduction, ecosystem deviation, intervention effort, and the number of tested scenarios violating thresholds. The model is useful when it clarifies which protection costs little and which requires a genuine policy choice.

## 9. Frontier Stability and Decision Validation

A beautiful frontier can be numerically or statistically fragile. Recompute it under data resampling, alternative normalizations, and plausible uncertainty sets. Match points by decision or objective neighborhood and display bands rather than one precise curve.

Check dominance with tolerances; solver noise can make nearly identical points appear to dominate each other. Remove infeasible points before ranking. For discrete models, a frontier can contain gaps and jumps; do not connect points with a smooth line that suggests unattainable intermediate compromises.

Perform an out-of-sample stress test. The uncertainty set used during optimization is part of the model; the stress scenarios used for evaluation should also include surprises outside that set. Robustness is not immunity. State where protection was guaranteed, where performance was only simulated, and which structural failures remain untested.

## 10. Writing the Recommendation

A responsible report shows the frontier before choosing a point, explains normalization and weights, identifies hard constraints, and quantifies the cost of protection. A useful final sentence sounds like this:

> Plan B costs 3.2% more than the nominal minimum but keeps all service constraints feasible across the declared demand set and reduces worst-scenario regret by 41%; beyond this point, each additional 1% of cost buys less than 0.2% regret reduction.

That statement tells the reader what was traded, over what uncertainty, and why the selected point is defensible.

For the easter egg, look back at plans $A,B,C,D$ in Section 2. Add a fifth plan $E=(12,9)$—identical to $B$. The Pareto set has not changed, but a careless program may report two “different” solutions. Decide whether duplicates should be merged by objective values or retained because their underlying decisions differ. That tiny choice becomes important when a frontier contains several operationally distinct ways to achieve the same score.

### Sources

- [COMAP 2024 MCM/ICM results and Outstanding papers](https://www.contest.comap.com/undergraduate/contests/mcm/contests/2024/results/).
- [COMAP previous contests archive](https://contest.comap.com/undergraduate/contests/mcm/previous-contests.php).
- [CUMCM official archive](https://www.mcm.edu.cn/).
- Boyd and Vandenberghe, [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/).
