import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "linkforge",
    title: "LinkForge — API raccourcisseur d'URL",
    summary: "Mini-API raccourcisseur d'URL avec suivi des statistiques, façon Bit.ly.",
    context: "Projet personnel open source.",
    role: "Développement backend.",
    stack: ["Node.js", "Fastify", "Prisma", "PostgreSQL", "Redis "],
    image: "/projects/linkforge.webp",
    repoUrl: "https://github.com/Yentec/LinkForge",
    liveUrl: "https://linkforge-538y.onrender.com/docs/",
  },
  {
    slug: "feedbackflow",
    title: "FeedbackFlow — collecte de feedback produit",
    summary: "Mini-SaaS de remontée et vote de feedback, façon Canny/Frill.",
    context: "Projet personnel open source.",
    role: "Développement fullstack.",
    stack: ["Next.js", "Auth.js", "Prisma", "PostgreSQL"],
    image: "/projects/feedbackflow.webp",
    repoUrl: "https://github.com/Yentec/FeedbackFlow",
    liveUrl: "https://feedbackflow-deploy.vercel.app/",
  },
  {
    slug: "yachts-studio",
    title: "Yachts Studio — CRM courtage nautique",
    summary:
      "Application métier de gestion pour courtiers en bateaux : mandats, transactions, documents.",
    context: "Produit SaaS pour le secteur du courtage nautique européen.",
    role: "Conception et développement fullstack.",
    stack: ["Vite", "Express", "Sequelize", "MySQL"],
    image: "/projects/yachts-studio.webp",
    proprietary: true,
  },
];
