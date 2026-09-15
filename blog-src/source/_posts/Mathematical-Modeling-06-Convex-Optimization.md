---
title: Mathematical Modeling 6 - Convex Optimization
date: 2026-09-14 20:00:11
categories: Mathematical Modeling
tags:
  - Linear Programming
  - Quadratic Programming
  - Convex Optimization
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A modeling-first guide to linear, assignment, quadratic, and conic optimization with variables, constraints, and solver checks."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **turning limited resources and competing choices into an optimization model that can be solved and explained**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Choose quantities of products under ingredient limits and possibly integer packaging.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

Optimization sounds intimidating because textbooks usually begin with a block of symbols. In practice, the idea is much friendlier: we have several choices, limited resources, and a definition of what “better” means. An optimization model is simply a careful way to put those three ingredients in the same room.

Let us begin as if we were talking in class. Imagine that you run a small snack workshop. You can make two products tomorrow morning, but you do not have unlimited flour or sugar. Product A earns more money per box, while Product B uses the ingredients in a different proportion. What should you produce?

Before reading any formula, pause for ten seconds. Would you make only the product with the larger profit? That is a reasonable first instinct, but it ignores the fact that a product can be profitable and still consume the scarce resource inefficiently. Optimization begins exactly where that intuition becomes uncertain.

By the end of this lesson, you should be able to do four things without copying a template:

1. turn a verbal decision problem into variables, an objective, and constraints;
2. recognize whether the result is an LP, MILP, QP, or SOCP;
3. solve small models by reasoning and larger models with a solver;
4. explain *why* a solution is good, which constraint is limiting it, and how the answer changes when the data change.

The difficult part is usually not pressing “Solve.” The difficult part is deciding what every symbol means and making sure every real-world rule appears exactly once in the mathematical model. We will therefore work problem-first: each technique begins with a concrete question, then we build and solve the model together.

## A first classroom problem

### The question

A workshop produces snack boxes A and B. One box of A uses 4 kg of flour and 1 kg of sugar and earns 60 yuan. One box of B uses 2 kg of flour and 2 kg of sugar and earns 40 yuan. Tomorrow the workshop has 80 kg of flour and 50 kg of sugar.

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/optimization-snack-problem.webp" alt="The original snack-production linear-programming example from the course slides" loading="lazy">
  <figcaption>The original course question. Read it once without symbols and mark the decisions, objective, and two resource limits before continuing.</figcaption>
</figure>

> **Think before calculating.** What are we allowed to choose? What does the workshop want to maximize? Which sentences describe limits rather than preferences?

The quantities we control are the numbers of boxes. Let $x_A$ and $x_B$ denote those numbers. Profit is not a constraint; it is the score by which we compare feasible production plans. Flour and sugar, on the other hand, are hard limits.

### Translate one sentence at a time

The profit from A is $60x_A$ and the profit from B is $40x_B$, so total profit is

$$
P=60x_A+40x_B.
$$

Now translate the flour sentence. Every A consumes 4 kg and every B consumes 2 kg. The total cannot exceed 80 kg:

$$
4x_A+2x_B\le 80.
$$

Sugar gives a second restriction:

$$
x_A+2x_B\le 50.
$$

Finally, negative production is meaningless, so $x_A,x_B\ge0$. We have now written the complete model:

$$
\max 60x_A+40x_B
\quad\text{s.t.}\quad
4x_A+2x_B\le80,
\quad x_A+2x_B\le50,
\quad x_A,x_B\ge0.
$$

Notice the order in which we worked: meaning first, symbols second. If you begin by searching for an algorithm, it is surprisingly easy to optimize the wrong problem very efficiently.

### Solve it without software

Because there are only two variables, draw the feasible region. The flour boundary is $2x_A+x_B=40$ and the sugar boundary is $x_A+2x_B=50$. Their intersection satisfies

$$
\begin{aligned}
2x_A+x_B&=40,\\
x_A+2x_B&=50.
\end{aligned}
$$

Multiply the first equation by two and subtract the second. We obtain $3x_A=30$, so $x_A=10$ and then $x_B=20$. The profit is

$$
P=60(10)+40(20)=1400.
$$

For a linear program, an optimum occurs at a corner of the feasible polygon whenever an optimum exists. The other corners are $(0,0)$, $(20,0)$, and $(0,25)$, with profits 0, 1200, and 1000. Therefore $(10,20)$ is indeed optimal.

### Read the answer like a modeler

The number 1400 is not the whole conclusion. At $(10,20)$, flour usage is $4(10)+2(20)=80$ kg and sugar usage is $10+2(20)=50$ kg. Both resources are fully used, which tells us both constraints are *binding*. If the owner can buy more flour but not more sugar, the value of that purchase depends on how the optimal corner moves. This is the beginning of sensitivity analysis and duality.

There is also a modeling decision hiding in plain sight: can we produce fractional boxes? If the answer is no, then $x_A$ and $x_B$ must be integers. We were lucky that the continuous optimum is already integral. In another problem, rounding a fractional optimum can violate a constraint or miss a much better integer plan.

### A quick variation

Suppose A earns 80 rather than 60. Do not rerun software immediately. Compare the objective at the corners: $(20,0)$ now earns 1600, while $(10,20)$ earns 1600 as well. The objective line is parallel to the flour boundary, so every feasible point on the segment between those corners is optimal. Multiple optima are not a solver bug; they reveal that the data do not distinguish among several plans.

## Linear programs

A linear program has the standard form

$$
\min_x c^Tx \quad
\text{s.t.}\quad A_{ub}x\le b_{ub},\quad A_{eq}x=b_{eq},\quad \ell\le x\le u.
$$

The coefficients must be constants. Products such as $x_1x_2$, ratios of decisions, and squared decisions are not linear.

For two products with profits $60$ and $40$, flour use $4$ and $2$, sugar use $1$ and $2$, and capacities $80$ and $50$,

$$
\max_{x_A,x_B\ge0} 60x_A+40x_B
$$

subject to

$$
4x_A+2x_B\le80,\qquad x_A+2x_B\le50.
$$

If boxes must be whole, the variables are integer and the problem becomes a mixed-integer linear program. Do not solve the continuous relaxation and round blindly: rounding can violate constraints or destroy optimality.

## Assignment and logical decisions

Let $x_{ij}=1$ when task $i$ is assigned to worker $j$. A minimum-cost assignment is

$$
\min \sum_{i\in\mathcal I}\sum_{j\in\mathcal J}c_{ij}x_{ij}
$$

with

$$
\sum_j x_{ij}=1\quad\forall i,qquad
\sum_i x_{ij}\le1\quad\forall j,qquad x_{ij}\in\{0,1\}.
$$

Binary variables also encode activation, ordering, coverage, and incompatibility. If alternatives $i$ and $j$ cannot coexist, use $x_i+x_j\le1$. If selecting project $i$ requires facility $j$, use $x_i\le y_j$.

## Quadratic programs

A quadratic program uses

$$
\min_x \frac12x^TQx+c^Tx
$$

with linear constraints. It is convex when $Q\succeq0$. Quadratic terms naturally represent squared tracking error, variance, smoothness, and distance-like penalties.

Portfolio selection is a canonical example:

$$
\min_w w^T\Sigma w
\quad\text{s.t.}\quad
\mu^Tw\ge r_0,\quad \mathbf1^Tw=1,\quad w\ge0.
$$

Here $w$ contains portfolio weights, $\Sigma$ is the covariance matrix, and $\mu$ is expected return. The covariance estimate—not the optimizer—often dominates the model's uncertainty.

## Conic structure

Second-order cone constraints have the form

$$
\|Ax+b\|_2\le c^Tx+d.
$$

They represent norm bounds, robust linear constraints, and many risk limits. Recognizing convex structure matters because a convex feasible problem has no misleading local optimum: solver certificates and dual information become meaningful.

## Formulation workflow

Write the model in this order:

1. indices and sets;
2. known parameters and units;
3. decision variables and domains;
4. objective, with each term interpreted;
5. constraints, grouped by real rule;
6. solver and numerical tolerances;
7. post-solve feasibility and sensitivity checks.

Scale coefficients when one part of the model is near $10^{-8}$ and another near $10^9$. Poor scaling can make a correct formulation numerically fragile.

## Interpreting the solution

Report active constraints, unused capacity, and marginal values—not only $x^*$. A dual variable estimates how the optimal objective changes when the corresponding constraint is relaxed slightly. It can identify the resource worth purchasing next.

SciPy's official `linprog` interface uses exactly the inequality, equality, and bound form above and currently delegates to HiGHS methods ([documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linprog.html)). After solving, independently recompute the objective, integrality, and every constraint from the returned decisions.

For the snack example, SciPy minimizes, so negate the profit coefficients:

```python
import numpy as np
from scipy.optimize import linprog

c = np.array([-60.0, -40.0])
A = np.array([[4.0, 2.0], [1.0, 2.0]])
b = np.array([80.0, 50.0])

result = linprog(c, A_ub=A, b_ub=b, bounds=[(0, None), (0, None)])
assert result.success
x = result.x
profit = -result.fun
violation = np.maximum(A @ x - b, 0).max()
print(x, profit, violation)
```

Read the answer in domain language: how many boxes of each product, expected profit, which resource is binding, and whether continuous quantities are physically allowed. If boxes must be integral, use a mixed-integer solver instead of this continuous model.

## Worked problem: assigning students to projects

Linear programming becomes much more expressive when the decisions are yes-or-no choices. Here is a complete assignment problem, not merely the final formula.

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/optimization-assignment-problem.webp" alt="The work-assignment problem stated in the optimization lecture" loading="lazy">
  <figcaption>The slide states the general assignment problem. Our three-student table below turns the indices into a small instance that we can solve completely by hand.</figcaption>
</figure>

### The question

Three students—Ada, Ben, and Chen—must each receive one of three projects: Vision, Planning, and Control. Their estimated completion times in hours are

| Student | Vision | Planning | Control |
|---|---:|---:|---:|
| Ada | 6 | 9 | 7 |
| Ben | 8 | 5 | 6 |
| Chen | 7 | 8 | 4 |

Every project must be assigned exactly once. Find the assignment with the smallest total time.

> **Before the solution:** there are only six possible assignments, so we could enumerate them. Why build a model? Because the model will still work when there are 300 students, eligibility rules, workloads, and team constraints.

### Choose a representation

Let $x_{ij}=1$ if student $i$ receives project $j$, and let it be zero otherwise. The phrase “Ada receives Vision” is no longer a vague sentence; it is the event $x_{\text{Ada,Vision}}=1$.

The total time is the sum of time multiplied by the corresponding selection indicator:

$$
\min \sum_i\sum_j c_{ij}x_{ij}.
$$

Each student gets exactly one project,

$$
\sum_jx_{ij}=1\qquad\text{for every student }i,
$$

and each project is used exactly once,

$$
\sum_ix_{ij}=1\qquad\text{for every project }j.
$$

Finally, $x_{ij}\in\{0,1\}$. Do not omit the binary domain. If we merely require $0\le x_{ij}\le1$, the symbols could mean fractional assignments. The classical square assignment problem happens to have an integral LP relaxation, but that is a mathematical property of this constraint matrix—not permission to forget what the variables mean.

### Solve and explain

Choosing Ada–Vision, Ben–Planning, and Chen–Control gives $6+5+4=15$ hours. Checking the remaining five permutations gives totals 20, 18, 21, 21, and 20, so 15 is optimal.

The useful answer is not “the solver returned 15.” It is: Ada should take Vision, Ben Planning, and Chen Control; every student and every project appears once; and the predicted workload is 15 hours. If the time estimates are uncertain, perturb them and see whether the same assignment remains optimal. A plan that changes after a one-hour estimation error is much less trustworthy than one that survives all plausible estimates.

### Add real rules

Suppose Ada is not certified for Control. Set $x_{\text{Ada,Control}}=0$. Suppose Ben and Chen cannot work on Planning and Control simultaneously because those projects share equipment. One possible rule is

$$
x_{\text{Ben,Planning}}+x_{\text{Chen,Control}}\le1.
$$

Read that inequality aloud: at most one of the two named events can occur. This habit catches logical mistakes faster than staring at indices.

Now suppose a student can take two small projects but at most 12 hours of predicted work. Replace “one project per student” with

$$
\sum_j c_{ij}x_{ij}\le12.
$$

The same binary language supports scheduling, facility opening, feature selection, set cover, and routing. The algorithm may change, but the modeling habit stays the same.

## Worked problem: locating supply depots

This example from the course is especially useful because it shows how a small change in the question can change the entire mathematical class of the problem.

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/optimization-depot-problem.webp" alt="The six-site cement supply and depot-location problem from the course" loading="lazy">
  <figcaption>The full supply-and-location prompt, including the six coordinates and daily demands. We solve the fixed-depot allocation first, then explain why movable depots change the model class.</figcaption>
</figure>

### The fixed-depot question

There are six construction sites with coordinates and demands:

| Site | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---:|---:|---:|---:|---:|---:|
| $a_i$ | 1.25 | 8.75 | 0.50 | 5.75 | 3.00 | 7.25 |
| $b_i$ | 1.25 | 0.75 | 4.75 | 5.00 | 6.50 | 7.25 |
| Demand $d_i$ | 3 | 5 | 4 | 7 | 6 | 11 |

Two existing depots are at $A=(5,1)$ and $B=(2,7)$, each with 20 tons of stock. We must determine how much material each depot sends to each site while minimizing ton-kilometers.

Take a moment to identify what is fixed. The site coordinates, depot coordinates, site demands, and depot capacities are data. The shipment quantities are decisions. Therefore let $q_{ki}\ge0$ denote tons shipped from depot $k$ to site $i$. The distance coefficient

$$
c_{ki}=\sqrt{(u_k-a_i)^2+(v_k-b_i)^2}
$$

is a constant because $(u_k,v_k)$ is fixed. The model is

$$
\min_q\sum_k\sum_i c_{ki}q_{ki}
$$

subject to demand balance

$$
\sum_kq_{ki}=d_i\qquad\forall i,
$$

and depot capacity

$$
\sum_iq_{ki}\le20\qquad\forall k.
$$

This is a transportation LP. Total demand is $3+5+4+7+6+11=36$ tons and total supply is 40 tons, so aggregate capacity is sufficient. That does not yet prove feasibility when there are forbidden routes, but with every route available it gives a useful first check.

### Why the nearest-depot rule can fail

A tempting shortcut is to send every site’s demand to the nearest depot. Try it. If too many sites choose the same depot, its 20-ton capacity may be exceeded. A locally cheapest choice for each site need not be globally feasible. The LP coordinates all shipments at once and can split a site’s demand if that lowers cost or restores feasibility.

After solving, draw only the routes with positive flow and label their tonnage. Then independently check three things: each site receives exactly its demand, neither depot ships more than 20 tons, and the displayed objective equals the sum of distance times flow. This small audit is more persuasive than a screenshot of solver output.

### Now allow the depots to move

Suppose the question changes: where should the two depots be located? The coordinates $(u_k,v_k)$ become decision variables. The distance $c_{ki}$ is no longer a constant; it now depends on those decisions:

$$
c_{ki}(u_k,v_k)=\sqrt{(u_k-a_i)^2+(v_k-b_i)^2}.
$$

The product $c_{ki}(u_k,v_k)q_{ki}$ couples location and allocation. The clean transportation LP has become a nonlinear location-allocation problem. This is a perfect example of why we classify the model *after* defining the variables. The same-looking map may represent an LP, a mixed-integer facility-location model, or a nonconvex continuous location problem.

One practical baseline alternates two steps:

1. hold depot locations fixed and solve the transportation LP;
2. hold allocations fixed and update each depot location using its assigned weighted points.

The objective cannot increase if each step is solved correctly, but the procedure can settle at a local solution. Use several starting locations, compare with a simple grid search for a small instance, and report how sensitive the final configuration is to initialization.

### What to report

Coordinates alone are not a decision story. Report the original and optimized ton-kilometers, percentage saving, utilization of each depot, routes that change, and whether a small demand perturbation changes the recommended sites. If building a new depot costs money, add that cost before declaring relocation worthwhile.

## Worked problem: balancing return and risk

Quadratic programming is easiest to understand through a trade-off that linear terms cannot express naturally.

### The question

An investor allocates proportions $w_1,w_2,w_3$ among three assets. The weights sum to one and short selling is not allowed. Expected returns are stored in $\mu$, and the covariance matrix $\Sigma$ describes how returns vary together. We want the least risky portfolio that still reaches target return $r_0$.

Risk is modeled by portfolio variance $w^T\Sigma w$. Thus

$$
\begin{aligned}
\min_w\quad & w^T\Sigma w\\
\text{s.t.}\quad & \mu^Tw\ge r_0,\\
& \mathbf 1^Tw=1,\\
& w\ge0.
\end{aligned}
$$

> **Think first:** why not minimize the average of the three individual variances? Because covariance matters. Two volatile assets can partially cancel one another if they move differently, while two apparently safe assets can reinforce the same risk.

### Convexity is a promise

A covariance matrix is positive semidefinite in exact mathematics, so the variance objective is convex. Geometrically, its level sets are ellipses rather than a landscape full of unrelated valleys. If the constraints are also convex, every local optimum is global. This does not mean every numerical answer is automatically meaningful: estimated covariance can be noisy, the target return can be infeasible, and tiny eigenvalues can make the solution unstable.

Check that $\Sigma$ is symmetric and inspect its eigenvalues. If sampling noise produces a small negative eigenvalue, investigate the preprocessing or use a justified positive-semidefinite correction. Then solve several target returns to trace an efficient frontier. The frontier communicates the trade-off far better than one unexplained portfolio.

### Interpret the result

Suppose the target-return constraint is active. Its dual value measures the local increase in minimum variance caused by demanding slightly more expected return. If the dual value is large, the investor is near a costly part of the frontier. If a weight is zero, its reduced-cost or KKT condition explains why that asset does not enter the current optimum.

Finally, validate out of sample. A portfolio optimized on the same period used to estimate $\mu$ and $\Sigma$ will usually appear too good. Roll the estimation window forward, include transaction costs, and compare with equal weights. Optimization should earn its complexity against that baseline.

## Convexity clinic: how to recognize the safe structure

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/optimization-exercise-set.webp" alt="Optimization formulation exercises from the course slides" loading="lazy">
  <figcaption>Course formulation exercises. Before looking for a solver, identify the variables and decide whether each objective and feasible set is linear, quadratic, conic, or nonconvex.</figcaption>
</figure>

When we call a problem convex, we are making two statements:

- the feasible set contains the whole line segment between any two feasible points;
- the objective lies below the chord connecting any two points on its graph.

For a differentiable function, the first-order condition

$$
f(y)\ge f(x)+\nabla f(x)^T(y-x)
$$

means that every tangent plane is a global under-estimator. For twice-differentiable $f$, a positive-semidefinite Hessian is a convenient test. Linear functions are both convex and concave; norms are convex; the maximum of convex functions is convex; an arbitrary product of variables usually is not.

Here is a useful classroom test. Consider each expression and decide before reading the answer:

1. $3x_1+2x_2\le10$ — a half-space, hence convex.
2. $x_1^2+x_2^2\le1$ — a disk, hence convex.
3. $x_1^2+x_2^2\ge1$ — the outside of a disk, not convex.
4. $x_1x_2\ge1$ with $x_1,x_2>0$ — not obviously convex in this form, but a logarithmic transformation may reveal useful structure.
5. $\|Ax+b\|_2\le c^Tx+d$ — a second-order cone constraint when the right side is nonnegative.

The direction of an inequality matters. A convex function bounded *above* defines a convex sublevel set; the same function bounded *below* generally does not.

## From optimality conditions to explanation

For a constrained convex problem, the Karush–Kuhn–Tucker conditions connect the numerical optimum to a human explanation. Introduce one multiplier for each constraint. At the optimum we look for:

1. primal feasibility — the decisions satisfy the original rules;
2. dual feasibility — inequality multipliers have the correct sign;
3. stationarity — objective and active-constraint gradients balance;
4. complementary slackness — an inactive inequality has zero multiplier.

In the snack problem, both ingredient constraints are active. Their multipliers can be interpreted as marginal values of flour and sugar. If sugar had 10 kg left unused, complementary slackness would force its shadow price to zero locally: one more kilogram of an already abundant resource cannot improve profit.

This language helps us explain a solver result without pretending the solver is an oracle. “The plan uses all available flour and sugar; the marginal values show sugar is currently more valuable; product B remains in the mix because it converts flour into profit more efficiently” is a modeling conclusion. “Status: optimal” is only a software message.

## Guided workshop: from linear programs to networks

Optimization becomes easier when every symbol answers a physical question. Consider shipping a product from factories $i\in I$ through warehouses $j\in J$ to customers $k\in K$. Let $x_{ij}$ and $y_{jk}$ be shipped quantities and $c_{ij},d_{jk}$ their unit costs.

### Write balance equations

At warehouse $j$, incoming and outgoing flow must balance unless inventory is explicitly modeled:

$$
\sum_i x_{ij}=\sum_k y_{jk}.
$$

Factory capacity gives $\sum_jx_{ij}\le u_i$; customer demand gives $\sum_jy_{jk}\ge q_k$. The objective is

$$
\min\;\sum_{i,j}c_{ij}x_{ij}+\sum_{j,k}d_{jk}y_{jk}.
$$

This is a minimum-cost flow structure. Recognizing structure matters because specialized algorithms are fast and the resulting solution has an interpretable network.

### Add discrete decisions carefully

If a warehouse must be either open or closed, introduce $z_j\in\{0,1\}$ and link flow to that decision:

$$
\sum_k y_{jk}\le M_jz_j.
$$

Choose $M_j$ as the tightest valid capacity, not an enormous arbitrary number. An unnecessarily large big-$M$ weakens the relaxation and can create numerical problems. Fixed opening cost $f_jz_j$ enters the objective. The model is now mixed-integer and convexity of the continuous part no longer guarantees that a local relaxation solution is an integer optimum.

Logical statements can often be encoded similarly. “Choose at most one of A and B” becomes $z_A+z_B\le1$. “If A then B” becomes $z_A\le z_B$. Write a truth table before translating a complicated rule.

### Learn the major graph templates

Many competition problems reduce to a few network patterns:

- **shortest path:** minimum additive cost from a source to a destination;
- **maximum flow:** greatest feasible flow under edge capacities;
- **minimum spanning tree:** connect all nodes with minimum total edge weight;
- **matching/assignment:** pair two sets while respecting exclusivity;
- **facility location:** choose nodes to open and assign demand to them;
- **vehicle routing:** construct capacity- and time-constrained tours.

Do not use Dijkstra's algorithm when edges can have negative costs; do not use a spanning tree when traffic must travel from a source to destinations; do not confuse straight-line distance with travel time on a road network.

### Use dual information

Suppose the dual value of factory capacity is $7.4$ dollars per additional unit. Locally, increasing capacity by one unit improves the optimal objective by about $7.4$ until the active set changes. Reduced costs help explain why unused routes remain unused. Sensitivity ranges are local; after a constraint becomes inactive or another becomes binding, resolve the model.

### Diagnose infeasibility

When no solution exists, do not immediately remove constraints. Check units, signs, index ranges, duplicated demand, and lower bounds. Introduce labeled nonnegative slack variables temporarily and penalize them heavily. The locations of unavoidable slack reveal which business rules conflict. Then decide with the domain owner which rule is wrong or negotiable.

### Practice

Build a three-factory, two-warehouse, four-customer instance. Solve the continuous flow model, then add warehouse opening decisions. Verify every balance independently from the solver, visualize positive-flow edges, and explain the change using fixed costs and capacity shadow prices. Finally perturb demand by $\pm10\%$ and record which facilities and routes change.

## Course examples in full

### Snack production

A factory makes A and B. A uses 4 kg flour and 1 kg sugar and earns 60 yuan; B uses 2 kg flour and 2 kg sugar and earns 40 yuan. Daily supplies are 80 kg flour and 50 kg sugar:

$$\max 60x_A+40x_B$$
$$4x_A+2x_B\le80,\qquad x_A+2x_B\le50,\qquad x_A,x_B\ge0.$$

The continuous optimum is the intersection $x_A=10,x_B=20$, with profit 1400. It is already integral. The deeper result is sensitivity: a resource has marginal value only when its constraint is active. Dual prices estimate the value of one extra kilogram within the current basis range.

### Assignment

For task $i$, worker $j$, cost $c_{ij}$, and binary $x_{ij}$,

$$\min\sum_{i,j}c_{ij}x_{ij},\quad \sum_jx_{ij}=1,\quad \sum_ix_{ij}\le1.$$

The first constraint assigns every task; the second prevents double booking. Forbidden pairings are fixed to zero. Capacity greater than one changes the right side. Naming an algorithm is not a formulation until these rules are explicit.

### Supply and facility location

The lecture gives six construction sites:

| Site | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---:|---:|---:|---:|---:|---:|
| $a_i$ | 1.25 | 8.75 | 0.50 | 5.75 | 3.00 | 7.25 |
| $b_i$ | 1.25 | 0.75 | 4.75 | 5.00 | 6.50 | 7.25 |
| $d_i$ | 3 | 5 | 4 | 7 | 6 | 11 |

Existing depots $A=(5,1)$ and $B=(2,7)$ each hold 20 tons. Shipment $q_{ki}$ and Euclidean distance $c_{ki}$ give

$$\min\sum_{k,i}c_{ki}q_{ki},\quad \sum_kq_{ki}=d_i,\quad \sum_iq_{ki}\le20,\quad q_{ki}\ge0.$$

Relocating the depots makes coordinates decision variables, so distance and allocation become coupled and nonlinear. An alternating location-allocation heuristic supplies a baseline; multistart or global search tests local sensitivity. Report saved ton-kilometers, not merely new coordinates.

### Quadratic and conic structure

Portfolio variance, least squares, and smoothing produce

$$\min_x\tfrac12x^\top Qx+c^\top x\quad\text{s.t. }Ax\le b.$$

If $Q\succeq0$, the problem is convex. Norm constraints $\|Bx+d\|_2\le a^\top x+\beta$ are second-order cones. Recognizing LP, convex QP, or SOCP structure matters because a local optimum is global and solvers can provide certificates.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **turning limited resources and competing choices into an optimization model that can be solved and explained**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Production planning

**Here is the problem.** Choose quantities of products under ingredient limits and possibly integer packaging. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Build the LP, solve corner points, then decide whether integrality changes the model. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Active constraints explain scarcity and dual values explain which additional resource is worth buying. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Student-project assignment

**Here is the problem.** Assign each student exactly one project while respecting eligibility and workload. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use binary variables, exact-one constraints, and explicit logical exclusions. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The model scales beyond enumeration and every binary inequality should be readable as a sentence. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Depot allocation

**Here is the problem.** Ship material from capacitated depots to construction sites at minimum ton-kilometers. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Start with a transportation LP, then show why movable depots create nonlinear coupling. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Model classification depends on which quantities are decisions, not on the appearance of the map. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Portfolio risk

**Here is the problem.** Choose nonnegative asset weights that reach a target return with minimum variance. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use a convex quadratic objective, inspect covariance conditioning, and trace the efficient frontier. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Convexity supplies a global certificate, but out-of-sample validation determines whether the result is useful. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: decision variables

Let us slow down at **decision variables**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats decision variables as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning limited resources and competing choices into an optimization model that can be solved and explained. The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use decision variables to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: objective interpretation

Let us slow down at **objective interpretation**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats objective interpretation as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning limited resources and competing choices into an optimization model that can be solved and explained. The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use objective interpretation to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: constraint translation

Let us slow down at **constraint translation**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats constraint translation as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning limited resources and competing choices into an optimization model that can be solved and explained. The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use constraint translation to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: convexity

Let us slow down at **convexity**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats convexity as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning limited resources and competing choices into an optimization model that can be solved and explained. The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use convexity to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: duality

Let us slow down at **duality**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats duality as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning limited resources and competing choices into an optimization model that can be solved and explained. The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use duality to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: solver audit

Let us slow down at **solver audit**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats solver audit as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning limited resources and competing choices into an optimization model that can be solved and explained. The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use solver audit to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Production planning

Let us revisit **Production planning**, but this time you are doing the talking. The situation is still this: Choose quantities of products under ingredient limits and possibly integer packaging. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Build the LP, solve corner points, then decide whether integrality changes the model. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Active constraints explain scarcity and dual values explain which additional resource is worth buying. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Production planning in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Student-project assignment

Let us revisit **Student-project assignment**, but this time you are doing the talking. The situation is still this: Assign each student exactly one project while respecting eligibility and workload. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use binary variables, exact-one constraints, and explicit logical exclusions. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The model scales beyond enumeration and every binary inequality should be readable as a sentence. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Student-project assignment in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Depot allocation

Let us revisit **Depot allocation**, but this time you are doing the talking. The situation is still this: Ship material from capacitated depots to construction sites at minimum ton-kilometers. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Start with a transportation LP, then show why movable depots create nonlinear coupling. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Model classification depends on which quantities are decisions, not on the appearance of the map. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Depot allocation in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Portfolio risk

Let us revisit **Portfolio risk**, but this time you are doing the talking. The situation is still this: Choose nonnegative asset weights that reach a target return with minimum variance. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use a convex quadratic objective, inspect covariance conditioning, and trace the efficient frontier. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Convexity supplies a global certificate, but out-of-sample validation determines whether the result is useful. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Portfolio risk in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect decision variables to objective interpretation

Draw two boxes labeled **decision variables** and **objective interpretation**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from decision variables to objective interpretation; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning limited resources and competing choices into an optimization model that can be solved and explained to remain auditable.

### Board exercise 2: connect objective interpretation to constraint translation

Draw two boxes labeled **objective interpretation** and **constraint translation**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from objective interpretation to constraint translation; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning limited resources and competing choices into an optimization model that can be solved and explained to remain auditable.

### Board exercise 3: connect constraint translation to convexity

Draw two boxes labeled **constraint translation** and **convexity**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from constraint translation to convexity; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning limited resources and competing choices into an optimization model that can be solved and explained to remain auditable.

### Board exercise 4: connect convexity to duality

Draw two boxes labeled **convexity** and **duality**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from convexity to duality; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning limited resources and competing choices into an optimization model that can be solved and explained to remain auditable.

### Board exercise 5: connect duality to solver audit

Draw two boxes labeled **duality** and **solver audit**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from duality to solver audit; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning limited resources and competing choices into an optimization model that can be solved and explained to remain auditable.

### Board exercise 6: connect solver audit to decision variables

Draw two boxes labeled **solver audit** and **decision variables**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from solver audit to decision variables; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning limited resources and competing choices into an optimization model that can be solved and explained to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a complete optimization notebook that prints the model, verifies every returned constraint independently, compares a baseline, reports active constraints, and performs a parameter sweep. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Solver audit and 40-minute lab

Independently recompute every constraint, integrality condition, and objective. Report maximum violation, status, mixed-integer gap, scaling, and a simple feasible baseline. Then solve the snack problem graphically, derive assignment constraints, implement the fixed-depot model, and perturb resource limits. A complete solution explains every variable in units and every constraint in real language.
