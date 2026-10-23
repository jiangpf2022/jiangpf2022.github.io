---
title: 7 - Intelligent Optimization
date: 2026-09-15 18:00:15
permalink: 2026/09/15/Mathematical-Modeling-07-Intelligent-Optimization/
categories: Mathematical Modeling
tags:
  - Genetic Algorithms
  - Particle Swarm Optimization
  - Simulated Annealing
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 170
lesson_number: 7
lesson_level: 1
review_lock: false
excerpt: "Understand GA, differential evolution, PSO, and simulated annealing through representation, constraints, convergence evidence, and a real CUMCM case."
---

Imagine the objective surface as a mountain range at night. You can measure the height where you stand, but you cannot see every valley, the terrain is broken by forbidden regions, and some decisions are not even continuous. This is where population-based and stochastic search methods become useful—and where vague claims about “intelligence” become dangerous.

This blog studies genetic algorithms (GA), differential evolution (DE), particle swarm optimization (PSO), and simulated annealing (SA). We will treat them as algorithms, not metaphors. Every update will be written explicitly; representation and constraints will receive as much attention as the objective. The real case is a 2024 CUMCM national excellent paper on crop planning that uses a differential-evolution genetic algorithm (DEGA). It gives us a chance to ask the question competition papers too often avoid: how do we know the heuristic is solving the model we intended?

<div class="mm-key-box"><span class="mm-callout-label">The heuristic contract</span><p>A metaheuristic must declare its <strong>encoding, initialization, variation operators, constraint handling, stopping rule, random-seed protocol, and comparison baseline</strong>. A convergence curve alone is not evidence of global optimality.</p></div>

## When to Use Metaheuristics

Before choosing an algorithm, separate three questions that are often collapsed into one. First, is the mathematical model difficult, or has it merely been written in a difficult way? Second, does a candidate take a long time to evaluate? Third, do we need a proof of optimality, or is a high-quality feasible decision under a fixed deadline sufficient? A model may contain thousands of variables and still be an easy linear program. A model with two variables can be difficult if each evaluation runs a stochastic simulator and the surface is discontinuous.

The word *metaheuristic* describes a broad search framework rather than a certificate-producing solver class. Genetic algorithms, PSO, DE, and SA can explore landscapes without derivatives and can represent unusual discrete decisions. Their flexibility is valuable, but it also makes it easy to hide formulation errors. An exact solver often refuses a malformed model or reports infeasibility. A heuristic may return a polished vector no matter what objective we supplied.

### Diagnose the structure before searching

Start by writing the objective and constraints without naming an algorithm. Mark each variable as continuous, integer, binary, permutation, categorical, or functional. Identify linear, quadratic, norm, logical, simulation, and black-box components. Ask whether uncertainty is represented explicitly or has been buried in one forecast.

For example, a delivery problem may initially appear nonlinear because route cost is written as a complicated loop. If customer assignment is fixed and road costs are known, the routing subproblem may be a shortest path. If opening depots is binary and shipments are continuous, the model may be a MILP. If the only nonlinear term is a Euclidean norm, an SOCP reformulation may exist. Replacing these structures with a generic heuristic throws away bounds, dual information, and reliable software.

On the other hand, suppose a candidate theme-park layout is evaluated by an agent-based simulation containing queue abandonment, congestion interactions, weather, and visitor choice. The objective is noisy, gradients are unavailable, and a layout includes discrete facility types plus coordinates. A metaheuristic may be justified, perhaps with a surrogate model or structured decoder. Even then, simpler pieces should remain exact: a flow allocation inside each layout might be solved by LP rather than approximated by random search.

### A hierarchy of evidence

The strongest evidence depends on what is available:

1. A proof or exact solver certificate establishes optimality for the specified model.
2. A computable lower or upper bound measures distance from optimality.
3. Exact solutions on reduced instances validate encoding and implementation.
4. Strong domain baselines show whether complexity adds practical value.
5. Repeated stochastic runs characterize variability.
6. Sensitivity and stress tests assess whether recommendations survive uncertainty.
7. A convergence curve alone shows only the best value observed by one run.

These layers are complementary. Matching an exact optimum on a toy case does not prove global optimality on the full case, but failing the toy case reveals a problem immediately. Beating a greedy baseline does not prove excellence, but failing to beat it makes the heuristic hard to justify.

### The cost of one evaluation changes everything

If $f(x)$ is an algebraic expression evaluated in microseconds, a population of hundreds and many independent seeds may be affordable. If $f(x)$ is a two-hour fluid simulation, ten thousand evaluations are impossible. Report computational budget in objective evaluations and wall time. A method that converges in fifty iterations with a population of five hundred uses more evaluations than one running five hundred iterations with ten candidates.

Expensive objectives motivate several approaches. Cache duplicate candidates. Use common random numbers to reduce comparison noise. Fit a surrogate to previous evaluations and select new points through uncertainty-aware acquisition. Use multifidelity models: a coarse simulation screens candidates, and a high-fidelity simulation verifies finalists. Parallelize independent evaluations, but distinguish reduced wall time from reduced computational work.

### Vivid comparison: locating a rescue station

A coastal county wants one rescue station. If travel time from station $z\in\mathbb R^2$ to each village $a_i$ is proportional to Euclidean distance and the objective minimizes the worst distance, the problem is

$$\min_{z,t}\ t\quad\text{subject to}\quad \|z-a_i\|_2\le t\quad\forall i.$$

This is an SOCP. A reliable convex solver is preferable to PSO. It returns a global solution for the model and a certificate.

Now enrich reality: roads can flood according to correlated scenarios; response time comes from a traffic simulator; candidate stations must lie on irregular land parcels; construction type is categorical; helicopter noise affects demand; and the county values tail risk and equity. The clean SOCP may become a mixed black-box problem. A heuristic can search strategic choices while an inner shortest-path or flow solver handles each scenario.

The lesson is not “complex reality requires intelligent optimization.” It is “retain every exploitable structure and use stochastic search only for the part that truly needs it.” A hybrid model is often clearer and faster than sending every variable into one enormous chromosome.

### Landscape language without pretending to see the landscape

We describe local minima, basins, ridges, plateaus, and multimodality. In two dimensions these can be drawn. In five hundred dimensions they are metaphors based on sampled behavior. A local minimum under one neighborhood may not be local under another. A route can be locally optimal to pairwise swaps but improvable by 3-opt. A binary solution can be stable to one-bit flips but not to exchanging one selected and one unselected feature.

Noise can manufacture apparent basins. Constraints can split feasible space into disconnected components. Penalties can create steep artificial cliffs. Decoders can map many genotypes to the same decision, producing large neutral plateaus. Therefore, “the objective is multimodal” should be supported by evidence such as multi-start local searches, sampled slices, or distinct solutions found repeatedly.

### A pre-search baseline ladder

Before launching an advanced method, build a ladder:

- a do-nothing or current-policy decision;
- random feasible sampling;
- a simple greedy construction;
- greedy plus local improvement;
- an exact or relaxed solution on a reduced instance;
- the proposed metaheuristic.

Suppose GA improves profit by 4% over current policy but a ten-line greedy-plus-swap algorithm improves by 3.9%. The extra complexity may not be worthwhile unless GA improves robustness or constraints meaningfully. Suppose PSO beats random search but loses to multi-start gradient descent on a smooth problem. That tells us the algorithm choice was weak, not that the experiment should be hidden.

### What “black box” should mean

A black-box evaluator can still have known inputs, units, failure states, monotonic relationships, and conservation checks. If increasing available budget ever reduces the best achievable value in a deterministic maximization model, investigate. If a simulated queue reports negative waiting time, reject the evaluation. If permuting identical facilities changes fitness, test symmetry handling.

Treat simulator warnings as data, not zero cost. Define timeout, crash, and infeasibility policies before the run. Log them. If the heuristic learns to exploit a simulator bug—perhaps placing a facility outside the map yields no congestion—it has optimized the code rather than the intended system.

### Decision checklist

A metaheuristic is defensible when the representation is meaningful, evaluation is consistent, constraints can be handled credibly, exact structure has been exhausted, and the required decision tolerates empirical rather than certified optimality. It is especially useful when several qualitatively different feasible solutions are valuable.

It is not defensible merely because the objective is called nonlinear, the paper needs an algorithm diagram, or a library makes it easy to call `GA()`. The first intellectual contribution remains the model. The algorithm is a search instrument whose accuracy must be measured.

Use an exact convex, dynamic-programming, or mixed-integer method when it fits. These methods provide optimality conditions or bounds. Metaheuristics become attractive when the model is nonconvex, discontinuous, simulation-based, mixed discrete-continuous, or too large for available exact methods.

Before selecting one, ask:

1. Can the nonlinear part be reformulated as LP, QP, SOCP, or MILP?
2. Can a reduced instance be solved exactly?
3. Is an objective evaluation deterministic or noisy?
4. Is feasibility easy to preserve?
5. Does the decision require a single best solution or a diverse set?

Calling a method “intelligent” does not excuse weak formulation. If the fitness rewards the wrong quantity, a powerful search finds a very good wrong answer.

## Representation

Representation determines which decisions the algorithm can express, how easily it creates valid candidates, and whether small algorithmic moves correspond to small real changes. It is therefore part of model design, not serialization.

### Genotype, decoder, and phenotype

It is useful to distinguish three layers. The **genotype** is what the search operator manipulates. A **decoder** translates it into a model decision. The **phenotype** is the actual schedule, route, allocation, or design evaluated by the objective. Several genotypes may decode to the same phenotype. A decoder may also repair an invalid genotype.

Consider assigning ten talks to ten conference slots. A direct integer vector of slot IDs permits duplicates. A permutation genotype guarantees each slot is used once. A random-key genotype stores ten real priorities and sorts them; every real vector decodes to a permutation. Direct permutation operators exploit route-like structure. Random keys allow continuous operators but create redundancy: many nearby priority vectors produce the same order.

Redundancy is not automatically harmful. Neutral changes can let search drift before discovering another phenotype. Too much redundancy wastes evaluations and distorts distance. Two real-key vectors can be far apart yet produce the same schedule, while a tiny crossing of two keys can swap talks abruptly.

### Binary decisions with dependencies

Suppose a city selects monitoring sensors. A bit string indicates installation, but some sensors require relay stations, and at least one sensor of each type is needed. Independent bit flips violate dependencies frequently. Options include:

- encode both sensors and relays, then repair missing support;
- encode sensors only and add required relays deterministically;
- organize genes into valid modules;
- use a feasibility-first comparison with explicit violation counts.

The second option reduces search dimension but fixes the relay rule. If multiple relay choices matter, deterministic completion may hide good alternatives. A decoder can solve a small set-cover subproblem for each sensor selection, combining heuristic outer search with exact inner optimization.

### Continuous allocations and conservation

For a budget allocation $x_j\ge0$ with $\sum_jx_j=B$, storing raw real values and normalizing them is simple:

$$x_j=B\frac{\max(0,z_j)}{\sum_k\max(0,z_k)}.$$

But if every $z_j$ is negative or zero, the denominator vanishes. More subtly, scaling all positive $z$ values by a constant leaves $x$ unchanged, creating redundancy. Softmax avoids nonpositive values but cannot represent exact zeros. Stick-breaking depends on variable order. Simplex projection preserves the closest point under Euclidean distance but changes mutation geometry.

Choose according to decisions. If exact zero means “do not fund,” use a mixed selection-allocation representation: binary activation plus continuous shares among active items. This introduces more variables but makes sparsity explicit.

### Permutations, adjacency, and sequence meaning

Routes care about adjacency, production schedules care about precedence and setup, rankings care about relative order. Position-wise similarity may be misleading. Tours $(1,2,3,4,5)$ and $(2,3,4,5,1)$ represent the same cycle but look different as vectors. Canonicalize cyclic routes by fixing one city first and perhaps choosing orientation. This prevents the population from spending diversity on equivalent rotations.

For vehicle routing with several vehicles, separators can divide one permutation into routes. Crossover may move separators and produce empty or overloaded vehicles. A giant-tour representation plus a split decoder finds route boundaries optimally or greedily. Again, the decoder is a substantial algorithm and belongs in the method description.

### Mixed decisions

Many competition models mix types. A renewable-energy design chooses sites (binary), capacities (continuous), construction order (permutation), and operating policy (parameters or rules). Forcing all of them into one flat real vector followed by rounding produces biased transitions. Separate operators can act on blocks:

1. crossover site-selection bits;
2. mutate continuous capacities conditional on selected sites;
3. repair total investment;
4. reorder construction with a permutation operator;
5. solve operating dispatch exactly for the resulting design.

This layered approach respects semantics. It also complicates attribution. An ablation can remove each operator to learn where improvement comes from.

### Repair as a policy with side effects

Suppose a crop chromosome assigns too much area on a plot. Proportional scaling preserves crop ratios but may push all crops below minimum manageable area. Removing the least profitable crop respects minimum areas but biases toward immediate profit and may break rotation. Repairing years in chronological order privileges earlier decisions. Repairing the largest violation first can create a different feasible plan.

Log repair statistics: fraction of candidates repaired, number of genes changed, objective before and after, and constraints triggering repair. If almost every child is extensively rewritten, search takes place mainly inside the repair heuristic. That may still work, but the contribution should be described honestly.

### Distance must match meaning

GA diversity and PSO neighborhoods rely on notions of similarity. Euclidean distance is appropriate only after scaling and only when coordinate difference reflects decision difference. For binary facility choices, Hamming or Jaccard distance may fit. For routes, edge overlap is often more relevant. For schedules, compare machine assignments, precedence inversions, or completion-time profiles.

Suppose two hospital plans open the same sites but allocate beds differently. A composite distance can combine Jaccard site distance with normalized capacity distance. Weights should reflect how changes influence feasibility and objective, not be selected solely to make a colorful plot.

### Symmetry and equivalent solutions

If three identical vehicles are labeled 1, 2, and 3, permuting those labels creates six encodings of one plan. Search wastes effort rediscovering equivalents. Canonicalize by ordering vehicles according to first customer or total load. In neural architecture or mixture models, hidden symmetry can be harder, but the same principle applies.

Symmetry affects reported diversity. A population of label permutations may appear diverse while containing one policy. Decode and canonicalize before counting unique decisions.

### Representation unit tests

Before optimization, test the representation independently:

1. Generate many random genotypes and measure feasible decoding rate.
2. Encode known valid decisions and verify round-trip decoding.
3. Apply every crossover and mutation to edge cases.
4. Confirm bounds, integrality, conservation, uniqueness, and precedence.
5. Measure repair distance and detect infinite repair loops.
6. Enumerate all genotypes for a tiny instance and check whether every feasible phenotype is reachable.
7. Verify that equivalent encodings receive equal objective values.

These tests are often more valuable than another thousand optimization iterations. An unreachable excellent policy cannot be found by any parameter setting.

An encoding maps algorithm state to a real decision. For a route, a chromosome may be a permutation. For crop allocation, it may contain areas, crop IDs, and seasons. For feature selection, it may be a bit string.

The representation should make common valid decisions easy to express and invalid ones hard to create. A naive vector of crop IDs may violate plot compatibility and rotation after nearly every crossover. A problem-aware encoding can assign only permitted crops and use a repair step for rolling rotation rules.

Suppose $n$ facilities must be assigned to $m$ locations. A length-$n$ integer vector permits duplicates unless repaired. A permutation encoding guarantees one-to-one assignment. The same crossover operator has entirely different meaning under the two encodings.

<div class="mm-question-box"><span class="mm-callout-label">Representation test</span><p>Pick two valid parent solutions and apply your proposed crossover by hand. Is the child still meaningful? If repair changes most genes, the variation operator is fighting the representation rather than exploring it.</p></div>

## Genetic Algorithms

The biological vocabulary makes GA memorable, but it can also make a weak explanation sound deeper than it is. Strip away the vocabulary and a genetic algorithm performs four operations: maintain several candidate decisions, prefer candidates with better evaluated performance, recombine parts of selected candidates, and introduce variation so the search does not merely copy what it already knows. The design question is not whether “survival of the fittest” sounds plausible. It is whether those four operations respect the structure of the decision problem.

### A knapsack example from question to chromosome

Imagine that a field team must pack equipment into a drone. Six items are available: thermal camera, spare battery, medical kit, radio repeater, water sampler, and compact shelter. Their masses are

$$w=(4,3,5,2,6,7),$$

and their mission values are

$$a=(9,7,12,6,13,14).$$

The drone can carry at most $15$ kilograms. A binary decision $x_j=1$ means item $j$ is packed. The model is

$$\max \sum_{j=1}^6 a_jx_j
\quad\text{subject to}\quad
\sum_{j=1}^6w_jx_j\le15,
\qquad x_j\in\{0,1\}.$$

This tiny instance does not need a GA; exhaustive enumeration has only $2^6=64$ candidates. That is precisely why it is a good unit test. If our GA behaves incorrectly here, we should not trust it on a chromosome with six hundred decisions.

The natural chromosome is the six-bit string $x_1x_2\cdots x_6$. Consider four candidates:

| chromosome | packed mass | value | feasible? |
|---|---:|---:|---|
| `110100` | $4+3+2=9$ | $9+7+6=22$ | yes |
| `101010` | $4+5+6=15$ | $9+12+13=34$ | yes |
| `011101` | $3+5+2+7=17$ | $7+12+6+14=39$ | no |
| `000011` | $6+7=13$ | $13+14=27$ | yes |

Already we face a choice: what fitness should the infeasible third chromosome receive? A fixed penalty might define

$$F(x)=\sum_j a_jx_j-\lambda\max\left(0,\sum_jw_jx_j-15\right).$$

With $\lambda=2$, the infeasible candidate scores $39-2(2)=35$ and outranks every feasible candidate. Selection may then fill the population with overweight bags. With $\lambda=20$, it scores $-1$; the search may learn almost nothing from a candidate that is only two kilograms overweight and otherwise valuable. The issue is not solved by saying “choose a large penalty.” We must ask how violations should be compared and whether repair is more meaningful.

A greedy repair removes selected items with the lowest value-to-mass ratio until capacity is satisfied. In `011101`, those ratios are $7/3$, $12/5$, $6/2$, and $14/7$. Removing the shelter, whose ratio is $2$, yields `011100` with mass $10$ and value $25$. An alternative repair removes the item whose deletion causes the smallest loss of value while restoring feasibility. That may produce another result. Repair embeds a local decision rule inside the GA, so two papers that both say “GA” can implement meaningfully different solvers.

<div class="mm-question-box"><span class="mm-callout-label">Pause before selection</span><p>Would you prefer a population containing many copies of `101010`, or a slightly worse but diverse set of feasible bags? Write one sentence before continuing. The answer determines whether selection should exploit the current best aggressively or preserve alternative building blocks.</p></div>

### Selection pressure is a measurable choice

Suppose a population has $N=100$ individuals and $10$ are currently high quality. A tournament of size $k$ includes at least one high-quality individual with probability

$$1-(1-0.1)^k.$$

For $k=2$, this is $0.19$; for $k=5$, it is about $0.410$; for $k=10$, about $0.651$. Larger tournaments amplify current rankings. That can be helpful when fitness is reliable and harmful when early differences are noisy or diversity is scarce.

Roulette-wheel selection assigns probability proportional to a transformed fitness. It is sensitive to offsets and scaling. If minimization costs are $101,102,103$, converting them to $1/f$ produces almost equal probabilities. Subtracting from $104$ produces weights $3,2,1$, a much stronger preference. Neither transformation is neutral. Rank selection avoids dependence on numerical scale: sort individuals, assign weights from ranks, and sample from those weights. But rank selection discards information about how much better the leader is.

Elitism copies the best $e$ candidates unchanged. With $e=1$, a good discovery cannot be lost to unlucky variation. With large $e$, much of the next population is frozen, effective population size shrinks, and convergence can become premature. In noisy objectives, an elite may simply be a lucky simulation. Re-evaluate or statistically compare noisy elites instead of immortalizing one observation.

### Crossover must match the representation

Take parents `101010` and `010101`. One-point crossover after the third bit yields `101101` and `010010`. Uniform crossover chooses each gene from either parent independently. Both operators preserve a binary string, but neither preserves the capacity constraint. That may be acceptable if repair is effective and violations remain moderate.

Now suppose a chromosome is a route visiting six cities exactly once: $(1,4,2,6,3,5)$. One-point crossover with another route can duplicate cities and omit others. Order crossover copies a segment from one parent and fills remaining positions in the order they appear in the other parent. Partially matched crossover constructs a mapping between exchanged segments. Edge recombination tries to preserve adjacency. These are not cosmetic variants. If route cost depends strongly on adjacent pairs, an operator that preserves useful edges is more aligned with the objective.

For continuous vectors, arithmetic or blend crossover can interpolate and sometimes extrapolate. Given $p_1=2$ and $p_2=8$, arithmetic crossover with $\alpha=0.3$ creates $3.8$ and $6.2$. Simulated binary crossover produces a distribution designed to mimic the spread of binary crossover in real space. The parameter controls whether children remain near parents or explore farther. Always state whether each random coefficient is shared across dimensions or sampled independently; correlated and coordinate-wise mixing create different geometry.

In a crop schedule, entire seasonal blocks may be the meaningful units. Crossing at arbitrary bits could separate a crop choice from its planted area or break rotation logic. A block crossover that exchanges complete plot-year schedules preserves more semantic structure. If repair subsequently changes most child genes, measure that repair distance. A median repair rate of 70% says the named crossover contributes little to the final child.

### Mutation is not an afterthought

Binary mutation flips a bit with probability $p_m$. For a length-$d$ chromosome, choosing $p_m=1/d$ gives an expected one flipped bit per child, but the actual number is binomial. The probability of no mutation is $(1-1/d)^d$, approaching $e^{-1}\approx0.368$. Thus “mutation probability $1/d$” does not mean every child receives one change.

Permutation mutation may swap two locations, insert one item elsewhere, reverse a segment, or scramble a segment. A 2-opt reversal has a particularly clear meaning for routes: it removes two edges and reconnects the path without crossing them. Gaussian mutation for real variables uses a step scale $\sigma_j$. Fixed tiny $\sigma$ cannot cross wide basins; fixed large $\sigma$ destroys late refinements. Self-adaptation encodes or updates step sizes, while success-based schedules enlarge or shrink them according to recent improvement. In bounded domains, truncated or reflected mutation avoids accumulating samples at clipped boundaries.

Mutation preserves reachability. If crossover can only recombine values already present, a missing allele or coordinate region can never reappear. But mutation alone does not guarantee practical exploration: a probability of reaching the missing region after $10^{30}$ evaluations is irrelevant to a two-hour contest.

### One generation, completely exposed

Return to the drone population. Suppose we use tournament size two, one elite, one-point crossover with probability $0.8$, bit mutation probability $1/6$, and feasibility-first comparison. The current best feasible chromosome is `101010` with value $34$, so it is copied as the elite.

Two tournaments select parents `110100` and `000011`. A crossover after the fourth bit produces `110111` and `000000`. The first child weighs $4+3+2+6+7=22$ and is infeasible; the second carries nothing. Suppose mutation flips the second bit of the first child and the fifth bit of the second, giving `100111` and `000010`. Repair of `100111` removes the shelter first, producing `100110`, mass $12$, value $28$. The second child has only the water sampler, value $13$.

This mating did not improve the elite. That is normal. GA progress is statistical, not guaranteed in every reproduction. The important audit trail records parents, crossover point, pre-mutation children, mutation positions, repair actions, and final fitness for a tiny test. Once these operations are verified, production runs need only aggregate diagnostics.

Suppose instead we had compared candidates by the weak $\lambda=2$ penalty. The overweight `110111` has raw value $49$, violation $7$, and penalized score $35$, exceeding the best feasible $34$. It could become elite even though the drone cannot fly. This one arithmetic line explains why feasibility handling is not a secondary coding detail.

### Epistasis and deceptive building blocks

In a separable objective, each gene contributes independently. In many models, contributions depend on combinations. Opening a warehouse is useful only if routes connect to it; selecting one sensor is valuable only if another sensor resolves ambiguity; planting a high-profit crop today changes rotation options next year. This interaction is called epistasis.

Consider four binary genes with reward $10$ when all four equal one, reward $6$ when all equal zero, and reward equal to the number of zeros otherwise. Local feedback favors zeros, yet the global optimum is `1111`. A GA with strong selection may converge to `0000` because partial progress toward `1111` looks worse. More evaluations do not necessarily solve deception after the population loses ones. Diversity preservation, linkage-aware crossover, island populations, or problem-specific blocks may help.

Measure pairwise linkage when domain knowledge suggests it. If decisions $x_3$ and $x_4$ form a logical unit, keep them adjacent or cross them as a block. But do not overdesign the chromosome from imagined relationships. Use ablation: compare ordinary crossover, block crossover, and mutation-only search under equal budgets.

### Vivid case: scheduling a night food festival

A city food festival has thirty vendors, eight electrical zones, six time windows, and three performance stages. Each vendor requests a preferred location and time, draws a known electrical load, belongs to a cuisine category, and expects demand that depends on nearby performances. The organizer wants strong attendance and variety while avoiding overloaded circuits, excessive queues, and clusters of nearly identical vendors.

A chromosome can be a sequence of vendor IDs followed by a decoder. The decoder visits vendors in priority order and assigns each to the best feasible remaining slot. This random-key approach lets crossover manipulate priorities while the decoder enforces one assignment per vendor. Alternatively, encode each vendor's slot directly and repair duplicates and overloads. The first representation guarantees feasibility more easily; the second exposes direct location choices but generates more invalid offspring.

One objective could be

$$f(x)=-R(x)+\alpha O(x)+\beta Q(x)+\gamma H(x),$$

where $R$ is predicted revenue, $O$ is circuit overload, $Q$ is queue congestion, and $H$ penalizes local cuisine homogeneity. Treating circuit capacity as a soft penalty may be physically unacceptable; a hard decoder should block overload. Queue estimates might come from a simulation, making fitness noisy. Revenue forecasts may be uncertain, motivating scenario-average or robust evaluation.

A vivid example clarifies crossover. Parent A places dessert vendors after the evening concert and savory vendors near lunch. Parent B separates high-power fryers across circuits. A problem-aware child should inherit temporal demand alignment from A and electrical separation from B. Uniformly exchanging arbitrary slot numbers may inherit neither. A two-level crossover can exchange whole time-block policies first and then reorder vendors inside blocks.

To validate the GA, solve a reduced festival with ten vendors exactly as a MILP. On the full event, compare against the organizer's current rule, a greedy revenue rule with feasibility repair, and random feasible schedules. Evaluate thirty seeds using the same number of simulation calls. Report not only mean objective but overload count, maximum predicted queue, category diversity, and worst-case scenario revenue. Finally, let an organizer inspect the schedules. A numeric score cannot reveal that two supposedly different locations share the same narrow entrance unless that geometry entered the model.

### Population diversity and premature convergence

For binary strings, average pairwise Hamming distance is

$$D_H=\frac{2}{N(N-1)d}\sum_{i<j}\sum_{k=1}^d\mathbf 1(x_{ik}\ne x_{jk}).$$

For real vectors, normalize coordinates and use pairwise Euclidean distance or coordinate variances. For permutations, edge diversity may matter more than position-wise distance. Diversity should reflect the structures that affect performance.

If best fitness improves while diversity declines gradually, the population may be exploiting successfully. If diversity collapses in five generations and the best remains far from an exact bound or baseline, selection is likely too strong or variation poorly matched. Responses include smaller tournaments, fewer elites, higher or adaptive mutation, fitness sharing, crowding, islands with occasional migration, and restarting a fraction of the population. Each response has a cost. Excessive diversity turns directed search back into random sampling.

An island model maintains subpopulations with infrequent migration. Different islands can use different operators or parameters. Migration every generation makes islands nearly one population; never migrating wastes discoveries. Track whether migrants actually survive and improve a destination. The word “parallel” is not itself evidence of better search.

### Stopping and what convergence means

Stop by objective-evaluation budget when comparing algorithms, because population sizes and per-generation work differ. Additional criteria may include no meaningful improvement for $K$ evaluations, target quality, elapsed time, or diversity below a threshold. Never stop solely because the best curve looks flat. A flat curve could reflect convergence, poor variation, an infeasible population, insufficient numerical precision, or a logging error.

A GA cannot ordinarily certify global optimality. It can provide a best observed feasible solution and an empirical distribution across runs. On reduced instances, compare with proven optima. On larger mixed-integer models, compare with solver bounds when available. If a solver proves a lower bound $L$ for minimization and GA finds $U$, the relative gap $(U-L)/\max(1,|U|)$ is evidence that a convergence plot cannot replace.

The right conclusion is therefore conditional: under this encoding, repair, operator set, parameter protocol, and evaluation budget, the algorithm repeatedly found feasible solutions of stated quality. That sentence is less dramatic than “evolution found the global optimum,” but it is scientifically useful.

Let population $P^g=\{x_1^g,\ldots,x_N^g\}$ at generation $g$. For minimization fitness can be rank-based or transformed from $f(x)$; using $1/f$ fails when values are zero or negative.

Tournament selection samples $k$ candidates and keeps the best. If the fraction of high-quality individuals is $p$, the probability that a tournament contains at least one is

$$1-(1-p)^k.$$

Larger $k$ raises selection pressure and can destroy diversity. Elitism copies a few best individuals to the next generation, protecting good solutions but further increasing pressure.

For real vectors, arithmetic crossover may use

$$c_1=\alpha p_1+(1-\alpha)p_2,\qquad c_2=(1-\alpha)p_1+\alpha p_2.$$

Gaussian mutation uses $x_j' = x_j+\sigma_j\epsilon$, $\epsilon\sim N(0,1)$. For permutations, use order crossover and swap or inversion mutation; arithmetic crossover would not preserve a route.

A basic generation is:

1. evaluate and rank;
2. preserve elites;
3. select parents;
4. crossover with probability $p_c$;
5. mutate with probability $p_m$;
6. repair or reject infeasible offspring;
7. form the next population.

Record best, median, interquartile range, feasibility rate, and diversity. A flat best curve can mean convergence, premature collapse, or an inactive operator.

## Differential Evolution

Differential evolution is often introduced as “another evolutionary algorithm,” after which a paper lists $F=0.5$ and $CR=0.9$ and moves on. That misses its most interesting idea. DE uses differences between current population members to manufacture a search direction and a scale. When the population is spread out, difference vectors are long and trial moves are exploratory. When the population contracts, the same rule automatically produces finer moves. The population is not only a set of candidate solutions; it is also an empirical ruler for the landscape.

### One DE/rand/1/bin trial by hand

Assume a two-dimensional minimization problem with target vector

$$x_i=(3,5).$$

Three distinct donor indices provide

$$x_{r_1}=(1,4),\qquad x_{r_2}=(6,2),\qquad x_{r_3}=(2,3).$$

With $F=0.5$, the difference mutation is

$$v_i=x_{r_1}+F(x_{r_2}-x_{r_3})
=(1,4)+0.5(4,-1)=(3,3.5).$$

Now perform binomial crossover. Let $CR=0.7$, sampled values be $(0.82,0.31)$, and forced coordinate $j_{\mathrm{rand}}=1$. Coordinate one comes from the mutant despite $0.82>0.7$ because it is forced; coordinate two comes from the mutant because $0.31\le0.7$. Thus $u_i=(3,3.5)$. If $j_{\mathrm{rand}}$ had been coordinate two and the random values unchanged, the trial would have been $(3,3.5)$ here as well because the target and mutant share the first coordinate. In another example, the forced coordinate prevents a trial identical to its target when all random values exceed $CR$.

Evaluate both candidates under exactly the same fitness and feasibility rule. For

$$f(x_1,x_2)=(x_1-2)^2+(x_2-1)^2,$$

the target has $f(3,5)=17$, while the trial has $f(3,3.5)=7.25$, so greedy selection keeps the trial. Notice that DE does not accept a worse trial in its basic form. Exploration comes from the population difference, not from accepting uphill moves as SA does.

<div class="mm-question-box"><span class="mm-callout-label">Check the direction</span><p>Replace $F=0.5$ by $F=1.2$ and recompute the mutant. Does it leave plausible bounds? Would clipping, reflection, or resampling preserve the meaning of the move best? Decide before reading parameter folklore.</p></div>

### Mutation strategies describe different beliefs

The notation `DE/base/number/crossover` should be reported. In `DE/rand/1/bin`, the base is random, one difference vector is used, and crossover is binomial. Other strategies include

$$\text{DE/best/1:}\quad v_i=x_{\mathrm{best}}+F(x_{r_1}-x_{r_2}),$$

$$\text{DE/current-to-best/1:}\quad
v_i=x_i+F(x_{\mathrm{best}}-x_i)+F(x_{r_1}-x_{r_2}),$$

and

$$\text{DE/rand/2:}\quad
v_i=x_{r_1}+F(x_{r_2}-x_{r_3})+F(x_{r_4}-x_{r_5}).$$

Using the best member as base exploits aggressively but can drag everyone into one basin. A random base preserves broader sampling. Current-to-best blends directed attraction with a diversity term. Two differences can create richer directions but require a larger population and may overshoot. Exponential crossover copies a consecutive block of coordinates, which matters when adjacent variables form linked groups. Binomial crossover treats coordinates independently unless the implementation uses a shared random draw.

These choices should match model structure. In a calibrated differential-equation model, neighboring parameters may interact strongly; covariance-aware or rotated variation may help. In a simple box-constrained continuous problem, ordinary binomial crossover may be sufficient. Test strategies under equal evaluation budgets instead of selecting the most elaborate name.

### Scaling factor, crossover rate, and population size

The scaling factor $F$ controls differential amplification. Small $F$ creates conservative steps; large $F$ explores farther and violates bounds more often. Because the raw difference already reflects population spread, the same $F$ behaves differently early and late. Adaptive variants such as jDE encode $F_i$ and $CR_i$ for each individual and occasionally resample them. Success-history methods learn parameter distributions from successful trials. These methods can reduce manual tuning, but they add state and hyperparameters that must be reported.

The crossover rate $CR$ determines how many mutant coordinates enter the trial. In $d$ dimensions with independent binomial crossover, roughly $CR\,d$ coordinates plus the forced-coordinate effect come from the mutant. For nearly separable objectives, low $CR$ can change a few coordinates at a time. For strongly coupled variables, low $CR$ may break a good differential direction by retaining too much of the target.

Population size $N$ determines how many distinct difference directions are available. `rand/2` needs at least five donor indices distinct from the target. A population barely above that limit recycles similar differences and loses geometric variety. Very large populations spend many evaluations per generation and may make few adaptive rounds under a fixed budget. Report both $N$ and total evaluations; “500 generations” is not comparable between $N=20$ and $N=200$.

### Worked case: calibrating an epidemic model

Suppose daily infection observations $y_t$ are modeled by an SIR system with transmission rate $\beta$, recovery rate $\gamma$, initial infected count $I_0$, and an observation scale $\rho$. Numerical integration maps parameters $\theta=(\beta,\gamma,I_0,\rho)$ to predictions $\widehat y_t(\theta)$. A robust loss might be

$$f(\theta)=\sum_{t=1}^T
\rho_H\left(\frac{y_t-\widehat y_t(\theta)}{s_t}\right),$$

where $\rho_H$ is Huber loss and $s_t$ reflects count scale. Gradients through an adaptive ODE solver can be inconvenient, and the surface may contain ridges because several parameter combinations produce similar early growth. DE is a plausible search tool—but only after identifiability and units are considered.

Normalize parameters to $z_j\in[0,1]$ before mutation. Otherwise a difference of $10$ in $I_0$ and a difference of $0.1$ in $\beta$ have unrelated meanings, and one common $F$ does not balance them. Decode by

$$\theta_j=L_j+z_j(U_j-L_j).$$

Choose biologically justified bounds, not a box selected to make the algorithm convenient. Initialize with a space-filling design. Evaluate each candidate using the same integration tolerances and failure handling. If integration fails, do not return `NaN`; return a documented infeasibility status or penalty.

Now imagine two population members differ mainly in $\beta$ and $\gamma$ but share a similar ratio $\beta/\gamma$. Their difference vector may move along an epidemiologically meaningful ridge. This is the adaptive appeal of DE. Yet a good data fit does not establish parameter truth. Plot profile likelihood or posterior uncertainty, fit on an early window and validate on a later window, and compare trajectories rather than only final loss.

A vivid report would show three fits: best loss, a nearly equivalent parameter set from another basin, and a deliberately simple baseline. If two parameter vectors fit equally but imply different intervention responses, the decision is underidentified. The optimizer did its job; the data-model relationship did not support one answer.

### Equality constraints and parameterization

Suppose resource shares satisfy $x_j\ge0$ and $\sum_jx_j=1$. Ordinary DE mutation leaves this simplex almost every time. Penalties force the population to search a thin surface inside a box, which is inefficient. One option is projection onto the simplex. Another is a softmax parameterization

$$x_j=\frac{e^{z_j}}{\sum_k e^{z_k}},$$

and DE searches unconstrained or bounded $z$. Softmax cannot produce an exact zero at finite $z$, so it may be unsuitable when sparsity is important. A stick-breaking parameterization has different asymmetry. Projection changes the trial direction, and heavy projection may erase DE's intended geometry. Measure the distance moved by repair or projection.

For ordered thresholds $0\le t_1\le t_2\le\cdots\le t_m\le1$, encode positive increments and normalize cumulative sums. For conservation laws, eliminate one variable algebraically where possible. A strong representation turns “constraint handling” into a property rather than a recurring emergency.

### Stagnation, collapse, and restarts

DE stagnates when population differences become too small, when all useful directions are rejected, or when a boundary rule creates many duplicates. Track coordinate standard deviations, unique individuals, trial success rate, and best improvement. A trial success rate near zero with broad diversity suggests steps are too large or crossover mismatched. Near-zero diversity suggests collapse. High success with microscopic improvement suggests steps are too small.

Possible responses include increasing $F$, drawing $F$ from a distribution, adding archive differences, restarting poor individuals, or switching mutation strategy. An external archive of replaced individuals can provide directions no longer present in the current population. Restarting only after a documented trigger is more reproducible than “we restarted when the curve looked bad.” Preserve the best feasible solution across restarts.

### DE as a local-global hybrid

Once DE finds a promising continuous point, a gradient-based local solver may refine it efficiently. This is not cheating; it is a memetic or hybrid strategy. Budget the local calls explicitly. If every trial launches a long local optimization, most computation occurs in the local solver and comparison with plain DE is misleading.

Conversely, a convex relaxation or exact reduced model can seed DE. For mixed discrete-continuous decisions, a decoder may solve a small LP for continuous recourse after DE proposes discrete or strategic parameters. The resulting fitness evaluation is expensive but meaningful: the heuristic searches high-level structure while an exact subproblem optimizes operational details.

### What to validate

For a low-dimensional test, draw the objective surface and overlay population trajectories. For a reduced discrete version, obtain an exact optimum. For calibration, use held-out data and residual diagnostics. Across all cases, run multiple seeds and report distribution rather than one winner.

Compare DE/rand/1 with random search, a local solver from multiple starts, and at least one structural baseline. If DE wins only because its bounds exclude difficult regions or because competitors receive fewer evaluations, the comparison is not fair. Save every final vector, not just its objective, so constraints and practical interpretability can be audited later.

DE is designed for real-valued vectors. In DE/rand/1, choose distinct indices $r_1,r_2,r_3$ and form

$$v_i=x_{r_1}+F(x_{r_2}-x_{r_3}),$$

where $F>0$ scales the difference. Binomial crossover creates trial vector

$$u_{ij}=\begin{cases}v_{ij},&r_{ij}\le CR\text{ or }j=j_{\mathrm{rand}},\\x_{ij},&\text{otherwise}.
\end{cases}$$

The forced coordinate $j_{\mathrm{rand}}$ ensures $u_i\ne x_i$. Greedy selection keeps $u_i$ if it is no worse than $x_i$.

The difference vector adapts step scale to population spread. Early diverse populations create large moves; later concentrated populations refine locally. Too small $F$ stalls; too large $F$ produces boundary violations. “Best/1” variants converge faster but can collapse around a poor basin. Report the variant, not only “DE.”

For bounds, clipping piles candidates on boundaries. Reflection or resampling usually preserves better search behavior. For equality constraints, a parameterization that satisfies them is preferable to a large penalty.

## Particle Swarm Optimization

Let us begin with a scene that is easy to picture but worth interpreting carefully. A group of friends reaches an unfamiliar ski resort just after fresh snow. None of them has a complete map of the mountain. One skier follows a promising ridge, another discovers that the western slope is crowded, and a third finds a quiet run with good snow. If every skier ignores the others, the group wastes information. If everyone immediately follows the first person who reports a good run, the group may crowd into a merely acceptable valley and never discover the best one. Useful collective search sits between those extremes: keep some momentum, remember what worked personally, and listen to information from others without surrendering all independence.

That story is only an intuition. PSO becomes an algorithm only after we state exactly what a particle represents, how information is stored, how a position changes, and how invalid positions are treated. A particle is not literally a bird or a skier. It is a candidate decision vector. For a two-variable design, for example,

$$x_i^t=(x_{i1}^t,x_{i2}^t)$$

might encode the number of buses placed on two routes, the two coordinates of an emergency depot, or two control gains. Its objective value $f(x_i^t)$ tells us how good that candidate is. The particle also carries a velocity $v_i^t$, which is a proposed displacement rather than a physical speed. Its personal best $p_i$ is the best position that particle has visited. The social best $g_i$ is the best position reported by the particle's communication neighborhood. In global-best PSO, every particle uses the same $g$; in a local topology, different particles may follow different neighborhood leaders.

Particle $i$ has position $x_i^t$, velocity $v_i^t$, personal best $p_i$, and neighborhood or global best $g$. The standard update is

$$v_i^{t+1}=\omega v_i^t+c_1r_1(p_i-x_i^t)+c_2r_2(g-x_i^t),$$

$$x_i^{t+1}=x_i^t+v_i^{t+1},$$

with independent $r_1,r_2\sim U(0,1)$. The inertia $\omega$ preserves motion, $c_1$ supplies personal memory, and $c_2$ supplies social attraction.

It helps to read this equation as three proposals being added together:

$$\underbrace{\omega v_i^t}_{\text{continue}}+
\underbrace{c_1r_1(p_i-x_i^t)}_{\text{return to personal evidence}}+
\underbrace{c_2r_2(g_i-x_i^t)}_{\text{learn from neighbors}}.$$

The first term says, “continue in roughly the direction you were already exploring.” The second says, “you once saw something better over there.” The third says, “someone you communicate with has found something better elsewhere.” The random numbers do not make the method magical. They keep all particles from following identical deterministic trajectories and allow the relative strengths of personal and social information to vary at every coordinate and iteration.

### A complete two-dimensional update by hand

Before using a library, calculate one update. Suppose we minimize a landscape and one particle currently has

$$x_i^t=(4,1),\qquad v_i^t=(-0.5,0.8).$$

Its personal best is $p_i=(2,2)$, while the best point shared by its neighborhood is $g_i=(1,3)$. Choose $\omega=0.6$, $c_1=1.4$, $c_2=1.8$, and suppose the sampled random coefficients for this update are $r_1=0.5$ and $r_2=0.25$. In an implementation these are normally independent vectors; using scalars here keeps the arithmetic visible.

The inertial contribution is

$$0.6(-0.5,0.8)=(-0.30,0.48).$$

The personal-memory displacement is $p_i-x_i=(-2,1)$, so its contribution is

$$1.4(0.5)(-2,1)=(-1.40,0.70).$$

The social displacement is $g_i-x_i=(-3,2)$, giving

$$1.8(0.25)(-3,2)=(-1.35,0.90).$$

Therefore

$$v_i^{t+1}=(-0.30,0.48)+(-1.40,0.70)+(-1.35,0.90)=(-3.05,2.08),$$

and

$$x_i^{t+1}=(4,1)+(-3.05,2.08)=(0.95,3.08).$$

The new position lies close to the neighborhood best but is not equal to it. That distinction matters. PSO does not simply copy the best candidate. Momentum can carry a particle through a promising region, and personal memory can pull it away from a misleading social leader. We now evaluate $f(0.95,3.08)$. Only after evaluating it may we update the memories:

$$p_i\leftarrow x_i^{t+1}\quad\text{if}\quad f(x_i^{t+1})<f(p_i),$$

and the relevant neighborhood best changes only if the new personal best beats the current social record. Mixing this order up is a common implementation error. Updating $g$ from an unevaluated point, or comparing a penalized value with an unpenalized value, silently changes the algorithm.

<div class="mm-question-box"><span class="mm-callout-label">Stop and predict</span><p>Keep every value above fixed, but increase inertia from $0.6$ to $1.2$. Before calculating, decide whether the particle will move closer to or farther past the social best. Then do the arithmetic. This one-line experiment makes the word “momentum” concrete.</p></div>

### From a sketch to a working swarm

A dependable global-best PSO loop is short enough to write on one page:

```text
initialize positions x_i inside the feasible bounds
initialize velocities v_i on a scale compatible with those bounds
evaluate every particle
p_i = x_i for every particle
g = the best feasible p_i

repeat until the evaluation budget is exhausted:
    for every particle i:
        sample fresh random vectors r_1 and r_2
        update v_i
        limit or transform v_i if necessary
        update x_i
        enforce bounds and model constraints
        evaluate the repaired x_i
        update p_i if x_i improves the personal record
    update g from all personal records
    record objective, feasibility, diversity, and evaluations
```

This pseudocode hides three decisions that determine the quality of a real implementation. First, positions must be initialized across the meaningful domain. If all particles begin in one tiny corner, PSO is not being given a fair chance to explore. Latin hypercube or low-discrepancy initialization can cover a continuous box more evenly than a small independent uniform sample. Second, initial velocities must share the scale of each coordinate. A velocity of $10$ is tiny for a variable spanning $[0,10^6]$ and catastrophic for a proportion spanning $[0,1]$. Normalize variables or use coordinate-specific velocity limits. Third, memory must refer to comparable fitness values. If a penalty coefficient changes during the run, an old personal best evaluated under the earlier penalty cannot be compared naively with a new point.

### What the parameters actually change

Parameter advice such as “use $\omega=0.7$ and $c_1=c_2=2$” is a starting point, not a law. The behavior follows from competing feedback loops.

If $\omega$ is near zero, the particle forgets its direction almost immediately. It jumps toward remembered points and can make fast local corrections, but exploration becomes hesitant. If $\omega$ is large, trajectories persist and cross valleys, yet they may oscillate or leave the domain repeatedly. A common schedule begins with larger inertia and decreases it,

$$\omega_t=\omega_{\max}-
\frac{t}{T}(\omega_{\max}-\omega_{\min}),$$

where $T$ is the iteration budget. This changes exploration gradually, but it is not automatically better: when the swarm discovers a new basin late, very small final inertia may prevent it from exploring that basin.

The coefficient $c_1$ controls confidence in personal history. A large $c_1$ produces particles that keep revisiting their own discoveries. This maintains several local hypotheses but can prevent agreement. The coefficient $c_2$ controls social confidence. A large $c_2$ spreads good news rapidly but also spreads bad news rapidly: if the current global best is a lucky noisy observation or a narrow local optimum, the whole population may collapse around it.

One can use the constriction form

$$v_i^{t+1}=\chi\left[v_i^t+c_1r_1(p_i-x_i^t)+c_2r_2(g_i-x_i^t)\right],$$

with $\phi=c_1+c_2>4$ and

$$\chi=\frac{2}{\left|2-\phi-\sqrt{\phi^2-4\phi}\right|}.$$

The factor $\chi$ damps trajectories under the assumptions used in the stability analysis. It does not guarantee that a finite swarm finds the global optimum of a constrained, discontinuous competition model. Its value is more modest and useful: it links parameter choice to a dynamical-system argument instead of pure folklore.

### Why a particle may oscillate

To expose the dynamics, consider one coordinate, replace the random values by their means $1/2$, and suppose the personal and social best have already agreed at $g$. Let $e_t=x_t-g$ and $\varphi=(c_1+c_2)/2$. Then

$$v_{t+1}=\omega v_t-\varphi e_t,$$

$$e_{t+1}=e_t+v_{t+1}=(1-\varphi)e_t+\omega v_t.$$

Since $v_t=e_t-e_{t-1}$,

$$e_{t+1}=(1+\omega-\varphi)e_t-\omega e_{t-1}.$$

The characteristic equation is

$$\lambda^2-(1+\omega-\varphi)\lambda+\omega=0.$$

If the roots have magnitude below one, the simplified expected trajectory decays toward $g$; complex roots generate damped oscillation. Roots outside the unit circle signal divergence. This calculation does not capture changing bests or random coefficients, but it explains why parameter combinations influence stability. The visually appealing spiral that particles draw around a best point is a second-order recurrence, not evidence that the algorithm “understands” the landscape.

### Global communication versus neighborhood communication

In global-best PSO, one discovery can influence every particle in the next update. This is efficient on a smooth, unimodal function. On a multimodal landscape it may be too efficient. Imagine four valleys. One particle happens to find an adequate point in the first valley during initialization. Everyone hears the news, moves toward it, and soon the swarm becomes too concentrated to inspect the other three.

A ring topology lets particle $i$ communicate only with nearby particle indices, such as $i-1$, $i$, and $i+1$. Information spreads over several iterations. Separate neighborhoods can explore different basins, so the method is less likely to collapse immediately. Grid, von Neumann, random, and adaptive topologies make different trade-offs between information speed and diversity. The appropriate comparison is not “which topology is famous?” but “does the chosen topology preserve enough independent search under this evaluation budget?”

Measure that independence. For normalized positions $z_i$, a simple swarm-spread statistic is

$$D_t=\frac{1}{N}\sum_{i=1}^N\|z_i^t-\bar z^t\|_2,
\qquad \bar z^t=\frac{1}{N}\sum_i z_i^t.$$

If $D_t$ approaches zero while the best objective remains poor relative to a baseline or lower bound, the swarm has probably converged prematurely. Responses include local neighborhoods, random immigrants, partial reinitialization, repulsion, mutation, or a hybrid local search. Simply running the same collapsed swarm for ten times as many iterations rarely restores lost diversity.

### Boundary handling is part of the algorithm

Suppose a coordinate is limited to $[L_j,U_j]$ and an update produces $x_{ij}>U_j$. Several popular responses have different biases:

- **Clipping:** set $x_{ij}=U_j$. It is simple but piles particles on the wall.
- **Reflection:** set $x_{ij}=U_j-(x_{ij}-U_j)$ and reverse or damp the velocity. It resembles a bounce but needs repeated reflection for very large overshoots.
- **Random reset:** sample the coordinate again inside the interval. It restores diversity but destroys local information.
- **Absorption:** place the particle on the boundary and set that velocity coordinate to zero. It can be appropriate when a physical actuator saturates.
- **Periodic wrapping:** enter from the opposite side. This is sensible only when the domain itself is periodic.

Now notice the modeling consequence. If a solution often hits the upper bound, that might mean the true optimum lies beyond an artificially narrow bound. A beautiful convergence curve at the boundary is not reassurance; it is a prompt to justify the domain.

General constraints need stronger treatment. For a simplex constraint $x_j\ge0$ and $\sum_jx_j=B$, project a proposed point onto the simplex or represent $x$ by normalized nonnegative weights. For a scheduling permutation, continuous coordinates followed by rounding can create duplicate assignments. A random-key representation—sort real priorities to produce a permutation—preserves a valid order while allowing continuous PSO updates. For logical dependencies, a decoder can transform priorities into a feasible schedule, but the decoder then becomes part of the model and must be described.

### Worked case: a ski resort that should not maximize lift speed

Consider a resort with one chairlift and two linked slopes. The owner can choose lift speed $s$ in meters per second and the fraction $q$ of arriving skiers directed to the steeper slope. A naive objective maximizes lift throughput. That would send skiers uphill as quickly as mechanically possible. But the mountain has two coupled capacities: the lift transports people into the skiing region, while the slopes and rest areas hold people for a period of time. Faster uphill delivery can create dense trails, longer restaurant queues, more collision risk, and a worse experience. The commercially meaningful decision is not “make the chair fast”; it is “choose an operating point that balances admissions, experience, safety, energy, and repeat visits.”

Let lift throughput be

$$Q_L(s)=\eta\,n_c\,s/d,$$

where $n_c$ is seats per chair, $d$ is chair spacing, and $\eta$ is a loading-efficiency factor. Let the average time spent in the downhill system depend on route allocation,

$$\tau(q)=q\tau_1+(1-q)\tau_2.$$

By Little's law, an approximate on-slope population is $N_S=Q_L(s)\tau(q)$. Let comfortable slope capacity be $K(q)$, reflecting the different areas and safe densities of the two runs. One stylized daily profit objective is

$$\Pi(s,q)=pA(s,q)-c_Es^3-c_WQ_L(s)-c_R\left[\max(0,N_S-K(q))\right]^2,$$

where admissions $A$ may initially rise with transport capacity but fall when predicted crowding harms repeat demand. The cubic energy term is illustrative; actual lift power should be estimated from engineering data. The squared crowding penalty represents rapidly worsening experience beyond capacity.

This surface can be nonconvex once waiting-time, demand-response, weather, and discrete safety rules are included. A particle uses $x_i=(s_i,q_i)$. Set justified bounds, perhaps $s\in[1.5,5]$ and $q\in[0.2,0.8]$, based on equipment and route policies. Initialize particles across this rectangle, simulate the day, and minimize $-\Pi$ subject to queue and safety limits.

Take one particle at $(s,q)=(4.6,0.65)$. It earns high lift revenue but violates the comfortable population limit by 18%. Its personal best is $(3.8,0.55)$; the neighborhood reports $(3.4,0.48)$. The social term does not say “slower is always better.” It says that, under the current model and evidence, another tested balance was better. If a cold weekday has few arrivals, the best $s$ may rise because crowding is inactive. If a holiday brings many beginners, lower speed and different route allocation may dominate. The model should reveal those regimes rather than repeat a slogan.

Validation requires more than PSO output. First, plot profit, maximum queue, slope density, and energy separately along a grid of $s$ values for several $q$ values. In two dimensions a grid is affordable and tells us whether PSO missed an obvious region. Second, compare with operational policies: maximum speed, current policy, and a conservative low-speed policy. Third, perturb arrival forecasts, descent time, willingness-to-return, and the crowding threshold. If the recommended speed jumps from $4.2$ to $1.6$ under a 2% demand change, management needs a robust policy or a threshold rule, not one fragile number. Fourth, inspect the physical claim. A slower lift can increase the ratio between the mountain's in-system holding capacity and lift throughput, but if it creates an intolerable base queue or reduces admissions, it is not automatically better for the owner.

This example shows why a vivid story must still end in measurable quantities. The skier analogy introduces shared information. The resort model then separates throughput from system capacity. The PSO experiment proposes a decision, while baselines and sensitivity analysis decide whether that proposal deserves trust.

### Discrete and binary PSO

Before leaving the continuous case, consider a second application where PSO's social-sharing mechanism has an operational meaning: releasing water from a reservoir over seven days. Let $r_t$ be release on day $t$. Storage evolves by

$$S_{t+1}=S_t+I_t-r_t-e_t,$$

with inflow $I_t$, evaporation $e_t$, storage bounds, release bounds, environmental minimum flow, and a desired terminal storage. Electricity value varies by hour or day, while flood risk penalizes high storage and downstream demand penalizes shortage.

A particle position is the seven-dimensional release vector. This direct encoding is easy to read but usually violates storage constraints because feasibility depends on cumulative releases. One decoder walks forward through time. At day $t$, it clips the proposed release to the range consistent with current storage, minimum flow, turbine limit, and enough remaining water to meet essential future flow. At the end, it adjusts releases to approach terminal storage. This chronological decoder gives each coordinate the same meaning across particles, so differences and social movement remain interpretable.

One objective might be

$$f(r)=-\sum_{t=1}^7 p_t\eta r_tH(S_t)
+\lambda_F\sum_t\max(0,S_t-S_F)^2
+\lambda_D\sum_t\max(0,d_t-r_t)^2
+\lambda_T(S_8-S_{\mathrm{target}})^2.$$

Hydropower head $H(S_t)$ makes revenue nonlinear. Notice that every $r_t$ affects later storage and therefore later head, feasibility, and revenue. This is a coupled landscape; optimizing each day greedily can drain water before a high-price period or leave insufficient flood buffer.

Suppose one particle releases too much on days one and two. Its decoder clips day three to environmental minimum because storage is low. Its personal best preserved more water early. Another particle found a strong policy that releases during day five's high price but keeps flood buffer before a predicted storm. The cognitive term pulls toward the particle's own balanced history; the social term transfers the timing pattern discovered elsewhere. The position update alone does not understand the reservoir. Meaning comes from consistent coordinates and the storage decoder.

Use normalized release fractions rather than raw cubic meters when daily capacities differ greatly. If a day has maximum release $R_t^{\max}$, encode $z_t\in[0,1]$ and set the proposed release to $z_tR_t^{\max}$ before chronological repair. Velocity limits then have comparable scale across days.

To validate, solve a linearized deterministic version by LP or dynamic programming. Compare PSO to a rule curve, a greedy price policy, and multi-start local optimization. Run forecast scenarios for inflow. A policy with excellent nominal revenue but frequent minimum-flow violation under forecast error is not acceptable. If operations can adapt after observing inflow, an open-loop seven-day vector is the wrong decision object; optimize a feedback rule or receding-horizon policy instead.

This case teaches a subtle limit. PSO is often applied to time series of controls, but a static particle does not automatically model information arrival. Decisions for day seven should not use an inflow realization unknown on day one. Scenario trees or parameterized policies are needed to prevent anticipative solutions. Algorithm sophistication cannot repair a time-information error.

### PSO implementation details that change results

Several choices often disappear behind a library call.

**Random coefficients.** The textbook equation may display scalar $r_1,r_2$, but implementations commonly draw separate values for every particle, coordinate, and iteration. One scalar per particle creates correlated motion across dimensions; one scalar for the whole swarm synchronizes it even more. State the choice.

**Synchronous versus asynchronous updates.** In synchronous PSO, all particles use the social best from the previous iteration, then memories update after the batch. In asynchronous PSO, a newly improved best can influence later particles in the same iteration. Asynchronous updates spread information faster and depend on evaluation order; parallel execution may make order nondeterministic.

**Velocity initialization.** Zero velocity makes the first movement depend entirely on memories; since personal best equals initial position, only social pull acts. Random velocity permits independent first moves but can cause boundary violations. Sample from a fraction of each coordinate range and report it.

**Velocity clamping.** With $|v_{ij}|\le V_j^{\max}$, clipping limits motion. Too small a clamp prevents exploration; too large makes it irrelevant. Relate $V_j^{\max}$ to normalized range. Clamping changes dynamics and is not interchangeable with constriction.

**Best ties.** On plateaus, should an equal objective replace personal best? Replacing may allow memory drift; retaining preserves first discovery. With multiple objectives or secondary feasibility metrics, define tie-breaking explicitly.

**NaN and failures.** A failed simulation must not become a best because of comparison quirks. Represent it as invalid, log input, and decide whether to repair or assign worst rank.

**Early stopping.** Stopping after no best improvement can terminate a still-diverse swarm exploring alternate basins. Combine improvement with diversity and budget. Always retain a hard evaluation cap.

### A controlled PSO ablation

On the reservoir model, compare global and ring topology, fixed and decreasing inertia, clipping and reflection, with all else fixed. For each configuration, use the same thirty initial populations and inflow scenarios. Primary response is held-out risk-adjusted value; secondary responses are feasible-run rate, terminal-storage residual, and diversity.

Imagine global topology improves quickly in the first 2,000 evaluations but plateaus. Ring topology lags initially and later finds better policies in 24 of 30 pairs. Decreasing inertia helps global topology but not ring topology. Reflection yields fewer duplicate boundary particles than clipping. These observations support a mechanism: slower information spread preserves timing alternatives, while boundary treatment maintains release diversity.

Do not conclude that ring PSO is universally superior. Conclude that, on this coupled multimodal control model under the stated budget, it produced better held-out policies and diversity evidence was consistent with the proposed explanation.

### Interpreting particle motion visually

For two variables, animate trajectories over contours. For seven releases, use parallel coordinates, heatmaps of particle schedules, and principal-component projections. Always accompany a projection with decision-space metrics because separated high-dimensional particles can overlap in two dimensions.

A useful reservoir heatmap has particles as rows and days as columns, colored by normalized release. Sort rows by objective. Early generations may show varied timing; later successful policies may share a release band before the storm and another at peak price. That pattern is more informative than decorative moving dots.

Plot personal-best age: iterations since each $p_i$ improved. If most ages are enormous, particles are moving without learning or are trapped. Plot leader contribution: how many particles use each neighborhood best. In a ring topology, several leaders should coexist early. Plot boundary-hit rate by coordinate; frequent hits on day five may reveal a meaningful maximum or a too-narrow bound.

### A practical PSO checklist

Before trusting a result, answer:

1. What real decision does every coordinate represent?
2. Are variables scaled before velocity updates?
3. Are random coefficients scalar or coordinate-wise?
4. Is update synchronous or asynchronous?
5. Which topology defines social information?
6. How are velocities initialized and limited?
7. What happens at bounds and general constraints?
8. How are noisy leaders confirmed?
9. Which decision-space diversity metric is monitored?
10. Which exact, greedy, or current-policy baselines are used?
11. How many independent seeds and evaluations are run?
12. Is the final decoded decision independently verified?

If a paper supplies only $c_1$, $c_2$, and $\omega$, it has described three numbers, not a reproducible PSO.

Suppose instead that the resort chooses which of twelve runs to open after a storm. Each decision $x_j\in\{0,1\}$ trades grooming cost against terrain coverage and connectivity. The continuous position equation no longer has a literal meaning. In binary PSO, velocity is often treated as a latent score and mapped through a sigmoid,

$$S(v_{ij})=\frac{1}{1+e^{-v_{ij}}},\qquad
x_{ij}^{t+1}=\mathbf 1\{u_{ij}<S(v_{ij}^{t+1})\},$$

with $u_{ij}\sim U(0,1)$. A larger positive velocity makes bit one more likely. This is a different stochastic process, not continuous PSO plus a harmless rounding operation. Connectivity constraints still need a decoder, repair, or penalty. If runs 2 and 7 cannot be opened unless connecting run 4 is open, independent bit sampling will produce invalid mountain plans frequently.

For a vehicle route, one may define velocity as a list of swaps. The “difference” between two routes is then a sequence of permutation operations, and adding velocity means applying some of those swaps. Again, the algebra is problem-specific. A paper that writes the continuous PSO equation and later reports a discrete schedule without explaining this bridge leaves out the core algorithm.

### Noisy objectives and false global bests

When one evaluation is a simulation, observed fitness may be

$$\widehat f(x)=f(x)+\varepsilon,$$

where $\varepsilon$ is Monte Carlo noise. The lowest observed value may belong to an ordinary point that received a lucky negative error. Global-best PSO amplifies that accident immediately. Useful safeguards include common random numbers, repeated evaluation of promising candidates, confidence-aware comparison, or resampling the incumbent best before broadcasting it.

Suppose particle A has estimated cost $100$ from one simulation and particle B has $102$, but the standard deviation per run is $15$. Declaring A the social leader is weak evidence. Ten replications might yield means $108$ and $103$. A racing procedure allocates more replications only where rankings remain uncertain. Report both the optimization budget and the simulation replications; otherwise the nominal particle count hides most of the computation.

### How to diagnose a PSO run

A useful diagnostic panel contains at least five curves:

1. best feasible objective against objective evaluations;
2. median particle objective;
3. feasibility rate;
4. normalized swarm diversity $D_t$;
5. distance from the current best to a baseline or known lower bound.

Interpret them together. Best value flat, median improving, and diversity positive may mean the swarm is still organizing around a good basin. Best and median flat with diversity near zero suggests collapse. Best improving while feasibility rate falls may mean the penalty rewards nearly feasible but unusable points. A sawtooth best-so-far curve indicates a logging bug because best-so-far cannot worsen. A raw current-best curve may worsen under a local topology, but then it must not be labeled best-so-far.

Run multiple seeds. A concise table reports best, median, interquartile range, worst, feasible-run rate, and evaluation budget. Visualize the final solutions in decision space, not only objective space. Twenty runs with similar objective but radically different policies can reveal alternate optima or an underidentified model. For a manager, that family of policies may be more valuable than one supposed champion.

### When PSO is the wrong choice

PSO is a poor default when an LP, convex QP, SOCP, shortest-path algorithm, dynamic program, or well-scaled MILP solves the model with certificates. It is also uncomfortable in very high dimensions when most coordinates barely affect fitness; social attraction then moves through a huge irrelevant space. Strong equality constraints can reduce the feasible set to a thin manifold that ordinary velocity updates almost never hit. Expensive simulations may make a surrogate or Bayesian-optimization strategy more sample-efficient.

Use PSO when the representation is defensible, evaluation is affordable, gradient information is unavailable or unreliable, and comparison experiments demonstrate value. The attractive moving dots in an animation are not the result. The result is a feasible decision whose performance survives independent recalculation and reasonable perturbation.

If $\omega$ and accelerations are too large, particles oscillate or explode. If social attraction dominates, the swarm collapses early. Velocity clamping is a numerical safeguard, not a proof of convergence. Ring neighborhoods spread information more slowly than a global topology and often preserve diversity.

For discrete problems, “velocity” needs a new meaning—perhaps a probability of selecting a bit or a sequence of swaps. Merely rounding continuous positions can create bias and destroy feasibility.

## Simulated Annealing

Imagine arranging forty booths for a night market. You swap two booths and the estimated walking congestion becomes slightly worse. A greedy local search immediately rejects that swap. Yet the temporary change may make a second swap possible that opens a much better layout. If every worsening move is forbidden, the search can become trapped in a layout where no single swap helps even though several coordinated swaps would help greatly.

Simulated annealing gives controlled permission to move uphill. The metallurgy analogy is specific: a hot material explores many microscopic configurations; slow cooling allows it to settle toward low-energy crystalline states, while rapid quenching can freeze defects. In optimization, objective value plays the role of energy, a neighborhood proposal perturbs the current state, and temperature controls willingness to accept deterioration. The analogy does not choose a neighborhood or cooling schedule for us. Those remain modeling decisions.

### The Metropolis decision with numbers

Suppose we minimize congestion cost. The current layout has cost $f(x)=120$, and a proposed swap has cost $f(x')=124$, so $\Delta=4$. At temperature $T=10$,

$$P(\text{accept})=e^{-4/10}\approx0.6703.$$

Draw $u\sim U(0,1)$. If $u=0.42$, accept the worse move; if $u=0.91$, reject it. At $T=1$, the probability drops to $e^{-4}\approx0.0183$. The same deterioration that is ordinary early becomes unlikely late.

For an improvement, say $\Delta=-7$, accept with probability one. For equal cost, the usual rule accepts because $e^0=1$; moving across plateaus can help discover new exits. In code, avoid computing an exponential for improvements:

```text
delta = objective(candidate) - objective(current)
if delta <= 0:
    accept
else if uniform(0,1) < exp(-delta / temperature):
    accept
```

Use the current state in this comparison, not the best-ever state. The current state may worsen; the best-ever record should never worsen. Confusing them destroys the Markov-chain interpretation and often makes the implementation greedier than intended.

### Calibrating initial temperature from observed moves

“Start at temperature 100” is meaningless until objective scale is known. Sample feasible neighbor moves from representative states and collect their positive deteriorations $\Delta_+$. If a typical deterioration is the median $m_+$ and we want to accept such moves initially with probability $p_0$, choose

$$T_0=-\frac{m_+}{\log p_0}.$$

If $m_+=12$ and $p_0=0.8$, then $T_0\approx53.8$. A move with deterioration $12$ is accepted about 80% of the time; a deterioration $60$ only about 33% of the time. This distinction is useful: high initial temperature should not mean that every catastrophic move is accepted almost surely.

Empirically verify the initial acceptance rate over several hundred proposals. If it is 2%, the search begins nearly frozen. If it is 99.9%, early computation resembles an unguided random walk. When objective penalties dominate the scale, temperature calibration may reveal a deeper issue: one unit of feasibility violation overwhelms all meaningful objective differences.

### Cooling is a budget allocation rule

Geometric cooling sets

$$T_{k+1}=\alpha T_k,$$

where a temperature level contains several neighbor proposals. If $T_0=100$, $\alpha=0.95$, and there are $100$ levels, the final temperature is approximately $0.592$. With $\alpha=0.8$, it is about $2.0\times10^{-8}$, effectively frozen long before the end. The number of proposals per level matters as much as $\alpha$.

Linear cooling subtracts a constant but can reach zero abruptly. Logarithmic cooling decreases extremely slowly and appears in asymptotic convergence theorems under conditions that competition models rarely verify. Adaptive cooling reacts to recent acceptance or improvement. Reheating raises temperature when progress stalls, but repeated arbitrary reheating can turn a reproducible algorithm into manual curve chasing.

One interpretable control target is acceptance rate. Early, a moderate fraction of uphill proposals should pass; later, that fraction should decline. Plot acceptance rate by temperature level. If it is zero from the beginning, recalibrate. If it stays near one at the end, the system never focuses.

### Neighborhoods define the reachable world

For a traveling route, useful neighborhoods include:

- **swap:** exchange two cities;
- **insertion:** remove one city and insert it elsewhere;
- **2-opt:** reverse the segment between two cut edges;
- **3-opt:** reconnect after cutting three edges.

A swap changes local positions but may disrupt four edges. An insertion is good for moving one misplaced stop. A 2-opt move efficiently removes crossing edges in Euclidean tours. Larger neighborhoods create more possibilities but cost more to evaluate. Variable-neighborhood SA mixes them, perhaps preferring local 2-opt moves and occasionally proposing a broader perturbation.

For binary feature selection, flip one bit, swap one selected with one unselected, or flip a small block. Single-bit flips connect the entire hypercube, but reaching another good subset may require passing through many poor intermediate models. Swap moves preserve subset size. If size is constrained exactly, bit flips generate infeasibility whereas selected-unselected swaps preserve it.

For job-shop scheduling, swapping arbitrary jobs may violate precedence. Operate on a representation with a feasible decoder or select moves known to preserve precedence. For continuous design, Gaussian perturbation needs a temperature-dependent or adaptive scale. If step size stays huge while temperature becomes tiny, nearly all proposals are rejected. If step size shrinks too quickly, the search cannot escape even when temperature permits it.

<div class="mm-question-box"><span class="mm-callout-label">Neighborhood challenge</span><p>A school assigns exactly five of twenty projects to a showcase, with at most two projects from any department. Which move preserves the number selected? Which additional repair or feasibility check handles department caps? Answering this is more important than selecting a fashionable cooling rate.</p></div>

### Worked route example with incremental evaluation

Suppose the current tour is

$$A\to B\to C\to D\to E\to A.$$

A 2-opt move cuts edges $(B,C)$ and $(D,E)$ and reconnects $(B,D)$ and $(C,E)$, reversing the segment between $C$ and $D$. The objective change is

$$\Delta=d(B,D)+d(C,E)-d(B,C)-d(D,E).$$

There is no need to recompute the full tour length. If old edges total $13$ and new edges total $16$, then $\Delta=3$. At $T=5$, accept with probability $e^{-0.6}\approx0.549$. At $T=0.5$, accept with probability $e^{-6}\approx0.00248$.

Incremental evaluation matters in large models. For a schedule, a local swap may affect only two machines and a short time interval. Recomputing the entire simulation is safer initially; after correctness tests pass, cache unaffected components. A fast wrong delta calculation can guide millions of moves in the wrong direction, so compare incremental and full objective values on random moves as a unit test.

### Worked case: emergency supply staging

After a coastal storm, a city must stage limited water, medical supplies, generators, and crews at candidate depots. Roads may fail under several scenarios. A decision includes which depots open and how much inventory each holds. A simulation estimates unmet demand and response delay. Fixed opening decisions are binary, inventory is integer or continuous, and the expected-risk objective is nonconvex because route failures change reachable regions.

Represent a state by an opening bit vector $y$ and integer inventory matrix $q$. A neighbor can open or close one depot, transfer one inventory unit between depots, or swap depot status while redistributing stock. Feasibility requires budget, storage, and total inventory constraints. A repair first rescales stock to available totals, then removes items from over-capacity depots and sends them to the nearest depot with space. The order of repair matters and should be deterministic or seeded.

Use a risk-sensitive objective

$$f(y,q)=c^\top y+h^\top q+
\frac{1}{S}\sum_{s=1}^S L_s(y,q)
+\lambda\operatorname{CVaR}_{0.9}(L_s),$$

where $L_s$ measures shortage and delay in scenario $s$. If two candidate states are evaluated with different randomly drawn storm scenarios, objective noise can dominate $\Delta$. Use a fixed scenario set during one comparison or common random numbers. Later, validate the best plans on a fresh larger scenario set.

Start from a feasible greedy plan that covers high-population districts, not only a random state. Include additional starts to avoid anchoring conclusions to the greedy policy. Calibrate $T_0$ from sampled feasible moves. At each temperature, mix local inventory transfers with occasional depot-status moves; otherwise the chain may refine quantities without changing network structure.

Compare SA with the greedy start itself, repeated random feasible sampling, and a reduced MILP with fewer scenarios. Report best-ever objective and current objective separately. A healthy early run shows the current cost wandering while best-ever improves in steps. Later, wandering narrows. If every seed returns the initial greedy plan, either it is genuinely strong or the neighborhood and temperature never allowed departure; acceptance and move-type diagnostics distinguish those explanations.

### Detailed balance and what theory does—and does not—say

At fixed temperature, if proposal probabilities are symmetric, accepting with

$$a(x,x')=\min\left(1,e^{-[f(x')-f(x)]/T}\right)$$

produces a Markov chain with stationary distribution

$$\pi_T(x)=\frac{e^{-f(x)/T}}{Z_T},$$

where $Z_T$ normalizes over states. Detailed balance follows because

$$\pi_T(x)q(x,x')a(x,x')
=\pi_T(x')q(x',x)a(x',x)$$

for symmetric $q$. If proposals are asymmetric, the Metropolis-Hastings ratio must include $q(x',x)/q(x,x')$. Many heuristic implementations ignore this because they seek good points rather than exact sampling. That is acceptable if global-convergence theory is not claimed.

As $T\to0$, the stationary distribution concentrates on global minima. But a practical algorithm changes temperature before reaching stationarity at each level and stops after finite time. Logarithmically slow schedules can support theoretical convergence on finite state spaces under irreducibility, yet are usually too slow. The honest result remains empirical: SA found certain feasible solutions under a documented budget.

### Plateaus, barriers, and landscape reasoning

Two local optima may have nearly equal values but differ in the height of the barrier between them. SA's ability to cross depends on the maximum temporary deterioration required, not merely the final difference. If escaping a basin requires a sequence whose worst point is $30$ units higher, a temperature calibrated for $\Delta=2$ moves will almost never escape.

This suggests a diagnostic. Starting from a local solution, sample broader perturbations and inspect their deteriorations and eventual local-refinement outcomes. If useful basin changes require enormous barriers, use a richer neighborhood, restart, parallel tempering, or a population method. Increasing $T$ blindly may accept so many destructive moves that local structure disappears.

Parallel tempering maintains chains at several temperatures and occasionally swaps their states. Hot chains cross barriers; cold chains refine. Replica-exchange acceptance depends on both temperatures and energies. This can be powerful, but it also multiplies evaluations. Under equal budget, several independent ordinary SA runs may be competitive.

### Continuous simulated annealing

For $x\in\mathbb R^d$, propose

$$x'=x+\sigma_T Lz,\qquad z\sim N(0,I),$$

where $L$ encodes coordinate scale or correlation. If $\sigma_T$ decreases with temperature, proposals become more local. Normalize variables first so one proposal scale is meaningful. When the feasible domain is bounded, reflection avoids mass at clipped walls. For nonlinear constraints, project or parameterize, then account for how that transformation biases proposals if theoretical sampling claims matter.

Suppose fitting a camera requires angles measured in radians, translation in meters, and focal length in pixels. Isotropic raw perturbations are nonsensical. Scale by plausible uncertainty or transform to normalized coordinates. Better still, use a local covariance estimated from successful moves, while regularizing it to prevent singularity.

### Common implementation failures

Several bugs create plausible-looking output:

1. **Wrong sign:** using $e^{\Delta/T}$ for minimization accepts worse moves with probability above one.
2. **Integer division:** computing temperature with integer arithmetic can reach zero early.
3. **Best/current confusion:** proposing from best-ever instead of current turns SA into a perturbed greedy search.
4. **Unseeded randomness:** results cannot be reproduced.
5. **Incomparable penalties:** changing penalty weights without re-evaluating stored states invalidates comparisons.
6. **Disconnected moves:** some feasible schedules cannot be reached from others.
7. **Objective cache errors:** incremental changes omit affected terms.
8. **Temperature underflow:** evaluating $e^{-\Delta/T}$ at tiny $T$ can underflow; compare $\log u<-\Delta/T$ instead.

Unit tests should force one improving move, one equal move, one worsening move with a fixed random number, one boundary move, and one known delta update. A statistical test can check that repeated acceptance of fixed $\Delta$ and $T$ approximates $e^{-\Delta/T}$.

### Designing a fair SA experiment

Give each method the same number of expensive objective evaluations. Count rejected proposals because they still required evaluation. Run multiple seeds. Report best, median, quartiles, worst, feasibility, runtime, and evaluation count. Show sensitivity to $T_0$, cooling rate, neighborhood mix, and proposals per level.

Do not tune schedules on the final test instance and then present that instance as independent evidence. Use representative training instances or nested experimentation. If only one competition problem exists, disclose tuning and emphasize robustness across perturbations or reduced variants.

Finally, inspect the decision. In emergency staging, two plans with similar loss may distribute risk very differently among districts. Present scenario-level shortages and equity metrics. Optimization selects according to the objective supplied; it does not notice an omitted fairness concern.

### When SA is preferable

SA is attractive when a meaningful local move exists, one solution fits in memory, incremental evaluation is cheap, and local minima block greedy search. It is particularly natural for permutations, layouts, and schedules. It is less attractive when useful information is population-wide, when evaluations are extremely expensive, or when exact structure offers stronger methods.

The most useful mental picture is not molten metal. It is a disciplined negotiation between curiosity and commitment. Early in the run, the algorithm pays a controlled price to investigate routes that initially look worse. Late in the run, it demands stronger evidence before moving away from a good state. The temperature schedule expresses how rapidly that standard tightens.

SA maintains one state. A proposed neighbor with objective change $\Delta=f(x')-f(x)$ is always accepted when $\Delta\le0$. A worse move is accepted with probability

$$P(\text{accept})=e^{-\Delta/T}.$$

At high temperature $T$, uphill moves are common and escape local minima. As $T$ falls, the search becomes selective. The rule corresponds to a Boltzmann distribution $\pi_T(x)\propto e^{-f(x)/T}$; the acceptance ratio ensures detailed balance for symmetric proposals.

If typical uphill changes near initialization have magnitude $\bar\Delta$ and desired initial acceptance is $p_0$, choose

$$T_0=-\frac{\bar\Delta}{\log p_0}.$$

Geometric cooling uses $T_{k+1}=\alpha T_k$, often with $\alpha$ near but below one. Theoretical logarithmic cooling can guarantee global convergence under restrictive conditions but is usually impractically slow. Report the practical schedule and empirical stability honestly.

Neighborhood design determines what can be reached. For a route, use swap, insertion, or 2-opt moves. If moves cannot connect the feasible solution space, no cooling schedule can find every region.

## Constraints and Penalties

In a contest paper, a solution that violates one essential rule is not “almost optimal.” A bus schedule that leaves a route uncovered, a diet below minimum nutrition, or a bridge design beyond stress limits may be unusable. Heuristics make feasibility difficult because their variation operators do not automatically respect model logic. Constraint handling therefore deserves the same space as the search equation.

### Classify constraints before choosing a remedy

Separate simple bounds, algebraic equalities, algebraic inequalities, combinatorial rules, temporal logic, simulation failures, and preferences. Bounds can often be enforced by the representation. Conservation equalities may permit variable elimination or projection. Combinatorial rules may need a decoder. Preferences might belong in objectives rather than hard constraints. Simulation failure needs an explicit status, not an arbitrary numeric value that could accidentally look attractive.

Also distinguish **hard** constraints from **soft** targets. A legal emission limit is hard. A desired staffing level might be violated at a documented cost. Calling every target a hard constraint can make the feasible region empty. Calling safety a soft penalty can produce dangerous recommendations.

### Penalty scaling with a numerical example

Suppose a design minimizes cost $f(x)$ around $1{,}000$, with capacity violation $v_1$ in kilograms and service violation $v_2$ in minutes. Writing

$$\Phi=f+\lambda(v_1+v_2)$$

adds quantities with unrelated units. A one-kilogram violation is treated like one minute only by accident. Normalize using meaningful scales:

$$\Phi(x)=\frac{f(x)}{f_{\mathrm{ref}}}
+\lambda_1\left(\frac{v_1(x)}{s_1}\right)^p
+\lambda_2\left(\frac{v_2(x)}{s_2}\right)^p.$$

Here $s_1$ might be allowable measurement tolerance and $s_2$ a service threshold. If no hard violation is acceptable, feasibility-first ranking is clearer than searching for penalty weights that somehow express infinity.

Static penalties remain constant. Dynamic penalties increase over time, allowing early exploration outside feasibility and tightening later. Adaptive penalties respond to feasible-population rate. These can work, but stored fitness values must be recomputed whenever weights change. Otherwise an old personal best or elite evaluated under a weak penalty is compared with a new candidate under a strong one.

An exact penalty can recover a constrained optimum under mathematical conditions and sufficiently large coefficients, but generic nonlinear black boxes rarely let us verify those conditions. “Large” also creates poor numerical scaling. Use theory when it applies; do not borrow its vocabulary without assumptions.

### Feasibility-first comparison

Deb's rule compares two candidates by:

1. if one is feasible and the other is not, keep the feasible one;
2. if both are feasible, keep the better objective;
3. if neither is feasible, keep the one with smaller aggregate violation.

This removes a penalty trade-off between feasibility and objective. It still requires a meaningful aggregate violation. Normalize each constraint and consider priority. Two minor violations should not necessarily outrank one violation of a critical safety rule. A lexicographic hierarchy can compare safety first, legal rules second, operational constraints third, and objective last.

Feasibility-first search can struggle when the feasible region is tiny and initial population contains no valid candidate. In that case, violation gradients, repair, constructive initialization, or staged constraints help guide search. Plot the best violation as well as feasible objective.

### Projection versus repair versus decoder

Projection finds a nearby point in a set, such as

$$\Pi_C(z)=\arg\min_{x\in C}\|x-z\|_2.$$

For boxes and simplexes it is efficient. For nonconvex combinatorial sets, projection may be as hard as the original problem and may have several nearest points. Projection favors geometric closeness, which may not preserve domain meaning.

Repair follows domain logic. A nurse schedule violating rest periods may move the least-disruptive shift. A crop plan violating rotation may replace a repeated crop with the best compatible alternative. Repair can produce useful feasible candidates but creates bias. Report it and test it alone as a heuristic baseline.

A decoder constructs a feasible phenotype from priorities or partial decisions. In bin packing, sort items by evolved priority and place each by best-fit. In project scheduling, choose the next eligible activity according to evolved priorities while respecting precedence and resources. This guarantees feasibility if the constructor always succeeds. Search then optimizes ordering preferences rather than raw schedules.

### A worked constraint case: mobile clinic routing

A mobile clinic selects villages and a daily route. It has eight service hours, medicine capacity, and a requirement that at least one remote village be served. A permutation route alone does not decide which villages are included. Add a cutoff gene or selection bits, then decode selected villages in route order.

Travel plus service time must not exceed eight hours. A naive repair repeatedly removes the village with largest added travel. That can delete the only remote village, so the coverage rule must be checked. A better repair protects mandatory categories, then removes the least benefit per saved minute among removable stops. If still infeasible, the candidate receives explicit violation.

Now consider mutation. Inserting a village may violate time but improve coverage. If every infeasible insertion is rejected immediately, remote combinations may be unreachable. A repair-aware mutation can replace one current stop with the inserted stop, or SA can temporarily accept a controlled time violation if feasibility is restored later. The correct choice depends on whether intermediate infeasibility is meaningful inside the representation.

Validate on a small village set by enumeration. Confirm the decoder reaches every important feasible route class. Compare heuristic service benefit with an orienteering MILP bound. Report which villages are consistently excluded; an objective maximizing total patients may systematically neglect distant small communities. This is an objective-design issue, not a search failure.

### Multiobjective optimization without hiding weights

Many models have genuinely competing goals. A logistics plan may minimize cost, emissions, and maximum delay. Weighted sum

$$\min_x\ w_1f_1(x)+w_2f_2(x)+w_3f_3(x)$$

requires normalized objectives and justified weights. It can recover supported Pareto points in convex problems but can miss nonconvex portions of the frontier. Reporting one arbitrary weight vector hides trade-offs.

A solution $x$ dominates $y$ if it is no worse in every objective and better in at least one. The Pareto set contains nondominated decisions. NSGA-II sorts candidates into nondomination fronts. Within a front, crowding distance favors points in sparse objective regions, helping retain a spread.

Work through a small example with cost and delay. Candidate A is $(100,20)$, B $(110,15)$, C $(130,18)$, D $(105,25)$, where both objectives are minimized. A dominates D because it is cheaper and faster. B dominates C because it is cheaper and faster. A and B do not dominate each other. The first front is A and B; C and D lie behind it. This logic is independent of units, though later decision-making still needs preferences.

Hypervolume measures objective space dominated by an approximation relative to a reference point. It rewards convergence and spread but depends on scaling and reference choice. Generational distance needs a reference frontier often unavailable. Spacing metrics capture distribution but not whether the set is good. Show the actual Pareto plot and representative decisions.

### From Pareto frontier to one recommendation

Optimization does not eliminate policy judgment. After generating alternatives, identify knees where small improvement in one objective requires large sacrifice in another. Stress-test several points. A low-cost fragile plan may lose to a slightly more expensive robust plan under uncertain demand.

Avoid choosing the frontier point closest to an “ideal” without explaining normalization and distance. An ideal objective vector may be unattainable. Stakeholder weights can be elicited through pairwise trade-offs or acceptable thresholds. The paper should separate generation of efficient alternatives from selection of a final policy.

### Chance constraints and scenario feasibility

If a constraint must hold with probability at least $1-\epsilon$,

$$\Pr\{g(x,\xi)\le0\}\ge1-\epsilon,$$

a sample approximation evaluates scenarios. Declaring a candidate feasible when at least $(1-\epsilon)S$ of $S$ scenarios pass introduces sampling uncertainty. With $S=20$, one scenario changes the estimated rate by five percentage points. Larger validation samples and confidence intervals are necessary.

Use one training scenario set during optimization to keep comparisons stable, then an independent validation set. Otherwise a heuristic can overfit particular scenarios just as a predictive model overfits data. Tail scenarios deserve deliberate inclusion when rare failures matter.

### Constraint audit table

For every final candidate, produce a table with constraint name, left-hand side, bound, residual, unit, and tolerance. Equality residual is $|h_k(x)|$; inequality residual can be reported as slack $-g_j(x)$ under $g_j(x)\le0$. Recalculate independently from decoded decisions, not from cached fitness. This table often catches indexing and unit errors hidden by summary scores.

Report tolerances. Floating-point output $10.0000003$ under a limit $10$ may be acceptable at solver tolerance and unacceptable for a physical package count. Round discrete decisions before auditing, then recompute all quantities. Never present a rounded table whose objective and constraints correspond to unrounded values.

A penalty fitness

$$\Phi(x)=f(x)+\lambda\sum_j\max(0,g_j(x))^p+\mu\sum_k|h_k(x)|^p$$

is easy but sensitive to scales. Too small a penalty favors invalid solutions; too large a penalty makes the feasible boundary numerically steep.

Alternatives include:

- feasibility-preserving encodings;
- repair operators;
- rejection or resampling;
- projection onto a feasible set;
- Deb's rule: feasible beats infeasible; among feasible compare objective; among infeasible compare total violation;
- stochastic ranking, which sometimes compares objective and sometimes violation.

Always calculate feasibility rate. If 99.9% of candidates are invalid and heavily repaired, the reported population size exaggerates the effective search.

For multiple objectives, NSGA-II uses nondominated sorting and crowding distance. It seeks a diverse Pareto approximation rather than collapsing objectives into one score. Evaluate both convergence toward a reference frontier and diversity across it.

## DEGA Crop-Planning Case

This case is useful because it refuses to fit neatly into one algorithm slogan. Decisions span plots, crops, seasons, and years. Land types allow different crop sets. Rotation couples one year to the next. Demand caps change revenue. Minimum planting areas create discrete logic. Uncertain yields and prices change which plan is attractive. A good solution is not a vector of “best crops”; it is a coherent multi-year policy.

### Read the decision before reading the algorithm

Let $i$ index plots, $j$ crops, $t$ years, and $s$ seasons. Continuous area $x_{ijts}$ records how much of plot $i$ is assigned to crop $j$ in year $t$, season $s$. Binary $z_{ijts}$ indicates whether that combination is used. The link

$$m_{ij}z_{ijts}\le x_{ijts}\le A_i z_{ijts}$$

enforces minimum manageable area $m_{ij}$ and plot capacity $A_i$. Without the binary variable, a solver or heuristic may scatter tiny areas of many crops across a plot, producing an operationally absurd plan.

Compatibility can be represented by parameter $a_{ijs}\in\{0,1\}$:

$$z_{ijts}\le a_{ijs}.$$

Area conservation is

$$\sum_jx_{ijts}\le A_i.$$

If a crop occupies both seasons or a greenhouse supports multiple cycles, the index logic changes. This is why a chromosome copied from a generic allocation problem is insufficient.

### Revenue requires explicit sales logic

Let yield per area be $q_{ijts}$ and production

$$Q_{jts}=\sum_iq_{ijts}x_{ijts}.$$

If demand cap is $D_{jts}$ and excess is wasted, full-price sales satisfy

$$0\le y_{jts}\le Q_{jts},\qquad y_{jts}\le D_{jts}.$$

Maximizing positive revenue sets $y=\min(Q,D)$. If excess sells at discount ratio $\delta_j$, add surplus variable $u=Q-y$ and revenue

$$R_{jts}=p_{jts}y_{jts}+\delta_jp_{jts}u_{jts}.$$

Using $pQ$ regardless of demand systematically rewards overproduction. A heuristic will exploit that error very effectively. It may produce a smooth convergence curve toward a fictitious profit.

### Rotation and legumes as temporal logic

No consecutive planting of crop $j$ on plot $i$ can be approximated by

$$z_{ijts}+z_{ij,t+1,s'}\le1$$

for linked seasons, but actual land rules may connect the second season of one year to the first of the next. Define one chronological sequence per plot before writing adjacency constraints.

If at least one legume must appear in every rolling three-year window and $\mathcal L$ is the legume set,

$$\sum_{\tau=t}^{t+2}\sum_s\sum_{j\in\mathcal L}z_{ij\tau s}\ge1.$$

This is not equivalent to “plant legumes three times over seven years.” Rolling windows matter. A decoder should repair chronologically: inspect every window, insert a compatible legume where its opportunity cost is smallest, then repair displaced crops and area. One insertion can fix several overlapping windows.

### A miniature exact instance

Before trusting DEGA, construct two plots, three crops, two years, one season. Plot capacities are $A=(4,3)$. Crop 1 is a legume; crops 2 and 3 cannot repeat consecutively. Demand and profit per area are small integers. Enumerate or solve the MILP. This gives a known optimum and exposes four components separately:

1. the chromosome can represent the optimal crop sequence;
2. the decoder returns correct areas;
3. revenue respects demand;
4. rotation repair does not destroy a better feasible plan.

Suppose the exact optimum is profit $86$. If DEGA repeatedly returns $83$, inspect which decision differs. Perhaps minimum area prevents a fractional combination. Perhaps repair always inserts legumes on plot 1 even though plot 2 is cheaper. The gap is diagnostic information, not embarrassment.

### A representation for crop schedules

One option stores real preference scores $r_{ijts}$ and area weights $w_{ijts}$. For each plot-season, the decoder removes incompatible crops, ranks the remainder by $r$, activates a limited number, assigns area by normalized positive $w$, then enforces minimum areas. It next repairs chronological rotation and legume windows.

Another option directly stores crop IDs and areas. Variation is easier to explain but produces duplicate or incompatible assignments. A hierarchical chromosome stores crop sequences as discrete blocks and area shares as continuous blocks. Apply DE to continuous shares and GA operators to crop schedules—the motivation behind a DEGA hybrid.

The decoder must define what happens when repairs conflict. If adding a legume exceeds plot area, which crop loses area? If removing a repeated crop creates an empty season, which alternative enters? If demand cap makes the replacement unprofitable, is fallow allowed? Deterministic tie-breaking improves reproducibility; randomized repair needs its own seed.

### Difference mutation on area vectors

For a fixed decoded crop structure, continuous area vector $a$ can use

$$v=a_{r_1}+F(a_{r_2}-a_{r_3}).$$

The result may contain negative areas and violate plot sums. Project each plot-season block onto its capacity simplex, respecting active crops and minimum areas. But projection can push an active crop below its minimum. One remedy removes undersized crops and reprojects. This creates discontinuities; record how often it occurs.

Difference directions are most meaningful when vectors share semantics. If coordinate 12 represents tomatoes in one chromosome and beans in another because crop IDs move, subtracting them is meaningless. Separate discrete structure from aligned continuous coordinates or decode onto a fixed crop-indexed tensor.

### Selection and feasibility hierarchy

Compare candidates first on hard compatibility and chronological rules. Among feasible plans, compare expected profit or risk-adjusted objective. Among infeasible plans, use normalized violation counts: incompatible area, capacity excess, minimum-area shortfall, repeat-cropping count, and missing-legume windows. Give safety or explicit problem rules priority over profit.

If repair guarantees feasibility, also retain repair cost as diagnostic. Two genotypes may decode to the same feasible plan after extensive repair. The population then appears diverse in genotype space but not decision space.

### Uncertainty scenarios

Yield, cost, demand, and price should not be varied independently without rationale. Weather can affect yields across several crops in the same region. Demand changes may correlate with price. Define scenarios $\xi_s$ from historical patterns, structured assumptions, or a dependence model.

For scenario profit $\Pi(x,\xi_s)$, risk-neutral optimization maximizes average. A downside-risk version can maximize

$$\mathbb E[\Pi]-\lambda\operatorname{CVaR}_{\alpha}(-\Pi).$$

CVaR of loss can be expressed with auxiliary threshold $\eta$:

$$\operatorname{CVaR}_{\alpha}(L)=
\min_{\eta}\left\{\eta+
\frac{1}{(1-\alpha)S}\sum_s\max(0,L_s-\eta)\right\}.$$

A heuristic may include $\eta$ as a variable or calculate empirical tail mean from scenario profits. Use enough scenarios for the tail estimate. At $\alpha=0.95$ with only twenty scenarios, the tail is essentially one observation.

### Baselines that expose value

Compare at least these policies:

- repeat the most recent feasible historical plan;
- greedily choose expected profit per area, then repair;
- solve a continuous relaxation without binaries or rotation;
- solve a reduced exact MILP;
- GA alone;
- DE alone for continuous shares under a fixed schedule;
- the hybrid DEGA.

Equalize expensive scenario evaluations. If DEGA evaluates twice as many scenarios, report that. The continuous relaxation supplies an optimistic bound when formulated consistently; the gap between feasible DEGA profit and relaxation reveals room for improvement, though not an exact integer optimality gap.

### Thirty seeds tell a story one seed cannot

For each seed, save final profit, feasibility, risk, crop-diversity measures, repair counts, and runtime. Report median and interquartile range. Show the best plan only after showing the distribution. If median profit is stable but crop patterns vary, there may be many near-equivalent plans. That flexibility is useful: decision-makers can choose based on considerations missing from the objective.

If one run is spectacular and twenty-nine ordinary, do not present only the spectacular run. Re-evaluate it independently. It may exploit a data bug, benefit from lucky scenarios, or represent a narrow valid basin. Explain its reproducibility.

### Agronomic and economic audits

An independent checker should reconstruct, for every plot and season:

- total planted area;
- allowed crop set;
- minimum active area;
- previous and next crop;
- rolling legume coverage;
- production by crop;
- full-price and surplus sales;
- scenario profit.

Plot timelines as colored bands, one row per plot. Demand utilization plots show production, demand cap, and surplus. A risk plot shows profit distributions for competing policies. These visuals connect the chromosome to an interpretable agricultural plan.

Ask whether the plan is too fragmented, whether labor peaks coincide, whether crop diversity protects against disease, and whether price assumptions reflect market response to widespread planting. Some issues become new constraints; others remain limitations. The optimizer cannot include facts the model never received.

### A defensible conclusion for the case

The hybrid is credible if it passes exact miniature tests, beats meaningful baselines under equal budgets, produces feasible plans under an independent audit, remains strong across seeds and scenarios, and discloses its encoding and repair. It is not globally certified merely because DE and GA were combined.

The broader lesson is transferable. Metaheuristics are often most successful when they do not search raw decisions blindly. They operate on a carefully designed representation, while decoders, exact subproblems, and independent validators supply the structure that the general search rule lacks.

The public national excellent paper titled *Crop Planting Strategy Optimization Based on Differential Genetic Algorithm* models 2024–2030 decisions, land types, crop compatibility, rotation, legumes, demand, surplus, and uncertainty. It combines DE-style difference mutation with GA-style selection and crossover.

Let $x_{itsk}$ be planting area and $z_{itsk}$ indicate use. A chromosome must encode hundreds of linked decisions. A credible decoder must enforce:

$$\sum_kx_{itsk}\le A_i,$$

plot-crop compatibility, minimum manageable area, no consecutive repeat planting, and at least one legume in each rolling three-year window. Profit must cap full-price sales at demand.

A useful hybrid workflow is:

1. initialize only compatible crop assignments;
2. normalize continuous areas to plot capacity;
3. apply DE mutation to area vectors;
4. apply problem-aware crossover to crop schedules;
5. repair rotation and legume rules in chronological order;
6. compute revenue with explicit sales variables;
7. compare by feasibility first, then profit;
8. preserve elites and population diversity.

The excellent paper reports different surplus-price scenarios and adds CVaR under uncertainty. To audit the heuristic, construct a two-year miniature and solve it exactly by MILP. Then compare DEGA's best solution with the exact optimum. On the full instance, compare against simple baselines: repeat a feasible 2023 schedule, greedily choose profit per mu with repairs, and solve a continuous relaxation. A method is informative only when it reliably improves a meaningful baseline.

Do not infer global optimality from a smooth convergence plot. Run at least 30 independent seeds, report best/median/worst and dispersion, show feasibility rates, and disclose computational budget. If one seed is dramatically better, investigate rather than publishing only that run.

## Fair Experiments

A stochastic optimizer produces a distribution, not one inevitable answer. Fair experimentation asks whether an observed improvement comes from the search idea, extra evaluations, favorable parameter tuning, lucky seeds, a different constraint interpretation, or a reporting choice. This section turns “we ran the algorithm” into evidence another team can inspect.

### Begin with a written experimental contract

Before seeing final results, record:

- the exact objective and constraint checker;
- data version and checksum;
- decision encoding and decoder;
- algorithms and baselines;
- parameter-tuning procedure;
- stopping budget;
- number and source of random seeds;
- primary comparison metric;
- secondary feasibility, robustness, and runtime metrics;
- rules for failed or timed-out runs.

This prevents silent changes after one curve looks disappointing. The contract can evolve during development, but label exploratory and final experiments separately.

### Equal iterations are rarely equal work

Suppose GA has population 100 for 500 generations: roughly 50,000 evaluations, excluding the initial population. PSO has 40 particles for 500 iterations: roughly 20,000 evaluations. SA performs one proposal per iteration: 500 evaluations. Comparing all at 500 iterations gives radically different budgets.

Equal objective evaluations are a clear primary budget when evaluations dominate. Also report runtime because algorithms have different overhead and may parallelize differently. For simulation optimization, count simulation replications, not merely candidate vectors. If one method evaluates each candidate on 100 scenarios and another on 10, the former uses more evidence.

Any inner solver belongs to the budget. A decoder that solves a MILP for every chromosome may be worthwhile, but “10,000 fitness evaluations” hides substantial computation. Record inner solver time, termination gaps, and failures.

### Seeds and paired comparisons

Use a predetermined seed list. If algorithms can share initial populations or scenario draws, pairing reduces noise. Let $y_{a,r}$ be outcome for algorithm $a$ under seed or instance replicate $r$. Compare paired differences

$$d_r=y_{A,r}-y_{B,r}$$

rather than unrelated sample means when pairing is valid. Report the distribution of $d_r$. A median difference and confidence interval are more informative than “A won 18 of 30 runs.”

Seeds should control all randomness: initialization, variation, simulator scenarios, randomized repair, and tie-breaking. Using the same seed across libraries does not ensure identical random streams, so log actual initial populations when strict pairing matters.

### Summary statistics that resist one lucky run

For minimization, report best, median, interquartile range, worst, mean, and standard deviation, plus feasible-run rate. Median and IQR are robust to extreme runs. Best shows potential but encourages selection bias if emphasized alone. Worst reveals reliability.

If some runs are infeasible, do not average their penalized objectives with feasible objectives unless the penalty has direct meaning. Report feasibility separately and compare feasible outcomes conditionally. An algorithm that yields one superb feasible result and twenty-nine failures is operationally different from one that yields thirty slightly weaker feasible plans.

Confidence intervals can be obtained by bootstrap across independent runs, but thirty seeds do not make every inference certain. Avoid treating repeated iterations within one run as independent observations. They share history.

### Statistical tests and practical importance

A Wilcoxon signed-rank test can compare paired outcomes without assuming normality, subject to its assumptions. Across many algorithms and instances, Friedman tests and corrected post-hoc comparisons are common. Tests do not measure practical importance. A statistically detectable 0.02% improvement may not justify code complexity; a noisy 8% improvement may matter despite a wide interval.

Report effect size in model units. For crop planning, additional expected profit, downside loss, and operational fragmentation matter. For routing, kilometers, late deliveries, and vehicles matter. Translate objective differences back into decisions.

Multiple comparisons inflate false discoveries. If twenty variants are tried and only the best is reported against a baseline, the comparison is selected. Separate tuning variants from held-out evaluation or adjust inference.

### Anytime curves and evaluation profiles

Final values hide speed. Plot best feasible objective against cumulative evaluations, with median and quantile bands across runs. Curves should be right-continuous best-so-far records for minimization and never worsen. Mark the fraction of runs feasible at each budget.

For multiple instances, a performance profile compares ratios to the best method on each instance. Data profiles show fraction of problems solved within a budget relative to dimension. Empirical cumulative distributions can show probability of reaching a target gap. These summarize more than one cherry-picked landscape.

Use logarithmic evaluation axes when early behavior matters, but label them clearly. Do not connect missing infeasible values as if performance existed.

### Parameter tuning without leaking the answer

Tune on representative training instances or scenarios. Evaluate the final configuration on held-out instances. If only one real problem exists, create structured variants: reduced sizes, demand scenarios, constraint perturbations, and historical periods. Do not choose parameters by repeatedly viewing the same final score and then claim independent success.

Grid search can be costly. Racing eliminates poor configurations early. Bayesian optimization can tune expensive algorithms but adds its own stochastic process. Sequential configuration systems allocate budgets adaptively. Whatever method is used, include tuning evaluations in the total research cost even if final-run comparisons use equal budgets.

Defaults are a valid baseline. A new method that wins only after hundreds of tuning runs while a baseline uses defaults needs that asymmetry disclosed. Robust parameter regions are more reassuring than one narrow optimum.

### Ablation: identify the ingredient that works

Suppose DEGA includes difference mutation, block crossover, chronological repair, elitism, adaptive $F$, and local search. Compare:

1. full method;
2. without DE mutation;
3. without GA crossover;
4. generic instead of problem-aware repair;
5. fixed instead of adaptive parameters;
6. without local search;
7. same components but shuffled order.

Equalize evaluations. If removing local search barely changes quality but halves time, the component is unnecessary. If generic repair collapses feasibility, the main contribution may be domain encoding rather than the named metaheuristic. That is a valuable result.

Interactions matter. Two components may help only together. A factorial experiment can estimate main and interaction effects, though cost grows. At minimum, explain why each component exists and give evidence for major claims.

### A reproducible result bundle

Save machine-readable configuration including:

```text
problem_version
data_hash
code_commit
algorithm_name_and_variant
population_or_chain_size
parameter_values_and_schedules
seed
evaluation_budget
hardware_and_parallel_workers
start_time_and_runtime
best_decoded_solution
best_raw_genotype
objective_components
constraint_residuals
diagnostic_history
```

The decoded solution is essential. A raw chromosome may not tell a reader what the decision is. Save enough precision to recompute objectives, then present rounded values separately.

Pin dependencies and solver versions. Floating-point parallel reductions can change trajectories even under a fixed seed; exact bitwise reproduction may be difficult, but decision-level consistency should be tested. If a proprietary simulator prevents sharing, provide interfaces, toy data, and objective traces.

### Independent verification

Write a second evaluator when stakes justify it. The optimizer's fitness function may contain the same bug that produced the winning solution. An independent script reads the final decoded decision and recalculates objective components and constraints from source data. Ideally it uses different code paths and simple loops rather than optimized caches.

For route distance, recompute every edge. For crop profit, recompute production, demand-limited sales, cost, and every rotation window. For PSO calibration, rerun the simulator with fresh random streams. For SA scheduling, calculate resource occupancy from the final schedule rather than accumulated deltas.

### Stress tests are not random decoration

Perturb the inputs that drive the decision. One-at-a-time sensitivity explains local effects; scenario stress tests combine plausible changes. Include adverse but coherent cases: high demand with low capacity, crop yield decline with price response, road loss during peak need. Arbitrary independent plus-or-minus percentages can create impossible worlds.

Track decision stability as well as objective stability. If recommended facilities change completely while performance barely changes, there may be many equivalent solutions. If one facility remains selected across all scenarios, it is robust. A stability map is often more actionable than one nominal optimum.

### Example experimental table

For the crop case, a defensible table might contain rows for greedy-repair, GA, DE, DEGA, and reduced MILP. Columns include median expected profit, IQR, median CVaR loss, feasible runs out of thirty, median repair fraction, evaluations, and runtime. A second table reports reduced-instance gap to optimum. A figure shows anytime profit bands. Another shows crop-plan stability.

Readers can then distinguish claims. DEGA may improve median profit but require more repair. GA may be slightly worse but more stable. The reduced MILP may prove the hybrid reaches the optimum on small cases. No single bold percentage carries the entire argument.

### Reproducibility during a contest

Time is limited, so automate. One command should load a frozen configuration, execute seeds, validate results, and generate tables. Keep experimental notebooks separate from production scripts. Do not manually copy the best number into the paper. Generate tables from saved result files so later reruns update consistently.

Use assertions during development: dimensions, bounds, finite objectives, capacity sums, and monotone best-so-far history. Fail loudly. A contest deadline is when silent errors are most dangerous.

Algorithms must receive comparable objective evaluations, stopping budgets, and hardware. Comparing 1,000 GA evaluations with 100,000 PSO evaluations is not a method comparison.

For stochastic results $y_{a,r}$ from algorithm $a$ and run $r$, report median and interquartile range. Paired seeds or shared initial populations can reduce comparison noise. Use performance profiles or empirical cumulative distributions when testing many instances.

Tune hyperparameters on training instances and evaluate on held-out instances. Tuning and reporting on the same problem favors the method with the largest search over settings. Save configuration, seed, data checksum, code commit, runtime, evaluation count, and final feasibility residual.

Ablate hybrid components. Compare DEGA with DE alone, GA alone, and the same algorithm without repair or elitism. If the gain disappears when evaluation budgets are equalized, the claimed innovation may simply perform more work.

## Defensible Claims

The final section is not a list of cautious phrases pasted after ambitious experiments. It is where model scope, algorithm evidence, and decision meaning meet. A good claim says what was optimized, under which assumptions, how reliably it was found, and what remains unknown.

### Match verbs to evidence

Use **proved** only for mathematical proof. Use **certified** when a solver bound or verified condition supports it. Use **found** for a heuristic result. Use **estimated** for simulation or statistical quantities. Use **suggests** when evidence is exploratory. Use **robust across tested scenarios** instead of “robust” when scenarios do not cover all uncertainty.

“The algorithm converges” is ambiguous. Best-so-far values in any elitist method converge numerically in the trivial sense that a bounded monotone sequence has a limit, but that limit need not be global or even good. State “the best observed objective stabilized within the evaluation budget” and accompany it with multi-seed evidence.

### A claim ladder for the ski-resort PSO

Weak evidence: one run recommends lift speed $3.4$ m/s and allocation $q=0.48$.

Better evidence: across thirty seeds, twenty-eight runs find feasible policies within 1% of the best observed profit under the same arrival scenarios.

Stronger evidence: a dense two-dimensional grid agrees with the PSO region; the recommendation beats current, maximum-speed, and conservative baselines; independent simulation confirms queue and density metrics.

Decision-grade evidence: the policy remains near-optimal across weather and demand scenarios, and operators receive a threshold rule rather than one fixed speed. The paper still should not claim universal global optimality if the simulator is black-box.

### Algorithm selection guide

If variables are continuous, the landscape is reasonably smooth, and derivatives are trustworthy, begin with gradient or convex methods and multiple starts if nonconvex. If variables form permutations with meaningful local moves, SA or GA with order-aware operators may fit. If continuous black-box variables are moderate in dimension and evaluations are affordable, DE or PSO are candidates. If the objective is extremely expensive, consider surrogate-assisted methods. If decisions mix structured discrete and continuous blocks, hybridize operators or use an exact inner problem.

GA is attractive when recombining meaningful building blocks makes sense. DE excels at aligned real vectors and uses population differences. PSO rapidly shares continuous discoveries but risks collapse. SA is memory-light and powerful when local moves and incremental evaluation are strong. None dominates universally—the no-free-lunch intuition warns that average superiority across all possible objective functions is unavailable. Domain structure supplies the advantage.

### A comparative miniature

Consider optimizing a six-stop delivery route. SA with 2-opt directly follows route geometry. A permutation GA can preserve edges across parents. Continuous PSO followed by sorting random keys can work, but its velocity operates indirectly on order. DE on random keys has the same disconnect. For this problem, SA and permutation GA have a clearer inductive bias.

Now calibrate four continuous hydrological parameters. DE and PSO operate naturally. GA with real operators is possible; SA can tune one vector; a derivative-based solver may be faster if sensitivities are stable. Compare rather than assume.

Now select crops and areas over years. No single basic method matches every block. A hybrid with a chronological decoder, discrete schedule operators, continuous area search, and exact accounting is more defensible. The comparison illustrates a central principle: algorithm choice follows representation and structure.

### Reporting negative results

If PSO collapses on a high-dimensional instance, report what diagnostics showed. If SA cannot cross a barrier under practical cooling, say so. If exact MILP solves the supposed heuristic challenge in seconds, use it. Negative results save readers from repeating weak choices and strengthen trust.

A competition paper need not test every algorithm. It should justify the selected set and include enough baselines to locate value. Depth on two methods is better than shallow acronyms for twelve.

### Why random search remains a serious baseline

Random search sounds unsophisticated, which is exactly why it is useful. Sample candidates from the same initial distribution, decode and repair them with the same logic, and give random search the same evaluation budget. If GA, DE, PSO, or SA cannot consistently beat it, their directed updates are not extracting useful structure. The failure may come from operators, representation, noise, or a nearly flat objective.

The comparison must be fair. A heuristic with a powerful repair decoder should not be compared with raw random vectors that are declared infeasible. Random samples should pass through the same decoder. If the proposed method receives a local-polishing step, add a random-plus-polishing baseline. This reveals whether improvement comes from global search or from the shared local routine.

For high-dimensional spaces, uniform random sampling can be concentrated in unintuitive regions. Use the same domain and scaling as the algorithm. Latin hypercube or Sobol sampling provides a stronger space-filling baseline for continuous boxes. For permutations, uniformly sample valid permutations. For constrained objects, use the same constructive generator used at initialization.

Suppose PSO finds reservoir value $1.04$ million and random feasible sampling finds $1.03$ million under 40,000 evaluations. The 1% difference may matter, but compare variability and policy quality. If a simple rule curve achieves $1.035$ million and greater robustness, the operational recommendation may favor the rule. Conversely, if PSO reaches $1.04$ million within 2,000 evaluations while random search requires 40,000 to approach $1.03$ million, the anytime evidence supports guided search.

Random search also catches coding mistakes. If every method produces identical objective distributions, perhaps variation never reaches the evaluator. If random search inexplicably dominates while using the same decoder, inspect selection signs, stale fitness, memory updates, and penalty comparisons. A humble baseline is often the quickest route to debugging an impressive algorithm.

Keep the sampled candidates and their decoded forms. They provide a reference cloud for later figures, help reveal whether the final solution occupies an unusual region, and make it possible to estimate how rare comparable policies are under the chosen representation. If only one in a million random genotypes decodes feasibly, the representation itself deserves redesign. If thousands of random feasible policies match the reported optimum, the problem may be insensitive and the paper should emphasize flexibility rather than algorithmic triumph.

### Ethical and operational limits

An optimized objective may distribute harm. Crop profit can encourage monoculture; rescue response averages can neglect remote communities; festival revenue can displace small vendors. Add equity metrics, inspect subgroup outcomes, and describe who bears risk. These are not external to optimization: they determine whether the objective represents the decision.

Human operators may reject a plan that is too complicated or fragile. Penalize unnecessary fragmentation, provide alternate near-optimal plans, and translate sensitivity into rules. A schedule with 0.2% higher score but dozens of delicate changes may be worse in practice.

### Final audit before submission

Ask these questions:

1. Can a reader reconstruct every decision variable and unit?
2. Does the representation reach meaningful feasible solutions?
3. Are variation and repair fully specified?
4. Are formulas dimensionally and mathematically consistent?
5. Are comparison budgets equal?
6. Are stochastic claims based on multiple seeds?
7. Is feasibility independently checked?
8. Is the real decision understandable after decoding?
9. Are uncertainty and sensitivity connected to recommendations?
10. Does every conclusion stay within the tested evidence?

If any answer is no, more iterations will not fix the paper.

### Closing perspective

The most surprising feature of intelligent optimization is how little intelligence resides in the generic update equation. The useful intelligence comes from choosing a representation that respects the problem, preserving feasibility without erasing diversity, designing experiments that resist luck, and interpreting solutions with domain knowledge.

GA teaches us to think about inheritance and variation. DE turns population differences into adaptive steps. PSO formalizes personal memory and social information. SA gives a principled way to accept temporary deterioration. These are distinct tools, yet all of them depend on the same modeling discipline.

Here is the promised hidden exercise. Choose one final solution from your own code, change one decision by the smallest meaningful amount, and trace every affected objective and constraint term by hand. If you cannot do that, the model is not yet yours, no matter how impressive the convergence figure looks. If you can, you have crossed the important boundary: the heuristic is no longer a black box that produces answers; it is a controlled instrument inside an argument.

### One landscape, four ways of thinking

To consolidate the methods, consider a pop-up concert in a city park. The organizer chooses positions of three food clusters, assigns twelve vendors to them, determines generator capacities, and schedules two delivery windows. Visitor movement is simulated. Revenue rises when vendors are accessible, but congestion, walking inequality, electrical overload, and delivery interference reduce the score. Trees and emergency corridors create irregular forbidden zones.

The full decision is mixed. Before coding, decompose it. Vendor-to-cluster assignment and delivery order are discrete. Cluster coordinates and generator capacities are continuous. Electrical capacity is hard. Congestion comes from simulation and is noisy. The team has a fixed budget of 40,000 simulation calls.

**A GA view.** A chromosome contains cluster assignments, a delivery permutation, and discretized or real-valued design blocks. Block crossover exchanges one complete cluster policy between parents. Order crossover handles delivery sequence. Real mutation perturbs coordinates. A decoder moves clusters out of forbidden regions and solves a small LP for power allocation. The GA is appealing because meaningful policy blocks can be recombined. It becomes weak if crossover cuts arbitrary coordinates and repair rebuilds the whole plan.

**A DE view.** Fix or separately enumerate a promising discrete structure, then let DE tune coordinates and capacities. Difference vectors adapt to population spread. DE is awkward if coordinate meanings change with vendor assignments. A nested strategy may let a GA propose discrete structure and DE refine continuous variables, but inner optimization consumes much of the budget. Cache repeated structures and cap inner evaluations.

**A PSO view.** Use random keys for vendor assignment and delivery order, plus continuous coordinates and capacities. Particles share discoveries quickly. Global attraction may collapse around a lucky noisy simulation, so use local neighborhoods and re-evaluate leaders. The random-key sorting step makes small position changes occasionally swap order abruptly; diagnose decision-space diversity, not only Euclidean particle spread.

**An SA view.** Start from a feasible layout. Neighborhood moves relocate one cluster, swap two vendors, reverse a delivery segment, or transfer generator capacity. Incremental simulation may update affected regions only. SA handles heterogeneous moves naturally and needs one current plan, but it does not recombine lessons from several good layouts. Multiple starts or parallel chains compensate.

No description proves which wins. Run a staged experiment. First build a tiny deterministic version with six vendors and grid locations; solve it exactly. Verify all representations. Second compare methods on medium deterministic instances under equal evaluations. Third restore simulation noise and use common random numbers. Fourth validate finalists on fresh visitor scenarios.

Suppose results show GA median loss $112$, DE-on-fixed-structure $118$, PSO $109$, and SA $111$. Those numbers alone suggest PSO. Now add feasibility: GA 30/30 feasible, DE 30/30, PSO 19/30, SA 29/30. Add runtime: PSO repair launches expensive reassignment; SA incremental evaluation is twice as fast. Add tail congestion: SA is best. The recommendation may change. This is why an algorithm leaderboard based on one scalar score is incomplete.

### A PSO trace over several steps

Because particle swarm was the motivating complaint for this blog, let us follow a small swarm beyond one update. Minimize

$$f(x,y)=(x-1)^2+2(y-2)^2$$

inside $[-2,5]^2$. Start three particles:

$$x_1^0=(4,4),\quad x_2^0=(0,3),\quad x_3^0=(2,-1),$$

with zero velocities. Their objective values are $17$, $3$, and $19$, so personal bests equal initial positions and global best is $g^0=(0,3)$. Use $\omega=0.5$, $c_1=c_2=1$, and, only for transparent arithmetic, set both random coefficients to $0.5$.

At the first update personal terms vanish because each particle sits at its own best. Particle 1 receives social velocity

$$v_1^1=0.5[(0,3)-(4,4)]=(-2,-0.5),$$

so $x_1^1=(2,3.5)$ and $f=1+2(1.5)^2=5.5$. Particle 2 is the leader and stays at $(0,3)$ with cost $3$. Particle 3 moves by $0.5[(-2,4)]=(-1,2)$ to $(1,1)$ with cost $2$. Its personal best improves and it becomes the new global best $g^1=(1,1)$.

At the second update, particle 1 has inertia $(-1,-0.25)$. Its personal best is now $(2,3.5)$ because 5.5 improved on 17, so its cognitive term is zero. Its social term is $0.5[(1,1)-(2,3.5)]=(-0.5,-1.25)$. Therefore $v_1^2=(-1.5,-1.5)$ and $x_1^2=(0.5,2)$, whose cost is $0.25$. The particle overshoots the social best in the $y$ direction and finds a much better point near the true optimum $(1,2)$.

Particle 2 has zero inertia, personal best $(0,3)$ at its current position, and social attraction $0.5[(1,1)-(0,3)]=(0.5,-1)$. It moves to $(0.5,2)$ as well. Particle 3 is current leader at $(1,1)$ and remains there because velocity from the previous step was $(-1,2)$, not zero: inertia contributes $(-0.5,1)$ even though cognitive and social displacements vanish. It moves to $(0.5,2)$ too. This exposes an important fact: a leader does not necessarily stay fixed; inertia can carry it away, while its personal best remains in memory.

Now all three current positions coincide in this artificially deterministic example. With identical random numbers, global communication, and simple symmetry, diversity vanishes. Real implementations draw independent coordinate-wise random values, so trajectories differ, but collapse remains possible. A ring topology, heterogeneous parameters, or random reinitialization would preserve alternatives. The trace also shows why $p_i$ and current $x_i$ must be stored separately.

At $(0.5,2)$ the cost is $0.25$, better than previous records, so it becomes global best. The true optimum is $(1,2)$ with zero cost. Depending on velocities and random draws, particles may oscillate around it. A local polishing step could finish quickly. On this smooth convex quadratic, however, gradient methods are the right benchmark; PSO is pedagogical rather than necessary.

### Parameter sensitivity as a designed experiment

For PSO, choose factors such as inertia schedule, topology, population size, and acceleration coefficients. Rather than changing one value until a curve looks good, use a small factorial or space-filling design across parameter ranges. Run repeated seeds at each setting. Model final gap and feasibility as responses. Look for broad stable regions.

For GA, factors include population, tournament size, elitism, crossover and mutation rates, and operator type. For DE, variant, $F$, $CR$, population, and adaptation matter. For SA, $T_0$, cooling, moves per temperature, and neighborhood mixture matter. The experimental budget can be large, so tune only parameters linked to plausible mechanisms.

Plot interactions. High GA mutation may compensate for strong selection; evaluated alone it can look harmful. Large PSO inertia may work with constriction but diverge without it. Slow SA cooling may help only when each temperature receives enough proposals. Reporting one-dimensional sweeps can miss these relationships.

Use parameter sensitivity to improve conclusions. If performance collapses outside a narrow $CR$ interval, the method is brittle. If several configurations work similarly, choose the simpler or faster one. Do not report excessive decimal precision such as $F=0.637281$ unless evidence supports it.

### A manual validation worksheet

Select one candidate from each method and write a worksheet with five columns: encoded values, decoded decisions, objective components, constraint checks, and baseline comparison. For the concert:

- list cluster coordinates and confirm land feasibility;
- list vendor assignment and count each vendor once;
- recompute electrical load per cluster;
- recalculate travel and congestion from saved simulation outputs;
- check emergency corridors under every scenario;
- compare revenue and tail congestion with current layout.

Then perturb one decision. Move a cluster ten meters, swap two vendors, or shift generator capacity. Predict which terms change before recalculating. If unexpected distant terms change, inspect the simulator or acknowledge network effects. This exercise develops model understanding faster than watching another animated swarm.

### Communication without algorithm theater

An algorithm diagram should show data flow specific to the model: initialization, decoding, simulation, feasibility, memory, variation, and output validation. A generic cycle of “selection—crossover—mutation” does not explain crop rotation or electrical capacity. Include one decoded candidate so readers connect arrays to real choices.

Use convergence figures with evaluation axes and uncertainty bands. Add a decision visualization and constraint table. Explain one failed run if failure is material. A reader should understand not only that the score improved but how the recommended policy differs from the baseline.

Avoid anthropomorphic claims: particles do not communicate intentions; chromosomes do not learn biology; annealing does not understand compromise. Metaphors introduce mechanisms, then equations and experiments must take over.

Safe language is precise:

- “The method found the best observed feasible solution in 30 runs.”
- “The median objective improved 8.4% over the greedy baseline under an equal evaluation budget.”
- “On the reduced instance, the heuristic matched the proven optimum.”
- “No global-optimality guarantee is available for the full nonconvex model.”

Unsafe language says “the global optimum was obtained” merely because the curve flattened. A metaheuristic is valuable when exact methods are unsuitable and experiments are honest—not because biological vocabulary makes search intelligent.

The hidden challenge is simple: set every random coefficient in PSO to its expectation $1/2$ and imagine $p_i=g$. Write the resulting linear recurrence for the distance $x_i^t-g$. Its stability depends on $\omega,c_1,c_2$. The swarm metaphor fades, and underneath you find a dynamical system—the same kind of object we will study again in differential-equation blogs.

## Knowledge Check

The ten questions below move from representation and basic update rules to numerical calculations, constraint design, premature convergence, fair experiments, and evidence for a hybrid crop optimizer. Single-choice and multiple-choice questions are mixed. EXP is awarded according to difficulty, and the first-attempt result is saved when you are signed in.

<section class="modeling-quiz" data-modeling-quiz="lesson-7" data-locale="en"></section>

### Sources

- [CUMCM official site and excellent-paper display](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/).
- [COMAP Outstanding-paper archive](https://contest.comap.com/undergraduate/contests/mcm/previous-contests.php).
- Storn and Price, [Differential Evolution](https://doi.org/10.1023/A:1008202821328).
- Kennedy and Eberhart, [Particle Swarm Optimization](https://doi.org/10.1109/ICNN.1995.488968).
