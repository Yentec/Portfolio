import { type ReactNode, Fragment } from "react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { profile, timeline, values } from "@/content/profile";

// Parses **text** markers into <strong> elements for bio paragraphs
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

function Timeline() {
  return (
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
          <h3 className="text-ink mt-1 text-[16.5px] leading-snug font-semibold">{entry.title}</h3>
          <p className="text-ink-soft mt-1 text-justify text-[14.5px]">{entry.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function About() {
  return (
    <Section tint>
      {/* Anchor placed inside content (past section top padding) so the nav scrolls to content, not empty padding */}
      <span id="about" className="block" />
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <Eyebrow>// À propos</Eyebrow>

      <div className="mt-3 grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Intro */}
        <Reveal>
          <div>
            <h2 className="mb-6 text-[clamp(26px,3.2vw,38px)] leading-[1.06]">
              {profile.aboutTitle}
            </h2>
            <div className="text-ink-soft space-y-4 text-justify text-[16.5px] leading-relaxed hyphens-auto">
              {profile.bio.map((para, i) => (
                <p key={i}>{parseBold(para)}</p>
              ))}
            </div>
            <a href="#contact" className="mt-7 inline-block">
              <Button variant="secondary" size="sm">
                Travaillons ensemble
              </Button>
            </a>
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal delay={0.1}>
          <Timeline />
        </Reveal>
      </div>

      {/* Values — horizontal grid below */}
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
