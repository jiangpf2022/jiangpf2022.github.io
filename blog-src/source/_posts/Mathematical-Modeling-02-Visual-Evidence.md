---
title: 3 - Visual Evidence
date: 2026-09-14 20:00:15
permalink: 2026/09/14/Mathematical-Modeling-03-Visual-Evidence/
categories: Mathematical Modeling
tags:
  - Data Visualization
  - Scientific Figures
  - Communication
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 80
lesson_number: 3
lesson_level: 1
review_lock: false
excerpt: "A 100-figure field guide to charts, maps, diagrams, scientific graphics, visual diagnostics, and award-level evidence in mathematical modeling papers."
---

Open one of your recent reports and place it beside this page. Do not look for the prettiest figure. Find the figure that carried the most important claim—today we are going to ask whether it actually proved what the caption promised.

Today we are going to change the way you think about figures. A chart is not the colorful thing added after the mathematics is finished. A diagram is not an apology for an equation that looks difficult. In a modeling paper, a figure is **visual evidence**: a compact, inspectable answer to a precise question. It may show that a pattern exists, that two plans differ, that a mechanism is plausible, that an optimization respects its constraints, that uncertainty has been measured, or that a recommendation survives a stress test.

This distinction matters in CUMCM and MCM/ICM papers because a judge reads quickly. The mathematics may be correct, yet the argument can still fail if the reader cannot find the comparison, trace the workflow, or see where the recommendation comes from. Conversely, a beautiful plot can be actively harmful when its scale exaggerates a tiny effect, its colors conceal uncertainty, or its 3D perspective prevents quantitative reading. Good visual design is therefore not cosmetic. It is part of model verification and scientific honesty.

<div class="mm-key-box">
  <span class="mm-callout-label">The visual-evidence contract</span>
  <p>Before drawing, complete this sentence: <strong>“After seeing this figure, the reader should believe ___ because the figure compares ___ under ___.”</strong> If you cannot fill the blanks, you are not ready to choose a chart type.</p>
</div>

The 100 figures below are original teaching reconstructions built with synthetic values. They are informed by recurring visual patterns in official CUMCM materials, COMAP's Outstanding-paper archive, and competition visualization practice, but they do not reproduce an award paper page or claim to recreate any team's numerical result. This choice is deliberate: it lets us study composition, encoding, and reasoning without detaching someone else's figure from its data and copyright context. Each example names the claim, explains why the encoding works, identifies a common failure, and gives a practical recipe you can reproduce with your own evidence.

Do not read this as a catalogue to memorize. Stop at each image and cover the explanation. Ask yourself four questions: What is the claim? What do position, length, color, and connection mean? What could the picture make me believe incorrectly? What would I need in the caption to trust it? Then compare your answer with the notes. This is how visual judgment develops: not by collecting templates, but by repeatedly linking a design choice to a modeling claim.

<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:START -->

## 1. Start with the Claim

A figure is not a reward for finishing the analysis. It is a compact proof designed for one sentence in the paper. These ten opening examples show how the same numbers become more useful once the intended comparison is declared.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-001">
  <div class="mm-visual-card-title">1. Baseline before decoration</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/001-baseline-before-decoration.svg" alt="Baseline before decoration: The proposal changes the full outcome distribution, not merely one average.">
    <figcaption><strong>Claim.</strong> The proposal changes the full outcome distribution, not merely one average.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Two aligned distributions make the trade-off visible before any styling is added.</p>
  <p><strong>What to avoid.</strong> Showing only the improved average would conceal the center and the altered tail.</p>
  <p><strong>How to build it.</strong> Plot the baseline and proposal on identical scales; annotate the median and 90th percentile.</p>
</article>

<article class="mm-visual-card" id="visual-example-002">
  <div class="mm-visual-card-title">2. One chart, one question</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/002-one-chart-one-question.svg" alt="One chart, one question: Which district experiences the largest shortage under the stress scenario?">
    <figcaption><strong>Claim.</strong> Which district experiences the largest shortage under the stress scenario?</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Sorted bars make the identity and magnitude of the worst shortage immediate.</p>
  <p><strong>What to avoid.</strong> Alphabetical ordering makes the reader search for the answer.</p>
  <p><strong>How to build it.</strong> Sort by the decision metric, keep zero visible, and highlight only the district discussed in the text.</p>
</article>

<article class="mm-visual-card" id="visual-example-003">
  <div class="mm-visual-card-title">3. Evidence chain</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/003-evidence-chain.svg" alt="Evidence chain: Demand estimation feeds simulation, which feeds the staffing decision.">
    <figcaption><strong>Claim.</strong> Demand estimation feeds simulation, which feeds the staffing decision.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A left-to-right chain exposes the interfaces between modules.</p>
  <p><strong>What to avoid.</strong> A decorative flowchart with unlabeled arrows hides what each module exchanges.</p>
  <p><strong>How to build it.</strong> Label every arrow with the object, unit, or data structure passed downstream.</p>
</article>

<article class="mm-visual-card" id="visual-example-004">
  <div class="mm-visual-card-title">4. Decision before method</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/004-decision-before-method.svg" alt="Decision before method: A slightly more expensive plan remains feasible in all tested disruptions.">
    <figcaption><strong>Claim.</strong> A slightly more expensive plan remains feasible in all tested disruptions.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The table places feasibility before cost, matching the stakeholder decision.</p>
  <p><strong>What to avoid.</strong> Ranking infeasible plans by cost gives precision to choices that cannot be implemented.</p>
  <p><strong>How to build it.</strong> Separate hard feasibility from soft preference, then shade the robust feasible set.</p>
</article>

<article class="mm-visual-card" id="visual-example-005">
  <div class="mm-visual-card-title">5. Caption as a result</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/005-caption-as-a-result.svg" alt="Caption as a result: The intervention reduces the evening peak by 18% in held-out weeks.">
    <figcaption><strong>Claim.</strong> The intervention reduces the evening peak by 18% in held-out weeks.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The visual and caption identify the scenario, metric, evaluation sample, and effect size.</p>
  <p><strong>What to avoid.</strong> A caption such as “prediction result” forces the reader to reverse-engineer the claim.</p>
  <p><strong>How to build it.</strong> Write the intended caption first, then draw only the marks needed to justify it.</p>
</article>

<article class="mm-visual-card" id="visual-example-006">
  <div class="mm-visual-card-title">6. A fair before-and-after</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/006-a-fair-before-and-after.svg" alt="A fair before-and-after: The new policy shifts demand rather than eliminating it.">
    <figcaption><strong>Claim.</strong> The new policy shifts demand rather than eliminating it.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Shared axes reveal the lower peak and compensating shoulder.</p>
  <p><strong>What to avoid.</strong> Separate auto-scaled panels can make both curves appear equally variable.</p>
  <p><strong>How to build it.</strong> Use one coordinate system and preserve the total area when the mechanism is redistribution.</p>
</article>

<article class="mm-visual-card" id="visual-example-007">
  <div class="mm-visual-card-title">7. Show the counterfactual</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/007-show-the-counterfactual.svg" alt="Show the counterfactual: Without the intervention, congestion continues to rise after 17:00.">
    <figcaption><strong>Claim.</strong> Without the intervention, congestion continues to rise after 17:00.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Observed history and two futures separate evidence from the modeled alternative.</p>
  <p><strong>What to avoid.</strong> Extending one solid line into the future makes prediction look observed.</p>
  <p><strong>How to build it.</strong> Use a vertical intervention marker, distinct line styles, and a visible uncertainty band.</p>
</article>

<article class="mm-visual-card" id="visual-example-008">
  <div class="mm-visual-card-title">8. Make the constraint visible</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/008-make-the-constraint-visible.svg" alt="Make the constraint visible: Only three candidate designs satisfy budget and reliability simultaneously.">
    <figcaption><strong>Claim.</strong> Only three candidate designs satisfy budget and reliability simultaneously.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The shaded feasible region lets the reader see why a chosen point is admissible.</p>
  <p><strong>What to avoid.</strong> Listing constraints below a scatterplot asks the reader to solve the geometry mentally.</p>
  <p><strong>How to build it.</strong> Draw the boundaries, label the allowed side, and mark both the selected and rejected designs.</p>
</article>

<article class="mm-visual-card" id="visual-example-009">
  <div class="mm-visual-card-title">9. Scale to the decision</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/009-scale-to-the-decision.svg" alt="Scale to the decision: Small relative errors near the safety threshold matter more than large errors elsewhere.">
    <figcaption><strong>Claim.</strong> Small relative errors near the safety threshold matter more than large errors elsewhere.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A local view around the threshold directs attention to consequential error.</p>
  <p><strong>What to avoid.</strong> A full-range axis can visually erase the region where the decision flips.</p>
  <p><strong>How to build it.</strong> Show the full context once, then add an inset or second panel around the decision boundary.</p>
</article>

<article class="mm-visual-card" id="visual-example-010">
  <div class="mm-visual-card-title">10. Close the loop</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/010-close-the-loop.svg" alt="Close the loop: Validation changes the recommendation when one assumption fails.">
    <figcaption><strong>Claim.</strong> Validation changes the recommendation when one assumption fails.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The feedback arrow makes revision an explicit part of modeling.</p>
  <p><strong>What to avoid.</strong> A strictly linear pipeline suggests that failed checks do not alter the model.</p>
  <p><strong>How to build it.</strong> Return failed validation to the earliest assumption or module it invalidates.</p>
</article>
</div>

## 2. Comparison, Ranking, and Composition

Comparison charts are common in competition papers because recommendations are comparative. The danger is that familiar forms—bars, pies, radar charts—are easy to draw and equally easy to misuse.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-011">
  <div class="mm-visual-card-title">11. Sorted bar chart</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/011-sorted-bar-chart.svg" alt="Sorted bar chart: Plan C has the lowest total cost and Plan B is within 4%.">
    <figcaption><strong>Claim.</strong> Plan C has the lowest total cost and Plan B is within 4%.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Sorting makes rank and distance from the leader readable in one glance.</p>
  <p><strong>What to avoid.</strong> Random category order hides the near-tie that should appear in the recommendation.</p>
  <p><strong>How to build it.</strong> Order by value, start at zero for lengths, and print values only when exact reading matters.</p>
</article>

<article class="mm-visual-card" id="visual-example-012">
  <div class="mm-visual-card-title">12. Grouped comparison</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/012-grouped-comparison.svg" alt="Grouped comparison: The preferred model is consistently strong across three scenarios.">
    <figcaption><strong>Claim.</strong> The preferred model is consistently strong across three scenarios.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Within-scenario grouping preserves the comparison that matters.</p>
  <p><strong>What to avoid.</strong> Too many colors make scenario and model identity compete.</p>
  <p><strong>How to build it.</strong> Use position for model, a restrained palette for scenarios, and the same order in every group.</p>
</article>

<article class="mm-visual-card" id="visual-example-013">
  <div class="mm-visual-card-title">13. Dot plot for close values</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/013-dot-plot-for-close-values.svg" alt="Dot plot for close values: Four regions differ by less than two percentage points.">
    <figcaption><strong>Claim.</strong> Four regions differ by less than two percentage points.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Dots avoid the visual weight of bars and expose small gaps cleanly.</p>
  <p><strong>What to avoid.</strong> Truncated bars exaggerate tiny differences while zero-based bars hide them.</p>
  <p><strong>How to build it.</strong> Use a labeled dot plot with an honest axis and a note that the range is intentionally focused.</p>
</article>

<article class="mm-visual-card" id="visual-example-014">
  <div class="mm-visual-card-title">14. Slope graph</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/014-slope-graph.svg" alt="Slope graph: Two policies reverse the ordering of districts.">
    <figcaption><strong>Claim.</strong> Two policies reverse the ordering of districts.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Paired endpoints emphasize direction and rank change.</p>
  <p><strong>What to avoid.</strong> A grouped bar chart makes the crossings harder to follow.</p>
  <p><strong>How to build it.</strong> Label lines directly and highlight the few crossings discussed in the paper.</p>
</article>

<article class="mm-visual-card" id="visual-example-015">
  <div class="mm-visual-card-title">15. Dumbbell chart</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/015-dumbbell-chart.svg" alt="Dumbbell chart: The intervention closes most of the rural access gap.">
    <figcaption><strong>Claim.</strong> The intervention closes most of the rural access gap.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The connecting segment encodes change while endpoints preserve level.</p>
  <p><strong>What to avoid.</strong> A single change bar loses the starting condition.</p>
  <p><strong>How to build it.</strong> Show before and after on one row, sort by the remaining gap, and label the direction of improvement.</p>
</article>

<article class="mm-visual-card" id="visual-example-016">
  <div class="mm-visual-card-title">16. Small-multiple bars</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/016-small-multiple-bars.svg" alt="Small-multiple bars: No single design dominates every objective.">
    <figcaption><strong>Claim.</strong> No single design dominates every objective.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Repeated scales preserve each objective while preventing stacked-bar arithmetic.</p>
  <p><strong>What to avoid.</strong> A total score can conceal the reason stakeholders disagree.</p>
  <p><strong>How to build it.</strong> Use identical axes, one panel per objective, and a stable highlight for the recommended compromise.</p>
</article>

<article class="mm-visual-card" id="visual-example-017">
  <div class="mm-visual-card-title">17. Composition with a denominator</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/017-composition-with-a-denominator.svg" alt="Composition with a denominator: Renewable supply grows, but total demand grows faster.">
    <figcaption><strong>Claim.</strong> Renewable supply grows, but total demand grows faster.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A 100% bar and an absolute-total annotation separate share from volume.</p>
  <p><strong>What to avoid.</strong> Showing only percentages can imply progress while absolute emissions rise.</p>
  <p><strong>How to build it.</strong> Pair proportional composition with totals or use two coordinated panels.</p>
</article>

<article class="mm-visual-card" id="visual-example-018">
  <div class="mm-visual-card-title">18. Pie chart under strict conditions</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/018-pie-chart-under-strict-conditions.svg" alt="Pie chart under strict conditions: One component accounts for a clear majority of failures.">
    <figcaption><strong>Claim.</strong> One component accounts for a clear majority of failures.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A simple part-to-whole chart works because there are few categories and one dominant share.</p>
  <p><strong>What to avoid.</strong> Eight similar slices demand angle comparisons humans perform poorly.</p>
  <p><strong>How to build it.</strong> Limit categories, order them, label directly, and switch to bars when differences are close.</p>
</article>

<article class="mm-visual-card" id="visual-example-019">
  <div class="mm-visual-card-title">19. Radar chart with restraint</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/019-radar-chart-with-restraint.svg" alt="Radar chart with restraint: The compromise design is balanced, not best on every metric.">
    <figcaption><strong>Claim.</strong> The compromise design is balanced, not best on every metric.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A common normalized scale can summarize a small set of genuinely comparable dimensions.</p>
  <p><strong>What to avoid.</strong> Changing axis order or normalization can completely change the polygon.</p>
  <p><strong>How to build it.</strong> State normalization, fix the axis order, use no more than two polygons, and retain a companion table.</p>
</article>

<article class="mm-visual-card" id="visual-example-020">
  <div class="mm-visual-card-title">20. Pareto comparison</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/020-pareto-comparison.svg" alt="Pareto comparison: Improving service beyond this point requires a steep cost increase.">
    <figcaption><strong>Claim.</strong> Improving service beyond this point requires a steep cost increase.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The frontier distinguishes dominated options from genuine trade-offs.</p>
  <p><strong>What to avoid.</strong> A weighted score hides which alternatives remain rational under different preferences.</p>
  <p><strong>How to build it.</strong> Plot raw objectives, identify nondominated points, and annotate the knee without claiming it is universally optimal.</p>
</article>
</div>

## 3. Time, Trend, and Forecasting

A time plot must respect chronology. Forecasts need a boundary between what was observed and what was inferred; seasonal patterns need repeated cycles; and uncertainty must widen when the model knows less.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-021">
  <div class="mm-visual-card-title">21. Observed trend</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/021-observed-trend.svg" alt="Observed trend: Demand rises gradually with a recurring weekly cycle.">
    <figcaption><strong>Claim.</strong> Demand rises gradually with a recurring weekly cycle.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A thin raw series plus a restrained smooth line preserves both variation and trend.</p>
  <p><strong>What to avoid.</strong> Plotting only the smooth line invents certainty and erases operational peaks.</p>
  <p><strong>How to build it.</strong> Keep raw observations visible and describe the smoothing window in the caption.</p>
</article>

<article class="mm-visual-card" id="visual-example-022">
  <div class="mm-visual-card-title">22. Forecast fan</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/022-forecast-fan.svg" alt="Forecast fan: Uncertainty expands as the forecast horizon grows.">
    <figcaption><strong>Claim.</strong> Uncertainty expands as the forecast horizon grows.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Nested intervals communicate a distribution rather than a single confident path.</p>
  <p><strong>What to avoid.</strong> A lone forecast line invites the reader to treat a conditional expectation as fate.</p>
  <p><strong>How to build it.</strong> Separate history and forecast, label interval levels, and verify empirical coverage.</p>
</article>

<article class="mm-visual-card" id="visual-example-023">
  <div class="mm-visual-card-title">23. Seasonal profile</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/023-seasonal-profile.svg" alt="Seasonal profile: Weekday morning demand repeats, while weekends follow a different shape.">
    <figcaption><strong>Claim.</strong> Weekday morning demand repeats, while weekends follow a different shape.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Faceting by day type reveals the recurring mechanism.</p>
  <p><strong>What to avoid.</strong> A single chronological line makes weekly structure difficult to compare.</p>
  <p><strong>How to build it.</strong> Align cycles on a common within-period axis and display variation across weeks.</p>
</article>

<article class="mm-visual-card" id="visual-example-024">
  <div class="mm-visual-card-title">24. Interrupted time series</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/024-interrupted-time-series.svg" alt="Interrupted time series: The policy is followed by a level change but little slope change.">
    <figcaption><strong>Claim.</strong> The policy is followed by a level change but little slope change.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The intervention boundary and fitted segments encode the causal question honestly.</p>
  <p><strong>What to avoid.</strong> A before-after mean ignores pre-existing trend.</p>
  <p><strong>How to build it.</strong> Show the cutoff, estimate separate level and slope effects, and discuss concurrent events.</p>
</article>

<article class="mm-visual-card" id="visual-example-025">
  <div class="mm-visual-card-title">25. Rolling statistic</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/025-rolling-statistic.svg" alt="Rolling statistic: Volatility increases before the mean changes.">
    <figcaption><strong>Claim.</strong> Volatility increases before the mean changes.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A second aligned panel distinguishes level from variability.</p>
  <p><strong>What to avoid.</strong> Dual axes can manufacture visual correlation.</p>
  <p><strong>How to build it.</strong> Use aligned panels with a shared time axis and explain the rolling window.</p>
</article>

<article class="mm-visual-card" id="visual-example-026">
  <div class="mm-visual-card-title">26. Event timeline</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/026-event-timeline.svg" alt="Event timeline: Failures cluster after two maintenance delays.">
    <figcaption><strong>Claim.</strong> Failures cluster after two maintenance delays.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Events, actions, and outcomes share one temporal coordinate.</p>
  <p><strong>What to avoid.</strong> A paragraph list hides ordering and overlap.</p>
  <p><strong>How to build it.</strong> Place only decision-relevant events, use lanes by type, and annotate the suspected lag.</p>
</article>

<article class="mm-visual-card" id="visual-example-027">
  <div class="mm-visual-card-title">27. Cumulative curve</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/027-cumulative-curve.svg" alt="Cumulative curve: Half of all requests arrive before 09:20.">
    <figcaption><strong>Claim.</strong> Half of all requests arrive before 09:20.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The monotone curve supports percentile questions directly.</p>
  <p><strong>What to avoid.</strong> A histogram makes exact accumulation harder to read.</p>
  <p><strong>How to build it.</strong> Plot the empirical cumulative proportion and mark operational quantiles.</p>
</article>

<article class="mm-visual-card" id="visual-example-028">
  <div class="mm-visual-card-title">28. Calendar heatmap</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/028-calendar-heatmap.svg" alt="Calendar heatmap: Late-week evening demand is the recurring hotspot.">
    <figcaption><strong>Claim.</strong> Late-week evening demand is the recurring hotspot.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Two temporal dimensions are visible without dozens of lines.</p>
  <p><strong>What to avoid.</strong> A rainbow palette creates boundaries that do not exist in the data.</p>
  <p><strong>How to build it.</strong> Use a perceptually ordered scale and include missing periods as a separate color.</p>
</article>

<article class="mm-visual-card" id="visual-example-029">
  <div class="mm-visual-card-title">29. Scenario trajectories</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/029-scenario-trajectories.svg" alt="Scenario trajectories: The recommendation is stable under moderate growth but fails under rapid growth.">
    <figcaption><strong>Claim.</strong> The recommendation is stable under moderate growth but fails under rapid growth.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A small number of labeled paths makes the scenario assumption visible.</p>
  <p><strong>What to avoid.</strong> A spaghetti plot of hundreds of runs communicates only density.</p>
  <p><strong>How to build it.</strong> Show representative scenarios, then summarize the full simulation with intervals.</p>
</article>

<article class="mm-visual-card" id="visual-example-030">
  <div class="mm-visual-card-title">30. Change-point evidence</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/030-change-point-evidence.svg" alt="Change-point evidence: The system enters a new operating regime after day 42.">
    <figcaption><strong>Claim.</strong> The system enters a new operating regime after day 42.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A posterior or score panel shows why the boundary was selected.</p>
  <p><strong>What to avoid.</strong> Drawing a vertical line without evidence turns an algorithmic output into an assertion.</p>
  <p><strong>How to build it.</strong> Pair the series with the detection statistic and test nearby candidate dates.</p>
</article>
</div>

## 4. Distribution, Risk, and Uncertainty

Averages are cheap; decisions often depend on tails, spread, skew, and the probability of crossing a threshold. Distribution graphics show the cases a single summary number suppresses.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-031">
  <div class="mm-visual-card-title">31. Histogram with meaningful bins</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/031-histogram-with-meaningful-bins.svg" alt="Histogram with meaningful bins: Most waits are short, but a long right tail drives complaints.">
    <figcaption><strong>Claim.</strong> Most waits are short, but a long right tail drives complaints.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The bin width reveals the body and tail without pretending to show a smooth density.</p>
  <p><strong>What to avoid.</strong> Automatic bins can hide multimodality or create false bumps.</p>
  <p><strong>How to build it.</strong> Choose bins using measurement precision and decision scale, then report the tail metric.</p>
</article>

<article class="mm-visual-card" id="visual-example-032">
  <div class="mm-visual-card-title">32. Density with raw points</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/032-density-with-raw-points.svg" alt="Density with raw points: Two operating regimes produce a bimodal response.">
    <figcaption><strong>Claim.</strong> Two operating regimes produce a bimodal response.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The rug plot prevents the smooth curve from hiding a small sample.</p>
  <p><strong>What to avoid.</strong> A kernel density alone can imply observations where none exist.</p>
  <p><strong>How to build it.</strong> Show raw positions, state bandwidth, and compare with a histogram.</p>
</article>

<article class="mm-visual-card" id="visual-example-033">
  <div class="mm-visual-card-title">33. Boxplot plus observations</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/033-boxplot-plus-observations.svg" alt="Boxplot plus observations: Site D has similar median performance but many more failures.">
    <figcaption><strong>Claim.</strong> Site D has similar median performance but many more failures.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Points expose sample size and outliers while the box gives a compact summary.</p>
  <p><strong>What to avoid.</strong> A boxplot alone can make five observations look as stable as five hundred.</p>
  <p><strong>How to build it.</strong> Jitter lightly, show sample count, and define the whisker convention.</p>
</article>

<article class="mm-visual-card" id="visual-example-034">
  <div class="mm-visual-card-title">34. Violin with caution</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/034-violin-with-caution.svg" alt="Violin with caution: Response variability differs even where medians agree.">
    <figcaption><strong>Claim.</strong> Response variability differs even where medians agree.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Mirrored density makes shape comparison compact.</p>
  <p><strong>What to avoid.</strong> Wide violins from tiny samples are visually persuasive but statistically weak.</p>
  <p><strong>How to build it.</strong> Overlay quartiles and raw points; suppress density estimates for very small groups.</p>
</article>

<article class="mm-visual-card" id="visual-example-035">
  <div class="mm-visual-card-title">35. Empirical quantiles</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/035-empirical-quantiles.svg" alt="Empirical quantiles: The proposed policy improves routine cases but not the worst 5%.">
    <figcaption><strong>Claim.</strong> The proposed policy improves routine cases but not the worst 5%.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Quantile differences show where the distribution changes.</p>
  <p><strong>What to avoid.</strong> Comparing means would miss unchanged extreme risk.</p>
  <p><strong>How to build it.</strong> Plot treatment-minus-baseline across quantiles with an uncertainty interval.</p>
</article>

<article class="mm-visual-card" id="visual-example-036">
  <div class="mm-visual-card-title">36. Exceedance curve</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/036-exceedance-curve.svg" alt="Exceedance curve: Capacity is exceeded on 8% of simulated days.">
    <figcaption><strong>Claim.</strong> Capacity is exceeded on 8% of simulated days.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The curve answers risk-threshold questions directly.</p>
  <p><strong>What to avoid.</strong> A maximum value overreacts to one realization and a mean ignores the tail.</p>
  <p><strong>How to build it.</strong> Sort outcomes, plot exceedance probability, and mark the operational threshold.</p>
</article>

<article class="mm-visual-card" id="visual-example-037">
  <div class="mm-visual-card-title">37. Uncertainty decomposition</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/037-uncertainty-decomposition.svg" alt="Uncertainty decomposition: Parameter uncertainty dominates measurement noise.">
    <figcaption><strong>Claim.</strong> Parameter uncertainty dominates measurement noise.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Stacked contributions direct future data collection.</p>
  <p><strong>What to avoid.</strong> Reporting one total interval gives no clue how to reduce uncertainty.</p>
  <p><strong>How to build it.</strong> Use a common variance or interval-width scale and explain interaction terms.</p>
</article>

<article class="mm-visual-card" id="visual-example-038">
  <div class="mm-visual-card-title">38. Bootstrap interval</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/038-bootstrap-interval.svg" alt="Bootstrap interval: The ranking between Plans A and B is not stable.">
    <figcaption><strong>Claim.</strong> The ranking between Plans A and B is not stable.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Repeated estimates show how sampling changes the result.</p>
  <p><strong>What to avoid.</strong> A single point estimate makes a near-tie look decisive.</p>
  <p><strong>How to build it.</strong> Resample at the correct observational unit and display rank frequency as well as metric intervals.</p>
</article>

<article class="mm-visual-card" id="visual-example-039">
  <div class="mm-visual-card-title">39. Reliability curve</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/039-reliability-curve.svg" alt="Reliability curve: Predicted 70% events occur only about 55% of the time.">
    <figcaption><strong>Claim.</strong> Predicted 70% events occur only about 55% of the time.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The diagonal provides a meaningful reference for probabilistic claims.</p>
  <p><strong>What to avoid.</strong> Accuracy cannot reveal whether stated probabilities are trustworthy.</p>
  <p><strong>How to build it.</strong> Bin predictions carefully, add confidence intervals, and report the sample count per bin.</p>
</article>

<article class="mm-visual-card" id="visual-example-040">
  <div class="mm-visual-card-title">40. Risk matrix with numbers</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/040-risk-matrix-with-numbers.svg" alt="Risk matrix with numbers: One low-frequency failure remains unacceptable because its consequence is severe.">
    <figcaption><strong>Claim.</strong> One low-frequency failure remains unacceptable because its consequence is severe.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Position summarizes priority while labels retain estimated likelihood and impact.</p>
  <p><strong>What to avoid.</strong> Colored cells without values turn judgment into decoration.</p>
  <p><strong>How to build it.</strong> Define category boundaries, include the underlying numbers, and test whether mitigation changes the cell.</p>
</article>
</div>

## 5. Relationships and Model Diagnostics

Relationship plots should distinguish association, model fit, residual structure, and causal interpretation. A smooth curve is not a mechanism; diagnostics are what tell us whether the curve is credible for the decision.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-041">
  <div class="mm-visual-card-title">41. Scatterplot with structure</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/041-scatterplot-with-structure.svg" alt="Scatterplot with structure: Energy use rises nonlinearly with outdoor temperature.">
    <figcaption><strong>Claim.</strong> Energy use rises nonlinearly with outdoor temperature.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Raw points and a transparent smooth curve show both pattern and dispersion.</p>
  <p><strong>What to avoid.</strong> Connecting unrelated observations creates a false trajectory.</p>
  <p><strong>How to build it.</strong> Use points, consider transformations, and label units before fitting.</p>
</article>

<article class="mm-visual-card" id="visual-example-042">
  <div class="mm-visual-card-title">42. Faceted relationship</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/042-faceted-relationship.svg" alt="Faceted relationship: The apparent overall trend reverses within each building type.">
    <figcaption><strong>Claim.</strong> The apparent overall trend reverses within each building type.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Facets reveal a lurking group variable and prevent Simpson’s paradox.</p>
  <p><strong>What to avoid.</strong> One pooled regression can support the wrong explanation.</p>
  <p><strong>How to build it.</strong> Plot groups separately on shared scales and compare pooled with conditional estimates.</p>
</article>

<article class="mm-visual-card" id="visual-example-043">
  <div class="mm-visual-card-title">43. Residuals versus fit</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/043-residuals-versus-fit.svg" alt="Residuals versus fit: Errors increase with predicted demand.">
    <figcaption><strong>Claim.</strong> Errors increase with predicted demand.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The fan shape makes heteroscedasticity visible.</p>
  <p><strong>What to avoid.</strong> A high R-squared can coexist with systematically unreliable intervals.</p>
  <p><strong>How to build it.</strong> Plot residuals around zero, inspect scale, and consider transformation or weighted errors.</p>
</article>

<article class="mm-visual-card" id="visual-example-044">
  <div class="mm-visual-card-title">44. Q-Q diagnostic</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/044-q-q-diagnostic.svg" alt="Q-Q diagnostic: The central errors are plausible but the tails are heavier than assumed.">
    <figcaption><strong>Claim.</strong> The central errors are plausible but the tails are heavier than assumed.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Departure from the reference line localizes the mismatch.</p>
  <p><strong>What to avoid.</strong> A normal-looking histogram may hide tail failure.</p>
  <p><strong>How to build it.</strong> Use quantile reference points and connect the consequence to inference or risk estimates.</p>
</article>

<article class="mm-visual-card" id="visual-example-045">
  <div class="mm-visual-card-title">45. Predicted versus observed</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/045-predicted-versus-observed.svg" alt="Predicted versus observed: The model underpredicts large outcomes.">
    <figcaption><strong>Claim.</strong> The model underpredicts large outcomes.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The identity line turns calibration bias into geometric distance.</p>
  <p><strong>What to avoid.</strong> A fitted trend line alone can hide systematic offset from perfect prediction.</p>
  <p><strong>How to build it.</strong> Use equal axes, draw y=x, and annotate error metrics on held-out data.</p>
</article>

<article class="mm-visual-card" id="visual-example-046">
  <div class="mm-visual-card-title">46. Feature effect with support</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/046-feature-effect-with-support.svg" alt="Feature effect with support: The estimated benefit saturates beyond six units.">
    <figcaption><strong>Claim.</strong> The estimated benefit saturates beyond six units.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The rug marks where data actually support the curve.</p>
  <p><strong>What to avoid.</strong> Extrapolated effects can look authoritative outside the observed range.</p>
  <p><strong>How to build it.</strong> Show uncertainty and data density; shade or omit unsupported extrapolation.</p>
</article>

<article class="mm-visual-card" id="visual-example-047">
  <div class="mm-visual-card-title">47. Sensitivity tornado</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/047-sensitivity-tornado.svg" alt="Sensitivity tornado: Demand growth matters far more than fuel price.">
    <figcaption><strong>Claim.</strong> Demand growth matters far more than fuel price.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Sorted one-at-a-time effects focus attention on influential assumptions.</p>
  <p><strong>What to avoid.</strong> Unlabeled perturbations make bar length uninterpretable.</p>
  <p><strong>How to build it.</strong> State the baseline and perturbation for every input; follow with interaction tests when needed.</p>
</article>

<article class="mm-visual-card" id="visual-example-048">
  <div class="mm-visual-card-title">48. Global sensitivity</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/048-global-sensitivity.svg" alt="Global sensitivity: Two parameters interact strongly in the high-risk region.">
    <figcaption><strong>Claim.</strong> Two parameters interact strongly in the high-risk region.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A response surface exposes interaction a tornado chart misses.</p>
  <p><strong>What to avoid.</strong> Changing one variable at a time assumes separability.</p>
  <p><strong>How to build it.</strong> Sweep a defensible grid, mark the baseline, and overlay the decision boundary.</p>
</article>

<article class="mm-visual-card" id="visual-example-049">
  <div class="mm-visual-card-title">49. Ablation chart</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/049-ablation-chart.svg" alt="Ablation chart: Removing the temporal feature causes most of the performance loss.">
    <figcaption><strong>Claim.</strong> Removing the temporal feature causes most of the performance loss.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A shared baseline quantifies each component’s contribution.</p>
  <p><strong>What to avoid.</strong> Presenting only the full model offers no evidence that complexity is necessary.</p>
  <p><strong>How to build it.</strong> Remove one component at a time, repeat across splits, and show uncertainty.</p>
</article>

<article class="mm-visual-card" id="visual-example-050">
  <div class="mm-visual-card-title">50. Error taxonomy</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/050-error-taxonomy.svg" alt="Error taxonomy: Most severe mistakes come from one identifiable subgroup.">
    <figcaption><strong>Claim.</strong> Most severe mistakes come from one identifiable subgroup.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A normalized matrix locates error type and class imbalance.</p>
  <p><strong>What to avoid.</strong> Overall accuracy hides which errors matter operationally.</p>
  <p><strong>How to build it.</strong> Choose row or column normalization to match the question and label raw counts.</p>
</article>
</div>

## 6. Space, Maps, and Geometry

Spatial graphics must preserve geography without allowing area, projection, or color to overwhelm the decision. Sometimes the right answer is a map; sometimes it is a distance plot or schematic.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-051">
  <div class="mm-visual-card-title">51. Choropleth with a rate</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/051-choropleth-with-a-rate.svg" alt="Choropleth with a rate: Risk is concentrated in three districts after adjusting for population.">
    <figcaption><strong>Claim.</strong> Risk is concentrated in three districts after adjusting for population.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A rate prevents large-population regions from looking risky merely because they contain more events.</p>
  <p><strong>What to avoid.</strong> Mapping raw counts confounds exposure with incidence.</p>
  <p><strong>How to build it.</strong> Normalize by a relevant denominator, choose explicit class breaks, and note unstable small-area rates.</p>
</article>

<article class="mm-visual-card" id="visual-example-052">
  <div class="mm-visual-card-title">52. Proportional symbols</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/052-proportional-symbols.svg" alt="Proportional symbols: A few facilities carry most of the service load.">
    <figcaption><strong>Claim.</strong> A few facilities carry most of the service load.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Circle area encodes volume while position preserves location.</p>
  <p><strong>What to avoid.</strong> Using radius rather than area exaggerates large values.</p>
  <p><strong>How to build it.</strong> Scale symbol area, add transparency, and provide a size legend.</p>
</article>

<article class="mm-visual-card" id="visual-example-053">
  <div class="mm-visual-card-title">53. Hexbin density</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/053-hexbin-density.svg" alt="Hexbin density: Incidents cluster along two transport corridors.">
    <figcaption><strong>Claim.</strong> Incidents cluster along two transport corridors.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Aggregation reveals density without overplotting thousands of points.</p>
  <p><strong>What to avoid.</strong> Raw points turn dense areas into opaque blobs.</p>
  <p><strong>How to build it.</strong> Select a cell size tied to spatial precision and display zero-observation cells honestly.</p>
</article>

<article class="mm-visual-card" id="visual-example-054">
  <div class="mm-visual-card-title">54. Origin–destination flow</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/054-origin-destination-flow.svg" alt="Origin–destination flow: Most trips enter the center from the northwest corridor.">
    <figcaption><strong>Claim.</strong> Most trips enter the center from the northwest corridor.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Curved links encode direction and volume without losing origins.</p>
  <p><strong>What to avoid.</strong> Plotting every trip creates an unreadable hairball.</p>
  <p><strong>How to build it.</strong> Aggregate meaningful zones, filter negligible flows, and scale width by volume.</p>
</article>

<article class="mm-visual-card" id="visual-example-055">
  <div class="mm-visual-card-title">55. Travel-time surface</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/055-travel-time-surface.svg" alt="Travel-time surface: Coverage gaps remain despite short straight-line distance.">
    <figcaption><strong>Claim.</strong> Coverage gaps remain despite short straight-line distance.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Isochrones encode reachable time rather than geometric distance.</p>
  <p><strong>What to avoid.</strong> Circular buffers ignore network barriers and speed variation.</p>
  <p><strong>How to build it.</strong> Compute travel time on the network and label contour levels in minutes.</p>
</article>

<article class="mm-visual-card" id="visual-example-056">
  <div class="mm-visual-card-title">56. Grid suitability map</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/056-grid-suitability-map.svg" alt="Grid suitability map: Only a narrow band satisfies slope, access, and habitat constraints.">
    <figcaption><strong>Claim.</strong> Only a narrow band satisfies slope, access, and habitat constraints.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Layered criteria culminate in a visible feasible region.</p>
  <p><strong>What to avoid.</strong> A final score map hides which hard constraint excluded a cell.</p>
  <p><strong>How to build it.</strong> Show key input layers, then separate infeasible from merely low-scoring cells.</p>
</article>

<article class="mm-visual-card" id="visual-example-057">
  <div class="mm-visual-card-title">57. Geometry schematic</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/057-geometry-schematic.svg" alt="Geometry schematic: The sensor angle determines whether the target lies inside the field of view.">
    <figcaption><strong>Claim.</strong> The sensor angle determines whether the target lies inside the field of view.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A simplified diagram names points, angles, and distances used by the equations.</p>
  <p><strong>What to avoid.</strong> A decorative photograph cannot establish geometric relationships.</p>
  <p><strong>How to build it.</strong> Remove irrelevant detail, preserve orientation, and make every labeled element appear in the model.</p>
</article>

<article class="mm-visual-card" id="visual-example-058">
  <div class="mm-visual-card-title">58. Before-and-after map</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/058-before-and-after-map.svg" alt="Before-and-after map: The intervention moves congestion rather than resolving it.">
    <figcaption><strong>Claim.</strong> The intervention moves congestion rather than resolving it.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Matched extent and color scale make relocation visible.</p>
  <p><strong>What to avoid.</strong> Independent legends can create a false improvement.</p>
  <p><strong>How to build it.</strong> Lock projection, extent, classes, and legend across panels.</p>
</article>

<article class="mm-visual-card" id="visual-example-059">
  <div class="mm-visual-card-title">59. Spatial residual map</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/059-spatial-residual-map.svg" alt="Spatial residual map: Prediction errors cluster near the shoreline.">
    <figcaption><strong>Claim.</strong> Prediction errors cluster near the shoreline.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Mapping residual sign and magnitude exposes missing spatial structure.</p>
  <p><strong>What to avoid.</strong> A good global metric can conceal regional failure.</p>
  <p><strong>How to build it.</strong> Use a diverging scale centered at zero and test spatial autocorrelation.</p>
</article>

<article class="mm-visual-card" id="visual-example-060">
  <div class="mm-visual-card-title">60. Map plus local evidence</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/060-map-plus-local-evidence.svg" alt="Map plus local evidence: The selected site is best because it balances access, hazard, and capacity.">
    <figcaption><strong>Claim.</strong> The selected site is best because it balances access, hazard, and capacity.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Callouts connect the final location to the evidence that distinguishes it.</p>
  <p><strong>What to avoid.</strong> A star on a map shows the answer but not the reason.</p>
  <p><strong>How to build it.</strong> Add only the decisive nearby features, distances, and scenario values.</p>
</article>
</div>

## 7. Networks, Flows, and Optimization

Network and optimization figures should expose structure and constraints rather than display every edge or solver iteration. The reader needs to understand why the solution has its shape.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-061">
  <div class="mm-visual-card-title">61. Network backbone</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/061-network-backbone.svg" alt="Network backbone: Three bridges carry most inter-community connectivity.">
    <figcaption><strong>Claim.</strong> Three bridges carry most inter-community connectivity.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Edge width and restrained labels reveal the structural bottleneck.</p>
  <p><strong>What to avoid.</strong> Drawing every weak edge produces a hairball.</p>
  <p><strong>How to build it.</strong> Filter or fade nonessential edges and state what nodes, edges, width, and color mean.</p>
</article>

<article class="mm-visual-card" id="visual-example-062">
  <div class="mm-visual-card-title">62. Community structure</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/062-community-structure.svg" alt="Community structure: The network contains four internally dense groups with sparse bridges.">
    <figcaption><strong>Claim.</strong> The network contains four internally dense groups with sparse bridges.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Spatial grouping and color reinforce the same community assignment.</p>
  <p><strong>What to avoid.</strong> Force-directed layouts can suggest distance that has no domain meaning.</p>
  <p><strong>How to build it.</strong> Explain the layout, test stability, and emphasize boundary edges.</p>
</article>

<article class="mm-visual-card" id="visual-example-063">
  <div class="mm-visual-card-title">63. Centrality comparison</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/063-centrality-comparison.svg" alt="Centrality comparison: The busiest node is not the most critical bridge node.">
    <figcaption><strong>Claim.</strong> The busiest node is not the most critical bridge node.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Aligned rankings prevent one centrality measure from being mistaken for importance itself.</p>
  <p><strong>What to avoid.</strong> Reporting a single score hides the definition of influence.</p>
  <p><strong>How to build it.</strong> Compare measures, define the intervention, and validate against simulated removals.</p>
</article>

<article class="mm-visual-card" id="visual-example-064">
  <div class="mm-visual-card-title">64. Sankey balance</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/064-sankey-balance.svg" alt="Sankey balance: Losses occur mainly during conversion, not transport.">
    <figcaption><strong>Claim.</strong> Losses occur mainly during conversion, not transport.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Flow width makes conservation and loss locations visible.</p>
  <p><strong>What to avoid.</strong> Unbalanced ribbons or arbitrary curvature can imply false conservation.</p>
  <p><strong>How to build it.</strong> Make inputs equal outputs plus losses and label units at every stage.</p>
</article>

<article class="mm-visual-card" id="visual-example-065">
  <div class="mm-visual-card-title">65. Queue state diagram</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/065-queue-state-diagram.svg" alt="Queue state diagram: Priority service changes transition rates, not the possible states.">
    <figcaption><strong>Claim.</strong> Priority service changes transition rates, not the possible states.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> States and labeled transitions translate the stochastic model into inspectable logic.</p>
  <p><strong>What to avoid.</strong> A dense transition matrix is difficult to connect to real operations.</p>
  <p><strong>How to build it.</strong> Draw a representative state slice and link labels to model parameters.</p>
</article>

<article class="mm-visual-card" id="visual-example-066">
  <div class="mm-visual-card-title">66. Route comparison</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/066-route-comparison.svg" alt="Route comparison: A modest detour protects the plan from one road failure.">
    <figcaption><strong>Claim.</strong> A modest detour protects the plan from one road failure.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Baseline and robust routes share the same network and cost scale.</p>
  <p><strong>What to avoid.</strong> Two maps with different extents make route comparison unreliable.</p>
  <p><strong>How to build it.</strong> Overlay alternatives or use matched panels; annotate distance and worst-case delay.</p>
</article>

<article class="mm-visual-card" id="visual-example-067">
  <div class="mm-visual-card-title">67. Gantt schedule</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/067-gantt-schedule.svg" alt="Gantt schedule: Resource conflicts, not task duration, determine the makespan.">
    <figcaption><strong>Claim.</strong> Resource conflicts, not task duration, determine the makespan.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Lanes and dependencies expose why one task must wait.</p>
  <p><strong>What to avoid.</strong> A task list hides overlap and shared-resource conflicts.</p>
  <p><strong>How to build it.</strong> Use one time scale, label critical tasks, and mark idle time caused by constraints.</p>
</article>

<article class="mm-visual-card" id="visual-example-068">
  <div class="mm-visual-card-title">68. Feasible-region geometry</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/068-feasible-region-geometry.svg" alt="Feasible-region geometry: The optimum lies where capacity and labor constraints meet.">
    <figcaption><strong>Claim.</strong> The optimum lies where capacity and labor constraints meet.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The diagram gives physical meaning to active constraints.</p>
  <p><strong>What to avoid.</strong> Reporting solver output alone makes the optimum look magical.</p>
  <p><strong>How to build it.</strong> Plot two-variable slices, label active boundaries, and test nearby feasible points.</p>
</article>

<article class="mm-visual-card" id="visual-example-069">
  <div class="mm-visual-card-title">69. Convergence trace</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/069-convergence-trace.svg" alt="Convergence trace: The heuristic stabilizes, but different starts reach different plateaus.">
    <figcaption><strong>Claim.</strong> The heuristic stabilizes, but different starts reach different plateaus.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Multiple runs separate convergence speed from solution variability.</p>
  <p><strong>What to avoid.</strong> One best run overstates reliability.</p>
  <p><strong>How to build it.</strong> Plot representative and summary runs, state stopping rules, and compare with a baseline bound.</p>
</article>

<article class="mm-visual-card" id="visual-example-070">
  <div class="mm-visual-card-title">70. Pareto decision map</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/070-pareto-decision-map.svg" alt="Pareto decision map: Three nondominated designs represent distinct stakeholder priorities.">
    <figcaption><strong>Claim.</strong> Three nondominated designs represent distinct stakeholder priorities.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Named alternatives make the trade-off actionable.</p>
  <p><strong>What to avoid.</strong> Selecting one weight vector prematurely erases reasonable choices.</p>
  <p><strong>How to build it.</strong> Retain the frontier, explain the knee, and let preferences enter after dominance analysis.</p>
</article>
</div>

## 8. Frameworks and Model Architecture

Framework diagrams are valuable when equations and prose span several modules. Their purpose is not to look futuristic; it is to reveal inputs, transformations, feedback, and responsibility.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-071">
  <div class="mm-visual-card-title">71. Problem decomposition</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/071-problem-decomposition.svg" alt="Problem decomposition: The recommendation depends on demand, capacity, and risk modules.">
    <figcaption><strong>Claim.</strong> The recommendation depends on demand, capacity, and risk modules.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Parallel branches show that no single model owns the final answer.</p>
  <p><strong>What to avoid.</strong> A list of methods does not reveal dependency or integration.</p>
  <p><strong>How to build it.</strong> Group modules by question, label inputs and outputs, and converge only where information truly combines.</p>
</article>

<article class="mm-visual-card" id="visual-example-072">
  <div class="mm-visual-card-title">72. Data lineage</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/072-data-lineage.svg" alt="Data lineage: Every reported metric can be traced to a raw field and transformation.">
    <figcaption><strong>Claim.</strong> Every reported metric can be traced to a raw field and transformation.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The diagram makes cleaning and aggregation auditable.</p>
  <p><strong>What to avoid.</strong> A generic “preprocessing” box hides consequential choices.</p>
  <p><strong>How to build it.</strong> Name filters, joins, derived fields, and row counts at each stage.</p>
</article>

<article class="mm-visual-card" id="visual-example-073">
  <div class="mm-visual-card-title">73. Simulation loop</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/073-simulation-loop.svg" alt="Simulation loop: Policy changes behavior, which changes the next system state.">
    <figcaption><strong>Claim.</strong> Policy changes behavior, which changes the next system state.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The feedback arrow encodes the dynamic mechanism.</p>
  <p><strong>What to avoid.</strong> A one-way flowchart silently assumes no behavioral response.</p>
  <p><strong>How to build it.</strong> Separate state update, observation, decision, and feedback timing.</p>
</article>

<article class="mm-visual-card" id="visual-example-074">
  <div class="mm-visual-card-title">74. Multi-level model</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/074-multi-level-model.svg" alt="Multi-level model: Individual events aggregate into regional and system outcomes.">
    <figcaption><strong>Claim.</strong> Individual events aggregate into regional and system outcomes.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Nested levels prevent variables from being mixed across scales.</p>
  <p><strong>What to avoid.</strong> Arrows between every box create visual noise and ambiguous causality.</p>
  <p><strong>How to build it.</strong> Use containers for scale, direct arrows, and a legend for observed versus latent quantities.</p>
</article>

<article class="mm-visual-card" id="visual-example-075">
  <div class="mm-visual-card-title">75. Neural network schematic</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/075-neural-network-schematic.svg" alt="Neural network schematic: Spatial features and temporal features are fused only after separate encoders.">
    <figcaption><strong>Claim.</strong> Spatial features and temporal features are fused only after separate encoders.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The architecture mirrors the data-generating structure.</p>
  <p><strong>What to avoid.</strong> Decorative neuron clouds do not show tensor shape or fusion.</p>
  <p><strong>How to build it.</strong> Label tensor dimensions, repeated blocks, activation outputs, and the decision head.</p>
</article>

<article class="mm-visual-card" id="visual-example-076">
  <div class="mm-visual-card-title">76. Training and validation</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/076-training-and-validation.svg" alt="Training and validation: Model selection never uses the final test period.">
    <figcaption><strong>Claim.</strong> Model selection never uses the final test period.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A timeline clarifies leakage prevention.</p>
  <p><strong>What to avoid.</strong> A random split icon can be misleading for time-dependent data.</p>
  <p><strong>How to build it.</strong> Show exact temporal boundaries and where tuning, calibration, and final evaluation occur.</p>
</article>

<article class="mm-visual-card" id="visual-example-077">
  <div class="mm-visual-card-title">77. Digital twin workflow</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/077-digital-twin-workflow.svg" alt="Digital twin workflow: Measurements update parameters before the next control decision.">
    <figcaption><strong>Claim.</strong> Measurements update parameters before the next control decision.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Physical and computational lanes show synchronization.</p>
  <p><strong>What to avoid.</strong> A single “digital twin” box explains nothing.</p>
  <p><strong>How to build it.</strong> Name sensors, state estimator, simulator, controller, and update frequency.</p>
</article>

<article class="mm-visual-card" id="visual-example-078">
  <div class="mm-visual-card-title">78. Indicator hierarchy</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/078-indicator-hierarchy.svg" alt="Indicator hierarchy: Raw indicators support dimensions, which support the final assessment.">
    <figcaption><strong>Claim.</strong> Raw indicators support dimensions, which support the final assessment.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The tree exposes aggregation and weight placement.</p>
  <p><strong>What to avoid.</strong> A final radar chart hides how its scores were built.</p>
  <p><strong>How to build it.</strong> Show normalization and weight levels; flag indicators shared across dimensions.</p>
</article>

<article class="mm-visual-card" id="visual-example-079">
  <div class="mm-visual-card-title">79. Causal diagram</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/079-causal-diagram.svg" alt="Causal diagram: Weather affects both demand and delay, so it must not be treated as an intervention.">
    <figcaption><strong>Claim.</strong> Weather affects both demand and delay, so it must not be treated as an intervention.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Directed edges make the adjustment question explicit.</p>
  <p><strong>What to avoid.</strong> A correlation network cannot distinguish confounders from mediators.</p>
  <p><strong>How to build it.</strong> Define nodes temporally, justify arrows, and derive the adjustment set from the graph.</p>
</article>

<article class="mm-visual-card" id="visual-example-080">
  <div class="mm-visual-card-title">80. Validation architecture</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/080-validation-architecture.svg" alt="Validation architecture: Each model output has a matching test and fallback response.">
    <figcaption><strong>Claim.</strong> Each model output has a matching test and fallback response.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Paired modules and checks turn validation into system design.</p>
  <p><strong>What to avoid.</strong> A final “validate model” box postpones every hard question.</p>
  <p><strong>How to build it.</strong> Attach a metric, threshold, and corrective action to each module.</p>
</article>
</div>

## 9. Scientific and Engineering Figures

Some models need domain-specific pictures: fields, trajectories, geometry, material layers, biochemical pathways, or tensors. The same rule applies—simplify until the mechanism is visible, but no further.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-081">
  <div class="mm-visual-card-title">81. Vector field</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/081-vector-field.svg" alt="Vector field: Flow rotates around the obstacle and accelerates through the gap.">
    <figcaption><strong>Claim.</strong> Flow rotates around the obstacle and accelerates through the gap.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Direction and magnitude are encoded without a false three-dimensional surface.</p>
  <p><strong>What to avoid.</strong> Too many arrows overlap and hide the field.</p>
  <p><strong>How to build it.</strong> Subsample uniformly, scale arrows consistently, and pair with streamlines or magnitude contours.</p>
</article>

<article class="mm-visual-card" id="visual-example-082">
  <div class="mm-visual-card-title">82. Contour surface</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/082-contour-surface.svg" alt="Contour surface: Temperature crosses the safety threshold near one boundary.">
    <figcaption><strong>Claim.</strong> Temperature crosses the safety threshold near one boundary.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Contours make level sets and threshold geometry explicit.</p>
  <p><strong>What to avoid.</strong> A 3D surface can hide the far side and distort slopes through perspective.</p>
  <p><strong>How to build it.</strong> Use labeled contours, an ordered palette, and emphasize the decision threshold.</p>
</article>

<article class="mm-visual-card" id="visual-example-083">
  <div class="mm-visual-card-title">83. Trajectory bundle</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/083-trajectory-bundle.svg" alt="Trajectory bundle: Most simulated paths converge, but a small group exits the safe corridor.">
    <figcaption><strong>Claim.</strong> Most simulated paths converge, but a small group exits the safe corridor.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Transparency shows common behavior and exceptional failure.</p>
  <p><strong>What to avoid.</strong> A single mean trajectory can pass through a region no run actually visits.</p>
  <p><strong>How to build it.</strong> Plot representative paths, a central band, and the boundary that defines failure.</p>
</article>

<article class="mm-visual-card" id="visual-example-084">
  <div class="mm-visual-card-title">84. Cross-section schematic</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/084-cross-section-schematic.svg" alt="Cross-section schematic: Heat must pass through three layers with different resistance.">
    <figcaption><strong>Claim.</strong> Heat must pass through three layers with different resistance.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Thickness, material, and flux direction correspond directly to the governing equation.</p>
  <p><strong>What to avoid.</strong> A photorealistic wall adds texture without mathematical information.</p>
  <p><strong>How to build it.</strong> Draw only interfaces, dimensions, boundary conditions, and fluxes used by the model.</p>
</article>

<article class="mm-visual-card" id="visual-example-085">
  <div class="mm-visual-card-title">85. Free-body diagram</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/085-free-body-diagram.svg" alt="Free-body diagram: Normal force and friction determine whether the vehicle slips.">
    <figcaption><strong>Claim.</strong> Normal force and friction determine whether the vehicle slips.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Forces are attached to one isolated body in a declared coordinate system.</p>
  <p><strong>What to avoid.</strong> Mixing forces on different bodies causes sign and balance errors.</p>
  <p><strong>How to build it.</strong> Choose the body, draw axes, add only external forces, and label angles and magnitudes.</p>
</article>

<article class="mm-visual-card" id="visual-example-086">
  <div class="mm-visual-card-title">86. Reaction pathway</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/086-reaction-pathway.svg" alt="Reaction pathway: The intervention blocks one branch while preserving the main pathway.">
    <figcaption><strong>Claim.</strong> The intervention blocks one branch while preserving the main pathway.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Color and arrow style distinguish activation, inhibition, and transport.</p>
  <p><strong>What to avoid.</strong> A dense biochemical poster overwhelms the modeled mechanism.</p>
  <p><strong>How to build it.</strong> Include only species in the equations and provide a legend for interaction types.</p>
</article>

<article class="mm-visual-card" id="visual-example-087">
  <div class="mm-visual-card-title">87. Tensor transformation</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/087-tensor-transformation.svg" alt="Tensor transformation: The operation changes channels while preserving spatial resolution.">
    <figcaption><strong>Claim.</strong> The operation changes channels while preserving spatial resolution.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Block dimensions make input and output shapes inspectable.</p>
  <p><strong>What to avoid.</strong> Pretty cubes without dimensions conceal impossible operations.</p>
  <p><strong>How to build it.</strong> Label each axis, operation, stride, and repeated block.</p>
</article>

<article class="mm-visual-card" id="visual-example-088">
  <div class="mm-visual-card-title">88. Phase portrait</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/088-phase-portrait.svg" alt="Phase portrait: Two initial conditions approach different stable states.">
    <figcaption><strong>Claim.</strong> Two initial conditions approach different stable states.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Trajectories and direction field reveal long-run behavior beyond a time trace.</p>
  <p><strong>What to avoid.</strong> A single solution curve cannot establish global stability.</p>
  <p><strong>How to build it.</strong> Mark equilibria, nullclines, direction, and representative initial conditions.</p>
</article>

<article class="mm-visual-card" id="visual-example-089">
  <div class="mm-visual-card-title">89. Dimensionless collapse</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/089-dimensionless-collapse.svg" alt="Dimensionless collapse: Experiments at different scales follow one common relationship.">
    <figcaption><strong>Claim.</strong> Experiments at different scales follow one common relationship.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Rescaling converts separate clouds into evidence for a shared mechanism.</p>
  <p><strong>What to avoid.</strong> Choosing dimensionless groups after seeing the desired collapse risks overfitting.</p>
  <p><strong>How to build it.</strong> Derive groups from units or theory, then show both raw and collapsed views.</p>
</article>

<article class="mm-visual-card" id="visual-example-090">
  <div class="mm-visual-card-title">90. Three-dimensional data in slices</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/090-three-dimensional-data-in-slices.svg" alt="Three-dimensional data in slices: The effect changes across depth as well as horizontal position.">
    <figcaption><strong>Claim.</strong> The effect changes across depth as well as horizontal position.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Small-multiple slices preserve quantitative reading better than an opaque 3D block.</p>
  <p><strong>What to avoid.</strong> A rotatable rendering is useless on a printed page.</p>
  <p><strong>How to build it.</strong> Choose informative planes, keep a shared color scale, and include orientation.</p>
</article>
</div>

## 10. From Good Figure to Award-Level Page

A competition paper is judged as a sequence of pages. The final ten examples show how charts, diagrams, captions, typography, and layout cooperate so that evidence can be found and trusted under time pressure.

<div class="mm-visual-gallery">

<article class="mm-visual-card" id="visual-example-091">
  <div class="mm-visual-card-title">91. Matched multi-panel figure</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/091-matched-multi-panel-figure.svg" alt="Matched multi-panel figure: Data, mechanism, and result form one argument.">
    <figcaption><strong>Claim.</strong> Data, mechanism, and result form one argument.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Panel labels and aligned geometry lead the reader through the evidence chain.</p>
  <p><strong>What to avoid.</strong> Combining unrelated charts saves space but destroys narrative.</p>
  <p><strong>How to build it.</strong> Use panels only when they answer one shared question; write one caption that explains the sequence.</p>
</article>

<article class="mm-visual-card" id="visual-example-092">
  <div class="mm-visual-card-title">92. Overview plus detail</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/092-overview-plus-detail.svg" alt="Overview plus detail: The global pattern is stable, while one local region explains the exception.">
    <figcaption><strong>Claim.</strong> The global pattern is stable, while one local region explains the exception.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> An overview provides context and an inset preserves the consequential detail.</p>
  <p><strong>What to avoid.</strong> Cropping directly to the anomaly exaggerates its prevalence.</p>
  <p><strong>How to build it.</strong> Mark the inset extent and keep scales interpretable.</p>
</article>

<article class="mm-visual-card" id="visual-example-093">
  <div class="mm-visual-card-title">93. Model–data–decision triptych</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/093-model-data-decision-triptych.svg" alt="Model–data–decision triptych: The mechanism explains the data and changes the recommended action.">
    <figcaption><strong>Claim.</strong> The mechanism explains the data and changes the recommended action.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Three panels connect theory, empirical fit, and use.</p>
  <p><strong>What to avoid.</strong> A model diagram without empirical or decision panels remains ornamental.</p>
  <p><strong>How to build it.</strong> Maintain common color semantics and reference every panel in the caption.</p>
</article>

<article class="mm-visual-card" id="visual-example-094">
  <div class="mm-visual-card-title">94. Consistent color semantics</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/094-consistent-color-semantics.svg" alt="Consistent color semantics: Blue always means baseline and orange always means proposal.">
    <figcaption><strong>Claim.</strong> Blue always means baseline and orange always means proposal.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Stable color reduces cognitive switching across the paper.</p>
  <p><strong>What to avoid.</strong> Reusing colors for different meanings creates silent contradictions.</p>
  <p><strong>How to build it.</strong> Create a project palette before plotting and reserve emphasis colors for exceptions.</p>
</article>

<article class="mm-visual-card" id="visual-example-095">
  <div class="mm-visual-card-title">95. Accessible palette</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/095-accessible-palette.svg" alt="Accessible palette: All scenarios remain distinguishable without color vision.">
    <figcaption><strong>Claim.</strong> All scenarios remain distinguishable without color vision.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Hue, lightness, line style, and direct labels provide redundant cues.</p>
  <p><strong>What to avoid.</strong> Red–green contrasts exclude readers and often fail in grayscale printing.</p>
  <p><strong>How to build it.</strong> Test grayscale and color-vision simulation; never encode a critical distinction by hue alone.</p>
</article>

<article class="mm-visual-card" id="visual-example-096">
  <div class="mm-visual-card-title">96. Typographic hierarchy</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/096-typographic-hierarchy.svg" alt="Typographic hierarchy: The eye reaches result, axis, annotation, and source in that order.">
    <figcaption><strong>Claim.</strong> The eye reaches result, axis, annotation, and source in that order.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A controlled type scale separates evidence from metadata.</p>
  <p><strong>What to avoid.</strong> Tiny labels and oversized titles waste the limited page area.</p>
  <p><strong>How to build it.</strong> Match figure text to final print size and use at most three text levels.</p>
</article>

<article class="mm-visual-card" id="visual-example-097">
  <div class="mm-visual-card-title">97. Annotation with discipline</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/097-annotation-with-discipline.svg" alt="Annotation with discipline: One arrow identifies the exact point where the decision changes.">
    <figcaption><strong>Claim.</strong> One arrow identifies the exact point where the decision changes.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> A sparse annotation directs attention without replacing the data.</p>
  <p><strong>What to avoid.</strong> Ten callouts turn the chart into a poster and signal that the encoding failed.</p>
  <p><strong>How to build it.</strong> Annotate only consequential events; move secondary details to the caption.</p>
</article>

<article class="mm-visual-card" id="visual-example-098">
  <div class="mm-visual-card-title">98. Table and chart partnership</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/098-table-and-chart-partnership.svg" alt="Table and chart partnership: The chart shows pattern; the table supplies exact selected values.">
    <figcaption><strong>Claim.</strong> The chart shows pattern; the table supplies exact selected values.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Each medium does the task it performs best.</p>
  <p><strong>What to avoid.</strong> Duplicating every value in both wastes space and attention.</p>
  <p><strong>How to build it.</strong> Chart the comparison, table the audited decisions, and cross-reference them.</p>
</article>

<article class="mm-visual-card" id="visual-example-099">
  <div class="mm-visual-card-title">99. Reproducible figure record</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/099-reproducible-figure-record.svg" alt="Reproducible figure record: The published figure can be regenerated from a named dataset and script.">
    <figcaption><strong>Claim.</strong> The published figure can be regenerated from a named dataset and script.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> Visible provenance turns visual quality into an auditable result.</p>
  <p><strong>What to avoid.</strong> Manual edits break the link between analysis and paper.</p>
  <p><strong>How to build it.</strong> Save data snapshot, script, parameters, environment, and output under stable names.</p>
</article>

<article class="mm-visual-card" id="visual-example-100">
  <div class="mm-visual-card-title">100. Final figure audit</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/100-final-figure-audit.svg" alt="Final figure audit: Every figure answers a question, uses honest scales, and survives print.">
    <figcaption><strong>Claim.</strong> Every figure answers a question, uses honest scales, and survives print.</figcaption>
  </figure>
  <p><strong>Why it works.</strong> The checklist closes the gap between attractive and trustworthy.</p>
  <p><strong>What to avoid.</strong> Reviewing only aesthetics misses incorrect units, legends, and scenarios.</p>
  <p><strong>How to build it.</strong> Audit claim, data, encoding, scale, uncertainty, caption, source, accessibility, and reproduction.</p>
</article>
</div>

<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:END -->

## 11. Choosing and Reproducing the Toolchain

A complete competition workflow may use many drawing environments: Matlab and enhancement packages such as FigureBest; Python; LaTeX drawing systems; presentation software; general diagram applications such as Visio, ProcessOn, draw.io, and Edraw; statistical products such as Prism; domain-oriented systems such as BioRender; icon libraries; and specialized tools for machine-learning, biochemical, geographic, and engineering artwork. They are not competitors in one league. Each tool is good at a different part of the evidence pipeline.

### Python and Matlab for Data-Bound Figures

Use code when the geometry of the figure is determined by data or model output. Time series, distributions, sensitivity plots, maps, residual diagnostics, contour fields, simulation ensembles, and optimization traces should normally be generated from a script. A reproducible figure has three advantages. First, the paper updates when the data or model changes. Second, the plotted values can be checked against the numerical results. Third, another teammate can inspect transformations instead of guessing which manual edits occurred.

Python is especially practical when the analysis already uses NumPy, pandas, SciPy, scikit-learn, Matplotlib, Seaborn, Plotly, GeoPandas, or NetworkX. Matlab is excellent for numerical experiments, signal processing, control, differential equations, and matrix-oriented workflows. Neither language makes a good plot automatically. You still need a project palette, a final print size, meaningful axis labels, and a caption contract. Export vector PDF or SVG for line art and high-resolution PNG only when the figure contains raster information. Never improve a plot by taking a screenshot of it.

Create one plotting function per figure family. Give it the processed data and an output path; do not let it silently reload a different spreadsheet. Fix fonts, colors, line widths, and export settings in one style file. The paper should be able to rebuild every numbered figure with a single command. A reliable folder record is often enough:

```text
data/raw/                 immutable source files
data/processed/           scripted transformations
src/                      models and plotting functions
figures/drafts/           exploratory outputs
figures/paper/            final numbered assets
figure_manifest.csv       claim, source, script, caption, status
```

For each final asset, record the input data version, script name, parameter file, export dimensions, and the section that uses it. This record seems fussy until a teammate changes the model six hours before submission and you need to know which figures are stale.

### LaTeX for Mathematical and Structural Graphics

TikZ and PGFPlots are strong choices when a visual is tightly integrated with notation: geometric constructions, coordinate frames, small networks, model schematics, tensor shapes, or plots whose fonts must match the paper. Their main strengths are precision, vector output, and consistent typesetting. Their main cost is iteration time. Do not spend three hours writing TikZ for a chart that a tested Python function can generate in five minutes.

Use LaTeX-native graphics when the mathematical labels are the point of the figure. Keep the source modular and define reusable styles for nodes, arrows, observed variables, latent variables, and highlighted paths. Compile at the final column width: a diagram that looks spacious on a full monitor can become unreadable when reduced to half a page.

### Diagram Software for Frameworks and Workflows

Use draw.io, ProcessOn, Visio, Edraw, or a presentation editor when the visual is primarily conceptual rather than data-bound. These tools are well suited to model architecture, a decision workflow, a stakeholder system, a causal hypothesis, a data lineage diagram, or a pipeline that integrates several modules. Start from alignment and containment, not from icons. Boxes that share a level should share a size. Arrows should normally move in one reading direction. A container should mean a real boundary—system, scale, organization, or stage—not merely a decorative background.

Every arrow needs a verb or an exchanged object. “Demand forecast → optimizer” is incomplete unless the optimizer receives a quantity with units and time resolution, such as “hourly arrival distribution, customers/hour.” Feedback should return to the exact module it revises. Avoid shadows, gradients, and three-dimensional blocks until the graph remains understandable without them. Export as SVG or PDF so that text and edges remain sharp.

Presentation software is not a lesser tool. It is often the fastest way to construct a clear geometry schematic, annotated map, or explanatory multi-panel composition. Use guides, distribute and align commands, consistent arrowheads, and a project color palette. Replace clip-art decoration with meaningful shapes. Group the finished object, export it at final size, and check the output outside the editor.

### Domain Tools and Specialized Figures

Prism can accelerate statistical plots when the analysis and audience are biomedical. BioRender can help create biological mechanisms, cellular pathways, and experimental workflows, subject to its licensing rules. GIS software is appropriate when projection, spatial joins, and geographic accuracy matter. CAD or scientific visualization software may be needed for complex geometry and fields. The principle is unchanged: a specialized tool is justified when it preserves domain meaning that a generic drawing tool would lose.

Machine-learning diagrams deserve special caution. A page of pastel cubes is not an architecture. Label input and output shapes, repeated blocks, fusion points, loss functions, and the variables that connect the network to the modeling question. Similarly, a biochemical pathway should include only the species and interactions used by the model. A dense literature diagram may be scientifically rich and still be wrong for a competition paper if the reader cannot tell which mechanism you actually implemented.

### Color, Typography, and Accessibility

Choose colors by meaning before choosing them by taste. Assign stable semantics: baseline, proposal, uncertainty, violation, and selected decision. Keep those meanings throughout the paper. Sequential data need a palette whose lightness changes monotonically. Values above and below a meaningful center need a diverging palette with a neutral midpoint. Categories need distinguishable hues, but most figures rarely need more than five simultaneous category colors.

Avoid the rainbow palette for ordered values. It creates false visual boundaries and does not order naturally by lightness. Avoid red–green as the only distinction. Test the paper in grayscale, because judges may print it and because accessible design benefits everyone. Combine color with line style, point shape, direct label, or panel position when the distinction is essential.

Typography should disappear into the argument. Use the same font family as the paper when possible, no more than three text levels, sentence case, and a size that survives final placement. A huge chart title and microscopic tick labels reverse the information hierarchy. Most competition figures do not need a title inside the graphic because the numbered caption supplies context; use that space for the evidence.

### The Figure Review

Review figures in their final PDF, not only in the plotting window. For every figure, ask:

1. What exact sentence does it support?
2. Are the data, scenario, sample, and units named?
3. Does the encoding match the question—position for precise comparison, area only when area is intended, color only when color can be decoded?
4. Is the scale honest and shared across panels that invite comparison?
5. Are uncertainty and missingness visible where they affect the claim?
6. Does the caption state the result rather than merely name the method?
7. Can the figure be regenerated from a known script or source file?
8. Is every third-party map, icon, photograph, or adapted figure attributed and licensed?
9. Does it remain readable at print size, in grayscale, and for color-vision differences?
10. If the figure vanished, would the surrounding argument become weaker? If not, remove it.

<div class="mm-question-box">
  <span class="mm-callout-label">Final exercise</span>
  <p>Open one of your own reports and select its most important result figure. Write the missing visual-evidence contract, rebuild the figure from the original data, and ask a teammate to state the conclusion without reading the surrounding paragraph. If their sentence differs from yours, the figure is not finished.</p>
</div>

The goal is not to produce 100 figures in a competition paper. It is to build enough visual vocabulary that, when the model asks a question, you can choose the one picture that answers it honestly. A strong report might contain only eight figures. Each should have a job. Each should be traceable. Each should make one piece of the modeling argument easier to inspect than prose alone.

One last hidden test: shrink your best figure until it is only six centimeters wide, print it in grayscale, and give it to someone for ten seconds. If they can still name the comparison and the conclusion, keep it. If they remember only the colors, the figure is asking for one more revision.

### Official and Course Sources

- [COMAP MCM/ICM 2025 results and Outstanding-paper index](https://www.contest.comap.com/undergraduate/contests/mcm/contests/2025/results/)
- [COMAP Mathmodels paper and commentary archive](https://www.comap.org/?id=67&view=article)
- [COMAP archive of previous problems and results](https://www.contest.comap.com/undergraduate/contests/mcm/previous-contests.php)
- [CUMCM official competition-problem archive](https://www.mcm.edu.cn/html_cn/block/8579f5fce999cdc896f78bca5d4f8237.html)
- [CUMCM official results and paper-display directory](https://www.mcm.edu.cn/html_cn/block/018500ec1a6bd8c7e9997133def2b590.html)
- [CUMCM paper-format specification](https://www.mcm.edu.cn/html_cn/node/4cd596519c9eb9fbd866398f6df0caa3.html)
