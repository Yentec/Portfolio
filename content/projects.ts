import type { Project } from "@/types";

export const projectsHeader = {
  title: "Quelques réalisations.",
  lead: "Des projets open-source pour montrer le code, et des projets clients que j'accompagne dans la durée.",
};

export const projects: Project[] = [
  {
    slug: "linkforge",
    title: "LinkForge",
    kind: "Open source",
    icon: "link",
    stackLabel: "FASTIFY · POSTGRESQL · REDIS",
    description:
      "API de raccourcissement d'URL avec authentification, clés d'API, suivi de clics asynchrone et anonymisé, et analytics. Pensée pour la performance et la montée en charge.",
    stack: ["Fastify", "Prisma", "PostgreSQL", "Redis", "BullMQ"],
    image: "/projects/linkforge.webp",
    repoUrl: "https://github.com/Yentec/LinkForge",
    liveUrl: "https://linkforge-538y.onrender.com/docs/",
    liveLabel: "Doc API",
    liveIcon: "doc",
    caseStudySlug: "linkforge",
  },
  {
    slug: "feedbackflow",
    title: "FeedbackFlow",
    kind: "Open source",
    icon: "message",
    stackLabel: "TYPESCRIPT · NEXT.JS 16",
    description:
      "Plateforme pour collecter, prioriser et livrer le feedback produit. Une alternative open-source à Canny — espace public de votes, roadmap et tableau de bord.",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/projects/feedbackflow.webp",
    repoUrl: "https://github.com/Yentec/FeedbackFlow",
    liveUrl: "https://feedbackflow-deploy.vercel.app/",
    caseStudySlug: "feedbackflow",
  },
  {
    slug: "projets-clients",
    title: "Projets clients",
    kind: "Freelance",
    icon: "globe",
    stackLabel: "SITES CLIENTS · NEXT.JS",
    description:
      "Sites vitrines performants et outils métier sur mesure pour PME et indépendants. Référencement naturel intégré dès la conception. Certains contenus restent confidentiels — références disponibles sur demande.",
    stack: ["Next.js", "React", "SEO", "Responsive"],
    contactLink: true,
  },
  {
    slug: "yachts-studio",
    title: "Yachts-Studio — CRM",
    kind: "Alternance",
    icon: "boat",
    stackLabel: "REACT · VITE · NODE.JS · MYSQL",
    description:
      "Refonte complète d'un CRM SaaS de gestion de parc de bateaux d'occasion : base MySQL optimisée, API Node.js/Express, interface React/Vite et site Next.js pour la diffusion des annonces. Projet mené seul, de l'analyse des besoins à la mise en production.",
    stack: ["React", "Vite", "Node.js", "Express", "MySQL", "Next.js"],
    image: "/projects/boatsdiffusion.webp",
    proprietary: true,
  },
];
