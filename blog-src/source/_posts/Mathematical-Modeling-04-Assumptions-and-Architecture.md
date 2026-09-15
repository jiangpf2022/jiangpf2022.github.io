---
title: Mathematical Modeling 4 - Assumptions and Architecture
date: 2026-09-14 20:00:13
categories: Mathematical Modeling
tags:
  - Problem Analysis
  - Notation
  - Model Architecture
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
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

## Guided workshop: architect a multi-part problem

Consider a coastal city deciding where to place emergency shelters, how to route residents, and how many supplies to pre-position under uncertain storm intensity. The prompt appears to contain three independent questions, but a good architecture exposes their interfaces.

### Build a dependency graph

The hazard model estimates flooding by location and scenario. Its output determines which roads are available and how many residents require evacuation. The network model estimates travel time and accessibility. Those quantities enter a facility-location model that selects shelters and allocations. A final simulation tests congestion, shelter overflow, and supply exhaustion.

Write every arrow as data: “hazard model $\rightarrow$ road-open indicator $a_{e,s}$,” not merely “Model 1 supports Model 2.” If an arrow has no named output, the modules are not yet connected.

### Define states, decisions, and parameters

For scenario $s$, let $a_{e,s}\in\{0,1\}$ indicate whether road edge $e$ is usable and $d_{i,s}$ be evacuees at neighborhood $i$. Let $x_j\in\{0,1\}$ indicate whether shelter $j$ is opened and $y_{ijs}\ge0$ the scenario-dependent number sent from $i$ to $j$. The distinction matters: $x_j$ is a here-and-now decision, while $y_{ijs}$ may adapt after the storm scenario is known.

The phrase “under severe storms” must become a scenario set, probability model, or bounded uncertainty set. A verbal adjective is not a mathematical input.

### Audit assumptions by module

The hazard layer may assume elevation data are accurate; the network layer may assume travel time depends on flow; the location layer may assume shelters meet a minimum safety class. Do not place all assumptions in one undifferentiated list. A local assumption is easier to test and revise. For each one, state which equation or data transformation it enables.

### Specify interfaces before implementation

Create a contract for each module:

| Module | Inputs | Outputs | Required checks |
|---|---|---|---|
| Hazard | elevation, storm scenario | flooded cells, $a_{e,s}$ | compare with historic flood maps |
| Network | graph, $a_{e,s}$, demand | travel-time matrix | connectivity and flow conservation |
| Location | travel time, capacity, cost | $x_j,y_{ijs}$ | budget, capacity, integrality |
| Simulation | selected plan, event distributions | delay, overflow, failures | repeated seeds and extreme scenarios |

This table also defines a clean software structure. Each module can be tested using synthetic inputs before the preceding module is finished.

### Trace one number end to end

Choose a final result—say, “95% of residents reach shelter within 45 minutes”—and trace it backward. Which simulation output creates it? Which routes and assignments create those trips? Which road states and storm scenarios create the network? Which raw measurements create those states? If any transition is undocumented, the result is not reproducible.

### Practice

Take a problem with at least three subquestions. Draw a directed acyclic graph whose nodes are model modules and whose edges are named tables, vectors, or parameters. Mark each quantity as observed, estimated, assumed, decided, or simulated. The finished graph should let a teammate identify circular dependencies before any code is written.
