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

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **using a figure as evidence rather than decoration**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Three algorithms are tested on twenty instances with different scales.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

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


## Figure critique studio: from “pretty” to persuasive

Suppose a team shows us a line chart with two methods. The blue line is usually below the orange line, so the caption says, “Our method performs better.” I would stop the class here and ask five questions.

First, better according to which metric? If the vertical axis is runtime, lower is better; if it is accuracy, higher is better. A title cannot substitute for an axis label with units. Second, are the curves averages over repeated trials or single runs? If they are averages, where is the variation? Third, were both methods evaluated on the same instances? Pairing matters because one difficult instance can shift both values. Fourth, where is the simple baseline? Fifth, does the displayed range exaggerate a tiny difference?

Let us repair the figure. Store results in tidy form with one row per instance, method, and repetition. Compute paired differences on the same instance. Plot the distribution of those differences or show each paired observation with a connecting line. Add a zero-reference line, because zero now has a direct meaning: neither method wins. Report the median or mean difference with an interval and mention the number of independent instances in the caption.

Now the caption can carry an argument: “Across 20 test instances and 30 independent seeds per instance, Method A reduces median runtime by 18% relative to Method B; the paired 95% bootstrap interval is [12%, 23%]. The advantage narrows on the three smallest instances.” That sentence tells us the comparison, scale, uncertainty, sample structure, and limitation.

### Critique a spatial map

Next, imagine an interpolated risk map colored from green to red. The map looks smooth and convincing, but the monitoring stations are not shown. What could go wrong? A large unobserved region may receive a confident-looking color only because the interpolation routine always returns a number.

The repair has three layers. Show the observation locations as points. Mask or hatch regions that are too far from supporting data. Then validate spatially by holding out stations or blocks rather than random individual rows. If nearby observations leak into both training and testing, the reported error can be much too optimistic.

Color deserves its own decision. Use a sequential palette for low-to-high magnitude, a diverging palette only when there is a meaningful center such as zero, and a categorical palette for unordered classes. Avoid rainbow maps: equal numerical steps do not appear as equal perceptual steps, and artificial boundaries can dominate the reader’s attention. Check that the figure remains interpretable in grayscale and under common color-vision deficiencies.

### Critique a framework diagram

Finally, look at a pipeline diagram containing boxes named “Data,” “Model,” “Optimization,” and “Result.” It is neat, but it communicates almost nothing. Which data? What transformation? Which model output becomes which optimization input? Is validation inside or outside the training loop?

Replace vague arrows with typed information: cleaned observations, estimated parameters, predicted scenario distribution, decision variables, and validated policy metrics. Use one visual grammar consistently—rectangles for operations, documents or cylinders for stored data, and diamonds only for actual branching decisions. If a feedback arrow exists, say whether it represents iterative optimization, online updating, or human revision.

Here is the classroom test: choose one number in the final results table and trace it backward through the diagram. At each arrow, name the file or mathematical object that crosses the interface. If you cannot complete the trace, the diagram is decorating the paper rather than documenting the model.

### A production routine you can repeat

Start every figure with a one-sentence claim written in plain text. Sketch the comparison on paper. Choose the visual encoding only after deciding which quantities must be compared. Generate the figure from saved data through a script; do not manually move points or recolor a single inconvenient bar. Export at the final page size, then read the printed PDF rather than trusting a large monitor.

Before submission, cover the surrounding paragraph and ask a teammate to interpret the figure. If they identify the intended comparison, units, uncertainty, and conclusion, the figure is working. If they merely say “the blue one is better,” the visual still needs context. A strong scientific figure does not just attract the eye; it reduces the amount of trust the reader must place in the author.

One last habit is worth keeping: save the exact table used to draw each figure. When a judge asks why one point is unusual, you should be able to move from the rendered mark back to the observation, transformation, and source record. Visual evidence becomes trustworthy when it is traceable in both directions—from data to picture and from picture back to data.


<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **using a figure as evidence rather than decoration**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Algorithm comparison

**Here is the problem.** Three algorithms are tested on twenty instances with different scales. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Plot paired or normalized performance, show uncertainty across repeated runs, and include the simplest baseline. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A bar chart of raw means hides instance difficulty; a paired distribution reveals consistency and failure cases. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Time-series intervention

**Here is the problem.** A policy begins halfway through a noisy seasonal series. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Mark the intervention, preserve temporal order, show the counterfactual or baseline, and visualize residual uncertainty. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** The figure should distinguish trend, seasonality, and intervention effect rather than inviting a before-after illusion. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Spatial risk map

**Here is the problem.** Risk values are measured at irregular locations and interpolated over a city. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Display sample locations, state the interpolation rule, use a perceptually ordered color map, and mask unsupported regions. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A smooth map is not extra data; uncertainty grows away from observations and must be visible. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Model framework

**Here is the problem.** A multi-stage paper combines preprocessing, estimation, optimization, and validation. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Draw data and decision flow with typed arrows, separate training from evaluation, and label feedback loops. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A framework diagram succeeds when a reader can trace one input to one reported conclusion without guessing. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: claim-first design

Let us slow down at **claim-first design**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats claim-first design as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using a figure as evidence rather than decoration. Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use claim-first design to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: chart selection

Let us slow down at **chart selection**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats chart selection as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using a figure as evidence rather than decoration. Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use chart selection to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: uncertainty encoding

Let us slow down at **uncertainty encoding**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats uncertainty encoding as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using a figure as evidence rather than decoration. Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use uncertainty encoding to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: color semantics

Let us slow down at **color semantics**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats color semantics as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using a figure as evidence rather than decoration. Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use color semantics to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: caption writing

Let us slow down at **caption writing**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats caption writing as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using a figure as evidence rather than decoration. Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use caption writing to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: reproducibility

Let us slow down at **reproducibility**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats reproducibility as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: using a figure as evidence rather than decoration. Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use reproducibility to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Algorithm comparison

Let us revisit **Algorithm comparison**, but this time you are doing the talking. The situation is still this: Three algorithms are tested on twenty instances with different scales. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Plot paired or normalized performance, show uncertainty across repeated runs, and include the simplest baseline. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A bar chart of raw means hides instance difficulty; a paired distribution reveals consistency and failure cases. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Algorithm comparison in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Time-series intervention

Let us revisit **Time-series intervention**, but this time you are doing the talking. The situation is still this: A policy begins halfway through a noisy seasonal series. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Mark the intervention, preserve temporal order, show the counterfactual or baseline, and visualize residual uncertainty. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: The figure should distinguish trend, seasonality, and intervention effect rather than inviting a before-after illusion. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Time-series intervention in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Spatial risk map

Let us revisit **Spatial risk map**, but this time you are doing the talking. The situation is still this: Risk values are measured at irregular locations and interpolated over a city. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Display sample locations, state the interpolation rule, use a perceptually ordered color map, and mask unsupported regions. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A smooth map is not extra data; uncertainty grows away from observations and must be visible. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Spatial risk map in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Model framework

Let us revisit **Model framework**, but this time you are doing the talking. The situation is still this: A multi-stage paper combines preprocessing, estimation, optimization, and validation. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Draw data and decision flow with typed arrows, separate training from evaluation, and label feedback loops. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A framework diagram succeeds when a reader can trace one input to one reported conclusion without guessing. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Model framework in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect claim-first design to chart selection

Draw two boxes labeled **claim-first design** and **chart selection**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from claim-first design to chart selection; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using a figure as evidence rather than decoration to remain auditable.

### Board exercise 2: connect chart selection to uncertainty encoding

Draw two boxes labeled **chart selection** and **uncertainty encoding**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from chart selection to uncertainty encoding; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using a figure as evidence rather than decoration to remain auditable.

### Board exercise 3: connect uncertainty encoding to color semantics

Draw two boxes labeled **uncertainty encoding** and **color semantics**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from uncertainty encoding to color semantics; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using a figure as evidence rather than decoration to remain auditable.

### Board exercise 4: connect color semantics to caption writing

Draw two boxes labeled **color semantics** and **caption writing**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from color semantics to caption writing; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using a figure as evidence rather than decoration to remain auditable.

### Board exercise 5: connect caption writing to reproducibility

Draw two boxes labeled **caption writing** and **reproducibility**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from caption writing to reproducibility; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using a figure as evidence rather than decoration to remain auditable.

### Board exercise 6: connect reproducibility to claim-first design

Draw two boxes labeled **reproducibility** and **claim-first design**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from reproducibility to claim-first design; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind using a figure as evidence rather than decoration to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a figure set in which every panel has one claim, readable units, an uncertainty statement, a baseline, and a caption that explains what the reader should conclude. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute production exercise

Choose one dataset and produce four artifacts: a distribution view, a relationship view, a framework diagram, and a validation view. For each, write the intended conclusion first; then create the figure; finally ask whether a skeptical reader can recover the variables, units, population, uncertainty, and comparison without the surrounding paragraph. Allocate ten minutes to redesigning the weakest artifact at final-page size. This turns a picture collection into a visual argument.
