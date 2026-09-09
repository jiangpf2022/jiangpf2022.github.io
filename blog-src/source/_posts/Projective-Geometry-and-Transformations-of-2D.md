---
title: Projective Geometry and Transformations of 2D
date: 2024-07-14 10:17:55
tags:
categories: Multi-View Geometry
mathjax: true
cover: "/images/2024-7-14-15.png"
---
## Planar Geometry
## The 2D Projective Plane
### Points and Lines
 Result 2.1: The point $x$ lies on the line $l$ if and only if $x^T l = 0$.  
 Result 2.2: The intersection of two lines $x= l \times l'$  
 Result 2.3: The line determined by two points is $l=x\times x'$  
 Result 2.6: Duality principle. To any theorem of 2-dimensional projective geometry there corresponds a dual theorem, which may be derived by interchanging the roles of points and lines in the original theorem.  

Equation of a conic:
$$a x^2 +bxy+cy^2+dx+ey+f=0$$
Homogenizing this by replacement $x \rightarrow \frac{x_1}{x_3}$,$y \rightarrow \frac{x_2}{x_3}$, we have
$$
ax_1^2 + bx_1x_2 + cx_2^2 + dx_1x_3 + ex_2x_3 + fx_3^2 = 0 
$$
And its matrix form:
$$x^T Cx=0$$
where C is defined as follows,
$$
\mathbf{C} = 
\begin{bmatrix}
a & \frac{b}{2} & \frac{d}{2} \\
\frac{b}{2} & c & \frac{e}{2} \\
\frac{d}{2} & \frac{e}{2} & f
\end{bmatrix} 
$$

Five points determines a conic,

$$
\begin{pmatrix}
x_i^2 & x_i y_i & y_i^2 & x_i & y_i & 1
\end{pmatrix}
\mathbf{c} = 0
$$
And we have, 
$$
\begin{pmatrix}
x_1^2 & x_1 y_1 & y_1^2 & x_1 & y_1 & 1 \\
x_2^2 & x_2 y_2 & y_2^2 & x_2 & y_2 & 1 \\
x_3^2 & x_3 y_3 & y_3^2 & x_3 & y_3 & 1 \\
x_4^2 & x_4 y_4 & y_4^2 & x_4 & y_4 & 1 \\
x_5^2 & x_5 y_5 & y_5^2 & x_5 & y_5 & 1
\end{pmatrix}
\mathbf{c} = 0
$$

Result 2.7: The line l is tangent to C at a point x on C is given by l = Cx.  

## Projective Transformations
### transformation of conics
Result 2.13. Under a point transformation $x' = Hx$, a conic $C$ transforms to $C'= H^{−T} C H^{−1}$.  
proof:

$$ x^T C x =0\\ (H^{-1}x)^T C (H^{-1}x)=0 \\ x^{T} H^{-T} C H^{-1} x=0 \\ C=H^{-T} C H^{-1}$$

Dual conic shares the same conclusion.

## A Hierarchy of Transformation

### Decomposition of Projective Transformation  

A projective transformation can be decomposed to a series of transformations, where each transformation offers one unique transform different to the former one.   

![Decomposition](/images/2024-7-14-4.png) 

![Hierarchy of Transformations](/images/2024-7-14-1.png) 

## The projective geometry of 1D
### Cross Ratio  
  
$$
\text{Cross}(\bar{x}_1, \bar{x}_2, \bar{x}_3, \bar{x}_4) = \frac{|\bar{x}_1 \bar{x}_2||\bar{x}_3 \bar{x}_4|}{|\bar{x}_1 \bar{x}_3||\bar{x}_2 \bar{x}_4|} 
$$  
  
![crossratio](/images/2024-7-14-5.png) 

## Recovery of affine and metric properties from images

### The Line at Infinity   

Result 2.17. The line at infinity, $l_{\infty}$, is a fixed line under the projective transformation $H$ if and only if $H$ is an affinity.  
![crossratio](/images/2024-7-14-6.png) 

### Recovery of affine properties from images  

Once $l_{\infty}$ is identified a length ratio on a line may be computed from the cross ratio of the three points specifying the lengths together with the intersection of the line with l∞(which provides the fourth point for the cross ratio), and so forth.  
![affine rectification](/images/2024-7-14-2.png)   
Affine properties of the first plane can be measured from the third, i.e. the third plane is within an affinity of the first.
  ![affine rectification](/images/2024-7-14-3.png)  

### The circular points and their dual
Initially, if the conic is a circle, we have
$$
x_1^2 + x_2^2 + dx_1 x_3 + e x_2 x_3 + fx_3^2 =0
$$
The conic intersects $l_{\infty}$ at the circular points, where $x_3 =0$, we have
$$
x_1^2 + x_2^2 =0
$$
And we have Algebraically, the circular points are the orthogonal directions of Euclidean geometry, $(1, 0, 0)^T$ and $(0, 1, 0)^T$, packaged into a single complex conjugate entity,

$$
\mathbf{I} = \begin{pmatrix}
1 \\
i \\
0 
\end{pmatrix}
\quad  \quad
\mathbf{J} = \begin{pmatrix}
1 \\
-i \\
0 
\end{pmatrix}.
$$
eg.
$$
\mathbf{I} = \begin{pmatrix} 1, 0, 0 \end{pmatrix}^\top + i \begin{pmatrix} 0, 1, 0 \end{pmatrix}^\top.
$$

The conic dual to the circular points is
$$
C_{\infty}^{*}=IJ^T +JI^T 
$$
and we have  
  ![affine rectification](/images/2024-7-14-7.png)  

Result 2.22. The dual conic $C_{\infty}^{*}$ is fixed under the projective transformation $H$ if and only if $H$ is a similarity.

### Angles on the projective plane
  ![affine rectification](/images/2024-7-14-8.png)  
    ![affine rectification](/images/2024-7-14-9.png)  

Result 2.23. Once the conic $C_{\infty}^{*}$ is identified on the projective plane then Euclidean angles may be measured by the formula above.  
Proof.  

$$
\mathbf{l}^\top \mathbf{C}_\infty^* \mathbf{m} \mapsto \mathbf{l}^\top \mathbf{H}^{-1} \mathbf{H} \mathbf{C}_\infty^* \mathbf{H}^\top \mathbf{H}^{-\top} \mathbf{m} = \mathbf{l}^\top \mathbf{C}_\infty^* \mathbf{m}.
$$
  
Result 2.24. Lines $l$ and $m$ are orthogonal if $l^TC_{\infty}^{*} m$ = 0.
### Recovery of metric properties from images
According to Result 2.24, we have  
   ![affine rectification](/images/2024-7-14-10.png)  
which means that the projective (v) and affine (K) components are determined directly from the image of $C_{\infty}^{*} $ , but (since $C_{\infty}^{*} $ is invariant to similarity transformation by result 2.22) the similarity component is undetermined.  
Result 2.25. Once the conic $C_{\infty}^{*} $ is identified on the projective plane then projective distortion may be rectified up to a similarity.  
As a matter of fact, by using SVD, we have  
   ![affine rectification](/images/2024-7-14-11.png)   
then by inspection from (2.23) the rectifying projectivity is H = U up to a similarity.
### Metric rectification I  
Suppose the lines $l'$, $m'$ in the affinely rectified image correspond to an orthogonal line pair $l$, $m$ on the world plane. From result 2.24 $l^TC_{\infty}^{*} m  $= 0, and using (2.23) with v = 0, we have    
   ![affine rectification](/images/2024-7-14-12.png)    
Here, $S$ is a symmetric matrix where $S=KK^T $. The orthogonality condition reduces  the equation which may be written as   
   ![affine rectification](/images/2024-7-14-13.png)  
And we can get $S$ from the equation, futhermore $K$ by using Cholesky Decomposition.
## More properties of conics
   ![affine rectification](/images/2024-7-14-14.png)   
   A conic is an (a) ellipse, (b) parabola, or (c) hyperbola; according to whether it (a) has no real intersection, (b) is tangent to (2-point contact), or (c) has 2 real intersections with $l_{\infty}$ . Under an affine transformation $l_{\infty}$ is a fixed line, and intersections are preserved.
Thus this classification is unaltered by an affinity.
### Conclusions
1.use the vanishing line to recover affine properties from images  
2.use metric information on the plane, such as right angles, to recover the metric geometry.