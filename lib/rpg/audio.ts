const MUSIC_SRC = "/rpg/audio/music-theme.ogg";
const FOOTSTEP_SRC = "/rpg/audio/sfx-footstep.ogg";
const DIALOGUE_OPEN_SRC = "/rpg/audio/sfx-dialogue-open.ogg";

async function loadBuffer(ctx: AudioContext, src: string): Promise<AudioBuffer> {
  const response = await fetch(src);
  const data = await response.arrayBuffer();
  return ctx.decodeAudioData(data);
}

/**
 * Musique (en boucle) + effets, Web Audio API native. Le AudioContext est créé
 * immédiatement au constructeur — construire un contexte et décoder des buffers
 * est autorisé sans geste utilisateur, ce n'est que la LECTURE qui est bloquée
 * par les navigateurs. Rien ne devient audible avant `enable()`, qui ne doit
 * être appelé que depuis un vrai geste (clic sur le bouton mute du HUD) : c'est
 * ce qui garantit qu'aucun son ne joue avant interaction.
 */
export class AudioManager {
  private ctx: AudioContext;
  private musicGain: GainNode;
  private musicBuffer: AudioBuffer | null = null;
  private footstepBuffer: AudioBuffer | null = null;
  private dialogueOpenBuffer: AudioBuffer | null = null;
  private musicSource: AudioBufferSourceNode | null = null;
  private muted = true;

  constructor() {
    this.ctx = new AudioContext();
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0;
    this.musicGain.connect(this.ctx.destination);
  }

  /** Précharge les 3 sons. Peut être appelé sans geste utilisateur (décoder n'est pas jouer). */
  async load(): Promise<void> {
    const [music, footstep, dialogueOpen] = await Promise.all([
      loadBuffer(this.ctx, MUSIC_SRC),
      loadBuffer(this.ctx, FOOTSTEP_SRC),
      loadBuffer(this.ctx, DIALOGUE_OPEN_SRC),
    ]);
    this.musicBuffer = music;
    this.footstepBuffer = footstep;
    this.dialogueOpenBuffer = dialogueOpen;
  }

  /** Active le son. À appeler uniquement depuis un geste utilisateur réel. */
  async enable(): Promise<void> {
    this.muted = false;
    if (this.ctx.state === "suspended") await this.ctx.resume();
    this.startMusic();
    this.musicGain.gain.value = 1;
  }

  /** Coupe le son. La musique continue de tourner en silence — pas de redémarrage au réveil. */
  disable(): void {
    this.muted = true;
    this.musicGain.gain.value = 0;
  }

  private startMusic(): void {
    if (!this.musicBuffer || this.musicSource) return;
    const source = this.ctx.createBufferSource();
    source.buffer = this.musicBuffer;
    source.loop = true;
    source.connect(this.musicGain);
    source.start();
    this.musicSource = source;
  }

  private playOneShot(buffer: AudioBuffer | null): void {
    if (!buffer || this.muted) return;
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    source.start();
  }

  playFootstep(): void {
    this.playOneShot(this.footstepBuffer);
  }

  playDialogueOpen(): void {
    this.playOneShot(this.dialogueOpenBuffer);
  }

  /** Arrête la musique et ferme le contexte — à appeler au démontage. */
  destroy(): void {
    this.musicSource?.stop();
    this.musicSource = null;
    void this.ctx.close();
  }
}
