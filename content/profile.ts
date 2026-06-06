import type { Profile } from "@/types";
import type { TimelineEntry, Value } from "@/types";

export const profile: Profile = {
  name: "YENTEC",
  role: "Développeur web fullstack freelance",
  location: "Fréjus (Var), France",
  availability: "Développeur web fullstack à Fréjus (Var) & toute la France en remote",
  tagline:
    "Développeur web fullstack freelance — sites et applications web sur mesure, du back à l'interface.",
  heroLead:
    "Sites et applications web sur mesure, conçus pour durer et évoluer avec votre activité. De la landing page à l'application métier — avec un développeur fullstack qui s'implique de bout en bout.",
  stats: [
    { value: "3 ans", label: "d'expérience web" },
    { value: "SaaS · CRM", label: "projets métier livrés" },
    { value: "Full-stack", label: "front · back · déploiement" },
  ],
  aboutTitle: "Bien faire, plutôt que trop promettre.",
  bio: [
    "Développeur web **fullstack freelance** basé à Fréjus, j'accompagne entreprises et indépendants dans leurs projets numériques — du site vitrine à l'application métier complexe.",
    "Mon approche : comprendre le besoin avant d'écrire la première ligne de code. Je livre des interfaces **claires, performantes et durables**, sans dette technique cachée.",
    "Diplômé RNCP niveau 6 (Bac+3), j'ai **reconstruit de zéro un CRM SaaS complet en alternance** — seul, du design à la mise en production. Aujourd'hui, j'accompagne mes clients dans la durée.",
  ],
  email: "contact@yentec.fr",
  socials: [
    { label: "GitHub", href: "https://github.com/Yentec", handle: "github.com/Yentec" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yentec", handle: "in/yentec" },
  ],
};

export const timeline: TimelineEntry[] = [
  {
    period: "2025 →",
    title: "Développeur web freelance — YENTEC",
    description:
      "Sites vitrines, applications métier et outils sur mesure pour PME et indépendants. Développement, conseil et déploiement.",
  },
  {
    period: "2023-25",
    title: "Concepteur Développeur Logiciel — Alternance (2 ans)",
    description:
      "Refonte complète d'un CRM SaaS de gestion de bateaux d'occasion — seul, du design à la mise en production. Diplôme RNCP niveau 6 (Bac+3) obtenu.",
  },
  {
    period: "2023",
    title: "Formation Développeur Web — 6 mois",
    description: "Formation intensive au développement web full-stack, validée en 5 mois.",
  },
];

export const values: Value[] = [
  { title: "Exigence", description: "Code propre, testé, sans dette technique cachée." },
  {
    title: "Fiabilité",
    description: "Les délais sont tenus. Ce qui est livré fonctionne en production.",
  },
  {
    title: "Écoute",
    description: "Je pose les bonnes questions avant d'écrire la première ligne.",
  },
  { title: "Clarté", description: "Pas de jargon inutile — avec vous, ni dans le code." },
];
