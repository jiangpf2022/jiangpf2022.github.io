---
permalink: /projects/hybrid-quality-prediction/
title: "Hybrid ML for Quality Prediction"
eyebrow: "Machine Learning Project"
period: "Feb 2024 – Jun 2024"
summary: "A robust prediction pipeline combining PCA, Huber loss, classical models, and ensemble learning."
image: "/images/projects/cs182.png"
image_alt: "Quality prediction model analysis"
links:
  - label: "Slides"
    url: "/files/cs182_ppt.pdf"
  - label: "Report"
    url: "/files/cs182_report.pdf"
  - label: "Code"
    url: "https://github.com/jiangpf2022/CS182-Project"
---

{% include project-detail-header.html %}

## Modeling challenge

Wine-quality prediction involves correlated physicochemical measurements, noisy labels, and residuals that can be dominated by a small number of atypical samples. A model that ignores those properties can fit unstable directions in the data.

## Dimensionality and signal

Principal component analysis was used as targeted denoising rather than generic compression. It reduced redundancy among correlated measurements and exposed lower-dimensional structure that could be used by downstream predictors.

## Robust optimization

Huber loss interpolates between squared and absolute error. Small residuals retain the smooth behavior of an L2 objective, while large residuals receive less leverage, improving stability when labels are noisy or heavy-tailed.

## Hybrid pipeline

The transformed representation and robust objective were evaluated with classical linear models and ensemble methods such as XGBoost. This design separates data conditioning, optimization robustness, and predictive capacity so that each component can be tested independently.
