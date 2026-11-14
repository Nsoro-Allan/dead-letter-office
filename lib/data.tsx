import { Mail } from 'lucide-react';
import { Project, Skill, SocialLink } from './types';

export const personalInfo = {
  name: "Phantom Developer",
  title: "Architect of Digital Specters",
  tagline: "Summoning elegant code from the void",
  bio: "I dwell in the shadows between design and development, crafting experiences that haunt the memory long after the browser closes. With an eye for the macabre and a passion for pixel-perfect interfaces, I transform dark visions into luminous realities.",
  email: "phantom@haunted-portfolio.dev",
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Ethereal Commerce",
    description: "An e-commerce platform that materializes from the mist",
    longDescription: "A fully-featured e-commerce solution built with Next.js and Stripe. Features include real-time inventory, ghost cart recovery, and spectral product recommendations.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    liveUrl: "https://ethereal-commerce.dev",
    githubUrl: "https://github.com/phantom/ethereal-commerce",
    category: "Full Stack",
  },
  {
    id: "2",
    title: "Midnight Dashboard",
    description: "Analytics that emerge from darkness itself",
    longDescription: "A comprehensive analytics dashboard featuring real-time data visualization, predictive insights, and haunting user behavior patterns.",
    techStack: ["React", "D3.js", "Node.js", "MongoDB", "WebSockets"],
    liveUrl: "https://midnight-dashboard.dev",
    githubUrl: "https://github.com/phantom/midnight-dashboard",
    category: "Data Visualization",
  },
  {
    id: "3",
    title: "Shadow CMS",
    description: "Content management summoned from the beyond",
    longDescription: "A headless CMS built for developers who appreciate the dark arts of content architecture. Features include version control, role-based permissions, and API-first design.",
    techStack: ["TypeScript", "Express", "GraphQL", "Redis", "Docker"],
    githubUrl: "https://github.com/phantom/shadow-cms",
    category: "Backend",
  },
  {
    id: "4",
    title: "Spectral UI",
    description: "A component library born of moonlight",
    longDescription: "An accessible, customizable component library with dark-mode-first design. Includes 50+ components, comprehensive documentation, and Storybook integration.",
    techStack: ["React", "TypeScript", "Styled Components", "Storybook"],
    liveUrl: "https://spectral-ui.dev",
    githubUrl: "https://github.com/phantom/spectral-ui",
    category: "Open Source",
  },
  {
    id: "5",
    title: "Grimoire",
    description: "A mystical knowledge base for forgotten wisdom",
    longDescription: "Personal knowledge management app with bi-directional linking, markdown support, and graph visualization of connected thoughts.",
    techStack: ["Next.js", "Prisma", "tRPC", "Tailwind CSS"],
    liveUrl: "https://grimoire-app.dev",
    githubUrl: "https://github.com/phantom/grimoire",
    category: "Full Stack",
  },
  {
    id: "6",
    title: "Nocturne API",
    description: "RESTful whispers in the night",
    longDescription: "High-performance REST API with authentication, rate limiting, and comprehensive documentation. Handles 10k+ requests per second.",
    techStack: ["Go", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/phantom/nocturne-api",
    category: "Backend",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 88, category: "frontend" },
  { name: "Framer Motion", level: 85, category: "frontend" },
  { name: "Vue.js", level: 78, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 87, category: "backend" },
  { name: "Express", level: 85, category: "backend" },
  { name: "PostgreSQL", level: 82, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  { name: "GraphQL", level: 75, category: "backend" },
  { name: "Go", level: 70, category: "backend" },
  
  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "Docker", level: 82, category: "tools" },
  { name: "AWS", level: 75, category: "tools" },
  { name: "Figma", level: 88, category: "tools" },
  { name: "Vercel", level: 85, category: "tools" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/phantom",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/phantom",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    url: "https://twitter.com/phantom_dev",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Email",
    url: `mailto:${personalInfo.email}`,
    icon: <Mail className="w-5 h-5" />,
  },
];
