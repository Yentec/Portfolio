import type { SkillGroup } from "@/types";

export const skills: SkillGroup[] = [
  {
    category: "Front",
    items: ["React", "Vite", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  { category: "Back", items: ["Node.js", "Express", "Fastify", "API REST", "Prisma", "Sequelize"] },
  { category: "Données", items: ["PostgreSQL", "MySQL", "NoSQL", "Redis"] },
  { category: "Outils", items: ["Git", "GitHub Actions", "Docker", "Insomnia", "Nginx", "PM2"] },
];
