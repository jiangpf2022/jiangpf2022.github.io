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
