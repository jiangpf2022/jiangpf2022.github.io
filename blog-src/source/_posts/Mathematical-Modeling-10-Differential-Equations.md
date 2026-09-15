---
title: Mathematical Modeling 10 - Differential Equations
date: 2026-09-14 20:00:07
categories: Mathematical Modeling
tags:
  - Differential Equations
  - Dynamical Systems
  - Physical Modeling
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A modeling workflow for constructing ODEs from rates, forces, geometry, and conservation laws, with physical examples and numerical checks."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **deriving change equations from forces, geometry, or conservation before choosing a numerical solver**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Predict angular motion from gravity and a displaced initial condition.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

Differential equations model mechanisms expressed as rates. The central question is not “which ODE should I memorize?” but “what balance or law determines the derivative of each state?”

## State, rate, and initial condition

Choose the smallest state vector $y(t)$ that makes the future determined by the present and inputs. Then write

$$
\dot y=F(t,y;\theta),\qquad y(t_0)=y_0.
$$

Parameters $\theta$ have units and sources. Initial conditions are part of the model; without them, an evolution law does not specify one trajectory.

Higher-order equations can be rewritten as first-order systems. If $\ddot q=f(q,\dot q,t)$, let $y_1=q$ and $y_2=\dot q$, giving $\dot y_1=y_2$ and $\dot y_2=f(y_1,y_2,t)$.

## Forces: the pendulum

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/ode-pendulum.svg" alt="Pendulum free-body geometry with exact and small-angle equations" loading="lazy">
  <figcaption>The exact restoring term is nonlinear. The familiar linear oscillator appears only after declaring the small-angle approximation.</figcaption>
</figure>

For a mass on a rigid rod of length $\ell$, torque balance gives

$$
\ddot\theta+\frac{g}{\ell}\sin\theta=0.
$$

For small angles, $\sin\theta\approx\theta$, so

$$
\ddot\theta+\frac{g}{\ell}\theta=0,
\qquad T\approx2\pi\sqrt{\frac{\ell}{g}}.
$$

The approximation has a domain. Comparing the nonlinear and linear models across initial angles is a validation of the simplification.

## Geometry: pursuit curves

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/ode-pursuit.svg" alt="Moving target and curved pursuer trajectories" loading="lazy">
  <figcaption>The target and pursuer must share one coordinate frame; the direction of the pursuer’s velocity changes continuously.</figcaption>
</figure>

If a pursuer at $p(t)$ always moves toward a target at $q(t)$ with speed $v_p$,

$$
\dot p(t)=v_p\frac{q(t)-p(t)}{\|q(t)-p(t)\|}.
$$

The target has its own motion law $\dot q(t)$. Capture time is an event defined by $\|p-q\|\le\varepsilon$, not just the end of an arbitrary simulation interval. Check whether speeds and geometry make interception possible.

## Conservation: a draining vessel

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/ode-draining-vessel.svg" alt="Water draining from a rounded vessel with depth dependent area" loading="lazy">
  <figcaption>Conservation supplies the balance equation, while vessel geometry and outlet physics supply its nonlinear terms.</figcaption>
</figure>

Let $h(t)$ be water depth. Conservation gives

$$
A(h)\frac{dh}{dt}=-a\sqrt{2gh},
$$

where $A(h)$ is the vessel's cross-sectional area and $a$ is outlet area. Geometry supplies $A(h)$; Torricelli's law supplies outflow. A hemispherical vessel therefore differs from a cylinder even with the same initial volume.

## Distributed systems: heat conduction

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/ode-heat-rod.svg" alt="Temperature profiles smoothing along a heated rod" loading="lazy">
  <figcaption>Diffusion progressively smooths sharp temperature gradients. Boundary and initial conditions determine which solution is relevant.</figcaption>
</figure>

A long rod with spatially varying temperature requires a partial differential equation,

$$
\rho c\frac{\partial T}{\partial t}
=k\frac{\partial^2T}{\partial x^2}-hP\frac{T-T_a}{A}.
$$

For steady state, $\partial T/\partial t=0$, reducing the model to an ODE in $x$. Boundary conditions such as fixed endpoint temperatures complete the problem. This example shows why the independent variable need not be time.

## Nondimensionalize

Choose characteristic scales $Y$ and $\tau$ and set $u=y/Y$, $s=t/\tau$. Dimensionless groups reveal which mechanisms dominate and reduce the number of independent parameters. They also improve numerical conditioning.

## Numerical solution and events

Numerical integration should report method, tolerances, time span, evaluation points, and event conditions. SciPy's `solve_ivp` solves first-order initial-value systems and supports event detection and multiple algorithms ([official documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html)).

Validate by reducing step size or tolerances, checking conserved quantities, comparing with an analytic special case, and testing limiting behavior. A visually smooth curve can still be numerically wrong.

A complete first numerical example uses the logistic model:

```python
import numpy as np
from scipy.integrate import solve_ivp

r, K, N0 = 0.35, 1000.0, 25.0

def logistic(t, y):
    return [r * y[0] * (1 - y[0] / K)]

t_eval = np.linspace(0, 30, 301)
sol = solve_ivp(logistic, (0, 30), [N0], t_eval=t_eval,
                rtol=1e-8, atol=1e-10)
assert sol.success
N = sol.y[0]
assert np.all(N >= 0) and np.all(N <= K * 1.001)
```

Now repeat with tighter tolerances, compare the trajectories, and verify that $N(t)$ initially grows almost exponentially and approaches $K$. Those checks are part of the solution, not optional cleanup.

## Guided workshop: derive, solve, and challenge an ODE

Suppose a room contains a pollutant with concentration $C(t)$, volume $V$, clean-air inflow $q$, and internal generation rate $g(t)$. Perfect mixing gives the balance

$$
V\frac{dC}{dt}=g(t)-qC(t).
$$

Every term has units pollutant mass/time. The left side is accumulation, $g$ is generation, and $qC$ is removal. This “accumulation = inflow − outflow + generation” pattern is reusable in tanks, heat, finance, populations, and inventories.

### Solve the simplest case by hand

For constant $g$ and $C(0)=C_0$,

$$
C(t)=\frac{g}{q}+\left(C_0-\frac{g}{q}\right)e^{-qt/V}.
$$

The equilibrium is $C^*=g/q$ and the time constant is $\tau=V/q$. After one $\tau$, the difference from equilibrium is multiplied by $e^{-1}$. These interpretations are more valuable than the algebra alone. They tell us that doubling ventilation halves equilibrium concentration and response time.

### Convert higher-order equations to first order

Numerical solvers expect $\dot y=F(t,y)$. For $m\ddot x+c\dot x+kx=f(t)$, define $y_1=x$ and $y_2=\dot x$:

$$
\dot y_1=y_2,
\qquad
\dot y_2=\frac{f(t)-cy_2-ky_1}{m}.
$$

Initial position and velocity are both required. Missing initial or boundary conditions are a modeling error, not a solver setting.

### Learn solver behavior

Explicit Runge–Kutta methods work well for many smooth, non-stiff systems. Stiff systems contain very different time scales and may force explicit methods to take tiny steps; implicit methods such as BDF or Radau can be more efficient. Diagnose stiffness from mechanism and solver behavior rather than choosing an implicit solver automatically.

Absolute tolerance controls errors near zero; relative tolerance scales with solution magnitude. Re-run with tighter tolerances and compare decision-relevant outputs, not only curves. Use event functions for threshold crossing, impact, depletion, or extinction so that the solver locates the time rather than relying on a coarse output grid.

### Estimate parameters responsibly

If concentration observations are $z_k=C(t_k;\theta)+\epsilon_k$, estimate $\theta=(q,g)$ by nonlinear least squares or likelihood. Plot residuals versus time and fitted value. Profile one parameter while refitting the other to reveal correlation. Short observations may identify $g/q$ but not $g$ and $q$ separately; this is practical identifiability.

### Extend only when evidence demands it

Perfect mixing may fail in a large room. A two-zone model adds near-source and far-field concentrations with exchange. Time-varying occupancy changes $g(t)$. Sensor delay adds a measurement model. Compare each extension against the simple model on held-out data and retain it only if it improves explanation or decisions.

### Practice

Derive the pollutant balance, solve the constant-input case, and verify the numerical solver against the analytic expression. Fit $q$ and $g$ to synthetic noisy data, calculate equilibrium and time constant, and test a step change in generation. Finally, create one dataset too short to identify both parameters and explain the ambiguity.

## All four derivation examples from the slides

### Pendulum

Torque balance about the pivot gives $ml^2\theta''=-mgl\sin\theta$, hence

$$\theta''+\frac gl\sin\theta=0.$$

Only for $|\theta|\ll1$ may $\sin\theta\approx\theta$, yielding period $T\approx2\pi\sqrt{l/g}$. Compare numerical nonlinear periods against this approximation as amplitude grows; the approximation's failure is part of the model.

### Pursuit at sea

The lecture places a 60-nautical-mile separation between a 60-knot patrol craft and a 30-knot submarine. If the pursuer always aims at the current target,

$$\dot r_p=v_p\frac{r_s-r_p}{\|r_s-r_p\|},\qquad \dot r_s=v_su_s(t).$$

This defines pure pursuit. Intercept prediction requires the submarine heading $u_s$, detection delay, and turning limits. Compare pure pursuit with a lead-intercept strategy that aims at a predicted meeting point; faster speed alone does not determine the best control law.

### Draining hemisphere

For water depth $h$ in a hemisphere of radius $R$, cross-sectional area is $A(h)=\pi(2Rh-h^2)$. Torricelli outflow through area $S$ is $Q=C_dS\sqrt{2gh}$. Conservation gives

$$\pi(2Rh-h^2)\frac{dh}{dt}=-C_dS\sqrt{2gh}.$$

Integrate from $h=R$ to $0$ for emptying time. The discharge coefficient $C_d$ captures a real jet's deviation from ideal flow and should be calibrated.

### Heated metal rod

A rod of length $l$, cross-section $A$, perimeter $B$, conductivity $\lambda$, ambient $T_3$, and convection coefficient $\alpha$ satisfies at steady state

$$\lambda A T''(x)-\alpha B[T(x)-T_3]=0,$$

with $T(0)=T_1$, $T(l)=T_2$. Setting $u=T-T_3$ gives $u''-m^2u=0$, $m^2=\alpha B/(\lambda A)$. The exponential/hyperbolic solution separates boundary forcing from environmental loss.

These four examples correspond to force balance, moving geometry, conservation with changing area, and distributed transport. Learning the derivation families is more transferable than memorizing four equations.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **deriving change equations from forces, geometry, or conservation before choosing a numerical solver**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Pendulum

**Here is the problem.** Predict angular motion from gravity and a displaced initial condition. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Draw the force balance, derive the nonlinear equation, then compare it with the small-angle approximation. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The approximation is useful only over an amplitude range where its phase and period errors are acceptable. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Pursuit curve

**Here is the problem.** A patrol boat continuously aims at a moving submarine. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Write both positions in one frame, convert the aiming rule into velocity components, and integrate with an event for capture. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Relative geometry, not memorized formulas, determines the differential equation. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Draining hemisphere

**Here is the problem.** Find water depth over time as liquid exits through a small opening. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Combine Torricelli outflow with the depth-dependent cross-sectional area and separate variables. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Conservation relates volume change to discharge; geometry supplies the nonlinear coefficient. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Heated rod

**Here is the problem.** Describe temperature along a metal rod over time. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Apply energy conservation to a short segment, pass to the diffusion PDE, and state boundary and initial conditions. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A PDE without boundary conditions is not a complete predictive model. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: state definition

Let us slow down at **state definition**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats state definition as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: deriving change equations from forces, geometry, or conservation before choosing a numerical solver. An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use state definition to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: rate balance

Let us slow down at **rate balance**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats rate balance as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: deriving change equations from forces, geometry, or conservation before choosing a numerical solver. An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use rate balance to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: initial conditions

Let us slow down at **initial conditions**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats initial conditions as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: deriving change equations from forces, geometry, or conservation before choosing a numerical solver. An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use initial conditions to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: boundary conditions

Let us slow down at **boundary conditions**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats boundary conditions as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: deriving change equations from forces, geometry, or conservation before choosing a numerical solver. An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use boundary conditions to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: nondimensionalization

Let us slow down at **nondimensionalization**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats nondimensionalization as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: deriving change equations from forces, geometry, or conservation before choosing a numerical solver. An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use nondimensionalization to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: numerical verification

Let us slow down at **numerical verification**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats numerical verification as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: deriving change equations from forces, geometry, or conservation before choosing a numerical solver. An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use numerical verification to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Pendulum

Let us revisit **Pendulum**, but this time you are doing the talking. The situation is still this: Predict angular motion from gravity and a displaced initial condition. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Draw the force balance, derive the nonlinear equation, then compare it with the small-angle approximation. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The approximation is useful only over an amplitude range where its phase and period errors are acceptable. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Pendulum in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Pursuit curve

Let us revisit **Pursuit curve**, but this time you are doing the talking. The situation is still this: A patrol boat continuously aims at a moving submarine. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Write both positions in one frame, convert the aiming rule into velocity components, and integrate with an event for capture. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Relative geometry, not memorized formulas, determines the differential equation. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Pursuit curve in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Draining hemisphere

Let us revisit **Draining hemisphere**, but this time you are doing the talking. The situation is still this: Find water depth over time as liquid exits through a small opening. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Combine Torricelli outflow with the depth-dependent cross-sectional area and separate variables. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Conservation relates volume change to discharge; geometry supplies the nonlinear coefficient. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Draining hemisphere in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Heated rod

Let us revisit **Heated rod**, but this time you are doing the talking. The situation is still this: Describe temperature along a metal rod over time. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Apply energy conservation to a short segment, pass to the diffusion PDE, and state boundary and initial conditions. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A PDE without boundary conditions is not a complete predictive model. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Heated rod in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect state definition to rate balance

Draw two boxes labeled **state definition** and **rate balance**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from state definition to rate balance; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind deriving change equations from forces, geometry, or conservation before choosing a numerical solver to remain auditable.

### Board exercise 2: connect rate balance to initial conditions

Draw two boxes labeled **rate balance** and **initial conditions**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from rate balance to initial conditions; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind deriving change equations from forces, geometry, or conservation before choosing a numerical solver to remain auditable.

### Board exercise 3: connect initial conditions to boundary conditions

Draw two boxes labeled **initial conditions** and **boundary conditions**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from initial conditions to boundary conditions; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind deriving change equations from forces, geometry, or conservation before choosing a numerical solver to remain auditable.

### Board exercise 4: connect boundary conditions to nondimensionalization

Draw two boxes labeled **boundary conditions** and **nondimensionalization**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from boundary conditions to nondimensionalization; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind deriving change equations from forces, geometry, or conservation before choosing a numerical solver to remain auditable.

### Board exercise 5: connect nondimensionalization to numerical verification

Draw two boxes labeled **nondimensionalization** and **numerical verification**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from nondimensionalization to numerical verification; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind deriving change equations from forces, geometry, or conservation before choosing a numerical solver to remain auditable.

### Board exercise 6: connect numerical verification to state definition

Draw two boxes labeled **numerical verification** and **state definition**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from numerical verification to state definition; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind deriving change equations from forces, geometry, or conservation before choosing a numerical solver to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a derivation notebook that includes the physical diagram, units of every term, limiting-case checks, numerical convergence, event handling, and comparison with an analytic or approximate case. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute derivation lab

For each example, write the state, rate law, initial/boundary conditions, units, and one limiting check. Numerically solve the nonlinear pendulum and pursuit system, integrate the draining model, and verify the rod solution at both boundaries. Finish by naming one omitted physical effect and the data needed to add it.
