export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  category?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}
