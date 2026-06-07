"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "contexte", label: "Contexte" },
  { id: "probleme", label: "Problème" },
  { id: "solution", label: "Solution" },
  { id: "decisions", label: "Décisions techniques" },
  { id: "resultat", label: "Résultat" },
] as const;

export function CaseStudyToc() {
  const [active, setActive] = useState<string>("contexte");

  useEffect(() => {
    const els = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(topmost.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="sticky top-24 hidden self-start lg:flex lg:flex-col lg:gap-1"
      aria-label="Sommaire"
    >
      <span className="text-ink-faint mb-2 block font-mono text-[10.5px] tracking-[0.14em] uppercase">
        Sur cette page
      </span>
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "rounded-[8px] border-l-2 px-3 py-2 text-[14px] transition",
            active === id
              ? "text-ink bg-line-soft border-l-accent"
              : "text-ink-soft hover:text-ink hover:bg-line-soft hover:border-l-accent border-l-transparent",
          )}
        >
          {label}
        </a>
      ))}
      <Link
        href="/#contact"
        className="bg-accent text-accent-ink mt-7 inline-flex items-center gap-2 rounded-[9px] px-4 py-2.5 text-[13.5px] font-semibold shadow-[0_6px_18px_-8px_var(--color-accent)] transition hover:-translate-y-0.5"
      >
        Discutons-en
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </aside>
  );
}
