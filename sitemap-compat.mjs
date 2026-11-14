// @astrojs/sitemap emits sitemap-index.xml + sitemap-N.xml.
// The old Hexo site served /sitemap.xml, so keep that URL working by
// merging the generated chunks into a single <urlset>.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("./dist/", import.meta.url));
const chunks = readdirSync(distDir).filter(name =>
  /^sitemap-\d+\.xml$/.test(name)
);

if (chunks.length === 0) {
  console.warn("[sitemap] no sitemap-*.xml found, skipping /sitemap.xml");
  process.exit(0);
}

const urls = chunks.flatMap(name => {
  const xml = readFileSync(join(distDir, name), "utf8");
  return [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map(match => match[0]);
});

const output = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(distDir, "sitemap.xml"), output);
console.log(`[sitemap] wrote dist/sitemap.xml with ${urls.length} URLs`);
