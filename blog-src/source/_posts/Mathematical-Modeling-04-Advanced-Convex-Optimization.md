---
title: 5 - Advanced Convex Optimization
date: 2026-09-15 18:00:17
permalink: 2026/09/15/Mathematical-Modeling-05-Advanced-Convex-Optimization/
categories: Mathematical Modeling
tags:
  - Convex Analysis
  - Duality
  - Proximal Algorithms
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 170
lesson_number: 5
lesson_level: 3
review_lock: false
excerpt: "Develop convexity, conjugate duality, proximal and splitting algorithms, and risk-aware models through proofs and a real CUMCM crop-planning case."
---

Leave the polished solver output closed for a moment. Imagine instead that someone slides a result across the table and asks, “How do you know this is globally best?” This blog is our attempt to answer that question without hand-waving.

Linear, quadratic, and conic models gave us a useful vocabulary. This blog asks a deeper question: **why can some large nonlinear-looking problems still be solved reliably, while apparently simpler ones trap us in poor local solutions?** The answer is not the name of a solver. It is convex structure.

We will build that structure carefully. We will prove convexity rather than guess it, derive duals rather than quote them, and connect each algorithm to the geometry it exploits. Then we will return to the 2024 CUMCM crop-planning problem and rebuild its uncertainty layer using scenarios and conditional value-at-risk (CVaR). The aim is not to make the paper look more advanced. The aim is to make the promise “this decision remains acceptable when the data are wrong” mathematically testable.

<div class="mm-key-box"><span class="mm-callout-label">The advanced-convexity habit</span><p>Do not ask “Which algorithm should I mention?” Ask: <strong>What function and set do I have? What curvature can I prove? What certificate will tell me that I am done?</strong> The algorithm comes after those answers.</p></div>

## 1. Convex Sets, Functions, and Epigraphs

A set $C\subseteq\mathbb R^n$ is convex when every segment between two points stays inside:

$$\theta x+(1-\theta)y\in C\quad\forall x,y\in C,\ \theta\in[0,1].$$

Half-spaces, affine sets, norm balls, positive-semidefinite cones, and intersections of convex sets are convex. A union of convex sets is generally not. The set $\{x:x_1x_2\ge1,x>0\}$ happens to be convex after recognizing it as the epigraph of $1/x_1$; a picture alone is not enough.

A function $f:C\to\mathbb R$ is convex if

$$f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y).$$

Geometrically, the chord lies above the graph. The epigraph

$$\operatorname{epi}f=\{(x,t):f(x)\le t\}$$

is convex exactly when $f$ is convex. This observation converts many nonlinear objectives into constrained forms: minimizing $f(x)$ is equivalent to minimizing $t$ subject to $(x,t)\in\operatorname{epi}f$.

If $f$ is differentiable, convexity is equivalent to the global first-order lower bound

$$f(y)\ge f(x)+\nabla f(x)^T(y-x).$$

The tangent plane never rises above a convex function. If $f$ is twice differentiable on an open convex domain, $f$ is convex iff $\nabla^2f(x)\succeq0$ everywhere.

### Proof examples

For log-sum-exp,

$$f(x)=\log\sum_{i=1}^m e^{a_i^Tx+b_i},$$

define softmax weights $p_i=e^{a_i^Tx+b_i}/\sum_j e^{a_j^Tx+b_j}$. Then

$$\nabla f=\sum_i p_i a_i,\qquad
\nabla^2f=\sum_i p_i(a_i-\bar a)(a_i-\bar a)^T\succeq0,$$

where $\bar a=\sum_i p_i a_i$. The Hessian is a covariance matrix, hence positive semidefinite.

For $f(X)=-\log\det X$ on $X\succ0$, the directional second derivative is

$$D^2f(X)[H,H]=\operatorname{tr}(X^{-1}HX^{-1}H)\ge0,$$

so it is convex. This barrier is central to semidefinite and interior-point methods.

Useful closure rules include nonnegative weighted sums, pointwise maxima, affine composition $f(Ax+b)$, and partial minimization under suitable conditions. Composition must be checked carefully: a convex function composed with a convex inner function is not automatically convex unless monotonicity conditions hold.

<div class="mm-question-box"><span class="mm-callout-label">Convexity check</span><p>Is $f(x)=\sqrt{1+x^2}$ convex? Try the Hessian test. Is $g(x)=\sqrt{x}$ convex on $x>0$? If not, is it concave? The outer square root is the same, but the inner structure changes the answer.</p></div>

## 2. Strong Convexity, Smoothness, and Conditioning

A differentiable function is $\mu$-strongly convex if

$$f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac\mu2\|y-x\|_2^2.$$

It is $L$-smooth when

$$\|\nabla f(x)-\nabla f(y)\|_2\le L\|x-y\|_2.$$

For twice differentiable $f$, the inequalities

$$\mu I\preceq\nabla^2f(x)\preceq LI$$

give strong convexity and smoothness. The ratio $\kappa=L/\mu$ is a condition number. Long narrow level sets correspond to large $\kappa$: gradient descent zigzags because one direction requires a small stable step while another changes slowly.

From smoothness,

$$f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\|y-x\|^2.$$

Choose $y=x-(1/L)\nabla f(x)$ to obtain

$$f\left(x-\frac1L\nabla f(x)\right)\le f(x)-\frac1{2L}\|\nabla f(x)\|^2.$$

This descent lemma justifies the step size $1/L$. For convex smooth functions, gradient descent achieves $f(x_k)-f^*=O(1/k)$. With $\mu$-strong convexity, distance contracts linearly:

$$\|x_k-x^*\|^2\le\left(1-\frac\mu L\right)^k\|x_0-x^*\|^2.$$

Scaling and preconditioning try to reduce $\kappa$. If kilograms, dollars, and binary indicators are all represented on wildly different scales, even a theoretically good method may behave badly.

## 3. Subgradients and Nonsmooth Models

At a kink, the ordinary gradient does not exist, but convexity still supplies supporting hyperplanes. A vector $g$ is a subgradient of $f$ at $x$ when

$$f(y)\ge f(x)+g^T(y-x)\quad\forall y.$$

The set of all such vectors is $\partial f(x)$. For $f(x)=|x|$,

$$\partial|x|=\begin{cases}{-1\},&x<0,\\[-2pt] [-1,1],&x=0,\\[-2pt]\{1\},&x>0.\end{cases}$$

A point minimizes a proper closed convex function iff $0\in\partial f(x^*)$. With a convex feasible set $C$, the condition becomes

$$0\in\partial f(x^*)+N_C(x^*),$$

where $N_C$ is the normal cone. This compact inclusion generalizes gradient-zero, KKT stationarity, and boundary optimality.

Subgradient descent uses $x_{k+1}=x_k-\alpha_kg_k$. Unlike gradient descent, the objective may increase on an individual step. With bounded subgradients and appropriate diminishing steps, the best objective converges at roughly $O(1/\sqrt{k})$. That slow rate motivates proximal methods when the nonsmooth term has exploitable structure.

## 4. Conjugates and Duality Derived Systematically

The Fenchel conjugate is

$$f^*(y)=\sup_x\{y^Tx-f(x)\}.$$

It records all affine lower bounds of $f$. Fenchel–Young follows immediately:

$$f(x)+f^*(y)\ge x^Ty,$$

with equality exactly when $y\in\partial f(x)$.

Examples:

- If $f(x)=\tfrac12\|x\|_2^2$, then $f^*(y)=\tfrac12\|y\|_2^2$.
- If $f(x)=\lambda\|x\|_1$, then $f^*(y)$ is $0$ when $\|y\|_\infty\le\lambda$ and $+\infty$ otherwise.
- If $f=\delta_C$ is the indicator of convex set $C$, then $f^*(y)=\sup_{x\in C}y^Tx$, the support function.

Consider

$$\min_x f(x)+g(Ax).$$

Introduce $z=Ax$ and multiplier $y$:

$$L(x,z,y)=f(x)+g(z)+y^T(Ax-z).$$

Minimizing over $x$ and $z$ gives

$$\inf_x[f(x)+(A^Ty)^Tx]=-f^*(-A^Ty),$$

$$\inf_z[g(z)-y^Tz]=-g^*(y).$$

Therefore the dual is

$$\max_y -f^*(-A^Ty)-g^*(y).$$

This one derivation produces duals for basis pursuit, regularized regression, network flows, entropy models, and many decomposable programs.

Strong duality needs conditions. Slater's condition—existence of a point satisfying affine equalities and strictly satisfying convex inequalities—is a practical sufficient condition. Without a qualification, the duality gap may be positive and KKT multipliers may fail to exist.

## 5. Proximal Operators: Solving a Small Problem at Every Step

For a closed convex function $g$, define

$$\operatorname{prox}_{\lambda g}(v)=\arg\min_x\left\{g(x)+\frac1{2\lambda}\|x-v\|_2^2\right\}.$$

The quadratic keeps $x$ near $v$ while $g$ imposes structure. If $g=\delta_C$, the prox is Euclidean projection onto $C$. If $g(x)=\tau\|x\|_1$, the prox is soft-thresholding:

$$[\operatorname{prox}_{\lambda\tau\|\cdot\|_1}(v)]_i
=\operatorname{sign}(v_i)\max(|v_i|-\lambda\tau,0).$$

To derive it, solve the one-dimensional problem separately for $x>0$, $x<0$, and $x=0$, then combine the cases. The interval around zero collapses exactly to zero; sparsity is a consequence of the kink, not numerical coincidence.

For composite minimization $F(x)=f(x)+g(x)$ with smooth $f$ and proximable $g$, proximal gradient is

$$x_{k+1}=\operatorname{prox}_{\alpha g}(x_k-\alpha\nabla f(x_k)).$$

With $\alpha\le1/L$, the basic method attains $O(1/k)$; Nesterov acceleration or FISTA attains $O(1/k^2)$ in objective error under standard assumptions.

For LASSO,

$$\min_\beta\frac12\|X\beta-y\|_2^2+\lambda\|\beta\|_1,$$

the update is

$$\beta_{k+1}=S_{\alpha\lambda}[\beta_k-\alpha X^T(X\beta_k-y)],$$

where $S$ is soft-thresholding. Every term has a role: the gradient improves data fit, and the prox decides which coefficients survive.

## 6. Splitting and ADMM

Suppose $f$ and $g$ are individually easy but their sum is not. Write

$$\min_{x,z} f(x)+g(z)\quad\text{s.t.}\quad Ax+Bz=c.$$

The scaled augmented Lagrangian leads to ADMM:

$$
\begin{aligned}
x^{k+1}&=\arg\min_x f(x)+\frac\rho2\|Ax+Bz^k-c+u^k\|^2,\\
z^{k+1}&=\arg\min_z g(z)+\frac\rho2\|Ax^{k+1}+Bz-c+u^k\|^2,\\
u^{k+1}&=u^k+Ax^{k+1}+Bz^{k+1}-c.
\end{aligned}
$$

The primal residual is $r^k=Ax^k+Bz^k-c$. The dual residual measures movement in the split variable; for the common $x=z$ form, $s^k=\rho(z^k-z^{k-1})$. Stopping requires both to be small relative to absolute and relative tolerances.

ADMM is attractive when variables split by data block, geographic region, scenario, or regularizer. It is not automatically faster than a mature conic solver. Its value appears when decomposition makes subproblems parallel, private, or much smaller.

The penalty $\rho$ does not change the exact solution but strongly affects speed. If $\|r^k\|$ dwarfs $\|s^k\|$, increase $\rho$; if the reverse holds, decrease it, rescaling the dual variable consistently.

## 7. Stochastic, Coordinate, and Large-Scale Methods

If $f(x)=\frac1N\sum_{i=1}^N f_i(x)$, a full gradient costs $N$ component evaluations. Stochastic gradient uses an unbiased estimate $g_k=\nabla f_{i_k}(x_k)$:

$$x_{k+1}=x_k-\alpha_kg_k.$$

Noise makes early progress cheap but prevents constant-step iterates from settling exactly. Mini-batches trade variance for computation. Variance-reduced methods periodically use full gradients or control variates to recover faster convergence on finite sums.

Coordinate descent updates one coordinate or block. For smooth $f$ plus separable $\ell_1$ penalty, coordinate subproblems often have closed-form soft-threshold solutions. It is effective when individual columns are cheap and the solution is sparse.

Projected gradient handles a simple convex set $C$:

$$x_{k+1}=\Pi_C(x_k-\alpha\nabla f(x_k)).$$

Projection onto a box clips coordinates; projection onto a simplex can be obtained by sorting and thresholding; projection onto an affine set solves a least-squares system. The word “projection” hides an optimization problem, so complexity depends on $C$.

## 8. Risk as a Convex Object: VaR and CVaR

Let $L(x,\xi)$ be loss under decision $x$ and uncertain scenario $\xi$. Value-at-Risk at confidence $\alpha$ is a loss quantile:

$$\operatorname{VaR}_\alpha(L)=\inf\{t:\Pr(L\le t)\ge\alpha\}.$$

VaR reports a threshold but ignores how severe the tail becomes beyond it. CVaR measures expected tail loss. The Rockafellar–Uryasev representation is

$$\operatorname{CVaR}_\alpha(L)=\min_\eta\left[\eta+\frac1{1-\alpha}\mathbb E(L-\eta)_+\right].$$

With scenarios $s=1,\dots,S$ and probabilities $\pi_s$, introduce $u_s\ge0$:

$$
\begin{aligned}
\min_{x,\eta,u}\quad &\eta+\frac1{1-\alpha}\sum_s\pi_su_s\\
\text{s.t.}\quad &u_s\ge L_s(x)-\eta,\quad u_s\ge0.
\end{aligned}
$$

If each scenario loss $L_s(x)$ is convex, the CVaR model is convex. If losses are affine, it is an LP. We have converted a tail statistic into auxiliary variables and linear inequalities.

Suppose five equally likely losses are $(2,4,5,9,20)$ and $\alpha=0.8$. Choosing $\eta$ between 9 and 20 leaves only the 20-loss scenario in the hinge term. At the empirical optimum the CVaR is 20: it focuses on the worst 20% tail rather than the mean 8. A risk-neutral plan may accept a rare catastrophe because average profit is high; a CVaR plan prices the catastrophe directly.

Risk aversion can be expressed as

$$\min_x\ \mathbb E[L(x,\xi)]+\lambda\operatorname{CVaR}_\alpha(L(x,\xi)),$$

or as a constraint $\operatorname{CVaR}_\alpha\le R_{\max}$. The parameter $\lambda$ is not “the correct value”; it represents a stakeholder tradeoff. Show a frontier rather than hiding the choice.

## 9. Winning-Paper Case: Risk-Aware Crop Planning

The 2024 CUMCM crop-planning excellent paper extends its deterministic plan by treating demand, yield, price, and cost as uncertain, then incorporating CVaR. Let $x$ denote the planting plan from the previous blog. For scenario $s$, define profit

$$
P_s(x)=\sum_{t,k}\left[p_{tks}s_{tks}+\eta p_{tks}r_{tks}
-\sum_{i,j}c_{ijkt,s}x_{ijkt}\right],
$$

where yield affects the link between planted area and sellable production. Let loss be $L_s(x)=-P_s(x)$. A transparent risk-aware objective is

$$
\max_{x,\zeta,u}\quad
\sum_s\pi_sP_s(x)-\lambda\left(\zeta+\frac1{1-\alpha}\sum_s\pi_su_s\right)
$$

subject to

$$u_s\ge -P_s(x)-\zeta,\qquad u_s\ge0,$$

plus land, crop, rotation, and sales constraints for every scenario. Here $\zeta$ estimates VaR; $u_s$ records excess loss beyond it.

### Building scenarios without manufacturing certainty

If the prompt states ranges rather than distributions, do not pretend they are precisely Gaussian. A defensible design might include:

1. a nominal scenario;
2. low/high demand by crop family;
3. adverse yield and high cost;
4. favorable demand but constrained production;
5. correlated shocks, such as reduced yield coinciding with higher market price.

Scenario probabilities should come from evidence when available. Otherwise present them as assumptions and test alternatives. Independent random draws can destroy meaningful correlations. A drought that reduces multiple crop yields simultaneously is not represented by perturbing every crop independently.

### Comparing decisions, not only objective values

For each $\lambda$ and $\alpha$, report expected profit, CVaR, worst-case profit, rotation feasibility, and how much planted area changes. A plan whose expected profit drops 1% while tail loss drops 30% may be compelling. A plan whose crop allocation changes completely under a tiny probability adjustment is fragile even if its reported CVaR is attractive.

The excellent paper uses a DEGA heuristic to solve its extended model. That does not remove the need for bounds. Because much of the scenario-CVaR layer is linear once discrete crop choices are introduced, a MILP formulation can benchmark reduced instances. Compare heuristic value against the MILP incumbent and bound, then explain any remaining gap.

### A four-scenario miniature

Let two crop allocations satisfy $x_W+x_V=1$, $x\ge0$. Scenario profits are

$$
\begin{array}{c|rrrr}
&s_1&s_2&s_3&s_4\\\hline
W&8&8&7&6\\
V&14&13&10&-8
\end{array}
$$

With equal probabilities, vegetable has mean $7.25$, below wheat's $7.25$ only by equality here, but far worse downside. At $\alpha=0.75$, empirical loss-CVaR focuses on the single worst scenario: wheat's tail loss is $-6$, vegetable's is $8$. A risk-neutral objective is indifferent, while any positive tail-risk penalty prefers wheat. Changing the values slightly can create a genuine tradeoff; the point is to inspect the mechanism before solving hundreds of scenarios.

## 10. Certificates, Failure Modes, and Reporting

A convex algorithm is trustworthy only when formulation and diagnostics agree. Track:

- primal feasibility;
- stationarity or dual feasibility;
- complementary slackness where relevant;
- primal-dual gap;
- objective change and iterate change;
- conditioning and scaling;
- out-of-sample scenario performance.

For composite problems, the proximal-gradient mapping

$$G_\alpha(x)=\frac1\alpha\left[x-\operatorname{prox}_{\alpha g}(x-\alpha\nabla f(x))\right]$$

generalizes the gradient. $G_\alpha(x)=0$ is an optimality condition, so $\|G_\alpha(x_k)\|$ is more meaningful than merely counting iterations.

Common failure modes include:

1. asserting convexity because a plot “looks bowl-shaped”;
2. using a Hessian test outside its domain;
3. treating KKT conditions as a global certificate for a nonconvex model;
4. reporting a dual variable without its units or sign convention;
5. tuning risk parameters on the same scenarios used to claim robustness;
6. comparing algorithms at different tolerances;
7. declaring convergence because the objective stopped changing while constraints remain violated;
8. describing a heuristic as “convex optimization” merely because some subexpression is convex.

### Sources and further reading

- [CUMCM official site](https://www.mcm.edu.cn/) and [excellent-paper display](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/) for the 2024 crop-planning case.
- Stephen Boyd and Lieven Vandenberghe, [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/).
- Neal Parikh and Stephen Boyd, [*Proximal Algorithms*](https://web.stanford.edu/~boyd/papers/prox_algs.html).
- Stephen Boyd et al., [*Distributed Optimization and Statistical Learning via ADMM*](https://web.stanford.edu/~boyd/papers/admm_distr_stats.html).
- Rockafellar and Uryasev, [*Optimization of Conditional Value-at-Risk*](https://doi.org/10.1023/A:1007670815245).

Convex optimization is powerful not because it makes modeling automatic, but because it connects geometry, algorithms, and certificates. When you can prove curvature, derive a dual, and measure optimality, the solver's answer becomes an auditable argument rather than a mysterious number.

If you made it this far, here is the hidden exercise: derive the conjugate of $f(x)=\tfrac12(x-a)^2$ without expanding the square until the last line. The answer quietly explains why translating a quadratic changes the dual by a linear term. Write it in the margin; it will reappear when we study robust and distributed models.
