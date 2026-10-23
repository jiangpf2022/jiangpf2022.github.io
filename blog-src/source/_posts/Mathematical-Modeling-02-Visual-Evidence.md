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

The 100 figures below combine two kinds of material. The first ten are original teaching diagrams used to isolate foundational design principles. The remaining ninety are tightly cropped figure excerpts from identified CUMCM, MCM, or ICM award papers. Every excerpt names the competition year, problem, paper or team, and source page when the page is available. The crop is never presented as our numerical result: it is followed by design commentary explaining what evidence the original authors made visible, why the encoding helps, what could still mislead a reader, and how to rebuild the idea with your own data. Thus **90% of the gallery comes from real national or international competition papers**, while attribution stays next to the image rather than disappearing into a general bibliography.

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

A comparison graphic should answer who is larger, by how much, and under which common conditions. Position on a shared scale is usually the most reliable encoding. Color can guide attention, but it must never replace the geometry that carries the quantitative claim. The award-paper excerpts in this section are useful because they place alternatives, regions, schedules, or strategies into a common frame instead of asking the reader to reconcile separate tables. While reading, check whether the comparison is fair: identical units, identical periods, visible baselines, and a caption that states the substantive difference rather than announcing a chart type.

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

## 3. Time, Trend, and Forecasting

Time plots are not ordinary line charts with dates attached. They must distinguish observations from fitted values and forecasts, expose changes in regime, and respect temporal dependence. A convincing competition figure tells the reader where the data end, where the model begins, and how uncertainty grows into the future. The strongest examples below also align events or scenarios on the same clock. That alignment lets a judge connect a peak, decline, lag, or intervention to the mechanism claimed in the text instead of mistaking coincidence for explanation.

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

## 4. Distribution, Risk, and Uncertainty

An average hides the cases that often decide a recommendation. Distribution and uncertainty graphics should reveal spread, tails, intervals, scenario dependence, and sensitivity to assumptions. Their purpose is not to decorate a point estimate with translucent color. Their purpose is to show how much confidence the decision deserves and where it may fail. Look for a visible reference level, consistent probability or frequency scales, and an encoding that makes extreme or unstable behavior inspectable.

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

## 5. Relationships and Model Diagnostics

Diagnostic figures ask whether a model behaves as its mathematical story says it should. A fitted line is not enough. We need residual structure, out-of-sample errors, cluster separation, parameter sensitivity, convergence behavior, or comparison with a meaningful baseline. The examples here earn space because they let the reader audit a modeling step. When adapting them, preserve that audit function: label the benchmark, show the region where the fit is weak, and avoid axes or smoothing choices that make disagreement disappear.

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

## 6. Space, Maps, and Geometry

A spatial figure must preserve geography or geometry that matters to the decision. It should tell us where something occurs, how distance or adjacency is defined, and which boundaries are analytical rather than decorative. A map without a scale, legend, projection note, or readable reference layer is merely a colored background. The award-paper excerpts below work best when they combine spatial context with one focused overlay: a route, density, scenario, region, or geometric construction.

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

## 7. Networks, Flows, and Optimization

Network figures become valuable when topology itself is evidence. Nodes and edges should represent defined objects and interactions; width, direction, color, and placement must have stable meanings. A hairball proves nothing. The successful examples below reduce the graph to the relationships needed for the claim, separate formations or scenarios, and make a flow or structural contrast visible. Reproduce that discipline before adding animation, gradients, or decorative icons.

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

## 8. Frameworks and Model Architecture

A framework diagram is a contract between parts of the model. It should reveal inputs, transformations, decisions, feedback, and validation, not merely arrange algorithm names in attractive boxes. Read every arrow as a sentence: what object moves, in what direction, and with what unit or role? The award-paper examples in this section are strongest when the visual order matches the computational order and when branches correspond to genuine alternatives or checks.

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

## 9. Scientific and Engineering Figures

Scientific figures must retain the domain mechanism. Geometry needs reference frames; physical curves need units and constraints; simulations need initial and boundary conditions; photographs need annotations that connect the scene to measured variables. These examples are useful because the picture and mathematical model support each other. The image is not a stock illustration of the topic: it identifies the configuration, state, or response that appears in the equations.

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

## 10. From a Good Figure to an Award-Level Page

An award-level page is not a collage of individually attractive charts. It is a sequence of evidence. The final ten excerpts deliberately mix chart families because the design problem at page level is orchestration: context before detail, method before result, result before recommendation, and uncertainty before confidence. Notice how different papers repeat typography and color semantics, keep related panels close, and let captions complete the reasoning. Use these cases to audit the rhythm of your own paper rather than to imitate one surface style.

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
