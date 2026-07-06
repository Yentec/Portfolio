"use client";

import type { ReactNode } from "react";
import type { Direction } from "@/types/rpg";

export type MobileControlsProps = {
  onDirection: (dir: Direction | null) => void;
  onInteract: () => void;
  onCancel: () => void;
  dpadLabels: Record<Direction, string>;
  actionLabels: { interact: string; cancel: string };
};

/** Masqué sur pointeur précis (souris), affiché sur pointeur imprécis
 * (tactile) — quelle que soit la largeur d'écran. Un `md:hidden` (largeur)
 * cacherait à tort les contrôles en mobile paysage, souvent plus large que le
 * seuil `md`. */
const TOUCH_ONLY = "hidden pointer-coarse:grid";

function TouchButton({
  label,
  onPress,
  onRelease,
  className,
  children,
}: {
  label: string;
  onPress: () => void;
  onRelease?: () => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      // Relâche aussi si le doigt glisse hors du bouton ou si le geste est
      // annulé — sinon un état resterait "collé" indéfiniment.
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      onPointerUp={onRelease}
      onPointerLeave={onRelease}
      onPointerCancel={onRelease}
      // bg-surface-2 (pas bg-bg) : en thème sombre, --color-surface-2 est nettement
      // plus clair que --color-bg, qui se fond dans le fond noir du canvas — reste
      // visible sans paraître "thème clair". En clair, quasi identique à --color-bg.
      className={`border-ink bg-surface-2/60 text-ink active:bg-surface-2 grid size-11 touch-none place-items-center border-2 text-lg font-bold select-none ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Contrôles tactiles — D-pad (déplacement) en bas à gauche, A/B (interagir /
 * fermer) en bas à droite. Pilotent le moteur via la même InputState que le
 * clavier (GameEngine.setTouchDirection) et les mêmes handlers de dialogue
 * que Entrée/Espace/Échap (GameCanvas.handleInteract/handleCancel).
 */
export function MobileControls({
  onDirection,
  onInteract,
  onCancel,
  dpadLabels,
  actionLabels,
}: MobileControlsProps) {
  return (
    <>
      {/* pointer-coarse:fixed : ancré aux vrais bords de l'écran plutôt qu'à la
          boîte du canvas — sinon les boutons chevauchent le texte de dialogue. */}
      <div
        className={`absolute bottom-3 left-3 z-20 grid-cols-3 grid-rows-3 gap-1 pointer-coarse:fixed ${TOUCH_ONLY}`}
      >
        <TouchButton
          label={dpadLabels.up}
          onPress={() => onDirection("up")}
          onRelease={() => onDirection(null)}
          className="col-start-2 row-start-2"
        >
          ▲
        </TouchButton>
        <TouchButton
          label={dpadLabels.left}
          onPress={() => onDirection("left")}
          onRelease={() => onDirection(null)}
          className="col-start-1 row-start-3"
        >
          ◀
        </TouchButton>
        <TouchButton
          label={dpadLabels.right}
          onPress={() => onDirection("right")}
          onRelease={() => onDirection(null)}
          className="col-start-3 row-start-3"
        >
          ▶
        </TouchButton>
        <TouchButton
          label={dpadLabels.down}
          onPress={() => onDirection("down")}
          onRelease={() => onDirection(null)}
          className="col-start-2 row-start-3"
        >
          ▼
        </TouchButton>
      </div>

      <div
        className={`absolute right-3 bottom-3 z-20 grid-cols-2 grid-rows-2 gap-2 pointer-coarse:fixed ${TOUCH_ONLY}`}
      >
        <TouchButton
          label={actionLabels.interact}
          onPress={onInteract}
          className="col-start-2 row-start-1 rounded-full"
        >
          A
        </TouchButton>
        <TouchButton
          label={actionLabels.cancel}
          onPress={onCancel}
          className="col-start-1 row-start-2 rounded-full"
        >
          B
        </TouchButton>
      </div>
    </>
  );
}
