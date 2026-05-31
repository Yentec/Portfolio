import type { SkillGroup } from "@/types";

export const skillsHeader = {
  title: "Une stack moderne, maîtrisée de bout en bout.",
  lead: "Du front à la base de données. Je choisis l'outil adapté au projet, pas l'inverse.",
};

export const skills: SkillGroup[] = [
  {
    category: "Front-end",
    subtitle: "interfaces",
    icon: "code",
    badges: [
      "React",
      "Next.js",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Framer Motion",
      "Responsive",
    ],
  },
  {
    category: "Back-end & data",
    subtitle: "serveur",
    icon: "database",
    badges: ["Node.js", "Fastify", "Prisma", "MySQL", "PostgreSQL", "Redis", "BullMQ", "REST API"],
  },
  {
    category: "Outils & savoir-être",
    subtitle: "méthode",
    icon: "tools",
    badges: ["Git", "Figma", "Vercel", "UI/UX", "Autonomie", "Adaptation", "Pédagogie", "Rigueur"],
  },
];
