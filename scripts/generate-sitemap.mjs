/**
 * Genere public/sitemap.xml a partir des routes statiques et de galleryData.
 *
 * Le sitemap etait maintenu a la main et les fiches projet n'y figuraient pas.
 * Lance automatiquement avant chaque build (voir le script `prebuild`).
 */
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const BASE_URL = "https://www.urdevup.com";
const LOCALES = ["en", "fr"];

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

// galleryData.js n'a pas de dependance runtime : on extrait les slugs sans
// avoir a transpiler le module.
const gallery = readFileSync(resolve(root, "src/data/galleryData.js"), "utf8");
const slugs = [...gallery.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/PrivacyPolicy", changefreq: "yearly", priority: "0.5" },
  { path: "/terms", changefreq: "yearly", priority: "0.5" },
];

const projectRoutes = slugs.map((slug) => ({
  path: `/projets/${slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const urls = [...staticRoutes, ...projectRoutes]
  .map(({ path, changefreq, priority }) => {
    const loc = `${BASE_URL}${path}`;
    const alternates = [...LOCALES, "x-default"]
      .map((locale) => {
        const lng = locale === "x-default" ? "en" : locale;
        return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${loc}?lng=${lng}" />`;
      })
      .join("\n");

    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), sitemap, "utf8");
console.log(
  `sitemap.xml genere : ${staticRoutes.length} routes statiques + ${projectRoutes.length} projets`,
);
