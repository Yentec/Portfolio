"use client";

import { useEffect, useState } from "react";

/**
 * Recouvre l'écran au montage de la route /rpg puis se dissipe — une
 * sensation de passage entre le mode classique et le RPG plutôt qu'un cut
 * brutal. `pointer-events-none` : ne bloque jamais l'interaction, même
 * pendant la transition. Respecte prefers-reduced-motion (disparition
 * instantanée, sans fondu) — c'est une animation purement décorative.
 */
export function ModeTransition() {
  const [hidden, setHidden] = useState(false);
  // Rendu directement dans page.tsx (pas derrière le ssr:false de GameCanvas) :
  // cet initialiseur tourne aussi côté serveur, où `window` n'existe pas.
  const [instant] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    // Un frame pour laisser le navigateur peindre l'état opaque avant que la
    // transition CSS ne parte — sinon le fondu ne serait jamais visible.
    const raf = requestAnimationFrame(() => setHidden(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="bg-bg pointer-events-none fixed inset-0 z-50 transition-opacity"
      style={{ opacity: hidden ? 0 : 1, transitionDuration: instant ? "0ms" : "400ms" }}
    />
  );
}
