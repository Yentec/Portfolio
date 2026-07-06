import type {
  Direction,
  GameMap,
  GridPosition,
  NpcDefinition,
  NpcId,
  PlayerState,
} from "@/types/rpg";
import {
  CHARACTER_VARIANT,
  CHAR_BASE_COL,
  CHAR_ROWS_PER_VARIANT,
  DIRECTION_COL_OFFSET,
  IDLE_FRAME,
  RENDERED_TILE,
  RENDER_SCALE,
  TILE_SIZE,
} from "@/lib/rpg/constants";
import { TILE_ATLAS_LOOKUP } from "@/lib/rpg/map";
import { getDirectionToward, getNpcIdleState } from "@/lib/rpg/npc";

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
  drawCharacter(ctx, atlas, player, CHARACTER_VARIANT.player);
}

/**
 * Dessine les PNJ à leur case fixe, avec une légère animation d'idle (voir
 * getNpcIdleState) — jamais de déplacement réel, la case ne change pas.
 * `activeNpc` : le PNJ actuellement en dialogue fait face au joueur au lieu
 * de suivre son cycle de rotation aléatoire. `reducedMotion` : désactive ce
 * cycle pour tout le monde (animation non essentielle) — direction fixe "down".
 * `npc.fixedDirection` : idem, mais pour un PNJ précis en toute circonstance
 * (ex. "guard", sentinelle immobile) — reste prioritaire sur `reducedMotion`.
 */
export function drawNpcs(
  ctx: CanvasRenderingContext2D,
  atlas: HTMLImageElement,
  npcs: NpcDefinition[],
  now: number,
  reducedMotion: boolean,
  activeNpc?: { id: NpcId; playerTile: GridPosition },
): void {
  for (const npc of npcs) {
    const state =
      activeNpc && npc.id === activeNpc.id
        ? {
            direction: getDirectionToward(npc.position, activeNpc.playerTile),
            animFrame: IDLE_FRAME,
          }
        : npc.fixedDirection
          ? { direction: npc.fixedDirection, animFrame: IDLE_FRAME }
          : reducedMotion
            ? { direction: "down" as const, animFrame: IDLE_FRAME }
            : getNpcIdleState(npc, now);
    drawCharacter(
      ctx,
      atlas,
      {
        position: { x: npc.position.col * TILE_SIZE, y: npc.position.row * TILE_SIZE },
        ...state,
      },
      npc.variant,
    );
  }
}

/**
 * Mode ASCII — easter egg "debug view" : la carte, le joueur et les PNJ
 * rendus en caractères plutôt qu'en pixel art (# mur, . sol franchissable,
 * lettre = initiale du PNJ, @ = joueur). Réutilise `map.walkable`, déjà
 * calculée, plutôt que de reclasser les tuiles.
 */
export function drawMapAscii(ctx: CanvasRenderingContext2D, map: GameMap): void {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, map.cols * RENDERED_TILE, map.rows * RENDERED_TILE);
  ctx.font = `${Math.round(RENDERED_TILE * 0.6)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#39d353";
  for (let row = 0; row < map.rows; row++) {
    for (let col = 0; col < map.cols; col++) {
      const char = map.walkable[row]?.[col] ? "." : "#";
      ctx.fillText(
        char,
        col * RENDERED_TILE + RENDERED_TILE / 2,
        row * RENDERED_TILE + RENDERED_TILE / 2,
      );
    }
  }
}

export function drawNpcsAscii(ctx: CanvasRenderingContext2D, npcs: NpcDefinition[]): void {
  ctx.fillStyle = "#39d353";
  ctx.font = `bold ${Math.round(RENDERED_TILE * 0.6)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const npc of npcs) {
    const cx = npc.position.col * RENDERED_TILE + RENDERED_TILE / 2;
    const cy = npc.position.row * RENDERED_TILE + RENDERED_TILE / 2;
    ctx.fillText(npc.id[0]?.toUpperCase() ?? "?", cx, cy);
  }
}

export function drawPlayerAscii(ctx: CanvasRenderingContext2D, player: PlayerState): void {
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.round(RENDERED_TILE * 0.6)}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const cx = (player.position.x + TILE_SIZE / 2) * RENDER_SCALE;
  const cy = (player.position.y + TILE_SIZE / 2) * RENDER_SCALE;
  ctx.fillText("@", cx, cy);
}
