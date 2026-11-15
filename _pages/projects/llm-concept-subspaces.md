---
permalink: /projects/llm-concept-subspaces/
title: "Beyond the LRH: Concept Subspaces in LLMs"
eyebrow: "UC Berkeley · EECS 182"
period: "Mar 2025 – May 2025"
location: "Berkeley, CA"
summary: "A multidimensional alternative to steering complex semantic concepts with a single latent direction."
image: "/images/projects/cs182.png"
image_alt: "Neural representation analysis"
---

{% include project-detail-header.html %}

## Motivation

Many representation-steering methods assume that a high-level concept can be isolated along one direction in a model’s latent space. This linear-representation view is attractive because it is simple, but complex semantics may occupy several interacting directions.

## Method

We tested the limitations of single-direction steering through controlled perturbations and then represented each target concept as a subspace. Instead of moving an activation along one vector, the method can combine several directions that capture complementary components of the concept.

## Result

Expanding the steering representation from one direction to five increased the measured concept-alignment score from **0.5/5** to **5.0/5** in the project evaluation.

## Contribution

The project provides empirical evidence that concept steering can benefit from explicitly multidimensional representations and offers a practical construction for studying those subspaces.
