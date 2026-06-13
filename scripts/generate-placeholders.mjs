import { writeFileSync } from "fs";
import { join } from "path";

const root = join(import.meta.dirname, "..", "public");

function svg(width, height, label, sub = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f3e2b3"/>
      <stop offset="50%" stop-color="#e8c777"/>
      <stop offset="100%" stop-color="#c9a0a4"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect x="12" y="12" width="${width - 24}" height="${height - 24}" fill="none" stroke="#5c1022" stroke-width="3" stroke-dasharray="2 10" opacity="0.5"/>
  <text x="50%" y="48%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width / 14)}" fill="#5c1022" opacity="0.85">${label}</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width / 28)}" fill="#5c1022" opacity="0.6">${sub}</text>
</svg>`;
}

const gallery = [
  ["photo1.svg", 800, 1000],
  ["photo2.svg", 800, 600],
  ["photo3.svg", 800, 1100],
  ["photo4.svg", 800, 800],
  ["photo5.svg", 800, 950],
  ["photo6.svg", 800, 650],
];

gallery.forEach(([name, w, h], i) => {
  writeFileSync(join(root, "gallery", name), svg(w, h, `Photo ${i + 1}`, "Replace in /public/gallery"));
});

const story = [
  ["story1.svg", "First Meet", "2021"],
  ["story2.svg", "Engagement", "2023"],
  ["story3.svg", "Wedding", "2026"],
];

story.forEach(([name, label, sub]) => {
  writeFileSync(join(root, "story", name), svg(900, 700, label, sub));
});

writeFileSync(join(root, "og-image.svg"), svg(1200, 630, "Vihanga & Sandali", "29 August 2026 - Galle Face Hotel"));

console.log("Placeholder assets generated.");
