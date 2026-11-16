---
permalink: /projects/asynchronous-n-point-solver/
title: "A Linear N-Point Solver for Asynchronous Tracks"
eyebrow: "ICCV 2025 · Highlight Paper 🔥"
period: "Nov 2024 – Mar 2025"
location: "ShanghaiTech Mobile Perception Lab"
summary: "A unified linear solver for recovering structure and continuous motion from point tracks captured at arbitrary timestamps."
image: "/images/projects/ICCV2025.png"
image_alt: "Asynchronous point tracks and motion estimation pipeline"
links:
  - label: "Paper"
    url: "https://arxiv.org/pdf/2507.22733"
  - label: "Code"
    url: "https://github.com/suhang99/AsyncTrack-Motion-Solver"
  - label: "ICCV 2025"
    url: "https://iccv.thecvf.com/"
---

{% include project-detail-header.html %}

## Motivation

Classical five- and eight-point algorithms assume synchronized views. That assumption breaks for rolling-shutter cameras, event cameras, and mixed sensing systems, where each correspondence may carry a different timestamp.

## Formulation

The project models motion with first-order dynamics and a constant-velocity assumption. This yields a linear point-incidence relation that jointly recovers linear velocity and 3D structure from tracks observed at arbitrary times and across an arbitrary collection of views.

## Sensor coverage

The same formulation handles global-shutter images, rolling-shutter measurements, event-camera tracks, and correspondences combined from collocated sensors. Its linear structure also makes degeneracies and solution multiplicities easier to characterize.

## Results

Experiments on simulated and real data showed consistent gains over recent modality-specific approaches. The implementation reached **63 μs CPU runtime** and reduced velocity error by **10–30%** in the reported comparisons.

## My contribution

I developed real-time LED-matrix detection and contributed to encoding and tracking modules. I also integrated asynchronous feature trackers, including ArcStar and RATE, to supply accurate temporally varying point tracks to the solver.
