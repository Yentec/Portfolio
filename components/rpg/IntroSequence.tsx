export type IntroSequenceProps = {
  title: string;
  lines: string[];
  skipLabel: string;
  onSkip: () => void;
};

/**
 * Écran explicatif affiché pendant le préchargement (assets + audio) — remplace
 * l'ancien LoadingScreen générique. Reste visible tant que le parent le monte,
 * y compris après la fin du chargement si une durée minimale de lecture est
 * encore en cours (voir GameCanvas) : le joueur a toujours le temps de lire.
 * `mx-auto` : sans ça, `max-w-108` limite juste la largeur du bloc sans le
 * centrer dans un conteneur plus large — items-center/justify-center ne
 * centrent que le contenu À L'INTÉRIEUR de la boîte, pas la boîte elle-même.
 */
export function IntroSequence({ title, lines, skipLabel, onSkip }: IntroSequenceProps) {
  return (
    <div
      role="status"
      className="border-ink bg-bg mx-auto flex h-72 w-full max-w-108 flex-col items-center justify-center gap-3 border-[3px] p-6 text-center shadow-[4px_4px_0_0_var(--color-ink)]"
    >
      <p className="text-ink font-mono text-[15px] font-semibold tracking-wide uppercase">
        {title}
      </p>
      <div className="text-ink-soft space-y-2 font-mono text-[12.5px] leading-relaxed">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="text-ink-soft hover:text-ink focus-visible:outline-accent mt-1 font-mono text-[10px] tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {skipLabel} →
      </button>
    </div>
  );
}
