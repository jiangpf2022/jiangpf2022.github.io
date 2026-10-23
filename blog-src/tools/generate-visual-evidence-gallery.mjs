import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'source/images/mathematical-modeling/visual-evidence');
const postPath = path.join(root, 'source/_posts/Mathematical-Modeling-02-Visual-Evidence.md');

const palette = ['#2563eb', '#14b8a6', '#f59e0b', '#ef476f', '#7c3aed', '#0f766e'];
const groups = [
  {
    heading: '1. Start with the Claim',
    intro: 'A figure is not a reward for finishing the analysis. It is a compact proof designed for one sentence in the paper. These ten opening examples show how the same numbers become more useful once the intended comparison is declared.',
    items: [
      ['Baseline before decoration', 'The proposal changes the full outcome distribution, not merely one average.', 'paired', 'Two aligned distributions make the trade-off visible before any styling is added.', 'Showing only the improved average would conceal the center and the altered tail.', 'Plot the baseline and proposal on identical scales; annotate the median and 90th percentile.'],
      ['One chart, one question', 'Which district experiences the largest shortage under the stress scenario?', 'bars', 'Sorted bars make the identity and magnitude of the worst shortage immediate.', 'Alphabetical ordering makes the reader search for the answer.', 'Sort by the decision metric, keep zero visible, and highlight only the district discussed in the text.'],
      ['Evidence chain', 'Demand estimation feeds simulation, which feeds the staffing decision.', 'flow', 'A left-to-right chain exposes the interfaces between modules.', 'A decorative flowchart with unlabeled arrows hides what each module exchanges.', 'Label every arrow with the object, unit, or data structure passed downstream.'],
      ['Decision before method', 'A slightly more expensive plan remains feasible in all tested disruptions.', 'decision', 'The table places feasibility before cost, matching the stakeholder decision.', 'Ranking infeasible plans by cost gives precision to choices that cannot be implemented.', 'Separate hard feasibility from soft preference, then shade the robust feasible set.'],
      ['Caption as a result', 'The intervention reduces the evening peak by 18% in held-out weeks.', 'line', 'The visual and caption identify the scenario, metric, evaluation sample, and effect size.', 'A caption such as “prediction result” forces the reader to reverse-engineer the claim.', 'Write the intended caption first, then draw only the marks needed to justify it.'],
      ['A fair before-and-after', 'The new policy shifts demand rather than eliminating it.', 'area', 'Shared axes reveal the lower peak and compensating shoulder.', 'Separate auto-scaled panels can make both curves appear equally variable.', 'Use one coordinate system and preserve the total area when the mechanism is redistribution.'],
      ['Show the counterfactual', 'Without the intervention, congestion continues to rise after 17:00.', 'counterfactual', 'Observed history and two futures separate evidence from the modeled alternative.', 'Extending one solid line into the future makes prediction look observed.', 'Use a vertical intervention marker, distinct line styles, and a visible uncertainty band.'],
      ['Make the constraint visible', 'Only three candidate designs satisfy budget and reliability simultaneously.', 'feasible', 'The shaded feasible region lets the reader see why a chosen point is admissible.', 'Listing constraints below a scatterplot asks the reader to solve the geometry mentally.', 'Draw the boundaries, label the allowed side, and mark both the selected and rejected designs.'],
      ['Scale to the decision', 'Small relative errors near the safety threshold matter more than large errors elsewhere.', 'threshold', 'A local view around the threshold directs attention to consequential error.', 'A full-range axis can visually erase the region where the decision flips.', 'Show the full context once, then add an inset or second panel around the decision boundary.'],
      ['Close the loop', 'Validation changes the recommendation when one assumption fails.', 'loop', 'The feedback arrow makes revision an explicit part of modeling.', 'A strictly linear pipeline suggests that failed checks do not alter the model.', 'Return failed validation to the earliest assumption or module it invalidates.']
    ]
  },
  {
    heading: '2. Comparison, Ranking, and Composition',
    intro: 'Comparison charts are common in competition papers because recommendations are comparative. The danger is that familiar forms—bars, pies, radar charts—are easy to draw and equally easy to misuse.',
    items: [
      ['Sorted bar chart', 'Plan C has the lowest total cost and Plan B is within 4%.', 'bars', 'Sorting makes rank and distance from the leader readable in one glance.', 'Random category order hides the near-tie that should appear in the recommendation.', 'Order by value, start at zero for lengths, and print values only when exact reading matters.'],
      ['Grouped comparison', 'The preferred model is consistently strong across three scenarios.', 'grouped', 'Within-scenario grouping preserves the comparison that matters.', 'Too many colors make scenario and model identity compete.', 'Use position for model, a restrained palette for scenarios, and the same order in every group.'],
      ['Dot plot for close values', 'Four regions differ by less than two percentage points.', 'dots', 'Dots avoid the visual weight of bars and expose small gaps cleanly.', 'Truncated bars exaggerate tiny differences while zero-based bars hide them.', 'Use a labeled dot plot with an honest axis and a note that the range is intentionally focused.'],
      ['Slope graph', 'Two policies reverse the ordering of districts.', 'slope', 'Paired endpoints emphasize direction and rank change.', 'A grouped bar chart makes the crossings harder to follow.', 'Label lines directly and highlight the few crossings discussed in the paper.'],
      ['Dumbbell chart', 'The intervention closes most of the rural access gap.', 'dumbbell', 'The connecting segment encodes change while endpoints preserve level.', 'A single change bar loses the starting condition.', 'Show before and after on one row, sort by the remaining gap, and label the direction of improvement.'],
      ['Small-multiple bars', 'No single design dominates every objective.', 'smallbars', 'Repeated scales preserve each objective while preventing stacked-bar arithmetic.', 'A total score can conceal the reason stakeholders disagree.', 'Use identical axes, one panel per objective, and a stable highlight for the recommended compromise.'],
      ['Composition with a denominator', 'Renewable supply grows, but total demand grows faster.', 'stacked', 'A 100% bar and an absolute-total annotation separate share from volume.', 'Showing only percentages can imply progress while absolute emissions rise.', 'Pair proportional composition with totals or use two coordinated panels.'],
      ['Pie chart under strict conditions', 'One component accounts for a clear majority of failures.', 'donut', 'A simple part-to-whole chart works because there are few categories and one dominant share.', 'Eight similar slices demand angle comparisons humans perform poorly.', 'Limit categories, order them, label directly, and switch to bars when differences are close.'],
      ['Radar chart with restraint', 'The compromise design is balanced, not best on every metric.', 'radar', 'A common normalized scale can summarize a small set of genuinely comparable dimensions.', 'Changing axis order or normalization can completely change the polygon.', 'State normalization, fix the axis order, use no more than two polygons, and retain a companion table.'],
      ['Pareto comparison', 'Improving service beyond this point requires a steep cost increase.', 'pareto', 'The frontier distinguishes dominated options from genuine trade-offs.', 'A weighted score hides which alternatives remain rational under different preferences.', 'Plot raw objectives, identify nondominated points, and annotate the knee without claiming it is universally optimal.']
    ]
  },
  {
    heading: '3. Time, Trend, and Forecasting',
    intro: 'A time plot must respect chronology. Forecasts need a boundary between what was observed and what was inferred; seasonal patterns need repeated cycles; and uncertainty must widen when the model knows less.',
    items: [
      ['Observed trend', 'Demand rises gradually with a recurring weekly cycle.', 'line', 'A thin raw series plus a restrained smooth line preserves both variation and trend.', 'Plotting only the smooth line invents certainty and erases operational peaks.', 'Keep raw observations visible and describe the smoothing window in the caption.'],
      ['Forecast fan', 'Uncertainty expands as the forecast horizon grows.', 'fan', 'Nested intervals communicate a distribution rather than a single confident path.', 'A lone forecast line invites the reader to treat a conditional expectation as fate.', 'Separate history and forecast, label interval levels, and verify empirical coverage.'],
      ['Seasonal profile', 'Weekday morning demand repeats, while weekends follow a different shape.', 'seasonal', 'Faceting by day type reveals the recurring mechanism.', 'A single chronological line makes weekly structure difficult to compare.', 'Align cycles on a common within-period axis and display variation across weeks.'],
      ['Interrupted time series', 'The policy is followed by a level change but little slope change.', 'interrupted', 'The intervention boundary and fitted segments encode the causal question honestly.', 'A before-after mean ignores pre-existing trend.', 'Show the cutoff, estimate separate level and slope effects, and discuss concurrent events.'],
      ['Rolling statistic', 'Volatility increases before the mean changes.', 'rolling', 'A second aligned panel distinguishes level from variability.', 'Dual axes can manufacture visual correlation.', 'Use aligned panels with a shared time axis and explain the rolling window.'],
      ['Event timeline', 'Failures cluster after two maintenance delays.', 'timeline', 'Events, actions, and outcomes share one temporal coordinate.', 'A paragraph list hides ordering and overlap.', 'Place only decision-relevant events, use lanes by type, and annotate the suspected lag.'],
      ['Cumulative curve', 'Half of all requests arrive before 09:20.', 'cumulative', 'The monotone curve supports percentile questions directly.', 'A histogram makes exact accumulation harder to read.', 'Plot the empirical cumulative proportion and mark operational quantiles.'],
      ['Calendar heatmap', 'Late-week evening demand is the recurring hotspot.', 'calendar', 'Two temporal dimensions are visible without dozens of lines.', 'A rainbow palette creates boundaries that do not exist in the data.', 'Use a perceptually ordered scale and include missing periods as a separate color.'],
      ['Scenario trajectories', 'The recommendation is stable under moderate growth but fails under rapid growth.', 'scenario', 'A small number of labeled paths makes the scenario assumption visible.', 'A spaghetti plot of hundreds of runs communicates only density.', 'Show representative scenarios, then summarize the full simulation with intervals.'],
      ['Change-point evidence', 'The system enters a new operating regime after day 42.', 'changepoint', 'A posterior or score panel shows why the boundary was selected.', 'Drawing a vertical line without evidence turns an algorithmic output into an assertion.', 'Pair the series with the detection statistic and test nearby candidate dates.']
    ]
  },
  {
    heading: '4. Distribution, Risk, and Uncertainty',
    intro: 'Averages are cheap; decisions often depend on tails, spread, skew, and the probability of crossing a threshold. Distribution graphics show the cases a single summary number suppresses.',
    items: [
      ['Histogram with meaningful bins', 'Most waits are short, but a long right tail drives complaints.', 'hist', 'The bin width reveals the body and tail without pretending to show a smooth density.', 'Automatic bins can hide multimodality or create false bumps.', 'Choose bins using measurement precision and decision scale, then report the tail metric.'],
      ['Density with raw points', 'Two operating regimes produce a bimodal response.', 'density', 'The rug plot prevents the smooth curve from hiding a small sample.', 'A kernel density alone can imply observations where none exist.', 'Show raw positions, state bandwidth, and compare with a histogram.'],
      ['Boxplot plus observations', 'Site D has similar median performance but many more failures.', 'box', 'Points expose sample size and outliers while the box gives a compact summary.', 'A boxplot alone can make five observations look as stable as five hundred.', 'Jitter lightly, show sample count, and define the whisker convention.'],
      ['Violin with caution', 'Response variability differs even where medians agree.', 'violin', 'Mirrored density makes shape comparison compact.', 'Wide violins from tiny samples are visually persuasive but statistically weak.', 'Overlay quartiles and raw points; suppress density estimates for very small groups.'],
      ['Empirical quantiles', 'The proposed policy improves routine cases but not the worst 5%.', 'quantile', 'Quantile differences show where the distribution changes.', 'Comparing means would miss unchanged extreme risk.', 'Plot treatment-minus-baseline across quantiles with an uncertainty interval.'],
      ['Exceedance curve', 'Capacity is exceeded on 8% of simulated days.', 'exceedance', 'The curve answers risk-threshold questions directly.', 'A maximum value overreacts to one realization and a mean ignores the tail.', 'Sort outcomes, plot exceedance probability, and mark the operational threshold.'],
      ['Uncertainty decomposition', 'Parameter uncertainty dominates measurement noise.', 'variance', 'Stacked contributions direct future data collection.', 'Reporting one total interval gives no clue how to reduce uncertainty.', 'Use a common variance or interval-width scale and explain interaction terms.'],
      ['Bootstrap interval', 'The ranking between Plans A and B is not stable.', 'bootstrap', 'Repeated estimates show how sampling changes the result.', 'A single point estimate makes a near-tie look decisive.', 'Resample at the correct observational unit and display rank frequency as well as metric intervals.'],
      ['Reliability curve', 'Predicted 70% events occur only about 55% of the time.', 'calibration', 'The diagonal provides a meaningful reference for probabilistic claims.', 'Accuracy cannot reveal whether stated probabilities are trustworthy.', 'Bin predictions carefully, add confidence intervals, and report the sample count per bin.'],
      ['Risk matrix with numbers', 'One low-frequency failure remains unacceptable because its consequence is severe.', 'risk', 'Position summarizes priority while labels retain estimated likelihood and impact.', 'Colored cells without values turn judgment into decoration.', 'Define category boundaries, include the underlying numbers, and test whether mitigation changes the cell.']
    ]
  },
  {
    heading: '5. Relationships and Model Diagnostics',
    intro: 'Relationship plots should distinguish association, model fit, residual structure, and causal interpretation. A smooth curve is not a mechanism; diagnostics are what tell us whether the curve is credible for the decision.',
    items: [
      ['Scatterplot with structure', 'Energy use rises nonlinearly with outdoor temperature.', 'scatter', 'Raw points and a transparent smooth curve show both pattern and dispersion.', 'Connecting unrelated observations creates a false trajectory.', 'Use points, consider transformations, and label units before fitting.'],
      ['Faceted relationship', 'The apparent overall trend reverses within each building type.', 'facet', 'Facets reveal a lurking group variable and prevent Simpson’s paradox.', 'One pooled regression can support the wrong explanation.', 'Plot groups separately on shared scales and compare pooled with conditional estimates.'],
      ['Residuals versus fit', 'Errors increase with predicted demand.', 'residual', 'The fan shape makes heteroscedasticity visible.', 'A high R-squared can coexist with systematically unreliable intervals.', 'Plot residuals around zero, inspect scale, and consider transformation or weighted errors.'],
      ['Q-Q diagnostic', 'The central errors are plausible but the tails are heavier than assumed.', 'qq', 'Departure from the reference line localizes the mismatch.', 'A normal-looking histogram may hide tail failure.', 'Use quantile reference points and connect the consequence to inference or risk estimates.'],
      ['Predicted versus observed', 'The model underpredicts large outcomes.', 'parity', 'The identity line turns calibration bias into geometric distance.', 'A fitted trend line alone can hide systematic offset from perfect prediction.', 'Use equal axes, draw y=x, and annotate error metrics on held-out data.'],
      ['Feature effect with support', 'The estimated benefit saturates beyond six units.', 'effect', 'The rug marks where data actually support the curve.', 'Extrapolated effects can look authoritative outside the observed range.', 'Show uncertainty and data density; shade or omit unsupported extrapolation.'],
      ['Sensitivity tornado', 'Demand growth matters far more than fuel price.', 'tornado', 'Sorted one-at-a-time effects focus attention on influential assumptions.', 'Unlabeled perturbations make bar length uninterpretable.', 'State the baseline and perturbation for every input; follow with interaction tests when needed.'],
      ['Global sensitivity', 'Two parameters interact strongly in the high-risk region.', 'heatmap', 'A response surface exposes interaction a tornado chart misses.', 'Changing one variable at a time assumes separability.', 'Sweep a defensible grid, mark the baseline, and overlay the decision boundary.'],
      ['Ablation chart', 'Removing the temporal feature causes most of the performance loss.', 'ablation', 'A shared baseline quantifies each component’s contribution.', 'Presenting only the full model offers no evidence that complexity is necessary.', 'Remove one component at a time, repeat across splits, and show uncertainty.'],
      ['Error taxonomy', 'Most severe mistakes come from one identifiable subgroup.', 'confusion', 'A normalized matrix locates error type and class imbalance.', 'Overall accuracy hides which errors matter operationally.', 'Choose row or column normalization to match the question and label raw counts.']
    ]
  },
  {
    heading: '6. Space, Maps, and Geometry',
    intro: 'Spatial graphics must preserve geography without allowing area, projection, or color to overwhelm the decision. Sometimes the right answer is a map; sometimes it is a distance plot or schematic.',
    items: [
      ['Choropleth with a rate', 'Risk is concentrated in three districts after adjusting for population.', 'map', 'A rate prevents large-population regions from looking risky merely because they contain more events.', 'Mapping raw counts confounds exposure with incidence.', 'Normalize by a relevant denominator, choose explicit class breaks, and note unstable small-area rates.'],
      ['Proportional symbols', 'A few facilities carry most of the service load.', 'bubbles', 'Circle area encodes volume while position preserves location.', 'Using radius rather than area exaggerates large values.', 'Scale symbol area, add transparency, and provide a size legend.'],
      ['Hexbin density', 'Incidents cluster along two transport corridors.', 'hex', 'Aggregation reveals density without overplotting thousands of points.', 'Raw points turn dense areas into opaque blobs.', 'Select a cell size tied to spatial precision and display zero-observation cells honestly.'],
      ['Origin–destination flow', 'Most trips enter the center from the northwest corridor.', 'flowmap', 'Curved links encode direction and volume without losing origins.', 'Plotting every trip creates an unreadable hairball.', 'Aggregate meaningful zones, filter negligible flows, and scale width by volume.'],
      ['Travel-time surface', 'Coverage gaps remain despite short straight-line distance.', 'contour', 'Isochrones encode reachable time rather than geometric distance.', 'Circular buffers ignore network barriers and speed variation.', 'Compute travel time on the network and label contour levels in minutes.'],
      ['Grid suitability map', 'Only a narrow band satisfies slope, access, and habitat constraints.', 'grid', 'Layered criteria culminate in a visible feasible region.', 'A final score map hides which hard constraint excluded a cell.', 'Show key input layers, then separate infeasible from merely low-scoring cells.'],
      ['Geometry schematic', 'The sensor angle determines whether the target lies inside the field of view.', 'geometry', 'A simplified diagram names points, angles, and distances used by the equations.', 'A decorative photograph cannot establish geometric relationships.', 'Remove irrelevant detail, preserve orientation, and make every labeled element appear in the model.'],
      ['Before-and-after map', 'The intervention moves congestion rather than resolving it.', 'twomap', 'Matched extent and color scale make relocation visible.', 'Independent legends can create a false improvement.', 'Lock projection, extent, classes, and legend across panels.'],
      ['Spatial residual map', 'Prediction errors cluster near the shoreline.', 'resmap', 'Mapping residual sign and magnitude exposes missing spatial structure.', 'A good global metric can conceal regional failure.', 'Use a diverging scale centered at zero and test spatial autocorrelation.'],
      ['Map plus local evidence', 'The selected site is best because it balances access, hazard, and capacity.', 'mapcallout', 'Callouts connect the final location to the evidence that distinguishes it.', 'A star on a map shows the answer but not the reason.', 'Add only the decisive nearby features, distances, and scenario values.']
    ]
  },
  {
    heading: '7. Networks, Flows, and Optimization',
    intro: 'Network and optimization figures should expose structure and constraints rather than display every edge or solver iteration. The reader needs to understand why the solution has its shape.',
    items: [
      ['Network backbone', 'Three bridges carry most inter-community connectivity.', 'network', 'Edge width and restrained labels reveal the structural bottleneck.', 'Drawing every weak edge produces a hairball.', 'Filter or fade nonessential edges and state what nodes, edges, width, and color mean.'],
      ['Community structure', 'The network contains four internally dense groups with sparse bridges.', 'community', 'Spatial grouping and color reinforce the same community assignment.', 'Force-directed layouts can suggest distance that has no domain meaning.', 'Explain the layout, test stability, and emphasize boundary edges.'],
      ['Centrality comparison', 'The busiest node is not the most critical bridge node.', 'centrality', 'Aligned rankings prevent one centrality measure from being mistaken for importance itself.', 'Reporting a single score hides the definition of influence.', 'Compare measures, define the intervention, and validate against simulated removals.'],
      ['Sankey balance', 'Losses occur mainly during conversion, not transport.', 'sankey', 'Flow width makes conservation and loss locations visible.', 'Unbalanced ribbons or arbitrary curvature can imply false conservation.', 'Make inputs equal outputs plus losses and label units at every stage.'],
      ['Queue state diagram', 'Priority service changes transition rates, not the possible states.', 'state', 'States and labeled transitions translate the stochastic model into inspectable logic.', 'A dense transition matrix is difficult to connect to real operations.', 'Draw a representative state slice and link labels to model parameters.'],
      ['Route comparison', 'A modest detour protects the plan from one road failure.', 'routes', 'Baseline and robust routes share the same network and cost scale.', 'Two maps with different extents make route comparison unreliable.', 'Overlay alternatives or use matched panels; annotate distance and worst-case delay.'],
      ['Gantt schedule', 'Resource conflicts, not task duration, determine the makespan.', 'gantt', 'Lanes and dependencies expose why one task must wait.', 'A task list hides overlap and shared-resource conflicts.', 'Use one time scale, label critical tasks, and mark idle time caused by constraints.'],
      ['Feasible-region geometry', 'The optimum lies where capacity and labor constraints meet.', 'feasible', 'The diagram gives physical meaning to active constraints.', 'Reporting solver output alone makes the optimum look magical.', 'Plot two-variable slices, label active boundaries, and test nearby feasible points.'],
      ['Convergence trace', 'The heuristic stabilizes, but different starts reach different plateaus.', 'convergence', 'Multiple runs separate convergence speed from solution variability.', 'One best run overstates reliability.', 'Plot representative and summary runs, state stopping rules, and compare with a baseline bound.'],
      ['Pareto decision map', 'Three nondominated designs represent distinct stakeholder priorities.', 'pareto', 'Named alternatives make the trade-off actionable.', 'Selecting one weight vector prematurely erases reasonable choices.', 'Retain the frontier, explain the knee, and let preferences enter after dominance analysis.']
    ]
  },
  {
    heading: '8. Frameworks and Model Architecture',
    intro: 'Framework diagrams are valuable when equations and prose span several modules. Their purpose is not to look futuristic; it is to reveal inputs, transformations, feedback, and responsibility.',
    items: [
      ['Problem decomposition', 'The recommendation depends on demand, capacity, and risk modules.', 'architecture', 'Parallel branches show that no single model owns the final answer.', 'A list of methods does not reveal dependency or integration.', 'Group modules by question, label inputs and outputs, and converge only where information truly combines.'],
      ['Data lineage', 'Every reported metric can be traced to a raw field and transformation.', 'lineage', 'The diagram makes cleaning and aggregation auditable.', 'A generic “preprocessing” box hides consequential choices.', 'Name filters, joins, derived fields, and row counts at each stage.'],
      ['Simulation loop', 'Policy changes behavior, which changes the next system state.', 'loop', 'The feedback arrow encodes the dynamic mechanism.', 'A one-way flowchart silently assumes no behavioral response.', 'Separate state update, observation, decision, and feedback timing.'],
      ['Multi-level model', 'Individual events aggregate into regional and system outcomes.', 'layers', 'Nested levels prevent variables from being mixed across scales.', 'Arrows between every box create visual noise and ambiguous causality.', 'Use containers for scale, direct arrows, and a legend for observed versus latent quantities.'],
      ['Neural network schematic', 'Spatial features and temporal features are fused only after separate encoders.', 'neural', 'The architecture mirrors the data-generating structure.', 'Decorative neuron clouds do not show tensor shape or fusion.', 'Label tensor dimensions, repeated blocks, activation outputs, and the decision head.'],
      ['Training and validation', 'Model selection never uses the final test period.', 'split', 'A timeline clarifies leakage prevention.', 'A random split icon can be misleading for time-dependent data.', 'Show exact temporal boundaries and where tuning, calibration, and final evaluation occur.'],
      ['Digital twin workflow', 'Measurements update parameters before the next control decision.', 'twin', 'Physical and computational lanes show synchronization.', 'A single “digital twin” box explains nothing.', 'Name sensors, state estimator, simulator, controller, and update frequency.'],
      ['Indicator hierarchy', 'Raw indicators support dimensions, which support the final assessment.', 'hierarchy', 'The tree exposes aggregation and weight placement.', 'A final radar chart hides how its scores were built.', 'Show normalization and weight levels; flag indicators shared across dimensions.'],
      ['Causal diagram', 'Weather affects both demand and delay, so it must not be treated as an intervention.', 'causal', 'Directed edges make the adjustment question explicit.', 'A correlation network cannot distinguish confounders from mediators.', 'Define nodes temporally, justify arrows, and derive the adjustment set from the graph.'],
      ['Validation architecture', 'Each model output has a matching test and fallback response.', 'validation', 'Paired modules and checks turn validation into system design.', 'A final “validate model” box postpones every hard question.', 'Attach a metric, threshold, and corrective action to each module.']
    ]
  },
  {
    heading: '9. Scientific and Engineering Figures',
    intro: 'Some models need domain-specific pictures: fields, trajectories, geometry, material layers, biochemical pathways, or tensors. The same rule applies—simplify until the mechanism is visible, but no further.',
    items: [
      ['Vector field', 'Flow rotates around the obstacle and accelerates through the gap.', 'vector', 'Direction and magnitude are encoded without a false three-dimensional surface.', 'Too many arrows overlap and hide the field.', 'Subsample uniformly, scale arrows consistently, and pair with streamlines or magnitude contours.'],
      ['Contour surface', 'Temperature crosses the safety threshold near one boundary.', 'contour', 'Contours make level sets and threshold geometry explicit.', 'A 3D surface can hide the far side and distort slopes through perspective.', 'Use labeled contours, an ordered palette, and emphasize the decision threshold.'],
      ['Trajectory bundle', 'Most simulated paths converge, but a small group exits the safe corridor.', 'trajectories', 'Transparency shows common behavior and exceptional failure.', 'A single mean trajectory can pass through a region no run actually visits.', 'Plot representative paths, a central band, and the boundary that defines failure.'],
      ['Cross-section schematic', 'Heat must pass through three layers with different resistance.', 'layersci', 'Thickness, material, and flux direction correspond directly to the governing equation.', 'A photorealistic wall adds texture without mathematical information.', 'Draw only interfaces, dimensions, boundary conditions, and fluxes used by the model.'],
      ['Free-body diagram', 'Normal force and friction determine whether the vehicle slips.', 'forces', 'Forces are attached to one isolated body in a declared coordinate system.', 'Mixing forces on different bodies causes sign and balance errors.', 'Choose the body, draw axes, add only external forces, and label angles and magnitudes.'],
      ['Reaction pathway', 'The intervention blocks one branch while preserving the main pathway.', 'pathway', 'Color and arrow style distinguish activation, inhibition, and transport.', 'A dense biochemical poster overwhelms the modeled mechanism.', 'Include only species in the equations and provide a legend for interaction types.'],
      ['Tensor transformation', 'The operation changes channels while preserving spatial resolution.', 'tensor', 'Block dimensions make input and output shapes inspectable.', 'Pretty cubes without dimensions conceal impossible operations.', 'Label each axis, operation, stride, and repeated block.'],
      ['Phase portrait', 'Two initial conditions approach different stable states.', 'phase', 'Trajectories and direction field reveal long-run behavior beyond a time trace.', 'A single solution curve cannot establish global stability.', 'Mark equilibria, nullclines, direction, and representative initial conditions.'],
      ['Dimensionless collapse', 'Experiments at different scales follow one common relationship.', 'collapse', 'Rescaling converts separate clouds into evidence for a shared mechanism.', 'Choosing dimensionless groups after seeing the desired collapse risks overfitting.', 'Derive groups from units or theory, then show both raw and collapsed views.'],
      ['Three-dimensional data in slices', 'The effect changes across depth as well as horizontal position.', 'slices', 'Small-multiple slices preserve quantitative reading better than an opaque 3D block.', 'A rotatable rendering is useless on a printed page.', 'Choose informative planes, keep a shared color scale, and include orientation.']
    ]
  },
  {
    heading: '10. From Good Figure to Award-Level Page',
    intro: 'A competition paper is judged as a sequence of pages. The final ten examples show how charts, diagrams, captions, typography, and layout cooperate so that evidence can be found and trusted under time pressure.',
    items: [
      ['Matched multi-panel figure', 'Data, mechanism, and result form one argument.', 'multipanel', 'Panel labels and aligned geometry lead the reader through the evidence chain.', 'Combining unrelated charts saves space but destroys narrative.', 'Use panels only when they answer one shared question; write one caption that explains the sequence.'],
      ['Overview plus detail', 'The global pattern is stable, while one local region explains the exception.', 'overview', 'An overview provides context and an inset preserves the consequential detail.', 'Cropping directly to the anomaly exaggerates its prevalence.', 'Mark the inset extent and keep scales interpretable.'],
      ['Model–data–decision triptych', 'The mechanism explains the data and changes the recommended action.', 'triptych', 'Three panels connect theory, empirical fit, and use.', 'A model diagram without empirical or decision panels remains ornamental.', 'Maintain common color semantics and reference every panel in the caption.'],
      ['Consistent color semantics', 'Blue always means baseline and orange always means proposal.', 'colors', 'Stable color reduces cognitive switching across the paper.', 'Reusing colors for different meanings creates silent contradictions.', 'Create a project palette before plotting and reserve emphasis colors for exceptions.'],
      ['Accessible palette', 'All scenarios remain distinguishable without color vision.', 'accessible', 'Hue, lightness, line style, and direct labels provide redundant cues.', 'Red–green contrasts exclude readers and often fail in grayscale printing.', 'Test grayscale and color-vision simulation; never encode a critical distinction by hue alone.'],
      ['Typographic hierarchy', 'The eye reaches result, axis, annotation, and source in that order.', 'type', 'A controlled type scale separates evidence from metadata.', 'Tiny labels and oversized titles waste the limited page area.', 'Match figure text to final print size and use at most three text levels.'],
      ['Annotation with discipline', 'One arrow identifies the exact point where the decision changes.', 'annotation', 'A sparse annotation directs attention without replacing the data.', 'Ten callouts turn the chart into a poster and signal that the encoding failed.', 'Annotate only consequential events; move secondary details to the caption.'],
      ['Table and chart partnership', 'The chart shows pattern; the table supplies exact selected values.', 'tablechart', 'Each medium does the task it performs best.', 'Duplicating every value in both wastes space and attention.', 'Chart the comparison, table the audited decisions, and cross-reference them.'],
      ['Reproducible figure record', 'The published figure can be regenerated from a named dataset and script.', 'provenance', 'Visible provenance turns visual quality into an auditable result.', 'Manual edits break the link between analysis and paper.', 'Save data snapshot, script, parameters, environment, and output under stable names.'],
      ['Final figure audit', 'Every figure answers a question, uses honest scales, and survives print.', 'audit', 'The checklist closes the gap between attractive and trustworthy.', 'Reviewing only aesthetics misses incorrect units, legends, and scenarios.', 'Audit claim, data, encoding, scale, uncertainty, caption, source, accessibility, and reproduction.']
    ]
  }
];

const allItems = groups.flatMap((group, groupIndex) => group.items.map((entry, itemIndex) => ({
  groupIndex,
  itemIndex,
  number: groupIndex * 10 + itemIndex + 1,
  title: entry[0],
  claim: entry[1],
  type: entry[2],
  why: entry[3],
  pitfall: entry[4],
  recipe: entry[5]
})));

function esc(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function rng(seed) {
  let x = seed * 2654435761 >>> 0;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

function frame(title, claim, body, accent = palette[0]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(claim)}</desc>
  <defs><filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#16324f" flood-opacity=".10"/></filter></defs>
  <rect width="960" height="600" rx="30" fill="#f7fbff"/>
  <rect x="36" y="30" width="888" height="540" rx="24" fill="#ffffff" stroke="#d9e7f5" filter="url(#shadow)"/>
  <rect x="36" y="30" width="10" height="540" rx="5" fill="${accent}"/>
  <text x="76" y="78" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="700" fill="#17324d">${esc(title)}</text>
  <text x="76" y="108" font-family="Inter,Arial,sans-serif" font-size="15" fill="#60758a">Synthetic teaching example · values are illustrative</text>
  ${body}
  </svg>`;
}

function axes() {
  return `<line x1="112" y1="488" x2="860" y2="488" stroke="#9fb3c8" stroke-width="2"/><line x1="112" y1="154" x2="112" y2="488" stroke="#9fb3c8" stroke-width="2"/>`;
}

function polyline(points, color, width = 4, dash = '') {
  return `<polyline points="${points.map(p => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function renderChart(item) {
  const random = rng(item.number + 11);
  const c1 = palette[item.groupIndex % palette.length];
  const c2 = palette[(item.groupIndex + 2) % palette.length];
  const c3 = palette[(item.groupIndex + 4) % palette.length];
  const pts = Array.from({length: 12}, (_, i) => [130 + i * 62, 430 - (i * 10 + 45 * Math.sin(i / 2) + random() * 35)]);
  const bars = Array.from({length: 6}, (_, i) => 80 + Math.round(random() * 190) + i * 10);
  const labels = ['A','B','C','D','E','F'];
  const lineBody = `${axes()}${polyline(pts,c1)}${pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${c1}" stroke-width="3"/>`).join('')}<path d="M130 360 C310 315 530 290 812 212" fill="none" stroke="${c2}" stroke-width="3" stroke-dasharray="9 8"/><text x="690" y="200" font-family="Arial" font-size="16" fill="${c2}">reference</text>`;
  const barsBody = `${axes()}${bars.map((v,i)=>`<rect x="150" y="${182+i*48}" width="${v*2.2}" height="27" rx="6" fill="${i===bars.indexOf(Math.max(...bars))?c2:c1}" opacity="${i===bars.indexOf(Math.max(...bars))?1:.72}"/><text x="125" y="${202+i*48}" text-anchor="end" font-family="Arial" font-size="15" fill="#475569">${labels[i]}</text><text x="${160+v*2.2}" y="${202+i*48}" font-family="Arial" font-size="14" fill="#475569">${v}</text>`).join('')}`;
  const heatCells = Array.from({length: 48},(_,i)=>{const x=i%8,y=Math.floor(i/8),v=random();return `<rect x="160" y="${175+y*48}" width="72" height="40" rx="5" transform="translate(${x*76} 0)" fill="${v>.72?c3:v>.42?c1:'#dceaf6'}" opacity="${.45+v*.5}"/>`;}).join('');
  const scatter = Array.from({length:42},(_,i)=>{const x=145+random()*650;const y=445-(x-145)*.32+(random()-.5)*135;return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${i%8===0?c2:c1}" opacity=".67"/>`;}).join('');
  const networkNodes = [[190,300],[320,190],[330,410],[485,280],[650,180],[670,390],[810,285]];
  const networkEdges = [[0,1],[0,2],[1,3],[2,3],[1,2],[3,4],[3,5],[4,6],[5,6],[4,5]];
  const network = `${networkEdges.map((e,i)=>`<line x1="${networkNodes[e[0]][0]}" y1="${networkNodes[e[0]][1]}" x2="${networkNodes[e[1]][0]}" y2="${networkNodes[e[1]][1]}" stroke="${i===5?c2:'#9db2c7'}" stroke-width="${i===5?10:3}" opacity=".8"/>`).join('')}${networkNodes.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${i===3?23:17}" fill="${i===3?c2:c1}" stroke="#fff" stroke-width="5"/><text x="${p[0]}" y="${p[1]+5}" text-anchor="middle" font-family="Arial" font-size="13" fill="#fff">${i+1}</text>`).join('')}`;
  const flow = `<defs><marker id="arrow-${item.number}" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L9,4 L0,8 z" fill="${c1}"/></marker></defs>${['INPUT','MODEL','CHECK','DECIDE'].map((t,i)=>`<rect x="${105+i*205}" y="260" width="150" height="88" rx="18" fill="${i===3?c2:'#e7f1fb'}" stroke="${i===3?c2:c1}" stroke-width="3"/><text x="${180+i*205}" y="312" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="${i===3?'#fff':'#23435f'}">${t}</text>${i<3?`<line x1="${260+i*205}" y1="304" x2="${300+i*205}" y2="304" stroke="${c1}" stroke-width="4" marker-end="url(#arrow-${item.number})"/>`:''}`).join('')}`;
  const feasible = `${axes()}<polygon points="190,460 190,275 410,200 690,390 690,460" fill="${c1}" opacity=".14"/><line x1="190" y1="275" x2="690" y2="445" stroke="${c1}" stroke-width="4"/><line x1="410" y1="200" x2="690" y2="390" stroke="${c2}" stroke-width="4"/><circle cx="530" cy="338" r="12" fill="${c3}" stroke="#fff" stroke-width="4"/><circle cx="735" cy="315" r="10" fill="#94a3b8"/><text x="548" y="330" font-family="Arial" font-size="16" fill="#334155">selected</text><text x="210" y="435" font-family="Arial" font-size="17" fill="${c1}">feasible</text>`;
  const hist = `${axes()}${Array.from({length:14},(_,i)=>{const h=40+260*Math.exp(-Math.pow((i-5)/3,2))*(.8+random()*.3);return `<rect x="${132+i*48}" y="${488-h}" width="41" height="${h}" fill="${c1}" opacity=".72"/>`;}).join('')}<line x1="700" y1="170" x2="700" y2="488" stroke="${c2}" stroke-width="4" stroke-dasharray="8 7"/><text x="712" y="188" font-family="Arial" font-size="16" fill="${c2}">threshold</text>`;
  const matrix = `${Array.from({length:25},(_,i)=>{const x=i%5,y=Math.floor(i/5),v=random();return `<rect x="${265+x*82}" y="${168+y*62}" width="74" height="54" rx="6" fill="${v>.72?c2:c1}" opacity="${.25+v*.7}"/><text x="${302+x*82}" y="${201+y*62}" text-anchor="middle" font-family="Arial" font-size="13" fill="${v>.55?'#fff':'#24415c'}">${Math.round(v*100)}</text>`;}).join('')}<text x="470" y="515" text-anchor="middle" font-family="Arial" font-size="16" fill="#64748b">Predicted class →</text><text x="185" y="325" transform="rotate(-90 185 325)" text-anchor="middle" font-family="Arial" font-size="16" fill="#64748b">Observed class →</text>`;
  const map = `${Array.from({length:45},(_,i)=>{const x=i%9,y=Math.floor(i/9),v=random();return `<path d="M${145+x*74} ${175+y*62} l65 ${-6+random()*12} l${-5+random()*10} 54 l-62 ${5-random()*10} z" fill="${v>.72?c3:v>.4?c1:'#d8e7f4'}" stroke="#fff" stroke-width="3" opacity=".85"/>`;}).join('')}<circle cx="565" cy="315" r="15" fill="${c2}" stroke="#fff" stroke-width="4"/><text x="590" y="320" font-family="Arial" font-size="16" fill="#334155">priority site</text>`;
  const architecture = `${['DATA','STATE','MODEL','EVIDENCE','DECISION'].map((t,i)=>`<rect x="${95+i*166}" y="${210+(i%2)*85}" width="135" height="70" rx="16" fill="${i===4?c2:'#edf5fc'}" stroke="${i===4?c2:c1}" stroke-width="3"/><text x="${162+i*166}" y="${252+(i%2)*85}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="${i===4?'#fff':'#23435f'}">${t}</text>${i<4?`<path d="M${232+i*166} ${245+(i%2)*85} C${260+i*166} ${245+(i%2)*85},${250+i*166} ${330-((i+1)%2)*85},${260+i*166} ${245+((i+1)%2)*85}" fill="none" stroke="${c1}" stroke-width="3"/>`:''}`).join('')}<path d="M825 380 C650 510 320 520 140 380" fill="none" stroke="${c3}" stroke-width="3" stroke-dasharray="10 8"/><text x="470" y="523" text-anchor="middle" font-family="Arial" font-size="15" fill="${c3}">validation feedback</text>`;
  const radar = `<g transform="translate(480 325)">${[1,2,3,4,5].map(r=>`<polygon points="${Array.from({length:6},(_,i)=>{const a=-Math.PI/2+i*Math.PI/3;return `${Math.cos(a)*r*42},${Math.sin(a)*r*42}`;}).join(' ')}" fill="none" stroke="#d4e2ef"/>`).join('')}${Array.from({length:6},(_,i)=>{const a=-Math.PI/2+i*Math.PI/3;return `<line x1="0" y1="0" x2="${Math.cos(a)*210}" y2="${Math.sin(a)*210}" stroke="#d4e2ef"/>`;}).join('')}<polygon points="${Array.from({length:6},(_,i)=>{const a=-Math.PI/2+i*Math.PI/3,r=110+random()*90;return `${Math.cos(a)*r},${Math.sin(a)*r}`;}).join(' ')}" fill="${c1}" fill-opacity=".2" stroke="${c1}" stroke-width="4"/></g>`;
  const timeline = `<line x1="130" y1="330" x2="835" y2="330" stroke="#b8c8d8" stroke-width="6"/>${Array.from({length:7},(_,i)=>{const x=150+i*110,y=i%2?240:410;return `<line x1="${x}" y1="330" x2="${x}" y2="${y}" stroke="${i===4?c2:c1}" stroke-width="3"/><circle cx="${x}" cy="330" r="10" fill="${i===4?c2:c1}"/><rect x="${x-55}" y="${y-(i%2?55:0)}" width="110" height="54" rx="12" fill="${i===4?'#fff1f2':'#eef6fd'}" stroke="${i===4?c2:c1}"/><text x="${x}" y="${y+(i%2?-22:33)}" text-anchor="middle" font-family="Arial" font-size="13" fill="#334155">Event ${i+1}</text>`;}).join('')}`;
  const panels = `<rect x="105" y="165" width="230" height="315" rx="16" fill="#edf6fd" stroke="${c1}" stroke-width="3"/><rect x="365" y="165" width="230" height="315" rx="16" fill="#f1f8f6" stroke="${c2}" stroke-width="3"/><rect x="625" y="165" width="230" height="315" rx="16" fill="#fff8e7" stroke="${c3}" stroke-width="3"/>${['DATA','MODEL','DECISION'].map((t,i)=>`<text x="${220+i*260}" y="205" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#334155">${t}</text>`).join('')}${polyline([[135,420],[175,390],[220,405],[275,300],[310,260]],c1,4)}<circle cx="480" cy="325" r="78" fill="none" stroke="${c2}" stroke-width="14" stroke-dasharray="95 30"/><path d="M690 400 L770 240 L820 400 Z" fill="${c3}" opacity=".35" stroke="${c3}" stroke-width="4"/>`;
  const vector = `${Array.from({length:54},(_,i)=>{const x=145+(i%9)*78,y=185+Math.floor(i/9)*58,dx=(y-330)*.16,dy=-(x-470)*.10;return `<line x1="${x}" y1="${y}" x2="${x+dx}" y2="${y+dy}" stroke="${c1}" stroke-width="3" opacity=".72"/><circle cx="${x+dx}" cy="${y+dy}" r="3" fill="${c1}"/>`;}).join('')}<circle cx="480" cy="330" r="55" fill="#fff" stroke="${c2}" stroke-width="6"/>`;
  const pairedDist = `${axes()}<path d="M130 470 C210 470 235 255 355 255 C475 255 485 470 570 470" fill="${c1}" fill-opacity=".16" stroke="${c1}" stroke-width="5"/><path d="M340 470 C420 470 465 205 585 205 C705 205 735 470 825 470" fill="${c2}" fill-opacity=".14" stroke="${c2}" stroke-width="5"/><line x1="355" y1="245" x2="355" y2="488" stroke="${c1}" stroke-width="3" stroke-dasharray="7 7"/><line x1="585" y1="195" x2="585" y2="488" stroke="${c2}" stroke-width="3" stroke-dasharray="7 7"/><text x="245" y="215" font-family="Arial" font-size="17" fill="${c1}">baseline</text><text x="635" y="185" font-family="Arial" font-size="17" fill="${c2}">proposal</text>`;
  const groupedBars = `${axes()}${Array.from({length:4},(_,g)=>Array.from({length:3},(_,j)=>{const h=90+random()*170;return `<rect x="${170+g*165+j*34}" y="${488-h}" width="27" height="${h}" rx="5" fill="${[c1,c2,c3][j]}" opacity=".82"/>`;}).join('')).join('')}${['Normal','High','Storm','Recovery'].map((t,i)=>`<text x="${205+i*165}" y="520" text-anchor="middle" font-family="Arial" font-size="14" fill="#64748b">${t}</text>`).join('')}`;
  const dotPlot = `${axes()}${bars.map((v,i)=>`<line x1="180" y1="${190+i*50}" x2="${690+v/3}" y2="${190+i*50}" stroke="#d8e4ef" stroke-width="3"/><circle cx="${690+v/3}" cy="${190+i*50}" r="11" fill="${i===2?c2:c1}"/><text x="160" y="${196+i*50}" text-anchor="end" font-family="Arial" font-size="15" fill="#475569">Region ${labels[i]}</text>`).join('')}`;
  const slopeBody = `${[0,1].map(i=>`<line x1="${i?730:230}" y1="160" x2="${i?730:230}" y2="470" stroke="#c7d6e5" stroke-width="3"/><text x="${i?730:230}" y="515" text-anchor="middle" font-family="Arial" font-size="16" fill="#64748b">Policy ${i?'B':'A'}</text>`).join('')}${Array.from({length:5},(_,i)=>{const y1=195+i*55,y2=195+((i*2+2)%5)*55;return `<line x1="230" y1="${y1}" x2="730" y2="${y2}" stroke="${i===1?c2:c1}" stroke-width="${i===1?6:3}"/><circle cx="230" cy="${y1}" r="7" fill="${i===1?c2:c1}"/><circle cx="730" cy="${y2}" r="7" fill="${i===1?c2:c1}"/>`;}).join('')}`;
  const dumbbell = `${bars.map((v,i)=>{const a=250+v*.55,b=650+(i%3)*32;return `<line x1="${a}" y1="${190+i*50}" x2="${b}" y2="${190+i*50}" stroke="#b8c9d8" stroke-width="7"/><circle cx="${a}" cy="${190+i*50}" r="11" fill="${c1}"/><circle cx="${b}" cy="${190+i*50}" r="11" fill="${c2}"/><text x="155" y="${196+i*50}" font-family="Arial" font-size="15" fill="#475569">Site ${labels[i]}</text>`;}).join('')}<text x="280" y="520" font-family="Arial" font-size="15" fill="${c1}">before</text><text x="675" y="520" font-family="Arial" font-size="15" fill="${c2}">after</text>`;
  const smallBars = `${Array.from({length:4},(_,p)=>{const x=105+(p%2)*390,y=165+Math.floor(p/2)*175;return `<rect x="${x}" y="${y}" width="340" height="145" rx="15" fill="#f7fafc" stroke="#d7e4ef"/>${Array.from({length:4},(_,i)=>`<rect x="${x+45+i*68}" y="${y+115-(40+random()*65)}" width="34" height="${40+random()*65}" rx="4" fill="${i===2?c2:c1}" opacity=".78"/>`).join('')}<text x="${x+18}" y="${y+28}" font-family="Arial" font-size="14" fill="#64748b">Objective ${p+1}</text>`;}).join('')}`;
  const stackedBody = `${Array.from({length:4},(_,i)=>{const y=190+i*68,a=150+random()*180,b=110+random()*140;return `<rect x="210" y="${y}" width="${a}" height="34" fill="${c1}"/><rect x="${210+a}" y="${y}" width="${b}" height="34" fill="${c2}"/><rect x="${210+a+b}" y="${y}" width="${560-a-b}" height="34" fill="${c3}"/><text x="190" y="${y+23}" text-anchor="end" font-family="Arial" font-size="15" fill="#475569">Year ${i+1}</text>`;}).join('')}<text x="210" y="515" font-family="Arial" font-size="15" fill="#64748b">share within each total · total volume annotated separately</text>`;
  const donutBody = `<circle cx="480" cy="330" r="150" fill="none" stroke="#e6eef6" stroke-width="70"/><circle cx="480" cy="330" r="150" fill="none" stroke="${c1}" stroke-width="70" stroke-dasharray="565 378" transform="rotate(-90 480 330)"/><circle cx="480" cy="330" r="150" fill="none" stroke="${c2}" stroke-width="70" stroke-dasharray="145 798" stroke-dashoffset="-565" transform="rotate(-90 480 330)"/><text x="480" y="325" text-anchor="middle" font-family="Arial" font-size="52" font-weight="700" fill="#17324d">60%</text><text x="480" y="358" text-anchor="middle" font-family="Arial" font-size="16" fill="#64748b">dominant cause</text>`;
  const fanBody = `${axes()}<path d="M130 405 C260 360 360 330 470 300 L820 180 L820 450 L470 330 C350 350 245 390 130 420 Z" fill="${c1}" opacity=".10"/><path d="M470 285 L820 235 L820 395 L470 340 Z" fill="${c1}" opacity=".18"/>${polyline([[130,410],[220,375],[310,355],[400,325],[470,310]],c1)}${polyline([[470,310],[560,305],[650,295],[740,280],[820,265]],c2,4,'10 8')}<line x1="470" y1="155" x2="470" y2="488" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6 7"/><text x="487" y="178" font-family="Arial" font-size="15" fill="#64748b">forecast begins</text>`;
  const seasonalBody = `${Array.from({length:3},(_,p)=>{const y=165+p*120;const series=Array.from({length:8},(_,i)=>[150+i*88,y+80-(20+45*Math.sin((i+p)*.8)+random()*12)]);return `<text x="120" y="${y+20}" font-family="Arial" font-size="14" fill="#64748b">${['Weekday','Saturday','Sunday'][p]}</text>${polyline(series,[c1,c2,c3][p],4)}`;}).join('')}`;
  const scenarioBody = `${axes()}${Array.from({length:4},(_,s)=>polyline(Array.from({length:9},(_,i)=>[150+i*82,430-i*(18+s*5)+s*28+Math.sin(i)*12]),[c1,c2,c3,'#64748b'][s],s===2?6:3,s===3?'8 7':'' )).join('')}<line x1="150" y1="260" x2="820" y2="260" stroke="#ef476f" stroke-width="3" stroke-dasharray="7 7"/><text x="680" y="248" font-family="Arial" font-size="15" fill="#ef476f">failure threshold</text>`;
  const boxBody = `${axes()}${Array.from({length:5},(_,i)=>{const x=205+i*125,q1=300-random()*40,q3=410+random()*35,med=(q1+q3)/2;return `<line x1="${x}" y1="${q1-55}" x2="${x}" y2="${q3+45}" stroke="#6b8297" stroke-width="3"/><rect x="${x-34}" y="${q1}" width="68" height="${q3-q1}" fill="${c1}" fill-opacity=".18" stroke="${c1}" stroke-width="4"/><line x1="${x-34}" y1="${med}" x2="${x+34}" y2="${med}" stroke="${c2}" stroke-width="5"/>${Array.from({length:9},()=>`<circle cx="${x-18+random()*36}" cy="${q1-45+random()*(q3-q1+80)}" r="4" fill="${c3}" opacity=".45"/>`).join('')}`;}).join('')}`;
  const violinBody = `${axes()}${Array.from({length:4},(_,i)=>{const x=250+i*155;return `<path d="M${x} 180 C${x-80-random()*20} 240 ${x-55} 410 ${x} 465 C${x+55} 410 ${x+80+random()*20} 240 ${x} 180 Z" fill="${c1}" fill-opacity=".18" stroke="${c1}" stroke-width="3"/><line x1="${x-22}" y1="325" x2="${x+22}" y2="325" stroke="${c2}" stroke-width="6"/>`;}).join('')}`;
  const calibrationBody = `${axes()}<line x1="150" y1="455" x2="800" y2="175" stroke="#94a3b8" stroke-width="4" stroke-dasharray="9 8"/>${polyline([[150,455],[250,420],[350,390],[450,345],[550,325],[650,290],[750,250],[800,235]],c1,5)}${[150,250,350,450,550,650,750,800].map((x,i)=>`<circle cx="${x}" cy="${[455,420,390,345,325,290,250,235][i]}" r="7" fill="${c1}" stroke="#fff" stroke-width="3"/>`).join('')}<text x="625" y="190" font-family="Arial" font-size="15" fill="#64748b">perfect calibration</text>`;
  const residualBody = `${axes()}<line x1="112" y1="330" x2="860" y2="330" stroke="${c2}" stroke-width="3" stroke-dasharray="8 7"/>${Array.from({length:55},(_,i)=>{const x=145+random()*650,spread=25+(x-145)*.18,y=330+(random()-.5)*spread;return `<circle cx="${x}" cy="${y}" r="5" fill="${c1}" opacity=".6"/>`;}).join('')}`;
  const parityBody = `${axes()}<line x1="150" y1="450" x2="790" y2="180" stroke="#94a3b8" stroke-width="4" stroke-dasharray="9 8"/>${Array.from({length:45},(_,i)=>{const x=160+random()*620,y=460-(x-150)*.40+(x>620?45:0)+(random()-.5)*50;return `<circle cx="${x}" cy="${y}" r="6" fill="${i%9===0?c2:c1}" opacity=".68"/>`;}).join('')}<text x="660" y="195" font-family="Arial" font-size="15" fill="#64748b">observed = predicted</text>`;
  const tornadoBody = `${bars.map((v,i)=>{const y=185+i*50,w=90+v*.6;return `<rect x="${475-w}" y="${y}" width="${w}" height="28" rx="5" fill="${c1}" opacity=".75"/><rect x="475" y="${y}" width="${w*.72}" height="28" rx="5" fill="${c2}" opacity=".75"/><text x="155" y="${y+20}" font-family="Arial" font-size="14" fill="#475569">Input ${i+1} ±20%</text>`;}).join('')}<line x1="475" y1="155" x2="475" y2="500" stroke="#64748b" stroke-width="3"/>`;
  const bubbleMap = `${map}${Array.from({length:8},(_,i)=>`<circle cx="${180+random()*600}" cy="${190+random()*260}" r="${8+random()*28}" fill="${c2}" fill-opacity=".38" stroke="${c2}" stroke-width="3"/>`).join('')}`;
  const hexBody = `${Array.from({length:54},(_,i)=>{const col=i%9,row=Math.floor(i/9),x=175+col*68+(row%2)*34,y=180+row*56,v=random();return `<path d="M${x} ${y-28} l24 14 v28 l-24 14 l-24-14 v-28 z" fill="${v>.75?c3:v>.4?c1:'#dbe8f3'}" opacity="${.5+v*.45}" stroke="#fff" stroke-width="2"/>`;}).join('')}`;
  const geometryBody = `<line x1="170" y1="450" x2="790" y2="450" stroke="#9fb3c8" stroke-width="4"/><line x1="260" y1="450" x2="260" y2="190" stroke="#9fb3c8" stroke-width="4"/><path d="M260 450 L720 250 L720 450 Z" fill="${c1}" fill-opacity=".08" stroke="${c1}" stroke-width="5"/><path d="M330 450 A70 70 0 0 0 320 420" fill="none" stroke="${c2}" stroke-width="5"/><text x="340" y="420" font-family="Arial" font-size="22" fill="${c2}">θ</text><circle cx="720" cy="250" r="13" fill="${c3}"/><text x="740" y="245" font-family="Arial" font-size="16" fill="#334155">target</text><text x="475" y="375" font-family="Arial" font-size="16" fill="#334155">distance d</text>`;
  const sankeyBody = `<rect x="120" y="225" width="120" height="190" rx="14" fill="${c1}"/><rect x="420" y="185" width="120" height="250" rx="14" fill="${c2}"/><rect x="720" y="250" width="120" height="130" rx="14" fill="${c3}"/><path d="M240 245 C330 245 330 205 420 205 L420 330 C330 330 330 370 240 370 Z" fill="${c1}" opacity=".38"/><path d="M540 235 C630 235 630 270 720 270 L720 350 C630 350 630 325 540 325 Z" fill="${c2}" opacity=".38"/><path d="M540 340 C625 360 640 455 725 475" fill="none" stroke="#ef476f" stroke-width="26" opacity=".45"/><text x="640" y="486" font-family="Arial" font-size="15" fill="#ef476f">loss</text>`;
  const routeBody = `${network}<polyline points="190,300 320,190 485,280 650,180 810,285" fill="none" stroke="${c3}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".72"/><polyline points="190,300 330,410 485,280 670,390 810,285" fill="none" stroke="${c2}" stroke-width="7" stroke-dasharray="12 10"/>`;
  const ganttBody = `${Array.from({length:6},(_,i)=>{const x=190+(i%3)*80,w=180+random()*220,y=180+i*52;return `<text x="155" y="${y+20}" text-anchor="end" font-family="Arial" font-size="14" fill="#475569">Task ${String.fromCharCode(65+i)}</text><rect x="${x}" y="${y}" width="${w}" height="28" rx="6" fill="${i===2?c2:c1}" opacity=".78"/>`;}).join('')}<line x1="560" y1="155" x2="560" y2="505" stroke="${c3}" stroke-width="4" stroke-dasharray="8 7"/><text x="575" y="175" font-family="Arial" font-size="14" fill="${c3}">critical handoff</text>`;
  const causalBody = `${['Weather','Demand','Delay','Policy','Outcome'].map((t,i)=>{const p=[[170,230],[410,190],[410,390],[690,210],[690,390]][i];return `<ellipse cx="${p[0]}" cy="${p[1]}" rx="80" ry="38" fill="#eef6fd" stroke="${i===0?c2:c1}" stroke-width="4"/><text x="${p[0]}" y="${p[1]+6}" text-anchor="middle" font-family="Arial" font-size="16" fill="#334155">${t}</text>`;}).join('')}<path d="M250 220 L325 200 M240 250 L330 360 M490 200 L610 210 M490 390 L610 390 M690 250 L690 340" stroke="${c1}" stroke-width="5" fill="none"/><polygon points="604,202 625,210 604,218" fill="${c1}"/><polygon points="684,330 696,350 708,330" fill="${c1}"/>`;
  const layersSci = `<rect x="160" y="215" width="170" height="240" fill="#dbeafe" stroke="${c1}" stroke-width="4"/><rect x="330" y="215" width="240" height="240" fill="#ccfbf1" stroke="${c2}" stroke-width="4"/><rect x="570" y="215" width="170" height="240" fill="#fef3c7" stroke="${c3}" stroke-width="4"/><path d="M100 335 H825" stroke="#ef476f" stroke-width="10"/><polygon points="825,335 795,318 795,352" fill="#ef476f"/>${['Layer 1','Layer 2','Layer 3'].map((t,i)=>`<text x="${245+[0,205,410][i]}" y="190" text-anchor="middle" font-family="Arial" font-size="16" fill="#334155">${t}</text>`).join('')}<text x="680" y="370" font-family="Arial" font-size="16" fill="#ef476f">heat flux q</text>`;
  const forcesBody = `<rect x="385" y="265" width="190" height="110" rx="12" fill="#e7f1fb" stroke="${c1}" stroke-width="5"/><line x1="480" y1="265" x2="480" y2="165" stroke="${c2}" stroke-width="7"/><polygon points="480,150 466,175 494,175" fill="${c2}"/><line x1="480" y1="375" x2="480" y2="485" stroke="${c3}" stroke-width="7"/><polygon points="480,500 466,475 494,475" fill="${c3}"/><line x1="385" y1="320" x2="245" y2="320" stroke="#ef476f" stroke-width="7"/><polygon points="225,320 255,304 255,336" fill="#ef476f"/><text x="502" y="170" font-family="Arial" font-size="20" fill="${c2}">N</text><text x="502" y="480" font-family="Arial" font-size="20" fill="${c3}">mg</text><text x="260" y="300" font-family="Arial" font-size="20" fill="#ef476f">friction</text>`;
  const tensorBody = `${[[210,310,150,120],[480,290,115,150],[710,270,80,190]].map((p,i)=>`<g><rect x="${p[0]}" y="${p[1]}" width="${p[2]}" height="${p[3]}" fill="${[c1,c2,c3][i]}" fill-opacity=".18" stroke="${[c1,c2,c3][i]}" stroke-width="5"/><rect x="${p[0]+18}" y="${p[1]-18}" width="${p[2]}" height="${p[3]}" fill="none" stroke="${[c1,c2,c3][i]}" stroke-width="3" opacity=".6"/><text x="${p[0]+p[2]/2}" y="${p[1]+p[3]+35}" text-anchor="middle" font-family="Arial" font-size="15" fill="#475569">${['64×64×16','32×32×64','16×16×128'][i]}</text></g>`).join('')}<path d="M380 350 H450 M615 350 H680" stroke="#64748b" stroke-width="6"/><polygon points="450,350 430,338 430,362" fill="#64748b"/><polygon points="680,350 660,338 660,362" fill="#64748b"/>`;
  const phaseBody = `${axes()}<line x1="130" y1="330" x2="835" y2="330" stroke="#d5e1ec"/><line x1="480" y1="160" x2="480" y2="485" stroke="#d5e1ec"/>${Array.from({length:5},(_,s)=>polyline(Array.from({length:7},(_,i)=>[160+i*105,330+(s-2)*55*Math.exp(-i/2)+Math.sin(i+s)*18]),[c1,c2,c3,'#64748b','#ef476f'][s],3)).join('')}<circle cx="790" cy="330" r="12" fill="${c2}"/><text x="805" y="320" font-family="Arial" font-size="15" fill="${c2}">stable state</text>`;
  const slicesBody = `${Array.from({length:4},(_,p)=>{const x=120+p*200;return `<rect x="${x}" y="190" width="155" height="250" rx="12" fill="#eef6fd" stroke="${c1}" stroke-width="3"/>${Array.from({length:20},(_,i)=>{const cx=x+20+(i%4)*36,cy=220+Math.floor(i/4)*42,v=random();return `<circle cx="${cx}" cy="${cy}" r="${8+v*8}" fill="${v>.6?c3:c1}" opacity="${.35+v*.55}"/>`;}).join('')}<text x="${x+78}" y="475" text-anchor="middle" font-family="Arial" font-size="15" fill="#64748b">depth ${p+1}</text>`;}).join('')}`;
  const type = item.type;
  let body;
  if (type === 'paired') body = pairedDist;
  else if (type === 'grouped') body = groupedBars;
  else if (type === 'dots') body = dotPlot;
  else if (type === 'slope') body = slopeBody;
  else if (type === 'dumbbell') body = dumbbell;
  else if (type === 'smallbars') body = smallBars;
  else if (type === 'stacked') body = stackedBody;
  else if (type === 'donut') body = donutBody;
  else if (['bars','ablation','variance'].includes(type)) body = barsBody;
  else if (type === 'tornado') body = tornadoBody;
  else if (type === 'fan') body = fanBody;
  else if (type === 'seasonal') body = seasonalBody;
  else if (type === 'scenario') body = scenarioBody;
  else if (['line','area','counterfactual','threshold','interrupted','rolling','changepoint','convergence','effect','quantile','exceedance','collapse'].includes(type)) body = lineBody;
  else if (type === 'calibration') body = calibrationBody;
  else if (type === 'box') body = boxBody;
  else if (type === 'violin') body = violinBody;
  else if (['hist','density','bootstrap'].includes(type)) body = hist;
  else if (type === 'residual') body = residualBody;
  else if (['parity','qq'].includes(type)) body = parityBody;
  else if (['scatter','facet'].includes(type)) body = `${axes()}${scatter}<line x1="150" y1="430" x2="800" y2="210" stroke="${c2}" stroke-width="4"/>`;
  else if (['heatmap','calendar','risk','confusion'].includes(type)) body = type==='confusion'?matrix:heatCells;
  else if (type === 'bubbles') body = bubbleMap;
  else if (type === 'hex') body = hexBody;
  else if (type === 'geometry') body = geometryBody;
  else if (['map','flowmap','grid','twomap','resmap','mapcallout','contour'].includes(type)) body = map;
  else if (['network','community','centrality'].includes(type)) body = network;
  else if (type === 'sankey') body = sankeyBody;
  else if (type === 'routes') body = routeBody;
  else if (type === 'gantt') body = ganttBody;
  else if (['flow','loop','lineage','state','provenance','audit'].includes(type)) body = flow;
  else if (['feasible','decision','pareto'].includes(type)) body = feasible;
  else if (['timeline','split'].includes(type)) body = timeline;
  else if (type === 'causal') body = causalBody;
  else if (type === 'layersci') body = layersSci;
  else if (type === 'forces') body = forcesBody;
  else if (type === 'tensor') body = tensorBody;
  else if (type === 'phase') body = phaseBody;
  else if (type === 'slices') body = slicesBody;
  else if (['architecture','layers','neural','twin','hierarchy','validation','pathway'].includes(type)) body = architecture;
  else if (['radar'].includes(type)) body = radar;
  else if (['vector','trajectories'].includes(type)) body = vector;
  else if (['multipanel','overview','triptych','colors','accessible','type','annotation','tablechart'].includes(type)) body = panels;
  else body = lineBody;
  return frame(`${String(item.number).padStart(3,'0')} · ${item.title}`, item.claim, body, c1);
}

function coverSvg() {
  const bars = Array.from({length:12},(_,i)=>`<rect x="${110+i*58}" y="${380-(i%5)*34}" width="32" height="${100+(i%5)*34}" rx="8" fill="${palette[i%palette.length]}" opacity=".8"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="t d"><title id="t">Visual Evidence</title><desc id="d">A refined gallery of charts, maps, diagrams and evidence</desc><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#09203f"/><stop offset="1" stop-color="#1f6f8b"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1310" cy="170" r="240" fill="#5eead4" opacity=".12"/><circle cx="180" cy="760" r="300" fill="#60a5fa" opacity=".11"/><rect x="80" y="90" width="1440" height="720" rx="42" fill="#ffffff" opacity=".96"/><text x="130" y="210" font-family="Inter,Arial" font-size="38" font-weight="700" fill="#2563eb">MATHEMATICAL MODELING · BLOG 03</text><text x="130" y="310" font-family="Inter,Arial" font-size="86" font-weight="800" fill="#12263a">Visual Evidence</text><text x="130" y="370" font-family="Inter,Arial" font-size="28" fill="#526b80">Turn data, mechanisms, and uncertainty into figures that prove a claim.</text>${bars}<polyline points="130,520 250,480 370,540 490,405 610,430 730,315 850,360" fill="none" stroke="#ef476f" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(1050 520)">${[1,2,3,4].map(r=>`<circle r="${r*55}" fill="none" stroke="#cbdced" stroke-width="3"/>`).join('')}<path d="M0,-205 L155,-45 L70,150 L-145,115 L-170,-35 Z" fill="#7c3aed" fill-opacity=".18" stroke="#7c3aed" stroke-width="10"/></g></svg>`;
}

fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(path.join(root, 'source/images/mathematical-modeling/modeling-03-visual-evidence-cover.svg'), coverSvg());

for (const item of allItems) {
  const filename = `${String(item.number).padStart(3,'0')}-${slug(item.title)}.svg`;
  fs.writeFileSync(path.join(outDir, filename), renderChart(item));
  item.filename = filename;
}

const start = '<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:START -->';
const end = '<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:END -->';
const gallery = groups.map((group, groupIndex) => {
  const figures = allItems.filter(item => item.groupIndex === groupIndex).map(item => `
<article class="mm-visual-card" id="visual-example-${String(item.number).padStart(3,'0')}">
  <div class="mm-visual-card-title">${item.number}. ${item.title}</div>
  <figure class="mm-figure">
    <img loading="lazy" src="/blog/images/mathematical-modeling/visual-evidence/${item.filename}" alt="${esc(item.title)}: ${esc(item.claim)}">
    <figcaption><strong>Claim.</strong> ${item.claim}</figcaption>
  </figure>
  <p><strong>Why it works.</strong> ${item.why}</p>
  <p><strong>What to avoid.</strong> ${item.pitfall}</p>
  <p><strong>How to build it.</strong> ${item.recipe}</p>
</article>`).join('\n');
  return `## ${group.heading}\n\n${group.intro}\n\n<div class="mm-visual-gallery">\n${figures}\n</div>`;
}).join('\n\n');

const source = fs.readFileSync(postPath, 'utf8');
const before = source.indexOf(start);
const after = source.indexOf(end);
if (before < 0 || after < 0 || after < before) throw new Error('Gallery markers not found in post');
const updated = source.slice(0, before + start.length) + '\n\n' + gallery + '\n\n' + source.slice(after);
fs.writeFileSync(postPath, updated);

console.log(`Generated ${allItems.length} SVG teaching figures and refreshed the gallery.`);
