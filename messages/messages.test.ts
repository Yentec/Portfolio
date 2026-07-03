import { describe, it, expect } from "vitest";
import fr from "./fr.json";
import en from "./en.json";
import { projects } from "@/content/projects";
import { npcs } from "@/content/rpg/npcs";

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

describe("messages — RPG dialogues", () => {
  const npcIds = npcs.map((n) => n.id);
  const sectionNpcIds = new Set(["about", "services", "skills", "contact"]);
  const projectNpcIds = npcIds.filter((id) => !sectionNpcIds.has(id));

  for (const { name, messages } of locales) {
    const dialogues = messages.rpgGame.dialogues as Record<string, string[]>;

    it(`[${name}] every NPC has a non-empty dialogues entry`, () => {
      for (const id of npcIds) {
        expect(dialogues, `missing dialogues entry for NPC "${id}" in ${name}`).toHaveProperty(id);
        expect(
          dialogues[id]?.length ?? 0,
          `empty dialogues for NPC "${id}" in ${name}`,
        ).toBeGreaterThan(0);
      }
    });
  }

  it("every project NPC id matches a real project slug in content/projects.ts", () => {
    const projectSlugs = new Set(projects.map((p) => p.slug));
    for (const id of projectNpcIds) {
      expect(
        projectSlugs.has(id),
        `NPC "${id}" doesn't match any project slug — rename/removal drift?`,
      ).toBe(true);
    }
  });

  it("every real project has a matching NPC in content/rpg/npcs.ts", () => {
    for (const p of projects) {
      expect(npcIds, `project "${p.slug}" has no matching NPC — new project not wired up?`).toContain(
        p.slug,
      );
    }
  });
});
