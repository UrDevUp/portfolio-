import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO_BASE_URL, defaultSeo, routeSeo } from "@/lib/seoConfig";

const SUPPORTED_LANGUAGES = ["en", "fr"];

function upsertMeta(name, content, useProperty = false) {
  const selector = useProperty
    ? `meta[property=\"${name}\"]`
    : `meta[name=\"${name}\"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(useProperty ? "property" : "name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertLink(rel, href, attrs = {}) {
  const attrKey = attrs.hreflang ? `hreflang=\"${attrs.hreflang}\"` : "";
  const selector = attrKey
    ? `link[rel=\"${rel}\"][${attrKey}]`
    : `link[rel=\"${rel}\"]`;

  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
  Object.entries(attrs).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
}

function upsertJsonLd(id, payload) {
  let tag = document.head.querySelector(
    `script[type=\"application/ld+json\"][data-seo=\"${id}\"]`,
  );
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", id);
    document.head.appendChild(tag);
  }

  tag.textContent = JSON.stringify(payload);
}

function getPathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getLanguage(i18n) {
  const active = i18n.resolvedLanguage || i18n.language || "en";
  return SUPPORTED_LANGUAGES.includes(active) ? active : "en";
}

export default function SeoHead() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const normalizedPath = getPathname(pathname);
    const lang = getLanguage(i18n);
    const seo = routeSeo[normalizedPath] || defaultSeo;

    const title = seo.title?.[lang] || seo.title?.en || defaultSeo.title.en;
    const description =
      seo.description?.[lang] ||
      seo.description?.en ||
      defaultSeo.description.en;
    const canonical = `${SEO_BASE_URL}${normalizedPath}`;
    const ogImage = seo.image || defaultSeo.image;

    document.title = title;
    document.documentElement.setAttribute("lang", lang);

    upsertMeta("description", description);
    upsertMeta("keywords", seo.keywords || defaultSeo.keywords);
    upsertMeta(
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );

    upsertMeta("og:title", title, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:type", seo.type || "website", true);
    upsertMeta("og:url", canonical, true);
    upsertMeta("og:image", ogImage, true);
    upsertMeta("og:site_name", "UrDevUp", true);
    upsertMeta("og:locale", lang === "fr" ? "fr_FR" : "en_US", true);

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", ogImage);

    upsertLink("canonical", canonical);
    SUPPORTED_LANGUAGES.forEach((locale) => {
      upsertLink("alternate", `${canonical}?lang=${locale}`, {
        hreflang: locale,
      });
    });
    upsertLink("alternate", `${canonical}?lang=en`, { hreflang: "x-default" });

    upsertJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "UrDevUp",
      url: SEO_BASE_URL,
      logo: `${SEO_BASE_URL}/assets/images/logo.svg`,
      email: "urdevup@gmail.com",
      sameAs: [],
    });

    upsertJsonLd("website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "UrDevUp",
      url: SEO_BASE_URL,
      inLanguage: lang,
    });

    upsertJsonLd("webpage", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonical,
      inLanguage: lang,
    });
  }, [pathname, i18n]);

  return null;
}
