#!/usr/bin/env node
// Checks relative Markdown links, their #anchors, and SUMMARY.md/sidebar parity.
// The VitePress build does not check anchors, so run this after a build:
//   npm run build && npm run check-links
// Pass a different build output directory as the first argument if needed.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, process.argv[2] ?? ".vitepress/dist");
const skipDirs = new Set(["node_modules", ".vitepress", ".git", "public"]);
const problems = [];

if (!existsSync(dist)) {
  console.error(`Build output not found at ${dist}. Run "npm run build" first.`);
  process.exit(2);
}

function markdownFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return skipDirs.has(name) ? [] : markdownFiles(path);
    return name.endsWith(".md") ? [path] : [];
  });
}

function htmlFor(mdPath) {
  const rel = relative(root, mdPath).replace(/\.md$/, "");
  const candidates = [join(dist, `${rel}.html`), join(dist, rel.replace(/index$/, "index.html"))];
  return candidates.find((candidate) => existsSync(candidate));
}

const anchorCache = new Map();
function anchorsFor(mdPath) {
  if (!anchorCache.has(mdPath)) {
    const html = htmlFor(mdPath);
    const ids = html ? [...readFileSync(html, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]) : null;
    anchorCache.set(mdPath, ids && new Set(ids));
  }
  return anchorCache.get(mdPath);
}

function stripCode(text) {
  return text.replace(/^(```|~~~)[\s\S]*?^\1/gm, "").replace(/`[^`\n]*`/g, "");
}

let checked = 0;
for (const file of markdownFiles(root)) {
  const source = relative(root, file);
  const text = stripCode(readFileSync(file, "utf8"));
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const url = match[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("/") || url.startsWith("<")) continue;
    checked += 1;
    const [pathPart, anchor] = url.split("#");
    let target = pathPart ? normalize(join(dirname(file), decodeURIComponent(pathPart))) : file;
    if (pathPart && !existsSync(target) && existsSync(`${target}.md`)) target = `${target}.md`;
    if (pathPart && existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.md");
    if (!existsSync(target)) {
      problems.push(`${source}: missing target ${url}`);
      continue;
    }
    if (anchor && target.endsWith(".md") && !source.endsWith("SUMMARY.md")) {
      const anchors = anchorsFor(target);
      if (!anchors) problems.push(`${source}: no built page for ${url}`);
      else if (!anchors.has(anchor)) problems.push(`${source}: missing anchor ${url}`);
    }
  }
}

// SUMMARY.md and the VitePress sidebar must list the same pages in the same order.
const normalise = (link) => `/${link.replace(/^\.?\//, "").replace(/\.md$/, "").replace(/(^|\/)index$/, "$1")}`.replace(/\/$/, "") || "/";
const summary = [...readFileSync(join(root, "SUMMARY.md"), "utf8").matchAll(/\]\((\.\/[^)]+\.md)\)/g)].map((m) => normalise(m[1]));
const config = readFileSync(join(root, ".vitepress/config.mts"), "utf8");
const sidebarSource = config.slice(config.indexOf("sidebar:"), config.indexOf("socialLinks:"));
const sidebar = [...sidebarSource.matchAll(/link:\s*["']([^"']+)["']/g)].map((m) => normalise(m[1]));
for (const link of sidebar) {
  const page = join(root, link === "/" ? "index" : link.slice(1));
  if (!existsSync(`${page}.md`) && !existsSync(join(page, "index.md"))) problems.push(`sidebar: missing page ${link}`);
}
if (summary.join("\n") !== sidebar.join("\n")) {
  const index = summary.findIndex((link, i) => link !== sidebar[i]);
  problems.push(`SUMMARY.md and sidebar differ (${summary.length} vs ${sidebar.length} pages; first difference at entry ${index + 1}: ${summary[index]} vs ${sidebar[index]})`);
}

for (const problem of problems) console.error(problem);
console.log(`Checked ${checked} links and ${summary.length} SUMMARY entries: ${problems.length} problem(s).`);
process.exit(problems.length ? 1 : 0);
