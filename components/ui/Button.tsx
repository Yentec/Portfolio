import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";
type Size = "base" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center gap-2 rounded-[11px] cursor-pointer font-semibold whitespace-nowrap transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_8px_22px_-10px_var(--color-accent)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_var(--color-accent)]",
  ghost: "bg-transparent text-ink border border-line hover:border-ink hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  base: "px-[22px] py-[13px] text-[15px]",
  sm: "rounded-[9px] px-[15px] py-[9px] text-[13.5px]",
};

export function Button({ variant = "primary", size = "base", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
