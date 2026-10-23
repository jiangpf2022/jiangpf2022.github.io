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

Welcome back. Find a comfortable seat, open any modeling paper you read recently, and scroll through it without reading the equations. You will probably notice something before you understand a single model: a paper with three or four uninterrupted pages of text is tiring. Even when the derivation is correct, the reader has to work too hard to discover what happened. A good figure gives the eyes somewhere to rest, but that is not its real job. Its real job is to let the reader *see the argument*.

That is what we are going to practise here. We are not trying to decorate a report, and we are not collecting fashionable chart templates. We are learning how to turn a modeling result into evidence that another person can inspect quickly. A judge should be able to see the trend you found, the difference between two plans, the region in which a constraint becomes active, or the way several modules pass information to one another. If the figure cannot help the reader do one of those things, it probably does not deserve space in the paper.

There is a practical reason to study this early. A competition may still be months away, but visual judgment cannot be crammed into the night before submission. You build it slowly: read good papers, save the figures that genuinely teach you something, reproduce two or three of them each week, and keep the code or editable source. By competition day you should not be inventing an unprecedented visual language under time pressure. You should be opening a small library of designs that you already understand and adapting the right one to your own data.

In the examples below, most of the competition excerpts come from MCM/ICM papers, with a smaller group from CUMCM papers. This is deliberate. International papers often expect a particularly strong connection between a model and its visual presentation, so it makes sense to learn against the stricter standard. That does not mean making every page flashy. It means making every figure purposeful, readable, and honest.

<div class="mm-key-box">
  <span class="mm-callout-label">Before you draw anything</span>
  <p>Complete this sentence: <strong>“After seeing this figure, I want the reader to notice ___, because the figure shows ___ under ___.”</strong> If you cannot finish that sentence, do not choose a chart yet. A heat map is not useful merely because it looks sophisticated, and a framework diagram is not useful merely because the page feels empty.</p>
</div>

The page contains one hundred examples. The first ten are small teaching diagrams that isolate basic decisions. The remaining ninety are cropped excerpts from identified CUMCM, MCM, or ICM award papers. Their contest, problem, team or paper, and source page are kept beside the image whenever that information is available. They are here for analysis, not for copying: borrow the *reasoning* behind a design, then rebuild the figure with your own variables, data, and conclusion.

Take your time. Before reading the note beneath an image, cover it and ask: What does this figure want me to notice first? What does position mean? What does color mean? What would disappear if the shaded region were removed? Could the same claim be made more clearly with a simpler chart? This habit matters far more than memorizing a list of chart names. After you have examined enough strong and weak figures, you begin to feel when a page is clear, crowded, empty, misleading, or unfinished.

<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:START -->

## The Claim

A figure is not a reward that appears after the model is finished. It is part of the reasoning. Before choosing colors, ask a plain question: *what part of my model do I want the reader to notice?* Perhaps the answer is a trend, a comparison, a distribution, a spatial pattern, a flow, or the structure of the model itself. Once that purpose is clear, choosing the form becomes much easier.

This also explains a common beginner mistake. Many teams calculate a correlation matrix, discover that software can produce a colorful heat map in one line, and place it in the paper immediately. But suppose the decision does not depend on pairwise correlation. What has the heat map proved? Nothing. It has occupied space and signaled that the authors know a plotting command. The same is true of an unrelated photograph or a decorative icon inserted because a page looks empty. Every figure must serve the modeling argument.

There are two broad jobs to keep separate throughout this blog. A **data figure** shows the process or outcome of the model: a forecast, a comparison, a distribution, a simulation, an error, a sensitivity result. Its center of gravity is the *effect of the model*. A **framework figure** explains how the model is organized: its inputs, modules, information flow, feedback, and validation. Its center of gravity is the *logic of the model*. Both can be beautiful, but beauty is not their common purpose. Their common purpose is to reduce the reader's uncertainty.

The ten small examples below are intentionally simple. Read each one as a sentence rather than as a picture. Notice that the chart becomes defensible only after the sentence is precise. This is the first habit I want you to carry into every later case.

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

## Comparisons

Let us begin with the chart families everyone recognizes. A bar chart compares quantities. A pie or stacked chart describes composition. A radar chart compares several dimensions of the same object. Those descriptions are useful, but they are not rules that can choose a figure for you. The purpose still comes first.

Imagine that we have two algorithms, A and B, and someone asks, “Which one is more accurate?” If each algorithm produces one final accuracy score under the same test set, a pair of bars is perfectly sensible. The reader can compare two lengths from a common baseline and see the difference immediately. But now suppose accuracy changes with the number of iterations. Algorithm A learns quickly and then plateaus; Algorithm B starts slowly but eventually overtakes it. Reducing that story to two final bars hides the crossover, the convergence speed, and perhaps the computational cost. In that case the horizontal axis has meaning, and two lines tell the more useful story.

Pause here before reading on.

<div class="mm-question-box">
  <span class="mm-callout-label">A chart-choice question</span>
  <p>You need to compare the accuracy of two algorithms. Should you use a bar chart or a line chart?</p>
</div>

The honest answer is: **it depends on the effect you need to show**. Use bars when the claim concerns a small set of scalar summaries. Use lines when order, time, iteration, or another continuous progression is part of the claim. Sometimes a paper needs both: the line plot reveals learning behavior, while a small table or bar chart reports the final held-out metric. The choice is not “which chart is more advanced?” It is “which evidence would change the reader's judgment?”

The same care applies to composition. Pie charts are acceptable when there are only a few parts, they sum to a meaningful whole, and the differences are large enough to read. When several slices are close, an ordered bar chart is usually easier to compare. Radar charts can be helpful for a broad profile, but they become misleading when the axes use incompatible scales or when the order of the spokes changes the apparent shape. Always normalize transparently and keep the same axis order across alternatives.

As you examine the competition cases below, do not stop at “this is a bar chart.” Ask whether the alternatives share the same denominator, period, unit, and baseline. A polished comparison is still invalid if one bar measures a daily rate and another measures a weekly total. The geometry carries the claim, so the geometry must be fair.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-011">
  <div class="mm-visual-card-title">11. comparative evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-001.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Comparison Italy The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The alternatives share one visual frame, so the reader can compare direction and magnitude without performing table lookups. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Before copying this design, verify that every alternative uses the same denominator, period, and feasible set. If the baseline changes between panels, the comparison is visually fluent but mathematically invalid. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-012">
  <div class="mm-visual-card-title">12. comparative evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-002.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Comparison pressing The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The composition gives the benchmark and candidate nearly equal visual status; this makes a near-tie or trade-off harder to hide. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Before copying this design, verify that every alternative uses the same denominator, period, and feasible set. If the baseline changes between panels, the comparison is visually fluent but mathematically invalid. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-013">
  <div class="mm-visual-card-title">13. comparative evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-052.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 13.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 13. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 表4-8所示.其中，红色的字体表 示“维修”，绿色的字体代表“值班”，黑色的字体代表“休息”.第1-2天，安排 1个 组值班，3个组维修；第3-6天，每天1个组轮流休息，2个组维修，1个组值班. 表4-8 24天的排班方案 从表中可以看出，每组的工作量均相同，维修14天，值班6天；每组连续工作的 天数均没有 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The ordering directs attention to the decision variable rather than to an arbitrary label sequence. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Before copying this design, verify that every alternative uses the same denominator, period, and feasible set. If the baseline changes between panels, the comparison is visually fluent but mathematically invalid. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-014">
  <div class="mm-visual-card-title">14. comparative evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-077.webp" alt="Figure excerpt from 2023 ICM, Problem F — Green GDP, Team 2315018 award paper, p. 17.">
    <figcaption><strong>Source.</strong> 2023 ICM, <em>Problem F — Green GDP</em>; Team 2315018 award paper, p. 17. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure9: Cost-benefitanalysis Figure 9 shows that the potential resistance was relatively low around 2008, likely due to GGDP’s ability to slow down the rate of change of GDP, w… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The alternatives share one visual frame, so the reader can compare direction and magnitude without performing table lookups. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Before copying this design, verify that every alternative uses the same denominator, period, and feasible set. If the baseline changes between panels, the comparison is visually fluent but mathematically invalid. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-015">
  <div class="mm-visual-card-title">15. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-003.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Coordination The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Several trajectories are aligned on the same clock, allowing the reader to compare timing as well as amplitude. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-016">
  <div class="mm-visual-card-title">16. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-006.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Flexibility 26.66 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The curve exposes shape—not only an endpoint—so the model can be challenged on turning points and transient behavior. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-017">
  <div class="mm-visual-card-title">17. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-007.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Flexibility 2666 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The horizontal order preserves cause-before-effect reasoning and makes peaks, lags, and regime changes visible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-018">
  <div class="mm-visual-card-title">18. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-008.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Flexibility 33.70 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Several trajectories are aligned on the same clock, allowing the reader to compare timing as well as amplitude. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-019">
  <div class="mm-visual-card-title">19. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-009.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Flexibility 3370 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The curve exposes shape—not only an endpoint—so the model can be challenged on turning points and transient behavior. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-020">
  <div class="mm-visual-card-title">20. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-029.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> timeline match1 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The horizontal order preserves cause-before-effect reasoning and makes peaks, lags, and regime changes visible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Time and Forecasts

A line chart is the natural starting point when we care about change: stock prices over time, infection counts by day, temperature along a production process, or accuracy over training iterations. The easy version is to draw one clean line. Almost every team can do that. The harder question is how to make the figure carry enough information without turning it into a tangle.

One of the most useful techniques in the competition examples is a shaded band around a central curve. The line might be a mean, median, fitted value, or expected trajectory; the band might show a confidence interval, a prediction interval, an empirical quantile range, repeated simulations, or variation across samples. The shade makes the page visually fuller, but that is only a side effect. Its real value is that it prevents the central line from pretending to be certain.

Do not add a shadow merely because it looks good. State exactly what its lower and upper boundaries mean. “Mean ± one standard deviation,” “5th–95th percentile across 1,000 simulations,” and “95% prediction interval” are different objects. They answer different questions. A band with no definition is decoration wearing the costume of uncertainty.

A strong time figure also tells the reader where observation stops and prediction begins. Use a vertical marker, a change in line style, or a clear background division. If an intervention occurs, mark it. If two algorithms cross after a certain number of iterations, annotate the crossover. If one method converges faster but the other finishes higher, say so in the caption. The point of the chart is not to display two curves; it is to reveal the difference in their behavior.

Several MCM/ICM cases below also connect numerical results to a real setting. A plotted pattern may sit beside a photograph, map, or physical scene so that the reader can see what the variables refer to. This is especially useful when the problem asks for an implementable recommendation rather than an abstract calculation. The photograph should add context that the data cannot supply, not act as a scenic background.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-021">
  <div class="mm-visual-card-title">21. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-045.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 6.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 6. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 表4-1 各月指标值 月份 1 2 3 4 5 6 7 8 9 10 11 12 平均风速 6.03 6.52 5.45 5.59 5.80 5.89 5.34 4.64 6.04 5.31 5.33 6.13 （m/s） 平均风功 率密度 170 219 138 166 172 178 118 79 18 / 表4-1分析得1月、2月、9月、12月平… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The horizontal order preserves cause-before-effect reasoning and makes peaks, lags, and regime changes visible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-022">
  <div class="mm-visual-card-title">22. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-054.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 6.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 6. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 表以供参考： 表1 影子长度分布 北京时间 太阳高度角/度 影长/m 9:00 21.18 7.74 12:00 37.88 3.85 12:14 37.99 3.84 15:00 25.35 6.33 将影长随时间变化的情况用MATLAB绘制成图像： 图2 影子长度变化曲线 对于影子长度关于各个参数的变 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Several trajectories are aligned on the same clock, allowing the reader to compare timing as well as amplitude. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-023">
  <div class="mm-visual-card-title">23. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-065.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 16.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure8: ThreeDifferentrainfallpatterns Usingtheabovemodel,populationdensities,totalbiomassperunitareaofthecom- munityandtheproportionofdifferentspecies,totalNPPperunitareaofthe… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The curve exposes shape—not only an endpoint—so the model can be challenged on turning points and transient behavior. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-024">
  <div class="mm-visual-card-title">24. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-066.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 16.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure8: ThreeDifferentrainfallpatterns Usingtheabovemodel,populationdensities,totalbiomassperunitareaofthecom- munityandtheproportionofdifferentspecies,totalNPPperunitareaofthe… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The horizontal order preserves cause-before-effect reasoning and makes peaks, lags, and regime changes visible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-025">
  <div class="mm-visual-card-title">25. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-067.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 16.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure8: ThreeDifferentrainfallpatterns Usingtheabovemodel,populationdensities,totalbiomassperunitareaofthecom- munityandtheproportionofdifferentspecies,totalNPPperunitareaofthe… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Several trajectories are aligned on the same clock, allowing the reader to compare timing as well as amplitude. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-026">
  <div class="mm-visual-card-title">26. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-068.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 16.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure8: ThreeDifferentrainfallpatterns Usingtheabovemodel,populationdensities,totalbiomassperunitareaofthecom- munityandtheproportionofdifferentspecies,totalNPPperunitareaofthe… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The curve exposes shape—not only an endpoint—so the model can be challenged on turning points and transient behavior. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-027">
  <div class="mm-visual-card-title">27. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-069.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 16.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure8: ThreeDifferentrainfallpatterns Usingtheabovemodel,populationdensities,totalbiomassperunitareaofthecom- munityandtheproportionofdifferentspecies,totalNPPperunitareaofthe… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The horizontal order preserves cause-before-effect reasoning and makes peaks, lags, and regime changes visible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-028">
  <div class="mm-visual-card-title">28. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-070.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 16.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure8: ThreeDifferentrainfallpatterns Usingtheabovemodel,populationdensities,totalbiomassperunitareaofthecom- munityandtheproportionofdifferentspecies,totalNPPperunitareaofthe… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Several trajectories are aligned on the same clock, allowing the reader to compare timing as well as amplitude. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-029">
  <div class="mm-visual-card-title">29. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-071.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 18.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 18. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure12: ThechangeofSoilWatertContentunderModea,bandc Thechangeinsoilwatercontentisconsistentwiththepatternofrainfall The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The curve exposes shape—not only an endpoint—so the model can be challenged on turning points and transient behavior. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-030">
  <div class="mm-visual-card-title">30. temporal evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-081.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 6.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 6. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 3: Changes in the number of reported results ⚫ Phase 2: Rapid Decline Period (February 3, 2022 - May 29, 2022) During this period, Wordle experiences an overall 84 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The horizontal order preserves cause-before-effect reasoning and makes peaks, lags, and regime changes visible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Distribution and Risk

Suppose a class has an average score of 78. That number tells us almost nothing about the shape of the class. Perhaps everyone scored between 75 and 81. Perhaps half the class scored near 60 and the other half near 96. A histogram, box plot, or violin plot can reveal that structure, and each gives a different amount of detail.

A histogram answers a very concrete question: where do observations accumulate? Its bins, however, are part of the argument. Change the bin width and the apparent shape may change. Always check more than one sensible width, then choose one that reveals stable structure rather than a lucky pattern. If one interval is the most important—for example, the most likely escape time or the range where failures concentrate—highlight that interval and explain why it matters. One purposeful color change is more useful than coloring every bar differently.

Box plots compress a distribution into location, spread, and possible outliers; violin plots add an estimate of density. They are useful for comparing several groups, but they are not self-explanatory. A small sample can produce a smooth-looking violin that suggests more knowledge than the data support. Show sample sizes, use the same scale, and consider adding the raw observations when the data set is small.

Sometimes several distributions belong in one panel. Overlapping histograms can work when transparency, bin boundaries, and sample sizes are carefully controlled. Often aligned small multiples or density curves are easier to read. The aim is not to put more ink on the page. It is to let the reader compare center, spread, tails, and unusual cases without mentally merging separate tables.

Risk enters when a decision depends on those tails. A plan with the best average result may be unacceptable if its worst plausible outcomes are severe. This is why uncertainty bands, sensitivity curves, scenario plots, and quantile summaries belong in a modeling paper. They turn “our answer is robust” from a sentence into something the judge can inspect.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-031">
  <div class="mm-visual-card-title">31. distributional evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-046.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 7.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 7. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图4-3 各级风力等级小时数分布图 图4-4 各级风力等级比例图 由图4-3、图4-4可知代表年中，蒲福风力 2级即不可以用于发电的风速频率较少， 为19.74%.且风力多为3-4级的温和风，8级以上会对人们生产生活造成恶劣影响的风很 少. 4、全年风能资源评估 表4-2 风电场全年风能资源评估 年≥3m / 表4-2，该风电场的年平均风速为5.66… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graphic reveals heterogeneity that a mean would erase, including concentration, imbalance, or a long tail. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Do not infer precise ranking from area or angle alone. Add direct labels or a companion ordered plot when the decision depends on small differences, and state whether the values are counts, proportions, densities, or weighted estimates. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-032">
  <div class="mm-visual-card-title">32. distributional evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-047.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 7.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 7. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图4-3 各级风力等级小时数分布图 图4-4 各级风力等级比例图 由图4-3、图4-4可知代表年中，蒲福风力 2级即不可以用于发电的风速频率较少， 为19.74%.且风力多为3-4级的温和风，8级以上会对人们生产生活造成恶劣影响的风很 少. 4、全年风能资源评估 表4-2 风电场全年风能资源评估 年≥3m / 表4-2，该风电场的年平均风速为5.66… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Part-to-whole structure is visible, but the labels still provide an exact reading when areas or angles are difficult to compare. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Do not infer precise ranking from area or angle alone. Add direct labels or a companion ordered plot when the decision depends on small differences, and state whether the values are counts, proportions, densities, or weighted estimates. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-033">
  <div class="mm-visual-card-title">33. distributional evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-087.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 10.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 10. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Table 3: Forecast interval Confidence level Lower limit Upper limit 95% 19504 / Figure 9 / Figure 9: A word cloud map for the 357 words By searching for relevant literature, we … The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The display keeps the full population visible while directing attention to the portion that governs the decision. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Do not infer precise ranking from area or angle alone. Add direct labels or a companion ordered plot when the decision depends on small differences, and state whether the values are counts, proportions, densities, or weighted estimates. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-034">
  <div class="mm-visual-card-title">34. distributional evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-088.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 12.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 12. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 10: Descriptive statistics of variables As seen in Table 4, the average value of emotional polarity value among the 356 words is 0 / Table 4: Descriptive statistics of va… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graphic reveals heterogeneity that a mean would erase, including concentration, imbalance, or a long tail. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Do not infer precise ranking from area or angle alone. Add direct labels or a companion ordered plot when the decision depends on small differences, and state whether the values are counts, proportions, densities, or weighted estimates. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-035">
  <div class="mm-visual-card-title">35. distributional evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-089.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 12.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 12. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 10: Descriptive statistics of variables As seen in Table 4, the average value of emotional polarity value among the 356 words is 0 / Table 4: Descriptive statistics of va… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Part-to-whole structure is visible, but the labels still provide an exact reading when areas or angles are difficult to compare. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Do not infer precise ranking from area or angle alone. Add direct labels or a companion ordered plot when the decision depends on small differences, and state whether the values are counts, proportions, densities, or weighted estimates. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-036">
  <div class="mm-visual-card-title">36. distributional evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-090.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 13.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 13. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 11: Percentage of successful attempts It can be seen that these percentage data together form a set of component data X=(x ,x ,……,x ), and that the values of the seven co… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The display keeps the full population visible while directing attention to the portion that governs the decision. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Do not infer precise ranking from area or angle alone. Add direct labels or a companion ordered plot when the decision depends on small differences, and state whether the values are counts, proportions, densities, or weighted estimates. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-037">
  <div class="mm-visual-card-title">37. uncertainty evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-022.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> sensetive analysis1 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The model is perturbed rather than shown at one nominal setting, so stability becomes an observable result. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> A sensitivity plot is only as honest as the varied range. Explain why the range is plausible, vary coupled parameters coherently, and mark the point at which feasibility or the preferred decision changes. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-038">
  <div class="mm-visual-card-title">38. uncertainty evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-023.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> sensitive analysis1 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> A reference band or repeated outcomes separates harmless variation from a change that could reverse the recommendation. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> A sensitivity plot is only as honest as the varied range. Explain why the range is plausible, vary coupled parameters coherently, and mark the point at which feasibility or the preferred decision changes. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-039">
  <div class="mm-visual-card-title">39. uncertainty evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-024.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> sensitive analysis2 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The figure makes uncertainty conditional on an explicit parameter or scenario instead of presenting a vague confidence claim. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> A sensitivity plot is only as honest as the varied range. Explain why the range is plausible, vary coupled parameters coherently, and mark the point at which feasibility or the preferred decision changes. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-040">
  <div class="mm-visual-card-title">40. uncertainty evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-043.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 19.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 19. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 表7 敏感性分析结果 参数p1、p2 部分投影评价值 0.3、0.4 1.2543, 0.3367, 1.1559, 0.2317, 2.1685, 1.7312 0.4、0.35 1.3147, 0.3742, 1.2211, 0.3567, 2.0812, 1.5682 0.4、0.4 1.2750 / 图16敏感性分析结果 分析：从上图可以看到，… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The model is perturbed rather than shown at one nominal setting, so stability becomes an observable result. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> A sensitivity plot is only as honest as the varied range. Explain why the range is plausible, vary coupled parameters coherently, and mark the point at which feasibility or the preferred decision changes. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Model Diagnostics

Heat maps are attractive, fast to generate, and therefore dangerous. A correlation heat map appears in an enormous number of data-analysis papers. Sometimes it is exactly what the argument needs: we want to understand pairwise associations, diagnose redundant predictors, or identify a block structure before building the model. But if the result never influences variable selection, mechanism, or validation, the heat map is merely proof that software was opened.

If a relationship figure earns its place, make its reading easier. A square matrix may be redundant because the upper and lower triangles repeat the same information. A triangular layout, clustered ordering, meaningful labels, or circles whose size and color both encode magnitude can reduce clutter. When geography matters, a spatial heat map can be more informative than an abstract matrix because it preserves where high and low values occur. But do not smooth sparse observations into a continuous field without explaining the interpolation.

The deeper principle is that a diagnostic figure lets the reader challenge the model. Plot residuals against fitted values and time. Compare predicted and observed quantities on the same scale. Show whether an optimization actually converged and whether a machine-learning model generalizes beyond its training data. Mark the zero-error or identity reference. A single accuracy value may sound impressive while hiding one region, class, or time period where the model fails systematically.

Ask yourself a slightly uncomfortable question: *what picture would make my model look bad if something were wrong?* That is often the diagnostic worth drawing. Good visualization is not only presentation; it is also a way to discover errors before the judge does.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-041">
  <div class="mm-visual-card-title">41. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-012.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> K-means The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Observed, fitted, or derived quantities can be compared in the same coordinate system, exposing systematic mismatch. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-042">
  <div class="mm-visual-card-title">42. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-013.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Lowest The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The visual turns an internal modeling step into something a judge can inspect rather than simply trust. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-043">
  <div class="mm-visual-card-title">43. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-020.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> matrix describe The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Structure in the error, cluster, or response is visible; that structure indicates where a scalar score would be insufficient. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-044">
  <div class="mm-visual-card-title">44. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-021.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> matrix distance The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Observed, fitted, or derived quantities can be compared in the same coordinate system, exposing systematic mismatch. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-045">
  <div class="mm-visual-card-title">45. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-049.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 10.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 10. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 表4-4 五种机型的主要参数 风机型号 I II III IV V 切入风速(m/s) 3 3.5 3 3 3 额定风速(m/s) 11 11.5 10.5 11 11.5 切出风速(m/s) 25 25 25 25 25 额定功率(kW) 2000 1500 1500 1500 1500 风机数量(台)  / 表4-4分析，机型I、III、IV、V的… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The visual turns an internal modeling step into something a judge can inspect rather than simply trust. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-046">
  <div class="mm-visual-card-title">46. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-050.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 11.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 11. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图4-7 两种机型风速与功率的指数函数拟合图 表4-5 拟合后的函数关系式、可决系数、均方根 拟合曲线 类别 函数关系式 可决系数R2 均方根RMSE 机型I y20.3x2 58.28x12.76 0.9906 73.13 二次拟合 机型II y 18.92x2 69.24x42.85 0.9 / 表4-6）.由于机型II和机型III 的… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Structure in the error, cluster, or response is visible; that structure indicates where a scalar score would be insufficient. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-047">
  <div class="mm-visual-card-title">47. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-076.webp" alt="Figure excerpt from 2023 ICM, Problem F — Green GDP, Team 2315018 award paper, p. 16.">
    <figcaption><strong>Source.</strong> 2023 ICM, <em>Problem F — Green GDP</em>; Team 2315018 award paper, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure8: Kmeans-results • The countries in the red box exhibit an uneven distribution of GGDP per capita but generally have a high level of environmental degradation The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Observed, fitted, or derived quantities can be compared in the same coordinate system, exposing systematic mismatch. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-048">
  <div class="mm-visual-card-title">48. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-083.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 8.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 8. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 5, and using the BP neural network model prediction is shown in Figure 6: Figure 5: ARIMA prediction effect Figure 6: BP neural network prediction effect It can be seen t… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The visual turns an internal modeling step into something a judge can inspect rather than simply trust. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-049">
  <div class="mm-visual-card-title">49. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-084.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 8.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 8. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 5, and using the BP neural network model prediction is shown in Figure 6: Figure 5: ARIMA prediction effect Figure 6: BP neural network prediction effect It can be seen t… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Structure in the error, cluster, or response is visible; that structure indicates where a scalar score would be insufficient. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-050">
  <div class="mm-visual-card-title">50. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-085.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 8.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 8. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 5, and using the BP neural network model prediction is shown in Figure 6: Figure 5: ARIMA prediction effect Figure 6: BP neural network prediction effect It can be seen t… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Observed, fitted, or derived quantities can be compared in the same coordinate system, exposing systematic mismatch. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Maps and Geometry

Some data cannot be understood properly after location is removed. A table of infection counts by province permits ranking, but a choropleth map immediately reveals clusters, boundaries, distance, and the possibility of spatial spread. The same is true for pollution, traffic, drought, land use, resource allocation, and routes.

Color on a map must describe a defined variable. A darker region might mean a larger count, a larger rate, or a higher model score; those are not interchangeable. Raw counts can make populated regions appear important simply because more people live there. Rates can become unstable in very small populations. State the denominator, the period, and the spatial unit. Include a readable legend, and choose a sequential palette whose lightness follows the numerical order.

Gridded or raster views are useful when the model operates on cells rather than administrative regions. They can combine spatial position with density, exposure, cost, or probability. They can also imply false precision. If the original observations are sparse, show sampling locations or explain how values between them were estimated. A map becomes evidence only when the reader can distinguish what was measured from what was inferred.

Three-dimensional plots deserve similar caution. Use 3D when the geometry or surface is part of the mechanism, not because perspective makes the page dramatic. If the important comparison is a height, a contour map or aligned slices may be easier to read. Preserve units, reference frames, scale, and orientation. The reader should not need to rotate an imaginary camera to discover the result.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-051">
  <div class="mm-visual-card-title">51. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-010.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> football field The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-052">
  <div class="mm-visual-card-title">52. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-025.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> task1 formation The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Adjacency and distance are visible directly, which is essential when the model depends on routes, regions, or spatial exposure. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-053">
  <div class="mm-visual-card-title">53. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-026.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> task1 hotmap The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The spatial arrangement lets the reader test whether the claimed pattern is localized, connected, or geographically plausible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-054">
  <div class="mm-visual-card-title">54. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-027.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> task1 hotmap The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-055">
  <div class="mm-visual-card-title">55. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-028.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> task3 formation The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Adjacency and distance are visible directly, which is essential when the model depends on routes, regions, or spatial exposure. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-056">
  <div class="mm-visual-card-title">56. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-031.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 14.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 14. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图像中的静态 图像作为仿真结果，其中，道路是双向四车道，其中某一时刻的仿真图如下： 1）直行路口的仿真 从上图可以看出，主干道的车辆分布密集，拥堵情况十分严重，急需进行改善 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The spatial arrangement lets the reader test whether the claimed pattern is localized, connected, or geographically plausible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-057">
  <div class="mm-visual-card-title">57. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-032.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 14.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 14. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图像中的静态 图像作为仿真结果，其中，道路是双向四车道，其中某一时刻的仿真图如下： 1）直行路口的仿真 从上图可以看出，主干道的车辆分布密集，拥堵情况十分严重，急需进行改善 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-058">
  <div class="mm-visual-card-title">58. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-033.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 16.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图6高峰期未开放方形小区仿真图 图7 平常期未开放小区仿真图 由图6和图7可知，在不开放的方形小区周边道路情况图中，高峰期的道路拥挤现 象过于严重，平常期也存在一定的拥堵现象，交通拥堵问题亟待解决 / 图8平常期未开放方形小区仿真图 图 9平常时期第一种开放类型仿真图 在图8和图9中可以看到，在方形小区中，以第一种结构开放时平常时期的四条主 干道上的交… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Adjacency and distance are visible directly, which is essential when the model depends on routes, regions, or spatial exposure. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-059">
  <div class="mm-visual-card-title">59. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-034.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 16.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图6高峰期未开放方形小区仿真图 图7 平常期未开放小区仿真图 由图6和图7可知，在不开放的方形小区周边道路情况图中，高峰期的道路拥挤现 象过于严重，平常期也存在一定的拥堵现象，交通拥堵问题亟待解决 / 图8平常期未开放方形小区仿真图 图 9平常时期第一种开放类型仿真图 在图8和图9中可以看到，在方形小区中，以第一种结构开放时平常时期的四条主 干道上的交… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The spatial arrangement lets the reader test whether the claimed pattern is localized, connected, or geographically plausible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-060">
  <div class="mm-visual-card-title">60. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-035.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 16.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图6高峰期未开放方形小区仿真图 图7 平常期未开放小区仿真图 由图6和图7可知，在不开放的方形小区周边道路情况图中，高峰期的道路拥挤现 象过于严重，平常期也存在一定的拥堵现象，交通拥堵问题亟待解决 / 图8平常期未开放方形小区仿真图 图 9平常时期第一种开放类型仿真图 在图8和图9中可以看到，在方形小区中，以第一种结构开放时平常时期的四条主 干道上的交… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Networks and Flows

When the story is about movement, a Sankey diagram can be far more natural than a table. Imagine students moving from primary school to several middle schools, then to high schools and universities. The width of each band can show how many people follow each route. The reader sees not only totals at each stage but also how the total is divided and recombined along the way.

That same idea applies to energy, materials, money, migration, information, or probability mass. Define every stage and make the width proportional to one common unit. Do not create a Sankey diagram when links are not conserved or comparable; the flowing ribbons imply a balance relationship. If the figure contains many tiny paths, group them by an explicit rule rather than leaving a bundle of hair-thin lines that nobody can follow.

Network diagrams answer a different question. Their evidence lies in connectivity: hubs, communities, paths, bottlenecks, or changing formations. Every node and edge must have a defined meaning. Filter or aggregate by a reproducible rule. A dense network may look technically impressive while revealing nothing at all.

Optimization figures should expose the decision, not just announce the optimum. Show the feasible region, active constraints, Pareto frontier, route, schedule, or sensitivity of the objective to a resource. If a selected solution is slightly more expensive but remains feasible under every disruption, put robustness and cost into the same visual argument. The reader should be able to see *why* the chosen point deserves to be chosen.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-061">
  <div class="mm-visual-card-title">61. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-004.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Dyadic Triadic Configurations The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Connectivity is the evidence: edge structure and node roles reveal coordination that a list of pairwise values would conceal. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-062">
  <div class="mm-visual-card-title">62. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-005.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> entire game network The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graph reduces a complicated interaction system to recurring paths, hubs, or formations that can be compared across scenarios. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-063">
  <div class="mm-visual-card-title">63. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-014.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> match10 network The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Visual hierarchy prevents every edge from competing equally and makes the paper's structural claim readable at a glance. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-064">
  <div class="mm-visual-card-title">64. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-015.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> match13 network The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Connectivity is the evidence: edge structure and node roles reveal coordination that a list of pairwise values would conceal. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-065">
  <div class="mm-visual-card-title">65. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-016.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> match1 network The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graph reduces a complicated interaction system to recurring paths, hubs, or formations that can be compared across scenarios. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-066">
  <div class="mm-visual-card-title">66. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-017.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> match2 network The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Visual hierarchy prevents every edge from competing equally and makes the paper's structural claim readable at a glance. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-067">
  <div class="mm-visual-card-title">67. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-018.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> match3 network The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Connectivity is the evidence: edge structure and node roles reveal coordination that a list of pairwise values would conceal. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-068">
  <div class="mm-visual-card-title">68. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-019.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> match4 network The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graph reduces a complicated interaction system to recurring paths, hubs, or formations that can be compared across scenarios. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-069">
  <div class="mm-visual-card-title">69. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-037.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 17.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 17. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图10高峰期未开放小区仿真图 图 11高峰期第一种开放结构仿真图 图12高峰期第二种开放结构仿真图 图 13高峰期第三种开放结构仿真图 由上面四幅图可以看出，高峰期第一种开放结构不但没有减缓交通拥堵情况，反而 增加了交通压力；高峰期第二种开放结构在四条主干道上体现出一定程度内减缓了交通 拥堵情况；高峰期第 / 图14高峰期未开放小区仿真图 图15高峰期… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Visual hierarchy prevents every edge from competing equally and makes the paper's structural claim readable at a glance. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-070">
  <div class="mm-visual-card-title">70. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-038.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 17.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 17. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图10高峰期未开放小区仿真图 图 11高峰期第一种开放结构仿真图 图12高峰期第二种开放结构仿真图 图 13高峰期第三种开放结构仿真图 由上面四幅图可以看出，高峰期第一种开放结构不但没有减缓交通拥堵情况，反而 增加了交通压力；高峰期第二种开放结构在四条主干道上体现出一定程度内减缓了交通 拥堵情况；高峰期第 / 图14高峰期未开放小区仿真图 图15高峰期… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Connectivity is the evidence: edge structure and node roles reveal coordination that a list of pairwise values would conceal. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Model Architecture

Now we move from figures that show a model's effect to figures that explain the model itself. A framework diagram should let a reader answer three questions quickly: what goes into the model, what happens in the middle, and what decision or result comes out. A mind map can organize ideas; an architecture diagram can show modules and dependencies; a schematic can make a physical system concrete; a flowchart can show sequence, branching, and feedback. They are related, but they are not interchangeable.

The weakest framework I often see is one long vertical chain: Step 1, Step 2, Step 3, Step 4, Step 5. It may be technically correct, yet it uses most of the page height, leaves empty space on both sides, and tells us nothing beyond “these steps happen in order.” The solution is not to add more icons. The solution is to discover the modules already present in the reasoning.

Perhaps the first group of steps cleans and transforms data, the second predicts an environmental state, the third optimizes a decision, and the last validates the recommendation. Put those steps into meaningful containers. Give each module a stable color or visual treatment. Arrange the modules so the page is used well—often left to right, then continuing on a second row—while keeping the reading order unmistakable. Now the judge can understand both sequence and function.

One layout deserves special attention because it appears repeatedly in strong recent papers. The upper strip gives a concise overview: data preparation, Model I, Model II, validation, recommendation. The lower area expands each module with a concrete diagram, small plot, variable group, or mechanism. The top answers “what is the whole pipeline?” and the bottom answers “what does each box actually do?” This **overview-plus-detail** structure is useful because a judge who has only ten seconds still sees the main line, while a careful reader can inspect the implementation.

There are two tests for every arrow. First, can you read it as a sentence? “Hourly demand distribution enters the staffing optimizer” is meaningful; an unlabeled arrow between “ARIMA” and “GA” is not. Second, does the implementation really pass that object? Decorative feedback loops and fashionable algorithm names weaken trust when they do not correspond to the code or equations.

Finally, design for the paper page rather than the editing canvas. Fill the width sensibly, align boxes, keep text large enough to survive reduction, and remove empty corridors. A framework can be simple and still be excellent. What matters is that, after one glance, the reader can retell the structure of your model in the right order.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-071">
  <div class="mm-visual-card-title">71. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-011.webp" alt="Figure excerpt from 2020 MCM, Problem D — Teaming, Team 2006782, Outstanding Winner paper.">
    <figcaption><strong>Source.</strong> 2020 MCM, <em>Problem D — Teaming</em>; Team 2006782, Outstanding Winner paper. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Gegenpressing The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The reading direction follows the actual modeling workflow, allowing the reader to reconstruct how raw information becomes a decision. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-072">
  <div class="mm-visual-card-title">72. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-030.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 9.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 9. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图像 及各项指标 图2 求解流程图 5.2.1基于直行路段的车辆通行模型的建立 Step1:车道变换的考虑 联系实际可知，左右车道都存在一定的概率相互变道，但由于靠边的车道是转向车道， 所以车道21,34的概率 p 大于车道12,43的概率 p m n 图3小区外围道路车道示意图 9 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Modules are separated by function and the arrows expose dependencies, so a failed assumption can be traced downstream. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-073">
  <div class="mm-visual-card-title">73. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-044.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 4.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 4. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图4-1 问题一解题思路 4.1.1风能资源评估 1、数据检查与预处理 本文选2015年为代表年，根据附件1提供的一年的风速、功率及相关数据来评估该 风电场的风能资源及其利用情况. 首先利用SPSS对所有数据按月进行探索性分析（详情见附录3.1），发现代表年3月 30日06:00数据缺失、9月27日17:0 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The architecture compresses many equations without pretending they are one undifferentiated black box. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-074">
  <div class="mm-visual-card-title">74. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-048.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 9.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 9. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 表4-3： 表4-3 资源利用情况表 总发电量 实际发电量 利用效能比率 有效风时比率 计算结果 149.1033亿kWh 33.5338亿kWh 29.79% 85.47% 查阅资料可知，我国的风发电机一般利用效能比率为30%，与论文中的计算结果接 近.这一指标与世界一般水平38%存在一定的差异，因此 / 图4-5 问题二解题思路图 9 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The reading direction follows the actual modeling workflow, allowing the reader to reconstruct how raw information becomes a decision. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-075">
  <div class="mm-visual-card-title">75. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-051.webp" alt="Figure excerpt from 2016 CUMCM, Problem D — Wind-Farm Operation Analysis and Optimization, National First Prize paper: 风电场运行状况分析及优化研究, p. 12.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem D — Wind-Farm Operation Analysis and Optimization</em>; National First Prize paper: 风电场运行状况分析及优化研究, p. 12. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 表4-7），为后期更换新型风机提供参考依据. 表4-7 典型风机风速范围统计表 风速范围 3 3-3.5 3.5-10.5 10.5-11 11-11.5 11.5以上 (m/s) 4# 次数 626 226 3079 93 104 252 16# 次数 762 226 2952 83 97 260 24# / 图4-8 问题三解题思路 4.3.1任务… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Modules are separated by function and the arrows expose dependencies, so a failed assumption can be traced downstream. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-076">
  <div class="mm-visual-card-title">76. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-062.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 10.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 10. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure13 shows the three main factors precipitation causing soil water content changes over- time / Figure 4: The Factors Influencing the Soil WaterContent Whenexperiencingdroug… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The architecture compresses many equations without pretending they are one undifferentiated black box. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-077">
  <div class="mm-visual-card-title">77. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-078.webp" alt="Figure excerpt from 2023 ICM, Problem F — Green GDP, Team 2315018 award paper, p. 19.">
    <figcaption><strong>Source.</strong> 2023 ICM, <em>Problem F — Green GDP</em>; Team 2315018 award paper, p. 19. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure11: Policyimplementationschedule development of regions and city clusters, China can give full play to the comparative advantagesofeachcityandpromotetheeffectiveallocation… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The reading direction follows the actual modeling workflow, allowing the reader to reconstruct how raw information becomes a decision. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-078">
  <div class="mm-visual-card-title">78. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-079.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 3.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 3. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 1 shows one result that we got / Figure 1: Wordle Game Now we have a file of daily results from January 7, 2022 to December 31, 2022 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Modules are separated by function and the arrows expose dependencies, so a failed assumption can be traced downstream. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-079">
  <div class="mm-visual-card-title">79. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-080.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 4.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 4. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 2: Our work 2 Assumptions and Notations Assumption 1: The number of daily online gamers in the data set is a time-dependent set of series and is independent of seasonal c… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The architecture compresses many equations without pretending they are one undifferentiated black box. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-080">
  <div class="mm-visual-card-title">80. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-082.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 7.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 7. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 4： Figure 4: ARIMA model building process First, we performed ADF smoothness test on the variable ‘Number of reported results’ in the preprocessed data set and found that… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The reading direction follows the actual modeling workflow, allowing the reader to reconstruct how raw information becomes a decision. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Scientific Figures

A photograph becomes useful only when it connects the model to the real system. In an MCM/ICM problem about tourism, light pollution, fisheries, or environmental planning, pairing numerical evidence with a carefully selected site image can remind the reader what the variables mean and why the recommendation matters. But a photograph cannot replace measurement, and a scenic image without annotation is still decoration.

Engineering schematics have a stricter job. If the equations use a coordinate frame, the figure should show it. If a geometric angle, force, route, boundary condition, or sensor location appears in the model, label the same object consistently in the picture. This is where presentation software is often underestimated: with alignment guides, simple shapes, and restrained color, PowerPoint can produce a remarkably clear two-dimensional or three-dimensional schematic much faster than a specialized drawing language.

The important word is *clear*. A three-dimensional rendering is not automatically more scientific than a two-dimensional diagram. Use the simplest view that makes the mechanism visible. When a real photograph and a model schematic appear together, align them by the same landmarks and explain which features were abstracted away. The reader should be able to move from object, to diagram, to variable, to equation without guessing.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-081">
  <div class="mm-visual-card-title">81. scientific mechanism from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-053.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 5.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 5. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图1 太阳方位角示意图 其中 5 L 为杆长， S 为影长 The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The geometry or physical response is shown in the same terms used by the model, joining equations to an observable configuration. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> State the coordinate convention, parameter values, and experimental or simulation conditions. A visually persuasive curve is not evidence if the reader cannot connect it to the governing equation or reproduce its scale. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-082">
  <div class="mm-visual-card-title">82. scientific mechanism from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-055.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 7.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 7. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图 2 中已经给出；对于地点，将其分为经度和纬度这两个参数进行运算求解， 求解后的变化规律图如下： 图3 影长与日期关系曲线 图4 影长与杆长关系曲线 图5 影长与经度关系曲线 图6 影长与纬度关系曲线 5.1.3 结果分析 从图3中可以发现，影长随着时间的增加，呈现先减小后增大的趋势，影长 最小点出 / 图4中可以发现，影长与杆长呈正比关系，这是… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graphic preserves units, orientation, or state relationships that would be difficult to recover from prose alone. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> State the coordinate convention, parameter values, and experimental or simulation conditions. A visually persuasive curve is not evidence if the reader cannot connect it to the governing equation or reproduce its scale. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-083">
  <div class="mm-visual-card-title">83. scientific mechanism from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-056.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 7.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 7. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图 2 中已经给出；对于地点，将其分为经度和纬度这两个参数进行运算求解， 求解后的变化规律图如下： 图3 影长与日期关系曲线 图4 影长与杆长关系曲线 图5 影长与经度关系曲线 图6 影长与纬度关系曲线 5.1.3 结果分析 从图3中可以发现，影长随着时间的增加，呈现先减小后增大的趋势，影长 最小点出 / 图4中可以发现，影长与杆长呈正比关系，这是… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The domain mechanism remains visible, which helps the reader distinguish a physically motivated model from a purely statistical fit. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> State the coordinate convention, parameter values, and experimental or simulation conditions. A visually persuasive curve is not evidence if the reader cannot connect it to the governing equation or reproduce its scale. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-084">
  <div class="mm-visual-card-title">84. scientific mechanism from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-057.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 7.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 7. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图 2 中已经给出；对于地点，将其分为经度和纬度这两个参数进行运算求解， 求解后的变化规律图如下： 图3 影长与日期关系曲线 图4 影长与杆长关系曲线 图5 影长与经度关系曲线 图6 影长与纬度关系曲线 5.1.3 结果分析 从图3中可以发现，影长随着时间的增加，呈现先减小后增大的趋势，影长 最小点出 / 图4中可以发现，影长与杆长呈正比关系，这是… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The geometry or physical response is shown in the same terms used by the model, joining equations to an observable configuration. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> State the coordinate convention, parameter values, and experimental or simulation conditions. A visually persuasive curve is not evidence if the reader cannot connect it to the governing equation or reproduce its scale. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-085">
  <div class="mm-visual-card-title">85. scientific mechanism from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-058.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 7.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 7. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图 2 中已经给出；对于地点，将其分为经度和纬度这两个参数进行运算求解， 求解后的变化规律图如下： 图3 影长与日期关系曲线 图4 影长与杆长关系曲线 图5 影长与经度关系曲线 图6 影长与纬度关系曲线 5.1.3 结果分析 从图3中可以发现，影长随着时间的增加，呈现先减小后增大的趋势，影长 最小点出 / 图4中可以发现，影长与杆长呈正比关系，这是… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graphic preserves units, orientation, or state relationships that would be difficult to recover from prose alone. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> State the coordinate convention, parameter values, and experimental or simulation conditions. A visually persuasive curve is not evidence if the reader cannot connect it to the governing equation or reproduce its scale. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-086">
  <div class="mm-visual-card-title">86. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-039.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 17.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 17. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图10高峰期未开放小区仿真图 图 11高峰期第一种开放结构仿真图 图12高峰期第二种开放结构仿真图 图 13高峰期第三种开放结构仿真图 由上面四幅图可以看出，高峰期第一种开放结构不但没有减缓交通拥堵情况，反而 增加了交通压力；高峰期第二种开放结构在四条主干道上体现出一定程度内减缓了交通 拥堵情况；高峰期第 / 图14高峰期未开放小区仿真图 图15高峰期… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Visual hierarchy prevents every edge from competing equally and makes the paper's structural claim readable at a glance. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-087">
  <div class="mm-visual-card-title">87. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-040.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 17.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 17. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图10高峰期未开放小区仿真图 图 11高峰期第一种开放结构仿真图 图12高峰期第二种开放结构仿真图 图 13高峰期第三种开放结构仿真图 由上面四幅图可以看出，高峰期第一种开放结构不但没有减缓交通拥堵情况，反而 增加了交通压力；高峰期第二种开放结构在四条主干道上体现出一定程度内减缓了交通 拥堵情况；高峰期第 / 图14高峰期未开放小区仿真图 图15高峰期… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Connectivity is the evidence: edge structure and node roles reveal coordination that a list of pairwise values would conceal. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-088">
  <div class="mm-visual-card-title">88. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-041.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 17.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 17. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图10高峰期未开放小区仿真图 图 11高峰期第一种开放结构仿真图 图12高峰期第二种开放结构仿真图 图 13高峰期第三种开放结构仿真图 由上面四幅图可以看出，高峰期第一种开放结构不但没有减缓交通拥堵情况，反而 增加了交通压力；高峰期第二种开放结构在四条主干道上体现出一定程度内减缓了交通 拥堵情况；高峰期第 / 图14高峰期未开放小区仿真图 图15高峰期… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The graph reduces a complicated interaction system to recurring paths, hubs, or formations that can be compared across scenarios. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-089">
  <div class="mm-visual-card-title">89. network evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-042.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 17.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 17. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图10高峰期未开放小区仿真图 图 11高峰期第一种开放结构仿真图 图12高峰期第二种开放结构仿真图 图 13高峰期第三种开放结构仿真图 由上面四幅图可以看出，高峰期第一种开放结构不但没有减缓交通拥堵情况，反而 增加了交通压力；高峰期第二种开放结构在四条主干道上体现出一定程度内减缓了交通 拥堵情况；高峰期第 / 图14高峰期未开放小区仿真图 图15高峰期… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Visual hierarchy prevents every edge from competing equally and makes the paper's structural claim readable at a glance. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-090">
  <div class="mm-visual-card-title">90. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-036.webp" alt="Figure excerpt from 2016 CUMCM, Problem B — The Traffic Impact of Opening Gated Communities, National First Prize paper: 小区开放道路通行影响, p. 16.">
    <figcaption><strong>Source.</strong> 2016 CUMCM, <em>Problem B — The Traffic Impact of Opening Gated Communities</em>; National First Prize paper: 小区开放道路通行影响, p. 16. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图6高峰期未开放方形小区仿真图 图7 平常期未开放小区仿真图 由图6和图7可知，在不开放的方形小区周边道路情况图中，高峰期的道路拥挤现 象过于严重，平常期也存在一定的拥堵现象，交通拥堵问题亟待解决 / 图8平常期未开放方形小区仿真图 图 9平常时期第一种开放类型仿真图 在图8和图9中可以看到，在方形小区中，以第一种结构开放时平常时期的四条主 干道上的交… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

## Award-Level Pages

A strong competition page is not a gallery of unrelated beautiful objects. It has rhythm. The framework prepares the reader for the model, the result figure answers a question raised by the text, the diagnostic tests whether the answer can be trusted, and the caption states what changed. Context comes before detail; method comes before result; uncertainty comes before confidence.

This is why simply copying the surface of an award-paper figure rarely works. The original image belongs to a chain of reasoning. If you borrow its layout, first identify the role it played: comparison, mechanism, validation, spatial context, or recommendation. Then rebuild that role using your own data. Keep the parts that support the role and discard the parts that belonged only to the original problem.

Look also at the whole page. Strong papers repeat typography and color semantics. A color meaning “baseline” does not suddenly mean “best plan” three pages later. Related panels stay close. Captions do not say “Figure 7: Result”; they state the result and the conditions under which it was obtained. White space is used to separate ideas, not left accidentally because a tall narrow flowchart consumed the center of the page.

The final ten examples mix chart families on purpose. Read them as page-building lessons. Ask what the reader learns first, what they are expected to compare next, and where the authors place the evidence that protects the conclusion from overstatement.

<div class="mm-visual-gallery">

<article class="mm-visual-card mm-award-case" id="visual-example-091">
  <div class="mm-visual-card-title">91. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-059.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 14.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 14. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图像矫正 观看视频可以发现，由于摄像机在拍摄时的角度原因，从视频中得出的影长 是真实影长向摄像机方向的投影值，其必定小于或等于真实影长，并不是影长的 真实值，而且从摄像机拍摄的图片中无法得知影子转动的角度 / 图中左下角两条直线在现实 中处于水平面内且互相平行（图中的两条绿色直线），因此将其延长可在远处得 到消隐点，消隐点在水平方向的延长线就是地平线 … The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-092">
  <div class="mm-visual-card-title">92. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-060.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 15.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 15. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图像点的像素坐标为 ( x , y ) ，正视图像的像素坐标为 ( m , n ) ， a,b,c,d,e, f,o,p,q为透视变换参数 / 图像进行预处理，从而减少计算难度 / 图像提取（提取速度为每 2分钟一帧），对整个视频 产生的22幅图片进行灰度处理和高斯滤波处理: 灰度处理 高斯滤波 可以发现，进行高斯滤波后图像的噪点明显减少，大大减少了运… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Adjacency and distance are visible directly, which is essential when the model depends on routes, regions, or spatial exposure. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-093">
  <div class="mm-visual-card-title">93. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-061.webp" alt="Figure excerpt from 2015 CUMCM, Problem A — Solar-Shadow Positioning, National First Prize paper A4: 太阳影子定位, p. 15.">
    <figcaption><strong>Source.</strong> 2015 CUMCM, <em>Problem A — Solar-Shadow Positioning</em>; National First Prize paper A4: 太阳影子定位, p. 15. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> 图像点的像素坐标为 ( x , y ) ，正视图像的像素坐标为 ( m , n ) ， a,b,c,d,e, f,o,p,q为透视变换参数 / 图像进行预处理，从而减少计算难度 / 图像提取（提取速度为每 2分钟一帧），对整个视频 产生的22幅图片进行灰度处理和高斯滤波处理: 灰度处理 高斯滤波 可以发现，进行高斯滤波后图像的噪点明显减少，大大减少了运… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The spatial arrangement lets the reader test whether the claimed pattern is localized, connected, or geographically plausible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-094">
  <div class="mm-visual-card-title">94. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-063.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 13.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 13. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure5: OcalaNationalForest,Florida Thereasonsareasfollows: The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-095">
  <div class="mm-visual-card-title">95. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-064.webp" alt="Figure excerpt from 2023 MCM, Problem A — Drought-Tolerant Plant Communities, Team 2321860 award paper, p. 13.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem A — Drought-Tolerant Plant Communities</em>; Team 2321860 award paper, p. 13. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure5: OcalaNationalForest,Florida Thereasonsareasfollows: The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Adjacency and distance are visible directly, which is essential when the model depends on routes, regions, or spatial exposure. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-096">
  <div class="mm-visual-card-title">96. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-074.webp" alt="Figure excerpt from 2023 ICM, Problem F — Green GDP, Team 2315018 award paper, p. 9.">
    <figcaption><strong>Source.</strong> 2023 ICM, <em>Problem F — Green GDP</em>; Team 2315018 award paper, p. 9. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure4: ChangesinGIfrom2000to2021 years,therewasasignificantdecrease,suggestingareboundinproductionthatharms theenvironment / Figure 5 visualizes the current global GGDP result… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The spatial arrangement lets the reader test whether the claimed pattern is localized, connected, or geographically plausible. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-097">
  <div class="mm-visual-card-title">97. spatial evidence from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-075.webp" alt="Figure excerpt from 2023 ICM, Problem F — Green GDP, Team 2315018 award paper, p. 9.">
    <figcaption><strong>Source.</strong> 2023 ICM, <em>Problem F — Green GDP</em>; Team 2315018 award paper, p. 9. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure4: ChangesinGIfrom2000to2021 years,therewasasignificantdecrease,suggestingareboundinproductionthatharms theenvironment / Figure 5 visualizes the current global GGDP result… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-098">
  <div class="mm-visual-card-title">98. model architecture from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-091.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 14.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 14. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 12, where yellow represents the arithmetic operations and blue represents the learned neural network / Figure 12: The working principle of LSTM The LSTM model has the abi… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Modules are separated by function and the arrows expose dependencies, so a failed assumption can be traced downstream. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-099">
  <div class="mm-visual-card-title">99. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-086.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 9.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 9. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Figure 8: Prediction errors of three models The final point forecast for the number of results reported on March 1, 2023 using this combined ARIMA-BP model is approximately 1994… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Structure in the error, cluster, or response is visible; that structure indicates where a scalar score would be insufficient. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

<article class="mm-visual-card mm-award-case" id="visual-example-100">
  <div class="mm-visual-card-title">100. model diagnostic from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/award/award-094.webp" alt="Figure excerpt from 2023 MCM, Problem C — Wordle, Team 2309397 award paper, p. 21.">
    <figcaption><strong>Source.</strong> 2023 MCM, <em>Problem C — Wordle</em>; Team 2309397 award paper, p. 21. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> Table 8 / Figure 15 / Figure 15: six attribute values of EERIE Figure 16: Accuracy of the model As is shown in Figure 16, the Silhouette Value can reflect the accuracy of GMM mo… The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> Observed, fitted, or derived quantities can be compared in the same coordinate system, exposing systematic mismatch. The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score. Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>

</div>

<div class="mm-key-box"><span class="mm-callout-label">Provenance audit</span><p>This gallery contains <strong>100 figures</strong>: ten original teaching diagrams for foundational design principles and <strong>90 cropped figure excerpts from identified CUMCM, MCM, or ICM award papers</strong>. Every award-paper card names the competition, year, problem, paper or team, and page when available. The real competition-paper share is therefore <strong>90%</strong>. Crops are included for teaching commentary; follow the linked official archives for complete papers and contest context.</p></div>

<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:END -->

## Reproducible Tools

Students often ask me which plotting tool is “the best.” The question sounds sensible, but there is no single league table. Matlab and Python are excellent when the geometry comes from data. LaTeX is precise when mathematics and typography must fit together. PowerPoint, draw.io, ProcessOn, Visio, or Edraw can be faster for a framework or schematic. GIS, Prism, BioRender, and engineering software become useful when the domain carries information a general plotting package would lose.

So choose the tool after choosing the job. Efficiency matters during a contest, but editability and reproducibility matter too. In rough terms, Matlab and Python usually produce data figures more quickly than LaTeX. For fine control, Python and LaTeX often allow more personalization than a default Matlab workflow. That is not a law; it is a reminder to practise the tool you expect to use. The most powerful software is useless if nobody on the team can revise the figure at 2 a.m.

### Python and Matlab for Data-Bound Figures

Use code when the picture is determined by data or model output. Time series, distributions, sensitivity plots, maps, residual diagnostics, contour fields, simulation ensembles, and optimization traces should normally come from a script. This is not a matter of programming pride. When a teammate updates the data six hours before submission, a scripted figure can be regenerated; a hand-edited screenshot has to be rebuilt and may no longer match the reported result.

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

Presentation software is not a lesser tool. It is often the fastest way to construct a clear geometry schematic, annotated map, or explanatory multi-panel composition. Some excellent CUMCM papers explain a formation, a geometric construction, or a physical setup with nothing more exotic than carefully aligned PowerPoint shapes. Use guides, distribute and align commands, consistent arrowheads, and a project color palette. Replace clip-art decoration with meaningful shapes. Group the finished object, export it at final size, and check the output outside the editor.

### Domain Tools and Specialized Figures

Prism can accelerate statistical plots when the analysis and audience are biomedical. BioRender can help create biological mechanisms, cellular pathways, and experimental workflows, subject to its licensing rules. GIS software is appropriate when projection, spatial joins, and geographic accuracy matter. CAD or scientific visualization software may be needed for complex geometry and fields. The principle is unchanged: a specialized tool is justified when it preserves domain meaning that a generic drawing tool would lose.

Machine-learning diagrams deserve special caution. A page of pastel cubes is not an architecture. Label input and output shapes, repeated blocks, fusion points, loss functions, and the variables that connect the network to the modeling question. Similarly, a biochemical pathway should include only the species and interactions used by the model. A dense literature diagram may be scientifically rich and still be wrong for a competition paper if the reader cannot tell which mechanism you actually implemented.

#### Color, Typography, and Accessibility

Choose colors by meaning before choosing them by taste. Assign stable semantics: baseline, proposal, uncertainty, violation, and selected decision. Keep those meanings throughout the paper. Sequential data need a palette whose lightness changes monotonically. Values above and below a meaningful center need a diverging palette with a neutral midpoint. Categories need distinguishable hues, but most figures rarely need more than five simultaneous category colors.

Avoid the rainbow palette for ordered values. It creates false visual boundaries and does not order naturally by lightness. Avoid red–green as the only distinction. Test the paper in grayscale, because judges may print it and because accessible design benefits everyone. Combine color with line style, point shape, direct label, or panel position when the distinction is essential.

Typography should disappear into the argument. Use the same font family as the paper when possible, no more than three text levels, sentence case, and a size that survives final placement. A huge chart title and microscopic tick labels reverse the information hierarchy. Most competition figures do not need a title inside the graphic because the numbered caption supplies context; use that space for the evidence.

### Build a Visual Library Before the Contest

Here is the habit that matters most. First, **look**. Read award papers and pay attention to the figures, not only the algorithms. When a visual makes a result immediately understandable, save it in the team's Notion workspace. Record the competition, year, problem, paper identifier, page, and source link. A label such as “2023 C1” is not administrative clutter; months later it lets you trace an idea back to the original paper instead of staring at an orphaned screenshot.

Second, **reproduce**. Choose two or three worthwhile figures each week and rebuild them with small synthetic data. Keep the source code or editable diagram, not only the exported image. While reproducing, ask what makes the design work: the shared scale, the ordering, the shaded interval, the annotation, the overview-and-detail structure, or the connection to a real map. If you cannot explain that mechanism, you have copied a surface rather than learned a design.

This is how visual judgment develops. Nobody begins with a perfect mental image of the best possible chart. After seeing many strong and weak examples, you start to recognize balance, hierarchy, unnecessary decoration, and missing evidence. By the time the competition arrives, a team that has reproduced three figures a week may own dozens of tested patterns. Then you are not asking, “Can we invent something beautiful in the next hour?” You are asking, “Which of our known patterns expresses this result honestly?” That is a much calmer question.

Do not interpret “better than an ordinary line chart” as “more complicated.” Sometimes one meaningful shaded interval, one direct annotation, or one reordered axis is enough to move a figure beyond the default output that nearly every team can produce. The improvement must add information. If it adds only gradients, shadows, or visual noise, it is not an improvement.

Before accepting a reproduced design, review it in the final PDF rather than only in the plotting window. For every figure, ask:

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
  <span class="mm-callout-label">Before you leave this page</span>
  <p>Choose one figure from a paper you genuinely admire. Save its contest, year, problem, paper identifier, page, and link in your shared Notion workspace. Then rebuild the design with a tiny data set of your own. Do not copy the conclusion; reproduce the visual idea and write down why it works.</p>
</div>

You do not need one hundred figures in a competition paper. You need a small number of figures that each have a clear job. One may explain the pipeline, one may show the key comparison, one may reveal uncertainty, and one may test robustness. If a figure disappears and the argument loses nothing, the figure was probably never part of the argument.

Before we finish, try one final test. Shrink your most important figure to the width it will occupy in the paper, print it in grayscale, and let a teammate look at it for ten seconds. Ask what conclusion they saw. If they remember only the colors, revise it. If they can name the comparison and the conclusion, you are close.

That is enough for today. You do not have to master every chart family at once. Begin with one habit: whenever you see a good figure, do not merely say “this looks nice.” Ask *why* it works, record where it came from, and reproduce the idea once. Week by week, those small repetitions become your team's visual vocabulary. When the competition finally arrives, you will not be decorating a finished model. You will already know how to let the model speak.

## Knowledge Check

The ten questions below move from basic chart selection to competition-level evidence auditing. Single-choice and multiple-choice items are mixed. A correct first attempt earns the full EXP shown for that question; a correct retry earns partial credit.

<section class="modeling-quiz" data-modeling-quiz="lesson-3" data-locale="en"></section>

### Official and Course Sources

- [COMAP MCM/ICM 2025 results and Outstanding-paper index](https://www.contest.comap.com/undergraduate/contests/mcm/contests/2025/results/)
- [COMAP Mathmodels paper and commentary archive](https://www.comap.org/?id=67&view=article)
- [COMAP archive of previous problems and results](https://www.contest.comap.com/undergraduate/contests/mcm/previous-contests.php)
- [CUMCM official competition-problem archive](https://www.mcm.edu.cn/html_cn/block/8579f5fce999cdc896f78bca5d4f8237.html)
- [CUMCM official results and paper-display directory](https://www.mcm.edu.cn/html_cn/block/018500ec1a6bd8c7e9997133def2b590.html)
- [CUMCM paper-format specification](https://www.mcm.edu.cn/html_cn/node/4cd596519c9eb9fbd866398f6df0caa3.html)
