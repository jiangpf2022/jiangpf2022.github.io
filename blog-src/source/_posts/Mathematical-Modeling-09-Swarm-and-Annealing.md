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

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **using population motion, thermal acceptance, and simulation carefully for hard search problems**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Several interacting parameters must be fitted to a nonlinear simulation.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

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



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **using population motion, thermal acceptance, and simulation carefully for hard search problems**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Continuous calibration

**Here is the problem.** Several interacting parameters must be fitted to a nonlinear simulation. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Scale dimensions, set PSO velocity limits, compare global and neighborhood best, and refine the best particle locally. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Unscaled coordinates can dominate motion even when they are scientifically unimportant. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Discrete schedule

**Here is the problem.** Jobs must be ordered to reduce delay under precedence constraints. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Define swap and insertion neighborhoods for simulated annealing and reject or repair invalid schedules. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Temperature controls acceptance; it cannot compensate for a neighborhood that cannot reach useful schedules. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Noisy queue design

**Here is the problem.** Choose staffing while performance is estimated by discrete-event simulation. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use common random numbers, replications, warm-up removal, and uncertainty-aware comparison. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Optimizing one noisy simulation run selects random luck rather than a policy. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Hybrid search

**Here is the problem.** A broad search finds good regions but converges slowly near a solution. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Combine PSO or annealing with a local solver under one fixed evaluation budget. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The hybrid earns its complexity only if repeated paired experiments show a consistent gain. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: state representation

Let us slow down at **state representation**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats state representation as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using population motion, thermal acceptance, and simulation carefully for hard search problems. Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use state representation to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: neighborhood or velocity

Let us slow down at **neighborhood or velocity**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats neighborhood or velocity as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using population motion, thermal acceptance, and simulation carefully for hard search problems. Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use neighborhood or velocity to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: constraint handling

Let us slow down at **constraint handling**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats constraint handling as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using population motion, thermal acceptance, and simulation carefully for hard search problems. Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use constraint handling to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: temperature or inertia

Let us slow down at **temperature or inertia**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats temperature or inertia as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using population motion, thermal acceptance, and simulation carefully for hard search problems. Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use temperature or inertia to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: noise control

Let us slow down at **noise control**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats noise control as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using population motion, thermal acceptance, and simulation carefully for hard search problems. Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use noise control to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: fair benchmarking

Let us slow down at **fair benchmarking**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats fair benchmarking as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using population motion, thermal acceptance, and simulation carefully for hard search problems. Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use fair benchmarking to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Continuous calibration

Let us revisit **Continuous calibration**, but this time you are doing the talking. The situation is still this: Several interacting parameters must be fitted to a nonlinear simulation. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Scale dimensions, set PSO velocity limits, compare global and neighborhood best, and refine the best particle locally. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Unscaled coordinates can dominate motion even when they are scientifically unimportant. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Continuous calibration in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Discrete schedule

Let us revisit **Discrete schedule**, but this time you are doing the talking. The situation is still this: Jobs must be ordered to reduce delay under precedence constraints. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Define swap and insertion neighborhoods for simulated annealing and reject or repair invalid schedules. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Temperature controls acceptance; it cannot compensate for a neighborhood that cannot reach useful schedules. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Discrete schedule in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Noisy queue design

Let us revisit **Noisy queue design**, but this time you are doing the talking. The situation is still this: Choose staffing while performance is estimated by discrete-event simulation. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use common random numbers, replications, warm-up removal, and uncertainty-aware comparison. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Optimizing one noisy simulation run selects random luck rather than a policy. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Noisy queue design in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Hybrid search

Let us revisit **Hybrid search**, but this time you are doing the talking. The situation is still this: A broad search finds good regions but converges slowly near a solution. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Combine PSO or annealing with a local solver under one fixed evaluation budget. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The hybrid earns its complexity only if repeated paired experiments show a consistent gain. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Hybrid search in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect state representation to neighborhood or velocity

Draw two boxes labeled **state representation** and **neighborhood or velocity**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from state representation to neighborhood or velocity; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using population motion, thermal acceptance, and simulation carefully for hard search problems to remain auditable.

### Board exercise 2: connect neighborhood or velocity to constraint handling

Draw two boxes labeled **neighborhood or velocity** and **constraint handling**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from neighborhood or velocity to constraint handling; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using population motion, thermal acceptance, and simulation carefully for hard search problems to remain auditable.

### Board exercise 3: connect constraint handling to temperature or inertia

Draw two boxes labeled **constraint handling** and **temperature or inertia**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from constraint handling to temperature or inertia; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using population motion, thermal acceptance, and simulation carefully for hard search problems to remain auditable.

### Board exercise 4: connect temperature or inertia to noise control

Draw two boxes labeled **temperature or inertia** and **noise control**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from temperature or inertia to noise control; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using population motion, thermal acceptance, and simulation carefully for hard search problems to remain auditable.

### Board exercise 5: connect noise control to fair benchmarking

Draw two boxes labeled **noise control** and **fair benchmarking**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from noise control to fair benchmarking; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using population motion, thermal acceptance, and simulation carefully for hard search problems to remain auditable.

### Board exercise 6: connect fair benchmarking to state representation

Draw two boxes labeled **fair benchmarking** and **state representation**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from fair benchmarking to state representation; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using population motion, thermal acceptance, and simulation carefully for hard search problems to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a search experiment with scaled variables, explicit boundary rules, repeated seeds, confidence intervals, convergence versus evaluations, and a deterministic or random-search baseline. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Fair comparison and 40-minute lab

Compare PSO, annealing, GA, and local search by objective evaluations. Use identical objectives and constraints, multiple seeds, median and dispersion, best-so-far curves, and a small exact case. For noisy simulations, use common random numbers and re-evaluate finalists. In the lab, run PSO on a bounded continuous function and annealing on a route, then explain performance through representation and information sharing.
