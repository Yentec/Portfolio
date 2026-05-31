export type SocialLink = {
  label: string;
  href: string;
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

export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  role: string;
  stack: string[];
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  proprietary?: boolean;
};

export type TimelineEntry = { period: string; title: string; description: string };
export type Value = { title: string; description: string };
