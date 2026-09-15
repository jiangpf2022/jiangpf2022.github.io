---
title: Mathematical Modeling 8 - Genetic Algorithms
date: 2026-09-14 20:00:09
categories: Mathematical Modeling
tags:
  - Genetic Algorithms
  - Metaheuristics
  - Combinatorial Optimization
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "Genetic algorithms explained as representations, operators, constraints, and evidence—not as a black-box substitute for formulation."
---

A genetic algorithm (GA) is a population-based search method. It is valuable when the search space is large, discrete or mixed, and irregular enough that exact or gradient-based methods are difficult. It does not certify optimality.

## Representation comes first

Each candidate solution is encoded as a chromosome. The encoding must make important constraints easy to preserve.

- bit strings suit subset selection;
- permutations suit routing and ordering;
- integer vectors suit allocation;
- real vectors suit bounded parameter tuning;
- custom graph encodings suit network design.

For a knapsack problem, a bit $x_i=1$ includes item $i$. The raw objective is value $\sum_i v_ix_i$, while feasibility requires $\sum_i w_ix_i\le W$.

## The evolutionary loop

A basic GA repeats:

1. initialize a diverse population;
2. evaluate objective and constraint violation;
3. select parents;
4. recombine them by crossover;
5. mutate offspring;
6. preserve or select survivors;
7. stop under a declared budget or convergence rule.

Selection creates pressure toward strong candidates. Crossover reuses partial structure. Mutation introduces variation. Elitism protects the best known solution, but too much elitism collapses diversity.

## Fitness and constraints

For maximization with violation $v(x)\ge0$, a penalty fitness may be

$$
F(x)=f(x)-\lambda v(x).
$$

The penalty must be large enough to discourage infeasibility but not so large that the search receives no useful gradient toward the feasible region. Better alternatives include repair operators, feasible encodings, and feasibility-first comparison:

1. a feasible candidate beats an infeasible one;
2. among feasible candidates, compare objective;
3. among infeasible candidates, compare violation.

## Operators must respect structure

One-point crossover is natural for bit strings but can duplicate cities in a route. Permutation problems need order crossover, partially mapped crossover, or other structure-preserving operators. A mutation may flip a bit, swap two positions, reverse a route segment, or perturb a real coordinate.

The operator is part of the model. Explain why it produces meaningful nearby solutions.

## Exploration versus exploitation

Population size, selection pressure, crossover rate, and mutation rate control the balance. Diagnose the search with:

- best and median fitness by generation;
- feasible fraction;
- population diversity;
- improvement versus objective evaluations;
- variation across random seeds.

If all candidates become identical early, increase diversity or reduce selection pressure. If fitness never improves, inspect encoding, repair, and scaling before increasing iterations.

## Evidence for a competition paper

Compare the GA with an exact solver on small instances and with a simple heuristic on full instances. Report computational budget, number of runs, median outcome, best outcome, and variability. A single lucky run is not evidence.

Use the GA only after asking whether the model has exploitable structure. Linear assignment, shortest path, convex quadratic programming, and many scheduling models have specialized solvers with stronger guarantees.

The official SciPy optimization guide groups global optimizers by supported bounds, nonlinear constraints, and derivative requirements; solver choice should follow the mathematical structure of the problem ([optimization guide](https://docs.scipy.org/doc/scipy/tutorial/optimize.html)).

## Minimal pseudocode

```text
population <- create_feasible_candidates()
evaluate(population)

repeat until evaluation_budget_is_used:
    parents   <- select(population)
    offspring <- crossover(parents)
    offspring <- mutate(offspring)
    offspring <- repair_or_measure_violation(offspring)
    evaluate(offspring)
    population <- survivor_selection(population, offspring)

return best_feasible_candidate_seen
```

Keep evaluation count—not only generation count—because population sizes may differ. Cache repeated candidates when objective evaluation is expensive. For a beginner implementation, first test the loop on a function with a known optimum, then on a tiny version of the real problem whose exact optimum can be enumerated.

### Practice

For a ten-item knapsack, compare three constraint strategies: penalty, repair by removing low value-to-weight items, and feasibility-first selection. Across 30 seeds, report feasibility rate, median objective, best objective, and evaluations. This exercise shows that representation and constraint handling matter at least as much as the word “genetic.”
