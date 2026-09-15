---
title: Mathematical Modeling 11 - Populations and Compartments
date: 2026-09-14 20:00:06
categories: Mathematical Modeling
tags:
  - Population Models
  - Epidemics
  - Stability
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "Growth, diffusion, compartment, epidemic, and interacting-population models connected through equilibria, stability, and identifiable parameters."
---

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

