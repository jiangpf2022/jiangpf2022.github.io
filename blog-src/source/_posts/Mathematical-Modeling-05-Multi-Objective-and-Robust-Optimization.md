---
title: 6 - Multi-Objective & Robust Optimization
date: 2026-09-15 18:00:16
permalink: 2026/09/15/Mathematical-Modeling-06-Multi-Objective-and-Robust-Optimization/
categories: Mathematical Modeling
tags:
  - Multi-Objective Optimization
  - Robust Optimization
  - Decision Analysis
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 160
lesson_number: 6
lesson_level: 1
review_lock: false
excerpt: "Construct Pareto frontiers, expose stakeholder trade-offs, and derive decisions that remain feasible under uncertain inputs."
---

Today begins with a disagreement. One teammate wants the cheapest plan, another wants the safest plan, and the client insists that service quality cannot fall. Nobody is necessarily wrong. The modeling mistake would be to hide that disagreement inside one unexplained score.

This blog develops two related ideas. **Multi-objective optimization** makes conflicting goals visible instead of pretending they are one. **Robust optimization** asks whether a chosen decision survives reasonable errors in the data. Our real competition case comes from 2024 MCM Problem A, where Outstanding papers modeled how environmentally responsive sex ratios alter sea-lamprey populations and surrounding ecosystems. It is a natural multi-objective problem: suppress an invasive population, preserve ecosystem stability, and avoid an intervention so aggressive that it creates a new failure.

<div class="mm-key-box"><span class="mm-callout-label">Two promises, two tests</span><p>A multi-objective model promises that the trade-off has been exposed. A robust model promises that feasibility or performance survives a declared uncertainty set. Neither promise is fulfilled by adding the words “comprehensive” or “robust” to a weighted score.</p></div>

## 1. Why One Objective Is Often Dishonest

Suppose a city chooses bus frequency $x$. Annual cost $C(x)$ decreases when buses are removed, passenger waiting $W(x)$ decreases when buses are added, and emissions $E(x)$ depend on both fleet use and congestion. There is no physically meaningful unit in which dollars, minutes, and tonnes can simply be added.

Write the vector objective

$$\min_{x\in X}F(x)=\big(C(x),W(x),E(x)\big).$$

$X$ contains hard rules such as fleet size, driver hours, and minimum coverage. The optimizer no longer returns “the” smallest vector because vectors are only partially ordered. A plan can be cheaper but slower. The result we need is a set of efficient compromises, followed by a transparent decision rule.

Separate hard constraints from soft objectives. If every district must receive at least one bus per hour, that is usually a constraint, not another weighted preference. Turning a legal or safety minimum into a small penalty permits the optimizer to violate it whenever another term pays enough.

### Begin with people who disagree for good reasons

Imagine a town deciding where to place a new ambulance base. The finance director wants to minimize annual cost. The emergency physician wants to minimize the longest response time. The mayor wants no neighborhood to receive systematically worse service. The operations manager wants a site with enough room for future vehicles. If we ask each person for “the objective,” we receive four answers because the decision genuinely has four consequences.

It is tempting to avoid the conversation by writing

$$
\min_x\ 0.25C(x)+0.25T(x)+0.25F(x)+0.25G(x).
$$

This formula looks balanced, but the equal coefficients mean almost nothing. Cost may be measured in millions of dollars, response time in minutes, future capacity in vehicles, and inequality in minutes or a dimensionless index. The largest numerical scale dominates. Even after normalization, equal weights assert that a specific movement across each chosen range is equally valuable. That is a policy judgment, not a mathematical fact.

Start instead with an objective inventory. For each candidate consequence, record:

- its definition and unit;
- the stakeholder who cares about it;
- whether it is a benefit to maximize or harm to minimize;
- whether a threshold is mandatory;
- the time horizon over which it is measured;
- how uncertainty affects it;
- and what evidence would validate it.

For the ambulance example, annualized cost might include rent, vehicles, staffing, and expected overtime. Average response time weights busy neighborhoods heavily. Maximum response time protects the worst incident but can be driven by one remote location. A 90th-percentile response time protects the tail without letting a single extreme case determine everything. A group disparity metric compares neighborhoods, but its result depends on how groups are defined.

Definitions should be tested on small distributions. Consider response times under two plans:

$$
A=(4,4,4,4,14),\qquad B=(6,6,6,6,6).
$$

Plan A has mean six minutes, exactly like B, but a maximum of fourteen rather than six. If the service promise is “most calls are fast,” A may be attractive. If a fourteen-minute delay is medically unacceptable, the mean conceals the failure. A single-objective average model has not merely simplified the story; it has selected a distribution of harm.

The word “fairness” also needs a mathematical object. Possible definitions include the maximum difference between group averages,

$$
\max_{g,h}|\bar T_g-\bar T_h|,
$$

the maximum group response time, a ratio between best and worst service, or an inequality index. Each detects different patterns. Small average differences can coexist with terrible individual tails. A strict individual guarantee can be infeasible in a large rural region. Show multiple summaries before choosing one fairness objective.

### Hard rule, aspiration, or tradeable preference?

A hard constraint defines the feasible set. A soft objective ranks feasible points. A target with penalized deviation lies between them. Confusing these roles is one of the most consequential modeling errors.

Suppose regulations require every emergency call to be reachable within twenty minutes under normal road conditions. That is

$$T_i(x)\le20\qquad\forall i,$$

not a term $w\sum_i\max(0,T_i(x)-20)$ with an arbitrary finite weight. The penalty version permits a violation when another objective improves enough. Use it only if violations are genuinely allowed and the penalty represents their consequence.

Conversely, declaring every aspiration hard can make the model infeasible. A council may say “keep cost below 2 million, average response below 6 minutes, every response below 8 minutes, and use only existing property.” The correct outcome may be that no plan can satisfy all four. An elastic diagnostic introduces slacks $s_j$ and minimizes a prioritized violation measure. It tells stakeholders which promises conflict; it does not quietly redefine the promises.

A useful interview question is: “If this threshold cannot be met, should the model return no plan, or should it return the least harmful violation?” The answer distinguishes a hard requirement from a goal. A second question is: “Would you accept a one-unit violation in exchange for enough improvement elsewhere?” If the answer is never, use priority or a hard constraint rather than a finite weighted sum.

### Objectives are accounting identities

Cost should be built from components rather than imported as a mysterious column:

$$
C(x)=C_{\mathrm{fixed}}(x)+C_{\mathrm{staff}}(x)
+C_{\mathrm{travel}}(x)+C_{\mathrm{failure}}(x).
$$

Each component needs a unit and horizon. Annual fixed cost cannot be added directly to one-day travel cost. Convert both to the same horizon or present them separately. Discount future cash flows consistently if plans have different lifetimes.

Environmental impact can be equally ambiguous. Tailpipe emissions, lifecycle emissions, local particulate exposure, energy use, and habitat disruption are not interchangeable. A zero-tailpipe electric fleet may shift emissions to power generation. A single carbon-equivalent measure may be suitable for climate comparison but not local air-quality justice. State the boundary of every objective.

Service quality may be endogenous. Adding buses can reduce waits, attract more passengers, and create new demand. If demand is treated as fixed, the model captures short-run operations rather than long-run behavioral response. That may be acceptable, but the conclusion should not be extended beyond the modeled horizon.

### A first complete model: a neighborhood clinic

A mobile clinic must choose visits $x_j$ to four neighborhoods. Each visit costs $c_j$, serves expected patients $a_j$, and consumes $h_j$ staff-hours. Let $u_j$ be unmet need and $H$ total staff-hours:

$$
\begin{aligned}
u_j&\ge d_j-a_jx_j,\qquad u_j\ge0,\\
\sum_jh_jx_j&\le H,\qquad x_j\in\mathbb Z_+.
\end{aligned}
$$

Three natural objectives are

$$
f_1(x)=\sum_jc_jx_j,qquad
f_2(x)=\sum_ju_j,qquad
f_3(x)=\max_j\frac{u_j}{d_j}.
$$

$f_1$ measures cost, $f_2$ total unmet need, and $f_3$ the worst neighborhood shortage rate. Minimizing only $f_2$ favors large neighborhoods because one visit may cover more people. Minimizing only $f_3$ pushes toward proportional fairness. Neither is wrong; they answer different questions.

Linearize $f_3$ with epigraph variable $t$:

$$u_j\le td_j\quad\forall j,$$

and minimize $t$. If $d_j>0$ are data, these constraints are linear. We can now compute a frontier between total unmet need and worst shortage while constraining cost. A map should show which neighborhoods gain or lose across the frontier; a scalar plot alone may hide the distribution.

Suppose one neighborhood has tiny reported demand because previous clinic hours were inaccessible. Treating $d_j$ as objective truth reproduces measurement bias. A robust or scenario analysis can explore higher latent demand, but structural investigation is also needed. Uncertainty mathematics cannot substitute for asking why the observation is low.

### Why “comprehensive evaluation” is not automatically multi-objective optimization

Some reports calculate entropy weights, analytic-hierarchy weights, or principal-component scores and then call the result multi-objective optimization. Scoring and optimization are different. A score ranks objects given attributes; an optimization chooses decisions subject to constraints. A weighted evaluation can inform an objective, but it does not reveal a Pareto frontier or prove that the selected decision is feasible.

Analytic hierarchy process can elicit pairwise judgments. Entropy weights reflect dispersion in observed data, not social importance. A criterion with little historical variation can receive low entropy weight even if it is ethically essential. Principal components preserve variance, not stakeholder value. Use these tools only for the role they actually perform.

Multi-objective modeling begins with a feasible decision set and multiple consequences of those decisions. It makes the disagreement inspectable. The outcome may ultimately be one selected compromise, but the route to that point should show what alternatives were discarded and why.

## 2. Pareto Dominance and the Efficient Frontier

For minimization, decision $x$ dominates $y$ if

$$f_i(x)\le f_i(y)\quad\forall i,$$

and at least one inequality is strict. A feasible point is Pareto efficient if no other feasible point dominates it.

Consider four plans with (cost, average wait):

$$A=(10,14),\quad B=(12,9),\quad C=(15,7),\quad D=(14,12).$$

$B$ dominates $D$: it is cheaper and faster. None of $A,B,C$ dominates another, so they form the discrete Pareto set. Removing $D$ is a mathematical conclusion; choosing among $A,B,C$ is a value judgment.

For a smooth continuous frontier $w=h(c)$, the slope $-h'(c)$ is the local exchange rate: how many minutes of waiting can be reduced by accepting one more unit of cost. A “knee” is a region where small improvement in one objective suddenly requires a large sacrifice in another. Knee points are useful candidates, not automatic answers.

<div class="mm-question-box"><span class="mm-callout-label">Stop and compare</span><p>If Plan P costs 2% more than Plan Q but cuts worst-district waiting by 30%, which plan is better? You cannot answer until you know whether equity is a hard requirement, whose waiting is measured, and how much budget flexibility exists. Write those missing facts before choosing weights.</p></div>

### Dominance is simple; frontier construction is not

For two objective vectors $p$ and $q$ in minimization, implement dominance with a numerical tolerance $τ$:

$$p_i\le q_i+\tau\quad\forall i,qquad
p_j<q_j-\tau\quad\text{for at least one }j.$$

Without tolerance, solver noise can make two effectively identical points appear to dominate each other unpredictably. But tolerance must be tied to objective scale. One dollar and one tonne need different absolute tolerances, or objectives should be normalized before the comparison.

If a candidate is infeasible, exclude it before dominance analysis. A low-cost plan that violates a service constraint is not a Pareto improvement; it is outside the decision set. When heuristics return approximate constraints, report violation separately and never reward infeasibility through a favorable objective.

For a finite set of $n$ plans and $m$ objectives, a direct $O(n^2m)$ comparison is often adequate. For large evolutionary populations, nondominated sorting algorithms and spatial data structures reduce cost. Computational speed is secondary to using the same objective definitions and feasibility rules for every plan.

Duplicates deserve attention. Two decisions can have the same objective vector but different geography, staffing pattern, or resilience. Merge duplicates for a clean objective-space plot, but retain links to all corresponding decisions. Operationally distinct alternatives at the same measured performance may be valuable because unmodeled considerations can break the tie.

### Decision space and objective space

The feasible set lives in decision space $X$. The image

$$Y=\{F(x):x\in X\}$$

lives in objective space. Pareto dominance is judged in $Y$, but implementation occurs in $X$. A smooth-looking objective frontier can correspond to abrupt changes in decisions.

In the clinic model, neighboring frontier points may change visits gradually if $x$ is continuous. With integer visit counts, moving the worst-shortage target from 25% to 24% might require an entire additional clinic day and cause a jump in cost. Connecting discrete points with a smooth curve visually invents unattainable compromises. Use markers and, when useful, step lines.

The feasible objective set can be convex even when $X$ is high-dimensional, or nonconvex because of fixed charges and integer choices. Weighted sums recover supported frontier points lying on a supporting hyperplane. Efficient points inside a concave indentation are unsupported. Epsilon constraints or other methods are needed to find them.

### Weak versus strong efficiency

A point is weakly Pareto efficient if no feasible point improves every objective strictly. It may still be possible to improve one objective without worsening the others. Strong Pareto efficiency excludes that possibility. Solving a weighted sum with all strictly positive weights yields a Pareto-efficient point under standard conditions; zero weights can return weakly efficient points that are unnecessarily poor on ignored objectives.

Suppose objective vectors are $A=(5,5)$ and $B=(5,4)$. With weight $(1,0)$ both tie, so a solver may return A, even though B dominates it. A secondary optimization—first fix optimal weighted cost, then minimize the neglected objective—removes this avoidable weakness.

### Ideal, nadir, and payoff tables

Before generating a frontier, optimize each objective alone. The ideal component

$$z_i^{\mathrm{ideal}}=\min_{x\in X}f_i(x)$$

collects individually best values, though the ideal vector is usually unattainable as a whole. Evaluate every single-objective optimizer on every other objective to create a payoff table. Its columns reveal conflicts and provide initial normalization ranges.

The nadir vector contains worst objective values among Pareto-efficient decisions, not worst values over all feasible points. It is harder to compute. Using the worst feasible value can exaggerate ranges and make normalized differences near the frontier look tiny. For practical normalization, state whether ranges come from payoff-table anchors, observed frontier estimates, stakeholder bounds, or physical limits.

For the four neighborhood clinic, solve minimum cost subject only to mandatory rules, minimum total unmet need, and minimum worst shortage. Suppose their objective triples are

$$
\begin{array}{c|rrr}
&\text{cost}&\text{total unmet}&\text{worst rate}\\\hline
x^{(1)}&40&190&0.80\\
x^{(2)}&95&45&0.35\\
x^{(3)}&110&55&0.20
\end{array}
$$

The second plan best serves total patients but is less equitable than the third. The table makes this conflict visible before any preference is imposed.

### Knee points without mythology

On a two-objective curve, a knee is a region of high trade-off curvature: moving past it gains little in one objective while losing much in another. Algorithms identify knees using distance from the line joining extremes, local angles, curvature, or marginal rates. These definitions can disagree and depend on scaling.

Take normalized points $A=(0,1)$, $B=(0.35,0.35)$, and $C=(1,0)$. Point B lies far below the chord from A to C and looks attractive. If the first objective is cost and the second mortality risk, however, choosing B solely because it is geometrically central ignores the consequence scale. A knee is a conversation candidate, not an ethical theorem.

Report marginal exchanges around the candidate. If moving from B toward lower risk costs $200{,}000$ per expected severe delay avoided, while moving toward lower cost adds one severe delay per $8{,}000 saved, stakeholders can reason about the asymmetry. Derivatives or finite differences are interpretable only when objectives retain meaningful units.

### Many objectives and the collapse of dominance

With two objectives, dominance removes many points. As objective count grows, most random points become mutually nondominated. A frontier of thousands of points does not help a decision maker. Reduce redundant objectives, impose hard thresholds, group related metrics, or use preference-guided search.

Parallel-coordinate plots show many objectives but can become cluttered. Radar charts are sensitive to axis ordering and area perception. Tables of selected archetypes—cheapest, safest, fairest, knee, and robust—often communicate better. Preserve the full nondominated set in supplemental data, then explain the selection rule for representative points.

An objective correlation plot can reveal redundancy. If cost and energy use move almost identically across feasible decisions, showing both may add little unless their rare disagreements matter. Do not remove a legally or scientifically distinct criterion merely because it is correlated in one sample; investigate why.

### Frontier algorithms and verification

For two objectives, epsilon-constraint sweeps are reliable when each subproblem can be solved globally. Adaptive grids add points where objective gaps are large. Normal-boundary intersection and normal-constraint methods seek even coverage of curved frontiers. Evolutionary multi-objective algorithms approximate fronts when subproblems are nonconvex or black-box, but they provide no automatic optimality certificate.

Evaluate an approximate frontier with convergence and diversity metrics. Hypervolume measures dominated objective-space volume relative to a reference point; inverted generational distance compares with a trusted reference set; spacing measures coverage. Each depends on normalization and reference choices. More importantly, independently verify feasibility and reevaluate objectives from decisions.

For small instances, compare a heuristic frontier with an exact epsilon-constraint frontier. For larger instances, use valid bounds on selected scalarizations, repeated seeds, and a strong baseline. A visually smooth cloud is not proof that difficult regions of the frontier were found.

## 3. Weighted Sums and Their Limits

Normalize objectives before weighting. A common formulation is

$$\min_{x\in X}\sum_{i=1}^m w_i\frac{f_i(x)-f_i^{\min}}{f_i^{\max}-f_i^{\min}},
\qquad w_i\ge0,\ \sum_iw_i=1.$$

Without normalization, the objective with the largest numerical scale controls the result. Weights then express relative importance on the chosen normalized ranges; they are not discovered by the solver.

For convex feasible objective sets, varying positive weights can recover supported Pareto points. For a nonconvex frontier, some efficient points lie in concave regions and cannot minimize any weighted sum. This is why a sweep over weights is not always a complete frontier.

Weights should be tested, not merely announced. Draw a weight simplex or vary one weight across a grid. Record when the chosen plan changes. If $w_C=0.49$ selects one plan and $w_C=0.51$ selects a completely different one, report the decision boundary instead of presenting one set of weights as objective truth.

### What a weight actually means

For differentiable objectives, minimizing $\sum_iw_if_i(x)$ balances weighted marginal changes. At an interior optimum,

$$\sum_iw_i\nabla f_i(x^*)=0.$$

The weights therefore set exchange rates after units and scaling are chosen. Multiplying one objective by 100 and leaving its weight unchanged changes the decision. Weights do not have an invariant meaning separate from objective definitions.

If normalized objective

$$\tilde f_i=\frac{f_i-L_i}{U_i-L_i},$$

then one unit of $\tilde f_i$ means movement across the full declared range $U_i-L_i$. Weight $w_i=0.6$ says a full-range movement in objective $i$ matters in the weighted score according to coefficient 0.6. Change the range and the implied preference changes.

Use stakeholder thresholds to choose ranges when possible. Normalizing cost between the observed minimum and an arbitrary catastrophic maximum can compress all realistic differences. A budget interval from 2 to 3 million has clearer meaning if those are genuine decision bounds. For waiting time, a service target and unacceptable threshold may define a value function better than min-max scaling.

### From raw metrics to value functions

Stakeholder value is often nonlinear. Reducing average wait from 30 to 20 minutes may be far more valuable than reducing it from 5 to 4. A piecewise-linear value function maps the physical metric to preference:

$$v_W(W)=
\begin{cases}
0,&W\le5,\\
(W-5)/10,&5<W<15,\\
1+3(W-15)/15,&15\le W<30,\\
4,&W\ge30.
\end{cases}
$$

The breakpoints should come from service commitments, behavioral evidence, or stakeholder elicitation. This mapping makes preference assumptions explicit. It does not transform subjective values into scientific facts.

Avoid double counting. If average wait and total passenger-hours waiting are both included while demand is fixed, they express nearly the same harm. If carbon emissions and fuel use are both included with separate weights, fuel's environmental effect may be counted twice in addition to financial cost. Draw a consequence tree from decisions to intermediate outcomes and final values.

### Weight elicitation through trade-off questions

Instead of asking “what weight should safety receive?”, ask a concrete question: “Near the current plan, what annual cost increase is acceptable to reduce the 90th-percentile response time by one minute?” If the answer is $150{,}000$, it identifies a local exchange rate. Repeat at different levels because value may be nonlinear.

Pairwise-comparison methods can structure judgments, but consistency must be checked. Group elicitation should record disagreement rather than averaging it away immediately. Show how each stakeholder's plausible weights alter the selected plan. If all plausible weights select the same plan, the decision is robust to preferences. If selections diverge, that disagreement is a result.

Inverse optimization estimates weights that make observed decisions appear optimal. It can describe historical revealed preferences, but observations may reflect constraints, habits, politics, or mistakes. Do not label inferred weights as what stakeholders morally ought to value.

### Supported points and a concrete nonconvex example

Suppose three feasible objective vectors are

$$A=(0,10),\qquad B=(6,6),\qquad C=(10,0).$$

All are nondominated. A positive weighted sum gives scores $10(1-w)$ for A, $6$ for B, and $10w$ for C, where $w$ weights the first objective. For B to win, we need both $6\le10(1-w)$ and $6\le10w$, requiring $w\le0.4$ and $w\ge0.6$ simultaneously—impossible. B is efficient but unsupported.

An epsilon constraint can recover B. Minimize the first objective subject to the second being at most 6. A is excluded, B has first objective 6, and C has 10, so B is selected. This three-point calculation is the clearest reason not to rely only on weight sweeps in discrete problems.

### Sensitivity maps rather than one ceremonial weight vector

With two normalized objectives, vary $w\in[0,1]$. Record intervals over which each plan is optimal. For several objectives, sample the weight simplex with a reproducible design and show selection frequencies. These frequencies are geometric properties of the assumed weight region, not probabilities of stakeholder belief unless a distribution over weights is justified.

Plot decision features as well as objective values. A facility choice may switch sharply across a boundary even though weighted score changes imperceptibly. Label regions in weight space by chosen site, fleet size, or policy. Such a map tells stakeholders where their disagreement actually matters.

If one plan wins across the full defensible weight region, preference uncertainty is unimportant. If every tiny shift changes the plan, seek a compromise stable in decision space, add switching costs, or gather better preference information. A model that exposes instability is more valuable than one that hides it behind three decimal weights.

## 4. Epsilon Constraints, Goal Programming, and Minimax Regret

The epsilon-constraint method selects one primary objective and turns the rest into bounds:

$$\min_x f_1(x)\quad\text{s.t.}\quad x\in X,\ f_j(x)\le\varepsilon_j, j=2,\ldots,m.$$

Sweeping $\varepsilon_j$ can recover non-supported efficient points. It also matches stakeholder language: “minimize cost while keeping average wait below eight minutes and emissions below the current level.”

Goal programming introduces positive and negative deviations from targets $g_i$:

$$f_i(x)+d_i^- -d_i^+=g_i,\qquad d_i^\pm\ge0.$$

The objective penalizes only the deviations that matter. For a maximum emissions cap, $d_i^+$ is undesirable while performing better than the cap need not be rewarded. Lexicographic goal programming optimizes priority levels sequentially so a tiny improvement in a lower-priority goal cannot purchase a large violation of a higher-priority one.

Under scenarios $s$, regret compares a decision with the scenario-specific best:

$$R_s(x)=f_s(x)-\min_{y\in X}f_s(y).$$

Minimax regret solves $\min_x\max_sR_s(x)$. It does not seek the best average outcome; it seeks the decision whose worst hindsight disappointment is smallest.

### Building an epsilon sweep correctly

Suppose cost $C(x)$ is primary and average waiting $W(x)$ is constrained. First solve the two anchor problems

$$W^{\min}=\min_{x\in X}W(x),\qquad W^C=W(x^C),$$

where $x^C$ minimizes cost. Sweep $ε$ between $W^{\min}$ and $W^C$ and solve

$$
\min_{x\in X}C(x)
\quad\text{s.t.}\quad W(x)\le\epsilon.
$$

Values below $W^{\min}$ are infeasible; values at or above $W^C$ reproduce the cost optimum. Adaptive refinement is better than a blind uniform grid: insert more epsilon values where adjacent solutions differ greatly in objectives or decision structure.

For discrete schedules, many consecutive epsilon values may return the same plan, followed by a jump. Do not connect those points with a curve that suggests continuous compromises. Record the interval over which each plan remains optimal. If solver tolerance permits $W(x)\leε+10^{-6}$, report results at compatible precision.

With several secondary objectives, a rectangular epsilon grid grows rapidly. Stakeholder thresholds can narrow the ranges. An augmented epsilon-constraint method adds a very small reward for secondary slack to avoid weakly efficient solutions, but the augmentation must be scaled so it never overrules the primary objective.

### Goal programming by meaning

Assume a transit agency targets annual cost no more than 10 million, average wait no more than 8 minutes, and emissions no more than 4,000 tonnes. Introduce deviations:

$$
\begin{aligned}
C(x)+d_C^- -d_C^+&=10,\\
W(x)+d_W^- -d_W^+&=8,\\
E(x)+d_E^- -d_E^+&=4000.
\end{aligned}
$$

For upper targets, positive deviations are violations. Negative deviations mean performance is better than target and may carry no reward. Minimizing

$$p_Cd_C^++p_Wd_W^++p_Ed_E^+$$

still requires compatible units or normalized deviations. Goal programming organizes preferences; it does not eliminate them.

Lexicographic goal programming protects priorities. Minimize safety violation first and obtain $v_1^*$. Add $d_{\mathrm{safety}}^+\le v_1^*+τ$, then minimize service violation. Continue to cost. A lower priority cannot purchase a material degradation of a higher one. Report achieved deviations at every level, especially when a target is impossible.

Targets can create plateaus. Once all targets are met, many plans have zero deviation. Add a final efficiency objective or present alternatives. Otherwise arbitrary solver tie-breaking may be mistaken for a deliberate recommendation.

### Reference points

Stakeholders may find an aspiration vector $r$ easier than abstract weights. An achievement scalarizing function is

$$
\min_{x\in X}\left[
\max_iw_i(f_i(x)-r_i)
+\rho\sum_iw_i(f_i(x)-r_i)
\right],
$$

where $ρ>0$ is small. The maximum term improves the worst weighted shortfall; the augmentation promotes strong efficiency. If aspirations are infeasible, the solution shows which dimensions prevent achievement. If they are easily exceeded, stakeholders can revise them interactively.

### Regret with a hand-checkable table

A town must select one flood project before learning whether the next decade is mild, wet, or extreme. Total costs including damage are

$$
\begin{array}{c|rrr}
&\text{mild}&\text{wet}&\text{extreme}\\\hline
A&12&28&70\\
B&18&23&46\\
C&31&31&36
\end{array}
$$

The scenario-wise best costs are 12, 23, and 36. Subtract them columnwise:

$$
\begin{array}{c|rrr}
A&0&5&34\\
B&6&0&10\\
C&19&8&0
\end{array}.
$$

Worst regrets are 34, 10, and 19, so minimax regret selects B. Worst absolute costs are 70, 46, and 36, so minimax cost selects C. Expected cost would require scenario probabilities. Three reasonable attitudes to uncertainty produce different answers.

Regret depends on the comparison set. Adding a project that performs extraordinarily in one scenario raises every other plan's regret in that scenario even though their physical outcomes do not change. Regret measures forgone opportunity relative to available alternatives, not harm in isolation.

### Objectives under uncertainty

When objectives and data are uncertain, distinguish a nominal frontier, worst-case frontier, expected frontier, and reliability-constrained frontier. A decision may be Pareto efficient nominally yet dominated under stress. Plot nominal and adverse objective vectors with lines joining the same decision. Large movement reveals fragility.

Mixed risk attitudes can be appropriate: minimize expected operating cost while protecting a safety constraint robustly and controlling a tail-risk service objective. State which quantity uses which uncertainty treatment. Comparing nominal cost with worst-case service without labeling them invites a false impression that both coordinates mean the same kind of evidence.

## 5. What Exactly Is Uncertain?

Do not use “uncertainty” as one undifferentiated word. At least four forms matter:

- **measurement error:** observed input differs from the true quantity;
- **parameter uncertainty:** a fitted coefficient is estimated from finite data;
- **process variability:** arrivals, weather, or demand genuinely vary;
- **structural uncertainty:** the equations omit a mechanism or use the wrong causal form.

Robust optimization handles declared parameter sets well. It cannot repair a missing mechanism. If the bus model ignores passengers abandoning long queues, widening a demand interval does not correct the structure.

An interval $a_i\in[\bar a_i-\rho_i,\bar a_i+\rho_i]$ creates a box uncertainty set. An ellipsoid $a=\bar a+Pu$, $\|u\|_2\le\rho$, captures correlated directions. A finite scenario set is appropriate when the uncertainty is naturally described by named futures. The set must be large enough to include plausible errors but not so large that it represents physically impossible combinations.

### Aleatory and epistemic uncertainty

Aleatory uncertainty describes variation inherent in repeated operation, such as which emergency calls arrive tomorrow. Epistemic uncertainty describes limited knowledge, such as an imprecisely estimated service rate. More data may reduce epistemic uncertainty; it does not eliminate future random arrivals. The distinction is imperfect but useful because it tells us what evidence can improve the model.

Probability distributions are natural for repeatable variability when enough data exist. Confidence regions, parameter sets, or posteriors can represent estimation uncertainty. Competing equations—linear versus saturating response, immediate versus delayed feedback—represent structural uncertainty and should often be tested as separate models rather than hidden inside a wider coefficient interval.

### Measurement and censoring

Suppose demand is recorded through sales. During stockouts, sales fall below true demand. A symmetric interval around recorded sales is not an honest measurement model; its center is biased. Collect lost-sale or queue information, or fit a censoring model. Robust optimization around biased data protects the wrong center.

Data-arrival time also matters. A seven-day weather forecast has wider uncertainty than an hour-ahead update. If decisions can be revised daily, use rolling or multistage planning instead of protecting one fixed hourly schedule against every weekly possibility. Write a timeline showing what is known when each decision is made.

### Constructing intervals

An interval for parameter $θ$ might come from instrument tolerance, historical quantiles, expert limits, or a confidence interval. These sources have different meanings. A confidence interval for a fixed mean is not a prediction interval for future observations. A historical minimum–maximum grows with sample size and may miss unseen extremes.

Use asymmetric bounds when consequences or distributions are asymmetric:

$$\theta\in[\bar\theta-\rho^-,\bar\theta+\rho^+].$$

Travel time has a physical lower bound but can have a long upper tail. Demand may surge farther than it can fall. Document whether intervals are marginal for individual parameters or intended to hold simultaneously.

### Boxes and impossible corners

A box

$$
\mathcal U_{\mathrm{box}}=
\{a:|a_i-\bar a_i|\le\rho_i\}
$$

allows all coefficients to reach either extreme independently. It is transparent and tractable but includes every corner. Crop yields for all crops may not simultaneously attain their separate historical minima; demands for substitute products may not all hit maxima together.

Use a box when simultaneous extremes are defensible or when safety requires protection regardless. Otherwise use budgeted sets, factor models, ellipsoids, or coherent scenarios. Two-dimensional projections help readers see which combinations each geometry includes.

### Ellipsoids and factors

An ellipsoid

$$
\mathcal U_{\mathrm{ell}}=
\{\bar a+Pu:\|u\|_2\le\rho\}
$$

represents joint directions through $P$. If $PP^T$ relates to covariance, historically variable directions extend farther. A factor model can encode common weather, demand, or macroeconomic shocks with far fewer independent dimensions.

Estimated covariance can be unstable when data are scarce relative to dimension. Shrinkage, domain restrictions, or low-rank factors may be needed. A precise ellipse built from ten observations and fifty coefficients is not credible merely because the conic solver accepts it.

### Scenario sets as coherent stories

Named scenarios preserve relationships. A heat wave can raise demand, reduce equipment efficiency, and alter renewable generation together. A recession can lower aggregate demand while changing price sensitivity. Severe weather can slow roads and increase emergency calls. Independent parameter draws often destroy these relationships.

Scenario reduction should retain decision-critical extremes. Two scenarios close in statistical distance can lead to different active constraints. Always preserve mandatory stresses even when their empirical probability is small. Include scenario probabilities only when evidence supports them; otherwise report scenario-wise outcomes without pretending to know likelihood.

### Structural alternatives

In the lamprey example, uncertainty about logistic slope $k$ is parametric. Uncertainty about whether sex ratio responds logistically, piecewise linearly, or with a delay is structural. Fit and challenge multiple candidate mechanisms, then test policies across all credible ones. A policy that succeeds only under one weakly supported response is fragile.

Every structural candidate should have a rejection test. Without one, adding models becomes unlimited storytelling. Held-out trajectories, intervention responses, residual patterns, and biological constraints can eliminate alternatives. Robustness across credible structures is stronger evidence than robustness across arbitrary equations.

### Calibration and coverage

Calibrate sets using evidence separate from final performance evaluation where possible. If a claimed 90% prediction interval covers only 60% of held-out outcomes, decisions based on it inherit that failure. Check joint coverage, tail behavior, seasonality, and temporal drift rather than only marginal histograms.

Larger sets are not automatically better. Protection against impossible combinations wastes resources and may move risk elsewhere. Plot nominal performance, out-of-sample violations, and decision changes as set size grows. Choose protection through evidence and consequence rather than calling the largest set “most robust.”

## 6. Deriving Robust Counterparts

Consider uncertain resource usage

$$a^Tx\le b\quad\forall a\in\mathcal U.$$

For a box $a_i\in[\bar a_i-\rho_i,\bar a_i+\rho_i]$ and $x\ge0$, the worst case independently raises every coefficient:

$$\sum_i(\bar a_i+\rho_i)x_i\le b.$$

For signed $x$, introduce $t_i\ge|x_i|$ through $-t_i\le x_i\le t_i$, giving

$$\bar a^Tx+\sum_i\rho_i t_i\le b.$$

The robust counterpart remains linear.

For ellipsoidal uncertainty $a=\bar a+Pu$, $\|u\|_2\le\rho$,

$$\max_{\|u\|\le\rho}(\bar a+Pu)^Tx
=\bar a^Tx+\rho\|P^Tx\|_2.$$

So the robust constraint is

$$\bar a^Tx+\rho\|P^Tx\|_2\le b,$$

an SOCP. The price of protection is visible: larger $\rho$ shrinks the feasible set.

Budgeted uncertainty avoids assuming every coefficient reaches its worst value simultaneously. With normalized deviations $z_i\in[0,1]$ and $\sum_i z_i\le\Gamma$, the parameter $\Gamma$ controls how many coefficients may be adverse together. Plot objective value and constraint violations across $\Gamma$ rather than hiding the protection choice.

### Box uncertainty with signed decisions

Write $a_i=\bar a_i+\rho_i u_i$, $|u_i|\le1$. Then

$$
\max_{|u_i|\le1}\sum_i(\bar a_i+\rho_i u_i)x_i
=\bar a^Tx+\sum_i\rho_i|x_i|.
$$

The adversary chooses $u_i$ with the sign of $x_i$. Introduce $t_i\ge x_i$ and $t_i\ge-x_i$ to obtain the linear robust row

$$
\bar a^Tx+\sum_i\rho_it_i\le b.
$$

If $x_i\ge0$ is already known, replace $|x_i|$ by $x_i$ directly. Sign information simplifies the model and avoids unnecessary variables.

### Uncertain capacities

For $a^Tx\le b$ and $b\in[\bar b-\rho_b,\bar b+\rho_b]$, the worst capacity is the smallest:

$$a^Tx\le\bar b-\rho_b.$$

If usage coefficients and capacity share one physical driver, choosing their extremes independently may be impossible. Move uncertain terms to one side and construct a joint uncertainty set. “Worst” always means the value maximizing violation after the algebraic signs are fixed.

### Ellipsoids through support functions

For $a=\bar a+Pu$ and $‖u‖_2\leρ$, the uncertain part is

$$
\max_u u^TP^Tx.
$$

Cauchy–Schwarz gives $ρ‖P^Tx‖_2$, attained at

$$u^*=\rho\frac{P^Tx}{\|P^Tx\|_2}$$

when $P^Tx\ne0$. The conic counterpart is exact. If $P^Tx=0$, uncertainty in these directions has no effect on the row.

Dual norms generalize the result. If $‖u‖_p\leρ$, then

$$
\max u^Tv=\rho\|v\|_q,
\qquad\frac1p+\frac1q=1.
$$

An $ℓ\infty$ uncertainty ball creates an $ℓ1$ protection term; an $ℓ1$ ball creates an $ℓ\infty$ term. Uncertainty geometry determines regularization geometry.

### Budgeted uncertainty derivation

Let nonnegative activity $x_j$ have nominal resource coefficient $\bar a_j$ and maximum adverse deviation $\hat a_j$. Protect against $z_j\in[0,1]$ with $∑_jz_j\leΓ$:

$$
\bar a^Tx+
\max_z\left\lbrace\sum_j\hat a_jx_jz_j:
0\le z_j\le1,\sum_jz_j\le\Gamma\right\rbrace
\le b.
$$

The inner problem is an LP. Dualizing it gives variables $π\ge0$ and $q_j\ge0$:

$$
\bar a^Tx+\Gamma\pi+\sum_jq_j\le b,
$$

$$
\pi+q_j\ge\hat a_jx_j\qquad\forall j.
$$

This counterpart remains linear. Integer $Γ$ roughly protects against that many full deviations; fractional $Γ$ permits one additional partial deviation. A probability guarantee for $Γ$ requires assumptions and should not be improvised.

### A small protection example

A workshop chooses quantities $x_1,x_2,x_3\ge0$. Nominal machine times are $(2,3,4)$ hours, each may rise by $(0.5,1.0,1.5)$, and capacity is 120 hours. Nominal feasibility is

$$2x_1+3x_2+4x_3\le120.$$

Full box protection is

$$2.5x_1+4x_2+5.5x_3\le120.$$

With budget $Γ=1$, only the largest adverse contribution among $0.5x_1$, $x_2$, and $1.5x_3$ is added. The model does not choose in advance which coefficient worsens; the robust counterpart protects against whichever is most damaging for the chosen production plan.

If the plan concentrates on product 3, its deviation dominates. Diversifying production may reduce the largest exposure even when nominal profit is slightly lower. This is how robustness can alter decisions rather than merely subtracting a fixed safety margin.

### Robust equalities and recourse

Requiring

$$a(u)^Tx=b(u)\quad\forall u\in\mathcal U$$

with one fixed $x$ is often impossible. Balance equalities usually need adjustable recourse. Under uncertain demand, production, inventory, or shortage can adapt after demand becomes known. Do not robustify equality rows mechanically.

A two-stage robust model chooses $x$ now and $y(u)$ later:

$$A(u)x+B(u)y(u)\le b(u)
\quad\forall u\in\mathcal U.$$

Arbitrary response functions are difficult. Affine rules $y(u)=y_0+Yu$ provide tractable approximations in many cases. They are more flexible than static decisions but can be conservative relative to fully adaptive policies. List which decisions actually can change after information arrives.

### Objective and constraint robustness

Worst-case objective

$$\min_x\max_{u\in\mathcal U}f(x,u)$$

protects performance. Robust constraints protect feasibility. A model may reasonably minimize expected operating cost while enforcing safety for every member of an uncertainty set. Label each treatment rather than calling the entire model robust because one coefficient was inflated.

Measure the price of robustness. Compare nominal objective, out-of-sample objective, violation frequency, violation magnitude, and decision changes over set size or $Γ$. If cost rises 4% and nearly all meaningful violations disappear, the protection is interpretable. If cost rises 40% while tested violations barely improve, revisit the set or failure metric.

## 7. Robust Is Not the Same as Stochastic

Stochastic optimization requires probability distributions and optimizes expectations, chance constraints, or risk measures. Robust optimization requires an uncertainty set and protects against every member. Distributionally robust optimization protects against every distribution in an ambiguity set.

A chance constraint

$$\Pr(a(\xi)^Tx\le b)\ge1-\epsilon$$

permits violation with probability at most $\epsilon$. It can be less conservative than worst-case robustness, but only if the probabilistic model is credible. Scenario testing after optimization is not the same as embedding the probability statement in the optimization.

Use robustness when feasibility failure is costly and only ranges are defensible. Use stochastic models when repeated outcomes and probability estimates are meaningful. Use both when appropriate: optimize expected service while robustly protecting a safety constraint.

### The information structure comes first

Before choosing a method, draw a timeline. Mark when uncertainty is revealed and which decisions remain adjustable. A two-stage problem has here-and-now decision $x$, uncertain outcome $ξ$, and recourse decision $y(ξ)$:

$$
\min_x c^Tx+\mathbb E_\xi[Q(x,\xi)],
$$

where

$$
Q(x,\xi)=
\min_y\{q(\xi)^Ty:W(\xi)y\ge h(\xi)-T(\xi)x\}.
$$

For a relief system, $x$ may position supplies before a storm while $y$ routes them after damage is observed. A static model that fixes routes before knowing road closures is unnecessarily rigid. A model that chooses warehouse locations after seeing the storm uses future information and is unrealistically optimistic.

The expected value of perfect information compares the stochastic optimum with a clairvoyant planner allowed to choose $x$ after observing every scenario. It quantifies the maximum value of resolving uncertainty early. The value of the stochastic solution compares the stochastic policy with a plan optimized only for mean inputs. These measures show whether representing uncertainty changes the decision enough to justify its complexity.

### Expected value is not typical performance

Minimizing $\mathbb E[C(x,ξ)]$ treats equal expected cost as equal even when distributions differ. Plan A may cost 10 almost always. Plan B may cost 0 with probability 0.99 and 1,000 with probability 0.01. Both have expected cost 10, but their operational risk differs.

Report distributional summaries: median, quantiles, tail mean, violation probability, and worst observed scenario. Do not describe the mean scenario as “most likely”; for continuous multivariate uncertainty, the vector of means may never occur and can combine values that are not jointly typical.

Jensen's inequality also matters. For convex cost $f$,

$$f(\mathbb E[\xi])\le\mathbb E[f(\xi)].$$

Evaluating a nonlinear cost at mean demand can systematically understate expected cost. Optimizing with mean inputs is not generally equivalent to stochastic optimization.

### Chance constraints and a Gaussian counterpart

Suppose uncertain coefficient $a$ is Gaussian with mean $μ$ and covariance $Σ$. For fixed $x$, $a^Tx$ is Gaussian with mean $μ^Tx$ and standard deviation $√x^TΣx$. The chance constraint

$$\Pr(a^Tx\le b)\ge1-\epsilon$$

is equivalent to

$$
\mu^Tx+\Phi^{-1}(1-\epsilon)
\sqrt{x^T\Sigma x}\le b,
$$

assuming the Gaussian model and $ε<0.5$. Factor $Σ=L^TL$ to write the norm $‖Lx‖_2$, giving an SOCP.

The equation is exact under its assumptions, not a universal formula. Heavy tails, estimation error, and dependence misspecification can make nominal 99% reliability much lower. Backtest empirical coverage on held-out periods and stress distributional assumptions.

Joint chance constraints require all rows simultaneously:

$$\Pr(A(\xi)x\le b)\ge1-\epsilon.$$

Enforcing each row at $1-ε$ does not give joint reliability $1-ε$. A union bound can allocate risk $ε_i$ with $∑_iε_i\leε$, but it may be conservative. Dependence-aware methods or scenario approaches can be better when data support them.

### CVaR as a tail objective

For loss $L(x,ξ)$ and confidence $β$, value-at-risk is a quantile. Conditional value-at-risk averages loss beyond that tail threshold. A useful representation is

$$
\operatorname{CVaR}_\beta(L)=
\min_\eta
\left[
\eta+\frac{1}{1-\beta}
\mathbb E(L-\eta)_+
\right].
$$

With equally weighted scenarios $s=1,…,S$, introduce $ξ_s\ge L_s(x)-η$ and $ξ_s\ge0$:

$$
\min_{x,\eta,\xi}
\eta+\frac{1}{(1-\beta)S}\sum_s\xi_s.
$$

If scenario losses are linear and $X$ is linear, this extension is an LP. CVaR is coherent and convex, but it depends on scenario quality. Optimizing the worst 5% of an unrepresentative sample does not protect against omitted mechanisms.

A mean-CVaR objective

$$\min_x\ \mathbb E[L(x,\xi)]+lambda\operatorname{CVaR}_{0.95}(L)$$

trades ordinary performance against tail severity. Sweep $λ$ and report how the decision and both metrics change. Do not interpret $λ$ as a probability; it is a preference parameter.

### Scenario approximation and sampling error

Sample-average approximation replaces an expectation by

$$
\frac1S\sum_{s=1}^S f(x,\xi_s).
$$

The optimizer can overfit a finite scenario sample, especially with many decisions. Use independent scenario batches: one or more for optimization, another for unbiased evaluation. Repeat the process to estimate variability of the selected decision and objective.

Common random numbers make policy comparisons more precise: evaluate every candidate on the same scenarios and analyze paired differences. If one policy faces easier random draws, a lower sample mean is not a fair comparison.

The scenario approach for chance-constrained convex programs provides probabilistic feasibility guarantees based on sample size, decision dimension, and confidence under specific assumptions. Cite the theorem and conditions if claiming such a guarantee; simply testing 1,000 samples does not prove “99.9% safe.”

### Distributionally robust optimization

Sometimes samples exist but the exact distribution does not. Distributionally robust optimization selects an ambiguity set $\mathcal P$ of plausible distributions and solves

$$
\min_x\sup_{P\in\mathcal P}
\mathbb E_P[f(x,\xi)].
$$

Moment sets fix or bound means and covariances. Wasserstein balls contain distributions near the empirical distribution under a transport distance. Divergence balls use relative entropy or related measures. Each ambiguity geometry implies different protection and tractability.

Radius calibration is central. A zero-radius Wasserstein ball recovers the empirical distribution; a very large ball becomes extremely conservative. Cross-validation, concentration bounds, or domain stress requirements can guide radius selection. Plot out-of-sample performance and policy change over radius.

Distributional robustness is not permission to claim safety against all distributions. The guarantee covers only the ambiguity set and depends on support assumptions. If the data omit a class of disasters, a small distance around the empirical distribution may omit them too. Add explicit stress scenarios or structural models.

### Robust versus stochastic on a newsvendor

A vendor orders $q$ units before uncertain demand $D$. Unit purchase cost is $c$, sale price $p>c$, and salvage value $v<c$. Profit is

$$
\pi(q,D)=p\min(q,D)+v(q-D)_+-cq.
$$

With a known continuous demand distribution, expected-profit maximization gives the critical fractile

$$
F_D(q^*)=\frac{p-c}{p-v}.
$$

This stochastic solution balances overage and underage probabilities.

If only demand bounds $D\in[L,U]$ are trusted, a robust objective maximizing worst-case profit may choose a conservative order tied to $L$. A minimax-regret formulation compares each order with the scenario-wise perfect order and often yields an interior compromise. A distributionally robust formulation uses samples while protecting against distribution estimation error. Same story, different information assumptions, different answer.

### Reliability diagrams and stress matrices

For every candidate policy, create a matrix with rows as scenarios and columns as metrics: cost, unmet demand, maximum wait, safety violations, ecological deviation. Add columns indicating whether each hard rule is satisfied. Sort scenarios by severity or mechanism rather than presenting one aggregate score.

A reliability curve plots protection parameter against empirical violation probability. A performance curve plots the same parameter against cost or primary benefit. Their joint view exposes diminishing protection. Confidence intervals are needed because an observed zero violation in a small test set does not imply zero risk.

If zero failures occur in $n$ independent tests, the rough “rule of three” gives an upper 95% bound near $3/n$ on failure probability. With 100 tests and zero failures, risk may still be around 3%; writing “100% reliable” would be unjustified. Dependence between tests makes even this approximation optimistic.

### A selection guide

Use deterministic sensitivity analysis when uncertainty is exploratory and the primary question is how the recommendation changes. Use robust constraints when failure is costly and defensible bounds exist. Use stochastic programming when probabilities are meaningful and recourse matters. Use chance constraints when a reliability target is explicit. Use CVaR when tail severity matters. Use distributional robustness when samples exist but their distribution is uncertain. Use scenarios for coherent structural futures.

These methods can be combined, but every combination should follow the decision timeline and evidence. Mathematical sophistication does not compensate for an uncertainty model disconnected from how information actually arrives.

## 8. Outstanding-Paper Case: 2024 MCM Lamprey Ecology

The 2024 MCM Problem A concerns a population whose larval sex ratio can respond to food availability. Outstanding papers in COMAP's results archive analyze stage dynamics and ecological effects. Recast the decision as an intervention intensity $u_t$ over time. A simplified state model is

$$x_{t+1}=F(x_t,u_t,\theta),$$

where $x_t$ contains lamprey stages and ecosystem indicators, and $\theta$ contains survival, fecundity, food response, and interaction coefficients.

A policy may minimize three outcomes:

$$
J_1=\sum_t N_t^{\text{lamprey}},\qquad
J_2=\sum_t u_t^2,\qquad
J_3=\sum_t\|e_t-e^{\text{target}}\|_2^2.
$$

$J_1$ rewards control, $J_2$ limits intervention burden, and $J_3$ protects ecosystem balance. Instead of selecting weights immediately, generate a frontier between control and ecological deviation while imposing an intervention budget as a hard constraint.

Food-response uncertainty matters. Let the female-share response be

$$s(R;k,R_0)=s_{\min}+\frac{s_{\max}-s_{\min}}{1+e^{-k(R-R_0)}}.$$

The slope $k$ and midpoint $R_0$ may be poorly known. Define plausible ranges or a jointly plausible ellipse, then require population safety thresholds for all selected parameter scenarios. A nominal policy may exploit a precise response threshold that disappears when $R_0$ shifts. A robust policy intervenes earlier or more gradually.

Validation should compare four objects: the no-action baseline, the nominal optimum, a robust compromise, and a deliberately adverse parameter scenario. Report population reduction, ecosystem deviation, intervention effort, and the number of tested scenarios violating thresholds. The model is useful when it clarifies which protection costs little and which requires a genuine policy choice.

### Reconstruct the biological decision before optimizing

The contest prompt is not asking for a generic “best sex ratio.” It asks what happens when a species can alter sex ratio in response to resource availability and what that flexibility means for the wider ecosystem. A useful model must connect resource state, sex allocation, reproduction, stage survival, ecological interaction, and any management intervention.

Begin with a causal diagram:

$$
\text{food}\longrightarrow\text{sex ratio}
\longrightarrow\text{effective reproduction}
\longrightarrow\text{stage population}
\longrightarrow\text{hosts and ecosystem},
$$

with feedback from population density to food. Intervention can affect survival, access to spawning habitat, or sex-specific success. The diagram prevents an optimizer from changing a biological parameter that managers cannot control.

Let $L_t$, $J_t$, and $A_t$ denote larval, juvenile/parasitic, and adult/spawning abundance. A simple discrete stage model is

$$
\begin{aligned}
L_{t+1}&=B(A_t,R_t,s_t)-\mu_L(R_t)L_t,\\
J_{t+1}&=\sigma_L(R_t)(1-u_t^L)L_t-mu_JJ_t,\\
A_{t+1}&=\sigma_J(1-u_t^J)J_t-mu_AA_t.
\end{aligned}
$$

This notation is schematic: births enter larvae, survivors advance between stages, and interventions can act differently by stage. To keep abundance nonnegative, use survival fractions in $[0,1]$ or derive transitions consistently from rates. A discrete model with subtraction terms larger than the current population can produce negative states; check parameter domains.

The birth function must represent mating limitation. If $s_t$ is female share among reproductive adults, simply multiplying births by $s_tA_t$ assumes one male can fertilize unlimited females. A symmetric mating function such as

$$
B_t=bR_tA_t,4s_t(1-s_t)
$$

peaks at a balanced ratio and falls toward zero when either sex disappears. A harem-like structure could make male limitation weaker. The appropriate form is biological, not a convenient polynomial choice. Test alternatives.

Resource state can follow

$$
R_{t+1}=R_t+r_RR_t\left(1-\frac{R_t}{K_R}\right)
-c_LL_t-c_AA_t+I_t,
$$

where $I_t$ is external renewal. The sex response $s(R_t;k,R_0)$ then closes a feedback loop. Low resources change sex allocation; changed allocation alters reproduction; population abundance changes future resources. An equilibrium calculation should precede policy optimization.

### Equilibria and threshold interpretation

At an equilibrium, states satisfy $x^*=F(x^*,0,θ)$. Solve numerically and verify residual

$$\|F(x^*,0,\theta)-x^*\|_\infty$$

is small. Linearize with Jacobian

$$J=\frac{\partial F}{\partial x}(x^*,0,\theta).$$

For a discrete-time system, local stability requires every eigenvalue of $J$ to have magnitude below one. Reporting continuous-time “negative real parts” for a discrete map is a category error.

The resource-dependent response can stabilize or destabilize the population depending on feedback sign and delay. A sharp logistic slope $k$ makes sex ratio switch rapidly near $R_0$. Combined with delayed maturation, that switch can create oscillations. A smooth nominal trajectory alone does not establish stability; perturb states and parameters and inspect return or divergence.

A low-density invasion threshold can be approximated by a next-generation multiplier. Near a lamprey-free equilibrium, linearize reproduction and stage survival. If the dominant multiplier exceeds one, small introductions grow; below one, they decline. Management can target the multiplier rather than only reducing current abundance.

### What is the intervention?

Control $u_t$ must correspond to a real action. If $u_t^L$ is larval removal fraction, impose $0\le u_t^L\le\bar u_L$ and cost increasing with treated habitat. If $u_t^J$ represents barriers or trapping, include selectivity, capacity, and ecological side effects. If an action affects other species, represent that outcome rather than hiding it inside a generic squared effort.

Control timing matters. Removing adults immediately before spawning may have different benefit from the same effort after spawning. Use a within-period event order and state it explicitly. A diagram such as “observe → intervene → reproduce → survive → transition” prevents index ambiguity.

Budget can be annual

$$\sum_ka_ku_t^k\le B_t,$$

or cumulative

$$\sum_t\sum_ka_ku_t^k\le B.$$

The first prevents impossible yearly concentration; the second allows intertemporal allocation. Real programs may have both. Smoothness constraints $|u_t-u_{t-1}|\leΔ$ can represent staffing or ecological transition limits.

### Define three objectives without double counting

Population-control objective may be discounted abundance

$$J_N=\sum_{t=0}^T\delta^t(w_LL_t+w_JJ_t+w_AA_t),$$

where stage weights reflect damage or management relevance. Terminal abundance can be added to avoid end-horizon neglect.

Intervention burden can be

$$J_U=\sum_t\delta^t(c^Tu_t+u_t^TQu_t),$$

combining direct linear expense and increasing marginal disruption. If dollar cost is available, do not disguise it as a unitless square. If $u_t^2$ represents social or ecological burden, explain the interpretation.

Ecosystem deviation might use selected host or community indicators $e_t$:

$$J_E=\sum_t\delta^t(e_t-e^{\mathrm{ref}})^TW(e_t-e^{\mathrm{ref}}).$$

Weights should reflect scale or ecological value. If lamprey abundance already drives the ecosystem states, adding both $J_N$ and every downstream effect may double count one harm. A consequence diagram helps separate endpoints from intermediate mechanisms.

Hard ecological safeguards can include

$$e_{jt}\ge\underline e_j,qquad
|e_{j,t+1}-e_{jt}|\le r_j^{\max}.$$

Thresholds grounded in viability or regulation belong as constraints. Softer restoration aspirations belong on the frontier.

### Generate and read the frontier

First optimize each objective separately to form a payoff table. The minimum-intervention solution is likely no action and defines ecological or population consequences. The strongest-control solution may violate ecosystem or effort expectations unless constrained. A minimum-ecosystem-deviation solution may tolerate more lamprey if aggressive removal harms other species.

Choose population burden as the primary objective and sweep an intervention budget $ε_U$ plus ecological cap $ε_E$:

$$
\min J_N
\quad\text{s.t.}\quad
J_U\le\epsilon_U,\quad J_E\le\epsilon_E,\quad
x_{t+1}=F(x_t,u_t,\theta).
$$

The dynamic equations may make this nonlinear and nonconvex. Multiple starts, direct transcription, or dynamic programming can find candidates but may not prove global optimality. Report bounds or local-solution limitations honestly.

Plot not just objective triples but representative time paths. Two policies with similar cumulative abundance can differ: one intervenes strongly early and relaxes; another maintains moderate effort. Early action may prevent reproduction but impose immediate ecological disturbance. Decision makers need the schedule, not only its integrated score.

### Robustify the mechanism, not every symbol blindly

Candidate uncertain parameters include stage survival, fecundity, sex-response slope and midpoint, resource carrying capacity, and intervention efficacy. Varying all independently over broad ranges may generate biologically impossible combinations. Build a parameter set from fitted covariance, biological relationships, or named scenarios.

For example:

- **slow response:** smaller $k$ and uncertain $R_0$;
- **high persistence:** high juvenile survival and lower natural adult loss;
- **resource pulse:** temporary increase in $R_t$ or $K_R$;
- **weak intervention:** efficacy at its lower credible range;
- **delayed response:** sex ratio responds to $R_{t-1}$ rather than $R_t$.

The last is structural and cannot be represented merely by widening $k$. Test the same policies under all credible structures.

A robust safety requirement might demand

$$A_t(\theta,u)\le\bar A
\quad\forall t\ge t_0, \forall\theta\in\Theta,$$

while expected or nominal objectives govern ordinary performance. If exact robust dynamic optimization is intractable, use scenario constraints and describe the result as scenario-robust, not universally robust.

Recourse is realistic. Managers observe monitoring data each year and can adjust effort. An open-loop sequence $u_0,…,u_T$ ignores this ability. A feedback policy

$$u_t=\Pi_\phi(\hat L_t,\hat J_t,\hat A_t,\hat R_t)$$

can use thresholds or parameterized rules. Optimize policy parameters $φ$ under scenarios, then evaluate on independent scenarios. Measurement error and delayed observation must be included.

### Identifiability before optimization

If only adult counts are observed, several combinations of larval survival, juvenile survival, and fecundity can produce similar adult trajectories. A policy optimized for one parameter fit may fail under another equally plausible fit. Use profile likelihood, posterior samples, or an ensemble of calibrated parameter sets.

Intervention data are especially informative. Natural time series may not separate reproduction from survival, while a documented intervention changes one mechanism and reveals response. Reserve some intervention episodes for validation. A tiny training residual does not prove that parameters are identifiable.

Observation error is distinct from process variation. A state-space model separates latent ecological state from noisy counts:

$$x_{t+1}=F(x_t,u_t,\theta)+w_t,
$$

$$y_t=H(x_t)+v_t.
$$

Ignoring detection error can make population variability appear biologically real. Control policies based on estimates should be tested with the same observation process they will face.

### Reproducing the competition evidence chain

A defensible paper should make the case traceable:

1. cite the official problem and the specific Outstanding paper used for comparison;
2. define every state, parameter, unit, and event order;
3. show equilibrium and no-action behavior;
4. calibrate with stated data and uncertainty;
5. generate a frontier using a reproducible method;
6. select representative policies by explicit criteria;
7. test them under shared nominal and adverse scenarios;
8. report solver limitations and model discrepancy;
9. translate results into biological and management language.

An award-paper figure can inspire organization, but its data and conclusion belong to that paper. Recreate figures from the current model, attribute design inspiration, and explain any difference in assumptions. A competition example should teach evidence, not encourage copying.

### A policy table a manager can read

For no action, nominal minimum-cost control, knee policy, and robust policy, report:

$$
\begin{array}{lrrrrr}
\text{policy}&J_N&J_U&J_E&\text{worst threshold excess}&\text{violating scenarios}\\\hline
\text{no action}&\cdot&\cdot&\cdot&\cdot&\cdot\\
\text{nominal}&\cdot&\cdot&\cdot&\cdot&\cdot\\
\text{knee}&\cdot&\cdot&\cdot&\cdot&\cdot\\
\text{robust}&\cdot&\cdot&\cdot&\cdot&\cdot
\end{array}
$$

Do not fill the table with invented precision. Use calibrated outputs, uncertainty intervals, and units. Beneath it, state the decision threshold: for example, the robust policy is preferred if annual intervention capacity exceeds a given value and keeping adult abundance below $\bar A$ is mandatory across the declared scenario set.

### What this case teaches beyond ecology

The lamprey problem illustrates a general pattern. Biological adaptation creates feedback. Feedback creates nonlinear dynamics. Nonlinear dynamics turn parameter uncertainty into timing and stability uncertainty. Several stakeholders value different endpoints. Management observes the system over time and can adapt. A single nominal weighted optimum compresses all of that structure into one brittle answer.

The remedy is not maximum complexity. It is a layered argument: transparent baseline, explicit mechanisms, identifiable parameters, visible objective trade-offs, declared protection, feedback policy where justified, and independent stress tests. The same architecture applies to epidemics, fisheries, invasive plants, reservoir ecosystems, and public-health intervention.

## 9. Frontier Stability and Decision Validation

A beautiful frontier can be numerically or statistically fragile. Recompute it under data resampling, alternative normalizations, and plausible uncertainty sets. Match points by decision or objective neighborhood and display bands rather than one precise curve.

Check dominance with tolerances; solver noise can make nearly identical points appear to dominate each other. Remove infeasible points before ranking. For discrete models, a frontier can contain gaps and jumps; do not connect points with a smooth line that suggests unattainable intermediate compromises.

Perform an out-of-sample stress test. The uncertainty set used during optimization is part of the model; the stress scenarios used for evaluation should also include surprises outside that set. Robustness is not immunity. State where protection was guaranteed, where performance was only simulated, and which structural failures remain untested.

### Bootstrap the entire decision process

If objectives depend on estimated demand, travel time, ecological coefficients, or prices, one fitted frontier is conditional on one sample. Resample data, refit parameters, rebuild the optimization problem, and recompute the frontier. Resampling only final objective values while keeping fitted parameters fixed misses estimation uncertainty.

For time series or spatial data, ordinary independent bootstrap breaks dependence. Use block, stationary, spatial, or parametric bootstrap appropriate to the data-generating process. State block length or model assumptions. The purpose is not to add a shaded band mechanically; it is to learn whether trade-offs and selected decisions survive plausible resampling.

Frontiers from different replicates do not contain the same points. Match by a policy feature, epsilon target, weight vector, or nearest normalized objective vector. Each matching rule answers a different question. Matching by weight asks how the optimizer changes under the same stated preference. Matching by objective location asks whether similar performance remains attainable.

Show uncertainty in decision space. For facilities, report opening frequency by site. For crop plans, report area distributions and crop-selection probability. For intervention schedules, show quantile bands through time. A narrow objective band can coexist with many interchangeable decisions; that flexibility may be an advantage or implementation concern.

### Hypervolume with an honest reference point

Hypervolume measures objective space dominated by an approximate frontier up to reference point $r$. In minimization, $r$ must be worse than every compared point. Better coverage and convergence generally increase dominated hypervolume.

The numerical value depends heavily on scaling and $r$. Choose a common reference based on stakeholder limits or a documented worst baseline, not separately for each algorithm. Normalize using the same fixed ranges. Report the reference point so the metric can be reproduced.

Hypervolume rewards coverage but does not validate objectives or feasibility. An algorithm that includes infeasible low-valued points can look excellent unless those points are removed. Recompute all objectives and violations independently before calculating it.

### Attainment surfaces and repeated stochastic runs

Evolutionary algorithms return different fronts across seeds. An empirical attainment function estimates the probability that a run attains or dominates each objective-space location. Median and 90% attainment surfaces show consistency better than selecting the prettiest run.

Use equal objective-evaluation budgets, not merely equal generations when population sizes differ. Report runtime and hardware when evaluation cost is not dominant. Tune algorithms on separate instances or budgets; tuning one method extensively and using defaults for another is not a fair comparison.

For a final result, maintain an archive of nondominated points across verified runs, but do not pretend the union was obtained in one run. Identify provenance and seed for every retained decision. Then independently reevaluate the archive under the same objective code.

### Preference robustness

Parameter robustness asks whether inputs change the decision. Preference robustness asks whether reasonable value judgments change it. Define a plausible weight set, epsilon range, or aspiration region based on stakeholder interviews. For each preference realization, solve and record the chosen decision.

A plan has high preference stability if selected over a large defensible region. But volume in weight space is not automatically probability. If stakeholder beliefs concentrate near one boundary, uniform sampling misleads. Show geometric regions and, only when justified, a belief-weighted selection frequency.

Necessary preference analysis can eliminate plans without exact weights. If stakeholders agree that one unit of objective 1 is worth between two and four units of objective 2, derive inequalities on weights and check which plans can ever be optimal. This converts qualitative judgment into a transparent feasible preference set.

### Decision stability metrics

For continuous decisions, use normalized distance

$$
d(x,y)=\frac{\|S(x-y)\|_1}{1+\|Sx\|_1},
$$

where $S$ rescales units. For binary selections, Hamming or Jaccard distance may be appropriate. For routes, edge overlap and edit distance reveal structural change. For time schedules, compare both level and switching time.

Objective stability and decision stability should be reported together. If many distant decisions share nearly equal performance, present several and let operational considerations choose. If tiny input changes cause large decision jumps with little objective consequence, add switching cost or seek a stable near-optimal plan.

Near-optimal sets formalize this flexibility:

$$
\mathcal X_\delta=
\{x\in X:f(x)\le(1+\delta)f^*\}
$$

for positive minimization objective, with an appropriate additive definition near zero. Optimize secondary properties over $\mathcal X_δ$: simplicity, fairness, similarity to current practice, or resilience. A 1% objective sacrifice may buy a much easier policy.

### Stress beyond the uncertainty set

Robust optimization guarantees only declared conditions. Evaluation should include boundary cases, combinations just outside the set, mechanism failures, and data-pipeline failures. If a policy is protected against demand variation but not road closure, close the most important route in a stress test.

Distinguish four result labels:

1. **guaranteed feasible** over a mathematically declared set;
2. **empirically feasible** in a finite independent test sample;
3. **stress-tested** under named adverse scenarios;
4. **untested** for structural mechanisms outside the model.

These labels prevent simulation from being described as proof and prevent a formal guarantee from being extended beyond its set.

### Backtesting without leakage

At historical decision date $t$, fit every forecast, parameter, uncertainty set, and preference rule using only information available by $t$. Solve, then evaluate on the realized future. Roll forward. Using the full dataset to estimate uncertainty before backtesting leaks future information even if the optimizer itself only sees past demand.

Include operational baselines. For each date, compare current practice, deterministic mean plan, stochastic plan, and robust plan under the same realization. Report paired outcome differences and turnover. A robust plan may reduce failures but change decisions so often that implementation cost erases its advantage.

### Validate the selector, not only the frontier

A paper often generates a frontier and then chooses one point by knee detection, AHP, TOPSIS, or committee judgment. That selection rule is part of the model. Test its stability under normalization, objective noise, alternative ranges, and small preference changes.

If TOPSIS is used, document benefit versus cost criteria, normalization, weights, ideal points, and distance formula. If AHP provides weights, report comparison matrix and consistency. If a knee rule is used, specify geometry and scaling. The final answer can change even when the frontier does not.

### Model-risk register

Create a table of failure modes: biased demand, omitted feedback, uncertain correlation, invalid distribution tail, infeasible recourse, numerical nonconvexity, and stakeholder disagreement. For each, record detection evidence, consequence, mitigation, and residual risk. This table keeps robustness claims proportional to what was tested.

The strongest conclusion is often conditional: “Plan B is feasible across the declared interval and stable under bootstrap and preference tests; performance remains vulnerable to simultaneous bridge loss and demand surge, which were not part of the guarantee.” That is more trustworthy than “Plan B is robust.”

## 10. Writing the Recommendation

A responsible report shows the frontier before choosing a point, explains normalization and weights, identifies hard constraints, and quantifies the cost of protection. A useful final sentence sounds like this:

> Plan B costs 3.2% more than the nominal minimum but keeps all service constraints feasible across the declared demand set and reduces worst-scenario regret by 41%; beyond this point, each additional 1% of cost buys less than 0.2% regret reduction.

That statement tells the reader what was traded, over what uncertainty, and why the selected point is defensible.

### A recommendation has six parts

A complete recommendation should name the decision, comparison, trade-off, protection scope, evidence, and limitation. “Choose Plan B” names only the decision. A fuller structure is:

1. **Decision:** what should be implemented, where, and when?
2. **Comparison:** which baseline and alternatives were evaluated?
3. **Trade-off:** what was sacrificed and gained in original units?
4. **Protection:** against exactly which parameter set, scenarios, or probability model?
5. **Evidence:** what bounds, held-out tests, or stress results support the claim?
6. **Limitation:** what mechanism, data, or uncertainty remains outside scope?

This structure keeps a result from outrunning its model. Use “guarantees” only for a mathematically verified property under stated assumptions. Use “observed in tests” for finite simulations. Use “suggests” for evidence that is indirect or structurally uncertain.

### Put original units back

Normalized objectives help computation but make poor conclusions. Replace “objective 2 improved by 0.17” with “90th-percentile wait fell from 14.2 to 10.8 minutes.” Replace “robustness cost 0.06” with “annual operating cost rose by $310,000.” Readers can judge an exchange only in interpretable units.

Report absolute and relative differences. A 50% reduction may mean two failures to one, statistically unstable in a small sample. A 0.2% cost increase may still mean millions of dollars. Include denominators and time horizons.

### Separate evidence from preference

The model may establish that Plan A is cheaper and Plan B is safer under specified scenarios. Selecting B because safety is prioritized is a policy choice informed by evidence. Write the two steps separately. Do not claim mathematics proved the stakeholder's value judgment.

If stakeholders disagree, present the region in which each plan is preferred. “Plan B is selected whenever one minute of worst-district waiting is valued above $42,000 annually” is more informative than one unexplained weight vector. If no consensus exists, the frontier itself may be the legitimate result.

### Explain the price of protection

The price of robustness can be expressed as

$$
\operatorname{PoR}(\rho)=
\frac{f_{\mathrm{nom}}(x^R(\rho))-f_{\mathrm{nom}}(x^N)}
{|f_{\mathrm{nom}}(x^N)|},
$$

where $x^N$ is nominal optimum and $x^R(ρ)$ robust solution. Pair it with reliability improvement. A price without benefit is not interpretable; a violation reduction without cost hides the trade-off.

Protection curves often have a knee. Increasing $Γ$ from zero to two may eliminate common violations cheaply, while increasing it from eight to nine may protect an implausible corner at large cost. Recommend a protection level based on consequence and calibration, not the word “maximum.”

### Give implementation triggers

A robust plan should specify monitoring. If observed demand leaves the calibrated set, if intervention efficacy falls below its protected range, or if preference constraints change, trigger reoptimization or escalation. A guarantee has an expiration condition.

For a feedback policy, give the observable threshold and action: “If estimated adult abundance exceeds $\bar A$ for two surveys and resource index remains above $R_0$, raise trapping effort one level, subject to ecosystem floor.” The deployed rule must use measurable quantities and account for observation error.

### Show one counterfactual

Reoptimize under a meaningful restriction to explain opportunity cost: no new depot, no intervention in year one, fixed current bus frequency, or no robust protection. Compare full system response, not only subtracting one objective term. Counterfactuals reveal why the recommended action matters.

### End with a boundary

Finish with conditions under which the recommendation should not be used. Perhaps correlations outside the scenario library, delayed ecological response, a policy change, or a demand level beyond capacity invalidates it. Boundaries are not weakness; they prevent a local model from becoming an unlimited claim.

For the easter egg, look back at plans $A,B,C,D$ in Section 2. Add a fifth plan $E=(12,9)$—identical to $B$. The Pareto set has not changed, but a careless program may report two “different” solutions. Decide whether duplicates should be merged by objective values or retained because their underlying decisions differ. That tiny choice becomes important when a frontier contains several operationally distinct ways to achieve the same score.

### Sources

- [COMAP 2024 MCM/ICM results and Outstanding papers](https://www.contest.comap.com/undergraduate/contests/mcm/contests/2024/results/).
- [COMAP previous contests archive](https://contest.comap.com/undergraduate/contests/mcm/previous-contests.php).
- [CUMCM official archive](https://www.mcm.edu.cn/).
- Boyd and Vandenberghe, [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/).

## 11. Integrated Decision Studios

The final studios combine preference uncertainty, parameter uncertainty, and operational validation in complete decisions rather than isolated formulas. Each begins with a baseline, identifies the information timeline, constructs a frontier, adds protection, and ends with evidence a decision maker can inspect.

### Studio A: a resilient campus microgrid

A campus chooses solar capacity $S$, battery energy capacity $B$, and grid connection capacity $G$ for the next fifteen years. Hourly operations choose grid import $g_{th}$, battery charge $c_{th}$, discharge $d_{th}$, state of charge $e_{th}$, renewable curtailment $r_{th}$, and unserved critical demand $ℓ_{th}$ in representative year $t$ and hour $h$.

The planning decision occurs before future demand, solar production, grid price, and outages are known. Operating decisions adapt after each scenario is observed. This is a two-stage capacity-and-dispatch problem. Treating all hourly decisions as here-and-now would buy excessive capacity; allowing capacity to change by scenario would be clairvoyant.

For scenario $ω$, hourly balance is

$$
g_{h\omega}+d_{h\omega}+s_{h\omega}-r_{h\omega}
=D_{h\omega}+c_{h\omega}-\ell_{h\omega},
$$

where $s_{hω}\le S\phi_{h\omega}$ is available solar used. Battery dynamics are

$$
e_{h+1,\omega}=e_{h\omega}
+\eta_cc_{h\omega}\Delta t
-\frac{d_{h\omega}\Delta t}{\eta_d},
$$

with $0\le e_{hω}\le B$ and power limits tied to installed equipment. Grid import satisfies $0\le g_{hω}\le G$ when grid is available and $g_{hω}=0$ during outage hours.

Check signs with four cases. With demand but no supply, $ℓ$ must equal demand. With excess solar, curtailment can absorb surplus. Charging increases next state; discharging reduces it by more than delivered energy because efficiency is below one. Summing the state equation over a cyclic horizon should return the battery to its initial energy.

Three objectives are natural:

$$
J_C=K_SS+K_BB+K_GG+
\mathbb E_\omega\sum_h p_{h\omega}g_{h\omega},
$$

$$
J_E=\mathbb E_\omega\sum_he_{h\omega}^{\mathrm{grid}}g_{h\omega},
$$

and a reliability measure such as expected unserved energy

$$J_R=\mathbb E_\omega\sum_h\ell_{h\omega}\Delta t.$$

Cost and emissions are soft trade-offs. Critical-load service may be a hard rule:

$$
\sum_h\ell_{h\omega}^{\mathrm{critical}}\Delta t=0
\quad\forall\omega\in\Omega_{\mathrm{protected}}.
$$

Do not combine critical and flexible loads in one shortage penalty. A laboratory freezer, dormitory lighting, and optional vehicle charging have different consequences. Use priority classes or value-of-lost-load values justified by operations.

The transparent baseline is grid-only operation sized to observed peak demand. It establishes current cost, emissions, and complete dependence on grid availability. A nominal plan optimizes capacity under average prices and solar. A stochastic plan minimizes expected operating cost over scenarios. A robust plan protects critical load during every declared outage and low-solar scenario.

Generate a cost-emission frontier under the critical-service rule. One epsilon formulation is

$$
\min J_C\quad\text{s.t.}\quad J_E\le\epsilon_E,
$$

plus dispatch and reliability constraints. Sweep $ε_E$ from the cost-optimal emissions to the minimum-emission feasible level. Report installed capacities and renewable curtailment at each point. The frontier alone can hide a design switch from large grid connection to solar-plus-storage.

Solar and battery are not perfect substitutes. Extra solar helps when sunlight overlaps demand or can charge storage. Extra battery shifts energy but cannot create it. During a multi-day low-solar outage, battery duration matters. Plot critical-load survival hours under outage start time and duration; average annual metrics will not reveal this vulnerability.

Uncertainty is structured. Demand and solar have daily patterns and weather correlation. Electricity price may rise during high demand. Outages correlate with severe weather, which may also reduce solar and increase heating load. Independent sampling of each hourly coefficient can generate impossible jagged scenarios and understate compound risk.

Build coherent scenario families:

- ordinary weekday and weekend operation;
- heat-wave demand with price stress;
- winter low-solar sequence;
- short daytime grid outage;
- multi-hour evening outage;
- compound outage plus low initial battery charge.

Use historical sequences or weather-conditioned models for ordinary probability. Retain compound outage stresses even if probability is unknown. The robust guarantee applies to the protected family; independent held-out years test ordinary performance.

Chance-constrained planning might require loss of load probability below $ε$. But reliability events are temporally dependent: one depleted battery creates failures across consecutive hours. Counting each hour as independent exaggerates sample size. Evaluate event frequency, duration, energy not served, and maximum consecutive shortfall.

CVaR of operating cost protects expensive years:

$$
\min J_C+\lambda\operatorname{CVaR}_{0.95}(C_\omega).
$$

CVaR of unserved critical energy may be inappropriate if any protected-scenario shortage is unacceptable. Use a robust hard constraint for safety and CVaR for less critical service or cost. Risk measures should match consequences.

Preference uncertainty enters through cost versus emissions. Ask how much annualized cost the campus will pay per tonne of carbon reduction, but also test policy thresholds such as a carbon budget. If carbon price $p_C$ is used, solve over a range rather than presenting one ceremonial value. Record capacity breakpoints where storage becomes worthwhile.

The price of resilience is

$$
\frac{J_C(x^{\mathrm{robust}})-J_C(x^{\mathrm{nominal}})}
{J_C(x^{\mathrm{nominal}})}.
$$

Pair it with added outage survival and reduction in unserved energy. A 7% cost increase has no meaning until readers know whether it buys one extra hour or three days of critical operation.

Battery degradation and replacement can change the answer. A simple throughput cost may approximate wear, but deep cycles and calendar aging matter. Include replacement in the same discounted horizon as generation assets. Stress-test battery lifetime and efficiency; otherwise a storage-heavy robust plan can look artificially cheap.

The model should also prevent simultaneous charging and discharging if tariffs or negative prices make that loophole profitable. Binary mode variables are one solution; under ordinary positive prices and efficiency losses, simultaneous flows may be dominated, but verify output rather than assuming.

Validation begins with one day and one scenario. Hand-calculate energy balance, state trajectory, cost, and emissions. Then independently reconstruct every scenario's balance and capacity residuals from exported dispatch. Check installed assets are identical across scenarios and recourse varies only after uncertainty is known.

Backtest on held-out weather years. For each, simulate the selected capacity with a dispatch policy using only information available at the time. Compare grid-only, nominal, stochastic, and robust designs on paired years. Report cost, emissions, curtailment, peak import, shortage events, and battery cycles.

A recommendation might read: “Install design R rather than nominal design N if the campus requires full critical-load service through the declared 12-hour compound outage. R increases annualized nominal cost by 6.4%, reduces grid emissions by 18%, and had no critical shortfall in protected scenarios or held-out years; resilience beyond 12 hours and battery failure remain outside the guarantee.” Every number must come from verified output, not this illustrative template.

The limitation is structural. Representative days can break storage chronology across seasons. A battery cannot borrow energy from a sunny representative day to survive a winter outage unless the weighting construction preserves sequence. Use chronological simulation for validation even if clustered days accelerate planning. If seasonal storage matters, the planning model itself needs linked chronology.

### Studio B: equitable emergency inventory

A regional agency prepositions emergency kits at warehouses before hurricane season. Communities differ in population, vulnerability, travel access, and storm exposure. After a scenario is observed, shipments respond to realized demand and road availability. Objectives include annualized inventory cost, expected unmet demand, and worst-community shortage rate.

Let $x_i$ be kits stored at warehouse $i$. Under scenario $ω$, shipment $y_{ijω}$ and shortage $u_{jω}$ satisfy

$$
\sum_i y_{ij\omega}+u_{j\omega}=d_{j\omega},
$$

$$
\sum_jy_{ij\omega}\le x_i,
$$

and $y_{ijω}=0$ when route $(i,j)$ is closed. Here inventory is first-stage; shipments are recourse.

Expected total shortage

$$\mathbb E\sum_ju_{j\omega}$$

favors populous communities. Worst proportional shortage

$$
\max_{j,\omega}\frac{u_{j\omega}}{d_{j\omega}}
$$

protects smaller communities but can be dominated by a remote location. A vulnerability-weighted shortage $∑_jv_ju_{jω}$ incorporates priority but requires transparent $v_j$. Present all three before deciding which is objective, constraint, or reporting metric.

An epsilon model can minimize expected cost subject to total-shortage and equity limits:

$$
\mathbb E\sum_ju_{j\omega}\le\epsilon_U,
$$

$$
\frac{u_{j\omega}}{d_{j\omega}}\le\epsilon_F
\quad\forall j,\omega\in\Omega_{\mathrm{protected}}.
$$

If demand can be zero, define the fairness denominator carefully. Use a service target or condition only on positive demand. A tiny denominator can make percentage shortage unstable.

Road uncertainty creates network-specific vulnerability. A warehouse with large inventory may become isolated. Nominal distance optimization tends to concentrate stock; resilience rewards geographic diversity. Plot inventory placement and scenario flows. Explain whether added sites reduce expected travel or provide backup under closure.

Budgeted uncertainty can protect demand within each region without assuming every community reaches maximum simultaneously. A factor set can model common storm intensity plus local deviations. Named track scenarios preserve correlated road closures and demand. Compare them rather than choosing geometry solely for tractability.

Minimax regret offers another view. In every storm scenario, compute the best inventory placement that a clairvoyant planner would have chosen. Regret measures avoidable extra shortage or cost from the fixed prepositioning plan. A plan can have high absolute loss in a catastrophic scenario but low regret if every plan suffers similarly.

Validate fairness out of sample. For each held-out storm, report shortage distribution by vulnerability group, not only an aggregate. Examine whether the model's vulnerability weights actually reduce harmful disparity. If groups are defined using the same outcome data, guard against circularity.

An implementable policy specifies emergency transfer rules when inventory is insufficient. Lexicographic recourse can prioritize life-critical kits, then vulnerable communities, then total distance. A finite weighted penalty may unintentionally trade a critical kit for several kilometers of travel saving.

The decision table should include nominal cost, expected shortage, worst protected shortage, held-out group disparity, number of isolated communities served, and inventory turnover. A robust plan earns its name only with the declared scenario coverage and independent tests visible.

### Studio C: a transit corridor that must be fast and fair

A city redesigns bus frequency and limited-stop service along a corridor with twelve neighborhoods. Decisions include hourly departures $f_{rt}$ on route $r$, whether a limited-stop pattern opens, fleet allocation, and transfer coordination. The city cares about operating cost, passenger time, emissions, and access disparity. Demand and travel time are uncertain.

Begin with the passenger path rather than an aggregate score. For origin $i$, destination $j$, and time period $t$, estimated generalized time is

$$
T_{ijt}(f)=W_{it}(f)+R_{ijt}(f)+X_{ijt}(f),
$$

where $W$ is waiting, $R$ in-vehicle time, and $X$ transfer or walking burden. A common approximation under random arrivals is $W\approx1/(2f)$ for regular service. It fails under schedules, bunching, low frequency, and passengers timing arrival. Validate the waiting model before optimizing frequency.

Passenger-time objective is

$$
J_T=\sum_{i,j,t}d_{ijt}T_{ijt}(f).
$$

This demand-weighted total values a minute equally for each trip but gives populous origins more aggregate influence. Equity alternatives include maximum neighborhood average,

$$
J_F=\max_i
\frac{\sum_{j,t}d_{ijt}T_{ijt}}{\sum_{j,t}d_{ijt}},
$$

or maximum change relative to current service. Use an epigraph variable for the maximum. Report low-demand neighborhoods separately because noisy averages with few observations can dominate.

Operating cost can be built from vehicle-hours, vehicle-kilometers, peak fleet, and fixed route activation:

$$
J_C=\sum_{r,t}(c_hH_{rt}+c_kK_{rt})
+c_FF^{\mathrm{peak}}+\sum_rF_rz_r.
$$

Emissions depend on technology, speed, load, and deadheading. If electric buses have zero tailpipe emissions, a lifecycle or grid-emission boundary may still be relevant. State which boundary the objective uses.

Hard constraints include minimum coverage, fleet conservation, driver rules, capacity, and perhaps an accessibility promise. Frequency and fleet cycle time are linked:

$$n_{rt}\ge f_{rt}\tau_{rt},$$

where $τ_{rt}$ is round-trip time in hours. If $τ$ is uncertain, nominal allocation can fail when congestion lengthens cycles. A robust row or recovery policy can reserve vehicles.

The first baseline keeps current route structure and optimizes only frequency. The second allows limited-stop activation. Comparing them shows whether structural redesign earns its complexity. A third baseline allocates buses proportional to observed demand; it is simple and useful but may neglect access equity.

Generate a frontier with cost primary and constraints on total passenger time and worst-neighborhood time:

$$
\min J_C
\quad\text{s.t.}\quad
J_T\le\epsilon_T,\quad J_F\le\epsilon_F.
$$

Vary one epsilon at a time first, then inspect joint combinations. Plot cost versus total time, color by disparity, and label route activations. A frontier point where a limited-stop route switches on may create a jump; do not smooth it away.

Demand uncertainty is partly random and partly forecast error. Morning peaks shift by day; special events create structured surges; a new route changes ridership. Use held-out days for ordinary variation and named event scenarios for structural stresses. If ridership response to service is important, iterate demand and service or use elasticity scenarios. A fixed-demand model estimates short-run benefit only.

Travel times across route segments are correlated. An accident delays adjacent segments together. A factor model with common corridor congestion plus segment residuals is more realistic than independent intervals. Protect cycle-time feasibility against a budgeted or ellipsoidal set, while evaluating passenger-time distribution stochastically.

A chance constraint might require enough fleet with 95% probability:

$$
\Pr(f_{rt}\tau_{rt}\le n_{rt}\ \forall r,t)
\ge0.95.
$$

Joint reliability is harder than separate route probabilities. Allocating 5% failure allowance to every route does not create 95% system reliability. Use scenario constraints, risk allocation, or a conservative union bound with disclosed assumptions.

Recourse exists. Dispatchers can insert reserve buses, short-turn vehicles, or change holding. Model reserve capacity now and scenario dispatch later. A static robust frequency schedule that assumes no operating response may overpay. An optimistic model with unlimited reserve dispatch understates resources. Add realistic recourse limits.

Equity under uncertainty should not be checked only at mean demand. A neighborhood may be acceptable on average but repeatedly suffer in high-congestion scenarios. Report distribution of neighborhood waits, probability of exceeding a service threshold, and worst protected scenario. Weighting by vulnerability may be justified, but publish the index construction and sensitivity.

Suppose the cost-efficient plan removes a low-ridership branch. Total time improves because buses move to crowded routes, yet residents in one neighborhood lose access. If minimum geographic coverage is a public commitment, encode it as a hard rule. If alternatives such as demand-responsive service exist, model their cost and service rather than assigning infinite penalty.

Validate in a microscopic or event simulation using the optimized timetable. Simulate passenger arrivals, capacity denial, bunching, transfers, and travel-time variability. The optimization approximation may use $1/(2f)$; simulation reveals when bunching or denied boarding breaks it. Reoptimize only after diagnosing systematic failure.

Use paired historical or simulated days for comparison. Report mean passenger time, 90th percentile, denied boardings, worst-neighborhood service, cost, emissions, and reserve activation. Confidence intervals on paired plan differences are more informative than separate error bars.

Implementation cost includes change. Drivers and passengers adapt to stable schedules; weekly route switching can destroy usability. Add transition cost or constrain distance from current service:

$$
\sum_{r,t}|f_{rt}-f_{rt}^{\mathrm{current}}|\le\Delta.
$$

Near-optimal analysis can find a plan with slightly higher modeled cost but far fewer timetable changes. That may be the more robust institutional decision.

The final recommendation should state a service envelope: demand range, travel-time uncertainty, reserve availability, and event types under which it was tested. If observed loads exceed the envelope, trigger extra service or reoptimization. A schedule is not permanently robust.

### Studio D: crops, water, profit, and drought resilience

A farming cooperative allocates land and irrigation among crops across seasons. It seeks profit, employment, and soil diversity while limiting water use and downside loss. Yield, price, water availability, and demand are uncertain and correlated through weather and markets.

Let $x_{kts}$ be area of crop $k$ in year $t$ and season $s$. Produced quantity under scenario $ω$ is

$$q_{kt\omega}=\sum_s y_{kts\omega}x_{kts},$$

with sold quantity $v_{ktω}\le q_{ktω}$ and $v_{ktω}\le D_{ktω}$. Profit is

$$
\Pi_\omega=
\sum_{k,t}p_{kt\omega}v_{kt\omega}
-\sum_{k,t,s}c_{kts\omega}x_{kts}
-C^{\mathrm{irrig}}_\omega.
$$

Separate production and sales so surplus does not receive full revenue. If surplus is processed, fed to livestock, or sold at discount, add explicit channels and capacities.

Water use is

$$W_{ts\omega}=\sum_kw_{kts\omega}x_{kts}.$$

Land allocation is chosen before seasonal yield and price are fully known, while supplemental irrigation or market allocation may adapt. Distinguish first-stage planting from recourse. If the cooperative can replant after early-season information, add that stage rather than granting all adaptation in advance.

Multi-objective endpoints include negative expected profit, water use, employment shortfall, and crop concentration. A diversity metric can be a Herfindahl index

$$H=\sum_k\left(\frac{\sum_{t,s}x_{kts}}{\sum_{j,t,s}x_{jts}}\right)^2,$$

which is smaller for diversified area. This quadratic metric does not automatically represent soil health; rotation and legume constraints capture specific agronomy more directly. Use $H$ only for the diversification value it actually measures.

Employment target may be seasonal. Annual labor totals can hide a harvest peak impossible to staff:

$$
\underline L_{ts}\le
\sum_kh_{kts}x_{kts}
\le\overline L_{ts}.
$$

The lower bound supports employment; the upper bound enforces capacity. If labor demand itself is uncertain, hard lower employment may conflict with failed crops. Decide whether it is a job commitment or expected benefit.

Water safety under drought can be robust:

$$
W_{ts\omega}\le A_{ts\omega}
\quad\forall\omega\in\Omega_{\mathrm{protected}},
$$

where $A$ is available irrigation. Profit can be optimized in expectation with CVaR protection:

$$
\max\ \mathbb E[\Pi]-\lambda
\operatorname{CVaR}_{0.95}(-\Pi).
$$

Here CVaR acts on loss $-Π$. Check signs carefully: maximizing positive profit while adding CVaR of profit with the wrong sign can reward bad tails.

Construct scenarios coherently. Drought lowers water availability and many yields, but price may rise for scarce crops. Regional drought can also raise all farms' prices, while a farm-specific failure does not. Cost inflation may correlate with energy-intensive irrigation. A scenario table should expose these relationships.

Start with three plans: expected-profit optimum, minimum-water plan meeting a profit floor, and current-practice baseline. Add robust water feasibility. Generate profit-water frontier and show CVaR as a third dimension. A plan can use slightly more expected water yet be safer under drought if it shifts to crops with responsive irrigation schedules; inspect scenario use, not only nominal coefficients.

Preference questions should be concrete. How much expected annual profit is the cooperative willing to sacrifice to save one thousand cubic meters? What minimum seasonal employment is a commitment? What probability or scenario class of exceeding water rights is unacceptable? Convert answers into epsilon constraints before inventing weights.

Regret is useful because price scenarios have different scales. For each weather-market scenario, compute the clairvoyant planting profit. Regret is the opportunity lost by the fixed plan. A catastrophic drought may give low profit to every plan and high absolute loss, yet moderate regret. Report both solvency risk and regret.

Multi-year rotation makes decisions path-dependent. A crop planted today changes next year's feasible set. End-horizon effects can make the model exploit the last year by ignoring future soil consequences. Add a terminal rotation state or solve a longer horizon and compare early-year choices.

Robustifying every yield downward and every cost upward can create an implausible universal disaster. Budgeted uncertainty can limit simultaneous coefficient extremes; named drought scenarios preserve mechanisms. Compare protection choices through out-of-sample years. A robust plan should reduce actual violations or downside, not merely have a larger safety coefficient.

Decision stability matters to farmers. If tiny price changes completely replace crop patterns while profit barely moves, seek a stable near-optimal plan. Limit year-to-year area changes, include transition costs, or optimize similarity to current capabilities within a 1% profit gap.

Validation uses independent accounting. Recalculate land, water, labor, rotations, production, sales, and scenario profit. Verify sales never exceed demand or production. Check robust water rows in every protected scenario. Recompute CVaR by sorting losses and comparing with the linearized value.

Backtest by historical year blocks to preserve weather correlation. At each planning date, estimate scenarios using prior years only. Evaluate realized profit, water rights violations, labor, and soil rules. Compare mean-optimal, robust, and current practice on paired years. A strategy that wins only because future prices informed scenario construction is invalid.

Communicate with maps and crop calendars. Show where crops are planted, water draw by season, and which rotation or water constraints bind. A frontier plot says what is traded; the calendar shows whether the plan looks implementable. Ask agronomists to review surprising combinations before interpreting them as innovation.

The recommendation might select a robust compromise only if its profit sacrifice, drought protection, and operational change are acceptable. State the declared drought set, the held-out years, and what happens under a drought more severe than the set. Robustness is a bounded claim.

### Studio E: hospital staffing with service and burnout objectives

A hospital schedules nurses across seven days and three shifts. It needs qualification coverage, legal rest, and continuity of care. It also seeks low labor cost, low understaffing risk, fair workload, and limited undesirable shift transitions. Patient demand and absence are uncertain.

Let $x_{nsh}\in\{0,1\}$ indicate nurse $n$ works shift $s$ on day $h$. Coverage by skill $k$ is

$$
\sum_na_{nk}x_{nsh}\ge R_{ksh},
$$

with contract hours, consecutive-day limits, and rest rules. A night-to-next-morning transition can be forbidden by

$$x_{n,\mathrm{night},h}+x_{n,\mathrm{morning},h+1}\le1.$$

Costs include regular and overtime hours. Burnout is not directly observed by one coefficient; use measurable proxies such as consecutive nights, short rest, overtime, or deviation from preferences, and state their limitation. A quadratic workload variance may promote fairness but can conflict with individual contracts.

Hard rules should include legal rest and mandatory qualifications. Patient coverage may be hard for critical care but allowed emergency shortage with costly agency staff. Preferences are soft. Keeping these tiers separate prevents a cheap schedule from purchasing an illegal rest violation.

Demand $R_{ksh}$ is forecast. Absence removes scheduled capacity. A box that assumes every nurse is absent simultaneously is useless; named absence levels, budgeted uncertainty, or a probabilistic model is more appropriate. Correlated illness outbreaks and weather disruptions deserve explicit stresses.

A two-stage model schedules regular staff now and calls agency or float staff after absence and demand are observed. Recourse variables have capacity and higher cost. Without recourse, robust scheduling overstaffs every shift. With unlimited recourse, it underinvests in regular coverage. Model the actual response channel.

Objectives may include expected labor cost $J_C$, expected patient-to-nurse shortfall $J_S$, fairness $J_F$, and preference violation $J_P$. Instead of one score, impose zero critical shortage in protected scenarios, cap workload disparity, and generate a cost-preference frontier.

Fairness can mean equal total hours, equal undesirable shifts, proportional burden by contract, or balanced opportunity for preferred shifts. Equal hours are unfair when contracts differ. Define normalized undesirable burden

$$b_n=\frac{\text{undesirable shifts assigned to }n}
{\text{eligible undesirable shifts for }n},$$

then limit maximum disparity or deviations from group norms. Protect individual privacy in published outputs.

Continuity of care may reward assigning the same nurse team across related shifts. Pairwise products can introduce quadratic or linearized binary terms. Before adding them, test whether continuity affects patient outcomes or is only a preference. More objectives can dilute the critical ones.

Generate a payoff table: minimum cost, minimum preference violation, minimum disparity, and maximum resilience. Evaluate each on shortage scenarios. The cheapest schedule may rely heavily on agency recourse; the fairness optimum may require extra staff; the resilience optimum may distribute skill redundancy.

Use epsilon constraints: minimize expected cost subject to no critical shortage in protected scenarios, agency use below a limit, and fairness $J_F\leε_F$. Sweep $ε_F$. Discrete schedules create jumps, so show roster changes and not only objective curves.

Preference uncertainty belongs to nurses and managers. Elicit acceptable trade-offs through examples: would the hospital pay one extra overtime shift to remove three night-to-morning transitions? Would a nurse accept another weekend for fewer consecutive nights? Aggregate answers carefully and show disagreement.

Stochastic evaluation should simulate demand and absence jointly. Record understaffed patient-hours, critical shortage events, agency calls, overtime, undesirable-shift disparity, and schedule changes. Use the same scenario streams for every roster. Rare but serious failures require many tests or targeted stresses.

Rolling rescheduling can harm stability. When forecasts change, a mathematically better roster may repeatedly alter nurses' lives. Penalize changes from the published roster:

$$J_\Delta=\sum_{n,s,h}|x_{nsh}-x_{nsh}^{\mathrm{published}}|.$$

Set a freeze window where near-term assignments cannot change except emergencies. This is a robustness property of the decision process, not of demand coefficients.

Validate every logical constraint with truth-table or enumeration tests. Create a tiny roster of three nurses and two shifts whose optimum can be enumerated. Independently calculate hours, rest, qualifications, and objectives from exported assignments. A violation hidden by an index offset can have real legal consequence.

Human review is essential. Charge nurses may identify skill combinations or ward realities absent from data. Record overrides and update the model when patterns reveal a missing rule. Do not let informal overrides silently erase fairness or safety commitments.

A responsible recommendation presents several verified rosters if objectives are nearly tied. Operational managers can choose using context not encoded, while the model supplies cost, risk, and fairness evidence. If one roster is selected, state the preference and uncertainty region supporting it.

### Studio F: urban flood adaptation under deep uncertainty

A river city must decide which flood defenses to build over thirty years. Options include levee reinforcement, retention basins, wetland restoration, property elevation, drainage upgrades, and warning systems. Capital is limited. Climate, land use, and future asset exposure are uncertain. Objectives include discounted cost, expected damage, worst-neighborhood risk, ecological impact, and flexibility.

This case differs from ordinary operational uncertainty. A levee is long-lived and difficult to reverse; climate probabilities may be poorly known; one investment changes future development and behavior. A precise expected-value optimum can be fragile even when calculations are correct.

Let binary $z_{it}$ indicate project $i$ begins in period $t$, and $y_{it}$ indicate whether it is available. Lead time $ℓ_i$ gives

$$y_{it}=\sum_{\tau\le t-\ell_i}z_{i\tau},$$

with at most one start. Budget is

$$
\sum_iK_{it}z_{it}\le B_t,
$$

possibly with multi-period construction cash flow. Ignoring lead time grants protection before completion.

Under scenario $ω$, event $e$ has water level, duration, and spatial footprint. Damage in neighborhood $j$ can be approximated by

$$
D_{je\omega}(z)=
V_{j\omega}\,p_{je\omega}(z)\,
g_j(h_{je\omega}(z)),
$$

where $V$ is exposed value, $p$ probability or event weight, $h$ inundation depth, and $g$ a depth-damage fraction. In a finite event catalog, annual expected damage sums across events. But if event probabilities are deeply uncertain, keep scenario-wise damage visible rather than hiding it in one expectation.

Model interactions. A wetland may reduce peaks modestly and improve habitat; a levee can protect one bank while shifting water elsewhere; drainage helps intense rainfall but not river overtopping; warnings reduce human loss but not property exposure. Simply assigning independent “damage reduction percentages” and adding them can exceed 100% or miss transfer risk.

Use a hydrologic or hydraulic simulator where needed, but construct a surrogate carefully if optimization requires many evaluations. Train on a designed set of project combinations and events, validate on held-out combinations, and enforce physical monotonicity when appropriate. A black-box surrogate with low average error can still fail near safety thresholds.

Objectives may be

$$J_C=\sum_{i,t}\frac{K_{it}z_{it}+M_{it}y_{it}}{(1+r)^t},$$

$$J_D^\omega=\sum_{t,e,j}\frac{D_{jte\omega}(z)}{(1+r)^t},$$

and equity risk

$$J_F^\omega=\max_j
\frac{D_{j\omega}(z)}{V_{j\omega}+\varepsilon}.$$

The denominator makes relative loss visible but is unstable for neighborhoods with little recorded property value. Social vulnerability, displacement, critical facilities, and nonmarket loss need separate consideration. Property value alone can direct protection toward wealthy areas.

Ecological impact may be a constraint or objective. Wetland loss, river connectivity, and habitat quality have thresholds and recovery dynamics. A dollar valuation can be informative but should not automatically replace legal or ecological minimums.

Construct a payoff table: minimum capital cost, minimum expected damage under a reference scenario, minimum worst-scenario damage, minimum disparity, and maximum ecological benefit under a damage cap. This exposes projects that look attractive only for one outcome.

For deep uncertainty, scenario probabilities may not be credible. Use robust satisficing: find plans that meet thresholds across many plausible futures rather than maximizing a disputed expectation. For example,

$$
D_\omega(z)\le\bar D,qquad
J_F^\omega(z)\le\bar F
\quad\forall\omega\in\Omega_{\mathrm{protected}}.
$$

Minimize cost subject to these conditions. If no plan satisfies them, minimize maximum threshold exceedance and show which futures cause failure.

Minimax regret is also useful. Compute the best plan for each future with the same budget and timing constraints. Regret measures how much extra damage or cost the chosen adaptive pathway incurs compared with hindsight. Avoid combining dollar damage and ecological score in one regret without a declared value model.

Adaptation pathways preserve flexibility. Instead of committing to every project today, choose an initial action and decision triggers. A pathway may restore wetlands now, reserve land for a basin, then reinforce levees if monitored sea level crosses a threshold. The decision is a policy tree, not one fixed project set.

Let observation $m_t$ update climate state. Trigger rule might be

$$
\text{start project }i
\quad\text{if}\quad
m_t\ge\tau_i
\text{ for two consecutive periods}.
$$

Optimize or compare thresholds $τ_i$, accounting for construction lead time. A trigger set too high reacts after protection is needed; too low commits early and loses flexibility.

Real options language helps. Delaying an irreversible project has information value, while early construction has protection value. A flexible preliminary action can keep multiple futures feasible. Standard net present value that ignores learning undervalues flexibility.

Scenario discovery reverses ordinary sensitivity analysis. Rather than asking how output varies one parameter at a time, label simulations where a plan fails and find combinations of sea-level rise, rainfall intensity, development, and project effectiveness associated with failure. The resulting vulnerable region supports monitoring and contingency planning.

Equity must be tested dynamically. Protection can encourage new development behind a levee, increasing future exposure. Property buyouts can reduce risk but disrupt communities. Wetland restoration may shift land use. Model or discuss induced behavior; a static asset map cannot support unlimited long-run conclusions.

Validate hydrologic outputs on known events, damage functions on observed losses, and project effects on engineering evidence. Backtesting rare extremes is limited, so combine empirical validation with physical constraints and stress testing. Clearly separate calibrated events from extrapolated futures.

Use maps that show inundation, depth change, protected critical facilities, and risk transfer. Use pathway diagrams showing actions and triggers. Frontier plots alone cannot reveal that one neighborhood's improvement comes from moving water to another.

The recommendation should name an initial action, reserved options, monitoring variables, trigger thresholds, lead times, and failure conditions. “Build Project A” is incomplete when future learning and adaptation are central.

### Studio G: resilient procurement and supply networks

A manufacturer selects suppliers, contracts base quantities, and reserves emergency capacity before demand and disruptions are known. After uncertainty is observed, it allocates orders, expedites shipments, uses inventory, or accepts shortage. The company values cost, service, emissions, supplier diversity, and disruption resilience.

First-stage decisions include supplier activation $z_i$, contract capacity $q_i$, and safety stock $I_0$. Scenario recourse includes order $x_{itω}$, expedited quantity $e_{itω}$, inventory $I_{tω}$, and shortage $u_{tω}$. Balance is

$$
I_{t-1,\omega}+\sum_i(x_{it\omega}+e_{it\omega})
=d_{t\omega}+I_{t\omega}-u_{t\omega},
$$

under a consistent sign convention. Supplier capacity is

$$x_{it\omega}\le a_{it\omega}q_i,$$

where availability $a$ falls during disruption.

Fixed qualification cost and minimum order quantities create integer structure:

$$L_iz_i\le q_i\le U_iz_i.$$

If $L_i>0$, activating a supplier commits volume. A diversification objective that activates many suppliers can conflict with minimum orders and raise obsolete inventory.

Expected cost includes qualification, purchase, holding, expediting, and shortage. Carbon includes production and transport under a stated boundary. Service can be fill rate or expected shortage. Resilience may be worst-scenario service, recovery time, or performance after loss of a major supplier.

Supplier count is a crude diversity measure. Two suppliers in the same floodplain or relying on the same upstream factory are not independent. Build a dependency network or disruption factors. Geographic diversity without upstream visibility can create an illusion of resilience.

A transparent baseline buys from the cheapest supplier and holds current safety stock. A deterministic diversified plan caps each supplier's share. A stochastic plan weighs disruption scenarios. A robust plan protects a declared set such as loss of any one supplier plus demand deviation.

An $N-1$ rule requires service under removal of each single supplier. For every $i$, solve or include scenario with $a_i=0$. It does not protect against common-mode failures. Add named regional, transport, and upstream scenarios.

Budgeted uncertainty can model uncertain yields or lead-time capacity without assuming all suppliers fail simultaneously. But binary complete failure is often better represented by scenarios than continuous coefficient deviation. Choose uncertainty form from mechanism.

The cost-service-emission frontier may be generated with service as a hard threshold:

$$
\Pr\left(
\frac{\sum_tu_{t\omega}}{\sum_td_{t\omega}}
\le\alpha
\right)\ge1-\epsilon,
$$

or scenario-robust service for protected disruptions. Chance constraints need a credible probability model. If rare disruption probability is disputed, show results over probability ranges or use regret.

CVaR of total cost captures expensive disruption tails. CVaR of shortage emphasizes high-shortage scenarios. A weighted sum of both can double-count shortage if shortage penalties already dominate cost. Display objective components and check whether the risk term adds distinct information.

Multi-objective fairness may apply to customers. Cost optimization can ration remote or low-margin customers during disruption. Minimum service by region or customer class can prevent this. State whether priority reflects medical necessity, contract, vulnerability, or profitability.

Lead time creates temporal recourse limits. An emergency supplier cannot serve tomorrow if qualification and shipping take two weeks. Model order arrival with lag:

$$I_{t\omega}=I_{t-1,\omega}
+\sum_ix_{i,t-L_i,\omega}-d_{t\omega}+u_{t\omega}.$$

Incorrect same-period arrivals make disruption recovery unrealistically fast.

Information arrives gradually. Demand forecasts update before supplier disruption is fully known; shipment status updates later. A multistage scenario tree can represent this, but tree size grows rapidly. Rolling-horizon policies or decision rules may be more practical. Ensure policies do not distinguish scenarios before their histories diverge; these are nonanticipativity constraints.

For scenarios $ω$ and $ω'$ identical through time $t$, decisions before $t$ must match:

$$x_{i\tau\omega}=x_{i\tau\omega'}
\quad\text{for }\tau\le t.$$

Omitting this constraint lets the model know future disruptions and underprices resilience.

Regret compares the contracted network with the best network for each future. Because supplier qualification is irreversible in the horizon, scenario-specific hindsight can be much better. Use regret to identify plans that avoid severe lock-in, but also report absolute shortage in catastrophes.

Preference sensitivity asks how much the firm values a tonne of emissions, a point of fill rate, or one fewer single-source component. Use operational thresholds when possible: regulatory carbon limit, contractual service level, and board-approved concentration cap.

Validate on historical disruptions and synthetic compound events. Preserve temporal sequences. Evaluate recovery time, peak shortage, total shortage, expedite use, cost, emissions, and supplier concentration. Use common scenarios for all plans.

Audit recourse feasibility independently. For each scenario and period, reconstruct inventory balance, supplier capacity, lead time, contract bounds, and customer service. Verify first-stage contract choices are identical across scenarios and nonanticipativity holds.

A plan that opens a second supplier at small expected cost may sharply reduce worst-case shortage. Another supplier may add no resilience because it shares the same dependency. Explain resilience through scenario flow and dependency diagrams rather than supplier count.

Implementation needs triggers: when to expedite, when to ration, when to activate reserved capacity, and when to qualify a new source. Monitor lead time, fill rate, geographic events, financial health, and upstream dependencies. Reoptimize when observations leave the calibrated set.

### Studio H: an end-to-end robust decision audit

The same audit applies to every studio. First, write a timeline of decisions and information. Circle any variable allowed to react before its data are known. This catches perfect-information leakage.

Second, create a payoff table by optimizing each objective alone. Check every resulting decision for feasibility and evaluate it on every objective. This reveals conflicts, scales, and accidental redundancy.

Third, classify every criterion as a hard rule, target, or tradeable objective. Ask what should happen if it cannot be met. Use lexicographic priorities for nontradeable goals rather than giant arbitrary weights.

Fourth, construct the uncertainty model from evidence. List units, data source, dependence, time horizon, and calibration. Draw low-dimensional projections of sets and write named scenarios as stories. Identify structural mechanisms that no parameter set covers.

Fifth, derive at least one robust counterpart by hand. Verify signs, dual norms, and recourse timing. Test a scalar special case. A solver accepting the model is not evidence that the counterpart represents the intended adversary.

Sixth, generate the frontier with at least two methods when feasible: weights for supported points and epsilon constraints for coverage. Remove infeasible and dominated points with tolerances. Preserve links from objective vectors to decisions.

Seventh, select representative policies before choosing a winner: baseline, cheapest, safest, fairest, knee, and robust. Show their actual schedules, locations, or allocations. A point in objective space is not an implementable description.

Eighth, verify optimization output independently. Recompute constraints, objectives, scenario metrics, integrality, and bounds from exported decisions. Reevaluate after rounding. Keep run identifiers so figures and tables cannot mix experiments.

Ninth, evaluate on independent data and outside-set stresses. Use paired scenarios, confidence intervals, tail metrics, and decision stability. Label formal guarantees separately from empirical results.

Tenth, perform preference sensitivity. Show thresholds or regions in which each policy is selected. If small judgment changes switch decisions with little performance difference, present alternatives or choose a stable near-optimal plan.

Eleventh, quantify price of protection, value of recourse, and residual risk. Protection without cost is incomplete; cost without reliability benefit is meaningless. State which events remain outside the model.

Twelfth, write a conditional recommendation with a monitoring trigger and fallback. A robust decision is maintained through observation and revision, not declared once forever.

### Audit lab 1: prove that the frontier is what it claims

Export every candidate as a row containing a stable decision ID, objective values, feasibility residuals, method, parameter setting, seed, solver status, and bound. Never identify a solution only by its rounded objective values; distinct decisions can share them.

Recompute objectives in a separate evaluator. The frontier generator may normalize, negate maximization objectives, or aggregate scenarios. The evaluator should reconstruct raw cost, service, emissions, equity, regret, and risk from exported decisions. Compare evaluator and solver values within stated tolerance. A sign error in one maximization objective can invert dominance while every plot still looks smooth.

Convert all objectives to a consistent minimization convention for dominance, but retain original units for reporting. If profit is maximized, store dominance value $-Π$ and display value $Π$. Name columns explicitly so a later script cannot minimize profit accidentally.

Filter infeasible points using domain tolerances before nondominated sorting. Preserve a rejected-points file with the largest violation and semantic location. This reveals whether an algorithm appears competitive only because it violates a difficult service or safety row.

Deduplicate in two stages. Objective duplicates satisfy

$$
\|S(F(x)-F(y))\|_\infty\le\tau_F,
$$

where $S$ scales objectives. Decision duplicates satisfy an appropriate decision metric below $τ_x$. Merge points for plotting only when objective-duplicate, but retain all decision-distinct alternatives. A policymaker may prefer one equivalent route or crop plan for unmodeled reasons.

For each remaining point $x$, search for any $y$ satisfying tolerance-aware dominance. If found, record the dominating decision and objective differences. Unit-test the routine on hand-built sets containing exact duplicates, weakly dominated points, near ties, infeasible attractive points, and a nonconvex unsupported point.

Check endpoints against single-objective solves. The lowest-cost frontier point should reproduce the cost optimum subject to shared hard constraints. If not, the sweep missed an endpoint or used different constraints. Repeat for every objective. Compare exact and heuristic frontiers on a small instance.

For weighted sums, verify weights are nonnegative, normalized only for presentation if needed, and applied after declared scaling. Record the actual coefficients sent to the solver. Two teams can report the same nominal weights but solve different problems because their normalization ranges differ.

For epsilon constraints, store requested epsilon, achieved secondary objective, slack, and feasibility. A constraint can be inactive; that is informative. If the achieved value exceeds epsilon beyond tolerance, reject the point. If many requested values map to the same decision, report stability intervals.

For a purported unsupported point, demonstrate it. In two objectives, test whether any supporting line can make it optimal or show a three-point calculation like the earlier example. In higher dimensions, solve an inverse weight feasibility problem. The label should come from geometry, not visual impression.

Knee selection requires its own audit. Recompute after alternative reasonable scaling and endpoint estimates. If the selected knee changes dramatically, do not call it a natural compromise. Present the competing candidates and marginal trade-offs in original units.

Hypervolume comparisons must use the same fixed reference and scaling. Bootstrap or repeat stochastic algorithms and report distributions, not one maximum. A tiny hypervolume difference can be smaller than run variation. Pair algorithm runs on shared instances and evaluation budgets.

Finally, inspect decision transitions along the frontier. Plot binary activation, resource allocation, or schedule features against the frontier order. Sudden changes may be real integer thresholds. They may also reveal inconsistent indexing or warm-start artifacts. Re-solve near breakpoints with tighter tolerances and alternative starts.

### Audit lab 2: challenge the uncertainty model

Create an uncertainty dictionary. For each uncertain quantity, record symbol, unit, nominal estimate, range or distribution, data period, sample size, dependence, decision-time availability, and calibration method. Add a column specifying whether the uncertainty is aleatory, epistemic, structural, or mixed. This classification determines what additional evidence can reduce it.

Plot raw and transformed data. If a Gaussian model is used, inspect tails, skew, heteroskedasticity, autocorrelation, and regime change. Do not demand perfect normality mechanically; identify which departures affect the decision guarantee. A central-limit approximation may support an aggregate while failing for extremes.

Verify correlations on the same aligned observations. Pairwise covariance built from different missing-data subsets may not be positive semidefinite. Repairing the matrix numerically can be necessary, but explain the method and assess how the repair changes robust decisions.

For interval sets, test coverage on held-out data. Record marginal coverage and simultaneous coverage. A collection of 95% marginal intervals does not mean the full vector lies in the box 95% of the time. For temporal sequences, test whole-path coverage as well as hourly coverage.

For ellipsoids, plot Mahalanobis radii

$$
r_t^2=(a_t-\bar a)^T\Sigma^{-1}(a_t-\bar a).
$$

Compare empirical quantiles with the chosen radius. Investigate points outside the ellipsoid: data error, rare but real regime, or omitted factor? Do not automatically delete inconvenient extremes.

For budgeted uncertainty, explain $Γ$ through concrete deviations. At $Γ=2.5$, identify how the inner adversary allocates two full and one half deviations for the selected decision. Plot which coefficients become worst-case active. If the same coefficient dominates every plan, a simpler targeted stress may communicate better.

For scenario sets, maintain a scenario card: narrative, parameter vector, source, internal consistency checks, and protected versus evaluation status. Detect duplicates and impossible combinations. Ensure event probabilities sum correctly only when probabilities are actually used.

Perform leave-one-scenario-out analysis. Remove each optimization scenario, reoptimize, and test on the removed scenario. A plan that collapses whenever one scenario is omitted depends heavily on scenario enumeration. Add scenario discovery or broader protection if that dependence is unacceptable.

Stress beyond the boundary. Increase uncertainty radius gradually, combine two adverse mechanisms, delay recourse, and corrupt one data feed. Locate the first feasibility failure and decision switch. This does not enlarge the formal guarantee; it tells readers how failure begins.

Structural alternatives should share a validation protocol. Fit each using the same training information, test on the same held-out observations, and optimize policies without allowing one model future knowledge. If models remain indistinguishable empirically, protect across them or report model-contingent recommendations.

Audit the probability language. “95% confidence,” “95% prediction,” “95% chance constraint,” “95% empirical coverage,” and “95% of scenarios” are not synonyms. Rewrite every percentage with its reference population and assumptions.

### Audit lab 3: test information and recourse

Draw a scenario tree with nodes labeled by observed history. Decisions at the same information node must be identical. In a deterministic-equivalent program, nonanticipativity constraints enforce this. Verify them numerically by grouping scenarios with shared histories and comparing decisions.

Plant a leakage test. Give two scenarios identical histories through period three but different futures. If first-period decisions differ, the model has future information. This tiny test detects an error that large objective tables can hide.

Check recourse bounds. Emergency supply, agency staffing, reserve buses, or expedited shipping must have capacity, lead time, eligibility, and cost. Unlimited recourse makes first-stage resilience look cheap. No recourse makes it unnecessarily expensive. Compare both extremes to understand the value of flexibility.

Compute value of perfect information and value of the stochastic solution with consistent sign conventions. For minimization,

$$
\operatorname{EVPI}=z_{\mathrm{stochastic}}
-\mathbb E[z_{\mathrm{wait-and-see}}]\ge0,
$$

and

$$
\operatorname{VSS}=z_{\mathrm{expected-value\ policy}}
-z_{\mathrm{stochastic}}\ge0
$$

when both policies are evaluated stochastically and solved accurately. Negative results beyond tolerance reveal inconsistent evaluation or local solutions.

Test policy execution, not only perfect recourse optimization. In reality, operators use forecasts, thresholds, and limited computation. Simulate the actual rolling policy with delayed or noisy observations. A two-stage optimum with full scenario realization can overstate achievable adaptation.

Check terminal conditions. Inventory, battery energy, ecological state, and staff obligations at the horizon influence apparent recourse. Free disposal or leftover value must be intentional. Extend the horizon and compare early decisions to detect endpoint exploitation.

### Audit lab 4: verify robustness and reliability claims

For every robust row, generate an adversarial parameter attaining or approximating the support function. Substitute it into the original uncertain constraint and check equality at an active robust solution. This connects the counterpart to the uncertainty it represents.

For a box with signed $x$, adversary uses coefficient deviations aligned with sign. For an ellipsoid, use $u^*=ρP^Tx/‖P^Tx‖_2$. For budgeted uncertainty, solve the inner LP independently and compare its value with dual variables $Γπ+∑q_j$. Strong duality should match within tolerance.

Sample inside the uncertainty set and confirm feasibility, but remember random sampling cannot prove a worst-case guarantee. The analytic adversary or independent inner maximization is stronger evidence. Sample outside the set to understand degradation.

For chance constraints, estimate violation on independent data with confidence intervals. If $k$ failures occur in $n$ independent trials, report a binomial interval rather than only $k/n$. When observations are dependent, use blocks or event-level trials and say so.

For CVaR, sort independent scenario losses and compare empirical tail average with the optimization variables. Check whether $η$ is a plausible VaR threshold and $ξ_s=\max(0,L_s-η)$. A sign or confidence-level error can optimize the best tail instead of the worst.

For distributionally robust claims, document ambiguity set, radius, support, theorem conditions, and whether the guarantee is finite-sample or asymptotic. Reevaluate under distributions just outside the set. “Distribution free” always has conditions; quote them rather than turning the phrase into immunity.

The price-of-robustness curve should start at the nominal model when protection is zero, unless another formulation changes simultaneously. Verify monotonicity where theory predicts it: enlarging a nested uncertainty set cannot improve the optimal value of a minimization problem with robust constraints, although reported out-of-sample performance can fluctuate.

If robust objective improves as the set grows, inspect whether objectives, normalization, or feasible decisions changed. Apparent improvement may be caused by evaluating each plan under a different metric rather than the same nominal benchmark.

### Audit lab 5: connect evidence to a human decision

Prepare a one-page comparison of representative policies. Include original-unit objectives, formal guarantee scope, empirical test results, decision stability, implementation change, and residual risks. Use the same rows for every policy; blank cells reveal missing evidence.

Write a claim ledger. Each sentence in the conclusion should link to a model result, table, figure, theorem, or source. Mark whether it is mathematical, empirical, interpretive, or normative. “Plan B has the lowest verified worst-case cost” is mathematical under the set. “Plan B is fairest” depends on a chosen fairness definition. “Plan B should be adopted” is normative and operational.

Run a reversal test on fairness. If neighborhood or demographic labels were swapped while needs and constraints stayed the same, would the recommendation change for a legitimate reason? Investigate proxy variables and historical inequities. Mathematical symmetry alone does not guarantee social fairness, but unexplained label dependence is a warning.

Conduct a stakeholder comprehension test. Ask someone not involved in modeling to explain what the uncertainty set contains, what the guarantee means, which trade-off selected the plan, and when the plan should be reconsidered. Misunderstanding is a deployment risk even when mathematics is correct.

Create monitoring thresholds from the model boundary. Track whether demand, price, correlation, response efficacy, or service times leave validated ranges. Track active constraints and emergency recourse frequency. Reoptimization triggers should be defined before failure, not improvised afterward.

Document override authority and fallback. If the robust policy becomes infeasible because a novel event occurs, who may relax which target? Which constraints remain inviolable? Which baseline can operate if software or data fail? A model without a fallback is not operationally resilient.

Archive the final package: raw data hashes, preprocessing, uncertainty calibration, formulation, solver settings, candidate archive, independent evaluator, frontier construction, selection logic, figures, and decision memo. One command should regenerate the evidence from permitted inputs.

The audit is complete only when another person can reproduce the frontier, locate the selected decision, verify its guarantee, observe its empirical performance, and state its limitations without relying on private explanation from the model author.

### A numerical mini-case: one table, five decision rules

A relief agency must preposition exactly 100 kits between west warehouse W and east warehouse E. Let $x$ be kits at W and $100-x$ at E. Three equally plausible scenarios describe regional demand:

$$
\begin{array}{c|rrr}
&\text{west surge}&\text{balanced}&\text{east surge}\\\hline
d_W&90&50&25\\
d_E&30&50&85
\end{array}.
$$

After demand is observed, unused kits can cross regions, but transport capacity permits at most 20 kits in either direction. Shortage in scenario $s$ is the minimum remaining unmet demand after local use and transfer. Because total demand is 120 in the two surge scenarios and 100 in the balanced scenario, at least 20 kits are missing in either surge even with perfect placement; extra shortage appears if the 20-kit transfer cannot correct spatial imbalance.

Test five candidate placements:

$$x\in\{20,35,50,65,80\}.$$

For $x=50$ under west surge, W lacks 40 while E has 20 surplus. Transfer 20 east to west, leaving west shortage 20. East demand 30 is served locally. Total shortage is 20. Under east surge the result is symmetric. Under balanced demand, shortage is zero.

For $x=20$ under west surge, W lacks 70 while E has 50 surplus. Only 20 can transfer, so west shortage is 50. Under east surge, E has 80 kits and lacks 5; W has surplus and can transfer 5, so shortage is zero. Balanced demand needs 30 transferred W-ward, above capacity 20, leaving shortage 10. By symmetry $x=80$ has scenario shortages $(0,10,50)$.

For $x=35$, west surge begins with W shortage 55 and E surplus 35. Transfer 20, leaving shortage 35. Balanced demand needs 15 transferred to W, so shortage is zero. East surge has E inventory 65 and shortage 20; W surplus is 10 after local demand 25, so transferring 10 leaves shortage 10. Thus shortages are $(35,0,10)$. Placement $x=65$ gives $(10,0,35)$.

The shortage table is

$$
\begin{array}{c|rrr|rr}
x&\text{west surge}&\text{balanced}&\text{east surge}
&\text{mean}&\text{worst}\\\hline
20&50&10&0&20&50\\
35&35&0&10&15&35\\
50&20&0&20&13.33&20\\
65&10&0&35&15&35\\
80&0&10&50&20&50
\end{array}.
$$

Both expected-shortage and minimax-shortage rules choose $x=50$. That agreement is not universal; it follows from symmetric equal probabilities. Change west-surge probability to 0.6, balanced to 0.2, and east surge to 0.2. Expected shortages become 32, 23, 16, 13, and 12. The expected rule chooses $x=80$, while minimax still chooses $x=50$. A probability judgment changes the decision.

Now include annual holding costs: W costs 1 per kit and E costs 0.6. Total placement cost is

$$C(x)=x+0.6(100-x)=60+0.4x.$$

Cost rises from 68 at $x=20$ to 92 at $x=80$. We now have a cost-shortage frontier rather than one answer. Under equal scenario probabilities, candidate objective pairs $(C,\mathbb E[u])$ are

$$
(68,20),\ (74,15),\ (80,13.33),\ (86,15),\ (92,20).
$$

The last two are dominated by cheaper placements with no greater expected shortage. The first three form the discrete Pareto set. The move from $x=20$ to 35 costs 6 and reduces mean shortage by 5. Moving from 35 to 50 costs another 6 but reduces shortage by only 1.67. The point $x=35$ is a plausible knee, while $x=50$ provides stronger worst-case balance.

An epsilon constraint makes the value judgment explicit. Minimize cost subject to expected shortage at most 16. Candidates $x=35,50,65$ satisfy the shortage cap, and $x=35$ is cheapest. Tighten the cap to 14 and only $x=50$ qualifies. The recommendation changes at a visible service threshold.

Next compute regret in shortage. The scenario-specific best shortage among candidates is zero in each surge and zero in balanced demand: allocate toward the surge after seeing it. Regret therefore equals shortage here. Worst-regret choice is $x=50$. If scenario-specific unavoidable shortage differed, regret would subtract it and could select another plan.

Add a robust service requirement: shortage no more than 25 for every scenario. Only $x=50$ satisfies it. A budgeted or interval model could reach the same conclusion if its uncertainty set contains the three demand patterns. The formal guarantee applies only to those patterns or their declared set; demand $(100,100)$ would violate it because total inventory is insufficient.

Suppose a second truck raises transfer capacity from 20 to 35 at annual cost 7. Recompute shortages. Greater transfer makes extreme placements less fragile, and the optimal first-stage allocation may shift toward cheap E storage. This is recourse value: flexible transport substitutes for balanced prepositioning. Compare the cost of the truck with reduced expected and worst shortage rather than assuming more flexibility is always worthwhile.

Add an equity objective: maximum regional shortage rate. Under west surge at $x=50$, W shortage rate is $20/90$, about 22.2%; east is zero. Under east surge it is $20/85$, about 23.5%. An expected-total objective does not show this difference. A fairness threshold can require each regional rate below 25% in protected scenarios.

This mini-case supplies regression tests. A program should reproduce each shortage, mean, worst value, dominance result, epsilon selection, and robust-feasibility label. Change one transfer capacity, probability, or storage cost and predict the direction before running code. If results violate the hand calculation, inspect balance and transfer signs before trusting a larger model.

It also exposes the conceptual distinctions cleanly. Expected optimization needs probabilities. Robust optimization needs a protected set. Minimax uses absolute worst harm. Minimax regret uses forgone opportunity. Multi-objective optimization shows cost-service alternatives. Recourse changes what can adapt. No method is “the advanced version” of all others; each encodes a different decision statement.

### How to extend the mini-case without losing transparency

The next useful extension is not a larger random table. Add one mechanism at a time and preserve the hand case as a regression test. First, allow emergency purchase $e_s$ after a scenario is observed, capped at 10 kits and costing 4 per kit. Shortage balance becomes

$$u_s\ge d_s-\text{served from stock and transfer}-e_s.$$

Expected-cost optimization may rely on emergency purchase, while a protected-service model may reserve it only for extreme scenarios. Report its frequency and maximum use. Recourse that is always saturated is evidence the first-stage plan may be underbuilt.

Second, make transfer capacity uncertain. Suppose ordinary capacity is 20, but a road disruption reduces it to 5. Create paired demand-road scenarios rather than varying them independently if the same storm causes both. A plan diversified across warehouses becomes more valuable when transfer fails exactly during demand surge.

Third, allow an inventory decision above or below 100 with procurement cost and a total budget. Now robust shortage can be reduced by both more inventory and better placement. Plot total stock and west share along the frontier. These are different decision levers, and a scalar objective can hide which one changes.

Fourth, add two kit types, medical and food, with separate demands and transport volume. A single “kit” aggregation is valid only if types are interchangeable or always used in fixed proportions. Multi-commodity capacity becomes

$$
\sum_kv_ky_{ijks}\le U_{ij},
$$

where $v_k$ is volume. Forgetting the sum duplicates truck capacity for each commodity.

Fifth, make vulnerability a service priority rather than a weight invented after seeing results. Require medical shortage rate in high-vulnerability communities below a threshold before minimizing ordinary shortage. If the threshold makes the model infeasible, the elastic diagnostic reveals additional stock or transport needed to honor it.

At every extension, retain a small enumerated instance. Compare its exact frontier with any evolutionary or decomposition method used on the large network. The small instance checks model construction; the large case tests scale. Neither can substitute for the other.

Finally, write the data needs implied by the model: demand distribution by region and kit type, road capacity under events, warehouse cost and loss, emergency purchase lead time, vulnerability definition, and service thresholds. If a parameter is unavailable, simplify the model or present sensitivity. Do not fill every missing cell with a confident-looking number.

This extension discipline is how a tutorial becomes a research workflow. Every new term answers a named failure of the previous model, every parameter has evidence, and every conclusion remains traceable to a verified simpler case.

One more check is worth preserving: reverse the roles of west and east, including demand, cost, and scenario probabilities. The transformed optimum should reverse consistently. If it does not, inspect hard-coded indices, asymmetric transfer equations, and scenario weights. Symmetry tests expose implementation mistakes that ordinary random tests rarely isolate.

Then scale every kit quantity and transfer capacity by ten while keeping per-kit costs and rates consistent. Shortage quantities should scale, proportional shortage should not, and selected shares should remain comparable. Unexpected change may reveal fixed tolerances or penalties that were not scaled with the problem.

Finally, add a dominated candidate deliberately. The frontier routine must remove it, while the raw archive retains it with the ID of a dominating plan. Add an objective duplicate with a distinct allocation; the plot may merge it, but the decision archive must keep it. These simple tests verify that mathematical cleanup does not erase operational alternatives.

When all three transformations pass, the example serves as a compact certificate for balance equations, uncertainty evaluation, dominance, selection, and reporting. Keep it in the repository even after the real network grows much larger. It remains the fastest trustworthy explanation of what the larger system is supposed to do.

### A compact reproducible experiment

For teaching and regression testing, reduce any case to two decisions, two objectives, and three scenarios. Enumerate feasible decisions. Calculate the Pareto set, weighted selections, epsilon selections, scenario regret, robust feasibility, and expected loss by hand. Then make the general code reproduce every number.

Include a nonconvex objective set so one efficient point is unsupported. Include a scenario in which the nominal optimum violates a hard rule. Include two objective-identical but decision-distinct solutions. These features test the cases most likely to be mishandled.

Deliberately corrupt one scenario probability, reverse one inequality, and swap a unit. The independent verifier should fail with a meaningful message. A test suite that never detects a planted error has not demonstrated diagnostic power.

### Final synthesis

Multi-objective optimization does not manufacture consensus. It separates mathematical dominance from human preference and makes the consequences of value judgments visible. Robust optimization does not predict the future. It protects a decision against a declared family of errors and exposes the cost of that protection.

The two disciplines belong together. A plan that is cheap, fair, and low-emission only under one precise forecast is not a reliable compromise. A plan that survives every imaginable disaster but consumes all available resources is not automatically desirable. We need a frontier of protected decisions, evidence about which futures are plausible, and an explicit rule for choosing among them.

The most mature result may be a region rather than a point: a set of plans that remain near-optimal across data, scenarios, and defensible preferences. Within that region, choose the simplest implementable plan, monitor its assumptions, and retain a fallback. Stability and explainability can be legitimate decision values even when they were not in the first objective list.

Before leaving this blog, return to the disagreement at the beginning. The teammate who wanted low cost, the teammate who wanted safety, and the client who protected service were not obstacles to modeling. Their disagreement supplied the structure. Mathematics became useful when it stopped hiding the disagreement and began showing exactly where the decision changes.

## 12. Knowledge Check

These questions progress from Pareto dominance to unsupported efficient points, robust counterparts, adjustable decisions, and a complete ecological-policy audit. Some questions have multiple correct answers.

<section class="modeling-quiz" data-modeling-quiz="lesson-6" data-locale="en"></section>
