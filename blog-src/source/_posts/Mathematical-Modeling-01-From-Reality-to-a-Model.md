---
title: 1 - From Reality to a Model
date: 2026-09-14 20:00:16
categories: Mathematical Modeling
lesson_number: 1
lesson_level: 1
tags:
  - Modeling Cycle
  - Assumptions
  - Problem Decomposition
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A disciplined route from an ambiguous real question to variables, assumptions, equations, validation, and an actionable conclusion."
---

Welcome—come in, take a seat, and make yourself comfortable.

Every equation in this blog will be tied to a concrete decision, a unit, and a test. A plausible number is not enough: we need to know what generated it, where it applies, and which observation could overturn it.

Relax. This is the first blog post in the series; you do not need a solver, a clever algorithm, or a long list of formulas. We will begin with one ordinary commuter puzzle and discover how to turn a situation into a small question we can actually test.

Imagine a commuter who is usually picked up at 6:00 p.m. Today he arrives thirty minutes early, walks toward home, meets the car on the road, and gets home ten minutes ahead of schedule. **How long did he walk?** Write down a guess before you look for a formula. We know neither driving speed nor walking speed. That is exactly why this is a good first modeling question: the right relationship may matter more than the missing numbers.

Think of this post as a guided walk through a few real-looking problems. I will pose a concrete question, invite you to predict, make the assumptions visible, work through the smallest useful calculation, and ask what observation would overturn the result. The commuter is only our first puzzle. We will also ask how a field team can keep a sample box cool, how an automated campus cart should approach a timed gate, how a manager can staff a dining hall, and why a ski-resort owner might prefer a slower lift even though every skier asks for a faster one. Across all five, the common skill is turning a vague situation into a testable question.

Mathematical modeling is not the act of attaching a fashionable algorithm to a dataset. It is the controlled replacement of a real system by a simpler mathematical object that is useful for a stated decision.

Our commuter guess already contains the first modeling question: *what exactly are we trying to determine?* Before solving these examples, let us name the choices we will make in every one of them. Later, when the equations arrive, you can check whether each choice still matches the story.

## Model Foundations

### A model contract in operational language

The five requirements in the highlighted model contract—purpose, boundary, state, mechanism, and evidence—should be written as statements another person can challenge. “Study the transportation system” is not a purpose. “Choose the number of evening shuttle departures so that the ninety-fifth percentile wait is below fifteen minutes without exceeding forty driver-hours per week” is much closer. It names a decision, a service criterion, and a resource limit.

A boundary should be drawn in time and space. Does the shuttle model begin when a student arrives at a stop or when the student decides to leave a building? Does it end at boarding, at arrival on campus, or after a transfer? Does it cover weekdays only? A model that predicts stop waiting cannot claim it minimizes complete door-to-door travel unless the missing parts are added.

State describes what must be known now to predict what happens next under the model. In a simple queue, the number of waiting people may be enough if arrivals and service have memoryless assumptions. In a bus network, we may also need bus positions, onboard loads, and current traffic. In a thermal box, temperature may be enough for a lumped model; if strong temperature gradients matter, one number is insufficient.

Mechanism links state and decision. It may be conservation, a differential equation, a transition probability, a behavioral rule, or an empirical relationship. Evidence tells us how the mechanism can fail. If a model says one extra bus reduces waiting, evidence might be held-out arrival days and observed travel times. If a model says a box remains cold, evidence is a temperature trace under representative loading.

Write the contract in a table:

| Component | Operational statement | What could prove it inadequate? |
|---|---|---|
| Purpose | choose evening departures under a driver-hour budget | decision cannot be implemented or metric does not reflect service |
| Boundary | three stops, 5–10 p.m., weekdays, wait through arrival | transfers and walking dominate total experience |
| State | queue lengths, bus positions, onboard loads | two systems with same recorded state evolve differently |
| Mechanism | arrivals add riders; buses remove them subject to capacity and travel time | observed queues violate predicted flow repeatedly |
| Evidence | held-out days, peak scenarios, current schedule baseline | proposed schedule wins only on training days |

This table is not decoration for the report. It is a debugging tool. If the decision line contains no controllable variable, there is nothing to optimize. If the evidence line only says “the result is reasonable,” validation has not been designed.

### One ambiguous request, three different models

Suppose a campus says, “The dining hall is too crowded. Build a model.” That sentence can produce several legitimate but incompatible projects.

If the decision is staffing, let $s_t$ be servers assigned in time interval $t$. The boundary includes arrivals, service stations, and labor rules. Queue length is state. A queue or discrete-event simulation predicts waiting. The objective balances wait against labor.

If the decision is meal preparation, let $q_{kt}$ be portions of dish $k$ prepared by time $t$. Inventory and temperature are state. Demand, spoilage, and kitchen capacity govern change. The objective balances shortage, waste, and cost.

If the decision is space redesign, variables describe entrance, pickup, and seating layout. Pedestrian flow, walking distance, and collision risk matter. Geometry and agent movement replace the service-only mechanism.

All three begin with the same complaint. None is “the dining-hall model.” A good first meeting does not ask for more data in general. It asks which decision must be made, by whom, when, and what consequence matters.

### Units as the first line of defense

Every term added in an equation must share units. If queue length is people, then over a time step $\Delta t$,

$$Q_{t+1}=\max\{0,Q_t+A_t-S_t\}$$

uses arrivals $A_t$ and completed services $S_t$ counted in people over that interval. If rates $\lambda_t$ and $\mu_t$ are people per minute, the update becomes

$$Q_{t+1}=\max\{0,Q_t+(\lambda_t-\mu_t)\Delta t\}.$$

Writing $Q_{t+1}=Q_t+\lambda_t-\mu_t$ while advancing fifteen-minute intervals silently treats a rate as a count. Code will run; units expose the error.

Exponents and logarithms require dimensionless arguments. The cooling expression $e^{-kt}$ is meaningful when $k$ has units inverse time. A probability lies between zero and one and has no unit. A weighted sum of dollars and minutes needs normalization or weights with explicit conversion meaning.

Do a unit audit before parameter fitting. Fitting can hide a unit error by absorbing conversion factors into coefficients. A model may predict well on one dataset yet fail when time is supplied in hours instead of minutes.

### Minimality is not oversimplification

A minimal model keeps the least structure needed for the decision and evidence. It is not the model with the fewest symbols. If a hard capacity constraint determines feasibility, it belongs in the baseline. If temperature stratification does not affect a short loading decision within measurement precision, it can wait.

Minimality gives a comparison point. Add one mechanism at a time and ask whether it changes fit, feasibility, uncertainty, or recommendation. If adding individual behavior changes a queue prediction but not the staffing decision, the simpler model may be enough for that purpose. If the decision flips, the extension has earned its place.

### A hand-calculated contract test

Take a campus printer room. One printer completes four jobs every ten minutes. At 2 p.m., six jobs wait and eight more arrive over the next twenty minutes. With no failures, can the queue clear by 2:30?

The boundary is one printer from 2:00 to 2:30. State is waiting jobs. Capacity is twelve jobs in thirty minutes. Total jobs needing service are fourteen, so at least two remain. This conclusion needs no simulation. If a later model predicts zero remaining jobs without adding a printer or changing service rate, it violates the baseline.

Now add job-size variability. The four-per-ten-minute rate was an average. A simulation may estimate a distribution of remaining jobs. The baseline remains valuable: it tells us the mean capacity scale and catches impossible outputs. Complexity builds on the contract rather than replacing it.

<aside class="mm-key-box" role="note" aria-label="The modeling contract">
  <span class="mm-callout-label">Key idea · The modeling contract</span>
  <p>A model must make five things explicit:</p>
  <ol>
    <li><strong>Purpose:</strong> What decision, explanation, or prediction is required?</li>
    <li><strong>Boundary:</strong> Which objects, time scales, and interactions belong to the system?</li>
    <li><strong>State:</strong> What quantities are sufficient to describe the system at a given moment?</li>
    <li><strong>Mechanism:</strong> How do those quantities interact or change?</li>
    <li><strong>Evidence:</strong> What observation could show that the model is inadequate?</li>
  </ol>
</aside>

This contract prevents a common failure: solving a mathematically interesting problem that is not the problem asked.

Let us make those five items less like a checklist and more like a conversation. If I say, “The campus shuttle is bad,” you cannot solve that sentence. Ask me what I mean. Maybe I miss my 9:00 class, maybe the average ride is slow, maybe evening riders have no service. Those are different **purposes** and could lead to different recommendations. Say I answer: “I need to decide whether to add one shuttle at 8:30 so that at least 90% of riders reach the classroom before 9:00 without exceeding the vehicle budget.” Now we have a decision and an observable success condition.

Next ask where the system begins and ends. Do riders arrive at a stop, board a bus, travel, walk from the drop-off point, and enter the classroom? If the target is arriving at class by 9:00, the last walk belongs in the **boundary**. If we count arrival at the bus stop as success, our model will give an answer to the wrong clock. We might ignore the rider's breakfast or what happens after class; those may not affect this decision. Write what you excluded, because somebody reviewing the recommendation will otherwise have to guess.

Now imagine a clock at 8:35. How much do we need to know to predict the next five minutes? Perhaps the number of people waiting at each stop, shuttle locations, free seats, and travel conditions. These are candidates for the **state**. Not every detail of every student's day is needed. But omitting the number of waiting riders would make it impossible to represent a queue. The test of a state is whether it contains enough of today's situation for your declared next-step rule to work.

What changes that state? Riders arrive; shuttles reach stops; passengers board until seats fill; buses leave; travel times pass. That story is the **mechanism**. We might start with fixed arrival and travel rates. We would not claim they are permanent facts; they are a simple baseline. If rain delays travel and increases arrivals, we must either include rain as an input or declare that the recommendation is for ordinary dry mornings only.

And how would we know if the model is wrong? Record real arrival times at classes over several mornings, not just how accurately we predicted buses reaching the last stop. Compare the fraction of riders reaching class before 9:00 with the predicted fraction, and inspect bad mornings. That is **evidence** tied to the original purpose. The five items now form one coherent question: what choice do we need, what events affect it, what quantities track those events, how do they evolve, and which observation could disprove our recommendation?

<figure class="mm-figure mm-figure--compact">
  <img src="/blog/images/mathematical-modeling/modeling-01-shuttle-system.svg" alt="Campus shuttle system boundary from rider arrivals to classroom arrival">
  <figcaption>The boundary ends at the classroom rather than the last bus stop because the decision concerns arrival before 9:00. Each box also names a quantity that can be measured or tested.</figcaption>
</figure>

For a first experiment, take a tiny stop with ten riders at 8:30, a vehicle with eight empty seats arriving at 8:35, and another vehicle arriving ten minutes later. If everybody needs to be in a classroom five minutes after drop-off, eight can catch the first shuttle and two cannot. You do not need a simulation to see why seat capacity matters. If a program says all ten catch the first shuttle, the tiny scenario immediately reveals a missing constraint. After your smallest example works, add several stops, uncertain arrivals, and real travel times. A beginner who can diagnose a ten-person example is better prepared for a thousand-rider dataset than one who starts by importing a sophisticated solver.

The shuttle gave us a purpose, boundary, state, mechanism, and test. Those five questions will also organize the thermal example below. We will keep each physical step beside its corresponding modeling idea, rather than collect unrelated puzzles in a separate chapter.

## Boundaries and States

Imagine a field team loading small, room-temperature sample vials into an insulated box containing a chilled thermal reservoir. For this illustrative example, we choose an upper box-temperature limit of $8^{\circ}\mathrm{C}$. **How many vials can we load before the contents reach that limit?** Take a moment to guess; the point is not to know the answer but to identify what determines it.

Counting vials alone does not tell us whether the box is cool enough. The common temperature $T_n$ of the reservoir and the $n$ vials already inside is our *state*. The vial count $n$ records how many steps occurred. A real storage protocol might also require a limit on *each vial's own temperature*, exposure duration, packing geometry, or contamination. We are not designing a real laboratory procedure here. Our first model answers only a carefully declared question about the **idealized common temperature**; those other requirements would need separate checks.

<figure class="mm-figure mm-figure--small">
  <img src="/blog/images/mathematical-modeling/modeling-01-thermal-box.svg" alt="Warm vial entering an insulated box with a chilled reservoir and existing vials">
  <figcaption>One loading step: energy carried by the new warm vial is redistributed across the reservoir and every vial already inside the chosen boundary.</figcaption>
</figure>

### System Boundary and Energy Balance

For one loading step, put the reservoir, all vials already inside, and the newly added vial inside our boundary. Let $C_c$ be the reservoir's effective heat capacity in joules per degree Celsius, $C_v$ each identical vial's effective heat capacity, and $T_v$ the incoming vial's temperature. We suppose everything in the box reaches a common temperature $T_{n+1}$ quickly, while heat exchange with the outside air during that step is negligible. The reservoir and the $n$ earlier vials gain energy; the new warm vial loses energy. Thus

$$
(C_c+nC_v)(T_{n+1}-T_n)=C_v(T_v-T_{n+1}),
$$

and solving for the new state gives

$$
T_{n+1}=\frac{(C_c+nC_v)T_n+C_vT_v}{C_c+(n+1)C_v}.
$$

Both sides of the balance are in joules. The weighted average should lie between the previous common temperature and the incoming vial temperature. If your code returns a value outside that interval, check the boundary, signs, and units before blaming the software. The factor $nC_v$ matters: vials that remain in the box also absorb some of the heat from later arrivals. This is not about a vial “using up” a fixed amount of coldness; both the temperature gap and the total heat capacity change after every addition.

### State Evolution and the Temperature Threshold

Let $C_c=83{,}600\,\mathrm{J}/^{\circ}\mathrm{C}$, $C_v=240\,\mathrm{J}/^{\circ}\mathrm{C}$, $T_0=4^{\circ}\mathrm{C}$, and $T_v=20^{\circ}\mathrm{C}$. These are illustrative numbers, not measured box specifications. The first step gives

$$
T_1=\frac{83{,}600(4)+240(20)}{83{,}840}\approx4.046^{\circ}\mathrm{C}.
$$

The small increase is sensible: one vial has much less thermal capacity than the reservoir. But the next vial will not cause exactly the same increase: the contents are warmer, and the first vial remains in the box. The total energy after $n$ identical additions gives a convenient closed form:

$$
T_n=\frac{C_cT_0+nC_vT_v}{C_c+nC_v}.
$$

You can check this by summing the initial reservoir energy and the energy brought in by $n$ vials, then dividing by their combined heat capacity. To stay at or below our chosen limit $T_{\max}=8^{\circ}\mathrm{C}$, we need

$$
\frac{83{,}600(4)+240n(20)}{83{,}600+240n}\le8.
$$

The denominator is positive, so rearranging gives $12(240)n\le4(83{,}600)$, or $n\le116.11\ldots$. The integer baseline permits **116 additions**: $T_{116}\approx7.997^{\circ}\mathrm{C}$, whereas $T_{117}\approx8.023^{\circ}\mathrm{C}$. The count is conditional on the chosen temperature limit and every assumption above, not permission to store actual samples without checking a real protocol.

Could we reach 116 without updating one vial at a time? Yes. At the final temperature of $8^{\circ}\mathrm{C}$, the reservoir has gained $C_c(8-4)$ joules, while each vial has lost $C_v(20-8)$ joules. Equating those totals gives the same threshold. This works because we fixed the *final* temperature and kept every vial inside; it does not mean the heat transferred by each vial at the moment of insertion was constant. The stepwise update is still useful for checking intermediate temperatures and for extensions such as heat leaks or unequal vials.

### Empirical Testing of the System Boundary

What would we measure before trusting the number 116? Record the reservoir's mass or stated thermal capacity, incoming vial temperatures, loading times, and thermometer readings at more than one box position. If top and bottom readings disagree substantially, the one-temperature state is inadequate. If the box warms while no vial is inserted, heat leaking through insulation matters too. Leave it closed for a control period equal to ten loading steps, then compare its warming with the loading experiment.

A useful log has insertion number, elapsed time, reservoir temperature before and after, vial type, and time the lid remained open. Ten careful observations can already test whether a first-step change near $0.046^{\circ}\mathrm{C}$ is plausible. If the measured change is much larger, inspect vial mass, open-lid heat gain, sensor position, and reservoir capacity. Change a parameter only when you can name the missing mechanism. If vials differ, replace the constant $C_v$ with $C_{v,n}$ in each step; if outside heat enters, add an energy term with units of joules. Neither extension should appear merely to make the formula look impressive.

Suppose field observations show the box crosses our limit after 70–90 vials, not 116. The answer is not to publish “116” with more decimal places. The difference tells us the baseline missed something: perhaps opening the lid, weaker insulation, or a smaller usable thermal mass. A recommendation must state the *tested operating range* and which measurements support it. If another requirement stops loading after 40 vials, refining the thermal count from 116 to 110 would not change the decision. This is where a modeler learns when to stop elaborating.

Finally, imagine the reservoir has half the thermal capacity but starts at the same temperature. With every other assumption fixed, the unrounded allowable count is proportional to $C_c$, so it halves; rounding down to a whole vial may affect the exact comparison. Predict the direction before calculating. If you can explain why, the mechanism is yours rather than a number you memorized.

We have framed one physical problem and followed a state update to a threshold. Many modeling questions instead ask us to assign, schedule, or choose. The same habit—translate the ordinary words into quantities with clear jobs—takes us to the dining hall.

## Language to Structure

<aside class="mm-key-box mm-theory-box" role="note" aria-label="Translate ordinary language into a model">
  <span class="mm-callout-label">Guiding idea · From words to math</span>
  <p><strong>Nouns</strong> become sets, states, or parameters; <strong>verbs</strong> become decisions or changes; <strong>qualifiers</strong> become objectives, constraints, or uncertainty.</p>
  <ul>
    <li>“Assign workers to tasks” suggests binary variables <code>x<sub>ij</sub> ∈ {0, 1}</code>.</li>
    <li>“At most one” becomes a sum bounded by one; “minimize total time” becomes an objective.</li>
    <li>“For every day” creates a time index; “uncertain demand” calls for scenarios or distributions.</li>
  </ul>
  <p>Before any equations, write one <strong>input–output sentence</strong>: “Given ___, estimate or choose ___ so that ___.”</p>
</aside>

This translation is a diagnostic, not a word-substitution trick. If the sentence cannot say what is known, what you may choose, and what success looks like, the equations are not ready. It also reveals dependencies between subproblems and prevents circular reasoning.

Let us translate an ordinary staffing request without skipping any steps. A manager says: “I have four workers and three stations—payment, food preparation, and pickup. At lunchtime each station must have at least one worker. Where should the fourth worker go so that customers wait less?” At first, the manager does not have an objective function. She has people, stations, a staffing rule, and a wish.

Draw four little circles for workers and three rectangles for stations. Connect worker $i$ to station $j$ if they can be assigned there. Let $x_{ij}=1$ when worker $i$ is assigned to station $j$, and $x_{ij}=0$ otherwise. Why only zero or one? In this half-hour snapshot, we are choosing a whole assignment; we are not asking a worker to be $0.42$ of a person. For each worker, the sentence “exactly one station” becomes $\sum_j x_{ij}=1$. For each station, “at least one worker” becomes $\sum_i x_{ij}\ge1$. These equations do not yet minimize waiting; they simply prohibit plans the manager cannot implement.

Now ask for service rates. Suppose the second worker at payment increases payment capacity from 25 to 50 customers per half hour, while a second worker at preparation increases its capacity from 40 to 70. If 60 customers arrive and pickup serves 80, allocating the spare worker to **payment** raises the three capacities to $(50,40,80)$; preparation is still the bottleneck at 40. Allocating the spare worker to **preparation** makes them $(25,70,80)$; payment is now the bottleneck at 25. Neither plan can handle all 60 arrivals in this oversimplified steady-state example. Even a fifth worker, giving two each to payment and preparation and one to pickup, leaves payment at 50. The manager needs more capacity, a changed service process, or a temporarily different objective. Optimization cannot conjure capacity the system lacks.

<figure class="mm-figure mm-figure--compact">
  <img src="/blog/images/mathematical-modeling/modeling-01-dining-flow.svg" alt="Dining hall flow through payment, preparation, and pickup capacities">
  <figcaption>Customers pass through a chain of stations. Increasing one capacity helps only until another station becomes the smallest-capacity link.</figcaption>
</figure>

Keep two columns labeled *question* and *mathematical representation*. “Can every worker serve every station?” goes beside the allowed edges of the assignment graph. “Must pickup always be staffed?” goes beside $\sum_i x_{i,\mathrm{pickup}}\ge1$. “How much does moving a worker improve waiting?” goes beside measured service times and a queue model. A sentence with no representation warns that you may have ignored part of the problem; a variable with no originating sentence warns that you may be optimizing something nobody requested.

When a prompt has multiple numbered tasks, do not assume the numbers are independent. A forecast of lunchtime arrivals may feed the staffing decision; staffing may feed a cost calculation; those results may feed a recommendation. Make an arrow diagram and label each arrow with what it passes. If the recommendation uses a 12:30 forecast calculated from a feature that is only known after 12:30, you have built a loop through the future. This dependency diagram exposes the mistake before code turns it into a mysteriously excellent accuracy score.

The assignment equations made the manager's rules explicit, but the capacities we used were estimates. The sample-box calculation likewise depended on a uniform temperature throughout the box and identical vials. How do we decide which simplifications are safe to keep and which ones might reverse the recommendation? That is the job of assumptions.

## Assumptions

### Assumptions as controlled approximations

An assumption is not an apology placed after the solution. It is a controlled approximation that makes a particular question answerable. A useful assumption states what is simplified, why the simplification is plausible at the chosen scale, how it affects the mechanism, and how we will test its influence.

Compare two statements:

> We assume all visitors are identical for simplicity.

and

> For the first capacity estimate, visitors share one mean service-time distribution. We later split first-time and returning visitors because preliminary data show materially different service durations; the recommendation is compared under both specifications.

The second tells us where the approximation enters and what evidence can challenge it.

### Classifying assumptions

Four categories help keep the assumption register useful.

**Boundary assumptions** decide what is outside: travel after leaving the network, overnight heat loss, long-term migration. **Structural assumptions** choose mechanism: well-mixed temperature, independent arrivals, linear cost. **Parameter assumptions** fill uncertain values: a 20% demand increase, five-minute service mean. **Operational assumptions** describe implementation: one staff member per open room, fixed shift lengths, no midweek fleet changes.

Their tests differ. Boundary assumptions are challenged by measuring omitted effects. Structural assumptions require alternative models or residual patterns. Parameter assumptions need sensitivity or uncertainty intervals. Operational assumptions should be confirmed with decision-makers.

### An assumption register with consequences

Create columns for statement, category, rationale, evidence, direction of bias, test, and status. Suppose a ski model assumes mean descent time is twenty minutes. The likely consequence of underestimating descent time is underestimating slope occupancy. The test is to collect representative lift-exit and base-return timestamps or stress $\tau$ over a credible interval. This is stronger than labeling confidence “medium.”

Direction of bias is especially helpful. Ignoring heat loss makes thermal endurance optimistic. Ignoring abandonment can make a queue appear longer than observed but may overstate demand actually served. Ignoring correlated storm failures can understate network risk. When direction is unknown, say so.

### Independence is a strong claim

Competition models often multiply marginal probabilities as if events were independent. Rain affects several road segments together. Crop yields share weather. Customer arrivals cluster around classes. Asset returns co-move.

If failures $A$ and $B$ are independent, $P(A\cap B)=P(A)P(B)$. Before using that relationship, ask what common cause could connect them. Scenario models can preserve coherent joint behavior. Correlation captures linear dependence but not every tail relationship. For an introductory model, the minimum honest step is to compare independent and common-shock scenarios.

### Stationarity and time scale

Assuming a rate is constant over a period is a time-scale choice. A dining hall may have roughly stable arrivals within ten-minute intervals but not across the whole day. A population growth rate may be stable over one season and not across policy changes.

Plot the data at the same resolution as the model. If one hourly arrival rate hides a sharp fifteen-minute peak, a staffing decision based on the mean can fail even while daily totals match. Conversely, a minute-by-minute model may chase noise if staff schedules change only hourly.

### Sensitivity begins before computation

Predict direction before running. If service time rises, queueing should worsen. If carrying capacity rises in logistic growth, long-run population should rise. If an output moves opposite to a structural expectation, investigate code, interactions, or the expectation itself.

For local sensitivity of output $y=f(\theta)$,

$$S_j=\frac{\theta_j}{y}\frac{\partial y}{\partial\theta_j}$$

is an elasticity when quantities are nonzero. $S_j=2$ means a 1% parameter increase produces approximately 2% output increase locally. Finite differences should use a step large enough to exceed numerical noise and small enough to remain local.

Global sensitivity samples parameters across ranges and captures interactions. It requires justified distributions or ranges. A wide arbitrary range can make any parameter look important. Tie ranges to measurement, literature, or scenarios.

### Contradictory assumptions

Teams sometimes assume demand is fixed in one section and forecast it as price-dependent in another, or call travel times deterministic while later applying a stochastic delay model. Maintain one register and link each equation. When an extension changes an assumption, state which version is active.

A particularly dangerous contradiction concerns information. An optimization may use tomorrow's realized demand although the decision is made today. This is anticipative. Replace realized values with forecasts or policies that adapt only after observations become available.

<aside class="mm-key-box mm-theory-box" role="note" aria-label="Assumptions are controlled approximations">
  <span class="mm-callout-label">Guiding idea · Controlled approximation</span>
  <p><strong>A useful assumption removes complexity without erasing the mechanism that controls the answer.</strong> Name its reason, its consequence, and the observation that would challenge it.</p>
  <ul>
    <li><strong>Structural:</strong> interactions, independence, network topology, or state definition.</li>
    <li><strong>Parametric:</strong> constants, bounds, distributions, or rates.</li>
    <li><strong>Operational:</strong> resource availability, policy, timing, or implementation rules.</li>
    <li><strong>Measurement:</strong> noise, missingness, resolution, or sensor bias.</li>
  </ul>
</aside>

For example, “travel speed is constant because the route is short and uncongested; therefore travel time is proportional to distance.” That sentence states both a reason and a mathematical consequence. A list of unsupported assumptions is decoration, not modeling.

Return to the sample box for a concrete test. We treated the chilled reservoir as one uniform volume. A thermometer near the lid and one near the base should report roughly the same temperature after each insertion. If they report $7^{\circ}\mathrm{C}$ and $4^{\circ}\mathrm{C}$, our one-temperature state is a poor description. A sensible extension might use two zones, but the **measurement** is what justifies the extra state. Do not invent spatial detail without checking whether it matters.

We also pretended that all vials have thermal capacity $240\,\mathrm{J}/^{\circ}\mathrm{C}$ and arrive at $20^{\circ}\mathrm{C}$. A small plastic vial and a heavy metal cartridge will exchange different amounts of energy. Record container types, contents, incoming temperatures, and approximate thermal capacities $C_{v,n}$. For a mixed loading sequence, use the corresponding $C_{v,n}$ at each step. If order is unknown, try plausible sequences or sample them from observed frequencies. This grows the toy model into an uncertainty analysis without losing its mechanism.

An assumption ledger keeps promises visible. Put “uniform box temperature” in one row, “equal vial thermal capacity” in another, and “negligible heat entering while the lid opens” in a third. Beside each, record why it is plausible, which result depends on it, and what observation could reject it. If the box sits in a warm room with its lid open, our predicted 116 vials could be far too high. Estimate incoming heat rate in watts (joules per second) and the time the lid is open. Then **power times time** is heat entering the box, with the same units as heat exchanged with a vial.

Not every assumption needs an elaborate sensitivity plot. If the field team needs to load only 20 vials, even a much lower stressed count might exceed 20. That decision could be robust. If it needs to load 95, small changes in heat gain or vial mix may push the answer across the threshold. Modeling effort should depend on how close the real choice is to the predicted boundary.

Once assumptions are visible, we can avoid two opposite mistakes: doing nothing because the real world is messy, or building an enormous model before we know what matters. Begin with the smallest calculation that respects the main mechanism, and add detail only when an observation shows why you need it.

## Baselines and Extensions

### The baseline ladder

A baseline is not one method. Build a ladder from arithmetic to mechanism:

1. scale estimate;
2. current policy;
3. simple deterministic model;
4. simple stochastic or scenario model;
5. proposed extension.

For study rooms, the scale estimate is seats times usable hours divided by booking duration. Current policy is today's schedule. A deterministic model uses mean arrivals. A scenario model tests exam peaks. A simulation adds time-varying arrivals and abandonment. Each rung must explain what the next adds.

### Example: bicycle rebalancing

A campus has two bicycle stations. At 8 a.m., station A has 30 bicycles and B has 10. During the morning, expected net demand moves 18 bikes from A to B. Capacity is 35 at each station. The simplest balance predicts end counts $(12,28)$, so no shortage or overflow on average.

That does not prove the system performs well. Demand occurs over time. If departures from A happen before arrivals return bikes, A may empty at 9 a.m. even though end-of-period balance is positive. The first extension uses hourly net flow:

$$B_{i,t+1}=B_{i,t}+R_{i,t}-D_{i,t}+u_{i,t},$$

where $u$ is operator rebalancing. Enforce $0\le B_{i,t}\le C_i$. Now the decision is when and how many bicycles to move.

The next extension represents uncertain arrivals. Scenarios can preserve correlated class schedules and weather. A robust policy may hold more buffer at A. A discrete-event simulation may model users turned away and alternative stations. Each extension answers a detected weakness: end balance ignored timing; deterministic flow ignored variability; station-only counts ignored user response.

### Deciding whether complexity changes the decision

Create a decision-stability table. Rows are model versions; columns show recommended action, objective, constraint slack, and key assumptions. If all versions recommend moving six bikes before 9 a.m., communicate that stability. If the stochastic model recommends twelve while the deterministic baseline recommends zero, investigate which variability drives the change.

Complexity can improve uncertainty even if the point decision stays unchanged. A simple model may recommend six bikes; scenarios may show any value from five to eight performs similarly but zero is risky. That confidence region is useful.

### Residuals tell us what to add

Do not extend a model merely because a more advanced method exists. Examine where baseline predictions fail. Queue residuals clustered at lunch suggest a time-varying arrival rate. Thermal residuals changing sign during loading suggest omitted heat gain. Spatial residuals near one neighborhood suggest missing geography.

An extension should target a pattern. After adding it, check whether the pattern shrinks on held-out data. If overall fit improves but the decision-relevant peak remains wrong, the extension has not solved the important problem.

### Overfitting in mechanistic models

Overfitting is not exclusive to machine learning. Adding many adjustable rates to an ODE can match one trajectory while producing unstable parameters. Adding penalties to an optimizer can tune one scenario. Adding queue classes can explain every fluctuation in training data.

Use held-out conditions, parameter plausibility, and simpler alternatives. Prefer mechanisms supported by observation. More equations do not automatically mean more truth.

### Counterfactual baselines

An intervention claim needs a comparison: what would have happened without the change? If a new shuttle schedule coincides with lower demand, a before-after comparison may credit the schedule incorrectly. Simulate both policies under the same arrival days or use matched historical periods. State which counterfactual is assumed.

For a competition problem without deployment data, compare policies under shared scenarios. Use the same random arrivals for current and proposed schedules. This common-random-number design reduces noise and makes differences attributable to policy.

### When to stop extending

Stop when additional detail does not materially improve decision, validation, or uncertainty relative to time and evidence. Also stop when parameters cannot be supported. A complex module with guessed inputs may create false precision.

The report should explain stopping: “Adding separate weekday service distributions reduced held-out error and changed staffing; adding individual demographic classes did not improve held-out peak waits, so we retained the simpler model.” This is evidence of judgment, not lack of ambition.

<aside class="mm-key-box mm-theory-box" role="note" aria-label="Build models in layers">
  <span class="mm-callout-label">Guiding idea · Earn complexity</span>
  <p><strong>Build in layers instead of beginning with the most elaborate model.</strong></p>
  <ol>
    <li>Start with a transparent baseline you can check by hand.</li>
    <li>Extend it to address the baseline's largest observed failure.</li>
    <li>Compare both under the same conditions and keep the extension only if it matters.</li>
  </ol>
</aside>

If a linear model already answers the decision robustly, a deep network is not automatically better. Complexity must purchase predictive accuracy, realism, computational tractability, or decision quality. Report that purchase explicitly. The box gives the rule; the thermal box and dining-hall examples below show how to apply it.

For our box, the transparent baseline is the uniform-temperature recurrence with no heat leak. The first extension is not “replace it with machine learning”; it is “measure warming while no vials are loaded, and account for that gain between insertions.” Put a thermometer in the closed box and leave it untouched for ten minutes. If it warms from $4$ to $4.1^{\circ}\mathrm{C}$, the loss of cooling may be tiny over a fast batch. If it warms to $6^{\circ}\mathrm{C}$, it is too important to ignore. The extension earns its place only if this difference alters the loading decision.

For the dining hall, a baseline is the demand-capacity balance. An extension could preserve individual arrival times and service-time variability in a discrete-event simulation. You need not know the name to grasp the idea. Keep a clock and a list of customers: when someone arrives, assign them to a free worker or make them wait; when a worker finishes, take the next customer. Repeating the clock events produces each person's wait. Compare predicted waits with real lunchtime observations. If the simulation changes the suggested staffing pattern during peaks, the extension solved a real limitation. If both models agree across the observed range, the simple balance might be sufficient for the manager's current decision.

The next example puts all of these ideas under pressure. It begins with a sentence that sounds obviously wrong—“a ski lift should be slower”—and shows why the sentence can be mathematically correct for one objective and economically foolish for another. The disagreement is not really about algebra. It is about what the word *capacity* means and whose outcome we are optimizing.

### Capacity Allocation in a Ski-Resort Circulation System

<aside class="mm-key-box" role="note" aria-label="The ski-lift modeling question">
  <span class="mm-callout-label">Modeling question · What does capacity mean?</span>
  <p>A resort has a fixed amount of skiable terrain. Should the owner add lifts and run them as fast as possible, or can a slower uphill system allow the resort to sell more tickets without putting more people on the trails?</p>
</aside>

<aside class="mm-key-box mm-theory-box" role="note" aria-label="Stop and think about the ski-lift problem">
  <span class="mm-callout-label">Stop and think · Make a prediction first</span>
  <p>Do not read the explanation yet. Imagine that the trails stay exactly the same but every lift suddenly carries people uphill twice as fast. On a piece of paper, predict what happens to:</p>
  <ol>
    <li>the number of skiers simultaneously on the trails,</li>
    <li>the total number of ticket holders the resort can admit, and</li>
    <li>the number of runs and the experience of one skier.</li>
  </ol>
  <p>Then write one sentence defining what you meant by <strong>capacity</strong>. Did you mean people on the snow, people moved per hour, total visitors inside the resort, or profit? Keep your prediction beside you; we will return to it after the small model is built.</p>
</aside>

Most skiers give an immediate answer: more lifts, faster chairs, shorter queues. That is a perfectly sensible **customer objective**. A skier wants more downhill runs per hour and less time standing at the base. But suppose the owner asks a different question: how many guests can be admitted while the number simultaneously descending remains below the trail's comfortable limit? Under that narrow objective, keeping guests off the snow for longer can increase the number of tickets that fit inside the system. A person sitting on a chair or waiting in a corral is a paying guest who is not currently occupying a trail.

This is why the first item in the modeling contract is purpose. “Improve the lift” is not an objective. Possible objectives include minimizing average wait, maximizing runs per skier, maximizing daily profit, limiting on-trail density, or maximizing the number of admitted guests. They can recommend opposite lift policies. Before writing an equation, we also have to separate three quantities that everyday language calls *capacity*:

- **trail capacity:** the comfortable or safe number of skiers simultaneously on the slopes;
- **lift throughput:** the number of uphill passenger trips delivered per hour;
- **resort population:** everyone admitted, including people descending, riding, waiting, resting, or eating.

Adding these quantities together or using one name for all three would make the argument look contradictory. Once they are separated, the paradox becomes a stock-and-flow problem.

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/modeling-01-ski-circulation.svg" alt="Snow mountain showing the ski trail, chairlift, base queue, lodge, and skier circulation loop">
  <figcaption>The resort is a circulation system rather than a single slope. A visitor alternates between the trail and off-trail states such as the lift, queue, connection area, and lodge.</figcaption>
</figure>

#### Single-Loop Circulation Model

Draw the smallest useful boundary: one lift serves one collection of trails, and a fixed population of $N$ guests repeatedly completes a loop. Let $T_d$ be a skier's average time actually descending and let $T_o$ be average time **off the trail** between descents—queueing, riding uphill, and moving through the loading and unloading areas. The average loop time is

$$
T_{\mathrm{cycle}}=T_d+T_o.
$$

For now, assume the day is in a roughly stationary period, guests keep circulating, and they have similar average loop times. A skier therefore spends the fraction $T_d/(T_d+T_o)$ of the loop on a trail. The expected number simultaneously descending is

$$
S=N\frac{T_d}{T_d+T_o}.
$$

If $C$ is the comfortable on-trail limit, the constraint $S\le C$ gives

$$
N\le C\frac{T_d+T_o}{T_d}
  =C\left(1+\frac{T_o}{T_d}\right).
$$

The ratio

$$
M=\frac{N_{\max}}{C}=1+\frac{T_o}{T_d}
$$

is the resort-population multiplier relative to the number that can comfortably be on the snow at once. This equation captures the owner's surprising argument. If downhill time stays fixed while the off-trail portion becomes longer, a smaller fraction of each guest's day is spent on the trails. The same trail limit can then coexist with a larger admitted population.

Notice what the equation does **not** say. It does not say that the mountain became larger, that lift throughput improved, or that customers received more skiing. It says only that more people can be stored in other parts of the bounded system while the on-trail stock stays under $C$.

#### Numerical Capacity Comparison

Suppose the trails feel comfortable with at most $C=400$ skiers descending at once, and an average descent takes $T_d=12$ minutes. Under a relatively fast uphill experience, suppose waiting, riding, loading, and unloading total $T_o=18$ minutes. Then

$$
M_{\mathrm{fast}}=1+\frac{18}{12}=2.5,
\qquad
N_{\max}=400(2.5)=1{,}000.
$$

In this baseline, a resort population of 1,000 corresponds to about 400 people on the trails at a typical moment and about 600 elsewhere. Now suppose slower service and a longer queue raise off-trail time to $T_o=36$ minutes. The same calculation gives

$$
M_{\mathrm{slow}}=1+\frac{36}{12}=4,
\qquad
N_{\max}=400(4)=1{,}600.
$$

From a narrow ticket-count perspective, the slower arrangement appears to support 600 additional guests without increasing average on-trail occupancy. If every ticket has price $p$, demand is unlimited, and there is no penalty for waiting, then revenue $pN$ pushes the owner toward a larger $T_o$. Under **that** model, “slower is better” is not a joke; it follows from the objective and boundary.

<figure class="mm-figure mm-figure--compact">
  <img src="/blog/images/mathematical-modeling/modeling-01-ski-capacity.svg" alt="Stacked comparison of on-trail and off-trail visitors under faster and slower circulation">
  <figcaption>Both scenarios keep the illustrative on-trail stock at 400. The larger total under slower circulation comes entirely from holding more visitors off the trails; it does not represent better service.</figcaption>
</figure>

But pause before treating 1,600 as a recommendation. The calculation silently turned a long queue into useful storage. It assumed guests do not leave, complain, take fewer future trips, request refunds, or crowd the base area. It also treated average occupancy as sufficient even though two narrow intersections can be dangerous while the mountain-wide average remains comfortable. Those are not small footnotes. They are mechanisms that can reverse the decision.

There is another distinction hiding inside “slower lift.” If chairs are spaced $d$ metres apart, each holds $q$ people, and the cable moves at speed $v$, an idealized hourly throughput is proportional to

$$
\mu(v)=60q\frac{v}{d},
$$

when $v$ is measured in metres per minute. Slowing the cable makes the ride longer **and** sends fewer chairs through the loading point each hour. Adding another lift increases total throughput and changes which trails receive skiers. So $T_o$ is not a free control knob: it emerges from cable speed, number of lifts, loading interruptions, demand, and queueing. If arrivals exceed throughput, the queue grows rather than settling at the tidy average assumed above.

#### Multi-Objective Operational Model

The baseline has done its job: it exposed the mechanism behind the paradox. The next layer should not simply add more symbols. It should repair the most important omission—the fact that an owner earns today's ticket revenue but also pays operating costs and depends on safety, satisfaction, and repeat demand.

Let $v$ denote lift speed, $m$ the number of operating lifts, $N$ the admitted population, $W(v,m,N)$ expected waiting time, and $S(v,m,N)$ expected on-trail occupancy. A more honest schematic decision is

$$
\max_{v,m,N}
\quad pN-c(v,m)-\alpha W(v,m,N)-\beta L(v,m,N),
$$

subject to

$$
S(v,m,N)\le C,
\qquad
W(v,m,N)\le W_{\max},
\qquad
v_{\min}\le v\le v_{\max}.
$$

Here $c(v,m)$ is operating cost and $L$ summarizes consequences such as refunds, lost repeat visits, base-area congestion, or service failure; $\alpha$ and $\beta$ translate those effects into the objective. The speed limits are not arbitrary mathematical decoration—real equipment, wind, loading safety, and evacuation rules bound what can be operated. We might also constrain density separately on beginner, intermediate, and expert terrain because one mountain-wide average can hide the location that actually fails.

This model does not guarantee that faster is best. Another lift may be expensive and may load the trails too quickly. Nor does it guarantee that slower is best. Once long waits reduce demand or future revenue, deliberately creating a queue can cost more than the extra tickets earn. The optimum can lie between the two extremes. The important result of modeling is not the slogan “faster” or “slower”; it is a clear explanation of which trade-off selects the speed.

#### Empirical Validation Plan

The ski-resort example also gives us a practical assumption ledger. Lift-gate timestamps estimate throughput and uphill cycle time. Periodic trail counts or privacy-preserving camera counts estimate $S$. Ticket scans estimate how many guests are present. Queue sensors estimate $W$ by hour, while surveys, complaint rates, return visits, and refund requests test whether waiting changes demand. Separate the data by weather, weekday, ability level, and terrain opening, because a powder morning with half the mountain closed is not the same system as an ordinary Tuesday.

Before building a simulation, test the simple identity on a calm hour. If $N=1{,}000$, $T_d=12$, and $T_o=18$, do observations show roughly 400 guests on the slopes? If not, perhaps guests take lodge breaks, descent times vary by ability, or the boundary misses another lift. That discrepancy tells us what to add. A useful next model could be a time-varying network: lift queues are nodes, trails are directed links, and guests move between terrain zones with different capacities. Such an extension is earned only if the one-loop model fails in a way that matters to the operating decision.

Now the original claim can be stated carefully. **For a resort owner who maximizes admitted ticket holders while constraining only average trail occupancy, a slower lift can make total resort population a larger multiple of trail capacity.** For an owner who values profit over several seasons, safety, guest experience, and repeat demand, “slower is always better” is no longer justified. The example is valuable precisely because both statements can be derived from different modeling contracts.

The box recurrence, dining-hall balance, and ski-resort circulation model all gave us answers under declared assumptions. None proves that field loading, campus demand, or a mountain will behave exactly as predicted. We now need to test the *whole path* from story to code to decision, not merely admire the final number.

## Validation

### Verification and validation are different questions

Verification asks whether we solved the equations we intended: is the code correct, are indexes aligned, and does the numerical method behave? Validation asks whether those equations are adequate for the purpose. Perfect code can implement a poor model. A realistic equation can be ruined by a coding error.

For the thermal box, verification includes reproducing one mixing step by hand, checking that temperature stays between physically plausible bounds, and confirming convergence as time step shrinks. Validation compares predicted temperatures with measurements from representative loading. If code matches its recurrence but the well-mixed assumption fails, verification passes and validation fails.

### Layer 1: implementation tests

Begin with deterministic cases. Set arrivals to zero and confirm a queue cannot grow. Set heat transfer to zero and confirm energy is conserved. Give an optimizer one feasible choice and verify it returns that choice. These are invariants and edge cases.

Test indexing at boundaries. Does a rolling three-day window include exactly three days? Does the last bus finish its route inside the horizon? Does a first-order recurrence use state $t$ or accidentally updated state $t+1$? Off-by-one errors frequently produce plausible plots.

Compare two implementations on tiny input: a vectorized function and a slow explicit loop. The loop is easier to inspect. Randomly generate small cases and assert agreement. For optimization, independently recalculate final objective and constraints from decoded decisions.

### Layer 2: internal consistency

Conservation is powerful. In a closed SIR system, $S+I+R$ remains constant. In inventory, opening stock plus inflow minus outflow equals closing stock. In a transport network, flow entering an intermediate node equals flow leaving unless storage is modeled.

Check bounds and signs. Probabilities belong in $[0,1]$; populations are nonnegative; binary variables are truly integer after rounding; service completions cannot exceed people available. Check monotonic relationships where structural: increasing capacity should not worsen the best achievable objective if all previous choices remain feasible.

Dimensional consistency belongs here. An equation can fit data with inconsistent units because parameters absorb errors, but transfer will fail. Print units in a variable table and annotate transforms.

### Layer 3: empirical adequacy

Separate calibration from evaluation. If parameters are fitted on all data and the same points measure error, the result describes fit, not prediction. Hold out later time periods, different locations, or different operating regimes according to the decision.

Use residuals $e_i=y_i-\widehat y_i$. Plot them against time, prediction, and key inputs. A mean near zero is not enough. Structure indicates missing mechanism: curvature, seasonality, increasing variance, spatial clusters, or autocorrelation.

Metrics must match consequences. Mean absolute error is interpretable; squared error emphasizes large misses; percentage error misbehaves near zero. For queues, peak wait and turn-away probability may matter more than average. For risk, calibration of tail probability matters.

### Layer 4: comparative evidence

Compare with current policy, simple baseline, and reasonable alternatives under the same cases. A sophisticated model with low raw error may not improve a decision. A simple model may perform similarly and be easier to explain.

Use paired scenarios. If proposed staffing and current staffing see different random arrivals, their outcome difference contains simulation noise. Feed the same arrivals and service draws to both. Repeat across scenario seeds.

For predictive methods, avoid future leakage. A feature computed from the full time series may use future values. Random train-test splits break temporal order. Fit preprocessing only on training data and evaluate chronologically when predicting the future.

### Layer 5: decision validation

Even accurate predictions may support a poor decision if the objective is wrong. Ask decision-makers whether costs, equity, safety, and implementation appear. Show alternative near-optimal policies. Conduct a tabletop exercise: could staff execute this schedule? Are required measurements available when decisions occur?

Decision validation includes monitoring after deployment. Define leading metrics and a trigger for revision. A staffing policy might be deployed for one week, with hourly arrivals, waits, and abandonment recorded. If peak wait exceeds threshold on two days, re-estimate or activate a contingency.

### Calibration versus discrimination

A probability model is calibrated if events predicted at 30% occur about 30% of the time. It discriminates if higher-risk cases tend to experience events more often than lower-risk cases. Both matter. A constant 10% predictor can be perfectly calibrated in a population with 10% events but useless for prioritization.

For capacity decisions, interval coverage and sharpness play similar roles. A 99% prediction interval from zero to one million contains everything and is not useful. Report whether intervals cover and whether they are narrow enough to change decisions.

### Stress testing and failure envelopes

Sensitivity changes inputs one at a time or globally. Stress testing asks whether the system remains acceptable under coherent adverse conditions. A campus shuttle stress may combine rain, class dismissal, and one unavailable bus. A thermal box stress may combine high ambient temperature, repeated opening, and warm payload.

Map a failure envelope: combinations of demand and service capacity where wait threshold fails. This is more informative than one worst case. Decision-makers see how much margin exists and which contingency is effective.

### Uncertainty decomposition

Distinguish input uncertainty, parameter uncertainty, structural uncertainty, stochastic variability, and numerical error. Running more Monte Carlo samples reduces simulation error but not an omitted mechanism. More decimal places do not reduce parameter uncertainty.

For each source, identify a response: collect data, estimate an interval, compare structures, simulate randomness, refine numerical tolerances. A final interval should not be described as “all uncertainty” if it varies only one parameter.

### Validation under distribution shift

Historical exam-week data may not predict a renovated library or a new booking app. Identify variables whose relationship can change. Test by time, subgroup, or location. Use scenarios when direct data are unavailable. Limit claims.

Monitor drift after deployment: arrival distribution, service time, residuals, and constraint violations. A model is a maintained decision process, not a one-time file.

### A full validation example: dining-hall staffing

Suppose a simulation recommends adding two servers from 12:00 to 1:00. Verification reproduces a small queue trace by hand and checks conservation of customers. Internal checks confirm no negative queues and completed service never exceeds capacity.

Empirical validation fits arrival and service distributions on three weeks and predicts a fourth. Residual plots reveal underprediction at 12:10, so time-varying arrivals replace one hourly mean. Comparative validation evaluates current and proposed schedules on the same held-out days and common random streams. Proposed staffing reduces median peak wait from eighteen to eleven minutes and ninety-fifth percentile from thirty-two to nineteen.

Stress testing raises arrivals 20%, removes one service station, and lengthens service for a menu change. The proposal remains under fifteen minutes in the demand stress but fails during station loss. Decision validation therefore recommends the schedule plus a contingency to redirect one staff member when a station closes. Monitoring records actual waits and abandonment for two weeks.

Notice the conclusion grew from layers. “Two servers are optimal” would be too strong. “Under observed and stressed demand, two extra noon servers improve peak waits; station failure remains the main vulnerability” is specific and actionable.

### What validation cannot prove

Passing tests does not prove universal truth. It raises confidence within tested conditions. Held-out data come from a finite range. Stress scenarios reflect imagination and evidence. Unknown mechanisms remain.

Use explicit scope: population, time, location, intervention, and metrics. A model validated for weekday lunch cannot claim weekend performance. This restraint makes future updating possible.

<aside class="mm-key-box mm-theory-box" role="note" aria-label="Five levels of model validation">
  <span class="mm-callout-label">Guiding idea · Five levels of validation</span>
  <p><strong>A plausible final number is not enough.</strong> Check the model at five different levels:</p>
  <ol>
    <li><strong>Implementation:</strong> does the code solve the equations written?</li>
    <li><strong>Internal:</strong> do units, bounds, conservation laws, and limiting cases hold?</li>
    <li><strong>Empirical:</strong> does it reproduce observations it was not fitted to?</li>
    <li><strong>Comparative:</strong> does it improve on a baseline under the same test?</li>
    <li><strong>Decision:</strong> would plausible uncertainty change the recommendation?</li>
  </ol>
</aside>

These checks ask different questions. Passing the first does not imply passing the fifth, so we will walk through them one by one with the shuttle example.

The final report should close the loop: question $\rightarrow$ abstraction $\rightarrow$ solution $\rightarrow$ evidence $\rightarrow$ decision. COMAP describes mathematical modeling competitions as an unscripted combination of modeling, problem solving, and writing; the deliverable is therefore an argument, not just a program ([official MCM/ICM instructions](https://www.contest.comap.com/undergraduate/contests/mcm/instructions.html)).

Let us validate the shuttle calculation one level at a time. First, **implementation**: set the toy stop to ten riders and eight available seats. Does your program leave two behind? If not, the boarding rule in the code contradicts the rule in your story. This check is often called verification. It does not prove the real shuttle system is modeled well; it proves only that your program carried out the declared rule on a case you understand.

Second, **internal plausibility**: a shuttle with eight seats cannot board nine people; predicted classroom arrival cannot be earlier than boarding; the number of riders waiting next minute should equal those already waiting plus new arrivals minus riders who boarded, assuming no one walks away. These are conservation, capacity, and chronology checks. You can catch impossible outputs even without collecting more data. A program that runs without errors can still violate all three.

Third, **comparison with the world**: collect several ordinary mornings of arrival, boarding, travel, and classroom timestamps. Fit any parameters on some days and test predictions on other days. Why not use the same days for both? Because a model can learn the quirks of the days it saw and still fail next Tuesday. If you use the actual travel time of the test-day shuttle as an input to a prediction that should have been made at 8:30, you have also leaked information from the future. Check what the dispatcher could really have known at decision time.

Fourth, **comparison with a baseline**: suppose the current schedule gets 78% of riders to class by 9:00. Your new plan predicts 92%. Test both against the same arrival scenarios, vehicle budget, and measurement definition. If the new plan needs another vehicle beyond the budget, the 92% is not a feasible improvement. If the old plan's 78% was measured on rainy days and the new plan's 92% on dry days, the comparison is not controlled. A useful baseline can be plain and imperfect; it must nevertheless be tested fairly.

Fifth, **decision stability**: what if travel time is five minutes longer than measured last week? Does the new plan still deliver at least 90% on time? What if arrivals at the busiest stop rise by 20%? You do not have to guess blindly. Change one input, rerun the calculation, and explain which riders miss the target. If a small plausible perturbation makes the recommendation fail, present the recommendation as conditional and consider a spare shuttle, an earlier departure, or another route. This is sensitivity analysis in the service of a real decision.

Finally, write the result for the person who asked. “Assign one additional eight-seat shuttle to the 8:35 stop arrival, subject to the vehicle budget; on held-out ordinary mornings the predicted on-time fraction rises from 78% to 92%, but the plan falls below 90% when travel is more than five minutes slower.” This is an *illustrative sentence*, not a measured result from Columbia's shuttles. It shows what a conclusion ought to contain: an action, a metric, a comparison, the operating range, and the main failure condition. A bare “accuracy = 92%” does not tell the dispatcher what to do.

If you are new to mathematics, you may worry that these checks make every answer uncertain. They do, in a healthy way. Modeling does not mean being afraid to conclude anything; it means knowing which conclusions are earned. Our commuter answer is exact under a clear symmetry assumption. The two-day theorem guarantees an existence result under continuity but not the location. The box's vial count is conditional on measured thermal values and stopping rules. The ski-lift multiplier is an accounting identity inside a deliberately narrow circulation model, not proof that frustrating customers maximizes long-run profit. The shuttle recommendation can be supported by held-out mornings but still need stress testing for rain. Different problems give different kinds of certainty, and this post should not pretend they are all the same.

The shuttle validation example was deliberately long. On a live problem you need a compact way to notice a missing decision variable, an unmeasured input, or a test you forgot to design. Use the following questions as a pause before moving from formulation to computation.

### Pre-Computation Checklist

Before proceeding, be able to answer:

- What is the decision variable or predicted quantity?
- Which data are observations, and which numbers are assumptions?
- What baseline can be solved today?
- What failure mode motivates the next layer?
- Which figure or test will support the conclusion?

If any answer is vague, the model is not ready for optimization.

You have seen a sample box, a shuttle, a ski resort, and several short definitions. Let us slow down and build one campus decision from its very first sentence. The dining-hall case will let us use the checklist while the variables and constraints are still small enough to check by hand.

## Dining-Hall Case

Suppose a university wants to reduce the waiting time at a campus dining hall without increasing the weekly labor budget. This sentence is still a **situation**, not a mathematical problem. We must decide who acts, what can be changed, what cannot be changed, and what “better” means.

### Step 1: Define the Decision Statement

Use the template introduced earlier:

> Given predicted customer arrivals, service times, worker availability, and labor costs, choose the number of workers assigned to each station in each 30-minute period so that expected waiting time is minimized while the labor budget and staffing rules are respected.

The nouns now become mathematical objects. Let $T$ be the set of time periods, $S$ the set of stations, $\lambda_{st}$ the expected arrival rate reaching station $s$ during period $t$, $\mu_s$ the service rate of one worker at station $s$, and $x_{st}$ the number of workers assigned to station $s$ during period $t$. Notice that $x_{st}$ is a decision, whereas $\lambda_{st}$ and $\mu_s$ must be measured or estimated.

### Step 2: Specify the System Boundary

The boundary might include arrival, ordering, payment, food preparation, and pickup. It might exclude where students go after collecting food. A boundary is neither correct nor incorrect by itself; it is useful when it contains the mechanisms that dominate the target quantity. If pickup congestion blocks the preparation station, pickup must be included. If it never blocks upstream work, it can initially be omitted.

Write a unit beside every quantity. For example, $\lambda_{st}$ has units customers/minute, $\mu_s$ has units customers/(worker·minute), and $x_{st}\mu_s$ has units customers/minute. A utilization estimate

$$
\rho_{st}=\frac{\lambda_{st}}{x_{st}\mu_s}
$$

is dimensionless. If $\rho_{st}\ge 1$, demand reaches or exceeds nominal capacity, so a stable steady-state queue should not be expected. This one calculation is already a useful baseline.

### Step 3: Separate Observations from Assumptions

Arrival timestamps, transaction durations, and schedules are observations. “Service times are independent” and “one worker has a constant service rate within a period” are assumptions. Estimate an empirical distribution rather than reporting only the mean: a mean of two minutes can hide a mixture of many 30-second orders and a few ten-minute orders.

Make an assumption ledger with four columns: assumption, reason, consequence, and test. The constant-rate assumption may be reasonable over a short interval; its consequence is a simpler queue; its test is whether the rate changes systematically within that interval. An assumption that cannot be connected to a consequence is probably too vague.

### Step 4: Construct a Baseline and One Extension

The baseline assigns enough workers to keep estimated utilization below a chosen threshold such as $0.85$. It ignores random variation but is transparent. The extension uses a queueing approximation or discrete-event simulation to estimate the waiting-time distribution. Compare both under the same arrival scenarios. If both recommend the same staffing pattern, the simpler model may be sufficient. If they differ during sharp peaks, the extension has identified where variability matters.

### Step 5: Define Falsification Criteria

Reserve several days for evaluation. Compare predicted and observed queue length, mean wait, 90th-percentile wait, and the fraction of periods exceeding a service target. Inspect errors by weekday and time of day. A model that is accurate at noon but fails at closing time has a defined operating range, not universal validity.

**Your first deliverable**

Create a one-page specification for a real system around you. It must include one decision sentence, a boundary diagram, a variable table with units, three assumptions with tests, one baseline, one extension, and two validation metrics. This exercise is deliberately algorithm-free: the purpose is to learn that formulation comes before computation.

**Work one dining-hall period on paper**

That specification can feel abstract, so let us pretend we are standing beside the dining-hall manager at 12:00. In the next half hour, past records suggest that about 60 customers will arrive at the payment station. One worker can serve about 25 customers per half hour under ordinary conditions. The manager can assign either two or three workers. Which arrangement would you try first? Make your own prediction before using a formula.

Two workers can serve about 50 customers in half an hour. If 60 arrive, a rough balance says the queue grows by 10 customers even if it was empty at the beginning. Three workers can serve about 75. In the same rough balance the station has capacity to absorb the 60 arrivals; the queue need not grow. The calculation is not a proof that nobody waits. Customers can arrive in a burst while servers happen to be busy. It is a first way to reject a clearly overloaded plan.

Express the same idea in units. At 60 customers per 30 minutes, the arrival rate is $\lambda=2$ customers/minute. Each worker's service rate is $\mu=25/30\approx0.833$ customers/minute. With two workers, nominal capacity is $2\mu\approx1.667$ customers/minute and $\rho=\lambda/(2\mu)=1.2$. With three, capacity is $3\mu=2.5$ customers/minute and $\rho=0.8$. The number $\rho$ is called *utilization*: it compares demand with capacity, and has no unit because the units cancel. A value over one is warning of persistent overload if the rates stay like this. A value below one leaves spare average capacity but does not guarantee a short wait during peaks.

Do you see why we wrote the 30-minute balance before saying “use queueing theory”? The manager's first question was whether the extra worker is plausibly necessary. The elementary balance answers that much without a distribution, a simulation, or a specialized library. If the team needs to know whether the 90th-percentile wait is below five minutes, the balance does not answer enough: it is time to model the variability of arrivals and service times. The *need for a sharper answer*, not our appetite for sophisticated mathematics, tells us when to extend the model.

We have also hidden a decision trade-off. Perhaps three workers at payment leave only one worker preparing food, so the bottleneck simply moves. Before the manager acts, the boundary must include other stations and the total labor constraint. If a worker costs USD 18 per hour, adding one for a half hour costs USD 9. Compare that cost with measured waiting and with the cost of longer waits. Without some valuation or a hard wait-time target, the phrase “optimal staffing” is unfinished: optimal with respect to *what*?

Try a quick counterexample. Suppose 30 of the 60 customers arrive within the first five minutes. Three workers' average capacity of 75 per half hour sounds generous, yet during those five minutes they can serve only about $3(25/30)(5)=12.5$ customers. A temporary queue of roughly 17 or 18 people forms. A model based only on total half-hour arrivals will miss this burst. You can test the constant-arrival assumption using timestamps, not by adding a vague sentence to the limitations paragraph.

If those timestamps exist, create two plots: cumulative arrivals against cumulative service capacity, and observed wait against predicted wait across several days. The gap between the two cumulative curves is an approximate queue. Measure whether errors cluster at lunch peaks; if so, shorten the time periods or use a stochastic queue. If predicted and observed waits agree under ordinary conditions but not at the first five minutes of lunch, report that precise operating range. A model that identifies its own weak spot is far more useful than one that prints a single unqualified staffing schedule.

**Data, choice, and rule are different kinds of quantities**

Let me spell out a distinction that beginners often learn only after a solver gives nonsense. The 60 arrivals are an *observation or forecast*: we do not get to change yesterday's timestamps. The number of assigned workers is a *decision*: the manager can choose it within staffing rules. The USD 9 cost is a *parameter* computed from wages and time. A sentence like “no more than three workers at payment” is a *constraint* on decisions. A queue of 18 at 12:05 is a *state* of the system, created by earlier arrivals and service. These labels are not ceremonial. They tell us which quantities can be optimized and which must be estimated.

You can test your understanding by changing only one quantity at a time. If arrivals increase to 75 while staffing remains at three, utilization becomes $75/75=1$ and the average spare capacity vanishes. If the manager assigns four workers with arrivals still at 60, utilization falls to $60/100=0.6$ but labor cost rises. If service capacity of one worker falls to 15 customers per half hour because of a slow register, three workers provide only 45; the queue grows despite a staffing number that looked fine yesterday. Every change corresponds to a different real-world intervention or failure, so do not silently treat it as the same scenario.

At this point, I would ask you to explain the case to a classmate without any Greek letters. You should be able to say, “Customers arrive faster than two workers can serve them, so a line builds. A third worker gives average breathing room, but a lunch rush can still create a line. We would check arrival timestamps and the other stations before changing the schedule.” If you can say that, the mathematical symbols have done their job: they clarified a decision rather than replacing it with jargon.

### Extending the dining-hall model without losing the thread

The half-hour calculation identified overload but did not predict a waiting-time distribution. The next model should answer a specific missing question: how variable arrivals and service translate into waits. Do not jump directly to a hundred-line simulation. Begin with a small discrete-time recurrence.

Let $A_t$ be arrivals during minute $t$, $C_t$ completed services, and $Q_t$ people waiting at the start. Then

$$Q_{t+1}=\max\{0,Q_t+A_t-C_t\}.$$

If three workers each complete a service independently with probability calibrated to the observed rate, $C_t$ is random and cannot exceed $Q_t+A_t$. Alternatively, use recorded service durations in a discrete-event simulation. In both cases the state update should agree with a hand trace.

Take five minutes with arrivals $(6,3,5,2,4)$ and capacity $(3,3,3,3,3)$, starting empty. The queues after each minute are $(3,3,5,4,5)$. Total arrivals are twenty and service capacity fifteen, so five remain. The recurrence and aggregate balance agree. If code produces four or six, inspect timing convention: do arrivals occur before service within each minute? Choose and document it.

Waiting time requires customer-level order or an approximation. Under first-come-first-served service, store arrival times in a queue and record departure minus arrival. Validate with a tiny list. If priority pickup exists, the discipline changes. Mean queue length and mean wait are connected by Little's law $L=\lambda W$ under stable long-run conditions, but this is a consistency check rather than a replacement for transient lunch peaks.

### From prediction to staffing optimization

Once a simulator takes staffing $x_{st}$ and outputs waiting metrics, define the decision problem. A stylized objective is

$$\min_x\quad
\sum_t\left(c_L\sum_sx_{st}+c_W\mathbb E[W_t]
+c_T\Pr(W_t>W_{\max})\right),$$

subject to worker availability, station minimums, skill compatibility, breaks, and weekly labor budget. The coefficients convert outcomes into a common scale. If stakeholders cannot justify such conversions, use hard service thresholds or present a Pareto frontier instead.

Shift rules couple periods. A worker cannot appear independently for one half hour if minimum shift length is four hours. Introduce assignment by worker and shift or use pre-defined feasible shift patterns. A simple staffing count can otherwise recommend an unimplementable patchwork.

Compare with current roster and utilization baseline. The simulator should earn its place by changing a decision or quantifying risk. If it recommends the same three-worker noon assignment but reveals a 15% chance of long waits, the added value is contingency planning.

### Forecast uncertainty enters before optimization

Arrival forecast $\widehat\lambda_t$ is not truth. Optimize across scenarios $\lambda_t^{(s)}$ drawn from held-out residual patterns or coherent historical days. Avoid treating every minute independently if lunch peaks shift together.

A risk-neutral schedule minimizes average cost. A robust or risk-sensitive schedule controls high waits. One transparent target is

$$\Pr\{W_t\le15\text{ minutes for every peak period}\}\ge0.9.$$

Estimate it on independent validation scenarios. With only ten scenarios, one failure changes the rate by ten percentage points, so acknowledge sampling uncertainty.

Information timing matters. Next week's staffing may use calendar and historical forecasts, not next week's realized arrivals. A same-day supervisor may adapt after observing an early surge. These are different decisions: a fixed schedule and a recourse policy. Model them separately.

### Behavior can close the feedback loop

If long queues make students leave, observed completions understate latent demand. If an app displays short waits, students may shift arrival times. Staffing changes behavior; arrivals are not always external.

Begin by checking data. Do entries fall when visible queues are long? Are abandoned customers counted? A simple abandonment model assigns patience distributions. A feedback extension lets arrival choice depend on predicted wait. Validate cautiously because preference parameters are difficult to identify from aggregate counts.

This is an example of a boundary expanding only after evidence. The first capacity model treats arrivals as given. Residuals or observed abandonment motivate behavior. We do not add psychology merely to sound realistic.

### Fairness and subgroup outcomes

Average wait can hide unequal service. Students with dietary restrictions may rely on one slower station. Staff may optimize common lines while that group waits longer. Report wait by station and relevant service need, subject to privacy and appropriate data.

A fairness constraint might require each group’s 90th-percentile wait below a threshold, or minimize maximum normalized wait. Such constraints can cost labor efficiency; show the trade-off rather than hiding it in a weight.

### Data schema and provenance

A reliable model begins with records that can be traced. A transaction table might contain anonymized transaction ID, station, queue-entry timestamp if available, service-start, service-end, and calendar features. Staffing table contains station, worker skill, shift start and end. Keep raw timestamps immutable; create cleaned fields in a pipeline.

Document timezone, clock corrections, missing events, duplicated transactions, and closures. A negative service time is not removed silently. Investigate whether timestamps came from unsynchronized systems. Report cleaning counts.

Aggregate only after deciding the question. Thirty-minute totals support capacity planning but hide five-minute bursts. Preserve event-level data where allowed. Fit preprocessing on training periods and apply unchanged to validation periods.

### A complete tiny experiment

Construct three candidate schedules for one lunch hour: current $(2,2,2)$ workers across three stations, balanced $(3,2,1)$, and demand-weighted $(3,1,2)$. Use twenty historical arrival-day traces held out from calibration. For every trace, run all schedules with identical arrival and service draws.

Record mean wait, 90th-percentile wait, maximum queue, abandonment, labor, and station-specific outcomes. Suppose demand-weighted staffing reduces overall peak wait but creates an unacceptable queue for the second station. Balanced staffing is slightly worse overall but satisfies every station threshold. The decision depends on service requirements, not merely the smallest mean.

Bootstrap days, not individual customers, if day-level conditions create dependence. Present paired differences from current roster. Stress with 20% higher arrivals and one absent worker. Independently check labor and staffing rules.

A recommendation might be: use balanced staffing on forecast ordinary days, activate a cross-trained backup when arrivals in the first ten minutes exceed threshold, and collect abandonment counts for two weeks. This is a policy with monitoring, not a mystical optimum.

### What the manager should see

The final page needs a decision table, one queue comparison figure, a sensitivity or stress figure, and limitations. Avoid leading with simulation architecture. Lead with action and evidence:

| Policy | Labor hours | Median peak wait | 90th percentile | Worst station | Stress feasible? |
|---|---:|---:|---:|---:|---|
| current | 6 | 18 | 31 | 35 | no |
| demand-weighted | 6 | 11 | 20 | 28 | no |
| balanced | 6 | 12 | 19 | 19 | yes under demand stress |

These numbers are illustrative. Their purpose is to show how complementary metrics can reverse a ranking. The lowest mean is not automatically the best implementable policy.

### Failure analysis as part of the answer

When the policy fails a scenario, preserve the trace. Did arrivals exceed forecast, service slow, or a station block another? Classify failures. If most come from worker absence, improve contingency rather than arrival model. If they come from a five-minute surge, increase temporal resolution or flexible staffing.

Use a fault tree: service target fails because capacity is too low, allocation is misplaced, or demand exceeds design. Each branch has observable indicators and remedies. This turns a model into operational learning.

### Reproducible handoff

Save raw-data checksum, cleaning log, fitted parameters, scenario seeds, schedules, output tables, and code commit. A teammate should rerun one command. The report's numbers should come from saved results, not manual transcription.

Add tests: the five-minute queue trace above, zero-arrival case, unlimited-capacity case, labor-budget assertion, and same-scenario comparison. Confirm plots label minutes and people correctly. Record which AI assistance, if any, was used according to rules, and verify every generated claim and citation.

### What the integrated case teaches

The workflow remained one argument even as detail grew. The purpose chose staffing. Boundary identified stations and time. State tracked queues. Mechanism balanced arrivals and service. Assumptions were tested. Baseline detected overload. Simulation addressed variability. Optimization compared feasible staffing. Validation used held-out paired days. Stress and monitoring limited the claim.

If we had started with an algorithm, these links could disappear. Starting with the contract lets every added component answer a visible question.

The dining hall was a full workflow: decide, calculate a baseline, and test it. We already used a physical balance for the sample box. Three more mathematical lenses sharpen different habits: an invariant can remove unknown speeds, continuity can prove existence without an exact path, and a threshold can separate braking from clearance. They are not new modeling cycles; they are tools for choosing a useful mechanism *inside* the cycle you know.

## Analysis Before Computation

Computing is most useful after we know what the computation should preserve. An invariant, bound, monotonic relationship, limiting case, or dimensional argument can eliminate wrong models and test code. These tools are not substitutes for data; they tell us what any data-driven or numerical answer must respect.

### Bounding before estimating

Suppose a delivery vehicle has eight hours, spends at least ten minutes at each stop, and travel time is nonnegative. It can visit at most forty-eight stops, even before travel. If software reports seventy, no parameter tuning is needed—the output violates a bound.

Bounds can combine resources. If every meal needs at least 0.2 kg ingredients and the kitchen has 100 kg, no more than 500 meals can be produced. If cooking capacity is 420, the tighter bound is 420. A lower bound may come from unavoidable distance or minimum staffing.

Present bounds alongside heuristic solutions. If an algorithm serves 410 meals against an upper bound 420, readers know the remaining possible gain. If it serves 200, more investigation is justified.

### Monotonicity and comparative statics

Ask how an output should move when one input increases, holding others fixed. In a simple capacity model, more servers cannot reduce maximum feasible service. In a cooling model, greater insulation slows temperature approach to ambient. In logistic growth, carrying capacity raises the long-run equilibrium.

Optimization complicates this: increasing budget cannot worsen the *best achievable* objective when old choices remain feasible, though the selected decision may change. If computed optimum worsens, check solver, random variation, or model changes.

Differentiate when possible. If $y=a/b$ with positive quantities,

$$\frac{\partial y}{\partial a}=\frac1b>0,
\qquad
\frac{\partial y}{\partial b}=-\frac{a}{b^2}<0.$$

The signs are structural. Numerical sensitivity later should agree locally.

### Limiting cases

Set a parameter to zero or infinity conceptually. If arrival rate goes to zero, queue should vanish. If thermal conductance goes to zero, an isolated box should not approach ambient. If mutation probability is zero and the population becomes identical, GA cannot create new genes. If penalty goes to infinity, infeasible points should lose unless numerical scaling breaks.

Limits reveal missing terms. A travel model with nonzero congestion cost when no travelers exist likely has an incorrect intercept or interpretation. An epidemic model that creates infections when infected count is zero violates mechanism unless imported cases are modeled.

### Nondimensionalization

Scale variables to reveal governing ratios. For cooling

$$C\frac{dT}{dt}=hA(T_a-T),$$

define $\theta=(T-T_a)/(T_0-T_a)$ and dimensionless time $\tau=hAt/C$. Then

$$\frac{d\theta}{d\tau}=-\theta,$$

with solution $\theta=e^{-\tau}$. Many physical boxes with different $C,h,A$ share one curve when time is scaled by $C/(hA)$. The ratio is the characteristic time.

Dimensionless groups reduce parameters and support experiment design. Measuring before and after several characteristic times is more informative than sampling arbitrary clock times.

### A threshold problem: battery-powered cart

A warehouse cart starts $120$ meters from a gate that closes in $30$ seconds. It accelerates at constant $a$ from rest but cannot exceed speed $v_{\max}$. Can it arrive?

Before simulation, determine whether maximum speed is reached. Time to reach it is $t_a=v_{\max}/a$ and distance then is $d_a=v_{\max}^2/(2a)$. If $30\le t_a$, distance is $\frac12a(30)^2$. Otherwise distance is

$$d(30)=\frac{v_{\max}^2}{2a}+v_{\max}(30-t_a).$$

The gate is reached if $d(30)\ge120$. This piecewise structure matters. Using $d=\frac12at^2$ beyond the speed cap overstates distance. Using $d=v_{\max}t$ from the start overstates early travel.

Suppose $a=0.3$ m/s$^2$ and $v_{\max}=6$ m/s. Then $t_a=20$ s and $d_a=60$ m. Over the remaining ten seconds, the cart covers 60 m, exactly reaching the gate. The condition is on a threshold. Small delay or lower acceleration causes failure, so a practical policy needs margin rather than celebrating equality.

If acceleration is uncertain, solve for the boundary and plot success region in $(a,v_{\max})$. The model becomes a decision aid: which cart settings give adequate buffer?

### An invariant problem: shared water tanks

Two tanks exchange water at rate proportional to level difference. Let volumes be $x(t)$ and $y(t)$ with

$$x'=k(y-x),\qquad y'=k(x-y).$$

Add equations:

$$\frac{d}{dt}(x+y)=0.$$

Total water is invariant. Subtract:

$$\frac{d}{dt}(x-y)=-2k(x-y),$$

so the difference decays exponentially. Therefore both approach the average $(x_0+y_0)/2$. A numerical solver should preserve total up to tolerance and show decaying difference. These checks validate code without knowing every time point.

If a leak is added to tank two, total no longer remains constant. The way the invariant fails identifies the added mechanism. Analytical reasoning helps organize extensions.

### A continuity problem: moving inspection teams

Two teams traverse the same trail on different days, one from north to south and the other from south to north, over the same clock interval. Let signed position from the north endpoint be $x_1(t)$ and $x_2(t)$. At start, $x_1(0)=0$ and $x_2(0)=L$; at end, $x_1(T)=L$ and $x_2(T)=0$.

Define $g(t)=x_1(t)-x_2(t)$. If motion is continuous, $g(0)=-L$ and $g(T)=L$. The intermediate value theorem guarantees some $t^*$ with $g(t^*)=0$. Speeds need not match, paths need not be monotone, and meeting need not occur at the midpoint.

The theorem's assumptions matter. If a team teleports by vehicle between disconnected trail points, continuity fails. If the trips use different routes, one scalar position may not identify the same place. State these boundaries.

### A pigeonhole problem: repeated measurements

A sensor reports an integer temperature from 0 through 50 once per minute for 52 minutes. At least two reports are equal by the pigeonhole principle because 52 observations occupy 51 possible values. This guarantees repetition without a probability model.

It does not guarantee consecutive equality or indicate which temperature repeats. Those stronger claims need more structure. Recognizing exactly what a theorem gives prevents overclaiming.

### Convexity before optimization

For twice-differentiable one-variable $f$, $f''(x)\ge0$ indicates convexity. In several variables, a positive semidefinite Hessian supports convexity. A local minimum of a convex function over a convex set is global.

Suppose staffing cost is

$$f(s)=c s+\frac{w}{s-\lambda},\qquad s>\lambda,$$

where the second term is a stylized wait penalty. Then

$$f''(s)=\frac{2w}{(s-\lambda)^3}>0.$$

There is one global balance in the continuous domain. Before applying a heuristic, solve $f'(s)=0$ and then check integer staffing nearby. Structure saves computation and gives a benchmark.

### Order-of-magnitude checks

Estimate scale. If a bus carries 50 people and makes six peak trips, capacity is about 300 passenger-trips. A prediction of 30,000 requires a unit or scope explanation. If a 10-liter thermal mass is assigned heat capacity equivalent to a swimming pool, parameters are wrong.

Use scientific notation and rough arithmetic before code. Order-of-magnitude checks catch decimal shifts, percentages entered as whole numbers, and minutes treated as hours.

### Analytical reasoning in a competition workflow

At the start, derive at least one hand-checkable case, one bound, and one directional expectation. During coding, turn them into tests. In the report, use them to interpret results. A reader then sees why output is plausible, not just that software produced it.

For every complex module, ask: what would happen in the smallest case? What is conserved? What cannot exceed what? What happens if a parameter vanishes? Which direction should change occur? These questions often reveal more than an extra page of algorithm description.

### Invariant Analysis: The Early Commuter

A commuter is normally picked up at the station at 6:00 p.m. One day he arrives at 5:30, does not phone his wife, and walks toward home along her usual driving route. She leaves at the usual time, meets him on the way, and they arrive home **ten minutes earlier** than on a normal day. How long did he walk? Before reading the answer, choose a number. A lot of people immediately say “thirty minutes,” because he arrived thirty minutes early. But that would require his wife to meet him exactly when she normally reaches the station; she meets him *on the road*, so he stops walking before then.

What information do we know about the car? We do not know its speed, the distance from home to the station, or the man's walking speed. Surprisingly, we do not need them if the wife's speed along the route is the same on the outward and return drives. Imagine the segment from the roadside meeting point to the station. On an ordinary day, she drives that segment *toward* the station and then the same segment *back* with her husband. On the unusual day, she skips it twice. The total driving time saved is ten minutes; hence **each** skipped traversal would have taken five minutes.

The meeting must therefore occur five minutes before her normal 6:00 arrival, at 5:55. The man started at 5:30 and walked until 5:55: he walked **25 minutes**. Check the clock calculation explicitly: $5{:}55-5{:}30=25$ minutes. The structure, not a measured speed, carried the answer.

<figure class="mm-figure mm-figure--small">
  <img src="/blog/images/mathematical-modeling/modeling-01-commuter-invariant.svg" alt="Road diagram showing the two equal car segments avoided by meeting early">
  <figcaption>The ten-minute saving is split across two identical traversals of the meeting-point-to-station segment, so each skipped traversal accounts for five minutes.</figcaption>
</figure>

Let me ask you to challenge it. What if the wife speeds up on the way home, or the road is one-way and the return route differs? Then the two saved traversals are no longer equal, so “five plus five” need not hold. What if she gets the news and leaves early? Then her departure schedule has changed, and the usual reference clock no longer works. The conclusion is conditional, as a model's conclusion should be.

This is a useful example of *invariants*: properties that remain usable even when other numerical details are unknown. You can model the full positions $x_{\mathrm{wife}}(t)$ and $x_{\mathrm{walker}}(t)$, introduce two speeds and a distance, and solve a system of equations. You could also notice the two skipped road segments and solve the problem in three lines. Simplicity here is not laziness: it exposes exactly why the answer is determined.

### Continuity Argument: The Two-Day Journey

On Monday, a walker sets out from village $A$ at 9:00 a.m. and reaches village $B$ by 5:00 p.m. On Tuesday, the same walker starts at $B$ at 9:00 a.m. and returns along the same path to $A$ by 5:00 p.m. Once a destination is reached, imagine the walker remaining there until 5:00. Must there be a point on the path where the walker was at **the same clock time** on both days? You need not know whether either day's speed is constant. The walker might pause, accelerate, or even backtrack. Take thirty seconds to imagine both journeys before following the proof.

One wonderfully concrete way to see it is to imagine two copies of the walker traveling *simultaneously* on the same path: Monday's copy walks from $A$ to $B$, Tuesday's copy walks from $B$ to $A$. At 9:00 the copies are on opposite ends. By 5:00 their ends have exchanged. If neither teleports and they stay on the same continuous path, they cannot exchange order without meeting. Their meeting point is exactly the position occupied at the same clock time on the two real days. The story is a proof, not a numerical prediction of *where* they met.

If you want mathematical notation, measure distance $x$ from $A$ along the route. Set $f(t)=x_{\mathrm{Monday}}(t)-x_{\mathrm{Tuesday}}(t)$. At 9:00, $f$ is negative: Monday is at $A$ ($x=0$), Tuesday at $B$ ($x=D$), so $f=-D$. At 5:00 it is positive: Monday at $B$ and Tuesday at $A$, so $f=D$. The intermediate-value theorem says a continuous $f$ that changes sign must take the value zero at some time $t^*$. At that instant the two positions coincide.

<figure class="mm-figure mm-figure--small">
  <img src="/blog/images/mathematical-modeling/modeling-01-continuity-crossing.svg" alt="Two continuous position curves crossing at the same time and position">
  <figcaption>The curves need not be straight or monotone. Shared endpoints and continuity are enough to guarantee at least one crossing.</figcaption>
</figure>

Why did I state the starting and ending **clock times**? If Tuesday's trip happens between midnight and 8:00 a.m., it need not share a time interval with Monday's trip, so “same clock time” has a different meaning. If the return journey follows a different road, equal distances from $A$ may refer to different actual places. We must state a common time interval, a shared continuous path, and continuous motion. That is the modeling work hidden beneath a very short theorem.

### Threshold Analysis: A Cart and a Timed Gate

Imagine a small automated delivery cart approaching a timed campus service gate. The gate controller announces that its opening phase will end after $T_g$ seconds. At that moment, a cart still outside the marked entrance has two options: stop before the entrance or continue and clear the gate before it begins closing. **How long should the controller keep the gate open so a cart at the edge of the comfortable-stopping region has a feasible continue option?** This is an invented example, not an engineering specification for an actual gate; a real operating system would require obstacle sensing, fail-safe behavior, and equipment-specific checks.

During a controller-to-brake delay $t_d$, the cart rolls at speed $v$ and covers $vt_d$. If braking then produces approximately constant deceleration $a>0$, it needs another $v^2/(2a)$ metres to stop. A cart closer than $d_s=vt_d+v^2/(2a)$ to the entrance cannot meet our assumed comfortable-stop rule. At constant speed, reaching the entrance from that boundary needs

$$
T_{\mathrm{reach}}=\frac{d_s}{v}=t_d+\frac{v}{2a}.
$$

Reaching the entrance is **not** the same as clearing the opening. If the gate zone is $w$ metres deep and the cart is $L$ metres long, the final part needs about $T_{\mathrm{clear}}=(w+L)/v$. Under our simplified constant-speed continue path, the full opening requirement is $T_g\ge T_{\mathrm{reach}}+T_{\mathrm{clear}}$. A real controller might have a separate clear-zone hold period; keep the two stages explicit rather than hide them inside one unexplained duration.

For illustrative numbers $t_d=0.4$ s, $v=2$ m/s, $a=1$ m/s$^2$, $w=3$ m, and $L=0.8$ m, reaching takes $0.4+2/(2\cdot1)=1.4$ s and clearance takes $3.8/2=1.9$ s. The simplified total is $3.3$ s. Every term is measured in seconds; a length divided by speed is time, and $v/a$ is time. Before trusting $3.3$, try slower braking, a longer cart, sensor delay, or an obstacle inside the opening. An obstacle should trigger a fail-safe response, not a more optimistic timing formula. The example shows how one decision divides into distinct physical stages and stress tests.

<figure class="mm-figure mm-figure--small">
  <img src="/blog/images/mathematical-modeling/modeling-01-cart-gate.svg" alt="Automated cart approaching a timed gate with a stop-or-continue threshold">
  <figcaption>The decision compares the time remaining before closure with the time required first to reach the entrance and then to clear the full gate zone.</figcaption>
</figure>

Each lens turned ordinary words into a mathematical claim. A competition prompt is rarely as tidy: it combines several claims, data sources, and deliverables. Let us carry the same habits into that larger setting before talking about software.

<!-- Competition-preparation material moved to Blog 2: Competition Techniques.

## Competition Evidence

This series prepares us to read both China's National Undergraduate Mathematical Contest in Modeling (CUMCM, 国赛) and COMAP's Mathematical/Interdisciplinary Contest in Modeling (MCM/ICM, 美赛). They are different competitions, not two names for the same set of A/B/C questions. The [CUMCM organizers describe](https://www.mcm.edu.cn/html_cn/node/7e54d6df0304aa37c5d0f92bf167a6bb.html) problems drawn from science, engineering, and social or economic settings. A useful but nonbinding way to approach its problem choices is:

- **A-type problems** often emphasize engineering physics, optimization, and differential equations.
- **B-type problems** often combine evaluation, optimization, and dynamic models.
- **C-type problems** often emphasize large datasets, forecasting, optimization, and evaluation.

These are tendencies, not official promises about what a particular letter will contain. For MCM/ICM, [COMAP lists six choices](https://contest.comap.com/undergraduate/contests/mcm/instructions.php): MCM A–C and ICM D–F; a team chooses one. The [2026 problems](https://contest.comap.com/undergraduate/contests/mcm/contests/2026/problems/index.html) ranged from smartphone battery drain and a moon-colony design to sports management, solar shading, and AI policy. That range is why I would not select a method merely from a letter. In either competition, first identify the state, decision, constraints, data, and evidence the specific prompt demands.

Imagine opening a competition prompt for the first time. It may describe a river, a traffic network, a supply chain, or a biological population. You probably feel pressure to identify “the right algorithm” immediately. Let us postpone that question. Draw four boxes: **what is happening**, **what must be decided or estimated**, **what information is available**, and **how the judges or stakeholders could test the answer**. For a river-pollution question, for example, water flow and contaminant concentration belong in the happening box. Predicting concentrations downstream goes in the estimate box. Flow measurements, sample locations, and timestamps belong in the information box. Held-out concentration measurements and a mass-balance check belong in the test box.

Only then ask whether you need a differential equation, an optimization problem, an evaluation index, or a forecast. Sometimes you need several—but in a dependency order. You may first fit a flow model from measurements, then predict concentration, then choose a cleanup location using those predictions. If you start with the cleanup optimizer without a defensible prediction, you optimize numbers you have invented. The category letters are labels for choosing a problem, not commands to use specific software packages. A data-rich MCM C problem and a data-rich CUMCM C problem may both call for careful cleaning and validation, but their actual questions, datasets, and deliverables still have to be read independently.

Do not carry one contest's award percentages or review process into the other: the organizers and award systems differ. What transfers is the need for a readable argument. In MCM/ICM, the official instructions require an English PDF solution with a first-page summary and cited outside sources; check the current rules before entering, because format requirements can change. A team in either competition should make it easy to follow what question it answered, why its assumptions are reasonable, how it solved the model, and how it checked the result. An extremely clever calculation that nobody can reproduce is a fragile submission.

What should you do when a prompt contains a whole paragraph of background context? Read once without writing equations. On the second pass, underline words that signal a target (“predict,” “minimize,” “recommend”), numbers with units, hard requirements (“must,” “cannot,” “at most”), uncertainty (“approximately,” “may,” “varies”), and time order (“before,” “after,” “next year”). On the third pass, put the tasks on arrows. This is not a ritual; it separates the problem from the decorative details and catches hidden dependencies between parts.

Consider this small toy prompt, which could appear in either style of competition: “A campus has a budget of USD 10,000 for an extra lunchtime staff pool. Recommend a weekly schedule to reduce peak waiting, assuming demand may rise by 20% next semester.” The budget is a constraint, not an outcome. “Weekly” suggests day and time indices. “May rise by 20%” demands a stressed scenario, not a single average. “Reduce peak waiting” asks for a metric that looks at unusually busy periods, not just the weekly mean. None of these translations required a famous algorithm; yet without them, even flawless code would answer the wrong question.

Suppose one teammate wants a neural network forecast, another wants a queueing simulation, and a third wants to draft the paper. How do you decide what to build first? Give each method an *input–output contract*. The forecast takes past arrivals and a calendar, and outputs a future arrival distribution. The simulation takes that distribution, service times, and a candidate staffing schedule, and outputs waits. A schedule search takes predicted waits and the labor budget, and outputs feasible choices. The paper takes all three plus tests, and explains a recommendation. If you cannot identify where the forecast is validated, the optimizer will inherit its errors; if a teammate cannot rerun the simulation, the paper's claims cannot be verified. The dependency diagram is a coordination tool as much as a mathematical one.

I would encourage a novice team to produce one imperfect but complete chain in the first hours: use historical mean demand, simple capacity calculations, a hand-checkable schedule, and a clear table. It might not win. That is fine. It tells you where to spend the next hour. If the recommendation changes wildly when demand rises by 20%, improve the forecast or design a robust schedule. If both forecasts give the same staffing, improve your validation narrative instead. Spending time where the answer is sensitive is more defensible than making every module maximally elaborate.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/modeling-04.webp" alt="The connected skills used in modeling competitions"><figcaption>The competition joins mathematics, computation, domain knowledge, and writing.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-06.webp" alt="Notion modeling workspace"><figcaption>Everyday notes and insights can become a shared knowledge base when the team prepares together.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-07.webp" alt="Collaborative document workspace"><figcaption>A shared document gives the team one current version of the narrative.</figcaption></figure>
</div>

We have a map of what a team must reason through. Now we can decide where the work should live. Software will not choose the boundary or validate a theorem for us; it can, however, make the calculation, collaboration, and writing reproducible once those jobs are clear.

## Reproducible Workflows

A modeling team's toolbox is not a list of brands to master. A shared notebook such as Notion helps ideas accumulate over time; a collaborative document holds the current draft; Python handles repeatable data work, simulation, and optimization; LaTeX helps with a long mathematical report; draw.io or PowerPoint helps make relationships visible; and an LLM remains an assistant whose claims and code we check.

**Notion** can be useful long before a team sits down with a competition question. After a class, a paper, or this blog, you might notice a good example, question an assumption, or think of a way to test a model. Put the thought in a shared notebook while it is still fresh. It need not be polished: note where it came from, what you understand so far, and what remains uncertain. When the team prepares together, those small entries become material everyone can read and discuss. For a particular problem, the team can then organize them into a map of questions, missing data, possible methods, and responsibilities. The notebook is a growing shared knowledge base, not merely a last-minute task board; the report itself belongs in the collaborative writing document.

Open a shared **Google Doc** or equivalent writing space early, even if its first version is ugly. Put in the working title, a two-sentence problem restatement, a variable table, and blank spaces for results. Why write before the math is finished? Because writing forces you to discover unanswered questions. If a paragraph says “our model predicts the best schedule” but you cannot yet say *what counts as best*, your objective is not fully specified. The document should track the logic of the work, not just receive it on the last night.

Use **Python** when the problem needs repeatable calculations: cleaning a CSV, implementing the box recurrence, simulating customer arrivals, drawing plots, or running an optimizer. Start with a tiny test that has an answer you can calculate by hand. For our box, the first vial should move the reservoir from $4$ to about $4.046^{\circ}\mathrm{C}$, between the initial reservoir and incoming vial temperatures. If Python reports $30^{\circ}\mathrm{C}$, the code failed a physical check. A script that reads raw data and produces the paper's tables is more useful than a notebook full of copied intermediate numbers.

Use **LaTeX** or Overleaf to compose a long technical report with equations, references, and figures whose numbering stays consistent. Before a competition, obtain its current official template or required format and compile a short practice document. Confirm that every teammate knows how to change a section, add a figure, and resolve a compile error. Do not wait until the last night to discover that your mathematical symbols render incorrectly.

Use **draw.io or PowerPoint** for a clear dependency diagram when the model has several modules. Draw arrows from raw arrival timestamps to the demand forecast, from that forecast to the staffing simulation, and from simulated waits to the recommendation. Write the units or meaning of what travels along every arrow. A nice-looking box diagram with arrows that do not name outputs is decoration; a rough diagram that exposes a missing input is useful.

Finally, you may ask **ChatGPT** to help brainstorm a baseline, explain unfamiliar mathematics, or draft test code where the applicable competition rules permit it. Treat the output as a suggestion, not as an observation, citation, proof, or validated implementation. If it offers a thermal-box model, check its units and whether it confuses heat capacity with temperature. If it offers a theorem for the two-day journey, check the endpoints and continuity. If it offers a source, open the actual source and make sure it supports the precise claim. Follow the current rules for using and disclosing AI tools—COMAP's instructions require disclosure in the MCM/ICM report. The team—not the assistant—owns the result.

Here is a concrete handoff ritual that saves beginners a lot of pain. At the end of a work block, each teammate leaves three things in the shared space: **what I produced**, **what I checked**, and **what the next person needs**. “I made a graph” is too vague. “I generated the observed-versus-predicted arrival plot from `arrivals.csv`, verified that time is in local minutes, and the next step is to inspect the noon residual spike” is actionable. The same discipline scales from a short worked example to a three-day competition.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/modeling-08.webp" alt="Python development environment"><figcaption>Python is the executable layer: every result should be reproducible from raw data.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-09.webp" alt="LaTeX writing environment"><figcaption>LaTeX keeps notation, figures, tables, and references consistent.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-10.webp" alt="Diagramming workspace"><figcaption>Architecture diagrams should expose model modules and data flow.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-11.webp" alt="AI assistant interface"><figcaption>AI can accelerate searching and drafting, but not supply evidence or responsibility.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-13.webp" alt="Weekly modeling work board"><figcaption>The weekly loop is read, reproduce, generalize, and document.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-14.webp" alt="Modeling workflow board"><figcaption>A visual task graph makes dependencies and bottlenecks explicit.</figcaption></figure>
</div>


Tools help us make reasoning reproducible, but a polished document does not itself prove understanding. The next habit is to inspect a completed modeling argument backwards—from its conclusion to the evidence and assumptions that support it.

### Reading, Reproduction, and Generalization

One practical way to keep learning is to read several strong papers legitimately released from **one year's competition**, whether from 国赛 or 美赛. If this is your first encounter with modeling, do not begin by trying to understand every line of algebra. On the first pass, ask: What real problem did the team answer? What were the three or four major steps? Which figure convinced me that the steps worked? What limitation did the authors admit? Write one sentence per answer. If you cannot answer the real-problem question, the paper's mathematics is not yet attached to its purpose in your head.

On the second pass, trace one claim backwards. Suppose the abstract says “our proposed staffing policy reduces the mean wait by 18%.” Find the table or figure containing that result. Find the baseline used for comparison. Find the data, simulation, or field measurement that generated both waits. Ask whether both methods were tested on the same period and conditions. If one was tested on quiet mornings and the other on a holiday rush, the 18% comparison would not mean what the abstract suggests. This backwards-reading habit gives you a way to understand a technical paper without already knowing all its methods.

When you find a good passage, ask **why** it works. Do more than copy a sentence that sounds polished. Annotate its job: Did it restate the decision? Motivate an assumption? Interpret a table? Limit a claim? For example, “The policy remains feasible when arrivals increase by 20%” is useful only if the paper shows a stressed scenario and tells us what “feasible” means. A pretty sentence without attached evidence is not a model explanation. A plain sentence with a reproducible comparison can be excellent writing.

Next, reproduce **three visualizations** that taught you something. Choose figures with different purposes: perhaps a time-series plot for change, a map for geography, and a baseline-versus-model comparison for evidence. If the original data are unavailable, construct a small illustrative dataset and say clearly that it is illustrative rather than pretending you reproduced the exact paper. Label axes and units; explain why a line, a map, or a bar chart matches its question. When you recreate a figure, you discover how much reasoning hides in axis choice, grouping, and caption. This exercise is therefore about understanding the *claim*, not merely imitating colors.

Once a paper catches your interest, try reproducing part of it. That can sound intimidating, so reproduce **one small result** first: a data summary, a simple baseline, or a hand-checkable intermediate calculation. Write down the inputs and expected output before running any code. If your result disagrees, distinguish missing data, undocumented preprocessing, different random seeds, and your own bug. Only then attempt a larger part of the pipeline. Reproduction is not a contest to copy the largest formula; it is a method for learning which steps in a modeling argument are actually doing work.

For “generalization,” revise an assumption in the reproduced model. If a commuter model treats all travel times as independent, ask what happens on rainy days when delays cluster. If a queue model uses one arrival rate all afternoon, ask what changes when lunchtime peaks. If a thermal-box model ignores warm air entering during loading, ask whether adding measured heat gain changes its recommendation. Make a prediction **before** modifying the code. Write down what moved, what stayed roughly the same, and what that teaches you about the model's boundary.

There is an operational side too: let everyone on the team become familiar with the shared notebook, document editor, Python environment, LaTeX, and diagramming tool; find legitimate materials and divide the reading; obtain the current official format for the competition you plan to enter and make a short test document compile. Think of these as rehearsal, not administrative busywork. If you know how to share a figure, rerun a script, find a source, and repair a broken equation before a timed competition, you spend the competition answering the actual question rather than fighting the tooling.

Here is a feasible calendar if you have a week. On day one, each person scans two papers and posts a one-page summary. On day two, discuss which claims are well evidenced and select one paper to reproduce. Days three and four go to one baseline and three figures, with each figure attached to a written claim. On day five, change one assumption and check the sensitivity. On day six, compile a short report in the official template. On day seven, teach the whole pipeline to another teammate in five minutes. If nobody can explain the evidence path orally, revise the report before calling it done.

Do not worry if your first attempt looks small. A defensible one-page result that answers a real question, shows a baseline, and explains a measured limitation is already a modeling achievement. Later blog posts will add mathematical machinery; this first post gives you the habits that make it trustworthy.

After practicing with published papers and these tools, we should check whether the modeling pattern transfers beyond the examples so far. The library question below has different people and constraints but the same need for a precise decision, changing state, simple baseline, and evidence. Try it before moving to the next post.

-->

Competition selection, tool use, paper reading, visualization practice, algorithm extension, and AI-assisted workflows now form the separate second blog, **Competition Techniques**. Here we will finish the fundamentals by checking whether the modeling pattern transfers to one new decision problem.

## Study-Room Case

### Rebuild the contract without copying the dining hall

Transfer means carrying reasoning, not copying equations. A study room is occupied for a duration and may require reservation; a dining station continuously serves individuals. The state, constraints, and evidence therefore change.

Suppose the library controls opening extensions for three rooms over five evening periods. Let binary $x_{rt}$ indicate room $r$ is open in period $t$. Let capacity $c_r$ be seats and staffing requirement $a_r$. A basic labor constraint is

$$\sum_r a_rx_{rt}\le B_t.$$

If opening a room requires consecutive periods, add logical constraints or choose complete shift patterns. Demand $D_t$ is groups seeking rooms, not individual seats if rooms cannot be shared. A four-seat room occupied by one two-person group has unused seats but is unavailable to another group under exclusive booking.

The purpose might be to choose extra hours tomorrow. The boundary includes requests, reservations, no-shows, room capacities, and staff; it may exclude general seating. State includes currently occupied rooms and remaining booking durations. Mechanism assigns arriving groups to suitable available rooms. Evidence includes booking logs, denied requests, occupancy checks, and held-out exam days.

### A hand calculation with heterogeneous rooms

Three rooms seat 4, 6, and 10. In one period, groups of sizes $(8,6,4,3)$ arrive. If assignment is first-fit by room order, the group of eight takes room 10, six takes room 6, four takes room 4, and three is denied. Total demand is 21 people and total seats 20, so at least one person cannot fit, but the unit is groups: denying the group of three means three people unserved.

If arrivals are $(3,4,6,8)$ and assignments take the smallest fitting room, three gets room 4, four may take room 6, six gets room 10, and eight is denied—eight people unserved. A naive “total seats” model says only one seat short in both cases, but indivisible groups and timing create different outcomes.

This miniature motivates bin packing or matching inside each period. If groups occupy multiple periods, current assignment affects future availability. The state must include remaining durations.

### Baseline and extension

A capacity baseline compares expected group-hours demanded with room-hours available by room-size category. It can identify obvious shortages. An extension simulates arrival time, group size, duration, cancellations, and assignment rule.

Do not optimize opening hours before specifying assignment. Extra capacity can appear ineffective under a poor assignment rule. Compare current first-available assignment with smallest-fitting-room policy. The latter preserves large rooms for large groups. The operational policy may improve service without more hours.

### Booking data do not reveal all demand

Observed bookings omit people who saw no availability and never submitted a request. Denial logs help. Search or page-view data may proxy latent demand but raise privacy and interpretation issues. A survey or short manual count can reveal walkaways.

If the library opens more hours, latent demand may appear. Historical completions alone can therefore underestimate benefit. Present a range or demand-response scenario instead of treating censored demand as zero.

No-shows complicate capacity. Overbooking can improve utilization but risks conflicts. Model no-show probability by time and context, validate calibration, and include a conflict cost. Do not assume independent no-shows if weather or exams create shared effects.

### A compact assignment model

Let groups $g$ have size $n_g$, arrival $a_g$, duration $d_g$. Binary $y_{grt}=1$ assigns group $g$ to room $r$ starting at $t$. Require

$$n_gy_{grt}\le c_ry_{grt},$$

which simply means exclude room choices with $n_g>c_r$. Each group is assigned at most once:

$$\sum_{r,t}y_{grt}\le1.$$

For every room-period $\tau$,

$$\sum_g\sum_{t:\,t\le\tau<t+d_g}y_{grt}\le x_{r\tau}.$$

The objective may maximize served groups or people while penalizing wasted capacity and extra staff hours. Maximizing groups favors small groups; maximizing people may neglect many small groups. Show this trade-off.

For online operation, future groups are unknown. The offline assignment is an optimistic benchmark. A real policy needs reservations or online rules. Comparing online performance to the offline bound measures information cost.

### Validation design

Use chronological held-out exam days. Replay request sequences through each opening and assignment policy. Use identical sequences. Report groups served, people served, denied demand by group size, unused room-hours, overtime, and maximum waiting.

Stress with more large groups, longer durations, no-show changes, and staff absence. Check that opening a room cannot reduce best achievable service; if a fixed greedy policy performs worse, distinguish policy behavior from capacity potential.

Interview staff about cleanup and closing transitions. An extension ending at 10 p.m. may require paid staff until 10:30. Include that operational time. Confirm accessibility and equipment requirements; capacity alone does not make rooms interchangeable.

### From model output to an adaptive policy

Instead of “always extend room 3,” a policy may say: extend the 10-seat room when forecast large-group demand exceeds threshold and staff are available; otherwise extend two smaller rooms. Monitor request composition during the first week.

Estimate threshold from scenarios, then round it to an operational rule. A slightly suboptimal simple threshold may be preferable to a complex schedule that staff cannot explain. Test near the threshold because forecast error can flip action.

### Transfer audit

Compare with earlier examples. Conservation still matters: occupied rooms plus available rooms match open capacity. Thresholds still matter: group size and demand trigger room choices. Assumptions still need tests: duration, no-shows, and latent demand. Validation still needs held-out shared scenarios.

What does not transfer directly? A queue utilization formula does not capture indivisible multi-period room assignments. A thermal state equation does not represent behavior. The reusable object is the workflow—purpose, boundary, state, mechanism, assumptions, baseline, extension, evidence—not one favorite formula.

### A final decision drill

Imagine that tomorrow's forecast contains twelve small groups and four large groups. Staff can extend either the 10-seat room for two periods or both smaller rooms for one period. Before calculating, state what information decides the choice: group durations, timing, which sizes fit, staff cost, and whether rooms can be shared.

Under one-period bookings, extending the large room for two periods supplies two large-room slots. Extending both small rooms for one period supplies two slots but neither may fit large groups. If large groups are likely to be denied and serving people is the priority, the large room may dominate. If large groups arrive outside the extension and many small groups arrive together, small rooms may be better. Total seat-hours alone cannot decide because compatibility and timing matter.

Now suppose forecast probabilities are uncertain. Scenario A has four large groups during extension; B has none; C has two with long durations. Evaluate both decisions under all scenarios. A minimax policy may protect large-group access. An expected-value policy may favor frequent small groups. Present regret:

$$R(a,s)=V^*(s)-V(a,s),$$

where $V^*(s)$ is best service in scenario $s$ and $V(a,s)$ is service under action $a$. Minimax regret chooses the action whose worst missed opportunity is smallest. This is an understandable alternative when probabilities are weak.

Check implementation. If the model recommends a room extension but cleaning staff cannot close afterward, action is infeasible. If equipment bookings reserve the room, availability data are incomplete. If the solution serves more groups by repeatedly denying large groups, an equity or priority rule may be needed.

Then state a bounded recommendation: “Under the observed distribution of group sizes and one-period bookings, extending the large room serves more people on held-out exam evenings; when projected large-group demand is below two groups, the two-small-room option serves more groups. Use the forecast threshold, retain a staff feasibility check, and monitor denied requests by size.”

This sentence contains conditions rather than hiding them. It also tells staff what to measure. If the threshold fails after deployment, the failure is informative: demand, duration, assignment behavior, or forecast has changed.

### What to write when evidence is limited

Sometimes there is no complete booking log. Do not fabricate precision. Build the hand-checkable capacity and assignment model, use clearly labeled scenarios, and propose a measurement plan. Distinguish conclusion from illustration.

For example: “With the illustrative arrival sequences, smallest-fitting-room assignment reduces large-group denial. Actual benefit cannot be estimated until denied requests and durations are recorded.” This is more credible than reporting 17.43% improvement from guessed data.

Limited evidence does not make modeling pointless. The model can reveal which measurements are decision-relevant. Here, total room occupancy is insufficient; group size, request time, duration, denial, and room compatibility are needed. That is a concrete result.

### The one-page model record

When you finish a first version, preserve one page containing:

- decision and decision time;
- boundary and state;
- variable table with units;
- mechanism equations or rules;
- hard constraints;
- assumptions and bias direction;
- hand-checkable case;
- baseline and proposed extension;
- validation data and metrics;
- stress scenarios;
- recommendation and failure trigger.

A teammate should be able to read this page and explain the model without opening code. If they cannot, the architecture is not yet clear. Update the record when assumptions or boundaries change. It becomes the bridge between analysis, implementation, and writing.

At this point transfer has succeeded. We did not copy a queue formula blindly. We reconstructed a model contract, discovered indivisible groups and duration, built a compatible baseline, identified missing demand, designed evidence, and returned to an operational rule. That is the skill this first blog is meant to establish.

One last habit will make the record stronger: attach one counterexample. Show a case where the baseline fails—perhaps two groups whose total size fits available seats but cannot be packed into the particular rooms. A counterexample explains why the extension exists. Also attach one success case where the baseline and detailed model agree. That prevents the extension from appearing necessary everywhere.

When results change, update the reasoning rather than only the number. If new denial logs show large groups are rare, the recommended room may change; the purpose and workflow need not. A maintainable model separates stable structure from revisable evidence. This is why clear variable definitions, data provenance, and tests matter even in an introductory project.

Finally, ask a person outside the team to read the one-page record and describe the recommendation, assumptions, and main failure condition. Misunderstanding is evidence too. Revise language until the model can be challenged on its real claims rather than on avoidable ambiguity. Good communication does not simplify away uncertainty; it makes uncertainty visible enough to use.

That review completes the loop from a vague complaint to a testable, revisable decision process grounded in evidence.

I want to make sure you can use these ideas in a new situation rather than merely recognizing my examples. Imagine a library wants to reduce the number of students turned away from study rooms during exam week. Its first request is “build the best model of room usage.” Stop and ask the librarian three questions. What decision can be changed—hours, bookings, room assignments, or the number of available rooms? What outcome matters—turn-aways, average wait, student satisfaction, or unused room-hours? When is the decision made, and what data are available *then*? Until those answers are clear, “best model” is not a well-defined target.

Suppose the answer is: “Tomorrow morning we must decide whether to extend each of three rooms' opening hours by up to two hours; we want fewer turn-aways, but staff time is limited to six additional staff-hours.” Assume one staff member covers each open room. We can now draw a boundary around arrivals, bookings, rooms, and staffing. Let $x_i$ be the extra hours assigned to room $i$, with $0\le x_i\le2$. The hard rule is $x_1+x_2+x_3\le6$ hours; because one staff member covers each room, the same sum also measures additional staff-hours. A count of students waiting at each hour is a changing state. Historical arrival times are data. The phrase “fewer turn-aways” suggests a measurable objective. You can see a model beginning to form without choosing an optimizer yet.

<figure class="mm-figure mm-figure--compact">
  <img src="/blog/images/mathematical-modeling/modeling-01-library-allocation.svg" alt="Three study rooms receiving extra hours under a shared staff-hour budget">
  <figcaption>The allocation variables control opening hours, while turn-aways and unused room-hours provide two complementary measures of whether the added capacity is useful.</figcaption>
</figure>

Begin with a tiny baseline. If each extended room can serve one additional two-hour booking, three two-hour extensions might serve three additional groups. That is a capacity estimate under the stated booking length, not a prediction that three groups will actually appear. If historical data show no one requests room three after closing, adding hours there would not help. If twenty students arrive all at once and rooms are booked in one-hour slots, our two-hour-booking assumption could misrepresent capacity. Those observations tell us which extension is worth studying: different booking lengths, hourly arrival peaks, or a better scheduling rule.

How would you test the recommendation? Use last week's or last semester's exam-period bookings to simulate what the proposed extension would have done, while being honest that demand can respond to added availability. Compare the same days under the existing schedule and the proposed one; report turn-aways **and** unused room-hours. Stress the result if arrivals rise during finals. If extending rooms one and two works on the data but fails whenever attendance is slightly higher, tell the librarian so. An actionable answer might be “extend rooms one and two first, monitor the hourly turn-away count, and revisit the assignment after one week.” That is a more modest, more useful conclusion than “our model achieves optimum efficiency.”

Can you now say how the library and the sample box are alike? Both began as vague requests; both required choosing a quantity that changes—waiting students or reservoir temperature; both had a success or stopping threshold; and both needed a test that could overturn a recommendation. Can you also say how they differ? A vial does not change its behavior when the box gets warmer, but students may change booking behavior when rooms become available. Physical conservation gives us a strong starting mechanism in one case; human behavior may require more careful observation in the other. Learning modeling means recognizing both the transferable structure and the limits of that analogy.

### Conclusions and Transferable Principles

Today we moved from a bus to a sample box, stopped at a ski resort, and then continued to a cafeteria and a library. They may not yet feel like parts of one neat story. Perhaps one example seemed almost too easy to deserve so much attention; perhaps another made you pause at a step that looked obvious on the page. Either reaction is fine. This is the first post, and we have not even begun the posts about particular named models. Learning to pick a question out of a real situation, choose what to keep, and ask whether the answer deserves our trust takes practice. One stubborn example is no reason to doubt that you can do it.

If you take one thought away, I hope it is a clearer sense of what *mathematical modeling* asks of us. **Mathematics** lets us say things precisely: what changes, how quantities relate, and why a conclusion follows. **Modeling** begins a little earlier, with listening to the real question. We build a smaller world in which we can reason about it, remain honest about what we left out, and bring the answer back to observations and data. A beautiful calculation that answers the wrong question, or falls apart when checked, is not the finish line. You do not need to remember every number from today. Noticing the question, the boundary, the assumptions, and the evidence is enough of a beginning.

The next posts will introduce particular models and methods, one at a time. For now, that is plenty. Close the laptop and take a break.

## Knowledge Check

The ten questions below move deliberately from recognition to synthesis. Questions may have one or several correct answers, so read the instruction on each card before checking it. The difficulty percentage is a target calibration rather than a claim about collected student data: the first question is designed to be accessible to roughly 90% of prepared readers, while the last is intended as a demanding 10% challenge.

<section class="modeling-quiz" data-modeling-quiz="lesson-1" data-locale="en"></section>
