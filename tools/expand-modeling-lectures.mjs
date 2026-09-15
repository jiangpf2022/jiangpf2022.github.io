import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('source/_posts');

const lessons = {
  '01-From-Reality-to-a-Model': {
    core: 'turning an ambiguous real situation into a small, testable mathematical story',
    why: 'A beautiful calculation cannot rescue a model whose boundary, variables, or question were chosen badly.',
    cases: [
      ['Morning commute', 'A student must choose when to leave when travel time varies from day to day.', 'Define an arrival deadline, model travel time as a distribution, and compare the probability and cost of being late.', 'The best departure time depends on how the student values waiting versus lateness; there is no honest optimum until that trade-off is stated.'],
      ['Yellow traffic light', 'Estimate a safe yellow-light duration for vehicles approaching an intersection.', 'Combine perception-reaction distance with braking distance, keep every quantity in consistent units, and test wet-road and downhill scenarios.', 'A single duration is defensible only for a declared design speed and safety assumptions; sensitivity is part of the answer.'],
      ['Dishwashing energy', 'Estimate how many plates can be washed with one tank of hot water.', 'Draw the energy boundary, separate water heating from heat loss, and convert the energy budget into water and plate throughput.', 'A baseline conservation model gives scale; heat loss and refill behavior become extensions only if they materially change the decision.'],
      ['Two-day journey', 'Use limited observations from a two-day trip to justify that the traveler occupied the same position at the same clock time on both days.', 'Represent position on each day as a continuous function of clock time and apply the intermediate value theorem to their difference.', 'The proof depends on continuity and matching endpoints, not on knowing the exact speed profile.']
    ],
    anchors: ['system boundary', 'units and scale', 'state versus decision variables', 'assumption ledger', 'baseline model', 'falsification test'],
    deliverable: 'a one-page modeling contract containing the decision sentence, boundary diagram, variables with units, baseline equation, assumptions, and one test that could prove the model inadequate'
  },
  '02-Visual-Evidence': {
    core: 'using a figure as evidence rather than decoration',
    why: 'Readers usually meet the figure before they read the surrounding paragraph, so the visual must carry a precise claim on its own.',
    cases: [
      ['Algorithm comparison', 'Three algorithms are tested on twenty instances with different scales.', 'Plot paired or normalized performance, show uncertainty across repeated runs, and include the simplest baseline.', 'A bar chart of raw means hides instance difficulty; a paired distribution reveals consistency and failure cases.'],
      ['Time-series intervention', 'A policy begins halfway through a noisy seasonal series.', 'Mark the intervention, preserve temporal order, show the counterfactual or baseline, and visualize residual uncertainty.', 'The figure should distinguish trend, seasonality, and intervention effect rather than inviting a before-after illusion.'],
      ['Spatial risk map', 'Risk values are measured at irregular locations and interpolated over a city.', 'Display sample locations, state the interpolation rule, use a perceptually ordered color map, and mask unsupported regions.', 'A smooth map is not extra data; uncertainty grows away from observations and must be visible.'],
      ['Model framework', 'A multi-stage paper combines preprocessing, estimation, optimization, and validation.', 'Draw data and decision flow with typed arrows, separate training from evaluation, and label feedback loops.', 'A framework diagram succeeds when a reader can trace one input to one reported conclusion without guessing.']
    ],
    anchors: ['claim-first design', 'chart selection', 'uncertainty encoding', 'color semantics', 'caption writing', 'reproducibility'],
    deliverable: 'a figure set in which every panel has one claim, readable units, an uncertainty statement, a baseline, and a caption that explains what the reader should conclude'
  },
  '03-The-Abstract': {
    core: 'compressing a complete modeling argument into a short, verifiable abstract',
    why: 'The abstract is not a table of contents; it is the smallest version of the paper that still contains the problem, method, evidence, and conclusion.',
    cases: [
      ['Robot localization', 'Sensors have different clocks and biases, and the paper must summarize a four-stage fusion pipeline.', 'State the task, name temporal alignment and filtering at the right resolution, then report accuracy and robustness numerically.', 'Readers should know what was estimated, how it was estimated, and how much it improved before opening the paper.'],
      ['Forecasting demand', 'A team compares seasonal baselines, ARIMA, and gradient boosting.', 'Describe the rolling evaluation, name the winning model, and report error against the baseline.', '“Accurate” is not evidence; a relative error reduction and the evaluation horizon are.'],
      ['Facility location', 'The model chooses depots under capacity and uncertain demand.', 'Mention the optimization class, the uncertainty treatment, the cost reduction, and the stability of selected sites.', 'The abstract must distinguish the decision from the algorithm used to obtain it.'],
      ['Evaluation system', 'Several cities are ranked with subjective and objective weights.', 'Define the evaluation goal, explain how weights are combined, and report sensitivity of ranks.', 'A ranking without robustness is fragile; the abstract should disclose whether small weight changes reverse the conclusion.']
    ],
    anchors: ['problem sentence', 'method resolution', 'quantitative result', 'bounded recommendation', 'keyword choice', 'traceability'],
    deliverable: 'a 180-250 word abstract whose every important claim points to a table, figure, equation, or validation result in the main paper'
  },
  '04-Assumptions-and-Architecture': {
    core: 'designing the interfaces between data, submodels, and decisions before writing code',
    why: 'Most large modeling failures happen between modules: inconsistent clocks, units, coordinate frames, or meanings pass silently from one correct component to another.',
    cases: [
      ['Asynchronous sensors', 'A robot receives position, velocity, and task events from sensors with different clocks.', 'Define a common continuous-time state, estimate time offsets, and document every interpolation and uncertainty source.', 'Alignment is part of the model, not a preprocessing footnote.'],
      ['Spatial bias', 'Two sensors disagree by an offset that may vary slowly over time.', 'Compare no-bias, constant-bias, and drifting-bias hypotheses with residual diagnostics and complexity penalties.', 'Adding a bias state is justified only when it improves held-out behavior rather than merely training fit.'],
      ['Multi-part competition prompt', 'Four questions share data but require prediction, optimization, and policy conclusions.', 'Draw a dependency graph and specify the output contract of each module before implementation.', 'Shared variables and assumptions should have one owner, preventing contradictory definitions across sections.'],
      ['Unit mismatch', 'One file reports milliseconds and centimeters while another reports seconds and meters.', 'Build a data dictionary, convert at ingestion, and enforce dimensional checks at module boundaries.', 'A simple unit test can prevent a thousand-line downstream debugging session.']
    ],
    anchors: ['problem restatement', 'local assumptions', 'notation dictionary', 'module interfaces', 'dependency graph', 'end-to-end trace'],
    deliverable: 'an architecture page with a dependency graph, data dictionary, local assumption table, module input-output contracts, and one traced sample from raw data to conclusion'
  },
  '05-Results-and-Validation': {
    core: 'proving that a model is implemented correctly and useful for the intended decision',
    why: 'A low error on one convenient split is not validation; it is one observation about one experiment.',
    cases: [
      ['Sensor fusion', 'A fused trajectory appears smoother than either raw sensor stream.', 'Separate numerical verification from external validation, compare against raw and simple baselines, and inspect residuals by operating regime.', 'Smoothness alone can hide lag or bias; accuracy and uncertainty calibration must be tested.'],
      ['Demand forecast', 'A forecasting model performs well on a random train-test split.', 'Replace the split with rolling origins, preserve feature availability, and report errors by horizon and season.', 'Temporal leakage can create spectacular but imaginary performance.'],
      ['Optimization policy', 'A schedule reduces simulated cost under nominal demand.', 'Replay the policy across demand scenarios, compare with a feasible baseline, and report constraint violations and regret.', 'A policy that wins only at the estimated mean may be too brittle to deploy.'],
      ['Monte Carlo uncertainty', 'Several uncertain inputs jointly affect a nonlinear output.', 'Specify distributions and dependence, propagate samples, and summarize intervals and tail events rather than only the mean.', 'The output distribution reveals risks hidden by one-at-a-time sensitivity.']
    ],
    anchors: ['verification', 'external validation', 'baseline selection', 'sensitivity design', 'stress testing', 'reproducibility'],
    deliverable: 'a validation matrix listing each claim, its evidence, the baseline, the test split or scenario, the metric, and the failure condition'
  },
  '06-Convex-Optimization': {
    core: 'turning limited resources and competing choices into an optimization model that can be solved and explained',
    why: 'The solver is the last step; the real craft is representing choices, logical rules, costs, and uncertainty without changing their meaning.',
    cases: [
      ['Production planning', 'Choose quantities of products under ingredient limits and possibly integer packaging.', 'Build the LP, solve corner points, then decide whether integrality changes the model.', 'Active constraints explain scarcity and dual values explain which additional resource is worth buying.'],
      ['Student-project assignment', 'Assign each student exactly one project while respecting eligibility and workload.', 'Use binary variables, exact-one constraints, and explicit logical exclusions.', 'The model scales beyond enumeration and every binary inequality should be readable as a sentence.'],
      ['Depot allocation', 'Ship material from capacitated depots to construction sites at minimum ton-kilometers.', 'Start with a transportation LP, then show why movable depots create nonlinear coupling.', 'Model classification depends on which quantities are decisions, not on the appearance of the map.'],
      ['Portfolio risk', 'Choose nonnegative asset weights that reach a target return with minimum variance.', 'Use a convex quadratic objective, inspect covariance conditioning, and trace the efficient frontier.', 'Convexity supplies a global certificate, but out-of-sample validation determines whether the result is useful.']
    ],
    anchors: ['decision variables', 'objective interpretation', 'constraint translation', 'convexity', 'duality', 'solver audit'],
    deliverable: 'a complete optimization notebook that prints the model, verifies every returned constraint independently, compares a baseline, reports active constraints, and performs a parameter sweep'
  },
  '07-Tradeoffs-and-Uncertainty': {
    core: 'making defensible decisions when objectives conflict and the future is not known exactly',
    why: 'Combining everything into one score too early hides value judgments and can make a fragile decision look uniquely correct.',
    cases: [
      ['Production with three goals', 'A factory values profit, emissions, and employment simultaneously.', 'Normalize objectives, explore a Pareto frontier, and compare weighted, goal, and epsilon-constraint formulations.', 'The frontier shows the price of improvement and exposes weights that imply unreasonable trade-offs.'],
      ['Emergency supply', 'Demand is uncertain and shortages are much more costly than surplus.', 'Separate first-stage capacity from recourse allocation and compare expected, worst-case, and risk-aware objectives.', 'The best robust plan buys protection deliberately rather than pretending the forecast is exact.'],
      ['Reservoir operation', 'Water must serve cities, farms, and environmental flow across dry and wet scenarios.', 'Model scenario-dependent releases with common pre-observation decisions and evaluate reliability and regret.', 'A policy is preferable to one static schedule when information arrives over time.'],
      ['Model uncertainty', 'Several plausible parameter distributions fit the available data.', 'Run decisions across models, inspect rank reversals, and identify assumptions that control the recommendation.', 'Uncertainty analysis should reveal which new measurement would be most valuable.']
    ],
    anchors: ['separate objectives', 'normalization', 'Pareto dominance', 'scenario design', 'robust counterpart', 'decision communication'],
    deliverable: 'a decision memo with the Pareto frontier, at least three representative policies, scenario performance, sensitivity to weights, and a recommendation tied to explicit preferences'
  },
  '08-Genetic-Algorithms': {
    core: 'designing an evolutionary search whose representation, operators, and evidence match the problem',
    why: 'A genetic algorithm is not improved by adding biological vocabulary; it improves when variation explores useful feasible structures under a fair evaluation budget.',
    cases: [
      ['Binary knapsack', 'Select valuable items without exceeding capacity.', 'Encode selections as bits, repair or penalize infeasibility, and hand-check crossover and mutation on one chromosome.', 'Fitness must rank feasible quality without accidentally rewarding overweight solutions.'],
      ['Route ordering', 'Find a short tour through all required locations.', 'Use a permutation encoding and order-preserving operators rather than ordinary bit crossover.', 'Representation determines whether children remain valid tours.'],
      ['Parameter calibration', 'Fit continuous model parameters with several local basins.', 'Use real-valued genes, bounded mutation, repeated seeds, and a deterministic local refinement baseline.', 'The distribution of final errors matters more than the best lucky run.'],
      ['Feature selection', 'Choose a compact predictive subset while preserving validation accuracy.', 'Use nested evaluation, penalize subset size, and cache repeated evaluations.', 'Selecting features and scoring them on the same validation set creates adaptive overfitting.']
    ],
    anchors: ['encoding', 'population initialization', 'selection pressure', 'variation operators', 'constraint handling', 'experimental evidence'],
    deliverable: 'a reproducible GA study with pseudocode, valid operators, convergence traces, multiple seeds, an evaluation-budget-matched baseline, and an ablation of at least one mechanism'
  },
  '09-Swarm-and-Annealing': {
    core: 'using population motion, thermal acceptance, and simulation carefully for hard search problems',
    why: 'Metaheuristics are useful only when the neighborhood or motion rule reflects the structure of the decision and their randomness is evaluated honestly.',
    cases: [
      ['Continuous calibration', 'Several interacting parameters must be fitted to a nonlinear simulation.', 'Scale dimensions, set PSO velocity limits, compare global and neighborhood best, and refine the best particle locally.', 'Unscaled coordinates can dominate motion even when they are scientifically unimportant.'],
      ['Discrete schedule', 'Jobs must be ordered to reduce delay under precedence constraints.', 'Define swap and insertion neighborhoods for simulated annealing and reject or repair invalid schedules.', 'Temperature controls acceptance; it cannot compensate for a neighborhood that cannot reach useful schedules.'],
      ['Noisy queue design', 'Choose staffing while performance is estimated by discrete-event simulation.', 'Use common random numbers, replications, warm-up removal, and uncertainty-aware comparison.', 'Optimizing one noisy simulation run selects random luck rather than a policy.'],
      ['Hybrid search', 'A broad search finds good regions but converges slowly near a solution.', 'Combine PSO or annealing with a local solver under one fixed evaluation budget.', 'The hybrid earns its complexity only if repeated paired experiments show a consistent gain.']
    ],
    anchors: ['state representation', 'neighborhood or velocity', 'constraint handling', 'temperature or inertia', 'noise control', 'fair benchmarking'],
    deliverable: 'a search experiment with scaled variables, explicit boundary rules, repeated seeds, confidence intervals, convergence versus evaluations, and a deterministic or random-search baseline'
  },
  '10-Differential-Equations': {
    core: 'deriving change equations from forces, geometry, or conservation before choosing a numerical solver',
    why: 'An ODE is a claim about rates; every term should be traceable to a mechanism and every parameter should have units.',
    cases: [
      ['Pendulum', 'Predict angular motion from gravity and a displaced initial condition.', 'Draw the force balance, derive the nonlinear equation, then compare it with the small-angle approximation.', 'The approximation is useful only over an amplitude range where its phase and period errors are acceptable.'],
      ['Pursuit curve', 'A patrol boat continuously aims at a moving submarine.', 'Write both positions in one frame, convert the aiming rule into velocity components, and integrate with an event for capture.', 'Relative geometry, not memorized formulas, determines the differential equation.'],
      ['Draining hemisphere', 'Find water depth over time as liquid exits through a small opening.', 'Combine Torricelli outflow with the depth-dependent cross-sectional area and separate variables.', 'Conservation relates volume change to discharge; geometry supplies the nonlinear coefficient.'],
      ['Heated rod', 'Describe temperature along a metal rod over time.', 'Apply energy conservation to a short segment, pass to the diffusion PDE, and state boundary and initial conditions.', 'A PDE without boundary conditions is not a complete predictive model.']
    ],
    anchors: ['state definition', 'rate balance', 'initial conditions', 'boundary conditions', 'nondimensionalization', 'numerical verification'],
    deliverable: 'a derivation notebook that includes the physical diagram, units of every term, limiting-case checks, numerical convergence, event handling, and comparison with an analytic or approximate case'
  },
  '11-Populations-and-Compartments': {
    core: 'representing populations as stocks connected by interpretable flows',
    why: 'Compartment equations become easy to remember once every positive and negative term is tied to an arrow in a flow diagram.',
    cases: [
      ['Population growth', 'Compare unlimited exponential growth with growth under a carrying capacity.', 'Derive Malthus and logistic models, fit both, and inspect when density dependence becomes visible.', 'Long-horizon extrapolation exposes the unrealistic assumptions of exponential growth.'],
      ['Product adoption', 'Predict cumulative adoption when innovators and imitation both matter.', 'Derive the Bass diffusion rate from external and internal influence and interpret the adoption peak.', 'Different parameter pairs can fit early data similarly, so uncertainty grows before the peak.'],
      ['Epidemic spread', 'Understand when an outbreak grows and how interventions change final size.', 'Construct SIR flows, derive the initial threshold, and distinguish trajectory fit from causal policy effect.', 'The reproduction threshold is local; final size follows a different implicit relationship.'],
      ['Predator and prey', 'Explain oscillations in two interacting species.', 'Write gain and loss terms, find equilibria, linearize, and compare ideal cycles with damped or forced data.', 'Neutral cycles in the basic model are structurally fragile and should not be overinterpreted.']
    ],
    anchors: ['stocks and flows', 'mass balance', 'thresholds', 'equilibria', 'identifiability', 'observation model'],
    deliverable: 'a compartment study with a flow diagram, conservation check, equilibrium analysis, parameter interpretation, uncertainty intervals, and a held-out trajectory or qualitative validation'
  },
  '12-Time-Series-Foundations': {
    core: 'diagnosing temporal structure and leakage before fitting a forecasting model',
    why: 'Time is not an ordinary column: order, availability, frequency, and revision history determine what a forecast is allowed to know.',
    cases: [
      ['Retail demand', 'Daily sales contain weekends, holidays, promotions, missing days, and stockouts.', 'Build a complete calendar, distinguish zero demand from unavailable stock, and visualize seasonal profiles before modeling.', 'A missing sale and a true zero imply different mechanisms and should not receive the same imputation.'],
      ['Sensor drift', 'A physical sensor slowly drifts and occasionally spikes.', 'Plot raw and differenced signals, use robust anomaly rules, and retain flags rather than silently deleting observations.', 'An outlier can be a device failure or the event the system was built to detect.'],
      ['Economic series', 'A trending monthly indicator appears highly autocorrelated.', 'Compare levels, log differences, and seasonal differences; inspect ACF and rolling statistics.', 'High autocorrelation in levels can come from shared trend rather than stable predictive dynamics.'],
      ['Forecast evaluation', 'A team reports excellent performance from a random split.', 'Rebuild the experiment with rolling origins and ensure every feature existed at prediction time.', 'Chronological evaluation is part of the forecasting model, not an optional reporting choice.']
    ],
    anchors: ['time index audit', 'frequency', 'missingness', 'transformation', 'stationarity', 'rolling validation'],
    deliverable: 'a diagnostic notebook with a complete time index, availability table, raw and transformed plots, decomposition, ACF/PACF, leakage-safe baselines, and rolling-origin metrics by horizon'
  },
  '13-Forecasting-Models': {
    core: 'matching forecasting model families to the temporal structure and decision horizon',
    why: 'No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds.',
    cases: [
      ['Seasonal sales', 'Monthly demand has changing level, trend, and a yearly pattern.', 'Compare seasonal naïve, Holt-Winters variants, and SARIMA over rolling origins.', 'A sophisticated model must beat the seasonal naïve baseline at the horizons the business actually uses.'],
      ['Intervention forecasting', 'A price change or policy shock alters the level of a series.', 'Represent the intervention explicitly, use only known-future covariates, and test parameter stability.', 'Without intervention terms, the model may mistake a structural break for persistent noise.'],
      ['Volatility', 'Returns have little mean predictability but clusters of large and small variation.', 'Model the conditional mean separately from GARCH-style conditional variance and check standardized residuals.', 'Good variance forecasts are evaluated by calibration and risk coverage, not mean RMSE alone.'],
      ['Sparse data', 'A short sequence must support a near-term forecast.', 'Compare grey forecasting, simple smoothing, and conservative intervals while acknowledging weak identifiability.', 'Small samples reward restraint; a flexible model can fit history while making unstable forecasts.']
    ],
    anchors: ['baseline ladder', 'smoothing state', 'ARIMA orders', 'exogenous variables', 'prediction intervals', 'rolling tournament'],
    deliverable: 'a forecasting report comparing at least three model families and two naïve baselines on identical rolling folds, with horizon-specific errors, calibrated intervals, residual tests, and operational interpretation'
  },
  '14-Data-Foundations': {
    core: 'turning raw observations into an analysis table without erasing their meaning',
    why: 'Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales.',
    cases: [
      ['Missing measurements', 'A clinical variable is often absent for healthier patients.', 'Map the missingness mechanism, add indicators where meaningful, and compare complete-case and imputed analyses.', 'Imputation cannot recreate information that was never collected and must be fitted inside each training fold.'],
      ['Extreme values', 'A city-energy dataset contains a few enormous readings.', 'Trace records to the source, distinguish unit errors from real peaks, and compare robust and conventional summaries.', 'Deleting points by a fixed z-score can remove precisely the rare demand the model must handle.'],
      ['Spatial interpolation', 'Pollution is observed at irregular monitoring stations.', 'Respect coordinates, compare inverse-distance and kriging-style assumptions, and validate by holding out stations.', 'A visually smooth surface can still be poorly calibrated far from sensors.'],
      ['Sampling uncertainty', 'A survey estimates a proportion from a finite and clustered sample.', 'Define the observational unit, sampling frame, weights, and interval before comparing groups.', 'More rows do not guarantee more independent information when observations are clustered.']
    ],
    anchors: ['observational unit', 'data dictionary', 'missingness mechanism', 'outlier diagnosis', 'scaling and encoding', 'pipeline leakage'],
    deliverable: 'a preprocessing audit containing a data dictionary, row-count ledger, missingness map, anomaly decisions, fitted transformations, leakage checks, and before-after distributions'
  },
  '15-Regression-and-Inference': {
    core: 'separating association, prediction, and uncertainty in regression models',
    why: 'A coefficient is meaningful only relative to the model, units, conditioning variables, and assumptions that produced it.',
    cases: [
      ['Energy demand', 'Estimate how temperature and occupancy relate to building consumption.', 'Fit a baseline linear model, inspect curvature and heteroscedasticity, add justified interactions, and validate by time block.', 'Temperature’s coefficient is conditional on occupancy and may change across heating and cooling regimes.'],
      ['Binary outcome', 'Predict whether equipment fails during the next week.', 'Use logistic regression, interpret odds and probabilities separately, and evaluate calibration as well as discrimination.', 'A high AUC does not guarantee that a predicted 20% risk occurs about 20% of the time.'],
      ['Multicollinearity', 'Several environmental indicators measure nearly the same latent condition.', 'Inspect correlations and condition numbers, compare ridge and lasso, and focus interpretation on stable combinations.', 'Unstable individual coefficients can coexist with useful predictions.'],
      ['Policy comparison', 'Two groups differ in outcome before and after an intervention.', 'State the causal assumptions, include baseline differences and interactions, and avoid calling an observational coefficient an effect.', 'Regression adjusts for variables in the table; it does not automatically remove unmeasured confounding.']
    ],
    anchors: ['least squares', 'conditional coefficients', 'residual diagnostics', 'hypothesis tests', 'regularization', 'prediction intervals'],
    deliverable: 'a regression analysis with a baseline, coefficient units, diagnostic plots, uncertainty intervals, out-of-sample evaluation, sensitivity to specification, and a clear boundary between association and causation'
  },
  '16-Dimension-Reduction-and-Clustering': {
    core: 'discovering lower-dimensional structure without inventing clusters through preprocessing choices',
    why: 'Unsupervised methods always return a pattern; our job is to test whether that pattern is stable, interpretable, and useful.',
    cases: [
      ['City indicators', 'Dozens of correlated indicators describe economic, social, and environmental conditions.', 'Standardize with purpose, inspect PCA loadings, retain components with several diagnostics, then cluster in the reduced space.', 'Component names come from loading patterns and domain meaning, not from the algorithm.'],
      ['Customer segments', 'Behavioral features mix counts, proportions, and monetary values.', 'Choose transformations and distance deliberately, compare K-means with density or mixture methods, and test stability.', 'A cluster can reflect measurement scale rather than a real customer segment.'],
      ['Non-spherical geometry', 'Points form curved or unequal-density groups.', 'Visualize neighborhoods and compare K-means, hierarchical linkage, DBSCAN, and Gaussian mixtures.', 'K-means optimizes squared distance to centroids and therefore favors compact spherical groups.'],
      ['Feature redundancy', 'Many sensors respond to the same physical factor.', 'Use PCA reconstruction and factor interpretation, then test whether downstream decisions change with dimension.', 'Compression is valuable when it preserves the information needed for the final task.']
    ],
    anchors: ['scaling', 'covariance structure', 'PCA loadings', 'distance geometry', 'cluster validation', 'stability'],
    deliverable: 'an unsupervised report with preprocessing sensitivity, component diagnostics, multiple clustering geometries, stability under resampling, interpretable profiles, and a decision use for each retained group'
  },
  '17-Evaluation-Models': {
    core: 'building a transparent multi-indicator evaluation instead of hiding judgments inside one final score',
    why: 'Rankings look objective even when normalization, weighting, and aggregation choices determine the order.',
    cases: [
      ['City sustainability', 'Rank cities using environmental, economic, and public-service indicators.', 'Define direction and scale, compare AHP, entropy, and CRITIC weights, then test TOPSIS rank stability.', 'The final recommendation should include trade-off profiles, not only ordinal positions.'],
      ['Supplier selection', 'Choose a supplier using cost, reliability, quality, and carbon performance.', 'Separate hard eligibility from scored preferences and invite stakeholders to inspect weight implications.', 'A cheap supplier should not compensate for violating a non-negotiable safety threshold.'],
      ['Enterprise health', 'Evaluate firms when indicators are correlated and measured in different units.', 'Audit redundancy, compare objective weighting with PCA, and test sensitivity to normalization.', 'Objective weights describe variation in the dataset, not moral or strategic importance.'],
      ['Ecological quality', 'Combine water, habitat, biodiversity, and disturbance measures.', 'Use scientifically justified thresholds and compare compensatory with non-compensatory aggregation.', 'A weighted average can hide a catastrophic value in one essential dimension.']
    ],
    anchors: ['decision definition', 'indicator direction', 'normalization', 'weight elicitation', 'aggregation', 'rank robustness'],
    deliverable: 'an evaluation dashboard showing raw indicators, transformations, alternative weights, alternative aggregation rules, rank intervals, and the conditions under which the recommendation changes'
  },
  '18-Competition-Studio': {
    core: 'operating the complete modeling process under time pressure while keeping every claim auditable',
    why: 'Competition performance comes from a coherent minimum-complete pipeline, not from collecting the largest number of algorithms.',
    cases: [
      ['Problem selection', 'A team must choose among prompts with different data, mathematics, and validation opportunities.', 'Score understanding, data access, baseline feasibility, differentiation, and verification risk during the first hours.', 'Choose the problem for which the team can build and test a complete argument, not the one with the most fashionable vocabulary.'],
      ['Pose graph', 'Estimate robot poses from noisy relative measurements on a graph.', 'Define residuals on edges, fix gauge freedom, use sparse nonlinear least squares, and inspect loop-closure residuals.', 'A small objective value is meaningful only after frame conventions, anchors, and residual units are verified.'],
      ['Market simulation', 'Use noisy historical and scenario data to propose a decision policy.', 'Separate prediction from action, compare against simple policies, and evaluate regret and constraint violations.', 'The policy must survive plausible futures rather than merely explain the past.'],
      ['Final audit', 'Ninety minutes remain before submission.', 'Freeze model changes, rerun the paper from a clean environment, trace numbers, inspect captions, and test the PDF.', 'A reproducible modest model beats an impressive result that cannot be regenerated or explained.']
    ],
    anchors: ['prompt translation', 'baseline pipeline', 'team interfaces', 'model ledger', 'evidence trace', 'submission audit'],
    deliverable: 'a complete competition package with a runnable pipeline, model ledger, assumption table, verified figures, sensitivity results, contribution log, and final PDF audit checklist'
  }
};

function caseBlock([title, problem, route, result], index) {
  return `### Classroom case ${index + 1}: ${title}\n\n` +
`**Here is the problem.** ${problem} Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.\n\n` +
`> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?\n\n` +
`**Let us build it together.** ${route} Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.\n\n` +
`The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.\n\n` +
`**Now read the result.** ${result} Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.\n\n` +
`**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.\n\n` +
`**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.\n`;
}

function anchorBlock(anchor, index, meta) {
  return `### Concept clinic ${index + 1}: ${anchor}\n\n` +
`Let us slow down at **${anchor}**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?\n\n` +
`A beginner often treats ${anchor} as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.\n\n` +
`Connect it to today’s central goal: ${meta.core}. ${meta.why} The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.\n\n` +
`When writing, avoid “we use ${anchor} to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.\n`;
}

function casePracticeBlock([title, problem, route, result], index, meta) {
  return `### Guided practice ${index + 1}: teach back ${title}\n\n` +
`Let us revisit **${title}**, but this time you are doing the talking. The situation is still this: ${problem} Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.\n\n` +
`**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: ${route} The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.\n\n` +
`**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.\n\n` +
`**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.\n\n` +
`**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: ${result} Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.\n\n` +
`**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20\%$, the nominal value, and $+20\%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.\n\n` +
`**Communication drill.** Explain ${title} in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.\n`;
}

function anchorPracticeBlock(anchor, index, meta) {
  const neighbor = meta.anchors[(index + 1) % meta.anchors.length];
  return `### Board exercise ${index + 1}: connect ${anchor} to ${neighbor}\n\n` +
`Draw two boxes labeled **${anchor}** and **${neighbor}**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.\n\n` +
`Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.\n\n` +
`Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from ${anchor} to ${neighbor}; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind ${meta.core} to remain auditable.\n`;
}

function expansion(meta) {
  const cases = meta.cases.map(caseBlock).join('\n');
  const anchors = meta.anchors.map((a, i) => anchorBlock(a, i, meta)).join('\n');
  const practices = meta.cases.map((c, i) => casePracticeBlock(c, i, meta)).join('\n');
  const boards = meta.anchors.map((a, i) => anchorPracticeBlock(a, i, meta)).join('\n');
  return `\n<!-- teaching-expansion:start -->\n## Let’s teach this as a full lesson\n\n` +
`Today we are learning **${meta.core}**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. ${meta.why}\n\n` +
`There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.\n\n` +
cases + '\n## Slow-motion concept clinics\n\n' +
`The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.\n\n` +
anchors +
`\n## Guided practice with full answers\n\n` +
`We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.\n\n` +
practices +
`\n## Put the lesson on the board\n\n` +
`A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.\n\n` +
boards +
`\n## A real 40-minute teaching route\n\n` +
`Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.\n\n` +
`Your concrete output is ${meta.deliverable}. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.\n<!-- teaching-expansion:end -->\n`;
}

function opening(meta) {
  const first = meta.cases[0];
  return `\n<!-- teaching-opening:start -->\n` +
`Welcome—pull up a chair. In this lesson we are going to learn **${meta.core}**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.\n\n` +
`Here is our warm-up: **${first[1]}** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.\n\n` +
`${meta.why} So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞\n<!-- teaching-opening:end -->\n`;
}

for (const [suffix, meta] of Object.entries(lessons)) {
  const file = fs.readdirSync(root).find((name) => name.endsWith(`${suffix}.md`));
  if (!file) throw new Error(`Post not found for ${suffix}`);
  const full = path.join(root, file);
  let text = fs.readFileSync(full, 'utf8');
  text = text.replace(/\n<!-- teaching-opening:start -->[\s\S]*?<!-- teaching-opening:end -->\n?/g, '\n');
  text = text.replace(/\n<!-- teaching-expansion:start -->[\s\S]*?<!-- teaching-expansion:end -->\n?/g, '\n');
  const frontmatterEnd = text.indexOf('\n---\n', 4);
  if (frontmatterEnd < 0) throw new Error(`No front matter end in ${file}`);
  text = text.slice(0, frontmatterEnd + 5) + opening(meta) + text.slice(frontmatterEnd + 5);
  const marker = text.lastIndexOf('\n## ');
  if (marker < 0) throw new Error(`No insertion point in ${file}`);
  text = text.slice(0, marker) + expansion(meta) + '\n' + text.slice(marker + 1);
  fs.writeFileSync(full, text);
  console.log(`expanded ${file}`);
}
