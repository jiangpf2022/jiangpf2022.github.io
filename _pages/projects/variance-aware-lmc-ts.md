---
permalink: /projects/variance-aware-lmc-ts/
title: "Variance-Aware LMC Thompson Sampling"
eyebrow: "UNC Chapel Hill · Research"
period: "Apr 2025 – Oct 2025"
location: "Weitong Zhang Lab"
summary: "A theoretical extension of Langevin Monte Carlo Thompson Sampling for linear bandits with action-dependent observation noise."
---

{% include project-detail-header.html %}

## Problem

Standard linear-bandit analyses often assume that every action produces observations with the same noise level. Real systems are frequently heteroscedastic: some actions are intrinsically more uncertain than others. A useful algorithm should account for this structure without losing the computational benefits of approximate posterior sampling.

## Method

The project extends Langevin Monte Carlo Thompson Sampling (LMC-TS) with variance-aware uncertainty. The analysis tracks two coupled effects:

- how action-dependent noise changes the information collected during exploration; and
- how using only a finite number of LMC steps changes the quality of the approximate posterior sample.

## Theoretical contribution

We derived regret bounds that explicitly depend on the finite-step posterior error. This connects practical sampling budgets with exploration efficiency: as the number of LMC steps increases, the approximation approaches the corresponding idealized Gaussian-posterior setting.

## My contribution

I developed the variance-aware extension, integrated current linear-bandit proof techniques into the LMC-TS analysis, and derived bounds describing how finite-step sampling error propagates into cumulative regret.
