import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Eyebrow } from "@/components/ui/Section";
import { CaseStudyToc } from "@/components/sections/CaseStudyToc";
import { caseStudies } from "@/content/case-studies";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudySlug).map((p) => ({ slug: p.caseStudySlug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    openGraph: {
      title: cs.metaTitle,
      description: cs.metaDescription,
      type: "article",
      ...(cs.heroImage && { images: [{ url: cs.heroImage }] }),
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return notFound();

  const prevHref = cs.prevProject ? `/projects/${cs.prevProject.slug}` : "/#projects";
  const prevTitle = cs.prevProject?.title ?? "Tous les projets";
  const nextHref = cs.nextProject ? `/projects/${cs.nextProject.slug}` : "/#projects";
  const nextTitle = cs.nextProject?.title ?? "Tous les projets";

  return (
    <>
      <Header />
      <main className="flex-1 pt-17.5">
        {/* ── Retour ── */}
        <div className="section-grid relative">
          <div className="max-w-site mx-auto px-7 pt-25 pb-0">
            <Link
              href="/#projects"
              className="border-line hover:border-ink hover:bg-line-soft focus-visible:outline-accent text-ink-soft hover:text-ink inline-flex items-center gap-2 rounded-[9px] border px-3.25 py-2 font-mono text-[13px] transition focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.75"
                aria-hidden
              >
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              Tous les projets
            </Link>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="section-grid relative">
          <div className="max-w-site mx-auto px-7 pt-6.5 pb-2">
            {/* Kind */}
            <p className="text-accent-strong dark:text-accent inline-flex items-center gap-2.25 font-mono text-[12px] tracking-[0.12em] uppercase">
              <span className="bg-accent inline-block h-[1.5px] w-5.5" aria-hidden />
              {cs.kind}
            </p>

            <h1 className="mt-4.5 text-[clamp(36px,5.4vw,60px)] leading-[1.04]">{cs.title}</h1>

            <p className="text-ink-soft mt-5 text-[clamp(17px,1.7vw,20px)]">{cs.lead}</p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={cs.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-ink focus-visible:outline-accent inline-flex items-center gap-2.25 rounded-[11px] px-5.5 py-3.25 text-[15px] font-semibold shadow-[0_8px_22px_-10px_var(--color-accent)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <GitHubIcon />
                Voir le code
              </a>
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink border-line hover:border-ink focus-visible:outline-accent inline-flex items-center gap-2.25 rounded-[11px] border bg-transparent px-5.5 py-3.25 text-[15px] font-semibold transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {cs.liveIcon === "doc" ? <DocIcon /> : <ExternalIcon />}
                  {cs.liveLabel}
                </a>
              )}
            </div>

            {/* Stack */}
            <div className="mt-6 flex flex-wrap gap-2">
              {cs.stack.map((chip) => (
                <span
                  key={chip}
                  className="border-line-soft bg-surface-2 text-ink-soft rounded-[7px] border px-2.25 py-1 font-mono text-[11.5px]"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Méta */}
            <div className="border-line bg-surface mt-10 grid grid-cols-2 overflow-hidden rounded-lg border [box-shadow:var(--shadow)] sm:grid-cols-4">
              <MetaCell
                label="Rôle"
                value={cs.role}
                className="border-line border-r border-b sm:border-b-0"
              />
              <MetaCell
                label="Période"
                value={cs.period}
                className="border-line border-b sm:border-r sm:border-b-0"
              />
              <MetaCell label="Type" value={cs.projectType} className="border-line border-r" />
              <MetaCell label="Statut" value={cs.status} ok={cs.status === "En ligne"} />
            </div>

            {/* Capture héro */}
            <div className="border-line relative mt-6.5 h-[clamp(280px,44vw,560px)] overflow-hidden rounded-lg border [box-shadow:var(--shadow)]">
              {cs.heroImage ? (
                <Image
                  src={cs.heroImage}
                  alt={cs.heroAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1120px"
                />
              ) : (
                <span className="bg-surface-2 text-ink-faint absolute inset-0 flex items-center justify-center font-mono text-[12px]">
                  {cs.heroAlt}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── Corps : contenu + TOC ── */}
        <section className="section-grid relative">
          <div className="max-w-site mx-auto px-7 pt-12 pb-[clamp(72px,9vw,90px)]">
            <div className="lg:grid lg:grid-cols-[1fr_248px] lg:items-start lg:gap-14">
              {/* Blocs de contenu */}
              <div className="[&_strong]:text-ink [&_strong]:font-semibold">
                <Block id="contexte" eyebrow="Contexte" title="Pourquoi ce projet" first>
                  <div className="space-y-3.5">
                    {cs.contexte.map((p, i) => (
                      <p
                        key={i}
                        className="text-ink-soft"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ))}
                  </div>
                </Block>

                <Block id="probleme" eyebrow="Problème" title="Ce qu'il fallait résoudre">
                  <p className="text-ink-soft">{cs.problemeIntro}</p>
                  <ul className="mt-4.5 flex flex-col gap-3 p-0">
                    {cs.problemePoints.map((point) => (
                      <li
                        key={point.label}
                        className="text-ink-soft grid grid-cols-[22px_1fr] gap-3"
                      >
                        <InfoCircleIcon />
                        <span>
                          <strong className="text-ink font-semibold">{point.label}</strong>{" "}
                          {point.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block id="solution" eyebrow="Solution" title="L'approche retenue">
                  <div className="space-y-3.5">
                    {cs.solutionBody.map((p, i) => (
                      <p
                        key={i}
                        className="text-ink-soft"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ))}
                  </div>
                  <div className="mt-5.5 grid grid-cols-2 gap-4.5">
                    {cs.solutionGallery.map((img, i) => (
                      <div
                        key={i}
                        className={cn(
                          "border-line relative overflow-hidden rounded-2xl border [box-shadow:var(--shadow)]",
                          img.wide ? "col-span-2 h-85" : "h-70",
                        )}
                      >
                        {img.src ? (
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className={cn(
                              "object-cover",
                              img.wide ? "object-top" : "object-center",
                            )}
                            sizes="(max-width: 768px) 100vw, 560px"
                          />
                        ) : (
                          <span className="bg-surface-2 text-ink-faint absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-[11px]">
                            {img.alt}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Block>

                <Block id="decisions" eyebrow="Décisions techniques" title="Les choix qui comptent">
                  <div className="mt-5.5 flex flex-col gap-4">
                    {cs.decisions.map((d) => (
                      <div
                        key={d.tech}
                        className="border-line bg-surface rounded-lg border px-6.5 py-6 [box-shadow:var(--shadow)]"
                      >
                        <div className="mb-2.5 flex items-center gap-3">
                          <span className="text-accent-strong dark:text-accent bg-accent/12 rounded-[7px] px-2.75 py-1.25 font-mono text-[12.5px] font-medium">
                            {d.tech}
                          </span>
                          <h3 className="text-[17px] leading-snug font-bold">{d.title}</h3>
                        </div>
                        <p className="text-ink-soft text-[15px]">{d.body}</p>
                        <div className="text-ink mt-2.5 flex items-baseline gap-2.25 text-[14px]">
                          <b className="text-ink-faint shrink-0 font-mono text-[11px] tracking-[0.08em] uppercase">
                            Pourquoi
                          </b>
                          {d.why}
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block id="resultat" eyebrow="Résultat" title="Ce que ça donne">
                  <p
                    className="text-ink-soft"
                    dangerouslySetInnerHTML={{ __html: cs.resultatBody }}
                  />
                  <div className="mt-5.5 grid grid-cols-3 gap-4">
                    {cs.resultatFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="rounded-base border-line bg-surface border p-5.5 [box-shadow:var(--shadow)]"
                      >
                        <b className="font-head block text-[30px] font-semibold tracking-tight">
                          {fact.value}
                        </b>
                        <span className="text-ink-soft text-[13.5px]">{fact.label}</span>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>

              {/* TOC sticky */}
              <CaseStudyToc />
            </div>
          </div>
        </section>

        {/* ── Navigation projets ── */}
        <div className="bg-bg-tint">
          <div className="max-w-site mx-auto px-7 py-14">
            <nav className="grid grid-cols-2 gap-4.5" aria-label="Navigation entre projets">
              <Link
                href={prevHref}
                className="border-line bg-surface hover:border-accent/45 flex flex-col gap-1.5 rounded-lg border px-6.5 py-6 [box-shadow:var(--shadow)] transition hover:-translate-y-0.75"
              >
                <span className="text-ink-faint font-mono text-[11.5px] tracking-widest uppercase">
                  ← Projet précédent
                </span>
                <span className="font-head text-[19px] font-semibold">{prevTitle}</span>
              </Link>
              <Link
                href={nextHref}
                className="border-line bg-surface hover:border-accent/45 flex flex-col gap-1.5 rounded-lg border px-6.5 py-6 text-right [box-shadow:var(--shadow)] transition hover:-translate-y-0.75"
              >
                <span className="text-ink-faint font-mono text-[11.5px] tracking-widest uppercase">
                  Projet suivant →
                </span>
                <span className="font-head text-[19px] font-semibold">{nextTitle}</span>
              </Link>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ─── Composants locaux ────────────────────────────────────────────────────────

function Block({
  id,
  eyebrow,
  title,
  children,
  first = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <div id={id} className={cn(first ? "pt-1 pb-9.5" : "border-line border-t py-9.5")}>
      <Eyebrow className="mb-3.5">
        {"// "}
        {eyebrow}
      </Eyebrow>
      <h2 className="mb-4.5 text-[clamp(24px,3vw,32px)]">{title}</h2>
      {children}
    </div>
  );
}

function MetaCell({
  label,
  value,
  ok,
  className,
}: {
  label: string;
  value: string;
  ok?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5 px-6 py-5", className)}>
      <span className="text-ink-faint font-mono text-[10.5px] tracking-widest uppercase">
        {label}
      </span>
      {ok ? (
        <span className="text-success-ink inline-flex items-center gap-1.75 text-[15px] font-semibold">
          <span className="bg-success inline-block size-1.75 rounded-full" aria-hidden />
          {value}
        </span>
      ) : (
        <span className="text-[15px] font-semibold">{value}</span>
      )}
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.25" aria-hidden>
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
      strokeWidth={2}
      strokeLinecap="round"
      className="size-4.25"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="size-4.25"
      aria-hidden
    >
      <path d="M4 7h16M7 12h10M9 17h6" />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="text-accent-strong dark:text-accent mt-0.75 size-4.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}
