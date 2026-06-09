import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/content/projects";

const BASE = "https://yentec.fr";
const caseStudySlugs = projects.filter((p) => p.caseStudySlug).map((p) => p.caseStudySlug!);

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries = routing.locales.map((locale) => ({
    url: `${BASE}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE}/${l}`])),
    },
  }));

  const caseStudyEntries = routing.locales.flatMap((locale) =>
    caseStudySlugs.map((slug) => ({
      url: `${BASE}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...homeEntries, ...caseStudyEntries];
}
