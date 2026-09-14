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
excerpt: "A geometric and computational introduction to coordinate frames, 2D and 3D rotations, homogeneous transformations, composition order, and camera-to-robot frame conversion."
---

These notes combine the first lecture slides with the handwritten derivations and reorganize them by concept. The goal is not only to memorize transformation matrices, but to build a reliable way to reason about **which frame a quantity belongs to**, **which direction a transform maps**, and **why multiplication order matters**.

The central problem is simple to state: a robot, a camera, and the world may describe the same physical point using different coordinates. Rigid-body transformations are the language that lets those descriptions agree.


## 1. Geometry and Coordinate Frames

### World Space

Robotics usually models positions in a Euclidean workspace

$$
\mathcal{W}=\mathbb{R}^{2}\quad\text{or}\quad\mathbb{R}^{3}.
$$

A physical point exists independently of any coordinate system, but its numerical coordinates do not. If a point $P$ is represented in frame $\{A\}$, we write its coordinate vector as ${}^{A}\mathbf{p}$. The same point represented in frame $\{B\}$ generally has different numbers ${}^{B}\mathbf{p}$.

This distinction is foundational:

- **Geometric object:** the actual point, direction, or rigid body.
- **Coordinate representation:** the numbers used to describe that object relative to a chosen frame.

### Fixed and Moving Frames

A robotics system typically contains:

- a fixed **world frame**;
- one or more **body frames** attached to moving robots;
- sensor frames attached to cameras, LiDARs, or end effectors.

A frame contains an origin and an ordered set of orthonormal axes. Describing frame $\{B\}$ relative to frame $\{A\}$ therefore requires two pieces of information:

1. the position of the origin of $\{B\}$ expressed in $\{A\}$;
2. the orientation of the axes of $\{B\}$ expressed in $\{A\}$.

### Points and Free Vectors

Points and free vectors transform differently under translation.

- A **point** has a location, so both rotation and translation affect its coordinates.
- A **free vector**, such as linear velocity, force, or a direction, has magnitude and direction but no fixed origin. Translation does not affect it; only rotation does.

This difference later appears naturally in homogeneous coordinates: points use a final coordinate of $1$, while free vectors use $0$.


## 2. Rigid-Body Motion

### Definition

A rigid-body transformation is a function $h:\mathcal{W}\rightarrow\mathcal{W}$ that preserves relative distances and orientation. For any points $\mathbf{x}$ and $\mathbf{y}$ on the body,

$$
\lVert h(\mathbf{x})-h(\mathbf{y})\rVert_2
{}=
\lVert \mathbf{x}-\mathbf{y}\rVert_2.
$$

The orientation-preserving condition excludes reflections. A rigid body may translate and rotate, but it cannot stretch, shear, or become a mirror image.

### Translation

For translation by $\mathbf{t}=[t_x,t_y,t_z]^T$,

$$
h(x,y,z)=
\begin{bmatrix}
x+t_x\\
y+t_y\\
z+t_z
\end{bmatrix},
\qquad
h(\mathbf{x})=\mathbf{x}+\mathbf{t}.
$$

Translation preserves the difference between points:

$$
h(\mathbf{x})-h(\mathbf{y})
=(\mathbf{x}+\mathbf{t})-(\mathbf{y}+\mathbf{t})
=\mathbf{x}-\mathbf{y}.
$$

It can be interpreted actively as moving the body by $\mathbf{t}$, or passively as moving the coordinate frame by $-\mathbf{t}$. These two descriptions produce the same coordinates but tell different geometric stories, so the convention must be stated explicitly.

### Why Translation Is Affine

A linear map must send the origin to the origin. Translation does not:

$$
h(\mathbf{0})=\mathbf{t}\neq\mathbf{0}.
$$

Therefore $h(\mathbf{x})=R\mathbf{x}+\mathbf{t}$ is **affine**, not linear, whenever $\mathbf{t}\neq\mathbf{0}$. Homogeneous coordinates will embed this affine map into a higher-dimensional linear map.


## 3. Two-Dimensional Rotations

### Rotation Matrix

Rotating a point counterclockwise by $\theta$ about the origin gives

$$
\begin{aligned}
x' &= x\cos\theta-y\sin\theta,\\
y' &= x\sin\theta+y\cos\theta.
\end{aligned}
$$

In matrix form,

$$
\begin{bmatrix}x'\\y'\end{bmatrix}
{}=
\underbrace{
\begin{bmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{bmatrix}}_{R(\theta)}
\begin{bmatrix}x\\y\end{bmatrix}.
$$

The columns of $R(\theta)$ are the rotated $x$- and $y$-axes expressed in the original frame. This column interpretation is often more useful in robotics than viewing the matrix as a table of coefficients.

### Orthogonality

A rotation matrix has orthonormal columns:

$$
R(\theta)^T R(\theta)=I.
$$

Consequently,

$$
R(\theta)^{-1}=R(\theta)^T=R(-\theta),
\qquad
\det R(\theta)=1.
$$

Orthogonality explains why rotations preserve lengths and angles:

$$
\lVert R\mathbf{x}\rVert_2^2
=\mathbf{x}^T R^T R\mathbf{x}
=\mathbf{x}^T\mathbf{x}.
$$

The determinant condition distinguishes a proper rotation ($\det R=1$) from a reflection ($\det R=-1$).

### Composition

Two planar rotations compose by adding their angles:

$$
R(\theta_1)R(\theta_2)
=R(\theta_1+\theta_2)
=R(\theta_2)R(\theta_1).
$$

Two-dimensional rotations commute because every planar rotation uses the same axis, perpendicular to the plane. This convenient property does **not** survive in three dimensions.


## 4. Transforming Between 2D Frames

### Nested Frames

Suppose frame $\{b\}$ has translation $\mathbf{p}$ and orientation $P=R(\theta)$ relative to frame $\{s\}$. Frame $\{c\}$ has translation $\mathbf{q}$ and orientation $Q=R(\psi)$ relative to frame $\{b\}$.

<figure class="robotics-figure robotics-figure--compact">
  <img src="/blog/images/robotics-1/frames-2d.webp" alt="Nested 2D coordinate frames s, b, and c" loading="lazy" decoding="async">
  <figcaption>Three nested coordinate frames. The displacement from $\{s\}$ to $\{c\}$ is not $\mathbf{p}+\mathbf{q}$ until $\mathbf{q}$ has been rotated into frame $\{s\}$.</figcaption>
</figure>

The origin of $\{c\}$ expressed in $\{s\}$ is

$$
\mathbf{r}=\mathbf{p}+P\mathbf{q}.
$$

The multiplication $P\mathbf{q}$ is essential: $\mathbf{q}$ is originally expressed in frame $\{b\}$, so it must be rotated into frame $\{s\}$ before it can be added to $\mathbf{p}$.

### Orientation Composition

The orientation of $\{c\}$ relative to $\{s\}$ is

$$
R=PQ=R(\theta)R(\psi)=R(\theta+\psi).
$$

Expanded in coordinates,

$$
\mathbf{r}=
\begin{bmatrix}
p_x+q_x\cos\theta-q_y\sin\theta\\
p_y+q_x\sin\theta+q_y\cos\theta
\end{bmatrix}.
$$

The translation and rotation rules together already contain the structure of a homogeneous transformation.


## 5. Homogeneous Transformations

### Homogeneous Coordinates

Introduce the augmented point

$$
\bar{\mathbf{q}}=
\begin{bmatrix}\mathbf{q}\\1\end{bmatrix}.
$$

Then the affine map $\mathbf{r}=R\mathbf{q}+\mathbf{p}$ becomes a linear map in one higher dimension:

$$
\begin{bmatrix}\mathbf{r}\\1\end{bmatrix}
{}=
\underbrace{
\begin{bmatrix}
R & \mathbf{p}\\
\mathbf{0}^T & 1
\end{bmatrix}}_{T}
\begin{bmatrix}\mathbf{q}\\1\end{bmatrix}.
$$

In 2D, $T$ is $3\times3$; in 3D, it is $4\times4$.

### Points Versus Directions

The final homogeneous coordinate controls whether translation is applied:

$$
T\begin{bmatrix}\mathbf{q}\\1\end{bmatrix}
=\begin{bmatrix}R\mathbf{q}+\mathbf{p}\\1\end{bmatrix},
\qquad
T\begin{bmatrix}\mathbf{v}\\0\end{bmatrix}
=\begin{bmatrix}R\mathbf{v}\\0\end{bmatrix}.
$$

Thus points move with the frame, while free vectors only rotate.

### Special Cases and Inverse

The same matrix represents several useful cases:

- $R=I$: pure translation;
- $\mathbf{p}=\mathbf{0}$: pure rotation;
- $R=I$ and $\mathbf{p}=\mathbf{0}$: identity transform.

Unlike $R$, the complete matrix $T$ is generally not orthogonal. Its inverse is nevertheless simple:

$$
T^{-1}
{}=
\begin{bmatrix}
R^T & -R^T\mathbf{p}\\
\mathbf{0}^T & 1
\end{bmatrix}.
$$

The geometry of the inverse is “undo the translation in the correctly rotated coordinates, then undo the rotation.” Merely negating $\mathbf{p}$ is wrong unless $R=I$.


## 6. Why Transformations Do Not Commute

### Algebraic View

Let

$$
T_a=\begin{bmatrix}R_a&\mathbf{p}_a\\\mathbf{0}^T&1\end{bmatrix},
\qquad
T_b=\begin{bmatrix}R_b&\mathbf{p}_b\\\mathbf{0}^T&1\end{bmatrix}.
$$

Their product is

$$
T_aT_b
{}=
\begin{bmatrix}
R_aR_b & R_a\mathbf{p}_b+\mathbf{p}_a\\
\mathbf{0}^T & 1
\end{bmatrix}.
$$

Reversing the order produces

$$
T_bT_a
{}=
\begin{bmatrix}
R_bR_a & R_b\mathbf{p}_a+\mathbf{p}_b\\
\mathbf{0}^T & 1
\end{bmatrix},
$$

which is generally different. Even when planar rotations commute, the translation terms usually do not.

### Geometric View

Consider a $\pi/4$ rotation and a translation three units to the right. Rotating first and translating second gives a different final frame from translating first and rotating second.

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

Matrix products act on column vectors from right to left. In $T_aT_b\mathbf{x}$, $T_b$ acts first. Reading transforms in the same visual order as ordinary prose is a common source of mistakes.


## 7. Three-Dimensional Rotations

### Principal-Axis Matrices

Using the right-hand convention, rotations about the $x$, $y$, and $z$ axes are

$$
R_x(\gamma)=
\begin{bmatrix}
1&0&0\\
0&\cos\gamma&-\sin\gamma\\
0&\sin\gamma&\cos\gamma
\end{bmatrix},
$$

$$
R_y(\beta)=
\begin{bmatrix}
\cos\beta&0&\sin\beta\\
0&1&0\\
-\sin\beta&0&\cos\beta
\end{bmatrix},
\qquad
R_z(\alpha)=
\begin{bmatrix}
\cos\alpha&-\sin\alpha&0\\
\sin\alpha&\cos\alpha&0\\
0&0&1
\end{bmatrix}.
$$

Each matrix leaves its own rotation axis unchanged and rotates the perpendicular plane.

### Right-Hand Rule

Point the thumb of the right hand along the positive rotation axis. The curl of the fingers gives the positive rotation direction. Looking in the direction of the positive axis, a positive rotation is counterclockwise in the plane normal to that axis; a clockwise rotation is represented by a negative angle.

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/right-hand-rule.webp" alt="Right-hand rule for positive three-dimensional rotation" loading="lazy" decoding="async">
  <figcaption>The right-hand rule removes the ambiguity in the sign of a 3D rotation.</figcaption>
</figure>

### Rotation Group SO(3)

Every valid 3D rotation matrix belongs to

$$
SO(3)=\{R\in\mathbb{R}^{3\times3}:R^TR=I,\ \det R=1\}.
$$

Therefore $R^{-1}=R^T$, lengths and angles are preserved, and multiplying two valid rotation matrices gives another valid rotation matrix.

### Non-Commutativity in 3D

Rotations about different axes generally do not commute:

$$
R_y(\phi)R_z(\theta)\neq R_z(\theta)R_y(\phi).
$$

The first rotation changes the axes about which later body-relative rotations are interpreted. This is why an “$x$ then $y$ then $z$” convention must specify whether the axes are fixed or moving. Euler-angle conventions that omit this information are incomplete.


## 8. Three-Dimensional Homogeneous Transforms

### Matrix Structure

A 3D rigid-body transform has the form

$$
T=
\begin{bmatrix}
r_{11}&r_{12}&r_{13}&p_x\\
r_{21}&r_{22}&r_{23}&p_y\\
r_{31}&r_{32}&r_{33}&p_z\\
0&0&0&1
\end{bmatrix}
{}=
\begin{bmatrix}
R&\mathbf{p}\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

Applied to a point,

$$
T\bar{\mathbf{q}}
{}=
\begin{bmatrix}R\mathbf{q}+\mathbf{p}\\1\end{bmatrix}.
$$

The operation is always **rotation first, translation second**. The first three columns of $T$ encode the transformed frame axes; the last column encodes the transformed frame origin.

### Special Euclidean Group SE(3)

The set of 3D rigid transforms is the special Euclidean group

$$
SE(3)=
\left\{
\begin{bmatrix}R&\mathbf{p}\\\mathbf{0}^T&1\end{bmatrix}
:R\in SO(3),\ \mathbf{p}\in\mathbb{R}^3
\right\}.
$$

Calling it a group means that identity, composition, and inverse all remain inside the set. This is exactly what a robot needs for chaining many coordinate frames without leaving the space of valid rigid motions.


## 9. Frame Notation and Composition Order

### A Reliable Notation

Use ${}^{A}T_{B}$ to mean “the pose of frame $\{B\}$ expressed in frame $\{A\}$,” equivalently the matrix that maps coordinates from $\{B\}$ into $\{A\}$:

$$
{}^{A}\bar{\mathbf{p}}
{}=
{}^{A}T_{B}\,{}^{B}\bar{\mathbf{p}}.
$$

The adjacent frame labels cancel when transformations are chained:

$$
{}^{A}T_{C}
{}=
{}^{A}T_{B}\,{}^{B}T_{C}.
$$

This “frame-cancellation” rule is a practical dimensional-analysis tool. If the inner labels do not match, the multiplication is probably invalid or the notation has been reversed.

### Absolute Versus Relative Motion

Two rules from the lecture can now be stated precisely:

- **Absolute transforms expressed in a fixed world frame are pre-multiplied.** A new world-frame motion $B$ applied after pose $A$ gives $C=BA$.
- **Relative transforms expressed in the current moving frame are post-multiplied.** Moving from $i$ to $j$, then from $j$ to $k$, gives ${}^{i}T_k={}^{i}T_j{}^{j}T_k$.

The difference is not an arbitrary matrix convention. It records whether the new motion is described using the fixed axes or the moving body axes.

### A Three-Step Check

Before multiplying transforms, ask:

1. What does each transform map **from** and **to**?
2. In which frame is each translation vector expressed?
3. Is the new action relative to the world frame or the current body frame?

Writing the frame labels before doing arithmetic usually prevents more errors than rechecking the arithmetic afterward.


## 10. Camera-Robot-World Example

### Setup

Let frame $\{2\}$ be the world frame, frame $\{1\}$ an overhead camera, and frame $\{0\}$ a body frame attached to the robot.

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/camera-robot-frames.webp" alt="Geometric arrangement of the world, overhead-camera, and robot frames" loading="lazy" decoding="async">
  <figcaption>The worked example chains the robot, camera, and world coordinate frames.</figcaption>
</figure>

The first relative transform rotates about $z_1$ by $\pi/2$, rotates about $y_1$ by $-\pi/2$, and translates along $x_1$ by one unit. The lecture obtains

$$
{}^{1}T_{0}=
\begin{bmatrix}
0&0&-1&1\\
1&0&0&0\\
0&-1&0&0\\
0&0&0&1
\end{bmatrix}.
$$

The first three columns express the axes of frame $\{0\}$ in frame $\{1\}$; the last column is the origin of $\{0\}$ expressed in frame $\{1\}$.

### Second Transform

The second motion rotates about $x_0$ by $\pi/2$, rotates about $z_0$ by $-\pi/2$, and translates along $y_0$ by one unit:

$$
{}^{0}T_{2}=
\begin{bmatrix}
0&0&-1&0\\
-1&0&0&1\\
0&1&0&0\\
0&0&0&1
\end{bmatrix}.
$$

Again, every column has a geometric meaning. This is an excellent sanity check: each rotation column must have unit length, different columns must be perpendicular, and the bottom row must remain $[0,0,0,1]$.

### Chain the Frames

Both transforms are relative to the current frame, so they are right-multiplied in the frame chain:

$$
{}^{1}T_{2}
{}=
{}^{1}T_{0}\,{}^{0}T_{2}
{}=
\begin{bmatrix}
0&-1&0&1\\
0&0&-1&0\\
1&0&0&-1\\
0&0&0&1
\end{bmatrix}.
$$

Notice that ${}^{1}T_0$ is expressed relative to frame $\{1\}$, while ${}^{0}T_2$ is expressed relative to frame $\{0\}$. The adjacent $0$ labels match, so the product maps frame $\{2\}$ coordinates into frame $\{1\}$ coordinates.

### Numerical Sanity Checks

For any computed transform $T=[R,\mathbf{p};\mathbf{0}^T,1]$, verify:

$$
R^TR\approx I,
\qquad
\det R\approx1,
\qquad
TT^{-1}\approx I.
$$

In floating-point code these equalities are approximate. A small tolerance is appropriate; exact element-wise comparison is not.


## 11. Practical Reasoning Checklist

### Common Failure Modes

- Adding translation vectors written in different frames without first rotating one of them.
- Confusing the pose of $\{B\}$ in $\{A\}$ with the pose of $\{A\}$ in $\{B\}$.
- Assuming $T^{-1}$ is obtained by simply replacing $\mathbf{p}$ with $-\mathbf{p}$.
- Reading matrix products from left to right when they act on column vectors from right to left.
- Treating 3D rotations as commutative.
- Mixing fixed-axis and body-axis rotation conventions.
- Using homogeneous coordinate $1$ for a direction vector, which incorrectly adds translation.

### What to Remember

The entire lecture can be compressed into four equations:

$$
\mathbf{p}_A=R_{AB}\mathbf{p}_B+\mathbf{t}_{AB},
$$

$$
T=
\begin{bmatrix}R&\mathbf{t}\\\mathbf{0}^T&1\end{bmatrix},
$$

$$
T^{-1}=
\begin{bmatrix}R^T&-R^T\mathbf{t}\\\mathbf{0}^T&1\end{bmatrix},
$$

$$
{}^{A}T_C={}^A T_B\,{}^B T_C.
$$

The formulas are compact; the hard part is attaching the correct frame label to every matrix and vector. Once the frame semantics are correct, the algebra becomes systematic.

<p class="robotics-cover-credit">Cover photo: <a href="https://commons.wikimedia.org/wiki/File:Columbia_University_-_Low_Memorial_Library_(48170370506).jpg">Ajay Suresh / Wikimedia Commons</a>, licensed under <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. The cover has been cropped for layout.</p>
