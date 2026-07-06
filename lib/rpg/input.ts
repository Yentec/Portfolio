import type { Direction } from "@/types/rpg";

const KEY_MAP: Record<string, Direction> = {
  ArrowDown: "down",
  ArrowUp: "up",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyS: "down",
  KeyW: "up",
  KeyA: "left",
  KeyD: "right",
};

/**
 * Suit les directions actuellement pressées. La dernière pressée prime,
 * ce qui donne un contrôle réactif au changement de direction.
 */
export class InputState {
  private pressed: Direction[] = [];

  press(code: string): void {
    const dir = KEY_MAP[code];
    if (dir) this.pressDirection(dir);
  }

  release(code: string): void {
    const dir = KEY_MAP[code];
    if (dir) this.releaseDirection(dir);
  }

  /** Presse une direction directement (D-pad tactile), sans passer par un code clavier. */
  pressDirection(dir: Direction): void {
    if (!this.pressed.includes(dir)) this.pressed.push(dir);
  }

  /** Relâche une direction directement (D-pad tactile). */
  releaseDirection(dir: Direction): void {
    this.pressed = this.pressed.filter((d) => d !== dir);
  }

  /** Direction active (la plus récemment pressée), ou null. */
  current(): Direction | null {
    return this.pressed.at(-1) ?? null;
  }

  clear(): void {
    this.pressed = [];
  }
}

/** Indique si une touche de jeu doit être interceptée (évite le scroll). */
export function isGameKey(code: string): boolean {
  return code in KEY_MAP;
}

/** Direction correspondant à un code de mouvement (flèches ou WASD/ZQSD), ou undefined. */
export function codeToDirection(code: string): Direction | undefined {
  return KEY_MAP[code];
}

/** Touches d'interaction (parler / avancer le dialogue) — distinctes du mouvement. */
const INTERACT_KEYS = new Set(["Enter", "Space"]);

export function isInteractKey(code: string): boolean {
  return INTERACT_KEYS.has(code);
}
