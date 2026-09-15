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

## Lecture casebook: four problems before any algorithm

The opening lecture deliberately begins with ordinary situations. Each one teaches a different modeling habit. Work through them before reaching for a solver.

### The early commuter

A commuter normally arrives at a fixed time and is collected by a spouse who drives at constant speed. One day the commuter arrives 30 minutes early, starts walking along the pickup route, meets the car, and reaches home 10 minutes earlier than usual. How long did the commuter walk?

Let the usual meeting time be $T$. Arriving home ten minutes early means the round trip by car was shortened by ten minutes. The car therefore drove five minutes less on the outbound leg and five minutes less on the return leg. It met the walker at time $T-5$ minutes. Since the walker arrived at $T-30$, the walking time was $25$ minutes. Notice what made the solution possible: symmetry of the two saved driving segments and the constant-speed assumption. No numerical speed or distance was needed.

This tiny problem illustrates a general rule: identify an invariant before introducing parameters. If traffic makes the two driving segments asymmetric, the 25-minute conclusion no longer follows.

### The two-day journey

A traveler goes from $A$ to $B$ on one day and returns along the same route on the next. Under what conditions must there be a location reached at the same clock time on both days?

Represent position along the route by continuous functions $x_1(t)$ and $x_2(t)$. Reverse the second trip spatially so both functions are measured from $A$. At the departure time one virtual traveler is at $A$ and the other is at $B$; at the arrival time their order is reversed. By continuity, $x_1(t)-x_2(t)$ changes sign and therefore equals zero somewhere. The guarantee requires a common time interval, the same continuous route, and no teleportation. This is the intermediate-value theorem expressed as a modeling argument.

### Yellow-light duration

The yellow interval must allow a driver who cannot stop safely to clear the conflict zone. A useful first model is

$$
t_y=t_r+\frac{v}{2a}+\frac{w+L}{v},
$$

where $t_r$ is perception-response time, $v$ is approach speed, $a$ is comfortable deceleration, $w$ is intersection width, and $L$ is vehicle length. The formula is not universal policy: road grade, speed distribution, turning traffic, and a safety margin must be tested. Its value is that every term corresponds to a physical stage and can be measured.

### How many plates can one tank wash?

The useful state variable is water temperature, not merely the number of plates. Let a tank contain mass $M$ of water with heat capacity $c_w$. Plate $n$ has mass $m_p$, heat capacity $c_p$, and incoming temperature $T_p$. If mixing is fast and environmental loss during one wash is approximated by fraction $\lambda$, an energy balance gives

$$
T_{n+1}=T_a+(1-\lambda)\left[
\frac{M c_w T_n+m_p c_pT_p}{M c_w+m_pc_p}-T_a
\right].
$$

The maximum plate count is the first $n$ for which $T_n<T_{\min}$, where $T_{\min}$ is the sanitation threshold. A better version also includes hot-water replacement, washing time, detergent effectiveness, and uncertainty in plate mass. The model is useful because the restaurant can estimate all of these quantities and perform a sensitivity analysis instead of accepting one fragile number.

## Competition ecology and problem families

The lecture groups national-competition prompts into recurring families rather than promising that every problem has one fixed method:

- **A-type problems** often emphasize engineering physics, optimization, and differential equations.
- **B-type problems** often combine evaluation, optimization, and dynamic models.
- **C-type problems** often emphasize large datasets, forecasting, optimization, and evaluation.

These are tendencies, not rules. The right workflow is to identify states, decisions, constraints, data, and required evidence. Awards are rare at the national level, so reliability matters more than decorative complexity: a clear, validated model is easier to defend than a fashionable model with an unexplained pipeline.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/modeling-04.webp" alt="Competition structure from the course slides"><figcaption>The competition joins mathematics, computation, domain knowledge, and writing.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-06.webp" alt="Notion modeling workspace"><figcaption>Notion can hold the problem map, decisions, reading notes, and division of work.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-07.webp" alt="Collaborative document workspace"><figcaption>A shared document gives the team one current version of the narrative.</figcaption></figure>
</div>

## The complete working environment

The course toolbox is a pipeline, not a list of brands. Use a shared knowledge base for task ownership; a collaborative document for live writing; Python for data, simulation, and optimization; LaTeX for the final mathematical document; draw.io or PowerPoint for diagrams; and an LLM only as an assistant whose claims and code are checked.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/modeling-08.webp" alt="Python development environment"><figcaption>Python is the executable layer: every result should be reproducible from raw data.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-09.webp" alt="LaTeX writing environment"><figcaption>LaTeX keeps notation, figures, tables, and references consistent.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-10.webp" alt="Diagramming workspace"><figcaption>Architecture diagrams should expose model modules and data flow.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-11.webp" alt="AI assistant interface"><figcaption>AI can accelerate searching and drafting, but not supply evidence or responsibility.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-13.webp" alt="Weekly modeling work board"><figcaption>The weekly loop is read, reproduce, generalize, and document.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-14.webp" alt="Modeling workflow board"><figcaption>A visual task graph makes dependencies and bottlenecks explicit.</figcaption></figure>
</div>

## Forty-minute study route

Spend ten minutes solving the commuter and two-day journey without algebra software. Spend ten minutes deriving the yellow-light equation and listing which terms change on a slope. Spend ten minutes implementing the plate-temperature recurrence and plotting plate count against $M$, $T_0$, and $\lambda$. Use the last ten minutes to create a one-page team workspace containing a question tree, data inventory, assumption register, baseline, validation plan, and writing owner. The output is a modeling system that can be reused in every later lesson.
