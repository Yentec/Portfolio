import type { GridPosition, NpcDefinition, PlayerState } from "@/types/rpg";
import { TILE_SIZE } from "@/lib/rpg/constants";

/** Position en tuiles déduite d'une position pixel (jamais fractionnaire au repos). */
function toTile(position: { x: number; y: number }): GridPosition {
  return { col: Math.round(position.x / TILE_SIZE), row: Math.round(position.y / TILE_SIZE) };
}

/** PNJ dont la case est orthogonalement adjacente à celle du joueur (portée d'interaction). */
export function findNearbyNpc(npcs: NpcDefinition[], player: PlayerState): NpcDefinition | null {
  const tile = toTile(player.position);
  return (
    npcs.find((npc) => {
      const dc = Math.abs(npc.position.col - tile.col);
      const dr = Math.abs(npc.position.row - tile.row);
      return dc + dr === 1;
    }) ?? null
  );
}

/** Cases occupées par les PNJ ("row,col") : bloquent le joueur comme un mur. */
export function npcBlockingTiles(npcs: NpcDefinition[]): Set<string> {
  return new Set(npcs.map((npc) => `${npc.position.row},${npc.position.col}`));
}
