export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  skillsDeveloped: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  location?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone?: string;
  twitter?: string;
  resumeUrl?: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  secondaryBio?: string;
  statusText: string;
  isAvailableForWork: boolean;
  avatarUrl?: string;
  socials: SocialLinks;
  projects: Project[];
  experience: Experience[];
  skills: SkillCategory[];
  education?: Education[];
}
