---
title: 7 - Intelligent Optimization
date: 2026-09-15 18:00:15
permalink: 2026/09/15/Mathematical-Modeling-07-Intelligent-Optimization/
categories: Mathematical Modeling
tags:
  - Genetic Algorithms
  - Particle Swarm Optimization
  - Simulated Annealing
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 170
lesson_number: 7
lesson_level: 1
review_lock: false
excerpt: "Understand GA, differential evolution, PSO, and simulated annealing through representation, constraints, convergence evidence, and a real CUMCM case."
---

Imagine the objective surface as a mountain range at night. You can measure the height where you stand, but you cannot see every valley, the terrain is broken by forbidden regions, and some decisions are not even continuous. This is where population-based and stochastic search methods become useful—and where vague claims about “intelligence” become dangerous.

This blog studies genetic algorithms (GA), differential evolution (DE), particle swarm optimization (PSO), and simulated annealing (SA). We will treat them as algorithms, not metaphors. Every update will be written explicitly; representation and constraints will receive as much attention as the objective. The real case is a 2024 CUMCM national excellent paper on crop planning that uses a differential-evolution genetic algorithm (DEGA). It gives us a chance to ask the question competition papers too often avoid: how do we know the heuristic is solving the model we intended?

<div class="mm-key-box"><span class="mm-callout-label">The heuristic contract</span><p>A metaheuristic must declare its <strong>encoding, initialization, variation operators, constraint handling, stopping rule, random-seed protocol, and comparison baseline</strong>. A convergence curve alone is not evidence of global optimality.</p></div>

## 1. When a Metaheuristic Is Justified

Use an exact convex, dynamic-programming, or mixed-integer method when it fits. These methods provide optimality conditions or bounds. Metaheuristics become attractive when the model is nonconvex, discontinuous, simulation-based, mixed discrete-continuous, or too large for available exact methods.

Before selecting one, ask:

1. Can the nonlinear part be reformulated as LP, QP, SOCP, or MILP?
2. Can a reduced instance be solved exactly?
3. Is an objective evaluation deterministic or noisy?
4. Is feasibility easy to preserve?
5. Does the decision require a single best solution or a diverse set?

Calling a method “intelligent” does not excuse weak formulation. If the fitness rewards the wrong quantity, a powerful search finds a very good wrong answer.

## 2. Representation Comes Before Evolution

An encoding maps algorithm state to a real decision. For a route, a chromosome may be a permutation. For crop allocation, it may contain areas, crop IDs, and seasons. For feature selection, it may be a bit string.

The representation should make common valid decisions easy to express and invalid ones hard to create. A naive vector of crop IDs may violate plot compatibility and rotation after nearly every crossover. A problem-aware encoding can assign only permitted crops and use a repair step for rolling rotation rules.

Suppose $n$ facilities must be assigned to $m$ locations. A length-$n$ integer vector permits duplicates unless repaired. A permutation encoding guarantees one-to-one assignment. The same crossover operator has entirely different meaning under the two encodings.

<div class="mm-question-box"><span class="mm-callout-label">Representation test</span><p>Pick two valid parent solutions and apply your proposed crossover by hand. Is the child still meaningful? If repair changes most genes, the variation operator is fighting the representation rather than exploring it.</p></div>

## 3. Genetic Algorithms Step by Step

Let population $P^g=\{x_1^g,\ldots,x_N^g\}$ at generation $g$. For minimization fitness can be rank-based or transformed from $f(x)$; using $1/f$ fails when values are zero or negative.

Tournament selection samples $k$ candidates and keeps the best. If the fraction of high-quality individuals is $p$, the probability that a tournament contains at least one is

$$1-(1-p)^k.$$

Larger $k$ raises selection pressure and can destroy diversity. Elitism copies a few best individuals to the next generation, protecting good solutions but further increasing pressure.

For real vectors, arithmetic crossover may use

$$c_1=\alpha p_1+(1-\alpha)p_2,\qquad c_2=(1-\alpha)p_1+\alpha p_2.$$

Gaussian mutation uses $x_j' = x_j+\sigma_j\epsilon$, $\epsilon\sim N(0,1)$. For permutations, use order crossover and swap or inversion mutation; arithmetic crossover would not preserve a route.

A basic generation is:

1. evaluate and rank;
2. preserve elites;
3. select parents;
4. crossover with probability $p_c$;
5. mutate with probability $p_m$;
6. repair or reject infeasible offspring;
7. form the next population.

Record best, median, interquartile range, feasibility rate, and diversity. A flat best curve can mean convergence, premature collapse, or an inactive operator.

## 4. Differential Evolution

DE is designed for real-valued vectors. In DE/rand/1, choose distinct indices $r_1,r_2,r_3$ and form

$$v_i=x_{r_1}+F(x_{r_2}-x_{r_3}),$$

where $F>0$ scales the difference. Binomial crossover creates trial vector

$$u_{ij}=\begin{cases}v_{ij},&r_{ij}\le CR\text{ or }j=j_{\mathrm{rand}},\\x_{ij},&\text{otherwise}.
\end{cases}$$

The forced coordinate $j_{\mathrm{rand}}$ ensures $u_i\ne x_i$. Greedy selection keeps $u_i$ if it is no worse than $x_i$.

The difference vector adapts step scale to population spread. Early diverse populations create large moves; later concentrated populations refine locally. Too small $F$ stalls; too large $F$ produces boundary violations. “Best/1” variants converge faster but can collapse around a poor basin. Report the variant, not only “DE.”

For bounds, clipping piles candidates on boundaries. Reflection or resampling usually preserves better search behavior. For equality constraints, a parameterization that satisfies them is preferable to a large penalty.

## 5. Particle Swarm Optimization

Particle $i$ has position $x_i^t$, velocity $v_i^t$, personal best $p_i$, and neighborhood or global best $g$. The standard update is

$$v_i^{t+1}=\omega v_i^t+c_1r_1(p_i-x_i^t)+c_2r_2(g-x_i^t),$$

$$x_i^{t+1}=x_i^t+v_i^{t+1},$$

with independent $r_1,r_2\sim U(0,1)$. The inertia $\omega$ preserves motion, $c_1$ supplies personal memory, and $c_2$ supplies social attraction.

If $\omega$ and accelerations are too large, particles oscillate or explode. If social attraction dominates, the swarm collapses early. Velocity clamping is a numerical safeguard, not a proof of convergence. Ring neighborhoods spread information more slowly than a global topology and often preserve diversity.

For discrete problems, “velocity” needs a new meaning—perhaps a probability of selecting a bit or a sequence of swaps. Merely rounding continuous positions can create bias and destroy feasibility.

## 6. Simulated Annealing and the Acceptance Rule

SA maintains one state. A proposed neighbor with objective change $\Delta=f(x')-f(x)$ is always accepted when $\Delta\le0$. A worse move is accepted with probability

$$P(\text{accept})=e^{-\Delta/T}.$$

At high temperature $T$, uphill moves are common and escape local minima. As $T$ falls, the search becomes selective. The rule corresponds to a Boltzmann distribution $\pi_T(x)\propto e^{-f(x)/T}$; the acceptance ratio ensures detailed balance for symmetric proposals.

If typical uphill changes near initialization have magnitude $\bar\Delta$ and desired initial acceptance is $p_0$, choose

$$T_0=-\frac{\bar\Delta}{\log p_0}.$$

Geometric cooling uses $T_{k+1}=\alpha T_k$, often with $\alpha$ near but below one. Theoretical logarithmic cooling can guarantee global convergence under restrictive conditions but is usually impractically slow. Report the practical schedule and empirical stability honestly.

Neighborhood design determines what can be reached. For a route, use swap, insertion, or 2-opt moves. If moves cannot connect the feasible solution space, no cooling schedule can find every region.

## 7. Constraints and Penalties

A penalty fitness

$$\Phi(x)=f(x)+\lambda\sum_j\max(0,g_j(x))^p+\mu\sum_k|h_k(x)|^p$$

is easy but sensitive to scales. Too small a penalty favors invalid solutions; too large a penalty makes the feasible boundary numerically steep.

Alternatives include:

- feasibility-preserving encodings;
- repair operators;
- rejection or resampling;
- projection onto a feasible set;
- Deb's rule: feasible beats infeasible; among feasible compare objective; among infeasible compare total violation;
- stochastic ranking, which sometimes compares objective and sometimes violation.

Always calculate feasibility rate. If 99.9% of candidates are invalid and heavily repaired, the reported population size exaggerates the effective search.

For multiple objectives, NSGA-II uses nondominated sorting and crowding distance. It seeks a diverse Pareto approximation rather than collapsing objectives into one score. Evaluate both convergence toward a reference frontier and diversity across it.

## 8. Winning-Paper Case: DEGA for 2024 CUMCM Crop Planning

The public national excellent paper titled *Crop Planting Strategy Optimization Based on Differential Genetic Algorithm* models 2024–2030 decisions, land types, crop compatibility, rotation, legumes, demand, surplus, and uncertainty. It combines DE-style difference mutation with GA-style selection and crossover.

Let $x_{itsk}$ be planting area and $z_{itsk}$ indicate use. A chromosome must encode hundreds of linked decisions. A credible decoder must enforce:

$$\sum_kx_{itsk}\le A_i,$$

plot-crop compatibility, minimum manageable area, no consecutive repeat planting, and at least one legume in each rolling three-year window. Profit must cap full-price sales at demand.

A useful hybrid workflow is:

1. initialize only compatible crop assignments;
2. normalize continuous areas to plot capacity;
3. apply DE mutation to area vectors;
4. apply problem-aware crossover to crop schedules;
5. repair rotation and legume rules in chronological order;
6. compute revenue with explicit sales variables;
7. compare by feasibility first, then profit;
8. preserve elites and population diversity.

The excellent paper reports different surplus-price scenarios and adds CVaR under uncertainty. To audit the heuristic, construct a two-year miniature and solve it exactly by MILP. Then compare DEGA's best solution with the exact optimum. On the full instance, compare against simple baselines: repeat a feasible 2023 schedule, greedily choose profit per mu with repairs, and solve a continuous relaxation. A method is informative only when it reliably improves a meaningful baseline.

Do not infer global optimality from a smooth convergence plot. Run at least 30 independent seeds, report best/median/worst and dispersion, show feasibility rates, and disclose computational budget. If one seed is dramatically better, investigate rather than publishing only that run.

## 9. Fair Experiments and Reproducibility

Algorithms must receive comparable objective evaluations, stopping budgets, and hardware. Comparing 1,000 GA evaluations with 100,000 PSO evaluations is not a method comparison.

For stochastic results $y_{a,r}$ from algorithm $a$ and run $r$, report median and interquartile range. Paired seeds or shared initial populations can reduce comparison noise. Use performance profiles or empirical cumulative distributions when testing many instances.

Tune hyperparameters on training instances and evaluate on held-out instances. Tuning and reporting on the same problem favors the method with the largest search over settings. Save configuration, seed, data checksum, code commit, runtime, evaluation count, and final feasibility residual.

Ablate hybrid components. Compare DEGA with DE alone, GA alone, and the same algorithm without repair or elitism. If the gain disappears when evaluation budgets are equalized, the claimed innovation may simply perform more work.

## 10. What a Competition Paper May Claim

Safe language is precise:

- “The method found the best observed feasible solution in 30 runs.”
- “The median objective improved 8.4% over the greedy baseline under an equal evaluation budget.”
- “On the reduced instance, the heuristic matched the proven optimum.”
- “No global-optimality guarantee is available for the full nonconvex model.”

Unsafe language says “the global optimum was obtained” merely because the curve flattened. A metaheuristic is valuable when exact methods are unsuitable and experiments are honest—not because biological vocabulary makes search intelligent.

The hidden challenge is simple: set every random coefficient in PSO to its expectation $1/2$ and imagine $p_i=g$. Write the resulting linear recurrence for the distance $x_i^t-g$. Its stability depends on $\omega,c_1,c_2$. The swarm metaphor fades, and underneath you find a dynamical system—the same kind of object we will study again in differential-equation blogs.

### Sources

- [CUMCM official site and excellent-paper display](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/).
- [COMAP Outstanding-paper archive](https://contest.comap.com/undergraduate/contests/mcm/previous-contests.php).
- Storn and Price, [Differential Evolution](https://doi.org/10.1023/A:1008202821328).
- Kennedy and Eberhart, [Particle Swarm Optimization](https://doi.org/10.1109/ICNN.1995.488968).
