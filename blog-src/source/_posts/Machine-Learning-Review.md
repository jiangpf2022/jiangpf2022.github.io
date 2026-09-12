---
title: (CS182)Machine Learning Review
date: 2024-06-04 15:43:58
tags:
categories: ShanghaiTech University
mathjax: true
cover: "/images/2024-6-4-8.png"
---
## Scope of Final Exam  
$\textbf{Bayesian Decision Theory}$:   
Bayes' Decision Rule, Discriminant Functions  
$\textbf{Parameter Estimation}$:  
Maximum Likelihood Estimation, Bayesian Estimation,   Paramatric Classification, Model Selection  
$\textbf{Linear Discriminant Function}$:  
Paramatric Classification Revisited  
$\textbf{Multilayer Perceptrons}$:   
Multilayer Perceptrons  
$\textbf{SVM(Finished)}$:  
Hard-Margin SVM, Soft-Margin SVM, Kernel Extension  
$\textbf{Dimensionality Reduction(Finished)}$:  
PCA, LDA  
$\textbf{Clustering and Mixture Models(Finished)}$:  
k-Means Clustering Algorithm, EM algorithm, Use of Clustering  
$\textbf{Nonparametric Methods}$:  
Nonparametric Density Estimation, Nonparametric Classification  
$\textbf{Deep Learning Models(Finished)}$:  
CNN, RNN  
$\textbf{Ensemble Learning(Finished)}$:  
Voting, Boosting  
$\textbf{Model Assessment Selection}$  
Cross-Validation, Interval Estimation, Performance Evaluation
## Preliminaries
### Distance Measures
#### Distance between instance 
![Distance between instance ](/images/2024-6-4-5.png)  
#### Distance between groups 
![Distance between instance ](/images/2024-6-4-6.png)  
### Linear Algebra
#### Transpose 
Matrix $\mathbf{A}$ is orthogona if $\mathbf{A^T}\mathbf{A}=\mathbf{AA^T}=\mathbf{I}$ and $\mathbf{A^T}=\mathbf{A^{-1}}$
#### Inverse
$$\mathbf{A^{-1}}=\frac{[cof(\mathbf{A})^T]}{|\mathbf{A}|}$$
#### Gradient Vector
$$\nabla_x (x^Ty)=\nabla_x (y^Tx)=y$$  
$$\nabla_x(x^Tx)=2x$$  
$$\nabla_x(x^TAy)=Ay$$  
$$\nabla_x(y^TAx)=A^Ty$$  
$$\nabla_x(x^TAx)=Ax+A^Tx$$
#### Positive Semidefinite Matrices
A symmetric matrix $\mathbf{A}$ is said to be:  
positive semidefinite: $x^TAx \geq 0$ for all $x$  
positive definite: $x^TAx>0$ for all $x \neq 0$  
indefinite: both $\mathbf{A}$ and  $\mathbf{-A}$ are not positive semidefinite  
$\newline$
If $\mathbf{A=X^T X}$ and $\mathbf{X}$ is $m \times n$, with $rank(\mathbf{A})=n<m$, then $\mathbf{A}$ is positive definite. If $rank(\mathbf{A})<\min\{m,n\}$, then $\mathbf{A}$ is positive semidefinite.  
A positive definite matrix can be "factored" as $\mathbf{A}=\mathbf{T^T T}$,where $\mathbf{T}$ is a nonsingular upper triangular matrix. One way to obtain $\mathbf{T}$ is by Cholesky decomposition.
#### Eigendecomposition(Spectral Decomposition)
$$A=Q\Lambda Q^{-1}$$
where Q is a square $n \times n$ matrix whose columns are the eigenvectors of $A$ ordered in terms of decreasing eigenvalues, and $\Lambda$ is a diagonal $n \times n$ matrix whose diagonal elements are the corresponding eigenvalues.  
If $A$ is symmetric, its eigenvectors are mutually orthogonal and the eigenvalues are real. In this case, it can be written as 
$$A=Q\Lambda Q^{T}$$
#### Singular Value Decomposition
If $A$ is $m \times n$, it can be written as 
$$A=U\Sigma V^T$$ 
where $U$ is $m \times m
$ and contains the orthonormal eigenvectors of $AA^T$ in its columns, $V$ is $n \times n$ and contains the orthonormal eigenvectors of $A^T A$ in its columns, and the $m \times n$ matrix $\Sigma$ contains the $k = \min(m, n)$ singular values, $\sigma_i$ on its diagonals that are the square roots of the nonzero eigenvalues
of both $AA^T$ and $A^T A$ ; the rest of $\Sigma$ is zero.  
$$AA^T =(U\Sigma V^T )^T (U\Sigma V^T )^T =U\Sigma V^T V \Sigma^T U^T=U(\Sigma \Sigma^T)U$$
$$A^T A=(U\Sigma V^T )^T (U\Sigma V^T )=V(\Sigma^T \Sigma) V$$  
where $\Sigma \Sigma^T$ and  $\Sigma^T \Sigma$ are of different sizes but are both square and contain on
their diagonal and 0 elsewhere.
### Optimization Primer
Lagrange multipliers can transfer a problem with $d$ variables and $k$ constraints to a problem that has $d+k$ variables and no constrains.  
Standard foem problem:
$$minimize_x \quad f(x)\quad s.t.\quad g(x) \leq 0,\quad i=1,\ldots,m$$
Lagrangian 
$$L(x,\lambda)=f(x)+\lambda g(x)$$
Assume we do not consider the constraints and obtain the optimal value in point $x^*$, we have 3 situations.
$$1.g(x)<0 \quad 2.g(x)=0 \quad 3.g(x)>0 $$ 
For the first situation, the constrains is ignored and satiesfied automatically. For the second situation, we can obtain the answer by simply calculate the Lagrangian. For the third situation, we should discard the answer. And in conclusion, if $g(x)<0$, the problem can be transformed into a problem without constraint and if $g(x)=0$, we can use Lagrange multiplier. And in conclusion,
$$If \quad g(x)=0,\lambda \geq 0\\ Else \quad if \quad g(x)<0, \lambda =0$$
 And we have
 $$\lambda g(x)=0$$
 Above all, we can conclude the Karush-Kuhn-Tucker condition:
 ![Distance between instance ](/images/2024-6-6-4.png)  

## Bayesian Desicion Model
## Parameter Estimation
## Linear Discrimination
## Multilayer Perceptions
## Support Vector Machines
### Hard-Margin Support Vector Machine
Definition of hyperplane
$$w^T x+b=0$$
Definition of distance
$$r=\frac{|w^T x+b|}{||w||}$$
If the sample point can be classified properly, we have
$$w^T x_i +b \geq +1.y_i=+1$$
$$w^T x_i +b \leq -1,i_i=-1$$
![SVM_and_Margin ](/images/2024-6-11-1.png)  
Nearest points to the hyperplane are called support vector, and the sum of distance of two support vectors to the hyperplane from different class is called margin
$$\gamma =\frac{2}{||w||}$$
We want to maximize the distance, or equivalently, minimize $||w||^2$, we have
$$min_{w,b} \frac{1}{2} ||w||^2$$
$$s.t. y_i(w^T x_i+b) \geq 1$$
### Dual Problem
We have its lagrangian form
$$L(w,b,\alpha)=\frac{1}{2} ||w||^2+\sum_{i=1}^m \alpha_i(1-y_i(w^T x_i +b))$$
Calculate its derivative and we have
$$\frac{\partial{L}}{\partial w}=w-\sum_{i=1}^m \alpha_i y_i x_i \Rightarrow w=\sum_{i=1}^m \alpha_i y_i x_i$$
$$\frac{\partial{L}}{\partial b}=0-\sum_{i=1}^m \alpha_i y_i  \Rightarrow 0=\sum_{i=1}^m \alpha_i y_i $$
And we can have its dual form
$$max_{\alpha} \sum_{i=1}^m \alpha_i -\frac{1}{2} \sum_{i=1}^m \sum_{i=1}^m \alpha_i \alpha_j y_i y_j x_i^T x_j$$
$$s.t. \sum_{i=1}^m \alpha_i y_i=0$$
$$\alpha_i \geq 0$$
It should satisfy KKT conditions
$$\alpha_i \geq 0$$
$$y_i f(x_i)-1 \geq 0$$
$$ \alpha_i (y_i f(x_i)-1)=0$$
And if we have $\alpha$ calculated, we have
$$f(x)=w^T x+b =\sum_{i=1}^m \alpha_i y_i x_i^T x+b$$
where its optimal will be 
$$w=\sum_{t=1}^N \alpha_t r^t x^t=\sum_{x^t \in SV} \alpha_t r^t x^t$$
$$w_0 =r^t -W^T x^t=\frac{1}{|SV|} \sum_{x \in SV} (r^t -W^T x^t)$$
### Soft-Margin Support Vector Machine
Relaxed seperation constriants
$$y_i (w^T x_i +b) \geq 1- \epsilon_i$$
Primal optimization problem
$$min_{w,b,\epsilon_i} \frac{1}{2} ||w||^2 +C \sum_{i=1}^m \epsilon_i$$
$$s.t. y_i (w^T x_i +b) \geq 1- \epsilon_i$$
$$\epsilon_i \geq 0$$
Its lagrangian can be written as 
$$L(w,b,\alpha,\epsilon,\mu)=\frac{1}{2} ||w||^2 +C \sum_{i=1}^m \epsilon_i+\sum_{i=1}^{m} \alpha_i (1-\epsilon_i -y_i (w^T x+b))-\sum_{i=1}^m \mu_i \epsilon_i$$
Dual problem
$$max_{\alpha} \sum_{i=1}^m \alpha_i -\frac{1}{2} \sum_{i=1}^m \sum_{j=1}^m \alpha_i \alpha_j y_i y_j x_i^T x_j$$
$$s.t. \sum_{i=1}^m \alpha_i y_i=0$$
And its KKT conditions are
$$\alpha_i \geq 0$$
$$y_i f(x_i)-1+\epsilon_i \geq 0$$
$$\alpha_i (y_i f(x_i)-1+\epsilon_i)=0$$
$$\epsilon_i \geq 0$$
### kernel extension
Instead of defining a nonlinear model in the original (input) space, the problem is mapped to a new (feature) space by performing a nonlinear transformation using suitably chosen basis functions.
$$
\mathbf{z} = \phi(\mathbf{x}) \quad \text{where} \quad z_j = \phi_j(\mathbf{x}), \quad j = 1, \ldots, k
$$

$$
f(\mathbf{z}) = \mathbf{w}^T \mathbf{z} + w_0
$$

$$
f(\mathbf{x}) = \mathbf{w}^T \phi(\mathbf{x}) + b = \sum_{j=1}^{k} w_j \phi_j(\mathbf{x}) + b
$$
Similarly, we have
$$min_{w,b} \frac{1}{2} ||w||^2$$
$$s.t. y_i (w^T \phi(x_i )+b) \geq 1$$
Its dual problem is
$$max_{\alpha} \sum_{i=1}^m \alpha_i -\frac{1}{2} \sum_{i=1}^m \sum_{j=1}^m \alpha_i \alpha_j y_i y_j \phi(x_i) ^T \phi(x_j )$$
$$s.t. \sum_{i=1}^m \alpha_i y_i=0$$
$$\alpha_i \geq 0$$
Since calculating $\phi(x_i) ^T \phi(x_j )$ is difficult, we can use kernel trick to avoid this problem(calculate its value in original space)
$$k(x_i,x_j)=<\phi(x_i) , \phi(x_j )>=\phi(x_i) ^T \phi(x_j )$$
And we can rewrite the dual problem as 
$$max_{\alpha} \sum_{i=1}^m \alpha_i -\frac{1}{2} \sum_{i=1}^m \sum_{j=1}^m \alpha_i \alpha_j y_i y_j k(x_i,x_j)$$
$$s.t. \sum_{i=1}^m \alpha_i y_i=0$$
$$\alpha_i \geq 0$$
And the answer is
$$f(x)=w^T \phi(x)+b=\sum_{i=1}^m \alpha_i y_i \phi(x_i)^T \phi(x)+b=\sum_{i=1}^m \alpha_i y_i k(x,x_i)+b$$
**Polynomial kernel:**

$$
K(\mathbf{x}, \mathbf{x}') = (\mathbf{x}^T \mathbf{x}' + 1)^q
$$

where \( q \) is the degree.

E.g., when \( q = 2 \) and \( d = 2 \),

$$
\begin{aligned}
    K(\mathbf{x}, \mathbf{x}') &= (\mathbf{x}^T \mathbf{x}' + 1)^2 \\
    &= (x_1 x_1' + x_2 x_2' + 1)^2 \\
    &= 1 + 2x_1 x_1' + 2x_2 x_2' + 2x_1 x_1' x_2 x_2' + (x_1)^2 (x_1')^2 + (x_2)^2 (x_2')^2
\end{aligned}
$$

which corresponds to the inner product of the basis function

$$
\phi(\mathbf{x}) = \left(1, \sqrt{2} x_1, \sqrt{2} x_2, \sqrt{2} x_1 x_2, (x_1)^2, (x_2)^2 \right)^T
$$

When \( q = 1 \), we have the linear kernel corresponding to the original formulation.
### Support Vector Regression
<!-- The original 2024-11-18.png asset is not present in the Blog source. -->
**Minimization Problem:**

$$
\text{minimize}_{\mathbf{w}, w_0} \quad \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_t \left( |r^t - f(\mathbf{x}^t)| - \epsilon \right)_+
$$


**Primal optimization problem:**

$$
\begin{aligned}
\text{minimize}_{\mathbf{w}, w_0, \{\xi^+_t\}, \{\xi^-_t\}} \quad & \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_t (\xi^+_t + \xi^-_t) \\
\text{subject to} \quad & r^t - (\mathbf{w}^T \mathbf{x}^t + w_0) \leq \epsilon + \xi^+_t, \quad \forall t \\
& (\mathbf{w}^T \mathbf{x}^t + w_0) - r^t \leq \epsilon + \xi^-_t, \quad \forall t \\
& \xi^+_t, \xi^-_t \geq 0, \quad \forall t
\end{aligned}
$$


**Lagrangian:**

$$
\begin{aligned}
\mathcal{L}(\mathbf{w}, w_0, \{\xi^+_t\}, \{\xi^-_t\}, \{\alpha^+_t\}, \{\alpha^-_t\}, \{\mu^+_t\}, \{\mu^-_t\}) = \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_t (\xi^+_t + \xi^-_t) \\
- \sum_t \alpha^+_t \left[ \epsilon + \xi^+_t - r^t + (\mathbf{w}^T \mathbf{x}^t + w_0) \right] \\
- \sum_t \alpha^-_t \left[ \epsilon + \xi^-_t + r^t - (\mathbf{w}^T \mathbf{x}^t + w_0) \right] \\
- \sum_t (\mu^+_t \xi^+_t + \mu^-_t \xi^-_t)
\end{aligned}
$$



**Dual optimization problem:**



![PCA](/images/2024-6-11-24.png)  



$$
\text{subject to} \quad \sum_t (\alpha^+_t - \alpha^-_t) = 0
$$

$$
0 \leq \alpha^+_t \leq C, \quad \forall t
$$

$$
0 \leq \alpha^-_t \leq C, \quad \forall t
$$


**Function Representation:**

$$
f(\mathbf{x}) = \mathbf{w}^T \mathbf{x} + w_0 = \sum_{t \in SV} (\alpha^+_t - \alpha^-_t)(\mathbf{x}^t)^T \mathbf{x} + w_0
$$

## Dimentionally Reduction
### Principal Component Analysis 
We aim to fina a linear mapping from d-dimensional input space to k-dimensional with minimum information loss according to some criterion(k<<d)  
We have the scalar projection of $\mathbf{x}$ on the direction $\mathbf{w}$ s.t. $||\mathbf{w}||=1$
$$\mathbf{z}=\mathbf{w}^T \mathbf{x}$$
we want to find the component that can make the sample points the most spread out, which simply can be achieved by maximize its variance,
$$Var(z_1)=Var(w_1^T x)=E[(w_1^T x-E(w_1^T x))^2]=E[(w_1^T (x-\mu))^2]=E[w_1^T (x-\mu)(x-\mu)^T w_1]=w_1^T \Sigma w_1$$
And the goal of PCA will be 
$$max_{w_1} w_1^T \Sigma w_1\quad  s.t.||w_1||=1$$
and we can do eigenvalue decomposition to covairencematrix $XX^T$, and sort the eigenvalue. The answer to PCA is the front $d'$ eigen vectors $W^* =(w_1,w_2,\ldots w_{d'})$  
![PCA](/images/2024-6-6-1.png)   
And for choosing the detalied number of k, we can have a threshold,i.e. $t=95\%$.Then, we use this formula to choose the minimal $d'$,
$$\frac{\sum_{i=1}^{d'} \lambda_i}{\sum_{i=1}^{d} \lambda_i} \geq t$$
### Factor Analysis
The target of FA is opposite to that of PCA:  
PCA (from x to z):
$$z=W^T (x-\mu)$$  
A (from z to x – generative model):
$$x − \mu = Vz+\epsilon$$
![FA](/images/2024-6-6-2.png)
### Multiple Dimensional Scaling
We want to embed the points in a lower-dimensional space (e.g., two-dimensional space) such that the pairwise Euclidean distances in this space are as close as possible to those in the original space.  
Assuming m sample point in original space have a distance matrix $D \in \mathbb{R}^{m \times m}$, we aim at get representation of sample in $d'$ dimensional space $Z \in \mathbb{R}^{d' \times m}$, s.t. $||z_i-z_j||=dist_{ij}$(disntance in $d'$-dimensional space equals that in original space)  
Let $B=Z^T Z$, $B$ is the inner product of sample after dimensional reduction, we have
$$dist_{ij}^2=||z_i||^2+||z_j||^2-2z_i^T z_j=b_{ii}+b_{jj}-2b_{ij}$$
Centering of data to constrain the solution:
$$\sum_{i=1}^m z_i = 0$$
And it is obvious that the sum of the row and column of $B$ is zero, then
$$\sum_{i=1}^m dist_{ij}^2=tr(B)+mb_{jj}$$
$$\sum_{j=1}^m dist_{ij}^2=tr(B)+mb_{ii}$$
$$\sum_{i=1}^m \sum_{j=1}^{m} dist_{ij}^2=2m \,tr(B)$$  
Let's have  
$$dist_{i*}^2=\frac{1}{m} \sum_{j=1}^m dist_{ij}^2\quad dist_{*j}^2=\frac{1}{m} \sum_{i=1}^m dist_{ij}^2 \quad dist_{i*}^2=\frac{1}{m^2} \sum_{i=1}^m \sum_{j=1}^m dist_{ij}^2$$  
And we can obtain B by
$$b_{ij}=\frac{1}{2} (b_{ii}+b_{jj}-dist_{ij}^2)=-\frac{1}{2}(dost_{ij}^2-dist_{i*}^2-dist_{*j}^2+dist_{**}^2)$$  
Do eigenvalue decomposition to B, we have
$$B=V \Lambda V^T$$  
And let $\Lambda_{*}$ be the diagonal matrix constructed by the $d'$ eigenvalues, $V_{*}$ be the relevant eigen vector matrix, we have 
$$Z=\Lambda_{*}^{1/2}V_{*}^T \in \mathbb{R}^{d' \times m}$$
![MDS](/images/2024-6-6-3.png)
### Linear Discriminant Analysis
Goal: the classes are well-separated after projecting to a low-dimensional space by
utilizing the label information (output information).  
Let $X_i,\mu_i,\Sigma_i$ be the set, mean vector, covariance matrix of $i$-th sample set. We have the center of each class after projection $w^T \mu_0, w^T \mu_1$, and sample covariance $w^T \Sigma_0 w, w^T \Sigma_1 w$.  
We want to minimize covariance between in-class covariance
$$ w^T \Sigma_0 w+ w^T \Sigma_1 w $$ 
Also, we want to maximize the distance between center of classes
$$ ||w^T \mu_0- w^T \mu_1||_{2}^{2} $$
Then we have
$$ J=\frac{||w^T \mu_0- w^T \mu_1||_2^2}{w^T \Sigma_0 w+ w^T \Sigma_1 w}=\frac{w^T (\mu_0-\mu_1)(\mu_0-\mu_1)^T w}{w^T \Sigma_0 w+ w^T \Sigma_1 w} $$
Define within-class scatter matrix $S_w$  
$$S_w=\Sigma_0+\Sigma_1=\sum_{x\in X_0}(x-\mu_0)(x-\mu_0)^T+\sum_{x\in X_1}(x-\mu_1(x-\mu_1)^T )$$
Also, we have between-class scatter matrix
$$S_b=(\mu_0-\mu_1)(\mu_0-\mu_1)^T$$
Thus, $J$ can be rewritten as a generalized Rayleiigh quotient,
$$J=\frac{w^T S_b w}{w^T S_w w}$$
And what we want is maximize $J$. Since the solution has nothing to do with the length of $w$, without loss of generality, we have
$$min_w -w^T S_b w \quad s.t. \quad w^T S_w w=1$$
We can prove the optimal solution satisfies the following generalized eigenvalue problem:
$$\lambda(\mu_0-\mu_1)=S_b w= \lambda S_w w \Rightarrow w=S_w^{-1} (\mu_0-\mu_1)$$
For multiple classification, we can have
$$S_t=S_b+S_w=\sum_{i=1}^m (x_i-\mu)(x_i-\mu)^T, \quad S_w=\sum_{i=1}^N S_{w_i}, \quad S_b=S_t-S_w=\sum_{i=1}^N m_i(\mu_i-\mu)(\mu_i-\mu)^T$$
And our task becomes
$$max_w \frac{tr(W^T S_b W)}{W^T S_w W}$$
the solution is the eigen vector relevant to $d'$-th maximal non-zero eigenvalue of the matrix $S_w^{-1}S_b$
## Clustering and Mixture Models
### Introduction
#### Mixture(density) model
$$p(\mathbf{x})=\sum_{i=1}^k p(\mathbf{x}| g_i)P(g_i)$$
$g_i$=mixture components(clusters or groups)  
$p(\mathbf{x}| g_i)$=component densities  
$P(g_i)$=mixture proportions (priors)
#### Gaussian Mixture Model(GMM)
 $$p(\mathbf{x}| g_i)=\mathbf{N}(\mathbf{\mu}_i, \mathbf{\Sigma}_i)$$ 
 parameters $\Phi=\{P(g_i),\mathbf{\mu}_i, \mathbf{\Sigma}_i \}$
### K-Means Clustering Algorithm
![Encoder_Decoder_View](/images/2024-6-4-3.png)  
Encoding: from data point $x^{(l)}$ to the index $i$ pf a reference vector  
Decoding: from an index $i$ to the corresponding reference vector $\mathbf{m}_i$  
Each data point $x^{(l)}$ is represented by the index $i$ of the nearest refernce vector:
$$i=\arg min_j ||x^{(l)}-\mathbf{m}_j||$$
Total recontruction error
$$E(\{\mathbf{m}_i\}|X)=\sum_l \sum_i b_i^{(l)}||x^{(l)}-\mathbf{m}_j||^2$$
where
$b_i^{(l)}=1$ if $i=\arg min_j ||x^{(l)}-\mathbf{m}_j||$ and 0 otherwise.  
![K_means](/images/2024-6-4-4.png) 
### Expectation-Maximization Algorithm 
For unobserved data, we can use EM to do estimation. We call this unobserved variables $latent \,variable$.  
Let $X$ be observed variables, and $Z$ represent latent variable and $\Theta$ be model parameters, we have
$$LL(\Theta|X,Z)=ln \,P(X,Z|\Theta)$$
Since Z is latent variable, it can not be optimized directly, we can calculate the expectation of $Z$ to maximize marginal likelihood for observed variable iteratively.
$$LL(\Theta|X,Z)=ln \,P(X,Z|\Theta)=ln \sum_{Z}P(X,Z|\Theta)$$
#### E-Step
Infer the distribution of latent variables $P(Z|X,\Theta^t)$ by current parameter $\Theta^t$ and calculate its log likelihood for the expectation of $Z$
$$Q(\Theta|\Theta^t)=E_{Z|X,\Theta^t}LL(\Theta|X,Z)$$
#### M-Step
Find parameter $\Theta$ that maximize expectation likelihood, namely
$$\Theta^{t+1}=\arg max_{\Theta} Q(\Theta|\Theta^t)$$
In one word, EM calculate global optimal by caulate expectation of current parameter and find the parameter that can maximize likelihood expectation.
### Use of Clustering
#### Data Exploration
Like dimensionality reduction methods, clustering can be used for data exploration:  
Dimensionality reduction methods: find correlations between features (and thus group features).   
 Clustering methods: find similarities between instances (and thus group instances).  
Clustering allows knowledge extraction through:Number of clusters,Prior probabilities,Cluster parameters
#### Clustering as Preprocessing
After clustering, the estimated group labels may be seen as the dimensions of a new k-dimensional space.
#### Mixture of Mixtures in Classification
In classification, when each class is a mixture model composed of a number of
components, the whole density is a mixture of mixtures
$$p(\mathbf{x})=\sum_{j=1}^{k_i} p(\mathbf{x}|C_i)P(C_i)$$
withs
$$p(\mathbf{x}|C_i)=\sum_{j=1}^{k_i} p(\mathbf{x}| g_{ij})P(g_{ij})$$
### Hierarchical Clustering
![Hierarchical Clustering ](/images/2024-6-4-7.png)  
## Nonparametric Methods
## Deep Learning Models
### Deep Autoencoders
An autoencoder (AE) is a feedforward neural network for learning a compressed representation or latent representation (encoding) of the input data by learning to predict the input itself in the output.  
![Autoencoder](/images/2024-6-4-9.png)  
The hidden layer in the middle is constrained to be a narrow bottleneck (with
fewer units than the input and output layers) to ensure that the hidden units
capture the most relevant aspects of the data.
### Stacked Denoised Autoendcoder
![Denoised_Autoencoder](/images/2024-6-11-2.png)
A denoising autoencoder solves the following (regularized) optimization problem:

$$\text{minimize}_{\mathbf{W}_1, \mathbf{W}_2, \mathbf{w}_{01}, \mathbf{w}_{02}} \quad \frac{1}{2} \sum_\ell \| \mathbf{x}^\ell - \hat{\mathbf{x}}^\ell \|_2^2 + \lambda \left( \| \mathbf{W}_1 \|_F^2 + \| \mathbf{W}_2 \|_F^2 \right)$$

where

$$\begin{aligned}
    \mathbf{h}^\ell &= \sigma(\mathbf{W}_1 \tilde{\mathbf{x}}^\ell + \mathbf{w}_{01}) \\
    \hat{\mathbf{x}}^\ell &= \sigma(\mathbf{W}_2 \mathbf{h}^\ell + \mathbf{w}_{02})
\end{aligned}$$

Here $\lambda$ is a regularization parameter and $\| \cdot \|_F^2$ is a matrix norm, called the Frobenius norm, which is defined as

$$\| \mathbf{A} \|_F^2 = \sum_{i,j} a_{ij}^2 \quad \text{where} \quad \mathbf{A} = [a_{ij}] \text{ is a matrix}$$
Stacked denoising autoencoders can be formed by stacking the denoising
autoencoders in a layer-wise manner like deep autoencoders with the same
pretraining, unrolling, and fine-tuning steps.  
![Stacked_Denoised_Autoencoder](/images/2024-6-11-3.png)
### Convolutional Neural Networks
![CNN](/images/2024-6-11-4.png)
$$
s[i,j] = (x * w)[i,j] = \sum_{m=-M}^{M} \sum_{n=-N}^{N} x[i+m, j+n] w[m, n]
$$
![CNN2](/images/2024-6-11-5.png)  
Dropout is very powerful because it effectively trains and evaluates a bagged ensemble of exponentially many deep models which are sub-networks formed by removing (randomly with a dropout rate of say 0.5) units or weights (achieved simply via multiplying their values by zero) from the original CNN.
![dropout](/images/2024-6-11-5.png) 
### Recurrent Neural Networks
Recurrent neural networks (RNNs) are extensions of feedforward neural networks for handling sequential data (such as sound, time series (sensor) data, or written natural language) typically involving variable-length input or output sequences.  
There is weight sharing in an RNN such that the weights are shared across different instances of the units corresponding to different time steps.   
A classical dynamic system
$$s^{(t)}=f(s^{(t-1)},\theta)$$
![rnn-1](/images/2024-6-11-7.png)   
A more generalized form  
$$h^{(t)}=f(h^{(t-1)},x^{(t)},\theta)$$
![rnn-2](/images/2024-6-11-8.png) 
 A recurrent neuron with a scalar output  
 ![rnn-3](/images/2024-6-11-9.png)   
 A layer of recurrent neurons with a vector output  
 ![rnn-4](/images/2024-6-11-10.png) 
 $$
\mathbf{a}^{(t)} = \mathbf{b} + \mathbf{W}_1 \mathbf{h}^{(t-1)} + \mathbf{W}_2 \mathbf{x}^{(t)}
$$

$$
\mathbf{h}^{(t)} = \tanh(\mathbf{a}^{(t)})
$$

$$
\mathbf{o}^{(t)} = \mathbf{c} + \mathbf{V} \mathbf{h}^{(t)}
$$

$$
\hat{\mathbf{y}}^{(t)} = \text{softmax}(\mathbf{o}^{(t)})
$$
$$
\mathcal{L}(\mathbf{W}_1, \mathbf{W}_2, \mathbf{V}, \mathbf{b}, \mathbf{c} \mid \mathbf{x}, \mathbf{y}) = \sum_t \mathcal{L}^{(t)}(\mathbf{W}_1, \mathbf{W}_2, \mathbf{V}, \mathbf{b}, \mathbf{c} \mid \mathbf{x}^{(t)}, \mathbf{y}^{(t)})
$$

The following gradients (used by gradient-based techniques) can be computed
recursively (details ignored) like the original backpropagation algorithm:
$$
\frac{\partial \mathcal{L}}{\partial \mathbf{U}} \quad \frac{\partial \mathcal{L}}{\partial \mathbf{V}} \quad \frac{\partial \mathcal{L}}{\partial \mathbf{W}} \quad \frac{\partial \mathcal{L}}{\partial \mathbf{b}} \quad \frac{\partial \mathcal{L}}{\partial \mathbf{c}}
$$
### RNN Generalizations
Encoder-Decoder RNN
 ![rnn-5](/images/2024-6-11-11.png)   
 And there are many ways to increase the depth  
  ![rnn-6](/images/2024-6-11-12.png)     
Dependencies between Events in RNNs
  ![rnn-7](/images/2024-6-11-13.png)  
  Shortcomings of long-term RNN:1. vanish or explode of gradients.2. computationally intensive  
LSTM is based on the idea of leaky units which allow an RNN to accumulateinformation over a longer duration (e.g., we use a leaky unit to accumulate evidence for each subsequence inside a sequence).I Once the information accumulated is used (e.g., suffcient evidence has been accumulated for a subsequence), we need a mechanism to forget the old state by setting it to zero and starting to count again from scratch.  
  ![rnn-8](/images/2024-6-11-14.png)    
    ![LSTM-1](/images/2024-6-11-15.png)    
      ![LSTM-2](/images/2024-6-11-16.png)   
Total RNN
![LSTM-3](/images/2024-6-11-17.png) 
## Ensemble Learning
### Voting
![Voting](/images/2024-6-11-25.png)
### Boosting
![AdaBoost](/images/2024-6-11-19.png)   
![AdaBoost1](/images/2024-6-11-20.png)   
![AdaBoost2](/images/2024-6-11-21.png)   
![AdaBoost3](/images/2024-6-11-22.png)   
![AdaBoost4](/images/2024-6-11-23.png)   
## Model Assessment Selection
### Cross-Validation and Resampling
#### K-Fold Cross Validation
The dataset $\mathcal{X}$ is randomly partitioned into $K$ equal-sized subsets $\mathcal{X}_i$, $i = 1, \ldots, K$, called folds.

$K$ training/validation set pairs:

$$
\begin{aligned}
\mathcal{T}_1 &= \mathcal{X}_2 \cup \mathcal{X}_3 \cup \cdots \cup \mathcal{X}_K & \mathcal{V}_1 &= \mathcal{X}_1 \\
\mathcal{T}_2 &= \mathcal{X}_1 \cup \mathcal{X}_3 \cup \cdots \cup \mathcal{X}_K & \mathcal{V}_2 &= \mathcal{X}_2 \\
& \vdots & & \vdots \\
\mathcal{T}_K &= \mathcal{X}_1 \cup \mathcal{X}_2 \cup \cdots \cup \mathcal{X}_{K-1} & \mathcal{V}_K &= \mathcal{X}_K \\
\end{aligned}
$$

Any two training sets $\mathcal{T}_i$ and $\mathcal{T}_j$ ($i \neq j$) share $K - 2$ folds.
#### 5 × 2-Fold Cross-Validation

For each iteration, the dataset $\mathcal{X}$ is randomly split into two equal-sized parts, $\mathcal{X}_i^{(1)}$ and $\mathcal{X}_i^{(2)}$, which leads to a 2-fold cross-validation. With 5 iterations, we get $K = 10$ training/validation set pairs:

$$
\begin{aligned}
\mathcal{T}_1 &= \mathcal{X}_1^{(1)} & \mathcal{V}_1 &= \mathcal{X}_1^{(2)} \\
\mathcal{T}_2 &= \mathcal{X}_1^{(2)} & \mathcal{V}_2 &= \mathcal{X}_1^{(1)} \\
\mathcal{T}_3 &= \mathcal{X}_2^{(1)} & \mathcal{V}_3 &= \mathcal{X}_2^{(2)} \\
\mathcal{T}_4 &= \mathcal{X}_2^{(2)} & \mathcal{V}_4 &= \mathcal{X}_2^{(1)} \\
& \vdots & & \vdots \\
\mathcal{T}_9 &= \mathcal{X}_5^{(1)} & \mathcal{V}_9 &= \mathcal{X}_5^{(2)} \\
\mathcal{T}_{10} &= \mathcal{X}_5^{(2)} & \mathcal{V}_{10} &= \mathcal{X}_5^{(1)}
\end{aligned}
$$  
In total, we have done 5 times of 2-fold cross-validations.  
![tptn](/images/2024-6-11-26.png)  
![tptn](/images/2024-6-11-27.png)  
![tptn](/images/2024-6-11-28.png)  
![tptn](/images/2024-6-11-29.png)  
![tptn](/images/2024-6-11-30.png)  
![tptn](/images/2024-6-11-31.png)  
### Interval Estimation
Two-sided confidence interval
$$
P\left( -z_{\alpha/2} < \sqrt{N} \frac{m - \mu}{\sigma} < z_{\alpha/2} \right) = 1 - \alpha 
$$
or
$$
P\left( m - z_{\alpha/2} \frac{\sigma}{\sqrt{N}} < \mu < m - z_{\alpha/2} \frac{\sigma}{\sqrt{N}} \right) = 1 - \alpha 
$$
One-sided confidence interval
$$P\left( \sqrt{N} \frac{m - \mu}{\sigma} < z_{\alpha} \right) = 1 - \alpha $$

and

$$P\left( m - z_{\alpha} \frac{\sigma}{\sqrt{N}} < \mu \right) = 1 - \alpha $$

### Students' t-distriburion

In the previous intervals, we used \(\sigma\); that is, we assumed the variance is known. When the variance \(\sigma^2\) is not known, it can be replaced by the sample variance

$$S^2 = \frac{\sum_i (e_i - m)^2}{N - 1} $$

The statistic $(\sqrt{N} (m - \mu) / S)$ follows a *t*-distribution with (N - 1) degrees of freedom: (long proof omitted here ...)

$$ \sqrt{N} \frac{m - \mu}{S} \sim t_{N-1} $$

For any $(\alpha \in (0, 1))$ we have used the symmetry around 0 of the *t*-distribution, i.e., $$(t_{1-\alpha/2, N-1} = -t_{\alpha/2, N-1})$$,

$$ P\left( -t_{\alpha/2, N-1} < \sqrt{N} \frac{m - \mu}{S} < t_{\alpha/2, N-1} \right) = 1 - \alpha $$

or

$$ P\left( m - t_{\alpha/2, N-1} \frac{S}{\sqrt{N}} < \mu < m + t_{\alpha/2, N-1} \frac{S}{\sqrt{N}} \right) = 1 - \alpha $$

### Hypothesis Testing
We can also define a [one-sided test](https://en.wikipedia.org/wiki/One-_and_two-tailed_tests) or one-tailed test.
Null and alternative hypotheses:

$$ H_0: \mu \leq \mu_0 $$

$$ H_1: \mu > \mu_0 $$

as opposed to the two-sided test when the alternative hypothesis is \(\mu \neq \mu_0\).
The one-sided test with [level of significance](https://en.wikipedia.org/wiki/Statistical_significance) \(\alpha\) defines a 100(1 - \(\alpha\)) confidence interval bounded on one side in which \(m\) should lie for the hypothesis not to be rejected.
We fail to reject \(H_0\) with level of significance $(\alpha)$ if

$$\sqrt{N} \frac{(m - \mu_0)}{\sigma} \in (-\infty, z_\alpha) $$

Otherwise, we reject $(H_0)$ with region of rejection $((z_\alpha, \infty))$.
If the variance $(\sigma^2)$ is not known, the sample variance $(S^2)$ will be used instead and so

$$\sqrt{N} \frac{(m - \mu_0)}{S} \sim t_{N-1} $$

E.g., we can define a [two-sided t test](https://en.wikipedia.org/wiki/Student%27s_t-test):

$$ H_0: \mu = \mu_0 $$

$$H_1: \mu \neq \mu_0 $$

We fail to reject at significance level $(\alpha) $if

$$ \sqrt{N} \frac{(m - \mu_0)}{S} \in (-t_{\alpha/2, N-1}, t_{\alpha/2, N-1}) $$

[One-sided t test](https://en.wikipedia.org/wiki/One-_and_two-tailed_tests) can be defined similarly.

### Performance Evaluation
#### Test statistic:

$$ \sqrt{K} \frac{(m - p_0)}{S} \sim t_{K-1} $$ 

where

$$  m = \frac{\sum_{i=1}^{K} p_i}{K}, $$ 

$$  S^2 = \frac{\sum_{i=1}^{K} (p_i - m)^2}{K - 1}, $$ 

$$  p_i = \frac{\sum_{\ell=1}^{N} x_i^{(\ell)}}{N} $$ 

We can define a [one-sided t test](https://en.wikipedia.org/wiki/One-_and_two-tailed_tests):

$$  H_0: p \leq p_0 $$ 

$$ H_1: p > p_0 $$ 

We fail to reject at significance level $(\alpha)$ if

$$ \sqrt{K} \frac{(m - p_0)}{S} \in (-\infty, t_{\alpha, K-1}) $$

### Performance Comparation
K-Fold Cross-Validated Paired t Test
## Matrix Factorization
### Non-negative Matrix Factorization
