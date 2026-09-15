---
title: Mathematical Modeling 12 - Time Series Foundations
date: 2026-09-14 20:00:05
categories: Mathematical Modeling
tags:
  - Time Series
  - Data Preprocessing
  - Stationarity
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "Time indexing, missingness, decomposition, stationarity, autocorrelation, and leakage-safe preprocessing before any forecast is fitted."
---

Time-series observations are ordered and dependent. Randomly shuffling them destroys the structure we want to learn and can leak future information into the past.

## Components and sampling

A series may contain trend $T_t$, seasonality $S_t$, cycles $C_t$, and irregular variation $\varepsilon_t$. Additive decomposition uses

$$
y_t=T_t+S_t+C_t+\varepsilon_t,
$$

while multiplicative structure is appropriate when seasonal amplitude scales with level.

Record timestamp convention, timezone, sampling frequency, aggregation rule, and measurement unit. An hourly average and an hourly total answer different questions.

## Audit the time index

Before modeling:

- sort timestamps and resolve duplicates;
- detect missing timestamps, not only missing cells;
- determine whether intervals are regular;
- align multiple data sources without looking ahead;
- mark policy changes, outages, promotions, and sensor replacements.

Pandas provides dedicated time indexes, date ranges, periods, resampling, and timezone operations ([official time-series guide](https://pandas.pydata.org/docs/user_guide/timeseries.html)).

## Missing values and anomalies

Zero is a measurement, not a universal missing-value replacement. Choose a method from the generating mechanism:

- short smooth gaps: interpolation;
- state that persists until updated: forward fill;
- seasonal process: same-season estimate;
- long gaps: model-based imputation or explicit missing indicator;
- impossible values: correct from source or mark missing;
- real shocks: preserve and explain.

Fit imputation rules using training data only. The official pandas guide distinguishes missing sentinels and provides detection and filling operations ([missing-data guide](https://pandas.pydata.org/docs/user_guide/missing_data.html)).

## Transformations

Log or Box–Cox-like transformations can stabilize variance for positive data. Differencing removes level changes:

$$
\nabla y_t=y_t-y_{t-1},qquad
\nabla_s y_t=y_t-y_{t-s}.
$$

Too much differencing amplifies noise and makes forecasts unstable. Apply each transformation for a diagnosed reason and invert it carefully when returning to the original scale.

## Stationarity and dependence

Weak stationarity requires constant mean and variance and autocovariance depending only on lag. Examine rolling statistics and use tests such as ADF and KPSS as complementary evidence, not automatic truth.

The sample autocorrelation at lag $k$ is

$$
\hat\rho_k=\frac{\sum_{t=k+1}^{T}(y_t-\bar y)(y_{t-k}-\bar y)}
{\sum_{t=1}^{T}(y_t-\bar y)^2}.
$$

ACF shows total lag correlation; PACF isolates direct correlation after accounting for shorter lags. Seasonal peaks suggest periodic dependence, while slow decay often indicates trend or nonstationarity.

## Split by time

Use training, validation, and test intervals in chronological order. Rolling-origin evaluation repeatedly trains on the past and evaluates the next horizon. Match the evaluation horizon to the decision: a one-day forecast test does not validate a quarterly planning model.

## Baselines and metrics

Always include naive $\hat y_{t+h}=y_t$, seasonal-naive $\hat y_{t+h}=y_{t+h-s}$, and perhaps a moving-average baseline. Use MAE or RMSE according to loss; use MASE for comparability; treat MAPE carefully near zero.

Inspect residuals over time and by season. Forecast errors should not retain predictable structure. A model that beats no baseline or leaves strong autocorrelation is not finished.

## A leakage-safe starting notebook

```python
import pandas as pd

df = pd.read_csv("series.csv", parse_dates=["date"])
df = df.sort_values("date").drop_duplicates("date", keep="last")
series = df.set_index("date")["value"].asfreq("D")

split = "2026-07-01"
train = series.loc[:split].copy()
test = series.loc[split:].iloc[1:].copy()

# Learn or justify missing-data treatment from the training period.
train = train.interpolate(limit=2)
season = 7
seasonal_naive = pd.Series(
    [train.iloc[-season + (i % season)] for i in range(len(test))],
    index=test.index,
)
mae = (test - seasonal_naive).abs().mean()
print(mae)
```

The exact boundary convention matters: no timestamp should appear in both sets. For long-horizon rolling validation, rebuild the forecast at each origin using only information available at that origin.
