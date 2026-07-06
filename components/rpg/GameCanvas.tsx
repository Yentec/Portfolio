"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { GameEngine } from "@/lib/rpg/engine";
import { createTestMap, PLAYER_START } from "@/lib/rpg/map";
import { RENDERED_TILE, VIEWPORT_COLS, VIEWPORT_ROWS } from "@/lib/rpg/constants";
import { preloadAssets } from "@/lib/rpg/assets";
import { AudioManager } from "@/lib/rpg/audio";
import { isInteractKey } from "@/lib/rpg/input";
import { npcs } from "@/content/rpg/npcs";
import { projects } from "@/content/projects";
import { IntroSequence } from "@/components/rpg/IntroSequence";
import { GameUI } from "@/components/rpg/GameUI";
import { MobileControls } from "@/components/rpg/MobileControls";
import { DialogueBox, type DialogueBoxHandle } from "@/components/rpg/DialogueBox";
import type { NpcId } from "@/types/rpg";

/** Budget vertical laissé au canvas — le reste va au padding et au texte d'aide sous le jeu. */
const MAX_VIEWPORT_HEIGHT_VH = 90;
const ASPECT_RATIO = VIEWPORT_COLS / VIEWPORT_ROWS;
/** Durée minimale d'affichage de l'intro, même si les assets chargent plus vite. */
const MIN_INTRO_MS = 10000;

type DisplaySize = { width: number; height: number };

type DialogueState = { npcId: NpcId | null; lineIndex: number };

type DialogueAction =
  | { type: "OPEN"; npcId: NpcId }
  | { type: "ADVANCE"; totalLines: number }
  | { type: "CLOSE" };

const CLOSED_DIALOGUE: DialogueState = { npcId: null, lineIndex: 0 };

function dialogueReducer(state: DialogueState, action: DialogueAction): DialogueState {
  switch (action.type) {
    case "OPEN":
      return { npcId: action.npcId, lineIndex: 0 };
    case "ADVANCE": {
      if (!state.npcId) return state;
      const next = state.lineIndex + 1;
      return next >= action.totalLines ? CLOSED_DIALOGUE : { ...state, lineIndex: next };
    }
    case "CLOSE":
      return CLOSED_DIALOGUE;
    default:
      return state;
  }
}

export function GameCanvas() {
  const t = useTranslations("rpgGame");
  const dialogues = t.raw("dialogues") as Record<NpcId, string[]>;
  const introLines = t.raw("introLines") as string[];
  const dpadLabels = t.raw("dpad") as Record<"up" | "down" | "left" | "right", string>;
  const actionLabels = t.raw("actions") as { interact: string; cancel: string };
  const projectsT = useTranslations("projects");

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const audioRef = useRef<AudioManager | null>(null);
  const dialogueBoxRef = useRef<DialogueBoxHandle>(null);

  const [assetsReady, setAssetsReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [error, setError] = useState(false);
  const [muted, setMuted] = useState(true);
  const [displaySize, setDisplaySize] = useState<DisplaySize | null>(null);
  const [dialogue, dispatch] = useReducer(dialogueReducer, CLOSED_DIALOGUE);

  const ready = assetsReady && introDone;

  // Précharge assets + audio en parallèle, crée le moteur et le gestionnaire
  // audio. Le AudioContext est créé tout de suite (autorisé sans geste), mais
  // reste muet tant que le joueur n'a pas cliqué sur le bouton du HUD. La
  // préférence reduced-motion est lue une fois ici (désactive la rotation
  // d'idle des PNJ) — pas besoin de la suivre en direct pour ce détail cosmétique.
  useEffect(() => {
    let cancelled = false;
    let engine: GameEngine | null = null;
    const audio = new AudioManager();
    audioRef.current = audio;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Promise.all([preloadAssets(), audio.load()])
      .then(([assets]) => {
        if (cancelled) return; // démonté pendant le chargement : on n'instancie rien
        const canvas = canvasRef.current;
        if (!canvas) return;

        const map = createTestMap();
        // Canvas dimensionné à la fenêtre visible (viewport), pas à la carte
        // entière : la caméra (lib/rpg/camera.ts) suit le joueur et clippe le reste.
        canvas.width = VIEWPORT_COLS * RENDERED_TILE;
        canvas.height = VIEWPORT_ROWS * RENDERED_TILE;

        engine = new GameEngine(
          canvas,
          map,
          PLAYER_START,
          assets.tileset,
          npcs,
          audio,
          reducedMotion,
        );
        engineRef.current = engine;
        engine.start();
        setAssetsReady(true);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      engine?.destroy();
      engineRef.current = null;
      audio.destroy();
      audioRef.current = null;
    };
  }, []);

  // Durée minimale de lecture de l'intro, indépendante de la vitesse réelle du
  // chargement — sans ça, sur un chargement rapide, l'intro n'aurait pas le
  // temps d'être lue avant de disparaître.
  useEffect(() => {
    const timeout = setTimeout(() => setIntroDone(true), MIN_INTRO_MS);
    return () => clearTimeout(timeout);
  }, []);

  // Taille d'affichage calculée en JS plutôt qu'en CSS pur (calc()/min()/
  // aspect-ratio en cascade se sont montrés peu fiables ici) : la plus grande
  // possible qui tient à la fois dans le conteneur et dans le budget vertical,
  // en préservant le ratio du jeu. Ne touche jamais à la résolution interne du
  // canvas (VIEWPORT_COLS/ROWS), seulement sa taille affichée.
  useEffect(() => {
    function updateSize() {
      const container = containerRef.current;
      if (!container) return;
      const maxHeight = window.innerHeight * (MAX_VIEWPORT_HEIGHT_VH / 100);
      const widthFromHeight = maxHeight * ASPECT_RATIO;
      const width = Math.min(container.clientWidth, widthFromHeight);
      setDisplaySize({ width, height: width / ASPECT_RATIO });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Interagir : ouvre un dialogue avec le PNJ à proximité, ou fait avancer
  // celui déjà ouvert. Partagé entre la touche clavier (Entrée/Espace) et le
  // bouton A tactile.
  const handleInteract = useCallback(() => {
    if (dialogue.npcId) {
      dialogueBoxRef.current?.advance();
      return;
    }
    const npc = engineRef.current?.getNearbyNpc();
    if (npc) {
      dispatch({ type: "OPEN", npcId: npc.id });
      audioRef.current?.playDialogueOpen();
    }
  }, [dialogue.npcId]);

  // Annuler : ferme un dialogue en cours. Partagé entre Échap et le bouton B tactile.
  const handleCancel = useCallback(() => {
    if (dialogue.npcId) dispatch({ type: "CLOSE" });
  }, [dialogue.npcId]);

  // Séparé des touches de mouvement (isGameKey), gérées par le moteur lui-même.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Escape") {
        handleCancel();
        return;
      }
      if (!isInteractKey(e.code) || e.repeat) return;
      e.preventDefault();
      handleInteract();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleInteract, handleCancel]);

  // Le moteur suspend le mouvement du joueur et fait tourner le PNJ actif vers
  // lui tant qu'un dialogue est ouvert.
  useEffect(() => {
    engineRef.current?.setActiveNpc(dialogue.npcId);
  }, [dialogue.npcId]);

  function handleToggleMute() {
    if (muted) {
      void audioRef.current?.enable();
      setMuted(false);
    } else {
      audioRef.current?.disable();
      setMuted(true);
    }
  }

  if (error) {
    return (
      <p role="alert" className="text-[14px] text-red-600 dark:text-red-400">
        Impossible de charger le mode RPG. Réessaie plus tard.
      </p>
    );
  }

  const lines = dialogue.npcId ? dialogues[dialogue.npcId] : null;
  const currentLine = lines?.[dialogue.lineIndex];

  // PNJ projet avec étude de cas publiée uniquement (LinkForge, FeedbackFlow) :
  // Projets clients et Yachts-Studio n'ont pas de caseStudySlug, pas de lien.
  const project = dialogue.npcId ? projects.find((p) => p.slug === dialogue.npcId) : undefined;
  const link = project?.caseStudySlug
    ? { href: `/projects/${project.caseStudySlug}`, label: projectsT("caseStudyLabel") }
    : undefined;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Toujours monté, même pendant l'intro : mode classique et mute doivent
          rester accessibles à tout moment. */}
      <GameUI
        muted={muted}
        onToggleMute={handleToggleMute}
        muteLabel={muted ? t("enableSoundLabel") : t("disableSoundLabel")}
        classicModeLabel={t("classicModeLabel")}
        helpLabel={t("helpLabel")}
        helpLines={[t("movementHint"), t("interactHint"), t("escapeHint")]}
        mobileHelpLines={[t("mobileMovementHint"), t("mobileInteractHint"), t("mobileCancelHint")]}
      />
      {!ready && (
        <IntroSequence
          title={t("introTitle")}
          lines={introLines}
          skipLabel={t("skipIntro")}
          onSkip={() => setIntroDone(true)}
        />
      )}
      {/* Boîte dimensionnée exactement comme le canvas affiché : la dialogue box
          (absolute) reste ainsi confinée à la fenêtre de jeu visible, jamais
          au-delà (le conteneur externe, lui, est pleine largeur de la page). */}
      <div
        className={ready ? "relative mx-auto" : "hidden"}
        style={{ width: displaySize?.width, height: displaySize?.height }}
      >
        <canvas
          ref={canvasRef}
          className="border-line block size-full rounded-lg border"
          style={{ imageRendering: "pixelated" }}
          aria-label="Carte du mode RPG"
        />
        {ready && (
          <MobileControls
            dpadLabels={dpadLabels}
            actionLabels={actionLabels}
            onDirection={(dir) => engineRef.current?.setTouchDirection(dir)}
            onInteract={handleInteract}
            onCancel={handleCancel}
          />
        )}
        {lines && currentLine !== undefined && (
          <DialogueBox
            // Remonte à chaque ligne : réinitialise la machine à écrire sans effet de reset.
            key={`${dialogue.npcId}-${dialogue.lineIndex}`}
            ref={dialogueBoxRef}
            text={currentLine}
            advanceHint={t("advanceHint")}
            onAdvance={() => {
              // Même bip qu'à l'ouverture, mais pas sur la dernière ligne : fermer
              // le dialogue n'est pas "passer" à une nouvelle ligne.
              const isLastLine = dialogue.lineIndex + 1 >= lines.length;
              if (!isLastLine) audioRef.current?.playDialogueOpen();
              dispatch({ type: "ADVANCE", totalLines: lines.length });
            }}
            link={link}
          />
        )}
      </div>
    </div>
  );
}
