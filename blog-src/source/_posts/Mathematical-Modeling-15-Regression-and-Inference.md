---
title: Mathematical Modeling 15 - Regression and Inference
date: 2026-09-14 19:59:04
categories: Mathematical Modeling
tags:
  - Least Squares
  - Regression
  - Statistical Inference
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "From least-squares curve fitting to linear and logistic regression, diagnostics, uncertainty, regularization, and honest interpretation."
---

Fitting asks for a compact relationship that approximates noisy observations. Regression adds a probabilistic error model, explanatory variables, and tools for inference or prediction.

## Least-squares fitting

Given observations $(x_i,y_i)$ and a model $f(x;\theta)$, ordinary least squares chooses

$$
\hat\theta=\arg\min_\theta\sum_{i=1}^{n}\bigl[y_i-f(x_i;\theta)\bigr]^2.
$$

The residual is $e_i=y_i-\hat y_i$. Squaring penalizes large errors strongly and corresponds to maximum likelihood under independent Gaussian errors with constant variance.

A high $R^2$ is not enough. Plot residuals against fitted values and predictors. Curvature suggests missing nonlinear structure; a funnel suggests unequal variance; time patterns suggest dependence; isolated large residuals require investigation.

## Linear regression from zero

With $p$ predictors,

$$
y=X\beta+\varepsilon,
$$

where rows of $X$ are observations and columns are features. If $X^TX$ is invertible,

$$
\hat\beta=(X^TX)^{-1}X^Ty.
$$

In computation, use stable factorization rather than explicitly forming an inverse. Coefficient $\beta_j$ is the expected change in $y$ for a one-unit increase in $x_j$, holding included predictors fixed. That interpretation depends on correct functional form and absence of unaddressed confounding; it is not automatically causal.

## Assumptions and diagnostics

Classical inference usually relies on linear mean structure, zero conditional error mean, independent observations, no perfect multicollinearity, and a justified variance model. Normality is mainly needed for exact small-sample inference, not for defining the least-squares estimate.

Check:

- residual-versus-fitted plot for form and variance;
- QQ plot for severe tail departures;
- VIF or condition number for collinearity;
- leverage and Cook's distance for influential observations;
- autocorrelation for ordered data;
- train/test performance for generalization.

When variance is unequal, use robust standard errors or model the variance. When observations are grouped or serially related, use an appropriate clustered, panel, or time-series model.

## Significance and practical importance

A $t$ test asks whether one coefficient is distinguishable from a null value under assumptions. An $F$ test compares a group of restrictions. A p-value is not the probability that the null hypothesis is true and is not a measure of effect size.

Report coefficient, units, uncertainty interval, and practical implication. With enough data, a negligible effect can be statistically significant. With little data, an important effect can remain uncertain.

## Nonlinearity and interactions

Linear regression is linear in parameters, so transformed features are allowed:

$$
y=\beta_0+\beta_1x+\beta_2x^2+\varepsilon.
$$

Use low-order terms supported by plots and validation. An interaction

$$
y=\beta_0+\beta_1x_1+\beta_2x_2+\beta_3x_1x_2+\varepsilon
$$

means the effect of $x_1$ changes with $x_2$. Once an interaction is present, interpret main effects at the reference value of the other variable.

## Logistic and count models

For a binary outcome,

$$
P(Y=1\mid x)=\frac{1}{1+e^{-(\beta_0+x^T\beta)}}.
$$

Coefficient $\beta_j$ changes log-odds; $e^{\beta_j}$ is an odds ratio. Evaluate probability calibration as well as discrimination. Accuracy alone can be misleading for imbalanced classes; inspect precision, recall, F1, ROC-AUC, and the decision threshold.

For count outcomes, Poisson regression uses $\log E[Y\mid x]=\beta_0+x^T\beta$. If variance substantially exceeds the mean, investigate overdispersion and negative binomial alternatives.

## Regularization

Ridge regression minimizes

$$
\|y-X\beta\|_2^2+\lambda\|\beta\|_2^2,
$$

shrinking correlated coefficients. Lasso uses $\lambda\|\beta\|_1$ and can set coefficients to zero. Standardize predictors and choose $\lambda$ by validation. Feature selection must occur inside the validation procedure.

## Prediction uncertainty

A confidence interval estimates uncertainty in a conditional mean; a prediction interval covers a new individual observation and is wider. Report held-out MAE or RMSE and interval coverage. Use chronological validation for time-dependent observations.

### Worked checklist

For a housing model, start with price distribution and scatter plots, define a baseline using area only, add location and age, test an area–location interaction, inspect residuals and influential homes, compare held-out MAE, and report a prediction interval. Each addition must improve either mechanism, evidence, or decision usefulness.

A compact implementation separates training and test data before fitting preprocessing:

```python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric = make_pipeline(SimpleImputer(strategy="median"), StandardScaler())
categorical = make_pipeline(
    SimpleImputer(strategy="most_frequent"),
    OneHotEncoder(handle_unknown="ignore"),
)
prep = ColumnTransformer([
    ("num", numeric, numeric_columns),
    ("cat", categorical, categorical_columns),
])
model = make_pipeline(prep, Ridge(alpha=1.0))
model.fit(X_train, y_train)
pred = model.predict(X_test)
print(mean_absolute_error(y_test, pred))
```

The pipeline ensures that imputation, scaling, and encoding learn only from the training set.
