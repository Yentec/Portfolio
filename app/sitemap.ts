import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yentec.fr",
      lastModified: new Date("2026-06-02"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
