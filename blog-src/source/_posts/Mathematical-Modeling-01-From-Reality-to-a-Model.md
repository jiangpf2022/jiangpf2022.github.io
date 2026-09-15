---
title: Mathematical Modeling 1 - From Reality to a Model
date: 2026-09-14 20:00:16
categories: Mathematical Modeling
tags:
  - Modeling Cycle
  - Assumptions
  - Problem Decomposition
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A disciplined route from an ambiguous real question to variables, assumptions, equations, validation, and an actionable conclusion."
---

Mathematical modeling is not the act of attaching a fashionable algorithm to a dataset. It is the controlled replacement of a real system by a simpler mathematical object that is useful for a stated decision.

## The modeling contract

A model must make five things explicit:

1. **Purpose:** What decision, explanation, or prediction is required?
2. **Boundary:** Which objects, time scales, and interactions belong to the system?
3. **State:** What quantities are sufficient to describe the system at a given moment?
4. **Mechanism:** How do those quantities interact or change?
5. **Evidence:** What observation could show that the model is inadequate?

This contract prevents a common failure: solving a mathematically interesting problem that is not the problem asked.

## Begin with conservation and scale

Before choosing an algorithm, look for balances. Most physical and operational models begin with

$$
\text{accumulation}=\text{input}-\text{output}+\text{generation}-\text{loss}.
$$

For a restaurant washing dishes, the useful question is not merely “how hot is the water?” A simple model tracks the heat available in the tank and the heat required per batch. If mixing is fast and heat loss during one batch is negligible,

$$
Q_{\text{available}}=mc_p(T_h-T_{\min}),
$$

and the number of washable batches is approximately available heat divided by heat required per batch. The assumptions expose exactly when this estimate fails: stratified temperature, continuous reheating, variable batch mass, or substantial loss to the room.

Dimensional analysis is an immediate error detector. Terms added in one equation must share units; a claimed probability must be dimensionless; an exponent must receive a dimensionless argument.

## Translate language into structure

Turn nouns into sets or parameters, verbs into decisions, and qualifiers into constraints.

- “Assign workers to tasks” suggests binary variables $x_{ij}\in\{0,1\}$.
- “At most one” becomes a sum bounded by one.
- “Minimize total time” becomes an objective over selected decisions.
- “For every day” creates a time index.
- “Uncertain demand” requires scenarios, distributions, or uncertainty sets.

For every subproblem, write an **input–output sentence**: “Given ___, estimate/choose ___ so that ___.” This small step often reveals dependencies between questions and prevents circular reasoning.

## Assumptions are controlled approximations

A useful assumption removes complexity while preserving the mechanism that controls the answer. Classify assumptions as:

- **Structural:** interactions, independence, network topology, or state definition;
- **Parametric:** constants, bounds, distributions, or rates;
- **Operational:** resource availability, policy, timing, or implementation rules;
- **Measurement:** noise, missingness, resolution, or sensor bias.

Every important assumption should have a reason and a consequence. “Travel speed is constant because the route is short and uncongested; therefore travel time is proportional to distance.” A list of unsupported assumptions is decoration, not modeling.

## Solve the simplest credible model first

Build models in layers:

1. a transparent baseline;
2. one extension that addresses the baseline's largest failure;
3. a comparison showing whether the extension matters.

If a linear model answers the decision robustly, a deep network is not automatically better. Complexity must purchase predictive accuracy, realism, computational tractability, or decision quality. Report that purchase explicitly.

## Validate the chain, not only the final number

Validation has several levels:

- **implementation:** does the code solve the equations written?
- **internal:** do units, bounds, conservation laws, and limiting cases hold?
- **empirical:** does the model reproduce held-out or historical observations?
- **comparative:** does it improve on a baseline under the same test?
- **decision:** would plausible uncertainty change the recommendation?

The final report should close the loop: question $\rightarrow$ abstraction $\rightarrow$ solution $\rightarrow$ evidence $\rightarrow$ decision. COMAP describes mathematical modeling competitions as an unscripted combination of modeling, problem solving, and writing; the deliverable is therefore an argument, not just a program ([official MCM/ICM instructions](https://www.contest.comap.com/undergraduate/contests/mcm/instructions.html)).

## Working checklist

Before proceeding, be able to answer:

- What is the decision variable or predicted quantity?
- Which data are observations, and which numbers are assumptions?
- What baseline can be solved today?
- What failure mode motivates the next layer?
- Which figure or test will support the conclusion?

If any answer is vague, the model is not ready for optimization.

## Guided workshop: build a model from nothing

Suppose a university wants to reduce the waiting time at a campus dining hall without increasing the weekly labor budget. This sentence is still a **situation**, not a mathematical problem. We must decide who acts, what can be changed, what cannot be changed, and what “better” means.

### Step 1: write the decision sentence

Use the template introduced earlier:

> Given predicted customer arrivals, service times, worker availability, and labor costs, choose the number of workers assigned to each station in each 30-minute period so that expected waiting time is minimized while the labor budget and staffing rules are respected.

The nouns now become mathematical objects. Let $T$ be the set of time periods, $S$ the set of stations, $\lambda_t$ the expected arrival rate, $\mu_s$ the service rate of one worker at station $s$, and $x_{st}$ the number of workers assigned to station $s$ during period $t$. Notice that $x_{st}$ is a decision, whereas $\lambda_t$ and $\mu_s$ must be measured or estimated.

### Step 2: draw the system boundary

The boundary might include arrival, ordering, payment, food preparation, and pickup. It might exclude where students go after collecting food. A boundary is neither correct nor incorrect by itself; it is useful when it contains the mechanisms that dominate the target quantity. If pickup congestion blocks the preparation station, pickup must be included. If it never blocks upstream work, it can initially be omitted.

Write a unit beside every quantity. For example, $\lambda_t$ has units customers/minute, $\mu_s$ has units customers/(worker·minute), and $x_{st}\mu_s$ has units customers/minute. A utilization estimate

$$
\rho_{st}=\frac{\lambda_{st}}{x_{st}\mu_s}
$$

is dimensionless. If $\rho_{st}\ge 1$, demand reaches or exceeds nominal capacity, so a stable steady-state queue should not be expected. This one calculation is already a useful baseline.

### Step 3: separate data from assumptions

Arrival timestamps, transaction durations, and schedules are observations. “Service times are independent” and “one worker has a constant service rate within a period” are assumptions. Estimate an empirical distribution rather than reporting only the mean: a mean of two minutes can hide a mixture of many 30-second orders and a few ten-minute orders.

Make an assumption ledger with four columns: assumption, reason, consequence, and test. The constant-rate assumption may be reasonable over a short interval; its consequence is a simpler queue; its test is whether the rate changes systematically within that interval. An assumption that cannot be connected to a consequence is probably too vague.

### Step 4: construct a baseline and one extension

The baseline assigns enough workers to keep estimated utilization below a chosen threshold such as $0.85$. It ignores random variation but is transparent. The extension uses a queueing approximation or discrete-event simulation to estimate the waiting-time distribution. Compare both under the same arrival scenarios. If both recommend the same staffing pattern, the simpler model may be sufficient. If they differ during sharp peaks, the extension has identified where variability matters.

### Step 5: decide what would falsify the model

Reserve several days for evaluation. Compare predicted and observed queue length, mean wait, 90th-percentile wait, and the fraction of periods exceeding a service target. Inspect errors by weekday and time of day. A model that is accurate at noon but fails at closing time has a defined operating range, not universal validity.

### Your first deliverable

Create a one-page specification for a real system around you. It must include one decision sentence, a boundary diagram, a variable table with units, three assumptions with tests, one baseline, one extension, and two validation metrics. This exercise is deliberately algorithm-free: the purpose is to learn that formulation comes before computation.
