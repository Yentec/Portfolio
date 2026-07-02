"use client";

import { useEffect, useRef, useState } from "react";
import { GameEngine } from "@/lib/rpg/engine";
import { createTestMap, PLAYER_START } from "@/lib/rpg/map";
import { RENDERED_TILE } from "@/lib/rpg/constants";
import { preloadAssets } from "@/lib/rpg/assets";
import { LoadingScreen } from "@/components/rpg/LoadingScreen";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let engine: GameEngine | null = null;

    preloadAssets()
      .then((assets) => {
        if (cancelled) return; // démonté pendant le chargement : on n'instancie rien
        const canvas = canvasRef.current;
        if (!canvas) return;

        const map = createTestMap();
        canvas.width = map.cols * RENDERED_TILE;
        canvas.height = map.rows * RENDERED_TILE;

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

  if (error) {
    return (
      <p role="alert" className="text-[14px] text-red-600 dark:text-red-400">
        Impossible de charger le mode RPG. Réessaie plus tard.
      </p>
    );
  }

  return (
    <div className="relative">
      {!ready && <LoadingScreen />}
      <canvas
        ref={canvasRef}
        className={ready ? "border-line max-h-[80vh] max-w-full rounded-lg border" : "hidden"}
        style={{ imageRendering: "pixelated" }}
        aria-label="Carte du mode RPG"
      />
    </div>
  );
}
