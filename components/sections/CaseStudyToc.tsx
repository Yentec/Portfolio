"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function CaseStudyToc() {
  const t = useTranslations("caseStudy");
  const sections = t.raw("tocSections") as { id: string; label: string }[];

  const [active, setActive] = useState<string>(sections[0]?.id ?? "contexte");

  useEffect(() => {
    const els = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside
      className="sticky top-24 hidden self-start lg:flex lg:flex-col lg:gap-1"
      aria-label="Sommaire"
    >
      <span className="text-ink-faint mb-2 block font-mono text-[10.5px] tracking-[0.14em] uppercase">
        {t("tocTitle")}
      </span>
      {sections.map(({ id, label }) => (
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
        {t("tocCta")}
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
