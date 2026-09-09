---
title: Projective Geometry and Transformations of 3D
date: 2024-07-14 16:11:33
tags:
password: hello
wrong_pass_message: Please contact the author for the password.
published: false
---
## Representing and transforming planes, lines and quadrics
{% notel  Duality %}  
In $IP^3$, points and planes are dual, and lines are dual to itself.  
{% endnotel%}  
### Planes
A plane can be represented by
$$
\pi_1 X_1 + \pi_2 X_2 +\pi_3 X_3 +\pi_4 X_4 =0
$$
and we homogenizing it by $X \rightarrow X_1/X_4$,$Y \rightarrow X_2/X_4$,$Z \rightarrow X_3/X_4$, we have
$$
\pi^T X=0
$$
which expresses that the point $X$ is in the plane $\pi$.  
Using inhomogeneous notations, we can write the equation as
$$
n^T \tilde{X} +d =0
$$
where $n=(n_1,n_2,n_3)^T$,$\tilde{X}=(X,Y,Z)^T$ with $X_4=1$ and $d=\pi_4$, and the distance between the origin to the plnae is $d/||n||$.


