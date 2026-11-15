---
permalink: /projects/lisn-social-navigation/
title: "LISN: Language-Instructed Social Navigation"
eyebrow: "ICRA 2026 · Accepted"
period: "May 2025 – Oct 2025"
location: "RoboScience & NUS Lin Shao Lab"
summary: "A benchmark and fast–slow VLM control framework for robots that must follow language instructions while navigating around people."
image: "/images/projects/ICRA2026.png"
image_alt: "Overview of the LISN social navigation system"
links:
  - label: "Project video"
    url: "/images/projects/ICRA2026.mp4"
  - label: "ICRA 2026"
    url: "https://2026.ieee-icra.org/"
---

{% include project-detail-header.html %}

## Motivation

Social navigation is more than reaching a destination without colliding with pedestrians. A robot may also need to yield, follow a person, maintain a context-dependent distance, or avoid a region named in a user instruction. These behaviors require language understanding, scene interpretation, and responsive motion control.

## LISN-Bench

We introduced a simulation-based benchmark for language-instructed social navigation. Built on Rosnav-Arena 3.0, it evaluates instruction following and scene understanding across diverse interaction contexts rather than measuring path efficiency alone.

## Social-Nav-Modulator

The proposed controller separates reasoning and execution into two timescales:

1. A slower VLM loop interprets the scene and instruction.
2. Its output modulates costmaps and controller parameters.
3. A fast local planner continues producing safe, real-time motion commands.

This division reduces dependence on high-frequency VLM inference while preserving responsive collision avoidance.

## Results

The system achieved an average navigation success rate of **91.3%**, compared with **28%** for the prior state-of-the-art method. The largest gains appeared in difficult tasks such as following a person through a crowd and avoiding instruction-forbidden regions.

## My contribution

I led the research effort, integrated vision-language reasoning into a ROS-based navigation stack, extended social-force and costmap behavior with VLM-conditioned parameters, and validated the complete pipeline in complex human–robot scenarios.
