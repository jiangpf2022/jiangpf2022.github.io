---
title: Deep Learning 1 - Single-Layer Models
date: 2026-09-10 02:04:18
tags:
  - Linear Regression
  - Logistic Regression
  - Softmax
  - Generalization
categories: "COMS4776W Neural Networks & Deep Learning"
mathjax: True
cover: "/images/columbia-neural-networks-deep-learning-cover.png"
excerpt: "Single-layer models built from first principles: regression, vectorization, gradient descent, feature maps, generalization, logistic regression, softmax, and cross-entropy."
lesson_number: 1
lesson_level: 1
study_time: 45
---

Welcome - pull up a chair. A single-layer model is the smallest useful laboratory for deep learning. There is nowhere for the mathematics to hide: we can see exactly how an input becomes a prediction, how a loss turns an error into a number, and how a gradient tells every parameter which way to move.

We will begin with regression, where the target is a number. Then we will ask whether a richer feature map actually generalizes beyond the training set. Finally, we will reuse the same linear score for binary and multiclass classification. That progression matters: linear regression, logistic regression, and softmax regression look like separate algorithms only until we identify their shared structure.

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

The model is nonlinear as a function of the original input $x$, but still linear in the learned parameters $\mathbf w$. That distinction is important. We can make the input representation more expressive without changing the optimization machinery.

## Generalization

### Training fit is not the final goal

Suppose we observe noisy samples from a smooth curve. A constant model cannot follow the trend and a degree-one line may still miss important curvature. A degree-three polynomial might capture the broad pattern. A degree-nine polynomial may pass almost exactly through every training point while oscillating violently between them.

These are two different failure modes:

- **Underfitting:** the hypothesis class is too restricted to explain even the training data.
- **Overfitting:** the model adapts to accidental details of the training sample and performs poorly on new data.

The aim is therefore not

$$
\text{minimize training error at any cost},
$$

but rather

$$
\text{learn a rule that performs well on unseen examples from the same task}.
$$

This ability is **generalization**. A small training loss is evidence that optimization worked on the data we supplied; it is not, by itself, evidence that the learned relationship will survive outside that sample.

### Parameters and hyperparameters

The coefficients $w_0,\ldots,w_D$ are **parameters**: gradient descent or a direct solver can learn them from the training set. The polynomial degree $D$ is a **hyperparameter**: it chooses the family of functions in which training takes place. Other familiar hyperparameters include the learning rate, regularization strength, number of hidden units, and number of layers.

If we choose $D$ using the same training loss used to fit the coefficients, a sufficiently flexible model will usually look best. We therefore split the available data by role:

1. The **training set** determines model parameters.
2. The **validation set** compares hyperparameter choices and training decisions.
3. The **test set** is held back for a final, less biased estimate of performance.

The validation set is part of model development. Repeatedly adjusting a model after looking at test performance gradually turns the test set into another validation set.

> **Key idea:** optimization asks, “Which parameters fit this training objective?” Generalization asks, “Did we choose a model and training procedure whose success transfers to data we did not fit?”

## Binary Classification

### From a score to a decision

In binary classification the target is discrete, usually $t\in\{0,1\}$. We call $t=1$ the positive class and $t=0$ the negative class. A linear classifier first computes a score

$$
z=\mathbf w^\top\mathbf x+b.
$$

A hard classifier could threshold this score:

$$
\hat t=
\begin{cases}
1,&z\ge 0,\\
0,&z<0.
\end{cases}
$$

The boundary $z=0$ is a hyperplane. Points on one side receive class 1 and points on the other receive class 0. This makes a linear classifier geometrically simple, but the step function is discontinuous. Its derivative is zero almost everywhere and undefined at the jump, so classification accuracy based on this hard decision does not give gradient descent a useful direction.

### Logistic regression

Instead of optimizing the thresholded decision, logistic regression passes the logit $z$ through the sigmoid

$$
\sigma(z)=\frac{1}{1+e^{-z}}.
$$

The model is

$$
z=\mathbf w^\top\mathbf x+b,
\qquad
y=\sigma(z).
$$

Because $0<y<1$, we interpret $y$ as the model's estimate of $P(t=1\mid\mathbf x)$. The logit itself remains unbounded. Large positive logits map close to 1, large negative logits map close to 0, and $z=0$ maps to $y=0.5$.

The name *logistic regression* is historical. Despite “regression,” its usual purpose here is classification. It is also called a **log-linear** model because the log-odds are linear:

$$
\log\frac{y}{1-y}=z=\mathbf w^\top\mathbf x+b.
$$

### Cross-entropy loss

For a Bernoulli target, binary cross-entropy is

$$
\mathcal L_{\mathrm{CE}}(y,t)
=-t\log y-(1-t)\log(1-y).
$$

When $t=1$, only $-\log y$ remains; when $t=0$, only $-\log(1-y)$ remains. A confident correct prediction has loss near zero. A confident wrong prediction has very large loss. Predicting $y=0.01$ when $t=1$ is punished much more than predicting $y=0.4$, which matches the idea that unjustified confidence should be expensive.

Cross-entropy is not an arbitrary smooth replacement for accuracy. It is the negative log-likelihood of a Bernoulli model and a proper scoring rule: in expectation, the best reported probability is the true conditional probability.

The sigmoid and cross-entropy simplify beautifully. Since

$$
\frac{dy}{dz}=y(1-y),
$$

the chain rule gives

$$
\boxed{\frac{\partial\mathcal L_{\mathrm{CE}}}{\partial z}=y-t.}
$$

The same “prediction minus target” term that appeared in linear regression reappears at the logit. The weight gradient is

$$
\frac{\partial\mathcal L_{\mathrm{CE}}}{\partial\mathbf w}
=(y-t)\mathbf x,
\qquad
\frac{\partial\mathcal L_{\mathrm{CE}}}{\partial b}=y-t.
$$

This is one reason activation and loss are usually treated as a matched pair.

## Multiclass Classification

### One-of-$K$ targets and a matrix of weights

For $K$ classes, represent class $k$ as a one-hot vector

$$
\mathbf t=(0,\ldots,0,1,0,\ldots,0)^\top,
$$

with the $k$th entry equal to 1. Each class needs its own linear score. Arrange the class weight vectors as the rows of $W\in\mathbb R^{K\times D}$ and the biases in $\mathbf b\in\mathbb R^K$:

$$
z_k=\sum_{j=1}^{D}W_{kj}x_j+b_k,
\qquad
\mathbf z=W\mathbf x+\mathbf b.
$$

The components of $\mathbf z$ are **logits**. They are relative scores, not probabilities: they may be negative and need not sum to one.

### Softmax

Softmax converts the logits into a probability vector:

$$
y_k=\operatorname{softmax}(\mathbf z)_k
=\frac{e^{z_k}}{\sum_{r=1}^{K}e^{z_r}}.
$$

Every $y_k$ is positive and $\sum_k y_k=1$. When one logit greatly exceeds the others, its probability approaches one, so softmax behaves like a differentiable “soft argmax.” Adding the same constant $c$ to every logit changes nothing:

$$
\operatorname{softmax}(\mathbf z+c\mathbf 1)
=\operatorname{softmax}(\mathbf z).
$$

For numerical stability, implementations subtract $\max_k z_k$ before exponentiating. This preserves the output while preventing unnecessarily large exponentials.

For two classes, softmax depends only on the logit difference and reduces to a sigmoid. If $K=2$,

$$
P(t=1\mid\mathbf x)
=\frac{e^{z_1}}{e^{z_0}+e^{z_1}}
=\sigma(z_1-z_0).
$$

Binary logistic regression is therefore the two-class special case of multiclass logistic regression.

### Softmax cross-entropy

With a one-hot target, multiclass cross-entropy is

$$
\mathcal L_{\mathrm{CE}}(\mathbf y,\mathbf t)
=-\sum_{k=1}^{K}t_k\log y_k
=-\mathbf t^\top\log\mathbf y.
$$

Only the correct class contributes directly because only one target entry is 1. Combining softmax and cross-entropy again yields a compact derivative:

$$
\boxed{\frac{\partial\mathcal L_{\mathrm{CE}}}{\partial\mathbf z}
=\mathbf y-\mathbf t.}
$$

Consequently,

$$
\frac{\partial\mathcal L}{\partial W}
=(\mathbf y-\mathbf t)\mathbf x^\top,
\qquad
\frac{\partial\mathcal L}{\partial\mathbf b}
=\mathbf y-\mathbf t.
$$

The outer product has shape $K\times D$, exactly matching $W$. The correct-class row is adjusted to raise its logit; the other rows are adjusted according to their predicted probabilities.

## One Pattern Behind Three Models

The three single-layer models now line up:

| Task | Linear score | Activation | Loss | Logit-level error |
| --- | --- | --- | --- | --- |
| Scalar regression | $y=\mathbf w^\top\mathbf x+b$ | Identity | Squared error | $y-t$ |
| Binary classification | $z=\mathbf w^\top\mathbf x+b$ | Sigmoid | Binary cross-entropy | $y-t$ |
| Multiclass classification | $\mathbf z=W\mathbf x+\mathbf b$ | Softmax | Multiclass cross-entropy | $\mathbf y-\mathbf t$ |

Each model first forms an affine score, then uses an output transformation appropriate to the target, then compares the prediction with the target using a compatible loss. Gradient descent propagates the resulting error into the parameters.

This shared pattern is the bridge to neural networks. A multilayer network will replace the hand-designed feature map $\boldsymbol\phi(\mathbf x)$ with features learned by earlier layers. The final layer can still be the same familiar linear, sigmoid, or softmax output model.
