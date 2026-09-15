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

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **designing the interfaces between data, submodels, and decisions before writing code**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **A robot receives position, velocity, and task events from sensors with different clocks.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

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

## Full course case: asynchronous robot localization

The writing lectures use one continuous case. A robot travels while two positioning systems record coordinates with different startup times, sampling rates, random noise, and possible fixed spatial bias. The fused 10 Hz trajectory is then used to schedule shooting and photography tasks. Estimation and decision must remain connected without being confused.

### Four deliverables

1. Estimate a pure time offset from noise-free position records and reconstruct a 10 Hz path.
2. Estimate time and fixed spatial offsets under noise, then fuse observations.
3. Decide whether field data support a fixed bias before correcting it.
4. Maximize feasible tasks under range, dwell-time, device, and turning constraints.

Tasks 1–3 estimate state; task 4 consumes that state. If task 4 silently reads raw observations, the architecture is broken.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/paper-04.webp" alt="Notation table from the robot report"><figcaption>Notation is the interface shared by alignment, fusion, diagnosis, and scheduling.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/paper-05.webp" alt="Exploratory figures for two positioning systems"><figcaption>Initial plots compare sampling, path shape, and possible temporal displacement.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/paper-06.webp" alt="Trajectory alignment diagnostics"><figcaption>Aligned paths and residual panels test whether a clock shift is sufficient.</figcaption></figure>
</div>

## Continuous-time alignment

Let source 1 provide $(t_i^{(1)},z_i^{(1)})$ and source 2 provide $(t_j^{(2)},z_j^{(2)})$, where $z=(x,y)^\top$. Pointwise subtraction is invalid because timestamps differ. Build continuous interpolants $s_1(t)$ and $s_2(t)$. For clock offset $\tau$, minimize

$$
J(\tau)=\frac{1}{|\mathcal T(\tau)|}\sum_{t\in\mathcal T(\tau)}
\|s_1(t)-s_2(t+\tau)\|_2^2.
$$

The overlap set $\mathcal T(\tau)$ must be recomputed for every candidate; otherwise large offsets can appear good because fewer points remain. Use a coarse grid to locate a basin and bounded refinement to obtain precision. Plot $J(\tau)$: a flat or multimodal curve means the offset is weakly identified.

Interpolation is part of the observation model. Linear interpolation is conservative but nonsmooth; cubic splines are smooth but may overshoot turns. Test both on withheld timestamps. Smoothness is not evidence of accuracy.

## Joint temporal and spatial calibration

With constant bias $b\in\mathbb R^2$,

$$
z_j^{(2)}=r(t_j^{(2)}-\tau)+b+\varepsilon_j^{(2)}.
$$

For each $\tau$, the least-squares estimate of $b$ is the mean aligned residual. Substitution reduces a three-parameter search to one dimension:

$$
\hat b(\tau)=\frac1m\sum_k[s_2(t_k+\tau)-s_1(t_k)],\qquad
\hat\tau=\arg\min_\tau\sum_k\|e_k(\tau)-\hat b(\tau)\|^2.
$$

On a nearly straight constant-speed path, a clock shift and displacement along travel can imitate each other. Turns and acceleration provide the excitation required for identification.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/paper-07.webp" alt="Sensor synchronization result"><figcaption>The objective and synchronized paths should agree on one offset.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/paper-08.webp" alt="Multi-source positioning architecture"><figcaption>Calibration, resampling, filtering, smoothing, diagnosis, and output remain separate.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/paper-11.webp" alt="Aligned source comparison"><figcaption>Source-wise residuals show where a shared state succeeds and fails.</figcaption></figure>
</div>

## Six-state constant-acceleration filter

At $\Delta t=0.1$ s use $x_k=[p_x,p_y,v_x,v_y,a_x,a_y]^\top$. For one axis,

$$
F_1=\begin{bmatrix}1&\Delta t&\tfrac12\Delta t^2\\0&1&\Delta t\\0&0&1\end{bmatrix}.
$$

Measurements observe position only. Prediction and update are

$$
\hat x_{k|k-1}=F\hat x_{k-1|k-1},\quad P_{k|k-1}=FP_{k-1|k-1}F^\top+Q,
$$

$$
K_k=P_{k|k-1}H^\top(HP_{k|k-1}H^\top+R_k)^{-1},\quad
\hat x_{k|k}=\hat x_{k|k-1}+K_k(z_k-H\hat x_{k|k-1}).
$$

$Q$ represents unmodeled jerk and $R$ sensor uncertainty. Estimate them from calibration or residuals. RTS smoothing is appropriate offline because future data revise past states; do not describe it as a real-time algorithm.

## Bias is a hypothesis

A nonzero residual mean can arise from noise, interpolation, transient motion, or real fixed bias. Compare no-bias $M_0$ with bias $M_1$ using held-out RMS, stability across blocks, bias size relative to sensor noise, and

$$\mathrm{BIC}=n\log(\mathrm{RSS}/n)+k\log n.$$

Correct only if improvement is repeatable and worth the parameters. A physically plausible effect still requires evidence.

| Assumption | Failure signal | Repair |
|---|---|---|
| constant clock offset | residual lag varies | affine or piecewise time map |
| fixed spatial bias | residual mean changes by segment | state-dependent bias |
| local constant acceleration | autocorrelated innovations | turning or nonlinear dynamics |
| independent sensor noise | cross-source correlation | full covariance/common-mode state |
| exact target coordinates | feasibility changes under perturbation | chance constraint/safety margin |



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **designing the interfaces between data, submodels, and decisions before writing code**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Asynchronous sensors

**Here is the problem.** A robot receives position, velocity, and task events from sensors with different clocks. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Define a common continuous-time state, estimate time offsets, and document every interpolation and uncertainty source. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Alignment is part of the model, not a preprocessing footnote. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Spatial bias

**Here is the problem.** Two sensors disagree by an offset that may vary slowly over time. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Compare no-bias, constant-bias, and drifting-bias hypotheses with residual diagnostics and complexity penalties. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Adding a bias state is justified only when it improves held-out behavior rather than merely training fit. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Multi-part competition prompt

**Here is the problem.** Four questions share data but require prediction, optimization, and policy conclusions. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Draw a dependency graph and specify the output contract of each module before implementation. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Shared variables and assumptions should have one owner, preventing contradictory definitions across sections. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Unit mismatch

**Here is the problem.** One file reports milliseconds and centimeters while another reports seconds and meters. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Build a data dictionary, convert at ingestion, and enforce dimensional checks at module boundaries. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A simple unit test can prevent a thousand-line downstream debugging session. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: problem restatement

Let us slow down at **problem restatement**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats problem restatement as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing the interfaces between data, submodels, and decisions before writing code. Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use problem restatement to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: local assumptions

Let us slow down at **local assumptions**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats local assumptions as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing the interfaces between data, submodels, and decisions before writing code. Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use local assumptions to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: notation dictionary

Let us slow down at **notation dictionary**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats notation dictionary as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing the interfaces between data, submodels, and decisions before writing code. Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use notation dictionary to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: module interfaces

Let us slow down at **module interfaces**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats module interfaces as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing the interfaces between data, submodels, and decisions before writing code. Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use module interfaces to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: dependency graph

Let us slow down at **dependency graph**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats dependency graph as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing the interfaces between data, submodels, and decisions before writing code. Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use dependency graph to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: end-to-end trace

Let us slow down at **end-to-end trace**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats end-to-end trace as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing the interfaces between data, submodels, and decisions before writing code. Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use end-to-end trace to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Asynchronous sensors

Let us revisit **Asynchronous sensors**, but this time you are doing the talking. The situation is still this: A robot receives position, velocity, and task events from sensors with different clocks. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Define a common continuous-time state, estimate time offsets, and document every interpolation and uncertainty source. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Alignment is part of the model, not a preprocessing footnote. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Asynchronous sensors in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Spatial bias

Let us revisit **Spatial bias**, but this time you are doing the talking. The situation is still this: Two sensors disagree by an offset that may vary slowly over time. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Compare no-bias, constant-bias, and drifting-bias hypotheses with residual diagnostics and complexity penalties. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Adding a bias state is justified only when it improves held-out behavior rather than merely training fit. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Spatial bias in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Multi-part competition prompt

Let us revisit **Multi-part competition prompt**, but this time you are doing the talking. The situation is still this: Four questions share data but require prediction, optimization, and policy conclusions. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Draw a dependency graph and specify the output contract of each module before implementation. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Shared variables and assumptions should have one owner, preventing contradictory definitions across sections. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Multi-part competition prompt in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Unit mismatch

Let us revisit **Unit mismatch**, but this time you are doing the talking. The situation is still this: One file reports milliseconds and centimeters while another reports seconds and meters. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Build a data dictionary, convert at ingestion, and enforce dimensional checks at module boundaries. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A simple unit test can prevent a thousand-line downstream debugging session. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Unit mismatch in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect problem restatement to local assumptions

Draw two boxes labeled **problem restatement** and **local assumptions**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from problem restatement to local assumptions; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing the interfaces between data, submodels, and decisions before writing code to remain auditable.

### Board exercise 2: connect local assumptions to notation dictionary

Draw two boxes labeled **local assumptions** and **notation dictionary**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from local assumptions to notation dictionary; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing the interfaces between data, submodels, and decisions before writing code to remain auditable.

### Board exercise 3: connect notation dictionary to module interfaces

Draw two boxes labeled **notation dictionary** and **module interfaces**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from notation dictionary to module interfaces; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing the interfaces between data, submodels, and decisions before writing code to remain auditable.

### Board exercise 4: connect module interfaces to dependency graph

Draw two boxes labeled **module interfaces** and **dependency graph**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from module interfaces to dependency graph; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing the interfaces between data, submodels, and decisions before writing code to remain auditable.

### Board exercise 5: connect dependency graph to end-to-end trace

Draw two boxes labeled **dependency graph** and **end-to-end trace**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from dependency graph to end-to-end trace; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing the interfaces between data, submodels, and decisions before writing code to remain auditable.

### Board exercise 6: connect end-to-end trace to problem restatement

Draw two boxes labeled **end-to-end trace** and **problem restatement**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from end-to-end trace to problem restatement; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing the interfaces between data, submodels, and decisions before writing code to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is an architecture page with a dependency graph, data dictionary, local assumption table, module input-output contracts, and one traced sample from raw data to conclusion. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute architecture exercise

Draw the dependency graph for all four tasks, derive the alignment objective, and list every state, decision, and parameter with units. Remove one assumption at a time and state which equation and validation figure changes. The goal is to prevent code, notation, and prose from describing different models.
