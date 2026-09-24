---
title: Deep Learning 2 - Multilayer Perceptrons
date: 2026-09-24 14:00:00
categories: "COMS4776W Neural Networks & Deep Learning"
tags:
  - Multilayer Perceptrons
  - Activation Functions
  - Feature Learning
  - Universal Approximation
mathjax: true
cover: "/images/columbia-neural-networks-deep-learning-cover.png"
excerpt: "Why linear classifiers fail on XOR, how multilayer perceptrons learn nonlinear features, what activation functions contribute, and what universal approximation does—and does not—guarantee."
lesson_number: 2
lesson_level: 1
study_time: 45
---

Welcome back - pull up a chair. In [Deep Learning 1](/blog/2026/09/10/Columbia-Neural-Networks-Deep-Learning/), every prediction came from one affine transformation. That gave us regression, logistic regression, and softmax regression, but it also left us with a hard limitation: one linear classifier can draw only one hyperplane.

Today we will break that limitation. We will begin with XOR, prove why no straight boundary can solve it, and then build a network that learns a new representation in which the same problem becomes easy. That shift—from choosing features by hand to learning them—is the real beginning of deep learning.

## Why One Linear Boundary Is Not Enough

### XOR and linear separability

The XOR function returns 1 when exactly one of its two binary inputs is 1:

| $x_1$ | $x_2$ | XOR target $t$ |
| ---: | ---: | ---: |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

The positive points $(0,1)$ and $(1,0)$ occupy opposite corners of the square; the negative points $(0,0)$ and $(1,1)$ occupy the other two. No line can place both positives on one side while placing both negatives on the other. XOR is **not linearly separable**.

We can make that statement precise with convexity. A set $S$ is convex when every line segment between two points in the set remains in the set:

$$
\mathbf x_1,\mathbf x_2\in S
\quad\Longrightarrow\quad
\lambda\mathbf x_1+(1-\lambda)\mathbf x_2\in S,
\qquad 0\le\lambda\le1.
$$

A linear classifier divides space into two half-spaces, and each half-space is convex. If both positive XOR examples lie in the positive half-space, their midpoint must also lie there:

$$
\frac12(0,1)+\frac12(1,0)=\left(\frac12,\frac12\right).
$$

If both negative examples lie in the negative half-space, their midpoint must lie there too:

$$
\frac12(0,0)+\frac12(1,1)=\left(\frac12,\frac12\right).
$$

The same point cannot belong exclusively to both sides. This contradiction proves that no linear threshold rule solves XOR.

### A broader invariance problem

The problem is not limited to four toy points. Imagine representing a small binary image directly by its pixels and asking a classifier to distinguish two patterns at every wrap-around translation. If every translation of pattern A has the same average pixel vector as every translation of pattern B, convexity creates the same contradiction: a linear separator would be forced to assign the shared average to both classes.

This matters because vision often requires **translation invariance**. A pattern should retain its identity when it moves. Raw pixels do not automatically give a linear classifier the features required to express that rule.

> **Key idea:** a linear model is not weak because optimization failed. It is weak because the correct decision function may not exist anywhere in its hypothesis class.

## Feature Maps: A Temporary Escape Hatch

As in polynomial regression, we can manually transform the input. For XOR, consider

$$
\boldsymbol\psi(\mathbf x)
=\begin{bmatrix}x_1\\x_2\\x_1x_2\end{bmatrix}.
$$

The interaction feature $x_1x_2$ distinguishes the corner $(1,1)$ from the two positive corners. One valid hard-threshold construction is

$$
z=x_1+x_2-2x_1x_2-\frac12,
\qquad
\hat t=\mathbb{1}[z\ge0].
$$

Checking all four inputs shows that this rule implements XOR. In the transformed feature space, the target is linearly separable.

But this is not a general solution. Someone had to know that $x_1x_2$ was the useful feature. For images, language, or other high-dimensional data, the relevant interactions may be numerous, hierarchical, and hard to anticipate. Hand-designed feature maps move the expressive burden from the classifier to the engineer.

A neural network makes a different proposal: **learn the feature map from data at the same time as the final predictor.**

## Building a Multilayer Perceptron

### A fully connected layer

A layer with $N$ inputs and $M$ outputs uses a weight matrix $W\in\mathbb R^{M\times N}$ and bias $\mathbf b\in\mathbb R^M$:

$$
\mathbf z=W\mathbf x+\mathbf b,
\qquad
\mathbf h=\phi(\mathbf z).
$$

The activation $\phi$ is normally applied elementwise. When every input unit connects to every output unit, the layer is **fully connected** or **dense**. The words input and output here are local to the layer: a hidden layer's output becomes the next layer's input.

A feed-forward neural network connects layers as a directed acyclic graph. Information travels from input to output without returning to an earlier unit. A recurrent network, by contrast, may contain cycles or a time-unrolled recurrence.

### Composing layers

For an $L$-layer network,

$$
\begin{aligned}
\mathbf h^{(1)}&=f^{(1)}(\mathbf x),\\
\mathbf h^{(2)}&=f^{(2)}(\mathbf h^{(1)}),\\
&\ \vdots\\
\mathbf y&=f^{(L)}(\mathbf h^{(L-1)}).
\end{aligned}
$$

Equivalently,

$$
\mathbf y
=f^{(L)}\circ f^{(L-1)}\circ\cdots\circ f^{(1)}(\mathbf x).
$$

This composition gives neural networks modularity. Each layer can be implemented as a function with a forward computation. Later, backpropagation will supply a backward computation that passes derivatives through the same modules in reverse.

## Activation Functions

The activation function decides what kind of transformation follows each affine map.

### Linear and hard threshold

The identity activation is

$$
\phi(z)=z.
$$

It is useful for regression outputs, but stacking identity-activated layers does not create a nonlinear model. A hard threshold,

$$
\phi(z)=
\begin{cases}
1,&z>0,\\
0,&z\le0,
\end{cases}
$$

creates discrete logic but is not differentiable at zero and has zero derivative elsewhere. It is useful for reasoning about representational power, not convenient for ordinary gradient-based training.

### ReLU and softplus

The rectified linear unit is

$$
\operatorname{ReLU}(z)=\max(0,z).
$$

ReLU is piecewise linear but not globally linear. Its change of slope at zero is enough to let compositions form complex piecewise-linear decision surfaces. Its derivative is 0 on the negative side and 1 on the positive side; a convention must be chosen at exactly zero.

A smooth approximation is **softplus**:

$$
\operatorname{softplus}(z)=\log(1+e^z).
$$

Its derivative is the sigmoid. Softplus approaches zero for large negative $z$ and behaves approximately like $z$ for large positive $z$.

### Sigmoid and hyperbolic tangent

The logistic sigmoid is

$$
\sigma(z)=\frac{1}{1+e^{-z}},
$$

with output in $(0,1)$. The hyperbolic tangent is

$$
\tanh(z)=\frac{e^z-e^{-z}}{e^z+e^{-z}},
$$

with output in $(-1,1)$. Tanh is zero-centered, while sigmoid is not. Both saturate for large $|z|$, where their derivatives become small; this later becomes important when we study vanishing gradients.

> **Do not ask which activation is universally best.** Ask what range, differentiability, sparsity, saturation, and optimization behavior the layer needs.

## Solving XOR with a Hidden Layer

A hidden layer can carve the input space into intermediate regions and let the output recombine them. One construction uses two hard-threshold hidden units:

$$
h_1=\mathbb{1}[x_1+x_2-0.5>0],
$$

which behaves like OR, and

$$
h_2=\mathbb{1}[x_1+x_2-1.5>0],
$$

which behaves like AND. The output is

$$
y=\mathbb{1}[h_1-h_2-0.5>0].
$$

Check the four inputs:

| $(x_1,x_2)$ | $h_1$ (OR) | $h_2$ (AND) | $y$ |
| --- | ---: | ---: | ---: |
| $(0,0)$ | 0 | 0 | 0 |
| $(0,1)$ | 1 | 0 | 1 |
| $(1,0)$ | 1 | 0 | 1 |
| $(1,1)$ | 1 | 1 | 0 |

The output unit remains a linear threshold unit, but it no longer sees the raw coordinates. It sees two learned-or-designed features whose combination makes XOR linearly separable. The hidden layer did not merely add parameters; it changed the representation of the problem.

## Feature Learning

The feature-map view makes an MLP easy to interpret. If the hidden stack produces

$$
\boldsymbol\psi(\mathbf x)=\mathbf h^{(L-1)},
$$

the final layer is an ordinary linear regressor or classifier applied to learned features:

$$
\mathbf y=g\bigl(W^{(L)}\boldsymbol\psi(\mathbf x)+\mathbf b^{(L)}\bigr).
$$

Consider a $28\times28$ grayscale digit image flattened into a 784-dimensional vector. A first-layer hidden unit computes

$$
h_i=\phi\bigl((\mathbf w_i)^\top\mathbf x+b_i\bigr).
$$

The weight vector $\mathbf w_i$ also has 784 entries, so we can reshape it into a $28\times28$ image. Bright positive regions contribute when matching input pixels are active; negative regions suppress the unit. A collection of hidden units can learn stroke fragments, contrasts, edges, or other patterns that are more useful to the next layer than raw pixels alone.

The word **learned** matters. We do not specify that unit 17 should detect a diagonal stroke. We specify an architecture and objective; optimization adjusts all layers so that the internal representation supports the final task.

This also explains why depth can be useful. One layer may combine pixels into local patterns, another may combine patterns into parts, and a later layer may combine parts into a class-relevant representation. The precise hierarchy is learned rather than guaranteed, but composition creates the possibility.

## Why Nonlinearity Is Essential

Suppose every layer is linear and biases are omitted for clarity:

$$
\mathbf y=W^{(3)}W^{(2)}W^{(1)}\mathbf x.
$$

Let

$$
W'=W^{(3)}W^{(2)}W^{(1)}.
$$

Then $\mathbf y=W'\mathbf x$, which is just one linear layer. Biases do not rescue expressiveness; affine maps composed with affine maps remain affine. A deep linear network may have interesting optimization properties or useful factorizations, but it cannot represent a nonlinear input-output function that a single affine layer cannot.

Once a nonlinear activation is placed between the matrices,

$$
\mathbf y=W^{(2)}\phi(W^{(1)}\mathbf x+\mathbf b^{(1)})+\mathbf b^{(2)},
$$

we can no longer collapse the composition into one matrix. Even ReLU—linear on each side of zero—is nonlinear enough because different inputs activate different linear regions.

## Universal Approximation

### What the theorem says

Under suitable conditions, a feed-forward network with a nonlinear activation and enough hidden units can approximate any continuous function on a compact domain arbitrarily well. Related constructions exist for threshold, sigmoid, tanh, and ReLU activations.

For binary inputs, there is an especially direct construction. Create one hidden threshold unit for each input configuration on which the target is 1. Each unit activates only for its assigned configuration; a linear output combines those indicators. Since there are $2^D$ possible binary inputs, one hidden layer is sufficient in principle.

Sigmoid units can approximate the hard thresholds by scaling their logits:

$$
\sigma(az)\longrightarrow\mathbb{1}[z>0]
\qquad\text{as }a\to\infty
$$

away from the boundary. This connects a clean Boolean construction to differentiable units that can be optimized.

Boolean logic gives another perspective. Threshold units can implement AND, OR, and NOT. Any Boolean circuit built from those gates can therefore be translated into a feed-forward network.

### What the theorem does not say

Universal approximation is an **existence statement**, not a complete learning guarantee. It does not tell us that:

- the required network is small;
- gradient descent will find the desired parameters;
- finite data is sufficient to identify the function;
- the learned model will generalize;
- the computation is efficient or numerically stable.

The naive binary construction can require exponentially many hidden units. A network expressive enough to memorize arbitrary training labels can simply overfit. The interesting question is not whether a huge network can represent a function, but whether the architecture and training process can discover a **compact, reusable representation** from realistic data.

## From Representation to Learning

This lecture establishes three steps in the argument for neural networks:

1. A linear decision boundary cannot express important functions such as XOR.
2. Nonlinear hidden layers can transform the input into a representation where a simple output layer succeeds.
3. Sufficiently wide nonlinear networks are universal approximators, but useful learning still requires compactness, optimization, and generalization.

We have described what an MLP can compute, but not yet how to train all of its layers. The missing tool is the multivariable chain rule applied systematically through a composition of modules. That procedure is backpropagation, and it will turn the forward equations in this article into gradients for every matrix and bias.
