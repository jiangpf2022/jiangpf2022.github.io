---
title: 2 - Competition Techniques
date: 2026-09-19 00:00:00
permalink: 2026/09/19/Mathematical-Modeling-02-Competition-Techniques/
categories: Mathematical Modeling
tags:
  - Competition Strategy
  - Modeling Tools
  - AI for Modeling
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 55
lesson_number: 2
lesson_level: 1
review_lock: false
excerpt: "A practical competition guide to selecting problems, building a reliable toolchain, learning from strong papers, reproducing visual evidence, extending algorithms, and using AI without surrendering judgment."
---

The competition clock has not started yet, so this is the right moment to slow down. Put the algorithm list aside; today we are going to rehearse the decisions that prevent a team from losing ten hours before the real modeling has even begun.

The first blog was about the discipline of turning reality into a model. This one is about what happens when the clock starts. A competition gives you several unfamiliar problems, a small team, incomplete information, and a deadline. The temptation is to hunt immediately for an impressive algorithm. Resist it. Most teams do not lose because they never heard of a sufficiently advanced method; they lose time because they choose a problem for the wrong reason, build modules in the wrong order, cannot reproduce one another's work, or use tools without deciding what each tool is responsible for.

This blog is therefore not a catalogue of tricks. It is an operating manual. We will compare the problem families in CUMCM and MCM/ICM, design the first ninety minutes, build a reproducible toolchain, and turn daily preparation into three habits: reading strong papers, reconstructing effective visualizations, and extending algorithms beyond what I can cover here. The final part is a detailed guide to ChatGPT. AI can be a tireless sparring partner, but it cannot become the unnamed author of your evidence, your citations, or your judgment.

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/modeling-02-competition-map.svg" alt="Competition workflow from problem selection to a checked submission">
  <figcaption>A successful competition paper is a connected system: selection, modeling, computation, evidence, writing, and final verification must hand work to one another.</figcaption>
</figure>

## Competition Formats and Problem Selection

CUMCM and MCM/ICM are not the same contest translated into two languages. CUMCM is organized by the Chinese Society for Industrial and Applied Mathematics. Its official charter describes problems simplified from science, engineering, humanities, social science, economics, and management; teams should be able to work from ordinary university mathematics rather than specialized prior knowledge. MCM/ICM is organized by COMAP, and a team chooses one of six named problem families. The format, language, timetable, report rules, and award structure differ, so check the current official instructions rather than inheriting last year's checklist from a senior student.

Problem selection should begin with *fit*, not fear. For every candidate problem, ask five questions:

1. Can we restate the decision or prediction in two sentences?
2. Do we understand the units, data, and major constraints well enough to build a baseline today?
3. Does at least one teammate recognize a useful mechanism, not merely an algorithm name?
4. Can we imagine two or three figures that would make the final argument visible?
5. Is there a credible path from the first subproblem to the last, or do later tasks depend on evidence we cannot obtain?

A problem full of familiar vocabulary can still be a poor choice if the final task asks for a policy argument your team cannot support. An unfamiliar context can be a good choice if the mathematical structure is clear and the data are usable. Spend enough time to compare complete problem chains, but set a decision deadline. Endless selection is itself a decision: it chooses to leave less time for modeling.

## CUMCM Problem Ecology

The official CUMCM archive is the source of truth about what was actually asked. Recent competitions may include several lettered problems; the letters are identifiers, not permanent guarantees that a certain algorithm will appear. Informal advice such as “A is physical, B is optimization, C is data” can help you scan older papers, but it must never replace reading the current prompt. The organizers explicitly describe the source of problems broadly, and recent official review activities discuss A through E. Treat every year's set as new.

Still, historical *structures* are useful. Engineering and physical-system prompts often ask you to convert geometry, force, heat, flow, or motion into state equations, then calibrate unknown parameters and design an operating strategy. Their danger is false precision: a beautiful differential equation is not persuasive if the boundary conditions or units are invented. Begin with a diagram, a conservation statement, and one hand-checkable limiting case.

Operations and decision prompts often combine allocation, scheduling, routing, evaluation, and sensitivity. Their danger is premature optimization. Before choosing a solver, separate variables you control from observations you merely estimate. Write the objective in plain language and list hard constraints. If two objectives conflict, do not hide one in an arbitrary weight without explaining how the weight affects the recommendation.

Data-oriented prompts often contain spreadsheets, images, time series, or multiple tables whose definitions do not line up neatly. Their danger is treating cleaning as clerical work. Missingness, duplicate entities, inconsistent time zones, target leakage, and changing measurement rules can determine the answer before any model is fitted. Create a data dictionary and a row-count audit; preserve the raw files; make every transformation reproducible.

Evaluation and policy prompts ask you to construct indicators, rankings, or recommendations for stakeholders. Their danger is confusing a score with truth. Explain why each indicator belongs, how scales are normalized, how weights are chosen, and whether modest changes reverse the ranking. A recommendation should identify who can act, what they should do, and what evidence would trigger revision.

The practical lesson is simple: do not choose CUMCM Problem A because you are “the differential-equation team,” or Problem C because you know machine learning. First identify the actual mechanism and evidence path. Then ask whether your team can complete a modest version of that path under the deadline.

## MCM/ICM Problem Families

COMAP currently describes six families: **MCM A, continuous; MCM B, discrete; MCM C, data insights; ICM D, operations research/network science; ICM E, sustainability; and ICM F, policy**. A team chooses one problem. These labels are more explicit than the folk categories used for CUMCM, but they are still starting points rather than recipes.

### MCM A: Continuous Models

Continuous problems often involve quantities that vary over time or space: temperature, energy, population, fluid flow, wear, or physical motion. Differential equations, difference equations, simulation, parameter estimation, and sensitivity analysis are common tools. Start by naming the state and writing what changes it. Check units before solving. A numerical curve is not evidence until you compare it with a limiting case, observed value, or alternative baseline.

### MCM B: Discrete Models

Discrete problems often center on arrangements, routes, schedules, geometry, or combinatorial decisions. Graphs, integer programming, dynamic programming, heuristics, and simulation may appear. The central question is not “which search algorithm is strongest?” but “what makes a candidate feasible, and what quantity distinguishes a useful solution?” Build a tiny instance whose optimum you can reason about by hand before trusting a large search.

### MCM C: Data Insights

Problem C usually makes the dataset part of the problem rather than background decoration. The workflow includes inspection, cleaning, feature design, exploratory visualization, modeling, validation, and interpretation. A high predictive score is not enough if the feature would be unavailable at decision time. Use a defensible train/test split, compare with a simple baseline, and connect each visualization to a claim.

### ICM D: Operations Research and Network Science

Problem D often concerns connected systems: transportation, communication, supply, influence, sports, or infrastructure. Nodes and edges are useful only after their meanings are declared. Explain whether an edge records distance, cost, capacity, similarity, or probability. Network centrality can describe structure, but it does not automatically identify the best intervention. Couple the network metric to the stakeholder's decision.

### ICM E: Sustainability

Sustainability problems require more than adding an environmental term to a cost function. They usually combine physical limits, human behavior, long time horizons, uncertainty, and several stakeholders. Define the system boundary carefully: shifting emissions, risk, or resource use outside the boundary is not genuine improvement. Report trade-offs instead of compressing every concern into one opaque score.

### ICM F: Policy

Policy problems ask for recommendations in a world where values, incentives, uncertainty, and implementation matter. Quantitative evidence should clarify consequences, not pretend to eliminate judgment. Distinguish observation from assumption, prediction from preference, and a scenario from a forecast. A strong policy paper names affected groups, implementation steps, possible unintended effects, and a monitoring plan.

### Worked selection example: three problems, one team

Imagine that your team finds three plausible choices. Problem A describes an ecological population whose sex ratio changes with environmental conditions. Problem C provides a large transaction table and asks for patterns and forecasts. Problem F asks for a policy that balances access, cost, and fairness. One teammate knows differential equations, another writes reliable Python, and the third writes clearly.

The beginner's vote is often “choose C because it has data” or “choose A because equations look impressive.” A better comparison gives every problem four entries: one candidate decision, one baseline, one validation route, and one likely bottleneck. For A, these might be an intervention threshold, a two-stage population baseline, equilibrium checks, and parameter identification. For C: inventory allocation, a seasonal-naive forecast, blocked time-series testing, and leakage. For F: a phased allocation rule, equal-per-capita allocation, subgroup scenario analysis, and unsupported causal assumptions.

Now the trade-off is visible. If no one can explain how A's parameters could be identified, elegant ODEs will not rescue it. If C has abundant data but no decision, the team may produce twenty charts without answering the question. If F admits a transparent trade-off model, good writing becomes an analytical advantage. Selection is not about finding the safest letter. It is about exposing the work you will actually have to finish.

### Real case: 2024 MCM Problem A and the lamprey ecosystem

The 2024 MCM Problem A asked teams to study how a sea-lamprey population and its ecosystem may change when larval sex ratios respond to food availability. COMAP's Outstanding papers used different architectures—stage-structured dynamics, resource feedback, stability analysis, and scenario comparison—but they all had to turn the same biological story into testable modules.

A minimal state might be $x_t=(L_t,M_t,F_t,R_t)$: larvae, reproductive males, reproductive females, and a food-resource index. A stage model can be written

$$x_{t+1}=A(R_t)x_t,$$

while a bounded response connects resources to the female share,

$$s(R)=s_{\min}+\frac{s_{\max}-s_{\min}}{1+e^{-k(R-R_0)}}.$$

The mechanism is now inspectable: resources change $s$, sex composition changes reproduction, reproduction changes future larvae, and lamprey abundance feeds back into resources. Before adding predators and competitors, check nonnegative states, sensible equilibria, and limiting behavior under abundant and scarce food.

Each figure should test a different claim. A time-series panel compares abundance under fixed and adaptive sex ratios. A phase portrait shows whether the system returns to equilibrium. A sensitivity plot reveals whether conclusions depend mostly on maturation, fecundity, or the response slope $k$. When reading an Outstanding paper, ask what state was sufficient, which causal arrow became each equation, which parameters came from evidence, and what disappears when the adaptive-sex mechanism is removed. The final question is an ablation test: it prevents a large model from receiving credit for behavior already produced by its baseline.

### Real case: 2024 CUMCM crop planning

The 2024 CUMCM C problem asked for multi-year planting decisions across plots, greenhouse types, seasons, and crops. Public excellent papers add heuristics, uncertainty, CVaR, correlation, and heatmaps. The essential competition skill comes earlier: preserve time order while translating agricultural rules.

Let $x_{itsk}$ be the area of crop $k$ on plot $i$, in year $t$ and season $s$. “Each plot must contain a legume at least once in every three years” becomes a rolling-window constraint. “Do not continuously plant the same crop” couples adjacent seasons. “Production beyond demand is wasted or discounted” requires sales variables instead of pretending every harvested kilogram earns the listed price.

The large index set may tempt a team to assume that only a genetic algorithm is possible. In fact, much of the model is a mixed-integer linear program. Build a reduced exact version with two years, several plots, and a few crops before committing to a heuristic. Enumerate the tiny instance by hand, then implement it. A mismatch usually reveals an incorrect time index, a missing compatibility rule, revenue counted beyond demand, or a binary variable not linked to planting area. This reconstruction teaches more than collecting ten algorithm names, because it creates an auditable ground truth for the full solver.

The 2026 official problem set illustrates the breadth: smartphone battery drain, a moon-colony space-elevator system, data about stars, sports management, passive solar shading, and generative-AI education policy. That variety is exactly why memorizing one algorithm per letter is fragile. Read the current problem, then choose the mathematical language.

### A quantitative selection matrix without mechanical scoring

When several problems remain plausible, use a matrix to make disagreement visible. Rows are candidate problems. Columns can include decision clarity, usable data, baseline feasibility, validation path, team experience, computational risk, writing fit, and extension potential. Score each from one to five, but write one sentence of evidence next to every score.

Suppose three candidates receive these provisional entries:

| Criterion | Physical system | Network allocation | Data forecast |
|---|---:|---:|---:|
| Decision clarity | 4 | 3 | 2 |
| Baseline today | 5 | 3 | 4 |
| Validation path | 4 | 2 | 3 |
| Team experience | 3 | 2 | 5 |
| Computational risk | 4 | 2 | 3 |
| Writing fit | 4 | 3 | 3 |

The numbers do not choose for you. They reveal that the network problem's weak point is not unfamiliar vocabulary but validation and computational risk. The data problem has familiar tools but an unclear decision. The physical problem has a strong baseline and evidence path even though the differential equations are less familiar. Discuss the weak essential columns before totals.

Weights can express team priorities, but do not manufacture precision. If validation is indispensable, treat a score below two as a veto rather than compensating it with attractive extension potential. Repeat the matrix after a thirty-minute baseline sprint; evidence should replace guesses.

### The baseline sprint in detail

For each tied problem, produce four artifacts in thirty minutes:

1. a two-sentence decision statement;
2. one equation, rule, or data transformation that forms a baseline;
3. one hand-checkable toy result;
4. one paragraph describing how the final result would be validated.

For a battery problem, draw energy flows and compute endurance under constant power. For a routing problem, solve a four-node case. For a data problem, calculate a seasonal-naive forecast and a chronological error. The sprint is not intended to solve the problem. It tests whether the team can move from words to evidence.

Watch which difficulties appear. Missing units suggest the prompt has not been understood. A baseline that needs unavailable parameters signals an identification risk. A validation paragraph that says only “compare with reality” signals missing data or an undefined metric. These are early warnings worth more than confidence based on an algorithm name.

### Dependency graphs for multi-part prompts

Competition prompts often contain four or five tasks whose dependencies are not written in order. Draw a directed graph. A data-cleaning node may feed parameter estimation; parameters feed a simulation; simulation outputs feed an optimization; policy analysis feeds the final recommendation.

Label every arrow with its object and uncertainty. “Forecast to optimizer” is vague. “Hourly arrival scenarios with probabilities” is actionable. If the optimizer needs a distribution but the forecasting module returns only a mean, the handoff contract is broken before code exists.

Mark nodes that can proceed in parallel. A teammate can build the report skeleton while another audits data, but writing final conclusions depends on validated results. A visualization module can develop style and figure templates, but actual plots must come from frozen data and code. Parallel work should reduce delay without separating logic.

Identify the critical path. If the final policy depends on a simulation that depends on calibrated parameters, parameter identification is high priority. An optional sensitivity appendix is not. Revisit the graph when a module fails; perhaps a simpler route bypasses it.

### Red flags in problem selection

Several phrases should trigger questions:

- “Develop a comprehensive index” — comprehensive for which decision, and how will weights be justified?
- “Predict the future” — at what horizon, using information available when, and against which baseline?
- “Optimize the system” — which variables are controllable and which constraints are hard?
- “Evaluate the impact” — causal impact, association, or scenario comparison?
- “Design a fair policy” — fair across which groups and metric?
- “Build a realistic model” — which observable behavior will determine adequacy?

These are not reasons to reject a prompt. They identify work that must appear in the paper. A team strong in policy reasoning may welcome an ambiguous fairness question. A team without evidence or stakeholder definitions should be cautious.

### A CUMCM-style engineering example: thermal processing

Imagine a moving product passes through several temperature zones. The decision is conveyor speed and zone settings. Product temperature lags ambient zone temperature. A first-order model is

$$\frac{dT}{dt}=k(x(t))[T_a(x(t))-T(t)],$$

where position $x(t)=vt$ depends on speed $v$. The prompt may ask the product to remain above a threshold for a specified duration, limit maximum heating rate, and avoid excessive peak temperature.

The baseline treats $k$ as constant and zone air temperatures as piecewise constant. It can be integrated analytically within each zone or numerically. A hand check confirms that $T$ moves toward $T_a$ and cannot instantly jump. Validation uses measured temperature at one speed; transfer testing uses another speed.

The optimization is not the first task. First estimate $k$, confirm units, and calculate process metrics from a temperature curve. Then search feasible speeds. A recommendation is credible only if parameter uncertainty and measurement noise do not move it outside the feasible interval.

This example favors a team that recognizes dynamics, calibration, and thresholds. A team merely excited about particle swarm optimization might search speed before the temperature model is trustworthy.

### A data-insights example: event demand

Suppose records contain date, location, event category, ticket price, promotion, weather, and attendance. The task asks for demand prediction and resource allocation. Define prediction time. Weather forecasts available a week ahead differ from realized weather. Promotion may be decided after an early demand signal, creating leakage or endogeneity.

A baseline predicts attendance from historical median by venue and weekday. Split data chronologically. Inspect whether venue names change, cancellations are encoded, and capacity censors attendance. A model that predicts observed attendance cannot learn latent demand above capacity without additional information.

The downstream allocation needs a distribution or quantiles, not only a point forecast. Underprediction creates shortage; overprediction wastes resources. Use asymmetric loss or scenario optimization. This handoff should be recognized during selection.

### A policy example: access under limited funding

Suppose a city allocates grants across neighborhoods to improve access to cooling centers. Data include population, age, income, transit, temperature, and current facilities. The decision is funding and facility hours. A weighted vulnerability score is descriptive unless it is connected to a mechanism or allocation rule.

Start with equal per-capita allocation, then compare need-based alternatives. Define access—distance, travel time, opening hours, capacity, or probability of service. Report subgroup outcomes. A policy model should show trade-offs and implementation, not disguise value judgments as an objective weight.

Validation may include historical heat events, held-out neighborhoods, or scenario simulation. Causal claims about health outcomes require stronger evidence than ranking. A team that can write carefully about uncertainty and equity may perform well even without a complicated algorithm.

### The final selection conversation

Each teammate should answer three questions aloud: What is the smallest complete model? What result would convince a skeptical reader? What is most likely to fail? If answers differ radically, the team has not formed a shared problem representation.

Choose, record why, and set a condition for reopening. For example, reopen only if the dataset lacks a required field or the baseline cannot be made feasible within two hours. Do not reopen because another problem looks more exciting after hard work begins.

## The First Ninety Minutes

### Minute-by-minute outputs

The first ninety minutes should produce inspectable artifacts rather than a long discussion.

**Minutes 0–15:** Everyone reads every prompt independently and marks decisions, outputs, constraints, data, and ambiguous terms. Independence matters; an early confident voice can anchor the team.

**Minutes 15–35:** Share restatements. Reject any restatement that begins with an algorithm. Write one candidate model contract per prompt. List required deliverables, including letters, memos, or nontechnical summaries.

**Minutes 35–60:** Run baseline sprints for the strongest candidates. Inspect supplied files. Check row counts, variable definitions, missingness, and whether data can be opened. Draw one mechanism or dependency diagram.

**Minutes 60–75:** Score risks and validation. Identify the critical path. Choose a problem unless a specified veto remains unresolved.

**Minutes 75–90:** Freeze the selection, create the project folder and report skeleton, assign first deliverables, and schedule a check-in. End with one complete baseline question and a known expected result.

The schedule is adjustable. The outputs are not: shared decision statement, baseline, validation idea, task graph, and owners.

### Role assignment by deliverable

Avoid permanent labels such as “the coding person” and “the writing person.” Assign deliverables with review partners. One teammate owns data audit and baseline code; another owns mechanism and mathematical derivation; another owns report architecture and sources. Each artifact has a checker who did not create it.

Rotate review. The writer should run one script; the coder should explain one figure; the modeler should read the conclusion. Cross-understanding reduces single points of failure and exposes mismatched assumptions.

Use short check-ins with a fixed format:

- What did I produce?
- What did I verify?
- What blocks the next module?
- Did my output contract change?

“Still working on optimization” is not a useful update. “The reduced MILP is feasible, its objective is 142, and the full data introduce 18,000 binaries; next I will test decomposition” is.

### The first complete chain

Suppose the prompt asks for emergency deliveries under road failures. The first chain might be deliberately simple:

1. clean a small road network;
2. compute shortest paths under normal roads;
3. allocate demand greedily by distance;
4. simulate one road closure scenario;
5. produce a map and service table;
6. write a paragraph explaining the recommendation and failure.

This chain may be too simple for the final paper. It proves that data, model, code, figure, and writing connect. More advanced routing, stochastic failures, and equity can be added without discovering at hour thirty that maps use different node IDs from the optimizer.

### Quality gates before expansion

Require four gates:

1. **Input gate:** data dictionary, units, row counts, and raw-file preservation.
2. **Model gate:** decision, objective, constraints, assumptions, and tiny example.
3. **Computation gate:** reproducible run, fixed configuration, and independent result check.
4. **Evidence gate:** baseline comparison, validation, sensitivity, and a figure with a claim.

Do not expand a module that has not passed its gate. A more complex forecast built on leaked features is wasted. A larger optimizer built on wrong demand accounting is worse than wasted because it can look convincing.

### Managing a failed baseline

A baseline may fail because the model is infeasible, data are insufficient, or code is wrong. Diagnose in that order with simplified cases. Remove optional constraints and see which core rules conflict. Calculate resource totals. Inspect a single data row. Test one candidate manually.

If the problem itself appears infeasible under literal interpretation, say so and examine reasonable recourse: unmet-demand variables, overtime, relaxed targets, or scenario-specific actions. Do not silently delete constraints.

Set a time box. If a module remains blocked, create a fallback path. A deterministic scenario may replace an unfinished stochastic model; a greedy feasible policy may replace a fragile heuristic. A complete defensible chain is better than disconnected sophistication.

### Competition risk register

Useful risks include:

| Risk | Early warning | Response |
|---|---|---|
| target leakage | implausibly high validation score | audit feature availability and split chronologically |
| infeasible optimizer | no candidate satisfies rules | solve a tiny instance; inspect aggregate resources |
| parameter non-identification | different parameters fit equally | profile parameters; report ranges; test decisions |
| simulation too slow | one scenario takes minutes | simplify, vectorize, use surrogate or smaller budget |
| notation drift | same symbol has two meanings | maintain one notation table and editor |
| broken reproducibility | result depends on notebook state | restart and rebuild from raw data |
| unsupported claim | conclusion has no figure/table | trace claim backward and weaken or add evidence |

Review risks at check-ins. A risk without warning and response is merely anxiety.

### Time budgeting by dependency

Allocate time to the critical path, not evenly among sections. Data audit and baseline happen early because every later module depends on them. Writing begins early but final conclusions wait for evidence. Formatting and PDF inspection need protected time at the end.

Create internal deadlines: baseline, first complete chain, frozen model, frozen figures, content-complete draft, final compile. A model can remain improvable forever. Freezing creates space to verify and communicate it.

Reserve a contingency block. If no contingency exists, every delay is borrowed from final checking. Most catastrophic submission errors are not advanced mathematical failures; they are missing pages, wrong files, unresolved references, or results that cannot be rerun.

### Decision logs prevent circular debate

Record consequential choices with date, reason, alternatives, and revisit condition. Examples: use 90th-percentile wait rather than mean because stakeholder targets peaks; use ring PSO because global topology collapsed in pilot runs; exclude one data source because timestamps are unavailable before decision.

When a teammate asks to reopen a decision, compare with the revisit condition. New evidence deserves discussion; fatigue or preference does not. The log also helps write methodology honestly.

### Source discipline from the beginning

For every external fact, save the primary source, access date, exact supported claim, and citation key. Do not collect links in chat and reconstruct them later. Distinguish a source for data from a source for method and one for context.

If AI suggests a citation, locate the real publication and verify it. Never cite a search snippet or fabricated title. Quotations are rarely necessary; paraphrase with attribution and stay within contest rules.

### The ninety-minute exit review

At the end, ask a teammate to explain the complete chain without looking at notes. They should name the decision, baseline, data, main assumption, validation, and next artifact. If they cannot, spend ten minutes aligning before splitting up.

The goal is not certainty. It is a shared, falsifiable direction with a working fallback.

Give each candidate problem the same short diagnostic rather than letting one teammate sell a favorite title. Read the full prompt once without solving. On the second pass, mark verbs such as *predict, design, rank, explain,* and *recommend*; quantities with units; hard constraints; uncertain phrases; and required deliverables. On the third pass, draw dependencies among subproblems.

Then build a one-page selection sheet. Include the decision, available data, likely state variables, a baseline method, the hardest uncertainty, one validation idea, and three possible figures. Score confidence honestly. “We know XGBoost” is not a validation idea. “We can hold out the final month and compare against a seasonal mean” is.

Once selected, create the smallest complete chain. Restate the problem. Define variables and assumptions. Produce one baseline. Generate one result. Check it. Write one paragraph interpreting it. A rough end-to-end chain tells you where the real bottleneck lies. If you spend twelve hours perfecting a forecast before discovering the optimizer needs a probability distribution rather than a point estimate, the modules were built in the wrong order.

Use input–output contracts at every handoff. A demand module accepts historical arrivals and calendar variables, and returns a distribution by hour. A simulation accepts that distribution, service-time data, and a staffing plan, and returns waits. An optimizer accepts waits, labor rules, and costs, and returns feasible schedules. Every arrow states units, shape, timing, and uncertainty. This makes both mathematics and teamwork debuggable.

Imagine that your team has three candidate prompts. The first asks for a physical model of battery temperature and energy consumption. The second asks for a route and facility plan on a network. The third provides a large table of event records and asks for prediction plus a recommendation. One teammate has studied differential equations, one writes reliable Python, and one is a strong editor but none has serious graph-optimization experience.

The wrong selection meeting sounds like this: “Battery equations look scary; networks always have standard algorithms; data means we can use machine learning.” Each sentence substitutes a stereotype for a reading. Instead, spend twenty minutes per prompt and produce the same evidence sheet.

For the battery problem, the team identifies charge level and temperature as states, usage and environment as inputs, a recurrence as a baseline, held-out discharge curves as evidence, and a design recommendation as the final output. The differential equations are unfamiliar, but the measurements and validation path are clear. For the network problem, the team can draw nodes and edges but cannot decide whether edge weights mean distance, cost, time, or reliability; later tasks require a resilience argument. The method name is familiar, but the decision contract is not. For the data problem, the table is large, yet the target definition changes across years and some columns may reveal the future. The coding is familiar, but leakage could invalidate the whole result.

Now score each candidate from one to five on problem clarity, data usability, baseline feasibility, validation, writing fit, and extension potential. Do not add the scores mechanically and obey the largest number. Discuss the weakest essential dimension. A problem with excellent extension potential but no credible validation is dangerous. A problem with a simple baseline, clear evidence, and one meaningful extension may be ideal even if it looks less glamorous.

Suppose the battery prompt wins. The first ninety minutes should end with artifacts, not enthusiasm. The team writes the state update in words, draws the energy boundary, creates a table of variables and units, plots one provided discharge curve, and writes a two-paragraph report skeleton. The Python teammate prepares data loading and a constant-rate baseline. The differential-equation teammate derives the simplest recurrence and checks a limiting case. The editor verifies that the baseline actually answers the first requested task and begins the source log. At the next check-in, each person brings an output that another person can inspect.

What if two candidates remain tied? Run a **baseline sprint**. Give each thirty minutes. For one, calculate a tiny physical example; for the other, create a four-node network and express the constraints. Try writing a result paragraph for both. The sprint reveals hidden difficulty more reliably than another abstract debate. Then choose and stop reopening the decision unless genuinely new evidence appears.

Once selected, make a risk register with three columns: failure, early warning, and response. “Thermal parameter cannot be estimated” might have the warning “different parameter sets fit equally well” and the response “report an identifiable range and test recommendation sensitivity.” “Dataset leaks target” might have the warning “near-perfect validation score from a post-event feature” and the response “audit feature availability at prediction time.” Risks become manageable when attached to observations and actions.

The ninety-minute framework is not sacred. A short contest or a very large problem set may require another schedule. Its purpose is to stop three common losses: choosing by title, coding before defining outputs, and splitting tasks before dependencies are understood. If your team already has a better practiced ritual, use it. The standard is whether it produces a defensible first chain quickly.

## A Reproducible Competition Toolchain

Tools should have separate jobs. When every idea, dataset, calculation, and paragraph lives in one giant notebook, nobody knows which result is current. The following stack is one practical option; equivalents are fine if the team practices them in advance.

<figure class="mm-figure mm-figure--compact">
  <img src="/blog/images/mathematical-modeling/modeling-02-toolchain.svg" alt="Toolchain separating knowledge, writing, computation, diagrams, and final verification">
  <figcaption>Separate responsibilities, then connect them with named files and checked handoffs. The value comes from the workflow, not from any brand.</figcaption>
</figure>

### Notion: A Shared Knowledge Base

Use Notion for material that should survive beyond one report: paper notes, model cards, useful figures, algorithm summaries, mistakes, and questions. Create a database with fields for topic, source, assumptions, inputs, outputs, validation, code link, and confidence. When you finish this blog, save the idea that mattered to you and write one sentence about what remains unclear. Shared notes let teammates learn from one another before the contest begins.

During a competition, create a compact page with the problem restatement, task graph, decision log, data dictionary, assumption ledger, and responsibilities. Do not paste final equations into five places. Link to the canonical code or writing section. A shared notebook is valuable because it reduces forgotten context, not because it looks organized.

A useful setup takes fifteen minutes. Make one top-level page for the project and six linked views: **Inbox, Sources, Model Cards, Decisions, Figures, and Tasks**. Inbox is deliberately messy; it catches a thought before it disappears. Sources stores the original link, access date, relevant quotation in your own notes, and which claim may use it. A model card records purpose, inputs, outputs, assumptions, validation, failure modes, and code location. Decisions records choices that teammates might otherwise reopen every hour. Figures stores a thumbnail, its claim, underlying script, and current status. Tasks contains an owner and a deliverable—not “work on model,” but “compare the capacity baseline with the queue simulation on Tuesday data.”

Do not confuse a database with understanding. At the end of each work block, empty Inbox: connect the note to a model or source, turn it into a task, or delete it. Add a short “why this changed” line to important decisions. If the team switches from mean wait to 90th-percentile wait, the record should say what stakeholder need or observation justified the change. This small habit prevents the report and code from silently optimizing different objectives.

### Collaborative Documents: Write While You Model

Open a shared document early. Add the problem restatement, variable table, provisional section headings, and blank figure slots. Writing reveals missing logic: if you cannot finish the sentence “we minimize ___ because ___,” your objective is not ready. Assign section owners but let one editor maintain notation and narrative consistency.

Use comments for questions, not parallel rewrites. Resolve a comment only after the decision is recorded. Near the deadline, freeze structure and edit for clarity, cross-references, units, and claims. A paper assembled from three independent mini-reports usually repeats definitions and contradicts itself.

Start with a paragraph budget. The introduction needs the decision and contribution, not a history of the entire industry. The model section needs assumptions immediately before the equations they support. The results section should follow the same order as the questions. Give every important figure a placeholder caption before the figure exists: “Figure 4 will compare observed and predicted peak wait on held-out days.” If you cannot write that sentence, the planned figure may have no job.

Use one notation sheet at the top of the document. When a teammate introduces $C$, check whether $C$ already means capacity, cost, or concentration. Choose one tense and one term for each object. During final editing, search for words such as *optimal, significant, accurate,* and *robust*. Each demands a definition or test. Replace “the model is accurate” with the metric, test set, and comparison that earned the statement.

### Python and Jupyter: Reproducible Computation

Keep raw data immutable. Put cleaning, modeling, evaluation, and figure generation into functions or scripts that can run from a fresh environment. Use a notebook for exploration, but move stable logic into modules. Fix random seeds where appropriate and record package versions. Save generated tables and figures with descriptive names rather than `final2_reallyfinal.png`.

Every model needs a tiny test. For a routing algorithm, use four nodes with an obvious shortest path. For a recurrence, verify the first two steps by hand. For an optimizer, construct one feasible and one infeasible decision and check the constraints. Print dimensions, units, missing counts, and objective components. These tests are faster than debugging a polished but impossible answer.

Use a simple project layout: `data/raw`, `data/processed`, `src`, `notebooks`, `figures`, `tables`, and `tests`. A single command or top-level script should rebuild processed data and paper assets. Put configuration—file paths, seeds, scenario parameters, and output directory—in one place. Do not hide essential preprocessing in a notebook cell that was run three hours ago and then edited.

Exploration and production have different needs. In a notebook, inspect distributions, try transformations, and make quick plots. Once a step matters to the result, move it into a named function with a docstring and a test. Restart the kernel and run from top to bottom. If the notebook fails after restart, it depends on invisible state. Export a clean environment file and ask a teammate to run the pipeline. “It works on my laptop” is not reproduction.

### LaTeX and Overleaf: Technical Typesetting

Prepare a minimal report before competition day. Confirm page size, fonts, margins, bibliography, figure placement, and PDF export. Define notation once and use labels for equations, figures, and tables. Keep each figure caption self-contained: it should state what is shown, under which scenario, and what conclusion the reader should notice.

Compilation is part of verification. Missing references, clipped figures, broken symbols, and unreadable labels are evidence that the final artifact has not been checked. One teammate should perform a clean compile and inspect the PDF page by page on another device.

Create commands or buttons for three checks: a normal compile, a clean compile that removes auxiliary files, and a final PDF inspection. Keep figure files in a dedicated directory and never paste screenshots of equations. Use vector PDF/SVG for diagrams and high-resolution raster files only when the source is raster. Set figure widths relative to the text width, then open the PDF at 100%: labels that require zooming are too small.

Bibliography entries deserve the same care as equations. Import them from the publisher or DOI record, then verify authors, title, year, and URL. Cite a source at the sentence it supports. A bibliography with twenty items at the end does not show which claim came from which source. Before submission, click links and search the PDF for unresolved `??` references.

### draw.io or PowerPoint: Structural Diagrams

Use diagrams to expose dependencies, boundaries, networks, and decision flows. A box should name a real object or computation; an arrow should name what is transferred. Avoid decorative arrows that could point either way without changing the meaning. Export vector graphics when possible, use a consistent typeface, and verify readability at the size used in the paper.

Begin with black-and-white structure. Put the real system on the left, the mathematical representation in the center, and the decision or evidence on the right. Align objects, keep arrows from crossing, and use shape consistently: perhaps rounded rectangles for processes, cylinders for data, and diamonds for decisions. Add color last, with one meaning per color. If blue sometimes means “observed” and elsewhere means “optimized,” the style is decoration rather than language.

PowerPoint is often faster for free-form layouts; draw.io is often better for connected graphs and reusable components. Either can produce excellent figures. The test is whether a reader can answer three questions in ten seconds: Where does information enter? What transforms it? Which output supports the conclusion?

### File and Version Discipline

Whether you use Git, cloud storage, or both, agree on one canonical folder and naming scheme. Preserve raw data, separate generated output, and record the command that recreates each result. Commit or snapshot at meaningful milestones. Never overwrite the only working version an hour before submission. A reproducible folder is a quiet form of insurance.

Use filenames that survive stress: `arrival_cleaning.py`, `scenario_peak20.csv`, and `fig_wait_comparison.pdf` are better than `new.py`, `data2.csv`, and `图3最新版final.png`. Add a short `README` containing the run order and the owner of each module. If Git is unfamiliar, practice branches and conflict resolution before the contest; competition day is not the time to discover how merging works. If you use OneDrive or another synchronized folder, avoid editing the same binary file simultaneously and keep periodic immutable snapshots.

## Learning from Award-Winning Papers

One person learning alone cannot invent, in a few months, every useful modeling pattern discovered by hundreds of strong teams. Reading excellent papers is a way to study with those teams after the competition is over. You are not copying their wording or pretending their method is yours. You are learning how experienced modelers connect questions, assumptions, calculations, figures, and conclusions.

Read in three passes. First, recover the architecture: what did the paper answer, what modules did it build, and what did each module pass to the next? Second, trace one important claim backward from the abstract to a figure, then to a calculation, then to data and assumptions. Third, reproduce one small result. If the data are unavailable, reconstruct a toy version and label it honestly.

Build a paper card in Notion. Record the problem, decision, model family, strongest assumption, best figure, validation strategy, one limitation, and one transferable technique. Do not write “uses neural network.” Write what the network consumed, what it predicted, how it was tested, and why that output mattered downstream. Over time, these cards become your personal library of modeling moves.

Compare several papers for the same problem. One paper may be mathematically ambitious but weakly validated; another may use a simple model and communicate exceptionally well. Ask which evidence changed your belief. Awards can guide your reading list, but they do not make every paragraph perfect. Read actively.

Here is a concrete reading session. Suppose three papers address emergency supply distribution after a storm. Paper A uses a sophisticated multi-objective evolutionary algorithm, Paper B uses a transparent mixed-integer program, and Paper C combines a simple priority score with a simulation. Do not begin by ranking the algorithm names. First write the decision each paper makes: where supplies start, which locations receive them, when vehicles move, and what “fair” means.

Next reconstruct the boundary. Does a vehicle disappear from the model after delivery, or can it reload? Are damaged roads fixed or changing? Does unmet demand carry to the next period? Does the fairness term compare absolute deliveries, fractions of need, or worst-case delay? Two papers may appear to solve the same prompt while answering different operational questions.

Choose one claim from each abstract. If Paper A says it “balances efficiency and equity,” find the Pareto plot and identify the axes. If Paper B says its plan is robust, find the uncertainty set and stress results. If Paper C says simulation confirms effectiveness, find the baseline, replications, and variability. Record whether the claim is directly supported, indirectly suggested, or unsupported. This simple label trains you to separate confident writing from evidence.

Then reproduce one modest component. Recreate Paper A's trade-off plot from a few reported points, implement Paper B's smallest network, or rerun Paper C's priority score on six fictional locations. Your output will be small, and that is the point. You are discovering the meaning of the method without pretending to reproduce unavailable data. Write down every ambiguity you encounter; undocumented choices often teach more than the final curve.

Finally, transfer rather than copy. Change one assumption: allow a road to reopen, give remote locations a minimum service requirement, or make demand uncertain. Predict which recommendation will move before running anything. Your Notion card should end with “I would use this technique when…” and “I would not trust it when…”. Those two sentences are more useful in a future contest than five pages of copied derivation.

## Reconstructing Visual Evidence

Let me use a deliberately ordinary analogy. Suppose I ask you to invent, from nothing, the face you consider most beautiful. That is surprisingly hard. You may know a few adjectives, but the whole image remains vague. Yet when you walk down a street or watch a film, you usually have an immediate sense of which faces you find attractive. Years of seeing people have trained your visual judgment. After enough observation, you can even describe recurring features of your own taste.

Visualization develops in a similar way. If you have seen only default spreadsheet charts, “make a beautiful and convincing figure” is an empty instruction. After studying many strong figures, you begin to feel when a chart is crowded, when color is doing useful work, when an axis is hiding the comparison, and when a caption tells you exactly what to notice. Taste is not magic. It is compressed experience.

The analogy has a limit: a scientific figure is not judged only by beauty. It must be truthful, legible, and attached to a claim. A visually dramatic chart that truncates an axis or mixes incomparable groups is worse than a plain honest plot. The goal is evidence with form.

<figure class="mm-figure mm-figure--compact">
  <img src="/blog/images/mathematical-modeling/modeling-02-visual-practice.svg" alt="Cycle of observing, reconstructing, explaining, and adapting strong visualizations">
  <figcaption>Visual judgment grows through deliberate reconstruction: identify the claim, reproduce the design, explain every choice, and adapt it to a new question.</figcaption>
</figure>

Each week, choose one figure you admire. Before touching code, write its claim in one sentence. Identify the data mapping, visual encoding, ordering, color logic, annotation, and caption. Recreate it with different toy data. Then change one design choice and explain whether the evidence becomes clearer or weaker. Save both the code and your explanation.

Suppose the original figure compares the waiting-time distributions of four staffing plans. It uses four overlapping histograms, and the caption claims that Plan D reduces both typical and extreme waits. Your first job is not to imitate its colors. Ask whether overlapping histograms allow the reader to see the tails. Perhaps a box plot hides distribution shape; perhaps an empirical cumulative distribution makes the probability of waiting longer than ten minutes immediately visible. The correct reconstruction begins from the claim.

Create a toy dataset with 200 waits per plan. Make the original histogram as faithfully as possible, then make a second version with aligned density panels or cumulative curves. Keep axis limits and sample sizes comparable. Add a vertical line at the operational threshold, not merely at the mean. If Plan D improves the median but produces a small dangerous tail, the threshold view exposes what the average concealed.

Now inspect design choices one by one. Order plans from baseline to proposed rather than alphabetically. Use one neutral color for baselines and one accent for the recommended plan. Avoid a rainbow when color carries no variable. Put units in the axis label. Write a caption that states the comparison, scenario, and message: “Across 200 simulated lunch periods under the +20% demand scenario, Plan D lowers the median wait but still exceeds the ten-minute target in 7% of runs.” The caption does not say “Plan D is clearly superior” unless the evidence and objective justify that sentence.

Reconstruction becomes powerful when you keep a gallery organized by *purpose*: distribution, trend, relationship, geography, network, uncertainty, sensitivity, and method comparison. When a contest requires a figure, search the claim category rather than browsing pretty examples at random. The next blog will develop these choices in depth; this practice gives you the visual vocabulary needed to benefit from it.

Do not panic if this feels unfamiliar. The next blog is devoted to visual evidence: how to select a chart, use color, annotate uncertainty, arrange multiple panels, and write captions. For now, the habit is enough—look carefully, rebuild often, and ask what the figure proves.

## Extending the Algorithm Library

This course will introduce the central model families, but development takes time and no finite course can contain every method you may need. After each blog, learn one step beyond it. If we cover linear programming, explore integer decisions or dual interpretation. If we cover regression, compare regularization or robust loss. If we cover time series, investigate how one method handles seasonality or structural breaks.

The extension should be small enough to finish. Write a one-page Notion entry with the question the method answers, required inputs, output, assumptions, a tiny example, validation, failure modes, and a code link. Add one comparison with the baseline from class. This turns “I watched another tutorial” into knowledge your future team can retrieve.

Do not collect algorithms like trading cards. A method belongs in your library only when you can explain its contract and test it. Knowing ten ways to optimize without knowing how to define feasibility is not preparation. The useful question is: under what evidence would this method be more appropriate than the simpler one?

For example, after learning linear programming, take the classroom allocation baseline. Continuous variables might allow “0.4 of a room,” which is mathematically feasible but operationally absurd. Add integer variables and solve a tiny instance. Then ask what changed: the feasible set became discrete, the solution may be more expensive, and computational difficulty can grow. Record a relaxation bound and explain what it tells you. You have extended the method by following a real limitation, not by choosing a more impressive name.

After regression, replace squared error with absolute or Huber loss and add one outlier to a toy dataset. Predict the direction of the fitted line. Plot residuals and compare parameter stability. After shortest paths, add capacity and multiple commodities; observe that independently shortest routes can overload one edge. After deterministic optimization, perturb demand and compare nominal, scenario-based, and robust decisions. Each extension should have a visible reason.

Use a standard algorithm card:

- **Question:** What decision or estimate does the method answer?
- **Contract:** What are the input shape, output, objective, and constraints?
- **Assumptions:** Which mechanism or statistical condition matters?
- **Baseline:** What simpler method should it beat?
- **Tiny case:** What answer can you calculate by hand?
- **Evidence:** Which metric and split support it?
- **Failure:** What data or scenario makes it unreliable?
- **Cost:** What computation, tuning, or explanation burden does it create?
- **Extension:** Which single limitation will you address next?

When you teach the card to a teammate, do it without slides first. If you cannot describe why the method changes the decision, return to the tiny case. Put working code, a figure, and a one-paragraph interpretation beneath the card in Notion. Over months, this becomes a course that your team has built together—one tested extension after every formal blog.

## AI-Assisted Modeling with ChatGPT

ChatGPT is most useful when you treat it as a fast, fallible collaborator. It can ask questions, explain methods, draft code, suggest tests, critique prose, and help organize a search. It cannot observe your physical system, guarantee a theorem, certify code, or create a legitimate citation merely by sounding confident. The team remains responsible for every submitted claim.

### Begin with Context and a Contract

Do not start with “solve this problem.” Give the decision, audience, available data, constraints, current stage, and desired form of help. Then define boundaries: ask for questions or alternatives before asking for a solution; require assumptions to be labeled; require uncertainty and verification steps; prohibit invented data and sources.

A useful opening prompt is: “We need to recommend a staffing plan for a campus dining hall. We have timestamped arrivals, service durations by station, labor rules, and a budget. Before proposing a method, list the decisions, states, constraints, missing information, and three baselines. Separate facts from assumptions.” This prompt turns AI into a problem-structuring partner rather than a vending machine for algorithms.

### Use AI for Divergence, Then Human Judgment for Convergence

Early in a project, ask for several formulations: a capacity balance, a queueing simulation, and a robust optimization extension. Request the assumptions and evidence each requires. This is divergence. Then the team selects a baseline using domain knowledge, time, data, and validation. Do not let the model choose merely because one answer is written more confidently.

Ask adversarial questions: “What observation would make this formulation inappropriate?” “Which variable is not available at decision time?” “Give a counterexample in which the recommended policy fails.” A good session should create tests, not only text.

### Ask for Explanations at Several Levels

When a method is unfamiliar, ask for a plain-language mechanism, a small numerical example, the formal equations, and a failure case. Compare them. If the plain explanation says demand is conserved but the equations create customers, you found a contradiction. Ask the model to check units and limiting cases, but then perform those checks yourself.

Never cite an AI explanation as authority. Use it to identify concepts and search terms, then read textbooks, papers, or official documentation. If it names a theorem, verify the hypotheses. If it names a paper, open the real paper and confirm the title, authors, and claim.

### Generate Code in Testable Pieces

Ask for functions with explicit inputs and outputs, not a 500-line notebook. Provide a toy case and expected result. Request assertions for dimensions, bounds, conservation, and feasibility. Run the code in your environment, read it, and compare against a baseline.

For data analysis, do not upload sensitive or restricted data without permission. Share a schema or synthetic sample when possible. Ask the model to explain every transformation. Keep raw data untouched and record which code came from AI so it can be reviewed carefully.

### Use AI to Design Validation

This is one of its best roles. Describe the model and ask for unit tests, stress scenarios, ablations, sensitivity ranges, negative controls, and leakage checks. Then decide which tests are relevant. For a forecast, ask how to split time without using the future. For an optimizer, ask how parameter error might change feasibility. For a network metric, ask for graphs where the metric gives a misleading recommendation.

Let AI criticize a result before it helps polish the paragraph. Ask: “Assume this conclusion is wrong. Give five plausible causes, the observation each would produce, and the cheapest test.” That converts vague caution into an investigation plan.

### Revise Writing Without Erasing Ownership

Give ChatGPT your reasoning and ask it to identify missing transitions, undefined symbols, unsupported claims, and sentences that confuse correlation with causation. Ask for two clearer alternatives, then edit them yourself. Do not ask it to manufacture an authoritative tone around weak evidence.

Keep your own voice and preserve technical precision. A polished paragraph must still match the actual code and figure. After revision, read every number, variable, and direction of change against the source result. Fluent prose can conceal a sign error more effectively than rough prose.

### Verify Sources and Maintain an AI Log

For every factual claim, keep the real source, page, and access information. Never cite a URL you have not opened. Maintain a simple AI-use log with date, tool/model, purpose, prompt summary, output used, and human verification. This makes disclosure easier and helps teammates review AI-assisted work.

COMAP's current rules permit responsible AI use but require open, honest disclosure, and its official AI policy gives reporting examples. Requirements can change, so read the current rules before each competition. CUMCM rules and university policies must be checked separately; permission in one contest does not automatically transfer to another.

### Build Prompts from Modeling Roles

A prompt becomes more useful when it names the intellectual job to be done. “Help with Question 2” tells the model almost nothing. “Act as a skeptical operations-research reviewer; inspect whether our variables and constraints faithfully represent the dining-hall decision” defines a role, an object, and a standard of judgment. You are not pretending that the model is a certified reviewer. You are using the role to shape the kind of questions it asks.

For **problem framing**, provide the original wording and ask for a table with four columns: phrase from the prompt, mathematical meaning, information required, and ambiguity to resolve. Then inspect the table yourself. The model may interpret “capacity” as hourly flow while the stakeholder means simultaneous occupancy—the exact distinction we met at the ski resort. A helpful response exposes that ambiguity; an unhelpful response silently chooses one meaning.

For **model design**, provide your current contract and ask for three levels: a hand-checkable baseline, one extension addressing a named failure, and one deliberately excessive model. Request an explanation of what evidence would justify moving from one level to the next. This prevents the conversation from becoming a contest in mathematical ornamentation. If the baseline and extension recommend the same action throughout the observed range, the added complexity may not deserve space in the report.

For **data work**, share column names, units, a few synthetic rows, and what each row represents. Ask for an audit plan before asking for code. The plan should check identifiers, duplicates, time range, missingness, impossible values, inconsistent units, and leakage. Only after agreeing on those checks should you request small functions. Otherwise AI may produce elegant plots of a table whose rows were misunderstood.

For **mathematical derivation**, ask the model to declare assumptions, derive one step at a time, label every equation, check dimensions, and test a limiting case. Do not accept “therefore” as a proof. Reproduce the derivation on paper. Substitute simple values. If a probability leaves $[0,1]$, a population becomes negative, or a cost decreases when every cost coefficient increases, stop and diagnose the mechanism.

For **review**, provide the draft together with the evidence it is supposed to describe. Ask the model to mark four things separately: unsupported factual claims, undefined notation, logical jumps, and style problems. Fix them in that order. A beautiful transition should not receive attention before a claim without evidence.

### A Worked AI Session: Campus Cooling

Suppose a campus must decide which buildings to pre-cool before a hot afternoon. You have hourly outdoor temperature, building occupancy forecasts, electricity prices, and rough thermal-response estimates. The goal is to reduce peak electricity cost while keeping occupied rooms inside a comfort band. This is small enough to follow, but rich enough to show where AI helps and where it does not.

The first prompt should not ask for code. Give the story and ask: “List the decision variables, states, measured inputs, uncertain inputs, constraints, and outputs. Identify any word whose operational definition is missing.” A useful response may suggest that pre-cooling power is a decision; indoor temperature is a state; outdoor temperature and price are inputs; occupancy is uncertain; comfort and equipment power are constraints; and total cost and peak demand are outputs. It should also ask what “comfort” means, how often decisions can change, and whether the demand charge depends on the maximum fifteen-minute or hourly load.

Now the team resolves what it can. Suppose the facilities manager sets a $21$–$25^{\circ}\mathrm{C}$ occupied comfort range, control changes hourly, and the tariff uses hourly peak load for this exercise. Ask for a baseline. AI may propose pre-cooling every occupied building during the cheapest hour. That is easy to explain, but it ignores thermal decay and may create a new synchronized peak. We can test it without claiming it is optimal.

Next ask for a one-zone temperature recurrence such as

$$
T_{b,t+1}=T_{b,t}+k_b(T_t^{\mathrm{out}}-T_{b,t})-\eta_b u_{b,t}+q_{b,t}^{\mathrm{occ}},
$$

where $u_{b,t}$ is cooling input. Before using it, the team checks the signs and units. If outdoor temperature exceeds indoor temperature, the first term should warm the building. Increased cooling should lower the next temperature, so its coefficient appears with a minus sign. Occupants add heat. The parameters must be calibrated from data or described as illustrative; ChatGPT cannot infer them from the building name.

Ask AI for tests. A reasonable list includes zero-cooling behavior, constant-temperature equilibrium, maximum cooling, an empty building, forecast error, and a price spike. Add a synchronization test: if all buildings follow the same cheap hour, does aggregate power violate the peak objective? Run those cases. If the equation predicts that an uncooled building becomes colder than both its initial state and the outdoor air without another cooling mechanism, the recurrence or parameter fit is wrong.

Only then ask for optimization code. Specify array shapes, bounds, objective components, and a tiny two-building, three-hour instance. Require the function to return the schedule, temperature trajectories, total energy cost, and peak load separately. Compare the solver's result with two baselines: no pre-cooling and naive cheapest-hour pre-cooling. If the optimization cost is lower only because the room violates comfort at an unreported half hour, the apparent improvement is not valid.

For writing, give ChatGPT the actual result table and ask it to draft a cautious paragraph. Then check every number and causal statement. “Pre-cooling caused a 14% reduction” is too strong if the evidence is only a simulation under assumed parameters. “Under the calibrated one-zone simulation, the schedule reduced the modeled peak by 14% relative to the stated baseline” is precise. The qualifiers are not weakness; they tell the reader what was actually demonstrated.

Finally ask for a hostile review: “Assume our recommendation fails during implementation. List plausible reasons and a measurement for diagnosing each.” Perhaps occupancy forecasts are wrong, thermal parameters drift, local thermostats override the schedule, or the hourly model misses fifteen-minute peaks. The team turns the useful items into limitations and a monitoring plan. In this session AI accelerated structure, code scaffolding, tests, and critique. The data, calibration, execution, and final claims remained ours.

### Recognize Verification Debt

Every AI-generated item creates a verification obligation. A proposed variable needs a definition. A formula needs a derivation and unit check. Code needs tests. A factual claim needs a source. A citation needs to be opened. A rewritten paragraph needs comparison with the real result. Call this **verification debt**.

Debt is not automatically bad. Generating five baseline ideas in two minutes may be worth checking them. Producing fifty pages of unfamiliar code is usually not, because the team cannot inspect it before the deadline. Keep the size of each AI contribution within the team's ability to verify. If nobody understands a module, it is not a shortcut; it is an unpriced risk.

Track status explicitly: *suggested, checked, accepted,* or *rejected*. An AI suggestion should not enter the report while still marked suggested. For important derivations or algorithms, require a second teammate to review the check. This is the same logic as code review, applied to all generated content.

### Protect Privacy, Integrity, and Team Learning

Do not paste confidential, personally identifiable, licensed, or competition-restricted material into an external service without permission. Minimize data, anonymize when appropriate, and consult the applicable policy. A synthetic sample can often communicate the structure without exposing the real records.

Do not let one teammate become the private operator of a mysterious AI conversation. Save relevant prompts and decisions in the shared workspace so others can challenge them. If a result depends on a conversation nobody else can see, the workflow is not reproducible.

Most importantly, preserve learning. Before asking AI to explain a concept, write your own guess. Before accepting its derivation, try the first step. Before running generated code, predict the output of a tiny case. AI should shorten the feedback loop, not remove the moment when you form a model in your own head. The goal is not to finish one report while remaining dependent; it is to become the person who can recognize when the assistant is wrong.

### Prompt Patterns for Common Competition Tasks

The following patterns are templates, not incantations. Replace the brackets with real context, and never paste a response directly into a paper. Their value is that they request artifacts you can inspect.

**Problem audit.** “We must [decision/prediction] for [stakeholder]. The prompt provides [data] and requires [deliverables]. Create a table of facts, decisions, states, parameters, constraints, uncertainty, and missing definitions. Quote the phrase that motivates each item. Do not propose an algorithm yet.” This is useful in the first reading because it slows the jump from nouns to methods. Check every quoted phrase against the actual prompt.

**Baseline design.** “Propose three baselines ordered by complexity. For each, state inputs, outputs, assumptions, a tiny hand-checkable example, validation, and one failure that would justify the next level. Prefer mechanisms that answer the decision over fashionable algorithms.” A good answer may include a naive policy, a transparent mathematical model, and a richer extension. Choose one; do not build all three simply because they were listed.

**Assumption review.** “Here is our assumption ledger [ledger]. For each assumption, identify its mathematical consequence, likely direction of bias, observable warning sign, and a sensitivity or field test. Prioritize assumptions that could reverse the recommendation.” This turns a decorative assumptions page into a test plan. Reject speculative bias directions that the model cannot justify.

**Data audit.** “Each row represents [entity/time]. Columns and units are [schema]. The decision occurs at [time]. Design checks for duplicates, missingness, impossible values, inconsistent units, leakage, drift, and sampling bias. Return checks as small functions with expected outputs on this synthetic sample [sample].” Run the functions and inspect flagged records; generated checks can themselves be wrong.

**Equation review.** “Review this derivation line by line. Do not replace it with a different model. Check algebra, units, sign, bounds, limiting cases, and whether each assumption supports the step. Give the first invalid line and a counterexample.” Asking for the *first* invalid line discourages a vague rewrite. Re-derive it independently after reading the critique.

**Optimization formulation.** “Separate sets, parameters, decisions, states, objective terms, and constraints. For every constraint, provide the real-world sentence it enforces and its unit. Construct one feasible and one infeasible tiny solution. Identify any nonlinear or integer element and explain its computational implication.” This helps catch constraints that look formal but do not represent an implementable rule.

**Code generation.** “Implement only [function]. Inputs have shapes [shapes], units [units], and constraints [constraints]. Return [outputs]. Include type hints, docstring, deterministic seed if relevant, and tests for [tiny cases]. Do not read or write files inside the function.” Small pure functions are easier to inspect. Integrate them only after their tests pass.

**Debugging.** “Expected [result], observed [result], minimal input [input], code [code], and environment [versions]. Generate hypotheses ordered by diagnostic value, and for each give one check that distinguishes it. Do not rewrite the entire program.” This keeps the model focused on diagnosis. Execute one distinguishing check at a time so you learn which mechanism failed.

**Visualization review.** “The claim is [claim], data fields are [fields], and audience is [audience]. Compare three encodings. For each, explain what the reader can and cannot infer, how uncertainty appears, and what misleading choice to avoid. Draft a caption containing scenario, sample, metric, and takeaway.” Build the chosen chart yourself and verify that the caption matches it.

**Result interpretation.** “Here are the verified outputs [table]. Write a plain-language interpretation that distinguishes observation, model output, causal claim, and recommendation. State the baseline and scenario. Do not invent reasons not supported by the model.” Search the draft for every number and adjective. Words such as *substantial* or *stable* need quantitative support.

**Adversarial review.** “Act as a skeptical judge. Given our model contract, evidence, and conclusion, list the five most consequential ways the conclusion could be wrong. For each, point to the exact unsupported step and propose the cheapest discriminating test. Do not criticize style until the evidence chain is addressed.” Some criticisms will be irrelevant; the team decides which could actually change the answer.

**Paper consistency.** “Given the variable table, equations, figure captions, and conclusion, report inconsistent symbols, units, scenario names, numerical values, and causal language. Return locations and suggested checks, not rewritten prose.” This is especially helpful late in the contest, but it does not replace page-by-page human review.

Use a two-pass conversation. In the first pass, ask for questions, risks, and alternatives. In the second, after the team makes decisions, ask for a bounded artifact. Long conversational threads accumulate stale assumptions, so restate the current contract when it changes. If the assistant keeps using an abandoned definition, start a clean thread with the approved facts.

Evaluate prompts by the quality of the resulting checks, not by the elegance of the response. A short prompt that reveals target leakage is better than an elaborate persona that produces ten pages of generic advice. Save only the patterns that repeatedly improve your work, and attach an example of when each failed.

### A Complete AI Workflow

Use this sequence for each module:

1. **Frame:** the team writes the decision, inputs, outputs, and constraints.
2. **Question:** AI identifies ambiguity, missing data, and alternative baselines.
3. **Choose:** the team selects a formulation and records why.
4. **Implement:** AI may draft a small function or test; a teammate reviews it.
5. **Verify:** compare with hand calculations, baselines, held-out data, and stress cases.
6. **Interpret:** the team explains the result in domain language.
7. **Critique:** AI searches for counterexamples and unsupported claims.
8. **Document:** record sources, decisions, code versions, and AI use.

<figure class="mm-figure mm-figure--compact">
  <img src="/blog/images/mathematical-modeling/modeling-02-ai-loop.svg" alt="Human-led AI workflow with framing, testing, verification, and disclosure">
  <figcaption>AI contributes questions, drafts, and critiques. Humans retain the decisions, evidence checks, interpretation, and responsibility.</figcaption>
</figure>

The rule underneath every step is simple: **AI may accelerate the path from a question to a candidate answer; it may not shorten the path from a candidate answer to justified evidence.** If an output saves twenty minutes of typing but requires forty minutes of verification, that may still be worthwhile—but count the verification as part of the method.

### Competition-Day Execution and Quality Gates

A practiced workflow still needs checkpoints. Without them, a team can work intensely for two days and discover on the final morning that its strongest model answers a different question from the prompt. Use a short review at every major transition. A review is not a meeting in which everyone reports how busy they are. It asks whether a concrete artifact is ready to become an input to the next stage.

The first gate is the **problem contract**. Before serious modeling begins, one teammate should be able to point to a page containing the decision, system boundary, variables with units, outputs, constraints, evaluation criteria, and unresolved ambiguities. Read each requested task aloud and map it to a future section, result, or recommendation. If a sentence in the prompt has no destination, the plan is incomplete. If a planned model has no requested task, it may be an attractive distraction.

The second gate is the **baseline result**. Require one end-to-end result early, even if it is deliberately simple. A mean forecast, greedy route, linear heat balance, equal-weight score, or deterministic queue may be enough. The baseline must run on actual inputs, produce an interpretable output, and answer at least part of the question. Record its limitations rather than apologizing for them. Later methods earn their place by correcting one named weakness or changing one consequential decision.

The third gate is **numerical trust**. Select a tiny example and verify at least one intermediate value by hand. Check units, signs, dimensions, bounds, conservation, and limiting behavior. For data models, audit row counts before and after every transformation and inspect whether features would exist at decision time. For optimization, test both a known feasible decision and a deliberately infeasible one. For simulation, confirm that impossible events never occur and that repeated runs show the expected variation. This gate should happen before the team invests in beautiful plots.

The fourth gate is **comparative evidence**. A result without a reference point is difficult to judge. Compare the proposed method with the baseline, observed data, an alternative scenario, or a known special case. Report both improvement and cost. If prediction error falls by two percent but runtime grows by a factor of fifty and the final recommendation remains unchanged, the elaborate method may belong in a short robustness note rather than at the center of the paper. If a small parameter change flips the decision, sensitivity is not a decorative appendix; it is part of the answer.

The fifth gate is the **communication chain**. Place every important figure beside the paragraph whose claim it supports. Read the caption without looking at the main text: it should identify the scenario, variables, units, comparison, and takeaway. Trace every major number in the conclusion back to a table, figure, or calculation. Search for language such as *optimal, robust, significant, realistic,* and *accurate*. Ask what test or definition licenses each word. Remove any adjective that is stronger than the evidence.

Imagine a team studying emergency water delivery after a storm. Its baseline sends each vehicle to the nearest unmet demand. A mixed-integer model then reduces estimated total travel time by 12 percent. That headline is not ready. At the numerical gate, the team discovers that travel times were treated as symmetric even though several roads are one-way. After correction, the improvement is 7 percent. At the comparative gate, a stress scenario closes two bridges; the optimized plan becomes brittle, while a slightly longer route retains access to every shelter. At the communication gate, the team replaces “our optimal plan is robust” with a precise recommendation: under normal access, Plan A cuts estimated travel time by 7 percent; when either bridge is unavailable, Plan B preserves full coverage with a 4 percent normal-time penalty. The gates did not weaken the paper. They turned a fragile claim into a decision a reader can use.

Assign one teammate as the temporary owner of each gate, but rotate the role. The author of a module is often least able to see its unstated assumptions. A reviewer should reproduce the command that generates the result, inspect the input and output, and ask one counterfactual question. “What if demand is 20 percent higher?” is useful only when the answer can be computed or bounded. Review comments should end with an action: run a scenario, clarify a definition, compare a baseline, or narrow a claim.

Reserve the final hours for integration rather than invention. Freeze model structure at a pre-agreed time unless a verified error makes the result invalid. Regenerate all figures from the current data and code, update cross-references, inspect the PDF on another computer, and check the official submission rules. Confirm page limits, file names, anonymization, references, appendix contents, and required AI disclosure. Open the final file after export; do not assume that successful compilation means readable equations, embedded fonts, or uncropped figures.

Finally, keep a short incident log during the contest. Record failures that cost time: an overwritten dataset, an inconsistent unit, a chart rebuilt manually, a prompt that produced invented citations, or a late change that broke three sections. After submission, convert each recurring incident into a preventive habit, test, template, or folder rule. Competition technique matures when painful surprises become routine checks.

## Five Worked Competition Studios

Advice about teamwork becomes useful only after it survives contact with an actual modeling problem. The five studios below are original teaching cases built around recurring CUMCM and MCM/ICM problem families. They do not reproduce an award paper's numerical result. Instead, each one shows the decisions that a team must make between opening the prompt and writing a defensible conclusion. Read them as rehearsals. Pause whenever the team makes a choice and ask whether you would have chosen the same baseline, evidence, or stopping rule.

### Studio A: a reservoir that must serve farms and a wetland

Imagine an MCM-style continuous problem. A small reservoir supplies irrigation water to three farming districts while maintaining a downstream wetland. The coming season may be dry. The authority asks for a weekly release policy that protects crops, avoids an ecological collapse, and leaves enough storage for late-season uncertainty. The provided data include initial storage, weekly inflow forecasts, district crop areas, approximate yield response to water, evaporation, and a minimum recommended ecological flow.

At first glance this appears to be an optimization problem, but the team should not begin by naming a solver. The first selection question is whether the available evidence supports the requested decisions. Weekly inflow and crop response are present, the storage balance is understandable, and a feasible baseline can be built quickly. The difficult words are “protect,” “collapse,” and “enough.” Those words need operational definitions. Does protecting crops mean maximizing expected yield, minimizing the worst proportional loss, or guaranteeing a minimum allocation to every district? Is ecological flow a hard weekly threshold or a seasonal average? How much terminal storage counts as enough? If the team cannot resolve these questions from the prompt, it must state a defensible interpretation and later test alternatives.

Write the storage balance before the objective:

$$
S_{t+1}=S_t+I_t-E_t-R_t-\sum_{j=1}^{3}x_{jt},
$$

where $S_t$ is storage at the beginning of week $t$, $I_t$ inflow, $E_t$ evaporation loss, $R_t$ ecological release, and $x_{jt}$ irrigation delivered to district $j$. Every term has units of volume per week except storage, which has units of volume; the discrete balance is consistent because it records the volume added or removed during one week. Bounds such as $0\le S_t\le S^{\max}$ and $x_{jt}\ge 0$ are not details. Without them the optimizer may borrow nonexistent water or create negative allocations.

The first baseline can ignore nonlinear crop response. Give each district water in proportion to planted area after reserving the ecological minimum and a fixed terminal buffer. This policy is transparent and hand-checkable. On a three-week toy instance, calculate storage and allocations on paper. Suppose storage begins at 90 units, inflows are 10, 8, and 5, evaporation is 2 each week, ecological release is 6, and irrigation demand is 20. Under a fixed 15-unit irrigation allocation, storage becomes 77, 62, and 44. The arithmetic confirms the indexing and exposes whether the final buffer can be met. A solver should reproduce this case exactly before the model grows.

Now ask what the baseline misses. Crop damage is rarely linear in water throughout the season. A deficit during a sensitive growth stage may matter more than the same deficit earlier. One extension introduces a piecewise-linear yield-loss curve for each crop-stage combination. Another replaces average inflow with scenarios. Do not add both at once. First test whether stage-dependent response changes allocation among districts. If it does, the extension answers a real decision question. If not, the simple proportional policy may be sufficient for the available evidence.

For uncertainty, create dry, central, and wet inflow paths using forecast errors or historical analogues. A robust formulation may maximize the minimum weighted yield while enforcing ecological flow in every scenario. A less conservative formulation may minimize expected loss plus a penalty for severe shortfall. These are different values, not merely different algorithms. The paper should show how the recommended policy changes as the penalty on ecological or agricultural failure changes.

The most informative figure is not a decorative picture of a reservoir. Use aligned panels showing weekly storage, irrigation allocation, ecological release, and critical thresholds under the three inflow scenarios. Mark the weeks when one constraint becomes active. The caption should say something substantive, such as: “The robust policy retains at least 18 units of storage in all tested inflow paths, while the expected-value policy violates the ecological reserve in weeks 9–10 under the dry path.” That sentence can be checked directly in the figure.

ChatGPT can help by reviewing the balance equation, proposing a tiny test, or generating a function that simulates storage for a fixed policy. It should not invent the yield-response parameters. Ask it: “Given this recurrence and units, list every way storage can become physically impossible, then design a unit test for each.” The team verifies the response, implements the tests, and records the source of every coefficient. Later, ask for a hostile review: “Under what inflow or demand errors does our recommendation reverse?” The answer becomes a sensitivity plan, not a paragraph copied into the report.

The conclusion should distinguish model output from policy judgment. Do not write “the optimal release is 12.37 units.” Write that, under the stated weekly balance, crop-response estimates, and scenario set, the selected policy protects the ecological threshold while sacrificing a measured amount of expected yield relative to the risk-neutral baseline. Report the trade-off and name the assumptions most capable of changing it. That is a complete evidence chain: interpretation, balance, baseline, extension, uncertainty, figure, and bounded recommendation.

### Studio B: crop planning under rotation and uncertain prices

Now consider a CUMCM-style operations problem. A cooperative manages several plots with different soil and greenhouse conditions. It must decide what to plant in each season over multiple years. Each crop has an expected yield, selling price, planting cost, land compatibility, and market limit. Rotation rules forbid repeating some crops on the same plot and require legumes within a moving window. Excess production may be wasted or sold at a discount.

Teams often see “multi-year planning” and immediately announce a genetic algorithm. Resist that impulse. The structure is an integer program before it is a metaphor about evolution. Define a binary decision $x_{i c t}$ that equals one if plot $i$ receives crop $c$ in season $t$. If plot area can be divided, use an area variable $a_{ict}$ and state whether splitting is operationally allowed. A representation decision here changes the real recommendation: a binary model produces one crop per plot-season; a continuous model may produce fractions that farmers cannot implement.

Start with one year and deterministic prices. The objective is revenue minus planting cost, with constraints for plot capacity, crop compatibility, and sales limits. Add a variable $q_{ct}^{\text{sold}}$ bounded by both production and demand:

$$
q_{ct}^{\text{sold}}\le \sum_i y_{ic}a_{ict},\qquad q_{ct}^{\text{sold}}\le d_{ct}.
$$

This pair matters. If revenue is calculated from all production when demand is limited, the model earns money from unsold vegetables. Construct a tiny instance with two plots and two crops. Make one crop very profitable but cap its demand below the yield of one plot. Solve the four possible assignments by hand. The optimizer must agree. This single test catches one of the most consequential formulation errors.

Only after the one-year model passes should rotation enter. A no-repeat rule may be written as $x_{ict}+x_{ic,t+1}\le 1$. A legume-window rule can require at least one eligible legume across each plot and every consecutive three-year window. Write the real sentence beside the algebra. Check the first and last windows carefully; indexing mistakes often leave boundary years unconstrained. Generate an infeasible schedule intentionally and verify that the constraint catches it.

Uncertain prices and yields create several modeling choices. Scenario optimization can use a collection of plausible price-yield paths. Robust optimization can protect against bounded deviations. Stochastic optimization can weight scenarios by estimated probabilities. The team should not call one choice “more advanced” and stop. It should connect the choice to the cooperative's tolerance for bad years. A risk-neutral plan may concentrate on a high-margin crop. A robust plan may diversify. A mean–CVaR plan can balance expected profit with the average loss in the worst tail. Show the efficient frontier rather than hiding the trade-off in one arbitrary weight.

Suppose the exact mixed-integer model solves the available instance quickly. Then a genetic algorithm is not automatically an improvement. The exact model provides a bound and a reproducible optimum under its assumptions. A metaheuristic becomes defensible if later extensions—nonlinear soil dynamics, simulation-based disease spread, or very large combinatorial rules—make exact solution impractical. Even then, compare the heuristic with the exact solver on reduced instances. Equalize objective-evaluation budgets, report several random seeds, recalculate feasibility independently, and never infer global optimality from a flat convergence curve.

The figure set should follow the decision. A land-by-season matrix shows the planting schedule. A stacked production-demand chart reveals excess output. A profit-risk frontier explains diversification. A rotation audit shows whether every plot meets the legume requirement. These four views answer different questions; combining them into a rainbow dashboard weakens all four. Use stable crop colors across figures and distinguish planned area from sold volume with position or line style, not merely shade.

AI can accelerate the constraint audit. Give it the variable definition and one constraint at a time. Ask for a plain-language translation, a feasible toy schedule, and a counterexample that slips through if the constraint is removed. This is far safer than asking for “complete crop optimization code.” For implementation, request a function that takes a proposed schedule and returns a structured list of violations. That checker is valuable even if the optimization model is built separately. It lets the team audit solver output and compare exact and heuristic solutions under the same rules.

When writing the result, resist a long list of planted crops. Explain the mechanism: the recommended schedule uses the high-margin crop until its sales cap binds, then allocates land to a lower-margin crop that improves rotation and reduces downside under price shocks. Quantify the cost of robustness. If expected profit falls by 3% while worst-tail loss improves by 18%, say so. The cooperative can then decide whether that insurance is worthwhile.

### Studio C: forecasting service demand after a sudden surge

The third studio belongs to the data-insights family. An online public-service portal records daily submissions, completion times, error types, and whether users return. A publicity campaign caused a sudden surge. The agency asks for a four-week staffing forecast and an explanation of which request characteristics are associated with long completion times.

This problem is attractive because the data are substantial, but data volume can conceal weak definitions. What counts as a submission: a click, an opened application, or a completed form? Are completion times censored for unfinished requests? Did the data schema change during the campaign? Can one person generate multiple rows? Before selecting a forecasting model, create a row contract and audit identifiers, timestamps, missingness, impossible durations, duplicate events, and time zones.

Plot the raw daily count with campaign dates and any system outages. A smooth line alone is dangerous: an outage can appear as zero demand, and a backlog release can appear as an explosive day. Reconcile counts with server logs or operational notes. Decompose only after understanding anomalies. A weekly seasonal pattern may justify day-of-week indicators or seasonal differencing, but a single post-campaign month cannot establish a stable annual seasonality.

The baseline forecast should be difficult to embarrass: last week, a moving average, or a seasonal naive forecast using the same weekday from the previous week. Split data by time, never randomly, because future information must not help predict the past. Use rolling-origin evaluation. At each origin, fit only on earlier dates, forecast the next horizon, and collect errors. Report mean absolute error, but also inspect peak-day underprediction because staffing risk is asymmetric.

Suppose an ARIMA model improves average error while systematically missing the highest-demand Mondays. A gradient-boosted model with calendar, campaign, and lag features may help. The comparison must use identical forecast origins and information availability. A feature such as “weekly total submissions” is leakage if the total includes days after the forecast was issued. Create a feature-availability table with one column for when each value becomes known.

Uncertainty is part of the staffing decision. A point forecast of 820 requests does not tell the manager whether to staff for 800 or 1,000. Generate calibrated prediction intervals and check empirical coverage on rolling validation windows. If a nominal 90% interval contains only 65% of held-out observations, it is overconfident. Show coverage by horizon and by ordinary versus campaign periods. A wide honest interval may lead to flexible staffing or an on-call pool rather than a falsely precise fixed roster.

For completion time, begin with censoring and skewness. Median and upper quantiles may be more relevant than the mean. A regression can identify associations, but the paper must avoid causal language unless the design supports it. If applications with uploaded documents take longer, that may reflect complexity rather than a harmful document feature. Use partial-dependence or grouped residual views only where there is data support, and show sample counts so sparse categories do not look authoritative.

The central visualization can combine observed counts, baseline and proposed forecasts, prediction intervals, and a vertical campaign marker. Use a second panel for rolling forecast errors. Do not place completion-time coefficients on the same axis. For staffing, translate demand into workload using measured or assumed service rates. If one worker processes an average of 35 requests per day, test variability rather than dividing the point forecast by 35 and rounding once.

Ask AI to inspect leakage and evaluation logic. A useful prompt is: “At 8 p.m. Sunday we issue forecasts for Monday through Sunday. For each candidate feature, state whether it is known at issuance, becomes known later, or is derived from the target.” Give the real data dictionary. Check every response. Then ask for tests that intentionally shift the target or include a future feature; the pipeline should detect or forbid those cases.

The report's recommendation might be a base staffing level plus a trigger. For example, use the central forecast for ordinary allocation and activate on-call capacity when the upper predictive quantile crosses a threshold. Explain how often that trigger would have activated in rolling validation and how many peak days it would have protected. The result is not “model X has the best RMSE.” It is a staffing rule connected to forecast evidence, uncertainty, and operational cost.

### Studio D: choosing sites for mobile health clinics

The fourth studio is a policy and location problem. A county can deploy three mobile clinics each week. Candidate sites differ in rent, road access, nearby population, and operating hours. Residents differ in travel time, health need, mobility, and access to existing clinics. The county wants to improve access without concentrating all service in dense neighborhoods.

The phrase “improve access” hides the ethical core. Minimizing average travel time may abandon a remote minority because helping a dense area improves the mean more efficiently. Minimizing maximum travel time may spend most resources on a few extreme cases. Maximizing covered population within 30 minutes depends on an arbitrary threshold. Before modeling, put these objectives side by side and show a small map where they choose different sites. The team should make the trade-off visible rather than burying it in weights.

Let $y_j$ indicate whether candidate site $j$ opens and $z_{ij}$ assign community $i$ to site $j$. Require $z_{ij}\le y_j$ and $\sum_j z_{ij}=1$ for every served community. Capacity constraints bound assigned demand. If opening exactly three sites is required, $\sum_j y_j=3$. Check that travel times reflect the actual road network and mobility mode. Straight-line distance can be an exploratory proxy, but it is especially misleading across rivers, highways, or limited transit.

Build a tiny six-community, four-site instance and draw it. Solve all four choose-three combinations by hand or enumeration. Compare mean distance, maximum distance, underserved-population coverage, and cost. This reveals whether the chosen fairness metric behaves as intended. If one isolated community forces a clinic next door while thousands elsewhere lose access, the max objective may be too rigid. A constraint guaranteeing a minimum coverage level for high-need communities plus an average-time objective may be more balanced.

Uncertainty enters through attendance, travel time, and site availability. Use scenarios for weather, road closure, and demand. A robust plan might keep every high-need community within a threshold even if one site becomes unavailable. But redundancy costs money. Plot the frontier between ordinary-week access and disruption coverage. Mark the selected plan and two nearby alternatives. A recommendation is stronger when the reader can see what is sacrificed to buy resilience.

Spatial fairness also requires denominator discipline. A choropleth of raw underserved counts highlights populous communities; a rate highlights proportional need; neither alone is sufficient. Show population and rate, or use a bivariate design only if it remains readable. Mark candidate and selected sites, include a scale, and state how travel time was computed. Do not interpolate health need continuously across unobserved space without explaining the method and uncertainty.

AI can challenge the objective. Provide a six-row synthetic example and ask: “Find two policies that tie on average travel time but differ sharply in fairness. Explain which metric exposes the difference.” Verify the arithmetic. Ask for counterexamples to each candidate objective. This use of AI is valuable because it searches for failure cases. The team still chooses the policy criterion and must justify it to the stakeholder.

For validation, compare predicted travel times with a sample of route queries or observed trips. Stress capacities and closures. Audit every assignment. Interview logic can also matter: if a nominally accessible site is closed during the target population's available hours, mathematical coverage is fictional. Record these operational constraints explicitly rather than relegating them to “future work.”

The conclusion should not claim that mathematics discovered the morally correct allocation. It should say which access definition was adopted, how alternative definitions change site selection, and what evidence supports the chosen balance. A policy model is transparent when the value judgment is visible enough to debate.

### Studio E: opening internal roads in a residential district

The final studio is a network-and-simulation case inspired by a recurring urban-traffic problem family. A city considers opening selected internal roads in several gated residential districts. It wants to reduce congestion on surrounding roads without creating unsafe cut-through traffic or harming residents. Available information includes a road network, intersection capacities, observed peak flows, candidate gates, and several district layouts.

The first mistake is to treat “open or closed” as one universal intervention. Different gate locations and internal topologies produce different paths. Define scenarios: no opening, one controlled connection, multiple connections, peak-only opening, or restricted vehicle classes. The decision includes where, when, and under what rule to open. A diagram of each network scenario is therefore part of the model definition, not merely a result figure.

Begin with a static traffic assignment or even a shortest-path baseline. State how origin–destination demand is estimated. If demand is unknown, the team cannot infer it solely from one link count without additional assumptions. Calibrate on existing flows and reserve some sensors for validation. A baseline should reproduce the rough direction and magnitude of current congestion before the network is modified.

Represent each road as an edge with free-flow time and capacity. One common volume-delay relation increases travel time as flow approaches capacity. The exact form and parameters require justification; do not import coefficients from a different city without sensitivity analysis. At intersections, turning conflicts may dominate link capacity. If the question depends on signals or queues, a link-only model may be insufficient and a microscopic or mesoscopic simulation may be justified.

Construct a toy network with two perimeter routes and one proposed internal link. Calculate shortest paths before and after opening. The new link may reduce individual distance but attract enough flow to create a bottleneck at its exit. This is a valuable counterexample to “more roads always reduce congestion.” If route choice responds to travel time, iterate assignment until flows and costs are consistent, or explain the approximation used.

Compare scenarios using more than mean travel time. Report total system travel time, maximum volume-to-capacity ratio, queue spillback or intersection delay if modeled, and residential exposure such as internal vehicle-kilometers. An opening that saves commuters two minutes while sending heavy traffic past a school may not be acceptable. Keep hard safety or exposure constraints separate from soft travel-time preference where appropriate.

The strongest visuals work as a sequence. First show the network and gate scenarios. Then map calibrated baseline flow against observations. Next show before-and-after link loads on a shared scale. Finally plot scenario performance across congestion and residential exposure. The last chart should reveal whether one plan dominates or whether the decision lies on a trade-off frontier. Avoid drawing every simulated vehicle; aggregation should match the claim.

AI can review simulation logic by generating invariants: vehicles should not disappear, link flow should respect direction, travel time should not fall when congestion increases under the chosen delay rule, and total completed trips should match demand after accounting for unfinished trips. Ask for tiny network tests, not for a city-scale simulator generated in one response. A two-route test with known equilibrium behavior is far more valuable than thousands of unverified lines.

Sensitivity should vary origin–destination demand, capacity, route-choice responsiveness, and compliance with restrictions. Use correlated scenarios when appropriate: bad weather may reduce capacity and change demand simultaneously. Identify thresholds where the recommended gate changes. If all plans perform similarly within measurement error, say so; false precision is not a competitive advantage.

The final recommendation can be conditional: open Gate 2 during weekday peaks only when perimeter volume exceeds a measured trigger, restrict heavy vehicles, and monitor two internal intersections. State the predicted benefits and residential costs under each scenario, and propose a pilot that can falsify the model. This turns simulation into an accountable policy experiment.

### Cross-case review: what the five studios share

The domains differ, but the work pattern is remarkably stable. Each studio began by replacing a broad word—protection, profit, demand, access, or congestion—with a measurable decision criterion. Each wrote a balance, assignment, or observation contract before selecting an algorithm. Each created a tiny instance whose answer could be checked independently. Each compared a baseline with one extension that addressed a named failure. Each treated uncertainty as part of the decision instead of adding a sensitivity chart at the end.

Notice also what changed. The reservoir needed conservation and scenario dynamics. Crop planning needed integer feasibility and multi-year indexing. Service demand needed temporal validation and leakage control. Clinic placement needed an explicit fairness judgment. Road opening needed network calibration and behavioral feedback. “Use machine learning” or “use optimization” would have been too vague to guide any of them. The mathematical object followed the mechanism and decision.

If your team practices these studios, do not copy the completed formulation. Change one structural feature and rebuild the chain. Give the reservoir a salinity state. Let crop plots be divisible but charge a fixed setup cost. Introduce delayed service completions. Allow a clinic to change location midweek. Make drivers respond imperfectly to information. A useful variation should force a new modeling decision, not merely new parameter values.

Run a blind review after each practice. Give one teammate only the prompt, model contract, central figure, and conclusion. Ask them to trace every recommendation backward. If they cannot find the objective, baseline, or validation behind a claim, the evidence chain is broken. If they can trace it but reject a value judgment, the paper has at least made the disagreement explicit.

Finally, compare the cost of complexity. Record how long the extension took, how much it improved validation, and whether it changed the recommendation. This habit protects the team from spending half a competition on an elaborate model that adds one decimal place but no decision value. Competition technique is the disciplined allocation of limited reasoning time.

### A seventy-two-hour execution simulation

The five studios explain modeling decisions, but a competition also tests when those decisions are made. Let us therefore follow one team through a simulated seventy-two-hour event. The scenario is fictional, yet every artifact is something a real team can prepare and inspect. The team has three members: Lin leads mathematical formulation, Maya leads data and computation, and Noah leads evidence and writing. These are temporary responsibilities, not walls. Every result needs a second pair of eyes, and everyone must be able to explain the final recommendation.

The team receives six problems and chooses the mobile-clinic case from Studio D. The prompt asks for site selection, weekly routing, fairness analysis, and a policy memorandum. Data include candidate locations, community demand, a road-time matrix, capacity, cost, and demographic indicators. One file has missing travel times and another uses census tracts rather than the community identifiers in the demand file. The deadline clock begins before those problems are solved.

#### Hours 0–3: choose by evidence path

During the first twenty minutes, each member reads independently and marks facts, decisions, outputs, and ambiguous terms. Nobody opens a coding environment. They then compare interpretations. Lin notices that “three mobile units” may mean three vehicles, not three permanently open sites. Maya finds that the routing matrix covers only weekdays. Noah notices that the memorandum requires a recommendation for both ordinary and emergency conditions. These details immediately affect the model boundary.

The team scores three candidate problems. The clinic problem ranks well on data usability and validation because a distance matrix and capacities are provided. Its main risk is the fairness objective. A second problem has elegant differential equations but lacks calibration data. A third has rich text and few measurable outcomes. They choose the clinic problem, not because location models are familiar, but because they can describe an end-to-end evidence chain: clean identifiers, establish a coverage baseline, formulate site and route decisions, compare fairness definitions, stress disruptions, and translate the result into a policy.

Before hour one ends, Noah creates the deliverable map. Task one will become a problem definition and baseline coverage map. Task two will become the optimization formulation and selected sites. Task three will become scenario and fairness analysis. Task four will become the memorandum. Each requested item has a destination. Lin writes the first model contract. Maya creates an immutable copy of raw data and a schema notebook. Noah starts a source and decision log.

At hour two they resolve what they can. They interpret one unit as one vehicle that can serve one site per half-day. “Access” initially means weighted travel time, with a separate minimum coverage constraint for high-need communities. They flag both choices for sensitivity. A one-page risk register lists identifier mismatch, missing travel times, ambiguous capacity units, fairness definition, emergency road closure, and insufficient time for a full routing model. Every risk has an owner and a cheap early test.

Their first review at hour three asks five questions. Can each person state the decision in one sentence? Does every variable have an entity, time index, and unit? Can the supplied data populate a baseline? Which ambiguity can reverse the result? What is the smallest result they can deliver by hour eight? Because the answers are concrete, they continue. If the answers had been vague, switching problems would still have been possible.

#### Hours 3–8: clean data and complete the baseline

Maya begins with the identifier crosswalk rather than a map. She counts unique community IDs in every file, performs a one-to-one merge audit, and creates an exception table. Three demand rows refer to merged census tracts. Instead of silently dropping them, the team aggregates them using a documented population-weighted rule and retains the original IDs in a lineage table. Missing travel times are not filled with the column mean. They correspond to disconnected road pairs. The team checks whether a nearby candidate site is reachable and represents truly unreachable pairs with an explicit large value plus a reachability flag.

Lin constructs a baseline: choose the three sites with the largest nearby demand and assign each community to its closest chosen site, respecting no capacity yet. The rule is intentionally naive. A six-community toy instance is solved by hand. Maya writes a pure evaluator that takes selected sites and assignments and returns total demand, weighted mean travel time, maximum time, coverage within thirty minutes, high-need coverage, capacity violation, and cost. The evaluator is separate from the optimizer so it can audit any solution.

The real baseline reveals two problems. One popular site exceeds capacity by 38%, and a remote high-need community is 71 minutes away. This is useful failure, not embarrassment. It shows why capacity and fairness must enter the model. Noah creates a baseline table and writes the first defensible result sentence. He does not call the baseline bad; he states exactly which requirements it violates.

At hour six, the team discovers that capacity is reported per full day while the demand is weekly. The decision log records the conversion assumption: five service days, two half-day sessions per day, and a specified service rate per session. They create low and high service-rate scenarios because the rate is uncertain. This prevents a unit mismatch from hiding inside the solver.

By hour eight, the baseline pipeline runs from raw data to a reproducible table and map. The map shows demand points, candidate sites, selected baseline sites, and unreachable pairs. The caption names the denominator and date. The team freezes the baseline output folder and tags the code version. Now every extension must demonstrate what it improves relative to this point.

#### Hours 8–18: formulate one model and test it aggressively

Lin writes the capacitated facility-location model using binary site variables and assignment variables. Every constraint is paired with a sentence. Maya implements the evaluator first and then the optimization model. They do not add routing yet. The immediate question is whether capacity and high-need coverage change site selection.

The first solver run returns an objective lower than the hand-computed lower bound. That is a warning. The team resists celebrating. The assignment variables were allowed to be fractional, so one community was divided among several sites even though the policy requires one assigned clinic session. They decide that splitting is actually operationally possible only across days, not within a session. They revise the time index rather than merely forcing all assignments binary. The model becomes larger, but its variables now match the decision.

Next, the independent evaluator reports that one selected site serves demand without being opened. The linking constraint was written with reversed indices. The toy instance catches the bug. After correction, the solver and enumeration agree on the small case. The team checks a deliberately infeasible assignment, zero demand, one closed road, and doubled capacity. Each case behaves as predicted.

At hour twelve they compare three objectives: weighted mean travel time, maximum travel time, and mean time with a high-need coverage constraint. The first abandons the remote community. The second creates an expensive plan that worsens access for most residents. The third produces a compromise. Rather than hiding the alternatives, Noah begins a trade-off figure with all three plans and a clear baseline.

They then vary the high-need coverage threshold from 70% to 100%. Cost and mean time change gently until 92%, after which one additional site pattern is required and cost jumps. That threshold is policy-relevant. The model does not decide whether 92% or 95% is morally correct, but it reveals the price of the choice.

At hour sixteen a temptation appears: add a multiobjective evolutionary algorithm. Lin asks what failure it would fix. The exact model already returns solutions across the threshold grid in seconds. A metaheuristic would add implementation and validation cost without answering a missing question. They reject it and record the reason. The saved time is used to build disruption scenarios.

The hour-eighteen gate requires solver status, a hand-checked instance, an independent feasibility audit, baseline comparison, and one result that changes a real decision. All are present. Routing remains absent, but the core site-and-assignment model is trustworthy enough to become the paper's center.

#### Hours 18–30: extend only where the baseline fails

The prompt also asks for weekly movement of mobile units. A full vehicle-routing model with uncertain service time could consume the remaining contest. The team chooses a layered approximation. The location model selects half-day service sites. A second scheduling model assigns three units across sessions while limiting relocation time between consecutive sites. This preserves the primary policy question without pretending to optimize every street-level movement.

Maya checks whether the road matrix is asymmetric. It is: morning traffic and one-way streets create different travel times. The schedule therefore uses directed transitions. Lin adds continuity constraints linking each vehicle's location between sessions. Noah draws a three-lane schedule in which each row is a vehicle and each block a site visit. The diagram is a result because it makes implementability visible.

Emergency analysis closes one bridge and removes one candidate site. The ordinary optimum loses coverage. A robust alternative has 4% greater mean travel time in the ordinary scenario but maintains the high-need threshold in all tested disruptions. The team does not simply declare the robust plan superior. It reports the price of resilience and shows when the emergency plan should be activated.

They test demand error at ±10%, ±20%, and a spatially concentrated surge. Uniform growth primarily stresses capacity; concentrated growth can change selected sites. This distinction becomes a useful explanation of mechanism. A generic tornado chart of all parameters would not communicate it as clearly as scenario maps and a threshold table.

At hour twenty-four, Maya finds that one demographic indicator was normalized using the full dataset before a scenario split. This is not prediction leakage in the ordinary sense, but it makes scenario comparison dependent on a future distribution. They replace it with an externally defined need score and explain the components. The incident log records the issue for later practice.

AI is used narrowly. The team provides the scheduling constraints and asks for counterexamples: “Construct the smallest assignment that satisfies these equations but teleports a vehicle.” One returned example reveals that initial locations were unconstrained. Lin verifies it and adds the missing initial condition. Later, AI suggests that two emergency scenarios may be redundant; Maya calculates their effects and confirms they produce identical feasible sets, so one is removed. The log records both accepted contributions and the checks.

By hour thirty, the extension has a clear reason: it converts static access into an implementable weekly schedule and exposes vulnerability to disruptions. The team refuses further method expansion. From this point, new mathematics requires evidence that an existing conclusion is invalid.

#### Hours 30–44: build the paper around claims, not code order

Noah has been writing definitions and data provenance throughout, but now the paper's argument becomes explicit. The section order does not mirror the order of notebook cells. It begins with the stakeholder decision and access definition, then the data and baseline, then the site model, schedule extension, uncertainty analysis, and recommendation.

Each major subsection begins with a question. Which communities are poorly served now? Which site pattern improves access while preserving high-need coverage? Can three units execute the plan? What happens when a bridge or site fails? The equations and figures answer those questions. This structure prevents the paper from becoming an algorithm catalogue.

The team creates a claim ledger. One row says: “The fairness-constrained plan raises high-need thirty-minute coverage from 76% to 94% with a 6% increase in weighted mean travel time relative to the mean-time optimum.” Its evidence is a table generated by the evaluator and a trade-off plot. Another says: “The robust plan maintains at least 90% high-need coverage in every tested disruption.” Its evidence is a scenario matrix. Every percentage is linked to a script output.

Figures are regenerated at final column width. The baseline and recommended maps share the same extent, legend, and color scale. The trade-off plot labels three policies directly. The schedule diagram uses consistent site colors. A sensitivity plot marks the 92% threshold where the site configuration changes. Noah removes two decorative charts because they repeat the table without strengthening a claim.

Captions are written as results. “Figure 4: Map of selected sites” becomes “Figure 4: The fairness constraint shifts one weekly stop from the central district to the northwest, bringing 18% more high-need residents within thirty minutes while leaving the southeast unchanged.” Lin checks whether the statement follows from the figure and data. Maya verifies the percentage.

At hour thirty-eight, the team performs a notation audit. The draft uses $d_i$ for both demand and distance in different sections. They rename demand $q_i$ and travel time $\tau_{ij}$ everywhere, including code-generated equation labels. Units are added to the parameter table. A search catches “optimal” in six places; four are replaced by “selected” because they refer to scenario comparisons rather than proven global optima.

The model section does not claim that the need score is objective truth. It states the chosen indicators and weights, provides alternatives, and shows sensitivity. This intellectual honesty strengthens the policy argument. A judge can disagree with the weights without suspecting that the trade-off was hidden.

#### Hours 44–56: validate the recommendation, not only the solver

The team now asks whether the recommendation would remain useful outside the exact dataset. First comes implementation validation: rebuild from a clean environment, rerun the toy instance, and compare solver outputs with the evaluator. Then empirical validation: compare a sample of matrix travel times with independent route estimates. Large discrepancies are concentrated in one rural region, so those pairs receive a wider uncertainty range.

Comparative validation includes the naive demand baseline, the unconstrained mean-time optimum, the fairness-constrained plan, and the robust plan. All use the same demand, capacities, and evaluator. Runtime is reported, but decision metrics receive priority. The exact optimizer's bound is recorded. For the scheduling layer, where the approximation is more heuristic, they state that no global optimality claim is made.

Decision validation asks a harder question: would the county choose differently if the need-score weights, service rate, or coverage threshold changed? A heat map shows selected site patterns across two influential parameters, while a table gives the few distinct regimes. The recommended plan occupies a broad central region but changes under low service rate and very high fairness threshold. The paper converts that finding into a monitoring trigger: re-estimate the plan if observed service rate falls below the stated value.

Noah gives only the abstract, central figures, and conclusion to a classmate. The classmate understands that fairness costs some average travel time but cannot tell whether clinic rent is included. The team adds cost to the trade-off table and clarifies that vehicle purchase cost is fixed and excluded. This ten-minute external read finds a communication gap the authors no longer noticed.

AI performs a consistency review using only verified artifacts: symbol table, equations, result table, captions, and conclusion. It flags two mismatched scenario names and one percentage rounded differently. The team corrects them manually. A claimed causal phrase—“the plan reduces illness”—is removed because the model predicts access, not health outcomes.

At hour fifty-two, the team runs a pre-mortem. Suppose the plan fails during the first month. Possible causes include underestimated service time, no-shows, site closure, travel-time error, and community reluctance. Each receives a measurement and response. Only mechanisms represented by the model support quantitative claims; the rest become implementation limitations and pilot-study recommendations.

The validation gate closes when every major claim has at least one check, every limitation is connected to a possible consequence, and the recommendation includes conditions for revision. More model complexity would now threaten rather than improve evidence quality.

#### Hours 56–66: integrate, compress, and freeze

The paper is two pages over the limit. The team does not shrink fonts. They remove repeated descriptions of the algorithm, merge two parameter tables, move routine derivations to an allowed appendix, and replace a page of scenario prose with one matrix and a focused paragraph. Compression tests understanding: if a section cannot be shortened without losing its only evidence, it is probably essential; if three paragraphs say the same thing, they were never three claims.

Lin checks every equation against the implemented model. Maya regenerates tables and figures into a clean output directory. Noah updates cross-references and bibliography entries. No number is typed manually into the conclusion. The final policy memorandum is written for the county rather than for a solver expert: which sites, which days, what access gain, what cost, what emergency switch, and what data to monitor.

At hour sixty, model structure freezes. A late idea proposes demand-weighted relocation penalties. The team records it but does not implement it because it cannot be validated before submission. Freeze does not mean ignoring errors. A verified flaw can still reopen the model; an attractive possibility cannot.

They inspect the compiled PDF on two computers. One map legend is unreadable in grayscale, so its categories receive different outlines. A figure extends beyond the margin. Two equations break across lines. A citation points to a secondary summary instead of the original dataset documentation. These are corrected without changing the model.

An anonymization check removes university and file-path metadata. The AI-use statement is compared with the log and contest rules. Every external image or base map has a source. The code archive, if permitted, contains a README with the one command needed to rebuild figures. The final file name and page count match the instructions.

The team creates a release candidate and forbids direct edits. Corrections occur in source, trigger a rebuild, and generate a new candidate with a checklist. This avoids the familiar disaster in which someone fixes the PDF manually and disconnects it from the source.

#### Hours 66–72: submit a traceable result

The last hours are deliberately quiet. One member reads the prompt beside the paper and marks where every requested deliverable is answered. Another traces every conclusion number backward to evidence. The third verifies submission fields and opens the uploaded file after transfer. They rotate once so no check depends on one person's familiarity.

They find one remaining problem: the conclusion says the robust plan adds 4% travel time, but the table reports 4.4%. The difference is rounding, yet the abstract says “only 4%,” which suggests greater precision than justified. They standardize rounding and remove “only.” Small words can overstate evidence.

The uploaded PDF is opened from the submission system, not from the local folder. Pages, fonts, equations, and figures render correctly. The confirmation is saved. The team then stops editing. Continuing after a verified submission can introduce more risk than value.

Their final model is not the most complicated possible solution. It is complete: a documented interpretation, audited data, reproducible baseline, tested optimization, implementable schedule, fairness trade-off, disruption analysis, traceable figures, bounded claims, and monitoring plan. The seventy-two-hour simulation shows why technique is not a collection of shortcuts. It is a sequence that protects the evidence chain while time pressure tries to break it.

#### Failure injection for your own rehearsal

When your team repeats this exercise, ask someone outside the active pair to inject one failure without revealing it immediately. Change a unit from minutes to seconds, duplicate a set of rows, reverse one directed edge, leak a future column, remove a capacity constraint, alter a figure scale, or place an unsupported number in the conclusion. The team's checks should catch the failure. If they do not, add a preventive test to the workflow.

Rotate the injected failure across layers. A data failure tests schema and lineage. A formulation failure tests toy examples and independent evaluation. A computational failure tests invariants and reproducibility. A visual failure tests shared scales and caption review. A writing failure tests the claim ledger. This turns vague confidence into observable reliability.

Score the rehearsal on more than final objective value. Record the time until a baseline, the time until the first verified result, the number of broken handoffs, the number of regenerated rather than manually edited figures, and the fraction of conclusion claims with traceable evidence. A team can improve these process measures even when practice problems differ radically.

The postmortem should remain concrete. “Communicate better” is not an action. “Every dataset transformation must report row counts and unmatched keys” is. “Start earlier” is not a system. “Freeze model structure twelve hours before the deadline unless a verified error invalidates the result” is. Convert each lesson into a rule, template, test, or artifact that the next practice can use.

## Integrated Preparation Routine

Do not turn this blog into a rigid daily timetable. Build a repeatable weekly loop instead. Read one strong paper and make a paper card. Reconstruct one figure and explain its claim. Extend one algorithm from the course with a tiny tested example. Put the notes, code, and limitations in the shared workspace. Once a month, choose one old problem and complete a small end-to-end submission under a time limit.

After the practice, conduct a postmortem. Which decision consumed the most time? Which handoff broke? Which figure failed to support its claim? Which AI output was useful, and which created verification debt? Convert each answer into one change to the team workflow. Improvement comes from closing this loop, not from collecting more bookmarks.

The first blog taught us to build a modeling contract. Competition technique is the art of preserving that contract under pressure. Choose the problem by its evidence path, give each tool one job, learn from strong work without copying it, rebuild the visuals that sharpen your judgment, extend methods beyond class, and use AI as a critic and assistant rather than an oracle. Then, when the clock starts, your team is not beginning from zero; it is executing a system it has already practiced.

There is a small easter egg hidden in this blog's advice: the best “competition trick” is not a trick at all. Open an old problem, set a ninety-minute timer, and stop exactly when it rings. The artifact on your screen—especially what is still missing—will tell you more honestly than any self-assessment which part of your team system needs practice.

## Knowledge Check

These ten questions move from basic workflow choices to formulation, validation, bounds, and late-stage competition judgment. Single-choice and multiple-choice items are mixed. A correct first attempt earns the full EXP shown for that question; a correct retry earns partial credit.

<section class="modeling-quiz" data-modeling-quiz="lesson-2" data-locale="en"></section>

### Official References

- [CUMCM competition charter and purpose](https://www.mcm.edu.cn/html_cn/node/9183046a45d10cedcd4bce2688fc98b3.html)
- [CUMCM official archive of competition problems](https://www.mcm.edu.cn/html_cn/block/8579f5fce999cdc896f78bca5d4f8237.html)
- [COMAP MCM/ICM problem-family overview](https://contest.comap.com/undergraduate/contests/index.html)
- [COMAP MCM/ICM current rules and instructions](https://contest.comap.com/undergraduate/contests/mcm/instructions.php)
- [COMAP contest AI policy](https://www.contest.comap.com/undergraduate/contests/mcm/flyer/Contest_AI_Policy.pdf)
