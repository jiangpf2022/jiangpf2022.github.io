---
title: Mathematical Modeling 14 - Data Foundations
date: 2026-09-14 19:59:05
categories: Mathematical Modeling
tags:
  - Data Cleaning
  - Exploratory Analysis
  - Interpolation
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A beginner-friendly pipeline for understanding, cleaning, transforming, visualizing, and interpolating competition data before modeling."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **turning raw observations into an analysis table without erasing their meaning**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **A clinical variable is often absent for healthier patients.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

Most datasets are not immediately model-ready. They contain ambiguous fields, mixed units, duplicates, missing records, extreme observations, and sampling choices that can change the conclusion. Data preparation is therefore part of the mathematical argument.

## Identify the observational unit

First ask what one row represents: a person, city, city-year, transaction, sensor-time, or experimental run. Then classify the dataset:

- **cross-sectional:** many objects measured at one time;
- **time series:** one object observed across time;
- **panel:** many objects across time;
- **spatial:** observations connected by location, distance, or adjacency.

This decision controls splitting, visualization, and valid assumptions. Random train/test splitting may be reasonable for independent rows but invalid for time series or grouped panel data.

Create a data dictionary with field name, definition, unit, type, valid range, missing code, and source. If a variable's meaning is unknown, it is not ready to enter a model.

## Audit the raw table

Compute table shape, data types, unique counts, missing rates, minima, maxima, means, medians, and quantiles. Then investigate:

- impossible values such as negative age or percentages above 100%;
- dates outside the study period;
- duplicate primary keys;
- inconsistent spellings and category labels;
- totals mixed with per-capita quantities;
- currencies or physical units that change across rows.

Keep an audit log: issue, detection rule, number of affected rows, action, and reason. Never silently delete observations.

## Missingness is a mechanism

Let $M_j=1$ indicate that variable $j$ is missing. Three useful concepts are:

- **MCAR:** missingness is unrelated to observed and unobserved values;
- **MAR:** missingness depends on observed variables;
- **MNAR:** missingness depends on the missing value itself.

Mean imputation is simple but reduces variance and weakens relationships. Median imputation is more robust for skewed variables. Groupwise imputation can respect regions, years, or product types. Model-based imputation uses other fields but can introduce model bias.

For ordered data, interpolation may be appropriate. Always add a missingness indicator when the fact of being missing could be informative. Fit imputation rules on training data only.

## Errors versus real extremes

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/data-outlier-diagnosis.svg" alt="Ordinary observations and one extreme point requiring diagnosis" loading="lazy">
  <figcaption>An extreme value is a question, not a deletion command. Trace its mechanism before deciding how it enters the model.</figcaption>
</figure>

An outlier can be a data error, a rare but genuine event, or evidence of a missing subgroup. The interquartile rule flags candidates outside

$$
[Q_1-1.5\,IQR,\;Q_3+1.5\,IQR],\qquad IQR=Q_3-Q_1.
$$

It does not prove those observations are wrong. Compare robust statistics such as median and median absolute deviation,

$$
MAD=\operatorname{median}_i|x_i-\operatorname{median}(x)|.
$$

Possible actions are source correction, deletion with justification, winsorization, transformation, robust modeling, or separate analysis. Preserve shocks that the model is supposed to explain.

## Direction, scale, and encoding

Convert units before comparison. Use rates or per-capita quantities when object size would otherwise dominate. For features on incompatible scales, standardize

$$
z_{ij}=\frac{x_{ij}-\bar x_j}{s_j}
$$

or normalize to $[0,1]$. Standardization is important for PCA, clustering, distance models, and regularization. Min–max normalization is sensitive to extremes.

For evaluation, convert indicators to a common “larger is better” direction. Cost indicators can be reversed; target and interval indicators require a score based on distance from an acceptable target or interval.

Encode unordered categories with one-hot variables. Do not encode city names as 1, 2, 3: that invents an order and distance. Ordered ratings may use an ordinal encoding if equal spacing is defensible.

## Explore before choosing a model

Exploratory data analysis should answer specific questions:

- histogram, ECDF, and box plot: what is the distribution?
- grouped summaries: how do populations differ?
- scatter plot: linear, curved, saturated, or segmented relationship?
- correlation heatmap: redundant variables or candidate associations?
- line plot: trend, seasonality, break, or anomalous interval?
- map: spatial clusters or boundary effects?

Pearson correlation measures linear association; Spearman measures monotone rank association. Neither proves causality. A high correlation may result from a common trend or hidden group.

## Interpolation is not regression

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/data-interpolation.svg" alt="Linear and spline interpolation through the same observations" loading="lazy">
  <figcaption>Both curves honor observed knots but make different between-point assumptions; neither justifies careless extrapolation.</figcaption>
</figure>

Interpolation reconstructs values *between* known points and normally passes through those points. Fitting estimates an overall noisy relationship.

Linear interpolation between $(x_i,y_i)$ and $(x_{i+1},y_{i+1})$ is

$$
\hat y(x)=y_i+\frac{y_{i+1}-y_i}{x_{i+1}-x_i}(x-x_i).
$$

It is local and stable but has slope discontinuities. A global Lagrange polynomial passes through every point but can oscillate badly at high order. Newton form is easier to extend with new points. Cubic splines use low-degree polynomials on adjacent intervals and enforce smooth derivatives, making them effective for trajectories and smooth sensors.

Interpolation outside the observed range becomes extrapolation and is far less reliable. If observations are noisy, a smoothing spline or fitted mechanism may be better than a curve forced through every point.

## A reproducible preprocessing pipeline

<figure class="mm-figure">
  <img src="/blog/images/mathematical-modeling/data-leakage-pipeline.svg" alt="Leakage safe split, fit, transform, and evaluate sequence" loading="lazy">
  <figcaption>Imputers, scalers, encoders, and feature selectors are fitted on training data and only applied to the evaluation fold.</figcaption>
</figure>

Use a fixed order:

$$
\text{types}\rightarrow\text{duplicates}\rightarrow\text{missingness}
\rightarrow\text{outliers}\rightarrow\text{encoding}\rightarrow\text{scaling}
\rightarrow\text{features}.
$$

Save raw data unchanged, make transformations in code, and record sample counts after every step. Compare key distributions before and after cleaning. The official pandas missing-data guide documents detection and filling behavior, including the distinct missing sentinels used by different data types ([documentation](https://pandas.pydata.org/docs/user_guide/missing_data.html)).

A minimal audit in Python can begin as follows:

```python
import pandas as pd

raw = pd.read_csv("data.csv")
print(raw.shape)
print(raw.dtypes)
print(raw.isna().mean().sort_values(ascending=False))
print(raw.describe(include="all").T)

# Example rules must come from the data dictionary.
clean = raw.drop_duplicates(subset=["object_id", "date"]).copy()
clean["date"] = pd.to_datetime(clean["date"], errors="coerce")
clean["income"] = clean.groupby("region")["income"].transform(
    lambda s: s.fillna(s.median())
)
```

This is only a scaffold. Each line needs a written justification, and the data lost or changed by that line should be counted.

### Beginner exercise

Take one dataset and produce: a data dictionary, audit table, missingness plot, before/after distribution comparison, and one paragraph explaining which cleaning decision could most affect the final conclusion.

## Guided workshop: probability, sampling, and spatial data

Before using a sample, define the population and the mechanism that produced the rows. Convenience samples, voluntary responses, sensor coverage, and survivorship can create bias that no downstream algorithm removes. Randomness in a probability model is not proof that the data were randomly sampled.

### Build probability intuition

For events $A$ and $B$,

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},
\qquad
P(A)=\sum_b P(A\mid B=b)P(B=b).
$$

Bayes' rule reverses conditioning. If a rare defect has prevalence 1%, a test with 95% sensitivity and 95% specificity still produces many false positives. Always combine test accuracy with base rate before interpreting a positive result.

Expectation is a probability-weighted average, variance measures squared deviation, and covariance measures joint movement. Correlation is standardized covariance but does not capture every nonlinear dependence and does not imply causality. Plot joint distributions and identify repeated-measure or clustered structure.

### Quantify sampling uncertainty

The sample mean has standard error approximately $s/\sqrt n$ under independent sampling. More rows do not correct systematic bias, and correlated rows provide less information than independent rows. Bootstrap by resampling the observational unit: residents, hospitals, days, or regions—not arbitrary rows created from the same unit.

Stratified sampling ensures representation of important groups. Cluster sampling may be practical but increases dependence. Weight estimates when sampling probabilities differ. Report both raw sample size and effective design.

### Use interpolation according to geometry

One-dimensional linear interpolation is appropriate between nearby ordered observations when abrupt curvature is unlikely. Cubic splines are smoother but may overshoot. Spatial inverse-distance weighting assumes nearby points are more similar; kriging adds a covariance model and returns uncertainty. Never interpolate across a physical barrier or long unsupported gap without justification.

Cross-validation for spatial interpolation must hold out spatial regions, not random neighboring points, or it will be optimistic. Plot distance to nearest observation and flag extrapolation beyond the observed domain.

### Handle geospatial coordinates correctly

Latitude and longitude are angles. Project to a suitable coordinate reference system before treating them as planar distances over a city or region. Great-circle distance is appropriate on larger domains. Spatial autocorrelation means ordinary random train/test splits can leak local information. Use spatial blocks and inspect residual maps.

### Use Monte Carlo for derived uncertainty

If output $Y=g(X_1,\ldots,X_p)$ depends on uncertain inputs, sample coherent input vectors, compute $Y$, and summarize its distribution. Preserve bounds and dependence. Convergence should be assessed for the statistic used in the decision—mean, 95th percentile, or failure probability.

For rare failure probability $p$, the standard error of the simple estimate is roughly $\sqrt{p(1-p)/N}$. If $p$ is extremely small, naive Monte Carlo may need too many samples; importance sampling or analytical bounds may be required.

### Practice

Choose a dataset with time, location, and repeated observations. Define population, observational unit, sampling mechanism, and dependence. Create a data dictionary; map missingness; compare random, temporal, and spatial splits; bootstrap at the correct unit; and run a Monte Carlo propagation for one uncertain derived quantity. Explain how each design choice changes the conclusion.

## Full preprocessing decision tree

The 111-page course sequence can be reduced to one rule: every operation must name the defect it repairs and the information it is allowed to use.

1. **Audit structure:** shape, types, units, keys, duplicates, ranges, time order, coordinate system, and source provenance.
2. **Classify missingness:** impossible-by-design, not collected, failed measurement, censored, or truly unknown.
3. **Classify extremes:** impossible error, rare valid event, regime shift, or target signal.
4. **Transform:** direction, scale, skewness, category encoding, and interaction terms according to the downstream geometry.
5. **Split:** by time, group, or space before learning imputation, scaling, feature selection, or interpolation parameters.
6. **Document impact:** compare sample size, distribution, and model conclusions before and after processing.

For missing $x$, deletion is defensible only when missingness and sample loss are understood. Mean/median imputation shrinks variance; forward fill assumes persistence; interpolation assumes local continuity; KNN and model imputation borrow relationships and may amplify model bias. Preserve a missingness indicator when the absence itself is informative.

For an ordered criterion $x$, min–max normalization is

$$z_i=\frac{x_i-\min x}{\max x-\min x}$$

for a benefit and $z_i=(\max x-x_i)/(\max x-\min x)$ for a cost. Interval and target criteria require distance from the desired range or target. Fit extrema on the training set for prediction; otherwise future observations leak into the scale.

## Interpolation and fitting examples

Lagrange interpolation passes through all $n+1$ points but high degree can oscillate. Newton's divided-difference form updates more conveniently. Piecewise cubic splines trade exactness for local stability. Use spatial inverse-distance weighting or kriging when distance and spatial covariance matter; do not flatten latitude/longitude into an ordinary index.

Interpolation estimates a missing response at a location inside the observed domain. Regression estimates a conditional relationship under noise. For polynomial fitting,

$$\hat\beta=\arg\min_\beta\sum_i(y_i-\beta_0-\beta_1x_i-\cdots-\beta_dx_i^d)^2.$$

Select degree by validation and residual structure, not by in-sample $R^2$. Nonlinear least squares requires initial values and may have local minima.

## Probability and spatial example

Suppose air-quality sensors are clustered near roads. A simple citywide mean estimates the sampled-location average, not population exposure. Define a spatial population, weight cells by residents, and validate by leaving out regions rather than random rows. For a derived exposure-risk estimate $g(X)$, sample uncertain calibration, interpolation, and population weights jointly; the resulting distribution includes more uncertainty than a regression standard error alone.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **turning raw observations into an analysis table without erasing their meaning**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Missing measurements

**Here is the problem.** A clinical variable is often absent for healthier patients. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Map the missingness mechanism, add indicators where meaningful, and compare complete-case and imputed analyses. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Imputation cannot recreate information that was never collected and must be fitted inside each training fold. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Extreme values

**Here is the problem.** A city-energy dataset contains a few enormous readings. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Trace records to the source, distinguish unit errors from real peaks, and compare robust and conventional summaries. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Deleting points by a fixed z-score can remove precisely the rare demand the model must handle. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Spatial interpolation

**Here is the problem.** Pollution is observed at irregular monitoring stations. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Respect coordinates, compare inverse-distance and kriging-style assumptions, and validate by holding out stations. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A visually smooth surface can still be poorly calibrated far from sensors. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Sampling uncertainty

**Here is the problem.** A survey estimates a proportion from a finite and clustered sample. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Define the observational unit, sampling frame, weights, and interval before comparing groups. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** More rows do not guarantee more independent information when observations are clustered. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: observational unit

Let us slow down at **observational unit**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats observational unit as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning raw observations into an analysis table without erasing their meaning. Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use observational unit to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: data dictionary

Let us slow down at **data dictionary**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats data dictionary as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning raw observations into an analysis table without erasing their meaning. Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use data dictionary to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: missingness mechanism

Let us slow down at **missingness mechanism**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats missingness mechanism as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning raw observations into an analysis table without erasing their meaning. Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use missingness mechanism to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: outlier diagnosis

Let us slow down at **outlier diagnosis**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats outlier diagnosis as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning raw observations into an analysis table without erasing their meaning. Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use outlier diagnosis to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: scaling and encoding

Let us slow down at **scaling and encoding**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats scaling and encoding as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning raw observations into an analysis table without erasing their meaning. Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use scaling and encoding to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: pipeline leakage

Let us slow down at **pipeline leakage**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats pipeline leakage as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: turning raw observations into an analysis table without erasing their meaning. Preprocessing choices encode assumptions about why data are missing, extreme, duplicated, or measured on different scales. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use pipeline leakage to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Missing measurements

Let us revisit **Missing measurements**, but this time you are doing the talking. The situation is still this: A clinical variable is often absent for healthier patients. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Map the missingness mechanism, add indicators where meaningful, and compare complete-case and imputed analyses. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Imputation cannot recreate information that was never collected and must be fitted inside each training fold. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Missing measurements in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Extreme values

Let us revisit **Extreme values**, but this time you are doing the talking. The situation is still this: A city-energy dataset contains a few enormous readings. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Trace records to the source, distinguish unit errors from real peaks, and compare robust and conventional summaries. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Deleting points by a fixed z-score can remove precisely the rare demand the model must handle. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Extreme values in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Spatial interpolation

Let us revisit **Spatial interpolation**, but this time you are doing the talking. The situation is still this: Pollution is observed at irregular monitoring stations. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Respect coordinates, compare inverse-distance and kriging-style assumptions, and validate by holding out stations. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A visually smooth surface can still be poorly calibrated far from sensors. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Spatial interpolation in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Sampling uncertainty

Let us revisit **Sampling uncertainty**, but this time you are doing the talking. The situation is still this: A survey estimates a proportion from a finite and clustered sample. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Define the observational unit, sampling frame, weights, and interval before comparing groups. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: More rows do not guarantee more independent information when observations are clustered. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Sampling uncertainty in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect observational unit to data dictionary

Draw two boxes labeled **observational unit** and **data dictionary**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from observational unit to data dictionary; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning raw observations into an analysis table without erasing their meaning to remain auditable.

### Board exercise 2: connect data dictionary to missingness mechanism

Draw two boxes labeled **data dictionary** and **missingness mechanism**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from data dictionary to missingness mechanism; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning raw observations into an analysis table without erasing their meaning to remain auditable.

### Board exercise 3: connect missingness mechanism to outlier diagnosis

Draw two boxes labeled **missingness mechanism** and **outlier diagnosis**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from missingness mechanism to outlier diagnosis; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning raw observations into an analysis table without erasing their meaning to remain auditable.

### Board exercise 4: connect outlier diagnosis to scaling and encoding

Draw two boxes labeled **outlier diagnosis** and **scaling and encoding**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from outlier diagnosis to scaling and encoding; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning raw observations into an analysis table without erasing their meaning to remain auditable.

### Board exercise 5: connect scaling and encoding to pipeline leakage

Draw two boxes labeled **scaling and encoding** and **pipeline leakage**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from scaling and encoding to pipeline leakage; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning raw observations into an analysis table without erasing their meaning to remain auditable.

### Board exercise 6: connect pipeline leakage to observational unit

Draw two boxes labeled **pipeline leakage** and **observational unit**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from pipeline leakage to observational unit; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind turning raw observations into an analysis table without erasing their meaning to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a preprocessing audit containing a data dictionary, row-count ledger, missingness map, anomaly decisions, fitted transformations, leakage checks, and before-after distributions. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute data lab

Create a data dictionary and automated audit; implement three missing-value strategies within a split-safe pipeline; compare IQR, MAD, and domain bounds for extremes; test scaling/encoding choices; and interpolate one missing curve or spatial field with held-out points. Conclude with a processing table listing rule, threshold, rows affected, and downstream effect.
