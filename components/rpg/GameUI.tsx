"use client";

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
  label: string;
};

/** HUD minimal : bouton mute, toujours accessible (jamais masqué par le dialogue ou l'intro). */
export function GameUI({ muted, onToggleMute, label }: GameUIProps) {
  return (
    <button
      type="button"
      onClick={onToggleMute}
      aria-pressed={!muted}
      aria-label={label}
      className="border-ink bg-bg text-ink hover:bg-surface-2 focus-visible:outline-accent absolute top-2 right-2 z-20 grid size-9 place-items-center border-2 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="size-4.5">{muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}</span>
    </button>
  );
}
