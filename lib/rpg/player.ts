import type { Direction, GameMap, PlayerState } from "@/types/rpg";
import {
  DIRECTION_DELTA,
  PLAYER_SPEED,
  TILE_SIZE,
  WALK_FRAME_DURATION,
  WALK_FRAME_SEQUENCE,
  IDLE_FRAME,
} from "@/lib/rpg/constants";

/**
 * Contrôleur du joueur : encapsule l'état de mouvement et d'animation.
 * Une instance par partie ; pas d'état global de module.
 */
export class PlayerController {
  readonly state: PlayerState;
  private target: { x: number; y: number } | null = null;
  private animElapsed = 0;
  private animIndex = 0;

  constructor(startCol: number, startRow: number) {
    this.state = {
      position: { x: startCol * TILE_SIZE, y: startRow * TILE_SIZE },
      direction: "down",
      moving: false,
      animFrame: IDLE_FRAME,
    };
  }

  update(map: GameMap, requested: Direction | null, dtMs: number): void {
    const dt = dtMs / 1000;
    const s = this.state;

    if (!this.target && requested) {
      s.direction = requested;
      const delta = DIRECTION_DELTA[requested];
      const col = Math.round(s.position.x / TILE_SIZE) + delta.col;
      const row = Math.round(s.position.y / TILE_SIZE) + delta.row;
      if (this.canWalk(map, col, row)) {
        this.target = { x: col * TILE_SIZE, y: row * TILE_SIZE };
        s.moving = true;
      }
    }

    if (this.target) {
      const step = PLAYER_SPEED * dt;
      s.position.x = approach(s.position.x, this.target.x, step);
      s.position.y = approach(s.position.y, this.target.y, step);
      if (s.position.x === this.target.x && s.position.y === this.target.y) {
        this.target = null;
        s.moving = false;
      }
    }

    if (s.moving) {
      this.animElapsed += dtMs;
      if (this.animElapsed >= WALK_FRAME_DURATION) {
        this.animElapsed = 0;
        this.animIndex = (this.animIndex + 1) % WALK_FRAME_SEQUENCE.length;
      }
      s.animFrame = WALK_FRAME_SEQUENCE[this.animIndex] ?? IDLE_FRAME;
    } else {
      this.animElapsed = 0;
      this.animIndex = 0;
      s.animFrame = IDLE_FRAME;
    }
  }

  private canWalk(map: GameMap, col: number, row: number): boolean {
    if (row < 0 || row >= map.rows || col < 0 || col >= map.cols) return false;
    return map.walkable[row]?.[col] ?? false;
  }
}

function approach(value: number, goal: number, step: number): number {
  if (value < goal) return Math.min(value + step, goal);
  if (value > goal) return Math.max(value - step, goal);
  return value;
}
