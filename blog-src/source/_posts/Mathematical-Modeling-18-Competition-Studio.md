---
title: Mathematical Modeling 18 - Competition Studio
date: 2026-09-14 19:59:01
categories: Mathematical Modeling
tags:
  - Competition Workflow
  - Case Study
  - Reproducibility
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A full competition workflow connecting problem selection, baselines, graph and market case patterns, teamwork, writing, and submission."
---

Competition performance is a systems problem. Modeling, coding, writing, and verification must advance together, because a brilliant result that cannot be explained or reproduced is not a complete submission.

## Select a problem with evidence

During the first pass, every teammate independently records required outputs, available data, plausible baselines, major risks, validation opportunities, and a possible distinctive contribution.

Choose the problem whose key mechanism the team can defend—not the one with the most familiar buzzwords. Ask how many teams may use the obvious method and identify a meaningful improvement grounded in the problem.

Create a requirement table with one row per question. For each row list output, model, data, figure, validation, and current status. This table is the team's control panel.

## Build a baseline first

During the first modeling block, produce a complete but simple chain from raw data to one answer. This baseline becomes a test harness for every extension. Save its metrics and figures.

Maintain a decision log containing assumptions, parameter sources, rejected approaches, and reasons. Use version control or timestamped archives. Record random seeds and environments. An improvement should be accepted only after it beats the baseline under the same evaluation.

## Case pattern: graph-based estimation

The first simulation material illustrates a reusable pattern. Unknown node states are connected by noisy relative measurements. Define residual $e_{ij}(x)$ on each edge and minimize

$$
F(x)=\sum_{(i,j)\in\mathcal E}e_{ij}(x)^T\Omega_{ij}e_{ij}(x).
$$

Linearization near the current estimate yields

$$
H\Delta x=-b,qquad
H=J^T\Omega J,quad b=J^T\Omega e.
$$

Each residual touches only a few node states, so the Jacobian $J$ and approximate Hessian $H$ are sparse. The lesson is broader than robotics: exploit locality and sparsity instead of passing a structured problem to a dense black box. Fix a reference node or prior to remove gauge ambiguity, then inspect residuals after optimization.

## Case pattern: noisy markets and decisions

The second simulation material combines bid–ask data, relative spreads, liquidity, dependence, risk, and allocation. A reusable workflow is:

1. define every order-book feature with unit and timestamp;
2. separate cross-sectional dependence from temporal dependence;
3. estimate return and liquidity risk without future leakage;
4. optimize allocation under capital and execution constraints;
5. stress-test fees, slippage, and regime change.

Midprice is $(A_t+B_t)/2$ and spread is $A_t-B_t$, where $A_t$ and $B_t$ are best ask and bid. Relative spread divides by midprice for comparability. A backtest is invalid if decisions at time $t$ use a quote, return, or aggregate that became known later.

## Team operating rhythm

Use short synchronization cycles. At each checkpoint confirm the current answer to every subproblem, unresolved assumptions, reproducible figures, experiments still worth their time, and the next integration deadline.

One person owns the master manuscript, but all teammates review equations, code outputs, and claims. Use notebooks for exploration, then consolidate the final pipeline so it runs from a clean state. Split long programs into testable stages rather than debugging one monolith.

## A practical three-day rhythm

- **Opening:** interpret and choose; build data audit and baseline.
- **Middle:** develop the central model; validate continuously; begin final figures.
- **Closing:** freeze the model early enough to write, audit, reproduce, and submit.

Do not let every teammate browse outside solutions. Assign one person to monitor useful references while the others preserve independent reasoning. Use AI as an assistant for explanation, debugging, and alternatives only when the team can verify every equation, citation, and line of code.

## Write while modeling

Create the paper structure early: restatement, analysis, assumptions, notation, models, results, validation, strengths and limitations, conclusion, references, and appendix. Insert figures and quantitative results as soon as they stabilize. Write the abstract last.

Use scientific language, consistent symbols, numbered key equations, captions below figures, titles above tables, and citations at the point of use. Open questions must become either completed analyses or explicit limitations before submission.

## Final audit

Before submission:

- answer every requested question explicitly;
- verify anonymity and required file format;
- regenerate all numbers and figures;
- check units, symbols, references, and captions;
- include source code and necessary supporting data;
- test the archive on a clean machine;
- generate any required checksum;
- submit early enough to recover from upload failure.

COMAP's official instructions frame modeling, problem solving, writing, teamwork, and compliance as one integrated activity ([MCM/ICM instructions](https://www.contest.comap.com/undergraduate/contests/mcm/instructions.html)). The final report and supporting material are the executable record of the entire modeling process.

## Course synthesis

The reusable loop is

$$
\text{question}\rightarrow\text{assumptions}\rightarrow\text{data}
\rightarrow\text{model}\rightarrow\text{computation}\rightarrow\text{validation}
\rightarrow\text{decision}\rightarrow\text{communication}.
$$

When time is short, simplify within this loop; do not skip the loop. A transparent, validated model that fully answers the prompt is stronger than a sophisticated algorithm disconnected from the decision.

## Guided workshop: execute a complete modeling project

Use a generic urban heat-resilience problem: identify vulnerable locations, forecast future heat exposure, allocate a limited intervention budget, and explain how the plan changes under climate uncertainty. This case can combine the course without forcing every technique into one paper.

### Hour 0–3: translate the prompt

Create a requirement matrix with one row per requested output: quantity, unit, geography, time horizon, decision maker, evidence, and final presentation. Draw the system boundary and module graph. List available data, expected external data, and quantities that must be assumed. Select a simple baseline for every subproblem.

Assign roles but maintain shared understanding. One person owns the mathematical narrative, one the data pipeline, and one computation/validation; all review the assumptions and final claims. Keep a decision log containing choices, rejected alternatives, and reasons.

### Build the minimum complete pipeline

The first milestone is not the most advanced model. It is one complete path from raw data to a defensible recommendation:

1. clean and map temperature, population, and infrastructure data;
2. build a transparent vulnerability score with equal weights;
3. use a seasonal or trend baseline for future exposure;
4. allocate budget with a linear model;
5. validate on historical holdouts and perturb weights/costs;
6. produce one map, one result table, and one recommendation.

Only then replace the weakest component. This protects the team from ending with several sophisticated fragments and no complete answer.

### Choose extensions by failure mode

If equal weights conflict with stakeholder priorities, add AHP and robustness analysis. If the forecast misses nonlinear weather effects, add dynamic regression or tree models. If interventions interact spatially, add coverage or network constraints. If climate scenarios change feasibility, add robust or two-stage optimization. Every extension must correspond to observed failure and be compared with the baseline.

### Use a model-selection ledger

For each candidate, record purpose, assumptions, input requirements, validation result, runtime, interpretability, and decision effect. Rejecting a complex model is evidence of judgment. Do not present a method merely because it was tried.

### Integrate uncertainty

Separate measurement error, parameter uncertainty, forecast uncertainty, and scenario uncertainty. Propagate the uncertainties that can change the recommendation. Use common scenarios to compare plans, report expected and tail outcomes, and identify decision thresholds. A sensitivity tornado plot is useful only when variables, ranges, and output are clearly defined.

### Write the paper as an audit trail

The introduction defines decisions and contributions. Assumptions map to equations. The data section records provenance and transformations. Each model section follows inputs $\rightarrow$ formulation $\rightarrow$ solution $\rightarrow$ checks $\rightarrow$ output. Results answer prompt questions in order. Validation tests claims. Limitations identify mechanisms and consequences. The conclusion gives actions and triggers.

Every table and figure should be referenced in the prose and support one claim. Every headline number should be reproducible from a stored result table. Keep code deterministic, save random seeds, and regenerate the final document from a clean environment.

### Final 90-minute audit

Have one teammate reproduce the principal numbers while another performs a cold read against the prompt. Search for undefined symbols, inconsistent units, unsupported adjectives, impossible precision, uncited data, and claims that exceed the operating range. Open every supporting file, test every link, and verify anonymity and naming rules.

### Capstone assignment

Choose a real problem and submit a reproducible package containing the requirement matrix, assumption ledger, data dictionary, baseline, one justified extension, validation matrix, sensitivity analysis, final decision, and six-page technical report plus appendix. A reader should be able to understand the mechanism, reproduce the computation, and know when not to trust the recommendation.
