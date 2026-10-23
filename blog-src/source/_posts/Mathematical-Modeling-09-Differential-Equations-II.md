---
title: 10 - Coupled Differential-Equation Models
date: 2026-09-15 18:00:12
permalink: 2026/09/15/Mathematical-Modeling-10-Coupled-Differential-Equation-Models/
categories: Mathematical Modeling
tags: [Differential Equations, Compartment Models, Stability]
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 200
lesson_number: 10
lesson_level: 1
review_lock: false
excerpt: "Model interacting populations and compartments, analyze equilibria and stability, and connect coupled dynamics to real competition decisions."
---

Pull up a chair; today one variable refuses to stay alone. A product spreads because users talk to non-users. An infection grows because susceptible and infectious people meet. A predator changes the prey population, which later changes the predator population. The interesting behavior lives in the arrows between states.

The previous blog built single-state rate laws. Here we keep the same discipline—state, flow, conditions, evidence—but allow states to interact. We will derive diffusion, compartment, epidemic, and ecological systems; analyze equilibria and local stability; and finish with the 2020 CUMCM reflow-oven problem, where a temperature trajectory becomes a manufacturing decision. The goal is not to collect acronyms. It is to read a coupled system as a causal diagram written in calculus.

<div class="mm-key-box"><span class="mm-callout-label">Read every term as a flow</span><p>If $+\beta SI/N$ appears in one compartment, the same transfer should usually appear as $-\beta SI/N$ in another. Internal transfers cancel when the state equations are summed. That cancellation is the fastest structural check for a compartment model.</p></div>

## 1. Interaction Terms and Conservation

Let $x_i(t)$ be the amount in compartment $i$. A general balance is

$$\dot x_i=\sum_{j\ne i}q_{ji}(x)-\sum_{j\ne i}q_{ij}(x)+s_i(x)-\ell_i(x),$$

where $q_{ij}$ transfers material from $i$ to $j$, $s_i$ is external supply, and $\ell_i$ is external loss. Summing all equations cancels internal transfers:

$$\frac{d}{dt}\sum_i x_i=\sum_i s_i-\sum_i\ell_i.$$

If a closed population model creates people when equations are added, a sign or flow is missing.

Interaction form encodes assumptions. Mass action $\beta SI$ assumes well-mixed encounters and a rate proportional to both groups. Frequency-dependent transmission $\beta SI/N$ assumes contacts per individual do not grow with population density. Saturating response

$$\frac{aNP}{1+ahN}$$

allows a predator's consumption to level off because handling takes time. Choosing among them is a scientific decision, not decorative algebra.

### Draw arrows before writing derivatives

Coupled equations become much easier to audit when they begin as a directed graph. Each node stores a quantity. Each arrow is an event that removes an amount from one node and adds an amount to another. External sources and sinks cross the system boundary.

Suppose a campus dining hall tracks students in three states: waiting, eating, and finished. Arrivals enter the waiting state. Seating transfers a student from waiting to eating. Meal completion transfers a student from eating to finished. If $W,E,F$ are counts, a simple model is

$$
\dot W=\lambda(t)-s(W,E),
$$

$$
\dot E=s(W,E)-\mu E,
$$

$$
\dot F=\mu E.
$$

The seating flow $s$ appears once negative and once positive. The completion flow $\mu E$ does the same. Summing gives

$$
\frac{d}{dt}(W+E+F)=\lambda(t).
$$

No student disappears. If departures from the building matter, add an external loss from $F$ or redefine the boundary. The conservation statement depends on what the system includes.

The seating law must respect capacity. If the room has $K$ seats, a naive $s=\alpha W$ keeps moving students into a full dining room. One smooth law might decrease as $E$ approaches $K$; an event or minimum law can enforce hard capacity. The right representation depends on whether individual seats and blocking matter.

This example reveals a basic rule: do not write a positive term in a destination equation until you can point to the matching source or external supply. Do not write a negative term until you can say where the quantity went. Birth, death, reaction, and measurement may change totals, but those changes should be named.

### Stocks, flows, and rates per unit stock

A flow has units of stock per time. A rate constant usually has inverse-time units and must multiply a stock. The infection term $\beta SI/N$ has people per time if $\beta$ is per time, because $SI/N$ has people. The density-dependent term $\beta SI$ requires $\beta$ to have units person$^{-1}$ time$^{-1}$. These two coefficients cannot be compared numerically without their definitions.

For a chemical reaction $A+B\to C$, mass-action event rate can be $kAB$ in concentration units. Stoichiometry determines how each event changes every species:

$$
\dot A=-kAB,
\qquad
\dot B=-kAB,
\qquad
\dot C=kAB.
$$

If two molecules of $A$ are consumed, its coefficient becomes negative two. Summing raw molecule counts may not be conserved, but conserved atoms or mass are. Choose the correct invariant.

For a predator eating prey, one prey-removal event does not create one predator. Conversion efficiency $e$ links consumed prey biomass to predator growth. Writing equal positive and negative terms would imply perfect one-for-one conversion and ignore respiration.

The functional response encodes event frequency. Linear $aNP$ assumes consumption per predator grows without limit as prey increases. Holling type II

$$
\frac{aNP}{1+ahN}
$$

saturates at approximately $P/h$ because handling time limits each predator. A type III response can be sigmoidal and represent learning or refuge at low prey. The algebra is a hypothesis about encounters.

### Matrix form and transfer networks

Linear compartment systems can be written

$$
\dot x=Ax+Bu(t).
$$

For a closed transfer network, off-diagonal entry $A_{ij}$ is the rate from compartment $j$ into compartment $i$. Diagonal entries contain total rates leaving each compartment. With a column-vector convention, column sums are zero for a closed conserved system:

$$
\mathbf 1^TA=0.
$$

Different texts use row-vector conventions; never copy a matrix without checking orientation. Test it with one unit in one compartment and verify the initial derivative moves quantity along the intended arrows.

If all off-diagonal entries are nonnegative and inputs are nonnegative, the system is positive: nonnegative initial states remain nonnegative under suitable conditions. A negative off-diagonal transfer often signals a sign error. External clearance makes column sums negative, representing loss.

The matrix exponential gives

$$
x(t)=e^{At}x_0+
\int_0^t e^{A(t-s)}Bu(s)\,ds.
$$

This formula separates natural propagation from input response. Eigenvalues describe time scales, while eigenvectors describe modes. Two compartments can show a fast redistribution mode and a slow clearance mode even when individual transfer rates are not obvious in raw trajectories.

At steady state under constant input $u_0$, if $A$ is invertible and stable,

$$
x^*=-A^{-1}Bu_0.
$$

For a closed conserved network, $A$ has a zero eigenvalue and is not invertible; total quantity selects the equilibrium distribution. This is not a numerical failure. Conservation creates a family indexed by the total stock.

### Worked transfer network: medicine moving through a clinic

Let us slow down and build one complete transfer model rather than admiring the matrix notation from a distance. A clinic receives an intravenous medicine into the bloodstream, the medicine exchanges with tissue, and the kidneys remove it from blood. Call the blood amount $B(t)$ and the tissue amount $T(t)$, both measured in milligrams. An infusion $u(t)$ enters blood in milligrams per hour. Exchange from blood to tissue occurs at rate $k_{BT}B$; the reverse exchange is $k_{TB}T$; renal clearance removes $k_eB$.

The arrow ledger is short:

| event | source | destination | flow |
|---|---|---|---|
| infusion | outside | blood | $u(t)$ |
| distribution | blood | tissue | $k_{BT}B$ |
| return | tissue | blood | $k_{TB}T$ |
| clearance | blood | outside | $k_eB$ |

Now the equations are almost forced upon us:

$$
\dot B=u(t)-k_{BT}B+k_{TB}T-k_eB,
$$

$$
\dot T=k_{BT}B-k_{TB}T.
$$

Add them. The two exchange terms disappear, leaving

$$
\frac{d}{dt}(B+T)=u(t)-k_eB.
$$

That line is more than an algebra check. It says redistribution cannot change the total amount inside the patient. If a numerical simulation loses medicine while $u=0$ and $k_e=0$, the implementation is wrong. If measured total amount falls when clearance is present, the fall is physically interpretable rather than mysterious.

The matrix is

$$
A=\begin{bmatrix}
-(k_{BT}+k_e)&k_{TB}\\
k_{BT}&-k_{TB}
\end{bmatrix},
\qquad
b=\begin{bmatrix}1\\0\end{bmatrix}.
$$

Notice the orientation. The first column records what one unit in blood initially does: it leaves blood and enters tissue or the exterior. The second column records what one unit in tissue does: it returns to blood. With $k_e=0$, both columns sum to zero. With clearance, the first column sums to $-k_e$. This one-column-at-a-time reading is a reliable way to catch a transposed compartment matrix.

Suppose $k_{BT}=0.8$ h$^{-1}$, $k_{TB}=0.2$ h$^{-1}$, and $k_e=0.1$ h$^{-1}$. A ten-milligram bolus begins at $(B,T)=(10,0)$. The initial derivatives are

$$
\dot B(0)=-(0.8+0.1)10=-9,
\qquad
\dot T(0)=0.8(10)=8.
$$

The total initially falls at one milligram per hour, exactly $k_eB(0)$. Blood drops quickly because distribution is faster than clearance. Tissue rises even though no medicine is injected directly into it. Later, tissue can fall while briefly feeding blood. A single exponential fitted to blood concentration would confuse this redistribution phase with elimination.

This is why a steep early decline and a gentle late decline do not automatically prove two biological removal mechanisms. They can arise from one clearance mechanism plus exchange with a hidden compartment. Conversely, adding a second compartment solely because a curve has two slopes is not proof that the compartment is real. The structure needs supporting measurements, intervention, or a convincing physical interpretation.

Now imagine that only blood concentration $C_B=B/V_B$ is observed. The measured scale also depends on blood distribution volume $V_B$. Multiplying every amount and $V_B$ by the same factor leaves concentration unchanged, so dose information and units matter. If tissue is never measured, $k_{BT}$ and $k_{TB}$ can be strongly correlated. Taking several very early samples helps reveal the fast exchange; taking only late samples mainly informs the slow mode.

For a constant infusion $u_0$, no finite steady state exists when $k_e=0$: medicine keeps entering a closed system. When $k_e>0$, steady-state balance requires $u_0=k_eB^*$ and exchange balance requires $k_{BT}B^*=k_{TB}T^*$. Hence

$$
B^*=\frac{u_0}{k_e},
\qquad
T^*=\frac{k_{BT}}{k_{TB}}\frac{u_0}{k_e}.
$$

These relations make excellent hand checks. They also expose the consequence of a parameter: reducing kidney clearance raises both steady amounts, while changing exchange ratios reallocates medicine between compartments without changing the blood amount required to clear the infusion.

Finally, connect the model to a decision. If the purpose is to keep blood concentration inside a therapeutic window, the relevant outputs are peak concentration, time above toxicity, and time below efficacy. A model that reconstructs the observed blood curve but cannot predict those quantities under a new infusion schedule has not yet earned a dosing recommendation. The arrows, the observation model, and the decision metric must remain in the same story.

### Positivity, capacity, and invariant regions

Physical coupled models should often stay in a feasible region. Populations and concentrations remain nonnegative. Fractions remain between zero and one. A closed population may stay on $S+I+R=N$. A chemical system may preserve elemental balances.

Check vector directions on every boundary. If $x_i=0$ while other states are nonnegative, require $\dot x_i\ge0$ unless negative values have meaning. For SIR, at $I=0$ we have $\dot I=0$, so infection cannot become negative. At $S=0$, $\dot S=0$. The nonnegative orthant is invariant.

For a fraction $F$, verify $\dot F\ge0$ at zero and $\dot F\le0$ at one. The Bass diffusion law gives $\dot F=p$ at zero and zero at one, so it remains in the interval under nonnegative parameters.

Capacity can define a simplex or box. A numerical method can violate it even if the continuous system does not. Reducing step size or using a positivity-preserving method is preferable to clipping, because clipping changes balances. If a state represents an expectation and small negative solver error occurs, quantify it and show convergence.

### A complete arrow audit

Before solving a coupled model, make a flow ledger. For each flow, record its name, source, destination, expression, unit, sign in each equation, and evidence. Then perform five checks.

First, add all equations and verify internal transfers cancel with correct stoichiometry. Second, evaluate derivatives at zero and capacity boundaries. Third, set each mechanism to zero and inspect the reduced system. Fourth, identify equilibria that should exist, such as disease-free or empty states. Fifth, test a one-arrow toy configuration numerically.

For the dining hall, set arrivals to zero and begin with ten waiting and no one eating. Total inside-plus-finished remains ten. Set seating to zero and waiting stays ten. Set meal completion to zero and eating accumulates until capacity. These tiny cases isolate arrows better than testing the entire busy-day model at once.

<div class="mm-question-box"><span class="mm-callout-label">Flow-ledger challenge</span><p>A two-compartment model contains a transfer term $+k_{12}x_1$ in the second equation but no matching negative term in the first. Is this birth, an external copy process, or a mistake? The equations alone cannot tell you; the flow diagram and system boundary must.</p></div>

## 2. New-Product Diffusion

Let a market of size $M$ contain $A(t)$ adopters and $M-A(t)$ potential adopters. If adoption occurs through external advertising at rate $p$ and word of mouth at rate $qA/M$, then

$$\frac{dA}{dt}=\left(p+q\frac{A}{M}\right)(M-A).$$

With adoption fraction $F=A/M$,

$$\dot F=(p+qF)(1-F).$$

This is the Bass diffusion model. $p$ represents innovation independent of current users; $q$ represents imitation. When $q>p$, sales per unit time can rise and then fall. The cumulative curve is

$$F(t)=\frac{1-e^{-(p+q)t}}{1+(q/p)e^{-(p+q)t}},\qquad F(0)=0.$$

The peak adoption rate occurs at

$$F_*=\frac{q-p}{2q},\qquad
t_*=\frac{\ln(q/p)}{p+q}\quad(q>p).$$

Do not infer social influence merely because cumulative sales are S-shaped. Supply constraints, price changes, or a mixture of customer groups can generate similar shapes. Fit the model, inspect residuals, and compare with a no-imitation alternative.

### From monthly adoption counts to a defensible diffusion claim

Suppose a university releases a new campus-payment application. At the end of each month the cumulative numbers of registered users are $80$, $230$, $520$, $940$, $1{,}420$, and $1{,}830$. The visible S-shape tempts us to announce that word of mouth is working. Pause before doing that. Registrations may have accelerated because first-year students arrived, the old card system was disabled, or the app became available on another phone platform. The Bass model describes one possible mechanism, not the shape itself.

Begin with what the data actually measure. Cumulative registrations $A_k$ are stocks sampled at month ends. Monthly additions $A_k-A_{k-1}$ are interval flows. If accounts can be deleted or students leave the university, cumulative registrations are not the same as active adopters. If the decision concerns server capacity or payment volume, active use may be the relevant state. A perfectly fitted registration curve can still answer the wrong question.

For a first calculation, assume the market potential is $M=2{,}500$ and time is measured in months. The continuous model predicts the adoption flow

$$
g(A;p,q,M)=\left(p+q\frac{A}{M}\right)(M-A).
$$

A simple discrete approximation over one month is

$$
A_{k+1}\approx A_k+g(A_k;p,q,M).
$$

This Euler expression is useful for hand reasoning, but the exact ODE solution or numerical integration should be used for estimation when monthly changes are large. More importantly, compare predictions to interval additions rather than pretending that six cumulative points are independent. Errors in cumulative totals are serially connected because each total contains all earlier additions.

How do $p$ and $q$ reveal themselves? At launch, $A/M$ is small, so adoption is driven mainly by $pM$. Later, the $qA/M$ term grows and can create acceleration. Near saturation, $M-A$ dominates and adoption falls. Early observations inform $pM$, middle observations inform imitation, and late observations inform $M$. If the record stops before the slowdown, $M$ and $q$ may trade off: a larger market with weaker imitation can resemble a smaller market with stronger imitation.

That trade-off is a practical identifiability problem. Do not fix $M$ to the current number of students without thought. Alumni, staff, multiple accounts, and nonparticipating groups change the reachable market. Profile several plausible $M$ values, re-estimate $p$ and $q$, and examine whether the decision changes. If the task is to decide server capacity next semester, uncertainty in $M$ can matter more than the third decimal place of $q$.

Now compare mechanisms. A no-imitation model sets $q=0$ and produces monotone deceleration from the beginning. A time-varying advertising model allows $p(t)$ to jump during a campaign. A two-group model separates students and staff with different launch dates. A capacity-constrained model limits daily onboarding. Use the simplest alternative that represents a plausible rival explanation, then compare held-out monthly additions and residual patterns.

Suppose the fitted Bass model systematically underpredicts month four and overpredicts month five. That adjacent positive-negative residual may indicate a one-time campaign pulse, not random noise. If residuals alternate over many months, the time resolution or observation process may be wrong. If prediction error grows with adoption count, use a variance model appropriate for counts rather than equal-weight least squares.

The decision also determines the experiment. To test social influence, a randomized invitation or staggered release across residence halls is more informative than one aggregate curve. If treated halls adopt faster after accounting for external promotion, the imitation interpretation becomes more credible. If all halls jump on the same date, a campus-wide event is a stronger explanation.

Imagine two policies. Policy A spends heavily on launch advertising, raising $p$ for two months. Policy B rewards referrals, aiming to raise effective $q$. Simulate both under parameter uncertainty and report the distribution of time to $1{,}500$ active users, peak onboarding flow, and total cost. Referral incentives may work poorly when the initial user base is tiny; launch advertising may create the seed population from which imitation grows. The interaction between timing and state is precisely why a dynamic model is useful.

Do not report “the imitation coefficient is $0.37$” as if it were a personality trait of the campus. State its time unit, model, observation definition, period, and uncertainty. A defensible conclusion sounds like this: under the declared active-user definition and stable-policy assumption, the model attributes part of mid-semester acceleration to adoption pressure correlated with the existing user fraction; a campaign model remains a plausible alternative, and forecasts are sensitive to reachable market size. That sentence is less dramatic than “viral growth,” but it is much more useful.

<div class="mm-question-box"><span class="mm-callout-label">Interpret before fitting</span><p>Two products have the same eventual market size and nearly identical cumulative sales, but one has large $p$ and small $q$, while the other has small $p$ and large $q$. Which should respond more strongly to referral programs? What observations near launch would help distinguish them?</p></div>

### Derive Bass diffusion from two adoption channels

Let $F(t)$ be the fraction that has adopted. During a short interval, an unadopted person can adopt through external influence at rate $p$ or through contact with adopters at rate $qF$. The fraction still available is $1-F$. Therefore

$$
F(t+\Delta t)-F(t)
\approx[p+qF(t)][1-F(t)]\Delta t.
$$

Taking the limit gives the Bass equation. The factor $1-F$ prevents adoption beyond market size. External influence remains active when $F=0$; imitation needs existing adopters.

The instantaneous adoption flow, or sales rate when each person buys once, is

$$
f(t)=\dot F=(p+qF)(1-F).
$$

Treat this as a quadratic in $F$. Its derivative with respect to $F$ is

$$
\frac{df}{dF}=q-p-2qF.
$$

When $q\gt p$, the flow peaks at

$$
F_*=(q-p)/(2q).
$$

Substituting the closed-form $F(t)$ yields the peak time already stated. If $q\le p$, adoption flow is maximal at launch and declines; there is no imitation-driven rise.

This distinction gives interpretable diagnostics. A product with a clear delayed sales peak may have a strong imitation component, but supply, marketing, price, and cohort mixing can create the same pattern. The model is a candidate mechanism, not proof.

### Market potential is a state-scale parameter

Observed cumulative sales $A(t)=MF(t)$ depend on market potential $M$. If the data cover only early adoption, $M$ is weakly identified: a large market with modest penetration and a smaller market nearer saturation can show similar early counts. Parameter $q$ can compensate.

Do not set $M$ equal to the last observed cumulative sale unless the market is known to be saturated. That forces the curve to flatten at the dataset boundary. Use external demographic or eligibility evidence, estimate $M$ with uncertainty, or report forecasts across plausible market sizes.

Repeat purchases violate the once-only adoption interpretation. Sales can exceed market population, and replacements or subscriptions need additional flows. Distinguish adoption events from transaction volume. A model can track current users, churn, and re-entry if those mechanisms matter.

Product availability also constrains observed adoption. If supply is limited, sales equal the smaller of demand and inventory. Fitting Bass directly may interpret a supply ramp as social imitation. Include stock or restrict calibration to unconstrained periods.

### Estimation from cumulative and interval data

Cumulative observations have strongly correlated errors because each point contains previous sales. Fitting ordinary least squares to cumulative totals often gives visually impressive curves and understated uncertainty. Interval sales or a likelihood for adoption counts can be more appropriate.

If period $k$ begins with $A_k$ adopters, expected new adopters over a short interval are approximately

$$
\mu_k=[p+q(A_k/M)](M-A_k)\Delta t.
$$

Counts may use a Poisson or overdispersed distribution, with exact integration when intervals are not short. Marketing campaigns and seasonality can enter $p(t)$ as known or parameterized inputs. Do not let $p$ absorb every unexplained event without recording those inputs.

Estimate positive parameters on log scales and use multiple starts. Profile $M$, $p$, and $q$. Early data may identify initial growth combination while leaving market size broad. Forecast intervals should reflect that ridge.

Hold out a later block or a geographic market. Random point holdout from a smooth cumulative series is weak. If transferring to another market, covariates or hierarchical structure may be needed; copying $p,q$ assumes comparable external influence and social contact.

Residuals should be plotted for interval adoption, not only cumulative total. Long runs of positive residuals indicate a missed campaign or cohort. Weekly oscillation suggests seasonality. A sudden negative residual may be supply interruption rather than loss of interest.

### Interventions and counterfactuals

Advertising can raise $p(t)$. Referral programs may raise effective $q$, but only if they actually alter adopter-to-nonadopter influence. A campaign applied after most of the market has adopted has limited remaining population, even with strong rate increase.

Compare interventions under a budget. An early external campaign may seed adopters and accelerate imitation. A later referral campaign may leverage a larger base. Simulate time-varying controls with the same cost assumptions and measure cumulative adoption by a deadline, peak operational demand, and long-run incremental adoption.

Counterfactual claims require more than fitting one historical trajectory. Marketing timing may respond to sales: firms advertise when sales are weak or strong. Without an experimental or causal design, a time-varying coefficient association does not prove campaign effect. Use randomized regions, natural experiments, or cautious scenarios.

Cannibalization matters for multiple products. Adoption of one can reduce the remaining market of another, or complementary products can reinforce each other. A coupled system might use fractions $F_1,F_2$ with cross-effects, but parameters grow quickly. Add cross terms only with data or a decision that requires them.

Churn produces an active-user model:

$$
\dot A=[p+q(A/M)](M-A)-\delta A.
$$

Now equilibrium can lie below $M$, and cumulative historical adopters differ from current users. If churned users can return, add a return flow or distinguish susceptible history. The state definition follows the business question.

### Worked launch comparison

Suppose two launch plans have the same total advertising budget. Plan E spends early, temporarily increasing $p$ during the first month. Plan R waits and subsidizes referrals, increasing $q$ during months two and three. Use a baseline parameter range rather than one pair.

For each parameter scenario, integrate adoption and record adoption at months one, three, and twelve; peak new-adopter rate; and campaign cost. Peak matters because customer support and inventory can be overwhelmed. A plan that increases total adoption slightly but doubles a service peak may be unattractive.

Pair scenarios when comparing plans. Plot Plan E minus Plan R adoption at each horizon. Early advertising may dominate when imitation is weak or launch visibility is crucial; referral may dominate when $q$ is high and enough seed adopters exist. Identify the boundary in $q/p$ and market size where preference changes.

Now add supply capacity. If fulfillment can serve at most a fixed number per week, unmet adoption may wait or disappear. Accelerating demand beyond capacity can reduce satisfaction or effective future imitation. The product-diffusion model must connect to operations before campaign optimization.

Validate the chosen plan through leading indicators and update. Observe early adoption relative to scenario bands. If evidence supports lower $q$, shift budget toward external reach. This feedback policy is often safer than committing the entire budget to a parameter estimate made before launch.

<div class="mm-key-box"><span class="mm-callout-label">Diffusion modeling discipline</span><p>Separate market potential, adoption mechanism, transactions, supply, and intervention. An S-shaped cumulative curve is evidence of saturation-like geometry; it does not by itself identify word of mouth or establish a campaign's causal effect.</p></div>

## 3. Compartment Models and Tracer Experiments

Imagine a well-mixed tank of volume $V$ with inflow and outflow rate $Q$. Let $C(t)$ be solute concentration and $C_{in}(t)$ the inlet concentration. Solute mass is $VC$, so

$$V\frac{dC}{dt}=QC_{in}-QC,$$

or

$$\dot C=\frac{Q}{V}(C_{in}-C).$$

For constant $C_{in}$,

$$C(t)=C_{in}+[C(0)-C_{in}]e^{-t/\tau},\qquad \tau=V/Q.$$

$\tau$ is the residence time. After one $\tau$, 63.2% of the initial gap has disappeared.

Two communicating compartments with amounts $x_1,x_2$ can be written

$$\dot x_1=-k_{12}x_1+k_{21}x_2+u(t),$$

$$\dot x_2=k_{12}x_1-k_{21}x_2-k_e x_2.$$

The transfer terms cancel in $\dot x_1+\dot x_2$; only input and external clearance remain. This structure appears in pharmacokinetics, pollutant transport, heat exchange, and customer movement. Before estimating rates, ask what is actually observed. If only $x_1+x_2$ is measured, separate transfer rates may be weakly identifiable.

### One tank teaches the entire balance grammar

Suppose a tank holds a fixed volume because inflow equals outflow. The stored solute mass is $M=VC$. Inflow carries mass at $QC_{in}$ and outflow carries $QC$ under perfect mixing. The balance

$$
\dot M=Q(C_{in}-C)
$$

becomes the concentration equation after dividing by constant $V$.

The analytical solution under constant input is an exponential relaxation. The initial gap from inlet concentration decays with time constant $\tau=V/Q$. At one residence time, the gap is $e^{-1}$ of its initial value; at three, about five percent remains.

Perfect mixing is a physical assumption. It means outlet concentration equals the bulk state immediately. A long basin may behave more like plug flow; a poorly mixed tank may contain dead zones and short-circuit paths. A tracer experiment distinguishes them. Inject a pulse or step of inert tracer and compare outlet response with candidate residence-time distributions.

If volume changes because inflow and outflow differ, use mass $M$ and volume $V$ as states:

$$
\dot V=Q_{in}-Q_{out},
$$

$$
\dot M=Q_{in}C_{in}-Q_{out}\frac MV-R(M,V).
$$

Deriving concentration directly requires a product-rule dilution term. Modeling mass and volume often reduces mistakes and preserves conservation.

Suppose a reaction removes solute at first-order rate $kM$. Then concentration under constant volume satisfies

$$
\dot C=\frac QV C_{in}-\left(\frac QV+k\right)C.
$$

The steady concentration and time constant both change. Flow and reaction effects may be separated by experiments at several $Q/V$ values; one run mainly identifies their sum.

### Two compartments and modal behavior

Return to two amounts. In matrix form without input,

$$
\dot x=
\begin{bmatrix}
-k_{12}&k_{21}\\
k_{12}&-(k_{21}+k_e)
\end{bmatrix}x.
$$

When $k_e=0$, column sums are zero and total amount is conserved. One eigenvalue is zero, corresponding to total mass, and the other is $-(k_{12}+k_{21})$, corresponding to redistribution. Amounts approach a fixed ratio while preserving total.

With elimination, both eigenvalues have negative real parts under positive rates. A fast mode often represents distribution between compartments; a slow mode represents overall elimination. Observed concentration in the first compartment can show a rapid initial decline followed by a slower tail even though every equation is linear.

In pharmacokinetics, $x_1$ may be central amount and $x_2$ peripheral amount. Concentration observation is $C_1=x_1/V_1$. Transfer clearances are often parameterized so units remain transparent. A bolus dose is a jump in central amount; an infusion is a continuous input.

If only late central samples are available, the fast distribution mode may be missed. If only early samples are available, slow clearance is poorly estimated. Sampling times should span both scales. The eigenvalues guide design before data collection.

### Identifiability from what is measured

Imagine observing only total $y=x_1+x_2$. With no elimination, $y$ is constant regardless of $k_{12}$ and $k_{21}$. Transfer rates are completely invisible. More precise total measurements do not help. Observe at least one compartment separately or perturb and measure a compartment-specific output.

With elimination from compartment two, total derivative is

$$
\dot y=-k_e x_2+u(t).
$$

Total output contains indirect information about $x_2$, but transfer and elimination parameters may remain correlated. Sensitivity and profile analysis should quantify this.

Structural identifiability asks whether ideal noise-free continuous observations uniquely determine parameters. Practical identifiability adds finite noisy samples. A parameter can be structurally identifiable yet practically uncertain because the experiment barely excites its mode.

Input design helps. A short pulse reveals fast distribution; a sustained infusion emphasizes equilibrium and clearance. Multiple initial or input conditions can break parameter trade-offs. Choose inputs within safety and operational constraints.

### More compartments are not automatically more truth

Adding a third compartment can improve a fit because sums of exponentials are flexible. But each state needs an interpretation, transfer path, and identifiable time scale. If the extra mode is faster than the first sample or slower than the entire study, its coefficient is not supported.

A chain of compartments can approximate a delay or residence-time distribution. This can be useful even when individual compartments are not literal organs or tanks, provided their aggregate role is stated. Avoid overinterpreting phenomenological stages.

Model selection should evaluate held-out prediction and decision effect. If a two- and three-compartment model give the same dosing decision across uncertainty, the simpler model may be preferable. If peak tissue exposure depends on the third compartment and data support it, complexity matters.

Use conservation and positivity in every model. Transfer matrices should have nonnegative off-diagonal entries. Doses and initial amounts should be nonnegative. Clearance should reduce total amount. A solver producing negative concentration under these conditions requires numerical investigation.

### Worked tracer design

A treatment wetland is suspected of containing a short-circuit flow and a slow storage zone. Inject an inert tracer at the inlet and measure outlet concentration. A two-region model has mobile amount $x_m$ and storage amount $x_s$, with exchange and mobile outflow.

The early outlet peak reflects direct mobile travel; the long tail reflects release from storage. Fit a one-region model first. If it cannot reproduce both peak and tail across repeated tests, add the storage state. Estimate parameters jointly across flow rates to test whether exchange scales physically.

Mass recovery is a crucial check. Integrate outlet tracer mass and compare with injected mass plus remaining storage. Low recovery may indicate unmeasured loss, sampling duration too short, or sensor bias. A fitted curve normalized to peak can hide missing mass.

Validate under a different flow. If the two-region mechanism is meaningful, it should predict how residence times and exchange signatures change. A model fitted separately to every flow has weaker explanatory value.

The management conclusion might be that nominal hydraulic volume overstates effective contact time because a fraction bypasses treatment. The model can estimate a flow limit or redesign benefit. Report parameter uncertainty and how it changes compliance, not only tracer fit.

<div class="mm-key-box"><span class="mm-callout-label">Compartment evidence</span><p>An arrow diagram establishes accounting; an input excites modes; sensors determine which modes are visible; invariants verify implementation; and held-out perturbations test whether inferred transfer rates predict beyond one curve.</p></div>

## 4. Epidemic Models and Thresholds

In an SIR model, $S,I,R$ are susceptible, infectious, and removed populations:

$$\dot S=-\beta\frac{SI}{N},$$

$$\dot I=\beta\frac{SI}{N}-\gamma I,$$

$$\dot R=\gamma I.$$

Summing gives $\dot S+\dot I+\dot R=0$, so $N$ is conserved. Early in an outbreak $S\approx S_0$, hence

$$\dot I\approx\left(\beta\frac{S_0}{N}-\gamma\right)I.$$

The infection initially grows when

$$\mathcal R_{\mathrm{eff}}(0)=\frac{\beta}{\gamma}\frac{S_0}{N}>1.$$

The basic reproduction number is $\mathcal R_0=\beta/\gamma$ in a fully susceptible population. It is a threshold under this model, not a universal biological constant. Contact patterns, time-varying behavior, reporting delay, and heterogeneous susceptibility can all require extensions.

At the infection peak, $\dot I=0$ with $I>0$, so

$$S_{\text{peak}}=\frac{\gamma N}{\beta}=\frac{N}{\mathcal R_0}.$$

The epidemic stops growing before every susceptible person is infected. The final size follows the implicit relation

$$\ln\frac{S_\infty}{S_0}=-\mathcal R_0\frac{R_\infty-R_0}{N}.$$

This explains why repeated outbreaks in a population need not affect everyone and why total reach can show stable patterns under similar conditions—the question raised in the original course material.

<figure class="mm-article-figure mm-article-figure--compact"><img src="/images/mathematical-modeling/visual-evidence/086-reaction-pathway.svg" alt="Compartment transitions shown as a reaction pathway"><figcaption>A compartment diagram should make every transfer visible before the rate equations are written.</figcaption></figure>

### Build SIR from infection and removal events

In a closed population, an infection event transfers one person from susceptible to infectious. A removal event transfers one person from infectious to removed. The same event rate therefore appears with opposite signs.

Why use $\beta SI/N$? Suppose each infectious person makes $c$ potentially transmitting contacts per day. Under homogeneous random mixing, the probability a contacted person is susceptible is $S/N$. If transmission probability per contact is $p_t$, total new infections per day are

$$
I\,c\,p_t\frac SN.
$$

Define $\beta=cp_t$. This is frequency-dependent contact. It assumes contact count per infectious person stays roughly constant as population size changes.

In a density-dependent setting, contact count can increase with density, leading to $\tilde\beta SI$. The choice changes scaling across population sizes. State whether $S,I,R$ are counts or fractions and define coefficient units.

Removal rate $\gamma I$ corresponds to exponentially distributed infectious durations with mean $1/\gamma$. If duration is more concentrated, divide infection into several sequential stages. The total duration then follows an Erlang-like distribution and epidemic timing changes.

The SIR invariant follows immediately:

$$
\dot S+\dot I+\dot R=0.
$$

With nonnegative initial states summing to $N$, the trajectory remains on that simplex. This is an exact numerical check.

### Threshold, peak, and final size

Early growth rate is

$$
r_{early}=\beta S_0/N-\gamma.
$$

An observed early exponential slope identifies this difference, not $\beta$ and $\gamma$ separately. Independent information on infectious duration helps separate them.

The effective reproduction number is

$$
\mathcal R_{eff}(t)=\frac\beta\gamma\frac{S(t)}N.
$$

Incidence grows while it exceeds one and falls after it drops below one under constant parameters. At peak infectious prevalence, $S=N/\mathcal R_0$ if an interior peak occurs.

Derive final size by dividing the first and third equations:

$$
\frac{dS}{dR}
=-\frac\beta{\gamma N}S.
$$

Integrate from initial to final states:

$$
\ln\frac{S_\infty}{S_0}
=-\mathcal R_0\frac{R_\infty-R_0}{N}.
$$

The notation $R_0$ here is the initial removed count; it should not be confused with $\mathcal R_0$. Use a different symbol such as $R(0)$ in prose to avoid ambiguity.

Final size is implicit because $R_\infty=N-S_\infty$ when $I_\infty=0$. Solve numerically and check the root lies in the physical interval. Multiple mathematical roots can include the trivial no-outbreak solution under limiting initial infection; choose based on initial conditions.

The fact that $S_{peak}$ remains positive explains why infection starts declining before susceptibles are exhausted. The final susceptible count is smaller than $S_{peak}$ because infections continue while $I$ declines. “Herd immunity threshold” is therefore not identical to final epidemic size.

### Observation is not infection state

Reported cases are delayed, undercounted observations of infection events or symptom onset, not the state $I(t)$. A measurement model might convolve incidence with a delay distribution and multiply by a reporting fraction:

$$
E[y_t]=\rho
\sum_{s\le t} \text{incidence}_s g(t-s).
$$

Weekday reporting patterns add another observation effect. Fitting $I(t)$ directly to reported daily cases shifts timing and biases rates.

Prevalence and incidence differ. Prevalence is the number currently infectious. Incidence is new infections per time, $\beta SI/N$. A survey measuring active infection and a case-count series observe different quantities. Label axes precisely.

Serology can inform cumulative infection but has sensitivity, specificity, and waning. Hospitalizations and deaths have longer delays and severity variation. Joint observation can strengthen inference if links are modeled honestly; adding streams with inconsistent definitions can worsen it.

### Extensions should answer a diagnosed failure

An exposed compartment creates SEIR:

$$
\dot S=-\beta SI/N,
$$

$$
\dot E=\beta SI/N-\sigma E,
$$

$$
\dot I=\sigma E-\gamma I,
$$

$$
\dot R=\gamma I.
$$

Mean latent duration is $1/\sigma$. This delays infectious growth but does not automatically change the total final size under every assumption. Add it when incubation timing affects forecasts or interventions.

Births and waning immunity can replenish susceptibility, allowing endemic equilibrium. Vaccination transfers susceptible people to protected states with efficacy and timing. Age structure replaces homogeneous contact with a contact matrix. Spatial structure connects regional compartments through movement.

Time-varying $\beta(t)$ can represent behavior or interventions, but a freely varying function can fit almost anything. Link it to policy dates, mobility, seasonality, or a regularized latent process and acknowledge causal ambiguity.

Heterogeneous susceptibility or contact changes thresholds and final size. High-contact individuals may be infected earlier, reducing later transmission more than homogeneous mixing predicts. Aggregating them into one average can misestimate intervention effects.

### Intervention as control and counterfactual

Suppose an intervention reduces contact through control $u(t)$:

$$
\beta(t)=\beta_0[1-u(t)],
\qquad 0\le u\le u_{max}.
$$

Possible objectives include peak prevalence, cumulative infections, intervention burden, or time above hospital capacity. These objectives conflict. Minimizing infections with no cost on $u$ simply chooses maximum control throughout.

Capacity can be an explicit constraint $I(t)\le I_{cap}$. A feasible policy may need early action because control affects infection after latent and reporting delays. Waiting until observed hospital occupancy reaches capacity can be too late.

Compare trigger policies rather than one perfect open-loop schedule. For example, strengthen control when predicted occupancy exceeds an upper threshold and relax below a lower threshold. Include observation delay, compliance, and actuation limits. Hysteresis prevents rapid switching.

Counterfactual evaluation is difficult because the intervention changes behavior and observed transmission. A fitted time-varying $\beta$ after intervention does not reveal what would have happened without it. Use causal designs, external evidence, and scenario language.

### Worked outbreak with hand checks

Consider $N=100{,}000$, initial $I=100$, $R=0$, infectious duration five days so $\gamma=0.2$ day$^{-1}$, and $\mathcal R_0=1.8$. Then $\beta=0.36$ day$^{-1}$. Initial effective reproduction is approximately $1.798$ because almost everyone is susceptible.

Initial exponential growth rate is roughly

$$
r_{early}=0.36(0.999)-0.2\approx0.160\text{ day}^{-1}.
$$

The corresponding doubling time is about $\ln2/0.160$, around 4.3 days. This hand estimate should match early simulation before susceptibility changes.

Peak occurs when susceptible count reaches

$$
S_{peak}=N/1.8\approx55{,}556.
$$

This does not give peak $I$ directly, but an invariant can. Dividing $\dot I$ by $\dot S$ and integrating yields

$$
I+S-\frac{N}{\mathcal R_0}\ln S=\text{constant}.
$$

Evaluate it initially and at $S_{peak}$ to calculate nominal peak prevalence. This provides a nontrivial simulation check.

Now apply a control reducing $\beta$ by 40% for thirty days. During control, nominal reproduction becomes $1.08$ at full susceptibility, still slightly above one. Early intervention slows rather than immediately reverses growth. A 50% reduction gives $0.9$ initially and should cause decline while maintained.

When control ends, remaining susceptibility can permit a new wave. Compare peak, cumulative infection, and timing. A policy that only delays the wave may still be valuable for capacity or vaccination, but should not be described as eliminating it.

### Worked policy comparison: protect capacity without hiding assumptions

Turn the outbreak calculation into a decision problem. A university residence system has $N=20{,}000$ students, an estimated infectious duration of four days, and an initial effective reproduction number near $1.6$. The health service can recommend reduced-contact measures, but the cost rises with their intensity and duration. Its immediate safety concern is not an abstract reproduction number; it is whether simultaneous infectious cases exceed the isolation and clinical-support capacity of $I_{cap}=500$.

We could write an objective such as

$$
J(u)=w_I\int_0^T I(t)\,dt
+w_C\int_0^T u(t)^2\,dt
+w_H\int_0^T [I(t)-I_{cap}]_+^2\,dt,
$$

where $[z]_+=\max(0,z)$. The first term represents cumulative infectious burden, the second intervention burden, and the third capacity violation. The weights are not mathematical facts. They express institutional priorities. Before optimizing them, show several policy outcomes so decision makers can see what the weights would trade.

Consider three transparent policies. The baseline applies no additional control. The fixed policy reduces contacts by $35\%$ for six weeks beginning immediately. The trigger policy activates the same reduction when estimated infectious prevalence exceeds $300$ and releases it only after prevalence falls below $150$. The two thresholds create hysteresis and prevent switching every time a noisy estimate crosses one line.

Before simulation, calculate what the control can achieve. With $mathcal R_0=1.6$, a $35\%$ contact reduction gives the controlled reproduction number

$$
\mathcal R_c=1.6(1-0.35)=1.04
$$

at full susceptibility. That is barely above one. The intervention slows growth but does not guarantee immediate decline. If the institution expects rapid reversal, either stronger control or additional mechanisms are necessary. This thirty-second calculation prevents a polished optimizer from selling an impossible promise.

Suppose a $45\%$ reduction is feasible. Then $\mathcal R_c=0.88$ initially, so infection tends to decline while control is active. Yet releasing control can restore growth if susceptibility remains high. The fixed six-week policy might flatten the first wave and create a later wave after students resume contact. The trigger policy may cycle, trading a longer total control duration for lower peak occupancy. Neither dominates until the decision criteria are stated.

Now include observation. The university does not see $I(t)$ directly. It sees positive tests after delays, with incomplete testing. Let the estimated prevalence be $\hat I(t)$ from a reporting model. A trigger based on reported cases can activate several days late. Simulate the decision with that delayed estimate, not with perfect state knowledge. A policy that works only when the controller sees the invisible true state is not deployable.

Parameter uncertainty must also reach the policy. Let infectious duration vary from three to six days and the uncontrolled reproduction number from $1.3$ to $2.0$, with credible correlation rather than all arbitrary combinations. A policy that keeps $I<500$ in the nominal simulation but exceeds capacity in half of the plausible scenarios is not “capacity safe.” Report violation frequency or, for a robust requirement, enforce the limit across a declared scenario set.

There is a subtle comparison issue. If the trigger policy activates more often in severe scenarios, it also pays more intervention cost precisely where it prevents more harm. Comparing only average burden without reporting control days hides that adaptation. Put peak infection, infections over the horizon, days under control, maximum capacity margin, and worst scenario in one table. Let the reader see the exchange.

The same discipline applies when vaccination is available. If a fraction $v$ is vaccinated with efficacy $e$, a rough initial susceptible fraction becomes $1-ev$ under simple all-or-nothing protection. Initial growth is prevented when

$$
\mathcal R_0(1-ev)<1.
$$

For $\mathcal R_0=1.6$ and $e=0.8$, this idealized threshold is

$$
v>\frac{1-1/1.6}{0.8}\approx0.469.
$$

This number is not a promise that vaccinating $46.9\%$ of students ends every outbreak. It assumes homogeneous mixing, immediate and stable protection, and accurate $\mathcal R_0$. Clustering of unvaccinated students, waning, variants, and delayed uptake change the result. The calculation is a benchmark around which scenarios should be organized.

Finally, be careful with causal language. If cases decline after a policy begins, the policy may have helped, but behavior could have changed earlier, testing could have changed, or the outbreak could already have been near its peak. Compare model-implied counterfactuals with external evidence and describe them as conditional. A responsible recommendation might say: under the fitted transmission and reporting assumptions, the stronger policy is the only tested option that keeps nominal peak demand below capacity; under the upper transmission scenarios even it needs earlier activation or added vaccination, and the conclusion should be updated as delay and prevalence estimates improve.

That recommendation is longer than “choose $u=0.45$,” but it tells the decision maker what is protected, what is paid, and what could break. That is the difference between solving an ODE and using one.

### Parameter inference and uncertainty

Estimate parameters through the observation process. Use a likelihood appropriate for overdispersed counts and delays. Include initial conditions as uncertain when surveillance starts after transmission. Multiple starts and profile likelihoods are essential because growth rate, initial infection, reporting fraction, and intervention timing can trade off.

Early data identify a growth rate; generation-interval evidence helps translate it to $\mathcal R_0$. Different infectious-period assumptions give different reproduction numbers from the same curve. Report that dependence.

Validate forecasts prospectively or on held-out waves and regions. A model updated daily and evaluated only after seeing all data is a reconstruction system, not a tested forecasting system. Archive forecast vintages.

Scenario uncertainty may dominate statistical intervals. Behavior, policy, and variants change structure. Present conditional forecasts under declared assumptions. A narrow confidence band conditional on fixed future $\beta$ is not a complete uncertainty statement.

Sensitivity should focus on policy conclusions. If hospital capacity exceedance depends strongly on reporting delay or severity, collect and update those data. If all plausible parameter sets exceed capacity without intervention, exact $\beta$ precision may not be the immediate priority.

### Communication and ethical boundaries

Epidemic outputs can influence real behavior and policy. Explain what states and observations mean. Avoid implying certainty about individuals from population averages. Report uncertainty and scenario conditions near every forecast.

Distinguish descriptive fit, mechanistic inference, and causal intervention effect. A model can reproduce cases without proving why transmission changed. A mechanism can be plausible without uniquely identified parameters. A policy can look effective in simulation without real-world compliance evidence.

Protect privacy in granular mobility or health data. Aggregation, access controls, and ethical review are part of the modeling system. Fairness matters when contact, exposure, and intervention burden differ across groups.

The introductory SIR model remains valuable because every extension can be compared with it. It teaches flows, conservation, thresholds, depletion, and observation. Its simplicity becomes a strength when used as a baseline and a weakness only when presented as complete reality.

<div class="mm-key-box"><span class="mm-callout-label">Epidemic evidence chain</span><p>Contact assumptions justify incidence; flow cancellation verifies accounting; early growth and duration inform thresholds; an observation model links hidden infections to data; held-out forecasts test prediction; and conditional scenarios—not one certain curve—support policy discussion.</p></div>

## 5. Diagnostic Dynamics and Glucose Regulation

A diagnostic measurement is often a dynamic response, not a static number. Consider a simplified glucose–insulin system after a glucose challenge:

$$\dot G=-k_G(G-G_b)-XG+u_G(t),$$

$$\dot X=-k_XX+k_I(I-I_b),$$

$$\dot I=-k_I^{c}(I-I_b)+u_I(G).$$

$G$ is glucose, $I$ insulin, and $X$ an effective insulin-action state. Baseline values are $G_b,I_b$. A high glucose reading may arise from weak insulin secretion, slow insulin action, or both. A time series after a controlled challenge helps separate mechanisms better than one threshold measurement.

The model is intentionally simplified. Its value is not to diagnose a patient by itself, but to demonstrate experimental design: perturb the system, observe relaxation, and estimate time scales. Parameters should be compared only under the same protocol and units. Clinical use requires validated measurement models, population variability, and medical oversight.

### Why a challenge test is informative

A static fasting measurement compresses several mechanisms into one number. After a controlled glucose challenge, timing and shape reveal more. A rapid insulin response with quick glucose recovery differs from delayed secretion or weak tissue response even if one sample happens to match.

This is a general system-identification principle: apply a known perturbation and observe relaxation. A bridge impulse test, tracer injection, heater step, and glucose challenge all excite hidden dynamics. The input must be measured and standardized enough to compare responses.

In the simplified model, $X$ represents delayed insulin action rather than a directly observed concentration. It filters insulin deviations through a first-order process. If insulin rises, $X$ builds with time scale $1/k_X$ and increases glucose removal. When insulin returns to baseline, $X$ decays.

The product $XG$ means the absolute removal associated with a given action state is larger at higher glucose. Units must make $X$ an inverse-time effect. If data are normalized, explain how baseline and scale transformations affect coefficients.

### Baselines and equilibrium checks

At no challenge, $G=G_b$, $I=I_b$, $X=0$ should be an equilibrium. Substitute these values. Every deviation and input term should vanish. If it does not, baseline definitions are inconsistent.

After a brief input ends, a stable model should return toward baseline under appropriate positive rates. Linearize around baseline by writing $g=G-G_b$ and $i=I-I_b$. The product $XG$ is approximately $G_bX$ for small deviations, producing a linear system whose eigenvalues describe recovery time scales.

If an eigenvalue has a positive real part under nominal physiological parameters, either the model predicts unstable baseline or a sign is wrong. This local check should precede fitting.

The total glucose response can be summarized by peak, time to peak, area above baseline, time to recovery band, and late residual. Different mechanisms affect these metrics differently. Use them as descriptive checks, not substitutes for the full trajectory.

### Observation and protocol details

The administered glucose input is not always an instantaneous impulse. Oral absorption spreads it over time and depends on gastric emptying. An intravenous challenge has a different input. Modeling the wrong input can make secretion or action appear delayed.

Represent an oral input through a gut compartment if necessary:

$$
\dot A_g=-k_aA_g,
\qquad
u_G(t)=Fk_aA_g/V_G.
$$

Now absorption rate and physiological response may trade off. Insulin measurements or independent absorption information help separate them.

Sampling times matter. Dense early measurements capture peak and delay; later measurements capture recovery. If only fasting and two-hour values are observed, detailed dynamic parameters are unlikely to be identifiable. A classification rule may still be validated, but do not overinterpret mechanism.

Assay noise, meal history, exercise, stress, and circadian timing can affect response. Standardize protocol and treat between-day variation separately from within-assay error. Repeated tests on some individuals help quantify variability.

### Fit nested mechanisms, not one giant model

Begin with a descriptive baseline such as exponential recovery after peak. Then fit a glucose-only regulatory model. Add measured insulin and delayed action if residuals and the decision justify them. Add nonlinear secretion saturation or hepatic production only when evidence indicates systematic failure.

For each model, inspect held-out trajectories and parameter profiles. A lower residual from six extra parameters is not enough. Check whether the model predicts a changed input dose or a repeated test.

Parameters can be confounded. Strong insulin secretion with weak action can resemble weak secretion with strong action in glucose alone. Joint glucose and insulin trajectories improve separation, but the latent $X$ process still creates uncertainty.

Use hierarchical models when estimating individual responses from sparse samples. Population distributions stabilize estimates while allowing variation. Report shrinkage and uncertainty; an individual parameter estimate partly informed by the population should not be portrayed as purely personal measurement.

### From trajectory to a cautious classification

Suppose the task is to flag responses for further clinical review. Define a validated score from interpretable trajectory features or model outputs. Select a threshold using separate data and report sensitivity, specificity, calibration, and uncertainty. Prevalence affects predictive values.

Avoid using the same dataset to choose model, tune threshold, and report performance. Use nested validation or an external cohort. Missing or censored samples need a declared rule. Compare with existing simple criteria; a dynamic model must demonstrate added value.

Robustness across devices, protocols, demographic groups, and medications matters. A model validated in one population may not transfer. Analyze error by relevant subgroups without treating group membership as biological destiny.

Clinical decisions require medical standards and oversight beyond this educational model. The mathematical contribution is a transparent dynamic representation, experiment design, and uncertainty-aware evaluation. It should support, not replace, validated care.

### A nonmedical analogy: diagnosing a building

The same logic applies to a building's thermal response. Apply a known heater pulse, observe indoor temperature, and infer heat capacity and loss time scale. A slow rise can mean large capacitance or weak heater; a fast fall can mean high loss or open windows. One temperature snapshot cannot separate them.

Measure input power and outdoor temperature, sample during rise and decay, fit nested models, and validate on another pulse. Hidden wall temperature plays a role like delayed action $X$. This analogy helps isolate the modeling method from the medical context.

In both systems, a perturbation reveals internal dynamics. The challenge must be known, the observation model explicit, and parameters interpreted only within the validated protocol. That is the transferable lesson.

<div class="mm-key-box"><span class="mm-callout-label">Dynamic diagnosis</span><p>A challenge-response experiment can separate mechanisms that a static measurement cannot, but only when input timing, observation error, latent-state interpretation, identifiability, and held-out validation are treated as part of the model.</p></div>

## 6. Equilibria and Local Stability

For $\dot x=f(x)$, an equilibrium $x^*$ satisfies $f(x^*)=0$. Perturb it by $x=x^*+\eta$. First-order Taylor expansion gives

$$\dot\eta\approx J(x^*)\eta,\qquad
J_{ij}=\frac{\partial f_i}{\partial x_j}.$$

If all eigenvalues of $J$ have negative real parts, the equilibrium is locally asymptotically stable. Any positive real part makes it unstable. Purely imaginary eigenvalues require higher-order analysis; linearization alone is inconclusive.

For logistic growth $f(N)=rN(1-N/K)$, equilibria are $0$ and $K$. Since

$$f'(N)=r(1-2N/K),$$

$f'(0)=r>0$ makes extinction unstable for $r>0$, while $f'(K)=-r<0$ makes carrying capacity stable.

Stability is not the same as robustness. Stability asks whether small state perturbations decay under a fixed model. Robustness asks whether conclusions survive uncertain parameters, structures, or data.

### Find equilibria before simulating trajectories

An equilibrium is a state where every derivative is zero. Solving $f(x)=0$ can reveal multiple long-run regimes, thresholds, and impossible parameter combinations before numerical integration.

For a two-state system

$$
\dot x=f(x,y),
\qquad
\dot y=g(x,y),
$$

the curves $f=0$ and $g=0$ are nullclines. Their intersections are equilibria. Between nullclines, signs of $f$ and $g$ determine arrow directions. Sketching this geometry often explains trajectories more clearly than a long time plot.

Boundary equilibria matter. In an ecological model, extinction of one or both species may be mathematically valid and operationally important. In an epidemic model, the disease-free state is a boundary equilibrium. Do not discard it because the application hopes for coexistence.

Check feasibility. Algebra can produce negative populations or concentrations. Those roots are outside the physical state space but may still affect symbolic expressions. State which equilibria are admissible under parameter conditions.

### Linearization and the Jacobian

Near equilibrium $x^*$, write a small perturbation $\eta=x-x^*$. Taylor expansion gives

$$
\dot\eta=J(x^*)\eta+O(\|\eta\|^2).
$$

The linear system captures first-order behavior when the equilibrium is hyperbolic, meaning no eigenvalue has zero real part. Eigenvalues with negative real parts decay; positive real parts grow.

For a two-by-two Jacobian

$$
J=\begin{bmatrix}a&b\\c&d\end{bmatrix},
$$

eigenvalues solve

$$
\lambda^2-\tau\lambda+\Delta=0,
$$

where trace $\tau=a+d$ and determinant $\Delta=ad-bc$. These two numbers classify much of the local behavior.

If $\Delta\lt0$, eigenvalues have opposite signs and the equilibrium is a saddle, hence unstable. If $\Delta\gt0$ and $\tau\lt0$, both real parts are negative: a stable node or spiral. If $\Delta\gt0$ and $\tau\gt0$, it is unstable. The discriminant $\tau^2-4\Delta$ distinguishes real from complex eigenvalues.

Plotting trace and determinant over parameters can create a stability map. But boundaries where trace or determinant vanish require nonlinear analysis; the linear test becomes inconclusive or signals a bifurcation.

### Worked local analysis: competing technologies

Suppose market shares $x$ and $y$ for two incompatible technologies follow

$$
\dot x=x(1-x-\alpha y),
$$

$$
\dot y=y(1-y-\beta x).
$$

The normalized self-limitation coefficients are one. Equilibria include $(0,0)$, $(1,0)$, $(0,1)$, and an interior point obtained from

$$
x+\alpha y=1,
\qquad
\beta x+y=1.
$$

When it is positive,

$$
x^*=\frac{1-\alpha}{1-\alpha\beta},
\qquad
y^*=\frac{1-\beta}{1-\alpha\beta}.
$$

If both cross-competition coefficients are below one, each technology limits itself more strongly than it limits the other, and coexistence can be stable. If both exceed one, the interior equilibrium is unstable and either single-technology outcome can be stable; initial conditions and shocks decide which standard wins. If one is stronger and the other weaker, one technology excludes the other.

This simple classification is more informative than simulating one initial share. A single trajectory in the bistable case might suggest inevitable dominance even though another starting point leads to the opposite outcome. Show basins of attraction or the separating stable manifold.

The model is only an analogy unless adoption mechanisms support the interaction terms. Network effects, switching costs, multi-homing, and market expansion may require different equations. Stability analysis tells us what the assumed model implies, not whether its assumptions are true.

### Reading a two-state system through trace and determinant

For a two-dimensional system, eigenvalues are often easier to interpret through the trace and determinant of the Jacobian. Let

$$
J=\begin{bmatrix}a&b\\c&d\end{bmatrix},
\qquad
\tau=\operatorname{tr}(J)=a+d,
\qquad
\Delta=\det(J)=ad-bc.
$$

The characteristic polynomial is

$$
\lambda^2-\tau\lambda+\Delta=0,
$$

so

$$
\lambda_{1,2}=\frac{\tau\pm\sqrt{\tau^2-4\Delta}}{2}.
$$

This gives a compact phase-plane classification. If $\Delta<0$, the eigenvalues have opposite signs and the equilibrium is a saddle, hence unstable. If $\Delta>0$ and $\tau<0$, both real parts are negative and the equilibrium is locally asymptotically stable. If $\Delta>0$ and $\tau>0$, it is unstable. The discriminant $\tau^2-4\Delta$ separates real nodes from complex spirals. The borderline cases $\Delta=0$ or $\tau=0$ need nonlinear or bifurcation analysis because linearization may be inconclusive.

Now put these symbols into a system that has a decision behind it. Consider two reservoirs of online attention: engagement with reliable information $x(t)$ and engagement with a rumor $y(t)$. Around a proposed moderation equilibrium, suppose the local Jacobian is

$$
J=\begin{bmatrix}
-0.30&-0.20\\
0.45&-0.10
\end{bmatrix}
\quad\text{day}^{-1}.
$$

Here $\tau=-0.40$ day$^{-1}$ and

$$
\Delta=(-0.30)(-0.10)-(-0.20)(0.45)=0.12\ \text{day}^{-2}.
$$

The discriminant is $0.16-0.48=-0.32$ day$^{-2}$, so the eigenvalues are complex with negative real part $-0.20$ day$^{-1}$. Small disturbances decay while oscillating. The approximate envelope time scale is five days, and the imaginary part determines the oscillation period. A simulation that approaches equilibrium monotonically would contradict this local calculation and prompt us to inspect code or parameter placement.

What do the off-diagonal entries mean? The negative $b$ says more rumor engagement locally suppresses reliable engagement. The positive $c$ says more reliable engagement, perhaps through reactive discussion, can initially increase rumor engagement. That asymmetric coupling can create a rotating transient even though both diagonal terms damp their own states. The mathematics does not prove those mechanisms; it makes their consequences testable.

Suppose a platform changes a recommendation parameter and $c$ rises from $0.45$ to $0.80$. Then

$$
\Delta=0.03+0.16=0.19,
$$

while the trace stays negative. The equilibrium remains locally stable but oscillatory timing changes. If instead moderation changes the rumor self-effect $d$ from $-0.10$ to $+0.15$, the trace becomes $-0.15$ and the determinant becomes

$$
(-0.30)(0.15)-(-0.20)(0.45)=0.045.
$$

It is still locally stable because the trace is negative and determinant positive, but the return is slower. If $d$ increases beyond $0.30$, the trace becomes nonnegative; a stability boundary is near. This parameter threshold is much more informative than displaying one nominal trajectory.

Trace and determinant also prevent a common verbal mistake. Saying “both diagonal entries are negative, therefore the system is stable” is false. Strong positive cross-feedback can make $bc$ large and positive, pushing $\Delta=ad-bc$ below zero and creating a saddle. The cross-effects are not secondary decoration; they can determine the qualitative fate of the equilibrium.

For a nonlinear model, calculate $J$ at each feasible equilibrium, not once in the abstract. The same equations can contain a stable disease-free equilibrium, an unstable threshold equilibrium, and a stable endemic equilibrium under different parameters. Label the evaluation point beside every reported eigenvalue.

Uncertainty can be shown directly in the trace-determinant plane. Sample or profile parameters, map each plausible Jacobian to $(\tau,\Delta)$, and plot the cloud against stability boundaries. If every point lies safely in $\tau<0,\Delta>0$, local stability is robust over that set. If the cloud crosses a boundary, report which parameter combinations cause the crossing. A mean eigenvalue conceals this information.

Finally, local stability is not the decision. For the attention example, the platform may care about the maximum rumor excursion during the oscillatory transient, not merely eventual return. Simulate perturbations representing plausible external shocks, report peak $y$, recovery time, and whether content-safety limits are crossed. The eigenvalues explain the local tendency; the path metrics translate that tendency into policy.

### Local, global, and structural stability

Local asymptotic stability guarantees return only for sufficiently small perturbations. A stable equilibrium may have a small basin; a large shock can move the system to another attractor. Global stability requires stronger evidence.

A Lyapunov function $V(x)$ is analogous to energy. If $V$ is positive away from equilibrium and

$$
\dot V=\nabla V^Tf(x)\lt0,
$$

then trajectories decrease toward the equilibrium within a region. Constructing such a function can prove stability without solving the ODE. For linear systems, a quadratic $V=x^TPx$ can be found from a Lyapunov equation when $A$ is stable.

In gradient systems $\dot x=-\nabla U(x)$,

$$
\dot U=-\|\nabla U\|^2\le0.
$$

The potential cannot increase, which rules out periodic orbits under suitable conditions. Identifying a monotone quantity helps interpret long-run behavior.

Structural stability asks whether qualitative behavior survives small changes in the vector field. A center with closed neutral orbits may become a stable or unstable spiral under tiny damping. Predictions based on exact neutral cycles are fragile.

### Stability versus resilience and transient amplification

Negative eigenvalues guarantee eventual decay, but a nonnormal system can show large transient growth before decay. If the decision concerns a safety threshold, eventual stability is insufficient.

For linear $\dot x=Ax$, the propagator norm $\|e^{At}\|$ can exceed one even when all eigenvalues are stable. Perturbations aligned with certain directions first amplify. Examine transient maxima or pseudospectral sensitivity when interactions are strongly directional.

Resilience can mean return rate, basin size, maximum tolerable shock, or time to recovery. Define it. The eigenvalue with largest real part gives an asymptotic local return rate, but not basin geometry or transient peak.

In ecology, a stable coexistence equilibrium can be practically fragile if a moderate shock crosses an extinction boundary. In engineering, a stable temperature controller can exceed a material limit during overshoot. Report path constraints and disturbance simulations.

### Bifurcations as parameter-dependent qualitative change

As a parameter varies, equilibria can appear, disappear, exchange stability, or generate cycles. These are bifurcations. They matter because a small parameter change near a threshold can cause a large qualitative difference.

The logistic harvest model has a saddle-node bifurcation at maximum sustainable yield: stable and unstable positive equilibria collide and vanish. An epidemic disease-free equilibrium changes stability when $\mathcal R_0$ crosses one, a transcritical-type exchange in standard formulations. Predator–prey systems can undergo Hopf bifurcation and create cycles.

Construct a bifurcation diagram by continuing equilibria across a parameter and marking stable and unstable branches. Do not obtain it by independently simulating from one initial condition; that can miss unstable branches and hysteresis.

Near a bifurcation, parameter uncertainty becomes decision-critical. Instead of reporting the nominal side, estimate distance to the threshold and probability or scenario of crossing. A robust recommendation may maintain margin.

### Numerical stability analysis

Compute Jacobians analytically when feasible, or verify automatic/numerical derivatives. Finite differences require step selection and can be noisy near scales that differ. Compare derivative methods on test points.

Eigenvalue units are inverse time. A value of negative 0.1 per day implies a roughly ten-day local time scale. Report units and modes, not only signs. Complex eigenvalues indicate oscillatory transients, with imaginary part setting frequency and real part setting decay.

Simulation can support but not replace analysis. Perturb equilibrium in several eigenvector and random directions. Check local predictions, then use larger perturbations to explore basin behavior. Integrate long enough relative to slow modes.

Phase portraits should use equal or meaningful scales, show nullclines, equilibria, arrows, and representative trajectories. Streamplot density is not evidence. Mark infeasible regions and thresholds.

### Stability under uncertainty and control

Parameters estimated from data produce a distribution or set of Jacobians. Sample them and examine eigenvalue ranges. If some scenarios cross the imaginary axis, nominal stability is not robust. Correlations matter because eigenvalues depend on combinations.

Feedback changes the Jacobian. For controlled system $\dot x=f(x,u)$ with $u=K(x-x^*)$, local dynamics include

$$
J_{cl}=f_x+f_uK.
$$

Controller design can move eigenvalues, but actuator limits and delay can invalidate linear predictions. Test nonlinear constrained dynamics.

Robust stability can be analyzed with common Lyapunov functions or structured uncertainty methods for engineering systems. In a modeling competition, scenario eigenvalue analysis plus nonlinear stress tests may be appropriate if formal robust tools are not justified. Be explicit about the strength of the claim.

### Stability report checklist

List all feasible equilibria and parameter conditions. Give the Jacobian and evaluation point. Report eigenvalues with units and uncertainty. Interpret modes in domain language. Show nullclines or a bifurcation diagram when two-dimensional or parameter-dependent. Test finite perturbations, path constraints, and alternative initial conditions. Distinguish local stability, basin evidence, and structural robustness.

<div class="mm-key-box"><span class="mm-callout-label">Do not stop at “stable”</span><p>Ask: stable around which equilibrium, under which parameters, for what perturbation size, at what return rate, with what transient peak, and within which basin? Those qualifiers turn an eigenvalue calculation into a decision-relevant statement.</p></div>

## 7. Predator–Prey Dynamics

The Lotka–Volterra model is

$$\dot N=rN-aNP,$$

$$\dot P=baNP-mP,$$

where $N$ is prey and $P$ predator. Without predators, prey grow exponentially; encounters remove prey and create predator growth; predators die at rate $m$ without food.

Besides boundary equilibria, the coexistence point is

$$N^*=\frac{m}{ba},\qquad P^*=\frac{r}{a}.$$

The ideal model has closed orbits around this point. Predator peaks lag prey peaks: prey abundance first supports predator growth, and increased predation then drives prey down.

The model's elegance is also its weakness. Exponential prey growth ignores carrying capacity, and linear predation lets each predator consume without saturation. A more realistic Rosenzweig–MacArthur form is

$$\dot N=rN\left(1-\frac{N}{K}\right)-\frac{aNP}{1+ahN},$$

$$\dot P=e\frac{aNP}{1+ahN}-mP.$$

Changing the response changes equilibria and can create or remove cycles. Never claim that oscillation proves Lotka–Volterra; many mechanisms oscillate.

<figure class="mm-article-figure mm-article-figure--compact"><img src="/images/mathematical-modeling/visual-evidence/088-phase-portrait.svg" alt="Phase portrait with trajectories and equilibrium structure"><figcaption>A phase portrait shows direction, equilibria, and long-run behavior that separate time-series plots can hide.</figcaption></figure>

### Read each Lotka–Volterra term as a biological claim

The prey equation $rN-aNP$ says prey grow exponentially without predators and are removed through encounters. The predator equation $baNP-mP$ says a fraction of consumed prey supports predator growth and predators decline exponentially without prey.

Parameter $a$ combines search, encounter, and capture. Parameter $b$ converts prey consumption into predator recruitment or biomass. Parameter $m$ is predator loss rate. Their units depend on whether states are counts, densities, or biomass.

At coexistence, prey abundance $N^*=m/(ba)$ is set by predator break-even: consumption-generated growth balances loss. Predator abundance $P^*=r/a$ is set by prey growth balance. These relationships can be counterintuitive. Increasing prey intrinsic growth $r$ raises equilibrium predators, not equilibrium prey, in the ideal model.

The classical model has a conserved quantity for positive states:

$$
H(N,P)=baN-m\ln N+aP-r\ln P.
$$

Different initial conditions lie on different closed level curves. The coexistence equilibrium is a neutral center, not asymptotically stable. Oscillation amplitude depends on initial condition and does not decay.

This exact neutrality is structurally fragile. Small self-limitation, saturation, harvesting, or delay can damp or amplify cycles. Observing cycles does not validate the ideal equations.

### Why predator peaks lag prey peaks

When prey exceeds $N^*$, predator derivative is positive. Predator population continues rising even after prey begins falling, until prey crosses below $N^*$. Similarly, prey begins recovering when predator falls below $P^*$. This creates phase lag.

A time plot should show prey peaking first and predator later under the standard orientation. A phase portrait rotates according to derivative signs. Check the direction with one point rather than assuming clockwise or counterclockwise from a textbook figure whose axes may be swapped.

Cross-correlation can estimate lag descriptively, but irregular sampling and trends can mislead. Mechanistic fitting should use observation times and noise. If only annual counts exist, fast cycles can alias.

The period near coexistence follows linearization. The Jacobian at $(N^*,P^*)$ has purely imaginary eigenvalues with frequency

$$
\omega=\sqrt{rm},
$$

so local period is approximately $2\pi/\sqrt{rm}$. This gives a hand check and shows growth and mortality time scales jointly set cycle speed.

### Add prey capacity and predator handling

The Rosenzweig–MacArthur model adds logistic prey growth and a saturating functional response. At high prey, consumption per predator approaches $1/h$. This is biologically more plausible when predators spend time handling prey.

Prey nullclines satisfy either $N=0$ or

$$
r\left(1-\frac NK\right)
=\frac{aP}{1+ahN}.
$$

Predator nullclines satisfy either $P=0$ or

$$
e\frac{aN}{1+ahN}=m.
$$

The positive predator nullcline gives a critical prey level if maximum consumption $e/h$ exceeds mortality. Otherwise predators cannot persist regardless of prey abundance.

Changing carrying capacity can destabilize coexistence in some parameter regimes, the paradox of enrichment. More resource can move equilibrium onto a part of the prey nullcline that supports cycles with deep troughs. This does not mean enrichment always harms ecosystems; it is a model result under specific functional response and structure.

Use a bifurcation diagram as $K$ varies. Show equilibrium stability and cycle amplitude. If troughs approach low counts, deterministic continuous predictions become questionable because stochastic extinction risk rises.

### Alternative functional responses and interference

Holling type I is linear until perhaps a hard cap. Type II saturates hyperbolically. Type III is sigmoidal, often written with $N^2$ in numerator and denominator, representing low-prey refuge or predator learning.

Predator interference can make consumption depend on predator density, not just prey per predator. Ratio-dependent models use prey-to-predator ratios. Each form changes low-density invasion, equilibrium, and stability.

Select among responses using feeding experiments or field data across prey densities. A time series alone may not distinguish them because other parameters compensate. Report model comparison and extrapolation range.

Do not infer a functional response from a plotted curve without accounting for prey depletion during experiments. If prey declines substantially, initial-density methods can bias consumption rates. Integrate the depletion dynamics.

### Harvesting, refuge, and management

Suppose predators are protected and prey are harvested. Add $-H_N(N)$ to prey. Constant, proportional, and threshold harvest have different stability and extinction effects. A quota that is sustainable at equilibrium can be dangerous during the low phase of a cycle.

A refuge can reduce accessible prey, for example replacing $N$ in predation by $\max(N-R,0)$ or a smooth refuge function. This can protect low prey but also reduce predator persistence. The exact form needs habitat evidence.

Management objectives may include both populations, harvest, and variability. A policy that maximizes average prey harvest might increase extinction risk. Evaluate minimum abundance, time below ecological thresholds, and recovery after shocks.

Feedback based on observed abundance faces delay and error. A threshold harvest closure triggered by annual surveys may act after the population has fallen further. Simulate observation and implementation delay.

### Fitting ecological time series

Counts are often indices rather than true abundance. Observation can be

$$
y_{N,t}\sim\text{distribution with mean }q_NN(t),
$$

where detection $q_N$ may vary. Treating an index as exact count affects interaction coefficients and carrying capacity.

Process noise reflects environmental variation in growth or mortality. Measurement noise reflects observation. A deterministic ODE with independent residuals can understate uncertainty and misattribute process variation to parameters.

Sampling both species is important. Prey alone may show cycles but cannot identify whether predators caused them. Environmental forcing can also synchronize or create cycles. Include covariates or compare alternative mechanisms.

Fit several initial conditions or sites jointly when parameters transfer. Hold out years or sites. Test forecast of phase and amplitude, because small frequency error creates large long-horizon mismatch.

Profile functional-response and conversion parameters. Strong trade-offs are common. Use external diet or feeding information to constrain them. More decimal places do not resolve weak identifiability.

### Worked island case

Imagine rabbits and foxes on an island. Monthly surveys suggest rabbit peaks precede fox peaks by several months. Begin with Lotka–Volterra and estimate time scales from growth when foxes are low and decline when rabbits are low.

The classical model predicts neutral cycles and exponential rabbit growth without foxes. Suppose observed rabbit growth slows at high abundance and fox decline stops responding linearly at abundant rabbits. Residuals support logistic prey and saturated predation.

Fit the extended model on the first six years and forecast the next two. Compare with a seasonal logistic model without predator interaction. If both predict similarly, the predator causal claim remains uncertain. Diet evidence or a fox-management perturbation can discriminate.

Now evaluate a proposed fox vaccination program that lowers mortality $m$. The model may predict higher fox abundance, lower rabbit equilibrium, and changed cycle stability. Stress-test carrying capacity and functional response. Check whether rabbit troughs fall below a conservation threshold.

If the intervention also changes fox behavior or disease transmission, the parameter-only change is incomplete. State that the prediction assumes other interactions remain unchanged.

Present time series, phase portrait, nullclines, and a management frontier. The time series communicates chronology, the phase portrait mechanism, and the frontier trade-off. Do not use a decorative predator photograph in place of evidence.

### Stochastic extinction near low abundance

Continuous ODE states can approach fractions of an animal. When abundance is low, births, deaths, and encounters are discrete random events. A stochastic process can have extinction even when deterministic equilibrium is positive.

Use the ODE as a mean-field baseline, then simulate event rates with a continuous-time Markov chain or individual model. Compare extinction probability and time under policies. Preserve parameter and environmental uncertainty.

The stochastic model should reduce toward the ODE at large population under appropriate scaling. This cross-model relationship is a check. If results differ at high counts, event rates or units may be inconsistent.

Report when the deterministic model is used for average behavior and when stochastic results support rare-risk decisions. Complexity should match the question.

<div class="mm-key-box"><span class="mm-callout-label">Predator–prey caution</span><p>Cycles, phase lag, and a good fit do not uniquely identify predation. Carrying capacity, functional response, observation, environmental forcing, and stochastic extinction determine whether the model can support an intervention.</p></div>

## 8. General Two-Population Systems

A compact framework is

$$\dot x=x(r_1+a_{11}x+a_{12}y),$$

$$\dot y=y(r_2+a_{21}x+a_{22}y).$$

Signs of cross-effects describe relationships:

- $a_{12}<0,a_{21}<0$: competition;
- one positive and one negative: predator–prey or exploitation;
- both positive: mutualism.

For competition,

$$\dot x=r_1x\left(1-\frac{x+\alpha y}{K_1}\right),\qquad
\dot y=r_2y\left(1-\frac{y+\beta x}{K_2}\right).$$

Nullclines $\dot x=0$ and $\dot y=0$ divide the phase plane into regions of increase and decrease. Their geometry can predict coexistence or exclusion without solving explicit trajectories. A phase portrait should show arrows, nullclines, equilibria, and feasible nonnegative region—not merely decorative streamlines.

### Competition model from effective capacities

For species one, the term $x+\alpha y$ measures effective crowding in units of species one. One unit of species two has the competitive effect of $\alpha$ units of species one. Similarly, $y+\beta x$ measures crowding for species two.

The nontrivial nullclines are

$$
x+\alpha y=K_1,
$$

$$
\beta x+y=K_2.
$$

Their intercepts organize outcomes. Species one's nullcline crosses axes at $K_1$ and $K_1/\alpha$. Species two's crosses at $K_2/\beta$ and $K_2$.

Stable coexistence occurs when each species limits itself more than it excludes the other, equivalently under standard positive parameters,

$$
K_1\gt \alpha K_2
\quad\text{and}\quad
K_2\gt \beta K_1.
$$

If species one can invade the equilibrium of species two and species two can invade the equilibrium of species one, coexistence is supported. These invasion tests are often easier to interpret than formula signs.

If neither can invade, both single-species equilibria can be stable and the interior point is a threshold. Initial abundance and disturbances determine the winner. If only one can invade, it excludes the other.

This four-regime classification should be shown before fitting one trajectory. It reveals which parameter inequalities determine the qualitative conclusion.

### Invasion analysis as a practical test

At the species-two-only equilibrium $(0,K_2)$, species one at low abundance grows approximately as

$$
\dot x\approx r_1x
\left(1-\frac{\alpha K_2}{K_1}\right).
$$

Its invasion growth rate is positive when $K_1\gt\alpha K_2$. This rate can sometimes be estimated from introduction or recovery data more directly than all model parameters.

Likewise species two invasion at $(K_1,0)$ requires $K_2\gt\beta K_1$. Mutual invasibility is a mechanistic criterion for stable coexistence in this model.

In experiments, introduce a rare competitor into a resident population near equilibrium and measure early per-capita growth. Ethical and ecological constraints may preclude deliberate introductions, but natural recolonization or controlled microcosms can provide evidence.

If environmental variation changes invasion rates, average conditions may be misleading. Temporal niches and storage effects can permit coexistence beyond the simple constant model. State the regime the test covers.

### Mutualism and runaway growth

When both cross-effects are positive in the general system, each population benefits the other. A naive bilinear mutualism can generate unbounded growth because positive feedback overwhelms self-limitation. Real benefits saturate and resources remain finite.

A saturating mutualism term might be

$$
\frac{a_{12}y}{1+h_{12}y}
$$

inside species one's per-capita growth. At low partner abundance, benefit is approximately linear; at high abundance, it approaches a maximum. Similar saturation for both species can produce bounded coexistence.

The model should distinguish obligate mutualism, where a species declines alone, from facultative mutualism, where it can persist alone. Baseline growth parameters encode that distinction. Data including low partner abundance are needed to estimate it.

Management can create unintended feedback. Supplementing one mutualist may increase both populations, while removing one can trigger collapse of the other. Evaluate equilibria, basins, and transient response rather than only immediate benefit.

### Facilitation and competition can change with conditions

Species interactions are not always one fixed sign. Plants may compete for water in mild conditions but facilitate survival by shading under heat. A coefficient depending on environment $E(t)$ can switch sign.

For example,

$$
a_{12}(E)=a_0+a_1E.
$$

If $E$ is an external time series, the system is nonautonomous and fixed equilibrium analysis applies only under frozen conditions. If the populations change environment, add an environmental state.

Fit interaction variation only with data spanning conditions. Otherwise a flexible coefficient can explain noise. Compare with simpler models and validate in a held-out environment.

Scenario analysis should preserve environmental sequences. Alternating stress and recovery can have effects different from the same average because nonlinear growth compounds over time.

### Worked coexistence calculation

Let $K_1=100$, $K_2=80$, $\alpha=0.5$, and $\beta=0.6$. Species one can invade species two because

$$
100\gt0.5(80)=40.
$$

Species two can invade species one because

$$
80\gt0.6(100)=60.
$$

Stable coexistence is expected. Solve the nullclines:

$$
x+0.5y=100,
$$

$$
0.6x+y=80.
$$

The second gives $y=80-0.6x$. Substitute into the first:

$$
x+40-0.3x=100,
$$

so $x^*=60/0.7\approx85.7$ and $y^*\approx28.6$. Verify both are positive and substitute into derivatives.

Now raise $\beta$ to 1.0. Species two can no longer invade species one because $80\lt100$. Species one still invades species two, so species one excludes species two in the standard model. A small coefficient change crossed a regime boundary; sensitivity should emphasize that inequality.

If estimates for $\beta$ span 0.7 to 1.1, the outcome is structurally uncertain. Rather than showing one nominal coexistence curve, report the parameter boundary and identify data that estimate invasion effect.

### Application beyond biology

The same equations can describe competing languages, technologies, platforms, or land uses, but interpretation must be rebuilt. “Carrying capacity” may mean market potential; cross-effects may represent switching or incompatibility. Population reproduction assumptions may not transfer.

For two platforms, multi-homing allows users to belong to both, violating mutually exclusive states. Innovation changes market size. Strategic pricing makes coefficients controlled and endogenous. A simple competition ODE is a baseline, not a literal ecology metaphor.

Use analogies to generate hypotheses, then derive flows from the actual domain. Validate interventions. A coefficient that fit historical market shares may change when pricing rules change.

### Reporting a two-population model

Show nullclines with parameter uncertainty bands, equilibria and stability, representative trajectories from multiple initial conditions, and data. Report invasion rates and regime inequalities. A single trajectory cannot establish global outcome.

Check nonnegative invariance and boundedness. State whether environment is fixed. Test alternative interaction forms and observational scaling. Explain which data identify cross-effects rather than self-limitation.

For decisions, simulate actions and disturbances with realistic timing. Report policy-switch boundaries and basin changes. If intervention can push the system across a separatrix, uncertainty in state estimation becomes crucial.

<div class="mm-key-box"><span class="mm-callout-label">Two-population geometry</span><p>Nullcline positions, mutual invasion, and basin structure often tell more than a fitted trajectory. Use them to state precisely when coexistence, exclusion, or history dependence follows from the model.</p></div>

## 9. Simulation, Events, and Parameter Inference

Coupled systems should be integrated with adaptive methods such as Runge–Kutta, but model structure still needs protection. Populations and concentrations should not become negative. Discontinuous interventions need event handling or piecewise inputs rather than being blurred over a large step.

Suppose observations satisfy

$$y_i=h(x(t_i;\theta))+\varepsilon_i.$$

Parameter estimation solves

$$\hat\theta=\arg\min_\theta\sum_i
(y_i-h(x(t_i;\theta)))^TW_i
(y_i-h(x(t_i;\theta))).$$

Use multiple starting points because the loss can be nonconvex. Profile one parameter while reoptimizing the rest to reveal flat directions. Bootstrap the data or residuals to quantify prediction uncertainty. Fit one portion and test another; fitting and validation on identical points only measure reconstruction.

When only one output is observed, ask whether different parameter sets generate nearly the same curve. More digits from an optimizer do not create information. Design measurements at times when candidate trajectories differ most.

### Integrate coupled systems with structure in mind

Adaptive Runge–Kutta methods work well for many nonstiff systems. Stiff chemical, epidemiological, or pharmacokinetic models may need implicit solvers. Solver choice is not determined by the number of equations but by time-scale separation, smoothness, events, and required accuracy.

State tolerances and maximum step. If an intervention lasts one hour, a solver allowed to take a ten-hour step can miss its effect unless input discontinuities are declared. Split at known events and use root finding for state-triggered events.

Check conservation and positivity. For SIR, total population error should remain tiny. For predator–prey, evaluate the classical invariant in the ideal case. For compartment transfer, reconstruct cumulative input, clearance, and stored amount.

Solver output interpolation can be used at measurement times, but plotting a dense smooth curve does not mean the underlying data are dense. Show observation markers separately.

Run convergence on decision metrics: epidemic peak, extinction time, maximum reactor temperature, or area above a threshold. State trajectories can appear identical while event time changes enough to affect a conclusion.

### Sensitivity equations

For

$$
\dot x=f(t,x,\theta),
$$

parameter sensitivity matrix $S=\partial x/\partial\theta$ satisfies

$$
\dot S=f_xS+f_\theta.
$$

Initial sensitivities depend on whether initial state is fixed or parameterized. Integrating these equations alongside the state gives gradients for estimation and reveals when parameters influence outputs.

Sensitivity magnitude depends on units. Use scaled sensitivity

$$
\tilde S_{ij}=\frac{\theta_j}{s_i}
\frac{\partial x_i}{\partial\theta_j}
$$

with meaningful state scale $s_i$, or elasticities when nonzero. Compare directions as well as magnitude: nearly collinear columns indicate confounding.

Automatic differentiation can compute accurate derivatives through a compatible solver, but event times and adaptive control require care. Finite differences are simple but need step checks. Compare gradients against central differences on test parameters.

### Likelihood and observation models

Weighted least squares follows from independent Gaussian error with known variances. Many coupled-system data need other models. Counts can be Poisson or negative binomial. Binary tests can be binomial. Concentrations may have multiplicative log-normal error. Detection limits require censoring.

Temporal correlation can be represented with an autoregressive residual, but ensure it is not masking a missing state. Process noise enters dynamics; measurement noise enters observation. State-space methods such as extended or particle filters can estimate hidden states sequentially.

Observation functions may aggregate states. Hospital admissions depend on earlier infections through delay and severity. Total fluorescence may combine chemical species. Camera intensity may be nonlinear. Include the mapping $h(x)$ explicitly.

If sampling times are uncertain, integrate over that uncertainty or include it in the likelihood. Near steep transitions, timing error looks like state error and biases rates.

### Structural and practical identifiability

Structural identifiability assumes perfect continuous data and asks whether parameters are uniquely recoverable. Symmetries or parameter products can make uniqueness impossible. Reparameterize to identifiable combinations or collect another output.

Practical identifiability depends on noise, sampling, and input. Profiles, bootstrap, or posterior geometry reveal it. A Hessian-based covariance near one optimum can be misleading along curved ridges or boundaries.

For each parameter, profile the objective while reoptimizing others. Show thresholds based on the chosen likelihood framework. A profile flat toward a bound means the data did not locate the parameter; the bound is prior knowledge, not evidence from the trajectory.

Prediction can be identifiable despite parameter uncertainty. Simulate all near-optimal parameter sets and examine the decision output. If the output is tight, the model may still support the decision. If it spans both sides of a threshold, more information is needed.

### Identifiability clinic: one curve, several convincing explanations

Consider a tracer experiment with two connected tanks. Tank one receives a short pulse, material moves from tank one to tank two at rate $k_{12}x_1$, returns at rate $k_{21}x_2$, and leaves tank two at rate $k_ex_2$:

$$
\dot x_1=-k_{12}x_1+k_{21}x_2+u(t),
$$

$$
\dot x_2=k_{12}x_1-(k_{21}+k_e)x_2.
$$

Suppose the sensor measures only total concentration

$$
y(t)=s_1x_1(t)+s_2x_2(t)+\varepsilon(t),
$$

where sensor scales $s_1$ and $s_2$ are also uncertain. The optimizer returns six decimal places for all five parameters. That numerical precision says nothing about whether the experiment can distinguish them.

Start with a thought experiment. If $s_1=s_2=1$ and there is no external loss, total amount is conserved after the pulse, so the measured curve is flat. Exchange can be arbitrarily fast or slow and the total measurement will not reveal it. No optimization algorithm can recover $k_{12}$ and $k_{21}$ from a signal that does not change with those rates. This is structural blindness created by the observation choice.

With $k_e>0$, the total curve changes because loss occurs from tank two. Exchange now influences how quickly material reaches the exit, but several rate combinations can still generate similar total decay. Faster movement into tank two combined with slower exit may resemble slower movement with faster exit. If sensor scales are free, amplitude differences can be absorbed as well.

Look at the loss surface, not only its minimum. Fix $k_{12}$ on a grid. At each value, reoptimize $k_{21}$, $k_e$, and sensor scales. Plot the best loss against $k_{12}$. A sharp bowl suggests practical information; a long flat valley says many exchange rates remain plausible. Repeat for each parameter. Two-dimensional contours can reveal a curved ridge that a local covariance matrix approximates badly.

Now inspect predictions from that ridge. Suppose the decision is to choose a flushing time that leaves less than five percent of tracer. All near-optimal parameter sets might predict nearly the same total clearance time even though exchange rates vary widely. Then the decision can be supported without claiming that each rate is known. If the decision instead concerns maximum tank-two concentration, the same parameter sets may disagree greatly. Identifiability is output-specific as well as experiment-specific.

How can the experiment be improved? Add a sensor that observes tank two separately. Take early samples immediately after the pulse, when transfer dominates, and later samples, when clearance dominates. Repeat with a sustained input, which excites modes differently. If safe, change the initial allocation between tanks. Each design should be judged by whether candidate parameter sets produce distinguishable observations relative to noise.

A sensitivity matrix gives a local view. At observation times $t_i$, form

$$
\mathcal S_{ij}=\frac{\partial h(x(t_i;\theta))}{\partial\theta_j}.
$$

If two columns are nearly proportional, changing those parameters moves predictions in almost the same direction. The information matrix $\mathcal S^TW\mathcal S$ becomes ill-conditioned. Its smallest singular directions identify parameter combinations the experiment barely sees. Scale columns first; otherwise units can manufacture apparent conditioning problems.

The singular values are diagnostic, not magical cutoffs. A parameter direction can be weak locally but become distinguishable under a larger intervention. Conversely, a full-rank local matrix can still accompany multiple separated optima. Combine sensitivity, profiles, multiple starts, and simulated recovery tests.

A simulated recovery test is especially revealing. Choose several plausible true parameter sets, generate noisy synthetic data under the exact planned protocol, and run the entire estimation pipeline without giving it the truth. Ask whether intervals cover the true values and whether decision predictions are calibrated. If recovery fails even on data generated by the model, the planned experiment or inference procedure is not ready for real data.

Noise assumptions matter. If measurement error is proportional to concentration, constant-variance least squares overweights the high-concentration phase or underweights the tail, depending on scale. Fit on a log scale only when the measurement mechanism supports multiplicative error and zero or censored values are handled. Replicate measurements can estimate assay variation separately from process variation.

Time uncertainty can mimic kinetic uncertainty. A two-minute delay in recording pulse start shifts every early observation. If early dynamics are fast, the optimizer may compensate by changing $k_{12}$. Include a start-time offset or calibrate clocks. Likewise, an unmodeled sensor response time can look like an additional compartment. A good residual plot against time may reveal this lag.

Validation should challenge the fitted mechanism. Hold out one input protocol, not merely random points from every trajectory. If the model is fitted to both pulse and sustained-input runs and a random twenty percent of points are called “test data,” information from each experiment has already shaped the parameters. Holding out a complete intervention asks whether the model transfers.

Suppose the one-output model fits well but fails to predict the held-out sustained infusion. Do not immediately add a neural correction term. First inspect whether the failure has a mechanistic pattern: wrong initial slope suggests input or sensor delay; wrong steady level suggests clearance or scale; wrong intermediate curvature suggests exchange structure. Let the shape of failure guide the next model.

When reporting the final result, separate three statements. The data may identify a slow clearance time scale. They may weakly constrain individual exchange rates. They may nevertheless support a flushing decision within the tested input range. Writing these separately is more honest and more useful than presenting one parameter table with tiny standard errors.

This clinic illustrates a broader habit: before collecting more of the same data, ask what movement in the hidden system would actually become visible. Ten thousand samples of an uninformative output do not replace one well-placed measurement or intervention.

### Multiple starts, transformations, and constraints

Positive parameters can be optimized as logarithms. Fractions can use logistic transformations. This prevents invalid proposals and improves scaling. Transforming does not eliminate multimodality.

Use multiple starting points selected across credible ranges. Record converged objective, parameters, status, and failures. Cluster solutions. If distinct parameter modes fit similarly, propagate both.

Bounds should come from physical or prior evidence, not be tuned until estimates look reasonable. Check whether optimum lies on a bound; if so, the model, data, or range deserves attention.

Regularization can stabilize a flexible time-varying parameter but encodes assumptions about smoothness or magnitude. Select it transparently and validate. A smooth $\beta(t)$ is not automatically a measured behavior curve.

### Design an informative experiment

Suppose a two-compartment system has fast exchange and slow clearance. Samples only after the fast phase identify clearance but not exchange. Add early samples. A constant input may reveal equilibrium ratios; a pulse reveals transient modes.

Construct candidate schedules and compute sensitivity information. Consider cost, safety, assay limits, and likely missingness. Simulate data and refit to assess actual uncertainty under nonlinearity.

If two models make similar predictions under current conditions, choose a perturbation where they differ. A predator feeding saturation experiment varies prey density. A thermal model uses multiple pulse lengths. A diffusion model observes launch conditions with different external exposure.

The value of information is decision-specific. A measurement that improves a scientifically interesting parameter may not change policy. Estimate how often it resolves a policy switch and compare its cost.

### State estimation and feedback

In real time, hidden states must be estimated from noisy outputs. A filter alternates prediction through dynamics and update from observations. Extended Kalman filters linearize, unscented filters propagate sample points, and particle filters handle nonlinear non-Gaussian distributions at higher cost.

Filter assumptions should be validated. Innovation residuals—the difference between observation and predicted measurement—should be approximately unbiased and consistent with expected variance. Persistent structure indicates model or noise mismatch.

Feedback uses the estimate, not true state. Simulate the estimator and controller together. A threshold policy based on noisy estimate can chatter or act late. Hysteresis, probability thresholds, and robust margins can help.

Do not evaluate a feedback policy with perfect state information if deployment lacks it. That reports an unattainable upper bound.

### Model discrepancy and structural ensembles

No ODE is exact. A discrepancy term can capture systematic difference, but a highly flexible discrepancy may absorb mechanism and ruin intervention extrapolation. Keep physical and statistical roles clear.

Compare plausible structures: one versus two compartments, linear versus saturated response, constant versus environment-dependent rate. Weighting models by fit can be useful, but decision robustness across structures is often more transparent.

Use residuals to propose alternatives. Phase-dependent bias suggests missing nonlinear response. Delay suggests an omitted stage. State-dependent variance suggests observation changes. A sudden regime shift suggests an event or parameter change.

Falsification is valuable. State observations that would contradict the model: violation of conservation beyond error, response outside predicted sign, different scaling across size, or failure under a held-out perturbation. A model that cannot be contradicted is not informative.

### Uncertainty decomposition

Separate initial-state, parameter, input, observation, numerical, and structural uncertainty. They have different remedies. Better sensors reduce observation error; better experiments reduce parameter uncertainty; improved forecasts reduce input uncertainty; alternative models address structure.

Propagate joint uncertainty through the trajectory. Preserve correlations. Report bands with a label explaining what is included. A parameter-only confidence band is not a full forecast band.

For named future scenarios, avoid attaching probabilities unless justified. Show outcomes and policy rankings across them. For stochastic models, distinguish process randomness from parameter uncertainty and Monte Carlo error.

If rare safety violation matters, ensure enough samples or use targeted methods. “Zero failures in one hundred simulations” does not prove negligible probability. Provide a statistical bound or robust set-based check.

### Reproducibility and independent evaluation

Store code version, equations, units, input checksums, parameter priors or bounds, objective, solver settings, seeds, and environment. Generate figures and tables from saved run artifacts.

An independent evaluator reads trajectories and raw inputs, then recomputes conservation, thresholds, and metrics. Do not reuse the exact metric code from optimization when a bug could affect both.

Create regression tests from analytic special cases and tiny systems. Intentionally reverse a sign to confirm tests fail. Track solver warnings and rejected scenarios.

Archive forecast or policy versions before outcomes occur. Retrospective updates should not overwrite what was actually predicted. This distinction is essential for honest validation.

### A complete inference story

A rigorous coupled-system study can be narrated in one chain. Draw mechanisms and units. Identify invariants and equilibria. Choose inputs and observations that excite modes. Fit through an explicit likelihood with multiple starts. Diagnose identifiability and residuals. Validate on a new time block, unit, or intervention. Propagate parameter and structural uncertainty into decision outputs. Evaluate policies using the observations available in deployment. Archive and independently verify results.

Each step prevents a different kind of false confidence. A solver can converge while parameters are not identified. Parameters can be precise under the wrong observation model. A model can fit while failing intervention prediction. A policy can work with true state and fail with delayed noisy estimates. The chain is only as strong as its weakest link.

<div class="mm-key-box"><span class="mm-callout-label">Inference principle</span><p>Coupled ODE estimation is not curve fitting around a black-box solver. Inputs excite mechanisms, outputs reveal only certain combinations, likelihood defines measurement evidence, validation tests extrapolation, and uncertainty must reach the final decision.</p></div>

## 10. Real Competition Case: 2020 CUMCM Reflow Oven

The 2020 CUMCM Problem A concerned the temperature profile of a circuit board traveling through a reflow oven. The decision was not simply “make it hot.” A feasible profile must respect heating and cooling-rate limits, time above critical temperatures, peak temperature, and process efficiency.

A reduced lumped model treats board temperature $T(t)$ as

$$C(T)\frac{dT}{dt}=hA[T_a(x(t))-T]-q_{\mathrm{loss}}(T),$$

where $x(t)=vt$ at conveyor speed $v$, $T_a(x)$ is the oven-zone air profile, and $C$ is effective heat capacity. With linear loss absorbed into a coefficient,

$$\dot T=k(x(t))[T_a(x(t))-T].$$

This first-order ODE explains thermal lag: the board does not instantly equal zone temperature. Slower conveyor speed increases residence time and usually raises peak temperature and time above threshold.

The full physics may require one-dimensional heat conduction,

$$\rho c\frac{\partial T}{\partial t}
=\frac{\partial}{\partial z}\left(k\frac{\partial T}{\partial z}\right),$$

with convective and radiative boundary conditions. A strong paper chooses complexity based on board thickness, Biot number, available measurements, and the required decision—not because a PDE looks more advanced.

From a simulated profile compute:

$$r_{\max}=\max_t|\dot T(t)|,\quad
t_{217}=\int\mathbf1\{T(t)\ge217^\circ\mathrm C\}\,dt,\quad
T_{\max}=\max_tT(t).$$

Optimization can then maximize conveyor speed or minimize an undesirable area while imposing process-window constraints. Calibrate on measured furnace data, validate on another speed, and perturb heat-transfer parameters. The final recommendation should include a safe operating interval, not one falsely exact speed.

### Translate conveyor geometry into a time input

The oven is arranged in spatial zones, while the thermal ODE evolves in time. Conveyor speed connects them. If a board enters at position zero and moves at constant speed $v$, then $x(t)=vt$. A zone-air profile $T_a(x)$ becomes the time input $T_a(vt)$. Increasing speed compresses every zone duration. This is why speed changes peak temperature, time above thresholds, and heating rate at once.

Air temperature may transition between zones because of gaps, mixing, and furnace inertia. A measured or piecewise-linear spatial profile is often more realistic than ideal jumps. If sharp boundaries are used, split integration at crossing times $t_j=x_j/v$. Board temperature remains continuous, while its derivative changes.

Define the tracked location. The leading edge, center, and thermocouple cross a boundary at different times. A long board can span zones, making a single ambient input questionable. Geometry is part of the input model.

### Derive and interpret the thermal law

Let effective heat capacity be $C=mc_p$. Convective and radiative exchange can be written

$$
C\dot T=hA(T_a-T)
+\epsilon\sigma A(T_a^4-T^4)+Q_{other}.
$$

Radiation requires absolute temperature. Over a limited range it may be linearized into an effective coefficient, yielding

$$
\dot T=k(x)[T_a(x)-T].
$$

Coefficient $k=h_{eff}A/C$ has inverse-time units. It can differ across heating and cooling zones because airflow changes. A universal constant is a baseline to test.

For constant zone conditions,

$$
T(t)=T_a+[T(t_0)-T_a]e^{-k(t-t_0)}.
$$

This analytical segment verifies code and gives intuition: the board closes a fixed fraction of its gap each time constant and cannot pass the zone temperature in a passive first-order model.

If $k$ varies, integrate numerically. Convert conveyor units carefully; centimeters per minute and thermal seconds cannot be mixed. Document the coordinate origin and entry time.

### Hand calculation across three oven zones

Before fitting dozens of zones, work through a miniature oven. It catches unit mistakes and makes the speed effect tangible. Suppose a board enters at $25^\circ$C and passes through three idealized zones:

| zone | length | air temperature | $k$ |
|---|---:|---:|---:|
| preheat | $0.60$ m | $150^\circ$C | $0.020$ s$^{-1}$ |
| reflow | $0.30$ m | $245^\circ$C | $0.025$ s$^{-1}$ |
| cooling | $0.50$ m | $30^\circ$C | $0.018$ s$^{-1}$ |

Let conveyor speed be $v=0.010$ m/s. Residence times are therefore $60$, $30$, and $50$ seconds. For a constant zone, define the propagation map

$$
\Phi(T_{in};T_a,k,\Delta t)
=T_a+(T_{in}-T_a)e^{-k\Delta t}.
$$

The preheat exit is

$$
T_1=150+(25-150)e^{-0.020(60)}.
$$

Since $e^{-1.2}\approx0.301$, we obtain $T_1\approx112.4^\circ$C. The board has not reached the air setpoint; it has closed about seventy percent of the initial temperature gap.

In the reflow zone,

$$
T_2=245+(T_1-245)e^{-0.025(30)}.
$$

With $e^{-0.75}\approx0.472$, this gives approximately $182.4^\circ$C. That value is below a $217^\circ$C liquidus threshold. No optimizer is needed to see that this particular speed and simplified thermal response cannot provide time above liquidus. If a program reports otherwise, check units, zone order, or the profile metric.

Cooling gives

$$
T_3=30+(T_2-30)e^{-0.018(50)}.
$$

Because $e^{-0.9}\approx0.407$, the exit is about $92.0^\circ$C. These three numbers form a regression test for the code. A change in solver or refactoring should reproduce them within the declared numerical tolerance.

Now halve speed to $0.005$ m/s. Every residence time doubles. The preheat exit rises, the reflow exit rises, and cooling has more time to act. The relationship is not “slower means every temperature is larger”: slower motion raises temperature in hot zones but can lower final temperature by allowing more cooling. Decision metrics must be recomputed over the whole path.

Heating rate within a constant zone is

$$
\dot T=k(T_a-T).
$$

Its magnitude is largest immediately after entering a zone because the temperature gap is largest. In the idealized profile, an abrupt air-temperature jump can produce an abrupt change in slope. A real furnace has transition regions, so a measured slope spike may reveal that the piecewise-constant ambient profile is too crude rather than that the board truly experiences an instantaneous change.

The calculation also shows why optimizing setpoints independently is dangerous. Raising reflow air temperature may increase peak and time above liquidus, but it also increases the entry heating slope. Slowing the belt changes all three zone durations. Increasing $k$ in the hot zones raises heating response, while increasing it in cooling can lower exit temperature. Parameter effects are coupled through the state passed from one zone to the next.

For a piecewise-constant model, the full trajectory can be propagated exactly by repeated $\Phi$ maps. Numerical integration is still convenient for smooth spatial profiles and nonlinear radiation, but the exact baseline is valuable. Compare the solver at every boundary. If error does not decrease when tolerance is tightened, inspect event placement or input interpolation.

Next restore the real process-window constraints. The toy profile is infeasible because it never crosses liquidus. A candidate change might reduce speed, raise the reflow setpoint, lengthen the hot zone, or increase effective heat transfer. Only speed and setpoints may be controllable in an existing machine. Keep physical parameters separate from decision variables: the optimizer should not “choose” a favorable heat-transfer coefficient.

Suppose calibration gives $k$ with a ten-percent interval. Evaluate the same recipe at low and high plausible $k$, preserving zone-specific correlations. Low $k$ can cause underheating in the hot zones; high $k$ can create excessive slope or peak. During cooling, the adverse direction may reverse. A robust design therefore cannot be obtained by setting every uncertain coefficient to one globally labeled “worst” endpoint without examining each constraint.

Finally, remember what this toy model omits. A thick board can have internal gradients, components have different thermal masses, radiation is nonlinear, and thermocouples add lag. The first-order model is useful when those effects are small relative to decision margins or when it is calibrated and validated over the intended board family. If a nominal result sits one degree from a hard limit, the correct response is not to print more decimals. Gather repeated runs, improve the thermal model where evidence demands it, and create an operating margin.

There is one more useful calculation hiding in the propagation map. Because zone residence time is $L/v$, a single-zone exit temperature can be written

$$
T_{out}=T_a+(T_{in}-T_a)e^{-kL/v}.
$$

Differentiate with respect to speed:

$$
\frac{\partial T_{out}}{\partial v}
=(T_{in}-T_a)e^{-kL/v}\frac{kL}{v^2}.
$$

In a heating zone $T_{in}<T_a$, so this derivative is negative: increasing speed lowers the exit temperature. In a cooling zone $T_{in}>T_a$, it is positive: increasing speed leaves the board hotter. This sign check should agree with finite-difference simulation. If it does not, the spatial-to-time conversion may be reversed.

The magnitude also matters. Sensitivity becomes small when the board has almost equilibrated with the zone because the remaining temperature gap is small. It can also be small when transit is so fast that little response occurs. Between those limits lies a region where modest speed changes strongly alter the exit. That region is operationally delicate and deserves wider margin or tighter speed control.

For the three-zone oven, do not apply this derivative independently while holding each zone's inlet temperature fixed. A speed change alters the upstream exit, which becomes the next inlet. The full derivative propagates through all zone maps. This is a compact example of coupled sensitivity: even a scalar temperature state carries memory of every earlier zone.

A useful plot therefore places conveyor speed on the horizontal axis and shows peak temperature, time above liquidus, maximum heating slope, and maximum cooling slope in aligned panels. Add horizontal process limits and shade the speeds satisfying every constraint. The intersection, not the most attractive individual curve, is the feasible operating window. Overlay uncertainty bands from repeated runs or parameter samples. If the feasible intersection disappears under plausible variation, the recipe needs redesign rather than finer optimization.

This figure also improves communication. An operator can see which constraint becomes active when speed drifts upward or downward. A table containing only the “optimal” speed conceals that direction. Good modeling produces not only a setting but a map of what happens nearby.

Before accepting that map, repeat it with a finer integration tolerance and a finer speed grid, then verify every boundary speed by direct simulation. Grid resolution should not decide whether a recipe appears feasible. Round the final machine setting to the controller's actual increment and evaluate the rounded value again. These small checks connect the continuous mathematics to the discrete machine an operator will use.

### Define process-window metrics before optimizing

Typical constraints involve maximum heating slope, cooling slope, time in a temperature range, time above liquidus, peak temperature, and perhaps profile area or symmetry. Define each algorithm precisely.

For a simulated trajectory, heating rate can be evaluated from the ODE or a verified derivative. Differentiating noisy measured temperatures directly produces spikes, so smoothing and uncertainty need justification.

Time above liquidus is the duration of the set where $T(t)$ exceeds the threshold. Locate crossings by root interpolation rather than counting coarse grid points. If several crossings occur, sum the intervals and inspect the cause.

Peak temperature should include interior stationary points and segment boundaries. A dense grid is acceptable only after resolution testing. An area metric such as

$$
A_T=\int_{t_1}^{t_2}[T(t)-T_{ref}]_+\,dt
$$

has degree-time units and needs a stated interval and reference. Minimizing it without feasibility constraints could reward an underheated board.

If smoothness or symmetry matters, define a measurable quantity. Phrases such as “the curve looks good” cannot be reproduced.

### Calibrate against furnace runs

Thermocouple data have timestamp, location, and sensor dynamics. Align entry time and speed. A timing shift can mimic a zone-boundary error. Bound any alignment parameter and examine whether it is identifiable.

A thermocouple can lag board temperature:

$$
\tau_s\dot T_s=T-T_s.
$$

Ignoring lag can bias board heat-transfer rate. Calibrate sensor response separately or fit it jointly with informative data.

Start with one effective coefficient and inspect residuals by zone and by heating versus cooling. If patterns remain, use a small number of physically meaningful coefficients. One free coefficient per tiny segment will interpolate a run and fail another speed.

Measure zone-air profile independently if possible. Freely fitting both $T_a(x)$ and $k(x)$ from one board curve creates confounding. Setpoints are not necessarily actual air temperatures.

Fit on one or more speeds and hold out another. Changed-speed prediction tests the crucial mapping from space to time. A model refit for every speed has limited optimization value.

### Hand and code checks

In a constant-temperature zone, the passive first-order board temperature moves monotonically toward ambient without overshoot. With $k=0$, temperature stays constant. If initial and all zone temperatures are equal, it remains constant.

As speed tends to infinity, residence time tends to zero and temperature changes little. Slower travel lets the board approach zone temperatures more closely, though it also increases cooling residence later.

Compare analytical piecewise-constant propagation with numerical integration for a simplified profile. Tighten tolerances and maximum step until peak, slope, and threshold durations converge.

Reconstruct energy balance. Integrated net heat input should equal $C[T(t_f)-T(0)]$ under the lumped model. If convection and radiation are separate, integrate both.

Test threshold algorithms on known curves. A process-window error can remain even when the ODE is solved perfectly.

### Optimize speed and setpoints

Decision variables include conveyor speed, selected zone setpoints, and perhaps fan settings. State hardware bounds and increments. Feasibility means every process constraint is satisfied.

Begin with a speed grid at fixed settings. Plot each metric versus speed and mark allowable bands. This reveals monotonicity, thresholds, and active constraints. Only then add setpoint optimization.

If throughput is the objective, maximize speed subject to quality. If energy and quality both matter, display a trade-off. Arbitrary weighted sums hide value choices.

Threshold metrics and piecewise zones can create nonsmooth or nonconvex response. Use grid-plus-local search or multiple starts and verify candidates independently.

Machine settings are discrete. Round and re-evaluate. Do not operate exactly on a nominal boundary when physical variability is meaningful. Report a feasible neighborhood.

### Build a robust operating window

Uncertain quantities include heat-transfer coefficients, heat capacity, actual zone temperature, entry temperature, speed calibration, and sensor offset. Board mass and heat capacity may be correlated.

Construct a credible set from calibration, repeated runs, and equipment tolerances. Evaluate candidate recipes across shared scenarios. Different extremes govern different constraints: high transfer may maximize peak, while low transfer may cause underheating.

Find speeds satisfying every hard constraint over the declared set. Compare nominal and robust intervals. If no robust recipe exists, improve sensing, control, or hardware rather than presenting nominal feasibility as safety.

Sensitivity identifies valuable process improvement. Narrowing zone-temperature variation may increase throughput more than another optimization algorithm.

### When the lumped model is insufficient

The Biot number compares internal conduction resistance with surface transfer. A small value supports near-uniform temperature. A multilayer board with components can still have local gradients, especially near high-mass packages.

A one-dimensional thickness model is

$$
\rho c\frac{\partial T}{\partial t}
=\frac{\partial}{\partial z}
\left(k\frac{\partial T}{\partial z}\right).
$$

Surface boundaries include convection and radiation. Layer interfaces require continuity of temperature and heat flux. Component geometry may need two or three dimensions.

Choose fidelity from the decision. If a surface solder joint is the quality variable and measurements support the lumped state, use it. If internal component peak controls damage, resolve the interior.

Compare low- and high-fidelity models at representative recipes. A validated correction or conservative margin may be adequate within a range. A PDE is not automatically more accurate; it also requires material data, boundary calibration, mesh convergence, and validation.

### Numerical verification of the distributed model

For a finite-volume discretization, balance energy in each cell. Face conduction entering minus leaving plus boundary exchange equals stored-energy rate. This conservative form handles material interfaces and irregular properties.

Refine mesh and time tolerance until peak component temperature, threshold durations, and surface flux stabilize. A smooth contour is not a convergence test. Check total energy balance across all cells.

Validate spatial profiles with multiple thermocouples or infrared measurements while accounting for contact and emissivity error. A model calibrated to one point cannot prove internal gradients.

Compare the distributed model's volume-average temperature with the lumped prediction. Differences reveal when the simpler surrogate is safe. Store a validity map across board types and speeds.

### Real-time control and recipe selection

An open-loop oven uses fixed speed and setpoints. Feedback can adjust heaters, fans, or speed, but board temperature is not always measured continuously. A state estimator combines zone sensors, board type, and occasional profile measurements.

Model-predictive control forecasts future temperature and enforces constraints. It needs a fast validated model, actuator dynamics, and delay. Test sensor bias, actuator saturation, communication delay, and model mismatch.

Feedforward recipe selection uses board mass, geometry, and entry temperature. A library of robust recipes may be easier to validate than unconstrained online optimization. Define fallback behavior for an unrecognized board or failed sensor.

Equipment fouling and aging change heat transfer. Monitor residuals from qualification runs. A sustained pattern should trigger recalibration or maintenance. Do not let an adaptive coefficient quietly hide hardware degradation.

### Miniature zone calculation

Take one zone at $200^\circ$C, entry board temperature $25^\circ$C, $k=0.02$ s$^{-1}$, and residence 60 seconds. The exit is

$$
T_{out}=200+(25-200)e^{-1.2}.
$$

Using $e^{-1.2}\approx0.301$ gives about $147.3^\circ$C. This should match code.

If speed doubles, residence halves to 30 seconds, exponent becomes negative 0.6, and exit is about $103.9^\circ$C. Faster travel sharply reduces heating.

Propagate several zones sequentially, using each exit as the next initial condition. This transparent calculation is a baseline for continuous profiles.

If a required threshold is above every zone air temperature, the passive model cannot reach it regardless of residence time. An optimizer reporting otherwise has a bug or an unmodeled heat source. Check attainable bounds before searching.

### Competition-paper evidence chain

Start the paper with manufacturing requirements, decision variables, and furnace geometry. Explain how speed converts zone position into time. Derive the heat balance and justify thermal fidelity.

Define every process metric in equations or reproducible algorithms. Show calibration and changed-speed validation before optimization. Report error in peak and threshold duration, not only overall temperature residual.

Plot metrics versus speed with allowable bands. Mark nominal and robust feasible intervals. Show representative slow, selected, and fast profiles so readers see why constraints activate.

Provide a table with settings, rounded machine values, expected metrics, uncertainty margins, and covered board range. Independently re-simulate the selected recipe and recompute metrics.

State limitations that could reverse the recommendation: component gradients, airflow change, different board mass, sensor lag, or radiation mismatch. Attach a monitoring and recalibration plan.

### Stress scenarios that reveal weak recipes

An initially cold board can violate minimum heating even if the nominal recipe is feasible. A hot board can raise peak. Zone undershoot and overshoot may occur together with speed error. Build coherent equipment scenarios.

Thermal coefficient uncertainty can be directionally adverse in different zones. Low heating coefficient underheats; low cooling coefficient can keep the board too hot. A single global multiplier may miss this. Use structured zone groups based on calibration evidence.

Thermocouple offset affects qualification decisions but not actual product temperature. Separate process variability from measurement uncertainty. A recipe might be physically safe yet impossible to verify with a poorly calibrated sensor; both matter operationally.

Board-to-board variability requires repeated runs. If only one trace exists, parameter confidence cannot represent manufacturing variation. Use conservative ranges and plan qualification.

### From profile to production decision

Throughput is proportional to speed, but defects and rework create nonlinear cost. A slightly slower robust recipe can have higher effective throughput if it reduces failure. Include quality yield and downtime when evidence exists.

Recipe changes have setup and validation costs. If optimizing many board types, cluster those with similar thermal response or build a parameterized recipe. Do not switch settings faster than the furnace can settle.

An operational dashboard should show current settings, qualified range, latest validation, and alarms. It should not expose an optimizer score without physical metrics. Operators need to know which limit is closest and what action is safe.

If measured profile approaches a boundary, investigate cause before automatically increasing margin. Drift may indicate heater, fan, speed, or sensor problems with different remedies.

### Broader transfer to continuous manufacturing

The same architecture applies to pasteurization, drying, sterilization, coating cure, and continuous furnaces. Material moves through a spatial field; speed maps space to time; internal state follows coupled dynamics; quality depends on an entire path.

In pasteurization, microbial lethality integrates a strongly temperature-dependent rate while product quality can degrade. In drying, moisture and temperature are coupled. In curing, reaction heat and conversion interact. Every application needs its own constitutive evidence.

The modeling workflow transfers: derive balance, define path metrics, calibrate, validate at changed speed, optimize within hardware bounds, robustify against variation, and monitor drift.

### Final audit for the reflow model

Check coordinate and time units, zone boundaries, initial condition, thermal coefficient units, sensor lag, and metric thresholds. Verify analytical segments, solver convergence, energy balance, threshold roots, and rounded settings.

Check evidence separation: setpoint versus measured air, board versus thermocouple temperature, calibration versus validation run, nominal versus robust interval. Check that uncertainty scenarios are documented and physically coherent.

Check decision claims: every recommended setting is feasible after rounding; every hard limit has margin; the objective reflects production value; and limitations define the covered board and equipment range.

<div class="mm-question-box"><span class="mm-callout-label">Process-design challenge</span><p>A nominal recipe satisfies every limit with less than one degree or one second of margin. Would you increase numerical precision, gather repeated-run variability, widen process margin, or all three? Numerical accuracy cannot replace evidence about physical variation.</p></div>

### Extended coupled-system studios

These studios widen the range of mechanisms while preserving the same discipline. Each begins with interacting states because one variable alone cannot represent the feedback that drives the decision.

**Studio A — Nutrients, algae, and dissolved oxygen in a lake.** A lake manager wants to limit harmful algal blooms without creating oxygen stress. Nutrient concentration supports algal growth. Algae alter oxygen through photosynthesis and respiration. Dead biomass decomposes and consumes oxygen. Mixing and atmospheric exchange also matter.

A minimal model might track dissolved nutrient, algal biomass, and oxygen. Nutrient enters from runoff, is taken up by algae, and can be recycled during decay. Algal growth depends on nutrient and light, with loss from mortality and settling. Oxygen gains depend on photosynthesis and reaeration; losses depend on respiration and decomposition.

Every coupling needs stoichiometry. Nutrient uptake should reduce nutrient when it increases biomass. Decomposition should transfer part of biomass back to nutrient and consume oxygen according to declared ratios. Summing elements can reveal a phosphorus or nitrogen balance even when total biomass is not conserved.

Light changes daily and with depth. Photosynthesis is therefore time-dependent, while respiration continues at night. Daily average models can miss nighttime oxygen minima, which may control ecological risk. If the decision concerns minimum oxygen, resolve the diurnal cycle or derive a conservative bound.

Temperature affects growth, decomposition, oxygen saturation, and reaeration simultaneously. A coherent hot-weather scenario should change all linked processes, not only one coefficient. This is where coupled modeling prevents inconsistent stress tests.

Calibrate nutrient and algae dynamics with repeated concentration and chlorophyll observations, but recognize that chlorophyll is a proxy and varies by species and condition. Oxygen sensors provide high-frequency data and can reveal diurnal phase. Sediment release may require an additional state or seasonal input.

Begin with equilibrium and invasion analysis. At low algae, can growth exceed loss under observed nutrient and light? If not, a bloom should not emerge from the model. At high nutrient, does saturation prevent unbounded growth? Does oxygen remain nonnegative under worst decomposition? Boundary checks are essential.

Management options include reducing nutrient load, aeration, mixing, or targeted biomass removal. Compare their effects on bloom peak, bloom duration, minimum oxygen, and intervention cost. Nutrient reduction acts upstream but may take time; aeration treats oxygen without removing bloom cause.

Validation should hold out a season or runoff event. A model tuned to one bloom may fail when species composition changes. Report structural uncertainty and limit claims to the observed regime.

A useful recommendation might identify a nutrient-load threshold combined with an aeration trigger based on forecast nighttime oxygen. Show trade-offs and the scenarios that activate each response. Avoid a single “optimal phosphorus value” without measurement and model uncertainty.

This lake system illustrates coupled stress: an action can improve one state while worsening another, and the worst oxygen moment can occur after the visible algae peak. Decision metrics must follow the full trajectory.

**Studio B — Migration between two regions with local capacity.** Two regions exchange population because of employment, housing, or seasonal movement. A model needs regional populations and directional flows. Treating net migration as one fixed number hides feedback from congestion and opportunity.

Let each region have local growth and carrying pressure. Movement from region one to two can depend on population in region one and an attractiveness difference. The reverse flow has its own mechanism. Write each directional flow once negative at its origin and positive at its destination.

When births and deaths are omitted, migration should conserve total population. Add the equations and check cancellation. If local growth exists, total change should equal the sum of those growth terms, not migration.

Attractiveness may depend on wages, housing cost, and congestion, some of which change with population. Algebraic attractiveness creates immediate feedback. If infrastructure or wages adjust slowly, add dynamic states. Otherwise the model can imply unrealistically instant equilibrium.

The same observed net flow can arise from large two-way flows or small one-way movement. Aggregate census totals may not identify directional rates. Origin-destination records, surveys, or mobility data provide stronger evidence. Privacy protection is required.

Equilibria can include balanced coexistence, concentration in one region, or multiple stable distributions. Nullclines show how capacity and movement interact. A policy building housing in one region changes capacity and perhaps attractiveness, so counterfactual coefficients may not stay fixed.

Use scenario analysis for job shocks or transport improvement. A faster link may increase commuting rather than permanent migration. If the state is residence population, commuting belongs to another flow or compartment. Define what is counted.

Decision outputs could be housing demand, infrastructure load, or service inequality, not merely population. Link these outputs carefully. A region can have stable total population while age or income composition shifts, requiring structured compartments if relevant.

Validate on a policy or economic change withheld from fitting. If the model cannot predict flow response, it should not support infrastructure counterfactuals. Report uncertainty in both total and regional balance.

The final policy should identify capacity and migration assumptions and show spillovers: expanding one region changes the other. Coupled models are valuable precisely because isolated regional forecasts cannot capture those transfers.

**Studio C — A genetic toggle switch.** Two regulatory proteins can inhibit each other's production. This mutual repression creates the possibility of two stable expression states, which is useful for understanding cell decisions and synthetic circuits.

A baseline uses production decreasing with the other protein through a Hill function and first-order degradation. Protein $X$ production is high when $Y$ is low; protein $Y$ production is high when $X$ is low. The equations form a positive feedback at the system level: more $X$ suppresses $Y$, which releases suppression of $X$.

Nullclines can intersect once or three times. In a bistable regime, two outer equilibria are stable and the middle one unstable. Initial conditions or transient inputs determine which state is reached. A one-time pulse can switch the system across the separatrix.

Hill coefficients and thresholds shape steepness. Large fitted cooperativity may compensate for missing molecular steps or measurement scaling. Use dose-response evidence and parameter profiles. Fluorescence observations include background, maturation delay, and degradation of reporter, so they are not instant protein states.

Stochasticity matters at low molecule counts. The deterministic ODE describes average or large-copy behavior, while random switching can occur between stable states. An energy-like landscape picture is qualitative unless derived from a stochastic model.

Experimental design can vary inducer pulses. Pulse amplitude and duration jointly determine switching. Map the boundary and compare with model prediction. A model fitted only at equilibrium cannot automatically predict transient switching.

The engineering decision might choose a pulse that switches reliably while limiting toxicity. Evaluate uncertainty, cell-to-cell variation, and reversion. A nominal trajectory crossing the separatrix is not a population guarantee.

Check positivity, equilibria, and local eigenvalues. Simulate from many initial conditions to visualize basins. If the model predicts unbounded protein, a production saturation or degradation term is missing.

This system demonstrates how coupled inhibition can create memory without an explicit memory variable. State history matters through which basin contains the present point. It also shows why one equilibrium analysis is not enough when multiple stable states exist.

**Studio D — Inventory and production in a supply chain.** A manufacturer, distributor, and retailer each hold inventory and face shipment delays. The decision is how to replenish without creating shortages or oscillatory overreaction.

For each stage, inventory rate equals incoming shipment minus outgoing shipment. Backlog can be a separate state when demand exceeds stock. Production or order pipelines are needed because orders placed today arrive later. Treating them as instantaneous creates unrealistic control.

A delay can be modeled explicitly, with a delay differential equation, or approximated by several transit compartments. A chain of stages creates a more concentrated travel-time distribution as stage count changes. Choose based on available data and implementation.

Replenishment rules often react to inventory error and forecast demand. Aggressive gain can create oscillation: a shortage triggers a large order; delayed arrivals create surplus; the next order collapses. This is the bullwhip effect as feedback with delay.

Linearize around steady flow and analyze eigenvalues or delay stability. A policy stable without delay may oscillate when lead time increases. Report margin and transient peaks, not only eventual balance.

Capacity and nonnegativity matter. Shipments cannot exceed stock and transport capacity. Production has ramp limits. A smooth unconstrained ODE can request negative inventory or infinite corrections. Use backlog and saturation explicitly.

Calibration uses orders, shipments, inventories, and lead times. Recorded sales under stockout understate demand; lost sales or backlog data are needed. Forecast error is an input uncertainty, while process variability affects lead time and yield.

Compare policies under common demand patterns: step increase, promotion pulse, seasonal wave, and correlated disruptions. Metrics include service level, backlog time, inventory cost, production variation, and recovery. A policy with low average inventory may be fragile to disruption.

Feedback should use available delayed information. A centralized policy may share downstream demand; a decentralized one sees only orders. Simulate the information structure actually deployed.

Validation can hold out a promotion or disruption. A policy tuned to ordinary noise may fail under a structural surge. Report fallback rules and capacity triggers.

The supply-chain example links coupled stocks, transport delays, feedback, and constraints. Oscillation is not necessarily external demand—it can be generated by the control system itself.

**Studio E — Thermal exchange among building zones.** A building has offices, hallway, and exterior walls with different temperatures. Heating one zone affects neighbors through walls and air exchange. A single indoor temperature cannot evaluate room-level comfort or control.

For zone $i$, thermal capacitance times temperature rate equals heater input, solar and occupant gains, exchange with outdoors, and exchange with other zones. A conductance $G_{ij}$ produces flow $G_{ij}(T_j-T_i)$, which appears oppositely in the two zone balances.

Summing all zone energy equations cancels internal exchange. Only exterior loss and inputs change total stored thermal energy. This is a powerful code check.

The network is a graph Laplacian system. Off-diagonal conductances are nonnegative; diagonal entries contain total outgoing conductance. Symmetry $G_{ij}=G_{ji}$ follows reciprocal passive conduction, while directed airflow can be asymmetric but must carry enthalpy consistently.

Wall temperature can be a separate state if thermal mass creates delay. Solar gain depends on orientation and shading. Occupancy is an input or stochastic process. Sensor location and calibration affect observed zone temperature.

Estimate conductances using controlled heating and natural cooldown across varied outdoor conditions. Parameters can be confounded with unknown internal gains. Night tests or measured power help. Validate on a different weather period and occupancy schedule.

Control decisions include thermostat setpoints, preheating, and airflow. Independent thermostats can fight: one zone heats while another cools, with exchange wasting energy. Coordinated control uses the coupled model.

Constraints include comfort bands, heater capacity, ventilation, and ramping. Evaluate energy, discomfort degree-hours, peak demand, and robustness to forecast error. A lower mean temperature is not acceptable if one occupied room violates comfort.

Model predictive control can preheat before occupancy using weather forecast and building thermal storage. Compare with schedule and thermostat baselines. Simulate with sensor noise, actuation delay, and uncertain occupancy.

Report which zones and parameters dominate uncertainty. If an unmeasured door opening changes coupling, monitoring or a robust rule may be better than a precise nominal optimizer.

These five studios show different consequences of coupling: delayed ecological harm, regional spillover, bistable memory, feedback-generated oscillation, and shared energy. The equations are useful because the arrows change the decision.

<div class="mm-key-box"><span class="mm-callout-label">Coupled-model checklist</span><p>Draw compartments and arrows; translate each arrow once with opposite signs; verify conservation and nonnegativity; identify equilibria and thresholds; test solver and parameter sensitivity; and connect the trajectory to a measurable decision criterion.</p></div>

That is enough equations for one sitting. Let the arrows settle. When you next meet a story with feedback—adoption, infection, ecology, heat—try drawing boxes and flows before opening any software. You may find that half the model appears on the page by itself.

And today's hidden reward: add the three SIR equations. Every infection term disappears, leaving zero. If that tiny cancellation now feels satisfying, you have acquired the compartment modeler's version of perfect rhyme.

## Knowledge Check

<section class="modeling-quiz" data-modeling-quiz="lesson-10" data-locale="en"></section>
