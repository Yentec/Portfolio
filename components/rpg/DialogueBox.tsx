"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

const TYPEWRITER_MS_PER_CHAR = 12;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export type DialogueBoxHandle = {
  /** 1er appel : révèle le texte instantanément si en cours. 2e appel : avance. */
  advance: () => void;
};

export type DialogueBoxProps = {
  text: string;
  advanceHint: string;
  onAdvance: () => void;
  /** PNJ projet uniquement, si le projet a une étude de cas publiée. */
  link?: { href: string; label: string };
};

/**
 * Boîte de dialogue en overlay DOM (pas de canvas) : effet machine à écrire,
 * désactivé si `prefers-reduced-motion` (texte affiché d'un coup). Avancée
 * pilotée depuis l'extérieur (clavier) via `ref`, ou par clic sur le bouton.
 */
export const DialogueBox = forwardRef<DialogueBoxHandle, DialogueBoxProps>(function DialogueBox(
  { text, advanceHint, onAdvance, link },
  ref,
) {
  const reducedMotion = usePrefersReducedMotion();
  // Pas de reset au changement de `text` : le parent remonte ce composant (key
  // différente par ligne), donc cet état initial n'est calculé qu'une fois par ligne.
  const [visibleChars, setVisibleChars] = useState(() => (reducedMotion ? text.length : 0));
  const revealed = visibleChars >= text.length;
  // Accessible depuis handleAdvance pour annuler la boucle en cours : sans ça,
  // sauter à la fin était aussitôt écrasé par le prochain tick de l'animation
  // (qui ignorait le saut et reprenait son propre compteur local).
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return; // déjà révélé en entier via l'état initial

    let shown = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const elapsedChars = Math.floor((now - last) / TYPEWRITER_MS_PER_CHAR);
      if (elapsedChars > 0) {
        shown = Math.min(text.length, shown + elapsedChars);
        last = now;
        setVisibleChars(shown);
      }
      rafRef.current = shown < text.length ? requestAnimationFrame(tick) : null;
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [reducedMotion, text.length]);

  function handleAdvance() {
    if (!revealed) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setVisibleChars(text.length); // 1er appui : saute directement à la fin
    } else {
      onAdvance(); // 2e appui : ligne suivante (ou fermeture)
    }
  }

  useImperativeHandle(ref, () => ({ advance: handleAdvance }));

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="border-ink bg-bg absolute inset-x-3 bottom-3 border-[3px] p-4 shadow-[4px_4px_0_0_var(--color-ink)] sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <p className="text-ink min-h-[3lh] font-mono text-[13px] leading-relaxed sm:text-[14px]">
        {text.slice(0, visibleChars)}
      </p>
      {link && revealed && (
        <Link
          href={link.href}
          className="text-accent-strong hover:text-accent mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-semibold tracking-wide uppercase"
        >
          {link.label} →
        </Link>
      )}
      <button
        type="button"
        onClick={handleAdvance}
        className="text-ink-soft hover:text-ink focus-visible:outline-accent mt-2 flex w-full items-center justify-end gap-1.5 font-mono text-[10px] tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {advanceHint}
        <span
          aria-hidden
          className={!revealed ? "opacity-0" : reducedMotion ? "" : "animate-pulse"}
        >
          ▼
        </span>
      </button>
    </div>
  );
});
