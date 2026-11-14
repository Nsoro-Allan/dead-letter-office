'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { FogEffect } from '@/components/effects/FogEffect';
import { Particles } from '@/components/effects/Particles';
import { CustomCursor } from '@/components/effects/CustomCursor';
import { Loading } from '@/components/effects/Loading';

export default function Home() {
  return (
    <>
      <Loading />
      <CustomCursor />
      <FogEffect />
      <Particles />
      
      <div className="relative">
        <Navigation />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
