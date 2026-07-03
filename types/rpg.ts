export type Direction = "down" | "left" | "right" | "up";

export type Vector2 = { x: number; y: number };

/** Position sur la grille logique (en tuiles, pas en pixels). */
export type GridPosition = { col: number; row: number };

export type PlayerState = {
  /** Position en pixels (monde), pour un déplacement fluide. */
  position: Vector2;
  direction: Direction;
  /** true tant qu'un déplacement case-à-case est en cours. */
  moving: boolean;
  /** Frame d'animation de marche courante. */
  animFrame: number;
};

/** Grille de la carte : indices de tuiles. -1 = vide. */
export type TileGrid = number[][];

/** Grille en pile : chaque case contient une liste de tuiles (du bas vers le haut). */
export type TileStackGrid = number[][][];

/** Grille de collision parallèle : true = franchissable. */
export type WalkableGrid = boolean[][];

export type GameMap = {
  cols: number;
  rows: number;
  /** Couche de sol, toujours opaque (herbe, plaza, eau…). Dessinée en premier. */
  ground: TileGrid;
  /** Couche décor derrière le joueur (troncs…). Pile de tuiles par case, [] = vide. */
  overlay: TileStackGrid;
  /** Couche de premier plan, dessinée APRÈS le joueur (canopée…). Pile par case, [] = vide. */
  front: TileStackGrid;
  walkable: WalkableGrid;
};

/**
 * Identifiant d'un PNJ = section du portfolio qu'il représente. Un PNJ par
 * projet réel (slugs de content/projects.ts) plutôt qu'un unique PNJ "projects".
 */
export type NpcId =
  | "about"
  | "services"
  | "skills"
  | "linkforge"
  | "feedbackflow"
  | "projets-clients"
  | "yachts-studio"
  | "contact";

/** Données structurelles d'un PNJ (le texte de dialogue vit dans messages/, pas ici). */
export type NpcDefinition = {
  id: NpcId;
  /** Position fixe sur la grille logique (en tuiles). */
  position: GridPosition;
  /** Index de variante dans le bloc personnage de l'atlas (voir CHARACTER_VARIANT). */
  variant: number;
};
