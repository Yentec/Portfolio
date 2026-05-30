import { cn } from "@/lib/cn";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "border-line bg-surface-2 rounded-lg border px-2.75 py-1.5",
        "text-ink-soft font-mono text-[12.5px] font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
