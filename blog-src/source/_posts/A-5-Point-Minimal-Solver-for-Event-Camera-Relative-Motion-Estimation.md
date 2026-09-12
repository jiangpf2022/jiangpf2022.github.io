---
title: Reading:A 5-Point Minimal Solver for Event Camera Relative Motion Estimation
date: 2024-06-02 22:26:25
tags:
categories: Paper Reading
mathjax: true
cover: "/images/2024-6-4-2.png"
---
Original Paper Link:[Paper](https://arxiv.org/pdf/2309.17054 "Click here to view original paper")  
Paper Auther: Ling Gao* ,Hang Su* ,Daniel Gehrig, Marco Cannici, Davide Scaramuzza, Laurent Kneip
## Preliminaries
![Incidence_Relationship](/images/2024-6-4.png)
### Plucker Coordinates
A Line **L** can be represented by its direction vector **d** and a point **P**   
$$[ \mathbf{d}^T \, \mathbf{m}^T ]^T=[ \mathbf{d}^T \, (\mathbf{P} \times \mathbf{d})^T ]^T$$  
For two nonparallel lines $\mathbf{L_1}=[ \mathbf{d}_1^T \, \mathbf{m}_1^T ]^T$ and $\mathbf{L_2}=[ \mathbf{d}_2^T \, \mathbf{m}_2^T ]^T$, we have  
$$<\mathbf{d}_1,\mathbf{m}_2>+<\mathbf{d}_2,\mathbf{m}_1>=0$$
### Event-based Data Notations
Consider data in $t \in [t_s-\Delta t,t_s+\Delta t]$, the observed events are given by $\epsilon =\{\epsilon_i\}$, where $j$-th event of the $i$-th cluster $$e_{ij}=\{u_{ij},v_{ij},t_{ij},p_{ij}\}$$
Function here projects points $\mathbf{P} \in \mathbb{R}^3$ defined in the camera frame into the image frame
$$[u \, v]^T=\pi(\mathbf{P})$$
Converesely have
$$\mathbf{f}=\pi^{-1} (u,v)$$
And $\mathbf{v}$ represents the translational velocity and $\mathbf{\omega}$ represents the rotational velocity.
## Incidence Relationship
Camera center at time $t_{ij}$
$$C[t_{ij}]=v · (t_{ij}-t_s) $$
Rotation from camera frame to reference frame
$$R[t_{ij}]=\exp(\lfloor \omega \rfloor \times (t_{ij}-t_s))$$
And we also have
$$\mathbf{f_{ij}}=\pi^{-1} (u_{ij},v_{ij})$$
Therefore, the ray can be described in plucker coordinates
$$\left( \left[ \mathbf{R}[t_{ij}] \mathbf{f}_{ij} \right]^{\top} \left( \mathbf{C}[t_{ij}] \times \left( \mathbf{R}[t_{ij}] \mathbf{f}_{ij} \right) \right) \right)^{\top}
$$
And the property of Plucker coordinates can be written as 
$$\left\langle \mathbf{d}_i , \mathbf{C}[t_{ij}] \times \left( \mathbf{R}[t_{ij}] \mathbf{f}_{ij} \right) \right\rangle + \left\langle \mathbf{R}[t_{ij}] \mathbf{f}_{ij} , \mathbf{m}_i \right\rangle = 0
$$
Then, we assume the rotational velovity can be obtained by IMUs, we have
$$\left\langle \mathbf{d}_i , \left( \mathbf{v} \cdot t'_{ij} \right) \times \mathbf{f}'_{ij} \right\rangle + \left\langle \mathbf{f}'_{ij} , \mathbf{m}_i \right\rangle = 0,
$$
## Transition to Minimal Form
There are two points in the reference frame
$$\mathbf{P}_a = \left[ -1, y_a, z_a \right]^{\top}, \quad \mathbf{P}_b = \left[ 1, y_b, z_b \right]^{\top}.
$$
And we define the base of three new directions
$$\mathbf{e}_1^{\ell} = \mathbf{P}_b - \mathbf{P}_a, \quad \mathbf{e}_2^{\ell} = \mathbf{P}_b \times \mathbf{P}_a, \quad \mathbf{e}_3^{\ell} = \mathbf{e}_1^{\ell} \times \mathbf{e}_2^{\ell}.
$$
Since the velocity in x directions cannot be observed, we have
$$\mathbf{v} = \left[ \mathbf{e}_1^{\ell} \quad \mathbf{e}_2^{\ell} \quad \mathbf{e}_3^{\ell} \right] \cdot \left[ 0 \quad v_y^{\ell} \quad v_z^{\ell} \right]^{\top} = \mathbf{R}_{\ell} \mathbf{v}_{\ell}.
$$
Using new parameters, the incidence relationship changes into 
$$t'_j \left( \mathbf{P}_b - \mathbf{P}_a \right)^{\top} \left( \left( \mathbf{R}_{\ell} \mathbf{v}_{\ell} \right) \times \mathbf{f}'_j \right) - \mathbf{f}'_{j} {}^{T}(P_b \times P_a)=0  
$$
## Five Point Minimal Solver
To remove the scale invariance, an additional constraint on the scale is added. Given that only the structure parameters are affected by the scale invariance, the scale constraint needs to include the related variables. We constrain the scale by adding the equation
$$\left( \mathbf{R}_{\ell} \mathbf{v}_{\ell} \right)^{\top} \cdot \mathbf{R}_{\ell} \mathbf{v}_{\ell} - 1 = 0.
$$
Our velocity can be represented as
$$\mathbf{v} = \mathbf{e}_{1i}^{\ell} \cdot \kappa_i + \mathbf{e}_{2i}^{\ell} \cdot v_{yi}^{\ell} + \mathbf{e}_{3i}^{\ell} \cdot v_{zi}^{\ell}.
$$
By multiplying the equation from the left, we have
$$\begin{cases}
\mathbf{e}_{2i}^{\ell \top} \mathbf{v} = \mathbf{e}_{2i}^{\ell \top} \mathbf{e}_{1i}^{\ell} \cdot \kappa_i + \mathbf{e}_{2i}^{\ell \top} \mathbf{e}_{2i}^{\ell} \cdot v_{yi}^{\ell} + \mathbf{e}_{2i}^{\ell \top} \mathbf{e}_{3i}^{\ell} \cdot v_{zi}^{\ell} \\
\mathbf{e}_{3i}^{\ell \top} \mathbf{v} = \mathbf{e}_{3i}^{\ell \top} \mathbf{e}_{1i}^{\ell} \cdot \kappa_i + \mathbf{e}_{3i}^{\ell \top} \mathbf{e}_{2i}^{\ell} \cdot v_{yi}^{\ell} + \mathbf{e}_{3i}^{\ell \top} \mathbf{e}_{3i}^{\ell} \cdot v_{zi}^{\ell}
\end{cases}
\Leftrightarrow
\begin{cases}
\mathbf{e}_{2i}^{\ell \top} \mathbf{v} = \left\| \mathbf{e}_{2i}^{\ell} \right\|_2^2 \cdot v_{yi}^{\ell} \\
\mathbf{e}_{3i}^{\ell \top} \mathbf{v} = \left\| \mathbf{e}_{3i}^{\ell} \right\|_2^2 \cdot v_{zi}^{\ell}
\end{cases}
\Leftrightarrow
\begin{cases}
\left\| \mathbf{e}_{2i}^{\ell} \right\|_2^{-2} \cdot \mathbf{e}_{2i}^{\ell \top} \mathbf{v} = v_{yi}^{\ell} \\
\left\| \mathbf{e}_{3i}^{\ell} \right\|_2^{-2} \cdot \mathbf{e}_{3i}^{\ell \top} \mathbf{v} = v_{zi}^{\ell}
\end{cases}.
$$
And we make it into matrix form,
$$\begin{bmatrix}
\left\| \mathbf{e}_{21}^{\ell} \right\|_2^{-2} \cdot \mathbf{e}_{21}^{\ell \top} & -v_{y1}^{\ell} & \cdots & 0 \\
\left\| \mathbf{e}_{31}^{\ell} \right\|_2^{-2} \cdot \mathbf{e}_{31}^{\ell \top} & -v_{z1}^{\ell} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
\left\| \mathbf{e}_{2N}^{\ell} \right\|_2^{-2} \cdot \mathbf{e}_{2N}^{\ell \top} & 0 & \cdots & -v_{yN}^{\ell} \\
\left\| \mathbf{e}_{3N}^{\ell} \right\|_2^{-2} \cdot \mathbf{e}_{3N}^{\ell \top} & 0 & \cdots & -v_{zN}^{\ell}
\end{bmatrix}
\begin{bmatrix}
\mathbf{v} \\
\lambda_1 \\
\vdots \\
\lambda_N
\end{bmatrix} = 0.
$$
We denote it as
$$[A\quad B][...]=0$$
By multiplying $[A \quad B]^T $ in the left, we have
$$\begin{bmatrix}
\mathbf{U} & \mathbf{W} \\
\mathbf{W}^{\top} & \mathbf{V}
\end{bmatrix}
\begin{bmatrix}
\mathbf{v} \\
\lambda_1 \\
\vdots \\
\lambda_N
\end{bmatrix} = 0, \quad \text{where}
$$
Applying the Schur complement trick, we easily obtain
$$\left[ \mathbf{U} - \mathbf{W} \mathbf{V}^{-1} \mathbf{W}^{\top} \right] \mathbf{v} = 0,
$$
