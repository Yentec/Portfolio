"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { GameEngine } from "@/lib/rpg/engine";
import { createTestMap, PLAYER_START } from "@/lib/rpg/map";
import { RENDERED_TILE, VIEWPORT_COLS, VIEWPORT_ROWS } from "@/lib/rpg/constants";
import { preloadAssets } from "@/lib/rpg/assets";
import { isInteractKey } from "@/lib/rpg/input";
import { npcs } from "@/content/rpg/npcs";
import { projects } from "@/content/projects";
import { LoadingScreen } from "@/components/rpg/LoadingScreen";
import { DialogueBox, type DialogueBoxHandle } from "@/components/rpg/DialogueBox";
import type { NpcId } from "@/types/rpg";

/** Budget vertical laissé au canvas — le reste va au padding et au texte d'aide sous le jeu. */
const MAX_VIEWPORT_HEIGHT_VH = 90;
const ASPECT_RATIO = VIEWPORT_COLS / VIEWPORT_ROWS;

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
  const projectsT = useTranslations("projects");

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const dialogueBoxRef = useRef<DialogueBoxHandle>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [displaySize, setDisplaySize] = useState<DisplaySize | null>(null);
  const [dialogue, dispatch] = useReducer(dialogueReducer, CLOSED_DIALOGUE);

  useEffect(() => {
    let cancelled = false;
    let engine: GameEngine | null = null;

    preloadAssets()
      .then((assets) => {
        if (cancelled) return; // démonté pendant le chargement : on n'instancie rien
        const canvas = canvasRef.current;
        if (!canvas) return;

        const map = createTestMap();
        // Canvas dimensionné à la fenêtre visible (viewport), pas à la carte
        // entière : la caméra (lib/rpg/camera.ts) suit le joueur et clippe le reste.
        canvas.width = VIEWPORT_COLS * RENDERED_TILE;
        canvas.height = VIEWPORT_ROWS * RENDERED_TILE;

        engine = new GameEngine(canvas, map, PLAYER_START, assets.tileset, npcs);
        engineRef.current = engine;
        engine.start();
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      engine?.destroy();
      engineRef.current = null;
    };
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

  // Touche d'interaction : ouvre un dialogue avec le PNJ à proximité, ou fait
  // avancer celui déjà ouvert. Échap ferme un dialogue en cours à tout moment.
  // Séparé des touches de mouvement (isGameKey), gérées par le moteur lui-même.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Escape") {
        if (dialogue.npcId) dispatch({ type: "CLOSE" });
        return;
      }
      if (!isInteractKey(e.code) || e.repeat) return;
      e.preventDefault();
      if (dialogue.npcId) {
        dialogueBoxRef.current?.advance();
        return;
      }
      const npc = engineRef.current?.getNearbyNpc();
      if (npc) dispatch({ type: "OPEN", npcId: npc.id });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dialogue.npcId]);

  // Le moteur suspend le mouvement du joueur et fait tourner le PNJ actif vers
  // lui tant qu'un dialogue est ouvert.
  useEffect(() => {
    engineRef.current?.setActiveNpc(dialogue.npcId);
  }, [dialogue.npcId]);

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
      {!ready && <LoadingScreen />}
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
        {lines && currentLine !== undefined && (
          <DialogueBox
            // Remonte à chaque ligne : réinitialise la machine à écrire sans effet de reset.
            key={`${dialogue.npcId}-${dialogue.lineIndex}`}
            ref={dialogueBoxRef}
            text={currentLine}
            advanceHint={t("advanceHint")}
            onAdvance={() => dispatch({ type: "ADVANCE", totalLines: lines.length })}
            link={link}
          />
        )}
      </div>
    </div>
  );
}
