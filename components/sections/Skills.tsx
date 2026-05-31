import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { skills, skillsHeader } from "@/content/skills";
import type { SkillGroup, SkillIconName } from "@/types";

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5"
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5"
      aria-hidden
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5"
      aria-hidden
    >
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
    </svg>
  );
}

const ICONS: Record<SkillIconName, () => React.ReactElement> = {
  code: CodeIcon,
  database: DatabaseIcon,
  tools: ToolsIcon,
};

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = ICONS[group.icon];
  return (
    <div className="border-line bg-surface flex h-full flex-col rounded-lg border p-6">
      {/* Header */}
      <div className="mb-5 flex items-start gap-3.5">
        <span className="border-line bg-surface-2 text-accent grid size-10 shrink-0 place-items-center rounded-[10px] border">
          <Icon />
        </span>
        <div>
          <h3 className="text-ink text-[17px] font-semibold">{group.category}</h3>
          <p className="text-ink-faint mt-0.5 font-mono text-[12px] tracking-widest uppercase">
            {group.subtitle}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {group.badges.map((b) => (
          <Badge key={b}>{b}</Badge>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section className="section-grid">
      <span id="skills" className="block" />
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <Eyebrow>// Compétences</Eyebrow>
      <SectionTitle>{skillsHeader.title}</SectionTitle>
      <p className="text-ink-soft mb-10 text-[clamp(16px,1.5vw,18px)]">{skillsHeader.lead}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <SkillCard key={i} group={group} />
        ))}
      </div>
    </Section>
  );
}
