---
title: Abstract Algebra- Challenging problems for MT2
date: 2024-11-02 17:10:20
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
- **A total of 30 problems** are provided, each with meaningful content and appropriate difficulty.
- Problems are intended to be comprehensive and computationally intensive, suitable for exam preparation.

---

## Problem 1: Orbit-Stabilizer and Group Actions

Let $G = S_5$, the symmetric group on 5 elements, and let $X$ be the set of all functions from $\{1, 2, 3\}$ to $\{1, 2, 3, 4, 5\}$. The group $G$ acts on $X$ by composition: for $\sigma \in G$ and $f \in X$, the action is defined as $(\sigma \cdot f)(i) = \sigma(f(i))$.

1. **(a)** Determine the size of the set $X$.

2. **(b)** For a fixed function $f \in X$ defined by $f(1) = 1$, $f(2) = 2$, $f(3) = 3$, compute the orbit $\operatorname{Orb}_G(f)$.

3. **(c)** Find the stabilizer subgroup $\operatorname{Stab}_G(f)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem for this action.

**Hint:** Consider how permutations in $G$ act on the outputs of the functions in $X$.

---

## Problem 2: Group Actions and Cosets

Let $G$ be a group of order $60$, and let $H$ be a subgroup of order $12$. Consider the action of $G$ on the set of left cosets $G/H$ by left multiplication.

1. **(a)** Determine the number of elements in $G/H$.

2. **(b)** Prove that the action of $G$ on $G/H$ is transitive.

3. **(c)** For a fixed coset $gH$, compute the stabilizer subgroup $\operatorname{Stab}_G(gH)$ and show that its order is equal to $|H|$.

4. **(d)** Use the Orbit-Stabilizer Theorem to verify that $|G| = |\operatorname{Orb}(gH)| \cdot |\operatorname{Stab}_G(gH)|$.

**Hint:** Recall that the stabilizer of a coset under left multiplication is conjugate to $H$.

---

## Problem 3: Action on Polynomial Rings

Let $G = \mathbb{Z}/2\mathbb{Z}$ act on the ring $\mathbb{R}[x]$ of real polynomials by sending $f(x) \mapsto f(-x)$.

1. **(a)** Show that this defines a group action of $G$ on $\mathbb{R}[x]$.

2. **(b)** Determine the fixed ring $\mathbb{R}[x]^G = \{ f(x) \in \mathbb{R}[x] \mid f(x) = f(-x) \}$.

3. **(c)** Prove that $\mathbb{R}[x]^G$ is a subring of $\mathbb{R}[x]$.

4. **(d)** Show that every element of $\mathbb{R}[x]^G$ is a polynomial in $x^2$.

**Hint:** Consider the effect of the action on even and odd functions.

---

## Problem 4: Burnside's Lemma and Group Actions

Consider the action of the dihedral group $D_4$ (order 8) on the set of colorings of the vertices of a square using $n$ colors. Two colorings are considered the same if one can be obtained from the other by a symmetry in $D_4$.

1. **(a)** List all elements of $D_4$ and describe their action on the square.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 3$.

4. **(d)** Determine the number of colorings fixed by a $90^\circ$ rotation.

**Hint:** For each group element, count the number of colorings it fixes.

---

## Problem 5: Left Regular Action and Cayley's Theorem

Let $G$ be a finite group of order $n$.

1. **(a)** Define the left regular action of $G$ on itself.

2. **(b)** Show that this action defines an injective homomorphism $\phi: G \rightarrow S_n$.

3. **(c)** Prove that the image of $G$ under $\phi$ is isomorphic to $G$.

4. **(d)** Conclude that every finite group is isomorphic to a subgroup of a symmetric group, thus proving Cayley's Theorem.

**Hint:** Use the fact that the action is faithful and consider permutations of the group elements.

---

## Problem 6: Homomorphisms and Kernels

Let $G$ be a group acting on a set $X$, and let $\phi: G \rightarrow \operatorname{Sym}(X)$ be the associated homomorphism.

1. **(a)** Prove that $\ker \phi$ is a normal subgroup of $G$.

2. **(b)** If $G$ acts transitively on $X$ and $\ker \phi$ is nontrivial, show that $G/\ker \phi$ acts effectively on $X$.

3. **(c)** Provide an example where $\ker \phi$ is nontrivial.

**Hint:** Consider an action where some non-identity elements fix all of $X$.

---

## Problem 7: Group Action on Cosets and Double Cosets

Let $G$ be a finite group, and let $H$ and $K$ be subgroups of $G$. Consider the action of $H$ on the set of left cosets $G/K$ by left multiplication.

1. **(a)** Define the double coset space $H \backslash G / K$.

2. **(b)** Show that the number of double cosets is equal to the number of orbits of $H$ acting on $G/K$.

3. **(c)** If $G = S_4$, $H = \langle (12) \rangle$, and $K = \langle (34) \rangle$, compute the number of double cosets.

**Hint:** Use the orbit-stabilizer theorem and consider the sizes of $H$ and $K$.

---

## Problem 8: Orbit Counting and Class Equation

Let $G$ be a finite group acting on a finite set $X$. Suppose that the action is such that for each $x \in X$, the stabilizer subgroup $\operatorname{Stab}_G(x)$ has the same order $m$.

1. **(a)** Prove that the size of each orbit is $|G|/m$.

2. **(b)** If $|G| = 60$ and $m = 12$, determine the possible sizes of the orbits.

3. **(c)** Use the class equation to relate the sizes of the orbits to $|X|$.

**Hint:** Recall that the orbits partition the set $X$.

---

## Problem 9: Action on Gaussian Integers

Consider the ring $\mathbb{Z}[i]$ of Gaussian integers, and let $G = \{1, -1, i, -i\}$, the group of units of $\mathbb{Z}[i]$. Define an action of $G$ on $\mathbb{Z}[i]$ by multiplication.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the orbits of this action on $\mathbb{Z}[i]$.

3. **(c)** For a given nonzero $z \in \mathbb{Z}[i]$, describe the orbit $\operatorname{Orb}_G(z)$.

4. **(d)** Prove that two elements $z, w \in \mathbb{Z}[i]$ are associates (i.e., differ by multiplication by a unit) if and only if they lie in the same orbit under this action.

**Hint:** Consider the properties of units and their effect on elements of $\mathbb{Z}[i]$.

---

## Problem 10: Division Algorithm in $\mathbb{Z}[i]$

Let $a = 7 + 5i$ and $b = 3 + 2i$ in $\mathbb{Z}[i]$.

1. **(a)** Use the Division Algorithm in $\mathbb{Z}[i]$ to find $q, r \in \mathbb{Z}[i]$ such that $a = bq + r$ and $N(r) < N(b)$, where $N(z) = |z|^2$.

2. **(b)** Compute the greatest common divisor (gcd) of $a$ and $b$ in $\mathbb{Z}[i]$.

3. **(c)** Express the gcd as a linear combination of $a$ and $b$.

4. **(d)** Factor $a$ into irreducible elements in $\mathbb{Z}[i]$.

**Hint:** Use the Euclidean Algorithm in $\mathbb{Z}[i]$ and consider norms to find gcds.

---

## Problem 11: Units and Zero-Divisors in Rings

Consider the ring $R = \mathbb{Z}/8\mathbb{Z}$.

1. **(a)** List all units in $R$.

2. **(b)** Identify all zero-divisors in $R$.

3. **(c)** Show that $R$ consists of units, zero-divisors, and zero.

4. **(d)** Prove that in any finite ring, every non-zero element is either a unit or a zero-divisor.

**Hint:** Use properties of modular arithmetic and consider the multiplication table of $R$.

---

## Problem 12: Homomorphisms and Ideals in $\mathbb{Z}[x]$

Let $\phi: \mathbb{Z}[x] \rightarrow \mathbb{Z}/2\mathbb{Z}$ be the ring homomorphism defined by $\phi(f(x)) = f(0) \mod 2$.

1. **(a)** Prove that $\phi$ is a ring homomorphism.

2. **(b)** Determine the kernel $\ker \phi$.

3. **(c)** Describe the quotient ring $\mathbb{Z}[x]/\ker \phi$.

4. **(d)** Is the quotient ring a field? Justify your answer.

**Hint:** Consider the set of polynomials with even constant terms and the structure of the quotient ring.

---

## Problem 13: Ring Homomorphisms and First Isomorphism Theorem

Let $R = \mathbb{Z}[i]$ and consider the ring homomorphism $\phi: R \rightarrow \mathbb{Z}/5\mathbb{Z}$ defined by $\phi(a + bi) = [a + b] \mod 5$.

1. **(a)** Verify that $\phi$ is a ring homomorphism.

2. **(b)** Determine the kernel $\ker \phi$.

3. **(c)** Use the First Isomorphism Theorem to describe $R/\ker \phi$.

4. **(d)** Is the quotient ring $R/\ker \phi$ isomorphic to $\mathbb{Z}/5\mathbb{Z}$? Explain.

**Hint:** Analyze the structure of the kernel and the image of $\phi$.

---

## Problem 14: Group Action on Polynomial Functions

Let $G = \mathbb{Z}/3\mathbb{Z}$ act on the ring $\mathbb{C}[x]$ of complex polynomials by $g \cdot f(x) = f(\omega^g x)$, where $\omega = e^{2\pi i/3}$ is a primitive third root of unity.

1. **(a)** Show that this defines a group action.

2. **(b)** Determine the fixed ring $\mathbb{C}[x]^G = \{ f(x) \in \mathbb{C}[x] \mid f(\omega x) = f(x) \}$.

3. **(c)** Prove that $\mathbb{C}[x]^G$ consists of polynomials in $x^3$.

4. **(d)** Find a nontrivial example of a polynomial in $\mathbb{C}[x]^G$.

**Hint:** Use the properties of roots of unity and their effect on polynomials.

---

## Problem 15: Burnside's Lemma in Action

Consider the action of the group $G = \mathbb{Z}/4\mathbb{Z}$ on the set of colorings of the vertices of a regular tetrahedron using $n$ colors, where the action is by rotation around an axis passing through a vertex and the center of the opposite face.

1. **(a)** Describe all elements of $G$ and their action on the tetrahedron.

2. **(b)** Use Burnside's Lemma to calculate the number of distinct colorings.

3. **(c)** Compute this number explicitly for $n = 2$.

4. **(d)** Determine the number of colorings fixed by each element of $G$.

**Hint:** Consider the rotation symmetries of the tetrahedron and how they permute the vertices.

---

## Problem 16: Gaussian Integers and Primes

Let $\mathbb{Z}[i]$ be the ring of Gaussian integers.

1. **(a)** Prove that $5$ is not a prime element in $\mathbb{Z}[i]$.

2. **(b)** Factor $5$ into irreducible elements in $\mathbb{Z}[i]$.

3. **(c)** Show that $N(z) = N(\bar{z})$, where $N(z) = |z|^2$ and $\bar{z}$ is the complex conjugate of $z$.

4. **(d)** Use this property to find all elements $z \in \mathbb{Z}[i]$ such that $N(z) = 5$.

**Hint:** Consider the norm function and its multiplicative properties.

---

## Problem 17: Action on Colorings with Burnside's Lemma

Consider the action of $G = D_6$, the dihedral group of order $12$, on the set of colorings of the vertices of a regular hexagon using $n$ colors.

1. **(a)** List all elements of $D_6$ and describe their action.

2. **(b)** Use Burnside's Lemma to compute the number of distinct colorings.

3. **(c)** Calculate this number explicitly for $n = 3$.

4. **(d)** Determine the number of colorings fixed by a reflection over an axis of symmetry.

**Hint:** Analyze the symmetries and fixed points under each group element.

---

## Problem 18: Division Algorithm in $\mathbb{Z}[x]$ and GCD

Let $f(x) = x^5 - x^4 + x^2 - x + 2$ and $g(x) = x^3 - x + 1$ in $\mathbb{Z}[x]$.

1. **(a)** Use the Division Algorithm to divide $f(x)$ by $g(x)$ and find the quotient and remainder.

2. **(b)** Use the Euclidean Algorithm to compute the greatest common divisor $\gcd(f(x), g(x))$ in $\mathbb{Z}[x]$.

3. **(c)** Express $\gcd(f(x), g(x))$ as a linear combination of $f(x)$ and $g(x)$.

4. **(d)** Determine whether $g(x)$ divides $f(x)$ in $\mathbb{Q}[x]$.

**Hint:** Be careful with integer coefficients and consider whether the division is exact.

---

## Problem 19: Ideals in Polynomial Rings

Consider the ring $\mathbb{Z}[x]$.

1. **(a)** Prove that the ideal $(2, x)$ in $\mathbb{Z}[x]$ consists of all polynomials with even constant terms.

2. **(b)** Show that $(2, x)$ is not a principal ideal in $\mathbb{Z}[x]$.

3. **(c)** Determine whether $\mathbb{Z}[x]/(2, x)$ is a field.

4. **(d)** Describe the structure of $\mathbb{Z}[x]/(2, x)$.

**Hint:** Consider the properties of ideals generated by multiple elements.

---

## Problem 20: Ring Homomorphisms and Kernel

Let $\phi: \mathbb{Z}[x] \rightarrow \mathbb{Z}/4\mathbb{Z}$ be the ring homomorphism defined by $\phi(f(x)) = [f(1)] \mod 4$.

1. **(a)** Prove that $\phi$ is a ring homomorphism.

2. **(b)** Determine the kernel $\ker \phi$.

3. **(c)** Describe the quotient ring $\mathbb{Z}[x]/\ker \phi$.

4. **(d)** Is the quotient ring isomorphic to $\mathbb{Z}/4\mathbb{Z}$? Explain.

**Hint:** Consider polynomials that vanish at $x = 1$ modulo 4.

---

## Problem 21: Group Actions on Groups

Let $G$ be a group acting on itself by conjugation: $g \cdot x = gxg^{-1}$.

1. **(a)** Prove that this defines a group action.

2. **(b)** Determine the stabilizer subgroup $\operatorname{Stab}_G(x)$ for an element $x \in G$.

3. **(c)** Show that the orbit of $x$ under this action is the conjugacy class of $x$.

4. **(d)** Use the Orbit-Stabilizer Theorem to relate the sizes of conjugacy classes to the order of $G$.

**Hint:** Recall definitions of conjugacy classes and centralizers.

---

## Problem 22: Rings of Matrices and Units

Consider the ring $R = M_{2 \times 2}(\mathbb{Z}/3\mathbb{Z})$.

1. **(a)** Determine all units in $R$.

2. **(b)** Show that a matrix $A \in R$ is a unit if and only if $\det A$ is a unit in $\mathbb{Z}/3\mathbb{Z}$.

3. **(c)** Calculate the number of units in $R$.

4. **(d)** Are all non-invertible elements in $R$ zero-divisors? Justify your answer.

**Hint:** Use properties of determinants over finite fields.

---

## Problem 23: Group Actions and Orbit Counting

Let $G$ be a finite group acting transitively on a finite set $X$. Suppose that for every $x \in X$, the stabilizer $\operatorname{Stab}_G(x)$ is the same subgroup $H$.

1. **(a)** Prove that $|X| = |G|/|H|$.

2. **(b)** Show that the number of elements $g \in G$ such that $g \cdot x = y$ for fixed $x, y \in X$ is equal to $|H|$.

3. **(c)** If $|G| = 168$ and $|H| = 7$, determine $|X|$.

4. **(d)** Apply this to the action of $G = \operatorname{PSL}(2,7)$ on the projective line over $\mathbb{F}_7$.

**Hint:** Consider the properties of transitive actions and the Orbit-Stabilizer Theorem.

---

## Problem 24: Ideals and Quotient Rings

Let $R = \mathbb{Z}[x]$, and let $I = (x^2 + 1)$ be the ideal generated by $x^2 + 1$.

1. **(a)** Describe the elements of the quotient ring $R/I$.

2. **(b)** Prove that $R/I$ is isomorphic to $\mathbb{Z}[i]$.

3. **(c)** Determine whether $R/I$ is a field.

4. **(d)** Discuss the invertibility of elements in $R/I$.

**Hint:** Consider the relation $x^2 = -1$ in the quotient ring.

---

## Problem 25: Group Actions on Sets of Functions

Let $G = S_3$ act on the set $X$ of all functions from $\{1, 2, 3\}$ to a finite set $A$ with $k$ elements, via $(\sigma \cdot f)(i) = f(\sigma^{-1}(i))$.

1. **(a)** Prove that this defines a group action.

2. **(b)** Determine the number of orbits of $G$ on $X$.

3. **(c)** Use Burnside's Lemma to compute this number.

4. **(d)** Calculate the number of orbits when $k = 2$.

**Hint:** Consider the effect of permutations on the functions and fixed points under group elements.

---

## Problem 26: Homomorphisms and Ideals in $\mathbb{Z}$

Let $\phi: \mathbb{Z} \rightarrow \mathbb{Z}/n\mathbb{Z}$ be the natural projection homomorphism.

1. **(a)** Determine $\ker \phi$.

2. **(b)** Show that every ideal in $\mathbb{Z}/n\mathbb{Z}$ corresponds to an ideal in $\mathbb{Z}$ containing $\ker \phi$.

3. **(c)** Describe all ideals in $\mathbb{Z}/12\mathbb{Z}$.

4. **(d)** Explain the correspondence between ideals in $\mathbb{Z}$ and $\mathbb{Z}/n\mathbb{Z}$.

**Hint:** Use the First Isomorphism Theorem and properties of ideals in $\mathbb{Z}$.

---

## Problem 27: Ring Homomorphisms and Quotients

Let $R = \mathbb{Q}[x]$, and let $I$ be the ideal generated by $x^2 - 2$.

1. **(a)** Describe the elements of the quotient ring $R/I$.

2. **(b)** Prove that $R/I$ is isomorphic to $\mathbb{Q}[\sqrt{2}]$.

3. **(c)** Determine whether $R/I$ is a field.

4. **(d)** Discuss the invertibility of elements in $R/I$.

**Hint:** Consider the relation $x^2 = 2$ in the quotient ring.

---

## Problem 28: Group Actions and Stabilizers

Let $G = S_n$ act on the set $X$ of all $k$-element subsets of $\{1, 2, \dots, n\}$ by permutation.

1. **(a)** Determine the size of $X$.

2. **(b)** For a fixed subset $A \subseteq \{1, 2, \dots, n\}$ with $|A| = k$, compute the stabilizer subgroup $\operatorname{Stab}_G(A)$.

3. **(c)** Calculate the size of the orbit $\operatorname{Orb}_G(A)$.

4. **(d)** Verify the Orbit-Stabilizer Theorem for this action.

**Hint:** Consider how permutations affect subsets and the structure of $S_n$.

---

## Problem 29: Actions by Conjugation and Class Equation

Let $G$ be a finite group acting on itself by conjugation.

1. **(a)** State the class equation of $G$.

2. **(b)** Use the class equation to prove that if $|G|$ is divisible by a prime $p$, then $G$ has an element of order $p$.

3. **(c)** Apply this result to $G = S_5$.

4. **(d)** Determine the sizes of the conjugacy classes in $S_5$.

**Hint:** Consider the centralizer subgroups and their orders.

---

## Problem 30: Burnside's Lemma and Chemical Isomers

Consider the set of distinct chemical isomers of a molecule with a cyclic structure of $n$ atoms, where each atom can be one of $k$ types, and rotations are considered symmetries.

1. **(a)** Model this situation using group actions.

2. **(b)** Use Burnside's Lemma to compute the number of distinct isomers.

3. **(c)** Calculate this number explicitly for $n = 6$ and $k = 2$.

4. **(d)** Discuss how the presence of reflection symmetry would change the calculation.

**Hint:** Treat the molecule as a necklace and consider rotational symmetries.

---

**End of Practice Problems**
