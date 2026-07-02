export function LoadingScreen() {
  return (
    <div
      role="status"
      className="border-line bg-surface flex h-72 w-full max-w-108 items-center justify-center rounded-lg border"
    >
      <p className="text-ink-soft font-mono text-[13px]">Chargement du monde…</p>
    </div>
  );
}
