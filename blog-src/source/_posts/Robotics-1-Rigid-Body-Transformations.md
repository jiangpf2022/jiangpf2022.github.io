---
title: Robotics 1 - Rigid-Body Transformations
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

Rigid-body transformations describe the same body from different coordinate frames. The notebook's logic is: **define the frames, rotate into a common frame, translate, then compose in the correct order.** Here ${}^{A}\mathbf{p}$ means that point $\mathbf{p}$ is expressed in frame $\{A\}$.

## 2D Transformations

### Frames and Rigid Motion

<figure class="robotics-figure robotics-figure--compact">
  <img src="/blog/images/robotics-1/frames-2d.webp" alt="Nested two-dimensional coordinate frames" loading="lazy" decoding="async">
  <figcaption>One point, expressed in three frames.</figcaption>
</figure>

- **World space:** $\mathcal W=\mathbb R^2$ in 2D and $\mathbb R^3$ in 3D.
- **Point:** coordinates depend on the reference frame's origin and orientation.
- **Free vector:** magnitude and direction are fixed; velocity is a typical example.
- **Frame:** an origin with orthonormal axes; robots use a fixed world frame and moving body frames.

A rigid-body map $h:\mathcal W\to\mathcal W$ preserves relative distances and orientations. It excludes scaling, shear, and reflection.

### Translation

Translation changes position but not orientation:

$$
h(x,y,z)=(x+t_x,\;y+t_y,\;z+t_z).
$$

In 2D, omit $z$. Translating the body by $\mathbf t$ is equivalent to translating the reference frame by $-\mathbf t$. Because translation moves the origin, $\mathbf r=\mathbf p+\mathbf q$ is affine rather than linear.

### Rotation

A counterclockwise planar rotation is

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

The columns of $R=[\,\mathbf x_1\ \mathbf y_1\,]$ are the rotated frame axes expressed in the original frame. Hence

$$
R(\theta)^{-1}=R(\theta)^T=R(-\theta),
\qquad \det R(\theta)=1.
$$

There is only one planar rotation axis, so

$$
R(\theta_1)R(\theta_2)=R(\theta_1+\theta_2)=R(\theta_2)R(\theta_1).
$$

### Homogeneous Form

If frame $\{b\}$ has position $\mathbf p$ and orientation $R$ relative to $\{s\}$, then

$$
{}^{s}\mathbf r=\mathbf p+R\,{}^{b}\mathbf q.
$$

Appending $1$ combines rotation and translation into one linear map:

$$
\begin{bmatrix}{}^{s}\mathbf r\\\\1\end{bmatrix}
{}=
\underbrace{
\begin{bmatrix}
R&\mathbf p\\\\
\mathbf{0}^T&1
\end{bmatrix}}_{T}
\begin{bmatrix}{}^{b}\mathbf q\\\\1\end{bmatrix},
\qquad
T(\theta,p_x,p_y)=
\begin{bmatrix}
\cos\theta&-\sin\theta&p_x\\\\
\sin\theta&\cos\theta&p_y\\\\
0&0&1
\end{bmatrix}.
$$

Rotation acts first, then translation. $T$ includes pure rotation ($\mathbf p=0$) and pure translation ($\theta=0$); it is invertible and composable, but is not itself orthogonal.

### Composition Order

<div class="robotics-figure-pair">
  <figure class="robotics-figure">
    <img src="/blog/images/robotics-1/rotate-then-translate.webp" alt="Rotation followed by translation" loading="lazy" decoding="async">
    <figcaption>Rotate, then translate.</figcaption>
  </figure>
  <figure class="robotics-figure">
    <img src="/blog/images/robotics-1/translate-then-rotate.webp" alt="Translation followed by rotation" loading="lazy" decoding="async">
    <figcaption>Translate, then rotate.</figcaption>
  </figure>
</div>

For $T_a=[R_a,\mathbf p_a;\mathbf{0}^T,1]$ and $T_b=[R_b,\mathbf p_b;\mathbf{0}^T,1]$,

$$
T_aT_b=
\begin{bmatrix}
R_aR_b&R_a\mathbf p_b+\mathbf p_a\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

The rightmost transform acts first. Reversing the order changes the translation term, so $T_aT_b\neq T_bT_a$.

## 3D Transformations

### Principal-Axis Rotations

Using the right-hand convention,

$$
R_z(\alpha)=
\begin{bmatrix}
\cos\alpha&-\sin\alpha&0\\\\
\sin\alpha&\cos\alpha&0\\\\
0&0&1
\end{bmatrix},
\quad
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

Every proper 3D rotation satisfies $R^{-1}=R^T$ and $\det R=1$; its columns are the moving frame's axes expressed in the reference frame.

### Right-Hand Rule

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/right-hand-rule.webp" alt="Right-hand rule for positive rotation" loading="lazy" decoding="async">
  <figcaption>Thumb: positive axis. Fingers: positive rotation.</figcaption>
</figure>

Point the right thumb along the positive axis; curled fingers give the positive direction. Unlike 2D,

$$
R_y(\phi)R_z(\theta)\neq R_z(\theta)R_y(\phi),
$$

so a 3D rotation sequence must state its multiplication order.

### Homogeneous Form

A 3D pose is a $4\times4$ homogeneous transform:

$$
T=
\begin{bmatrix}
R&\mathbf p\\\\
\mathbf{0}^T&1
\end{bmatrix}
{}=
\begin{bmatrix}
r_{11}&r_{12}&r_{13}&p_x\\\\
r_{21}&r_{22}&r_{23}&p_y\\\\
r_{31}&r_{32}&r_{33}&p_z\\\\
0&0&0&1
\end{bmatrix},
\qquad
T\begin{bmatrix}\mathbf q\\\\1\end{bmatrix}
{}=\begin{bmatrix}R\mathbf q+\mathbf p\\\\1\end{bmatrix}.
$$

The first three columns encode orientation and the last column encodes position. Its inverse is

$$
T^{-1}=
\begin{bmatrix}
R^T&-R^T\mathbf p\\\\
\mathbf{0}^T&1
\end{bmatrix}.
$$

### Transform Chains

<figure class="robotics-figure robotics-figure--small">
  <img src="/blog/images/robotics-1/camera-robot-frames.webp" alt="World camera and robot coordinate frames" loading="lazy" decoding="async">
  <figcaption>Compose only when the inner frame labels match.</figcaption>
</figure>

- **Absolute motion:** if each motion is specified in the fixed world frame, pre-multiply; if $A$ acts first and $B$ second, $C=BA$.
- **Relative motion:** if each motion is specified in the current moving frame, post-multiply:

$$
{}^{i}T_k={}^{i}T_j\,{}^{j}T_k.
$$

Frame labels behave like units: the adjacent $j$ labels cancel, leaving a transform from $k$ to $i$.

### Quick Reference

| Concept | 2D | 3D |
| --- | --- | --- |
| Space | $\mathbb R^2$ | $\mathbb R^3$ |
| Rotation | $2\times2$, one angle | $3\times3$, axes $R_x,R_y,R_z$ |
| Commutes? | Yes, one axis | No, across axes |
| Homogeneous $T$ | $3\times3$ | $4\times4$ |
| Composition | Pre-multiply absolute; post-multiply relative | Same rule |

**Checklist:** label every frame; express vectors in a common frame; use $T$ to combine $R$ and $\mathbf p$; verify $R^TR=I$ and $\det R=1$; match adjacent frame labels before multiplying.

<p class="robotics-cover-credit">Cover photo: <a href="https://commons.wikimedia.org/wiki/File:Columbia_University_-_The_Fu_Foundation_School_of_Engineering_And_Applied_Science_(48170360946).jpg">Ajay Suresh / Wikimedia Commons</a>, licensed under <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.</p>
