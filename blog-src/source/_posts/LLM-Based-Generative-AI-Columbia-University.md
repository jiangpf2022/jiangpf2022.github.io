---
title: LLM 1 - Fundamentals of Deep Learning
date: 2026-09-11 16:15:28
categories: Columbia University
tags:
  - Deep Learning
  - LLM Systems
mathjax: true
cover: "/images/columbia-low-memorial-library.jpg"
---

These notes reorganize Lecture 1 by **knowledge**, not by slide order. The lecture moves back and forth between statistical learning, hardware, distributed optimization, and benchmarking; here those pieces are connected into one systems story. Every technical topic that appears in the slides is retained, while repeated examples are merged and explained together.

The central idea is simple: a capable model is only one component of a useful AI system. Data, optimization, numerical precision, accelerators, communication, software, evaluation, deployment, and monitoring all shape the final result.


## 1. Why AI Scaled

### Four Drivers

The current wave of AI did not come from a single breakthrough. It emerged from the interaction of four forces:

- **Algorithms:** better architectures, optimization methods, and training recipes.
- **Data:** web, social, mobile, scientific, and IoT sources created datasets at unprecedented scale.
- **Compute:** GPUs, TPUs, tensor cores, and distributed clusters made large matrix operations practical.
- **Applications:** useful products generated investment, feedback, and further data.

These forces form a feedback loop. Better compute makes larger experiments possible; better algorithms turn that compute into quality; useful applications produce demand and sometimes new data; revenue and scientific value fund the next generation of infrastructure. Removing any one component slows the loop.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-024-01.webp" alt="AI timeline, slide 24, figure 1" loading="lazy" decoding="async">
  <figcaption>The AI timeline shows how algorithms, data, hardware, and applications advanced together rather than through one isolated breakthrough.</figcaption>
</figure>


### Cloud Shift

Cloud computing is an important part of this history. Services such as Amazon EC2 and S3, introduced around 2006, separated access to compute and storage from ownership of a physical data center. On-demand resources made it possible to experiment at one scale and train at another.

Elasticity matters because AI demand is uneven. A team may prepare data for days, burst to hundreds of accelerators for training, then serve with a smaller continuously running fleet. Cloud abstractions allow these phases to use different resource shapes, although moving large datasets and reserving scarce accelerators remain significant engineering problems.

### AlexNet

AlexNet is a useful historical marker. Its five convolutional and three fully connected layers were trained on GPUs, and it won the ImageNet competition by roughly an 11-percentage-point margin. The lesson was not only that convolutional networks worked; specialized parallel hardware had become a decisive part of model progress.

Its success demonstrated co-design: the network, data, implementation, and available GPU memory were chosen together. This pattern continues in LLMs, where attention kernels, tensor shapes, precision, and parallelism are often adapted to the target hardware.

### Foundation Models

Modern language models continue the same pattern at a much larger scale. Training can span hundreds or thousands of accelerators. More parameters increase arithmetic work, while larger datasets increase both compute and I/O. Once a single device can no longer hold or efficiently process the workload, model design becomes inseparable from memory layout, network topology, collective communication, fault recovery, and cost.

A rapid sequence of model releases—from early large language models to BERT, GPT-family models, LLaMA, Gemini, Claude, and Granite—also changes how systems are built. Organizations may choose a proprietary API, an open model, a domain-adapted model, or a model trained from scratch. Each choice changes data governance, fine-tuning, serving, and evaluation requirements.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-026-01.webp" alt="Evolution of large language models, slide 26, figure 1" loading="lazy" decoding="async">
  <figcaption>The model timeline makes the acceleration of foundation-model releases and the diversity of model families visible.</figcaption>
</figure>

The IBM US Open example illustrates a domain system rather than a standalone model. It combines **watsonx**, Granite models, and **watsonx.data** with proprietary tennis data to create match reports and commentary. The value comes from grounding a general model in trusted data and integrating it into a reliable workflow.

The example also clarifies why proprietary data can be more defensible than model access alone. Many organizations can call a similar base model; fewer have the same historical records, domain definitions, review process, and product integration.



## 2. System Stack

### Definition

A machine-learning system is a collection of interacting components built to achieve a measurable objective:

$$
\begin{aligned}
\text{ML system}
&= \text{data} + \text{algorithm/model} \\
&\quad + \text{software platform} + \text{infrastructure}.
\end{aligned}
$$

The components should not be optimized independently. A model with fewer arithmetic operations may still run slower if its operations have poor kernel support or cause irregular memory access. Likewise, a faster accelerator may sit idle if preprocessing cannot supply batches quickly enough.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-vector-029-01.webp" alt="Constituents of a machine-learning system, slide 29, figure 1" loading="lazy" decoding="async">
  <figcaption>A machine-learning system joins infrastructure, algorithms, data, and software; none of the four layers operates independently.</figcaption>
</figure>


### Infrastructure and Models

**Infrastructure** includes CPUs, GPUs or TPUs, device memory, host memory, disks, object storage, and the links within and between machines. Numerical precision is also a systems decision: FP32, FP16, BF16, and quantized formats trade range, accuracy, memory, and throughput.

**Algorithms and models** determine the required operations, parameter count, activation memory, optimizer state, and communication pattern. Their resource requirements are not fixed in isolation; the same architecture can have very different costs under different batch sizes, precisions, and parallelization strategies.

During training, memory must usually hold more than model parameters: activations needed by backpropagation, gradients, and optimizer states can dominate. An Adam-style optimizer commonly stores multiple auxiliary values per parameter. This is why a model whose weights fit on one GPU may still require sharding for training.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-036-01.webp" alt="Cloud, big data, and AI, slide 36, figure 1" loading="lazy" decoding="async">
  <figcaption>Cloud, connected devices, and large data sources form the infrastructure context in which modern AI systems operate.</figcaption>
</figure>

A production generative-AI platform further separates data management, model development, serving, orchestration, and observability into layers.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-038-01.webp" alt="Generative AI cloud stack, slide 38, figure 1" loading="lazy" decoding="async">
  <figcaption>A full generative-AI cloud stack spans hardware, data, training, serving, application orchestration, and lifecycle management.</figcaption>
</figure>


### Data

**Data** can be text, image, audio, video, time series, graphs, tables, sensor streams, or multimodal mixtures. Its source, representativeness, quality, labeling, access control, storage layout, and movement all matter. A common industry observation is that as much as 80% of project effort can go into preparing data. DataOps practices make ingestion, validation, versioning, transformation, and delivery repeatable.

Data quality sets a ceiling on model quality. Duplicates can cause memorization and benchmark leakage; biased sampling can make performance fail for underrepresented groups; inconsistent labels create irreducible-looking noise; and train/serve skew appears when production preprocessing differs from training. Versioning both raw and transformed data makes these failures diagnosable.

### Software and MLOps

**Software** turns algorithms into an operational pipeline. It includes frameworks and kernels, Docker containers, Kubernetes orchestration, model servers such as TensorFlow Serving, runtimes such as ONNX Runtime, and workflow systems such as Kubeflow. It also includes APIs, logging, CI/CD, and tests for data, infrastructure, models, and production behavior.

Containers package code and dependencies; orchestrators place, restart, and scale workloads; serving runtimes execute models efficiently; workflow systems connect stages and record their inputs and outputs. CI/CD for ML must test not only source code but also schemas, feature distributions, model quality, latency, and compatibility between model and service.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-033-01.webp" alt="ML software lifecycle, slide 33, figure 1" loading="lazy" decoding="async">
  <figcaption>The ML software lifecycle closes the loop between planning, coding, testing, deployment, monitoring, and continuous feedback.</figcaption>
</figure>


### Production Requirements

This is why studying ML systems matters. An algorithm can be correct and still fail because data arrives late, a kernel underutilizes the GPU, workers wait on the network, a dependency cannot be reproduced, or a production distribution drifts away from the training distribution.

Important production properties include:

- **Predictability:** known latency, throughput, and failure behavior.
- **Reproducibility:** the same code, data, configuration, and environment can recreate a result.
- **Traceability and provenance:** a prediction or model version can be connected to its data, code, configuration, and training run.
- **Automation:** deployment, testing, rollback, and retraining do not rely on fragile manual steps.
- **Diagnostics and observability:** errors and performance regressions can be located quickly.
- **Governance and compliance:** data and model use can be audited and controlled.
- **Scalability and collaboration:** teams can share artifacts and workloads without losing consistency.
- **Monitoring and management:** the system remains useful after initial deployment.

These are also common inhibitors to adoption. A strong notebook result is not yet a maintainable service.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-040-01.webp" alt="Practical ML system pipeline, slide 40, figure 1" loading="lazy" decoding="async">
  <figcaption>A practical ML system contains configuration, data collection, feature extraction, verification, resource management, serving, and monitoring paths.</figcaption>
</figure>



## 3. Cloud Lifecycle

### Service Models

Cloud resources are **on demand**, **pay as you go**, and **heterogeneous**. A workload can rent a CPU machine for preprocessing, a GPU cluster for training, object storage for datasets, and smaller instances for serving. The main service layers are:

- **IaaS:** raw compute, storage, and networking.
- **PaaS:** managed application and data platforms.
- **SaaS:** complete applications delivered as a service.
- **MLaaS:** managed environments for data preparation, training, tuning, deployment, and monitoring.

Moving upward through these layers reduces the infrastructure a team operates directly, but also reduces control. IaaS allows detailed tuning of drivers, networks, and scheduling; MLaaS can launch experiments quickly but may constrain versions, topology, or observability. The best layer depends on whether customization or operational simplicity is more valuable.

### Deployment Models

Deployments may use a public cloud, a private cloud, or a hybrid combination. Managed environments such as IBM Watson Studio, Amazon SageMaker, Azure Machine Learning, and Google Vertex AI reduce setup work, but users still choose resources and control lifecycle decisions. Provisioning, maintenance, monitoring, security, and decommissioning remain part of the cost.

Public clouds offer elasticity and a broad service catalog. Private clouds provide direct control over hardware and sensitive data. Hybrid systems can keep regulated data private while using public resources elsewhere, but they add identity, networking, data-movement, and consistency challenges.

### Lifecycle

The model lifecycle is broader than training:

1. **Preprocess:** collect, clean, denoise, deduplicate, debias, label, and split data.
2. **Engineer representations:** construct features or tokenized inputs.
3. **Train:** choose a model, initialize it, optimize parameters, tune hyperparameters, synthesize data when appropriate, and apply regularization.
4. **Harden:** test robustness, adversarial behavior, security, safety, and edge cases.
5. **Serve:** package the model, compress or prune it when useful, select batching and hardware, and expose an interface.
6. **Monitor:** measure response time, failures, resource use, quality, and data or concept drift.
7. **Learn continuously:** retrain, adapt, or replace the model when monitored evidence justifies it.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-039-01.webp" alt="AI model lifecycle, slide 39, figure 1" loading="lazy" decoding="async">
  <figcaption>The lifecycle is circular: serving and monitoring generate evidence that feeds preprocessing, feature engineering, training, tuning, and hardening.</figcaption>
</figure>

Hardening deserves special attention. Average test accuracy does not reveal sensitivity to adversarial inputs, prompt injection, rare subgroups, corrupted data, or unsafe generations. Hardening defines threat models, evaluates likely failures, and introduces defenses before serving.

Continuous learning should not mean blindly training on recent traffic. Feedback can be delayed, biased, manipulated, or affected by the model's own prior decisions. A safe loop validates new data, compares candidate and current models, preserves rollback, and monitors post-deployment drift.


### Bottlenecks

Each phase has a different bottleneck. Preprocessing may be limited by storage and I/O; training by arithmetic, memory, and communication; serving by memory capacity, memory bandwidth, latency, or concurrency. A lifecycle view prevents local optimizations—such as increasing raw training throughput—from being mistaken for end-to-end improvement.

Amdahl's-law intuition applies: accelerating one stage has little impact when another dominates total time. End-to-end profiling should separate input time, host-to-device transfer, forward and backward compute, synchronization, checkpointing, validation, and serving queue delay.


## 4. Generalization

### Regression Setup

Supervised learning begins with examples $(x_i,y_i)$ and an observation model

$$
y_i=f(x_i)+\epsilon_i,
$$

where $f$ is the underlying relationship and $\epsilon_i$ is irreducible noise. A learned model produces

$$
\hat y_i=\hat f(x_i).
$$

For linear regression,

$$
\hat y_i=\beta_0+\beta_1x_{i1}+\cdots+\beta_px_{ip}
=\mathbf w^T\mathbf x_i+b.
$$

The residual is $e_i=y_i-\hat y_i$. Residual sum of squares, total sum of squares, mean squared error, and the coefficient of determination are

$$
\operatorname{RSS}=\sum_{i=1}^{N}(y_i-\hat y_i)^2,
\qquad
\operatorname{TSS}=\sum_{i=1}^{N}(y_i-\bar y)^2,
$$

$$
\operatorname{MSE}=\frac{\operatorname{RSS}}{N},
\qquad
R^2=1-\frac{\operatorname{RSS}}{\operatorname{TSS}}.
$$

RSS and MSE measure sample prediction error. $R^2$ measures explained sample variance relative to the constant predictor $\bar y$; it does not by itself prove generalization.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-042-02.webp" alt="Linear regression and residual error, slide 42, figure 2" loading="lazy" decoding="async">
  <figcaption>Residual plots reveal structure that a single MSE value can hide; visible curvature indicates that the fitted functional form is incomplete.</figcaption>
</figure>

The goal is not to minimize training loss at any cost. It is to predict well on unseen samples from the target distribution.

Linear regression is simple enough to expose the key ideas without hiding them inside a neural network. The feature vector may contain raw variables or a feature map such as $\phi(x)=(1,x,\ldots,x^D)^T$. Polynomial regression is still linear in its parameters when written as $\hat y=\mathbf w^T\phi(x)$, even though it is nonlinear in the original input.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-042-03.webp" alt="Linear regression and residual error, slide 42, figure 3" loading="lazy" decoding="async">
  <figcaption>Linear, quadratic, and fifth-degree fits illustrate models with very different flexibility.</figcaption>
</figure>


### Underfit and Overfit

A model **underfits** when its assumptions or capacity are too restrictive: both training and test errors remain high. It **overfits** when it models peculiarities of the training sample: training error is low, but test error is much higher. Their difference is the **generalization gap**.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-043-01.webp" alt="Mean squared error examples, slide 43, figure 1" loading="lazy" decoding="async">
  <figcaption>For a nearly linear target, added flexibility eventually lowers training error while raising test error.</figcaption>
</figure>

Model complexity can mean polynomial degree, tree depth, feature count, parameter count, or the effective flexibility created by weak regularization. Training error normally cannot increase when a model family becomes strictly more flexible, because the larger family can reproduce the smaller solution. Test error need not follow that monotonic pattern.

When the true relationship has moderate curvature, test MSE first falls and then rises once the model starts following sample noise.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-043-02.webp" alt="Mean squared error examples, slide 43, figure 2" loading="lazy" decoding="async">
  <figcaption>Moderate flexibility minimizes test error even while training error keeps decreasing.</figcaption>
</figure>

For a more complex target, the best point shifts toward a more flexible model, but the U-shaped test-error pattern remains.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-043-03.webp" alt="Mean squared error examples, slide 43, figure 3" loading="lazy" decoding="async">
  <figcaption>A nonlinear target needs more flexibility before variance begins to dominate.</figcaption>
</figure>

A single fitted curve shows the same problem: an overly flexible line bends toward individual samples instead of the population trend.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-044-01.webp" alt="Overfitting and underfitting, slide 44, figure 1" loading="lazy" decoding="async">
  <figcaption>Underfitting misses the curved signal; overfitting follows local fluctuations.</figcaption>
</figure>


### Bias and Variance

To formalize the effect of the training sample, imagine repeatedly drawing datasets

$$
D^{(1)},D^{(2)},\ldots,D^{(K)}
$$

from the same population, training a model $\hat f_D$ on each, and evaluating all models at the same test point $x$. Their average prediction is

$$
\bar f(x)=\mathbb{E}_{D}\!\left[\hat f_D(x)\right].
$$

The **bias** at $x$ is the systematic difference between the average learned prediction and the true relationship:

$$
\operatorname{Bias}(x)=\bar f(x)-f(x).
$$

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-109-01.webp" alt="Bias example, slide 109, figure 1" loading="lazy" decoding="async">
  <figcaption>Bias is the systematic departure of the average simplified model from the true nonlinear relationship.</figcaption>
</figure>

The **variance** measures sensitivity to the sampled training set:

$$
\operatorname{Var}(x)
=\mathbb{E}_{D}\!\left[
  \left(\hat f_D(x)-\bar f(x)\right)^2
\right].
$$

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-110-01.webp" alt="Training-sample variance, slide 110, figure 1" loading="lazy" decoding="async">
  <figcaption>Different training samples produce different curves and predictions at the same input.</figcaption>
</figure>

Bias is not simply “the model made an error once.” It is a systematic error visible after averaging over possible training sets. Variance is not observation noise; it is variation in the fitted model caused by which finite sample was observed.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-048-01.webp" alt="Bias and variance intuition, slide 48, figure 1" loading="lazy" decoding="async">
  <figcaption>The target diagram separates low versus high bias from low versus high variance.</figcaption>
</figure>


### Error Decomposition

If observations contain irreducible noise $\epsilon$ with variance $\sigma^2$, expected test error decomposes as

$$
\mathbb{E}\!\left[(y-\hat f_D(x))^2\right]
= \operatorname{Bias}(x)^2 + \operatorname{Var}(x) + \sigma^2.
$$

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-045-01.webp" alt="Bias-variance trade-off, slide 45, figure 1" loading="lazy" decoding="async">
  <figcaption>Falling bias and rising variance create an intermediate complexity with the lowest total error.</figcaption>
</figure>

This equation separates three remedies. Reduce squared bias by choosing a more appropriate representation or model. Reduce variance through more data, stronger regularization, ensembling, or lower effective capacity. Irreducible noise cannot be removed by a better predictor unless new information makes the target more predictable.

In a low-noise setting, the test-MSE minimum occurs where falling squared bias and rising variance balance.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-046-01.webp" alt="Model complexity trade-offs, slide 46, figure 1" loading="lazy" decoding="async">
  <figcaption>Bias, variance, and test MSE in a low-noise example.</figcaption>
</figure>

Adding irreducible noise lifts the error floor without changing the basic trade-off.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-046-02.webp" alt="Model complexity trade-offs, slide 46, figure 2" loading="lazy" decoding="async">
  <figcaption>The horizontal noise floor prevents expected test error from reaching zero.</figcaption>
</figure>

Putting every component on one graph makes the decomposition operational: test MSE is their sum.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-046-03.webp" alt="Model complexity trade-offs, slide 46, figure 3" loading="lazy" decoding="async">
  <figcaption>Squared bias, variance, and irreducible noise add to expected test MSE.</figcaption>
</figure>

The polynomial interpolation example in the slides makes variance visible. Multiple datasets contain only five sampled points. A sufficiently high-order polynomial can pass through every point, producing low training bias, yet tiny changes in those five observations lead to wildly different curves elsewhere. More expressive models often reduce bias while increasing variance. Neural networks are generally low-bias, high-capacity models, so data volume and regularization are crucial.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-047-01.webp" alt="Training and test error versus complexity, slide 47, figure 1" loading="lazy" decoding="async">
  <figcaption>Training error falls with flexibility, while test error eventually rises.</figcaption>
</figure>

### Practical Diagnosis

More data usually reduces variance because any one sample has less influence. It does not necessarily fix high bias caused by a wrong representation or overly constrained model. Increasing capacity may reduce bias, but can worsen variance. Generalization is therefore an empirical balance among model family, data, regularization, and optimization.

Learning curves help diagnose the regime. If training and validation errors are both high and close, suspect bias. If training error is low but validation error is much higher, suspect variance or distribution mismatch. If validation performance is strong but production performance falls, inspect dataset shift and pipeline skew rather than automatically enlarging the model.


## 5. Regularization

### Penalized Objective

Regularization changes the learning problem so that fitting the data is not the only preference. For data loss $J_{\text{data}}(\mathbf w)$,

$$
J(\mathbf w)
=J_{\text{data}}(\mathbf w)+\lambda R(\mathbf w),
$$

where $\lambda$ controls the strength of the penalty.

This objective encodes a preference among solutions that explain the training data. From a Bayesian view, the penalty resembles a prior over parameters; from an optimization view, it reshapes the loss surface; from a generalization view, it limits effective flexibility.

### L1 and L2

Two standard choices are

$$
R_{L_2}(\mathbf w)=\lVert\mathbf w\rVert_2^2,
\qquad
R_{L_1}(\mathbf w)=\lVert\mathbf w\rVert_1.
$$

$L_2$ regularization smoothly shrinks parameters and is commonly implemented as weight decay. $L_1$ encourages sparse solutions in which some parameters become exactly zero. The geometry differs: an $L_2$ constraint has a smooth spherical boundary, while the corners of an $L_1$ constraint make coordinate-wise zeros more likely. Sparse parameters only produce runtime savings when the storage format and kernels can exploit them.

For least-squares regression, ridge ($L_2$) regularization solves

$$
\min_{\boldsymbol\beta}\left[\sum_{i=1}^{N}\left(y_i-\beta_0-\sum_{j=1}^{p}\beta_jx_{ij}\right)^2+\lambda\sum_{j=1}^{p}\beta_j^2\right].
$$

As $\lambda$ grows, ridge smoothly shrinks coefficients toward zero without usually making them exactly zero.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-050-02.webp" alt="L1 and L2 regularization, slide 50, figure 2" loading="lazy" decoding="async">
  <figcaption>Ridge coefficient paths change smoothly as regularization strength changes.</figcaption>
</figure>

Lasso ($L_1$) instead solves

$$
\min_{\boldsymbol\beta}\left[\sum_{i=1}^{N}\left(y_i-\beta_0-\sum_{j=1}^{p}\beta_jx_{ij}\right)^2+\lambda\sum_{j=1}^{p}|\beta_j|\right].
$$

The corners of the $L_1$ constraint allow coefficient paths to reach exactly zero, performing a form of feature selection.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-050-04.webp" alt="L1 and L2 regularization, slide 50, figure 4" loading="lazy" decoding="async">
  <figcaption>Lasso coefficient paths contain flat zero regions because $L_1$ can remove features entirely.</figcaption>
</figure>


### Other Methods

Other forms include:

- adding noise to inputs, activations, gradients, or weights;
- dropout, which randomly removes units during training;
- data augmentation, which creates label-preserving variations;
- early stopping based on validation performance;
- architectural constraints and parameter sharing.

Dropout trains many randomly thinned subnetworks that share parameters, then uses the full network with appropriate scaling at inference. Data augmentation injects domain knowledge by declaring transformations—such as a small image crop—that should preserve the label. Early stopping uses optimization time itself as a capacity control.

Regularization deliberately trades variance for bias. With $\lambda=0$, a high-capacity model may fit sample-specific noise. As $\lambda$ grows, parameter freedom decreases, variance tends to fall, and bias tends to rise. Excessive regularization underfits; insufficient regularization overfits.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-051-01.webp" alt="Regularization strength and bias-variance, slide 51, figure 1" loading="lazy" decoding="async">
  <figcaption>Training error rises with regularization, while test error is minimized at an intermediate $\lambda$.</figcaption>
</figure>


### Validation

The validation set is used to choose $\lambda$, model complexity, and other hyperparameters. The test set should remain untouched until final evaluation; tuning against it leaks information and makes the reported result optimistic.

Cross-validation is useful when data is scarce, but expensive for deep models. Whatever the protocol, splits must respect the application: time-series data often needs chronological splits, and related users, documents, or scenes may need group-wise separation to avoid leakage.

### Implicit Effects

The same logic appears later in distributed training. Small-batch gradient noise can act as implicit regularization and favor flatter solutions, while very large batches may converge to sharper minima that fit training data well but generalize less reliably. System choices can therefore change statistical behavior.


## 6. Metrics

### Confusion Matrix

For binary classification, the confusion matrix contains true positives ($TP$), false positives ($FP$), true negatives ($TN$), and false negatives ($FN$).

“Positive” names the event of interest, not a morally good outcome. In disease screening, positive may mean disease detected; in fraud detection, it may mean transaction blocked. Metric interpretation begins by defining that event and the cost of each cell.

### Core Rates

The core measures are

$$
\text{Accuracy}
=\frac{TP+TN}{TP+TN+FP+FN},
$$

$$
\text{Precision}
=\frac{TP}{TP+FP},
\qquad
\text{Recall}
=\frac{TP}{TP+FN},
$$

$$
\text{Specificity}
=\frac{TN}{TN+FP}.
$$

Two related rates shown in the slides are

$$
\text{False Discovery Rate}=1-\text{Precision}
=\frac{FP}{TP+FP},
$$

$$
\text{False Positive Rate}=1-\text{Specificity}
=\frac{FP}{FP+TN}.
$$

Precision conditions on predicted positives: when the system alerts, how often is it right? Recall conditions on actual positives: of the events we needed to find, how many did we find? Specificity asks the analogous question for negatives.


### Imbalanced Data

Accuracy can be misleading under class imbalance. A classifier that predicts the 99% majority class every time reaches 99% accuracy while having no ability to detect the minority class. **Balanced accuracy** gives equal weight to sensitivity and specificity:

$$
\text{Balanced Accuracy}
=\frac{\text{Recall}+\text{Specificity}}{2}.
$$

The $F_\beta$ score combines precision and recall while allowing the application to control their relative importance:

$$
F_\beta
=(1+\beta^2)
\frac{\text{Precision}\cdot\text{Recall}}
{\beta^2\text{Precision}+\text{Recall}}.
$$

$F_1$ sets $\beta=1$ and uses their harmonic mean. Larger $\beta$ emphasizes recall; smaller $\beta$ emphasizes precision. The right choice depends on error cost, not convention.

Always report class prevalence and preferably the full confusion matrix. Precision changes when prevalence changes even if recall and false-positive rate stay fixed. A deployment population with a different base rate can therefore produce a different user experience from the test set.


### Threshold Curves

An ROC curve plots true-positive rate against false-positive rate as the decision threshold changes. It describes a family of operating points rather than one fixed classification threshold.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-055-01.webp" alt="ROC curves, slide 55, figure 1" loading="lazy" decoding="async">
  <figcaption>ROC curves compare true-positive and false-positive rates across thresholds.</figcaption>
</figure>

Area under the ROC curve summarizes ranking across thresholds, but it can hide operationally important regions. Precision-recall curves are often more informative when positives are rare. A production threshold should reflect real costs and capacity—for example, how many alerts a review team can inspect.


### Model and System

Lecture 1 also separates **model quality** from **system quality**. Loss, accuracy, precision, recall, F-score, and ROC describe predictive behavior. Training time, inference latency, throughput, memory, energy, reliability, resource consumption, scaling efficiency, and monetary cost describe practicality. A fair comparison must hold the target quality constant: the fastest run is not useful if it reaches a worse model.

Later course evaluations extend these ideas to language generation. ROUGE, BLEU, and n-gram overlap capture limited aspects of text similarity; GLUE, SuperGLUE, MMLU, BIG-bench, and HELM aggregate task performance; MLPerf, LLMPerf, Hugging Face tooling, and fmperf focus more directly on systems behavior. No single number captures correctness, safety, speed, and cost.


## 7. Training

### Training Loop

Training repeats four conceptual operations:

1. A **forward pass** computes activations and predictions.
2. A **loss function** compares predictions with targets.
3. **Backpropagation** applies partial derivatives and the chain rule to compute gradients.
4. An **optimizer** updates the parameters.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-058-01.webp" alt="Neural-network training flow, slide 58, figure 1" loading="lazy" decoding="async">
  <figcaption>Forward propagation moves toward outputs; backpropagation sends gradient information in reverse.</figcaption>
</figure>

The forward pass stores intermediate activations because the backward pass needs them. For a deep network, these saved activations can consume more memory than the parameters. Backpropagation traverses the computation graph in reverse and accumulates each parameter's contribution to the loss.


### Backpropagation

For a scalar parameter $w_j$, the chain rule has the form

$$
\frac{\partial L}{\partial w_j}
=\frac{\partial L}{\partial y}
\frac{\partial y}{\partial w_j}.
$$

For a linear unit $y=\sum_j w_jx_j+b$, the local derivatives are $\partial y/\partial w_j=x_j$ and $\partial y/\partial b=1$. The chain rule multiplies these local sensitivities by the upstream loss derivative. Automatic differentiation performs this bookkeeping, but the computational and memory costs remain real.

For parameters $\boldsymbol\theta$ and learning rate $\eta$, gradient descent updates

$$
\boldsymbol\theta_{t+1}
=\boldsymbol\theta_t-\eta\nabla J(\boldsymbol\theta_t).
$$

### Gradient Variants

Full-batch gradient descent evaluates the entire dataset before each update. Stochastic gradient descent uses one randomly selected example. Mini-batch SGD uses a subset $\mathcal B$:

$$
\widehat{\nabla J}
=\frac{1}{|\mathcal B|}
\sum_{i\in\mathcal B}
\nabla_{\boldsymbol\theta}\ell_i.
$$

This is an approximate gradient, but it is cheaper and maps naturally to dense matrix operations. Randomizing samples prevents ordering effects and makes successive estimates less correlated.

One epoch means processing the full training dataset once, not making one update. With dataset size $N$ and batch size $B$, an epoch contains roughly $N/B$ optimizer updates. Changing $B$ therefore changes both gradient noise and the number of updates for the same number of examples.


### Hyperparameters

Training time is jointly determined by **compute, memory, and network communication**. A step can be slow because matrix operations are expensive, activations and optimizer states exceed device memory, data cannot be delivered quickly enough, or gradients take too long to synchronize.

Important hyperparameters include:

- architecture depth, width, and connectivity;
- activation functions;
- parameter initialization;
- learning rate and its schedule;
- batch size;
- momentum;
- optimizer;
- regularization and weight decay.

They are not learned by ordinary backpropagation, yet they can determine whether training converges.

Momentum smooths noisy directions by carrying a running update velocity. Adaptive optimizers rescale coordinates using gradient statistics. Initialization controls the initial scale of activations and gradients; poor initialization can make signals vanish or explode before useful learning begins.


### Training and Inference

The slides use an older hardware example to make scale concrete. AlexNet trained on roughly 2.5 million Places images on a K40 GPU could take about six days. Later P100 and V100 devices increased arithmetic throughput and memory bandwidth substantially.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-056-02.webp" alt="Deep-learning training hardware, slide 56, figure 2" loading="lazy" decoding="async">
  <figcaption>Newer accelerators compressed a multi-day training workload into hours.</figcaption>
</figure> A V100 includes 640 tensor cores, can exceed 100 TFLOPS on suitable tensor workloads, and commonly appeared with 16 GB of device memory. Hardware improvements reduce individual operation time, but larger models rapidly consume the new capacity.

Inference has a different objective. Training emphasizes time to target quality; inference may emphasize queries or tokens per second, tail latency, memory per replica, and cost per request. Optimizing one phase does not automatically optimize the other.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-057-01.webp" alt="Inference throughput, slide 57, figure 1" loading="lazy" decoding="async">
  <figcaption>Accelerators can improve inference throughput dramatically, but the relevant metric remains workload-specific.</figcaption>
</figure>

Training needs backward computation and optimizer state; inference does not, but autoregressive generation repeatedly reads model weights and an expanding key-value cache. Training is commonly throughput-oriented, whereas interactive inference must also respect per-request latency and fairness.



## 8. Batch and Rate

### Batch Trade-off

Batch size connects statistics to hardware. Larger batches expose more parallel work, improve accelerator utilization, and provide lower-variance gradient estimates. They also consume more memory, reduce the number of updates per epoch, and may converge to sharp minima with weaker generalization. Smaller batches use less memory and provide noisier updates; that noise can act as implicit regularization and favor flatter solutions.

The historical K40 example has about 12 GB of memory, while common P100 and V100 configurations have about 16 GB. More memory allows a larger batch, but “largest batch that fits” is not the same as “best time to quality.”

The useful quantity is global batch size: local batch per worker multiplied by the number of data-parallel workers, adjusted for gradient accumulation. Accumulation can emulate a larger global batch when memory is limited, although it does not create the same per-step device utilization as a physically larger local batch.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-117-03.webp" alt="Learning rate and batch size, slide 117, figure 3" loading="lazy" decoding="async">
  <figcaption>Increasing-batch and hybrid schedules change global batch size during training.</figcaption>
</figure>

### Learning Rate

The learning rate controls update magnitude. Too large a rate can overshoot or diverge; too small a rate wastes steps. A common schedule uses warmup and then decay. Large-batch training often begins with learning-rate scaling, but the relationship must be validated for the model, optimizer, data, and schedule.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-062-01.webp" alt="Learning-rate behavior, slide 62, figure 1" loading="lazy" decoding="async">
  <figcaption>Too large a learning rate oscillates; too small a rate converges slowly.</figcaption>
</figure>

Warmup protects early training when parameters and optimizer statistics are not yet calibrated. Decay allows large exploratory steps early and smaller refining steps later. Step, exponential, cosine, and inverse-square-root schedules express different assumptions about how quickly that transition should occur.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-117-01.webp" alt="Learning rate and batch size, slide 117, figure 1" loading="lazy" decoding="async">
  <figcaption>Decay, hybrid, and increasing-batch strategies create different learning-rate schedules.</figcaption>
</figure>

The training-loss curves can remain similar when one method changes the learning rate and another changes batch size, reflecting their shared effect on gradient noise.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-117-02.webp" alt="Learning rate and batch size, slide 117, figure 2" loading="lazy" decoding="async">
  <figcaption>Training cross-entropy for the three scheduling strategies.</figcaption>
</figure>


### Noise Scale

The slides express the relation using a gradient-noise scale:

$$
g=\epsilon\left(\frac{N}{B}-1\right),
$$

where $\epsilon$ is the learning rate, $N$ the dataset size, and $B$ the batch size. When $B\ll N$,

$$
g\approx\epsilon\frac{N}{B}.
$$

This explains an important equivalence: increasing the batch size reduces gradient noise in a way resembling a decrease in learning rate. To preserve a similar noise scale, an optimal batch can grow roughly in proportion to the learning rate. The relationship is a model, not a universal rule; it is most useful for reasoning about the trade-off.

A larger batch processes the same epoch in fewer optimizer updates. It may have higher examples-per-second but still need careful warmup or more epochs to reach the same accuracy. Report both throughput and final quality.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-117-04.webp" alt="Learning rate and batch size, slide 117, figure 4" loading="lazy" decoding="async">
  <figcaption>Comparable test accuracy shows why schedule comparisons must report final quality.</figcaption>
</figure>

### Batch Normalization

**Batch normalization** stabilizes the distribution of intermediate activations. For a mini-batch $\mathcal B$,

$$
\mu_{\mathcal B}
=\frac{1}{|\mathcal B|}\sum_{i\in\mathcal B}x_i,
$$

$$
\sigma_{\mathcal B}^{2}
=\frac{1}{|\mathcal B|}
\sum_{i\in\mathcal B}(x_i-\mu_{\mathcal B})^2,
$$

$$
\hat x_i
=\frac{x_i-\mu_{\mathcal B}}
{\sqrt{\sigma_{\mathcal B}^{2}+\varepsilon}},
\qquad
y_i=\gamma\hat x_i+\beta.
$$

The small $\varepsilon$ prevents numerical instability; learned $\gamma$ and $\beta$ restore the ability to scale and shift the normalized value. Batch normalization often allows a larger learning rate, faster convergence, and sometimes better generalization. Its dependence on batch statistics is also why very small or distributed batches require care.

At inference, batch normalization uses running estimates rather than statistics from the current request. This prevents one prediction from depending on unrelated examples that happen to share a serving batch. The distinction between training and inference mode must be handled correctly when evaluating or exporting a model.


### Practical Tuning

A useful tuning order is to find a stable learning-rate range on a manageable batch, increase the batch only while throughput and time-to-quality improve, add warmup when scaling aggressively, and compare runs at the same validation target. Monitor loss spikes, gradient norms, examples per second, memory utilization, and final generalization together.


## 9. Hardware

### Accelerators

Deep-learning accelerators are effective because training contains large amounts of dense, parallel arithmetic. GPUs provide many execution units and high-bandwidth device memory. TPUs are application-specific integrated circuits designed around tensor operations.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-056-01.webp" alt="Deep-learning training hardware, slide 56, figure 1" loading="lazy" decoding="async">
  <figcaption>Tensor cores accelerate dense matrix operations through parallel multiply-accumulate units.</figcaption>
</figure>

A TPU v5e TensorCore, for example, combines four matrix-multiply units with vector and scalar units. A TPU worker is attached to a host VM, and many workers can form a pod through a dedicated high-speed network. Earlier TPU v2 pod results showed near-linear ResNet scaling over a useful range.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-101-01.webp" alt="Tensor Processing Units, slide 101, figure 1" loading="lazy" decoding="async">
  <figcaption>A TPU TensorCore combines high-bandwidth memory with matrix, vector, and scalar units.</figcaption>
</figure> GPUs are more general and supported by a broad software ecosystem; TPUs offer specialized tensor throughput and tightly integrated pod-scale networking. The right choice depends on model operations, software support, availability, and cost.

Peak FLOPS describes an upper bound for suitable arithmetic, not application speed. Real utilization depends on tensor dimensions, kernel fusion, memory access, control flow, compiler quality, and whether input and communication stalls leave execution units idle.

Observed TPU throughput can track theoretical scaling when a workload maps well to the architecture.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-101-02.webp" alt="Tensor Processing Units, slide 101, figure 2" loading="lazy" decoding="async">
  <figcaption>Observed throughput increases almost linearly with processor count in this TPU workload.</figcaption>
</figure>

Cost also depends on time: faster hardware can be competitive even at a higher hourly price.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-102-01.webp" alt="TPU and GPU performance, slide 102, figure 1" loading="lazy" decoding="async">
  <figcaption>ResNet-50 training cost and duration for an eight-GPU VM versus a TPU pod.</figcaption>
</figure>


### Memory Paths

The device is only one level of a hierarchy:

$$
\text{compute unit}
\rightarrow \text{device memory}
\rightarrow \text{PCIe/NVLink}
\rightarrow \text{node fabric}
\rightarrow \text{cluster network}.
$$

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-068-01.webp" alt="GPU interconnect topologies, slide 68, figure 1" loading="lazy" decoding="async">
  <figcaption>A four-GPU PCIe node may route traffic through a shared switch and CPU path.</figcaption>
</figure>

PCIe connects devices and hosts. SMP describes processors sharing a common memory system. Intel QPI is a point-to-point processor interconnect; the slides cite about 25.6 GB/s for a representative link. NVLink provides a much faster GPU-to-GPU path than ordinary host-mediated transfer.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-068-03.webp" alt="GPU interconnect topologies, slide 68, figure 3" loading="lazy" decoding="async">
  <figcaption>An eight-GPU topology shows local transfers and paths that cross CPU or switch boundaries.</figcaption>
</figure>

Bandwidth is the amount transferred per second; latency is the fixed delay before useful transfer completes. Large gradient tensors are often bandwidth-bound, while many small messages are latency-bound. Collective algorithms therefore chunk and schedule traffic to use links efficiently.

### Network Scale

Representative values in the slides illustrate the orders of magnitude:

| Interconnect | Approx. bandwidth | Approx. latency |
|---|---:|---:|
| 10 Gigabit Ethernet | 10 Gb/s | 4 μs |
| 40 Gigabit Ethernet | 40 Gb/s | 4 μs |
| InfiniBand EDR | 100 Gb/s | 1 μs |
| NVLink | over 400 Gb/s | 0.1–0.2 μs |

The exact numbers vary by generation and topology, but the principle is stable: moving values between devices can cost much more than operating on values already local to an accelerator.

Effective bandwidth can be far below the link's advertised rate because of protocol overhead, contention, topology, and incomplete overlap. Profiling should measure application-level collective time rather than infer it from hardware specifications.

TPU pods also expose topology: chips are grouped under hosts and NUMA domains and connected by a dedicated inter-chip network.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-103-01.webp" alt="TPU VM topology, slide 103, figure 1" loading="lazy" decoding="async">
  <figcaption>A TPU VM groups chips under hosts and NUMA domains while the inter-chip network carries collectives.</figcaption>
</figure>


### Collectives

NVIDIA's NCCL library provides topology-aware collective operations:

- broadcast;
- reduce;
- reduce-scatter;
- all-gather;
- all-reduce;
- point-to-point send and receive.

NCCL optimizes paths across PCIe, NVLink, and Mellanox networking. Efficient implementations try to overlap communication with backpropagation, beginning reduction for later-layer gradients while earlier layers are still computing.

Collectives encode a group operation rather than a specific topology. An all-reduce can be implemented with a ring, tree, hierarchical scheme, or a combination selected for message size and machine layout.

### Scaling and Precision

Scaling can be **vertical** or **horizontal**. Scale-up places more/faster accelerators inside one tightly connected node; DGX-1 with eight P100s and DGX-2 with sixteen V100s are examples from the slides. Scale-out adds nodes, as in large systems such as Summit or Sierra. Scale-out offers more total resources but makes network behavior and failure management increasingly important.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-065-01.webp" alt="Multi-GPU scale-up and scale-out, slide 65, figure 1" loading="lazy" decoding="async">
  <figcaption>DGX diagrams compare PCIe and NVLink connectivity inside scale-up nodes.</figcaption>
</figure>

At larger scale, topology becomes a hierarchy of accelerator links, CPU sockets, and inter-node paths.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-065-02.webp" alt="Multi-GPU scale-up and scale-out, slide 65, figure 2" loading="lazy" decoding="async">
  <figcaption>Summit-style scale-out combines tightly connected local GPUs with network links between nodes.</figcaption>
</figure>

Lower precision such as FP16 can reduce memory use and increase tensor-core throughput. Mixed-precision training keeps numerically sensitive operations or master weights in higher precision. Precision is therefore both a performance tool and a numerical-stability constraint.



## 10. Parallelism

### Data and Model

When a workload is too large for one device, work can be partitioned by data, model, or both.

**Data parallelism** places a complete model replica on each worker and sends each replica a different data shard. Workers compute local gradients, then aggregate them before the next update. This is simple and effective when one model replica fits in device memory.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-077-01.webp" alt="Data parallelism, slide 77, figure 1" loading="lazy" decoding="async">
  <figcaption>Data parallelism keeps a complete model replica per worker and assigns a different data shard.</figcaption>
</figure>

**Model parallelism** partitions a model across devices. A simple five-layer network mapped to four learners must transfer activations wherever a layer boundary crosses devices. A poor partition creates excessive communication; locality and physical connectivity matter.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-071-01.webp" alt="Model parallelism, slide 71, figure 1" loading="lazy" decoding="async">
  <figcaption>Model parallelism divides one network across device boundaries.</figcaption>
</figure>

Data parallelism mainly increases compute throughput; model parallelism mainly addresses per-device memory capacity. The first adds gradient synchronization, while the second adds activation and intra-model communication. This difference guides where each dimension should be placed in a cluster.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-069-01.webp" alt="Distributed training with NCCL, slide 69, figure 1" loading="lazy" decoding="async">
  <figcaption>NCCL coordinates tensor work across multiple GPUs and nodes.</figcaption>
</figure>


### Pipeline Parallelism

**Pipeline parallelism** places consecutive layer groups on different devices. Dividing a batch into micro-batches allows stages to operate concurrently, as in GPipe. The activation-memory requirement can scale with the number of in-flight micro-batches, written as $O(M)$ in the slides. Empty stage slots at startup and shutdown create pipeline **bubbles**.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-072-01.webp" alt="GPipe pipeline parallelism, slide 72, figure 1" loading="lazy" decoding="async">
  <figcaption>GPipe uses micro-batches so forward and backward work can overlap across stages.</figcaption>
</figure>

For an ideal pipeline with $S$ balanced stages and many micro-batches, speedup approaches $S$, but bubbles, unequal stage time, communication, and update boundaries reduce it. Deeper models provide more partitioning opportunities, while shallow or unbalanced models leave devices idle. Ordinary synchronous SGD also places weight updates at batch boundaries; some schedules introduce weight staleness to keep stages busy.

More micro-batches reduce the fraction of time spent filling and draining the pipeline, but require more in-flight state and can affect the effective batch. A good partition also balances stage execution time; one slow stage determines pipeline throughput.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-vector-122-01.webp" alt="Deep-learning pipeline schedules, slide 122, figure 1" loading="lazy" decoding="async">
  <figcaption>Pipeline schedules differ in bubble size, activation lifetime, and forward/backward interleaving.</figcaption>
</figure>


### Tensor Parallelism

**Tensor parallelism** partitions individual tensor operations inside a layer. It supports layers too large for one device, but usually requires collectives at every layer, so it is best within a fast local interconnect.

For a matrix multiplication, workers may split rows or columns and then combine partial activations. Because this communication lies on the critical path of every transformer block, tensor-parallel groups are usually kept within an NVLink-connected node when possible.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-075-01.webp" alt="Tensor and data parallelism, slide 75, figure 1" loading="lazy" decoding="async">
  <figcaption>Tensor-parallel groups split layers while data-parallel groups synchronize replicas.</figcaption>
</figure>


### Hybrid Layout

Modern LLM training combines these methods:

Another example uses two-way tensor parallelism inside each model replica and eight-way data parallelism across replicas. These dimensions form independent process groups: a worker participates in one group for tensor communication and another for replica synchronization.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-074-01.webp" alt="Hybrid data and pipeline parallelism, slide 74, figure 1" loading="lazy" decoding="async">
  <figcaption>A hybrid layout maps pipeline stages and data-parallel replicas onto separate groups.</figcaption>
</figure>

Parallel dimensions multiply. If tensor parallelism is 2, pipeline parallelism is 4, and data parallelism is 8, the job uses $2\times4\times8=64$ workers before accounting for expert parallelism or fault-tolerance replicas.


### Memory Strategies

Systems such as SageMaker model parallel add:

- pipeline and tensor partitioning;
- optimizer-state sharding;
- activation checkpointing, which recomputes activations instead of storing all of them;
- activation offloading to host memory;
- automated or assisted placement.

These techniques exchange one resource for another. Sharding saves device memory but increases communication. Checkpointing saves activation memory but increases compute. Offloading extends capacity but uses a slower memory path. A good configuration respects both the model graph and machine topology.

Optimizer sharding underlies methods such as ZeRO and FSDP: instead of keeping every optimizer value, gradient, and parameter replica on every data-parallel rank, selected states are partitioned and gathered when needed. The saving can make a previously impossible model trainable, at the cost of more communication and implementation complexity.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-076-01.webp" alt="Optimizer-state sharding, slide 76, figure 1" loading="lazy" decoding="async">
  <figcaption>Optimizer-state sharding distributes parameter, gradient, and optimizer-state ownership.</figcaption>
</figure>



## 11. Sync and Benchmarks

### Synchronous Training

Data-parallel workers must combine gradients. In a **parameter-server** architecture, workers send gradients to a central server, which aggregates them, updates the model, and distributes new parameters. This is simple, but the server and its network links can become bottlenecks.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-vector-078-01.webp" alt="Parameter-server synchronization, slide 78, figure 1" loading="lazy" decoding="async">
  <figcaption>A parameter server receives gradients from replicas and returns updated parameters.</figcaption>
</figure>

In **synchronous SGD**, all required workers compute from the same parameter version and the update waits for them. Statistical semantics are clean, but a slow worker delays everyone. Stragglers arise from variation in compute time, data access, network congestion, and shared infrastructure.

**K-synchronous** methods update after the first $K$ worker results. Remaining work may be cancelled. **K-batch synchronous** methods wait for $K$ mini-batches rather than $K$ distinct workers, so a fast worker may contribute more than once. Cancellation policy and contribution rules distinguish the variants.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-080-01.webp" alt="Synchronous SGD variants, slide 80, figure 1" loading="lazy" decoding="async">
  <figcaption>Fully synchronous, K-synchronous, and K-batch synchronous SGD use different update conditions.</figcaption>
</figure>

Choosing $K<P$ reduces sensitivity to the slowest workers but uses fewer samples per update and may waste cancelled computation. K-batch policies better exploit fast workers, yet can overweight their data if shards are not statistically interchangeable.


### Async and Staleness

In **asynchronous SGD**, a worker sends its result immediately and fetches new parameters without waiting for peers. If it computed using $\boldsymbol\theta_{t-\tau}$ while the server is already at $\boldsymbol\theta_t$, its gradient

$$
\nabla J(\boldsymbol\theta_{t-\tau})
$$

is stale. **K-asynchronous** and **K-batch asynchronous** variants update after a specified number of arriving results, generally without cancelling ongoing work.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-082-01.webp" alt="Stale gradients, slide 82, figure 1" loading="lazy" decoding="async">
  <figcaption>Workers can produce gradients from different parameter versions, creating staleness.</figcaption>
</figure>

Asynchronous policies differ in whether one arrival, $K$ workers, or any $K$ mini-batches trigger an update.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-083-01.webp" alt="Asynchronous SGD variants, slide 83, figure 1" loading="lazy" decoding="async">
  <figcaption>Async, K-async, and K-batch async trade coordination for throughput.</figcaption>
</figure>

Async execution may reduce error faster per unit of wall-clock time because devices wait less, yet stale gradients can raise the final error floor. A system must compare **time to the same target quality**, not only seconds per iteration.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-084-01.webp" alt="Convergence-runtime trade-off, slide 84, figure 1" loading="lazy" decoding="async">
  <figcaption>Synchronization policies trace different convergence-error curves over wall-clock time.</figcaption>
</figure>

Staleness is especially harmful when parameters move rapidly or gradients from different workers point in conflicting directions. Bounded-staleness policies, smaller learning rates, and delay-aware optimization can improve stability, but each changes the original optimization process.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-084-02.webp" alt="Convergence-runtime trade-off, slide 84, figure 2" loading="lazy" decoding="async">
  <figcaption>Synchronous training may take longer but reach a lower final loss.</figcaption>
</figure>


### Ring All-Reduce

In synchronous data-parallel training, every worker must obtain the sum or average of all workers' gradients. A centralized reducer is conceptually simple, but it concentrates all incoming and outgoing traffic on one device.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-086-01.webp" alt="Reduction topologies, slide 86, figure 1" loading="lazy" decoding="async">
  <figcaption>A centralized reducer becomes the communication bottleneck as the worker count grows.</figcaption>
</figure>

**Ring all-reduce** removes that central bottleneck by arranging the $P$ processes in a logical ring. Each process sends only to its next neighbor and receives only from its previous neighbor.

<figure class="llm1-figure llm1-figure--half">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-086-02.webp" alt="Reduction topologies, slide 86, figure 2" loading="lazy" decoding="async">
  <figcaption>The same reduction expressed as balanced neighbor-to-neighbor communication.</figcaption>
</figure>

The final objective is unchanged: every process must finish with the same element-wise sum of all local arrays.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-087-01.webp" alt="All-reduce states, slide 87, figure 1" loading="lazy" decoding="async">
  <figcaption>All-reduce output: every GPU receives the complete reduced array.</figcaption>
</figure>

To distribute the work, each length-$N$ array is divided into $P$ approximately equal chunks. The algorithm then runs in two phases: **reduce-scatter** followed by **all-gather**.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-087-02.webp" alt="All-reduce states, slide 87, figure 2" loading="lazy" decoding="async">
  <figcaption>Partitioning each local array into one chunk per participating GPU.</figcaption>
</figure>

Initially, each GPU owns its own version of every chunk. A chunk must travel around the ring while each receiver adds its corresponding local values.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-088-01.webp" alt="Ring all-reduce algorithm, slide 88, figure 1" loading="lazy" decoding="async">
  <figcaption>The initial per-GPU arrays before any partial sums are exchanged.</figcaption>
</figure>

During reduce-scatter round 1, every GPU sends one chunk clockwise. The receiver immediately reduces that chunk with its local counterpart.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-089-01.webp" alt="Reduce-scatter rounds, slide 89, figure 1" loading="lazy" decoding="async">
  <figcaption>Reduce-scatter round 1: the first neighbor exchange and local reduction.</figcaption>
</figure>

In round 2, the partial sums move to the next neighbor and accumulate another worker's contribution.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-089-02.webp" alt="Reduce-scatter rounds, slide 89, figure 2" loading="lazy" decoding="async">
  <figcaption>Reduce-scatter round 2: partial sums continue around the ring.</figcaption>
</figure>

Round 3 repeats the same local operation. No process needs to receive or transmit the entire gradient at once.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-089-03.webp" alt="Reduce-scatter rounds, slide 89, figure 3" loading="lazy" decoding="async">
  <figcaption>Reduce-scatter round 3: each chunk accumulates one more contribution.</figcaption>
</figure>

After the final illustrated exchange, every chunk has visited the processes needed to form one complete reduction.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-089-04.webp" alt="Reduce-scatter rounds, slide 89, figure 4" loading="lazy" decoding="async">
  <figcaption>The final illustrated reduce-scatter exchange.</figcaption>
</figure>

After $P-1$ reduce-scatter rounds, GPU $i$ owns one fully reduced chunk, but no GPU yet owns the whole reduced array.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-090-01.webp" alt="End of reduce-scatter, slide 90, figure 1" loading="lazy" decoding="async">
  <figcaption>End of reduce-scatter: one completed result chunk is distributed to each GPU.</figcaption>
</figure>

The send/receive schedule is cyclic. For the five-GPU example, the ownership transition can be summarized without preserving a screenshot of the slide's table:

| GPU | Sends | Receives |
|---:|---|---|
| 0 | Chunk 1 | Chunk 0 |
| 1 | Chunk 2 | Chunk 1 |
| 2 | Chunk 3 | Chunk 2 |
| 3 | Chunk 4 | Chunk 3 |
| 4 | Chunk 0 | Chunk 4 |

The **all-gather** phase now circulates the completed chunks without further addition. In round 1, each owner sends its finished chunk to the next GPU.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-092-01.webp" alt="All-gather rounds, slide 92, figure 1" loading="lazy" decoding="async">
  <figcaption>All-gather round 1: completed chunks begin to propagate.</figcaption>
</figure>

In round 2, each GPU forwards the completed chunk received in the preceding round.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-092-02.webp" alt="All-gather rounds, slide 92, figure 2" loading="lazy" decoding="async">
  <figcaption>All-gather round 2: every GPU acquires another finished chunk.</figcaption>
</figure>

Round 3 continues the circulation; communication is balanced because every GPU sends and receives the same amount per round.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-092-03.webp" alt="All-gather rounds, slide 92, figure 3" loading="lazy" decoding="async">
  <figcaption>All-gather round 3: the complete output is progressively replicated.</figcaption>
</figure>

The last exchange delivers the remaining missing chunk to every participant.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-092-04.webp" alt="All-gather rounds, slide 92, figure 4" loading="lazy" decoding="async">
  <figcaption>The final illustrated all-gather exchange.</figcaption>
</figure>

After another $P-1$ rounds, all GPUs hold identical complete results and can independently apply the same parameter update.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-093-01.webp" alt="End of all-gather, slide 93, figure 1" loading="lazy" decoding="async">
  <figcaption>End of all-gather: the fully reduced array is replicated on every GPU.</figcaption>
</figure>

For a gradient containing $N$ values, a centralized parameter-server design moves roughly

$$
2N(P-1)
$$

values through the server. In a bandwidth-efficient ring, each process transfers approximately

$$
\frac{2N(P-1)}{P}.
$$

The factor $1/P$ is the key bandwidth benefit: aggregate work remains substantial, but it is evenly distributed instead of bottlenecked at one reducer. Ring all-reduce is still synchronous; it changes the communication pattern, not the requirement that all workers agree before the next update.

A physical cluster is not always a one-dimensional ring. A two-dimensional torus creates horizontal and vertical rings so that collective communication can better follow the hardware's links.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-099-01.webp" alt="Two-dimensional torus topology, slide 99, figure 1" loading="lazy" decoding="async">
  <figcaption>A two-dimensional torus exposes two ring directions for topology-aware collectives.</figcaption>
</figure>

The slide's $2\times2$ example decomposes the collective across the torus dimensions. Hierarchical implementations similarly reduce within fast local groups before communicating across slower links.

<figure class="llm1-figure llm1-figure--wide">
  <img src="/blog/images/llm1-lecture-1/llm1-slide-100-01.webp" alt="Two-dimensional torus all-reduce, slide 100, figure 1" loading="lazy" decoding="async">
  <figcaption>A torus-aware all-reduce organized across horizontal and vertical communication paths.</figcaption>
</figure>

Ring all-reduce is bandwidth efficient for large messages, but its $2(P-1)$ sequential rounds make latency increasingly important as $P$ grows. Tree or hierarchical algorithms can be better for small messages or multi-level networks, so real communication libraries select and tune algorithms for message size and physical topology.


### Benchmark Rules

Benchmarking distributed training requires both statistical and systems controls. Record:

- target accuracy or loss and the size of the test set;
- total training time and time to target quality;
- model, dataset, batch size, precision, and optimizer;
- framework and version;
- accelerator type and count;
- intra-node and inter-node topology;
- communication library;
- throughput, speedup, scaling efficiency, and overhead.

Speedup and scaling efficiency are

$$
\text{Speedup}(P)=\frac{T_1}{T_P},
\qquad
\text{Efficiency}(P)=\frac{\text{Speedup}(P)}{P}.
$$

Distributed overhead can be estimated by comparing distributed iteration time with corresponding single-device iteration time. Compute-to-communication ratio matters: a larger model or batch can hide communication more easily. Framework compute performance can differ by as much as 50% in the cited comparison. A slower GPU can misleadingly make communication overhead look smaller because there is more compute time to hide it; the slides note that a P100 can be roughly three times faster than a K40 on relevant work.

Strong scaling fixes the total workload and adds workers; weak scaling grows the workload with worker count. They answer different questions and should be labeled. Repeated runs, warm caches, a sufficiently large test set, and disclosed preprocessing prevent noise or hidden work from dominating the conclusion.

### ResNet Case Study

The ImageNet/ResNet-50 table illustrates why one number is insufficient:

| Work | Batch | Hardware | Software/network | Time | Top-1 |
|---|---:|---|---|---:|---:|
| He et al. | 256 | 8× P100 | Caffe | 29 h | 75.3% |
| Goyal et al. | 8K | 256× P100 | Caffe2, 50 GbE | 60 min | 76.3% |
| Cho et al. | 8K | 256× P100 | Caffe, InfiniBand | 50 min | 75.01% |
| Smith et al. | 8K→16K | full TPU pod | TensorFlow | 30 min | 76.1% |
| Akiba et al. | 32K | 1024× P100 | Chainer, InfiniBand FDR | 15 min | 74.9% |
| Jia et al. | 64K | 2048× P40 | TensorFlow, 100 GbE | 6.6 min | 75.8% |
| Ying et al. | 32K | 1024× TPU v3 | TensorFlow | 2.2 min | 76.3% |
| Ying et al. | 64K | 1024× TPU v3 | TensorFlow | 1.8 min | 75.2% |
| Mikami et al. | 54K | 3456× V100 | NNL, dual EDR | 2 min | 75.29% |

Some reported scaling efficiencies are about 90%, 95%, 80%, 87.9%, and 84.75%, depending on the experiment. But the table also shows accuracy changes, different batch sizes, frameworks, networks, and accelerators. A faster headline time may use more hardware or end at lower accuracy.

The practical reading is not “the last row wins.” Ask how much hardware was consumed, whether accuracy targets match, whether the global batch changed optimization, how the network was provisioned, and whether the measurement includes input and validation. Only then can the experiments support a fair systems conclusion.

Lecture 1 closes with preparation for Lecture 2: GCP, Colab, course coupons, cloud clusters, and the first homework around September 12. The broader lesson is already established: model quality and system performance must be designed and measured together. A training method is successful only when it reaches the required quality reliably, reproducibly, and at an acceptable resource cost.
