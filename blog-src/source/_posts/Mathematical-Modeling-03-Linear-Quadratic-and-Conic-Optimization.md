---
title: 4 - Linear, Quadratic & Conic Optimization
date: 2026-09-15 18:00:18
permalink: 2026/09/15/Mathematical-Modeling-04-Linear-Quadratic-and-Conic-Optimization/
categories: Mathematical Modeling
tags:
  - Linear Programming
  - Quadratic Programming
  - Conic Optimization
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 150
lesson_number: 4
lesson_level: 1
review_lock: false
excerpt: "Derive LP, QP, and SOCP models from decisions, solve them geometrically and algebraically, and audit a real CUMCM crop-planning case."
---

Before we touch a solver, clear a small corner of the desk and keep one blank sheet of paper beside you. Today that sheet matters more than any software: every important model in this blog will first have to survive a hand calculation.

Optimization often arrives wearing intimidating notation: vectors, cones, multipliers, matrix inequalities, solver logs. The central question, however, is wonderfully ordinary: **among all decisions that obey the rules, which one best serves our purpose?** In this blog we will learn three increasingly expressive languages for answering that question—linear programming (LP), quadratic programming (QP), and second-order cone programming (SOCP). We will not begin with software. We will begin with a decision, derive every mathematical object, solve small instances by hand, and only then discuss algorithms and code.

The running competition case is the 2024 CUMCM Problem C on crop-planning. A publicly displayed national excellent paper formulates a seven-year planting strategy over heterogeneous plots, seasons, crops, rotation rules, uncertain yield, price, cost, and demand. That case is useful because it reveals both the power and the danger of optimization: writing “maximize profit” is easy; encoding what can actually be planted, sold, rotated, and managed is the real work. We will reconstruct the core model independently rather than copying the paper's equations or numerical answer. The original paper remains the source of record in the [CUMCM excellent-paper archive](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/).

<div class="mm-key-box"><span class="mm-callout-label">The optimization contract</span><p>Every optimization model must expose five things: <strong>decision variables</strong>, <strong>objective</strong>, <strong>constraints</strong>, <strong>data</strong>, and <strong>validation</strong>. If one is missing, the solver may still return a number, but you do not yet have a defensible decision.</p></div>

## 1. From a Decision to a Mathematical Program

Suppose a small campus kitchen must choose how many trays of rice bowls and salad bowls to prepare for lunch. A rice tray earns $36 contribution margin and uses 4 kg of rice and 2 staff-minutes. A salad tray earns $30, uses no rice, and needs 3 staff-minutes. Today the kitchen has 80 kg of rice and 72 staff-minutes. Demand limits sales to 18 rice trays and 16 salad trays.

Pause before calculating. What is under our control? Not profit, rice stock, or demand. We control the numbers of trays. Let

$$x_R=\text{rice trays},\qquad x_S=\text{salad trays}.$$

Profit becomes $\max 36x_R+30x_S$, and the rules become

$$
\begin{aligned}
4x_R &\le 80 &&\text{(rice)},\\
2x_R+3x_S &\le 72 &&\text{(labor)},\\
x_R&\le18,\quad x_S\le16 &&\text{(demand)},\\
x_R,x_S&\ge0.
\end{aligned}
$$

This is a linear program because the objective and every constraint are affine. “Linear” does not mean easy or one-dimensional. It means each expression is a weighted sum of decisions plus a constant; there are no products such as $x_Rx_S$, powers such as $x_R^2$, or nonlinear functions such as $e^{x_R}$.

In matrix form an LP can be written

$$
\begin{aligned}
\min_x\quad &c^Tx\\
\text{s.t.}\quad &Ax\le b,\quad Ex=d,\quad \ell\le x\le u.
\end{aligned}
$$

Here $x$ is the vector of decisions, $c$ gives their objective coefficients, rows of $A$ and $E$ encode rules, and $b,d,\ell,u$ are data. The notation is compact, but the model must retain units. A row that adds kilograms to staff-minutes is not sophisticated; it is wrong.

Natural language usually hides the algebra in three verbs. “At most,” “capacity,” and “cannot exceed” produce $\le$ constraints. “At least,” “coverage,” and “must satisfy” produce $\ge$ constraints. “Balance,” “conservation,” and “exactly” produce equalities.

Logical phrases require more care. “Plant crop $k$ only if plot $i$ is activated” needs a binary variable $z_{ik}\in\{0,1\}$ and a link $0\le x_{ik}\le A_i z_{ik}$. The continuous amount $x_{ik}$ says *how much*; the binary variable says *whether*. Once binary or integer decisions appear, the model becomes a mixed-integer linear program (MILP), even if every expression is linear.

<div class="mm-question-box"><span class="mm-callout-label">Stop and model</span><p>A clinic schedules nurses for four shifts. Each nurse can work at most two consecutive shifts; each shift needs a minimum number of nurses. What should the decision variable mean? Which rule is a coverage constraint, and which rule needs binary logic? Write the meanings before writing any equation.</p></div>

### The snack-factory problem from the course material

The course begins LP with a food factory rather than an abstract vector. That is a good choice because every coefficient can be traced to a physical statement. The factory produces snack A and snack B. One box of A consumes 4 kg of flour and 1 kg of sugar and earns 60 RMB. One box of B consumes 2 kg of flour and 2 kg of sugar and earns 40 RMB. Daily supplies are 80 kg of flour and 50 kg of sugar.

Let $x_A,x_B$ be daily boxes. The model is

$$
\begin{aligned}
\max\quad &60x_A+40x_B\\
\text{s.t.}\quad
&4x_A+2x_B\le80,\\
&x_A+2x_B\le50,\\
&x_A,x_B\ge0.
\end{aligned}
$$

Now read it backwards. The coefficient 4 has units kg flour/box A. Multiplying by boxes A gives kg flour. The first left side therefore has kg flour, matching 80 kg. The objective coefficient 60 has RMB/box, so the objective has RMB/day. This backward reading is a fast way to catch swapped rows and copied coefficients.

Divide the flour constraint by two:

$$2x_A+x_B\le40.$$

The two resource boundaries intersect at

$$
\begin{cases}
2x_A+x_B=40,\\
x_A+2x_B=50,
\end{cases}
\qquad
(x_A,x_B)=(10,20).
$$

The objective there is $60(10)+40(20)=1400$. Axis vertices are $(20,0)$ with profit 1200 and $(0,25)$ with profit 1000, so $(10,20)$ is optimal. This tiny solution is valuable even if the final factory has hundreds of products: it provides a hand-checked instance for code and reveals that both resources bind.

Suppose boxes must be whole numbers. The continuous optimum happens to be integral, but this is luck, not a property of every LP. If coefficients changed and the LP returned $x_A=10.4$, rounding each variable independently could violate resources or destroy optimality. The correct discrete model declares $x_A,x_B\in\mathbb Z_+$. The distinction becomes crucial in staffing, routing, facility opening, and assignment.

### Translating common constraints without losing meaning

A modeler should recognize recurring structures:

- **resource:** $\sum_ja_{ij}x_j\le b_i$;
- **demand minimum:** $\sum_ja_{ij}x_j\ge d_i$;
- **balance:** inflow minus outflow equals inventory change;
- **share:** $x_i\le\alpha\sum_jx_j$, which remains linear after rearranging;
- **activation:** $0\le x_i\le M_i z_i$, $z_i\in\{0,1\}$;
- **either-or:** activate one of two constraint systems with binary indicators;
- **fixed charge:** add $F_i z_i$ to the objective and link activity to $z_i$.

The constant $M_i$ in a logical link should be the tightest valid upper bound, not an astronomical number. An unnecessarily large big-$M$ weakens the LP relaxation and can create numerical instability. In the snack factory, flour already implies $x_A\le20$, so $M_A=20$ is defensible. Choosing $10^9$ communicates that the modeler did not use available structure.

### Standard form is a transformation, not a ritual

Textbooks use different “standard forms.” A common simplex form is

$$\max c^Tx\quad\text{s.t.}\quad Ax=b,\quad x\ge0.$$

Convert $a^Tx\le b$ by adding slack $s\ge0$:

$$a^Tx+s=b.$$

Convert $a^Tx\ge b$ by subtracting surplus $s\ge0$:

$$a^Tx-s=b.$$

A free variable $x$ becomes $x=x^+-x^-$ with $x^+,x^-\ge0$. A variable with lower bound $\ell$ can be shifted: $x=\ell+\tilde x$, $\tilde x\ge0$. Maximization becomes minimization by negating the objective. These transformations preserve the feasible decisions, but they alter the numerical representation. A report should present the natural model first and mention the solver form only when it aids analysis.

### Assignment is an LP structure with an integer surprise

Suppose tasks $i=1,\ldots,m$ must be assigned to workers $j=1,\ldots,n$, with $n\ge m$ and cost $c_{ij}$. Let

$$x_{ij}=
\begin{cases}
1,&\text{task }i\text{ is assigned to worker }j,\\
0,&\text{otherwise}.
\end{cases}
$$

The assignment model is

$$
\begin{aligned}
\min\quad&\sum_{i=1}^m\sum_{j=1}^n c_{ij}x_{ij}\\
\text{s.t.}\quad&\sum_{j=1}^n x_{ij}=1 &&\forall i,\\
&\sum_{i=1}^m x_{ij}\le1 &&\forall j,\\
&x_{ij}\in\{0,1\}.
\end{aligned}
$$

The first family assigns every task exactly once; the second prevents a worker from receiving two tasks. For the pure assignment structure, the constraint matrix is totally unimodular. With integral right-hand sides, the LP relaxation $0\le x_{ij}\le1$ has an integral extreme optimum. This is an important lesson: an integer-looking problem may be solved exactly as an LP when its matrix has special structure.

Now modify the story: a worker may do several tasks but has an eight-hour limit, tasks have different durations, and pairing two particular tasks creates a setup saving. Total unimodularity may disappear, and binary declarations matter again. Structure is earned by the equations, not by the story's name.

### A lively assignment example

Imagine a small film festival with four volunteers—Ari, Bo, Chen, and Di—and four roles: projection, guest desk, stage, and live captions. Each person has a “discomfort score”; lower is better:

$$
C=
\begin{bmatrix}
2&7&5&6\\
6&3&4&8\\
5&6&2&3\\
7&5&4&2
\end{bmatrix}.
$$

The diagonal-like assignment Ari→projection, Bo→guest desk, Chen→stage, Di→captions costs $2+3+2+2=9$. But do not stop because the pattern looks neat. Check swaps: Chen is also good at captions, Di at stage, yet swapping them costs $3+4=7$ instead of $2+2=4$. Other swaps are worse. For four people, enumeration can validate the solver; for forty, use the Hungarian algorithm or an LP/MILP solver.

Now add a human rule: only Chen and Di are trained for captions, and at least one of them must remain free during the opening ceremony. That temporal statement needs additional indexed binary variables. The example becomes more realistic and the model more complex, but every new variable should correspond to a clear operational fact.

## 2. Geometry, Vertices, and Why LP Works

Each kitchen inequality describes a half-plane. Their intersection is the feasible region. Because intersections of half-spaces are convex, a line segment joining any two feasible points stays feasible.

The objective $36x_R+30x_S=q$ describes parallel lines. Increasing $q$ slides the line toward higher profit until it last touches the feasible polygon. Unless the objective is parallel to an entire edge, the last contact is a vertex. This is the geometric reason an LP has an optimal extreme point whenever a finite optimum exists.

For two variables, list candidate vertices. The labor and salad-demand boundaries intersect at $2x_R+3(16)=72$, so $x_R=12$ and profit is $912$. The rice-demand and labor boundaries give $2(18)+3x_S=72$, hence $x_S=12$ and profit is $1008$. Checking the remaining vertices confirms $(18,12)$ is optimal.

This hand calculation also supplies a unit test. If a solver returns $(20,10.67)$, it ignored the demand bound. If it returns a profit of 1008 at a different point, inspect whether the optimum is non-unique or output was rounded incorrectly.

A set $C$ is convex if, for any $x,y\in C$ and $\theta\in[0,1]$, $\theta x+(1-\theta)y\in C$. For a linear objective,

$$c^T[\theta x+(1-\theta)y]=\theta c^Tx+(1-\theta)c^Ty.$$

An interior convex combination cannot be strictly better than both endpoints. Repeatedly moving toward an extreme point preserves or improves the objective. This is the mathematical idea behind vertex-search methods such as simplex.

An optimization run has more outcomes than “success” and “error”: it may be optimal, infeasible, unbounded, or numerically difficult. Never make an infeasible model feasible by quietly deleting constraints. Introduce explicit slack, price the violation, and explain which promise must be relaxed.

### Convex combinations explain much more than a picture

Suppose $x^{(1)}$ and $x^{(2)}$ are feasible for $Ax\le b$. For $0\le\theta\le1$,

$$A[\theta x^{(1)}+(1-\theta)x^{(2)}]
=\theta Ax^{(1)}+(1-\theta)Ax^{(2)}
\le\theta b+(1-\theta)b=b.$$

So every point on the segment is feasible. This proof scales to thousands of dimensions even though we cannot draw the region. It also explains why local and global thinking coincide in convex optimization: if a better feasible point existed elsewhere, every small step toward it would improve a convex objective in a controlled way.

The vertex statement needs care. A bounded feasible LP has an optimal extreme point, but not necessarily a unique one. If the objective line is parallel to a feasible edge, every point on that edge is optimal. A solver may return one endpoint, another solver the opposite endpoint, and both are correct. In an application, use a secondary criterion—smoothness, fairness, or implementation cost—to choose among alternate optima.

### Four solver outcomes, four different diagnoses

1. **Optimal:** a feasible solution and a matching certificate or bound were found.
2. **Infeasible:** no point satisfies all constraints.
3. **Unbounded:** feasible points exist and the objective improves without limit.
4. **Numerical/unknown:** the algorithm could not establish one of the above to tolerance.

An infeasible schedule does not mean the software is broken. It may say that 10 nurses cannot cover 14 simultaneous required positions. To diagnose infeasibility, add nonnegative violation variables $s_i$ and solve

$$\min\sum_iw_is_i$$

subject to softened constraints. Large $w_i$ protect rules that are expensive or forbidden to violate. The result identifies the smallest relaxation, but the modeler—not the optimizer—must decide whether relaxation is legally and operationally acceptable.

Unboundedness often exposes a missing upper bound or balance. If a production model earns positive profit per unit but consumes no resource because one coefficient was accidentally zero, output can grow without limit. Before blaming the solver, inspect every profitable activity: what eventually limits it?

### Degeneracy and why simplex may pause

At a degenerate vertex, more constraints bind than needed to determine the point, and one or more basic variables are zero. A simplex pivot can change the basis without moving the solution or improving the objective. Degeneracy is common in schedules with many redundant capacities. Modern anti-cycling rules handle it, but the solver log may show many iterations with little visible progress.

Multiple bases can represent the same physical solution. Therefore basis-level sensitivity ranges should be interpreted with care near degeneracy: a tiny data change may swap the active basis while leaving the actual decision nearly unchanged.

### The simplex idea on the snack factory

Add slacks $s_1,s_2$:

$$
\begin{aligned}
2x_A+x_B+s_1&=40,\\
x_A+2x_B+s_2&=50.
\end{aligned}
$$

The origin uses the slack basis. Increasing the variable with attractive reduced cost moves along an edge until one slack hits zero. The ratio test prevents leaving feasibility. A pivot exchanges an entering activity for a leaving basic variable. Repeating reaches $(10,20)$, where no adjacent feasible direction improves profit.

The geometric path is not unique, and simplex does not enumerate every vertex. Its practical strength is that it exploits sparse linear algebra and often reaches a useful basis rapidly. Its theoretical worst case can be exponential, yet its real performance and sensitivity output make it indispensable.

### A geometric example that catches a modeling error

Suppose someone writes the sugar constraint for the snack factory as

$$x_A+2x_B\ge50.$$

The feasible region now requires consuming at least all available sugar rather than at most the supply. A solver can return a mathematically optimal answer to this wrong problem. Plotting both constraints immediately reveals the region extends in the wrong direction. Even in high dimensions, test each row with verbal scenarios: if production is zero, should the rule be satisfied? For an upper resource capacity, zero production should be feasible.

## 3. Duality: The Price of a Scarce Resource

Consider

$$
\begin{aligned}
\max_x\quad &c^Tx\\
\text{s.t.}\quad &Ax\le b,\quad x\ge0.
\end{aligned}
$$

Assign a nonnegative price $y_i$ to each resource. If $A^Ty\ge c$, then for any feasible $x$,

$$c^Tx\le y^TAx\le y^Tb.$$

Thus $b^Ty$ is an upper bound on profit. Seeking the tightest bound gives the dual

$$
\begin{aligned}
\min_y\quad &b^Ty\\
\text{s.t.}\quad &A^Ty\ge c,\quad y\ge0.
\end{aligned}
$$

This is weak duality. Under standard feasibility conditions, LP strong duality says the best primal value equals the best dual value. The dual variable $y_i^*$ is a shadow price: for a small increase in $b_i$, optimal value changes approximately by $y_i^*$.

At the kitchen optimum $(18,12)$, rice stock is slack—only 72 of 80 kg are used—so its shadow price is zero. Labor and rice-bowl demand bind. Solving the corresponding dual equalities gives a labor price of $10$ per minute and an additional rice-tray-demand value of $16$ per tray. These values are local: buying one extra minute is useful only until another constraint becomes active.

Complementary slackness makes the relationship precise:

$$y_i^*(b_i-a_i^Tx^*)=0,\qquad x_j^*[(A^Ty^*)_j-c_j]=0.$$

A resource can carry positive price only when its constraint binds; a positive activity must have zero reduced cost. This converts a solver result into an explanation: *which rule limits the decision, and what is the marginal value of relaxing it?*

### Deriving the snack-factory dual carefully

Using the simplified flour constraint, the primal is

$$
\begin{aligned}
\max\quad&60x_A+40x_B\\
\text{s.t.}\quad&2x_A+x_B\le40,\\
&x_A+2x_B\le50,\\
&x_A,x_B\ge0.
\end{aligned}
$$

Let $y_F,y_S\ge0$ price one unit of the simplified flour resource and one kg of sugar. To make production unattractive at those imputed prices, the resources used by one box must cost at least its profit:

$$2y_F+y_S\ge60,\qquad y_F+2y_S\ge40.$$

The dual is

$$
\begin{aligned}
\min\quad&40y_F+50y_S\\
\text{s.t.}\quad&2y_F+y_S\ge60,\\
&y_F+2y_S\ge40,\\
&y_F,y_S\ge0.
\end{aligned}
$$

Because both products are positive at the primal optimum, both dual product inequalities bind:

$$
\begin{cases}
2y_F+y_S=60,\\
y_F+2y_S=40,
\end{cases}
\qquad
(y_F,y_S)=\left(\frac{80}{3},\frac{20}{3}\right).
$$

The dual objective is

$$40\cdot\frac{80}{3}+50\cdot\frac{20}{3}=1400,$$

exactly the primal profit. Remember that $y_F$ prices one unit of the **divided** flour row, equivalent to 2 kg of actual flour. Its price per physical kg is therefore $40/3$ RMB. Units prevent a factor-of-two interpretation error.

### Weak duality as a certificate

Take any dual-feasible prices, say $y_F=30,y_S=10$. One box A uses imputed resources worth $70\ge60$, and B uses $50\ge40$. Total available resources are worth

$$40(30)+50(10)=1700.$$

Therefore no feasible production plan can earn more than 1700, even before finding a plan. Better dual prices shrink the upper bound to 1400. When a primal plan also earns 1400, the equality certifies global optimality. This idea generalizes: optimization algorithms often maintain a feasible solution and a bound, and their gap quantifies what remains unknown.

### Shadow prices are derivatives with a validity range

Let $v(b)$ denote optimal profit as resource vector $b$ changes. Where the active set remains fixed,

$$v(b+\Delta b)\approx v(b)+y^{*T}\Delta b.$$

For one extra kg of sugar, the current prediction is $20/3$ RMB. But a shadow price is not a permanent market price. If the factory buys enough sugar, flour becomes the only bottleneck and the marginal value changes. Sensitivity ranges identify how far a right-hand side or objective coefficient may move while the same basis stays optimal.

This gives a concrete negotiation story. The supplier offers ten extra kg of sugar for 50 RMB. The local value estimate is about $66.67$, so the purchase appears worthwhile, but we must verify ten kg lies inside the current sensitivity range. If only two kg are valuable at the current price before another constraint binds, multiplying the shadow price by ten exaggerates the benefit.

### Equality constraints and unrestricted multipliers

If a primal constraint is an equality, its dual multiplier is unrestricted in sign. An equality cannot be relaxed in only one direction: increasing or decreasing its right side may help. In an energy dispatch model, the power-balance multiplier is the marginal system cost of one additional unit of demand. It can be interpreted as a price when signs and units are set consistently.

Inequality direction also determines multiplier sign. Rather than memorizing a table, derive the Lagrangian so that the dual function is a valid lower or upper bound. A sign error can turn a claimed certificate into no certificate at all.

### Duality in the assignment problem

The LP relaxation of assignment has dual potentials $u_i$ for tasks and $v_j$ for workers:

$$\max\sum_i u_i+\sum_jv_j\quad\text{s.t.}\quad u_i+v_j\le c_{ij}.$$

The inequality says task and worker potentials cannot overstate an assignment cost. The Hungarian algorithm updates these potentials and searches for zero reduced-cost edges. What looks like a combinatorial matching procedure is also a primal-dual algorithm.

This connection matters in modeling competitions. Dual variables are not merely a solver appendix. They can reveal scarce plots, binding labor periods, expensive coverage requirements, or which customer-demand constraints truly shape a plan.

## 4. Quadratic Objectives: Risk, Tracking, and Diminishing Returns

Linear objectives assume marginal value is constant. Often it is not. A schedule may be penalized for deviating from a target; a portfolio may trade return against variance; a control input may be penalized for changing too sharply. These lead to

$$
\begin{aligned}
\min_x\quad &\frac12x^TQx+q^Tx+r\\
\text{s.t.}\quad &Ax\le b,\quad Ex=d.
\end{aligned}
$$

When $Q$ is symmetric, $\nabla f(x)=Qx+q$ and $\nabla^2f(x)=Q$. If $Q\succeq0$, the problem is convex and every local minimizer is global. If $Q\succ0$, the objective is strictly convex and the minimizer is unique over a convex feasible set.

Ordinary least squares is a QP:

$$\min_\beta \frac12\|A\beta-y\|_2^2
=\frac12\beta^TA^TA\beta-y^TA\beta+\frac12y^Ty.$$

So $Q=A^TA\succeq0$ and $q=-A^Ty$. Setting the gradient to zero gives $A^TA\beta=A^Ty$. In practice use QR or SVD rather than explicitly forming normal equations, because the latter squares the condition number.

For another example, two generators provide $p_1,p_2$ to meet demand $D$, with $C_i(p_i)=a_ip_i^2+b_ip_i+c_i$, $a_i>0$. The dispatch problem minimizes $C_1+C_2$ subject to $p_1+p_2=D$ and bounds. Ignoring active bounds, the Lagrangian gives $2a_ip_i+b_i=\lambda$: unconstrained generators have equal marginal cost. A generator at its upper bound may have lower marginal cost because it would like to produce more but cannot.

### Why a square appears

Quadratic penalties arise for several different reasons, and the interpretation should be stated.

1. **Physical energy:** drag or resistive losses may scale approximately with a square over a regime.
2. **Statistical error:** independent Gaussian noise leads to a sum of squared residuals.
3. **Risk:** portfolio variance is $x^T\Sigma x$.
4. **Comfort or smoothness:** large deviations or abrupt control changes should be punished increasingly.
5. **Local approximation:** a twice-differentiable nonlinear objective is approximated by a quadratic Taylor model.

The same algebra does not imply the same science. If a report uses squared waiting time, explain why doubling a wait should count more than twice as badly. If absolute deviation is operationally more meaningful, use an LP formulation with auxiliary variables instead.

### The six-site cement problem from the course material

Six construction sites have coordinates and daily demand:

$$
\begin{array}{c|rrrrrr}
i&1&2&3&4&5&6\\\hline
a_i&1.25&8.75&0.50&5.75&3.00&7.25\\
b_i&1.25&0.75&4.75&5.00&6.50&7.25\\
d_i&3&5&4&7&6&11
\end{array}
$$

Temporary depots are at $A=(5,1)$ and $B=(2,7)$, each with capacity 20 tonnes/day. Part one asks for daily shipment quantities minimizing tonne-kilometers. Distances

$$\ell_{ji}=\sqrt{(u_j-a_i)^2+(v_j-b_i)^2}$$

are data because depot coordinates are fixed. Let $x_{ji}$ be tonnes from depot $j$ to site $i$. The transportation LP is

$$
\begin{aligned}
\min\quad&\sum_{j\in\{A,B\}}\sum_{i=1}^6 \ell_{ji}x_{ji}\\
\text{s.t.}\quad
&\sum_jx_{ji}=d_i &&\forall i,\\
&\sum_ix_{ji}\le20 &&j=A,B,\\
&x_{ji}\ge0.
\end{aligned}
$$

Total demand is $36$ tonnes, below total capacity $40$, so aggregate capacity is not immediately impossible. But aggregate feasibility is only a first check; compatibility or road restrictions could still make an expanded version infeasible.

Notice that Euclidean square roots do not make this optimization nonlinear when coordinates are fixed. We calculate each $\ell_{ji}$ before optimization, so it is a coefficient. A common modeling error is to see a nonlinear formula anywhere in data preparation and label the whole model nonlinear.

Part two moves depot coordinates. Let new depot $j$ be $(u_j,v_j)$. The objective becomes

$$\min\sum_{j,i}x_{ji}\sqrt{(u_j-a_i)^2+(v_j-b_i)^2},$$

which contains products between assignments and distances depending on decisions. This is a continuous facility-location problem with assignment/capacity coupling and is generally nonconvex in the joint variables. It is not automatically a QP simply because coordinates have squares inside the distance.

There are several honest approaches:

- alternate between allocating demand and updating depot locations;
- discretize candidate depot sites, producing a facility-location MILP;
- use multiple-start nonlinear optimization and report the best bound or empirical gap available;
- replace Euclidean distance by squared distance only if the operational meaning justifies that change;
- solve a capacitated $k$-median or $k$-means variant and clearly distinguish which one.

If allocation to one depot is fixed and squared distance is the objective,

$$\min_{u,v}\sum_iw_i[(u-a_i)^2+(v-b_i)^2],$$

differentiation gives the weighted centroid

$$u^*=\frac{\sum_iw_ia_i}{\sum_iw_i},\qquad
v^*=\frac{\sum_iw_ib_i}{\sum_iw_i}.$$

For unsquared Euclidean distance, the minimizer is a weighted geometric median, not the centroid. Squaring the distance therefore changes the decision. A report must not make that substitution silently.

### Portfolio risk as a convex QP

Let $x_i$ be fractions invested in assets, $\mu$ expected returns, and $\Sigma$ the covariance matrix. A mean–variance model is

$$
\begin{aligned}
\min_x\quad&\frac12x^T\Sigma x-\gamma\mu^Tx\\
\text{s.t.}\quad&\mathbf1^Tx=1,\quad x\ge0.
\end{aligned}
$$

$\Sigma\succeq0$ because $z^T\Sigma z=\operatorname{Var}(z^Tr)\ge0$. The risk-aversion parameter $\gamma$ traces a frontier: increasing it rewards return more strongly relative to variance. This model is not a promise that returns are Gaussian or covariance is stable. It is a transparent local risk summary whose inputs must be stress-tested.

Suppose two assets have volatilities 10% and 20% with correlation 0.25:

$$
\Sigma=
\begin{bmatrix}
0.01&0.005\\
0.005&0.04
\end{bmatrix}.
$$

With $x_2=1-x_1$, portfolio variance becomes a scalar quadratic. Differentiate, solve, and check $0\le x_1\le1$. This hand example verifies matrix indexing and reminds us that diversification benefit depends on covariance, not merely individual volatility.

### Tracking, smoothing, and a night bus

Imagine a university night bus with desired departures $r_t$ and scheduled departures $x_t$. Matching demand suggests $\sum_t(x_t-r_t)^2$, while avoiding abrupt staffing changes suggests $\sum_t(x_t-x_{t-1})^2$. The QP

$$\min_x\sum_t(x_t-r_t)^2+\lambda\sum_{t=2}^T(x_t-x_{t-1})^2$$

subject to fleet and driver constraints balances tracking with smoothness. When $\lambda=0$, the plan follows the target aggressively. As $\lambda$ grows, the schedule becomes smoother but may miss peaks. A plot of both terms versus $\lambda$ is more informative than declaring one arbitrary value.

This example is vivid because readers can imagine the operational consequence: a schedule that adds six buses for ten minutes and removes them immediately may fit demand mathematically but be impossible to staff. The smoothness term encodes that friction.

## 5. KKT Conditions: A Common Language

For $\min_x f(x)$ subject to $g_i(x)\le0$ and $h_j(x)=0$, define

$$L(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\sum_j\nu_jh_j(x).$$

The Karush–Kuhn–Tucker conditions are

$$\begin{aligned}\nabla_x L(x^{\ast},\lambda^{\ast},\nu^{\ast})&=0 &&\text{(stationarity)},\\ g_i(x^{\ast})&\le 0,\quad h_j(x^{\ast})=0 &&\text{(primal feasibility)},\\ \lambda_i^{\ast}&\ge 0 &&\text{(dual feasibility)},\\ \lambda_i^{\ast}g_i(x^{\ast})&=0 &&\text{(complementary slackness)}.\end{aligned}$$

For convex problems satisfying a qualification such as Slater's condition, these conditions are sufficient as well as necessary. For nonconvex problems they may describe only a local stationary point.

Take $\min_x \frac12\|x-a\|_2^2$ subject to $u^Tx\le b$. If $a$ is feasible, $x^*=a$. Otherwise the boundary binds. Stationarity gives $x=a-\lambda u$ and $u^Tx=b$, hence

$$\lambda=\frac{u^Ta-b}{\|u\|_2^2},\qquad x^*=a-\frac{u^Ta-b}{\|u\|_2^2}u.$$

The correction occurs only along the constraint normal and has exactly the magnitude needed to reach the boundary.

### Deriving KKT instead of memorizing four lines

Start with one inequality $g(x)\le0$. If the unconstrained minimizer violates it, the boundary pushes the solution back. The multiplier $\lambda\ge0$ measures the strength of that push. Stationarity

$$\nabla f(x^{\ast})+\lambda^{\ast}\nabla g(x^{\ast})=0.$$

says the objective gradient is balanced by a nonnegative combination of active constraint normals. Complementary slackness

$$\lambda^{\ast}g(x^{\ast})=0.$$

says either the rule is inactive and exerts no force, or it is active and may carry a force. Thinking in normals makes the signs easier to remember.

For several convex inequalities and affine equalities, stationarity becomes a geometric statement:

$$-\nabla f(x^*)\in N_C(x^*),$$

where $N_C(x^*)$ is the normal cone of the feasible set. At an interior optimum the normal cone is $\{0\}$, so $\nabla f=0$. At a boundary optimum, the gradient need not vanish; it must point into the cone generated by active constraint normals.

### A complete constrained quadratic example

Solve

$$
\begin{aligned}
\min_{x_1,x_2}\quad& (x_1-3)^2+(x_2-1)^2\\
\text{s.t.}\quad&x_1+x_2\le2.
\end{aligned}
$$

The unconstrained minimizer $(3,1)$ violates the boundary. Write

$$L=(x_1-3)^2+(x_2-1)^2+\lambda(x_1+x_2-2).$$

Stationarity gives

$$2(x_1-3)+\lambda=0,\qquad2(x_2-1)+\lambda=0.$$

The boundary must bind, so $x_1+x_2=2$. Solving gives $x_1=2,x_2=0,\lambda=2$. Check all four KKT groups: primal feasibility holds with equality; $\lambda\ge0$; complementary slackness is zero; stationarity holds.

Geometrically, $(2,0)$ is the Euclidean projection of $(3,1)$ onto the half-space. The displacement $(-1,-1)$ is parallel to the boundary normal $(1,1)$.

### Constraint qualifications are not decoration

KKT multipliers do not automatically exist for every differentiable problem. Slater's condition—a strictly feasible point for convex inequalities plus affine equalities—is a common sufficient qualification. Consider

$$\min_x x\quad\text{s.t.}\quad x^2\le0.
$$

The only feasible point is $x=0$, but the constraint gradient is also zero there. Stationarity would require $1+\lambda(0)=0$, impossible. The optimum exists, yet standard KKT multipliers fail because no strictly feasible point exists.

In a report, you need not deliver a treatise on constraint qualifications, but you should not claim KKT sufficiency for a nonconvex model or a degenerate formulation without conditions.

### Active-set reasoning for generator dispatch

Let

$$C_1(p_1)=0.02p_1^2+4p_1,\qquad
C_2(p_2)=0.01p_2^2+6p_2,$$

with $p_1+p_2=100$, $0\le p_1\le60$, $0\le p_2\le80$. Ignoring bounds, equal marginal costs give

$$0.04p_1+4=0.02p_2+6.$$

Together with the balance, this yields $p_1=66.67,p_2=33.33$, but $p_1$ violates its upper bound. Therefore set $p_1=60,p_2=40$. KKT explains why marginal costs no longer match: generator 1 is constrained at capacity and its bound multiplier accounts for the difference.

This active-set workflow is a powerful manual solver:

1. guess which constraints bind;
2. solve stationarity and equalities;
3. check primal and dual signs;
4. reject inconsistent guesses.

With a few constraints it is transparent; with many, numerical QP algorithms automate the same logic.

### KKT residuals as a verification tool

Given candidate $(x,\lambda,\nu)$, compute

$$
r_{\text{stat}}=\|\nabla f(x)+J_g(x)^T\lambda+J_h(x)^T\nu\|_\infty,
$$

$$r_{\text{prim}}=\max\{\|g(x)_+\|_\infty,\|h(x)\|_\infty\},$$

$$r\_{\text{comp}}=\|\lambda\odot g(x)\|\_\infty,\qquad r\_{\text{dual}}=\|(-\lambda)\_+\|\_\infty.$$

Small residuals support approximate stationarity and feasibility. They do not prove a global optimum in a nonconvex problem. Always pair residuals with convexity information or a global bound.

## 6. Norms, Uncertainty, and Second-Order Cones

The canonical second-order cone is $\mathcal Q^{n+1}=\{(t,z):\|z\|_2\le t\}$. An SOCP has affine equalities and constraints

$$\|A_ix+b_i\|_2\le c_i^Tx+d_i.$$

This language includes LPs, many convex quadratic constraints, robust linear constraints under ellipsoidal uncertainty, portfolio risk limits, and geometric location problems.

Suppose resource usage is uncertain:

$$(\bar a+Pu)^Tx\le b\qquad\text{for every }\|u\|_2\le\rho.$$

The worst perturbation is $\max_{\|u\|_2\le\rho}u^TP^Tx$. By Cauchy–Schwarz,

$$u^TP^Tx\le\rho\|P^Tx\|_2,$$

with equality when $u$ aligns with $P^Tx$. The infinitely many uncertain inequalities are therefore equivalent to

$$\bar a^Tx+\rho\|P^Tx\|_2\le b,$$

an SOCP constraint. Uncertainty does not automatically require simulation; the right uncertainty geometry can yield a tractable deterministic model.

If $Q=L^TL\succeq0$, then $x^TQx\le t^2$, $t\ge0$, is equivalent to $\|Lx\|_2\le t$. Portfolio volatility $\sqrt{x^T\Sigma x}\le\sigma_{\max}$ is thus an SOCP constraint after factoring $\Sigma$.

### What a cone is doing in an optimization problem

The second-order cone

$$\mathcal Q^{n+1}=\{(t,z):t\ge\|z\|_2\}$$

is convex because norms are convex. In three dimensions it looks like an ice-cream cone mirrored through the origin. A constraint $\|A x+b\|_2\le c^Tx+d$ says an affine vector must fit beneath an affine radius. The right side is automatically nonnegative at feasibility.

LP is contained in SOCP because a scalar absolute-value constraint $|a^Tx+b|\le t$ is a two-dimensional cone, and ordinary linear inequalities can be represented as one-dimensional cones. Convex QP can often be expressed through an epigraph:

$$\min_x\frac12\|Lx\|_2^2+q^Tx
$$

becomes minimization over a bound on $\|Lx\|_2$. The purpose is not to rename problems but to use a solver class with strong global guarantees.

### A geometric location problem

An emergency response center at location $x\in\mathbb R^2$ wants to minimize the maximum distance to communities $a_i$. Introduce $t$:

$$
\begin{aligned}
\min_{x,t}\quad&t\\
\text{s.t.}\quad&\|x-a_i\|_2\le t,\quad i=1,\ldots,n.
\end{aligned}
$$

This is an SOCP. The solution is the center of the smallest enclosing circle. Contrast it with minimizing total distance, which gives a geometric median, and minimizing total squared distance, which gives a centroid. Three objectives answer three different operational questions:

- worst-case emergency response;
- total travel burden;
- squared dispersion.

Picture three villages at the corners of an acute triangle. The worst-case center is the circumcenter; the centroid generally differs; the geometric median differs again. A solver cannot choose which social meaning you intended.

### Robust production with correlated uncertainty

Return to snacks. Suppose flour use per box is uncertain because moisture changes processing yield. Nominal coefficients are $\bar a=(4,2)$ kg, and plausible correlated errors are

$$a=\bar a+Pu,\qquad\|u\|_2\le1.$$

For production $x\ge0$, guaranteeing flour use below 80 for every allowed error gives

$$\bar a^Tx+\|P^Tx\|_2\le80.$$

The norm is a protection premium. If production aligns with a direction of large coefficient uncertainty, the premium grows. Correlation matters: an ellipsoid may say both coefficients cannot simultaneously hit independent worst cases, making it less conservative than a box.

For example, if

$$P=
\begin{bmatrix}
0.4&0\\
0.1&0.3
\end{bmatrix},
$$

then the robust term is

$$\left\|
\begin{bmatrix}
0.4x_A+0.1x_B\\
0.3x_B
\end{bmatrix}
\right\|_2.
$$

This expression has a direct meaning: it is the support function of the uncertainty ellipsoid in the chosen production direction.

### Chance constraints under Gaussian uncertainty

Suppose uncertain resource vector $a$ is Gaussian with mean $\bar a$ and covariance $\Sigma$. Then $a^Tx$ is Gaussian with mean $\bar a^Tx$ and standard deviation $\sqrt{x^T\Sigma x}$. The chance constraint

$$\Pr(a^Tx\le b)\ge1-\epsilon$$

is equivalent to

$$\bar a^Tx+\Phi^{-1}(1-\epsilon)\sqrt{x^T\Sigma x}\le b,$$

which is SOCP-representable. The quantile controls protection. This derivation requires the Gaussian assumption; writing the deterministic form without stating a distribution is not justified.

If tails are heavier or the distribution uncertain, scenario, robust, or distributionally robust methods may be safer. “95% constraint” has no meaning until the probability model and calibration are explained.

### Friction cones and an intuitive physical example

In robotics and structural design, a contact force has normal component $f_n$ and tangential vector $f_t$. Coulomb friction requires

$$\|f_t\|_2\le\mu f_n,\qquad f_n\ge0.$$

This is exactly a second-order cone. Imagine pushing a heavy crate: tangential force must stay inside a cone whose width grows with normal force. Outside it, the contact slips. SOCP is therefore not an exotic statistical trick; it describes a basic physical feasibility region.

### Recognizing and checking an SOCP

For every norm constraint:

1. verify the norm acts on an affine expression;
2. verify the right side is affine;
3. ensure the inequality direction is norm $\le$ affine;
4. check the right side can be nonnegative;
5. preserve units inside the norm through scaling.

The reversed set $\|z\|_2\ge t$ is generally nonconvex. Squaring both sides is safe only when both sides are known nonnegative. Many formula-rendering and modeling errors begin with dropping that sign condition.

## 7. Algorithms and Numerical Evidence

Simplex walks between adjacent vertices and provides useful basis sensitivity information. Interior-point methods move through the interior and solve Newton systems associated with barrier-regularized KKT equations. First-order methods use gradients and projections; they scale farther but may need more iterations for high accuracy.

For an inequality $g_i(x)<0$, a logarithmic barrier solves

$$\min_x f(x)-\mu\sum_i\log[-g_i(x)].$$

As $x$ approaches a boundary, the barrier grows. As $\mu\downarrow0$, minimizers follow the central path toward the constrained optimum. Newton's method uses

$$\nabla^2\phi_\mu(x)\Delta x=-\nabla\phi_\mu(x)$$

and a line search that remains feasible.

Use LP/MILP solvers for linear relationships and discrete decisions, convex QP when the Hessian is positive semidefinite, and SOCP when norms or ellipsoidal robustness appear. Do not send a convex model to a genetic algorithm merely because the heuristic is easier to describe. Do not claim a global optimum for a nonconvex heuristic without a valid bound or proof.

Scale variables when coefficients differ by many orders of magnitude. After solving, report primal residuals, constraint violation, dual residuals, and duality gap—not only a status string.

### Simplex: walking along promises that remain feasible

The simplex method maintains a basic feasible solution and moves along an edge to an adjacent one. Its core operations are:

1. compute reduced costs to find a promising entering variable;
2. use the ratio test to determine how far it can grow before a basic variable reaches zero;
3. pivot to update the basis;
4. stop when no reduced cost can improve the objective.

Return to the festival assignment example. In the assignment LP, a basic feasible solution corresponds to a matching. An augmenting path plays a role analogous to an edge move: it changes several assignments together while preserving “one role per person.” This illustrates a broad point: specialized combinatorial algorithms often exploit the same primal feasibility and dual-price structure as generic LP methods.

Imagine instead a bakery with 500 recipes and 40 ingredient limits. A basic solution has at most 40 activities determined by the active resource equations, even though hundreds of candidate recipes exist. Column generation can start with a few recipes, use dual prices to ask which missing recipe has attractive reduced cost, add it, and repeat. Airline crew scheduling and cutting stock use this idea at a much larger scale.

The example makes the algorithm tangible: dual prices act like a shopping list. A new activity enters only if its profit exceeds the imputed price of the scarce resources it consumes.

### Interior-point methods: staying away from the walls

Consider ticket allocation for a concert with several seating zones. The feasible polytope may have millions of vertices. Rather than visit corners, an interior-point method adds a barrier and moves through the interior. For constraints $a_i^Tx<b_i$,

$$\phi_\mu(x)=c^Tx-\mu\sum_i\log(b_i-a_i^Tx).$$

The gradient is

$$\nabla\phi_\mu=c+\mu\sum_i\frac{a_i}{b_i-a_i^Tx},$$

and the Hessian is

$$\nabla^2\phi_\mu
=\mu\sum_i\frac{a_ia_i^T}{(b_i-a_i^Tx)^2}.$$

Near a capacity wall, its reciprocal slack becomes large and pushes the iterate away. Newton steps balance objective improvement against all walls simultaneously.

For a concrete two-seat-zone example, let $x_1,x_2$ be premium and standard ticket allocations with $x_1+x_2<1000$, marketing minimums $x_1>100$, $x_2>300$, and revenue $180x_1+80x_2$. At a large barrier parameter, the solution sits comfortably inside. As $\mu$ shrinks, it approaches the revenue-maximizing boundary. Plotting the central path reveals the algorithm's behavior better than a paragraph saying “we used an interior-point solver.”

Interior-point methods extend naturally to QP and SOCP because their Newton systems reflect KKT structure. They typically provide high-accuracy primal-dual solutions in a number of iterations that grows gently with problem size, although each iteration may require a substantial sparse factorization.

### Projected gradient: take a step, then repair it

For smooth convex $f$ over convex set $C$, projected gradient uses

$$x^{k+1}=\Pi_C[x^k-\alpha_k\nabla f(x^k)],$$

where $\Pi_C$ is Euclidean projection. Picture a campus battery schedule. A gradient step lowers energy cost but may request negative charge or exceed the battery limit. Projection clips or solves a small correction problem to return to the feasible operating set.

If $C$ is a box, projection is componentwise clipping. If $C$ is a simplex

$$C=\{x:x\ge0,\ \mathbf1^Tx=1\},$$

projection requires finding a threshold $\tau$ such that $x_i=\max(v_i-\tau,0)$ sums to one. This is common in portfolio weights and mixture proportions.

Choose step size carefully. For an $L$-smooth convex function, a fixed $\alpha\le1/L$ gives descent; accelerated methods can improve the objective-rate guarantee from $O(1/k)$ to $O(1/k^2)$. But a theorem about objective gap is not automatically a theorem about decision quality. If many schedules have nearly identical cost, small objective gap may coexist with large decision variation.

### ADMM: negotiate between subproblems

The alternating direction method of multipliers handles

$$\min f(x)+g(z)\quad\text{s.t.}\quad Ax+Bz=c.$$

Using scaled dual variable $u$, ADMM alternates

$$x^{k+1}=\arg\min_x f(x)+\frac{\rho}{2}\|Ax+Bz^k-c+u^k\|_2^2,$$

$$z^{k+1}=\arg\min_z g(z)+\frac{\rho}{2}\|Ax^{k+1}+Bz-c+u^k\|_2^2,$$

$$u^{k+1}=u^k+Ax^{k+1}+Bz^{k+1}-c.$$

Imagine neighboring microgrids. Each wants to optimize local generation privately, while shared transmission flows must agree. Each microgrid solves its own $x$ problem; the network solves a consistency $z$ problem; the dual variable raises a “disagreement price.” Iteration continues until local and shared copies agree.

This story explains what residuals mean. The primal residual $r^k=Ax^k+Bz^k-c$ measures disagreement; the dual residual measures how the consensus variable still moves. Reporting only iteration count says little.

### Solver selection is part of the model

Use structure, not fashion:

- small or medium LP/MILP: simplex, barrier, branch-and-cut;
- sparse convex QP: active-set or interior-point;
- large smooth constrained problem with cheap projection: projected or accelerated gradient;
- norm and ellipsoidal constraints: SOCP interior-point or first-order conic solver;
- decomposable large problem: ADMM when moderate accuracy is acceptable;
- genuine nonconvex global problem: global solver, valid relaxation, or carefully benchmarked heuristic.

Every algorithm deserves an example because its trade-off is operational. Simplex gives interpretable bases, barrier methods deliver robust high accuracy, first-order methods trade iterations for cheap steps, and decomposition trades centralized solves for coordination.

### Conditioning: when correct equations still compute badly

Consider

$$
\begin{bmatrix}
1&1\\
1&1+\epsilon
\end{bmatrix}x=
\begin{bmatrix}
2\\2+\epsilon
\end{bmatrix}.
$$

For tiny $\epsilon$, the equations are nearly parallel. Small coefficient errors can cause large changes in $x$. Optimization inherits this issue in nearly dependent constraints or ill-conditioned Hessians.

Scale a variable measured in dollars of order $10^8$ and another in fractions of order $10^{-4}$. Normalize units, remove redundant constraints where safe, and use QR/SVD or regularization for least squares. Solver warnings about accuracy should not be hidden. Compare the returned solution after rescaling in original physical units.

### Reproducible numerical evidence

A convincing result table contains:

| item | what to report |
|---|---|
| status | optimal, feasible with gap, infeasible, or unknown |
| objective | recomputed from exported decisions |
| primal residual | equality and inequality violation |
| dual residual | stationarity error where available |
| gap | primal–dual or MILP bound gap |
| runtime | hardware, solver, version, time limit |
| stability | changes under scaling, tolerance, and key data perturbations |

Run the same model with a second solver or a hand-sized instance. Agreement does not prove the model represents reality, but disagreement is an immediate warning.

## 8. Winning-Paper Case: 2024 CUMCM Crop Planning

The real case asks for crop decisions across years, seasons, plots, and crops. Let

$$x_{itsk}=\text{area of crop }k\text{ on plot }i\text{ in year }t\text{, season }s,$$

and $z_{itsk}\in\{0,1\}$ indicate whether that combination is used. Let $A_i$ be plot area, $y_{ik}$ yield, $c_{ik}$ cost, $p_k$ price, and $D_{tk}$ expected demand. Production is

$$q_{tk}=\sum_{i,s}y_{ik}x_{itsk}.$$

To avoid the nonlinear expression $\min(q_{tk},D_{tk})$, introduce full-price sales $s_{tk}$ and surplus $r_{tk}$:

$$0\le s_{tk}\le D_{tk},\qquad s_{tk}+r_{tk}\le q_{tk},\qquad r_{tk}\ge0.$$

If surplus is wasted, its price is zero. If it sells at half price, revenue is $p_ks_{tk}+0.5p_kr_{tk}$. The seven-year objective is

$$\max\sum_{t,k}\left(p_ks_{tk}+\eta p_kr_{tk}-\sum_{i,s}c_{ik}x_{itsk}\right),\quad \eta\in\{0,0.5\}.$$

Core rules are:

$$\sum_kx_{itsk}\le A_i\qquad\text{(land capacity)},$$

$$m_{ik}z_{itsk}\le x_{itsk}\le A_iz_{itsk}\qquad\text{(activation and manageable area)},$$

$$z_{itsk}+z_{i,t+1,s',k}\le1\qquad\text{(no immediate repeat planting)},$$

and, for legumes $\mathcal L$,

$$\sum_{\tau=t}^{t+2}\sum_s\sum_{k\in\mathcal L}z_{i\tau sk}\ge1.$$

Incompatible plot-crop-season combinations are fixed to zero. The resulting model is a MILP. The excellent paper uses a differential-evolution genetic algorithm and later incorporates CVaR and correlation. A strong audit first asks which parts are already linear and whether an exact MILP solver can provide a benchmark. Even if the full instance is large, solve a reduced exact model.

For a hand test, take two 10-mu plots, two years, and crops wheat $W$, beans $B$, vegetables $V$. Plot 1 accepts $W,B$; plot 2 accepts $B,V$. Each plot must grow beans once and cannot repeat a crop. With profits $(500,420,760)$ RMB/mu, the best rotation is $W\to B$ on plot 1 and $B\to V$ on plot 2, yielding

$$10(500+420)+10(420+760)=21{,}000.$$

This tests compatibility, rotation, legume coverage, and accounting. Only after it passes should we trust a seven-year workbook.

The lesson is not that one algorithm name is superior. It is that a plausible heatmap can violate rotation, a high profit can come from selling more than demand, and an unlinked binary variable can be meaningless. Recompute the objective from exported decisions and check every rule independently.

### The three-goal production problem from the course

Before the crop case, the slides introduce a factory with two products. Product I consumes 2 kg raw material and 1 equipment-hour; product II consumes 1 kg and 2 hours. Available quantities are 11 kg and 10 hours, and profits are 8 and 10 ten-thousand RMB per unit. The feasibility model is

$$
\begin{aligned}
2x_1+x_2&\le11,\\
x_1+2x_2&\le10,\\
x_1,x_2&\ge0.
\end{aligned}
$$

If profit alone matters, maximize $8x_1+10x_2$. But management announces three aspirations:

1. product I should preferably not exceed product II;
2. equipment should be used as fully as possible;
3. profit should preferably be at least 56.

These are not all hard physical constraints. “Preferably” suggests goals with deviations. Write

$$x_1-x_2+d_1^- -d_1^+=0,$$

where $d_1^+$ measures the undesired excess of product I over II. For equipment utilization,

$$x_1+2x_2+d_2^-=10,$$

where $d_2^-$ is idle equipment. For profit,

$$8x_1+10x_2+d_3^- -d_3^+=56,$$

where $d_3^-$ is the profit shortfall. A weighted goal program is

$$\min w_1d_1^++w_2d_2^-+w_3d_3^-.$$

The weights need units or normalization. One unit of idle time is not naturally comparable to one ten-thousand RMB of profit. Alternatively, preemptive goal programming optimizes priority 1 first, fixes its optimum, then priority 2, and so on. This prevents a large improvement in a low-priority goal from purchasing even a small deterioration in a sacred higher-priority goal.

Here is a vivid management conversation. The production director says, “Use every machine hour.” Sales replies, “But do not fill the warehouse with product I.” Finance adds, “And missing 560,000 RMB is unacceptable.” The mathematical work is not merely to average these voices. It is to ask which statements are hard promises, which are negotiable goals, and how deviations will be explained to the people who own them.

### Pareto analysis before weights

For objectives $f_1,\ldots,f_m$ to minimize, $x$ dominates $y$ if

$$f_i(x)\le f_i(y)\quad\forall i,$$

with at least one strict inequality. A Pareto-efficient point is not dominated. Weighted sums

$$\min_x\sum_iw_i\tilde f_i(x)
$$

can trace supported efficient points after normalization, but nonconvex frontiers may contain efficient points that no positive weighted sum recovers. The epsilon-constraint method instead solves one objective while bounding the others:

$$\min f_1(x)\quad\text{s.t.}\quad f_j(x)\le\epsilon_j.
$$

For the two-product factory, sweep an allowed profit shortfall and plot equipment idle time versus product imbalance. This makes trade-offs visible. A manager can then choose a point for a stated reason rather than hiding preferences in unexplained weights.

### Robust optimization from the slides, made concrete

Suppose the raw-material use of products is not exactly $(2,1)$. Moisture and batch variation produce

$$a_1\in[1.9,2.2],\qquad a_2\in[0.9,1.15].$$

Nominal planning uses $2x_1+x_2\le11$ and may fail on a bad day. Box robustness for nonnegative production requires

$$2.2x_1+1.15x_2\le11.$$

This assumes both coefficients hit their worst values simultaneously. A budgeted set can allow at most $\Gamma$ normalized deviations:

$$a_i=\bar a_i+\rho_i z_i,\quad0\le z_i\le1,\quad\sum_i z_i\le\Gamma.$$

$\Gamma=0$ is nominal; $\Gamma=2$ is full box protection; intermediate values trade profit for protection. Plot objective, worst violation, and empirical violation rate against $\Gamma$. Calling one choice “robust” without displaying its price and calibration is incomplete.

Robustness is not identical to sensitivity analysis. Sensitivity asks how a fixed solution or optimum changes as inputs move. Robust optimization changes the decision in advance to protect against a set. Scenario testing after nominal optimization is diagnostic; embedding scenarios or an uncertainty set changes the optimization itself.

### Developing the crop model one layer at a time

The seven-year crop problem should not appear all at once. Build it in layers:

**Layer 1: one year, one season, continuous area.** Test land compatibility and accounting.

**Layer 2: demand caps and surplus sales.** Introduce sold and surplus variables; ensure revenue never exceeds physical production.

**Layer 3: multiple seasons.** Encode which plots support one or two seasons and link greenhouse seasons correctly.

**Layer 4: multiple years and rotation.** Add binary activation and no-repeat rules.

**Layer 5: legume windows and minimum manageable area.** Use rolling windows and tight linking bounds.

**Layer 6: uncertainty.** Add yield, cost, demand, and price scenarios only after the deterministic model is audited.

At each layer, save a tiny synthetic test with a known answer. This layered construction is slower for one hour and faster for the next three days because errors have a known birthplace.

### Demand caps and surplus accounting

Suppose production is $q$ and expected demand $D$. If excess is wasted, revenue is $p\min(q,D)$. Linearize with sold quantity $s$:

$$0\le s\le q,\qquad s\le D,$$

and maximize $ps$. Positive price drives $s$ to $\min(q,D)$ automatically. If surplus sells at discount fraction $\eta$, split production:

$$s+r=q,\qquad0\le s\le D,\quad r\ge0,$$

with revenue $ps+\eta pr$. If unsold output can be stored, destroyed, or carried to next year, new balance equations are required. The fate of one extra tonne is an operational mechanism, not a coefficient tweak.

### Rotation as graph and time logic

No immediate repeat planting can be expressed

$$z_{itsk}+z_{i,t+1,s',k}\le1.$$

But “immediate” depends on the actual crop sequence. For a plot with two seasons, the successor of season 1 is season 2 in the same year, and the successor of season 2 is season 1 next year. Define an ordered period index $\tau$ rather than writing ambiguous year-season pairs:

$$z_{i\tau k}+z_{i,\tau+1,k}\le1.$$

This reduces indexing mistakes. A three-year legume rule becomes a sliding window over the periods corresponding to those years. For every eligible starting year $t$,

$$\sum_{\tau\in W(t)}\sum_{k\in\mathcal L}z_{i\tau k}\ge1.$$

Check the first and last windows explicitly. Off-by-one errors can leave the end of the planning horizon unconstrained.

### Minimum planting area and fragmented plans

Without a minimum area, an optimizer may sprinkle $0.001$ mu of a crop across many plots to satisfy rotation indicators or exploit numerical ties. Link

$$m_{ik}z_{i\tau k}\le x_{i\tau k}\le A_i z_{i\tau k}.$$

The lower bound $m_{ik}$ represents machinery or management practicality. It should be justified by operations, not selected only to make the schedule prettier. If the real requirement is “at most three crops per plot-season,” add

$$\sum_kz_{i\tau k}\le3.$$

These constraints turn an economically attractive but unmanageable mosaic into a plan people can implement.

### Scenario and risk modeling

Let scenario $\omega$ contain yield $y^\omega$, demand $D^\omega$, cost $c^\omega$, and price $p^\omega$. If planting decisions are made before uncertainty resolves, they must be the same across scenarios. Sales and surplus may adapt afterward:

$$x,z\quad\text{first stage};\qquad s^\omega,r^\omega\quad\text{second stage}.$$

Expected-profit optimization is

$$\max\sum_\omega\pi_\omega\Pi^\omega.$$

To control downside, use CVaR of loss $L^\omega=-\Pi^\omega$:

$$\operatorname{CVaR}\_\alpha(L)=\min\_{\eta,\xi\_\omega\ge0}\left(\eta+\frac{1}{1-\alpha}\sum\_\omega\pi\_\omega\xi\_\omega\right).$$

$$\xi_\omega\ge L^\omega-\eta.$$

$\eta$ is a VaR-like threshold and $\xi_\omega$ captures excess loss. A risk-averse objective might maximize expected profit minus $\lambda\operatorname{CVaR}_\alpha(L)$. Report how schedules and downside risk change with $\lambda$; do not call one value objectively correct.

### Correlation must describe a mechanism

Crop yields can co-move because of weather; prices can fall when aggregate output rises; costs can share inflation. Sampling each parameter independently destroys those relationships. Use historical joint residuals, a covariance model, copula, or named scenarios such as drought, normal year, and bumper harvest.

For a simple price-demand relationship, excess regional production may lower price:

$$p_{tk}=p_k^0-\gamma_k(q_{tk}^{\mathrm{region}}-\bar q_k)_+.$$

This creates nonlinear coupling and may require approximation. The model need not include every economic feedback, but if it treats price and production as independent under massive surplus, the limitation should be explicit.

### An independent audit of a planting plan

After optimization, export decisions and run a separate checker that did not build the model. For each plot-period:

1. sum areas and compare with plot capacity;
2. reject incompatible crop–plot combinations;
3. check binary-area links;
4. traverse chronological periods for repeat planting;
5. evaluate every rolling legume window;
6. recompute production from area and yield;
7. verify sold plus surplus never exceeds production;
8. recompute revenue, cost, and profit;
9. compare scenario decisions for nonanticipativity;
10. report the worst violation with indices and units.

Independence matters. Reusing the same buggy indexing code for model and check can reproduce the same error perfectly.

## 9. Implementation and Verification

```python
import cvxpy as cp
import numpy as np

profit = np.array([36.0, 30.0])
x = cp.Variable(2, nonneg=True)
constraints = [4*x[0] <= 80,
               2*x[0] + 3*x[1] <= 72,
               x[0] <= 18, x[1] <= 16]
problem = cp.Problem(cp.Maximize(profit @ x), constraints)
problem.solve()
print(x.value, problem.value)
print([c.dual_value for c in constraints])
```

Audit primal feasibility with

$$r\_p=\max\left(\|Ex-d\|\_\infty,\|(Ax-b)\_+\|\_\infty\right).$$

recompute the objective, check units and integrality, and inspect business rules independently. Perturb important inputs. If a 1% demand change replaces the whole schedule, the recommendation needs a stability warning even if profit barely changes.

For integer models, report best feasible value $z_P$, best bound $z_D$, and

$$\operatorname{gap}=\frac{|z_P-z_D|}{\max(1,|z_P|)}.$$

“Timed out” is not “failed.” A 0.4% gap may support a decision; an unreported gap does not.

### Implementation lab 1: solve the snack factory three ways

The same small LP should be solved geometrically, algebraically, and computationally. The geometric solution listed vertices. An algebraic solution observes that both resources bind at the candidate optimum and solves two equations. The computational solution sends the matrix data to a solver.

Write the coefficient arrays explicitly:

$$c=\begin{bmatrix}60\\40\end{bmatrix},\qquad A=\begin{bmatrix}4&2\\1&2\end{bmatrix},\qquad b=\begin{bmatrix}80\\50\end{bmatrix}.$$

Because many libraries minimize, pass $-c$. After solving, do not print only the variable vector. Recompute

$$Ax=\begin{bmatrix}4(10)+2(20)\\10+2(20)\end{bmatrix}=\begin{bmatrix}80\\50\end{bmatrix}.$$

and $c^Tx=60(10)+40(20)=1400$. Check reduced costs and shadow prices against the manual dual. If software reports a dual for the negated minimization form, its sign may be reversed relative to the maximization interpretation. Document the convention.

Now perturb flour from 80 to 82 kg. The local shadow price per physical kg is $40/3$, so predicted profit is

$$1400+2\left(\frac{40}{3}\right)=1426.67.$$

Solve the perturbed LP and compare. Repeat with 100 extra kg. The first prediction works only within its active-set range; the extreme perturbation exposes why shadow prices are local.

This laboratory teaches more than syntax. Three solution routes agreeing on the same point and objective give a strong implementation check. When they disagree, the disagreement is localized enough to debug.

### Implementation lab 2: assignment with a forbidden role

Use the festival cost matrix and declare $x_{ij}\in\{0,1\}$. Suppose Ari is not certified for live captions, so set $x_{\text{Ari,captions}}=0$. Suppose Chen and Di cannot both work backstage roles because one must host a sponsor, adding a combined upper bound on their backstage assignments.

Pause: that equation would be too strong. It could leave two roles uncovered. The natural-language rule “one of them must remain free during the opening” depends on time, while our variables cover the whole festival. The mistake is not algebraic; the time index is missing.

Introduce period $t$:

$$x_{ijt}=1\quad\text{if person }j\text{ performs role }i\text{ in period }t.$$

Coverage, availability, rest, and sponsor-hosting can now be stated at the right resolution. This is a crucial modeling lesson: when a constraint feels impossible to express cleanly, the state or index set may be incomplete.

For a hand-sized verification, enumerate all $4!=24$ assignments in the un-timed version. Confirm the solver's cost matches the smallest enumerated value. Then add one forbidden edge and re-enumerate. Enumeration is not the production algorithm; it is an oracle for a tiny test.

For a larger assignment, verify every task sum equals one, every worker sum respects capacity, forbidden edges are zero, all binary values are within tolerance of 0 or 1, and objective equals the sum of selected costs. Visualize selected edges on a bipartite graph. A table of zeros and ones is harder to audit than four visible connections.

### Implementation lab 3: transportation before facility location

For fixed cement depots, compute the $2\times6$ distance matrix with a dedicated function. Unit-test one entry manually. If coordinates are kilometers and demand is tonnes/day, objective units are tonne-kilometers/day.

The transportation problem has network structure. Each depot is a supply node, each construction site a demand node, and each possible shipment an edge. Add a dummy unused-capacity sink of demand 4 tonnes if a balanced tableau is convenient, with zero shipping cost from depots to the dummy.

Before solving, inspect obvious dominance. If one depot is closer to a site and neither capacity nor coupling matters, shipping from the farther depot is unattractive. But do not greedily send every site to its nearest depot: capacity creates coupling. A locally cheap allocation can exhaust one depot and force very expensive later shipments.

A vivid manual example has two depots of capacity 6 and three sites with demands $(4,4,4)$. Costs are

$$
C=
\begin{bmatrix}
1&2&100\\
3&4&5
\end{bmatrix}.
$$

Try greedy assignment, then enumerate the one-dimensional family of feasible flows. The exercise shows why the capacity shadow price transmits the future cost of consuming scarce supply.

For moving depots, discretize 100 candidate locations and introduce facility binary $z_j$, shipment $x_{ji}$, and

$$\sum_jz_j=2,\qquad \sum_ix_{ji}\le20z_j.$$

This MILP gives a global bound over the candidate grid. Refine near promising sites or use the grid solution to initialize continuous location optimization. Comparing both answers supplies evidence about discretization error.

### Implementation lab 4: a QP schedule that can be explained

Take six hourly target bus counts $r=(2,3,7,8,4,2)$. Choose actual counts $x_t$ with $0\le x_t\le8$, fleet-hour budget $\sum_tx_t\le26$, and

$$
\min_x\sum_{t=1}^6(x_t-r_t)^2
+\lambda\sum_{t=2}^6(x_t-x_{t-1})^2.
$$

At $\lambda=0$, the plan tracks peaks. As $\lambda$ grows, abrupt jumps become expensive. Construct the difference matrix

$$
D=
\begin{bmatrix}
-1&1&0&0&0&0\\
0&-1&1&0&0&0\\
0&0&-1&1&0&0\\
0&0&0&-1&1&0\\
0&0&0&0&-1&1
\end{bmatrix}.
$$

Then $f(x)=\|x-r\|_2^2+\lambda\|Dx\|_2^2$ with Hessian

$$Q=2(I+\lambda D^TD)\succeq0.$$

Solve for $\lambda=0,0.1,1,10$ and plot target and schedules. Report tracking error, maximum hourly change, and fleet-hour use. The reader can see what $\lambda$ buys.

If buses are indivisible, declare integer $x_t$. The problem becomes a mixed-integer convex QP. Rounding the continuous schedule can violate the budget or distort smoothness. Compare rounded, repaired, and exact integer solutions on this six-hour instance.

### Implementation lab 5: an SOCP emergency center

Suppose communities are at $a_1=(0,0)$, $a_2=(6,0)$, and $a_3=(2,4)$. Find $x$ minimizing maximum distance:

$$\min_{x,t}t\quad\text{s.t.}\quad\|x-a_i\|_2\le t.$$

For an acute triangle, the smallest enclosing circle passes through all three vertices. Solve perpendicular-bisector equations to obtain the circumcenter, then calculate its distance to each point. This hand solution checks the SOCP.

Now add a river represented by forbidden strip $2.8<x_1<3.2$ and require the center to lie on one bank. The feasible set becomes a union of two convex sets. Solve two SOCPs—one with $x_1\le2.8$, one with $x_1\ge3.2$—and choose the better. This decomposition provides a global answer for the union without a generic heuristic.

Change the objective to average distance and the solution becomes a geometric median. Change it to total squared distance and the solution becomes a centroid. Add uncertain coordinates and robust distance constraints enlarge the required radius. Each modification answers a different real question.

### Formula and implementation audit

Many formula bugs are transcription bugs. Use this procedure:

1. define dimensions of every vector and matrix;
2. check every product dimension;
3. test scalar special cases;
4. check symmetry of $Q$ and $\Sigma$;
5. verify signs such as $t\ge0$;
6. render and inspect delimiters, subscripts, and line breaks;
7. compare Markdown source with browser MathJax output;
8. numerically evaluate both sides on a known point.

For example, if $Q=L^TL$,

$$x^TQx=\|Lx\|_2^2.$$

Writing $x^TQx\le t$ and replacing it with $\|Lx\|_2\le t$ is wrong. The latter squares to $x^TQx\le t^2$. A rotated cone or a different epigraph variable is needed. Formula checking is model checking.

### Data tables deserve equation-level discipline

Optimization failures often begin in spreadsheets: coordinates stored as text, hectares mixed with mu, annual cost combined with seasonal revenue, missing compatibility treated as zero cost, duplicate plot IDs doubling capacity, price columns shifted one crop, or forecasts using future data.

Create a data dictionary with symbol, meaning, unit, source, range, and missing-value rule. Assert nonnegative capacities, unique keys, complete index products, and expected totals. Print reconstructed sentences such as “plot P03 has 12 mu and permits soybean in season 1.” Human-readable spot checks catch alignment errors.

### Reproducibility package

A competition repository should contain raw data unchanged, preprocessing, model construction, solver configuration, random seeds, an independent verifier, figure scripts, a package lock file, and one command that rebuilds results. Do not manually edit the final decision workbook after solving. Generate a presentation sheet from the verified decision table and retain machine-readable output.

### Sensitivity as a sequence of decisions

Record not only objective value but decision change:

$$\Delta_x(\theta)=\frac{\|x^*(\theta)-x^*(\theta_0)\|}{\max(1,\|x^*(\theta_0)\|)}.$$

Two scenarios may have nearly identical profit but completely different planting schedules. Plot breakpoints: at what flour supply does snack B leave the basis? At what risk aversion does a portfolio drop an asset? At what discount does a crop rotation change? These thresholds turn sensitivity into actionable evidence.

## 10. A Defensible Optimization Report

A reader should be able to reconstruct the chain:

1. define every decision with indices and units;
2. write the objective as an accounting identity;
3. group constraints by physical, temporal, logical, and policy meaning;
4. classify the model and justify the classification;
5. explain solver choice and termination criteria;
6. verify a hand-sized instance;
7. report residuals, bounds, and active constraints;
8. translate dual values into operational language;
9. stress-test uncertain coefficients;
10. state what the model omits.

LP teaches disciplined translation. QP teaches curvature and compromise. SOCP teaches that useful nonlinear structure can remain globally tractable. The shared habit is more important than the labels: **model the decision faithfully, exploit structure honestly, and treat verification as part of the mathematics.**

One small easter egg before you leave: return to the kitchen model and increase available labor from 72 to 73. The best profit rises by exactly the labor shadow price predicted by the dual. Keep increasing it one minute at a time and watch for the first moment when that prediction fails. That breakpoint is where sensitivity analysis stops being a slogan and becomes something you can see.

### Sources and further reading

- [CUMCM official site](https://www.mcm.edu.cn/) and [excellent-paper display](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/) for the 2024 crop-planning case.
- Stephen Boyd and Lieven Vandenberghe, [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/), Chapters 4–6.
- [CVXPY documentation](https://www.cvxpy.org/) for disciplined convex programming.

## 11. Worked Optimization Studios

The preceding sections built the language. We now use it under conditions that resemble an actual modeling contest: the story is imperfect, data have units, several formulations look plausible, and the most important work happens before and after the solver runs. Each studio begins with a decision rather than an algorithm. Work through at least the hand-sized version before reading the interpretation. The purpose is not to collect six model names. It is to learn how a model changes when the question changes.

### Studio A: relief shipments through a damaged network

After a coastal storm, two warehouses must supply three shelters. Warehouse North has 70 pallets and Warehouse South has 55. Shelter demands are 30, 45, and 40 pallets. The ordinary road costs, measured in vehicle-hours per pallet, are

$$
C=
\begin{bmatrix}
1.2&2.0&3.4\\
2.7&1.3&1.8
\end{bmatrix}.
$$

At first sight this is a transportation LP. Let $x_{ij}$ be pallets sent from warehouse $i$ to shelter $j$. A minimum-cost model is

$$
\begin{aligned}
\min_x\quad&\sum_{i=1}^2\sum_{j=1}^3c_{ij}x_{ij}\\
\text{s.t.}\quad&\sum_jx_{ij}\le s_i &&i=1,2,\\
&\sum_ix_{ij}=d_j &&j=1,2,3,\\
&x_{ij}\ge0.
\end{aligned}
$$

Before solving, perform the aggregate check: supply is $125$ and demand is $115$, so total supply is sufficient. That check is necessary but not sufficient. If Shelter 3 could be reached only from North and North had fewer than 40 pallets, the model would still be infeasible. Feasibility depends on the network, not just the totals.

The cost pattern suggests North should favor Shelter 1 and South should favor Shelters 2 and 3. Send 30 from North to Shelter 1, 45 from South to Shelter 2, and 40 from South to Shelter 3. South would then ship 85 pallets, exceeding its supply by 30. Some demand must be transferred to North. Moving one pallet of Shelter 2 from South to North adds $2.0-1.3=0.7$ vehicle-hours; moving one pallet of Shelter 3 adds $3.4-1.8=1.6$. Therefore transfer Shelter 2 first. A feasible plan is

$$
X=
\begin{bmatrix}
30&30&0\\
0&15&40
\end{bmatrix},
$$

using 60 North pallets and all 55 South pallets. Its cost is

$$30(1.2)+30(2.0)+15(1.3)+40(1.8)=187.5.$$

Why is this globally optimal rather than merely intuitive? After the obvious assignments, South is short by 30. Among the two possible transfers, Shelter 2 has the smaller opportunity cost for every transferred pallet. North has enough spare supply for all 30. The exchange argument is complete: replacing any transferred Shelter 2 pallet with a transferred Shelter 3 pallet increases cost by $0.9$. This hand proof is also a perfect code test.

Now the emergency manager adds a fact: the bridge on the South-to-Shelter-3 route can carry at most 25 pallets before inspection. Add $x_{23}\le25$. The missing 15 pallets for Shelter 3 must come from North. North now sends $30+15=45$ before serving Shelter 2, while South sends 25 to Shelter 3 and has 30 for Shelter 2. Shelter 2 still needs 15 from North. The revised matrix is

$$
X=
\begin{bmatrix}
30&15&15\\
0&30&25
\end{bmatrix},
$$

with cost $36+30+51+39+45=201$. The bridge constraint costs $13.5$ vehicle-hours relative to the first plan. Its shadow price over the local sensitivity range is therefore $0.9$ per additional permitted pallet: each extra pallet allowed on South-to-3 replaces an expensive North-to-3 shipment and forces one pallet of Shelter 2 back from North to South, saving $(3.4-1.8)-(2.0-1.3)=0.9$.

That interpretation is more useful than the objective alone. It tells engineers the maximum operational value of increasing bridge capacity. If a temporary reinforcement costs the equivalent of 0.4 vehicle-hours per pallet, use it. If it costs 1.5, the transport savings alone do not justify it. The shadow price does not include safety, delay variability, or the value of redundancy; those belong in a broader decision.

The word “cost” also deserves scrutiny. Vehicle-hours may be a reasonable proxy during an emergency, but it treats one pallet of bottled water and one pallet of blankets identically. If shelters face different shortage consequences, introduce unmet demand $u_j\ge0$:

$$\sum_i x_{ij}+u_j=d_j,\qquad
\min\sum_{ij}c_{ij}x_{ij}+\sum_jp_ju_j.$$

Penalty $p_j$ should represent the decision consequence of shortage, not a number chosen merely to force feasibility. A lexicographic approach can be clearer: first minimize weighted shortage, then minimize transport cost among shortage-optimal plans. This prevents a small transport saving from trading away a medically essential delivery.

Suppose travel times are uncertain because roads may flood. Replacing each $c_{ij}$ by its mean and optimizing the mean can concentrate all critical shipments on a fragile route. Scenario optimization introduces $c_{ij}^{(s)}$ and evaluates the same shipment plan across scenarios. A minimax-regret model compares a plan with the scenario-specific best plan; a robust model protects against a specified uncertainty set; a stochastic recourse model permits rerouting after road conditions are observed. These are different information structures. The model must say when the route condition becomes known and which decisions can still change.

Validation has three layers here. First, verify row sums, column sums, nonnegativity, and bridge flow directly from the output. Second, independently recompute the objective from the exported shipment table. Third, perturb supply and bridge capacity and check whether objective changes agree with reported dual values until the active set changes. A colorful flow map is useful only after these numerical checks pass.

### Studio B: production with setup, waste, and piecewise sales

A community bakery produces ordinary loaves and celebration loaves. An ordinary loaf uses 0.6 kg flour and 12 oven-minutes and contributes $4 before setup costs. A celebration loaf uses 1.0 kg flour and 25 oven-minutes and contributes $9. The bakery has 90 kg flour and 2,400 oven-minutes. Up to 80 ordinary loaves sell at the stated contribution; additional ordinary loaves can be donated but produce no revenue. Celebration demand is at most 50. Opening the decorating station for any celebration production costs $70.

Let $x_o$ and $x_c$ denote produced loaves, $y_o$ denote sold ordinary loaves, and $z_c$ indicate whether the decorating station opens. A defensible MILP is

$$
\begin{aligned}
\max\quad&4y_o+9x_c-70z_c\\
\text{s.t.}\quad&0.6x_o+x_c\le90,\\
&12x_o+25x_c\le2400,\\
&0\le y_o\le x_o,\quad y_o\le80,\\
&0\le x_c\le50z_c,\\
&x_o,x_c,y_o\ge0,\quad z_c\in\{0,1\}.
\end{aligned}
$$

Separating production $x_o$ from sales $y_o$ is not cosmetic. If revenue were written as $4x_o$, the model would receive money for donated or discarded loaves. If donation itself has social value, add that value explicitly and defend it rather than hiding it in sales revenue.

We can analyze the two values of $z_c$. If $z_c=0$, then $x_c=0$. Producing beyond 80 ordinary loaves creates no objective benefit, so $x_o=y_o=80$, using 48 kg flour and 960 oven-minutes for contribution $320$. Resources remain, but demand—not capacity—is binding.

If $z_c=1$, the fixed charge is paid. Up to the first 80 ordinary loaves, contribution per kg is $4/0.6\approx6.67$ and per oven-minute is $4/12=0.333$. Celebration contribution per kg is 9 and per minute is $9/25=0.36$. Celebration loaves dominate on both resource ratios, so produce all 50 if feasible. They use 50 kg and 1,250 minutes. Remaining capacity permits at most

$$x_o\le\min\left\lbrace\frac{40}{0.6},\frac{1150}{12},80\right\rbrace=66.67.$$

If loaves are divisible in the planning approximation, profit is $9(50)+4(66.67)-70\approx646.67$. With integer loaves, $x_o=66$ gives $644$. Opening is decisively worthwhile. A solver should reproduce this branch calculation.

Now modify celebration demand to 8. Celebration contribution before setup is $72$, only $2$ above the $70$ fixed cost, but those eight loaves displace some ordinary production only if a resource binds. With 80 ordinary loaves, adding eight celebration loaves uses 56 kg flour and 1,160 minutes total, still feasible. Opening yields a net gain of $2$. A one-dollar increase in setup cost flips the decision. This is a threshold, not a stable recommendation. A report that prints “open” without displaying the two-dollar margin conceals the most important fact.

Fixed charges create discontinuity and invalidate naive marginal reasoning. The average setup cost per celebration loaf is $70/x_c$, which falls as volume rises. A continuous relaxation $0\le z_c\le1$ can pay a fraction of the setup cost and is not physically feasible. It supplies an upper bound for maximization, useful for branch-and-bound, but it is not an implementable plan.

Suppose the bakery can buy emergency flour for $1.50/kg$ up to 20 kg. Introduce $e$ with $0\le e\le20$ and replace flour capacity by $0.6x_o+x_c\le90+e$, subtracting $1.5e$ from profit. The flour shadow price tells whether emergency purchase is locally worthwhile. But once a demand ceiling or oven limit becomes active, its value falls to zero. Always plot objective and key decisions over the purchase limit; a single shadow price is only one segment of a piecewise-linear value function.

Waste can be modeled honestly as well. If a batch produces ten celebration loaves and partial batches are impossible, use integer batches $b_c$ and $x_c=10b_c$. If 5% of flour is expected to be lost, dividing capacity by a mean yield may be adequate for planning, but a chance or robust constraint is safer when running out of flour is costly. The appropriate uncertainty model depends on whether waste is frequent noise, a bounded manufacturing variation, or a rare equipment failure.

The model can also incorporate a piecewise discount without nonlinear products. Suppose the first 30 celebration loaves contribute $9$, and loaves 31–50 contribute $6$. Define $x_c=x_c^{(1)}+x_c^{(2)}$, with $0\le x_c^{(1)}\le30$, $0\le x_c^{(2)}\le20$, and revenue $9x_c^{(1)}+6x_c^{(2)}$. For a concave revenue curve in maximization, the optimizer naturally fills high-value segments first. For nonconcave tariffs or minimum-purchase blocks, binary variables may be necessary.

This bakery is a small model, yet it contains most contest modeling traps: confusing production with sales, ignoring fixed activation, rounding a relaxation, extrapolating a shadow price, and using expected waste without discussing service risk. The lesson is not that every bakery requires a MILP. It is that every mathematical term should correspond to an economically or physically meaningful event.

### Studio C: a smooth night-bus schedule

Return to the six-hour target $r=(2,3,7,8,4,2)$. The university can operate 26 bus-hours, no hour can use more than eight buses, and staffing makes hour-to-hour jumps undesirable. Consider

$$
\min_x\ \|x-r\|_2^2+\lambda\|Dx\|_2^2
\quad\text{s.t.}\quad
0\le x\le8,\quad\mathbf1^Tx\le26.
$$

The first term measures tracking error; the second measures roughness. They have different operational interpretations even though both are squared norms. Tracking error represents mismatch with estimated need. Roughness approximates the difficulty of bringing drivers and vehicles in and out of service. The coefficient $\lambda$ converts one unit of squared change into the same decision scale as one unit of squared mismatch.

Ignore bounds and budget for a moment. Differentiating gives

$$2(x-r)+2\lambda D^TDx=0,$$

so

$$(I+\lambda D^TD)x=r.$$

The matrix $D^TD$ is tridiagonal:

$$
D^TD=
\begin{bmatrix}
1&-1&0&0&0&0\\
-1&2&-1&0&0&0\\
0&-1&2&-1&0&0\\
0&0&-1&2&-1&0\\
0&0&0&-1&2&-1\\
0&0&0&0&-1&1
\end{bmatrix}.
$$

For $\lambda>0$, the system couples neighboring hours. A high target at hour 4 pulls up hours 3 and 5, while low neighboring targets pull the peak down. This is smoothing, not an arbitrary black box. The Hessian $2(I+\lambda D^TD)$ is positive definite because for nonzero $v$,

$$v^T(I+\lambda D^TD)v=\|v\|_2^2+\lambda\|Dv\|_2^2>0.$$

Therefore the unconstrained solution is unique.

At $\lambda=0$, $x=r$ and the bus-hour total is 26 exactly. The target is feasible, so tracking is perfect. Why smooth at all? Because the target asks the fleet to jump from 3 to 7 and later fall from 8 to 4 in one hour. If each bus needs a driver shift of at least three hours, the simple bound and budget have omitted a crucial mechanism. A roughness penalty approximates that friction, but explicit shift variables may be more faithful. Penalization should not replace a truly hard labor rule.

Suppose the operator chooses $\lambda$ by minimizing the same objective used to fit the schedule. That is circular: each $\lambda$ defines its own objective and will appear optimal under its own scale. Instead, create a trade-off curve. For each $\lambda$, report tracking RMSE, maximum hourly change, total bus-hours, predicted passengers left behind, and estimated staffing cost. Choose a point where additional smoothness has diminishing operational value, then stress-test it under alternative demand forecasts.

There is also a data question hidden inside $r$. If $r_t$ is derived from average passenger counts, a squared loss penalizes positive and negative mismatch symmetrically. But an undersupply of three buses at the peak may be far worse than an oversupply of three. Introduce positive and negative deviations

$$x_t-r_t=d_t^+-d_t^-,\qquad d_t^+,d_t^-\ge0,$$

and use asymmetric linear or quadratic penalties. Alternatively build a queue model where unserved passengers carry forward. The choice changes the meaning of the recommendation.

To connect QP with KKT, assume the bus-hour budget binds and no box bound does. With multiplier $\nu\ge0$, stationarity is

$$2(I+\lambda D^TD)x-2r+\nu\mathbf1=0.$$

Because $D\mathbf1=0$, multiplying by $\mathbf1^T$ gives

$$2\mathbf1^Tx-2\mathbf1^Tr+6\nu=0.$$

If budget $B<\mathbf1^Tr=26$ binds, then $\nu=(26-B)/3$. This multiplier quantifies the local objective reduction from one additional bus-hour. The calculation also reveals that the smoothing operator preserves constant vectors: the budget multiplier shifts the entire unconstrained profile before bounds become active.

Now require integer buses. The continuous QP is a lower bound for the integer minimization problem. Rounding each coordinate can raise total use above 26. A repair heuristic can floor all entries and allocate remaining bus-hours to increments with greatest marginal objective improvement. For this small case, enumerate or solve the mixed-integer QP to evaluate the heuristic gap. Reporting that gap is stronger than saying the rounded schedule “looks close.”

Validate on days rather than only hours. Estimate $r$ on training weeks, choose $\lambda$ on validation weeks, and report queue and cost metrics on held-out weeks. Preserve chronological order. If exam weeks behave differently, either include an exam indicator known at decision time or present a separate stress scenario. A smooth curve is not evidence unless it works on future operating conditions.

### Studio D: portfolio allocation without magical covariance

Three funds have estimated annual returns

$$\mu=(0.06,0.09,0.13)^T$$

and covariance matrix

$$
\Sigma=
\begin{bmatrix}
0.0100&0.0060&0.0040\\
0.0060&0.0225&0.0090\\
0.0040&0.0090&0.0400
\end{bmatrix}.
$$

The diagonal entries are variances; their square roots are volatilities of 10%, 15%, and 20%. The off-diagonal entries are covariances, not correlations. Before optimization, verify symmetry and positive semidefiniteness. A covariance matrix constructed from aligned observations is PSD in exact arithmetic, but missing-data procedures or rounding can produce a small negative eigenvalue. Silently passing an indefinite matrix to a convex-QP solver changes the mathematical claim.

One formulation minimizes variance for a target return $R$:

$$
\begin{aligned}
\min_x\quad&x^T\Sigma x\\
\text{s.t.}\quad&\mu^Tx\ge R,\\
&\mathbf1^Tx=1,\\
&x\ge0.
\end{aligned}
$$

For low $R$, the return constraint may be slack and the global minimum-variance portfolio is chosen. As $R$ increases, the constraint binds. At very high $R$, nonnegativity pushes the solution toward the highest-return fund. Solving over a grid of $R$ traces the efficient frontier. The horizontal axis should be portfolio volatility $\sqrt{x^T\Sigma x}$, not variance if readers interpret percentages.

Without nonnegativity and assuming both equality constraints bind, define

$$A=\mathbf1^T\Sigma^{-1}\mathbf1,\quad
B=\mathbf1^T\Sigma^{-1}\mu,\quad
C=\mu^T\Sigma^{-1}\mu.$$

Stationarity of

$$L=x^T\Sigma x+\alpha(\mathbf1^Tx-1)+\beta(\mu^Tx-R)$$

gives $2\Sigma x+\alpha\mathbf1+\beta\mu=0$. Thus $x$ is a linear combination of $\Sigma^{-1}\mathbf1$ and $\Sigma^{-1}\mu$. Solving the two equality equations determines the coefficients; the frontier variance is a quadratic function of $R$. This derivation explains why two-fund combinations span the unconstrained mean-variance frontier. When a weight becomes negative and short selling is forbidden, the active set changes and the formula must be recomputed on the remaining assets.

The difficult part is not solving the QP. It is deciding whether $\mu$ and $\Sigma$ deserve the precision assigned to them. Expected returns are notoriously noisy. Small changes in $\mu$ can rotate the optimizer toward a completely different corner while estimated variance barely changes. A robust version may place $\mu$ in an ellipsoid

$$\mu=\bar\mu+Pu,\qquad\|u\|_2\le\rho.$$

Requiring worst-case return at least $R$ gives

$$\bar\mu^Tx-\rho\|P^Tx\|_2\ge R,$$

an SOCP constraint. The protection term is larger for portfolios whose return estimate is more exposed to uncertain directions. This is a mathematical expression of estimation caution, not a guarantee against every market event.

Transaction costs matter if the current portfolio is $x^{(0)}$. Linear proportional cost uses $\sum_i k_i|x_i-x_i^{(0)}|$, representable with auxiliary variables. A fixed fee per traded asset introduces binaries. A turnover cap

$$\sum_i|x_i-x_i^{(0)}|\le\tau$$

prevents unstable recommendations from completely rearranging the portfolio. Again, the model changes because the decision changes: choosing a fresh theoretical portfolio is not the same task as rebalancing an existing one.

Test the model by reconstructing portfolio return, variance, budget, target-return slack, and turnover outside the solver. Compare with equal weight, the current portfolio, and a minimum-variance baseline. Use rolling out-of-sample windows and include transaction costs. Do not select the best historical window after seeing results. A frontier built from the same data used to estimate and evaluate inputs is a description of the sample, not proof of future performance.

A useful sensitivity display places target return along the horizontal axis and shows not only risk but also weights. The frontier may look smooth while asset weights jump at active-set changes. Those jumps identify recommendations fragile to a slightly different target. For a decision maker, that instability may matter more than the fourth decimal place of variance.

### Studio E: an emergency facility under geometric and demand uncertainty

Three communities are located at $a_1=(0,0)$, $a_2=(6,0)$, and $a_3=(2,4)$. The minimax facility problem

$$
\min_{x,t}\ t
\quad\text{s.t.}\quad
\|x-a_i\|_2\le t,\quad i=1,2,3
$$

finds the center of the smallest enclosing circle. Each constraint is a second-order cone. The model protects the worst straight-line distance, which may approximate helicopter travel or uncongested planar access. It does not automatically represent road travel.

For these three points, solve the geometry by hand. The perpendicular bisector of the segment from $(0,0)$ to $(6,0)$ is $x_1=3$. Equating squared distance from $(3,y)$ to $(0,0)$ and $(2,4)$ gives

$$9+y^2=1+(y-4)^2=1+y^2-8y+16,$$

so $8y=8$ and $y=1$. The candidate center is $(3,1)$ with radius $\sqrt{10}$. Its distance to all three communities is $\sqrt{10}$, so all constraints bind. Because the triangle is acute, the circumcircle is the minimum enclosing circle. This analytic result is a regression test for the SOCP implementation.

Now assign population weights. If the goal remains minimax distance, weights do nothing unless they change the definition, for example minimizing $\max_i w_i\|x-a_i\|_2$. If the goal becomes total weighted distance, solve a weighted geometric median. If it becomes total weighted squared distance, the answer is the weighted centroid. These three familiar centers answer different ethical and operational questions. Calling each “optimal location” without naming the objective invites confusion.

Suppose a hospital must be within 2.5 distance units of Community 3 and the minimax objective covers the other two. Add $\|x-a_3\|_2\le2.5$. Check the old center: its distance to Community 3 is $\sqrt{10}>2.5$, so the new rule binds and moves the facility. A constrained optimizer will find the point, but a diagram should show the intersection of the hospital disk with the competing distance disks. The geometry lets readers see which promise caused the relocation.

Coordinates themselves may be uncertain. Let actual community $i$ be $a_i+P_i u$, $\|u\|_2\le1$. Requiring

$$\|x-a_i-P_iu\|_2\le t\quad\text{for all }u$$

does not in general collapse to exactly $\|x-a_i\|_2+\|P_i\|_2\le t$ unless we accept a conservative triangle-inequality bound or the uncertainty is isotropic in the required sense. A safe bound is

$$\|x-a_i\|_2+\|P_i\|_2\le t.$$

If $P_i=\rho_i I$, this bound is exact: the perturbation can point directly away from the facility, so worst-case distance is $\|x-a_i\|_2+\rho_i$. Stating when a robust counterpart is exact prevents a conservative approximation from being presented as equivalence.

Demand uncertainty produces another model. If communities may require several ambulances simultaneously, distance alone is insufficient. Facility capacity, response-time queues, and backup coverage matter. A two-stage model can open bases first and dispatch ambulances after demand is observed. A static minimax center is still a valuable baseline: it is transparent, globally solvable, and supplies a geometric check. Complexity should be added where the baseline's failure is named.

Road networks create a particularly important boundary. Euclidean distance may put the facility directly across a river from a community, close on the map but far by road. Replace distance with shortest-path travel times between candidate sites and demand nodes. With a finite candidate set and facility-opening decisions, the model becomes a $p$-center MILP rather than an SOCP. If a bridge can fail, include disruption scenarios and measure backup access.

Validation combines geometry and operations. Plot circles for active constraints and verify their radii numerically. Compare Euclidean and road-network solutions. Simulate calls under held-out demand and report response-time quantiles, not only averages. Stress-test closure of the most-used route. A robust-looking center on a clean diagram is not enough if dispatch queues dominate actual response.

### Studio F: crop planning as a linked decision system

The crop-planning case is where many isolated ideas meet. Let $i$ index plots, $k$ crops, $t$ years, and $s$ seasons. Let $x_{ikts}$ be planted area and $z_{ikts}$ indicate whether crop $k$ is used on plot $i$ in that season. Let $q_{kts}$ be produced quantity and $y_{kts}$ sold quantity. A simplified model contains

$$
q_{kts}=\sum_i h_{ikts}x_{ikts},
$$

$$0\le y_{kts}\le q_{kts},\qquad y_{kts}\le D_{kts},$$

and profit

$$
\sum_{k,t,s}p_{kts}y_{kts}
-\sum_{i,k,t,s}c_{ikts}x_{ikts}.
$$

The separate sales variable prevents revenue from being collected on production above demand. If surplus is discarded, it has zero price and perhaps a disposal cost. If surplus sells at a discount, add $y_{kts}^{(1)}$ and $y_{kts}^{(2)}$ with separate price tiers. The scenario must specify whether discounted demand is unlimited; otherwise the model can again invent a market.

Plot capacity is

$$\sum_kx_{ikts}\le A_i.$$

Compatibility can be encoded by omitting impossible variables or setting $x_{ikts}\le A_i m_{iks}$ for parameter $m_{iks}\in\{0,1\}$. Omitting variables is often cleaner and reduces model size, while an explicit mask can make the data pipeline easier to audit. In either case, an incompatible crop must not appear as a zero-cost opportunity.

If a crop is selected, minimum practical area may be required:

$$L_{ik}z_{ikts}\le x_{ikts}\le A_i z_{ikts}.$$

The lower link prevents tiny fragments; the upper link prevents area without activation. Setting $L_{ik}$ too large can make rotations infeasible. Setting it to zero eliminates the intended fragmentation control. Report how $L_{ik}$ was determined and test alternatives.

A simple no-consecutive-planting rule is

$$z_{ikts}+z_{ik,t+1,s'}\le1$$

for relevant adjacent seasons. But “adjacent” must follow the agronomic calendar, not merely adjacent array indices. If one greenhouse has two seasons and an open field has one, build an explicit predecessor relation. Many rotation bugs come from assuming every plot shares the same temporal grid.

A legume requirement over every three-year window can be expressed as

$$
\sum_{\tau=t}^{t+2}\sum_{k\in\mathcal L}\sum_s x_{ik\tau s}
\ge \alpha_iA_i,
$$

or as a binary occurrence requirement depending on the rule. These are not equivalent. An area threshold asks for sufficient cumulative legume area; an occurrence rule can be satisfied by a very small planting unless a minimum-area link is present. Translate the actual agronomic requirement before choosing one.

Labor and management burden couple plots even when land does not. If crop $k$ needs $a_{kts}$ labor-hours per mu,

$$\sum_{i,k}a_{kts}x_{ikts}\le H_{ts}.$$

Without this row, the optimizer may create a theoretically profitable schedule that requires every plot to be harvested on the same day. Monthly or weekly labor periods may be needed when seasonal totals hide peaks. Equipment, storage, seed, and cash-flow constraints follow the same resource logic.

Uncertain yield, demand, cost, and price should not all be perturbed independently without thought. Bad weather may lower several yields together and raise market prices; inflation may increase both input costs and sale prices; regional demand may be correlated across substitute crops. Independent uniform draws can manufacture implausible worlds and understate joint risk. Construct scenarios from mechanisms, historical residuals, or clearly stated stress combinations.

There are several defensible objectives. Expected profit maximization is suitable for a risk-neutral planner with repeat opportunities. Worst-case profit is conservative and sensitive to the uncertainty set. Mean-CVaR trades average performance against bad-tail outcomes. Regret compares a fixed plan with the scenario-specific clairvoyant optimum. A multi-objective model may include profit, minimum household income, crop diversity, or soil health. The choice is a policy statement, not a solver option.

For a finite scenario set $\Omega$ with loss $L_\omega(x)$, CVaR at level $\beta$ can be written

$$\operatorname{CVaR}\_\beta(L)=\min\_{\eta}\left[\eta+\frac{1}{(1-\beta)|\Omega|}\sum\_{\omega\in\Omega}\xi\_\omega\right].$$

subject to

$$\xi_\omega\ge L_\omega(x)-\eta,\qquad\xi_\omega\ge0.$$

Here $\eta$ is a loss threshold and $\xi_\omega$ captures exceedance. When scenario losses are linear in the decisions, this risk term remains linear. If the base model contains binaries, the result is a MILP rather than a continuous LP.

The seven-year horizon creates end effects. A model may exploit the last year by planting a crop whose soil consequence occurs after the horizon. Add a terminal condition, salvage value, or test a longer horizon and report whether the first years change. Decisions near the beginning should be relatively stable if the horizon is adequate.

Decomposition can exploit structure. With fixed binary crop choices, continuous area and sales decisions may form an LP. Benders decomposition treats binary planning as a master problem and continuous scenario operations as subproblems, using dual information to add cuts. Scenario subproblems can run in parallel. This is worthwhile only if the monolithic model is genuinely too slow; decomposition adds implementation and verification burden.

A small verifier should ignore the solver's internal constraint objects. Read the exported schedule and independently calculate every plot-season area, forbidden pairing, adjacency rule, legume window, labor total, production, sales cap, and objective component. Print violations with semantic labels such as “Plot G17, 2028 season 2 exceeds area by 0.30 mu.” A generic maximum residual is useful, but a labeled violation is easier to fix.

Interpretability comes from summaries tied to decisions. Show land-use heatmaps across time, crop shares, binding labor periods, sales saturation, profit distribution over scenarios, and changes relative to a simple current-practice baseline. Report whether a recommended crop appears because of genuine advantage or a fragile price assumption. A schedule is not a recommendation until someone can understand why it changes.

### Studio G: what the solver is actually certifying

Optimization reports often jump from a model to a table labeled “optimal solution.” That phrase is meaningful only relative to a precisely specified mathematical problem and a stated numerical tolerance. A solver does not certify that the story was translated correctly, that the data are trustworthy, or that the recommended policy will work in deployment. It certifies a narrower statement about the encoded problem. Understanding that statement prevents both excessive trust and unnecessary suspicion.

For a continuous LP, modern solvers usually use simplex, an interior-point method, or a combination. A primal feasible point gives an objective value achievable by the model. A dual feasible point gives a bound. For a minimization LP,

$$b^Ty\le c^Tx$$

under a consistent primal-dual convention. If the two values match within tolerance, the gap certifies near-global optimality. The crucial fact is not that an algorithm stopped; it is that two independently constrained objects meet.

Consider a minimization LP with primal value $1{,}000.002$ and dual value $999.998$. The absolute gap is $0.004$. A common relative measure is

$$
\frac{|z_P-z_D|}{1+|z_P|},
$$

approximately $4\times10^{-6}$. Whether this is adequate depends on decision scale. If the objective is millions of dollars and the variables will be rounded to whole trucks, it is likely negligible. If the objective difference between legal and illegal chemical exposure is tiny only because units were scaled poorly, the same printed gap says little. Numerical tolerance and domain tolerance are different things.

Primal residuals measure encoded feasibility. For $Ax\le b$, a scaled violation for row $i$ may be

$$
r_i=\frac{\max(0,a_i^Tx-b_i)}{1+|b_i|+\|a_i\|_1\|x\|_\infty}.
$$

Scaling prevents a row with coefficients around $10^9$ from dominating a row around $10^{-4}$ merely because of units. Still, a solver-scaled residual should be translated back. A violation of $10^{-6}$ may mean one microliter, one person, or one million dollars depending on the variable scale. For an indivisible safety requirement, even a small fractional violation may need explicit repair.

Dual residuals check stationarity or reduced costs. Complementarity checks whether positive multipliers correspond to nearly active rules. For a convex QP, small KKT residuals plus convexity provide strong evidence of global optimality. For a nonconvex QP, the same residuals show only a stationary candidate. A point at the top of a hill can satisfy a zero gradient. Curvature and global bounds determine what more can be claimed.

Mixed-integer optimization uses a different certificate. A feasible integer incumbent has value $z_I$. The branch-and-bound tree produces a valid bound $z_B$ from relaxations. For minimization, $z_B\le z^*\le z_I$. A relative gap may be reported as

$$
\operatorname{gap}=
\frac{z_I-z_B}{\max\{1,|z_I|\}}.
$$

Suppose a crop plan has incumbent profit 4.82 million RMB and upper bound 4.90 million in a maximization problem. The plan is feasible and no plan can exceed 4.90 million under the model, so the unknown improvement is at most 80,000 RMB, about 1.66% of the incumbent. We may say “feasible with a certified 1.66% worst-case gap.” We may not call it proven optimal.

An incumbent can be excellent before the gap is small, and a small gap can accompany a poor real model. If revenue data are uncertain by 15%, spending six hours shrinking a mathematical gap from 0.5% to 0.1% may not improve the decision. Computational effort should reflect the relative sizes of optimization error, data uncertainty, and model discrepancy.

Branch-and-bound is easier to understand through a two-variable example. Suppose $x_1,x_2$ must be integers, but the LP relaxation returns $(3.4,2.0)$. Branch on $x_1$:

$$x_1\le3\qquad\text{or}\qquad x_1\ge4.$$

Every integer solution belongs to one branch. Solve an LP relaxation in each child. A child whose bound cannot beat the incumbent is pruned; an infeasible child is pruned; a child with an integral solution may update the incumbent. Cutting planes add valid inequalities that remove fractional relaxation points without removing any feasible integer point. Good formulations produce tight relaxations, shrinking the tree.

This explains why big-$M$ quality matters. Consider $0\le x\le Mz$, $z\in\{0,1\}$. In the LP relaxation, a huge $M$ permits a small fractional $z$ to support a large $x$ while paying only a fraction of a fixed charge. The bound becomes unrealistically optimistic and branch-and-bound works harder. Derive the smallest valid $M$ from capacity, demand, time, or conservation. If the modeling system supports indicator constraints, they may avoid explicit large coefficients, although the solver still uses internal reformulations.

Warm starts can help repeated solves. In a rolling schedule, yesterday's plan may be a good incumbent today. In a parameter sweep, the previous continuous solution may initialize the next solve. But a warm start is not a certificate and can sometimes bias a nonconvex local method toward one basin. Report how initialization was used, especially when comparing algorithms.

Solver logs contain diagnostic evidence. For a MILP, plot incumbent and bound against time, preferably on a logarithmic time scale when runtimes vary widely. A long flat incumbent with a steadily improving bound suggests proof is hard but the plan was found early. A good bound with poor incumbents suggests feasible-solution search is difficult. Both curves flat with a large gap may indicate a weak formulation, symmetry, or difficult combinatorics.

Symmetry arises when interchangeable objects receive separate labels. If three identical vehicles are indexed individually, permuting their labels creates multiple equivalent solutions. The solver may explore redundant branches. Symmetry-breaking constraints—such as ordering vehicle usage—can help, but they must not exclude distinct physical plans when vehicles are not truly identical.

Interior-point methods approach an LP or conic optimum through the interior rather than walking along vertices. They solve Newton systems derived from barrier problems such as

$$
\min_x c^Tx-\mu\sum_i\log(b_i-a_i^Tx).
$$

As $\mu$ decreases, the central-path solution approaches the boundary optimum. Interior-point methods have strong polynomial complexity and perform well for large sparse continuous problems. They may return a point in the middle of an optimal face rather than a basic vertex; crossover can recover a basis when sensitivity analysis needs one.

First-order methods use gradients and cheap projections or proximal steps. For smooth convex $f$ with Lipschitz gradient,

$$x^{k+1}=\Pi_C(x^k-\alpha_k\nabla f(x^k)).$$

They can handle enormous problems where factoring KKT systems is too expensive, but high-accuracy convergence may be slow. A competition paper should not choose a first-order method solely because it sounds modern. Compare problem dimension, sparsity, required accuracy, and available reliable solvers.

Conic solvers exploit self-concordant barriers for second-order or semidefinite cones. Modeling systems such as CVXPY verify disciplined convex programming rules before constructing a cone program. This verification is valuable: it prevents some nonconvex expressions from masquerading as convex. Yet DCP rules are sufficient rather than necessary; a convex expression may require an algebraically equivalent recognized form.

Numerical scaling can determine whether a mathematically sound model solves reliably. Suppose one variable is measured in dollars around $10^9$ and another in failure probability around $10^{-7}$. Coefficients span sixteen orders of magnitude. Rescale dollars to millions and probabilities to parts per million, or nondimensionalize the equations. Keep the mapping to physical units explicit so output is converted correctly.

Rounding solver output is a decision, not formatting. If $x=2.9999998$ for a binary variable, solver integrality tolerance may justify interpreting it as 3 only if the variable is general integer and constraints are rechecked. If a continuous dose is printed to two decimals, verify the rounded dose remains feasible. The safe workflow stores full-precision values, creates a rounded presentation copy, and runs the independent verifier on the copy actually delivered.

Randomness can enter through heuristics, parallel search, scenario sampling, or tie-breaking. Record seeds and solver version, but do not expect bit-for-bit repeatability from every parallel solver. Reproducibility means the same decision claim and tolerances can be recovered, not necessarily the identical branch tree. When small numerical changes select different alternate optima, compare objectives and operational summaries rather than raw vectors alone.

Finally, a solver may correctly say infeasible. Build an irreducible infeasible subsystem or use elastic constraints to diagnose conflicting rules. If coverage requires 12 nurses while legal shifts permit only 10, the result is an important finding. Do not quietly relax the coverage row. Display the conflict and let the decision maker choose whether to add staff, reduce service, or change a policy.

### Studio H: diagnosing a plausible but wrong model

Imagine a team optimizing charging for an electric delivery fleet. They define $p_{vt}$ as charging power for vehicle $v$ in hour $t$, electricity price $c_t$, battery energy $e_{vt}$, charger limit $P$, and capacity $E_v$. Their first model is

$$
\min\sum_{v,t}c_tp_{vt}
$$

with

$$0\le p_{vt}\le P,\qquad 0\le e_{vt}\le E_v,\qquad
e_{v,t+1}=e_{vt}+\eta p_{vt}.$$

It solves beautifully and charges almost entirely in the cheapest hours. Yet no vehicle-departure constraints appear. The optimizer may send trucks onto routes with empty batteries. This is not a solver failure; the feasible set omitted the service obligation.

For a route starting after hour $t$, require

$$e_{vt}\ge E_{v,t}^{\mathrm{req}}.$$

If energy consumption $d_{vt}$ occurs between hours, the balance is

$$e_{v,t+1}=e_{vt}+\eta_c p_{vt}\Delta t-d_{vt}.$$

Units now reveal a missing $Δt$ in the first model: power in kW times hours gives energy in kWh. Without it, changing hourly resolution changes the physics.

Next the team allows $p_{vt}>0$ while a vehicle is driving. Add availability $a_{vt}\in\{0,1\}$ as data and impose $p_{vt}\le Pa_{vt}$. If the schedule itself is a decision, availability becomes linked to route binaries and the joint model is a MILP. Treating an endogenous schedule as fixed data can understate the trade-off between routing and charging.

Then every vehicle charges at 7 p.m., exceeding the station connection. Individual limits do not enforce a shared transformer limit:

$$\sum_vp_{vt}\le P_t^{\mathrm{station}}.$$

If chargers are discrete, introduce assignment variables. If only $m$ chargers exist,

$$\sum_v z_{vt}\le m,\qquad p_{vt}\le Pz_{vt}.$$

If a vehicle cannot switch chargers every minute, minimum connection durations or switching costs may be needed. Each refinement corresponds to an observed failure of the simpler model.

The objective also misses demand charges. Many commercial tariffs bill the maximum power during a month. Introduce peak $q$ with

$$q\ge\sum_vp_{vt}\quad\forall t$$

and add $c^{\mathrm{peak}}q$ to the objective. This remains an LP when schedules are fixed. A flat energy price can still produce a smooth schedule because the peak charge discourages synchronization.

Battery degradation may be approximated by throughput cost $c^{\mathrm{deg}}\sum p_{vt}Δt$, but actual degradation depends on temperature, depth of discharge, state of charge, and charging rate. A convex piecewise-linear penalty may be a useful planning approximation. State its domain and validate against engineering data. A complex degradation law is not automatically better if parameters are unavailable.

Suppose renewable generation $g_t$ can charge the fleet, and grid import is $y_t$. The correct balance may be

$$
y_t+r_t=g_t+\sum_vp_{vt}+w_t,
$$

where $r_t$ is renewable curtailment and $w_t$ other station load, depending on sign convention. Writing this row from a labeled flow diagram is safer than recalling it from memory. Test a zero-load case and a high-generation case: imports should not become negative unless export is allowed.

A battery can sometimes discharge to the grid. Separate charge $p_{vt}^c$ and discharge $p_{vt}^d$:

$$
e_{v,t+1}=e_{vt}+\eta_cp_{vt}^c\Delta t-
\frac{p_{vt}^d\Delta t}{\eta_d}.
$$

If prices are nonnegative and efficiencies are below one, simultaneous charging and discharging is usually economically dominated. With negative prices, subsidies, or inconsistent tariffs, the relaxation may exploit simultaneous flows. A binary mode variable or complementarity rule prevents it, but first inspect whether the apparent arbitrage exposes a tariff-model error.

Now consider uncertainty. Route consumption depends on traffic and temperature. If decisions are fixed day-ahead, require adequate energy under scenarios or use a chance constraint. If dispatchers can adjust later, separate day-ahead commitments from real-time recourse. A static robust model that forces the same detailed hourly charging plan under every scenario may be unnecessarily conservative when actual operations can respond.

An ellipsoidal robust departure requirement can arise if uncertain route consumption is $\bar d+Pu$ with $\|u\|_2\le\rho$. Ensuring energy covers all such consumption yields a norm protection term. A scenario model instead checks selected joint patterns. A distributionally robust model protects over probability distributions near empirical evidence. The choice should match what is known about uncertainty and how failure is valued.

The team's first validation is a unit test with one vehicle and three hours. Initial energy is 10 kWh, capacity 30, efficiency 0.9, power limit 10 kW, and one-hour periods. Charging at 10 kW for two hours gives $10+2(0.9)(10)=28$ kWh. A route then consumes 12, leaving 16. If code reports 20, efficiency or time-step scaling is wrong. This four-line test is more diagnostic than comparing a thousand-variable solution with intuition.

The second validation is conservation. Sum the state equation over time:

$$
e_{v,T}-e_{v,0}=
\sum_t\eta_cp_{vt}^c\Delta t-
\sum_t\frac{p_{vt}^d\Delta t}{\eta_d}-
\sum_td_{vt}.
$$

The telescoping identity must hold for every vehicle. It catches index shifts that individual rows may hide, especially when departure consumption is applied to the wrong interval.

The third validation is policy simulation. Feed the optimized schedule into an event simulation with actual arrival, departure, consumption, charger occupancy, and outages. Record missed departures, low-state-of-charge events, peak power, cost, and charger waiting. Compare with a simple earliest-deadline-first charging policy under identical scenarios. If the optimizer saves 2% cost but causes more missed routes under modest forecast error, the decision may not be worthwhile.

This diagnostic sequence illustrates a powerful writing structure. Begin with the simplest credible model. Show a counterexample that exposes one missing mechanism. Add the corresponding equation. Repeat only while the mechanism changes the recommendation or its credibility. The reader sees why complexity is present instead of receiving a final wall of symbols.

### Studio I: sensitivity, uncertainty, and the difference between them

Sensitivity analysis asks how an answer changes when inputs change. Uncertainty analysis asks what input values are plausible and how uncertainty propagates. Robust optimization chooses a decision protected against an uncertainty set. These ideas overlap, but treating them as synonyms leads to weak conclusions.

Return to the bakery. Let flour capacity be $F$. Solving over $F=70,75,\ldots,110$ produces a value function $v(F)$. Because it is an LP or MILP depending on setup decisions, $v(F)$ may be piecewise linear with jumps or slope changes. Plot profit and the two product quantities. A slope segment is an empirical shadow price; a breakpoint marks an active-set or integer decision change.

One-at-a-time sensitivity changes one input while holding others fixed. It is easy to explain and useful for debugging. It can be misleading when inputs are coupled. Increasing crop yield while holding market price and demand fixed may be plausible; increasing yield and price together may contradict historical market response. Define perturbations through mechanisms or joint scenarios when correlations matter.

A local derivative

$$S_i=\frac{\partial z^*}{\partial\theta_i}$$

depends on units. A dimensionless elasticity

$$E_i=\frac{\theta_i}{z^*}\frac{\partial z^*}{\partial\theta_i}$$

compares relative effects when quantities are positive. If $E_i=0.8$, a local 1% increase in $\theta_i$ corresponds to about 0.8% increase in the output. Elasticity is still local and can fail near thresholds.

For discrete decisions, objective sensitivity alone is inadequate. Define decision stability, for example Jaccard similarity of selected facilities, Hamming distance of crop activations, or normalized $\ell_1$ distance of allocations. A plan can retain nearly the same profit while completely changing which communities are served or which plots are planted. Decision makers experience the plan, not merely its objective.

Global variance-based sensitivity treats uncertain inputs as distributions and decomposes output variance. A first-order Sobol index measures variance attributable to one input; a total-effect index includes interactions. Such indices require a probabilistic model and many evaluations. If distributions are invented without evidence, precise indices create false authority. Screening methods or structured stress tests may be more honest.

Scenario design should include a nominal case, historically grounded alternatives, and decision-relevant stresses. A stress is not a random nightmare; it targets a mechanism that could reverse the decision. For the relief network, close the bridge or reduce one warehouse supply. For the bakery, lower celebration demand near the setup threshold. For the bus schedule, shift rather than merely scale the peak. For a portfolio, change correlation during a downturn. For crops, combine poor yield with a price response rather than perturbing them independently.

Robust optimization needs an uncertainty budget. If every coefficient independently takes its worst value, the resulting plan may protect against a physically impossible simultaneous disaster. Budgeted uncertainty allows at most $\Gamma$ coefficients to experience full adverse deviation, with partial combinations allowed. As $\Gamma$ rises, protection grows and nominal performance usually falls. Plot both, and explain what $\Gamma$ means operationally.

Chance constraints require

$$\Pr(a^Tx\le b)\ge1-\epsilon.$$

Under Gaussian affine uncertainty, this can become an SOCP involving a mean plus a standard-deviation quantile. But the guarantee depends on distribution assumptions. Heavy tails, dependence, and parameter estimation can invalidate it. Empirical scenario approaches give finite-sample bounds under their own assumptions. A paper should state the guarantee's conditions beside the number.

Out-of-sample evaluation is essential when optimization uses estimated quantities. Optimizing noise creates the optimizer's curse: among many alternatives, the selected one tends to have an unusually favorable estimation error. Evaluate the chosen decision on data not used to estimate or select it. Nested validation may be necessary when hyperparameters and models are compared.

Regret is useful when scenario scales differ. For minimization scenario $\omega$, let $z_\omega(x)$ be the cost of fixed decision $x$, and let $z_\omega^*$ be the cost if that scenario were known in advance. Regret is

$$R_\omega(x)=z_\omega(x)-z_\omega^*.$$

Minimax regret chooses $x$ to minimize the worst lost opportunity. It does not minimize worst absolute cost. A scenario that is expensive for every decision may dominate robust cost but contribute little regret. Choose based on the question: survival under absolute loss or avoiding preventable disadvantage.

Value of perfect information compares the expected stochastic-program cost with expected cost under scenario-wise clairvoyance. Value of the stochastic solution compares a true stochastic solution with a policy based on expected inputs. These quantities say whether modeling uncertainty changes the decision enough to matter. They can justify the effort of scenario modeling—or reveal that a simple deterministic plan is adequate.

Communicate uncertainty with decision thresholds. Instead of a tornado chart containing twenty bars, identify where the recommended action changes. “Open the decorating station if demand is at least eight loaves when setup cost is 70” is actionable. “Setup cost has normalized sensitivity 0.43” is harder to use. Show a two-dimensional phase diagram when two inputs jointly determine the decision.

The final uncertainty audit asks four questions. What is unknown at decision time? What evidence defines plausible values? Which decisions can adapt after information arrives? What failure measure matters? Those four answers determine whether ordinary sensitivity, scenarios, stochastic programming, robust optimization, or a simple safety margin is appropriate.

### Studio J: formulation choices that change the answer

Two teams can read the same story, use the same data, and obtain incompatible recommendations without either making an algebra error. The difference is often a formulation choice hidden inside an innocent phrase. This final studio collects several such choices and shows how to expose them before they become conclusions.

Start with “minimize waiting time.” Does this mean average wait,

$$\frac{1}{N}\sum_{i=1}^Nw_i,$$

maximum wait $\max_i w_i$, the fraction above a service threshold, or a convex penalty $\sum_i w_i^2$? Average wait can sacrifice a small group to help many others. Maximum wait protects the worst user but may spend a great deal for a small improvement. A threshold objective reflects a service promise but treats waits just below and just above the threshold discontinuously. Squared wait increasingly penalizes long delays. None is universally correct.

Suppose four passengers wait $(1,1,1,13)$ minutes under Plan A and $(4,4,4,4)$ under Plan B. Both average four minutes. Maximum wait favors B; variance favors B; a threshold of five minutes counts one violation for A and zero for B. If a model claims the plans are equivalent because their averages match, it has chosen an ethical position without saying so.

Fairness constraints can make that position explicit. If groups $g$ have average waits $\bar w_g$, require

$$|\bar w_g-\bar w_h|\le\delta$$

using two linear inequalities for each pair. Or minimize the maximum group wait with epigraph $t\ge\bar w_g$. But a group average may conceal extreme individuals. Fairness must match the harm being addressed and should be reported beside efficiency cost.

Next consider “meet demand.” An equality $\sum_i x_{ij}=d_j$ assumes exact service and no surplus. An inequality $\sum_i x_{ij}\ge d_j$ permits oversupply, harmless only if oversupply has no cost or physical consequence. A soft balance $\sum_i x_{ij}+u_j=d_j$ with penalized shortage admits failure at a stated price. A chance constraint promises a probability of meeting uncertain demand. These are different contracts.

The penalty on shortage needs calibration. If one unserved patient costs $p$ in the objective, compare $p$ with every other cost unit. If $p$ is too small, the model buys cheap shortage. If it is enormous, numerical conditioning suffers and all other trade-offs vanish. Lexicographic optimization avoids arbitrary exchange rates when service truly has priority: first minimize shortage, fix its optimum within tolerance, then minimize operating cost.

“Use no more than three facilities” is $\sum_j z_j\le3$. “Use exactly three” is equality. “Use up to three but pay a fixed cost” may need only the inequality plus fixed-charge objective. These versions behave differently when demand is low. Ask whether unused capacity is allowed, whether an approved site must open, and whether zero facilities is logically possible.

“At least one of A and B” is $z_A+z_B\ge1$. “Exactly one” is equality. “If A, then B” is $z_A\le z_B$. “A only if B” means the same implication, despite conversational ambiguity. “A if B” means $z_B\le z_A$. Truth tables with four binary combinations are the safest way to verify logic.

Exclusive alternatives can be modeled by disjunction. Suppose a depot must lie left of a river strip or right of it:

$$x_1\le L\quad\text{or}\quad x_1\ge U.$$

With bounds $\ell\le x_1\le u$, binary $z$ can impose

$$x_1\le L+(u-L)z,$$

$$x_1\ge U-(U-\ell)(1-z).$$

At $z=0$, the left rule is active; at $z=1$, the right rule is active. Deriving the coefficients from actual bounds creates a much tighter model than inserting a generic million.

Products of binaries can be linearized exactly. For $w=z_1z_2$,

$$w\le z_1,\qquad w\le z_2,\qquad w\ge z_1+z_2-1,\qquad w\ge0.$$

The constraints make $w=1$ exactly when both binaries are one. A binary times a bounded continuous variable needs a McCormick envelope. If $w=zx$ and $\ell\le x\le u$,

$$
\begin{aligned}
w&\ge\ell z,& w&\le uz,\\
w&\ge x-u(1-z),& w&\le x-\ell(1-z).
\end{aligned}
$$

For binary $z$, these are exact. For continuous $z\in[0,1]$, they give the convex envelope over the box, a relaxation rather than equality in general.

Absolute values also have direction-sensitive formulations. To minimize $|x-a|$, introduce $t\ge x-a$ and $t\ge a-x$, then minimize $t$. To impose $|x-a|\le r$, use $a-r\le x\le a+r$. But $|x-a|\ge r$ is nonconvex: it means $x\le a-r$ or $x\ge a+r$ and requires disjunctive logic if both sides are allowed. Treating all absolute-value constraints as two linear inequalities can reverse their meaning.

The maximum of affine functions is convex. To minimize

$$\max_k(a_k^Tx+b_k),$$

introduce $t$ with $t\ge a_k^Tx+b_k$ for all $k$ and minimize $t$. The minimum of affine functions is concave; maximizing it uses the analogous hypograph. Incorrect epigraph direction is a frequent formulation bug. Test with one scalar and two lines before deploying the general model.

Piecewise-linear convex costs can use an epigraph of supporting lines. Piecewise-linear concave revenue can use segment variables under suitable ordering. A general nonconvex piecewise function may need SOS2 variables or binaries. State whether breakpoints approximate a physical curve, tariff, or empirical response, and examine approximation error where the optimum lands.

Ratios demand special care. Efficiency $\text{benefit}/\text{cost}$ is undefined at zero cost and can prefer tiny projects with attractive ratios over projects with large total benefit. A linear-fractional objective

$$\max\frac{c^Tx+\alpha}{d^Tx+\beta}$$

with positive denominator can sometimes be transformed by Charnes-Cooper. But maximizing a ratio answers a different question from maximizing net benefit subject to a budget. Ask the decision maker which quantity matters.

For example, Project A saves 100 hours for cost 10, ratio 10. Project B saves 8,000 hours for cost 1,000, ratio 8. A ratio objective selects A even if enough budget exists for B and total saved time is the mission. Ratios are excellent descriptive metrics but dangerous default objectives.

Time indexing creates boundary bugs. Inventory balance

$$I_{t+1}=I_t+q_t-d_t$$

requires an initial $I_1$ and a terminal interpretation for $I_{T+1}$. If $q_T$ is allowed but demand ends at $T$, the model may buy terminal stock with no value unless cost prevents it. If leftover inventory has salvage value, include it. If a repeating weekly schedule is intended, impose cyclic $I_{T+1}=I_1$. These choices affect the last period and can propagate backward.

Rolling-horizon implementation distinguishes planning from execution. Solve several weeks, implement only the first day, update forecasts, then solve again. This reduces forecast dependence but can create myopic decisions if terminal values are poor. Backtest the entire rolling policy, not merely a single optimization window.

Network flow balances need one sign convention. For node $i$,

$$\sum_{j:(j,i)}x_{ji}-\sum_{j:(i,j)}x_{ij}=b_i$$

can define $b_i$ as net demand. If sources use negative $b_i$ and sinks positive, verify $\sum_i b_i=0$ in a closed network. Copying a row with the opposite convention can create or destroy flow. Print each node's inflow, outflow, and balance in the verifier.

Multi-commodity flow adds commodity $k$. Shared arc capacity is

$$\sum_kx_{ijk}\le u_{ij},$$

not one separate capacity for each commodity. Forgetting the sum effectively duplicates infrastructure. Conversely, commodities may have different compatibility or loss factors. Aggregate only when their physical use is interchangeable.

Losses alter conservation. If fraction $α_{ij}$ arrives,

$$\sum_j\alpha_{ji}x_{ji}-\sum_jx_{ij}=b_i.$$

In electricity, nonlinear losses may require a convex approximation or AC power-flow model. A linear transport model can still be a baseline, but the paper must identify where it is reliable and validate voltage or thermal constraints afterward.

Capacity expansion often combines continuous and lumpy choices. Existing capacity $u_i$, continuous expansion $e_i$, and binary construction $z_i$ might satisfy

$$\text{flow}_i\le u_i+e_i,\qquad 0\le e_i\le \bar e_i z_i,$$

with fixed and variable costs. If construction comes in modules, use integer module count. Depreciation and multi-year timing require discounting and lead times. Opening capacity instantaneously in the year it is chosen may be unrealistic.

Discounted value for cash flow $C_t$ at rate $r$ is

$$\sum_{t=0}^T\frac{C_t}{(1+r)^t}.$$

Keep nominal versus real prices consistent with nominal versus real discount rates. Optimization can exploit an inconsistency by shifting costs or benefits in time. Sensitivity to $r$ is especially important for infrastructure with large upfront cost and long benefits.

The final formulation choice is the baseline. Compare a sophisticated optimizer with a policy someone could actually use: nearest facility, proportional allocation, earliest deadline, current practice, equal weights, or a greedy schedule. A weak straw baseline exaggerates improvement. A strong transparent baseline reveals which part of the optimizer creates value.

For every important equation, write one counterexample that would pass if the equation were missing or reversed. Zero production tests resource directions. One impossible assignment tests compatibility. A final-period purchase tests horizon logic. A cheap shortage tests penalty calibration. A fractional setup tests activation. A river-crossing point tests disjunction. Counterexamples convert verbal intent into executable tests.

### Studio K: from mathematical optimum to an implementable policy

An optimization project is not finished when the solver returns $x^*$. The result must survive four translations: from full-precision mathematics to a human-readable plan, from a static plan to operating rules, from modeled conditions to the real environment, and from one successful run to a reproducible decision process. Each translation can destroy feasibility or change the claimed benefit.

Consider a meal-delivery model that assigns 127.6 driver-hours to Monday. The fractional number may be appropriate during strategic capacity planning, where driver-hours are purchased in flexible shifts. It is not an executable roster. If actual shifts last four or eight hours, the decision needs discrete shift patterns. Rounding 127.6 to 128 does not specify who works when, whether breaks are legal, or whether enough drivers overlap at the peak.

A useful hierarchy separates strategic, tactical, and operational decisions. Strategic decisions—open a depot, buy chargers, choose crop infrastructure—have long horizons and are often discrete. Tactical decisions—weekly capacity, planting areas, shift templates—translate assets into plans. Operational decisions—dispatch the next ambulance, reroute one truck, charge a particular vehicle—respond to current information. Forcing every detail into one monolithic model can be unnecessary; optimizing only the strategic layer while assuming operations will somehow work can be dangerous.

One approach is hierarchical optimization. The upper model chooses capacity $y$. A lower scheduling model tests whether operations $x$ can satisfy demand:

$$
\min_y C(y)+Q(y),
$$

where

$$
Q(y)=\min_x\{q^Tx: W x\ge h-Ty, x\in X\}.
$$

The recourse value $Q(y)$ is not an arbitrary correction; it is the best operating cost available after the capacity decision. If the lower problem is infeasible for some $y$, feasibility cuts or explicit emergency actions are needed. Benders decomposition uses lower-problem duals to approximate $Q(y)$ in the master model. Even when decomposition is not implemented, this structure clarifies what the strategic decision assumes about later adaptation.

Policies can be more useful than schedules when uncertainty unfolds. A static bus schedule fixes every $x_t$ in advance. A policy might say “add one bus when the observed queue exceeds 35 and a reserve driver is available.” The threshold can be optimized in simulation. The policy is simpler to execute, reacts to information, and may be more robust than a detailed nominal schedule.

However, simulation-based policy optimization introduces sampling noise. If $\theta$ is a policy parameter and $\hat J_N(\theta)$ is average cost over $N$ random scenarios, selecting the lowest observed value among many candidates overfits simulation noise. Use common random numbers so policies face the same scenarios, tune on one set, and evaluate the chosen policy on independent scenarios. Report confidence intervals for paired differences.

Suppose Policy A and B are tested on the same $N$ demand paths. Let $D_s=J_s(A)-J_s(B)$. The standard error of the mean difference is

$$
\operatorname{SE}(\bar D)=
\frac{s_D}{\sqrt N},
$$

where $s_D$ is the sample standard deviation of paired differences. Pairing usually reduces variance because hard scenarios affect both policies. Comparing two independent averages discards that information.

Implementation also requires a fallback. A crop plan may become infeasible after a weather shock; a route may be blocked; a nurse may call out. A robust operating procedure specifies which constraints may be softened, in what order, and at what alert level. Emergency shortage variables should exist in the implementation even if the nominal optimum uses none. Their penalties create a controlled degradation rather than software failure.

Slack priorities can be lexicographic. For a hospital roster:

1. never violate qualifications or legal rest;
2. minimize uncovered critical-care demand;
3. minimize uncovered ordinary demand;
4. minimize overtime;
5. improve preferences and fairness.

Encoding all five with gigantic weights can create numerical and interpretive problems. Sequential optimization is clearer: solve priority 1, fix its optimum, then optimize priority 2, and so forth. Allow a tolerance only when the decision maker explicitly accepts it.

The handoff document should include a data contract. For each input, state name, unit, source, timestamp, allowed range, missing-value rule, and whether it is known at decision time. A model using tomorrow's realized demand during today's scheduling is not deployable even if historical backtests look excellent. The distinction between event time and data-arrival time must be explicit.

Output needs a contract too. A crop schedule should identify plot, year, season, crop, area, expected production, sold quantity, and scenario assumptions. A routing plan needs ordered stops and timing, not just selected edges. A facility plan needs coordinates or site IDs plus capacity and service assignment. Every output row should be traceable to variables and pass a schema validator.

Versioning protects the evidence chain. Store the raw input checksum, preprocessing version, model version, solver and version, parameter file, seed, timestamp, and output checksum. If a figure is regenerated after data change, its caption should correspond to the same run as the reported table. Silent mixture of results from different runs is surprisingly common under competition pressure.

An independent evaluator is stronger than relying on the model-building code. If the optimization code constructs a capacity row incorrectly and the “verification” calls the same row object, both agree on the same mistake. A separate evaluator reads exported decisions and raw data, then reconstructs quantities with simpler code. Independence need not mean another programming language, but it should avoid reusing the exact algebraic construction.

For a crop model, the evaluator can emit a certificate table:

$$
\begin{array}{lrrr}
\text{check}&\text{maximum violation}&\text{location}&\text{tolerance}\\\hline
\text{plot area}&0.0000&-&10^{-6}\\
\text{rotation}&0&-&0\\
\text{legume window}&0.0000&-&10^{-6}\\
\text{sales cap}&0.0000&-&10^{-6}\\
\text{integrality}&0.0000&-&10^{-6}
\end{array}
$$

If there is a violation, replace the dash with the offending semantic index. This table is far more informative than “all constraints satisfied.” It states what was checked and how precisely.

Objective reconciliation is equally important. Break profit into full-price revenue, discounted revenue, planting cost, labor cost, setup cost, and penalties. Sum the table and compare with solver output. A mismatch often reveals that the report and code use different scenarios, discounting, or units.

Rounding must be included in reconciliation. Suppose continuous planting areas are rounded to two decimals. On hundreds of crops, row totals can exceed plot area by accumulated rounding. Use a controlled rounding procedure: floor values, compute remaining capacity, then allocate hundredths according to marginal value while respecting all rules. For coupled rotations, solve a small repair optimization that minimizes distance from the continuous plan.

The repaired plan has its own objective $z_R$. Compare with the continuous bound $z_C$ and, if available, the exact integer incumbent $z_I$. The difference $z_C-z_R$ combines relaxation and repair loss; it is not necessarily the true optimality gap. Be precise about which comparison is certified and which is empirical.

Monitoring begins after deployment. Define leading indicators tied to model assumptions: forecast error, constraint slack, frequency of emergency actions, queue length, unmet demand, price deviation, and data missingness. A model can remain numerically optimal while its input distribution drifts beyond the validated range.

For feature or parameter distribution $P_0$ during development and $P_t$ during operation, distance measures can flag drift, but statistical difference does not automatically imply decision harm. Measure decision drift too: does the recommended action change, does feasibility shrink, or does regret against a revised benchmark rise? Monitoring should connect data changes to consequences.

A retraining or reoptimization trigger can use thresholds. Reoptimize daily for routine updated demand; retrain a forecast when error exceeds a control limit; revisit model structure when residual patterns persist or a previously negligible constraint becomes regularly binding. Do not respond to every noisy fluctuation with a model rewrite.

Human override is part of the system. Record when operators reject recommendations and why. Overrides may reveal missing constraints, inaccurate data, or legitimate contextual knowledge. They may also reflect habit or misunderstanding. Analyze patterns rather than treating every override as either proof that humans are wrong or proof that optimization failed.

Explanations should be decision-specific. “The optimizer chose Depot B because it minimizes the objective” is circular. A better explanation says: “Depot B shortens access to the two highest-demand communities; the river constraint prevents the unconstrained center; moving to Depot A adds 18 expected vehicle-hours, while no capacity rule improves.” Active constraints, counterfactual changes, and objective components form a causal narrative within the model.

Counterfactuals must stay feasible. Asking “what if we did not open Depot B?” means fix $z_B=0$ and reoptimize all other variables, not merely delete B's benefit from the current objective. Reoptimization allows the system to adapt and gives the true model-based opportunity cost.

For black-box stakeholders, present three layers. The first is the recommendation and its expected consequence. The second is the small set of binding reasons and sensitivity thresholds. The third is the technical appendix with complete formulation, data, and certificates. Transparency does not require placing every matrix on the first page; it requires making the evidence traceable.

A predeployment shadow run is often prudent. Generate recommendations without acting on them, compare with current operations, and investigate disagreements. This tests data latency, integration, feasibility, and explanation quality at low risk. The shadow period should have acceptance criteria defined beforehand so only favorable anecdotes do not determine deployment.

An A/B test may be impossible or unethical for strategic decisions, but phased rollout, matched regions, stepped-wedge designs, or interrupted time series can provide causal evidence. Operational evaluation must account for adaptation: drivers learn routes, customers respond to service, and managers change behavior. A one-week result may not represent steady state.

Optimization can create feedback. A demand model trained on sales observes only demand served under previous inventory decisions. If stockouts occurred, sales understate latent demand. Optimizing future inventory from censored sales perpetuates shortage. Record lost sales, availability, and interventions, or use a model that accounts for censoring.

Fairness can also change through feedback. Directing more resources to areas with historically recorded incidents may increase future detection there, reinforcing the pattern. Sensitivity analysis on weights cannot fix a target built from selective observation. The model boundary must include the measurement process when it affects data.

Security and privacy matter for deployment data. Use the minimum personal information required, aggregate when possible, restrict access, and document retention. An assignment optimum does not justify exposing medical or employee information in a public spreadsheet. Competition prototypes should use anonymized identifiers and avoid publishing raw sensitive records.

Operational resilience asks how the system fails. Remove one facility, one key worker, one road, or one data feed and re-evaluate. Compute $N-1$ contingency performance where appropriate. Redundancy may look inefficient in the nominal objective but valuable under disruption. If resilience is a requirement, encode or evaluate it rather than praising it after the fact.

The implementation decision can be framed as a final optimization: balance expected model benefit against integration cost, training cost, maintenance burden, and failure risk. Sometimes the sophisticated model is not worth deploying. A transparent heuristic with 98% of modeled benefit, easy verification, and robust human understanding may be the better system.

Before release, conduct a red-team review. Give one person the task of breaking the model: construct extreme inputs, reverse units, remove data, inspect horizon endpoints, try zero and maximum capacities, check logical truth tables, and search for profitable loopholes. A model that survives adversarial examples earns more confidence than one that merely reproduces its training cases.

Finally, prepare a rollback. Preserve the previous policy, define the alert that triggers rollback, and ensure outputs can be disabled without interrupting the operation. Optimization is a component of a decision system, not an oracle that replaces responsibility.

The complete chain is therefore longer than “formulate, solve, report.” It is: define the decision, formulate, hand-check, solve, certify, translate, repair, simulate, explain, shadow-test, deploy, monitor, learn, and revise. Each step has its own evidence. Skipping one does not make the mathematics false, but it can make the recommendation unusable.

### Studio L: a compact end-to-end audit

Imagine receiving an optimization paper with ten minutes left before submission. Use the following audit in order. First, circle every decision variable and write its unit. If a symbol changes meaning across sections, fix it. Second, read each objective term as a sentence and verify all terms share one value scale or a documented trade-off weight. Third, test every constraint at zero, at an obvious feasible point, and at a deliberately violating point.

Fourth, inspect time and information. Does an equation use data unavailable when the decision is made? Are initial and terminal conditions present? Are adjacent periods correct across seasons or calendar boundaries? Fifth, inspect logic. For every “if,” “only if,” “either,” and “at most,” write a truth table or enumerate a tiny case.

Sixth, classify curvature and discreteness. Confirm every quadratic Hessian claimed convex is PSD, every cone right-hand side has the required sign, and every indivisible decision is integer. Seventh, verify solver status, tolerance, objective bound, and runtime. A feasible incumbent is not automatically optimal; “optimal inaccurate” is not the same as optimal.

Eighth, run the independent output checker and reconcile the objective. Ninth, compare with a hand solution and a meaningful baseline. Tenth, perturb the most important assumptions and show whether decisions—not just objective values—change. Eleventh, inspect every table and figure for matching run identifiers, units, and scenario definitions. Twelfth, rewrite the conclusion so it states conditions and limitations.

This audit will not prove that reality obeys the model. It will ensure that the paper's claims follow from the encoded model, that the encoding follows the stated assumptions, and that numerical output survives basic attempts to break it. That is the standard an optimization result should meet before it influences a real decision.

One final artifact makes the audit repeatable: a minimal reproducible instance. It should be small enough that a teammate can inspect every number without the original data workbook. For an LP, use two activities and two resources and include the expected primal solution, dual solution, active rows, and objective. For a QP, provide the Hessian, eigenvalues, unconstrained minimizer, active-set solution, and KKT residuals. For an SOCP, use a geometric case with an analytic center and radius. For a MILP, choose an instance small enough to enumerate every integer alternative.

The instance must exercise the difficult feature rather than only a trivial path. If production and sales are separated, include a case where production can exceed demand. If fixed charges matter, include one scenario just below and one just above the activation threshold. If rotation is important, use enough periods for the forbidden sequence to occur. If uncertainty creates a cone, choose a perturbation whose worst direction can be calculated by hand.

Store expected results with tolerances, not only screenshots. A regression test might assert

$$
|z-z_{\mathrm{expected}}|\le10^{-6},
$$

maximum constraint violation below $10^{-7}$, and the expected set of active constraints. Active sets can change under degeneracy while solutions remain valid, so do not overconstrain a test when several optima exist. In that case test feasibility, objective, and membership in the known optimal face.

Create deliberate failure tests as well. Swap two cost columns and confirm the objective reconciliation fails. Remove a demand row and confirm the unbounded or implausible solution is detected. Change a binary to continuous and confirm integrality checks fail. Reverse one network arc and confirm node balance identifies the location. Tests that only pass the finished implementation do not demonstrate that the verifier can catch errors.

Performance tests need stable measures. Record model dimensions, nonzero coefficients, construction time, solve time, nodes, iterations, incumbent, bound, and peak memory. Do not compare runtime across machines without reporting hardware and solver settings. More importantly, do not trade correctness for a dramatic speed chart: verify every variant under the same output audit.

Reproducibility also includes failure behavior. If an input column is missing, stop with a useful message rather than silently filling zero. If no feasible solution exists, export the diagnostic relaxation rather than an empty “optimal plan.” If a time limit is reached, preserve the incumbent and bound and label them accurately. A reliable pipeline makes uncertainty in computation visible.

Finally, ask a teammate who did not write the model to reproduce the small case from the README. Every undocumented assumption they have to ask about is evidence of a missing sentence, unit, or command. When they can rebuild the result, explain its active constraints, and intentionally trigger a verifier failure, the optimization work has become inspectable rather than personal magic.

Keep an assumption ledger beside those tests. Each entry should record the assumption, its reason, supporting evidence, affected equations, a plausible violation, and the analysis that would detect that violation. “Travel time is constant” is too vague; “the route matrix uses weekday off-peak medians and is stress-tested at the 80th percentile” can be audited. Link every important conclusion back to the entries on which it depends.

The ledger also prevents sensitivity analysis from becoming decorative. Rank assumptions by their ability to change feasibility, active constraints, or the recommended action. Test those first. A parameter with a large effect on the fourth decimal of profit but no effect on the decision deserves less attention than a modest uncertainty that opens a different facility or leaves a shelter unserved.

When the model is updated, rerun the full chain rather than editing the final table manually. A changed data source can alter units; a new constraint can invalidate an old hand solution; a solver upgrade can change tolerances; a revised scenario can make a caption false. Automated checks should fail loudly until every dependent artifact is regenerated and reconciled. That discipline turns a numerical answer into durable, reviewable decision evidence.

### Cross-studio synthesis: choosing the right structure

Across the six studios, the stories differ but the diagnostic questions repeat. Are decisions continuous or indivisible? Are coefficients known before the decision? Does a square express risk, physics, or merely convenience? Is uncertainty bounded, probabilistic, scenario-based, or revealed later? Can one global model be solved, or is the feasible set a union requiring integer logic or decomposition?

Use an LP when marginal contributions and rules are linear and decisions can be continuous. Use a MILP when activation, assignment, logical alternatives, or indivisibility matters. Use a convex QP when curvature represents variance, tracking, energy, or smoothness and the Hessian is PSD. Use an SOCP when Euclidean norms, ellipsoidal uncertainty, or quadratic risk constraints appear in a convex form. These are starting classifications, not labels to force onto a story.

The strongest verification pattern is also shared:

1. solve a tiny instance by hand or enumeration;
2. reconstruct all constraints from exported decisions;
3. recompute every objective component independently;
4. inspect solver status, residuals, bounds, and integrality gap;
5. compare with a transparent baseline;
6. perturb important inputs and locate decision breakpoints;
7. test on held-out or stress scenarios when data permit;
8. translate active constraints and dual values into domain language.

One should resist a common competition temptation: producing many algorithms and selecting the one with the most favorable number. Models with different objectives or information sets are not contestants in a fair race. Establish one evaluation protocol, give every method the same data available at decision time, and explain why any additional complexity changes evidence or decisions.

Optimization is most persuasive when it returns more than a vector. The vector says what to do. Active constraints say what prevents further improvement. Dual values say which extra resource may matter. sensitivity reveals when the recommendation changes. Bounds say how much optimality remains unknown. Scenarios reveal where the plan is vulnerable. Together these form a decision argument.

## 12. Knowledge Check

The questions below move from basic model recognition to difficult formulation and certification choices. Single-answer and multiple-answer questions are mixed. Read the explanation after checking: the goal is to understand why a tempting alternative fails, not merely to collect a score.

<section class="modeling-quiz" data-modeling-quiz="lesson-4" data-locale="en"></section>

The next blog goes deeper into convexity proofs, conjugates, duality, proximal operators, first-order rates, and algorithms for models too large to hand directly to a generic solver.
