"use client";

import { useEffect, useRef, useState } from "react";
import { GameEngine } from "@/lib/rpg/engine";
import { createTestMap, PLAYER_START } from "@/lib/rpg/map";
import { RENDERED_TILE, VIEWPORT_COLS, VIEWPORT_ROWS } from "@/lib/rpg/constants";
import { preloadAssets } from "@/lib/rpg/assets";
import { LoadingScreen } from "@/components/rpg/LoadingScreen";

/** Budget vertical laissé au canvas — le reste va au padding et au texte d'aide sous le jeu. */
const MAX_VIEWPORT_HEIGHT_VH = 90;
const ASPECT_RATIO = VIEWPORT_COLS / VIEWPORT_ROWS;

type DisplaySize = { width: number; height: number };

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [displaySize, setDisplaySize] = useState<DisplaySize | null>(null);

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

        engine = new GameEngine(canvas, map, PLAYER_START, assets.tileset);
        engine.start();
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      engine?.destroy();
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

  if (error) {
    return (
      <p role="alert" className="text-[14px] text-red-600 dark:text-red-400">
        Impossible de charger le mode RPG. Réessaie plus tard.
      </p>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {!ready && <LoadingScreen />}
      <canvas
        ref={canvasRef}
        className={ready ? "border-line mx-auto block rounded-lg border" : "hidden"}
        style={{
          imageRendering: "pixelated",
          width: displaySize ? `${displaySize.width}px` : undefined,
          height: displaySize ? `${displaySize.height}px` : undefined,
        }}
        aria-label="Carte du mode RPG"
      />
    </div>
  );
}
