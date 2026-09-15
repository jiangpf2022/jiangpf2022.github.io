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

## Complete mock-analysis case: pose-graph estimation

The reference-analysis lecture studies a robot moving around a loop. Integrating noisy relative motion creates random-walk drift: every local error is carried into later poses, so the final pose fails to meet the start. The remedy is not arbitrary smoothing; it is to represent all relative measurements as graph constraints and optimize the absolute poses jointly.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/graph-02.webp" alt="Robot moving around a loop"><figcaption>A sequence of relative motions should return to the start but accumulates drift.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-03.webp" alt="Accumulated random-walk drift"><figcaption>Integrating noisy increments converts local error into global inconsistency.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-04.webp" alt="Spatial drift around a loop"><figcaption>The visible gap is a violated loop-closure constraint.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-05.webp" alt="Strategies for drift"><figcaption>Interpolation, motion models, additional sensors, and better estimation address different causes.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-06.webp" alt="Pose graph edge measurements"><figcaption>Edges encode relative-pose measurements.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-07.webp" alt="Pose graph nodes"><figcaption>Nodes are unknown absolute poses.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-08.webp" alt="Pose graph agreement"><figcaption>Optimization seeks absolute poses consistent with all edges.</figcaption></figure>
</div>

Let node pose be transformation $T_i$ and edge measurement $Z_{ij}$ from $i$ to $j$. A local error can be written in the tangent space of the transformation group:

$$e_{ij}(x)=\operatorname{Log}\left(Z_{ij}^{-1}T_i^{-1}T_j\right).$$

With information matrix $\Omega_{ij}$, solve

$$x^*=\arg\min_x\sum_{(i,j)\in E} e_{ij}(x)^\top\Omega_{ij}e_{ij}(x).$$

One pose must be fixed to remove gauge freedom: relative measurements cannot determine the global origin. Robust loss may downweight false loop closures, but should be justified by residual diagnostics.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/graph-09.webp" alt="Pose parameterization"><figcaption>Minimal pose coordinates support optimization while transformations support composition.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-10.webp" alt="Pose graph error function"><figcaption>The edge error compares measured and predicted relative transformations.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-11.webp" alt="Pose graph residual visualization"><figcaption>Residual arrows make individual constraint disagreement visible.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-12.webp" alt="Graph optimization objective"><figcaption>The global objective is a weighted nonlinear least-squares problem.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-13.webp" alt="Perfect loop agreement"><figcaption>When all relative poses agree, every residual vanishes.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-14.webp" alt="Nonconsecutive constraint"><figcaption>A loop closure distributes correction across the cycle.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-15.webp" alt="Large-error loop closure"><figcaption>One long-range measurement may dominate unless covariance and robustness are modeled.</figcaption></figure>
</div>

Gauss–Newton linearizes $e_{ij}(x+\Delta x)\approx e_{ij}(x)+J_{ij}\Delta x$ and solves

$$H\Delta x=-b,\qquad H=\sum J_{ij}^\top\Omega_{ij}J_{ij},\quad b=\sum J_{ij}^\top\Omega_{ij}e_{ij}.$$

Because each edge touches only two nodes, $J$, $H$, and the linear system are sparse. Exploiting sparsity changes a seemingly huge problem into a practical one.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/graph-16.webp" alt="Taylor linearization"><figcaption>Linearization is local, so initialization and iteration matter.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-17.webp" alt="Gauss Newton algorithm"><figcaption>Each iteration builds and solves a local least-squares system.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-18.webp" alt="Normal equation blocks"><figcaption>Each edge contributes small blocks to the global vector and matrix.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-19.webp" alt="Jacobian structure"><figcaption>An edge residual depends only on its incident nodes.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-20.webp" alt="Sparse Jacobian"><figcaption>Most Jacobian blocks are zero.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-21.webp" alt="Sparse Hessian consequence"><figcaption>Adjacency determines the normal matrix sparsity.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-22.webp" alt="Sparse vector blocks"><figcaption>Vector contributions touch only the two linked state blocks.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-23.webp" alt="Sparse matrix blocks"><figcaption>Matrix contributions form diagonal and paired off-diagonal blocks.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-24.webp" alt="Edge block contribution"><figcaption>The algebra mirrors the graph's local structure.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-25.webp" alt="Hessian coefficient matrix"><figcaption>Nonzeros appear only between related pose blocks.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-26.webp" alt="Linearized system"><figcaption>The increment vector, gradient, and sparse Hessian form one system.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-27.webp" alt="Building the linear system"><figcaption>Accumulate edge contributions rather than constructing dense matrices.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/graph-28.webp" alt="Final pose graph algorithm"><figcaption>Fix a gauge, iterate, check residuals, and stop on justified tolerances.</figcaption></figure>
</div>

## Competition preparation shown in the course

The final lecture covers logistics as part of modeling quality: install and test the environment, prepare templates, collect trustworthy references, agree on file ownership, practice diagrams, and make an offline fallback. During competition, inspect all prompts before choosing; check data accessibility, team fit, model opportunities, and the risk of an attractive but underspecified problem.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/studio-02.webp" alt="Software preparation"><figcaption>Install Python/Matlab/solver tools before the clock starts.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-03.webp" alt="Reference preparation"><figcaption>Prepare legitimate model and writing references.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-04.webp" alt="Figure preparation"><figcaption>Keep reusable figure principles, not copied results.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-05.webp" alt="Collaboration preparation"><figcaption>Test shared writing and version control.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-06.webp" alt="Model preparation"><figcaption>Review model families and their assumptions.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-07.webp" alt="Physical workspace preparation"><figcaption>Power, network, food, sleep, and backups affect reliability.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-08.webp" alt="Competition schedule"><figcaption>Front-load prompt analysis, baseline, and evidence planning.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-09.webp" alt="Problem selection tips"><figcaption>Choose with evidence about fit, data, and tractability.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-10.webp" alt="Model selection tips"><figcaption>Prefer clear, robust, interpretable models over fashionable complexity.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-11.webp" alt="Equation and writing checks"><figcaption>Use consistent notation and define every symbol.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-12.webp" alt="Writing checklist"><figcaption>Write a logical chain from observation to choice to result.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-13.webp" alt="Team coordination"><figcaption>Integrate continuously instead of merging independent papers at the end.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-14.webp" alt="LaTeX workflow"><figcaption>Control figures, tables, references, and pagination early.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-15.webp" alt="Final formatting checks"><figcaption>Formatting and anonymity are hard constraints.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-16.webp" alt="Final submission cautions"><figcaption>Open the final file and verify every required artifact.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/studio-17.webp" alt="Course encouragement"><figcaption>Reliable preparation creates room for creative modeling.</figcaption></figure>
</div>

## Second mock case: read figures as a model pipeline

The second mock material contains process architecture, time-series comparisons, heat maps, regression diagnostics, and final strategy comparisons. Use them as a cold-reading exercise: reconstruct the question, variables, method, result, and limitation from each figure, then check whether the caption supports that reconstruction.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/mock-03.webp" alt="Mock-case system architecture"><figcaption>Start by identifying subsystem boundaries and outputs.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-06.webp" alt="Mock-case conceptual framework"><figcaption>A conceptual framework should correspond to calculable modules.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-07.webp" alt="Mock-case time series"><figcaption>Compare observed dynamics before selecting a predictor.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-08.webp" alt="Mock-case heat map"><figcaption>A heat map reveals interactions only with defined axes and scale.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-09.webp" alt="Mock-case statistical table"><figcaption>Connect each table statistic to a claim and unit.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-10.webp" alt="Mock-case process diagram"><figcaption>Processes are evidence when arrows represent explicit transformations.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-13.webp" alt="Mock-case regression panels"><figcaption>Panels compare fit, uncertainty, and regime behavior.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-14.webp" alt="Mock-case sensitivity panels"><figcaption>Multiple scenarios reveal which conclusions are stable.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-15.webp" alt="Mock-case mechanism diagram"><figcaption>A mechanism diagram explains why a statistical relation may generalize.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-19.webp" alt="Mock-case distribution and time plots"><figcaption>Distribution and temporal evidence should be read together.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-21.webp" alt="Mock-case result tables"><figcaption>Tables retain exact values while figures expose structure.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-22.webp" alt="Mock-case comparison chart"><figcaption>Use aligned baselines and uncertainty for method comparisons.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-23.webp" alt="Mock-case ranking table"><figcaption>Rankings need score contributions and sensitivity.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-24.webp" alt="Mock-case strategy bars"><figcaption>A strategy comparison should report real decision units.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock-25.webp" alt="Mock-case final comparison"><figcaption>Final alternatives should be compared on all required objectives.</figcaption></figure>
</div>

## Forty-minute studio simulation

Use a fresh prompt. In ten minutes build the requirement and dependency maps; in ten build a baseline and one falsification test; in ten design the result table and figures before computing; in ten conduct a cold-read submission audit. Repeat under a strict file-freeze deadline. The goal is to practice the complete research system, not one algorithm.

## First mock submission: evidence audit

The first mock submission adds a second set of worked outputs. Rather than copying its formulas, use the images below to practice traceability: every architecture, fit, heat map, table, and robustness plot must map to a requirement, equation, and decision statement.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/mock1-02.webp" alt="First mock problem structure"><figcaption>Translate the prompt into objects, states, and outputs.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-03.webp" alt="First mock exploratory plot"><figcaption>Exploration should motivate the next model assumption.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-04.webp" alt="First mock architecture"><figcaption>Architecture shows how subproblems exchange information.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-05.webp" alt="First mock fitted relationship"><figcaption>Show raw points, fitted relation, and uncertainty together.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-07.webp" alt="First mock time-series comparison"><figcaption>Compare methods on a common time axis and holdout.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-08.webp" alt="First mock heat map"><figcaption>Heat-map axes and color scale must be interpretable.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-10.webp" alt="First mock mechanism diagram"><figcaption>A diagram should reveal the variables entering each module.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-12.webp" alt="First mock geometric output"><figcaption>Geometric outputs should preserve scale and constraints.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-13.webp" alt="First mock sensitivity output"><figcaption>Multiple scenarios reveal interactions and failure boundaries.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-20.webp" alt="First mock result comparison"><figcaption>Tables and bars should use identical alternatives and units.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-21.webp" alt="First mock robustness panels"><figcaption>Robustness is a range of conclusions, not one extra number.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/mock1-23.webp" alt="First mock final comparison"><figcaption>End with decision alternatives and their trade-offs.</figcaption></figure>
</div>
