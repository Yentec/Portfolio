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
  proprietary?: boolean;
  contactLink?: boolean;
};

export type TimelineEntry = { period: string; title: string; description: string };
export type Value = { title: string; description: string };
