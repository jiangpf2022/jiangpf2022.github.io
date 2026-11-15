---
permalink: /projects/llm-reliability/
title: "Interpreting Reliability from LLM Activations"
eyebrow: "Columbia Creative Machines Lab · Research"
period: "Sep 2026 – Present"
location: "New York, NY"
summary: "Investigating whether internal neural representations reveal when a language model is uncertain, incorrect, or unreliable."
---

{% include project-detail-header.html %}

## Research question

Language models can produce fluent responses even when their conclusions are unsupported. This project asks whether the model’s internal activations contain useful evidence about confidence and correctness before those failures are visible in the generated text.

## Approach

- Collect hidden representations from model responses under controlled evaluation settings.
- Train supervisory models that map those representations to reliability-related labels.
- Compare internal signals with surface-level indicators such as wording, stated confidence, and final-answer accuracy.

## Current focus

The work centers on identifying interpretable and generalizable activation patterns rather than relying on a single prompt style or benchmark. Because the project is ongoing, this page only presents information that is already public in the résumé.

## My role

I design and train the supervisory models, construct evaluations for unreliable or deceptive responses, and analyze which internal representations carry stable predictive information.
