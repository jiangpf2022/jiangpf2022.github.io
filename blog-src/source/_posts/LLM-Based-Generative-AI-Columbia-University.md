---
title: LLM-Based Generative AI - Columbia University
date: 2026-09-11 16:15:28
categories:
  - Computer Science Courses
tags:
  - Deep Learning
  - LLM Systems
mathjax: true
cover: "/images/columbia-neural-networks-deep-learning-cover.png"
---

This course studies generative AI from a systems perspective. The model is important, but a production LLM also depends on data, training algorithms, accelerators, communication libraries, serving software, and careful evaluation. These notes reorganize Lecture 1 by concept rather than by slide order, so repeated diagrams and incremental examples are combined into one coherent chapter.

The course will move from deep-learning fundamentals to transformers and LLMs, then cover prompting, retrieval-augmented generation, pre-training, parameter-efficient fine-tuning, efficient serving, alignment, agents, and multimodal systems. Lecture 1 establishes the vocabulary needed to reason about both model quality and system performance.

## Chapter 1: Deep Learning Systems

### 1. ML Systems

A machine learning system is a collection of interacting software and hardware components built to achieve a measurable objective. A useful decomposition is

$$
\begin{aligned}
\text{ML system}
&= \text{data} + \text{algorithm and model} \\
&\quad + \text{software platform} + \text{infrastructure}.
\end{aligned}
$$

The algorithm describes what should be learned, while the system determines whether learning is feasible, reproducible, affordable, and reliable in production. The same model can behave very differently when the data pipeline, numerical precision, framework version, accelerator, or network topology changes.

![The main components of a machine learning system](/images/llm-genai-lecture-1-ml-system-components.webp)

*A model sits inside a larger system made of data, algorithms, software, and hardware infrastructure.*

This distinction also explains why theoretical complexity is not enough. A theoretically efficient algorithm may still be slow because of memory movement, low accelerator utilization, synchronization, or data-loading stalls. End-to-end performance must include everything between raw data and a usable prediction.

The four components are tightly coupled:

- **Data** determines the task, modality, quality ceiling, and preprocessing cost.
- **Model and algorithm** determine accuracy, parameter count, compute, memory, and optimization behavior.
- **Software** includes frameworks, kernels, drivers, containers, orchestration, APIs, testing, and monitoring.
- **Infrastructure** includes CPUs, GPUs or TPUs, memory, storage, and the interconnect between devices and nodes.

For LLMs, this systems view is essential: parameter count alone does not tell us training time, serving latency, or total cost.

### 2. Model Lifecycle

An ML model passes through a lifecycle rather than a single training step:

1. **Data preparation:** collect, clean, deduplicate, label, filter, and split the data.
2. **Feature or representation design:** transform raw inputs into useful model inputs. For LLMs, tokenization is part of this boundary.
3. **Training and tuning:** choose an architecture, objective, optimizer, and hyperparameters.
4. **Validation and hardening:** test generalization, robustness, safety, and failure modes.
5. **Deployment and serving:** package the model, expose an API, and select suitable hardware and batching policies.
6. **Monitoring and continuous learning:** observe latency, errors, distribution drift, quality regressions, and retraining needs.

Every stage has a different performance bottleneck. Data preparation may be I/O-bound, training is often accelerator- and communication-bound, and serving may be constrained by memory capacity, memory bandwidth, or latency targets.

![The AI model training lifecycle](/images/llm-genai-lecture-1-model-training-lifecycle.webp)

*Performance decisions appear throughout the model lifecycle, not only during training.*

Production systems also need properties that are not captured by validation accuracy: reproducibility, traceability, rollback, governance, observability, and predictable APIs. A model can be statistically uncertain, but the surrounding service should still have explicit contracts and controlled failure behavior.

Cloud platforms make heterogeneous compute and storage available on demand, but they do not remove systems decisions. Instance type, accelerator count, storage tier, network bandwidth, autoscaling, and utilization directly affect cost and performance.

### 3. Generalization

The objective of learning is not to memorize the training set; it is to perform well on unseen data drawn from the relevant distribution.

For regression, a common objective is mean squared error:

$$
\operatorname{MSE}
= \frac{1}{n}\sum_{i=1}^{n}
\left(y_i-\hat{f}(x_i)\right)^2.
$$

A model **underfits** when it is too restricted to represent the important structure in the data. Both training and test error remain high. A model **overfits** when it captures training-specific noise or accidental patterns: training error becomes small while test error remains much larger.

The difference between training and test performance is often called the **generalization gap**. Increasing model complexity usually reduces training error, but test error often follows a U-shaped curve: it first decreases as the model captures useful structure, then increases when variance begins to dominate.

![Bias, variance, and the generalization gap as model complexity changes](/images/llm-genai-lecture-1-bias-variance-tradeoff.webp)

*Training error can continue falling after test error starts rising; the gap is a warning sign of overfitting.*

The bias-variance perspective helps explain this behavior:

- **High bias:** predictions are systematically wrong because the model or training procedure is too simple.
- **High variance:** predictions change substantially when the training sample changes because the model is too sensitive to the observed data.

More data can reduce variance, but it does not automatically fix a badly misspecified high-bias model. Increasing capacity may reduce bias, but without enough data or regularization it can increase variance. The goal is not maximum complexity; it is the complexity that gives the best validation performance under the intended deployment conditions.

### 4. Regularization

Regularization discourages solutions that fit the training data through unnecessarily complex parameter values. For a data loss $J_{\text{data}}(\mathbf{w})$, the regularized objective is

$$
\begin{aligned}
J(\mathbf{w})
&= J_{\text{data}}(\mathbf{w}) + \lambda R(\mathbf{w}).
\end{aligned}
$$

where $R$ is a complexity penalty and $\lambda$ controls its strength.

Two standard penalties are

$$
R_{L_2}(\mathbf{w}) = \lVert\mathbf{w}\rVert_2^2,
\qquad
R_{L_1}(\mathbf{w}) = \lVert\mathbf{w}\rVert_1.
$$

$L_2$ regularization, often implemented as weight decay, smoothly shrinks weights toward zero. $L_1$ regularization encourages sparse solutions in which some parameters become exactly zero. Neural networks also use dropout, data augmentation, noise injection, early stopping, and architectural constraints as forms of regularization.

The value of $\lambda$ must be selected using validation data rather than the test set. If $\lambda$ is too small, the model may retain high variance. If it is too large, the model is forced toward an overly simple high-bias solution. This is another bias-variance tradeoff, not a universally optimal constant.

### 5. Quality Metrics

For binary classification, predictions can be summarized by true positives ($TP$), false positives ($FP$), true negatives ($TN$), and false negatives ($FN$). The most common metrics are

![Confusion matrix and common binary classification metrics](/images/llm-genai-lecture-1-classification-metrics.webp)

*Precision, recall, specificity, and accuracy emphasize different cells of the confusion matrix.*

$$
\text{Accuracy}
= \frac{TP+TN}{TP+TN+FP+FN},
$$

$$
\text{Precision}
= \frac{TP}{TP+FP},
\qquad
\text{Recall}
= \frac{TP}{TP+FN},
$$

$$
\text{Specificity}
= \frac{TN}{TN+FP}.
$$

Accuracy can be misleading for an imbalanced dataset. If only 1% of samples are positive, a classifier that always predicts negative reaches 99% accuracy but has zero recall for the positive class.

The $F_1$ score balances precision and recall using their harmonic mean:

$$
F_1
= 2\frac{\text{Precision}\cdot\text{Recall}}
{\text{Precision}+\text{Recall}}.
$$

Balanced accuracy gives equal weight to sensitivity and specificity:

$$
\text{Balanced Accuracy}
= \frac{\text{Recall}+\text{Specificity}}{2}.
$$

An ROC curve plots true-positive rate against false-positive rate as the decision threshold changes. The metric should always match the cost of errors: a medical screening system may prioritize recall, while a system that triggers an expensive intervention may prioritize precision.

Model metrics and system metrics answer different questions. Accuracy, precision, recall, and loss measure algorithmic quality; training time, inference latency, throughput, memory, energy, and monetary cost measure whether the system is practical.

### 6. Training Loop and SGD

Deep-learning training repeatedly executes four steps:

1. A **forward pass** computes activations and predictions from the current parameters.
2. The **loss function** compares predictions with targets.
3. **Backpropagation** applies the chain rule to compute parameter gradients.
4. The **optimizer** updates the parameters to reduce future loss.

For parameters $\boldsymbol{\theta}$ and learning rate $\eta$, a gradient-descent update is

$$
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \eta\nabla J\!\left(\mathbf{\theta}^{(t)}\right).
$$

Full-batch gradient descent evaluates the gradient over the entire training set before every update. Stochastic gradient descent (SGD) uses one random example, and mini-batch SGD uses a small subset $\mathcal{B}$:

$$
\widehat{\nabla J}
= \frac{1}{|\mathcal{B}|}
\sum_{i\in\mathcal{B}}
\nabla_{\boldsymbol{\theta}}\ell_i.
$$

The mini-batch gradient is noisy, but it is much cheaper than a full-dataset gradient and maps efficiently to matrix operations on accelerators. The noise can also act as implicit regularization by preventing the optimizer from following a narrow training-set-specific path too precisely.

The main tunable choices include architecture depth and width, activation functions, initialization, optimizer, learning rate, batch size, momentum, and weight decay. These are hyperparameters: they shape the learning process but are not learned directly by ordinary backpropagation.

### 7. Learning Rate and Batch Size

The learning rate controls the size of each parameter update. If it is too large, training may oscillate or diverge; if it is too small, optimization can be unnecessarily slow or become stuck on flat regions. Schedules commonly begin with a warmup and then decay the learning rate during training.

Batch size creates a three-way tradeoff among gradient quality, hardware utilization, and generalization:

- Larger batches estimate the full gradient more accurately and often improve accelerator throughput.
- Smaller batches require less memory and introduce more gradient noise.
- Very large batches reduce the number of parameter updates per epoch and can require careful learning-rate scaling and warmup.

The largest batch that fits in memory is not automatically the best batch. A large batch may improve examples-per-second while producing no improvement in time-to-target-quality. Conversely, a small batch may generalize well but leave the GPU underutilized.

When scaling the batch size across more workers, practitioners often scale the learning rate as a starting heuristic, then verify stability and final quality. The exact relationship depends on the optimizer, model, data, schedule, and training regime; it should be measured rather than assumed.

### 8. Hardware and Communication

Deep learning relies heavily on dense matrix operations. GPUs provide many parallel arithmetic units and high-bandwidth device memory, while TPUs are application-specific accelerators designed around tensor operations. Lower-precision formats such as FP16 or BF16 reduce memory use and increase arithmetic throughput, often through mixed-precision training that retains sensitive operations in higher precision.

Compute is only one part of performance. The memory and communication hierarchy matters:

$$
\text{device memory}
\rightarrow \text{PCIe or NVLink}
\rightarrow \text{intra-node fabric}
\rightarrow \text{inter-node network}.
$$

Communication becomes more expensive as data moves farther from the compute unit. High-performance training therefore tries to maximize useful computation per transferred byte and overlap communication with computation whenever possible.

NVIDIA Collective Communications Library (NCCL) provides optimized operations such as broadcast, reduce, reduce-scatter, all-gather, all-reduce, and point-to-point communication. Its topology-aware algorithms select efficient paths across PCIe, NVLink, and multi-node networks. On large clusters, high bandwidth and low latency are both essential; ordinary network bandwidth alone does not guarantee good scaling.

### 9. Parallelism Strategies

Distributed training uses several complementary forms of parallelism.

**Data parallelism** replicates the model on every worker and gives each worker a different data shard. Each worker computes local gradients, after which the gradients must be synchronized. It is conceptually simple and works well when one model replica fits on a device.

**Model parallelism** partitions the model across devices. It becomes necessary when the parameters, activations, and optimizer state do not fit on one accelerator.

Two important forms of model parallelism are:

- **Pipeline parallelism:** groups of consecutive layers are placed on different devices. A global batch is divided into micro-batches that move through the stages like an assembly line. Empty pipeline slots create bubbles, so scheduling and micro-batch count affect utilization.
- **Tensor parallelism:** individual tensor operations inside a layer are split across devices. This introduces collectives within nearly every layer and therefore needs a fast interconnect.

Modern LLM training usually uses **hybrid parallelism**: data parallelism across replicas, pipeline parallelism across layer groups, and tensor parallelism within large layers. Optimizer-state sharding, activation checkpointing, and activation offloading further reduce memory pressure, but they trade memory savings for communication or recomputation.

![An example combining data parallelism and pipeline parallelism](/images/llm-genai-lecture-1-hybrid-parallelism.webp)

*Hybrid parallelism maps different replicas and model partitions onto groups of GPU workers.*

### 10. Distributed SGD

In parameter-server training, workers compute gradients and send them to a central server. The server aggregates the gradients, updates the weights, and returns new parameters to the workers.

With **synchronous SGD**, the server waits for all required workers before updating. Every gradient corresponds to the same parameter version, but one slow worker can delay the entire step. This is the straggler problem.

With **asynchronous SGD**, workers submit gradients whenever they finish. Hardware utilization can improve because fast workers do not wait, but a worker may compute using an old parameter vector $\boldsymbol{\theta}_{t-\tau}$. The returned gradient

$$
\nabla J(\boldsymbol{\theta}_{t-\tau})
$$

is stale relative to the server's current parameters $\boldsymbol{\theta}_t$. Large staleness can destabilize optimization, slow convergence, or increase the final error floor.

$K$-synchronous and $K$-asynchronous variants lie between the two extremes by updating after a chosen number of gradients or mini-batches. The correct comparison is not iteration time alone. A method with faster iterations may require more iterations to reach the same quality, so wall-clock time to a target metric is the more meaningful objective.

### 11. Ring All-Reduce

All-reduce aggregates gradients across workers and returns the final aggregate to every worker without a permanent central server. Ring all-reduce arranges $P$ workers in a logical ring and divides a gradient vector of $N$ values into $P$ chunks.

![Centralized parameter-server reduction compared with a decentralized ring](/images/llm-genai-lecture-1-reduction-topologies.webp)

*A parameter server concentrates communication at one reducer; a ring distributes reduction work across all workers.*

It has two phases:

1. **Scatter-reduce:** workers circulate chunks and accumulate partial sums. After $P-1$ rounds, each worker owns one fully reduced chunk.
2. **All-gather:** the reduced chunks circulate for another $P-1$ rounds until every worker owns the complete reduced vector.

![The scatter-reduce and all-gather phases of ring all-reduce](/images/llm-genai-lecture-1-ring-all-reduce.webp)

*Each worker begins with a partitioned gradient buffer; reduce-scatter is followed by all-gather.*

Each worker communicates approximately

$$
2\frac{N(P-1)}{P}
$$

values. For large $P$, this approaches $2N$ per worker. A centralized parameter server, by contrast, must receive and send an amount proportional to $2N(P-1)$ at the server, making the server a potential bandwidth bottleneck.

Ring all-reduce is bandwidth-efficient, but it still has latency from $2(P-1)$ communication rounds. Hierarchical or topology-aware collectives can work better on clusters with fast links inside a node and slower links between nodes. Backpropagation also enables overlap: gradients from later layers become available first, so their all-reduce can begin while earlier layers are still computing gradients.

### 12. Honest Benchmarking

Let $T_1$ be the time per iteration on one worker and $T_P$ the time on $P$ workers. It is useful to separate **speedup** from **scaling efficiency**:

$$
S_P = \frac{T_1}{T_P},
\qquad
E_P = \frac{S_P}{P}
= \frac{T_1}{P T_P}.
$$

Ideal linear scaling gives $S_P=P$ and $E_P=1$. These numbers are necessary but not sufficient. Increasing batch size can make scaling efficiency look excellent by increasing the compute-to-communication ratio, even if the larger batch hurts convergence or final quality.

A meaningful benchmark should therefore report:

- the same target accuracy or loss for every system;
- end-to-end time to reach that target;
- throughput and per-step time;
- global batch size, optimizer, learning-rate schedule, and precision;
- model, dataset, framework, accelerator, and interconnect;
- peak memory, communication overhead, and number of workers;
- inference latency percentiles and throughput when serving is evaluated;
- cost or energy when operational efficiency matters.

Communication overhead can be approximated by comparing distributed iteration time with the corresponding single-device computation, but framework and kernel efficiency must also be controlled. A slower GPU or a more compute-heavy model can hide a weak network by artificially increasing the compute-to-communication ratio.

The central lesson of Lecture 1 is that optimization has two meanings. We optimize model parameters to improve statistical quality, and we optimize the surrounding system to reach that quality with acceptable time, memory, reliability, and cost. A successful LLM system requires both.

---

*Lecture source: COMSE6998-015, Introduction to Deep Learning and LLM-Based Generative AI Systems, Lecture 1.*
