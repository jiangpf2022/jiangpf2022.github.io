---
title: Mathematical Modeling 9 - Swarm and Annealing
date: 2026-09-14 20:00:08
categories: Mathematical Modeling
tags:
  - Particle Swarm Optimization
  - Simulated Annealing
  - Global Optimization
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
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

## Guided workshop: search, simulate, and queue

Metaheuristics are often used around a simulation whose output has no simple formula. Suppose an emergency department chooses staffing levels and patient-priority rules. The objective combines waiting time, overtime, and the fraction of high-severity patients served late. A discrete-event simulation estimates these outcomes for one candidate policy.

### Build a discrete-event simulation

The simulation state contains the clock, waiting queues, busy servers, and patient records. Events include arrival, service start, and service completion. The basic loop is:

1. remove the earliest event from a priority queue;
2. advance the clock to that event time;
3. update state and statistics;
4. schedule any events caused by the update;
5. stop after the warm-up and observation horizon.

Do not advance time in tiny fixed increments when nothing happens. Event-driven simulation is both faster and conceptually clearer.

For a simple $M/M/1$ queue with Poisson arrival rate $\lambda$ and exponential service rate $\mu$, utilization is $\rho=\lambda/\mu$. When $\rho<1$,

$$
L=\frac{\rho}{1-\rho},
\qquad
W=\frac{1}{\mu-\lambda},
$$

and Little's law gives $L=\lambda W$. Use these formulas to verify a simulation before adding priorities, multiple servers, or empirical distributions. When $\rho$ approaches one, delay grows nonlinearly; average capacity being barely above average demand is not enough.

### Understand Markov structure

If the future state depends on the present state but not the full past, transitions can be written in a matrix $P$ with $P_{ij}=\Pr(X_{t+1}=j\mid X_t=i)$. A distribution evolves as $\pi_{t+1}=\pi_tP$. A stationary distribution satisfies $\pi=\pi P$ and $\sum_i\pi_i=1$. Markov chains model weather regimes, customer states, reliability, and inventory conditions, but the memoryless assumption must be tested or justified.

### Optimize noisy outputs

One simulated objective value is noisy. Compare policies using common random numbers: run competing candidates on the same arrival and service scenarios so that differences have lower variance. Use multiple replications and optimize an estimated mean plus risk term. Cache evaluations when the same discrete policy returns.

PSO is natural for continuous parameters such as priority weights; SA is natural when a policy has a meaningful local move, such as transferring one worker between periods. A hybrid can use PSO or SA globally and a deterministic local search for refinement. State the total simulation replications because they dominate computational cost.

### Remove initialization bias

For a continuing queue, an empty system at time zero is unrepresentative. Plot time-series averages and discard a justified warm-up period, or initialize from an approximate steady state. For terminating systems such as one clinic day, the empty opening state may be real and should not be removed.

### Practice

Simulate an $M/M/1$ queue and verify Little's law over several $\rho$ values. Replace exponential service with a two-component empirical mixture and observe the tail. Then choose staffing for each period using SA, with common random numbers and a penalty for late high-severity patients. Report confidence intervals and compare with a rule based only on average utilization.

## PSO and annealing as shown in the course

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/meta-07.webp" alt="Particle swarm landscape"><figcaption>Each particle carries position and velocity through a shared landscape.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/meta-08.webp" alt="Particle state variables"><figcaption>Personal and global best are memories, not current positions.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/meta-09.webp" alt="PSO implementation"><figcaption>Implementation must expose boundary handling and stopping.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/meta-10.webp" alt="Social sharing in PSO"><figcaption>Social sharing accelerates consensus; cognitive memory protects exploration.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/meta-11.webp" alt="Annealing applications"><figcaption>Routing, SAT, protein configurations, and job shops require problem-specific moves.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/meta-12.webp" alt="Metallurgical annealing analogy"><figcaption>Controlled cooling reduces acceptance of worse states gradually.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/meta-13.webp" alt="Annealing acceptance rule"><figcaption>Acceptance connects objective increase and temperature.</figcaption></figure>
</div>

For particle $i$,

$$v_i^{t+1}=\omega v_i^t+c_1r_1(p_i-x_i^t)+c_2r_2(g-x_i^t),\qquad x_i^{t+1}=x_i^t+v_i^{t+1}.$$

$p_i$ is personal best, $g$ swarm best. Large $\omega$ sustains motion; small $\omega$ damps it. Velocity clipping prevents explosion but changes geometry. Reflection usually preserves more search information than blunt coordinate clipping.

Annealing accepts improvements and accepts deterioration $\Delta>0$ with

$$P(\text{accept})=\exp(-\Delta/T).$$

Choose $T_0$ so typical uphill moves have a planned acceptance rate. Routing uses swap, insertion, or 2-opt; scheduling uses feasibility-preserving moves or repair. Cooling without a suitable neighborhood cannot rescue the search.

## Fair comparison and 40-minute lab

Compare PSO, annealing, GA, and local search by objective evaluations. Use identical objectives and constraints, multiple seeds, median and dispersion, best-so-far curves, and a small exact case. For noisy simulations, use common random numbers and re-evaluate finalists. In the lab, run PSO on a bounded continuous function and annealing on a route, then explain performance through representation and information sharing.
