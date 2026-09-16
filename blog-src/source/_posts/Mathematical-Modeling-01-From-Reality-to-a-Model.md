---
title: Mathematical Modeling 1 - From Reality to a Model
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

Relax. This is the first blog post in the series; you do not need a solver, a clever algorithm, or a long list of formulas. We will begin with one ordinary commuter puzzle and discover how to turn a situation into a small question we can actually test.

Imagine a commuter who is usually picked up at 6:00 p.m. Today he arrives thirty minutes early, walks toward home, meets the car on the road, and gets home ten minutes ahead of schedule. **How long did he walk?** Write down a guess before you look for a formula. We know neither driving speed nor walking speed. That is exactly why this is a good first modeling question: the right relationship may matter more than the missing numbers.

Think of this post as a guided walk through a few real-looking problems. I will pose a concrete question, invite you to predict, make the assumptions visible, work through the smallest useful calculation, and ask what observation would overturn the result. The commuter is only our first puzzle. We will also ask how a field team can keep a sample box cool, how an automated campus cart should approach a timed gate, and how a manager can staff a dining hall. Across all four, the common skill is turning a vague situation into a testable question.

Mathematical modeling is not the act of attaching a fashionable algorithm to a dataset. It is the controlled replacement of a real system by a simpler mathematical object that is useful for a stated decision.

Our commuter guess already contains the first modeling question: *what exactly are we trying to determine?* Before solving any of the four examples, let us name the choices we will make in every one of them. Later, when the equations arrive, you can check whether each choice still matches the story.

## What a model must answer

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

For a first experiment, take a tiny stop with ten riders at 8:30, a vehicle with eight empty seats arriving at 8:35, and another vehicle arriving ten minutes later. If everybody needs to be in a classroom five minutes after drop-off, eight can catch the first shuttle and two cannot. You do not need a simulation to see why seat capacity matters. If a program says all ten catch the first shuttle, the tiny scenario immediately reveals a missing constraint. After your smallest example works, add several stops, uncertain arrivals, and real travel times. A beginner who can diagnose a ten-person example is better prepared for a thousand-rider dataset than one who starts by importing a sophisticated solver.

The shuttle gave us a purpose, boundary, state, mechanism, and test. Those five questions will also organize the thermal example below. We will keep each physical step beside its corresponding modeling idea, rather than collect unrelated puzzles in a separate chapter.

## From purpose to state

Imagine a field team loading small, room-temperature sample vials into an insulated box containing a chilled thermal reservoir. For this illustrative example, we choose an upper box-temperature limit of $8\,^{\circ}\mathrm C$. **How many vials can we load before the reservoir reaches that limit?** Take a moment to guess; the point is not to know the answer but to identify what determines it.

Counting vials alone does not tell us whether the box is cool enough. The changing reservoir temperature $T_n$ is our *state*. The vial count $n$ is an output: it records how many steps occurred. A real storage protocol might also require a limit on *each vial's own temperature*, exposure duration, packing geometry, or contamination. We are not designing a real laboratory procedure here. Our first model answers only a carefully declared question about the **average reservoir temperature**; those other requirements would need separate checks.

### Draw a boundary before balancing energy

For one loading step, put the reservoir and the newly added vial inside our boundary. Let $C_c$ be the reservoir's effective heat capacity in joules per degree Celsius, $C_v$ the vial's effective heat capacity, and $T_v$ the vial's incoming temperature. We suppose they reach a common temperature $T_{n+1}$ quickly, while heat exchange with the outside air during that one step is negligible. The reservoir gains energy; the warm vial loses energy. Thus

$$
C_c(T_{n+1}-T_n)=C_v(T_v-T_{n+1}),
$$

and solving for the new state gives

$$
T_{n+1}=\frac{C_cT_n+C_vT_v}{C_c+C_v}.
$$

Both sides of the balance are in joules. The weighted average should lie between the old reservoir temperature and the incoming vial temperature. If your code returns a value outside that interval, check the boundary, signs, and units before blaming the software. Also notice that the model is not about a vial “using up” a fixed amount of coldness. Its energy exchange depends on the *current* temperature gap, which changes after every addition.

### Follow the changing state

Let $C_c=83{,}600\,\mathrm{J/^{\circ}C}$, $C_v=240\,\mathrm{J/^{\circ}C}$, $T_0=4\,^{\circ}\mathrm C$, and $T_v=20\,^{\circ}\mathrm C$. These are illustrative numbers, not measured box specifications. The first step gives

$$
T_1=\frac{83{,}600(4)+240(20)}{83{,}840}\approx4.046\,^{\circ}\mathrm C.
$$

The small increase is sensible: one vial has much less thermal capacity than the reservoir. But the next vial will not cause exactly the same increase, because the reservoir is already warmer. Define

$$
r=\frac{C_c}{C_c+C_v}=\frac{83{,}600}{83{,}840}\approx0.997137.
$$

Subtract $T_v$ from the update equation. It becomes $T_{n+1}-T_v=r(T_n-T_v)$, so repeated identical additions give $T_n=T_v+r^n(T_0-T_v)$. To stay at or below our chosen limit $T_{\max}=8\,^{\circ}\mathrm C$, we need

$$
r^n\ge\frac{T_v-T_{\max}}{T_v-T_0}=\frac{12}{16}=0.75.
$$

Because $0<r<1$, $\log r<0$; dividing by it reverses the inequality. Thus $n\le\log(0.75)/\log(r)\approx100.35$. The integer baseline permits **100 additions**: $T_{100}\approx7.988\,^{\circ}\mathrm C$, whereas $T_{101}\approx8.022\,^{\circ}\mathrm C$. The count is conditional on the chosen temperature limit and every assumption above, not permission to store actual samples without checking a real protocol.

Why not just divide “available thermal capacity” by the energy transferred per vial? Such a shortcut fixes the temperature gap at one value, while the recurrence allows it to shrink. You can use a rough division for an order-of-magnitude check, but not quietly replace a changing state with a constant per-step cost. The idea reaches beyond heat: whenever the next event depends on the current state, model the update first and count afterward.

### Test the boundary in the field

What would we measure before trusting the number 100? Record the reservoir's mass or stated thermal capacity, incoming vial temperatures, loading times, and thermometer readings at more than one box position. If top and bottom readings disagree substantially, the one-temperature state is inadequate. If the box warms while no vial is inserted, heat leaking through insulation matters too. Leave it closed for a control period equal to ten loading steps, then compare its warming with the loading experiment.

A useful log has insertion number, elapsed time, reservoir temperature before and after, vial type, and time the lid remained open. Ten careful observations can already test whether a first-step change near $0.046\,^{\circ}\mathrm C$ is plausible. If the measured change is much larger, inspect vial mass, open-lid heat gain, sensor position, and reservoir capacity. Change a parameter only when you can name the missing mechanism. If vials differ, replace the constant $C_v$ with $C_{v,n}$ in each step; if outside heat enters, add an energy term with units of joules. Neither extension should appear merely to make the formula look impressive.

Suppose field observations show the average reservoir crosses our limit after 70–90 vials, not 100. The answer is not to publish “100” with more decimal places. The difference tells us the baseline missed something: perhaps opening the lid, weaker insulation, or a smaller usable thermal mass. A recommendation must state the *tested operating range* and which measurements support it. If another requirement stops loading after 40 vials, refining the thermal count from 100 to 98 would not change the decision. This is where a modeler learns when to stop elaborating.

Finally, imagine the reservoir has half the thermal capacity but starts at the same temperature. The count should fall substantially, although the exact integer need not be exactly half because $r=C_c/(C_c+C_v)$ changes. Predict the direction before calculating. If you can explain why, the mechanism is yours rather than a number you memorized.

We have framed one physical problem and followed a state update to a threshold. Many modeling questions instead ask us to assign, schedule, or choose. The same habit—translate the ordinary words into quantities with clear jobs—takes us to the dining hall.

## Translate words into structure

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

Now ask for service rates. Suppose the second worker at payment increases payment capacity from 25 to 50 customers per half hour, while a second worker at preparation increases its capacity from 40 to 70. If 60 customers arrive and pickup serves 80, allocating the spare worker to **payment** raises the three capacities to $(50,40,80)$; preparation is still the bottleneck at 40. Allocating the spare worker to **preparation** makes them $(25,70,80)$; payment is now the bottleneck at 25. Neither plan can handle all 60 arrivals in this oversimplified steady-state example! This is a useful discovery: the manager might need a fifth worker, a changed service process, or a temporarily different objective. Optimization cannot conjure capacity the system lacks.

Keep two columns labeled *question* and *mathematical representation*. “Can every worker serve every station?” goes beside the allowed edges of the assignment graph. “Must pickup always be staffed?” goes beside $\sum_i x_{i,\mathrm{pickup}}\ge1$. “How much does moving a worker improve waiting?” goes beside measured service times and a queue model. A sentence with no representation warns that you may have ignored part of the problem; a variable with no originating sentence warns that you may be optimizing something nobody requested.

When a prompt has multiple numbered tasks, do not assume the numbers are independent. A forecast of lunchtime arrivals may feed the staffing decision; staffing may feed a cost calculation; those results may feed a recommendation. Make an arrow diagram and label each arrow with what it passes. If the recommendation uses a 12:30 forecast calculated from a feature that is only known after 12:30, you have built a loop through the future. This dependency diagram exposes the mistake before code turns it into a mysteriously excellent accuracy score.

The assignment equations made the manager's rules explicit, but the capacities we used were estimates. The sample-box calculation likewise depended on a uniform reservoir temperature and identical vials. How do we decide which simplifications are safe to keep and which ones might reverse the recommendation? That is the job of assumptions.

## Make assumptions visible

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

Return to the sample box for a concrete test. We treated the chilled reservoir as one uniform volume. A thermometer near the lid and one near the base should report roughly the same temperature after each insertion. If they report $7\,^{\circ}\mathrm C$ and $4\,^{\circ}\mathrm C$, our one-temperature state is a poor description. A sensible extension might use two zones, but the **measurement** is what justifies the extra state. Do not invent spatial detail without checking whether it matters.

We also pretended that all vials have thermal capacity $240\,\mathrm{J/^{\circ}C}$ and arrive at $20\,^{\circ}\mathrm C$. A small plastic vial and a heavy metal cartridge will exchange different amounts of energy. Record container types, contents, incoming temperatures, and approximate thermal capacities $C_{v,n}$. For a mixed loading sequence, use the corresponding $C_{v,n}$ at each step. If order is unknown, try plausible sequences or sample them from observed frequencies. This grows the toy model into an uncertainty analysis without losing its mechanism.

An assumption ledger keeps promises visible. Put “uniform reservoir temperature” in one row, “equal vial thermal capacity” in another, and “negligible heat entering while the lid opens” in a third. Beside each, record why it is plausible, which result depends on it, and what observation could reject it. If the box sits in a warm room with its lid open, our predicted 100 vials could be far too high. Estimate incoming heat rate in watts (joules per second) and the time the lid is open. Then **power times time** is heat entering the box, with the same units as heat exchanged with a vial.

Not every assumption needs an elaborate sensitivity plot. If the field team needs to load only 20 vials, even a much lower stressed count might exceed 20. That decision could be robust. If it needs to load 95, small changes in heat gain or vial mix may push the answer across the threshold. Modeling effort should depend on how close the real choice is to the predicted boundary.

Once assumptions are visible, we can avoid two opposite mistakes: doing nothing because the real world is messy, or building an enormous model before we know what matters. Begin with the smallest calculation that respects the main mechanism, and add detail only when an observation shows why you need it.

## Build a baseline, then extend it

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

For our box, the transparent baseline is the uniform-temperature recurrence with no heat leak. The first extension is not “replace it with machine learning”; it is “measure warming while no vials are loaded, and account for that gain between insertions.” Put a thermometer in the closed box and leave it untouched for ten minutes. If it warms from $4$ to $4.1\,^{\circ}\mathrm C$, the loss of cooling may be tiny over a fast batch. If it warms to $6\,^{\circ}\mathrm C$, it is too important to ignore. The extension earns its place only if this difference alters the loading decision.

For the dining hall, a baseline is the demand-capacity balance. An extension could preserve individual arrival times and service-time variability in a discrete-event simulation. You need not know the name to grasp the idea. Keep a clock and a list of customers: when someone arrives, assign them to a free worker or make them wait; when a worker finishes, take the next customer. Repeating the clock events produces each person's wait. Compare predicted waits with real lunchtime observations. If the simulation changes the suggested staffing pattern during peaks, the extension solved a real limitation. If both models agree across the observed range, the simple balance might be sufficient for the manager's current decision.

The box recurrence and dining-hall capacity balance gave us answers under declared assumptions. Neither answer proves that field loading or campus demand will behave exactly as predicted. We now need to test the *whole path* from story to code to decision, not merely admire the final number.

## Validate the entire reasoning chain

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

If you are new to mathematics, you may worry that these checks make every answer uncertain. They do, in a healthy way. Modeling does not mean being afraid to conclude anything; it means knowing which conclusions are earned. Our commuter answer is exact under a clear symmetry assumption. The two-day theorem guarantees an existence result under continuity but not the location. The box's vial count is conditional on measured thermal values and stopping rules. The shuttle recommendation can be supported by held-out mornings but still need stress testing for rain. Different problems give different kinds of certainty, and this post should not pretend they are all the same.

The shuttle validation example was deliberately long. On a live problem you need a compact way to notice a missing decision variable, an unmeasured input, or a test you forgot to design. Use the following questions as a pause before moving from formulation to computation.

### Working checklist

Before proceeding, be able to answer:

- What is the decision variable or predicted quantity?
- Which data are observations, and which numbers are assumptions?
- What baseline can be solved today?
- What failure mode motivates the next layer?
- Which figure or test will support the conclusion?

If any answer is vague, the model is not ready for optimization.

You have seen a sample box, a shuttle, and several short definitions. Let us slow down and build one campus decision from its very first sentence. The dining-hall case will let us use the checklist while the variables and constraints are still small enough to check by hand.

## Put the cycle together: the dining hall

Suppose a university wants to reduce the waiting time at a campus dining hall without increasing the weekly labor budget. This sentence is still a **situation**, not a mathematical problem. We must decide who acts, what can be changed, what cannot be changed, and what “better” means.

### Step 1: write the decision sentence

Use the template introduced earlier:

> Given predicted customer arrivals, service times, worker availability, and labor costs, choose the number of workers assigned to each station in each 30-minute period so that expected waiting time is minimized while the labor budget and staffing rules are respected.

The nouns now become mathematical objects. Let $T$ be the set of time periods, $S$ the set of stations, $\lambda_t$ the expected arrival rate, $\mu_s$ the service rate of one worker at station $s$, and $x_{st}$ the number of workers assigned to station $s$ during period $t$. Notice that $x_{st}$ is a decision, whereas $\lambda_t$ and $\mu_s$ must be measured or estimated.

### Step 2: draw the system boundary

The boundary might include arrival, ordering, payment, food preparation, and pickup. It might exclude where students go after collecting food. A boundary is neither correct nor incorrect by itself; it is useful when it contains the mechanisms that dominate the target quantity. If pickup congestion blocks the preparation station, pickup must be included. If it never blocks upstream work, it can initially be omitted.

Write a unit beside every quantity. For example, $\lambda_t$ has units customers/minute, $\mu_s$ has units customers/(worker·minute), and $x_{st}\mu_s$ has units customers/minute. A utilization estimate

$$
\rho_{st}=\frac{\lambda_{st}}{x_{st}\mu_s}
$$

is dimensionless. If $\rho_{st}\ge 1$, demand reaches or exceeds nominal capacity, so a stable steady-state queue should not be expected. This one calculation is already a useful baseline.

### Step 3: separate data from assumptions

Arrival timestamps, transaction durations, and schedules are observations. “Service times are independent” and “one worker has a constant service rate within a period” are assumptions. Estimate an empirical distribution rather than reporting only the mean: a mean of two minutes can hide a mixture of many 30-second orders and a few ten-minute orders.

Make an assumption ledger with four columns: assumption, reason, consequence, and test. The constant-rate assumption may be reasonable over a short interval; its consequence is a simpler queue; its test is whether the rate changes systematically within that interval. An assumption that cannot be connected to a consequence is probably too vague.

### Step 4: construct a baseline and one extension

The baseline assigns enough workers to keep estimated utilization below a chosen threshold such as $0.85$. It ignores random variation but is transparent. The extension uses a queueing approximation or discrete-event simulation to estimate the waiting-time distribution. Compare both under the same arrival scenarios. If both recommend the same staffing pattern, the simpler model may be sufficient. If they differ during sharp peaks, the extension has identified where variability matters.

### Step 5: decide what would falsify the model

Reserve several days for evaluation. Compare predicted and observed queue length, mean wait, 90th-percentile wait, and the fraction of periods exceeding a service target. Inspect errors by weekday and time of day. A model that is accurate at noon but fails at closing time has a defined operating range, not universal validity.

**Your first deliverable**

Create a one-page specification for a real system around you. It must include one decision sentence, a boundary diagram, a variable table with units, three assumptions with tests, one baseline, one extension, and two validation metrics. This exercise is deliberately algorithm-free: the purpose is to learn that formulation comes before computation.

**Work one dining-hall period on paper**

That specification can feel abstract, so let us pretend we are standing beside the dining-hall manager at 12:00. In the next half hour, past records suggest that about 60 customers will arrive at the payment station. One worker can serve about 25 customers per half hour under ordinary conditions. The manager can assign either two or three workers. Which arrangement would you try first? Make your own prediction before using a formula.

Two workers can serve about 50 customers in half an hour. If 60 arrive, a rough balance says the queue grows by 10 customers even if it was empty at the beginning. Three workers can serve about 75. In the same rough balance the station has capacity to absorb the 60 arrivals; the queue need not grow. The calculation is not a proof that nobody waits. Customers can arrive in a burst while servers happen to be busy. It is a first way to reject a clearly overloaded plan.

Express the same idea in units. At 60 customers per 30 minutes, the arrival rate is $\lambda=2$ customers/minute. Each worker's service rate is $\mu=25/30\approx0.833$ customers/minute. With two workers, nominal capacity is $2\mu\approx1.667$ customers/minute and $\rho=\lambda/(2\mu)=1.2$. With three, capacity is $3\mu=2.5$ customers/minute and $\rho=0.8$. The number $\rho$ is called *utilization*: it compares demand with capacity, and has no unit because the units cancel. A value over one is warning of persistent overload if the rates stay like this. A value below one leaves spare average capacity but does not guarantee a short wait during peaks.

Do you see why we wrote the 30-minute balance before saying “use queueing theory”? The manager's first question was whether the extra worker is plausibly necessary. The elementary balance answers that much without a distribution, a simulation, or a specialized library. If the team needs to know whether the 90th-percentile wait is below five minutes, the balance does not answer enough: it is time to model the variability of arrivals and service times. The *need for a sharper answer*, not our appetite for sophisticated mathematics, tells us when to extend the model.

We have also hidden a decision trade-off. Perhaps three workers at payment leave only one worker preparing food, so the bottleneck simply moves. Before the manager acts, the boundary must include other stations and the total labor constraint. If a worker costs $18$ per hour, adding one for a half hour costs $9$. Compare that cost with measured waiting and with the cost of longer waits. Without some valuation or a hard wait-time target, the phrase “optimal staffing” is unfinished: optimal with respect to *what*?

Try a quick counterexample. Suppose 30 of the 60 customers arrive within the first five minutes. Three workers' average capacity of 75 per half hour sounds generous, yet during those five minutes they can serve only about $3(25/30)(5)=12.5$ customers. A temporary queue of roughly 17 or 18 people forms. A model based only on total half-hour arrivals will miss this burst. You can test the constant-arrival assumption using timestamps, not by adding a vague sentence to the limitations paragraph.

If those timestamps exist, create two plots: cumulative arrivals against cumulative service capacity, and observed wait against predicted wait across several days. The gap between the two cumulative curves is an approximate queue. Measure whether errors cluster at lunch peaks; if so, shorten the time periods or use a stochastic queue. If predicted and observed waits agree under ordinary conditions but not at the first five minutes of lunch, report that precise operating range. A model that identifies its own weak spot is far more useful than one that prints a single unqualified staffing schedule.

**Data, choice, and rule are different kinds of quantities**

Let me spell out a distinction that beginners often learn only after a solver gives nonsense. The 60 arrivals are an *observation or forecast*: we do not get to change yesterday's timestamps. The number of assigned workers is a *decision*: the manager can choose it within staffing rules. The $9$ cost is a *parameter* computed from wages and time. A sentence like “no more than three workers at payment” is a *constraint* on decisions. A queue of 18 at 12:05 is a *state* of the system, created by earlier arrivals and service. These labels are not ceremonial. They tell us which quantities can be optimized and which must be estimated.

You can test your understanding by changing only one quantity at a time. If arrivals increase to 75 while staffing remains at three, utilization becomes $75/75=1$ and the average spare capacity vanishes. If the manager assigns four workers with arrivals still at 60, utilization falls to $60/100=0.6$ but labor cost rises. If service capacity of one worker falls to 15 customers per half hour because of a slow register, three workers provide only 45; the queue grows despite a staffing number that looked fine yesterday. Every change corresponds to a different real-world intervention or failure, so do not silently treat it as the same scenario.

At this point, I would ask you to explain the case to a classmate without any Greek letters. You should be able to say, “Customers arrive faster than two workers can serve them, so a line builds. A third worker gives average breathing room, but a lunch rush can still create a line. We would check arrival timestamps and the other stations before changing the schedule.” If you can say that, the mathematical symbols have done their job: they clarified a decision rather than replacing it with jargon.

The dining hall was a full workflow: decide, calculate a baseline, and test it. We already used a physical balance for the sample box. Three more mathematical lenses sharpen different habits: an invariant can remove unknown speeds, continuity can prove existence without an exact path, and a threshold can separate braking from clearance. They are not new modeling cycles; they are tools for choosing a useful mechanism *inside* the cycle you know.

## Reason before computing

### Invariants: the early commuter

A commuter is normally picked up at the station at 6:00 p.m. One day he arrives at 5:30, does not phone his wife, and walks toward home along her usual driving route. She leaves at the usual time, meets him on the way, and they arrive home **ten minutes earlier** than on a normal day. How long did he walk? Before reading the answer, choose a number. A lot of people immediately say “thirty minutes,” because he arrived thirty minutes early. But that would require his wife to meet him exactly when she normally reaches the station; she meets him *on the road*, so he stops walking before then.

What information do we know about the car? We do not know its speed, the distance from home to the station, or the man's walking speed. Surprisingly, we do not need them if the wife's speed along the route is the same on the outward and return drives. Imagine the segment from the roadside meeting point to the station. On an ordinary day, she drives that segment *toward* the station and then the same segment *back* with her husband. On the unusual day, she skips it twice. The total driving time saved is ten minutes; hence **each** skipped traversal would have taken five minutes.

The meeting must therefore occur five minutes before her normal 6:00 arrival, at 5:55. The man started at 5:30 and walked until 5:55: he walked **25 minutes**. Check the clock calculation explicitly: $5{:}55-5{:}30=25$ minutes. The structure, not a measured speed, carried the answer.

Let me ask you to challenge it. What if the wife speeds up on the way home, or the road is one-way and the return route differs? Then the two saved traversals are no longer equal, so “five plus five” need not hold. What if she gets the news and leaves early? Then her departure schedule has changed, and the usual reference clock no longer works. The conclusion is conditional, as a model's conclusion should be.

This is a useful example of *invariants*: properties that remain usable even when other numerical details are unknown. You can model the full positions $x_{\mathrm{wife}}(t)$ and $x_{\mathrm{walker}}(t)$, introduce two speeds and a distance, and solve a system of equations. You could also notice the two skipped road segments and solve the problem in three lines. Simplicity here is not laziness: it exposes exactly why the answer is determined.

### Continuity: the two-day journey

On Monday, a walker sets out from village $A$ at 9:00 a.m. and reaches village $B$ by 5:00 p.m. On Tuesday, the same walker starts at $B$ at 9:00 a.m. and returns along the same path to $A$ by 5:00 p.m. Must there be a point on the path where the walker was at **the same clock time** on both days? You need not know whether either day's speed is constant. The walker might pause, accelerate, or even backtrack. Take thirty seconds to imagine both journeys before following the proof.

One wonderfully concrete way to see it is to imagine two copies of the walker traveling *simultaneously* on the same path: Monday's copy walks from $A$ to $B$, Tuesday's copy walks from $B$ to $A$. At 9:00 the copies are on opposite ends. By 5:00 their ends have exchanged. If neither teleports and they stay on the same continuous path, they cannot exchange order without meeting. Their meeting point is exactly the position occupied at the same clock time on the two real days. The story is a proof, not a numerical prediction of *where* they met.

If you want mathematical notation, measure distance $x$ from $A$ along the route. Set $f(t)=x_{\mathrm{Monday}}(t)-x_{\mathrm{Tuesday}}(t)$. At 9:00, $f$ is negative: Monday is at $A$ ($x=0$), Tuesday at $B$ ($x=D$), so $f=-D$. At 5:00 it is positive: Monday at $B$ and Tuesday at $A$, so $f=D$. The intermediate-value theorem says a continuous $f$ that changes sign must take the value zero at some time $t^*$. At that instant the two positions coincide.

Why did I state the starting and ending **clock times**? If Tuesday's trip happens between midnight and 8:00 a.m., it need not share a time interval with Monday's trip, so “same clock time” has a different meaning. If the return journey follows a different road, equal distances from $A$ may refer to different actual places. We must state a common time interval, a shared continuous path, and continuous motion. That is the modeling work hidden beneath a very short theorem.

### Thresholds: a cart and a timed gate

Imagine a small automated delivery cart approaching a timed campus service gate. The gate controller announces that its opening phase will end after $T_g$ seconds. At that moment, a cart still outside the marked entrance has two options: stop before the entrance or continue and clear the gate before it begins closing. **How long should the controller keep the gate open so a cart at the edge of the comfortable-stopping region has a feasible continue option?** This is an invented example, not an engineering specification for an actual gate; a real operating system would require obstacle sensing, fail-safe behavior, and equipment-specific checks.

During a controller-to-brake delay $t_d$, the cart rolls at speed $v$ and covers $vt_d$. If braking then produces approximately constant deceleration $a>0$, it needs another $v^2/(2a)$ metres to stop. A cart closer than $d_s=vt_d+v^2/(2a)$ to the entrance cannot meet our assumed comfortable-stop rule. At constant speed, reaching the entrance from that boundary needs

$$
T_{\mathrm{reach}}=\frac{d_s}{v}=t_d+\frac{v}{2a}.
$$

Reaching the entrance is **not** the same as clearing the opening. If the gate zone is $w$ metres deep and the cart is $L$ metres long, the final part needs about $T_{\mathrm{clear}}=(w+L)/v$. Under our simplified constant-speed continue path, the full opening requirement is $T_g\ge T_{\mathrm{reach}}+T_{\mathrm{clear}}$. A real controller might have a separate clear-zone hold period; keep the two stages explicit rather than hide them inside one unexplained duration.

For illustrative numbers $t_d=0.4$ s, $v=2$ m/s, $a=1$ m/s$^2$, $w=3$ m, and $L=0.8$ m, reaching takes $0.4+2/(2\cdot1)=1.4$ s and clearance takes $3.8/2=1.9$ s. The simplified total is $3.3$ s. Every term is measured in seconds; a length divided by speed is time, and $v/a$ is time. Before trusting $3.3$, try slower braking, a longer cart, sensor delay, or an obstacle inside the opening. An obstacle should trigger a fail-safe response, not a more optimistic timing formula. The example shows how one decision divides into distinct physical stages and stress tests.

Each lens turned ordinary words into a mathematical claim. A competition prompt is rarely as tidy: it combines several claims, data sources, and deliverables. Let us carry the same habits into that larger setting before talking about software.

## Competition problems and evidence

The course slides group national-competition prompts into recurring families rather than promising that every problem has one fixed method:

- **A-type problems** often emphasize engineering physics, optimization, and differential equations.
- **B-type problems** often combine evaluation, optimization, and dynamic models.
- **C-type problems** often emphasize large datasets, forecasting, optimization, and evaluation.

These are tendencies, not rules. The right workflow is to identify states, decisions, constraints, data, and required evidence. Awards are rare at the national level, so reliability matters more than decorative complexity: a clear, validated model is easier to defend than a fashionable model with an unexplained pipeline.

Imagine opening a competition prompt for the first time. It may describe a river, a traffic network, a supply chain, or a biological population. You probably feel pressure to identify “the right algorithm” immediately. Let us postpone that question. Draw four boxes: **what is happening**, **what must be decided or estimated**, **what information is available**, and **how the judges or stakeholders could test the answer**. For a river-pollution question, for example, water flow and contaminant concentration belong in the happening box. Predicting concentrations downstream goes in the estimate box. Flow measurements, sample locations, and timestamps belong in the information box. Held-out concentration measurements and a mass-balance check belong in the test box.

Only then ask whether you need a differential equation, an optimization problem, an evaluation index, or a forecast. Sometimes you need several—but in a dependency order. You may first fit a flow model from measurements, then predict concentration, then choose a cleanup location using those predictions. If you start with the cleanup optimizer without a defensible prediction, you optimize numbers you have invented. The category labels A, B, and C are shortcuts about *common styles of problems*, not commands to use specific software packages.

The slides also mention award probabilities and a staged evaluation process. Treat those percentages as historical orientation, not a guarantee for any particular year or region. Local or regional reviewers first select strong solutions; some advance to national review. A team is not only competing on the final number. Reviewers need to follow what question you answered, why your assumptions are reasonable, how your model was solved, and how you checked it. An extremely clever calculation that nobody can reproduce is a fragile submission.

What should you do when a prompt contains a whole paragraph of background context? Read once without writing equations. On the second pass, underline words that signal a target (“predict,” “minimize,” “recommend”), numbers with units, hard requirements (“must,” “cannot,” “at most”), uncertainty (“approximately,” “may,” “varies”), and time order (“before,” “after,” “next year”). On the third pass, put the tasks on arrows. This is not a ritual; it separates the problem from the decorative details and catches hidden dependencies between parts.

Consider this small toy prompt: “A campus has $10{,}000 for an extra lunchtime staff pool. Recommend a weekly schedule to reduce peak waiting, assuming demand may rise by 20% next semester.” The word “recommend” means you owe a decision. The $10{,}000 is a constraint, not an outcome. “Weekly” suggests day and time indices. “May rise by 20%” demands a stressed scenario, not a single average. “Reduce peak waiting” asks for a metric that looks at unusually busy periods, not just the weekly mean. None of these translations required a famous algorithm; yet without them, even flawless code would answer the wrong question.

Suppose one teammate wants a neural network forecast, another wants a queueing simulation, and a third wants to draft the paper. How do you decide what to build first? Give each method an *input–output contract*. The forecast takes past arrivals and a calendar, and outputs a future arrival distribution. The simulation takes that distribution, service times, and a candidate staffing schedule, and outputs waits. A schedule search takes predicted waits and the labor budget, and outputs feasible choices. The paper takes all three plus tests, and explains a recommendation. If you cannot identify where the forecast is validated, the optimizer will inherit its errors; if a teammate cannot rerun the simulation, the paper's claims cannot be verified. The dependency diagram is a coordination tool as much as a mathematical one.

I would encourage a novice team to produce one imperfect but complete chain in the first hours: use historical mean demand, simple capacity calculations, a hand-checkable schedule, and a clear table. It might not win. That is fine. It tells you where to spend the next hour. If the recommendation changes wildly when demand rises by 20%, improve the forecast or design a robust schedule. If both forecasts give the same staffing, improve your validation narrative instead. Spending time where the answer is sensitive is more defensible than making every module maximally elaborate.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/modeling-04.webp" alt="Competition structure from the course slides"><figcaption>The competition joins mathematics, computation, domain knowledge, and writing.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-06.webp" alt="Notion modeling workspace"><figcaption>Notion can hold the problem map, decisions, reading notes, and division of work.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/modeling-07.webp" alt="Collaborative document workspace"><figcaption>A shared document gives the team one current version of the narrative.</figcaption></figure>
</div>

We have a map of what a team must reason through. Now we can decide where the work should live. Software will not choose the boundary or validate a theorem for us; it can, however, make the calculation, collaboration, and writing reproducible once those jobs are clear.

## Tools for reproducible teamwork

The course toolbox is a pipeline, not a list of brands. Use a shared knowledge base for task ownership; a collaborative document for live writing; Python for data, simulation, and optimization; LaTeX for the final mathematical document; draw.io or PowerPoint for diagrams; and an LLM only as an assistant whose claims and code are checked.

Let us organize the tools around one ordinary team meeting. Three students sit down with a modeling question, some data, and a deadline. One person writes the question and its subproblems in **Notion** or another shared notebook. The point is not the brand: it is that everyone can see the same current problem map, who owns each task, what data are missing, and which assumption has not yet been tested. If the question map lives only in one person's head, the other two can spend a day solving incompatible versions of the problem.

Open a shared **Google Doc** or equivalent writing space early, even if its first version is ugly. Put in the working title, a two-sentence problem restatement, a variable table, and blank spaces for results. Why write before the math is finished? Because writing forces you to discover unanswered questions. If a paragraph says “our model predicts the best schedule” but you cannot yet say *what counts as best*, your objective is not fully specified. The document should track the logic of the work, not just receive it on the last night.

Use **Python** when the problem needs repeatable calculations: cleaning a CSV, implementing the box recurrence, simulating customer arrivals, drawing plots, or running an optimizer. Start with a tiny test that has an answer you can calculate by hand. For our box, the first vial should move the reservoir from $4$ to about $4.046\,^{\circ}\mathrm C$, between the initial reservoir and incoming vial temperatures. If Python reports $30\,^{\circ}\mathrm C$, the code failed a physical check. A script that reads raw data and produces the paper's tables is more useful than a notebook full of copied intermediate numbers.

Use **LaTeX** or Overleaf to compose a long technical report with equations, references, and figures whose numbering stays consistent. The slide asks teams to download the current official contest template and upload it to Overleaf. That is a sensible practice task: compile a small document now, before the contest clock starts, and confirm that every teammate knows how to change a section, add a figure, and resolve a compile error. Do not wait until the last night to discover that your mathematical symbols render incorrectly.

Use **draw.io or PowerPoint** for a clear dependency diagram when the model has several modules. Draw arrows from raw arrival timestamps to the demand forecast, from that forecast to the staffing simulation, and from simulated waits to the recommendation. Write the units or meaning of what travels along every arrow. A nice-looking box diagram with arrows that do not name outputs is decoration; a rough diagram that exposes a missing input is useful.

Finally, you may ask **ChatGPT or DeepSeek** to help brainstorm a baseline, explain unfamiliar mathematics, or draft test code. Treat the output as a suggestion, not as an observation, citation, proof, or validated implementation. If it offers a thermal-box model, check its units and whether it confuses heat capacity with temperature. If it offers a theorem for the two-day journey, check the endpoints and continuity. If it offers a source, open the actual source and make sure it supports the precise claim. The team—not the assistant—owns the result.

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

## Read, reproduce, generalize

The slide deck ends with a practical assignment, and I want to tell you how to do it if this is your first encounter with modeling. Start by reading several strong papers from **one year's official competition archive**. Do not begin by trying to understand every line of algebra. On the first pass, ask: What real problem did the team answer? What were the three or four major steps? Which figure convinced me that the steps worked? What limitation did the authors admit? Write one sentence per answer. If you cannot answer the real-problem question, the paper's mathematics is not yet attached to its purpose in your head.

On the second pass, trace one claim backwards. Suppose the abstract says “our proposed staffing policy reduces the mean wait by 18%.” Find the table or figure containing that result. Find the baseline used for comparison. Find the data, simulation, or field measurement that generated both waits. Ask whether both methods were tested on the same period and conditions. If one was tested on quiet mornings and the other on a holiday rush, the 18% comparison would not mean what the abstract suggests. This backwards-reading habit gives you a way to understand a technical paper without already knowing all its methods.

The course asks you to excerpt good passages and explain **why** they work. Do more than copy a sentence that sounds polished. Annotate its job: Did it restate the decision? Motivate an assumption? Interpret a table? Limit a claim? For example, “The policy remains feasible when arrivals increase by 20%” is useful only if the paper shows a stressed scenario and tells us what “feasible” means. A pretty sentence without attached evidence is not a model explanation. A plain sentence with a reproducible comparison can be excellent writing.

Next, reproduce **three visualizations** that taught you something. Choose figures with different purposes: perhaps a time-series plot for change, a map for geography, and a baseline-versus-model comparison for evidence. If the original data are unavailable, construct a small illustrative dataset and say clearly that it is illustrative rather than pretending you reproduced the exact paper. Label axes and units; explain why a line, a map, or a bar chart matches its question. When you recreate a figure, you discover how much reasoning hides in axis choice, grouping, and caption. The assignment is therefore about understanding the *claim*, not merely imitating colors.

The slides also ask you to reproduce the strongest paper you read. That can sound intimidating. Reproduce **one small result** first: a data summary, a simple baseline, or a hand-checkable intermediate calculation. Write down the inputs and expected output before running any code. If your result disagrees, distinguish missing data, undocumented preprocessing, different random seeds, and your own bug. Only then attempt a larger part of the pipeline. Reproduction is not a contest to copy the largest formula; it is a method for learning which steps in a modeling argument are actually doing work.

For “generalization,” revise an assumption in the reproduced model. If a commuter model treats all travel times as independent, ask what happens on rainy days when delays cluster. If a queue model uses one arrival rate all afternoon, ask what changes when lunchtime peaks. If a thermal-box model ignores warm air entering during loading, ask whether adding measured heat gain changes its recommendation. Make a prediction **before** modifying the code. Write down what moved, what stayed roughly the same, and what that teaches you about the model's boundary.

The remaining assignment is operational: let everyone on the team become familiar with the shared notebook, document editor, Python environment, LaTeX, and diagramming tool; find legitimate materials and divide the reading; download the current official LaTeX template and make it compile in Overleaf. Think of these as rehearsal, not administrative busywork. If you know how to share a figure, rerun a script, find a source, and repair a broken equation before a timed competition, you spend the competition answering the actual question rather than fighting the tooling.

Here is a feasible calendar if you have a week. On day one, each person scans two papers and posts a one-page summary. On day two, discuss which claims are well evidenced and select one paper to reproduce. Days three and four go to one baseline and three figures, with each figure attached to a written claim. On day five, change one assumption and check the sensitivity. On day six, compile a short report in the official template. On day seven, teach the whole pipeline to another teammate in five minutes. If nobody can explain the evidence path orally, revise the report before calling it done.

Do not worry if your first attempt looks small. A defensible one-page result that answers a real question, shows a baseline, and explains a measured limitation is already a modeling achievement. Later blog posts will add mathematical machinery; this first post gives you the habits that make it trustworthy.

After practicing with published papers and the course tools, we should check whether the modeling pattern transfers beyond the slide examples. The library question below has different people and constraints but the same need for a precise decision, changing state, simple baseline, and evidence. Try it before moving to the next post.

## Transfer the method to a new problem

I want to make sure you can use these ideas in a new situation rather than merely recognizing my examples. Imagine a library wants to reduce the number of students turned away from study rooms during exam week. Its first request is “build the best model of room usage.” Stop and ask the librarian three questions. What decision can be changed—hours, bookings, room assignments, or the number of available rooms? What outcome matters—turn-aways, average wait, student satisfaction, or unused room-hours? When is the decision made, and what data are available *then*? Until those answers are clear, “best model” is not a well-defined target.

Suppose the answer is: “Tomorrow morning we must decide whether to extend three rooms' opening hours by two hours; we want fewer turn-aways, but staff time is limited to six additional room-hours.” We can now draw a boundary around arrivals, bookings, rooms, and staffing. Let $x_i$ be the extra hours assigned to room $i$. The hard rule is $x_1+x_2+x_3\le6$ hours, with each $x_i$ within the room's permitted extension. A count of students waiting at each hour is a changing state. Historical arrival times are data. The phrase “fewer turn-aways” suggests a measurable objective. You can see a model beginning to form without choosing an optimizer yet.

Begin with a tiny baseline. If each extended room can serve one additional two-hour booking, three two-hour extensions might serve three additional groups. This is a rough upper bound only if each group's booking takes the full interval and demand actually exists. If historical data show no one requests room three after closing, adding hours there would not help. If twenty students arrive all at once and rooms are booked in one-hour slots, our two-hour-booking assumption could misrepresent capacity. Those observations tell us which extension is worth studying: different booking lengths, hourly arrival peaks, or a better scheduling rule.

How would you test the recommendation? Use last week's or last semester's exam-period bookings to simulate what the proposed extension would have done, while being honest that demand can respond to added availability. Compare the same days under the existing schedule and the proposed one; report turn-aways **and** unused room-hours. Stress the result if arrivals rise during finals. If extending rooms one and two works on the data but fails whenever attendance is slightly higher, tell the librarian so. An actionable answer might be “extend rooms one and two first, monitor the hourly turn-away count, and revisit the assignment after one week.” That is a more modest, more useful conclusion than “our model achieves optimum efficiency.”

Can you now say how the library and the sample box are alike? Both began as vague requests; both required choosing a quantity that changes—waiting students or reservoir temperature; both had a success or stopping threshold; and both needed a test that could overturn a recommendation. Can you also say how they differ? A vial does not change its behavior when the box gets warmer, but students may change booking behavior when rooms become available. Physical conservation gives us a strong starting mechanism in one case; human behavior may require more careful observation in the other. Learning modeling means recognizing both the transferable structure and the limits of that analogy.
