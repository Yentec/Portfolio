import { getTranslations } from "next-intl/server";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/content/projects";

export async function Projects() {
  const t = await getTranslations("projects");
  const projectMessages = t.raw("items") as Record<
    string,
    { title: string; description: string; stackLabel?: string; liveLabel?: string }
  >;
  const kindLabels = t.raw("kindLabels") as Record<string, string>;

  const localizedProjects = projects.map((p) => ({
    ...p,
    title: projectMessages[p.slug]?.title ?? p.title,
    description: projectMessages[p.slug]?.description ?? p.description,
    stackLabel: projectMessages[p.slug]?.stackLabel ?? p.stackLabel,
    liveLabel: projectMessages[p.slug]?.liveLabel ?? p.liveLabel,
  }));

  return (
    <Section tint>
      <span id="projects" className="block" />
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <Reveal>
        <SectionTitle>{t("title")}</SectionTitle>
      </Reveal>
      <Reveal delay={0.07}>
        <p className="text-ink-soft mb-10 text-[clamp(16px,1.5vw,18px)]">{t("lead")}</p>
      </Reveal>

      <div className="flex flex-col gap-7">
        {localizedProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.07}>
            <ProjectCard
              project={project}
              isEven={i % 2 !== 0}
              priority={i === 0}
              kindLabel={kindLabels[project.kind] ?? project.kind}
              imageAlt={t("imageAlt", { title: project.title })}
              confidentialLabel={t("confidentialLabel")}
              liveLabelDefault={t("liveLabelDefault")}
              caseStudyLabel={t("caseStudyLabel")}
              proprietaryLabel={t("proprietaryLabel")}
              contactLabel={t("contactLabel")}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
