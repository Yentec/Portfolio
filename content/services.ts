import type { Service } from "@/types";

export const servicesHeader = {
  title: "Mes offres, en détail.",
  lead: "Du site vitrine à l'application sur mesure — toujours pensé pour votre besoin réel, sans complexité inutile.",
  cta: {
    title: "Un projet en tête ?",
    text: "Parlons-en simplement. Je vous réponds rapidement, sans jargon — pour comprendre, puis proposer.",
    button: "Discutons de votre projet",
  },
};

export const services: Service[] = [
  {
    id: "vitrine",
    icon: "monitor",
    title: "Site vitrine",
    description:
      "Création de sites modernes, rapides et sur mesure. Une solution simple, efficace, propre.",
    badges: ["Design sur mesure", "Next.js", "Responsive", "SEO + vitesse", "Mise en prod"],
    problem: "L'absence d'une présence en ligne claire et crédible.",
    audience: "Les indépendants et petites structures.",
    outcome: "**Une vitrine performante** (SEO + vitesse) qui crédibilise et convertit.",
  },
  {
    id: "metier",
    icon: "grid",
    title: "Application métier",
    description:
      "Des outils internes pour structurer, automatiser ou simplifier une activité. Adapté, pas une usine à gaz.",
    badges: ["CRM simple", "Gestion interne", "Dashboard", "Automatisation"],
    problem: "Des outils dispersés ou inefficaces (Excel, Notion, emails).",
    audience: "Les structures avec un process à fluidifier.",
    outcome: "**Un outil qui colle au fonctionnement réel** et fait gagner du temps.",
  },
  {
    id: "mvp",
    icon: "bulb",
    title: "MVP / SaaS",
    description:
      "Conception de produits web en phase de lancement. Aller vite sans casser les bases.",
    badges: ["MVP fonctionnel", "Architecture évolutive", "Itérations", "Mise en prod"],
    problem: "Une idée à valider vite, sans gaspiller temps ni budget.",
    audience: "Les porteurs de projet et startups en lancement.",
    outcome: "**Un produit testable rapidement**, sur des bases qui évoluent.",
  },
  {
    id: "maintenance",
    icon: "wrench",
    title: "Maintenance & accompagnement",
    description: "Suivi technique après livraison. Continuité et fiabilité dans le temps.",
    badges: ["Corrections", "Évolutions", "Ajustements", "Support"],
    problem: "Un projet qui se dégrade faute de suivi.",
    audience: "Les clients qui veulent un projet entretenu dans la durée.",
    outcome: "**Un projet stable et à jour**, avec un interlocuteur de confiance.",
  },
];
