---
title: Abstract Algebra- Basic problems for MT2
date: 2024-11-02 16:52:43
tags:
mathjax: true
cover: "/images/2024-11-12-1.jpeg"
categories: Math113-Abstract Algebra
---

**Instructions:**

- Provide clear and complete reasoning for every problem.
- Use results from lectures and notes provided, referencing definitions where appropriate.
- The problems are divided into **six parts**, each focusing on specific topics covered in the notes.
- Mathematical expressions are enclosed within `$...$` for inline math and `$$...$$` for display math.
- **Total of 30 problems** are provided, each with meaningful content and appropriate difficulty.

---

## Part I: Group Actions and Permutations

### Problem 1: Orbits and Stabilizers in Symmetric Groups

Let $G = S_4$, the symmetric group on 4 elements, act on the set $X = \{1, 2, 3, 4\}$ by permutation.

1. **(a)** For the element $x = 1$, determine the orbit $\operatorname{Orb}_G(1)$ under the action of $G$.

2. **(b)** Compute the stabilizer subgroup $\operatorname{Stab}_G(1)$.

3. **(c)** Calculate the sizes of $\operatorname{Orb}_G(1)$ and $\operatorname{Stab}_G(1)$, and verify the Orbit-Stabilizer Theorem.

**Hint:** Use the definitions of orbit and stabilizer, and recall that $|G| = 24$.

---

### Problem 2: Group Action on Subsets

Let $G = S_4$ act on the set $X$ of all 2-element subsets of $\{1, 2, 3, 4\}$ by permutation.

1. **(a)** How many elements are in $X$?

2. **(b)** For the subset $\{1, 2\}$, determine its orbit under the action of $G$.

3. **(c)** Find the stabilizer subgroup $\operatorname{Stab}_G(\{1, 2\})$ and compute its order.

4. **(d)** Verify the Orbit-Stabilizer Theorem for this action.

**Hint:** Consider how permutations affect subsets and calculate accordingly.

---

### Problem 3: Orbits in Group Actions

Let $G$ be the subgroup of $S_4$ consisting of all permutations that fix the element $4$ (i.e., $G = \operatorname{Stab}_{S_4}(4)$).

1. **(a)** Describe all elements of $G$.

2. **(b)** Determine the orbits of $G$ acting on $X = \{1, 2, 3, 4\}$.

3. **(c)** Find the orbit of $x = 2$ and compute the size of $\operatorname{Orb}_G(2)$.

**Hint:** Use the fact that permutations in $G$ fix $4$ and permute the other elements.

---

### Problem 4: Group Actions and Equivalence Relations

Let a group $G$ act on a set $X$. Define a relation $\sim$ on $X$ by $x \sim y$ if there exists $g \in G$ such that $g \cdot x = y$.

1. **(a)** Prove that $\sim$ is an equivalence relation.

2. **(b)** Show that the equivalence classes under $\sim$ are precisely the orbits of $G$ on $X$.

**Hint:** Verify the properties of reflexivity, symmetry, and transitivity using the group action.

---

### Problem 5: Orbit-Stabilizer Theorem Application

Let $G = S_5$ act on $X = \{ (i, j) \mid i, j \in \{1, 2, 3,4,5\}, i \neq j \}$ by permutation: $\sigma \cdot (i, j) = (\sigma(i), \sigma(j))$.

1. **(a)** Determine the size of $X$.

2. **(b)** For the element $(1, 2) \in X$, find $\operatorname{Stab}_G((1, 2))$.

3. **(c)** Compute $|\operatorname{Orb}_G((1, 2))|$ and verify the Orbit-Stabilizer Theorem.

**Hint:** Consider the action of $S_3$ on ordered pairs.

---

## Part II: Definitions and Equivalence of Group Actions

### Problem 6: Group Actions via Homomorphisms

1. **(a)** Define what it means for a group $G$ to act on a set $X$ via a function $\Phi: G \times X \rightarrow X$.

2. **(b)** Show that this action defines, for each $g \in G$, a bijection $\Phi_g: X \rightarrow X$.

3. **(c)** Prove that the map $\phi: G \rightarrow \operatorname{Sym}(X)$ defined by $\phi(g) = \Phi_g$ is a group homomorphism.

**Hint:** Use the properties of the group action and the composition of functions.

---

### Problem 7: Equivalence of Definitions

1. **(a)** Show that any group homomorphism $\phi: G \rightarrow \operatorname{Sym}(X)$ defines a group action of $G$ on $X$ via $\Phi(g, x) = \phi(g)(x)$.

2. **(b)** Prove that the two definitions of group action (via $\Phi$ and via $\phi$) are equivalent.

**Hint:** Construct the correspondence between $\Phi$ and $\phi$ explicitly.

---

### Problem 8: Kernels of Group Actions

Let $G$ act on a set $X$, and let $\phi: G \rightarrow \operatorname{Sym}(X)$ be the associated homomorphism.

1. **(a)** Define the kernel of the action, $\ker \phi$.

2. **(b)** Prove that $\ker \phi = \{ g \in G \mid g \cdot x = x, \forall x \in X \}$.

3. **(c)** Show that $\ker \phi$ is a normal subgroup of $G$.

**Hint:** Use the properties of group homomorphisms.

---

### Problem 9: Faithful Group Actions

1. **(a)** Define what it means for a group action to be faithful.

2. **(b)** Prove that the action is faithful if and only if $\ker \phi = \{ e \}$, where $e$ is the identity in $G$.

3. **(c)** Give an example of a faithful and a non-faithful group action.

**Hint:** Consider the effect of elements in $G$ on $X$.

---

### Problem 10: Left Regular Action Example

Let $G = \mathbb{Z}/4\mathbb{Z}$ act on itself via the left regular action.

1. **(a)** Describe explicitly how the left regular action is defined for $G$.

2. **(b)** Write down the permutation representation of $G$ corresponding to this action.

3. **(c)** Show that this action is faithful.

**Hint:** The left regular action is given by $g \cdot h = g + h \mod 4$.

---

## Part III: Left Regular Action and Cayley's Theorem

### Problem 11: Cayley's Theorem Proof

1. **(a)** State Cayley's Theorem.

2. **(b)** Provide a detailed proof of Cayley's Theorem using the left regular action.

**Hint:** Show that the mapping from $G$ to $\operatorname{Sym}(G)$ via the left regular action is an injective homomorphism.

---

### Problem 12: Left Regular Action of a Non-Abelian Group

Let $G$ be the symmetric group $S_3$.

1. **(a)** Describe the left regular action of $G$ on itself.

2. **(b)** Write down the permutation matrices corresponding to the action.

3. **(c)** Show that $G$ is isomorphic to a subgroup of $\operatorname{Sym}(6)$.

**Hint:** Since $|G| = 6$, the left regular action maps $G$ into $\operatorname{Sym}(6)$.

---

### Problem 13: Kernel of Left Regular Action

Let $G$ be any group acting on itself by left multiplication.

1. **(a)** Determine the kernel of this action.

2. **(b)** Conclude whether the action is faithful.

**Hint:** Consider whether any non-identity element fixes all elements under left multiplication.

---

### Problem 14: Action of $Z/nZ$ on Itself

Let $G = \mathbb{Z}/n\mathbb{Z}$, and define an action of $G$ on itself by $k \cdot m = k + m \mod n$.

1. **(a)** Is this action faithful?

2. **(b)** Find the associated homomorphism $\phi: G \rightarrow \operatorname{Sym}(G)$.

3. **(c)** Determine the kernel of $\phi$.

**Hint:** Analyze whether different elements of $G$ induce different permutations.

---

### Problem 15: Cayley's Theorem Application

Let $G = D_4$, the dihedral group of order 8.

1. **(a)** Describe the elements of $G$.

2. **(b)** Use the left regular action to embed $G$ into $\operatorname{Sym}(8)$.

3. **(c)** Show that this embedding is injective.

**Hint:** Consider the permutations of $G$ induced by left multiplication.

---

## Part IV: Burnside's Lemma and Counting Colorings

### Problem 16: Burnside's Lemma Statement and Proof

1. **(a)** State Burnside's Lemma.

2. **(b)** Provide a proof of Burnside's Lemma using double counting.

**Hint:** Count the number of pairs $(g, x)$ such that $g \cdot x = x$.

---

### Problem 17: Coloring Vertices of a Square

Consider coloring the vertices of a square using $n$ colors, where two colorings are considered the same if one can be obtained from the other by a rotation or reflection (the action of $D_4$).

1. **(a)** Determine the group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 2$.

**Hint:** For each element $g \in G$, find the number of colorings fixed by $g$.

---

### Problem 18: Coloring Edges of a Cube

Consider coloring the edges of a cube using $n$ colors, up to rotational symmetries.

1. **(a)** Describe the rotation group $G$ acting on the cube.

2. **(b)** Determine the number of elements in $G$.

3. **(c)** Use Burnside's Lemma to find the number of distinct colorings when $n = 3$.

**Hint:** Identify the types of rotations and calculate fixed colorings.

---

### Problem 19: Coloring with Cyclic Group Actions

Consider a necklace with $n$ beads, and $G = \mathbb{Z}/n\mathbb{Z}$ acting by rotation.

1. **(a)** Describe the action of $G$ on the set of colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings with $k$ colors.

3. **(c)** Calculate this number explicitly for $n = 5$ and $k = 2$.

**Hint:** For each rotation, determine the number of colorings it fixes.

---

### Problem 20: Fixed Points under Group Action

Let $G$ act on a finite set $X$, and suppose that for every $g \in G$, the number of fixed points $|X_g|$ is known.

1. **(a)** Use Burnside's Lemma to compute the number of orbits of $G$ on $X$.

2. **(b)** If $|G| = 6$ and $|X_g| = 2$ for all $g \neq e$, and $|X_e| = 12$, find the number of orbits.

**Hint:** Apply the formula from Burnside's Lemma.

---

## Part V: Rings, Fields, Units, and Zero-Divisors

### Problem 21: Units and Zero-Divisors in Rings

1. **(a)** Define a unit and a zero-divisor in a ring $R$.

2. **(b)** Prove that in any ring $R$, the set of units and the set of zero-divisors (excluding zero) are disjoint.

3. **(c)** Provide an example of a ring where elements are neither units nor zero-divisors.

**Hint:** Consider the ring $\mathbb{Z}$ and its elements.

---

### Problem 22: Units in Finite Rings

Let $R = \mathbb{Z}/6\mathbb{Z}$.

1. **(a)** List all units in $R$.

2. **(b)** List all zero-divisors in $R$.

3. **(c)** Verify that $R$ consists of units, zero-divisors, and zero.

**Hint:** An element $[a]$ is a unit if $\gcd(a, 6) = 1$.

---

### Problem 23: Units in Gaussian Integers

Consider the ring $R = \mathbb{Z}[i]$ of Gaussian integers.

1. **(a)** Define what it means for an element to be a unit in $R$.

2. **(b)** Find all units in $R$.

3. **(c)** Prove that $2 + 3i$ is not a unit in $R$.

**Hint:** Use the norm $N(a + bi) = a^2 + b^2$.

---

### Problem 24: Zero-Divisors in Rings

1. **(a)** Give an example of an infinite ring with zero-divisors.

2. **(b)** Show that in the ring $M_{2 \times 2}(\mathbb{R})$, there exist zero-divisors.

3. **(c)** Provide an explicit example of two non-zero matrices $A$ and $B$ such that $AB = 0$.

**Hint:** Consider matrices where the product results in the zero matrix.

---

### Problem 25: Division Algorithm in $\mathbb{Z}$

1. **(a)** State the Division Algorithm in $\mathbb{Z}$.

2. **(b)** Given integers $a = 123$ and $b = 17$, find integers $q$ and $r$ such that $a = bq + r$ and $0 \leq r < |b|$.

3. **(c)** Verify that the values of $q$ and $r$ satisfy the conditions.

**Hint:** Perform integer division and find the remainder.

---

### Problem 26: Division Algorithm in $\mathbb{Z}[x]$

1. **(a)** State the Division Algorithm for polynomials in $\mathbb{Z}[x]$.

2. **(b)** Divide $f(x) = 2x^3 - 3x^2 + x - 5$ by $g(x) = x - 2$ and find the quotient and remainder.

3. **(c)** Verify that the degree of the remainder is less than the degree of $g(x)$.

**Hint:** Be careful with integer coefficients during polynomial division.

---

### Problem 27: Division Algorithm in $\mathbb{Z}[i]$

Let $x = 7 + 5i$ and $y = 1 + 2i$ in $\mathbb{Z}[i]$.

1. **(a)** Use the Division Algorithm in $\mathbb{Z}[i]$ to find $q$ and $r$ such that $x = yq + r$ with $N(r) < N(y)$.

2. **(b)** Compute the norm of $r$ and verify the inequality.

3. **(c)** Show all steps of your calculation.

**Hint:** Find the closest Gaussian integer to $\frac{x}{y}$.

---

### Problem 28: Units and Zero-Divisors in $\mathbb{Z}/n\mathbb{Z}$

Let $n$ be a positive integer.

1. **(a)** Describe the units in the ring $\mathbb{Z}/n\mathbb{Z}$.

2. **(b)** Explain why $[a]$ is a zero-divisor in $\mathbb{Z}/n\mathbb{Z}$ if $\gcd(a, n) \neq 1$ and $a \neq 0$.

3. **(c)** For $n = 8$, list all units and zero-divisors in $\mathbb{Z}/8\mathbb{Z}$.

**Hint:** Use properties of modular arithmetic.

---

### Problem 29: Units in Polynomial Rings over Fields

Let $R = \mathbb{Q}[x]$, the ring of polynomials with rational coefficients.

1. **(a)** Determine all units in $R$.

2. **(b)** Is the polynomial $2$ a unit in $R$? Justify your answer.

3. **(c)** Explain why polynomials of degree zero are units if they are non-zero.

**Hint:** Units in $R$ are the invertible elements under multiplication.

---

### Problem 30: Non-Commutative Rings and Units

Consider the ring $R = M_{2 \times 2}(\mathbb{R})$.

1. **(a)** Determine the units in $R$.

2. **(b)** Explain why $R$ is non-commutative.

3. **(c)** Is every non-zero element of $R$ either a unit or a zero-divisor? Justify your answer.

**Hint:** Recall that invertible matrices have non-zero determinants.

# Midterm 2 Practice Problems: Division Algorithm/GCD of Polynomials and Burnside's Lemma

---

**Instructions:**

- Provide clear and complete reasoning for every problem.
- Use results from lectures and the provided notes, referencing definitions where appropriate.
- The problems are designed to be challenging and integrate multiple concepts from your course.
- Mathematical expressions are enclosed within `$...$` for inline math and `$$...$$` for display math.
- Each section contains **10 problems** focused on the specified topic.
- Problems are intended to be comprehensive and computationally intensive, suitable for exam preparation.

---

## Part I: Division Algorithm and GCD of Polynomials

### Problem 1: Division Algorithm in $\mathbb{Q}[x]$

Let $f(x) = x^5 - 2x^3 + x - 1$ and $g(x) = x^2 - x + 1$ in $\mathbb{Q}[x]$.

1. **(a)** Use the Division Algorithm to divide $f(x)$ by $g(x)$, and find the quotient $q(x)$ and remainder $r(x)$.

2. **(b)** Verify that $f(x) = q(x)g(x) + r(x)$.

3. **(c)** Determine the degrees of $q(x)$ and $r(x)$.

**Hint:** Be careful with polynomial long division involving rational coefficients.

---

### Problem 2: Euclidean Algorithm in $\mathbb{Z}[x]$

Let $f(x) = 2x^4 - 3x^3 + x^2 - 5x + 2$ and $g(x) = x^3 - 2x^2 + x - 1$ in $\mathbb{Z}[x]$.

1. **(a)** Use the Euclidean Algorithm to compute the greatest common divisor $\gcd(f(x), g(x))$.

2. **(b)** Express $\gcd(f(x), g(x))$ as a linear combination of $f(x)$ and $g(x)$.

3. **(c)** Determine whether $f(x)$ and $g(x)$ are coprime.

**Hint:** Perform successive divisions and track the remainders.

---

### Problem 3: Factorization in $\mathbb{Z}[x]$

Let $f(x) = x^4 - 5x^2 + 6$ in $\mathbb{Z}[x]$.

1. **(a)** Factor $f(x)$ completely over $\mathbb{Z}[x]$.

2. **(b)** Use the Division Algorithm to confirm one of the factors.

3. **(c)** Find the $\gcd(f(x), x^2 - 2)$.

**Hint:** Consider factoring $f(x)$ into quadratic or linear factors.

---

### Problem 4: Irreducibility and GCD

Let $f(x) = x^5 - x + 1$ and $g(x) = x^3 + x^2 - 1$ in $\mathbb{Q}[x]$.

1. **(a)** Show that $f(x)$ is irreducible over $\mathbb{Q}[x]$.

2. **(b)** Compute the $\gcd(f(x), g(x))$.

3. **(c)** Explain why $f(x)$ and $g(x)$ are coprime.

**Hint:** Use Eisenstein's Criterion for irreducibility.

---

### Problem 5: Division Algorithm in $\mathbb{Z}[x]$ with Modulo Arithmetic

Let $f(x) = x^4 + 2x^3 + x + 3$ and $g(x) = x^2 + 1$ in $\mathbb{Z}/5\mathbb{Z}[x]$.

1. **(a)** Perform the division of $f(x)$ by $g(x)$ in $\mathbb{Z}/5\mathbb{Z}[x]$.

2. **(b)** Find the quotient and remainder.

3. **(c)** Verify the Division Algorithm in this ring.

**Hint:** Remember that coefficients are modulo $5$.

---

### Problem 6: GCD of Polynomials over Finite Fields

Let $f(x) = x^6 + x^4 + x^2 + 1$ and $g(x) = x^4 + 1$ in $\mathbb{F}_2[x]$, where $\mathbb{F}_2$ is the finite field with two elements.

1. **(a)** Compute $\gcd(f(x), g(x))$ in $\mathbb{F}_2[x]$.

2. **(b)** Factor $f(x)$ and $g(x)$ completely over $\mathbb{F}_2[x]$.

3. **(c)** Determine whether $f(x)$ and $g(x)$ are coprime.

**Hint:** In $\mathbb{F}_2[x]$, addition and subtraction are the same.

---

### Problem 7: Application of Remainder Theorem

Let $f(x) = x^3 - 4x^2 + x + 6$ in $\mathbb{Q}[x]$.

1. **(a)** Use the Remainder Theorem to find the remainder when $f(x)$ is divided by $x - 2$.

2. **(b)** Confirm your result using the Division Algorithm.

3. **(c)** Determine if $x - 2$ is a factor of $f(x)$.

**Hint:** Evaluate $f(2)$ for the remainder.

---

### Problem 8: Extended Euclidean Algorithm

Let $f(x) = 3x^3 + x^2 - x + 2$ and $g(x) = x^2 - x + 1$ in $\mathbb{Q}[x]$.

1. **(a)** Use the Extended Euclidean Algorithm to find polynomials $s(x)$ and $t(x)$ such that $s(x)f(x) + t(x)g(x) = 1$.

2. **(b)** Interpret the result in terms of $\gcd(f(x), g(x))$.

3. **(c)** Determine if $f(x)$ and $g(x)$ are coprime.

**Hint:** The Extended Euclidean Algorithm generalizes to polynomials.

---

### Problem 9: Content of a Polynomial

Define the content of a polynomial $f(x) \in \mathbb{Z}[x]$ as the greatest common divisor of its coefficients.

Let $f(x) = 6x^4 - 9x^3 + 15x^2 - 3x + 12$.

1. **(a)** Compute the content of $f(x)$.

2. **(b)** Find the primitive part of $f(x)$ (divide by its content).

3. **(c)** Factor the primitive part over $\mathbb{Z}[x]$.

**Hint:** Factor out the $\gcd$ of the coefficients first.

---

### Problem 10: Gauss's Lemma and GCD

Let $f(x) = 2x^3 + 3x^2 - x + 5$ and $g(x) = x^2 - 4$ in $\mathbb{Z}[x]$.

1. **(a)** Show that the product $f(x)g(x)$ is primitive.

2. **(b)** Compute $\gcd(f(x), g(x))$.

3. **(c)** Use Gauss's Lemma to explain your findings.

**Hint:** Recall that the product of primitive polynomials is primitive.

---

## Part II: Burnside's Lemma Applications (Without Polyhedra)

### Problem 11: Coloring a Necklace with Beads

Consider a necklace with $n$ beads, and $k$ colors available to color each bead. Two necklaces are considered the same if one can be obtained from the other by rotation (no reflections).

1. **(a)** Describe the cyclic group $C_n$ acting on the set of necklaces.

2. **(b)** Use Burnside's Lemma to compute the number of distinct necklaces.

3. **(c)** Calculate this number explicitly for $n = 9$ and $k = 3$.

4. **(d)** Determine the number of necklaces fixed by a rotation of $120^\circ$.

**Hint:** For each rotation, compute the number of colorings it fixes.

---

### Problem 12: Coloring Squares on a Grid

Consider a $3 \times 3$ grid of squares, and you have $k$ colors to color each square. Two colorings are considered the same if they can be obtained from one another by rotation of $180^\circ$ (only considering rotation by $180^\circ$).

1. **(a)** Describe the group $G$ acting on the set of colorings.

2. **(b)** Use Burnside's Lemma to find the number of distinct colorings.

3. **(c)** Calculate this number explicitly for $k = 2$.

4. **(d)** Determine the number of colorings fixed by the $180^\circ$ rotation.

**Hint:** The group $G$ has two elements: the identity and the $180^\circ$ rotation.

---

### Problem 13: Permutations and Colorings

Let $G = S_4$ act on the set of colorings of four objects using $k$ colors, where two colorings are considered the same if they can be obtained from one another by a permutation in $G$.

1. **(a)** Describe the action of $G$ on the colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $k = 3$.

4. **(d)** Determine the number of colorings fixed by a permutation of cycle type $(2,2)$.

**Hint:** Identify the cycle types and compute fixed colorings accordingly.

---

### Problem 14: Coloring Vertices of a Polygon

Consider a regular $n$-gon in the plane, and you want to color its vertices using $k$ colors. Two colorings are considered the same if they can be obtained from one another by rotation (no reflections).

1. **(a)** Describe the cyclic group $C_n$ acting on the vertices.

2. **(b)** Use Burnside's Lemma to compute the number of distinct vertex colorings.

3. **(c)** Calculate this number explicitly for $n = 7$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by a rotation of $360^\circ/7$.

**Hint:** The rotation group has $n$ elements corresponding to rotations.

---

### Problem 15: Coloring Strings with Repetition

Consider strings of length $n$ formed from an alphabet of $k$ letters. Two strings are considered the same if one can be transformed into the other by reversing the string (palindrome consideration).

1. **(a)** Describe the group $G$ acting on the set of strings.

2. **(b)** Use Burnside's Lemma to find the number of distinct strings under this equivalence.

3. **(c)** Compute this number explicitly for $n = 5$ and $k = 2$.

4. **(d)** Determine the number of strings fixed under the reversal.

**Hint:** The group has two elements: the identity and the reversal.

---

### Problem 16: Coloring Cells in a Circular Array

Consider a circular array of $n$ cells, each of which can be colored with $k$ colors. Two colorings are considered the same if they can be rotated or reflected (dihedral group $D_n$).

1. **(a)** Describe the dihedral group $D_n$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Calculate this number explicitly for $n = 8$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by a reflection.

**Hint:** Account for both rotations and reflections in your calculations.

---

### Problem 17: Coloring Positions in a Dance Circle

In a dance circle with $n$ positions, each dancer wears a dress of one of $k$ colors. Two arrangements are considered the same if they can be obtained from one another by rotation.

1. **(a)** Describe the cyclic group $C_n$ acting on the arrangements.

2. **(b)** Use Burnside's Lemma to compute the number of distinct arrangements.

3. **(c)** Calculate this number explicitly for $n = 6$ and $k = 3$.

4. **(d)** Determine the number of arrangements fixed by a rotation of $180^\circ$.

**Hint:** Similar to necklace counting but applied to dancers.

---

### Problem 18: Coloring Squares in a Magic Square

Consider arranging numbers from $1$ to $n^2$ in an $n \times n$ grid such that two arrangements are considered the same if they can be obtained from one another by rotation or reflection.

1. **(a)** Describe the group $G$ acting on the set of arrangements.

2. **(b)** Use Burnside's Lemma to estimate the number of distinct arrangements (this may be complex; focus on understanding the method).

3. **(c)** Discuss the difficulties in computing this number explicitly.

4. **(d)** For a simplified case with $n = 2$, compute the number of distinct arrangements.

**Hint:** This problem is more theoretical; consider permutations and symmetries.

---

### Problem 19: Coloring Cells in a Honeycomb

Consider a finite honeycomb lattice in the plane with $n$ hexagonal cells, each of which can be colored using $k$ colors. Two colorings are considered the same if they can be obtained from one another by translations and rotations within the plane.

1. **(a)** Describe the symmetry group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Explain why this calculation may be complex.

4. **(d)** For a simplified case with $n = 3$ cells forming a triangle, compute the number of distinct colorings for $k = 2$.

**Hint:** Focus on the symmetries of the small configuration.

---

### Problem 20: Coloring Lattice Points in the Plane

Consider a finite grid of $n \times n$ points in the plane, and each point can be colored using $k$ colors. Two colorings are considered the same if they can be obtained from one another by a rotation of $180^\circ$ about the center of the grid.

1. **(a)** Describe the group $G$ acting on the colorings.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 5$ and $k = 2$.

4. **(d)** Determine the number of colorings fixed by the $180^\circ$ rotation.

**Hint:** Only consider the identity and the $180^\circ$ rotation.

---

**End of Practice Problems**

