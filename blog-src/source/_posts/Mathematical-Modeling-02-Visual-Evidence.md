---
title: Mathematical Modeling 2 - Visual Evidence
date: 2026-09-14 20:00:15
categories: Mathematical Modeling
tags:
  - Data Visualization
  - Scientific Figures
  - Communication
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "How to choose plots, diagrams, color, and layout so that every figure proves one part of the modeling argument."
---

A competition figure has a job: reveal data structure, explain the model, or verify a result. Decoration is optional; evidence is not.

## Two kinds of figures

**Data figures** show observations or outputs: lines, bars, distributions, maps, heatmaps, surfaces, and uncertainty bands. **Structure figures** explain the model: flowcharts, causal diagrams, system boundaries, state transitions, and algorithm pipelines.

Do not use a flowchart to hide an unclear method. A reader should be able to map each box to a definition, equation, algorithm, or result in the text.

## Match the chart to the question

Use the analytical question—not the available software—to choose a graphic:

| Question | Effective view |
|---|---|
| How does a value change? | line plot with honest time spacing |
| How do groups differ? | dot plot, grouped bars, or box/violin plot |
| What is the distribution? | histogram, ECDF, density, or box plot |
| How are two variables related? | scatter plot with fit and residual view |
| What is the spatial pattern? | map with a justified projection and scale |
| Where is the optimum? | contour/surface plot with feasible region |
| How does an algorithm work? | compact process diagram |

Pie charts are acceptable for a few clearly separated proportions, but become difficult to compare when slices are similar. Radar charts can communicate profiles, but should not be used to claim precise quantitative differences.

## Design from a claim

Write the sentence the figure must support before drawing it. Then encode the relevant quantity in position whenever possible; position along a common scale is easier to compare than area, angle, or color.

A complete scientific figure normally needs:

- an informative caption stating the conclusion;
- axis labels and units;
- a readable legend or direct labels;
- sufficient contrast in color and grayscale;
- consistent scales when panels are compared;
- visible sample size or uncertainty where relevant.

Matplotlib treats each `Axes` as the main plotting region and provides titles, labels, legends, scales, ticks, and annotations; this object-oriented structure is useful for building consistent multi-panel figures ([official Axes guide](https://matplotlib.org/stable/users/explain/axes/index.html)).

## Show uncertainty and baselines

A smooth line without uncertainty can be misleading. Depending on the model, add confidence intervals, prediction intervals, bootstrap bands, or scenario envelopes. Distinguish observed points from fitted and forecast values.

Every performance plot needs a reference: a no-change forecast, a simple heuristic, an unoptimized plan, or a known physical limit. Improvement has no meaning without a baseline.

## Color is a variable

Use color deliberately:

- sequential palettes for ordered magnitude;
- diverging palettes around a meaningful center such as zero;
- categorical palettes for unordered groups;
- a single accent to direct attention.

Never use a rainbow palette for ordered measurements. Check that the plot still works for color-vision deficiencies and in grayscale. Keep text dark on light surfaces or light on dark surfaces; thin gray labels over a colored image are not readable evidence.

## Build a visual hierarchy

A modeling report usually needs only a small set of strong figures:

1. a data-quality or exploratory view;
2. a model diagram;
3. a main result comparison;
4. a validation or sensitivity view;
5. an optional decision-oriented summary.

Supporting plots belong in an appendix. Repeating the same result in a table, bar chart, and paragraph wastes space.

## Figure audit

For each graphic, ask:

- What single claim does it support?
- Can the reader identify units and population?
- Are observed, fitted, and forecast values visually distinct?
- Does truncating an axis exaggerate a difference?
- Is uncertainty visible?
- Would the conclusion survive grayscale printing?

Use vector output (`.pdf` or `.svg`) for diagrams and line art when possible; use high-resolution raster output for images and dense heatmaps. Matplotlib supports both interactive and hardcopy backends, including PDF and SVG ([official backend guide](https://matplotlib.org/stable/users/explain/figure/backends.html)).

## Guided workshop: turn a table into an argument

Assume a city tests three traffic-control policies at 40 intersections. The raw table contains intersection, date, policy, traffic volume, mean delay, 95th-percentile delay, and incident count. A beginner often creates one large bar chart of all observations. That picture contains data but answers no precise question.

### Start with three claims

Write the claims before writing plotting code:

1. Policy B reduces typical delay relative to the current policy.
2. The reduction is not created only by low-volume intersections.
3. Policy B does not improve the mean by creating a dangerous upper tail.

The first claim suggests paired differences or a distribution plot. The second suggests delay against volume, with policy encoded consistently. The third requires quantiles, an empirical cumulative distribution, or a box/violin plot—not another mean bar.

### Encode variables deliberately

Position is the most accurate visual channel for quantitative comparison, followed by length. Area, volume, and color intensity are harder to compare. Therefore use an aligned dot plot for policy means rather than circles whose areas encode delay. Use color for policy, marker shape for observed versus simulated values, and line style for forecast versus history. Do not assign three visual channels to the same variable unless accessibility requires redundancy.

When observations are paired by intersection, show that pairing. Plot $d_i=y_{i,B}-y_{i,A}$ with a zero reference line. The sign immediately answers whether B improves each intersection, while the spread shows heterogeneity hidden by the overall mean.

### Build uncertainty into the figure

An interval must be identified. A standard-error bar, confidence interval for a mean, prediction interval for a future observation, and interquartile range answer different questions. For repeated simulations, show median and central 90% simulation range. For sampled intersections, a bootstrap confidence interval can communicate uncertainty in the population mean. State the resampling unit: resampling individual rows is wrong when many rows come from the same intersection.

### Make the caption carry reasoning

A useful caption can stand alone:

> **Figure 2.** Paired change in mean delay for 40 intersections under Policy B relative to the current policy. Negative values indicate improvement. Points show held-out observations; horizontal lines show 95% bootstrap confidence intervals obtained by resampling intersections. Improvements persist across traffic-volume quartiles, although three high-volume intersections show no reliable change.

This caption defines the population, comparison, direction, uncertainty, and exception. “Results of Policy B” does none of those things.

### Reproduce the figure safely

Keep data transformation separate from styling. First produce a tidy table with one row per plotted mark; save it; then plot it. Set physical figure dimensions, font sizes, and export format explicitly. Open the exported file rather than trusting the notebook preview. Check it at the size used in the paper, in grayscale, and on a projector or phone if the blog is a target.

### Practice

Take one figure from an earlier report. Write its intended claim in one sentence, list every encoded variable, identify the uncertainty shown, and rewrite the caption. Then remove any legend entry, color, gridline, annotation, or decimal place that does not help the claim. The goal is not minimalism for its own sake; it is maximum evidence per unit of attention.
