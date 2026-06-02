import type { ReactElement } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project, ProjectIconName } from "@/types";

/* ── Project glyph icons ─────────────────────────────────────── */

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" />
      <path d="M8 10h8M8 13.5h5" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
    </svg>
  );
}

function BoatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M3 14l9-4 9 4-7.5 5a3 3 0 0 1-3 0L3 14z" />
      <path d="M12 10V4M12 4l4 2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

const ICONS: Record<ProjectIconName, () => ReactElement> = {
  message: MessageIcon,
  link: LinkIcon,
  boat: BoatIcon,
  globe: GlobeIcon,
};

/* ── Link action icons ───────────────────────────────────────── */

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden>
      <path d="M12 .5A11.5 11.5 0 0 0 8.4 22.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-4 shrink-0"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// Stacked lines — API doc (matches maquette LinkForge)
function DocIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-4 shrink-0"
      aria-hidden
    >
      <path d="M4 7h16M7 12h10M9 17h6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-4 shrink-0"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-4 shrink-0"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ── Card ────────────────────────────────────────────────────── */

const linkCls =
  "inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-ink transition hover:text-accent-strong dark:hover:text-accent";

const disabledCls =
  "inline-flex cursor-not-allowed items-center gap-[7px] text-[13.5px] font-semibold text-ink-faint";

type ProjectCardProps = {
  project: Project;
  // Even-indexed cards flip the shot to the right (mirrors maquette nth-child(even))
  isEven?: boolean;
  priority?: boolean;
};

export function ProjectCard({ project, isEven = false, priority = false }: ProjectCardProps) {
  const Icon = ICONS[project.icon];

  return (
    <article
      className={cn(
        "border-line bg-surface flex flex-col overflow-hidden rounded-lg border shadow-(--shadow)",
        "hover:border-accent/40 transition duration-200 hover:-translate-y-1",
        "md:flex-row",
        isEven && "md:flex-row-reverse",
      )}
    >
      {/* Shot
          Mobile  : 16/9 banner, border-bottom
          Desktop : 46% wide, fills card height, no internal border (color contrast separates) */}
      <div
        className={cn(
          "bg-code-bg relative overflow-hidden font-mono",
          "border-line aspect-video border-b",
          "md:aspect-auto md:w-[46%] md:flex-none md:border-b-0",
        )}
      >
        {/* Image or icon placeholder */}
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`Aperçu de ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1120px) 46vw, 515px"
              className="object-cover"
              priority={priority}
            />
            {/* Gradient ensures the stack tag stays readable over any image */}
            <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-black/60 to-transparent" />
          </>
        ) : (
          /* Glyph — 56px mobile, 80px desktop */
          <span className="text-accent absolute inset-0 grid place-items-center text-[56px] opacity-[0.92] md:text-[80px]">
            <span className="size-[1em] [&>svg]:size-full">
              <Icon />
            </span>
          </span>
        )}

        {/* Tech stack tag — bottom-left, always light (bg is always dark or gradient-covered) */}
        <span
          className="absolute bottom-3 left-3.5 font-mono text-[11px] tracking-[0.08em]"
          style={{ color: "rgba(215,227,236,0.7)" }}
        >
          {project.stackLabel}
        </span>

        {/* Confidential lock — top-right, dark semi-transparent pill */}
        {project.proprietary && (
          <span
            className="absolute top-3 right-3.5 flex items-center gap-1.5 rounded-[7px] px-2.5 py-1 font-mono text-[11px]"
            style={{ background: "rgba(0,0,0,0.35)", color: "rgba(215,227,236,0.65)" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Confidentiel
          </span>
        )}
      </div>

      {/* Body — gap 14px mobile, 18px desktop; centered vertically on desktop */}
      <div className="flex flex-1 flex-col gap-3.5 p-6 md:justify-center md:gap-4.5 md:p-9">
        {/* Title + kind badge */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-ink text-[21px] leading-snug font-semibold md:text-[28px]">
            {project.title}
          </h3>
          <span className="border-line text-ink-faint shrink-0 rounded-[7px] border px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap uppercase">
            {project.kind}
          </span>
        </div>

        {/* Description — 15px mobile, 16.5px desktop */}
        <p className="text-ink-soft text-justify text-[15px] md:text-[16.5px]">
          {project.description}
        </p>

        {/* Chips — mt-auto mirrors maquette's margin-top: auto */}
        <div className="mt-auto flex flex-wrap gap-1.75">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border-line-soft bg-surface-2 text-ink-soft rounded-[7px] border px-2.5 py-1 font-mono text-[11.5px]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2.5 pt-1.5">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <GitHubIcon /> Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {project.liveLabel === "Doc API" ? <DocIcon /> : <ExternalIcon />}
              {project.liveLabel ?? "Démo"}
            </a>
          )}
          {project.proprietary && (
            <span className={disabledCls}>
              <LockIcon /> Projet privé — démo sur demande
            </span>
          )}
          {project.contactLink && (
            <a href="#contact" className={linkCls}>
              <ArrowIcon /> Demander des références
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
