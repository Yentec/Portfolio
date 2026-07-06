import type { Direction, GameMap, NpcDefinition, NpcId, SecretDefinition } from "@/types/rpg";
import { InputState, isGameKey } from "@/lib/rpg/input";
import { PlayerController } from "@/lib/rpg/player";
import {
  setupContext,
  drawMap,
  drawPlayer,
  drawForeground,
  drawNpcs,
  drawMapAscii,
  drawNpcsAscii,
  drawPlayerAscii,
} from "@/lib/rpg/render";
import { computeCamera } from "@/lib/rpg/camera";
import { RENDER_SCALE } from "@/lib/rpg/constants";
import { findNearbyNpc, npcBlockingTiles, toTile } from "@/lib/rpg/npc";
import { findNearbySecret } from "@/lib/rpg/secrets";
import type { AudioManager } from "@/lib/rpg/audio";

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private map: GameMap;
  private atlas: HTMLImageElement;
  private input = new InputState();
  private player: PlayerController;
  private npcs: NpcDefinition[];
  private npcBlocking: Set<string>;
  private secrets: SecretDefinition[];
  private audio: AudioManager;
  private reducedMotion: boolean;

  private rafId: number | null = null;
  private lastTime = 0;
  private running = false;
  /** PNJ en dialogue avec le joueur : mouvement suspendu, ce PNJ fait face au joueur. */
  private activeNpcId: NpcId | null = null;
  /** Vrai dès qu'un dialogue (PNJ ou secret) est ouvert : suspend le mouvement du joueur. */
  private dialogueOpen = false;
  /** Easter egg "debug view" : rendu ASCII au lieu du pixel art (touche ~). */
  private asciiMode = false;

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
    secrets: SecretDefinition[],
    audio: AudioManager,
    reducedMotion: boolean,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context indisponible");
    this.ctx = ctx;
    this.map = map;
    this.atlas = atlas;
    this.player = new PlayerController(start.col, start.row);
    this.npcs = npcs;
    this.npcBlocking = npcBlockingTiles(npcs);
    this.secrets = secrets;
    this.audio = audio;
    this.reducedMotion = reducedMotion;
    setupContext(ctx);
  }

  /** PNJ que le joueur regarde de face, à une case de distance, ou null — pour l'interaction. */
  getNearbyNpc(): NpcDefinition | null {
    return findNearbyNpc(this.npcs, this.player.state);
  }

  /** Easter egg à portée (sur la case du joueur, ou celle qu'il regarde), ou null. */
  getNearbySecret(): SecretDefinition | null {
    return findNearbySecret(this.secrets, this.player.state);
  }

  /**
   * PNJ actuellement en dialogue (ou null si aucun) : fait tourner ce PNJ vers
   * le joueur au lieu de son cycle idle aléatoire. Le mouvement, lui, est
   * suspendu via setDialogueOpen (PNJ ou secret, cf. plus bas).
   */
  setActiveNpc(npcId: NpcId | null): void {
    this.activeNpcId = npcId;
  }

  /** Suspend le mouvement du joueur tant qu'un dialogue (PNJ ou secret) est ouvert. */
  setDialogueOpen(open: boolean): void {
    this.dialogueOpen = open;
    if (open) this.input.clear();
  }

  /** Easter egg "debug view" (touche ~) : bascule entre pixel art et rendu ASCII. */
  toggleAsciiMode(): void {
    this.asciiMode = !this.asciiMode;
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

  /** Direction pressée depuis le D-pad tactile — contourne le mapping clavier (codes). */
  setTouchDirection(dir: Direction | null): void {
    this.input.clear();
    if (dir) this.input.pressDirection(dir);
  }

  private readonly tick = (now: number): void => {
    const dtMs = Math.min(now - this.lastTime, 100);
    this.lastTime = now;

    const wasMoving = this.player.state.moving;

    this.player.update(
      this.map,
      this.dialogueOpen ? null : this.input.current(),
      dtMs,
      this.npcBlocking,
    );

    // Un pas commence (transition idle -> mouvement) : un seul bruit par case, pas en continu.
    if (this.player.state.moving && !wasMoving) this.audio.playFootstep();

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

    if (this.asciiMode) {
      drawMapAscii(this.ctx, this.map);
      drawNpcsAscii(this.ctx, this.npcs);
      drawPlayerAscii(this.ctx, this.player.state);
    } else {
      const activeNpc = this.activeNpcId
        ? { id: this.activeNpcId, playerTile: toTile(this.player.state.position) }
        : undefined;

      drawMap(this.ctx, this.map, this.atlas);
      drawPlayer(this.ctx, this.atlas, this.player.state);
      drawNpcs(this.ctx, this.atlas, this.npcs, now, this.reducedMotion, activeNpc);
      drawForeground(this.ctx, this.map, this.atlas);
    }

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
