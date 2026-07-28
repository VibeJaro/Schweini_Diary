import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(projectDirectory, "dist");

const siteFiles = ["site.css", "site.js", "food-sudoku.js"];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of siteFiles) {
  await cp(path.join(projectDirectory, file), path.join(outputDirectory, file));
}

const deploymentHost =
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "";
const deploymentOrigin = deploymentHost
  ? deploymentHost.startsWith("http")
    ? deploymentHost.replace(/\/$/, "")
    : `https://${deploymentHost.replace(/\/$/, "")}`
  : "";
const sourceHtml = await readFile(path.join(projectDirectory, "index.html"), "utf8");
const builtHtml = deploymentOrigin
  ? sourceHtml.replaceAll('content="/public/og.png"', `content="${deploymentOrigin}/public/og.png"`)
  : sourceHtml;
await writeFile(path.join(outputDirectory, "index.html"), builtHtml, "utf8");

const sourcePublicDirectory = path.join(projectDirectory, "public");
const sourceImageDirectory = path.join(sourcePublicDirectory, "images");
const outputPublicDirectory = path.join(outputDirectory, "public");
const outputImageDirectory = path.join(outputPublicDirectory, "images");
await mkdir(outputImageDirectory, { recursive: true });

for (const filename of await readdir(sourceImageDirectory)) {
  if (!filename.endsWith(".webp")) continue;
  await cp(path.join(sourceImageDirectory, filename), path.join(outputImageDirectory, filename));
}
await cp(path.join(sourcePublicDirectory, "og.png"), path.join(outputPublicDirectory, "og.png"));

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
let config;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  config = [
    `export const SUPABASE_URL = ${JSON.stringify(SUPABASE_URL)};`,
    `export const SUPABASE_ANON_KEY = ${JSON.stringify(SUPABASE_ANON_KEY)};`,
    "",
  ].join("\n");
} else {
  config = await readFile(path.join(projectDirectory, "config.js"), "utf8");
}

await writeFile(path.join(outputDirectory, "config.js"), config, "utf8");
console.log("Schweinis Website liegt fertig in dist/.");
