"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M17 8a5 5 0 0 1 0 8M19.5 5.5a9 9 0 0 1 0 13" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16 9l5 6M21 9l-5 6" strokeLinecap="round" />
    </svg>
  );
}

export type GameUIProps = {
  muted: boolean;
  onToggleMute: () => void;
  muteLabel: string;
  classicModeLabel: string;
  helpLabel: string;
  helpLines: string[];
  mobileHelpLines: string[];
  creditsLabel: string;
};

/**
 * HUD : lien Mode Classique (toujours accessible, en dehors de tout état de
 * dialogue/intro), aide aux contrôles à la demande, et mute — jamais masqués.
 */
export function GameUI({
  muted,
  onToggleMute,
  muteLabel,
  classicModeLabel,
  helpLabel,
  helpLines,
  mobileHelpLines,
  creditsLabel,
}: GameUIProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      {/* `pointer-coarse:fixed` : sur tactile, ancré aux vrais bords de l'écran
          plutôt qu'à la boîte du canvas — évite de chevaucher le texte de dialogue.
          `bg-surface-2` (pas `bg-bg`) : en thème sombre, `--color-surface-2` est
          nettement plus clair que `--color-bg`, qui se fond dans le fond noir du
          canvas — reste visible sans pour autant paraître "thème clair". En thème
          clair, `--color-surface-2` est presque identique à `--color-bg` (rendu inchangé). */}
      <Link
        href="/#discover"
        className="border-ink bg-surface-2/60 text-ink hover:bg-surface-2/90 focus-visible:outline-accent absolute top-2 left-2 z-20 flex h-9 items-center gap-1.5 border-2 px-2.5 font-mono text-[11px] font-semibold tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-2 pointer-coarse:fixed"
      >
        ← {classicModeLabel}
      </Link>

      <div className="absolute top-2 right-2 z-20 flex gap-1.5 pointer-coarse:fixed">
        <button
          type="button"
          onClick={() => setHelpOpen((open) => !open)}
          aria-pressed={helpOpen}
          aria-label={helpLabel}
          className="border-ink bg-surface-2/60 text-ink hover:bg-surface-2/90 focus-visible:outline-accent grid size-9 place-items-center border-2 font-mono text-[13px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          ?
        </button>
        <button
          type="button"
          onClick={onToggleMute}
          aria-pressed={!muted}
          aria-label={muteLabel}
          className="border-ink bg-surface-2/60 text-ink hover:bg-surface-2/90 focus-visible:outline-accent grid size-9 place-items-center border-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="size-4.5">{muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}</span>
        </button>
      </div>

      {helpOpen && (
        <div
          role="status"
          className="border-ink bg-bg text-ink-soft absolute top-13 right-2 z-20 max-w-56 space-y-1 border-2 p-3 font-mono text-[11px] leading-relaxed shadow-[4px_4px_0_0_var(--color-ink)] pointer-coarse:fixed"
        >
          {/* Deux jeux d'instructions choisis par capacité de pointeur (souris vs
              tactile), pas par largeur d'écran — un mobile en paysage dépasse
              souvent le seuil `md` tout en restant tactile. */}
          <span className="pointer-coarse:hidden">
            {helpLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </span>
          <span className="hidden pointer-coarse:inline">
            {mobileHelpLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </span>
          {/* Crédits assets : surface non-intrusive (panneau déjà optionnel/à la
              demande) plutôt qu'un élément permanent à l'écran. */}
          <p className="border-line text-ink-faint mt-1.5 border-t pt-1.5 text-[10px] normal-case">
            {creditsLabel}
          </p>
        </div>
      )}
    </>
  );
}
