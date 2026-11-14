---
name: Haunted Portfolio Guide
description: Development guidelines and context for the Haunted Portfolio project
inclusion: auto
---

# Haunted Portfolio - Project Context

## Project Overview

This is a **modern, premium haunted-themed portfolio** built for the Kiroween 2026 Costume Contest. The design is clean, professional, and elegant with subtle atmospheric effects.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animation**: Framer Motion
- **Icons**: Lucide React + custom SVG icons
- **Deployment**: Vercel-ready

## Design Philosophy

### Core Principles
1. **Clean & Modern** - No cheesy Halloween effects
2. **Subtle Atmosphere** - Dark theme with elegant accents
3. **Professional** - Suitable for actual portfolio use
4. **Performance** - Lightweight, fast loading
5. **Responsive** - Mobile-first approach

### Color System
- **Primary Dark**: `#0a0a0f` (void), `#121218` (abyss)
- **Accent Purple**: `#9575cd` (lavender), `#6a1b9a` (purple)
- **Accent Red**: `#dc143c` (crimson), `#8b0000` (blood)
- **Text**: White for headings, `#b0c4de` (frost) for body

### Typography
- **Headings**: Cinzel (serif)
- **Body**: Cormorant Garamond (serif)
- **UI**: Inter (sans-serif)

## File Structure

```
app/
├── layout.tsx          # Root layout with fonts
├── page.tsx            # Main page composition
└── globals.css         # Global styles

components/
├── effects/            # Visual effects
│   ├── CustomCursor.tsx
│   ├── FogEffect.tsx
│   ├── Loading.tsx
│   └── Particles.tsx
├── layout/             # Layout components
│   ├── Navigation.tsx
│   └── Footer.tsx
├── sections/           # Page sections
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── Contact.tsx
└── ui/                 # Reusable UI
    ├── Button.tsx
    └── Card.tsx

lib/
├── data.tsx           # ALL CONTENT (edit this!)
└── types/
    └── index.ts       # TypeScript types
```

## Development Guidelines

### When Adding Features
1. Check `lib/data.tsx` first - most content lives here
2. Match existing animation patterns (Framer Motion)
3. Use Tailwind classes consistently
4. Maintain mobile-first responsive design
5. Keep effects subtle and performant

### Component Patterns
```typescript
// Always use 'use client' for interactive components
'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export const Component = () => {
  // Use refs for scroll animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {/* Content */}
    </motion.section>
  );
};
```

### Styling Patterns
```typescript
// Card pattern
<div className="relative p-6 rounded-2xl bg-gradient-to-br from-shadow/50 to-transparent border border-mist/20 backdrop-blur-sm">
  {/* Content */}
</div>

// Button pattern
<button className="px-8 py-4 bg-gradient-to-r from-purple to-crimson rounded-full text-white font-sans font-semibold hover:scale-105 transition-transform">
  {/* Content */}
</button>
```

## Content Updates

### Editing Personal Info
Open `lib/data.tsx` and edit:
```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  bio: "Your bio...",
  email: "your@email.com",
};
```

### Adding Projects
```typescript
export const projects: Project[] = [
  {
    id: "unique-id",
    title: "Project Name",
    description: "Short description",
    longDescription: "Detailed modal description",
    techStack: ["Tech1", "Tech2"],
    liveUrl: "https://...",
    githubUrl: "https://github.com/...",
    category: "Category Name",
  },
];
```

### Updating Skills
```typescript
export const skills: Skill[] = [
  { 
    name: "Skill Name", 
    level: 85,  // 1-100
    category: "frontend" | "backend" | "tools" | "other" 
  },
];
```

## Common Tasks

### Add New Section
1. Create component in `components/sections/NewSection.tsx`
2. Import in `app/page.tsx`
3. Add to nav in `components/layout/Navigation.tsx`

### Customize Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  lavender: '#YOUR_COLOR',
  crimson: '#YOUR_COLOR',
  // etc...
}
```

### Remove Custom Cursor
In `app/page.tsx`, remove:
```typescript
<CustomCursor />
```

## Animation Guidelines

### Scroll Animations
- Use `useInView` hook from Framer Motion
- Set `once: true` to prevent re-triggering
- Add `margin: "-100px"` for earlier trigger

### Hover Effects
- Keep subtle (scale: 1.05 max)
- Use `transition-transform` or `transition-all`
- Duration: 300ms for responsive feel

### Loading States
- Use proper loading indicators
- Disable buttons during loading
- Show success/error states

## Performance Notes

### Current Optimizations
- Static page generation enabled
- Fonts optimized via Next.js
- No heavy canvas effects
- CSS animations over JS where possible

### Avoid
- Don't add heavy libraries unnecessarily
- Don't use large images without optimization
- Don't create excessive DOM nodes
- Don't block the main thread

## Build & Deploy

### Development
```bash
npm run dev        # Start dev server
```

### Production
```bash
npm run build      # Build for production
npm start          # Start production server
```

### Deploy to Vercel
```bash
vercel             # Deploy with Vercel CLI
```

## Troubleshooting

### Styles Not Showing
- Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
- Check Tailwind config is correct
- Ensure globals.css is imported

### Build Errors
- Check TypeScript errors first
- Verify all imports are correct
- Ensure `'use client'` where needed

### Hydration Errors
- Don't use `Date.now()` or `Math.random()` in SSR
- Move to `useEffect` or client-side only
- Check for SSR/client mismatches

## Best Practices

1. **Always read before editing** - Understand existing patterns
2. **Match the style** - Consistency is key
3. **Test responsive** - Check mobile, tablet, desktop
4. **Keep it simple** - Don't over-engineer
5. **Comment complex logic** - Help future developers

## Project Status

✅ Fully functional and production-ready
✅ All sections implemented
✅ Responsive design complete
✅ Performance optimized
✅ Ready for deployment

## Contact & Support

For questions about this project structure, refer to:
- `README.md` - Main documentation
- `QUICKSTART.md` - Quick setup guide
- `PROJECT_STRUCTURE.md` - Architecture details
- `REDESIGN_COMPLETE.md` - Design decisions
