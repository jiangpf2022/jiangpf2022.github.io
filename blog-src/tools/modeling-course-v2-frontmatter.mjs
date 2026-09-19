import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const draftsDir = process.argv[2] && path.resolve(process.argv[2]);
if (!draftsDir) throw new Error("Provide the private OneDrive v2 draft directory.");

const course = [
  [2, "Visual Evidence", 1, ["Scientific Figures", "Communication"], "Make figures answer claims with fair comparisons, units, uncertainty, and readable captions."],
  [3, "Linear, Quadratic & Conic Optimization", 1, ["Linear Programming", "Quadratic Programming", "SOCP"], "Build LP, QP, and SOCP formulations from original, hand-checkable decisions."],
  [4, "Advanced Convex Optimization", 3, ["Convex Optimization", "Duality", "Proximal Algorithms"], "Study convex guarantees, duality, and advanced methods from geometric and computational viewpoints."],
  [5, "Multi-Objective & Robust Optimization", 1, ["Pareto", "Robust Optimization"], "Compare competing goals and uncertain resources without hiding trade-offs."],
  [6, "Intelligent Optimization", 1, ["Genetic Algorithms", "Particle Swarm", "Simulated Annealing"], "Understand GA, PSO, and annealing through transparent representations and fair experiments."],
  [7, "Pose Graph Optimization", 2, ["Pose Graph", "Least Squares", "Robotics"], "Solve and diagnose an original synthetic pose-graph estimation case."],
  [8, "Differential Equations 101", 1, ["ODE", "Conservation"], "Turn a changing state and a rate law into the first useful differential-equation model."],
  [9, "Differential Equations II", 1, ["ODE Systems", "Stability"], "Move from one state to coupled dynamics, equilibria, and data-aware numerical solutions."],
  [10, "Advanced Differential Equations", 2, ["PDE", "Sensitivity", "Numerical Methods"], "Work with boundary conditions, distributed systems, stiffness, and sensitivity."],
  [11, "Differential-Equation Competition Cases", 3, ["Dynamical Systems", "Case Studies"], "Build complete original cases from a physical mechanism to tested decisions."],
  [12, "Time Series 101", 1, ["Time Series", "Forecast Baselines"], "Audit the time index, isolate patterns, and forecast without information leakage."],
  [13, "Advanced Time Series", 2, ["ARIMA", "Forecasting", "Volatility"], "Compare smoothing, ARIMA, volatility, and multivariate models over honest rolling origins."],
  [14, "Data Preparation 101", 1, ["Data Cleaning", "Missing Data"], "Define what one row means before cleaning, transforming, or plotting it."],
  [15, "Advanced Data Analysis", 2, ["Regression", "PCA", "Clustering"], "Connect regression diagnostics, dimension reduction, and clustering to defensible conclusions."],
  [16, "Evaluation Models 101", 1, ["AHP", "TOPSIS", "Decision Analysis"], "Make ranking criteria, weights, admissibility, and rank sensitivity explicit."],
  [17, "Financial Market Volatility", 3, ["Volatility", "Risk Modeling", "Case Study"], "Analyze a synthetic market-volatility case without confusing forecasts with investment advice."],
  [18, "Writing the Abstract", 1, ["Scientific Writing", "Abstract"], "Write concise claims that trace to methods, results, evidence, and limitations."],
  [19, "Writing the Main Text", 1, ["Scientific Writing", "Validation"], "Write a modeling paper whose assumptions, equations, results, and checks form one argument."],
  [20, "Competition Mindset & Preparation", 2, ["Competition", "Teamwork"], "Prepare the team, time budget, tools, and decision habits for a modeling competition."],
];

const names = await readdir(draftsDir);
for (const [number, title, level, tags, excerpt] of course) {
  const no = String(number).padStart(2, "0");
  const name = names.find((file) => file.startsWith(`Mathematical-Modeling-${no}-`) && file.endsWith(".md"));
  if (!name) throw new Error(`Missing draft ${no}.`);
  const original = await readFile(path.join(draftsDir, name), "utf8");
  const oldFrontmatter = original.match(/^---\n[\s\S]*?\n---\n/);
  if (!oldFrontmatter) throw new Error(`Missing frontmatter in ${name}.`);
  const dateSecond = String(21 - number).padStart(2, "0");
  const frontmatter = `---\ntitle: Mathematical Modeling ${number} - ${title}\ndate: 2026-09-15 18:00:${dateSecond}\ncategories: Mathematical Modeling\ntags:\n${tags.map((tag) => `  - ${tag}`).join("\n")}\nmathjax: true\ncover: "/images/mathematical-modeling-nyc.webp"\nstudy_time: 40\nlesson_number: ${number}\nlesson_level: ${level}\nreview_lock: true\nexcerpt: "${excerpt}"\n---\n`;
  await writeFile(path.join(draftsDir, name), frontmatter + original.slice(oldFrontmatter[0].length));
}

console.log(`Updated metadata on ${course.length} private drafts; teaching bodies were preserved.`);
