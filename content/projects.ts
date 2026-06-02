import type { Project } from "@/types";

export const projectsHeader = {
  title: "Quelques réalisations.",
  lead: "Des projets open-source pour montrer comment je code — et des réalisations clients qui tournent en production.",
};

export const projects: Project[] = [
  {
    slug: "linkforge",
    title: "LinkForge",
    kind: "Open source",
    icon: "link",
    stackLabel: "FASTIFY · POSTGRESQL · REDIS",
    description:
      "API REST de raccourcissement d'URL avec authentification JWT, gestion de clés d'API, suivi de clics asynchrone et anonymisé via BullMQ, et dashboard analytics. Architecture conçue pour la performance et la montée en charge.",
    stack: ["Fastify", "Prisma", "PostgreSQL", "Redis", "BullMQ"],
    image: "/projects/linkforge.webp",
    repoUrl: "https://github.com/Yentec/LinkForge",
    liveUrl: "https://linkforge-538y.onrender.com/docs/",
    liveLabel: "Doc API",
  },
  {
    slug: "feedbackflow",
    title: "FeedbackFlow",
    kind: "Open source",
    icon: "message",
    stackLabel: "TYPESCRIPT · NEXT.JS 16",
    description:
      "Plateforme SaaS pour collecter, prioriser et livrer le feedback produit. Alternative open-source à Canny — espace public de votes, roadmap partagée et tableau de bord complet.",
    stack: ["SaaS", "Next.js 16", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/projects/feedbackflow.webp",
    repoUrl: "https://github.com/Yentec/FeedbackFlow",
    liveUrl: "https://feedbackflow-deploy.vercel.app/",
  },
  {
    slug: "projets-clients",
    title: "Projets clients",
    kind: "Freelance",
    icon: "globe",
    stackLabel: "SITES CLIENTS · REACT",
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
