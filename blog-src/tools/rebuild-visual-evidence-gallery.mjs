#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const postPath = path.join(root, "source/_posts/Mathematical-Modeling-02-Visual-Evidence.md");
const manifestPath = path.join(root, "source/data/visual-evidence-award-figures.json");
const records = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const post = fs.readFileSync(postPath, "utf8");
const startMarker = "<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:START -->";
const endMarker = "<!-- GENERATED:VISUAL-EVIDENCE-GALLERY:END -->";
const oldGallery = post.slice(post.indexOf(startMarker), post.indexOf(endMarker) + endMarker.length);
const firstSection = oldGallery.slice(oldGallery.indexOf("## 1."), oldGallery.indexOf("## 2."));

const sections = [
  { number: 2, title: "Comparison, Ranking, and Composition", categories: ["comparison"], intro: "A comparison graphic should answer who is larger, by how much, and under which common conditions. Position on a shared scale is usually the most reliable encoding. Color can guide attention, but it must never replace the geometry that carries the quantitative claim. The award-paper excerpts in this section are useful because they place alternatives, regions, schedules, or strategies into a common frame instead of asking the reader to reconcile separate tables. While reading, check whether the comparison is fair: identical units, identical periods, visible baselines, and a caption that states the substantive difference rather than announcing a chart type." },
  { number: 3, title: "Time, Trend, and Forecasting", categories: ["time"], intro: "Time plots are not ordinary line charts with dates attached. They must distinguish observations from fitted values and forecasts, expose changes in regime, and respect temporal dependence. A convincing competition figure tells the reader where the data end, where the model begins, and how uncertainty grows into the future. The strongest examples below also align events or scenarios on the same clock. That alignment lets a judge connect a peak, decline, lag, or intervention to the mechanism claimed in the text instead of mistaking coincidence for explanation." },
  { number: 4, title: "Distribution, Risk, and Uncertainty", categories: ["distribution", "risk"], intro: "An average hides the cases that often decide a recommendation. Distribution and uncertainty graphics should reveal spread, tails, intervals, scenario dependence, and sensitivity to assumptions. Their purpose is not to decorate a point estimate with translucent color. Their purpose is to show how much confidence the decision deserves and where it may fail. Look for a visible reference level, consistent probability or frequency scales, and an encoding that makes extreme or unstable behavior inspectable." },
  { number: 5, title: "Relationships and Model Diagnostics", categories: ["diagnostic"], intro: "Diagnostic figures ask whether a model behaves as its mathematical story says it should. A fitted line is not enough. We need residual structure, out-of-sample errors, cluster separation, parameter sensitivity, convergence behavior, or comparison with a meaningful baseline. The examples here earn space because they let the reader audit a modeling step. When adapting them, preserve that audit function: label the benchmark, show the region where the fit is weak, and avoid axes or smoothing choices that make disagreement disappear." },
  { number: 6, title: "Space, Maps, and Geometry", categories: ["map"], intro: "A spatial figure must preserve geography or geometry that matters to the decision. It should tell us where something occurs, how distance or adjacency is defined, and which boundaries are analytical rather than decorative. A map without a scale, legend, projection note, or readable reference layer is merely a colored background. The award-paper excerpts below work best when they combine spatial context with one focused overlay: a route, density, scenario, region, or geometric construction." },
  { number: 7, title: "Networks, Flows, and Optimization", categories: ["network"], intro: "Network figures become valuable when topology itself is evidence. Nodes and edges should represent defined objects and interactions; width, direction, color, and placement must have stable meanings. A hairball proves nothing. The successful examples below reduce the graph to the relationships needed for the claim, separate formations or scenarios, and make a flow or structural contrast visible. Reproduce that discipline before adding animation, gradients, or decorative icons." },
  { number: 8, title: "Frameworks and Model Architecture", categories: ["framework"], intro: "A framework diagram is a contract between parts of the model. It should reveal inputs, transformations, decisions, feedback, and validation, not merely arrange algorithm names in attractive boxes. Read every arrow as a sentence: what object moves, in what direction, and with what unit or role? The award-paper examples in this section are strongest when the visual order matches the computational order and when branches correspond to genuine alternatives or checks." },
  { number: 9, title: "Scientific and Engineering Figures", categories: ["scientific"], intro: "Scientific figures must retain the domain mechanism. Geometry needs reference frames; physical curves need units and constraints; simulations need initial and boundary conditions; photographs need annotations that connect the scene to measured variables. These examples are useful because the picture and mathematical model support each other. The image is not a stock illustration of the topic: it identifies the configuration, state, or response that appears in the equations." },
];

const bucket = new Map();
for (const record of records) {
  if (!bucket.has(record.category)) bucket.set(record.category, []);
  bucket.get(record.category).push(record);
}

const take = (categories, count) => {
  const chosen = [];
  for (const category of categories) {
    while ((bucket.get(category) || []).length && chosen.length < count) chosen.push(bucket.get(category).shift());
  }
  for (const list of bucket.values()) {
    while (list.length && chosen.length < count) chosen.push(list.shift());
  }
  return chosen;
};

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const categoryName = {
  comparison: "comparative evidence", time: "temporal evidence", distribution: "distributional evidence",
  risk: "uncertainty evidence", diagnostic: "model diagnostic", map: "spatial evidence",
  network: "network evidence", framework: "model architecture", scientific: "scientific mechanism",
};

const observations = {
  comparison: [
    "The alternatives share one visual frame, so the reader can compare direction and magnitude without performing table lookups.",
    "The composition gives the benchmark and candidate nearly equal visual status; this makes a near-tie or trade-off harder to hide.",
    "The ordering directs attention to the decision variable rather than to an arbitrary label sequence.",
  ],
  time: [
    "The horizontal order preserves cause-before-effect reasoning and makes peaks, lags, and regime changes visible.",
    "Several trajectories are aligned on the same clock, allowing the reader to compare timing as well as amplitude.",
    "The curve exposes shape—not only an endpoint—so the model can be challenged on turning points and transient behavior.",
  ],
  distribution: [
    "The graphic reveals heterogeneity that a mean would erase, including concentration, imbalance, or a long tail.",
    "Part-to-whole structure is visible, but the labels still provide an exact reading when areas or angles are difficult to compare.",
    "The display keeps the full population visible while directing attention to the portion that governs the decision.",
  ],
  risk: [
    "The model is perturbed rather than shown at one nominal setting, so stability becomes an observable result.",
    "A reference band or repeated outcomes separates harmless variation from a change that could reverse the recommendation.",
    "The figure makes uncertainty conditional on an explicit parameter or scenario instead of presenting a vague confidence claim.",
  ],
  diagnostic: [
    "Observed, fitted, or derived quantities can be compared in the same coordinate system, exposing systematic mismatch.",
    "The visual turns an internal modeling step into something a judge can inspect rather than simply trust.",
    "Structure in the error, cluster, or response is visible; that structure indicates where a scalar score would be insufficient.",
  ],
  map: [
    "The base geometry supplies context while the overlay carries one analytical layer, preventing location and result from becoming confused.",
    "Adjacency and distance are visible directly, which is essential when the model depends on routes, regions, or spatial exposure.",
    "The spatial arrangement lets the reader test whether the claimed pattern is localized, connected, or geographically plausible.",
  ],
  network: [
    "Connectivity is the evidence: edge structure and node roles reveal coordination that a list of pairwise values would conceal.",
    "The graph reduces a complicated interaction system to recurring paths, hubs, or formations that can be compared across scenarios.",
    "Visual hierarchy prevents every edge from competing equally and makes the paper's structural claim readable at a glance.",
  ],
  framework: [
    "The reading direction follows the actual modeling workflow, allowing the reader to reconstruct how raw information becomes a decision.",
    "Modules are separated by function and the arrows expose dependencies, so a failed assumption can be traced downstream.",
    "The architecture compresses many equations without pretending they are one undifferentiated black box.",
  ],
  scientific: [
    "The geometry or physical response is shown in the same terms used by the model, joining equations to an observable configuration.",
    "The graphic preserves units, orientation, or state relationships that would be difficult to recover from prose alone.",
    "The domain mechanism remains visible, which helps the reader distinguish a physically motivated model from a purely statistical fit.",
  ],
};

const cautions = {
  comparison: "Before copying this design, verify that every alternative uses the same denominator, period, and feasible set. If the baseline changes between panels, the comparison is visually fluent but mathematically invalid.",
  time: "When recreating it, mark observed and modeled intervals, retain the actual sampling gaps, and do not connect missing observations as if they had been measured. A forecast needs an interval, not only a smooth central line.",
  distribution: "Do not infer precise ranking from area or angle alone. Add direct labels or a companion ordered plot when the decision depends on small differences, and state whether the values are counts, proportions, densities, or weighted estimates.",
  risk: "A sensitivity plot is only as honest as the varied range. Explain why the range is plausible, vary coupled parameters coherently, and mark the point at which feasibility or the preferred decision changes.",
  diagnostic: "Keep the diagnostic separate from the training objective. Use held-out data or a benchmark when possible, show the identity or zero-reference line, and discuss patterned error rather than reporting only a favorable aggregate score.",
  map: "Preserve scale, direction, boundaries, and the source of the base layer. Avoid a rainbow palette and avoid implying continuous spatial knowledge when the data were observed only at sparse sites.",
  network: "Define nodes, edges, direction, and weight in the caption. Filter or aggregate by an explicit rule; otherwise a visually dense network can create an illusion of sophistication without a testable conclusion.",
  framework: "Label arrows with the quantity or decision that moves between modules. Decorative arrows and algorithm names are not a pipeline. Include feedback only when the implementation actually revises an earlier step.",
  scientific: "State the coordinate convention, parameter values, and experimental or simulation conditions. A visually persuasive curve is not evidence if the reader cannot connect it to the governing equation or reproduce its scale.",
};

const buildCard = (record, number, localIndex) => {
  const category = record.category;
  const page = record.page ? `, p. ${record.page}` : "";
  const observation = observations[category][localIndex % observations[category].length];
  const captionHint = record.source_caption.length > 180 ? record.source_caption.slice(0, 177) + "…" : record.source_caption;
  return `<article class="mm-visual-card mm-award-case" id="visual-example-${String(number).padStart(3, "0")}">
  <div class="mm-visual-card-title">${number}. ${esc(categoryName[category])} from an award paper</div>
  <figure class="mm-figure">
    <img loading="lazy" src="${esc(record.image)}" alt="Figure excerpt from ${esc(record.competition)}, ${esc(record.problem)}, ${esc(record.paper)}${esc(page)}.">
    <figcaption><strong>Source.</strong> ${esc(record.competition)}, <em>${esc(record.problem)}</em>; ${esc(record.paper)}${esc(page)}. Cropped figure excerpt used here for visual-design analysis.</figcaption>
  </figure>
  <p><strong>What the paper is showing.</strong> ${esc(captionHint)} The figure belongs to a complete modeling argument rather than an isolated template, so read it together with the stated problem and the variable or scenario encoded on the axes, nodes, regions, or panels.</p>
  <p><strong>Why this visual is effective.</strong> ${observation} The authors make the analytical object visible before asking the reader to accept a numerical conclusion. That is the useful lesson: the form of the picture follows the type of evidence.</p>
  <p><strong>How to adapt it responsibly.</strong> ${cautions[category]} Rebuild the graphic from your own data and cite this paper as design inspiration; do not copy its values, labels, or conclusion into a different problem.</p>
</article>`;
};

let gallery = `${startMarker}\n\n${firstSection.trim()}\n\n`;
let number = 11;
for (const section of sections) {
  const chosen = take(section.categories, 10);
  gallery += `## ${section.number}. ${section.title}\n\n${section.intro}\n\n<div class="mm-visual-gallery">\n\n`;
  chosen.forEach((record, index) => {
    gallery += buildCard(record, number++, index) + "\n\n";
  });
  gallery += `</div>\n\n`;
}

const leftovers = [...bucket.values()].flat();
const finalCases = leftovers.slice(0, 10);
gallery += `## 10. From a Good Figure to an Award-Level Page\n\nAn award-level page is not a collage of individually attractive charts. It is a sequence of evidence. The final ten excerpts deliberately mix chart families because the design problem at page level is orchestration: context before detail, method before result, result before recommendation, and uncertainty before confidence. Notice how different papers repeat typography and color semantics, keep related panels close, and let captions complete the reasoning. Use these cases to audit the rhythm of your own paper rather than to imitate one surface style.\n\n<div class="mm-visual-gallery">\n\n`;
finalCases.forEach((record, index) => {
  gallery += buildCard(record, number++, index) + "\n\n";
});
gallery += `</div>\n\n<div class="mm-key-box"><span class="mm-callout-label">Provenance audit</span><p>This gallery contains <strong>100 figures</strong>: ten original teaching diagrams for foundational design principles and <strong>90 cropped figure excerpts from identified CUMCM, MCM, or ICM award papers</strong>. Every award-paper card names the competition, year, problem, paper or team, and page when available. The real competition-paper share is therefore <strong>90%</strong>. Crops are included for teaching commentary; follow the linked official archives for complete papers and contest context.</p></div>\n\n${endMarker}`;

if (number !== 101) throw new Error(`Expected to generate through figure 100, stopped at ${number - 1}`);
const updated = post.slice(0, post.indexOf(startMarker)) + gallery + post.slice(post.indexOf(endMarker) + endMarker.length);
fs.writeFileSync(postPath, updated);
console.log(`Rebuilt Visual Evidence gallery with ${number - 11} attributed award-paper figures.`);
