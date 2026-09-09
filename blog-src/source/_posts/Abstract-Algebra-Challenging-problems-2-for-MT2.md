---
title: Abstract Algebra-Challenging problems 2 for MT2
date: 2024-11-02 17:16:40
tags:
mathjax: true
cover: "/images/2024-11-12-1.jpeg"
categories: Math113-Abstract Algebra
published: false
---

**Instructions:**

- Provide clear and complete reasoning for every problem.
- Use results from lectures and the provided notes, referencing definitions where appropriate.
- The problems are designed to be challenging and integrate multiple concepts from your course.
- Mathematical expressions are enclosed within `$...$` for inline math and `$$...$$` for display math.
- **A total of 50 problems** are provided, each with meaningful content and appropriate difficulty.
- Problems are intended to be comprehensive and computationally intensive, suitable for exam preparation.

---

## Problem 1: Group Actions and Coset Spaces

Let $G$ be a finite group of order $168$, and let $H$ be a subgroup of order $7$. Consider the action of $G$ on the set of left cosets $G/H$ by left multiplication.

1. **(a)** Determine the number of elements in $G/H$.

2. **(b)** Prove that the action is transitive.

3. **(c)** For a fixed coset $gH$, compute the stabilizer subgroup $\operatorname{Stab}_G(gH)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem for this action.

**Hint:** Recall that $|G| = |H| \times [G : H]$.

---

## Problem 2: Action on the Projective Line

Let $G = \operatorname{PSL}(2, \mathbb{F}_p)$, the projective special linear group over the finite field $\mathbb{F}_p$, acting on the projective line $\mathbb{P}^1(\mathbb{F}_p)$.

1. **(a)** Describe the action of $G$ on $\mathbb{P}^1(\mathbb{F}_p)$.

2. **(b)** Determine the size of $\mathbb{P}^1(\mathbb{F}_p)$.

3. **(c)** Prove that the action is doubly transitive.

4. **(d)** Compute the stabilizer subgroup of a point in $\mathbb{P}^1(\mathbb{F}_p)$.

**Hint:** Consider Möbius transformations and their effect on the projective line.

---

## Problem 3: Group Action on Set of Subgroups

Let $G$ be a finite group acting on the set $X$ of its subgroups by conjugation: $g \cdot H = gHg^{-1}$.

1. **(a)** Prove that this defines a group action.

2. **(b)** Determine the orbits of this action for $G = S_3$.

3. **(c)** Find the number of conjugacy classes of subgroups in $S_3$.

4. **(d)** Describe the stabilizer subgroup $\operatorname{Stab}_G(H)$ for a subgroup $H \leq G$.

**Hint:** Consider normal subgroups and their conjugacy classes.

---

## Problem 4: Burnside's Lemma and Group Actions

Consider the action of the alternating group $A_4$ on the set of colorings of the faces of a regular tetrahedron using $n$ colors, where colorings are considered the same if they are related by a symmetry in $A_4$.

1. **(a)** List all elements of $A_4$ and describe their action on the tetrahedron.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 3$.

4. **(d)** Determine the number of colorings fixed by a $120^\circ$ rotation.

**Hint:** Consider the rotational symmetries and fixed points under each group element.

---

## Problem 5: Action on Group Homomorphisms

Let $G$ and $H$ be groups, and let $G$ act on the set $\operatorname{Hom}(G, H)$ of group homomorphisms from $G$ to $H$ by conjugation: $(g \cdot \phi)(x) = \phi(g^{-1}xg)$.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the stabilizer subgroup $\operatorname{Stab}_G(\phi)$ for a homomorphism $\phi$.

3. **(c)** Describe the orbits of this action when $G = \mathbb{Z}/2\mathbb{Z}$ and $H = S_3$.

4. **(d)** Compute the number of distinct homomorphisms up to conjugation.

**Hint:** Consider the kernel and image of $\phi$ and how conjugation affects them.

---

## Problem 6: Rings of Matrices over Finite Fields

Let $R = M_{n \times n}(\mathbb{F}_q)$, the ring of $n \times n$ matrices over the finite field $\mathbb{F}_q$.

1. **(a)** Determine the number of units in $R$.

2. **(b)** Show that a matrix $A \in R$ is invertible if and only if $\det A \neq 0$.

3. **(c)** Calculate the number of invertible matrices when $n = 2$ and $q = 3$.

4. **(d)** Are all non-invertible matrices zero-divisors in $R$? Justify your answer.

**Hint:** Use properties of determinants and finite fields.

---

## Problem 7: Homomorphisms from $\mathbb{Z}$ to a Finite Ring

Let $R = \mathbb{Z}/12\mathbb{Z}$.

1. **(a)** Determine all ring homomorphisms from $\mathbb{Z}$ to $R$.

2. **(b)** Describe the kernels of these homomorphisms.

3. **(c)** Use the First Isomorphism Theorem to describe the images of these homomorphisms.

4. **(d)** How many distinct ring homomorphisms are there from $\mathbb{Z}$ to $R$?

**Hint:** Ring homomorphisms from $\mathbb{Z}$ are determined by the image of $1$.

---

## Problem 8: Group Actions and Orbit Sizes

Let $G$ be a group acting on a finite set $X$, and let $x \in X$.

1. **(a)** Prove that the size of the orbit $\operatorname{Orb}_G(x)$ divides the order of $G$.

2. **(b)** Show that the number of distinct orbits is less than or equal to $|X|$.

3. **(c)** If $|G| = 24$ and $|X| = 10$, what are the possible sizes of the orbits?

4. **(d)** Provide an example of such a group action with these parameters.

**Hint:** Use the Orbit-Stabilizer Theorem and Lagrange's Theorem.

---

## Problem 9: Cyclic Group Actions on Polynomials

Let $G = \mathbb{Z}/n\mathbb{Z}$ act on the ring $\mathbb{C}[x]$ by $g \cdot f(x) = f(e^{2\pi i g/n} x)$.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the fixed ring $\mathbb{C}[x]^G$.

3. **(c)** Prove that $\mathbb{C}[x]^G$ consists of polynomials in $x^n$.

4. **(d)** Find a nontrivial example of a polynomial in $\mathbb{C}[x]^G$.

**Hint:** Consider the properties of complex roots of unity.

---

## Problem 10: Ideals in $\mathbb{Z}[x]$ and Factorization

Let $f(x) = x^4 + 1$ in $\mathbb{Z}[x]$.

1. **(a)** Prove that $f(x)$ is reducible over $\mathbb{Z}[x]$.

2. **(b)** Factor $f(x)$ into irreducible polynomials over $\mathbb{Z}[x]$.

3. **(c)** Describe the ideal $(f(x))$ in $\mathbb{Z}[x]$.

4. **(d)** Determine whether $\mathbb{Z}[x]/(f(x))$ is a field.

**Hint:** Consider factoring over $\mathbb{Z}[i][x]$ and the Eisenstein Criterion.

---

## Problem 11: Group Actions on Affine Planes

Let $G = \operatorname{GL}(2, \mathbb{F}_p)$ act on the affine plane $\mathbb{F}_p^2$ by linear transformations.

1. **(a)** Prove that this defines a group action.

2. **(b)** Determine the size of the orbit of a nonzero vector $v \in \mathbb{F}_p^2$.

3. **(c)** Compute the stabilizer subgroup $\operatorname{Stab}_G(v)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem for this action.

**Hint:** Use properties of general linear groups over finite fields.

---

## Problem 12: Action on Rational Functions

Let $G = \mathbb{Z}/2\mathbb{Z}$ act on the field of rational functions $\mathbb{R}(x)$ by $g \cdot f(x) = f(-x)$.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the fixed field $\mathbb{R}(x)^G$.

3. **(c)** Prove that $\mathbb{R}(x)^G$ consists of rational functions in $x^2$.

4. **(d)** Find an example of a nontrivial rational function in $\mathbb{R}(x)^G$.

**Hint:** Consider the effect of the action on even and odd functions.

---

## Problem 13: Conjugacy Classes in $S_n$

Let $G = S_n$, the symmetric group on $n$ elements.

1. **(a)** Describe the conjugacy classes of $G$.

2. **(b)** Prove that two permutations are conjugate if and only if they have the same cycle type.

3. **(c)** Determine the number of conjugacy classes in $S_5$.

4. **(d)** Calculate the sizes of the conjugacy classes in $S_5$.

**Hint:** Use the concept of cycle decompositions and their properties.

---

## Problem 14: Group Action on Set of Equations

Let $G = \operatorname{GL}(n, \mathbb{R})$ act on the set $X$ of homogeneous linear equations in $n$ variables by transforming the coefficients.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the stabilizer subgroup of a given equation.

3. **(c)** Describe the orbits of this action.

4. **(d)** Relate this action to the concept of linear dependence.

**Hint:** Consider how linear transformations affect solutions to equations.

---

## Problem 15: Burnside's Lemma and Bracelets

Consider bracelets with $n$ beads, each bead colored using $k$ colors. Two bracelets are considered the same if one can be obtained from the other by rotation or reflection.

1. **(a)** Describe the dihedral group $D_n$ acting on the set of bracelets.

2. **(b)** Use Burnside's Lemma to find the number of distinct bracelets.

3. **(c)** Calculate this number explicitly for $n = 8$ and $k = 2$.

4. **(d)** Discuss the difference in counts between necklaces and bracelets.

**Hint:** Reflections are included in the symmetries for bracelets.

---

## Problem 16: Rings of Continuous Functions

Let $R$ be the ring of all continuous real-valued functions on the interval $[0, 1]$, with pointwise addition and multiplication.

1. **(a)** Determine the units in $R$.

2. **(b)** Show that zero-divisors exist in $R$.

3. **(c)** Provide an explicit example of two non-zero functions whose product is zero.

4. **(d)** Discuss whether $R$ is an integral domain.

**Hint:** Consider functions that are zero on subsets of $[0, 1]$.

---

## Problem 17: Group Action on Integer Lattices

Let $G = \operatorname{SL}(2, \mathbb{Z})$, the group of $2 \times 2$ integer matrices with determinant $1$, act on $\mathbb{Z}^2$ by matrix multiplication.

1. **(a)** Prove that this defines a group action.

2. **(b)** Determine the orbits of this action.

3. **(c)** Show that two vectors $v, w \in \mathbb{Z}^2$ are in the same orbit if and only if they are related by an element of $G$.

4. **(d)** Discuss the significance of this action in number theory.

**Hint:** Consider the concepts of equivalence classes and the structure of integer lattices.

---

## Problem 18: Homomorphisms Between Polynomial Rings

Let $\phi: \mathbb{Q}[x] \rightarrow \mathbb{Q}[x]$ be the ring homomorphism defined by $\phi(f(x)) = f(x + 1)$.

1. **(a)** Prove that $\phi$ is a ring homomorphism.

2. **(b)** Determine the kernel $\ker \phi$.

3. **(c)** Is $\phi$ injective? Justify your answer.

4. **(d)** Describe the image $\operatorname{Im} \phi$.

**Hint:** Consider the effect of $\phi$ on the basis elements of $\mathbb{Q}[x]$.

---

## Problem 19: Action on Complex Numbers

Let $G = \mathbb{Z}/4\mathbb{Z}$ act on $\mathbb{C}$ by $g \cdot z = e^{i\pi g/2} z$.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the orbits of this action on $\mathbb{C}$.

3. **(c)** Describe the fixed points of this action.

4. **(d)** Relate this action to rotations in the complex plane.

**Hint:** Consider the multiplication by roots of unity.

---

## Problem 20: Ideals and Factor Rings

Let $R = \mathbb{Z}[x]$, and let $I = (2, x)$.

1. **(a)** Describe the elements of the quotient ring $R/I$.

2. **(b)** Show that $R/I$ is a finite ring.

3. **(c)** Determine the number of elements in $R/I$.

4. **(d)** Discuss whether $R/I$ is a field.

**Hint:** Consider the structure of the ideal $(2, x)$ and the fact that $x^2 = 0$ in $R/I$.

---

## Problem 21: Group Actions on Polynomials

Let $G = \operatorname{Gal}(\mathbb{Q}(\sqrt{2})/\mathbb{Q})$, the Galois group of $\mathbb{Q}(\sqrt{2})$ over $\mathbb{Q}$, act on the ring $\mathbb{Q}[x]$ by acting on the coefficients.

1. **(a)** Describe the elements of $G$.

2. **(b)** Show that this defines a group action on $\mathbb{Q}[x]$.

3. **(c)** Determine the fixed ring $\mathbb{Q}[x]^G$.

4. **(d)** Provide an example of a polynomial not fixed by the action.

**Hint:** Consider how $\sqrt{2}$ is affected by the nontrivial automorphism in $G$.

---

## Problem 22: Conjugacy Classes and Class Equation

Let $G$ be a finite $p$-group, where $p$ is a prime.

1. **(a)** State and prove the class equation for $G$.

2. **(b)** Show that the center $Z(G)$ of $G$ is nontrivial.

3. **(c)** Use the class equation to determine possible orders of $Z(G)$.

4. **(d)** Apply this to $G = \operatorname{Heis}_p(\mathbb{F}_p)$, the Heisenberg group over $\mathbb{F}_p$.

**Hint:** Consider the sizes of conjugacy classes and their relation to the group's order.

---

## Problem 23: Action on Complex Polynomials

Let $G = \operatorname{Gal}(\mathbb{Q}(\sqrt[3]{2})/\mathbb{Q})$ act on $\mathbb{C}[x]$ by acting on the coefficients.

1. **(a)** Describe the Galois group $G$.

2. **(b)** Show that this defines a group action on $\mathbb{C}[x]$.

3. **(c)** Determine the fixed ring $\mathbb{C}[x]^G$.

4. **(d)** Explain why certain polynomials are fixed or not fixed by the action.

**Hint:** Consider the minimal polynomial of $\sqrt[3]{2}$ and its splitting field.

---

## Problem 24: Rings of Continuous Functions Modulo an Ideal

Let $R$ be the ring of continuous real-valued functions on $[0, 1]$, and let $I$ be the ideal of functions vanishing at $x = 0$.

1. **(a)** Describe the quotient ring $R/I$.

2. **(b)** Show that $R/I$ is isomorphic to $\mathbb{R}$.

3. **(c)** Discuss the units in $R/I$.

4. **(d)** Explain the significance of this quotient in functional analysis.

**Hint:** Consider evaluation at $x = 0$.

---

## Problem 25: Group Actions on Cosets of Normal Subgroups

Let $G$ be a group, and let $N$ be a normal subgroup of $G$. Consider the action of $G$ on $G/N$ by conjugation: $g \cdot (hN) = ghg^{-1}N$.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the orbits of this action.

3. **(c)** Prove that the action is trivial.

4. **(d)** Discuss the implications for the structure of $G$.

**Hint:** Use the normality of $N$ in $G$.

---

## Problem 26: Automorphisms of a Group

Let $G$ be a finite cyclic group of order $n$.

1. **(a)** Determine $\operatorname{Aut}(G)$, the group of automorphisms of $G$.

2. **(b)** Show that $\operatorname{Aut}(G) \cong \mathbb{Z}/n\mathbb{Z}^\times$.

3. **(c)** Compute $\operatorname{Aut}(G)$ for $n = 8$.

4. **(d)** Discuss the structure of the automorphism group.

**Hint:** Automorphisms are determined by mapping generators to generators.

---

## Problem 27: Group Actions and Counting Fixed Points

Let $G$ be a finite group acting on a finite set $X$, and let $p$ be a prime dividing $|G|$.

1. **(a)** Prove that the number of fixed points of elements of order $p$ is congruent to $|X|$ modulo $p$.

2. **(b)** Apply this result to $G = S_5$ acting on subsets of size $2$.

3. **(c)** Calculate the number of fixed points for a $5$-cycle in $S_5$.

4. **(d)** Discuss the implications for orbit sizes.

**Hint:** Use the Cauchy-Frobenius-Burnside Lemma and group action properties.

---

## Problem 28: Action on the Spectrum of a Ring

Let $R$ be a commutative ring with unity, and let $G$ be a finite group acting on $R$ by ring automorphisms. Consider the induced action on $\operatorname{Spec}(R)$, the set of prime ideals of $R$.

1. **(a)** Show that this defines a group action on $\operatorname{Spec}(R)$.

2. **(b)** Describe the orbits and stabilizers in this action.

3. **(c)** Discuss how the action affects the structure of $R$.

4. **(d)** Provide an example with $R = \mathbb{Z}[x]$ and $G = \mathbb{Z}/2\mathbb{Z}$.

**Hint:** Consider how automorphisms map prime ideals.

---

## Problem 29: Ideals in $\mathbb{Z}[i]$

Consider the ring $\mathbb{Z}[i]$.

1. **(a)** Describe all ideals of the form $(p)$ where $p$ is a prime number.

2. **(b)** Determine which ideals are prime ideals in $\mathbb{Z}[i]$.

3. **(c)** Discuss the factorization of primes in $\mathbb{Z}[i]$.

4. **(d)** Provide examples with $p = 2$ and $p = 5$.

**Hint:** Use properties of norms and unique factorization in $\mathbb{Z}[i]$.

---

## Problem 30: Burnside's Lemma and Symmetric Coloring

Consider coloring the squares of an $n \times n$ chessboard using $k$ colors, where colorings are considered the same if they are related by rotations and reflections (the dihedral group $D_4$).

1. **(a)** Describe the group $G$ acting on the set of colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Calculate this number explicitly for $n = 2$ and $k = 2$.

4. **(d)** Discuss the complexity of this problem for larger $n$.

**Hint:** Consider how symmetries affect the positions on the board.

---

## Problem 31: Action on Solutions to Equations

Let $G = \operatorname{Gal}(\mathbb{Q}(\sqrt{d})/\mathbb{Q})$ act on the set of solutions to the equation $x^2 - d = 0$.

1. **(a)** Describe the elements of $G$.

2. **(b)** Show that this defines a group action.

3. **(c)** Determine the orbits of the action.

4. **(d)** Discuss the significance in terms of field extensions.

**Hint:** Consider $d$ being a square-free integer.

---

## Problem 32: Group Actions on Partitions

Let $G = S_n$ act on the set of partitions of $\{1, 2, \dots, n\}$ into $k$ non-empty subsets.

1. **(a)** Prove that this defines a group action.

2. **(b)** Determine the number of orbits of this action.

3. **(c)** For $n = 4$ and $k = 2$, calculate the number of orbits.

4. **(d)** Discuss the connection to Bell numbers and Stirling numbers.

**Hint:** Consider how permutations affect partitions.

---

## Problem 33: Group Actions and Fixed Point Theorems

Let $G$ be a finite group acting on a finite set $X$.

1. **(a)** State and prove the Orbit Counting Lemma.

2. **(b)** Show that if $|G|$ is relatively prime to $|X|$, then there exists a fixed point.

3. **(c)** Apply this result to $G = \mathbb{Z}/p\mathbb{Z}$ acting on a set of size not divisible by $p$.

4. **(d)** Discuss implications for group actions in combinatorics.

**Hint:** Use group action properties and counting arguments.

---

## Problem 34: Rings of Power Series

Let $R = \mathbb{R}[[x]]$, the ring of formal power series with real coefficients.

1. **(a)** Determine the units in $R$.

2. **(b)** Show that $R$ has no zero-divisors.

3. **(c)** Prove that $R$ is a local ring.

4. **(d)** Discuss the significance of $R$ in algebraic geometry.

**Hint:** Consider the invertibility of power series.

---

## Problem 35: Group Actions on Root Systems

Let $G = \operatorname{GL}(n, \mathbb{R})$ act on the set of roots of a polynomial $f(x) \in \mathbb{R}[x]$.

1. **(a)** Define the action of $G$ on the roots.

2. **(b)** Determine the stabilizer subgroup of a root.

3. **(c)** Discuss the orbits of this action.

4. **(d)** Relate this to the symmetry group of the polynomial.

**Hint:** Consider transformations that preserve the polynomial.

---

## Problem 36: Automorphisms of Polynomial Rings

Let $R = \mathbb{C}[x, y]$.

1. **(a)** Determine all ring automorphisms of $R$ of the form $\phi(f(x, y)) = f(ax + by, cx + dy)$, where $a, b, c, d \in \mathbb{C}$.

2. **(b)** Show that the set of such automorphisms forms a group under composition.

3. **(c)** Determine the conditions on $a, b, c, d$ for $\phi$ to be an automorphism.

4. **(d)** Discuss the relation to $\operatorname{GL}(2, \mathbb{C})$.

**Hint:** Consider invertibility and the determinant of the linear transformation.

---

## Problem 37: Group Actions on Topological Spaces

Let $G = \mathbb{Z}/n\mathbb{Z}$ act on the unit circle $S^1$ in $\mathbb{C}$ by rotation: $g \cdot z = e^{2\pi i g/n} z$.

1. **(a)** Show that this defines a group action.

2. **(b)** Describe the orbits of this action.

3. **(c)** Discuss the fixed points.

4. **(d)** Relate this action to covering spaces in topology.

**Hint:** Consider the mapping of points under rotation.

---

## Problem 38: Group Actions on Vector Spaces

Let $G = \operatorname{GL}(n, \mathbb{F})$ act on the vector space $\mathbb{F}^n$.

1. **(a)** Prove that this defines a group action.

2. **(b)** Determine the stabilizer subgroup of a nonzero vector.

3. **(c)** Describe the orbits of this action.

4. **(d)** Relate this to the concept of similarity of vectors.

**Hint:** Use linear algebra concepts.

---

## Problem 39: Rings of Algebraic Integers

Let $R$ be the ring of integers in a quadratic number field $\mathbb{Q}(\sqrt{d})$.

1. **(a)** Describe the structure of $R$.

2. **(b)** Determine the units in $R$.

3. **(c)** Discuss the factorization of elements in $R$.

4. **(d)** Provide examples with $d = -1$ and $d = 5$.

**Hint:** Consider norms and fundamental units.

---

## Problem 40: Group Actions and Fixed Subrings

Let $G$ be a finite group acting on a ring $R$ by automorphisms.

1. **(a)** Define the fixed subring $R^G$.

2. **(b)** Prove that $R^G$ is a subring of $R$.

3. **(c)** Discuss the significance of $R^G$ in invariant theory.

4. **(d)** Provide an example with $R = \mathbb{C}[x]$ and $G = \mathbb{Z}/2\mathbb{Z}$.

**Hint:** Consider elements fixed under all automorphisms in $G$.

---

## Problem 41: Burnside's Lemma and Chemical Compounds

Consider counting the number of distinct chemical compounds formed by arranging $n$ identical atoms and $k$ different types of bonds, considering rotational symmetries.

1. **(a)** Model this problem using group actions.

2. **(b)** Use Burnside's Lemma to compute the number of distinct compounds.

3. **(c)** Discuss the complexity of the problem for large $n$.

4. **(d)** Relate this to combinatorial enumeration in chemistry.

**Hint:** Treat the compounds as graphs and consider automorphisms.

---

## Problem 42: Group Actions on Homogeneous Spaces

Let $G$ be a Lie group acting transitively on a manifold $M$.

1. **(a)** Prove that $M$ is a homogeneous space.

2. **(b)** Describe the stabilizer subgroup of a point.

3. **(c)** Relate $M$ to the coset space $G/H$.

4. **(d)** Provide an example with $G = \operatorname{SO}(3)$ acting on the sphere $S^2$.

**Hint:** Use concepts from differential geometry.

---

## Problem 43: Ideals in Noncommutative Rings

Consider the ring $R = M_{2 \times 2}(\mathbb{R})$.

1. **(a)** Describe all two-sided ideals of $R$.

2. **(b)** Show that the only proper two-sided ideal is $\{0\}$.

3. **(c)** Discuss why $R$ is a simple ring.

4. **(d)** Relate this to the theory of division rings.

**Hint:** Consider the structure of matrix rings.

---

## Problem 44: Group Actions on Field Extensions

Let $G = \operatorname{Gal}(L/K)$ be the Galois group of a finite field extension $L/K$.

1. **(a)** Describe the action of $G$ on $L$.

2. **(b)** Determine the fixed field $L^G$.

3. **(c)** Prove the Fundamental Theorem of Galois Theory.

4. **(d)** Provide an example with $L = \mathbb{Q}(\zeta_n)$, the $n$-th roots of unity.

**Hint:** Consider subgroups of $G$ and their corresponding fixed fields.

---

## Problem 45: Group Actions on Algebraic Varieties

Let $G$ be a finite group acting on an algebraic variety $V$.

1. **(a)** Define the quotient variety $V/G$.

2. **(b)** Discuss the properties of $V/G$.

3. **(c)** Provide an example with $V = \mathbb{C}^n$ and $G$ acting by permutation of coordinates.

4. **(d)** Relate this to symmetries in algebraic geometry.

**Hint:** Consider orbits and invariant functions.

---

## Problem 46: Group Actions and Covering Spaces

Let $G$ be a group acting properly discontinuously on a topological space $X$.

1. **(a)** Define the quotient space $X/G$.

2. **(b)** Discuss the properties of the covering map $\pi: X \rightarrow X/G$.

3. **(c)** Relate this to fundamental groups and deck transformations.

4. **(d)** Provide an example with $X = \mathbb{R}$ and $G = \mathbb{Z}$ acting by translations.

**Hint:** Use concepts from algebraic topology.

---

## Problem 47: Burnside's Lemma and Colorings on Graphs

Consider coloring the edges of a graph with $k$ colors, where colorings are considered the same if they are related by an automorphism of the graph.

1. **(a)** Describe the group $G$ acting on the set of colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Apply this to a complete graph $K_n$.

4. **(d)** Discuss the complexity for large $n$.

**Hint:** Consider symmetries and fixed colorings under automorphisms.

---

## Problem 48: Group Actions and Module Theory

Let $G$ be a group acting on a module $M$ over a ring $R$.

1. **(a)** Define the action of $G$ on $M$.

2. **(b)** Discuss the structure of the fixed submodule $M^G$.

3. **(c)** Relate this to representations of $G$.

4. **(d)** Provide an example with $G = \mathbb{Z}/2\mathbb{Z}$ and $M = \mathbb{R}^2$.

**Hint:** Use module homomorphisms and invariance under group action.

---

## Problem 49: Ideals in Polynomial Rings over Fields

Let $R = \mathbb{F}[x]$, where $\mathbb{F}$ is a field.

1. **(a)** Show that $R$ is a principal ideal domain.

2. **(b)** Determine all ideals in $R$.

3. **(c)** Discuss the factorization of polynomials in $R$.

4. **(d)** Relate this to the concept of irreducibility over fields.

**Hint:** Use the Division Algorithm for polynomials.

---

## Problem 50: Group Actions on Function Spaces

Let $G$ be a finite group acting on a function space $F(X, \mathbb{R})$, where $X$ is a finite set.

1. **(a)** Define the action of $G$ on $F$.

2. **(b)** Determine the fixed point space $F^G$.

3. **(c)** Discuss the dimension of $F^G$.

4. **(d)** Provide an example with $G = S_n$ acting on functions on $X = \{1, 2, \dots, n\}$.

**Hint:** Consider functions invariant under permutations.

---

**End of Practice Problems**
# Advanced Problems on the Orbit-Stabilizer Theorem

---

**Instructions:**

- Provide detailed solutions for each problem.
- Use the Orbit-Stabilizer Theorem where appropriate.
- These problems are challenging and may involve multiple concepts.
- Mathematical expressions are enclosed within `$...$` for inline math and `$$...$$` for display math.

---

## Problem 1: Action of $S_n$ on $k$-Element Subsets

Let $G = S_n$, the symmetric group on $n$ elements, act on the set $X$ of all $k$-element subsets of $\{1, 2, \dots, n\}$ by permutation.

1. **(a)** Determine the size of $X$.

2. **(b)** For a fixed subset $A \subseteq \{1, 2, \dots, n\}$ with $|A| = k$, compute the stabilizer subgroup $\operatorname{Stab}_G(A)$.

3. **(c)** Calculate the size of the orbit $\operatorname{Orb}_G(A)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem for this action.

**Hint:** The stabilizer of $A$ consists of permutations that fix $A$ setwise.

---

## Problem 2: Action on Ordered Pairs

Let $G = S_n$ act on the set $X = \{ (i, j) \mid 1 \leq i \neq j \leq n \}$ by permutation: for $\sigma \in G$, $\sigma \cdot (i, j) = (\sigma(i), \sigma(j))$.

1. **(a)** Determine the size of $X$.

2. **(b)** For a fixed pair $(i, j)$, find the stabilizer subgroup $\operatorname{Stab}_G((i, j))$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G((i, j))$.

4. **(d)** Verify the Orbit-Stabilizer Theorem for this action.

**Hint:** Consider permutations that fix or swap specific elements.

---

## Problem 3: Action on Functions

Let $G = S_n$ act on the set $X$ of functions from $\{1, 2, \dots, n\}$ to a finite set $A$ with $k$ elements, via $(\sigma \cdot f)(i) = f(\sigma^{-1}(i))$.

1. **(a)** Prove that this defines a group action.

2. **(b)** For a fixed function $f \in X$, determine the stabilizer subgroup $\operatorname{Stab}_G(f)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(f)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** The stabilizer depends on the values of $f$.

---

## Problem 4: Action on Cosets

Let $G$ be a finite group and $H$ a subgroup of $G$. Consider the action of $G$ on the set of left cosets $G/H$ by left multiplication.

1. **(a)** Show that the action is transitive.

2. **(b)** For a fixed coset $gH$, find the stabilizer subgroup $\operatorname{Stab}_G(gH)$.

3. **(c)** Verify that $|\operatorname{Stab}_G(gH)| = |H|$.

4. **(d)** Use the Orbit-Stabilizer Theorem to confirm that $|G| = |\operatorname{Orb}(gH)| \cdot |\operatorname{Stab}_G(gH)|$.

**Hint:** The stabilizer of $gH$ consists of elements in $G$ such that $gh = g$ for some $h \in H$.

---

## Problem 5: Action by Conjugation

Let $G$ be a finite group acting on itself by conjugation: $g \cdot x = gxg^{-1}$.

1. **(a)** Prove that this defines a group action.

2. **(b)** For a fixed element $x \in G$, determine the stabilizer subgroup $\operatorname{Stab}_G(x)$.

3. **(c)** Show that $\operatorname{Stab}_G(x)$ is the centralizer $C_G(x)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the size of the conjugacy class of $x$ to $|G|$.

**Hint:** The orbit of $x$ under conjugation is its conjugacy class.

---

## Problem 6: Action on $n$-Tuples

Let $G = S_n$ act on the set $X = \{ (a_1, a_2, \dots, a_n) \mid a_i \in \{1, 2\} \}$ by permutation of indices: $\sigma \cdot (a_1, a_2, \dots, a_n) = (a_{\sigma^{-1}(1)}, a_{\sigma^{-1}(2)}, \dots, a_{\sigma^{-1}(n)})$.

1. **(a)** Determine the size of $X$.

2. **(b)** For a fixed $n$-tuple $\mathbf{a} \in X$, find the stabilizer subgroup $\operatorname{Stab}_G(\mathbf{a})$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(\mathbf{a})$.

4. **(d)** Verify the Orbit-Stabilizer Theorem.

**Hint:** The stabilizer consists of permutations preserving the positions of specific values.

---

## Problem 7: Action on Diagonal Matrices

Let $G = GL_n(\mathbb{F})$ act on the set $X$ of diagonal $n \times n$ invertible matrices over a field $\mathbb{F}$ by conjugation: $g \cdot D = g D g^{-1}$.

1. **(a)** Show that this defines a group action.

2. **(b)** For a fixed diagonal matrix $D$, determine the stabilizer subgroup $\operatorname{Stab}_G(D)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(D)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** Conjugation by $g$ permutes the eigenvalues of $D$.

---

## Problem 8: Action on Polynomials

Let $G = \operatorname{Gal}(\mathbb{Q}(\sqrt{d})/\mathbb{Q})$ act on the set of polynomials in $\mathbb{Q}[x]$ by acting on the coefficients.

1. **(a)** Describe the elements of $G$.

2. **(b)** For a polynomial $f(x) \in \mathbb{Q}[x]$, determine the stabilizer subgroup $\operatorname{Stab}_G(f(x))$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(f(x))$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** Consider whether $f(x)$ is fixed under the action.

---

## Problem 9: Action on Latin Squares

Let $G = S_n$ act on the set $X$ of Latin squares of order $n$ by permuting the symbols.

1. **(a)** Define the action explicitly.

2. **(b)** For a fixed Latin square $L \in X$, determine the stabilizer subgroup $\operatorname{Stab}_G(L)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(L)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** Consider permutations that map the Latin square to itself.

---

## Problem 10: Action on Partitions

Let $G = S_n$ act on the set $X$ of partitions of $\{1, 2, \dots, n\}$ into $k$ non-empty subsets by permutation.

1. **(a)** Show that this defines a group action.

2. **(b)** For a fixed partition $P \in X$, determine the stabilizer subgroup $\operatorname{Stab}_G(P)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(P)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem.

**Hint:** The stabilizer consists of permutations preserving the partition.

---

## Problem 11: Action on Polynomial Roots

Let $G = \operatorname{Gal}(\mathbb{Q}(\alpha)/\mathbb{Q})$, where $\alpha$ is a root of an irreducible polynomial $f(x) \in \mathbb{Q}[x]$, act on the set of roots of $f(x)$.

1. **(a)** Describe the action of $G$ on the roots.

2. **(b)** For a fixed root $\beta$, determine the stabilizer subgroup $\operatorname{Stab}_G(\beta)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(\beta)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate $|\operatorname{Orb}_G(\beta)|$ to the degree of the field extension.

**Hint:** Consider the field automorphisms fixing $\mathbb{Q}$.

---

## Problem 12: Action on Bilinear Forms

Let $G = GL_n(\mathbb{R})$ act on the set $X$ of non-degenerate symmetric bilinear forms on $\mathbb{R}^n$ by $g \cdot B(v, w) = B(g^{-1}v, g^{-1}w)$.

1. **(a)** Show that this defines a group action.

2. **(b)** For a fixed bilinear form $B$, determine the stabilizer subgroup $\operatorname{Stab}_G(B)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(B)$.

4. **(d)** Relate the orbit to the classification of bilinear forms.

**Hint:** Consider the orthogonal group as the stabilizer.

---

## Problem 13: Action on Group Homomorphisms

Let $G$ be a finite group, and let $H$ be a subgroup of $G$. Consider the action of $G$ on the set $\operatorname{Hom}(H, \mathbb{C}^\times)$ of group homomorphisms from $H$ to $\mathbb{C}^\times$ by conjugation: $(g \cdot \chi)(h) = \chi(g^{-1} h g)$.

1. **(a)** Show that this defines a group action.

2. **(b)** For a fixed character $\chi$, determine the stabilizer subgroup $\operatorname{Stab}_G(\chi)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(\chi)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** Consider how conjugation affects homomorphisms.

---

## Problem 14: Action on Left Transversals

Let $G$ be a finite group and $H$ a subgroup. A left transversal of $H$ in $G$ is a subset $T \subset G$ such that each left coset $gH$ contains exactly one element of $T$. Let $G$ act on the set of left transversals by left multiplication.

1. **(a)** Show that this defines a group action.

2. **(b)** For a fixed transversal $T$, determine the stabilizer subgroup $\operatorname{Stab}_G(T)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(T)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem.

**Hint:** The action may not be transitive.

---

## Problem 15: Action on Incidence Structures

Let $G = S_n$ act on the set of lines in a finite projective plane of order $n$ by permutation of coordinates.

1. **(a)** Define the action explicitly.

2. **(b)** For a fixed line $L$, determine the stabilizer subgroup $\operatorname{Stab}_G(L)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(L)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** Consider the symmetries of the projective plane.

---

## Problem 16: Action on Integer Vectors

Let $G = GL_n(\mathbb{Z})$ act on the set $X = \mathbb{Z}^n \setminus \{0\}$ by matrix multiplication.

1. **(a)** Prove that this defines a group action.

2. **(b)** For a fixed vector $v \in X$, determine the stabilizer subgroup $\operatorname{Stab}_G(v)$.

3. **(c)** Describe the orbit $\operatorname{Orb}_G(v)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** The stabilizer of $v$ is related to the automorphisms of the lattice generated by $v$.

---

## Problem 17: Action on Subspaces

Let $G = GL_n(\mathbb{F})$ act on the set of $k$-dimensional subspaces of $\mathbb{F}^n$.

1. **(a)** Show that this defines a group action.

2. **(b)** For a fixed subspace $V$, determine the stabilizer subgroup $\operatorname{Stab}_G(V)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(V)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem.

**Hint:** The stabilizer is the set of invertible linear transformations that fix $V$.

---

## Problem 18: Action on Root Systems

Let $G$ be the Weyl group associated with a root system $\Phi$ in $\mathbb{R}^n$, acting on $\Phi$ by reflection.

1. **(a)** Define the action of $G$ on $\Phi$.

2. **(b)** For a fixed root $\alpha \in \Phi$, determine the stabilizer subgroup $\operatorname{Stab}_G(\alpha)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(\alpha)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** Consider the symmetries of the root system.

---

## Problem 19: Action on Group Extensions

Let $G$ be a finite group acting on the set of group extensions of a normal subgroup $N$ by $G/N$.

1. **(a)** Describe the action of $G$ on the extensions.

2. **(b)** For a fixed extension, determine the stabilizer subgroup $\operatorname{Stab}_G(E)$.

3. **(c)** Compute the size of the orbit $\operatorname{Orb}_G(E)$.

4. **(d)** Discuss the application of the Orbit-Stabilizer Theorem in this context.

**Hint:** Group extensions can be classified up to equivalence under $G$.

---

## Problem 20: Action on Lattices in $\mathbb{R}^n$

Let $G = GL_n(\mathbb{Z})$ act on the set $X$ of lattices in $\mathbb{R}^n$ by $g \cdot L = g(L)$.

1. **(a)** Show that this defines a group action.

2. **(b)** For a fixed lattice $L$, determine the stabilizer subgroup $\operatorname{Stab}_G(L)$.

3. **(c)** Describe the orbit $\operatorname{Orb}_G(L)$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes.

**Hint:** The stabilizer consists of automorphisms of the lattice.

---

**End of Problems**
# Advanced Problems on Burnside's Lemma

---

**Instructions:**

- Provide detailed solutions for each problem.
- Use Burnside's Lemma where appropriate.
- These problems are challenging and may involve multiple concepts.
- Mathematical expressions are enclosed within `$...$` for inline math and `$$...$$` for display math.

---

## Problem 1: Coloring Vertices of a Cube

Consider coloring the vertices of a cube using $n$ colors, where two colorings are considered the same if they can be obtained from one another by a rotation (ignore reflections).

1. **(a)** Determine the rotation group $G$ acting on the cube and its order.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 3$.

4. **(d)** Determine the number of colorings fixed by a $90^\circ$ rotation around an axis through the centers of two opposite faces.

**Hint:** Identify the types of rotations and compute fixed colorings for each.

---

## Problem 2: Coloring Edges of a Regular Octahedron

Consider coloring the edges of a regular octahedron using $k$ colors, up to rotational symmetries.

1. **(a)** Describe the rotation group $G$ acting on the octahedron.

2. **(b)** Determine the number of elements in $G$.

3. **(c)** Use Burnside's Lemma to compute the number of distinct colorings.

4. **(d)** Calculate this number explicitly for $k = 2$.

**Hint:** The rotation group of the octahedron is isomorphic to $S_4$.

---

## Problem 3: Coloring Faces of a Dodecahedron

Consider coloring the faces of a regular dodecahedron using $n$ colors, where colorings are considered the same under rotational symmetries.

1. **(a)** Determine the rotation group $G$ acting on the dodecahedron and its order.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 4$.

4. **(d)** Determine the number of colorings fixed by a rotation of $72^\circ$ around an axis through the centers of two opposite faces.

**Hint:** The rotation group of the dodecahedron is isomorphic to the alternating group $A_5$.

---

## Problem 4: Coloring Beads on a Necklace with Reflections

Consider a necklace with $n$ beads, each bead colored using $k$ colors. Two necklaces are considered the same if they can be obtained from one another by rotation or reflection (the action of the dihedral group $D_n$).

1. **(a)** Describe the group $G$ acting on the necklaces.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct necklaces.

3. **(c)** Compute this number explicitly for $n = 6$ and $k = 3$.

4. **(d)** Compare the result with the number of necklaces without considering reflections.

**Hint:** Consider both rotations and reflections when computing fixed colorings.

---

## Problem 5: Coloring the Squares of a Chessboard

Consider coloring the squares of an $n \times n$ chessboard using $k$ colors, where colorings are considered the same if they are related by rotations and reflections (the dihedral group $D_4$).

1. **(a)** For $n = 4$, describe the group $G$ acting on the colorings and its order.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Calculate this number explicitly for $k = 2$.

4. **(d)** Determine the number of colorings fixed by a $90^\circ$ rotation.

**Hint:** Consider the action of $D_4$ on the squares of the chessboard.

---

## Problem 6: Coloring Vertices of a Prism

Consider a regular $n$-sided prism, and suppose we color its vertices using $k$ colors. Two colorings are considered the same if they can be obtained from one another by a rotation or reflection (the dihedral group $D_n$).

1. **(a)** Describe the group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 5$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by a reflection through a plane perpendicular to the base.

**Hint:** Analyze the symmetries of the prism and their effect on the vertices.

---

## Problem 7: Coloring Edges of a Complete Graph

Consider the complete graph $K_n$ with $n$ vertices. We want to color its edges using $k$ colors, considering two colorings the same if they can be transformed into one another by any permutation of the vertices (the action of $S_n$).

1. **(a)** Describe the group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 4$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by a transposition (a swap of two vertices).

**Hint:** Consider the action of $S_n$ on the edges of $K_n$.

---

## Problem 8: Coloring the Faces of a Tetrahedron with Patterns

Consider coloring the faces of a regular tetrahedron using patterns (e.g., stripes, dots) instead of colors. Suppose there are $k$ distinct patterns. Two colorings are considered the same if one can be obtained from another by a rotation (ignore reflections).

1. **(a)** Describe the rotation group $G$ acting on the tetrahedron and its order.

2. **(b)** Use Burnside's Lemma to compute the number of distinct pattern colorings.

3. **(c)** Compute this number explicitly for $k = 3$.

4. **(d)** Determine the number of colorings fixed by a $120^\circ$ rotation around an axis through a vertex and the center of the opposite face.

**Hint:** Similar to coloring with colors, but patterns might have orientations.

---

## Problem 9: Coloring Squares on a Rubik's Cube

Consider coloring the small squares on a face of a Rubik's cube using $n$ colors, where each face has a $3 \times 3$ grid (excluding the center square, which remains fixed). Two colorings are considered the same if they can be obtained from one another by rotations of the cube (ignore reflections).

1. **(a)** Determine the rotation group $G$ acting on the cube and its order.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 2$.

4. **(d)** Determine the number of colorings fixed by a $180^\circ$ rotation around an axis through the centers of two opposite faces.

**Hint:** Consider how the rotations permute the small squares.

---

## Problem 10: Coloring Points on a Circle

Consider $n$ equally spaced points on a circle, and we color each point using $k$ colors. Two colorings are considered the same if they can be obtained from one another by rotation (the cyclic group $C_n$).

1. **(a)** Describe the group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 8$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by a rotation of $45^\circ$.

**Hint:** For each rotation, compute the number of colorings fixed by that rotation.

---

## Problem 11: Coloring Tiles in a Mosaic

Consider a mosaic made of $n$ identical tiles arranged in a circle, and we have $k$ different colors to color each tile. Two colorings are considered the same if they can be obtained from one another by rotation or reflection (the dihedral group $D_n$).

1. **(a)** Describe the group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to determine the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 7$ and $k = 3$.

4. **(d)** Determine the number of colorings fixed by a reflection over an axis of symmetry.

**Hint:** Be careful with odd $n$ when considering reflections.

---

## Problem 12: Coloring the Sides of a Pyramid

Consider a square-based pyramid, and suppose we color its sides (4 triangular sides and 1 square base) using $k$ colors. Two colorings are considered the same if they can be obtained from one another by a rotation or reflection.

1. **(a)** Describe the symmetry group $G$ acting on the pyramid.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $k = 2$.

4. **(d)** Determine the number of colorings fixed by a rotation of $180^\circ$ around an axis through the apex and the center of the base.

**Hint:** Analyze the action of rotations and reflections on the sides.

---

## Problem 13: Coloring the Faces of a Regular Icosahedron

Consider coloring the faces of a regular icosahedron using $n$ colors, where colorings are considered the same under rotational symmetries.

1. **(a)** Determine the rotation group $G$ acting on the icosahedron and its order.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 5$.

4. **(d)** Determine the number of colorings fixed by a rotation of $120^\circ$ around an axis through two opposite vertices.

**Hint:** The rotation group of the icosahedron is isomorphic to $A_5$.

---

## Problem 14: Coloring Nodes of a Hypercube

Consider a $4$-dimensional hypercube (tesseract), and suppose we color its vertices using $k$ colors. Two colorings are considered the same if they can be obtained from one another by a rotation of the hypercube (ignore reflections).

1. **(a)** Describe the rotation group $G$ acting on the hypercube.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $k = 2$.

4. **(d)** Determine the number of colorings fixed by a specific rotation (describe one).

**Hint:** High-dimensional rotation groups can be complex; consider the symmetry operations.

---

## Problem 15: Coloring Permutations

Consider the set of permutations of $n$ elements, and we color each permutation using $k$ colors based on its cycle type. Two colorings are considered the same if they can be obtained from one another by conjugation in $S_n$.

1. **(a)** Describe the action of $G = S_n$ on the set of colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 3$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by a specific conjugation (e.g., conjugation by a transposition).

**Hint:** The conjugacy classes correspond to cycle types.

---

## Problem 16: Coloring Arrangements of Molecules

Consider different ways of arranging $n$ identical molecules in a ring, where each molecule can be in one of $k$ different orientations. Two arrangements are considered the same if they can be obtained from one another by rotation or reflection.

1. **(a)** Describe the group $G$ acting on the arrangements.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct arrangements.

3. **(c)** Compute this number explicitly for $n = 5$ and $k = 3$.

4. **(d)** Determine the number of arrangements fixed by a rotation of $360^\circ / 5$.

**Hint:** Similar to necklace counting, but with orientations.

---

## Problem 17: Coloring Seats in a Round Table

Consider a round table with $n$ seats, and we assign one of $k$ different people to each seat (each person can be assigned multiple times). Two seatings are considered the same if they can be obtained from one another by rotation.

1. **(a)** Describe the group $G$ acting on the seatings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct seatings.

3. **(c)** Compute this number explicitly for $n = 4$ and $k = 2$.

4. **(d)** Determine the number of seatings fixed by a rotation of $90^\circ$.

**Hint:** Unlike necklaces, people can repeat; consider the action on multisets.

---

## Problem 18: Coloring Squares in a Grid with Torus Symmetry

Consider a toroidal grid of size $n \times n$ (the grid "wraps around" both horizontally and vertically), and we color each square using $k$ colors. Two colorings are considered the same if they can be obtained from one another by translations (the action of the group $\mathbb{Z}_n \times \mathbb{Z}_n$).

1. **(a)** Describe the group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 3$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by a translation of $(1,1)$.

**Hint:** The group action is given by shifts in both directions.

---

## Problem 19: Coloring Faces of a Hypercube

Consider a $3$-dimensional cube (regular cube), and we color its faces using $k$ colors. Two colorings are considered the same if they can be obtained from one another by a rotation (ignore reflections).

1. **(a)** Determine the rotation group $G$ acting on the cube and its order.

2. **(b)** Use Burnside's Lemma to compute the number of distinct face colorings.

3. **(c)** Compute this number explicitly for $k = 3$.

4. **(d)** Determine the number of colorings fixed by a rotation of $180^\circ$ around an axis through the centers of opposite edges.

**Hint:** The cube has multiple types of rotational symmetries.

---

## Problem 20: Coloring Sides of a Möbius Strip

Consider a Möbius strip made from a rectangular strip of paper with $n$ segments, where each segment can be colored using $k$ colors. Two colorings are considered the same if they can be transformed into one another by moving along the strip (accounting for the twist).

1. **(a)** Describe the symmetry group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 4$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by the symmetry operation corresponding to moving halfway around the strip.

**Hint:** The Möbius strip has a non-orientable surface, affecting the symmetry group.

---

**End of Problems**


