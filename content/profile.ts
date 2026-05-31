import type { Profile } from "@/types";
import type { TimelineEntry, Value } from "@/types";

export const profile: Profile = {
  name: "YENTEC",
  role: "Développeur web fullstack orienté front",
  location: "Fréjus, France",
  availability: "Disponible pour vos projets · Fréjus & à distance",
  tagline: "Je conçois des applications métier et des sites performants, du back à l'interface.",
  heroLead:
    "YENTEC conçoit des sites et applications web fiables, clairs et évolutifs. De la landing page à l'outil métier — du code propre, pensé pour votre besoin réel.",
  stats: [
    { value: "3 ans", label: "d'expérience" },
    { value: "SaaS · CRM", label: "applications métier" },
    { value: "Full-stack", label: "front · back · base de données" },
  ],
  aboutTitle: "Bien faire, plutôt que trop promettre.",
  bio: [
    "Je suis développeur web full-stack, formé sur le terrain. **YENTEC** est ma structure freelance : j'aide entreprises et indépendants à concrétiser leurs projets numériques avec des solutions sur mesure.",
    "Mon objectif est simple : transformer une idée en interface **claire, performante et durable**. Je préfère comprendre le besoin réel et livrer proprement, plutôt que d'empiler les fonctionnalités.",
    "J'apprends vite et je m'adapte. En alternance, j'ai **reconstruit de zéro un CRM métier complet** ; aujourd'hui j'accompagne des clients du site vitrine au SaaS.",
  ],
  email: "contact@yentec.fr",
  socials: [
    { label: "GitHub", href: "https://github.com/Yentec" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yentec" },
  ],
};

export const timeline: TimelineEntry[] = [
  {
    period: "2025 →",
    title: "Développeur freelance — YENTEC",
    description:
      "Sites vitrines, applications métier et outils internes pour PME et indépendants. Conseil, design et développement.",
  },
  {
    period: "2023-25",
    title: "Concepteur Développeur Logiciel — Alternance (2 ans)",
    description:
      "Refonte complète d'un CRM SaaS de gestion de parc de bateaux d'occasion. Diplôme Bac+3/4 (équiv. US) obtenu rapidement.",
  },
  {
    period: "2023",
    title: "Formation Développeur Web — 6 mois",
    description: "Bases solides du développement web, complétées en 5 mois.",
  },
];

export const values: Value[] = [
  { title: "Exigence", description: "Faire les choses sérieusement, proprement, durablement." },
  { title: "Fiabilité", description: "Livrer ce qui est promis, maintenir ce qui est livré." },
  { title: "Écoute", description: "Comprendre le besoin du client, traduire sa vision en outil." },
  { title: "Clarté", description: "Rendre le web technique compréhensible et utile." },
];
