---
title: Robotics 1 - Rigid-Body Transformations
date: 2026-09-13 22:40:54
categories: Computational Aspects of Robotics
tags:
  - Robotics
  - Rigid-Body Transformations
  - Linear Algebra
mathjax: true
cover: "/images/robotics-1/rigid-body-transformations-cover.webp"
excerpt: "A compact guide to coordinate frames, planar and spatial rotations, homogeneous transformations, and the composition rules that make multi-frame robotics calculations reliable."
---

Rigid-body transformations answer one recurring robotics question: **how do we describe the same point from different coordinate frames?** This chapter follows the handwritten notes from 2D translation and rotation to 3D homogeneous transforms. The extra explanations are kept only where they make the derivation easier to reuse.


## Coordinate Frames and Rigid Motion

### Frames Before Numbers

A point exists independently of a coordinate system, but its coordinates do not. We write ${}^{A}\mathbf{p}$ for the coordinates of point $P$ expressed in frame $\{A\}$. A frame contains an origin and orthonormal axes, so its pose requires:

- a translation vector for the origin;
- a rotation matrix for the axes.

A rigid motion preserves distances and orientation. Its general form is

$$
h(\mathbf{x})=R\mathbf{x}+\mathbf{t}.
$$

For a pure translation in 3D,

$$
h(x,y,z)=
\begin{bmatrix}
x+t_x\\\\
y+t_y\\\\
z+t_z
\end{bmatrix}.
$$

Translation is affine rather than linear because $h(\mathbf{0})=\mathbf{t}\neq\mathbf{0}$. This is exactly why homogeneous coordinates are introduced later.


## Planar Rotations

### Rotation Matrix

Rotating $(x,y)$ counterclockwise by $\theta$ gives

$$
\begin{bmatrix}x'\\\\y'\end{bmatrix}
{}=
\underbrace{
\begin{bmatrix}
\cos\theta&-\sin\theta\\\\
\sin\theta&\cos\theta
\end{bmatrix}}_{R(\theta)}
\begin{bmatrix}x\\\\y\end{bmatrix}.
$$

The columns of $R(\theta)$ are the rotated coordinate axes expressed in the original frame. Because these columns are orthonormal,

$$
R(\theta)^{-1}=R(\theta)^T=R(-\theta),
\qquad
\det R(\theta)=1.
$$

### Composition in 2D

Successive planar rotations add their angles:

$$
R(\theta_1)R(\theta_2)
=R(\theta_1+\theta_2)
=R(\theta_2)R(\theta_1).
$$

Thus 2D rotations commute. This is a special planar property: every rotation is about the same axis perpendicular to the plane.


## Nested Frames in 2D

### Position and Orientation

Let frame $\{b\}$ have position $\mathbf{p}$ and orientation $P=R(\theta)$ relative to frame $\{s\}$. Let frame $\{c\}$ have position $\mathbf{q}$ and orientation $Q=R(\psi)$ relative to $\{b\}$.

<figure class="robotics-figure robotics-figure--compact">
  <img src="/blog/images/robotics-1/frames-2d.webp" alt="Nested 2D coordinate frames s, b, and c" loading="lazy" decoding="async">
  <figcaption>Before adding $\mathbf{q}$ to $\mathbf{p}$, rotate it from frame $\{b\}$ into frame $\{s\}$.</figcaption>
</figure>

The origin and orientation of $\{c\}$ expressed in $\{s\}$ are

$$
\mathbf{r}=\mathbf{p}+P\mathbf{q},
\qquad
R=PQ=R(\theta+\psi).
$$

Expanded in coordinates,

$$
\mathbf{r}=
\begin{bmatrix}
p_x+q_x\cos\theta-q_y\sin\theta\\\\
p_y+q_x\sin\theta+q_y\cos\theta
\end{bmatrix}.
$$

The essential rule is: **vectors must be expressed in the same frame before they are added**.

### Homogeneous Form

By appending a $1$ to a point, rotation and translation become one matrix multiplication:

$$
\begin{bmatrix}\mathbf{r}\\\\1\end{bmatrix}
{}=
\underbrace{
\begin{bmatrix}
R&\mathbf{p}\\\\
\mathbf{0}^T&1
\end{bmatrix}}_{T}
\begin{bmatrix}\mathbf{q}\\\\1\end{bmatrix}.
$$

Points use a final coordinate of $1$ and therefore translate. Direction vectors use $0$:

$$
T\begin{bmatrix}\mathbf{v}\\\\0\end{bmatrix}
=\begin{bmatrix}R\mathbf{v}\\\\0\end{bmatrix}.
$$

The inverse transform is

$$
T^{-1}=
\begin{bmatrix}
R^T&-R^T\mathbf{p}\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

Negating $\mathbf{p}$ alone is not enough: the translation must also be expressed in the inverse frame.


## Order Matters

### Non-Commutativity

For two transforms

$$
T_a=
\begin{bmatrix}
R_a&\mathbf{p}_a\\\\
\mathbf{0}^T&1
\end{bmatrix},
\qquad
T_b=
\begin{bmatrix}
R_b&\mathbf{p}_b\\\\
\mathbf{0}^T&1
\end{bmatrix},
$$

their product is

$$
T_aT_b=
\begin{bmatrix}
R_aR_b&R_a\mathbf{p}_b+\mathbf{p}_a\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

Reversing the order changes the translation term to $R_b\mathbf{p}_a+\mathbf{p}_b$, so in general $T_aT_b\neq T_bT_a$.

<div class="robotics-figure-pair">
  <figure class="robotics-figure">
    <img src="/blog/images/robotics-1/rotate-then-translate.webp" alt="Rotate a coordinate frame and then translate it" loading="lazy" decoding="async">
    <figcaption>Rotate first, then translate.</figcaption>
  </figure>
  <figure class="robotics-figure">
    <img src="/blog/images/robotics-1/translate-then-rotate.webp" alt="Translate a coordinate frame and then rotate it" loading="lazy" decoding="async">
    <figcaption>Translate first, then rotate.</figcaption>
  </figure>
</div>

With column vectors, the rightmost matrix acts first. In $T_aT_b\mathbf{x}$, apply $T_b$ before $T_a$.


## Spatial Rotations

### Principal Axes

Using the right-hand convention,

$$
R_x(\gamma)=
\begin{bmatrix}
1&0&0\\\\
0&\cos\gamma&-\sin\gamma\\\\
0&\sin\gamma&\cos\gamma
\end{bmatrix},
$$

$$
R_y(\beta)=
\begin{bmatrix}
\cos\beta&0&\sin\beta\\\\
0&1&0\\\\
-\sin\beta&0&\cos\beta
\end{bmatrix},
\qquad
R_z(\alpha)=
\begin{bmatrix}
\cos\alpha&-\sin\alpha&0\\\\
\sin\alpha&\cos\alpha&0\\\\
0&0&1
\end{bmatrix}.
$$

Every valid 3D rotation still satisfies

$$
R^{-1}=R^T,
\qquad
\det R=1.
$$

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/right-hand-rule.webp" alt="Right-hand rule for positive three-dimensional rotation" loading="lazy" decoding="async">
  <figcaption>Point the right thumb along the positive axis; the curled fingers give the positive rotation direction.</figcaption>
</figure>

### Why 3D Is Different

Rotations about different 3D axes do not generally commute:

$$
R_y(\phi)R_z(\theta)\neq R_z(\theta)R_y(\phi).
$$

The first rotation changes the moving axes used to interpret the next body-relative rotation. Therefore an $x$–$y$–$z$ sequence is incomplete unless it also says whether the rotations use fixed axes or moving axes.


## 3D Homogeneous Transforms

### Matrix and Action

A 3D rigid-body transform is

$$
T=
\begin{bmatrix}
r_{11}&r_{12}&r_{13}&p_x\\\\
r_{21}&r_{22}&r_{23}&p_y\\\\
r_{31}&r_{32}&r_{33}&p_z\\\\
0&0&0&1
\end{bmatrix}
{}=
\begin{bmatrix}
R&\mathbf{p}\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

Applied to a point,

$$
T\begin{bmatrix}\boldsymbol{\xi}\\\\1\end{bmatrix}
{}=
\begin{bmatrix}R\boldsymbol{\xi}+\mathbf{p}\\\\1\end{bmatrix}.
$$

Read this operation as **rotate first, then translate**. The first three columns are the transformed axes; the last column is the transformed origin.

### Frame-Safe Composition

Use ${}^{A}T_B$ for the transform that maps coordinates from frame $\{B\}$ into frame $\{A\}$:

$$
{}^{A}\bar{\mathbf{p}}={}^{A}T_B\,{}^{B}\bar{\mathbf{p}}.
$$

Frame labels must cancel in a valid chain:

$$
{}^{i}T_k={}^{i}T_j\,{}^{j}T_k.
$$

This gives the ordering rule from the notes:

- a new transform expressed in the **fixed/world frame** is pre-multiplied;
- a new transform expressed in the **current/body frame** is post-multiplied.


## Camera–Robot–World Example

Let frame $\{1\}$ be an overhead camera, $\{0\}$ the robot body, and $\{2\}$ the world.

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/camera-robot-frames.webp" alt="World, overhead-camera, and robot coordinate frames" loading="lazy" decoding="async">
  <figcaption>The matching inner frame labels determine the legal multiplication order.</figcaption>
</figure>

The lecture gives

$$
{}^{1}T_0=
\begin{bmatrix}
0&0&-1&1\\\\
1&0&0&0\\\\
0&-1&0&0\\\\
0&0&0&1
\end{bmatrix},
\qquad
{}^{0}T_2=
\begin{bmatrix}
0&0&-1&0\\\\
-1&0&0&1\\\\
0&1&0&0\\\\
0&0&0&1
\end{bmatrix}.
$$

Because the adjacent frame labels match,

$$
{}^{1}T_2
={}^{1}T_0\,{}^{0}T_2
{}=
\begin{bmatrix}
0&-1&0&1\\\\
0&0&-1&0\\\\
1&0&0&-1\\\\
0&0&0&1
\end{bmatrix}.
$$

For any result $T=[R,\mathbf{p};\mathbf{0}^T,1]$, use three quick checks:

$$
R^TR\approx I,
\qquad
\det R\approx1,
\qquad
TT^{-1}\approx I.
$$


## Compact Review

The lecture reduces to four reusable rules:

1. Express vectors in the same frame before adding them.
2. Use $\mathbf{r}=R\mathbf{q}+\mathbf{p}$: rotate first, translate second.
3. Read matrix products from right to left for column vectors.
4. Write frame labels and compose only when adjacent labels cancel.

The matrices are short; most robotics mistakes come from attaching the wrong frame or applying transforms in the wrong order.

<p class="robotics-cover-credit">Cover photo: <a href="https://commons.wikimedia.org/wiki/File:Columbia_University_-_The_Fu_Foundation_School_of_Engineering_And_Applied_Science_(48170360946).jpg">Ajay Suresh / Wikimedia Commons</a>, licensed under <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. The cover has been resized for layout.</p>
