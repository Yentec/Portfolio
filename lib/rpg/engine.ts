import type { GameMap, NpcDefinition } from "@/types/rpg";
import { InputState, isGameKey } from "@/lib/rpg/input";
import { PlayerController } from "@/lib/rpg/player";
import { setupContext, drawMap, drawPlayer, drawForeground, drawNpcs } from "@/lib/rpg/render";
import { computeCamera } from "@/lib/rpg/camera";
import { RENDER_SCALE } from "@/lib/rpg/constants";
import { findNearbyNpc, npcBlockingTiles } from "@/lib/rpg/npc";

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private map: GameMap;
  private atlas: HTMLImageElement;
  private input = new InputState();
  private player: PlayerController;
  private npcs: NpcDefinition[];
  private npcBlocking: Set<string>;

  private rafId: number | null = null;
  private lastTime = 0;
  private running = false;
  /** true pendant qu'un dialogue est ouvert : mouvement du joueur suspendu. */
  private paused = false;

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
    npcs: NpcDefinition[],
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context indisponible");
    this.ctx = ctx;
    this.map = map;
    this.atlas = atlas;
    this.player = new PlayerController(start.col, start.row);
    this.npcs = npcs;
    this.npcBlocking = npcBlockingTiles(npcs);
    setupContext(ctx);
  }

  /** PNJ orthogonalement adjacent au joueur, ou null — pour l'interaction. */
  getNearbyNpc(): NpcDefinition | null {
    return findNearbyNpc(this.npcs, this.player.state);
  }

  /** Suspend/reprend le mouvement du joueur (dialogue ouvert). N'efface pas les touches en attente. */
  setPaused(paused: boolean): void {
    this.paused = paused;
    if (paused) this.input.clear();
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

    this.player.update(
      this.map,
      this.paused ? null : this.input.current(),
      dtMs,
      this.npcBlocking,
    );

    // Fond noir peint en espace écran (avant translate) : couvre tout le canvas
    // physique à chaque frame, donc pas de résidu de l'image précédente si la
    // carte ne remplit pas entièrement la fenêtre (bord de carte, petite carte).
    const { width, height } = this.ctx.canvas;
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, width, height);

    const camera = computeCamera(this.map, this.player.state);
    // Décalage arrondi au pixel physique entier : le joueur se déplace en continu
    // (position flottante), donc translate() recevrait sinon des valeurs à virgule.
    // En pixel art non lissé, un décalage fractionnaire fait trembler/dédoubler les
    // bords de tuiles d'une frame à l'autre — l'arrondi élimine ce jitter.
    const offsetX = Math.round(camera.x * RENDER_SCALE);
    const offsetY = Math.round(camera.y * RENDER_SCALE);

    this.ctx.save();
    this.ctx.translate(-offsetX, -offsetY);

    drawMap(this.ctx, this.map, this.atlas);
    drawPlayer(this.ctx, this.atlas, this.player.state);
    drawNpcs(this.ctx, this.atlas, this.npcs);
    drawForeground(this.ctx, this.map, this.atlas);

    this.ctx.restore();

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
