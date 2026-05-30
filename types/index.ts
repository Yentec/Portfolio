export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  email: string;
  socials: SocialLink[];
};

export type SkillGroup = {
  category: string;
  items: string[];
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
