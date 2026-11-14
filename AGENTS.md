# Agent Guidelines for Haunted Portfolio

This document provides guidance for AI agents working on this project.

## Project Context

**Project Type**: Modern haunted-themed developer portfolio  
**Purpose**: Kiroween 2026 Costume Contest entry  
**Status**: Production-ready, fully functional  
**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion

## Quick Reference

### File Locations
- **Content Data**: `lib/data.tsx` (names, projects, skills, social links)
- **Components**: `components/sections/` (Hero, About, Projects, Skills, Contact)
- **Styles**: `app/globals.css` and `tailwind.config.ts`
- **Types**: `lib/types/index.ts`

### Common Tasks

#### Update Personal Information
Edit `lib/data.tsx`:
```typescript
export const personalInfo = {
  name: "...",
  title: "...",
  tagline: "...",
  bio: "...",
  email: "...",
};
```

#### Add a Project
Add to `projects` array in `lib/data.tsx`:
```typescript
{
  id: "unique-id",
  title: "Project Name",
  description: "Short description",
  longDescription: "Detailed description for modal",
  techStack: ["React", "Node.js", "etc"],
  liveUrl: "https://...",
  githubUrl: "https://github.com/...",
  category: "Category Name",
}
```

#### Add a Skill
Add to `skills` array in `lib/data.tsx`:
```typescript
{ 
  name: "Skill Name", 
  level: 90, 
  category: "frontend" // or "backend", "tools", "other"
}
```

## Design System

### Colors
Use Tailwind classes with these custom colors:
- `text-lavender` - Purple accent (#9575cd)
- `text-crimson` - Red accent (#dc143c)
- `text-frost` - Light blue text (#b0c4de)
- `text-white` - Pure white for headings
- `bg-shadow`, `bg-abyss` - Dark backgrounds
- `border-mist` - Subtle borders

### Component Patterns
Always follow these patterns:
1. Use `'use client'` for interactive components
2. Use Framer Motion for animations
3. Use `useInView` hook for scroll-triggered animations
4. Maintain mobile-first responsive design
5. Keep effects subtle and performant

### Animation Guidelines
- Fade in on scroll: `opacity: 0 -> 1`, delay `0.2-0.6s`
- Hover scale: `1.0 -> 1.05` (subtle!)
- Transition duration: `300ms` for interactions, `600ms` for scroll
- Use `once: true` on `useInView` to prevent re-triggering

## Code Standards

### TypeScript
- Define proper types for all props
- Use existing types from `lib/types/index.ts`
- No `any` types unless absolutely necessary

### Styling
- Use Tailwind classes (no inline styles)
- Follow mobile-first responsive pattern
- Use `rounded-2xl` for cards, `rounded-full` for buttons
- Consistent spacing: `p-6`, `p-8` for cards; `py-32` for sections

### Component Structure
```typescript
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const ComponentName = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="...">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        {/* Content */}
      </motion.div>
    </section>
  );
};
```

## Important Files

### Read Before Making Changes
1. `.kiro/steering/project-guide.md` - Full project context
2. `.kiro/steering/component-patterns.md` - Component conventions
3. `README.md` - User documentation
4. `PROJECT_STRUCTURE.md` - Architecture overview

### Don't Modify Unless Asked
- `package.json` - Dependencies locked
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

## Build & Test

### Before Committing
```bash
npm run build    # Must pass without errors
```

### Common Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
```

## Troubleshooting

### Build Fails
1. Check TypeScript errors first
2. Verify all imports are correct
3. Ensure `'use client'` is present on interactive components

### Styles Not Applying
1. Check Tailwind class names are correct
2. Verify custom colors exist in `tailwind.config.ts`
3. Hard refresh browser

### Hydration Errors
1. Move dynamic data (Date, random) to `useEffect`
2. Check for SSR/client mismatches
3. Ensure no direct DOM manipulation

## Design Philosophy

When making changes, remember:
- **Clean & Modern** - Not cheesy or overwhelming
- **Subtle Effects** - Elegant, not flashy
- **Professional** - Suitable for real portfolio use
- **Performance** - Keep it fast and lightweight
- **Consistency** - Match existing patterns

## Getting Help

Refer to these documents:
- `README.md` - Complete setup and usage guide
- `QUICKSTART.md` - Fast setup instructions
- `REDESIGN_COMPLETE.md` - Design decisions explained
- `.kiro/steering/*.md` - Development guidelines

## Project Goals

This portfolio should:
1. Look professional and modern
2. Have subtle haunted atmosphere (dark + purple/red accents)
3. Be fully responsive
4. Load fast
5. Be easy to customize
6. Win the Kiroween 2026 contest! 🎃

---

**Note for Agents**: This project prioritizes clean, modern design with subtle atmospheric effects. Avoid adding heavy animations, cheesy Halloween decorations, or anything that detracts from the professional feel. Keep it elegant! ✨
