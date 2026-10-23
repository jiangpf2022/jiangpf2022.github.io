---
title: 4 - Linear, Quadratic & Conic Optimization
date: 2026-09-15 18:00:18
permalink: 2026/09/15/Mathematical-Modeling-04-Linear-Quadratic-and-Conic-Optimization/
categories: Mathematical Modeling
tags:
  - Linear Programming
  - Quadratic Programming
  - Conic Optimization
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 150
lesson_number: 4
lesson_level: 1
review_lock: false
excerpt: "Derive LP, QP, and SOCP models from decisions, solve them geometrically and algebraically, and audit a real CUMCM crop-planning case."
---

Before we touch a solver, clear a small corner of the desk and keep one blank sheet of paper beside you. Today that sheet matters more than any software: every important model in this blog will first have to survive a hand calculation.

Optimization often arrives wearing intimidating notation: vectors, cones, multipliers, matrix inequalities, solver logs. The central question, however, is wonderfully ordinary: **among all decisions that obey the rules, which one best serves our purpose?** In this blog we will learn three increasingly expressive languages for answering that question—linear programming (LP), quadratic programming (QP), and second-order cone programming (SOCP). We will not begin with software. We will begin with a decision, derive every mathematical object, solve small instances by hand, and only then discuss algorithms and code.

The running competition case is the 2024 CUMCM Problem C on crop-planning. A publicly displayed national excellent paper formulates a seven-year planting strategy over heterogeneous plots, seasons, crops, rotation rules, uncertain yield, price, cost, and demand. That case is useful because it reveals both the power and the danger of optimization: writing “maximize profit” is easy; encoding what can actually be planted, sold, rotated, and managed is the real work. We will reconstruct the core model independently rather than copying the paper's equations or numerical answer. The original paper remains the source of record in the [CUMCM excellent-paper archive](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/).

<div class="mm-key-box"><span class="mm-callout-label">The optimization contract</span><p>Every optimization model must expose five things: <strong>decision variables</strong>, <strong>objective</strong>, <strong>constraints</strong>, <strong>data</strong>, and <strong>validation</strong>. If one is missing, the solver may still return a number, but you do not yet have a defensible decision.</p></div>

## 1. From a Decision to a Mathematical Program

Suppose a small campus kitchen must choose how many trays of rice bowls and salad bowls to prepare for lunch. A rice tray earns $36 contribution margin and uses 4 kg of rice and 2 staff-minutes. A salad tray earns $30, uses no rice, and needs 3 staff-minutes. Today the kitchen has 80 kg of rice and 72 staff-minutes. Demand limits sales to 18 rice trays and 16 salad trays.

Pause before calculating. What is under our control? Not profit, rice stock, or demand. We control the numbers of trays. Let

$$x_R=\text{rice trays},\qquad x_S=\text{salad trays}.$$

Profit becomes $\max 36x_R+30x_S$, and the rules become

$$
\begin{aligned}
4x_R &\le 80 &&\text{(rice)},\\
2x_R+3x_S &\le 72 &&\text{(labor)},\\
x_R&\le18,\quad x_S\le16 &&\text{(demand)},\\
x_R,x_S&\ge0.
\end{aligned}
$$

This is a linear program because the objective and every constraint are affine. “Linear” does not mean easy or one-dimensional. It means each expression is a weighted sum of decisions plus a constant; there are no products such as $x_Rx_S$, powers such as $x_R^2$, or nonlinear functions such as $e^{x_R}$.

In matrix form an LP can be written

$$
\begin{aligned}
\min_x\quad &c^Tx\\
\text{s.t.}\quad &Ax\le b,\quad Ex=d,\quad \ell\le x\le u.
\end{aligned}
$$

Here $x$ is the vector of decisions, $c$ gives their objective coefficients, rows of $A$ and $E$ encode rules, and $b,d,\ell,u$ are data. The notation is compact, but the model must retain units. A row that adds kilograms to staff-minutes is not sophisticated; it is wrong.

Natural language usually hides the algebra in three verbs. “At most,” “capacity,” and “cannot exceed” produce $\le$ constraints. “At least,” “coverage,” and “must satisfy” produce $\ge$ constraints. “Balance,” “conservation,” and “exactly” produce equalities.

Logical phrases require more care. “Plant crop $k$ only if plot $i$ is activated” needs a binary variable $z_{ik}\in\{0,1\}$ and a link $0\le x_{ik}\le A_i z_{ik}$. The continuous amount $x_{ik}$ says *how much*; the binary variable says *whether*. Once binary or integer decisions appear, the model becomes a mixed-integer linear program (MILP), even if every expression is linear.

<div class="mm-question-box"><span class="mm-callout-label">Stop and model</span><p>A clinic schedules nurses for four shifts. Each nurse can work at most two consecutive shifts; each shift needs a minimum number of nurses. What should the decision variable mean? Which rule is a coverage constraint, and which rule needs binary logic? Write the meanings before writing any equation.</p></div>

## 2. Geometry, Vertices, and Why LP Works

Each kitchen inequality describes a half-plane. Their intersection is the feasible region. Because intersections of half-spaces are convex, a line segment joining any two feasible points stays feasible.

The objective $36x_R+30x_S=q$ describes parallel lines. Increasing $q$ slides the line toward higher profit until it last touches the feasible polygon. Unless the objective is parallel to an entire edge, the last contact is a vertex. This is the geometric reason an LP has an optimal extreme point whenever a finite optimum exists.

For two variables, list candidate vertices. The labor and salad-demand boundaries intersect at $2x_R+3(16)=72$, so $x_R=12$ and profit is $912$. The rice-demand and labor boundaries give $2(18)+3x_S=72$, hence $x_S=12$ and profit is $1008$. Checking the remaining vertices confirms $(18,12)$ is optimal.

This hand calculation also supplies a unit test. If a solver returns $(20,10.67)$, it ignored the demand bound. If it returns a profit of 1008 at a different point, inspect whether the optimum is non-unique or output was rounded incorrectly.

A set $C$ is convex if, for any $x,y\in C$ and $\theta\in[0,1]$, $\theta x+(1-\theta)y\in C$. For a linear objective,

$$c^T[\theta x+(1-\theta)y]=\theta c^Tx+(1-\theta)c^Ty.$$

An interior convex combination cannot be strictly better than both endpoints. Repeatedly moving toward an extreme point preserves or improves the objective. This is the mathematical idea behind vertex-search methods such as simplex.

An optimization run has more outcomes than “success” and “error”: it may be optimal, infeasible, unbounded, or numerically difficult. Never make an infeasible model feasible by quietly deleting constraints. Introduce explicit slack, price the violation, and explain which promise must be relaxed.

## 3. Duality: The Price of a Scarce Resource

Consider

$$
\begin{aligned}
\max_x\quad &c^Tx\\
\text{s.t.}\quad &Ax\le b,\quad x\ge0.
\end{aligned}
$$

Assign a nonnegative price $y_i$ to each resource. If $A^Ty\ge c$, then for any feasible $x$,

$$c^Tx\le y^TAx\le y^Tb.$$

Thus $b^Ty$ is an upper bound on profit. Seeking the tightest bound gives the dual

$$
\begin{aligned}
\min_y\quad &b^Ty\\
\text{s.t.}\quad &A^Ty\ge c,\quad y\ge0.
\end{aligned}
$$

This is weak duality. Under standard feasibility conditions, LP strong duality says the best primal value equals the best dual value. The dual variable $y_i^*$ is a shadow price: for a small increase in $b_i$, optimal value changes approximately by $y_i^*$.

At the kitchen optimum $(18,12)$, rice stock is slack—only 72 of 80 kg are used—so its shadow price is zero. Labor and rice-bowl demand bind. Solving the corresponding dual equalities gives a labor price of $10$ per minute and an additional rice-tray-demand value of $16$ per tray. These values are local: buying one extra minute is useful only until another constraint becomes active.

Complementary slackness makes the relationship precise:

$$y_i^*(b_i-a_i^Tx^*)=0,\qquad x_j^*[(A^Ty^*)_j-c_j]=0.$$

A resource can carry positive price only when its constraint binds; a positive activity must have zero reduced cost. This converts a solver result into an explanation: *which rule limits the decision, and what is the marginal value of relaxing it?*

## 4. Quadratic Objectives: Risk, Tracking, and Diminishing Returns

Linear objectives assume marginal value is constant. Often it is not. A schedule may be penalized for deviating from a target; a portfolio may trade return against variance; a control input may be penalized for changing too sharply. These lead to

$$
\begin{aligned}
\min_x\quad &\frac12x^TQx+q^Tx+r\\
\text{s.t.}\quad &Ax\le b,\quad Ex=d.
\end{aligned}
$$

When $Q$ is symmetric, $\nabla f(x)=Qx+q$ and $\nabla^2f(x)=Q$. If $Q\succeq0$, the problem is convex and every local minimizer is global. If $Q\succ0$, the objective is strictly convex and the minimizer is unique over a convex feasible set.

Ordinary least squares is a QP:

$$\min_\beta \frac12\|A\beta-y\|_2^2
=\frac12\beta^TA^TA\beta-y^TA\beta+\frac12y^Ty.$$

So $Q=A^TA\succeq0$ and $q=-A^Ty$. Setting the gradient to zero gives $A^TA\beta=A^Ty$. In practice use QR or SVD rather than explicitly forming normal equations, because the latter squares the condition number.

For another example, two generators provide $p_1,p_2$ to meet demand $D$, with $C_i(p_i)=a_ip_i^2+b_ip_i+c_i$, $a_i>0$. The dispatch problem minimizes $C_1+C_2$ subject to $p_1+p_2=D$ and bounds. Ignoring active bounds, the Lagrangian gives $2a_ip_i+b_i=\lambda$: unconstrained generators have equal marginal cost. A generator at its upper bound may have lower marginal cost because it would like to produce more but cannot.

## 5. KKT Conditions: A Common Language

For $\min_x f(x)$ subject to $g_i(x)\le0$ and $h_j(x)=0$, define

$$L(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\sum_j\nu_jh_j(x).$$

The Karush–Kuhn–Tucker conditions are

$$
\begin{aligned}
\nabla_xL(x^*,\lambda^*,\nu^*)&=0 &&\text{stationarity},\\
g_i(x^*)&\le0,quad h_j(x^*)=0 &&\text{primal feasibility},\\
\lambda_i^*&\ge0 &&\text{dual feasibility},\\
\lambda_i^*g_i(x^*)&=0 &&\text{complementary slackness}.
\end{aligned}
$$

For convex problems satisfying a qualification such as Slater's condition, these conditions are sufficient as well as necessary. For nonconvex problems they may describe only a local stationary point.

Take $\min_x \frac12\|x-a\|_2^2$ subject to $u^Tx\le b$. If $a$ is feasible, $x^*=a$. Otherwise the boundary binds. Stationarity gives $x=a-\lambda u$ and $u^Tx=b$, hence

$$\lambda=\frac{u^Ta-b}{\|u\|_2^2},\qquad x^*=a-\frac{u^Ta-b}{\|u\|_2^2}u.$$

The correction occurs only along the constraint normal and has exactly the magnitude needed to reach the boundary.

## 6. Norms, Uncertainty, and Second-Order Cones

The canonical second-order cone is $\mathcal Q^{n+1}=\{(t,z):\|z\|_2\le t\}$. An SOCP has affine equalities and constraints

$$\|A_ix+b_i\|_2\le c_i^Tx+d_i.$$

This language includes LPs, many convex quadratic constraints, robust linear constraints under ellipsoidal uncertainty, portfolio risk limits, and geometric location problems.

Suppose resource usage is uncertain:

$$(\bar a+Pu)^Tx\le b\qquad\text{for every }\|u\|_2\le\rho.$$

The worst perturbation is $\max_{\|u\|_2\le\rho}u^TP^Tx$. By Cauchy–Schwarz,

$$u^TP^Tx\le\rho\|P^Tx\|_2,$$

with equality when $u$ aligns with $P^Tx$. The infinitely many uncertain inequalities are therefore equivalent to

$$\bar a^Tx+\rho\|P^Tx\|_2\le b,$$

an SOCP constraint. Uncertainty does not automatically require simulation; the right uncertainty geometry can yield a tractable deterministic model.

If $Q=L^TL\succeq0$, then $x^TQx\le t^2$, $t\ge0$, is equivalent to $\|Lx\|_2\le t$. Portfolio volatility $\sqrt{x^T\Sigma x}\le\sigma_{\max}$ is thus an SOCP constraint after factoring $\Sigma$.

## 7. Algorithms and Numerical Evidence

Simplex walks between adjacent vertices and provides useful basis sensitivity information. Interior-point methods move through the interior and solve Newton systems associated with barrier-regularized KKT equations. First-order methods use gradients and projections; they scale farther but may need more iterations for high accuracy.

For an inequality $g_i(x)<0$, a logarithmic barrier solves

$$\min_x f(x)-\mu\sum_i\log[-g_i(x)].$$

As $x$ approaches a boundary, the barrier grows. As $\mu\downarrow0$, minimizers follow the central path toward the constrained optimum. Newton's method uses

$$\nabla^2\phi_\mu(x)\Delta x=-\nabla\phi_\mu(x)$$

and a line search that remains feasible.

Use LP/MILP solvers for linear relationships and discrete decisions, convex QP when the Hessian is positive semidefinite, and SOCP when norms or ellipsoidal robustness appear. Do not send a convex model to a genetic algorithm merely because the heuristic is easier to describe. Do not claim a global optimum for a nonconvex heuristic without a valid bound or proof.

Scale variables when coefficients differ by many orders of magnitude. After solving, report primal residuals, constraint violation, dual residuals, and duality gap—not only a status string.

## 8. Winning-Paper Case: 2024 CUMCM Crop Planning

The real case asks for crop decisions across years, seasons, plots, and crops. Let

$$x_{itsk}=\text{area of crop }k\text{ on plot }i\text{ in year }t\text{, season }s,$$

and $z_{itsk}\in\{0,1\}$ indicate whether that combination is used. Let $A_i$ be plot area, $y_{ik}$ yield, $c_{ik}$ cost, $p_k$ price, and $D_{tk}$ expected demand. Production is

$$q_{tk}=\sum_{i,s}y_{ik}x_{itsk}.$$

To avoid the nonlinear expression $\min(q_{tk},D_{tk})$, introduce full-price sales $s_{tk}$ and surplus $r_{tk}$:

$$0\le s_{tk}\le D_{tk},\qquad s_{tk}+r_{tk}\le q_{tk},\qquad r_{tk}\ge0.$$

If surplus is wasted, its price is zero. If it sells at half price, revenue is $p_ks_{tk}+0.5p_kr_{tk}$. The seven-year objective is

$$\max\sum_{t,k}\left(p_ks_{tk}+\eta p_kr_{tk}-\sum_{i,s}c_{ik}x_{itsk}\right),\quad \eta\in\{0,0.5\}.$$

Core rules are:

$$\sum_kx_{itsk}\le A_i\qquad\text{(land capacity)},$$

$$m_{ik}z_{itsk}\le x_{itsk}\le A_iz_{itsk}\qquad\text{(activation and manageable area)},$$

$$z_{itsk}+z_{i,t+1,s',k}\le1\qquad\text{(no immediate repeat planting)},$$

and, for legumes $\mathcal L$,

$$\sum_{\tau=t}^{t+2}\sum_s\sum_{k\in\mathcal L}z_{i\tau sk}\ge1.$$

Incompatible plot-crop-season combinations are fixed to zero. The resulting model is a MILP. The excellent paper uses a differential-evolution genetic algorithm and later incorporates CVaR and correlation. A strong audit first asks which parts are already linear and whether an exact MILP solver can provide a benchmark. Even if the full instance is large, solve a reduced exact model.

For a hand test, take two 10-mu plots, two years, and crops wheat $W$, beans $B$, vegetables $V$. Plot 1 accepts $W,B$; plot 2 accepts $B,V$. Each plot must grow beans once and cannot repeat a crop. With profits $(500,420,760)$ RMB/mu, the best rotation is $W\to B$ on plot 1 and $B\to V$ on plot 2, yielding

$$10(500+420)+10(420+760)=21{,}000.$$

This tests compatibility, rotation, legume coverage, and accounting. Only after it passes should we trust a seven-year workbook.

The lesson is not that one algorithm name is superior. It is that a plausible heatmap can violate rotation, a high profit can come from selling more than demand, and an unlinked binary variable can be meaningless. Recompute the objective from exported decisions and check every rule independently.

## 9. Implementation and Verification

```python
import cvxpy as cp
import numpy as np

profit = np.array([36.0, 30.0])
x = cp.Variable(2, nonneg=True)
constraints = [4*x[0] <= 80,
               2*x[0] + 3*x[1] <= 72,
               x[0] <= 18, x[1] <= 16]
problem = cp.Problem(cp.Maximize(profit @ x), constraints)
problem.solve()
print(x.value, problem.value)
print([c.dual_value for c in constraints])
```

Audit primal feasibility with

$$r_p=\max\{\|Ex-d\|_\infty,\ \|(Ax-b)_+\|_\infty\},$$

recompute the objective, check units and integrality, and inspect business rules independently. Perturb important inputs. If a 1% demand change replaces the whole schedule, the recommendation needs a stability warning even if profit barely changes.

For integer models, report best feasible value $z_P$, best bound $z_D$, and

$$\operatorname{gap}=\frac{|z_P-z_D|}{\max(1,|z_P|)}.$$

“Timed out” is not “failed.” A 0.4% gap may support a decision; an unreported gap does not.

## 10. A Defensible Optimization Report

A reader should be able to reconstruct the chain:

1. define every decision with indices and units;
2. write the objective as an accounting identity;
3. group constraints by physical, temporal, logical, and policy meaning;
4. classify the model and justify the classification;
5. explain solver choice and termination criteria;
6. verify a hand-sized instance;
7. report residuals, bounds, and active constraints;
8. translate dual values into operational language;
9. stress-test uncertain coefficients;
10. state what the model omits.

LP teaches disciplined translation. QP teaches curvature and compromise. SOCP teaches that useful nonlinear structure can remain globally tractable. The shared habit is more important than the labels: **model the decision faithfully, exploit structure honestly, and treat verification as part of the mathematics.**

One small easter egg before you leave: return to the kitchen model and increase available labor from 72 to 73. The best profit rises by exactly the labor shadow price predicted by the dual. Keep increasing it one minute at a time and watch for the first moment when that prediction fails. That breakpoint is where sensitivity analysis stops being a slogan and becomes something you can see.

### Sources and further reading

- [CUMCM official site](https://www.mcm.edu.cn/) and [excellent-paper display](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/) for the 2024 crop-planning case.
- Stephen Boyd and Lieven Vandenberghe, [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/), Chapters 4–6.
- [CVXPY documentation](https://www.cvxpy.org/) for disciplined convex programming.

The next blog goes deeper into convexity proofs, conjugates, duality, proximal operators, first-order rates, and algorithms for models too large to hand directly to a generic solver.
