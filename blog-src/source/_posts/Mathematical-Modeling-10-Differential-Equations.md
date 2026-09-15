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

Differential equations model mechanisms expressed as rates. The central question is not “which ODE should I memorize?” but “what balance or law determines the derivative of each state?”

## State, rate, and initial condition

Choose the smallest state vector $y(t)$ that makes the future determined by the present and inputs. Then write

$$
\dot y=F(t,y;\theta),\qquad y(t_0)=y_0.
$$

Parameters $\theta$ have units and sources. Initial conditions are part of the model; without them, an evolution law does not specify one trajectory.

Higher-order equations can be rewritten as first-order systems. If $\ddot q=f(q,\dot q,t)$, let $y_1=q$ and $y_2=\dot q$, giving $\dot y_1=y_2$ and $\dot y_2=f(y_1,y_2,t)$.

## Forces: the pendulum

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

If a pursuer at $p(t)$ always moves toward a target at $q(t)$ with speed $v_p$,

$$
\dot p(t)=v_p\frac{q(t)-p(t)}{\|q(t)-p(t)\|}.
$$

The target has its own motion law $\dot q(t)$. Capture time is an event defined by $\|p-q\|\le\varepsilon$, not just the end of an arbitrary simulation interval. Check whether speeds and geometry make interception possible.

## Conservation: a draining vessel

Let $h(t)$ be water depth. Conservation gives

$$
A(h)\frac{dh}{dt}=-a\sqrt{2gh},
$$

where $A(h)$ is the vessel's cross-sectional area and $a$ is outlet area. Geometry supplies $A(h)$; Torricelli's law supplies outflow. A hemispherical vessel therefore differs from a cylinder even with the same initial volume.

## Distributed systems: heat conduction

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
