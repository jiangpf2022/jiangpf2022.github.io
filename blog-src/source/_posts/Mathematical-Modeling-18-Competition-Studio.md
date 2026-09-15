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

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **operating the complete modeling process under time pressure while keeping every claim auditable**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **A team must choose among prompts with different data, mathematics, and validation opportunities.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

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


## A complete mock competition, hour by hour

Let us rehearse the opening of a competition. The prompt gives a large table of noisy measurements, asks us to explain the system, predict future behavior, and recommend a policy. The team’s first temptation is to split the questions among three people and start coding. Resist it for one hour.

### Hour 0–1: build one shared interpretation

Every teammate reads the entire prompt and writes the requested outputs as concrete nouns: a cleaned dataset, an estimated state, a forecast, a decision policy, a sensitivity result. Compare interpretations line by line. Highlight ambiguous words such as “optimal,” “stable,” “important,” and “accurate.” These words do not yet define mathematical criteria.

Create a data dictionary immediately. For every column record unit, observational unit, time stamp meaning, valid range, missing-value code, and whether the value would be known when a future decision is made. Make a row-count ledger after every merge or filter. Losing 30% of the observations silently is not preprocessing; it is an undocumented change to the population.

At the end of the first hour, write a provisional answer to every subproblem in one sentence. The answers may be crude, but they reveal whether the planned modules form a complete chain.

### Hour 1–3: establish the minimum complete pipeline

Build the least sophisticated method that produces every requested output. For noisy graph measurements, this may be anchored least squares. For forecasting, use persistence and seasonal naïve. For a decision problem, construct a feasible heuristic. For evaluation, begin with transparent normalization and equal weights.

Run the full pipeline on a small slice and save the outputs. Check coordinate frames, time order, units, and feasibility by hand. A baseline generated in the first three hours becomes a safety net: every later extension can be compared against it, and the team can still submit a coherent result if an ambitious method fails.

Write the methods skeleton while the baseline is being built. Each subsection should already contain the question, inputs, output, core equation or procedure, and planned validation. Blank spaces expose missing reasoning early enough to fix it.

### Hour 3–8: diagnose before extending

Do not add a neural network, metaheuristic, or complicated weighting scheme merely because it is familiar. Inspect where the baseline fails. Plot residuals against time, scale, geography, and operating regime. Check constraint violations and cases with large regret. Compare training and held-out error. The failure pattern chooses the extension.

If residual variance grows with magnitude, consider a transformation or heteroscedastic model. If a route heuristic violates capacity, improve the representation or repair rule before tuning search parameters. If a ranking changes under tiny weight perturbations, report instability and revisit the indicator system. Each extension should have a named failure mode and a planned ablation.

Maintain a model ledger with columns for version, hypothesis, change, validation design, result, decision, and owner. This prevents the team from remembering only the best-looking run and gives the paper an honest record of why the final model exists.

### Hour 8–16: create evidence, not screenshots

Freeze the evaluation protocol before extensive tuning. Use the same splits, scenarios, budgets, and metrics for every competing method. Run repeated seeds where randomness matters. Save raw metrics in a table from which all summary figures are generated.

Every important claim needs an evidence object. “The alignment is accurate” needs held-out residuals or an external reference. “The algorithm is robust” needs perturbation or scenario results. “The policy is better” needs a baseline under identical constraints. Assign each claim a table, figure, theorem, or diagnostic and put the reference into the draft immediately.

For the pose-graph case, check gauge freedom before trusting the optimizer. Fix one pose or add a justified prior. Verify relative-transform direction and rotation conventions on a three-node graph whose solution can be computed manually. Then inspect residuals by edge type; a low global cost can still hide a few destructive loop closures.

### Hour 16–28: integrate uncertainty and interpretation

Separate parameter uncertainty, data noise, scenario uncertainty, and model-form uncertainty. Not all of them need the same machinery. Bootstrap intervals can describe sampling variation; Monte Carlo scenarios can propagate uncertain inputs; alternative model families can expose structural dependence; robust optimization can protect a decision against a declared uncertainty set.

Translate uncertainty into the decision. If several parameter values produce the same facility locations, the recommendation is stable even if the precise objective varies. If a small plausible change reverses the chosen policy, the honest conclusion is conditional. A sensitivity result is useful when it tells the decision maker what must be measured or monitored next.

Write limitations as boundaries, not apologies. “The model assumes demand scenarios preserve the observed spatial correlation; independent site shocks were not evaluated” is precise and actionable. “Due to limited time, the model may have errors” tells the reader nothing.

### Hour 28–40: make the paper executable

Rerun the analysis from a clean directory. The program should recreate every table and figure from declared inputs. Store random seeds and software versions. Remove manual numbers from prose by generating a result table or at least maintaining a traceability sheet that maps each reported value to an output file and code location.

Audit notation across sections. A symbol must not change meaning between estimation and optimization. Check that every index range is declared, every equation is dimensionally consistent, and every constraint can be read as a real rule. Captions should state the comparison, metric, direction of improvement, and main conclusion.

Ask one teammate who did not write a section to reproduce its central claim. Cross-review is more effective than self-review because authors automatically fill gaps with knowledge that never reached the page.

### Final ninety minutes: freeze and verify

Stop changing the model. Regenerate the PDF, inspect every page, confirm fonts and equations, and check that figures remain readable at actual size. Search for placeholders, stale references, unexplained acronyms, and contradictory numbers. Recalculate a sample of totals and metrics independently.

Read the abstract next to the conclusion. They should report the same methods and numbers at different levels of detail. Read every recommendation next to its assumptions and sensitivity range. Confirm that the title and keywords describe what the paper actually contributes.

The final question is simple: can a skeptical reader trace the path from prompt to data, from data to model, from model to evidence, and from evidence to recommendation? If the answer is yes, the work is competition-ready. If the answer is no, another algorithm will not save it; repair the chain.

## Instructor’s debrief

A strong competition paper usually has fewer ideas than a weak one, but each idea is carried farther. The baseline is explicit. The main extension answers an observed failure. Validation mirrors the deployment situation. Sensitivity changes the interpretation. Figures carry claims. The recommendation is bounded by assumptions.

When you practice, score yourself on completeness before sophistication. Could another team reproduce the result? Can you explain one failed approach and what it taught you? Does each subproblem contribute to the final decision? Can you identify the single assumption most likely to reverse the conclusion? These questions reward modeling maturity rather than algorithm collecting.

For a final exercise, take either mock problem in the course materials and prepare a two-minute oral defense. Spend thirty seconds on the real question, thirty seconds on the model, thirty seconds on validation, and thirty seconds on limitations and recommendation. If any segment feels empty, that is the part of the written solution that needs more work.

## A final team rehearsal

Before the real competition, run one deliberately imperfect rehearsal. Give the team a prompt, a small dataset, and four hours. For the first thirty minutes, nobody is allowed to code. The team must produce the decision sentence, data dictionary, dependency graph, baseline, and validation plan. This constraint feels slow, but it usually saves time by preventing three people from implementing incompatible interpretations.

At the halfway point, stop and conduct a red-team review. One teammate argues that the data are insufficient, one tries to violate the model’s assumptions, and one attempts to reproduce a central number without help. Record every failure. Do not defend the work verbally; improve the artifact so that the answer becomes visible in code, equations, tables, or captions.

In the final hour, change one important input and one modeling assumption. A robust workflow should regenerate the affected outputs without manual repair. Ask which conclusions survive, which weaken, and which reverse. This rehearsal tests far more than programming: it tests whether the model is modular, the evidence is traceable, and the writing tells the same story as the computation.

End with a ten-minute retrospective. Each teammate names one decision that saved time, one interface that caused confusion, and one check that caught a real error. Convert those observations into a shared checklist. The purpose of practice is not to predict the next prompt; it is to build a team process that remains reliable when the prompt is unfamiliar.

There is one more useful role in this rehearsal: the “curious judge.” This person is not trying to catch formatting mistakes. They repeatedly ask, “Why does this equation represent the situation?”, “How do you know this improvement is real?”, and “What would make you change the recommendation?” A team that can answer those questions with evidence has probably built a coherent model. A team that answers with software names has probably skipped part of the reasoning chain.

After the rehearsal, keep the artifacts that are reusable: plotting functions, table styles, solver-audit code, time-aware validation utilities, unit checks, and the paper skeleton. Do not keep a giant black-box template that forces every future problem into the same method. The reusable asset is a disciplined workflow. On competition day, that workflow gives you enough calm to understand the new problem before trying to impress anyone with the solution.

Finally, remember that clarity is not a reduction in mathematical depth. The strongest paper can state a difficult idea in ordinary language, express it precisely in mathematics, verify it computationally, and return to ordinary language with a bounded recommendation. That four-step movement is what the studio is training.


<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **operating the complete modeling process under time pressure while keeping every claim auditable**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Problem selection

**Here is the problem.** A team must choose among prompts with different data, mathematics, and validation opportunities. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Score understanding, data access, baseline feasibility, differentiation, and verification risk during the first hours. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Choose the problem for which the team can build and test a complete argument, not the one with the most fashionable vocabulary. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Pose graph

**Here is the problem.** Estimate robot poses from noisy relative measurements on a graph. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Define residuals on edges, fix gauge freedom, use sparse nonlinear least squares, and inspect loop-closure residuals. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A small objective value is meaningful only after frame conventions, anchors, and residual units are verified. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Market simulation

**Here is the problem.** Use noisy historical and scenario data to propose a decision policy. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Separate prediction from action, compare against simple policies, and evaluate regret and constraint violations. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The policy must survive plausible futures rather than merely explain the past. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Final audit

**Here is the problem.** Ninety minutes remain before submission. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Freeze model changes, rerun the paper from a clean environment, trace numbers, inspect captions, and test the PDF. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A reproducible modest model beats an impressive result that cannot be regenerated or explained. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: prompt translation

Let us slow down at **prompt translation**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats prompt translation as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: operating the complete modeling process under time pressure while keeping every claim auditable. Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use prompt translation to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: baseline pipeline

Let us slow down at **baseline pipeline**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats baseline pipeline as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: operating the complete modeling process under time pressure while keeping every claim auditable. Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use baseline pipeline to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: team interfaces

Let us slow down at **team interfaces**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats team interfaces as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: operating the complete modeling process under time pressure while keeping every claim auditable. Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use team interfaces to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: model ledger

Let us slow down at **model ledger**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats model ledger as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: operating the complete modeling process under time pressure while keeping every claim auditable. Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use model ledger to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: evidence trace

Let us slow down at **evidence trace**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats evidence trace as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: operating the complete modeling process under time pressure while keeping every claim auditable. Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use evidence trace to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: submission audit

Let us slow down at **submission audit**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats submission audit as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: operating the complete modeling process under time pressure while keeping every claim auditable. Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use submission audit to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Problem selection

Let us revisit **Problem selection**, but this time you are doing the talking. The situation is still this: A team must choose among prompts with different data, mathematics, and validation opportunities. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Score understanding, data access, baseline feasibility, differentiation, and verification risk during the first hours. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Choose the problem for which the team can build and test a complete argument, not the one with the most fashionable vocabulary. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Problem selection in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Pose graph

Let us revisit **Pose graph**, but this time you are doing the talking. The situation is still this: Estimate robot poses from noisy relative measurements on a graph. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Define residuals on edges, fix gauge freedom, use sparse nonlinear least squares, and inspect loop-closure residuals. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A small objective value is meaningful only after frame conventions, anchors, and residual units are verified. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Pose graph in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Market simulation

Let us revisit **Market simulation**, but this time you are doing the talking. The situation is still this: Use noisy historical and scenario data to propose a decision policy. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Separate prediction from action, compare against simple policies, and evaluate regret and constraint violations. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The policy must survive plausible futures rather than merely explain the past. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Market simulation in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Final audit

Let us revisit **Final audit**, but this time you are doing the talking. The situation is still this: Ninety minutes remain before submission. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Freeze model changes, rerun the paper from a clean environment, trace numbers, inspect captions, and test the PDF. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A reproducible modest model beats an impressive result that cannot be regenerated or explained. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Final audit in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect prompt translation to baseline pipeline

Draw two boxes labeled **prompt translation** and **baseline pipeline**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from prompt translation to baseline pipeline; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind operating the complete modeling process under time pressure while keeping every claim auditable to remain auditable.

### Board exercise 2: connect baseline pipeline to team interfaces

Draw two boxes labeled **baseline pipeline** and **team interfaces**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from baseline pipeline to team interfaces; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind operating the complete modeling process under time pressure while keeping every claim auditable to remain auditable.

### Board exercise 3: connect team interfaces to model ledger

Draw two boxes labeled **team interfaces** and **model ledger**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from team interfaces to model ledger; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind operating the complete modeling process under time pressure while keeping every claim auditable to remain auditable.

### Board exercise 4: connect model ledger to evidence trace

Draw two boxes labeled **model ledger** and **evidence trace**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from model ledger to evidence trace; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind operating the complete modeling process under time pressure while keeping every claim auditable to remain auditable.

### Board exercise 5: connect evidence trace to submission audit

Draw two boxes labeled **evidence trace** and **submission audit**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from evidence trace to submission audit; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind operating the complete modeling process under time pressure while keeping every claim auditable to remain auditable.

### Board exercise 6: connect submission audit to prompt translation

Draw two boxes labeled **submission audit** and **prompt translation**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from submission audit to prompt translation; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind operating the complete modeling process under time pressure while keeping every claim auditable to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a complete competition package with a runnable pipeline, model ledger, assumption table, verified figures, sensitivity results, contribution log, and final PDF audit checklist. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

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
