import { describe, it, expect } from "vitest";
import fr from "./fr.json";
import en from "./en.json";
import { projects } from "@/content/projects";

const locales = [
  { name: "fr", messages: fr },
  { name: "en", messages: en },
] as const;

describe("messages — structure parity", () => {
  it("fr and en expose the same top-level namespaces", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(fr).sort());
  });
});

describe("messages — project cards", () => {
  const usedKinds = [...new Set(projects.map((p) => p.kind))];

  for (const { name, messages } of locales) {
    it(`[${name}] kindLabels covers all ProjectKind values used in content`, () => {
      const labels = messages.projects.kindLabels as Record<string, string>;
      for (const kind of usedKinds) {
        expect(labels, `missing kindLabel for "${kind}" in ${name}`).toHaveProperty(kind);
      }
    });
  }
});

describe("messages — case study content", () => {
  const caseStudySlugs = projects.filter((p) => p.caseStudySlug).map((p) => p.caseStudySlug!);

  const requiredFields = [
    "metaTitle",
    "metaDescription",
    "kind",
    "title",
    "lead",
    "repoUrl",
    "liveLabel",
    "liveIcon",
    "stack",
    "role",
    "period",
    "projectType",
    "status",
    "isOnline",
    "heroAlt",
    "contexte",
    "problemeIntro",
    "problemePoints",
    "solutionBody",
    "solutionGallery",
    "decisions",
    "resultatBody",
    "resultatFacts",
  ];

  for (const { name, messages } of locales) {
    const caseStudies = messages.caseStudies as Record<string, Record<string, unknown>>;

    it(`[${name}] every caseStudySlug from projects.ts has an entry in messages`, () => {
      for (const slug of caseStudySlugs) {
        expect(caseStudies, `"${slug}" missing in messages/${name}.json`).toHaveProperty(slug);
      }
    });

    it(`[${name}] each case study entry has all required fields`, () => {
      for (const slug of caseStudySlugs) {
        const entry = caseStudies[slug];
        for (const field of requiredFields) {
          expect(entry, `field "${field}" missing in ${name}.caseStudies.${slug}`).toHaveProperty(
            field,
          );
        }
      }
    });
  }
});
