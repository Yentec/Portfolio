import type { PlayerState, SecretDefinition } from "@/types/rpg";
import { tileInFrontOf, toTile } from "@/lib/rpg/npc";

/**
 * Secret sur la case du joueur (herbe, reflet…) ou sur la case qu'il regarde
 * (panneau, boîte aux lettres, porte… — des objets bloquants, impossibles à
 * fouler). Les deux mécaniques cohabitent selon que le secret est franchissable.
 */
export function findNearbySecret(
  secrets: SecretDefinition[],
  player: PlayerState,
): SecretDefinition | null {
  const tile = toTile(player.position);
  const facing = tileInFrontOf(player);
  return (
    secrets.find(
      (s) =>
        (s.position.col === tile.col && s.position.row === tile.row) ||
        (s.position.col === facing.col && s.position.row === facing.row),
    ) ?? null
  );
}
