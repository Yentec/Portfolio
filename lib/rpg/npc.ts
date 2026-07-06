import type { Direction, GridPosition, NpcDefinition, PlayerState } from "@/types/rpg";
import { DIRECTION_DELTA, IDLE_FRAME, TILE_SIZE } from "@/lib/rpg/constants";

/** Position en tuiles déduite d'une position pixel (jamais fractionnaire au repos). */
export function toTile(position: { x: number; y: number }): GridPosition {
  return { col: Math.round(position.x / TILE_SIZE), row: Math.round(position.y / TILE_SIZE) };
}

/** Case immédiatement devant le joueur, dans la direction qu'il regarde. */
export function tileInFrontOf(player: PlayerState): GridPosition {
  const tile = toTile(player.position);
  const delta = DIRECTION_DELTA[player.direction];
  return { col: tile.col + delta.col, row: tile.row + delta.row };
}

/**
 * PNJ que le joueur regarde de face, à une case de distance — pas simplement
 * adjacent : interagir exige d'être tourné vers le PNJ, pas juste à côté.
 */
export function findNearbyNpc(npcs: NpcDefinition[], player: PlayerState): NpcDefinition | null {
  const facing = tileInFrontOf(player);
  return (
    npcs.find((npc) => npc.position.col === facing.col && npc.position.row === facing.row) ?? null
  );
}

/** Cases occupées par les PNJ ("row,col") : bloquent le joueur comme un mur. */
export function npcBlockingTiles(npcs: NpcDefinition[]): Set<string> {
  return new Set(npcs.map((npc) => `${npc.position.row},${npc.position.col}`));
}

const DIRECTIONS: Direction[] = ["down", "left", "right", "up"];
const TURN_INTERVAL_MS = 2500;

/** Hash simple et stable (pas besoin de qualité cryptographique, juste de la variété visuelle). */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash;
}

/**
 * Léger mouvement d'idle : le PNJ change de temps en temps de direction (il
 * regarde autour de lui), sans jamais quitter sa case ni animer de pas — juste
 * la frame idle dans la direction courante. Décalage par PNJ pour ne pas tous
 * tourner en même temps ; calculé sans état stocké à partir de l'horloge du
 * moteur. N'affecte ni la collision ni la logique de proximité.
 */
export function getNpcIdleState(
  npc: NpcDefinition,
  now: number,
): { direction: Direction; animFrame: number } {
  const offset = hashString(npc.id) % TURN_INTERVAL_MS;
  const slot = Math.floor((now + offset) / TURN_INTERVAL_MS);
  const index = hashString(`${npc.id}:${slot}`) % DIRECTIONS.length;
  return { direction: DIRECTIONS[index] ?? "down", animFrame: IDLE_FRAME };
}

/**
 * Direction à adopter par `from` pour faire face à `to`. Le joueur n'est jamais
 * qu'à une case d'écart en interaction (voir findNearbyNpc), donc l'un des deux
 * axes vaut toujours ±1 et l'autre 0 — pas d'ambiguïté diagonale à gérer.
 */
export function getDirectionToward(from: GridPosition, to: GridPosition): Direction {
  const dc = to.col - from.col;
  const dr = to.row - from.row;
  if (Math.abs(dc) >= Math.abs(dr)) return dc >= 0 ? "right" : "left";
  return dr >= 0 ? "down" : "up";
}
