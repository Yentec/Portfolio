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
 * "guard" (polish "easter eggs and polish") : PNJ narratif distinct de
 * "skills" (même skin, CHARACTER_VARIANT.npcSkills, mais pas la même section) —
 * posté sur la sortie nord (col 12, row 1), bloque le retour en arrière avec
 * une barrière (WOODENFENCEM sur col 13, row 1 — voir lib/rpg/map.ts).
 * `fixedDirection: "down"` : sentinelle immobile, ne suit pas le cycle idle
 * aléatoire des autres PNJ (regarde toujours vers le joueur/le village).
 */
export const npcs: NpcDefinition[] = [
  {
    id: "guard",
    position: { col: 12, row: 0 },
    variant: CHARACTER_VARIANT.npcSkills,
    fixedDirection: "down",
  },
  { id: "about", position: { col: 13, row: 3 }, variant: CHARACTER_VARIANT.npcAbout },
  { id: "services", position: { col: 10, row: 7 }, variant: CHARACTER_VARIANT.npcServices },
  { id: "skills", position: { col: 12, row: 11 }, variant: CHARACTER_VARIANT.npcSkills },
  { id: "linkforge", position: { col: 14, row: 15 }, variant: CHARACTER_VARIANT.npcProjects },
  { id: "feedbackflow", position: { col: 15, row: 15 }, variant: CHARACTER_VARIANT.npcProjects },
  {
    id: "projets-clients",
    position: { col: 16, row: 15 },
    variant: CHARACTER_VARIANT.npcProjects,
  },
  { id: "yachts-studio", position: { col: 17, row: 15 }, variant: CHARACTER_VARIANT.npcProjects },
  { id: "contact", position: { col: 8, row: 17 }, variant: CHARACTER_VARIANT.npcContact },
];
