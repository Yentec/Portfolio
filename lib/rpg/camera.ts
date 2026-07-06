import type { GameMap, PlayerState } from "@/types/rpg";
import { TILE_SIZE, VIEWPORT_COLS, VIEWPORT_ROWS } from "@/lib/rpg/constants";

/** Coin haut-gauche de la fenêtre visible, en pixels logiques (avant RENDER_SCALE). */
export type Camera = { x: number; y: number };

/**
 * Centre la caméra sur le joueur sans jamais montrer au-delà des bords de la
 * carte. Si la carte est plus petite que la fenêtre visible dans un axe, la
 * caméra reste à 0 sur cet axe et le moteur peint du noir autour (letterboxing,
 * voir engine.ts) plutôt que de laisser un résidu visuel.
 */
export function computeCamera(map: GameMap, player: PlayerState): Camera {
  const viewportWidth = VIEWPORT_COLS * TILE_SIZE;
  const viewportHeight = VIEWPORT_ROWS * TILE_SIZE;
  const mapWidth = map.cols * TILE_SIZE;
  const mapHeight = map.rows * TILE_SIZE;

  const targetX = player.position.x + TILE_SIZE / 2 - viewportWidth / 2;
  const targetY = player.position.y + TILE_SIZE / 2 - viewportHeight / 2;

  return {
    x: clamp(targetX, 0, Math.max(0, mapWidth - viewportWidth)),
    y: clamp(targetY, 0, Math.max(0, mapHeight - viewportHeight)),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
