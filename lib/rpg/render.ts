import type { Direction, GameMap, PlayerState } from "@/types/rpg";
import {
  CHAR_BASE_COL,
  CHAR_ROWS_PER_VARIANT,
  DIRECTION_COL_OFFSET,
  RENDERED_TILE,
  RENDER_SCALE,
  TILE_SIZE,
} from "@/lib/rpg/constants";
import { TILE_ATLAS_LOOKUP } from "@/lib/rpg/map";

/** Prépare le contexte pour du pixel art net (pas de flou au scaling). */
export function setupContext(ctx: CanvasRenderingContext2D): void {
  ctx.imageSmoothingEnabled = false;
}

/** Dessine une tuile de l'atlas à la position (col,row) de la grille écran. */
function drawAtlasTile(
  ctx: CanvasRenderingContext2D,
  atlas: HTMLImageElement,
  source: { col: number; row: number },
  destCol: number,
  destRow: number,
): void {
  ctx.drawImage(
    atlas,
    source.col * TILE_SIZE,
    source.row * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE,
    destCol * RENDERED_TILE,
    destRow * RENDERED_TILE,
    RENDERED_TILE,
    RENDERED_TILE,
  );
}

export function drawMap(
  ctx: CanvasRenderingContext2D,
  map: GameMap,
  atlas: HTMLImageElement,
): void {
  for (let row = 0; row < map.rows; row++) {
    for (let col = 0; col < map.cols; col++) {
      // 1) sol opaque : remplit la case, supprime le fond blanc.
      const groundId = map.ground[row]?.[col] ?? 0;
      const groundSrc = TILE_ATLAS_LOOKUP[groundId] ?? TILE_ATLAS_LOOKUP[0];
      if (groundSrc) drawAtlasTile(ctx, atlas, groundSrc, col, row);

      // 2) décor transparent derrière le joueur (troncs…), pile du bas vers le haut.
      const stack = map.overlay[row]?.[col];
      if (stack) {
        for (const id of stack) {
          const src = TILE_ATLAS_LOOKUP[id];
          if (src) drawAtlasTile(ctx, atlas, src, col, row);
        }
      }
    }
  }
}

/**
 * Dessine la couche de premier plan (canopée…) PAR-DESSUS le joueur.
 * À appeler après drawPlayer pour l'effet « passer derrière l'arbre ».
 */
export function drawForeground(
  ctx: CanvasRenderingContext2D,
  map: GameMap,
  atlas: HTMLImageElement,
): void {
  for (let row = 0; row < map.rows; row++) {
    for (let col = 0; col < map.cols; col++) {
      const stack = map.front[row]?.[col];
      if (!stack) continue;
      for (const id of stack) {
        const src = TILE_ATLAS_LOOKUP[id];
        if (src) drawAtlasTile(ctx, atlas, src, col, row);
      }
    }
  }
}

/**
 * Dessine le joueur (ou un PNJ via `variant`) à sa position pixel exacte,
 * en lisant la frame correcte dans le bloc personnage de l'atlas.
 * Le sprite source fait 16x16 mais peut déborder visuellement au-dessus
 * de sa case ; on le rend sur 1 tuile pour rester simple à ce stade.
 */
export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  atlas: HTMLImageElement,
  state: { position: { x: number; y: number }; direction: Direction; animFrame: number },
  variant: number,
): void {
  const col = CHAR_BASE_COL + DIRECTION_COL_OFFSET[state.direction];
  const row = variant * CHAR_ROWS_PER_VARIANT + state.animFrame;

  const dx = state.position.x * RENDER_SCALE;
  const dy = state.position.y * RENDER_SCALE;

  ctx.drawImage(
    atlas,
    col * TILE_SIZE,
    row * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE,
    dx,
    dy,
    RENDERED_TILE,
    RENDERED_TILE,
  );
}

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  atlas: HTMLImageElement,
  player: PlayerState,
): void {
  drawCharacter(ctx, atlas, player, 0); // variante 0 réservée au joueur
}
