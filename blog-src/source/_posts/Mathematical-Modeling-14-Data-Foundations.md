---
title: Mathematical Modeling 14 - Data Foundations
date: 2026-09-14 19:59:05
categories: Mathematical Modeling
tags:
  - Data Cleaning
  - Exploratory Analysis
  - Interpolation
mathjax: true
cover: "/images/mathematical-modeling-course.svg"
excerpt: "A beginner-friendly pipeline for understanding, cleaning, transforming, visualizing, and interpolating competition data before modeling."
---

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

Interpolation reconstructs values *between* known points and normally passes through those points. Fitting estimates an overall noisy relationship.

Linear interpolation between $(x_i,y_i)$ and $(x_{i+1},y_{i+1})$ is

$$
\hat y(x)=y_i+\frac{y_{i+1}-y_i}{x_{i+1}-x_i}(x-x_i).
$$

It is local and stable but has slope discontinuities. A global Lagrange polynomial passes through every point but can oscillate badly at high order. Newton form is easier to extend with new points. Cubic splines use low-degree polynomials on adjacent intervals and enforce smooth derivatives, making them effective for trajectories and smooth sensors.

Interpolation outside the observed range becomes extrapolation and is far less reliable. If observations are noisy, a smoothing spline or fitted mechanism may be better than a curve forced through every point.

## A reproducible preprocessing pipeline

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
