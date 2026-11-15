---
permalink: /projects/equity-derivative-hedging/
title: "MLP for Optimal Equity Derivative Hedging"
eyebrow: "Bay Area Data Science Summit · First Place"
period: "Feb 2025"
location: "UC Berkeley"
summary: "An exposure-aware neural pipeline for reducing the premium cost of equity derivative hedging."
image: "/images/projects/badss.png"
image_alt: "Equity derivative hedging workflow"
links:
  - label: "Slides"
    url: "/files/badss_ppt.pdf"
  - label: "Report"
    url: "/files/badss_report.pdf"
  - label: "Code"
    url: "https://github.com/jiangpf2022/MLP-for-Optimal-Equity-Derivative-Hedging/tree/main"
---

{% include project-detail-header.html %}

## Problem

Equity derivative hedging must balance premium cost, changing market conditions, and a required exposure target. Static rules struggle when the feature space is high-dimensional and volatility changes over time.

## Pipeline

The project combined three layers:

1. causal time-series alignment, missing-value treatment, and PnL/exposure construction;
2. smooth rank-preserving targets derived from exposure-adjusted returns; and
3. a multilayer perceptron trained with stratified cross-validation.

A modular trading engine then used model scores to prioritize instruments and adapt sell orders while tracking the portfolio’s exposure constraint.

## Results

The final strategy reduced test-set premium cost by **64.5%** relative to the baseline while maintaining the **$10M exposure target**. The project won first place at the UC Berkeley competition endorsed by Wells Fargo.

## My role

I led the international team, coordinated modeling and evaluation, and developed the learning and decision pipeline that connected market features to executable hedging actions.
