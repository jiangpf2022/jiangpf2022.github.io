---
title: Mathematical Modeling 4 - Assumptions and Architecture
date: 2026-09-14 20:00:13
categories: Mathematical Modeling
tags:
  - Problem Analysis
  - Notation
  - Model Architecture
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "How to turn a prompt into connected submodels, defensible assumptions, a clean notation system, and an executable research plan."
---

The main body becomes clear when the architecture is clear. Before derivations, decide what each submodel receives, produces, and passes to the next stage.

## Problem restatement versus analysis

A restatement translates the prompt into precise tasks without copying it. Problem analysis explains why those tasks are difficult and how they connect.

For each subproblem record:

- target quantity or decision;
- available data;
- constraints and uncertainty;
- chosen mathematical representation;
- output passed downstream;
- validation evidence.

A concise dependency map is often more useful than several pages of prose. For example:

$$
\text{raw trajectories}\rightarrow\text{time alignment}\rightarrow\text{state estimation}
\rightarrow\text{feasible windows}\rightarrow\text{task schedule}.
$$

This prevents a later optimization model from silently using information that an earlier stage never estimated.

## Make assumptions local

Tie each assumption to the model it supports. “Measurement noise is zero-mean Gaussian” belongs with a state estimator; “tasks cannot overlap” belongs with scheduling constraints. Local assumptions make sensitivity testing and revision easier.

Separate assumptions from observed facts. If a prompt gives daily capacity, it is a parameter. If the model assumes daily capacity remains constant next month, that is an assumption.

## Design notation as an interface

Notation should reduce cognitive load. Establish consistent rules:

- sets use calligraphic capitals, such as $i\in\mathcal I$;
- parameters use known data, such as demand $d_t$;
- decision variables are visibly distinct, such as $x_{it}$;
- estimated parameters carry hats, such as $\hat\beta$;
- vectors and matrices use a consistent bold convention.

Define indices and units. Avoid reusing $t$ for both time and a threshold. A symbol table should contain only symbols that recur; a variable used once is better defined beside its equation.

## Connect data to equations

Every parameter in an optimization or simulation must have a source. Build a parameter lineage table:

| Parameter | Meaning | Unit | Source or estimator |
|---|---|---|---|
| $d_t$ | demand in period $t$ | units/day | cleaned observations or forecast |
| $c_{ij}$ | assignment cost | dollars | distance and labor model |
| $p_s$ | scenario probability | dimensionless | empirical frequency or assumption |

This table catches inconsistent units and unexplained constants before they enter code.

## Use model layers

A strong architecture often has four layers:

1. **data layer:** cleaning, alignment, interpolation, feature construction;
2. **descriptive layer:** exploratory patterns and parameter estimation;
3. **decision layer:** optimization, simulation, or policy selection;
4. **evidence layer:** residuals, held-out tests, sensitivity, and alternatives.

Not every problem needs all four, but the separation prevents data preprocessing from being mistaken for a model and prevents solver output from being mistaken for validation.

## Plan before coding

Write a one-page model specification containing the objective, state or decision variables, constraints, data inputs, expected outputs, and tests. Then construct a minimal synthetic case whose answer is known. A scheduling model should solve a two-task example by inspection before it is trusted on 10,000 tasks.

The architecture is successful when another teammate can implement one stage without guessing what the previous stage meant.

