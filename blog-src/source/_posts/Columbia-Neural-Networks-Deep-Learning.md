---
title: Neural Networks & Deep Learning - Columbia University
date: 2026-09-10 02:04:18
tags:
mathjax: True
cover: "/images/columbia-neural-networks-deep-learning-cover.png"
---

## Single-Layer Models

A single-layer model maps an input directly to an output without any hidden layers. Linear regression is the simplest example: it combines the input features linearly and adds a bias term.

### Linear Regression

For an input vector $\mathbf{x} \in \mathbb{R}^{D}$, the prediction is

$$
y = \mathbf{w}^{T}\mathbf{x} + b,
$$

where $\mathbf{w} \in \mathbb{R}^{D}$ is the weight vector and $b$ is the bias. Although the model is simple, it introduces the main ingredients that also appear in neural networks: parameters, predictions, a loss function, gradients, and an optimization rule.

### Loss Function and Cost Function

For one training example with prediction $y$ and target $t$, use the squared-error loss

$$
\mathcal{L}(y,t) = \frac{1}{2}(y-t)^2.
$$

The factor $\frac{1}{2}$ makes the derivative cleaner. For a dataset of $N$ examples, the average cost is

$$
\begin{aligned}
J(\mathbf{w},b)
&= \frac{1}{2N}\sum_{i=1}^{N}\left(y^{(i)}-t^{(i)}\right)^2 \\
&= \frac{1}{2N}\sum_{i=1}^{N}
\left(\mathbf{w}^{T}\mathbf{x}^{(i)}+b-t^{(i)}\right)^2.
\end{aligned}
$$

The loss measures the error on one example, while the cost aggregates the losses over the entire dataset.

### Vectorized Form

Stack the input examples as rows of the design matrix

$$
X =
\begin{bmatrix}
(\mathbf{x}^{(1)})^T \\
(\mathbf{x}^{(2)})^T \\
\vdots \\
(\mathbf{x}^{(N)})^T
\end{bmatrix}
\in \mathbb{R}^{N \times D}.
$$

Let $\mathbf{1} \in \mathbb{R}^{N}$ be the all-ones vector. The predictions for all examples can then be computed at once:

$$
\mathbf{y} = X\mathbf{w} + b\mathbf{1}.
$$

The cost function becomes

$$
J(\mathbf{w},b)
= \frac{1}{2N}\lVert \mathbf{y}-\mathbf{t} \rVert_2^2
= \frac{1}{2N}\lVert X\mathbf{w}+b\mathbf{1}-\mathbf{t} \rVert_2^2.
$$

Vectorization avoids writing a separate prediction equation for every example and allows efficient matrix operations.

### Partial Derivatives

For a function of multiple variables, a partial derivative measures the change with respect to one variable while keeping the others fixed. For example,

$$
\frac{\partial f}{\partial x_1}(x_1,x_2)
= \lim_{h\to 0}
\frac{f(x_1+h,x_2)-f(x_1,x_2)}{h}.
$$

For the linear regression model

$$
y = \sum_{j=1}^{D}w_jx_j+b,
$$

the local derivatives are

$$
\frac{\partial y}{\partial w_j}=x_j,
\qquad
\frac{\partial y}{\partial b}=1.
$$

### Chain Rule

The loss depends on a parameter through the prediction $y$. The chain rule therefore gives

$$
\frac{\partial \mathcal{L}}{\partial w_j}
= \frac{\partial \mathcal{L}}{\partial y}
  \frac{\partial y}{\partial w_j}
= (y-t)x_j,
$$

and

$$
\frac{\partial \mathcal{L}}{\partial b}
= \frac{\partial \mathcal{L}}{\partial y}
  \frac{\partial y}{\partial b}
= y-t.
$$

These equations show that the gradient is the prediction error multiplied by the sensitivity of the prediction to the parameter.

### Gradients over the Dataset

After averaging over all $N$ examples,

$$
\frac{\partial J}{\partial w_j}
= \frac{1}{N}\sum_{i=1}^{N}
\left(y^{(i)}-t^{(i)}\right)x_j^{(i)},
$$

and

$$
\frac{\partial J}{\partial b}
= \frac{1}{N}\sum_{i=1}^{N}
\left(y^{(i)}-t^{(i)}\right).
$$

In vector form,

$$
\nabla_{\mathbf{w}}J
= \frac{1}{N}X^T\left(X\mathbf{w}+b\mathbf{1}-\mathbf{t}\right),
$$

$$
\frac{\partial J}{\partial b}
= \frac{1}{N}\mathbf{1}^T
\left(X\mathbf{w}+b\mathbf{1}-\mathbf{t}\right).
$$

### Gradient Descent

Gradient descent repeatedly moves the parameters in the direction opposite to the gradient. For each weight,

$$
\begin{aligned}
w_j
&\leftarrow w_j-\alpha\frac{\partial J}{\partial w_j} \\
&=w_j-\frac{\alpha}{N}\sum_{i=1}^{N}
\left(y^{(i)}-t^{(i)}\right)x_j^{(i)},
\end{aligned}
$$

and the bias is updated by

$$
b \leftarrow b-\alpha\frac{\partial J}{\partial b}.
$$

The vector update is

$$
\mathbf{w} \leftarrow \mathbf{w}-\alpha\nabla_{\mathbf{w}}J.
$$

Here $\alpha$ is the learning rate and is typically small, such as $0.01$ or $0.0001$. A learning rate that is too large can overshoot the minimum, while one that is too small leads to slow convergence.

For linear regression, a direct closed-form solution is possible, but it can require a matrix inversion with roughly $O(D^3)$ cost. Gradient-based optimization is often more practical when the number of features is large, and it generalizes to models for which no closed-form solution exists.

### Polynomial Regression and Feature Maps

A model can be nonlinear in the original input while remaining linear in its parameters. For a scalar input $x$, define the polynomial feature map

$$
\boldsymbol{\phi}(x)
= \begin{bmatrix}1 & x & \cdots & x^D\end{bmatrix}^{T}.
$$

Then polynomial regression can be written as

$$
y = w_0+w_1x+\cdots+w_Dx^D
= \mathbf{w}^{T}\boldsymbol{\phi}(x).
$$

The feature map changes the representation of the input. Once the transformed features are constructed, the same linear regression loss, gradient calculations, and optimization procedure can be used.
