import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projects, projectsHeader } from "@/content/projects";

export function Projects() {
  return (
    <Section tint>
      <span id="projects" className="block" />
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <Eyebrow>// Projets</Eyebrow>
      <SectionTitle>{projectsHeader.title}</SectionTitle>
      <p className="text-ink-soft mb-10 text-[clamp(16px,1.5vw,18px)]">{projectsHeader.lead}</p>

      <div className="flex flex-col gap-7">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.07}>
            <ProjectCard project={project} isEven={i % 2 !== 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
