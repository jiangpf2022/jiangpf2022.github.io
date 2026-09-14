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
excerpt: "Notebook-style review of 2D and 3D rigid-body transformations, from frame geometry to homogeneous matrices and composition order."
---

Rigid-body transformations let us describe one physical point from different coordinate frames without changing the body's shape. Following the handwritten notes, the whole topic can be read as one chain:

> **Translate or rotate a frame → combine them with homogeneous coordinates → compose transforms in the correct order.**

The notation ${}^{A}\mathbf{p}$ means “the coordinates of point $\mathbf{p}$ expressed in frame $\{A\}$.”


## 2D Transformations

### Points, Vectors, and Translation

- **World space:** $\mathcal{W}=\mathbb{R}^2$ for planar motion and $\mathbb{R}^3$ for spatial motion.
- **Point:** its coordinates depend on the origin and orientation of the reference frame.
- **Free vector:** its magnitude and direction are fixed; to express it in a frame, attach its tail to that frame's origin.
- **Frame:** an origin plus orthonormal axes. A robot usually has one fixed world frame and one or more moving body frames.

A rigid-body transformation preserves distances and orientations between all points on the body, so it excludes scaling, shear, and reflection. Translation by $(t_x,t_y,t_z)$ is

$$
h(x,y,z)=
\begin{bmatrix}
x+t_x\\\\
y+t_y\\\\
z+t_z
\end{bmatrix}.
$$

In 2D, remove the $z$ coordinate. Translating the body by $\mathbf{t}$ is equivalent to translating the reference frame by $-\mathbf{t}$. Because translation moves the origin, it is **affine**, not linear.

### Rotation Matrix

A counterclockwise rotation by $\theta$ about the frame origin maps $(x,y)$ to $(x',y')$:

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

The columns of $R(\theta)$ are the rotated body-frame axes expressed in the original frame. They stay orthonormal, which gives the properties used most often:

$$
R(\theta)^{-1}=R(\theta)^T=R(-\theta),
\qquad
\det R(\theta)=1.
$$

The inverse is a clockwise rotation of the same magnitude. Since 2D has only one rotation axis, planar rotations commute:

$$
R(\theta_1)R(\theta_2)
{}=R(\theta_1+\theta_2)
{}=R(\theta_2)R(\theta_1).
$$

### Nested Frames

Let frame $\{b\}$ have position $\mathbf{p}$ and orientation $P=R(\theta)$ relative to $\{s\}$. Let $\{c\}$ have position $\mathbf{q}$ and orientation $Q=R(\psi)$ relative to $\{b\}$.

<figure class="robotics-figure robotics-figure--compact">
  <img src="/blog/images/robotics-1/frames-2d.webp" alt="Nested 2D coordinate frames s, b, and c" loading="lazy" decoding="async">
  <figcaption>Rotate $\mathbf{q}$ into frame $\{s\}$ before adding it to $\mathbf{p}$.</figcaption>
</figure>

To locate $\{c\}$ relative to $\{s\}$, first rotate the displacement $\mathbf{q}$ from frame $\{b\}$ into frame $\{s\}$, then add $\mathbf{p}$:

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

This is the central frame rule: **vectors must be expressed in the same frame before they can be added.** Orientations compose by matrix multiplication; in 2D this simply adds their angles.

### Homogeneous Coordinates

The nested-frame equation $\mathbf{r}=\mathbf{p}+R\mathbf{q}$ is affine. Appending a $1$ turns it into a single linear mapping:

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

For the explicit 2D form,

$$
T(\theta,p_x,p_y)=
\begin{bmatrix}
\cos\theta&-\sin\theta&p_x\\\\
\sin\theta&\cos\theta&p_y\\\\
0&0&1
\end{bmatrix}.
$$

This one matrix covers pure rotation ($\mathbf{p}=\mathbf{0}$), pure translation ($\theta=0$), and their combination. Reading $T\bar{\mathbf{q}}$ from right to left makes the order visible: **rotate first, then translate**. Unlike $R$, the full matrix $T$ is not orthogonal.

### Composition Order

For $T_a=[R_a,\mathbf{p}_a]$ and $T_b=[R_b,\mathbf{p}_b]$,

$$
T_aT_b=
\begin{bmatrix}
R_aR_b&R_a\mathbf{p}_b+\mathbf{p}_a\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

Reversing the order changes the translation term, so homogeneous transformations generally do not commute:

$$
T_aT_b\neq T_bT_a.
$$

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

With column vectors, the rightmost matrix acts first. The diagrams show why changing the order changes the final pose.


## 3D Transformations

### Principal-Axis Rotations

In 3D there are three independent principal axes. Using the right-hand convention,

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

Every proper 3D rotation still satisfies

$$
R^{-1}=R^T,
\qquad
\det R=1.
$$

The three columns of $R$ are the rotated frame's $x$-, $y$-, and $z$-axes expressed in the reference frame.

### Right-Hand Rule and Order

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/right-hand-rule.webp" alt="Right-hand rule for positive three-dimensional rotation" loading="lazy" decoding="async">
  <figcaption>Thumb along the positive axis; curled fingers give the positive rotation direction.</figcaption>
</figure>

Point the right thumb along the positive axis; the curled fingers show positive rotation. Looking along the positive axis toward the origin, positive rotation appears counterclockwise. Reversing the sign reverses the direction.

Unlike 2D rotations, rotations about different 3D axes do not commute:

$$
R_y(\phi)R_z(\theta)\neq R_z(\theta)R_y(\phi).
$$

Therefore $R_xR_yR_z$ is not an unordered set of angles. A 3D rotation sequence must specify both the multiplication order and whether the rotations use fixed/world axes or moving/body axes.

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

Applied to a homogeneous point,

$$
T\begin{bmatrix}\boldsymbol{\xi}\\\\1\end{bmatrix}
{}=
\begin{bmatrix}R\boldsymbol{\xi}+\mathbf{p}\\\\1\end{bmatrix}.
$$

Again, rotation happens first and translation second. The block structure gives a quick reading rule:

- the first three columns are the moving frame's axes expressed in the reference frame;
- the last column is the moving frame origin expressed in the reference frame;
- the final row keeps homogeneous points in the form $(x,y,z,1)^T$.

A homogeneous transform can be inverted and composed even though it is not orthogonal:

$$
T^{-1}=
\begin{bmatrix}
R^T&-R^T\mathbf{p}\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

### Absolute and Relative Composition

Let ${}^{A}T_B$ map coordinates from frame $\{B\}$ into frame $\{A\}$:

$$
${}^{A}\bar{\mathbf{p}}
{}=${}^{A}T_B\,${}^{B}\bar{\mathbf{p}}.
$$

Frame labels act like dimensional units. Valid chains have matching inner labels:

$$
${}^{i}T_k=${}^{i}T_j\,${}^{j}T_k.
$$

- **Absolute motion:** if successive transforms are expressed relative to the same fixed/world frame, pre-multiply the new transform: $C=BA$.
- **Relative motion:** if each transform is expressed relative to the current/moving frame, post-multiply: ${}^{i}T_k=${}^{i}T_j${}^{j}T_k=AB$.

This rule follows from asking which frame describes the new motion and checking that the inner labels cancel.

### Camera–Robot–World Example

The lecture uses frame $\{1\}$ for an overhead camera, frame $\{0\}$ for the robot body, and frame $\{2\}$ for the world.

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/camera-robot-frames.webp" alt="World, overhead-camera, and robot coordinate frames" loading="lazy" decoding="async">
  <figcaption>The matching inner frame labels determine the multiplication order.</figcaption>
</figure>

The two relative transforms are

$$
${}^{1}T_0=
\begin{bmatrix}
0&0&-1&1\\\\
1&0&0&0\\\\
0&-1&0&0\\\\
0&0&0&1
\end{bmatrix},
\qquad
${}^{0}T_2=
\begin{bmatrix}
0&0&-1&0\\\\
-1&0&0&1\\\\
0&1&0&0\\\\
0&0&0&1
\end{bmatrix}.
$$

The adjacent $0$ labels match, so they are right-multiplied:

$$
${}^{1}T_2
{}=${}^{1}T_0\,${}^{0}T_2
{}=
\begin{bmatrix}
0&-1&0&1\\\\
0&0&-1&0\\\\
1&0&0&-1\\\\
0&0&0&1
\end{bmatrix}.
$$

The result's first three columns express the axes of frame $\{2\}$ relative to frame $\{1\}$; its last column gives the origin of frame $\{2\}$ relative to frame $\{1\}$.

For any frame problem, use the same notebook checklist:

1. Write the source and destination frame on every point and transform.
2. Decide whether each new motion is expressed in the fixed frame or the moving frame.
3. Arrange matrices so adjacent frame labels cancel.
4. Read products from right to left to verify the physical order.
5. Check the result: the rotation block must be orthogonal with determinant $1$, and the last row must be $[0\;0\;0\;1]$.

<p class="robotics-cover-credit">Cover photo: <a href="https://commons.wikimedia.org/wiki/File:Columbia_University_-_The_Fu_Foundation_School_of_Engineering_And_Applied_Science_(48170360946).jpg">Ajay Suresh / Wikimedia Commons</a>, licensed under <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. The cover has been resized for layout.</p>
