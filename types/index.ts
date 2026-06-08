export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  availability: string;
  tagline: string;
  heroLead: string;
  stats: Stat[];
  aboutTitle: string;
  bio: string[];
  email: string;
  socials: SocialLink[];
};

export type SkillIconName = "code" | "database" | "tools";

export type SkillGroup = {
  category: string;
  subtitle: string;
  icon: SkillIconName;
  badges: string[];
};

export type ProjectIconName = "message" | "link" | "boat" | "globe";
export type ProjectKind = "Open source" | "Alternance" | "Freelance";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  icon: ProjectIconName;
  stackLabel: string;
  description: string;
  stack: string[];
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  caseStudySlug?: string;
  proprietary?: boolean;
  contactLink?: boolean;
};

export type TimelineEntry = { period: string; title: string; description: string };
export type Value = { title: string; description: string };

export type CaseStudyPoint = {
  label: string;
  body: string;
};

export type CaseStudyDecision = {
  tech: string;
  title: string;
  body: string;
  why: string;
};

export type CaseStudyImage = {
  src?: string;
  alt: string;
  wide?: boolean;
};

export type CaseStudy = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  kind: string;
  title: string;
  lead: string;
  repoUrl: string;
  liveUrl?: string;
  liveLabel: string;
  liveIcon: "external" | "doc";
  stack: string[];
  role: string;
  period: string;
  projectType: string;
  status: "En ligne" | "En cours" | "Archivé";
  heroImage?: string;
  heroAlt: string;
  /** Paragraphes pouvant contenir du HTML de confiance (<strong>, <em>) */
  contexte: string[];
  problemeIntro: string;
  problemePoints: CaseStudyPoint[];
  /** Paragraphes pouvant contenir du HTML de confiance (<strong>, <em>) */
  solutionBody: string[];
  solutionGallery: CaseStudyImage[];
  decisions: CaseStudyDecision[];
  /** Peut contenir du HTML de confiance (<strong>, <em>) */
  resultatBody: string;
  resultatFacts: { value: string; label: string }[];
  prevProject?: { slug: string; title: string };
  nextProject?: { slug: string; title: string };
};

export type ServiceIconName = "monitor" | "grid" | "bulb" | "wrench";

export type Service = {
  id: string;
  icon: ServiceIconName;
  title: string;
  description: string;
  badges: string[];
  problem: string;
  audience: string;
  outcome: string;
};
