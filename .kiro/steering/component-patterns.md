---
name: Component Patterns
description: Reusable patterns and conventions for React components
inclusion: auto
fileMatchPattern: "components/**/*.tsx"
---

# Component Patterns & Conventions

## Component Structure

### Standard Component Template
```typescript
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const ComponentName = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="component-name" 
      className="relative py-32 overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]"
    >
      {/* Background effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[120px]" />
      
      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 max-w-7xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section content */}
      </motion.div>
    </section>
  );
};
```

## Animation Patterns

### Scroll-Triggered Fade In
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  {/* Content */}
</motion.div>
```

### Staggered Children
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects
```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  transition={{ duration: 0.3 }}
  className="cursor-pointer"
>
  {/* Hoverable content */}
</motion.div>
```

## Styling Patterns

### Card Component
```typescript
<div className="relative p-6 rounded-2xl bg-gradient-to-br from-shadow/50 to-transparent border border-mist/20 backdrop-blur-sm hover:border-lavender/40 transition-all duration-300">
  {/* Hover glow effect */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple/0 via-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Card content */}
  </div>
</div>
```

### Section Header
```typescript
<div className="text-center mb-20">
  <span className="inline-block px-4 py-2 bg-purple/10 border border-purple/20 rounded-full text-lavender text-sm font-sans tracking-wider uppercase mb-6">
    Section Label
  </span>
  <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
    Section{' '}
    <span className="bg-gradient-to-r from-lavender to-purple bg-clip-text text-transparent">
      Title
    </span>
  </h2>
  <p className="text-xl text-frost/70 max-w-2xl mx-auto">
    Section description
  </p>
</div>
```

### Button Styles
```typescript
// Primary Button
<button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple to-crimson rounded-full text-white font-sans font-semibold hover:scale-105 transition-transform">
  <Icon className="w-5 h-5" />
  <span>Button Text</span>
</button>

// Secondary Button
<button className="inline-flex items-center gap-2 px-8 py-4 bg-mist/10 border border-mist/30 rounded-full text-frost hover:text-white hover:border-lavender/40 font-sans font-semibold transition-colors">
  <Icon className="w-5 h-5" />
  <span>Button Text</span>
</button>
```

### Input Styles
```typescript
<input
  type="text"
  className="w-full px-4 py-3 bg-shadow/50 border border-mist/30 rounded-xl text-white font-sans placeholder:text-frost/40 focus:outline-none focus:border-lavender/60 transition-colors backdrop-blur-sm"
  placeholder="Placeholder text"
/>
```

## Layout Patterns

### Two-Column Grid
```typescript
<div className="grid lg:grid-cols-2 gap-16 items-start">
  <div>{/* Left column */}</div>
  <div>{/* Right column */}</div>
</div>
```

### Three-Column Grid (Projects/Skills)
```typescript
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item) => (
    <div key={item.id}>{/* Item */}</div>
  ))}
</div>
```

### Responsive Container
```typescript
<div className="container mx-auto px-6 max-w-7xl">
  {/* Content */}
</div>
```

## Icon Patterns

### Icon with Background
```typescript
<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple/20 to-crimson/20 border border-lavender/20 flex items-center justify-center">
  <Icon className="w-6 h-6 text-lavender" />
</div>
```

### Social Icon Link
```typescript
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 flex items-center justify-center rounded-lg bg-mist/10 border border-mist/20 hover:border-lavender/40 hover:bg-mist/20 text-frost hover:text-lavender transition-all"
  aria-label="Social platform"
>
  <Icon className="w-5 h-5" />
</a>
```

## State Management Patterns

### Form State
```typescript
const [formState, setFormState] = useState({
  field1: '',
  field2: '',
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormState({
    ...formState,
    [e.target.name]: e.target.value,
  });
};
```

### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false);
const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

// In handler
setIsLoading(true);
try {
  // Action
  setStatus('success');
} catch (error) {
  setStatus('error');
} finally {
  setIsLoading(false);
}
```

## Responsive Breakpoints

```typescript
// Mobile-first approach
className="
  text-base          // Mobile (default)
  md:text-lg         // Tablet (≥768px)
  lg:text-xl         // Desktop (≥1024px)
"

// Common responsive patterns
className="
  grid-cols-1        // 1 column on mobile
  md:grid-cols-2     // 2 columns on tablet
  lg:grid-cols-3     // 3 columns on desktop
"
```

## Accessibility

### Buttons
```typescript
<button
  onClick={handleClick}
  aria-label="Descriptive label"
  disabled={isDisabled}
>
  {/* Content */}
</button>
```

### Links
```typescript
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Link description"
>
  {/* Content */}
</a>
```

### Forms
```typescript
<label htmlFor="input-id" className="block mb-2">
  Label Text
</label>
<input
  id="input-id"
  name="inputName"
  type="text"
  required
  aria-required="true"
/>
```

## Performance Tips

1. **Use `useRef` for scroll animations** - Avoid re-renders
2. **Set `once: true` on scroll triggers** - Prevent re-animations
3. **Lazy load images** - Use Next.js Image component
4. **Memoize expensive calculations** - Use `useMemo`
5. **Debounce rapid events** - For scroll, resize handlers

## Common Mistakes to Avoid

1. ❌ Don't nest too many motion components
2. ❌ Don't animate layout-shifting properties
3. ❌ Don't use inline styles for animations
4. ❌ Don't forget mobile responsiveness
5. ❌ Don't skip accessibility attributes

## Best Practices

1. ✅ Use semantic HTML
2. ✅ Keep components focused and small
3. ✅ Extract reusable patterns
4. ✅ Use TypeScript types properly
5. ✅ Comment complex logic
6. ✅ Test on multiple devices
7. ✅ Optimize images and assets
8. ✅ Use proper loading states
