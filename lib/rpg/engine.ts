import type { GameMap } from "@/types/rpg";
import { InputState, isGameKey } from "@/lib/rpg/input";
import { PlayerController } from "@/lib/rpg/player";
import { setupContext, drawMap, drawPlayer, drawForeground } from "@/lib/rpg/render";

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private map: GameMap;
  private atlas: HTMLImageElement;
  private input = new InputState();
  private player: PlayerController;

  private rafId: number | null = null;
  private lastTime = 0;
  private running = false;

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (isGameKey(e.code)) {
      e.preventDefault();
      this.input.press(e.code);
    }
  };

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    if (isGameKey(e.code)) this.input.release(e.code);
  };

  private readonly onBlur = (): void => this.input.clear();

  constructor(
    canvas: HTMLCanvasElement,
    map: GameMap,
    start: { col: number; row: number },
    atlas: HTMLImageElement,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context indisponible");
    this.ctx = ctx;
    this.map = map;
    this.atlas = atlas;
    this.player = new PlayerController(start.col, start.row);
    setupContext(ctx);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("blur", this.onBlur);
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  setTouchDirection(dir: Parameters<InputState["press"]>[0] | null): void {
    this.input.clear();
    if (dir) this.input.press(dir);
  }

  private readonly tick = (now: number): void => {
    const dtMs = Math.min(now - this.lastTime, 100);
    this.lastTime = now;

    this.player.update(this.map, this.input.current(), dtMs);

    drawMap(this.ctx, this.map, this.atlas);
    drawPlayer(this.ctx, this.atlas, this.player.state);
    drawForeground(this.ctx, this.map, this.atlas);

    if (this.running) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  destroy(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.onBlur);
    this.input.clear();
  }
}
