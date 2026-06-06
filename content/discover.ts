export interface CvRow {
  label: string;
  value: string;
}

export interface RpgStat {
  label: string;
  value: string;
}

export const cvRows: CvRow[] = [
  { label: "Poste", value: "Développeur full-stack" },
  { label: "Expérience", value: "3 ans" },
  { label: "Front Stack", value: "React · Next.js · Vite · TypeScript · Prisma" },
  { label: "Back Stack", value: "Node.js · Express · Fastify · Prisma · PostgreSQL" },
  { label: "Diplôme", value: "Développeur Concepteur Logiciel · Bac+3/4" },
  { label: "Lieu", value: "Fréjus (Var) · à distance" },
];

export const rpgStats: RpgStat[] = [
  { label: "Résistance aux deadlines", value: "★★★★★" },
  { label: "Invocation de Stack Overflow", value: "★★★★★" },
  { label: "Dégâts critiques en prod", value: "★☆☆☆☆" },
  { label: "Pouvoir du Ctrl+Z", value: "★★★★★" },
  { label: "Mana (caféine)", value: "∞" },
];

export const rpgCharacter = {
  level: "LVL 31 · DEV",
  hpPercent: 82,
  characterClass: "Classe — Full-stack Builder",
};

export const discoverContent = {
  eyebrow: "// Découvrir",
  title: "Deux façons d'explorer YENTEC.",
  lead: "À vous de choisir l'angle : le CV pour aller droit au but, ou la version RPG pour une visite plus ludique. Même profil, deux expériences.",
  cv: {
    tag: "Pour les recruteurs",
    title: "Version CV",
    sub: "L'essentiel de mon profil, scannable en 30 secondes — et téléchargeable en PDF.",
    ctaDownload: "Télécharger le CV",
    ctaContact: "Me contacter",
  },
  rpg: {
    tag: "Pour explorer",
    title: "Version RPG",
    sub: "Parcourez mon parcours et mes projets comme un petit monde à explorer. Même rigueur, beaucoup plus de jeu.",
    ctaNotify: "Me prévenir au lancement",
    ctaNotifyDone: "Vous serez prévenu ✓",
    ctaBadge: "En développement",
  },
};
