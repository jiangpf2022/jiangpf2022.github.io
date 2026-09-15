---
title: Mathematical Modeling 9 - Swarm and Annealing
date: 2026-09-14 20:00:08
categories: Mathematical Modeling
tags:
  - Particle Swarm Optimization
  - Simulated Annealing
  - Global Optimization
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "Particle swarm optimization and simulated annealing, with practical guidance on boundaries, cooling, stopping, and fair evaluation."
---

Particle swarm optimization (PSO) and simulated annealing (SA) are two distinct ways to search difficult landscapes. PSO shares information across a population; SA allows one trajectory to escape local traps through temperature-controlled randomness.

## Particle swarm optimization

Particle $i$ has position $x_i$ and velocity $v_i$. A common update is

$$
v_i^{t+1}=\omega v_i^t+c_1r_1(p_i-x_i^t)+c_2r_2(g-x_i^t),
$$

$$
x_i^{t+1}=x_i^t+v_i^{t+1},
$$

where $p_i$ is the particle's best known position, $g$ is the best shared position, and $r_1,r_2\sim U(0,1)$. The inertia term preserves motion, the cognitive term returns to personal experience, and the social term shares collective information.

Large inertia explores broadly; small inertia settles. Excessive social attraction makes particles collapse prematurely. Track swarm spread as well as the best objective.

## Boundaries and constraints

Positions outside variable bounds can be clipped, reflected, resampled, or penalized. These choices change the algorithm. Reflection often preserves movement better than repeated clipping at a boundary.

For general constraints, use feasible initialization and repair when possible. Otherwise compare candidates using objective and violation separately. A low objective at an infeasible point is not a good solution.

## Simulated annealing

SA proposes a neighboring state $x'$ from current state $x$. For minimization, accept all improving moves; accept a worsening move with probability

$$
P(\text{accept})=\exp\left(-\frac{f(x')-f(x)}{T}\right).
$$

At high temperature $T$, the method explores and crosses barriers. As $T$ decreases, it becomes selective. The name reflects physical annealing, but the practical model is a nonhomogeneous Markov search over candidate solutions.

## Neighborhood and cooling

The neighborhood determines what the algorithm can discover. For routing, use swap, insertion, and segment reversal. For a binary plan, flip one or several decisions. For real variables, perturb selected coordinates with a scale related to the current temperature.

A geometric schedule is common:

$$
T_{k+1}=\alpha T_k,\qquad 0<\alpha<1.
$$

Choose initial temperature so that a substantial fraction of moderate uphill moves are accepted. Cool slowly enough to explore, but define a fixed evaluation budget so that comparisons are fair.

## Choosing between methods

Use PSO when variables are naturally continuous, parallel evaluation is useful, and information sharing is beneficial. Use SA when a meaningful neighborhood exists, especially for discrete configurations. Use neither merely because the objective is nonlinear: constrained local optimization or differential evolution may be more appropriate.

## Experimental protocol

For stochastic optimization:

- fix and report multiple random seeds;
- compare under equal objective-evaluation budgets;
- plot median and quantiles across runs;
- record feasibility rate and runtime;
- verify the best returned solution independently;
- benchmark small instances against an exact method.

Stopping because “the curve looks flat” is not reproducible. Use a maximum evaluation count, time limit, or no-improvement window, and report it.

Global search finds candidates; it does not replace modeling. The final paper must still justify variables, constraints, objective, uncertainty, and validation.

## Implementation skeletons

For PSO, initialize bounded positions and modest velocities, then update personal and global bests only after evaluating repaired candidates:

```text
initialize x, v, personal_best
global_best <- best(personal_best)
repeat:
    v <- inertia*v + cognitive*rand()*(personal_best-x)
         + social*rand()*(global_best-x)
    x <- enforce_bounds(x+v)
    evaluate x
    update personal_best and global_best
```

For SA, keep the best state separately from the current state. The current state may worsen temporarily, while the best state should never be forgotten.

```text
current <- feasible_initial_state()
best <- current
for temperature in cooling_schedule:
    repeat moves_per_temperature times:
        candidate <- neighbor(current)
        delta <- cost(candidate) - cost(current)
        if delta <= 0 or random() < exp(-delta/temperature):
            current <- candidate
        if cost(current) < cost(best): best <- current
```

Plot acceptance rate by temperature. If it begins near zero, the initial temperature is too low or moves are too large; if it remains near one, cooling is too slow or moves are too small.
