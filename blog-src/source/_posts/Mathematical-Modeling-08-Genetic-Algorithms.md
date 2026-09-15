---
title: Mathematical Modeling 8 - Genetic Algorithms
date: 2026-09-14 20:00:09
categories: Mathematical Modeling
tags:
  - Genetic Algorithms
  - Metaheuristics
  - Combinatorial Optimization
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "Genetic algorithms explained as representations, operators, constraints, and evidence—not as a black-box substitute for formulation."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **designing an evolutionary search whose representation, operators, and evidence match the problem**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Select valuable items without exceeding capacity.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

A genetic algorithm (GA) is a population-based search method. It is valuable when the search space is large, discrete or mixed, and irregular enough that exact or gradient-based methods are difficult. It does not certify optimality.

## Representation comes first

Each candidate solution is encoded as a chromosome. The encoding must make important constraints easy to preserve.

- bit strings suit subset selection;
- permutations suit routing and ordering;
- integer vectors suit allocation;
- real vectors suit bounded parameter tuning;
- custom graph encodings suit network design.

For a knapsack problem, a bit $x_i=1$ includes item $i$. The raw objective is value $\sum_i v_ix_i$, while feasibility requires $\sum_i w_ix_i\le W$.

## The evolutionary loop

A basic GA repeats:

1. initialize a diverse population;
2. evaluate objective and constraint violation;
3. select parents;
4. recombine them by crossover;
5. mutate offspring;
6. preserve or select survivors;
7. stop under a declared budget or convergence rule.

Selection creates pressure toward strong candidates. Crossover reuses partial structure. Mutation introduces variation. Elitism protects the best known solution, but too much elitism collapses diversity.

## Fitness and constraints

For maximization with violation $v(x)\ge0$, a penalty fitness may be

$$
F(x)=f(x)-\lambda v(x).
$$

The penalty must be large enough to discourage infeasibility but not so large that the search receives no useful gradient toward the feasible region. Better alternatives include repair operators, feasible encodings, and feasibility-first comparison:

1. a feasible candidate beats an infeasible one;
2. among feasible candidates, compare objective;
3. among infeasible candidates, compare violation.

## Operators must respect structure

One-point crossover is natural for bit strings but can duplicate cities in a route. Permutation problems need order crossover, partially mapped crossover, or other structure-preserving operators. A mutation may flip a bit, swap two positions, reverse a route segment, or perturb a real coordinate.

The operator is part of the model. Explain why it produces meaningful nearby solutions.

## Exploration versus exploitation

Population size, selection pressure, crossover rate, and mutation rate control the balance. Diagnose the search with:

- best and median fitness by generation;
- feasible fraction;
- population diversity;
- improvement versus objective evaluations;
- variation across random seeds.

If all candidates become identical early, increase diversity or reduce selection pressure. If fitness never improves, inspect encoding, repair, and scaling before increasing iterations.

## Evidence for a competition paper

Compare the GA with an exact solver on small instances and with a simple heuristic on full instances. Report computational budget, number of runs, median outcome, best outcome, and variability. A single lucky run is not evidence.

Use the GA only after asking whether the model has exploitable structure. Linear assignment, shortest path, convex quadratic programming, and many scheduling models have specialized solvers with stronger guarantees.

The official SciPy optimization guide groups global optimizers by supported bounds, nonlinear constraints, and derivative requirements; solver choice should follow the mathematical structure of the problem ([optimization guide](https://docs.scipy.org/doc/scipy/tutorial/optimize.html)).

## Minimal pseudocode

```text
population <- create_feasible_candidates()
evaluate(population)

repeat until evaluation_budget_is_used:
    parents   <- select(population)
    offspring <- crossover(parents)
    offspring <- mutate(offspring)
    offspring <- repair_or_measure_violation(offspring)
    evaluate(offspring)
    population <- survivor_selection(population, offspring)

return best_feasible_candidate_seen
```

Keep evaluation count—not only generation count—because population sizes may differ. Cache repeated candidates when objective evaluation is expensive. For a beginner implementation, first test the loop on a function with a known optimum, then on a tiny version of the real problem whose exact optimum can be enumerated.

### Practice

For a ten-item knapsack, compare three constraint strategies: penalty, repair by removing low value-to-weight items, and feasibility-first selection. Across 30 seeds, report feasibility rate, median objective, best objective, and evaluations. This exercise shows that representation and constraint handling matter at least as much as the word “genetic.”

## Guided workshop: design a GA that can be trusted

Consider a traveling-salesperson problem with cities $1,\ldots,n$ and distance matrix $d_{ij}$. A candidate is a permutation $\pi$, and its cost is

$$
C(\pi)=\sum_{k=1}^{n-1}d_{\pi_k,\pi_{k+1}}+d_{\pi_n,\pi_1}.
$$

### Choose representation before operators

A binary chromosome is unnatural here because most bit strings do not describe valid tours. A permutation representation makes feasibility automatic, but ordinary one-point crossover produces duplicated and missing cities. Use order crossover, partially matched crossover, or edge recombination. Swap, insertion, inversion, and 2-opt moves preserve permutation structure.

Representation controls the neighborhood the algorithm can explore. Inversion is especially meaningful for routes because it removes crossing edges. A domain-aware operator is not cheating; it is the difference between searching the problem and searching an arbitrary encoding.

### Separate selection, variation, and survival

Tournament selection controls pressure through tournament size. Crossover combines information, mutation restores local diversity, and survivor selection decides whether parents can remain. Preserve a small elite, but do not let elites occupy most of the population. Track the best, median, and worst cost plus the number of unique candidates. A falling diversity curve can warn of premature convergence before the best-cost curve becomes flat.

Fitness transformations should preserve ordering without creating numerical explosions. For minimization, avoid $1/C$ when $C$ can be near zero or negative. Tournament selection can use objective comparisons directly. With constraint violations, compare feasible solutions before infeasible ones and rank infeasible candidates by violation, or design a repair with a documented bias.

### Budget comparisons fairly

If population size is $P$ and the algorithm runs $G$ generations, it uses roughly $PG$ objective evaluations. Compare methods at the same evaluation or wall-clock budget. Run independent seeds and report median, interquartile range, best, and feasibility rate. Use paired seeds or common test instances when comparing configurations.

On small $n$, enumerate or solve exactly to measure optimality gap:

$$
\text{gap}=\frac{C_{GA}-C^*}{|C^*|}\times100\%.
$$

On large instances, compare with nearest-neighbor and repeated 2-opt baselines. A GA that cannot beat a simple local search is not justified.

### Tune mechanisms, not a magic list

Use pilot experiments to study population size, mutation probability, tournament size, and elitism. Change one mechanism at a time or use a designed experiment. High mutation makes the search nearly random; very low mutation may prevent recovery after convergence. Adaptive mutation can increase variation when diversity falls, but its trigger and limit must be stated.

### Practice

Implement a permutation GA for 20 cities. Unit-test every operator for length, uniqueness, and city membership. Plot objective and diversity by evaluation count. Compare order crossover with edge recombination and swap mutation with inversion. Run 30 seeds, compare against nearest-neighbor plus 2-opt, and explain performance using the structure each operator preserves.

## The lecture's complete evolutionary story

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/ga-02.webp" alt="Genetic algorithm cycle"><figcaption>Selection creates pressure; variation creates candidates; evaluation connects them to the model.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/ga-03.webp" alt="Parent crossover and mutation"><figcaption>Operators should preserve useful building blocks without destroying diversity.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/ga-04.webp" alt="Knapsack example"><figcaption>Knapsack makes encoding, feasibility, penalty, and repair concrete.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/ga-05.webp" alt="Epistasis and interaction"><figcaption>Epistasis means one gene's value depends on others; independent tuning can fail.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/ga-06.webp" alt="Encoding geometry"><figcaption>Binary, real-valued, and permutation encodings induce different neighborhoods.</figcaption></figure>
</div>

### Knapsack from chromosome to fitness

For values $v_i$, weights $w_i$, capacity $C$, chromosome $x\in\{0,1\}^n$ represents a subset:

$$\max\sum_iv_ix_i\quad\text{s.t. }\sum_iw_ix_i\le C.$$

Penalty fitness $F(x)=\sum_iv_ix_i-\lambda\max(0,\sum_iw_ix_i-C)$ is simple but sensitive to $\lambda$. Repair can remove low value-to-weight items until feasible. Feasibility-preserving construction samples only legal subsets. Compare these mechanisms by feasible-offspring rate and best feasible objective.

Tournament size controls selection pressure. One-point crossover suits ordered strings but is arbitrary for unordered items; uniform crossover treats positions symmetrically. Bit mutation near $1/n$ changes one bit on average. Elitism preserves the best candidate but excessive elitism collapses diversity.

For continuous variables, use real-valued crossover and Gaussian or polynomial mutation. For routes, use order or edge-preserving crossover and swap, insertion, or inversion mutation. Ordinary one-point crossover creates missing and duplicate cities.

### Evidence, not one lucky run

Plot best and median feasible objective versus evaluations, diversity versus evaluations, and final values across 20–30 seeds. Compare with exact optima on small cases and greedy/local baselines on large cases. Fix the number of objective evaluations, not generations, across algorithms.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **designing an evolutionary search whose representation, operators, and evidence match the problem**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Binary knapsack

**Here is the problem.** Select valuable items without exceeding capacity. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Encode selections as bits, repair or penalize infeasibility, and hand-check crossover and mutation on one chromosome. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Fitness must rank feasible quality without accidentally rewarding overweight solutions. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Route ordering

**Here is the problem.** Find a short tour through all required locations. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use a permutation encoding and order-preserving operators rather than ordinary bit crossover. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Representation determines whether children remain valid tours. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Parameter calibration

**Here is the problem.** Fit continuous model parameters with several local basins. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use real-valued genes, bounded mutation, repeated seeds, and a deterministic local refinement baseline. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The distribution of final errors matters more than the best lucky run. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Feature selection

**Here is the problem.** Choose a compact predictive subset while preserving validation accuracy. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use nested evaluation, penalize subset size, and cache repeated evaluations. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Selecting features and scoring them on the same validation set creates adaptive overfitting. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: encoding

Let us slow down at **encoding**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats encoding as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing an evolutionary search whose representation, operators, and evidence match the problem. A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use encoding to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: population initialization

Let us slow down at **population initialization**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats population initialization as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing an evolutionary search whose representation, operators, and evidence match the problem. A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use population initialization to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: selection pressure

Let us slow down at **selection pressure**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats selection pressure as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing an evolutionary search whose representation, operators, and evidence match the problem. A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use selection pressure to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: variation operators

Let us slow down at **variation operators**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats variation operators as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing an evolutionary search whose representation, operators, and evidence match the problem. A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use variation operators to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: constraint handling

Let us slow down at **constraint handling**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats constraint handling as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing an evolutionary search whose representation, operators, and evidence match the problem. A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use constraint handling to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: experimental evidence

Let us slow down at **experimental evidence**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats experimental evidence as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: designing an evolutionary search whose representation, operators, and evidence match the problem. A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use experimental evidence to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Binary knapsack

Let us revisit **Binary knapsack**, but this time you are doing the talking. The situation is still this: Select valuable items without exceeding capacity. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Encode selections as bits, repair or penalize infeasibility, and hand-check crossover and mutation on one chromosome. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Fitness must rank feasible quality without accidentally rewarding overweight solutions. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Binary knapsack in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Route ordering

Let us revisit **Route ordering**, but this time you are doing the talking. The situation is still this: Find a short tour through all required locations. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use a permutation encoding and order-preserving operators rather than ordinary bit crossover. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Representation determines whether children remain valid tours. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Route ordering in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Parameter calibration

Let us revisit **Parameter calibration**, but this time you are doing the talking. The situation is still this: Fit continuous model parameters with several local basins. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use real-valued genes, bounded mutation, repeated seeds, and a deterministic local refinement baseline. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The distribution of final errors matters more than the best lucky run. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Parameter calibration in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Feature selection

Let us revisit **Feature selection**, but this time you are doing the talking. The situation is still this: Choose a compact predictive subset while preserving validation accuracy. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use nested evaluation, penalize subset size, and cache repeated evaluations. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Selecting features and scoring them on the same validation set creates adaptive overfitting. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Feature selection in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect encoding to population initialization

Draw two boxes labeled **encoding** and **population initialization**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from encoding to population initialization; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing an evolutionary search whose representation, operators, and evidence match the problem to remain auditable.

### Board exercise 2: connect population initialization to selection pressure

Draw two boxes labeled **population initialization** and **selection pressure**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from population initialization to selection pressure; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing an evolutionary search whose representation, operators, and evidence match the problem to remain auditable.

### Board exercise 3: connect selection pressure to variation operators

Draw two boxes labeled **selection pressure** and **variation operators**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from selection pressure to variation operators; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing an evolutionary search whose representation, operators, and evidence match the problem to remain auditable.

### Board exercise 4: connect variation operators to constraint handling

Draw two boxes labeled **variation operators** and **constraint handling**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from variation operators to constraint handling; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing an evolutionary search whose representation, operators, and evidence match the problem to remain auditable.

### Board exercise 5: connect constraint handling to experimental evidence

Draw two boxes labeled **constraint handling** and **experimental evidence**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from constraint handling to experimental evidence; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing an evolutionary search whose representation, operators, and evidence match the problem to remain auditable.

### Board exercise 6: connect experimental evidence to encoding

Draw two boxes labeled **experimental evidence** and **encoding**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from experimental evidence to encoding; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind designing an evolutionary search whose representation, operators, and evidence match the problem to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a reproducible GA study with pseudocode, valid operators, convergence traces, multiple seeds, an evaluation-budget-matched baseline, and an ablation of at least one mechanism. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute GA lab

Implement a 20-item knapsack GA. Spend ten minutes on representation and a brute-force oracle, ten on selection/crossover/mutation, ten comparing penalty and repair, and ten running 30 seeds. Explain failure through feasibility, diversity, or epistasis—not the label “randomness.”
