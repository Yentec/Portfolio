import { cn } from "@/lib/cn";

export function Section({
  id,
  tint = false,
  className,
  children,
}: {
  id?: string;
  tint?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-[clamp(72px,9vw,90px)]", tint && "bg-bg-tint", className)}
    >
      <div className="max-w-site mx-auto w-full px-7">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-accent-strong dark:text-accent mb-4.5 inline-flex items-center gap-2 font-mono text-[12.5px] font-medium tracking-[0.14em] uppercase",
        className,
      )}
    >
      <span className="bg-accent inline-block h-[1.5px] w-5.5" aria-hidden />
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4.5 text-[clamp(28px,3.6vw,40px)]">{children}</h2>;
}
