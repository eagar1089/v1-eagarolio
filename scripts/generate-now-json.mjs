import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const nowMdPath = path.join(repoRoot, "now.md");
const outputDir = path.join(repoRoot, "public");
const outputPath = path.join(outputDir, "now.json");

const fallback = {
  currentlyLearning: "Karpenter & Kyverno",
  reading: "Designing Data-Intensive Applications",
  building: "A cinematic portfolio with interactive timelines",
};

const source = fs.existsSync(nowMdPath) ? fs.readFileSync(nowMdPath, "utf8") : "";

const extract = (key) => {
  const regex = new RegExp(`${key}\\s*:\\s*(.+)`, "i");
  const match = source.match(regex);
  return match?.[1]?.trim();
};

const payload = {
  updatedAt: new Date().toISOString(),
  currentlyLearning: extract("currentlyLearning") || fallback.currentlyLearning,
  reading: extract("reading") || fallback.reading,
  building: extract("building") || fallback.building,
};

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Updated ${path.relative(repoRoot, outputPath)}`);
