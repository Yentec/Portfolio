import type { NpcDefinition } from "@/types/rpg";
import { CHARACTER_VARIANT } from "@/lib/rpg/constants";

/**
 * PNJ placés à Bourg Canevas. Un par section (about/services/skills/contact),
 * et un par projet réel de content/projects.ts (mêmes slugs) — tous les PNJ
 * projet réutilisent la même variante de sprite, il n'y en a qu'une de dispo.
 * Position en tuiles (col, row), vérifiée franchissable sur lib/rpg/map.ts.
 * Parcours pensé nord (entrée) -> sud : about juste après la porte, services/
 * skills devant les deux maisons, les 4 projets devant le bâtiment, contact
 * au bord du bassin en dernière étape.
 */
export const npcs: NpcDefinition[] = [
  { id: "about", position: { col: 13, row: 3 }, variant: CHARACTER_VARIANT.npcAbout },
  { id: "services", position: { col: 10, row: 7 }, variant: CHARACTER_VARIANT.npcServices },
  { id: "skills", position: { col: 12, row: 11 }, variant: CHARACTER_VARIANT.npcSkills },
  { id: "linkforge", position: { col: 14, row: 14 }, variant: CHARACTER_VARIANT.npcProjects },
  { id: "feedbackflow", position: { col: 15, row: 14 }, variant: CHARACTER_VARIANT.npcProjects },
  {
    id: "projets-clients",
    position: { col: 16, row: 14 },
    variant: CHARACTER_VARIANT.npcProjects,
  },
  { id: "yachts-studio", position: { col: 17, row: 14 }, variant: CHARACTER_VARIANT.npcProjects },
  { id: "contact", position: { col: 8, row: 17 }, variant: CHARACTER_VARIANT.npcContact },
];
