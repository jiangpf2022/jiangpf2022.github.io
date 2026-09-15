---
title: Mathematical Modeling 16 - Dimension Reduction and Clustering
date: 2026-09-14 19:59:03
categories: Mathematical Modeling
tags:
  - PCA
  - Factor Analysis
  - Clustering
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "A step-by-step introduction to PCA, factor analysis, K-means, hierarchical clustering, DBSCAN, mixture models, and stability."
---

High-dimensional data often contain redundant measurements and hidden groups. Dimension reduction compresses variables; clustering groups observations. They solve different problems and are often used in sequence.

## Why dimension reduction works

Suppose ten city indicators all partly measure economic scale. Treating them independently repeats information and can distort distances or weights. A low-dimensional representation seeks a few directions that retain most systematic variation.

Standardize variables when units and variances should not determine importance. Examine correlations and outliers first; PCA can be dominated by one extreme observation.

## PCA step by step

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
