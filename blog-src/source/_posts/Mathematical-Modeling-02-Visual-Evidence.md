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

## Course gallery: data plots that carry evidence

The slides begin with real competition figures rather than generic chart names. Read each example by asking what quantity is encoded, what comparison becomes easy, and what conclusion would be hidden in a table.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/visual-03.webp" alt="Fishing-company profit and bankruptcy distributions"><figcaption>Distribution bands reveal both expected profit and downside risk.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-04.webp" alt="Performance indicators across alternatives"><figcaption>Aligned trajectories make policy differences and local reversals visible.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-05.webp" alt="Three-dimensional comparison charts"><figcaption>Perspective makes exact bar-height comparison harder; use depth only when it carries data.</figcaption></figure>
</div>

The first example distinguishes expected outcome from the probability of failure. A modeler should therefore report $E[Y]$ together with a tail measure such as $P(Y<0)$, value at risk, or a prediction interval. The second example shows why identical scales matter across panels. The third is a warning: visual depth should not be added when it distorts height.

## Framework figures: disclose the model's logic

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/visual-07.webp" alt="Layered framework figure"><figcaption>A layered pipeline separates inputs, transformations, models, and outputs.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-08.webp" alt="Geometric model schematic"><figcaption>A geometric schematic is useful when variables have spatial meaning.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-09.webp" alt="Literature and model taxonomy"><figcaption>A taxonomy summarizes alternatives only when the hierarchy is explicit.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-10.webp" alt="Diagramming workflow"><figcaption>Choose a tool after deciding the architecture.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-23.webp" alt="Online diagram example"><figcaption>Consistent modules and arrows make a system reproducible.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-26.webp" alt="Decision framework diagram"><figcaption>A tree is appropriate when branches are explicit decisions or cases.</figcaption></figure>
</div>

A framework figure should be isomorphic to the paper: every important box should have a matching subsection, and every arrow should correspond to data, a parameter, or a logical dependency. Crossing arrows and unlabeled feedback loops usually signal an unresolved model.

## Four production ecosystems

The course shows Matlab, Python, LaTeX, and browser/diagram tools because different graphics require different primitives.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/visual-13.webp" alt="Matlab plot gallery"><figcaption>Gallery browsing can suggest a representation; the final choice must match the claim.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-14.webp" alt="Matlab terrain surface"><figcaption>A surface works when two continuous inputs define a response landscape.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-15.webp" alt="Matlab violin plot"><figcaption>Violin plots show shape and spread that a mean bar suppresses.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-16.webp" alt="Python plotting gallery"><figcaption>Python supports a reproducible path from tidy data to publication output.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-17.webp" alt="Python statistical plot examples"><figcaption>Small multiples keep one scale and one grammar across variables.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-19.webp" alt="LaTeX plotting gallery"><figcaption>LaTeX-native plots preserve mathematical fonts and vector geometry.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-20.webp" alt="LaTeX neural-network diagram"><figcaption>Vector diagrams remain sharp at any paper size.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-21.webp" alt="LaTeX three-dimensional illustration"><figcaption>Use 3-D to explain geometry, not to decorate 2-D measurements.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-24.webp" alt="Online framework diagram"><figcaption>Browser tools lower the cost of collaboration and revision.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-25.webp" alt="Literature review framework"><figcaption>Color groups concepts; it should not replace labels.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-28.webp" alt="PowerPoint scientific figure"><figcaption>PowerPoint can combine images and vector annotations when alignment is controlled.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-29.webp" alt="PowerPoint network figure"><figcaption>Repeated panels support comparison when angle and scale are fixed.</figcaption></figure>
</div>

## Excellent-paper case studies

These figures demonstrate recurring strategies: an end-to-end pipeline, a domain process, a spatial mechanism, a human-system map, and a compact representation of repeated experiments.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/visual-30.webp" alt="Management-policy flowchart"><figcaption>A policy pipeline links environmental signals to management actions.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-31.webp" alt="Complete model overview"><figcaption>An overview should reveal the order of modeling operations at a glance.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-32.webp" alt="Integrated machine-learning framework"><figcaption>Inputs, feature engineering, prediction, and decision layers are separated.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-33.webp" alt="Agricultural process diagram"><figcaption>Domain stages give mathematical modules a physical interpretation.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-34.webp" alt="Multimodal modeling framework"><figcaption>Heterogeneous evidence is integrated without hiding its source.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-35.webp" alt="Trade configuration illustration"><figcaption>A concrete spatial scene defines objects and relations before equations.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-36.webp" alt="Geography field schematic"><figcaption>Perspective is useful because the physical field is genuinely spatial.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-37.webp" alt="Social-system framework"><figcaption>Stakeholder and feedback links make causal assumptions auditable.</figcaption></figure>
</div>

## Machine-learning image vocabulary

Machine-learning figures should distinguish tensors, operations, trainable modules, and temporal direction. Compare all examples below: their value lies in exposing structure rather than in using the same color palette.

<figure class="mm-figure"><img src="/blog/images/mathematical-modeling/visual-38.webp" alt="Coordinated scientific color palettes"><figcaption>The course palette board demonstrates coordinated categorical, sequential, and accent colors. Reuse roles consistently across the paper.</figcaption></figure>

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/visual-39.webp" alt="Tensor blocks"><figcaption>Tensor blocks encode dimensions before a network operation.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-40.webp" alt="Neural network architecture"><figcaption>Layer width, connectivity, and direction carry the information.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-41.webp" alt="Sequence model architecture"><figcaption>Repeated cells and arrows make time dependence explicit.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-42.webp" alt="Recurrent network unfolding"><figcaption>An unfolded diagram separates shared parameters from changing states.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-43.webp" alt="Expansion architecture"><figcaption>Parallel branches should align so their differences are visible.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-44.webp" alt="Learning curve"><figcaption>Learning curves reveal data limitation, underfitting, and saturation.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-45.webp" alt="Retraining diagram"><figcaption>Temporal snapshots communicate intervention and retained information.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-46.webp" alt="Optimization landscapes"><figcaption>Trajectories on loss surfaces explain convergence better than a final score.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-47.webp" alt="Spatial heat maps"><figcaption>Compared heat maps require one shared color scale.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-48.webp" alt="Attention architecture"><figcaption>Show information direction and the object represented by each block.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-49.webp" alt="Tree architecture"><figcaption>Tree layouts encode hierarchy; branch order should carry meaning.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-50.webp" alt="Convolution geometry"><figcaption>Receptive fields are easier to understand geometrically than as prose.</figcaption></figure>
</div>

## Biological and spatial image vocabulary

Biological figures should preserve material balance and compartment boundaries. Maps require projection, legend, scale, and source. I keep all course examples here as a reference library, but a competition paper should select only those that advance its argument.

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/visual-51.webp" alt="Biochemical cycle"><figcaption>A cycle must preserve direction and identify inputs and outputs.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-52.webp" alt="Reaction sequence"><figcaption>Repeated chemical panels support mechanism comparison.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-53.webp" alt="Metabolic network"><figcaption>Pathway diagrams are graphs with semantic nodes and arrows.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-54.webp" alt="Cell metabolism diagram"><figcaption>Compartments prevent a network from becoming an edge cloud.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-55.webp" alt="Molecular mechanism"><figcaption>Use detail only when the model depends on those steps.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-56.webp" alt="Biochemical pathway"><figcaption>Color should distinguish functional classes consistently.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-57.webp" alt="Circular biological map"><figcaption>Circular coordinates suit circular genomes or cycles.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-58.webp" alt="Genomic sequence map"><figcaption>Tracks align multiple measurements to one coordinate.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-59.webp" alt="Biological timeline"><figcaption>A timeline exposes order, duration, and stage transitions.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-60.webp" alt="Protein mechanism"><figcaption>Pair system and molecular scales only when both matter.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-61.webp" alt="Geometric construction"><figcaption>Construction lines make geometric assumptions traceable.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-62.webp" alt="Timeline comparison"><figcaption>Events on a common axis reveal lag and synchronization.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-63.webp" alt="Thematic maps"><figcaption>Maps need comparable bins and a geographic source.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-64.webp" alt="Spatial diversity rasters"><figcaption>Raster maps must report resolution and color meaning.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-65.webp" alt="Coupling framework"><figcaption>Name quantities crossing subsystem boundaries.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-66.webp" alt="Mapped angles"><figcaption>Annotations connect locations to calculated geometry.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-67.webp" alt="Grid classification map"><figcaption>Grid classes require cell definitions and thresholds.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/visual-68.webp" alt="Multi-panel model figure"><figcaption>Every panel in a composite must advance the argument.</figcaption></figure>
</div>

## Forty-minute production exercise

Choose one dataset and produce four artifacts: a distribution view, a relationship view, a framework diagram, and a validation view. For each, write the intended conclusion first; then create the figure; finally ask whether a skeptical reader can recover the variables, units, population, uncertainty, and comparison without the surrounding paragraph. Allocate ten minutes to redesigning the weakest artifact at final-page size. This turns a picture collection into a visual argument.
