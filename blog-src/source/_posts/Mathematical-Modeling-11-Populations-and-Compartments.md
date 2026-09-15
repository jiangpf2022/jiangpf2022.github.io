---
title: Mathematical Modeling 11 - Populations and Compartments
date: 2026-09-14 20:00:06
categories: Mathematical Modeling
tags:
  - Population Models
  - Epidemics
  - Stability
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "Growth, diffusion, compartment, epidemic, and interacting-population models connected through equilibria, stability, and identifiable parameters."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **representing populations as stocks connected by interpretable flows**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Compare unlimited exponential growth with growth under a carrying capacity.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

Many systems share a small number of dynamical motifs: unconstrained growth, saturation, transfer between compartments, and interaction between populations.

## Malthus and logistic growth

If per-capita growth is constant,

$$
\frac{dN}{dt}=rN,qquad N(t)=N_0e^{rt}.
$$

This Malthus model is useful over short periods but grows without bound. Introducing a carrying capacity $K$ gives the logistic equation

$$
\frac{dN}{dt}=rN\left(1-\frac{N}{K}\right).
$$

Growth is nearly exponential when $N\ll K$, fastest at $N=K/2$, and approaches zero near $K$. Do not fit $K$ from early exponential data and expect it to be identifiable.

## Adoption and product diffusion

A basic adoption model treats contact between adopters and non-adopters as the mechanism:

$$
\frac{dA}{dt}=\beta A(M-A),
$$

where $M$ is market potential. External advertising can add a term proportional to the remaining market. The point is not that every product follows one S-curve, but that different mechanisms produce distinguishable rate equations.

## Compartment models

Divide the system into well-mixed compartments and write one balance per compartment. For a substance moving between two compartments,

$$
\dot x_1=-(k_{10}+k_{12})x_1+k_{21}x_2+u(t),
$$

$$
\dot x_2=k_{12}x_1-k_{21}x_2.
$$

Arrows in the compartment diagram must correspond one-to-one with terms in the equations. This structure appears in pharmacokinetics, tracer studies, glucose–insulin models, material flows, and customer migration.

## Epidemic dynamics

The SIR model divides a fixed population into susceptible, infectious, and removed groups:

$$
\dot S=-\beta\frac{SI}{N},\qquad
\dot I=\beta\frac{SI}{N}-\gamma I,\qquad
\dot R=\gamma I.
$$

The basic reproduction number is $R_0=\beta/\gamma$ in a fully susceptible population. More precisely, infections initially grow when $\beta S(0)/N>\gamma$.

Observed case counts rarely equal the state $I(t)$. Reporting delays, under-detection, and time-varying contact rates create a measurement model that must be distinguished from the transmission model.

## Interacting populations

Lotka–Volterra predator–prey dynamics are

$$
\dot x=\alpha x-\beta xy,
\qquad
\dot y=\delta xy-\gamma y.
$$

The interaction term $xy$ assumes random encounters in a well-mixed environment. Logistic self-limitation, harvesting, seasonal parameters, or a saturating functional response may be more realistic. Add such terms only when data or mechanism justify them.

## Equilibria and stability

Equilibria satisfy $F(y^*)=0$. Local behavior is determined by the Jacobian

$$
J(y^*)=\left.\frac{\partial F}{\partial y}\right|_{y=y^*}.
$$

If all eigenvalues have negative real part, the equilibrium is locally asymptotically stable. Positive real parts indicate instability; complex eigenvalues create oscillatory local behavior.

## Calibration and identifiability

Estimate parameters by minimizing residuals between observations and model outputs, ideally using observation-error assumptions. Plot parameter profiles or bootstrap distributions. Two very different parameter sets can generate similar trajectories; tight solver convergence does not imply parameter certainty.

Use held-out time intervals, multiple observed states, and mechanistic bounds. Report both trajectory uncertainty and parameter uncertainty, and distinguish interpolation within observed conditions from extrapolation to a new regime.

## Guided workshop: think in stocks and flows

A compartment is a stock: people, animals, customers, information, water, or capital currently in one state. An arrow is a flow with units stock/time. The derivative of each stock equals total inflow minus total outflow. Drawing this diagram before equations prevents missing or duplicated terms.

### Derive rather than memorize SIR

Under homogeneous mixing, one susceptible person encounters infectious people at a rate proportional to $I/N$. If $\beta$ is effective infectious contacts per person per time, total new infections occur at rate $\beta SI/N$. Recovery removes infectious individuals at rate $\gamma I$. The signs in the SIR equations follow directly from arrows.

Check conservation:

$$
\frac{d}{dt}(S+I+R)=0.
$$

Thus $S+I+R=N$ for all time if it holds initially. A numerical trajectory that violates this beyond solver tolerance is wrong. Positivity is another invariant: negative populations are impossible.

### Interpret thresholds and equilibria

Initially, $I$ grows when $\beta S/N-\gamma>0$. Therefore the effective reproduction number is $R_t=(\beta/\gamma)(S/N)$, not always the basic $R_0=\beta/\gamma$. The infection peak occurs when $S=N/R_0$ in the simplest model. These thresholds connect parameters to policy more clearly than a simulated curve alone.

For logistic growth, equilibria are $0$ and $K$. The derivative of $f(N)=rN(1-N/K)$ is positive at zero and negative at $K$, showing that zero is unstable and $K$ stable for $r>0$. In several dimensions, replace this derivative with Jacobian eigenvalues.

### Add structure with purpose

Age groups replace scalar contact with a matrix $C_{ab}$. Spatial patches add movement. SEIR adds a latent compartment. Birth, death, vaccination, waning immunity, or treatment add flows. Every extra compartment adds parameters and possible non-identifiability. Include a state only if it changes observable dynamics or a decision.

### Distinguish process and observation

The state may be true incidence, while data are reported cases. A simple observation model is

$$
Y_t\sim\operatorname{NegBin}(\rho\,\text{new infections}_t,\phi),
$$

where $\rho$ is reporting fraction and $\phi$ controls overdispersion. Without this layer, a change in reporting may be mistaken for a change in transmission. The same lesson applies to sales versus latent demand and sensor readings versus physical state.

### Calibrate and validate

Fit several parameters only when the data contain information about them. Use external estimates or priors for recovery duration, report parameter correlation, and propagate parameter uncertainty to forecasts. Validate on later time intervals and on summaries not used in fitting, such as peak time or final size.

### Practice

Draw and derive logistic, SIR, and predator–prey models from flow diagrams. Verify invariants numerically. For SIR, vary $R_0$ and initial susceptible fraction, locate the infection peak, and compare reported cases under different $\rho$. Then propose one extension and state the new data required to identify it.

## Remaining lecture examples

The differential-equation lecture also includes artifact dating, product diffusion, rockets, pharmacokinetic compartments, diabetes testing, stability, and two-species systems. They share one habit: derive flows before choosing a numerical solver.

<div class="mm-gallery">
<figure><img src="/blog/images/mathematical-modeling/ode-06.webp" alt="Malthus growth curve"><figcaption>Malthus growth is locally useful but cannot represent resource limitation indefinitely.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/ode-11.webp" alt="Compartment system"><figcaption>A compartment diagram turns transfer assumptions into balance equations.</figcaption></figure>
</div>

### Artifact authenticity and decay

Radioactive content $C$ follows $C'=-\lambda C$, so $C(t)=C_0e^{-\lambda t}$. Estimated age is $t=-\lambda^{-1}\log(C/C_0)$. Authenticity assessment must propagate uncertainty in $C$, $C_0$, contamination, and half-life; an impossible estimated age is evidence against the claimed origin only under those assumptions.

### New-product diffusion

If adoption grows through contact between adopters and non-adopters,

$$\frac{dN}{dt}=\beta N(M-N),$$

which is logistic. Bass diffusion separates external advertising $p$ and imitation $q$:

$$\frac{dF}{dt}=[p+qF(t)][1-F(t)].$$

The peak sales time and saturation $M$ guide production. Fit cumulative and incremental sales carefully because cumulative errors are strongly correlated.

### Why rockets have stages

The ideal rocket equation $\Delta v=v_e\ln(m_0/m_f)$ shows logarithmic return from mass ratio. Carrying empty tanks after fuel is exhausted wastes mass; staging discards inert structure. More stages improve mass efficiency but add engines, structure, failure risk, and operational complexity, so the optimum is not “as many as possible.”

### Compartments and diabetes testing

For two well-mixed compartments,

$$\dot x_1=u-k_{12}x_1+k_{21}x_2-k_{10}x_1,\qquad
\dot x_2=k_{12}x_1-k_{21}x_2.$$

Glucose-insulin models use the same stock-flow logic: glucose enters, is used or stored, and insulin changes removal rates. Diagnosis is an inverse problem: parameters inferred from a glucose tolerance curve may be correlated. Report identifiability and measurement noise instead of treating one fitted parameter as ground truth.

### Epidemic final size

In SIR, total $S+I+R=N$ is conserved. Dividing $dS/dt$ by $dR/dt$ yields

$$\frac{dS}{dR}=-\frac{\beta S}{\gamma N},$$

which leads to a final-size relation. This explains why outbreaks in a similar population can reach reproducible totals even though individual events are random. Reporting rate and immunity alter observed cases and effective susceptible population, so “same disease” is not enough for transfer.

### Stability and predator–prey dynamics

For $\dot x=f(x)$, equilibrium $x^*$ satisfies $f(x^*)=0$. In higher dimensions, eigenvalues of the Jacobian determine local behavior. Lotka–Volterra equations

$$\dot x=ax-bxy,\qquad \dot y=-cy+dxy$$

produce idealized cycles, but real systems need carrying capacity, functional responses, harvesting, or seasonal parameters. The course's warning is important: one predator–prey model need not fit another ecosystem.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **representing populations as stocks connected by interpretable flows**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Population growth

**Here is the problem.** Compare unlimited exponential growth with growth under a carrying capacity. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Derive Malthus and logistic models, fit both, and inspect when density dependence becomes visible. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Long-horizon extrapolation exposes the unrealistic assumptions of exponential growth. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Product adoption

**Here is the problem.** Predict cumulative adoption when innovators and imitation both matter. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Derive the Bass diffusion rate from external and internal influence and interpret the adoption peak. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Different parameter pairs can fit early data similarly, so uncertainty grows before the peak. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Epidemic spread

**Here is the problem.** Understand when an outbreak grows and how interventions change final size. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Construct SIR flows, derive the initial threshold, and distinguish trajectory fit from causal policy effect. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The reproduction threshold is local; final size follows a different implicit relationship. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Predator and prey

**Here is the problem.** Explain oscillations in two interacting species. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Write gain and loss terms, find equilibria, linearize, and compare ideal cycles with damped or forced data. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Neutral cycles in the basic model are structurally fragile and should not be overinterpreted. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: stocks and flows

Let us slow down at **stocks and flows**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats stocks and flows as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: representing populations as stocks connected by interpretable flows. Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use stocks and flows to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: mass balance

Let us slow down at **mass balance**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats mass balance as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: representing populations as stocks connected by interpretable flows. Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use mass balance to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: thresholds

Let us slow down at **thresholds**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats thresholds as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: representing populations as stocks connected by interpretable flows. Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use thresholds to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: equilibria

Let us slow down at **equilibria**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats equilibria as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: representing populations as stocks connected by interpretable flows. Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use equilibria to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: identifiability

Let us slow down at **identifiability**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats identifiability as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: representing populations as stocks connected by interpretable flows. Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use identifiability to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: observation model

Let us slow down at **observation model**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats observation model as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: representing populations as stocks connected by interpretable flows. Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use observation model to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Population growth

Let us revisit **Population growth**, but this time you are doing the talking. The situation is still this: Compare unlimited exponential growth with growth under a carrying capacity. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Derive Malthus and logistic models, fit both, and inspect when density dependence becomes visible. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Long-horizon extrapolation exposes the unrealistic assumptions of exponential growth. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Population growth in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Product adoption

Let us revisit **Product adoption**, but this time you are doing the talking. The situation is still this: Predict cumulative adoption when innovators and imitation both matter. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Derive the Bass diffusion rate from external and internal influence and interpret the adoption peak. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Different parameter pairs can fit early data similarly, so uncertainty grows before the peak. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Product adoption in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Epidemic spread

Let us revisit **Epidemic spread**, but this time you are doing the talking. The situation is still this: Understand when an outbreak grows and how interventions change final size. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Construct SIR flows, derive the initial threshold, and distinguish trajectory fit from causal policy effect. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The reproduction threshold is local; final size follows a different implicit relationship. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Epidemic spread in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Predator and prey

Let us revisit **Predator and prey**, but this time you are doing the talking. The situation is still this: Explain oscillations in two interacting species. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Write gain and loss terms, find equilibria, linearize, and compare ideal cycles with damped or forced data. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Neutral cycles in the basic model are structurally fragile and should not be overinterpreted. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Predator and prey in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect stocks and flows to mass balance

Draw two boxes labeled **stocks and flows** and **mass balance**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from stocks and flows to mass balance; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind representing populations as stocks connected by interpretable flows to remain auditable.

### Board exercise 2: connect mass balance to thresholds

Draw two boxes labeled **mass balance** and **thresholds**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from mass balance to thresholds; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind representing populations as stocks connected by interpretable flows to remain auditable.

### Board exercise 3: connect thresholds to equilibria

Draw two boxes labeled **thresholds** and **equilibria**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from thresholds to equilibria; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind representing populations as stocks connected by interpretable flows to remain auditable.

### Board exercise 4: connect equilibria to identifiability

Draw two boxes labeled **equilibria** and **identifiability**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from equilibria to identifiability; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind representing populations as stocks connected by interpretable flows to remain auditable.

### Board exercise 5: connect identifiability to observation model

Draw two boxes labeled **identifiability** and **observation model**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from identifiability to observation model; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind representing populations as stocks connected by interpretable flows to remain auditable.

### Board exercise 6: connect observation model to stocks and flows

Draw two boxes labeled **observation model** and **stocks and flows**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from observation model to stocks and flows; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind representing populations as stocks connected by interpretable flows to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a compartment study with a flow diagram, conservation check, equilibrium analysis, parameter interpretation, uncertainty intervals, and a held-out trajectory or qualitative validation. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute compartment lab

Derive decay, Bass diffusion, two-compartment pharmacokinetics, SIR, and predator–prey equations from arrow diagrams. For each, identify conserved quantities, equilibria, identifiable parameter combinations, and one dataset that could falsify the structure. Compare a solution's qualitative behavior before fitting any numbers.
