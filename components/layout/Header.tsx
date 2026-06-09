"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="size-4.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5" aria-hidden>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="size-4.5"
      aria-hidden
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="size-4.5"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("header");

  return (
    <div
      role="group"
      aria-label={t("langLabel")}
      className="border-line inline-flex overflow-hidden rounded-[9px] border"
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "cursor-pointer border-0 px-2.5 py-2 font-mono text-[12px] font-semibold tracking-[0.04em] transition",
            l === locale
              ? "bg-accent text-accent-ink"
              : "text-ink-soft hover:bg-line-soft hover:text-ink bg-transparent",
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const href = (anchor: string) => (isHome ? anchor : `/${anchor}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV = [
    { href: "#about", label: t("about") },
    { href: "#services", label: t("services") },
    { href: "#skills", label: t("skills") },
    { href: "#projects", label: t("projects") },
    { href: "#discover", label: t("discover") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "bg-bg/80 fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-[14px] backdrop-saturate-150 transition",
        scrolled && "border-line",
      )}
    >
      <div className="max-w-site mx-auto flex h-17.5 items-center gap-6 px-7">
        {/* Brand */}
        <a
          href={isHome ? "#top" : "/"}
          aria-label={tHeader("logoLabel")}
          className="focus-visible:outline-accent mr-auto inline-flex shrink-0 items-center focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Image
            src="/logo/long_color.png"
            alt=""
            width={3747}
            height={1367}
            sizes="165px"
            style={{ height: "3.75rem", width: "auto" }}
            priority
            className={cn(theme === "dark" && "hidden")}
          />
          <Image
            src="/logo/long_white.png"
            alt=""
            width={3747}
            height={1367}
            sizes="165px"
            style={{ height: "3.75rem", width: "auto" }}
            priority
            className={cn(theme !== "dark" && "hidden")}
          />
        </a>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={href(item.href)}
              className="text-ink-soft hover:bg-line-soft hover:text-ink rounded-[9px] px-3.25 py-2 text-[14.5px] font-medium whitespace-nowrap transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Language switcher */}
          <LangSwitcher />

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? tHeader("themeLight") : tHeader("themeDark")}
            className="border-line text-ink hover:bg-line-soft focus-visible:outline-accent grid size-9.5 cursor-pointer place-items-center rounded-[10px] border transition focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* CTA desktop */}
          <a href={href("#contact")} className="hidden lg:inline-flex">
            <Button size="sm">{tHeader("contact")}</Button>
          </a>

          {/* Burger mobile */}
          <button
            type="button"
            className="border-line text-ink hover:bg-line-soft focus-visible:outline-accent grid size-9.5 place-items-center rounded-[10px] border transition focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? tHeader("closeMenu") : tHeader("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          className="border-line bg-bg border-t px-5 py-3 shadow-lg lg:hidden"
        >
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={href(item.href)}
                  onClick={() => setOpen(false)}
                  className="text-ink-soft hover:bg-line-soft hover:text-ink block rounded-[10px] px-3.5 py-3.25 text-[16px] transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 px-3.5">
              <a href={href("#contact")} onClick={() => setOpen(false)}>
                <Button size="sm">{tHeader("contact")}</Button>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
