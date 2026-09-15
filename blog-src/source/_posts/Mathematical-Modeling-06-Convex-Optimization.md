---
title: Mathematical Modeling 6 - Convex Optimization
date: 2026-09-14 20:00:11
categories: Mathematical Modeling
tags:
  - Linear Programming
  - Quadratic Programming
  - Convex Optimization
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "A modeling-first guide to linear, assignment, quadratic, and conic optimization with variables, constraints, and solver checks."
---

Optimization turns “what should we do?” into decision variables, an objective, and a feasible set. The difficult part is usually not calling the solver; it is expressing the real decision without losing an essential rule.

## Linear programs

A linear program has the standard form

$$
\min_x c^Tx \quad
\text{s.t.}\quad A_{ub}x\le b_{ub},\quad A_{eq}x=b_{eq},\quad \ell\le x\le u.
$$

The coefficients must be constants. Products such as $x_1x_2$, ratios of decisions, and squared decisions are not linear.

For two products with profits $60$ and $40$, flour use $4$ and $2$, sugar use $1$ and $2$, and capacities $80$ and $50$,

$$
\max_{x_A,x_B\ge0} 60x_A+40x_B
$$

subject to

$$
4x_A+2x_B\le80,\qquad x_A+2x_B\le50.
$$

If boxes must be whole, the variables are integer and the problem becomes a mixed-integer linear program. Do not solve the continuous relaxation and round blindly: rounding can violate constraints or destroy optimality.

## Assignment and logical decisions

Let $x_{ij}=1$ when task $i$ is assigned to worker $j$. A minimum-cost assignment is

$$
\min \sum_{i\in\mathcal I}\sum_{j\in\mathcal J}c_{ij}x_{ij}
$$

with

$$
\sum_j x_{ij}=1\quad\forall i,qquad
\sum_i x_{ij}\le1\quad\forall j,qquad x_{ij}\in\{0,1\}.
$$

Binary variables also encode activation, ordering, coverage, and incompatibility. If alternatives $i$ and $j$ cannot coexist, use $x_i+x_j\le1$. If selecting project $i$ requires facility $j$, use $x_i\le y_j$.

## Quadratic programs

A quadratic program uses

$$
\min_x \frac12x^TQx+c^Tx
$$

with linear constraints. It is convex when $Q\succeq0$. Quadratic terms naturally represent squared tracking error, variance, smoothness, and distance-like penalties.

Portfolio selection is a canonical example:

$$
\min_w w^T\Sigma w
\quad\text{s.t.}\quad
\mu^Tw\ge r_0,\quad \mathbf1^Tw=1,quad w\ge0.
$$

Here $w$ contains portfolio weights, $\Sigma$ is the covariance matrix, and $\mu$ is expected return. The covariance estimate—not the optimizer—often dominates the model's uncertainty.

## Conic structure

Second-order cone constraints have the form

$$
\|Ax+b\|_2\le c^Tx+d.
$$

They represent norm bounds, robust linear constraints, and many risk limits. Recognizing convex structure matters because a convex feasible problem has no misleading local optimum: solver certificates and dual information become meaningful.

## Formulation workflow

Write the model in this order:

1. indices and sets;
2. known parameters and units;
3. decision variables and domains;
4. objective, with each term interpreted;
5. constraints, grouped by real rule;
6. solver and numerical tolerances;
7. post-solve feasibility and sensitivity checks.

Scale coefficients when one part of the model is near $10^{-8}$ and another near $10^9$. Poor scaling can make a correct formulation numerically fragile.

## Interpreting the solution

Report active constraints, unused capacity, and marginal values—not only $x^*$. A dual variable estimates how the optimal objective changes when the corresponding constraint is relaxed slightly. It can identify the resource worth purchasing next.

SciPy's official `linprog` interface uses exactly the inequality, equality, and bound form above and currently delegates to HiGHS methods ([documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linprog.html)). After solving, independently recompute the objective, integrality, and every constraint from the returned decisions.

For the snack example, SciPy minimizes, so negate the profit coefficients:

```python
import numpy as np
from scipy.optimize import linprog

c = np.array([-60.0, -40.0])
A = np.array([[4.0, 2.0], [1.0, 2.0]])
b = np.array([80.0, 50.0])

result = linprog(c, A_ub=A, b_ub=b, bounds=[(0, None), (0, None)])
assert result.success
x = result.x
profit = -result.fun
violation = np.maximum(A @ x - b, 0).max()
print(x, profit, violation)
```

Read the answer in domain language: how many boxes of each product, expected profit, which resource is binding, and whether continuous quantities are physically allowed. If boxes must be integral, use a mixed-integer solver instead of this continuous model.
