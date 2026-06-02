"use client";

import Image from "next/image";
import { profile } from "@/content/profile";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#about", label: "À propos" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
  { href: "#discover", label: "Découvrir" },
];

export function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="border-line border-t">
      <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-5 px-7 py-10">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo/logo_color.png"
            alt=""
            width={1367}
            height={1367}
            sizes="40px"
            style={{ height: "2.5rem", width: "auto" }}
            className={cn(theme === "dark" && "hidden")}
          />
          <Image
            src="/logo/logo_white.png"
            alt=""
            width={1367}
            height={1367}
            sizes="40px"
            style={{ height: "2.5rem", width: "auto" }}
            className={cn(theme !== "dark" && "hidden")}
          />
          <small className="text-ink-soft text-[13px]">
            © {year} {profile.name} · Développeur web · {profile.location}
          </small>
        </div>
        <nav className="flex flex-wrap gap-4.5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink-soft hover:text-accent-strong text-[13.5px] transition"
            >
              {item.label}
            </a>
          ))}
          {profile.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-accent-strong text-[13.5px] transition"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
