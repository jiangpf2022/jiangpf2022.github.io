---
title: Robotics 1 - Rigid-Body Transformations
published: false
date: 2026-09-13 22:40:54
categories: COMS4773W Computational Aspects of Robotics
tags:
  - Robotics
  - Rigid-Body Transformations
  - Linear Algebra
mathjax: true
cover: "/images/robotics-1/rigid-body-transformations-cover.webp"
excerpt: "A compact formula-first guide to 2D and 3D rigid-body transformations, coordinate frames, homogeneous matrices, and composition order."
---

Rigid-body transformations let us describe the same robot or point from different coordinate frames. We use a fixed **world frame** and one or more moving **body frames**.

- The world space is $\mathcal W=\mathbb R^2$ in 2D or $\mathcal W=\mathbb R^3$ in 3D.
- A point $p\in\mathcal W$ has coordinates that depend on the chosen frame.
- A free vector, such as linear velocity, has a fixed magnitude and direction.
- A rigid-body transformation $h:\mathcal W\to\mathcal W$ preserves relative distances and orientation; it excludes scaling, shear, and reflection.

<figure class="robotics-figure robotics-figure--compact">
  <img src="/blog/images/robotics-1/frames-2d.webp" alt="A point represented relative to nested two-dimensional coordinate frames" loading="lazy" decoding="async">
  <figcaption>The same geometry can have different coordinates in different frames.</figcaption>
</figure>

## 2D Transformations

### Translation

A translation changes position without changing orientation. In two dimensions,

$$
h(x,y)=(x+x_t,\;y+y_t).
$$

In three dimensions the same rule becomes

$$
h(x,y,z)=(x+x_t,\;y+y_t,\;z+z_t).
$$

Translating the body by $(x_t,y_t)$ is equivalent to translating the reference frame by $(-x_t,-y_t)$. This body-frame duality is why the sign changes when we move the coordinate system instead of the object.

### Rotation

For a counterclockwise angle $\theta$, the planar rotation matrix is

$$
R(\theta)=
\begin{bmatrix}
\cos\theta&-\sin\theta\\\\
\sin\theta&\cos\theta
\end{bmatrix},
\qquad
\begin{bmatrix}x'\\\\y'\end{bmatrix}
{}=R(\theta)\begin{bmatrix}x\\\\y\end{bmatrix}.
$$

The notation $R(\theta)=[\,x_1\;y_1\,]$ in the reference PDF means **column concatenation**, not another transformation: $x_1=R(\theta)e_x$ and $y_1=R(\theta)e_y$ are the rotated unit axes, expressed in the world frame.

<div class="robotics-axis-derivation">

To see this explicitly, start from the world-frame unit axes

$$
e_x=\begin{bmatrix}1\\\\0\end{bmatrix},
\qquad
e_y=\begin{bmatrix}0\\\\1\end{bmatrix}.
$$

After rotation,

$$
x_1=R(\theta)e_x=
\begin{bmatrix}\cos\theta\\\\\sin\theta\end{bmatrix},
\qquad
y_1=R(\theta)e_y=
\begin{bmatrix}-\sin\theta\\\\\cos\theta\end{bmatrix}.
$$

</div>

Therefore the first column of $R(\theta)$ is the rotated $x$-axis and the second column is the rotated $y$-axis.

### Rotation Properties

A valid rotation matrix is orthogonal and has determinant $1$:

$$
R(\theta)^{-1}=R(\theta)^T=R(-\theta),
\qquad
\det R(\theta)=1.
$$

The inverse rotation is clockwise. Orthogonality preserves length, angle, area, and vector magnitude. Because all planar rotations use the same axis perpendicular to the plane, 2D rotations commute:

$$
R(\theta_1+\theta_2)
{}=R(\theta_1)R(\theta_2)
{}=R(\theta_2)R(\theta_1).
$$

### Homogeneous Coordinates

Let $q$ be a point in the body frame, $R$ the body's orientation, $p$ the body's position in the world frame, and $r$ the resulting world-frame point. The rigid-body motion is exactly

$$
r=p+Rq.
$$

This map is affine because of the translation $p$. Appending a final coordinate $1$ turns it into a linear matrix multiplication:

$$
\begin{bmatrix}r_x\\\\r_y\\\\1\end{bmatrix}
{}=
\underbrace{
\begin{bmatrix}
\cos\theta&-\sin\theta&p_x\\\\
\sin\theta&\cos\theta&p_y\\\\
0&0&1
\end{bmatrix}}_{T(\theta,p_x,p_y)}
\begin{bmatrix}q_x\\\\q_y\\\\1\end{bmatrix}.
$$

Reading the multiplication from right to left: rotate $q$ first, then translate by $p$. The matrix $T$ includes pure rotation when $p=0$ and pure translation when $\theta=0$. It is invertible and composable, but $T$ itself is not an orthogonal matrix.

### Composition Order

<div class="robotics-figure-pair">
  <figure class="robotics-figure">
    <img src="/blog/images/robotics-1/rotate-then-translate.webp" alt="Rotation followed by translation" loading="lazy" decoding="async">
    <figcaption>Rotate first, then translate.</figcaption>
  </figure>
  <figure class="robotics-figure">
    <img src="/blog/images/robotics-1/translate-then-rotate.webp" alt="Translation followed by rotation" loading="lazy" decoding="async">
    <figcaption>Translate first, then rotate.</figcaption>
  </figure>
</div>

Matrix multiplication acts from right to left. If transformation $A$ happens first and transformation $B$ happens second, then

$$
C=BA.
$$

In general the order cannot be reversed:

$$
T_1T_0\neq T_0T_1.
$$

This non-commutativity comes from the translation term: rotating a translation vector is not the same as translating after the rotation.

## 3D Transformations

### Principal-Axis Rotations

Using the right-hand convention, the three principal-axis rotations are

$$
R_z(\alpha)=
\begin{bmatrix}
\cos\alpha&-\sin\alpha&0\\\\
\sin\alpha&\cos\alpha&0\\\\
0&0&1
\end{bmatrix},
\qquad
R_y(\beta)=
\begin{bmatrix}
\cos\beta&0&\sin\beta\\\\
0&1&0\\\\
-\sin\beta&0&\cos\beta
\end{bmatrix},
$$

$$
R_x(\gamma)=
\begin{bmatrix}
1&0&0\\\\
0&\cos\gamma&-\sin\gamma\\\\
0&\sin\gamma&\cos\gamma
\end{bmatrix}.
$$

Each matrix leaves its named axis unchanged. Every proper 3D rotation satisfies

$$
R^{-1}=R^T,
\qquad
\det R=1.
$$

### Right-Hand Rule

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/right-hand-rule.webp" alt="Right-hand rule for positive three-dimensional rotation" loading="lazy" decoding="async">
  <figcaption>Thumb along the positive axis; curled fingers show positive rotation.</figcaption>
</figure>

Point the right thumb along the positive rotation axis. The curled fingers show the positive direction in the plane normal to that axis. Unlike 2D rotations, rotations about different 3D axes do not commute:

$$
R_y(\phi)R_z(\theta)\neq R_z(\theta)R_y(\phi).
$$

The multiplication order must therefore be written explicitly.

### Homogeneous Coordinates

The same motion equation remains valid in 3D:

$$
r=p+Rq,
$$

where now $p,q,r\in\mathbb R^3$ and $R\in\mathbb R^{3\times3}$. Its homogeneous matrix is

$$
T=
\begin{bmatrix}
R&p\\\\
0^T&1
\end{bmatrix}
{}=
\begin{bmatrix}
r_{11}&r_{12}&r_{13}&p_x\\\\
r_{21}&r_{22}&r_{23}&p_y\\\\
r_{31}&r_{32}&r_{33}&p_z\\\\
0&0&0&1
\end{bmatrix}.
$$

Equivalently,

$$
T\begin{bmatrix}q\\\\1\end{bmatrix}
{}=
\begin{bmatrix}Rq+p\\\\1\end{bmatrix}.
$$

The upper-left block stores orientation; the last column stores position. As in 2D, rotation is applied first and translation second. The transform is invertible and composable, but is not orthogonal.

### Frame Chains

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/camera-robot-frames.webp" alt="World camera and robot coordinate frames forming a transformation chain" loading="lazy" decoding="async">
  <figcaption>Adjacent frame labels must match before transforms can be composed.</figcaption>
</figure>

For **absolute transformations** expressed relative to the same fixed world frame, each new transformation pre-multiplies the current one. If $A$ occurs first and $B$ occurs second,

$$
C=B\cdot A.
$$

For **relative transformations** between moving frames, the frame labels determine the valid product. If ${}^{i}T_j$ maps coordinates from frame $j$ to frame $i$, and ${}^{j}T_k$ maps from frame $k$ to frame $j$, then

$$
{}^{i}T_k={}^{i}T_j\,{}^{j}T_k.
$$

The adjacent $j$ labels match, just like cancelling units. The result maps directly from frame $k$ to frame $i$.

### Summary

| Concept | 2D space | 3D space |
| --- | --- | --- |
| Vector dimension | $\mathbb R^2$ | $\mathbb R^3$ |
| Rotation matrix | $2\times2$, one angle $\theta$ | $3\times3$, axes $R_x,R_y,R_z$ |
| Do rotations commute? | Yes, one rotation axis | No, across different axes |
| Homogeneous matrix | $3\times3$ | $4\times4$ |
| Composition | Left-multiply absolute; right-multiply relative | Same rule |

**Final check:** define every frame, express quantities in compatible frames, use $r=p+Rq$ for the geometric motion, use $T$ for homogeneous composition, and always verify multiplication order.

<p class="robotics-cover-credit">Cover photo: <a href="https://commons.wikimedia.org/wiki/File:Columbia_University_-_The_Fu_Foundation_School_of_Engineering_And_Applied_Science_(48170360946).jpg">Ajay Suresh / Wikimedia Commons</a>, licensed under <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.</p>

<section class="article-attachments" aria-label="Article attachments">
  <div class="article-attachments__heading">
    <span class="article-attachments__heading-icon"><i class="fa-solid fa-paperclip" aria-hidden="true"></i></span>
    <div>
      <span class="article-attachments__eyebrow">COURSE FILES</span>
      <p class="article-attachments__title">Attachments</p>
      <p class="article-attachments__description">Download the compact review handout for offline study.</p>
    </div>
  </div>
  <div class="article-attachments__list">
    <article class="article-attachment">
      <span class="article-attachment__icon"><i class="fa-regular fa-file-pdf" aria-hidden="true"></i></span>
      <div class="article-attachment__info">
        <strong>Rigid-Body Transformations - Review Notes</strong>
        <span>PDF <b>·</b> 2 pages <b>·</b> 161 KB</span>
      </div>
      <a class="article-attachment__download" href="/blog/files/coms4773w-robotics-1-rigid-body-transformations.pdf" download="COMS4773W-Robotics-1-Rigid-Body-Transformations.pdf">
        <i class="fa-solid fa-download" aria-hidden="true"></i>
        <span>Download PDF</span>
      </a>
    </article>
  </div>
</section>
