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

## Forty-minute compartment lab

Derive decay, Bass diffusion, two-compartment pharmacokinetics, SIR, and predator–prey equations from arrow diagrams. For each, identify conserved quantities, equilibria, identifiable parameter combinations, and one dataset that could falsify the structure. Compare a solution's qualitative behavior before fitting any numbers.
