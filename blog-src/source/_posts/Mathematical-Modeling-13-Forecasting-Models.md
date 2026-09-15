---
title: Mathematical Modeling 13 - Forecasting Models
date: 2026-09-14 20:00:04
categories: Mathematical Modeling
tags:
  - ARIMA
  - Exponential Smoothing
  - Forecast Validation
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 40
excerpt: "A comparative guide to smoothing, ARIMA, seasonal models, volatility, grey forecasting, regressors, and honest forecast evaluation."
---

<!-- teaching-opening:start -->
Welcome—pull up a chair. In this lesson we are going to learn **matching forecasting model families to the temporal structure and decision horizon**. I will not ask you to memorize a finished formula. We will begin with a real question, make a rough prediction, build the smallest model that could answer it, and then challenge the answer together.

Here is our warm-up: **Monthly demand has changing level, trend, and a yearly pattern.** What would you write down first? There is no penalty for an imperfect guess. In fact, making the guess is important, because it gives us something to test when the mathematics arrives. Keep that initial answer in mind; by the end of the lesson you should be able to explain not only what changed, but why.

No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds. So whenever a symbol appears, read it as a sentence about the real system. Whenever a result appears, ask what evidence would make you trust it. And whenever I say “your turn,” pause before continuing—the small act of predicting is where passive reading turns into learning. 🌞
<!-- teaching-opening:end -->

Forecasting is model comparison under a time-respecting protocol. Start with a baseline, add structure that is visible and defensible, and keep the simplest model whose out-of-sample behavior supports the decision.

## Smoothing models

A moving average reduces short-term variation but delays changes. Simple exponential smoothing updates level by

$$
\ell_t=\alpha y_t+(1-\alpha)\ell_{t-1}.
$$

Holt's method adds trend; Holt–Winters adds seasonality. These models are strong when the series is driven by evolving level, trend, and seasonal components rather than rich lag interactions.

## ARIMA

An ARMA model for a stationary series combines autoregression and moving-average errors:

$$
y_t=c+\sum_{i=1}^{p}\phi_i y_{t-i}
+\varepsilon_t+\sum_{j=1}^{q}\theta_j\varepsilon_{t-j}.
$$

ARIMA$(p,d,q)$ applies this model after $d$ differences. Use ACF/PACF as diagnostic clues, then compare candidate orders using time-based validation and information criteria. Residuals should resemble uncorrelated noise.

Seasonal ARIMA adds seasonal orders $(P,D,Q)_s$. Exogenous predictors create ARIMAX/SARIMAX, but future values of those predictors must be known or forecast separately.

Statsmodels provides state-space forecasting workflows for SARIMAX and related models, including forecast intervals and recursive updates ([official forecasting example](https://www.statsmodels.org/dev/examples/notebooks/generated/statespace_forecasting.html)).

A minimal ARIMA fit looks like this:

```python
from statsmodels.tsa.arima.model import ARIMA

model = ARIMA(train, order=(1, 1, 1))
fit = model.fit()
forecast = fit.get_forecast(steps=len(test))
mean = forecast.predicted_mean
interval = forecast.conf_int(alpha=0.05)
```

This code is not a model-selection procedure. Inspect the original series, justify differencing, compare several small orders using rolling validation, diagnose residual autocorrelation, and compare against naive and seasonal-naive forecasts.

## Volatility models

Financial returns may have weak mean predictability but clustered variance. A GARCH$(1,1)$ model uses

$$
\sigma_t^2=\omega+\alpha\varepsilon_{t-1}^2+\beta\sigma_{t-1}^2.
$$

Its target is conditional volatility, not price direction. Verify that variance persistence and residual diagnostics support the model.

## Grey forecasting

GM$(1,1)$ is designed for small, smooth, approximately exponential sequences. After accumulated generation,

$$
x^{(1)}(k)=\sum_{i=1}^{k}x^{(0)}(i),
$$

it fits a first-order whitening equation. The accumulation suppresses noise but also imposes strong structure. Use it as a compact baseline for short, monotone series—not as a default for seasonal or highly volatile data.

## Regression and machine learning

Convert forecasting into supervised learning using lag features, rolling summaries, calendar indicators, and known external variables:

$$
\hat y_{t+h}=f(y_t,y_{t-1},\ldots,z_t).
$$

Tree ensembles capture nonlinear interactions. Neural sequence models may help with large, related datasets, but add tuning cost and leakage risks. Feature values must be available at forecast time.

## Multi-step strategies

- **recursive:** predict one step and feed predictions forward;
- **direct:** fit a model for each horizon;
- **multi-output:** predict all horizons jointly.

Recursive forecasting accumulates error; direct forecasting uses fewer effective samples per horizon. Choose according to horizon and data volume.

## Intervals and model risk

A point forecast hides uncertainty. Produce prediction intervals and check empirical coverage on rolling test windows. Intervals should account for observation noise, parameter uncertainty, and—when relevant—uncertain future regressors.

Compare models by horizon, season, and operating regime. A model may be best at one day and poor at one month. The final forecast model is the one that supports the downstream decision under realistic data availability, not the one with the most elaborate name.

### Beginner comparison table

For each candidate, record preprocessing, required history, required future covariates, fitted parameters, rolling MAE/RMSE, interval coverage, runtime, and failure modes. A forecasting section is complete only when a reader can see why the chosen model is preferable for the stated horizon.

## Guided workshop: build a forecasting tournament

Use monthly product demand as a running example. The series has five years of history, annual seasonality, promotions, and occasional stockouts. The business needs forecasts for the next three months. A model tournament compares candidates under exactly this information pattern.

### Start with baselines

Define naive, seasonal-naive, mean, drift, and moving-average forecasts. The seasonal-naive forecast $\hat y_{t+h}=y_{t+h-12}$ is often difficult to beat for strongly seasonal monthly data. If a sophisticated model wins only against the mean, the comparison is incomplete.

### Understand exponential smoothing

Simple exponential smoothing updates level:

$$
\ell_t=\alpha y_t+(1-\alpha)\ell_{t-1},
\qquad
\hat y_{t+h|t}=\ell_t.
$$

$\alpha$ near one reacts quickly; near zero smooths strongly. Holt adds trend; damped Holt prevents indefinite linear growth; Holt–Winters adds seasonality. Estimate smoothing parameters by minimizing one-step errors or likelihood rather than choosing them from visual smoothness.

### Read ARIMA notation

ARIMA$(p,d,q)$ applies $d$ differences and models the remainder with $p$ autoregressive lags and $q$ lagged shocks. SARIMA adds seasonal orders $(P,D,Q)_s$. ACF/PACF patterns can suggest orders, but information criteria and rolling validation decide among plausible candidates. After fitting, residuals should have near-zero mean, stable variance, and no material autocorrelation; a Ljung–Box test supports but does not replace the residual plots.

### Treat interventions and external variables honestly

Promotion, price, weather, and holidays can enter dynamic regression. Future values must be known or separately forecast. Stockouts censor demand: observed sales are less than latent demand, so a model trained on sales may learn artificial low demand. Add availability indicators, reconstruct censored demand when defensible, or state the limitation.

Structural breaks require intervention variables, shorter training windows, time-varying parameters, or regime models. Do not hide a pandemic or policy change inside a generic outlier-cleaning rule.

### Generate intervals

Intervals should widen with horizon. Analytic state-space models can propagate uncertainty; bootstrap methods resample suitable residual blocks; quantile regression directly predicts conditional quantiles. Evaluate empirical coverage and average width together. A 95% interval that covers 100% because it is enormous is not automatically useful.

### Compare over rolling origins

For each origin, fit using only available history and forecast horizons 1–3. Store every prediction, not only aggregate scores. Report MAE, RMSE, MASE, bias, and interval coverage by horizon. Use a loss function aligned with decisions: underprediction may be more costly than overprediction in capacity planning.

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

model = SARIMAX(
    train,
    order=(1, 1, 1),
    seasonal_order=(1, 1, 1, 12),
    enforce_stationarity=False,
)
fit = model.fit(disp=False)
forecast = fit.get_forecast(steps=3)
mean = forecast.predicted_mean
interval = forecast.conf_int(alpha=0.05)
```

This code is a candidate, not a conclusion. The final selection table must compare it with baselines and alternatives over all origins.

### Practice

Run a tournament containing seasonal naive, Holt–Winters, SARIMA, and a tree model with lag/calendar features. Use a common rolling split and report performance by horizon. Inspect residuals, bias, coverage, runtime, and dependence on future covariates. Select a model and write one paragraph explaining when it should be retrained or replaced.

## Model map from the full lecture

<div class="mm-gallery mm-gallery-3">
<figure><img src="/blog/images/mathematical-modeling/timeseries-33.webp" alt="ARIMA order-selection pipeline"><figcaption>Order selection combines differencing, ACF/PACF, information criteria, and residual diagnosis.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/timeseries-37.webp" alt="Volatility clustering"><figcaption>Volatility clustering motivates modeling conditional variance, not only the mean.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/timeseries-49.webp" alt="Rolling-origin validation"><figcaption>Every candidate must forecast the same horizons from the same origins.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/timeseries-50.webp" alt="Forecast interval comparison"><figcaption>Coverage and interval width matter alongside point error.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/timeseries-57.webp" alt="Forecasting workflow"><figcaption>Reliable forecasting is a loop from data audit to decision and back to monitoring.</figcaption></figure>
<figure><img src="/blog/images/mathematical-modeling/timeseries-60.webp" alt="Three forecasting principles"><figcaption>Understand data, beat a baseline, validate by time, and connect predictions to decisions.</figcaption></figure>
</div>

### Exponential smoothing family

Simple exponential smoothing handles a changing level. Holt adds trend; damped Holt prevents indefinite linear growth; Holt–Winters adds additive or multiplicative seasonality. Additive seasonality has roughly constant amplitude; multiplicative seasonality scales with level. State-space implementations provide likelihood-based estimation and intervals.

### ARIMA and SARIMAX

ARIMA$(p,d,q)$ models differenced history with autoregressive and moving-average terms. Seasonal ARIMA adds $(P,D,Q)_s$. SARIMAX includes external predictors, but future values of those predictors must actually be known or separately forecast. Select a small candidate set using ACF/PACF and AIC/BIC, then decide with rolling performance and residual white-noise checks.

### ARCH/GARCH

When residual magnitude clusters, model conditional variance:

$$\sigma_t^2=\omega+\alpha\varepsilon_{t-1}^2+\beta\sigma_{t-1}^2.$$

GARCH answers risk and interval questions that a mean forecast misses. Check positivity and persistence $\alpha+\beta$; values near one imply slow volatility decay.

### Grey, Markov, and VAR models

GM(1,1) is designed for very short, smooth positive series: accumulate data, fit a first-order response, and inverse-accumulate predictions. Test level-ratio conditions and compare with naive forecasts; small sample size is not evidence of validity.

A Markov chain models discrete state transitions $P_{ij}=P(S_{t+1}=j\mid S_t=i)$. It is useful for regimes, ratings, or weather states when the state definition is meaningful. VAR models multiple endogenous series,

$$y_t=c+A_1y_{t-1}+\cdots+A_py_{t-p}+\varepsilon_t,$$

and supports impulse responses, but parameter count grows as $K^2p$ and stationarity/cointegration must be addressed.

### Regression, trees, and neural models

Supervised models need lag features, rolling statistics, calendar variables, and known external factors. Trees capture nonlinear interactions; SVR works on medium data; neural sequence models demand more data and stronger baselines. Fit feature transformations inside each rolling fold. Direct multi-horizon models avoid recursive error accumulation; recursive models are cheaper; multi-output models exploit cross-horizon structure.

## Two complete decision cases

For sales-to-inventory, forecast demand distribution, not just the mean. If ordering $q_t$, demand $D_t$, holding cost $h$, and shortage cost $p$, the forecast enters

$$\min_q\ E[h(q-D)^++p(D-q)^+].$$

Evaluate final inventory cost as well as MAE. For investment series, forecast expected return and conditional covariance, then feed both into a mean–variance or robust allocation. Backtest with transaction costs and rolling re-estimation; a lower price RMSE does not guarantee a better portfolio.



<!-- teaching-expansion:start -->
## Let’s teach this as a full lesson

Today we are learning **matching forecasting model families to the temporal structure and decision horizon**. I want you to imagine that we are working at the same desk: I will ask you to make a prediction before showing the machinery, we will solve a small version by hand, and only then will we let code or a solver scale the idea. No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds.

There are two ways to read this section. On a first pass, follow the story and answer every “pause and think” question verbally. On a second pass, reproduce the equations, figures, or code and change one assumption. If you only recognize the final formula, you have seen the method; if you can predict how its answer changes, you understand it.

### Classroom case 1: Seasonal sales

**Here is the problem.** Monthly demand has changing level, trend, and a yearly pattern. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Compare seasonal naïve, Holt-Winters variants, and SARIMA over rolling origins. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** A sophisticated model must beat the seasonal naïve baseline at the horizons the business actually uses. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 2: Intervention forecasting

**Here is the problem.** A price change or policy shock alters the level of a series. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Represent the intervention explicitly, use only known-future covariates, and test parameter stability. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Without intervention terms, the model may mistake a structural break for persistent noise. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 3: Volatility

**Here is the problem.** Returns have little mean predictability but clusters of large and small variation. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Model the conditional mean separately from GARCH-style conditional variance and check standardized residuals. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Good variance forecasts are evaluated by calibration and risk coverage, not mean RMSE alone. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

### Classroom case 4: Sparse data

**Here is the problem.** A short sequence must support a near-term forecast. Do not rush to an algorithm. First say, in ordinary language, what a successful answer would let someone decide. Then list what is observed, what is unknown, and what is under our control. This thirty-second pause prevents us from turning a convenient column into the wrong target.

> **Pause and think.** If you had to give a defensible rough answer in five minutes, what would you calculate first? Which assumption would make that baseline possible, and what observation would make you stop trusting it?

**Let us build it together.** Compare grey forecasting, simple smoothing, and conservative intervals while acknowledging weak identifiability. Write every quantity with a unit and attach each equation or algorithmic step to one sentence in the problem. Before fitting or solving anything, construct one tiny hand-checkable instance. On that instance, predict the direction of the answer. If the code moves in the opposite direction, debug the model before adding complexity.

The next move is to establish a baseline. The baseline is not included because we expect it to win; it tells us how much value the main method actually creates. Keep the same data split, constraints, random budget, and metric for both. Otherwise we are comparing experimental conditions rather than models.

**Now read the result.** Small samples reward restraint; a flexible model can fit history while making unstable forecasts. Translate the mathematical output back into the nouns and verbs of the original question. State the decision, the evidence supporting it, and the range over which it remains stable. A reader should not need to decode a parameter vector to understand the recommendation.

**How could this answer fool us?** Check unit conversions, sign conventions, unavailable future information, accidental reuse of validation data, and constraints that are satisfied in code but not in reality. Perturb one important input in both directions and explain the response before looking at the plot. This turns sensitivity analysis into a reasoning test instead of a decorative appendix.

**Your turn.** Change one assumption, one data value, and one evaluation criterion. Predict which part of the result should change and which part should remain invariant. Then run or derive the variation and write two sentences explaining any disagreement with your prediction. That disagreement is often where the real lesson is hiding.

## Slow-motion concept clinics

The cases give us motion; the following clinics give us control. Each clinic revisits one idea from a different angle so that it becomes something you can use in a new problem rather than a definition you can only repeat.

### Concept clinic 1: baseline ladder

Let us slow down at **baseline ladder**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats baseline ladder as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: matching forecasting model families to the temporal structure and decision horizon. No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use baseline ladder to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 2: smoothing state

Let us slow down at **smoothing state**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats smoothing state as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: matching forecasting model families to the temporal structure and decision horizon. No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use smoothing state to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 3: ARIMA orders

Let us slow down at **ARIMA orders**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats ARIMA orders as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: matching forecasting model families to the temporal structure and decision horizon. No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use ARIMA orders to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 4: exogenous variables

Let us slow down at **exogenous variables**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats exogenous variables as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: matching forecasting model families to the temporal structure and decision horizon. No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use exogenous variables to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 5: prediction intervals

Let us slow down at **prediction intervals**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats prediction intervals as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: matching forecasting model families to the temporal structure and decision horizon. No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use prediction intervals to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

### Concept clinic 6: rolling tournament

Let us slow down at **rolling tournament**, because this is a place where a short formula can hide a long modeling decision. Ask four questions: What does this object mean in the real system? What information is required to construct it? Which assumption makes the construction legitimate? What observable symptom would tell us the assumption failed?

A beginner often treats rolling tournament as a box to tick. In a strong solution it acts as an interface between reasoning and evidence. Explain it once without notation, once with notation or an algorithm, and once through a concrete diagnostic. Those three descriptions should agree. If they do not, the notation may be correct while the story is not.

Connect it to today’s central goal: matching forecasting model families to the temporal structure and decision horizon. No model is universally best; a fair tournament asks which assumptions earn predictive value on future-like folds. The practical check is to remove or perturb this component and observe which claim changes. If nothing changes, it may be unnecessary. If everything changes unpredictably, the model depends on it more strongly than the paper currently admits.

When writing, avoid “we use rolling tournament to improve the model.” Say exactly what enters, what operation occurs, what leaves, and which metric or constraint it affects. Then report a value, plot, residual, comparison, or theorem that lets the reader verify the claim.

## Guided practice with full answers

We have already seen the ideas once. Now we will circle back, because understanding usually appears on the second encounter. These practices are deliberately conversational: try each prompt before reading the next paragraph, then compare your reasoning with the instructor’s route.

### Guided practice 1: teach back Seasonal sales

Let us revisit **Seasonal sales**, but this time you are doing the talking. The situation is still this: Monthly demand has changing level, trend, and a yearly pattern. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Compare seasonal naïve, Holt-Winters variants, and SARIMA over rolling origins. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: A sophisticated model must beat the seasonal naïve baseline at the horizons the business actually uses. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Seasonal sales in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 2: teach back Intervention forecasting

Let us revisit **Intervention forecasting**, but this time you are doing the talking. The situation is still this: A price change or policy shock alters the level of a series. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Represent the intervention explicitly, use only known-future covariates, and test parameter stability. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Without intervention terms, the model may mistake a structural break for persistent noise. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Intervention forecasting in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 3: teach back Volatility

Let us revisit **Volatility**, but this time you are doing the talking. The situation is still this: Returns have little mean predictability but clusters of large and small variation. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Model the conditional mean separately from GARCH-style conditional variance and check standardized residuals. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Good variance forecasts are evaluated by calibration and risk coverage, not mean RMSE alone. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Volatility in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

### Guided practice 4: teach back Sparse data

Let us revisit **Sparse data**, but this time you are doing the talking. The situation is still this: A short sequence must support a near-term forecast. Cover the solution above and write a four-line problem card containing the decision or target, the data, the hard rules, and the success metric. If one of those lines is missing, you are not ready to calculate yet.

**Question 1 — what is the smallest credible model?** Strip away every feature that is not needed for a first answer. Keep the mechanism represented by this route: Compare grey forecasting, simple smoothing, and conservative intervals while acknowledging weak identifiability. The word *credible* matters. A baseline may be simple, but it cannot violate the central physics, chronology, conservation rule, or decision constraint. State what this baseline deliberately ignores.

**Question 2 — what would you compute by hand?** Create a tiny instance with two or three observations, states, alternatives, or time steps. Work through it without a library. Record one intermediate value, not just the final answer. That intermediate value becomes an excellent unit test because it isolates the meaning of one step from the rest of the pipeline.

**Question 3 — what deserves a figure?** Do not plot everything produced by the program. Plot the comparison that could change a reader’s belief: observed versus predicted, feasible versus infeasible, baseline versus proposed method, nominal versus stressed scenario, or raw versus transformed data. Label units and write a one-sentence expected pattern before generating the figure.

**Question 4 — what is the answer in ordinary language?** A mathematically correct interpretation is: Small samples reward restraint; a flexible model can fit history while making unstable forecasts. Now add scope. Say where the conclusion is supported, where it is an extrapolation, and which uncertainty is not represented. This is how we prevent a local numerical result from turning into an unlimited claim.

**Instructor’s challenge.** Imagine that the most influential input is wrong by 20%. Predict whether the decision changes smoothly, crosses a threshold, or becomes infeasible. Then test $-20%$, the nominal value, and $+20%$. Three carefully chosen points often teach more than one hundred unexplained simulations. If the response is surprising, inspect the active rule or dominant mechanism rather than immediately blaming the solver.

**Communication drill.** Explain Sparse data in ninety seconds to a teammate: begin with the real question, name the mathematical object only after the question is clear, give one piece of quantitative evidence, and end with one limitation. This short oral version is excellent preparation for writing the abstract and conclusion. It also reveals whether you understand the chain or have only memorized its notation.

## Put the lesson on the board

A modeling pipeline is only as reliable as the information passed between its steps. The following short board exercises make those interfaces explicit and give you practical tests you can reuse in a competition.

### Board exercise 1: connect baseline ladder to smoothing state

Draw two boxes labeled **baseline ladder** and **smoothing state**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from baseline ladder to smoothing state; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind matching forecasting model families to the temporal structure and decision horizon to remain auditable.

### Board exercise 2: connect smoothing state to ARIMA orders

Draw two boxes labeled **smoothing state** and **ARIMA orders**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from smoothing state to ARIMA orders; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind matching forecasting model families to the temporal structure and decision horizon to remain auditable.

### Board exercise 3: connect ARIMA orders to exogenous variables

Draw two boxes labeled **ARIMA orders** and **exogenous variables**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from ARIMA orders to exogenous variables; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind matching forecasting model families to the temporal structure and decision horizon to remain auditable.

### Board exercise 4: connect exogenous variables to prediction intervals

Draw two boxes labeled **exogenous variables** and **prediction intervals**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from exogenous variables to prediction intervals; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind matching forecasting model families to the temporal structure and decision horizon to remain auditable.

### Board exercise 5: connect prediction intervals to rolling tournament

Draw two boxes labeled **prediction intervals** and **rolling tournament**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from prediction intervals to rolling tournament; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind matching forecasting model families to the temporal structure and decision horizon to remain auditable.

### Board exercise 6: connect rolling tournament to baseline ladder

Draw two boxes labeled **rolling tournament** and **baseline ladder**. Put the information produced by the first box on the arrow between them, including units, dimensions, time availability, and uncertainty. This arrow is where many polished-looking solutions quietly break. Ask whether the second box receives exactly what it assumes.

Now make one intentional mistake: change a unit, reverse an index, leak a future observation, omit a constraint, or reuse fitted preprocessing on the full dataset. Predict the symptom. Would you see an impossible value, suspiciously good validation, a rank reversal, a nonconvergent solver, or no obvious warning at all? Write a test that catches the mistake automatically.

Finally, restore the correct pipeline and create one sentence for the paper: “We pass ___ from rolling tournament to baseline ladder; this quantity is constructed using ___ and validated by ___.” Fill every blank with something concrete. That sentence is short, but it forces the architecture behind matching forecasting model families to the temporal structure and decision horizon to remain auditable.

## A real 40-minute teaching route

Use the first five minutes to restate the problem without mathematical vocabulary. Spend the next eight minutes rebuilding the baseline and checking one tiny example by hand. Use twelve minutes for the main method and its assumptions, then eight minutes to interpret the figures and challenge the result with a perturbation. Reserve the final seven minutes for a teach-back: close the article and explain the chain from data to decision in your own words.

Your concrete output is a forecasting report comparing at least three model families and two naïve baselines on identical rolling folds, with horizon-specific errors, calibrated intervals, residual tests, and operational interpretation. It should be understandable to a teammate who has not read this lesson. Include one thing that worked, one failure you diagnosed, and one assumption whose influence you measured. That final reflection is not extra homework; it is the step that converts recognition into transferable modeling skill.
<!-- teaching-expansion:end -->

## Forty-minute forecasting tournament

Run seasonal naive, Holt–Winters, SARIMA, and a tree model on identical rolling origins. Record error by horizon, residual autocorrelation, interval coverage, runtime, and required future covariates. Add GM, Markov, VAR, or GARCH only when the data-generating question requires them. Select the simplest model whose advantage is stable and decision-relevant.
