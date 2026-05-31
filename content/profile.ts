import type { Profile } from "@/types";

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
  email: "contact@yentec.fr",
  socials: [
    { label: "GitHub", href: "https://github.com/Yentec" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yentec" },
  ],
};
