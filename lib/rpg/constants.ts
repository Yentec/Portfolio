import type { Direction } from "@/types/rpg";

/** Taille d'une tuile dans la grille logique (px). Atlas Kenney natif en 16px. */
export const TILE_SIZE = 16;

/** Facteur d'agrandissement au rendu. 16 * 3 = 48px à l'écran. */
export const RENDER_SCALE = 3;

/** Taille d'une tuile à l'écran. */
export const RENDERED_TILE = TILE_SIZE * RENDER_SCALE;

export const PLAYER_SPEED = TILE_SIZE * 4;
export const WALK_FRAME_DURATION = 130;

// --- Atlas : Kenney "RPG Urban Pack" (CC0 1.0) — tilemap_packed.png -------

export const ATLAS_PATH = "/rpg/tileset.png";

/**
 * Bloc personnage : 4 colonnes (direction) x 3 lignes (frame de marche)
 * par variante, 6 variantes empilées verticalement. Confirmé visuellement
 * (col2 = dos sans visage = haut ; col1 = visage de face = bas ;
 * col0/col3 = paire miroir exacte = gauche/droite).
 */
export const CHAR_BASE_COL = 23;
export const CHAR_ROWS_PER_VARIANT = 3;

export const DIRECTION_COL_OFFSET: Record<Direction, number> = {
  left: 0,
  down: 1,
  up: 2,
  right: 3,
};

/** Index de ligne (frame) à l'arrêt et séquence de marche (au sein des 3 frames). */
export const IDLE_FRAME = 0;
export const WALK_FRAME_SEQUENCE = [0, 1, 2, 1] as const;

/**
 * Indices de variante de personnage (= ligne de départ / CHAR_ROWS_PER_VARIANT).
 * 6 variantes dispo : 1 joueur + 5 PNJ, sans sourcer d'autre asset.
 */
export const CHARACTER_VARIANT = {
  player: 1,
  npcAbout: 0,
  npcServices: 2,
  npcSkills: 3,
  npcProjects: 4,
  npcContact: 5,
} as const;

/**
 * Tuiles de terrain repérées dans l'atlas (col, row). Choix visuels,
 * purement cosmétiques — à ajuster librement à l'œil une fois le rendu
 * visible, aucune logique n'en dépend.
 */
export const TERRAIN_ATLAS = {
  grass: { col: 1, row: 1 },
  treeTL: { col: 18, row: 8 },
  treeTM: { col: 19, row: 8 },
  treeTR: { col: 20, row: 8 },
  treeML: { col: 18, row: 9 },
  treeMM: { col: 19, row: 9 },
  treeMR: { col: 20, row: 9 },
  treeBL: { col: 18, row: 10 },
  treeBM: { col: 19, row: 10 },
  treeBR: { col: 20, row: 10 },
  waterTL: { col: 8, row: 6 },
  waterTM: { col: 9, row: 6 },
  waterTR: { col: 10, row: 6 },
  waterML: { col: 8, row: 7 },
  waterMM: { col: 9, row: 7 },
  waterMR: { col: 10, row: 7 },
  fenceL: { col: 4, row: 13 },
  fenceM: { col: 5, row: 13 },
  fenceR: { col: 6, row: 13 },
  sidewalkTL: { col: 8, row: 0 },
  sidewalkTM: { col: 9, row: 0 },
  sidewalkTR: { col: 10, row: 0 },
  sidewalkML: { col: 8, row: 1 },
  sidewalkMM: { col: 9, row: 1 },
  sidewalkMR: { col: 10, row: 1 },
  sidewalkBL: { col: 8, row: 2 },
  sidewalkBM: { col: 9, row: 2 },
  sidewalkBR: { col: 10, row: 2 },
  sidewalkATL: { col: 13, row: 0 },
  sidewalkATR: { col: 14, row: 0 },
  sidewalkABL: { col: 13, row: 1 },
  sidewalkABR: { col: 14, row: 1 },
  sidewalkMonoV: { col: 15, row: 1 },
  sidewalkMonoH: { col: 12, row: 2 },
  woodenFenceL: { col: 4, row: 14 },
  woodenFenceM: { col: 5, row: 14 },
  woodenFenceR: { col: 6, row: 14 },
  bigSign: { col: 7, row: 9 },
  littleSign: { col: 7, row: 8 },
  flowers: { col: 7, row: 10 },
  mailbox: { col: 8, row: 11 },
  houseWallTL: { col: 17, row: 0 },
  houseWallTM: { col: 18, row: 0 },
  houseWallTR: { col: 19, row: 0 },
  houseWallML: { col: 17, row: 1 },
  houseWallMM: { col: 18, row: 1 },
  houseWallMR: { col: 19, row: 1 },
  houseWallBL: { col: 17, row: 3 },
  houseWallBM: { col: 18, row: 3 },
  houseWallBR: { col: 19, row: 3 },
  lightRoofTL: { col: 8, row: 3 },
  lightRoofTM: { col: 9, row: 3 },
  lightRoofTR: { col: 10, row: 3 },
  lightRoofBL: { col: 8, row: 5 },
  lightRoofBM: { col: 9, row: 5 },
  lightRoofBR: { col: 10, row: 5 },
  houseDoor: { col: 11, row: 10 },
  houseWindow: { col: 12, row: 14 },
  houseWindowT: { col: 11, row: 13 },
  houseWindowB: { col: 11, row: 14 },
  houseAC: { col: 9, row: 12 },
  buildingWallTL: { col: 17, row: 4 },
  buildingWallTM: { col: 18, row: 4 },
  buildingWallTR: { col: 19, row: 4 },
  buildingWallML: { col: 17, row: 6 },
  buildingWallMM: { col: 18, row: 6 },
  buildingWallMR: { col: 19, row: 6 },
  buildingWallBL: { col: 17, row: 7 },
  buildingWallBM: { col: 18, row: 7 },
  buildingWallBR: { col: 19, row: 7 },
  darkRoofTL: { col: 0, row: 3 },
  darkRoofTM: { col: 1, row: 3 },
  darkRoofTR: { col: 2, row: 3 },
  darkRoofBL: { col: 0, row: 5 },
  darkRoofBM: { col: 1, row: 5 },
  darkRoofBR: { col: 2, row: 5 },
  buildingDoor: { col: 12, row: 10 },
  buildingWindow: { col: 12, row: 17 },
  buildingWindowT: { col: 11, row: 16 },
  buildingWindowB: { col: 11, row: 17 },
} as const;

/** Vecteurs de déplacement par direction (en tuiles). */
export const DIRECTION_DELTA: Record<Direction, { col: number; row: number }> = {
  down: { col: 0, row: 1 },
  left: { col: -1, row: 0 },
  right: { col: 1, row: 0 },
  up: { col: 0, row: -1 },
};
