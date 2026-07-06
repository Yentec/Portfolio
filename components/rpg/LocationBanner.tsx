"use client";

import { useEffect, useState } from "react";

const VISIBLE_MS = 3000;

export type LocationBannerProps = {
  name: string;
};

/**
 * Bannière de lieu à l'arrivée (mécanique RPG classique — nom de zone affiché
 * puis dissipé) : apparaît en haut à gauche de la fenêtre de jeu (pas de
 * l'écran — reste dans le canvas, contrairement aux boutons du HUD) dès que
 * la partie démarre, puis se dissipe seule. Respecte prefers-reduced-motion
 * (apparition/disparition instantanées, sans fondu).
 */
export function LocationBanner({ name }: LocationBannerProps) {
  // Démarre invisible : le fondu d'entrée est le passage à `true` juste après
  // le montage (cf. ModeTransition, même technique).
  const [visible, setVisible] = useState(false);
  const [instant] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    // Un frame pour laisser le navigateur peindre l'état invisible avant que la
    // transition CSS ne parte — sinon le fondu d'entrée ne serait jamais visible.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(timeout);
  }, [visible]);

  return (
    <div
      className="border-ink bg-surface-2/60 text-ink pointer-events-none absolute top-13 left-2 z-20 border-2 px-3 py-1.5 font-mono text-[12px] font-semibold tracking-wide uppercase transition-opacity"
      style={{ opacity: visible ? 1 : 0, transitionDuration: instant ? "0ms" : "500ms" }}
    >
      {name}
    </div>
  );
}
