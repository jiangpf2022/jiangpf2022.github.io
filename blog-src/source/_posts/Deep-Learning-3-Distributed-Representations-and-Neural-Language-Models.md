---
title: Deep Learning 3 - Neural Language Models
date: 2026-09-24 17:00:00
categories: "COMS4776W Neural Networks & Deep Learning"
tags:
  - Language Models
  - Word Embeddings
  - Distributed Representations
  - GloVe
mathjax: true
cover: "/images/columbia-neural-networks-deep-learning-cover.png"
excerpt: "From sentence probabilities and n-grams to neural language models, learned word embeddings, GloVe, and the geometry behind semantic similarity and analogies."
lesson_number: 3
lesson_level: 1
study_time: 50
---

Welcome back - pull up a chair. In [Deep Learning 2](/blog/2026/09/24/Deep-Learning-2-Multilayer-Perceptrons/), we built a multilayer perceptron that could learn a useful hidden representation instead of relying on features chosen entirely by hand. Today we will put that idea to work on language.

The question sounds simple: given a few words, what word is likely to come next? Answering it carefully will take us through probability, maximum likelihood, autoregressive models, n-grams, neural networks, embedding geometry, and GloVe. The common thread is **representation**. A word can be treated as an isolated symbol, or it can be represented by a learned vector that shares statistical information with related words. That choice changes what the model can generalize.

## Why Model Language Probabilistically?

### A speech-recognition motivation

Suppose an acoustic system hears a signal $a$ and must infer the sentence $s$ that produced it. A generative formulation separates the problem into two pieces:

- an **observation model** $p(a\mid s)$, which says how likely sentence $s$ is to produce signal $a$;
- a **language prior** $p(s)$, which says how plausible the sentence is before hearing the audio.

Bayes' rule combines them:

$$
p(s\mid a)
=\frac{p(s)p(a\mid s)}
{\sum_{s'}p(s')p(a\mid s')}.
$$

The denominator normalizes the distribution but does not depend on the particular candidate $s$ once $a$ is fixed. For decoding, we can therefore compare candidates using

$$
\hat s
=\arg\max_s p(s\mid a)
=\arg\max_s p(s)p(a\mid s).
$$

This explains why a language model matters even when the input is not text. Two sentences may sound similar, but a useful prior should prefer a coherent sentence over an unlikely word sequence.

> **Key idea:** a language model assigns a probability to a sequence. That probability can act as a prior, a scoring rule, or the basis for generating the next token.

### Maximum likelihood and log likelihood

Assume the training corpus contains independent sentences $s^{(1)},\ldots,s^{(N)}$. Maximum likelihood chooses parameters that make the observed corpus as probable as possible:

$$
\max_\theta \prod_{i=1}^{N}p_\theta\!\left(s^{(i)}\right).
$$

Products of many probabilities become extremely small, so we work with the logarithm. Since the logarithm is monotone, it does not change the maximizing parameters:

$$
\max_\theta
\sum_{i=1}^{N}\log p_\theta\!\left(s^{(i)}\right).
$$

Equivalently, training minimizes the negative log likelihood. Once targets are represented as one-hot vectors, that objective is exactly the cross-entropy loss used for multiclass classification.

## From Sentence Probability to Next-Word Prediction

### The chain rule of probability

A sentence is a sequence $s=(w_1,w_2,\ldots,w_T)$. The chain rule factorizes its joint probability without making any approximation:

$$
\begin{aligned}
p(s)
&=p(w_1,w_2,\ldots,w_T)\\
&=p(w_1)
  p(w_2\mid w_1)
  p(w_3\mid w_1,w_2)
  \cdots
  p(w_T\mid w_1,\ldots,w_{T-1})\\
&=\prod_{t=1}^{T}p(w_t\mid w_{<t}).
\end{aligned}
$$

The notation $w_{<t}$ means all words before position $t$. A model of complete sentences has therefore become a collection of next-word prediction problems.

This factorization is **autoregressive**: the model predicts each word from earlier words, and a generated word becomes part of the context for future predictions. During training we normally provide the true previous words; during generation the model conditions on its own earlier outputs.

### A finite-context Markov assumption

Conditioning on the entire history is expensive. A classical simplification assumes that the next word depends only on the previous $K$ words:

$$
p(w_t\mid w_1,\ldots,w_{t-1})
\approx
p(w_t\mid w_{t-K},\ldots,w_{t-1}).
$$

For $K=3$, the model looks at the previous three words. This is often called a finite-memory or Markov assumption. It makes the problem manageable, but it also prevents the model from using information farther back than its context window.

> **Do not mix up the two steps:** the chain-rule factorization is exact; replacing the full history by a fixed-length context is an approximation.

## N-Gram Language Models

### Estimating probabilities with counts

An n-gram is a sequence of $n$ consecutive words. If the context contains two words and the target is the third, we have a trigram model:

$$
\begin{aligned}
p(w_3=\text{cat}\mid w_1=\text{the},w_2=\text{fat})
&=\frac{p(\text{the},\text{fat},\text{cat})}
{p(\text{the},\text{fat})}\\
&\approx
\frac{\operatorname{count}(\text{the fat cat})}
{\operatorname{count}(\text{the fat})}.
\end{aligned}
$$

The name counts the target as well as the context: two context words plus one predicted word form a **3-gram**, not a 2-gram.

This estimator is attractive because it is transparent. Every probability comes from a frequency table. But that table grows rapidly. With vocabulary size $V$ and context length $K$, a direct conditional table has on the order of $V^{K+1}$ entries. Increasing the context by one word multiplies the space by another factor of $V$.

### Sparsity is more serious than storage

Even a huge corpus contains only a tiny fraction of all grammatically possible n-grams. An unseen n-gram receives probability zero under the naive empirical estimator. Since sentence probability is a product, one zero factor makes the entire sentence probability zero.

Traditional repairs include:

- shortening the context, which reduces sparsity but discards information;
- smoothing the counts so unseen events receive some probability mass;
- interpolating or backing off across models with different context lengths.

These techniques help, but a deeper problem remains. A count table treats every phrase as a separate case. Evidence about “the cat sat” does not automatically help with “the dog sat,” even though *cat* and *dog* play similar roles.

## From Localist to Distributed Representations

### What does localist mean?

In a one-hot representation, each word owns one coordinate. If the vocabulary has size $V$, word $w_i$ is represented by a vector $mathbf e_i\in\mathbb R^V$ containing one 1 and $V-1$ zeros. Different words are orthogonal:

$$
\mathbf e_i^T\mathbf e_j=0\qquad(i\ne j).
$$

This representation preserves identity but says nothing about similarity. “Cat” is just as far from “dog” as it is from “parliament.” A conditional probability table is localist in the same sense: information about a word or context is stored in its own isolated row or column.

A **distributed representation** uses many coordinates jointly. A word might participate in several latent properties - semantic topic, syntactic role, plurality, animacy, or something that has no clean human label. Information about one word is spread across dimensions, and each dimension is reused by many words.

### Why sharing changes generalization

Suppose a model has observed:

> The cat rested in the garden on Friday.

It should learn something useful for:

> The dog slept in the yard on Monday.

An n-gram table mostly sees different symbols. A distributed model can place *cat* near *dog*, *rested* near *slept*, *garden* near *yard*, and *Friday* near *Monday*. Training on one sentence can then affect predictions in nearby contexts.

> **Key idea:** distributed representations do not merely compress the vocabulary. They create a geometry in which statistical evidence can be shared between related words.

## The Neural Language Model

### The supervised learning view

With a context of $K$ words, neural language modeling is a multiclass prediction problem:

- **input:** $w_{t-K},\ldots,w_{t-1}$;
- **target:** the next word $w_t$;
- **output:** a probability distribution over the vocabulary;
- **loss:** multiclass cross-entropy.

If $mathbf t_t$ is the one-hot target and $mathbf y_t$ is the predicted softmax distribution, the negative log likelihood of a sentence is

$$
\begin{aligned}
-\log p(s)
&=-\log\prod_{t=1}^{T}p(w_t\mid w_{<t})\\
&=-\sum_{t=1}^{T}\log p(w_t\mid w_{<t})\\
&=-\sum_{t=1}^{T}\sum_{v=1}^{V}t_{tv}\log y_{tv}.
\end{aligned}
$$

Because $mathbf t_t$ is one-hot, only the log probability of the correct next word contributes at each position.

### An embedding lookup is a linear layer

Let $R\in\mathbb R^{d\times V}$ be an embedding matrix. Multiplying it by a one-hot word vector selects one column:

$$
\mathbf r_i=R\mathbf e_i.
$$

The columns of $R$ are tied across all positions and examples, so the same word always retrieves the same learned vector. This operation is often implemented as a lookup table, but mathematically it is a linear layer applied to a one-hot input.

For a context of $K$ words, the model retrieves $K$ embeddings and concatenates them:

$$
\mathbf c_t=
\begin{bmatrix}
\mathbf r_{t-K}\\
\vdots\\
\mathbf r_{t-1}
\end{bmatrix}
\in\mathbb R^{Kd}.
$$

An MLP transforms this context, and a final softmax produces the next-word distribution:

$$
\begin{aligned}
\mathbf h_t&=\phi(W_h\mathbf c_t+\mathbf b_h),\\
\mathbf z_t&=W_o\mathbf h_t+\mathbf b_o,\\
\mathbf y_t&=\operatorname{softmax}(\mathbf z_t).
\end{aligned}
$$

A classic neural language model may also include a direct or **skip-layer connection** from the input embeddings to the output logits. The nonlinear path learns interactions among context words; the direct path lets simpler predictive relationships bypass the hidden layer.

Compared with an n-gram table, the dependence on context length is linear rather than exponential. The model still pays for a large vocabulary in the embedding matrix and output softmax, but it no longer needs a separate parameter for every possible context.

## The Geometry of Word Embeddings

### Dot products, distance, and cosine similarity

Once words are vectors, we can compare them geometrically. Two common measures are the dot product

$$
\mathbf r_1^T\mathbf r_2
$$

and Euclidean distance

$$
\lVert\mathbf r_1-\mathbf r_2\rVert_2.
$$

Expanding the squared distance gives

$$
\begin{aligned}
\lVert\mathbf r_1-\mathbf r_2\rVert_2^2
&=(\mathbf r_1-\mathbf r_2)^T(\mathbf r_1-\mathbf r_2)\\
&=\lVert\mathbf r_1\rVert_2^2
-2\mathbf r_1^T\mathbf r_2
+\lVert\mathbf r_2\rVert_2^2.
\end{aligned}
$$

If both vectors have unit norm, then

$$
\lVert\mathbf r_1-\mathbf r_2\rVert_2^2
=2-2\mathbf r_1^T\mathbf r_2.
$$

For normalized vectors, ranking by smallest Euclidean distance is therefore equivalent to ranking by largest dot product. The normalized dot product is cosine similarity:

$$
\cos(\mathbf r_1,\mathbf r_2)
=\frac{\mathbf r_1^T\mathbf r_2}
{\lVert\mathbf r_1\rVert_2\lVert\mathbf r_2\rVert_2}.
$$

### High-dimensional intuition and 2-D plots

Embeddings often have dozens or hundreds of dimensions. In high dimensions, most randomly oriented vectors are nearly orthogonal, and most points are far apart. A vector can nevertheless be close to several words along different semantic directions - a useful possibility that two dimensions cannot faithfully display.

Methods such as t-SNE map embeddings into two dimensions for visualization. They are useful for revealing local clusters, but the picture is not the original geometry. A two-dimensional projection cannot preserve every pairwise distance from a high-dimensional space, so apparent neighbors or gaps should not be treated as definitive evidence.

## Learning Embeddings with GloVe

### The distributional hypothesis

Training a full neural language model can be expensive, especially when its softmax must score every word. If the main goal is a useful word representation, we can learn directly from global co-occurrence statistics.

The guiding principle is the **distributional hypothesis**: words appearing in similar contexts tend to have similar meanings - often summarized as “judge a word by the company it keeps.”

Construct a co-occurrence matrix $X\in\mathbb R^{V\times V}$, where $x_{ij}$ counts how often word $j$ appears near word $i$ within a chosen context window. A basic low-rank model writes

$$
X\approx R\widetilde R^T,
$$

with $R,\widetilde R\in\mathbb R^{V\times d}$ and $d\ll V$. Row $mathbf r_i$ of $R$ is a $d$-dimensional representation of word $i$, and

$$
x_{ij}\approx\mathbf r_i^T\widetilde{\mathbf r}_j.
$$

Minimizing

$$
\lVert X-R\widetilde R^T\rVert_F^2
=\sum_{i,j}\left(x_{ij}-\mathbf r_i^T\widetilde{\mathbf r}_j\right)^2
$$

resembles a low-rank matrix factorization such as PCA. But applying ordinary least squares directly creates two problems:

1. $X$ is enormous and sparse, so iterating over every zero is wasteful.
2. Word counts are heavy-tailed, so a few extremely common words dominate squared error.

### The GloVe objective

GloVe fits log co-occurrence counts and gives each observed pair a controlled weight:

$$
J
=\sum_{i,j}f(x_{ij})
\left(
\mathbf r_i^T\widetilde{\mathbf r}_j
+b_i+\widetilde b_j
-\log x_{ij}
\right)^2,
$$

where

$$
f(x)=
\begin{cases}
\left(\dfrac{x}{100}\right)^{3/4}, & x<100,\\[6pt]
1, & x\ge100.
\end{cases}
$$

The biases absorb overall word frequencies. Taking $\log x_{ij}$ compresses the huge dynamic range of counts. The weighting function prevents rare pairs from receiving the same confidence as frequent pairs while capping the influence of very common pairs. Since $f(0)=0$, the objective only needs nonzero entries, which is a major computational saving for a sparse matrix.

GloVe and a neural language model use different training signals. The neural model learns to predict the next word from ordered local context; GloVe factorizes aggregated, usually unordered co-occurrence statistics. Both can produce a useful embedding geometry because both force words with related contexts to share parameters.

## Word Analogies and What They Mean

Some semantic relations appear approximately as directions in embedding space. For example,

$$
\mathbf r_{\text{Paris}}-\mathbf r_{\text{France}}
\approx
\mathbf r_{\text{London}}-\mathbf r_{\text{England}}.
$$

To answer “Paris is to France as London is to what?”, one searches for a word vector close to

$$
\mathbf r_{\text{France}}
-\mathbf r_{\text{Paris}}
+\mathbf r_{\text{London}}.
$$

This arithmetic works when a relation is represented consistently across several word pairs. It is evidence that distributed representations can organize more than simple topical similarity.

But analogies are not logical rules. Their quality depends on the corpus, context definition, objective, dimensionality, and similarity measure. Embeddings also inherit social and historical biases from their training data. A visually appealing analogy should therefore be treated as a diagnostic of learned geometry, not as proof that the model understands the relation in a human sense.

## One Conceptual Map

The models in this blog answer related questions with increasingly reusable representations:

| Model | What is stored? | Main strength | Main limitation |
| --- | --- | --- | --- |
| N-gram | Counts for specific contexts | Transparent empirical probabilities | Exponential table and severe sparsity |
| Neural language model | Embeddings plus a predictive network | Shares evidence and models nonlinear context effects | Large output softmax; fixed context here |
| GloVe | Low-dimensional factors of global co-occurrence | Efficient standalone word representations | Loses word order and sentence-level context |

The route from counts to vectors is the central lesson. A one-hot vector tells us which word we have. An embedding also gives the learning system a notion of which words can support one another statistically. The coordinates do not need names; what matters is that the geometry helps the model predict.

This is also where the next technical question appears. We have described the computation from embeddings to loss, but how does the error update the output layer, hidden layer, and embedding table together? The answer is **backpropagation**: repeated application of the chain rule through the computational graph.
