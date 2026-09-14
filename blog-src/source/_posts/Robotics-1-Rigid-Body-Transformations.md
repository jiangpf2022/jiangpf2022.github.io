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
excerpt: "A concise guide to 2D and 3D rotations, homogeneous transformations, and frame-safe composition in robotics."
---

Rigid-body transformations describe the same point from different coordinate frames. The calculation always reduces to rotation, translation, and the order in which they are composed.


## 2D Transformations

### Translation and Frames

A frame has an origin and orthonormal axes. If a point is written in frame $\{A\}$, denote its coordinates by ${}^{A}\mathbf{p}$.

The notes write translation in its dimension-independent 3D form:

$$
h(x,y,z)=
\begin{bmatrix}
x+t_x\\\\
y+t_y\\\\
z+t_z
\end{bmatrix}.
$$

In 2D, simply remove the $z$ coordinate. Translation is affine because it moves the origin.

### Rotation Matrix

A counterclockwise rotation by $\theta$ is

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

Its columns are the rotated coordinate axes. They are orthonormal, so

$$
R(\theta)^{-1}=R(\theta)^T=R(-\theta),
\qquad
\det R(\theta)=1.
$$

Planar rotations commute:

$$
R(\theta_1)R(\theta_2)
=R(\theta_1+\theta_2)
=R(\theta_2)R(\theta_1).
$$

### Nested Frames

Let frame $\{b\}$ have position $\mathbf{p}$ and orientation $P=R(\theta)$ relative to $\{s\}$. Let $\{c\}$ have position $\mathbf{q}$ and orientation $Q=R(\psi)$ relative to $\{b\}$.

<figure class="robotics-figure robotics-figure--compact">
  <img src="/blog/images/robotics-1/frames-2d.webp" alt="Nested 2D coordinate frames s, b, and c" loading="lazy" decoding="async">
  <figcaption>Rotate $\mathbf{q}$ into frame $\{s\}$ before adding it to $\mathbf{p}$.</figcaption>
</figure>

Then

$$
\mathbf{r}=\mathbf{p}+P\mathbf{q}
{}=
\begin{bmatrix}
p_x+q_x\cos\theta-q_y\sin\theta\\\\
p_y+q_x\sin\theta+q_y\cos\theta
\end{bmatrix},
\qquad
R=PQ=R(\theta+\psi).
$$

The key rule is that vectors must be expressed in the same frame before addition.

### Homogeneous Transform

Appending a $1$ turns the affine transformation into one matrix multiplication:

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

Thus $\mathbf{r}=R\mathbf{q}+\mathbf{p}$: **rotate first, then translate**.

### Composition Order

For $T_a=[R_a,\mathbf{p}_a]$ and $T_b=[R_b,\mathbf{p}_b]$,

$$
T_aT_b=
\begin{bmatrix}
R_aR_b&R_a\mathbf{p}_b+\mathbf{p}_a\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

Reversing the order changes the translation term, so $T_aT_b\neq T_bT_a$.

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

With column vectors, the rightmost matrix acts first.


## 3D Transformations

### Principal-Axis Rotations

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

As in 2D, $R^{-1}=R^T$ and $\det R=1$.

### Right-Hand Rule and Order

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/right-hand-rule.webp" alt="Right-hand rule for positive three-dimensional rotation" loading="lazy" decoding="async">
  <figcaption>Point the right thumb along the positive axis; the curled fingers give the positive rotation direction.</figcaption>
</figure>

Unlike 2D rotations, rotations about different 3D axes do not commute:

$$
R_y(\phi)R_z(\theta)\neq R_z(\theta)R_y(\phi).
$$

Therefore a rotation sequence must specify both the order and whether the axes are fixed or moving.

### Homogeneous Transform

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

Again, rotation happens first and translation second.

### Frame-Label Composition

Let ${}^{A}T_B$ map coordinates from frame $\{B\}$ into frame $\{A\}$:

$$
{}^{A}\bar{\mathbf{p}}
={}^{A}T_B\,{}^{B}\bar{\mathbf{p}}.
$$

Valid chains cancel their adjacent frame labels:

$$
{}^{i}T_k={}^{i}T_j\,{}^{j}T_k.
$$

- A new motion expressed in the fixed/world frame is pre-multiplied.
- A new motion expressed in the current/body frame is post-multiplied.

### Camera–Robot–World Example

Let $\{1\}$ be the camera, $\{0\}$ the robot body, and $\{2\}$ the world.

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/camera-robot-frames.webp" alt="World, overhead-camera, and robot coordinate frames" loading="lazy" decoding="async">
  <figcaption>The matching inner frame labels determine the multiplication order.</figcaption>
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

The adjacent $0$ labels match, so

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

This is the practical workflow for every frame problem: label each transform, cancel adjacent frames, and then multiply in that order.

<p class="robotics-cover-credit">Cover photo: <a href="https://commons.wikimedia.org/wiki/File:Columbia_University_-_The_Fu_Foundation_School_of_Engineering_And_Applied_Science_(48170360946).jpg">Ajay Suresh / Wikimedia Commons</a>, licensed under <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. The cover has been resized for layout.</p>
