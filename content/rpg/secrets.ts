import type { SecretDefinition } from "@/types/rpg";

/**
 * Easter eggs positionnels (issue "easter eggs and polish") : à débusquer en
 * marchant dessus (herbe, reflet, raccourci) ou en s'approchant puis en leur
 * faisant face (panneaux, boîte aux lettres, portes — décor bloquant, jamais
 * foulable), sans indicateur visuel — le texte vit dans messages/*.json sous
 * rpgGame.secrets. Positions dérivées de la grille de lib/rpg/map.ts.
 */
export const secrets: SecretDefinition[] = [
  // Touffe d'herbe isolée au sud-ouest, à l'écart du parcours des PNJ.
  { id: "grass", position: { col: 12, row: 5 } },
  // Bord du bassin, juste à côté du PNJ Contact.
  { id: "reflection", position: { col: 9, row: 17 } },
  // Sous la canopée au sud : visuellement bloqué, en fait franchissable.
  { id: "shortcut", position: { col: 3, row: 20 } },
  // Grand panneau en bois, entre les deux maisons.
  { id: "bigSign", position: { col: 9, row: 11 } },
  // Petit panneau, devant la première maison.
  { id: "littleSign", position: { col: 5, row: 14 } },
  // Boîte aux lettres de la première maison.
  { id: "mailbox", position: { col: 4, row: 7 } },
  // Porte de la première maison.
  { id: "houseDoor", position: { col: 6, row: 7 } },
  // Porte du bâtiment (immeuble de bureaux).
  { id: "buildingDoor", position: { col: 16, row: 13 } },
  // Boîte aux lettres de la seconde maison.
  { id: "mailbox2", position: { col: 13, row: 7 } },
  // Porte de la seconde maison.
  { id: "houseDoor2", position: { col: 15, row: 7 } },
  // Grand panneau en bois, près de la clôture de la seconde maison.
  { id: "bigSign2", position: { col: 16, row: 16 } },
];
