import { type ReactNode, Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

function parseBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="text-ink font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export async function About() {
  const t = await getTranslations("about");
  const bio = t.raw("bio") as string[];
  const timeline = t.raw("timeline") as { period: string; title: string; description: string }[];
  const values = t.raw("values") as { title: string; description: string }[];

  return (
    <Section tint>
      <span id="about" className="block" />
      <Eyebrow>{t("eyebrow")}</Eyebrow>

      <div className="mt-3 grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Intro */}
        <Reveal>
          <div>
            <h2 className="mb-6 text-[clamp(26px,3.2vw,38px)] leading-[1.06]">{t("title")}</h2>
            <div className="text-ink-soft space-y-4 text-justify text-[16.5px] leading-relaxed hyphens-auto">
              {bio.map((para, i) => (
                <p key={i}>{parseBold(para)}</p>
              ))}
            </div>
            <a href="#contact" className="mt-7 inline-block">
              <Button variant="secondary" size="sm">
                {t("cta")}
              </Button>
            </a>
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal delay={0.1}>
          <ol className="border-line relative space-y-7 border-l pl-6">
            {timeline.map((entry) => (
              <li key={entry.title} className="relative">
                <span
                  className="bg-accent absolute top-1.5 -left-4.25 size-2.5 rounded-full"
                  aria-hidden
                />
                <p className="text-ink-faint font-mono text-[12px] tracking-widest uppercase">
                  {entry.period}
                </p>
                <h3 className="text-ink mt-1 text-[16.5px] leading-snug font-semibold">
                  {entry.title}
                </h3>
                <p className="text-ink-soft mt-1 text-justify text-[14.5px]">{entry.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* Values */}
      <Reveal delay={0.15}>
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {values.map((value, i) => (
            <div key={value.title} className="rounded-base border-line bg-surface border p-5">
              <h3 className="text-ink text-[15.5px] font-bold">
                <span className="text-accent mr-1.5 font-mono text-[12px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {value.title}
              </h3>
              <p className="text-ink-soft mt-2 text-[14px]">{value.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
