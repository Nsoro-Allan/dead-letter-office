# 🎃 Haunted Portfolio - Kiroween 2026 Contest Entry

A hauntingly beautiful portfolio website that feels like stepping into a dark Victorian mansion at midnight. This project was crafted for the Kiroween 2026 Costume Contest, combining elegant design with atmospheric effects to create a memorable, immersive experience.

## 🌙 Concept

This portfolio transforms the traditional developer showcase into an atmospheric journey through a digital haunted manor. Every element—from floating particles to ghostly hover effects—has been carefully designed to evoke the feeling of exploring something mysterious and beautiful. The design prioritizes elegance over gimmicks, creating a premium, polished experience that showcases work through a dark, enchanting lens.

## ✨ Key Features

### Visual Atmosphere
- **Fog & Particle Effects**: Custom canvas-based fog and ember particles that drift across the screen
- **Smooth Animations**: Framer Motion powers buttery-smooth transitions and hover states
- **Custom Cursor**: Ghostly cursor with trailing glow effect (desktop only)
- **Color Palette**: Deep blacks, muted purples, blood red accents, and candlelight oranges
- **Elegant Typography**: Cinzel serif for headings, Cormorant Garamond for body text

### Sections
1. **Hero**: Atmospheric landing with gradient text and smooth scroll invitation
2. **About**: Personal introduction with feature cards highlighting strengths
3. **Projects**: Spirit-like project cards with modal details and tech stack display
4. **Skills**: Progress bars styled as mystical power meters, organized by category
5. **Contact**: Séance-inspired contact form with direct email and social links

### Technical Highlights
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with custom theme and color system
- **Framer Motion** for advanced animations
- **Fully Responsive** design (mobile-first approach)
- **Performance Optimized** with efficient canvas rendering
- **Accessible** keyboard navigation and semantic HTML

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ and npm

### Installation Steps

```bash
# Clone the repository
git clone <your-repo-url>
cd haunted-portfolio

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will run at [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### 1. Personal Information
Edit `/lib/data.tsx` to update:
- Your name, title, and tagline
- Bio/about text
- Email and social links

### 2. Projects
Update the `projects` array in `/lib/data.tsx`:
```typescript
{
  id: "unique-id",
  title: "Project Name",
  description: "Short description",
  longDescription: "Detailed description for modal",
  techStack: ["Tech1", "Tech2", "Tech3"],
  liveUrl: "https://...",
  githubUrl: "https://github.com/...",
  category: "Full Stack",
}
```

### 3. Skills
Update the `skills` array in `/lib/data.tsx`:
```typescript
{ 
  name: "Skill Name", 
  level: 90,  // 1-100
  category: "frontend" | "backend" | "tools" | "other" 
}
```

### 4. Colors & Theme
Modify colors in `tailwind.config.ts` and `app/globals.css`:
- Change the haunted color palette
- Adjust animation durations
- Customize glow effects

### 5. Remove Custom Cursor (Optional)
If you prefer a standard cursor, simply remove:
```typescript
// In app/page.tsx
<CustomCursor />
```
And remove `cursor: 'none'` from `app/layout.tsx`

## 📁 Project Structure

```
haunted-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── effects/
│   │   ├── CustomCursor.tsx    # Custom cursor component
│   │   ├── FogEffect.tsx       # Fog canvas animation
│   │   ├── Loading.tsx         # Loading screen
│   │   └── Particles.tsx       # Particle effect canvas
│   ├── layout/
│   │   ├── Footer.tsx          # Footer component
│   │   └── Navigation.tsx      # Header navigation
│   ├── sections/
│   │   ├── About.tsx           # About section
│   │   ├── Contact.tsx         # Contact section
│   │   ├── Hero.tsx            # Hero/landing section
│   │   ├── Projects.tsx        # Projects showcase
│   │   └── Skills.tsx          # Skills display
│   └── ui/
│       ├── Button.tsx          # Reusable button
│       └── Card.tsx            # Reusable card
├── lib/
│   ├── data.tsx            # Content data (projects, skills, etc.)
│   └── types/
│       └── index.ts        # TypeScript type definitions
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Design Philosophy

### Visual Hierarchy
- Large, elegant serif headings command attention
- Ample whitespace prevents overwhelming the user
- Strategic use of glow effects draws the eye to interactive elements

### Color System
- **Primary Dark**: void (#0a0a0f), abyss (#121218), shadow (#1a1a24)
- **Accent Colors**: blood red (#8b0000), purple (#6a1b9a), lavender (#9575cd)
- **Highlight**: candlelight (#ffb347), gold (#ffd700) for special touches
- **Text**: frost (#b0c4de), ice (#e0f2f7) for readability

### Animation Principles
- Smooth, natural motion with easing functions
- Hover states that feel "alive" without being distracting
- Loading states that build anticipation
- Performance-conscious: GPU-accelerated transforms

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The project is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Any platform supporting Next.js

## 🎃 For Kiroween 2026 Judges

This portfolio demonstrates:
- **Theme Adherence**: Every element reinforces the haunted manor atmosphere
- **Technical Skill**: Modern React patterns, TypeScript, canvas animations
- **Polish**: Attention to micro-interactions, loading states, and responsive design
- **Creativity**: Unique interpretation of a portfolio through a haunted lens
- **Usability**: Despite the atmospheric theme, navigation is clear and content is accessible

## 📄 License

MIT License - feel free to use this as a template for your own haunted portfolio!

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Google Fonts](https://fonts.google.com/)

---

*"Code by moonlight, debug by candlelight"* 🕯️👻
