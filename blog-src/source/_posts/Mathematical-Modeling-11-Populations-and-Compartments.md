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
