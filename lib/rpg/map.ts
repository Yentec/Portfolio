import type { GameMap } from "@/types/rpg";
import { TERRAIN_ATLAS } from "@/lib/rpg/constants";

/** Identifiants de tuile utilisés dans la grille de la carte de test. */
const T = {
  GRASS: 0,
  TREETL: 1,
  TREETM: 2,
  TREETR: 3,
  TREEML: 4,
  TREEMM: 5,
  TREEMR: 6,
  TREEBL: 7,
  TREEBM: 8,
  TREEBR: 9,
  WATERTL: 10,
  WATERTM: 11,
  WATERTR: 12,
  WATERML: 13,
  WATERMM: 14,
  WATERMR: 15,
  FENCEL: 16,
  FENCEM: 17,
  FENCER: 18,
  SIDEWALKTL: 19,
  SIDEWALKTM: 20,
  SIDEWALKTR: 21,
  SIDEWALKML: 22,
  SIDEWALKMM: 23,
  SIDEWALKMR: 24,
  SIDEWALKBL: 25,
  SIDEWALKBM: 26,
  SIDEWALKBR: 27,
  SIDEWALKATL: 28,
  SIDEWALKATR: 29,
  SIDEWALKABL: 30,
  SIDEWALKABR: 31,
  SIDEWALKMONOV: 32,
  SIDEWALKMONOH: 33,
  WOODENFENCEL: 34,
  WOODENFENCEM: 35,
  WOODENFENCER: 36,
  BIGSIGN: 37,
  LITTLESIGN: 38,
  FLOWERS: 39,
  MAILBOX: 40,
  HOUSEWALLTL: 41,
  HOUSEWALLTM: 42,
  HOUSEWALLTR: 43,
  HOUSEWALLML: 44,
  HOUSEWALLMM: 45,
  HOUSEWALLMR: 46,
  HOUSEWALLBL: 47,
  HOUSEWALLBM: 48,
  HOUSEWALLBR: 49,
  LIGHTROOFTL: 50,
  LIGHTROOFTM: 51,
  LIGHTROOFTR: 52,
  LIGHTROOFBL: 53,
  LIGHTROOFBM: 54,
  LIGHTROOFBR: 55,
  HOUSEDOOR: 56,
  HOUSEWINDOW: 57,
  HOUSEWINDOWT: 58,
  HOUSEWINDOWB: 59,
  // HOUSEAC: 60,
  BUILDINGWALLTL: 61,
  BUILDINGWALLTM: 62,
  BUILDINGWALLTR: 63,
  BUILDINGWALLML: 64,
  BUILDINGWALLMM: 65,
  BUILDINGWALLMR: 66,
  BUILDINGWALLBL: 67,
  BUILDINGWALLBM: 68,
  BUILDINGWALLBR: 69,
  DARKROOFTL: 70,
  DARKROOFTM: 71,
  DARKROOFTR: 72,
  DARKROOFBL: 73,
  DARKROOFBM: 74,
  DARKROOFBR: 75,
  BUILDINGDOOR: 76,
  BUILDINGWINDOW: 77,
  BUILDINGWINDOWT: 78,
  BUILDINGWINDOWB: 79,
  CONSTRUCTIONBARRIER: 80,
} as const;

/** Tuiles qui bloquent le déplacement. */
const BLOCKING = new Set<number>([
  T.TREEMM,
  T.TREEBM,
  T.WATERTL,
  T.WATERTM,
  T.WATERTR,
  T.WATERML,
  T.WATERMR,
  T.FENCEL,
  T.FENCEM,
  T.FENCER,
  T.WOODENFENCEL,
  T.WOODENFENCEM,
  T.WOODENFENCER,
  T.BIGSIGN,
  T.LITTLESIGN,
  T.MAILBOX,
  T.HOUSEWALLTL,
  T.HOUSEWALLTM,
  T.HOUSEWALLTR,
  T.HOUSEWALLML,
  T.HOUSEWALLMM,
  T.HOUSEWALLMR,
  T.HOUSEWALLBL,
  T.HOUSEWALLBM,
  T.HOUSEWALLBR,
  T.LIGHTROOFBL,
  T.LIGHTROOFBM,
  T.LIGHTROOFBR,
  T.HOUSEDOOR,
  T.BUILDINGWALLTL,
  T.BUILDINGWALLTM,
  T.BUILDINGWALLTR,
  T.BUILDINGWALLML,
  T.BUILDINGWALLMM,
  T.BUILDINGWALLMR,
  T.BUILDINGWALLBL,
  T.BUILDINGWALLBM,
  T.BUILDINGWALLBR,
  T.DARKROOFBL,
  T.DARKROOFBM,
  T.DARKROOFBR,
  T.BUILDINGDOOR,
  T.CONSTRUCTIONBARRIER,
]);

/**
 * Décor de plan intermédiaire : dessiné entre le sol et le joueur, donc DERRIÈRE
 * lui (troncs d'arbre, arbre isolé…).
 */
const OVERLAY = new Set<number>([
  T.TREEBL,
  T.TREEBM,
  T.TREEBR,
  T.WATERTL,
  T.WATERTM,
  T.WATERTR,
  T.FENCEL,
  T.FENCEM,
  T.FENCER,
  T.WOODENFENCEL,
  T.WOODENFENCEM,
  T.WOODENFENCER,
  T.BIGSIGN,
  T.LITTLESIGN,
  T.FLOWERS,
  T.MAILBOX,
  T.HOUSEDOOR,
  T.BUILDINGDOOR,
  T.CONSTRUCTIONBARRIER,
]);

/**
 * Décor de premier plan : dessiné APRÈS le joueur, donc PAR-DESSUS lui — le joueur
 * passe « derrière » (haut + côtés des arbres = canopée). Choisis ici les tuiles
 * qui doivent recouvrir le joueur.
 */
const FRONT = new Set<number>([
  T.TREETL,
  T.TREETM,
  T.TREETR,
  T.TREEML,
  T.TREEMM,
  T.TREEMR,
  T.LIGHTROOFTL,
  T.LIGHTROOFTM,
  T.LIGHTROOFTR,
  T.DARKROOFTL,
  T.DARKROOFTM,
  T.DARKROOFTR,
]);

/** Toute tuile transparente (overlay ou front) : reçoit un sol opaque en dessous. */
const isDecor = (tile: number): boolean => OVERLAY.has(tile) || FRONT.has(tile);

/** Sol par défaut posé sous une tuile de décor transparente. */
const DEFAULT_GROUND = T.GRASS;

/**
 * Tuiles à empiler EN PLUS sur une case, dessinées PAR-DESSUS tout le reste
 * (couche de premier plan, donc aussi au-dessus du joueur). Clé `"row,col"` ->
 * tuiles du bas vers le haut. C'est ainsi qu'on met plusieurs tuiles sur une même
 * case. Les espaces dans la clé sont tolérés (`"20, 1"` == `"20,1"`).
 */
const STACK: Record<string, number[]> = {
  "0,12": [T.TREEMR],
  "0,13": [T.TREEML],
  "1,2": [T.TREETR],
  "1,12": [T.TREEBR],
  "1,13": [T.TREEBL],
  "1,22": [T.TREETL],
  "21,6": [T.TREEMR],
  "21,17": [T.TREEML],
  "2,2": [T.TREEMR],
  "3,2": [T.TREEMR],
  "4,2": [T.TREEMR],
  "5,2": [T.TREEMR],
  "6,2": [T.TREEMR],
  "7,2": [T.TREEMR],
  "8,2": [T.TREEMR],
  "9,2": [T.TREEMR],
  "10,2": [T.TREEMR],
  "11,2": [T.TREEMR],
  "12,2": [T.TREEMR],
  "13,2": [T.TREEMR],
  "14,2": [T.TREEMR],
  "15,2": [T.TREEMR],
  "16,2": [T.TREEMR],
  "17,2": [T.TREEMR],
  "18,2": [T.TREEMR],
  "19,2": [T.TREEMR],
  "20,2": [T.TREEMR],
  "1,21": [T.TREETL],
  "2,21": [T.TREEML],
  "3,21": [T.TREEML],
  "4,21": [T.TREEML],
  "5,21": [T.TREEML],
  "6,21": [T.TREEML],
  "7,21": [T.TREEML],
  "8,21": [T.TREEML],
  "9,21": [T.TREEML],
  "10,21": [T.TREEML],
  "11,21": [T.TREEML],
  "12,21": [T.TREEML],
  "13,21": [T.TREEML],
  "14,21": [T.TREEML],
  "15,21": [T.TREEML],
  "16,21": [T.TREEML],
  "17,21": [T.TREEML],
  "18,21": [T.TREEML],
  "19,21": [T.TREEML],
  "20,21": [T.TREEML],
  "3,5": [T.LIGHTROOFTL],
  "3,6": [T.LIGHTROOFTM],
  "3,7": [T.LIGHTROOFTM],
  "3,8": [T.LIGHTROOFTR],
  "3,14": [T.LIGHTROOFTL],
  "3,15": [T.LIGHTROOFTM],
  "3,16": [T.LIGHTROOFTM],
  "3,17": [T.LIGHTROOFTR],
  "7,7": [T.HOUSEWINDOW],
  "5,6": [T.HOUSEWINDOWT],
  "6,6": [T.HOUSEWINDOWB],
  "5,7": [T.HOUSEWINDOWT],
  "6,7": [T.HOUSEWINDOWB],
  "7,16": [T.HOUSEWINDOW],
  "5,15": [T.HOUSEWINDOWT],
  "6,15": [T.HOUSEWINDOWB],
  "5,16": [T.HOUSEWINDOWT],
  "6,16": [T.HOUSEWINDOWB],
  "9,13": [T.DARKROOFTL],
  "9,14": [T.DARKROOFTM],
  "9,15": [T.DARKROOFTM],
  "9,16": [T.DARKROOFTM],
  "9,17": [T.DARKROOFTM],
  "9,18": [T.DARKROOFTM],
  "9,19": [T.DARKROOFTR],
  "13,14": [T.BUILDINGWINDOW],
  "13,15": [T.BUILDINGWINDOW],
  "13,17": [T.BUILDINGWINDOW],
  "13,18": [T.BUILDINGWINDOW],
  "11,14": [T.BUILDINGWINDOWT],
  "12,14": [T.BUILDINGWINDOWB],
  "11,15": [T.BUILDINGWINDOWT],
  "12,15": [T.BUILDINGWINDOWB],
  "11,16": [T.BUILDINGWINDOWT],
  "12,16": [T.BUILDINGWINDOWB],
  "11,17": [T.BUILDINGWINDOWT],
  "12,17": [T.BUILDINGWINDOWB],
  "11,18": [T.BUILDINGWINDOWT],
  "12,18": [T.BUILDINGWINDOWB],
};

/**
 * Sol imposé pour des cases précises, **indépendant de la couche décor**.
 * Clé `"row,col"` -> id de tuile de sol. Une case absente utilise le sol dérivé
 * de LAYOUT (herbe sous un décor, sinon la tuile elle-même).
 * Change ici le fond sans jamais toucher à l'overlay.
 */
const GROUND_OVERRIDE: Record<string, number> = {
  // "9,12": T.PLAZA,   // exemple : plaza sous le coin haut-gauche du grand arbre
  "18,7": T.SIDEWALKML,
  "18,10": T.SIDEWALKMM,
  "0,13": T.SIDEWALKMR,
};

/** Correspondance identifiant de tuile -> coordonnées dans l'atlas. */
export const TILE_ATLAS_LOOKUP: Record<number, { col: number; row: number }> = {
  [T.GRASS]: TERRAIN_ATLAS.grass,
  [T.TREETL]: TERRAIN_ATLAS.treeTL,
  [T.TREETM]: TERRAIN_ATLAS.treeTM,
  [T.TREETR]: TERRAIN_ATLAS.treeTR,
  [T.TREEML]: TERRAIN_ATLAS.treeML,
  [T.TREEMM]: TERRAIN_ATLAS.treeMM,
  [T.TREEMR]: TERRAIN_ATLAS.treeMR,
  [T.TREEBL]: TERRAIN_ATLAS.treeBL,
  [T.TREEBM]: TERRAIN_ATLAS.treeBM,
  [T.TREEBR]: TERRAIN_ATLAS.treeBR,
  [T.WATERTL]: TERRAIN_ATLAS.waterTL,
  [T.WATERTM]: TERRAIN_ATLAS.waterTM,
  [T.WATERTR]: TERRAIN_ATLAS.waterTR,
  [T.WATERML]: TERRAIN_ATLAS.waterML,
  [T.WATERMM]: TERRAIN_ATLAS.waterMM,
  [T.WATERMR]: TERRAIN_ATLAS.waterMR,
  [T.FENCEL]: TERRAIN_ATLAS.fenceL,
  [T.FENCEM]: TERRAIN_ATLAS.fenceM,
  [T.FENCER]: TERRAIN_ATLAS.fenceR,
  [T.SIDEWALKTL]: TERRAIN_ATLAS.sidewalkTL,
  [T.SIDEWALKTM]: TERRAIN_ATLAS.sidewalkTM,
  [T.SIDEWALKTR]: TERRAIN_ATLAS.sidewalkTR,
  [T.SIDEWALKML]: TERRAIN_ATLAS.sidewalkML,
  [T.SIDEWALKMM]: TERRAIN_ATLAS.sidewalkMM,
  [T.SIDEWALKMR]: TERRAIN_ATLAS.sidewalkMR,
  [T.SIDEWALKBL]: TERRAIN_ATLAS.sidewalkBL,
  [T.SIDEWALKBM]: TERRAIN_ATLAS.sidewalkBM,
  [T.SIDEWALKBR]: TERRAIN_ATLAS.sidewalkBR,
  [T.SIDEWALKATL]: TERRAIN_ATLAS.sidewalkATL,
  [T.SIDEWALKATR]: TERRAIN_ATLAS.sidewalkATR,
  [T.SIDEWALKABL]: TERRAIN_ATLAS.sidewalkABL,
  [T.SIDEWALKABR]: TERRAIN_ATLAS.sidewalkABR,
  [T.SIDEWALKMONOV]: TERRAIN_ATLAS.sidewalkMonoV,
  [T.SIDEWALKMONOH]: TERRAIN_ATLAS.sidewalkMonoH,
  [T.WOODENFENCEL]: TERRAIN_ATLAS.woodenFenceL,
  [T.WOODENFENCEM]: TERRAIN_ATLAS.woodenFenceM,
  [T.WOODENFENCER]: TERRAIN_ATLAS.woodenFenceR,
  [T.BIGSIGN]: TERRAIN_ATLAS.bigSign,
  [T.LITTLESIGN]: TERRAIN_ATLAS.littleSign,
  [T.FLOWERS]: TERRAIN_ATLAS.flowers,
  [T.MAILBOX]: TERRAIN_ATLAS.mailbox,
  [T.HOUSEWALLTL]: TERRAIN_ATLAS.houseWallTL,
  [T.HOUSEWALLTM]: TERRAIN_ATLAS.houseWallTM,
  [T.HOUSEWALLTR]: TERRAIN_ATLAS.houseWallTR,
  [T.HOUSEWALLML]: TERRAIN_ATLAS.houseWallML,
  [T.HOUSEWALLMM]: TERRAIN_ATLAS.houseWallMM,
  [T.HOUSEWALLMR]: TERRAIN_ATLAS.houseWallMR,
  [T.HOUSEWALLBL]: TERRAIN_ATLAS.houseWallBL,
  [T.HOUSEWALLBM]: TERRAIN_ATLAS.houseWallBM,
  [T.HOUSEWALLBR]: TERRAIN_ATLAS.houseWallBR,
  [T.LIGHTROOFTL]: TERRAIN_ATLAS.lightRoofTL,
  [T.LIGHTROOFTM]: TERRAIN_ATLAS.lightRoofTM,
  [T.LIGHTROOFTR]: TERRAIN_ATLAS.lightRoofTR,
  [T.LIGHTROOFBL]: TERRAIN_ATLAS.lightRoofBL,
  [T.LIGHTROOFBM]: TERRAIN_ATLAS.lightRoofBM,
  [T.LIGHTROOFBR]: TERRAIN_ATLAS.lightRoofBR,
  [T.HOUSEDOOR]: TERRAIN_ATLAS.houseDoor,
  [T.HOUSEWINDOW]: TERRAIN_ATLAS.houseWindow,
  [T.HOUSEWINDOWT]: TERRAIN_ATLAS.houseWindowT,
  [T.HOUSEWINDOWB]: TERRAIN_ATLAS.houseWindowB,
  // [T.HOUSEAC]: TERRAIN_ATLAS.houseAC,
  [T.BUILDINGWALLTL]: TERRAIN_ATLAS.buildingWallTL,
  [T.BUILDINGWALLTM]: TERRAIN_ATLAS.buildingWallTM,
  [T.BUILDINGWALLTR]: TERRAIN_ATLAS.buildingWallTR,
  [T.BUILDINGWALLML]: TERRAIN_ATLAS.buildingWallML,
  [T.BUILDINGWALLMM]: TERRAIN_ATLAS.buildingWallMM,
  [T.BUILDINGWALLMR]: TERRAIN_ATLAS.buildingWallMR,
  [T.BUILDINGWALLBL]: TERRAIN_ATLAS.buildingWallBL,
  [T.BUILDINGWALLBM]: TERRAIN_ATLAS.buildingWallBM,
  [T.BUILDINGWALLBR]: TERRAIN_ATLAS.buildingWallBR,
  [T.DARKROOFTL]: TERRAIN_ATLAS.darkRoofTL,
  [T.DARKROOFTM]: TERRAIN_ATLAS.darkRoofTM,
  [T.DARKROOFTR]: TERRAIN_ATLAS.darkRoofTR,
  [T.DARKROOFBL]: TERRAIN_ATLAS.darkRoofBL,
  [T.DARKROOFBM]: TERRAIN_ATLAS.darkRoofBM,
  [T.DARKROOFBR]: TERRAIN_ATLAS.darkRoofBR,
  [T.BUILDINGDOOR]: TERRAIN_ATLAS.buildingDoor,
  [T.BUILDINGWINDOW]: TERRAIN_ATLAS.buildingWindow,
  [T.BUILDINGWINDOWT]: TERRAIN_ATLAS.buildingWindowT,
  [T.BUILDINGWINDOWB]: TERRAIN_ATLAS.buildingWindowB,
  [T.CONSTRUCTIONBARRIER]: TERRAIN_ATLAS.constructionBarrier,
};

// Bourg Canevas — 24 colonnes x 22 lignes. Village bordé d'arbres, deux maisons
// et un bâtiment reliés par des trottoirs autour d'une place centrale, un bassin.
// Sortie nord (col 12-13) volontairement bloquée : PNJ Skills sur col12,
// barrière (WOODENFENCEM) sur col13 — voir content/rpg/npcs.ts.
const LAYOUT: number[][] = [
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 22, 80, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 5, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 22, 24, 8, 8, 8, 8, 8, 8, 8, 8, 5, 5],
  [5, 5, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 31, 30, 20, 20, 20, 20, 20, 20, 21, 0, 5, 5],
  [5, 5, 22, 26, 26, 26, 26, 26, 26, 26, 29, 28, 26, 26, 26, 26, 26, 26, 26, 29, 24, 0, 5, 5],
  [5, 5, 32, 0, 0, 53, 54, 54, 55, 0, 22, 24, 0, 0, 53, 54, 54, 55, 0, 22, 24, 0, 5, 5],
  [5, 5, 32, 0, 0, 41, 42, 42, 43, 0, 22, 24, 0, 0, 41, 42, 42, 43, 0, 22, 24, 0, 5, 5],
  [5, 5, 32, 0, 0, 44, 45, 45, 46, 0, 22, 24, 0, 0, 44, 45, 45, 46, 0, 22, 24, 0, 5, 5],
  [5, 5, 32, 0, 40, 47, 56, 48, 49, 0, 22, 24, 0, 40, 47, 56, 48, 49, 0, 22, 24, 0, 5, 5],
  [5, 5, 22, 20, 20, 20, 20, 20, 20, 20, 31, 30, 20, 20, 20, 20, 20, 20, 20, 31, 24, 0, 5, 5],
  [5, 5, 22, 23, 23, 23, 23, 23, 23, 23, 23, 28, 26, 26, 26, 26, 26, 26, 26, 26, 24, 0, 5, 5],
  [5, 5, 22, 28, 26, 26, 26, 26, 26, 26, 29, 24, 0, 73, 74, 74, 74, 74, 74, 75, 32, 0, 5, 5],
  [5, 5, 22, 24, 0, 34, 35, 35, 36, 37, 22, 24, 0, 61, 62, 62, 62, 62, 62, 63, 32, 0, 5, 5],
  [5, 5, 22, 24, 0, 39, 39, 39, 39, 0, 22, 24, 0, 64, 65, 65, 65, 65, 65, 66, 32, 0, 5, 5],
  [5, 5, 22, 24, 0, 39, 39, 39, 39, 0, 22, 24, 0, 67, 68, 68, 76, 68, 68, 69, 32, 0, 5, 5],
  [5, 5, 22, 24, 0, 38, 0, 0, 0, 0, 22, 23, 33, 33, 33, 33, 33, 33, 33, 20, 24, 0, 5, 5],
  [5, 5, 22, 30, 20, 20, 20, 20, 20, 20, 31, 24, 0, 0, 0, 0, 0, 0, 0, 22, 24, 0, 5, 5],
  [5, 5, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 0, 34, 35, 36, 37, 34, 36, 22, 24, 0, 5, 5],
  [5, 5, 25, 26, 26, 26, 26, 29, 23, 23, 23, 30, 20, 20, 20, 20, 20, 20, 20, 31, 24, 0, 5, 5],
  [5, 5, 0, 0, 0, 0, 0, 10, 11, 11, 12, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 0, 5, 5],
  [5, 5, 0, 0, 0, 0, 0, 13, 14, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  [5, 5, 2, 2, 2, 2, 3, 13, 14, 14, 15, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 5, 5],
  [5, 5, 5, 5, 5, 5, 16, 13, 14, 14, 15, 16, 18, 16, 18, 16, 18, 16, 5, 5, 5, 5, 5, 5],
];

export function createTestMap(): GameMap {
  const rows = LAYOUT.length;
  const cols = LAYOUT[0]?.length ?? 0;

  // Couche sol : exception explicite si définie, sinon herbe sous un décor
  // transparent (overlay OU front), sinon la tuile authorée elle-même.
  const ground = LAYOUT.map((line, row) =>
    line.map((tile, col) => {
      const override = GROUND_OVERRIDE[`${row},${col}`];
      if (override !== undefined) return override;
      return isDecor(tile) ? DEFAULT_GROUND : tile;
    }),
  );

  // Chaque tuile empilée via STACK va sur la couche de son appartenance :
  // FRONT -> premier plan (devant le joueur), sinon -> intermédiaire (derrière).
  // Couche intermédiaire : décor de base (troncs) + extras non-FRONT. [] si rien.
  const overlay = LAYOUT.map((line, row) =>
    line.map((tile, col) => {
      const pile: number[] = OVERLAY.has(tile) ? [tile] : [];
      const extra = STACK[`${row},${col}`];
      if (extra) pile.push(...extra.filter((id) => !FRONT.has(id)));
      return pile;
    }),
  );

  // Couche de premier plan : canopée de base + extras FRONT empilés. [] si rien.
  const front = LAYOUT.map((line, row) =>
    line.map((tile, col) => {
      const pile: number[] = FRONT.has(tile) ? [tile] : [];
      const extra = STACK[`${row},${col}`];
      if (extra) pile.push(...extra.filter((id) => FRONT.has(id)));
      return pile;
    }),
  );

  const walkable = LAYOUT.map((line) => line.map((tile) => !BLOCKING.has(tile)));
  return { cols, rows, ground, overlay, front, walkable };
}

/** Juste après la porte nord (ouverture dans la haie d'arbres), face au village. */
export const PLAYER_START = { col: 12, row: 2 };

/** Nom du village (Canvas Town en anglais — clin d'œil au <canvas> qui le dessine, tout commence sur une toile vierge). */
export const VILLAGE_NAME = "Bourg Canevas";
