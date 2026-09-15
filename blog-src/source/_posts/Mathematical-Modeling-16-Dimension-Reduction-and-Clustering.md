---
title: Mathematical Modeling 16 - Dimension Reduction and Clustering
date: 2026-09-14 19:59:03
categories: Mathematical Modeling
tags:
  - PCA
  - Factor Analysis
  - Clustering
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A step-by-step introduction to PCA, factor analysis, K-means, hierarchical clustering, DBSCAN, mixture models, and stability."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **discovering lower-dimensional structure without inventing clusters through preprocessing choices**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Dozens of correlated indicators describe economic, social, and environmental conditions.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

High-dimensional data often contain redundant measurements and hidden groups. Dimension reduction compresses variables; clustering groups observations. They solve different problems and are often used in sequence.

## Why dimension reduction works

Suppose ten city indicators all partly measure economic scale. Treating them independently repeats information and can distort distances or weights. A low-dimensional representation seeks a few directions that retain most systematic variation.

Standardize variables when units and variances should not determine importance. Examine correlations and outliers first; PCA can be dominated by one extreme observation.

## PCA step by step

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/pca-geometry.svg" alt="PCA axes aligned with long and short directions of a point cloud" loading="lazy">
  <figcaption>PCA rotates the coordinate system: PC1 follows maximum variance and PC2 captures the largest remaining orthogonal variance.</figcaption>
</figure>

For centered matrix $Z$, compute covariance or correlation matrix

$$
S=\frac{1}{n-1}Z^TZ.
$$

Solve

$$
Sv_k=\lambda_kv_k,
$$

with eigenvalues ordered from largest to smallest. Component scores are

$$
F_k=Zv_k.
$$

The explained-variance ratio is $\lambda_k/\sum_j\lambda_j$. Choose components using a scree plot, cumulative explained variance, reconstruction needs, and interpretability. An 80% or 85% threshold is a convention, not a law.

Loadings describe how original variables contribute to components. Signs can flip without changing the component. Name a component only when its high-magnitude loadings support a coherent interpretation.

## PCA versus factor analysis

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/pca-scree.svg" alt="Scree curve of explained variance by component" loading="lazy">
  <figcaption>The elbow is one diagnostic. Combine it with cumulative variance, stability, reconstruction, and downstream usefulness.</figcaption>
</figure>

Factor analysis assumes

$$
x=\Lambda f+\varepsilon,
$$

where common factors $f$ generate shared covariance and $\varepsilon$ captures variable-specific variation. PCA explains total variance; factor analysis models common covariance. Rotation such as Varimax redistributes loadings to make a simpler pattern, but does not create proof that the named latent factors truly exist.

Use PCA for compression and visualization; use factor analysis when latent constructs are part of the scientific question.

## K-means from zero

K-means minimizes within-cluster squared distances:

$$
\min_{C_1,\ldots,C_K}\sum_{k=1}^{K}\sum_{i\in C_k}\|x_i-\mu_k\|_2^2.
$$

The algorithm alternates assignment to the nearest center and recomputation of centers. Because initialization matters, use K-means++ and multiple restarts. K-means prefers spherical, similarly sized clusters and is sensitive to scale and outliers.

Choose $K$ using several views: elbow in within-cluster sum of squares, silhouette score, stability under resampling, and domain usefulness. A numerical index cannot determine whether the groups answer the modeling question.

## Other clustering geometries

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/cluster-geometry.svg" alt="Compact, elongated, and noisy cluster geometries" loading="lazy">
  <figcaption>Different methods encode different geometric assumptions; a cluster returned by software is not automatically a real group.</figcaption>
</figure>

**Hierarchical clustering** repeatedly merges clusters and produces a dendrogram. Linkage determines whether “near” means nearest members, farthest members, average distance, or Ward variance increase.

**DBSCAN** defines dense regions using neighborhood radius $\varepsilon$ and minimum samples. It can find irregular shapes and label sparse points as noise, but one density scale may not suit all groups.

**Gaussian mixture models** assume data arise from multiple Gaussian components and return membership probabilities. They can represent elliptical clusters and uncertainty, but are sensitive to component count and covariance specification.

The scikit-learn user guide compares clustering algorithms and their assumptions, and separates clustering from matrix factorization such as PCA ([official guide](https://scikit-learn.org/stable/user_guide)).

## Validate unsupervised results

There is no true label in most clustering problems. Use:

- internal separation metrics such as silhouette and Davies–Bouldin;
- bootstrap or subsample stability;
- alternative scaling and feature sets;
- external variables not used to fit clusters;
- domain coherence and actionability.

Profile each cluster with size, medians, distributions, and representative cases. Avoid naming clusters before seeing the profiles. If small preprocessing changes completely reorganize groups, report instability rather than presenting the labels as facts.

### Beginner workflow

Standardize the data, visualize the first two PCA scores, run K-means for several $K$, compare with hierarchical clustering and DBSCAN, evaluate stability, and create a profile table. The result should explain both *how* objects were grouped and *why the grouping matters*.

```python
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

Z = StandardScaler().fit_transform(X)
pca = PCA().fit(Z)
scores = pca.transform(Z)
print(pca.explained_variance_ratio_.cumsum())

for k in range(2, 8):
    labels = KMeans(n_clusters=k, n_init=20, random_state=7).fit_predict(Z)
    print(k, silhouette_score(Z, labels))
```

Do not choose $K$ from this printout alone. Inspect cluster sizes, profiles, resampling stability, and whether the groups change any real decision.

## Guided workshop: discover structure without inventing it

Suppose 200 cities are described by 30 socioeconomic, mobility, health, and environmental indicators. The goals are to summarize dominant dimensions and identify groups that may require different policies. Standardization, PCA, and clustering form a workflow, but each step contains modeling choices.

### Prepare the matrix

Remove identifiers and variables that directly encode the answer. Transform severely skewed positive measurements, orient variables consistently when interpretation requires it, and standardize units. Impute before PCA inside a reproducible pipeline. If missingness is informative, add indicators or use methods that model it rather than silently filling all gaps.

PCA diagonalizes the sample covariance or correlation matrix. If $Z$ is standardized, directions $v_k$ solve

$$
v_k=\arg\max_{\|v\|=1,\,v\perp v_1,\ldots,v_{k-1}}
\operatorname{Var}(Zv).
$$

Scores $Zv_k$ locate observations; loadings connect original variables to a component. The sign of a component is arbitrary. Name a component only when several large loadings form a coherent pattern, and report the loading table.

### Select dimension with several signals

Use cumulative explained variance, a scree plot, reconstruction error, parallel analysis, and downstream stability. “Retain enough components for 85% variance” is a convention, not a theorem. A low-variance direction may be important for prediction, while a high-variance direction may represent nuisance scale.

Factor analysis models covariance using latent factors plus variable-specific noise, whereas PCA is a variance-preserving transformation. Rotation can improve interpretability but changes the loading representation. State extraction and rotation methods.

### Match clustering to geometry

K-means minimizes within-cluster squared Euclidean distance and prefers compact, roughly spherical groups. Hierarchical clustering exposes nested merges but depends on linkage. DBSCAN discovers dense shapes and labels sparse points as noise, but scale and varying density are difficult. Gaussian mixtures provide soft probabilities and elliptical clusters under distributional assumptions.

Choose distance deliberately. Euclidean distance on standardized continuous features differs from Manhattan distance; mixed numeric/categorical data may require Gower distance. For time series, shape or dynamic-time-warping distances may be meaningful. The distance function is part of the model.

### Measure stability

Repeat preprocessing and clustering on bootstrap or subsamples, align labels, and measure agreement such as adjusted Rand index. Perturb feature sets and scaling. A high silhouette score with unstable membership is not persuasive. Separate a small “cluster” that exists only because of data errors or extreme scale.

### Turn clusters into decisions

Build profile tables using variables not solely those that forced the clustering. Report size, uncertainty, representative cases, and overlap. Policy should not treat an uncertain boundary as a natural law. Use soft membership or tiers when appropriate, and test whether cluster-specific policies actually outperform a common policy.

### Practice

Analyze the city matrix with PCA plus K-means, hierarchical clustering, DBSCAN, and a Gaussian mixture. Compare geometry, metrics, stability, and interpretability. Name groups only after profiles are produced. Finish with one concrete decision that changes because of the grouping and one warning about how preprocessing could change it.

## The complete unsupervised pipeline

Standardize continuous indicators, encode categories deliberately, and handle missing values inside resampling. PCA diagonalizes the covariance/correlation matrix. For standardized $X$, eigenpairs of $X^\top X/(n-1)$ produce loading directions; scores $Z=XW$ give low-dimensional coordinates. Choose components with cumulative variance, scree shape, reconstruction error, and interpretability—not one threshold alone.

PCA explains variance; factor analysis attributes covariance to latent factors plus unique noise. Rotations can improve interpretability but do not create objective “true” factors. Report loading tables, communalities, factor naming rationale, and sensitivity to the number of factors.

K-means minimizes within-cluster squared Euclidean distance and therefore favors spherical, similar-scale groups. Hierarchical clustering exposes nested structure but depends on linkage. DBSCAN finds dense irregular groups and noise but depends on distance scale and $(\varepsilon,\text{minPts})$. Gaussian mixtures provide soft elliptical memberships under distribution assumptions.

### Validation without labels

Use silhouette, Calinski–Harabasz, and Davies–Bouldin as views, not verdicts. Bootstrap rows, vary preprocessing and hyperparameters, align cluster labels, and calculate pairwise co-clustering stability. Profile clusters with variables not solely those that created them. If tiny preprocessing changes destroy groups, the honest result may be a continuum rather than discrete types.

## City example

For 200 cities and 30 socioeconomic, mobility, health, and environmental indicators: audit redundancy; reverse cost indicators; standardize; use PCA to inspect dominant gradients; cluster in retained-score space; compare K-means, hierarchy, DBSCAN, and GMM; then validate on external outcomes such as policy response. A useful conclusion is not “there are four clusters,” but “two policy packages outperform a common policy for stable groups A/B while boundary cities require probabilistic assignment.”



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **discovering lower-dimensional structure without inventing clusters through preprocessing choices**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: City indicators

**Here is the problem.** Dozens of correlated indicators describe economic, social, and environmental conditions. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Standardize with purpose, inspect PCA loadings, retain components with several diagnostics, then cluster in the reduced space. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Component names come from loading patterns and domain meaning, not from the algorithm. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Customer segments

**Here is the problem.** Behavioral features mix counts, proportions, and monetary values. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Choose transformations and distance deliberately, compare K-means with density or mixture methods, and test stability. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A cluster can reflect measurement scale rather than a real customer segment. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Non-spherical geometry

**Here is the problem.** Points form curved or unequal-density groups. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Visualize neighborhoods and compare K-means, hierarchical linkage, DBSCAN, and Gaussian mixtures. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** K-means optimizes squared distance to centroids and therefore favors compact spherical groups. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Feature redundancy

**Here is the problem.** Many sensors respond to the same physical factor. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Use PCA reconstruction and factor interpretation, then test whether downstream decisions change with dimension. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Compression is valuable when it preserves the information needed for the final task. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: scaling

Let us slow down at **scaling**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats scaling as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: discovering lower-dimensional structure without inventing clusters through preprocessing choices. Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use scaling to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: covariance structure

Let us slow down at **covariance structure**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats covariance structure as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: discovering lower-dimensional structure without inventing clusters through preprocessing choices. Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use covariance structure to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: PCA loadings

Let us slow down at **PCA loadings**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats PCA loadings as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: discovering lower-dimensional structure without inventing clusters through preprocessing choices. Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use PCA loadings to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: distance geometry

Let us slow down at **distance geometry**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats distance geometry as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: discovering lower-dimensional structure without inventing clusters through preprocessing choices. Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use distance geometry to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: cluster validation

Let us slow down at **cluster validation**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats cluster validation as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: discovering lower-dimensional structure without inventing clusters through preprocessing choices. Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use cluster validation to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: stability

Let us slow down at **stability**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats stability as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: discovering lower-dimensional structure without inventing clusters through preprocessing choices. Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use stability to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back City indicators

Let us revisit **City indicators**, but this time you are doing the talking. The situation is still this: Dozens of correlated indicators describe economic, social, and environmental conditions. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Standardize with purpose, inspect PCA loadings, retain components with several diagnostics, then cluster in the reduced space. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Component names come from loading patterns and domain meaning, not from the algorithm. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain City indicators in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Customer segments

Let us revisit **Customer segments**, but this time you are doing the talking. The situation is still this: Behavioral features mix counts, proportions, and monetary values. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Choose transformations and distance deliberately, compare K-means with density or mixture methods, and test stability. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A cluster can reflect measurement scale rather than a real customer segment. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Customer segments in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Non-spherical geometry

Let us revisit **Non-spherical geometry**, but this time you are doing the talking. The situation is still this: Points form curved or unequal-density groups. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Visualize neighborhoods and compare K-means, hierarchical linkage, DBSCAN, and Gaussian mixtures. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: K-means optimizes squared distance to centroids and therefore favors compact spherical groups. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Non-spherical geometry in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Feature redundancy

Let us revisit **Feature redundancy**, but this time you are doing the talking. The situation is still this: Many sensors respond to the same physical factor. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Use PCA reconstruction and factor interpretation, then test whether downstream decisions change with dimension. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Compression is valuable when it preserves the information needed for the final task. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Feature redundancy in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect scaling to covariance structure

Draw two boxes labeled **scaling** and **covariance structure**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from scaling to covariance structure; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind discovering lower-dimensional structure without inventing clusters through preprocessing choices to remain auditable.

### Board exercise 2: connect covariance structure to PCA loadings

Draw two boxes labeled **covariance structure** and **PCA loadings**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from covariance structure to PCA loadings; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind discovering lower-dimensional structure without inventing clusters through preprocessing choices to remain auditable.

### Board exercise 3: connect PCA loadings to distance geometry

Draw two boxes labeled **PCA loadings** and **distance geometry**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from PCA loadings to distance geometry; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind discovering lower-dimensional structure without inventing clusters through preprocessing choices to remain auditable.

### Board exercise 4: connect distance geometry to cluster validation

Draw two boxes labeled **distance geometry** and **cluster validation**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from distance geometry to cluster validation; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind discovering lower-dimensional structure without inventing clusters through preprocessing choices to remain auditable.

### Board exercise 5: connect cluster validation to stability

Draw two boxes labeled **cluster validation** and **stability**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from cluster validation to stability; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind discovering lower-dimensional structure without inventing clusters through preprocessing choices to remain auditable.

### Board exercise 6: connect stability to scaling

Draw two boxes labeled **stability** and **scaling**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from stability to scaling; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind discovering lower-dimensional structure without inventing clusters through preprocessing choices to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is an unsupervised report with preprocessing sensitivity, component diagnostics, multiple clustering geometries, stability under resampling, interpretable profiles, and a decision use for each retained group. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute unsupervised lab

Run PCA with a scree and loading analysis, then four clustering methods on the same prepared matrix. Compare geometry, index values, bootstrap stability, and decision usefulness. Repeat with one alternative scaling and feature set. Name groups only after profiles and uncertainty are visible.
