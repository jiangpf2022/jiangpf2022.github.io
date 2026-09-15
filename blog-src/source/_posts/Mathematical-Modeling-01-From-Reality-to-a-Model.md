---
title: Mathematical Modeling 1 - From Reality to a Model
date: 2026-09-14 20:00:16
categories: Mathematical Modeling
tags:
  - Modeling Cycle
  - Assumptions
  - Problem Decomposition
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
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

